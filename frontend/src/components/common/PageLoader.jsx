import {
  motion,
} from "framer-motion";


const PageLoader = () => {

  return (

    <div className="fixed inset-0 z-[999] bg-[#020617] flex items-center justify-center">

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full"
      />

    </div>

  );

};

export default PageLoader;