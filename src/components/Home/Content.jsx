import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { Link } from "react-router-dom";

const Content = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    db.collection("allStories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { ...doc.data() };
          setStories((prevState) => {
            return [...prevState, data];
          });
        });
      });
  }, []);

  if (stories.length === 0) {
    return (
      <>
        <h1 className="mt-8 text-center md:mx-auto text-2xl font-bold md: mb-8 md:w-2/4">
          No stories to Read
        </h1>
      </>
    );
  }
  return (
    <>
      <div className="mt-8">
        <div className="mb-4 w-11/12 mx-auto text-2xl font-bold md:mb-8 md:w-2/4">
          <h2>Read a Story</h2>
        </div>
        {stories.map((stor, idx) => {
          const { name, title, story } = stor;
          return (
            <Link
              key={idx}
              to={{
                pathname: `/${name}/${title}`,
                state: {
                  name: name,
                  title: title,
                  story: story,
                },
              }}
            >
              <div className="w-11/12 mx-auto bg-white shadow-xl rounded-lg hover:shadow-2xl mb-6 justify-between p-2 cursor-pointer md:w-2/4">
                <div className="text-lg font-bold">{title}</div>
                <div className="-mt-2 text-sm text-gray-400">@{name}</div>
                <div className="mt-2 text-gray-700 md:mt-4">
                  {story.substr(0, 100)}...
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Content;
