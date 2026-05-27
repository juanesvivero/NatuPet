import { ShieldCheck } from 'lucide-react';

export function AppShell({ children, currentPage }) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 glass-nav">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="#/" className="flex items-center gap-2.5 font-black tracking-tight text-botanical transition duration-200 hover:scale-[1.01]">
            <img
              src="/logo.png"
              alt="NatuPet Logo"
              className="h-10 w-10 object-contain rounded-xl bg-white p-0.5 shadow-sm transition-transform duration-500 hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-base font-black leading-none">NatuPet</span>
              <span className="text-[10px] font-bold tracking-widest text-earth uppercase">Digital</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-6">
            <a
              href="#/"
              className={`text-xs font-black uppercase tracking-wider transition ${
                currentPage === 'landing' ? 'text-botanical' : 'text-ink/65 hover:text-botanical'
              }`}
            >
              Inicio
            </a>
            <a
              href="#/#catalog-section"
              className="text-xs font-black uppercase tracking-wider text-ink/65 hover:text-botanical transition"
            >
              Productos
            </a>
            <a
              href="#/calculadora"
              className={`text-xs font-black uppercase tracking-wider transition ${
                currentPage === 'calculator' ? 'text-botanical' : 'text-ink/65 hover:text-botanical'
              }`}
            >
              Calculadora
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-5 sm:pt-8">{children}</main>
    </div>
  );
}


