import { useEffect, useState } from 'react';
import TimeRangeStats from './TimeRangeStats';
import { dir, warn } from 'console';
import { nanoid } from 'nanoid';
import '../stylesheets/month.scss';

interface tradesProps {
	trades: Array<Trade>;
}

interface Trade {id: number, account_id: number, commission: number, entry_time: number, exit_time: number, instrument: string, pnl: number, short: boolean
}

export default function Month(props: tradesProps) {
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
		0: "Sunday",
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday",
	};
	const weeks = createCalendar(new Date().getMonth(), new Date().getFullYear());

	function createCalendar(month: number, year: number) {
		const firstDay = new Date(year, month, 1);
		const firstDayDate = firstDay.getDate();
		const firstDayExcel = dateToExcel(firstDay);
		const lastDay = new Date(year, month + 1, 0);
		const fdDay = firstDay.getDay();
		const weeks = [];
		let tradesByDay: { [key: string]: Trade[] } = {};
		props.trades.forEach((trade: Trade) => {
			const day = Math.floor(trade.entry_time);
			if (!(day in tradesByDay)) {
				tradesByDay[day] = [trade];
			} else {
				tradesByDay[day].push(trade);
			}
		});

		weeks.push(createWeek(fdDay, firstDayDate, month, firstDayExcel, tradesByDay));
		let excelDate = firstDayExcel + (7 - fdDay);
		for (let i = (7 - fdDay) + 1; i < lastDay.getDate(); i += 7) {
			weeks.push(createWeek(0, i, month, excelDate, tradesByDay));
			excelDate += 7;
		}
		return weeks.map((week) => <div key={nanoid()} className="week-container">{week}</div>);
	}

	function createWeek(day: number, date: number, month: number, excelDate: number, tradesByDay: { [key: string]: any[] }) {
		/* TODO if input numbers dont make sense return some error week */
		/* Also needs leap year calculations */
		let week = [];
		let curDay = 0;
		if (day) {
			const prevMonthDays = MONTHS[(month + 11) % 12];
			excelDate -= day;
			for (let curDate = prevMonthDays - day; curDate <= prevMonthDays; curDate += 1) {
				week.push(
					<div key={nanoid()} className="weekday">
						{curDate} {dayDict[curDay]}
						{
							excelDate in tradesByDay ?
								<div>
									<p>
										pnl: {tradesByDay[excelDate].reduce((acc, trade) => acc + trade.pnl, 0).toFixed(2)}
									</p>
									<p>
										commission: {tradesByDay[excelDate].reduce((acc, trade) => acc + trade.commission, 0).toFixed(2)}
									</p>
									<p>
										trades: {tradesByDay[excelDate].length}
									</p>
								</div>
								:
								<div>No trades</div>
						}
					</div>
				);
				excelDate += 1;
				curDay += 1;
			}
		}
		let curDate = date;
		while (curDay < 7) {
			week.push(
				<div key={nanoid()} className="weekday">
					{curDate} {dayDict[curDay]}
					{
						excelDate in tradesByDay ?
							<div>
								<p>
									pnl: {tradesByDay[excelDate].reduce((acc, trade) => acc + trade.pnl, 0).toFixed(2)}
								</p>
								<p>
									commission: {tradesByDay[excelDate].reduce((acc, trade) => acc + trade.commission, 0).toFixed(2)}
								</p>
								<p>
									trades: {tradesByDay[excelDate].length}
								</p>
							</div>
							:
							<div>No trades</div>
					}
				</div>
			);
			excelDate += 1;
			curDay += 1;
			curDate += 1;
		}
		return week;
	}

	function dateToExcel(date: Date) {
		return 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
	}

	return (
		<div className="month">
			{weeks}
		</div>
	);
}
