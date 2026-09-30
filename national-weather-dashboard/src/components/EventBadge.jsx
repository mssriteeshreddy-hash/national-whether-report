const eventStyles = {
  "Heavy Rainfall":
    "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",

  Flood:
    "bg-red-400/10 text-red-400 border-red-400/20",

  Heatwave:
    "bg-amber-400/10 text-amber-400 border-amber-400/20",

  Thunderstorm:
    "bg-purple-400/10 text-purple-400 border-purple-400/20",

  "Dust Storm":
    "bg-orange-400/10 text-orange-400 border-orange-400/20",

  "Strong Wind":
    "bg-blue-400/10 text-blue-400 border-blue-400/20",

  Fog:
    "bg-slate-400/10 text-slate-300 border-slate-400/20",
};

export default function EventBadge({ event }) {
  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${
          eventStyles[event] ||
          "border-slate-400/20 bg-slate-400/10 text-slate-300"
        }
      `}
    >
      {event || "Unknown"}
    </span>
  );
}