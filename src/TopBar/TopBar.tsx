import './top-bar.scss';
import { Link } from "react-router-dom";

export default function TopBar() {
	return (
		<div className="top-bar">
			top-bar
			<div>
				<Link to="/login">Login</Link>
				<Link to="/signup">Signup</Link>
			</div>
		</div>
	);
}
