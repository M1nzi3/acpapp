// import React, { useState, useEffect } from "react";
// import { TextField, Button, Grid, Typography, Paper, Rating, Box } from "@mui/material";
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import StarIcon from '@mui/icons-material/Star';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';

// export default function WatchedPage() {
//   // Define state to hold form data
//   const [value, setValue] = React.useState(2);
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//   const [movieTitle, setMovieTitle] = useState("");
//   const [movieGenre, setMovieGenre] = useState("");
//   const [movieReleasedDate, setMovieReleasedDate] = useState("");
//   const [movieDirector, setMovieDirector] = useState("");
//   const [dateWatched, setDateWatched] = useState("");
//   const [movieRate, setmovieRate] = useState("");
//   const [movieFavourite, setMovieFavourite] = useState("");
//   const [movieReview, setMovieReview] = useState("");

//   const [watchedMovies, setWatchedMovies] = useState([]); // State for watched movies
//   const [selectedMovie, setSelectedMovie] = useState(""); // State for the selected movie

//   useEffect(() => {
//     // Fetch watched movies from backend
//     const fetchWatchedMovies = async () => {
//       try {
//         const response = await fetch('/api/watched');
//         const data = await response.json();
//         setWatchedMovies(data); // Assuming data contains an array of watched movies
//       } catch (error) {
//         console.error('Error fetching watched movies:', error);
//       }
//     };

//     fetchWatchedMovies();
//   }, []);

//   const handleMovieChange = (event) => {
//     setSelectedMovie(event.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create the data object to be sent to the backend
//     const movieWatchedData = {
//       movie_title: movieTitle,
//       movie_genre: movieGenre,
//       movie_releaseddate: movieReleasedDate,
//       movie_director: movieDirector,
//       date_watched: dateWatched
//     };

//     try {
//       // Make the API request to the backend
//       const response = await fetch('/api/movie/createWatched', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(movieWatchedData),
//       });

//       if (response.ok) {
//         alert("Movie added successfully!");
//         // Clear form fields
//         setMovieTitle("");
//         setMovieGenre("");
//         setMovieReleasedDate("");
//         setMovieDirector("");
//         setDateWatched("");
//       } else {
//         alert("Failed to add movie. Please try again.");
//       }

//     } catch (error) {
//       console.error("Error adding movie:", error);
//       alert("Failed to add movie. Please try again.");
//     }
//   };

//   // Handle rating form submission
//   const handleRatingSubmit = async (e) => {
//     e.preventDefault();

//     // Create the data object to be sent to the backend
//     const ratedMovie = {
//       movie_title: movieTitle,
//       movie_rate: movieRate,
//       movie_favourite: movieFavourite,
//       movie_review: movieReview
//     };

//     try {
//       // Make the API request to the backend
//       const response = await fetch('/api/rate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(ratedMovie),
//       });

//       if (response.ok) {
//         alert("Sucessesfully rated the movie!");
//         // Clear form fields
//         setmovieRate("");
//         setMovieFavourite("");
//         setMovieReview("");
//       } else {
//         alert("Failed to rate movie. Please try again.");
//       }

//     } catch (error) {
//       console.error("Error rating movie:", error);
//       alert("Failed to rate movie. Please try again.");
//     }
//   };
  

