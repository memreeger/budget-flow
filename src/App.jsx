function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-red-600">
          Tailwind CSS Çalışıyor
        </h1>

        <p className="mt-3 text-slate-500">
          Bu kart biçimli görünüyorsa Tailwind kurulumu başarılıdır.
        </p>

        <button
          type="button"
          className="mt-6 rounded-lg bg-yellow-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          Test Butonu
        </button>
      </section>
    </main>
  )
}

export default App