import './calendar_view.scss';
import { Outlet } from 'react-router-dom';

export default function CalendarView() {
	return (
		<div>
			calendar view
			<Outlet />
		</div>
	);
}
