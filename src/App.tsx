import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { WorkspacePage } from './pages/WorkspacePage';
import { ConfigurePage } from './pages/ConfigurePage';
import { AgentRunPage } from './pages/AgentRunPage';
import { ReportPage } from './pages/ReportPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { EmailDraftPage } from './pages/EmailDraftPage';
import { EvalDashboardPage } from './pages/EvalDashboardPage';
import { PRDSummaryPage } from './pages/PRDSummaryPage';
import { AppState, Screen, ReportConfig, Recommendation, EmailDraft } from './types';
import { AGENT_STEPS, generateReport, generateEmailDraft, generateRecommendations, calculateEvalMetrics } from './data/reportAgentService';

const initialState: AppState = {
  currentScreen: 'workspace',
  selectedClientId: null,
  reportConfig: {},
  agentSteps: AGENT_STEPS.map(s => ({ ...s })),
  agentRunning: false,
  agentComplete: false,
  generatedReport: null,
  recommendations: [],
  emailDraft: null,
  evalMetrics: null,
  reportApproved: false,
  exportSimulated: false,
};

function App() {
  const [state, setState] = useState<AppState>(initialState);

  const navigate = useCallback((screen: Screen) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  }, []);

  const handleReset = useCallback(() => {
    setState({ ...initialState, agentSteps: AGENT_STEPS.map(s => ({ ...s })) });
  }, []);

  const handleSelectClient = useCallback((clientId: string) => {
    setState(prev => ({
      ...prev,
      selectedClientId: clientId,
      currentScreen: 'configure',
      agentSteps: AGENT_STEPS.map(s => ({ ...s })),
      agentRunning: false,
      agentComplete: false,
      generatedReport: null,
      recommendations: [],
      emailDraft: null,
      evalMetrics: null,
      reportApproved: false,
      exportSimulated: false,
    }));
  }, []);

  const handleRunAgent = useCallback((config: Partial<ReportConfig>) => {
    setState(prev => ({
      ...prev,
      reportConfig: config,
      currentScreen: 'agent-run',
      agentSteps: AGENT_STEPS.map(s => ({ ...s })),
      agentRunning: true,
      agentComplete: false,
    }));
  }, []);

  useEffect(() => {
    if (!state.agentRunning || state.agentComplete) return;
    const steps = state.agentSteps;
    const currentIdx = steps.findIndex(s => s.status === 'waiting');
    if (currentIdx === -1) {
      const clientId = state.selectedClientId!;
      const report = generateReport(clientId);
      const recs = generateRecommendations(clientId);
      const email = generateEmailDraft(clientId, recs);
      const evalMetrics = calculateEvalMetrics();
      setState(prev => ({
        ...prev,
        agentRunning: false,
        agentComplete: true,
        agentSteps: prev.agentSteps.map(s => ({ ...s, status: 'completed' })),
        generatedReport: { ...report, recommendations: recs },
        recommendations: recs,
        emailDraft: email,
        evalMetrics,
      }));
      return;
    }
    setState(prev => ({
      ...prev,
      agentSteps: prev.agentSteps.map((s, i) => i === currentIdx ? { ...s, status: 'running' } : s),
    }));
    const duration = steps[currentIdx].duration || 1000;
    const timer = setTimeout(() => {
      setState(prev => ({
        ...prev,
        agentSteps: prev.agentSteps.map((s, i) => i === currentIdx ? { ...s, status: 'completed' } : s),
      }));
    }, duration);
    return () => clearTimeout(timer);
  }, [state.agentRunning, state.agentSteps, state.agentComplete, state.selectedClientId]);

  const handleUpdateRecommendation = useCallback((id: string, updates: Partial<Recommendation>) => {
    setState(prev => ({
      ...prev,
      recommendations: prev.recommendations.map(r => r.id === id ? { ...r, ...updates } : r),
    }));
  }, []);

  const handleUpdateEmail = useCallback((draft: EmailDraft) => {
    setState(prev => ({ ...prev, emailDraft: draft }));
  }, []);

  const handleApproveEmail = useCallback(() => {
    setState(prev => ({
      ...prev,
      reportApproved: true,
      emailDraft: prev.emailDraft ? { ...prev.emailDraft, approved: true } : null,
    }));
  }, []);

  const handleExport = useCallback(() => {
    setState(prev => ({ ...prev, exportSimulated: true }));
  }, []);

  const handleStartAgent = useCallback(() => {
    setState(prev => ({
      ...prev,
      agentRunning: true,
      agentSteps: AGENT_STEPS.map(s => ({ ...s })),
    }));
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentScreen={state.currentScreen}
        onNavigate={navigate}
        agentComplete={state.agentComplete}
        selectedClientId={state.selectedClientId}
        onReset={handleReset}
        reportApproved={state.reportApproved}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          currentScreen={state.currentScreen}
          selectedClientId={state.selectedClientId}
          agentComplete={state.agentComplete}
          reportApproved={state.reportApproved}
        />
        <main className="flex-1 overflow-y-auto">
          {state.currentScreen === 'workspace' && (
            <WorkspacePage onSelectClient={handleSelectClient} selectedClientId={state.selectedClientId} />
          )}
          {state.currentScreen === 'configure' && state.selectedClientId && (
            <ConfigurePage selectedClientId={state.selectedClientId} onRunAgent={handleRunAgent} initialConfig={state.reportConfig} />
          )}
          {state.currentScreen === 'agent-run' && (
            <AgentRunPage
              steps={state.agentSteps}
              agentRunning={state.agentRunning}
              agentComplete={state.agentComplete}
              onReviewReport={() => navigate('report')}
              onStartAgent={handleStartAgent}
              reportConfig={state.reportConfig}
              selectedClientId={state.selectedClientId}
            />
          )}
          {state.currentScreen === 'report' && state.generatedReport && state.selectedClientId && (
            <ReportPage
              report={state.generatedReport}
              clientId={state.selectedClientId}
              onGoToRecommendations={() => navigate('recommendations')}
              onExport={handleExport}
              exportSimulated={state.exportSimulated}
            />
          )}
          {state.currentScreen === 'recommendations' && (
            <RecommendationsPage
              recommendations={state.recommendations}
              onUpdateRecommendation={handleUpdateRecommendation}
              onGoToEmail={() => navigate('email-draft')}
            />
          )}
          {state.currentScreen === 'email-draft' && state.emailDraft && state.selectedClientId && (
            <EmailDraftPage
              emailDraft={state.emailDraft}
              recommendations={state.recommendations}
              clientId={state.selectedClientId}
              onUpdateEmail={handleUpdateEmail}
              onApprove={handleApproveEmail}
              reportApproved={state.reportApproved}
            />
          )}
          {state.currentScreen === 'eval' && state.evalMetrics && (
            <EvalDashboardPage metrics={state.evalMetrics} />
          )}
          {state.currentScreen === 'eval' && !state.evalMetrics && (
            <div className="p-8 max-w-2xl">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">No report data yet</h2>
                <p className="text-sm text-gray-500">Run the reporting agent first to see eval metrics.</p>
                <button onClick={() => navigate('workspace')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Start with a client
                </button>
              </div>
            </div>
          )}
          {state.currentScreen === 'prd' && <PRDSummaryPage />}
        </main>
      </div>
    </div>
  );
}

export default App;
