// import React, { useState, useEffect } from "react";
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import DeleteIcon from '@mui/icons-material/Delete';

// // Define the columns for the DataGrid
// const columns = [
//   { field: 'movie_id', headerName: 'Movie ID', width: 120 },
//   { field: 'movie_title', headerName: 'Title', width: 250, editable: false },
//   { field: 'movie_genre', headerName: 'Genre', width: 150, editable: false },
//   {
//     field: 'movie_releaseddate',
//     headerName: 'Release Date',
//     width: 150,
//     type: 'date',
//     valueGetter: (params) => {
//       const dateValue = new Date(params.value);
//       return isNaN(dateValue) ? null : dateValue; // Return null if invalid date
//     },
//   },
//   { field: 'movie_director', headerName: 'Director', width: 200, editable: false },
// ];

// export default function DataGridDemo() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Form data state
//   const [formData, setFormData] = useState({
//     movie_title: '',
//     movie_genre: '',
//     movie_releaseddate: '',
//     movie_director: '',
//   });

//   // Fetch movies from the watchlist API
//   const fetchWatchlistMovies = async () => {
//     try {
//       const response = await fetch('api/watchlist'); // Update the URL as necessary
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json(); // Parse JSON response
      
//       // Set movies with the response data
//       setMovies(data.map(movie => ({
//         id: movie.movie_id, // Assuming movie_id corresponds to the unique ID in DataGrid
//         movie_id: movie.movie_id,
//         movie_title: movie.movie_title,
//         movie_genre: movie.movie_genre,
//         movie_releaseddate: movie.movie_releaseddate, // Ensure this is a string representation of a date
//         movie_director: movie.movie_director,
//       })));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWatchlistMovies();
//   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleAddMovie = () => {
// //     // Logic to add movie to the watchlist goes here
// //     console.log(formData);
// //   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <Grid container sx={{justifyContent: "center", backgroundColor: '#121212'}}>
//         <Grid item xs={6} md={10} sx={{justifyContent: "center", backgroundColor: '#121212', marginTop: 3}}>
//         <Typography variant="h3" gutterBottom style={{ color: '#ffffff' }}>
//             Your Watchlist:
//         </Typography>
//         </Grid>
//         <Grid item xs={12} sm={10} sx={{justifyContent: "center"}}>
//       <Box sx={{ height: 500, width: '100%', marginTop: 2}}>
//         <DataGrid
//           rows={movies}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: {
//                 pageSize: movies.length, // Set pageSize to the number of rows to display all in one page
//               },
//             },
//           }}
//           pageSizeOptions={[movies.length]} // Add an option for the total number of rows
//           checkboxSelection
//           disableRowSelectionOnClick
//           sx={{backgroundColor: 'white', }}
//         />
//       </Box>
//       </Grid>
//       <Grid item xs={6} md={4} sx={{justifyContent: "center", backgroundColor: '#121212', marginTop: 3}}>
//       <Button
//               // type="submit"
//               variant="contained"
//               style={{ backgroundColor: '#ff1b1b', color: 'white', marginTop: '16px' }}
//               fullWidth
//               startIcon={<DeleteIcon />}
//             >
//               Remove from watchlist
//             </Button>
//       </Grid>
//       </Grid>
//   );
// }

import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

// Define the columns for the DataGrid
const columns = [
  { field: 'movie_id', headerName: 'Movie ID', width: 120 },
  { field: 'movie_title', headerName: 'Title', width: 250, editable: false },
  { field: 'movie_genre', headerName: 'Genre', width: 150, editable: false },
  {
    field: 'movie_releaseddate',
    headerName: 'Release Date',
    width: 150,
    type: 'date',
    valueGetter: (params) => {
      const dateValue = new Date(params.value);
      return isNaN(dateValue) ? null : dateValue; // Return null if invalid date
    },
  },
  { field: 'movie_director', headerName: 'Director', width: 200, editable: false },
];

export default function DataGridDemo() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieIds, setSelectedMovieIds] = useState([]); // Track selected movie IDs

  // Fetch movies from the watchlist API
  const fetchWatchlistMovies = async () => {
    try {
      const response = await fetch('api/watchlist'); // Update the URL as necessary
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse JSON response

      // Set movies with the response data
      setMovies(data.map(movie => ({
        id: movie.movie_id, // Ensure that 'id' is the movie_id
        movie_id: movie.movie_id,
        movie_title: movie.movie_title,
        movie_genre: movie.movie_genre,
        movie_releaseddate: movie.movie_releaseddate, // Ensure this is a string representation of a date
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

  // Handle selection of rows
  const handleSelectionChange = (newSelectionModel) => {
    setSelectedMovieIds(newSelectionModel); // Set the selected rows (which are movie IDs)
  };

  // Handle delete request
  const handleDeleteMovies = async () => {
    if (selectedMovieIds.length === 0) {
      alert("Please select at least one movie to delete.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to remove the selected movie(s) from the watchlist?");
    if (!confirmDelete) return;

    try {
      for (const movieId of selectedMovieIds) {
        const response = await fetch(`api/watchlist?movie_id=${movieId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete movie with ID: ' + movieId);
        }
      }

      // Update movies state by removing the deleted movies from the list
      setMovies((prevMovies) => prevMovies.filter(movie => !selectedMovieIds.includes(movie.movie_id)));
      setSelectedMovieIds([]); // Clear selection after deletion
    } catch (err) {
      alert('Error deleting movies: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Grid container sx={{height: 800, justifyContent: "center", backgroundColor: '#121212' }}>
      <Grid item xs={6} md={10} sx={{height: 50, justifyContent: "center", backgroundColor: '#121212', marginTop: 2 }}>
        <Typography variant="h3" gutterBottom style={{ color: '#ffffff' }}>
          Your Watchlist:
        </Typography>
      </Grid>
      <Grid item xs={6} sm={10} sx={{ justifyContent: "center", alignItems: "flex-start" }}>
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
            checkboxSelection
            disableRowSelectionOnClick
            onSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
            sx={{ backgroundColor: 'white' }}
          />
        </Box>
      </Grid>
      <Grid item xs={6} md={4} sx={{ justifyContent: "center", backgroundColor: '#121212', marginTop: 3 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#ff1b1b', color: 'white', marginTop: 1 }}
          fullWidth
          startIcon={<DeleteIcon />}
          onClick={handleDeleteMovies} // Handle button click
        >
          Remove from watchlist
        </Button>
      </Grid>
    </Grid>
  );
}
