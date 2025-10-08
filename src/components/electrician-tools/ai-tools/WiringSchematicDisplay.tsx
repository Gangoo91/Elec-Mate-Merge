import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

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

  return (
    <div className="space-y-4">
      {/* Schematic Diagram */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Wiring Schematic</CardTitle>
              <CardDescription className="text-sm">Single-line circuit diagram</CardDescription>
            </div>
            <Button onClick={downloadSchematic} size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download SVG
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {ragSourcesCount && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">
                  Verified from {ragSourcesCount.installation_docs_count} installation docs, {ragSourcesCount.regulations_count} BS 7671 regs, {ragSourcesCount.safety_docs_count} safety docs
                </span>
              </div>
            </div>
          )}
          
          <div 
            className="bg-white rounded-lg p-4 border border-border"
            dangerouslySetInnerHTML={{ __html: schematicSvg }}
          />
        </CardContent>
      </Card>

      {/* Circuit Specification */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Circuit Specification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Cable Size</p>
              <Badge variant="secondary" className="font-mono">{circuitSpec.cableSize}mm²</Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Cable Type</p>
              <Badge variant="secondary">{circuitSpec.cableType}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Protection</p>
              <Badge variant="secondary">{circuitSpec.protectionDevice}</Badge>
            </div>
            {circuitSpec.rcdRequired && (
              <div>
                <p className="text-muted-foreground mb-1">RCD Protection</p>
                <Badge variant="secondary">{circuitSpec.rcdRating}mA RCD Required</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terminal Connections */}
      {terminalConnections && terminalConnections.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Terminal Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {terminalConnections.map((conn, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-3">
                    <Badge className="font-mono">{conn.terminal}</Badge>
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: conn.wire_colour.toLowerCase() === 'brown' ? '#8B4513' : conn.wire_colour.toLowerCase() === 'blue' ? '#0000FF' : '#00FF00' }} />
                    <span className="text-sm">{conn.wire_colour}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{conn.connection_point}</p>
                    {conn.torque_setting && (
                      <p className="text-xs font-mono text-muted-foreground">{conn.torque_setting}</p>
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
        <CardHeader>
          <CardTitle className="text-base">Step-by-Step Wiring Procedure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {wiringProcedure.map((step, idx) => (
            <div key={idx} className={`p-3 rounded-lg border ${step.safety_critical ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/30'}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Badge variant={step.safety_critical ? 'destructive' : 'secondary'} className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                    {step.step}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                    {step.safety_critical && (
                      <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.instruction}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs font-mono">
                      BS 7671: {step.bs7671_reference}
                    </Badge>
                    {step.ppe_required && step.ppe_required.length > 0 && (
                      <Badge variant="outline" className="text-xs">
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

      {/* Installation Method Guidance */}
      {installationMethodGuidance && (
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-base text-blue-700 dark:text-blue-400">
              Installation Method Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{installationMethodGuidance}</p>
          </CardContent>
        </Card>
      )}

      {/* Testing Requirements */}
      {testingRequirements && testingRequirements.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Testing & Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {testingRequirements.map((test, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{test}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Safety Warnings */}
      {safetyWarnings && safetyWarnings.length > 0 && (
        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Safety Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {safetyWarnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-destructive flex-shrink-0">⚠</span>
                  <span className="text-muted-foreground">{warning}</span>
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
