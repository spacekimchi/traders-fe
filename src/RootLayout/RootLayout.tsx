import { Outlet, Link, useLoaderData } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import UserNav from '../UserNav/UserNav';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
const fileName = "RootLayout.tsx";

export default function RootLayout(props: any) {
	const authContext = useContext(AuthContext);
	console.log(`[${fileName}] authContext: `, authContext);
	const [hideUserNav, setHideUserNav] = useState(props.currentUser === "0");
	useEffect(() => {
		setHideUserNav(props.currentUser === "0");
		console.log(`[${fileName}:useEffect()] props.currentUser: `, props.currentUser);
	}, [props.currentUser]);
	return (
		<div className="app-container">
			<TopBar hideUserNav={hideUserNav} setCurrentUser={props.setCurrentUser} />
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
