const SkeletonCard = () => {

  return (

    <div className="animate-pulse bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-6">

      <div className="h-7 bg-slate-700 rounded-xl w-1/2 mb-6"></div>

      <div className="space-y-3">

        <div className="h-4 bg-slate-700 rounded-xl"></div>

        <div className="h-4 bg-slate-700 rounded-xl"></div>

        <div className="h-4 bg-slate-700 rounded-xl w-2/3"></div>

      </div>


      <div className="flex justify-between mt-8">

        <div className="h-10 w-24 bg-slate-700 rounded-full"></div>

        <div className="h-10 w-16 bg-slate-700 rounded-full"></div>

      </div>

    </div>

  );

};

export default SkeletonCard;