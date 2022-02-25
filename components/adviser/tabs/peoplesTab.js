import React, { useState } from 'react';
import PageLayout from '../../../layouts/pageLayout';
import PeopleCard from '../../reusable/peopleCard';
import styles from './tabs.module.scss';

import fileImg from '../../../public/Files.png';

function PeoplesTab({ members }) {
	const [membersList, setMembersList] = useState(members);
	return (
		<>
			<div className={styles.peopleContainer}>
				{membersList.map((member) => (
					<PeopleCard
						key={member.id}
						name={`${member.user.first_name} ${member.user.last_name}`}
						role={member.user.type}
						avatar={member.user.profileImage}
					></PeopleCard>
				))}
				{/* {membersList.map((item) => (
					<PeopleCard
						key={item.id}
						name={item.name}
						role='Adviser'
						avatar={fileImg}
					></PeopleCard>
				))} */}
				{/* <PeopleCard
					name="Maria Thania Sinogaya"
					role="Adviser"
					avatar={fileImg}
				></PeopleCard>
				<PeopleCard
					name="Maria Thania Sinogaya"
					role="Adviser"
					avatar={fileImg}
				></PeopleCard> */}
			</div>
		</>
	);
}

export default PeoplesTab;
