
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BadgePoundSterling,
  Users,
  Book
} from "lucide-react";

const DomesticOverviewCards = () => {
  const overviewStats = [
    { label: "Average Project Duration", value: "3-5 days", icon: Clock },
    { label: "Typical Budget Range", value: "£2,000-£8,000", icon: BadgePoundSterling },
    { label: "Skill Level Required", value: "Intermediate", icon: Users },
    { label: "Certification Required", value: "Part P", icon: Book }
  ];

  const projectComplexity = [
    { type: "Socket Addition", complexity: 20, duration: "2-4 hours", cost: "£150-£300" },
    { type: "Kitchen Rewire", complexity: 60, duration: "2-3 days", cost: "£1,500-£3,000" },
    { type: "Consumer Unit Upgrade", complexity: 40, duration: "4-6 hours", cost: "£400-£800" },
    { type: "Full House Rewire", complexity: 90, duration: "5-10 days", cost: "£4,000-£12,000" }
  ];

  const safetyPriorities = [
    { priority: "Safe Isolation", description: "Always isolate and test before work", level: "Critical" },
    { priority: "RCD Protection", description: "30mA RCD required for all circuits", level: "Essential" },
    { priority: "Part P Compliance", description: "Building Regulations notification required", level: "Legal" },
    { priority: "Testing & Certification", description: "Proper testing and certification mandatory", level: "Essential" }
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

      {/* Project Complexity Guide */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Project Complexity Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectComplexity.map((project, index) => (
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

      {/* Safety Priorities */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Safety Priorities</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {safetyPriorities.map((safety, index) => (
            <div key={index} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-orange-200 mb-1">{safety.priority}</h4>
                  <p className="text-sm text-muted-foreground">{safety.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    safety.level === 'Critical' ? 'border-red-500 text-red-400' :
                    safety.level === 'Legal' ? 'border-purple-500 text-purple-400' :
                    'border-orange-500 text-orange-400'
                  }`}
                >
                  {safety.level}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Getting Started Checklist */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Before You Start Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Obtain necessary permits and notifications",
            "Complete thorough site survey and risk assessment",
            "Ensure proper PPE and safety equipment available",
            "Confirm main switch isolation and testing equipment",
            "Check cable routes and access requirements",
            "Plan waste disposal and material deliveries"
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

export default DomesticOverviewCards;
