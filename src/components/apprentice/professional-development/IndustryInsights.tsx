
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
  Lightbulb,
  AlertTriangle,
  Clock,
  DollarSign,
  Factory,
  ShieldCheck,
  Brain
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
        "Government grants creating sustained demand",
        "Domestic retrofit market worth £35bn",
        "Commercial solar installations growing 40% annually"
      ],
      skills: ["MCS certification", "G99 grid connection", "Battery storage systems", "Heat pump commissioning", "Energy management systems"]
    },
    {
      trend: "Electric Vehicle Infrastructure",
      icon: Car,
      growth: "+28% annually",
      description: "Rapid expansion of EV charging infrastructure across residential and commercial sectors",
      opportunities: [
        "EV charging installers earning £40k-£55k",
        "Commercial rapid charging projects",
        "Fleet charging management systems",
        "Highway service station upgrades",
        "Workplace charging installations"
      ],
      skills: ["EV charging installation", "Load management", "Smart charging systems", "Three-phase systems", "DNO applications"]
    },
    {
      trend: "Smart Building Technology",
      icon: Building,
      growth: "+22% annually",
      description: "Integration of IoT and automation systems in commercial and residential properties",
      opportunities: [
        "Building automation specialists £45k-£60k",
        "Smart home installation services",
        "Commercial BMS maintenance contracts",
        "Retrofit automation projects",
        "Energy monitoring systems"
      ],
      skills: ["BMS programming", "IoT integration", "Smart lighting controls", "HVAC integration", "Wireless protocols"]
    },
    {
      trend: "Data Centre Expansion",
      icon: BarChart3,
      growth: "+18% annually",
      description: "Cloud computing and digitalisation driving data centre construction and upgrades",
      opportunities: [
        "Critical systems engineers £50k-£70k+",
        "UPS and backup power specialists",
        "Ongoing maintenance contracts",
        "Edge computing facilities",
        "Hyperscale data centre projects"
      ],
      skills: ["High voltage systems", "UPS design", "Critical power management", "Cooling systems", "Monitoring systems"]
    },
    {
      trend: "Industrial Automation & Industry 4.0",
      icon: Building,
      growth: "+25% annually",
      description: "Manufacturing digitalisation creating demand for automation electrical specialists",
      opportunities: [
        "Industrial automation engineers £45k-£65k",
        "PLC programming specialists",
        "Robotics integration projects",
        "Predictive maintenance systems",
        "Factory modernisation contracts"
      ],
      skills: ["PLC programming", "SCADA systems", "Industrial networks", "Safety systems", "Robotics integration"]
    },
    {
      trend: "Grid Modernisation & Smart Grids",
      icon: Zap,
      growth: "+20% annually",
      description: "Electricity network upgrades for renewable integration and smart grid technology",
      opportunities: [
        "Grid connection specialists £40k-£58k",
        "Smart meter installation teams",
        "Substation upgrade projects",
        "Network monitoring systems",
        "Distributed energy resources"
      ],
      skills: ["Grid connection procedures", "Smart metering", "Network protection", "SCADA systems", "Power quality analysis"]
    }
  ];

  const salaryProgression = [
    {
      level: "Newly Qualified Electrician",
      experience: "0-2 years",
      salary: "£22k - £28k",
      description: "Recent apprentice completion, basic installation work, domestic and small commercial projects"
    },
    {
      level: "Experienced Electrician",
      experience: "3-5 years",
      salary: "£28k - £38k",
      description: "Independent working, complex installations, some specialisation, team collaboration"
    },
    {
      level: "Senior Electrician",
      experience: "5-10 years",
      salary: "£35k - £50k",
      description: "Project leadership, mentoring apprentices, advanced problem-solving, quality control"
    },
    {
      level: "Specialist Electrician",
      experience: "5+ years + certification",
      salary: "£40k - £65k",
      description: "Renewable energy, EV charging, automation specialist with premium rates"
    },
    {
      level: "Electrical Supervisor/Foreman",
      experience: "8-12 years",
      salary: "£45k - £60k",
      description: "Team management, project oversight, quality control, client liaison"
    },
    {
      level: "Electrical Engineer",
      experience: "HNC/HND + experience",
      salary: "£50k - £80k+",
      description: "Design, planning, project management, technical leadership, compliance"
    },
    {
      level: "Principal Electrical Engineer",
      experience: "Degree + 10+ years",
      salary: "£65k - £100k+",
      description: "Major project leadership, technical authority, business development, strategic planning"
    },
    {
      level: "Electrical Contractor/Business Owner",
      experience: "10+ years + business skills",
      salary: "£50k - £150k+",
      description: "Business ownership, multiple projects, team management, client relationships"
    }
  ];

  const regionalInsights = [
    {
      region: "London & South East",
      demand: "Very High",
      averageSalary: "£35k - £55k",
      specialisms: ["Commercial fit-outs", "Smart buildings", "Data centres", "High-end residential"],
      notes: "Highest pay rates but high living costs. Major infrastructure projects and corporate headquarters.",
      growth: "+15% annually",
      majorProjects: ["Crossrail electrical systems", "Thames Estuary development", "City office upgrades"]
    },
    {
      region: "Scotland",
      demand: "High",
      averageSalary: "£30k - £45k",
      specialisms: ["Renewable energy", "Offshore wind", "Industrial", "Oil & gas transition"],
      notes: "Strong renewable energy sector. Government green energy initiatives and North Sea wind farms.",
      growth: "+18% annually",
      majorProjects: ["ScotWind offshore projects", "Green hydrogen facilities", "Grid reinforcement"]
    },
    {
      region: "Northern England",
      demand: "High",
      averageSalary: "£28k - £42k",
      specialisms: ["Industrial", "Manufacturing", "Infrastructure", "Nuclear power"],
      notes: "Manufacturing resurgence. Good work-life balance and lower living costs. Nuclear new build.",
      growth: "+12% annually",
      majorProjects: ["Hinkley Point C", "HS2 northern sections", "Gigafactory developments"]
    },
    {
      region: "Midlands",
      demand: "Moderate-High",
      averageSalary: "£26k - £40k",
      specialisms: ["Automotive", "Manufacturing", "Commercial", "Logistics"],
      notes: "Automotive industry hub. Growing electric vehicle manufacturing and battery plants.",
      growth: "+14% annually",
      majorProjects: ["EV battery plants", "Automotive facility conversions", "Distribution centres"]
    },
    {
      region: "Wales",
      demand: "Moderate",
      averageSalary: "£25k - £38k",
      specialisms: ["Industrial", "Renewable energy", "Infrastructure", "Tidal power"],
      notes: "Growing renewable sector. Tidal power developments and industrial modernisation.",
      growth: "+10% annually",
      majorProjects: ["Tidal lagoon projects", "Steel industry modernisation", "Grid connections"]
    },
    {
      region: "South West England",
      demand: "Moderate-High",
      averageSalary: "£27k - £41k",
      specialisms: ["Marine technology", "Aerospace", "Nuclear", "Tourism infrastructure"],
      notes: "Aerospace and marine industries. Nuclear power stations and defence contracts.",
      growth: "+11% annually",
      majorProjects: ["Nuclear facility maintenance", "Airport expansions", "Defence installations"]
    }
  ];

  const futureSkills = [
    {
      skill: "Digital Systems Integration",
      importance: "Critical",
      description: "Connecting electrical systems with digital networks and IoT devices for smart building management",
      timeline: "Essential now",
      salaryImpact: "+£5k-£10k"
    },
    {
      skill: "Energy Storage Technologies",
      importance: "High",
      description: "Battery systems, grid storage, and energy management for renewable integration",
      timeline: "Next 2-3 years",
      salaryImpact: "+£8k-£15k"
    },
    {
      skill: "Cybersecurity Awareness",
      importance: "Growing",
      description: "Understanding security implications of connected electrical systems and OT networks",
      timeline: "Next 3-5 years",
      salaryImpact: "+£3k-£8k"
    },
    {
      skill: "Sustainable Design Principles",
      importance: "Essential",
      description: "Energy efficiency, carbon reduction, and environmental compliance for net-zero targets",
      timeline: "Essential now",
      salaryImpact: "+£5k-£12k"
    },
    {
      skill: "AI and Machine Learning",
      importance: "Emerging",
      description: "Understanding AI applications in electrical systems, predictive maintenance, and energy optimisation",
      timeline: "Next 5-7 years",
      salaryImpact: "+£10k-£20k"
    },
    {
      skill: "Hydrogen Technologies",
      importance: "Future Critical",
      description: "Electrical systems for hydrogen production, storage, and fuel cell technologies",
      timeline: "Next 5-10 years",
      salaryImpact: "+£12k-£25k"
    }
  ];

  const industryAnalysis = [
    {
      sector: "Construction & Infrastructure",
      marketSize: "£180bn annually",
      electricalShare: "15-20%",
      growth: "+8% annually",
      keyDrivers: ["Population growth", "Infrastructure renewal", "Green building standards"],
      challenges: ["Skills shortage", "Material costs", "Regulatory complexity"],
      opportunities: ["Smart buildings", "EV infrastructure", "Renewable integration"]
    },
    {
      sector: "Renewable Energy",
      marketSize: "£25bn annually",
      electricalShare: "60-70%",
      growth: "+35% annually",
      keyDrivers: ["Net zero targets", "Government incentives", "Cost competitiveness"],
      challenges: ["Grid connection delays", "Planning permissions", "Skilled workforce"],
      opportunities: ["Offshore wind", "Energy storage", "Green hydrogen"]
    },
    {
      sector: "Manufacturing",
      marketSize: "£320bn annually",
      electricalShare: "12-15%",
      growth: "+6% annually",
      keyDrivers: ["Automation", "Nearshoring", "Industry 4.0"],
      challenges: ["Global competition", "Energy costs", "Skills gaps"],
      opportunities: ["Smart factories", "Robotics", "Energy efficiency"]
    },
    {
      sector: "Data Centres & Technology",
      marketSize: "£15bn annually",
      electricalShare: "40-50%",
      growth: "+18% annually",
      keyDrivers: ["Cloud computing", "5G networks", "Edge computing"],
      challenges: ["Power demand", "Cooling requirements", "Location constraints"],
      opportunities: ["Edge facilities", "Green data centres", "Liquid cooling"]
    }
  ];

  const skillsGapAnalysis = [
    {
      skill: "Renewable Energy Installation",
      currentDemand: "Very High",
      supply: "Low",
      gap: "Severe",
      trainingTime: "6-12 months",
      certificationCost: "£1,500-£3,000",
      salaryPremium: "+£8k-£15k"
    },
    {
      skill: "EV Charging Infrastructure",
      currentDemand: "High",
      supply: "Low",
      gap: "High",
      trainingTime: "3-6 months",
      certificationCost: "£800-£1,500",
      salaryPremium: "+£5k-£12k"
    },
    {
      skill: "Building Automation",
      currentDemand: "High",
      supply: "Moderate",
      gap: "Moderate",
      trainingTime: "6-18 months",
      certificationCost: "£2,000-£5,000",
      salaryPremium: "+£6k-£18k"
    },
    {
      skill: "High Voltage Systems",
      currentDemand: "Moderate",
      supply: "Low",
      gap: "High",
      trainingTime: "12-24 months",
      certificationCost: "£3,000-£8,000",
      salaryPremium: "+£10k-£25k"
    },
    {
      skill: "Data Centre Infrastructure",
      currentDemand: "High",
      supply: "Very Low",
      gap: "Severe",
      trainingTime: "12-18 months",
      certificationCost: "£4,000-£10,000",
      salaryPremium: "+£12k-£30k"
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
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    <trend.icon className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">{trend.trend}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {trend.growth}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-elec-light/80">{trend.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Key Opportunities</h4>
                    <ul className="space-y-1">
                      {trend.opportunities.map((opportunity, oppIndex) => (
                        <li key={oppIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                          <Target className="h-3 w-3 text-green-400 flex-shrink-0" />
                          <span>{opportunity}</span>
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
                <h3 className="font-semibold text-white text-base">{level.level}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {level.salary}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {level.experience}
                  </Badge>
                </div>
                <p className="text-sm text-elec-light/80">{level.description}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalInsights.map((region, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-white text-base">{region.region}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={region.demand === "Very High" ? "default" : region.demand === "High" ? "secondary" : "outline"}>
                    {region.demand} Demand
                  </Badge>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {region.averageSalary}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {region.growth}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-muted-foreground text-sm">Key Specialisms:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {region.specialisms.map((specialism, specIndex) => (
                        <Badge key={specIndex} variant="outline" className="text-xs">
                          {specialism}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Major Projects:</span>
                    <ul className="text-xs text-elec-light/70 mt-1 space-y-1">
                      {region.majorProjects.map((project, projIndex) => (
                        <li key={projIndex} className="flex items-center gap-2">
                          <Target className="h-2 w-2 text-elec-yellow flex-shrink-0" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
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
                <h3 className="font-semibold text-white text-base">{skill.skill}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={skill.importance === "Critical" ? "destructive" : skill.importance === "High" ? "default" : "secondary"}>
                    {skill.importance}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {skill.timeline}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {skill.salaryImpact}
                  </Badge>
                </div>
                <p className="text-sm text-elec-light/80">{skill.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Sector Analysis */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5 text-elec-yellow" />
            Industry Sector Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryAnalysis.map((sector, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-white text-base">{sector.sector}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {sector.growth}
                  </Badge>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                    {sector.marketSize}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {sector.electricalShare}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-muted-foreground text-xs">Key Drivers:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {sector.keyDrivers.map((driver, driverIndex) => (
                        <Badge key={driverIndex} variant="outline" className="text-xs bg-green-500/10">
                          {driver}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Challenges:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {sector.challenges.map((challenge, challengeIndex) => (
                        <Badge key={challengeIndex} variant="outline" className="text-xs bg-red-500/10">
                          {challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Opportunities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {sector.opportunities.map((opportunity, oppIndex) => (
                        <Badge key={oppIndex} variant="outline" className="text-xs bg-yellow-500/10">
                          {opportunity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Gap Analysis */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Critical Skills Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsGapAnalysis.map((skill, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-white text-base">{skill.skill}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={skill.gap === "Severe" ? "destructive" : skill.gap === "High" ? "default" : "secondary"}>
                    {skill.gap} Gap
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                    {skill.currentDemand} Demand
                  </Badge>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                    {skill.supply} Supply
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {skill.salaryPremium}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Training Time:</span>
                    <div className="font-medium text-blue-400">{skill.trainingTime}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Certification Cost:</span>
                    <div className="font-medium text-purple-400">{skill.certificationCost}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryInsights;
