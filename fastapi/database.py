from databases import Database
from datetime import date

POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "advcompro"
POSTGRES_HOST = "db"

DATABASE_URL = f'postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'

# Create a Database object
database = Database(DATABASE_URL)

# Function to connect to the database
async def connect_db():
    await database.connect()
    print("Database connected")

# Function to disconnect from the database
async def disconnect_db():
    await database.disconnect()
    print("Database disconnected")

# Function to insert a new movie into the movie table
async def insert_movie(movie_title: str, movie_genre: str, movie_releaseddate: date, movie_director: str):
    query = """
    INSERT INTO movie (movie_title, movie_genre, movie_releaseddate, movie_director)
    VALUES (:movie_title, :movie_genre, :movie_releaseddate, :movie_director)
    RETURNING movie_id, movie_title, movie_genre, movie_releaseddate, movie_director
    """
    values = {
        "movie_title": movie_title, 
        "movie_genre": movie_genre, 
        "movie_releaseddate": movie_releaseddate,  # date object
        "movie_director": movie_director
    }
    return await database.fetch_one(query=query, values=values)

# Function to get a movie by movie_id from the movie table
async def get_movie(movie_id: int):
    query = "SELECT * FROM movie WHERE movie_id = :movie_id"
    return await database.fetch_one(query=query, values={"movie_id": movie_id})

# Function to update a movie in the movie table
async def update_movie(movie_id: int, movie_title: str, movie_genre: str, movie_releaseddate: date, movie_director: str):
    query = """
    UPDATE movie 
    SET movie_title = :movie_title, movie_genre = :movie_genre, movie_releaseddate = :movie_releaseddate, movie_director = :movie_director
    WHERE movie_id = :movie_id
    RETURNING movie_id, movie_title, movie_genre, movie_releaseddate, movie_director
    """
    values = {
        "movie_id": movie_id, 
        "movie_title": movie_title, 
        "movie_genre": movie_genre, 
        "movie_releaseddate": movie_releaseddate,  # date object
        "movie_director": movie_director
    }
    return await database.fetch_one(query=query, values=values)

# Function to delete a movie from the movie table
async def delete_movie(movie_id: int):
    query = "DELETE FROM movie WHERE movie_id = :movie_id RETURNING *"
    return await database.fetch_one(query=query, values={"movie_id": movie_id})

# Function to select a movie by title from the movie table
async def get_movie_by_title(movie_title: str):
    query = "SELECT * FROM movie WHERE movie_title = :movie_title"
    return await database.fetch_one(query=query, values={"movie_title": movie_title})

async def insert_watchlist(movie_id: int):
    query = """
    INSERT INTO watchlist (movie_id)
    VALUES (:movie_id)
    RETURNING watchlist_id, movie_id, date_added
    """
    values = {
        "movie_id": movie_id
    }
    return await database.fetch_one(query=query, values=values)

# Function to get movieID from watchlist
async def get_all_movies_from_watchlist():
    query = "select movie_id from watchlist w"
    return await database.fetch_all(query=query)

# Function to delete a movie from the watchlist
async def delete_watchlist(movie_id: int):
    query = "DELETE FROM watchlist WHERE movie_id = :movie_id RETURNING *"
    return await database.fetch_one(query=query, values={"movie_id": movie_id})

#Function to insert watchedMovie by id
async def insert_watchedMovie(movie_id: int, dateWatched: date):
    query = """
    INSERT INTO watched (movie_id, dateWatched)
    VALUES (:movie_id, :dateWatched)
    RETURNING watched_id, movie_id, dateWatched
    """
    values = {
        "movie_id": movie_id,
        "dateWatched": dateWatched
    }
    return await database.fetch_one(query=query, values=values)


# # Function to get movieID from watched
# async def get_all_movies_from_watched():
#     query = "select movie_id from watched w"
#     return await database.fetch_all(query=query)

# Function to get movie_id and date_watched from watched
async def get_all_movies_from_watched():
    query = "SELECT movie_id, datewatched FROM watched"
    return await database.fetch_all(query=query)

#Function to insert rating
async def insert_rating(movie_id: int, rating: int, favorite: bool, review: str):
    query = """
    INSERT INTO rating (movie_id, rating, favorite, review)
    VALUES (:movie_id, :rating, :favorite, :review)
    RETURNING rating_id, movie_id, rating, favorite, review
            """
    values = {
        "movie_id": movie_id,
        "rating": rating,
        "favorite": favorite,
        "review": review
    }
    return await database.fetch_one(query=query, values=values)

async def get_favorite():
    query = """
    SELECT COUNT(*) AS favorite_movie_count
    FROM rating
    WHERE favorite = TRUE;
    """
    return await database.fetch_one(query=query)

async def get_rate():
    query = """
    SELECT rating, COUNT(*) AS rating_count
    FROM rating
    WHERE rating BETWEEN 1 AND 5
    GROUP BY rating
    ORDER BY rating;
    """
    return await database.fetch_all(query=query)



