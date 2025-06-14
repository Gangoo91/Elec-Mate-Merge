
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Play, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Settings,
  Download
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EICRProcessTab = () => {
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);

  const eicrPhases = [
    {
      id: 'planning',
      title: 'Planning & Preparation',
      description: 'Initial assessment and preparation for EICR',
      duration: '15-30 mins',
      status: 'pending' as const,
      steps: [
        'Review previous reports and documentation',
        'Identify installation characteristics',
        'Plan inspection scope and limitations',
        'Prepare necessary equipment and forms'
      ]
    },
    {
      id: 'visual-inspection',
      title: 'Visual Inspection',
      description: 'Comprehensive visual assessment of the installation',
      duration: '45-90 mins',
      status: 'pending' as const,
      steps: [
        'Consumer unit and distribution boards',
        'Cable runs and fixings',
        'Socket outlets and switches',
        'Earthing and bonding arrangements',
        'Protection devices and ratings'
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Measurements',
      description: 'Electrical testing of all circuits',
      duration: '60-120 mins',
      status: 'pending' as const,
      steps: [
        'Continuity of protective conductors',
        'Insulation resistance testing',
        'Earth fault loop impedance',
        'RCD operation testing',
        'Polarity verification'
      ]
    },
    {
      id: 'documentation',
      title: 'Documentation & Reporting',
      description: 'Complete EICR report generation',
      duration: '30-45 mins',
      status: 'pending' as const,
      steps: [
        'Record all test results',
        'Classify any defects found',
        'Generate recommendations',
        'Complete EICR certificate',
        'Provide client summary'
      ]
    }
  ];

  const handleStartPhase = (phaseId: string) => {
    setCurrentPhase(phaseId);
    // This would integrate with the actual workflow
    console.log(`Starting EICR phase: ${phaseId}`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-elec-yellow" />
              EICR Overview
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
                <span className="text-sm font-medium">2.5 - 4.5 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Compliance:</span>
                <Badge className="bg-green-600 text-white">BS 7671</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-blue-300">
              <Eye className="h-5 w-5" />
              Inspection Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Safety compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Electrical condition</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Code compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Deterioration assessment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-orange-300">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full text-xs">
                <Download className="h-3 w-3 mr-2" />
                EICR Template
              </Button>
              <Button size="sm" variant="outline" className="w-full text-xs">
                <FileText className="h-3 w-3 mr-2" />
                Previous Reports
              </Button>
              <Button size="sm" variant="outline" className="w-full text-xs">
                <Eye className="h-3 w-3 mr-2" />
                Guidance Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Alert className="bg-yellow-500/10 border-yellow-500/30">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-200">
          <strong>EICR Requirements:</strong> An EICR must be carried out by a competent person. 
          Ensure you have appropriate qualifications and test equipment calibrated within the last 12 months.
        </AlertDescription>
      </Alert>

      {/* Process Phases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {eicrPhases.map((phase, index) => (
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
                    <Settings className="h-4 w-4 mr-2" />
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

      {/* Process Flow Info */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">EICR Process Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {eicrPhases.map((phase, index) => (
              <div key={phase.id} className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  currentPhase === phase.id 
                    ? 'bg-elec-yellow text-black' 
                    : 'bg-elec-yellow/20 text-elec-yellow'
                }`}>
                  {index + 1}
                </div>
                <h4 className="font-medium text-sm mb-1">{phase.title}</h4>
                <p className="text-xs text-muted-foreground">{phase.duration}</p>
                {index < eicrPhases.length - 1 && (
                  <div className="hidden md:block absolute mt-6 ml-12 w-8 h-0.5 bg-elec-yellow/30"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRProcessTab;
