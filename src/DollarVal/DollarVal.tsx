import './dollar_val.scss';

export default function DollarVal(props: any) {
	function attachDollarSign(val: any) {
		let num = Number(val);
		return num >= 0 ?
			`+\$${num.toFixed(2)}` :
			`-\$${(num * -1).toFixed(2)}`;

	}
	return (
		<span className={props.val >= 0 ? "green" : "red"}>{attachDollarSign(props.val)}</span>
	);
}
