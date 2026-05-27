export function Badge({ children, tone = 'green' }) {
  const tones = {
    green: 'bg-sage/40 border border-botanical/20 text-botanical',
    earth: 'bg-oat/50 border border-earth/25 text-earth',
    light: 'bg-white/80 border border-oat/80 text-ink/80 backdrop-blur-sm',
    red: 'bg-red-50 border border-red-200 text-red-700',
    gold: 'bg-amber-50 border border-amber-300 text-amber-800'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${tones[tone] || tones.green}`}>
      {children}
    </span>
  );
}

