import React, { useContext, useState, useRef } from "react";
import { logOutGoogle } from "../../services/firebase";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";

const ProfileNav = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [position, setPosition] = useState({});
  const imageRef = useRef(null);

  const { currentUser } = useContext(UserContext);

  const onProfileClick = () => {
    if (currentUser) {
      const { x, y, width, height, right, left } =
        imageRef.current.getBoundingClientRect();

      setPosition({ x, y, width, height, right, left });
    }
  };

  return (
    <nav className="border-b-1">
      <div className="flex py-6 mx-5 md:items-center md:m-auto md:py-6 md:w-3/4">
        <div className="flex">
          <Link to="/">
            <h1 className="text-2xl font-bold">{currentUser.displayName} </h1>
          </Link>
        </div>
        <div ref={imageRef} onClick={onProfileClick} className="ml-auto">
          <img
            className="rounded-full w-2/4 md:w-2/4 cursor-pointer border border-yellow-800 ml-auto md:ml-0"
            id="menu-button"
            src={currentUser.photoURL}
            alt="userphoto"
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
          />
        </div>
        <div
          className={
            showDropDown
              ? "absolute w-48 md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              : "hidden"
          }
          style={{
            top: `${position.y + position.height}px`,
            left: `${position.left - 100}px`,
          }}
          role="menu"
        >
          <Link
            to="/profile"
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            role="menuitem"
          >
            Profile
          </Link>
          <div
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            role="menuitem"
            onClick={logOutGoogle}
          >
            Logout
          </div>
        </div>
        <Link to="/">
          <div className="w-2/6 md:w-20 md:h-6 flex items-center">
            <svg viewBox="0 0 1043.63 592.71">
              <g data-name="Layer 2">
                <g data-name="Layer 1">
                  <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
                </g>
              </g>
            </svg>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default ProfileNav;
