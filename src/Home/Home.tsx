import './home.scss';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

const fileName = "Home.tsx";

interface HomeProps {
	currentUser: string,
	setCurrentUser: Function,
}

export default function Home(props: any) {
	const authContext = useContext(AuthContext);
	return (
		<div className="home-container">
		</div>
	);
}
