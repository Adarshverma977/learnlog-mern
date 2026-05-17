import {
  X,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  logout,
} from "../../features/auth/authSlice";

import {
  motion,
} from "framer-motion";


const MobileSidebar = ({
  open,
  setOpen,
}) => {

  const dispatch =
    useDispatch();

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden">

      <motion.div
        initial={{
          x: -300,
        }}
        animate={{
          x: 0,
        }}
        className="w-72 min-h-screen bg-[#0f172a] border-r border-white/10 p-6"
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">

          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            LearnLog
          </h1>


          <button
            onClick={() =>
              setOpen(false)
            }
          >

            <X />

          </button>

        </div>


        {/* LINKS */}
        <div className="space-y-4">

          <NavLink
            to="/"
            onClick={() =>
              setOpen(false)
            }
            className={({ isActive }) =>
              `flex items-center gap-4 p-5 rounded-2xl transition-all font-semibold ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500"
                  : "bg-white/5"
              }`
            }
          >

            <LayoutDashboard />

            Dashboard

          </NavLink>


          <NavLink
            to="/profile"
            onClick={() =>
              setOpen(false)
            }
            className={({ isActive }) =>
              `flex items-center gap-4 p-5 rounded-2xl transition-all font-semibold ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500"
                  : "bg-white/5"
              }`
            }
          >

            <User />

            Profile

          </NavLink>


          <button
            onClick={() =>
              dispatch(logout())
            }
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-red-500 mt-10"
          >

            <LogOut />

            Logout

          </button>

        </div>

      </motion.div>

    </div>

  );

};

export default MobileSidebar;