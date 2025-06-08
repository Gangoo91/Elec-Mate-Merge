
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, FileText, Zap, Shield, Activity } from "lucide-react";

const RunThroughStepsTab = () => {
  const inspectionCategories = [
    {
      title: "Initial Verification (New Installations)",
      icon: CheckCircle,
      description: "Complete inspection and testing process for new electrical installations",
      duration: "2-4 hours",
      complexity: "Advanced",
      procedures: [
        {
          step: "Pre-Inspection Preparation",
          details: [
            "Review installation drawings and specifications",
            "Confirm completion of installation work",
            "Ensure safe isolation procedures can be implemented",
            "Gather required test equipment and documentation"
          ]
        },
        {
          step: "Visual Inspection",
          details: [
            "Check connection of conductors for security and correctness",
            "Verify identification of conductors (L1, L2, L3, N, PE)",
            "Confirm routing of cables in prescribed zones",
            "Inspect adequacy of earthing and bonding arrangements",
            "Check selection and erection of equipment and protective measures"
          ]
        },
        {
          step: "Testing Sequence",
          details: [
            "1. Continuity of protective conductors (including main and supplementary bonding)",
            "2. Continuity of ring final circuit conductors",
            "3. Insulation resistance",
            "4. Protection by SELV, PELV or electrical separation",
            "5. Resistance of floors and walls",
            "6. Polarity",
            "7. Earth electrode resistance",
            "8. Earth fault loop impedance",
            "9. Additional protection (RCD operation)"
          ]
        },
        {
          step: "Documentation Requirements",
          details: [
            "Complete Electrical Installation Certificate (EIC)",
            "Schedule of Inspections",
            "Schedule of Test Results",
            "Provide copies to client and Building Control",
            "Retain records for future reference"
          ]
        }
      ]
    },
    {
      title: "Periodic Inspection (EICR)",
      icon: FileText,
      description: "Electrical Installation Condition Report for existing installations",
      duration: "1-3 hours",
      complexity: "Intermediate",
      procedures: [
        {
          step: "Assessment and Planning",
          details: [
            "Determine extent of installation to be inspected",
            "Identify sampling strategy for large installations",
            "Review previous inspection reports if available",
            "Assess accessibility and safety considerations"
          ]
        },
        {
          step: "Visual Inspection",
          details: [
            "Overall condition of installation",
            "Evidence of damage, deterioration or defects",
            "Adequacy of earthing and bonding arrangements",
            "Suitability of accessories and equipment for environment",
            "Presence of non-standard or obsolete equipment"
          ]
        },
        {
          step: "Testing (Sample Basis)",
          details: [
            "Continuity of protective conductors",
            "Insulation resistance testing",
            "Polarity verification",
            "Earth fault loop impedance measurements",
            "RCD operation testing",
            "Additional tests as deemed necessary"
          ]
        },
        {
          step: "Classification of Defects",
          details: [
            "C1: Danger present - immediate remedial action required",
            "C2: Potentially dangerous - urgent remedial action required",
            "C3: Improvement recommended to enhance safety",
            "FI: Further investigation required without delay"
          ]
        }
      ]
    },
    {
      title: "Testing Procedures",
      icon: Zap,
      description: "Detailed testing methods and acceptable values",
      duration: "1-2 hours",
      complexity: "Intermediate",
      procedures: [
        {
          step: "Continuity Testing",
          details: [
            "Test between phase conductor and CPC at each outlet (R1+R2)",
            "Acceptable values: Usually <1.67 times tabulated values",
            "Use low-resistance ohmmeter (200mA test current)",
            "Link phase and CPC at consumer unit for ring circuits",
            "Verify ring circuit integrity before R1+R2 testing"
          ]
        },
        {
          step: "Insulation Resistance",
          details: [
            "Test voltage: 250V for SELV, 500V for low voltage installations",
            "Minimum acceptable values: 1MΩ for installations up to 500V",
            "Test between: Phase-Neutral, Phase-Earth, Neutral-Earth",
            "Remove or isolate electronic equipment during testing",
            "Test each circuit separately with all switches closed"
          ]
        },
        {
          step: "Earth Fault Loop Impedance (Zs)",
          details: [
            "Measured value must not exceed tabulated maximum values",
            "Temperature correction may be required for cables",
            "Test at origin and extremity of circuits",
            "Use appropriate test method for RCD-protected circuits",
            "Consider prospective fault current calculations"
          ]
        },
        {
          step: "RCD Testing",
          details: [
            "Test at rated residual operating current (IΔn)",
            "Test at 5 x IΔn for instantaneous operation",
            "Maximum disconnection times: 300ms at IΔn, 40ms at 5IΔn",
            "Test ramp function to determine actual trip current",
            "Test all RCDs including push-button test facility"
          ]
        }
      ]
    },
    {
      title: "Safety Procedures",
      icon: Shield,
      description: "Essential safety practices during inspection and testing",
      duration: "Ongoing",
      complexity: "Critical",
      procedures: [
        {
          step: "Safe Isolation",
          details: [
            "Identify all sources of supply to the installation",
            "Secure isolation by switching off and locking off",
            "Test voltage indicating device on known live source",
            "Test circuit to confirm dead using approved detector",
            "Re-test voltage indicating device on known live source"
          ]
        },
        {
          step: "Risk Assessment",
          details: [
            "Assess working environment for hazards",
            "Consider presence of other trades and public",
            "Identify requirements for barriers and warning notices",
            "Ensure adequate lighting and access",
            "Plan emergency procedures and first aid provision"
          ]
        },
        {
          step: "Personal Protective Equipment",
          details: [
            "Appropriate safety footwear and clothing",
            "Voltage-rated gloves for live working",
            "Safety glasses for arc flash protection",
            "Hard hat in construction environments",
            "High-visibility clothing where required"
          ]
        },
        {
          step: "Equipment Safety",
          details: [
            "Use appropriate test equipment for voltage level",
            "Ensure test equipment is calibrated and in date",
            "Check test leads for damage before use",
            "Use proving unit to verify test equipment function",
            "Follow manufacturer's operating instructions"
          ]
        }
      ]
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Critical': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            BS 7671 Inspection & Testing Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Key Principles</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Ensure installation complies with BS 7671 requirements</li>
                <li>• Verify safety of persons, livestock and property</li>
                <li>• Confirm proper installation and operation of protective measures</li>
                <li>• Document all findings and test results accurately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Legal Requirements</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Building Regulations Part P compliance</li>
                <li>• Electricity at Work Regulations 1989</li>
                <li>• Health and Safety at Work Act 1974</li>
                <li>• CDM Regulations 2015 (construction projects)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Categories */}
      <div className="space-y-6">
        {inspectionCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <category.icon className="h-6 w-6 text-elec-yellow" />
                  <div>
                    <CardTitle className="text-lg text-elec-yellow">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {category.duration}
                  </Badge>
                  <Badge variant="outline" className={getComplexityColor(category.complexity)}>
                    {category.complexity}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {category.procedures.map((procedure, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      {procedure.step}
                    </h4>
                    <ul className="space-y-1 pl-8">
                      {procedure.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-elec-yellow mt-1.5 flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Notes */}
      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Critical Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Before Starting</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Confirm competency for the work being undertaken</li>
                <li>• Ensure appropriate test equipment is available and calibrated</li>
                <li>• Obtain permission and notify relevant parties</li>
                <li>• Plan safe working procedures and emergency protocols</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">During Testing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Never work live unless absolutely necessary and competent</li>
                <li>• Always prove test equipment before and after use</li>
                <li>• Record all test results accurately and legibly</li>
                <li>• Report any dangerous conditions immediately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunThroughStepsTab;
