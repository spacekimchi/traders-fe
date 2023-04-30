import './calendar_view.scss';
import MiniMonth from '../MiniMonth/MiniMonth';
import { getTrades, getAccounts } from '../utils/api';
import { Account, Trade } from '../utils/types';
import { useLoaderData, json, Outlet, useOutletContext, redirect } from 'react-router-dom';
import { useState } from 'react';
import { dateToExcel, groupTradesByMonth } from '../utils/helpers';
import { MONTHS_MAX } from '../utils/constants';

type ContextType = {
    year: number,
    month: number,
    trades: Array<Trade>,
    accounts: Array<Account>,
    day: number | null,
};

export function useCalendarContext() {
    return useOutletContext<ContextType>();
}

export async function loader({ request, params }: any) {
    const today = new Date();
    const monthParam = params["month"];
    let year = params["year"] ? +params["year"] : today.getFullYear();
    const startTime = dateToExcel(new Date(year, 0, 1));
    const endTime = dateToExcel(new Date(year+1, 0, 1));
    const month = monthParam ? +monthParam - 1 : today.getMonth();
    const day = params["day"];
    year = Math.max(year, 2000)
    if (month >= MONTHS_MAX) {
        return redirect("/calendar");
    }
    
    const tradeParams: { [key: string]: string } = {
        start_time: startTime.toString(),
        end_time: endTime.toString(),
    };
    
    const [trades, accounts] = await Promise.all([
        getTrades(tradeParams).then(res => res.json()),
        getAccounts("").then(res => res.json()),
    ]);

    return json({ trades, accounts, year, month, day });
}

export default function CalendarView() {
    let loaderData = useLoaderData() as any;
    const [accounts] = useState(loaderData.accounts);
    const [trades] = useState(loaderData.trades);
    const [year] = useState(loaderData.year);
    const [month, setMonth] = useState(loaderData.month);
    const [day] = useState(loaderData.day);
    const simAccount = accounts.find((account: Account) => account.sim);

    let tradesByMonth = groupTradesByMonth(trades, simAccount);
    let months = [];
    for (let i = 0; i < MONTHS_MAX; i++) {
        months.push(
            <MiniMonth
                setMonth={setMonth}
                key={i}
                month={i}
                selectedMonth={month===i}
                trades={tradesByMonth[i]}
                date={new Date(year, i, 1)}
                simAccount={simAccount}></MiniMonth>
        );
    }
    return (
        <div>
            <div className="mini-year-container">
                <div className="mini-year-color-chart-container">
                    <span className="big-loss">-$200</span>
                    <span className="medium-loss">-$150</span>
                    <span className="small-loss">-$100</span>
                    <span className="tiny-loss">-$50</span>
                    <span className="flat">$0</span>
                    <span className="tiny-gain">$50</span>
                    <span className="small-gain">$100</span>
                    <span className="medium-gain">$150</span>
                    <span className="big-gain">$200</span>
                </div>
                <div className="mini-year-months">
                    {months}
                </div>
            </div>
            <Outlet context={{year, month, trades, accounts, day}}/>
        </div>
    );
}
