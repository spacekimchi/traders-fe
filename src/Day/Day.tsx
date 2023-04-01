interface dayProps {
	trades: Array<{ instrument: string, action: string, quantity: number, time: number, commission: number, account_display_name: string }>;
}

export default function Day(props: any) {
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


	return (
		<div className="day">
			Welcome to the day view
		</div>
	);
}
