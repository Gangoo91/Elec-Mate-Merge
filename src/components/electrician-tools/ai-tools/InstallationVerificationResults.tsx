import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, AlertTriangle, Download, MessageSquare, Sparkles, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { RadialGauge, ExpandableSection } from "./results";
import { cn } from "@/lib/utils";

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
  imageUrl?: string;
  timestamp?: string;
  onStartChat?: () => void;
  onExportReport?: () => void;
}

type FilterType = 'all' | 'pass' | 'fail' | 'testing';

const filterConfig: Record<FilterType, { label: string; icon: typeof CheckCircle; color: string }> = {
  all: { label: 'All', icon: Sparkles, color: 'text-foreground' },
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

const InstallationVerificationResults = ({
  analysisResult,
  onStartChat,
  onExportReport
}: InstallationVerificationResultsProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [expandedChecks, setExpandedChecks] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const checks = analysisResult?.verification_checks || [];
  const recommendations = analysisResult?.improvement_recommendations || [];

  // Calculate counts
  const passCount = checks.filter(c => c.status === 'pass').length;
  const failCount = checks.filter(c => c.status === 'fail').length;
  const testingCount = checks.filter(c => c.status === 'requires_testing').length;
  const totalChecks = checks.length;
  const passPercentage = totalChecks > 0 ? Math.round((passCount / totalChecks) * 100) : 0;

  // Filter checks
  const filteredChecks = checks.filter(check => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pass') return check.status === 'pass';
    if (selectedFilter === 'fail') return check.status === 'fail';
    if (selectedFilter === 'testing') return check.status === 'requires_testing';
    return true;
  });

  // Get failed checks for attention section
  const failedChecks = checks.filter(c => c.status === 'fail');

  const toggleCheck = (index: number) => {
    setExpandedChecks(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Build next steps
  const nextSteps = [
    ...(failCount > 0 ? [`Address ${failCount} failed check${failCount > 1 ? 's' : ''}`] : []),
    ...(testingCount > 0 ? [`Complete ${testingCount} physical test${testingCount > 1 ? 's' : ''}`] : []),
    ...recommendations.slice(0, 2),
    'Obtain certification from qualified electrician',
  ].slice(0, 4);

  if (!checks || checks.length === 0) {
    return (
      <div className="p-6 text-center rounded-xl border border-border/50 bg-card/50">
        <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No verification results available</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Radial Gauge Section */}
      <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl p-6 overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/[0.02] via-transparent to-elec-blue/[0.02] pointer-events-none" />

        <div className="relative">
          {/* Header with actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                Verification Results
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {totalChecks} checks performed
              </p>
            </div>
            <div className="flex gap-2">
              {onStartChat && (
                <Button variant="outline" size="sm" onClick={onStartChat} className="h-9">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
              {onExportReport && (
                <Button variant="outline" size="sm" onClick={onExportReport} className="h-9">
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Gauge and counters */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <RadialGauge
              value={passPercentage}
              label="PASSING"
              size="lg"
              color={passPercentage >= 80 ? 'green' : passPercentage >= 50 ? 'amber' : 'red'}
            />

            {/* Status counters */}
            <div className="flex-1 grid grid-cols-3 gap-3 w-full">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <div className="text-3xl font-bold text-green-400">{passCount}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Passed</div>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <div className="text-3xl font-bold text-red-400">{failCount}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Failed</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-3xl font-bold text-amber-400">{testingCount}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Testing</div>
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
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">{check.check_name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(Object.keys(filterConfig) as FilterType[]).map(filter => {
          const config = filterConfig[filter];
          const Icon = config.icon;
          const count = filter === 'all' ? totalChecks :
                       filter === 'pass' ? passCount :
                       filter === 'fail' ? failCount : testingCount;
          const isActive = selectedFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm",
                "min-h-[44px] touch-manipulation transition-all flex-shrink-0",
                isActive
                  ? "bg-elec-yellow/20 border-2 border-elec-yellow/40 text-elec-yellow"
                  : "bg-card/50 border border-border/30 text-muted-foreground hover:bg-accent/30"
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

      {/* Checks List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredChecks.map((check, idx) => {
            const status = statusConfig[check.status];
            const Icon = status.icon;
            const isExpanded = expandedChecks[idx];

            return (
              <motion.div
                key={`${check.check_name}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "rounded-xl border overflow-hidden",
                  status.border,
                  status.bg
                )}
              >
                <button
                  onClick={() => toggleCheck(idx)}
                  className="w-full flex items-center justify-between gap-3 p-4 min-h-[56px] touch-manipulation text-left"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon className={cn("h-5 w-5 flex-shrink-0", status.text)} />
                    <span className="font-medium text-foreground truncate">{check.check_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs", status.bg, status.text, "border", status.border)}>
                      {status.label}
                    </Badge>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-muted-foreground"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 space-y-3">
                        <div className="border-t border-border/30 pt-3">
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {check.details}
                          </p>
                        </div>

                        {check.bs7671_references && check.bs7671_references.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {check.bs7671_references.map((ref, refIdx) => (
                              <Badge key={refIdx} variant="outline" className="text-xs font-mono">
                                BS 7671: {ref}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground">
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

        {filteredChecks.length === 0 && (
          <div className="p-6 text-center rounded-xl bg-card/50 border border-border/30">
            <p className="text-sm text-muted-foreground">No checks match the selected filter</p>
          </div>
        )}
      </div>

      {/* Next Steps Checklist */}
      {nextSteps.length > 0 && (
        <div className="rounded-xl border border-elec-yellow/20 bg-card/50 overflow-hidden">
          <div className="px-4 py-3 bg-elec-yellow/5 border-b border-elec-yellow/20">
            <h3 className="font-semibold text-foreground">Next Steps</h3>
          </div>
          <div className="p-4 space-y-2">
            {nextSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => toggleStep(idx)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg text-left",
                  "min-h-[48px] touch-manipulation transition-colors",
                  completedSteps[idx]
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-background/50 border border-border/30 hover:bg-accent/30"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                  "border-2 transition-colors",
                  completedSteps[idx]
                    ? "bg-green-500 border-green-500"
                    : "border-muted-foreground/30"
                )}>
                  {completedSteps[idx] && <CheckCircle className="h-4 w-4 text-white" />}
                </div>
                <span className={cn(
                  "text-sm leading-relaxed",
                  completedSteps[idx] ? "text-foreground line-through opacity-70" : "text-foreground/90"
                )}>
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
            <p className="text-xs text-muted-foreground leading-relaxed">
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
