const MovieFilters = ({ filters, setFilters }) => {
  return (
    <div className="w-full md:w-auto bg-[#111111] rounded-lg p-4 flex flex-wrap gap-4 shadow-md">
      {/* Sort */}
      <div className="w-full md:w-40">
        <label className="text-gray-100 text-sm mb-1 block">Sort By</label>
        <select
          className="select select-bordered w-full bg-[#111111] border-gray-500 text-white"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">Select</option>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
        </select>
      </div>

      {/* Language */}
      <div className="w-full md:w-40">
        <label className="text-gray-100 text-sm mb-1 block">Language</label>
        <input
          type="text"
          placeholder="Type language"
          className="input input-bordered w-full bg-[#111111] border-gray-500 text-white"
          value={filters.language}
          onChange={(e) =>
            setFilters({
              ...filters,
              language: e.target.value.toLowerCase(),
            })
          }
        />
      </div>

      {/* Year */}
      <div className="w-full md:w-32">
        <label className="text-gray-100 text-sm mb-1 block">Year</label>
        <input
          type="number"
          placeholder="Enter release year"
          className="input input-bordered w-full bg-[#111111] border-gray-500 text-white"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        />
      </div>
    </div>
  );
};

export default MovieFilters;
