import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Headerx from "../../components/headerx/Headerx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useF from "../../Hooks/useF";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Importez l'icône de fermeture
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { React, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = () => {
  localStorage.removeItem("selectedVoiture");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.ville);
  const [modéle, setmodéle] = useState(location.state.modéle);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [min, setmin] = useState(undefined);
  const [max, setmax] = useState(undefined);
  const { data, loading } = useF("/rooms");

  const {
    data: hotelData,
    error: hotelError,
    loading: hotelLoading,
    refetchdata: refetchHotelData,
  } = useF(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

  // Utilisez le deuxième hook de requête pour récupérer les données des modèles de chambres
  const {
    data: modelData,
    error: modelError,
    loading: modelLoading,
    refetchdata: refetchModelData,
  } = useF(`/hotels/searchByModel?model=${modéle}`);

  const {
    data: modelcitydata,
    error: modelcityerror,
    loading: modelcityloading,
    refetchdata: refetchmodelcity,
  } = useF(
    `/hotels/searchbymodelandcity?&model=${modéle}&destination=${destination}`
  );


  const searchBarRef = useRef(null);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleselect = (e) => {
    setmodéle(e.target.value);
  };
  useEffect(() => {
    const storedDates = localStorage.getItem("selectedDates");
    if (!storedDates || JSON.stringify(dates) !== storedDates) {
      localStorage.setItem("selectedDates", JSON.stringify(dates));
    }
  }, [dates]); // Update when 'dates' state changes

  return (
    <div>
      <Navbar />
      <Headerx />
      <div>
        {!showSearchBar && (
          <div className="searchiconx" onClick={toggleSearchBar}>
            <FontAwesomeIcon icon={faSearch} className="iconxx" />
          </div>
        )}
        <div className="searchBarWrapper">
          {showSearchBar && (
            <div ref={searchBarRef} className="searchBar">
              <div className="listSearch">
                <h1 className="lsTitle">Search</h1>
                <div className="lsItem">
                  <label>Destination</label>
                  <input
                    placeholder="Destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                <div className="lsItem">
                  <label>Modèle de voiture</label>
                  <div className="selecRooms">
                    <select
                      className="selct"
                      style={{ width: 130 }}
                      onChange={handleselect}
                    >
                      {loading
                        ? "loading .."
                        : data &&
                          Array.from(
                            new Set(data.map((room) => room.modéle))
                          ).map((model) => <option>{model}</option>)}
                    </select>
                  </div>
                </div>
                <div className="lsItem">
                  <label>Check-in Date</label>
                  <span onClick={() => setOpenDate(!openDate)}>
                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span>
                  {openDate && (
                    <div className="datePickerContainer">
                      <div className="datePicker">
                        <div
                          className="sicon"
                          onClick={() => setOpenDate(false)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <DateRange
                          onChange={(item) => setDates([item.selection])}
                          minDate={new Date()}
                          ranges={dates}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="searchIcon" onClick={toggleSearchBar}>
                <FontAwesomeIcon icon={faArrowLeft} className="iconx" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {hotelLoading || modelLoading ? (
              "Loading..."
            ) : (
              <>
                {destination && !modéle
                  ? hotelData.map((hotelItem) => (
                      <SearchItem item={hotelItem} key={hotelItem._id} />
                    ))
                  : modéle && !destination
                  ? modelData.map((modelItem) => (
                      <SearchItem item={modelItem} key={modelItem._id} />
                    ))
                  : modelcitydata.map((modelcityitem) => (
                      <SearchItem
                        item={modelcityitem}
                        key={modelcityitem._id}
                      />
                    ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
