import React, { useState } from 'react';
import {
  ChevronRight, ChevronLeft, Check, Calendar, Globe, Users, Database, Settings, Palette,
} from 'lucide-react';
import { ReportConfig, ReportType, OutputTone } from '../types';
import { CLIENTS } from '../data/clients';
import { Badge } from '../components/Badge';

interface ConfigurePageProps {
  selectedClientId: string;
  onRunAgent: (config: Partial<ReportConfig>) => void;
  initialConfig: Partial<ReportConfig>;
}

const reportTypes: ReportType[] = [
  'Weekly Performance Report',
  'Monthly Executive Report',
  'QBR Report',
  'Competitor Deep Dive',
  'AI/GEO Visibility Report',
  'Content Opportunity Report',
];

const reportTypeDesc: Record<ReportType, string> = {
  'Weekly Performance Report': 'GSC, GA4, key wins/losses, quick actions',
  'Monthly Executive Report': 'Full performance review with trends, competitors, GEO',
  'QBR Report': 'Quarterly business review with strategic analysis',
  'Competitor Deep Dive': 'In-depth competitor ranking and gap analysis',
  'AI/GEO Visibility Report': 'AI engine visibility, citations, share of voice',
  'Content Opportunity Report': 'Content gaps, stale pages, quick-win opportunities',
};

const allDataSources = ['GSC', 'GA4', 'Semrush', 'GEO/AI', 'WordPress', 'Webflow', 'Contentful'];
const outputTones: OutputTone[] = ['Executive', 'Tactical', 'Detailed'];

