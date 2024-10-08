import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: 'movie_title', headerName: 'Title', width: 250, editable: false },
  { field: 'movie_genre', headerName: 'Genre', width: 150, editable: false },
  { field: 'movie_releaseddate', headerName: 'Release Date', width: 150, type: 'date' },
  { field: 'movie_director', headerName: 'Director', width: 200, editable: false },
];


export default function DataGridDemo() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedMovieIds, setSelectedMovieIds] = useState([]); // Track selected rows
  const apiRef = useGridApiRef(); // Use apiRef to access DataGrid API

  // Fetch movies from the watchlist API
  const fetchWatchlistMovies = async () => {
    try {
      const response = await fetch('api/watchlist');
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
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWatchlistMovies();
  }, []);

    // Handle getting selected rows when a button is clicked
  const handleGetSelectedMovieIds = () => {
    const selectedRows = apiRef.current.getSelectedRows(); // Get selected rows
    const selectedMovieIds = Array.from(selectedRows.values()).map((row) => row.movie_id); // Extract movie_id
    console.log("Selected Movie IDs:", selectedMovieIds); // Log the movie IDs
  };

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
      fetchWatchlistMovies();
    } catch (error) {
      console.error("Error deleting movie(s):", error);
      alert("An error occurred while deleting movie(s). Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>; 

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{height: 900, backgroundColor: '#121212' }}>
      <Grid item xs={6} md={10} sx={{ justifyContent: "center", backgroundColor: '#121212', marginTop: 2 }}>
        <Typography variant="h3" gutterBottom style={{ color: '#ffffff' }}>
          Your Watchlist:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={10} sx={{ justifyContent: "center"}}>
        <Box sx={{ height: 600, width: '100%'}}>
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
            checkboxSelection
            apiRef={apiRef}
            disableRowSelectionOnClick
            // onSelectionModelChange={handleSelectionChange} // Handle row selection
            sx={{ backgroundColor: 'white' }}
          />
        </Box>
      </Grid>
      <Grid container direction="row" sx={{ justifyContent: "center", backgroundColor: '#121212' }}>
        <Button 
          variant="outlined" 
          href="/page1" 
          sx={{ color: 'white', mr: 2}} // Add right margin (mr) to add space between the buttons
        >
          Add watchlist
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#ff1b1b', color: 'white' }}
          startIcon={<DeleteIcon />}
          onClick={handleDeleteMovies} // Add onClick to delete movies
        >
          Remove from watchlist
        </Button>
      </Grid>

    </Grid>
  );
}





