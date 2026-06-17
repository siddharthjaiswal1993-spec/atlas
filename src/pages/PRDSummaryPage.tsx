import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckSquare, AlertTriangle, Zap } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'problem',
    title: 'Problem Statement',
    content: (
      <div className="space-y-2 text-sm text-gray-700">
        <p>Customer Success managers at Pepper Atlas spend <strong>4+ hours every week</strong> creating recurring client reports. The current workflow is entirely manual:</p>
        <ul className="list-disc ml-5 space-y-1.5 text-gray-600">
          <li>Pulling data from 5–7 sources (GSC, GA4, Semrush, GEO tools, CMS)</li>
          <li>Stitching data into spreadsheets and slide decks</li>
          <li>Identifying insights and writing recommendations manually</li>
          <li>Drafting client-facing emails and scheduling review calls</li>
        </ul>
        <p className="mt-2">This creates a bottleneck that limits the number of clients a CS manager can support, reduces report quality under time pressure, and leaves significant insight value unrealized due to limited analytical bandwidth.</p>
      </div>
    ),
  },
  {
    id: 'user',
    title: 'Target User',
    content: (
      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Primary:</strong> Customer Success Managers (CSMs) at Pepper Atlas who manage recurring reporting for 8–15 clients.</p>
        <p><strong>Secondary:</strong> SEO/GEO strategists who need to surface AI visibility and organic search insights for client review.</p>
        <div className="bg-gray-50 rounded-lg p-3 text-xs mt-2">
          <p className="font-semibold mb-1">User context</p>
          <ul className="list-disc ml-4 space-y-1 text-gray-600">
            <li>Typically non-technical; needs clear UI, not raw data</li>
            <li>High trust responsibility: clients see these reports</li>
            <li>Cares about accuracy over speed — but speed still matters</li>
            <li>Wants to add their own judgment, not just pass through AI output</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'jtbd',
    title: 'Jobs to Be Done',
    content: (
      <div className="space-y-2.5 text-sm text-gray-700">
        {[
          { job: 'When I start a new reporting cycle,', outcome: "I want the agent to plan the report and pull relevant data automatically, so I don't spend 2+ hours on data collection." },
          { job: 'When I review a generated report,', outcome: 'I want to see every claim backed by a source, so I can trust what the agent wrote before sharing it with clients.' },
          { job: 'When I identify key recommendations,', outcome: 'I want to accept/reject/edit them individually and add them to the email, so I maintain editorial control.' },
          { job: "When a client's AI visibility drops,", outcome: 'I want the agent to detect it proactively, so I can address it before the client notices.' },
        ].map((item, i) => (
          <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-blue-600 text-xs font-medium">{item.job}</p>
            <p className="text-gray-700 text-xs mt-0.5">{item.outcome}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'mvp',
    title: 'MVP Scope',
    content: (
      <div className="text-sm text-gray-700 space-y-3">
        <p>The MVP focuses on the weekly/monthly CS reporting workflow for existing Pepper Atlas clients. Scope is limited to:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Client selection + report configuration UI',
            'AI agent run with visible step-by-step progress',
            'Generated report with 7 sections + evidence tags',
            'Evidence-backed recommendation cards (accept/reject)',
            'AI-generated client email draft with inline editing',
            'Approval flow with simulated send confirmation',
            'Eval dashboard with time-saved metrics',
            'PRD summary page for stakeholder alignment',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
              <CheckSquare size={12} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nongoals',
    title: 'Non-Goals (MVP)',
    content: (
      <div className="text-sm text-gray-700 space-y-2">
        <p>The following are explicitly out of scope for the MVP:</p>
        <ul className="list-disc ml-5 space-y-1.5 text-gray-600">
          <li>Real external API integrations (all data is mocked)</li>
          <li>Multi-user collaboration or role-based access control</li>
          <li>Actual email delivery or CRM sync</li>
          <li>White-label client portal or client self-serve reporting</li>
          <li>Custom report builder with drag-and-drop sections</li>
          <li>Historical trend analysis beyond the current reporting period</li>
          <li>Automated scheduling or recurring report triggers</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'functional',
    title: 'Functional Requirements',
    content: (
      <div className="text-sm text-gray-700 space-y-2">
        <div className="space-y-2.5">
          {[
            { req: 'Client Selection', detail: 'CS manager can view client cards with key metadata and select a client to begin reporting' },
            { req: 'Report Configuration', detail: 'Multi-step form for report type, period, competitors, markets, engines, sources, and output tone' },
            { req: 'Agent Run Flow', detail: 'Step-by-step animated progress showing all 12 agent actions with status indicators' },
            { req: 'Report Generation', detail: '7-section tabbed report with mock data from all connected sources' },
            { req: 'Evidence Tags', detail: 'Every insight must show source, confidence, and impact evidence tags' },
            { req: 'Recommendations', detail: 'Individual cards with accept/reject/edit/add-to-email actions that update app state' },
            { req: 'Email Draft', detail: 'Editable email with regeneration, tone adjustment, and accepted recommendation injection' },
            { req: 'Approval Confirmation', detail: 'Approve button updates global state; export button shows confirmation state' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-xs font-bold text-blue-600 w-36 flex-shrink-0 mt-0.5">{item.req}</span>
              <p className="text-xs text-gray-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'data',
    title: 'Data Sources Used',
    content: (
      <div className="text-sm text-gray-700">
        <p className="mb-3">The prototype treats all APIs as black-box endpoints with mock responses based on the Data Available workbook:</p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { source: 'Google Search Console', fields: 'Clicks, impressions, CTR, avg position, queries, pages, delta vs prior period' },
            { source: 'GA4', fields: 'Organic sessions, engagement rate, conversions, session duration, landing pages' },
            { source: 'Semrush', fields: 'Domain authority, organic keywords, competitor positions, rank gains/losses, content gaps' },
            { source: 'GEO/AI Visibility', fields: 'AI visibility score, share of voice, per-engine mention/citation data, prompt tracking' },
            { source: 'WordPress/Webflow/Contentful', fields: 'CMS page inventory, last updated dates, stale page identification, page metadata' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">{item.source}</p>
              <p className="text-xs text-gray-500">{item.fields}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'agent',
    title: 'Agent Responsibilities',
    content: (
      <div className="text-sm text-gray-700 space-y-2">
        <p className="text-xs text-gray-500 mb-3">The agent operates at L2.5 bounded autonomy — it can plan, execute, and draft, but must not send anything externally without human approval.</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Can: Plan the report structure based on type and config',
            'Can: Select relevant data sources per report type',
            'Can: Pull and process mock API data',
            'Can: Detect anomalies and performance changes',
            'Can: Generate evidence-backed insights',
            'Can: Create prioritized recommendations',
            'Can: Draft a structured client report',
            'Can: Draft a personalized client email',
            'Cannot: Send email without CS approval',
            'Cannot: Publish content or push to CMS',
            'Cannot: Make API calls to production systems',
            'Cannot: Share data with external services',
          ].map((item, i) => (
            <div key={i} className={`text-xs p-2 rounded-lg ${item.startsWith('Can:') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'success',
    title: 'Success Metrics',
    content: (
      <div className="text-sm text-gray-700 space-y-2">
        {[
          { metric: 'Report creation time', target: '< 30 minutes (vs 4+ hours manual)', type: 'primary' },
          { metric: 'Section usability rate', target: '80%+ sections usable with light edits', type: 'primary' },
          { metric: 'Evidence coverage', target: '90%+ claims backed by a data source', type: 'primary' },
          { metric: 'Recommendation usefulness', target: '4.0/5 average CS rating', type: 'primary' },
          { metric: 'CS satisfaction', target: '8+ NPS in post-session survey', type: 'secondary' },
          { metric: 'Client stakeholder rating', target: '4+/5 on report quality after first AI-assisted delivery', type: 'secondary' },
          { metric: 'Zero critical hallucinations', target: 'No uncaught factual errors in approved reports', type: 'quality' },
        ].map((m, i) => (
          <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
            <span className="text-xs text-gray-700">{m.metric}</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-gray-800 text-right max-w-52">{m.target}</span>
              <span className={`px-1.5 py-0.5 rounded text-xs ${m.type === 'primary' ? 'bg-blue-100 text-blue-600' : m.type === 'quality' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                {m.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'risks',
    title: 'Risks & Mitigations',
    content: (
      <div className="text-sm text-gray-700 space-y-3">
        {[
          {
            risk: 'AI hallucination in generated claims',
            mitigation: 'Require every claim to link to a specific data source. Surface confidence scores. CS must review before approval.',
            severity: 'high',
          },
          {
            risk: 'CS trust erosion if claims are frequently wrong',
            mitigation: 'Start with high-confidence sections (GSC, GA4). Show evidence prominently. Allow easy rejection of individual insights.',
            severity: 'high',
          },
          {
            risk: 'Data source API changes breaking the workflow',
            mitigation: 'Abstract all data fetching behind a reportAgentService layer. Use defensive mock data with graceful fallbacks.',
            severity: 'medium',
          },
          {
            risk: 'Report tone mismatch with client expectations',
            mitigation: 'Offer Executive/Tactical/Detailed tone selector. Allow full email body editing before approval.',
            severity: 'medium',
          },
        ].map((item, i) => (
          <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${item.severity === 'high' ? 'bg-red-50/50 border-red-100' : 'bg-amber-50/50 border-amber-100'}`}>
            <AlertTriangle size={14} className={`flex-shrink-0 mt-0.5 ${item.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
            <div>
              <p className="text-xs font-semibold text-gray-800">{item.risk}</p>
              <p className="text-xs text-gray-600 mt-0.5">{item.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'roadmap',
    title: 'Future Roadmap',
    content: (
      <div className="text-sm text-gray-700 space-y-4">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phase 2 — Real API Integration</h3>
          <ul className="space-y-1 text-xs text-gray-600 ml-3">
            <li>Connect live GSC, GA4, and Semrush APIs</li>
            <li>OAuth-based data source authentication</li>
            <li>Scheduled automated report generation</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phase 3 — Multi-CS Collaboration</h3>
          <ul className="space-y-1 text-xs text-gray-600 ml-3">
            <li>Multi-user workspace with role-based access</li>
            <li>Comment and annotation layer on reports</li>
            <li>Report version history and diff view</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phase 4 — Client Self-Serve Portal</h3>
          <ul className="space-y-1 text-xs text-gray-600 ml-3">
            <li>White-label client report sharing link</li>
            <li>Client-side interactive report view</li>
            <li>Client feedback and approval workflow</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phase 5 — Autonomous Monitoring</h3>
          <ul className="space-y-1 text-xs text-gray-600 ml-3">
            <li>Real-time anomaly detection and alerting</li>
            <li>Proactive CS notification for ranking drops</li>
            <li>Weekly AI digest emails to clients</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export const PRDSummaryPage: React.FC = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['problem', 'user', 'mvp']));

  const toggle = (id: string) => {
    const next = new Set(openSections);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenSections(next);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
            <BookOpen size={13} className="text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Product Requirements Document</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Atlas Reporting Agent — PRD</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-gray-400">Pepper Atlas · v1.0 · June 2026</span>
          <div className="px-2 py-0.5 bg-blue-50 rounded text-xs font-medium text-blue-600">Prototype Stage</div>
        </div>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          This document describes the product requirements for the Atlas Reporting Agent — an AI-native tool that reduces CS report creation from 4+ hours to under 30 minutes, while maintaining human oversight and editorial control.
        </p>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = openSections.has(section.id);
          return (
            <div key={section.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-sm font-semibold text-gray-900">{section.title}</span>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-50">
                  <div className="pt-4">{section.content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
        <Zap size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">About This Prototype</p>
          <p className="text-xs text-blue-600 mt-1 leading-relaxed">
            This prototype was built as a product assignment artifact demonstrating the Atlas Reporting Agent concept. All data is mocked — no real API calls are made. The UI demonstrates the full CS reporting workflow from client selection through report approval.
          </p>
        </div>
      </div>
    </div>
  );
};
