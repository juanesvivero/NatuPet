export function Stepper({ current, total }) {
  return (
    <div className="mb-8">
      {/* Visual Stepper Nodes */}
      <div className="relative flex items-center justify-between">
        {/* Track Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-oat rounded-full z-0" />
        {/* Active Track Progress */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-botanical rounded-full transition-all duration-500 z-0"
          style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
        />

        {Array.from({ length: total }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum <= current;
          const isCurrent = stepNum === current;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black transition-all duration-500 border-2 ${
                  isCurrent
                    ? 'border-botanical bg-botanical text-cream shadow-md scale-110 ring-4 ring-sage'
                    : isActive
                      ? 'border-botanical bg-white text-botanical shadow-sm'
                      : 'border-oat bg-cream text-ink/40'
                }`}
              >
                {stepNum}
              </span>
              <span className={`absolute top-10 whitespace-nowrap text-[9px] font-black uppercase tracking-wider transition-colors duration-300 ${
                isCurrent ? 'text-botanical' : isActive ? 'text-ink/60' : 'text-ink/30'
              }`}>
                {stepNum === 1 ? 'Mascota' : stepNum === 2 ? 'Físico' : 'Alergias'}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-5" /> {/* Spacer for labels */}
    </div>
  );
}

