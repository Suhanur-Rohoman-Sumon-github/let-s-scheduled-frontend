import { useQuery } from "@tanstack/react-query";
import useContexts from "./useContexts";
import axios from "axios";

// help to fech the isAdmin data

const useIsModerator = () => {
  const { user } = useContexts();

  const { data: isModerator = false, refetch } = useQuery({
    queryKey: ["isModerator"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/get-isModerator?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { isModerator, refetch };
};

export default useIsModerator;
