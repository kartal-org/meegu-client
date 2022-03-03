import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styles from './quillEditor.module.scss';
import { useQuillUpdate } from '../contexts/useQuillProvider';

export default function QuillEditor({ initialData, getData }) {
	// const placeholder = 'Compose an epic...';
	const quillUpdate = useQuillUpdate();
	const { quill, quillRef } = useQuill({
		// placeholder,
	});
	const [content, setContent] = useState(null);

	React.useEffect(() => {
		if (quill && initialData) {
			quill.clipboard.dangerouslyPasteHTML(initialData);
		}
	}, [quill, initialData]);

	React.useEffect(() => {
		if (quill) {
			quill.on('text-change', (delta, oldDelta, source) => {
				getData(quill.root.innerHTML);
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
}
