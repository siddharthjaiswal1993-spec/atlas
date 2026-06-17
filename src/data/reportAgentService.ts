import {
  AgentStep,
  GeneratedReport,
  Recommendation,
  EmailDraft,
  EvalMetrics,
  ReportConfig,
} from '../types';
import { mockGSCAPI, mockGA4API, mockSemrushAPI, mockGeoVisibilityAPI, mockCMSAPI } from './mockAPIs';
import { CLIENTS } from './clients';

export const AGENT_STEPS: AgentStep[] = [
  { id: 'brief', label: 'Reading report brief', status: 'waiting', detail: 'Parsing client configuration and report parameters', duration: 800 },
  { id: 'sources', label: 'Selecting relevant data sources', status: 'waiting', detail: 'Mapping report type to optimal data sources', duration: 600 },
  { id: 'gsc', label: 'Pulling GSC performance data', status: 'waiting', detail: 'Fetching clicks, impressions, CTR, and position data', duration: 1400 },
  { id: 'ga4', label: 'Pulling GA4 engagement & conversion data', status: 'waiting', detail: 'Fetching sessions, engagement rate, and goal completions', duration: 1200 },
  { id: 'semrush', label: 'Pulling Semrush keyword & competitor data', status: 'waiting', detail: 'Analyzing keyword rankings and competitor movements', duration: 1800 },
  { id: 'geo', label: 'Pulling AI/GEO visibility data', status: 'waiting', detail: 'Measuring brand presence across ChatGPT, Perplexity, Gemini, and AI Overviews', duration: 2000 },
  { id: 'cms', label: 'Pulling CMS content inventory', status: 'waiting', detail: 'Scanning pages for staleness, coverage gaps, and optimization opportunities', duration: 1200 },
  { id: 'anomalies', label: 'Detecting anomalies and changes', status: 'waiting', detail: 'Identifying traffic drops, ranking shifts, and unusual patterns', duration: 1600 },
  { id: 'insights', label: 'Generating insights', status: 'waiting', detail: 'Synthesizing data signals into actionable intelligence', duration: 2200 },
  { id: 'recommendations', label: 'Creating recommendations', status: 'waiting', detail: 'Prioritizing actions by impact, effort, and evidence confidence', duration: 1800 },
  { id: 'report', label: 'Drafting client report', status: 'waiting', detail: 'Composing structured executive-ready narrative', duration: 2400 },
  { id: 'email', label: 'Drafting client email', status: 'waiting', detail: 'Writing personalized email with key highlights and next steps', duration: 1400 },
];

