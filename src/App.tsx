import React from 'react';
import Calendar from './components/Calendar';
import './stylesheets/app.scss';

function App() {
	return (
		<div className="app-container">
			<div className="left-panel">
				<Calendar />
			</div>
			<div className="main-content">
				main content
			</div>
		</div>
	);
}

export default App;
