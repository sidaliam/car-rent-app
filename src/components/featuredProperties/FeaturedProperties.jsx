import React, { useState } from "react";
import "./featuredProperties.css";
import { Link } from "react-router-dom";
import useF from "../../Hooks/useF";

const FeaturedProperties = () => {
  const { data, error, loading } = useF("/rooms");
  const [selectedVoiture, setSelectedVoiture] = useState(null);

  const handleCarClick = (car) => {
    setSelectedVoiture(car);
    localStorage.setItem("selectedVoiture", JSON.stringify(car));
    localStorage.removeItem("selectedmodeles");
  };

  return (
    <div className="fp">
      {loading ? (
        "Loading ...."
      ) : error ? (
        "Error fetching data."
      ) : (
        <>
          {data.map((car) => (
            <Link
              key={car._id}
              to={`/hotels/${car._id}`} // Définissez l'URL avec les ID de l'hôtel et de la voiture
              className="fpItemLink" // Ajoutez une classe pour styliser le lien si nécessaire
            >
              <div
                className="fpItem"
                key={car._id}
                onClick={() => handleCarClick(car)}
              >
                {car.photos && car.photos.length > 0 && (
                  <img src={car.photos[0]} alt="" className="fpImg" />
                )}
                <span className="fpName">Model: {car.modéle}</span>
                <span className="fpCity">Color: {car.couleur}</span>
                <span className="fpCity">Année: {car.année}</span>
                <span className="fpPrice">Price: {car.price}</span>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
