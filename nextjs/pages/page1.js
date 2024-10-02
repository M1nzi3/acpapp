// import React, { useState } from "react";
// import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
// // import axios from "axios";

// export default function WatchlistPage() {
//   // Define state to hold form data
//   const [movieTitle, setMovieTitle] = useState("");
//   const [movieGenre, setMovieGenre] = useState("");
//   const [movieReleasedDate, setMovieReleasedDate] = useState("");
//   const [movieDirector, setMovieDirector] = useState("");

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create the data object to be sent to the backend
//     const movieData = {
//       movie_title: movieTitle,
//       movie_genre: movieGenre,
//       movie_releaseddate: movieReleasedDate,
//       movie_director: movieDirector
//     };

//     // console.log(movieData)

//     try {
//       // Make the API request to the backend
//       // const response = await axios.post("/api/movie/", movieData);
//       const response = await fetch('/api/movie/hello', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           movie_title: movieTitle,
//           movie_genre: movieGenre,
//           movie_releaseddate: movieReleasedDate,
//           movie_director: movieDirector
//         }),
//       });
//       console.log(response)
//       // If successful, handle success (e.g., clear the form, show a success message)
//       if (response.status === 200) {
//         alert("Movie added successfully!");
//         // Clear form fields
//         setMovieTitle("");
//         setMovieGenre("");
//         setMovieReleasedDate("");
//         setMovieDirector("");
//       }

//     } catch (error) {
//       // Handle errors (e.g., show an error message)
//       console.error("Error adding movie:", error);
//       alert("Failed to add movie. Please try again.");
//     }
//   };

//   return (
//     <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', bgcolor: '#121212' }}>
//       <Grid item xs={12} sm={5} md={8} lg={6}>
//         <Paper elevation={5} style={{ padding: '50px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//           <Typography textAlign="center" variant="h4" gutterBottom sx={{ color: "#ffffff" }}>
//             Add Movie to Watchlist
//           </Typography>
//           <Typography textAlign="left" variant="h7" gutterBottom sx={{ color: "#ffffff" }}>
//             Please insert movie information:
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Movie Title"
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   value={movieTitle}
//                   onChange={(e) => setMovieTitle(e.target.value)}
//                   InputLabelProps={{ style: { color: '#ffffff' } }}
//                   InputProps={{ style: { color: '#ffffff' } }}
//                   style={{ backgroundColor: '#333333' }}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Genre"
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   value={movieGenre}
//                   onChange={(e) => setMovieGenre(e.target.value)}
//                   InputLabelProps={{ style: { color: '#ffffff' } }}
//                   InputProps={{ style: { color: '#ffffff' } }}
//                   style={{ backgroundColor: '#333333' }}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Released Date"
//                   variant="outlined"
//                   margin="normal"
//                   type="date"
//                   fullWidth
//                   value={movieReleasedDate}
//                   onChange={(e) => setMovieReleasedDate(e.target.value)}
//                   InputLabelProps={{ shrink: true, style: { color: '#ffffff' } }}
//                   InputProps={{ style: { color: '#ffffff' } }}
//                   style={{ backgroundColor: '#333333' }}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Director"
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   value={movieDirector}
//                   onChange={(e) => setMovieDirector(e.target.value)}
//                   InputLabelProps={{ style: { color: '#ffffff' } }}
//                   InputProps={{ style: { color: '#ffffff' } }}
//                   style={{ backgroundColor: '#333333' }}
//                   required
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               variant="contained"
//               style={{ backgroundColor: '#ff1b1b', color: 'white', marginTop: '16px' }}
//               fullWidth
//             >
//               Add to Watchlist
//             </Button>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }

import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";

export default function WatchlistPage() {
  // Define state to hold form data
  const [movieTitle, setMovieTitle] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieReleasedDate, setMovieReleasedDate] = useState("");
  const [movieDirector, setMovieDirector] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the data object to be sent to the backend
    const movieData = {
      movie_title: movieTitle,
      movie_genre: movieGenre,
      movie_releaseddate: movieReleasedDate,
      movie_director: movieDirector
    };

    try {
      // Make the API request to the backend to add the movie
      const response = await fetch('/api/movie/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      // Check if the movie was added successfully
      if (response.ok) {
        const movie = await response.json(); // Parse the response to get the movie details

        // Now add the movie to the watchlist using the movie_id from the response
        const watchlistResponse = await fetch('/api/watchlist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movie_id: movie.movie_id }), // Use the returned movie_id
        });

        if (watchlistResponse.ok) {
          alert("Movie added to watchlist successfully!");
          // Clear form fields
          setMovieTitle("");
          setMovieGenre("");
          setMovieReleasedDate("");
          setMovieDirector("");
        } else {
          alert("Failed to add movie to watchlist. Please try again.");
        }
      } else {
        alert("Failed to add movie. Please try again.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', bgcolor: '#121212' }}>
      <Grid item xs={12} sm={5} md={8} lg={6}>
        <Paper elevation={5} style={{ padding: '50px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
          <Typography textAlign="center" variant="h4" gutterBottom sx={{ color: "#ffffff" }}>
            Add Movie to Watchlist
          </Typography>
          <Typography textAlign="left" variant="h7" gutterBottom sx={{ color: "#ffffff" }}>
            Please insert movie information:
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Movie Title"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                  InputProps={{ style: { color: '#ffffff' } }}
                  style={{ backgroundColor: '#333333' }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Genre"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={movieGenre}
                  onChange={(e) => setMovieGenre(e.target.value)}
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                  InputProps={{ style: { color: '#ffffff' } }}
                  style={{ backgroundColor: '#333333' }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Released Date"
                  variant="outlined"
                  margin="normal"
                  type="date"
                  fullWidth
                  value={movieReleasedDate}
                  onChange={(e) => setMovieReleasedDate(e.target.value)}
                  InputLabelProps={{ shrink: true, style: { color: '#ffffff' } }}
                  InputProps={{ style: { color: '#ffffff' } }}
                  style={{ backgroundColor: '#333333' }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Director"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={movieDirector}
                  onChange={(e) => setMovieDirector(e.target.value)}
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                  InputProps={{ style: { color: '#ffffff' } }}
                  style={{ backgroundColor: '#333333' }}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#ff1b1b', color: 'white', marginTop: '16px' }}
              fullWidth
            >
              Add to Watchlist
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}





