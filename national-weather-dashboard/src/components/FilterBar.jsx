export default function FilterBar({
  filters,
  setFilters,
}) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      date: "",
      state: "",
      city: "",
      event: "",
      status: "",
    });
  };

  return (
    <div
      className="
        rounded-2xl
        border border-[#1E3A5F]
        bg-[#102238]
        p-5
        shadow-lg
        shadow-black/10
      "
    >

      {/* FILTER TITLE */}

      <div className="mb-4 flex items-center justify-between">

        <div>

          <h2 className="text-sm font-semibold text-white">
            Report Filters
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Filter reports by date, location, event and status.
          </p>

        </div>


        <button
          type="button"
          onClick={clearFilters}
          className="
            text-xs
            font-semibold
            text-cyan-400
            transition
            hover:text-cyan-300
          "
        >
          Clear Filters
        </button>

      </div>


      {/* FILTERS */}

      <div className="
        grid
        gap-3
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-5
      ">

        {/* DATE */}

        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            updateFilter("date", e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-[#1E3A5F]
            bg-[#0B1728]
            px-3
            py-3
            text-sm
            text-slate-300
            outline-none
            transition
            focus:border-cyan-400
          "
        />


        {/* STATE */}

        <select
          value={filters.state}
          onChange={(e) =>
            updateFilter("state", e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-[#1E3A5F]
            bg-[#0B1728]
            px-3
            py-3
            text-sm
            text-slate-300
            outline-none
            transition
            focus:border-cyan-400
          "
        >

          <option value="">
            All States
          </option>

          <option value="Chhattisgarh">
            Chhattisgarh
          </option>

          <option value="Maharashtra">
            Maharashtra
          </option>

          <option value="Rajasthan">
            Rajasthan
          </option>

          <option value="Delhi">
            Delhi
          </option>

          <option value="West Bengal">
            West Bengal
          </option>

        </select>


        {/* CITY */}

        <input
          type="text"
          placeholder="Search city..."
          value={filters.city}
          onChange={(e) =>
            updateFilter("city", e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-[#1E3A5F]
            bg-[#0B1728]
            px-3
            py-3
            text-sm
            text-slate-300
            placeholder:text-slate-600
            outline-none
            transition
            focus:border-cyan-400
          "
        />


        {/* EVENT */}

        <select
          value={filters.event}
          onChange={(e) =>
            updateFilter("event", e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-[#1E3A5F]
            bg-[#0B1728]
            px-3
            py-3
            text-sm
            text-slate-300
            outline-none
            transition
            focus:border-cyan-400
          "
        >

          <option value="">
            All Events
          </option>

          <option value="Heavy Rainfall">
            Heavy Rainfall
          </option>

          <option value="Flood">
            Flood
          </option>

          <option value="Heatwave">
            Heatwave
          </option>

          <option value="Thunderstorm">
            Thunderstorm
          </option>

          <option value="Dust Storm">
            Dust Storm
          </option>

          <option value="Strong Wind">
            Strong Wind
          </option>

        </select>


        {/* STATUS */}

        <select
          value={filters.status}
          onChange={(e) =>
            updateFilter("status", e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-[#1E3A5F]
            bg-[#0B1728]
            px-3
            py-3
            text-sm
            text-slate-300
            outline-none
            transition
            focus:border-cyan-400
          "
        >

          <option value="">
            All Status
          </option>

          <option value="Verified">
            Verified
          </option>

          <option value="Needs Review">
            Needs Review
          </option>

          <option value="Suspicious">
            Suspicious
          </option>

        </select>

      </div>

    </div>
  );
}