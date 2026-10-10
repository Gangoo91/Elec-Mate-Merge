/**
 * Invite an assessor by link (ELE-1870, reused by ELE-1897).
 *
 * One sheet for the whole job: their email, name and role, then the link to
 * send by share sheet, WhatsApp or copy. The invite is a row in
 * portfolio_assessor_links; only the person with that email can accept it
 * (accept_assessor_invite checks), and the learner can remove them any time.
 *
 * Used from the portfolio home (no college yet), the evidence detail and the
 * Progress & assessment page, so a learner without a college is never sent
 * somewhere else to find it.
 */
import { useEffect, useState } from 'react';
import { CheckCircle, Copy, Loader2, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { P_BTN, P_BTN_PRIMARY, P_INPUT, P_SEG_GROUP, pSeg } from './ui';

type Role = 'assessor' | 'iqa' | 'epa_assessor';

const ROLES: { v: Role; label: string; body: string }[] = [
  {
    v: 'assessor',
    label: 'Assessor',
    body: 'Reviews your evidence and passes criteria, or asks for more.',
  },
  {
    v: 'iqa',
    label: 'IQA',
    body: 'Checks an assessor’s decisions. Only needed if your provider asks.',
  },
  {
    v: 'epa_assessor',
    label: 'End-point assessor',
    body: 'Reads your portfolio ahead of your end-point assessment.',
  },
];

export const assessorInviteText =
  "I'd like you to assess my apprenticeship portfolio on Elec-Mate. It's a free account:";

export async function shareLink(
  url: string,
  text: string,
  toast: ReturnType<typeof useToast>['toast']
) {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Elec-Mate', text, url });
      return;
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return;
    }
  }
  await copyLink(url, toast);
}

export async function copyLink(url: string, toast: ReturnType<typeof useToast>['toast']) {
  try {
    await navigator.clipboard.writeText(url);
    toast({ title: 'Link copied', description: 'Paste it into a text, WhatsApp or email.' });
  } catch {
    toast({ title: 'Copy this link', description: url });
  }
}

export function InviteAssessorSheet({
  open,
  onOpenChange,
  onCreated,
  onAskWitness,
  initial,
}: {
  /** Filled in from a request to assess (ELE-2016). */
  initial?: { email: string; name: string; role: Role };
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** After the invite row exists, so a list can reload. */
  onCreated?: () => void;
  /** Offered for employers: a witness statement is how they back up your work. */
  onAskWitness?: () => void;
}) {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('assessor');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState<{ url: string; who: string } | null>(null);

  useEffect(() => {
    if (open) {
      setEmail(initial?.email ?? '');
      setName(initial?.name ?? '');
      setRole(initial?.role ?? 'assessor');
      setReady(null);
    }
  }, [open, initial]);

  const firstName = ((profile?.full_name as string | undefined) ?? '').split(' ')[0] || 'you';
  const valid = /^\S+@\S+\.\S+$/.test(email.trim());

  const create = async () => {
    if (!user || !valid || busy) return;
    setBusy(true);
    const clean = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('portfolio_assessor_links' as never)
      .insert({
        learner_id: user.id,
        assessor_email: clean,
        assessor_name: name.trim() || null,
        role,
      } as never)
      .select('token')
      .single();
    setBusy(false);
    if (error || !data) {
      toast({
        title: 'Could not create the invite',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
      return;
    }
    setReady({
      url: `${window.location.origin}/assessor-invite/${(data as { token: string }).token}`,
      who: name.trim() || clean,
    });
    onCreated?.();
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Your portfolio"
      title={ready ? 'Invite ready' : 'Invite an assessor'}
      description={
        ready
          ? `Send it to ${ready.who}. The link works for 30 days and only their email can accept it.`
          : initial
            ? `${initial.name} asked to assess your portfolio. Check their details, then create the invite.`
            : 'They get a free account to see your evidence and record decisions. Your portfolio stays yours and you can remove them any time.'
      }
      footer={
        ready ? (
          <button type="button" className={cn(P_BTN, 'w-full')} onClick={() => onOpenChange(false)}>
            Done
          </button>
        ) : (
          <button
            type="button"
            className={cn(P_BTN_PRIMARY, 'w-full')}
            disabled={!valid || busy}
            onClick={() => void create()}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Create invite
          </button>
        )
      }
    >
      {ready ? (
        <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <p className="text-[14px] font-semibold text-white">Their link</p>
            </div>
            <p className="break-all rounded-xl border border-white/[0.12] p-3 font-mono text-[12.5px] text-white">
              {ready.url}
            </p>
          </div>
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => void shareLink(ready.url, assessorInviteText, toast)}
              className={cn(P_BTN_PRIMARY, 'w-full')}
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${assessorInviteText} ${ready.url}`)}`}
              target="_blank"
              rel="noreferrer"
              className={cn(P_BTN, 'w-full')}
            >
              <MessageCircle className="h-4 w-4" /> Send on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => void copyLink(ready.url, toast)}
              className={cn(P_BTN, 'w-full')}
            >
              <Copy className="h-4 w-4" /> Copy link
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 py-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="inv-assessor-email"
                className="mb-1 block text-[12px] font-medium text-white"
              >
                Their email
              </label>
              <input
                id="inv-assessor-email"
                className={P_INPUT}
                type="email"
                inputMode="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="assessor@provider.co.uk"
              />
            </div>
            <div>
              <label
                htmlFor="inv-assessor-name"
                className="mb-1 block text-[12px] font-medium text-white"
              >
                Their name
              </label>
              <input
                id="inv-assessor-name"
                className={P_INPUT}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <p className="text-[12.5px] text-white">
              Sent from {firstName}. Nothing is emailed until you share the link.
            </p>
          </div>
          <div className="space-y-5">
            <fieldset>
              <legend className="mb-2 text-[12px] font-medium text-white">Their role</legend>
              <div className={P_SEG_GROUP}>
                {ROLES.map((r) => (
                  <button
                    key={r.v}
                    type="button"
                    aria-pressed={role === r.v}
                    onClick={() => setRole(r.v)}
                    className={cn(pSeg(role === r.v), 'whitespace-normal px-2 leading-tight')}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[12.5px] leading-snug text-white">
                {ROLES.find((r) => r.v === role)?.body}
              </p>
            </fieldset>
            {onAskWitness && (
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4">
                <p className="text-[13.5px] font-semibold text-white">Inviting your employer?</p>
                <p className="mt-1 text-[12.5px] leading-snug text-white">
                  Employers back up your work with a witness statement: they confirm what they saw
                  you do, with no account needed.
                </p>
                <button
                  type="button"
                  className={cn(P_BTN, 'mt-3')}
                  onClick={() => {
                    onOpenChange(false);
                    onAskWitness();
                  }}
                >
                  Ask for a witness statement
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </FormSheet>
  );
}

export default InviteAssessorSheet;
