/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ChatModal from "../../../../componnents/modal/chat/modal";
import { FaRocketchat } from "react-icons/fa";
import logo from "../../../../assets/logo.png";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSingleMessage from "../../../../hooks/useSingleMessage";
import axios from "axios";
import { format } from "timeago.js";
import useContexts from "../../../../hooks/useContexts";
import { Link } from "react-router-dom";
import NonUserChatModel from "../../../../componnents/modal/chat/NonUserChatModel";
const ChatModalContent = ({ isOpen, setIsOpen }) => {
  const { user } = useContexts();
  const [isOpens, setIsOpens] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messageId = uuidv4();
  const userName = user?.displayName;
  const userEmail = user?.email;

  const photoUrls = user?.photoURL;

  const sender = "user";
  const content = inputMessage;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const email = storedUser?.userEmail;

  const newMessages = [{ sender, content }];
  const { messages, refetch } = useSingleMessage(user ? userEmail : email);
  const messageData = messages?.data?.messages;
  const isUserSaved = messages?.data?.userEmail;
  const photoUrl = messages?.data?.photoUrls;
  refetch();
  const sendMessage = async () => {
    const subCategory = "unSeen";
    const message = {
      messageId,
      userName,
      userEmail,
      photoUrls,
      subCategory,
      messages: [{ sender, content }],
    };
    if (isUserSaved === undefined) {
      const post = await axios.post(
        "https://lets-sheduleit-backend.vercel.app/api/v1/message/save-message",
        {
          messages: message,
        }
      );
      refetch();
      setInputMessage("");
    } else {
      const patch = await axios.patch(
        `https://lets-sheduleit-backend.vercel.app/api/v1/message/update-message?emails=${
          user ? user?.email : email
        }`,
        {
          newMessage: newMessages,
        }
      );
      refetch();
      setInputMessage("");
    }
  };

  return (
    <>
      {user ? (
        <div className=" relative ">
          <ChatModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className=" max-h-[550px] overflow-y-auto">
              {messageData?.map((message, index) => (
                <div
                  key={index}
                  className={`flex p-2 ${
                    message.sender === "admin" ? "justify-start" : "justify-end"
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
                        message.sender === "admin"
                          ? "text-[#FFF] bg-[#0069ff]"
                          : "text-[#FFF] bg-[#0b3558]"
                      }`}
                    >
                      {message.content}
                    </p>
                    <span
                      className={`text-xs  shadow-2xl rounded-md border  p-1 my-1 ${
                        message.sender === "admin"
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
      ) : storedUser ? (
        <div className=" relative ">
          <ChatModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className=" max-h-[550px] overflow-y-auto">
              {messageData?.map((message, index) => (
                <div
                  key={index}
                  className={`flex p-2 ${
                    message.sender === "admin" ? "justify-start" : "justify-end"
                  } mb-2 gap-2 pl-4`}
                >
                  <img
                    src={message.sender === "user" ? photoUrl : logo}
                    className="h-8 w-8 rounded-full mt-2"
                    alt=""
                  />
                  <div>
                    <p
                      className={`text-xl max-w-[270px] mb-2 shadow-2xl rounded-md py-2 px-4 ${
                        message.sender === "admin"
                          ? "text-[#FFF] bg-[#0069ff]"
                          : "text-[#FFF] bg-[#0b3558]"
                      }`}
                    >
                      {message.content}
                    </p>
                    <span
                      className={`text-xs  shadow-2xl rounded-md border  p-1 my-1 ${
                        message.sender === "admin"
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
      ) : (
        <div>
          <ChatModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-2xl text-[#0066FF] font-bold text-center">
              For any help, please
            </h1>
            <div className="flex items-center gap-2 px-2 mt-28 justify-center">
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full"
              >
                <Link to={"/login"}>Login</Link>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full"
              >
                <Link to={"/signup"}>Sign Up</Link>
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="px-2">
              <button
                onClick={() => {
                  setIsOpens(true);
                  setIsOpen(false);
                }}
                className="btn-primary w-full mx"
              >
                Create anonymous user
              </button>
            </div>
          </ChatModal>
          <NonUserChatModel setIsOpen={setIsOpens} isOpen={isOpens} />
        </div>
      )}
    </>
  );
};

export default ChatModalContent;
