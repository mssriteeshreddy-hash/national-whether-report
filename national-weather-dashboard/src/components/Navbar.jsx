import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="
        fixed top-0 right-0 left-64
        h-20
        bg-[#07111f]/95
        backdrop-blur-xl
        border-b border-[#1E3A5F]
        z-40
        flex items-center justify-between
        px-8
      "
    >

      {/* Search */}

      <div className="relative w-80">

        <Search
          size={18}
          className="absolute left-3 top-1/2
                     -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search reports..."
          className="
            w-full
            bg-[#0B1728]
            border border-[#1E3A5F]
            rounded-xl
            py-2.5 pl-10 pr-4
            text-sm text-white
            placeholder:text-slate-500
            outline-none
            focus:border-[#38BDF8]
          "
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button
          className="
            relative
            w-10 h-10
            rounded-xl
            bg-[#102238]
            border border-[#1E3A5F]
            flex items-center justify-center
            text-slate-400
            hover:text-[#38BDF8]
            transition
          "
        >
          <Bell size={19} />

          <span
            className="
              absolute top-2 right-2
              w-2 h-2
              rounded-full
              bg-[#EF4444]
            "
          />
        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={34}
            className="text-[#38BDF8]"
          />

          <div>
            <p className="text-sm font-semibold text-white">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}