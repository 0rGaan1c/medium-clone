import React, { useState, useContext } from "react";
import SignInModal from "./Home/SignInModal";
import SignUpModal from "./Home/SignUpModal";
import Hero from "./Home/Hero";
import Content from "./Home/Content";
import Navbar from "./Home/Navbar";
import { UserContext } from "../contexts/UserProvider";

const Home = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const { currentUser } = useContext(UserContext);
  if (currentUser) {
    const { displayName, email } = currentUser;
    console.log(displayName, email);
    console.log("yes, finally");
  } else {
    console.log("no, finally");
  }

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
      <SignInModal
        isSignInModalOpen={isSignInModalOpen}
        closeSignInModal={closeSignInModal}
        showSignUpModal={showSignUpModal}
      />
      <SignUpModal
        isSignUpModalOpen={isSignUpModalOpen}
        closeSignUpModal={closeSignUpModal}
        showSignInModal={showSignInModal}
      />
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
