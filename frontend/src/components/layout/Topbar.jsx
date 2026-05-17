import {
  Bell,
  Search,
} from "lucide-react";

import {
  useSelector,
} from "react-redux";


const Topbar = () => {

  const { user } =
    useSelector(
      (state) => state.auth
    );


  const currentHour =
    new Date().getHours();

  let greeting =
    "Good Evening";

  if (currentHour < 12) {

    greeting =
      "Good Morning";

  } else if (
    currentHour < 18
  ) {

    greeting =
      "Good Afternoon";

  }


  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );


  return (

    <div className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 mb-10">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* LEFT */}
        <div>

          <h2 className="text-4xl font-black">

            {greeting},{" "}

            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">

              {user?.name}

            </span>

          </h2>

          <p className="text-slate-400 mt-3">

            {today}

          </p>

        </div>


        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5">

            <Search
              className="text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent p-4 outline-none w-52"
            />

          </div>


          {/* NOTIFICATION */}
          <button className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">

            <Bell size={22} />

          </button>


          {/* PROFILE */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">

            <img
              src={
                user?.profilePhoto
                  ? `http://localhost:5000/${user.profilePhoto}`
                  : "https://i.pravatar.cc/150?img=12"
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="hidden md:block">

              <h3 className="font-bold">
                {user?.name}
              </h3>

              <p className="text-slate-400 text-sm">
                Student
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Topbar;