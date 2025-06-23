
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Home, 
  Factory, 
  ShoppingBag,
  Zap,
  Shield,
  Wrench,
  FileText,
  Users,
  Award
} from "lucide-react";

const IndustrySpecificGuidance = () => {
  const sectors = [
    {
      sector: "Domestic Electrical",
      icon: Home,
      color: "blue",
      description: "Residential properties and home installations",
      keyCompetencies: [
        "Consumer unit installations and upgrades",
        "Socket and lighting circuit installation",
        "Electric shower and cooker circuits",
        "Periodic inspection and testing",
        "Fault finding in domestic systems"
      ],
      evidenceOpportunities: [
        "Before/after photos of consumer unit upgrades",
        "Testing certificates for new circuits",
        "Customer satisfaction testimonials",
        "Fault diagnosis and repair documentation",
        "Compliance with Part P regulations"
      ],
      industryStandards: ["BS 7671", "Part P Building Regulations", "IET Code of Practice"]
    },
    {
      sector: "Commercial Electrical",
      icon: Building,
      color: "green",
      description: "Office buildings, retail, and commercial premises",
      keyCompetencies: [
        "Three-phase distribution systems",
        "Emergency lighting systems",
        "Fire alarm installations",
        "Data and communication cabling",
        "Motor control and automation"
      ],
      evidenceOpportunities: [
        "Large installation project documentation",
        "Emergency lighting test certificates",
        "Team working on complex projects",
        "Health and safety risk assessments",
        "Client liaison and communication"
      ],
      industryStandards: ["BS 7671", "BS 5266 (Emergency Lighting)", "BS 5839 (Fire Alarms)"]
    },
    {
      sector: "Industrial Electrical",
      icon: Factory,
      color: "purple",
      description: "Manufacturing, processing, and heavy industry",
      keyCompetencies: [
        "High voltage systems and switchgear",
        "Motor control and variable frequency drives",
        "PLC and automation systems",
        "Instrumentation and control",
        "Hazardous area installations"
      ],
      evidenceOpportunities: [
        "Complex motor installation projects",
        "Control panel wiring and testing",
        "Maintenance and fault finding logs",
        "Safety permit documentation",
        "Continuous improvement initiatives"
      ],
      industryStandards: ["BS 7671", "IEC 60079 (Explosive Atmospheres)", "BS EN 61439 (Switchgear)"]
    },
    {
      sector: "Renewable Energy",
      icon: Zap,
      color: "yellow",
      description: "Solar, wind, and sustainable energy systems",
      keyCompetencies: [
        "Solar PV system design and installation",
        "Battery storage systems",
        "Grid connection and G99 applications",
        "Energy monitoring systems",
        "Electric vehicle charging points"
      ],
      evidenceOpportunities: [
        "Solar installation from start to finish",
        "MCS certification processes",
        "Environmental impact assessments",
        "Customer energy savings documentation",
        "Government scheme compliance"
      ],
      industryStandards: ["MCS Standards", "G99 Grid Code", "BS EN 62446 (PV Systems)"]
    },
    {
      sector: "Maintenance & Testing",
      icon: Wrench,
      color: "orange",
      description: "Inspection, testing, and maintenance services",
      keyCompetencies: [
        "Periodic inspection and testing (EICR)",
        "PAT testing and certification",
        "Fault finding and diagnostics",
        "Preventive maintenance programmes",
        "Compliance and safety assessments"
      ],
      evidenceOpportunities: [
        "Complete EICR inspection reports",
        "Fault diagnosis case studies",
        "Customer communication examples",
        "Risk assessment documentation",
        "Continuous professional development"
      ],
      industryStandards: ["BS 7671", "IET Code of Practice", "In-Service Inspection and Testing"]
    },
    {
      sector: "Smart Technology",
      icon: ShoppingBag,
      color: "red",
      description: "Home automation and intelligent building systems",
      keyCompetencies: [
        "Smart home system integration",
        "Building management systems",
        "Security and access control",
        "Network and data infrastructure",
        "IoT device installation and configuration"
      ],
      evidenceOpportunities: [
        "Smart home installation projects",
        "System commissioning documentation",
        "Client training and handover",
        "Integration testing reports",
        "Future technology adaptation"
      ],
      industryStandards: ["KNX Standards", "BS EN 15232 (Building Automation)", "Cyber Security Guidelines"]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue": return "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-400";
      case "green": return "border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-400";
      case "purple": return "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-400";
      case "yellow": return "border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10 text-elec-yellow";
      case "orange": return "border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 text-orange-400";
      case "red": return "border-red-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10 text-red-400";
      default: return "border-gray-500/30 bg-gradient-to-br from-gray-500/10 to-slate-500/10 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Building className="h-6 w-6" />
            Industry-Specific Portfolio Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Tailor your portfolio to your specific electrical sector. Each industry has unique requirements, 
            standards, and evidence opportunities that you should highlight in your portfolio.
          </p>
        </CardContent>
      </Card>

      {/* Sector Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sectors.map((sector, index) => {
          const IconComponent = sector.icon;
          return (
            <Card key={index} className={getColorClasses(sector.color)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-6 w-6" />
                  {sector.sector}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{sector.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Key Competencies
                  </h4>
                  <ul className="space-y-1">
                    {sector.keyCompetencies.map((competency, compIndex) => (
                      <li key={compIndex} className="text-sm text-muted-foreground">
                        • {competency}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Evidence Opportunities
                  </h4>
                  <ul className="space-y-1">
                    {sector.evidenceOpportunities.map((opportunity, oppIndex) => (
                      <li key={oppIndex} className="text-sm text-muted-foreground">
                        • {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Industry Standards
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {sector.industryStandards.map((standard, stdIndex) => (
                      <Badge key={stdIndex} variant="outline" className="text-xs">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cross-Industry Skills */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Cross-Industry Core Skills</CardTitle>
          <p className="text-muted-foreground">
            Essential competencies that apply across all electrical sectors
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                Health & Safety
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Risk assessment and method statements</li>
                <li>• Safe isolation procedures</li>
                <li>• PPE selection and use</li>
                <li>• Accident prevention and reporting</li>
                <li>• Working at height safely</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-green-400" />
                Technical Skills
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Circuit design and calculations</li>
                <li>• Installation methods and techniques</li>
                <li>• Testing and inspection procedures</li>
                <li>• Fault finding and diagnostics</li>
                <li>• Use of test equipment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                Professional Skills
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Customer communication</li>
                <li>• Team working and collaboration</li>
                <li>• Problem-solving approaches</li>
                <li>• Time management and planning</li>
                <li>• Continuous learning and development</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Mapping Guide */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Portfolio Mapping Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Use this strategy to ensure your portfolio covers all required competencies for your specific sector:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Step 1: Identify Your Primary Sector</h4>
                <p className="text-sm text-muted-foreground">
                  Determine which sector(s) best describe your apprenticeship placement and focus your evidence collection accordingly.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white">Step 2: Map Competencies</h4>
                <p className="text-sm text-muted-foreground">
                  Create a checklist of sector-specific competencies and track your evidence against each one.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white">Step 3: Seek Diverse Evidence</h4>
                <p className="text-sm text-muted-foreground">
                  Look for opportunities to demonstrate skills across different contexts within your sector.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white">Step 4: Document Standards</h4>
                <p className="text-sm text-muted-foreground">
                  Reference relevant industry standards and regulations in your evidence commentary.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrySpecificGuidance;
