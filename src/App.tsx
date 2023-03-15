import React from 'react';
import Calendar from './components/Calendar';
import TopBar from './components/TopBar';
import Day from './components/Day';
import Week from './components/Week';
import Month from './components/Month';
import Year from './components/Year';
import './stylesheets/app.scss';
import { Routes, Route, Link } from "react-router-dom";

function App() {
	const trades = [
		{
			"instrument": "es-6-23",
			"action": "buy",
			"quantity": 1,
			"price": 3998.25,
			"time": 44984.2725966435,
			"commission": 2.04,
			"account_display_name": "sim101",
		},
		{
			"instrument": "es-6-23",
			"action": "sell",
			"quantity": 1,
			"price": 4000.25,
			"time": 44984.273233125,
			"commission": 2.04,
			"account_display_name": "sim101",
		},
	]; 
	return (
		<div className="app-container">
			<TopBar />
			<div className="main-page">
				<div className="left-panel">
					<Calendar />
					<div>
						<Link to="/">Home</Link>
					</div>
					<div>
						<Link to="/day">Day</Link>
					</div>
					<div>
						<Link to="/week">Week</Link>
					</div>
					<div>
						<Link to="/month">Month</Link>
					</div>
					<div>
						<Link to="/year">Year</Link>
					</div>
				</div>
				<div className="main-content">
					<Routes>
						<Route path="/day" element={<Day trades={trades} />} />
						<Route path="/week" element={<Week trades={trades} />} />
						<Route path="/month" element={<Month trades={trades} />} />
						<Route path="/year" element={<Year trades={trades} />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
