import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Risk {
  risk?: string;
  description?: string;
  mitigation?: string;
  severity?: string;
}

interface RisksSectionProps {
  risks: Risk[];
}

const RisksSection = ({ risks }: RisksSectionProps) => {
  if (!risks || risks.length === 0) return null;

  const getSeverityColor = (severity?: string) => {
    const sev = severity?.toLowerCase() || 'medium';
    if (sev.includes('high') || sev.includes('critical')) return 'bg-destructive/20 border-destructive/40 text-destructive';
    if (sev.includes('low')) return 'bg-success/20 border-success/40 text-success';
    return 'bg-warning/20 border-warning/40 text-warning';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-pink-400" />
          Risk Register
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Potential issues and mitigation strategies
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {risks.map((risk, idx) => (
          <div 
            key={idx} 
            className="p-3 sm:p-4 border border-pink-400/20 rounded-lg bg-pink-400/5 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-medium text-sm flex-1">
                {risk.risk || risk.description || 'Risk identified'}
              </div>
              {risk.severity && (
                <Badge variant="outline" className={`text-xs ${getSeverityColor(risk.severity)}`}>
                  {risk.severity}
                </Badge>
              )}
            </div>
            {risk.mitigation && (
              <div className="text-xs bg-muted/50 p-2 rounded">
                <span className="font-semibold text-foreground">Mitigation: </span>
                <span className="text-foreground/80">{risk.mitigation}</span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RisksSection;
