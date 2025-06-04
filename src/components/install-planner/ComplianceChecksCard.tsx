
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Shield } from "lucide-react";
import { ComplianceCheck } from "./types";

interface ComplianceChecksCardProps {
  checks: ComplianceCheck[];
}

const ComplianceChecksCard = ({ checks }: ComplianceChecksCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "fail":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "fail":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "warning":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          BS 7671 Compliance Checks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {checks.map((check, index) => (
          <div key={index} className="p-3 bg-elec-dark/50 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(check.status)}
                <span className="font-medium">{check.requirement}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(check.status)} variant="outline">
                  {check.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {check.reference}
                </Badge>
              </div>
            </div>
            {check.details && (
              <div className="text-sm text-muted-foreground">
                {check.details}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ComplianceChecksCard;
