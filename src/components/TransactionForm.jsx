import { useState } from "react";

const categories = ["Market", "Ulaşım", "Fatura", "Eğitim", "Sağlık", "Eğlence", "Maaş", "Diğer"];

const createEmptyForm = () => ({
  type: "expense",
  title: "",
  amount: "",
  category: "Market",
  date: new Date().toISOString().slice(0, 10),
  note: "",
});

export default function TransactionForm({ onSave }) {
  const [form, setForm] = useState(createEmptyForm());

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ ...form, amount: Number(form.amount) });
    setForm(createEmptyForm());
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-3 focus:ring-indigo-100";
  const labelClass = "mb-1.5 block text-xs font-medium text-slate-600";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/50 lg:sticky lg:top-5">
    
      <div className="space-y-3.5">
        <div>
          <span className={labelClass}>İşlem türü</span>
          <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setForm((current) => ({ ...current, type: "expense" }))}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${form.type === "expense" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Gider
            </button>
            <button
              type="button"
              onClick={() => setForm((current) => ({ ...current, type: "income" }))}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${form.type === "income" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Gelir
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="title" className={labelClass}>Başlık</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} className={inputClass} placeholder="Örn. Market alışverişi" required />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor="amount" className={labelClass}>Tutar</label>
            <input id="amount" name="amount" value={form.amount} onChange={handleChange} className={inputClass} type="number" min="0.01" step="0.01" placeholder="0,00" required />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>Kategori</label>
            <select id="category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="date" className={labelClass}>Tarih</label>
          <input id="date" name="date" value={form.date} onChange={handleChange} className={inputClass} type="date" required />
        </div>

        <div>
          <label htmlFor="note" className={labelClass}>Not</label>
          <textarea id="note" name="note" value={form.note} onChange={handleChange} className={`${inputClass} min-h-16 resize-none`} placeholder="İsteğe bağlı" />
        </div>
      </div>

      <button className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:ring-3 focus:ring-indigo-200">
        İşlemi ekle
      </button>
    </form>
  );
}
