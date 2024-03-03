import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms";
function useLoggedUser(token) {
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("userId");
        const result = await axios.get(
          `http://localhost:3003/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, []);
  return { user, isLoading };
}

export default useLoggedUser;
