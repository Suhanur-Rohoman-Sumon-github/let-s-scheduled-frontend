import { useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import ChatModalContent from "./ChatModalContent";
const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="fixed   md:bottom-0 md:right-16 z-20">
        <button
          onClick={() => setIsOpen(true)}
          className="btn-chat flex items-center gap-1 animate-bounce"
        >
          <FaRocketchat /> chat with us
        </button>
      </div>
      <div>
        <ChatModalContent isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="fixed bottom-8 right-8  md:hidden ">
        <button
          onClick={() => setIsOpen(true)}
          className="btn-chat flex items-center "
        >
          <FaRocketchat />
        </button>
      </div>
    </div>
  );
};

export default Chat;
