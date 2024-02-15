import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllVistors = () => {
  const { data: allVisitors = [], refetch } = useQuery({
    queryKey: ["all-visitors"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/visitor/all-visitors`
      );
      return res.data.data;
    },
  });

  return { allVisitors, refetch };
};

export default useAllVistors;
