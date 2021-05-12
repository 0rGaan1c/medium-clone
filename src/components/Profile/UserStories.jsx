import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import { db } from "../../services/firebase";
import { FaTrash } from "react-icons/fa";
import firebase from "firebase/app";

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

  const handleDelete = (idx, title, story, name) => {
    const updatedStories = [];
    stories.forEach((story, index) => {
      if (index !== idx) {
        updatedStories.push(story);
      }
    });
    const docRef = db.collection("users").doc(currentUser.email);

    docRef.update({
      stories: firebase.firestore.FieldValue.arrayRemove({
        title,
        story,
        name,
      }),
    });

    setStories(updatedStories);
  };

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
              <div
                key={idx}
                className="w-11/12 mx-auto bg-white rounded-1xl shadow-xl rounded-lg mb-6 justify-between p-2 cursor-pointer md:w-2/4"
              >
                <div className="flex">
                  <Link
                    to={{
                      pathname: `/${currentUser.displayName}/${title}`,
                      state: {
                        title,
                        story,
                        name: currentUser.displayName,
                      },
                    }}
                  >
                    <h2 className="text-lg font-bold hover:text-blue-400">
                      {title}
                    </h2>
                  </Link>
                  <FaTrash
                    className="ml-auto hover:text-red-400"
                    onClick={() =>
                      handleDelete(idx, title, story, currentUser.displayName)
                    }
                  />
                </div>
                <p className="mt-2 text-gray-700 md:mt-4">
                  {story.substr(0, 100)}...
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserStories;
