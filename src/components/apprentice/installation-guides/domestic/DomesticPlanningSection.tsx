
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClipboardList, Home, AlertTriangle, Calculator, FileText, Users } from "lucide-react";

const DomesticPlanningSection = () => {
  const planningSteps = [
    {
      title: "Initial Site Survey",
      description: "Conduct thorough assessment of existing installation",
      checklist: [
        "Check condition of existing consumer unit and earthing",
        "Assess cable routes and accessibility for new installations", 
        "Identify any asbestos or hazardous materials present",
        "Photograph existing installation for records",
        "Test existing circuits for safety and compliance",
        "Check for adequate space for new consumer unit if required"
      ]
    },
    {
      title: "Load Assessment & Future Planning",
      description: "Calculate electrical loads and anticipate future requirements",
      checklist: [
        "List all electrical appliances with current ratings",
        "Calculate diversity factors for different circuit types",
        "Plan for electric vehicle charging infrastructure",
        "Consider heat pump installation requirements",
        "Assess need for solar PV integration",
        "Plan for smart home technology expansion"
      ]
    },
    {
      title: "Design & Circuit Planning", 
      description: "Plan circuit layout and protection requirements",
      checklist: [
        "Design ring final and radial socket circuits",
        "Plan lighting circuit arrangements and switching",
        "Specify appropriate RCD and RCBO protection",
        "Consider surge protection device requirements",
        "Plan cable routes and containment systems",
        "Design earthing and bonding arrangements"
      ]
    },
    {
      title: "Regulatory Compliance",
      description: "Ensure all regulatory requirements are met",
      checklist: [
        "Determine Part P Building Regulations requirements",
        "Check if Building Control notification needed",
        "Verify competent person scheme registration",
        "Plan inspection and testing procedures",
        "Prepare certification documentation",
        "Consider CDM regulations for larger projects"
      ]
    }
  ];

  const designConsiderations = [
    {
      category: "Circuit Protection",
      details: [
        "RCD protection: 30mA for all socket outlets and circuits in bathrooms",
        "RCBO vs RCD: Consider individual circuit protection",
        "MCB ratings: Ensure proper coordination with cable ratings",
        "Surge protection: Required for new installations in exposed areas"
      ]
    },
    {
      category: "Cable Sizing",
      details: [
        "Voltage drop: Maximum 3% for lighting, 5% for power",
        "Current carrying capacity: Consider grouping factors",
        "Installation method: Affects cable current rating",
        "Future expansion: Size for anticipated load growth"
      ]
    },
    {
      category: "Special Locations",
      details: [
        "Bathrooms: Zone classifications and appropriate equipment",
        "Kitchens: RCD protection and appliance circuits",
        "Gardens: Outdoor equipment and cable burial depths",
        "Garages: Additional earthing and RCD requirements"
      ]
    }
  ];

  const clientCommunication = [
    {
      stage: "Initial Consultation",
      keyPoints: [
        "Explain the scope of work clearly and in plain English",
        "Discuss any potential disruption to daily routines",
        "Outline health and safety requirements and responsibilities",
        "Provide realistic timescales and cost estimates"
      ]
    },
    {
      stage: "During Installation",
      keyPoints: [
        "Keep client informed of daily progress",
        "Explain any unexpected issues immediately",
        "Maintain clean and safe working areas",
        "Respect client's property and privacy"
      ]
    },
    {
      stage: "Project Completion",
      keyPoints: [
        "Demonstrate new systems and safety features",
        "Provide all certification and warranties",
        "Explain maintenance requirements",
        "Offer future support and contact details"
      ]
    }
  ];

  const riskAssessment = [
    "Working at height (ladders, loft access)",
    "Electrical hazards from existing installations", 
    "Structural modifications and building integrity",
    "Asbestos exposure in older properties",
    "Manual handling of heavy equipment",
    "Noise and dust impact on occupants"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Comprehensive Planning Process</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {planningSteps.map((step, index) => (
            <div key={index} className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-blue-400 text-blue-300">
                  Step {index + 1}
                </Badge>
                <h4 className="font-medium text-white">{step.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {step.checklist.map((item, idx) => (
                  <div key={idx} className="text-xs text-blue-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Advanced Design Considerations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {designConsiderations.map((consideration, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-white mb-3">{consideration.category}</h4>
              <div className="space-y-2">
                {consideration.details.map((detail, idx) => (
                  <div key={idx} className="text-xs text-purple-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Client Communication & Project Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {clientCommunication.map((stage, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-white mb-3">{stage.stage}</h4>
              <div className="space-y-2">
                {stage.keyPoints.map((point, idx) => (
                  <div key={idx} className="text-xs text-green-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Risk Assessment & Safety Planning</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert className="border-orange-500/50 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-200 text-sm">
              <strong>Essential:</strong> Complete risk assessment before starting any domestic electrical work. Consider all potential hazards and implement appropriate control measures.
            </AlertDescription>
          </Alert>
          
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-orange-200 mb-3">Key Risk Areas to Assess</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {riskAssessment.map((risk, index) => (
                <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  {risk}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-yellow-300">Documentation & Record Keeping</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
            <h4 className="font-medium text-yellow-200 mb-3">Essential Documents to Maintain</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-yellow-200 mb-2">Before Work Starts</h5>
                <ul className="space-y-1">
                  <li className="text-muted-foreground text-xs">• Risk assessment documentation</li>
                  <li className="text-muted-foreground text-xs">• Client quotation and acceptance</li>
                  <li className="text-muted-foreground text-xs">• Initial condition survey photos</li>
                  <li className="text-muted-foreground text-xs">• Existing installation test results</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-200 mb-2">Upon Completion</h5>
                <ul className="space-y-1">
                  <li className="text-muted-foreground text-xs">• Electrical Installation Certificate</li>
                  <li className="text-muted-foreground text-xs">• Test result schedules</li>
                  <li className="text-muted-foreground text-xs">• Building Control notification (if required)</li>
                  <li className="text-muted-foreground text-xs">• Warranty and maintenance information</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticPlanningSection;
