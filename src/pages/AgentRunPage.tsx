import React, { useEffect, useState } from 'react';
import { Check, Loader2, Clock, CheckCircle2, ChevronRight, Bot, Zap, Database, AlertTriangle } from 'lucide-react';
import { AgentStep, ReportConfig } from '../types';
import { CLIENTS } from '../data/clients';

interface AgentRunPageProps {
  steps: AgentStep[];
  agentRunning: boolean;
  agentComplete: boolean;
  onReviewReport: () => void;
  onStartAgent: () => void;
  reportConfig: Partial<ReportConfig>;
  selectedClientId: string | null;
}

const stepMeta: Record<string, { color: string; detail: string }> = {
  brief:         { color: 'bg-slate-100 text-slate-600',    detail: 'Parsed report brief: Monthly Executive, Executive tone, 6 sources selected' },
  sources:       { color: 'bg-blue-100 text-blue-700',      detail: 'Selected: GSC, GA4, Semrush, GEO/AI, CMS — all available and connected' },
  gsc:           { color: 'bg-blue-100 text-blue-700',      detail: 'Fetched 28,450 clicks, 412,800 impressions, 8 top queries, 5 top pages' },
  ga4:           { color: 'bg-orange-100 text-orange-700',  detail: 'Fetched 31,200 sessions, 64.2% engagement rate, 842 conversions' },
  semrush:       { color: 'bg-purple-100 text-purple-700',  detail: 'Ranked 8,420 keywords, 4 competitors analyzed, 4 content gaps found' },
  geo:           { color: 'bg-teal-100 text-teal-700',      detail: 'Scored 4 AI engines: ChatGPT 48, Perplexity 52, Gemini 38, AI Overviews 31' },
  cms:           { color: 'bg-slate-100 text-slate-600',    detail: 'Scanned 284 pages — 5 stale, 4 high-impression/low-CTR, 3 missing pages' },
  anomalies:     { color: 'bg-red-100 text-red-700',        detail: '3 high-risk anomalies detected: traffic drop, competitor surge, AI gap' },
  insights:      { color: 'bg-amber-100 text-amber-700',    detail: '6 executive summary bullets generated, 5 risk signals surfaced' },
  recommendations: { color: 'bg-green-100 text-green-700', detail: '8 recommendations generated, ranked by impact × effort matrix' },
  report:        { color: 'bg-blue-100 text-blue-700',      detail: '7-section report drafted: 2,400 words, 96% evidence-backed claims' },
  email:         { color: 'bg-indigo-100 text-indigo-700',  detail: 'Client email drafted with 3 wins, 2 risks, 3 recommended actions' },
};

