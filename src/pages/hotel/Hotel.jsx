import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useF from "../../Hooks/useF";
import { AuthContext } from "../../Context/Authcontext";
import Reserv from "../../components/Reservation/Reserv";
import { GlobalContext } from "../../Context/ReservationContext";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
const Hotel = () => {
  const [datess, setDatess] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const seletedvoitures = localStorage.getItem("selectedVoiture");
  const voiture = JSON.parse(seletedvoitures);
  const seletedmodels = localStorage.getItem("selectedmodeles");
  const modéle = JSON.parse(seletedmodels);
  const [searchcar, setsearchcar] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [dates, setDates] = useState(null); // State pour stocker les dates sélectionnées localement
  // Effet pour récupérer les dates depuis le stockage local lors du chargement du composant
  useEffect(() => {
    const storedDates = localStorage.getItem("selectedDates");
    if (storedDates) {
      setDates(JSON.parse(storedDates));
    }
  }, []);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, error, loading } = useF(`/hotels/find/${id}`);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days =
    dates && dates[0]?.endDate && dates[0]?.startDate
      ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))
      : 0;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleclick = () => {
    if (user) {
      setOpenmodal(true);
    } else {
      navigate("/login");
    }
  };

  const { data: datavoiture } = useF(`/hotels/room/${id}`);

  const foundCars = datavoiture.filter((voiture) => voiture.modéle === modéle);

  // Mise à jour de searchcar
  useEffect(() => {
    if (foundCars) {
      setsearchcar(foundCars);
    }
  }, [foundCars]);

  // Pour commande de voitures
  const reservationContext = useContext(GlobalContext);
  const { increaseReservationCount } = reservationContext;
  const { addReservationDetails } = useContext(GlobalContext);
  const getdateesinrange = (startdate, enddate) => {
    const start = new Date(startdate);
    const end = new Date(enddate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const alldates =
    datess && datess[0]
      ? getdateesinrange(datess[0].startDate, datess[0].endDate)
      : [];
  const handleclick2 = async () => {
    try {
      const formattedDates = alldates.map((date) =>
        new Date(date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );

      increaseReservationCount();
      // Ajouter les détails de la réservation au contexte
      addReservationDetails({
        id: voiture._id, // ou un autre identifiant unique
        modele: voiture.modéle, // Correction : "modèle" au lieu de "modéle"
        dates: formattedDates.join(" ,"),
        // Ajoutez d'autres détails que vous souhaitez afficher
      });

      const res = await axios.put(`/rooms/availabality/${voiture._id}`, {
        dates: alldates,
      });

      // Ajouter la gestion de la réponse de la requête axios.put si nécessaire

      const addOrders = async () => {
        try {
          const addorder = await axios.post(
            `/orders/neworder/${user._id}/${voiture._id}`,
            {
              unavailable: alldates,
              username: user.username,
              télephone: user.phone, // Correction : "téléphone" au lieu de "télephone"
              modéle: voiture.modéle, // Correction : "modele" au lieu de "modéle"
            }
          );

          // Ajouter la gestion de la réponse de la requête axios.post si nécessaire
          return addorder.data;
        } catch (error) {
          // Gestion des erreurs ici
          console.error("Une erreur s'est produite :", error);
        }
      };

      await addOrders(); // Correction : Utiliser "await" pour attendre que la fonction addOrders se termine

      navigate("/");
    } catch (err) {
      // Gestion des erreurs ici
      console.error("Une erreur s'est produite :", err);
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      {!modéle &&
        voiture && ( // If modéle is not available, use voiture
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  {voiture.photos && voiture.photos.length > 0 && (
                    <img
                      src={voiture.photos[slideNumber]}
                      alt=""
                      className="sliderImg"
                    />
                  )}
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{voiture.marque}</h1>
              <h1 className="hotelTitle">{voiture.modéle}</h1>
              <div className="rdesc">
                <h3>Année : {voiture.année}</h3>
                <h3>moteur : {voiture.moteur}</h3>
                <h3>description : {voiture.description}</h3>
              </div>
              <div className="rdesc">
                <h3>Couleur : {voiture.couleur}</h3>
              </div>
              <div className="rdesc">
                <h3>
                  Disponible :{" "}
                  {voiture.disponible
                    ? "La Voiture est  disponible "
                    : "La Voiture est actuelment indisponible"}
                </h3>
              </div>

              <span className="hotelPriceHighlight">
                Book a stay over {voiture.price} at this property and get a free
                airport taxi
              </span>
              <div className="hotelImages">
                {voiture.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Stay in the heart of City</h1>
                </div>
                <div className="hotelDetailsPrice">
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(datess[0].startDate, "MM/dd/yyyy")} to ${format(
                    datess[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>

                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDatess([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={datess}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

                  <button
                    className="bookNow"
                    onClick={handleclick2}
                    disabled={!voiture.disponible}
                    style={{
                      pointerEvents: voiture.disponible ? "auto" : "none",
                    }}
                  >
                    Commandez la {voiture.modéle}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      {!voiture &&
        modéle &&
        Array.isArray(searchcar) &&
        searchcar.map((searchcarr, index) => (
          <div key={index} className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  {searchcarr.photos && searchcarr.photos.length > 0 && (
                    <img
                      src={searchcarr.photos[slideNumber]}
                      alt=""
                      className="sliderImg"
                    />
                  )}
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{searchcarr.marque}</h1>
              <h1 className="hotelTitle">{searchcarr.modéle}</h1>
              <h1 className="hotelTitle">{searchcarr.moteur}</h1>
              <div className="rdesc">
                <h3>Année : {searchcarr.année}</h3>
                <h3>description : {searchcarr.description}</h3>

              </div>
              <div className="rdesc">
                <h3>Couleur : {searchcarr.couleur}</h3>
              </div>
              <div className="rdesc">
                <h3>
                  Disponible :{" "}
                  {searchcarr.disponible
                    ? "La Voiture est disponible"
                    : "La Voiture est actuellement indisponible"}
                </h3>
              </div>

              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">{data.distance}</span>
              <span className="hotelPriceHighlight">
                Book a stay over {searchcarr.price} at this property and get a
                free airport taxi
              </span>
              <div className="hotelImages">
                {searchcarr.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Stay in the heart of City</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days} days</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>{searchcarr.price * days}</b> ({days} nights)
                  </h2>
                  {searchcar && searchcar.length > 0 && (
                    <button className="bookNow" onClick={handleclick}>
                      Reserve or Book Now!
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      {!voiture &&
        !modéle && ( // If both voiture and modéle are not available, use hotel information
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  {data.photos && data.photos.length > 0 && (
                    <img
                      src={data.photos[slideNumber]}
                      alt=""
                      className="sliderImg"
                    />
                  )}
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <div className="rdesc">
                <h3>Nom de l'agence : {data.name}</h3>
              </div>
              <div className="rdesc">
                <h3>Ville : {data.city}</h3>
              </div>
              <div className="rdesc">
                <h3>Addresse : {data.address}</h3>
              </div>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">{data.distance}</span>
              <div className="hotelImages">
                {searchcar.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Stay in the heart of City</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days} days</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>({days} nights)</h2>
                  <button className="bookNow" onClick={handleclick}>
                    Reserve or Book Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      {openmodal && (
        <Reserv setopen={setOpenmodal} hotelid={id} searchcar={searchcar} />
      )}
      <Footer />
    </div>
  );
};

export default Hotel;
