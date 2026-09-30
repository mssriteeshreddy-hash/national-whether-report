import React from "react";

const stats = [
  {
    label: "Total Reports",
    value: "1,284",
    change: "+12.8%",
    positive: true,
    icon: "R",
    iconStyle:
      "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
  },
  {
    label: "Verified Reports",
    value: "964",
    change: "+8.4%",
    positive: true,
    icon: "V",
    iconStyle:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
  },
  {
    label: "Needs Review",
    value: "127",
    change: "-4.2%",
    positive: true,
    icon: "Q",
    iconStyle:
      "border-amber-400/30 bg-amber-400/10 text-amber-400",
  },
  {
    label: "Active Alerts",
    value: "18",
    change: "+3",
    positive: false,
    icon: "!",
    iconStyle:
      "border-red-400/30 bg-red-400/10 text-red-400",
  },
];

const cities = [
  {
    city: "Raipur",
    state: "Chhattisgarh",
    temperature: "29°",
    condition: "Partly Cloudy",
    humidity: "71%",
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    temperature: "28°",
    condition: "Light Rain",
    humidity: "82%",
  },
  {
    city: "Delhi",
    state: "Delhi",
    temperature: "31°",
    condition: "Cloudy",
    humidity: "64%",
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    temperature: "30°",
    condition: "Overcast",
    humidity: "76%",
  },
];

