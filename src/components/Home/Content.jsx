import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { db } from "../../services/firebase";

const Content = () => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <h1>Not yet</h1>;
  }

  return <div>{currentUser.displayName}</div>;
};

export default Content;
