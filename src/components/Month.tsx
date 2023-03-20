import TimeRangeStats from './TimeRangeStats';
import '../stylesheets/week.scss';
import { warn } from 'console';

export default function Month(props: any) {
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
	//const calendar = [];
	function createWeek(day: number, date: number, month: number) {
		/* TODO if input numbers dont make sense return some error week */
		/* Also needs leap year calculations */
		const week = [0, 0, 0, 0, 0, 0, 0];
		console.log('week.length: ', week.length);
		let curDate = date;
		week[day] = curDate;
		curDate -= 1;
		for (let i = day - 1; i >= 0; i-=1) {
			console.log('not here');
			if (curDate <= 0) {
				curDate = MONTHS[(month + 11) % 12];
			}
			week[i] = curDate;
			curDate -= 1;
		}
		curDate = date+1;
		for (let i = day+1; i < week.length; i+=1) {
			if (curDate > MONTHS[month]) {
				curDate = 1;
			}
			week[i] = curDate;
			curDate += 1;
		}
		console.log('am i here');
		return week.map((d, i) => (<div>{d}   {dayDict[i]}</div>));
	}
	const newDate = new Date();
	const day = newDate.getDay();
	const date = newDate.getDate();
	const month = newDate.getMonth();
	const week = createWeek(1, 27, month);
	function createCalendar(month: number, year: number) {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const fdDay = firstDay.getDay();
		const weeks = [];
		weeks.push(createWeek(fdDay, 1, month));
		for (let i = (7-fdDay) + 1; i < lastDay.getDate(); i+=7) {
			weeks.push(createWeek(0, i, month));
		}
		return weeks;
	}
	const weeks = createCalendar(month, newDate.getFullYear());
	
	return (
		<div className="month">
			{weeks}
		</div>
	);
}
