/**
 * InstallationVerificationResults — editorial install verify results.
 *
 * Drops gradient hero card, traffic-light circles, badge floods, per-status
 * background flooding. Editorial gradient surfaces with semantic text-only
 * accents, type-led category groupings, hairline-divided check rows.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, MessageSquare } from 'lucide-react';
import { RadialGauge, ExpandableSection } from './results';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface VerificationCheck {
  check_name: string;
  status: 'pass' | 'fail' | 'requires_testing';
  details: string;
  bs7671_references: string[];
  confidence: number;
}

interface InstallationVerificationResultsProps {
  analysisResult: {
    verification_checks?: VerificationCheck[];
    improvement_recommendations?: string[];
    overall_result?: 'pass' | 'fail' | 'requires_testing';
    confidence_score?: number;
    processing_time?: number;
  };
  onStartChat?: () => void;
  onExportReport?: () => void;
}

type FilterType = 'all' | 'pass' | 'fail' | 'testing';

const filters: Array<{ id: FilterType; label: string; tone: string }> = [
  { id: 'all', label: 'All', tone: 'text-white/85' },
  { id: 'pass', label: 'Pass', tone: 'text-emerald-300' },
  { id: 'fail', label: 'Fail', tone: 'text-red-300' },
  { id: 'testing', label: 'Test', tone: 'text-amber-300' },
];

const statusTone = (status: string) => {
  switch (status) {
    case 'pass':
      return {
        chip: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]',
        label: 'Pass',
      };
    case 'fail':
      return { chip: 'text-red-300 border-red-500/40 bg-red-500/[0.08]', label: 'Fail' };
    default:
      return {
        chip: 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]',
        label: 'Test',
      };
  }
};

type CategoryKey =
  | 'protective_devices'
  | 'earthing_bonding'
  | 'cables_containment'
  | 'accessories_enclosures'
  | 'general_checks';

interface CategoryDef {
  label: string;
  keywords: string[];
}

const categoryDefinitions: Record<CategoryKey, CategoryDef> = {
  protective_devices: {
    label: 'Protective devices',
    keywords: ['rcd', 'mcb', 'rcbo', 'fuse', 'protection', 'overcurrent'],
  },
  earthing_bonding: {
    label: 'Earthing + bonding',
    keywords: ['earth', 'bonding', 'cpc', 'equipotential'],
  },
  cables_containment: {
    label: 'Cables + containment',
    keywords: ['cable', 'wiring', 'containment', 'trunking', 'conduit'],
  },
  accessories_enclosures: {
    label: 'Accessories + enclosures',
    keywords: ['socket', 'switch', 'accessory', 'enclosure', 'ip'],
  },
  general_checks: { label: 'General checks', keywords: [] },
};

const categoryOrder: CategoryKey[] = [
  'protective_devices',
  'earthing_bonding',
  'cables_containment',
  'accessories_enclosures',
  'general_checks',
];

function categoriseCheck(checkName: string): CategoryKey {
  const lower = checkName.toLowerCase();
  for (const key of categoryOrder) {
    if (key === 'general_checks') continue;
    const def = categoryDefinitions[key];
    if (def.keywords.some((kw) => lower.includes(kw))) return key;
  }
  return 'general_checks';
}

interface GroupedCategory {
  key: CategoryKey;
  def: CategoryDef;
  checks: Array<{ check: VerificationCheck; originalIndex: number }>;
  passCount: number;
  failCount: number;
  testingCount: number;
}

const overallTone: Record<'pass' | 'fail' | 'requires_testing', { label: string; tone: string }> = {
  pass: { label: 'Pass', tone: 'text-emerald-300' },
  fail: { label: 'Fail', tone: 'text-red-300' },
  requires_testing: { label: 'Testing required', tone: 'text-amber-300' },
};

const InstallationVerificationResults = ({
  analysisResult,
  onStartChat,
  onExportReport,
}: InstallationVerificationResultsProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [expandedChecks, setExpandedChecks] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const checks = useMemo(
    () => analysisResult?.verification_checks || [],
    [analysisResult?.verification_checks]
  );
  const recommendations = analysisResult?.improvement_recommendations || [];

  const passCount = checks.filter((c) => c.status === 'pass').length;
  const failCount = checks.filter((c) => c.status === 'fail').length;
  const testingCount = checks.filter((c) => c.status === 'requires_testing').length;
  const totalChecks = checks.length;
  const passPercentage = totalChecks > 0 ? Math.round((passCount / totalChecks) * 100) : 0;

  const rawResult =
    analysisResult?.overall_result ||
    (failCount > 0 ? 'fail' : testingCount > 0 ? 'requires_testing' : 'pass');
  const overallResult: 'pass' | 'fail' | 'requires_testing' =
    rawResult in overallTone ? (rawResult as 'pass' | 'fail' | 'requires_testing') : 'fail';

  const filteredChecks = checks.filter((check) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pass') return check.status === 'pass';
    if (selectedFilter === 'fail') return check.status === 'fail';
    if (selectedFilter === 'testing') return check.status === 'requires_testing';
    return true;
  });

  const groupedCategories = useMemo<GroupedCategory[]>(() => {
    const groups: Record<CategoryKey, GroupedCategory> = {} as Record<CategoryKey, GroupedCategory>;

    for (const key of categoryOrder) {
      groups[key] = {
        key,
        def: categoryDefinitions[key],
        checks: [],
        passCount: 0,
        failCount: 0,
        testingCount: 0,
      };
    }

    filteredChecks.forEach((check) => {
      const originalIndex = checks.indexOf(check);
      const catKey = categoriseCheck(check.check_name);
      groups[catKey].checks.push({ check, originalIndex });
      if (check.status === 'pass') groups[catKey].passCount++;
      else if (check.status === 'fail') groups[catKey].failCount++;
      else groups[catKey].testingCount++;
    });

    return categoryOrder.map((key) => groups[key]).filter((g) => g.checks.length > 0);
  }, [filteredChecks, checks]);

  const failedChecks = checks.filter((c) => c.status === 'fail');

  const toggleCheck = (index: number) =>
    setExpandedChecks((prev) => ({ ...prev, [index]: !prev[index] }));

  const toggleStep = (index: number) =>
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }));

  const nextSteps = [
    ...(failCount > 0 ? [`Address ${failCount} failed check${failCount > 1 ? 's' : ''}`] : []),
    ...(testingCount > 0
      ? [`Complete ${testingCount} physical test${testingCount > 1 ? 's' : ''}`]
      : []),
    ...recommendations.slice(0, 2),
    'Obtain certification from qualified electrician',
  ].slice(0, 4);

  if (!checks || checks.length === 0) {
    return (
      <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-8 text-center">
        <Eyebrow>NO RESULTS</Eyebrow>
        <p className="mt-2 text-[13px] text-white/85">
          No verification results available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Hero — gauge + counts + status */}
      <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <Eyebrow>VERIFICATION RESULTS</Eyebrow>
            <p className="mt-1 text-[13px] text-white/85">
              <span className="font-semibold text-white tabular-nums">{totalChecks}</span> checks ·{' '}
              <span className={cn('font-semibold', overallTone[overallResult].tone)}>
                {overallTone[overallResult].label}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onStartChat && (
              <button
                type="button"
                onClick={onStartChat}
                aria-label="Discuss"
                className="h-10 w-10 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            )}
            {onExportReport && (
              <button
                type="button"
                onClick={onExportReport}
                aria-label="Export"
                className="h-10 w-10 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center gap-6">
          <RadialGauge
            value={passPercentage}
            label="PASSING"
            size="lg"
            color={passPercentage >= 80 ? 'green' : passPercentage >= 50 ? 'amber' : 'red'}
          />

          {/* Counts trio */}
          <dl className="flex-1 w-full grid grid-cols-3 gap-3 text-center">
            <Cell value={passCount} label="Pass" tone="text-emerald-300" />
            <Cell value={failCount} label="Fail" tone="text-red-300" />
            <Cell value={testingCount} label="Testing" tone="text-amber-300" />
          </dl>
        </div>

        <p
          className={cn(
            'mt-5 pt-4 border-t border-white/[0.06] text-center text-[16px] sm:text-[18px] font-semibold tracking-tight',
            overallTone[overallResult].tone
          )}
        >
          {overallTone[overallResult].label}
        </p>
      </section>

      {/* Needs attention */}
      {failedChecks.length > 0 && (
        <section className="rounded-2xl border border-red-500/30 bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 space-y-3">
          <Eyebrow>NEEDS ATTENTION</Eyebrow>
          <ul className="space-y-2">
            {failedChecks.map((check, idx) => (
              <li
                key={idx}
                className="rounded-xl border border-red-500/30 bg-red-500/[0.05] p-3"
              >
                <p className="text-[13px] font-semibold text-white">{check.check_name}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-red-200">{check.details}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Filter pills */}
      <ul className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {filters.map((f) => {
          const count =
            f.id === 'all'
              ? totalChecks
              : f.id === 'pass'
                ? passCount
                : f.id === 'fail'
                  ? failCount
                  : testingCount;
          const active = selectedFilter === f.id;
          return (
            <li key={f.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                  active
                    ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                    : 'text-white/85 border-white/15 hover:border-white/30'
                )}
              >
                {f.label}
                <span
                  className={cn(
                    'tabular-nums font-semibold',
                    active ? 'text-elec-yellow' : f.tone
                  )}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Grouped checks */}
      <div className="space-y-2">
        {groupedCategories.map((group) => (
          <ExpandableSection
            key={group.key}
            title={group.def.label}
            iconColor="text-elec-yellow"
            defaultOpen={group.failCount > 0}
            badge={
              <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] tabular-nums">
                {group.passCount > 0 && <span className="text-emerald-300">{group.passCount}</span>}
                {group.failCount > 0 && (
                  <>
                    {group.passCount > 0 && <span className="text-white/30">·</span>}
                    <span className="text-red-300">{group.failCount}</span>
                  </>
                )}
                {group.testingCount > 0 && (
                  <>
                    {(group.passCount > 0 || group.failCount > 0) && (
                      <span className="text-white/30">·</span>
                    )}
                    <span className="text-amber-300">{group.testingCount}</span>
                  </>
                )}
              </div>
            }
          >
            <ul className="space-y-2">
              <AnimatePresence mode="popLayout">
                {group.checks.map(({ check, originalIndex }) => {
                  const status = statusTone(check.status);
                  const isExpanded = expandedChecks[originalIndex];

                  return (
                    <motion.li
                      key={`${check.check_name}-${originalIndex}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="rounded-xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleCheck(originalIndex)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
                      >
                        <span className="text-[13.5px] font-semibold text-white truncate flex-1 min-w-0">
                          {check.check_name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={cn(
                              'inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-semibold border rounded-md px-1.5 py-0.5',
                              status.chip
                            )}
                          >
                            {status.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-white/65 transition-transform',
                              isExpanded && 'rotate-180'
                            )}
                            aria-hidden
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-white/[0.06]"
                          >
                            <div className="px-4 py-3 space-y-3">
                              <p className="text-[12.5px] leading-relaxed text-white">
                                {check.details}
                              </p>

                              {check.bs7671_references && check.bs7671_references.length > 0 && (
                                <ul className="flex flex-wrap gap-1.5">
                                  {check.bs7671_references.map((ref, refIdx) => (
                                    <li
                                      key={refIdx}
                                      className="inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-mono font-semibold text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-1.5 py-0.5"
                                    >
                                      Reg {ref}
                                    </li>
                                  ))}
                                </ul>
                              )}

                              <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
                                {Math.round(check.confidence * 100)}% confidence
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </ExpandableSection>
        ))}

        {filteredChecks.length === 0 && (
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-6 text-center">
            <p className="text-[13px] text-white/85">No checks match the selected filter.</p>
          </div>
        )}
      </div>

      {/* Next steps */}
      {nextSteps.length > 0 && (
        <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
          <Eyebrow>NEXT STEPS</Eyebrow>
          <ul className="mt-3 space-y-2">
            {nextSteps.map((step, idx) => {
              const done = completedSteps[idx];
              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => toggleStep(idx)}
                    className={cn(
                      'w-full flex items-start gap-3 rounded-xl border px-3 py-3 text-left touch-manipulation transition-colors',
                      done
                        ? 'border-emerald-500/30 bg-emerald-500/[0.05]'
                        : 'border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04]'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5',
                        done ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/30'
                      )}
                    >
                      {done && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 6.5L4.5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-[12.5px] leading-relaxed',
                        done ? 'text-white/65 line-through' : 'text-white'
                      )}
                    >
                      {step}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-500/30 bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4">
        <Eyebrow>VISUAL ASSESSMENT ONLY</Eyebrow>
        <p className="mt-2 text-[12px] leading-relaxed text-amber-200">
          Physical testing with calibrated instruments is required for full BS 7671 compliance.
          Always engage a qualified electrician for certification work.
        </p>
      </div>
    </div>
  );
};

const Cell = ({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: string;
}) => (
  <div>
    <dd className={cn('text-[28px] sm:text-[32px] font-semibold tabular-nums', tone)}>{value}</dd>
    <dt className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
  </div>
);

export default InstallationVerificationResults;
