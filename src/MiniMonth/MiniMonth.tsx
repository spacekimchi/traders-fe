import './mini_month.scss';
import { Trade, Account } from '../utils/types';
import { nanoid } from 'nanoid';
import { groupTradesByDay, dateToExcel, getPnl } from '../utils/helpers';
import { ReactElement } from 'react';
import { useNavigate } from "react-router-dom";
import { MONTHS } from '../utils/constants';

interface MiniMonthProps {
    month: number,
    selectedMonth: boolean,
    trades: Array<Trade>,
    date: Date,
    simAccount: Account,
    setMonth: Function,
}

export default function MiniMonth(props: MiniMonthProps) {
    let weeks = makeWeeks();
    const navigate = useNavigate();
    function setDefaultWeek() {
        return [
            {display: false, pnl: 0},
            {display: false, pnl: 0},
            {display: false, pnl: 0},
            {display: false, pnl: 0},
            {display: false, pnl: 0},
        ];
    }

    function createDay(day: { display: boolean, pnl: number }): ReactElement<any, any> {
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
            </span>
        );
    }
    function makeWeeks() {
        let curWeeks = [];
        let last = dateToExcel(new Date(props.date.getFullYear(), props.month + 1, 0));
        let curDate = dateToExcel(props.date);
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
            curDate += 1;
            curDay += 1;

            if (curDay >= 6) {
                curDay = 1;
                curDate += 2;
                curWeeks.push(week.map((day) => createDay(day)));
                week = setDefaultWeek();
            }
        }
        if (week[0].display) {
            curWeeks.push(week.map((day) => createDay(day)));
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
