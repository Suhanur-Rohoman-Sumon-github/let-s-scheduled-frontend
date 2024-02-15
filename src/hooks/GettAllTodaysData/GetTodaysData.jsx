import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllTodaysSchedule = () => {
  const { data: todaysSchedule = [], refetch } = useQuery({
    queryKey: ["all-todays-schedule"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/events/todays-events`
      );
      return res.data.data;
    },
  });

  return { todaysSchedule, refetch };
};

export { useAllTodaysSchedule };
