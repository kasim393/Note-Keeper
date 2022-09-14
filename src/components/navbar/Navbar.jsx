import "./navbar.css";
import logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-title">Note Keeper</div>
    </div>
  );
};

export default Navbar;
