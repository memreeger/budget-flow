import { useEffect, useMemo, useState } from "react";
import EditTransactionModal from "../components/EditTransactionModal";
import SummaryCard from "../components/SummaryCard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { loadTransactions, saveTransactions } from "../utils/storage";

const money = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export default function Dashboard({ userId = "guest" }) {
  const [transactions, setTransactions] = useState(() => loadTransactions(userId));
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    saveTransactions(userId, transactions);
  }, [userId, transactions]);

  const totals = useMemo(() => {
    const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
    const expense = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions
      .filter((item) => type === "all" || item.type === type)
      .filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, query, type]);

  function addTransaction(item) {
    setTransactions((current) => [{ ...item, id: crypto.randomUUID() }, ...current]);
  }

  function updateTransaction(updatedItem) {
    setTransactions((current) => current.map((item) => item.id === updatedItem.id ? updatedItem : item));
    setEditing(null);
  }

  function removeTransaction(id) {
    if (window.confirm("Bu işlem silinsin mi?")) {
      setTransactions((current) => current.filter((item) => item.id !== id));
      if (editing?.id === id) setEditing(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <header className="border-b border-slate-200/80 bg-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-200">BF</span>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-slate-900">BudgetFlow</h1>
              <p className="text-[11px] text-slate-400">Kişisel bütçe takibi</p>
            </div>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
            {transactions.length} işlem
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-slate-800">Genel bakış</h2>
          <p className="mt-0.5 text-xs text-slate-400">Gelir ve giderlerinin kısa özeti</p>
        </div>

        <section className="grid gap-3 sm:grid-cols-3">
          <SummaryCard title="Toplam gelir" value={money.format(totals.income)} tone="income" />
          <SummaryCard title="Toplam gider" value={money.format(totals.expense)} tone="expense" />
          <SummaryCard title="Güncel bakiye" value={money.format(totals.balance)} tone="balance" />
        </section>

        <section className="mt-5 grid items-start gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <TransactionForm onSave={addTransaction} />

          <div className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/50">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">İşlemler</h2>
                <p className="mt-0.5 text-xs text-slate-400">{filtered.length} kayıt gösteriliyor</p>
              </div>

              <div className="flex gap-2">
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-3 focus:ring-indigo-100 sm:w-52" placeholder="İşlem ara..." />
                <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:bg-white">
                  <option value="all">Tümü</option>
                  <option value="income">Gelir</option>
                  <option value="expense">Gider</option>
                </select>
              </div>
            </div>

            <TransactionList items={filtered} onEdit={setEditing} onDelete={removeTransaction} />
          </div>
        </section>
      </main>

      {editing && (
        <EditTransactionModal
          key={editing.id}
          transaction={editing}
          onSave={updateTransaction}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
