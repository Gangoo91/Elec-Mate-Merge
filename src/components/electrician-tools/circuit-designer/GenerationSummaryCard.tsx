import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { CircuitInput } from "@/types/installation-design";

interface GenerationSummaryCardProps {
  circuits: CircuitInput[];
  projectName: string;
  location: string;
  isValid: boolean;
  validationErrors: string[];
}

export function GenerationSummaryCard({ 
  circuits, 
  projectName, 
  location, 
  isValid, 
  validationErrors 
}: GenerationSummaryCardProps) {
  const estimatedTime = Math.max(5, Math.ceil(circuits.length * 1.5));

  return (
    <Card className="border-2 border-primary/20 sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Generation Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Validation Checklist */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            {projectName && location ? (
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
            <span className={projectName && location ? "" : "text-muted-foreground"}>
              Project details provided
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            {circuits.length > 0 ? (
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
            <span className={circuits.length > 0 ? "" : "text-muted-foreground"}>
              Circuits added ({circuits.length})
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            {isValid ? (
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
            <span className={isValid ? "" : "text-muted-foreground"}>
              All requirements met
            </span>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="space-y-1">
            {validationErrors.map((error, idx) => (
              <div key={idx} className="text-sm text-amber-600 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{circuits.length}</div>
            <div className="text-xs text-muted-foreground">Circuits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">~{estimatedTime}s</div>
            <div className="text-xs text-muted-foreground">Est. Time</div>
          </div>
        </div>

        {/* Ready Status */}
        <div className="pt-3 border-t">
          <Badge 
            variant={isValid ? "default" : "secondary"}
            className={`w-full justify-center py-2 ${isValid ? "bg-emerald-500" : ""}`}
          >
            {isValid ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Ready to Generate
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Complete Requirements
              </>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
