import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: `url('/MovieBackground.jpg')`, // Adjust the path if needed
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Main Content */}
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', bgcolor: 'rgba(18, 18, 18, 0.5)' }}>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h2">Welcome to Flimary</Typography>
          <Typography variant="h5" sx={{ marginTop: "10px" }}>
            Your life is a movie. <br />
            You are the main character. <br />
            You say your scripts and act to your lines.
          </Typography>
          <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={5}>
          <Button variant="contained" href="/page1" style={{ backgroundColor: '#ff1b1b', color: 'white', marginTop: '16px' }} >
              Add watchlist
            </Button>
          </Grid>
          <Grid item xs={5}>

          <Button variant="contained" href="/page2" style={{ backgroundColor: '#ff1b1b', color: 'white', marginTop: '16px' }} >
              Add watched movie
            </Button>
          </Grid>

          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default Home;

