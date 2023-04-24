import { useEffect, useState } from 'react';
import {tradeParams} from '../utils/types';
import { nanoid } from 'nanoid';
import './month.scss';
import { Link, useLoaderData, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getTrades, getAccounts } from '../utils/api';
import { Account, Trade } from '../utils/types';
import { dateToExcel, excelToDate, groupTradesByDay } from '../utils/helpers';
import DollarVal from '../DollarVal/DollarVal';

const fileName = "Month.tsx";

interface tradesProps {
	trades: Array<Trade>;
}

export async function loader({ request }: any) {
	const url = new URL(request.url);
	const tradeParams: { [key: string]: string } = {
		start_time: url.searchParams.get("start_time") || "",
		end_time: url.searchParams.get("end_time") || "",
		short: url.searchParams.get("short") || "",
		account_names: url.searchParams.get("account_names") || "",
		include: url.searchParams.get("include") || "",
	}
	const [trades, accounts] = await Promise.all([
		getTrades(tradeParams).then(res => res.json()),
		getAccounts("").then(res => res.json())
	]);
	return json({ trades, accounts });
}

export default function Month(props: any) {
	let loaderData = useLoaderData() as any;
	const [accounts, setAccounts] = useState(loaderData.accounts);
	const [trades, setTrades] = useState(loaderData.trades);
	const simAccount = accounts.find((account: Account) => account.sim);
	const navigate = useNavigate();
	let tradesByDay = groupTradesByDay(trades, simAccount);
	const MONTHS: { [key: string]: number } = {
		0: 31,
		1: 28,
		2: 31,
		3: 30,
		4: 31,
		5: 30,
		6: 31,
		7: 31,
		8: 30,
		9: 31,
		10: 30,
		11: 31,
	};
	const dayDict: { [key: string]: string } = {
		0: "Sun",
		1: "Mon",
		2: "Tues",
		3: "Wed",
		4: "Thur",
		5: "Fri",
		6: "Sat",
	};

	function getPnl(trades: Array<Trade>) {
		let pnl = 0.0;
		trades.forEach((trade) => {
			pnl += trade.pnl - trade.commission;
		});
		return pnl.toFixed(2);
	}

	function createCalendar() {
		const curDate = new Date();
		const curYear = curDate.getFullYear();
		const curMonth = curDate.getMonth();
		const curDay = curDate.getDay();
		const firstOfMonth = new Date(curYear, curMonth, 1);
		const firstDay = firstOfMonth.getDay();
		const firstDate = firstOfMonth.getDate();
		const endOfMonth = new Date(curYear, curMonth + 1, 0);
		const lastDay = endOfMonth.getDay();
		const lastDate = endOfMonth.getDate();
		const days = [];

		for (let i = 0; i < firstDay; i+=1) {
			let tempDate = new Date();
			days.push(new Date(curYear, curMonth, 0 - i));
		}
		days.reverse()
		for (let i = firstDate; i <= endOfMonth.getDate(); i += 1) {
			days.push(new Date(curYear, curMonth, i));
		}
		for (let i = lastDay + 1; i < 7; i += 1) {
			days.push(new Date(curYear, curMonth, lastDate + (i - lastDay)));
		}
		const weeks: any = [];
		days.forEach((day: Date, idx: number) => {
			let d = dateToExcel(day);
			const dayHtml = (
				<div key={idx} className="day">
					<div>{day.getDate()}</div>
					<div>{dayDict[day.getDay()]}</div>
					<div>{d in tradesByDay ? <DollarVal val={getPnl(tradesByDay[d].trades)} /> : ""}</div>
					 
				</div>
			);
			if (idx % 7 === 0) {
				if (weeks.length) {
					weeks[weeks.length - 1].pop();
				}
				weeks.push([]);
			} else {
				weeks[weeks.length - 1].push(dayHtml);
			}
		});
		weeks[weeks.length - 1].pop();
		return weeks;
	}

	const weeks = createCalendar().map((week: any, idx: number) => {
		return (<div key={idx} className="week-container">{week}</div>);
	});

	return (
		<div className="calendar-container">
			<div className="month-container">
				{weeks}
			</div>
		</div>
	);
}
