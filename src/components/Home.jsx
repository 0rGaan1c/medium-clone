import React, { useState, useEffect, useContext } from "react";
import SignInModal from "./Home/SignInModal";
import SignUpModal from "./Home/SignUpModal";
import Hero from "./Home/Hero";
import Content from "./Home/Content";
import Navbar from "./Home/Navbar";
import { UserContext } from "../contexts/UserProvider";

const Home = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [showModals, setShowModals] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setShowModals(false);
    } else {
      setShowModals(true);
    }
  }, [currentUser]);

  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const showSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <>
      {showModals ? (
        <SignInModal
          isSignInModalOpen={isSignInModalOpen}
          closeSignInModal={closeSignInModal}
          showSignUpModal={showSignUpModal}
        />
      ) : null}
      {showModals ? (
        <SignUpModal
          isSignUpModalOpen={isSignUpModalOpen}
          closeSignUpModal={closeSignUpModal}
          showSignInModal={showSignInModal}
        />
      ) : null}
      <Navbar
        showSignUpModal={showSignUpModal}
        showSignInModal={showSignInModal}
      />
      {!currentUser ? <Hero showSignUpModal={showSignUpModal} /> : null}
      <Content />
    </>
  );
};

export default Home;
