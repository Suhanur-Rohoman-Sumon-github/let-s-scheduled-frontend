import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategoryMessages = (subCategory) => {
  const { data: categoryMessages = [], refetch } = useQuery({
    queryKey: ["categoryMessages"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/message/category-message?subCategory=${subCategory}`
      );
      return res.data;
    },
  });

  return { categoryMessages, refetch };
};

export default useCategoryMessages;
