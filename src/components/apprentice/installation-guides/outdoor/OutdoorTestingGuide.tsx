
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  FileCheck,
  TestTube,
  MapPin,
  Cloud
} from "lucide-react";

const OutdoorTestingGuide = () => {
  const testingSequence = [
    {
      step: "Environmental Assessment",
      description: "Weather and environmental condition verification",
      requirements: [
        "Weather conditions suitable for testing (dry conditions)",
        "Temperature range verification for equipment operation",
        "UV protection assessment for test equipment",
        "Wind conditions safe for elevated work",
        "Visibility adequate for safe testing procedures"
      ],
      standards: ["BS 7671", "BS EN 60529"]
    },
    {
      step: "Safe Isolation Procedures",
      description: "Outdoor-specific isolation requirements",
      requirements: [
        "Multiple supply isolation for street lighting",
        "Underground cable location and isolation",
        "Coordination with utility companies",
        "Traffic management during isolation",
        "Emergency lighting alternative provision"
      ],
      standards: ["BS 7671", "NRSWA 1991"]
    },
    {
      step: "Visual Inspection (Weather-Resistant)",
      description: "Comprehensive outdoor equipment inspection",
      requirements: [
        "IP rating verification (minimum IP65)",
        "UV degradation assessment of cables and enclosures",
        "Corrosion inspection for metalwork and connections",
        "Drainage system effectiveness check",
        "Mounting and fixing integrity assessment"
      ],
      standards: ["BS EN 60529", "BS EN 40 Series"]
    },
    {
      step: "Continuity Testing",
      description: "Enhanced continuity for outdoor circuits",
      requirements: [
        "Street lighting circuit continuity",
        "Underground cable continuity verification",
        "Earth continuity for lighting columns",
        "Protective bonding continuity testing",
        "Control circuit continuity for smart lighting"
      ],
      standards: ["BS 7671 Section 643"]
    },
    {
      step: "Insulation Resistance Testing",
      description: "Weather-resistant insulation verification",
      requirements: [
        "SWA cable insulation testing (500V minimum)",
        "Lighting fitting insulation verification",
        "Underground joint insulation testing",
        "Control gear insulation assessment",
        "Moisture ingress detection testing"
      ],
      standards: ["BS 7671 Section 643"]
    },
    {
      step: "Earth Fault Loop Impedance",
      description: "Outdoor Zs testing protocols",
      requirements: [
        "Street lighting Zs measurements",
        "Car park lighting circuit testing",
        "External power supply Zs verification",
        "Underground distribution Zs testing",
        "Emergency lighting circuit impedance"
      ],
      standards: ["BS 7671 Sections 411 & 643"]
    },
    {
      step: "RCD Protection Testing",
      description: "Enhanced RCD testing for outdoor installations",
      requirements: [
        "30mA RCD testing for all outdoor circuits",
        "Time/current characteristic verification",
        "Discrimination between RCD devices",
        "Weather condition impact assessment",
        "Emergency override system testing"
      ],
      standards: ["BS 7671 Section 643"]
    },
    {
      step: "Illumination Level Testing",
      description: "Lighting performance verification",
      requirements: [
        "Lux level measurements per BS 5489",
        "Uniformity ratio verification",
        "Glare assessment (UGR calculations)",
        "Emergency lighting illumination testing",
        "CCTV lighting compatibility verification"
      ],
      standards: ["BS 5489-1:2020", "BS EN 13201"]
    }
  ];

  const certificationRequirements = [
    {
      certificate: "Electrical Installation Certificate",
      description: "For new outdoor electrical installations",
      requirements: [
        "Detailed circuit descriptions and routes",
        "Cable specifications and burial depths",
        "Lighting column foundation details",
        "Environmental protection measures",
        "Test results for all outdoor circuits"
      ]
    },
    {
      certificate: "Street Works Compliance Certificate",
      description: "For public highway installations",
      requirements: [
        "NRSWA compliance documentation",
        "Traffic management plan approval",
        "Highway authority consent",
        "Utility coordination records",
        "Reinstatement quality assurance"
      ]
    },
    {
      certificate: "Illumination Survey Report",
      description: "For lighting installations",
      requirements: [
        "Lux level measurements and grid plots",
        "BS 5489 compliance verification",
        "Energy efficiency assessment",
        "Maintenance access evaluation",
        "Light pollution impact assessment"
      ]
    }
  ];

  const weatherConsiderations = [
    {
      condition: "Wet Weather Testing",
      precautions: [
        "Use weather-protected test equipment only",
        "Ensure test leads have adequate IP ratings",
        "Allow equipment to dry before testing",
        "Consider moisture impact on insulation readings",
        "Postpone testing in heavy rain conditions"
      ]
    },
    {
      condition: "Temperature Extremes",
      precautions: [
        "Account for cable thermal expansion/contraction",
        "Battery-powered equipment temperature limits",
        "LED fitting temperature compensation",
        "Insulation testing temperature corrections",
        "Equipment warming periods in cold conditions"
      ]
    },
    {
      condition: "High Wind Conditions",
      precautions: [
        "Suspend elevated work during high winds",
        "Secure test equipment and cables",
        "Use additional safety measures for column work",
        "Consider wind loading on temporary structures",
        "Plan for equipment stability during testing"
      ]
    }
  ];

  const specialTests = [
    {
      test: "Lightning Protection Testing",
      description: "For outdoor installations in lightning-prone areas",
      requirements: [
        "Earth electrode resistance testing",
        "Surge protection device verification",
        "Bonding conductor continuity",
        "Lightning conductor integrity testing",
        "Equipotential bonding verification"
      ]
    },
    {
      test: "Smart Lighting System Testing",
      description: "For intelligent outdoor lighting installations",
      requirements: [
        "Communication network functionality",
        "Remote control system verification",
        "Dimming and scheduling operation",
        "Energy monitoring system testing",
        "Backup power system verification"
      ]
    },
    {
      test: "CCTV Integration Testing",
      description: "For security lighting installations",
      requirements: [
        "Lighting/CCTV synchronisation testing",
        "Motion sensor integration verification",
        "Emergency lighting camera compatibility",
        "Power supply coordination testing",
        "Remote monitoring system functionality"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Testing Overview */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Outdoor Testing & Certification Overview</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Outdoor electrical installations require specialised testing procedures due to environmental exposure, 
            weather conditions, and public safety considerations. All equipment must meet enhanced protection standards 
            and testing must account for variable environmental conditions.
          </p>
        </CardHeader>
      </Card>

      {/* Testing Sequence */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Outdoor Testing Sequence</CardTitle>
          </div>
          <p className="text-muted-foreground">Comprehensive testing protocol for outdoor installations</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {testingSequence.map((test, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                      Step {index + 1}
                    </Badge>
                    <h3 className="font-semibold text-purple-300">{test.step}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-purple-200">Requirements:</h4>
                    {test.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-start gap-2 text-sm">
                        <Zap className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {test.standards.map((standard, stdIndex) => (
                      <Badge key={stdIndex} variant="outline" className="border-orange-500 text-orange-400 text-xs">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weather Considerations */}
      <Card className="border-cyan-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">Weather & Environmental Testing Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Critical environmental factors affecting outdoor testing</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {weatherConsiderations.map((weather, index) => (
            <div key={index} className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
              <h3 className="font-semibold text-cyan-300 mb-3">{weather.condition}</h3>
              <div className="space-y-2">
                {weather.precautions.map((precaution, precIndex) => (
                  <div key={precIndex} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-3 w-3 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{precaution}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Special Tests */}
      <Card className="border-yellow-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">Specialised Outdoor Tests</CardTitle>
          </div>
          <p className="text-muted-foreground">Additional testing requirements for specific outdoor applications</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {specialTests.map((test, index) => (
            <div key={index} className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
              <h3 className="font-semibold text-yellow-300 mb-2">{test.test}</h3>
              <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
              <div className="space-y-2">
                {test.requirements.map((req, reqIndex) => (
                  <div key={reqIndex} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Certification Requirements */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Outdoor Certification Requirements</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential certification documentation for outdoor installations</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificationRequirements.map((cert, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h3 className="font-semibold text-green-300 mb-2">{cert.certificate}</h3>
              <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
              <div className="space-y-2">
                {cert.requirements.map((req, reqIndex) => (
                  <div key={reqIndex} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Critical Safety Notice */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Critical Outdoor Testing Safety
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-red-300">Weather Protection:</strong> All testing equipment must have appropriate 
              IP ratings for outdoor use. Postpone testing during adverse weather conditions including heavy rain, 
              snow, or high winds that could compromise safety.
            </p>
            <p>
              <strong className="text-red-300">Public Safety:</strong> Outdoor testing often occurs in public spaces. 
              Ensure adequate barriers, warning signs, and traffic management are in place. Coordinate with local 
              authorities for street lighting and highway installations.
            </p>
            <p>
              <strong className="text-red-300">Underground Services:</strong> Always complete CAT scanning before 
              excavation or testing underground cables. Contact utility companies and allow time for service location 
              before commencing any underground electrical work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutdoorTestingGuide;
