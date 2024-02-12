import { useQuery } from "@tanstack/react-query";
import useContexts from "./useContexts";
import axios from "axios";

// help to fech the isAdmin data

const useIsUser = () => {
  const { user } = useContexts();

  const { data: isUser = false, refetch } = useQuery({
    queryKey: ["isUser"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/get-isUser?email=${user?.email}`
      );
      return res.data;
    },
  });

  return { isUser, refetch };
};

export default useIsUser;
