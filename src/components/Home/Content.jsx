import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase";

const Content = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    db.collection("allStories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setStories((prevState) => {
            return [...prevState, doc.data()];
          });
        });
      });
  }, []);

  if (stories) {
    console.log(stories);
  }
  return (
    <>
      <div className="mt-8">
        <div className="mb-4 w-11/12 mx-auto text-xl font-bold">
          <h2>Read a Story</h2>
        </div>
        {stories.map((stor) => {
          const { name, title, story } = stor;
          return (
            <div className="flex w-11/12 h-12 mx-auto bg-blue-500 mb-4 justify-between">
              <div>{name}</div>
              <div>{title}</div>
              <div>{story}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Content;
