/**
 * PortfolioHome — the one portfolio home (ELE-1892), built on the one read
 * model (usePortfolio, ELE-1917 / ELE-1862).
 *
 *   headline   Passed X of Y is THE progress figure; claimed, with your
 *              assessor, needs more and suggested are smaller and separate
 *   Evidence   every item with honest state chips and its next step, filters
 *              by state and unit; tap opens the evidence detail (ELE-1893)
 *   Coverage   every criterion in the six-state legend
 *   Readiness  the EPA gateway, the to-do list and the readiness checks
 *
 * Replaces the old Portfolio / My work tabs. The College area links here
 * rather than repeating its own portfolio cards.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calculator, ClipboardList, FileCheck2, FolderDown, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';
import PortfolioEntryForm from '@/components/apprentice/portfolio/PortfolioEntryForm';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { loadPortfolioEntry, usePortfolioWrites } from '@/hooks/portfolio/portfolioWrites';
import type { PortfolioEntry } from '@/types/portfolio';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolio, notifyPortfolioChanged, type PortfolioItemView } from '@/hooks/portfolio/usePortfolio';
import { STATE_SWATCH } from '@/hooks/portfolio/usePortfolioAcState';
import { SharePortfolioSheet } from '../SharePortfolioSheet';
import { ExportPackSheet } from '@/components/portfolio-export/ExportPackSheet';
import { PortfolioStartHere } from '../PortfolioStartHere';
import type { CaptureSeed } from '../UnifiedCaptureSheet';
import { useAssessmentPlans } from '@/hooks/portfolio/useAssessmentPlans';
import { AssessmentPlanTodo, planCaptureSeed } from './AssessmentPlanTodo';
import { CoverageView } from './CoverageView';
import { ReadinessView } from './ReadinessView';
import { Ring } from '@/components/college/student360/Student360Visuals';
import { EvidenceDetailSheet } from './EvidenceDetailSheet';
import { EvidenceList } from './EvidenceList';
import { InviteAssessorSheet } from './InviteAssessorSheet';
import { NoCollegeCard } from './NoCollegeCard';
import { LEGEND_HELP, P_BTN, P_CARD, pChip } from './ui';
import type { WorkKind } from '@/lib/portfolio/workEvidence';

/** Hours as the hours page shows them: one decimal under ten ("2.5"), whole above. */
function fmtHours(h: number): string {
  return h < 10 && h % 1 !== 0 ? h.toFixed(1) : String(Math.round(h));
}

export type PortfolioView = 'evidence' | 'coverage' | 'readiness';
const VIEWS: { key: PortfolioView; label: string }[] = [
  { key: 'evidence', label: 'Evidence' },
  { key: 'coverage', label: 'Coverage' },
  { key: 'readiness', label: 'Readiness' },
];

export const PORTFOLIO_HELP: PageHelpContent = {
  id: 'apprentice-portfolio-home',
  title: 'Your portfolio',
  what: 'Everything you have captured for your qualification, what each piece covers, where it stands with your assessor, and what to do next. Your record stays yours.',
  steps: [
    {
      title: 'Capture',
      body: 'Add a photo, document or note from site. The AI may suggest criteria; they only count once you claim them.',
    },
    {
      title: 'Use your own electrical work',
      body: 'A certificate, a schedule of test results or a calculation you did in Elec-Mate becomes evidence in two taps, with a readable copy and suggested criteria.',
    },
    {
      title: 'Claim and get it witnessed',
      body: 'Open the evidence, claim each criterion it really shows, and ask the supervisor who saw you do it to sign.',
    },
    {
      title: 'Do what your tutor set',
      body: 'Items under "From your tutor" are your assessment plan. Tap Capture this and the criteria are ticked for you. Each one ticks itself off when you send that evidence.',
    },
    {
      title: 'Sign and send',
      body: 'Submit for assessment with your declaration that it is your own work. Your assessor passes it or asks for more.',
    },
    {
      title: 'Send again when asked',
      body: 'If your assessor needs more, read their feedback in the evidence, add to it and send it again.',
    },
  ],
  legend: [
    { swatch: STATE_SWATCH.not_started, label: 'Not started', body: LEGEND_HELP.not_started },
    { swatch: STATE_SWATCH.suggested, label: 'Suggested (AI)', body: LEGEND_HELP.suggested },
    { swatch: STATE_SWATCH.claimed, label: 'Claimed by you', body: LEGEND_HELP.claimed },
    { swatch: STATE_SWATCH.submitted, label: 'Submitted', body: LEGEND_HELP.submitted },
    { swatch: STATE_SWATCH.referred, label: 'Needs more', body: LEGEND_HELP.referred },
    { swatch: STATE_SWATCH.passed, label: 'Passed', body: LEGEND_HELP.passed },
    { swatch: STATE_SWATCH.iqa_confirmed, label: 'IQA confirmed', body: LEGEND_HELP.iqa_confirmed },
  ],
  notes: [
    {
      title: 'Only passed counts',
      body: 'Your progress figure is criteria your assessor has passed. Claimed and submitted are shown separately so you always know what is still to be judged.',
    },
    {
      title: 'Export your record any time',
      body: 'Export my record builds a ZIP with a designed PDF summary, every file, your declarations, hours and the audit trail. Packs are kept; download links last 24 hours.',
    },
    {
      title: 'Nothing is lost or changed quietly',
      body: 'Every file carries a fingerprint (SHA-256) and every change, claim, decision and signature is kept in an audit trail you and your assessor can read.',
    },
  ],
};

