import { openPrintRegister } from '@/utils/printRegister';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, ShieldCheck, Undo2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SignatureInput from '@/components/signature/SignatureInput';
import QsCertReviewBody from '@/components/employer/sections/QsCertReviewBody';
import { QsReviewComments } from '@/components/employer/sections/QsReviewComments';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import {
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  SectionHeader,
  LoadingState,
} from '@/components/employer/editorial';
import {
  useQsReviewQueue,
  useQsReviewReport,
  useApproveQsReview,
  useReturnQsReview,
  type QsQueueItem,
} from '@/hooks/useQsReviewQueue';

const TYPE_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

const STATUS_TONE: Record<string, 'amber' | 'emerald' | 'red' | 'blue'> = {
  pending: 'amber',
  approved: 'emerald',
  returned: 'red',
  cancelled: 'blue',
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—';

export function QSReviewsSection() {
  const navigate = useNavigate();
  const [scope, setScope] = useState<'pending' | 'all'>('pending');
  const { data: items = [], isLoading } = useQsReviewQueue(scope);
  const [openItem, setOpenItem] = useState<QsQueueItem | null>(null);

  const pendingCount = useMemo(() => items.filter((i) => i.status === 'pending').length, [items]);

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Compliance"
        title="QS Reviews"
        meta={pendingCount > 0 ? `${pendingCount} awaiting sign-off` : 'Nothing waiting'}
      />

      {scope === 'all' && items.length > 0 && (
        <button
          type="button"
          onClick={async () => {
            const ok = await openPrintRegister({
              title: 'QS Review Register',
              subtitle: 'Qualifying Supervisor certificate sign-off record',
              columns: [
                'Certificate',
                'Type',
                'Client',
                'Electrician',
                'Submitted',
                'Status',
                'Reviewed by',
                'Reviewed',
              ],
              rows: items.map((it) => [
                it.report_id,
                it.report_type.toUpperCase(),
                it.client_name,
                it.electrician_name,
                it.submitted_at ? new Date(it.submitted_at).toLocaleDateString('en-GB') : null,
                it.status,
                it.reviewer_name,
                it.reviewed_at ? new Date(it.reviewed_at).toLocaleDateString('en-GB') : null,
              ]),
            });
            if (!ok) toast({ title: 'Pop-up blocked', variant: 'destructive' });
          }}
          className="h-10 px-4 rounded-lg text-[12.5px] font-semibold bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98]"
        >
          Export register — assessment-ready
        </button>
      )}

      {/* Scope toggle */}
      <div className="grid grid-cols-2 gap-2">
        {(['pending', 'all'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className={
              'h-11 rounded-lg text-sm font-semibold transition-all touch-manipulation active:scale-[0.98] border ' +
              (scope === s
                ? 'bg-elec-yellow/20 border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border-white/[0.08] text-white')
            }
          >
            {s === 'pending' ? 'Awaiting review' : 'All reviews'}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-10 text-center space-y-3">
          <ShieldCheck className="h-6 w-6 mx-auto text-white/30" />
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-white">
              {scope === 'pending' ? 'No certificates awaiting review' : 'No reviews yet'}
            </p>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              When a team member submits an EICR, EIC or Minor Works certificate for Qualifying
              Supervisor sign-off, it will appear here. To get started, add your team in the Team
              section and assign someone the QS role — team members link automatically when they
              sign in with the email on their roster entry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/employer?section=team')}
            className="h-11 px-5 rounded-lg text-sm font-semibold bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow touch-manipulation active:scale-[0.98]"
          >
            Set up your team
          </button>
        </div>
      ) : (
        <ListCard>
          <ListCardHeader
            title={scope === 'pending' ? 'Awaiting sign-off' : 'All reviews'}
            tone="amber"
          />
          <ListBody>
            {items.map((item) => (
              <ListRow
                key={item.review_id}
                accent={STATUS_TONE[item.status]}
                title={
                  <span>
                    {TYPE_LABEL[item.report_type] || item.report_type.toUpperCase()}
                    {item.client_name ? ` — ${item.client_name}` : ''}
                  </span>
                }
                subtitle={
                  <span>
                    {item.electrician_name} · {item.installation_address || 'No address'} ·
                    submitted {formatDate(item.submitted_at)}
                  </span>
                }
                trailing={
                  <Pill tone={STATUS_TONE[item.status]}>
                    {item.status === 'pending' ? 'Awaiting' : item.status}
                  </Pill>
                }
                onClick={() => setOpenItem(item)}
              />
            ))}
          </ListBody>
        </ListCard>
      )}

      <QsReviewDetailSheet item={openItem} onClose={() => setOpenItem(null)} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Detail sheet — read-only cert summary + countersign
   ──────────────────────────────────────────────────────── */

function DetailField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">{label}</p>
      <p className="text-sm text-white truncate">{value || '—'}</p>
    </div>
  );
}

function QsReviewDetailSheet({ item, onClose }: { item: QsQueueItem | null; onClose: () => void }) {
  const { toast } = useToast();
  const { data: detail, isLoading, isError } = useQsReviewReport(item?.review_id ?? null);
  const approveMutation = useApproveQsReview();
  const returnMutation = useReturnQsReview();

  const [reviewerName, setReviewerName] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [mode, setMode] = useState<'view' | 'approve' | 'return'>('view');
  const [pdfOpen, setPdfOpen] = useState(false);

  // Pre-fill the reviewer's name from their profile — typing it every
  // approval is needless friction.
  useEffect(() => {
    if (!item || reviewerName) return;
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();
      if (!cancelled && profile?.full_name) {
        setReviewerName((current) => current || profile.full_name || '');
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.review_id]);

  const reset = () => {
    setReviewerName('');
    setSignature(null);
    setComments('');
    setMode('view');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleApprove = async () => {
    if (!item || !signature || !reviewerName.trim()) {
      toast({
        title: 'Signature required',
        description: 'Add your name and signature to countersign.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await approveMutation.mutateAsync({
        reviewId: item.review_id,
        signature,
        reviewerName: reviewerName.trim(),
        comments: comments.trim() || undefined,
      });
      toast({
        title: 'Certificate approved',
        description: 'Your countersignature will appear on the generated PDF.',
      });
      handleClose();
    } catch (error) {
      toast({
        title: 'Could not approve',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleReturn = async () => {
    if (!item || !comments.trim()) {
      toast({
        title: 'Comments required',
        description: 'Tell the electrician what needs changing.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await returnMutation.mutateAsync({ reviewId: item.review_id, comments: comments.trim() });
      toast({ title: 'Certificate returned', description: 'The electrician has been notified.' });
      handleClose();
    } catch (error) {
      toast({
        title: 'Could not return',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Decisions are only allowed once the certificate itself loaded — if the
  // electrician deleted it, the RPC errors and there is nothing to countersign.
  const isPending = item?.status === 'pending' && !!detail && !isError;
  const isWorking = approveMutation.isPending || returnMutation.isPending;

  return (
    <Sheet open={!!item} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.08]">
            <SheetTitle className="text-left text-base">
              {item ? `${TYPE_LABEL[item.report_type] || item.report_type} review` : ''}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {isLoading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-white/40" />
              </div>
            )}

            {!isLoading && isError && (
              <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2.5">
                <p className="text-sm text-orange-300">
                  This certificate is no longer available — it may have been deleted by the
                  electrician. It cannot be reviewed.
                </p>
              </div>
            )}

            {!isLoading && !isError && item && (
              <>
                {/* Certificate summary */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                    Certificate
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <DetailField label="Client" value={item.client_name} />
                    <DetailField label="Certificate no." value={item.certificate_number} />
                    <DetailField label="Address" value={item.installation_address} />
                    <DetailField label="Inspection date" value={item.inspection_date} />
                    <DetailField label="Submitted by" value={item.electrician_name} />
                    <DetailField label="Inspector on cert" value={item.inspector_name} />
                  </div>
                  {item.submitted_note && (
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                        Note from electrician
                      </p>
                      <p className="text-sm text-white/80 whitespace-pre-wrap">
                        {item.submitted_note}
                      </p>
                    </div>
                  )}
                  {item?.report_id && (
                    <>
                      <button
                        type="button"
                        onClick={() => setPdfOpen(true)}
                        className="text-[12px] font-medium text-elec-yellow touch-manipulation"
                      >
                        View PDF →
                      </button>
                      {/* Shared I&T viewer — generates the cert PDF on demand,
                          so it works even when pdf_url was never pre-stored. */}
                      <ReportPdfViewer
                        reportId={item.report_id}
                        open={pdfOpen}
                        onOpenChange={setPdfOpen}
                      />
                    </>
                  )}
                </div>

                {/* Full technical review — observations, test schedule, declarations */}
                {detail?.report?.data && (
                  <QsCertReviewBody
                    reportType={item.report_type}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data={detail.report.data as Record<string, any>}
                  />
                )}

                {/* Itemised QS comments — targeted notes + electrician replies */}
                <QsReviewComments reviewId={item.review_id} authorName={reviewerName} />

                {/* Prior decision (non-pending) */}
                {!isPending && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 space-y-1">
                    <p className="text-sm font-medium text-white capitalize">{item.status}</p>
                    <p className="text-xs text-white/60">
                      {item.reviewer_name ? `By ${item.reviewer_name}` : ''}
                      {item.reviewed_at ? ` on ${formatDate(item.reviewed_at)}` : ''}
                    </p>
                    {item.review_comments && (
                      <p className="text-sm text-white/80 whitespace-pre-wrap">
                        {item.review_comments}
                      </p>
                    )}
                  </div>
                )}

                {/* Decision */}
                {isPending && mode === 'view' && (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                      Decision
                    </h3>
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={() => setMode('approve')}
                        className="h-11 w-full touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
                      >
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Approve & countersign
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setMode('return')}
                        className="h-11 w-full touch-manipulation"
                      >
                        <Undo2 className="h-4 w-4 mr-2" />
                        Return with comments
                      </Button>
                    </div>
                  </div>
                )}

                {isPending && mode === 'approve' && (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                      Countersign as Qualifying Supervisor
                    </h3>
                    <Input
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="Your full name"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                    <SignatureInput value={signature ?? undefined} onChange={setSignature} />
                    <Textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Comments (optional)"
                      className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                    />
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={handleApprove}
                        disabled={isWorking}
                        className="h-11 w-full touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
                      >
                        {isWorking ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <ShieldCheck className="h-4 w-4 mr-2" />
                        )}
                        Confirm approval
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setMode('view')}
                        disabled={isWorking}
                        className="h-11 w-full touch-manipulation"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                )}

                {isPending && mode === 'return' && (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                      Return to electrician
                    </h3>
                    <Textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="What needs changing? (required)"
                      className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                    />
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={handleReturn}
                        disabled={isWorking || !comments.trim()}
                        className="h-11 w-full touch-manipulation bg-orange-500 hover:bg-orange-500/90 text-black font-medium"
                      >
                        {isWorking ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Undo2 className="h-4 w-4 mr-2" />
                        )}
                        Return certificate
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setMode('view')}
                        disabled={isWorking}
                        className="h-11 w-full touch-manipulation"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
