import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import useBearStore from "@/store/useBearStore";

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const appName = useBearStore((state) => state.appName);

  // Logout function to clear localStorage and redirect to lockscreen
  const handleLogout = () => {
    localStorage.removeItem('unlocked'); // Clear unlock status
    router.push('/lockscreen'); // Redirect to lockscreen
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <NavigationLink href="/" label="Home" />
          <NavigationLink href="/watchlist" label="Watchlist" />
          <NavigationLink href="/page2" label="Watched Movies" />

          <div style={{ flexGrow: 1 }} /> {/* Flex spacer */}

          {/* Account Button */}
          <Button
            color="#ffffff"
            onClick={() => {
              router.push("/page2");
            }}>
            <PersonIcon />
          </Button>

          {/* Logout Button */}
          <Button
            color="inherit"
            onClick={handleLogout} // Call the logout function
            sx={{ ml: 2 }} // Optional margin-left for spacing
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

const NavigationLink = ({ href, label }) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          textTransform: "uppercase",
          color: "#fff",
          padding: "0 10px", // Add padding on left and right
        }}>
        {label}
      </Typography>
    </Link>
  );
};

export default NavigationLayout;

