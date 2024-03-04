import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ScaleLoader } from "react-spinners";
import useLoggedUser from "../hooks/userLoggedUser";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { PaperClipIcon } from '@heroicons/react/20/solid'

const Jobs = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const { user, isLoading } = useLoggedUser(localStorage.getItem("token"));
  const [jobDetails, setJobDetails] = useState([]);

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

        // Make another API call to fetch user details
        const userRes = await axios.get(
          `http://localhost:3003/v1/users/${userId}`,
          config
        );
        setUserName(userRes.data.name);

        const jobDetailsRes = await axios.get(
          `http://localhost:3003/v1/jobs/${params.id}`,
          config
        );
        console.log(jobDetailsRes.data);
        setJobDetails([jobDetailsRes.data]);
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
              jobDetails.map((jobDetail) => (
                <div
                  key={jobDetail.id}
                  className="p-4 my-5 border rounded border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer"
                >
                  <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Job Information
                    </h3>
                  </div>
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Posted By
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.postedBy.name}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Application for
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.title}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Company Name
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.companyName}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Company Site
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a>
                          {jobDetail.companyLink}
                          </a>
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.postedBy.email}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Salary expectation
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.salaryRange}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Experience Level
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.experienceLevel}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Description
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.description}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Skills
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {jobDetail.skills.join(", ")}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Contact Links
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <ul
                            role="list"
                            className="divide-y divide-gray-100 rounded-md border border-gray-200"
                          >
                            {jobDetail.contactLink.map((link, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                              >
                                <div className="flex w-0 flex-1 items-center">
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="truncate font-medium">
                                      {link}
                                    </span>
                                  </a>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href={link}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Contact
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
