import "../css/Navbar.css";
import { Link } from "react-router-dom";
import icon from "../assets/image.png";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-links">
          <Link to="/">
            <img src={icon} alt="Icon" className="icon-img" />
          </Link>
          <div>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
            <Link to="/AddMovie" className="nav-link">
              Add Movie
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
