import React from 'react';

type BadgeVariant = 'source' | 'confidence' | 'impact' | 'status' | 'effort' | 'category' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  value?: string;
  size?: 'sm' | 'md';
}

const sourceColors: Record<string, string> = {
  GSC: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  GA4: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  Semrush: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  'GEO/AI': 'bg-teal-50 text-teal-700 ring-1 ring-teal-200',
  CMS: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  WordPress: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  Webflow: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  Contentful: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
  default: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
};

const confidenceColors: Record<string, string> = {
  High: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Low: 'bg-red-50 text-red-700 ring-1 ring-red-200',
};

const impactColors: Record<string, string> = {
  High: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  Medium: 'bg-sky-50 text-sky-600 ring-1 ring-sky-200',
  Low: 'bg-slate-50 text-slate-600 ring-1 ring-slate-200',
};

const effortColors: Record<string, string> = {
  Low: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  High: 'bg-red-50 text-red-700 ring-1 ring-red-200',
};

const statusColors: Record<string, string> = {
  pending: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  accepted: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  rejected: 'bg-red-50 text-red-600 ring-1 ring-red-200',
  editing: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  waiting: 'bg-slate-100 text-slate-500',
  running: 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-emerald-600',
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', value, size = 'sm' }) => {
  let colorClass = 'bg-gray-100 text-gray-700';

  if (variant === 'source') colorClass = sourceColors[value || label] || sourceColors.default;
  else if (variant === 'confidence') colorClass = confidenceColors[value || label] || confidenceColors.Medium;
  else if (variant === 'impact') colorClass = impactColors[value || label] || impactColors.Medium;
  else if (variant === 'effort') colorClass = effortColors[value || label] || effortColors.Medium;
  else if (variant === 'status') colorClass = statusColors[value || label] || statusColors.pending;

  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${colorClass}`}>
      {label}
    </span>
  );
};
