import '../stylesheets/signup.scss';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";

export default function Login(props: any) {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	function handleSubmit(e: React.FormEvent) {
		console.log('creating user');
		e.preventDefault();
		fetch("http://127.0.0.1:8000/users", {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error(response.statusText);
			})
			.then((data) => {
				console.log('data: ', data);
				navigate("/month")
			})
			.catch((err) => {
				setErrorMessage(err.toString());
				//console.log('error is: ', err.toString());
			});


	}
	return (
		<div className="signup-container">
			<p>{errorMessage}</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">username</label>
				<input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
				<label htmlFor="email">email</label>
				<input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor="password">password</label>
				<input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}
