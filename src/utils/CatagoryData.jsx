import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useIsModerator from "../hooks/useIsModerator";
import Loading from "../componnents/loading/Loading";
import { NavLink } from "react-router-dom";

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

export { useSolvedes, useMyOpenes, useUnseens };
