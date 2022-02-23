import React from 'react';
import styles from './profile.module.scss';
import Image from 'next/image';

function Profile({ cover, pic, name, children }) {
	return (
		<div>
			<section className={styles.profile}>
				<div className={styles.profile__cover}>
					<Image layout='fill' objectFit='cover' src={cover} />
				</div>
				<div className={styles.profile__img}>
					<div className={styles.profile__img__cirle}>
						<Image layout='fill' objectFit='cover' src={pic} />
					</div>
				</div>
				<div className={styles.profile__info}>{children}</div>
			</section>
		</div>
	);
}

export default Profile;
