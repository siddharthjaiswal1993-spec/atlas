import { GSCData, GA4Data, SemrushData, GeoVisibilityData, CMSData } from '../types';

export function mockGSCAPI(clientId: string): GSCData {
  const datasets: Record<string, GSCData> = {
    'client-1': {
      clicks: 28450,
      impressions: 412800,
      ctr: 6.89,
      avgPosition: 8.4,
      clicksDelta: 12.3,
      impressionsDelta: 8.7,
      ctrDelta: 0.3,
      positionDelta: -1.2,
      topQueries: [
        { query: 'revenue intelligence platform', clicks: 3240, impressions: 18500, ctr: 17.5, position: 2.1, delta: 18 },
        { query: 'ai sales forecasting', clicks: 2180, impressions: 32100, ctr: 6.8, position: 5.4, delta: -8 },
        { query: 'b2b revenue operations software', clicks: 1950, impressions: 24300, ctr: 8.0, position: 3.7, delta: 22 },
        { query: 'sales pipeline analytics', clicks: 1620, impressions: 41200, ctr: 3.9, position: 9.2, delta: -15 },
        { query: 'revenue forecasting tool', clicks: 1480, impressions: 19800, ctr: 7.5, position: 4.1, delta: 5 },
        { query: 'veloxa ai review', clicks: 1340, impressions: 8900, ctr: 15.1, position: 1.8, delta: 31 },
        { query: 'crm revenue tracking', clicks: 1120, impressions: 28600, ctr: 3.9, position: 11.3, delta: -22 },
        { query: 'b2b sales ai', clicks: 980, impressions: 35400, ctr: 2.8, position: 14.7, delta: -41 },
      ],
      topPages: [
        { url: '/product/revenue-intelligence', clicks: 5240, impressions: 42100, ctr: 12.4, position: 2.8, delta: 28 },
        { url: '/blog/ai-sales-forecasting-guide', clicks: 3180, impressions: 58200, ctr: 5.5, position: 7.2, delta: -12 },
        { url: '/', clicks: 2940, impressions: 31600, ctr: 9.3, position: 3.4, delta: 8 },
        { url: '/pricing', clicks: 2120, impressions: 18900, ctr: 11.2, position: 4.1, delta: 3 },
        { url: '/blog/revenue-operations-guide', clicks: 1840, impressions: 44300, ctr: 4.2, position: 8.9, delta: -18 },
      ],
      winners: [
        { query: 'revenue intelligence platform', change: '+18 clicks', metric: 'Clicks' },
        { query: 'veloxa ai review', change: '+31 clicks', metric: 'Clicks' },
        { query: 'b2b revenue operations software', change: '+22 clicks', metric: 'Clicks' },
      ],
      losers: [
        { query: 'b2b sales ai', change: '-41 clicks', metric: 'Clicks' },
        { query: 'crm revenue tracking', change: '-22 clicks', metric: 'Clicks' },
        { query: 'sales pipeline analytics', change: '-15 clicks', metric: 'Clicks' },
      ],
    },
    'client-2': {
      clicks: 64200,
      impressions: 892400,
      ctr: 7.19,
      avgPosition: 6.8,
      clicksDelta: -4.2,
      impressionsDelta: 2.1,
      ctrDelta: -0.5,
      positionDelta: 0.8,
      topQueries: [
        { query: 'nordic ware cookware', clicks: 8240, impressions: 42100, ctr: 19.6, position: 1.4, delta: -2 },
        { query: 'cast aluminum baking pans', clicks: 5180, impressions: 64200, ctr: 8.1, position: 4.2, delta: -18 },
        { query: 'bundt pan 12 cup', clicks: 4920, impressions: 38700, ctr: 12.7, position: 2.8, delta: 6 },
        { query: 'best roasting pan', clicks: 3640, impressions: 118400, ctr: 3.1, position: 12.4, delta: -31 },
        { query: 'nordicware holiday collections', clicks: 3280, impressions: 18200, ctr: 18.0, position: 2.1, delta: 12 },
      ],
      topPages: [
        { url: '/collections/bundt-pans', clicks: 12400, impressions: 89300, ctr: 13.9, position: 2.2, delta: 4 },
        { url: '/products/anniversary-bundt', clicks: 8920, impressions: 42100, ctr: 21.2, position: 1.6, delta: 8 },
        { url: '/collections/bakeware', clicks: 7340, impressions: 124600, ctr: 5.9, position: 8.4, delta: -21 },
        { url: '/collections/cast-aluminum', clicks: 6180, impressions: 68900, ctr: 9.0, position: 5.7, delta: -14 },
        { url: '/', clicks: 5420, impressions: 38200, ctr: 14.2, position: 3.1, delta: 2 },
      ],
      winners: [
        { query: 'nordicware holiday collections', change: '+12 clicks', metric: 'Clicks' },
        { query: 'bundt pan 12 cup', change: '+6 clicks', metric: 'Clicks' },
      ],
      losers: [
        { query: 'best roasting pan', change: '-31 clicks', metric: 'Clicks' },
        { query: 'cast aluminum baking pans', change: '-18 clicks', metric: 'Clicks' },
      ],
    },
    'client-3': {
      clicks: 142800,
      impressions: 2840000,
      ctr: 5.03,
      avgPosition: 11.2,
      clicksDelta: -8.4,
      impressionsDelta: -3.1,
      ctrDelta: -0.3,
      positionDelta: 2.1,
      topQueries: [
        { query: 'daily news briefing', clicks: 18400, impressions: 184000, ctr: 10.0, position: 3.2, delta: -6 },
        { query: 'tech news today', clicks: 14200, impressions: 412000, ctr: 3.4, position: 9.4, delta: -22 },
        { query: 'morning market brief', clicks: 9840, impressions: 128000, ctr: 7.7, position: 4.8, delta: -11 },
        { query: 'ai news this week', clicks: 8420, impressions: 312000, ctr: 2.7, position: 14.2, delta: -38 },
        { query: 'the brief daily podcast', clicks: 7640, impressions: 42000, ctr: 18.2, position: 2.1, delta: 4 },
      ],
      topPages: [
        { url: '/newsletter', clicks: 28400, impressions: 184000, ctr: 15.4, position: 2.8, delta: -4 },
        { url: '/daily-brief/ai-roundup', clicks: 18200, impressions: 412000, ctr: 4.4, position: 8.9, delta: -28 },
        { url: '/category/technology', clicks: 14800, impressions: 892000, ctr: 1.7, position: 18.4, delta: -42 },
        { url: '/daily-brief/markets', clicks: 12400, impressions: 218000, ctr: 5.7, position: 7.2, delta: -16 },
        { url: '/', clicks: 10200, impressions: 124000, ctr: 8.2, position: 4.1, delta: -8 },
      ],
      winners: [
        { query: 'the brief daily podcast', change: '+4 clicks', metric: 'Clicks' },
      ],
      losers: [
        { query: 'ai news this week', change: '-38 clicks', metric: 'Clicks' },
        { query: 'tech news today', change: '-22 clicks', metric: 'Clicks' },
        { query: 'morning market brief', change: '-11 clicks', metric: 'Clicks' },
      ],
    },
  };
  return datasets[clientId] || datasets['client-1'];
}

