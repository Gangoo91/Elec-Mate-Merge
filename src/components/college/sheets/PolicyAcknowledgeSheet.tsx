import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Pill,
  SuccessCheckmark,
} from '@/components/college/primitives';

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:h-[90vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow={policy ? `Policy · v${policy.version}` : 'Loading…'}
          title={policy?.title ?? 'Policy'}
          description={
            policy
              ? `${policy.category.replace(/_/g, ' ')}${policy.code ? ` · ${policy.code}` : ''}${policy.effective_from ? ` · effective ${new Date(policy.effective_from).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}`
              : ''
          }
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)} disabled={signing}>
                Close
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleSign} disabled={!canSign}>
                {signing
                  ? 'Signing…'
                  : !scrolledToEnd
                    ? 'Scroll to the bottom'
                    : !confirmed
                      ? 'Tick to confirm'
                      : 'Sign now ✓'}
              </PrimaryButton>
            </>
          }
        >
          {loading ? (
            <Skeleton />
          ) : !policy ? (
            <div className="text-[13px] text-white">Could not load this policy.</div>
          ) : (
            <>
              {/* Read region — scrollable; scroll-to-end unlocks the sign button */}
              <div
                ref={scrollRef}
                className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-8 py-6 max-h-[58vh] overflow-y-auto overscroll-contain"
              >
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <Pill tone="green">Live · v{policy.version}</Pill>
                  {policy.owner_role && (
                    <span className="text-[11px] text-white/55">
                      Owned by <span className="text-white/85">{policy.owner_role}</span>
                    </span>
                  )}
                  {policy.approved_at && (
                    <span className="text-[11px] text-white/55">
                      Approved{' '}
                      {new Date(policy.approved_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                {policy.content_md && policy.content_md.trim() ? (
                  <article className="prose prose-invert max-w-none prose-headings:text-white prose-h1:text-[24px] prose-h2:text-[19px] prose-h3:text-[16px] prose-p:text-[13.5px] prose-p:leading-relaxed prose-p:text-white/85 prose-li:text-[13.5px] prose-li:text-white/85 prose-strong:text-white prose-a:text-elec-yellow">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{policy.content_md}</ReactMarkdown>
                  </article>
                ) : (
                  <p className="text-[13px] text-white/55 italic">
                    This policy has no body. Ask your DSL or admin to add the content before you
                    sign.
                  </p>
                )}
              </div>

              {/* Confirmation block */}
              <div
                className={cn(
                  'bg-[hsl(0_0%_12%)] border rounded-2xl px-5 py-4 transition-colors',
                  scrolledToEnd ? 'border-emerald-500/25' : 'border-white/[0.06]'
                )}
              >
                {!scrolledToEnd && (
                  <p className="text-[12.5px] text-amber-300/85 mb-3 leading-snug">
                    Scroll to the bottom of the policy to enable the sign-off.
                  </p>
                )}
                <label className="flex items-start gap-3 cursor-pointer touch-manipulation">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    disabled={!scrolledToEnd}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-[hsl(0_0%_9%)] checked:bg-elec-yellow disabled:opacity-40"
                  />
                  <span className="text-[13px] text-white leading-snug">
                    I have read{' '}
                    <span className="font-medium text-white">
                      {policy.title} v{policy.version}
                    </span>{' '}
                    in full and understand my responsibilities under it.
                    <span className="block mt-1 text-[11px] text-white/55">
                      Your sign-off is logged with timestamp + browser info as audit-grade evidence.
                    </span>
                  </span>
                </label>
              </div>
            </>
          )}
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-6">
        <div className="h-2 w-20 bg-white/[0.06] rounded" />
        <div className="mt-3 h-3 w-2/3 bg-white/[0.06] rounded" />
        <div className="mt-2 h-3 w-full bg-white/[0.04] rounded" />
        <div className="mt-2 h-3 w-5/6 bg-white/[0.04] rounded" />
        <div className="mt-2 h-3 w-3/4 bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}
