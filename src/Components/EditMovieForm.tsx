import React, { useState, FormEvent } from "react";
import { IMovieCard } from "../Interfaces/IMovie";
import { EditMovieEndPoint } from "../services/api";

const EditMovieForm = ({
  url,
  title,
  info,
  price,
  movieID,
  onMovieUpdate,
}: Omit<
  IMovieCard,
  "favOnClick" | "isFavorite" | "releaseDate" | "releaseDateInt" | "genreID"
>) => {
  const [inputs, setInputs] = useState<
    Omit<
      IMovieCard,
      | "favOnClick"
      | "isFavorite"
      | "releaseDate"
      | "releaseDateInt"
      | "genreID"
      | "onMovieUpdate"
    >
  >({
    title: title,
    movieID: movieID,
    price: price,
    url: url,
    info: info,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : name === "price"
        ? Number(value)
        : name === "releaseDateInt"
        ? new Date(`${value}-01-01`)
        : value;

    setInputs((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Edit btn clicked");
    const EditMovie = async () => {
      const result = await EditMovieEndPoint(inputs);
      setInputs(result);
      onMovieUpdate();
    };
    try {
      EditMovie();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="homeForm">
        <h1>Edit Movie</h1>

        <form className="movie-form" onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label>Info:</label>
          <textarea
            name="info"
            value={inputs.info}
            onChange={handleChange}
            className="input-field"
            required
          ></textarea>

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            step="0.01"
            className="input-field"
            required
          />

          <label>Image URL:</label>
          <input
            type="text"
            name="url"
            value={inputs.url}
            onChange={handleChange}
            className="input-field"
            required
          />

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditMovieForm;
