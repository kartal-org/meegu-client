import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Navigation from '../components/navigation';
import AuthLayout from './authLayout';
import styles from './pageLayout.module.scss';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

// This sets the layout of authenticated pages

function PageLayout({ children }) {
	return (
		<>
			<AuthLayout />
			<div className={styles.pageContainer}>
				<header className={styles.header}>
					<div>
						<Link href='/'>
							<a className={styles.logo}>meegu</a>
						</Link>
					</div>
					<div>
						<NotificationsIcon />
						<AccountCircle />
					</div>
				</header>
				<main className={styles.main}>{children}</main>
				<div className={styles.navigation}>
					<Navigation />
				</div>
			</div>
		</>
	);
}

export default PageLayout;
