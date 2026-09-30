import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";
import FilterBar from "../components/FilterBar";
import EventBadge from "../components/EventBadge";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    date: "",
    state: "",
    city: "",
    event: "",
    status: "",
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/reports");

      setReports(response.data);
    } catch (error) {
      console.error("Failed to load reports:", error);

      setError(
        error.response?.data?.detail ||
          "Unable to load weather reports."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const reportDate = report.date_time
        ? new Date(report.date_time)
            .toISOString()
            .slice(0, 10)
        : "";

      return (
        (!filters.date ||
          reportDate === filters.date) &&

        (!filters.state ||
          report.state
            ?.toLowerCase()
            .includes(filters.state.toLowerCase())) &&

        (!filters.city ||
          report.city
            ?.toLowerCase()
            .includes(filters.city.toLowerCase())) &&

        (!filters.event ||
          report.event_type
            ?.toLowerCase()
            .includes(filters.event.toLowerCase())) &&

        (!filters.status ||
          report.verification_status
            ?.toLowerCase()
            .includes(filters.status.toLowerCase()))
      );
    });
  }, [reports, filters]);

  return (
    <div className="min-h-screen bg-[#07111F] p-5 text-slate-100 md:p-8">

      {/* HEADER */}

      <div className="mb-7">

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">
            Dashboard
          </span>

          <span className="text-slate-700">
            /
          </span>

          <span className="text-cyan-400">
            Reports
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Weather Reports
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Browse, monitor and filter collected weather reports.
        </p>

      </div>


      {/* FILTERS */}

      <FilterBar
        filters={filters}
        setFilters={setFilters}
      />


      {/* ERROR */}

      {error && (
        <div className="
          mt-5
          rounded-xl
          border border-red-400/20
          bg-red-400/10
          p-4
          text-sm
          text-red-400
        ">
          {error}
        </div>
      )}


      {/* LOADING */}

      {loading ? (
        <div className="
          mt-6
          rounded-2xl
          border border-[#1E3A5F]
          bg-[#102238]
          p-12
          text-center
        ">
          <div className="
            mx-auto
            h-8
            w-8
            animate-spin
            rounded-full
            border-2
            border-cyan-400/20
            border-t-cyan-400
          " />

          <p className="mt-4 text-sm text-slate-400">
            Loading weather reports...
          </p>
        </div>
      ) : (
        <div className="
          mt-6
          overflow-hidden
          rounded-2xl
          border border-[#1E3A5F]
          bg-[#102238]
          shadow-xl
          shadow-black/10
        ">

          {/* TABLE HEADER */}

          <div className="
            flex
            flex-col
            gap-2
            border-b
            border-[#1E3A5F]
            px-5
            py-4
            md:flex-row
            md:items-center
            md:justify-between
          ">

            <div>

              <h2 className="text-sm font-semibold text-white">
                Collected Reports
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredReports.length} reports
              </p>

            </div>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-left text-sm">

              <thead className="bg-[#0B1728]">

                <tr>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Location
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Event
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Source
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    AI Confidence
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredReports.length === 0 ? (
                  <tr>

                    <td
                      colSpan="6"
                      className="px-5 py-14 text-center"
                    >
                      <p className="text-sm font-medium text-slate-300">
                        No reports found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your filters.
                      </p>
                    </td>

                  </tr>
                ) : (
                  filteredReports.map((report) => (

                    <tr
                      key={report.id}
                      className="
                        border-t
                        border-[#1E3A5F]
                        transition
                        hover:bg-[#16304A]
                      "
                    >

                      {/* LOCATION */}

                      <td className="px-5 py-4">

                        <p className="font-semibold text-slate-200">
                          {report.city}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {report.state}
                        </p>

                      </td>


                      {/* EVENT */}

                      <td className="px-5 py-4">
                        <EventBadge
                          event={report.event_type}
                        />
                      </td>


                      {/* SOURCE */}

                      <td className="px-5 py-4 text-slate-400">
                        {report.source}
                      </td>


                      {/* AI CONFIDENCE */}

                      <td className="px-5 py-4">

                        {report.ai_confidence !== null &&
                        report.ai_confidence !== undefined ? (
                          <span className="font-semibold text-cyan-400">
                            {report.ai_confidence}%
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            N/A
                          </span>
                        )}

                      </td>


                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`
                            rounded-full
                            border
                            px-3
                            py-1
                            text-xs
                            font-medium

                            ${
                              report.verification_status ===
                              "Verified"
                                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                                : report.verification_status ===
                                  "Suspicious"
                                ? "border-red-400/20 bg-red-400/10 text-red-400"
                                : "border-amber-400/20 bg-amber-400/10 text-amber-400"
                            }
                          `}
                        >
                          {report.verification_status}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-4">

                        <Link
                          to={`/reports/${report.id}`}
                          className="
                            inline-flex
                            rounded-lg
                            border
                            border-cyan-400/20
                            bg-cyan-400/10
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-cyan-400
                            transition
                            hover:bg-cyan-400/20
                          "
                        >
                          View Report
                        </Link>

                      </td>

                    </tr>

                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}