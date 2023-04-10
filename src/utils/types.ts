export interface tradeParams {
	start_time: string,
	end_time: string,
	account_names: string,
	short: string,
	include: string,
}

export interface Trade {
	id: number,
	account_id: number,
	instrument: string,
	entry_time: number,
	exit_time: number,
	commission: number,
	pnl: number,
	short: boolean,
}

export interface Account {
	id: number,
	name: string,
	user_id: string,
	visible: boolean,
	sim: boolean,
}
