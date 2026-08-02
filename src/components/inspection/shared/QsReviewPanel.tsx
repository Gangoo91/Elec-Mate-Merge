import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
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
    <div className="-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4">
      <h2 className="text-[15px] font-semibold tracking-tight text-white">
        Qualifying Supervisor review
      </h2>

      {ctx?.qs_approval_required && status !== 'approved' && (
        <p className="text-[12px] text-amber-400">
          {ctx?.company_name || 'Your company'} requires QS approval before this certificate can be
          issued.
        </p>
      )}

      {status === 'pending' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <p className="text-sm text-amber-400">
              Awaiting review by {ctx?.company_name || 'your company'} — submitted{' '}
              {new Date(review!.submitted_at).toLocaleDateString('en-GB')}.
            </p>
          </div>
          <Button
            onClick={handleCancel}
            disabled={cancelMutation.isPending}
            className="h-12 w-full sm:w-auto rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
          >
            {cancelMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Withdraw from review
          </Button>
        </div>
      )}

      {status === 'returned' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3 space-y-1">
            <p className="text-sm font-medium text-orange-400">
              Returned by {review!.reviewer_name || 'the QS'}
              {review!.reviewed_at
                ? ` on ${new Date(review!.reviewed_at).toLocaleDateString('en-GB')}`
                : ''}
            </p>
            {review!.review_comments && (
              <p className="text-sm text-white/85 whitespace-pre-wrap">{review!.review_comments}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
                haptic.light();
                setCommentsOpen(true);
              }}
              className="h-12 w-full sm:w-auto rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
            >
              See comments
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending || isTempReportId}
              title={isTempReportId ? 'Save your certificate first' : undefined}
              className="h-12 w-full sm:w-auto flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation active:scale-[0.98]"
            >
              {submitMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin text-black" />
              )}
              Resubmit for review
            </Button>
          </div>
        </div>
      )}

      {status === 'approved' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <p className="text-sm text-green-400">
              Approved and countersigned by {review!.reviewer_name}
              {review!.reviewed_at
                ? ` on ${new Date(review!.reviewed_at).toLocaleDateString('en-GB')}`
                : ''}
              . The QS signature will appear on the generated PDF.
            </p>
          </div>
          <Button
            onClick={() => {
              haptic.light();
              setCommentsOpen(true);
            }}
            className="h-12 w-full sm:w-auto rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
          >
            See comments
          </Button>
        </div>
      )}

      {(!status || status === 'cancelled') && (
        <div className="space-y-3">
          {canSelfSignoff ? (
            <>
              <p className="text-sm text-white/85">
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
                    className="h-12 w-full sm:w-auto flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                  >
                    Review &amp; sign off as QS
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    className="h-12 w-full sm:w-auto rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
                  >
                    Send to another QS
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 border-t border-white/[0.1] pt-4">
                  <p className="text-[12px] text-white/85">
                    Sign below to countersign this certificate as Qualifying Supervisor.
                  </p>
                  <Input
                    value={signoffName}
                    onChange={(e) => setSignoffName(e.target.value)}
                    placeholder="QS name (CAPITALS)"
                    className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation"
                  />
                  <SignatureInput value={signoffSig || ''} onChange={setSignoffSig} />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSelfSignoff}
                      disabled={signoffBusy}
                      className="h-12 w-full sm:w-auto flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation active:scale-[0.98]"
                    >
                      {signoffBusy && <Loader2 className="h-4 w-4 mr-2 animate-spin text-black" />}
                      Sign off certificate
                    </Button>
                    <Button
                      onClick={() => setShowSignoff(false)}
                      disabled={signoffBusy}
                      className="h-12 w-full sm:w-auto rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-white/85">
                Send this certificate to {ctx?.company_name || 'your company'} for Qualifying
                Supervisor sign-off.
              </p>
              {isTempReportId && (
                <p className="text-[12px] text-amber-400">
                  Save your certificate first to send it for review.
                </p>
              )}
              {showNote && (
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note for the QS (optional)"
                  className="textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation"
                />
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="h-12 w-full sm:w-auto flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation active:scale-[0.98]"
                >
                  {submitMutation.isPending && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-black" />
                  )}
                  Submit for QS review
                </Button>
                {!showNote && (
                  <Button
                    onClick={() => setShowNote(true)}
                    className="h-12 w-full sm:w-auto rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
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
