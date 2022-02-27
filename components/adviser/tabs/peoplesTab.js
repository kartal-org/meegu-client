import React, { useEffect, useState } from 'react';
import PageLayout from '../../../layouts/pageLayout';
import PeopleCard from '../../reusable/peopleCard';
import styles from './tabs.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import fileImg from '../../../public/Files.png';
import Cookies from 'js-cookie';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import CustomizedDialogs from '../../reusable/dialog2';
import { Box } from '@mui/system';

function PeoplesTab({ institutionID }) {
	const [membersList, setMembersList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [selectedUser, setSelectedUser] = useState();

	const { register, handleSubmit } = useForm();

	async function getMembers(type, isNotActive) {
		let queryLink = type
			? `/institutions/members?institution=${institutionID}&type=${type}`
			: `/institutions/members?institution=${institutionID}`;

		queryLink = queryLink + (isNotActive ? `&isNotActive=${true}` : '');

		console.log(queryLink);

		const responseGetMembers = await fetch(process.env.BACKEND_API_UR + queryLink, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
		});
		const resultMember = await responseGetMembers.json();
		console.log('members', resultMember);
		setMembersList(resultMember);
	}

	async function fetchPeople(type) {
		let queryLink = type ? `/users?type=${type}` : '/users';
		const response = await fetch(process.env.BACKEND_API_UR + queryLink, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
		});
		const result = await response.json();

		setUserList(result);
	}
	async function addPeople(data, e) {
		e.preventDefault();
		// console.log(data);
		// console.log(selectedUser);

		const getUser = userList.filter(
			(val) => `${val.first_name} ${val.last_name}` === selectedUser
		);
		console.log({ user: getUser[0].id, institution: institutionID, isActive: true });

		const request = await fetch(process.env.BACKEND_API_UR + '/institutions/members', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({ user: getUser[0].id, institution: institutionID, isActive: true }),
		});
		const result = await request.json();
		console.log(result);
		setMembersList([result, ...membersList]);
	}

	useEffect(() => {
		getMembers();
		fetchPeople();
	}, []);
	return (
		<>
			<div>
				<CustomizedDialogs
					title='Add People'
					openBtn={<Button>Add People</Button>}
					primaryAction={<Button onClick={handleSubmit(addPeople)}>Add</Button>}
				>
					<form onSubmit={handleSubmit(addPeople)}>
						<Autocomplete
							disablePortal
							inputValue={selectedUser}
							onInputChange={(event, newInputValue) => {
								setSelectedUser(newInputValue);
							}}
							// value={selectedUser}
							options={userList.filter((array) =>
								membersList.map((val) => val.user).some((filter) => filter.id !== array.id)
							)}
							getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
							fullWidth
							{...register('selectedUser')}
							renderInput={(params) => (
								<TextField fullWidth {...params} label='Search User' />
							)}
							renderOption={(props, option) => (
								<Box
									onClick={(event, option) => console.log(option)}
									component='li'
									sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
									{...props}
								>
									<img loading='lazy' width='20' src={option.profileImage} alt='' />
									{option.first_name} {option.last_name}
								</Box>
							)}
						/>
						{/* <Autocomplete
							options={userList}
							// {...register("name")}
							renderInput={(props, option) => (
								<TextField
									fullwidth
									{...params}
									label='Search user...'
									value={option.first_name + ' ' + option.last_name}
								/>
							)}
						/> */}
					</form>
				</CustomizedDialogs>
			</div>
			<div className={styles.peopleContainer}>
				{membersList?.map((member) => (
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
