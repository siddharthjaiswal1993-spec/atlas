import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Download, Share2,
  ChevronUp, ChevronDown, Bot, Eye, Minus,
} from 'lucide-react';
import { GeneratedReport } from '../types';
import { EvidenceTag } from '../components/EvidenceTag';
import { MetricCard, MiniBar, ScoreRing } from '../components/MetricCard';
import { Badge } from '../components/Badge';
import { CLIENTS } from '../data/clients';

interface ReportPageProps {
  report: GeneratedReport;
  clientId: string;
  onGoToRecommendations: () => void;
  onExport: () => void;
  exportSimulated: boolean;
}

type ReportTab = 'summary' | 'organic' | 'geo' | 'competitors' | 'content' | 'risks' | 'actions';

const tabs: { id: ReportTab; label: string }[] = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'organic', label: 'Organic Search' },
  { id: 'geo', label: 'AI/GEO Visibility' },
  { id: 'competitors', label: 'Competitor Movement' },
  { id: 'content', label: 'Content Opportunities' },
  { id: 'risks', label: 'Risks & Anomalies' },
  { id: 'actions', label: 'Recommended Actions' },
];

const fmtNum = (n: number) => n?.toLocaleString() ?? '—';
const fmtPct = (n: number) => `${n?.toFixed(1)}%`;
const fmtPos = (n: number) => n?.toFixed(1);

