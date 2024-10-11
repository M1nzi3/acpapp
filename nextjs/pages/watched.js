import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const columns = [
  { field: 'movie_title', headerName: 'Title', width: 250, editable: false },
  { field: 'movie_genre', headerName: 'Genre', width: 150, editable: false },
  { field: 'movie_releaseddate', headerName: 'Release Date', width: 150, type: 'date' },
  { field: 'movie_director', headerName: 'Director', width: 200, editable: false },
  { field: 'movie_watcheddate', headerName: 'Watched Date', width: 150, type: 'date'},
];

export default function DataGridDemo() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiRef = useGridApiRef(); // Use apiRef to access DataGrid API

  // Fetch movies from the watchlist API
  const fetchWatchedMovies = async () => {
    try {
      const response = await fetch('api/watched');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Convert string dates to actual Date objects
      setMovies(data.map(movie => ({
        id: movie.movie_id,
        movie_id: movie.movie_id,
        movie_title: movie.movie_title,
        movie_genre: movie.movie_genre,
        movie_releaseddate: new Date(movie.movie_releaseddate), // Convert to Date object
        movie_director: movie.movie_director,
        movie_watcheddate: new Date(movie.movie_watcheddate),
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  // Handle delete movies
  const handleDeleteMovies = async () => {
    const selectedRows = apiRef.current.getSelectedRows(); // Get selected rows
    const selectedMovieIds = Array.from(selectedRows.values()).map((row) => row.movie_id); // Extract movie_id
    const selectedMovieTitle = Array.from(selectedRows.values()).map((row) => row.movie_title);
    console.log("Selected Movie IDs:", selectedMovieIds, selectedMovieTitle); // Log the movie IDs

    const confirmed = window.confirm(`Are you sure you want to remove ${selectedMovieTitle} movie(s) from the watchlist?`);
    if (!confirmed) return;

    try {
      for (const movieId of selectedMovieIds) {
        const response = await fetch(`api/watchlist?movie_id=${movieId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete movie with ID: ${movieId}`);
        }
      }
      // Refetch the updated watchlist after deletion
      fetchWatchedMovies();
    } catch (error) {
      console.error("Error deleting movie(s):", error);
      alert("An error occurred while deleting movie(s). Please try again.");
    }
  };

  // Handle watched movies
  const handleWatchedMovies = async () => {
    const selectedRows = apiRef.current.getSelectedRows(); // Get selected rows
    const selectedMovieIds = Array.from(selectedRows.values()).map((row) => row.movie_id); // Extract movie_id
    const selectedMovieTitles = Array.from(selectedRows.values()).map((row) => row.movie_title);
    console.log("Selected Movie IDs:", selectedMovieIds, selectedMovieTitles); // Log the movie IDs
  
    const confirmed = window.confirm(`Are you sure you want to mark ${selectedMovieTitles.join(", ")} movie(s) as 'Watched' and remove them from your watchlist?`);
    if (!confirmed) return;
  
    try {
      for (const movieId of selectedMovieIds) {
        console.log("Processing Movie ID:", movieId);
        
        // Mark the movie as watched
        const response = await fetch(`http://localhost:3000/api/movie/watched`, { // Ensure the URL is correct
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movie_id: movieId }), // Send movie_id as JSON body
        });
  
        if (!response.ok) {
          throw new Error(`Failed to add movie with ID: ${movieId}`);
        }
  
        // Remove the movie from the watchlist after marking it as watched
        const deleteResponse = await fetch(`http://localhost:3000/api/watchlist?movie_id=${movieId}`, {
          method: 'DELETE',
        });
  
        if (!deleteResponse.ok) {
          throw new Error(`Failed to delete movie with ID: ${movieId}`);
        }
      }
  
      // Refetch the updated watchlist after marking as watched and deleting
      fetchWatchedMovies();
    } catch (error) {
      console.error("Error processing movie(s):", error);
      alert("An error occurred while processing movie(s). Please try again.");
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Grid container justifyContent="center" sx={{ height: 750, backgroundColor: '#121212' }}>
      <Grid item xs={6} md={10} sx={{height: 100, justifyContent: "center", backgroundColor: '#121212F', mt: 3}}>
        <Typography variant="h3" gutterBottom style={{ color: '#ffffff' }}>
          Marked as Watched:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={10} sx={{ justifyContent: "center"}}>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={movies}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: movies.length, // Set pageSize to the number of rows to display all in one page
                },
              },
            }}
            pageSizeOptions={[movies.length]} // Add an option for the total number of rows
            // checkboxSelection
            apiRef={apiRef}
            disableRowSelectionOnClick
            sx={{ backgroundColor: 'white' }}
          />
        </Box>
      </Grid>
      <Grid container direction="row" sx={{ justifyContent: "center", backgroundColor: '#121212', height: 50 }}>
        <Button
          variant="outlined"
          href="/page2"
          sx={{ color: 'white', mr: 2 }} // Add right margin (mr) to add space between the buttons
        >
          Add watched movie or rate movie
        </Button>
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: '#ff1b1b', color: 'white' , mr:2}}
          startIcon={<DeleteIcon />}
          onClick={handleDeleteMovies} // Add onClick to delete movies
        >
          Remove from watchlist
        </Button> */}
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: '#ff1b1b', color: 'white'}}
          startIcon={<DeleteIcon />}
          onClick={handleWatchedMovies} // Add onClick to mark movies as watched
        >
          Rate this movie
        </Button> */}
      </Grid>
    </Grid>
  );
}





