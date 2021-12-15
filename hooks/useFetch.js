import { useEffect, useState } from 'react';

const useFetch = (fetchedItem) => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		if (fetchedItem) {
			console.log('It changed');
			setItems(fetchedItem);
		}
	}, [fetchedItem]);
	return { items, setItems };
};

export default useFetch;
