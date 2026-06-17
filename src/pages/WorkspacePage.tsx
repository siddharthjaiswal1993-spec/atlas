import React from 'react';
import {
  Clock, Play, CheckCircle2, Database, Zap, TrendingUp,
  ArrowRight, Bot, FileText, Mail, BarChart2, Users, Shield,
} from 'lucide-react';
import { CLIENTS } from '../data/clients';
import { Badge } from '../components/Badge';

interface WorkspacePageProps {
  onSelectClient: (clientId: string) => void;
  selectedClientId: string | null;
}

const workflowSteps = [
  { icon: Users, label: 'Select client', time: '1 min', color: 'bg-slate-100 text-slate-600' },
  { icon: Settings2Stub, label: 'Configure report', time: '2 min', color: 'bg-blue-50 text-blue-600' },
  { icon: Bot, label: 'Agent runs & analyzes', time: '8 min', color: 'bg-violet-50 text-violet-600' },
  { icon: FileText, label: 'Review report', time: '10 min', color: 'bg-amber-50 text-amber-600' },
  { icon: CheckCircle2, label: 'Approve & export', time: '7 min', color: 'bg-emerald-50 text-emerald-600' },
];

function Settings2Stub({ size, className }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 16} height={size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
    </svg>
  );
}

export const WorkspacePage: React.FC<WorkspacePageProps> = ({ onSelectClient, selectedClientId }) => {
  return (
    <div className="p-8 max-w-6xl">
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
            <Zap size={13} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Atlas Reporting Agent · L2.5 Bounded Autonomy</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
          Client Reporting Workspace
        </h1>
        <p className="text-gray-500 text-base max-w-2xl">
          An AI reporting agent that plans, pulls data, detects changes, and drafts client-ready reports —
          then hands control back to you for review and approval.
        </p>
      </div>

      {/* Workflow Timeline */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-7 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">How it works — 28 minutes vs 4+ hours</h2>
            <p className="text-xs text-gray-400 mt-0.5">The full CS reporting workflow, automated from data pull to approved email</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
            <TrendingUp size={13} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">88% time saved</span>
          </div>
        </div>

        <div className="flex items-stretch gap-0 relative">
          {workflowSteps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === workflowSteps.length - 1;
            return (
              <React.Fragment key={i}>
                <div className="flex-1 flex flex-col items-center text-center gap-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${step.color}`}>
                    <Icon size={16} />
                  </div>
                  <p className="text-xs font-medium text-gray-700 leading-tight">{step.label}</p>
                  <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-0.5">
                    <Clock size={10} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{step.time}</span>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex items-center flex-shrink-0 px-1 mt-4">
                    <ArrowRight size={14} className="text-gray-200" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Manual vs AI comparison strip */}
        <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="text-2xl font-black text-red-400">4h+</div>
              <div className="text-xs text-red-400">manual effort</div>
            </div>
            <div className="text-xs text-red-600 space-y-0.5">
              <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-300 flex-shrink-0" />Manually pulling 5–7 data sources</div>
              <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-300 flex-shrink-0" />Building spreadsheets & slide decks</div>
              <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-300 flex-shrink-0" />Writing recommendations from scratch</div>
              <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-300 flex-shrink-0" />Drafting and formatting email</div>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="text-2xl font-black text-emerald-500">28m</div>
              <div className="text-xs text-emerald-500">with Atlas Agent</div>
            </div>
            <div className="text-xs text-emerald-700 space-y-0.5">
              <div className="flex items-center gap-1"><CheckCircle2 size={10} className="text-emerald-500 flex-shrink-0" />Agent pulls & analyzes all sources (~8 min)</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={10} className="text-emerald-500 flex-shrink-0" />AI drafts report + recommendations + email</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={10} className="text-emerald-500 flex-shrink-0" />CS reviews, edits, approves (~20 min)</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={10} className="text-emerald-500 flex-shrink-0" />Nothing sent without your approval</div>
            </div>
          </div>
        </div>
      </div>

      {/* Autonomy Model */}
      <div className="grid grid-cols-3 gap-3 mb-7">
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Bot size={14} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Agent plans & executes</p>
            <p className="text-xs text-gray-400 mt-0.5">Selects sources, pulls data, detects anomalies, drafts report and email</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Users size={14} className="text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">You review & edit</p>
            <p className="text-xs text-gray-400 mt-0.5">Accept, reject, or edit every recommendation and email before approval</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Shield size={14} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Nothing sent without approval</p>
            <p className="text-xs text-gray-400 mt-0.5">Agent cannot send emails or publish content — requires explicit CS sign-off</p>
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-800 mb-1">Select a client to begin</h2>
        <p className="text-xs text-gray-400">Choose which client to generate a report for. Each client has pre-connected data sources.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {CLIENTS.map((client) => (
          <div
            key={client.id}
            className={`bg-white rounded-2xl border-2 transition-all duration-200 ${
              selectedClientId === client.id
                ? 'border-blue-500 shadow-lg shadow-blue-50'
                : 'border-gray-100 hover:border-gray-200 hover:shadow-md shadow-sm'
            }`}
          >
            <div className="p-5 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-bold flex-shrink-0"
                    style={{ backgroundColor: client.primaryColor }}
                  >
                    {client.logo}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{client.name}</h3>
                    <p className="text-xs text-gray-400">{client.domain}</p>
                  </div>
                </div>
                {selectedClientId === client.id && (
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Industry</span>
                  <span className="text-gray-700 font-medium text-right max-w-36 leading-tight">{client.industry}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Cadence</span>
                  <span className="text-gray-700 font-medium">{client.cadence}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Last report</span>
                  <span className="text-gray-700 font-medium">{client.lastReport}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Manual effort</span>
                  <div className="flex items-center gap-1">
                    <span className="text-red-500 font-bold line-through opacity-60">{client.manualEffortHours}h</span>
                    <ArrowRight size={10} className="text-gray-300" />
                    <span className="text-emerald-600 font-bold">28m</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-4">
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <Database size={11} />
                Connected sources
              </p>
              <div className="flex flex-wrap gap-1.5">
                {client.connectedSources.map((source) => (
                  <Badge key={source} label={source} variant="source" value={source} size="sm" />
                ))}
              </div>
            </div>

            <div className="px-5 pb-5">
              <button
                onClick={() => onSelectClient(client.id)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 ${
                  selectedClientId === client.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-gray-200'
                }`}
              >
                <Play size={12} />
                {selectedClientId === client.id ? 'Selected — Go to Configure' : 'Create Report'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
