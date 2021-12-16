import CustomDrawer from '../../components/researcher/drawer';
import { NextSeo } from 'next-seo';

export default function Notes() {
	return (
		<>
			<NextSeo title='Notes' />
			<CustomDrawer pageTitle='Notes'>Notes</CustomDrawer>
		</>
	);
}
