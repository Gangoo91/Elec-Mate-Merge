import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Copy,
  Eye,
  Wrench,
  FileText,
  ChevronDown,
  Sparkles,
  Shield,
  XCircle,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { RadialGauge, EICRCodeGrid, ExpandableSection } from "./results";
import { cn } from "@/lib/utils";
import ErrorAnalysisCard from "./ErrorAnalysisCard";

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  label: string;
}

interface Finding {
  description: string;
  eicr_code: 'C1' | 'C2' | 'C3' | 'FI';
  confidence: number;
  bs7671_clauses: string[];
  location?: string;
  fix_guidance: string;
  bounding_box?: BoundingBox;
}

interface Recommendation {
  action: string;
  priority: 'immediate' | 'urgent' | 'recommended';
  bs7671_reference?: string;
  cost_estimate?: string;
  eicr_code: 'C1' | 'C2' | 'C3';
}

interface AnalysisResult {
  findings: Finding[];
  recommendations: Recommendation[];
  compliance_summary: {
    overall_assessment: 'satisfactory' | 'unsatisfactory';
    c1_count: number;
    c2_count: number;
    c3_count: number;
    fi_count: number;
    safety_rating: number;
  };
  summary: string;
}

interface VisualAnalysisResultsProps {
  analysisResult: AnalysisResult;
  onExportReport: () => void;
  onRetry?: () => void;
  onStartChat?: () => void;
}

type FilterType = 'all' | 'C1' | 'C2' | 'C3' | 'FI';

