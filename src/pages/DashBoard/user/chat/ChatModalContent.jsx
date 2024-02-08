/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ChatModal from "../../../../componnents/modal/chat/modal";
import { FaRocketchat } from "react-icons/fa";
import logo from "../../../../assets/logo.png";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSingleMessage from "../../../../hooks/useSingleMessage";
import axios from "axios";
import useContexts from "../../../../hooks/useContexts";

const ChatModalContent = ({ isOpen, setIsOpen }) => {
  const { user } = useContexts();
  const [inputMessage, setInputMessage] = useState("");
  const messageId = uuidv4();
  const userName = user?.displayName;
  const userEmail = user?.email;
  const photoUrls = user?.photoURL;
  const sender = "user";
  const content = inputMessage;
  const message = {
    messageId,
    userName,
    userEmail,
    photoUrls,
    messages: [{ sender, content }],
  };
  const newMessages = [{ sender, content }];
  const { messages, refetch } = useSingleMessage();
  const messageData = messages?.data?.messages;
  const isUserSaved = messages?.data?.userEmail;
  const sendMessage = async () => {
    const post = await axios.post(
      "https://lets-sheduleit-backend.vercel.app/api/v1/message/save-message",
      {
        messages: message,
      }
    );

    if (isUserSaved) {
      const patch = await axios.patch(
        `https://lets-sheduleit-backend.vercel.app/api/v1/message/update-message?emails=${user?.email}`,
        {
          newMessage: newMessages,
        }
      );
    }
    refetch();
    setInputMessage("");
  };
  return (
    <div className=" relative  ">
      <ChatModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className=" max-h-[550px] overflow-y-auto">
          {messageData?.map((message, index) => (
            <div
              key={index}
              className={`flex p-2  ${
                message.sender === "admin" ? "justify-start " : "justify-end"
              } mb-2 gap-2 pl-4`}
            >
              <img
                src={message.sender === "user" ? photoUrls : logo}
                className="h-8 w-8 rounded-full mt-2"
                alt=""
              />
              <p
                className={`text-xl  max-w-[270px] mb-2 shadow-2xl rounded-md py-2 px-4 ${
                  message.sender === "admin"
                    ? "text-[#FFF] bg-[#0069ff] "
                    : "text-[#FFF] bg-[#0b3558] "
                }`}
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 absolute bottom-0 left-8 w-full">
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="Enter your message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={sendMessage} className="btn-chat">
            <FaRocketchat />
          </button>
        </div>
      </ChatModal>
    </div>
  );
};

export default ChatModalContent;
