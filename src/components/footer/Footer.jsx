import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,faHome,faHotel,faUser,faWarehouse,faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
                <div className="logo-widget footer-widget">
                  <figure className="logo-box">
                    <a href="#"><img src="https://i.ibb.co/QDy827D/ak-logo.png" alt="" /></a>
                  </figure>
                  <div className="text">
                    <p>Lorem ipsum dolor amet consectetur adi</p>
                  </div>
                  
                  <ul className="footer-social">
                    <li><a href="#"><i><FontAwesomeIcon icon={faCar} className="icon" /></i></a></li>
                    <li><a href="#"><i><FontAwesomeIcon icon={faHome} className="icon" /></i></a></li>
                    <li><a href="#"><i> <FontAwesomeIcon icon={faHotel} className="icon" /></i></a></li>
                    <li><a href="#"><i><FontAwesomeIcon icon={faUser} className="icon" /></i></a></li>
                    <li><a href="#"><i> <FontAwesomeIcon icon={faWarehouse} className="icon" /></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 offset-lg-2 footer-column">
                <div className="service-widget footer-widget">
                  
                  
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 footer-widget">
                <div className="contact-widget footer-widget">
                 
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* main-footer end */}
      
    </>
  );
};

export default Footer;
