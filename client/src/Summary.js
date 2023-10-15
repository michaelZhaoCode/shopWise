import React, { useEffect } from "react";
import productIcon from "./assets/product.png";
import "./Summary.css";
import leftArrow from "./assets/left_arrow_icon.svg";
import { useAppContext } from "./Context";
import { useNavigate } from "react-router-dom";

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
            <div className="text-white">
                haha
            </div>
    ) : (
        <>
      <div className="flex justify-start h-1/10 mt-10 ml-10 gap-5">
        <div className="flex justify-center items-center">
          <img
            onClick={() => {
              navigate("/search");
            }}
            src={leftArrow}
            className="w-10 h-10  "
            alt="Left Arrow"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" text-white text-4xl"
            onClick={() => {
              console.log("test");
              navigate("/search");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className="flex flex-row p-10 gap-5 h-9/10">
        <div className="w-1/3 flex flex-col p-5 rounded-3xl overflow-auto cell-color">
          <div className="flex ">
            <div className="flex w-1/3 p-2">
              <img src={productIcon} className=""></img>
            </div>
            <div className="flex w-2/3">
              <h1 className="text-white">{productInfo[0].name}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2">
            <div className="flex w-2/5 darker-yellow justify-center rounded-2xl">
              <h1 className="text-white">{productInfo[0].price}</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2 mt-1 mb-4 ">
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
            <div className="flex w-1/3 p-2">
              <img src={productIcon} className=""></img>
            </div>
            <div className="flex w-2/3">
              <h1 className="text-white">
                Kasa Smart Plug by TP-Link (HS103P2) - Smart Home WiFi...
              </h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2">
            <div className="flex w-2/5 darker-yellow justify-center rounded-2xl">
              <h1 className="text-white">$55.55</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2 mt-1 mb-4 ">
            <h1 className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </h1>
          </div>
          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-white text-sm">• Positive Review 1</h1>
              <h1 className="text-white text-sm">• Positive Review 2</h1>
              <h1 className="text-white text-sm">• Positive Review 3</h1>
            </div>
          </div>

          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3 mt-5">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start mt-2">
              <h1 className="text-white text-sm">• Negative Review 1</h1>
              <h1 className="text-white text-sm">• Negative Review 2</h1>
              <h1 className="text-white text-sm">• Negative Review 3</h1>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col p-5 rounded-3xl  overflow-auto cell-color">
          <div className="flex ">
            <div className="flex w-1/3 p-2">
              <img src={productIcon} className=""></img>
            </div>
            <div className="flex w-2/3">
              <h1 className="text-white">
                Kasa Smart Plug by TP-Link (HS103P2) - Smart Home WiFi...
              </h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2">
            <div className="flex w-2/5 darker-yellow justify-center rounded-2xl">
              <h1 className="text-white">$55.55</h1>
            </div>
          </div>
          <div className="flex align-middle justify-center p-2 mt-1 mb-4 ">
            <h1 className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </h1>
          </div>
          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-white text-sm">• Positive Review 1</h1>
              <h1 className="text-white text-sm">• Positive Review 2</h1>
              <h1 className="text-white text-sm">• Positive Review 3</h1>
            </div>
          </div>

          <div className="flex flex-col align-middle justify-center darker-yellow rounded-2xl p-3 mt-5">
            <div className="flex justify-center">
              <h1 className="text-white font-bold">Common Positive Reviews</h1>
            </div>
            <div className="flex flex-col items-start mt-2">
              <h1 className="text-white text-sm">• Negative Review 1</h1>
              <h1 className="text-white text-sm">• Negative Review 2</h1>
              <h1 className="text-white text-sm">• Negative Review 3</h1>
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
