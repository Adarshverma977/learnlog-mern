import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import axiosInstance from "../../api/axios";

import toast from "react-hot-toast";


const ResetPassword = () => {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } =
        await axiosInstance.put(
          `/auth/reset-password/${token}`,
          { password }
        );

      toast.success(data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response.data.message
      );

    }

  };


  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10">

        <h1 className="text-4xl font-black mb-6">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none"
          />


          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 p-5 rounded-2xl font-bold"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>

  );

};

export default ResetPassword;