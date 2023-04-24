import './home.scss';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { Link } from "react-router-dom";

const fileName = "Home.tsx";

interface HomeProps {
	currentUser: string,
	setCurrentUser: Function,
}

export default function Home(props: any) {
	const authContext = useContext(AuthContext);
	return (
		<div className="home-container">
			<h1>Welcome to my trading page.</h1>
			<p>Trades displayed on this page are all done through the <a href="https://apextraderfunding.com/member/aff/go/jinius?c=SAVE80">APEX funded trader</a> program on NinjaTrader. Any trade made using simulation accounts are not added to the totals on the <Link to="/journal">journal</Link> or <Link to="/calendar">calendar</Link> pages. They can, however, be viewed on the <Link to="/trades">trades</Link> page.</p>
			<p>Daily trades, charts, and notes can be seen on the <Link to="/journal">Journal</Link> page.</p>
			<p>Trades can be tagged, which is similar to categorizing trades. Users can view statistics of trades based on the taggings.</p>
			<p>Visitors to this site will be displayed trades that I made, while users who are logged in will see their trades.</p>
			<p>Only logged in users are allowed to import trades. Feel free to email me at jingwoun@gmail.com if you are interested and would like me to open a free account for you.</p>
			<p>Thank you for visiting, and enjoy your stay! :)</p>
		</div>
	);
}
