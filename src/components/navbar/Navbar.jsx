import { AuthContext } from "../../Context/Authcontext";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleclick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Car Rent Application</span>
        </Link>
       <div className="us">
        {user ? (
          
          <div className="navItems"></div>
        ) : (
          <div className="navItems">
            <button className="btw">Register</button>
            
          </div>
        )}
         {user ? (
              <button className="btw" onClick={handleclick}>logout</button>
            ) : (
              <>
                <Link to="/login">
                  {" "}
                  <button className="btx" >login</button>
                </Link>
              </>
            )}
            </div>
      </div>
    </div>
  );
};

export default Navbar;
