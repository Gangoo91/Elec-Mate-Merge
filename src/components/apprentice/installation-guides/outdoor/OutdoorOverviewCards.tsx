
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BadgePoundSterling,
  Users,
  Book,
  Cloud,
  Sun,
  Snowflake
} from "lucide-react";

const OutdoorOverviewCards = () => {
  const overviewStats = [
    { label: "Average Project Duration", value: "1-3 weeks", icon: Clock },
    { label: "Typical Budget Range", value: "£8,000-£60,000", icon: BadgePoundSterling },
    { label: "Skill Level Required", value: "Advanced", icon: Users },
    { label: "IP Rating Required", value: "IP65/IP66", icon: Book }
  ];

  const projectTypes = [
    { type: "Street Lighting System", complexity: 80, duration: "2-3 weeks", cost: "£15,000-£50,000" },
    { type: "Car Park Lighting", complexity: 65, duration: "1-2 weeks", cost: "£8,000-£25,000" },
    { type: "Underground Cabling", complexity: 85, duration: "1-3 weeks", cost: "£12,000-£40,000" },
    { type: "External Power Supplies", complexity: 70, duration: "1-2 weeks", cost: "£10,000-£30,000" }
  ];

  const weatherFactors = [
    { factor: "Wind Loading", impact: "High", consideration: "Column design and foundation requirements" },
    { factor: "UV Degradation", impact: "Medium", consideration: "UV-resistant cable and enclosure materials" },
    { factor: "Temperature Range", impact: "High", consideration: "-20°C to +70°C operational range" },
    { factor: "Moisture Ingress", impact: "Critical", consideration: "IP65+ rating and proper sealing" },
    { factor: "Lightning Risk", impact: "High", consideration: "Surge protection and earthing systems" },
    { factor: "Salt Corrosion", impact: "Medium", consideration: "Marine-grade materials in coastal areas" }
  ];

  const installationChallenges = [
    { challenge: "Excavation Permits", description: "Coordination with utilities and local authorities", solution: "CAT scanning and permit applications" },
    { challenge: "Traffic Management", description: "Road closures and safety barriers", solution: "Traffic management plans and signage" },
    { challenge: "Underground Services", description: "Existing gas, water, telecoms cables", solution: "Service location and safe digging practices" },
    { challenge: "Access Equipment", description: "Height access for lighting columns", solution: "MEWP hire and certified operators" }
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
            <MapPin className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Outdoor Installation Types</CardTitle>
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

      {/* Weather & Environmental Factors */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Environmental Considerations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {weatherFactors.map((weather, index) => (
            <div key={index} className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-purple-200 mb-1">{weather.factor}</h4>
                  <p className="text-sm text-muted-foreground">{weather.consideration}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    weather.impact === 'Critical' ? 'border-red-500 text-red-400' :
                    weather.impact === 'High' ? 'border-orange-500 text-orange-400' :
                    'border-yellow-500 text-yellow-400'
                  }`}
                >
                  {weather.impact}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Installation Challenges */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Common Installation Challenges</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {installationChallenges.map((challenge, index) => (
            <div key={index} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <h4 className="font-medium text-orange-200 mb-1">{challenge.challenge}</h4>
              <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-orange-300 font-medium">Solution:</span>
                <span className="text-xs text-green-400">{challenge.solution}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Seasonal Considerations */}
      <Card className="border-cyan-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">Seasonal Installation Planning</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
              <h4 className="font-medium text-cyan-200 mb-2 flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Summer Installation (May-September)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Optimal working conditions</li>
                <li>• Extended daylight hours</li>
                <li>• Ground conditions suitable for excavation</li>
                <li>• Higher demand for outdoor lighting projects</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-blue-200 mb-2 flex items-center gap-2">
                <Snowflake className="h-4 w-4" />
                Winter Installation (October-April)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Weather-dependent scheduling</li>
                <li>• Frozen ground complications</li>
                <li>• Reduced working hours</li>
                <li>• Emergency lighting repairs priority</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Installation Checklist */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Outdoor Installation Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Obtain street works licences and traffic management permits",
            "Complete CAT scanning for underground services location",
            "Check weather forecast and plan for adverse conditions",
            "Ensure all equipment has appropriate IP ratings (IP65/IP66)",
            "Arrange specialist access equipment (MEWP, trenching equipment)",
            "Coordinate with local authorities and utility companies",
            "Plan cable routes avoiding existing underground services",
            "Prepare emergency procedures for adverse weather conditions",
            "Verify foundation designs for wind loading requirements",
            "Arrange materials delivery and secure storage on site"
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

export default OutdoorOverviewCards;
