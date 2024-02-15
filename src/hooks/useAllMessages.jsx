import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllMessages = () => {
  const { data: allMessage = [], refetch } = useQuery({
    queryKey: ["all-message"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/message/all-message`
      );
      return res.data;
    },
  });

  return { allMessage, refetch };
};

export default useAllMessages;
