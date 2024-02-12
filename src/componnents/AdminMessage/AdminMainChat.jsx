/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

import logo from "../../assets/logo.png";
const AdminMainChat = ({ messages, refetch }) => {
  const [inputMessage, setInputMessage] = useState("");

  const messageData = messages?.data?.messages;
  const photoUrls = messages?.data?.photoUrls;
  const email = messages?.data?.userEmail;
  const sender = "admin";
  const content = inputMessage;
  const newMessages = [{ sender, content }];
  const sendMessage = async () => {
    const patch = await axios.patch(
      `https://lets-sheduleit-backend.vercel.app/api/v1/message/update-message?emails=${email}`,
      {
        newMessage: newMessages,
      }
    );

    refetch();
    setInputMessage("");
  };
  return (
    <div>
      <div className="flex gap-x-3 mb-10 shadow-sm shadow-gray-200 p-5">
        <img
          src={messages?.data?.photoUrls}
          className="h-10 w-10 rounded-full ml-4"
          alt=""
        />
        <h1 className="text-xl font-bold text-gray-500 ">
          {messages?.data?.userName}
        </h1>
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
              <p
                className={`text-xl  max-w-[270px] mb-2  rounded-md py-2 px-4 ${
                  message.sender === "user"
                    ? "text-[#FFF] bg-[#0069ff] shadow-2xl"
                    : "text-[#FFF] bg-[#0b3558] "
                }`}
              >
                {message.content}
              </p>
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

export default AdminMainChat;
