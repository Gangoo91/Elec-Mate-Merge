import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Download, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { SegmentBar, StatusPill, TONE_BG } from '@/components/college/quality/QualityKit';
import {
  RAG_READINESS,
  RAG_TONE,
  TOOLKIT_GRADES,
  TOOLKIT_GUIDE_URL,
  TOOLKIT_SOURCE_URL,
  toToolkitAreas,
  type ToolkitArea,
} from '@/components/college/quality/ComplianceToolkit';
import { useOfstedSignals, type RagStatus } from '@/hooks/useOfstedSignals';
import { useLearnerDocumentDownload } from '@/lib/documents/useLearnerDocumentDownload';

/* ==========================================================================
   OfstedEifPage — /college/compliance/ofsted (also embedded in the
   Compliance hub's "Ofsted readiness" tab).

   ELE-2021: reads in the terms of Ofsted's renewed education inspection
   framework (for use from November 2025) and the further education and
   skills inspection toolkit (v2.0, for inspections from 1 September 2026),
   not the old five judgements. Sources, verified 7 Oct 2026:
   https://www.gov.uk/government/publications/education-inspection-framework/education-inspection-framework-for-use-from-november-2025
   https://www.gov.uk/guidance/inspecting-further-education-and-skills-guide-for-providers

   Read-only over useOfstedSignals, which keys each signal by the evaluation
   area it evidences; ComplianceToolkit orders them. It never predicts a grade.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-ofsted-lens',
  title: 'The Ofsted lens',
  what: 'A live read of your evidence against the evaluation areas Ofsted now inspects further education and skills providers on. It shows where your records are strong and where an inspector would find gaps. It does not predict a grade.',
  steps: [
    { title: 'Start with the red and orange areas', body: 'Each area shows how ready your evidence is. Open the rows inside it to go straight to the records behind the figure.' },
    { title: 'Close the gaps', body: 'Known gaps are things the app does not track yet. Keep that evidence somewhere you can show an inspector, or log an action in the improvement plan.' },
    { title: 'Download it for the nominee', body: 'Download PDF gives a snapshot for your nominee or senior leaders before a visit.' },
  ],
  notes: [
    { title: 'How Ofsted grades now', body: 'Each area is graded on five points: exceptional, strong standard, expected standard, needs attention, urgent improvement. Safeguarding is met or not met. There is no overall effectiveness grade from November 2025.' },
    { title: 'Whole provider and provision type', body: 'Safeguarding, inclusion, leadership and governance, and contribution to meeting skills needs are judged for the college as a whole. Curriculum, teaching and training, achievement, and participation and development are judged for each type of provision, such as apprenticeships.' },
  ],
  legend: [
    { swatch: TONE_BG.good, label: 'Evidence in place' },
    { swatch: TONE_BG.warn, label: 'Some gaps' },
    { swatch: TONE_BG.bad, label: 'Gaps to close' },
    { swatch: TONE_BG.neutral, label: 'Not tracked' },
  ],
  source: (
    <>
      Ofsted, Education inspection framework for use from November 2025, and the Further education and skills inspection toolkit (v2.0, for inspections from 1 September 2026):{' '}
      <a className="underline" href={TOOLKIT_GUIDE_URL} target="_blank" rel="noreferrer">
        gov.uk
      </a>
      .
    </>
  ),
};

const SHORT_READINESS: Record<RagStatus, string> = { green: 'Ready', amber: 'Partly', red: 'Gaps', grey: 'None' };

export default function OfstedEifPage({ embedded = false }: { embedded?: boolean }) {
  const body = <OfstedLens embedded={embedded} />;
  if (embedded) return body;
  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Ofsted lens"
        backTo="/college/compliance"
      />
      <HubBody pushContext="Get notified when compliance items expire or need sign-off">{body}</HubBody>
    </HubPage>
  );
}

function OfstedLens({ embedded }: { embedded: boolean }) {
  const { data, loading, error, refresh } = useOfstedSignals();
  const areas = useMemo(() => toToolkitAreas(data), [data]);
  // ELE-2017: the PDF reads the same signals server-side (_shared/ofsted-signals.ts).
  const pdf = useLearnerDocumentDownload();

  const generated = data?.generated_at
    ? new Date(data.generated_at).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const count = (r: RagStatus) => areas.filter((a) => a.rag === r).length;
  const signals = areas.reduce((n, a) => n + a.evidence.length, 0);
  const gaps = areas.reduce((n, a) => n + a.gaps.length, 0);
  const safeguarding = areas.find((a) => a.key === 'safeguarding');
  const whole = areas.filter((a) => a.level === 'whole');
  const provision = areas.filter((a) => a.level === 'provision');

  return (
    <div className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow={embedded ? undefined : 'Inspection readiness'}
        title={embedded ? 'Ofsted readiness' : 'Ofsted lens'}
        description="Your live evidence against the areas Ofsted now inspects further education and skills on, from November 2025. Tap any row to open the records behind it."
        help={HELP}
        actions={
          <>
            {generated && <span className="text-[12px] text-white">Updated {generated}</span>}
            <button type="button" onClick={refresh} disabled={loading} className={COLLEGE_BTN}>
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} aria-hidden />
              {loading ? 'Refreshing' : 'Refresh'}
            </button>
            <button type="button" onClick={() => void pdf.download({ kind: 'ofsted_lens' })} disabled={pdf.busy} className={COLLEGE_BTN}>
              <Download className="h-4 w-4" aria-hidden />
              {pdf.busy ? 'Making the PDF…' : 'Download PDF'}
            </button>
          </>
        }
      />

      {error && (
        <div className={cn(COLLEGE_CARD, 'border-red-400/40 text-[13.5px] text-white')}>Could not read your signals: {error}</div>
      )}

      {loading && !data ? (
        <div className={cn(COLLEGE_CARD, 'text-[13.5px] text-white')}>Reading your college records…</div>
      ) : !data ? (
        !error && <CollegeEmpty title="No signals yet" body="Once your college has learners, staff and policies on Elec-Mate, this page fills in by itself." />
      ) : (
        <>
          <AreaHero
            figures={[
              { label: 'Areas with evidence in place', value: `${count('green')} of ${areas.length}`, good: count('green') === areas.length },
              { label: 'Areas with gaps to close', value: String(count('red')), warn: count('red') > 0, sub: `${count('amber')} more with some gaps` },
              {
                label: 'Safeguarding evidence',
                value: safeguarding ? SHORT_READINESS[safeguarding.rag] : 'None',
                warn: safeguarding?.rag === 'red' || safeguarding?.rag === 'amber',
                good: safeguarding?.rag === 'green',
                sub: `${safeguarding ? RAG_READINESS[safeguarding.rag] : 'Not tracked'}. Ofsted grades it met or not met`,
              },
              { label: 'Live signals read', value: String(signals), sub: `${gaps} known gaps not tracked in the app` },
            ]}
            chartTitle="The seven evaluation areas by evidence readiness"
            chart={
              <div className="space-y-5">
                <SegmentBar
                  segments={[
                    { label: 'Evidence in place', n: count('green'), tone: 'good' },
                    { label: 'Some gaps', n: count('amber'), tone: 'warn' },
                    { label: 'Gaps to close', n: count('red'), tone: 'bad' },
                    { label: 'Not tracked', n: count('grey'), tone: 'neutral' },
                  ]}
                />
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {areas.map((a) => (
                    <li key={a.key}>
                      <a
                        href={`#area-${a.key}`}
                        className="flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/[0.08] px-3 text-[12.5px] text-white touch-manipulation hover:border-white/[0.2]"
                      >
                        <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', TONE_BG[RAG_TONE[a.rag]])} aria-hidden />
                        <span className="min-w-0 flex-1 truncate">{a.title}</span>
                        <span className="shrink-0 text-[11.5px] font-semibold">{RAG_READINESS[a.rag]}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }
            side={
              <div>
                <p className="mb-3 text-[13px] font-semibold text-white">How Ofsted grades each area</p>
                <ol className="space-y-1.5">
                  {TOOLKIT_GRADES.map((g, i) => (
                    <li key={g} className="flex items-center gap-2.5 text-[12.5px] text-white">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-[11px] font-semibold tabular-nums">
                        {i + 1}
                      </span>
                      {g}
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-[12px] leading-snug text-white">
                  Safeguarding is met or not met. No overall effectiveness grade. These colours show how ready your evidence is, not a predicted grade.
                </p>
                <a href={TOOLKIT_SOURCE_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex h-11 items-center text-[12.5px] font-semibold text-elec-yellow">
                  Read the framework on GOV.UK
                </a>
              </div>
            }
          />

          <section className="space-y-4">
            <CollegeSectionTitle title="The college as a whole" sub="Judged once for the whole provider." />
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
              {whole.map((a) => (
                <AreaCard key={a.key} area={a} />
              ))}
            </motion.div>
          </section>

          <section className="space-y-4">
            <CollegeSectionTitle title="Each type of provision" sub="Judged separately for each type you offer, such as apprenticeships." />
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {provision.map((a) => (
                <AreaCard key={a.key} area={a} />
              ))}
            </motion.div>
          </section>
        </>
      )}
    </div>
  );
}

function AreaCard({ area }: { area: ToolkitArea }) {
  const navigate = useNavigate();
  return (
    <motion.article
      id={`area-${area.key}`}
      variants={itemVariants}
      className="-mx-4 flex h-full scroll-mt-24 flex-col overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x"
    >
      <header className="px-5 pb-4 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-white">{area.title}</h3>
          <StatusPill tone={RAG_TONE[area.rag]}>{RAG_READINESS[area.rag]}</StatusPill>
        </div>
        <p className="mt-1.5 text-[13px] leading-snug text-white">{area.what}</p>
        <p className="mt-1 text-[11.5px] font-medium text-white">Graded: {area.scale}</p>
      </header>
      {area.evidence.length > 0 ? (
        <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
          {area.evidence.map((row) => (
            <li key={row.label}>
              <button
                type="button"
                onClick={() => row.href && navigate(row.href)}
                disabled={!row.href}
                className="flex min-h-[56px] w-full items-center gap-3 px-5 py-2.5 text-left touch-manipulation transition-colors hover:bg-white/[0.04] disabled:cursor-default sm:px-6"
              >
                <span className={cn('h-2 w-2 shrink-0 rounded-full', TONE_BG[RAG_TONE[row.status ?? 'grey']])} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-snug text-white">{row.label}</span>
                  <span className="mt-0.5 block text-[12px] tabular-nums text-white">{row.value}</span>
                </span>
                {row.href && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-t border-white/[0.06] px-5 py-4 text-[12.5px] text-white sm:px-6">No live signal in the app evidences this area yet.</p>
      )}
      {area.gaps.length > 0 && (
        <div className="mt-auto border-t border-white/[0.06] px-5 py-4 sm:px-6">
          <p className="text-[12px] font-semibold text-white">Known gaps</p>
          <ul className="mt-1.5 space-y-1">
            {area.gaps.map((g) => (
              <li key={g} className="flex items-start gap-2 text-[12.5px] leading-snug text-white">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden />
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.article>
  );
}
