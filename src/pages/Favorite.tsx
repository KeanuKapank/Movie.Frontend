import { useEffect, useState } from "react";
import "../css/Favorites.css";
import { GetAllFavoriteMovies, FavoriteMovie } from "../services/api";
import { IMovieCard } from "../Interfaces/IMovie";
import MovieCard from "../Components/MovieCard";
import "../css/Home.css";

const Favorite = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [favMovies, setFavMovies] = useState<IMovieCard[]>([]);
  const [fav, setFav] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavMovies = async () => {
      try {
        const result = await GetAllFavoriteMovies();
        setFavMovies(result);
        console.log("Fav Movies" + result);
      } catch (err) {
        setError("error fetching Fav Movies");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavMovies();
  }, [fav]);

  async function onFavClick(e: number) {
    try {
      const response = await FavoriteMovie(e);
      setFav(fav ? false : true);
      console.log("Movies : " + response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home">
      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <div className="movies-grid">
          {favMovies.length > 0 ? (
            favMovies.map((movie: IMovieCard) => {
              return (
                <MovieCard
                  movieID={movie.movieID}
                  key={movie.movieID}
                  url={movie.url}
                  title={movie.title}
                  info={movie.info}
                  releaseDate={movie.releaseDate}
                  isFavorite={movie.isFavorite}
                  favOnClick={() => {
                    onFavClick(movie.movieID);
                  }}
                />
              );
            })
          ) : (
            <div className="favorites-empty">
              <h2>No Favorite's movie yet</h2>
              <p>Add Favorite Movies and they will appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorite;
