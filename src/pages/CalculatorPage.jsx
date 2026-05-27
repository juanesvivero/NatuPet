import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Scale, ShieldAlert, Gauge, Heart, ChevronDown } from 'lucide-react';
import { Badge } from '../components/Badge';
import { DonutIndicator } from '../components/DonutIndicator';
import { Stepper } from '../components/Stepper';
import { snackLines } from '../data/mockData';
import { buildRecommendation } from '../utils/nutrition';

const initialProfile = {
  petName: '',
  age: 'adulto',
  size: 'mediano',
  weight: '',
  activity: 'normal',
  allergies: ['ninguna']
};

const ageOptions = [
  ['cachorro', 'Cachorro (Menos de 12 meses)'],
  ['adulto', 'Adulto (Edad media)'],
  ['senior', 'Senior (Mayor de 7 años)']
];

const sizeOptions = [
  ['pequeno', 'Pequeño (Menos de 10 kg)'],
  ['mediano', 'Mediano (10 a 25 kg)'],
  ['grande', 'Grande (Más de 25 kg)']
];

const activityOptions = [
  ['bajo', 'Bajo (Poco activo / Reposo)'],
  ['normal', 'Normal (Paseos y juego diario)'],
  ['alto', 'Alto (Deporte o gran actividad)']
];

const allergyOptions = [
  ['pollo', 'Pollo / Huevo'],
  ['res', 'Carne de Res'],
  ['gluten', 'Trigo / Gluten'],
  ['ninguna', 'Ninguna / Sin Restricciones']
];

