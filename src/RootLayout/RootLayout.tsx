import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import UserNav from '../UserNav/UserNav';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import './root_layout.scss';
const fileName = "RootLayout.tsx";

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
				<UserNav></UserNav>
				<div className="main-content">
					<Outlet />
				</div>
			</div>
			<div className="footer-container">
				Footer
			</div>
		</div>
	);
}
