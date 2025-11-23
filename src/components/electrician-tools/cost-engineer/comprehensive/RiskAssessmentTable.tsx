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
        <CardTitle className="text-2xl sm:text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[600px] px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-white font-semibold text-base sm:text-sm"></TableHead>
                  <TableHead className="text-white font-semibold text-base sm:text-sm">Risk</TableHead>
                  <TableHead className="text-white font-semibold text-base sm:text-sm">Category</TableHead>
                  <TableHead className="text-white font-semibold text-base sm:text-sm">Mitigation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {risks.map((risk, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-center text-xl">
                      {getRiskDot(risk.severity)}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      <span className="text-base sm:text-sm">{risk.risk}</span>
                      <div className="text-sm text-white mt-1">
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
                    <TableCell className="text-base sm:text-sm text-white">
                      {risk.mitigation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="text-xs text-center text-white/60 mt-2 sm:hidden">
          ← Swipe to see more →
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentTable;
