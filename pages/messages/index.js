import { Button, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CgOptions } from 'react-icons/cg';
import PageLayout from '../../layouts/pageLayout';
import styles from './messages.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CustomizedDialogs from '../../components/reusable/dialog2';

function index() {
	const { register, handleSubmit } = useForm();

	async function addConversation(data, e) {
		e.preventDefault();
		console.log(data);
	}
	return (
		<>
			<header className={styles.page__header}>
				<h1 className={styles.page__title}>Messages</h1>
			</header>
			<main className={styles.page__content}>
				<section className={styles.conversation__container}>
					<div className={styles.conversation__containerHeader}>
						<form className={styles.right}>
							<div className={styles.conversation__searchbox}>
								<input
									className={styles.searchInput}
									type='search'
									placeholder='Search Conversation...'
								/>

								<SearchIcon />
							</div>
						</form>
						<CustomizedDialogs
							title='Add Coversation Room'
							openBtn={<button className={styles.conversation__addBtn}>&#43;</button>}
							primaryAction={<Button onClick={handleSubmit(addConversation)}>Create</Button>}
						>
							<form onSubmit={handleSubmit(addConversation)}>
								<TextField label='Conversation Name' {...register('name')} fullWidth />
								{/* <input type='text' {...register('name')} placeholder='Chat Name' /> */}
							</form>
						</CustomizedDialogs>
					</div>

					<ul className={styles.conversation__list}>
						<li className={styles.conversation}>
							<a href='#messageContainer'>Conversation 1</a>
						</li>
						<li className={styles.conversation}>
							<a href='#messageContainer'>Conversation 1</a>
						</li>
					</ul>
				</section>
				<section id='messageContainer' className={styles.message__container}>
					<header className={styles.message__containerHeader}>
						<h2 className={styles.message__convoName}>Conversation Name</h2>
						<IconButton>
							<CgOptions />
						</IconButton>
					</header>
					<ul className={styles.message__list}>
						<li className={styles.message}>Message 1</li>
						<li className={styles.message}>Message 2</li>
						<li className={styles.message}>Message 3</li>
						<li className={styles.message}>Message 2</li>
						<li className={styles.message}>Message 3</li>
						<li className={styles.message}>Message 2</li>
						<li className={styles.message}>Message 3</li>
					</ul>
					<form className={styles.message__form}>
						<TextField multiline fullWidth minRows={4} label='Type Message...' />
						<Button>Send Message</Button>
					</form>
				</section>
			</main>
		</>
	);
}

index.Layout = PageLayout;
export default index;
