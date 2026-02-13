
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HardHat,
  CheckCircle,
  Shield,
  AlertTriangle,
  Zap,
  Eye,
  Star,
  Phone,
  Heart
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

  const quickStats = [
    { label: "PPE Items", value: "6+", icon: Eye, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Isolation Steps", value: "6", icon: Zap, color: "text-red-400", bg: "from-red-500/10 to-red-500/5", border: "border-red-500/30" },
    { label: "Core Rules", value: "6", icon: Shield, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Priority", value: "#1", icon: Star, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <HardHat className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Safety Fundamentals
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Essential electrical safety principles, procedures, and practices for apprentices and qualified electricians.
          Your safety and the safety of others depends on following these fundamentals.
        </p>
        <SmartBackButton />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.border} bg-gradient-to-br ${stat.bg}`}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Core Safety Principles */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Core Safety Principles</CardTitle>
          </div>
          <p className="text-white text-sm">Fundamental safety rules that must never be compromised</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safetyPrinciples.map((principle, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:border-elec-yellow/30 transition-all">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">{principle}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PPE Requirements */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-400">Personal Protective Equipment (PPE)</CardTitle>
          </div>
          <p className="text-white text-sm">Essential PPE for electrical work with relevant standards</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ppeItems.map((ppe, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:border-blue-500/30 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm mb-1">{ppe.item}</h4>
                    <p className="text-white text-xs">{ppe.requirement}</p>
                  </div>
                  <Badge variant="outline" className="border-blue-500/40 text-blue-400 w-fit text-xs">
                    {ppe.standard}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safe Isolation Procedure */}
      <Card className="border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-400">Safe Isolation Procedure</CardTitle>
          </div>
          <p className="text-white text-sm">Critical steps that must be followed in order</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isolationSteps.map((step, index) => (
              <div key={index} className="bg-white/5 border border-red-500/20 p-4 rounded-lg hover:border-red-500/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium text-sm">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Procedures */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-400">Emergency Procedures</CardTitle>
          </div>
          <p className="text-white text-sm">What to do in electrical emergency situations</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emergencyProcedures.map((procedure, index) => (
              <div key={index} className="bg-white/5 border border-orange-500/20 p-4 rounded-lg hover:border-orange-500/40 transition-all">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">{procedure}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-elec-yellow text-base">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-sm">
              Always conduct a risk assessment before starting work. Identify potential hazards,
              assess likelihood and severity, and implement control measures.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-elec-yellow text-base">Permit to Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-sm">
              High-risk electrical work requires permits. Understand when permits are needed,
              how to obtain them, and never begin work without proper authorisation.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-elec-yellow text-base">Tool Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-sm">
              Maintain tools in good condition with regular PAT testing. Use insulated tools for
              live work and never use damaged or uncalibrated equipment.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Safety Notice */}
      <Card className="border-red-500/40 bg-gradient-to-br from-red-500/15 to-orange-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-400">Critical Safety Reminders</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-red-500/20 rounded-lg border border-red-500/40">
            <p className="text-red-400 font-bold text-lg mb-2">ELECTRICITY CAN KILL</p>
            <p className="text-white text-sm">
              Even low voltages can be fatal in the right circumstances. Never take shortcuts with safety procedures.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-orange-500/20 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-400 mb-2">Remember:</h4>
              <ul className="text-sm text-white space-y-1">
                <li>- If in doubt, don't proceed</li>
                <li>- Ask for help from qualified personnel</li>
                <li>- Safety is everyone's responsibility</li>
                <li>- Report unsafe conditions immediately</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-red-500/20 p-4 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency Numbers:
              </h4>
              <ul className="text-sm text-white space-y-1">
                <li>- Emergency Services: 999</li>
                <li>- Electricity Emergency: 105</li>
                <li>- Gas Emergency: 0800 111 999</li>
                <li>- Your company emergency line</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Safety is a Lifelong Commitment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white leading-relaxed">
            Safety isn't just about following rules - it's about going home to your family every day.
            The habits you form as an apprentice will stay with you throughout your career. Make safety your first instinct.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Safety first, always", icon: Shield },
              { text: "Never take shortcuts", icon: AlertTriangle },
              { text: "Look out for others", icon: Heart }
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                <tip.icon className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyFundamentals;
