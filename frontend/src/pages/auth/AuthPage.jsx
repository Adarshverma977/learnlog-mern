import {
  useState,
  useEffect,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useForm,
} from "react-hook-form";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
  registerUser,
} from "../../features/auth/authSlice";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";


const AuthPage = () => {

  const [isLogin, setIsLogin] =
    useState(true);

  const [showPassword, setShowPassword] =
    useState(false);

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    isAuthenticated,
    loading,
  } = useSelector(
    (state) => state.auth
  );


  const {
    register,
    handleSubmit,
    reset,
  } = useForm();


  useEffect(() => {

    if (isAuthenticated) {

      navigate("/");

    }

  }, [isAuthenticated]);


const onSubmit = async (data) => {

  if (isLogin) {

    dispatch(
      loginUser(data)
    );

  } else {

    const result =
      await dispatch(
        registerUser(data)
      );

    if (
      result.meta.requestStatus ===
      "fulfilled"
    ) {

      setIsLogin(true);

    }

  }

  reset();

};


  return (

    <div className="min-h-screen bg-[#f5f3ff] flex items-center justify-center px-6 py-6 overflow-hidden relative">

      {/* BG BLUR */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-300/40 rounded-full blur-[100px]"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-300/40 rounded-full blur-[100px]"></div>


      {/* MAIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-6xl min-h-[650px] bg-white rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden grid lg:grid-cols-2"
      >

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#7c3aed] via-[#8b5cf6] to-[#6366f1] p-10 relative overflow-hidden">

          {/* LOGO */}
          <div className="flex items-center gap-4 text-white">

            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl">

              <span className="text-3xl">
                📘
              </span>

            </div>

            <h2 className="text-4xl font-black">
              LearnLog
            </h2>

          </div>


          {/* TEXT */}
          <div className="relative z-10">

            <h1 className="text-6xl leading-[0.95] font-black text-white">

              Learn.
              <br />
              Track.
              <br />
              Grow. ✨

            </h1>

            <p className="mt-6 text-white/85 text-lg leading-relaxed max-w-sm">

              Track your learning journey,
              boost productivity and
              achieve your goals.

            </p>

          </div>


          {/* IMAGE */}
          <div className="flex justify-center items-center mt-6 relative z-10">

            <img
              src="/auth-image.png"
              alt=""
              className="w-full max-w-[340px] object-contain drop-shadow-2xl"
            />

          </div>


          {/* STATS */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl px-6 py-4 grid grid-cols-3 gap-6 text-white relative z-10">

            <div>

              <h3 className="text-3xl font-black">
                120+
              </h3>

              <p className="text-sm text-white/80 mt-2">
                Learning Sessions
              </p>

            </div>


            <div>

              <h3 className="text-3xl font-black">
                240+
              </h3>

              <p className="text-sm text-white/80 mt-2">
                Hours Studied
              </p>

            </div>


            <div>

              <h3 className="text-3xl font-black">
                95%
              </h3>

              <p className="text-sm text-white/80 mt-2">
                Productivity
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 lg:p-10 bg-white">

          <div className="w-full max-w-[480px]">

            {/* TABS */}
            <div className="bg-[#f3f4f6] rounded-2xl p-2 flex relative mb-8">

              <motion.div
                animate={{
                  x: isLogin
                    ? 0
                    : "100%",
                }}
                transition={{
                  duration: 0.35,
                }}
                className="absolute top-2 left-2 w-[calc(50%-8px)] h-[calc(100%-16px)] bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-xl"
              />


              <button
                onClick={() =>
                  setIsLogin(true)
                }
                className={`relative z-10 flex-1 h-14 rounded-xl font-bold transition-all ${
                  isLogin
                    ? "text-white"
                    : "text-slate-500"
                }`}
              >

                Login

              </button>


              <button
                onClick={() =>
                  setIsLogin(false)
                }
                className={`relative z-10 flex-1 h-14 rounded-xl font-bold transition-all ${
                  !isLogin
                    ? "text-white"
                    : "text-slate-500"
                }`}
              >

                Register

              </button>

            </div>


            {/* TITLE */}
            <div className="mb-8">

              <h1 className="text-5xl font-black text-[#111827] leading-tight">

                {isLogin
                  ? "👋 Welcome Back!"
                  : "🚀 Create Account"}

              </h1>

              <p className="text-slate-500 mt-3 text-lg">

                {isLogin
                  ? "Login to continue your learning journey."
                  : "Start your learning journey today."}

              </p>

            </div>


            {/* FORM */}
            <AnimatePresence mode="wait">

              <motion.form
                key={isLogin}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.3,
                }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >

                {/* NAME */}
                {!isLogin && (

                  <div className="flex items-center gap-4 border border-slate-200 rounded-2xl px-6 h-16 focus-within:border-[#8b5cf6] transition-all">

                    <User className="text-slate-400" />

                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full h-full outline-none text-[#111827]"
                      {...register("name")}
                    />

                  </div>

                )}


                {/* EMAIL */}
                <div className="flex items-center gap-4 border border-slate-200 rounded-2xl px-6 h-16 focus-within:border-[#8b5cf6] transition-all">

                  <Mail className="text-slate-400" />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-full outline-none text-[#111827]"
                    {...register("email")}
                  />

                </div>


                {/* PASSWORD */}
                <div className="flex items-center gap-4 border border-slate-200 rounded-2xl px-6 h-16 focus-within:border-[#8b5cf6] transition-all">

                  <Lock className="text-slate-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    className="w-full h-full outline-none text-[#111827]"
                    {...register("password")}
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="text-slate-400 hover:text-slate-600"
                  >

                    {showPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}

                  </button>

                </div>


                {/* FORGOT */}
                {isLogin && (

                  <div className="flex justify-end">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/forgot-password"
                        )
                      }
                      className="text-[#7c3aed] font-semibold hover:text-[#6d28d9]"
                    >

                      Forgot Password?

                    </button>

                  </div>

                )}


                {/* BUTTON */}
                <button
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:opacity-90 transition-all text-white text-lg font-bold flex items-center justify-center gap-3 shadow-xl"
                >

                  {loading
                    ? "Please wait..."
                    : isLogin
                    ? "Login"
                    : "Create Account"}

                  <ArrowRight size={20} />

                </button>

              </motion.form>

            </AnimatePresence>


            {/* FOOTER */}
            <p className="text-center mt-6 text-slate-500 text-base">

              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() =>
                  setIsLogin(
                    !isLogin
                  )
                }
                className="ml-2 text-[#7c3aed] font-bold hover:text-[#6d28d9]"
              >

                {isLogin
                  ? "Register"
                  : "Login"}

              </button>

            </p>

          </div>

        </div>

      </motion.div>

    </div>

  );

};

export default AuthPage;
