
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sun,
  Car,
  Waves,
  Zap,
  Shield,
  Award,
  TrendingUp,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Building2,
  GraduationCap,
  BadgePoundSterling,
  Clock,
  Target,
  Lightbulb,
  FileCheck,
  Globe
} from "lucide-react";

const SpecialistOverviewCards = () => {
  const specialLocations = {
    title: "What are Special Locations? (BS 7671 Part 7)",
    description: "BS 7671 Part 7 covers installations in locations where the risk of electric shock is increased due to environmental conditions, reduced body resistance, or the presence of water.",
    sections: [
      { section: "701", title: "Locations containing a bath or shower", color: "cyan" },
      { section: "702", title: "Swimming pools and fountains", color: "blue" },
      { section: "703", title: "Rooms containing sauna heaters", color: "orange" },
      { section: "704", title: "Construction and demolition site installations", color: "amber" },
      { section: "705", title: "Agricultural and horticultural premises", color: "green" },
      { section: "706", title: "Conducting locations with restricted movement", color: "red" },
      { section: "708", title: "Electrical installations in caravan/camping parks", color: "emerald" },
      { section: "709", title: "Marinas and similar locations", color: "teal" },
      { section: "711", title: "Exhibitions, shows and stands", color: "purple" },
      { section: "712", title: "Solar photovoltaic (PV) power supply systems", color: "yellow" },
      { section: "717", title: "Mobile or transportable units", color: "indigo" },
      { section: "722", title: "Electric vehicle charging installations", color: "lime" }
    ]
  };

  const whyAdditionalRequirements = [
    {
      factor: "Increased Risk of Electric Shock",
      description: "Wet conditions, reduced skin resistance, and close contact with earth increase shock hazards",
      icon: Zap,
      color: "red"
    },
    {
      factor: "Environmental Conditions",
      description: "Water, chemicals, dust, and extreme temperatures require enhanced protection",
      icon: Globe,
      color: "blue"
    },
    {
      factor: "User Vulnerability",
      description: "Reduced ability to react (swimmers, children) or restricted movement increases risk",
      icon: Shield,
      color: "orange"
    },
    {
      factor: "Equipment Exposure",
      description: "Equipment may be subject to mechanical damage, moisture ingress, or corrosion",
      icon: AlertTriangle,
      color: "amber"
    }
  ];

  const careerOpportunities = [
    {
      specialisation: "Solar PV Installer",
      demand: 95,
      avgSalary: "£32,000 - £45,000",
      growth: "Very High",
      certifications: ["MCS", "NAPIT", "NICEIC"],
      description: "Design, install, and maintain solar photovoltaic systems for domestic and commercial properties"
    },
    {
      specialisation: "EV Charger Installer",
      demand: 90,
      avgSalary: "£30,000 - £42,000",
      growth: "Very High",
      certifications: ["OZEV Approved", "NAPIT", "NICEIC"],
      description: "Install electric vehicle charging points in homes, workplaces, and public locations"
    },
    {
      specialisation: "Battery Storage Specialist",
      demand: 85,
      avgSalary: "£35,000 - £50,000",
      growth: "High",
      certifications: ["MCS", "Battery Storage Training"],
      description: "Design and install battery energy storage systems alongside solar PV installations"
    },
    {
      specialisation: "Swimming Pool & Spa Electrician",
      demand: 60,
      avgSalary: "£28,000 - £38,000",
      growth: "Moderate",
      certifications: ["NICEIC", "Specialist Training"],
      description: "Install and maintain electrical systems for pools, spas, and leisure facilities"
    },
    {
      specialisation: "Heat Pump Installer",
      demand: 88,
      avgSalary: "£32,000 - £48,000",
      growth: "Very High",
      certifications: ["MCS", "Heat Pump Training"],
      description: "Install air source and ground source heat pumps for domestic and commercial heating"
    },
    {
      specialisation: "Smart Home Specialist",
      demand: 75,
      avgSalary: "£30,000 - £45,000",
      growth: "High",
      certifications: ["KNX", "Crestron", "Control4"],
      description: "Design and install smart home automation and control systems"
    }
  ];

  const certificationRequirements = [
    {
      name: "MCS (Microgeneration Certification Scheme)",
      icon: Award,
      color: "green",
      purpose: "Required for solar PV, battery storage, and heat pump installations to access government incentives",
      requirements: [
        "Full Scope Electrical Competent Person registration (NAPIT, NICEIC, etc.)",
        "Specific training for technology type (PV, battery, heat pump)",
        "Demonstrated competence through assessment",
        "Annual surveillance visits and renewal",
        "Insurance requirements (PI and PL)"
      ],
      benefits: [
        "Customers can access Smart Export Guarantee (SEG)",
        "Access to Boiler Upgrade Scheme (heat pumps)",
        "Enhanced credibility and marketability",
        "Listed on MCS Certified database"
      ]
    },
    {
      name: "OZEV (Office for Zero Emission Vehicles)",
      icon: Car,
      color: "blue",
      purpose: "Approval required to install EV chargers under government grant schemes",
      requirements: [
        "Competent Person Scheme membership",
        "Completion of OZEV-approved training course",
        "Understanding of EV charging regulations",
        "Compliance with BS 7671 Section 722",
        "Appropriate insurance coverage"
      ],
      benefits: [
        "Access to government EV charging grants",
        "Workplace Charging Scheme installations",
        "Electric Vehicle Homecharge Scheme (EVHS) - if reinstated",
        "Competitive advantage in growing market"
      ]
    },
    {
      name: "NAPIT / NICEIC / ELECSA",
      icon: FileCheck,
      color: "purple",
      purpose: "Competent Person Schemes for self-certification of electrical work",
      requirements: [
        "NVQ Level 3 or equivalent qualification",
        "Demonstrated competence in electrical installation",
        "BS 7671 examination pass",
        "Assessment of practical work",
        "Ongoing CPD requirements"
      ],
      benefits: [
        "Self-certification for Building Regulations",
        "Access to specialist certifications (MCS, OZEV)",
        "Industry recognition and trust",
        "Technical support and resources"
      ]
    },
    {
      name: "G99 DNO Application Training",
      icon: Building2,
      color: "amber",
      purpose: "Required for larger solar PV and battery installations requiring DNO approval",
      requirements: [
        "Understanding of G98/G99 application process",
        "Knowledge of DNO requirements and timescales",
        "System design for grid compliance",
        "Protection settings and commissioning"
      ],
      benefits: [
        "Ability to handle larger installations (>3.68kW per phase)",
        "Commercial PV project capability",
        "Battery storage integration expertise",
        "Premium project opportunities"
      ]
    }
  ];

  const gettingStarted = [
    {
      step: 1,
      title: "Complete Core Qualification",
      description: "Obtain NVQ Level 3 in Electrical Installation or equivalent",
      duration: "3-4 years (apprenticeship)"
    },
    {
      step: 2,
      title: "Join Competent Person Scheme",
      description: "Register with NAPIT, NICEIC, ELECSA or similar",
      duration: "2-3 months application"
    },
    {
      step: 3,
      title: "Choose Specialisation",
      description: "Select area of interest: Solar PV, EV, Heat Pumps, etc.",
      duration: "Research and planning"
    },
    {
      step: 4,
      title: "Complete Specialist Training",
      description: "Attend manufacturer and scheme-specific training courses",
      duration: "2-5 days per course"
    },
    {
      step: 5,
      title: "Gain Certification",
      description: "Apply for MCS, OZEV approval or other specialist certifications",
      duration: "1-3 months"
    },
    {
      step: 6,
      title: "Build Experience",
      description: "Work alongside experienced installers, build portfolio",
      duration: "Ongoing development"
    }
  ];

  const marketTrends = [
    { trend: "Net Zero by 2050", impact: "Massive increase in renewable installations", icon: Target },
    { trend: "EV Adoption", impact: "2030 petrol/diesel ban drives EV charger demand", icon: Car },
    { trend: "Heat Pump Rollout", impact: "Gas boiler phase-out increases heat pump installations", icon: Zap },
    { trend: "Energy Storage", impact: "Grid flexibility needs drive battery installations", icon: Lightbulb },
    { trend: "Building Regulations", impact: "New builds require EV charging and solar-ready infrastructure", icon: Building2 }
  ];

  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case "Very High": return "border-green-500 text-green-400";
      case "High": return "border-lime-500 text-lime-400";
      case "Moderate": return "border-yellow-500 text-yellow-400";
      default: return "border-white/50 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction to Special Locations */}
      <Card className="border-yellow-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">{specialLocations.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90">{specialLocations.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {specialLocations.sections.map((section, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border bg-${section.color}-500/10 border-${section.color}-500/30`}
              >
                <Badge variant="outline" className={`text-xs mb-2 border-${section.color}-400 text-${section.color}-300`}>
                  Section {section.section}
                </Badge>
                <p className="text-xs text-white/90">{section.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Why Additional Requirements */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Why Additional Requirements Exist</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyAdditionalRequirements.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border bg-${item.color}-500/10 border-${item.color}-500/30`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                  <h4 className={`font-medium text-${item.color}-200`}>{item.factor}</h4>
                </div>
                <p className="text-sm text-white/80">{item.description}</p>
              </div>
            ))}
          </div>

          <Alert className="border-orange-500/50 bg-orange-500/10">
            <Shield className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-200 text-sm">
              <strong>Key Principle:</strong> Special locations require reduced touch voltages, enhanced RCD protection,
              specific IP ratings, and often SELV (Safety Extra Low Voltage) systems to protect users from electric shock.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card className="border-green-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Career Opportunities in Specialist Installations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500/50 bg-green-500/10">
            <Lightbulb className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-sm">
              The UK's commitment to Net Zero by 2050 is creating unprecedented demand for electricians with specialist skills
              in renewable energy, electric vehicles, and low-carbon heating technologies.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {careerOpportunities.map((career, idx) => (
              <div key={idx} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-medium text-white text-lg">{career.specialisation}</h4>
                    <p className="text-sm text-white/80 mt-1">{career.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getGrowthColor(career.growth)}>
                      {career.growth} Growth
                    </Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      <BadgePoundSterling className="h-3 w-3 mr-1" />
                      {career.avgSalary}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Industry Demand</span>
                    <span className="text-green-300">{career.demand}%</span>
                  </div>
                  <Progress value={career.demand} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white">Required Certifications:</span>
                  {career.certifications.map((cert, certIdx) => (
                    <Badge key={certIdx} variant="secondary" className="text-xs bg-green-600/20 text-green-200">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Industry Trends Driving Demand</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketTrends.map((trend, idx) => (
              <div key={idx} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <trend.icon className="h-5 w-5 text-blue-400" />
                  <h4 className="font-medium text-blue-200">{trend.trend}</h4>
                </div>
                <p className="text-sm text-white/80">{trend.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Requirements */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Key Certifications & Schemes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificationRequirements.map((cert, idx) => (
            <div key={idx} className={`p-4 rounded-lg border bg-${cert.color}-500/10 border-${cert.color}-500/30`}>
              <div className="flex items-center gap-2 mb-3">
                <cert.icon className={`h-6 w-6 text-${cert.color}-400`} />
                <h4 className="font-medium text-white text-lg">{cert.name}</h4>
              </div>

              <p className={`text-sm text-${cert.color}-200 mb-4`}>{cert.purpose}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white text-sm mb-2">Requirements</h5>
                  <ul className="space-y-1">
                    {cert.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="text-xs text-white/80 flex items-start gap-2">
                        <CheckCircle className={`h-3 w-3 text-${cert.color}-400 mt-0.5 flex-shrink-0`} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white text-sm mb-2">Benefits</h5>
                  <ul className="space-y-1">
                    {cert.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx} className="text-xs text-white/80 flex items-start gap-2">
                        <TrendingUp className={`h-3 w-3 text-${cert.color}-400 mt-0.5 flex-shrink-0`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Getting Started Roadmap */}
      <Card className="border-cyan-500/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">Your Path to Specialisation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gettingStarted.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 pb-4 border-b border-cyan-500/20 last:border-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h4 className="font-medium text-white">{step.title}</h4>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-300 text-xs w-fit">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/80 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specialist Installation Areas Quick Links */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Explore Specialist Installation Guides</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-colors">
              <Sun className="h-10 w-10 text-yellow-400 mb-3" />
              <h4 className="font-medium text-yellow-200 text-lg mb-2">Solar PV Systems</h4>
              <p className="text-sm text-white/80 mb-3">
                Learn about DC generation, inverters, MCS certification, and G98/G99 grid connection requirements.
              </p>
              <Badge variant="outline" className="border-yellow-400 text-yellow-300">
                BS 7671 Section 712
              </Badge>
            </div>

            <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30 hover:border-green-500/50 transition-colors">
              <Car className="h-10 w-10 text-green-400 mb-3" />
              <h4 className="font-medium text-green-200 text-lg mb-2">EV Charging</h4>
              <p className="text-sm text-white/80 mb-3">
                Master charging modes, protection requirements, O-PEN devices, and OZEV grant installations.
              </p>
              <Badge variant="outline" className="border-green-400 text-green-300">
                BS 7671 Section 722
              </Badge>
            </div>

            <div className="bg-cyan-500/10 p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
              <Waves className="h-10 w-10 text-cyan-400 mb-3" />
              <h4 className="font-medium text-cyan-200 text-lg mb-2">Swimming Pools</h4>
              <p className="text-sm text-white/80 mb-3">
                Understand zone definitions, IP ratings, SELV requirements, and supplementary bonding.
              </p>
              <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                BS 7671 Section 702
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <AlertDescription className="text-amber-200">
          <strong className="text-amber-300">Important:</strong> Specialist installations require additional training and
          certification beyond standard electrical qualifications. Always ensure you have the correct competencies,
          insurance, and scheme memberships before undertaking specialist work. Working outside your competence can
          result in unsafe installations, invalidated insurance, and legal consequences.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SpecialistOverviewCards;
