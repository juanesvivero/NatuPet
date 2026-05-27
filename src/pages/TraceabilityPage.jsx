import { useState } from 'react';
import { ArrowRight, CalendarCheck, MapPin, QrCode, ShieldCheck } from 'lucide-react';
import { Badge } from '../components/Badge';
import { ConservationCard } from '../components/ConservationCard';
import { IngredientCard } from '../components/IngredientCard';
import { formatDate } from '../utils/format';
import { CalculatorPage } from './CalculatorPage';

export function TraceabilityPage({ snack }) {
  // Sync selected ingredient with active snack lot
  const [selectedIngredient, setSelectedIngredient] = useState(snack.ingredients[0]);
  const [lastSnackId, setLastSnackId] = useState(snack.id);

  if (snack.id !== lastSnackId) {
    setSelectedIngredient(snack.ingredients[0]);
    setLastSnackId(snack.id);
  }

  const handleIngredientClick = (ingredient) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedIngredient(ingredient);
      });
    } else {
      setSelectedIngredient(ingredient);
    }
  };

  const scrollToCalculator = (e) => {
    e.preventDefault();
    const element = document.getElementById('nutritional-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-oat bg-white shadow-soft">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1b3e18] via-[#2d5a27] to-[#4c7c45] p-6 text-cream">
          {/* Decorative mesh */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge tone="light">{snack.processLabel}</Badge>
                <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl drop-shadow-sm">
                  {snack.lineName}
                </h1>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 border border-white/20 text-cream shadow-inner">
                <QrCode size={24} />
              </span>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-3.5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-cream/70 leading-none">Código de Lote</p>
                <p className="mt-2 text-base font-extrabold tracking-tight">{snack.lotCode}</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-3.5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-cream/70 leading-none">Elaboración</p>
                <p className="mt-2 text-base font-extrabold tracking-tight">{formatDate(snack.madeAt)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex flex-col gap-3 rounded-2xl border border-sage/60 bg-sage/20 p-5 text-botanical sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage text-botanical shadow-sm">
                <ShieldCheck size={20} className="stroke-[2.5]" />
              </span>
              <div>
                <p className="font-black leading-snug">Este lote es seguro y fresco</p>
                <p className="text-xs font-semibold text-botanical/80">Certificado de trazabilidad y control de calidad NatuPet.</p>
              </div>
            </div>
            <div className="shrink-0 rounded-xl bg-white border border-sage px-3.5 py-2 text-center shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-wider text-earth leading-none">Consumir antes de</p>
              <p className="mt-1.5 text-xs font-black text-ink">{formatDate(snack.expiresAt)}</p>
            </div>
          </div>
        </div>
      </section>

      <ConservationCard conservation={snack.conservation} process={snack.process} />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-earth">Héroes locales</p>
            <h2 className="mt-1 text-2xl font-black text-ink">Ingredientes transparentes</h2>
          </div>
          <Badge tone="earth">{snack.ingredients.length} activos</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {snack.ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.name}
              ingredient={ingredient}
              selected={selectedIngredient.name === ingredient.name}
              onClick={() => handleIngredientClick(ingredient)}
            />
          ))}
        </div>

        <article className="rounded-3xl border border-sage bg-gradient-to-b from-white to-sage/5 p-6 shadow-sm transition-all duration-300">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-oat px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-earth">
                <MapPin size={12} className="stroke-[2.5]" />
                <span>{selectedIngredient.origin}</span>
              </div>
              <h3 className="mt-3 text-2xl font-black text-botanical">{selectedIngredient.name}</h3>
            </div>
            <Badge tone="gold">100% natural</Badge>
          </div>
          <div className="mt-4 border-t border-oat/40 pt-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-earth">Beneficio & Propósito</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-ink/70">{selectedIngredient.why}</p>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-oat bg-cream/40 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-oat text-earth shadow-inner">
            <CalendarCheck size={22} />
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-earth">Trazabilidad Digital Asegurada</p>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-ink/65">
              Cada empaque de NatuPet cuenta con un registro único digital. Este reporte conecta de forma transparente la procedencia de cada ingrediente ecuatoriano de alta calidad, el proceso artesanal de elaboración y las pautas de alimentación recomendadas por expertos.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded interactive calculator */}
      <section id="nutritional-calculator" className="pt-6 border-t border-oat/50">
        <CalculatorPage snack={snack} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-oat bg-cream/80 p-4 backdrop-blur-xl">
        <div className="mx-auto max-w-md">
          <button
            onClick={scrollToCalculator}
            className="group flex w-full min-h-14 items-center justify-center gap-2.5 rounded-2xl bg-botanical px-6 py-4 text-center text-sm font-black text-cream shadow-lg transition duration-300 hover:scale-[1.01] hover:bg-moss hover:shadow-xl active:scale-100"
          >
            <span>¿Cuánto debe comer hoy? Calcular ración</span>
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}


