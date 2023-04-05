export function dateToExcel(date: Date) {
	return 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
}

export function excelToDate(excel: number) {
	return new Date(Date.UTC(0, 0, excel));
}

export function excelToTime(excel: number) {
	let time = excel % 1;
	let hour = Math.floor(time * 24);
	let rem = time * 24 % 1;
	let minutes = Math.floor(rem * 60);
	let minRem = rem * 60 % 1;
	let seconds = Math.round(minRem * 60);
	return `${hour}:${timeFormat(minutes)}:${timeFormat(seconds)}`;
}

function timeFormat(val: number) {
	return val < 10 ? `0${val}` : val.toString();
}

