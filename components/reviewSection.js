import { Avatar, Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CustomizedDialogs from './reusable/dialog2';
import Rating from '@mui/material/Rating';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../contexts/userProvider';
import moment from 'moment-timezone';
import styles from './reviewSection.module.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSnackBarUpdate } from '../contexts/useSnackBar';

function ReviewMenu({ review, reviewList, setReviewList }) {
	const snackBarUpdate = useSnackBarUpdate();
	const router = useRouter();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { register, handleSubmit, control } = useForm();

	async function editReview(data, e) {
		console.log(data);
		const request = await fetch(
			process.env.BACKEND_API_UR + `/publications/reviews/${review.id}/`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Cookies.get('access_token')}`,
				},
				body: JSON.stringify({
					rate: data.rating,
				}),
			}
		);
		const result = await request.json();
		console.log(result);
		const newList = reviewList.map((val) => {
			if (val.id == result.id) {
				return result;
			} else {
				return val;
			}
		});
		console.log(newList);
		setReviewList(newList);
		snackBarUpdate(true, 'Review Edited!');
		handleClose();
		// router.reload();
	}
	async function deleteReview() {
		const request = await fetch(
			process.env.BACKEND_API_UR + `/publications/reviews/${review.id}/`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Cookies.get('access_token')}`,
				},
			}
		);
		const result = await request.json();
		console.log(result);
		setReviewList(reviewList.filter((val) => val.id !== result.id));

		snackBarUpdate(true, 'Review Deleted!');
		handleClose();
		// router.reload();
	}
	return (
		<>
			<IconButton onClick={handleClick} aria-label='delete'>
				<MoreHorizIcon />
			</IconButton>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<CustomizedDialogs
					title='Edit Review'
					openBtn={<MenuItem>Edit</MenuItem>}
					primaryAction={<Button onClick={handleSubmit(editReview)}>Save Changes</Button>}
				>
					<form>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '20px',
								marginBottom: '1rem',
							}}
						>
							<p>Rate this article: </p>
							<Controller
								name='rating'
								control={control}
								render={({ field: { onChange } }) => (
									<Rating defaultValue={review.rate} name='rating' onChange={onChange} />
								)}
							/>
						</div>
					</form>
				</CustomizedDialogs>
				<CustomizedDialogs
					title='Delete Review'
					openBtn={<MenuItem>Delete</MenuItem>}
					primaryAction={<Button onClick={deleteReview}>Confirm</Button>}
				>
					Are you sure you want to delete your review?
				</CustomizedDialogs>

				{/* <MenuItem onClick={handleClose}>Delete</MenuItem> */}
			</Menu>
		</>
	);
}

function ReviewSection() {
	const router = useRouter();
	const [reviewList, setReviewList] = useState([]);
	const user = useUser();
	// alert('Iam here');
	console.log('Iam here');

	const { register, handleSubmit, control } = useForm();

	useEffect(() => {
		async function fetchReviews() {
			const request = await fetch(
				process.env.BACKEND_API_UR + `/publications/reviews?article=${router.query.articleID}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${Cookies.get('access_token')}`,
					},
				}
			);
			const result = await request.json();
			console.log(result);
			setReviewList(result);
		}
		fetchReviews();
	}, []);

	async function postReview(data, e) {
		e.preventDefault();
		console.log(data);
		const request = await fetch(process.env.BACKEND_API_UR + `/publications/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({
				rate: data.rating,
				article: router.query.articleID,
				user: user.id,
			}),
		});
		const result = await request.json();
		console.log(result);
		setReviewList([result, ...reviewList]);
	}
	console.log('length', reviewList.filter((val) => val.user.id === user.id).length);

	return (
		<div>
			{reviewList.filter((val) => val.user.id === user.id).length === 0 && (
				<CustomizedDialogs
					title='Add Review'
					openBtn={<Button>Add Review</Button>}
					primaryAction={<Button onClick={handleSubmit(postReview)}>Post Review</Button>}
				>
					<form>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '20px',
								marginBottom: '1rem',
							}}
						>
							<p>Rate this article: </p>
							<Controller
								name='rating'
								control={control}
								render={({ field: { onChange } }) => (
									<Rating name='rating' onChange={onChange} />
								)}
							/>
						</div>
					</form>
				</CustomizedDialogs>
			)}

			<ul className={styles.review__list}>
				{reviewList.length > 0
					? reviewList?.map((review) => (
							<li className={styles.review} key={review.id}>
								<div>
									<Avatar
										src={review.user?.profileImage}
										alt={`${review.user?.first_name}'s Profile Picture`}
									/>
									<div className={styles.review__content}>
										<p className={styles.review__author}>
											{review.user?.first_name} {review?.user.last_name}
										</p>
										<p className={styles.review__timeStamp}>
											<em>{moment(review?.dateUpdated).fromNow()}</em>
										</p>
										<Rating readOnly value={review.rate} />
										{/* <p className={styles.review__message}>{review?.comment}</p> */}
									</div>
								</div>
								<div>
									{review.user?.id === user.id && (
										<ReviewMenu
											review={review}
											reviewList={reviewList}
											setReviewList={setReviewList}
										/>
									)}
								</div>
							</li>
					  ))
					: 'No review yet'}
			</ul>
		</div>
	);
}

export default ReviewSection;
