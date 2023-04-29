import './login.scss';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../utils/AuthContext';
import { login } from '../utils/api';

const fileName = "[Login.tsx:";

interface LoginProps {
	setCurrentUser: Function,
}

export default function Login(props: any) {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		login(username, password)
			.then((data) => {
				authContext.setCurrentUser(data);
				navigate("/");
			})
			.catch((err) => {
				setErrorMessage(err.message);
			});
	}
	return (
		<div className="login-container">
			<p>{errorMessage}</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">username</label>
				<input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
				<label htmlFor="password">password</label>
				<input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}
