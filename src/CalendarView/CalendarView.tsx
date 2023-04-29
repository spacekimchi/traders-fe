import './calendar_view.scss';
import { Outlet } from 'react-router-dom';
import MiniMonth from '../MiniMonth/MiniMonth';
import { getTrades, getAccounts } from '../utils/api';
import { Account, Trade } from '../utils/types';
import { useLoaderData, json } from 'react-router-dom';
import { useState } from 'react';
import { dateToExcel, excelToDate, groupTradesByDay, groupTradesByMonth } from '../utils/helpers';

export async function loader({ request }: any) {
    const url = new URL(request.url);
    const tradeParams: { [key: string]: string } = {
        start_time: url.searchParams.get("start_time") || "",
        end_time: url.searchParams.get("end_time") || "",
        short: url.searchParams.get("short") || "",
        account_names: url.searchParams.get("account_names") || "",
        include: url.searchParams.get("include") || "",
    }
    const [trades, accounts] = await Promise.all([
        getTrades(tradeParams).then(res => res.json()),
        getAccounts("").then(res => res.json())
    ]);
    return json({ trades, accounts });
}

export default function CalendarView() {
    let loaderData = useLoaderData() as any;
    const [accounts, setAccounts] = useState(loaderData.accounts);
    const [trades, setTrades] = useState(loaderData.trades);
    const simAccount = accounts.find((account: Account) => account.sim);
    //let tradesByDay = groupTradesByDay(trades, simAccount);
    let tradesByMonth = groupTradesByMonth(trades, simAccount);
    let today = new Date();
    let year = today.getFullYear();
    let first = new Date(year, 0, 1);
    let months = [];
    for (let i = 0; i < 12; i++) {
        months.push(<MiniMonth
            key={i}
            month={i}
            trades={tradesByMonth[i]}
            date={new Date(year, i, 1)}
            simAccount={simAccount}></MiniMonth>);
    }
    return (
        <div>
            <div className="mini-year-container">
                {months}
            </div>
            <Outlet />
        </div>
    );
}
