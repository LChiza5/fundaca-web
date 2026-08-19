export default function Loading() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-bosque/10 bg-crema-hondo">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="animate-pulse">
            <div className="h-3 w-24 rounded-full bg-bosque/10" />
            <div className="mt-4 h-10 w-3/4 rounded-lg bg-bosque/10" />
            <div className="mt-6 h-4 w-2/3 rounded bg-bosque/8" />
            <div className="mt-2 h-4 w-1/2 rounded bg-bosque/8" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-bosque/6" />
          ))}
        </div>
      </section>
    </>
  );
}
