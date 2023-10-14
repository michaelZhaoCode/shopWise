import React from "react";
import "./Chatbot.css";
import sendButton from "./assets/send_button.svg";
import ScrollToBottom from "react-scroll-to-bottom";

const Chatbot = () => {
  const userInputs = [
    "input1",
    "input2",
    "input3asdasdasdasdasdasdasdaskldjhasljkdhbhljasdhljkasnkdjhnaisudhiu;awsdhn;iuashdb;iashd;iau",
    "input3asdasdasdasdasdasdasdaskldjhasljkdhbhljasdhljkasnkdjhnaisudhiu;awsdhn;iuashdb;iashd;iau",
    "input3asdasdasdasdasdasdasdaskldjhasljkdhbhljasdhljkasnkdjhnaisudhiu;awsdhn;iuashdb;iashd;iau",

  ];
  const responses = ["response1", "response2",
  "input3asdasdasdasdasdasdasdaskldjhasljkdhbhljasdhljkasnkdjhnaisudhiu;awsdhn;iuashdb;iashd;iau",
  "input3asdasdasdasdasdasdasdaskldjhasljkdhbhljasdhljkasnkdjhnaisudhiu;awsdhn;iuashdb;iashd;iau",
  "input3asdasdasdasdasdasdasdaskldjhasljkdhbhljasdhljkasnkdjhnaisudhiu;awsdhn;iuashdb;iashd;iau",

];

  const chatMessages = [];
  for (let i = 0; i < Math.max(userInputs.length, responses.length); i++) {
    if (i < userInputs.length) {
      chatMessages.push(
        <div className="text-white justify-center items-center w-5/12 break-words h-auto  mr-10 self-end user-color rounded-3xl p-2 text-sm">
          {userInputs[i]}
        </div>
      );
    }
    if (i < responses.length) {
      chatMessages.push(
        <div className="text-white justify-center items-center break-words h-full w-5/12 ml-10 self-start ai-color rounded-3xl p-2">
          {responses[i]}
          {/* <h1 className="self-center">AI: {responses[i]}</h1> */}
        </div>
      );
    }
  }

  return (
    <div className="h-screen bg-black p-16  pt-25">
      <div className="flex flex-col rounded-3xl main-height">
        {/* Header */}
        <div className="flex justify-center h-1/6 items-center text-white shadow-lg rounded-3xl header-color">
          <h1>AI CHAT</h1>
        </div>

        {/* BODY */}
        <ScrollToBottom className="flex flex-col justify-center h-4/6 items-center overflow-auto m-3">
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

        <div className="flex justify-center  h-1/6 items-center">
          <div className="flex w-full gap-5 ml-5 mr-5 justify-center">
            <input
              className="footer-color text-white p-3 rounded-3xl text-sm w-10/12"
              placeholder="Enter a message"
            />
            <div className="flex justify-center items-center w-1/12">
            <img src={sendButton} alt="Send Button" className="" />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
