import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { getPosts } from '../store/postSlice';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	const { status, posts: fetchedPosts } = useSelector((state) => state.post);
	const { items: posts } = useFetch(fetchedPosts);

	if (status == 'loading') return <CircularProgress />;
	if (status == 'loading') return <p>Error Fetching data!</p>;

	return (
		<>
			{posts.map((val) => (
				<p key={val.id}>{val.title}</p>
			))}
		</>
	);
}
