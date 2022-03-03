import React, { useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
	ssr: false,
});
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'isomorphic-dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './draftEditor.css';

const content = ContentState.createFromText('<b>hello world</b>');

function DrafEditor() {
	const [editorState, setEditorState] = useState(() => EditorState.createWithContent(content));
	const [convertedContent, setConvertedContent] = useState(null);
	console.log(convertedContent);
	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	};
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		setConvertedContent(currentContentAsHTML);
	};
	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};
	return (
		<div className='App'>
			<header className='App-header'>Rich Text Editor Example</header>
			<Editor
				editorState={editorState}
				onEditorStateChange={handleEditorChange}
				wrapperClassName='wrapper-class'
				editorClassName='editor-class'
				toolbarClassName='toolbar-class'
			/>
			<div className='preview' dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
			<div
				className='article-content'
				style={{ maxWidth: '90vw' }}
				dangerouslySetInnerHTML={{ __html: convertedContent }}
			/>
		</div>
	);
}
export default DrafEditor;
