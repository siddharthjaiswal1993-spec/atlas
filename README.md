# Atlas Reporting Agent

An AI-native SEO/GEO client reporting prototype for Pepper Atlas.

Reduces CS report creation from **4+ hours to under 30 minutes** using an L2.5 bounded autonomy model — the agent plans, executes, and drafts, but requires human approval before anything goes external.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

## Screens

1. **Workspace** — Client selection with L2.5 model overview and before/after comparison
2. **Configure Report** — 5-step form: report type, period & markets, competitors, data sources, output tone
3. **Agent Run** — Live step-by-step agent progress with elapsed timer (12 steps)
4. **Generated Report** — 7-tab report: Executive Summary, Organic Search, AI/GEO Visibility, Competitor Movement, Content Opportunities, Risks & Anomalies, Recommended Actions
5. **Recommendations** — Evidence-backed cards sorted by ROI (impact × effort), with accept/reject/email actions
6. **Email Draft** — AI-generated client email with regeneration, tone adjustment, and inline editing
7. **Eval Dashboard** — Before/After time comparison, quality scores, success criteria checklist
8. **PRD Summary** — Collapsible product requirements document

## Sample Clients

- **Veloxa AI** — B2B SaaS, connected to GSC + GA4 + Semrush + GEO/AI
- **Nordicware Shop** — E-commerce, connected to GSC + GA4 + Semrush + WordPress
- **The Brief Daily** — Media/publishing, connected to GSC + GA4 + Contentful

## Getting Started

```bash
npm install
npm run dev
```

All data is mocked — no real API calls are made.
