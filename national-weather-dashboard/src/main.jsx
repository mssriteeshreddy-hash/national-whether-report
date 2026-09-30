import React, {
  useEffect,
  useState
} from "react";

import {
  createRoot
} from "react-dom/client";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import "./style.css";


const API =
  "http://localhost:8000/api";


const emptyForm = {

  description: "",

  event_type:
    "Heavy Rain",

  source:
    "citizen",

  state:
    "Chhattisgarh",

  city:
    "Raipur",

  latitude:
    "",

  longitude:
    "",

  image_url:
    "",

  video_url:
    ""
};


function App() {

  const [
    stats,
    setStats
  ] = useState(null);


  const [
    reports,
    setReports
  ] = useState([]);


  const [
    form,
    setForm
  ] = useState(emptyForm);


  const [
    tab,
    setTab
  ] = useState("dashboard");


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    message,
    setMessage
  ] = useState("");


  async function loadData() {

    try {

      const [
        analyticsResponse,
        reportsResponse
      ] = await Promise.all([

        axios.get(
          `${API}/analytics`
        ),

        axios.get(
          `${API}/reports`
        )

      ]);


      setStats(
        analyticsResponse.data
      );

      setReports(
        reportsResponse.data
      );

    }

    catch (error) {

      console.error(error);

      setMessage(
        "Backend not connected."
      );

    }
  }


  useEffect(() => {

    loadData();

  }, []);


  async function submitReport(event) {

    event.preventDefault();

    setLoading(true);

    setMessage("");


    try {

      await axios.post(
        `${API}/reports`,
        {

          ...form,

          latitude:
            form.latitude === ""
              ? null
              : Number(form.latitude),

          longitude:
            form.longitude === ""
              ? null
              : Number(form.longitude)
        }
      );


      setForm(
        emptyForm
      );


      setMessage(
        "Report submitted and verified successfully."
      );


      await loadData();

      setTab(
        "reports"
      );

    }

    catch (error) {

      setMessage(
        error.response?.data?.detail ||
        "Report submission failed."
      );

    }

    finally {

      setLoading(false);

    }
  }


  const dashboardStats =
    stats || {

      total_reports: 0,

      verified_reports: 0,

      pending_reports: 0,

      suspicious_reports: 0,

      event_stats: [],

      state_stats: []
    };


  return (

    <div className="app">

      <aside>

        <div className="brand">

          <div className="logo">
            ☁
          </div>

          <div>

            <b>
              WeatherWatch
            </b>

            <small>
              National Intelligence
            </small>

          </div>

        </div>


        <button
          className={
            tab === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("dashboard")
          }
        >
          Dashboard
        </button>


        <button
          className={
            tab === "reports"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("reports")
          }
        >
          Reports
        </button>


        <button
          className={
            tab === "submit"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("submit")
          }
        >
          + Citizen Report
        </button>


        <button
          className={
            tab === "analytics"
              ? "active"
              : ""
          }
          onClick={() =>
            setTab("analytics")
          }
        >
          Analytics
        </button>


        <div className="sideBottom">

          <span>
            ● System Online
          </span>

          <small>
            FastAPI + PostgreSQL
          </small>

        </div>

      </aside>


      <main>

        <header>

          <div>

            <span className="eyebrow">
              NATIONAL WEATHER MONITORING
            </span>

            <h1>
              {tab === "submit"
                ? "Submit Weather Report"
                : tab.charAt(0).toUpperCase()
                  + tab.slice(1)}
            </h1>

          </div>


          <div className="live">
            ● LIVE
          </div>

        </header>


        {message && (

          <div className="message">
            {message}
          </div>

        )}


        {tab === "dashboard" && (

          <Dashboard
            stats={dashboardStats}
            reports={reports}
          />

        )}


        {tab === "reports" && (

          <Reports
            reports={reports}
          />

        )}


        {tab === "analytics" && (

          <Analytics
            stats={dashboardStats}
          />

        )}


        {tab === "submit" && (

          <SubmitReport
            form={form}
            setForm={setForm}
            submit={submitReport}
            loading={loading}
          />

        )}

      </main>

    </div>
  );
}


function Card({
  label,
  value,
  icon
}) {

  return (

    <div className="card">

      <div className="cardIcon">
        {icon}
      </div>

      <div>

        <small>
          {label}
        </small>

        <strong>
          {value}
        </strong>

      </div>

    </div>

  );
}


function Panel({
  title,
  children
}) {

  return (

    <div className="panel">

      <div className="panelHead">

        <h2>
          {title}
        </h2>

      </div>

      {children}

    </div>

  );
}


