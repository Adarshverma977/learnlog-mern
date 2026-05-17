import {
  Search,
  Filter,
} from "lucide-react";


const SearchFilter = ({
  search,
  setSearch,
  difficulty,
  setDifficulty,
}) => {

  return (

    <div className="grid md:grid-cols-2 gap-5 mb-8">

      {/* SEARCH */}
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5">

        <Search className="text-slate-400" />

        <input
          type="text"
          placeholder="Search learning topics..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full bg-transparent p-5 outline-none"
        />

      </div>


      {/* FILTER */}
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5">

        <Filter className="text-slate-400" />

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
          }
          className="w-full bg-[#0f172a] p-5 rounded-2xl outline-none"
        >

          <option value="">
            All Difficulties
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

    </div>

  );

};

export default SearchFilter;