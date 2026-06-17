import React, { useState } from 'react';
import { RefreshCw, TrendingUp, AlignLeft, Mail, CheckCircle2, Edit3, Send, Sparkles } from 'lucide-react';
import { EmailDraft, Recommendation } from '../types';
import { CLIENTS } from '../data/clients';
import { generateEmailDraft } from '../data/reportAgentService';

interface EmailDraftPageProps {
  emailDraft: EmailDraft;
  recommendations: Recommendation[];
  clientId: string;
  onUpdateEmail: (draft: EmailDraft) => void;
  onApprove: () => void;
  reportApproved: boolean;
}

export const EmailDraftPage: React.FC<EmailDraftPageProps> = ({
  emailDraft,
  recommendations,
  clientId,
  onUpdateEmail,
  onApprove,
  reportApproved,
}) => {
  const [editing, setEditing] = useState(false);
  const [draftBody, setDraftBody] = useState(emailDraft.body);
  const [draftSubject, setDraftSubject] = useState(emailDraft.subject);
  const [regenerating, setRegenerating] = useState(false);
  const client = CLIENTS.find(c => c.id === clientId);

  const acceptedRecs = recommendations.filter(r => r.addedToEmail || r.status === 'accepted');

  const handleRegenerate = (tone?: 'executive' | 'tactical') => {
    setRegenerating(true);
    setTimeout(() => {
      const newDraft = generateEmailDraft(clientId, recommendations);
      let body = newDraft.body;
      if (tone === 'executive') {
        body = body
          .replace(/\*\*Key Wins This Month\*\*/g, '**Performance Highlights**')
          .replace(/Here's a quick summary of what we're seeing:/g, 'Please find the key highlights from this month\'s performance review below.');
      } else if (tone === 'tactical') {
        body = body + '\n\n**Action Items for This Week**\n' +
          recommendations.slice(0, 3).map((r, i) => `${i + 1}. ${r.title} — Owner: ${r.suggestedOwner}`).join('\n');
      }
      setDraftBody(body);
      onUpdateEmail({ ...emailDraft, body });
      setRegenerating(false);
    }, 1200);
  };

  const handleAddAccepted = () => {
    const acceptedSection = acceptedRecs.length > 0
      ? '\n\n**Accepted Recommendations for This Sprint**\n' +
        acceptedRecs.map((r, i) => `${i + 1}. ${r.title}\n   Expected impact: ${r.expectedImpact}`).join('\n\n')
      : '';
    const updated = draftBody.includes('**Accepted Recommendations') ? draftBody : draftBody + acceptedSection;
    setDraftBody(updated);
    onUpdateEmail({ ...emailDraft, body: updated });
  };

  const handleSave = () => {
    onUpdateEmail({ ...emailDraft, body: draftBody, subject: draftSubject });
    setEditing(false);
  };

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Email Draft</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-generated draft · {client?.name} · Review, edit, and approve before sharing
          </p>
        </div>
        {reportApproved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Approved for sending</span>
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button
          onClick={() => handleRegenerate()}
          disabled={regenerating}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={12} className={regenerating ? 'animate-spin' : ''} />
          {regenerating ? 'Regenerating...' : 'Regenerate'}
        </button>
        <button
          onClick={() => handleRegenerate('executive')}
          disabled={regenerating}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <TrendingUp size={12} />
          Make more executive
        </button>
        <button
          onClick={() => handleRegenerate('tactical')}
          disabled={regenerating}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <AlignLeft size={12} />
          Make more tactical
        </button>
        <button
          onClick={handleAddAccepted}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
        >
          <Sparkles size={12} />
          Add accepted recommendations
        </button>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
        >
          <Edit3 size={12} />
          {editing ? 'Cancel edit' : 'Edit manually'}
        </button>
      </div>

      {/* Email Preview */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Email header */}
        <div className="bg-gray-50 border-b border-gray-100 px-5 py-3">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Email Draft</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 w-12">To:</span>
              <span className="text-gray-600">[Client stakeholder email]</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 w-12">From:</span>
              <span className="text-gray-600">[Your name] — Pepper Atlas</span>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="text-gray-400 w-12 flex-shrink-0">Subject:</span>
              {editing ? (
                <input
                  value={draftSubject}
                  onChange={(e) => setDraftSubject(e.target.value)}
                  className="flex-1 border border-blue-200 rounded px-2 py-0.5 text-xs focus:ring-1 focus:ring-blue-400 outline-none"
                />
              ) : (
                <span className="text-gray-800 font-medium">{draftSubject}</span>
              )}
            </div>
          </div>
        </div>

        {/* Email body */}
        <div className="p-5">
          {editing ? (
            <div>
              <textarea
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
                rows={28}
                className="w-full text-sm text-gray-700 border border-blue-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none font-mono leading-relaxed"
              />
              <button
                onClick={handleSave}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save changes
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">
              {draftBody.split('**').map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </div>
          )}
        </div>
      </div>

      {/* Approval Section */}
      {!reportApproved && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Send size={15} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Ready to approve?</h3>
              <p className="text-xs text-blue-600 mb-3">
                Review the email above. Once approved, it will be marked as ready for sending. No external message will actually be sent from this prototype.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={onApprove}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <CheckCircle2 size={14} />
                  Approve for Sending
                </button>
                <span className="text-xs text-blue-400">No email will actually be sent</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {reportApproved && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-emerald-600" />
          <div>
            <p className="text-sm font-semibold text-emerald-900">Email approved for sending</p>
            <p className="text-xs text-emerald-600 mt-0.5">
              This draft is marked as approved. In a live environment, it would be queued for sending via your email client.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
