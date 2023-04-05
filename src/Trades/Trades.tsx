import './trades.scss';
import { Outlet, useSearchParams, json, useLoaderData } from 'react-router-dom';
import { getTrades } from '../utils/api';
import { tradeParams } from '../utils/types';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Checkbox from '../Checkbox/Checkbox';
import { nanoid } from 'nanoid';
import "react-datepicker/dist/react-datepicker.css";
import { excelToDate, dateToExcel, excelToTime } from '../utils/helpers';
const fileName = "Trades.tsx";

export default function Trades() {
	console.log("[Trades.tsx]");
	let trades = useLoaderData() as any;
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [shortChecked, setShortChecked] = useState(false);
	const [longChecked, setLongChecked] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedTradeSideDropdown, setSelectedTradeSideDropdown] = useState(0);
	const tradeSideDropdownItems = [
		{ text: "All", value: "", onClick: setSelectedTradeSideDropdown },
		{ text: "Long", value: "long", onClick: setSelectedTradeSideDropdown},
		{ text: "Short", value: "short", onClick: setSelectedTradeSideDropdown},
	];

	function handleTradeSideDropdownClick(selectedItem: number) {
		
	}

	let tradesItemsHeader = (
		<div className="trades-item-group">
			<div className="trades-item__small">
				Pnl
			</div>
			<div className="trades-item__medium">
				Instrument
			</div>
			<div className="trades-item__medium">
				Entry time
			</div>
			<div className="trades-item__medium">
				Exit time
			</div>
			<div className="trades-item__small">
				Side
			</div>
			<div className="trades-item">
				Tags
			</div>
			<div className="trades-item">
				options
			</div>
		</div>
	);

	let tradesItems = trades.map((trade: any) => {
		const entryDate = excelToDate(trade.entry_time).toDateString();
		const exitDate = excelToDate(trade.exit_time).toDateString();
		const tradeSide = trade.short ? "SHORT" : "LONG";
		const profitable = trade.pnl - trade.commission > 0 ? " green" : " red";
		const entryTime = excelToTime(trade.entry_time);
		const exitTime = excelToTime(trade.exit_time);
		return (
			<div key={nanoid()} className="trades-item-group">
				<div className={"trades-item__small" + profitable}>
					{trade.pnl > 0 ? `+${trade.pnl.toFixed(2)}` : trade.pnl.toFixed(2)}
				</div>
				<div className="trades-item__medium">
					{trade.instrument}
				</div>
				<div className="trades-item__medium">
					{entryDate} {entryTime}
				</div>
				<div className="trades-item__medium">
					{exitDate} {exitTime}
				</div>
				<div className="trades-item__small">
					{tradeSide}
				</div>
				<div className="trades-item">
					Tags go here
				</div>
				<div className="trades-item">
					options
				</div>
			</div>
		);
	});

	return (
		<div className="trades-container">
			<div className="trades-search-container">
				<div>
					start_date
					<DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} />
				</div>
				<div>
					end_date
					<DatePicker selected={endDate} onChange={(date: any) => setEndDate(date)} />
				</div>
				<div>
					Accounts
				</div>
				<div>
					<Checkbox label="short" value={shortChecked} onChange={() => setShortChecked(!shortChecked)} />
					<Checkbox label="long" value={longChecked} onChange={() => setLongChecked(!longChecked)} />
				</div>
			</div>
			<div className="trades-container">
				{tradesItemsHeader}
				{tradesItems}
			</div>
		</div>
	);
}

export function loader({ request }: any) {
	const url = new URL(request.url);
	const tradeParams: { [key: string]: string } = {
		start_time: url.searchParams.get("start_time") || "",
		end_time: url.searchParams.get("end_time") || "",
		short: url.searchParams.get("short") || "",
		account_names: url.searchParams.get("account_names") || "",
		include: url.searchParams.get("include") || "",
	}
	const queryString = url.searchParams.toString();
	console.log(`[${fileName}:loader]: searchParams(): `, tradeParams);
	console.log(`[${fileName}:loader]: queryString: `, queryString);
	return getTrades(tradeParams);
}
