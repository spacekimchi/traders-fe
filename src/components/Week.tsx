import WeeklyStats from './WeeklyStats';
import WeekDay from './WeekDay';
import '../stylesheets/week.scss';

export default function Week() {
	const days = Array.from({ length: 5 }, (_, i) => i + 1).map((day) => {
		return <WeekDay dayNum={day} />;
	});
	return (
		<div className="week">
			<WeeklyStats />
			<div className="week-days">
				{days}
			</div>
		</div>
	);
}
