import "./Featuredproprietiesx.css";
import useF from "../../Hooks/useF";
import { Link } from "react-router-dom";

const FeaturedPropertiesx = () => {
  const { data, error, loading } = useF("/hotels?featured=true");
  return (
    <div className="fp">
      {loading ? (
        "loading ...."
      ) : (
        <>
          {data.map((item) => (
            <Link to={`/hotels/${item._id}`}>
              <div className="fpItem" key={item._id}>
                {item.photos && item.photos.length > 0 && (
                  <img src={item.photos[0]} alt="" className="fpImg" />
                )}
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpCity">{item.desc}</span>

                <span className="fpPrice">
                  Starting from {item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedPropertiesx;
