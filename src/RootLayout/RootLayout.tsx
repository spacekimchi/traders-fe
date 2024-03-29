import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import './root_layout.scss';

export default function RootLayout(props: any) {
	const authContext = useContext(AuthContext);
	const [userLoggedIn, setUserLoggedIn] = useState(authContext.currentUser !== "0");

	useEffect(() => {
		setUserLoggedIn(authContext.currentUser !== "0");
	}, [authContext.currentUser]);

	return (
		<div className="app-container">
			<TopBar userLoggedIn={userLoggedIn} setCurrentUser={authContext.setCurrentUser} />
			<div className="main-page">
				<div className="main-content">
					<Outlet />
				</div>
			</div>
			<div className="footer-container">
			</div>
		</div>
	);
}
