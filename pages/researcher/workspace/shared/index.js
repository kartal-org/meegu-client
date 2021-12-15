import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomDrawer from '../../../../components/researcher/drawer';
import WorkspaceTabs from '../../../../components/researcher/workspaceTabs';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function SharedWorkspace() {
	const items = [
		{ id: 1, title: 'Hello' },
		{ id: 2, title: 'Hello 2' },
	];
	return (
		<div>
			<CustomDrawer pageTitle='Workspaces'>
				<WorkspaceTabs activeTab='shared'>
					{items.map((val) => (
						<Link key={val.id} href={`/researcher/workspace/shared/hello${val.id}`}>
							<Card sx={{ minWidth: 275, mb: 2 }}>
								<CardContent>{val.title}</CardContent>
								<CardActions>
									<Button size='small'>Learn More fdf</Button>
								</CardActions>
							</Card>
						</Link>
					))}
				</WorkspaceTabs>
			</CustomDrawer>
		</div>
	);
}