export function generateRecommendations(clientId: string): Recommendation[] {
  const gsc = mockGSCAPI(clientId);
  const geo = mockGeoVisibilityAPI(clientId);
  const cms = mockCMSAPI(clientId);
  const semrush = mockSemrushAPI(clientId);
  const client = CLIENTS.find(c => c.id === clientId);
  const clientName = client?.name || 'client';

  const highImprPage = cms.highImpressionLowCTR[0];
  const stalePageTop = cms.stalePages[0];
  const loser = gsc.losers[0];
  const overtaken = semrush.keywordsOvertaken[0];
  const gap = semrush.contentGaps[0];
  const geoEngine = geo.engines[3];
  const missingPage = cms.missingComparisonPages[0];

  return [
    {
      id: 'rec-1',
      title: `Refresh "${highImprPage?.title}" to lift CTR`,
      whyItMatters: `This page has ${highImprPage?.impressions?.toLocaleString()} monthly impressions but only ${highImprPage?.ctr?.toFixed(1)}% CTR. Improving the title tag and meta description could add 2,000+ monthly clicks.`,
      evidence: `GSC: ${highImprPage?.impressions?.toLocaleString()} impressions, ${highImprPage?.ctr?.toFixed(1)}% CTR, avg position ${highImprPage?.avgPosition?.toFixed(1)}`,
      sourceData: ['GSC', 'GA4'],
      expectedImpact: 'Est. +2,000–4,000 monthly clicks if CTR improves to 8–10%',
      effort: 'Low', confidence: 'High', impact: 'High',
      suggestedOwner: 'SEO Copywriter', status: 'pending', addedToEmail: false, category: 'Content Optimization',
    },
    {
      id: 'rec-2',
      title: `Create comparison page: ${missingPage?.topic}`,
      whyItMatters: `Competitors rank #1–3 for "${missingPage?.topic}" with ~${missingPage?.estimatedVolume?.toLocaleString()} monthly searches. ${clientName} has no page targeting this intent.`,
      evidence: `Semrush: ${missingPage?.estimatedVolume?.toLocaleString()} monthly searches, competitor ${missingPage?.competitor} ranks #1–3`,
      sourceData: ['Semrush'],
      expectedImpact: `Est. +${Math.round((missingPage?.estimatedVolume || 0) * 0.15).toLocaleString()} monthly visits if ranking page 1`,
      effort: 'Medium', confidence: 'High', impact: 'High',
      suggestedOwner: 'Content Strategist', status: 'pending', addedToEmail: false, category: 'Content Gap',
    },
    {
      id: 'rec-3',
      title: `Optimize content for AI citation on ${geoEngine?.name}`,
      whyItMatters: `AI visibility on ${geoEngine?.name} is ${geoEngine?.visibilityScore}/100, below the competitor average of 60+. Adding structured facts and FAQ content can increase citation likelihood by 40–60%.`,
      evidence: `GEO: ${geoEngine?.name} visibility score ${geoEngine?.visibilityScore}, citation count ${geoEngine?.citationCount}`,
      sourceData: ['GEO/AI'],
      expectedImpact: 'Est. +15–25 citation events/month, improving AI share of voice',
      effort: 'Medium', confidence: 'Medium', impact: 'High',
      suggestedOwner: 'SEO/GEO Strategist', status: 'pending', addedToEmail: false, category: 'AI/GEO Visibility',
    },
    {
      id: 'rec-4',
      title: 'Add structured FAQ content to top-traffic pages',
      whyItMatters: 'Pages missing structured FAQ markup are rarely cited in AI Overviews. Adding FAQ schema to the top 5 pages could unlock Google AI Overview inclusion for high-volume queries.',
      evidence: `GEO: Google AI Overviews visibility score ${geo.engines.find(e => e.name === 'Google AI Overviews')?.visibilityScore}/100; GSC: top pages have 0 FAQ schema markup`,
      sourceData: ['GEO/AI', 'GSC', 'CMS'],
      expectedImpact: 'Est. inclusion in 3–5 AI Overview responses for branded/comparison queries',
      effort: 'Low', confidence: 'High', impact: 'Medium',
      suggestedOwner: 'Technical SEO', status: 'pending', addedToEmail: false, category: 'Technical SEO',
    },
    {
      id: 'rec-5',
      title: `Update ${cms.stalePages.length} stale CMS pages (${stalePageTop?.daysStale}+ days old)`,
      whyItMatters: `${stalePageTop?.title} was last updated ${stalePageTop?.daysStale} days ago and still drives ~${stalePageTop?.traffic?.toLocaleString()} monthly visits. Freshness signals affect rankings, and outdated content erodes trust.`,
      evidence: `CMS: ${cms.stalePages.length} pages not updated in 90+ days; ${stalePageTop?.title} last updated ${stalePageTop?.lastUpdated}`,
      sourceData: ['CMS', 'GSC'],
      expectedImpact: 'Est. prevent 10–15% ranking decay over next 90 days for affected pages',
      effort: 'High', confidence: 'High', impact: 'Medium',
      suggestedOwner: 'Content Team', status: 'pending', addedToEmail: false, category: 'Content Freshness',
    },
    {
      id: 'rec-6',
      title: `Build branded AI search content for "${geo.topPrompts.filter(p => !p.mentioned)[0]?.prompt}"`,
      whyItMatters: `${clientName} is not mentioned when AI answers "${geo.topPrompts.filter(p => !p.mentioned)[0]?.prompt}" — a high-intent prompt where competitors dominate. Creating a definitive executive-tone answer page can change this within 60–90 days.`,
      evidence: `GEO: Not mentioned in top AI response for this prompt; competitors: ${geo.topPrompts.filter(p => !p.mentioned)[0]?.competitors.join(', ')}`,
      sourceData: ['GEO/AI', 'Semrush'],
      expectedImpact: 'Brand inclusion in AI responses for 2–3 high-intent prompts',
      effort: 'Medium', confidence: 'Medium', impact: 'High',
      suggestedOwner: 'Brand + SEO', status: 'pending', addedToEmail: false, category: 'AI/GEO Visibility',
    },
    {
      id: 'rec-7',
      title: `Investigate click drop on "${loser?.query}"`,
      whyItMatters: `"${loser?.query}" lost significant clicks this period. Root cause could be SERP feature displacement, competitor rank gains, or algorithmic shift. Needs immediate diagnosis.`,
      evidence: `GSC: ${loser?.query} showing ${loser?.change} vs prior period; Semrush: ${overtaken?.competitor} gained positions`,
      sourceData: ['GSC', 'Semrush'],
      expectedImpact: 'Recover 15–30% of lost traffic if root cause is addressed within 30 days',
      effort: 'Medium', confidence: 'Medium', impact: 'Medium',
      suggestedOwner: 'SEO Analyst', status: 'pending', addedToEmail: false, category: 'Traffic Investigation',
    },
    {
      id: 'rec-8',
      title: `Build content cluster around "${gap?.keyword}"`,
      whyItMatters: `"${gap?.keyword}" has ${gap?.volume?.toLocaleString()} monthly searches with ${gap?.difficulty} difficulty. ${clientName} has no content targeting this cluster. ${gap?.competitor} is ranking #1–5.`,
      evidence: `Semrush: ${gap?.volume?.toLocaleString()} monthly searches, ${gap?.difficulty} KD, ${gap?.competitor} ranking`,
      sourceData: ['Semrush', 'CMS'],
      expectedImpact: `Est. ${Math.round((gap?.volume || 0) * 0.08).toLocaleString()}–${Math.round((gap?.volume || 0) * 0.15).toLocaleString()} monthly visits if top-10 ranking achieved`,
      effort: 'High', confidence: 'High', impact: 'High',
      suggestedOwner: 'Content Strategist', status: 'pending', addedToEmail: false, category: 'Keyword Opportunity',
    },
  ];
}

