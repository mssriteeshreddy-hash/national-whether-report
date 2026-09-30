import { useState } from "react";
import {
  Check,
  X,
  Copy,
} from "lucide-react";

import {
  reports as initialReports,
} from "../data/dummyReports";

import EventBadge from "../components/EventBadge";

export default function AdminPanel() {
  const [reports, setReports] =
    useState(initialReports);

  const updateStatus = (id, status) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id
          ? {
              ...report,
              status,
            }
          : report
      )
    );
  };

  const suspiciousReports =
    reports.filter(
      (report) =>
        report.status === "Suspicious" ||
        report.status === "Needs Review"
    );

  return (
    <div className="
      min-h-screen
      bg-[#07111F]
      p-5
      text-slate-100
      md:p-8
    ">

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
            Admin Panel
          </span>

        </div>

        <h1 className="
          mt-2
          text-3xl
          font-bold
          text-white
        ">
          Admin Panel
        </h1>

        <p className="
          mt-2
          text-sm
          text-slate-400
        ">
          Review and verify suspicious weather reports.
        </p>

      </div>


      {/* SUMMARY */}

      <div className="
        mb-6
        grid
        gap-4
        sm:grid-cols-3
      ">

        <div className="
          rounded-2xl
          border
          border-amber-400/20
          bg-[#102238]
          p-5
        ">

          <p className="text-xs text-slate-500">
            Needs Review
          </p>

          <p className="
            mt-2
            text-3xl
            font-bold
            text-amber-400
          ">
            {suspiciousReports.length}
          </p>

        </div>


        <div className="
          rounded-2xl
          border
          border-emerald-400/20
          bg-[#102238]
          p-5
        ">

          <p className="text-xs text-slate-500">
            Verified
          </p>

          <p className="
            mt-2
            text-3xl
            font-bold
            text-emerald-400
          ">
            {
              reports.filter(
                (r) =>
                  r.status === "Verified"
              ).length
            }
          </p>

        </div>


        <div className="
          rounded-2xl
          border
          border-red-400/20
          bg-[#102238]
          p-5
        ">

          <p className="text-xs text-slate-500">
            Suspicious
          </p>

          <p className="
            mt-2
            text-3xl
            font-bold
            text-red-400
          ">
            {
              reports.filter(
                (r) =>
                  r.status === "Suspicious"
              ).length
            }
          </p>

        </div>

      </div>


      {/* TABLE */}

      <div className="
        overflow-hidden
        rounded-2xl
        border
        border-[#1E3A5F]
        bg-[#102238]
        shadow-xl
      ">

        <div className="
          border-b
          border-[#1E3A5F]
          px-5
          py-4
        ">

          <h2 className="
            text-sm
            font-semibold
            text-white
          ">
            Reports Requiring Review
          </h2>

          <p className="
            mt-1
            text-xs
            text-slate-500
          ">
            Verify or flag reports before they become trusted data.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="
            w-full
            min-w-[900px]
            text-left
            text-sm
          ">

            <thead className="bg-[#0B1728]">

              <tr>

                <th className="
                  px-5
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                ">
                  Report
                </th>

                <th className="
                  px-5
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                ">
                  Location
                </th>

                <th className="
                  px-5
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                ">
                  Event
                </th>

                <th className="
                  px-5
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                ">
                  AI Confidence
                </th>

                <th className="
                  px-5
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                ">
                  Status
                </th>

                <th className="
                  px-5
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                ">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {suspiciousReports.map(
                (report) => (

                  <tr
                    key={report.id}
                    className="
                      border-t
                      border-[#1E3A5F]
                      transition
                      hover:bg-[#16304A]
                    "
                  >

                    <td className="
                      px-5
                      py-4
                      font-semibold
                      text-slate-200
                    ">
                      #{report.id}
                    </td>


                    <td className="
                      px-5
                      py-4
                      text-slate-400
                    ">
                      {report.city},{" "}
                      {report.state}
                    </td>


                    <td className="px-5 py-4">
                      <EventBadge
                        event={report.event}
                      />
                    </td>


                    <td className="
                      px-5
                      py-4
                      font-semibold
                      text-cyan-400
                    ">
                      {report.confidence ?? "N/A"}
                      {report.confidence !==
                        undefined &&
                        "%"}
                    </td>


                    <td className="px-5 py-4">

                      <span className="
                        rounded-full
                        border
                        border-amber-400/20
                        bg-amber-400/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-amber-400
                      ">
                        {report.status}
                      </span>

                    </td>


                    <td className="px-5 py-4">

                      <div className="flex gap-2">

                        {/* VERIFY */}

                        <button
                          onClick={() =>
                            updateStatus(
                              report.id,
                              "Verified"
                            )
                          }
                          title="Verify"
                          className="
                            rounded-lg
                            border
                            border-emerald-400/20
                            bg-emerald-400/10
                            p-2
                            text-emerald-400
                            transition
                            hover:bg-emerald-400/20
                          "
                        >
                          <Check size={17} />
                        </button>


                        {/* REJECT */}

                        <button
                          onClick={() =>
                            updateStatus(
                              report.id,
                              "Rejected"
                            )
                          }
                          title="Reject"
                          className="
                            rounded-lg
                            border
                            border-red-400/20
                            bg-red-400/10
                            p-2
                            text-red-400
                            transition
                            hover:bg-red-400/20
                          "
                        >
                          <X size={17} />
                        </button>


                        {/* DUPLICATE */}

                        <button
                          onClick={() =>
                            updateStatus(
                              report.id,
                              "Duplicate"
                            )
                          }
                          title="Mark Duplicate"
                          className="
                            rounded-lg
                            border
                            border-amber-400/20
                            bg-amber-400/10
                            p-2
                            text-amber-400
                            transition
                            hover:bg-amber-400/20
                          "
                        >
                          <Copy size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {suspiciousReports.length === 0 && (
          <div className="
            p-12
            text-center
          ">

            <p className="
              text-sm
              font-medium
              text-slate-300
            ">
              No reports currently need review.
            </p>

            <p className="
              mt-1
              text-xs
              text-slate-500
            ">
              Everything is currently up to date.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}