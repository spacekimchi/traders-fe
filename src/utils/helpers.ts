import { Trade, JournalEntry } from './types';

export function dateToExcel(date: Date): number {
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
		simAccount = { id: 0 };
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

export function getPnl(trades: Array<Trade>) {
    let pnl = 0.0;
    trades.forEach((trade) => {
        pnl += trade.pnl - trade.commission;
    });
    return pnl;
}

export function groupTradesByMonth(trades: Array<Trade>, simAccount: any): { [key: string]: Array<Trade> } {
    let tradesByMonth: { [key: string]: Array<Trade> } = {};
    let year = new Date().getFullYear();
    let jan = dateToExcel(new Date(year, 0, 1));
    let feb = dateToExcel(new Date(year, 1, 1));
    let mar = dateToExcel(new Date(year, 2, 1));
    let apr = dateToExcel(new Date(year, 3, 1));
    let may = dateToExcel(new Date(year, 4, 1));
    let jun = dateToExcel(new Date(year, 5, 1));
    let jul = dateToExcel(new Date(year, 6, 1));
    let aug = dateToExcel(new Date(year, 7, 1));
    let sep = dateToExcel(new Date(year, 8, 1));
    let oct = dateToExcel(new Date(year, 9, 1));
    let nov = dateToExcel(new Date(year, 10, 1));
    let dec = dateToExcel(new Date(year, 11, 1));
    for (let i = 0; i < 12; i++) {
        tradesByMonth[i] = [];
    }
    trades.forEach((trade) => {
        if (trade.account_id === simAccount.id) { return; }
        if (trade.entry_time < feb) {
            tradesByMonth[0].push(trade);
        } else if (trade.entry_time < mar) {
            tradesByMonth[1].push(trade);
        } else if (trade.entry_time < apr) {
            tradesByMonth[2].push(trade);
        } else if (trade.entry_time < may) {
            tradesByMonth[3].push(trade);
        } else if (trade.entry_time < jun) {
            tradesByMonth[4].push(trade);
        } else if (trade.entry_time < jul) {
            tradesByMonth[5].push(trade);
        } else if (trade.entry_time < aug) {
            tradesByMonth[6].push(trade);
        } else if (trade.entry_time < sep) {
            tradesByMonth[7].push(trade);
        } else if (trade.entry_time < oct) {
            tradesByMonth[8].push(trade);
        } else if (trade.entry_time < nov) {
            tradesByMonth[9].push(trade);
        } else if (trade.entry_time < dec) {
            tradesByMonth[10].push(trade);
        } else {
            tradesByMonth[11].push(trade);
        }
    });
    return tradesByMonth;
}

