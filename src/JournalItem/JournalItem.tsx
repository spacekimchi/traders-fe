import './journal_item.scss';
import { Trade, JournalEntry, Account } from '../utils/types';
import { excelToDate, excelToTime } from '../utils/helpers';
import JournalEntryForm from '../JournalEntryForm/JournalEntryForm';
import { post } from '../utils/api';
import { useState, useEffect } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import DollarVal from '../DollarVal/DollarVal';

interface JournalItemProps {
	dayTrades: Array<Trade>,
	day: string,
	journalEntry: JournalEntry,
	cloudinary: Cloudinary,
	accountsById: { [key: string]: Account },
}

export default function JournalItem(props: JournalItemProps) {
	const [journalEntry, setJournalEntry] = useState(props.journalEntry);
	const [showMore, setShowMore] = useState(false);
	const [formImageUrls, setFormImageUrls] = useState(journalEntry.image_urls);
	const [formNotes, setFormNotes] = useState(journalEntry.notes);
	const [formErrors, setFormErrors] = useState(new Set());
	const date = excelToDate(Number(props.day)).toDateString();
	let shortsCount = 0;
	let shortsWins = 0;
	let shortsPnl = 0;
	let longsCount = 0;
	let longsWins = 0;
	let longsPnl = 0;
	let commissions = 0;
	let winningTrades = [];
	let winningTotals = 0.0;
	let winningTime = 0.0;
	let biggestWinner = 0.0;
	let longestWinningTime = 0.0;
	let shortestWinningTime = 1000.0;
	let losingTrades = [];
	let losingTotals = 0.0;
	let losingTime = 0.0;
	let biggestLoser = 0.0;
	let longestLosingTime = 0.0;
	let shortestLosingTime = 1000.0;

	let accountsTraded: { [key: string]: number } = {};
	props.dayTrades.forEach((trade) => {
		let tradeTime = trade.exit_time - trade.entry_time;
		let pnl = trade.pnl - trade.commission;
		if (trade.short) {
			shortsCount += 1;
			shortsPnl += pnl;
			shortsWins += (pnl > 0) ? 1 : 0;
		} else {
			longsCount += 1;
			longsPnl += pnl;
			longsWins += (pnl > 0) ? 1 : 0;
		}
		if (!(trade.account_id in accountsTraded)) {
			accountsTraded[trade.account_id] = 0;
		}
		if (pnl > 0) {
			winningTrades.push(trade);
			winningTotals += pnl;
			biggestWinner = Math.max(biggestWinner, pnl);
			longestWinningTime = Math.max(longestWinningTime, tradeTime);
			shortestWinningTime = Math.min(shortestWinningTime, tradeTime);
			winningTime += tradeTime;
		} else {
			losingTrades.push(trade);
			losingTotals += pnl;
			biggestLoser = Math.min(biggestLoser, pnl);
			longestLosingTime = Math.max(longestLosingTime, tradeTime);
			shortestLosingTime = Math.min(shortestLosingTime, tradeTime);
			losingTime += tradeTime;
		}
		accountsTraded[trade.account_id] += pnl;
		commissions += trade.commission;

	});

	let accountsDropdown = Object.keys(accountsTraded).map((accountId, idx) => {
		return (<div key={idx}>{props.accountsById[accountId].name}: {accountsTraded[accountId].toFixed(2)}</div>);
	});

	const mainTradesSection = (
		<div>
			<div className="gross-pnl">
				<DollarVal val={(shortsPnl + longsPnl).toFixed(2)} />
			</div>
			<div>
				- ({shortsCount + longsCount} trades, win %: {((winningTrades.length / (shortsCount + longsCount)) * 100).toFixed(2)})
			</div>
			<div>
				Longs PnL: <DollarVal val={longsPnl.toFixed(2)} />
				<div>
					- ({longsCount} trades, win %: {longsCount > 0 ? ((longsWins / longsCount * 100).toFixed(2)) : "-"})
				</div>
			</div>
			<div>
				Shorts PnL: <DollarVal val={shortsPnl.toFixed(2)} />
				<div>
					- ({shortsCount} trades, win %: {shortsCount > 0 ? ((shortsWins / shortsCount * 100).toFixed(2)) : "-"})
				</div>
			</div>
			<div>
				Accounts traded: {Object.keys(accountsTraded).length}
			</div>
		</div>
	);

	const winningTradesSection = (
		<div>
			<div>
				# of winning trades: {winningTrades.length}
			</div>
			<div>
				Total profit: <DollarVal val={winningTotals.toFixed(2)} />
			</div>
			<div>
				Biggest winner: <DollarVal val={biggestWinner.toFixed(2)} />
			</div>
			<div>
				Average winner: {winningTrades.length ? <DollarVal val={(winningTotals / winningTrades.length).toFixed(2)} /> : "-"}
			</div>
			<div>
				Longest hold: {winningTrades.length ? excelToTime(longestWinningTime) : "-"}
			</div>
			<div>
				Shortest hold: {winningTrades.length ? excelToTime(shortestWinningTime) : "-"}
			</div>
			<div>
				Average hold: {winningTrades.length ? excelToTime(winningTime / winningTrades.length) : "-"}
			</div>
		</div>
	);

	const losingTradesSection = (
		<div>
			<div>
				# of losing trades: {losingTrades.length}
			</div>
			<div>
				Total Loss: <DollarVal val={losingTotals.toFixed(2)} />
			</div>
			<div>
				Biggest loser: <DollarVal val={biggestLoser.toFixed(2)} />
			</div>
			<div>
				Average loser: {losingTrades.length ? <DollarVal val={(losingTotals / losingTrades.length).toFixed(2)} /> : "-"}
			</div>
			<div>
				Longest hold: {losingTrades.length ? excelToTime(longestLosingTime) : "-"}
			</div>
			<div>
				Shortest hold: {losingTrades.length ? excelToTime(shortestLosingTime) : "-"}
			</div>
			<div>
				Average hold: {losingTrades.length ? excelToTime(losingTime / losingTrades.length) : "-"}
			</div>
		</div>
	);

	async function submitForm() {
		/* https://drive.google.com/file/d/19ZEl8nhZt7E4-LByo_XO-L_UEORqJpBv/view?usp=share_link */
		/* https://drive.google.com/uc?id=1NPxxaxh8eD1SAT6MXCaAZnlqJEdH-vsR */
		let errors = new Set();
		let imageIds: Array<string> = [];
		formImageUrls.forEach((imageUrl: string, idx: number) => {
			if (!imageUrl.startsWith("https://drive.google.com/file/d/")) {
				console.log("adding errors");
				errors.add(idx);
			} else {
				let imageId = imageUrl.replace('https://drive.google.com/file/d/', '').split('/')[0];
				console.log('imageId ', imageId);
				imageIds.push(imageId);
			}
		});
		if (errors.size > 0) {
			setFormErrors(errors);
			return;
		}
		let response = await post('journalEntries', { notes: formNotes, entry_date: props.day, image_urls: imageIds });
		journalEntry.notes = formNotes;
		journalEntry.image_urls = formImageUrls;
		setJournalEntry(Object.assign({}, journalEntry));
	}

	let img_urls = journalEntry.image_urls.map((img_url: string, idx: number) => {
		return (
			<a key={idx} href={img_url} target="_blank">
				<img className="img-loading" src={img_url} style={{ width: "100%", height: "auto" }} />
			</a>
		);
	});

	const showMoreSection = (
		<div className="journal-item-more-container">
			{img_urls}
			<JournalEntryForm
				day={props.day}
				submitForm={submitForm}
				notes={formNotes}
				setNotes={setFormNotes}
				imageUrls={formImageUrls}
				setImageUrls={setFormImageUrls}
				formErrors={formErrors}
			/>
		</div>
	);

	useEffect(() => { }, [journalEntry]);

	return (
		<div className="journal-item-container">
			<div className="journal-item-header">
				{date}
			</div>
			<div onClick={() => { setShowMore(!showMore) }}>
				<div className="journal-item-main">
					<div className="journal-item-main__item">
						{mainTradesSection}
					</div>
					<div className="journal-item-main__item">
						Winning Trades
						{winningTradesSection}
					</div>
					<div className="journal-item-main__item">
						Losing Trades
						{losingTradesSection}
					</div>
				</div>
				<div className="journal-item-main">
					{
						showMore ?
							(<button type="button" className="journal-item-info-button">Click to hide</button>) :
							<button type="button" className="">Click for more</button>
					}
				</div>
			</div>
			<div>
				{journalEntry.notes}
			</div>
			{
				showMore ?
					showMoreSection :
					<></>
			}
		</div>
	);
}
