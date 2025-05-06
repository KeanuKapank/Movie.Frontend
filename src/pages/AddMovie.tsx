import "../css/AddMovie.css";
import React, { useState, FormEvent } from "react";
import { IMovieCard } from "../Interfaces/IMovie";
import { AddMovieEndPoint } from "../services/api";
import SelectGenre from "../Components/SelectGenre";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<
    Omit<
      IMovieCard,
      "favOnClick" | "isFavorite" | "releaseDate" | "onMovieUpdate"
    >
  >({
    title: "",
    releaseDateInt: new Date().getFullYear(),
    movieID: 0,
    price: 0,
    url: "",
    info: "",
    genreID: 1,
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
        ? Number(value)
        : value;

    setInputs((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log(inputs);

    try {
      const postMovie = async () => {
        const result = await AddMovieEndPoint(inputs);

        console.log(result);
      };
      postMovie();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="homeForm">
        <h1>Add New Movie</h1>

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

          <label>Release Year:</label>
          <input
            type="number"
            name="releaseDateInt"
            value={inputs.releaseDateInt}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            step="10"
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

          <label>Genre :</label>
          <SelectGenre handleChange={handleChange} />

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMovie;
