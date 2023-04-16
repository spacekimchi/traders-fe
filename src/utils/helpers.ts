import { Trade, JournalEntry } from './types';

export function dateToExcel(date: Date) {
	return 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
}

export function excelToDate(excel: number) {
	return new Date(Date.UTC(0, 0, excel));
}

export function excelToTime(excel: number) {
	const time = excel % 1;
	const hour = Math.floor(time * 24);
	const rem = time * 24 % 1;
	const minutes = Math.floor(rem * 60);
	const minRem = rem * 60 % 1;
	const seconds = Math.round(minRem * 60);
	return `${hour}:${timeFormat(minutes)}:${timeFormat(seconds)}`;
}

function timeFormat(val: number) {
	return val < 10 ? `0${val}` : val.toString();
}

export function groupTradesByDay(trades: Array<Trade>, simAccount: any) {
	if (!simAccount) {
		simAccount = 0;
	}
	let tradesByDay: { [key: string]: { trades: Array<Trade>, journalEntry: JournalEntry } } = {};
	trades.forEach((trade) => {
		if (trade.account_id === simAccount.id) { return; }
		const key = Math.floor(trade.entry_time);
		if (!(key in tradesByDay)) {
			tradesByDay[key] = { trades: [], journalEntry: { image_urls: [], notes: "" } as JournalEntry };
		}
		tradesByDay[key].trades.push(trade);
	});
	return tradesByDay;
}

