import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import ReservationDetailsPage from "./pages/Reservat/ReservationDetailsPage";
import Signup from "./pages/Signup/Signup"
import ContactPage from "./pages/contact/contact";
import AboutPage from "./pages/about/about";
import Agence from "./pages/agences/agences"


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contacts" element={<ContactPage/>}/>
        <Route path="/agences" element={<Agence/>}/>
        <Route path="/reservation-details" element={<ReservationDetailsPage />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
