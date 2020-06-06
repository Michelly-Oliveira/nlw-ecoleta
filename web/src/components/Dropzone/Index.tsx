import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './Dropzone.css';

interface Props {
	onFileUpload: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
	const [selectedFileUrl, setSelectedFileUrl] = useState('');

	const onDrop = useCallback(
		(acceptedFiles) => {
			// pegar o primeiro arquivo, app só aceita uma imagem
			const file = acceptedFiles[0];

			// create an url for the image so we can display it
			const fileUrl = URL.createObjectURL(file);

			// store image url on state
			setSelectedFileUrl(fileUrl);
			// pass image up to CreatePoint
			onFileUpload(file);
		},
		[onFileUpload]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
	});

	return (
		<div className='dropzone' {...getRootProps()}>
			<input {...getInputProps()} accept='image/*' />

			{selectedFileUrl ? (
				<img src={selectedFileUrl} alt='Point thumbnail' />
			) : (
				<p>
					<FiUpload />
					Imagem do estabelecimento
				</p>
			)}
		</div>
	);
};

export default Dropzone;
