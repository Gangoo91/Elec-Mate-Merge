import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, Clock, Loader2, RotateCcw, PenLine, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import SignatureInput from '@/components/signature/SignatureInput';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import {
  useQsTeamContext,
  useQsReviewStatus,
  useSubmitForQsReview,
  useCancelQsReview,
  type QsReviewableType,
} from '@/hooks/useQsReview';
import { useApproveQsReview } from '@/hooks/useQsReviewQueue';
import { QsReviewComments } from '@/components/employer/sections/QsReviewComments';

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
  const haptic = useHaptic();
  const { data: ctx } = useQsTeamContext();
  const isTeamMember = !!ctx?.is_team_member;
  const { data: review } = useQsReviewStatus(reportId, isTeamMember);
  const submitMutation = useSubmitForQsReview();
  const cancelMutation = useCancelQsReview();
  const approveMutation = useApproveQsReview();
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [myName, setMyName] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Self sign-off (one-tap) — for a QS who may countersign their OWN certs
  // (declared owner-QS or designated principal QS). am_i_principal_qs comes from
  // get_my_qs_team_context.
  const canSelfSignoff = ctx?.am_i_principal_qs === true;
  const [showSignoff, setShowSignoff] = useState(false);
  const [signoffSig, setSignoffSig] = useState<string | null>(null);
  const [signoffName, setSignoffName] = useState('');

  // The signed-in user's name — used to attribute their replies on QS comments
  // (ELE-1185) and to prefill the self-signoff name.
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();
      if (data?.full_name) {
        setMyName(data.full_name);
        setSignoffName((prev) => prev || data.full_name);
      }
    })();
  }, []);

  if (!isTeamMember || !reportId) return null;

  // ELE-1341 — a saved cert has a typed report_id ("EIC-1783…"); before the
  // form persists, the id is a bare temp UUID used for photo uploads. Submit
  // would silently fail against it (no reports row). Detect that state so the
  // button can guide "save first" instead of dead-ending.
  const isTempReportId =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reportId);

  const handleSubmit = async () => {
    haptic.light();
    // Give onBeforeSubmit (save draft) a chance to persist first; if the id is
    // still a temp UUID afterwards, the cert genuinely isn't saved.
    try {
      await onBeforeSubmit?.();
      if (isTempReportId) {
        toast({
          title: 'Save your certificate first',
          description: 'Tap Save, then send it for QS review.',
        });
        return;
      }
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
    haptic.light();
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

  // One-tap: open the review and immediately countersign it as the QS.
  const handleSelfSignoff = async () => {
    if (!reportId) return;
    if (!signoffSig || !signoffName.trim()) {
      toast({
        title: 'Signature required',
        description: 'Add your signature and name to sign off this certificate.',
        variant: 'destructive',
      });
      return;
    }
    haptic.light();
    try {
      await onBeforeSubmit?.();
      const res = (await submitMutation.mutateAsync({ reportId })) as { review_id?: string };
      const reviewId = res?.review_id;
      if (!reviewId) throw new Error('Could not open the review.');
      await approveMutation.mutateAsync({
        reviewId,
        signature: signoffSig,
        reviewerName: signoffName.trim(),
      });
      setShowSignoff(false);
      toast({
        title: 'Signed off as QS',
        description:
          'You have countersigned this certificate. Your QS signature will appear on the PDF.',
      });
    } catch (error) {
      toast({
        title: 'Could not sign off',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const signoffBusy = submitMutation.isPending || approveMutation.isPending;
  const status = review?.status;

  return (
    <div className="space-y-3 py-4 border-t border-white/[0.08] sm:border sm:rounded-lg sm:p-4 sm:border-white/[0.08]">
      <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
        Qualifying Supervisor review
      </h3>

      {ctx?.qs_approval_required && status !== 'approved' && (
        <p className="text-xs text-amber-300">
          {ctx?.company_name || 'Your company'} requires QS approval before this certificate can be
          issued.
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
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => {
                haptic.light();
                setCommentsOpen(true);
              }}
              className="h-11 w-full sm:w-auto touch-manipulation"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              See comments
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending || isTempReportId}
              title={isTempReportId ? 'Save your certificate first' : undefined}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
            >
              {submitMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4 mr-2" />
              )}
              Resubmit for review
            </Button>
          </div>
        </div>
      )}

      {status === 'approved' && (
        <div className="space-y-3">
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
          <Button
            variant="outline"
            onClick={() => {
              haptic.light();
              setCommentsOpen(true);
            }}
            className="h-11 w-full sm:w-auto touch-manipulation"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            See comments
          </Button>
        </div>
      )}

      {(!status || status === 'cancelled') && (
        <div className="space-y-3">
          {canSelfSignoff ? (
            <>
              <p className="text-sm text-white/70">
                As {ctx?.company_name || 'your company'}&rsquo;s Qualifying Supervisor, review and
                countersign this certificate.
              </p>
              {!showSignoff ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      haptic.light();
                      setShowSignoff(true);
                    }}
                    className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    Review &amp; sign off as QS
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    className="h-11 w-full sm:w-auto touch-manipulation"
                  >
                    Send to another QS
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 rounded-lg border border-white/[0.08] p-3">
                  <p className="text-xs text-white/60">
                    Sign below to countersign this certificate as Qualifying Supervisor.
                  </p>
                  <Input
                    value={signoffName}
                    onChange={(e) => setSignoffName(e.target.value)}
                    placeholder="QS name (CAPITALS)"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                  <SignatureInput value={signoffSig || ''} onChange={setSignoffSig} />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSelfSignoff}
                      disabled={signoffBusy}
                      className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
                    >
                      {signoffBusy ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <ShieldCheck className="h-4 w-4 mr-2" />
                      )}
                      Sign off certificate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowSignoff(false)}
                      disabled={signoffBusy}
                      className="h-11 w-full sm:w-auto touch-manipulation"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-white/70">
                Send this certificate to {ctx?.company_name || 'your company'} for Qualifying
                Supervisor sign-off.
              </p>
              {isTempReportId && (
                <p className="text-xs text-amber-300">Save your certificate first to send it for review.</p>
              )}
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
            </>
          )}
        </div>
      )}

      {/* QS itemised comments — read the reviewer's targeted notes and reply (ELE-1185) */}
      {review?.id && (
        <Sheet open={commentsOpen} onOpenChange={setCommentsOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] p-0 rounded-t-2xl overflow-hidden flex flex-col bg-background"
          >
            <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.08] text-left">
              <SheetTitle className="text-base">Qualifying Supervisor feedback</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <QsReviewComments reviewId={review.id} authorName={myName || null} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default QsReviewPanel;
