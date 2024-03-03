import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import useLoggedUser from "../hooks/userLoggedUser";
import DropDown from "./DropDown";
import Header from "./Header";

const Dashboard = () => {
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
    <div className="h-full bg-white text-black">
      <Header />
      {/* <header className="flex items-center justify-between border-b-[1px] border-slate p-5">
        <h1 className="font-bold text-2xl">ReFriend</h1>
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
      </header> */}
      <div className="p-5 text-center">
        <div className="flex justify-center">
          <div>
            {loading ? (
              <ScaleLoader color="black" />
            ) : (
              jobs.map((job) => (
                <Link to={`/jobs/${job.id}`} key={job.id}>
                  <div className="p-4 my-5 border rounded border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">
                    <div className="flex items-center">
                      <div className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-6 h-6">
                        <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">
                          {job.postedBy.name.charAt(0).toLowerCase()}
                        </span>
                      </div>
                      <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                        {job.postedBy.name}
                      </div>
                      <div className="flex justify-center flex-col pl-2">
                        <div className="h-1 w-1 rounded-full bg-slate-500"></div>
                      </div>
                      <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                        {new Date(job.postedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-xl font-semibold pt-2">
                      {job.title}
                    </div>
                    <div className="text-md font-thin">{job.description}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
