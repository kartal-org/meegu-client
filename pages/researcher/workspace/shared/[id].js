import CustomDrawer from '../../../../components/researcher/drawer';
import WorkspaceTabs from '../../../../components/researcher/workspaceTabs';
import { useRouter } from 'next/router';

export default function SharedWorkspaceDetail() {
	const router = useRouter();
	console.log(router);
	return (
		<div>
			<CustomDrawer pageTitle='Workspaces'>
				<WorkspaceTabs activeTab='shared'>
					Single Shared Workspace- {router.query.id}{' '}
				</WorkspaceTabs>
			</CustomDrawer>
		</div>
	);
}
