import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { outsideTheme } from "../themes/theme";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setOpen(true);
    });
    router.events.on("routeChangeComplete", () => {
      setOpen(false);
    });
    router.events.on("routeChangeError", () => {
      setOpen(false);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Meegu</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <DefaultSeo titleTemplate="%s | Meegu" defaultTitle="Meegu" />
      <ThemeProvider theme={outsideTheme}>
        <Component {...pageProps} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
