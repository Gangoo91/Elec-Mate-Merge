import { useEffect, useMemo, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSafeguardingQueue, type SafeguardingConcern } from '@/hooks/useSafeguardingQueue';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_LINK, CollegeEmpty, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { FilterChips } from '@/components/college/people/peopleKit';
import { VisHead } from '@/components/college/student360/Student360Visuals';
import { Donut, StatusPill, type Tone } from '@/components/college/quality/QualityKit';
import {
  QBTN,
  QBTN_PRIMARY,
  QCARD,
  QualityHeader,
  QualityLoading,
  QualityScreen,
} from '@/components/college/quality/QualityHubKit';
import { joinAnd, plural } from '@/components/college/quality/qualityText';
import { ageOn, useSafeguardingRouting } from '@/components/college/quality/useSafeguardingRouting';
// ELE-2043: decision + referrals, social care case flag, CP file transfers, inspection export.
import {
  CSC_CASE_LABEL,
  SG_DECISION_LABEL,
  useSafeguardingRecords,
} from '@/hooks/useSafeguardingRecords';
import { SafeguardingDecisionSheet } from '@/components/college/safeguarding/SafeguardingDecisionSheet';
import { CpFileTransfersSection } from '@/components/college/safeguarding/CpFileTransfersSection';
import { SafeguardingInspectionExport } from '@/components/college/safeguarding/SafeguardingInspectionExport';

