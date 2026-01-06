import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Shield,
  Info,
  BookOpen,
  Clipboard,
  LayoutGrid,
  Lightbulb,
  XCircle,
  AlertCircle,
  Zap,
  ChevronDown,
  Wrench,
  TestTube
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalDiagram, ExpandableSection } from "./results";
import { cn } from "@/lib/utils";

// Clean markdown formatting from text
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
};

interface WiringStep {
  step: number;
  title: string;
  instruction: string;
  what_to_check?: string;
  common_mistakes?: string;
  safety_critical: boolean;
  bs7671_reference: string;
}

interface TerminalConnection {
  terminal: string;
  wire_colour: string;
  connection_point: string;
  notes?: string;
}

interface WiringScenario {
  scenario_id: string;
  scenario_name: string;
  use_case: string;
  complexity: 'simple' | 'intermediate' | 'advanced';
  recommended: boolean;
  wiring_steps: WiringStep[];
  terminal_connections: TerminalConnection[];
  safety_warnings: string[];
  required_tests: string[];
}

interface PreInstallationTask {
  task: string;
  description: string;
  why?: string;
  tools_needed?: string[];
}

interface BoardLayoutGuide {
  mcb_arrangement: string;
  earth_bar_numbering: string;
  neutral_bar_numbering: string;
  visual_diagram?: string;
}

interface WiringSequenceStrategy {
  order: string[];
  rationale: string;
}

interface WiringGuidanceDisplayProps {
  componentName: string;
  componentDetails: string;
  wiringScenarios: WiringScenario[];
  comparison?: {
    key_differences: string[];
    decision_factors: string[];
  };
  ragSourcesCount?: {
    installation_docs_count: number;
    regulations_count: number;
  };
  preInstallationTasks?: PreInstallationTask[];
  boardLayoutGuide?: BoardLayoutGuide;
  wiringSequenceStrategy?: WiringSequenceStrategy;
  practicalTips?: string[];
  commonMistakes?: string[];
}

type ComplexityType = 'simple' | 'intermediate' | 'advanced';

