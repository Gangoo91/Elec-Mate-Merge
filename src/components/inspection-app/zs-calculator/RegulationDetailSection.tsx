
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, BookOpen, Zap, Shield } from 'lucide-react';

interface RegulationDetail {
  regulation: string;
  title: string;
  description: string;
  keyPoints: string[];
  practicalApplication: string;
  commonIssues: string[];
  testingRequirements: string[];
  severity: 'critical' | 'important' | 'guidance';
}

const regulations: RegulationDetail[] = [
  {
    regulation: '411.4.5',
    title: 'Earth Fault Loop Impedance (Zs)',
    description: 'The earth fault loop impedance must not exceed values specified in relevant tables to ensure automatic disconnection within required time limits.',
    keyPoints: [
      'Maximum Zs values ensure protective device operates within 0.4s for final circuits ≤32A',
      'Values in tables include 80% derating factor (Cmin = 0.8) for temperature effects',
      'Different values apply for distribution circuits (5s disconnection time)',
      'RCD protection may allow higher Zs values but manufacturer data must be verified'
    ],
    practicalApplication: 'Measure Zs at each point using calibrated loop impedance tester. Compare measured values against tabulated maxima for the protective device installed.',
    commonIssues: [
      'High resistance earth connections causing excessive Zs',
      'Long cable runs without adequate earthing provision',
      'Poor quality supply earth (Ze) from DNO',
      'Loose connections in consumer units and distribution boards'
    ],
    testingRequirements: [
      'Test at furthest point of each circuit',
      'Record highest reading obtained',
      'Apply temperature correction if necessary',
      'Verify protective device type and rating'
    ],
    severity: 'critical'
  },
  {
    regulation: '411.3.3',
    title: 'Additional Protection by RCD',
    description: 'RCD protection required for socket outlets rated up to 20A and mobile equipment, providing additional protection against direct contact.',
    keyPoints: [
      'All socket outlets up to 20A must have 30mA RCD protection',
      'Mobile equipment up to 20A requires RCD protection',
      'RCD provides additional protection, not replacement for basic protection',
      'Type AC suitable for general use, Type A for electronic equipment'
    ],
    practicalApplication: 'Install 30mA RCD upstream of socket outlet circuits. Test operation using RCD tester at rated current and 5× rated current.',
    commonIssues: [
      'Missing RCD protection on socket circuits in older installations',
      'Wrong RCD type selected for application',
      'Nuisance tripping from electronic loads on Type AC RCDs',
      'RCD not tested regularly as required'
    ],
    testingRequirements: [
      'Test trip time at 30mA (≤300ms)',
      'Test trip time at 150mA (≤40ms)',
      'Verify no unwanted tripping at 15mA',
      'Test operation using test button monthly'
    ],
    severity: 'critical'
  },
  {
    regulation: '543.1.1',
    title: 'Earthing Conductor Requirements',
    description: 'The earthing conductor must be sized according to the cross-sectional area of the line conductor and material used.',
    keyPoints: [
      'Minimum 16mm² copper or 25mm² aluminium for buried earthing conductors',
      'Cross-sectional area determined by Table 54.7 based on line conductor size',
      'Must be protected against mechanical damage and corrosion',
      'Continuous monitoring required in TT systems'
    ],
    practicalApplication: 'Size earthing conductor using Table 54.7. Ensure adequate protection and accessibility for inspection and testing.',
    commonIssues: [
      'Undersized earthing conductors in older installations',
      'Corrosion of buried earthing conductors',
      'Inadequate mechanical protection',
      'Loss of earthing continuity due to building work'
    ],
    testingRequirements: [
      'Measure earthing conductor continuity',
      'Check mechanical condition and protection',
      'Verify adequate cross-sectional area',
      'Test earth electrode resistance if applicable'
    ],
    severity: 'important'
  },
  {
    regulation: '544.1.1',
    title: 'Protective Bonding Requirements',
    description: 'Main protective bonding required to extraneous-conductive-parts including water, gas, oil pipes and structural steelwork.',
    keyPoints: [
      'Main bonding conductor minimum 10mm² copper',
      'Bond within 600mm of entry to building',
      'Supplementary bonding may be required in bathrooms',
      'Bonding clamps must be accessible and labelled'
    ],
    practicalApplication: 'Install main bonding to all services entering building. Use proper bonding clamps with safety electrical connection labels.',
    commonIssues: [
      'Missing bonding to gas or water services',
      'Bonding connections too far from service entry point',
      'Use of inappropriate bonding clamps',
      'Bonding conductors damaged during building work'
    ],
    testingRequirements: [
      'Test continuity of all bonding conductors',
      'Verify adequate cross-sectional area',
      'Check bonding clamp condition and tightness',
      'Measure resistance between bonded services'
    ],
    severity: 'critical'
  }
];

export const RegulationDetailSection = () => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'important':
        return <Shield className="h-5 w-5 text-orange-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-500/20 text-red-400">Critical Safety</Badge>;
      case 'important':
        return <Badge className="bg-orange-500/20 text-orange-400">Important</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-400">Guidance</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {regulations.map((reg, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getSeverityIcon(reg.severity)}
                <div>
                  <CardTitle className="text-elec-yellow">
                    BS 7671 Regulation {reg.regulation}
                  </CardTitle>
                  <CardDescription className="text-foreground font-medium text-lg mt-1">
                    {reg.title}
                  </CardDescription>
                </div>
              </div>
              {getSeverityBadge(reg.severity)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-elec-yellow">
              <p className="text-gray-300">{reg.description}</p>
            </div>

            {/* Key Points */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-foreground mb-3">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Key Requirements
              </h4>
              <ul className="space-y-2">
                {reg.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Practical Application */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-green-400 mb-3">
                  <Zap className="h-4 w-4" />
                  Practical Application
                </h4>
                <p className="text-gray-300 text-sm">{reg.practicalApplication}</p>
              </div>

              {/* Testing Requirements */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-blue-400 mb-3">
                  <BookOpen className="h-4 w-4" />
                  Testing Requirements
                </h4>
                <ul className="space-y-1">
                  {reg.testingRequirements.map((req, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Common Issues */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
              <h4 className="flex items-center gap-2 font-semibold text-amber-400 mb-3">
                <AlertTriangle className="h-4 w-4" />
                Common Issues & Failures
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reg.commonIssues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-amber-400 font-bold">•</span>
                    {issue}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
