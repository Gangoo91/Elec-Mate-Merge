
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Zap, AlertTriangle, CheckCircle, Clock, FileText, Calculator } from 'lucide-react';

const TestingStandardsSection = () => {
  const [selectedTestType, setSelectedTestType] = useState('continuity');

  const testStandards = {
    continuity: {
      title: 'Continuity Testing',
      regulation: 'Regulation 612.2',
      description: 'Testing protective conductor continuity and ring circuit continuity',
      requirements: [
        { item: 'Test current', value: 'Between 4mA and 24mA DC', critical: true },
        { item: 'Maximum resistance', value: 'R1 + R2 ≤ tabulated values', critical: true },
        { item: 'Ring circuit test', value: 'Cross-connection method required', critical: false },
        { item: 'Test leads resistance', value: 'Must be nulled out first', critical: true }
      ],
      procedure: [
        'Isolate circuit and prove dead',
        'Null test leads if required',
        'Test protective conductor continuity',
        'For rings: cross-connect and test',
        'Record R1, R2, and R1+R2 values'
      ],
      commonIssues: [
        'High resistance joints',
        'Broken neutral in ring circuits',
        'Poor earth connections',
        'Parallel earth paths affecting readings'
      ]
    },
    insulation: {
      title: 'Insulation Resistance',
      regulation: 'Regulation 612.3',
      description: 'Testing insulation between conductors and to earth',
      requirements: [
        { item: 'Test voltage', value: '250V DC (SELV), 500V DC (LV)', critical: true },
        { item: 'Minimum resistance', value: '≥1MΩ (≥0.5MΩ for some circuits)', critical: true },
        { item: 'Test duration', value: 'Until reading stabilises', critical: false },
        { item: 'Circuit isolation', value: 'All equipment disconnected', critical: true }
      ],
      procedure: [
        'Isolate circuit completely',
        'Remove/isolate sensitive equipment',
        'Select appropriate test voltage',
        'Test between all conductor combinations',
        'Test all conductors to earth'
      ],
      commonIssues: [
        'Moisture ingress reducing readings',
        'Equipment not properly isolated',
        'Parallel paths affecting results',
        'Surge protection devices not isolated'
      ]
    },
    zs: {
      title: 'Earth Fault Loop Impedance',
      regulation: 'Regulation 612.9',
      description: 'Testing Ze, Zs and prospective fault current',
      requirements: [
        { item: 'Maximum Zs', value: 'Per BS 7671 Tables 41.2-41.5', critical: true },
        { item: 'Test method', value: 'Loop impedance tester', critical: true },
        { item: 'RCD isolation', value: 'Must be isolated during test', critical: true },
        { item: 'Temperature correction', value: 'Apply factors if required', critical: false }
      ],
      procedure: [
        'Test external earth fault loop impedance (Ze)',
        'Test earth fault loop impedance (Zs) at each point',
        'Isolate RCDs during testing',
        'Check readings against maximum values',
        'Apply temperature correction if needed'
      ],
      commonIssues: [
        'Zs readings too high for protective device',
        'RCD not isolated during test',
        'Poor earth electrode connection',
        'TNS system mistaken for TN-C-S'
      ]
    },
    rcd: {
      title: 'RCD Testing',
      regulation: 'Regulation 612.13',
      description: 'Testing residual current device operation and effectiveness',
      requirements: [
        { item: 'Trip time at IΔn', value: '≤300ms (≤40ms for Type S)', critical: true },
        { item: 'Trip time at 5×IΔn', value: '≤40ms', critical: true },
        { item: 'Non-trip at 50% IΔn', value: 'Should not trip', critical: true },
        { item: 'Test current accuracy', value: '±10% of nominal', critical: false }
      ],
      procedure: [
        'Check RCD rating and type',
        'Test at 50% rated current (should not trip)',
        'Test at 100% rated current (should trip)',
        'Test at 500% rated current (fast trip)',
        'Test ramp function if available'
      ],
      commonIssues: [
        'RCD tripping at 50% current',
        'Slow tripping times',
        'RCD not tripping at all',
        'Type AC RCD with DC components'
      ]
    }
  };

  const testEquipment = [
    {
      name: 'Multifunction Tester',
      uses: ['Insulation resistance', 'Continuity', 'RCD testing', 'Loop impedance'],
      calibration: 'Annual calibration required',
      standards: 'IEC 61557 series'
    },
    {
      name: 'Loop Impedance Tester',
      uses: ['Earth fault loop impedance', 'Prospective fault current'],
      calibration: 'Annual calibration required',
      standards: 'IEC 61557-3'
    },
    {
      name: 'RCD Tester',
      uses: ['RCD trip times', 'RCD sensitivity', 'Ramp testing'],
      calibration: 'Annual calibration required',
      standards: 'IEC 61557-6'
    },
    {
      name: 'Continuity Tester',
      uses: ['Low resistance measurement', 'Protective conductor continuity'],
      calibration: 'Annual calibration required',
      standards: 'IEC 61557-4'
    }
  ];

  const currentTest = testStandards[selectedTestType as keyof typeof testStandards];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Testing Standards & Procedures</h2>
        <p className="text-white">Complete guide to electrical testing per BS 7671 Part 6</p>
      </div>

      {/* Test Type Selection */}
      <SmartTabs
        tabs={[
          {
            value: "continuity",
            label: "Continuity",
            content: (
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Test Details */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-elec-yellow flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          {testStandards.continuity.title}
                        </CardTitle>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {testStandards.continuity.regulation}
                        </Badge>
                      </div>
                      <p className="text-white">{testStandards.continuity.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Test Requirements</h4>
                        <div className="space-y-2">
                          {testStandards.continuity.requirements.map((req, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <span className="text-sm text-white">{req.item}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{req.value}</span>
                                {req.critical && (
                                  <AlertTriangle className="h-4 w-4 text-red-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Procedure */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-elec-yellow flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Test Procedure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {testStandards.continuity.procedure.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-white flex-1">{step}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          Common Issues
                        </h4>
                        <div className="space-y-2">
                          {testStandards.continuity.commonIssues.map((issue, index) => (
                            <div key={index} className="text-sm text-white/80 flex items-center gap-2">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                              {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          },
          {
            value: "insulation",
            label: "Insulation",
            content: (
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Test Details */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-elec-yellow flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          {testStandards.insulation.title}
                        </CardTitle>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {testStandards.insulation.regulation}
                        </Badge>
                      </div>
                      <p className="text-white">{testStandards.insulation.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Test Requirements</h4>
                        <div className="space-y-2">
                          {testStandards.insulation.requirements.map((req, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <span className="text-sm text-white">{req.item}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{req.value}</span>
                                {req.critical && (
                                  <AlertTriangle className="h-4 w-4 text-red-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Procedure */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-elec-yellow flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Test Procedure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {testStandards.insulation.procedure.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-white flex-1">{step}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          Common Issues
                        </h4>
                        <div className="space-y-2">
                          {testStandards.insulation.commonIssues.map((issue, index) => (
                            <div key={index} className="text-sm text-white/80 flex items-center gap-2">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                              {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          },
          {
            value: "zs",
            label: "Loop Impedance",
            content: (
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Test Details */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-elec-yellow flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          {testStandards.zs.title}
                        </CardTitle>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {testStandards.zs.regulation}
                        </Badge>
                      </div>
                      <p className="text-white">{testStandards.zs.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Test Requirements</h4>
                        <div className="space-y-2">
                          {testStandards.zs.requirements.map((req, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <span className="text-sm text-white">{req.item}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{req.value}</span>
                                {req.critical && (
                                  <AlertTriangle className="h-4 w-4 text-red-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Procedure */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-elec-yellow flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Test Procedure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {testStandards.zs.procedure.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-white flex-1">{step}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          Common Issues
                        </h4>
                        <div className="space-y-2">
                          {testStandards.zs.commonIssues.map((issue, index) => (
                            <div key={index} className="text-sm text-white/80 flex items-center gap-2">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                              {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          },
          {
            value: "rcd",
            label: "RCD Testing",
            content: (
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Test Details */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-elec-yellow flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          {testStandards.rcd.title}
                        </CardTitle>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {testStandards.rcd.regulation}
                        </Badge>
                      </div>
                      <p className="text-white">{testStandards.rcd.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Test Requirements</h4>
                        <div className="space-y-2">
                          {testStandards.rcd.requirements.map((req, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <span className="text-sm text-white">{req.item}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{req.value}</span>
                                {req.critical && (
                                  <AlertTriangle className="h-4 w-4 text-red-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Procedure */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-elec-yellow flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Test Procedure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {testStandards.rcd.procedure.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-white flex-1">{step}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          Common Issues
                        </h4>
                        <div className="space-y-2">
                          {testStandards.rcd.commonIssues.map((issue, index) => (
                            <div key={index} className="text-sm text-white/80 flex items-center gap-2">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                              {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          }
        ]}
        value={selectedTestType}
        onValueChange={setSelectedTestType}
        defaultValue="continuity"
        className="w-full"
      />

      {/* Test Equipment Guide */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Test Equipment Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testEquipment.map((equipment, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-2">{equipment.name}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-white/80 mb-1">Used for:</p>
                    <div className="flex flex-wrap gap-1">
                      {equipment.uses.map((use, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/80">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {equipment.calibration}
                  </p>
                  <p className="text-xs text-white/80">
                    <CheckCircle className="inline h-3 w-3 mr-1" />
                    {equipment.standards}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Test Sequence Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>1. Continuity</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>2. Insulation Resistance</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>3. Polarity</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>4. Earth Fault Loop Impedance</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>5. RCD Operation</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Safety Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Always isolate and prove dead</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Check test equipment calibration</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <CheckCircle className="h-4 w-4" />
                <span>Use appropriate PPE</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>Follow permit to work procedures</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestingStandardsSection;
