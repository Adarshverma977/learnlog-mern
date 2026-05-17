import {
  Menu,
} from "lucide-react";


const MobileNavbar = ({
  setOpen,
}) => {

  return (

    <div className="lg:hidden flex items-center justify-between mb-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">

      <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        LearnLog
      </h1>


      <button
        onClick={() =>
          setOpen(true)
        }
        className="bg-white/5 p-3 rounded-xl"
      >

        <Menu />

      </button>

    </div>

  );

};

export default MobileNavbar;