export const ReportPage: React.FC<ReportPageProps> = ({ report, clientId, onGoToRecommendations, onExport, exportSimulated }) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('summary');
  const client = CLIENTS.find(c => c.id === clientId);
  const { gscData: gsc, ga4Data: ga4, geoData: geo, semrushData: sem, cmsData: cms, risks, recommendations } = report;

  const DeltaChip = ({ value, inverse = false }: { value: number; inverse?: boolean }) => {
    const positive = inverse ? value < 0 : value > 0;
    const negative = inverse ? value > 0 : value < 0;
    return (
      <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${positive ? 'text-emerald-600' : negative ? 'text-red-500' : 'text-gray-400'}`}>
        {positive ? <ChevronUp size={12} /> : negative ? <ChevronDown size={12} /> : <Minus size={12} />}
        {Math.abs(value).toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Report Header */}
      <div className="px-8 pt-5 pb-0 border-b border-gray-100 bg-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: client?.primaryColor }}>
                {client?.logo}
              </div>
              <span className="text-xs text-gray-500 font-medium">{client?.name}</span>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400">Generated {new Date(report.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                <Bot size={10} className="text-blue-500" />
                <span className="text-xs text-blue-600 font-medium">Atlas Agent</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Monthly Executive Report</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 size={11} />96% evidence-backed
              </span>
              <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                <AlertTriangle size={11} />{report.risks?.filter(r => r.severity === 'high').length} high-risk signals
              </span>
              <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                {report.recommendations?.length} recommendations
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onExport}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                exportSimulated
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {exportSimulated ? <CheckCircle2 size={14} /> : <Download size={14} />}
              {exportSimulated ? 'Exported' : 'Export'}
            </button>
            <button
              onClick={onGoToRecommendations}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <CheckCircle2 size={14} />
              Review Actions
            </button>
          </div>
        </div>

        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === 'summary' && (
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 bg-blue-600 text-white rounded-xl px-4 py-2.5 text-xs font-medium">
              <Bot size={13} />
              <span>Generated by Atlas Reporting Agent · All claims linked to source data · Review before sharing</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
                <span className="text-blue-200">96% evidence-backed</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Executive Summary</h2>
                <EvidenceTag source="GSC + GA4 + Semrush + GEO/AI" confidence="High" />
              </div>
              <ul className="space-y-3">
                {report.executiveSummary.map((bullet, i) => {
                  const isRisk = bullet.toLowerCase().includes('risk') || bullet.toLowerCase().includes('below') || bullet.toLowerCase().includes('decline') || bullet.toLowerCase().includes('overtook');
                  const isWin = bullet.toLowerCase().includes('increase') || bullet.toLowerCase().includes('strong') || bullet.toLowerCase().includes('improved');
                  return (
                    <li key={i} className={`flex items-start gap-3 p-3 rounded-xl ${isRisk ? 'bg-red-50/60 border border-red-100' : isWin ? 'bg-emerald-50/60 border border-emerald-100' : 'bg-gray-50 border border-gray-100'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${isRisk ? 'bg-red-100 text-red-600' : isWin ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
                        {isRisk ? '!' : isWin ? '\u2713' : i + 1}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">At a Glance</h3>
              <div className="grid grid-cols-4 gap-3">
                <MetricCard label="Organic Clicks" value={fmtNum(gsc.clicks)} delta={gsc.clicksDelta} source="GSC" />
                <MetricCard label="Organic Sessions" value={fmtNum(ga4.organicSessions)} delta={ga4.organicSessionsDelta} source="GA4" />
                <MetricCard label="AI Visibility" value={`${geo.aiVisibilityScore}/100`} delta={geo.aiVisibilityScoreDelta} source="GEO" />
                <MetricCard label="Conversions" value={fmtNum(ga4.conversions)} delta={ga4.conversionsDelta} source="GA4" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'organic' && (
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-4 gap-3">
              <MetricCard label="Clicks" value={fmtNum(gsc.clicks)} delta={gsc.clicksDelta} source="GSC" />
              <MetricCard label="Impressions" value={fmtNum(gsc.impressions)} delta={gsc.impressionsDelta} source="GSC" />
              <MetricCard label="CTR" value={fmtPct(gsc.ctr)} delta={gsc.ctrDelta} source="GSC" />
              <MetricCard label="Avg Position" value={fmtPos(gsc.avgPosition)} delta={gsc.positionDelta} inverse source="GSC" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <MetricCard label="Organic Sessions" value={fmtNum(ga4.organicSessions)} delta={ga4.organicSessionsDelta} source="GA4" />
              <MetricCard label="Engagement Rate" value={fmtPct(ga4.engagementRate)} delta={ga4.engagementRateDelta} source="GA4" />
              <MetricCard label="Conversions" value={fmtNum(ga4.conversions)} delta={ga4.conversionsDelta} source="GA4" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={15} className="text-emerald-600" />
                  <h3 className="text-sm font-semibold text-emerald-800">Winners</h3>
                </div>
                {gsc.winners.map((w, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-emerald-100 last:border-0">
                    <span className="text-xs text-gray-700 truncate max-w-48">{w.query}</span>
                    <span className="text-xs font-medium text-emerald-600">{w.change}</span>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown size={15} className="text-red-500" />
                  <h3 className="text-sm font-semibold text-red-700">Losers</h3>
                </div>
                {gsc.losers.map((l, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-red-100 last:border-0">
                    <span className="text-xs text-gray-700 truncate max-w-48">{l.query}</span>
                    <span className="text-xs font-medium text-red-500">{l.change}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Queries</h3>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Query', 'Clicks', 'Impressions', 'CTR', 'Position', '\u0394 Clicks'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-gray-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gsc.topQueries.map((q, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-gray-800 font-medium max-w-48 truncate">{q.query}</td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtNum(q.clicks)}</td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtNum(q.impressions)}</td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtPct(q.ctr)}</td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtPos(q.position)}</td>
                        <td className="px-4 py-2.5">
                          <span className={`font-medium ${q.delta > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            {q.delta > 0 ? '+' : ''}{q.delta}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2">
                <EvidenceTag source="GSC" confidence="High" impact="High" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Landing Pages</h3>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['URL', 'Sessions', 'Engagement', 'Conversions'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-gray-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ga4.topLandingPages.map((p, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-blue-600 font-medium max-w-64 truncate">{p.url}</td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtNum(p.sessions)}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <MiniBar value={p.engagementRate} color="bg-blue-500" />
                            <span className="text-gray-700">{fmtPct(p.engagementRate)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtNum(p.conversions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2">
                <EvidenceTag source="GA4" confidence="High" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'geo' && (
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-4 gap-3">
              <MetricCard label="AI Visibility Score" value={`${geo.aiVisibilityScore}/100`} delta={geo.aiVisibilityScoreDelta} source="GEO" />
              <MetricCard label="Share of Voice" value={fmtPct(geo.shareOfVoice)} source="GEO" />
              <MetricCard label="Mention Rate" value={fmtPct(geo.mentionRate)} source="GEO" />
              <MetricCard label="Citation Rate" value={fmtPct(geo.citationRate)} source="GEO" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Per-Engine Visibility</h3>
              <div className="grid grid-cols-2 gap-3">
                {geo.engines.map((engine) => (
                  <div key={engine.name} className="bg-white border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-800">{engine.name}</span>
                      <Badge
                        label={engine.sentiment}
                        variant="confidence"
                        value={engine.sentiment === 'positive' ? 'High' : engine.sentiment === 'neutral' ? 'Medium' : 'Low'}
                      />
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <ScoreRing score={engine.visibilityScore} label="Visibility" color="#3b82f6" size={64} />
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span className="text-gray-400">Mentions</span>
                            <span className="font-medium text-gray-700">{engine.mentionCount}</span>
                          </div>
                          <MiniBar value={engine.mentionCount} max={400} color="bg-blue-400" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span className="text-gray-400">Citations</span>
                            <span className="font-medium text-gray-700">{engine.citationCount}</span>
                          </div>
                          <MiniBar value={engine.citationCount} max={200} color="bg-teal-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <EvidenceTag source="GEO/AI" confidence="Medium" impact="High" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">AI Visibility vs Competitors</h3>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Brand', 'Visibility Score', 'Share of Voice', 'Mention Rate'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-gray-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-blue-50 bg-blue-50/30">
                      <td className="px-4 py-2.5 font-semibold text-blue-700">{client?.name} ★</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <MiniBar value={geo.aiVisibilityScore} color="bg-blue-500" />
                          <span className="font-medium text-gray-700">{geo.aiVisibilityScore}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-gray-700">{fmtPct(geo.shareOfVoice)}</td>
                      <td className="px-4 py-2.5 text-gray-700">{fmtPct(geo.mentionRate)}</td>
                    </tr>
                    {geo.competitors.map((comp, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-700 font-medium">{comp.name}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <MiniBar value={comp.visibilityScore} color="bg-gray-400" />
                            <span className="text-gray-700">{comp.visibilityScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtPct(comp.shareOfVoice)}</td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtPct(comp.mentionRate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Tracked AI Prompts</h3>
              <div className="space-y-2">
                {geo.topPrompts.map((prompt, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border ${prompt.mentioned ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/50 border-red-100'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${prompt.mentioned ? 'bg-emerald-100' : 'bg-red-100'}`}>
                      {prompt.mentioned ? <CheckCircle2 size={12} className="text-emerald-600" /> : <AlertTriangle size={12} className="text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium">"{prompt.prompt}"</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-medium ${prompt.mentioned ? 'text-emerald-600' : 'text-red-500'}`}>
                          {prompt.mentioned ? `${client?.name} mentioned` : `${client?.name} not mentioned`}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">Competitors: {prompt.competitors.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competitors' && (
          <div className="max-w-4xl space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Competitor Overview</h3>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Competitor', 'Domain Auth.', 'Organic KWs', 'Traffic Share', 'Rank Gains', 'Rank Losses'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sem.competitors.map((comp, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{comp.name}</td>
                      <td className="px-4 py-3 text-gray-700">{sem.domainAuthority}</td>
                      <td className="px-4 py-3 text-gray-700">{fmtNum(comp.organicKeywords)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <MiniBar value={comp.trafficShare} color="bg-orange-400" />
                          <span className="text-gray-700">{fmtPct(comp.trafficShare)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-emerald-600 font-medium">+{comp.rankGains}</td>
                      <td className="px-4 py-3 text-red-500 font-medium">-{comp.rankLosses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Keywords Where Competitors Overtook</h3>
              <div className="space-y-2">
                {sem.keywordsOvertaken.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{kw.keyword}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{fmtNum(kw.volume)} monthly searches</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-center">
                        <p className="text-gray-400">Client</p>
                        <p className="font-bold text-red-500">#{kw.clientPosition}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">{kw.competitor}</p>
                        <p className="font-bold text-emerald-600">#{kw.competitorPosition}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <EvidenceTag source="Semrush" confidence="High" impact="High" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Content Gaps (Competitor Ranking, Client Missing)</h3>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Keyword', 'Monthly Volume', 'Difficulty', 'Competitor Ranking'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-gray-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sem.contentGaps.map((gap, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-2.5 font-medium text-gray-800">{gap.keyword}</td>
                        <td className="px-4 py-2.5 text-gray-700">{fmtNum(gap.volume)}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <MiniBar value={gap.difficulty} color={gap.difficulty > 60 ? 'bg-red-400' : gap.difficulty > 40 ? 'bg-amber-400' : 'bg-emerald-400'} />
                            <span>{gap.difficulty}/100</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-amber-600 font-medium">{gap.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">High-Impression, Low-CTR Pages</h3>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-3 text-xs text-amber-700">
                <strong>{cms.highImpressionLowCTR.length} pages</strong> have strong visibility but underperforming click-through rates. Title and meta description optimization could yield significant traffic gains.
              </div>
              <div className="space-y-2">
                {cms.highImpressionLowCTR.map((page, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{page.title}</p>
                      <p className="text-xs text-blue-500 mt-0.5 truncate">{page.url}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs ml-4 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-gray-400">Impressions</p>
                        <p className="font-bold text-gray-700">{fmtNum(page.impressions)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">CTR</p>
                        <p className="font-bold text-amber-600">{fmtPct(page.ctr)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Position</p>
                        <p className="font-bold text-gray-700">{fmtPos(page.avgPosition)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Stale Pages ({cms.stalePages.length} pages not updated in 90+ days)</h3>
              <div className="space-y-2">
                {cms.stalePages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{page.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Last updated: {page.lastUpdated}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs ml-4 flex-shrink-0">
                      <Badge label={`${page.daysStale}d stale`} variant="status" value={page.daysStale > 400 ? 'rejected' : 'editing'} />
                      <div className="text-center">
                        <p className="text-gray-400">Traffic/mo</p>
                        <p className="font-bold text-gray-700">{fmtNum(page.traffic)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Missing Comparison Pages</h3>
              <div className="space-y-2">
                {cms.missingComparisonPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between bg-red-50/60 border border-red-100 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{page.topic}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Competitor: {page.competitor}</p>
                    </div>
                    <div className="text-xs text-center">
                      <p className="text-gray-400">Est. Volume</p>
                      <p className="font-bold text-red-600">{fmtNum(page.estimatedVolume)}/mo</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <EvidenceTag source="Semrush" confidence="High" impact="High" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="max-w-3xl space-y-3">
            {risks.map((risk, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${
                risk.severity === 'high' ? 'bg-red-50/60 border-red-100' : 'bg-amber-50/60 border-amber-100'
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  risk.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                }`}>
                  <AlertTriangle size={14} className={risk.severity === 'high' ? 'text-red-600' : 'text-amber-600'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{risk.title}</p>
                    <Badge
                      label={risk.severity === 'high' ? 'High Risk' : 'Medium Risk'}
                      variant="confidence"
                      value={risk.severity === 'high' ? 'Low' : 'Medium'}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{risk.description}</p>
                  <div className="mt-2">
                    <EvidenceTag source={risk.source} confidence="High" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{recommendations.length} recommended actions, prioritized by impact and effort</p>
              <button
                onClick={onGoToRecommendations}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Review & Action All
              </button>
            </div>
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{rec.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{rec.whyItMatters}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Badge label={rec.impact} variant="impact" value={rec.impact} />
                    <Badge label={rec.effort} variant="effort" value={rec.effort} />
                  </div>
                </div>
                <div className="mt-2">
                  <EvidenceTag source={rec.sourceData.join(' + ')} confidence={rec.confidence} impact={rec.impact} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
