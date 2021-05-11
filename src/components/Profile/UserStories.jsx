import React from "react";
import { Link } from "react-router-dom";

const UserStories = () => {
  return (
    <>
      <div className="mt-8 md:mt-16">
        <div className="flex justify-center">
          <h3 className="text-gray-500 font-bold">
            Have something to share?{" "}
            <span className="underline cursor-pointer">
              <Link to="/profile/write">Write your story </Link>
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default UserStories;
