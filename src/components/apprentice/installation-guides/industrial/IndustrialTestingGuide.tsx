
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  FileCheck,
  TestTube,
  Factory,
  Settings
} from "lucide-react";

const IndustrialTestingGuide = () => {
  const testingSequence = [
    {
      step: "Pre-Installation Safety Assessment",
      description: "ATEX zone verification and hazard assessment",
      requirements: [
        "Confirm ATEX zone classifications are current",
        "Verify all equipment has appropriate certificates",
        "Check temperature class ratings for installed equipment",
        "Confirm gas group classifications match application",
        "Review explosive atmosphere protection methods"
      ],
      standards: ["ATEX 2014/34/EU", "BS EN 60079 Series"]
    },
    {
      step: "Safe Isolation and Lock-out",
      description: "Industrial-grade isolation procedures",
      requirements: [
        "Multi-point isolation for complex machinery",
        "Lock-out/tag-out procedures implementation",
        "Authorised person supervision required",
        "Emergency stop system verification",
        "Prove dead testing with appropriate equipment"
      ],
      standards: ["BS 7671", "PUWER 1998"]
    },
    {
      step: "Visual Inspection (Enhanced)",
      description: "Comprehensive industrial equipment inspection",
      requirements: [
        "ATEX equipment marking verification",
        "Cable gland integrity in hazardous areas",
        "Motor terminal box condition assessment",
        "Control panel IP rating verification",
        "Emergency stop accessibility check"
      ],
      standards: ["BS EN 60079-14", "BS EN 60204-1"]
    },
    {
      step: "Continuity Testing",
      description: "Enhanced continuity for industrial circuits",
      requirements: [
        "Motor winding continuity testing",
        "Control circuit continuity verification",
        "Emergency stop circuit continuity",
        "Earth continuity for large machinery",
        "Bonding continuity in ATEX areas"
      ],
      standards: ["BS 7671 Section 643"]
    },
    {
      step: "Insulation Resistance Testing",
      description: "High voltage insulation testing",
      requirements: [
        "Motor insulation testing (500V minimum)",
        "Control circuit insulation (250V)",
        "Cable insulation testing for SWA cables",
        "Transformer insulation testing where applicable",
        "ATEX equipment insulation verification"
      ],
      standards: ["BS 7671 Section 643", "IEC 60204-1"]
    },
    {
      step: "Earth Fault Loop Impedance",
      description: "Industrial Zs testing procedures",
      requirements: [
        "Motor circuit Zs testing",
        "Heavy machinery circuit verification",
        "Distribution board Zs measurements",
        "ATEX area circuit impedance testing",
        "Emergency system circuit testing"
      ],
      standards: ["BS 7671 Sections 411 & 643"]
    },
    {
      step: "RCD/RCBO Testing",
      description: "Industrial RCD testing protocols",
      requirements: [
        "30mA RCD testing for standard circuits",
        "300mA RCD testing for motor circuits",
        "Time/current characteristic verification",
        "Discrimination testing between devices",
        "Emergency lighting RCD testing"
      ],
      standards: ["BS 7671 Section 643"]
    },
    {
      step: "Functional Testing",
      description: "Industrial system functional verification",
      requirements: [
        "Motor control system operation",
        "Variable frequency drive functionality",
        "Emergency stop system testing",
        "Interlock system verification",
        "Control panel operation testing"
      ],
      standards: ["BS EN 60204-1", "Machinery Directive"]
    }
  ];

  const certificationRequirements = [
    {
      certificate: "Electrical Installation Certificate",
      description: "For new industrial installations",
      requirements: [
        "Detailed circuit descriptions",
        "ATEX equipment schedules",
        "Motor control system documentation",
        "Test results for all circuits",
        "Competent person signatures"
      ]
    },
    {
      certificate: "ATEX Declaration of Conformity",
      description: "For explosive atmosphere installations",
      requirements: [
        "Zone classification documentation",
        "Equipment certificates compilation",
        "Installation method statements",
        "Maintenance requirements schedule",
        "Competent person assessment"
      ]
    },
    {
      certificate: "Minor Electrical Installation Works Certificate",
      description: "For additions to existing systems",
      requirements: [
        "Circuit details and modifications",
        "Compatibility with existing ATEX systems",
        "Testing results documentation",
        "Impact assessment on existing installations",
        "Authorised person approval"
      ]
    }
  ];

  const specialConsiderations = [
    {
      area: "Motor Testing",
      considerations: [
        "Insulation testing must consider motor design voltage",
        "Soft-start systems require specific testing procedures",
        "Variable frequency drives need specialised testing",
        "Motor temperature monitoring system verification",
        "Bearing insulation testing for large motors"
      ]
    },
    {
      area: "ATEX Compliance Testing",
      considerations: [
        "Equipment temperature rise testing in classified areas",
        "Cable gland flame path verification",
        "Enclosure IP rating testing under operational conditions",
        "Gas group compatibility verification",
        "Ignition source elimination testing"
      ]
    },
    {
      area: "Control System Testing",
      considerations: [
        "PLC system I/O testing and verification",
        "Emergency stop response time testing",
        "Safety interlock system verification",
        "Communication system integrity testing",
        "Backup power system testing"
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
            <CardTitle className="text-blue-300">Industrial Testing & Certification Overview</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Industrial electrical installations require enhanced testing procedures due to the complexity of systems, 
            ATEX compliance requirements, and the critical nature of industrial processes. All testing must be conducted 
            by competent persons with appropriate industrial qualifications.
          </p>
        </CardHeader>
      </Card>

      {/* Testing Sequence */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Industrial Testing Sequence</CardTitle>
          </div>
          <p className="text-muted-foreground">Comprehensive testing protocol for industrial installations</p>
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

      {/* Certification Requirements */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Industrial Certification Requirements</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential certification documentation for industrial installations</p>
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

      {/* Special Considerations */}
      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Special Testing Considerations</CardTitle>
          </div>
          <p className="text-muted-foreground">Critical factors specific to industrial environments</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {specialConsiderations.map((area, index) => (
            <div key={index} className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <h3 className="font-semibold text-orange-300 mb-3 flex items-center gap-2">
                <Factory className="h-4 w-4" />
                {area.area}
              </h3>
              <div className="space-y-2">
                {area.considerations.map((consideration, conIndex) => (
                  <div key={conIndex} className="flex items-start gap-2 text-sm">
                    <Settings className="h-3 w-3 text-orange-400 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{consideration}</span>
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
            Critical Industrial Testing Safety
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-red-300">ATEX Compliance:</strong> All testing in explosive atmospheres must use 
              intrinsically safe equipment with appropriate ATEX certification. Hot work permits may be required for testing activities.
            </p>
            <p>
              <strong className="text-red-300">Arc Flash Protection:</strong> Industrial testing on high-voltage systems requires 
              appropriate arc flash PPE and risk assessment. Ensure adequate incident energy calculations are completed.
            </p>
            <p>
              <strong className="text-red-300">Competency Requirements:</strong> Industrial testing must be supervised by persons 
              with appropriate qualifications including CompEx certification for ATEX areas and authorised person status for high voltage work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustrialTestingGuide;
