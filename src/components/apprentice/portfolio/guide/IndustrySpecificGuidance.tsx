
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Home, 
  Factory,
  Zap,
  Shield,
  FileText,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Target
} from "lucide-react";

const IndustrySpecificGuidance = () => {
  const sectors = [
    {
      name: "Domestic Electrical Work",
      icon: Home,
      color: "blue",
      description: "Residential electrical installations, maintenance, and repairs",
      keyCompetencies: [
        "Consumer unit installations and upgrades",
        "Socket and lighting circuit installation",
        "Electric shower and cooker installations",
        "EICR testing and fault finding",
        "Smart home technology integration",
        "Solar PV system installation"
      ],
      evidenceOpportunities: [
        "Before/after photos of consumer unit upgrades",
        "Test certificates from EICR inspections",
        "Customer testimonials and feedback",
        "Photos of neat cable routing and terminations",
        "Documentation of fault-finding processes",
        "Compliance certificates for notifiable work"
      ],
      industryStandards: [
        "BS 7671 18th Edition compliance",
        "Part P Building Regulations",
        "Competent Person Scheme requirements",
        "Consumer unit fire safety regulations",
        "RCD protection requirements"
      ]
    },
    {
      name: "Commercial Electrical Work",
      icon: Building,
      color: "green",
      description: "Office buildings, retail spaces, and commercial premises",
      keyCompetencies: [
        "Three-phase distribution systems",
        "Emergency lighting installations",
        "Fire alarm system wiring",
        "Data and communication cabling",
        "Motor control circuits",
        "Energy management systems"
      ],
      evidenceOpportunities: [
        "Complex distribution board installations",
        "Emergency lighting test records",
        "Fire alarm commissioning documentation",
        "Photos of cable tray and trunking systems",
        "Motor control panel wiring evidence",
        "Energy efficiency project involvement"
      ],
      industryStandards: [
        "BS 5266 Emergency lighting",
        "BS 5839 Fire detection systems",
        "BS 6701 Telecommunications installations",
        "Energy efficiency regulations",
        "Health and Safety at Work Act compliance"
      ]
    },
    {
      name: "Industrial Electrical Work",
      icon: Factory,
      color: "yellow",
      description: "Manufacturing facilities, heavy industry, and process control",
      keyCompetencies: [
        "High voltage switching and protection",
        "Motor control and variable speed drives",
        "PLC and automation systems",
        "Hazardous area installations",
        "Instrumentation and control wiring",
        "Power factor correction systems"
      ],
      evidenceOpportunities: [
        "HV switching procedure documentation",
        "Motor installation and commissioning records",
        "PLC programming and testing evidence",
        "ATEX zone installation photos",
        "Instrument calibration certificates",
        "Power quality improvement projects"
      ],
      industryStandards: [
        "IEC 61508 Functional safety",
        "ATEX regulations for hazardous areas",
        "DSEAR (Dangerous Substances Regulations)",
        "IEC 60204 Machine safety standards",
        "IEEE standards for power systems"
      ]
    }
  ];

  const specialisations = [
    {
      title: "Renewable Energy Systems",
      icon: Zap,
      areas: [
        "Solar PV installations and grid connection",
        "Wind turbine electrical systems",
        "Battery storage system integration",
        "Heat pump electrical connections",
        "EV charging point installations"
      ]
    },
    {
      title: "Building Management Systems",
      icon: Target,
      areas: [
        "HVAC control system wiring",
        "Lighting control and automation",
        "Access control systems",
        "CCTV and security system installation",
        "Building energy management integration"
      ]
    },
    {
      title: "Data & Communications",
      icon: FileText,
      areas: [
        "Structured cabling systems",
        "Fibre optic installations",
        "Network infrastructure",
        "Telecommunications systems",
        "Audio-visual system integration"
      ]
    }
  ];

  const assessmentCriteria = [
    {
      area: "Technical Competency",
      requirements: [
        "Demonstrate safe working practices in all environments",
        "Show understanding of relevant regulations and standards",
        "Evidence of fault-finding and problem-solving skills",
        "Ability to read and interpret technical drawings",
        "Competent use of test equipment and tools"
      ]
    },
    {
      area: "Professional Development",
      requirements: [
        "Continuous learning and skills development",
        "Effective communication with clients and colleagues",
        "Understanding of business and commercial aspects",
        "Commitment to quality and attention to detail",
        "Environmental awareness and sustainability"
      ]
    },
    {
      area: "Industry Knowledge",
      requirements: [
        "Understanding of sector-specific regulations",
        "Awareness of emerging technologies",
        "Knowledge of industry best practices",
        "Understanding of health and safety requirements",
        "Commercial awareness and customer service"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-400",
      green: "border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-400",
      yellow: "border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10 text-elec-yellow"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Industry-Specific Portfolio Guidance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            Understand the specific requirements, standards, and evidence expectations for different 
            sectors of the electrical industry. Tailor your portfolio to match your career path and specialisation.
          </p>
        </CardContent>
      </Card>

      {/* Sector-Specific Guidance */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Sector-Specific Requirements</h3>
        
        {sectors.map((sector, index) => {
          const IconComponent = sector.icon;
          const colorClasses = getColorClasses(sector.color);
          
          return (
            <Card key={index} className={colorClasses}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <IconComponent className="h-6 w-6" />
                  <div>
                    <CardTitle className="text-xl">{sector.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{sector.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Key Competencies
                    </h4>
                    <ul className="space-y-2">
                      {sector.keyCompetencies.map((competency, compIndex) => (
                        <li key={compIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                          {competency}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Evidence Opportunities
                    </h4>
                    <ul className="space-y-2">
                      {sector.evidenceOpportunities.map((opportunity, oppIndex) => (
                        <li key={oppIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Target className="h-3 w-3 mt-1 flex-shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Industry Standards
                    </h4>
                    <ul className="space-y-2">
                      {sector.industryStandards.map((standard, stdIndex) => (
                        <li key={stdIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Award className="h-3 w-3 mt-1 flex-shrink-0" />
                          {standard}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Specialisation Areas */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Emerging Specialisation Areas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specialisations.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <Card key={index} className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-cyan-400">
                    <IconComponent className="h-5 w-5" />
                    {spec.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {spec.areas.map((area, areaIndex) => (
                      <li key={areaIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Assessment Criteria */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Universal Assessment Criteria</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assessmentCriteria.map((criteria, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-elec-yellow">{criteria.area}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {criteria.requirements.map((requirement, reqIndex) => (
                    <li key={reqIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3 w-3 mt-1 text-green-400 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Career Pathway Considerations */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Career Pathway Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Portfolio Tailoring Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Focus evidence collection on your target sector</li>
                <li>• Seek placements in different types of electrical work</li>
                <li>• Build relationships with professionals in your chosen field</li>
                <li>• Attend sector-specific training and exhibitions</li>
                <li>• Join relevant professional associations early</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Future-Proofing Your Skills</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Stay current with emerging technologies</li>
                <li>• Develop digital and automation skills</li>
                <li>• Understand environmental and sustainability requirements</li>
                <li>• Build customer service and communication abilities</li>
                <li>• Consider business and entrepreneurial skills</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrySpecificGuidance;
