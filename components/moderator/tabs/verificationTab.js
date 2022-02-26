import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackBarUpdate } from '../../../contexts/useSnackBar';
import CustomizedDialogs from '../../reusable/dialog2';

function VerificationTab() {
	const [verification, setVerification] = useState();
	const router = useRouter();
	const access_token = Cookies.get('access_token');
	const snackBarUpdate = useSnackBarUpdate();

	const { register, handleSubmit } = useForm();

	async function fetchVerification() {
		console.log(access_token);
		const request = await fetch(
			process.env.BACKEND_API_UR + `/institutions/verification?institution=${router.query.id}`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
		const result = await request.json();
		console.log(result);
		if (result[0]) {
			setVerification(result[0]);
		}
	}

	useEffect(() => {
		fetchVerification();
	}, []);

	async function sendVerification(data, e) {
		e.preventDefault();
		console.log(data);
		const formData = new FormData();
		formData.append('document', data.document[0], data.document[0].name);
		formData.append('institution', router.query.id);

		const request = await fetch(process.env.BACKEND_API_UR + `/institutions/verification`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			body: formData,
		});
		const result = await request.json();
		console.log(result);
		snackBarUpdate(true, 'Verification Send!');
	}

	return (
		<div>
			{!verification && (
				<div>
					<p>
						Hello it seems that this institution is still not verified. That means you don't
						have the capacity to publish articles and resources yet.
					</p>
					<CustomizedDialogs
						title='Verify Institution'
						openBtn={<Button>Get Verified</Button>}
						primaryAction={<Button onClick={handleSubmit(sendVerification)}>Submit</Button>}
					>
						<form onSubmit={handleSubmit(sendVerification)}>
							<p>
								Please upload a proof that your institution exist and your are in-charge.
							</p>
							<input type='file' {...register('document')} />
						</form>
					</CustomizedDialogs>
				</div>
			)}

			{verification?.status == 'pending' && (
				<div>
					<p>Your verification is still on process please bear with us</p>
				</div>
			)}

			{verification?.status == 'approved' && (
				<div>
					<p>This institution is verified by us.</p>
				</div>
			)}
			{verification?.status == 'disapproved' && (
				<div>
					<p>Sorry but this institution is denied of its verification request.</p>
				</div>
			)}
		</div>
	);
}

export default VerificationTab;