const filterConfig: Record<FilterType, { label: string; color: string; bg: string; border: string }> = {
  all: { label: 'All', color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
  C1: { label: 'C1', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  C2: { label: 'C2', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  C3: { label: 'C3', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  FI: { label: 'FI', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
};

const eicrConfig = {
  C1: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    label: 'Danger Present',
    description: 'Immediate action required',
  },
  C2: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    label: 'Potentially Dangerous',
    description: 'Urgent remedial action required',
  },
  C3: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    label: 'Improvement',
    description: 'Recommended improvement',
  },
  FI: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    label: 'Further Investigation',
    description: 'Additional testing needed',
  },
};

const VisualAnalysisResults = ({
  analysisResult,
  onExportReport,
  onRetry,
  onStartChat
}: VisualAnalysisResultsProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [expandedFindings, setExpandedFindings] = useState<Record<number, boolean>>({});

  // Detect parse error
  const isParseError = analysisResult?.findings?.some(
    finding => finding.description.toLowerCase().includes('unable to complete') ||
               finding.description.toLowerCase().includes('format was invalid')
  ) || false;

  if (isParseError && onRetry) {
    return (
      <ErrorAnalysisCard
        onRetry={onRetry}
        possibleCauses={[
          'Complex image with multiple components',
          'Poor lighting or image quality',
          'Too many images uploaded at once',
          'Network timeout during processing'
        ]}
      />
    );
  }

  const { compliance_summary, findings, recommendations, summary } = analysisResult;
  const safetyRating = compliance_summary.safety_rating;
  const safetyPercentage = Math.round((safetyRating / 10) * 100);

  // Get C1 findings for immediate attention section
  const c1Findings = findings.filter(f => f.eicr_code === 'C1');

  // Filter findings based on selected filter
  const filteredFindings = selectedFilter === 'all'
    ? findings
    : findings.filter(f => f.eicr_code === selectedFilter);

  // Count by code for filter badges
  const countByCode = {
    all: findings.length,
    C1: compliance_summary.c1_count,
    C2: compliance_summary.c2_count,
    C3: compliance_summary.c3_count,
    FI: compliance_summary.fi_count,
  };

  const toggleFinding = (index: number) => {
    setExpandedFindings(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const copySummary = () => {
    const summaryText = `VISUAL FAULT ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString('en-GB')}
Safety Rating: ${safetyRating}/10

IDENTIFIED ISSUES:
${findings.map(finding =>
  `• ${finding.description} (${finding.eicr_code}) - ${finding.bs7671_clauses.join(', ')}`
).join('\n')}

KEY ACTIONS REQUIRED:
${recommendations.map(rec =>
  `• ${rec.action} (${rec.priority})`
).join('\n')}

This analysis is for guidance only and must be verified by a qualified electrician.`;

    navigator.clipboard.writeText(summaryText);
    toast({
      title: "Copied to clipboard",
      description: "Analysis summary ready to paste",
    });
  };

  // No findings = installation passes
  if (!findings || findings.length === 0) {
    return (
      <div className="space-y-5">
        {/* No Faults Hero */}
        <div className="rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-green-500/5 to-card/90 backdrop-blur-xl p-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 bg-green-500/20 rounded-2xl border border-green-500/30">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                No Faults Detected
              </h2>
              <p className="text-muted-foreground">
                Installation appears compliant with BS 7671 requirements
              </p>
            </div>
          </div>

          {/* Summary if available */}
          {summary && (
            <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-foreground/90 leading-relaxed">{summary}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {onStartChat && (
            <Button variant="outline" onClick={onStartChat} className="flex-1 h-12">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Questions
            </Button>
          )}
          {onExportReport && (
            <Button variant="outline" onClick={onExportReport} className="flex-1 h-12">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          )}
        </div>

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
  }

  return (
    <div className="space-y-5">
      {/* Hero Section with Gauge */}
      <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl p-6 overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/[0.02] via-transparent to-elec-blue/[0.02] pointer-events-none" />

        <div className="relative">
          {/* Header with actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Fault Analysis
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {findings.length} issue{findings.length !== 1 ? 's' : ''} identified
              </p>
            </div>
            <div className="flex gap-2">
              {onStartChat && (
                <Button variant="outline" size="sm" onClick={onStartChat} className="h-9">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={copySummary} className="h-9">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onExportReport} className="h-9">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Gauge and Assessment */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <RadialGauge
              value={safetyPercentage}
              label="SAFETY"
              sublabel={`${safetyRating}/10`}
              size="lg"
              color={safetyRating >= 8 ? 'green' : safetyRating >= 5 ? 'amber' : 'red'}
            />

            <div className="flex-1 space-y-4 w-full">
              {/* Overall Assessment Badge */}
              <div className={cn(
                "p-4 rounded-xl border-2 text-center",
                compliance_summary.overall_assessment === 'satisfactory'
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              )}>
                <div className={cn(
                  "text-lg font-bold uppercase tracking-wide",
                  compliance_summary.overall_assessment === 'satisfactory'
                    ? "text-green-400"
                    : "text-red-400"
                )}>
                  {compliance_summary.overall_assessment === 'satisfactory' ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Satisfactory
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <XCircle className="h-5 w-5" />
                      Unsatisfactory
                    </span>
                  )}
                </div>
              </div>

              {/* Summary text */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {summary}
              </p>
            </div>
          </div>

          {/* EICR Code Grid */}
          <EICRCodeGrid
            c1Count={compliance_summary.c1_count}
            c2Count={compliance_summary.c2_count}
            c3Count={compliance_summary.c3_count}
            fiCount={compliance_summary.fi_count}
          />
        </div>
      </div>

      {/* Immediate Action - C1 Findings */}
      {c1Findings.length > 0 && (
        <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h3 className="font-semibold text-red-400">Immediate Action Required</h3>
          </div>
          <div className="space-y-2">
            {c1Findings.map((finding, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">{finding.description}</p>
                  {finding.location && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <Eye className="h-3 w-3 inline mr-1" />
                      {finding.location}
                    </p>
                  )}
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
          const count = countByCode[filter];
          const isActive = selectedFilter === filter;

          if (filter !== 'all' && count === 0) return null;

          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm",
                "min-h-[44px] touch-manipulation transition-all flex-shrink-0",
                isActive
                  ? "bg-elec-yellow/20 border-2 border-elec-yellow/40 text-elec-yellow"
                  : cn("border", config.bg, config.border, config.color, "hover:opacity-80")
              )}
            >
              <span>{config.label}</span>
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                {count}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Findings List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredFindings.map((finding, idx) => {
            const config = eicrConfig[finding.eicr_code];
            const isExpanded = expandedFindings[idx];
            const originalIndex = findings.indexOf(finding);

            return (
              <motion.div
                key={`${finding.description}-${originalIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "rounded-xl border overflow-hidden",
                  config.border,
                  config.bg
                )}
              >
                <button
                  onClick={() => toggleFinding(originalIndex)}
                  className="w-full flex items-center justify-between gap-3 p-4 min-h-[56px] touch-manipulation text-left"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Badge className={cn(
                      "text-sm font-bold px-2.5 py-1",
                      config.bg, config.text, "border", config.border
                    )}>
                      {finding.eicr_code}
                    </Badge>
                    <span className="font-medium text-foreground text-sm truncate">
                      {finding.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {Math.round(finding.confidence * 100)}%
                    </span>
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
                      <div className="px-4 pb-4 pt-0 space-y-4">
                        <div className="border-t border-border/30 pt-4">
                          {/* Code explanation */}
                          <p className={cn("text-sm font-medium mb-2", config.text)}>
                            {config.label}: {config.description}
                          </p>

                          {/* Location */}
                          {finding.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <Eye className="h-4 w-4" />
                              <span>{finding.location}</span>
                            </div>
                          )}
                        </div>

                        {/* BS 7671 References */}
                        {finding.bs7671_clauses && finding.bs7671_clauses.length > 0 && (
                          <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-elec-yellow" />
                              <span className="text-sm font-semibold text-foreground">BS 7671 References</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {finding.bs7671_clauses.map((clause, clauseIdx) => (
                                <Badge key={clauseIdx} variant="outline" className="text-xs font-mono">
                                  Reg. {clause}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Fix Guidance */}
                        <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench className="h-4 w-4 text-elec-yellow" />
                            <span className="text-sm font-semibold text-foreground">Recommended Fix</span>
                          </div>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {finding.fix_guidance}
                          </p>
                        </div>

                        {/* Confidence indicator */}
                        <div className="text-xs text-muted-foreground">
                          Confidence: {Math.round(finding.confidence * 100)}%
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredFindings.length === 0 && (
          <div className="p-6 text-center rounded-xl bg-card/50 border border-border/30">
            <p className="text-sm text-muted-foreground">No findings match the selected filter</p>
          </div>
        )}
      </div>

      {/* Action Plan - Recommendations */}
      {recommendations.length > 0 && (
        <ExpandableSection
          title="Action Plan"
          icon={Wrench}
          iconColor="text-elec-yellow"
          badge={<Badge variant="secondary" className="text-xs">{recommendations.length}</Badge>}
          defaultOpen={true}
        >
          <div className="space-y-3">
            {recommendations.map((rec, idx) => {
              const priorityConfig = {
                immediate: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
                urgent: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
                recommended: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
              };
              const pConfig = priorityConfig[rec.priority];
              const codeConfig = eicrConfig[rec.eicr_code];

              return (
                <div
                  key={idx}
                  className={cn(
                    "p-4 rounded-lg border",
                    pConfig.border,
                    pConfig.bg
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold",
                      pConfig.bg, pConfig.text, "border", pConfig.border
                    )}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge className={cn("text-xs", pConfig.bg, pConfig.text, "border", pConfig.border)}>
                          {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                        </Badge>
                        <Badge className={cn("text-xs", codeConfig.bg, codeConfig.text, "border", codeConfig.border)}>
                          {rec.eicr_code}
                        </Badge>
                        {rec.cost_estimate && (
                          <Badge variant="outline" className="text-xs">
                            Est. {rec.cost_estimate}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground">{rec.action}</p>
                      {rec.bs7671_reference && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <FileText className="h-3 w-3 inline mr-1" />
                          BS 7671: {rec.bs7671_reference}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ExpandableSection>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-400 text-sm mb-1">Visual Assessment Only</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This AI analysis is provided as guidance only and should not replace professional electrical inspection.
              All findings must be verified by a qualified electrician. Visual analysis may not detect all potential
              issues, especially those requiring physical testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualAnalysisResults;
