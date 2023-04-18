import './import_page.scss';
import { useState, useRef } from 'react';
import { post } from '../utils/api';

{/*
			<label htmlFor="profile_pic">Choose file to upload</label>
			<input type="file"
			  id="profile_pic"
			  name="profile_pic"
			  onChange={handleImgChange}
			  accept=".jpg, .jpeg, .png" />
			  */}
export default function ImportPage(props: any) {
	const [excelFile, setExcelFile] = useState(null);
	const formRef = useRef() as any;

	async function handleSubmit(e: any) {
		e.preventDefault();
		const data = new FormData(formRef.current);
		const response = await fetch("/api/trades/import", {
			method: 'POST',
			body: data,

		});
		if (!response.ok) {
			console.log(response.statusText, response.status);
		}
		console.log('response: ', response);
	}

	return (
		<div>
			import page
			<form onSubmit={handleSubmit} ref={formRef}>
				<label htmlFor="file">Choose file to upload</label>
				<input type="file"
					id="file"
					multiple
					name="file"
					accept=".xlsx" />
				<button type="submit"> submit </button>
			</form>
		</div>
	);
}
