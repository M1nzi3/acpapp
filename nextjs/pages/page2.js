import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Rating, Box } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';


export default function WatchedPage() {
  // Define state to hold form data
  const [value, setValue] = React.useState(2);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [movieTitle, setMovieTitle] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieReleasedDate, setMovieReleasedDate] = useState("");
  const [movieDirector, setMovieDirector] = useState("");
  const [dateWatched, setDateWatched] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the data object to be sent to the backend
    const movieWatchedData = {
      movie_title: movieTitle,
      movie_genre: movieGenre,
      movie_releaseddate: movieReleasedDate,
      movie_director: movieDirector,
      date_watched: dateWatched
    };

    // console.log(movieData)

    try {
      // Make the API request to the backend
      // const response = await axios.post("/api/movie/", movieData);
      const response = await fetch('/api/movie/watched', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieWatchedData),
      });
      console.log(response)
      // If successful, handle success (e.g., clear the form, show a success message)
      if (response.ok) {
        alert("Movie added successfully!");
        // Clear form fields
        setMovieTitle("");
        setMovieGenre("");
        setMovieReleasedDate("");
        setMovieDirector("");
        setDateWatched("")
      } else {
        alert("Failed to add movie. Please try again.");
      }

    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error adding movie:", error);
      alert("Failed to add movie. Please try again.");
    }
  };


  return (
    <Grid container spacing={2} style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
      {/* Movie information */}
      <Grid item xs={12} sm={5}>
        <Paper elevation={5} style={{ padding: '50px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
          <Typography variant="h5" gutterBottom style={{ color: '#ffffff' }}>
            Please insert movie information
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Movie Title"
              variant="outlined"
              margin="normal"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
              required
            />
            <TextField
              fullWidth
              label="Genre"
              variant="outlined"
              margin="normal"
              value={movieGenre}
              onChange={(e) => setMovieGenre(e.target.value)}
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
              required
            />
            <TextField
              fullWidth
              label="Released Date"
              variant="outlined"
              margin="normal"
              type="date"
              value={movieReleasedDate}
              onChange={(e) => setMovieReleasedDate(e.target.value)}
              InputLabelProps={{ shrink: true, style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
              required
            />
            <TextField
              fullWidth
              label="Director"
              variant="outlined"
              margin="normal"
              value={movieDirector}
              onChange={(e) => setMovieDirector(e.target.value)}
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
              required
            />
            <TextField
              fullWidth
              label="Watched Date"
              variant="outlined"
              margin="normal"
              type="date"
              value={dateWatched}
              onChange={(e) => setDateWatched(e.target.value)}
              InputLabelProps={{ shrink: true, style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
            />
            <Button 
              type="submit"
              variant="contained" 
              fullWidth 
              style={{ backgroundColor: '#ff1b1b', color: '#ffffff', marginTop: '16px' }}
            >
              Add Movie
            </Button>
          </form>
        </Paper>
      </Grid>

      {/* Review Section */}
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
          <Typography variant="h5" gutterBottom style={{ color: '#ffffff' }}>
            Rate and Review your watched movie?
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Name"
              variant="filled"
              margin="normal"
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography component="legend" style={{ color: '#ffffff' }}>Rate this movie</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  size="large"
                  onChange={(event, newValue) => { setValue(newValue); }}
                  emptyIcon={<StarIcon style={{color: '#ffffff', opacity: 0.30 }} fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography component="legend" style={{ color: '#ffffff' }}>Add to your favourite</Typography>
                <Checkbox {...label} icon={<FavoriteBorder style={{ color: '#989898' }}/>} checkedIcon={<Favorite style={{ color: '#ff1f6a' }}/>}/>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Review"
              variant="filled"
              margin="normal"
              multiline
              maxRows={5}
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
            />
            <Button variant="contained" fullWidth style={{ backgroundColor: '#ff1b1b', color: '#ffffff', marginTop: '16px' }}>
              Save my rating and review
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
