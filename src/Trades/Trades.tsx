import './trades.scss';
import { Outlet, useSearchParams, json, useLoaderData } from 'react-router-dom';
import { getTrades } from '../utils/api';
import { tradeParams } from '../utils/types';
const fileName = "Trades.tsx";

export default function Trades() {
	console.log("[Trades.tsx]");
	let trades = useLoaderData();
	console.log(`[${fileName}] trades: `, trades);
	let [searchParams, setSearchParams] = useSearchParams();
	console.log("[Trades.tsx:loader()]: searchParams: ", searchParams);
	return (
		<div className="trades-container">
			<div className="trades-search-container">
				<div>
					start_date
				</div>
				<div>
					end_date
				</div>
				<div>
					Accounts
				</div>
				<div>
					short:
					long:
				</div>
			</div>
			Trades main body
		</div>
	);
}

export function loader({ request }: any) {
	const url = new URL(request.url);
	const tradeParams: { [key: string]: string } = {
		start_time: url.searchParams.get("start_time") || "",
		end_time: url.searchParams.get("end_time") || "",
		short: url.searchParams.get("short") || "",
		account_names: url.searchParams.get("account_names") || "",
		include: url.searchParams.get("include") || "",
	}
	const queryString = url.searchParams.toString();
	console.log(`[${fileName}:loader]: searchParams(): `, tradeParams);
	console.log(`[${fileName}:loader]: queryString: `, queryString);
	return getTrades(tradeParams);
}
