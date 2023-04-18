import Month, { loader as tradesMonthLoader } from './Month/Month';
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
import ImportPage from './ImportPage/ImportPage';
import { loader as tradesLoader } from './Trades/Trades';
import { getCurrentUser } from './utils/api';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useRouteError, defer } from "react-router-dom";
import { AuthLayout } from './AuthLayout/AuthLayout';
import { loader as journalLoader } from './Journal/Journal';

const router = createBrowserRouter(createRoutesFromElements(
	<Route element={<AuthLayout />} loader={() => defer({ userPromise: currentUserLoader() })}>
		<Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />} >
			<Route index element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/import" element={<ImportPage />} />
			<Route path="/journal" element={<Journal />} loader={journalLoader} errorElement={<ErrorBoundary />} />
			<Route path="/calendar" element={<CalendarView />} >
				<Route index element={<Month />} loader={tradesMonthLoader} />
			</Route>
			<Route path="/statistics" element={<Statistics />} />
			<Route path="/trades" element={<Trades />} loader={tradesLoader} errorElement={<ErrorBoundary />} />
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

