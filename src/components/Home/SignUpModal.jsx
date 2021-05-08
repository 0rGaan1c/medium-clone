import React, { useContext } from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";
import { signInWithGoogle } from "../../services/firebase";
import { UserContext } from "../../contexts/UserProvider";

const SignUpModal = ({
  isSignUpModalOpen,
  closeSignUpModal,
  showSignInModal,
}) => {
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    closeSignUpModal();
  }

  return (
    <div
      className={
        isSignUpModalOpen
          ? "fixed z-10 overflow-auto bg-white w-full h-screen m-auto"
          : "hidden"
      }
    >
      <div className="flex justify-end p-6 ">
        <FaTimes onClick={closeSignUpModal} className="cursor-pointer" />
      </div>
      <div className="px-14 pt-32 pb-11 mt-16 text-center">
        <div>
          <h3 className="text-2xl">Join Medium.</h3>
        </div>
        <div className="mt-16">
          <div className="modal-button" onClick={signInWithGoogle}>
            <FaGoogle className="mr-2" /> <p>Sign up with Google</p>
          </div>
          <div className="modal-button">
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            Sign up with email
          </div>
        </div>
        <div className="mt-14">
          <p>
            Already have an account?
            <span
              className="text-green-500 hover:text-green-600 cursor-pointer"
              onClick={() => {
                showSignInModal();
                closeSignUpModal();
              }}
            >
              <strong> Sign in</strong>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
