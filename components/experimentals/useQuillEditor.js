import React from 'react';
import QuillEditor from '../quillEditor';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styles from './quillEditor.module.scss';
import { useState } from 'react';

function useQuillEditor(initialData) {
	const { quill, quillRef } = useQuill({
		// placeholder,
	});
	const [content, setContent] = useState(null);
	function Editor() {
		React.useEffect(() => {
			if (quill) {
				quill.clipboard.dangerouslyPasteHTML(initialData);
			}
		}, [quill]);

		React.useEffect(() => {
			if (quill) {
				quill.on('text-change', (delta, oldDelta, source) => {
					console.log(quill.root.innerHTML); // Get innerHTML using quill
					setContent(quill.root.innerHTML);
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

	return {
		editor: <Editor />,
		content: content ? content : initialData,
	};
}

export default useQuillEditor;
