import TimeRangeStats from './TimeRangeStats';
import '../stylesheets/week.scss';

export default function Month(props: any) {
	return (
		<div className="week">
			<TimeRangeStats />
		</div>
	);
}
