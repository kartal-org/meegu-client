import React from "react";
import Image from "next/image";

import styles from "./peopleCard.module.scss";

import { Avatar } from "@mui/material";

function PeopleCard(props) {
	const { avatar, name, role, children, actions } = props;
	return (
		<>
			<article className={styles.card}>
				<div className={styles.cardSplit}>
					<div className={styles.cardItem}>
						<div className={styles.card_img}>
							<Avatar alt="Remy Sharp" src={avatar} />
						</div>
					</div>

					<div className={styles.cardItem}>
						<h4 className={styles.card_name}>{name}</h4>
						<h5 className={styles.card_role}>{role}</h5>
					</div>
					{children}
					{actions && (
						<>
							<div className={styles.card_action}>{actions}</div>
							<div className={styles.overlay}></div>
						</>
					)}
				</div>
			</article>
		</>
	);
}

export default PeopleCard;
