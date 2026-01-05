import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Shield, Info, ChevronDown, ChevronUp, BookOpen, Clipboard, LayoutGrid, Grid3x3, Lightbulb, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { WiringScenarioSelector } from "./WiringScenarioSelector";
import { TerminalConnectionCard } from "./TerminalConnectionCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

// Clean markdown formatting from text
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/\*\*/g, '')  // Remove bold **text**
    .replace(/\*/g, '')    // Remove italic *text*
    .replace(/`([^`]+)`/g, '$1')  // Remove code `text`
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
  const [showAllRegulations, setShowAllRegulations] = useState(false);
  
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

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  
  // Collect all unique regulations
  const allRegulations = Array.from(new Set(
    wiringSteps.map(step => step.bs7671_reference).filter(Boolean)
  ));

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Component Info - Full Width */}
      <Card className="bg-green-500/10 border-green-500/30 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-green-500/20 rounded-lg flex-shrink-0">
              <Shield className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-green-400 uppercase tracking-wide">BS 7671 Compliant</p>
              <p className="text-base font-semibold text-foreground mt-1">{componentName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Selector */}
      <WiringScenarioSelector 
        scenarios={wiringScenarios}
        selectedScenario={selectedScenarioId}
        onSelectScenario={setSelectedScenarioId}
        comparison={comparison}
      />

      {/* Pre-Installation Checklist */}
      {preInstallationTasks && preInstallationTasks.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center gap-2 text-left">
              <Clipboard className="h-5 w-5 text-blue-400" />
              <span className="text-foreground">Pre-Installation Checklist</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              {preInstallationTasks.map((task, idx) => (
                <div key={idx} className="p-4 bg-background/50 rounded-lg border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <Checkbox className="mt-1" />
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="font-semibold text-sm text-foreground">{task.task}</h4>
                      <p className="text-sm text-foreground/80 mt-1.5 leading-relaxed">{task.description}</p>
                      {task.why && (
                        <p className="text-sm text-blue-400 mt-2 flex items-start gap-1.5">
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{task.why}</span>
                        </p>
                      )}
                      {task.tools_needed && task.tools_needed.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {task.tools_needed.map((tool, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-background/50 text-foreground/90">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Distribution Board Layout Guide */}
      {boardLayoutGuide && (
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30">
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center gap-2 text-left">
              <LayoutGrid className="h-5 w-5 text-purple-400" />
              <span className="text-foreground">Board Layout & Termination Strategy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-4">
            {/* MCB Arrangement */}
            <div className="p-4 bg-background/50 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-purple-300 text-left">
                <Grid3x3 className="h-4 w-4" />
                MCB Arrangement
              </h4>
              <p className="text-sm text-foreground leading-relaxed text-left">{boardLayoutGuide.mcb_arrangement}</p>
            </div>

            {/* Earth/Neutral Bar Strategy - Stack on Mobile */}
            <div className="space-y-3">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-sm text-green-400 mb-2 text-left">
                  Earth Bar Numbering
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed text-left">{boardLayoutGuide.earth_bar_numbering}</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-sm text-blue-400 mb-2 text-left">
                  Neutral Bar Numbering
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed text-left">{boardLayoutGuide.neutral_bar_numbering}</p>
              </div>
            </div>

            {/* Wiring Sequence Strategy */}
            {wiringSequenceStrategy && (
              <div className="p-4 bg-background/50 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-sm mb-3 text-purple-300 text-left">Recommended Wiring Sequence</h4>
                <ol className="space-y-2">
                  {wiringSequenceStrategy.order.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-left">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-bold text-purple-300">
                        {idx + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-sm text-foreground/80 mt-3 p-3 bg-purple-500/10 rounded border border-purple-500/20 italic leading-relaxed text-left">
                  💡 {wiringSequenceStrategy.rationale}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Practical Tips & Common Mistakes - Stack on Mobile */}
      {(practicalTips && practicalTips.length > 0) || (commonMistakes && commonMistakes.length > 0) ? (
        <div className="space-y-4">
          {/* Practical Tips */}
          {practicalTips && practicalTips.length > 0 && (
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
              <CardHeader className="p-4">
                <CardTitle className="text-base flex items-center gap-2 text-left">
                  <Lightbulb className="h-5 w-5 text-green-400" />
                  <span className="text-green-400">Pro Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ul className="space-y-2.5">
                  {practicalTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm p-3 bg-background/50 rounded-lg border border-green-500/20 text-left">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground leading-relaxed">{cleanMarkdown(tip)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Common Mistakes */}
          {commonMistakes && commonMistakes.length > 0 && (
            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/30">
              <CardHeader className="p-4">
                <CardTitle className="text-base flex items-center gap-2 text-left">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                  <span className="text-orange-400">Avoid These Mistakes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ul className="space-y-2.5">
                  {commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm p-3 bg-background/50 rounded-lg border border-orange-500/20 text-left">
                      <XCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground leading-relaxed">{cleanMarkdown(mistake)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      ) : null}

      {/* Component Details */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="p-4">
          <CardTitle className="text-base text-foreground text-left">Component Identified</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-sm text-foreground leading-relaxed space-y-3 text-left">
            {componentDetails.split('\n\n').map((paragraph, idx) => {
              // Handle numbered lists
              if (/^\d+\./.test(paragraph.trim())) {
                const items = paragraph.split('\n').filter(line => /^\d+\./.test(line.trim()));
                return (
                  <ol key={idx} className="list-decimal space-y-2.5 pl-1 ml-4">
                    {items.map((item, i) => {
                      const text = cleanMarkdown(item.replace(/^\d+\.\s*/, ''));
                      // Check if item has a bold header (usually ends with colon)
                      const parts = text.split(':');
                      if (parts.length > 1) {
                        return (
                          <li key={i} className="text-sm leading-relaxed pl-2 text-left">
                            <strong className="font-semibold text-foreground">{parts[0]}:</strong>
                            <span className="text-foreground/90">{parts.slice(1).join(':')}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="text-sm leading-relaxed pl-2 text-foreground text-left">
                          {text}
                        </li>
                      );
                    })}
                  </ol>
                );
              }
              
              // Handle bullet lists
              if (/^\s*[-*•]/.test(paragraph.trim())) {
                const items = paragraph.split('\n').filter(line => /^\s*[-*•]/.test(line.trim()));
                return (
                  <ul key={idx} className="space-y-2.5">
                    {items.map((item, i) => {
                      const text = cleanMarkdown(item.replace(/^\s*[-*•]\s*/, ''));
                      return (
                        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-left">
                          <span className="text-elec-yellow mt-1 flex-shrink-0">•</span>
                          <span className="flex-1 text-foreground">{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              
              // Regular paragraphs
              const cleanText = cleanMarkdown(paragraph);
              if (!cleanText) return null;
              
              return (
                <p key={idx} className="text-sm leading-relaxed text-foreground text-left">
                  {cleanText}
                </p>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Terminal Connections */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4">
          <CardTitle className="text-base text-foreground text-left">Terminal Connections</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-3">
            {terminalConnections.map((conn, idx) => (
              <TerminalConnectionCard
                key={idx}
                terminal={conn.terminal}
                wireColour={conn.wire_colour}
                connectionPoint={conn.connection_point}
                notes={conn.notes}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wiring Steps */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4">
          <CardTitle className="text-base flex items-center justify-between text-left">
            <span className="text-foreground">Step-by-Step Wiring Procedure</span>
            {completedCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {completedCount}/{wiringSteps.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-4 space-y-4">
          {wiringSteps.map((step) => (
            <div 
              key={step.step} 
              className={`p-4 rounded-xl border-2 transition-all touch-manipulation ${
                step.safety_critical 
                  ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20' 
                  : completedSteps[step.step]
                  ? 'border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20'
                  : 'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleStepCompletion(step.step)}
                  className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 rounded-full active:scale-95 transition-transform min-w-[44px] min-h-[44px]"
                  aria-label={`Mark step ${step.step} as ${completedSteps[step.step] ? 'incomplete' : 'complete'}`}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base transition-all shadow-md ${
                    step.safety_critical 
                      ? 'bg-red-500 text-foreground' 
                      : completedSteps[step.step]
                      ? 'bg-green-500 text-foreground'
                      : 'bg-muted text-foreground border-2 border-border'
                  }`}>
                    {completedSteps[step.step] ? '✓' : step.step}
                  </div>
                </button>
                <div className="flex-1 min-w-0 space-y-3 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-foreground leading-tight flex-1">{step.title}</h4>
                    {step.safety_critical && (
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Main Instruction */}
                  <p className="text-sm text-foreground leading-relaxed">
                    {cleanMarkdown(step.instruction)}
                  </p>
                  
                  {/* What to Check */}
                  {step.what_to_check && (
                    <div className="bg-background/50 border border-border/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-400 mb-1">✓ What to Check:</p>
                      <p className="text-sm text-foreground/90 leading-relaxed">{cleanMarkdown(step.what_to_check)}</p>
                    </div>
                  )}
                  
                  {/* Common Mistakes */}
                  {step.common_mistakes && (
                    <div className="bg-background/50 border border-orange-500/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-orange-400 mb-1">⚠️ Common Mistakes:</p>
                      <p className="text-sm text-foreground/90 leading-relaxed">{cleanMarkdown(step.common_mistakes)}</p>
                    </div>
                  )}
                  
                  {/* BS 7671 Reference */}
                  <div className="text-xs text-foreground/60 font-mono">
                    BS 7671: {step.bs7671_reference}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* All Regulations Reference (Collapsible) */}
      {allRegulations.length > 0 && (
        <Collapsible open={showAllRegulations} onOpenChange={setShowAllRegulations}>
          <Card className="bg-card border-border/50">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="p-4">
                <CardTitle className="text-base flex items-center justify-between text-left">
                  <span className="flex items-center gap-2 text-foreground">
                    <BookOpen className="h-5 w-5 text-foreground/60" />
                    BS 7671 Regulations Referenced
                  </span>
                  {showAllRegulations ? <ChevronUp className="h-5 w-5 text-foreground" /> : <ChevronDown className="h-5 w-5 text-foreground" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-2">
                  {allRegulations.map((reg, idx) => (
                    <div key={idx} className="text-xs font-mono p-2 bg-muted/50 rounded border border-border/30 text-foreground/80">
                      {reg}
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Required Tests */}
      <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/30">
        <CardHeader className="p-4">
          <CardTitle className="text-base flex items-center gap-2 text-left">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-green-400">Required Testing & Verification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ul className="space-y-2.5">
            {requiredTests.map((test, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm p-3 bg-background/50 rounded-lg border border-green-500/20 min-h-[44px] text-left">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">{cleanMarkdown(test)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Safety Warnings */}
      <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/40 shadow-lg shadow-red-500/10">
        <CardHeader className="p-4">
          <CardTitle className="text-base flex items-center gap-2 text-red-400 text-left">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-pulse" />
            <span>⚠️ Critical Safety Warnings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ul className="space-y-3">
            {safetyWarnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg shadow-md min-h-[44px] text-left">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-300 font-medium leading-relaxed">{cleanMarkdown(warning)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiringGuidanceDisplay;
