import React from "react";

const Hero = () => {
  return (
    <div className="bg-yellow-400 border-b-1 border-black">
      <div className="w-5/6 m-auto md:w-3/4">
        <div className="xl:w-6/12">
          <h1 className="text-5xl md:text-7xl pt-6 pb-8 leading-tight">
            Where good ideas find you
          </h1>
          <h4 className="text-lg">
            Read and share new perspectives on just about any topic. Everyone's
            welcome.
            <p className="mt-8 mb-10 py-1 px-2 text-center w-2/6 md:w-1/4 rounded-3xl text-base border-1 border-black cursor-pointer">
              Get Started
            </p>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Hero;
