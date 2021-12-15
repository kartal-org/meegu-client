import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function LandingPage() {
	const router = useRouter();
	return (
		<>
			<Button onClick={() => router.push('/login')} variant='outlined'>
				Login
			</Button>
		</>
	);
}
