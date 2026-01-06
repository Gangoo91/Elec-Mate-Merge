
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Users, FileText, ShieldAlert, Info } from "lucide-react";

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
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          text: 'text-red-400',
          badgeBg: 'bg-red-500',
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
          bg: 'bg-red-500/15',
          border: 'border-red-500/30',
          text: 'text-red-400',
          badgeBg: 'bg-red-500/80',
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
          bg: 'bg-elec-yellow/20',
          border: 'border-elec-yellow/30',
          text: 'text-elec-yellow',
          badgeBg: 'bg-elec-yellow',
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
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          text: 'text-green-400',
          badgeBg: 'bg-green-500',
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
          bg: 'bg-green-500/15',
          border: 'border-green-500/30',
          text: 'text-green-400',
          badgeBg: 'bg-green-400',
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

  const GuidanceIcon = guidance.icon;
  const isHighRisk = riskLevel === "Very High" || riskLevel === "High";

  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative animate-fade-in">
      <div className={`absolute top-0 right-0 w-64 h-64 ${isHighRisk ? 'bg-red-500/5' : 'bg-green-500/5'} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${isHighRisk ? 'from-red-500/20 to-red-500/5 border-red-500/30' : 'from-green-500/20 to-green-500/5 border-green-500/30'} border`}>
            <ShieldAlert className={`h-5 w-5 ${isHighRisk ? 'text-red-400' : 'text-green-400'}`} />
          </div>
          Risk Management Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        {/* Primary Action Banner */}
        <div className={`p-4 rounded-xl ${guidance.bg} border ${guidance.border}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <GuidanceIcon className={`h-5 w-5 ${guidance.text}`} />
              </div>
              <div>
                <h4 className={`font-bold ${guidance.text}`}>{guidance.action}</h4>
                <p className="text-xs text-white/80">Risk Score: {riskScore}</p>
              </div>
            </div>
            <Badge className={`${guidance.badgeBg} ${riskLevel === "Medium" || riskLevel === "Very Low" ? 'text-black' : 'text-white'} px-3 py-1`}>
              {riskLevel}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Clock className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/80">Timeframe</p>
                <p className="text-sm font-medium text-white">{guidance.timeframe}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-white/80">Authority Level</p>
                <p className="text-sm font-medium text-white">{guidance.authority}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-white/80">Monitoring</p>
                <p className="text-sm font-medium text-white">{guidance.monitoring}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-green-500/20">
                <FileText className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/80">Documentation</p>
                <p className="text-sm font-medium text-white">{guidance.documentation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <span className={`w-6 h-6 ${guidance.bg} rounded-lg flex items-center justify-center`}>
              <CheckCircle className={`h-3.5 w-3.5 ${guidance.text}`} />
            </span>
            Required Actions & Recommendations
          </h4>
          <div className="space-y-2">
            {guidance.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className={`w-5 h-5 rounded-lg ${guidance.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <CheckCircle className={`h-3 w-3 ${guidance.text}`} />
                </div>
                <span className="text-sm text-white/80">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Matrix Reference */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Info className="h-4 w-4 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white">Risk Matrix Reference</h4>
          </div>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-xs min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-2 text-white/70 font-medium">Risk Level</th>
                  <th className="text-left py-2 px-2 text-white/70 font-medium">Score</th>
                  <th className="text-left py-2 px-2 text-white/70 font-medium">Action</th>
                  <th className="text-left py-2 px-2 text-white/70 font-medium">Authority</th>
                  <th className="text-left py-2 px-2 text-white/70 font-medium">Monitor</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b border-white/5 ${riskLevel === "Very High" ? 'bg-red-500/10' : ''}`}>
                  <td className="py-2 px-2">
                    <Badge className="bg-red-500 text-white text-[10px]">Very High</Badge>
                  </td>
                  <td className="py-2 px-2 text-white/70">15-25</td>
                  <td className="py-2 px-2 text-white/70">Stop Work</td>
                  <td className="py-2 px-2 text-white/70">Senior Mgmt</td>
                  <td className="py-2 px-2 text-white/70">Continuous</td>
                </tr>
                <tr className={`border-b border-white/5 ${riskLevel === "High" ? 'bg-red-500/10' : ''}`}>
                  <td className="py-2 px-2">
                    <Badge className="bg-red-500/80 text-white text-[10px]">High</Badge>
                  </td>
                  <td className="py-2 px-2 text-white/70">10-14</td>
                  <td className="py-2 px-2 text-white/70">Enhanced</td>
                  <td className="py-2 px-2 text-white/70">Supervisor</td>
                  <td className="py-2 px-2 text-white/70">Regular</td>
                </tr>
                <tr className={`border-b border-white/5 ${riskLevel === "Medium" ? 'bg-elec-yellow/10' : ''}`}>
                  <td className="py-2 px-2">
                    <Badge className="bg-elec-yellow text-black text-[10px]">Medium</Badge>
                  </td>
                  <td className="py-2 px-2 text-white/70">6-9</td>
                  <td className="py-2 px-2 text-white/70">Standard</td>
                  <td className="py-2 px-2 text-white/70">Team Lead</td>
                  <td className="py-2 px-2 text-white/70">Periodic</td>
                </tr>
                <tr className={`border-b border-white/5 ${riskLevel === "Low" ? 'bg-green-500/10' : ''}`}>
                  <td className="py-2 px-2">
                    <Badge className="bg-green-500 text-white text-[10px]">Low</Badge>
                  </td>
                  <td className="py-2 px-2 text-white/70">3-5</td>
                  <td className="py-2 px-2 text-white/70">Basic</td>
                  <td className="py-2 px-2 text-white/70">Self-managed</td>
                  <td className="py-2 px-2 text-white/70">Routine</td>
                </tr>
                <tr className={`${riskLevel === "Very Low" ? 'bg-green-500/10' : ''}`}>
                  <td className="py-2 px-2">
                    <Badge className="bg-green-400 text-black text-[10px]">Very Low</Badge>
                  </td>
                  <td className="py-2 px-2 text-white/70">1-2</td>
                  <td className="py-2 px-2 text-white/70">Minimal</td>
                  <td className="py-2 px-2 text-white/70">Self-managed</td>
                  <td className="py-2 px-2 text-white/70">As needed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskOutcomeGuidance;
