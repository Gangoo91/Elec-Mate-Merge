import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, Clock, Loader2, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  useQsTeamContext,
  useQsReviewStatus,
  useSubmitForQsReview,
  useCancelQsReview,
  type QsReviewableType,
} from '@/hooks/useQsReview';

interface QsReviewPanelProps {
  reportId: string | undefined;
  reportType: QsReviewableType;
  /** Flush unsaved form state to the cloud before submitting (e.g. save draft). */
  onBeforeSubmit?: () => void | Promise<void>;
}

/**
 * Qualifying Supervisor review panel shown on EICR / EIC / Minor Works forms.
 * Renders nothing unless the signed-in electrician is on a company team.
 */
const QsReviewPanel: React.FC<QsReviewPanelProps> = ({ reportId, reportType, onBeforeSubmit }) => {
  const { toast } = useToast();
  const { data: ctx } = useQsTeamContext();
  const isTeamMember = !!ctx?.is_team_member;
  const { data: review } = useQsReviewStatus(reportId, isTeamMember);
  const submitMutation = useSubmitForQsReview();
  const cancelMutation = useCancelQsReview();
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);

  if (!isTeamMember || !reportId) return null;

  const handleSubmit = async () => {
    try {
      await onBeforeSubmit?.();
      await submitMutation.mutateAsync({ reportId, note: note.trim() || undefined });
      setNote('');
      setShowNote(false);
      toast({
        title: 'Sent for QS review',
        description: `Your ${reportType.toUpperCase().replace('-', ' ')} is with ${
          ctx?.company_name || 'your company'
        } for review.`,
      });
    } catch (error) {
      toast({
        title: 'Could not submit',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = async () => {
    if (!review) return;
    try {
      await cancelMutation.mutateAsync({ reviewId: review.id, reportId });
      toast({ title: 'Review cancelled' });
    } catch (error) {
      toast({
        title: 'Could not cancel',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const status = review?.status;

  return (
    <div className="space-y-3 py-4 border-t border-white/[0.08] sm:border sm:rounded-lg sm:p-4 sm:border-white/[0.08]">
      <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
        Qualifying Supervisor review
      </h3>

      {ctx?.qs_approval_required && status !== 'approved' && (
        <p className="text-xs text-amber-300">
          {ctx?.company_name || 'Your company'} requires QS approval before this certificate can
          be issued.
        </p>
      )}

      {status === 'pending' && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5">
            <Clock className="h-4 w-4 mt-0.5 shrink-0 text-amber-300" />
            <div className="text-sm text-amber-200">
              Awaiting review by {ctx?.company_name || 'your company'} — submitted{' '}
              {new Date(review!.submitted_at).toLocaleDateString('en-GB')}.
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={cancelMutation.isPending}
            className="h-11 w-full sm:w-auto touch-manipulation"
          >
            {cancelMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4 mr-2" />
            )}
            Withdraw from review
          </Button>
        </div>
      )}

      {status === 'returned' && (
        <div className="space-y-3">
          <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 space-y-1">
            <p className="text-sm font-medium text-orange-300">
              Returned by {review!.reviewer_name || 'the QS'}
              {review!.reviewed_at
                ? ` on ${new Date(review!.reviewed_at).toLocaleDateString('en-GB')}`
                : ''}
            </p>
            {review!.review_comments && (
              <p className="text-sm text-orange-200 whitespace-pre-wrap">
                {review!.review_comments}
              </p>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="h-11 w-full sm:w-auto touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
          >
            {submitMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ShieldCheck className="h-4 w-4 mr-2" />
            )}
            Resubmit for review
          </Button>
        </div>
      )}

      {status === 'approved' && (
        <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2.5">
          <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-green-400" />
          <div className="text-sm text-green-300">
            Approved and countersigned by {review!.reviewer_name}
            {review!.reviewed_at
              ? ` on ${new Date(review!.reviewed_at).toLocaleDateString('en-GB')}`
              : ''}
            . The QS signature will appear on the generated PDF.
          </div>
        </div>
      )}

      {(!status || status === 'cancelled') && (
        <div className="space-y-3">
          <p className="text-sm text-white/70">
            Send this certificate to {ctx?.company_name || 'your company'} for Qualifying
            Supervisor sign-off.
          </p>
          {showNote && (
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note for the QS (optional)"
              className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
            />
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
            >
              {submitMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4 mr-2" />
              )}
              Submit for QS review
            </Button>
            {!showNote && (
              <Button
                variant="outline"
                onClick={() => setShowNote(true)}
                className="h-11 w-full sm:w-auto touch-manipulation"
              >
                Add a note
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QsReviewPanel;
