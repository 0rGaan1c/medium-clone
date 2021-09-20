import React from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";
import { signInWithGoogle } from "../../services/firebase";

const SignUpModal = ({
  isSignUpModalOpen,
  closeSignUpModal,
  showSignInModal,
}) => {
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
