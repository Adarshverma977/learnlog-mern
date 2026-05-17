const Input = ({
  icon,
  error,
  className = "",
  ...props
}) => {

  return (

    <div>

      <div className={`flex items-center gap-4 bg-white/5 border ${
        error
          ? "border-red-500"
          : "border-white/10"
      } rounded-2xl px-5 ${className}`}>

        {icon}

        <input
          className="w-full bg-transparent p-5 outline-none"
          {...props}
        />

      </div>


      {error && (

        <p className="text-red-500 mt-2 text-sm">

          {error}

        </p>

      )}

    </div>

  );

};

export default Input;