import { Link } from "react-router-dom";


const NotFound = () => {

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4">

      <h1 className="text-8xl font-bold">
        404
      </h1>

      <p className="text-2xl text-slate-400 mt-4">
        Page Not Found
      </p>


      <Link
        to="/"
        className="mt-8 bg-indigo-600 px-6 py-4 rounded-xl"
      >
        Go Home
      </Link>

    </div>

  );

};

export default NotFound;