export function generateEmailDraft(clientId: string, recommendations: Recommendation[]): EmailDraft {
  const client = CLIENTS.find(c => c.id === clientId);
  const gsc = mockGSCAPI(clientId);
  const geo = mockGeoVisibilityAPI(clientId);
  const accepted = recommendations.filter(r => r.status === 'accepted');
  const clientName = client?.name || 'Team';
  const period = 'May 2026';
  const acceptedSection = accepted.length > 0
    ? `\nBased on our analysis, the following actions are recommended and I've flagged them for our upcoming sprint:\n\n${accepted.map((r, i) => `${i + 1}. ${r.title}\n   Expected impact: ${r.expectedImpact}`).join('\n\n')}`
    : '';
  return {
    subject: `${clientName} — ${period} Search & AI Visibility Report`,
    body: `Hi [Client Name],\n\nHope you're having a great week. Attached is your ${period} performance report for ${client?.domain}.\n\nHere's a quick summary of what we're seeing:\n\n**Key Wins This Month**\n- Organic clicks up ${Math.abs(gsc.clicksDelta).toFixed(1)}%${gsc.clicksDelta > 0 ? '' : ' (decline — see risks below)'} vs. prior period, driven by improvements in branded and navigational queries\n- AI visibility on Perplexity improved to ${geo.engines.find(e => e.name === 'Perplexity')?.visibilityScore}/100, showing early traction from our structured content updates\n- ${gsc.winners[0]?.query} query is performing strongly with ${gsc.winners[0]?.change} vs last period\n\n**Key Risks to Watch**\n- ${gsc.losers[0]?.query}: ${gsc.losers[0]?.change} — likely driven by a competitor ranking jump; we're recommending immediate content refresh\n- AI visibility on Google AI Overviews remains below target at ${geo.engines.find(e => e.name === 'Google AI Overviews')?.visibilityScore}/100 — action items included below\n- ${Math.abs(geo.aiVisibilityScoreDelta) > 0 ? `Overall AI visibility score ${geo.aiVisibilityScoreDelta < 0 ? 'declined' : 'improved'} by ${Math.abs(geo.aiVisibilityScoreDelta)} points — competitor gains noted` : ''}\n\n**Recommended Next Actions**\n${recommendations.slice(0, 3).map((r, i) => `${i + 1}. ${r.title} (${r.effort} effort, ${r.impact} impact)`).join('\n')}${acceptedSection}\n\n**Suggested Agenda for Next Call**\n1. Review month's performance highlights (10 min)\n2. Deep-dive on AI/GEO visibility strategy (15 min)\n3. Prioritize Q3 content sprint (10 min)\n4. Quick wins to action before next report (5 min)\n\nFull report with evidence and data breakdowns is attached.\n\nLet me know if you have any questions before our call — happy to walk through anything in more detail.\n\nBest,\n[Your Name]\nCustomer Success Manager, Pepper Atlas`,
    approved: false,
  };
}

