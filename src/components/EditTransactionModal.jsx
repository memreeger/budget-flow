import { useState } from "react";

const categories = ["Market", "Ulaşım", "Fatura", "Eğitim", "Sağlık", "Eğlence", "Maaş", "Diğer"];

export default function EditTransactionModal({ transaction, onSave, onClose }) {
  const [form, setForm] = useState({
    ...transaction,
    amount: String(transaction.amount),
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ ...form, amount: Number(form.amount) });
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-3 focus:ring-indigo-100";
  const labelClass = "mb-1.5 block text-xs font-medium text-slate-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm" role="presentation" onMouseDown={onClose}>
      <section className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/60 bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id="edit-title" className="text-base font-semibold text-slate-900">İşlemi düzenle</h2>
            <p className="mt-0.5 text-xs text-slate-500">Değişiklikleri kontrol edip kaydet.</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-lg leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Pencereyi kapat">×</button>
        </header>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-type" className={labelClass}>İşlem türü</label>
              <select id="edit-type" name="type" value={form.type} onChange={handleChange} className={inputClass}>
                <option value="expense">Gider</option>
                <option value="income">Gelir</option>
              </select>
            </div>
            <div>
              <label htmlFor="edit-date" className={labelClass}>Tarih</label>
              <input id="edit-date" name="date" value={form.date} onChange={handleChange} className={inputClass} type="date" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="edit-title-input" className={labelClass}>Başlık</label>
              <input id="edit-title-input" name="title" value={form.title} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label htmlFor="edit-amount" className={labelClass}>Tutar</label>
              <input id="edit-amount" name="amount" value={form.amount} onChange={handleChange} className={inputClass} type="number" min="0.01" step="0.01" required />
            </div>
            <div>
              <label htmlFor="edit-category" className={labelClass}>Kategori</label>
              <select id="edit-category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="edit-note" className={labelClass}>Not</label>
              <textarea id="edit-note" name="note" value={form.note} onChange={handleChange} className={`${inputClass} min-h-20 resize-none`} />
            </div>
          </div>

          <footer className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">Vazgeç</button>
            <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">Değişiklikleri kaydet</button>
          </footer>
        </form>
      </section>
    </div>
  );
}
