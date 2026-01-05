
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

const GS38InfoCard = () => {
  const gs38Requirements = [
    {
      category: 'Test Probe Requirements',
      items: [
        'Finger guards or barriers to prevent accidental contact',
        'Probe tips with maximum 4mm exposed length',
        'Shrouded or retractable probe tips',
        'Insulated probe bodies with minimum 1000V rating'
      ]
    },
    {
      category: 'Test Lead Requirements',
      items: [
        'Flexible, insulated leads rated for the voltage being tested',
        'Minimum cross-sectional area of 0.75mm²',
        'Double insulation or equivalent protection',
        'Leads should be in good condition with no damage'
      ]
    },
    {
      category: 'Voltage Indicator Requirements',
      items: [
        'Suitable for the voltage and frequency being tested',
        'Must be proven before and after use',
        'Should indicate voltage presence clearly (visual/audible)',
        'Calibrated and within service date'
      ]
    }
  ];

  const safetyChecks = [
    'Inspect test equipment before use',
    'Verify calibration certificates are current',
    'Test on known live source before isolation testing',
    'Use lowest appropriate voltage range',
    'Maintain safe working distance',
    'Never bypass safety features'
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            GS38 Safety Standard Compliance
          </CardTitle>
          <CardDescription className="text-white">
            Essential requirements for electrical test equipment and safe testing practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {gs38Requirements.map((section, index) => (
            <div key={index} className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                {section.category}
              </h4>
              <ul className="space-y-2 ml-6">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-white text-sm flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <span className="font-medium text-orange-400">Pre-Use Safety Checks</span>
            </div>
            <ul className="space-y-1">
              {safetyChecks.map((check, index) => (
                <li key={index} className="text-white text-sm flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GS38InfoCard;
