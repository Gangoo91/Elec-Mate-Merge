
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  ClipboardList, 
  Shield, 
  AlertTriangle,
  Cloud,
  Zap,
  Settings,
  HardHat,
  Eye
} from "lucide-react";

const OutdoorPlanningSection = () => {
  const planningPhases = [
    {
      phase: "Site Survey & Assessment",
      duration: "3-5 days",
      tasks: [
        "Detailed site survey and topographical assessment",
        "Underground services location (CAT scanning)",
        "Environmental impact assessment",
        "Access route planning for vehicles and equipment",
        "Existing lighting audit and condition survey"
      ]
    },
    {
      phase: "Design & Specification",
      duration: "1-2 weeks", 
      tasks: [
        "Lighting design calculations (lux levels, uniformity)",
        "Cable route planning and sizing calculations",
        "Foundation design for wind loading",
        "Equipment specification with appropriate IP ratings",
        "Earthing and bonding system design"
      ]
    },
    {
      phase: "Permits & Approvals",
      duration: "2-4 weeks",
      tasks: [
        "Street works licence applications",
        "Traffic management order applications",
        "Planning permission (where required)",
        "Utility company notifications and permits",
        "Environmental agency consultations"
      ]
    },
    {
      phase: "Installation Preparation",
      duration: "1 week",
      tasks: [
        "Material delivery coordination",
        "Plant and equipment hire arrangements",
        "Traffic management setup",
        "Site compound establishment",
        "Health and safety briefings"
      ]
    }
  ];

  const designConsiderations = [
    {
      category: "Illumination Requirements",
      considerations: [
        "BS 5489 road lighting standards compliance",
        "Lux level calculations for specific applications",
        "Uniformity ratios and glare limitation",
        "Environmental zone classifications (E1-E4)",
        "Maintenance factor planning (0.7-0.8 typical)"
      ]
    },
    {
      category: "Structural Design",
      considerations: [
        "Wind loading calculations (BS EN 40 standards)",
        "Foundation design for soil conditions",
        "Column height and spacing optimisation",
        "Maintenance access requirements",
        "Vandal resistance considerations"
      ]
    },
    {
      category: "Cable Installation",
      considerations: [
        "Underground cable route planning",
        "Minimum burial depths (450mm roads, 600mm footways)",
        "Cable protection and warning tape installation",
        "Joint bay and chamber locations",
        "Spare capacity for future expansion"
      ]
    }
  ];

  const environmentalFactors = [
    {
      factor: "Coastal Environments",
      challenges: [
        "Salt spray corrosion effects",
        "Higher wind loading requirements",
        "Marine-grade material specifications",
        "Enhanced earthing requirements"
      ],
      solutions: [
        "Stainless steel or galvanised components",
        "Regular maintenance schedules",
        "Protective coatings and sealants",
        "Sacrificial anode systems"
      ]
    },
    {
      factor: "Urban Environments",
      challenges: [
        "Congested underground services",
        "Traffic management complexity",
        "Noise and dust restrictions",
        "Limited working space"
      ],
      solutions: [
        "Detailed service location surveys",
        "Phased installation approaches",
        "Quiet working methods",
        "Compact equipment selection"
      ]
    },
    {
      factor: "Rural Environments",
      challenges: [
        "Limited grid connection points",
        "Agricultural land considerations",
        "Wildlife protection requirements",
        "Access route limitations"
      ],
      solutions: [
        "Alternative energy sources consideration",
        "Seasonal working restrictions",
        "Environmental impact assessments",
        "Temporary access road construction"
      ]
    }
  ];

  const regulatoryRequirements = [
    {
      authority: "Local Highway Authority",
      requirements: [
        "Street works licence (Section 50 NRSWA)",
        "Traffic management approval",
        "Permanent works approval",
        "Commuted sum payments"
      ]
    },
    {
      authority: "Utility Companies",
      requirements: [
        "Plant protection agreements",
        "Safe digging practices compliance",
        "Service diversions coordination",
        "Emergency contact procedures"
      ]
    },
    {
      authority: "Environmental Agency",
      requirements: [
        "Watercourse crossing permits",
        "Contaminated land assessments",
        "Wildlife habitat protection",
        "Noise and dust control measures"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Planning Phases Timeline */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Outdoor Installation Planning Phases</CardTitle>
          </div>
          <p className="text-muted-foreground">Systematic approach to outdoor electrical projects</p>
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
            <Eye className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Critical Design Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Key factors for outdoor electrical design</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {designConsiderations.map((item, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h3 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4" />
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

      {/* Environmental Factors */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Environmental Adaptation Strategies</CardTitle>
          </div>
          <p className="text-muted-foreground">Location-specific planning considerations</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {environmentalFactors.map((env, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h3 className="font-semibold text-green-300 mb-3">{env.factor}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-200 mb-2">Challenges</h4>
                  <div className="space-y-1">
                    {env.challenges.map((challenge, cIndex) => (
                      <div key={cIndex} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-orange-400 flex-shrink-0" />
                        <span className="text-muted-foreground">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-200 mb-2">Solutions</h4>
                  <div className="space-y-1">
                    {env.solutions.map((solution, sIndex) => (
                      <div key={sIndex} className="flex items-center gap-2 text-sm">
                        <Shield className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <span className="text-muted-foreground">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Regulatory Requirements */}
      <Card className="border-red-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Regulatory Compliance Requirements</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential approvals and permits for outdoor installations</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {regulatoryRequirements.map((reg, index) => (
            <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h3 className="font-semibold text-red-300 mb-3">{reg.authority}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {reg.requirements.map((requirement, reqIndex) => (
                  <div key={reqIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OutdoorPlanningSection;