export function generateReport(clientId: string): GeneratedReport {
  const gsc = mockGSCAPI(clientId);
  const ga4 = mockGA4API(clientId);
  const semrush = mockSemrushAPI(clientId);
  const geo = mockGeoVisibilityAPI(clientId);
  const cms = mockCMSAPI(clientId);
  const client = CLIENTS.find(c => c.id === clientId);
  const recommendations = generateRecommendations(clientId);
  const risks = [
    { title: `Traffic drop: "${gsc.losers[0]?.query}"`, description: `${gsc.losers[0]?.change} in clicks vs prior period. Likely caused by competitor rank gain and possible SERP feature displacement.`, severity: 'high' as const, source: 'GSC' },
    { title: `Ranking decline: ${cms.losingRankPages[0]?.title}`, description: `Position deteriorated by +${cms.losingRankPages[0]?.positionChange?.toFixed(1)} positions (now at ${cms.losingRankPages[0]?.currentPosition?.toFixed(1)}). Page may need content refresh.`, severity: 'medium' as const, source: 'GSC + Semrush' },
    { title: 'Competitor AI mention surge', description: `${semrush.competitors[0]?.name} visibility score on Perplexity is ${geo.competitors[0]?.visibilityScore}/100 vs ${client?.name}'s ${geo.engines.find(e => e.name === 'Perplexity')?.visibilityScore}/100. Gap is widening.`, severity: 'high' as const, source: 'GEO/AI' },
    { title: `${cms.stalePages.length} CMS pages not updated in 90+ days`, description: `Stale pages risk ranking decay. Top affected: "${cms.stalePages[0]?.title}" (${cms.stalePages[0]?.daysStale} days stale, ${cms.stalePages[0]?.traffic?.toLocaleString()} monthly visits).`, severity: 'medium' as const, source: 'CMS' },
    { title: 'Missing AI citations in Google AI Overviews', description: `${client?.name} not cited in Google AI Overviews responses for ${geo.topPrompts.filter(p => !p.mentioned).length} tracked prompts. Competitors dominate these responses.`, severity: 'medium' as const, source: 'GEO/AI' },
  ];
  const executiveSummary = [
    `Organic clicks ${gsc.clicksDelta >= 0 ? 'increased' : 'declined'} ${Math.abs(gsc.clicksDelta).toFixed(1)}% vs prior period — ${gsc.clicksDelta >= 0 ? 'strong momentum in branded and category queries' : 'driven by ranking losses in key non-branded terms'}.`,
    `AI visibility score is ${geo.aiVisibilityScore}/100, ${Math.abs(geo.aiVisibilityScoreDelta)} points ${geo.aiVisibilityScoreDelta < 0 ? 'below' : 'above'} prior month. ${semrush.competitors[0]?.name} and ${semrush.competitors[1]?.name} are outpacing ${client?.name} in AI-generated responses.`,
    `${semrush.competitors[0]?.name} gained ${semrush.competitors[0]?.rankGains} keyword positions this period — notable encroachment on "${semrush.keywordsOvertaken[0]?.keyword}" (${semrush.keywordsOvertaken[0]?.volume?.toLocaleString()} monthly searches).`,
    `${cms.highImpressionLowCTR.length} high-impression pages have CTR below 6%, representing an estimated 3,000–6,000 monthly clicks left on the table.`,
    `${cms.stalePages.length} content pages have not been updated in 90+ days — prioritizing refresh of the top 3 by traffic impact.`,
    'Recommended focus: comparison content creation, FAQ structured markup for AI citations, and a targeted refresh of the highest-impression low-CTR pages.',
  ];
  return { executiveSummary, gscData: gsc, ga4Data: ga4, semrushData: semrush, geoData: geo, cmsData: cms, risks, recommendations, generatedAt: new Date().toISOString() };
}

export function calculateEvalMetrics(): EvalMetrics {
  return {
    manualBaselineMinutes: 240, aiDraftMinutes: 8, reviewMinutes: 20, totalAiAssistedMinutes: 28,
    timeSavedPercent: 88, completenessScore: 94, evidenceBackedPercent: 96, unsupportedClaimCount: 2,
    recommendationUsefulnessScore: 4.4, csEditEffortScore: 18, approvalReadinessScore: 91,
  };
}

// Satisfy unused import lint
export type { ReportConfig };
