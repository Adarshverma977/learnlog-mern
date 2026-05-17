import {
  motion,
} from "framer-motion";


const StatsCard = ({
  title,
  value,
  icon,
  gradient,
}) => {

  return (

    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className={`p-8 rounded-3xl shadow-2xl ${gradient}`}
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-white/70 text-lg">
            {title}
          </p>

          <h2 className="text-5xl font-black mt-4">
            {value}
          </h2>

        </div>


        <div className="text-white/80">
          {icon}
        </div>

      </div>

    </motion.div>

  );

};

export default StatsCard;
