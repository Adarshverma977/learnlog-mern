import { useState } from "react";

import axiosInstance from "../../api/axios";

import toast from "react-hot-toast";


const ForgotPassword = () => {

  const [email, setEmail] =
    useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } =
        await axiosInstance.post(
          "/auth/forgot-password",
          { email }
        );

      toast.success(data.message);

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
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none"
          />


          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 p-5 rounded-2xl font-bold"
          >
            Send Reset Link
          </button>

        </form>

      </div>

    </div>

  );

};

export default ForgotPassword;