export type Screen =
  | 'workspace'
  | 'configure'
  | 'agent-run'
  | 'report'
  | 'recommendations'
  | 'email-draft'
  | 'eval'
  | 'prd';

export interface Client {
  id: string;
  name: string;
  domain: string;
  industry: string;
  cadence: string;
  connectedSources: string[];
  lastReport: string;
  manualEffortHours: number;
  logo: string;
  primaryColor: string;
}

export type ReportType =
  | 'Weekly Performance Report'
  | 'Monthly Executive Report'
  | 'QBR Report'
  | 'Competitor Deep Dive'
  | 'AI/GEO Visibility Report'
  | 'Content Opportunity Report';

export type OutputTone = 'Executive' | 'Tactical' | 'Detailed';

export interface ReportConfig {
  clientId: string;
  reportType: ReportType;
  periodStart: string;
  periodEnd: string;
  competitors: string[];
  markets: string[];
  searchEngines: string[];
  dataSources: string[];
  outputTone: OutputTone;
}

export type AgentStepStatus = 'waiting' | 'running' | 'completed' | 'error';

export interface AgentStep {
  id: string;
  label: string;
  status: AgentStepStatus;
  detail?: string;
  duration?: number;
}

export interface GSCData {
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  clicksDelta: number;
  impressionsDelta: number;
  ctrDelta: number;
  positionDelta: number;
  topQueries: { query: string; clicks: number; impressions: number; ctr: number; position: number; delta: number }[];
  topPages: { url: string; clicks: number; impressions: number; ctr: number; position: number; delta: number }[];
  winners: { query: string; change: string; metric: string }[];
  losers: { query: string; change: string; metric: string }[];
}

export interface GA4Data {
  organicSessions: number;
  organicSessionsDelta: number;
  engagementRate: number;
  engagementRateDelta: number;
  conversions: number;
  conversionsDelta: number;
  avgSessionDuration: number;
  bounceRate: number;
  topLandingPages: { url: string; sessions: number; engagementRate: number; conversions: number }[];
}

export interface SemrushData {
  domainAuthority: number;
  organicKeywords: number;
  keywordsDelta: number;
  estimatedTraffic: number;
  competitors: {
    name: string;
    domain: string;
    organicKeywords: number;
    trafficShare: number;
    commonKeywords: number;
    rankGains: number;
    rankLosses: number;
  }[];
  keywordsOvertaken: { keyword: string; clientPosition: number; competitorPosition: number; competitor: string; volume: number }[];
  contentGaps: { keyword: string; volume: number; difficulty: number; competitor: string }[];
}

export interface GeoVisibilityData {
  aiVisibilityScore: number;
  aiVisibilityScoreDelta: number;
  shareOfVoice: number;
  mentionRate: number;
  citationRate: number;
  sentimentScore: number;
  engines: {
    name: string;
    visibilityScore: number;
    mentionCount: number;
    citationCount: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  }[];
  competitors: {
    name: string;
    visibilityScore: number;
    shareOfVoice: number;
    mentionRate: number;
  }[];
  topPrompts: { prompt: string; mentioned: boolean; competitors: string[] }[];
}

export interface CMSData {
  totalPages: number;
  stalePages: { url: string; title: string; lastUpdated: string; daysStale: number; traffic: number }[];
  highImpressionLowCTR: { url: string; title: string; impressions: number; ctr: number; avgPosition: number }[];
  losingRankPages: { url: string; title: string; positionChange: number; currentPosition: number }[];
  missingComparisonPages: { topic: string; competitor: string; estimatedVolume: number }[];
}

export interface Recommendation {
  id: string;
  title: string;
  whyItMatters: string;
  evidence: string;
  sourceData: string[];
  expectedImpact: string;
  effort: 'Low' | 'Medium' | 'High';
  confidence: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  suggestedOwner: string;
  status: 'pending' | 'accepted' | 'rejected' | 'editing';
  addedToEmail: boolean;
  category: string;
}

export interface GeneratedReport {
  executiveSummary: string[];
  gscData: GSCData;
  ga4Data: GA4Data;
  semrushData: SemrushData;
  geoData: GeoVisibilityData;
  cmsData: CMSData;
  risks: { title: string; description: string; severity: 'high' | 'medium' | 'low'; source: string }[];
  recommendations: Recommendation[];
  generatedAt: string;
}

export interface EmailDraft {
  subject: string;
  body: string;
  approved: boolean;
}

export interface EvalMetrics {
  manualBaselineMinutes: number;
  aiDraftMinutes: number;
  reviewMinutes: number;
  totalAiAssistedMinutes: number;
  timeSavedPercent: number;
  completenessScore: number;
  evidenceBackedPercent: number;
  unsupportedClaimCount: number;
  recommendationUsefulnessScore: number;
  csEditEffortScore: number;
  approvalReadinessScore: number;
}

export interface AppState {
  currentScreen: Screen;
  selectedClientId: string | null;
  reportConfig: Partial<ReportConfig>;
  agentSteps: AgentStep[];
  agentRunning: boolean;
  agentComplete: boolean;
  generatedReport: GeneratedReport | null;
  recommendations: Recommendation[];
  emailDraft: EmailDraft | null;
  evalMetrics: EvalMetrics | null;
  reportApproved: boolean;
  exportSimulated: boolean;
}
