export default function Checkbox({ label, value, onChange }: any) {
	return (
		<label>
			<input type="checkbox" checked={value} onChange={onChange} />
			{label}
		</label>
	);
};
