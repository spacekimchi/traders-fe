import './mini_month.scss';
import { Trade, Account } from '../utils/types';
import { nanoid } from 'nanoid';
import { groupTradesByDay, dateToExcel, getPnl, excelToDate } from '../utils/helpers';
import { ReactElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MONTHS, ABBR_MONTHS } from '../utils/constants';
import DollarVal from '../DollarVal/DollarVal';

interface MiniMonthProps {
    month: number,
    selectedMonth: boolean,
    trades: Array<Trade>,
    date: Date,
    simAccount: Account,
    setMonth: Function,
}

interface MiniDay {
    display: boolean,
    pnl: number,
    date: number,
}

export default function MiniMonth(props: MiniMonthProps) {
    let weeks = makeWeeks();
    const navigate = useNavigate();

    function setDefaultWeek() {
        return [
            {display: false, pnl: 0, date: 0} as MiniDay,
            {display: false, pnl: 0, date: 0} as MiniDay,
            {display: false, pnl: 0, date: 0} as MiniDay,
            {display: false, pnl: 0, date: 0} as MiniDay,
            {display: false, pnl: 0, date: 0} as MiniDay,
        ];
    }

    function createDay(day: MiniDay, year: number): ReactElement<any, any> {
        let pnlClass = "";
        if (day.pnl === 0) {
            pnlClass = "flat";
        } else if (day.pnl >= 200) {
            pnlClass = "big-gain";
        } else if (day.pnl >= 100) {
            pnlClass = "medium-gain";
        } else if (day.pnl >= 50) {
            pnlClass = "small-gain";
        } else if (day.pnl > 0) {
            pnlClass = "tiny-gain";
        } else if (day.pnl >= -50) {
            pnlClass = "tiny-loss";
        } else if (day.pnl >= -100) {
            pnlClass = "small-loss";
        } else if (day.pnl >= -150) {
            pnlClass = "medium-loss";
        } else {
            pnlClass = "big-loss";
        }
        return (
            <span
                key={nanoid()}
                className={"mini-month-day"
                    .concat(day.display ? ` ${pnlClass}` : "")
                }>
                    {
                        day.display ?
                        <div className="mini-month-hover"><DollarVal val={day.pnl.toFixed(2)} /> on {ABBR_MONTHS[props.month]} {excelToDate(day.date).getDate()}, {year}</div> :
                        null
                    }
            </span>
        );
    }
    function makeWeeks() {
        let curWeeks = [];
        let last = dateToExcel(new Date(props.date.getFullYear(), props.month + 1, 0));
        let curDate = dateToExcel(props.date);
        let curYear = props.date.getFullYear();
        let curDay = props.date.getDay();

        // Sets first day to a Monday (no trading on weekends)
        if (curDay === 6) {
            curDay = 1;
            curDate += 2;
        } else if (curDay === 0) {
            curDay = 1;
            curDate += 1;
        }
        let tradesByDay = groupTradesByDay(props.trades, props.simAccount);
        props.trades.sort((a, b) => a.entry_time - b.entry_time);
        let week = setDefaultWeek();
        while (curDate <= last) {
            let pnl = 0;
            if (curDate in tradesByDay) {
                pnl = getPnl(tradesByDay[curDate].trades);
            }
            week[curDay-1].display = true;
            week[curDay-1].pnl = pnl;
            week[curDay-1].date = curDate;
            curDate += 1;
            curDay += 1;

            if (curDay >= 6) {
                curDay = 1;
                curDate += 2;
                curWeeks.push(week.map((day) => createDay(day, curYear)));
                week = setDefaultWeek();
            }
        }
        if (week[0].display) {
            curWeeks.push(week.map((day) => createDay(day, curYear)));
        }
        return curWeeks.map((week) => {
            return (<div key={nanoid()} className="mini-month-week">{week}</div>);
        });
    }

    function handleSetMonth(e: any, m: number) {
        props.setMonth(props.month);
        navigate(`/calendar/${props.date.getFullYear()}/${m+1}`);
    }

    return (
        <span
            onClick={(e) => {handleSetMonth(e, props.month)}}
            className={
                "mini-month-container"
                .concat(props.selectedMonth ? " active" : "")
            }>
            <div className="mini-month-title">{MONTHS[props.month]}</div>
            {weeks}
        </span>
    );
}