export const ConfigurePage: React.FC<ConfigurePageProps> = ({ selectedClientId, onRunAgent, initialConfig }) => {
  const client = CLIENTS.find(c => c.id === selectedClientId);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Partial<ReportConfig>>({
    clientId: selectedClientId,
    reportType: initialConfig.reportType || 'Monthly Executive Report',
    periodStart: initialConfig.periodStart || '2026-05-01',
    periodEnd: initialConfig.periodEnd || '2026-05-31',
    competitors: initialConfig.competitors || ['Clari', 'Gong', 'Chorus.ai'],
    markets: initialConfig.markets || ['United States', 'United Kingdom'],
    searchEngines: initialConfig.searchEngines || ['Google', 'Bing', 'ChatGPT', 'Perplexity', 'Gemini'],
    dataSources: initialConfig.dataSources || (client?.connectedSources || ['GSC', 'GA4']),
    outputTone: initialConfig.outputTone || 'Executive',
  });

  const [competitorInput, setCompetitorInput] = useState('');

  const steps = [
    { id: 1, label: 'Report Type', icon: Settings },
    { id: 2, label: 'Period & Markets', icon: Calendar },
    { id: 3, label: 'Competitors', icon: Users },
    { id: 4, label: 'Data Sources', icon: Database },
    { id: 5, label: 'Output', icon: Palette },
  ];

  const toggleSource = (source: string) => {
    const current = config.dataSources || [];
    if (current.includes(source)) {
      setConfig({ ...config, dataSources: current.filter(s => s !== source) });
    } else {
      setConfig({ ...config, dataSources: [...current, source] });
    }
  };

  const addCompetitor = () => {
    if (competitorInput.trim()) {
      setConfig({ ...config, competitors: [...(config.competitors || []), competitorInput.trim()] });
      setCompetitorInput('');
    }
  };

  const removeCompetitor = (name: string) => {
    setConfig({ ...config, competitors: (config.competitors || []).filter(c => c !== name) });
  };

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        {client && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: client.primaryColor }}>
              {client.logo}
            </div>
            <span className="text-sm text-gray-500">{client.name} · {client.domain}</span>
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-900">Configure Report</h1>
        <p className="text-sm text-gray-500 mt-1">Set up your reporting parameters. The agent will use these to pull and analyze data.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <button
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                step === s.id
                  ? 'bg-blue-50 text-blue-700'
                  : step > s.id
                  ? 'text-emerald-600'
                  : 'text-gray-400'
              }`}
            >
              {step > s.id ? (
                <Check size={12} className="text-emerald-500" />
              ) : (
                <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${step === s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s.id}
                </span>
              )}
              {s.label}
            </button>
            {i < steps.length - 1 && <ChevronRight size={14} className="text-gray-200 mx-1" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
        {step === 1 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">Select report type</h2>
            <p className="text-sm text-gray-400 mb-4">Choose the type of report to generate for this client.</p>
            <div className="space-y-2">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setConfig({ ...config, reportType: type })}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition-all ${
                    config.reportType === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div>
                    <p className={`text-sm font-medium ${config.reportType === type ? 'text-blue-800' : 'text-gray-800'}`}>{type}</p>
                    <p className={`text-xs mt-0.5 ${config.reportType === type ? 'text-blue-500' : 'text-gray-400'}`}>{reportTypeDesc[type]}</p>
                  </div>
                  {config.reportType === type && <Check size={16} className="text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Reporting period</h2>
              <p className="text-sm text-gray-400 mb-4">Set the date range for this report.</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Period start</label>
                  <input
                    type="date"
                    value={config.periodStart}
                    onChange={(e) => setConfig({ ...config, periodStart: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Period end</label>
                  <input
                    type="date"
                    value={config.periodEnd}
                    onChange={(e) => setConfig({ ...config, periodEnd: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">Markets / Countries</label>
              <div className="flex flex-wrap gap-2">
                {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France'].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      const current = config.markets || [];
                      if (current.includes(m)) {
                        setConfig({ ...config, markets: current.filter(x => x !== m) });
                      } else {
                        setConfig({ ...config, markets: [...current, m] });
                      }
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                      (config.markets || []).includes(m)
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Globe size={11} />
                    {m}
                    {(config.markets || []).includes(m) && <Check size={11} />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">Search & AI engines to track</label>
              <div className="flex flex-wrap gap-2">
                {['Google', 'Bing', 'ChatGPT', 'Perplexity', 'Gemini', 'Google AI Overviews', 'Claude'].map((engine) => (
                  <button
                    key={engine}
                    onClick={() => {
                      const current = config.searchEngines || [];
                      if (current.includes(engine)) {
                        setConfig({ ...config, searchEngines: current.filter(x => x !== engine) });
                      } else {
                        setConfig({ ...config, searchEngines: [...current, engine] });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                      (config.searchEngines || []).includes(engine)
                        ? 'bg-teal-50 border-teal-300 text-teal-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {engine}
                    {(config.searchEngines || []).includes(engine) && <Check size={11} className="inline ml-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">Competitors to track</h2>
            <p className="text-sm text-gray-400 mb-4">Add competitor domains or brand names to include in the competitive analysis.</p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add competitor name or domain..."
                value={competitorInput}
                onChange={(e) => setCompetitorInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                onClick={addCompetitor}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(config.competitors || []).map((comp) => (
                <div key={comp} className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-2.5 py-1.5 text-sm text-gray-700">
                  <span>{comp}</span>
                  <button onClick={() => removeCompetitor(comp)} className="text-gray-400 hover:text-red-500 text-lg leading-none">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">Data sources</h2>
            <p className="text-sm text-gray-400 mb-4">Select which data sources the agent should pull from. Connected sources are pre-checked.</p>
            <div className="grid grid-cols-2 gap-3">
              {allDataSources.map((source) => {
                const isConnected = client?.connectedSources.includes(source);
                const isSelected = (config.dataSources || []).includes(source);
                return (
                  <button
                    key={source}
                    onClick={() => toggleSource(source)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition-all ${
                      isSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Database size={14} className={isSelected ? 'text-blue-600' : 'text-gray-400'} />
                      <div>
                        <p className={`text-sm font-medium ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>{source}</p>
                        {isConnected && <p className="text-xs text-emerald-600">Connected</p>}
                        {!isConnected && <p className="text-xs text-gray-400">Not connected</p>}
                      </div>
                    </div>
                    {isSelected ? (
                      <Check size={16} className="text-blue-600 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-gray-300 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">Output tone</h2>
            <p className="text-sm text-gray-400 mb-4">Choose the tone for the generated report and email draft.</p>
            <div className="space-y-2 mb-8">
              {outputTones.map((tone) => {
                const desc: Record<OutputTone, string> = {
                  Executive: 'High-level summary, bullet-driven, boardroom-ready language',
                  Tactical: 'Balanced narrative with specific actions, data tables, and step-by-step guidance',
                  Detailed: 'Comprehensive deep-dive with full data tables, statistical context, and methodology notes',
                };
                return (
                  <button
                    key={tone}
                    onClick={() => setConfig({ ...config, outputTone: tone })}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                      config.outputTone === tone ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-semibold ${config.outputTone === tone ? 'text-blue-800' : 'text-gray-800'}`}>{tone}</p>
                      <p className={`text-xs mt-0.5 ${config.outputTone === tone ? 'text-blue-500' : 'text-gray-400'}`}>{desc[tone]}</p>
                    </div>
                    {config.outputTone === tone && <Check size={16} className="text-blue-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Report Summary</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-400">Client:</span> <span className="text-gray-700 font-medium">{client?.name}</span></div>
                <div><span className="text-gray-400">Type:</span> <span className="text-gray-700 font-medium">{config.reportType}</span></div>
                <div><span className="text-gray-400">Period:</span> <span className="text-gray-700 font-medium">{config.periodStart} → {config.periodEnd}</span></div>
                <div><span className="text-gray-400">Tone:</span> <span className="text-gray-700 font-medium">{config.outputTone}</span></div>
                <div><span className="text-gray-400">Sources:</span> <span className="text-gray-700 font-medium">{(config.dataSources || []).join(', ')}</span></div>
                <div><span className="text-gray-400">Competitors:</span> <span className="text-gray-700 font-medium">{(config.competitors || []).join(', ')}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Next
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => onRunAgent(config)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            Run Reporting Agent
          </button>
        )}
      </div>
    </div>
  );
};
