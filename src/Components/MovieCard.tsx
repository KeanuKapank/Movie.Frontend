import "../css/MovieCard.css";
import { IMovieCard } from "../Interfaces/IMovie";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  url,
  title,
  movieID,
  isFavorite,
  favOnClick,
}: IMovieCard) => {
  //const date = new Date(releaseDate);
  const navigate = useNavigate();
  return (
    <>
      <div className="movie-card" onClick={() => navigate(`/Movie/${movieID}`)}>
        <div className="movie-heading">
          <h1>{title}</h1>
        </div>
        <div className="movie-poster">
          <img src={url} alt={title} />
          <div className="movie-overlay">
            <button
              className="favorite-btn"
              onClick={(e) => {
                e.stopPropagation();
                favOnClick(movieID);
              }}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
