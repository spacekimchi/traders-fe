import './top-bar.scss';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { logout } from "../utils/api";
import { AuthContext } from '../utils/AuthContext';
import logo from '../assets/logo.png';

interface TopBarProps {
	userLoggedIn: boolean,
	setCurrentUser: Function
}

export default function TopBar(props: TopBarProps) {
	const navigate = useNavigate();
	const [disableLogout, setDisableLogout] = useState(false);

	let authLinks = (
		<>
			<Link to="/login" className="top-bar-items__item">Login</Link>
		</>
	);

	let navLinks = (
		<div className="top-bar__links-list">
			<Link to="/journal" className="top-bar-items__item">Journal </Link> |
			<Link to="/calendar" className="top-bar-items__item"> Calendar </Link> |
			<Link to="/statistics" className="top-bar-items__item"> Statistics </Link> |
			<Link to="/trades" className="top-bar-items__item"> Trades </Link>
		</div>
	);

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
			<Link to="/" className=""><img src={logo} alt="logo" /></Link>
			<div className="top-bar__links-container">
				<span className="top-bar__links-title">Trade better</span>
				{navLinks}
			</div>
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
