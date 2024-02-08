/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { FaRocketchat } from "react-icons/fa";
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
      `http://localhost:3000/api/v1/message/update-message?emails=${email}`,
      {
        newMessage: newMessages,
      }
    );

    refetch();
    setInputMessage("");
  };
  return (
    <div className="border ">
      <div className="   ">
        <div className="flex items-center gap-x-4 mt-4 justify-center">
          <img
            src={messages?.data?.photoUrls}
            className="h-14 w-14 rounded-full ml-4"
            alt=""
          />
          <h1 className="text-xl font-bold text-[#0069ff] ">
            {messages?.data?.userName}
          </h1>
        </div>
        <div>
          <div className=" max-h-[450px] overflow-y-auto">
            {messageData?.map((message, index) => (
              <div
                key={index}
                className={`flex p-2  ${
                  message.sender === "user" ? "justify-start " : "justify-end "
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
          <div className="flex items-center  gap-2 absolute bottom-4 border  w-9/12">
            <input
              className="input input-bordered ml-[250px] w-[400px]"
              type="text"
              placeholder="Enter your message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="btn-chat">
              <FaRocketchat />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainChat;