export const COVERAGE_HELP: PageHelpContent = {
  id: 'apprentice-portfolio-coverage',
  title: 'Coverage',
  what: 'Every criterion on your course and where each one stands. The ring shows the whole course; each unit shows its own bar.',
  steps: [
    { title: 'Read the ring', body: 'Green is passed by your assessor. Blue is with your assessor. Orange needs more. White is claimed or suggested. Grey is not started.' },
    { title: 'Filter by state', body: 'Tap a line in the key, for example Not started, to see only those criteria. Tap it again to show everything.' },
    { title: 'Open a unit', body: 'Each criterion shows its state, any feedback and the evidence it is tied to. Capture for unit starts new evidence aimed at the gaps.' },
  ],
  legend: PORTFOLIO_HELP.legend,
  notes: [
    {
      title: 'The same figures your assessor sees',
      body: 'Coverage reads the same record as your assessor and your tutor, so the numbers always agree.',
    },
  ],
};

export const READINESS_HELP: PageHelpContent = {
  id: 'apprentice-portfolio-readiness',
  title: 'Readiness',
  what: 'How close your record is to the end of your programme: criteria passed, off-the-job hours, evidence someone has seen, and your tutor\'s plan.',
  steps: [
    { title: 'Check the rings', body: 'Each ring is a real figure from your record. Tap one to see the detail behind it.' },
    { title: 'Work down Before gateway', body: 'Each line says what your record shows today and the one thing to do next.' },
    { title: 'Clear what needs you', body: 'Evidence waiting on a step from you is listed with that step. Tap it to open the evidence.' },
    { title: 'Write your statement', body: 'A few sentences in your own words. It opens your exported record.' },
  ],
  notes: [
    {
      title: 'Not a grade or a prediction',
      body: 'Your tutor and employer decide when you are ready for gateway. This page only shows what your record says.',
    },
  ],
};

const crit = (n: number) => (n === 1 ? 'Criterion' : 'Criteria');

