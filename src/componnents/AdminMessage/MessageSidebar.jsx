import useAllMessages from "../../hooks/useAllMessages";

const MessageSidebar = ({ setEmail, refetches }) => {
  const { allMessage, refetch } = useAllMessages();
  const handleSpecificData = (email) => {
    refetch();
    setEmail(email);
    refetches();
  };
  return (
    <div className="h-[570px]  ">
      {allMessage?.data?.map((message) => (
        <div
          onClick={() => handleSpecificData(message?.userEmail)}
          className="flex items-center gap-x-4 border shadow-2xl cursor-pointer mx-4 mt-1 border-[#0069FF] pt-4 p-4 "
          key={message.messageId}
        >
          <img
            src={message?.photoUrls}
            className="h-8 w-8 rounded-full "
            alt=""
          />
          <h1 className="text-xs font-bold text-[#0066FF] ">
            {message?.userName}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default MessageSidebar;
