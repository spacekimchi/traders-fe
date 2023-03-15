import '../stylesheets/week.scss';
import { useState } from 'react';
import { nanoid } from 'nanoid';

interface dayProps {
	trades: Array<{ instrument: string, action: string, quantity: number, time: number, commission: number, account_display_name: string }>;
}

export default function Day(props: dayProps) {
	/* 
	 * Stats to track
	 * gross pnl
	 * total pnl
	 * total commissions
	 * short trades
	 * short profits
	 * long trades
	 * long profits
	 * # of trades
	 * Avg. trade time
	 * longest trade time
	 * % profitable trades
	 * highest pnl
	 * lowest pnl
	 * 
	 * profitable trades section
	 *  - total profit
	 *  - # of winning trades
	 *  - Largest winning trade
	 *  - average winning trade
	 *  - average winning trade time
	 *  - shortest winning trade time
	 *  - longest winning trade time
	 * 
	 * losing trades section
	 *  - total loss
	 *  - # of losing trades
	 *  - Largest losing trade
	 *  - average losing trade
	 *  - average losing trade time
	 *  - shortest winning trade time
	 *  - longest winning trade time
	 * 
     */
	//const [stats, setStats] = useState(props.trades);

	let trades = getTrades();

	function getTrades() {
		let sortedTrades = props.trades.sort((a, b) => a.time - b.time);
		let curTrades: { [key: string]: any } = {};
		sortedTrades.forEach((trade) => {
			console.log("trade",trade.instrument);
			const name = trade.instrument;
			if (name in curTrades) {
				if (curTrades[name].trades.empty()) {
				}
			} else {
				curTrades[name] = {
					pnl: 0,
					trades: [],
					totalTrades: 0
				};
			}
		});
		return curTrades;
	}

	const trades_data = props.trades.map((trade: any) => {
		return (<div key={nanoid()}>
			{trade.instrument}
			{trade.action}
			{trade.quantity}
			{trade.price}
			{trade.time}
			{trade.commission}
			{trade.account_display_name}
		</div>);
	});
	function testfunc() {

		return 1;
	}
	return (
		<div className="day">
			{trades_data}
			<div>
				Section1
				<div>
					<p>Gross P/L: {testfunc()}</p>
				</div>
			</div>
			<div>
				Section2
			</div>
			<div>
				Section3
			</div>
		</div>
	);
}
