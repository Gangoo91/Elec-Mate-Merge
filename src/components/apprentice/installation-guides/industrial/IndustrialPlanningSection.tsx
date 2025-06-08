
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Factory, 
  ClipboardList, 
  Shield, 
  AlertTriangle,
  Zap,
  Settings,
  HardHat,
  FileCheck
} from "lucide-react";

const IndustrialPlanningSection = () => {
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

  const designConsiderations = [
    {
      category: "Motor Control Systems",
      considerations: [
        "Soft-start requirements for large motors",
        "Variable frequency drive integration",
        "Motor protection and overload settings",
        "Emergency stop circuit design",
        "Control voltage selection (24V/110V/240V)"
      ]
    },
    {
      category: "Hazardous Areas",
      considerations: [
        "ATEX zone classifications (Zone 0, 1, 2)",
        "Temperature class requirements",
        "Gas group classifications",
        "Ingress protection ratings",
        "Explosive atmosphere protection methods"
      ]
    },
    {
      category: "Heavy Machinery",
      considerations: [
        "Load calculations for large motors",
        "Starting current and diversity factors",
        "Mechanical protection requirements",
        "Maintenance access provisions",
        "Lifting and handling considerations"
      ]
    }
  ];

  const complianceRequirements = [
    {
      standard: "ATEX Directive 2014/34/EU",
      description: "Equipment for explosive atmospheres",
      application: "All equipment in classified zones"
    },
    {
      standard: "DSEAR Regulations 2002",
      description: "Dangerous substances and explosive atmospheres",
      application: "Risk assessment and control measures"
    },
    {
      standard: "BS EN 60079 Series",
      description: "Explosive atmospheres protection",
      application: "Equipment selection and installation"
    },
    {
      standard: "BS EN 60204-1",
      description: "Safety of machinery - Electrical equipment",
      application: "Machine control systems"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Planning Phases Timeline */}
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

      {/* Design Considerations */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Critical Design Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Key factors for industrial electrical design</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {designConsiderations.map((item, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h3 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <Factory className="h-4 w-4" />
                {item.category}
              </h3>
              <div className="space-y-2">
                {item.considerations.map((consideration, conIndex) => (
                  <div key={conIndex} className="flex items-start gap-2 text-sm">
                    <Zap className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{consideration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Requirements */}
      <Card className="border-red-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Essential Compliance Standards</CardTitle>
          </div>
          <p className="text-muted-foreground">Mandatory standards for industrial installations</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {complianceRequirements.map((req, index) => (
            <div key={index} className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-red-200 mb-1">{req.standard}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{req.description}</p>
                  <p className="text-xs text-orange-300">Application: {req.application}</p>
                </div>
                <Shield className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Industrial Risk Management</CardTitle>
          </div>
          <p className="text-muted-foreground">Critical safety planning for industrial environments</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h3 className="font-semibold text-orange-300 mb-3">Pre-Installation Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-orange-200">Electrical Hazards</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• High voltage arc flash risk</li>
                  <li>• Live working procedures</li>
                  <li>• Isolation and proving dead</li>
                  <li>• Emergency shutdown systems</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-orange-200">Environmental Hazards</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Explosive atmosphere zones</li>
                  <li>• Chemical exposure risks</li>
                  <li>• Confined space working</li>
                  <li>• Hot work permit requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialPlanningSection;