export function mockGA4API(clientId: string): GA4Data {
  const datasets: Record<string, GA4Data> = {
    'client-1': {
      organicSessions: 31200,
      organicSessionsDelta: 9.4,
      engagementRate: 64.2,
      engagementRateDelta: 2.8,
      conversions: 842,
      conversionsDelta: 18.3,
      avgSessionDuration: 248,
      bounceRate: 35.8,
      topLandingPages: [
        { url: '/product/revenue-intelligence', sessions: 6840, engagementRate: 72.4, conversions: 218 },
        { url: '/blog/ai-sales-forecasting-guide', sessions: 4120, engagementRate: 58.2, conversions: 84 },
        { url: '/', sessions: 3840, engagementRate: 61.8, conversions: 142 },
        { url: '/pricing', sessions: 2940, engagementRate: 81.2, conversions: 198 },
        { url: '/blog/revenue-operations-guide', sessions: 2180, engagementRate: 54.6, conversions: 42 },
      ],
    },
    'client-2': {
      organicSessions: 72400,
      organicSessionsDelta: -3.8,
      engagementRate: 58.4,
      engagementRateDelta: -1.2,
      conversions: 3240,
      conversionsDelta: -6.2,
      avgSessionDuration: 184,
      bounceRate: 41.6,
      topLandingPages: [
        { url: '/collections/bundt-pans', sessions: 14200, engagementRate: 62.4, conversions: 842 },
        { url: '/products/anniversary-bundt', sessions: 9840, engagementRate: 74.8, conversions: 621 },
        { url: '/collections/bakeware', sessions: 8420, engagementRate: 52.1, conversions: 418 },
        { url: '/collections/cast-aluminum', sessions: 6980, engagementRate: 58.9, conversions: 382 },
        { url: '/', sessions: 5840, engagementRate: 48.2, conversions: 284 },
      ],
    },
    'client-3': {
      organicSessions: 158400,
      organicSessionsDelta: -7.2,
      engagementRate: 42.8,
      engagementRateDelta: -3.4,
      conversions: 4820,
      conversionsDelta: -11.4,
      avgSessionDuration: 124,
      bounceRate: 57.2,
      topLandingPages: [
        { url: '/newsletter', sessions: 32400, engagementRate: 68.2, conversions: 2140 },
        { url: '/daily-brief/ai-roundup', sessions: 24200, engagementRate: 38.4, conversions: 842 },
        { url: '/category/technology', sessions: 18400, engagementRate: 28.6, conversions: 420 },
        { url: '/daily-brief/markets', sessions: 14800, engagementRate: 44.2, conversions: 618 },
        { url: '/', sessions: 11200, engagementRate: 52.4, conversions: 284 },
      ],
    },
  };
  return datasets[clientId] || datasets['client-1'];
}

