import {
  useForm,
} from "react-hook-form";

import {
  useDispatch,
} from "react-redux";

import {
  motion,
} from "framer-motion";

import {
  createEntry,
} from "../../features/journal/journalSlice";

import {
  BookOpen,
  FileText,
  Clock3,
  Layers3,
} from "lucide-react";


const JournalForm = () => {

  const dispatch =
    useDispatch();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();


  const onSubmit = (data) => {

    dispatch(
      createEntry(data)
    );

    reset();

  };


  return (

    <motion.form
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl sticky top-6"
    >

      <h2 className="text-4xl font-black mb-8">
        Add New Entry 🚀
      </h2>


      <div className="space-y-6">

        {/* TOPIC */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5">

          <BookOpen className="text-slate-400" />

          <input
            type="text"
            placeholder="Topic Name"
            className="w-full bg-transparent p-5 outline-none"
            {...register(
              "topicName"
            )}
          />

        </div>


        {/* DESCRIPTION */}
        <div className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

          <FileText className="text-slate-400 mt-2" />

          <textarea
            placeholder="What did you learn today?"
            className="w-full bg-transparent outline-none h-36 resize-none"
            {...register(
              "description"
            )}
          />

        </div>


        {/* DURATION */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5">

          <Clock3 className="text-slate-400" />

          <input
            type="number"
            placeholder="Study Duration"
            className="w-full bg-transparent p-5 outline-none"
            {...register(
              "duration"
            )}
          />

        </div>


        {/* DIFFICULTY */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5">

          <Layers3 className="text-slate-400" />

          <select
            className="w-full bg-[#0f172a] p-5 outline-none rounded-2xl"
            {...register(
              "difficulty"
            )}
          >

            <option value="">
              Select Difficulty
            </option>

            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>

          </select>

        </div>


        {/* BUTTON */}
        <button
          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-[1.02] transition-all p-5 rounded-2xl font-bold text-lg"
        >
          Create Entry
        </button>

      </div>

    </motion.form>

  );

};

export default JournalForm;