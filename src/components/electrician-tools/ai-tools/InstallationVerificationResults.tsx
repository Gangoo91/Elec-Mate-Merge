import { useState, useMemo } from 'react';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Download,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Shield,
  Zap,
  Cable,
  PlugZap,
  ClipboardCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialGauge, ExpandableSection } from './results';
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

const filterConfig: Record<FilterType, { label: string; icon: typeof CheckCircle; color: string }> =
  {
    all: { label: 'All', icon: Sparkles, color: 'text-white' },
    pass: { label: 'Pass', icon: CheckCircle, color: 'text-green-400' },
    fail: { label: 'Fail', icon: XCircle, color: 'text-red-400' },
    testing: { label: 'Test', icon: HelpCircle, color: 'text-amber-400' },
  };

const statusConfig = {
  pass: {
    icon: CheckCircle,
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    label: 'Pass',
  },
  fail: {
    icon: XCircle,
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    label: 'Fail',
  },
  requires_testing: {
    icon: HelpCircle,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    label: 'Test Required',
  },
};

// Category definitions for grouping checks
type CategoryKey =
  | 'protective_devices'
  | 'earthing_bonding'
  | 'cables_containment'
  | 'accessories_enclosures'
  | 'general_checks';

interface CategoryDef {
  label: string;
  icon: typeof Shield;
  keywords: string[];
}

