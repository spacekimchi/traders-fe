import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import TopBar from './components/TopBar';
import Day from './components/Day';
import Week from './components/Week';
import Month from './components/Month';
import Year from './components/Year';
import './stylesheets/app.scss';
import { Routes, Route, Link } from "react-router-dom";

function App() {
	const [trades, setTrades] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:8000/trades")
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log('maybe do it in here');
				setTrades(data);
			});
	}, []);

	const routes = (
		<Routes>
			<Route path="/day" element={<Day trades={trades} />} />
			<Route path="/week" element={<Week trades={trades} />} />
			<Route path="/month" element={<Month trades={trades} />} />
			<Route path="/year" element={<Year trades={trades} />} />
		</Routes>
	);
	const loading = (
		<div>loading</div>
	);
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
					{
						trades.length ? routes : loading
					}
				</div>
			</div>
		</div>
	);
}

export default App;

