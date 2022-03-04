import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styles from './quillEditor.module.scss';

export default function QuillEditor({ initialData, setData }) {
	const placeholder = 'Compose an epic...';

	const { quill, quillRef, Quill } = useQuill({
		placeholder,
	});

	React.useEffect(() => {
		if (quill) {
			if (initialData) {
				quill.clipboard.dangerouslyPasteHTML(initialData);
				quill.setSelection(quill.getLength(), 0);
			}
			quill.on('text-change', (delta, oldDelta, source) => {
				// Get innerHTML using quill
				setData(quill.root.innerHTML); // Get innerHTML using quillRef
			});
		}
	}, [quill, quillRef]);

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
}
