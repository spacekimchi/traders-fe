import './year.scss';
import { Outlet } from 'react-router-dom';

export default function Year(props: any) {
	return (
		<div className="year-container">
            <Outlet />
		</div>
	);
}

