import './month.scss';
import { Account, Trade } from '../utils/types';
import { dateToExcel, groupTradesByDay, getPnl } from '../utils/helpers';
import { MONTHS, DAYS } from '../utils/constants';
import DollarVal from '../DollarVal/DollarVal';
import { useCalendarContext } from '../CalendarView/CalendarView';
import { SUNDAY, SATURDAY } from '../utils/constants';
import { useLoaderData, json, Outlet, useOutletContext, redirect, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

type ContextType = {
    year: number,
    month: number,
    trades: Array<Trade>,
    accounts: Array<Account>,
    day: number | null,
    setDay: Function,
};

export function useMonthContext() {
    return useOutletContext<ContextType>();
}

export default function Month(props: any) {
    //const { year, trades, accounts, day, setDay } = useCalendarContext();
    const [month, setMonth] = useState(props.month)
    const [year, setYear] = useState(props.year)
    const [trades] = useState(props.trades)
    const [accounts] = useState(props.accounts)
    console.log('props: ', props);
    const simAccount = accounts.find((account: Account) => account.sim);
    const navigate = useNavigate();
    let tradesByDay = groupTradesByDay(trades, simAccount);
    //let monthOutlet = (<Month context={{year, month, trades, accounts, day, setDay}} year={year} month={month} trades={trades} accounts={accounts} day={day} setDay={setDay} />);
    useEffect(() => {
        setMonth(props.month);
        setYear(props.year);
    }, [props.year, props.month]);

    function createCalendar(y: number, m: number) {
        const firstOfMonth = new Date(y, m, 1);
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
        days.forEach((curDay: Date, idx: number) => {
            let d = dateToExcel(curDay);
            const dayHtml = (
                <div key={idx} className="month-day" onClick={(e) => handleDayClick(e, curDay.getDate())}>
                    <div>{curDay.getDate()}</div>
                    <div>{DAYS[curDay.getDay()]}</div>
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

    function handleDayClick(e: any, d: any) {
        e.preventDefault();
        navigate(`/calendar/${year}/${month+1}/${d}`);
    }

    let weeks = createCalendar(year, month).map((week: any, idx: number) => {
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
