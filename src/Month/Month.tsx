import './month.scss';
import { Account } from '../utils/types';
import { dateToExcel, groupTradesByDay, getPnl } from '../utils/helpers';
import { MONTHS, DAYS } from '../utils/constants';
import DollarVal from '../DollarVal/DollarVal';
import { useCalendarContext } from '../CalendarView/CalendarView';
import { SUNDAY, SATURDAY } from '../utils/constants';

export default function Month() {
    const { year, month, trades, accounts } = useCalendarContext();
    const simAccount = accounts.find((account: Account) => account.sim);
    let tradesByDay = groupTradesByDay(trades, simAccount);

    function createCalendar() {
        const firstOfMonth = new Date(year, month, 1);
        const daysPerWeek = 5;
        let firstDay = firstOfMonth.getDay();
        let curDate = firstOfMonth.getDate();
        if (firstDay === SATURDAY) {
            firstDay = 1;
            curDate += 2;
        } else if (firstDay === SUNDAY) {
            firstDay = 1;
            curDate += 1;
        }
        const endOfMonth = new Date(year, month + 1, 0);
        const lastDay = endOfMonth.getDay();
        const lastDate = endOfMonth.getDate();
        const days = [];

        for (let i = 1; i < firstDay; i+=1) {
            days.push(new Date(year, month, 1 - i));
        }
        days.reverse();
        while (curDate <= lastDate) {
            const tempDate = new Date(year, month, curDate);
            const curDay = tempDate.getDay();
            if (curDay && curDay < SATURDAY) {
                days.push(tempDate);
            }
            curDate += 1;
        }
        if (lastDay && lastDay < SATURDAY) {
            for (let i = lastDay + 1; i < SATURDAY; i += 1) {
                days.push(new Date(year, month, lastDate + (i - lastDay)));
            }
        }
        const weeks: any = [];
        days.forEach((day: Date, idx: number) => {
            let d = dateToExcel(day);
            const dayHtml = (
                <div key={idx} className="day">
                    <div>{day.getDate()}</div>
                    <div>{DAYS[day.getDay()]}</div>
                    <div>{d in tradesByDay ? <DollarVal val={getPnl(tradesByDay[d].trades).toFixed(2)} /> : ""}</div>
                </div>
            );
            if (idx % daysPerWeek === 0) {
                weeks.push([dayHtml]);
            } else {
                weeks[weeks.length - 1].push(dayHtml);
            }
        });
        return weeks;
    }

    const weeks = createCalendar().map((week: any, idx: number) => {
        return (<div key={idx} className="week-container">{week}</div>);
    });

    return (
        <div className="calendar-container">
            <h2 className="month-name">
                {MONTHS[month]}
            </h2>
            <div className="month-container">
                {weeks}
            </div>
        </div>
    );
}
