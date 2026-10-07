import { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, Undo2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import SignatureInput from '@/components/signature/SignatureInput';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import {
  useApproveQsReview,
  useReturnQsReview,
  type QsQueueItem,
} from '@/hooks/useQsReviewQueue';
import { ReturnReasonPicker } from '@/components/employer/qs/returnReasons';

/* ==========================================================================
   QsDecisionPanel (ELE-1975) — approve & countersign, or return with coded
   reasons plus free text. One panel for the Employer Hub sheet, the I&T bench
   and the worker-side QS page, so the three can never drift apart again.
   ========================================================================== */

/** The signed-in person's profile name, for countersigning and comments. */
export function useMyFullName(): string {
  const [name, setName] = useState('');
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle();
      if (!cancelled && data?.full_name) setName(data.full_name);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return name;
}

const card =
  'rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 sm:p-5 space-y-4';

const friendlyError = (error: unknown) => {
  const m = error instanceof Error ? error.message : '';
  if (m.includes('REVIEW_NOT_PENDING')) return 'Someone has already decided this one.';
  if (m.includes('NOT_AUTHORISED')) return 'Only the owner, an admin manager or a team QS can sign or return.';
  if (m.includes('COMMENTS_REQUIRED')) return 'Pick a reason or say what needs changing.';
  return 'Please try again.';
};

export function QsDecisionPanel({
  item,
  canSign,
  onDecided,
  dataHelpPrefix = 'qsreviews',
}: {
  item: QsQueueItem;
  /** False for office managers: they can see the queue but not decide. */
  canSign: boolean;
  onDecided: (status: 'approved' | 'returned') => void;
  /** data-help namespace for the "Show me" tours. */
  dataHelpPrefix?: 'qsreviews' | 'wt-qs';
}) {
  const { toast } = useToast();
  const approve = useApproveQsReview();
  const ret = useReturnQsReview();
  const [mode, setMode] = useState<'view' | 'approve' | 'return'>('view');
  const [name, setName] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);

  // Reset when another certificate is opened.
  useEffect(() => {
    setMode('view');
    setSignature(null);
    setComments('');
    setReasons([]);
  }, [item.review_id]);

  // Prefill the reviewer's name from their profile.
  const myName = useMyFullName();
  useEffect(() => {
    if (myName) setName((n) => n || myName);
  }, [myName]);

  const working = approve.isPending || ret.isPending;

  if (!canSign) {
    return (
      <div className={card}>
        <h4 className="text-[15px] font-semibold text-white">Waiting for a QS</h4>
        <p className="text-[13px] text-white">
          You can see this certificate, but only the owner, an admin manager or a team member with
          the QS role can countersign or return it.
        </p>
      </div>
    );
  }

  const doApprove = async () => {
    if (!signature || !name.trim()) return;
    try {
      await approve.mutateAsync({
        reviewId: item.review_id,
        signature,
        reviewerName: name.trim(),
        comments: comments.trim() || undefined,
      });
      toast({ title: 'Certificate approved', description: 'Your countersignature goes on the PDF.' });
      onDecided('approved');
    } catch (e) {
      toast({ title: 'Could not approve', description: friendlyError(e), variant: 'destructive' });
    }
  };

  const doReturn = async () => {
    if (!comments.trim() && reasons.length === 0) return;
    try {
      await ret.mutateAsync({ reviewId: item.review_id, comments: comments.trim(), reasons });
      toast({ title: 'Certificate returned', description: 'The electrician has been told why.' });
      onDecided('returned');
    } catch (e) {
      toast({ title: 'Could not return', description: friendlyError(e), variant: 'destructive' });
    }
  };

  if (mode === 'approve') {
    return (
      <div className={card}>
        <h4 className="text-[15px] font-semibold text-white">Countersign as Qualifying Supervisor</h4>
        <Field label="Your full name" required>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={inputClass}
          />
        </Field>
        <Field label="Signature" required>
          <SignatureInput value={signature ?? undefined} onChange={setSignature} />
        </Field>
        <Field label="Comments" hint="Optional. Kept on the review record.">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Anything to note"
            className={`${textareaClass} min-h-[80px]`}
          />
        </Field>
        <div className="flex flex-col gap-3">
          <PrimaryButton
            size="lg"
            fullWidth
            disabled={!signature || !name.trim() || working}
            onClick={doApprove}
          >
            {working ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
            Confirm approval
          </PrimaryButton>
          <SecondaryButton size="lg" fullWidth disabled={working} onClick={() => setMode('view')}>
            Back
          </SecondaryButton>
        </div>
      </div>
    );
  }

  if (mode === 'return') {
    return (
      <div className={card}>
        <h4 className="text-[15px] font-semibold text-white">Send it back</h4>
        <p className="text-[13px] text-white">
          Tick what is wrong. The reasons are counted, so the team can see the mistakes that keep
          coming back.
        </p>
        <ReturnReasonPicker value={reasons} onChange={setReasons} />
        <Field label="What needs changing" hint="Optional if you ticked a reason.">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="For example: circuit 3 Zs reads 1.9 ohms, retest at the board"
            className={`${textareaClass} min-h-[100px]`}
          />
        </Field>
        <div className="flex flex-col gap-3">
          <DestructiveButton
            size="lg"
            fullWidth
            disabled={(!comments.trim() && reasons.length === 0) || working}
            onClick={doReturn}
            data-help={`${dataHelpPrefix}.return-confirm`}
          >
            {working ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Undo2 className="h-4 w-4 mr-2" />}
            Return certificate
          </DestructiveButton>
          <SecondaryButton size="lg" fullWidth disabled={working} onClick={() => setMode('view')}>
            Back
          </SecondaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className={card}>
      <h4 className="text-[15px] font-semibold text-white">Your decision</h4>
      <div className="flex flex-col gap-3">
        <PrimaryButton data-help={`${dataHelpPrefix}.approve`} size="lg" fullWidth onClick={() => setMode('approve')}>
          <ShieldCheck className="h-4 w-4 mr-2" />
          Approve &amp; countersign
        </PrimaryButton>
        <SecondaryButton data-help={`${dataHelpPrefix}.return`} size="lg" fullWidth onClick={() => setMode('return')}>
          <Undo2 className="h-4 w-4 mr-2" />
          Return with reasons
        </SecondaryButton>
      </div>
    </div>
  );
}
