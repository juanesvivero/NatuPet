import { ChevronRight, Sprout } from 'lucide-react';

export function IngredientCard({ ingredient, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-2xl border p-4 text-left shadow-sm transition duration-300 ${
        selected
          ? 'border-botanical bg-white shadow-soft ring-2 ring-botanical/15 scale-[1.02]'
          : 'border-oat bg-white/85 hover:-translate-y-1 hover:border-moss hover:bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition duration-300 ${
          selected ? 'bg-botanical text-cream shadow-sm' : 'bg-sage text-botanical'
        }`}>
          <Sprout size={18} className={selected ? 'animate-pulse' : ''} />
        </span>
        <ChevronRight
          size={18}
          className={`mt-2 text-earth transition-transform duration-300 ${
            selected ? 'rotate-90 text-botanical scale-110' : 'group-hover:translate-x-0.5'
          }`}
        />
      </div>
      <h3 className={`mt-4 text-sm font-black transition duration-200 ${selected ? 'text-botanical' : 'text-ink'}`}>
        {ingredient.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink/55 group-hover:text-ink/75">
        {ingredient.origin}
      </p>
    </button>
  );
}