function Dashboard({
  stats,
  reports
}) {

  return (

    <section>

      <div className="cards">

        <Card
          label="Total Reports"
          value={stats.total_reports}
          icon="◉"
        />

        <Card
          label="Verified"
          value={stats.verified_reports}
          icon="✓"
        />

        <Card
          label="Needs Review"
          value={stats.pending_reports}
          icon="!"
        />

        <Card
          label="Suspicious"
          value={stats.suspicious_reports}
          icon="⚠"
        />

      </div>


      <div className="grid2">

        <Panel title="Reports by Event">

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <BarChart
              data={stats.event_stats}
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#38bdf8"
                radius={[
                  6,
                  6,
                  0,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </Panel>


        <Panel title="Verification Status">

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={[
                  {
                    name:
                      "Verified",
                    value:
                      stats.verified_reports
                  },
                  {
                    name:
                      "Pending",
                    value:
                      stats.pending_reports
                  },
                  {
                    name:
                      "Suspicious",
                    value:
                      stats.suspicious_reports
                  }
                ]}
                dataKey="value"
                nameKey="name"
                outerRadius={95}
                label
              >

                <Cell fill="#22c55e" />

                <Cell fill="#f59e0b" />

                <Cell fill="#ef4444" />

              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </Panel>

      </div>


      <Panel title="Recent Reports">

        <ReportsTable
          reports={
            reports.slice(0, 6)
          }
        />

      </Panel>

    </section>
  );
}


function Reports({
  reports
}) {

  const [
    search,
    setSearch
  ] = useState("");


  const filtered =
    reports.filter(
      report =>

        (
          report.city +
          " " +
          report.state +
          " " +
          report.event_type +
          " " +
          report.verification_status
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  return (

    <section>

      <div className="toolbar">

        <input
          placeholder="Search city, state, event..."
          value={search}
          onChange={
            event =>
              setSearch(
                event.target.value
              )
          }
        />

        <span>
          {filtered.length} reports
        </span>

      </div>


      <Panel title="All Weather Reports">

        <ReportsTable
          reports={filtered}
        />

      </Panel>

    </section>
  );
}


function ReportsTable({
  reports
}) {

  return (

    <div className="tableWrap">

      <table>

        <thead>

          <tr>

            <th>
              ID
            </th>

            <th>
              Event
            </th>

            <th>
              Location
            </th>

            <th>
              Confidence
            </th>

            <th>
              Status
            </th>

            <th>
              Time
            </th>

          </tr>

        </thead>


        <tbody>

          {reports.map(
            report => (

              <tr key={report.id}>

                <td>
                  #{report.id}
                </td>

                <td>

                  <b>
                    {report.event_type}
                  </b>

                  <small>
                    {report.source}
                  </small>

                </td>

                <td>

                  {report.city},{" "}
                  {report.state}

                  <small>

                    {report.latitude ??
                      "—"}

                    {" , "}

                    {report.longitude ??
                      "—"}

                  </small>

                </td>

                <td>

                  {Math.round(
                    report.ai_confidence *
                    100
                  )}
                  %

                </td>

                <td>

                  <span
                    className={
                      "badge " +
                      report.verification_status
                    }
                  >

                    {
                      report.verification_status
                    }

                  </span>

                </td>

                <td>

                  {new Date(
                    report.created_at
                  ).toLocaleString()}

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>


      {!reports.length && (

        <div className="empty">

          No reports yet.

        </div>

      )}

    </div>
  );
}


function SubmitReport({
  form,
  setForm,
  submit,
  loading
}) {

  const update =
    key =>
    event =>
      setForm({

        ...form,

        [key]:
          event.target.value

      });


  return (

    <section>

      <div className="formCard">

        <h2>
          Citizen Weather Report
        </h2>

        <p className="muted">

          Submit a weather observation
          with location information.
          The verification engine will
          automatically evaluate it.

        </p>


        <form onSubmit={submit}>

          <label>

            Event Type

            <select
              value={form.event_type}
              onChange={
                update("event_type")
              }
            >

              {[
                "Heavy Rain",
                "Flood",
                "Cyclone",
                "Thunderstorm",
                "Lightning",
                "Heatwave",
                "Cold Wave",
                "Hailstorm",
                "Landslide",
                "Drought",
                "Other"
              ].map(
                event => (

                  <option
                    key={event}
                  >
                    {event}
                  </option>

                )
              )}

            </select>

          </label>


          <label>

            Description

            <textarea
              required
              minLength={5}
              value={
                form.description
              }
              onChange={
                update("description")
              }
              placeholder="Describe what you observed..."
            />

          </label>


          <div className="row">

            <label>

              State

              <input
                value={form.state}
                onChange={
                  update("state")
                }
              />

            </label>


            <label>

              City

              <input
                value={form.city}
                onChange={
                  update("city")
                }
              />

            </label>

          </div>


          <div className="row">

            <label>

              Latitude

              <input
                type="number"
                step="any"
                value={
                  form.latitude
                }
                onChange={
                  update("latitude")
                }
                placeholder="21.2514"
              />

            </label>


            <label>

              Longitude

              <input
                type="number"
                step="any"
                value={
                  form.longitude
                }
                onChange={
                  update("longitude")
                }
                placeholder="81.6296"
              />

            </label>

          </div>


          <div className="row">

            <label>

              Image URL

              <input
                value={
                  form.image_url
                }
                onChange={
                  update("image_url")
                }
                placeholder="Optional"
              />

            </label>


            <label>

              Video URL

              <input
                value={
                  form.video_url
                }
                onChange={
                  update("video_url")
                }
                placeholder="Optional"
              />

            </label>

          </div>


          <button
            className="primary"
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : "Submit & Verify Report"}

          </button>

        </form>

      </div>

    </section>
  );
}


function Analytics({
  stats
}) {

  return (

    <section>

      <div className="cards">

        <Card
          label="Total"
          value={stats.total_reports}
          icon="◉"
        />

        <Card
          label="Verified"
          value={stats.verified_reports}
          icon="✓"
        />

        <Card
          label="Pending"
          value={stats.pending_reports}
          icon="!"
        />

        <Card
          label="Suspicious"
          value={stats.suspicious_reports}
          icon="⚠"
        />

      </div>


      <div className="grid2">

        <Panel title="State-wise Reports">

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={stats.state_stats}
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#818cf8"
              />

            </BarChart>

          </ResponsiveContainer>

        </Panel>


        <Panel title="Event-wise Reports">

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={stats.event_stats}
              layout="vertical"
            >

              <XAxis
                type="number"
              />

              <YAxis
                dataKey="name"
                type="category"
                width={100}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#22d3ee"
              />

            </BarChart>

          </ResponsiveContainer>

        </Panel>

      </div>

    </section>
  );
}


createRoot(
  document.getElementById("root")
).render(
  <App />
);