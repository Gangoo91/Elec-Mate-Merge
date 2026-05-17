import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComplianceDocsSection } from '@/components/college/sections/ComplianceDocsSection';
import { ShowMePanel } from '@/components/college/compliance/ShowMePanel';

/* ==========================================================================
   ComplianceHubPage — single front door to every compliance surface.
   Tabs: Vault | Policies | Ofsted EIF | Audit Pack.

   Vault + Policies live inside the existing ComplianceDocsSection (it has
   its own internal staff/policies tab strip). Ofsted EIF + Audit Pack are
   embedded versions of the standalone routes so users can deep-link either
   way: `/college/compliance#eif` (in-hub) or `/college/compliance/ofsted`
   (standalone full-page).

   Tab state is preserved in URL hash so refreshes + share-links round-trip.

   ELE-938 / [M1] — kills the "loose pages with no parent" coherence gap.
   ========================================================================== */

const OfstedEifPage = lazy(() => import('@/pages/college/OfstedEifPage'));

type Tab = 'showme' | 'vault' | 'eif' | 'pack' | 'sar' | 'qip' | 'rehearsal';

const TABS: { key: Tab; label: string; eyebrow: string }[] = [
  { key: 'showme', label: 'Evidence search', eyebrow: 'Inspector-style search' },
  { key: 'vault', label: 'Vault & Policies', eyebrow: 'Records, CPD, policies' },
  { key: 'eif', label: 'Ofsted readiness', eyebrow: 'Live RAG against the EIF' },
  { key: 'sar', label: 'Self-Assessment', eyebrow: 'Annual SAR draft' },
  { key: 'qip', label: 'Improvement Plan', eyebrow: 'Quality improvement actions' },
  { key: 'rehearsal', label: 'Practice inspection', eyebrow: 'AI inspector rehearsal' },
  { key: 'pack', label: 'Audit bundle', eyebrow: 'Print-ready inspector pack' },
];

function tabFromHash(hash: string): Tab {
  const stripped = hash.replace('#', '').toLowerCase();
  if (stripped === 'showme') return 'showme';
  if (stripped === 'eif') return 'eif';
  if (stripped === 'pack') return 'pack';
  if (stripped === 'sar') return 'sar';
  if (stripped === 'qip') return 'qip';
  if (stripped === 'rehearsal') return 'rehearsal';
  return 'vault';
}

export default function ComplianceHubPage() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[hsl(0_0%_8%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <motion.button
          onClick={() => navigate('/college')}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1 -ml-1 h-9 px-2 rounded-lg text-[13px] font-medium text-white hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to College
        </motion.button>
      </div>

      {/* Tab strip — sticky on scroll */}
      <div className="sticky top-0 z-20 bg-[hsl(0_0%_8%)]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-purple-300">
            Compliance Hub
          </div>
          {/* Tab strip — horizontal scroll on phone (4 × 140px > 375px),
              snap-x mandatory so swipes settle cleanly on a tab boundary
              instead of leaving a half-tab visible. */}
          <div
            className="mt-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto -mx-1 px-1 snap-x snap-mandatory scrollbar-none"
            role="tablist"
            aria-label="Compliance hub sections"
          >
            {TABS.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    'inline-flex flex-col items-start shrink-0 px-3 py-2 rounded-xl border transition-colors touch-manipulation min-w-[140px] snap-start',
                    isActive
                      ? 'border-purple-300/40 bg-purple-500/[0.10]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                  )}
                >
                  <span
                    className={cn(
                      'text-[9.5px] font-medium uppercase tracking-[0.22em] leading-none',
                      isActive ? 'text-purple-300' : 'text-white'
                    )}
                  >
                    {t.eyebrow}
                  </span>
                  <span
                    className={cn(
                      'mt-1 text-[13px] font-semibold leading-none',
                      isActive ? 'text-white' : 'text-white'
                    )}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="pt-2">
        {activeTab === 'showme' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ShowMePanel />
          </div>
        )}
        {activeTab === 'vault' && <ComplianceDocsSection />}
        {activeTab === 'eif' && (
          <Suspense
            fallback={
              <div className="py-10 text-center text-[12.5px] text-white">Loading Ofsted EIF…</div>
            }
          >
            <OfstedEifPage />
          </Suspense>
        )}
        {activeTab === 'pack' && <AuditPackPanel />}
        {activeTab === 'sar' && <ExternalRouteTeaser
          title="Self-Assessment Report (SAR)"
          eyebrow="Ofsted-aligned draft"
          body="Draft your annual SAR from live college signals — attendance, achievement, EPA outcomes, IQA findings and workforce qualifications. Structured against the four EIF judgements plus the apprenticeships lens."
          ctaLabel="Open SAR drafts"
          target="/college/compliance/sar"
        />}
        {activeTab === 'qip' && <ExternalRouteTeaser
          title="Quality Improvement Plan (QIP)"
          eyebrow="Action tracker"
          body="Track quality improvement actions flowing from SAR findings, inspections and IQA outcomes. Owner, target date, priority and progress per action."
          ctaLabel="Open QIP tracker"
          target="/college/compliance/qip"
        />}
        {activeTab === 'rehearsal' && <ExternalRouteTeaser
          title="AI Inspection Rehearsal"
          eyebrow="Mate-as-inspector"
          body="Practise probing Ofsted questions before a real visit. Mate plays the lead inspector, grades each answer and gives you an overall verdict at the end."
          ctaLabel="Start a rehearsal"
          target="/college/compliance/rehearsal"
        />}
      </div>
    </div>
  );
}

function ExternalRouteTeaser({
  title,
  eyebrow,
  body,
  ctaLabel,
  target,
}: {
  title: string;
  eyebrow: string;
  body: string;
  ctaLabel: string;
  target: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 sm:p-8">
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-[20px] sm:text-[24px] font-semibold text-white tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-[13px] text-white/80 leading-relaxed">{body}</p>
        <div className="mt-5">
          <button
            onClick={() => navigate(target)}
            className="inline-flex items-center h-11 px-4 rounded-xl text-[13px] font-semibold text-black bg-elec-yellow hover:bg-elec-yellow/90 transition-colors touch-manipulation"
          >
            {ctaLabel} →
          </button>
        </div>
      </div>
    </div>
  );
}

/** Audit pack lives at its own full-page print route. From inside the hub
    we just nudge the user to the standalone surface so they get the
    correct print stylesheet without nested layout issues. */
function AuditPackPanel() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 sm:p-8">
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
          Audit pack
        </div>
        <h2 className="mt-2 text-[20px] sm:text-[24px] font-semibold text-white tracking-tight">
          Generate the inspector-ready audit pack
        </h2>
        <p className="mt-2 text-[13px] text-white leading-relaxed">
          The audit pack assembles your Single Central Record, live policies, per-policy
          acknowledgement log, staff matrix and current compliance summary into a single print-ready
          bundle. Opens on its own page so the print stylesheet renders cleanly.
        </p>
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => navigate('/college/compliance/pack')}
            className="inline-flex items-center h-11 px-4 rounded-xl text-[13px] font-semibold text-black bg-elec-yellow hover:bg-elec-yellow/90 transition-colors touch-manipulation"
          >
            Open audit pack →
          </button>
          <button
            onClick={() => navigate('/college/compliance/pack?auto=1')}
            className="inline-flex items-center h-11 px-4 rounded-xl text-[13px] font-medium text-white hover:text-white border border-white/[0.10] hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            Auto-print on load
          </button>
        </div>
      </div>
    </div>
  );
}
