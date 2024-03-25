import useF from "../../Hooks/useF";
import "./featured.css";

const Featured = () => {
  const { data, error, loading } = useF(
    "/hotels/Countbycity?cities=Alger,Dublin,St peetersburg"
  );
  console.log(data);
  return (
    <div className="featured">
      {loading ? (
        "Chargement ..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/7698883/pexels-photo-7698883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Alger</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/id/1364494675/photo/seaside-view-with-cloudy-sky-in-annaba-city.jpg?s=1024x1024&w=is&k=20&c=5XOtbif_By_hxrPkI5OP7f6Ex4UV49GraNJAG39tOPc="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Annaba</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Oran</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
