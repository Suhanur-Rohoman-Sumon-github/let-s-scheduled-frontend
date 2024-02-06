import ChatModal from "../../../../componnents/modal/chat/modal";
import { FaRocketchat } from "react-icons/fa";
import logo from "../../../../assets/logo.png";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import useSingleMessage from "../../../../hooks/useSingleMessage";

const ChatModalContent = ({ isOpen, setIsOpen }) => {
  //   const socket = io("http://localhost:3000");
  //   socket.on("connect", () => {
  //     console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  //   });
  const [message, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const { messages, refetch } = useSingleMessage();
  console.log(messages);
  if (!messages.data) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const { messages: messageData, photoUrl } = messages.data;

  // Combine and sort messages based on their order or timestamps
  //   const combinedMessages = messageData?.sort((a, b) => {
  //     return new Date(a.timestamp) - new Date(b.timestamp);
  //   });

  //   useEffect(() => {
  //     // Set up listener for incoming messages
  //     socket.on("chat message", (msgData) => {
  //       setMessages((prevMessages) => [...prevMessages, msgData]);
  //     });

  //     // Clean up on unmount
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);
  const sendMessage = () => {
    setMessages(inputMessage);
  };
  return (
    <div className=" relative w-[10px] ">
      <ChatModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className=" max-h-[550px] overflow-y-auto">
          {messageData?.map((message, index) => (
            <div
              key={index}
              className={`flex p-2 rounded-lg border ${
                message.sender === "admin"
                  ? "justify-start mr-32"
                  : "justify-end ml-36"
              } mb-2 gap-2 pl-4`}
            >
              <img
                src={photoUrl}
                className="h-6 w-6 rounded-full mt-1"
                alt=""
              />
              <p
                className={`text-xl  mb-2 max-w-sm ${
                  message.sender === "admin" ? "text-[#0069ff]" : "text-black"
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
