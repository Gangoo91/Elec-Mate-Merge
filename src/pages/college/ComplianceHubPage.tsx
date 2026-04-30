import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComplianceDocsSection } from '@/components/college/sections/ComplianceDocsSection';

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

type Tab = 'vault' | 'eif' | 'pack';

const TABS: { key: Tab; label: string; eyebrow: string }[] = [
  { key: 'vault', label: 'Vault & Policies', eyebrow: 'Records, CPD, policies' },
  { key: 'eif', label: 'Ofsted EIF', eyebrow: 'Live RAG snapshot' },
  { key: 'pack', label: 'Audit Pack', eyebrow: 'Print-ready inspection bundle' },
];

function tabFromHash(hash: string): Tab {
  const stripped = hash.replace('#', '').toLowerCase();
  if (stripped === 'eif') return 'eif';
  if (stripped === 'pack') return 'pack';
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
          className="inline-flex items-center gap-1 -ml-1 h-9 px-2 rounded-lg text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
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
          <div className="mt-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto -mx-1 px-1 scrollbar-none">
            {TABS.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    'inline-flex flex-col items-start shrink-0 px-3 py-2 rounded-xl border transition-colors touch-manipulation min-w-[140px]',
                    isActive
                      ? 'border-purple-300/40 bg-purple-500/[0.10]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                  )}
                >
                  <span
                    className={cn(
                      'text-[9.5px] font-medium uppercase tracking-[0.22em] leading-none',
                      isActive ? 'text-purple-300' : 'text-white/55'
                    )}
                  >
                    {t.eyebrow}
                  </span>
                  <span
                    className={cn(
                      'mt-1 text-[13px] font-semibold leading-none',
                      isActive ? 'text-white' : 'text-white/85'
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
        {activeTab === 'vault' && <ComplianceDocsSection />}
        {activeTab === 'eif' && (
          <Suspense
            fallback={
              <div className="py-10 text-center text-[12.5px] text-white/55">
                Loading Ofsted EIF…
              </div>
            }
          >
            <OfstedEifPage />
          </Suspense>
        )}
        {activeTab === 'pack' && <AuditPackPanel />}
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
        <p className="mt-2 text-[13px] text-white/85 leading-relaxed">
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
            className="inline-flex items-center h-11 px-4 rounded-xl text-[13px] font-medium text-white/85 hover:text-white border border-white/[0.10] hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            Auto-print on load
          </button>
        </div>
      </div>
    </div>
  );
}
