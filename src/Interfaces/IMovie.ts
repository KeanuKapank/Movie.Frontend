export interface IMovieCard {
  title: string;
  releaseDate: Date;
  releaseDateInt: number;
  isFavorite: boolean;
  movieID: number;
  genreID: number;
  price: number;
  url: string;
  info: string;
  favOnClick: (movieID: number) => void;
  onMovieUpdate : () => void;
}