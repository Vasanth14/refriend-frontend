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
      <div className="p-5 text-center">
        <div className="flex justify-center">
          <div>
            {loading ? (
              <ScaleLoader color="black" />
            ) : (
              jobs.map((job) => (
                <Link to={`/jobs/${job.id}`} key={job.id}>
                  <div className="flex justify-center my-5">
                    <div class="w-full sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-6 h-6">
                          <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">
                            {job.postedBy.name.charAt(0).toLowerCase()}
                          </span>
                        </div>
                        <div className="font-extralight text-white pl-2 text-sm flex justify-center flex-col my-3">
                          {job.postedBy.name}
                        </div>
                        <div className="flex justify-center flex-col pl-2">
                          <div className="h-1 w-1 rounded-full bg-slate-500"></div>
                        </div>
                        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                          {new Date(job.postedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {job.title}
                        </h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {job.description}
                      </p>
                      <div className="flex justify-around my-5">
                        <div className="text-gray-700 dark:text-gray-400">CTC : {job.salaryRange}</div>
                        <div className="text-gray-700 dark:text-gray-400">Exp : {job.experienceLevel}</div>
                      </div>
                      <a
                        href="#"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
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
