
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, CheckCircle, AlertCircle, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OnJobBS7671RunThrough = () => {
  const inspectionSteps = [
    {
      step: 1,
      title: "Initial Verification",
      description: "Complete inspection and testing process for new installations",
      duration: "2-4 hours",
      complexity: "Advanced"
    },
    {
      step: 2, 
      title: "Periodic Inspection",
      description: "EICR inspection process for existing installations",
      duration: "1-3 hours",
      complexity: "Intermediate"
    },
    {
      step: 3,
      title: "Visual Inspection",
      description: "Step-by-step visual inspection checklist",
      duration: "30-60 mins",
      complexity: "Beginner"
    },
    {
      step: 4,
      title: "Testing Procedures", 
      description: "Complete testing sequence with MFT",
      duration: "1-2 hours",
      complexity: "Intermediate"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">BS7671 Inspection & Testing Run-Through</h1>
          <p className="text-muted-foreground">Complete step-by-step inspection and testing process</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inspectionSteps.map((step) => (
          <Card key={step.step} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold">
                    {step.step}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-500/10 rounded text-blue-400">
                        {step.duration}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        step.complexity === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                        step.complexity === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {step.complexity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-elec-light/80 mb-4">{step.description}</p>
              <Button className="w-full" size="sm">
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Run-Through
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            BS7671 Key Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Visual Inspection Must Include</h3>
              <ul className="text-xs space-y-1 text-elec-light/80">
                <li>• Connection of conductors</li>
                <li>• Identification of conductors</li>
                <li>• Routing of cables</li>
                <li>• Selection of conductors</li>
                <li>• Connection of single-pole devices</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Testing Sequence</h3>
              <ul className="text-xs space-y-1 text-elec-light/80">
                <li>• Continuity of protective conductors</li>
                <li>• Continuity of ring final circuits</li>
                <li>• Insulation resistance</li>
                <li>• Protection by SELV/PELV/LV</li>
                <li>• Polarity</li>
                <li>• Earth fault loop impedance</li>
                <li>• RCD operation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Documentation Required</h3>
              <ul className="text-xs space-y-1 text-elec-light/80">
                <li>• Electrical Installation Certificate</li>
                <li>• Schedule of Inspections</li>
                <li>• Schedule of Test Results</li>
                <li>• Circuit charts/schedules</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobBS7671RunThrough;
