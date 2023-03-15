import TimeRangeStats from './TimeRangeStats';
import WeekDay from './WeekDay';
import '../stylesheets/week.scss';

export default function Week(props: any) {
	const days_components = Array.from({ length: 5 }, (_, i) => i + 1).map((day) => {
		return <WeekDay dayNum={day} key={day+100}/>;
	});
	return (
		<div className="week">
			<div className="week-days">
				{days_components}
			</div>
		</div>
	);
}
