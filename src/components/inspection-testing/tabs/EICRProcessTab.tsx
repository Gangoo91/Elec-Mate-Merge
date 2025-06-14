
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Play, CheckCircle } from 'lucide-react';

const EICRProcessTab = () => {
  const [activeStep, setActiveStep] = useState(0);

  const eicrSteps = [
    {
      title: 'Pre-Inspection Planning',
      description: 'Review installation details and prepare for inspection',
      tasks: [
        'Review previous certificates and documentation',
        'Identify installation type and scope',
        'Plan testing sequence and equipment requirements',
        'Notify relevant parties of inspection schedule'
      ]
    },
    {
      title: 'Visual Inspection',
      description: 'Conduct thorough visual examination of the installation',
      tasks: [
        'Check consumer unit condition and labelling',
        'Inspect cable runs and fixing methods',
        'Examine socket outlets and switches',
        'Verify earthing and bonding arrangements'
      ]
    },
    {
      title: 'Testing Procedures',
      description: 'Perform electrical testing according to BS 7671',
      tasks: [
        'Continuity of protective conductors',
        'Insulation resistance testing',
        'Polarity verification',
        'Earth fault loop impedance measurement',
        'RCD testing and functionality checks'
      ]
    },
    {
      title: 'Report Generation',
      description: 'Complete EICR documentation and recommendations',
      tasks: [
        'Record all test results and observations',
        'Classify any defects found (C1, C2, C3, FI)',
        'Provide improvement recommendations',
        'Generate professional EICR certificate'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            EICR Process Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertDescription>
              Follow this structured approach to conduct a comprehensive Electrical Installation Condition Report (EICR) 
              in accordance with BS 7671 requirements and industry best practices.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Process Steps</h3>
              {eicrSteps.map((step, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all ${
                    activeStep === index 
                      ? 'border-elec-yellow bg-elec-yellow/10' 
                      : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        activeStep === index ? 'bg-elec-yellow text-black' : 'bg-gray-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Step Details</h3>
              <Card className="border-elec-yellow/30 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle className="text-lg">{eicrSteps[activeStep].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{eicrSteps[activeStep].description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Tasks:</h4>
                    <ul className="space-y-2">
                      {eicrSteps[activeStep].tasks.map((task, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Play className="h-4 w-4 mr-2" />
              Start EICR Process
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRProcessTab;
