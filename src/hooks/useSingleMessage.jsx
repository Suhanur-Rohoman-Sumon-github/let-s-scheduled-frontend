import useContexts from "./useContexts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSingleMessage = (email) => {
  const { user } = useContexts();

  const { data: messages = [], refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/message/single-message?emails=${
          email ? email : user?.email
        }`
      );
      return res.data;
    },
  });

  return { messages, refetch };
};

export default useSingleMessage;
