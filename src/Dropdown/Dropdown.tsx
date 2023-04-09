import { useState } from 'react';
import './dropdown.scss';

export default function Dropdown(props: any) {
	const [hideDropdown, setHideDropdown] = useState(true);
	const dropdownItems = props.items.map((item: any, idx: number) => {
		return (<li key={idx} className="dropdown-item" onClick={() => { item.onClick(idx); setHideDropdown(!hideDropdown) }}>{item.text}</li>);
	});
	return (
		<div className="dropdown-container">
			<div className="" onClick={() => { setHideDropdown(!hideDropdown); }}>
				{props.items[props.selectedItem].text}
			</div>
			<ul className="dropdown-list" hidden={hideDropdown}>
				{dropdownItems}
			</ul>
		</div>
	);
}
