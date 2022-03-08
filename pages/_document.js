import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
				/>
				<link rel='stylesheet' href='https://unpkg.com/open-props' />
		<script src='https://www.paypal.com/sdk/js?client-id=AUdBnNKW8cFcjXQ4XONeBm-rP9HRPgE2fg04K-YH33utmE-FaBKjKB_8JnKRoARP20vKfS8h3Dm62M4v&currency=PHP'></script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
