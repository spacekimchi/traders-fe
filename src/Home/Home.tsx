import './home.scss';

const fileName = "Home.tsx";

interface HomeProps {
	currentUser: string,
	setCurrentUser: Function,
}

export default function Home(props: any) {
	console.log(`[${fileName}:main] currentUser:${props.currentUser}`, props.currentUser);
	return (
		<div className="home-container">
			Home
		</div>
	);
}