import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { SuccessCheckmark } from '@/components/college/primitives';
import { keyLabel } from '@/lib/college/labels';

/* ==========================================================================
   PolicyAcknowledgeSheet — full-screen read-and-sign experience for staff.
   Scroll-to-bottom unlocks the "I've read it" checkbox; one tap on Sign
   inserts a policy_acknowledgements row with version + user agent stamp.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policyId: string | null;
  onSigned?: () => void;
}

interface PolicyForSign {
  id: string;
  title: string;
  code: string | null;
  category: string;
  version: number;
  content_md: string | null;
  effective_from: string | null;
  owner_role: string | null;
  approved_by: string | null;
  approved_at: string | null;
}

export function PolicyAcknowledgeSheet({ open, onOpenChange, policyId, onSigned }: Props) {
  const { toast } = useToast();
  const [policy, setPolicy] = useState<PolicyForSign | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [signing, setSigning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Fetch policy on open
  useEffect(() => {
    if (!open || !policyId) {
      setPolicy(null);
      setConfirmed(false);
      setScrolledToEnd(false);
      setShowSuccess(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('college_policies')
        .select(
          'id, title, code, category, version, content_md, effective_from, owner_role, approved_by, approved_at'
        )
        .eq('id', policyId)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        toast({
          title: 'Could not load policy',
          description: error?.message ?? 'Try again.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      setPolicy(data as PolicyForSign);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, policyId, toast]);

  // Detect scroll-to-bottom on the content area
  useEffect(() => {
    if (!open || !policy?.content_md) return;
    const el = scrollRef.current;
    if (!el) return;

    const check = () => {
      const slack = 24; // pixels of slack at the bottom
      const reachedEnd = el.scrollHeight - el.scrollTop - el.clientHeight <= slack;
      // Also unlock immediately if the content fits without scrolling
      const noScroll = el.scrollHeight <= el.clientHeight;
      if (reachedEnd || noScroll) setScrolledToEnd(true);
    };

    // Run once after content paints
    const t = setTimeout(check, 100);
    el.addEventListener('scroll', check, { passive: true });
    return () => {
      clearTimeout(t);
      el.removeEventListener('scroll', check);
    };
  }, [open, policy?.content_md, policy?.id]);

  const handleSign = async () => {
    if (!policy) return;
    if (!confirmed) {
      toast({
        title: 'Tick the confirmation first',
        variant: 'destructive',
      });
      return;
    }
    setSigning(true);
    try {
      // Server-side insert via edge fn so we capture the real client IP
      // (browser can't see x-forwarded-for). The fn validates the policy is
      // live + version matches, then writes the row with ip_addr + user_agent.
      const { data, error: invokeErr } = await supabase.functions.invoke('acknowledge-policy', {
        body: {
          policy_id: policy.id,
          policy_version: policy.version,
        },
      });
      if (invokeErr) throw invokeErr;
      const result = data as { ok?: boolean; already_signed?: boolean; error?: string };
      if (result.error) throw new Error(result.error);

      if (result.already_signed) {
        toast({
          title: 'Already signed',
          description: "You've previously signed this version.",
        });
        onSigned?.();
        onOpenChange(false);
        return;
      }

      setShowSuccess(true);
      toast({
        title: 'Signed',
        description: `${policy.title} v${policy.version} acknowledged.`,
      });
      onSigned?.();
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (e) {
      toast({
        title: 'Could not sign',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSigning(false);
    }
  };

  const canSign = scrolledToEnd && confirmed && !signing;

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <FormSheet
      width="wide"
      bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_22rem]"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={policy ? `Read and sign · version ${policy.version}` : 'Read and sign'}
      title={policy?.title ?? (loading ? 'Loading…' : 'Policy')}
      description={
        policy
          ? `${policy.category.replace(/_/g, ' ')}${policy.code ? ` · ${policy.code}` : ''}${policy.effective_from ? ` · in effect from ${fmt(policy.effective_from)}` : ''}`
          : undefined
      }
      footer={
        <div className="relative grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={signing}
            className={buttonSecondaryCn}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSign}
            disabled={!canSign}
            className={buttonPrimaryCn}
          >
            {signing
              ? 'Signing…'
              : !scrolledToEnd
                ? 'Read to the end first'
                : !confirmed
                  ? 'Tick to confirm'
                  : 'Sign now'}
          </button>
          <SuccessCheckmark show={showSuccess} />
        </div>
      }
    >
      {loading ? (
        <Skeleton />
      ) : !policy ? (
        <p className="text-[14px] text-white">Could not load this policy.</p>
      ) : (
        <>
          {/* Read region: scrolls on its own; reaching the end unlocks the sign-off */}
          <div
            ref={scrollRef}
            className="max-h-[52vh] overflow-y-auto overscroll-contain rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 py-6 sm:px-8 lg:max-h-[58vh]"
          >
            {policy.content_md && policy.content_md.trim() ? (
              <article className="prose prose-invert max-w-none prose-headings:text-white prose-h1:text-[24px] prose-h2:text-[19px] prose-h3:text-[16px] prose-p:text-[14px] prose-p:leading-relaxed prose-p:text-white prose-li:text-[14px] prose-li:text-white prose-strong:text-white prose-a:text-elec-yellow">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{policy.content_md}</ReactMarkdown>
              </article>
            ) : (
              <p className="text-[14px] text-white">
                This policy has no body yet. Ask your DSL or admin to add the content before you
                sign.
              </p>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-0">
            <dl className="space-y-3 text-[13px]">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-white">Status</dt>
                <dd className="font-semibold text-emerald-400">Live · version {policy.version}</dd>
              </div>
              {policy.owner_role && (
                <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.08] pt-3">
                  <dt className="text-white">Owned by</dt>
                  <dd className="font-medium text-white">{keyLabel(policy.owner_role)}</dd>
                </div>
              )}
              {policy.approved_at && (
                <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.08] pt-3">
                  <dt className="text-white">Approved</dt>
                  <dd className="font-medium text-white">{fmt(policy.approved_at)}</dd>
                </div>
              )}
            </dl>

            <div className="border-t border-white/[0.1] pt-5">
              <h3 className="text-sm font-semibold text-white">Your sign-off</h3>
              {!scrolledToEnd && (
                <p className="mt-2 text-[13px] leading-snug text-orange-300">
                  Scroll to the bottom of the policy to unlock the sign-off.
                </p>
              )}
              <label
                className={cn(
                  'mt-3 flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 touch-manipulation transition-colors',
                  scrolledToEnd
                    ? 'border-white/[0.15] bg-white/[0.05]'
                    : 'cursor-not-allowed border-white/[0.08]',
                  confirmed && 'border-elec-yellow/60'
                )}
              >
                <input
                  type="checkbox"
                  checked={confirmed}
                  disabled={!scrolledToEnd}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-elec-yellow"
                />
                <span className="text-[13.5px] leading-snug text-white">
                  I have read{' '}
                  <span className="font-semibold">
                    {policy.title} version {policy.version}
                  </span>{' '}
                  in full and understand my responsibilities under it.
                </span>
              </label>
              <p className="mt-2.5 text-[12px] leading-relaxed text-white">
                Your sign-off is logged with the time and your browser details, as audit evidence.
              </p>
            </div>
          </aside>
        </>
      )}
    </FormSheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded-2xl border border-white/[0.08] px-5 py-6 lg:col-span-2">
      <div className="h-2 w-20 rounded bg-white/[0.06]" />
      <div className="mt-3 h-3 w-2/3 rounded bg-white/[0.06]" />
      <div className="mt-2 h-3 w-full rounded bg-white/[0.04]" />
      <div className="mt-2 h-3 w-5/6 rounded bg-white/[0.04]" />
      <div className="mt-2 h-3 w-3/4 rounded bg-white/[0.04]" />
    </div>
  );
}
