
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Zap, 
  Building, 
  Home,
  Car,
  BarChart3,
  Users,
  PoundSterling,
  Target,
  Lightbulb
} from "lucide-react";

const IndustryInsights = () => {
  const marketTrends = [
    {
      trend: "Renewable Energy Boom",
      icon: Zap,
      growth: "+35% annually",
      description: "Solar PV and heat pump installations driving massive demand for qualified electricians",
      opportunities: [
        "Solar PV installers earning £35k-£50k+",
        "Heat pump specialists commanding premium rates",
        "Government grants creating sustained demand"
      ],
      skills: ["MCS certification", "G99 grid connection", "Battery storage systems"]
    },
    {
      trend: "Electric Vehicle Infrastructure",
      icon: Car,
      growth: "+28% annually",
      description: "Rapid expansion of EV charging infrastructure across residential and commercial sectors",
      opportunities: [
        "EV charging installers earning £40k-£55k",
        "Commercial rapid charging projects",
        "Fleet charging management systems"
      ],
      skills: ["EV charging installation", "Load management", "Smart charging systems"]
    },
    {
      trend: "Smart Building Technology",
      icon: Building,
      growth: "+22% annually",
      description: "Integration of IoT and automation systems in commercial and residential properties",
      opportunities: [
        "Building automation specialists £45k-£60k",
        "Smart home installation services",
        "Commercial BMS maintenance contracts"
      ],
      skills: ["BMS programming", "IoT integration", "Smart lighting controls"]
    },
    {
      trend: "Data Centre Expansion",
      icon: BarChart3,
      growth: "+18% annually",
      description: "Cloud computing and digitalisation driving data centre construction and upgrades",
      opportunities: [
        "Critical systems engineers £50k-£70k+",
        "UPS and backup power specialists",
        "Ongoing maintenance contracts"
      ],
      skills: ["High voltage systems", "UPS design", "Critical power management"]
    }
  ];

  const salaryProgression = [
    {
      level: "Newly Qualified Electrician",
      experience: "0-2 years",
      salary: "£22k - £28k",
      description: "Recent apprentice completion, basic installation work"
    },
    {
      level: "Experienced Electrician",
      experience: "3-5 years",
      salary: "£28k - £38k",
      description: "Independent working, complex installations, some specialisation"
    },
    {
      level: "Senior Electrician",
      experience: "5-10 years",
      salary: "£35k - £50k",
      description: "Project leadership, mentoring, advanced problem-solving"
    },
    {
      level: "Specialist Electrician",
      experience: "5+ years + certification",
      salary: "£40k - £65k",
      description: "Renewable energy, EV charging, automation specialist"
    },
    {
      level: "Electrical Supervisor/Foreman",
      experience: "8-12 years",
      salary: "£45k - £60k",
      description: "Team management, project oversight, quality control"
    },
    {
      level: "Electrical Engineer",
      experience: "HNC/HND + experience",
      salary: "£50k - £80k+",
      description: "Design, planning, project management, technical leadership"
    }
  ];

  const regionalInsights = [
    {
      region: "London & South East",
      demand: "Very High",
      averageSalary: "£35k - £55k",
      specialisms: ["Commercial fit-outs", "Smart buildings", "Data centres"],
      notes: "Highest pay rates but high living costs. Major infrastructure projects."
    },
    {
      region: "Scotland",
      demand: "High",
      averageSalary: "£30k - £45k",
      specialisms: ["Renewable energy", "Offshore wind", "Industrial"],
      notes: "Strong renewable energy sector. Government green energy initiatives."
    },
    {
      region: "Northern England",
      demand: "High",
      averageSalary: "£28k - £42k",
      specialisms: ["Industrial", "Manufacturing", "Infrastructure"],
      notes: "Manufacturing resurgence. Good work-life balance and lower living costs."
    },
    {
      region: "Midlands",
      demand: "Moderate-High",
      averageSalary: "£26k - £40k",
      specialisms: ["Automotive", "Manufacturing", "Commercial"],
      notes: "Automotive industry hub. Growing electric vehicle manufacturing."
    }
  ];

  const futureSkills = [
    {
      skill: "Digital Systems Integration",
      importance: "Critical",
      description: "Connecting electrical systems with digital networks and IoT devices",
      timeline: "Essential now"
    },
    {
      skill: "Energy Storage Technologies",
      importance: "High",
      description: "Battery systems, grid storage, and energy management",
      timeline: "Next 2-3 years"
    },
    {
      skill: "Cybersecurity Awareness",
      importance: "Growing",
      description: "Understanding security implications of connected electrical systems",
      timeline: "Next 3-5 years"
    },
    {
      skill: "Sustainable Design Principles",
      importance: "Essential",
      description: "Energy efficiency, carbon reduction, and environmental compliance",
      timeline: "Essential now"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Market Trends */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Key Market Trends & Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {marketTrends.map((trend, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    <trend.icon className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{trend.trend}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {trend.growth}
                      </Badge>
                    </div>
                    <p className="text-sm text-elec-light/80">{trend.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-elec-yellow mb-2">Key Opportunities</h4>
                        <ul className="space-y-1">
                          {trend.opportunities.map((opportunity, oppIndex) => (
                            <li key={oppIndex} className="text-xs text-muted-foreground flex items-center gap-1">
                              <Target className="h-3 w-3 text-green-400" />
                              {opportunity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-elec-yellow mb-2">Essential Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {trend.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Progression */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Career & Salary Progression Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salaryProgression.map((level, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{level.level}</h3>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {level.salary}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Experience: {level.experience}</span>
                </div>
                <p className="text-sm text-elec-light/80 mt-2">{level.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Insights */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Regional Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalInsights.map((region, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{region.region}</h3>
                  <Badge variant={region.demand === "Very High" ? "default" : region.demand === "High" ? "secondary" : "outline"}>
                    {region.demand}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Salary:</span>
                    <span className="text-elec-yellow font-medium">{region.averageSalary}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Key Specialisms:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {region.specialisms.map((specialism, specIndex) => (
                        <Badge key={specIndex} variant="outline" className="text-xs">
                          {specialism}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-elec-light/70">{region.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Skills */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Future-Critical Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {futureSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{skill.skill}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={skill.importance === "Critical" ? "destructive" : skill.importance === "High" ? "default" : "secondary"}>
                      {skill.importance}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {skill.timeline}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-elec-light/80">{skill.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryInsights;
