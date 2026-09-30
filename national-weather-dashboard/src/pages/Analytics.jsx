import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import API from "../api";

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    total_reports: 0,
    event_wise: [],
    state_wise: [],
    status_wise: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/analytics");

      console.log("Analytics API response:", response.data);

      setAnalytics(response.data);
    } catch (error) {
      console.error("Analytics error:", error);

      setError(
        error.response?.data?.detail ||
          "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  const eventData = analytics.event_wise || [];
  const stateData = analytics.state_wise || [];
  const statusData = analytics.status_wise || [];

  return (
    <div className="min-h-screen bg-[#07111F] p-5 text-slate-100 md:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-7">

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">
            Dashboard
          </span>

          <span className="text-slate-700">
            /
          </span>

          <span className="text-cyan-400">
            Analytics
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Weather Analytics
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Analyze weather reports and event patterns from
          your PostgreSQL database.
        </p>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div
          className="
            mb-6
            rounded-xl
            border
            border-red-400/20
            bg-red-400/10
            p-4
            text-sm
            text-red-400
          "
        >
          <p className="font-semibold">
            Analytics Error
          </p>

          <p className="mt-1">
            {error}
          </p>

        </div>
      )}


      {/* ================= TOTAL REPORTS ================= */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-[#1E3A5F]
          bg-[#102238]
          p-6
          shadow-lg
        "
      >

        <p className="text-sm text-slate-400">
          Total Active Reports
        </p>

        {loading ? (
          <div
            className="
              mt-3
              h-10
              w-32
              animate-pulse
              rounded-lg
              bg-[#16304A]
            "
          />
        ) : (
          <p
            className="
              mt-2
              text-4xl
              font-bold
              text-white
            "
          >
            {analytics.total_reports}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-500">
          Live data from PostgreSQL
        </p>

      </div>


      {/* ================= CHART GRID ================= */}

      <div className="grid gap-6 lg:grid-cols-2">


        {/* ================= EVENT CHART ================= */}

        <div
          className="
            rounded-2xl
            border
            border-[#1E3A5F]
            bg-[#102238]
            p-5
            shadow-lg
          "
        >

          <h2 className="text-sm font-semibold text-white">
            Event-wise Reports
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Number of reports for each weather event
          </p>

          <div className="mt-6 h-[300px]">

            {loading ? (
              <div
                className="
                  h-full
                  animate-pulse
                  rounded-xl
                  bg-[#0B1728]
                "
              />
            ) : eventData.length === 0 ? (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-sm
                  text-slate-500
                "
              >
                No event data available.
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={eventData}>

                  <CartesianGrid
                    stroke="#1E3A5F"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: "#94A3B8",
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fill: "#94A3B8",
                      fontSize: 11,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1728",
                      border:
                        "1px solid #1E3A5F",
                      borderRadius: "12px",
                      color: "#F8FAFC",
                    }}
                  />

                  <Bar
                    dataKey="reports"
                    fill="#38BDF8"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>
            )}

          </div>

        </div>


        {/* ================= STATE CHART ================= */}

        <div
          className="
            rounded-2xl
            border
            border-[#1E3A5F]
            bg-[#102238]
            p-5
            shadow-lg
          "
        >

          <h2 className="text-sm font-semibold text-white">
            State-wise Reports
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Geographic distribution of weather reports
          </p>

          <div className="mt-6 h-[300px]">

            {loading ? (
              <div
                className="
                  h-full
                  animate-pulse
                  rounded-xl
                  bg-[#0B1728]
                "
              />
            ) : stateData.length === 0 ? (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-sm
                  text-slate-500
                "
              >
                No state data available.
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={stateData}>

                  <CartesianGrid
                    stroke="#1E3A5F"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="state"
                    tick={{
                      fill: "#94A3B8",
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fill: "#94A3B8",
                      fontSize: 11,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1728",
                      border:
                        "1px solid #1E3A5F",
                      borderRadius: "12px",
                      color: "#F8FAFC",
                    }}
                  />

                  <Bar
                    dataKey="reports"
                    fill="#22D3EE"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>
            )}

          </div>

        </div>


        {/* ================= STATUS CHART ================= */}

        <div
          className="
            rounded-2xl
            border
            border-[#1E3A5F]
            bg-[#102238]
            p-5
            shadow-lg
            lg:col-span-2
          "
        >

          <h2 className="text-sm font-semibold text-white">
            Verification Status
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Distribution of report verification states
          </p>

          <div className="mt-6 h-[300px]">

            {loading ? (
              <div
                className="
                  h-full
                  animate-pulse
                  rounded-xl
                  bg-[#0B1728]
                "
              />
            ) : statusData.length === 0 ? (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-sm
                  text-slate-500
                "
              >
                No verification data available.
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={statusData}>

                  <CartesianGrid
                    stroke="#1E3A5F"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="status"
                    tick={{
                      fill: "#94A3B8",
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fill: "#94A3B8",
                      fontSize: 11,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1728",
                      border:
                        "1px solid #1E3A5F",
                      borderRadius: "12px",
                      color: "#F8FAFC",
                    }}
                  />

                  <Bar
                    dataKey="reports"
                    fill="#A78BFA"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>
            )}

          </div>

        </div>


        {/* ================= DATA SUMMARY ================= */}

        <div
          className="
            rounded-2xl
            border
            border-[#1E3A5F]
            bg-[#102238]
            p-5
            shadow-lg
            lg:col-span-2
          "
        >

          <h2 className="text-sm font-semibold text-white">
            Dataset Overview
          </h2>

          <div className="
            mt-5
            grid
            gap-4
            sm:grid-cols-3
          ">

            <div
              className="
                rounded-xl
                border
                border-cyan-400/20
                bg-cyan-400/5
                p-4
              "
            >

              <p className="text-xs text-slate-500">
                Event Categories
              </p>

              <p className="
                mt-2
                text-2xl
                font-bold
                text-cyan-400
              ">
                {eventData.length}
              </p>

            </div>


            <div
              className="
                rounded-xl
                border
                border-purple-400/20
                bg-purple-400/5
                p-4
              "
            >

              <p className="text-xs text-slate-500">
                States Represented
              </p>

              <p className="
                mt-2
                text-2xl
                font-bold
                text-purple-400
              ">
                {stateData.length}
              </p>

            </div>


            <div
              className="
                rounded-xl
                border
                border-emerald-400/20
                bg-emerald-400/5
                p-4
              "

            >

              <p className="text-xs text-slate-500">
                Verification Categories
              </p>

              <p className="
                mt-2
                text-2xl
                font-bold
                text-emerald-400
              ">
                {statusData.length}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================= FOOTER ================= */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-[#1E3A5F]
          bg-[#0B1728]
          p-5
        "
      >

        <p className="
          text-sm
          font-semibold
          text-white
        ">
          Analytics Data Source
        </p>

        <p className="
          mt-2
          text-sm
          leading-6
          text-slate-400
        ">
          Analytics are calculated by the FastAPI backend
          from active weather reports stored in PostgreSQL.
        </p>

      </div>

    </div>
  );
}