import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import {
  useCurrentRiskForStudents,
  type RiskFactor,
  type StudentRiskRow,
} from '@/hooks/useStudentRisk';
import {
  CONTACT_METHOD_LABEL,
  LogContactSheet,
  type ContactMethod,
} from '@/components/college/quality/LogContactSheet';
import { CollegeEmpty, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { QuietTabs } from '@/components/college/quality/QualityChoices';
import { VisHead } from '@/components/college/student360/Student360Visuals';
import { QCARD, QLIST } from '@/components/college/quality/QualityHubKit';
import { BarList, Donut, StatusPill, type Tone } from '@/components/college/quality/QualityKit';

/* ==========================================================================
   RiskFlagsPanel (ELE-1909) — learners at risk, explained in plain words,
   with a "contacted" state.

   Reads the current student_risk_scores row per learner (the same one Student
   360 and the tutor home read). Each flag's factors are turned into a plain
   sentence with what to do about it.

   "Contacted" comes from data the college already records: a 1-2-1 or
   intervention note on the learner since they were first flagged at high or
   critical. "First flagged" is the earliest row of the unbroken run of
   high/critical scores in student_risk_scores, newest first. It is NOT the
   current row's computed_at: the nightly job rewrites that, which used to
   reset everyone to "not contacted" every morning. Log contact opens
   LogContactSheet: one tap for a call, 1-2-1, email or referral, written as a
   pastoral note (contact_method says which), so the contact is evidence on
   the learner record, not a tick box here.
   ========================================================================== */

type Level = StudentRiskRow['level'];
const LEVEL_LABEL: Record<Level, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
const LEVEL_TONE: Record<Level, Tone> = {
  critical: 'bad',
  high: 'warn',
  medium: 'volt',
  low: 'good',
};
const LEVEL_RANK: Record<Level, number> = { critical: 0, high: 1, medium: 2, low: 3 };

/** Plain-words headline for each factor key. The server's own label is kept
 *  underneath because it carries the learner's actual figure. */
const PLAIN: Record<string, { title: string; todo: string }> = {
  behind_pace: {
    title: 'Behind where they should be by now',
    todo: 'Agree a catch-up plan and check the end date is realistic.',
  },
  otj_gap: {
    title: 'No off-the-job hours logged recently',
    todo: 'Ask the learner and employer what training has happened and get it logged.',
  },
  portfolio_empty: {
    title: 'Nothing in the portfolio yet',
    todo: 'Show them how to upload evidence and set a first piece to add.',
  },
  ac_velocity_zero: {
    title: 'No new evidence in the last two weeks',
    todo: 'Book a portfolio review or catch-up session.',
  },
  open_flags: {
    title: 'An open pastoral flag',
    todo: 'Read the pastoral notes and close or follow up the flag.',
  },
  observation_stale: {
    title: 'Not observed for a long time',
    todo: 'Book an observed practical or professional discussion.',
  },
  no_observations: {
    title: 'Never observed at work or in a lesson',
    todo: 'Book an observation to evidence competence.',
  },
  low_attendance: {
    title: 'Attendance is low',
    todo: 'Talk to them about what is getting in the way, and tell the employer.',
  },
  attendance_low: {
    title: 'Attendance is low',
    todo: 'Talk to them about what is getting in the way, and tell the employer.',
  },
  portfolio_stale: {
    title: 'Portfolio not updated for a long time',
    todo: 'Set a piece of evidence to add this week and check they can upload.',
  },
  review_overdue: {
    title: 'Progress review is overdue',
    todo: 'Book the three-way review with the employer.',
  },
};

const sev = (f: RiskFactor) => f.severity ?? f.weight ?? 0;
const plainOf = (f: RiskFactor) => (f.key && PLAIN[f.key]) || null;

interface Contact {
  at: string;
  kind: string;
  method: ContactMethod | null;
}

/** "Call 3 Oct", "1-2-1 3 Oct"; older notes with no method say "Contacted". */
const contactLabel = (c: Contact) =>
  `${c.method ? CONTACT_METHOD_LABEL[c.method] : c.kind === 'one_to_one' ? '1-2-1' : 'Contacted'} ${fmtDay(c.at)}`;

function fmtDay(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

type Show = 'needs' | 'contacted' | 'all';

export function RiskFlagsPanel({
  students,
}: {
  students: Array<{ id: string; name: string; status?: string | null }>;
}) {
  const navigate = useNavigate();
  const active = useMemo(
    () => students.filter((s) => (s.status ?? '').toLowerCase() === 'active'),
    [students]
  );
  const ids = useMemo(() => active.map((s) => s.id), [active]);
  const nameOf = useMemo(() => new Map(active.map((s) => [s.id, s.name])), [active]);
  const { byStudent, loading } = useCurrentRiskForStudents(ids);
  const [contacts, setContacts] = useState<Map<string, Contact>>(new Map());
  /** When each flagged learner was first flagged at high/critical (this run). */
  const [flaggedSince, setFlaggedSince] = useState<Map<string, string>>(new Map());
  const [show, setShow] = useState<Show>('needs');
  const [logFor, setLogFor] = useState<{ id: string; name: string } | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const flagged = useMemo(
    () =>
      [...byStudent.values()]
        .filter((r) => r.level === 'critical' || r.level === 'high')
        .sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level] || b.score - a.score),
    [byStudent]
  );
  const flaggedIds = flagged.map((r) => r.student_id).join(',');

  // When each learner was first flagged, then the latest 1-2-1 / intervention
  // per flagged learner since the earliest of those dates.
  const loadContacts = useCallback(async () => {
    const list = flaggedIds ? flaggedIds.split(',') : [];
    if (list.length === 0) {
      setContacts(new Map());
      setFlaggedSince(new Map());
      return;
    }
    const { data: history } = await supabase
      .from('student_risk_scores')
      .select('student_id, computed_at, level')
      .in('student_id', list)
      .order('computed_at', { ascending: false })
      .limit(5000);
    const firstFlagged = new Map<string, string>();
    const broken = new Set<string>();
    for (const r of (history ?? []) as Array<{
      student_id: string;
      computed_at: string;
      level: string;
    }>) {
      if (broken.has(r.student_id)) continue;
      if (r.level === 'high' || r.level === 'critical')
        firstFlagged.set(r.student_id, r.computed_at);
      else broken.add(r.student_id);
    }
    setFlaggedSince(firstFlagged);

    const earliest = [...firstFlagged.values()].sort()[0];
    const since = earliest ?? new Date(Date.now() - 60 * 86400_000).toISOString();
    const { data } = await supabase
      .from('pastoral_notes')
      .select('student_id, kind, contact_method, created_at')
      .in('student_id', list)
      .in('kind', ['one_to_one', 'intervention'])
      .gte('created_at', since)
      .order('created_at', { ascending: false });
    const m = new Map<string, Contact>();
    for (const r of (data ?? []) as unknown as Array<{
      student_id: string;
      kind: string;
      contact_method: ContactMethod | null;
      created_at: string;
    }>) {
      if (!m.has(r.student_id))
        m.set(r.student_id, { at: r.created_at, kind: r.kind, method: r.contact_method ?? null });
    }
    setContacts(m);
  }, [flaggedIds]);

  useEffect(() => {
    void loadContacts();
  }, [loadContacts]);

  // Contacted = a 1-2-1 or intervention since the learner was first flagged.
  const contactedSince = (r: StudentRiskRow) => {
    const c = contacts.get(r.student_id);
    const since = flaggedSince.get(r.student_id) ?? r.computed_at;
    return c && new Date(c.at).getTime() >= new Date(since).getTime() ? c : null;
  };

  const counts = useMemo(() => {
    const lv: Record<Level, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const r of byStudent.values()) lv[r.level] += 1;
    const reasons = new Map<string, { title: string; n: number }>();
    for (const r of flagged) {
      for (const f of r.factors ?? []) {
        const k = f.key ?? f.label;
        const title = plainOf(f)?.title ?? f.label;
        const cur = reasons.get(k) ?? { title, n: 0 };
        cur.n += 1;
        reasons.set(k, cur);
      }
    }
    return { lv, reasons: [...reasons.values()].sort((a, b) => b.n - a.n) };
  }, [byStudent, flagged]);

  const contactedCount = flagged.filter((r) => contactedSince(r)).length;
  const rows = flagged.filter((r) =>
    show === 'needs' ? !contactedSince(r) : show === 'contacted' ? !!contactedSince(r) : true
  );

  return (
    <section className="space-y-4">
      <CollegeSectionTitle
        title="Learners at risk"
        sub={
          loading
            ? 'Working it out…'
            : flagged.length === 0
              ? 'No learner is at high or critical risk.'
              : `${flagged.length} at high or critical risk · ${contactedCount} contacted since they were flagged`
        }
      />

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        <motion.div variants={itemVariants} className={QCARD}>
          <VisHead
            title="Risk across active learners"
            sub={`${byStudent.size} of ${active.length} have a current risk score`}
          />
          <div className="mt-4">
            <Donut
              emptyText="No risk scores yet. They are worked out overnight."
              centreSub="learners"
              segments={(['critical', 'high', 'medium', 'low'] as Level[]).map((l) => ({
                label: LEVEL_LABEL[l],
                n: counts.lv[l],
                tone: LEVEL_TONE[l],
              }))}
            />
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className={QCARD}>
          <VisHead
            title="Why they are flagged"
            sub="The reasons behind high and critical risk, most common first"
          />
          <div className="mt-4">
            {counts.reasons.length === 0 ? (
              <Donut segments={[]} emptyText="Nobody is flagged" />
            ) : (
              <BarList
                wideLabels
                rows={counts.reasons
                  .slice(0, 6)
                  .map((r) => ({ label: r.title, n: r.n, tone: 'warn' }))}
              />
            )}
          </div>
        </motion.div>
      </div>

      {flagged.length > 0 && (
        <QuietTabs<Show>
          label="Filter flagged learners"
          tabs={[
            {
              key: 'needs',
              label: 'Not contacted',
              count: flagged.length - contactedCount,
              warn: true,
            },
            { key: 'contacted', label: 'Contacted', count: contactedCount },
            { key: 'all', label: 'All flagged', count: flagged.length },
          ]}
          value={show}
          onChange={setShow}
        />
      )}

      {!loading && flagged.length > 0 && rows.length === 0 && (
        <CollegeEmpty
          title={show === 'needs' ? 'Everyone flagged has been contacted' : 'Nobody contacted yet'}
          body={
            show === 'needs'
              ? 'Each flagged learner has a 1-2-1 or intervention since they were flagged.'
              : 'Log contact against a learner once you have spoken to them.'
          }
        />
      )}

      {rows.length > 0 && (
        <motion.ul variants={itemVariants} className={QLIST}>
          {rows.map((r) => {
            const name = nameOf.get(r.student_id) ?? 'Learner';
            const c = contactedSince(r);
            const factors = [...(r.factors ?? [])].sort((a, b) => sev(b) - sev(a));
            const open = openId === r.student_id;
            const lead = factors[0];
            return (
              <li key={r.student_id}>
                <div className="flex min-h-[64px] items-center gap-3 px-4 py-3 sm:px-5">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : r.student_id)}
                    aria-expanded={open}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left touch-manipulation"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-[14.5px] font-semibold leading-tight text-white">
                          {name}
                        </span>
                        <StatusPill tone={LEVEL_TONE[r.level]}>{LEVEL_LABEL[r.level]}</StatusPill>
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-white sm:truncate">
                        {lead ? (plainOf(lead)?.title ?? lead.label) : 'Flagged'}
                        {factors.length > 1 ? ` and ${factors.length - 1} more` : ''}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 shrink-0 text-white transition-transform',
                        open && 'rotate-90'
                      )}
                      aria-hidden
                    />
                  </button>
                  <span className="hidden shrink-0 sm:block">
                    {c ? (
                      <StatusPill tone="good">{contactLabel(c)}</StatusPill>
                    ) : (
                      <StatusPill tone="warn">Not contacted</StatusPill>
                    )}
                  </span>
                </div>
                {open && (
                  <div className="space-y-3 px-4 pb-4 sm:px-5">
                    <span className="sm:hidden">
                      {c ? (
                        <StatusPill tone="good">{contactLabel(c)}</StatusPill>
                      ) : (
                        <StatusPill tone="warn">Not contacted</StatusPill>
                      )}
                    </span>
                    <ul className="space-y-2.5">
                      {factors.map((f, i) => {
                        const p = plainOf(f);
                        return (
                          <li
                            key={`${f.key ?? f.label}-${i}`}
                            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5"
                          >
                            <p className="text-[13.5px] font-semibold text-white">
                              {p?.title ?? f.label}
                            </p>
                            {p && <p className="mt-0.5 text-[12.5px] text-white">{f.label}</p>}
                            <p className="mt-1 text-[12.5px] leading-snug text-white">
                              <span className="font-semibold">What to do: </span>
                              {p?.todo ??
                                f.detail ??
                                'Check the learner record and agree a next step.'}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="text-[12px] text-white">
                      {flaggedSince.get(r.student_id)
                        ? `Flagged since ${fmtDay(flaggedSince.get(r.student_id)!)}. `
                        : ''}
                      Risk last worked out {fmtDay(r.computed_at)}. What to do comes from the
                      college's risk rules, not AI.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setLogFor({ id: r.student_id, name })}
                        className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[13.5px] font-semibold text-black touch-manipulation"
                      >
                        {c ? 'Log another contact' : 'Log contact'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/college?section=student360&studentId=${r.student_id}`)
                        }
                        className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
                      >
                        Open learner record
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </motion.ul>
      )}

      {logFor && (
        <LogContactSheet
          open={!!logFor}
          onOpenChange={(v) => !v && setLogFor(null)}
          studentId={logFor.id}
          studentName={logFor.name}
          onSaved={() => {
            setLogFor(null);
            void loadContacts();
          }}
        />
      )}
    </section>
  );
}
