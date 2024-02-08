import { useEffect, useState } from "react";
import MessageSidebar from "../../../../componnents/AdminMessage/MessageSidebar";
import useSingleMessage from "../../../../hooks/useSingleMessage";
import AdminMainChat from "../../../../componnents/AdminMessage/AdminMainChat";

const Message = () => {
  const [email, setEmail] = useState("");

  const { messages, refetch } = useSingleMessage(email);
  useEffect(() => {
    refetch();
  }, [email, refetch]);

  return (
    <div className="overflow-x-hidden">
      <div className=" flex gap-4 mt-4 ">
        <div className="  items-center w-[20%] border ">
          <MessageSidebar refetches={refetch} setEmail={setEmail} />
        </div>
        <div className="  w-9/12 ">
          <AdminMainChat messages={messages} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default Message;
