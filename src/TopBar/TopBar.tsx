import './top-bar.scss';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../utils/api";

interface TopBarProps {
	hideUserNav: boolean,
	setCurrentUser: Function
}

export default function TopBar(props: TopBarProps) {
	const navigate = useNavigate();
	const [disableLogout, setDisableLogout] = useState(false);
	let authLinks = (<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</>);
	if (!props.hideUserNav) {
		authLinks = <button type="submit" onClick={handleLogout} disabled={disableLogout}>Logout</button>;
	}
	
	function handleLogout(e: any) {
		e.preventDefault();
		setDisableLogout(true);
		logout();
		props.setCurrentUser("0");
		navigate("/");
	}
	return (
		<div className="top-bar">
			<div className="top-bar-items">
				{authLinks}
			</div>
		</div>
	);
}