const categoryDefinitions: Record<CategoryKey, CategoryDef> = {
  protective_devices: {
    label: 'Protective Devices',
    icon: Shield,
    keywords: ['rcd', 'mcb', 'rcbo', 'fuse', 'protection', 'overcurrent'],
  },
  earthing_bonding: {
    label: 'Earthing & Bonding',
    icon: Zap,
    keywords: ['earth', 'bonding', 'cpc', 'equipotential'],
  },
  cables_containment: {
    label: 'Cables & Containment',
    icon: Cable,
    keywords: ['cable', 'wiring', 'containment', 'trunking', 'conduit'],
  },
  accessories_enclosures: {
    label: 'Accessories & Enclosures',
    icon: PlugZap,
    keywords: ['socket', 'switch', 'accessory', 'enclosure', 'ip'],
  },
  general_checks: {
    label: 'General Checks',
    icon: ClipboardCheck,
    keywords: [],
  },
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
    if (def.keywords.some((kw) => lower.includes(kw))) {
      return key;
    }
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

const overallResultConfig = {
  pass: {
    label: 'PASS',
    colour: 'text-green-400',
  },
  fail: {
    label: 'FAIL',
    colour: 'text-red-400',
  },
  requires_testing: {
    label: 'REQUIRES TESTING',
    colour: 'text-amber-400',
  },
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

  // Calculate counts
  const passCount = checks.filter((c) => c.status === 'pass').length;
  const failCount = checks.filter((c) => c.status === 'fail').length;
  const testingCount = checks.filter((c) => c.status === 'requires_testing').length;
  const totalChecks = checks.length;
  const passPercentage = totalChecks > 0 ? Math.round((passCount / totalChecks) * 100) : 0;

  // Determine overall result
  const overallResult: 'pass' | 'fail' | 'requires_testing' =
    analysisResult?.overall_result ||
    (failCount > 0 ? 'fail' : testingCount > 0 ? 'requires_testing' : 'pass');

  // Filter checks
  const filteredChecks = checks.filter((check) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pass') return check.status === 'pass';
    if (selectedFilter === 'fail') return check.status === 'fail';
    if (selectedFilter === 'testing') return check.status === 'requires_testing';
    return true;
  });

  // Group filtered checks by category
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

  // Get failed checks for attention section
  const failedChecks = checks.filter((c) => c.status === 'fail');

  const toggleCheck = (index: number) => {
    setExpandedChecks((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Build next steps
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
      <div className="p-6 text-center rounded-xl border border-border/50 bg-card/50">
        <Sparkles className="h-12 w-12 text-white mx-auto mb-3" />
        <p className="text-white">No verification results available</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Radial Gauge + Traffic Light Section */}
      <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl p-6 overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/[0.02] via-transparent to-elec-blue/[0.02] pointer-events-none" />

        <div className="relative">
          {/* Header with actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                Verification Results
              </h2>
              <p className="text-sm text-white mt-1">{totalChecks} checks performed</p>
            </div>
            <div className="flex gap-2">
              {onStartChat && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onStartChat}
                  className="h-11 touch-manipulation"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
              {onExportReport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExportReport}
                  className="h-11 touch-manipulation"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Gauge and traffic light */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <RadialGauge
              value={passPercentage}
              label="PASSING"
              size="lg"
              color={passPercentage >= 80 ? 'green' : passPercentage >= 50 ? 'amber' : 'red'}
            />

            {/* Traffic-light indicator */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                {/* Pass circle */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center',
                      'border-2 transition-all',
                      overallResult === 'pass'
                        ? 'bg-green-500/30 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                        : 'bg-green-500/5 border-green-500/20 opacity-40'
                    )}
                  >
                    <span
                      className={cn(
                        'text-2xl sm:text-3xl font-bold',
                        overallResult === 'pass' ? 'text-green-400' : 'text-green-400/50'
                      )}
                    >
                      {passCount}
                    </span>
                  </div>
                  <span className="text-xs text-white font-medium">Pass</span>
                </div>

                {/* Fail circle */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center',
                      'border-2 transition-all',
                      overallResult === 'fail'
                        ? 'bg-red-500/30 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : 'bg-red-500/5 border-red-500/20 opacity-40'
                    )}
                  >
                    <span
                      className={cn(
                        'text-2xl sm:text-3xl font-bold',
                        overallResult === 'fail' ? 'text-red-400' : 'text-red-400/50'
                      )}
                    >
                      {failCount}
                    </span>
                  </div>
                  <span className="text-xs text-white font-medium">Fail</span>
                </div>

                {/* Requires Testing circle */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center',
                      'border-2 transition-all',
                      overallResult === 'requires_testing'
                        ? 'bg-amber-500/30 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                        : 'bg-amber-500/5 border-amber-500/20 opacity-40'
                    )}
                  >
                    <span
                      className={cn(
                        'text-2xl sm:text-3xl font-bold',
                        overallResult === 'requires_testing'
                          ? 'text-amber-400'
                          : 'text-amber-400/50'
                      )}
                    >
                      {testingCount}
                    </span>
                  </div>
                  <span className="text-xs text-white font-medium">Testing</span>
                </div>
              </div>

              {/* Overall result text */}
              <div className="text-center">
                <p
                  className={cn(
                    'text-xl sm:text-2xl font-extrabold tracking-wide',
                    overallResultConfig[overallResult].colour
                  )}
                >
                  {overallResultConfig[overallResult].label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Needs Attention Section - Only show if failures exist */}
      {failedChecks.length > 0 && (
        <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h3 className="font-semibold text-red-400">Needs Attention</h3>
          </div>
          <div className="space-y-2">
            {failedChecks.map((check, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white text-sm">{check.check_name}</p>
                  <p className="text-xs text-white mt-1">{check.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(Object.keys(filterConfig) as FilterType[]).map((filter) => {
          const config = filterConfig[filter];
          const Icon = config.icon;
          const count =
            filter === 'all'
              ? totalChecks
              : filter === 'pass'
                ? passCount
                : filter === 'fail'
                  ? failCount
                  : testingCount;
          const isActive = selectedFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm',
                'min-h-[44px] touch-manipulation transition-all flex-shrink-0',
                isActive
                  ? 'bg-elec-yellow/20 border-2 border-elec-yellow/40 text-elec-yellow'
                  : 'bg-card/50 border border-border/30 text-white hover:bg-accent/30'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{config.label}</span>
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                {count}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Grouped Checks by Category */}
      <div className="space-y-3">
        {groupedCategories.map((group) => {
          const CatIcon = group.def.icon;
          return (
            <ExpandableSection
              key={group.key}
              title={group.def.label}
              icon={CatIcon}
              iconColor="text-elec-yellow"
              defaultOpen={group.failCount > 0}
              badge={
                <div className="flex items-center gap-1.5">
                  {group.passCount > 0 && (
                    <Badge className="text-xs bg-green-500/15 text-green-400 border border-green-500/30 px-1.5 py-0">
                      {group.passCount}
                    </Badge>
                  )}
                  {group.failCount > 0 && (
                    <Badge className="text-xs bg-red-500/15 text-red-400 border border-red-500/30 px-1.5 py-0">
                      {group.failCount}
                    </Badge>
                  )}
                  {group.testingCount > 0 && (
                    <Badge className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0">
                      {group.testingCount}
                    </Badge>
                  )}
                </div>
              }
            >
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {group.checks.map(({ check, originalIndex }) => {
                    const status =
                      statusConfig[check.status as keyof typeof statusConfig] ||
                      statusConfig.requires_testing;
                    const StatusIcon = status.icon;
                    const isExpanded = expandedChecks[originalIndex];

                    return (
                      <motion.div
                        key={`${check.check_name}-${originalIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          'rounded-xl border overflow-hidden',
                          status.border,
                          status.bg
                        )}
                      >
                        <button
                          onClick={() => toggleCheck(originalIndex)}
                          className="w-full flex items-center justify-between gap-3 p-4 min-h-[56px] touch-manipulation text-left"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <StatusIcon className={cn('h-5 w-5 flex-shrink-0', status.text)} />
                            <span className="font-medium text-white truncate">
                              {check.check_name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                'text-xs',
                                status.bg,
                                status.text,
                                'border',
                                status.border
                              )}
                            >
                              {status.label}
                            </Badge>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              className="text-white"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-0 space-y-3">
                                <div className="border-t border-border/30 pt-3">
                                  <p className="text-sm text-white leading-relaxed">
                                    {check.details}
                                  </p>
                                </div>

                                {check.bs7671_references && check.bs7671_references.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {check.bs7671_references.map((ref, refIdx) => (
                                      <Badge
                                        key={refIdx}
                                        variant="outline"
                                        className="text-xs font-mono text-white"
                                      >
                                        BS 7671: {ref}
                                      </Badge>
                                    ))}
                                  </div>
                                )}

                                <div className="text-xs text-white">
                                  Confidence: {Math.round(check.confidence * 100)}%
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </ExpandableSection>
          );
        })}

        {filteredChecks.length === 0 && (
          <div className="p-6 text-center rounded-xl bg-card/50 border border-border/30">
            <p className="text-sm text-white">No checks match the selected filter</p>
          </div>
        )}
      </div>

      {/* Next Steps Checklist */}
      {nextSteps.length > 0 && (
        <div className="rounded-xl border border-elec-yellow/20 bg-card/50 overflow-hidden">
          <div className="px-4 py-3 bg-elec-yellow/5 border-b border-elec-yellow/20">
            <h3 className="font-semibold text-white">Next Steps</h3>
          </div>
          <div className="p-4 space-y-2">
            {nextSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => toggleStep(idx)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 rounded-lg text-left',
                  'min-h-[48px] touch-manipulation transition-colors',
                  completedSteps[idx]
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-background/50 border border-border/30 hover:bg-accent/30'
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0',
                    'border-2 transition-colors',
                    completedSteps[idx] ? 'bg-green-500 border-green-500' : 'border-white/30'
                  )}
                >
                  {completedSteps[idx] && <CheckCircle className="h-4 w-4 text-white" />}
                </div>
                <span
                  className={cn(
                    'text-sm leading-relaxed',
                    completedSteps[idx] ? 'text-white line-through opacity-80' : 'text-white'
                  )}
                >
                  {step}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-400 text-sm mb-1">Visual Assessment Only</p>
            <p className="text-xs text-white leading-relaxed">
              Physical testing with calibrated instruments is required for full BS 7671 compliance.
              Always engage a qualified electrician for certification work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallationVerificationResults;
