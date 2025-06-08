
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from "lucide-react";

const IndustrialPlanningPhases = () => {
  const planningPhases = [
    {
      phase: "Initial Assessment & Documentation",
      duration: "1-2 weeks",
      tasks: [
        "ATEX zone classification review",
        "Existing installation condition survey",
        "Load analysis and diversity calculations",
        "Coordination with production schedules",
        "HSE notification and permit applications"
      ]
    },
    {
      phase: "Design & Specification",
      duration: "2-3 weeks", 
      tasks: [
        "Motor control system design",
        "Cable tray and containment routing",
        "Emergency stop system integration",
        "ATEX certified equipment specification",
        "Arc flash risk assessment"
      ]
    },
    {
      phase: "Procurement & Preparation",
      duration: "3-4 weeks",
      tasks: [
        "ATEX certified equipment procurement",
        "Specialist tooling and lifting equipment",
        "Coordination with plant shutdown schedules",
        "Method statements and risk assessments",
        "Competent person assignments"
      ]
    }
  ];

  return (
    <Card className="border-blue-500/30 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-blue-400" />
          <CardTitle className="text-blue-300">Industrial Project Planning Phases</CardTitle>
        </div>
        <p className="text-muted-foreground">Structured approach to complex industrial installations</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {planningPhases.map((phase, index) => (
          <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-300">Phase {index + 1}: {phase.phase}</h3>
              <Badge variant="outline" className="border-blue-400 text-blue-300">
                {phase.duration}
              </Badge>
            </div>
            <div className="space-y-2">
              {phase.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IndustrialPlanningPhases;
