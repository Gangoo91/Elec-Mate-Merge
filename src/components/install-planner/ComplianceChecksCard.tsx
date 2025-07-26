
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

  const passedChecks = checks.filter(c => c.status === "pass").length;
  const totalChecks = checks.length;
  const progressPercentage = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            BS 7671 Compliance Checks
          </div>
          <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
            {passedChecks}/{totalChecks} PASSED
          </Badge>
        </CardTitle>
        
        {/* Progress Bar */}
        <div className="w-full bg-elec-dark/50 rounded-full h-3 mt-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-elec-yellow h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Compliance Progress</span>
          <span>{progressPercentage.toFixed(0)}% Complete</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {checks.map((check, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${
            check.status === "pass" ? "bg-green-500/10 border-green-500/30" :
            check.status === "fail" ? "bg-red-500/10 border-red-500/30" :
            "bg-amber-500/10 border-amber-500/30"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">
                  {getStatusIcon(check.status)}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-sm">{check.requirement}</span>
                  {check.details && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {check.details}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Badge className={getStatusColor(check.status)} variant="outline">
                  {check.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light">
                  {check.reference}
                </Badge>
              </div>
            </div>
          </div>
        ))}
        
        {checks.length === 0 && (
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No compliance checks available.</p>
            <p className="text-xs text-muted-foreground mt-1">Complete the design to see compliance status.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceChecksCard;
