import React, { useContext, useState } from 'react';

const QuillContext = React.createContext();
const QuillUpdateContext = React.createContext();

export function useQuill() {
	return useContext(QuillContext);
}
export function useQuillUpdate() {
	return useContext(QuillUpdateContext);
}

export function QuillProvider({ children }) {
	const [quillContent, setQuillContent] = useState(null);

	function updateQuillContent(content) {
		setQuillContent(content);
	}

	return (
		<QuillContext.Provider value={quillContent}>
			<QuillUpdateContext.Provider value={updateQuillContent}>
				{children}
			</QuillUpdateContext.Provider>
		</QuillContext.Provider>
	);
}
