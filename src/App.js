import React, { useState, useEffect } from "react";
import Content from "./components/Content";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
      <Navbar showModal={showModal} />
      <Hero showModal={showModal} />
      {/* list of articles written by people will be shown here */}
      <Content />
    </>
  );
}

export default App;
