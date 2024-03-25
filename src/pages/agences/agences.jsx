import FeaturedPropertiesx from "../../components/featiredpropritiesx/Featuredproprietiesx";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

const Agence = () => {
  localStorage.removeItem("selectedVoiture");
  localStorage.removeItem("selectedmodeles");
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Agences</h1>
        <FeaturedPropertiesx />
      </div>
      <Footer />
    </div>
  );
};

export default Agence;
