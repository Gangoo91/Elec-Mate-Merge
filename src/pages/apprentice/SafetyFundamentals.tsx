
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, AlertTriangle, CheckCircle } from "lucide-react";

const SafetyFundamentals = () => {
  const safetyRules = [
    {
      rule: "ALWAYS Isolate and Test",
      description: "Turn off power, lock off, test the circuit is dead",
      why: "Electricity can kill - there are no second chances with this",
      steps: ["Turn off at source", "Lock off and tag", "Test with approved tester", "Test tester is working"]
    },
    {
      rule: "Never Work Alone on Live Systems", 
      description: "If you must work live, have someone qualified with you",
      why: "Someone needs to be able to help if things go wrong",
      steps: ["Get permission from supervisor", "Use proper PPE", "Have rescue procedures ready", "Emergency contact ready"]
    },
    {
      rule: "Inspect Tools Before Use",
      description: "Check for damage, proper ratings, and test dates",
      why: "Damaged tools can cause injury or death",
      steps: ["Visual inspection", "Check test dates", "Verify voltage rating", "Test operation"]
    }
  ];

  const ppe = [
    {
      item: "Safety Boots",
      purpose: "Protection from falling objects, electrical hazards",
      standard: "Must be rated for electrical work"
    },
    {
      item: "Hard Hat",
      purpose: "Head protection from impact and electrical arc",
      standard: "Class E (electrical) rating required"
    },
    {
      item: "Hi-Vis Clothing",
      purpose: "Visibility on site, especially around machinery",
      standard: "Class 2 or 3 depending on risk assessment"
    },
    {
      item: "Safety Glasses",
      purpose: "Eye protection from debris and arc flash",
      standard: "Impact rated, side protection recommended"
    }
  ];

  const emergencyProcedures = [
    {
      situation: "Electric Shock",
      action: "DO NOT touch the person directly",
      steps: [
        "Switch off power immediately if safe to do so",
        "If you can't switch off, use non-conductive material to move victim",
        "Call 999 immediately",
        "Start CPR if trained and needed",
        "Keep victim warm and still"
      ]
    },
    {
      situation: "Electrical Fire",
      action: "DO NOT use water",
      steps: [
        "Switch off power if safe to do so",
        "Use CO2 or dry powder extinguisher",
        "Call fire brigade (999)",
        "Evacuate area if fire spreads",
        "Never turn your back on electrical fire"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Safety Fundamentals</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Critical safety information for electrical work - your life depends on following these rules
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Critical Safety Warning</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center text-lg">
            <strong>Electricity can kill.</strong> These aren't just guidelines - they're the difference 
            between going home safely and not going home at all. Never compromise on safety, no matter 
            what anyone tells you.
          </p>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Non-Negotiable Safety Rules</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {safetyRules.map((rule, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-white text-lg">{rule.rule}</h4>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{rule.description}</p>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-red-300">Why this matters:</strong> {rule.why}
                  </p>
                </div>
                
                <div>
                  <h5 className="font-medium text-white mb-2">Steps to follow:</h5>
                  <ol className="space-y-1">
                    {rule.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-elec-yellow font-medium">{stepIndex + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Personal Protective Equipment (PPE)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ppe.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{item.item}</h4>
                <p className="text-sm text-muted-foreground mb-2">{item.purpose}</p>
                <div className="bg-elec-yellow/10 p-2 rounded">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-elec-yellow">Standard:</strong> {item.standard}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Emergency Procedures</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {emergencyProcedures.map((emergency, index) => (
              <div key={index} className="border border-red-500/30 rounded-lg p-6 bg-red-500/5">
                <div className="mb-4">
                  <h4 className="font-semibold text-white text-lg mb-2">{emergency.situation}</h4>
                  <p className="text-red-300 font-medium">{emergency.action}</p>
                </div>
                
                <ol className="space-y-2">
                  {emergency.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-red-400 font-medium">{stepIndex + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Key Safety Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-elec-yellow/20 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Emergency Services</h4>
              <p className="text-2xl font-bold text-red-400">999</p>
              <p className="text-sm text-muted-foreground">Life-threatening emergencies</p>
            </div>
            <div className="text-center p-4 border border-elec-yellow/20 rounded-lg">
              <h4 className="font-semibold text-white mb-2">HSE Emergency</h4>
              <p className="text-lg font-bold text-orange-400">0300 790 6787</p>
              <p className="text-sm text-muted-foreground">Serious workplace incidents</p>
            </div>
            <div className="text-center p-4 border border-elec-yellow/20 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Site First Aid</h4>
              <p className="text-lg font-bold text-elec-yellow">Check Site Notice</p>
              <p className="text-sm text-muted-foreground">Site-specific emergency contacts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Your Safety Responsibility</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You have the right and responsibility to refuse unsafe work. No job is worth your life 
            or long-term health. If something doesn't feel right, stop and ask. Experienced 
            electricians will respect you more for taking safety seriously than for taking risks 
            to save time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyFundamentals;
