import { NextSeo } from "next-seo";
import { useState } from "react";

export default function CheckUser() {
	const users = [
		{
			id: 1,
			user: "Researcher",
			img: (
				<>
					<img src="https://cdn-icons.flaticon.com/png/128/3153/premium/3153024.png?token=exp=1645165396~hmac=1051abdc078cbadfe20b94aa3e7dc0d0" />
				</>
			),
		},
		{
			id: 2,
			user: "Adviser",
			img: (
				<>
					<img src="https://cdn-icons.flaticon.com/png/512/3152/premium/3152908.png?token=exp=1645165417~hmac=71134b9dde204cc301ce379033a29c9b" />
				</>
			),
		},
		{
			id: 3,
			user: "Moderator",
			img: (
				<>
					<img src="https://cdn-icons.flaticon.com/png/128/3152/premium/3152902.png?token=exp=1645165417~hmac=92f75c75295fd377768660d5dbbc8375" />
				</>
			),
		},
	];
	return (
		<>
			<NextSeo title="Check User" />
			<div className="h-screen p-5 flex flex-col items-center justify-center">
				<p className="text-4xl text-center font-bold text-gray-500">
					What type of user are you ?
				</p>

				<div className="mainParent">
					{users.map((item) => (
						<div className="userCard">
							<div className="userCardImg">{item.img}</div>
							<p className="text-center mt-5">{item.user}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
