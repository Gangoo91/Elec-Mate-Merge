import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegePageHeader,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { ComplianceDocsSection } from '@/components/college/sections/ComplianceDocsSection';
import { ShowMePanel } from '@/components/college/compliance/ShowMePanel';

/* ==========================================================================
   ComplianceHubPage — /college/compliance. The one front door to every
   compliance surface: evidence search, the vault and policies, the Ofsted
   lens, the self-assessment, the improvement plan, practice inspections and
   the printable audit pack.

   Tab state lives in the URL hash (#showme, #eif, #sar, #qip, #rehearsal,
   #pack; none = vault) so refreshes and shared links round-trip.
   ELE-938 / [M1]. Redesigned to the College Hub kit 7 Oct 2026.
   ========================================================================== */

const OfstedEifPage = lazy(() => import('@/pages/college/OfstedEifPage'));

type Tab = 'showme' | 'vault' | 'eif' | 'pack' | 'sar' | 'qip' | 'rehearsal';

const TABS: { key: Tab; label: string }[] = [
  { key: 'vault', label: 'Vault and policies' },
  { key: 'showme', label: 'Evidence search' },
  { key: 'eif', label: 'Ofsted readiness' },
  { key: 'sar', label: 'Self-assessment' },
  { key: 'qip', label: 'Improvement plan' },
  { key: 'rehearsal', label: 'Practice inspection' },
  { key: 'pack', label: 'Audit pack' },
];

function tabFromHash(hash: string): Tab {
  const stripped = hash.replace('#', '').toLowerCase();
  const hit = TABS.find((t) => t.key === stripped);
  return hit ? hit.key : 'vault';
}

const HELP: PageHelpContent = {
  id: 'college-compliance-hub',
  title: 'Compliance',
  what: 'Everything an inspector, auditor or awarding body could ask to see, in one place: staff records and policies, a live Ofsted readiness view, your self-assessment, the improvement plan and a printable audit pack.',
  steps: [
    { title: 'Keep the vault in date', body: 'Staff checks (DBS, right to work, references) and policies live in Vault and policies. Expired and missing items show first.' },
    { title: 'Check your readiness', body: 'Ofsted readiness reads your live records against the areas Ofsted inspects and shows where evidence is thin.' },
    { title: 'Write it up and act on it', body: 'Draft the self-assessment, turn its weaknesses into improvement plan actions, and rehearse the questions.' },
    { title: 'Print the pack', body: 'The audit pack puts the single central record, policies, sign-offs and the IQA chain into one document.' },
  ],
  notes: [
    { title: 'Evidence search', body: 'Type a question the way an inspector would ask it, such as “show me struggling learners and our response”, and jump to the learners and records that answer it.' },
  ],
};

export default function ComplianceHubPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>(() => tabFromHash(location.hash));

  useEffect(() => {
    setActiveTab(tabFromHash(location.hash));
  }, [location.hash]);

  const setTab = (t: Tab) => {
    setActiveTab(t);
    const targetHash = t === 'vault' ? '' : `#${t}`;
    if (location.hash !== targetHash) {
      window.history.replaceState(null, '', `${location.pathname}${targetHash}`);
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Compliance" backTo="/college?section=qualityhub" />
      <HubBody pushContext="Get notified when staff checks expire and policies need signing">
        <CollegePageHeader
          eyebrow="Quality and compliance"
          title="Compliance"
          description="Staff records, policies, Ofsted readiness, self-assessment and the audit pack, in one place."
          help={HELP}
        />

        <div
          className="sticky top-[calc(var(--header-height,0px)+3rem)] z-20 -mx-4 border-b border-white/[0.06] bg-[hsl(var(--hub-ground))]/95 px-4 py-2 backdrop-blur-md lg:-mx-8 lg:px-8"
          role="tablist"
          aria-label="Compliance sections"
        >
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={activeTab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(chipCn(activeTab === t.key), 'h-11')}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'showme' && (
          <div className={COLLEGE_CARD}>
            <ShowMePanel />
          </div>
        )}
        {activeTab === 'vault' && <ComplianceDocsSection />}
        {activeTab === 'eif' && (
          <Suspense fallback={<div className={cn(COLLEGE_CARD, 'text-[13.5px] text-white')}>Loading Ofsted readiness…</div>}>
            <OfstedEifPage embedded />
          </Suspense>
        )}
        {activeTab === 'sar' && (
          <RoutePanel
            eyebrow="Self-assessment"
            title="Self-assessment report"
            body="Draft your annual self-assessment from live college records: attendance, achievement, end-point assessment, IQA findings and staff. Read it, regenerate it, send it for review and approve it."
            points={['Written from the records you already keep', 'Strengths and areas for improvement listed', 'Review and approval recorded']}
            ctaLabel="Open self-assessment"
            target="/college/compliance/sar"
          />
        )}
        {activeTab === 'qip' && (
          <RoutePanel
            eyebrow="Improvement plan"
            title="Quality improvement plan"
            body="Every action flowing from your self-assessment, inspections and IQA, with the area it improves, a priority, a target date and its state."
            points={['Overdue actions shown first', 'Filter by area', 'Move actions on in one tap']}
            ctaLabel="Open improvement plan"
            target="/college/compliance/qip"
          />
        )}
        {activeTab === 'rehearsal' && (
          <RoutePanel
            eyebrow="Practice inspection"
            title="Rehearse the inspector’s questions"
            body="Mate plays the lead inspector, asks probing questions using your college’s live figures, grades each answer and gives you strengths and weaknesses at the end."
            points={['Pick a general inspection or one area', 'Each answer graded with feedback', 'Private to you']}
            ctaLabel="Start a rehearsal"
            target="/college/compliance/rehearsal"
          />
        )}
        {activeTab === 'pack' && (
          <RoutePanel
            eyebrow="Audit pack"
            title="The printable audit pack"
            body="Your single central record, live policies, every policy sign-off, the staff compliance matrix and the IQA verification chain in one document. It opens on its own page so it prints cleanly."
            points={['Cover sheet with headline figures', 'Save as PDF from the print dialog', 'Generated from live records']}
            ctaLabel="Open audit pack"
            target="/college/compliance/pack"
            secondary={{ label: 'Open and print', target: '/college/compliance/pack?auto=1' }}
          />
        )}
      </HubBody>
    </HubPage>
  );
}

function RoutePanel({
  eyebrow,
  title,
  body,
  points,
  ctaLabel,
  target,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  ctaLabel: string;
  target: string;
  secondary?: { label: string; target: string };
}) {
  const navigate = useNavigate();
  return (
    <motion.section variants={itemVariants} initial="hidden" animate="visible" className={COLLEGE_CARD}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">{eyebrow}</p>
          <h2 className="mt-1.5 text-[22px] font-bold tracking-tight text-white sm:text-[26px]">{title}</h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white">{body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => navigate(target)} className={COLLEGE_BTN_PRIMARY}>
              {ctaLabel}
            </button>
            {secondary && (
              <button type="button" onClick={() => navigate(secondary.target)} className={COLLEGE_BTN}>
                {secondary.label}
              </button>
            )}
          </div>
        </div>
        <ul className="space-y-2">
          {points.map((p) => (
            <li key={p} className="flex min-h-[48px] items-center gap-3 rounded-2xl border border-white/[0.08] px-4 text-[13.5px] text-white">
              <span className="h-2 w-2 shrink-0 rounded-full bg-elec-yellow" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
