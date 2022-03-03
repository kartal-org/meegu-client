import React from 'react';
import { useState } from 'react';
import DrafEditor from '../components/experimentals/draftEditor';
import QuillEditor from '../components/quillEditor';
import { Button } from '@mui/material';

function Example() {
	const [data, setData] = useState();
	return (
		<div>
			<Button onClick={() => console.log(data)}>Check Content</Button>
			<QuillEditor intialData={'<h2>Hello World!</h2>'} getData={setData} />
		</div>
	);
}

export default Example;
