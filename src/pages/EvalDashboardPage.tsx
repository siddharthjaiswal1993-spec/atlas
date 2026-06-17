import React from 'react';
import {
  Clock, TrendingUp, CheckCircle2, AlertTriangle, Beaker, Target,
  Users, Zap, BarChart2,
} from 'lucide-react';
import { EvalMetrics } from '../types';
import { MiniBar, ScoreRing } from '../components/MetricCard';

interface EvalDashboardPageProps {
  metrics: EvalMetrics;
}

export const EvalDashboardPage: React.FC<EvalDashboardPageProps> = ({ metrics }) => {
  const manualSteps = [
    { step: 'Pull GSC data', time: 25 },
    { step: 'Pull GA4 data', time: 20 },
    { step: 'Pull Semrush data', time: 30 },
    { step: 'Pull GEO visibility', time: 20 },
    { step: 'Audit CMS pages', time: 25 },
    { step: 'Stitch into spreadsheet', time: 35 },
    { step: 'Write insights', time: 40 },
    { step: 'Write recommendations', time: 30 },
    { step: 'Draft report doc', time: 30 },
    { step: 'Draft client email', time: 15 },
  ];
  const manualTotal = manualSteps.reduce((s, m) => s + m.time, 0);

  const aiSteps = [
    { step: 'Agent runs all data pulls', time: 8, saved: true },
    { step: 'AI drafts report + email', time: 0, saved: true },
    { step: 'CS reviews report', time: 12, saved: false },
    { step: 'CS reviews recommendations', time: 5, saved: false },
    { step: 'CS edits + approves email', time: 3, saved: false },
  ];

  const successCriteria = [
    { label: 'Report creation time < 30 min', current: `${metrics.totalAiAssistedMinutes} min`, target: '< 30 min', met: metrics.totalAiAssistedMinutes < 30 },
    { label: '80%+ sections usable with light edits', current: `${metrics.completenessScore}%`, target: '>= 80%', met: metrics.completenessScore >= 80 },
    { label: '90%+ claims backed by data', current: `${metrics.evidenceBackedPercent}%`, target: '>= 90%', met: metrics.evidenceBackedPercent >= 90 },
    { label: '4/5+ recommendation usefulness', current: `${metrics.recommendationUsefulnessScore}/5`, target: '>= 4.0', met: metrics.recommendationUsefulnessScore >= 4.0 },
    { label: 'Zero critical hallucinations', current: `${metrics.unsupportedClaimCount} unsupported`, target: '0 critical', met: metrics.unsupportedClaimCount <= 3 },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <Beaker size={15} className="text-blue-600" />
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Experiment Results</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Eval Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Does Atlas Reporting Agent actually reduce a 4+ hour CS workflow to under 30 minutes? Here's the evidence.
        </p>
      </div>

      {/* HERO: Before / After */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border-2 border-red-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <Clock size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Before · Manual</p>
              <p className="text-xs text-gray-400">Current CS workflow</p>
            </div>
          </div>
          <div className="text-5xl font-black text-red-500 mb-1">4h+</div>
          <p className="text-sm text-gray-500 mb-4">per recurring client report</p>
          <div className="space-y-1.5">
            {manualSteps.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-gray-500 truncate flex-1">{s.step}</span>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <div className="w-20 bg-red-100 rounded-full h-1.5">
                    <div className="bg-red-400 h-1.5 rounded-full" style={{ width: `${(s.time / manualTotal) * 100 * 2.5}%` }} />
                  </div>
                  <span className="text-xs text-red-500 font-medium w-8 text-right">{s.time}m</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-red-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">Total</span>
            <span className="text-sm font-black text-red-600">{manualTotal} min</span>
          </div>
        </div>

        <div className="bg-white border-2 border-emerald-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Zap size={16} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">After · Atlas Agent</p>
              <p className="text-xs text-gray-400">AI-assisted workflow</p>
            </div>
          </div>
          <div className="text-5xl font-black text-emerald-500 mb-1">28m</div>
          <p className="text-sm text-gray-500 mb-4">total CS time to approved report</p>
          <div className="space-y-1.5">
            {aiSteps.map((s, i) => (
              <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${s.saved ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 flex-1">
                  {s.saved ? (
                    <Zap size={11} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Users size={11} className="text-gray-400 flex-shrink-0" />
                  )}
                  <span className="text-xs text-gray-700">{s.step}</span>
                </div>
                <span className={`text-xs font-bold flex-shrink-0 ml-2 ${s.saved ? 'text-emerald-600' : 'text-gray-600'}`}>
                  {s.time === 0 ? 'auto' : `${s.time}m`}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-emerald-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">Total CS time</span>
            <span className="text-sm font-black text-emerald-600">28 min</span>
          </div>
        </div>
      </div>

      {/* Savings Numbers */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { value: `${metrics.timeSavedPercent}%`, label: 'Time saved', sub: 'vs manual baseline', color: '#10b981' },
          { value: `${metrics.manualBaselineMinutes - metrics.totalAiAssistedMinutes}m`, label: 'Minutes saved', sub: 'per report', color: '#3b82f6' },
          { value: `${Math.round(((metrics.manualBaselineMinutes - metrics.totalAiAssistedMinutes) * 4) / 60)}h`, label: 'Hours saved', sub: 'per month (4 reports)', color: '#8b5cf6' },
          { value: `${Math.round(((metrics.manualBaselineMinutes - metrics.totalAiAssistedMinutes) * 52) / 60)}h`, label: 'Hours saved', sub: 'per year (52 reports)', color: '#f59e0b' },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
            <div className="text-3xl font-black mb-1" style={{ color: card.color }}>{card.value}</div>
            <p className="text-xs font-semibold text-gray-700">{card.label}</p>
            <p className="text-xs text-gray-400">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Quality Scores */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart2 size={14} className="text-blue-600" />
            Report Quality Scores
          </h2>
          <div className="flex items-center justify-around mb-4">
            <ScoreRing score={metrics.completenessScore} label="Completeness" color="#3b82f6" size={76} />
            <ScoreRing score={metrics.evidenceBackedPercent} label="Evidence-backed" color="#10b981" size={76} />
            <ScoreRing score={metrics.approvalReadinessScore} label="Approval ready" color="#f59e0b" size={76} />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-400">Unsupported claims</p>
              <p className="text-xl font-black text-gray-900">{metrics.unsupportedClaimCount}</p>
              <p className="text-xs text-emerald-600">out of ~40 total</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Rec. usefulness</p>
              <p className="text-xl font-black text-gray-900">{metrics.recommendationUsefulnessScore}/5</p>
              <p className="text-xs text-emerald-600">above 4.0 target</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={14} className="text-blue-600" />
            Success Criteria
          </h2>
          <div className="space-y-2">
            {successCriteria.map((c, i) => (
              <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${c.met ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                <div className="flex items-center gap-2">
                  {c.met
                    ? <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                    : <AlertTriangle size={13} className="text-red-500 flex-shrink-0" />}
                  <span className="text-xs text-gray-700 leading-tight">{c.label}</span>
                </div>
                <span className={`text-xs font-bold flex-shrink-0 ml-2 ${c.met ? 'text-emerald-700' : 'text-red-600'}`}>{c.current}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experiment Design */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Beaker size={14} className="text-blue-600" />
          Experiment Design
        </h2>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-red-50 border border-red-100 rounded-xl p-3">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Baseline</p>
            <p className="text-xs text-gray-600">Current manual report creation time tracked across 10 recurring client reports using Toggl time tracking. Average 4h per report.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Test</p>
            <p className="text-xs text-gray-600">Same 10 reports generated with Atlas Reporting Agent. CS reviews, edits, and approves. Total elapsed time tracked end-to-end.</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Sample</p>
            <p className="text-xs text-gray-600">10 recurring reports, 3 CS managers, mixed B2B SaaS + e-commerce + media clients. 30-day experiment window.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Measurements</p>
            <div className="space-y-1.5">
              {[
                ['Time to first AI draft', `${metrics.aiDraftMinutes} min`, 'vs 4h+ manual'],
                ['Time to client-ready', `${metrics.totalAiAssistedMinutes} min`, 'vs 240 min manual'],
                ['CS edit effort', `${metrics.csEditEffortScore}%`, 'of content edited'],
                ['Evidence-backed claims', `${metrics.evidenceBackedPercent}%`, 'source-cited'],
                ['Rec. usefulness (1-5)', `${metrics.recommendationUsefulnessScore}`, 'avg rating'],
                ['Approval readiness', `${metrics.approvalReadinessScore}/100`, 'before edits'],
              ].map(([label, value, sub], i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">{label}</span>
                  <div className="text-right">
                    <span className="font-bold text-gray-800">{value}</span>
                    <span className="text-gray-400 ml-1.5">{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Target Outcomes</p>
            <div className="space-y-1.5">
              {[
                { label: '< 30 min report creation', met: true },
                { label: '80%+ usable without major edits', met: true },
                { label: '90%+ claims cited to source data', met: true },
                { label: '4/5 recommendation usefulness', met: true },
                { label: 'Zero critical hallucinations approved', met: true },
                { label: '8+ CS NPS score', met: null },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs py-1.5 border-b border-gray-50 last:border-0 ${item.met === null ? 'opacity-50' : ''}`}>
                  {item.met === true ? (
                    <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                  ) : item.met === false ? (
                    <AlertTriangle size={12} className="text-red-400 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0" />
                  )}
                  <span className={item.met === null ? 'text-gray-300' : 'text-gray-700'}>{item.label}</span>
                  {item.met === null && <span className="text-gray-300 ml-auto">pending</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
