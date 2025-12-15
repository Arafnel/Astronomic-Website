const Home = () => {
  return (
    <main className="relative overflow-hidden">
      {/* фон и декоративные элементы */}
      <div className="hero-glow starfield absolute inset-0 opacity-70 pointer-events-none" />
      <div className="absolute -left-40 -bottom-40 h-80 w-80 rounded-full border border-gold-700/60 shadow-[0_0_120px_rgba(250,219,141,0.35)]" />
      <div className="absolute -right-32 top-10 h-72 w-72 rounded-full border border-gold-600/50" />

      {/* контент */}
      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center md:items-start md:text-left">
        <div className="inline-flex items-center gap-3 rounded-full border border-gold-500/40 bg-black/40 px-4 py-2 text-xs tracking-[0.25em] uppercase text-gold-200 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_18px_rgba(243,210,138,0.9)]" />
          <span>Map of the observable universe</span>
        </div>

        <h1 className="mt-8 bg-cosmic-gradient bg-clip-text text-5xl font-semibold tracking-wide text-transparent sm:text-6xl md:text-7xl">
          AstrumAtlas
        </h1>

        <p className="mt-6 max-w-xl text-lg text-gold-100/80 md:text-xl">
          Where curiosity meets the cosmos.
          <br className="hidden md:block" />
          Your map of the observable universe.
        </p>

        <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:items-end md:gap-16">
          {/* блок с числом объектов */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-gold-500/25 via-transparent to-gold-700/10 blur-2xl" />
            <div className="relative rounded-3xl border border-gold-500/40 bg-black/40 px-10 py-8 text-left shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-200/80">
                More than
              </p>
              <p className="mt-3 text-5xl font-semibold text-gold-100 md:text-6xl">
                739K
              </p>
              <p className="mt-3 max-w-[12rem] text-sm text-gold-100/80">
                astronomical objects in your personal atlas.
              </p>
            </div>
          </div>

          {/* вертикальный список "лун / разделов" */}
          <div className="flex items-center gap-6 md:gap-10">
            <div className="flex flex-col gap-4">
              <span className="h-10 w-10 rounded-full border border-gold-400/60 bg-gradient-to-br from-gold-300/90 to-gold-600/80 shadow-[0_0_24px_rgba(243,210,138,0.9)]" />
              <span className="h-10 w-10 rounded-full border border-gold-500/50 bg-gradient-to-br from-black to-gold-700/60" />
              <span className="h-10 w-10 rounded-full border border-gold-500/40 bg-gradient-to-br from-black  via-gold-800/60 to-gold-600/70" />
              <span className="h-10 w-10 rounded-full border border-gold-300/60 bg-gradient-to-br from-gold-200/80 to-black" />
            </div>

            <div className="space-y-4 text-left text-sm text-gold-100/85">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold-300">
                  🔭 Object catalog
                </p>
                <p className="mt-1 text-sm">
                  Planets, stars, nebulae and galaxies in one place.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold-300">
                  📅 Cosmic events
                </p>
                <p className="mt-1 text-sm">
                  Eclipses, planetary conjunctions and meteor showers in your calendar.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold-300">
                  ⭐ Your personal constellation
                </p>
                <p className="mt-1 text-sm">
                  Save your favorite objects and collect your own collections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;