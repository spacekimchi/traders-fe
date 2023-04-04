import './user_nav.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as JournalIcon } from '../icons/open-book.svg';
import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as ChartPipeIcon } from '../icons/chart-pipe.svg';
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg';
import { ReactComponent as TradeIcon } from '../icons/trade.svg';

export default function UserNav() {
	return (
		<div className="left-bar">
			<div>
				<HomeIcon height={25} width={25} />
				<Link to="/">Home</Link>
			</div>
			<div>
				<JournalIcon height={25} width={25} />
				<Link to="/journal">Journal</Link>
			</div>
			<div>
				<CalendarIcon height={25} width={25} />
				<Link to="/calendar">Calendar</Link>
			</div>
			<div>
				<ChartPipeIcon height={25} width={25} />
				<Link to="/statistics">Statistics</Link>
			</div>
			<div>
				<TradeIcon height={25} width={25} />
				<Link to="/trades">Trades</Link>
			</div>
		</div>
	);
}
