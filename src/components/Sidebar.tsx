import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings2,
  Bot,
  FileText,
  Lightbulb,
  Mail,
  BarChart2,
  BookOpen,
  ChevronRight,
  Zap,
  RotateCcw,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  agentComplete: boolean;
  selectedClientId: string | null;
  onReset: () => void;
  reportApproved: boolean;
}

const navItems: { id: Screen; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'workspace', label: 'Workspace', icon: LayoutDashboard },
  { id: 'configure', label: 'Configure Report', icon: Settings2 },
  { id: 'agent-run', label: 'Agent Run', icon: Bot },
  { id: 'report', label: 'Generated Report', icon: FileText },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  { id: 'email-draft', label: 'Email Draft', icon: Mail },
  { id: 'eval', label: 'Eval Dashboard', icon: BarChart2 },
  { id: 'prd', label: 'PRD Summary', icon: BookOpen },
];

const workflowSteps: { screen: Screen; time: string }[] = [
  { screen: 'workspace', time: '~1m' },
  { screen: 'configure', time: '~2m' },
  { screen: 'agent-run', time: '~8m' },
  { screen: 'report', time: '~10m' },
  { screen: 'recommendations', time: '~5m' },
  { screen: 'email-draft', time: '~2m' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  agentComplete,
  selectedClientId,
  onReset,
  reportApproved,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const isAccessible = (screen: Screen) => {
    if (screen === 'workspace' || screen === 'configure' || screen === 'prd') return true;
    if (screen === 'agent-run') return !!selectedClientId;
    return agentComplete;
  };

  const workflowScreens: Screen[] = ['workspace', 'configure', 'agent-run', 'report', 'recommendations', 'email-draft'];
  const currentWorkflowIdx = workflowScreens.indexOf(currentScreen);

  const handleReset = () => {
    if (showResetConfirm) {
      onReset();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 leading-tight">Atlas Reporting</div>
            <div className="text-xs text-gray-400 leading-tight">Pepper Atlas · AI Agent</div>
          </div>
        </div>
      </div>

      {/* Workflow Progress Bar */}
      {selectedClientId && (
        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500 font-medium">Workflow progress</span>
            <span className="text-xs font-bold text-blue-600">
              {Math.min(Math.round(((currentWorkflowIdx + 1) / workflowScreens.length) * 100), 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(((currentWorkflowIdx + 1) / workflowScreens.length) * 100, 100)}%` }}
            />
          </div>
          {reportApproved && (
            <div className="flex items-center gap-1 mt-1.5">
              <CheckCircle2 size={10} className="text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">Report approved</span>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentScreen === item.id;
          const accessible = isAccessible(item.id);
          const workflowStep = workflowSteps.find(w => w.screen === item.id);
          const isDone = agentComplete && workflowScreens.indexOf(item.id) < workflowScreens.length - 1 &&
            workflowScreens.indexOf(item.id) >= 0;

          return (
            <button
              key={item.id}
              onClick={() => accessible && onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                active
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : accessible
                  ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={15} className={active ? 'text-blue-600' : accessible ? 'text-gray-400 group-hover:text-gray-600' : 'text-gray-200'} />
                <span className="text-xs leading-tight">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                {workflowStep && !active && accessible && (
                  <span className="text-xs text-gray-300">{workflowStep.time}</span>
                )}
                {active && <ChevronRight size={13} className="text-blue-400" />}
                {!active && isDone && reportApproved && item.id === 'email-draft' && (
                  <CheckCircle2 size={12} className="text-emerald-400" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Status + Reset */}
      <div className="px-4 py-4 border-t border-gray-100 space-y-2.5">
        <div className="bg-blue-50 rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Clock size={11} className="text-blue-500" />
            <p className="text-xs font-semibold text-blue-700">Avg. time saved</p>
          </div>
          <p className="text-xs text-blue-500">
            {agentComplete
              ? '~212 minutes saved on this report'
              : selectedClientId
              ? 'Ready to run — est. 28 min total'
              : 'Select a client to begin'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
            showResetConfirm
              ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
              : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700'
          }`}
        >
          <RotateCcw size={12} className={showResetConfirm ? 'text-red-500' : ''} />
          {showResetConfirm ? 'Click again to confirm reset' : 'Clear all & reset'}
        </button>
      </div>
    </aside>
  );
};
