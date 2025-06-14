
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, Play, CheckCircle } from 'lucide-react';

const EICProcessTab = () => {
  const [activeStep, setActiveStep] = useState(0);

  const eicSteps = [
    {
      title: 'Design & Planning',
      description: 'Plan the electrical installation design and compliance',
      tasks: [
        'Calculate electrical loads and demands',
        'Select appropriate protection devices',
        'Plan cable routes and installation methods',
        'Ensure compliance with BS 7671 requirements'
      ]
    },
    {
      title: 'Installation Execution',
      description: 'Carry out the electrical installation work',
      tasks: [
        'Install consumer units and distribution boards',
        'Run cables using appropriate methods',
        'Install socket outlets, switches, and accessories',
        'Complete earthing and bonding connections'
      ]
    },
    {
      title: 'Testing & Verification',
      description: 'Test the installation before energising',
      tasks: [
        'Continuity testing of all circuits',
        'Insulation resistance measurements',
        'Polarity and earth fault loop tests',
        'RCD operation verification'
      ]
    },
    {
      title: 'Certification',
      description: 'Complete EIC documentation and handover',
      tasks: [
        'Record all test results accurately',
        'Complete schedule of test results',
        'Issue Electrical Installation Certificate',
        'Provide client handover documentation'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            EIC Process Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertDescription>
              Follow this structured approach to complete an Electrical Installation Certificate (EIC) 
              for new installations, covering design, installation, testing, and certification phases.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Process Steps</h3>
              {eicSteps.map((step, index) => (
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
                  <CardTitle className="text-lg">{eicSteps[activeStep].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{eicSteps[activeStep].description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Tasks:</h4>
                    <ul className="space-y-2">
                      {eicSteps[activeStep].tasks.map((task, index) => (
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
              Start EIC Process
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICProcessTab;
