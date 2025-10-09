import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
import { toast } from "sonner";

interface WiringSchematicPreviewProps {
  schematic: any;
  circuitName: string;
}

export const WiringSchematicPreview = ({ schematic, circuitName }: WiringSchematicPreviewProps) => {
  const handleDownloadSVG = () => {
    if (!schematic?.schematic_svg) return;
    
    const blob = new Blob([schematic.schematic_svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${circuitName.replace(/\s+/g, '_')}_Schematic.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Schematic downloaded");
  };

  return (
    <div className="space-y-4">
      {/* SVG Diagram */}
      <Card className="bg-elec-dark border-elec-yellow/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-foreground">Single-Line Diagram</CardTitle>
            <Button variant="outline" size="sm" onClick={handleDownloadSVG}>
              <Download className="h-4 w-4 mr-2" />
              Download SVG
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            className="bg-white/95 p-4 rounded-lg" 
            dangerouslySetInnerHTML={{ __html: schematic?.schematic_svg || '<p>No schematic available</p>' }}
          />
        </CardContent>
      </Card>

      {/* Circuit Specification */}
      {schematic?.circuit_spec && (
        <Card className="bg-elec-dark border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Circuit Specification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 rounded bg-elec-card border border-elec-yellow/10">
                <div className="text-white/60 text-xs">Cable</div>
                <div className="font-semibold text-foreground">{schematic.circuit_spec.cableType || 'TBC'}</div>
              </div>
              <div className="p-2 rounded bg-elec-card border border-elec-yellow/10">
                <div className="text-white/60 text-xs">Size</div>
                <div className="font-semibold text-foreground">{schematic.circuit_spec.cableSize || 'TBC'}mm²</div>
              </div>
              <div className="p-2 rounded bg-elec-card border border-elec-yellow/10">
                <div className="text-white/60 text-xs">Protection</div>
                <div className="font-semibold text-foreground">{schematic.circuit_spec.protectionDevice || 'TBC'}</div>
              </div>
              <div className="p-2 rounded bg-elec-card border border-elec-yellow/10">
                <div className="text-white/60 text-xs">RCD</div>
                <div className="font-semibold text-foreground">
                  {schematic.circuit_spec.rcdRequired ? `${schematic.circuit_spec.rcdRating || 30}mA` : 'Not Required'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wiring Procedure */}
      {schematic?.wiring_procedure && schematic.wiring_procedure.length > 0 && (
        <Card className="bg-elec-dark border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Step-by-Step Wiring Procedure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schematic.wiring_procedure.map((step: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-elec-card border border-elec-yellow/10">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      step.safety_critical 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                        : 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/50'
                    }`}>
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-foreground">{step.title}</h4>
                        {step.safety_critical && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Safety Critical
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/80">{step.instruction}</p>
                      {step.bs7671_reference && (
                        <p className="text-xs text-white/60 mt-1">BS 7671 Reg {step.bs7671_reference}</p>
                      )}
                      {step.ppe_required && step.ppe_required.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {step.ppe_required.map((ppe: string, ppeIdx: number) => (
                            <Badge key={ppeIdx} variant="outline" className="text-xs">
                              {ppe}
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

      {/* Terminal Connections */}
      {schematic?.terminal_connections && schematic.terminal_connections.length > 0 && (
        <Card className="bg-elec-dark border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Terminal Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {schematic.terminal_connections.map((conn: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-elec-card border border-elec-yellow/10">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="font-mono">{conn.terminal}</Badge>
                    <span className="text-sm text-foreground">{conn.connection_point}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/70">Wire: {conn.wire_colour}</span>
                    {conn.torque_setting && (
                      <span className="text-xs text-white/60">Torque: {conn.torque_setting}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testing Requirements */}
      {schematic?.testing_requirements && schematic.testing_requirements.length > 0 && (
        <Card className="bg-elec-dark border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Testing Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {schematic.testing_requirements.map((test: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {test}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Safety Warnings */}
      {schematic?.safety_warnings && schematic.safety_warnings.length > 0 && (
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Safety Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {schematic.safety_warnings.map((warning: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                  <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  {warning}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* RAG Source Verification */}
      {schematic?.rag_sources && (
        <div className="text-xs text-white/60 p-3 bg-elec-dark/50 rounded border border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">RAG Verified</Badge>
            <span>
              {schematic.rag_sources.installation_docs_count || 0} installation docs, 
              {schematic.rag_sources.regulations_count || 0} BS 7671 regs, 
              {schematic.rag_sources.safety_docs_count || 0} safety docs
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
