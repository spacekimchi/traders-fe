import React, { useEffect, useState } from 'react';
import TopBar from './TopBar/TopBar';
import Day from './Day/Day';
import Week from './Week/Week';
import Month, { loader as tradesMonthLoader } from './Month/Month';
import Year from './Year/Year';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Journal from './Journal/Journal';
import CalendarView from './CalendarView/CalendarView';
import Statistics from './Statistics/Statistics';
import Trades from './Trades/Trades';
import TradesView from './TradesView/TradesView';
import TradesDate from './TradesDate/TradesDate';
import RootLayout from './RootLayout/RootLayout';
import { loader as tradesLoader } from './Trades/Trades';
import './stylesheets/app.scss';
import { getCurrentUser } from './utils/api';
import { Routes, Route, Link, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements, useRouteError, useLoaderData } from "react-router-dom";

/*
 *	/trades => Month View
 *	/trades/{year, month, week, day}/{2023}/{03}/{31} => Any missing field will default back to Month View
 */

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<RootLayout />} loader={currentUserLoader} errorElement={<ErrorBoundary />} >
		<Route index element={<Home />} />
		<Route path="/login" element={<Login />} />
		<Route path="/signup" element={<Signup />} />
		<Route path="/journal" element={<Journal />} />
		<Route path="/calendar" element={<CalendarView />} >
			<Route index element={<Month />} loader={tradesMonthLoader} />
			<Route path="month/:start_time/:stop_time" element={<Month />} />
			<Route path=":trades_view(day|week|month|year)" element={<TradesView />}>
				<Route index element={<Month />} loader={tradesMonthLoader} />
				<Route path=":trades_view(day|week|month|year)/:trades_date" element={<TradesDate />} />
			</Route>
		</Route>
		<Route path="/statistics" element={<Statistics />} />
		<Route path="/trades" element={<Trades />} loader={tradesLoader} errorElement={<ErrorBoundary />} >
		</Route>
	</Route>
));

function currentUserLoader() {
	return getCurrentUser();
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;

