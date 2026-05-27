import { PackageCheck, Snowflake, SunMedium } from 'lucide-react';

export function ConservationCard({ conservation, process }) {
  const isCold = process.toLowerCase().includes('cold');
  const isDry = process.toLowerCase().includes('deshidrat') || process.toLowerCase().includes('slow');
  const Icon = isCold ? Snowflake : isDry ? SunMedium : PackageCheck;

  const theme = isCold
    ? { bg: 'bg-sky-50 text-sky-600 border border-sky-100', dot: 'bg-sky-500' }
    : isDry
      ? { bg: 'bg-amber-50 text-amber-600 border border-amber-100', dot: 'bg-amber-500' }
      : { bg: 'bg-sage/40 text-botanical border border-botanical/15', dot: 'bg-botanical' };

  return (
    <section className="rounded-2xl border border-oat bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${theme.bg}`}>
          <Icon size={22} />
        </span>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-earth">Conservación óptima</p>
          <h2 className="mt-0.5 text-lg font-black leading-tight text-ink">{conservation.title}</h2>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {conservation.instructions.map((instruction, index) => (
          <div key={instruction} className="flex flex-col gap-2 rounded-xl bg-cream/40 border border-oat/30 p-3.5 shadow-[2px_2px_8px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink/40">Instrucción {index + 1}</span>
            </div>
            <p className="text-xs font-bold leading-relaxed text-ink/70">{instruction}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

