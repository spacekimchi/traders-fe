import './user_nav.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as JournalIcon } from '../icons/open-book.svg';
import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as ChartPipeIcon } from '../icons/chart-pipe.svg';
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg';
import { ReactComponent as TradeIcon } from '../icons/trade.svg';
import { ReactComponent as UploadArrowIcon } from '../icons/upload-arrow.svg';

export default function UserNav(props: any) {
	return (
		<div className="nav-bar">
			<div className="nav-bar-item">
				<Link to="/journal" className="nav-link">
					<JournalIcon height={25} width={25} /> Journal
				</Link>
			</div>
			<div className="nav-bar-item">

				<Link to="/calendar" className="nav-link">
					<CalendarIcon height={25} width={25} /> Calendar
				</Link>
			</div>
			<div className="nav-bar-item">

				<Link to="/statistics" className="nav-link">
					<ChartPipeIcon height={25} width={25} /> Statistics
				</Link>
			</div>
			<div className="nav-bar-item">
				<Link to="/trades" className="nav-link">
					<TradeIcon height={25} width={25} /> Trades
				</Link>
			</div>
			{
				props.userLoggedIn ?
				(
					<div className="nav-bar-item">
						<Link to="/import" className="nav-link">
							<UploadArrowIcon height={25} width={25} /> Import
						</Link>
					</div>
				) : <></>

			}
		</div>
	);
}
