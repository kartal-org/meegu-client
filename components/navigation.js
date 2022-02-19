import React, { useState } from 'react';
import { useUser } from '../contexts/userProvider';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineCompass } from 'react-icons/ai';
import { AiOutlineRead } from 'react-icons/ai';
import { AiOutlineBank } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
import { CgBriefcase } from 'react-icons/cg';
import { AiOutlineHighlight } from 'react-icons/ai';
import Link from 'next/link';

import styles from './navigation.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Navigation() {
	const user = useUser();
	const userType = user?.type;
	const router = useRouter();
	const location = router.pathname;

	const [selected, setSelected] = useState('');

	const CheckUser = () => {
		return (
			<>
				{userType == 'researcher' && (
					<Link href={`/workspaces?user=${user?.id}`}>
						<AiOutlineHighlight
							className={`${styles.nav__item} w-8 h-8 ${
								selected == 'workspaces' ? styles.selected : ''
							}`}
						/>
					</Link>
				)}
				{userType == 'adviser' && (
					<Link href={`/classrooms?user=${user?.id}`}>
						<CgBriefcase
							className={`${styles.nav__item} w-8 h-8 ${
								selected == 'classrooms' ? styles.selected : ''
							}`}
						/>
					</Link>
				)}
				{userType == 'moderator' && (
					<Link href={`/institutions?user=${user?.id}`}>
						<AiOutlineBank
							className={`${styles.nav__item} w-8 h-8 ${
								selected == 'institutions' ? styles.selected : ''
							}`}
						/>
					</Link>
				)}
			</>
		);
	};

	useEffect(() => {
		if (location.includes('home')) {
			setSelected('home');
		}
		if (location.includes('library')) {
			setSelected('library');
		}
		if (location.includes('discover')) {
			setSelected('discover');
		}
		if (location.includes('messages')) {
			setSelected('messages');
		}
		if (location.includes('workspaces')) {
			setSelected('workspaces');
		}
		if (location.includes('classrooms')) {
			setSelected('classrooms');
		}
		if (location.includes('institutions')) {
			setSelected('institutions');
		}
	}, [location]);

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__list}>
				<Link href='/home'>
					<AiOutlineHome
						className={`${styles.nav__item} w-8 h-8 ${
							selected == 'home' ? styles.selected : ''
						}`}
					/>
				</Link>
				<Link href={`/library?user=${user?.id}`}>
					<AiOutlineRead
						className={`${styles.nav__item} w-8 h-8 ${
							selected == 'library' ? styles.selected : ''
						}`}
					/>
				</Link>

				<CheckUser />

				<Link href='/discover'>
					<AiOutlineCompass
						className={`${styles.nav__item} w-8 h-8 ${
							selected == 'discover' ? styles.selected : ''
						}`}
					/>
				</Link>
				<Link href={`/messages?user=${user?.id}`}>
					<AiOutlineComment
						className={`${styles.nav__item} w-8 h-8 ${
							selected == 'messages' ? styles.selected : ''
						}`}
					/>
				</Link>
			</div>
		</nav>
	);
}

export default Navigation;
