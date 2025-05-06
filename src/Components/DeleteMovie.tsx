import { useNavigate } from "react-router-dom";
import "../css/MovieCard.css";
import { DeleteMovieEndPoint } from "../services/api";

interface DeleteMovieProps {
  movieID: number;
}

const DeleteMovie = ({ movieID }: DeleteMovieProps) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      console.log("Yooo" + movieID);
      const response = await DeleteMovieEndPoint(movieID);

      if (response.success) {
        navigate(`/`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button className="btnDelete" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteMovie;
