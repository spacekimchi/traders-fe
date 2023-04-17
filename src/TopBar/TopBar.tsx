import './top-bar.scss';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { logout } from "../utils/api";
import { AuthContext } from '../utils/AuthContext';
import logo from '../assets/wide_logo.png';

interface TopBarProps {
	userLoggedIn: boolean,
	setCurrentUser: Function
}

export default function TopBar(props: TopBarProps) {
	const navigate = useNavigate();
	const [disableLogout, setDisableLogout] = useState(false);
	let authLinks = (<>
		<Link to="/login" className="top-bar-items__item">Login</Link>
		<Link to="/signup" className="top-bar-items__item">Signup</Link>
	</>);
	let logoutButton = (<button type="submit" onClick={handleLogout} disabled={disableLogout}>Logout</button>);

	function handleLogout(e: any) {
		e.preventDefault();
		setDisableLogout(true);
		logout();
		navigate("/");
		setDisableLogout(false);
	}

	return (
		<div className="top-bar">
			<img src={logo} />
			<div className="top-bar-items">
				{
					props.userLoggedIn ?
					logoutButton :
					authLinks
				}
			</div>
		</div>
	);
}
