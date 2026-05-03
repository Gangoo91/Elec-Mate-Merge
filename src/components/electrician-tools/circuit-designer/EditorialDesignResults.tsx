/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Editorial Design Results — Phase 4a rebuild.
 *
 * Replaces the icon-heavy, shadcn-card-stacked DesignReviewEditor with a
 * cohesive editorial surface that matches the wizard + streaming pages:
 * mobile-flat, no icons, full max-width with scaling gutters, numbered cells,
 * eyebrows, yellow + white headlines with periods, tabular nums, reg cite
 * chips, and a visual CU schedule.
 *
 * Surfaces A4:2026 features (AFDD, SPD, Open-PEN, Section 7xx) derived
 * from the regulation_refs the AI now cites for every circuit (Phase 3).
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storeContextForAgent, type AgentType } from '@/utils/circuit-context-generator';
import { generateEICSchedule } from '@/lib/eic/scheduleGenerator';
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import {
  recommendBoardLayout,
  type BoardRecommendation,
  type CoherenceWarning,
  type SubmainFeed,
} from './board-recommender';

interface EditorialDesignResultsProps {
  design: any;
  onReset?: () => void;
}

type CircuitStatus = 'pass' | 'review';

const getCircuitStatus = (circuit: any): CircuitStatus => {
  if (circuit?.compliance_pass === false) return 'review';
  if (Array.isArray(circuit?.ungrounded_choices) && circuit.ungrounded_choices.length > 0)
    return 'review';
  if (Array.isArray(circuit?.warnings) && circuit.warnings.length > 0) return 'review';
  if (circuit?.calculations?.voltageDrop?.compliant === false) return 'review';
  const zs = Number(circuit?.calculations?.zs ?? 0);
  const maxZs = Number(circuit?.calculations?.maxZs ?? Infinity);
  if (zs > 0 && maxZs > 0 && zs > maxZs) return 'review';
  return 'pass';
};

// Pull a compact list of cited regs from a circuit. Phase 3 schema guarantees
// regulation_refs[] with at least 2 items; fall back to scraping justification
// prose if the field is absent (older cached jobs).
const getRegRefs = (circuit: any): { reg: string; reason?: string }[] => {
  if (Array.isArray(circuit?.regulation_refs)) {
    return circuit.regulation_refs
      .filter((r: any) => r?.reg)
      .map((r: any) => ({ reg: String(r.reg), reason: r.reason }));
  }
  return [];
};

// A4 feature derivation from regulation_refs across all circuits.
const deriveA4Features = (circuits: any[]) => {
  const allRefs = circuits.flatMap((c) =>
    getRegRefs(c).map((r) => ({ ...r, circuit: c.name, idx: c.circuitNumber }))
  );

  const matches = (pattern: RegExp) => allRefs.filter((r) => pattern.test(r.reg));

  const afddRefs = matches(/^421\.1\.7/);
  const spdRefs = matches(/^443\./);
  const openPenRefs = matches(/^(411\.4\.5|722\.411\.4)/);
  const tnCsTtRcdRefs = matches(/^411\.5/);
  const evRefs = matches(/^722\./);
  const specialLocations = circuits
    .map((c) => c.specialLocation)
    .filter((s) => s && s !== 'none');
  const section7xx = matches(/^7\d{2}\./);

  return {
    afddCount: new Set(afddRefs.map((r) => r.idx)).size,
    spdRecommended: spdRefs.length > 0,
    openPenFlagged: openPenRefs.length > 0,
    ttRcdApplied: tnCsTtRcdRefs.length > 0,
    evCount: new Set(evRefs.map((r) => r.idx)).size,
    specialLocationsApplied: Array.from(new Set(specialLocations)),
    section7xxRefs: section7xx.length,
  };
};

