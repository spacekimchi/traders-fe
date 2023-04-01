import React, { useEffect, useState } from 'react';
import TopBar from './TopBar/TopBar';
import Day from './Day/Day';
import Week from './Week/Week';
import Month from './Month/Month';
import Year from './Year/Year';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import './stylesheets/app.scss';
import { Routes, Route, Link, Navigate } from "react-router-dom";

/*
 *	/trades => Month View
 *	/trades/{year, month, week, day}/{2023}/{03}/{31} => Any missing field will default back to Month View
 */

function App() {
	const routes = (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/trade">
				<Route path="day" element={<Day />} />
				<Route path="week" element={<Week />} />
				<Route path="month" element={<Month />} />
				<Route path="year" element={<Year />} />
				<Route path="*" element={<Navigate to="/trade/month" replace />} />
			</Route>
		</Routes>
	);
	return (
		<div className="app-container">
			<TopBar />
			<div className="main-page">
				<div className="left-panel">
					<div>
						<Link to="/">Home</Link>
					</div>
					<div>
						<Link to="/profile">Profile</Link>
					</div>
					<div>
						<Link to="/trade/day">Day</Link>
					</div>
					<div>
						<Link to="/trade/week">Week</Link>
					</div>
					<div>
						<Link to="/trade/month">Month</Link>
					</div>
					<div>
						<Link to="/trade/year">Year</Link>
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

