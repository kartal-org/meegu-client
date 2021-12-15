import { wrapper } from '../store/configureStore';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { outsideTheme } from '../themes/theme';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={outsideTheme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default wrapper.withRedux(MyApp);
