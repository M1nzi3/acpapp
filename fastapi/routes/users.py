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
    # date_watched: Optional[date]

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

# Endpoint to create a new movie and add movie to watchlist
@router.post("/movie/hello")
async def create_movie(movie: movieCreate):
    result = await insert_movie(
        movie.movie_title, 
        movie.movie_genre, 
        movie.movie_releaseddate, 
        movie.movie_director
    )
    
    if result is None:
        raise HTTPException(status_code=400, detail="Error creating movie")
    
    # Adding the movie to the watchlist
    watchlist_result = await insert_watchlist(result[0])  # Assuming result[0] is movie_id
    if watchlist_result is None:
        raise HTTPException(status_code=400, detail="Error adding movie to watchlist")

    return {"movie": result, "watchlist_entry": watchlist_result}


# # Insert the movie and then add it to the watched table with date_watched
# @router.post("/movie/watched")
# async def create_movie_watched(movie: movieCreate):
#     # Step 1: Insert the movie into the movie table
#     result = await insert_movie(
#         movie.movie_title,
#         movie.movie_genre,
#         movie.movie_releaseddate,
#         movie.movie_director
#     )
#     if result is None:
#         raise HTTPException(status_code=400, detail="Error creating movie")

#     # Step 2: Insert the movie into the watched table with date_watched
#     if movie.date_watched:
#         watched_result = await insert_watchedMovie(result[0], movie.date_watched)  # result[0] is movie_id
#         if watched_result is None:
#             raise HTTPException(status_code=400, detail="Error adding movie to watched list")
#     else:
#         raise HTTPException(status_code=400, detail="Watched date is required")

#     return {"movie": result, "watched_entry": watched_result}

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

class watchlist(BaseModel):
    watchlist_id: int
    movie_id: int
    date_added: date



