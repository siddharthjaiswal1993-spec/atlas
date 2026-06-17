import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  source?: string;
  format?: 'number' | 'percent' | 'position' | 'duration';
  size?: 'sm' | 'md' | 'lg';
  inverse?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  deltaLabel,
  source,
  size = 'md',
  inverse = false,
}) => {
  const isPositive = delta !== undefined && (inverse ? delta < 0 : delta > 0);
  const isNegative = delta !== undefined && (inverse ? delta > 0 : delta < 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide leading-tight">{label}</p>
        {source && (
          <span className="text-xs text-gray-300 font-medium">{source}</span>
        )}
      </div>
      <div className={`font-bold text-gray-900 ${size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-xl' : 'text-2xl'}`}>
        {value}
      </div>
      {delta !== undefined && (
        <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${isPositive ? 'text-emerald-600' : isNegative ? 'text-red-500' : 'text-gray-400'}`}>
          <span>{isPositive ? '▲' : isNegative ? '▼' : '–'}</span>
          <span>{Math.abs(delta).toFixed(1)}{deltaLabel || '%'} vs prior period</span>
        </div>
      )}
    </div>
  );
};

interface MiniBarProps {
  value: number;
  max?: number;
  color?: string;
}

export const MiniBar: React.FC<MiniBarProps> = ({ value, max = 100, color = 'bg-blue-500' }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
};

interface ScoreRingProps {
  score: number;
  max?: number;
  label: string;
  color?: string;
  size?: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score, max = 100, label, color = '#3b82f6', size = 80 }) => {
  const pct = (score / max) * 100;
  const radius = (size - 12) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={8}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-gray-900">{score}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">{label}</p>
    </div>
  );
};
