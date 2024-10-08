import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import Layout from "@/components/layout";
import useBearStore from "@/store/useBearStore";
import Head from "next/head";
import { Backdrop, CircularProgress } from "@mui/material";
import LockScreen from "@/components/LockScreen"; // Import the LockScreen component

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default function App({ Component, pageProps, props }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false); // Track if the user has unlocked
  const setAppName = useBearStore((state) => state.setAppName);
  const pageName = router.pathname;

  useEffect(() => {
    console.log("App load", pageName, router.query);
    setLoading(true);
    
    // Check if user is unlocked from localStorage
    const unlocked = localStorage.getItem('unlocked') === 'true';
    setIsUnlocked(unlocked);

    setAppName("Say Hi");
    setLoading(false);
  }, [router, pageName]);

  // Handle the lock screen rendering if the user hasn't unlocked yet
  if (!isUnlocked && pageName !== '/lockscreen') {
    return (
      <LockScreen />  // Render LockScreen if not unlocked
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>{`Application`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppCacheProvider {...props}>
        <ThemeProvider theme={theme}>
          <Layout>
            {loading ? (
              <Backdrop open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </ThemeProvider>
      </AppCacheProvider>
    </React.Fragment>
  );
}

