
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckSquare, ClipboardCheck, AlertTriangle, Shield, Zap, HardHat } from "lucide-react";
import { Link } from "react-router-dom";

const OnJobAssessment = () => {
  const assessmentTools = [
    {
      id: 1,
      title: "Pre-Job Safety Assessment",
      icon: Shield,
      description: "Comprehensive safety checklist before starting any electrical work",
      items: [
        "PPE requirement assessment",
        "Electrical hazard identification", 
        "Safe isolation verification",
        "Emergency procedure review"
      ]
    },
    {
      id: 2,
      title: "Site Condition Evaluation",
      icon: HardHat,
      description: "Assess environmental and working conditions",
      items: [
        "Working space adequacy",
        "Lighting conditions",
        "Weather considerations",
        "Access route safety"
      ]
    },
    {
      id: 3,
      title: "Electrical Installation Assessment",
      icon: Zap,
      description: "Evaluate existing electrical installations",
      items: [
        "Consumer unit condition",
        "Cable condition assessment",
        "Earthing and bonding check",
        "RCD operation verification"
      ]
    },
    {
      id: 4,
      title: "Risk Assessment Matrix",
      icon: AlertTriangle,
      description: "Systematic risk evaluation framework",
      items: [
        "Hazard identification",
        "Risk probability assessment",
        "Impact severity rating",
        "Control measure planning"
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Assessment Tools</h1>
          <p className="text-muted-foreground">Comprehensive checklists and guides for job site evaluations</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessmentTools.map((tool) => (
          <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <tool.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
              </div>
              <p className="text-elec-light/80">{tool.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tool.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Use Assessment Tool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-xl">Assessment Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Before Starting Work</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• Always complete pre-job assessment</li>
                <li>• Verify all safety equipment is available</li>
                <li>• Review method statements and risk assessments</li>
                <li>• Ensure communication plan is in place</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">During Assessment</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• Document all findings clearly</li>
                <li>• Take photographs where appropriate</li>
                <li>• Involve experienced colleagues when uncertain</li>
                <li>• Don't proceed if conditions are unsafe</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobAssessment;
