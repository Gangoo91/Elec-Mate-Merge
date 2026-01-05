import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

interface RiskAssessmentTableProps {
  risks: any[];
}

const RiskAssessmentTable = ({ risks }: RiskAssessmentTableProps) => {
  const getRiskDot = (severity: string) => {
    switch(severity) {
      case 'critical': return '🔴';
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      'Technical': 'bg-blue-500/20 text-blue-500',
      'Financial': 'bg-green-500/20 text-green-500',
      'Schedule': 'bg-orange-500/20 text-orange-500',
      'Safety': 'bg-red-500/20 text-red-500'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-500';
  };

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        {/* Mobile: Stacked Cards */}
        <div className="space-y-3 sm:hidden">
          {risks.map((risk, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{getRiskDot(risk.severity)}</span>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-base leading-snug">{risk.risk}</div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded text-sm ${getCategoryBadge(risk.category)}`}>
                      {risk.category}
                    </span>
                    <span className="text-sm text-foreground/70">{risk.likelihood} likelihood</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border/30">
                <div className="text-sm text-foreground/70 mb-1">Mitigation:</div>
                <div className="text-base text-foreground leading-relaxed">{risk.mitigation}</div>
                {risk.contingency && risk.contingency > 0 && (
                  <div className="mt-2 text-sm text-orange-400 font-medium">
                    +£{risk.contingency} contingency if occurs
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-foreground font-semibold text-base sm:text-sm"></TableHead>
                <TableHead className="text-foreground font-semibold text-base sm:text-sm">Risk</TableHead>
                <TableHead className="text-foreground font-semibold text-base sm:text-sm">Category</TableHead>
                <TableHead className="text-foreground font-semibold text-base sm:text-sm">Mitigation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-center text-xl">
                    {getRiskDot(risk.severity)}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    <span className="text-base sm:text-sm">{risk.risk}</span>
                    <div className="text-sm text-foreground mt-1">
                      {risk.likelihood} likelihood
                      {risk.contingency && risk.contingency > 0 && (
                        <span> • +£{risk.contingency} if occurs</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm sm:text-xs ${getCategoryBadge(risk.category)}`}>
                      {risk.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-base sm:text-sm text-foreground">
                    {risk.mitigation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentTable;