//   return (
//     <Grid container spacing={2} style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
//       {/* Movie information */}
//       <Grid item xs={12} sm={5}>
//         <Paper elevation={5} style={{ padding: '50px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//           <Typography variant="h5" gutterBottom style={{ color: '#ffffff' }}>
//             Please insert movie information
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Movie Title"
//               variant="outlined"
//               margin="normal"
//               value={movieTitle}
//               onChange={(e) => setMovieTitle(e.target.value)}
//               InputLabelProps={{ style: { color: '#ffffff' } }}
//               InputProps={{ style: { color: '#ffffff' } }}
//               style={{ backgroundColor: '#333333' }}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Genre"
//               variant="outlined"
//               margin="normal"
//               value={movieGenre}
//               onChange={(e) => setMovieGenre(e.target.value)}
//               InputLabelProps={{ style: { color: '#ffffff' } }}
//               InputProps={{ style: { color: '#ffffff' } }}
//               style={{ backgroundColor: '#333333' }}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Released Date"
//               variant="outlined"
//               margin="normal"
//               type="date"
//               value={movieReleasedDate}
//               onChange={(e) => setMovieReleasedDate(e.target.value)}
//               InputLabelProps={{ shrink: true, style: { color: '#ffffff' } }}
//               InputProps={{ style: { color: '#ffffff' } }}
//               style={{ backgroundColor: '#333333' }}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Director"
//               variant="outlined"
//               margin="normal"
//               value={movieDirector}
//               onChange={(e) => setMovieDirector(e.target.value)}
//               InputLabelProps={{ style: { color: '#ffffff' } }}
//               InputProps={{ style: { color: '#ffffff' } }}
//               style={{ backgroundColor: '#333333' }}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Watched Date"
//               variant="outlined"
//               margin="normal"
//               type="date"
//               value={dateWatched}
//               onChange={(e) => setDateWatched(e.target.value)}
//               InputLabelProps={{ shrink: true, style: { color: '#ffffff' } }}
//               InputProps={{ style: { color: '#ffffff' } }}
//               style={{ backgroundColor: '#333333' }}
//             />
//             <Button 
//               type="submit"
//               variant="contained" 
//               fullWidth 
//               style={{ backgroundColor: '#ff1b1b', color: '#ffffff', marginTop: '16px' }}
//             >
//               Add Movie
//             </Button>
//           </form>
//         </Paper>
//       </Grid>

//       {/* Review Section */}
//       <Grid item xs={12} sm={4}>
//         <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//           <Typography variant="h5" gutterBottom style={{ color: '#ffffff' }}>
//             Rate and Review your watched movie?
//           </Typography>
//           <form>
//             <FormControl fullWidth style={{ color: '#ffffff', backgroundColor: '#333333' }}>
//               <InputLabel id="movie-select-label" component="legend" style={{ color: '#ffffff' }}>Movie Title</InputLabel>
//               <Select
//                 labelId="movie-select-label"
//                 id="movie-select"
//                 value={selectedMovie}
//                 onChange={handleMovieChange}
//                 style={{ color: '#ffffff' }}
//               >
//                 {watchedMovies.map((movie) => (
//                   <MenuItem key={movie.movie_id} value={movie.movie_title}>
//                     {movie.movie_title}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Grid container spacing={2} marginTop={1}>
//               <Grid item xs={6}>
//                 <Typography component="legend" style={{ color: '#ffffff' }}>Rate this movie</Typography>
//                 <Rating
//                   name="simple-controlled"
//                   value={movieRate}
//                   size="large"
//                   onChange={(event, newValue) => { setValue(newValue); }}
//                   emptyIcon={<StarIcon style={{color: '#ffffff', opacity: 0.30 }} fontSize="inherit" />}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography component="legend" style={{ color: '#ffffff' }}>Add to your favourite</Typography>
//                 <Checkbox {...label} value={movieFavourite} icon={<FavoriteBorder style={{ color: '#989898' }}/>} checkedIcon={<Favorite style={{ color: '#ff1f6a' }}/>}/>
//               </Grid>
//             </Grid>
//             <TextField
//               fullWidth
//               label="Review"
//               variant="filled"
//               margin="normal"
//               value={movieReview}
//               multiline
//               maxRows={5}
//               InputLabelProps={{ style: { color: '#ffffff' } }}
//               InputProps={{ style: { color: '#ffffff' } }}
//               style={{ backgroundColor: '#333333' }}
//             />
//             <Button onClick={handleRatingSubmit} variant="contained" fullWidth style={{ backgroundColor: '#ff1b1b', color: '#ffffff', marginTop: '16px' }}>
//               Save my rating and review
//             </Button>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }


