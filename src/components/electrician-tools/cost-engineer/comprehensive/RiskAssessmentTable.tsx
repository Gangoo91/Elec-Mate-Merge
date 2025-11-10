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
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Mitigation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-center text-xl">
                    {getRiskDot(risk.severity)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {risk.risk}
                    <div className="text-xs text-muted-foreground mt-1">
                      {risk.likelihood} likelihood
                      {risk.contingency && risk.contingency > 0 && (
                        <span> • +£{risk.contingency} if occurs</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryBadge(risk.category)}`}>
                      {risk.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
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
