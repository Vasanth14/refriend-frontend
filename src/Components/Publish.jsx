import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ScaleLoader } from "react-spinners";
import useLoggedUser from "../hooks/userLoggedUser";
import axios from "axios";

const Publish = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const { user, isLoading } = useLoggedUser(localStorage.getItem("token"));
  const [skills, setSkills] = useState([""]);
  const [contactLinks, setContactLinks] = useState([""]);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    companyName: "",
    companyLink: "",
    salaryRange: "",
    experienceLevel: "",
    skills: [],
    contactLinks: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleAddSkills = (event) => {
    event.preventDefault();
    setSkills([...skills, ""]);
  };
  

  const handleChangeSkill = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    setJobData({...jobData, skills: newSkills});
  };

  const handleAddContacts = (event) => {
    event.preventDefault();
    setContactLinks([...contactLinks, ""])
  };

  const handleChangeContacts = (index, value) => {
    const newContacts = [...contactLinks];
    newContacts[index] = value;
    setContactLinks(newContacts);
    setJobData({...jobData, contactLinks: newContacts});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3003/v1/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("Job published successfully!");
      window.location.href = "/";
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="p-5">
        <div className="flex justify-center">
          <div>
            {loading ? (
              <ScaleLoader color="black" />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Find Your Next Team Member
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Share the details of your job opportunity to connect with
                      potential candidates.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Job Title
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              autoComplete="title"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Full Stack Developer"
                              value={jobData.title}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Description
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                            // defaultValue={""}
                            value={jobData.description}
                            onChange={handleInputChange}
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Write a few sentences about the JD.
                        </p>
                      </div>

                      {/* <div className="col-span-full">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-400 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div> */}

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Company Name
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                            <input
                              type="text"
                              name="companyName"
                              id="name"
                              autoComplete="name"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Google inc."
                              value={jobData.companyName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="site"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Company Site
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                            <input
                              type="text"
                              name="companyLink"
                              id="site"
                              autoComplete="site"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="jobs.google.com"
                              value={jobData.companyLink}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="salary"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Salary Budget
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                            <input
                              type="text"
                              name="salaryRange"
                              id="salary"
                              autoComplete="salary"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="jobs.google.com"
                              value={jobData.salaryRange}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Experience Required
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                            <input
                              type="text"
                              name="experienceLevel"
                              id="experience"
                              autoComplete="experience"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="jobs.google.com"
                              value={jobData.experienceLevel}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="skills"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Skills Required
                        </label>
                        <div className="mt-2" id="skills-container">
                          {skills.map((skill, index) => (
                            <div
                              key={index}
                              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md"
                            >
                              <input
                                type="text"
                                name="skills[]"
                                autoComplete="skills"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Enter skill"
                                value={skill}
                                onChange={(event) =>
                                  handleChangeSkill(index, event.target.value)
                                }
                              />
                            </div>
                          ))}
                          <button
                            className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded hover:bg-indigo-600"
                            onClick={handleAddSkills}
                          >
                            Add Skill
                          </button>
                        </div>
                      </div>

                      {/* Contact Links */}
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="contact"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Contact Links
                        </label>
                        <div className="mt-2" id="contact-container">
                          {contactLinks.map((contactLink, index) => (
                            <div
                              key={index}
                              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md"
                            >
                              <input
                                type="text"
                                name="contactlinks[]"
                                autoComplete="contactlinks"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Enter contact links"
                                value={contactLink}
                                onChange={(event) =>
                                  handleChangeContacts(index, event.target.value)
                                }
                              />
                            </div>
                          ))}
                          <button
                            className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded hover:bg-indigo-600"
                            onClick={handleAddContacts}
                          >
                            Add Contact Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;