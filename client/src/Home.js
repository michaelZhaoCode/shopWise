import React from "react";
import CartCanvas from "./Cart";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();



  const handleButtonClick = () => {
    // Redirect to the "/search" route
    navigate('/search')
  };
  return (
    <div className="h-screen flex items-center justify-center flex-row bg-zinc-900">
      <div className="text-white">
        <h1 className="text-8xl font-semibold">ShopWise</h1>
        <h2 className="whitespace-normal max-w-lg mt-12 text-lg">
          Powered by ChatGPT, ShopWise streamlines your online shopping
          experience by distilling valuable insights and visual comparisons,
          empowering you to make better informed decisions for all your needs.
        </h2>
        <button className="text-white font-semibold text-xl rounded-full py-2.5 px-[80px] bg-zinc-800 border-4 border-[#D5A13D] mt-8" 
        onClick={handleButtonClick}
        >
          START
        </button>
      </div>
      <div className="h-screen"><CartCanvas /></div>
    </div>
  );
}

export default Home;