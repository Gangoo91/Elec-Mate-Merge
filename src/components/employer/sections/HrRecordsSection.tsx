/**
 * People > Right to work and HR records (ELE-2061, ELE-2075).
 *
 * Left: the work. Who needs a right-to-work check, what people sent from
 * Worker Tools, probation reviews and qualifying dates, and leaver records
 * that have reached the end of their retention period.
 * Right: the firm's rule for unchecked people (warn or block), the retention
 * schedule with its sources, and where the rules come from.
 *
 * Office managers see right-to-work status only. Everything else is owner
 * and admins (the RPCs return nothing to anyone else).
 */
import { useMemo, useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import type { Employee } from '@/services/employeeService';
import { toTeamRole } from '@/lib/teamRoles';
import { TeamMemberSheet } from '@/components/employer/TeamMemberSheet';
import { EditEmployeeDialog } from '@/components/employer/dialogs/EditEmployeeDialog';
import { AssignToJobDialog } from '@/components/employer/dialogs/AssignToJobDialog';
import { SendMessageDialog } from '@/components/employer/dialogs/SendMessageDialog';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  LoadingBlocks,
  Field,
  inputClass,
} from '@/components/employer/editorial';
import {
  FigureStrip,
  HeroActions,
  HeroPrimary,
  PlainEmpty,
  Row,
  RowList,
  Segments,
  StatusPill,
  colClass,
  frameClass,
  plural,
  rowBtnPrimary,
  rowBtnSecondary,
  rowsClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import FormSheet from '@/components/forms/FormSheet';
import { Checkbox } from '@/components/ui/checkbox';
import { checkboxClass } from '@/components/employer/editorial';
import { PageHelpButton, HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import {
  RTW_STATUS_LABEL,
  RTW_STATUS_TONE,
  rtwBlocks,
  useEmploymentLaw,
  useHrSettings,
  useRtwTeamStatus,
  useSaveHrSettings,
  useWaitingRtwSubmissions,
  type RtwStatusRow,
} from '@/hooks/useRightToWork';
import {
  qualifyingDate,
  useAnonymiseApplications,
  useAnonymiseLeaver,
  useHrPeople,
  useRetentionQueue,
  useRemoveFitNoteFiles,
  useRemoveOrphanRtwFiles,
  useRetentionSchedule,
  useSavePersonHr,
  type LeaverPart,
  type RetentionLeaver,
} from '@/hooks/useHrRecords';
import { RecordRtwCheckSheet } from '@/components/employer/people/PersonRightToWorkCard';
import { todayIso } from '@/lib/leavingDate';

const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');
const short = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM') : '');
const daysTo = (d: string) => differenceInCalendarDays(parseISO(d), new Date());

const PART_WORD: Record<LeaverPart, string> = {
  contact: 'contact details',
  rtw: 'right-to-work copies',
  sickness: 'old sickness records',
  dob: 'date of birth',
  signatures: 'signatures',
  name: 'name',
};

export const HR_RECORDS_HELP: PageHelpContent = {
  id: 'employer-hr-records',
  title: 'Right to work and HR records',
  what: 'Right-to-work checks for everyone who works for you, how long to keep each record, and, if you use probation, its review dates and when unfair dismissal protection starts.',
  steps: [
    {
      title: 'Check everyone before they start',
      body: 'Open a person and tap Record a check. Pick how you checked, add a copy, and set the follow-up date if their permission is time-limited. People can send their documents or share code from Worker Tools.',
    },
    {
      title: 'Choose warn or block',
      body: 'When someone has no check, assigning them to a job or booking them either warns or stops. Approving hours they have already worked and issuing their statement always go ahead with a warning, because work done must be paid.',
    },
    {
      title: 'Set probation dates, if you use probation',
      body: 'Probation is your choice, not a legal requirement. If you use it, add the end date on the person sheet and you get a reminder 30 days and 7 days before the review, and before the date to decide by.',
    },
    {
      title: 'Clear old records',
      body: 'Records to review lists leavers and applicants whose records have reached the end of their period. Removing them keeps what the law still needs.',
    },
  ],
  notes: [
    {
      title: 'Who sees what',
      body: 'Office managers see who is checked. Only the owner and admins see the check details, the copies, probation and the retention queue.',
    },
  ],
  source:
    'Home Office employer’s guide to right to work checks (1 Oct 2026); Border Security, Asylum and Immigration Act 2025 s.48; Employment Rights Act 2025 s.25 and s.28 (England, Scotland, Wales); Employment Rights (Northern Ireland) Order 1996 art.140; gov.uk record-keeping guidance. This is a guide, not legal advice.',
};

const LAW_LINKS: Array<{ title: string; detail: string; url: string }> = [
  {
    title: 'Right to work checks: employer’s guide',
    detail: 'Home Office, 1 October 2026',
    url: 'https://www.gov.uk/government/publications/right-to-work-checks-employers-guide',
  },
  {
    title: 'Subcontractors and workers in scope',
    detail: 'Border Security, Asylum and Immigration Act 2025 s.48, from 1 Oct 2026',
    url: 'https://www.legislation.gov.uk/ukpga/2025/31/section/48',
  },
  {
    title: 'Unfair dismissal after 6 months',
    detail: 'England, Scotland and Wales, for dismissals from 1 January 2027',
    url: 'https://www.gov.uk/dismiss-staff/eligibility-to-claim-unfair-dismissal',
  },
  {
    title: 'Unfair dismissal in Northern Ireland',
    detail: 'Still usually 1 year (nidirect)',
    url: 'https://www.nidirect.gov.uk/articles/what-do-if-you-are-unfairly-dismissed',
  },
  {
    title: 'Fire and rehire',
    detail: 'Employment Rights Act 2025 s.28',
    url: 'https://www.legislation.gov.uk/ukpga/2025/36/section/28',
  },
];

type RtwFilter = 'todo' | 'all';

export function HrRecordsSection() {
  const { data: roleInfo } = useEmployerRole();
  const isAdmin = roleInfo?.canSeeMoney ?? false;
  const { data: rtw = [], isLoading: rtwLoading } = useRtwTeamStatus();
  const { data: waiting = [] } = useWaitingRtwSubmissions();
  const { data: settings } = useHrSettings();
  const saveSettings = useSaveHrSettings();
  const { data: people = [] } = useHrPeople();
  const { data: schedule = [] } = useRetentionSchedule();
  const { data: queue } = useRetentionQueue(isAdmin);
  const anonApps = useAnonymiseApplications();
  const removeOrphans = useRemoveOrphanRtwFiles();
  const removeFitNotes = useRemoveFitNoteFiles();
  const { data: lawInfo } = useEmploymentLaw();
  const law = lawInfo?.law ?? null;
  const { data: employees = [] } = useEmployees();
  const [memberId, setMemberId] = useState<string | null>(null);
  const [memberAction, setMemberAction] = useState<'edit' | 'assign' | 'message' | null>(null);
  const member: Employee | null = employees.find((e) => e.id === memberId) ?? null;
  const [filter, setFilter] = useState<RtwFilter>('todo');
  const [recordFor, setRecordFor] = useState<RtwStatusRow | null>(null);
  const [leaver, setLeaver] = useState<RetentionLeaver | null>(null);

  const missing = rtw.filter((r) => r.status === 'missing');
  const overdue = rtw.filter((r) => r.status === 'overdue');
  const due = rtw.filter((r) => r.status === 'due');
  const checked = rtw.filter((r) => r.status === 'checked' || r.status === 'not_required');
  const todo = rtw
    .filter((r) => r.status !== 'checked' && r.status !== 'not_required')
    .sort((a, b) => {
      const rank = (s: string) => (s === 'overdue' ? 0 : s === 'missing' ? 1 : 2);
      return rank(a.status) - rank(b.status) || a.name.localeCompare(b.name);
    });
  const shown = filter === 'todo' ? todo : [...rtw].sort((a, b) => a.name.localeCompare(b.name));
  const nameOf = (id: string | null) => rtw.find((r) => r.roster_id === id)?.name ?? 'Team member';

  // Probation and qualifying dates for active employees, soonest first.
  const dates = useMemo(() => {
    const out: Array<{
      id: string;
      name: string;
      review: string | null;
      qualifying: string | null;
      outcome: string | null;
    }> = [];
    for (const p of people) {
      if ((p.status ?? '').toLowerCase() === 'archived' || p.team_role === 'Subcontractor')
        continue;
      const openProbation = !p.probation_outcome || p.probation_outcome === 'extended';
      const review = openProbation ? (p.probation_review_date ?? p.probation_end_date) : null;
      const q = p.qualifying_date ?? qualifyingDate(p.start_date, law);
      const qSoon = q && daysTo(q) >= 0 && daysTo(q) <= 90 ? q : null;
      if (review || qSoon)
        out.push({
          id: p.roster_id,
          name: p.name,
          review,
          qualifying: qSoon,
          outcome: p.probation_outcome,
        });
    }
    const key = (x: (typeof out)[number]) => x.review ?? x.qualifying ?? '9999';
    return out.sort((a, b) => key(a).localeCompare(key(b)));
  }, [people, law]);
  const reviewsSoon = dates.filter((d) => d.review && daysTo(d.review) <= 30).length;

  const leaversReady = (queue?.leavers ?? []).filter((l) => l.ready.length > 0 || l.needs_left_on);
  const appsReady = queue?.applications ?? [];
  const orphans = queue?.orphan_files ?? [];
  const fitNoteFiles = queue?.fit_note_files ?? [];
  const reviewCount =
    leaversReady.length +
    (appsReady.length > 0 ? 1 : 0) +
    (orphans.length > 0 ? 1 : 0) +
    (fitNoteFiles.length > 0 ? 1 : 0);

  const needCheck = missing.length + overdue.length;
  const line = (() => {
    if (rtwLoading) return 'Loading your team.';
    const bits: string[] = [];
    if (needCheck > 0)
      bits.push(`${plural(needCheck, 'person needs', 'people need')} a right-to-work check`);
    if (due.length > 0) bits.push(`${plural(due.length, 'follow-up')} due soon`);
    if (isAdmin && reviewsSoon > 0)
      bits.push(`${plural(reviewsSoon, 'probation review')} this month`);
    if (isAdmin && reviewCount > 0) bits.push(`${plural(reviewCount, 'record')} to review`);
    if (bits.length === 0)
      return rtw.length === 0
        ? 'Nobody on the team yet.'
        : 'Everyone is checked. Nothing waiting on you.';
    const s = bits.join(', ');
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}.`;
  })();

  const firstTodo = todo.find((r) => rtwBlocks(r.status)) ?? todo[0];

  if (rtwLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Right to work and HR records" description="Loading your team." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  // The person sheet opens over this page; Back returns here.
  const openPerson = (id: string) => {
    setMemberAction(null);
    setMemberId(id);
  };

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Right to work and HR records"
        description={line}
        actions={
          <HeroActions stretchFirst>
            {isAdmin && firstTodo ? (
              <HeroPrimary onClick={() => setRecordFor(firstTodo)}>Record a check</HeroPrimary>
            ) : null}
            <PageHelpButton help={HR_RECORDS_HELP} askContext={{ page: 'hrrecords' }} />
          </HeroActions>
        }
      />
      <HowItWorks help={HR_RECORDS_HELP} askContext={{ page: 'hrrecords' }} />

      <FigureStrip
        figures={[
          {
            label: 'Checked',
            value: `${checked.length} of ${rtw.length}`,
            sub: 'Right to work',
            tone: rtw.length > 0 && checked.length === rtw.length ? 'green' : undefined,
          },
          {
            label: 'Need a check',
            value: needCheck,
            sub: overdue.length > 0 ? `${overdue.length} follow-up overdue` : 'No valid check',
            tone: needCheck > 0 ? 'red' : undefined,
            onOpen: () => setFilter('todo'),
          },
          {
            label: 'Follow-ups due',
            value: due.length,
            sub: 'In the next 28 days',
            tone: due.length > 0 ? 'volt' : undefined,
          },
          isAdmin
            ? {
                label: 'Probation reviews',
                value: reviewsSoon,
                sub: 'In the next 30 days',
                tone: reviewsSoon > 0 ? 'volt' : undefined,
              }
            : { label: 'Sent in', value: '–', sub: 'Owner and admins' },
        ]}
      />

      <div className={twoColClass}>
        <div className={colClass}>
          <section data-help="hr.rtw">
            <PanelTitle
              title="Right to work"
              meta={filter === 'todo' ? `${todo.length} to do` : `${rtw.length}`}
            />
            <Segments
              className="mb-3"
              items={[
                { value: 'todo', label: 'Needs doing', count: todo.length },
                { value: 'all', label: 'Everyone', count: rtw.length },
              ]}
              value={filter}
              onChange={setFilter}
            />
            {shown.length === 0 ? (
              <PlainEmpty
                text={
                  filter === 'todo'
                    ? 'Everyone has a valid check. Follow-ups show here 28 days before they are due.'
                    : 'Nobody on the team yet.'
                }
              />
            ) : (
              <RowList>
                {shown.map((r) => (
                  <Row
                    key={r.roster_id}
                    title={r.name}
                    detail={[
                      r.team_role === 'Subcontractor'
                        ? 'Subcontractor'
                        : r.team_role || 'Team member',
                      r.status === 'overdue' || r.status === 'due'
                        ? `follow-up ${r.status === 'overdue' ? 'was due' : 'due'} ${short(r.follow_up_due)}`
                        : r.status === 'not_required'
                          ? r.reason || 'not required'
                          : r.checked_on
                            ? `checked ${short(r.checked_on)}`
                            : r.submitted_at
                              ? 'sent their details'
                              : 'no check',
                    ].join(' · ')}
                    trailing={
                      <StatusPill tone={RTW_STATUS_TONE[r.status]}>
                        {RTW_STATUS_LABEL[r.status]}
                      </StatusPill>
                    }
                    onClick={() => openPerson(r.roster_id)}
                  />
                ))}
              </RowList>
            )}
          </section>

          {isAdmin && waiting.length > 0 && (
            <section>
              <PanelTitle title="Sent from Worker Tools" meta={waiting.length} />
              <RowList>
                {waiting.map((s) => (
                  <Row
                    key={s.id}
                    title={nameOf(s.roster_id)}
                    detail={`${s.share_code ? `Share code ${s.share_code}` : `${plural(s.document_paths.length, 'photo')}`} · ${short(s.submitted_at)}`}
                    trailing={<StatusPill tone="volt">Check</StatusPill>}
                    onClick={() => s.roster_id && openPerson(s.roster_id)}
                  />
                ))}
              </RowList>
            </section>
          )}

          {isAdmin && (
            <section>
              <PanelTitle title="Probation and qualifying dates" meta={dates.length || undefined} />
              {dates.length === 0 ? (
                <PlainEmpty
                  text={
                    law
                      ? 'No probation reviews open and nobody reaches unfair dismissal protection in the next 90 days. If you use probation, set it on the person sheet.'
                      : 'No probation reviews open. Set where you employ people, on the right, to see when unfair dismissal protection starts.'
                  }
                />
              ) : (
                <RowList>
                  {dates.map((d) => {
                    const days = d.review
                      ? daysTo(d.review)
                      : d.qualifying
                        ? daysTo(d.qualifying)
                        : 0;
                    return (
                      <Row
                        key={d.id}
                        title={d.name}
                        detail={[
                          d.review ? `Probation review ${short(d.review)}` : null,
                          d.qualifying ? `protection from ${short(d.qualifying)}` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                        trailing={
                          <StatusPill tone={days < 0 ? 'red' : days <= 30 ? 'volt' : 'neutral'}>
                            {days < 0
                              ? 'Overdue'
                              : days === 0
                                ? 'Today'
                                : `${days} ${days === 1 ? 'day' : 'days'}`}
                          </StatusPill>
                        }
                        onClick={() => openPerson(d.id)}
                      />
                    );
                  })}
                </RowList>
              )}
            </section>
          )}

          {isAdmin && (
            <section data-help="hr.review">
              <PanelTitle title="Records to review" meta={reviewCount || undefined} />
              {reviewCount === 0 ? (
                <PlainEmpty text="Nothing has reached the end of its retention period. Leavers show here when their records can go." />
              ) : (
                <RowList>
                  {leaversReady.map((l) => {
                    const parts = l.ready.map((p) => PART_WORD[p]).join(', ');
                    return (
                      <Row
                        key={l.roster_id}
                        title={l.name}
                        detail={
                          l.left_on
                            ? `Left ${nice(l.left_on)} · ${parts} can go`
                            : `No leaving date${parts ? ` · ${parts} can go` : ''}. Add it to start the retention periods`
                        }
                        trailing={
                          <StatusPill tone="volt">{l.left_on ? 'Review' : 'Add date'}</StatusPill>
                        }
                        onClick={() => setLeaver(l)}
                      />
                    );
                  })}
                  {orphans.length > 0 && (
                    <Row
                      title={plural(orphans.length, 'right-to-work file')}
                      detail="No longer linked to any check, usually a removal or upload that did not finish"
                      trailing={
                        <button
                          type="button"
                          className={rowBtnSecondary}
                          disabled={removeOrphans.isPending}
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              const n = await removeOrphans.mutateAsync(orphans);
                              toast({ title: `${plural(n, 'file')} deleted` });
                            } catch (err) {
                              const m = err instanceof Error ? err.message : '';
                              toast({
                                title: 'Not all deleted',
                                description: m.startsWith('files_left:')
                                  ? `${m.split(':')[1]} could not be deleted. Try again later.`
                                  : 'Please try again.',
                                variant: 'destructive',
                              });
                            }
                          }}
                        >
                          {removeOrphans.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Delete files'
                          )}
                        </button>
                      }
                    />
                  )}
                  {fitNoteFiles.length > 0 && (
                    <Row
                      title={plural(fitNoteFiles.length, 'fit note file')}
                      detail="Their sickness records were removed at the end of the period. Delete the files too"
                      trailing={
                        <button
                          type="button"
                          className={rowBtnSecondary}
                          disabled={removeFitNotes.isPending}
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              const n = await removeFitNotes.mutateAsync(fitNoteFiles);
                              toast({ title: `${plural(n, 'file')} deleted` });
                            } catch (err) {
                              const m = err instanceof Error ? err.message : '';
                              toast({
                                title: 'Not all deleted',
                                description: m.startsWith('files_left:')
                                  ? `${m.split(':')[1]} could not be deleted. Try again later.`
                                  : 'Please try again.',
                                variant: 'destructive',
                              });
                            }
                          }}
                        >
                          {removeFitNotes.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Delete files'
                          )}
                        </button>
                      }
                    />
                  )}
                  {appsReady.length > 0 && (
                    <Row
                      title={`${plural(appsReady.length, 'unsuccessful application')}`}
                      detail={`Decided more than ${queue?.months.cvs ?? 6} months ago. Names, contact details and CV links can go`}
                      trailing={
                        <button
                          type="button"
                          className={rowBtnSecondary}
                          disabled={anonApps.isPending}
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              const n = await anonApps.mutateAsync(appsReady.map((a) => a.id));
                              toast({ title: `${plural(n, 'application')} cleared` });
                            } catch {
                              toast({ title: 'Not cleared', variant: 'destructive' });
                            }
                          }}
                        >
                          {anonApps.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Remove details'
                          )}
                        </button>
                      }
                    />
                  )}
                </RowList>
              )}
            </section>
          )}
        </div>

        <div className={colClass}>
          <section data-help="hr.mode">
            <PanelTitle title="When someone is unchecked" />
            <div className={cn(panel, 'space-y-3 px-4 py-4 sm:px-5')}>
              <Segments
                items={[
                  { value: 'warn', label: 'Warn' },
                  { value: 'block', label: 'Block' },
                ]}
                value={settings?.rtw_enforcement ?? 'warn'}
                onChange={(v) => {
                  if (!isAdmin) return;
                  saveSettings.mutate(
                    { rtw_enforcement: v },
                    {
                      onSuccess: () =>
                        toast({
                          title:
                            v === 'block'
                              ? 'Unchecked people are blocked'
                              : 'Unchecked people show a warning',
                        }),
                      onError: () => toast({ title: 'Not saved', variant: 'destructive' }),
                    }
                  );
                }}
              />
              <p className="text-[13px] leading-snug text-white">
                {(settings?.rtw_enforcement ?? 'warn') === 'block'
                  ? 'Assigning and booking stop until the check is recorded.'
                  : 'Assigning and booking show a warning, and you can carry on.'}{' '}
                Approving hours already worked and issuing statements always only warn: work done
                must be paid.
                {!isAdmin && ' The owner or an admin changes this.'}
              </p>
            </div>
          </section>

          {isAdmin && (
            <section>
              <PanelTitle title="Where you employ people" />
              <div className={cn(panel, 'space-y-3 px-4 py-4 sm:px-5')}>
                <Segments
                  items={[
                    { value: 'gb', label: 'England, Scotland, Wales' },
                    { value: 'ni', label: 'Northern Ireland' },
                  ]}
                  value={(law ?? '') as 'gb' | 'ni'}
                  onChange={(v) =>
                    saveSettings.mutate(
                      { employment_law: v as 'gb' | 'ni' },
                      {
                        onSuccess: () => toast({ title: 'Saved' }),
                        onError: () => toast({ title: 'Not saved', variant: 'destructive' }),
                      }
                    )
                  }
                />
                <p className="text-[13px] leading-snug text-white">
                  {law === 'ni'
                    ? 'Northern Ireland: unfair dismissal protection usually starts after 1 year.'
                    : law === 'gb'
                      ? 'England, Scotland and Wales: 2 years now, 6 months for dismissals from 1 January 2027.'
                      : 'Not known yet. Pick one so probation dates show when protection starts.'}
                  {lawInfo?.source === 'postcode' && ' Read from your company postcode.'}
                </p>
              </div>
            </section>
          )}

          {isAdmin && (
            <section>
              <PanelTitle title="How long records are kept" />
              <div className={cn(panel, rowsClass)}>
                {schedule.map((s) => {
                  const m = s.months;
                  const period =
                    m === 0
                      ? 'Until you remove them'
                      : m % 12 === 0
                        ? `${m / 12} year${m === 12 ? '' : 's'}`
                        : `${m} months`;
                  const from =
                    s.counted_from === 'leaving'
                      ? 'after leaving'
                      : s.counted_from === 'decision'
                        ? 'after the decision'
                        : s.counted_from === 'tax_year'
                          ? 'after the tax year'
                          : s.counted_from === 'last_pay'
                            ? 'after the last pay'
                            : 'from the record';
                  return (
                    <Row
                      key={s.record_type}
                      title={s.label}
                      detail={`${m === 0 ? period : `${period} ${from}`} · ${s.basis === 'statutory' ? 'the law' : 'suggested'}`}
                      onClick={() => window.open(s.source_url, '_blank', 'noopener')}
                    />
                  );
                })}
              </div>
              <p className="mt-2 text-[12.5px] leading-snug text-white">
                UK GDPR sets no fixed periods: keep personal data no longer than you need it. The
                periods marked the law are minimums. A leaver&rsquo;s name goes last, once every
                record that needs it is past its period. The accident book is never removed here.
              </p>
            </section>
          )}

          <section>
            <PanelTitle title="Where the rules come from" />
            <RowList>
              {LAW_LINKS.map((l) => (
                <Row
                  key={l.url}
                  title={l.title}
                  detail={l.detail}
                  onClick={() => window.open(l.url, '_blank', 'noopener')}
                />
              ))}
            </RowList>
          </section>
        </div>
      </div>

      {recordFor && (
        <RecordRtwCheckSheet
          open={!!recordFor}
          onOpenChange={(o) => !o && setRecordFor(null)}
          person={{ id: recordFor.roster_id, name: recordFor.name, teamRole: recordFor.team_role }}
        />
      )}
      <LeaverReviewSheet leaver={leaver} onClose={() => setLeaver(null)} />
      <TeamMemberSheet
        employee={
          member
            ? {
                id: member.id,
                userId: member.user_id,
                name: member.name,
                role: member.role,
                teamRole: toTeamRole(member.team_role),
                status: member.status,
                phone: member.phone || '',
                email: member.email || '',
                joinDate: member.join_date || '',
                avatar: member.avatar_initials,
                photo: member.photo_url || undefined,
                availability:
                  member.status === 'On Leave'
                    ? 'On Leave'
                    : member.status === 'Archived'
                      ? 'Unavailable'
                      : member.active_jobs_count > 0
                        ? 'On Job'
                        : 'Available',
                hourlyRate: isAdmin ? member.hourly_rate : undefined,
              }
            : null
        }
        open={!!member && memberAction === null}
        onOpenChange={(o) => !o && setMemberId(null)}
        onEdit={() => setMemberAction('edit')}
        onAssignToJob={() => setMemberAction('assign')}
        onSendMessage={() => setMemberAction('message')}
      />
      <EditEmployeeDialog
        employee={member}
        open={!!member && memberAction === 'edit'}
        onOpenChange={(o) => !o && setMemberAction(null)}
      />
      <AssignToJobDialog
        employee={member}
        open={!!member && memberAction === 'assign'}
        onOpenChange={(o) => !o && setMemberAction(null)}
      />
      <SendMessageDialog
        employee={member}
        open={!!member && memberAction === 'message'}
        onOpenChange={(o) => !o && setMemberAction(null)}
      />
    </PageFrame>
  );
}

function LeaverReviewSheet({
  leaver,
  onClose,
}: {
  leaver: RetentionLeaver | null;
  onClose: () => void;
}) {
  const anon = useAnonymiseLeaver();
  const savePerson = useSavePersonHr();
  const { data: schedule = [] } = useRetentionSchedule();
  const [picked, setPicked] = useState<LeaverPart[]>([]);
  const [leftOn, setLeftOn] = useState('');
  const [lastId, setLastId] = useState<string | null>(null);
  if (leaver && leaver.roster_id !== lastId) {
    setLastId(leaver.roster_id);
    setPicked(leaver.ready.filter((p) => p === 'contact'));
    setLeftOn(leaver.left_on ?? '');
  }
  if (!leaver && lastId !== null) setLastId(null);
  const sourceOf = (type: string) => schedule.find((x) => x.record_type === type)?.source_url;
  const until = (d: string | null | undefined, fallback: string) =>
    d ? `Kept until ${nice(d)}` : fallback;

  // What can go, each with its own date. The name is the last step and takes
  // everything else with it.
  const parts: Array<{ key: LeaverPart; title: string; detail: string; show: boolean }> = leaver
    ? [
        {
          key: 'contact',
          title: 'Contact details',
          detail: leaver.contact_on_file
            ? 'Phone, email, photo and emergency contact. Not needed once they have gone'
            : 'Already removed',
          show: true,
        },
        {
          key: 'rtw',
          title: 'Right-to-work checks and copies',
          detail:
            leaver.rtw_records === 0
              ? 'None on file'
              : `${plural(leaver.rtw_records, 'record')}. ${until(leaver.rtw_until, 'Kept until 2 years after the leaving date')}`,
          show: true,
        },
        {
          key: 'sickness',
          title: 'Sickness records and fit notes',
          detail:
            leaver.sickness_due > 0
              ? `${plural(leaver.sickness_due, 'record')} past 3 years after their tax year${
                  leaver.sickness_records > leaver.sickness_due
                    ? `. ${leaver.sickness_records - leaver.sickness_due} newer kept`
                    : ''
                }`
              : `${plural(leaver.sickness_records, 'record')}. ${until(leaver.sickness_until, 'Kept 3 years after the tax year')}`,
          show: leaver.sickness_records > 0,
        },
        {
          key: 'dob',
          title: 'Date of birth',
          detail: until(leaver.dob_until, 'Kept 6 years after their last pay'),
          show: leaver.dob_on_file,
        },
        {
          key: 'signatures',
          title: 'Signatures',
          detail: `${plural(leaver.signatures, 'signature')} on policies, RAMS and checklists. The date signed stays. ${until(leaver.signatures_until, 'Kept 6 years after leaving')}`,
          show: leaver.signatures > 0,
        },
        {
          key: 'name',
          title: 'Their name, and everything above',
          detail: leaver.name_removed
            ? 'Already replaced'
            : `Replaced with "Former team member" on every record. ${until(leaver.name_until, 'Kept until every record that needs it is past its period')}`,
          show: true,
        },
      ]
    : [];

  // What the law still needs, and why. From their actual records.
  const k = leaver?.keep;
  const kept: Array<{ title: string; detail: string; until: string | null; type: string }> =
    k && leaver
      ? [
          k.timesheets > 0 || leaver.left_on
            ? {
                title: 'Timesheets and pay',
                detail: `${k.timesheets > 0 ? `${plural(k.timesheets, 'timesheet')}. ` : ''}Minimum wage records, 6 years`,
                until: k.timesheets_until,
                type: 'timesheets',
              }
            : null,
          k.holiday > 0
            ? {
                title: 'Holiday records',
                detail: `${plural(k.holiday, 'entry', 'entries')}. 6 years from each one`,
                until: k.holiday_until,
                type: 'holiday',
              }
            : null,
          k.sickness - (leaver.sickness_due ?? 0) > 0
            ? {
                title: 'Sickness and sick pay',
                detail: `${plural(k.sickness - leaver.sickness_due, 'record')}. HMRC: 3 years after the tax year`,
                until: k.sickness_until,
                type: 'sickness',
              }
            : null,
          k.cis > 0
            ? {
                title: 'CIS payment statements',
                detail: `${plural(k.cis, 'statement')}. HMRC: 3 years after the tax year`,
                until: k.cis_until,
                type: 'cis',
              }
            : null,
          k.accident > 0
            ? {
                title: 'Accident book',
                detail: `${plural(k.accident, 'entry', 'entries')}. 3 years from each entry, never removed here`,
                until: k.accident_until,
                type: 'accident',
              }
            : null,
        ].filter((x): x is NonNullable<typeof x> => !!x && (!x.until || x.until > todayIso()))
      : [];

  const nameChosen = picked.includes('name');
  const go = async () => {
    if (!leaver) return;
    try {
      if (leftOn && leftOn !== (leaver.left_on ?? '')) {
        await savePerson.mutateAsync({ rosterId: leaver.roster_id, left_on: leftOn });
      }
      if (picked.length > 0) {
        await anon.mutateAsync({ rosterId: leaver.roster_id, parts: picked });
      }
      toast({ title: picked.length ? 'Records removed' : 'Leaving date saved' });
      onClose();
    } catch (e) {
      const m = e instanceof Error ? e.message : '';
      toast({
        title: 'Not done',
        description: m.includes('not_due')
          ? 'That record is still inside its period.'
          : m.includes('left_on_required')
            ? 'Add the leaving date first.'
            : m.startsWith('files_left:')
              ? `Records removed, but ${m.split(':')[1]} file(s) could not be deleted. They are listed under Records to review.`
              : // useHrRecords turns server codes into plain sentences; show them.
                m && /\s/.test(m) && !/^[a-z_]+$/.test(m)
                ? m
                : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormSheet
      open={!!leaver}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="Records to review"
      title={leaver ? leaver.name : ''}
      description="Remove what has reached the end of its period. Anything the law still needs stays, with the date it can go."
      footer={
        <div className="flex gap-2">
          <button type="button" className={cn(rowBtnSecondary, 'flex-1')} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={cn(rowBtnPrimary, 'flex-1')}
            disabled={
              anon.isPending ||
              savePerson.isPending ||
              (picked.length === 0 && leftOn === (leaver?.left_on ?? ''))
            }
            onClick={go}
          >
            {(anon.isPending || savePerson.isPending) && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {nameChosen
              ? 'Remove everything'
              : picked.length > 0
                ? `Remove ${picked.length === 1 ? 'it' : `${picked.length}`}`
                : 'Save date'}
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-5">
          <section>
            <PanelTitle title="Can go" />
            <div className={cn(panel, rowsClass)}>
              {parts
                .filter((p) => p.show)
                .map((p) => {
                  const ready = leaver?.ready.includes(p.key) ?? false;
                  const on = picked.includes(p.key) || (nameChosen && ready);
                  return (
                    <label
                      key={p.key}
                      className={cn(
                        'flex min-h-[60px] items-center gap-3 px-4 py-3 sm:px-5',
                        ready ? 'cursor-pointer touch-manipulation' : 'opacity-60'
                      )}
                    >
                      <Checkbox
                        checked={on}
                        disabled={!ready || (nameChosen && p.key !== 'name')}
                        onCheckedChange={(c) =>
                          setPicked((prev) =>
                            c ? [...prev, p.key] : prev.filter((x) => x !== p.key)
                          )
                        }
                        className={checkboxClass}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-semibold text-white">{p.title}</div>
                        <div className="mt-0.5 text-[13px] text-white">{p.detail}</div>
                      </div>
                    </label>
                  );
                })}
            </div>
          </section>
          {kept.length > 0 && (
            <section>
              <PanelTitle title="Kept, because the law needs it" />
              <RowList>
                {kept.map((x) => (
                  <Row
                    key={x.title}
                    title={x.title}
                    detail={x.detail}
                    trailing={
                      x.until ? (
                        <StatusPill tone="neutral">Until {nice(x.until)}</StatusPill>
                      ) : undefined
                    }
                    onClick={() => {
                      const url = sourceOf(x.type);
                      if (url) window.open(url, '_blank', 'noopener');
                    }}
                  />
                ))}
              </RowList>
            </section>
          )}
        </div>
        <div className="space-y-4">
          <Field
            label="Leaving date"
            hint={
              leaver && !leaver.left_on
                ? 'Needed before anything except contact details can go. Save it, then come back.'
                : 'Every period above counts from this date or from the record itself.'
            }
          >
            <input
              type="date"
              className={inputClass}
              value={leftOn}
              max={todayIso()}
              onChange={(e) => setLeftOn(e.target.value)}
            />
          </Field>
          <p className="text-[13px] leading-snug text-white">
            Removing cannot be undone. Right-to-work copies and fit notes are deleted from storage.
            You can keep records longer than the law asks if you need them, never shorter.
          </p>
        </div>
      </div>
    </FormSheet>
  );
}
