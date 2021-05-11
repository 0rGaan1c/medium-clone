import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase";
import firebase from "firebase/app";

const WriteStory = () => {
  const [titleRing, setTitleRing] = useState("focus:ring");
  const [storyRing, setStoryRing] = useState("focus:ring");
  const [isPublished, setIsPublished] = useState(false);

  const { currentUser } = useContext(UserContext);

  const titleRef = useRef(null);
  const storyRef = useRef(null);

  const handlePublishClick = () => {
    const title = titleRef.current.value;
    const story = storyRef.current.value;
    const name = currentUser.displayName;

    if (title === "") {
      setTitleRing("ring ring-red-500");
      setTimeout(() => {
        setTitleRing("focus:ring");
      }, 3000);
      return;
    }
    if (story === "") {
      setStoryRing("ring ring-red-500");
      setTimeout(() => {
        setStoryRing("focus:ring");
      }, 3000);
      return;
    }

    // personal user blogs
    // db.collection("users")
    //   .add({
    //     [currentUser.email]: [
    //       {
    //         name: currentUser.displayName,
    //         title: titleRef.current.value,
    //         story: storyRef.current.value,
    //       },
    //     ],
    //   })
    //   .then((docRef) => {
    //     console.log("Document written with id: ", docRef.id);
    //   })
    //   .catch((error) => {
    //     console.log("Error adding document: ", error);
    //   });

    // array thing -- it's working, meaning data is stored as I want it
    // only reading remians
    const docRef = db.collection("users").doc(currentUser.email);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Exists");
        docRef.update({
          stories: firebase.firestore.FieldValue.arrayUnion({ title, story }),
        });
      } else {
        docRef.set({
          name,
          stories: [
            {
              title,
              story,
            },
          ],
        });
      }
    });

    // all blogs for the main page
    db.collection("allStories")
      .add({
        name,
        title,
        story,
      })
      .then((docRef) => {
        console.log("docRef: ", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });

    titleRef.current.value = "";

    storyRef.current.value = "";

    setIsPublished(true);
    setTimeout(() => {
      setIsPublished(false);
    }, 1000);
  };

  return (
    <>
      <div className="mt-14 md:mt-16 justify-center w-11/12 mx-auto">
        {isPublished ? (
          <div className="py-1 bg-green-300 rounded-md my-2 md:my-4 text-center">
            Published
          </div>
        ) : null}
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="title"
            className={`text-2xl md:text-3xl px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none ${titleRing} w-full tracking-wide`}
            ref={titleRef}
          />
        </div>
        <div className="mb-4">
          <textarea
            name="story"
            placeholder="story"
            className={`text-1xl md:text-2xl px-3 py-3 h-32 w-full placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none ${storyRing} w-full tracking-wide`}
            ref={storyRef}
          />
        </div>
        <div className="mb-4 flex justify-end">
          <Link
            to="/profile"
            className="bg-red-400 rounded-2xl md:rounded-3xl p-2 md:p-3 cursor-pointer md:text-2xl hover:text-gray-100 hover:shadow-xl hover:bg-red-500 mr-2"
          >
            Discard
          </Link>
          <span
            className="bg-green-400 rounded-2xl md:rounded-3xl p-2 md:p-3 cursor-pointer md:text-2xl hover:text-gray-100 hover:shadow-xl hover:bg-green-500"
            onClick={handlePublishClick}
          >
            {" "}
            Publish{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default WriteStory;
