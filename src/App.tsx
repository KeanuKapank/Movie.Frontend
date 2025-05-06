import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import { NavBar } from "./Components/NavBar";
import AddMovie from "./pages/AddMovie";
import Movie from "./pages/Movie";

const App = () => {
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorite />}></Route>
          <Route path="/AddMovie" element={<AddMovie />}></Route>
          <Route path="/Movie/:movieID" element={<Movie />}></Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
