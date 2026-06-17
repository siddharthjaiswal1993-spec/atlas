# Atlas Reporting Agent

An AI-native prototype for client SEO/GEO reporting, built for Pepper Atlas. Reduces the CS reporting workflow from 4+ hours to under 30 minutes.

## Overview

Atlas is an L2.5 bounded autonomy reporting agent that:
- Pulls data from 5 sources: GSC, GA4, Semrush, GEO/AI, CMS
- Detects anomalies and performance changes
- Drafts a full 7-section client report with evidence-backed claims
- Generates prioritized recommendations with impact/effort scoring
- Creates a personalized client email draft
- Requires human review and approval before anything is shared

## Screens

1. **Workspace** — Client selection + workflow overview
2. **Configure Report** — 5-step report configuration wizard
3. **Agent Run** — Live step-by-step agent execution view
4. **Generated Report** — 7-tab tabbed report with full data
5. **Recommendations** — Accept/reject/edit evidence-backed recommendations
6. **Email Draft** — AI-generated email with editing and approval flow
7. **Eval Dashboard** — Before/after metrics proving 88% time savings
8. **PRD Summary** — Full product requirements document

## Demo Clients

- **Veloxa AI** — B2B SaaS, Revenue Intelligence
- **Nordicware Shop** — E-Commerce, Kitchen & Home
- **The Brief Daily** — Media & Content Publishing

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
- All data is mocked — no real API calls

## Getting Started

```bash
npm install
npm run dev
```

## Architecture

- `src/types/` — All TypeScript interfaces
- `src/data/clients.ts` — Client configuration
- `src/data/mockAPIs.ts` — Deterministic mock API responses per client
- `src/data/reportAgentService.ts` — Agent steps, report generation, recommendations
- `src/components/` — Shared UI components (Badge, EvidenceTag, MetricCard, Sidebar, TopBar)
- `src/pages/` — All 8 page components
