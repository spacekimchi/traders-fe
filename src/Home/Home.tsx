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
			<h1>Welcome to my trading page</h1>
            <p>Trades displayed on this page are all done through the <a href="https://apextraderfunding.com/member/aff/go/jinius?c=SAVE90">APEX funded trader</a> program on NinjaTrader. More information about APEX can be found at the bottom of this page.{/*They can, however, be viewed on the <Link to="/trades">trades</Link> page.*/}</p>
            <p>
                Head over to the <Link to="/journal">Journal</Link> page to see my trades.
            </p>
            <p>
                Or go to my <Link to="/calendar">Calendar</Link> to see an overview
            </p>
			<p>Visitors to this site will be displayed trades that I made, while users who are logged in will see their own trades.</p>
			<p>Only logged in users are allowed to import trades.</p>
            <p>
                Feel free to email me at jingwoun@gmail.com if you'd like an account here to record your trades.
            </p>
			<p>Thank you for visiting, and enjoy your stay! :)</p>
            <h3>What is APEX</h3>
            <p>
                Apex funded trading is using other people's money to trade. For a $30-$40 monthly subscription fee, you are given an evaluation account to trade. If the account profits a certain amount, it will be upgraded to a PA account for a one-time fee. If it loses money and reaches a target trailing drawdown, the evaluation account is locked for the remainder of the month. Locked accounts can be reset for a fee.
            </p>
            <p>
                Profits on PA accounts are split between the trader and APEX, with 90% going to the trader and 10% going to APEX. The trader keeps 100% of the profits for the first $25,000.
            </p>
            <h3>
                Why use APEX (or any other prop trading firm)
            </h3>
            <p>
                Trading through a prop firm allows you to learn and practice trading without risking your own money. Your risk is only the monthly subscription and the one-time PA account fee.
            </p>
            <h3>Example</h3>
            <p>
                A $50,000 evaluation account has a monthy subscription fee of $35.00, with a profit target of $3,000 and a trailing drawdown of $2,500. If at any point the evaluation account reaches $53,000, it will be upgraded to a PA account for a one-time fee of ~$150.00. If the account ever reaches $2,500 below its peak value (peak_account_value - $2,500), the account will be locked for the month, and will be tradable again on the next billing cycle.
            </p>
            <p>
                So for new accounts, the drawdown target is $47,500. One more example, an account that had a peak value of $52,000, but lost some money and is now at $50,000 will have a drawdown target of $49,500 ($52,000 - $2,500).
            </p>
            <p>
                The same trailing drawdown rules apply to PA accounts, but will stop trailing after it reaches $100 above the initial account value.
            </p>
            <p>
                For example, once a $50,000 account reaches a value of $52,600, the drawdown will be $50,100 and will no longer trail. So even if the account reaches $60,000, the drawdown will be $50,100 ($52,600 - $2,500) and no longer trail. If the drawdown is reached, the PA account will be lost and the trader will have to start over with an evaluation account.
            </p>
		</div>
	);
}
