/**
 * MyAssessmentCard — the learner's side of the assessment loop, shown in the
 * College area of the Apprentice Hub (/apprentice/college/progress).
 * ELE-1862 / ELE-1868 / ELE-1869 / ELE-1870.
 *
 *   - every criterion's honest state and the assessor's feedback (read-only)
 *   - ask a supervisor to sign a witness statement (link, no account needed)
 *   - invite an independent assessor (works with or without a college)
 * The learner owns these links and can withdraw or remove them at any time.
 *
 * Sharing happens from a "Link ready" step with its own buttons, so the
 * share sheet always opens from a fresh tap (iOS refuses navigator.share
 * after a network wait).
 */
import { useCallback, useEffect, useState } from 'react';
import { CheckCircle, Copy, Loader2, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { LearnerAssessmentView } from '@/components/assessment/LearnerAssessmentView';
import { ROLE_LABEL } from '@/lib/assessorInvite';

interface Witness {
  id: string;
  token: string;
  status: 'requested' | 'signed' | 'withdrawn' | 'expired';
  witness_email: string | null;
  witness_name: string | null;
  witness_role: string | null;
  witness_company: string | null;
  statement: string | null;
  criteria: string[];
  created_at: string;
  signed_at: string | null;
  expires_at: string;
  evidence_snapshot: { title?: string } | null;
}
interface AssessorLink {
  id: string;
  token: string;
  assessor_email: string;
  assessor_name: string | null;
  role: string;
  status: 'invited' | 'active' | 'revoked' | 'expired';
  created_at: string;
  accepted_at: string | null;
  expires_at: string;
}
interface Evidence {
  id: string;
  title: string;
  assessment_criteria_met: string[] | null;
  created_at: string;
}
interface ReadyLink {
  url: string;
  text: string;
  heading: string;
  who: string;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const primaryCn =
  'flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black disabled:opacity-40 touch-manipulation';
const secondaryCn =
  'flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.25] text-[15px] font-semibold text-white touch-manipulation';

const sentence = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const when = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';
const isPast = (iso: string | null | undefined) => !!iso && new Date(iso).getTime() < Date.now();

export function MyAssessmentCard() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [witnesses, setWitnesses] = useState<Witness[]>([]);
  const [links, setLinks] = useState<AssessorLink[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [witnessSheet, setWitnessSheet] = useState(false);
  const [assessorSheet, setAssessorSheet] = useState(false);
  const [ready, setReady] = useState<ReadyLink | null>(null);
  const [confirmRevoke, setConfirmRevoke] = useState<AssessorLink | null>(null);
  const [openStatement, setOpenStatement] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [wItem, setWItem] = useState<string | null>(null);
  const [wEmail, setWEmail] = useState('');
  const [aEmail, setAEmail] = useState('');
  const [aName, setAName] = useState('');
  const [aRole, setARole] = useState<'assessor' | 'iqa' | 'epa_assessor'>('assessor');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://elec-mate.com';
  const firstName = (profile?.full_name ?? '').split(' ')[0] || 'me';

  const load = useCallback(async () => {
    if (!user) return;
    const [w, l, e] = await Promise.all([
      supabase
        .from('portfolio_witness_statements' as never)
        .select(
          'id, token, status, witness_email, witness_name, witness_role, witness_company, statement, criteria, created_at, signed_at, expires_at, evidence_snapshot'
        )
        .eq('learner_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('portfolio_assessor_links' as never)
        .select('id, token, assessor_email, assessor_name, role, status, created_at, accepted_at, expires_at')
        .eq('learner_id', user.id)
        .neq('status', 'revoked')
        .order('created_at', { ascending: false }),
      supabase
        .from('portfolio_items')
        .select('id, title, assessment_criteria_met, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(60),
    ]);
    setWitnesses(((w.data ?? []) as unknown) as Witness[]);
    setLinks(((l.data ?? []) as unknown) as AssessorLink[]);
    setEvidence((e.data as Evidence[]) ?? []);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  /* ─── Sharing: always from a direct tap ─────────────────────────────── */
  const shareNow = async (r: ReadyLink) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Elec-Mate', text: r.text, url: r.url });
        return;
      } catch (e) {
        if ((e as DOMException)?.name === 'AbortError') return; // they closed it
        // Not allowed or unsupported here: fall through to copy.
      }
    }
    await copyNow(r);
  };
  const copyNow = async (r: ReadyLink) => {
    try {
      await navigator.clipboard.writeText(r.url);
      toast({ title: 'Link copied', description: 'Paste it into a text, WhatsApp or email.' });
    } catch {
      toast({ title: 'Copy this link', description: r.url });
    }
  };
  const whatsappHref = (r: ReadyLink) => `https://wa.me/?text=${encodeURIComponent(`${r.text} ${r.url}`)}`;

  const witnessReady = (token: string): ReadyLink => ({
    url: `${origin}/witness/${token}`,
    text: 'Could you confirm what you saw me do on site? It takes two minutes, no account needed.',
    heading: 'Witness link ready',
    who: 'your supervisor',
  });
  const assessorReady = (token: string, who: string): ReadyLink => ({
    url: `${origin}/assessor-invite/${token}`,
    text: "I'd like you to assess my apprenticeship portfolio on Elec-Mate. It's a free account:",
    heading: 'Invite ready',
    who,
  });

  /* ─── Create ────────────────────────────────────────────────────────── */
  const requestWitness = async (itemId?: string) => {
    const target = itemId ?? wItem;
    if (!user || !target) return;
    setBusy(true);
    const item = evidence.find((x) => x.id === target);
    const { data, error } = await supabase
      .from('portfolio_witness_statements' as never)
      .insert({
        learner_id: user.id,
        portfolio_item_id: target,
        witness_email: wEmail.trim() || null,
        criteria: item?.assessment_criteria_met ?? [],
      } as never)
      .select('token')
      .single();
    setBusy(false);
    if (error || !data) {
      toast({ title: 'Could not create the request', description: 'Check your connection and try again.', variant: 'destructive' });
      return;
    }
    setWItem(null);
    setWEmail('');
    setWitnessSheet(false);
    setReady(witnessReady((data as { token: string }).token));
    void load();
  };

  const inviteAssessor = async (again?: AssessorLink) => {
    const email = again ? again.assessor_email : aEmail.trim().toLowerCase();
    if (!user || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({ title: 'Add their email address' });
      return;
    }
    setBusy(true);
    if (again) {
      await supabase.from('portfolio_assessor_links' as never).update({ status: 'revoked' } as never).eq('id', again.id);
    }
    const { data, error } = await supabase
      .from('portfolio_assessor_links' as never)
      .insert({
        learner_id: user.id,
        assessor_email: email,
        assessor_name: again ? again.assessor_name : aName.trim() || null,
        role: again ? again.role : aRole,
      } as never)
      .select('token')
      .single();
    setBusy(false);
    if (error || !data) {
      toast({ title: 'Could not create the invite', description: 'Check your connection and try again.', variant: 'destructive' });
      return;
    }
    const who = (again?.assessor_name ?? aName.trim()) || email;
    setAEmail('');
    setAName('');
    setAssessorSheet(false);
    setReady(assessorReady((data as { token: string }).token, who));
    void load();
  };

  const withdraw = async (w: Witness) => {
    const { error } = await supabase
      .from('portfolio_witness_statements' as never)
      .update({ status: 'withdrawn' } as never)
      .eq('id', w.id);
    if (error) {
      toast({ title: 'Could not withdraw', description: 'Check your connection and try again.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Request withdrawn', description: 'That link no longer works.' });
    await load();
  };
  const revoke = async (l: AssessorLink) => {
    setBusy(true);
    const { error } = await supabase
      .from('portfolio_assessor_links' as never)
      .update({ status: 'revoked' } as never)
      .eq('id', l.id);
    setBusy(false);
    setConfirmRevoke(null);
    if (error) {
      toast({ title: 'Could not remove access', description: 'Check your connection and try again.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Access removed', description: `${l.assessor_name ?? l.assessor_email} can no longer see your portfolio.` });
    await load();
  };

  const liveWitness = witnesses.filter((w) => w.status !== 'withdrawn');

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setWitnessSheet(true)}
          className="flex min-h-[64px] flex-col justify-center rounded-2xl bg-elec-yellow px-4 py-3 text-left touch-manipulation"
        >
          <span className="text-[15px] font-semibold text-black">Ask a witness to sign</span>
          <span className="text-[12.5px] text-black">Your supervisor confirms what they saw. No account needed.</span>
        </button>
        <button
          type="button"
          onClick={() => setAssessorSheet(true)}
          className={cn(cardCn, 'flex min-h-[64px] flex-col justify-center px-4 py-3 text-left touch-manipulation sm:mx-0')}
        >
          <span className="text-[15px] font-semibold text-white">Invite an assessor</span>
          <span className="text-[12.5px] text-white">They see your evidence and record decisions. You can remove them.</span>
        </button>
      </div>

      <section className="space-y-3">
        <HubSectionHeading>Every criterion</HubSectionHeading>
        {user && <LearnerAssessmentView learnerId={user.id} mode="learner" learnerName={profile?.full_name ?? undefined} />}
      </section>

      {(liveWitness.length > 0 || links.length > 0) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {liveWitness.length > 0 && (
            <section className="space-y-3">
              <HubSectionHeading>Witness statements</HubSectionHeading>
              <ul className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
                {liveWitness.map((w) => {
                  const expired = w.status === 'requested' && isPast(w.expires_at);
                  const isOpen = openStatement === w.id;
                  return (
                    <li key={w.id} className="px-4 py-3 sm:px-5">
                      <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-semibold text-white">{w.evidence_snapshot?.title ?? 'Evidence'}</p>
                          <p className="text-[12.5px] text-white">
                            {w.status === 'signed'
                              ? `Signed by ${w.witness_name} · ${when(w.signed_at)}`
                              : expired
                                ? `Link expired ${when(w.expires_at)}`
                                : `Waiting${w.witness_email ? ` for ${w.witness_email}` : ''} · sent ${when(w.created_at)}`}
                          </p>
                        </div>
                        {w.status === 'signed' ? (
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpenStatement(isOpen ? null : w.id)}
                            className="h-11 shrink-0 px-2 text-[12.5px] font-semibold text-emerald-300 touch-manipulation"
                          >
                            {isOpen ? 'Hide' : 'Read'}
                          </button>
                        ) : expired ? (
                          <button
                            type="button"
                            disabled={busy || !w.evidence_snapshot}
                            onClick={async () => {
                              const item = evidence.find((e) => e.title === w.evidence_snapshot?.title);
                              await withdraw(w);
                              if (item) await requestWitness(item.id);
                              else setWitnessSheet(true);
                            }}
                            className="h-11 shrink-0 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                          >
                            Send a new link
                          </button>
                        ) : (
                          <div className="flex shrink-0 gap-1">
                            <button
                              type="button"
                              aria-label="Share the link again"
                              onClick={() => setReady(witnessReady(w.token))}
                              className="flex h-11 w-11 items-center justify-center rounded-full touch-manipulation"
                            >
                              <Share2 className="h-4 w-4 text-white" />
                            </button>
                            <button
                              type="button"
                              onClick={() => withdraw(w)}
                              className="h-11 px-2 text-[12.5px] font-semibold text-white touch-manipulation"
                            >
                              Withdraw
                            </button>
                          </div>
                        )}
                      </div>
                      {isOpen && w.statement && (
                        <div className="mt-2 rounded-lg border border-emerald-400/30 bg-emerald-500/[0.08] p-3">
                          <p className="whitespace-pre-line text-[13px] text-white">“{w.statement}”</p>
                          <p className="mt-1 text-[12px] text-white">
                            {w.witness_name}
                            {w.witness_role ? `, ${w.witness_role}` : ''}
                            {w.witness_company ? `, ${w.witness_company}` : ''}
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {links.length > 0 && (
            <section className="space-y-3">
              <HubSectionHeading>Your assessors</HubSectionHeading>
              <ul className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
                {links.map((l) => {
                  const expired = l.status === 'invited' && isPast(l.expires_at);
                  return (
                    <li key={l.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold text-white">{l.assessor_name ?? l.assessor_email}</p>
                        <p className="text-[12.5px] text-white">
                          {sentence(ROLE_LABEL[l.role] ?? 'assessor')} ·{' '}
                          {l.status === 'active'
                            ? `accepted ${when(l.accepted_at)}`
                            : expired
                              ? `invite expired ${when(l.expires_at)}`
                              : 'invite sent'}
                        </p>
                      </div>
                      {l.status === 'invited' && !expired && (
                        <button
                          type="button"
                          aria-label="Share the invite again"
                          onClick={() => setReady(assessorReady(l.token, l.assessor_name ?? l.assessor_email))}
                          className="flex h-11 w-11 items-center justify-center rounded-full touch-manipulation"
                        >
                          <Copy className="h-4 w-4 text-white" />
                        </button>
                      )}
                      {expired ? (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => inviteAssessor(l)}
                          className="h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                        >
                          Send a new invite
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => (l.status === 'active' ? setConfirmRevoke(l) : revoke(l))}
                          className="h-11 px-2 text-[12.5px] font-semibold text-white touch-manipulation"
                        >
                          Remove
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Witness request */}
      <Sheet open={witnessSheet} onOpenChange={setWitnessSheet}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/[0.1] px-4 py-4">
              <SheetTitle className="text-[16px] font-semibold text-white">Ask a witness to sign</SheetTitle>
              <p className="mt-0.5 text-[13px] text-white">
                Pick the job they saw. You'll get a link to send them by text, WhatsApp or email.
              </p>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
              {evidence.length === 0 ? (
                <p className="text-[14px] text-white">Add a piece of evidence first, then ask someone to witness it.</p>
              ) : (
                <div role="radiogroup" aria-label="Evidence to be witnessed" className="divide-y divide-white/[0.08] rounded-xl border border-white/[0.12]">
                  {evidence.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      role="radio"
                      aria-checked={wItem === e.id}
                      onClick={() => setWItem(e.id)}
                      className={cn('flex min-h-11 w-full items-center gap-3 px-3 py-2.5 text-left touch-manipulation', wItem === e.id && 'bg-white/[0.08]')}
                    >
                      <span
                        aria-hidden
                        className={cn('h-5 w-5 shrink-0 rounded-full border', wItem === e.id ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.3]')}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] text-white">{e.title}</span>
                        <span className="block text-[12px] text-white">
                          {(e.assessment_criteria_met?.length ?? 0) > 0 ? `${e.assessment_criteria_met!.length} criteria` : 'No criteria yet'} ·{' '}
                          {when(e.created_at)}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <div>
                <label htmlFor="witness-email" className="mb-1 block text-[12px] font-medium text-white">
                  Their email (optional, for your records)
                </label>
                <input id="witness-email" className={inputCn} type="email" inputMode="email" value={wEmail} onChange={(e) => setWEmail(e.target.value)} placeholder="supervisor@company.co.uk" />
              </div>
            </div>
            <div className="border-t border-white/[0.1] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              <button type="button" disabled={!wItem || busy} onClick={() => requestWitness()} className={primaryCn}>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Create link
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Assessor invite */}
      <Sheet open={assessorSheet} onOpenChange={setAssessorSheet}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/[0.1] px-4 py-4">
              <SheetTitle className="text-[16px] font-semibold text-white">Invite an assessor</SheetTitle>
              <p className="mt-0.5 text-[13px] text-white">
                They get a free account to see your evidence and record decisions. Only the person with this email can
                accept. Your portfolio stays yours, and you can remove them any time.
              </p>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
              <div>
                <label htmlFor="assessor-email" className="mb-1 block text-[12px] font-medium text-white">Their email</label>
                <input id="assessor-email" className={inputCn} type="email" inputMode="email" autoComplete="off" value={aEmail} onChange={(e) => setAEmail(e.target.value)} placeholder="assessor@provider.co.uk" />
              </div>
              <div>
                <label htmlFor="assessor-name" className="mb-1 block text-[12px] font-medium text-white">Their name</label>
                <input id="assessor-name" className={inputCn} value={aName} onChange={(e) => setAName(e.target.value)} />
              </div>
              <fieldset>
                <legend className="mb-2 text-[12px] font-medium text-white">Their role</legend>
                <div className="flex flex-wrap gap-2">
                  {(['assessor', 'iqa', 'epa_assessor'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={aRole === r}
                      onClick={() => setARole(r)}
                      className={cn('h-11 rounded-full border px-4 text-[13px] touch-manipulation', aRole === r ? chipOn : chipOff)}
                    >
                      {r === 'iqa' ? 'IQA' : r === 'epa_assessor' ? 'End-point assessor' : 'Assessor'}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="border-t border-white/[0.1] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              <button type="button" disabled={busy} onClick={() => inviteAssessor()} className={primaryCn}>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Create invite
              </button>
              <p className="mt-2 text-center text-[12px] text-white">Sending as {firstName}.</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Link ready: share from a direct tap */}
      <Sheet open={!!ready} onOpenChange={(v) => !v && setReady(null)}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          {ready && (
            <div className="flex h-full flex-col bg-background">
              <div className="border-b border-white/[0.1] px-4 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <SheetTitle className="text-[16px] font-semibold text-white">{ready.heading}</SheetTitle>
                </div>
                <p className="mt-1 text-[13px] text-white">Send it to {ready.who}. It works for 30 days.</p>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                <p className="break-all rounded-xl border border-white/[0.12] p-3 font-mono text-[12.5px] text-white">{ready.url}</p>
                <button type="button" onClick={() => shareNow(ready)} className={primaryCn}>
                  <Share2 className="h-4 w-4" /> Share
                </button>
                <a href={whatsappHref(ready)} target="_blank" rel="noreferrer" className={secondaryCn}>
                  <MessageCircle className="h-4 w-4" /> Send on WhatsApp
                </a>
                <button type="button" onClick={() => copyNow(ready)} className={secondaryCn}>
                  <Copy className="h-4 w-4" /> Copy link
                </button>
              </div>
              <div className="border-t border-white/[0.1] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
                <button type="button" onClick={() => setReady(null)} className={secondaryCn}>
                  Done
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirm removing an active assessor */}
      <Sheet open={!!confirmRevoke} onOpenChange={(v) => !v && setConfirmRevoke(null)}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          {confirmRevoke && (
            <div className="flex h-full flex-col bg-background">
              <div className="border-b border-white/[0.1] px-4 py-4">
                <SheetTitle className="text-[16px] font-semibold text-white">
                  Remove {confirmRevoke.assessor_name ?? confirmRevoke.assessor_email}?
                </SheetTitle>
              </div>
              <div className="flex-1 px-4 py-5">
                <p className="text-[14px] text-white">
                  They will no longer see your evidence or record decisions. Decisions they have already made stay on
                  your record.
                </p>
              </div>
              <div className="space-y-2 border-t border-white/[0.1] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
                <button type="button" disabled={busy} onClick={() => revoke(confirmRevoke)} className={primaryCn}>
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Remove access
                </button>
                <button type="button" onClick={() => setConfirmRevoke(null)} className={secondaryCn}>
                  Keep them
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MyAssessmentCard;
