import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [credentials, setcredentials] = useState();
  const handlechange = (e) => {
    setcredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2>S'inscrire</h2>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handlechange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlechange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={handlechange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Pays"
          id="country"
          onChange={handlechange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Ville"
          id="city"
          onChange={handlechange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="télephone"
          id="phone"
          onChange={handlechange}
          className="lInput"
        />
        <button className="lButton" onClick={handleClick}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
