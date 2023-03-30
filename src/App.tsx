import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import TopBar from './components/TopBar';
import Day from './components/Day';
import Week from './components/Week';
import Month from './components/Month';
import Year from './components/Year';
import Login from './components/Login';
import Signup from './components/Signup';
import './stylesheets/app.scss';
import { Routes, Route, Link } from "react-router-dom";

function App() {
	const routes = (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/day" element={<Day />} />
			<Route path="/week" element={<Week />} />
			<Route path="/month" element={<Month />} />
			<Route path="/year" element={<Year />} />
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
					{routes}
				</div>
			</div>
		</div>
	);
}

export default App;

