import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";

import {
  GetMovies,
  FavoriteMovie,
  GetMoviesByGenreEndPoint,
  GetMoviesByPriceRange,
} from "../services/api";
import SelectGenre from "../Components/SelectGenre";
import PriceSlider from "../Components/PriceSlider";
import PaginationCom from "../Components/Pagination";

export interface MovieProps {
  title: string;
  releaseDate: Date;
  isFavorite: boolean;
  movieID: number;
  price: number;
  url: string;
  info: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fav, setFav] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<number[]>([10, 60]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);
  const minDistance = 1;

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    setSize(6);
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const allMovies = await GetMovies(currentPage, size, searchQuery);
        console.log("Movies : " + allMovies);
        setMovies(allMovies);
      } catch (err) {
        console.log(error + err);
        setError("Failed to load Movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [loading, error, reset, currentPage, size]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const allMovies = await GetMovies(currentPage, size, searchQuery);
        console.log("Movies : " + allMovies);
        setMovies(allMovies);
      } catch (err) {
        console.log(error + err);
        setError("Failed to load Movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery]);

  async function onFavClick(e: number) {
    try {
      const response = await FavoriteMovie(e);
      setFav(fav ? false : true);
      console.log("Favorite Movie Clicked : ", response);

      const updatedMovies: MovieProps[] = movies.map((m) =>
        m.movieID === response.movieID ? response : m
      );

      setMovies(updatedMovies);
    } catch (err) {
      console.log(err);
    }
  }

  const HandleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setReset((reset) => !reset);
    setSearchQuery("");
  };

  const handleChangeSlider = (
    event: Event,
    newValue: number[],
    activeThumb: number
  ) => {
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }

    try {
      const LoadMoviesByPriceRange = async () => {
        try {
          const allMovies = await GetMoviesByPriceRange(
            newValue[0],
            newValue[1]
          );

          setMovies(allMovies);
        } catch (err) {
          console.log(error + err);
          setError("Failed to load Movies");
        } finally {
          setLoading(false);
        }
      };

      LoadMoviesByPriceRange();
    } catch (err) {
      console.log(err);
    }

    //setMovies(movies.filter((m) => m.price >= value[0] && m.price <= value[1]));

    console.log("Min", newValue[0]);
    console.log("Max", newValue[1]);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreID: number = Number(e.target.value);
    try {
      const loadMoviesByGenre = async () => {
        try {
          const allMovies = await GetMoviesByGenreEndPoint(genreID);
          console.log("Movies : " + allMovies);
          setMovies(allMovies);
        } catch (err) {
          console.log(error + err);
          setError("Failed to load Movies");
        } finally {
          setLoading(false);
        }
      };

      loadMoviesByGenre();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div className="search_container">
        <form action="" onSubmit={HandleSearch} className="search-form">
          <SelectGenre handleChange={handleSelectChange}></SelectGenre>
          <input
            type="text"
            placeholder="Search For Movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <PriceSlider handleChange={handleChangeSlider} value={value} />
          <button type="submit" className="search-button">
            Reset
          </button>
        </form>
      </div>
      <PaginationCom handleChangeEvent={handlePaginationChange} />
      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie: MovieProps) => {
            // Make sure to return the MovieCard component

            return (
              movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                <MovieCard
                  movieID={movie.movieID}
                  key={movie.movieID}
                  url={movie.url}
                  title={movie.title}
                  isFavorite={movie.isFavorite}
                  favOnClick={() => {
                    onFavClick(movie.movieID);
                  }}
                />
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
