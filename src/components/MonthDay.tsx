import '../stylesheets/week-day.scss';

/*
 * trades
 * date (1-31)
 * day
 */


interface monthDayProps {
	trades: Array<{ id: number, account_id: number, commission: number, entry_time: number, exit_time: number, instrument: string, pnl: number, short: boolean }>;
}

export default function MonthDay(props: any) {
	return (
		<div className="day">{props.dayNum}</div>
	);
}
