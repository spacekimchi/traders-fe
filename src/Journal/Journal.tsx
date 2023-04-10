import './journal.scss';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { groupTradesByDay, excelToDate } from '../utils/helpers';
import JournalItem from '../JournalItem/JournalItem';

export default function Journal() {
	let loaderData = useLoaderData() as any;
	const [trades, setTrades] = useState(loaderData.trades);
	const [filteredTrades, setFilteredTrades] = useState(trades);
	const [accounts, setAccounts] = useState(loaderData.accounts);
	const simAccount = accounts.find((account: any) => account.sim);

	let tradesByDay = groupTradesByDay(trades, simAccount);
	let days = Object.keys(tradesByDay).sort().map((day) => {
		let dayTrades = tradesByDay[day].sort((a,b) => a.entry_time - b.entry_time);
		return (<JournalItem key={day} day={day} dayTrades={dayTrades} />);
	}).reverse();

	
	return (
		<>
			{days}
		</>
	);
}
