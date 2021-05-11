import React, { useContext, useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { UserContext } from "../../contexts/UserProvider";

const Story = ({
  match: {
    params: { title, name },
  },
}) => {
  const { state } = useLocation();

  const { currentUser } = useContext(UserContext);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [showModals, setShowModals] = useState(true);

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

  if (!state) {
    return <Redirect to="/" />;
  }

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
      <div className="mt-8">
        <div className="mx-auto w-11/12">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-400 -mt-2">@{name}</p>
          <p className="text-sm mt-4">{state.story}</p>
        </div>
      </div>
    </>
  );
};

export default Story;
