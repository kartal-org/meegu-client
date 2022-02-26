import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styles from './quillEditor.module.scss';

export default ({ data, setData }) => {
	const placeholder = 'Compose an epic...';
	const { quill, quillRef, Quill } = useQuill({
		placeholder,
		// modules: {
		// 	ImageResize: {
		// 		modules: ['Resize', 'DisplaySize', 'Toolbar'],
		// 	},
		// 	counter: true,
		// },
	});

	if (Quill && !quill) {
		// For execute this line only once.
		const { ImageResize } = require('quill-image-resize'); // Install with 'yarn add quill-magic-url'
		// Quill.register('modules/imageResize', ImageResize);
		// Quill.register('modules/counter', function (quill, options) {
		// 	quill.on('text-change', function () {
		// 		const text = quill.getText();
		// 		// There are a couple issues with counting words
		// 		// this way but we'll fix these later
		// 		counterRef.current.innerText = text.split(/\s+/).length;
		// 	});
		// });
	}

	React.useEffect(() => {
		if (quill) {
			if (data) {
				quill.clipboard.dangerouslyPasteHTML(data);
			} else {
				console.log('hurray');
			}
		}
	}, [quill]);

	React.useEffect(() => {
		if (quill) {
			quill.on('text-change', (delta, oldDelta, source) => {
				console.log(quill.root.innerHTML);
				setData(quill.root.innerHTML);
			});
		}
	}, [quill]);

	return (
		<div className={styles.editor}>
			<div
				ref={quillRef}
				style={{
					height: '80vh',
					borderLeft: 'none',
					borderRight: 'none',
					borderBottom: 'none',
				}}
			/>
		</div>
	);
};
