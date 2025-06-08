
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Factory, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BadgePoundSterling,
  Users,
  Book,
  Wrench,
  HardHat
} from "lucide-react";

const IndustrialOverviewCards = () => {
  const overviewStats = [
    { label: "Average Project Duration", value: "2-8 weeks", icon: Clock },
    { label: "Typical Budget Range", value: "£20,000-£200,000", icon: BadgePoundSterling },
    { label: "Skill Level Required", value: "Expert", icon: Users },
    { label: "Certifications Required", value: "CompEx + IECEx", icon: Book }
  ];

  const projectTypes = [
    { type: "Manufacturing Plant", complexity: 95, duration: "4-8 weeks", cost: "£50,000-£200,000" },
    { type: "Motor Control Systems", complexity: 85, duration: "2-4 weeks", cost: "£20,000-£80,000" },
    { type: "High Bay Lighting", complexity: 70, duration: "1-3 weeks", cost: "£15,000-£50,000" },
    { type: "Heavy Machinery Installation", complexity: 90, duration: "3-6 weeks", cost: "£40,000-£150,000" }
  ];

  const safetyRequirements = [
    { requirement: "ATEX Compliance", description: "Explosive atmosphere protection required", level: "Critical" },
    { requirement: "DSEAR Regulations", description: "Dangerous substances and explosive atmospheres", level: "Legal" },
    { requirement: "PUWER Compliance", description: "Provision and use of work equipment regulations", level: "Legal" },
    { requirement: "Arc Flash Protection", description: "High voltage arc flash risk assessment", level: "Critical" }
  ];

  const hazardCategories = [
    { hazard: "High Voltage Systems", risk: "Critical", mitigation: "Authorised person supervision required" },
    { hazard: "Explosive Atmospheres", risk: "Critical", mitigation: "ATEX certified equipment only" },
    { hazard: "Heavy Machinery", risk: "High", mitigation: "Lock-out/tag-out procedures" },
    { hazard: "Chemical Exposure", risk: "Medium", mitigation: "Appropriate PPE and ventilation" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/30 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-4 w-4 text-elec-yellow" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Types Guide */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Industrial Project Types</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectTypes.map((project, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
                <h4 className="font-medium text-white">{project.type}</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                    {project.duration}
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    {project.cost}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Complexity Level</span>
                  <span className="text-blue-300">{project.complexity}%</span>
                </div>
                <Progress value={project.complexity} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Safety Requirements */}
      <Card className="border-red-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Critical Safety Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {safetyRequirements.map((req, index) => (
            <div key={index} className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-red-200 mb-1">{req.requirement}</h4>
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    req.level === 'Critical' ? 'border-red-500 text-red-400' :
                    'border-purple-500 text-purple-400'
                  }`}
                >
                  {req.level}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hazard Assessment */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Hazard Categories & Risk Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {hazardCategories.map((hazard, index) => (
            <div key={index} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-medium text-orange-200">{hazard.hazard}</h4>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    hazard.risk === 'Critical' ? 'border-red-500 text-red-400' :
                    hazard.risk === 'High' ? 'border-orange-500 text-orange-400' :
                    'border-yellow-500 text-yellow-400'
                  }`}
                >
                  {hazard.risk} Risk
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{hazard.mitigation}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pre-Project Checklist */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Industrial Project Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Obtain ATEX zone classification documentation",
            "Complete comprehensive hazard and risk assessment",
            "Ensure all personnel have appropriate industrial qualifications",
            "Coordinate with production scheduling to minimise downtime",
            "Verify all equipment has appropriate IP and ATEX ratings",
            "Plan isolation procedures for live industrial systems",
            "Arrange specialist lifting equipment for heavy machinery",
            "Prepare emergency shutdown and evacuation procedures",
            "Coordinate with HSE and insurance requirements",
            "Plan for specialist testing equipment and procedures"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialOverviewCards;
