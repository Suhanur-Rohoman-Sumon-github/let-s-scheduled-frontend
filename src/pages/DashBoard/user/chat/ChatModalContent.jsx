/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ChatModal from "../../../../componnents/modal/chat/modal";

import { Link } from "react-router-dom";
import NonUserChatModel from "../../../../componnents/modal/chat/NonUserChatModel";

import LoggedUserChatModal from "../../../../componnents/modal/chat/LoggedUserChatModal";
import useContexts from "../../../../hooks/useContexts";
import { useState } from "react";
const ChatModalContent = ({ isOpen, setIsOpen }) => {
  const [isOpens, setIsOpens] = useState(false);
  const { user } = useContexts();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {user ? (
        <LoggedUserChatModal isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : storedUser ? (
        <LoggedUserChatModal isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <div>
          <ChatModal isOpen={isOpen} setIsOpen={setIsOpen}>
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
