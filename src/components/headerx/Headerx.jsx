import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,faHome,faHotel,faUser,faWarehouse,faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./headerx.css";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../Context/Searchcontext";
import { AuthContext } from "../../Context/Authcontext";
import useF from "../../Hooks/useF";
import { Helmet } from 'react-helmet';
import { GlobalContext } from "../../Context/ReservationContext";



const Header = ({ type }) => {

  const { reservationCount } = useContext(GlobalContext);

  
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    
      if (destination && !modéle) {
        // Recherche en fonction de la destination uniquement
        navigate("/hotels", { state: { destination, dates,options } });
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates,options } });
      } else if (modéle && !destination) {
        // Recherche en fonction du modéle uniquement
        navigate("/hotels", { state: { modéle, dates,options } });
        dispatch({ type: "NEW_SEARCH", payload: { modéle, dates,options } });
      } else {
        navigate("/hotels", { state: { modéle,destination, dates,options } });
        dispatch({ type: "NEW_SEARCH", payload: { modéle,destination, dates, options } });
      }
    };
  
  const { dispatch } = useContext(SearchContext, AuthContext);
  const { user } = useContext(AuthContext);
  const handleclick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };
  const { data, loading, error } = useF("/rooms");

  const [modéle, setmodéle] = useState("");
  const handleselect = (e) => {
    setmodéle(e.target.value);
  };

  return (
    <div className="headerx">
      <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      {/* ... Autres éléments de votre composant ... */}
    </div>
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              
            </h1>
            <p className="headerDesc">
            <div class="profile">
    {/* Nom du profil */}
    {user ? (
          
          user.username
        ) : (
          <div className="navItems">
           
            
          </div>
        )}
  </div>
  <div class="shop">
    {/* Icône du shop */}
    <FontAwesomeIcon icon={faShoppingCart} />
        <span>{reservationCount}</span>
  </div>

<div class="icon-slider">
  <div class="icon-container">
    <FontAwesomeIcon icon={faCar} className="icon" />
  </div>
  <div class="icon-container">
    <FontAwesomeIcon icon={faHome} className="icon" />
  </div>
  <div class="icon-container">
    <FontAwesomeIcon icon={faHotel} className="icon" />
  </div>
  <div class="icon-container">
    <FontAwesomeIcon icon={faUser} className="icon" />
  </div>
  <div class="icon-container">
    <FontAwesomeIcon icon={faWarehouse} className="icon" />
  </div>
</div>
            </p>
            




             
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
