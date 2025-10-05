import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, HardHat, Triangle } from "lucide-react";

const SafeWorkingPracticesTab = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-2xl text-elec-yellow">Safe Working Practices</CardTitle>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            Assessment of practical skills in safe working procedures within electrical installation environments. This section covers preparation, risk assessment, and safe execution of electrical work.
          </p>
        </CardHeader>
      </Card>

      {/* Preparation and Planning */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <HardHat className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-xl">Preparation and Planning</CardTitle>
          </div>
          <p className="text-foreground/70 text-sm">
            Ensuring all tools and equipment are in good condition, selecting appropriate PPE, and understanding task requirements
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-4">Key Preparation Steps</h4>
            <div className="space-y-4">
              {[
                {
                  title: "Tool and Equipment Inspection",
                  points: [
                    "Visual inspection for damage or wear",
                    "Verify calibration dates on test equipment",
                    "Check insulation integrity on tools",
                    "Ensure all safety devices are functional"
                  ]
                },
                {
                  title: "PPE Selection",
                  points: [
                    "Select voltage-rated gloves appropriate for work",
                    "Choose arc-rated clothing if required",
                    "Verify face shield and eye protection",
                    "Ensure safety footwear is electrically rated"
                  ]
                },
                {
                  title: "Task Planning",
                  points: [
                    "Review method statements and risk assessments",
                    "Identify all electrical isolation points",
                    "Plan emergency evacuation routes",
                    "Coordinate with other trades on site"
                  ]
                },
                {
                  title: "Pre-Work Safety Checks",
                  points: [
                    "Confirm permit to work is in place",
                    "Verify isolation and locking procedures",
                    "Check first aid provision and emergency contacts",
                    "Document site conditions and hazards"
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                  <h5 className="font-semibold text-foreground mb-3">{section.title}</h5>
                  <ul className="space-y-2">
                    {section.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                        <span className="text-foreground/80 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Triangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-xl">Risk Assessment and Control</CardTitle>
          </div>
          <p className="text-foreground/70 text-sm">
            Identifying potential hazards in the work environment and implementing control measures to mitigate risks
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-4">Hazard Identification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { hazard: "Live Conductors", control: "Implement safe isolation procedures before work" },
                { hazard: "Arc Flash Risk", control: "Use appropriate PPE and maintain safe distances" },
                { hazard: "Working at Height", control: "Use suitable access equipment and fall protection" },
                { hazard: "Confined Spaces", control: "Ensure adequate ventilation and emergency procedures" },
                { hazard: "Manual Handling", control: "Use mechanical aids and proper lifting techniques" },
                { hazard: "Environmental Hazards", control: "Assess weather conditions and site environment" }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                  <h5 className="font-semibold text-foreground mb-2">{item.hazard}</h5>
                  <p className="text-foreground/70 text-sm">{item.control}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-elec-yellow mb-4">Control Measures Hierarchy</h4>
            <div className="space-y-3">
              {[
                { level: "1", measure: "Elimination", example: "Remove the hazard entirely where possible" },
                { level: "2", measure: "Substitution", example: "Replace with less hazardous alternative" },
                { level: "3", measure: "Engineering Controls", example: "Physical barriers, isolation, ventilation" },
                { level: "4", measure: "Administrative Controls", example: "Safe systems of work, permits, training" },
                { level: "5", measure: "PPE", example: "Last line of defence when other controls insufficient" }
              ].map((item) => (
                <div key={item.level} className="flex items-start gap-4 p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                  <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-base font-bold text-elec-yellow flex-shrink-0">
                    {item.level}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground mb-1">{item.measure}</h5>
                    <p className="text-foreground/70 text-sm">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safe Execution */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-xl">Safe Execution and Emergency Procedures</CardTitle>
          <p className="text-foreground/70 text-sm">
            Applying correct procedures when working with electrical systems and being prepared for emergency response
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-4">Safe Working Procedures</h4>
            <div className="space-y-3">
              {[
                {
                  title: "Safe Isolation and Testing",
                  points: [
                    "Follow the complete isolation procedure every time",
                    "Use properly calibrated voltage indicators",
                    "Prove test equipment before and after testing",
                    "Lock off and tag all isolation points"
                  ]
                },
                {
                  title: "Proper Tool Usage",
                  points: [
                    "Use only voltage-rated tools for live work",
                    "Maintain three points of contact when working at height",
                    "Keep tools in good condition and properly stored",
                    "Never bypass or modify safety features"
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                  <h5 className="font-semibold text-foreground mb-3">{section.title}</h5>
                  <ul className="space-y-2">
                    {section.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                        <span className="text-foreground/80 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-elec-yellow mb-4">Emergency Response</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Electric Shock Response",
                  steps: [
                    "Do not touch the casualty if still in contact with electricity",
                    "Turn off power supply if safe to do so",
                    "Call emergency services immediately",
                    "Begin CPR if trained and casualty not breathing"
                  ]
                },
                {
                  title: "Electrical Fire Response",
                  steps: [
                    "Raise the alarm and evacuate if necessary",
                    "Cut power supply if safe to do so",
                    "Use CO2 or dry powder extinguisher only",
                    "Never use water on electrical fires"
                  ]
                }
              ].map((emergency, index) => (
                <div key={index} className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                  <h5 className="font-semibold text-red-400 mb-3">{emergency.title}</h5>
                  <ol className="space-y-2">
                    {emergency.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-red-400 font-semibold">{idx + 1}.</span>
                        <span className="text-foreground/80 text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeWorkingPracticesTab;
