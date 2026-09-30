import { useState } from "react";
import API from "../api";

export default function CitizenReport() {
  const [form, setForm] = useState({
    event: "",
    state: "",
    city: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        setForm((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        alert(
          "Location detected successfully!"
        );
      },

      (error) => {
        console.error(
          "Location error:",
          error
        );

        if (error.code === 1) {
          alert(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          alert(
            "Unable to determine your location."
          );
        } else if (error.code === 3) {
          alert(
            "Location request timed out."
          );
        } else {
          alert(
            "Unable to get your current location."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.latitude || !form.longitude) {
      alert(
        "Please get your current location before submitting."
      );
      return;
    }

    try {
      setSubmitting(true);

      const reportData = {
        source: "Citizen Report",

        description: form.description,

        date_time:
          new Date().toISOString(),

        state: form.state,

        city: form.city,

        latitude:
          Number(form.latitude),

        longitude:
          Number(form.longitude),

        event_type: form.event,

        image_url: null,

        video_url: null,

        ai_confidence: null,

        verification_status:
          "Needs Review",

        duplicate_status:
          "Unique",
      };

      await API.post(
        "/reports",
        reportData
      );

      alert(
        "Weather report submitted successfully!"
      );

      setForm({
        event: "",
        state: "",
        city: "",
        description: "",
        latitude: "",
        longitude: "",
      });

    } catch (error) {
      console.error(
        "Report submission failed:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to submit weather report."
      );
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="
      min-h-screen
      bg-[#07111F]
      p-5
      text-slate-100
      md:p-8
    ">

      {/* HEADER */}

      <div className="mx-auto mb-7 max-w-4xl">

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">
            Dashboard
          </span>

          <span className="text-slate-700">
            /
          </span>

          <span className="text-cyan-400">
            Citizen Report
          </span>
        </div>

        <h1 className="
          mt-2
          text-3xl
          font-bold
          text-white
        ">
          Submit Citizen Report
        </h1>

        <p className="
          mt-2
          text-sm
          text-slate-400
        ">
          Report a weather-related event from your current location.
        </p>

      </div>


      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
          mx-auto
          max-w-4xl
          space-y-6
          rounded-2xl
          border
          border-[#1E3A5F]
          bg-[#102238]
          p-6
          shadow-xl
          shadow-black/10
          md:p-8
        "
      >

        {/* EVENT */}

        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-200
          ">
            Event Type
          </label>

          <select
            name="event"
            value={form.event}
            onChange={handleChange}
            required
            className="
              w-full
              rounded-xl
              border
              border-[#1E3A5F]
              bg-[#0B1728]
              px-4
              py-3
              text-sm
              text-slate-200
              outline-none
              transition
              focus:border-cyan-400
            "
          >

            <option value="">
              Select event
            </option>

            <option value="Heavy Rainfall">
              Heavy Rainfall
            </option>

            <option value="Flood">
              Flood
            </option>

            <option value="Thunderstorm">
              Thunderstorm
            </option>

            <option value="Heatwave">
              Heatwave
            </option>

            <option value="Fog">
              Fog
            </option>

            <option value="Dust Storm">
              Dust Storm
            </option>

            <option value="Strong Wind">
              Strong Wind
            </option>

          </select>

        </div>


        {/* GPS */}

        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-200
          ">
            Report Location
          </label>

          <button
            type="button"
            onClick={getCurrentLocation}
            className="
              w-full
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              px-4
              py-3
              font-semibold
              text-cyan-400
              transition
              hover:bg-cyan-400/20
            "
          >
            📍 Use My Current Location
          </button>


          {form.latitude &&
          form.longitude && (
            <div className="
              mt-3
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-400/10
              p-4
            ">

              <p className="text-sm text-slate-300">
                <strong>
                  Latitude:
                </strong>{" "}
                {form.latitude}
              </p>

              <p className="mt-1 text-sm text-slate-300">
                <strong>
                  Longitude:
                </strong>{" "}
                {form.longitude}
              </p>

              <p className="
                mt-2
                text-xs
                font-semibold
                text-emerald-400
              ">
                ✓ Location detected successfully
              </p>

            </div>
          )}

        </div>


        {/* STATE */}

        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-200
          ">
            State
          </label>

          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Enter state"
            required
            className="
              w-full
              rounded-xl
              border
              border-[#1E3A5F]
              bg-[#0B1728]
              px-4
              py-3
              text-sm
              text-white
              placeholder:text-slate-600
              outline-none
              transition
              focus:border-cyan-400
            "
          />

        </div>


        {/* CITY */}

        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-200
          ">
            City
          </label>

          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
            className="
              w-full
              rounded-xl
              border
              border-[#1E3A5F]
              bg-[#0B1728]
              px-4
              py-3
              text-sm
              text-white
              placeholder:text-slate-600
              outline-none
              transition
              focus:border-cyan-400
            "
          />

        </div>


        {/* DESCRIPTION */}

        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-200
          ">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the weather event..."
            rows="6"
            required
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-[#1E3A5F]
              bg-[#0B1728]
              px-4
              py-3
              text-sm
              leading-6
              text-white
              placeholder:text-slate-600
              outline-none
              transition
              focus:border-cyan-400
            "
          />

        </div>


        {/* PHOTO */}

        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-200
          ">
            Photo
          </label>

          <input
            type="file"
            accept="image/*"
            className="
              w-full
              rounded-xl
              border
              border-[#1E3A5F]
              bg-[#0B1728]
              p-3
              text-sm
              text-slate-400
              file:mr-4
              file:rounded-lg
              file:border-0
              file:bg-cyan-400/10
              file:px-3
              file:py-2
              file:text-cyan-400
            "
          />

          <p className="mt-2 text-xs text-slate-600">
            Image upload will be connected to storage in the next backend step.
          </p>

        </div>


        {/* VIDEO */}

        <div>

          <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-200
          ">
            Video
          </label>

          <input
            type="file"
            accept="video/*"
            className="
              w-full
              rounded-xl
              border
              border-[#1E3A5F]
              bg-[#0B1728]
              p-3
              text-sm
              text-slate-400
              file:mr-4
              file:rounded-lg
              file:border-0
              file:bg-cyan-400/10
              file:px-3
              file:py-2
              file:text-cyan-400
            "
          />

          <p className="mt-2 text-xs text-slate-600">
            Video upload will be connected to storage in the next backend step.
          </p>

        </div>


        {/* SUBMIT */}

        <button
          type="submit"
          disabled={submitting}
          className="
            w-full
            rounded-xl
            bg-cyan-400
            px-6
            py-3.5
            font-semibold
            text-[#03111D]
            shadow-lg
            shadow-cyan-500/10
            transition
            hover:bg-cyan-300
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {submitting
            ? "Submitting..."
            : "Submit Weather Report"}
        </button>

      </form>

    </div>
  );
}