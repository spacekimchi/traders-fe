import React from 'react';
import Calendar from './components/Calendar';
import TopBar from './components/TopBar';
import Week from './components/Week';
import './stylesheets/app.scss';

function App() {
	return (
		<div className="app-container">
			<TopBar />
			<div className="main-page">
				<div className="left-panel">
					<Calendar />
				</div>
				<div className="main-content">
					<Week />
				</div>
			</div>
		</div>
	);
}

export default App;
