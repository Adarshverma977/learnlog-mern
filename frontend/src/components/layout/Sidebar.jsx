import {
  LayoutDashboard,
  User,
  BookOpen,
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


const Sidebar = () => {

  const dispatch =
    useDispatch();

  return (

    <div className="hidden lg:flex flex-col w-72 min-h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl p-6">

      {/* LOGO */}
      <div>

        <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          LearnLog
        </h1>

        <p className="text-slate-400 mt-2">
          Smart Learning Tracker
        </p>

      </div>


      {/* NAVIGATION */}
      <div className="mt-14 space-y-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 p-5 rounded-2xl transition-all font-semibold ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg"
                : "bg-white/5 hover:bg-white/10"
            }`
          }
        >

          <LayoutDashboard />

          Dashboard

        </NavLink>


        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 p-5 rounded-2xl transition-all font-semibold ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg"
                : "bg-white/5 hover:bg-white/10"
            }`
          }
        >

          <User />

          Profile

        </NavLink>

      </div>


      {/* LOGOUT */}
      <div className="mt-auto">

        <button
          onClick={() =>
            dispatch(logout())
          }
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all p-5 rounded-2xl font-bold cursor-pointer"
        >

          <LogOut />

          Logout

        </button>

      </div>

    </div>

  );

};

export default Sidebar;