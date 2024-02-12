/* eslint-disable react/prop-types */
import useAllMessages from "../../hooks/useAllMessages";

const MessageSidebar = ({ setEmail, refetches }) => {
  const { allMessage, refetch } = useAllMessages();
  const handleSpecificData = (email) => {
    refetch();
    setEmail(email);
    refetches();
  };
  return (
    <div className="overflow-y-auto no-scrollbar w-56 mr-5 bg-base-200 h-screen">
      {allMessage?.data?.map((message) => (
        <div
          onClick={() => handleSpecificData(message?.userEmail)}
          className="flex items-center gap-x-4 border-b-2 p-2 cursor-pointer mt-1 mb-2 hover:bg-gray-200 transition-all duration-200"
          key={message.messageId}
        >
          <img
            src={message?.photoUrls}
            className="h-8 w-8 rounded-full "
            alt=""
          />
          <h1 className="text-xs font-bold text-black ">{message?.userName}</h1>
        </div>
      ))}
    </div>
  );
};

export default MessageSidebar;