function Figure({ label, value, sub, tone }: { label: string; value: string | number; sub?: string; tone?: 'warn' | 'info' }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-3.5">
      <p className="text-[12.5px] font-medium text-white">{label}</p>
      <p
        className={cn(
          'mt-1.5 text-[26px] font-bold leading-none tabular-nums',
          tone === 'warn' ? 'text-orange-300' : tone === 'info' ? 'text-sky-200' : 'text-white'
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-1.5 text-[12px] leading-snug text-white">{sub}</p>}
    </div>
  );
}

/** Mounted only while editing: loads the one row the form edits (ELE-1917). */
function EditEvidenceHost({ itemId, onDone }: { itemId: string; onDone: () => void }) {
  const { categories, updateEntry } = usePortfolioWrites();
  const { user } = useAuth();
  const [entry, setEntry] = useState<PortfolioEntry | null>(null);
  useEffect(() => {
    if (!user?.id) return;
    let live = true;
    void loadPortfolioEntry(user.id, itemId).then((e) => {
      if (live) setEntry(e);
    });
    return () => {
      live = false;
    };
  }, [itemId, user?.id]);
  if (!entry) return null;
  return (
    <PortfolioEntryForm
      categories={categories}
      initialData={entry}
      onSubmit={async (data) => {
        await updateEntry(entry.id, data);
        onDone();
      }}
      onCancel={onDone}
    />
  );
}

export function PortfolioHome({ onCapture }: { onCapture: (seed?: CaptureSeed | null) => void }) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const portfolio = usePortfolio(null, { withHours: true });
  const { items, headline, loading } = portfolio;
  const needsMoreItems = useMemo(() => items.filter((i) => i.state === 'needs_more').length, [items]);
  const { qualificationName, collegeCourseCode } = useStudentQualification();
  const { learner, loading: collegeLoading } = useMyCollegeContext();
  // What the tutor has asked for next (ELE-1874): a to-do with capture pre-ticked.
  const plans = useAssessmentPlans(null);
  const plannedDue = useMemo(() => {
    const m = new Map<string, string | null>();
    for (const p of plans.open)
      for (const c of p.criteria) if (!c.met_at) m.set(`${c.unit_code}|${c.ac_code}`, p.due_date);
    return m;
  }, [plans.open]);

  const viewParam = params.get('view') as PortfolioView | null;
  const [view, setView] = useState<PortfolioView>(
    viewParam && VIEWS.some((v) => v.key === viewParam) ? viewParam : 'evidence'
  );
  const chooseView = (v: PortfolioView) => {
    setView(v);
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (v === 'evidence') next.delete('view');
        else next.set('view', v);
        return next;
      },
      { replace: true }
    );
  };

  const [openId, setOpenId] = useState<string | null>(params.get('item'));
  const openItem = useMemo(() => items.find((i) => i.id === openId) ?? null, [items, openId]);
  const [editId, setEditId] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(params.get('export') === '1');
  const [inviteOpen, setInviteOpen] = useState(false);

  const open = useCallback(
    (i: PortfolioItemView) => {
      setOpenId(i.id);
    },
    []
  );
  // ?item=<id> deep links (from a notification) open the evidence once loaded.
  useEffect(() => {
    const id = params.get('item');
    if (id) setOpenId(id);
  }, [params]);

  // "Do next" deep links (ELE-1896), consumed once then dropped from the URL:
  //   ?plan=<id>&capture=1   capture with that plan item's criteria ticked
  //   ?capture=1&ac=U:A,U:A  capture with criteria the assessor sent back ticked
  //   ?capture=1&unit=<code> capture aimed at a unit (named, never pre-claimed)
  //   ?course=1              open the course picker
  useEffect(() => {
    const wantsCapture = params.get('capture') === '1';
    //   ?capture=1&work=<kind>:<id>  ELE-1906: start from a certificate,
    //                                 its test results or a saved calculation
    const wantsCourse = params.get('course') === '1';
    if (!wantsCapture && !wantsCourse) return;
    const planId = params.get('plan');
    if (wantsCapture && planId && plans.loading) return;
    const drop = (keys: string[]) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          keys.forEach((k) => next.delete(k));
          return next;
        },
        { replace: true }
      );
    if (wantsCourse) {
      setCourseOpen(true);
      drop(['course']);
      return;
    }
    const plan = planId ? plans.open.find((p) => p.id === planId) : null;
    const ac = (params.get('ac') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const i = pair.lastIndexOf(':');
        return i > 0 ? `${pair.slice(0, i)} AC ${pair.slice(i + 1)}` : null;
      })
      .filter((r): r is string => !!r);
    const unit = params.get('unit');
    const workParam = params.get('work') ?? '';
    const workSep = workParam.indexOf(':');
    const workKind = workParam.slice(0, workSep) as WorkKind;
    const workId = workParam.slice(workSep + 1);
    const work =
      workSep > 0 && ['certificate', 'test_results', 'calculation'].includes(workKind) && workId
        ? { kind: workKind, id: workId }
        : null;
    if (work) onCapture({ work });
    else if (plan) onCapture(planCaptureSeed(plan));
    else if (ac.length)
      onCapture({
        acRefs: ac,
        brief: [{ label: 'Your assessor needs more. Add what was missing, then send it again.' }],
        briefSource: 'from your assessor',
      });
    else if (unit) onCapture({ context: `Evidence for unit ${unit}.` });
    else if (!planId) onCapture(null);
    drop(['capture', 'ac', 'unit', 'work']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, plans.loading]);

  const inviteAssessor = () => setInviteOpen(true);
  // Witness statements are asked per piece of evidence, from the page that lists them.
  const askWitness = () => navigate('/apprentice/college/progress?witness=1');
  const noAssessor = !learner && portfolio.assessorLinks === 0;
  const showNoCollege = noAssessor && !collegeLoading && !loading;
  const hours = portfolio.hours as { counted_hours?: number; required_hours?: number } | null;

  return (
    <div className="space-y-6 py-5 sm:py-6 lg:py-8">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
              Your portfolio
            </h1>
            <PageHelpButton
              help={view === 'coverage' ? COVERAGE_HELP : view === 'readiness' ? READINESS_HELP : PORTFOLIO_HELP}
            />
          </div>
          <p className="mt-1 max-w-3xl text-[14px] leading-snug text-white">
            {qualificationName ? (
              <>
                Marked against <span className="font-semibold">{qualificationName}</span>. What you have captured,
                what it covers and where it stands with your assessor.
              </>
            ) : (
              'What you have captured, what it covers and where it stands with your assessor.'
            )}
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <button type="button" className={cn(P_BTN, 'col-span-2 whitespace-nowrap sm:col-span-1')} onClick={() => setExportOpen(true)}>
            <FolderDown className="h-4 w-4" /> Export my record
          </button>
          <button type="button" className={cn(P_BTN, 'whitespace-nowrap')} onClick={() => setShareOpen(true)}>
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button type="button" className={cn(P_BTN, 'whitespace-nowrap')} onClick={() => setCourseOpen(true)}>
            {collegeCourseCode ? 'Your course' : 'Change course'}
          </button>
        </div>
      </header>

      {/* Headline: passed is the figure; the rest are separate and smaller */}
      <section className={cn(P_CARD, 'grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:items-center lg:gap-8')}>
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="shrink-0">
            <Ring
              pct={headline.total ? headline.percent : null}
              value={headline.total ? `${headline.percent}%` : '–'}
              label=""
              sub=""
              onClick={() => chooseView('coverage')}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-white">
              {noAssessor ? 'Passed by an assessor' : 'Passed by your assessor'}
            </p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-[40px] font-bold leading-none tabular-nums text-white">{headline.passed}</span>
              <span className="text-[15px] text-white">of {headline.total || '–'} criteria</span>
            </p>
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
              <span className={STATE_SWATCH.iqa_confirmed} style={{ width: `${headline.total ? (headline.iqaConfirmed / headline.total) * 100 : 0}%` }} />
              <span
                className={STATE_SWATCH.passed}
                style={{ width: `${headline.total ? ((headline.passed - headline.iqaConfirmed) / headline.total) * 100 : 0}%` }}
              />
              <span className={STATE_SWATCH.submitted} style={{ width: `${headline.total ? (headline.submitted / headline.total) * 100 : 0}%` }} />
              <span className={STATE_SWATCH.claimed} style={{ width: `${headline.total ? (headline.claimed / headline.total) * 100 : 0}%` }} />
            </div>
            <p className="mt-2 text-[12.5px] leading-snug text-white">
              {headline.total ? `${headline.percent}% of your course is passed.` : 'Choose your course to track it.'}{' '}
              {headline.iqaConfirmed > 0 && `${headline.iqaConfirmed} confirmed by the IQA.`}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {/* ELE-1862: these figures count CRITERIA; the Evidence filter chips
              count pieces of evidence. Say so, so the two never look contradictory. */}
          <Figure label="Claimed by you" value={headline.claimed} sub={`${crit(headline.claimed)}, not sent yet`} />
          <Figure
            label="With your assessor"
            value={headline.submitted}
            sub={`${crit(headline.submitted)}, signed and sent`}
            tone="info"
          />
          <Figure
            label="Needs more"
            value={headline.needsMore}
            sub={
              headline.needsMore
                ? `${crit(headline.needsMore)} · ${needsMoreItems ? `on ${needsMoreItems} ${needsMoreItems === 1 ? 'piece' : 'pieces'} of evidence` : 'see Coverage'}`
                : 'Nothing sent back'
            }
            tone={headline.needsMore ? 'warn' : undefined}
          />
          <Figure
            label={hours?.required_hours ? 'Off-the-job hours' : 'Suggested (AI)'}
            value={
              hours?.required_hours
                ? fmtHours(hours.counted_hours ?? 0)
                : headline.suggested
            }
            sub={hours?.required_hours ? `of ${Math.round(hours.required_hours)} needed` : 'Check and claim'}
          />
        </div>
      </section>

      {showNoCollege && (
        <NoCollegeCard
          onExport={() => setExportOpen(true)}
          onAskWitness={askWitness}
          onChanged={() => notifyPortfolioChanged()}
        />
      )}

      <AssessmentPlanTodo plans={plans} onCapture={(seed) => onCapture(seed)} />

      {/* ELE-1906: the learner's own electrical work, in two taps */}
      <section
        aria-labelledby="from-your-work"
        className="-mx-4 flex flex-col gap-3 border-y border-white/[0.08] px-5 py-4 sm:mx-0 sm:rounded-3xl sm:border-x sm:px-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="min-w-0">
          <h2 id="from-your-work" className="text-[15px] font-semibold tracking-tight text-white">
            Turn your own work into evidence
          </h2>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white">
            A certificate, test results or a calculation you did. We make a readable copy and suggest the criteria.
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-3 gap-2">
          {(
            [
              { kind: 'certificate', label: 'Certificate', icon: FileCheck2 },
              { kind: 'test_results', label: 'Test results', icon: ClipboardList },
              { kind: 'calculation', label: 'Calculation', icon: Calculator },
            ] as const
          ).map((o) => (
            <button
              key={o.kind}
              type="button"
              className={cn(
                P_BTN,
                'h-auto min-h-[56px] flex-col gap-1 px-2 py-2 text-[12.5px] leading-tight sm:min-h-11 sm:flex-row sm:gap-2 sm:px-3 sm:text-[13px]'
              )}
              onClick={() => onCapture({ pickWork: o.kind })}
            >
              <o.icon className="h-4 w-4 shrink-0 text-elec-yellow" />
              <span className="text-center">{o.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* View switch */}
      <div className="flex gap-2" role="tablist" aria-label="Portfolio view">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={view === v.key}
            className={cn(pChip(view === v.key), 'h-11 flex-1 sm:flex-none sm:px-6')}
            onClick={() => chooseView(v.key)}
          >
            {v.label}
            {v.key === 'evidence' && items.length > 0 && <span className="ml-1.5 tabular-nums">{items.length}</span>}
          </button>
        ))}
      </div>

      {view === 'evidence' &&
        (loading && items.length === 0 ? (
          <div className="space-y-2">
            {[0, 1, 2].map((k) => (
              <div key={k} className="h-24 animate-pulse rounded-3xl bg-white/[0.04]" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <PortfolioStartHere onChooseCourse={() => setCourseOpen(true)} onCapture={() => onCapture(null)} />
        ) : (
          <EvidenceList items={items} onOpen={open} />
        ))}

      {view === 'coverage' && (
        <CoverageView
          portfolio={portfolio}
          plannedDue={plannedDue}
          onOpenItem={open}
          onCaptureFor={(unit, acRefs) =>
            // Named in the description, never pre-claimed: the learner ticks what the evidence shows.
            onCapture({ context: `Evidence for unit ${unit}. Aiming at: ${acRefs.join(', ')}.` })
          }
        />
      )}

      {view === 'readiness' && (
        <ReadinessView
          portfolio={portfolio}
          plans={plans}
          learner={learner}
          onOpenItem={open}
          onView={chooseView}
          onCapture={() => onCapture(null)}
          onOpenGatewayPack={() => setExportOpen(true)}
        />
      )}

      <EvidenceDetailSheet
        item={openItem}
        portfolio={portfolio}
        open={!!openItem}
        onOpenChange={(o) => {
          if (!o) {
            setOpenId(null);
            if (params.get('item')) {
              setParams(
                (prev) => {
                  const next = new URLSearchParams(prev);
                  next.delete('item');
                  return next;
                },
                { replace: true }
              );
            }
          }
        }}
        onEdit={(id) => {
          setOpenId(null);
          setEditId(id);
        }}
        onInviteAssessor={inviteAssessor}
      />

      {editId && <EditEvidenceHost itemId={editId} onDone={() => setEditId(null)} />}

      <SharePortfolioSheet open={shareOpen} onOpenChange={setShareOpen} />
      <InviteAssessorSheet
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        onCreated={() => notifyPortfolioChanged()}
        onAskWitness={askWitness}
      />
      <ExportPackSheet open={exportOpen} onOpenChange={setExportOpen} learnerUserId={null} mode="learner" />
      <FormSheet
        open={courseOpen}
        onOpenChange={setCourseOpen}
        eyebrow="Portfolio"
        title={collegeCourseCode ? 'Your course' : 'Change qualification'}
        width="wide"
      >
        <QualificationSelector lockedToCode={collegeCourseCode} />
      </FormSheet>
    </div>
  );
}

export default PortfolioHome;