export function mockSemrushAPI(clientId: string): SemrushData {
  const datasets: Record<string, SemrushData> = {
    'client-1': {
      domainAuthority: 52,
      organicKeywords: 8420,
      keywordsDelta: 4.2,
      estimatedTraffic: 28100,
      competitors: [
        { name: 'Clari', domain: 'clari.com', organicKeywords: 14200, trafficShare: 28.4, commonKeywords: 1840, rankGains: 142, rankLosses: 38 },
        { name: 'Gong', domain: 'gong.io', organicKeywords: 18400, trafficShare: 24.2, commonKeywords: 2140, rankGains: 98, rankLosses: 54 },
        { name: 'Chorus.ai', domain: 'chorus.ai', organicKeywords: 6840, trafficShare: 12.8, commonKeywords: 980, rankGains: 62, rankLosses: 28 },
        { name: 'Boostup.ai', domain: 'boostup.ai', organicKeywords: 3240, trafficShare: 8.4, commonKeywords: 542, rankGains: 84, rankLosses: 12 },
      ],
      keywordsOvertaken: [
        { keyword: 'b2b sales ai', clientPosition: 14, competitorPosition: 7, competitor: 'Clari', volume: 8400 },
        { keyword: 'crm revenue tracking', clientPosition: 11, competitorPosition: 5, competitor: 'Gong', volume: 5200 },
        { keyword: 'sales pipeline software', clientPosition: 18, competitorPosition: 9, competitor: 'Clari', volume: 12400 },
        { keyword: 'revenue intelligence tools comparison', clientPosition: 24, competitorPosition: 3, competitor: 'Chorus.ai', volume: 2800 },
      ],
      contentGaps: [
        { keyword: 'revenue intelligence vs crm', volume: 3400, difficulty: 42, competitor: 'Clari' },
        { keyword: 'ai sales coaching platform', volume: 6800, difficulty: 58, competitor: 'Gong' },
        { keyword: 'revenue operations best practices', volume: 9200, difficulty: 48, competitor: 'Chorus.ai' },
        { keyword: 'b2b sales metrics dashboard', volume: 4800, difficulty: 52, competitor: 'Boostup.ai' },
      ],
    },
    'client-2': {
      domainAuthority: 61,
      organicKeywords: 18400,
      keywordsDelta: -2.1,
      estimatedTraffic: 64800,
      competitors: [
        { name: 'Lodge Cast Iron', domain: 'lodgemfg.com', organicKeywords: 24200, trafficShare: 32.4, commonKeywords: 4840, rankGains: 214, rankLosses: 48 },
        { name: 'All-Clad', domain: 'all-clad.com', organicKeywords: 16800, trafficShare: 22.8, commonKeywords: 3240, rankGains: 128, rankLosses: 62 },
        { name: 'Williams Sonoma', domain: 'williams-sonoma.com', organicKeywords: 84200, trafficShare: 18.4, commonKeywords: 6840, rankGains: 342, rankLosses: 84 },
        { name: 'Sur La Table', domain: 'surlatable.com', organicKeywords: 42800, trafficShare: 14.2, commonKeywords: 4120, rankGains: 184, rankLosses: 96 },
      ],
      keywordsOvertaken: [
        { keyword: 'cast aluminum baking pans', clientPosition: 8, competitorPosition: 2, competitor: 'Lodge Cast Iron', volume: 18400 },
        { keyword: 'best roasting pan', clientPosition: 12, competitorPosition: 4, competitor: 'All-Clad', volume: 28400 },
        { keyword: 'holiday baking pans', clientPosition: 15, competitorPosition: 6, competitor: 'Williams Sonoma', volume: 12400 },
      ],
      contentGaps: [
        { keyword: 'best bundt pan comparison', volume: 8400, difficulty: 38, competitor: 'Williams Sonoma' },
        { keyword: 'cast iron vs aluminum bakeware', volume: 5200, difficulty: 44, competitor: 'Lodge Cast Iron' },
        { keyword: 'holiday baking recipes bundt', volume: 12400, difficulty: 32, competitor: 'Sur La Table' },
      ],
    },
    'client-3': {
      domainAuthority: 68,
      organicKeywords: 42400,
      keywordsDelta: -6.8,
      estimatedTraffic: 142000,
      competitors: [
        { name: 'Morning Brew', domain: 'morningbrew.com', organicKeywords: 84200, trafficShare: 38.4, commonKeywords: 12400, rankGains: 842, rankLosses: 124 },
        { name: 'The Hustle', domain: 'thehustle.co', organicKeywords: 42800, trafficShare: 22.4, commonKeywords: 8400, rankGains: 424, rankLosses: 96 },
        { name: 'Axios', domain: 'axios.com', organicKeywords: 284000, trafficShare: 16.8, commonKeywords: 18400, rankGains: 2840, rankLosses: 842 },
        { name: 'The Information', domain: 'theinformation.com', organicKeywords: 28400, trafficShare: 8.4, commonKeywords: 4200, rankGains: 284, rankLosses: 62 },
      ],
      keywordsOvertaken: [
        { keyword: 'ai news this week', clientPosition: 14, competitorPosition: 3, competitor: 'Morning Brew', volume: 28400 },
        { keyword: 'tech news briefing', clientPosition: 18, competitorPosition: 5, competitor: 'Axios', volume: 42400 },
        { keyword: 'startup news today', clientPosition: 22, competitorPosition: 7, competitor: 'The Hustle', volume: 18400 },
        { keyword: 'daily business briefing', clientPosition: 19, competitorPosition: 4, competitor: 'Morning Brew', volume: 14200 },
      ],
      contentGaps: [
        { keyword: 'ai tools weekly digest', volume: 12400, difficulty: 42, competitor: 'Morning Brew' },
        { keyword: 'startup funding roundup', volume: 8400, difficulty: 48, competitor: 'The Hustle' },
        { keyword: 'tech earnings briefing', volume: 6800, difficulty: 52, competitor: 'Axios' },
      ],
    },
  };
  return datasets[clientId] || datasets['client-1'];
}