export function CalculatorPage({ snack: initialSnack, showSnackSelect = false }) {
  const [selectedSnackId, setSelectedSnackId] = useState(initialSnack.id);
  const [lastInitialSnackId, setLastInitialSnackId] = useState(initialSnack.id);

  if (initialSnack.id !== lastInitialSnackId) {
    setSelectedSnackId(initialSnack.id);
    setLastInitialSnackId(initialSnack.id);
  }

  const snack = useMemo(() => {
    return snackLines.find((s) => s.id === selectedSnackId) || initialSnack;
  }, [selectedSnackId, initialSnack]);

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState(initialProfile);
  const result = useMemo(() => buildRecommendation(profile, snack), [profile, snack]);

  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }));

  const toggleAllergy = (value) => {
    setProfile((current) => {
      if (value === 'ninguna') return { ...current, allergies: ['ninguna'] };
      const withoutNone = current.allergies.filter((item) => item !== 'ninguna');
      const next = withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value];
      return { ...current, allergies: next.length ? next : ['ninguna'] };
    });
  };

  const handleStepChange = (nextStep) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setStep(nextStep);
      });
    } else {
      setStep(nextStep);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-2">
      {!showSnackSelect && (
        <a
          href={`#/lote/${snack.id}`}
          className="mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-earth transition duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          Volver al lote
        </a>
      )}

      <section className="rounded-3xl border border-oat bg-white p-6 shadow-soft transition-all duration-300">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <Badge tone="green">Pet-Fit Nutrition</Badge>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-ink leading-none">Calculadora inteligente</h1>
            <p className="mt-2 text-xs font-bold leading-normal text-ink/55">
              Snack seleccionado: <span className="font-extrabold text-botanical">{snack.lineName}</span>
            </p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-oat text-[#1A1A1A] shadow-inner">
            <Scale size={22} />
          </span>
        </div>

        {showSnackSelect && (
          <div className="mb-6 rounded-2xl border border-oat bg-cream/50 p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-earth mb-2">Selecciona tu producto:</p>
            <div className="relative">
              <select
                value={selectedSnackId}
                onChange={(e) => setSelectedSnackId(e.target.value)}
                className="w-full min-h-12 pr-10 pl-4 rounded-xl border border-oat bg-white text-sm font-bold text-botanical outline-none appearance-none cursor-pointer focus:border-botanical"
              >
                {snackLines.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.lineName} ({s.processLabel})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-earth" />
            </div>
          </div>
        )}

        {step <= 3 ? (
          <>
            <Stepper current={step} total={3} />
            
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-oat/50 pb-3">
                  <span className="text-[#1A1A1A]">
                    <Heart size={20} className="stroke-[2.5]" />
                  </span>
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Perfil de tu Mascota</h3>
                </div>


                <Field label="Nombre de la mascota">
                  <input
                    value={profile.petName}
                    onChange={(event) => update('petName', event.target.value)}
                    placeholder="Ej. Mila o Bruno"
                    className="input font-bold"
                  />
                </Field>
                <Segmented
                  label="Etapa de vida / Edad"
                  value={profile.age}
                  options={ageOptions}
                  onChange={(value) => update('age', value)}
                />
                <Segmented
                  label="Tamaño de raza"
                  value={profile.size}
                  options={sizeOptions}
                  onChange={(value) => update('size', value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-oat/50 pb-3">
                  <span className="text-[#1A1A1A]">
                    <Scale size={20} className="stroke-[2.5]" />
                  </span>
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Estado Físico & Peso</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-ink">Peso actual en kg</span>
                    <span className="text-sm font-black text-botanical bg-sage/35 px-3 py-1 rounded-full border border-botanical/15">
                      {profile.weight ? `${profile.weight} kg` : 'Pendiente...'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="0.5"
                      value={profile.weight || 10}
                      onChange={(event) => update('weight', event.target.value)}
                      className="premium-range flex-1"
                    />
                    <input
                      value={profile.weight}
                      onChange={(event) => update('weight', event.target.value)}
                      placeholder="Ej. 12.5"
                      min="0.5"
                      max="90"
                      step="0.1"
                      inputMode="decimal"
                      type="number"
                      className="w-24 min-h-12 text-center rounded-2xl border border-oat bg-cream px-3 text-sm font-extrabold outline-none focus:border-botanical focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-oat/50 pb-3 pt-2">
                  <span className="text-[#1A1A1A]">
                    <Gauge size={20} className="stroke-[2.5]" />
                  </span>
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Nivel de Actividad</h3>
                </div>

                <Segmented
                  label="Actividad física diaria"
                  value={profile.activity}
                  options={activityOptions}
                  onChange={(value) => update('activity', value)}
                  isVertical={true}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-oat/50 pb-3">
                  <span className="text-[#1A1A1A]">
                    <ShieldAlert size={20} className="stroke-[2.5]" />
                  </span>
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Filtro de Alergias</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-black text-ink">Alergias o sensibilidades conocidas</p>
                    <p className="text-xs font-semibold text-ink/55 mt-0.5">Marcaremos un aviso preventivo si el lote posee estos ingredientes.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {allergyOptions.map(([value, label]) => {
                      const isSelected = profile.allergies.includes(value);
                      return (
                        <label
                          key={value}
                          className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-xs font-black transition duration-200 select-none shadow-[2px_2px_8px_rgba(0,0,0,0.01)] ${
                            isSelected
                              ? 'border-botanical bg-sage/25 text-botanical ring-2 ring-botanical/10'
                              : 'border-oat bg-cream/35 text-ink/75 hover:border-sage hover:bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAllergy(value)}
                            className="h-4.5 w-4.5 rounded-lg accent-botanical cursor-pointer"
                          />
                          <span>{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleStepChange(Math.max(1, step - 1))}
                className="btn-secondary"
                disabled={step === 1}
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => handleStepChange(step === 3 ? 4 : step + 1)}
                className="btn-primary"
              >
                {step === 3 ? 'Ver ración' : 'Siguiente'}
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>
            </div>
          </>
        ) : (
          <ResultPanel result={result} snack={snack} petName={profile.petName} onReset={() => handleStepChange(1)} />
        )}
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-ink">{label}</span>
      {children}
    </label>
  );
}

function Segmented({ label, value, options, onChange, isVertical = false }) {
  return (
    <div>
      <p className="mb-3 text-sm font-black text-ink">{label}</p>
      <div className={`grid gap-2.5 ${isVertical ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {options.map(([optionValue, optionLabel]) => {
          const isSelected = value === optionValue;
          return (
            <button
              key={optionValue}
              type="button"
              onChange={() => onChange(optionValue)}
              onClick={() => onChange(optionValue)}
              className={`min-h-12 rounded-2xl border px-4 text-xs font-black transition duration-200 text-left sm:text-center shadow-[2px_2px_8px_rgba(0,0,0,0.01)] ${
                isSelected
                  ? 'border-botanical bg-sage/25 text-botanical ring-2 ring-botanical/10'
                  : 'border-oat bg-cream/45 text-ink/65 hover:border-sage hover:bg-white'
              }`}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultPanel({ result, snack, petName, onReset }) {
  const name = petName || 'tu mascota';

  if (result.status === 'blocked') {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-amber-200 bg-amber-50/30 p-6 text-amber-950 relative overflow-hidden">
          {/* Subtle logo watermark */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
            <ShieldAlert size={120} className="stroke-[1.5]" />
          </div>
          <div className="relative z-10 flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-600 text-cream shadow-md">
              <ShieldAlert size={24} />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Cuidado Especial Veterinario</p>
              <h2 className="mt-1 text-2xl font-black text-ink leading-tight">{result.title}</h2>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/75">{result.message}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-oat bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 text-earth" size={20} />
            <div>
              <h3 className="text-sm font-black text-ink">Alternativa Sugerida</h3>
              <p className="mt-1.5 text-xs font-bold leading-relaxed text-ink/65">
                Para salvaguardar el bienestar de <span className="font-extrabold text-ink">{name}</span>, aconsejamos cambiar a la línea <span className="font-extrabold text-botanical">{result.alternative.lineName}</span>. {result.alternative.reason}
              </p>
            </div>
          </div>
        </div>

        <button type="button" onClick={onReset} className="btn-secondary w-full">
          Ajustar perfil nutricional
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-sage bg-sage/20 p-6 text-botanical relative overflow-hidden">
        {/* Subtle decorative checkmark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
          <CheckCircle2 size={120} className="stroke-[1.5]" />
        </div>
        
        <div className="relative z-10 flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-botanical text-cream shadow-md">
            <CheckCircle2 size={24} className="stroke-[2.5]" />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-earth">Certificado Nutricional</p>
            <h2 className="mt-1 text-2xl font-black text-ink">{result.title}</h2>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/70">
              Formulación optimizada para <span className="font-black text-botanical">{name}</span> considerando su peso, edad y actividad.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-oat bg-cream/45 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-earth leading-none">Ración Diaria Recomendada</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-6xl font-black text-botanical leading-none">{result.dose.units}</span>
              <span className="text-sm font-extrabold text-ink/70 leading-none">{result.dose.unitLabel} / día</span>
            </div>
          </div>
          <p className="mt-5 border-t border-oat/55 pt-3 text-[11px] font-semibold leading-relaxed text-ink/55">
            Equivale a un máximo controlado de <span className="font-extrabold text-ink/80">{result.dose.grams} g</span> de {snack.shortName} para conservar su balance fit.
          </p>
        </div>

        <div className="rounded-3xl border border-oat bg-white p-6 shadow-sm flex flex-col justify-between">
          <DonutIndicator score={snack.benefit.score} label={snack.benefit.label} />
          <p className="mt-4 border-t border-oat/30 pt-3 text-[11px] font-semibold leading-relaxed text-ink/55">
            {snack.benefit.detail}
          </p>
        </div>
      </div>

      <button type="button" onClick={onReset} className="btn-secondary w-full">
        Recalcular ración
      </button>
    </div>
  );
}


