import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllVistors = () => {
  const { data: allVisitors = [], refetch } = useQuery({
    queryKey: ["all-visitors"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/visitor/all-visitors`
      );
      return res.data.data;
    },
  });

  return { allVisitors, refetch };
};

export default useAllVistors;
