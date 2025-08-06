import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Building, 
  Home, 
  Factory, 
  CheckCircle, 
  AlertTriangle,
  PoundSterling,
  Calendar,
  Globe,
  Lightbulb
} from "lucide-react";

const IndustryInsightsAnalysis = () => {
  const isMobile = useIsMobile();

  const industryMetrics = [
    {
      metric: "Market Growth Rate",
      data: "6.8% annually (2024-2029)",
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
      detail: "UK electrical services market expansion above GDP growth"
    },
    {
      metric: "Skills Shortage",
      data: "50,000 additional electricians needed",
      icon: <AlertTriangle className="h-5 w-5 text-elec-yellow" />,
      detail: "Critical shortage driving wage inflation and opportunities"
    },
    {
      metric: "Green Technology Impact",
      data: "£12 billion market by 2030",
      icon: <Zap className="h-5 w-5 text-green-400" />,
      detail: "EV charging, solar PV, and heat pump installations"
    },
    {
      metric: "Average Salary Growth",
      data: "8.2% year-on-year increase",
      icon: <PoundSterling className="h-5 w-5 text-purple-400" />,
      detail: "Outpacing inflation due to skills shortage"
    }
  ];

  const marketTrends = [
    {
      trend: "Renewable Energy Integration",
      timeline: "2024-2030 rapid expansion",
      description: "Massive growth in solar PV, battery storage, and EV charging infrastructure",
      businessOpportunities: [
        "Solar PV installation and maintenance contracts worth £8,000-25,000",
        "EV charging network installation across commercial and domestic sectors",
        "Battery storage system integration for energy independence",
        "Heat pump electrical connections and smart home integration"
      ],
      skillsRequired: [
        "MCS certification for renewable energy installations",
        "DC electrical systems knowledge and safety procedures",
        "Energy management system programming and commissioning",
        "Grid connection procedures and DNO liaison"
      ],
      marketValue: "£12 billion by 2030",
      growthRate: "15-20% annually"
    },
    {
      trend: "Smart Building Technology",
      timeline: "2024-2028 mainstream adoption",
      description: "Integration of IoT, building automation, and intelligent systems",
      businessOpportunities: [
        "Building Management System (BMS) installation and programming",
        "IoT sensor networks and wireless infrastructure deployment",
        "Smart lighting control systems with presence detection",
        "Integrated security and access control system installation"
      ],
      skillsRequired: [
        "BMS programming and commissioning expertise",
        "Network infrastructure and wireless technology knowledge",
        "Protocol understanding (BACnet, Modbus, KNX)",
        "Cybersecurity awareness for connected systems"
      ],
      marketValue: "£4.2 billion by 2028",
      growthRate: "12-15% annually"
    },
    {
      trend: "Retrofit and Energy Efficiency",
      timeline: "2024-2035 government driven",
      description: "Massive retrofit programme for net-zero carbon targets",
      businessOpportunities: [
        "Social housing retrofit programmes worth millions",
        "Commercial building energy efficiency upgrades",
        "LED lighting replacement and smart control installation",
        "Electrical infrastructure upgrades for heat pump installations"
      ],
      skillsRequired: [
        "Energy assessment and survey techniques",
        "Retrofit planning and project management",
        "Fabric-first approach understanding",
        "Government funding scheme knowledge"
      ],
      marketValue: "£8.5 billion retrofit market",
      growthRate: "10-12% annually"
    }
  ];

  const sectorAnalysis = [
    {
      sector: "Domestic Electrical Services",
      marketShare: "45% of total market",
      averageProjectValue: "£500-5,000",
      growthDrivers: [
        "Home improvement boom post-pandemic",
        "Smart home technology adoption",
        "EV charging point installations",
        "Kitchen and bathroom renovations"
      ],
      challenges: [
        "Price-sensitive customers requiring competitive quotes",
        "Seasonal fluctuations in demand",
        "Competition from large national contractors",
        "Managing customer expectations on pricing"
      ],
      opportunities: [
        "Specialise in smart home automation",
        "Offer renewable energy solutions",
        "Develop maintenance contract relationships",
        "Premium service positioning"
      ],
      profitMargins: "35-45% for quality contractors"
    },
    {
      sector: "Commercial & Industrial",
      marketShare: "35% of total market",
      averageProjectValue: "£10,000-100,000+",
      growthDrivers: [
        "Industrial automation and modernisation",
        "Data centre expansion and upgrades",
        "Manufacturing reshoring initiatives",
        "Compliance with updated regulations"
      ],
      challenges: [
        "Long procurement processes and payment terms",
        "Complex tendering and qualification requirements",
        "Higher insurance and bonding requirements",
        "Skilled workforce shortages for specialist work"
      ],
      opportunities: [
        "Develop partnerships with main contractors",
        "Specialise in high-value industrial systems",
        "Offer 24/7 maintenance and emergency services",
        "Focus on process improvement consultancy"
      ],
      profitMargins: "25-35% for established contractors"
    },
    {
      sector: "New Build Construction",
      marketShare: "20% of total market",
      averageProjectValue: "£5,000-25,000 per plot",
      growthDrivers: [
        "Government housing targets and initiatives",
        "Commercial and industrial development",
        "Infrastructure projects and regeneration",
        "Modern Methods of Construction adoption"
      ],
      challenges: [
        "Highly competitive tender processes",
        "Tight margins and cost pressures",
        "Programme-driven schedules with penalties",
        "Material cost volatility and supply chain issues"
      ],
      opportunities: [
        "Develop relationships with house builders",
        "Specialise in off-site construction methods",
        "Offer design and build packages",
        "Focus on high-specification developments"
      ],
      profitMargins: "20-30% depending on project scale"
    }
  ];

  const futureSkillsDemand = [
    {
      category: "Emerging Technologies",
      timeframe: "Next 2-5 years",
      skills: [
        {
          skill: "Electric Vehicle Infrastructure",
          demandLevel: "Critical",
          salaryPremium: "15-25%",
          description: "Installation and maintenance of EV charging networks",
          learningPath: "EV charging courses → Manufacturer certifications → Network installation experience"
        },
        {
          skill: "Energy Storage Systems",
          demandLevel: "High",
          salaryPremium: "20-30%",
          description: "Battery storage installation, commissioning, and maintenance",
          learningPath: "Battery safety training → System design courses → Practical installations"
        },
        {
          skill: "Smart Grid Technology",
          demandLevel: "Emerging",
          salaryPremium: "25-35%",
          description: "Grid integration, demand response, and distributed energy",
          learningPath: "Grid technology courses → DNO engagement → Advanced electrical engineering"
        }
      ]
    },
    {
      category: "Digital Integration",
      timeframe: "Next 1-3 years",
      skills: [
        {
          skill: "IoT and Sensor Networks",
          demandLevel: "High",
          salaryPremium: "15-20%",
          description: "Installation and commissioning of connected building systems",
          learningPath: "IoT fundamentals → Network technology → Building automation systems"
        },
        {
          skill: "Cybersecurity for Electrical Systems",
          demandLevel: "Critical",
          salaryPremium: "20-30%",
          description: "Securing electrical systems and building networks",
          learningPath: "Cybersecurity awareness → Industrial control security → Certification programmes"
        },
        {
          skill: "Data Analytics for Energy Management",
          demandLevel: "Emerging",
          salaryPremium: "25-35%",
          description: "Analysing energy consumption and optimising systems",
          learningPath: "Data analysis training → Energy management systems → Business intelligence tools"
        }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-purple-500/50 bg-purple-500/10">
        <BarChart3 className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-200">
          Industry analysis shows unprecedented opportunities with skills shortage driving 40% faster career progression and salary growth.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {industryMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="market-trends">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-blue-400" />}>
            Key Market Trends & Growth Areas
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{trend.trend}</h4>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {trend.growthRate}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{trend.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Opportunities</h5>
                      <ul className="space-y-1">
                        {trend.businessOpportunities.map((opportunity, oppIndex) => (
                          <li key={oppIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                            {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Required Skills</h5>
                      <ul className="space-y-1">
                        {trend.skillsRequired.map((skill, skillIndex) => (
                          <li key={skillIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Market Value & Timeline</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>
                      {trend.marketValue} - {trend.timeline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="sector-analysis">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-green-400" />}>
            Sector Analysis & Market Opportunities
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {sectorAnalysis.map((sector, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{sector.sector}</h4>
                    <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {sector.marketShare}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Project Value</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{sector.averageProjectValue}</p>
                    </div>
                    <div className="space-y-2">
                      <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Profit Margins</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{sector.profitMargins}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Growth Drivers</h5>
                    <ul className="space-y-1">
                      {sector.growthDrivers.map((driver, driverIndex) => (
                        <li key={driverIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Challenges</h5>
                    <ul className="space-y-1">
                      {sector.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-1`}>
                          <AlertTriangle className="h-3 w-3 text-amber-400 flex-shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Strategic Opportunities</h5>
                    <ul className="space-y-1">
                      {sector.opportunities.map((opportunity, oppIndex) => (
                        <li key={oppIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                          <Lightbulb className="h-3 w-3 text-purple-400 flex-shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="future-skills">
          <MobileAccordionTrigger icon={<Zap className="h-5 w-5 text-purple-400" />}>
            Future Skills Demand & Salary Premiums
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {futureSkillsDemand.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.timeframe}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-purple-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <div className="flex gap-1">
                            <Badge variant="outline" className={`${
                              skill.demandLevel === 'Critical' ? 'text-red-300 border-red-400/30' :
                              skill.demandLevel === 'High' ? 'text-orange-300 border-orange-400/30' :
                              'text-yellow-300 border-yellow-400/30'
                            } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {skill.demandLevel}
                            </Badge>
                            <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              +{skill.salaryPremium}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{skill.learningPath}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-outlook">
          <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-orange-400" />}>
            Industry Outlook & Strategic Recommendations
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="space-y-3">
                <h4 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Strategic Career Positioning</h4>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Immediate Opportunities (2024-2025)</h5>
                    <ul className="space-y-1">
                      {[
                        "Focus on EV charging installation to capture immediate high-demand market",
                        "Develop renewable energy skills for rapidly expanding solar and battery markets",
                        "Specialise in retrofit work for government-funded programmes",
                        "Build smart home automation expertise for affluent domestic market"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-orange-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Medium-term Strategy (2025-2028)</h5>
                    <ul className="space-y-1">
                      {[
                        "Develop digital integration skills as IoT becomes mainstream",
                        "Position for commercial energy management opportunities",
                        "Build expertise in industrial automation and process control",
                        "Consider business ownership or partnership opportunities"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Long-term Vision (2028-2035)</h5>
                    <ul className="space-y-1">
                      {[
                        "Lead on smart grid integration and distributed energy systems",
                        "Specialise in cybersecurity for critical electrical infrastructure",
                        "Develop consultancy services for energy efficiency and sustainability",
                        "Consider executive roles in growing renewable energy companies"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default IndustryInsightsAnalysis;