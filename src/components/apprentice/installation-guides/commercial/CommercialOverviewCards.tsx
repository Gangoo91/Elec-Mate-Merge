
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BadgePoundSterling,
  Users,
  Book,
  FileCheck
} from "lucide-react";

const CommercialOverviewCards = () => {
  const overviewStats = [
    { label: "Average Project Duration", value: "1-4 weeks", icon: Clock },
    { label: "Typical Budget Range", value: "£5,000-£50,000", icon: BadgePoundSterling },
    { label: "Skill Level Required", value: "Advanced", icon: Users },
    { label: "Certificates Required", value: "EIC + EICR", icon: Book }
  ];

  const projectTypes = [
    { type: "Office Fit-out", complexity: 70, duration: "1-2 weeks", cost: "£8,000-£25,000" },
    { type: "Retail Shop", complexity: 60, duration: "5-10 days", cost: "£5,000-£15,000" },
    { type: "Restaurant/Kitchen", complexity: 80, duration: "1-3 weeks", cost: "£10,000-£35,000" },
    { type: "Small Warehouse", complexity: 85, duration: "2-4 weeks", cost: "£15,000-£50,000" }
  ];

  const complianceRequirements = [
    { requirement: "Building Regulations", description: "Part P notification and compliance", level: "Legal" },
    { requirement: "Fire Safety", description: "Emergency lighting and fire alarm systems", level: "Critical" },
    { requirement: "Three-Phase Design", description: "Balanced loads and proper phase rotation", level: "Essential" },
    { requirement: "Workplace Regulations", description: "Health and safety in commercial premises", level: "Legal" }
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
            <Building className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Commercial Project Types</CardTitle>
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

      {/* Compliance Requirements */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Compliance Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {complianceRequirements.map((req, index) => (
            <div key={index} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-orange-200 mb-1">{req.requirement}</h4>
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    req.level === 'Critical' ? 'border-red-500 text-red-400' :
                    req.level === 'Legal' ? 'border-purple-500 text-purple-400' :
                    'border-orange-500 text-orange-400'
                  }`}
                >
                  {req.level}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pre-Project Checklist */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Commercial Project Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Coordinate with building management and other trades",
            "Obtain all necessary permits and Building Control approval",
            "Complete detailed site survey including services coordination",
            "Design emergency lighting and fire alarm systems",
            "Calculate three-phase loads and diversity factors",
            "Plan installation phases to minimise business disruption",
            "Arrange inspection schedules with Building Control",
            "Prepare comprehensive testing and commissioning plan"
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

export default CommercialOverviewCards;
