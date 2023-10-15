import React, { useEffect } from "react";
import productIcon from "./assets/product.png";
import "./Summary.css";
import leftArrow from "./assets/left_arrow_icon.svg";
import { useAppContext } from "./Context";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import shoes1 from './assets/shoes1.png'
import shoes2 from './assets/shoes2.png'
import shoes3 from './assets/shoes3.png'
import chatIcon from './assets/chatIcon.png'

const Summary = () => {
  const { productInfo, setProductInfo } = useAppContext();
  const navigate = useNavigate();

//   if (productInfo.length !== 0) {
//     const pro1 = productInfo[0];
//     const pro2 = productInfo[1];
//     const pro3 = productInfo[2];
//   }

  // name, summary, price, pros, cons, rating
  useEffect(() => {
    console.log(productInfo);
    console.log(productInfo.length);
  }, [productInfo])
  return (
    // {isLoggedIn ? <LoggedInComponent /> : <GuestComponent />}

    <div className="bg-black h-screen overflow-auto">
        {productInfo.length === 0 ? (
            <Loading />
    ) : (
        <>
      <div className="flex justify-center h-1/10 mt-7 ml-20 mr-20 gap-5">
        <div className="w-1/2 flex justify-start">
          <div className="flex justify-center items-center ">
            <img
              onClick={() => {
                navigate("/search");
              }}
              src={leftArrow}
              className="w-10 h-10  "
              alt="Left Arrow"
            />
            <button
              className=" text-white text-4xl ml-5"
              onClick={() => {
                console.log("test");
                navigate("/search");
              }}
            >
              Back
            </button>
          </div>
          </div>
          <div className="w-1/2 flex justify-end">
        <div className=" flex justify-center items-center ">
          <img
            onClick={() => {
              navigate("/chat");
            }}
            src={chatIcon}
            className="w-16 h-14"
            alt="Left Arrow"
          />

        </div>
        </div>
        
      </div>

      <div className="flex flex-row p-10 gap-5 h-[95%]">
        <div className="w-1/3 flex flex-col p-5 rounded-3xl overflow-auto cell-color">
          <div className="flex ">
            <div className="flex w-1/3 p-2">
              <img src={shoes1} className=""></img>
            </div>
            <div className="flex w-2/3 justify-center items-center">
              <h1 className="text-white text-md font-bold">{productInfo[0].name}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2">
            <div className="flex w-2/5 darker-yellow justify-center rounded-2xl">
              <h1 className="text-white">{productInfo[0].price}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2 mt-1 mb-3 ">
            <h1 className="text-white">{productInfo[0].summary}</h1>
          </div>
          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-white text-sm">• {productInfo[0].pros[0]}</h1>
              <h1 className="text-white text-sm">• {productInfo[0].pros[1]}</h1>
              <h1 className="text-white text-sm">• {productInfo[0].pros[2]}</h1>
            </div>
          </div>

          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3 mt-5">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start mt-2">
              <h1 className="text-white text-sm">• {productInfo[0].cons[0]}</h1>
              <h1 className="text-white text-sm">• {productInfo[0].cons[1]}</h1>
              <h1 className="text-white text-sm">• {productInfo[0].cons[2]}</h1>
            </div>
          </div>
        </div>


<div className="w-1/3 flex flex-col p-5 rounded-3xl overflow-auto cell-color">
          <div className="flex ">
            <div className="flex w-1/4 p-2">
              <img src={shoes2} className=""></img>
            </div>
            <div className="flex w-2/3 justify-center items-center">
              <h1 className="text-white">{productInfo[1].name}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2">
            <div className="flex w-2/5 darker-yellow justify-center rounded-2xl">
              <h1 className="text-white">{productInfo[1].price}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2 mt-1 mb-4 ">
            <h1 className="text-white">{productInfo[1].summary}</h1>
          </div>
          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-white text-sm">• {productInfo[1].pros[0]}</h1>
              <h1 className="text-white text-sm">• {productInfo[1].pros[1]}</h1>
              <h1 className="text-white text-sm">• {productInfo[1].pros[2]}</h1>
            </div>
          </div>

          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3 mt-5">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start mt-2">
              <h1 className="text-white text-sm">• {productInfo[1].cons[0]}</h1>
              <h1 className="text-white text-sm">• {productInfo[1].cons[1]}</h1>
              <h1 className="text-white text-sm">• {productInfo[1].cons[2]}</h1>
            </div>
          </div>
        </div>


        <div className="w-1/3 flex flex-col p-5 rounded-3xl overflow-auto cell-color">
          <div className="flex ">
            <div className="flex w-1/4 p-2">
              <img src={shoes3} className=""></img>
            </div>
            <div className="flex w-2/3 justify-center items-center">
              <h1 className="text-white">{productInfo[2].name}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2">
            <div className="flex w-2/5 darker-yellow justify-center rounded-2xl">
              <h1 className="text-white">{productInfo[2].price}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2 mt-1 mb-4 ">
            <h1 className="text-white">{productInfo[2].summary}</h1>
          </div>
          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-white text-sm">• {productInfo[2].pros[0]}</h1>
              <h1 className="text-white text-sm">• {productInfo[2].pros[1]}</h1>
              <h1 className="text-white text-sm">• {productInfo[2].pros[2]}</h1>
            </div>
          </div>

          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3 mt-5">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start mt-2">
              <h1 className="text-white text-sm">• {productInfo[2].cons[0]}</h1>
              <h1 className="text-white text-sm">• {productInfo[2].cons[1]}</h1>
              <h1 className="text-white text-sm">• {productInfo[2].cons[2]}</h1>
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    </div>
  );
};

export default Summary;
