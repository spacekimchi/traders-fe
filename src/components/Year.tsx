import TimeRangeStats from './TimeRangeStats';
import { useEffect } from 'react';
import '../stylesheets/year.scss';

export default function Year(props: any) {
	useEffect(() => {
		console.log('[Year.tsx::useEffect]');
	});

	return (
		<div className="week">
			<TimeRangeStats />
		</div>
	);
}

