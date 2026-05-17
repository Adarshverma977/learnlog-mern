import {
  Trash2,
  Clock3,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useDispatch,
} from "react-redux";

import {
  deleteEntry,
} from "../../features/journal/journalSlice";


const JournalCard = ({
  entry,
}) => {

  const dispatch =
    useDispatch();

  return (

    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
    >

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {entry.topicName}
          </h2>

          <p className="text-slate-400 mt-3 leading-relaxed">
            {entry.description}
          </p>

        </div>


        <button
          onClick={() =>
            dispatch(
              deleteEntry(
                entry._id
              )
            )
          }
          className="bg-red-500/20 hover:bg-red-500 transition-all p-3 rounded-xl"
        >

          <Trash2 size={18} />

        </button>

      </div>


      {/* FOOTER */}
      <div className="flex items-center justify-between mt-8">

        <div className="flex items-center gap-3">

          <div className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold">
            {entry.difficulty}
          </div>

        </div>


        <div className="flex items-center gap-2 text-slate-400">

          <Clock3 size={18} />

          {entry.duration} hrs

        </div>

      </div>

    </motion.div>

  );

};

export default JournalCard;
