import { warn } from 'console';
import { json } from "react-router-dom";
import { tradeParams } from './types';
const fileName = "api.ts";

const ROUTES: { [key: string]: string } = {
	trades: '/api/trades',
	logout: '/api/logout',
	login: '/api/login',
	signup: '/api/users',
	accounts: '/api/accounts',
	journalEntries: '/api/journal_entries',
	importTrade: '/api/trades/import'
};

function queryParamBuilder(params: { [key: string]: string }) {
	let qp: string[] = [];
	for (const k in params) {
		if (params[k]) {
			qp.push(`${k}=${params[k]}`);
		}
	}
	return qp.length ? '?' + qp.join('&') : "";
}

export async function getTrades(qp: { [key: string]: string }) {
	let response = await fetch(`${ROUTES.trades}${queryParamBuilder(qp)}`);
	if (!response.ok) {
		console.log('response: ', response);
		throw { message: `Failed to fetch trades: ${response.statusText}`, status: response.status };
	}
	return response;
}

export async function getCurrentUser() {
	let response = await fetch('/api/current_user');
	if (!response.ok) {
		throw { message: `Failed to fetch current user: ${response.statusText}`, status: response.status };
	}
	return response.json();
}

export async function logout() {
	const response = await fetch(ROUTES.logout, {
		method: "POST"
	});
	if (!response.ok) {
		throw { message: `Failed to logout: ${response.statusText}`, status: response.status };
	}
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
		throw { message: `Failed to login: ${response.statusText}`, status: response.status };
	}
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
		throw { message: `Failed to signup: ${response.statusText}`, status: response.status };
	}
	return response;
}

export async function getAccounts(userId: string) {
	const response = await fetch(ROUTES.accounts + (userId ? `?user_id=${userId}` : ""));
	if (!response.ok) {
		throw { message: `Failed to fetch accounts: ${response.statusText}`, status: response.status };
	}
	return response;
}

export async function get(route: string, qp: { [key: string]: string }) {
	const response = await fetch(`${ROUTES[route]}${queryParamBuilder(qp)}`);
	if (!response.ok) {
		throw { message: `Failed to fetch ${route}: ${response.statusText}`, status: response.status };
	}
	return response;
}

export async function post(route: string, body: any) {
	const response = await fetch(ROUTES[route], {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		},
	});
	if (!response.ok) {
		console.log('error response ', response);
		throw { message: `Failed to create journal entry: ${response.statusText}`, status: response.status };
	}
	return response;
}

