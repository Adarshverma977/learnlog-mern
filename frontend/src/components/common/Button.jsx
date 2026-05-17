import {
  motion,
} from "framer-motion";


const Button = ({
  children,
  className = "",
  loading = false,
  ...props
}) => {

  return (

    <motion.button
      whileTap={{
        scale: 0.97,
      }}
      whileHover={{
        scale: 1.01,
      }}
      disabled={loading}
      className={`w-full bg-gradient-to-r from-indigo-600 to-cyan-500 p-5 rounded-2xl font-bold text-lg transition-all disabled:opacity-70 ${className}`}
      {...props}
    >

      {loading
        ? "Please wait..."
        : children}

    </motion.button>

  );

};

export default Button;