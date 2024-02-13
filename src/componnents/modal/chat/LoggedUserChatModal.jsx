import { useState } from "react";
import useContexts from "../../../hooks/useContexts";
import useSingleMessage from "../../../hooks/useSingleMessage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ChatModalContent from "../../../pages/DashBoard/user/chat/ChatModalContent";
import { IoIosSend } from "react-icons/io";
const LoggedUserChatModal = ({ isOpen, setIsOpen }) => {
  // const { user } = useContexts();

  // const [inputMessage, setInputMessage] = useState("");
  // const messageId = uuidv4();
  // const userName = user?.displayName;
  // const userEmail = user?.email;
  // const photoUrls = user?.photoURL;

  // const sender = "user";
  // const content = inputMessage;
  // const message = {
  //   messageId,
  //   userName,
  //   userEmail,
  //   photoUrls,
  //   messages: [{ sender, content }],
  // };

  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const email = storedUser?.userEmail;
  // const newMessages = [{ sender, content }];
  // const { messages, refetch } = useSingleMessage(user ? userEmail : email);
  // const messageData = messages?.data?.messages;
  // const isUserSaved = messages?.data?.userEmail;
  // const photoUrl = messages?.data?.photoUrls;
  // const names = messages?.data?.userName;
  // refetch();
  // const sendMessage = async () => {
  //   if (!storedUser) {
  //     const post = await axios.post(
  //       "https://lets-sheduleit-backend.vercel.app/api/v1/message/save-message",
  //       {
  //         messages: message,
  //       }
  //     );
  //   }

  //   if (isUserSaved || storedUser) {
  //     const patch = await axios.patch(
  //       `https://lets-sheduleit-backend.vercel.app/api/v1/message/update-message?emails=${
  //         user ? user?.email : email
  //       }`,
  //       {
  //         newMessage: newMessages,
  //       }
  //     );
  //   }

  //   refetch();
  //   setInputMessage("");
  // };
  return (
    <div className=" relative ">
      {/* <ChatModalContent name={names} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className=" max-h-[490px] overflow-y-auto">
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
            <IoIosSend />
          </button>
        </div>
      </ChatModalContent> */}
    </div>
  );
};

export default LoggedUserChatModal;
