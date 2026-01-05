
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Zap, Shield, CheckCircle2, AlertTriangle, BookOpen, Calculator } from 'lucide-react';

interface TestMethod {
  id: string;
  name: string;
  description: string;
  regulation: string;
  when: string;
  procedure: string[];
  acceptableLimits: string;
  practicalTips: string[];
  commonIssues: string[];
}

const ContinuityTestingMethodsCard = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('r1r2');

  const testMethods: TestMethod[] = [
    {
      id: 'r1r2',
      name: 'R1+R2 Method',
      description: 'Combined resistance of line conductor and circuit protective conductor',
      regulation: 'BS 7671 Regulation 612.2.1',
      when: 'For all final circuits to verify protective conductor continuity',
      procedure: [
        'Ensure circuit is safely isolated and secured',
        'At the distribution board, temporarily connect line and CPC together',
        'Using low resistance ohmmeter, test between line and CPC at each outlet',
        'Record the highest reading (furthest point from board)',
        'For ring circuits, test both legs separately',
        'Verify readings are consistent with cable length and conductor sizes'
      ],
      acceptableLimits: 'Must be suitable for earth fault loop impedance requirements. Typically <1.67Ω for ring circuits',
      practicalTips: [
        'Use adequate test current (minimum 200mA for protective conductors)',
        'Account for test lead resistance in measurements',
        'Test at actual connection points, not through socket outlets',
        'For ring circuits, readings for both legs should be similar'
      ],
      commonIssues: [
        'High readings due to loose connections',
        'Parallel paths affecting ring circuit readings',
        'Not testing at the furthest point of the circuit',
        'Inadequate test current giving unreliable results'
      ]
    },
    {
      id: 'main-bonding',
      name: 'Main Protective Bonding',
      description: 'Continuity of main equipotential bonding conductors',
      regulation: 'BS 7671 Regulation 544.1',
      when: 'For all main protective bonding connections to services',
      procedure: [
        'Identify all services requiring main protective bonding',
        'Isolate services where possible for safety',
        'Test from main earthing terminal to each bonding connection',
        'Use higher test current (up to 1.5A for main bonding conductors)',
        'Test the bonding conductor, not through the service itself',
        'Record individual readings for each bonded service'
      ],
      acceptableLimits: 'Should be consistent with conductor size and length. Typically <0.05Ω for most installations',
      practicalTips: [
        'Test at the connection point, not through metalwork',
        'Use higher test current for accurate readings on larger conductors',
        'Check bonding clamp integrity during testing',
        'Consider parallel paths through other metalwork'
      ],
      commonIssues: [
        'Testing through services rather than bonding conductors',
        'Corroded or loose bonding connections',
        'Inadequate bonding conductor size',
        'Missing bonding to required services'
      ]
    },
    {
      id: 'supplementary-bonding',
      name: 'Supplementary Bonding',
      description: 'Local equipotential bonding in special locations',
      regulation: 'BS 7671 Regulation 415.2',
      when: 'Where supplementary bonding is required (e.g., some bathroom installations)',
      procedure: [
        'Identify all exposed and extraneous conductive parts requiring bonding',
        'Test between all simultaneously accessible parts',
        'Use appropriate test current for conductor size',
        'Measure actual bonding connections, not through appliances',
        'Verify compliance with maximum resistance values',
        'Document all tested connections'
      ],
      acceptableLimits: 'Maximum 0.05Ω between simultaneously accessible exposed and extraneous conductive parts',
      practicalTips: [
        'Test all combinations of accessible metalwork',
        'Be aware of special location requirements',
        'Consider alternative protection methods if bonding not practical',
        'Check connection security during testing'
      ],
      commonIssues: [
        'Exceeding maximum resistance limits',
        'Not testing all required combinations',
        'Poor connections to pipework or appliances',
        'Omitting bonding where actually required'
      ]
    },
    {
      id: 'ring-circuit',
      name: 'Ring Circuit Continuity',
      description: 'Specific testing procedure for ring final circuits',
      regulation: 'BS 7671 Appendix 15',
      when: 'For all ring final circuits to verify ring integrity',
      procedure: [
        'Identify both ends of the ring at the distribution board',
        'Test end-to-end resistance of line conductors (both legs)',
        'Test end-to-end resistance of neutral conductors (both legs)',
        'Test end-to-end resistance of CPC (both legs)',
        'Cross-connect line and neutral at board, test at each socket',
        'Cross-connect line and CPC at board, test at each socket',
        'Verify readings indicate proper ring formation'
      ],
      acceptableLimits: 'End-to-end readings should be similar for both legs. R1+R2 readings should not exceed 1.67Ω',
      practicalTips: [
        'Both legs should give similar end-to-end readings',
        'Highest R1+R2 reading should be approximately (R1+R2)/4',
        'Any significant deviation indicates ring discontinuity',
        'Check for interconnections between rings'
      ],
      commonIssues: [
        'Ring wired as radial circuit',
        'Interconnections between different rings',
        'Broken ring continuity at socket connections',
        'Incorrect interpretation of test results'
      ]
    }
  ];

  const currentMethod = testMethods.find(method => method.id === selectedMethod) || testMethods[0];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Continuity Testing Methods
        </CardTitle>
        <CardDescription className="text-white">
          Detailed procedures for different types of continuity measurements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SmartTabs 
          tabs={testMethods.map((method) => ({
            value: method.id,
            label: method.name,
            content: (
              <div className="space-y-6">
                {/* Method Overview */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{method.name}</h3>
                      <p className="text-white mb-3">{method.description}</p>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                        {method.regulation}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 mb-2">When to Use</h4>
                    <p className="text-white text-sm">{method.when}</p>
                  </div>
                </div>

                {/* Test Procedure */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <h4 className="font-semibold text-green-400">Test Procedure</h4>
                  </div>
                  <div className="space-y-3 ml-7">
                    {method.procedure.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="bg-elec-yellow text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mt-1">
                          {index + 1}
                        </span>
                        <span className="text-white text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acceptable Limits */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-green-400" />
                    <h4 className="font-medium text-green-400">Acceptable Limits</h4>
                  </div>
                  <p className="text-white text-sm">{method.acceptableLimits}</p>
                </div>

                {/* Practical Tips */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-yellow-400" />
                    <h4 className="font-semibold text-yellow-400">Practical Tips</h4>
                  </div>
                  <div className="space-y-2 ml-6">
                    {method.practicalTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1 text-sm">💡</span>
                        <span className="text-white text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Issues */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <h4 className="font-semibold text-red-400">Common Issues & Troubleshooting</h4>
                  </div>
                  <div className="space-y-2 ml-6">
                    {method.commonIssues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1 text-sm">⚠</span>
                        <span className="text-white text-sm">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }))}
          value={selectedMethod}
          onValueChange={setSelectedMethod}
          className="space-y-6"
        />
      </CardContent>
    </Card>
  );
};

export default ContinuityTestingMethodsCard;
