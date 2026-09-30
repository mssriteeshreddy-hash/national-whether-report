import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

import API from "../api";
const [report, setReport] = useState(null);

useEffect(() => {
  const loadReport = async () => {
    try {
      const response = await API.get(`/reports/${id}`);
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  loadReport();
}, [id]);

import EventBadge from "../components/EventBadge";

export default function ReportDetails() {
  const { id } = useParams();

  const report = reports.find(
    (item) =>
      item.id === Number(id)
  );

  if (!report) {
    return (
      <div className="
        min-h-screen
        bg-[#07111F]
        p-5
        text-slate-100
        md:p-8
      ">

        <div className="
          rounded-2xl
          border
          border-[#1E3A5F]
          bg-[#102238]
          p-10
          text-center
        ">

          <h2 className="
            text-xl
            font-bold
            text-white
          ">
            Report not found
          </h2>

          <p className="
            mt-2
            text-sm
            text-slate-500
          ">
            The requested weather report could not be found.
          </p>

          <Link
            to="/reports"
            className="
              mt-5
              inline-flex
              rounded-xl
              bg-cyan-400
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#03111D]
            "
          >
            Back to Reports
          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="
      min-h-screen
      bg-[#07111F]
      p-5
      text-slate-100
      md:p-8
    ">

      {/* BACK */}

      <Link
        to="/reports"
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-cyan-400
          transition
          hover:text-cyan-300
        "
      >
        <ArrowLeft size={18} />
        Back to Reports
      </Link>


      {/* MAIN CARD */}

      <div className="
        overflow-hidden
        rounded-2xl
        border
        border-[#1E3A5F]
        bg-[#102238]
        shadow-xl
      ">

        <div className="
          grid
          lg:grid-cols-2
        ">


          {/* IMAGE */}

          <div className="
            relative
            min-h-[350px]
            overflow-hidden
            bg-[#0B1728]
          ">

            {report.image ? (
              <img
                src={report.image}
                alt={report.event}
                className="
                  h-full
                  min-h-[350px]
                  w-full
                  object-cover
                "
              />
            ) : (
              <div className="
                flex
                min-h-[350px]
                items-center
                justify-center
                text-slate-500
              ">
                No image available
              </div>
            )}

          </div>


          {/* INFORMATION */}

          <div className="
            space-y-6
            p-6
            md:p-8
          ">

            {/* TITLE */}

            <div>

              <EventBadge
                event={report.event}
              />

              <h1 className="
                mt-4
                text-3xl
                font-bold
                text-white
              ">
                {report.event}
              </h1>

              <p className="
                mt-2
                text-sm
                text-slate-500
              ">
                Report #{report.id}
              </p>

            </div>


            {/* LOCATION / TIME */}

            <div className="
              grid
              gap-4
              sm:grid-cols-2
            ">

              <div className="
                rounded-xl
                border
                border-[#1E3A5F]
                bg-[#0B1728]
                p-4
              ">

                <MapPin
                  className="text-cyan-400"
                  size={20}
                />

                <p className="
                  mt-3
                  text-xs
                  text-slate-500
                ">
                  Location
                </p>

                <p className="
                  mt-1
                  font-semibold
                  text-slate-200
                ">
                  {report.city},{" "}
                  {report.state}
                </p>

              </div>


              <div className="
                rounded-xl
                border
                border-[#1E3A5F]
                bg-[#0B1728]
                p-4
              ">

                <Clock
                  className="text-cyan-400"
                  size={20}
                />

                <p className="
                  mt-3
                  text-xs
                  text-slate-500
                ">
                  Reported
                </p>

                <p className="
                  mt-1
                  font-semibold
                  text-slate-200
                ">
                  {report.date}{" "}
                  {report.time}
                </p>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div>

              <p className="
                text-sm
                font-semibold
                text-white
              ">
                Description
              </p>

              <p className="
                mt-2
                leading-7
                text-slate-400
              ">
                {report.description}
              </p>

            </div>


            {/* DETAILS */}

            <div className="
              grid
              gap-5
              border-y
              border-[#1E3A5F]
              py-5
              sm:grid-cols-3
            ">

              <div>

                <p className="
                  text-xs
                  text-slate-500
                ">
                  Source
                </p>

                <p className="
                  mt-1
                  font-semibold
                  text-slate-200
                ">
                  {report.source}
                </p>

              </div>


              <div>

                <p className="
                  text-xs
                  text-slate-500
                ">
                  AI Classification
                </p>

                <p className="
                  mt-1
                  font-semibold
                  text-slate-200
                ">
                  {report.event}
                </p>

              </div>


              <div>

                <p className="
                  text-xs
                  text-slate-500
                ">
                  AI Confidence
                </p>

                <p className="
                  mt-1
                  font-semibold
                  text-cyan-400
                ">
                  {report.confidence}%
                </p>

              </div>

            </div>


            {/* VERIFICATION */}

            <div className="
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-400/10
              p-4
            ">

              <div className="flex items-center gap-2">

                <ShieldCheck
                  size={20}
                  className="text-emerald-400"
                />

                <span className="
                  font-semibold
                  text-white
                ">
                  Verification Status
                </span>

              </div>

              <p className="
                mt-2
                text-sm
                text-emerald-300
              ">
                {report.status}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}