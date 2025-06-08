
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Home, AlertTriangle } from "lucide-react";

const DomesticPlanningSection = () => {
  const planningSteps = [
    {
      title: "Initial Site Survey",
      description: "Conduct thorough assessment of existing installation",
      checklist: [
        "Check condition of existing consumer unit",
        "Assess earthing and bonding arrangements", 
        "Identify cable routes and access points",
        "Note any asbestos or hazardous materials",
        "Photograph existing installation"
      ]
    },
    {
      title: "Load Assessment",
      description: "Calculate electrical loads and future requirements",
      checklist: [
        "List all electrical appliances and their ratings",
        "Calculate diversity factors for different circuits",
        "Plan for future expansion needs",
        "Consider electric vehicle charging requirements",
        "Assess need for three-phase supply"
      ]
    },
    {
      title: "Design Considerations", 
      description: "Plan circuit layout and protection requirements",
      checklist: [
        "Design ring final and radial circuits",
        "Plan lighting circuit arrangements",
        "Specify RCD and RCBO protection",
        "Consider surge protection devices",
        "Plan cable routes and containment"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Planning Process</CardTitle>
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
              <ul className="space-y-1">
                {step.checklist.map((item, idx) => (
                  <li key={idx} className="text-xs text-blue-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-orange-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Common Planning Mistakes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-orange-200 mb-2">Inadequate Load Calculation</h4>
            <p className="text-xs text-muted-foreground">
              Failing to account for diversity factors and future electrical needs can lead to oversized or undersized installations.
            </p>
          </div>
          <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-orange-200 mb-2">Poor Cable Route Planning</h4>
            <p className="text-xs text-muted-foreground">
              Not considering access for future maintenance or cable replacement can cause significant issues later.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticPlanningSection;
