import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Shield, Info, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useState } from "react";
import { WiringScenarioSelector } from "./WiringScenarioSelector";
import { TerminalConnectionCard } from "./TerminalConnectionCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
}

const WiringGuidanceDisplay = ({
  componentName,
  componentDetails,
  wiringScenarios,
  comparison,
  ragSourcesCount
}: WiringGuidanceDisplayProps) => {
  const [showRagSources, setShowRagSources] = useState(false);
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
      {/* Component Info & RAG Sources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="bg-green-500/10 border-green-500/30 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-green-500 flex-shrink-0" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-green-400 uppercase tracking-wide">BS 7671 Compliant</p>
                <p className="text-sm font-medium text-foreground/90 truncate mt-0.5">{componentName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {ragSourcesCount && (
          <Card className="bg-blue-500/10 border-blue-500/30 shadow-md">
            <CardContent className="p-4">
              <button 
                onClick={() => setShowRagSources(!showRagSources)}
                className="flex items-center gap-3 w-full text-left"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Info className="h-6 w-6 text-blue-500 flex-shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                    {ragSourcesCount.installation_docs_count + ragSourcesCount.regulations_count} Sources
                  </p>
                  <p className="text-xs text-foreground/70">Tap to view</p>
                </div>
                {showRagSources ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {showRagSources && (
                <div className="mt-2 pt-2 border-t border-blue-500/20 text-xs text-foreground/90 space-y-1">
                  <p>• {ragSourcesCount.installation_docs_count} installation manuals</p>
                  <p>• {ragSourcesCount.regulations_count} BS 7671 regulations</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Scenario Selector */}
      <WiringScenarioSelector 
        scenarios={wiringScenarios}
        selectedScenario={selectedScenarioId}
        onSelectScenario={setSelectedScenarioId}
        comparison={comparison}
      />

      {/* Component Details */}
      <Card className="bg-muted/30 border-border">
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg">Component Identified</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
          <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
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
                          <li key={i} className="text-sm leading-relaxed pl-2">
                            <strong className="font-semibold text-foreground">{parts[0]}:</strong>
                            <span className="text-foreground/90">{parts.slice(1).join(':')}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="text-sm leading-relaxed pl-2">
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
                        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                          <span className="text-elec-yellow mt-1 flex-shrink-0">•</span>
                          <span className="flex-1">{text}</span>
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
                <p key={idx} className="text-sm leading-relaxed">
                  {cleanText}
                </p>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Terminal Connections */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg">Terminal Connections</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center justify-between">
            <span>Step-by-Step Wiring Procedure</span>
            {completedCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {completedCount}/{wiringSteps.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-4 space-y-4">
          {wiringSteps.map((step) => (
            <div 
              key={step.step} 
              className={`p-5 rounded-xl border-2 transition-all touch-manipulation ${
                step.safety_critical 
                  ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20' 
                  : completedSteps[step.step]
                  ? 'border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20'
                  : 'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleStepCompletion(step.step)}
                  className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 rounded-full active:scale-95 transition-transform min-w-[48px] min-h-[48px]"
                  aria-label={`Mark step ${step.step} as ${completedSteps[step.step] ? 'incomplete' : 'complete'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all shadow-md ${
                    step.safety_critical 
                      ? 'bg-red-500 text-white' 
                      : completedSteps[step.step]
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-foreground border-2 border-border'
                  }`}>
                    {completedSteps[step.step] ? '✓' : step.step}
                  </div>
                </button>
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-foreground leading-tight flex-1">{step.title}</h4>
                    {step.safety_critical && (
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Main Instruction */}
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {cleanMarkdown(step.instruction)}
                  </p>
                  
                  {/* What to Check */}
                  {step.what_to_check && (
                    <div className="bg-background/50 border border-border/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-400 mb-1">✓ What to Check:</p>
                      <p className="text-xs text-foreground/80 leading-relaxed">{cleanMarkdown(step.what_to_check)}</p>
                    </div>
                  )}
                  
                  {/* Common Mistakes */}
                  {step.common_mistakes && (
                    <div className="bg-background/50 border border-orange-500/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-orange-400 mb-1">⚠️ Common Mistakes:</p>
                      <p className="text-xs text-foreground/80 leading-relaxed">{cleanMarkdown(step.common_mistakes)}</p>
                    </div>
                  )}
                  
                  {/* BS 7671 Reference - Clean Text */}
                  <div className="text-xs text-muted-foreground font-mono">
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
              <CardHeader className="p-4 sm:p-5">
                <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    BS 7671 Regulations Referenced
                  </span>
                  {showAllRegulations ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allRegulations.map((reg, idx) => (
                    <div key={idx} className="text-xs font-mono p-2 bg-muted/50 rounded border border-border/30">
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
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-green-400">Required Testing & Verification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
          <ul className="space-y-2.5">
            {requiredTests.map((test, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm p-3 bg-background/50 rounded-lg border border-green-500/20 min-h-[44px]">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/90 leading-relaxed">{cleanMarkdown(test)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Safety Warnings */}
      <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/40 shadow-lg shadow-red-500/10">
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-pulse" />
            <span>⚠️ Critical Safety Warnings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
          <ul className="space-y-3">
            {safetyWarnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg shadow-md min-h-[44px]">
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
