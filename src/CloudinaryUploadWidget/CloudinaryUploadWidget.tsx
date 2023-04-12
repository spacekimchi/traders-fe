import { useEffect, useRef } from 'react';

export default function CloudinaryUploadWidget() {
	const cloudinaryRef = useRef() as any;
	const widgetRef = useRef() as any;
	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current = cloudinaryRef.current.createUploadWidget({
			cloudName: 'duwe4rlm4',
			uploadPreset: 'ml_default'
		}, function(error: any, result: any) {
			console.log('result ', result);
			console.log('error ', error);
		});
	}, []);
	return (<button type="button" onClick={() => widgetRef.current.open()}>cloudinary</button>);
}
