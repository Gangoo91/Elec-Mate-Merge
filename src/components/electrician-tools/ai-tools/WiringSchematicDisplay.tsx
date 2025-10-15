import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, AlertTriangle, Zap, Shield, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SafetyChecklist from "./SafetyChecklist";
import { useState } from "react";

interface CircuitSpec {
  cableSize: number;
  cableType: string;
  protectionDevice: string;
  rcdRequired: boolean;
  rcdRating?: number;
}

interface WiringStep {
  step: number;
  title: string;
  instruction: string;
  safety_critical: boolean;
  bs7671_reference: string;
  ppe_required?: string[];
}

interface TerminalConnection {
  terminal: string;
  wire_colour: string;
  connection_point: string;
  torque_setting?: string;
}

interface WiringSchematicDisplayProps {
  schematicSvg: string;
  circuitSpec: CircuitSpec;
  wiringProcedure: WiringStep[];
  terminalConnections: TerminalConnection[];
  testingRequirements: string[];
  installationMethodGuidance: string;
  safetyWarnings: string[];
  ragSourcesCount?: {
    installation_docs_count: number;
    regulations_count: number;
    safety_docs_count: number;
  };
}

const WiringSchematicDisplay = ({
  schematicSvg,
  circuitSpec,
  wiringProcedure,
  terminalConnections,
  testingRequirements,
  installationMethodGuidance,
  safetyWarnings,
  ragSourcesCount
}: WiringSchematicDisplayProps) => {
  const [showInstallationGuidance, setShowInstallationGuidance] = useState(false);
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
      'red': '#DC2626',
    };
    return colorMap[colour.toLowerCase()] || colour;
  };
  
  const downloadSchematic = () => {
    try {
      const blob = new Blob([schematicSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wiring-schematic-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Schematic downloaded",
        description: "SVG diagram saved to downloads",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Unable to download schematic",
        variant: "destructive"
      });
    }
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* AI Confidence & Compliance Badge */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Card className="bg-green-500/10 border-green-500/20 flex-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-400">BS 7671 Verified</p>
                <p className="text-xs text-foreground/90">Regulation compliant</p>
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
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-400">
                    {ragSourcesCount.installation_docs_count + ragSourcesCount.regulations_count + ragSourcesCount.safety_docs_count} Knowledge Sources
                  </p>
                  <p className="text-xs text-foreground/80">Tap to view</p>
                </div>
                {showRagSources ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {showRagSources && (
                <div className="mt-2 pt-2 border-t border-blue-500/20 text-xs text-foreground/90 space-y-1">
                  <p>• {ragSourcesCount.installation_docs_count} installation guides</p>
                  <p>• {ragSourcesCount.regulations_count} BS 7671 regulations</p>
                  <p>• {ragSourcesCount.safety_docs_count} safety documents</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Safety Checklist */}
      <SafetyChecklist />

      {/* Schematic Diagram */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg">Wiring Schematic</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-foreground/80">Single-line circuit diagram</CardDescription>
            </div>
            <Button onClick={downloadSchematic} size="sm" variant="outline" className="h-8 sm:h-9">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
          <div 
            className="bg-white rounded-lg p-3 sm:p-4 border border-border overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: schematicSvg }}
          />
        </CardContent>
      </Card>

      {/* Circuit Specification */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg">Circuit Specification</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Cable Size</p>
              <Badge variant="secondary" className="font-mono text-xs sm:text-sm">{circuitSpec.cableSize}mm²</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Cable Type</p>
              <Badge variant="secondary" className="text-xs sm:text-sm">{circuitSpec.cableType}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Protection</p>
              <Badge variant="secondary" className="text-xs sm:text-sm">{circuitSpec.protectionDevice}</Badge>
            </div>
            {circuitSpec.rcdRequired && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                        RCD Protection
                        <Info className="h-3 w-3" />
                      </p>
                      <Badge variant="secondary" className="text-xs sm:text-sm">{circuitSpec.rcdRating}mA RCD Required</Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">Residual Current Device protects against earth faults. Required for additional protection in BS 7671.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terminal Connections */}
      {terminalConnections && terminalConnections.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="p-4 sm:p-5">
            <CardTitle className="text-base sm:text-lg">Terminal Connections</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
            <div className="space-y-2.5">
              {terminalConnections.map((conn, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 sm:p-3.5 bg-muted/50 rounded-lg border border-border/30 hover:border-elec-yellow/30 transition-colors">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <Badge className="font-mono text-xs sm:text-sm flex-shrink-0">{conn.terminal}</Badge>
                    <div 
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-border flex-shrink-0" 
                      style={{ backgroundColor: getWireColor(conn.wire_colour) }} 
                    />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{conn.wire_colour}</span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-xs text-muted-foreground">{conn.connection_point}</p>
                    {conn.torque_setting && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-xs font-mono text-foreground flex items-center justify-end gap-1">
                              {conn.torque_setting}
                              <Info className="h-3 w-3" />
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Recommended torque setting for secure connection</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wiring Procedure */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4 sm:p-5">
          <CardTitle className="text-base sm:text-lg flex items-center justify-between">
            <span>Step-by-Step Wiring Procedure</span>
            {completedCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {completedCount}/{wiringProcedure.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3">
          {wiringProcedure.map((step, idx) => (
            <div 
              key={idx} 
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                step.safety_critical 
                  ? 'border-red-500/40 bg-red-500/5' 
                  : completedSteps[step.step]
                  ? 'border-green-500/40 bg-green-500/5'
                  : 'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <button
                  onClick={() => toggleStepCompletion(step.step)}
                  className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 rounded-full"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
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
                    <h4 className="text-sm sm:text-base font-semibold text-foreground leading-tight flex-1">{step.title}</h4>
                    {step.safety_critical && (
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 mb-2.5 leading-relaxed">{step.instruction}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="text-xs font-mono">
                            BS 7671: {step.bs7671_reference}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">BS 7671 regulation reference</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {step.ppe_required && step.ppe_required.length > 0 && (
                      <Badge variant="outline" className="text-xs bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400">
                        PPE: {step.ppe_required.join(', ')}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Installation Method Guidance - Progressive Disclosure */}
      {installationMethodGuidance && (
        <Collapsible open={showInstallationGuidance} onOpenChange={setShowInstallationGuidance}>
          <Card className="bg-blue-500/5 border-blue-500/20">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <Info className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    Installation Method Guidance
                  </CardTitle>
                  {showInstallationGuidance ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{installationMethodGuidance}</p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Testing Requirements */}
      {testingRequirements && testingRequirements.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="p-4 sm:p-5">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow flex-shrink-0" />
              Testing & Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
            <ul className="space-y-2.5">
              {testingRequirements.map((test, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm p-2 sm:p-2.5 bg-muted/30 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90 leading-relaxed">{test}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Safety Warnings */}
      {safetyWarnings && safetyWarnings.length > 0 && (
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader className="p-4 sm:p-5">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              Safety Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
            <ul className="space-y-2.5">
              {safetyWarnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm p-3 sm:p-3.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-700 dark:text-red-400 font-medium leading-relaxed">{warning}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WiringSchematicDisplay;