export function mockGeoVisibilityAPI(clientId: string): GeoVisibilityData {
  const datasets: Record<string, GeoVisibilityData> = {
    'client-1': {
      aiVisibilityScore: 42,
      aiVisibilityScoreDelta: -8,
      shareOfVoice: 18.4,
      mentionRate: 34.2,
      citationRate: 12.8,
      sentimentScore: 72,
      engines: [
        { name: 'ChatGPT', visibilityScore: 48, mentionCount: 284, citationCount: 84, sentiment: 'positive' },
        { name: 'Perplexity', visibilityScore: 52, mentionCount: 198, citationCount: 124, sentiment: 'positive' },
        { name: 'Gemini', visibilityScore: 38, mentionCount: 142, citationCount: 42, sentiment: 'neutral' },
        { name: 'Google AI Overviews', visibilityScore: 31, mentionCount: 98, citationCount: 28, sentiment: 'neutral' },
      ],
      competitors: [
        { name: 'Clari', visibilityScore: 68, shareOfVoice: 32.4, mentionRate: 58.2 },
        { name: 'Gong', visibilityScore: 74, shareOfVoice: 38.8, mentionRate: 64.4 },
        { name: 'Chorus.ai', visibilityScore: 44, shareOfVoice: 18.2, mentionRate: 36.8 },
      ],
      topPrompts: [
        { prompt: 'What is the best revenue intelligence platform?', mentioned: true, competitors: ['Gong', 'Clari'] },
        { prompt: 'Compare AI sales forecasting tools', mentioned: false, competitors: ['Gong', 'Clari', 'Chorus.ai'] },
        { prompt: 'How to improve B2B sales pipeline visibility?', mentioned: true, competitors: ['Gong'] },
        { prompt: 'Best CRM analytics integrations 2025', mentioned: false, competitors: ['Clari', 'Gong'] },
        { prompt: 'Revenue operations software recommendations', mentioned: true, competitors: ['Clari', 'Chorus.ai'] },
      ],
    },
    'client-2': {
      aiVisibilityScore: 28,
      aiVisibilityScoreDelta: 4,
      shareOfVoice: 12.4,
      mentionRate: 22.8,
      citationRate: 8.4,
      sentimentScore: 64,
      engines: [
        { name: 'ChatGPT', visibilityScore: 32, mentionCount: 142, citationCount: 42, sentiment: 'positive' },
        { name: 'Perplexity', visibilityScore: 38, mentionCount: 98, citationCount: 64, sentiment: 'positive' },
        { name: 'Gemini', visibilityScore: 24, mentionCount: 74, citationCount: 18, sentiment: 'neutral' },
        { name: 'Google AI Overviews', visibilityScore: 18, mentionCount: 52, citationCount: 12, sentiment: 'neutral' },
      ],
      competitors: [
        { name: 'Lodge Cast Iron', visibilityScore: 62, shareOfVoice: 28.4, mentionRate: 48.2 },
        { name: 'All-Clad', visibilityScore: 58, shareOfVoice: 24.8, mentionRate: 42.4 },
        { name: 'Williams Sonoma', visibilityScore: 72, shareOfVoice: 34.2, mentionRate: 58.8 },
      ],
      topPrompts: [
        { prompt: 'What is the best bundt pan?', mentioned: false, competitors: ['Nordic Ware', 'Lodge Cast Iron'] },
        { prompt: 'Best bakeware brands for home bakers', mentioned: true, competitors: ['All-Clad', 'Williams Sonoma'] },
        { prompt: 'Cast iron vs aluminum baking pans comparison', mentioned: false, competitors: ['Lodge Cast Iron', 'All-Clad'] },
        { prompt: 'Holiday baking pan recommendations', mentioned: true, competitors: ['Williams Sonoma'] },
      ],
    },
    'client-3': {
      aiVisibilityScore: 58,
      aiVisibilityScoreDelta: -14,
      shareOfVoice: 8.4,
      mentionRate: 18.2,
      citationRate: 6.8,
      sentimentScore: 68,
      engines: [
        { name: 'ChatGPT', visibilityScore: 62, mentionCount: 384, citationCount: 124, sentiment: 'positive' },
        { name: 'Perplexity', visibilityScore: 68, mentionCount: 284, citationCount: 184, sentiment: 'positive' },
        { name: 'Gemini', visibilityScore: 52, mentionCount: 198, citationCount: 84, sentiment: 'neutral' },
        { name: 'Google AI Overviews', visibilityScore: 48, mentionCount: 142, citationCount: 62, sentiment: 'negative' },
      ],
      competitors: [
        { name: 'Morning Brew', visibilityScore: 84, shareOfVoice: 42.4, mentionRate: 72.8 },
        { name: 'Axios', visibilityScore: 78, shareOfVoice: 38.4, mentionRate: 68.2 },
        { name: 'The Hustle', visibilityScore: 64, shareOfVoice: 24.8, mentionRate: 48.4 },
      ],
      topPrompts: [
        { prompt: 'Best daily AI news newsletter', mentioned: false, competitors: ['Morning Brew', 'Axios'] },
        { prompt: 'Where to get tech news briefings?', mentioned: false, competitors: ['Morning Brew', 'Axios', 'The Hustle'] },
        { prompt: 'Best business newsletters 2025', mentioned: true, competitors: ['Morning Brew', 'The Hustle'] },
        { prompt: 'Daily startup and tech news sources', mentioned: true, competitors: ['Morning Brew', 'Axios'] },
        { prompt: 'Free daily market brief newsletter', mentioned: false, competitors: ['Morning Brew', 'The Hustle'] },
      ],
    },
  };
  return datasets[clientId] || datasets['client-1'];
}

