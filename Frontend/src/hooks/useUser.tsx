import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "../interfaces/User";
import axios from "axios";

const fetchUser = async (): Promise<UserResponse | null> => {
  const response = await axios.get<UserResponse>(
    `${import.meta.env.VITE_G_API_URL}/check-auth`,
    { withCredentials: true }
  );
  const result = response.data;

  if (!result.authenticated) {
    console.log("User is not authenticated");
    return null;
  }

  return result;
};

export const useUser = () => {
  return useQuery<UserResponse | null, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false, // Don't retry on error
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};
