import { warn } from 'console';
import { json } from "react-router-dom";
import { tradeParams } from './types';
const fileName = "api.ts";

const ROUTES: { [key: string]: string } = {
	trades: '/api/trades',
	logout: '/api/logout',
	login: '/api/login',
	signup: '/api/users',
};

function queryParamBuilder(params: { [key: string]: string }) {
	let qp: string[] = [];
	for (const k in params) {
		qp.push(`${k}=${params[k]}`);
	}
	return qp.length ? '?' + qp.join('&') : "";
}

export async function getTrades(qp: { [key: string]: string }) {
	console.log('[api.ts:getTrades] getting trades');
	console.log('[api.ts:getTrades] queryString: ', qp);

	let response = await fetch(`${ROUTES.trades}/${queryParamBuilder(qp)}`);
	if (!response.ok) {
		console.log('response: ', response);
		throw { message: 'Failed to fetch trades', status: 500 };
	}
	return response;
}

export async function getCurrentUser() {
	console.log('[api.tsx]: getting current user');
	let response = await fetch('/api/current_user');
	if (!response.ok) {
		console.log('Error occured while trying to get current user');
		throw { message: 'Failed to fetch current user', status: 500 };
	}
	return response.json();
}

export async function logout() {
	const response = await fetch(ROUTES.logout, {
		method: "POST"
	});
	if (!response.ok) {
		console.log('Error occured while trying to logout');
		throw { message: 'Failed to logout', status: 500 };
	}
	console.log(`[${fileName}:logout()]: response: `, response);
	return response;
}

export async function login(username: string, password: string) {
	const response = await fetch(ROUTES.login, {
		method: "POST",
		body: JSON.stringify({
			username: username,
			password: password
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		},
	});
	if (!response.ok) {
		console.log(fileName, 'Error occured while trying to login');
		throw { message: 'Failed to login', status: 500 };
	}
	console.log(`[${fileName}:login()]: response: `, response);
	return response;
}

export async function signup(email: string, username: string, password: string) {
	const response = await fetch(ROUTES.signup, {
		method: "POST",
		body: JSON.stringify({
			username: username,
			password: password,
			email: email,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		},
	});
	if (!response.ok) {
		console.log('Error occured while trying to signup');
		throw { message: 'Failed to signup', status: 500 };
	}
	console.log(`[${fileName}:signup()]: response: `, response);
	return response;
}
