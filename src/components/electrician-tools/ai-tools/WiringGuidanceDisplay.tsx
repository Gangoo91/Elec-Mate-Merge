import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Shield, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface WiringStep {
  step: number;
  title: string;
  instruction: string;
  safety_critical: boolean;
  bs7671_reference: string;
}

interface TerminalConnection {
  terminal: string;
  wire_colour: string;
  connection_point: string;
  notes?: string;
}

interface WiringGuidanceDisplayProps {
  componentName: string;
  componentDetails: string;
  wiringSteps: WiringStep[];
  terminalConnections: TerminalConnection[];
  safetyWarnings: string[];
  requiredTests: string[];
  ragSourcesCount?: {
    installation_docs_count: number;
    regulations_count: number;
  };
}

const WiringGuidanceDisplay = ({
  componentName,
  componentDetails,
  wiringSteps,
  terminalConnections,
  safetyWarnings,
  requiredTests,
  ragSourcesCount
}: WiringGuidanceDisplayProps) => {
  const [showRagSources, setShowRagSources] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStepCompletion = (stepNumber: number) => {
    setCompletedSteps(prev => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const getWireColor = (colour: string) => {
    const colorMap: Record<string, string> = {
      'brown': '#8B4513',
      'blue': '#0066CC',
      'green': '#22C55E',
      'yellow': '#EAB308',
      'grey': '#6B7280',
      'black': '#000000',
    };
    const lower = colour.toLowerCase();
    if (lower.includes('green') && lower.includes('yellow')) return 'linear-gradient(45deg, #22C55E 50%, #EAB308 50%)';
    return colorMap[lower] || colour;
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Component Info & RAG Sources */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Card className="bg-green-500/10 border-green-500/20 flex-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-green-700 dark:text-green-400">BS 7671 Compliant</p>
                <p className="text-xs text-foreground/90 truncate">{componentName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {ragSourcesCount && (
          <Card className="bg-blue-500/10 border-blue-500/20 flex-1">
            <CardContent className="p-3 sm:p-4">
              <button 
                onClick={() => setShowRagSources(!showRagSources)}
                className="flex items-center gap-2 w-full text-left"
              >
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-400">
                    {ragSourcesCount.installation_docs_count + ragSourcesCount.regulations_count} Sources
                  </p>
                  <p className="text-xs text-foreground/80">Tap to view</p>
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

      {/* Component Details */}
      <Card className="bg-muted/30 border-border">
        <CardHeader className="p-4">
          <CardTitle className="text-base">Component Identified</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <pre className="text-xs text-foreground/90 whitespace-pre-wrap font-mono bg-background/50 p-3 rounded-lg border border-border">
            {componentDetails}
          </pre>
        </CardContent>
      </Card>

      {/* Terminal Connections */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4">
          <CardTitle className="text-base">Terminal Connections</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-2.5">
            {terminalConnections.map((conn, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <Badge className="font-mono text-xs flex-shrink-0">{conn.terminal}</Badge>
                  <div 
                    className="h-6 w-6 rounded-full border-2 border-border flex-shrink-0" 
                    style={{ background: getWireColor(conn.wire_colour) }} 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{conn.wire_colour}</p>
                    <p className="text-xs text-muted-foreground">{conn.connection_point}</p>
                    {conn.notes && <p className="text-xs text-foreground/80 italic mt-1">{conn.notes}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wiring Steps */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4">
          <CardTitle className="text-base flex items-center justify-between">
            <span>Step-by-Step Wiring Procedure</span>
            {completedCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {completedCount}/{wiringSteps.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          {wiringSteps.map((step) => (
            <div 
              key={step.step} 
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                step.safety_critical 
                  ? 'border-red-500/40 bg-red-500/5' 
                  : completedSteps[step.step]
                  ? 'border-green-500/40 bg-green-500/5'
                  : 'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleStepCompletion(step.step)}
                  className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 rounded-full"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step.safety_critical 
                      ? 'bg-red-500 text-white' 
                      : completedSteps[step.step]
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-foreground'
                  }`}>
                    {completedSteps[step.step] ? '✓' : step.step}
                  </div>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-foreground leading-tight flex-1">{step.title}</h4>
                    {step.safety_critical && (
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 mb-2 leading-relaxed">{step.instruction}</p>
                  <Badge variant="outline" className="text-xs font-mono">
                    BS 7671: {step.bs7671_reference}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Required Tests */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            Required Testing
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ul className="space-y-2">
            {requiredTests.map((test, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm p-2 bg-muted/30 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/90">{test}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Safety Warnings */}
      <Card className="bg-red-500/10 border-red-500/30">
        <CardHeader className="p-4">
          <CardTitle className="text-base flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            Safety Warnings
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ul className="space-y-2">
            {safetyWarnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-700 dark:text-red-400 font-medium">{warning}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiringGuidanceDisplay;
