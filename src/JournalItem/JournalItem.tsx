import './journal_item.scss';
import { Trade } from '../utils/types';
import { excelToDate } from '../utils/helpers';

interface JournalItemProps {
	dayTrades: Array<Trade>,
	day: string
}

export default function JournalItem(props: JournalItemProps) {
	const date = excelToDate(Number(props.day)).toDateString();
	let shortsCount = 0;
	let shortsWins = 0;
	let shortsPnl = 0;
	let longsCount = 0;
	let longsWins = 0;
	let longsPnl = 0;
	let commissions = 0;

	let accountsTraded = new Set();
	props.dayTrades.forEach((trade) => {
		if (trade.short) {
			shortsCount += 1;
			shortsPnl += trade.pnl - trade.commission;
			shortsWins += (trade.pnl - trade.commission > 0) ? 1 : 0;
		} else {
			longsCount += 1;
			longsPnl += trade.pnl - trade.commission;
			longsWins += (trade.pnl - trade.commission > 0) ? 1 : 0;
		}
		commissions += trade.commission;
		accountsTraded.add(trade.account_id);
	});
	return (
		<div className="journal-item">
			<div>
				{date}
			</div>
			<div>
				Accounts traded: {accountsTraded.size}
			</div>
			<div>
				Total trades: {shortsCount + longsCount}
			</div>
			<div>
				Longs PnL: <span>{longsPnl.toFixed(2)}</span> (win %: {longsCount > 0 ? (((longsWins * 1.0) / (longsCount * 1.0)) * 100).toFixed(2) : "No trades"})
			</div>
			<div>
				Shorts PnL: <span>{shortsPnl.toFixed(2)}</span> (win %: {shortsCount > 0 ? (((shortsWins * 1.0) / (shortsCount * 1.0)) * 100).toFixed(2) : "-"})
			</div>
			<div>
				Gross PnL: {(shortsPnl + longsPnl).toFixed(2)}
			</div>
			<div>
				Total commissions: {commissions.toFixed(2)}
			</div>
			<div>
				Add notes
			</div>
		</div>
	);
}
