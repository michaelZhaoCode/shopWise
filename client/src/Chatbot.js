import React from "react";
import "./Chatbot.css";
import sendButton from "./assets/send_button.svg";
import ScrollToBottom from "react-scroll-to-bottom";

const Chatbot = () => {
  const userInputs = [
    "input1",
    "input2",
    "input3asdasdasdasdasdasdasdaskldjhasljkdhbhljasdhljkasnkdjhnaisudhiu;awsdhn;iuashdb;iashd;iau",
  ];
  const responses = ["response1", "response2"];

  const chatMessages = [];
  for (let i = 0; i < Math.max(userInputs.length, responses.length); i++) {
    if (i < userInputs.length) {
      chatMessages.push(
        <div className="text-white flex flex-col justify-center items-center w-5/12 mr-10 self-end user-color rounded-3xl">
  User: {userInputs[i]}
</div>

      );
    }
    if (i < responses.length) {
      chatMessages.push(
        <div className="text-white flex flex-col justify-center items-center h-full w-5/12 ml-10 self-start ai-color rounded-3xl">
          AI: {responses[i]}
          {/* <h1 className="self-center">AI: {responses[i]}</h1> */}
        </div>
      );
    }
  }

  return (
    <div className="h-screen bg-black p-20 pt-25">
      <div className="flex flex-col rounded-3xl border-2 main-height">
        {/* Header */}
        <div className="flex justify-center border-2 h-1/6 items-center">
          <h1>AI CHAT</h1>
        </div>

        {/* BODY */}
        <ScrollToBottom className="flex flex-col justify-center border-2 h-4/6 items-center overflow-auto">
          {/* Display chat messages dynamically */}
          {chatMessages.map((message, index) => (
            <div
              className="text-white flex flex-col justify-center items-center h-1/6 w-full"
              key={index}
            >
              {message}
            </div>
          ))}
        </ScrollToBottom>

        <div className="flex justify-center border-2 h-1/6 items-center">
          <div className="flex w-full gap-5">
            <input
              className="footer-color text-white p-3 rounded-3xl text-sm w-9/12"
              placeholder="Enter a message"
            />
            <img src={sendButton} alt="Send Button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
