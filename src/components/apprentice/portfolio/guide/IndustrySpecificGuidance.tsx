
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Building, Home, Factory, Wrench, Shield } from "lucide-react";

const IndustrySpecificGuidance = () => {
  const sectors = [
    {
      name: "Domestic Electrical",
      icon: Home,
      description: "Residential electrical installations and maintenance",
      keyAreas: [
        "Consumer unit installations and upgrades",
        "Domestic wiring systems (ring finals, radials)",
        "Kitchen and bathroom electrical work",
        "Garden and outdoor electrical installations",
        "Electric vehicle charging point installations"
      ],
      evidenceTypes: [
        "EICR certificates and reports",
        "Minor works certificates",
        "Installation certificates",
        "Customer testimonials",
        "Before/after installation photos"
      ],
      regulations: [
        "BS 7671 Wiring Regulations",
        "Part P Building Regulations",
        "NICEIC/NAPIT scheme requirements",
        "IET guidance notes",
        "Local authority building control"
      ]
    },
    {
      name: "Commercial Electrical",
      icon: Building,
      description: "Office buildings, shops, and commercial installations",
      keyAreas: [
        "Three-phase distribution systems",
        "Emergency lighting systems",
        "Fire alarm installations",
        "Data and communications cabling",
        "Commercial lighting and controls"
      ],
      evidenceTypes: [
        "Periodic inspection reports",
        "Commissioning test results",
        "Emergency lighting certificates",
        "Fire alarm commissioning records",
        "Cable schedule documentation"
      ],
      regulations: [
        "BS 7671 Wiring Regulations",
        "BS 5266 Emergency lighting",
        "BS 5839 Fire detection systems",
        "CDM Regulations 2015",
        "Workplace Regulations"
      ]
    },
    {
      name: "Industrial Electrical",
      icon: Factory,
      description: "Manufacturing plants and heavy industrial installations",
      keyAreas: [
        "Motor control and automation",
        "High voltage switching and protection",
        "Industrial process control systems",
        "Hazardous area installations",
        "Power factor correction systems"
      ],
      evidenceTypes: [
        "Commissioning reports",
        "FAT/SAT documentation",
        "Loop testing certificates",
        "Motor testing results",
        "Safety system validation"
      ],
      regulations: [
        "BS 7671 Wiring Regulations",
        "BS EN 60079 Explosive atmospheres",
        "DSEAR Regulations",
        "PUWER Regulations",
        "Machinery Directive"
      ]
    }
  ];

  const universalRequirements = [
    {
      category: "Health & Safety",
      icon: Shield,
      requirements: [
        "Risk assessment completion",
        "Method statement preparation",
        "PPE usage documentation",
        "Accident/incident reporting",
        "Safety training records"
      ]
    },
    {
      category: "Testing & Inspection",
      icon: Wrench,
      requirements: [
        "Initial verification testing",
        "Periodic inspection and testing",
        "Portable appliance testing",
        "Emergency lighting testing",
        "Fire alarm system testing"
      ]
    },
    {
      category: "Regulations & Standards",
      icon: Zap,
      requirements: [
        "BS 7671 18th Edition knowledge",
        "IET Guidance Note understanding",
        "Building Regulations compliance",
        "CDM Regulations awareness",
        "Environmental regulations"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Industry-Specific Portfolio Guidance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Tailored guidance for building portfolios specific to different electrical industry sectors. 
            Each sector has unique requirements, regulations, and evidence types that must be 
            demonstrated for competency assessment.
          </p>
        </CardContent>
      </Card>

      {/* Sector-Specific Guidance */}
      <div className="space-y-6">
        {sectors.map((sector) => (
          <Card key={sector.name} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <sector.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-white">{sector.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{sector.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-3">Key Work Areas</h4>
                  <ul className="space-y-1">
                    {sector.keyAreas.map((area, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-blue-400 font-medium mb-3">Evidence Types</h4>
                  <ul className="space-y-1">
                    {sector.evidenceTypes.map((evidence, index) => (
                      <li key={index} className="text-sm text-blue-200 flex items-start">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {evidence}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-green-400 font-medium mb-3">Key Regulations</h4>
                  <ul className="space-y-1">
                    {sector.regulations.map((regulation, index) => (
                      <li key={index} className="text-sm text-green-200 flex items-start">
                        <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {regulation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Universal Requirements */}
      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300">Universal Requirements (All Sectors)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {universalRequirements.map((requirement) => (
              <div key={requirement.category}>
                <div className="flex items-center gap-2 mb-3">
                  <requirement.icon className="h-5 w-5 text-purple-400" />
                  <h4 className="text-purple-300 font-medium">{requirement.category}</h4>
                </div>
                <ul className="space-y-1">
                  {requirement.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-purple-200 flex items-start">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Assessment Tips */}
      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300">Portfolio Assessment Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-orange-300 font-medium mb-3">For Assessors:</h4>
              <ul className="text-orange-200 text-sm space-y-1">
                <li>• Evidence must be authentic and verifiable</li>
                <li>• Check dates and witness signatures</li>
                <li>• Look for progression and development</li>
                <li>• Ensure coverage of all required competencies</li>
                <li>• Quality over quantity in evidence selection</li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-300 font-medium mb-3">For Apprentices:</h4>
              <ul className="text-orange-200 text-sm space-y-1">
                <li>• Map evidence to assessment criteria clearly</li>
                <li>• Include reflective commentary on learning</li>
                <li>• Show understanding of why tasks were performed</li>
                <li>• Demonstrate problem-solving abilities</li>
                <li>• Include evidence of professional development</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrySpecificGuidance;
