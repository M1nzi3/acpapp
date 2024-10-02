from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date
from database import *

router = APIRouter()

# Pydantic model for movie creation
class movieCreate(BaseModel):
    movie_title: str
    movie_genre: str
    movie_releaseddate: date
    movie_director: str 

# Pydantic model for movie update
class movieUpdate(BaseModel):
    movie_title: Optional[str]
    movie_genre: Optional[str]
    movie_releaseddate: Optional[date]
    movie_director: Optional[str]

# Pydantic model for movie response
class movie(BaseModel):
    movie_id: int
    movie_title: str
    movie_genre: str
    movie_releaseddate: date
    movie_director: str


# Endpoint to create a new movie
@router.post("/movie/hello", response_model=movie)
async def create_movie(movie: movieCreate):
    result = await insert_movie(movie.movie_title, movie.movie_genre, movie.movie_releaseddate, movie.movie_director)
    if result is None:
        raise HTTPException(status_code=400, detail="Error creating movie")
    return result

# Endpoint to get a movie by movie_id
@router.get("/movie/{movie_id}", response_model=movie)
async def read_movie(movie_id: int):
    result = await get_movie(movie_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return result

# Endpoint to update a movie
@router.put("/movie/{movie_id}", response_model=movie)
async def update_movie_endpoint(movie_id: int, movie: movieUpdate):
    # Retrieve the current movie details to ensure only the updated fields are changed
    current_movie = await get_movie(movie_id)
    if current_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    updated_movie_title = movie.movie_title if movie.movie_title is not None else current_movie["movie_title"]
    updated_movie_genre = movie.movie_genre if movie.movie_genre is not None else current_movie["movie_genre"]
    updated_movie_releaseddate = movie.movie_releaseddate if movie.movie_releaseddate is not None else current_movie["movie_releaseddate"]
    updated_movie_director = movie.movie_director if movie.movie_director is not None else current_movie["movie_director"]

    result = await update_movie(movie_id, updated_movie_title, updated_movie_genre, updated_movie_releaseddate, updated_movie_director)
    if result is None:
        raise HTTPException(status_code=404, detail="Error updating movie")
    return result

# Endpoint to delete a movie
@router.delete("/movie/{movie_id}")
async def delete_movie_endpoint(movie_id: int):
    result = await delete_movie(movie_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return {"detail": "Movie deleted"}


# --- New Endpoint to add movie to watchlist ---

# Pydantic model for adding a movie to the watchlist
class watchlistAdd(BaseModel):
    movie_id: int

# Endpoint to add a movie to the watchlist
@router.post("/watchlist/")
async def add_to_watchlist(watchlist: watchlistAdd):
    # Check if the movie exists before adding to watchlist
    movie = await get_movie(watchlist.movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    # Insert into the watchlist
    result = await insert_watchlist(watchlist.movie_id, date_added=date.today())
    if result is None:
        raise HTTPException(status_code=400, detail="Error adding movie to watchlist")
    
    return {"detail": "Movie added to watchlist", "watchlist_entry": result}



