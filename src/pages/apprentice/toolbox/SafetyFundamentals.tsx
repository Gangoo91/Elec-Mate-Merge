
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HardHat,
  CheckCircle,
  Shield,
  AlertTriangle,
  Zap,
  Eye,
  Users,
  ClipboardCheck
} from "lucide-react";

const SafetyFundamentals = () => {
  const safetyPrinciples = [
    "Always assume circuits are live until proven dead",
    "Use appropriate PPE for every electrical task", 
    "Follow safe isolation procedures without exception",
    "Never work alone on electrical installations",
    "Report all incidents and near misses immediately",
    "Maintain tools and test equipment regularly"
  ];

  const ppeItems = [
    { item: "Safety boots", requirement: "Steel toecap, electrical hazard rated", standard: "BS EN ISO 20345" },
    { item: "Hard hat", requirement: "Class C electrical rating", standard: "BS EN 397" },
    { item: "Safety glasses", requirement: "Impact resistant, side protection", standard: "BS EN 166" },
    { item: "Insulated gloves", requirement: "Class 0 or higher for voltage", standard: "BS EN 60903" },
    { item: "High-vis vest", requirement: "Class 2 or 3 depending on location", standard: "BS EN ISO 20471" },
    { item: "Arc flash PPE", requirement: "Cat 2+ rating for high energy work", standard: "BS EN 61482" }
  ];

  const isolationSteps = [
    "Switch off supply at source",
    "Isolate all sources of supply",
    "Lock off isolation points",
    "Test isolation is effective",
    "Test voltage indicator",
    "Issue permits to work if required"
  ];

  const emergencyProcedures = [
    "Electrical shock - Switch off, don't touch victim",
    "Electrical fire - Use CO2 extinguisher, isolate supply",
    "Arc flash incident - Emergency services, first aid",
    "Equipment failure - Isolate, report, do not reset"
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HardHat className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            Safety Fundamentals
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6">
          Essential electrical safety principles, procedures, and practices for apprentices and qualified electricians. 
          Your safety and the safety of others depends on following these fundamentals.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Toolbox" />
      </div>

      {/* Core Safety Principles */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Core Safety Principles</CardTitle>
          </div>
          <p className="text-muted-foreground">Fundamental safety rules that must never be compromised</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            {safetyPrinciples.map((principle, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">{principle}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PPE Requirements */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Personal Protective Equipment (PPE)</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential PPE for electrical work with relevant standards</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {ppeItems.map((ppe, index) => (
              <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-base mb-1">{ppe.item}</h4>
                    <p className="text-sm text-muted-foreground">{ppe.requirement}</p>
                  </div>
                  <Badge variant="outline" className="border-elec-yellow text-elec-yellow w-fit">
                    {ppe.standard}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safe Isolation Procedure */}
      <Card className="border-red-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Safe Isolation Procedure</CardTitle>
          </div>
          <p className="text-muted-foreground">Critical steps that must be followed in order</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {isolationSteps.map((step, index) => (
              <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Procedures */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Emergency Procedures</CardTitle>
          </div>
          <p className="text-muted-foreground">What to do in electrical emergency situations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyProcedures.map((procedure, index) => (
              <div key={index} className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-300 font-medium">{procedure}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Always conduct a risk assessment before starting work. Identify potential hazards, 
              assess likelihood and severity, and implement control measures. Document findings 
              and review regularly throughout the work.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Permit to Work</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              High-risk electrical work requires permits to work. Understand when permits are needed, 
              how to obtain them, and the responsibilities of permit holders. Never begin work without 
              proper authorisation.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Tool Safety</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Maintain tools in good condition with regular PAT testing. Use insulated tools for 
              live work. Inspect test equipment before use and calibrate regularly. Never use 
              damaged or uncalibrated equipment.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Safety Notice */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/20 to-orange-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Critical Safety Reminders</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            <div className="text-center p-4 bg-red-500/20 rounded-lg border border-red-500/40">
              <p className="text-red-300 font-bold text-lg mb-2">ELECTRICITY CAN KILL</p>
              <p className="text-red-200 text-sm">
                Even low voltages can be fatal in the right circumstances. Never take shortcuts with safety procedures.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <h4 className="font-semibold text-orange-300 mb-2">Remember:</h4>
                <ul className="text-sm text-orange-200 space-y-1">
                  <li>• If in doubt, don't proceed</li>
                  <li>• Ask for help from qualified personnel</li>
                  <li>• Safety is everyone's responsibility</li>
                  <li>• Report unsafe conditions immediately</li>
                </ul>
              </div>
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h4 className="font-semibold text-red-300 mb-2">Emergency Numbers:</h4>
                <ul className="text-sm text-red-200 space-y-1">
                  <li>• Emergency Services: 999</li>
                  <li>• Electricity Emergency: 105</li>
                  <li>• Gas Emergency: 0800 111 999</li>
                  <li>• Your company emergency line</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyFundamentals;
