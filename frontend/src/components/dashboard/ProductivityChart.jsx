import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


const ProductivityChart = ({
  data,
}) => {

  return (

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">

      <div className="mb-8">

        <h2 className="text-4xl font-black">
          Productivity Overview 📈
        </h2>

        <p className="text-slate-400 mt-3">
          Your daily learning performance.
        </p>

      </div>


      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="_id"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="totalHours"
            stroke="#6366f1"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

};

export default ProductivityChart;