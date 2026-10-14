const styles = {
  income: {
    icon: "bg-emerald-50 text-emerald-600",
    value: "text-emerald-700",
    symbol: "↗",
  },
  expense: {
    icon: "bg-rose-50 text-rose-600",
    value: "text-rose-700",
    symbol: "↘",
  },
  balance: {
    icon: "bg-indigo-50 text-indigo-600",
    value: "text-slate-900",
    symbol: "₺",
  },
};

export default function SummaryCard({ title, value, tone }) {
  const style = styles[tone];

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className={`mt-2 text-xl font-semibold tracking-tight ${style.value}`}>{value}</p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-base font-semibold ${style.icon}`}>
          {style.symbol}
        </span>
      </div>
    </article>
  );
}
