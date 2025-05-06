import { useParams } from "react-router";

import { useEffect, useState } from "react";
import { IMovieCard } from "../Interfaces/IMovie";
import { FavoriteMovie, GetGenreByID, GetMovieByID } from "../services/api";
import MovieCard from "../Components/MovieCard";
import EditMovieForm from "../Components/EditMovieForm";
import { IGenre } from "../Interfaces/IGenre";
import DeleteMovie from "../Components/DeleteMovie";

const Movie = () => {
  const { movieID } = useParams<string>();
  const [updated, setUpdated] = useState<boolean>();
  const [movie, setMovie] = useState<IMovieCard>({
    title: "Not Found",
    url: "www.notfound.com",
    info: "not found info",
    releaseDate: new Date(),
    movieID: 0,
    isFavorite: false,
    releaseDateInt: 0,
    price: 0,
    genreID: 0,
    favOnClick: () => {
      throw new Error("Not found");
    },
    onMovieUpdate: () => {},
  });

  const [genre, setGenre] = useState<IGenre>({
    genreID: 0,
    name: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [fav, setFav] = useState<boolean>(false);

  const handleMovieUpdated = () => {
    setUpdated((prev) => !prev); // Toggle to trigger useEffect
  };

  useEffect(() => {
    const GetMovie = async () => {
      const result: IMovieCard = await GetMovieByID(Number(movieID));
      console.log("Yoooo", result);
      setMovie(result);

      console.log();
      const genreResult: IGenre = await GetGenreByID(Number(result.genreID));
      setGenre(genreResult);

      setLoading(false);
    };

    GetMovie();
  }, [updated]);

  async function onFavClick(e: number) {
    try {
      const response = await FavoriteMovie(e);
      setFav(fav ? false : true);
      console.log("Favorite Movie Clicked : ", response);
      setMovie(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="MovieById">
      {loading ? (
        <h1>Loading Movie</h1>
      ) : (
        <>
          <div className="MovieContainer">
            <DeleteMovie movieID={movie.movieID} />
            <div className="MovieInfo">
              <MovieCard
                title={movie.title}
                isFavorite={movie.isFavorite}
                movieID={movie.movieID}
                url={movie.url}
                favOnClick={() => {
                  onFavClick(movie.movieID);
                }}
              ></MovieCard>
              <div className="movie-info">
                <h3>{movie.info}</h3>
                <p>{movie.releaseDate.toString()}</p>
              </div>
              <div className="additional-info">
                <p>R{movie.price}</p>
                <p>{genre.name}</p>
              </div>
            </div>
          </div>
          <EditMovieForm
            title={movie.title}
            movieID={movie.movieID}
            price={movie.price}
            url={movie.url}
            info={movie.info}
            onMovieUpdate={handleMovieUpdated}
          />
        </>
      )}
    </div>
  );
};

export default Movie;
