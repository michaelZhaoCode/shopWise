import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import sendButton from "./assets/send_button.svg";
import ScrollToBottom from "react-scroll-to-bottom";

const Chatbot = () => {
  const [userInputs, setUserInputs] = useState([
    
  ]);
  const [responses, setResponses] = useState([
   
  ]);
  const [prompt, setPrompt] = useState("");

  const [chatMessages, setChatMessages] = useState([]);

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
        setUserInputs((prevInputs) => [...prevInputs, prompt])
        const body = { "prompt": prompt }; // convert to JSON since body needs to be in JSON format
        // const responses = [];
        const response = await fetch('http://127.0.0.1:5000/chat/', {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Headers": '*',
                "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE'
            },
            body: JSON.stringify(body)
        });
        // console.log(await response.json())
        let resp = "";
        await response.json().then((data) => {
            console.log(data)
            resp = data.response;
        })
        setResponses((prevResponses) => [...prevResponses, resp]);
        setPrompt('');


    } catch (error) {
        console.log(error);
    }

  };

  useEffect(() => {
    console.log(userInputs);
  }, [userInputs]);

  return (
    <div className="h-screen bg-black p-16 pt-25">
      <div className="flex flex-col rounded-3xl main-height">
        {/* Header */}
        <div className="font-bold text-2xl flex justify-center h-1/6 items-center text-white shadow-lg rounded-t-3xl header-color">
          <h1>AI CHAT</h1>
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

        <div className="bg-[#202020] rounded-b-3xl mt-3 flex justify-center h-1/6 items-center">
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
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
