import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import useF from "../Hooks/useF";
import { AuthContext } from "./Authcontext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userid = user ? user._id : null;
  const [countFalseResponses, setCountFalseResponses] = useState(0);
  const { data: datahotel, loading: loadingHotel } = useF(`
    /users/hotels/${userid}
    `);
  const { data, loading } = useF(`/orders/`);

  const getRoomIds = (hotel) =>
    hotel.rooms ? hotel.rooms.map((room) => room._id) : [];

  const roomIds = datahotel
    ? datahotel.flatMap((hotel) => getRoomIds(hotel))
    : [];

  const orderRoomIds = data
    ? data.map((order) => order.room).filter((roomId) => roomIds.includes(roomId))
    : [];

  useEffect(() => {
    const fetchRoomOrders = async () => {
      try {
        const response = await axios.get(`/orders/byRoomIds`, {
          params: {
            roomIds: roomIds,
          },
        });

        const formattedData = response.data.map((item) => ({
          ...item,
          unavailable: item.unavailable
            .map((date) =>
              new Date(date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            )
            .join(", "),
        }));

        setCountFalseResponses(
          formattedData.filter((item) => item.reponse === false).length
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };

    if (roomIds.length > 0) {
      fetchRoomOrders();
    }
  }, [roomIds]);

  const value = {
    countFalseResponses,
    setCountFalseResponses,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};