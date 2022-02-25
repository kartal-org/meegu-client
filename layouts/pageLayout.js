import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Navigation from '../components/navigation';
import AuthLayout from './authLayout';
import styles from './pageLayout.module.scss';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/userProvider';

// This sets the layout of authenticated pages

function PageLayout({ children }) {
	const router = useRouter();
	const user = useUser();
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
						<NotificationsIcon onClick={() => router.push(`/notifications/${user.id}`)} />
						<AccountCircle onClick={() => router.push(`/users/${user.id}`)} />
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
