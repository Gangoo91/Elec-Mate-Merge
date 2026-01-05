
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileTabs, MobileTabsContent, MobileTabsList, MobileTabsTrigger } from '@/components/ui/mobile-tabs';
import { FileText, Lightbulb, AlertTriangle, CheckCircle, Calculator, Wrench, BookOpen } from 'lucide-react';

const PracticalGuidance = () => {
  const [selectedScenario, setSelectedScenario] = useState('domestic-cu');

  const practicalScenarios = {
    'domestic-cu': {
      title: 'Domestic Consumer Unit Upgrade',
      complexity: 'intermediate',
      duration: '4-6 hours',
      regulations: ['314.1', '421.1.7', '411.3.3', '526.3'],
      overview: 'Complete guide to upgrading a domestic consumer unit with RCD protection',
      steps: [
        {
          step: 'Planning & Assessment',
          details: 'Survey existing installation, calculate load requirements, plan circuit distribution',
          regulations: ['314.1 - Circuit division', '311.1 - Load assessment'],
          tips: ['Document existing circuits', 'Check if tails need upgrading', 'Consider future expansion']
        },
        {
          step: 'Isolation & Safety',
          details: 'Arrange supply isolation with DNO, implement safety measures',
          regulations: ['537.2 - Isolation requirements'],
          tips: ['Book DNO appointment', 'Prepare alternative supply if needed', 'Safety barriers and signage']
        },
        {
          step: 'Installation',
          details: 'Install new consumer unit, connect circuits with appropriate protection',
          regulations: ['526.3 - Connections', '411.3.3 - RCD protection'],
          tips: ['Label circuits clearly', 'Use appropriate cable markers', 'Maintain cable segregation']
        },
        {
          step: 'Testing & Certification',
          details: 'Complete full testing schedule, issue EIC',
          regulations: ['610 - Initial verification', '612 - Testing'],
          tips: ['Test in correct sequence', 'Check RCD operation', 'Verify Ze before final connection']
        }
      ],
      commonIssues: [
        'Existing circuits not suitable for RCD protection',
        'Inadequate earthing system',
        'Mixed cable types requiring special consideration',
        'Limited space for new consumer unit'
      ],
      tools: ['Multimeter', 'RCD tester', 'Loop impedance tester', 'Non-contact voltage tester']
    },
    'socket-circuit': {
      title: 'Adding Socket Circuit',
      complexity: 'basic',
      duration: '2-3 hours',
      regulations: ['433.1', '411.3.3', '522.6.202'],
      overview: 'Safe installation of new socket outlet circuit with RCD protection',
      steps: [
        {
          step: 'Circuit Design',
          details: 'Calculate load, select cable size and protection',
          regulations: ['433.1 - Overcurrent protection', '523.1 - Cable selection'],
          tips: ['Consider diversity factors', 'Check volt drop calculations', 'Plan cable route']
        },
        {
          step: 'Cable Installation',
          details: 'Install cable using appropriate methods',
          regulations: ['522 - Cable installation', '522.6.202 - Buried cables'],
          tips: ['Maintain 50mm depth or use RCD', 'Avoid cable damage', 'Use appropriate clips/supports']
        },
        {
          step: 'Connection & Protection',
          details: 'Connect at consumer unit with 30mA RCD protection',
          regulations: ['411.3.3 - Additional protection'],
          tips: ['Use RCBO for best protection', 'Label circuit clearly', 'Check connections are secure']
        },
        {
          step: 'Testing',
          details: 'Complete testing and documentation',
          regulations: ['612 - Testing requirements'],
          tips: ['Test continuity first', 'Check insulation resistance', 'Verify RCD operation']
        }
      ],
      commonIssues: [
        'Cable route conflicts with other services',
        'Difficulty accessing consumer unit',
        'Existing circuits already at capacity',
        'RCD sensitivity issues with other circuits'
      ],
      tools: ['Cable detector', 'SDS drill', 'Cable pulling system', 'Testing equipment']
    },
    'lighting-upgrade': {
      title: 'LED Lighting Upgrade',
      complexity: 'basic',
      duration: '1-2 hours',
      regulations: ['559.4.1', '411.3.3'],
      overview: 'Converting existing lighting to LED with consideration for compatibility',
      steps: [
        {
          step: 'Compatibility Check',
          details: 'Verify existing dimmer and switch compatibility',
          regulations: ['559.4.1 - Control compatibility'],
          tips: ['Check dimmer type', 'Verify minimum load requirements', 'Consider inrush current']
        },
        {
          step: 'Circuit Assessment',
          details: 'Check circuit capacity and protection',
          regulations: ['433.1 - Protection coordination'],
          tips: ['Calculate new load', 'Check if MCB rating suitable', 'Consider cable capacity']
        },
        {
          step: 'Installation',
          details: 'Install LED luminaires and drivers',
          regulations: ['559.5 - Installation requirements'],
          tips: ['Maintain IP ratings', 'Ensure adequate cooling', 'Use compatible drivers']
        },
        {
          step: 'Testing & Commissioning',
          details: 'Test installation and verify operation',
          regulations: ['612 - Testing'],
          tips: ['Check all switching operates correctly', 'Verify dimming operation', 'Test emergency circuits separately']
        }
      ],
      commonIssues: [
        'Dimmer incompatibility causing flicker',
        'Minimum load not met on dimmer circuits',
        'EMI interference with other equipment',
        'Heat build-up in enclosed luminaires'
      ],
      tools: ['LED tester', 'Light meter', 'Digital multimeter', 'Thermal camera (optional)']
    },
    'ev-charging': {
      title: 'EV Charging Point Installation',
      complexity: 'advanced',
      duration: '6-8 hours',
      regulations: ['722.531.2.101', '722.534', '722.411.4.1'],
      overview: 'Complete EV charging point installation with all safety requirements',
      steps: [
        {
          step: 'Site Survey & Design',
          details: 'Assess supply capacity, earthing system and installation requirements',
          regulations: ['722.311 - Assessment', '722.411.4.1 - Earthing'],
          tips: ['Check DNO approval requirements', 'Assess existing load', 'Plan cable route to charging point']
        },
        {
          step: 'Supply Modifications',
          details: 'Install dedicated circuit with appropriate protection',
          regulations: ['722.531.2.101 - RCD protection', '722.534 - Surge protection'],
          tips: ['Type A or B RCD required', 'SPD at origin recommended', 'Consider load balancing']
        },
        {
          step: 'Installation & Connection',
          details: 'Install charging unit and make final connections',
          regulations: ['722.52 - Wiring systems'],
          tips: ['Secure mounting essential', 'IP rating for location', 'Cable glands and sealing']
        },
        {
          step: 'Testing & Commissioning',
          details: 'Complete testing including DC fault detection',
          regulations: ['722.6 - Verification'],
          tips: ['Test Type A/B RCD operation', 'Verify earth continuity', 'Check charging point operation']
        }
      ],
      commonIssues: [
        'Inadequate supply capacity requiring upgrade',
        'PME earthing complications',
        'Planning permission requirements',
        'DNO notification and approval delays'
      ],
      tools: ['Type A/B RCD tester', 'Clamp meter', 'Power quality analyser', 'Charging point tester']
    }
  };

  const currentScenario = practicalScenarios[selectedScenario as keyof typeof practicalScenarios];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Practical Guidance</h2>
        <p className="text-sm sm:text-base text-gray-300">Step-by-step guides for common electrical work scenarios</p>
      </div>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(practicalScenarios).map(([key, scenario]) => (
          <Card 
            key={key}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedScenario === key 
                ? 'bg-elec-yellow/10 border-elec-yellow' 
                : 'bg-card border-border hover:border-elec-yellow/50'
            }`}
            onClick={() => setSelectedScenario(key)}
          >
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-2">{scenario.title}</h3>
              <div className="space-y-2">
                <Badge className={getComplexityColor(scenario.complexity)}>
                  {scenario.complexity.toUpperCase()}
                </Badge>
                <p className="text-xs text-gray-400">{scenario.duration}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Scenario Content */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-elec-yellow text-xl mb-2">{currentScenario.title}</CardTitle>
              <p className="text-gray-300">{currentScenario.overview}</p>
            </div>
            <div className="text-right">
              <Badge className={getComplexityColor(currentScenario.complexity)}>
                {currentScenario.complexity.toUpperCase()}
              </Badge>
              <p className="text-sm text-gray-400 mt-1">{currentScenario.duration}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {currentScenario.regulations.map((reg, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {reg}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <MobileTabs defaultValue="steps" className="w-full">
            <MobileTabsList className="grid w-full grid-cols-3 bg-muted">
              <MobileTabsTrigger value="steps">Step-by-Step</MobileTabsTrigger>
              <MobileTabsTrigger value="issues">Common Issues</MobileTabsTrigger>
              <MobileTabsTrigger value="tools">Tools Required</MobileTabsTrigger>
            </MobileTabsList>

            <MobileTabsContent value="steps" className="mt-6">
              <div className="space-y-6">
                {currentScenario.steps.map((step, index) => (
                  <Card key={index} className="bg-muted border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <CardTitle className="text-foreground text-lg">{step.step}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{step.details}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-elec-yellow" />
                            Key Regulations
                          </h4>
                          <div className="space-y-1">
                            {step.regulations.map((reg, idx) => (
                              <p key={idx} className="text-sm text-gray-400">{reg}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-elec-yellow" />
                            Practical Tips
                          </h4>
                          <div className="space-y-1">
                            {step.tips.map((tip, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0" />
                                <p className="text-sm text-gray-400">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </MobileTabsContent>

            <MobileTabsContent value="issues" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Common Issues & Solutions
                </h3>
                <div className="space-y-3">
                  {currentScenario.commonIssues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MobileTabsContent>

            <MobileTabsContent value="tools" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  Required Tools & Equipment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentScenario.tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-foreground">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MobileTabsContent>
          </MobileTabs>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculation Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Load Calculation Worksheet
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Cable Sizing Calculator
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Voltage Drop Calculator
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentation Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Installation Checklist
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Risk Assessment Template
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Method Statement Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticalGuidance;
