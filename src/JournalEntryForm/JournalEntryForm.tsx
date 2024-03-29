import './journal_entry_form.scss';
import React, { useState, useEffect } from 'react';
import CloudinaryUploadWidget from '../CloudinaryUploadWidget/CloudinaryUploadWidget';
import { ReactComponent as RedMinusIcon } from '../icons/red-minus.svg';
import { ReactComponent as TealPlusIcon } from '../icons/teal-plus.svg';

export default function JournalEntryForm(props: any) {
	//const [notes, setNotes] = useState(props.notes);
	//const [imageUrl, setImageUrl] = useState(imageUrls ? imageUrls[0] : "");
	const [newImageUrl, setNewImageUrl] = useState("");
	const imageUrlForms = props.imageUrls.map((imageUrl: string, idx: number) => {
		let error = props.formErrors.has(idx);
		return (
			<div key={idx} className="form-url-group">
				<p className="error-message" hidden={!props.formErrors.has(idx)}>Must be a google drive image url (starts with: "https://drive.google.com/file/d/")</p>
				<div className="form-image-url-input-container">
					<input
						className={`form-image-url-input${error ? " error" : ""}`}
						type="text"
						id={`image-url-input-${props.day}`}
						name="text"
						value={imageUrl}
						onChange={(e) => {
								handleImageUrlChange(e, idx);
							}
						}
					/>
					<button type="button" onClick={(e) => {removeFormUrl(e, idx)}} >
						<span className="button-icon x-icon">
							<RedMinusIcon height={15} width={15} />
						</span>
					</button>
				</div>
			</div>
		);
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		props.submitForm();
	}

	function removeFormUrl(e: React.FormEvent, idx: number) {
		props.imageUrls.splice(idx, 1);
		props.setImageUrls([...props.imageUrls]);
	}

	function handleNotesChange(e: React.FormEvent) {
		props.setNotes((e.target as HTMLInputElement).value);
	}

	function handleImageUrlChange(e: React.FormEvent, idx: number) {
		/* https://drive.google.com/file/d/19ZEl8nhZt7E4-LByo_XO-L_UEORqJpBv/view?usp=share_link */
		/* https://drive.google.com/uc?id=1NPxxaxh8eD1SAT6MXCaAZnlqJEdH-vsR */
		let url = (e.target as HTMLInputElement).value;
		props.imageUrls[idx] = url;
		props.setImageUrls([...props.imageUrls]);
	}

	async function getBase64(file: File, cb: Function) {
		let reader = new FileReader();
		reader.onload = function () {
			cb(reader.result)
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
		reader.readAsDataURL(file);
	}

	function handleImgChange(e: any) {
		let idCardBase64 = '';
		getBase64(e.target.files[0], (result: any) => {
			idCardBase64 = result;
			setNewImageUrl(idCardBase64);
		});
	}

	function pushNewImageUrl() {
		props.setImageUrls([...props.imageUrls, ""]);
	}

	return (
		<form className="journal-entry-form" onSubmit={handleSubmit}>
			<button className="form-image-url-button" type="button" onClick={pushNewImageUrl}>
				Click to a new google drive image link. Make sure the link is public
				<div>
					(https://drive.google.com/file/d/:file_id)
				</div>
				<div className="button-icon plus-icon">
					<TealPlusIcon height={15} width={15} />
				</div>
			</button>
			{imageUrlForms}
			{/*
			<label htmlFor="profile_pic">Choose file to upload</label>
			<input type="file"
			  id="profile_pic"
			  name="profile_pic"
			  onChange={handleImgChange}
			  accept=".jpg, .jpeg, .png" />
			  */}
			<div>
				<label htmlFor={`journal-entry-form-notes-${props.day}`}>Notes (you can enter markdown formatting here): </label>
				<textarea id={`journal-entry-form-notes-${props.day}`} className="journal-entry-form-textarea" value={props.notes} onChange={handleNotesChange} />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
