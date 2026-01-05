import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Zap, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { responsiveHeading, responsiveBody } from '@/styles/typography-utilities';

interface TestingEquipmentSafetyProps {
  onBack: () => void;
}

const TestingEquipmentSafety = ({ onBack }: TestingEquipmentSafetyProps) => {
  const [inspectionChecks, setInspectionChecks] = useState<string[]>([]);

  const toggleInspectionCheck = (checkId: string) => {
    if (inspectionChecks.includes(checkId)) {
      setInspectionChecks(inspectionChecks.filter(id => id !== checkId));
    } else {
      setInspectionChecks([...inspectionChecks, checkId]);
    }
  };

  const gs38Requirements = [
    {
      category: 'Test Probes',
      requirements: [
        'Finger guards to prevent slipping',
        'Insulated except for 4mm tip maximum',
        'Tip designed to prevent bridging contacts',
        'Spring-loaded retractable tips where possible'
      ]
    },
    {
      category: 'Test Leads',
      requirements: [
        'Adequately insulated and flexible',
        'Minimum conductor size for expected current',
        'Properly terminated at both ends',
        'No damaged or exposed conductors'
      ]
    },
    {
      category: 'Test Instruments',
      requirements: [
        'Appropriate safety category rating',
        'Current calibration certificate',
        'Suitable for the measurement required',
        'Clear and legible display'
      ]
    },
    {
      category: 'General Requirements',
      requirements: [
        'Regular inspection and testing',
        'Proper storage when not in use',
        'User competency verification',
        'Maintenance records kept'
      ]
    }
  ];

  const preUseInspection = [
    { id: 'visual-leads', item: 'Test leads for damage or wear', critical: true },
    { id: 'probe-guards', item: 'Probe finger guards in place', critical: true },
    { id: 'insulation-intact', item: 'Insulation integrity check', critical: true },
    { id: 'connections-secure', item: 'All connections secure', critical: true },
    { id: 'display-clear', item: 'Display clear and readable', critical: false },
    { id: 'battery-level', item: 'Battery level adequate', critical: false },
    { id: 'calibration-valid', item: 'Calibration certificate valid', critical: true },
    { id: 'case-integrity', item: 'Instrument case integrity', critical: false },
    { id: 'accessories-present', item: 'All required accessories present', critical: false },
    { id: 'storage-condition', item: 'Equipment stored correctly', critical: false }
  ];

  const testInstruments = [
    {
      instrument: 'Multifunction Tester',
      safetyFeatures: ['CAT III/IV rated', 'Auto-ranging', 'Overload protection', 'Lead compensation'],
      commonIssues: ['Incorrect test sequence', 'Poor connection to test points', 'Battery depletion during tests'],
      bestPractices: ['Follow manufacturer sequence', 'Clean test points before connection', 'Monitor battery level']
    },
    {
      instrument: 'Insulation Tester',
      safetyFeatures: ['High voltage warning', 'Discharge function', 'CAT III rated', 'Lockout feature'],
      commonIssues: ['Testing energised circuits', 'Inadequate discharge time', 'Poor surface preparation'],
      bestPractices: ['Verify de-energised state', 'Allow full discharge', 'Clean and dry test surfaces']
    },
    {
      instrument: 'RCD Tester',
      safetyFeatures: ['Loop impedance check', 'Auto-discharge', 'Clear pass/fail indication', 'CAT III rated'],
      commonIssues: ['Testing without earthing check', 'Incorrect test current selection', 'Poor earth connection'],
      bestPractices: ['Verify earth integrity first', 'Select appropriate test current', 'Ensure good earth connection']
    },
    {
      instrument: 'Voltage Indicator',
      safetyFeatures: ['GS38 compliant probes', 'Audio and visual indication', 'Self-test function', 'Robust construction'],
      commonIssues: ['Not testing before/after use', 'Insufficient probe contact', 'Ignoring battery warnings'],
      bestPractices: ['Always test on known live source', 'Ensure good probe contact', 'Replace batteries promptly']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Safety Modules
        </Button>
      </div>

      <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
          <h1 className={responsiveHeading.h1 + " text-foreground"}>Testing Equipment Safety</h1>
        </div>
        <p className={responsiveBody.large + " text-white max-w-3xl mx-auto px-4"}>
          Learn to select, inspect, and use electrical testing equipment safely in accordance with GS38 and BS 7671.
        </p>
      </div>

      <SmartTabs
        defaultValue="gs38"
        tabs={[
          {
            value: 'gs38',
            label: 'GS38 Requirements',
            icon: <Shield className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {gs38Requirements.map((section, index) => (
              <Card key={index} className="border-blue-500/20 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-yellow-500/20 bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="text-yellow-300">Key GS38 Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <Shield className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-yellow-300 mb-1">Protection</h4>
                  <p className="text-white text-sm">Prevent inadvertent contact with live parts</p>
                </div>
                <div className="text-center p-4">
                  <CheckCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-yellow-300 mb-1">Reliability</h4>
                  <p className="text-white text-sm">Equipment must function correctly and safely</p>
                </div>
                <div className="text-center p-4">
                  <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-yellow-300 mb-1">Suitability</h4>
                  <p className="text-white text-sm">Appropriate for the electrical environment</p>
                </div>
              </div>
            </CardContent>
          </Card>
              </div>
            ),
          },
          {
            value: 'inspection',
            label: 'Pre-Use Inspection',
            icon: <CheckCircle className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-300">Pre-Use Equipment Inspection Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-4">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mb-2">
                    Critical Safety Items
                  </Badge>
                  <div className="space-y-2">
                    {preUseInspection.filter(item => item.critical).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleInspectionCheck(item.id)}
                          className={`p-2 h-auto ${
                            inspectionChecks.includes(item.id)
                              ? 'text-green-400 hover:text-green-300'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          <CheckCircle
                            className={`h-4 w-4 ${
                              inspectionChecks.includes(item.id) ? 'fill-current' : ''
                            }`}
                          />
                        </Button>
                        <span className={`text-sm ${
                          inspectionChecks.includes(item.id) 
                            ? 'text-green-300 line-through' 
                            : 'text-white'
                        }`}>
                          {item.item}
                        </span>
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-2">
                    General Checks
                  </Badge>
                  <div className="space-y-2">
                    {preUseInspection.filter(item => !item.critical).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleInspectionCheck(item.id)}
                          className={`p-2 h-auto ${
                            inspectionChecks.includes(item.id)
                              ? 'text-green-400 hover:text-green-300'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          <CheckCircle
                            className={`h-4 w-4 ${
                              inspectionChecks.includes(item.id) ? 'fill-current' : ''
                            }`}
                          />
                        </Button>
                        <span className={`text-sm ${
                          inspectionChecks.includes(item.id) 
                            ? 'text-green-300 line-through' 
                            : 'text-white'
                        }`}>
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-green-300 font-medium">Inspection Progress:</span>
                    <span className="text-green-400 font-bold">
                      {inspectionChecks.length}/{preUseInspection.length}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(inspectionChecks.length / preUseInspection.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
              </div>
            ),
          },
          {
            value: 'instruments',
            label: 'Test Instruments',
            icon: <Zap className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <div className="space-y-6">
            {testInstruments.map((instrument, index) => (
              <Card key={index} className="border-purple-500/20 bg-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-purple-300">{instrument.instrument}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Safety Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {instrument.safetyFeatures.map((feature, featureIndex) => (
                        <Badge key={featureIndex} className="bg-green-500/20 text-green-300 border-green-500/30">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-300 mb-2">Common Issues:</h4>
                    <ul className="space-y-1">
                      {instrument.commonIssues.map((issue, issueIndex) => (
                        <li key={issueIndex} className="text-white text-sm flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Best Practices:</h4>
                    <ul className="space-y-1">
                      {instrument.bestPractices.map((practice, practiceIndex) => (
                        <li key={practiceIndex} className="text-white text-sm flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
              </div>
            ),
          },
          {
            value: 'maintenance',
            label: 'Maintenance',
            icon: <Wrench className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-300">Regular Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Daily:</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Visual inspection before use</li>
                    <li>• Functional checks</li>
                    <li>• Clean storage after use</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Weekly:</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Detailed inspection of leads</li>
                    <li>• Battery level monitoring</li>
                    <li>• Accessory inventory check</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Monthly:</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Calibration verification</li>
                    <li>• Storage condition review</li>
                    <li>• Documentation update</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/20 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="text-yellow-300">Calibration Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-500/10 rounded">
                  <h4 className="font-semibold text-yellow-400 mb-2">Calibration Intervals:</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Multifunction testers: 12 months</li>
                    <li>• Insulation testers: 12 months</li>
                    <li>• RCD testers: 12 months</li>
                    <li>• Voltage indicators: 6 months</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Calibration Records:</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Certificate must be valid</li>
                    <li>• Traceable to national standards</li>
                    <li>• Records kept for audit</li>
                    <li>• Equipment labelled with due date</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                When to Remove Equipment from Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Immediate Removal:</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Visible damage to insulation</li>
                    <li>• Cracked or broken case</li>
                    <li>• Exposed conductors</li>
                    <li>• Intermittent operation</li>
                    <li>• Display faults</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Schedule Replacement:</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>• Calibration overdue</li>
                    <li>• Battery life issues</li>
                    <li>• Wear on test leads</li>
                    <li>• Missing accessories</li>
                    <li>• Obsolete safety standards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default TestingEquipmentSafety;