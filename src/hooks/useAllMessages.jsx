import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllMessages = () => {
  const { data: allMessage = [], refetch } = useQuery({
    queryKey: ["all-message"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/message/all-message`
      );
      return res.data;
    },
  });

  return { allMessage, refetch };
};

export default useAllMessages;
