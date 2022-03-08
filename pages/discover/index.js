import { IconButton, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ChipList from '../../components/reusable/chips';
import PageLayout from '../../layouts/pageLayout';
import styles from './discover.module.scss';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function DiscoverPage() {
	const router = useRouter();
	return (
		<div className={styles.page}>
			<div className={styles.page__header}>
				<h1>Discover</h1>
				<form className={styles.searchbox}>
					<input
						className={styles.searchinput}
						type='search'
						placeholder='Search something...'
					/>

					<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
						<SearchIcon />
					</IconButton>
				</form>
			</div>
			<div className={styles.page__content}>
				<ChipList
					defaultVal={router.query.tab ? router.query.tab : 'all'}
					chips={[
						{ label: 'All', value: 'all', route: '/discover' },
						{ label: 'Articles', value: 'article', route: '/discover?tab=article' },
						{ label: 'People', value: 'people', route: '/discover?tab=people' },
						{
							label: 'Institutions',
							value: 'institution',
							route: '/discover?tab=institution',
						},
					]}
				/>
			</div>
		</div>
	);
}

DiscoverPage.Layout = PageLayout;
export default DiscoverPage;
