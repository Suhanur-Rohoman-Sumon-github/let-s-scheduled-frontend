import axios from "axios";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { format } from "timeago.js";
import logo from "../../assets/logo.png";
/* eslint-disable react/prop-types */
const ModaretorMainChat = ({ messages, refetch }) => {
  const [inputMessage, setInputMessage] = useState("");

  const messageData = messages?.data?.messages;
  const photoUrls = messages?.data?.photoUrls;
  const email = messages?.data?.userEmail;
  const sender = "admin";
  const content = inputMessage;
  const newMessages = [{ sender, content }];
  const sendMessage = async () => {
    const patch = await axios.patch(
      `http://localhost:3000/api/v1/message/update-message?emails=${email}`,
      {
        newMessage: newMessages,
        subcategory: "myOpen",
      }
    );

    refetch();
    setInputMessage("");
  };
  const handleMakeSolved = async () => {
    const patch = await axios.patch(
      `http://localhost:3000/api/v1/message/update-message?emails=${email}`,
      {
        subcategory: "solved",
      }
    );

    refetch();
  };
  return (
    <div>
      <div className="flex gap-x-3 mb-10 shadow-sm shadow-gray-200 p-5 justify-between">
        <div className="flex items-center gap-4">
          <img
            src={messages?.data?.photoUrls}
            className="h-10 w-10 rounded-full ml-4"
            alt=""
          />

          <h1 className="text-xl font-bold text-gray-500 ">
            {messages?.data?.userName}
          </h1>
        </div>
        <button onClick={handleMakeSolved} className="btn-primary">
          make as a solved
        </button>
      </div>
      <div>
        <div className=" max-h-[450px] overflow-y-auto w-9/12 mx-auto">
          {messageData?.map((message, index) => (
            <div
              key={index}
              className={`flex p-2  ${
                message.sender === "user" ? "justify-start " : "justify-end"
              } mb-2 gap-2 pl-4`}
            >
              <img
                src={message.sender === "user" ? photoUrls : logo}
                className="h-8 w-8 rounded-full mt-2"
                alt=""
              />
              <div>
                <p
                  className={`text-xl max-w-[270px] mb-2 shadow-2xl rounded-md py-2 px-4 ${
                    message.sender === "user"
                      ? "text-[#FFF] bg-[#0069ff]"
                      : "text-[#FFF] bg-[#0b3558]"
                  }`}
                >
                  {message.content}
                </p>
                <span
                  className={`text-xs  shadow-2xl rounded-md border  p-1 my-1 ${
                    message.sender === "user"
                      ? "text-[#0069ff] "
                      : "text-[#0b3558] "
                  }`}
                >
                  {format(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 w-[50%] left-[30rem]">
          <div className=" relative">
            <input
              className="input ml-[250px] w-full"
              type="text"
              placeholder="Enter your message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 text-3xl hover:bg-gray-200 p-1 rounded-md transition-all duration-200 flex justify-center items-center absolute -right-60 top-1"
            >
              <IoIosSend></IoIosSend>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModaretorMainChat;
