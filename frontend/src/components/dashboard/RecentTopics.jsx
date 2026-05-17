import {
  motion,
} from "framer-motion";

import {
  BookOpen,
} from "lucide-react";


const RecentTopics = ({
  topics,
}) => {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl"
    >

      <h2 className="text-4xl font-black mb-8">
        Recent Topics 📚
      </h2>


      <div className="space-y-5">

        {topics?.length > 0 ? (

          topics.map((topic) => (

            <div
              key={topic._id}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5"
            >

              <div className="flex items-center gap-4">

                <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-3 rounded-xl">

                  <BookOpen size={20} />

                </div>


                <div>

                  <h3 className="font-bold text-lg">
                    {topic.topicName}
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    {topic.difficulty}
                  </p>

                </div>

              </div>


              <div className="text-slate-400">

                {topic.duration} hrs

              </div>

            </div>

          ))

        ) : (

          <p className="text-slate-400">
            No recent topics found.
          </p>

        )}

      </div>

    </motion.div>

  );

};

export default RecentTopics;