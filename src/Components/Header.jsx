import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import useLoggedUser from "../hooks/userLoggedUser";
import DropDown from "./DropDown";

const Header = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const { user, isLoading } = useLoggedUser(localStorage.getItem("token"));
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get("http://localhost:3003/v1/jobs", config);
        setJobs(res.data.results);

        // Make another API call to fetch user details
        const userRes = await axios.get(
          `http://localhost:3003/v1/users/${userId}`,
          config
        );
        setUserName(userRes.data.name);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [user?.id]);

  return (
    <header className="flex items-center justify-between border-b-[1px] border-slate p-5">
      <Link to="/" className="font-bold text-2xl">
        ReFriend
      </Link>
      <div className="flex gap-3 items-center ">
        <p className="font-semibold">Hello, {!isLoading && userName}</p>
        <div className="relative">
          <span
            className="bg-slate-100 h-12 w-12 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => setShowDropDown((s) => !s)}
          >
            {!isLoading && userName && userName[0].toUpperCase()}
          </span>
          <DropDown showDropDown={showDropDown} />
        </div>
      </div>
    </header>
  );
};

export default Header;
