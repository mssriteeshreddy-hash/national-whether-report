import {
  LayoutDashboard,
  FileText,
  BarChart3,
  ShieldCheck,
  Send,
  LogOut,
  CloudSun,
  CloudRain,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Admin Panel",
    path: "/admin",
    icon: ShieldCheck,
  },
  {
    name: "Citizen Report",
    path: "/citizen-report",
    icon: Send,
  },
];
<div className="fixed left-0 top-0 h-screen w-64 bg-[#0B1728] border-r border-[#1E3A5F] flex flex-col">

  {/* Logo */}
  <div className="h-20 px-6 flex items-center border-b border-[#1E3A5F]">
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15
                      border border-[#38BDF8]/30
                      flex items-center justify-center">

        <CloudRain className="text-[#38BDF8]" size={22} />

      </div>

      <div>
        <h1 className="text-white font-bold text-lg">
          WeatherWatch
        </h1>

        <p className="text-slate-500 text-xs">
          Intelligence Platform
        </p>
      </div>

    </div>
  </div>

  {/* Navigation */}
  <nav className="flex-1 p-4 space-y-2">

    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl
            transition-all duration-200
            ${
              isActive
                ? "bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/20"
                : "text-slate-400 hover:text-white hover:bg-[#16304A]"
            }`
          }
        >
          <Icon size={19} />

          <span className="text-sm font-medium">
            {item.name}
          </span>
        </NavLink>
      );
    })}

  </nav>

  {/* Bottom */}
  <div className="p-4 border-t border-[#1E3A5F]">

    <button
      className="w-full flex items-center gap-3 px-4 py-3
                 text-slate-400 hover:text-red-400
                 hover:bg-red-500/10 rounded-xl transition"
    >
      <LogOut size={19} />
      <span>Logout</span>
    </button>

  </div>

</div>
export default function Sidebar() {
  return (
    <div className="flex h-full flex-col">

      {/* BRAND */}
      <div className="border-b border-slate-800 px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
            <CloudSun size={22} />
          </div>

          <div>
            <h1 className="text-sm font-semibold text-white">
              WeatherWatch
            </h1>

            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">
              National Intelligence
            </p>
          </div>

        </div>

      </div>


      {/* NAVIGATION */}
      <nav className="flex-1 space-y-1 px-3 py-5">

        <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Workspace
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`
              }
            >

              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-cyan-400"
                        : "text-slate-500 group-hover:text-slate-300"
                    }
                  />

                  <span>{item.name}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  )}
                </>
              )}

            </NavLink>
          );
        })}

      </nav>


      {/* BOTTOM */}
      <div className="border-t border-slate-800 p-3">

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-red-400/10 hover:text-red-400">

          <LogOut size={18} />

          <span>Logout</span>

        </button>

      </div>

    </div>
  );
}