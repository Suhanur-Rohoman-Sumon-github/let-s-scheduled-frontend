import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllTodaysSchedule = () => {
  const { data: todaysSchedule = [], refetch } = useQuery({
    queryKey: ["all-todays-schedule"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/events/todays-events`
      );
      console.log(res.data);
      return res.data;
    },
  });

  return { todaysSchedule, refetch };
};
const useAllTodaysVisitors = () => {
  const { data: todaysVisitors = [], refetch } = useQuery({
    queryKey: ["all-todaysVisitors"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/visitor/todays-visitor`
      );
      return res.data.data;
    },
  });

  return { todaysVisitors, refetch };
};

const useUnseens = (transact) => {
  const { data: unSeen = [], refetch: unSeenRefetch } = useQuery({
    queryKey: ["unseens", transact],
    queryFn: async () => {
      const response = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/message/category-message?subCategory=unSeen&transact=${transact}`
      );
      return response.data.data;
    },
  });

  return { unSeen, unSeenRefetch };
};

const useMyOpenes = (transact) => {
  const { data: myOpen = [], refetch: myOpenRefetch } = useQuery({
    queryKey: ["myOpenes", transact],
    queryFn: async () => {
      const response = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/message/category-message?subCategory=myOpen&transact=${transact}`
      );
      return response.data.data;
    },
  });

  return { myOpen, myOpenRefetch };
};

const useSolvedes = (transact) => {
  const { data: solved = [], refetch: solvedRefetch } = useQuery({
    queryKey: ["solvedes", transact],
    queryFn: async () => {
      const response = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/message/category-message?subCategory=solved&transact=${transact}`
      );
      return response.data.data;
    },
  });

  return { solved, solvedRefetch };
};

const useAllTodaysUsers = () => {
  const { data: todaysAllUsers = [], refetch } = useQuery({
    queryKey: ["todaysAllUsers"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/users/get-all-Todays-user`
      );
      console.log(res);
      return res.data;
    },
  });

  return { todaysAllUsers, refetch };
};
const useAllTodaysMessage = () => {
  const { data: todaysAllMessage = [], refetch } = useQuery({
    queryKey: ["todaysAllMessage"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/users/get-all-Todays-user`
      );

      return res.data;
    },
  });

  return { todaysAllMessage, refetch };
};
const useAllTodaysProUser = () => {
  const { data: todaysAllProUser = [], refetch } = useQuery({
    queryKey: ["todaysAllProUser"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/users/get-all-Todays-pro-user`
      );

      return res.data;
    },
  });

  return { todaysAllProUser, refetch };
};
const useAllTodaysPayments = () => {
  const { data: todaysAllPayments = [], refetch } = useQuery({
    queryKey: ["todaysAllPayments"],
    queryFn: async () => {
      const res = await axios.get(
        `https://lets-sheduleit-backend.vercel.app/api/v1/payments/todays-payments`
      );

      return res.data;
    },
  });

  return { todaysAllPayments, refetch };
};

export {
  useAllTodaysSchedule,
  useAllTodaysVisitors,
  useSolvedes,
  useMyOpenes,
  useUnseens,
  useAllTodaysUsers,
  useAllTodaysMessage,
  useAllTodaysProUser,
  useAllTodaysPayments,
};
