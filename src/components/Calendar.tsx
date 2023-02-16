import React from 'react';
import '../stylesheets/calendar.scss';
import CalendarDay from './CalendarDay';

export default function Calendar() {

	const dte = Array.from({length: 10}, (_, i) => i + 1);
	const calendarDays = dte.map((val) => {
		return <CalendarDay day={val} />;
	});
	return (
		<div className="calendar-container">
			Calendar
		</div>
	);
}
