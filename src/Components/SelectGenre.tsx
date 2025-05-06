import React, { useEffect, useState } from "react";
import { IGenre } from "../Interfaces/IGenre";
import { GetGenres } from "../services/api";

interface SelectGenreProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectGenre = ({ handleChange }: SelectGenreProps) => {
  const [genreOptions, setGenreOptions] = useState<IGenre[]>([]);

  useEffect(() => {
    const GetGenresFromApi = async () => {
      try {
        const results = await GetGenres();
        setGenreOptions(results);
      } catch (err) {
        console.log(err);
      }
    };

    GetGenresFromApi();
  }, []);
  return (
    <div className="genreSelect">
      <select
        name="genreID"
        className="input-field"
        required
        onChange={handleChange}
      >
        {genreOptions.map((genre) => (
          <option key={genre.genreID} value={genre.genreID}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGenre;
