import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchContextProvider } from "./Context/Searchcontext";
import { AuthContextProvider } from "./Context/Authcontext";
import { GlobalProvider, ReservationProvider } from "./Context/ReservationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <GlobalProvider>

      <SearchContextProvider>
        <App />
      </SearchContextProvider>
      
      </GlobalProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
