import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import sendButton from "./assets/send_button.svg";
import urlButton from "./assets/urlsubmit.png";
import Lottie from "lottie-react"
import robotAnimation from "./assets/robotAnimation.json"
import ScrollToBottom from "react-scroll-to-bottom";
import "./Search.css"

const Chatbot = () => {
  const [userInputs, setUserInputs] = useState([]);
  const [responses, setResponses] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [urlPrompts, setUrlPrompts] = useState(['', '', '']);

  const [chatMessages, setChatMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const newMessages = [];

    for (let i = 0; i < Math.max(userInputs.length, responses.length); i++) {
      if (i < userInputs.length) {
        newMessages.push(
          <div
            className="text-white justify-center items-center w-4/12 break-words h-auto mr-20 self-end user-color rounded-3xl p-5 text-sm"
            key={i}
          >
            {userInputs[i]}
          </div>
        );
      }
      if (i < responses.length) {
        newMessages.push(
          <div
            className="text-black justify-center items-center break-words h-full w-4/12 ml-20 self-start ai-color rounded-3xl p-5"
            key={i}
          >
            {responses[i]}
          </div>
        );
      }
    }

    setChatMessages(newMessages);
  }, [responses, userInputs]);

  const callAPI = async () => {
    try {
      setUserInputs((prevUrls) => [...prevUrls, prompt]);
      const body = { prompt: prompt }; // convert to JSON since body needs to be in JSON format
      // const responses = [];
      const response = await fetch("http://127.0.0.1:5000/chat/", {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
        body: JSON.stringify(body),
      });
      // console.log(await response.json())
      let resp = "";
      await response.json().then((data) => {
        console.log(data);
        resp = data.response;
      });
      setResponses((prevResponses) => [...prevResponses, resp]);
      setPrompt("");
    } catch (error) {
      console.log(error);
    }
  };

  const addUrlsAPI = async () => {
    try {
      const body = { 'urls': urlPrompts }; // convert to JSON since body needs to be in JSON format
      // const responses = [];
      console.log(body);
      const response = await fetch("http://127.0.0.1:5000/addUrls/", {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
        body: JSON.stringify(body),
      });
      // console.log(await response.json())
      let resp = "";
      await response.json().then((data) => {
        console.log(data);
        resp = data;
      });
      setUrlPrompts(['', '', '']);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userInputs);
  }, [userInputs]);

  return (
    <div className="h-screen bg-black p-16 pt-25">
      {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-xl shadow-lg z-50 p-4">
                        <p className="font-ad text-black text-lg">
                          Your products have been successfully analyzed!
                        </p>
                        <button
                          className="mt-3 bg-[#202020] font-ad text-white text-lg font-semibold py-2 px-4 rounded-xl hover:bg-black focus:outline-none focus:shadow-outline"
                          style={{ cursor: "pointer" }}
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
      <div className="flex flex-col rounded-3xl h-full" id="chat-box">
        
        {/* Header */}
        <div className="font-bold text-2xl flex justify-center h-1/6 items-center text-white shadow-lg rounded-t-3xl header-color">
          <h1>AI CHAT</h1>
          <Lottie className="w-32" animationData={robotAnimation}/>
        </div>

        {/* BODY */}
        <ScrollToBottom className="flex flex-col justify-center h-4/6 items-center overflow-auto mt-3 bg-[#202020] p-3">
          {/* Display chat messages dynamically */}
          {chatMessages.map((message, index) => (
            <div
              className="text-white flex flex-col justify-center items-center h-auto w-full"
              key={index}
            >
              {message}
            </div>
          ))}
        </ScrollToBottom>

        <div className="bg-[#202020] rounded-b-3xl mt-3 flex flex-col justify-center h-1/6 items-center">
          <div className="flex w-full gap-5 ml-5 mr-5 justify-center">
            <input
              className="footer-color text-white p-3 rounded-3xl text-sm w-10/12"
              placeholder="  Enter a message"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <div className="flex justify-center items-center w-1/12">
              <img
                className="hover:scale-125 duration-500 cursor-pointer"
                src={sendButton}
                alt="Send Button"
                onClick={() => {
                  callAPI();
                }}
              />
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex w-full gap-5 ml-5 mr-5 justify-center items-end">
              <input
                className="footer-color text-white p-3 rounded-3xl text-sm w-full h-1/2"
                placeholder="  Enter Product URL 1"
                value={urlPrompts[0]}
                onChange={(e) => {
                  setUrlPrompts((prevUrlPrompts) => {
                    const updatedUrlPrompts = [...prevUrlPrompts];
                    updatedUrlPrompts[0] = e.target.value; // Update the 2nd element (index 1)
                    return updatedUrlPrompts;
                  });                }}
              />
            </div>
            <div className="flex w-full gap-5 ml-5 mr-5 justify-center items-end">
              <input
                className="footer-color text-white p-3 rounded-3xl text-sm w-full h-1/2"
                placeholder="  Enter Product URL 2"
                value={urlPrompts[1]}
                onChange={(e) => {
                  setUrlPrompts((prevUrlPrompts) => {
                    const updatedUrlPrompts = [...prevUrlPrompts];
                    updatedUrlPrompts[1] = e.target.value; // Update the 2nd element (index 1)
                    return updatedUrlPrompts;
                  });                }}
              />
            </div>
            <div className="flex w-full gap-5 ml-5 mr-5 justify-center items-end">
              <input
                className="footer-color text-white p-3 rounded-3xl text-sm w-full h-1/2"
                placeholder="  Enter Product URL 3"
                value={urlPrompts[2]}
                onChange={(e) => {
                  setUrlPrompts((prevUrlPrompts) => {
                    const updatedUrlPrompts = [...prevUrlPrompts];
                    updatedUrlPrompts[2] = e.target.value; // Update the 2nd element (index 1)
                    return updatedUrlPrompts;
                  });                }}
              />
            </div>
              <div className="flex justify-center items-end text-white mr-5">
              <img
                className="hover:scale-125 duration-500 cursor-pointer max-h-24 w-auto"
                src={urlButton}
                alt="Send Button"
                onClick={() => {
                  addUrlsAPI();
                }}
              />
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Chatbot;
