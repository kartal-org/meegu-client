import React from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '../../layouts/pageLayout';

function index() {
	const { register, handleSubmit } = useForm();

	async function addCoversation(data, e) {
		e.preventDefault();
		console.log(data);
	}
	return (
		<div>
			<form onSubmit={handleSubmit(addCoversation)}>
				<input type='text' {...register('name')} placeholder='Chat Name' />
				<button type='submit'>Create Convo</button>
			</form>
		</div>
	);
}

index.Layout = PageLayout;
export default index;
