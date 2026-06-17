import React from 'react';
import { CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { CLIENTS } from '../data/clients';
import { Screen } from '../types';

interface TopBarProps {
  currentScreen: Screen;
  selectedClientId: string | null;
  agentComplete: boolean;
  reportApproved: boolean;
}

const screenTitles: Record<Screen, string> = {
  workspace: 'Workspace',
  configure: 'Report Configuration',
  'agent-run': 'Agent Run',
  report: 'Generated Report',
  recommendations: 'Recommendations',
  'email-draft': 'Email Draft',
  eval: 'Eval Dashboard',
  prd: 'PRD Summary',
};

export const TopBar: React.FC<TopBarProps> = ({ currentScreen, selectedClientId, agentComplete, reportApproved }) => {
  const client = CLIENTS.find(c => c.id === selectedClientId);

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-semibold text-gray-900">{screenTitles[currentScreen]}</h1>
        {client && (
          <>
            <span className="text-gray-300 text-sm">/</span>
            <div className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded text-white text-xs font-bold flex items-center justify-center"
                style={{ backgroundColor: client.primaryColor }}
              >
                {client.logo}
              </div>
              <span className="text-sm text-gray-600">{client.name}</span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!selectedClientId && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={12} />
            <span>No client selected</span>
          </div>
        )}
        {selectedClientId && !agentComplete && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            <Loader2 size={12} className="animate-spin" />
            <span>Report pending</span>
          </div>
        )}
        {agentComplete && !reportApproved && (
          <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={12} />
            <span>Report generated — needs review</span>
          </div>
        )}
        {reportApproved && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={12} />
            <span>Approved for sharing</span>
          </div>
        )}
      </div>
    </header>
  );
};
