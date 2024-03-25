// ReservationDetailsPage.js
import React, { useContext } from "react";
import "./ReservationDetailsPage.css"; // Importez le fichier CSS
import { GlobalContext } from "../../Context/ReservationContext";

const ReservationDetailsPage = () => {
  const { reservationDetails, removeReservationDetails } =
    useContext(GlobalContext);
  const { decreaseReservationCount } = useContext(GlobalContext);
  const handleCancelReservation = (id) => {
    // Assurez-vous que removeReservationDetails est défini
    if (removeReservationDetails) {
      decreaseReservationCount();
      removeReservationDetails(id);
    } else {
      console.error("removeReservationDetails is not defined");
    }
  };
  console.log(reservationDetails); // Placer le console.log ici pour vérifier les données de photos

  return (
    <div>
      <h1>Details des Reservations</h1>
      <ul>
        {reservationDetails.map((details, index) => (
          <li key={index}>
            <p>model : {details.modele}</p>
            <p>dates : {details.dates}</p>
            <p>photos :</p>
            <div className="hotelImages">
              {details.photos?.map((photoArray, i) => (
                <div className="hotelImgWrapper" key={i}>
                  {photoArray.map((photo, j) => (
                    <img
                      key={j}
                      src={photo ? photo : "placeholder.jpg"}
                      alt=""
                      className="hotelImg"
                      style={{ width: "200px", height: "150px" }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <button onClick={() => handleCancelReservation(details.id)}>
              Annuler
            </button>

            {/* Ajoutez d'autres détails que vous souhaitez afficher */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationDetailsPage;
