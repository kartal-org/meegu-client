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
import logo from '../public/meeguLogoWText.svg';
import Image from 'next/image';
import CustomSnackBar from '../components/reusable/snackBar';
import { useSnackBar } from '../contexts/useSnackBar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';

// This sets the layout of authenticated pages

function PageLayout({ children }) {
	const router = useRouter();
	const user = useUser();
	const snackBar = useSnackBar();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<AuthLayout />
			<div className={styles.pageContainer}>
				<header className={styles.header}>
					<div>
						<Link href='/home'>
							<a className={styles.logo__wrapper}>
								<Image
									src={logo}
									height={50}
									width={100}
									layout='intrinsic'
									objectFit='contain'
									className={styles.logo}
								/>
								{/* <h2 className={styles.logo}>meegu</h2> */}
							</a>
						</Link>
					</div>
					<div className={styles.header__buttons}>
						<Tooltip title='Notifications' placement='bottom'>
							<NotificationsIcon onClick={() => router.push(`/notifications/${user.id}`)} />
						</Tooltip>
						<Tooltip title='Account Options' placement='bottom'>
							<Avatar
								src={user?.profileImage}
								onClick={handleClick}
								//  onClick={() => router.push(`/users/${user.id}`)}
							/>
						</Tooltip>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem
								onClick={() => {
									handleClose();
									router.push(`/users/${user.id}`);
								}}
							>
								Profile
							</MenuItem>

							<MenuItem onClick={handleClose}>Settings</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</div>
				</header>
				<main className={styles.main}>{children}</main>
				<div className={styles.navigation}>
					<Navigation />
				</div>
				<CustomSnackBar isOpen={snackBar.open} message={snackBar.message} />
			</div>
		</>
	);
}

export default PageLayout;