export const AgentRunPage: React.FC<AgentRunPageProps> = ({
  steps,
  agentRunning,
  agentComplete,
  onReviewReport,
  onStartAgent,
  reportConfig,
  selectedClientId,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const runningStep = steps.find(s => s.status === 'running');
  const progress = (completedCount / steps.length) * 100;
  const client = CLIENTS.find(c => c.id === selectedClientId);

  useEffect(() => {
    if (agentRunning && !startTime) {
      setStartTime(Date.now());
      setElapsedSeconds(0);
    }
    if (!agentRunning && !agentComplete) {
      setStartTime(null);
      setElapsedSeconds(0);
    }
  }, [agentRunning, agentComplete, startTime]);

  useEffect(() => {
    if (!agentRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [agentRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${agentRunning ? 'bg-blue-600' : agentComplete ? 'bg-emerald-500' : 'bg-gray-100'}`}>
              {agentComplete ? (
                <CheckCircle2 size={20} className="text-white" />
              ) : (
                <Bot size={20} className={agentRunning ? 'text-white animate-pulse' : 'text-gray-400'} />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {agentComplete ? 'Report Generated' : agentRunning ? 'Agent Running' : 'Ready to Run'}
              </h1>
              <div className="flex items-center gap-3 mt-0.5">
                {client && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <div className="w-3.5 h-3.5 rounded text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: client.primaryColor, fontSize: 8 }}>
                      {client.logo}
                    </div>
                    {client.name}
                  </div>
                )}
                {reportConfig.reportType && (
                  <span className="text-xs text-gray-400">· {reportConfig.reportType}</span>
                )}
              </div>
            </div>
          </div>

          {(agentRunning || agentComplete) && (
            <div className="text-right">
              <div className={`text-2xl font-black tabular-nums ${agentComplete ? 'text-emerald-600' : 'text-blue-600'}`}>
                {agentComplete
                  ? formatTime(elapsedSeconds > 0 ? elapsedSeconds : 28)
                  : formatTime(elapsedSeconds)}
              </div>
              <div className="text-xs text-gray-400">{agentComplete ? 'total time' : 'elapsed'}</div>
            </div>
          )}
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${agentComplete ? 'bg-emerald-500' : 'bg-blue-600'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-gray-400">
            {completedCount === steps.length ? 'All steps complete' : `${completedCount} of ${steps.length} steps`}
          </span>
          <span className={`text-xs font-bold ${agentComplete ? 'text-emerald-600' : 'text-blue-600'}`}>{Math.round(progress)}%</span>
        </div>
      </div>

      {(agentRunning || agentComplete) && (
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-5">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-gray-400">Report type</span>
              <p className="font-semibold text-gray-700 mt-0.5 leading-tight">{reportConfig.reportType || 'Monthly Executive'}</p>
            </div>
            <div>
              <span className="text-gray-400">Sources</span>
              <p className="font-semibold text-gray-700 mt-0.5">{(reportConfig.dataSources || []).length} connected</p>
            </div>
            <div>
              <span className="text-gray-400">Output tone</span>
              <p className="font-semibold text-gray-700 mt-0.5">{reportConfig.outputTone || 'Executive'}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1.5 mb-6">
        {steps.map((step, i) => {
          const isActive = step.status === 'running';
          const isDone = step.status === 'completed';
          const meta = stepMeta[step.id];

          return (
            <div
              key={step.id}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-blue-50 border border-blue-200 shadow-sm'
                  : isDone
                  ? 'bg-white border border-gray-100'
                  : 'bg-white border border-gray-50 opacity-60'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                isDone ? 'bg-emerald-100' : isActive ? 'bg-blue-600' : 'bg-gray-100'
              }`}>
                {isDone ? (
                  <Check size={12} className="text-emerald-600" />
                ) : isActive ? (
                  <Loader2 size={12} className="text-white animate-spin" />
                ) : (
                  <span className="text-gray-300 text-xs">{i + 1}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-xs font-semibold leading-tight ${isDone ? 'text-gray-700' : isActive ? 'text-blue-800' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {isDone && meta && (
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${meta.color}`}>
                      done
                    </span>
                  )}
                  {isActive && (
                    <span className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 bg-blue-100 text-blue-700 animate-pulse">
                      running
                    </span>
                  )}
                </div>
                {(isActive || isDone) && meta && (
                  <p className={`text-xs mt-0.5 leading-relaxed ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                    {isDone ? meta.detail : step.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!agentRunning && !agentComplete && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <Bot size={26} className="text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Ready to generate your report</h3>
          <p className="text-sm text-gray-400 mb-2 max-w-sm mx-auto">
            The agent will pull data from {(reportConfig.dataSources || ['GSC', 'GA4', 'Semrush']).length} sources, detect changes, analyze competitors and AI visibility, then draft your complete client report.
          </p>
          <p className="text-xs text-gray-300 mb-5">Estimated: ~8 minutes · No external data shared until you approve</p>
          <button
            onClick={onStartAgent}
            className="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
          >
            <Zap size={15} />
            Start Reporting Agent
          </button>
        </div>
      )}

      {agentRunning && !agentComplete && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Loader2 size={16} className="text-blue-600 animate-spin" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900">
              {runningStep ? runningStep.label + '...' : 'Processing...'}
            </p>
            <p className="text-xs text-blue-400 mt-0.5">Agent is working · All processing happens locally · Nothing shared externally</p>
          </div>
          <div className="flex-shrink-0">
            <Database size={16} className="text-blue-300" />
          </div>
        </div>
      )}

      {agentComplete && (
        <div className="space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-900">Report generated in {formatTime(elapsedSeconds > 0 ? elapsedSeconds : 28)}</p>
                <p className="text-xs text-emerald-600 mt-0.5">All {steps.length} steps complete · Saved est. 212 minutes vs manual workflow</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Report sections', value: '7', icon: '📄' },
                { label: 'Recommendations', value: '8', icon: '💡' },
                { label: 'Evidence-backed', value: '96%', icon: '✅' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-2.5 text-center border border-emerald-100">
                  <div className="text-base mb-0.5">{item.icon}</div>
                  <div className="text-lg font-black text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2 mb-4">
              <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                <strong>Human review required.</strong> The agent has flagged 3 high-priority risks and 8 recommendations for your approval. Nothing will be shared with the client until you review and approve.
              </p>
            </div>

            <button
              onClick={onReviewReport}
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Review Generated Report
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
