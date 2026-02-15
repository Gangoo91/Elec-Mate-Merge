/**
 * SharedEvidenceTab
 *
 * Extracted from SharedPortfolioView — preserves ALL existing evidence viewing,
 * per-item commenting, and assessor review functionality.
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  FileText,
  Clock,
  MessageSquare,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  Download,
  Image as ImageIcon,
  File,
  Wrench,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ClipboardCheck,
  Star,
  Target,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  SharedPortfolioStructuredData,
  SharedComment,
  SharedSubmission,
  SharedEvidenceEntry,
} from '@/hooks/portfolio/useSharedPortfolioStructured';

// ─── Types ─────────────────────────────────────────────────────

interface ReviewForm {
  feedback: string;
  grade: string;
  actionRequired: string;
  strengths: string;
  areasForImprovement: string;
}

interface SharedEvidenceTabProps {
  data: SharedPortfolioStructuredData;
  token: string;
  reviewerName: string;
  reviewerRole: string;
  anonClient: SupabaseClient;
  onCommentsReloaded: () => void;
  onSubmissionsReloaded: () => void;
}

// ─── Component ─────────────────────────────────────────────────

export default function SharedEvidenceTab({
  data,
  token,
  reviewerName,
  reviewerRole,
  anonClient,
  onCommentsReloaded,
  onSubmissionsReloaded,
}: SharedEvidenceTabProps) {
  const { entries, comments, submissions } = data;

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [commentForms, setCommentForms] = useState<Record<string, string>>({});
  const [sendingComment, setSendingComment] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);

  // Review panel state
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
  const [reviewForms, setReviewForms] = useState<Record<string, ReviewForm>>({});
  const [reviewSubmitting, setReviewSubmitting] = useState<string | null>(null);
  const [reviewedSubmissions, setReviewedSubmissions] = useState<Set<string>>(new Set());
  const [lastReviewResult, setLastReviewResult] = useState<{
    action: string;
    categoryName: string;
  } | null>(null);

  // ─── Evidence Item Helpers ─────────────────────────────────

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getCommentsForItem = (evidenceId: string): SharedComment[] => {
    return comments.filter((c) => c.context_id === evidenceId);
  };

  const handleSendComment = async (evidenceId: string) => {
    const content = commentForms[evidenceId]?.trim();
    if (!content || !reviewerName.trim() || !token) return;

    setSendingComment(evidenceId);
    try {
      const { data: rpcData, error } = await anonClient.rpc('add_share_comment', {
        p_share_token: token,
        p_author_name: reviewerName.trim(),
        p_author_role: reviewerRole,
        p_content: content,
        p_evidence_id: evidenceId,
      });

      if (error) throw error;
      if (rpcData?.error) throw new Error(rpcData.error);

      setCommentForms((prev) => ({ ...prev, [evidenceId]: '' }));
      setCommentSuccess(evidenceId);
      setTimeout(() => setCommentSuccess(null), 3000);

      onCommentsReloaded();
    } catch (err) {
      console.error('Failed to send comment:', err);
    } finally {
      setSendingComment(null);
    }
  };

  // ─── Review Panel Helpers ──────────────────────────────────

  const getReviewForm = (submissionId: string): ReviewForm => {
    return (
      reviewForms[submissionId] || {
        feedback: '',
        grade: '',
        actionRequired: '',
        strengths: '',
        areasForImprovement: '',
      }
    );
  };

  const updateReviewForm = (submissionId: string, field: keyof ReviewForm, value: string) => {
    setReviewForms((prev) => ({
      ...prev,
      [submissionId]: { ...getReviewForm(submissionId), [field]: value },
    }));
  };

  const handleReviewSubmit = async (
    submissionId: string,
    action: 'approve' | 'send_back' | 'request_more_evidence'
  ) => {
    if (!reviewerName.trim() || !token) return;

    const form = getReviewForm(submissionId);
    const sub = submissions.find((s) => s.id === submissionId);

    setReviewSubmitting(submissionId);
    try {
      const { data: rpcData, error } = await anonClient.rpc('review_shared_submission', {
        p_share_token: token,
        p_submission_id: submissionId,
        p_reviewer_name: reviewerName.trim(),
        p_reviewer_role: reviewerRole,
        p_action: action,
        p_feedback: form.feedback.trim() || null,
        p_grade: form.grade || null,
        p_action_required: form.actionRequired.trim() || null,
        p_strengths: form.strengths.trim() || null,
        p_areas_for_improvement: form.areasForImprovement.trim() || null,
      });

      if (error) throw error;
      if (rpcData?.error) throw new Error(rpcData.error);

      setReviewedSubmissions((prev) => new Set(prev).add(submissionId));
      setLastReviewResult({
        action,
        categoryName: sub?.category_name || 'Unknown',
      });
      setExpandedSubmission(null);

      onSubmissionsReloaded();
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setReviewSubmitting(null);
    }
  };

  const pendingSubmissions = submissions.filter((s) =>
    ['submitted', 'resubmitted', 'under_review'].includes(s.status)
  );

  const reviewedOrCompleteSubmissions = submissions.filter((s) =>
    ['approved', 'feedback_given', 'signed_off', 'iqa_sampled', 'iqa_verified'].includes(s.status)
  );

  // ─── Formatting Helpers ────────────────────────────────────

  const getFileIcon = (fileType: string) => {
    if (fileType?.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      submitted: 'Awaiting Review',
      resubmitted: 'Resubmitted',
      under_review: 'Under Review',
      feedback_given: 'Feedback Given',
      approved: 'Approved',
      signed_off: 'Signed Off',
      iqa_sampled: 'IQA Sampled',
      iqa_verified: 'IQA Verified',
    };
    return labels[status] || status;
  };

  const getStatusColour = (status: string) => {
    if (['approved', 'signed_off', 'iqa_sampled', 'iqa_verified'].includes(status))
      return 'text-green-400 bg-green-500/10 border-green-500/20';
    if (status === 'feedback_given') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
  };

  // ─── Render ────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4"
    >
      {/* ─── Evidence Items ─────────────────────────────── */}
      {entries.length === 0 ? (
        <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10">
          <FileText className="h-12 w-12 text-white mx-auto mb-4 opacity-30" />
          <p className="text-white font-medium">No evidence items to display</p>
          <p className="text-sm text-white mt-1">
            The portfolio owner hasn't added any completed evidence yet.
          </p>
        </div>
      ) : (
        entries.map((entry, index) => {
          const isExpanded = expandedItems.has(entry.id);
          const itemComments = getCommentsForItem(entry.id);
          const commentContent = commentForms[entry.id] || '';

          return (
            <div
              key={entry.id}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Item header */}
              <button
                onClick={() => toggleItem(entry.id)}
                className="w-full flex items-center gap-3 p-4 text-left touch-manipulation"
              >
                <span className="text-sm text-yellow-400 font-mono shrink-0">#{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{entry.title}</p>
                  <p className="text-xs text-white mt-0.5">
                    {entry.category} &middot; {formatDate(entry.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {itemComments.length > 0 && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                      <MessageSquare className="h-3 w-3" />
                      {itemComments.length}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-white" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white" />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 p-4 space-y-4">
                      {entry.description && (
                        <p className="text-sm text-white">{entry.description}</p>
                      )}

                      {entry.skills_demonstrated && entry.skills_demonstrated.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.skills_demonstrated.map((skill, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            >
                              <Wrench className="h-3 w-3 inline mr-1" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {entry.reflection_notes && (
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <p className="text-xs text-blue-400 font-medium mb-1">Reflection</p>
                          <p className="text-sm text-white">{entry.reflection_notes}</p>
                        </div>
                      )}

                      {entry.supervisor_feedback && (
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <p className="text-xs text-green-400 font-medium mb-1">Supervisor Feedback</p>
                          <p className="text-sm text-white">{entry.supervisor_feedback}</p>
                        </div>
                      )}

                      {/* Existing comments */}
                      {itemComments.length > 0 && (
                        <div className="space-y-3 pt-2 border-t border-white/10">
                          <p className="text-xs text-white font-medium">
                            Feedback ({itemComments.length})
                          </p>
                          {itemComments.map((comment) => (
                            <div
                              key={comment.id}
                              className={cn(
                                'p-3 rounded-lg border',
                                comment.parent_id
                                  ? 'ml-6 bg-white/3 border-white/5'
                                  : 'bg-white/5 border-white/10'
                              )}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-yellow-400/20 flex items-center justify-center text-[10px] font-bold text-yellow-400">
                                    {comment.author_initials}
                                  </div>
                                  <span className="text-sm font-medium text-white">
                                    {comment.author_name}
                                  </span>
                                  <span className="text-[10px] text-white capitalize px-1.5 py-0.5 rounded bg-white/5">
                                    {comment.author_role}
                                  </span>
                                </div>
                                <span className="text-[10px] text-white">
                                  {formatTimeAgo(comment.created_at)}
                                </span>
                              </div>
                              <p className="text-sm text-white">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment form */}
                      <div className="pt-2 border-t border-white/10 space-y-3">
                        <p className="text-xs text-white font-medium flex items-center gap-1.5">
                          <MessageSquare className="h-3.5 w-3.5 text-yellow-400" />
                          Leave Feedback on This Item
                        </p>

                        {!reviewerName.trim() && (
                          <p className="text-xs text-amber-400">
                            Enter your name above to leave feedback
                          </p>
                        )}

                        <textarea
                          placeholder="Write your feedback on this evidence item..."
                          value={commentContent}
                          onChange={(e) =>
                            setCommentForms((prev) => ({
                              ...prev,
                              [entry.id]: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-yellow-400/50 resize-none touch-manipulation"
                        />

                        <button
                          onClick={() => handleSendComment(entry.id)}
                          disabled={
                            !reviewerName.trim() ||
                            !commentContent.trim() ||
                            sendingComment === entry.id
                          }
                          className={cn(
                            'w-full h-11 rounded-lg font-medium text-sm flex items-center justify-center gap-2 touch-manipulation transition-colors',
                            reviewerName.trim() && commentContent.trim()
                              ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                              : 'bg-white/10 text-white cursor-not-allowed opacity-40'
                          )}
                        >
                          {sendingComment === entry.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : commentSuccess === entry.id ? (
                            <span className="text-green-800">Feedback sent!</span>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Feedback
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}

      {/* ─── Assessor Review Panel ──────────────────────── */}
      {submissions.length > 0 && (
        <div className="space-y-4">
          {/* Section heading */}
          <div className="flex items-center gap-2 pt-4">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-sm text-yellow-400 font-semibold flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Assessor Review
            </p>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Review success toast */}
          <AnimatePresence>
            {lastReviewResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-400">Review Submitted</p>
                    <p className="text-sm text-white">
                      {lastReviewResult.categoryName} —{' '}
                      {lastReviewResult.action === 'approve'
                        ? 'Approved'
                        : lastReviewResult.action === 'send_back'
                          ? 'Sent back with feedback'
                          : 'More evidence requested'}
                      . The apprentice has been notified.
                    </p>
                  </div>
                  <button
                    onClick={() => setLastReviewResult(null)}
                    className="text-white shrink-0 touch-manipulation p-1"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pending Submissions */}
          {pendingSubmissions.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-white font-medium">
                Awaiting Your Review ({pendingSubmissions.length})
              </p>

              {pendingSubmissions.map((sub) => {
                const isExpanded = expandedSubmission === sub.id;
                const isReviewed = reviewedSubmissions.has(sub.id);
                const form = getReviewForm(sub.id);
                const isSubmitting = reviewSubmitting === sub.id;

                if (isReviewed) return null;

                return (
                  <div
                    key={sub.id}
                    className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedSubmission(isExpanded ? null : sub.id)}
                      className="w-full flex items-center gap-3 p-4 text-left touch-manipulation"
                    >
                      <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{sub.category_name}</p>
                        <p className="text-xs text-white">
                          {sub.submission_count > 1
                            ? `Attempt #${sub.submission_count}`
                            : 'First submission'}{' '}
                          &middot; {formatDate(sub.submitted_at)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'text-xs px-2 py-1 rounded-full border shrink-0',
                          getStatusColour(sub.status)
                        )}
                      >
                        {getStatusLabel(sub.status)}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-white shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-white shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/10 p-4 space-y-4">
                            {!reviewerName.trim() && (
                              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                <p className="text-sm text-amber-400 flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 shrink-0" />
                                  Enter your name at the top of the page before submitting a review.
                                </p>
                              </div>
                            )}

                            {/* Feedback */}
                            <div>
                              <label className="text-xs text-white font-medium mb-1.5 flex items-center gap-1.5">
                                <MessageSquare className="h-3.5 w-3.5 text-yellow-400" />
                                Overall Feedback
                              </label>
                              <textarea
                                placeholder="Provide your assessment feedback..."
                                value={form.feedback}
                                onChange={(e) => updateReviewForm(sub.id, 'feedback', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-yellow-400/50 resize-none touch-manipulation"
                              />
                            </div>

                            {/* Grade */}
                            <div>
                              <label className="text-xs text-white font-medium mb-1.5 flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5 text-yellow-400" />
                                Grade
                              </label>
                              <select
                                value={form.grade}
                                onChange={(e) => updateReviewForm(sub.id, 'grade', e.target.value)}
                                className="w-full h-11 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-400/50 touch-manipulation"
                              >
                                <option value="">Select grade...</option>
                                <option value="distinction">Distinction</option>
                                <option value="merit">Merit</option>
                                <option value="pass">Pass</option>
                                <option value="refer">Refer</option>
                                <option value="not_yet_competent">Not Yet Competent</option>
                              </select>
                            </div>

                            {/* Strengths */}
                            <div>
                              <label className="text-xs text-white font-medium mb-1.5 flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                                Strengths Noted
                              </label>
                              <textarea
                                placeholder="What did the apprentice do well?"
                                value={form.strengths}
                                onChange={(e) => updateReviewForm(sub.id, 'strengths', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-yellow-400/50 resize-none touch-manipulation"
                              />
                            </div>

                            {/* Areas for improvement */}
                            <div>
                              <label className="text-xs text-white font-medium mb-1.5 flex items-center gap-1.5">
                                <Target className="h-3.5 w-3.5 text-amber-400" />
                                Areas for Improvement
                              </label>
                              <textarea
                                placeholder="What should the apprentice work on?"
                                value={form.areasForImprovement}
                                onChange={(e) => updateReviewForm(sub.id, 'areasForImprovement', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-yellow-400/50 resize-none touch-manipulation"
                              />
                            </div>

                            {/* Action required */}
                            <div>
                              <label className="text-xs text-white font-medium mb-1.5 flex items-center gap-1.5">
                                <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                                Action Required (if sending back)
                              </label>
                              <textarea
                                placeholder="What specific actions must the apprentice take?"
                                value={form.actionRequired}
                                onChange={(e) => updateReviewForm(sub.id, 'actionRequired', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-yellow-400/50 resize-none touch-manipulation"
                              />
                            </div>

                            {/* Action buttons */}
                            <div className="space-y-2 pt-2">
                              <button
                                onClick={() => handleReviewSubmit(sub.id, 'approve')}
                                disabled={!reviewerName.trim() || isSubmitting}
                                className={cn(
                                  'w-full h-12 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation transition-colors',
                                  reviewerName.trim() && !isSubmitting
                                    ? 'bg-green-500 text-white hover:bg-green-400'
                                    : 'bg-white/10 text-white cursor-not-allowed opacity-40'
                                )}
                              >
                                {isSubmitting ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-5 w-5" />
                                    Approve
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleReviewSubmit(sub.id, 'send_back')}
                                disabled={!reviewerName.trim() || !form.feedback.trim() || isSubmitting}
                                className={cn(
                                  'w-full h-12 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation transition-colors',
                                  reviewerName.trim() && form.feedback.trim() && !isSubmitting
                                    ? 'bg-amber-500 text-black hover:bg-amber-400'
                                    : 'bg-white/10 text-white cursor-not-allowed opacity-40'
                                )}
                              >
                                {isSubmitting ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <ArrowLeft className="h-5 w-5" />
                                    Send Back with Feedback
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleReviewSubmit(sub.id, 'request_more_evidence')}
                                disabled={!reviewerName.trim() || isSubmitting}
                                className={cn(
                                  'w-full h-12 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation transition-colors border',
                                  reviewerName.trim() && !isSubmitting
                                    ? 'border-white/20 text-white hover:bg-white/5'
                                    : 'border-white/5 text-white cursor-not-allowed opacity-40'
                                )}
                              >
                                {isSubmitting ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <AlertCircle className="h-5 w-5" />
                                    Request More Evidence
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {/* Already Reviewed Submissions */}
          {reviewedOrCompleteSubmissions.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-white font-medium">
                Previously Reviewed ({reviewedOrCompleteSubmissions.length})
              </p>
              {reviewedOrCompleteSubmissions.map((sub) => (
                <div key={sub.id} className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{sub.category_name}</p>
                      <p className="text-xs text-white">
                        {getStatusLabel(sub.status)}
                        {sub.grade && <span className="capitalize"> &middot; {sub.grade}</span>}
                        {sub.reviewed_at && (
                          <span> &middot; Reviewed {formatDate(sub.reviewed_at)}</span>
                        )}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'text-xs px-2 py-1 rounded-full border shrink-0',
                        getStatusColour(sub.status)
                      )}
                    >
                      {getStatusLabel(sub.status)}
                    </span>
                  </div>
                  {sub.assessor_feedback && (
                    <p className="text-sm text-white mt-2 pl-11">{sub.assessor_feedback}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {submissions.length === 0 && (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center">
              <ClipboardCheck className="h-10 w-10 text-white mx-auto mb-3 opacity-30" />
              <p className="text-white font-medium">No Submissions Yet</p>
              <p className="text-sm text-white mt-1">
                The apprentice hasn't submitted any categories for review yet. You can still leave
                feedback on individual evidence items above.
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