/* ==========================================================================
   SafeguardingQueueSection — the designated leads' list of every safeguarding
   concern at the college (ELE-1911). Seen here whether or not a push was
   delivered, which is what makes the flow safe.

   Everyone sees WHERE a concern goes (the routing card): the college's
   designated leads, whether each can actually be alerted, and the fallback
   when there are none. Leads see concerns; when the college has no active lead
   with an account, the admins and heads of department who are alerted instead
   see and act on them (_safeguarding_reader). Anyone else never learns whether
   a concern exists.

   Concerns are restricted notes: RLS returns safeguarding-visibility notes to
   those readers only, so a tutor's own learner record never shows them.
   Learners under 18 on the date of the concern are flagged; a learner with no
   date of birth on file is labelled Age unknown, never assumed to be an adult.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-safeguarding',
  title: 'Safeguarding',
  what: 'Where safeguarding concerns about learners go, and, for designated safeguarding leads, the list of every concern logged at the college.',
  steps: [
    {
      title: 'Raise a concern',
      body: 'Open the learner’s record, add a note and choose Safeguarding. It is saved as a restricted note and sent straight to the designated leads.',
    },
    {
      title: 'Leads acknowledge it',
      body: 'A lead taps Acknowledge so everyone can see it has been seen. Unacknowledged concerns are shown in orange at the top.',
    },
    {
      title: 'Act and record',
      body: 'Open the learner record to see the full history and record what was done.',
    },
    {
      title: 'Record the decision',
      body: 'Record your decision and the reasons, any referral to children’s social care, the LADO or Channel with its date and reference, and whether the learner has a social worker. Leads only.',
    },
    {
      title: 'When a learner leaves',
      body: 'Learners who leave with a safeguarding record appear under Child protection files. Send the file securely within 5 days and record the confirmation of receipt.',
    },
  ],
  notes: [
    {
      title: 'Restricted notes',
      body: 'Safeguarding notes are visible only to designated leads and their deputies. Tutors, including the person who logged it, cannot read them back from the learner record.',
    },
    {
      title: 'Under 18',
      body: 'Learners who were under 18 on the day of the concern are children in law. Their concerns are flagged so the lead can follow the procedures for a minor, including telling the employer’s responsible person where appropriate. A learner with no date of birth on file shows as Age unknown, because their age can’t be checked.',
    },
    {
      title: 'No lead set?',
      body: 'If the college has no active designated lead or deputy with an account, concerns go to admins and heads of department instead, and they can read, acknowledge and close them until a lead is set. If there are none of those either, nobody is told. Set a lead in Compliance docs.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-400',
      label: 'Not yet acknowledged',
      body: 'No lead has confirmed they have seen it.',
    },
    { swatch: 'bg-red-500', label: 'Overdue', body: 'The action date has passed.' },
    { swatch: 'bg-sky-400', label: 'Open', body: 'Acknowledged, action in progress.' },
    { swatch: 'bg-emerald-500', label: 'Actioned', body: 'Action completed.' },
  ],
  source:
    'Keeping children safe in education 2026 (paras 74, 78, 150, 151, 218); DfE safeguarding guidance for post-16 and apprenticeship providers.',
};

/** How long a concern has waited, in words: "3 hours", "2 days". */
function waited(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const h = Math.max(0, Math.floor(ms / 3_600_000));
  if (h < 1) return 'under an hour';
  if (h < 48) return plural(h, 'hour');
  return plural(Math.floor(h / 24), 'day');
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

type Tab = 'open' | 'unack' | 'overdue' | 'under18' | 'all';

const isOverdue = (c: SafeguardingConcern) =>
  c.isOpen && c.actionByDate != null && new Date(c.actionByDate).getTime() < Date.now();
/** Age on the day the concern was logged (null when no date of birth). */
const ageAtConcern = (c: SafeguardingConcern) => ageOn(c.studentDob, new Date(c.createdAt));
const isMinor = (c: SafeguardingConcern) => {
  const a = ageAtConcern(c);
  return a != null && a < 18;
};
const ageUnknown = (c: SafeguardingConcern) => ageAtConcern(c) == null;
const stateOf = (c: SafeguardingConcern): { label: string; tone: Tone } =>
  c.isOpen && !c.isAcknowledged
    ? { label: 'Not yet acknowledged', tone: 'warn' }
    : isOverdue(c)
      ? { label: 'Overdue', tone: 'bad' }
      : c.isOpen
        ? { label: 'Open', tone: 'info' }
        : { label: 'Actioned', tone: 'good' };

export function SafeguardingQueueSection() {
  const navigate = useNavigate();
  const { loading, isDsl, viaFallback, concerns, openConcerns, openCount } = useSafeguardingQueue();
  const routing = useSafeguardingRouting();
  const records = useSafeguardingRecords(isDsl);
  const [tab, setTab] = useState<Tab>('open');
  // ?concern=<id> from a safeguarding notification: show it and scroll to it.
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get('concern');

  const counts = useMemo(() => {
    const unack = openConcerns.filter((c) => !c.isAcknowledged).length;
    const overdue = concerns.filter(isOverdue).length;
    const under18 = concerns.filter((c) => c.isOpen && isMinor(c)).length;
    const ageUnknownOpen = concerns.filter((c) => c.isOpen && ageUnknown(c)).length;
    const actioned = concerns.filter((c) => !c.isOpen).length;
    const ackOpen = openConcerns.filter((c) => c.isAcknowledged && !isOverdue(c)).length;
    return { unack, overdue, under18, ageUnknownOpen, actioned, ackOpen };
  }, [concerns, openConcerns]);

  const list = useMemo(() => {
    const base =
      tab === 'open'
        ? openConcerns
        : tab === 'unack'
          ? openConcerns.filter((c) => !c.isAcknowledged)
          : tab === 'overdue'
            ? concerns.filter(isOverdue)
            : tab === 'under18'
              ? concerns.filter((c) => c.isOpen && isMinor(c))
              : concerns;
    // Unacknowledged first, then overdue, then newest.
    const rank = (c: SafeguardingConcern) =>
      c.isOpen && !c.isAcknowledged ? 0 : isOverdue(c) ? 1 : c.isOpen ? 2 : 3;
    return [...base].sort((a, b) => rank(a) - rank(b) || b.createdAt.localeCompare(a.createdAt));
  }, [tab, concerns, openConcerns]);

  useEffect(() => {
    if (!focusId || loading) return;
    const target = concerns.find((c) => c.id === focusId);
    if (!target) return;
    if (!list.some((c) => c.id === focusId)) {
      setTab('all');
      return;
    }
    const t = setTimeout(() => {
      document
        .getElementById(`concern-${focusId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
    return () => clearTimeout(t);
  }, [focusId, loading, concerns, list]);

  // Last 6 months, concerns logged per month.
  const months = useMemo(() => {
    const out: Array<{ key: string; label: string; n: number }> = [];
    const now = new Date();
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleDateString('en-GB', { month: 'short' }),
        n: 0,
      });
    }
    for (const c of concerns) {
      const d = new Date(c.createdAt);
      const m = out.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (m) m.n += 1;
    }
    return out;
  }, [concerns]);
  const monthMax = Math.max(1, ...months.map((m) => m.n));

  /* The oldest concern nobody has acknowledged: the one to act on first. */
  const oldestUnack = useMemo(
    () =>
      [...openConcerns]
        .filter((c) => !c.isAcknowledged)
        .sort((x, y) => x.createdAt.localeCompare(y.createdAt))[0] ?? null,
    [openConcerns]
  );
  const showUnack = () => {
    setTab('unack');
    if (oldestUnack)
      window.setTimeout(
        () =>
          document
            .getElementById(`concern-${oldestUnack.id}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        150
      );
  };

  const sgBits = [
    counts.unack > 0 ? `${counts.unack} not acknowledged` : '',
    counts.overdue > 0 ? `${counts.overdue} past the action date` : '',
    counts.under18 > 0 ? `${counts.under18} about a learner under 18` : '',
  ].filter(Boolean);
  const summary = !isDsl
    ? 'Who your designated safeguarding leads are, and how a concern reaches them. If someone is in immediate danger, call 999 first.'
    : loading
      ? 'Reading concerns…'
      : openCount === 0
        ? `No open concerns. ${concerns.length > 0 ? `${plural(concerns.length, 'concern')} logged and closed.` : 'Nothing has been logged.'}`
        : `${plural(openCount, 'open concern')}${sgBits.length > 0 ? `: ${joinAnd(sgBits)}` : ', all acknowledged'}.`;
  const summarySub =
    isDsl && oldestUnack ? (
      <span className="font-semibold text-orange-300">
        The oldest has waited {waited(oldestUnack.createdAt)} for a lead to acknowledge it.
      </span>
    ) : isDsl && openCount > 0 ? (
      'Acknowledge new ones first, then act and close each with what was done.'
    ) : undefined;

  const header = (
    <QualityHeader
      eyebrow="Quality & compliance"
      title="Safeguarding"
      summary={summary}
      sub={summarySub}
      help={HELP}
      primary={
        isDsl ? (
          oldestUnack ? (
            <button type="button" className={QBTN_PRIMARY} onClick={showUnack}>
              Acknowledge the oldest
            </button>
          ) : undefined
        ) : (
          <button
            type="button"
            className={QBTN_PRIMARY}
            onClick={() => navigate('/college?section=students')}
          >
            Raise a concern
          </button>
        )
      }
    />
  );

  if (loading) {
    return (
      <QualityScreen>
        {header}
        <QualityLoading />
      </QualityScreen>
    );
  }

  return (
    <QualityScreen>
      {header}

      {isDsl && viaFallback && (
        <div className={cn(QCARD, 'flex items-start gap-3 !border-orange-400/50')}>
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
          <p className="text-[13.5px] leading-relaxed text-white">
            You can see these concerns because the college has no active designated safeguarding
            lead or deputy with an account, so admins and heads of department are alerted instead.
            Once a lead is set, only leads and deputies will see them.
          </p>
        </div>
      )}

      <div className={cn('grid grid-cols-1 items-stretch gap-4', isDsl && 'lg:grid-cols-2')}>
        <RoutingCard
          routing={routing.data}
          loading={routing.isLoading}
          onSetLead={() => navigate('/college?section=compliancedocs')}
        />

        {isDsl && (
          <motion.div variants={itemVariants} className={QCARD}>
            <VisHead title="Concerns by status" sub={`${concerns.length} logged in total`} />
            <div className="mt-4">
              <Donut
                emptyText="No concerns logged yet"
                centreSub="logged"
                segments={[
                  {
                    label: 'Not yet acknowledged',
                    n: counts.unack,
                    tone: 'warn',
                    onClick: () => setTab('unack'),
                  },
                  {
                    label: 'Overdue',
                    n: openConcerns.filter((c) => c.isAcknowledged && isOverdue(c)).length,
                    tone: 'bad',
                    onClick: () => setTab('overdue'),
                  },
                  { label: 'Open', n: counts.ackOpen, tone: 'info', onClick: () => setTab('open') },
                  {
                    label: 'Actioned',
                    n: counts.actioned,
                    tone: 'good',
                    onClick: () => setTab('all'),
                  },
                ]}
              />
            </div>
            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <p className="text-[12.5px] font-semibold text-white">Logged per month</p>
              <div className="mt-3 flex h-20 items-end gap-2">
                {months.map((m) => (
                  <div key={m.key} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                    <span className="text-[12px] font-semibold tabular-nums text-white">
                      {m.n || ''}
                    </span>
                    <motion.span
                      className="w-full rounded-t-md bg-elec-yellow"
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(m.n ? 6 : 2, (m.n / monthMax) * 48)}px` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{ opacity: m.n ? 1 : 0.2 }}
                    />
                    <span className="text-[12px] text-white">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {!isDsl ? (
        <section className="space-y-4">
          <CollegeSectionTitle title="Raising a concern" />
          <div className={cn(QCARD, 'grid grid-cols-1 gap-5 md:grid-cols-3')}>
            {[
              {
                n: '1',
                t: 'Open the learner’s record',
                b: 'Find them in Learners or search with the bar at the top.',
              },
              {
                n: '2',
                t: 'Add a note, choose Safeguarding',
                b: 'Write what you saw or were told, in their words where you can. Do not investigate.',
              },
              {
                n: '3',
                t: 'It goes to the leads',
                b: 'The note is restricted to designated leads, who are alerted at once (admins and heads of department if no lead is set). If someone is in immediate danger, call 999 first.',
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.24] text-[13px] font-bold text-white">
                  {s.n}
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-white">{s.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white">{s.b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={cn(QCARD, 'flex items-start gap-3')}>
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
            <p className="text-[13.5px] leading-relaxed text-white">
              The list of concerns is visible only to designated safeguarding leads and their
              deputies, or, while the college has no lead with an account, to admins and heads of
              department. If you should have access, ask an administrator to mark you as a lead.
            </p>
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <CollegeSectionTitle
            title="Concerns"
            sub={
              counts.unack > 0
                ? `${counts.unack} not yet acknowledged`
                : openCount > 0
                  ? `${openCount} open`
                  : 'Nothing open'
            }
          />
          <FilterChips<Tab>
            label="Which concerns"
            value={tab}
            onChange={setTab}
            items={[
              { value: 'open', label: 'Open', count: openCount },
              { value: 'unack', label: 'Not acknowledged', count: counts.unack },
              { value: 'overdue', label: 'Overdue', count: counts.overdue },
              { value: 'under18', label: 'Under 18', count: counts.under18 },
              { value: 'all', label: 'All', count: concerns.length },
            ]}
          />

          {list.length === 0 ? (
            <CollegeEmpty
              title={tab === 'all' ? 'No safeguarding concerns logged' : 'Nothing here'}
              body={
                tab === 'all'
                  ? 'When a member of staff adds a safeguarding note to a learner’s record it appears here at once and you are alerted.'
                  : 'No concerns match this filter. Open concerns appear here the moment they are logged.'
              }
              action={
                tab !== 'all' ? (
                  <button type="button" className={COLLEGE_LINK} onClick={() => setTab('all')}>
                    Show all concerns
                  </button>
                ) : undefined
              }
            />
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-3 xl:grid-cols-2">
              {list.map((c) => (
                <ConcernCard key={c.id} concern={c} focused={c.id === focusId} records={records} />
              ))}
            </div>
          )}
        </section>
      )}

      {isDsl && (
        <>
          <CpFileTransfersSection
            outgoing={records.outgoing}
            incoming={records.incoming}
            onChanged={() => void records.refresh()}
          />
          <div className="flex justify-end">
            <SafeguardingInspectionExport collegeId={records.collegeId} />
          </div>
        </>
      )}
    </QualityScreen>
  );
}

function RoutingCard({
  routing,
  loading,
  onSetLead,
}: {
  routing: ReturnType<typeof useSafeguardingRouting>['data'];
  loading: boolean;
  onSetLead: () => void;
}) {
  const leads = routing?.leads ?? [];
  const reachable = routing?.reachableLeads ?? 0;
  const fallback = routing?.fallback ?? [];
  const verdict: { tone: Tone; text: string } = loading
    ? { tone: 'neutral', text: 'Checking…' }
    : reachable > 0
      ? { tone: 'good', text: `Concerns reach ${reachable} ${reachable === 1 ? 'lead' : 'leads'}` }
      : fallback.length > 0
        ? { tone: 'warn', text: 'No lead set: going to admins' }
        : { tone: 'bad', text: 'Concerns reach nobody' };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        QCARD,
        'flex h-full flex-col',
        verdict.tone === 'bad' && '!border-orange-400/60'
      )}
    >
      <VisHead
        title="Where a concern goes"
        sub="Who is alerted the moment a safeguarding note is saved"
      />
      <div className="mt-3">
        <StatusPill tone={verdict.tone}>{verdict.text}</StatusPill>
      </div>
      <ul className="mt-4 divide-y divide-white/[0.06]">
        {leads.length === 0 && !loading && (
          <li className="py-3 text-[13.5px] leading-relaxed text-white">
            No designated safeguarding lead or deputy is set for this college.
          </li>
        )}
        {leads.map((l) => (
          <li key={l.id} className="flex min-h-[52px] items-center gap-3 py-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[12px] font-bold text-white">
              {l.name
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block break-words text-[15px] font-semibold leading-snug text-white">
                {l.name}
              </span>
              <span className="block text-[12.5px] text-white">
                {l.kind === 'dsl' ? 'Designated safeguarding lead' : 'Deputy lead'}
              </span>
            </span>
            {l.hasAccount ? (
              <StatusPill tone="good">Alerted</StatusPill>
            ) : (
              <StatusPill tone="warn">No account</StatusPill>
            )}
          </li>
        ))}
      </ul>
      {!loading && reachable === 0 && (
        <p className="mt-3 text-[13px] leading-relaxed text-white">
          {fallback.length > 0
            ? `Until a lead with an account is set, concerns are sent to ${fallback.map((f) => f.name).join(', ')} instead, who can read, acknowledge and close them.`
            : 'There is no admin or head of department with an account either, so a concern would be saved but nobody would be told.'}
        </p>
      )}
      {routing && routing.activeLearners > 0 && (
        <p className="mt-3 text-[13px] leading-relaxed text-white">
          {routing.withDob > 0 &&
            (routing.under18 > 0
              ? `${routing.under18} of the ${routing.withDob} active learners with a date of birth on file ${routing.under18 === 1 ? 'is' : 'are'} under 18. `
              : `None of the ${routing.withDob} active learners with a date of birth on file is under 18. `)}
          {routing.withoutDob > 0 &&
            `${routing.withoutDob} ${routing.withoutDob === 1 ? 'has' : 'have'} no date of birth on file, so under-18 can’t be checked${
              routing.withDob > 0 ? ' for them' : ''
            }.`}
        </p>
      )}
      <div className="mt-auto pt-3">
        <button type="button" onClick={onSetLead} className={COLLEGE_LINK}>
          {reachable > 0 ? 'Manage leads in Compliance docs' : 'Set a lead in Compliance docs'}
        </button>
      </div>
    </motion.div>
  );
}

function ConcernCard({
  concern,
  focused = false,
  records,
}: {
  concern: SafeguardingConcern;
  focused?: boolean;
  records: ReturnType<typeof useSafeguardingRecords>;
}) {
  const [deciding, setDeciding] = useState(false);
  const decision = records.currentByNote.get(concern.id) ?? null;
  const cscStatus = records.statusByStudent.get(concern.studentId) ?? null;
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [acking, setAcking] = useState(false);
  const [closing, setClosing] = useState<null | 'close' | 'reopen'>(null);
  const [outcome, setOutcome] = useState('');
  const [saving, setSaving] = useState(false);
  const state = stateOf(concern);
  const minor = isMinor(concern);
  const age = ageAtConcern(concern);
  const unknownAge = age == null;
  const overdue = isOverdue(concern);

  const openRecord = () =>
    navigate(`/college?section=student360&studentId=${concern.studentId}`, {
      state: { from: '/college?section=safeguardingqueue' },
    });

  const acknowledge = async () => {
    setAcking(true);
    try {
      const { error } = await supabase.rpc('acknowledge_safeguarding_concern', {
        p_concern_id: concern.id,
      });
      if (error) throw error;
      toast({ title: 'Acknowledged', description: 'Recorded that you have seen this concern.' });
      await queryClient.invalidateQueries({ queryKey: ['safeguarding-queue'] });
    } catch (e) {
      toast({
        title: 'Could not acknowledge',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setAcking(false);
    }
  };

  // ELE-1911: a lead closes the concern with what was done, or reopens it.
  const saveClosure = async () => {
    if (!closing || outcome.trim().length < 3) return;
    setSaving(true);
    try {
      const { error } = await supabase.rpc(
        'close_safeguarding_concern' as never,
        {
          p_concern_id: concern.id,
          p_outcome: outcome.trim(),
          p_reopen: closing === 'reopen',
        } as never
      );
      if (error) throw error;
      toast({
        title: closing === 'reopen' ? 'Reopened' : 'Concern closed',
        description: 'Recorded with your name and the date.',
      });
      setClosing(null);
      setOutcome('');
      await queryClient.invalidateQueries({ queryKey: ['safeguarding-queue'] });
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      id={`concern-${concern.id}`}
      variants={itemVariants}
      className={cn(
        '-mx-4 flex h-full scroll-mt-24 flex-col overflow-hidden max-sm:!rounded-none max-sm:!border-x-0 border-y card-surface sm:mx-0 sm:rounded-2xl sm:border',
        state.tone === 'warn' || state.tone === 'bad'
          ? '!border-orange-400/60'
          : '!border-white/[0.08]',
        focused && 'ring-2 ring-elec-yellow'
      )}
    >
      <button
        type="button"
        onClick={openRecord}
        className="flex w-full flex-1 items-start gap-3 px-4 py-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 break-words text-[15px] font-semibold leading-snug text-white">
              {concern.studentName}
            </span>
            {minor && <StatusPill tone="warn">Under 18 ({age})</StatusPill>}
            {unknownAge && <StatusPill tone="neutral">Age unknown</StatusPill>}
            <StatusPill tone={state.tone}>{state.label}</StatusPill>
            {cscStatus?.open_csc_case && (
              <StatusPill tone="info">
                Social worker
                {cscStatus.case_type ? ` · ${CSC_CASE_LABEL[cscStatus.case_type]}` : ''}
              </StatusPill>
            )}
          </span>
          <span className="mt-1 block text-[12.5px] leading-tight text-white">
            Logged {fmtDate(concern.createdAt)} by {concern.authorName}
          </span>
          {concern.isOpen && !concern.isAcknowledged && (
            <span className="mt-1 block text-[12.5px] font-semibold leading-tight text-orange-300">
              Waiting {waited(concern.createdAt)} for a lead to acknowledge it
            </span>
          )}
          {concern.title && (
            <span className="mt-3 block text-[13.5px] font-semibold leading-snug text-white">
              {concern.title}
            </span>
          )}
          <span className="mt-1 line-clamp-3 block text-[13px] leading-relaxed text-white">
            {concern.body}
          </span>
          {concern.actionRequired && (
            <span className="mt-3 block rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5">
              <span className="block text-[12px] font-semibold text-white">Action required</span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                {concern.actionRequired}
              </span>
              {concern.actionByDate && (
                <span
                  className={cn(
                    'mt-1 block text-[12px] tabular-nums',
                    overdue ? 'font-semibold text-orange-300' : 'text-white'
                  )}
                >
                  By {fmtDate(concern.actionByDate)}
                  {overdue ? ' (overdue)' : ''}
                </span>
              )}
            </span>
          )}
        </span>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
      </button>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-white/[0.06] px-4 py-2 sm:px-5">
        {concern.isAcknowledged ? (
          <span className="flex h-11 items-center text-[12.5px] text-white">
            Acknowledged{concern.acknowledgedAt ? ` ${fmtDate(concern.acknowledgedAt)}` : ''}
          </span>
        ) : (
          <button type="button" onClick={acknowledge} disabled={acking} className={QBTN_PRIMARY}>
            {acking ? 'Acknowledging…' : 'Acknowledge'}
          </button>
        )}
        {concern.closedAt ? (
          <button
            type="button"
            onClick={() => setClosing('reopen')}
            className="flex h-11 items-center px-2 text-[13px] font-medium text-white transition-colors touch-manipulation hover:text-elec-yellow"
          >
            Reopen
          </button>
        ) : (
          <button type="button" onClick={() => setClosing('close')} className={QBTN}>
            Close with outcome
          </button>
        )}
        <button type="button" onClick={() => setDeciding(true)} className={QBTN}>
          {decision ? 'Update decision' : 'Record decision'}
        </button>
        <button
          type="button"
          onClick={openRecord}
          className="-mr-2 flex h-11 items-center px-2 text-[13px] font-medium text-white transition-colors touch-manipulation hover:text-elec-yellow"
        >
          Open learner record
        </button>
      </div>
      <div
        className="border-t border-white/[0.06] px-4 py-3 sm:px-5"
        data-testid={`sg-decision-${concern.id}`}
      >
        {decision ? (
          <>
            <p className="text-[12px] font-semibold text-white">
              Decision: {SG_DECISION_LABEL[decision.decision]} · {decision.decided_by_name}{' '}
              {fmtDate(decision.decided_at)}
            </p>
            <p className="mt-0.5 line-clamp-3 whitespace-pre-line text-[12.5px] leading-snug text-white">
              {decision.rationale}
            </p>
            {(decision.la_referral_on ||
              decision.lado_referral_on ||
              decision.channel_referral_on) && (
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Referred:{' '}
                {[
                  decision.la_referral_on &&
                    `local authority ${fmtDate(decision.la_referral_on)}${decision.la_reference ? ` (${decision.la_reference})` : ''}`,
                  decision.lado_referral_on &&
                    `LADO ${fmtDate(decision.lado_referral_on)}${decision.lado_reference ? ` (${decision.lado_reference})` : ''}`,
                  decision.channel_referral_on &&
                    `Channel ${fmtDate(decision.channel_referral_on)}${decision.channel_reference ? ` (${decision.channel_reference})` : ''}`,
                ]
                  .filter(Boolean)
                  .join('; ')}
              </p>
            )}
          </>
        ) : (
          <p className="text-[12.5px] font-semibold text-orange-300">
            No decision recorded yet. Record it with your reasons.
          </p>
        )}
      </div>
      <SafeguardingDecisionSheet
        open={deciding}
        onOpenChange={setDeciding}
        noteId={concern.id}
        studentId={concern.studentId}
        studentName={concern.studentName}
        current={decision}
        status={cscStatus}
        onSaved={() => {
          void records.refresh();
          void queryClient.invalidateQueries({ queryKey: ['safeguarding-queue'] });
        }}
      />
      {concern.closureNote && (
        <div className="border-t border-white/[0.06] px-4 py-3 sm:px-5">
          <p
            className={cn(
              'text-[12px] font-semibold',
              concern.closedAt ? 'text-emerald-400' : 'text-white'
            )}
          >
            {concern.closedAt
              ? `Closed ${fmtDate(concern.closedAt)}`
              : 'Reopened. Earlier outcome and reasons'}
          </p>
          <p className="mt-0.5 whitespace-pre-line text-[12.5px] leading-snug text-white">
            {concern.closureNote}
          </p>
        </div>
      )}

      <FormSheet
        open={closing !== null}
        onOpenChange={(o) => {
          if (!o) setClosing(null);
        }}
        width="wide"
        eyebrow={`Safeguarding · ${concern.studentName}`}
        title={closing === 'reopen' ? 'Reopen this concern' : 'Close this concern'}
        description={
          closing === 'reopen'
            ? 'Say why it is being reopened. The earlier outcome stays on record.'
            : 'Record what was done and the outcome. It is kept with your name and the date, and only leads can read it.'
        }
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => setClosing(null)} className={buttonSecondaryCn}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void saveClosure()}
              disabled={saving || outcome.trim().length < 3}
              className={buttonPrimaryCn}
            >
              {saving ? 'Saving…' : closing === 'reopen' ? 'Reopen' : 'Close concern'}
            </button>
          </div>
        }
      >
        <div>
          <label htmlFor={`sg-out-${concern.id}`} className={labelCn}>
            {closing === 'reopen' ? 'Reason' : 'What was done and the outcome'}
          </label>
          <textarea
            id={`sg-out-${concern.id}`}
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            rows={6}
            className={textareaCn}
            placeholder={
              closing === 'reopen'
                ? 'Why it needs looking at again'
                : 'For example: spoke with the learner and parent, referred to early help, no further action needed'
            }
          />
        </div>
      </FormSheet>
    </motion.div>
  );
}
