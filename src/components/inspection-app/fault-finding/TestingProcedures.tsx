
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { TestTube, Zap, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TestingStep {
  id: string;
  title: string;
  description: string;
  safetyNotes: string[];
  equipment: string[];
  procedure: string[];
  acceptableLimits: string;
  regulation: string;
}

const testingProcedures: TestingStep[] = [
  {
    id: 'visual',
    title: 'Visual Inspection',
    description: 'Comprehensive visual examination of the electrical installation',
    safetyNotes: [
      'Installation must be isolated before inspection',
      'Use appropriate PPE',
      'Check for presence of asbestos in older installations'
    ],
    equipment: [
      'Torch/adequate lighting',
      'PPE (safety glasses, gloves)',
      'Camera for documentation',
      'Checklist/inspection forms'
    ],
    procedure: [
      'Check consumer unit condition and labelling',
      'Inspect cables for damage, routing, and support',
      'Examine accessories for cracks, burns, or damage',
      'Verify earthing and bonding arrangements',
      'Check IP ratings for environmental conditions',
      'Document all observations and defects'
    ],
    acceptableLimits: 'No visible damage, adequate IP ratings, compliant installations',
    regulation: 'BS 7671 Section 610'
  },
  {
    id: 'continuity',
    title: 'Continuity Testing',
    description: 'Testing continuity of protective conductors and ring final circuit conductors',
    safetyNotes: [
      'Installation must be isolated and proven dead',
      'Remove all lamps and portable equipment',
      'Link phase and neutral at furthest point for ring circuits'
    ],
    equipment: [
      'Low resistance ohmmeter',
      'Test leads',
      'Temporary links',
      'Suitable test probes'
    ],
    procedure: [
      'Test continuity of protective conductors',
      'Test ring final circuit continuity (if applicable)',
      'Measure R1 + R2 values for all circuits',
      'Verify correct polarity throughout',
      'Check continuity of supplementary bonding',
      'Record all readings on test sheet'
    ],
    acceptableLimits: 'R1 + R2 ≤ maximum values in BS 7671 Tables',
    regulation: 'BS 7671 Section 612.2'
  },
  {
    id: 'insulation',
    title: 'Insulation Resistance Testing',
    description: 'Testing insulation resistance between conductors and earth',
    safetyNotes: [
      'Remove or isolate electronic equipment',
      'Check test voltage is appropriate for installation',
      'Ensure all switches are closed for testing'
    ],
    equipment: [
      'Insulation resistance tester (500V/1000V)',
      'Test leads',
      'Warning notices',
      'Electronic equipment isolation materials'
    ],
    procedure: [
      'Isolate or remove electronic equipment',
      'Close all switches and remove lamps',
      'Test between phase and neutral conductors',
      'Test between phase conductors and earth',
      'Test between neutral conductor and earth',
      'Test three-phase installations appropriately',
      'Record minimum values found'
    ],
    acceptableLimits: 'Minimum 1MΩ for final circuits, 0.5MΩ acceptable with investigation',
    regulation: 'BS 7671 Section 612.3'
  },
  {
    id: 'polarity',
    title: 'Polarity Testing',
    description: 'Verification of correct polarity throughout the installation',
    safetyNotes: [
      'Test with installation isolated',
      'Verify test equipment calibration',
      'Check polarity at origin before testing circuits'
    ],
    equipment: [
      'Continuity tester',
      'Test leads',
      'Polarity testing device',
      'Documentation materials'
    ],
    procedure: [
      'Check polarity at consumer unit/distribution board',
      'Test polarity at all socket outlets',
      'Verify polarity of all switches',
      'Check polarity of fixed equipment connections',
      'Test ES lamp holders for correct connections',
      'Verify centre contact of ES holders connected to phase'
    ],
    acceptableLimits: 'Phase conductor connected to phase terminals only',
    regulation: 'BS 7671 Section 612.6'
  },
  {
    id: 'rcd',
    title: 'RCD Testing',
    description: 'Testing the operation of residual current devices',
    safetyNotes: [
      'Ensure RCD can be safely tested under load',
      'Check test current does not exceed equipment ratings',
      'Verify test equipment is suitable for RCD type'
    ],
    equipment: [
      'RCD tester',
      'Test leads',
      'Stop watch (if required)',
      'RCD test record sheets'
    ],
    procedure: [
      'Check RCD operates with test button',
      'Test at 50% of rated current (should not trip)',
      'Test at 100% of rated current (should trip within limits)',
      'Test at 150% of rated current (should trip quickly)',
      'Test unwanted tripping resistance (if applicable)',
      'Record all test times and currents'
    ],
    acceptableLimits: '30mA RCD: ≤300ms at 1× rating, ≤40ms at 5× rating',
    regulation: 'BS 7671 Section 612.13'
  }
];

const TestingProcedures = () => {
  const [checkedSteps, setCheckedSteps] = useState<{ [key: string]: boolean }>({});
  const [activeTest, setActiveTest] = useState('visual');

  const handleStepCheck = (testId: string, stepIndex: number) => {
    const key = `${testId}-${stepIndex}`;
    setCheckedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getTestCompletion = (testId: string) => {
    const test = testingProcedures.find(t => t.id === testId);
    if (!test) return 0;
    
    const totalSteps = test.procedure.length;
    const completedSteps = test.procedure.filter((_, idx) => 
      checkedSteps[`${testId}-${idx}`]
    ).length;
    
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const getCurrentTest = () => testingProcedures.find(t => t.id === activeTest);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-400" />
            Enhanced Testing Procedures
            <Badge className="ml-auto bg-blue-500">BS 7671 Compliant</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileTabs value={activeTest} onValueChange={setActiveTest}>
            <MobileTabsList className="grid w-full grid-cols-5 bg-muted">
              {testingProcedures.map((test) => (
                <MobileTabsTrigger 
                  key={test.id} 
                  value={test.id}
                  className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium">{test.title.split(' ')[0]}</span>
                    <div className="w-8 h-1 bg-neutral-600 rounded-full mt-1">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all" 
                        style={{ width: `${getTestCompletion(test.id)}%` }}
                      />
                    </div>
                  </div>
                </MobileTabsTrigger>
              ))}
            </MobileTabsList>

            {testingProcedures.map((test) => (
              <MobileTabsContent key={test.id} value={test.id} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Test Information */}
                  <div className="space-y-4">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-elec-yellow text-lg flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          {test.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-500 text-foreground">{test.regulation}</Badge>
                          <Badge className={`${getTestCompletion(test.id) === 100 ? 'bg-green-500' : 'bg-orange-500'}`}>
                            {getTestCompletion(test.id)}% Complete
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-300">{test.description}</p>
                        
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <h4 className="font-semibold text-green-400 mb-2">Acceptable Limits</h4>
                          <p className="text-sm text-gray-300">{test.acceptableLimits}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Safety Notes */}
                    <Card className="bg-red-500/10 border-red-500/30">
                      <CardHeader>
                        <CardTitle className="text-red-400 text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Safety Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {test.safetyNotes.map((note, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Required Equipment */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-blue-400 text-lg">Required Equipment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {test.equipment.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Testing Procedure */}
                  <div>
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-400" />
                          Testing Procedure
                        </CardTitle>
                        <Progress value={getTestCompletion(test.id)} className="h-2" />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {test.procedure.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                            <Checkbox
                              id={`${test.id}-step-${idx}`}
                              checked={checkedSteps[`${test.id}-${idx}`] || false}
                              onCheckedChange={() => handleStepCheck(test.id, idx)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={`${test.id}-step-${idx}`}
                                className={`cursor-pointer text-sm leading-relaxed ${
                                  checkedSteps[`${test.id}-${idx}`] 
                                    ? 'text-green-400 line-through' 
                                    : 'text-gray-300'
                                }`}
                              >
                                <span className="font-semibold text-orange-400 mr-2">
                                  Step {idx + 1}:
                                </span>
                                {step}
                              </label>
                            </div>
                          </div>
                        ))}

                        {getTestCompletion(test.id) === 100 && (
                          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="flex items-center gap-2 text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-semibold">Test Complete</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              All steps completed. Record results and move to next test.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </MobileTabsContent>
            ))}
          </MobileTabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingProcedures;
