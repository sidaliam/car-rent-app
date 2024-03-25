import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faHome,
  faHotel,
  faUser,
  faWarehouse,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../Context/Searchcontext";
import { AuthContext } from "../../Context/Authcontext";
import useF from "../../Hooks/useF";
import { Helmet } from "react-helmet";
import { GlobalContext } from "../../Context/ReservationContext";

const Header = ({ type }) => {
  const { reservationCount } = useContext(GlobalContext);

  const handleShopIconClick = () => {
  
    navigate("/reservation-details");

   
  };

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);


  const navigate = useNavigate();

  const handleSearch = () => {

      navigate("/hotels", { state: { modéle, ville, dates } });
      dispatch({
        type: "NEW_SEARCH",
        payload: { modéle, ville, dates },
      });

    localStorage.setItem("selectedDates", JSON.stringify(dates));
    localStorage.setItem("selectedmodeles", JSON.stringify(modéle));

  };

  const { dispatch } = useContext(SearchContext, AuthContext);
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useF("/rooms");
  const {
    data: hoteldata,
    loading: hoteloading,
    error: hotelerror,
  } = useF("/hotels");
  const [ville, setville] = useState("");
  const [modéle, setmodéle] = useState("");
  const handleselect = (e) => {
    setmodéle(e.target.value);
  };

  const handleselect2 = (e) => {
    setville(e.target.value);
  };

  return (
    <div className="header">
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
            <h1 className="headerTitle"></h1>
            <p className="headerDesc">
              <div class="profile">
                {/* Nom du profil */}
                {user ? user.username : <div className="navItems"></div>}
              </div>
              <div class="shop" onClick={handleShopIconClick}>
                {/* Icône du shop */}
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>{reservationCount}</span>
                {/* Afficher la liste des produits si showCart est vrai */}
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

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>

                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <select className="selct" onChange={handleselect2}>
                  <option value="ville">ville</option>{" "}
                  {/* Option statique "ville" */}
                  {loading
                    ? "loading .."
                    : data &&
                      Array.from(
                        new Set(hoteldata.map((hotel) => hotel.city))
                      ).map((model) => <option key={model}>{model}</option>)}
                </select>
              </div>

              <div className="headerSearchItem">
                <div className="selecRooms">
                  <select className="selct" onChange={handleselect}>
                    {loading ? (
                      "loading .."
                    ) : (
                      <>
                        <option value="voiture">Voiture</option>
                        {data &&
                          Array.from(
                            new Set(
                              data
                                .map((room) => room.modéle)
                                .filter((model) => model !== "voiture")
                            )
                          ).map((model) => (
                            <option key={model}>{model}</option>
                          ))}
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} /> {/* Icône de recherche */}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
