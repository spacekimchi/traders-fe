import { Outlet, Link, useLoaderData } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import UserNav from '../UserNav/UserNav';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
const fileName = "RootLayout.tsx";

export default function RootLayout(props: any) {
	const authContext = useContext(AuthContext);
	console.log(`[${fileName}] authContext.currentUser: `, authContext.currentUser);
	const [hideUserNav, setHideUserNav] = useState(authContext.currentUser === "0");
	useEffect(() => {
		console.log(`[${fileName}:useEffect()] authContext.currentUser: `, authContext.currentUser);
		setHideUserNav(authContext.currentUser === "0");
	}, [authContext.currentUser]);
	return (
		<div className="app-container">
			<TopBar hideUserNav={hideUserNav} setCurrentUser={authContext.setCurrentUser} />
			<div className="main-page">
				{hideUserNav ? <></> : <UserNav />}
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
