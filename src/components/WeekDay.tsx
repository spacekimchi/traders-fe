import '../stylesheets/week-day.scss';

export default function WeekDay(props: any) {
	return (
		<div className="day">{props.dayNum}</div>
	);
}