//Still can't save rating backend is Ok 
import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Paper, Rating, Box } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function WatchedPage() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [movieTitle, setMovieTitle] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieReleasedDate, setMovieReleasedDate] = useState("");
  const [movieDirector, setMovieDirector] = useState("");
  const [dateWatched, setDateWatched] = useState("");
  const [movieRate, setMovieRate] = useState(2); // Set default rating
  const [movieFavourite, setMovieFavourite] = useState(false);
  const [movieReview, setMovieReview] = useState("");

  const [watchedMovies, setWatchedMovies] = useState([]); // State for watched movies
  const [selectedMovieId, setSelectedMovieId] = useState(""); // Store movie_id instead of movie_title

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      try {
        const response = await fetch('/api/watched');
        const data = await response.json();
        setWatchedMovies(data);
      } catch (error) {
        console.error('Error fetching watched movies:', error);
      }
    };
    fetchWatchedMovies();
  }, []);

  // Update to store selected movie's ID instead of title
  const handleMovieChange = (event) => {
    setSelectedMovieId(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieWatchedData = {
      movie_title: movieTitle,
      movie_genre: movieGenre,
      movie_releaseddate: movieReleasedDate,
      movie_director: movieDirector,
      date_watched: dateWatched
    };

    try {
      const response = await fetch('/api/movie/createWatched', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieWatchedData),
      });

      if (response.ok) {
        alert("Movie added successfully!");
        setMovieTitle("");
        setMovieGenre("");
        setMovieReleasedDate("");
        setMovieDirector("");
        setDateWatched("");
      } else {
        alert("Failed to add movie. Please try again.");
      }

    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie. Please try again.");
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    // Ensure we're submitting the selected movie's ID instead of title
    const ratedMovie = {
      movie_id: selectedMovieId, // Changed to movie_id
      movie_rate: movieRate,
      movie_favourite: movieFavourite,
      movie_review: movieReview
    };
    console.log(ratedMovie)

    try {
      const response = await fetch('/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratedMovie),
      });

      if (response.ok) {
        alert("Successfully rated the movie!");
        setMovieRate(2);  // Reset to default rating
        setMovieFavourite(false);  // Reset favorite checkbox
        setMovieReview("");
        setSelectedMovieId("");  // Clear selected movie
      } else {
        alert("Failed to rate movie. Please try again.");
      }

    } catch (error) {
      console.error("Error rating movie:", error);
      alert("Failed to rate movie. Please try again.");
    }
  };

  return (
    <Grid container spacing={2} style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
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

      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
          <Typography variant="h5" gutterBottom style={{ color: '#ffffff' }}>
            Rate and Review your watched movie?
          </Typography>
          <form>
            <FormControl fullWidth style={{ color: '#ffffff', backgroundColor: '#333333' }}>
              <InputLabel id="movie-select-label" component="legend" style={{ color: '#ffffff' }}>Movie Title</InputLabel>
              <Select
                labelId="movie-select-label"
                id="movie-select"
                value={selectedMovieId}
                onChange={handleMovieChange}
                style={{ color: '#ffffff' }}
              >
                {watchedMovies.map((movie) => (
                  <MenuItem key={movie.movie_id} value={movie.movie_id}>
                    {movie.movie_title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={6}>
                <Typography component="legend" style={{ color: '#ffffff' }}>Rate this movie</Typography>
                <Rating
                  name="simple-controlled"
                  value={movieRate}
                  size="large"
                  onChange={(event, newValue) => { setMovieRate(newValue); }}
                  emptyIcon={<StarIcon style={{ color: '#ffffff', opacity: 0.30 }} fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography component="legend" style={{ color: '#ffffff' }}>Add to your favourite</Typography>
                <Checkbox
                  {...label}
                  checked={movieFavourite}
                  onChange={(e) => setMovieFavourite(e.target.checked)}
                  icon={<FavoriteBorder style={{ color: '#989898' }} />}
                  checkedIcon={<Favorite style={{ color: '#ff1f6a' }} />}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Review"
              variant="filled"
              margin="normal"
              value={movieReview}
              onChange={(e) => setMovieReview(e.target.value)}
              multiline
              maxRows={5}
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              style={{ backgroundColor: '#333333' }}
            />
            <Button onClick={handleRatingSubmit} variant="contained" fullWidth style={{ backgroundColor: '#ff1b1b', color: '#ffffff', marginTop: '16px' }}>
              Save my rating and review
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
