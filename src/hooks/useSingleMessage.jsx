import useContexts from "./useContexts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSingleMessage = () => {
  const { user } = useContexts();

  const { data: messages = [], refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/message/single-message?emails=${user?.email}`
      );
      return res.data;
    },
  });

  return { messages, refetch };
};

export default useSingleMessage;
