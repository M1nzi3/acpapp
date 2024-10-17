import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import CircularProgress from '@mui/material/CircularProgress';
// import { BarChart,XAxis,Bar, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from '@mui/x-charts/BarChart';
import { CartesianGrid, BarChart, XAxis, YAxis, Tooltip, Legend } from '@mui/x-charts';

const Dashboard = () => {
  const [watchlistCount, setWatchlistCount] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [watchedCount, setWatchedCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavoriteCount = async () => {
    try {
      const response = await fetch('/api/favorite');
      const data = await response.json();
      setFavoriteCount(data.favorite_movie_count);
    } catch (error) {
      setError("Failed to fetch favorite count");
    }
  };

  const fetchWatchlistCount = async () => {
    try {
      const response = await fetch('/api/watchlist/count');
      if (!response.ok) {
        throw new Error('Failed to fetch watchlist count');
      }
      const count = await response.json();
      setWatchlistCount(count);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchWatchedCount = async () => {
    try {
      const response = await fetch('/api/watched/count');
      if (!response.ok) {
        throw new Error('Failed to fetch watched count');
      }
      const count = await response.json();
      setWatchedCount(count);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchRatingData = async () => {
    try {
      const response = await fetch('/api/ratings');
      if (!response.ok) {
        throw new Error('Failed to fetch rating data');
      }
      const data = await response.json();
  
      // Transform the data into the desired format [{x: 1, y: 32}, {x: 2, y: 41}, ...]
      const chartData = Object.keys(data).map(rating => ({
        x: parseInt(rating),  // 'rating' is the key, parsed as an integer
        y: data[rating],      // 'rating_count' is the value
      }));
      
      console.log(chartData);  // Debugging to check the format
      setRatingData(chartData);
    } catch (error) {
      setError("Failed to fetch rating data");
    }
  };
  

  useEffect(() => {
    // Fetching data sequentially and waiting for all data
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchWatchlistCount(), fetchWatchedCount(), fetchFavoriteCount(), fetchRatingData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  const nonFavoriteCount = watchedCount - favoriteCount;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: `url('/MovieBackground.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff",
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ minHeight: '104vh', bgcolor: 'rgba(18, 18, 18, 0.5)' }}>
        
        {/* Watchlist Count */}
        <Grid item xs={3} mt={4}>
          <Paper
            elevation={5}
            style={{
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f2ee',
              color: '#ffffff',
              padding: '20px',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ color: '#2c3e50' }}>
              Total Movies in Watchlist
            </Typography>
            <Typography variant="h3" component="div" style={{ color: '#c0392b' }}>
              {watchlistCount}
            </Typography>
          </Paper>
        </Grid>

        {/* Watched Count */}
        <Grid item xs={3} mt={4}>
          <Paper
            elevation={5}
            style={{
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f2ee',
              color: '#ffffff',
              padding: '20px',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ color: '	#2c3e50' }}>
              Total Watched Movies
            </Typography>
            <Typography variant="h3" component="div" style={{ color: '#c0392b' }}>
              {watchedCount}
            </Typography>
          </Paper>
        </Grid>

        {/* Favorite Movies Pie Chart */}
        <Grid item xs={4} mt={4}>
          <Paper
            elevation={5}
            style={{
              height: 200,
              backgroundColor: '#f5f2ee',
              color: '#ffffff',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ color: '	#2c3e50' }}>
              Your Favorite Movies
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: favoriteCount,
                        label: 'Favorite', 
                        color: '#c0392b',
                      },
                      {
                        id: 1,
                        value: nonFavoriteCount,
                        label: 'Non Favorite', 
                        color: '#bdc3c7',
                      },
                    ],
                    showLabels: true,  // Show labels
                    labelStyle: { fill: '#ffffff' },  // White text for labels
                  },
                ]}
                width={400}
                height={150}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Rating Distribution Bar Chart */}
        <Grid item xs={10} mb={4}>
  <Paper elevation={5} style={{ height: 400, padding: '20px', backgroundColor: '#f5f2ee', color: '#ffffff' }}>
    <Typography variant="h6" gutterBottom style={{ color: '	#2c3e50' }}>
      Movies Rating Distribution
    </Typography>
    
    {/* Adjusted BarChart */}
    {/* <ResponsiveContainer width="100%" height={300}> */}
    <BarChart
    xAxis={[{scaleType: 'band', data: ratingData.map(item => `rating ${item.x}`) }]}
    series={[{
    label: 'Movies',
    data: ratingData.map(item => item.y),
    color: '#c0392b', // Set bar color to #c0392b
    }]}
    width={500}
    height={400}
    >
    </BarChart>

    {/* </ResponsiveContainer> */}

  </Paper>
</Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;

