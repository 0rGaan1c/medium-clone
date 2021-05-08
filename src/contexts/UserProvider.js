import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      // if (user) {
      //   const { displayName, email } = user;
      //   setLoading(false);
      //   setCurrentUser({
      //     displayName,
      //     email,
      //   });
      // }
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
