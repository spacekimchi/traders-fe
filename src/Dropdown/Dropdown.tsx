import { useState } from 'react';

export default function Dropdown(props: any) {
	const [open, setOpen] = useState(false);
	const dropdownItems = props.items.map((item: any, idx: number) => {
		<li onClick={() => { item.setSelectedTradeSideDropdown(idx) }}>{item.text}</li>
	});
	return (
		<div>
			<div>
				{props.selectedItem}
			</div>
			<ul>
				{dropdownItems}
			</ul>
		</div>
	);
}
