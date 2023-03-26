import { useEffect } from 'react';
import TimeRangeStats from './TimeRangeStats';
import { warn } from 'console';
import { nanoid } from 'nanoid';
import '../stylesheets/month.scss';

interface tradesProps {
	trades: Array<{id: number, account_id: number, commission: number, entry_time: number, exit_time: number, instrument: string, pnl: number, short: boolean}>;
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
	let tradesByDay: { [key: string]: any[] } = {};
	useEffect(() => {
		console.log("in useeffect trades: ", props.trades);
		if (props.trades) {
			props.trades.forEach((trade: any) => {
				// console.log("trade: ", trade);
				const day = Math.floor(trade.entry_time);
				if (!(day in tradesByDay)) {
					tradesByDay[day] = [trade];
				} else {
					tradesByDay[day].push(trade);
				}
			});
		}
	}, [props.trades]);

	console.log('tradesbyday: ', Object.keys(tradesByDay));
	function createWeek(day: number, date: number, month: number) {
		/* TODO if input numbers dont make sense return some error week */
		/* Also needs leap year calculations */
		const week = [0, 0, 0, 0, 0, 0, 0];
		let curDate = date;
		week[day] = curDate;
		curDate -= 1;
		for (let i = day - 1; i >= 0; i -= 1) {
			if (curDate <= 0) {
				curDate = MONTHS[(month + 11) % 12];
			}
			week[i] = curDate;
			curDate -= 1;
		}
		curDate = date + 1;
		for (let i = day + 1; i < week.length; i += 1) {
			if (curDate > MONTHS[month]) {
				curDate = 1;
			}
			week[i] = curDate;
			curDate += 1;
		}
		return week.map((d, i) => {
			return (
				<div key={nanoid()} className="weekday">
					{d} {dayDict[i]}
					<div>
						<p>pnl: +100</p>
						<p>commission: 100</p>
						<p>trades: 3</p>
					</div>
				</div>
			);
		});
	}
	const xcellDate = new Date(1899, 12, 30);
	xcellDate.setDate(xcellDate.getDate() + 45009);
	console.log('date: ', xcellDate.getDate());
	console.log('day: ', xcellDate.getDay());
	console.log('month: ', xcellDate.getMonth());
	console.log('full year: ', xcellDate.getFullYear());
	const d1 = new Date(1900, 1, 1);
	const d2 = new Date();
	const diff = d2.getTime() - d1.getTime();
	const diffDays = diff / (1000 * 3600 * 24);
	const newDate = new Date();
	const day = newDate.getDay();
	const date = newDate.getDate();
	const month = newDate.getMonth();
	//const week = createWeek(1, 27, month);
	function createCalendar(month: number, year: number) {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const fdDay = firstDay.getDay();
		const weeks = [];
		weeks.push(createWeek(fdDay, 1, month));
		for (let i = (7 - fdDay) + 1; i < lastDay.getDate(); i += 7) {
			weeks.push(createWeek(0, i, month));
		}
		return weeks.map((week) => {
			return (<div key={nanoid()} className="week-container">{week}</div>);
		});
	}
	const weeks = createCalendar(month, newDate.getFullYear());

	return (
		<div className="month">
			{weeks}
		</div>
	);
}
