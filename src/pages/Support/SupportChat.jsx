import { useEffect, useState } from "react";
import useSingleMessage from "../../hooks/useSingleMessage";
import ModaretorChat from "../../componnents/modaretorMessage/ModaretorChat";
import ModaretorMainChat from "../../componnents/modaretorMessage/ModaretorMainChat";
import { useParams } from "react-router";

const SupportChat = () => {
  const [email, setEmail] = useState("");
  const { subCategory } = useParams();
  console.log(subCategory);
  const { messages, refetch } = useSingleMessage(email);
  useEffect(() => {
    refetch();
  }, [email, refetch]);
  console.log(messages);
  return (
    <div className="overflow-x-hidden">
      <div className=" flex gap-4 mt-4 ">
        <div className="  items-center w-[20%] border ">
          <ModaretorChat
            subCategory={subCategory}
            refetches={refetch}
            setEmail={setEmail}
          />
        </div>
        <div className="  w-9/12 ">
          <ModaretorMainChat messages={messages} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
