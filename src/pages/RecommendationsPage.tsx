import React, { useState } from 'react';
import { Check, X, Edit3, Mail, ChevronDown, ChevronUp, Filter, ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { Recommendation } from '../types';
import { Badge } from '../components/Badge';
import { EvidenceTag } from '../components/EvidenceTag';

interface RecommendationsPageProps {
  recommendations: Recommendation[];
  onUpdateRecommendation: (id: string, updates: Partial<Recommendation>) => void;
  onGoToEmail: () => void;
}

const priorityOrder = { High: 0, Medium: 1, Low: 2 };
const effortOrder = { Low: 0, Medium: 1, High: 2 };

function getROIScore(rec: Recommendation) {
  return priorityOrder[rec.impact] * 2 + effortOrder[rec.effort];
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  recommendations,
  onUpdateRecommendation,
  onGoToEmail,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Quick Wins', ...Array.from(new Set(recommendations.map(r => r.category)))];
  const sorted = [...recommendations].sort((a, b) => getROIScore(a) - getROIScore(b));
  const filtered = filter === 'All'
    ? sorted
    : filter === 'Quick Wins'
    ? sorted.filter(r => r.effort === 'Low' && r.impact === 'High')
    : sorted.filter(r => r.category === filter);

  const acceptedCount = recommendations.filter(r => r.status === 'accepted').length;
  const addedToEmailCount = recommendations.filter(r => r.addedToEmail).length;
  const quickWins = recommendations.filter(r => r.effort === 'Low' && r.impact === 'High');

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recommendations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Evidence-backed, prioritized by impact x effort — review and accept before adding to email
          </p>
        </div>
        <button
          onClick={onGoToEmail}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex-shrink-0"
        >
          <Mail size={14} />
          View Email Draft
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-white border border-gray-100 rounded-xl p-3 text-center col-span-1">
          <div className="text-2xl font-black text-gray-900">{recommendations.length}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center col-span-1">
          <div className="text-2xl font-black text-emerald-700">{acceptedCount}</div>
          <div className="text-xs text-emerald-600 mt-0.5">Accepted</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center col-span-1">
          <div className="text-2xl font-black text-blue-700">{addedToEmailCount}</div>
          <div className="text-xs text-blue-600 mt-0.5">In email</div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center col-span-1">
          <div className="text-2xl font-black text-amber-700">{quickWins.length}</div>
          <div className="text-xs text-amber-600 mt-0.5">Quick wins</div>
        </div>
      </div>

      {/* Quick Wins Banner */}
      {quickWins.filter(r => r.status === 'pending').length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">
              {quickWins.filter(r => r.status === 'pending').length} quick win{quickWins.filter(r => r.status === 'pending').length > 1 ? 's' : ''} available
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              High-impact, low-effort opportunities you can action this week without a full sprint
            </p>
          </div>
          <button
            onClick={() => setFilter('Quick Wins')}
            className="text-xs font-semibold text-amber-700 underline flex-shrink-0"
          >
            View only
          </button>
        </div>
      )}

      {/* Batch accept bar */}
      {acceptedCount === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5 flex items-center justify-between">
          <p className="text-xs text-gray-500">Accept recommendations to add them to the email draft and action backlog</p>
          <button
            onClick={() => {
              recommendations.slice(0, 3).forEach(r => onUpdateRecommendation(r.id, { status: 'accepted' }));
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Accept top 3 <ArrowRight size={11} />
          </button>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        <Filter size={13} className="text-gray-400 flex-shrink-0" />
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-2.5">
        {filtered.map((rec, idx) => {
          const isExpanded = expandedId === rec.id;
          const isQuickWin = rec.effort === 'Low' && rec.impact === 'High';
          const priority = idx + 1;

          const borderColor = rec.status === 'accepted'
            ? 'border-emerald-200 bg-emerald-50/20'
            : rec.status === 'rejected'
            ? 'border-gray-100 bg-gray-50/50 opacity-50'
            : rec.status === 'editing'
            ? 'border-amber-200 bg-amber-50/20'
            : isQuickWin
            ? 'border-amber-200 bg-amber-50/10'
            : 'border-gray-100 bg-white';

          return (
            <div
              key={rec.id}
              className={`rounded-2xl border-2 transition-all duration-200 ${borderColor}`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 ${
                    rec.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                    rec.status === 'rejected' ? 'bg-gray-100 text-gray-400' :
                    isQuickWin ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {rec.status === 'accepted' ? <Check size={13} /> :
                     rec.status === 'rejected' ? <X size={13} /> :
                     priority}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          {isQuickWin && rec.status === 'pending' && (
                            <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                              <Zap size={9} />Quick win
                            </span>
                          )}
                          {rec.status === 'accepted' && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded-md">
                              Accepted
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{rec.title}</h3>
                      </div>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                        className="text-gray-300 hover:text-gray-500 flex-shrink-0"
                      >
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{rec.whyItMatters}</p>

                    <div className="flex items-center gap-1.5 mt-2 p-2 bg-gray-50 rounded-lg">
                      <TrendingUp size={11} className="text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-600 font-medium">{rec.expectedImpact}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <Badge label={rec.category} size="sm" />
                      <Badge label={`Impact: ${rec.impact}`} variant="impact" value={rec.impact} />
                      <Badge label={`Effort: ${rec.effort}`} variant="effort" value={rec.effort} />
                      <Badge label={`${rec.confidence} confidence`} variant="confidence" value={rec.confidence} />
                      {rec.addedToEmail && (
                        <span className="text-xs bg-blue-50 text-blue-600 font-medium px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                          <Mail size={9} />In email
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 ml-10 space-y-3 border-t border-gray-100 pt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Evidence</p>
                        <div className="bg-gray-50 rounded-lg p-2.5 text-xs text-gray-700">{rec.evidence}</div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Suggested owner</p>
                        <div className="bg-gray-50 rounded-lg p-2.5 text-xs text-gray-700">{rec.suggestedOwner}</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Data sources</p>
                      <EvidenceTag source={rec.sourceData.join(' + ')} confidence={rec.confidence} impact={rec.impact} />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3 ml-10 flex-wrap">
                  {rec.status !== 'accepted' && (
                    <button
                      onClick={() => onUpdateRecommendation(rec.id, { status: 'accepted' })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      <Check size={11} />Accept
                    </button>
                  )}
                  {rec.status === 'accepted' && (
                    <button
                      onClick={() => onUpdateRecommendation(rec.id, { status: 'pending' })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-500 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                    >
                      Undo accept
                    </button>
                  )}
                  {rec.status !== 'rejected' && (
                    <button
                      onClick={() => onUpdateRecommendation(rec.id, { status: 'rejected' })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-500 border border-red-100 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
                    >
                      <X size={11} />Reject
                    </button>
                  )}
                  <button
                    onClick={() => onUpdateRecommendation(rec.id, {
                      addedToEmail: !rec.addedToEmail,
                      status: rec.status === 'pending' ? 'accepted' : rec.status,
                    })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      rec.addedToEmail
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Mail size={11} />
                    {rec.addedToEmail ? 'In email' : 'Add to email'}
                  </button>
                  <button
                    onClick={() => onUpdateRecommendation(rec.id, { status: 'editing' })}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-500 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 size={11} />Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {acceptedCount > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-900">{acceptedCount} recommendation{acceptedCount > 1 ? 's' : ''} accepted</p>
            <p className="text-xs text-blue-500 mt-0.5">Add them to the email draft to surface them to your client</p>
          </div>
          <button
            onClick={onGoToEmail}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Mail size={13} />
            Open Email Draft
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
