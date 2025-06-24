
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Target, Users, Clock } from "lucide-react";

const PortfolioStepByStepGuide = () => {
  const steps = [
    {
      number: 1,
      title: "Understand Your Requirements",
      icon: Target,
      description: "Familiarise yourself with your apprenticeship framework requirements and assessment criteria.",
      tasks: [
        "Review your apprenticeship standard",
        "Understand the assessment criteria",
        "Identify required evidence types",
        "Note submission deadlines"
      ]
    },
    {
      number: 2,
      title: "Plan Your Portfolio Structure",
      icon: FileText,
      description: "Organise your portfolio into logical sections that align with your learning outcomes.",
      tasks: [
        "Create sections for each unit/module",
        "Plan evidence collection strategy",
        "Set up filing system (digital/physical)",
        "Create timeline for submissions"
      ]
    },
    {
      number: 3,
      title: "Collect and Document Evidence",
      icon: CheckCircle,
      description: "Gather evidence systematically throughout your apprenticeship journey.",
      tasks: [
        "Take photos of practical work",
        "Save certificates and qualifications",
        "Document workplace projects",
        "Collect witness testimonies"
      ]
    },
    {
      number: 4,
      title: "Reflect and Analyse",
      icon: Users,
      description: "Add reflective commentary to demonstrate your learning and development.",
      tasks: [
        "Write reflections for each piece of evidence",
        "Analyse what you learned",
        "Identify areas for improvement",
        "Link to theoretical knowledge"
      ]
    },
    {
      number: 5,
      title: "Review and Submit",
      icon: Clock,
      description: "Regularly review your portfolio quality and submit according to deadlines.",
      tasks: [
        "Check against assessment criteria",
        "Ensure all requirements met",
        "Proofread all written work",
        "Submit on time"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Step-by-Step Portfolio Building Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Follow this systematic approach to build a comprehensive portfolio that demonstrates 
            your competency and learning throughout your electrical apprenticeship.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.number} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <step.icon className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-white">{step.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{step.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-elec-yellow">Key Tasks:</h4>
                <ul className="space-y-1">
                  {step.tasks.map((task, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Portfolio Success Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-blue-200 text-sm space-y-2">
            <li>• Start collecting evidence from day one of your apprenticeship</li>
            <li>• Take photos and make notes immediately after completing tasks</li>
            <li>• Ask supervisors and colleagues for witness statements</li>
            <li>• Keep original documents and make backup copies</li>
            <li>• Review and update your portfolio regularly</li>
            <li>• Seek feedback from tutors and mentors</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStepByStepGuide;