export function mockCMSAPI(clientId: string): CMSData {
  const datasets: Record<string, CMSData> = {
    'client-1': {
      totalPages: 284,
      stalePages: [
        { url: '/blog/sales-forecasting-2022', title: 'Sales Forecasting Best Practices 2022', lastUpdated: '2022-11-12', daysStale: 582, traffic: 1240 },
        { url: '/blog/revenue-ops-guide', title: 'The Complete Revenue Ops Guide', lastUpdated: '2023-02-08', daysStale: 494, traffic: 2840 },
        { url: '/resources/crm-integration', title: 'CRM Integration Handbook', lastUpdated: '2023-04-22', daysStale: 421, traffic: 980 },
        { url: '/blog/ai-sales-tools-2022', title: 'Top AI Sales Tools 2022', lastUpdated: '2022-12-30', daysStale: 533, traffic: 1840 },
        { url: '/use-cases/enterprise-forecasting', title: 'Enterprise Sales Forecasting', lastUpdated: '2023-06-14', daysStale: 368, traffic: 3240 },
      ],
      highImpressionLowCTR: [
        { url: '/blog/ai-sales-forecasting-guide', title: 'AI Sales Forecasting Guide', impressions: 58200, ctr: 5.5, avgPosition: 7.2 },
        { url: '/blog/revenue-operations-guide', title: 'Revenue Operations Guide', impressions: 44300, ctr: 4.2, avgPosition: 8.9 },
        { url: '/resources/sales-benchmarks', title: 'B2B Sales Benchmarks 2025', impressions: 38400, ctr: 2.8, avgPosition: 11.4 },
        { url: '/blog/crm-analytics-guide', title: 'CRM Analytics Guide', impressions: 28600, ctr: 3.9, avgPosition: 9.2 },
      ],
      losingRankPages: [
        { url: '/blog/b2b-sales-ai', title: 'B2B Sales AI Guide', positionChange: +6.2, currentPosition: 14.7 },
        { url: '/blog/crm-revenue-tracking', title: 'CRM Revenue Tracking', positionChange: +4.8, currentPosition: 11.3 },
        { url: '/blog/sales-pipeline-guide', title: 'Sales Pipeline Management', positionChange: +3.2, currentPosition: 18.4 },
      ],
      missingComparisonPages: [
        { topic: 'Veloxa AI vs Clari', competitor: 'Clari', estimatedVolume: 3400 },
        { topic: 'Veloxa AI vs Gong', competitor: 'Gong', estimatedVolume: 4800 },
        { topic: 'Revenue intelligence platform comparison', competitor: 'Multiple', estimatedVolume: 2800 },
      ],
    },
    'client-2': {
      totalPages: 1840,
      stalePages: [
        { url: '/blog/holiday-baking-2022', title: 'Holiday Baking Guide 2022', lastUpdated: '2022-12-01', daysStale: 562, traffic: 8400 },
        { url: '/blog/bundt-pan-care', title: 'How to Care for Your Bundt Pan', lastUpdated: '2023-01-15', daysStale: 517, traffic: 4200 },
        { url: '/blog/cast-aluminum-benefits', title: 'Benefits of Cast Aluminum Bakeware', lastUpdated: '2023-03-08', daysStale: 466, traffic: 2840 },
      ],
      highImpressionLowCTR: [
        { url: '/collections/bakeware', title: 'All Bakeware', impressions: 124600, ctr: 5.9, avgPosition: 8.4 },
        { url: '/collections/cast-aluminum', title: 'Cast Aluminum Collection', impressions: 68900, ctr: 9.0, avgPosition: 5.7 },
        { url: '/products/roasting-pan-large', title: 'Large Roasting Pan', impressions: 42400, ctr: 3.1, avgPosition: 12.4 },
      ],
      losingRankPages: [
        { url: '/collections/cast-aluminum', title: 'Cast Aluminum Collection', positionChange: +3.8, currentPosition: 8.4 },
        { url: '/products/roasting-pan-large', title: 'Large Roasting Pan', positionChange: +5.2, currentPosition: 12.4 },
      ],
      missingComparisonPages: [
        { topic: 'Nordic Ware vs Lodge Cast Iron', competitor: 'Lodge Cast Iron', estimatedVolume: 5200 },
        { topic: 'Best Bundt Pan Comparison 2025', competitor: 'Multiple', estimatedVolume: 8400 },
      ],
    },
    'client-3': {
      totalPages: 8420,
      stalePages: [
        { url: '/daily-brief/2024-01-ai-roundup', title: 'AI News Roundup Jan 2024', lastUpdated: '2024-01-15', daysStale: 519, traffic: 12400 },
        { url: '/archive/tech-news-2023-q4', title: 'Tech News Q4 2023', lastUpdated: '2023-12-31', daysStale: 534, traffic: 8400 },
        { url: '/features/chatgpt-impact-media', title: 'ChatGPT Impact on Media', lastUpdated: '2023-08-22', daysStale: 665, traffic: 18400 },
        { url: '/analysis/ai-startups-funding-2023', title: 'AI Startup Funding 2023', lastUpdated: '2023-11-30', daysStale: 565, traffic: 9800 },
      ],
      highImpressionLowCTR: [
        { url: '/category/technology', title: 'Technology News', impressions: 892000, ctr: 1.7, avgPosition: 18.4 },
        { url: '/daily-brief/ai-roundup', title: 'Daily AI Roundup', impressions: 412000, ctr: 4.4, avgPosition: 8.9 },
        { url: '/category/startups', title: 'Startup News', impressions: 284000, ctr: 2.8, avgPosition: 14.2 },
      ],
      losingRankPages: [
        { url: '/daily-brief/ai-roundup', title: 'Daily AI Roundup', positionChange: +6.8, currentPosition: 14.2 },
        { url: '/category/technology', title: 'Technology News', positionChange: +8.4, currentPosition: 18.4 },
        { url: '/newsletter/signup', title: 'Newsletter Signup', positionChange: +2.4, currentPosition: 7.8 },
      ],
      missingComparisonPages: [
        { topic: 'The Brief Daily vs Morning Brew', competitor: 'Morning Brew', estimatedVolume: 2800 },
        { topic: 'Best tech newsletters 2025 comparison', competitor: 'Multiple', estimatedVolume: 6400 },
      ],
    },
  };
  return datasets[clientId] || datasets['client-1'];
}
