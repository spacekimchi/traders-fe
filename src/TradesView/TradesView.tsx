import { Outlet } from 'react-router-dom';
export default function TradesView() {
	return (
		<div>
			Welcome to TradesView
			This will be where different views will be rendered depending on the route param

			<Outlet />
		</div>
	);
}