const EditorialDesignResults = ({ design, onReset }: EditorialDesignResultsProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isSendingToEIC, setIsSendingToEIC] = useState(false);

  const circuits = design?.circuits ?? [];
  const totalCircuits = circuits.length;
  const activeCircuit = circuits[selectedIdx] ?? circuits[0];

  const stats = useMemo(() => {
    const totalLoad = Number(design?.totalLoad ?? 0);
    const diversifiedLoad = Number(design?.diversifiedLoad ?? 0);
    const factor = Number(design?.diversityFactor ?? 0);
    const totalIb = circuits.reduce(
      (sum: number, c: any) => sum + Number(c?.calculations?.Ib ?? 0),
      0
    );
    const passCount = circuits.filter((c: any) => getCircuitStatus(c) === 'pass').length;
    return { totalLoad, diversifiedLoad, factor, totalIb, passCount };
  }, [design, circuits]);

  const a4 = useMemo(() => deriveA4Features(circuits), [circuits]);

  const layout = useMemo(() => recommendBoardLayout(design), [design]);

  const supply = design?.supply || {};
  const installType = design?.installationType || design?.projectInfo?.installationType || 'domestic';
  const projectName = design?.projectName || design?.projectInfo?.projectName || 'Untitled';
  const location = design?.location || design?.projectInfo?.location || '—';

  // ─────────── Action handlers (carried over from DesignReviewEditor) ───────────

  const handleExportPDF = async () => {
    setIsExporting(true);
    const loadingToast = toast.loading('Building PDF schedule…');
    try {
      const { data, error } = await supabase.functions.invoke('generate-circuit-design-pdf', {
        body: { design, userId: user?.id },
      });
      if (error) throw error;
      if (data?.url) {
        await openOrDownloadPdf(data.url, `${projectName} — Design Schedule.pdf`);
        toast.success('PDF downloaded', { id: loadingToast });
        return;
      }
      // Fallback: client-side jsPDF
      const schedule = generateEICSchedule(circuits, design, design?.projectInfo);
      downloadEICPDF(schedule, `${projectName} — Design Schedule.pdf`);
      toast.success('PDF downloaded (fallback)', { id: loadingToast });
    } catch (err: any) {
      try {
        const schedule = generateEICSchedule(circuits, design, design?.projectInfo);
        downloadEICPDF(schedule, `${projectName} — Design Schedule.pdf`);
        toast.success('PDF downloaded (offline build)', { id: loadingToast });
      } catch (fallbackErr) {
        toast.error('PDF generation failed', {
          id: loadingToast,
          description: err?.message ?? 'Please try again',
        });
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleSendToEIC = async () => {
    setIsSendingToEIC(true);
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) throw new Error('Not authenticated');
      const installationId = crypto.randomUUID();
      const scheduleData: any = {
        circuits: circuits.map((c: any, i: number) => ({
          circuitNumber: c.circuitNumber ?? i + 1,
          name: c.name,
          loadType: c.loadType,
          loadPower: c.loadPower,
          phases: c.phases,
          voltage: c.voltage,
          cableSize: c.cableSize,
          cpcSize: c.cpcSize,
          cableType: c.cableType,
          cableLength: c.cableLength,
          installationMethod: c.installationMethod,
          protectionDevice: c.protectionDevice,
          calculations: c.calculations,
          expectedTests: c.expectedTests,
          regulation_refs: c.regulation_refs,
          cable_table_ref: c.cable_table_ref,
          ungrounded_choices: c.ungrounded_choices,
          justifications: c.justifications,
          specialLocation: c.specialLocation,
          rcdProtected: c.rcdProtected,
        })),
        supply,
        consumerUnit: design?.consumerUnit,
        projectInfo: design?.projectInfo,
        diversityBreakdown: design?.diversityBreakdown,
        totalLoad: stats.totalLoad,
        diversifiedLoad: stats.diversifiedLoad,
        diversityFactor: stats.factor,
        validationPassed: design?.validationPassed,
      };
      const { data: schedule, error } = await supabase
        .from('eic_schedules' as any)
        .insert({
          user_id: authData.user.id,
          installation_address: location || projectName,
          installation_id: installationId,
          designer_name: design?.electricianName || 'Circuit Designer AI',
          design_date: new Date().toISOString().split('T')[0],
          schedule_data: scheduleData,
          status: 'pending',
        })
        .select()
        .single();
      if (error) throw error;
      toast.success('Sent to EIC schedule', {
        description: `Reference ${(schedule as any)?.id?.slice(0, 8) ?? 'created'}`,
      });
    } catch (err: any) {
      toast.error('Failed to send to EIC', { description: err?.message ?? 'Please try again' });
    } finally {
      setIsSendingToEIC(false);
    }
  };

  const sendToAgent = (agentType: AgentType) => {
    try {
      const indices = circuits.map((_: any, i: number) => i);
      storeContextForAgent(design, indices, agentType);
      const routes: Record<AgentType, string> = {
        'cost-engineer': '/electrician/cost-engineer',
        rams: '/electrician/health-safety',
        'method-statement': '/electrician/method-statement',
        maintenance: '/electrician/maintenance',
        installer: '/electrician/installation-specialist',
      };
      navigate(routes[agentType]);
      toast.success(`Sent to ${agentType.replace('-', ' ')}`, {
        description: `${indices.length} circuit${indices.length === 1 ? '' : 's'} ready for processing`,
      });
    } catch (err: any) {
      toast.error('Failed to send context', { description: err?.message });
    }
  };

  // ─────────── Render ───────────

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4 sm:gap-6">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                aria-label="Start a new design"
                className="flex items-center gap-2 text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>New design</span>
              </button>
            )}
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Design complete
            </span>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.18em] text-white/75">
                Specialist
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {projectName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 space-y-7 sm:space-y-10">
        {/* COHERENCE BANNER — surfaces multi-board, three-phase, Zs corrections etc. */}
        <CoherenceBanner warnings={layout.warnings} />

        {/* HERO */}
        <section className="space-y-3">
          <Eyebrow>RESULTS</Eyebrow>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[56px] font-semibold tracking-tight leading-[1.05]">
            <span className="text-elec-yellow">Design</span>{' '}
            <span className="text-white">complete.</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-2xl">
            {totalCircuits} circuit{totalCircuits === 1 ? '' : 's'} designed against BS 7671:2018+A4:2026.
            Every numeric choice is grounded in the regulations and Appendix 4 cable tables.
          </p>
        </section>

        {/* PROJECT META STRIP */}
        <ProjectMetaStrip
          projectName={projectName}
          location={location}
          installType={installType}
          supply={supply}
          totalCircuits={totalCircuits}
        />

        {/* HEADLINE STATS */}
        <HeadlineStats stats={stats} totalCircuits={totalCircuits} />

        {/* A4:2026 FEATURES PANEL */}
        <A4FeaturesPanel a4={a4} earthingSystem={supply.earthingSystem} />

        {/* VISUAL CU SCHEDULE — multi-board recommendation */}
        <RecommendedBoardsView
          boards={layout.boards}
          submainFeeds={layout.submainFeeds}
          circuits={circuits}
          needsMultiBoard={layout.needsMultiBoard}
        />

        {/* CIRCUIT NAV GRID */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <Eyebrow>CIRCUITS</Eyebrow>
            <span className="text-[11px] text-white/60 tabular-nums">
              {totalCircuits} total · {stats.passCount} pass
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
            {circuits.map((c: any, i: number) => {
              const status = getCircuitStatus(c);
              const selected = i === selectedIdx;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedIdx(i)}
                  className={cn(
                    'group relative bg-[hsl(0_0%_10%)] border rounded-xl px-3.5 py-3 text-left touch-manipulation active:scale-[0.99] transition-all',
                    selected
                      ? 'border-elec-yellow/60 bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                      : 'border-white/[0.10] hover:border-white/20'
                  )}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={cn(
                        'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
                        selected ? 'text-elec-yellow' : 'text-white/55'
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'text-[9.5px] uppercase tracking-[0.16em] font-semibold',
                        status === 'pass' ? 'text-emerald-400' : 'text-amber-400'
                      )}
                    >
                      {status === 'pass' ? 'PASS' : 'REVIEW'}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[13px] sm:text-[14px] font-semibold tracking-tight text-white truncate leading-snug">
                    {c.name || `Circuit ${i + 1}`}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/60 tabular-nums">
                    {c.protectionDevice?.rating ?? '—'}A {c.protectionDevice?.curve ?? ''}{' '}
                    {c.cableSize ? `· ${c.cableSize} mm²` : ''}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ACTIVE CIRCUIT DETAIL */}
        <AnimatePresence mode="wait">
          {activeCircuit && (
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <CircuitDetail
                circuit={activeCircuit}
                circuitIndex={selectedIdx}
                totalCircuits={totalCircuits}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ALL CIRCUITS OVERVIEW (editorial table) */}
        <CircuitsOverview circuits={circuits} onSelect={setSelectedIdx} />

        {/* ACTIONS */}
        <ActionStrip
          isExporting={isExporting}
          isSendingToEIC={isSendingToEIC}
          onExportPDF={handleExportPDF}
          onSendToEIC={handleSendToEIC}
          onSendTo={sendToAgent}
          onReset={onReset}
        />
      </main>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
// Sub-components
// ───────────────────────────────────────────────────────────────────────────────

const ProjectMetaStrip = ({
  projectName,
  location,
  installType,
  supply,
  totalCircuits,
}: {
  projectName: string;
  location: string;
  installType: string;
  supply: any;
  totalCircuits: number;
}) => (
  <section className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
    <Cell label="Project" value={projectName} highlight />
    <Cell label="Location" value={location} />
    <Cell label="Install type" value={installType} capitalise />
    <Cell
      label="Supply"
      value={`${supply.voltage ?? 230}V ${supply.phases === 'three' ? '3φ' : '1φ'}`}
    />
    <Cell label="Earthing" value={supply.earthingSystem ?? 'TN-C-S'} />
    <Cell
      label="Circuits"
      value={String(totalCircuits)}
      tabular
      className="col-span-2 sm:col-span-5 sm:border-t sm:border-white/[0.08]"
    />
  </section>
);

const HeadlineStats = ({
  stats,
  totalCircuits,
}: {
  stats: { totalLoad: number; diversifiedLoad: number; factor: number; totalIb: number; passCount: number };
  totalCircuits: number;
}) => (
  <section className="space-y-4">
    <Eyebrow>01 · HEADLINE</Eyebrow>
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
      <BigStat label="Connected" value={(stats.totalLoad / 1000).toFixed(1)} unit="kW" />
      <BigStat
        label="Diversified"
        value={(stats.diversifiedLoad / 1000).toFixed(1)}
        unit="kW"
        accent
      />
      <BigStat
        label="Factor"
        value={stats.factor > 0 ? stats.factor.toFixed(2) : '—'}
        unit=""
      />
      <BigStat label="Total Ib" value={stats.totalIb.toFixed(1)} unit="A" />
      <BigStat
        label="Compliance"
        value={`${stats.passCount}`}
        unit={`/ ${totalCircuits}`}
      />
    </div>
  </section>
);

const A4FeaturesPanel = ({
  a4,
  earthingSystem,
}: {
  a4: ReturnType<typeof deriveA4Features>;
  earthingSystem?: string;
}) => {
  const items: { title: string; detail: string; reg: string }[] = [];
  if (a4.afddCount > 0) {
    items.push({
      title: 'AFDD',
      detail: `Recommended on ${a4.afddCount} circuit${a4.afddCount === 1 ? '' : 's'}`,
      reg: '421.1.7',
    });
  }
  if (a4.spdRecommended) {
    items.push({
      title: 'Surge protection',
      detail: 'Risk assessment performed; SPD recommended',
      reg: '443.4',
    });
  }
  if (a4.openPenFlagged) {
    items.push({
      title: 'Open-PEN',
      detail: 'EVSE integral PEN fault detection required',
      reg: '411.4.5',
    });
  }
  if (a4.ttRcdApplied) {
    items.push({
      title: 'TT earthing',
      detail: '30 mA RCBO applied to every circuit',
      reg: '411.5',
    });
  }
  if (a4.evCount > 0) {
    items.push({
      title: 'EV charging',
      detail: `${a4.evCount} EV circuit${a4.evCount === 1 ? '' : 's'} · Type A/B RCBO`,
      reg: '722.531.2',
    });
  }
  if (a4.specialLocationsApplied.length > 0) {
    items.push({
      title: 'Special locations',
      detail: a4.specialLocationsApplied.map((s: string) => s.replace(/-/g, ' ')).join(', '),
      reg: a4.specialLocationsApplied.includes('bathroom') ? '701' : '7xx',
    });
  }

  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <Eyebrow>02 · BS 7671:2018+A4:2026 APPLIED</Eyebrow>
      <p className="text-[12.5px] leading-relaxed text-white/60 max-w-2xl">
        Auto-applied features based on your supply, install type and the circuits you specified.
        {earthingSystem === 'TT' && ' TT earthing demands 30 mA RCD on every circuit per 411.5.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-[hsl(0_0%_10%)] border border-elec-yellow/[0.20] rounded-2xl p-4 sm:p-5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                {item.title}
              </span>
              <span className="text-[10px] font-semibold tabular-nums text-elec-yellow/80 border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-md px-1.5 py-0.5">
                {item.reg}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-white/85">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CoherenceBanner = ({ warnings }: { warnings: CoherenceWarning[] }) => {
  if (warnings.length === 0) return null;

  // Single warning → full-width hero-style banner with clear visual weight.
  // Multiple warnings → tight grid (rare in practice once design auto-resolves issues).
  if (warnings.length === 1) {
    const w = warnings[0];
    return (
      <section className="space-y-3">
        <Eyebrow>ACTION REQUIRED</Eyebrow>
        <div
          className={cn(
            'relative bg-[hsl(0_0%_10%)] border rounded-2xl px-5 py-5 sm:px-7 sm:py-7 lg:px-9 lg:py-8',
            w.severity === 'warn' ? 'border-amber-500/40' : 'border-white/[0.10]'
          )}
        >
          {/* Accent stripe */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-[3px] rounded-l-2xl',
              w.severity === 'warn' ? 'bg-amber-400/60' : 'bg-white/20'
            )}
          />
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h3
              className={cn(
                'text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tracking-tight leading-[1.1]',
                w.severity === 'warn' ? 'text-amber-300' : 'text-white'
              )}
            >
              {w.title}.
            </h3>
            {w.reg && (
              <span className="text-[10.5px] font-semibold tabular-nums text-white/65 border border-white/15 bg-white/[0.04] rounded-md px-2 py-1 uppercase tracking-[0.16em]">
                BS 7671 · {w.reg}
              </span>
            )}
          </div>
          <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] leading-relaxed text-white/85 max-w-3xl">
            {w.detail}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <Eyebrow>ACTION REQUIRED</Eyebrow>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {warnings.map((w, i) => (
          <div
            key={i}
            className={cn(
              'bg-[hsl(0_0%_10%)] border rounded-2xl p-4 sm:p-5',
              w.severity === 'warn' ? 'border-amber-500/30' : 'border-white/[0.10]'
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={cn(
                  'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
                  w.severity === 'warn' ? 'text-amber-300' : 'text-white/70'
                )}
              >
                {w.title}
              </span>
              {w.reg && (
                <span className="text-[10px] font-semibold tabular-nums text-white/60 border border-white/15 rounded-md px-1.5 py-0.5">
                  {w.reg}
                </span>
              )}
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/85">{w.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const RecommendedBoardsView = ({
  boards,
  submainFeeds,
  circuits,
  needsMultiBoard,
}: {
  boards: BoardRecommendation[];
  submainFeeds: SubmainFeed[];
  circuits: any[];
  needsMultiBoard: boolean;
}) => {
  // For each board, gather the submain feeds it ORIGINATES (one feed = one way).
  const feedsByParent = new Map<string, SubmainFeed[]>();
  submainFeeds.forEach((f) => {
    const list = feedsByParent.get(f.parentBoardId) ?? [];
    list.push(f);
    feedsByParent.set(f.parentBoardId, list);
  });

  return (
    <section className="space-y-5">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <Eyebrow>03 · RECOMMENDED BOARD LAYOUT</Eyebrow>
        <span className="text-[11px] text-white/60 tabular-nums">
          {boards.length} board{boards.length === 1 ? '' : 's'}{' '}
          {submainFeeds.length > 0 && `· ${submainFeeds.length} submain feed${submainFeeds.length === 1 ? '' : 's'}`}
        </span>
      </div>

      {needsMultiBoard && (
        <p className="text-[12.5px] leading-relaxed text-white/65 max-w-3xl">
          Circuits exceeded a single board's practical capacity. Grouped by archetype (lighting,
          sockets, wet-heat, etc.) so each board has coherent loading and dispersal per 314.1.
          Each submain is sized automatically — protection at the origin, cable, and route are
          pre-derived. Tweak in Phase 4b's wizard step.
        </p>
      )}

      <div className="space-y-5">
        {boards.map((board, idx) => (
          <BoardCard
            key={board.id}
            board={board}
            circuits={circuits}
            index={idx}
            originatingFeeds={feedsByParent.get(board.id) ?? []}
          />
        ))}
      </div>
    </section>
  );
};

const BoardCard = ({
  board,
  circuits,
  index,
  originatingFeeds,
}: {
  board: BoardRecommendation;
  circuits: any[];
  index: number;
  originatingFeeds: SubmainFeed[];
}) => {
  const boardCircuits = board.circuitIndices.map((i) => ({ idx: i, circuit: circuits[i] }));
  const totalKW = boardCircuits.reduce(
    (s, { circuit }) => s + Number(circuit?.loadPower ?? 0) / 1000,
    0
  );
  const totalWays = boardCircuits.length + originatingFeeds.length;

  return (
    <article className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden">
      {/* Board header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06]">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/70">
                · {board.isOrigin ? 'ORIGIN' : 'SUBMAIN'}
              </span>
            </div>
            <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
              {board.name}
            </h3>
            <p className="text-[12px] text-white/60">{board.location}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-baseline">
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-full px-2.5 py-0.5">
              {board.mainSwitchRating}A main
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-white border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5">
              {totalWays} ways
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-white/85 border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5">
              {totalKW.toFixed(1)} kW
            </span>
          </div>
        </div>
        <p className="mt-3 text-[12.5px] leading-relaxed text-white/75">{board.rationale}</p>

        {/* Feed-from-parent (on submain boards) */}
        {board.feedFromParent && (
          <div className="mt-4 border-t border-white/[0.06] pt-4 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Fed from parent
                </span>
                <PhaseBadge
                  label={board.feedFromParent.feedPhaseLabel}
                  sourcePhase={board.feedFromParent.feedSourcePhase}
                  accent
                />
              </div>
              <span
                className={cn(
                  'text-[10px] font-semibold tabular-nums px-2 py-0.5 rounded-md border',
                  board.feedFromParent.voltageDropOk
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.06]'
                    : 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]'
                )}
              >
                Vd {board.feedFromParent.voltageDropPercent.toFixed(2)}%
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-2 text-[12.5px]">
              <FeedFact
                label="Protection"
                value={`${board.feedFromParent.protectionRating}A ${board.feedFromParent.protectionType}${
                  board.feedFromParent.protectionCurve
                    ? ` Type ${board.feedFromParent.protectionCurve}`
                    : ''
                }`}
              />
              <FeedFact label="Breaking" value={`${board.feedFromParent.protectionKa} kA`} />
              <FeedFact label="Cable" value={`${board.feedFromParent.cableSize} mm²`} />
              <FeedFact label="Type" value={board.feedFromParent.cableType} />
              <FeedFact
                label="Length"
                value={`~${board.feedFromParent.cableLengthEstimateM} m`}
              />
            </div>
            <p className="text-[11.5px] leading-relaxed text-white/55">
              ↳ {board.feedFromParent.rationale}
            </p>
            <p className="text-[11px] leading-relaxed text-white/45">
              {board.feedFromParent.cableSizingNote}
            </p>
          </div>
        )}

        {/* Per-board engineering: SPD, phases, discrimination */}
        <BoardEngineeringStrip board={board} />
      </div>

      {/* Way grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[480px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/[0.04]">
            {/* Submain feed ways FIRST (closest to main switch on a real CU) */}
            {originatingFeeds.map((feed, fi) => (
              <div
                key={`feed-${feed.childBoardId}`}
                className="bg-elec-yellow/[0.05] border-l-2 border-elec-yellow/40 px-3 py-3 flex flex-col gap-1 min-h-[76px]"
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] tabular-nums text-elec-yellow">
                    {String(fi + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-semibold tabular-nums text-elec-yellow">
                    {feed.protectionRating}A
                  </span>
                </div>
                <div className="text-[11.5px] font-semibold text-white truncate leading-tight">
                  → {feed.childBoardName}
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <PhaseBadge
                    label={feed.feedPhaseLabel}
                    sourcePhase={feed.feedSourcePhase}
                    accent
                  />
                  <span className="text-[10px] text-white/55 tabular-nums truncate">
                    {feed.protectionType}
                    {feed.protectionCurve ? ` ${feed.protectionCurve}` : ''} · {feed.cableSize} mm²
                  </span>
                </div>
              </div>
            ))}

            {/* Real circuit ways */}
            {boardCircuits.map(({ idx: i, circuit: c }) => {
              const status = getCircuitStatus(c);
              if (!c) return null;
              const wayNumber = originatingFeeds.length + i + 1;
              const phaseLabel = board.phaseBalance?.assignments[i];
              return (
                <div
                  key={i}
                  className={cn(
                    'bg-[hsl(0_0%_10%)] px-3 py-3 flex flex-col gap-1 min-h-[76px]',
                    status === 'review' && 'bg-amber-500/[0.04]'
                  )}
                >
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] tabular-nums text-elec-yellow">
                      {String(wayNumber).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold tabular-nums text-white">
                      {c.protectionDevice?.rating ?? '—'}A
                    </span>
                  </div>
                  <div className="text-[11.5px] font-semibold text-white truncate leading-tight">
                    {c.name || `Circuit ${i + 1}`}
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    {phaseLabel && <PhaseBadge label={phaseLabel} />}
                    <span className="text-[10px] text-white/55 tabular-nums truncate">
                      {c.protectionDevice?.type ?? 'MCB'} {c.protectionDevice?.curve ?? ''} ·{' '}
                      {c.cableSize ? `${c.cableSize} mm²` : '—'}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Spare ways padding */}
            {Array.from({
              length: Math.max(0, 6 - (totalWays % 6)) % 6,
            }).map((_, i) => (
              <div
                key={`spare-${i}`}
                className="bg-[hsl(0_0%_6%)] px-3 py-3 flex flex-col gap-1 min-h-[76px]"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                  SPARE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const FeedFact = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/55">
      {label}
    </span>
    <span className="mt-0.5 text-[12.5px] font-semibold tabular-nums text-white">{value}</span>
  </div>
);

/**
 * Compact phase indicator chip.
 * For circuit ways: L1 / L2 / L3 / 3φ
 * For submain feeds: TP+N (three-phase) / L+N (single-phase, optionally with source phase)
 */
const PhaseBadge = ({
  label,
  sourcePhase,
  accent,
}: {
  label: string;
  sourcePhase?: 'L1' | 'L2' | 'L3';
  accent?: boolean;
}) => {
  const display = label === 'L1L2L3' ? '3φ' : sourcePhase ? `${label} · ${sourcePhase}` : label;
  return (
    <span
      className={cn(
        'inline-flex items-center text-[9.5px] font-semibold tabular-nums px-1.5 py-0.5 rounded border tracking-[0.05em]',
        accent
          ? 'border-elec-yellow/40 bg-elec-yellow/[0.10] text-elec-yellow'
          : 'border-white/15 bg-white/[0.04] text-white/85'
      )}
    >
      {display}
    </span>
  );
};

const BoardEngineeringStrip = ({ board }: { board: BoardRecommendation }) => {
  const items: Array<{
    title: string;
    value: string;
    detail?: string;
    reg?: string;
    accent: 'good' | 'warn' | 'info';
  }> = [];

  // Diversified load + design current
  items.push({
    title: 'Board load',
    value: `${(board.diversifiedLoadW / 1000).toFixed(1)} kW · ${board.designCurrentA.toFixed(1)} A`,
    detail: 'Sum of diversified circuit loads (Appendix A diversity factors).',
    accent: 'info',
  });

  // SPD
  if (board.spd) {
    items.push({
      title: 'SPD',
      value: board.spd.required ? board.spd.type : 'Optional',
      detail: board.spd.rationale,
      reg: board.spd.reg,
      accent: board.spd.required ? 'warn' : 'info',
    });
  }

  // Phase balance
  if (board.phaseBalance) {
    const pb = board.phaseBalance;
    const accent: 'good' | 'warn' | 'info' =
      pb.flag === 'severe-imbalance' ? 'warn' : pb.flag === 'balanced' ? 'good' : 'info';
    items.push({
      title: 'Phase balance',
      value: `L1 ${(pb.L1_W / 1000).toFixed(1)} · L2 ${(pb.L2_W / 1000).toFixed(1)} · L3 ${(pb.L3_W / 1000).toFixed(1)} kW`,
      detail: `${pb.imbalancePercent.toFixed(0)}% spread · ${pb.flag?.replace('-', ' ')}`,
      reg: '525.1.2',
      accent,
    });
  }

  // Discrimination
  if (board.discrimination && board.discrimination.largestChildRating > 0) {
    items.push({
      title: 'Discrimination',
      value: `${board.discrimination.ratio.toFixed(1)}:1`,
      detail: board.discrimination.note,
      reg: '536.4',
      accent: board.discrimination.ok ? 'good' : 'warn',
    });
  }

  if (items.length === 0) return null;

  return (
    <div className="mt-4 border-t border-white/[0.06] pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className={cn(
              'rounded-xl px-3.5 py-3 border',
              it.accent === 'warn'
                ? 'border-amber-500/30 bg-amber-500/[0.04]'
                : it.accent === 'good'
                  ? 'border-emerald-500/30 bg-emerald-500/[0.04]'
                  : 'border-white/[0.10] bg-[hsl(0_0%_8%)]'
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={cn(
                  'text-[9.5px] font-semibold uppercase tracking-[0.18em]',
                  it.accent === 'warn'
                    ? 'text-amber-300'
                    : it.accent === 'good'
                      ? 'text-emerald-400'
                      : 'text-white/65'
                )}
              >
                {it.title}
              </span>
              {it.reg && (
                <span className="text-[9.5px] font-semibold tabular-nums text-white/55 border border-white/10 rounded px-1.5 py-0.5">
                  {it.reg}
                </span>
              )}
            </div>
            <div className="mt-1 text-[12.5px] font-semibold tabular-nums text-white">
              {it.value}
            </div>
            {it.detail && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">{it.detail}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CircuitDetail = ({
  circuit,
  circuitIndex,
  totalCircuits,
}: {
  circuit: any;
  circuitIndex: number;
  totalCircuits: number;
}) => {
  const status = getCircuitStatus(circuit);
  const regs = getRegRefs(circuit);
  const vd = circuit?.calculations?.voltageDrop;
  const justification = circuit?.justifications?.designJustification ||
    circuit?.justifications?.cableSize ||
    circuit?.structuredOutput?.sections?.designJustification ||
    '';

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="space-y-1">
          <Eyebrow>
            CIRCUIT {String(circuitIndex + 1).padStart(2, '0')} OF{' '}
            {String(totalCircuits).padStart(2, '0')}
          </Eyebrow>
          <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight leading-[1.1] text-white">
            {circuit.name}
          </h3>
          <p className="text-[12.5px] text-white/60 capitalize">
            {String(circuit.loadType ?? '').replace(/-/g, ' ')}
          </p>
        </div>
        <span
          className={cn(
            'text-[10.5px] uppercase tracking-[0.18em] font-semibold',
            status === 'pass' ? 'text-emerald-400' : 'text-amber-400'
          )}
        >
          {status === 'pass' ? 'PASS' : 'REVIEW REQUIRED'}
        </span>
      </div>

      {/* 01 · LOAD */}
      <DetailSection number="01" title="LOAD">
        <DetailGrid>
          <DetailField label="Power" value={`${(circuit.loadPower / 1000).toFixed(2)} kW`} />
          <DetailField
            label="Design current (Ib)"
            value={`${Number(circuit?.calculations?.Ib ?? 0).toFixed(2)} A`}
          />
          <DetailField label="Phases" value={circuit.phases === 'three' ? 'Three' : 'Single'} />
          <DetailField
            label="Diversity factor"
            value={String(circuit?.calculations?.diversityFactor ?? '—')}
          />
          {circuit?.calculations?.diversifiedLoad ? (
            <DetailField
              label="Diversified load"
              value={`${(circuit.calculations.diversifiedLoad / 1000).toFixed(2)} kW`}
            />
          ) : null}
          <DetailField
            label="Voltage"
            value={`${circuit.voltage ?? 230} V`}
          />
        </DetailGrid>
      </DetailSection>

      {/* 02 · CABLE */}
      <DetailSection number="02" title="CABLE">
        <DetailGrid>
          <DetailField label="Live conductor" value={`${circuit.cableSize ?? '—'} mm²`} />
          <DetailField label="CPC" value={`${circuit.cpcSize ?? '—'} mm²`} />
          <DetailField label="Cable type" value={circuit.cableType ?? '—'} />
          <DetailField label="Length" value={`${circuit.cableLength ?? '—'} m`} />
          <DetailField
            label="Method"
            value={circuit.installationMethod ?? '—'}
            className="sm:col-span-2"
          />
          <DetailField
            label="Iz (current capacity)"
            value={
              circuit?.calculations?.Iz != null
                ? `${Number(circuit.calculations.Iz).toFixed(1)} A`
                : '—'
            }
          />
          {circuit.cable_table_ref ? (
            <DetailField
              label="Table"
              value={circuit.cable_table_ref}
              chip={circuit.cable_table_ref !== 'ungrounded'}
              warn={circuit.cable_table_ref === 'ungrounded'}
            />
          ) : null}
        </DetailGrid>
      </DetailSection>

      {/* 03 · PROTECTION */}
      <DetailSection number="03" title="PROTECTION">
        <DetailGrid>
          <DetailField label="Device" value={circuit.protectionDevice?.type ?? '—'} />
          <DetailField label="Rating" value={`${circuit.protectionDevice?.rating ?? '—'} A`} />
          <DetailField label="Curve" value={circuit.protectionDevice?.curve ?? '—'} />
          <DetailField
            label="Breaking capacity"
            value={`${circuit.protectionDevice?.kaRating ?? '—'} kA`}
          />
          <DetailField
            label="RCD protected"
            value={circuit.rcdProtected ? 'Yes' : 'No'}
          />
        </DetailGrid>
      </DetailSection>

      {/* 04 · COMPLIANCE */}
      <DetailSection number="04" title="COMPLIANCE">
        <DetailGrid>
          {vd ? (
            <DetailField
              label="Voltage drop"
              value={`${Number(vd.percent ?? 0).toFixed(2)}% (${Number(vd.volts ?? 0).toFixed(2)} V)`}
              warn={vd.compliant === false}
            />
          ) : null}
          {vd ? (
            <DetailField
              label="VD limit"
              value={`${vd.limit ?? '—'}%`}
            />
          ) : null}
          <DetailField
            label="Zs (calculated)"
            value={
              circuit?.calculations?.zs != null
                ? `${Number(circuit.calculations.zs).toFixed(2)} Ω`
                : '—'
            }
          />
          <DetailField
            label="Max Zs permitted"
            value={
              circuit?.calculations?.maxZs != null
                ? `${Number(circuit.calculations.maxZs).toFixed(2)} Ω`
                : '—'
            }
          />
          <DetailField
            label="In (device rating)"
            value={`${circuit?.calculations?.In ?? '—'} A`}
          />
        </DetailGrid>
      </DetailSection>

      {/* 05 · TESTS */}
      <DetailSection number="05" title="TEST VALUES">
        <DetailGrid>
          <DetailField
            label="R1+R2 @ 20°C"
            value={
              circuit?.expectedTests?.r1r2?.at20C != null
                ? `${Number(circuit.expectedTests.r1r2.at20C).toFixed(3)} Ω`
                : '—'
            }
          />
          <DetailField
            label="R1+R2 @ 70°C"
            value={
              circuit?.expectedTests?.r1r2?.at70C != null
                ? `${Number(circuit.expectedTests.r1r2.at70C).toFixed(3)} Ω`
                : '—'
            }
          />
          <DetailField
            label="Insulation resistance"
            value={
              circuit?.expectedTests?.insulationResistance?.minResistance ??
              '≥1.0 MΩ @ 500 V DC'
            }
          />
          <DetailField
            label="RCD trip (1×)"
            value={circuit?.expectedTests?.rcdTest?.at1x ?? '—'}
          />
          <DetailField
            label="RCD trip (5×)"
            value={circuit?.expectedTests?.rcdTest?.at5x ?? '—'}
          />
          <DetailField
            label="Polarity"
            value={circuit?.expectedTests?.polarity ?? 'Verify all terminations'}
            className="sm:col-span-2 lg:col-span-3"
          />
        </DetailGrid>
      </DetailSection>

      {/* 06 · GROUNDING */}
      <DetailSection number="06" title="GROUNDING">
        <div className="space-y-4">
          {regs.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {regs.map((r, i) => (
                <span
                  key={i}
                  title={r.reason}
                  className="text-[11px] font-semibold tabular-nums px-2.5 py-1 rounded-md bg-elec-yellow/[0.08] text-elec-yellow border border-elec-yellow/25"
                >
                  {r.reg}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-amber-400">
              No regulation refs cited — older job or fallback design. Newer designs cite at least 2 regs per circuit.
            </p>
          )}

          {Array.isArray(circuit.ungrounded_choices) && circuit.ungrounded_choices.length > 0 && (
            <div className="bg-amber-500/[0.06] border border-amber-500/30 rounded-xl p-4 space-y-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                Ungrounded choices · review
              </div>
              <ul className="space-y-1 text-[12.5px] text-white/85">
                {circuit.ungrounded_choices.map((u: string, i: number) => (
                  <li key={i}>· {u}</li>
                ))}
              </ul>
            </div>
          )}

          {justification && (
            <div className="bg-[hsl(0_0%_8%)] border border-white/[0.08] rounded-xl p-4 sm:p-5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                Designer's reasoning
              </div>
              <p className="text-[13px] leading-relaxed text-white/85 whitespace-pre-wrap">
                {justification}
              </p>
            </div>
          )}
        </div>
      </DetailSection>
    </section>
  );
};

const CircuitsOverview = ({
  circuits,
  onSelect,
}: {
  circuits: any[];
  onSelect: (i: number) => void;
}) => (
  <section className="space-y-4">
    <Eyebrow>04 · ALL CIRCUITS</Eyebrow>
    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b border-white/[0.10]">
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Cable</Th>
            <Th>Protection</Th>
            <Th>VD</Th>
            <Th>Zs / max</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {circuits.map((c: any, i: number) => {
            const status = getCircuitStatus(c);
            const vd = c?.calculations?.voltageDrop;
            return (
              <tr
                key={i}
                className="border-b border-white/[0.05] hover:bg-white/[0.02] cursor-pointer transition-colors"
                onClick={() => onSelect(i)}
              >
                <Td>
                  <span className="text-[11px] font-semibold tabular-nums text-elec-yellow">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Td>
                <Td>
                  <div className="text-[13px] font-semibold text-white truncate max-w-[180px]">
                    {c.name || `Circuit ${i + 1}`}
                  </div>
                  <div className="text-[11px] text-white/55 capitalize">
                    {String(c.loadType ?? '').replace(/-/g, ' ')}
                  </div>
                </Td>
                <Td>
                  <span className="tabular-nums text-white">
                    {c.cableSize ?? '—'}
                    {c.cpcSize ? ` / ${c.cpcSize}` : ''} mm²
                  </span>
                </Td>
                <Td>
                  <span className="tabular-nums text-white">
                    {c.protectionDevice?.rating ?? '—'}A {c.protectionDevice?.type ?? ''}{' '}
                    {c.protectionDevice?.curve ?? ''}
                  </span>
                </Td>
                <Td>
                  <span
                    className={cn(
                      'tabular-nums',
                      vd?.compliant === false ? 'text-amber-400' : 'text-white'
                    )}
                  >
                    {vd?.percent != null ? `${Number(vd.percent).toFixed(2)}%` : '—'}
                  </span>
                </Td>
                <Td>
                  <span className="tabular-nums text-white">
                    {c?.calculations?.zs != null ? Number(c.calculations.zs).toFixed(2) : '—'}{' '}
                    /{' '}
                    {c?.calculations?.maxZs != null
                      ? Number(c.calculations.maxZs).toFixed(2)
                      : '—'}{' '}
                    Ω
                  </span>
                </Td>
                <Td>
                  <span
                    className={cn(
                      'text-[10.5px] uppercase tracking-[0.16em] font-semibold',
                      status === 'pass' ? 'text-emerald-400' : 'text-amber-400'
                    )}
                  >
                    {status === 'pass' ? 'PASS' : 'REVIEW'}
                  </span>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

const ActionStrip = ({
  isExporting,
  isSendingToEIC,
  onExportPDF,
  onSendToEIC,
  onSendTo,
  onReset,
}: {
  isExporting: boolean;
  isSendingToEIC: boolean;
  onExportPDF: () => void;
  onSendToEIC: () => void;
  onSendTo: (a: AgentType) => void;
  onReset?: () => void;
}) => (
  <section className="space-y-4">
    <Eyebrow>05 · NEXT</Eyebrow>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
      <ActionButton
        label={isExporting ? 'Building PDF…' : 'Download PDF'}
        primary
        disabled={isExporting}
        onClick={onExportPDF}
      />
      <ActionButton
        label={isSendingToEIC ? 'Sending…' : 'Send to EIC schedule'}
        disabled={isSendingToEIC}
        onClick={onSendToEIC}
      />
      <ActionButton label="Send to Cost Engineer" onClick={() => onSendTo('cost-engineer')} />
      <ActionButton label="Send to RAMS / H&S" onClick={() => onSendTo('rams')} />
      <ActionButton
        label="Send to Method Statement"
        onClick={() => onSendTo('method-statement')}
      />
      <ActionButton
        label="Send to Maintenance"
        onClick={() => onSendTo('maintenance')}
      />
      <ActionButton label="Send to Installer" onClick={() => onSendTo('installer')} />
      {onReset && <ActionButton label="New design" onClick={onReset} />}
    </div>
  </section>
);

// ───────────────────────────────────────────────────────────────────────────────
// Atoms
// ───────────────────────────────────────────────────────────────────────────────

const Cell = ({
  label,
  value,
  highlight,
  capitalise,
  tabular,
  className,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  capitalise?: boolean;
  tabular?: boolean;
  className?: string;
}) => (
  <div className={cn('bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-5 sm:py-4 min-w-0', className)}>
    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 truncate">
      {label}
    </div>
    <div
      className={cn(
        'mt-1 text-[13px] font-semibold truncate',
        highlight ? 'text-elec-yellow' : 'text-white',
        capitalise && 'capitalize',
        tabular && 'tabular-nums'
      )}
    >
      {value}
    </div>
  </div>
);

const BigStat = ({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) => (
  <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
      {label}
    </div>
    <div
      className={cn(
        'mt-1.5 text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tabular-nums leading-none',
        accent ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {value}
      {unit && <span className="text-[14px] text-white/60 ml-1 font-medium">{unit}</span>}
    </div>
  </div>
);

const DetailSection = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-baseline gap-2">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
        {number}
      </span>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/85">
        · {title}
      </span>
    </div>
    <div className="sm:bg-[hsl(0_0%_10%)] sm:border sm:border-white/[0.08] sm:rounded-2xl sm:p-5 lg:p-6 py-2 border-y border-white/[0.06] sm:border-y">
      {children}
    </div>
  </div>
);

const DetailGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">{children}</div>
);

const DetailField = ({
  label,
  value,
  chip,
  warn,
  className,
}: {
  label: string;
  value: string;
  chip?: boolean;
  warn?: boolean;
  className?: string;
}) => (
  <div className={cn('flex flex-col min-w-0', className)}>
    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
      {label}
    </span>
    {chip ? (
      <span className="mt-1 text-[12px] font-semibold tabular-nums px-2.5 py-1 rounded-md bg-elec-yellow/[0.08] text-elec-yellow border border-elec-yellow/25 self-start">
        {value}
      </span>
    ) : (
      <span
        className={cn(
          'mt-1 text-[14px] font-semibold tabular-nums truncate',
          warn ? 'text-amber-400' : 'text-white'
        )}
      >
        {value}
      </span>
    )}
  </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 whitespace-nowrap">
    {children}
  </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-3 py-3 text-[12.5px] align-top whitespace-nowrap">{children}</td>
);

const ActionButton = ({
  label,
  onClick,
  disabled,
  primary,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'h-12 px-4 text-[13px] font-semibold rounded-xl border transition-all touch-manipulation active:scale-[0.99] text-left',
      primary
        ? 'bg-elec-yellow text-black border-elec-yellow hover:bg-elec-yellow/90 disabled:opacity-50'
        : 'bg-[hsl(0_0%_10%)] text-white border-white/[0.10] hover:border-white/25 disabled:opacity-50',
      disabled && 'cursor-not-allowed'
    )}
  >
    {label}
  </button>
);

export default EditorialDesignResults;
