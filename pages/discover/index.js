import { IconButton, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ChipList from '../../components/reusable/chips';
import PageLayout from '../../layouts/pageLayout';
import styles from './discover.module.scss';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import comingSoon from '../../public/coming_soon.svg';

function DiscoverPage() {
	const router = useRouter();
	const [peopleList, setPeopleList] = useState([]);
	const [institutionList, setInstitutionList] = useState([]);
	const [articleList, setArticleList] = useState([]);

	const { register, handleSubmit } = useForm();

	async function search(data, e) {
		console.log(data);
	}

	return (
		<div>
			<h1>Discover</h1>
			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div className={styles.illustration}>
					<Image src={comingSoon} layout='fill' objectFit='contain'></Image>
				</div>
				<p>This feature is still on development...</p>
			</div>
		</div>
		// <div className={styles.page}>
		// 	<div className={styles.page__header}>
		// 		<h1>Discover</h1>
		// 		<form onSubmit={handleSubmit(search)} className={styles.searchbox}>
		// 			<input
		// 				className={styles.searchinput}
		// 				type='search'
		// 				placeholder='Search something...'
		// 				{...register('searchText')}
		// 			/>

		// 			<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
		// 				<SearchIcon />
		// 			</IconButton>
		// 		</form>
		// 	</div>
		// 	<div className={styles.page__content}>
		// 		<ChipList
		// 			defaultVal={router.query.tab ? router.query.tab : 'all'}
		// 			chips={[
		// 				{ label: 'All', value: 'all', route: '/discover' },
		// 				{ label: 'Articles', value: 'article', route: '/discover?tab=article' },
		// 				{ label: 'People', value: 'people', route: '/discover?tab=people' },
		// 				{
		// 					label: 'Institutions',
		// 					value: 'institution',
		// 					route: '/discover?tab=institution',
		// 				},
		// 			]}
		// 		/>
		// 		{(router.query.tab == 'article' || !router.query.tab) && <h2>Articles</h2>}
		// 		{(router.query.tab == 'people' || !router.query.tab) && <h2>People</h2>}
		// 		{(router.query.tab == 'institution' || !router.query.tab) && <h2>Institutions</h2>}
		// 	</div>
		// </div>
	);
}

DiscoverPage.Layout = PageLayout;
export default DiscoverPage;
