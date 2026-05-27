export function DonutIndicator({ score, label }) {
  const size = 96;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-24 w-24 shrink-0">
        <svg width={size} height={size} className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="botanicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#63824a" />
              <stop offset="100%" stopColor="#2d5a27" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            stroke="#dde8d5"
            fill="transparent"
            strokeWidth={stroke}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="opacity-55"
          />
          {/* Progress circle */}
          <circle
            stroke="url(#botanicalGradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black text-botanical tracking-tighter">{score}%</span>
        </div>
      </div>
      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-earth leading-none">Beneficio funcional</p>
        <h3 className="mt-2 text-lg font-black leading-tight text-ink">{label}</h3>
      </div>
    </div>
  );
}

