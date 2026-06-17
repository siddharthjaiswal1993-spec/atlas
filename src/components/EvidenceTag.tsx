import React from 'react';
import { Badge } from './Badge';

interface EvidenceTagProps {
  source: string;
  confidence?: 'High' | 'Medium' | 'Low';
  impact?: 'High' | 'Medium' | 'Low';
}

export const EvidenceTag: React.FC<EvidenceTagProps> = ({ source, confidence, impact }) => {
  // Split compound sources like "GSC + GA4" for individual coloring
  const sources = source.split('+').map(s => s.trim()).filter(Boolean);

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {sources.map((s, i) => (
        <Badge key={i} label={s} variant="source" value={s} size="sm" />
      ))}
      {confidence && (
        <span className="text-gray-300 text-xs">·</span>
      )}
      {confidence && (
        <Badge
          label={confidence === 'High' ? '✓ High confidence' : confidence === 'Medium' ? '~ Medium confidence' : '⚠ Low confidence'}
          variant="confidence"
          value={confidence}
          size="sm"
        />
      )}
      {impact && (
        <Badge
          label={`${impact} impact`}
          variant="impact"
          value={impact}
          size="sm"
        />
      )}
    </div>
  );
};
