import React, { useState, useEffect } from "react";
import Content from "./components/Content";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* list of articles written by people will be shown here */}
      <Content />
    </>
  );
}

export default App;
