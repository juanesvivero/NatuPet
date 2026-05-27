import natupetLogo from '../assets/brand/natupet-logo.png';

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 glass-nav">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-3">
          <a href="#/" className="block transition duration-200 hover:scale-[1.02]" aria-label="Ir al inicio">
            <img
              src={natupetLogo}
              alt="NatuPet Logo"
              width="900"
              height="222"
              decoding="async"
              className="h-10 w-auto object-contain sm:h-11"
            />
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-5 sm:pt-8">{children}</main>
    </div>
  );
}
