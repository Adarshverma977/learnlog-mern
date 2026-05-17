import {
  BookOpen,
} from "lucide-react";

import {
  motion,
} from "framer-motion";


const EmptyState = ({
  title,
}) => {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-16 text-center shadow-2xl"
    >

      <div className="flex justify-center mb-6">

        <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-6 rounded-full">

          <BookOpen size={50} />

        </div>

      </div>


      <h2 className="text-4xl font-black">
        {title}
      </h2>

      <p className="text-slate-400 mt-5 text-lg">
        Start adding your learning
        journey today 🚀
      </p>

    </motion.div>

  );

};

export default EmptyState;