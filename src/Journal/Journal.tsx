import './journal.scss';
import { useState, useEffect } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import { groupTradesByDay, excelToDate } from '../utils/helpers';
import { get } from '../utils/api';
import { JournalEntry, Account } from '../utils/types';
import JournalItem from '../JournalItem/JournalItem';
import {Cloudinary} from "@cloudinary/url-gen";

export default function Journal() {
	let loaderData = useLoaderData() as any;
	const [trades, setTrades] = useState(loaderData.trades);
	const [filteredTrades, setFilteredTrades] = useState(trades);
	const [accounts, setAccounts] = useState(loaderData.accounts);
	const [journalEntries, setJournalEntries] = useState(loaderData.journalEntries);
	const simAccount = accounts.find((account: Account) => account.sim);
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'duwe4rlm4'
		}
	});
	const accountsById: { [key: string]: Account } = {};
	accounts.forEach((account: Account) => {
		accountsById[account.id] = account;
	});

	let tradesByDay = groupTradesByDay(trades, simAccount);
	journalEntries.forEach((journalEntry: JournalEntry) => {
		if (journalEntry.entry_date && journalEntry.entry_date in tradesByDay) {
			tradesByDay[journalEntry.entry_date].journalEntry = journalEntry;
		}
	});
	let days = Object.keys(tradesByDay).sort().map((day) => {
		let dayTrades = tradesByDay[day].trades.sort((a, b) => a.entry_time - b.entry_time);
		let journalEntry = tradesByDay[day].journalEntry;
		return (<JournalItem key={day} day={day} dayTrades={dayTrades} accountsById={accountsById} journalEntry={journalEntry} cloudinary={cld} />);
	}).reverse();


	return (
		<>
			{days}
		</>
	);
}

export async function loader({ request }: any) {
	const url = new URL(request.url);
	const tradeParams: { [key: string]: string } = {
		id: url.searchParams.get("id") || "",
		entry_time: url.searchParams.get("entry_time") || "",
		exit_time: url.searchParams.get("exit_time") || "",
		start_time: url.searchParams.get("start_time") || "",
		end_time: url.searchParams.get("end_time") || "",
		short: url.searchParams.get("short") || "",
		account_names: url.searchParams.get("account_names") || "",
		include: url.searchParams.get("include") || "",
	}
	const [trades, accounts, journalEntries] = await Promise.all([
		get('trades', tradeParams).then(res => res.json()),
		get('accounts', {}).then(res => res.json()),
		get('journalEntries', {}).then(res => res.json())
	]);

	return json({ trades, accounts, journalEntries });
}

