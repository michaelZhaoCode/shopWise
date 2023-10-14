import React, { useState, useContext, useEffect } from "react";
// import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import ScrollToBottom from "xd";
import { Link, useNavigate } from "react-router-dom";
// import { AppContext } from "./Context";
import "./Chat.css";

function Chat() {
  const [value, setValue] = useState("");

  const [messageList, setMessageList] = useState([]);
  const [UserOrAI, setUserOrAI] = useState("user"); // whether or not this is robot OR USER
  const [countStop, setCountStop] = useState(0);
//   const { resp, setResp, photoTaken, setPhotoTaken } = useContext(AppContext);
  const navigate = useNavigate();

 

  const sendMessage = async (messageValue, user_author) => {
    // if (currentMessage !== "") {
    const messageData = {
      author: user_author, // whether or not this is robot OR USER
      message: messageValue,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    //   await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    //clear my message console after the message is sent
    //   setCurrentMessage("");
    // }
  };


  return (
    <>
      <div className="chat-window">
        {/* footer */}
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  id={"user" === messageContent.author ? "you" : "other"}
                  className="message"
                >
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>

        <div className="chat-footer">
          <input
            className="speech-text-box"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Ask a question..."
          />

          <button
            className="send-button"
            onClick={() => {
              setUserOrAI("user");
              sendMessage(value, "user");

              // postSpeech().then((reply) => {
              //     console.log("wow")
              // });
              console.log("this should be empty:", value);
            }}
          >
            {" "}
            Send{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
