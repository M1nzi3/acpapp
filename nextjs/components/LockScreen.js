import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home"; // Your Home page component
import WatchlistPage from "./WatchlistPage"; // Another page example
import WatchedMoviesPage from "./WatchedMoviesPage"; // Another page example
import { Box, Typography, Button, TextField } from "@mui/material";

function App() {
  // State for managing password and lock screen visibility
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Correct password
  const correctPassword = "mySecret123"; // Change this to your desired password

  // Function to handle password verification
  const handleUnlock = () => {
    if (password === correctPassword) {
      setIsUnlocked(true); // Unlock the entire app
    } else {
      alert("Incorrect password, try again!");
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* Lock Screen Overlay (covers entire app) */}
      {!isUnlocked && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              padding: "40px",
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: "20px", color: "white" }}>
              Enter Password to Access the App
            </Typography>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                backgroundColor: "#333333",
                borderRadius: "5px",
              }}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleUnlock}
              style={{ backgroundColor: "#ff1b1b", color: "white", marginTop: "16px" }}
              fullWidth
            >
              Unlock
            </Button>
          </Box>
        </Box>
      )}

      {/* App Content (all pages/routes) */}
      {isUnlocked && (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/page1" component={WatchlistPage} />
            <Route path="/page2" component={WatchedMoviesPage} />
          </Switch>
        </Router>
      )}
    </Box>
  );
}

export default App;
