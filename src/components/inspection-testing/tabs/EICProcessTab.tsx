
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Play, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Wrench,
  FileCheck,
  Download
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EICProcessTab = () => {
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);

  const eicPhases = [
    {
      id: 'design-planning',
      title: 'Design & Planning',
      description: 'Circuit design and installation planning',
      duration: '30-60 mins',
      status: 'pending' as const,
      steps: [
        'Assess electrical load requirements',
        'Design circuit protection',
        'Plan cable routes and containment',
        'Calculate circuit parameters',
        'Select appropriate equipment'
      ]
    },
    {
      id: 'installation',
      title: 'Installation Work',
      description: 'Physical installation of electrical circuits',
      duration: '2-8 hours',
      status: 'pending' as const,
      steps: [
        'Install consumer unit modifications',
        'Run cables and install containment',
        'Install socket outlets and switches',
        'Connect earthing and bonding',
        'Label circuits and equipment'
      ]
    },
    {
      id: 'testing-verification',
      title: 'Testing & Verification',
      description: 'Initial verification testing of new installation',
      duration: '45-90 mins',
      status: 'pending' as const,
      steps: [
        'Continuity of protective conductors',
        'Insulation resistance testing',
        'Earth fault loop impedance',
        'RCD operation verification',
        'Polarity and functionality checks'
      ]
    },
    {
      id: 'certification',
      title: 'Certification & Handover',
      description: 'Complete EIC and handover to client',
      duration: '30-45 mins',
      status: 'pending' as const,
      steps: [
        'Complete Electrical Installation Certificate',
        'Provide operation and maintenance info',
        'Demonstrate new installation',
        'Schedule next inspection date',
        'Client sign-off and handover'
      ]
    }
  ];

  const handleStartPhase = (phaseId: string) => {
    setCurrentPhase(phaseId);
    console.log(`Starting EIC phase: ${phaseId}`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-elec-yellow" />
              EIC Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Phases:</span>
                <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                  4 Steps
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Est. Duration:</span>
                <span className="text-sm font-medium">3 - 10 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Compliance:</span>
                <Badge className="bg-green-600 text-white">BS 7671</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-purple-300">
              <Wrench className="h-5 w-5" />
              Installation Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>New circuits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Consumer unit upgrades</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Additional outlets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Complete rewires</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-green-300">
              <FileCheck className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full text-xs">
                <Download className="h-3 w-3 mr-2" />
                EIC Template
              </Button>
              <Button size="sm" variant="outline" className="w-full text-xs">
                <Wrench className="h-3 w-3 mr-2" />
                Design Tools
              </Button>
              <Button size="sm" variant="outline" className="w-full text-xs">
                <FileCheck className="h-3 w-3 mr-2" />
                Test Schedules
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Alert className="bg-green-500/10 border-green-500/30">
        <AlertTriangle className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>New Installation Requirements:</strong> All new electrical work must comply with current BS 7671 
          and building regulations. Ensure appropriate notifications to Building Control or Competent Person scheme.
        </AlertDescription>
      </Alert>

      {/* Process Phases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {eicPhases.map((phase, index) => (
          <Card 
            key={phase.id} 
            className={`border-elec-yellow/20 bg-elec-gray transition-all ${
              currentPhase === phase.id ? 'border-elec-yellow/50 bg-elec-yellow/5' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold">
                    {index + 1}
                  </div>
                  {phase.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{phase.duration}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{phase.description}</p>
              
              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-sm">Key Activities:</h4>
                <ul className="space-y-1">
                  {phase.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3 w-3 mt-1 text-green-400 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => handleStartPhase(phase.id)}
                className={`w-full ${
                  currentPhase === phase.id 
                    ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90' 
                    : 'bg-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/30'
                }`}
              >
                {currentPhase === phase.id ? (
                  <>
                    <Wrench className="h-4 w-4 mr-2" />
                    Continue Phase
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Phase
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Installation Types Quick Reference */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Common Installation Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Domestic Installations
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>• Additional socket circuits</li>
                <li>• Kitchen/bathroom upgrades</li>
                <li>• Garden/outbuilding supplies</li>
                <li>• Consumer unit replacement</li>
                <li>• EV charging points</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-elec-yellow" />
                Required Documentation
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>• Electrical Installation Certificate</li>
                <li>• Circuit schedule</li>
                <li>• Test result sheets</li>
                <li>• Building Control notification</li>
                <li>• Operation & maintenance info</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICProcessTab;
