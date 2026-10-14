const money = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const categoryColors = {
  Market: "bg-amber-50 text-amber-700",
  Ulaşım: "bg-sky-50 text-sky-700",
  Fatura: "bg-violet-50 text-violet-700",
  Eğitim: "bg-blue-50 text-blue-700",
  Sağlık: "bg-teal-50 text-teal-700",
  Eğlence: "bg-pink-50 text-pink-700",
  Maaş: "bg-emerald-50 text-emerald-700",
  Diğer: "bg-slate-100 text-slate-600",
};

export default function TransactionList({ items, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-14 text-center">
        <p className="text-sm font-medium text-slate-700">Kayıt bulunamadı</p>
        <p className="mt-1 text-xs text-slate-500">Yeni bir işlem ekleyebilir veya filtreyi değiştirebilirsin.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100">
      <div className="hidden grid-cols-[minmax(0,1fr)_120px_125px_100px] gap-4 bg-slate-50 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 md:grid">
        <span>İşlem</span>
        <span>Kategori</span>
        <span>Tutar</span>
        <span className="text-right">İşlem</span>
      </div>
      {items.map((item) => (
        <article key={item.id} className="grid gap-3 border-t border-slate-100 px-4 py-3.5 first:border-t-0 md:grid-cols-[minmax(0,1fr)_120px_125px_100px] md:items-center md:gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${item.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
              {item.type === "income" ? "↗" : "↘"}
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-medium text-slate-900">{item.title}</h3>
              <p className="mt-0.5 truncate text-xs text-slate-400">
                {formatDate(item.date)}{item.note ? ` · ${item.note}` : ""}
              </p>
            </div>
          </div>

          <div>
            <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${categoryColors[item.category] ?? categoryColors.Diğer}`}>
              {item.category}
            </span>
          </div>

          <strong className={`text-sm font-semibold ${item.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
            {item.type === "income" ? "+" : "-"}{money.format(item.amount)}
          </strong>

          <div className="flex gap-1 md:justify-end">
            <button type="button" onClick={() => onEdit(item)} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50">Düzenle</button>
            <button type="button" onClick={() => onDelete(item.id)} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">Sil</button>
          </div>
        </article>
      ))}
    </div>
  );
}
