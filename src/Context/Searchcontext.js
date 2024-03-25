// SearchContextProvider.js
import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  modéle: undefined,

};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// ...

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  // Load search state from local storage on component mount
  useEffect(() => {
    const storedSearchState =
      retrieveSearchState("searchState") || INITIAL_STATE;
    dispatch({ type: "NEW_SEARCH", payload: storedSearchState });
  }, []);

  // Persist search state to local storage on state change
  useEffect(() => {
    persistSearchState("searchState", state);
  }, [state]);

  const persistSearchState = (key, value) => {
    const serializedValue = JSON.stringify(value, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(key, serializedValue);
  };

  const retrieveSearchState = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue
      ? JSON.parse(storedValue, (key, value) => {
          if (key === "startDate" || key === "endDate") {
            return new Date(value);
          }
          return value;
        })
      : null;
  };

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        modéle: state.modéle,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
