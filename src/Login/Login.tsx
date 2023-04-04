import './login.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface LoginProps {
	setCurrentUser: Function,
}

export default function Login(props: any) {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		fetch("/api/login", {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: {
				'Content-type': 'application/json;',
			},
			credentials: 'include',
		})
			.then((response: any) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error(response.statusText);
			})
			.then((data) => {
				props.setCurrentUser(data);
				navigate("/")
			})
			.catch((err) => {
				setErrorMessage(err.toString());
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
