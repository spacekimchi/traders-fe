import { warn } from 'console';
import { json } from "react-router-dom";
import { tradeParams } from './types';
const fileName = "api.ts";

const ROUTES: { [key: string]: string } = {
	trades: '/api/trades',
	logout: '/api/logout',
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

