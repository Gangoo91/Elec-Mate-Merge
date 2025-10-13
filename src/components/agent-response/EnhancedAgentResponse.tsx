import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info, FileText } from "lucide-react";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { RegulationCitation } from "./RegulationCitation";
import { StructuredDesignView } from "./StructuredDesignView";
import { CollapsibleSection } from "./CollapsibleSection";

interface EnhancedAgentResponseProps {
  response: any;
  enrichment?: any;
  citations?: any[];
  rendering?: any;
}

export const EnhancedAgentResponse = ({
  response,
  enrichment,
  citations,
  rendering
}: EnhancedAgentResponseProps) => {
  return (
    <div className="space-y-6">
      {/* Top callouts/warnings */}
      {rendering?.callouts?.filter((c: any) => c.placement === 'top').map((callout: any, idx: number) => (
        <Alert key={idx} variant={callout.type === 'warning' ? 'destructive' : 'default'}>
          {callout.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
          {callout.type === 'info' && <Info className="h-4 w-4" />}
          <AlertDescription>{callout.content}</AlertDescription>
        </Alert>
      ))}

      {/* Summary section */}
      {response.summary && (
        <Card className="bg-slate-900/50 border-elec-yellow/20">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quick Summary
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{response.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Structured design view */}
      {response.design && enrichment?.displayHints?.primaryView === 'structured' && (
        <StructuredDesignView design={response.design} />
      )}

      {/* Citations with confidence */}
      {citations && citations.length > 0 && (
        <Card className="bg-slate-900/50 border-elec-yellow/20">
          <CardHeader>
            <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Regulations Referenced
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {citations.map((citation, idx) => (
              <RegulationCitation key={idx} citation={citation} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Regulations detailed breakdown */}
      {response.regulations && response.regulations.length > 0 && (
        <CollapsibleSection title="Regulation Details">
          <div className="space-y-4">
            {response.regulations.map((reg: any, idx: number) => (
              <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{reg.number}</h4>
                  {reg.confidence && (
                    <ConfidenceBadge confidence={reg.confidence.overall} />
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300"><strong className="text-white">What:</strong> {reg.what}</p>
                  <p className="text-gray-300"><strong className="text-white">Why:</strong> {reg.why}</p>
                  {reg.consequence && (
                    <p className="text-red-400"><strong className="text-white">Consequence if ignored:</strong> {reg.consequence}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Practical guidance */}
      {response.practicalGuidance && (
        <CollapsibleSection title="Practical Guidance">
          <div className="space-y-4">
            {response.practicalGuidance.installation && response.practicalGuidance.installation.length > 0 && (
              <div>
                <h4 className="font-semibold text-white mb-2">Installation:</h4>
                <ul className="space-y-1 text-gray-300">
                  {response.practicalGuidance.installation.map((tip: string, i: number) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {response.practicalGuidance.testing && response.practicalGuidance.testing.length > 0 && (
              <div>
                <h4 className="font-semibold text-white mb-2">Testing:</h4>
                <ul className="space-y-1 text-gray-300">
                  {response.practicalGuidance.testing.map((tip: string, i: number) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {response.practicalGuidance.commonMistakes && response.practicalGuidance.commonMistakes.length > 0 && (
              <div>
                <h4 className="font-semibold text-white mb-2">Common Mistakes to Avoid:</h4>
                <ul className="space-y-1 text-red-300">
                  {response.practicalGuidance.commonMistakes.map((mistake: string, i: number) => (
                    <li key={i}>• {mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* Warnings */}
      {response.warnings && response.warnings.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {response.warnings.map((warning: string, idx: number) => (
                <li key={idx}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
