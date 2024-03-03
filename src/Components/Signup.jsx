import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
const Signup = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    companyName: "",
    jobTitle: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        "http://localhost:3003/v1/auth/register",
        details
      );
      console.log(result.data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-50 text-black flex flex-col w-[325px] py-7 rounded-md">
      <header className="flex flex-col items-center mb-6 gap-2 text-center">
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <p className="font-semibold  text-slate-600 mx-3">
          Enter your information to create an account
        </p>
      </header>
      <form className="flex flex-col gap-4 items-center mx-7">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Name</label>
            <input
              value={details.name}
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="john Doe"
              className="py-2 px-2 rounded-md bg-white w-[240px] border-slate-300 border-[1px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Email</label>
            <input
              value={details.email}
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="John@example.com"
              className="py-2 px-2 rounded-md bg-white w-[240px] border-slate-300 border-[1px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Company Name</label>
            <input
              value={details.companyName}
              onChange={handleInputChange}
              name="companyName"
              type="text"
              placeholder="Technology"
              className="py-2 px-2 rounded-md bg-white w-[240px] border-slate-300 border-[1px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Job Title</label>
            <input
              value={details.jobTitle}
              onChange={handleInputChange}
              name="jobTitle"
              type="text"
              placeholder="Full-stack Developer"
              className="py-2 px-2 rounded-md bg-white w-[240px] border-slate-300 border-[1px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Password</label>
            <input
              value={details.password}
              onChange={handleInputChange}
              name="password"
              type="text"
              placeholder="*****"
              className="py-2 px-2 rounded-md bg-white w-[240px] border-slate-300 border-[1px]"
            />
          </div>
        </div>
        {loading ? (
          <ScaleLoader color="black" />
        ) : (
          <button
            className="text-center w-full bg-black text-white py-2 text-sm font-semibold rounded-md"
            // type="submit"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        )}
        <Link to={"/signin"}>
          <span className="text-sm font-semibold">
            Already have an account ? Login
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
