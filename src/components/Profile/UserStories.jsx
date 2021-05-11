import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import { db } from "../../services/firebase";

const UserStories = () => {
  const [stories, setStories] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const docRef = db.collection("users").doc(currentUser.email);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setStories(doc.data().stories);
        } else {
          console.log("this actually shouldn't happen");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [currentUser]);

  if (stories) {
    console.log(stories);
  }
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
        <div className="mt-8 w-11/12 mx-auto">
          <h1 className="mb-4 w-11/12 mx-auto text-2xl font-bold md:mb-8 md:w-2/4">
            Your Stories: {stories.length < 1 ? "0" : stories.length}
          </h1>
          {stories.map((item, idx) => {
            const { title, story } = item;
            return (
              <Link
                key={idx}
                to={{
                  pathname: `/${currentUser.displayName}/${title}`,
                  state: {
                    title,
                    story,
                    name: currentUser.displayName,
                  },
                }}
              >
                <div className="w-11/12 mx-auto bg-white rounded-1xl shadow-xl rounded-lg hover:shadow-2xl mb-6 justify-between p-2 cursor-pointer md:w-2/4">
                  <h2 className="text-lg font-bold">{title}</h2>
                  <p className="mt-2 text-gray-700 md:mt-4">
                    {story.substr(0, 100)}...
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserStories;