const complexityConfig: Record<ComplexityType, { label: string; color: string; bg: string; border: string }> = {
  simple: { label: 'Simple', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  intermediate: { label: 'Intermediate', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  advanced: { label: 'Advanced', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
};

const WiringGuidanceDisplay = ({
  componentName,
  componentDetails,
  wiringScenarios,
  comparison,
  preInstallationTasks,
  boardLayoutGuide,
  wiringSequenceStrategy,
  practicalTips,
  commonMistakes
}: WiringGuidanceDisplayProps) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    wiringScenarios.find(s => s.recommended)?.scenario_id || wiringScenarios[0]?.scenario_id
  );

  const selectedScenario = wiringScenarios.find(s => s.scenario_id === selectedScenarioId) || wiringScenarios[0];

  const wiringSteps = selectedScenario.wiring_steps;
  const terminalConnections = selectedScenario.terminal_connections;
  const safetyWarnings = selectedScenario.safety_warnings;
  const requiredTests = selectedScenario.required_tests;

  const toggleStepCompletion = (stepNumber: number) => {
    setCompletedSteps(prev => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const toggleStepExpanded = (stepNumber: number) => {
    setExpandedSteps(prev => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const toggleTask = (index: number) => {
    setCheckedTasks(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / wiringSteps.length) * 100);

  // Format terminal connections for the diagram
  const diagramConnections = terminalConnections.map(conn => ({
    terminal: conn.terminal,
    wire: conn.wire_colour,
    color: conn.wire_colour.toLowerCase(),
    notes: conn.connection_point + (conn.notes ? ` - ${conn.notes}` : ''),
  }));

  // Collect all unique regulations
  const allRegulations = Array.from(new Set(
    wiringSteps.map(step => step.bs7671_reference).filter(Boolean)
  ));

  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] via-transparent to-elec-yellow/[0.03] pointer-events-none" />

        <div className="relative space-y-4">
          {/* Component Name & Badge */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-500/20 rounded-xl">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{componentName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-xs font-medium text-green-400">BS 7671 Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Selector */}
          {wiringScenarios.length > 1 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Select Installation Type</p>
              <div className="flex flex-wrap gap-2">
                {wiringScenarios.map(scenario => {
                  const cConfig = complexityConfig[scenario.complexity];
                  const isSelected = scenario.scenario_id === selectedScenarioId;

                  return (
                    <button
                      key={scenario.scenario_id}
                      onClick={() => setSelectedScenarioId(scenario.scenario_id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm",
                        "min-h-[48px] touch-manipulation transition-all",
                        isSelected
                          ? "bg-elec-yellow/20 border-2 border-elec-yellow/40 text-elec-yellow"
                          : cn("border", cConfig.bg, cConfig.border, "text-foreground hover:opacity-80")
                      )}
                    >
                      <span>{scenario.scenario_name}</span>
                      {scenario.recommended && (
                        <Badge variant="secondary" className="text-[10px] px-1.5">
                          Rec
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected scenario description */}
              <p className="text-sm text-muted-foreground">{selectedScenario.use_case}</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Installation Progress</span>
              <span className="font-semibold text-foreground">{completedCount}/{wiringSteps.length} steps</span>
            </div>
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className={cn(
                  "h-full rounded-full transition-all",
                  progressPercentage === 100 ? "bg-green-500" : "bg-elec-yellow"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Diagram */}
      <TerminalDiagram
        connections={diagramConnections}
        title="Terminal Connections"
      />

      {/* Pre-Installation Checklist */}
      {preInstallationTasks && preInstallationTasks.length > 0 && (
        <ExpandableSection
          title="Pre-Installation Checklist"
          icon={Clipboard}
          iconColor="text-blue-400"
          badge={<Badge variant="secondary" className="text-xs">{preInstallationTasks.length}</Badge>}
          defaultOpen={false}
        >
          <div className="space-y-2">
            {preInstallationTasks.map((task, idx) => (
              <button
                key={idx}
                onClick={() => toggleTask(idx)}
                className={cn(
                  "w-full flex items-start gap-3 p-4 rounded-lg text-left",
                  "min-h-[56px] touch-manipulation transition-colors",
                  checkedTasks[idx]
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-background/50 border border-border/30 hover:bg-accent/30"
                )}
              >
                <Checkbox checked={checkedTasks[idx]} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "font-semibold text-sm",
                    checkedTasks[idx] ? "text-foreground line-through opacity-70" : "text-foreground"
                  )}>
                    {task.task}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  {task.why && (
                    <p className="text-xs text-blue-400 mt-2 flex items-start gap-1.5">
                      <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <span>{task.why}</span>
                    </p>
                  )}
                  {task.tools_needed && task.tools_needed.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {task.tools_needed.map((tool, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ExpandableSection>
      )}

      {/* Board Layout Guide */}
      {boardLayoutGuide && (
        <ExpandableSection
          title="Board Layout Guide"
          icon={LayoutGrid}
          iconColor="text-purple-400"
          defaultOpen={false}
        >
          <div className="space-y-3">
            {/* MCB Arrangement */}
            <div className="p-3 rounded-lg bg-background/50 border border-border/30">
              <h4 className="text-sm font-semibold text-foreground mb-2">MCB Arrangement</h4>
              <p className="text-sm text-foreground/90 leading-relaxed">{boardLayoutGuide.mcb_arrangement}</p>
            </div>

            {/* Earth/Neutral bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <h4 className="text-sm font-semibold text-green-400 mb-1">Earth Bar</h4>
                <p className="text-sm text-foreground/90">{boardLayoutGuide.earth_bar_numbering}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="text-sm font-semibold text-blue-400 mb-1">Neutral Bar</h4>
                <p className="text-sm text-foreground/90">{boardLayoutGuide.neutral_bar_numbering}</p>
              </div>
            </div>

            {/* Wiring Sequence */}
            {wiringSequenceStrategy && (
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">Recommended Sequence</h4>
                <ol className="space-y-2">
                  {wiringSequenceStrategy.order.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-bold text-purple-300">
                        {idx + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-muted-foreground mt-3 p-2 bg-background/30 rounded">
                  {wiringSequenceStrategy.rationale}
                </p>
              </div>
            )}
          </div>
        </ExpandableSection>
      )}

      {/* Step-by-Step Wiring Procedure */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Wiring Steps
          </h3>
          {completedCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {completedCount}/{wiringSteps.length}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          {wiringSteps.map((step) => {
            const isCompleted = completedSteps[step.step];
            const isExpanded = expandedSteps[step.step];

            return (
              <div
                key={step.step}
                className={cn(
                  "rounded-xl border-2 overflow-hidden transition-all",
                  step.safety_critical
                    ? "border-red-500/40 bg-red-500/5"
                    : isCompleted
                    ? "border-green-500/40 bg-green-500/5"
                    : "border-border/30 bg-card/50"
                )}
              >
                {/* Step Header */}
                <div className="flex items-start gap-3 p-4">
                  <button
                    onClick={() => toggleStepCompletion(step.step)}
                    className={cn(
                      "flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center",
                      "font-bold text-base transition-all touch-manipulation",
                      step.safety_critical
                        ? "bg-red-500 text-white"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-muted text-foreground border-2 border-border"
                    )}
                  >
                    {isCompleted ? '✓' : step.step}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={cn(
                        "text-base font-bold leading-tight",
                        isCompleted ? "text-foreground/70 line-through" : "text-foreground"
                      )}>
                        {step.title}
                      </h4>
                      {step.safety_critical && (
                        <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 animate-pulse" />
                      )}
                    </div>

                    <p className={cn(
                      "text-sm mt-1.5 leading-relaxed",
                      isCompleted ? "text-muted-foreground" : "text-foreground/90"
                    )}>
                      {cleanMarkdown(step.instruction)}
                    </p>

                    {/* Expand button for details */}
                    {(step.what_to_check || step.common_mistakes) && (
                      <button
                        onClick={() => toggleStepExpanded(step.step)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2 touch-manipulation min-h-[32px]"
                      >
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                        {isExpanded ? 'Hide details' : 'Show details'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        {step.what_to_check && (
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <p className="text-xs font-semibold text-green-400 mb-1 flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              What to Check
                            </p>
                            <p className="text-sm text-foreground/90">{cleanMarkdown(step.what_to_check)}</p>
                          </div>
                        )}

                        {step.common_mistakes && (
                          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <p className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              Common Mistakes
                            </p>
                            <p className="text-sm text-foreground/90">{cleanMarkdown(step.common_mistakes)}</p>
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground font-mono">
                          BS 7671: {step.bs7671_reference}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro Tips & Common Mistakes */}
      {((practicalTips && practicalTips.length > 0) || (commonMistakes && commonMistakes.length > 0)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pro Tips */}
          {practicalTips && practicalTips.length > 0 && (
            <ExpandableSection
              title="Pro Tips"
              icon={Lightbulb}
              iconColor="text-green-400"
              badge={<Badge variant="secondary" className="text-xs">{practicalTips.length}</Badge>}
              defaultOpen={false}
            >
              <div className="space-y-2">
                {practicalTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/90">{cleanMarkdown(tip)}</span>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}

          {/* Common Mistakes */}
          {commonMistakes && commonMistakes.length > 0 && (
            <ExpandableSection
              title="Avoid These"
              icon={XCircle}
              iconColor="text-orange-400"
              badge={<Badge variant="secondary" className="text-xs">{commonMistakes.length}</Badge>}
              defaultOpen={false}
            >
              <div className="space-y-2">
                {commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <XCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/90">{cleanMarkdown(mistake)}</span>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}
        </div>
      )}

      {/* BS 7671 Regulations Reference */}
      {allRegulations.length > 0 && (
        <ExpandableSection
          title="BS 7671 References"
          icon={BookOpen}
          iconColor="text-muted-foreground"
          badge={<Badge variant="secondary" className="text-xs">{allRegulations.length}</Badge>}
          defaultOpen={false}
        >
          <div className="flex flex-wrap gap-2">
            {allRegulations.map((reg, idx) => (
              <Badge key={idx} variant="outline" className="text-xs font-mono">
                {reg}
              </Badge>
            ))}
          </div>
        </ExpandableSection>
      )}

      {/* Required Tests */}
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 overflow-hidden">
        <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <TestTube className="h-5 w-5 text-green-400" />
            Required Testing
          </h3>
        </div>
        <div className="p-4 space-y-2">
          {requiredTests.map((test, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-green-500/20">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{cleanMarkdown(test)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warnings - Prominent at bottom */}
      <div className="rounded-xl border-2 border-red-500/40 bg-red-500/5 overflow-hidden">
        <div className="px-4 py-3 bg-red-500/10 border-b border-red-500/30">
          <h3 className="font-semibold text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 animate-pulse" />
            Critical Safety Warnings
          </h3>
        </div>
        <div className="p-4 space-y-2">
          {safetyWarnings.map((warning, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-300 font-medium">{cleanMarkdown(warning)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-400 text-sm mb-1">Professional Guidance Only</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This wiring guidance is for qualified electricians only. All installations must comply with
              BS 7671 and local building regulations. Always verify connections with proper testing equipment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WiringGuidanceDisplay;