const reports = [
  {
    title: "Heavy rainfall detected",
    location: "Mumbai, Maharashtra",
    time: "8 min ago",
    status: "Verified",
  },
  {
    title: "Temperature anomaly reported",
    location: "Nagpur, Maharashtra",
    time: "21 min ago",
    status: "Review",
  },
  {
    title: "Strong wind conditions",
    location: "Visakhapatnam, Andhra Pradesh",
    time: "34 min ago",
    status: "Verified",
  },
  {
    title: "Flood warning issued",
    location: "Guwahati, Assam",
    time: "48 min ago",
    status: "Alert",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Verified:
      "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",

    Review:
      "bg-amber-400/10 text-amber-400 border-amber-400/25",

    Alert:
      "bg-red-400/10 text-red-400 border-red-400/25",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
        styles[status] || styles.Review
      }`}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">

      {/* =====================================================
          1. PAGE HEADER
      ====================================================== */}

      <div
        className="
          border-b border-[#1E3A5F]
          bg-[#091522]/95
          px-5 py-6
          backdrop-blur-xl
          md:px-8
        "
      >
        <div
          className="
            flex flex-col gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            {/* Breadcrumb */}

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">
                Dashboard
              </span>

              <span className="text-slate-700">
                /
              </span>

              <span className="font-medium text-cyan-400">
                Overview
              </span>
            </div>

            {/* Main Heading */}

            <h1
              className="
                mt-2
                text-2xl
                font-bold
                tracking-tight
                text-white
                md:text-3xl
              "
            >
              Weather Intelligence
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Real-time monitoring and analysis of weather conditions
              across India.
            </p>

          </div>


          {/* HEADER BUTTONS */}

          <div className="flex items-center gap-3">

            <button
              className="
                rounded-xl
                border border-[#1E3A5F]
                bg-[#102238]
                px-4 py-2.5
                text-sm
                font-medium
                text-slate-300
                transition
                hover:border-cyan-400/40
                hover:bg-[#16304A]
                hover:text-white
              "
            >
              Export Report
            </button>

            <button
              className="
                rounded-xl
                bg-cyan-400
                px-4 py-2.5
                text-sm
                font-semibold
                text-[#03111D]
                shadow-lg
                shadow-cyan-500/10
                transition
                hover:bg-cyan-300
              "
            >
              + New Report
            </button>

          </div>

        </div>
      </div>


      {/* =====================================================
          2. MAIN WORKSPACE
      ====================================================== */}

      <main className="space-y-6 p-5 md:p-8">


        {/* =====================================================
            3. FILTER BAR
        ====================================================== */}

        <section
          className="
            rounded-2xl
            border border-[#1E3A5F]
            bg-[#102238]
            p-5
            shadow-xl
            shadow-black/10
          "
        >

          <div
            className="
              flex flex-col gap-5
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            <div>
              <p className="text-sm font-semibold text-white">
                Monitoring Filters
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Refine weather intelligence data
              </p>
            </div>


            <div
              className="
                grid
                flex-1
                gap-3
                sm:grid-cols-2
                xl:max-w-4xl
                xl:grid-cols-4
              "
            >

              <select className="dashboard-select">
                <option>All States</option>
                <option>Chhattisgarh</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>West Bengal</option>
              </select>


              <select className="dashboard-select">
                <option>All Cities</option>
                <option>Raipur</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Kolkata</option>
              </select>


              <select className="dashboard-select">
                <option>All Events</option>
                <option>Rainfall</option>
                <option>Storm</option>
                <option>Heatwave</option>
                <option>Flood</option>
              </select>


              <select className="dashboard-select">
                <option>All Status</option>
                <option>Verified</option>
                <option>Review</option>
                <option>Alert</option>
              </select>

            </div>

          </div>

        </section>


        {/* =====================================================
            4. KPI CARDS
        ====================================================== */}

        <section
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="
                group
                rounded-2xl
                border border-[#1E3A5F]
                bg-[#102238]
                p-5
                shadow-lg
                shadow-black/10
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/40
                hover:bg-[#16304A]
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-400">
                    {stat.label}
                  </p>

                  <p
                    className="
                      mt-3
                      text-3xl
                      font-bold
                      tracking-tight
                      text-white
                    "
                  >
                    {stat.value}
                  </p>

                </div>


                {/* ICON */}

                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    text-sm
                    font-bold
                    transition
                    group-hover:scale-105
                    ${stat.iconStyle}
                  `}
                >
                  {stat.icon}
                </div>

              </div>


              {/* CHANGE */}

              <div className="mt-5 flex items-center gap-2">

                <span
                  className={`
                    rounded-full
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    ${
                      stat.positive
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-red-400/10 text-red-400"
                    }
                  `}
                >
                  {stat.change}
                </span>

                <span className="text-xs text-slate-500">
                  vs previous period
                </span>

              </div>

            </div>

          ))}

        </section>


        {/* =====================================================
            5. MAP + LIVE CONDITIONS
        ====================================================== */}

        <section
          className="
            grid
            gap-6
            xl:grid-cols-[1.7fr_1fr]
          "
        >


          {/* WEATHER MAP */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-[#1E3A5F]
              bg-[#102238]
              shadow-lg
              shadow-black/10
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#1E3A5F]
                px-5
                py-4
              "
            >

              <div>

                <h2 className="text-sm font-semibold text-white">
                  National Weather Map
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Live weather activity across India
                </p>

              </div>


              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">

                <span
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_10px_rgba(52,211,153,0.7)]
                  "
                />

                Live

              </div>

            </div>


            {/* MAP */}

            <div
              className="
                relative
                h-[390px]
                overflow-hidden
                bg-[#081421]
              "
            >

              {/* GRID */}

              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />


              {/* RADAR */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-72
                  w-72
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-cyan-400/10
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-52
                  w-52
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-cyan-400/10
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-32
                  w-32
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-cyan-400/10
                "
              />


              {/* INDIA-LIKE MAP */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-64
                  w-48
                  -translate-x-1/2
                  -translate-y-1/2
                "
              >

                <div
                  className="
                    absolute
                    left-8
                    top-3
                    h-20
                    w-28
                    rotate-12
                    rounded-[45%]
                    border
                    border-cyan-400/30
                    bg-cyan-400/5
                  "
                />

                <div
                  className="
                    absolute
                    left-5
                    top-16
                    h-32
                    w-36
                    -rotate-6
                    rounded-[42%]
                    border
                    border-cyan-400/30
                    bg-blue-400/5
                  "
                />

                <div
                  className="
                    absolute
                    left-20
                    top-28
                    h-28
                    w-14
                    rotate-12
                    rounded-[40%]
                    border
                    border-cyan-400/30
                    bg-cyan-400/5
                  "
                />


                {/* MARKERS */}

                <div
                  className="
                    absolute
                    left-32
                    top-14
                    h-3
                    w-3
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_18px_#22d3ee]
                  "
                />

                <div
                  className="
                    absolute
                    left-20
                    top-32
                    h-3
                    w-3
                    rounded-full
                    bg-amber-400
                    shadow-[0_0_18px_#f59e0b]
                  "
                />

                <div
                  className="
                    absolute
                    left-8
                    top-44
                    h-3
                    w-3
                    rounded-full
                    bg-red-400
                    shadow-[0_0_18px_#f87171]
                  "
                />

              </div>


              {/* MAP LABEL */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  rounded-xl
                  border border-[#1E3A5F]
                  bg-[#07111f]/90
                  px-4
                  py-3
                  backdrop-blur-xl
                "
              >

                <p className="text-xs font-semibold text-white">
                  India
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Weather activity monitoring
                </p>

              </div>


              {/* MAP LEGEND */}

              <div
                className="
                  absolute
                  bottom-5
                  right-5
                  rounded-xl
                  border border-[#1E3A5F]
                  bg-[#07111f]/90
                  p-3
                  backdrop-blur-xl
                "
              >

                <div className="space-y-2 text-[10px]">

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="text-slate-400">
                      Normal
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="text-slate-400">
                      Warning
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="text-slate-400">
                      Critical
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* LIVE CONDITIONS */}

          <div
            className="
              rounded-2xl
              border border-[#1E3A5F]
              bg-[#102238]
              shadow-lg
              shadow-black/10
            "
          >

            <div
              className="
                border-b
                border-[#1E3A5F]
                px-5
                py-4
              "
            >

              <h2 className="text-sm font-semibold text-white">
                Live Conditions
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Current weather overview
              </p>

            </div>


            <div className="divide-y divide-[#1E3A5F]">

              {cities.map((city) => (

                <div
                  key={city.city}
                  className="
                    p-4
                    transition
                    hover:bg-[#16304A]
                  "
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-semibold text-white">
                        {city.city}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {city.state}
                      </p>

                    </div>

                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_8px_rgba(52,211,153,0.6)]
                      "
                    />

                  </div>


                  <div className="mt-4 flex items-end justify-between">

                    <div>

                      <p className="text-2xl font-bold text-white">
                        {city.temperature}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {city.condition}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-[11px] text-slate-500">
                        Humidity
                      </p>

                      <p className="mt-1 text-sm font-semibold text-cyan-400">
                        {city.humidity}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            6. REGIONAL CONDITIONS
        ====================================================== */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border border-[#1E3A5F]
            bg-[#102238]
            shadow-lg
            shadow-black/10
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#1E3A5F]
              px-5
              py-4
            "
          >

            <div>

              <h2 className="text-sm font-semibold text-white">
                Regional Conditions
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Current conditions from major monitoring locations
              </p>

            </div>

            <button
              className="
                text-xs
                font-semibold
                text-cyan-400
                transition
                hover:text-cyan-300
              "
            >
              View all
            </button>

          </div>


          <div className="grid gap-px bg-[#1E3A5F] md:grid-cols-2 xl:grid-cols-4">

            {cities.map((city) => (

              <div
                key={city.city}
                className="
                  bg-[#102238]
                  p-5
                  transition
                  hover:bg-[#16304A]
                "
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="font-semibold text-white">
                      {city.city}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {city.state}
                    </p>

                  </div>

                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-emerald-400
                    "
                  />

                </div>


                <div className="mt-6 flex items-end justify-between">

                  <div>

                    <p className="text-3xl font-bold text-white">
                      {city.temperature}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {city.condition}
                    </p>

                  </div>


                  <div className="text-right">

                    <p className="text-xs text-slate-500">
                      Humidity
                    </p>

                    <p className="mt-1 text-sm font-semibold text-cyan-400">
                      {city.humidity}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            7. TEMPERATURE TREND + ALERTS
        ====================================================== */}

        <section
          className="
            grid
            gap-6
            xl:grid-cols-[1.7fr_1fr]
          "
        >

          {/* TEMPERATURE TREND */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-[#1E3A5F]
              bg-[#102238]
              shadow-lg
              shadow-black/10
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#1E3A5F]
                px-5
                py-4
              "
            >

              <div>

                <h2 className="text-sm font-semibold text-white">
                  Temperature Trend
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Today's temperature pattern
                </p>

              </div>


              <select
                className="
                  rounded-lg
                  border
                  border-[#1E3A5F]
                  bg-[#0B1728]
                  px-3
                  py-2
                  text-xs
                  text-slate-300
                  outline-none
                  focus:border-cyan-400
                "
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
              </select>

            </div>


            <div className="p-5">

              <div className="relative h-64">

                {/* GRID LINES */}

                <div className="absolute inset-0 flex flex-col justify-between">

                  {[1, 2, 3, 4, 5].map((line) => (

                    <div
                      key={line}
                      className="border-t border-[#1E3A5F]"
                    />

                  ))}

                </div>


                {/* CHART */}

                <svg
                  viewBox="0 0 800 260"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >

                  <defs>

                    <linearGradient
                      id="temperatureFill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#22d3ee"
                        stopOpacity="0.25"
                      />

                      <stop
                        offset="100%"
                        stopColor="#22d3ee"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>


                  <path
                    d="
                      M0 185
                      C70 165 80 145 145 160
                      C210 175 220 110 285 125
                      C350 140 365 80 425 100
                      C490 120 510 75 570 90
                      C635 105 660 55 720 70
                      C755 78 780 55 800 45
                      L800 260
                      L0 260 Z
                    "
                    fill="url(#temperatureFill)"
                  />


                  <path
                    d="
                      M0 185
                      C70 165 80 145 145 160
                      C210 175 220 110 285 125
                      C350 140 365 80 425 100
                      C490 120 510 75 570 90
                      C635 105 660 55 720 70
                      C755 78 780 55 800 45
                    "
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                  />

                </svg>

              </div>


              <div
                className="
                  mt-3
                  flex
                  justify-between
                  text-[11px]
                  text-slate-500
                "
              >
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Now</span>
              </div>

            </div>

          </div>


          {/* ACTIVE ALERTS */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-[#1E3A5F]
              bg-[#102238]
              shadow-lg
              shadow-black/10
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#1E3A5F]
                px-5
                py-4
              "
            >

              <div>

                <h2 className="text-sm font-semibold text-white">
                  Active Alerts
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Requires attention
                </p>

              </div>


              <span
                className="
                  rounded-full
                  border
                  border-red-400/20
                  bg-red-400/10
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  text-red-400
                "
              >
                18 Active
              </span>

            </div>


            <div className="divide-y divide-[#1E3A5F]">

              {/* ALERT 1 */}

              <div className="p-4 transition hover:bg-[#16304A]">

                <div className="flex gap-3">

                  <span
                    className="
                      mt-1
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                      bg-red-400
                      shadow-[0_0_10px_rgba(248,113,113,0.6)]
                    "
                  />

                  <div>

                    <p className="text-sm font-semibold text-white">
                      Heavy rainfall
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Western Maharashtra
                    </p>

                    <p className="mt-2 text-[11px] text-slate-500">
                      Updated 8 min ago
                    </p>

                  </div>

                </div>

              </div>


              {/* ALERT 2 */}

              <div className="p-4 transition hover:bg-[#16304A]">

                <div className="flex gap-3">

                  <span
                    className="
                      mt-1
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                      bg-amber-400
                      shadow-[0_0_10px_rgba(245,158,11,0.5)]
                    "
                  />

                  <div>

                    <p className="text-sm font-semibold text-white">
                      Temperature anomaly
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Central India
                    </p>

                    <p className="mt-2 text-[11px] text-slate-500">
                      Updated 21 min ago
                    </p>

                  </div>

                </div>

              </div>


              {/* ALERT 3 */}

              <div className="p-4 transition hover:bg-[#16304A]">

                <div className="flex gap-3">

                  <span
                    className="
                      mt-1
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_10px_rgba(34,211,238,0.5)]
                    "
                  />

                  <div>

                    <p className="text-sm font-semibold text-white">
                      Strong wind activity
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Eastern coastline
                    </p>

                    <p className="mt-2 text-[11px] text-slate-500">
                      Updated 34 min ago
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            8. RECENT REPORTS
        ====================================================== */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border border-[#1E3A5F]
            bg-[#102238]
            shadow-lg
            shadow-black/10
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#1E3A5F]
              px-5
              py-4
            "
          >

            <div>

              <h2 className="text-sm font-semibold text-white">
                Recent Reports
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest citizen and system-generated reports
              </p>

            </div>


            <button
              className="
                text-xs
                font-semibold
                text-cyan-400
                transition
                hover:text-cyan-300
              "
            >
              Open reports
            </button>

          </div>


          <div className="divide-y divide-[#1E3A5F]">

            {reports.map((report) => (

              <div
                key={report.title}
                className="
                  flex
                  flex-col
                  gap-3
                  px-5
                  py-4
                  transition
                  hover:bg-[#16304A]
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div className="flex items-center gap-4">

                  {/* REPORT ICON */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-cyan-400/20
                      bg-cyan-400/10
                      text-xs
                      font-bold
                      text-cyan-400
                    "
                  >
                    WR
                  </div>


                  <div>

                    <p className="text-sm font-semibold text-slate-200">
                      {report.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {report.location} • {report.time}
                    </p>

                  </div>

                </div>


                <StatusBadge status={report.status} />

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            9. FOOTER
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-2
            border-t
            border-[#1E3A5F]
            pt-5
            text-xs
            text-slate-500
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <span>
            National Weather Intelligence Platform
          </span>

          <span>
            Data refresh interval: 5 minutes
          </span>

        </div>

      </main>

    </div>
  );
}
