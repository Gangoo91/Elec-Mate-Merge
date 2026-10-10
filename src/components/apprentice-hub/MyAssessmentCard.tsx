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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Copy, Loader2, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { InviteAssessorSheet } from '@/components/apprentice-hub/portfolio2/InviteAssessorSheet';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { LC_TILE, LC_TOP_LINE } from '@/components/apprentice-hub/college-hub/learnerUi';
import { LearnerAssessmentView } from '@/components/assessment/LearnerAssessmentView';
import { ROLE_LABEL } from '@/lib/assessorInvite';
import { qualificationsLine } from '@/lib/assessorQualifications';
import { useDeepLinkFocus } from '@/hooks/useDeepLinkFocus';

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
  assessor_user_id: string | null;
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
  /** Typed claims, "113 AC 1.1". */
  criteria?: string[];
}
interface Grade {
  id: string;
  unit_name: string | null;
  assessment_type: string | null;
  grade: string | null;
  score: number | null;
  feedback: string | null;
  assessed_at: string | null;
  status: string | null;
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
const primaryCn =
  'flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white';
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
  const [assessorQuals, setAssessorQuals] = useState<Record<string, string[]>>({});
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [witnessSheet, setWitnessSheet] = useState(false);
  const [assessorSheet, setAssessorSheet] = useState(false);
  const [ready, setReady] = useState<ReadyLink | null>(null);
  const [confirmRevoke, setConfirmRevoke] = useState<AssessorLink | null>(null);
  const [openStatement, setOpenStatement] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [wItem, setWItem] = useState<string | null>(null);
  const [wEmail, setWEmail] = useState('');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Notification deep links land on the exact thing:
  //   ?ac=UNIT:AC,…   an assessor's decision on those criteria
  //   ?grade=<id>     a grade the college recorded
  //   ?assessor=<id>  an assessor who accepted the invite
  const [params] = useSearchParams();
  const focusAcs = useMemo(
    () =>
      (params.get('ac') ?? '')
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
    [params]
  );
  const focusRow = params.get('grade') ?? params.get('assessor');
  // ?witness=1 (from the portfolio home, no college yet): open the witness request.
  useEffect(() => {
    if (params.get('witness') === '1') setWitnessSheet(true);
  }, [params]);
  // ?assessor_request=<id> (ELE-2016): someone reading the shared portfolio
  // asked to be the assessor. Open the invite sheet filled in with them.
  const [assessorRequest, setAssessorRequest] = useState<{
    id: string;
    email: string;
    name: string;
    role: 'assessor' | 'iqa' | 'epa_assessor';
  } | null>(null);
  useEffect(() => {
    const id = params.get('assessor_request');
    if (!id || !user) return;
    void supabase
      .from('portfolio_assessor_requests' as never)
      .select('id, requester_name, requester_email, role, status')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        const r = data as unknown as {
          id: string;
          requester_name: string;
          requester_email: string;
          role: 'assessor' | 'iqa' | 'epa_assessor';
          status: string;
        } | null;
        if (!r || r.status !== 'open') return;
        setAssessorRequest({
          id: r.id,
          email: r.requester_email,
          name: r.requester_name,
          role: r.role,
        });
        setAssessorSheet(true);
      });
  }, [params, user]);
  useDeepLinkFocus(focusRow, loaded);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://elec-mate.com';

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
        .select(
          'id, token, assessor_email, assessor_name, assessor_user_id, role, status, created_at, accepted_at, expires_at'
        )
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
    setWitnesses((w.data ?? []) as unknown as Witness[]);
    const linkRows = (l.data ?? []) as unknown as AssessorLink[];
    setLinks(linkRows);
    // ELE-1870: the qualifications each accepted assessor lists on their profile.
    const assessorIds = [
      ...new Set(linkRows.map((r) => r.assessor_user_id).filter(Boolean)),
    ] as string[];
    if (assessorIds.length > 0) {
      const { data: ap } = await supabase
        .from('assessor_profiles' as never)
        .select('user_id, qualifications')
        .in('user_id', assessorIds);
      setAssessorQuals(
        Object.fromEntries(
          ((ap ?? []) as unknown as { user_id: string; qualifications: string[] | null }[]).map(
            (p) => [p.user_id, p.qualifications ?? []]
          )
        )
      );
    }
    // ELE-1917: an item's criteria are its typed claims (portfolio_item_criteria,
    // not AI suggestions); assessment_criteria_met is the legacy free-text copy.
    const evRows = (e.data as Evidence[]) ?? [];
    if (evRows.length > 0) {
      const { data: crit } = await supabase
        .from('portfolio_item_criteria' as never)
        .select('portfolio_item_id, unit_code, ac_code')
        .in(
          'portfolio_item_id',
          evRows.map((r) => r.id)
        )
        .neq('source', 'ai_suggested');
      const byItem = new Map<string, string[]>();
      for (const c of (crit ?? []) as unknown as {
        portfolio_item_id: string;
        unit_code: string;
        ac_code: string;
      }[]) {
        const list = byItem.get(c.portfolio_item_id) ?? [];
        list.push(`${c.unit_code} AC ${c.ac_code}`);
        byItem.set(c.portfolio_item_id, list);
      }
      for (const r of evRows) r.criteria = byItem.get(r.id) ?? [];
    }
    setEvidence(evRows);
    // Grades the college recorded (RLS: the learner reads their own).
    const { data: cs } = await supabase
      .from('college_students')
      .select('id')
      .eq('user_id', user.id);
    const ids = ((cs ?? []) as { id: string }[]).map((r) => r.id);
    if (ids.length > 0) {
      const { data: g } = await supabase
        .from('college_grades')
        .select(
          'id, unit_name, assessment_type, grade, score, feedback, assessed_at, status, created_at'
        )
        .in('student_id', ids)
        .order('created_at', { ascending: false })
        .limit(30);
      setGrades((g ?? []) as unknown as Grade[]);
    }
    setLoaded(true);
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
  const whatsappHref = (r: ReadyLink) =>
    `https://wa.me/?text=${encodeURIComponent(`${r.text} ${r.url}`)}`;

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
        criteria: item?.criteria ?? item?.assessment_criteria_met ?? [],
      } as never)
      .select('token')
      .single();
    setBusy(false);
    if (error || !data) {
      toast({
        title: 'Could not create the request',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
      return;
    }
    setWItem(null);
    setWEmail('');
    setWitnessSheet(false);
    setReady(witnessReady((data as { token: string }).token));
    void load();
  };

  /** A new link for an expired invite. New invites go through InviteAssessorSheet. */
  const inviteAssessor = async (again: AssessorLink) => {
    if (!user) return;
    setBusy(true);
    await supabase
      .from('portfolio_assessor_links' as never)
      .update({ status: 'revoked' } as never)
      .eq('id', again.id);
    const { data, error } = await supabase
      .from('portfolio_assessor_links' as never)
      .insert({
        learner_id: user.id,
        assessor_email: again.assessor_email,
        assessor_name: again.assessor_name,
        role: again.role,
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
    setReady(
      assessorReady((data as { token: string }).token, again.assessor_name || again.assessor_email)
    );
    void load();
  };

  const withdraw = async (w: Witness) => {
    const { error } = await supabase
      .from('portfolio_witness_statements' as never)
      .update({ status: 'withdrawn' } as never)
      .eq('id', w.id);
    if (error) {
      toast({
        title: 'Could not withdraw',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
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
      toast({
        title: 'Could not remove access',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Access removed',
      description: `${l.assessor_name ?? l.assessor_email} can no longer see your portfolio.`,
    });
    await load();
  };

  const liveWitness = witnesses.filter((w) => w.status !== 'withdrawn');

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setWitnessSheet(true)}
          className={cn(LC_TILE, 'min-h-[72px] justify-center')}
        >
          <span className={LC_TOP_LINE} aria-hidden />
          <span className="text-[15px] font-semibold text-white">Ask a witness to sign</span>
          <span className="text-[12.5px] text-white">
            Your supervisor confirms what they saw. No account needed.
          </span>
        </button>
        <button
          type="button"
          onClick={() => setAssessorSheet(true)}
          className={cn(LC_TILE, 'min-h-[72px] justify-center')}
        >
          <span className={LC_TOP_LINE} aria-hidden />
          <span className="text-[15px] font-semibold text-white">Invite an assessor</span>
          <span className="text-[12.5px] text-white">
            They see your evidence and record decisions. You can remove them.
          </span>
        </button>
      </div>

      <section className="space-y-3">
        <CollegeSectionTitle title="Every criterion" />
        {user && (
          <LearnerAssessmentView
            learnerId={user.id}
            mode="learner"
            learnerName={profile?.full_name ?? undefined}
            focus={focusAcs.length > 0 ? { acs: focusAcs } : null}
          />
        )}
      </section>

      {grades.length > 0 && (
        <section className="space-y-3">
          <CollegeSectionTitle title="Grades from your college" />
          <ul className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
            {grades.map((g) => (
              <li key={g.id} data-focus-id={g.id} className="px-4 py-3 sm:px-5">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-white">
                      {g.unit_name ||
                        (g.assessment_type
                          ? sentence(g.assessment_type.replace(/_/g, ' '))
                          : 'Assessment')}
                    </p>
                    <p className="text-[12.5px] text-white">
                      {[
                        g.assessment_type && g.unit_name
                          ? sentence(g.assessment_type.replace(/_/g, ' '))
                          : null,
                        when(g.assessed_at ?? g.created_at),
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">
                    {g.grade ??
                      (g.score != null ? `${g.score}%` : sentence(g.status ?? 'Recorded'))}
                  </span>
                </div>
                {g.feedback && (
                  <p className="mt-1.5 whitespace-pre-line text-[13px] text-white">{g.feedback}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(liveWitness.length > 0 || links.length > 0) && (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
          {liveWitness.length > 0 && (
            <section className="space-y-3">
              <CollegeSectionTitle title="Witness statements" />
              <ul className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
                {liveWitness.map((w) => {
                  const expired = w.status === 'requested' && isPast(w.expires_at);
                  const isOpen = openStatement === w.id;
                  return (
                    <li key={w.id} className="px-4 py-3 sm:px-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-[14px] font-semibold leading-snug text-white">
                            {w.evidence_snapshot?.title ?? 'Evidence'}
                          </p>
                          <p className="text-[12.5px] text-white [overflow-wrap:anywhere]">
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
                            className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-white/[0.14] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.3] active:bg-white/[0.06] sm:self-auto"
                          >
                            {isOpen ? 'Hide' : 'Read'}
                          </button>
                        ) : expired ? (
                          <button
                            type="button"
                            disabled={busy || !w.evidence_snapshot}
                            onClick={async () => {
                              const item = evidence.find(
                                (e) => e.title === w.evidence_snapshot?.title
                              );
                              await withdraw(w);
                              if (item) await requestWitness(item.id);
                              else setWitnessSheet(true);
                            }}
                            className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-white/[0.14] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.3] active:bg-white/[0.06] sm:self-auto"
                          >
                            Send a new link
                          </button>
                        ) : (
                          <div className="flex shrink-0 gap-2">
                            <button
                              type="button"
                              aria-label="Share the link again"
                              onClick={() => setReady(witnessReady(w.token))}
                              className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-white/[0.14] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.3] active:bg-white/[0.06] sm:self-auto"
                            >
                              <Share2 className="h-4 w-4 text-white" strokeWidth={1.5} />
                              Share again
                            </button>
                            <button
                              type="button"
                              onClick={() => withdraw(w)}
                              className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-white/[0.14] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.3] active:bg-white/[0.06] sm:self-auto"
                            >
                              Withdraw
                            </button>
                          </div>
                        )}
                      </div>
                      {isOpen && w.statement && (
                        <div className="mt-2 rounded-lg border border-emerald-400/30 bg-emerald-500/[0.08] p-3">
                          <p className="whitespace-pre-line text-[13px] text-white">
                            “{w.statement}”
                          </p>
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
              <CollegeSectionTitle title="Your assessors" />
              <ul className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
                {links.map((l) => {
                  const expired = l.status === 'invited' && isPast(l.expires_at);
                  return (
                    <li
                      key={l.id}
                      data-focus-id={l.id}
                      className="flex flex-wrap items-center gap-2 px-4 py-3 sm:flex-nowrap sm:gap-3 sm:px-5"
                    >
                      <div className="min-w-0 basis-full sm:basis-auto sm:flex-1">
                        <p className="text-[14px] font-semibold leading-snug text-white [overflow-wrap:anywhere]">
                          {l.assessor_name ?? l.assessor_email}
                        </p>
                        {l.assessor_user_id &&
                          qualificationsLine(assessorQuals[l.assessor_user_id]) && (
                            <p className="truncate text-[12.5px] font-medium text-white">
                              {qualificationsLine(assessorQuals[l.assessor_user_id])}
                            </p>
                          )}
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
                          onClick={() =>
                            setReady(assessorReady(l.token, l.assessor_name ?? l.assessor_email))
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.14] touch-manipulation active:bg-white/[0.06]"
                        >
                          <Copy className="h-4 w-4 text-white" strokeWidth={1.5} />
                        </button>
                      )}
                      {expired ? (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => inviteAssessor(l)}
                          className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-white/[0.14] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.3] active:bg-white/[0.06] sm:self-auto"
                        >
                          Send a new invite
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => (l.status === 'active' ? setConfirmRevoke(l) : revoke(l))}
                          className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-white/[0.14] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.3] active:bg-white/[0.06] sm:self-auto"
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
      <FormSheet
        open={witnessSheet}
        onOpenChange={setWitnessSheet}
        width="wide"
        eyebrow="Witness statement"
        title="Ask a witness to sign"
        description="Pick the job they saw. You get a link to send them by text, WhatsApp or email. Your employer or supervisor signs with no account."
        footer={
          <button
            type="button"
            disabled={!wItem || busy}
            onClick={() => requestWitness()}
            className={primaryCn}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Create link
          </button>
        }
      >
        <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
          {evidence.length === 0 ? (
            <p className="text-[14px] text-white">
              Add a piece of evidence first, then ask someone to witness it.
            </p>
          ) : (
            <div
              role="radiogroup"
              aria-label="Evidence to be witnessed"
              className="divide-y divide-white/[0.08] rounded-xl border border-white/[0.12]"
            >
              {evidence.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  role="radio"
                  aria-checked={wItem === e.id}
                  onClick={() => setWItem(e.id)}
                  className={cn(
                    'flex min-h-11 w-full items-center gap-3 px-3 py-2.5 text-left touch-manipulation',
                    wItem === e.id && 'bg-white/[0.08]'
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'h-5 w-5 shrink-0 rounded-full border',
                      wItem === e.id ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.3]'
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] leading-snug text-white line-clamp-2">
                      {e.title}
                    </span>
                    <span className="block text-[12px] text-white">
                      {(e.criteria?.length ?? 0) > 0
                        ? `${e.criteria!.length} ${e.criteria!.length === 1 ? 'criterion' : 'criteria'}`
                        : 'No criteria yet'}{' '}
                      · {when(e.created_at)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
          <div>
            <label
              htmlFor="witness-email"
              className="mb-1 block text-[12px] font-medium text-white"
            >
              Their email (optional, for your records)
            </label>
            <input
              id="witness-email"
              className={inputCn}
              type="email"
              inputMode="email"
              value={wEmail}
              onChange={(e) => setWEmail(e.target.value)}
              placeholder="supervisor@company.co.uk"
            />
          </div>
        </div>
      </FormSheet>

      {/* Assessor invite (shared with the portfolio home) */}
      <InviteAssessorSheet
        open={assessorSheet}
        onOpenChange={(o) => {
          setAssessorSheet(o);
          if (!o) setAssessorRequest(null);
        }}
        initial={assessorRequest ?? undefined}
        onCreated={() => {
          if (assessorRequest) {
            void supabase
              .from('portfolio_assessor_requests' as never)
              .update({ status: 'invited' } as never)
              .eq('id', assessorRequest.id);
          }
          void load();
        }}
        onAskWitness={() => setWitnessSheet(true)}
      />

      {/* Link ready: share from a direct tap */}
      <FormSheet
        open={!!ready}
        onOpenChange={(v) => !v && setReady(null)}
        width="wide"
        eyebrow="Link ready"
        title={ready?.heading ?? 'Link ready'}
        description={ready ? `Send it to ${ready.who}. It works for 30 days.` : undefined}
        footer={
          <button type="button" onClick={() => setReady(null)} className={secondaryCn}>
            Done
          </button>
        }
      >
        {ready && (
          <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-3 h-5 w-5 shrink-0 text-emerald-400" />
              <p className="flex-1 break-all rounded-xl border border-white/[0.12] p-3 font-mono text-[12.5px] text-white">
                {ready.url}
              </p>
            </div>
            <div className="space-y-2.5">
              <button type="button" onClick={() => shareNow(ready)} className={primaryCn}>
                <Share2 className="h-4 w-4" /> Share
              </button>
              <a
                href={whatsappHref(ready)}
                target="_blank"
                rel="noreferrer"
                className={secondaryCn}
              >
                <MessageCircle className="h-4 w-4" /> Send on WhatsApp
              </a>
              <button type="button" onClick={() => copyNow(ready)} className={secondaryCn}>
                <Copy className="h-4 w-4" /> Copy link
              </button>
            </div>
          </div>
        )}
      </FormSheet>

      {/* Confirm removing an active assessor */}
      <FormSheet
        open={!!confirmRevoke}
        onOpenChange={(v) => !v && setConfirmRevoke(null)}
        width="wide"
        eyebrow="Your assessors"
        title={
          confirmRevoke
            ? `Remove ${confirmRevoke.assessor_name ?? confirmRevoke.assessor_email}?`
            : 'Remove assessor?'
        }
        footer={
          <div className="grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => setConfirmRevoke(null)} className={secondaryCn}>
              Keep them
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => confirmRevoke && revoke(confirmRevoke)}
              className={primaryCn}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Remove access
            </button>
          </div>
        }
      >
        <p className="py-2 text-[14px] text-white">
          They will no longer see your evidence or record decisions. Decisions they have already
          made stay on your record.
        </p>
      </FormSheet>
    </div>
  );
}

export default MyAssessmentCard;
