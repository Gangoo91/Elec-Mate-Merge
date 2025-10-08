import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Info, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface RegulationReference {
  number: string;
  section: string;
  content: string;
  similarity: number;
  severity_justification: string;
}

interface VisualFaultRAGDisplayProps {
  faultCode: 'C1' | 'C2' | 'C3' | 'FI';
  regulationReferences: RegulationReference[];
  gn3Guidance: string;
  confidence: number;
  reasoning: string;
  verificationStatus?: string;
}

const VisualFaultRAGDisplay = ({
  faultCode,
  regulationReferences,
  gn3Guidance,
  confidence,
  reasoning,
  verificationStatus
}: VisualFaultRAGDisplayProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCodeColor = (code: string) => {
    switch (code) {
      case 'C1': return 'bg-destructive text-destructive-foreground';
      case 'C2': return 'bg-orange-500 text-white';
      case 'C3': return 'bg-yellow-500 text-black';
      case 'FI': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCodeIcon = (code: string) => {
    switch (code) {
      case 'C1': return <AlertTriangle className="h-4 w-4" />;
      case 'C2': return <AlertTriangle className="h-4 w-4" />;
      case 'C3': return <Info className="h-4 w-4" />;
      case 'FI': return <FileText className="h-4 w-4" />;
      default: return null;
    }
  };

  const getCodeDescription = (code: string) => {
    switch (code) {
      case 'C1': return '⚠️ Danger - Act Now';
      case 'C2': return '⚡ Urgent Action Required';
      case 'C3': return '💡 Improvement Recommended';
      case 'FI': return '🔍 Investigate Further';
      default: return '';
    }
  };

  return (
    <Card className="border-l-4" style={{ borderLeftColor: faultCode === 'C1' ? 'hsl(var(--destructive))' : faultCode === 'C2' ? '#f97316' : faultCode === 'C3' ? '#eab308' : '#3b82f6' }}>
      <CardHeader className="pb-3 space-y-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${getCodeColor(faultCode)} text-sm sm:text-base px-3 py-1.5`}>
              {getCodeIcon(faultCode)}
              <span className="ml-1.5 font-bold">{faultCode}</span>
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm whitespace-nowrap px-2 py-1">
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
              {(confidence * 100).toFixed(0)}% confidence
            </Badge>
          </div>
          <CardTitle className="text-base sm:text-lg">RAG-Verified Classification</CardTitle>
        </div>
        <CardDescription className="text-sm sm:text-base leading-relaxed font-medium">
          {getCodeDescription(faultCode)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-5">
        {verificationStatus && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="font-medium leading-relaxed">{verificationStatus}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow">🔍</span>
            AI Reasoning
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed pl-6">{reasoning}</p>
        </div>

        {gn3Guidance && gn3Guidance !== 'No specific GN3 guidance found' && (
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 sm:p-4 space-y-2">
            <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
              📖 GN3 Guidance (Inspection & Testing)
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{gn3Guidance}</p>
          </div>
        )}

        {regulationReferences && regulationReferences.length > 0 && regulationReferences[0]?.number !== 'N/A' && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors touch-manipulation">
              <span className="text-sm sm:text-base font-semibold flex items-center gap-2">
                <span className="text-elec-yellow text-base sm:text-lg">⚡</span>
                BS 7671 References ({regulationReferences.length})
              </span>
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1">
                {isOpen ? 'Hide' : 'Show'}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {regulationReferences.map((reg, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg p-3 sm:p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <Badge variant="outline" className="font-mono text-xs w-fit">
                      Regulation {reg.number}
                    </Badge>
                    <Badge variant="secondary" className="text-xs w-fit">
                      {(reg.similarity * 100).toFixed(0)}% relevance
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-foreground leading-snug">{reg.section}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">{reg.content}</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      <strong className="font-semibold">Why this matters:</strong> {reg.severity_justification}
                    </p>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualFaultRAGDisplay;
