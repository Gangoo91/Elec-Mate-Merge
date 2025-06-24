
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Users, FileText } from "lucide-react";

interface RiskOutcomeGuidanceProps {
  riskLevel: string;
  riskScore: number;
}

const RiskOutcomeGuidance = ({ riskLevel, riskScore }: RiskOutcomeGuidanceProps) => {
  const getRiskGuidance = () => {
    switch (riskLevel) {
      case "Very High":
        return {
          action: "STOP WORK IMMEDIATELY",
          timeframe: "Immediate action required",
          authority: "Senior management approval required",
          monitoring: "Continuous monitoring required",
          documentation: "Detailed risk assessment and SWMS mandatory",
          color: "bg-red-600",
          icon: AlertTriangle,
          recommendations: [
            "Work must not proceed until risk is reduced",
            "Implement multiple high-level controls immediately",
            "Senior management sign-off required",
            "Emergency procedures must be in place",
            "Qualified safety officer must be present"
          ]
        };
      case "High":
        return {
          action: "CAUTION - Enhanced Controls Required",
          timeframe: "Action required before work starts",
          authority: "Supervisor approval required",
          monitoring: "Regular monitoring required",
          documentation: "Comprehensive risk assessment required",
          color: "bg-red-500",
          icon: AlertTriangle,
          recommendations: [
            "Implement high-level control measures",
            "Supervisor briefing mandatory",
            "Regular safety checks during work",
            "Emergency response plan activated",
            "Competent persons only"
          ]
        };
      case "Medium":
        return {
          action: "PROCEED WITH CONTROLS",
          timeframe: "Controls must be in place",
          authority: "Team leader approval",
          monitoring: "Periodic monitoring",
          documentation: "Standard risk assessment",
          color: "bg-yellow-500",
          icon: Clock,
          recommendations: [
            "Implement appropriate control measures",
            "Toolbox talk before starting",
            "Regular safety observations",
            "Standard operating procedures followed",
            "Trained workers only"
          ]
        };
      case "Low":
        return {
          action: "PROCEED WITH STANDARD CONTROLS",
          timeframe: "Standard precautions",
          authority: "Self-managed with oversight",
          monitoring: "Routine monitoring",
          documentation: "Basic risk documentation",
          color: "bg-green-500",
          icon: CheckCircle,
          recommendations: [
            "Follow standard safety procedures",
            "Basic PPE requirements",
            "Standard supervision",
            "Normal work practices",
            "Regular safety awareness"
          ]
        };
      case "Very Low":
        return {
          action: "PROCEED WITH MINIMAL CONTROLS",
          timeframe: "Basic precautions sufficient",
          authority: "Self-managed",
          monitoring: "As needed",
          documentation: "Brief documentation",
          color: "bg-green-400",
          icon: CheckCircle,
          recommendations: [
            "Standard workplace safety",
            "Basic awareness required",
            "Minimal supervision needed",
            "Standard PPE as required",
            "Normal monitoring"
          ]
        };
      default:
        return null;
    }
  };

  const guidance = getRiskGuidance();
  if (!guidance) return null;

  return (
    <Card className="border-purple-500/20 bg-purple-500/10">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          <guidance.icon className="h-5 w-5" />
          Risk Management Guidance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Primary Action */}
          <Card className={`border-2 ${guidance.color.replace('bg-', 'border-')}/50`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${guidance.color} text-white text-sm px-3 py-1`}>
                  {guidance.action}
                </Badge>
                <span className="text-sm text-muted-foreground">Score: {riskScore}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4" />
                    <strong>Timeframe:</strong> {guidance.timeframe}
                  </p>
                  <p className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4" />
                    <strong>Authority:</strong> {guidance.authority}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4" />
                    <strong>Monitoring:</strong> {guidance.monitoring}
                  </p>
                  <p className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <strong>Documentation:</strong> {guidance.documentation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Recommendations */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-purple-300">Required Actions & Recommendations</h4>
            <div className="space-y-2">
              {guidance.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-2 p-2 border border-gray-600 rounded">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Matrix Reference */}
          <Card className="border-gray-600 bg-gray-800/50">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm">Risk Matrix Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-1 text-xs">
                <div className="font-semibold">Risk Level</div>
                <div className="font-semibold">Score Range</div>
                <div className="font-semibold">Action Required</div>
                <div className="font-semibold">Authority Level</div>
                <div className="font-semibold">Monitoring</div>
                
                <div className="bg-red-600 p-1 rounded text-white text-center">Very High</div>
                <div>15-25</div>
                <div>Stop Work</div>
                <div>Senior Mgmt</div>
                <div>Continuous</div>
                
                <div className="bg-red-500 p-1 rounded text-white text-center">High</div>
                <div>10-14</div>
                <div>Enhanced Controls</div>
                <div>Supervisor</div>
                <div>Regular</div>
                
                <div className="bg-yellow-500 p-1 rounded text-white text-center">Medium</div>
                <div>6-9</div>
                <div>Standard Controls</div>
                <div>Team Leader</div>
                <div>Periodic</div>
                
                <div className="bg-green-500 p-1 rounded text-white text-center">Low</div>
                <div>3-5</div>
                <div>Basic Controls</div>
                <div>Self-managed</div>
                <div>Routine</div>
                
                <div className="bg-green-400 p-1 rounded text-white text-center">Very Low</div>
                <div>1-2</div>
                <div>Minimal Controls</div>
                <div>Self-managed</div>
                <div>As needed</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskOutcomeGuidance;
