import { useState } from 'react';
import { ArrowRight, Eye, Sparkles, Cpu, QrCode, Search, Calculator, CheckCircle2, Mail, User, Phone, AlertCircle } from 'lucide-react';
import { snackLines } from '../data/mockData';

export function LandingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [petType, setPetType] = useState('perro');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const scrollToForm = (e) => {
    e.preventDefault();
    const element = document.getElementById('early-access-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCatalog = (e) => {
    e.preventDefault();
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Por favor, completa los campos de Nombre y Correo.');
      return;
    }
    setError('');

    const newLead = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      petType,
      whatsapp: whatsapp.trim(),
      date: new Date().toISOString()
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('natupet_beta_leads') || '[]');
      existingLeads.push(newLead);
      localStorage.setItem('natupet_beta_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.error('Error saving lead:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-oat bg-white p-6 shadow-soft sm:p-12">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-sage/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/35 border border-botanical/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-botanical">
            🌱 Nutrición Natural de Alta Gama
          </span>
          <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            Una nueva era en la alimentación de perros y gatos: transparente, saludable y 100% personalizada.
          </h1>
          <p className="mt-6 text-sm font-semibold leading-relaxed text-ink/65 sm:text-base">
            Snacks funcionales formulados por expertos con trazabilidad digital interactiva por lote. Erradica los químicos industriales y las porciones al azar. Dale a tu mascota el bienestar de lujo que merece.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={scrollToForm}
              className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-2xl bg-botanical px-8 text-sm font-black text-cream shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-moss hover:shadow-lg active:translate-y-0"
            >
              <span>Personalizar Alimentación</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 stroke-[3]" />
            </button>
            <button
              onClick={scrollToCatalog}
              className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-2xl border border-oat bg-white px-8 text-sm font-black text-ink shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sage hover:bg-cream active:translate-y-0"
            >
              <span>Explorar Colecciones</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. El Problema */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-earth">La realidad actual</p>
          <h2 className="mt-2 text-3xl font-black text-ink">La crisis de la alimentación industrial</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-oat bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 font-black">
                ✕
              </span>
              <div>
                <h3 className="text-base font-black text-ink">Ingredientes oscuros</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                  Etiquetas confusas con subproductos de baja calidad, conservantes químicos ocultos y rellenos vacíos que comprometen la salud de tu mascota a largo plazo.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-oat bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 font-black">
                ✕
              </span>
              <div>
                <h3 className="text-base font-black text-ink">Comida ultraprocesada</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                  Alimentos sometidos a extremas presiones y temperaturas que destruyen por completo las vitaminas, enzimas y nutrientes esenciales de la comida real.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-oat bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 font-black">
                ✕
              </span>
              <div>
                <h3 className="text-base font-black text-ink">Marcas genéricas de volumen</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                  Piensos industriales masivos diseñados para el almacenamiento prolongado en perchas, priorizando la vida útil comercial sobre el bienestar real de los animales.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-oat bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 font-black">
                ✕
              </span>
              <div>
                <h3 className="text-base font-black text-ink">Cero personalización</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                  Tablas genéricas impresas al dorso del saco que dosifican porciones promedio, ignorando las necesidades metabólicas individuales de cada mascota.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. La visión de NatuPet (El Compromiso) */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-earth">Nuestra Filosofía</p>
          <h2 className="mt-2 text-3xl font-black text-ink">El Compromiso NatuPet</h2>
          <p className="mx-auto mt-2 max-w-md text-xs font-semibold leading-relaxed text-ink/55">
            Reescribimos los estándares de la nutrición para mascotas fusionando el rigor de la ciencia nutricional con la honestidad de la tecnología de trazabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-oat bg-white p-6 shadow-sm">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage/40 text-botanical">
              <Sparkles size={22} />
            </span>
            <h3 className="mt-5 text-lg font-black text-ink">Grado Humano</h3>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/60">
              Ingredientes 100% naturales, frescos y procedentes de pequeños productores ecuatorianos auditados de forma directa.
            </p>
          </div>

          <div className="rounded-3xl border border-oat bg-white p-6 shadow-sm">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-oat text-earth">
              <Eye size={22} />
            </span>
            <h3 className="mt-5 text-lg font-black text-ink">Transparencia Radical</h3>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/60">
              Tecnología de trazabilidad única por lote mediante QR. Conoce la procedencia, fecha exacta y propósito biológico de cada ingrediente.
            </p>
          </div>

          <div className="rounded-3xl border border-oat bg-white p-6 shadow-sm">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
              <Cpu size={22} />
            </span>
            <h3 className="mt-5 text-lg font-black text-ink">Tecnología Nutricional</h3>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/60">
              Certeza matemática en la dosificación. Algoritmos inteligentes para calcular la porción diaria fit exacta sin sobrealimentación.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Conceptos visuales (Catálogo de Líneas Activas) */}
      <section id="catalog-section" className="space-y-8">
        <div className="text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-earth">Portafolio Premium</p>
          <h2 className="mt-2 text-3xl font-black text-ink">Líneas de Snacks Funcionales</h2>
          <p className="mx-auto mt-2 max-w-md text-xs font-semibold leading-relaxed text-ink/55">
            Descubre nuestro portafolio de snacks premium activos. Escanea la trazabilidad digital para conocer su ficha de calidad y calcular su ración.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {snackLines.map((snack) => (
            <div
              key={snack.id}
              className="flex flex-col justify-between rounded-3xl border border-oat bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <Badge tone={snack.process.toLowerCase().includes('cold') ? 'light' : 'green'}>
                  {snack.processLabel}
                </Badge>
                <h3 className="mt-4 text-xl font-black text-ink">{snack.shortName}</h3>
                <p className="mt-1 text-[9px] font-extrabold uppercase tracking-wider text-earth leading-none">
                  Fórmula Activa: {snack.lineName}
                </p>
                <p className="mt-4 text-xs font-semibold leading-relaxed text-ink/60">
                  {snack.benefit.detail}
                </p>
              </div>
              <div className="mt-6 border-t border-oat/55 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-ink/30 uppercase">Lote: {snack.lotCode}</span>
                <a
                  href={`#/lote/${snack.id}`}
                  className="inline-flex items-center gap-1 text-xs font-black text-botanical hover:text-moss transition"
                >
                  Verificar Trazabilidad <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Early Access / Formulario (Club NatuPet) */}
      <section id="early-access-form" className="mx-auto max-w-xl scroll-mt-20">
        <div className="rounded-3xl border border-oat bg-white p-6 shadow-soft sm:p-8">
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage text-botanical">
                <CheckCircle2 size={32} className="stroke-[2.5]" />
              </span>
              <h3 className="text-2xl font-black text-ink">¡Bienvenido a la familia!</h3>
              <p className="text-sm font-semibold leading-relaxed text-ink/65">
                ¡Gracias por registrar a <span className="font-black text-botanical">{name}</span>! Hemos guardado su perfil nutricional de forma segura. Te enviaremos guías de nutrición personalizadas elaboradas por veterinarios y promociones exclusivas directamente a tu correo: <span className="font-bold text-ink">{email}</span>.
              </p>
              <button
                onClick={() => {
                  setName('');
                  setEmail('');
                  setWhatsapp('');
                  setSubmitted(false);
                }}
                className="btn-secondary w-full"
              >
                Registrar otra mascota
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-oat px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-earth border border-earth/10">
                  Club NatuPet
                </span>
                <h3 className="mt-3 text-2xl font-black text-ink">Registra a tu Mascota</h3>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-ink/50">
                  Obtén guías de alimentación de autor, alertas de calidad y beneficios exclusivos del club.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/50 p-3 text-xs font-bold text-red-700">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/60 mb-1.5">
                    Nombre del tutor <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Andrés"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/60 mb-1.5">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
                    <input
                      type="email"
                      required
                      placeholder="Ej. andres@natupet.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/60 mb-2">
                    Tipo de Mascota <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['perro', 'gato', 'ambos'].map((type) => {
                      const isSelected = petType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPetType(type)}
                          className={`min-h-12 rounded-xl border text-xs font-black uppercase tracking-wider transition ${
                            isSelected
                              ? 'border-botanical bg-sage/25 text-botanical ring-2 ring-botanical/10'
                              : 'border-oat bg-cream/45 text-ink/65 hover:border-sage hover:bg-white'
                          }`}
                        >
                          {type === 'perro' ? '🐶 Perro' : type === 'gato' ? '🐱 Gato' : '🐾 Ambos'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/60 mb-1.5">
                    WhatsApp <span className="text-ink/35 font-semibold text-[10px] lowercase">(opcional)</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
                    <input
                      type="tel"
                      placeholder="Ej. +593 99 999 9999"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="input pl-11"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-4">
                <span>Registrar Mascota & Unirse</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 6. Footer simple */}
      <footer className="border-t border-oat/55 pt-8 text-center space-y-4">
        <div className="flex justify-center gap-6 text-xs font-bold text-ink/55">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-botanical transition">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-botanical transition">TikTok</a>
          <a href="mailto:hola@natupet.com" className="hover:text-botanical transition">hola@natupet.com</a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink/30">
            © {new Date().getFullYear()} NatuPet Digital. Todos los derechos reservados.
          </p>
          <span className="inline-flex items-center rounded-full bg-sage/35 border border-botanical/15 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-botanical">
            Orgullosamente Elaborado en Ecuador 🇪🇨
          </span>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, tone = 'green' }) {
  const tones = {
    green: 'bg-sage/40 border border-botanical/20 text-botanical',
    light: 'bg-white/80 border border-oat/80 text-ink/80 backdrop-blur-sm',
    earth: 'bg-oat/50 border border-earth/25 text-earth'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}
