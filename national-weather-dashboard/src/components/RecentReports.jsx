import { Link } from "react-router-dom";
import EventBadge from "./EventBadge";

export default function RecentReports({ reports }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <h3 className="font-bold text-slate-900">
          Recent Reports
        </h3>

        <Link
          to="/reports"
          className="text-sm font-semibold text-blue-600"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {reports.slice(0, 5).map((report) => (
          <Link
            key={report.id}
            to={`/reports/${report.id}`}
            className="flex flex-col gap-3 p-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-semibold text-slate-900">
                {report.city}, {report.state}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {report.date} • {report.time} • {report.source}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <EventBadge event={report.event} />

              <span className="text-xs font-semibold text-slate-500">
                {report.confidence}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}