import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Zap, AlertTriangle, CheckCircle, CheckCircle2, Search, Wrench, Target, Clock, User, Lightbulb, BookOpen, Shield, FileText, ChevronDown, ChevronUp, HardHat, Eye, Phone, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { useIsMobile } from '@/hooks/use-mobile';

interface FaultFindingSectionProps {
  onBack: () => void;
}

const FaultFindingSection = ({ onBack }: FaultFindingSectionProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const toggleStep = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };


  const getStepIcon = (category: string) => {
    switch (category) {
      case 'preparation': return <User className="h-4 w-4 text-blue-400" />;
      case 'assessment': return <Search className="h-4 w-4 text-green-400" />;
      case 'inspection': return <Lightbulb className="h-4 w-4 text-yellow-400" />;
      case 'safety': return <Shield className="h-4 w-4 text-red-400" />;
      case 'testing': return <Wrench className="h-4 w-4 text-purple-400" />;
      case 'documentation': return <FileText className="h-4 w-4 text-orange-400" />;
      case 'procedures': return <Shield className="h-4 w-4 text-cyan-400" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'legal': return <BookOpen className="h-4 w-4 text-indigo-400" />;
      case 'equipment': return <HardHat className="h-4 w-4 text-blue-400" />;
      case 'overcurrent': return <Zap className="h-4 w-4 text-red-400" />;
      case 'earth_leakage': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'supply_issues': return <Activity className="h-4 w-4 text-blue-400" />;
      case 'safety_critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'lighting': return <Lightbulb className="h-4 w-4 text-purple-400" />;
      case 'earthing': return <Search className="h-4 w-4 text-green-400" />;
      case 'appliance_fault': return <Wrench className="h-4 w-4 text-orange-400" />;
      case 'complex': return <Target className="h-4 w-4 text-indigo-400" />;
      case 'heating': return <Activity className="h-4 w-4 text-cyan-400" />;
      default: return <Target className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStepColor = (category: string) => {
    switch (category) {
      case 'preparation': return 'border-l-blue-500';
      case 'assessment': return 'border-l-green-500';
      case 'inspection': return 'border-l-amber-500';
      case 'safety': return 'border-l-orange-500';
      case 'testing': return 'border-l-purple-500';
      case 'documentation': return 'border-l-slate-500';
      case 'procedures': return 'border-l-cyan-500';
      case 'emergency': return 'border-l-red-500';
      case 'legal': return 'border-l-indigo-500';
      case 'equipment': return 'border-l-purple-500';
      case 'overcurrent': return 'border-l-red-500';
      case 'earth_leakage': return 'border-l-yellow-500';
      case 'supply_issues': return 'border-l-blue-500';
      case 'safety_critical': return 'border-l-red-600';
      case 'lighting': return 'border-l-purple-500';
      case 'earthing': return 'border-l-green-500';
      case 'appliance_fault': return 'border-l-orange-500';
      case 'complex': return 'border-l-indigo-500';
      case 'heating': return 'border-l-cyan-500';
      case 'insulation': return 'border-l-violet-500';
      default: return 'border-l-slate-500';
    }
  };

  const faultFindingSteps = [
    {
      id: 'initial-assessment',
      title: 'Initial Assessment & Preparation',
      category: 'preparation',
      description: 'Comprehensive preparation and risk assessment before commencing fault finding activities',
      keyPoints: [
        'Conduct thorough risk assessment and safety planning',
        'Gather comprehensive fault history and symptoms',
        'Prepare all necessary test equipment and PPE',
        'Establish communication protocols and emergency procedures'
      ],
      detailedSteps: [
        'Conduct detailed interview with fault reporter and witnesses',
        'Gather information about recent changes or maintenance work',
        'Assess environmental conditions and external factors',
        'Complete risk assessment and method statement',
        'Prepare all necessary test equipment and PPE',
        'Notify relevant parties of planned investigation work'
      ],
      estimatedTime: '15-30 minutes',
      regulation: 'BS 7671: 610.1, CDM Regulations',
      priority: 'critical'
    },
    {
      id: 'information-gathering',
      title: 'Information Gathering & System Review',
      category: 'assessment',
      description: 'Systematic collection of fault data and review of installation documentation',
      keyPoints: [
        'Document exact symptoms and fault characteristics',
        'Review installation certificates and previous test results',
        'Identify patterns in fault occurrence',
        'Check maintenance history and warranty status'
      ],
      detailedSteps: [
        'Document exact symptoms reported by users',
        'Establish timeline of when fault first occurred',
        'Determine if fault is intermittent, permanent, or progressive',
        'Review maintenance history and previous faults',
        'Check for patterns in fault occurrence (time, weather, loading)',
        'Review electrical installation certificates and test results'
      ],
      estimatedTime: '10-20 minutes',
      regulation: 'BS 7671: 610.1',
      priority: 'high'
    },
    {
      id: 'visual-inspection',
      title: 'Comprehensive Visual Inspection',
      category: 'inspection',
      description: 'Systematic visual examination of the electrical installation',
      keyPoints: [
        'Inspect distribution boards and protective devices',
        'Check cable routes and terminations',
        'Look for signs of overheating or damage',
        'Verify earthing and bonding arrangements'
      ],
      detailedSteps: [
        'Inspect distribution boards for damage, overheating, or corrosion',
        'Check all cable routes for damage, sagging, or deterioration',
        'Look for loose connections at all accessible terminals',
        'Check for evidence of arcing, burning, or carbon tracking',
        'Verify protective device ratings match circuit requirements',
        'Inspect earthing and bonding connections throughout installation'
      ],
      estimatedTime: '20-45 minutes',
      regulation: 'BS 7671: 611, IEC 60364-6-61',
      priority: 'high'
    },
    {
      id: 'safe-isolation',
      title: 'Safe Isolation Procedures',
      category: 'safety',
      description: 'Comprehensive isolation following proven safe isolation procedures',
      keyPoints: [
        'Identify and verify correct circuits',
        'Apply proper isolation and locking procedures',
        'Test isolation with approved voltage indicators',
        'Establish and maintain exclusion zones'
      ],
      detailedSteps: [
        'Identify correct circuit breaker/isolator using circuit charts',
        'Verify circuit identity using appropriate testing methods',
        'Switch off and isolate the circuit at distribution board',
        'Secure isolation with suitable locking device',
        'Apply warning notices at all points of isolation',
        'Test isolation using approved voltage indicator'
      ],
      estimatedTime: '10-15 minutes',
      regulation: 'BS 7671: 612, GS38, Electricity at Work Regulations',
      priority: 'critical'
    },
    {
      id: 'systematic-testing',
      title: 'Systematic Testing & Analysis',
      category: 'testing',
      description: 'Methodical testing using process of elimination and appropriate instruments',
      keyPoints: [
        'Apply systematic process of elimination',
        'Use appropriate test instruments for each measurement',
        'Work from supply to load in logical sequence',
        'Document all test results and measurements'
      ],
      detailedSteps: [
        'Test continuity of protective conductors',
        'Measure insulation resistance of circuits',
        'Check earth fault loop impedance values',
        'Test RCD operation and sensitivity',
        'Verify polarity of all circuits',
        'Measure prospective fault current where required'
      ],
      estimatedTime: '30-90 minutes',
      regulation: 'BS 7671: 612, IEC 61557 series',
      priority: 'high'
    },
    {
      id: 'mcb-circuit-isolation',
      title: 'MCB Circuit Isolation Testing',
      category: 'testing',
      description: 'Systematic MCB switching to identify which circuit is causing the main breaker to trip',
      keyPoints: [
        'Systematically isolate individual circuits to identify fault location',
        'Monitor main breaker behaviour during selective switching',
        'Work methodically to narrow down fault source',
        'Maintain accurate records of MCB switching sequence'
      ],
      detailedSteps: [
        'Ensure main breaker is in the ON position and holding',
        'Switch OFF all individual MCBs in the distribution board',
        'Switch ON each MCB one at a time, monitoring main breaker',
        'If main breaker trips when switching on a specific MCB, mark that circuit as faulty',
        'If main breaker holds with all MCBs individually ON, switch them ON in groups',
        'Use process of elimination to identify the problematic circuit(s)',
        'Document findings and proceed with detailed investigation of identified circuit'
      ],
      estimatedTime: '10-20 minutes',
      regulation: 'BS 7671: 612, Electricity at Work Regulations',
      priority: 'high',
      safetyNote: 'Only qualified electricians should perform this procedure. Ensure all safety protocols are followed and appropriate PPE is worn.',
      testingContext: 'This is a diagnostic troubleshooting technique, not a formal BS 7671 Part 6 inspection and testing procedure. It is used during fault-finding to isolate problematic circuits. Formal testing follows the sequence in BS 7671 Section 612.'
    },
    {
      id: 'fault-analysis',
      title: 'Fault Analysis & Resolution',
      category: 'testing',
      description: 'Analysis of test results and implementation of corrective measures',
      keyPoints: [
        'Analyse test results against BS 7671 requirements',
        'Identify root cause of the fault',
        'Implement appropriate corrective measures',
        'Verify effectiveness of repairs'
      ],
      detailedSteps: [
        'Compare test results with acceptable limits',
        'Identify specific fault location and type',
        'Plan corrective action with minimal disruption',
        'Implement repairs using appropriate materials',
        'Re-test circuits after repair completion',
        'Verify system operates correctly under normal conditions'
      ],
      estimatedTime: 'Variable',
      regulation: 'BS 7671: Various sections',
      priority: 'high'
    },
    {
      id: 'verification-documentation',
      title: 'Verification & Documentation',
      category: 'documentation',
      description: 'Final verification testing and comprehensive documentation of findings',
      keyPoints: [
        'Perform verification tests on repaired circuits',
        'Issue appropriate electrical certificates',
        'Provide detailed fault investigation report',
        'Make recommendations for future prevention'
      ],
      detailedSteps: [
        'Conduct verification tests on repaired installation',
        'Test all safety systems and protective devices',
        'Issue appropriate electrical certificates',
        'Provide detailed fault investigation report',
        'Make recommendations for preventing similar faults',
        'Update installation schematic drawings and documentation'
      ],
      estimatedTime: '15-30 minutes',
      regulation: 'BS 7671: Part 6, Electricity at Work Regulations',
      priority: 'medium'
    }
  ];

  const testEquipment = [
    {
      instrument: 'Multifunction Tester (MFT)',
      uses: ['Continuity testing', 'Insulation resistance', 'Earth fault loop impedance', 'RCD testing', 'Polarity verification', 'Prospective fault current'],
      faultTypes: ['Open circuits', 'High resistance joints', 'Insulation breakdown', 'Earth faults', 'Incorrect polarity', 'High loop impedance'],
      standards: 'BS 7671, GS38',
      calibration: 'Annual calibration required',
      safety: 'GS38 compliant test leads essential'
    },
    {
      instrument: 'Clamp Meter',
      uses: ['Current measurement', 'Load monitoring', 'Leakage current detection', 'Phase balance', 'Power measurement', 'Harmonic analysis'],
      faultTypes: ['Overload conditions', 'Unbalanced loads', 'Earth leakage', 'Equipment faults', 'Power quality issues', 'Neutral faults'],
      standards: 'IEC 61557, CAT III/IV rated',
      calibration: 'Annual or bi-annual',
      safety: 'Check CAT rating matches application'
    },
    {
      instrument: 'Thermal Imaging Camera',
      uses: ['Hot spot detection', 'Connection assessment', 'Load distribution', 'Equipment condition', 'Preventive maintenance', 'Energy audits'],
      faultTypes: ['Loose connections', 'Overloaded circuits', 'Equipment overheating', 'Phase imbalance', 'Motor bearing faults', 'Cable joints'],
      standards: 'IEC 60529 (IP rating)',
      calibration: 'Annual radiometric calibration',
      safety: 'Eye protection for bright infrared sources'
    },
    {
      instrument: 'Digital Multimeter',
      uses: ['Voltage measurement', 'Current measurement', 'Resistance testing', 'Diode testing', 'Frequency measurement', 'Capacitance testing'],
      faultTypes: ['Component failures', 'Open/short circuits', 'Voltage variations', 'Component degradation', 'Signal faults', 'Control circuit issues'],
      standards: 'IEC 61010, CAT rating',
      calibration: 'Annual calibration',
      safety: 'Fused inputs, CAT rating verification'
    },
    {
      instrument: 'Oscilloscope',
      uses: ['Waveform analysis', 'Transient capture', 'Signal quality', 'Timing analysis', 'Power quality', 'Control signal verification'],
      faultTypes: ['Switching transients', 'Signal distortion', 'Timing faults', 'Communication errors', 'Power quality issues', 'EMC problems'],
      standards: 'IEC 61010, IEC 61326',
      calibration: 'Annual or bi-annual',
      safety: 'Proper grounding essential'
    },
    {
      instrument: 'Power Quality Analyser',
      uses: ['Harmonic analysis', 'Voltage quality', 'Power factor', 'Event recording', 'Load profiling', 'Energy measurement'],
      faultTypes: ['Power quality issues', 'Harmonic distortion', 'Voltage variations', 'Power factor problems', 'Equipment compatibility', 'Grid disturbances'],
      standards: 'IEC 61000 series',
      calibration: 'Annual calibration',
      safety: 'Current transformer safety'
    }
  ];

  // Create progressive disclosure components for mobile
  const MethodologyContent = () => (
    <div className="space-y-3 sm:space-y-4">
      {faultFindingSteps.map((step, index) => (
        <Collapsible key={step.id}>
          <Card className={`transition-all duration-200 ${getStepColor(step.category)} hover:bg-card hover:border-border border-l-4 touch-manipulation active:scale-[0.99]`}>
            <CollapsibleTrigger className="w-full min-h-[44px]">
              <CardHeader className="p-4 sm:p-5 md:p-6 cursor-pointer">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs sm:text-sm shrink-0">
                      {index + 1}
                    </div>
                    {getStepIcon(step.category)}
                    <CardTitle className="text-base sm:text-lg md:text-xl text-left">
                      {step.title}
                    </CardTitle>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{step.estimatedTime}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                  {step.description}
                </p>
              </CardHeader>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-3 sm:space-y-4">
                {/* Key Points */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Key Points:</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {step.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3 leading-relaxed">
                        <span className="text-muted-foreground shrink-0">•</span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Steps */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Detailed Steps:</h4>
                  <ol className="space-y-2 sm:space-y-3">
                    {step.detailedSteps.map((detailStep, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                        <Badge variant="outline" className="text-xs min-w-[28px] min-h-[24px] flex items-center justify-center shrink-0">
                          {index + 1}
                        </Badge>
                        <span className="flex-1">{detailStep}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Regulation Reference */}
                <div className="bg-blue-500/10 border border-blue-500/20 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-blue-400 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                    Regulatory Reference:
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-400">{step.regulation}</p>
                </div>

                {/* Safety Note */}
                {(step as any).safetyNote && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 shrink-0" />
                      <h5 className="font-semibold text-orange-400 text-sm sm:text-base">Safety Note</h5>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{(step as any).safetyNote}</p>
                  </div>
                )}

                {/* Testing Context */}
                {(step as any).testingContext && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" />
                      <span className="text-blue-400 font-semibold text-sm sm:text-base">Testing Context</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {(step as any).testingContext}
                    </p>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );

  const TestEquipmentContent = () => (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {testEquipment.map((equipment, index) => (
        <Card key={index} className="border-l-4 border-l-purple-500 hover:bg-card hover:border-border transition-all touch-manipulation">
          <CardHeader className="p-4 sm:p-5 md:p-6">
            <CardTitle className="text-purple-300 flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
              <Wrench className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              {equipment.instrument}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-4 sm:space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div>
                <h4 className="font-semibold text-purple-400 mb-2 text-sm sm:text-base">Primary Uses:</h4>
                <ul className="space-y-2">
                  {equipment.uses.map((use, useIndex) => (
                    <li key={useIndex} className="text-gray-300 text-xs sm:text-sm flex items-start gap-2 leading-relaxed">
                      <Target className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 mt-0.5 shrink-0" />
                      <span className="flex-1">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-400 mb-2 text-sm sm:text-base">Fault Types Detected:</h4>
                <ul className="space-y-2">
                  {equipment.faultTypes.map((faultType, faultIndex) => (
                    <li key={faultIndex} className="text-gray-300 text-xs sm:text-sm flex items-start gap-2 leading-relaxed">
                      <Search className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 mt-0.5 shrink-0" />
                      <span className="flex-1">{faultType}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-purple-500/20">
              <div>
                <h5 className="font-medium text-cyan-400 mb-1 text-xs sm:text-sm">Standards:</h5>
                <Badge variant="outline" className="text-xs">{equipment.standards}</Badge>
              </div>
              <div>
                <h5 className="font-medium text-yellow-400 mb-1 text-xs sm:text-sm">Calibration:</h5>
                <Badge variant="outline" className="text-xs">{equipment.calibration}</Badge>
              </div>
              <div>
                <h5 className="font-medium text-red-400 mb-1 text-xs sm:text-sm">Safety:</h5>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{equipment.safety}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const SafetyContent = () => {
    const safetyTopics = [
      {
        id: 'personal-safety',
        title: 'Personal Safety Protocols',
        category: 'safety',
        description: 'Essential personal safety practices and work protocols for electrical fault finding',
        keyPoints: [
          'Never work alone on electrical fault finding activities',
          'Maintain constant communication with team members',
          'Ensure mental alertness and proper competency for the work',
          'Know emergency contact numbers and procedures'
        ],
        detailedContent: {
          workPractices: [
            'Never work alone on electrical fault finding',
            'Always inform supervisor of work location and duration',
            'Maintain constant communication with team members',
            'Keep emergency contact numbers readily available',
            'Know location of nearest first aid facilities',
            'Be aware of exit routes and emergency procedures'
          ],
          mentalState: [
            'Be mentally alert and well-rested before starting work',
            'Ensure you are competent for the work being undertaken',
            'Stop work immediately if feeling unwell or distracted',
            'Ask for assistance if uncertain about any procedure',
            'Maintain awareness of changing environmental conditions'
          ]
        },
        estimatedTime: 'Ongoing',
        priority: 'critical',
        regulation: 'Health and Safety at Work etc. Act 1974'
      },
      {
        id: 'ppe-requirements',
        title: 'Personal Protective Equipment (PPE)',
        category: 'equipment',
        description: 'Comprehensive PPE requirements and maintenance for electrical safety',
        keyPoints: [
          'Essential PPE: Safety helmet, glasses, gloves, footwear',
          'Electrical PPE: Insulated tools, voltage indicators, arc flash protection',
          'Daily visual inspection before use required',
          'Proper storage and immediate replacement of damaged equipment'
        ],
        detailedContent: {
          essentialPPE: [
            'Safety helmet to BS EN 397',
            'Safety glasses to BS EN 166', 
            'Insulated gloves to BS EN 60903',
            'Safety footwear to BS EN ISO 20345'
          ],
          electricalPPE: [
            'Insulated tools to BS EN 60900',
            'Voltage indicating device (GS38 compliant)',
            'Insulating mats where appropriate',
            'Arc flash protection if required'
          ],
          maintenance: [
            'Daily visual inspection before use',
            'Regular electrical testing of insulated gloves',
            'Proper storage in clean, dry conditions',
            'Replace damaged equipment immediately',
            'Keep calibration certificates up to date'
          ]
        },
        estimatedTime: '5 minutes daily check',
        priority: 'critical',
        regulation: 'Personal Protective Equipment at Work Regulations 1992'
      },
      {
        id: 'safe-isolation',
        title: 'Safe Isolation Procedures',
        category: 'procedures',
        description: 'The proven 7-point safe isolation procedure for electrical work',
        keyPoints: [
          'Follow the proven 7-point isolation procedure',
          'Test voltage indicators before and after use',
          'Secure isolation with proper locking devices',
          'Apply warning notices at all isolation points'
        ],
        detailedContent: {
          procedure: [
            'Identify the circuit and point of isolation',
            'Switch off and disconnect the supply',
            'Secure the isolation (lock off/tag out)',
            'Test the voltage indicator on a known supply',
            'Test that the circuit is dead',
            'Re-test the voltage indicator on a known supply',
            'Begin work only when all points are satisfied'
          ],
          lockout: [
            'Use appropriate locking devices for isolation points',
            'Apply unique personal locks - never share keys',
            'Attach warning notices at all isolation points',
            'Record isolation details in work documentation',
            'Communicate isolation status to all team members'
          ]
        },
        estimatedTime: '10-15 minutes',
        priority: 'critical',
        regulation: 'BS 7671: 612, GS38, Electricity at Work Regulations'
      },
      {
        id: 'emergency-procedures',
        title: 'Emergency Response Procedures',
        category: 'emergency',
        description: 'Critical emergency procedures for electric shock and electrical fires',
        keyPoints: [
          'Electric shock: DO NOT touch casualty if still energised',
          'Electrical fires: Use CO₂ or dry powder extinguisher only',
          'Emergency numbers: 999 (Emergency), 105 (Power cuts)',
          'Always prioritise personal safety in emergency situations'
        ],
        detailedContent: {
          electricShock: [
            'DO NOT touch the casualty if still in contact with live parts',
            'Switch off supply immediately if safe to do so',
            'Call 999 for emergency medical assistance',
            'Check breathing and pulse, begin CPR if necessary',
            'Monitor casualty until medical help arrives',
            'Report incident immediately to supervisor'
          ],
          electricalFire: [
            'Raise the alarm immediately',
            'Switch off electrical supply if safe to do so',
            'Use CO₂ or dry powder extinguisher only',
            'NEVER use water on electrical fires',
            'Evacuate area if fire cannot be controlled',
            'Call fire brigade (999) if fire spreads'
          ],
          contacts: [
            'Emergency Services: 999 (Police, Fire, Ambulance)',
            'Electricity Emergency: 105 (National Power Cut Helpline)',
            'Gas Emergency: 0800 111 999 (National Gas Emergency)',
            'Company emergency contact: [Your company number]'
          ]
        },
        estimatedTime: 'Immediate response',
        priority: 'critical',
        regulation: 'Health and Safety (First Aid) Regulations 1981'
      },
      {
        id: 'legal-requirements',
        title: 'Legal Requirements & Standards',
        category: 'legal',
        description: 'Key legislation and technical standards governing electrical safety',
        keyPoints: [
          'Primary legislation: Health and Safety at Work Act, Electricity at Work Regulations',
          'Technical standards: BS 7671, GS38, BS EN electrical standards',
          'Employer duties: Safe systems of work, training, supervision',
          'Employee duties: Take care of own safety and that of others'
        ],
        detailedContent: {
          primaryLegislation: [
            'Health and Safety at Work etc. Act 1974',
            'Electricity at Work Regulations 1989',
            'Management of Health and Safety at Work Regulations 1999',
            'Personal Protective Equipment at Work Regulations 1992',
            'Construction (Design and Management) Regulations 2015'
          ],
          technicalStandards: [
            'BS 7671: Requirements for Electrical Installations',
            'GS38: Electrical test equipment for use by electricians',
            'BS EN 60900: Live working - Hand tools for use up to 1000V AC',
            'BS EN 60903: Live working - Electrical insulating gloves',
            'IEC 61557 series: Electrical safety testing standards'
          ],
          duties: [
            'Employer: Provide safe systems of work and adequate training',
            'Employee: Take reasonable care for health and safety',
            'Competent person: Only undertake work within competence',
            'Supervision: Ensure adequate supervision of electrical work'
          ]
        },
        estimatedTime: 'Ongoing compliance',
        priority: 'high',
        regulation: 'Multiple UK and EU regulations'
      },
      {
        id: 'risk-assessment',
        title: 'Risk Assessment Guidelines',
        category: 'assessment',
        description: 'Systematic approach to identifying and controlling electrical hazards',
        keyPoints: [
          'Follow 5-step risk assessment process',
          'Identify electrical hazards: shock, arc flash, fire, explosion',
          'Evaluate likelihood and severity of potential harm',
          'Implement appropriate control measures and document findings'
        ],
        detailedContent: {
          process: [
            'Step 1: Identify hazards - What could cause harm during fault finding?',
            'Step 2: Identify who might be harmed - Workers, visitors, members of public',
            'Step 3: Evaluate risks - Likelihood and severity of potential harm',
            'Step 4: Record findings - Document significant risks and control measures',
            'Step 5: Review and update - Regularly review and update as necessary'
          ],
          commonHazards: [
            'Electric shock and electrocution',
            'Arc flash and thermal burns',
            'Fire and explosion risks',
            'Falls from height during access',
            'Manual handling injuries',
            'Exposure to hazardous substances',
            'Confined space working'
          ],
          controlMeasures: [
            'Safe isolation procedures and lockout/tagout',
            'Appropriate PPE selection and use',
            'Competent person requirements and training',
            'Environmental controls and ventilation',
            'Emergency procedures and first aid provision',
            'Regular equipment maintenance and calibration'
          ]
        },
        estimatedTime: '30-60 minutes',
        priority: 'high',
        regulation: 'Management of Health and Safety at Work Regulations 1999'
      }
    ];

    return (
      <div className="space-y-3 sm:space-y-4">
        {/* Critical Safety Overview */}
        <Card className="border-l-4 border-l-red-500 hover:bg-card transition-all">
          <CardHeader className="p-4 sm:p-5 md:p-6">
            <CardTitle className="text-red-300 flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              Critical Safety Requirements for Fault Finding
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 md:p-6 pt-0">
            <div className="bg-red-500/10 border border-red-500/20 p-4 sm:p-5 rounded-lg">
              <p className="text-red-300 font-medium text-sm sm:text-base leading-relaxed">
                ⚠️ Electrical fault finding involves working with potentially live systems. 
                Always prioritise safety over speed of diagnosis.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Collapsible Safety Topics */}
        {safetyTopics.map((topic, index) => (
          <Collapsible key={topic.id}>
            <Card className={`transition-all duration-200 ${getStepColor(topic.category)} hover:bg-card hover:border-border border-l-4 touch-manipulation active:scale-[0.99]`}>
              <CollapsibleTrigger className="w-full min-h-[44px]">
                <CardHeader className="p-4 sm:p-5 md:p-6 cursor-pointer">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs sm:text-sm shrink-0">
                        {index + 1}
                      </div>
                      {getStepIcon(topic.category)}
                      <CardTitle className="text-base sm:text-lg md:text-xl text-left">
                        {topic.title}
                      </CardTitle>
                    </div>
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{topic.estimatedTime}</span>
                  </div>
                  <p className="text-left text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="p-4 sm:p-5 md:p-6 pt-0 space-y-3 sm:space-y-4">
                  {/* Key Points */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Key Points:</h4>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      {topic.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-3 leading-relaxed">
                          <span className="text-muted-foreground shrink-0">•</span>
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Detailed Content */}
                  <div className="space-y-3 sm:space-y-4">
                    {Object.entries(topic.detailedContent).map(([section, items]) => (
                      <div key={section}>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base capitalize">
                          {section.replace(/([A-Z])/g, ' $1').trim()}:
                        </h4>
                        <div className="grid gap-2">
                          {Array.isArray(items) ? (
                            <ol className="space-y-2 sm:space-y-3">
                              {items.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                                  <Badge variant="outline" className="text-xs min-w-[28px] min-h-[24px] flex items-center justify-center shrink-0">
                                    {index + 1}
                                  </Badge>
                                  <span className="flex-1">{item}</span>
                                </li>
                              ))}
                            </ol>
                          ) : (
                            <p className="text-xs sm:text-sm leading-relaxed">{items}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regulation Reference */}
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-blue-400 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                      Regulatory Reference:
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-400">{topic.regulation}</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    );
  };

  const DiagnosticsContent = () => {
    const diagnosticScenarios = [
      {
        id: 'continuity-analysis',
        title: 'Continuity Analysis',
        category: 'continuity',
        icon: <Activity className="h-5 w-5 text-green-400" />,
        description: 'Comprehensive continuity testing and analysis procedures for electrical circuits',
        diagnostics: [
          {
            symptom: 'High resistance readings in protective conductors',
            measurement: 'R1+R2 readings significantly above calculated values',
            interpretation: 'Poor connections or breaks in protective conductor circuit',
            severity: 'critical',
            possibleCauses: [
              'Loose connections at accessories or distribution board',
              'Corroded connections in junction boxes',
              'Break in protective conductor cable',
              'Poor quality connections during installation'
            ],
            diagnosticSteps: [
              'Test individual sections to isolate high resistance area',
              'Check all accessible connections for tightness',
              'Verify protective conductor size and type',
              'Test at multiple points along circuit route'
            ],
            rectificationMethods: [
              'Tighten all loose connections found',
              'Replace corroded connection terminals',
              'Repair or replace damaged protective conductor',
              'Improve connection protection from environment'
            ],
            regulation: 'BS 7671: 643.2 - Continuity testing of protective conductors'
          },
          {
            symptom: 'Open circuit detected in ring final circuit',
            measurement: 'Infinite resistance reading on ring continuity test',
            interpretation: 'Break in ring circuit compromising load distribution',
            severity: 'high',
            possibleCauses: [
              'Disconnected conductor at socket outlet',
              'Cable damage due to building work',
              'Loose connection at junction box',
              'Failed connection in accessory back box'
            ],
            diagnosticSteps: [
              'Test both legs of ring circuit separately',
              'Check end-to-end continuity of live and neutral',
              'Visually inspect accessible connections',
              'Use time domain reflectometry if available'
            ],
            rectificationMethods: [
              'Reconnect loose conductors at accessories',
              'Replace damaged cable sections',
              'Secure all junction box connections',
              'Test circuit loading after repair'
            ],
            regulation: 'BS 7671: 643.2.2 - Ring final circuit continuity'
          },
          {
            symptom: 'Inconsistent continuity readings',
            measurement: 'Results vary significantly between tests',
            interpretation: 'Intermittent connection or poor test technique',
            severity: 'medium',
            possibleCauses: [
              'Oxidised connection surfaces',
              'Intermittent contact in accessories',
              'Poor test lead connections',
              'Temperature effects on conductor resistance'
            ],
            diagnosticSteps: [
              'Clean all test connection points thoroughly',
              'Repeat tests with multiple instruments',
              'Check test lead integrity and calibration',
              'Test under different environmental conditions'
            ],
            rectificationMethods: [
              'Clean and tighten all connection points',
              'Replace accessories with poor connections',
              'Use calibrated test equipment only',
              'Document environmental conditions during testing'
            ],
            regulation: 'BS 7671: 643.2 - General requirements for continuity testing'
          }
        ]
      },
      {
        id: 'voltage-readings',
        title: 'Voltage Measurement Analysis',
        category: 'voltage',
        icon: <Zap className="h-5 w-5 text-yellow-400" />,
        description: 'Comprehensive voltage diagnostic procedures and interpretations',
        diagnostics: [
          {
            symptom: 'Complete loss of power - no voltage present',
            measurement: '0V between all conductors',
            interpretation: 'Total supply failure or upstream isolation',
            severity: 'critical',
            possibleCauses: [
              'Main fuse blown at supply head',
              'Utility supply failure or maintenance',
              'Open circuit in incoming supply cables',
              'Faulty main switch or isolator'
            ],
            diagnosticSteps: [
              'Check neighbouring properties for power availability',
              'Verify main switch position and operation',
              'Test at supply head if accessible and safe',
              'Contact DNO if external supply fault confirmed'
            ],
            rectificationMethods: [
              'Replace blown main fuse (DNO responsibility)',
              'Repair damaged supply cables (qualified person)',
              'Replace faulty main switch or isolator',
              'Await utility restoration if network fault'
            ],
            regulation: 'BS 7671: 430.3, Electricity Safety, Quality and Continuity Regulations'
          },
          {
            symptom: 'Dangerous voltage condition detected',
            measurement: '240V between live and earth, 0V neutral to earth',
            interpretation: 'Lost neutral connection - IMMEDIATE DANGER',
            severity: 'critical',
            possibleCauses: [
              'Broken neutral conductor in supply system',
              'Loose neutral connection at main terminal',
              'Failed neutral connection at transformer',
              'Corroded neutral conductor in underground supply'
            ],
            diagnosticSteps: [
              'IMMEDIATELY isolate main switch and place warning notices',
              'Test neutral continuity from consumer unit to cutout',
              'Check all neutral connections for tightness',
              'Measure voltage between phases if 3-phase supply'
            ],
            rectificationMethods: [
              'Contact DNO immediately - this is a supply fault',
              'Tighten all accessible neutral connections',
              'Do NOT attempt to work on supply side connections',
              'Ensure all circuits remain isolated until DNO repair'
            ],
            regulation: 'BS 7671: 411.3.1.1, PME conditions'
          },
          {
            symptom: 'Voltage drop under load conditions',
            measurement: 'Voltage drops below 216V when load applied',
            interpretation: 'Excessive circuit resistance or overloading',
            severity: 'high',
            possibleCauses: [
              'Loose connections causing high resistance',
              'Undersized conductors for the load',
              'Corroded connections in junction boxes',
              'Overloaded circuit exceeding design capacity'
            ],
            diagnosticSteps: [
              'Measure voltage both on-load and off-load',
              'Check circuit loading with clamp meter',
              'Test all accessible connections for tightness',
              'Calculate circuit design parameters vs actual load'
            ],
            rectificationMethods: [
              'Tighten all loose connections found',
              'Upgrade conductor size if undersized',
              'Redistribute loads across multiple circuits',
              'Replace corroded accessories and connections'
            ],
            regulation: 'BS 7671: 525, Appendix 4 - Current-carrying capacity'
          }
        ]
      },
      {
        id: 'power-quality-analysis',
        title: 'Power Quality Analysis',
        category: 'power-quality',
        icon: <Activity className="h-5 w-5 text-blue-400" />,
        description: 'Advanced power quality assessment and harmonic analysis procedures',
        diagnostics: [
          {
            symptom: 'Equipment malfunction with normal voltage levels',
            measurement: 'High harmonic distortion detected (THD >5%)',
            interpretation: 'Poor power quality affecting sensitive equipment',
            severity: 'high',
            possibleCauses: [
              'Non-linear loads causing harmonic distortion',
              'Switched mode power supplies in large quantities',
              'Variable frequency drives without filters',
              'Fluorescent lighting with electronic ballasts'
            ],
            diagnosticSteps: [
              'Measure total harmonic distortion (THD)',
              'Analyse individual harmonic components',
              'Identify sources of harmonic generation',
              'Check equipment susceptibility to harmonics'
            ],
            rectificationMethods: [
              'Install harmonic filters at source',
              'Use K-rated transformers for harmonic loads',
              'Segregate sensitive equipment supplies',
              'Upgrade to harmonic-resistant equipment'
            ],
            regulation: 'BS EN 61000-3-2, BS 7671: 331'
          },
          {
            symptom: 'Frequent nuisance tripping of protective devices',
            measurement: 'High frequency transients detected',
            interpretation: 'Electrical noise affecting system protection',
            severity: 'medium',
            possibleCauses: [
              'Switching transients from motors and contactors',
              'Lightning-induced transients',
              'Capacitor switching operations',
              'Poor grounding of electronic equipment'
            ],
            diagnosticSteps: [
              'Use oscilloscope to capture transient events',
              'Monitor during switching operations',
              'Check grounding system integrity',
              'Correlate events with equipment operation'
            ],
            rectificationMethods: [
              'Install surge protection devices',
              'Improve earthing and bonding systems',
              'Use RC snubber circuits on inductive loads',
              'Upgrade to type-B or type-C RCDs if appropriate'
            ],
            regulation: 'BS 7671: 443 - Protection against overvoltages'
          }
        ]
      },
      {
        id: 'load-analysis',
        title: 'Load Analysis & Current Measurement',
        category: 'load',
        icon: <Target className="h-5 w-5 text-orange-400" />,
        description: 'Comprehensive load analysis and current measurement techniques',
        diagnostics: [
          {
            symptom: 'Circuit breaker trips under normal load',
            measurement: 'Current readings within design limits',
            interpretation: 'Protective device degradation or incorrect rating',
            severity: 'high',
            possibleCauses: [
              'Aged circuit breaker with reduced trip current',
              'Incorrect protective device rating for circuit',
              'High ambient temperature affecting trip characteristics',
              'Manufacturing defect in protective device'
            ],
            diagnosticSteps: [
              'Measure actual load current over time',
              'Check protective device rating against circuit design',
              'Test trip characteristics if possible',
              'Monitor ambient temperature conditions'
            ],
            rectificationMethods: [
              'Replace aged or faulty protective devices',
              'Verify correct rating for circuit application',
              'Improve ventilation around distribution board',
              'Use temperature-compensated devices if required'
            ],
            regulation: 'BS 7671: 433 - Protection against overload current'
          },
          {
            symptom: 'Unbalanced loading in three-phase system',
            measurement: 'Significant difference in phase currents',
            interpretation: 'Poor load distribution causing neutral current',
            severity: 'medium',
            possibleCauses: [
              'Single-phase loads not evenly distributed',
              'Failed equipment on one phase',
              'Incorrect phase rotation in motor circuits',
              'Loose connection on one phase conductor'
            ],
            diagnosticSteps: [
              'Measure current on all three phases simultaneously',
              'Check neutral current in balanced system',
              'Verify phase rotation and sequence',
              'Inspect all three-phase connections'
            ],
            rectificationMethods: [
              'Redistribute single-phase loads across phases',
              'Repair or replace failed single-phase equipment',
              'Correct phase rotation if wrong',
              'Tighten loose phase conductor connections'
            ],
            regulation: 'BS 7671: 314 - Division of installation'
          }
        ]
      },
      {
        id: 'temperature-analysis',
        title: 'Temperature & Thermal Analysis',
        category: 'thermal',
        icon: <Eye className="h-5 w-5 text-red-400" />,
        description: 'Thermal imaging and temperature analysis for fault detection',
        diagnostics: [
          {
            symptom: 'Hot spots detected in electrical connections',
            measurement: 'Temperature >10°C above ambient at connections',
            interpretation: 'High resistance connections causing power loss',
            severity: 'high',
            possibleCauses: [
              'Loose terminations at accessories or distribution board',
              'Corroded connections reducing contact area',
              'Undersized connections for current carried',
              'Poor quality connection materials'
            ],
            diagnosticSteps: [
              'Use thermal imaging to map temperature distribution',
              'Compare connection temperatures across installation',
              'Check connection tightness with appropriate torque',
              'Measure current through overheating connections'
            ],
            rectificationMethods: [
              'Retighten all loose connections to specified torque',
              'Clean corroded connection surfaces',
              'Upgrade connection size if undersized',
              'Replace poor quality connection materials'
            ],
            regulation: 'BS 7671: 526 - Electrical connections'
          },
          {
            symptom: 'Cable overheating without obvious overload',
            measurement: 'Cable temperature >70°C for PVC insulation',
            interpretation: 'Excessive ambient temperature or poor installation',
            severity: 'medium',
            possibleCauses: [
              'Cables installed in high ambient temperature areas',
              'Poor ventilation around cable routes',
              'Cables grouped together without derating',
              'Insulation material degradation'
            ],
            diagnosticSteps: [
              'Measure ambient temperature along cable route',
              'Check cable installation method and grouping',
              'Verify current-carrying capacity calculations',
              'Inspect cable insulation condition'
            ],
            rectificationMethods: [
              'Improve ventilation around cables',
              'Separate grouped cables or apply derating',
              'Relocate cables from high temperature areas',
              'Replace cables with higher temperature rating'
            ],
            regulation: 'BS 7671: 523 - Current-carrying capacity and voltage drop'
          }
        ]
      },
      {
        id: 'transient-analysis',
        title: 'Transient & Intermittent Fault Analysis',
        category: 'transient',
        icon: <Clock className="h-5 w-5 text-purple-400" />,
        description: 'Analysis techniques for difficult-to-diagnose intermittent faults',
        diagnostics: [
          {
            symptom: 'Random equipment resets or malfunctions',
            measurement: 'Intermittent voltage dips <200V for short periods',
            interpretation: 'Voltage transients or brief interruptions',
            severity: 'medium',
            possibleCauses: [
              'Large motor starting causing voltage dips',
              'Utility switching operations',
              'Loose connections creating intermittent resistance',
              'Capacitor bank switching transients'
            ],
            diagnosticSteps: [
              'Use data logging equipment to capture events',
              'Correlate events with time and external factors',
              'Monitor voltage during equipment start-up',
              'Check for patterns in fault occurrence'
            ],
            rectificationMethods: [
              'Install uninterruptible power supplies for sensitive loads',
              'Use soft-start devices for large motors',
              'Improve supply system earthing and filtering',
              'Coordinate with utility for supply improvements'
            ],
            regulation: 'BS 7671: 443 - Protection against overvoltages'
          },
          {
            symptom: 'Intermittent earth fault indications',
            measurement: 'RCD trips randomly with no apparent cause',
            interpretation: 'Transient earth leakage or faulty RCD',
            severity: 'high',
            possibleCauses: [
              'Moisture ingress varying with weather conditions',
              'Cable damage causing intermittent earth contact',
              'RCD nuisance tripping due to transients',
              'Equipment with variable earth leakage current'
            ],
            diagnosticSteps: [
              'Monitor earth leakage current over time',
              'Test during different weather conditions',
              'Isolate circuits systematically to identify source',
              'Check RCD sensitivity and operation'
            ],
            rectificationMethods: [
              'Improve cable sealing and moisture protection',
              'Replace damaged cables causing intermittent faults',
              'Install type-B RCD for better transient immunity',
              'Use earth leakage monitoring equipment'
            ],
            regulation: 'BS 7671: 531.3 - RCD protection requirements'
          }
        ]
      },
      {
        id: 'insulation-diagnostics',
        title: 'Insulation Resistance Analysis',
        category: 'insulation',
        icon: <Shield className="h-5 w-5 text-blue-400" />,
        description: 'Advanced insulation testing and failure analysis procedures',
        diagnostics: [
          {
            symptom: 'Immediate insulation failure detected',
            measurement: 'Reading below 1MΩ at 500V DC',
            interpretation: 'Dangerous insulation breakdown requiring immediate action',
            severity: 'critical',
            possibleCauses: [
              'Water ingress into electrical accessories',
              'Physical damage to cable insulation',
              'Age-related insulation deterioration',
              'Contamination of insulation surfaces'
            ],
            diagnosticSteps: [
              'Isolate affected circuit immediately',
              'Test individual sections to locate fault',
              'Visual inspection for obvious damage or moisture',
              'Use step voltage testing to pinpoint location'
            ],
            rectificationMethods: [
              'Dry out wet accessories and retest',
              'Replace damaged cable sections',
              'Clean contaminated surfaces thoroughly',
              'Replace aged cables showing deterioration'
            ],
            regulation: 'BS 7671: 643.4 - Insulation resistance testing'
          },
          {
            symptom: 'Marginal insulation resistance values',
            measurement: 'Readings between 1-2MΩ consistently',
            interpretation: 'Deteriorating insulation requiring monitoring and action',
            severity: 'medium',
            possibleCauses: [
              'Gradual moisture absorption in cables',
              'Thermal cycling causing insulation stress',
              'Chemical contamination of insulation',
              'Partial water ingress not yet critical'
            ],
            diagnosticSteps: [
              'Perform tests at different times to check consistency',
              'Test after heating cables with load',
              'Check for environmental factors affecting results',
              'Compare with previous test results if available'
            ],
            rectificationMethods: [
              'Plan replacement during next maintenance period',
              'Increase monitoring frequency to monthly',
              'Improve cable protection from moisture',
              'Consider upgrading to higher specification cables'
            ],
            regulation: 'BS 7671: 643.4.1 - Minimum values for insulation resistance'
          }
        ]
      },
      {
        id: 'earth-fault-analysis',
        title: 'Earth Fault Loop Analysis',
        category: 'earthing',
        icon: <Activity className="h-5 w-5 text-green-400" />,
        description: 'Comprehensive earth fault loop impedance diagnostics and solutions',
        diagnostics: [
          {
            symptom: 'Earth loop impedance exceeds maximum values',
            measurement: 'Zs reading above table values in BS 7671',
            interpretation: 'Inadequate fault protection - disconnection times not met',
            severity: 'critical',
            possibleCauses: [
              'High resistance earth electrode connection',
              'Corroded earth bonding connections',
              'Break in protective conductor circuit',
              'Poor supply earth connection (DNO issue)'
            ],
            diagnosticSteps: [
              'Test earth electrode resistance separately',
              'Check continuity of protective conductors',
              'Inspect main earthing terminal connections',
              'Test at distribution board and compare with circuits'
            ],
            rectificationMethods: [
              'Install additional earth electrodes if required',
              'Improve earth electrode connections and protection',
              'Install RCD protection as alternative measure',
              'Contact DNO if supply earth connection poor'
            ],
            regulation: 'BS 7671: 411.3.2 - Maximum values of earth fault loop impedance'
          }
        ]
      },
      {
        id: 'rcd-circuit-analysis',
        title: 'RCD and Circuit Protection Analysis',
        category: 'protection',
        icon: <Shield className="h-5 w-5 text-purple-400" />,
        description: 'Comprehensive RCD testing and circuit protection diagnostics',
        diagnostics: [
          {
            symptom: 'RCD fails to operate within required time',
            measurement: 'Trip time exceeds 300ms at rated current',
            interpretation: 'RCD deterioration or fault requiring replacement',
            severity: 'critical',
            possibleCauses: [
              'Internal RCD mechanism wear or damage',
              'Contamination of RCD internal components',
              'Manufacturing defect in RCD device',
              'Age-related deterioration of magnetic circuit'
            ],
            diagnosticSteps: [
              'Test at multiple current levels (1x, 5x rated)',
              'Check RCD test button operation',
              'Verify supply voltage during testing',
              'Compare with manufacturer specifications'
            ],
            rectificationMethods: [
              'Replace RCD device immediately',
              'Ensure replacement RCD matches circuit requirements',
              'Test new RCD thoroughly before energising',
              'Document replacement and test results'
            ],
            regulation: 'BS 7671: 643.10 - Testing of RCDs'
          },
          {
            symptom: 'RCD nuisance tripping under normal conditions',
            measurement: 'RCD operates below rated sensitivity threshold',
            interpretation: 'Excessive background leakage or RCD oversensitivity',
            severity: 'high',
            possibleCauses: [
              'Accumulated earth leakage from multiple circuits',
              'Moisture ingress in outdoor electrical equipment',
              'Damaged cable insulation allowing small leakages',
              'Electronic equipment with high earth leakage'
            ],
            diagnosticSteps: [
              'Measure total earth leakage current',
              'Test individual circuits for leakage',
              'Check outdoor equipment for moisture ingress',
              'Identify equipment with high earth leakage'
            ],
            rectificationMethods: [
              'Repair sources of earth leakage current',
              'Redistribute circuits across multiple RCDs',
              'Install RCD with higher sensitivity if appropriate',
              'Improve sealing of outdoor electrical equipment'
            ],
            regulation: 'BS 7671: 531.3.2 - RCD selection and discrimination'
          }
        ]
      }
    ];

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'critical': return 'border-red-500/30 bg-red-500/10';
        case 'high': return 'border-orange-500/30 bg-orange-500/10';
        case 'medium': return 'border-yellow-500/30 bg-yellow-500/10';
        default: return 'border-muted/20 bg-muted/5';
      }
    };

    const getSeverityBadge = (severity: string) => {
      const colors = {
        critical: 'bg-red-500/20 text-red-400 border-red-500/30',
        high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      };
      return colors[severity as keyof typeof colors] || 'bg-muted/20 text-muted-foreground border-muted/30';
    };

    return (
      <div className="space-y-4">
        {diagnosticScenarios.map((scenario, index) => (
          <Collapsible key={scenario.id}>
            <Card className={`transition-all duration-200 ${getStepColor(scenario.category)} hover:shadow-md`}>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-black/10 active:bg-black/15 transition-all touch-manipulation">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        {scenario.icon}
                      </div>
                      <CardTitle className={`text-left ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {scenario.title}
                      </CardTitle>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </div>
                  <p className="text-left text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {scenario.diagnostics.map((diagnostic, diagIndex) => (
                    <div key={diagIndex} className={`rounded-lg p-4 border ${getSeverityColor(diagnostic.severity)}`}>
                      <div className="space-y-4">
                        {/* Header with symptom and severity */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h4 className="font-semibold text-sm text-primary">
                            {diagnostic.symptom}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs w-fit ${getSeverityBadge(diagnostic.severity)}`}
                          >
                            {diagnostic.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        {/* Test measurement section */}
                        <div className="bg-background/50 rounded-lg p-3 border">
                          <h5 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                            Test Measurement
                          </h5>
                          <p className="text-sm font-mono text-foreground">
                            {diagnostic.measurement}
                          </p>
                        </div>
                        
                        {/* Interpretation */}
                        <div>
                          <h5 className="font-medium text-xs text-yellow-400 mb-2 uppercase tracking-wide">
                            Technical Interpretation
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {diagnostic.interpretation}
                          </p>
                        </div>
                        
                        {/* Possible causes in grid layout for mobile */}
                        <div>
                          <h5 className="font-medium text-xs text-orange-400 mb-2 uppercase tracking-wide">
                            Probable Causes
                          </h5>
                          <div className="grid gap-1.5">
                            {diagnostic.possibleCauses.map((cause, causeIndex) => (
                              <div key={causeIndex} className="flex items-start gap-2 text-sm">
                                <span className="text-orange-400 mt-1">•</span>
                                <span className="text-muted-foreground">{cause}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Diagnostic steps */}
                        <div>
                          <h5 className="font-medium text-xs text-blue-400 mb-3 uppercase tracking-wide">
                            Diagnostic Procedure
                          </h5>
                          <div className="space-y-2">
                            {diagnostic.diagnosticSteps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-start gap-3">
                                <Badge variant="outline" className="text-xs min-w-[28px] h-6 flex items-center justify-center bg-blue-500/10 border-blue-500/30 text-blue-400">
                                  {stepIndex + 1}
                                </Badge>
                                <span className="text-sm text-muted-foreground flex-1">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Rectification methods */}
                        <div>
                          <h5 className="font-medium text-xs text-green-400 mb-3 uppercase tracking-wide">
                            Rectification Methods
                          </h5>
                          <div className="space-y-2">
                            {diagnostic.rectificationMethods.map((method, methodIndex) => (
                              <div key={methodIndex} className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground flex-1">{method}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Regulation reference */}
                        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                          <h5 className="font-medium text-xs text-blue-400 mb-1 uppercase tracking-wide flex items-center gap-2">
                            <BookOpen className="h-3 w-3" />
                            Regulatory Compliance
                          </h5>
                          <p className="text-xs text-blue-400">{diagnostic.regulation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    );
  };

  const RealWorldFaultsContent = () => {
    const realWorldFaults = [
      {
        id: 'short-circuit-examples',
        title: 'Short Circuit Fault Examples',
        category: 'overcurrent',
        icon: <Zap className="h-5 w-5 text-blue-400" />,
        description: 'Real-world examples of short circuit faults and their resolution',
        examples: [
          {
            scenario: 'Nail through cable during DIY work',
            symptoms: 'MCB trips immediately, no power to affected circuit',
            diagnosis: 'Insulation resistance test shows <0.1MΩ reading',
            solution: 'Locate damaged cable section and replace',
            rectification: '1. Isolate circuit and test dead. 2. Use cable tracer to locate exact damage point. 3. Cut out damaged section with 300mm clearance each side. 4. Install joint box with 20A connector blocks. 5. Test insulation resistance >1MΩ. 6. Reinstate circuit and verify operation. 7. Install cable markers for future reference.',
            location: 'Domestic property - living room wall',
            timeToResolve: '2-3 hours',
            prevention: 'Use cable route markers and detection equipment before drilling'
          },
          {
            scenario: 'Water ingress in outdoor socket',
            symptoms: 'RCD and MCB both trip when socket switched on',
            diagnosis: 'Visual inspection reveals water in socket enclosure',
            solution: 'Dry out enclosure, test insulation, improve IP rating',
            rectification: '1. Isolate and lock off circuit. 2. Remove socket faceplate and inspect terminals. 3. Dry all components with compressed air. 4. Test insulation resistance and continuity. 5. Apply silicone sealant to back box. 6. Replace with IP66 rated socket if required. 7. Install drainage holes at bottom of enclosure. 8. Test RCD operation and loop impedance.',
            location: 'Garden area - weatherproof socket',
            timeToResolve: '1-2 hours',
            prevention: 'Regular inspection of outdoor equipment seals'
          },
          {
            scenario: 'Rodent damage to cable in loft space',
            symptoms: 'Multiple circuits affected, intermittent faulting',
            diagnosis: 'Physical damage visible on cable insulation',
            solution: 'Replace damaged cable sections and improve cable protection',
            rectification: '1. Identify all affected cables through visual inspection. 2. Test insulation resistance on each damaged cable. 3. Replace any cable with <1MΩ reading. 4. Install steel wire armour (SWA) or conduit protection. 5. Seal entry points to prevent future access. 6. Set traps if active infestation present. 7. Schedule follow-up inspection after 3 months.',
            location: 'Domestic loft space',
            timeToResolve: '4-6 hours',
            prevention: 'Use armoured cable in areas accessible to rodents'
          },
          {
            scenario: 'Underground cable severed by excavator',
            symptoms: 'Total power loss to outbuilding, visible damage to cable',
            diagnosis: 'Excavation revealed severed SWA cable with all cores damaged',
            solution: 'Replace underground cable with deeper burial or protected route',
            rectification: '1. Isolate supply and make safe. 2. Excavate to expose full damage. 3. Install new route if existing too shallow. 4. Use 70mm² SWA minimum for 40A supply. 5. Install warning tape 300mm above cable. 6. Backfill with sand and marker posts. 7. Update site drawings with new route. 8. Test loop impedance and insulation.',
            location: 'Commercial site - outbuilding supply',
            timeToResolve: '1-2 days',
            prevention: 'CAT scanning before excavation, deeper burial with warning tape'
          },
          {
            scenario: 'Arc fault from loose connection in distribution board',
            symptoms: 'Intermittent power loss, burning smell, scorch marks on MCB',
            diagnosis: 'Thermal imaging shows hot spot, loose connection on MCB terminal',
            solution: 'Replace damaged MCB and improve termination',
            rectification: '1. Isolate main switch and test dead. 2. Remove affected MCB and inspect terminal damage. 3. Cut back damaged cable end by 50mm. 4. Clean and inspect busbar for damage. 5. Install new MCB with correct torque settings. 6. Apply thermal compound if busbar shows pitting. 7. Tighten all adjacent connections. 8. Monitor with thermal camera after energising.',
            location: 'Industrial premises - main distribution board',
            timeToResolve: '2-3 hours',
            prevention: 'Annual thermal imaging surveys and connection torque checks'
          },
          {
            scenario: 'Cable joint failure on three-phase supply',
            symptoms: 'Single phase lost on three-phase equipment, motor won\'t start',
            diagnosis: 'Voltage testing shows 230V on two phases, 0V on third phase',
            solution: 'Locate and remake failed joint connection',
            rectification: '1. Isolate three-phase supply and prove dead. 2. Test each phase for continuity to identify failed phase. 3. Locate joint position using cable route drawings. 4. Excavate or access joint enclosure. 5. Cut out failed joint and remake with resin-filled connectors. 6. Apply heat-shrink sleeve and re-seal enclosure. 7. Test phase rotation and voltage balance. 8. Load test with motor starting.',
            location: 'Factory workshop - motor supply',
            timeToResolve: '4-6 hours',
            prevention: 'Use high-quality joints rated for load current and environment'
          }
        ]
      },
      {
        id: 'overload-examples',
        title: 'Overload Condition Examples',
        category: 'overcurrent',
        icon: <Activity className="h-5 w-5 text-orange-400" />,
        description: 'Real scenarios showing how circuits become overloaded',
        examples: [
          {
            scenario: 'Kitchen ring circuit with multiple high-power appliances',
            symptoms: '32A MCB trips after 10-15 minutes of operation',
            diagnosis: 'Current measurement shows 35A sustained load',
            solution: 'Install additional circuits for high-power appliances',
            rectification: '1. Calculate actual load requirements for all appliances. 2. Install dedicated 32A circuit for oven using 6mm² cable. 3. Install 20A circuit for microwave and dishwasher. 4. Redistribute existing sockets across multiple circuits. 5. Update consumer unit with additional MCBs. 6. Test all circuits for compliance. 7. Provide load schedule to customer.',
            location: 'Domestic kitchen',
            timeToResolve: '4-8 hours',
            prevention: 'Calculate diversity factors during design phase'
          },
          {
            scenario: 'Office extension loaded with IT equipment',
            symptoms: 'New equipment causes existing circuits to trip',
            diagnosis: 'Load assessment shows circuit design exceeded',
            solution: 'Install additional circuits and redistribute loads',
            rectification: '1. Conduct comprehensive load survey using power analyser. 2. Install sub-distribution board for IT equipment. 3. Provide UPS-backed circuits for critical equipment. 4. Install 20A circuits for high-power equipment (servers, printers). 5. Separate lighting from power circuits. 6. Install monitoring equipment to track ongoing loads. 7. Provide expansion capacity for future growth.',
            location: 'Commercial office space',
            timeToResolve: '1-2 days',
            prevention: 'Conduct load surveys before adding equipment'
          },
          {
            scenario: 'Immersion heater on lighting circuit',
            symptoms: 'Lighting circuit MCB trips regularly',
            diagnosis: '3kW load on 6A lighting circuit',
            solution: 'Install dedicated circuit for immersion heater',
            rectification: '1. Install new 16A MCB in consumer unit. 2. Run 2.5mm² T&E cable to immersion heater position. 3. Install 20A DP switch with flex outlet. 4. Connect immersion heater via 2.5mm² heat-resistant flex. 5. Install timer control if required. 6. Test insulation resistance and earth continuity. 7. Commission system and test operation.',
            location: 'Domestic property - airing cupboard',
            timeToResolve: '3-4 hours',
            prevention: 'Always use appropriately rated circuits for fixed appliances'
          },
          {
            scenario: 'Electric vehicle charger causing main fuse to blow',
            symptoms: 'Main 100A fuse blows when EV charger operates with other loads',
            diagnosis: 'Diversity calculation shows supply capacity exceeded',
            solution: 'Upgrade supply capacity or install load management system',
            rectification: '1. Contact DNO to assess supply capacity upgrade options. 2. Install smart load management system to prioritise EV charging. 3. Programme system to reduce EV charge rate when other loads active. 4. Consider time-of-use charging during off-peak periods. 5. Install energy monitoring to track consumption. 6. Upgrade to three-phase supply if required. 7. Test load management operation.',
            location: 'Domestic property with EV charger',
            timeToResolve: '2-3 weeks (including DNO work)',
            prevention: 'Load assessment before EV charger installation'
          },
          {
            scenario: 'Workshop with multiple power tools on single circuit',
            symptoms: 'Circuit trips when multiple tools used simultaneously',
            diagnosis: 'Single 16A circuit supplying 25A of connected load',
            solution: 'Install multiple circuits for different tool zones',
            rectification: '1. Map workshop areas and tool locations. 2. Install sub-board with 4x16A circuits. 3. Zone circuits: bench tools, floor-standing equipment, portable tools, lighting. 4. Use 13A sockets for portable tools, 16A for fixed equipment. 5. Install emergency stop system for all power circuits. 6. Provide adequate earth bonding for metalwork. 7. Test all circuits and provide user training.',
            location: 'Small engineering workshop',
            timeToResolve: '1-2 days',
            prevention: 'Plan electrical layout based on simultaneous use requirements'
          }
        ]
      },
      {
        id: 'earth-fault-examples',
        title: 'Earth Fault Examples',
        category: 'earthing',
        icon: <Activity className="h-5 w-5 text-green-400" />,
        description: 'Common earth fault scenarios and their investigation',
        examples: [
          {
            scenario: 'Damaged cable in garden causing earth leakage',
            symptoms: 'RCD trips when garden equipment connected',
            diagnosis: 'Insulation resistance shows 0.5MΩ to earth',
            solution: 'Replace damaged underground cable with armoured type',
            rectification: '1. Isolate circuit and confirm dead. 2. Locate damage using cable fault locator. 3. Excavate damaged section with 500mm clearance. 4. Install 1.5mm² SWA cable at 600mm depth. 5. Use brass glands and IP68 joints. 6. Install warning tape 300mm above cable. 7. Test insulation resistance >1MΩ. 8. Backfill with sand and replace surface.',
            location: 'Garden - underground cable run',
            timeToResolve: '4-6 hours',
            prevention: 'Use proper burial depth and cable protection'
          },
          {
            scenario: 'Corroded earth electrode in TT system',
            symptoms: 'High earth loop impedance readings',
            diagnosis: 'Earth electrode resistance >200Ω',
            solution: 'Install additional earth electrode in parallel',
            rectification: '1. Test existing electrode resistance. 2. Install new copper earth rod 2m from existing. 3. Drive rod to 2.4m depth or refusal. 4. Connect with 16mm² earth cable in protective conduit. 5. Install inspection pit for testing access. 6. Test combined electrode resistance <20Ω. 7. Apply petroleum jelly to connections. 8. Schedule annual resistance testing.',
            location: 'Rural property - main earth electrode',
            timeToResolve: '4-8 hours',
            prevention: 'Regular earth electrode resistance testing'
          },
          {
            scenario: 'Water ingress in outdoor distribution board',
            symptoms: 'Multiple RCDs tripping in wet weather',
            diagnosis: 'Moisture visible in board, low insulation readings',
            solution: 'Improve board sealing and install drainage',
            rectification: '1. Isolate and make safe all circuits. 2. Remove all equipment and dry enclosure. 3. Inspect cable entries for damage. 4. Install IP65 glands on all cable entries. 5. Apply silicone sealant to back of enclosure. 6. Install drainage channels at base. 7. Replace with higher IP rating if necessary. 8. Test all circuits after 24-hour drying period.',
            location: 'External wall - outdoor consumer unit',
            timeToResolve: '2-4 hours',
            prevention: 'Ensure adequate IP rating for environmental conditions'
          },
          {
            scenario: 'Swimming pool equipment causing earth leakage',
            symptoms: 'Pool RCD trips when pump motor starts',
            diagnosis: 'Motor insulation deteriorated due to moisture ingress',
            solution: 'Replace motor and improve enclosure protection',
            rectification: '1. Isolate and lock off pool electrical supply. 2. Remove pump motor and test windings. 3. Replace motor with IP55 rated equivalent. 4. Install motor in weatherproof enclosure. 5. Upgrade cable to H07RN-F type for wet areas. 6. Test RCD at 30mA and verify 300ms trip time. 7. Check earth bonding to pool metalwork. 8. Commission system with full operational test.',
            location: 'Domestic swimming pool plant room',
            timeToResolve: '4-6 hours',
            prevention: 'Annual insulation testing of pool equipment'
          },
          {
            scenario: 'Caravan site RCD nuisance tripping',
            symptoms: 'Site RCD trips randomly during wet weather',
            diagnosis: 'Multiple small earth leakages from various caravans',
            solution: 'Install individual RCD protection for each pitch',
            rectification: '1. Test each caravan supply post for earth leakage. 2. Install 30mA RCD at each pitch position. 3. Uprate main RCD to 100mA delayed type. 4. Test system selectivity under fault conditions. 5. Install earth leakage monitoring equipment. 6. Provide customer guidance on appliance maintenance. 7. Schedule monthly RCD testing programme.',
            location: 'Caravan park - distribution system',
            timeToResolve: '2-3 days',
            prevention: 'Individual RCD protection and regular appliance PAT testing'
          },
          {
            scenario: 'Solar PV installation causing earth fault',
            symptoms: 'Main RCD trips during sunny periods when PV generating',
            diagnosis: 'DC earth leakage current affecting AC protective devices',
            solution: 'Install Type B RCD for PV installation',
            rectification: '1. Isolate AC and DC sides of PV system. 2. Test DC cable insulation resistance. 3. Install Type B RCD for PV circuits. 4. Separate PV and domestic earth systems if required. 5. Test RCD functionality with DC fault simulation. 6. Install earth fault monitoring on DC side. 7. Commission system with earth fault test. 8. Provide customer training on isolation procedures.',
            location: 'Domestic property with roof-mounted PV',
            timeToResolve: '4-6 hours',
            prevention: 'Use Type B RCDs for PV installations from outset'
          }
        ]
      },
      {
        id: 'open-circuit-examples',
        title: 'Open Circuit Examples',
        category: 'earthing',
        icon: <Target className="h-5 w-5 text-blue-400" />,
        description: 'Examples of breaks in circuit continuity',
        examples: [
          {
            scenario: 'Broken neutral connection in socket outlet',
            symptoms: 'Socket has voltage but appliances won\'t work',
            diagnosis: 'Voltage present L-E but not L-N',
            solution: 'Replace socket outlet with damaged neutral terminal',
            rectification: '1. Isolate circuit and test dead. 2. Remove socket faceplate and inspect terminals. 3. Check neutral terminal for damage or burning. 4. Cut back cable and re-terminate if damage extends to cable. 5. Replace socket if terminal damaged beyond repair. 6. Tighten all connections to manufacturer torque. 7. Test continuity of neutral path. 8. Energise and test operation.',
            location: 'Kitchen socket outlet',
            timeToResolve: '30 minutes',
            prevention: 'Proper termination techniques and regular PAT testing'
          },
          {
            scenario: 'Disconnected CPC in ring final circuit',
            symptoms: 'High R1+R2 readings on ring circuit test',
            diagnosis: 'Open circuit in protective conductor ring',
            solution: 'Locate and reconnect broken earth connection',
            rectification: '1. Test each socket outlet for earth continuity. 2. Identify last good earth connection in ring. 3. Access socket outlet wiring and inspect earth terminals. 4. Remake loose earth connection or replace damaged cable section. 5. Test ring continuity from consumer unit. 6. Verify R1+R2 values within acceptable limits. 7. Test earth fault loop impedance. 8. Record test results.',
            location: 'Ring final circuit - socket outlet',
            timeToResolve: '2-4 hours',
            prevention: 'Careful installation and testing procedures'
          },
          {
            scenario: 'Cable damage from building alterations',
            symptoms: 'Partial loss of power to areas of building',
            diagnosis: 'Continuity test shows break in supply cable',
            solution: 'Install new cable route or repair damaged section',
            rectification: '1. Use cable tracer to locate exact break position. 2. Assess damage extent and repair feasibility. 3. Install bypass cable if repair not viable. 4. Use junction boxes for permanent repairs. 5. Reroute cable if damage risk remains. 6. Update cable route drawings. 7. Test all affected circuits. 8. Provide cable route marking for future work.',
            location: 'Building renovation area',
            timeToResolve: '4-8 hours',
            prevention: 'Accurate cable route drawings and protection during works'
          },
          {
            scenario: 'Failed joint in three-phase motor supply',
            symptoms: 'Motor runs on two phases only, overheating occurs',
            diagnosis: 'Single phase open circuit at motor junction box',
            solution: 'Remake failed phase connection',
            rectification: '1. Isolate three-phase supply and lock off. 2. Test each phase for continuity to motor terminals. 3. Access motor junction box and inspect connections. 4. Clean corroded terminals and remake connection. 5. Apply protective grease to terminals. 6. Check motor earth connection integrity. 7. Test phase rotation before motor start. 8. Monitor motor current balance during operation.',
            location: 'Industrial workshop - motor drive',
            timeToResolve: '1-2 hours',
            prevention: 'Scheduled maintenance of motor connections'
          },
          {
            scenario: 'Lighting circuit neutral break at switch',
            symptoms: 'Lights won\'t turn off, permanent live to lamp',
            diagnosis: 'Neutral conductor broken at light switch position',
            solution: 'Remake neutral connection at switch',
            rectification: '1. Isolate lighting circuit and test dead. 2. Remove light switch faceplate. 3. Identify broken neutral connection in back box. 4. Test neutral continuity back to consumer unit. 5. Remake connection using maintenance-free connector. 6. Ensure adequate cable slack for connections. 7. Test switching operation. 8. Verify no voltage at lamp when switched off.',
            location: 'Domestic property - landing light switch',
            timeToResolve: '30-45 minutes',
            prevention: 'Secure cable fixings and proper termination methods'
          },
          {
            scenario: 'Broken main earth connection to installation',
            symptoms: 'High earth fault loop impedance on all circuits',
            diagnosis: 'Main earthing conductor disconnected from earth terminal',
            solution: 'Remake main earth connection',
            rectification: '1. Isolate main switch and prove dead. 2. Locate main earthing terminal (MET). 3. Inspect earth conductor connection for damage. 4. Clean terminal surfaces and remake connection. 5. Apply petroleum jelly to prevent corrosion. 6. Torque connection to manufacturer specification. 7. Test earth fault loop impedance on all circuits. 8. Check earth electrode resistance if TT system.',
            location: 'Main electrical intake position',
            timeToResolve: '1-2 hours',
            prevention: 'Annual inspection of main earthing connections'
          }
        ]
      },
      {
        id: 'insulation-examples',
        title: 'Insulation Breakdown Examples',
        category: 'insulation',
        icon: <Shield className="h-5 w-5 text-purple-400" />,
        description: 'Cases of insulation deterioration and failure',
        examples: [
          {
            scenario: 'Aged PVC cables in high temperature environment',
            symptoms: 'Insulation resistance dropping below 1MΩ',
            diagnosis: 'Cable insulation shows cracking and brittleness',
            solution: 'Replace aged cables with higher temperature rating',
            rectification: '1. Assess extent of cable deterioration throughout installation. 2. Plan cable replacement in phases to maintain operation. 3. Install XLPE or PTFE cables rated for 90°C operation. 4. Improve ventilation to reduce ambient temperature. 5. Install cable tray separation from heat sources. 6. Test insulation resistance >1MΩ on all new cables. 7. Schedule replacement of remaining aged cables. 8. Monitor temperatures with data logging system.',
            location: 'Boiler room - high ambient temperature',
            timeToResolve: '1-2 days',
            prevention: 'Select cables appropriate for environmental conditions'
          },
          {
            scenario: 'Moisture ingress in underground cable joint',
            symptoms: 'Intermittent earth faults during wet weather',
            diagnosis: 'Water visible in cable joint, low insulation reading',
            solution: 'Re-terminate cable with proper moisture sealing',
            rectification: '1. Excavate joint position and pump out water. 2. Cut back cable to dry insulation either side. 3. Clean and dry all cable ends thoroughly. 4. Use resin-filled joints rated for buried application. 5. Apply heat-shrink outer protection. 6. Install in concrete or plastic joint pit. 7. Test insulation resistance >1MΩ. 8. Backfill with warning tape and marker posts.',
            location: 'Underground cable joint box',
            timeToResolve: '4-6 hours',
            prevention: 'Use proper jointing techniques and weatherproof enclosures'
          },
          {
            scenario: 'Chemical contamination in industrial environment',
            symptoms: 'Rapid deterioration of cable insulation',
            diagnosis: 'Insulation showing chemical attack symptoms',
            solution: 'Install chemically resistant cable types',
            rectification: '1. Identify specific chemicals causing degradation. 2. Select appropriate cable type (FEP, PTFE, or special compounds). 3. Install cables in sealed cable tray with covers. 4. Use chemical-resistant glands and accessories. 5. Provide regular wash-down facilities for cable routes. 6. Install monitoring points for cable condition. 7. Test insulation monthly during commissioning. 8. Establish replacement schedule based on degradation rate.',
            location: 'Chemical processing plant',
            timeToResolve: '2-3 days',
            prevention: 'Specify appropriate cable types for chemical environments'
          },
          {
            scenario: 'Solar panel cable insulation failure on roof',
            symptoms: 'DC earth fault alarms, reduced system performance',
            diagnosis: 'UV degradation of DC cable outer sheath and insulation',
            solution: 'Replace with UV-resistant DC cables',
            rectification: '1. Isolate DC and AC sides of PV system. 2. Test insulation resistance of all DC strings. 3. Replace damaged cables with UV-rated PV cable. 4. Install additional UV protection using cable tray covers. 5. Secure cables to prevent wind damage. 6. Test system earth fault monitoring. 7. Re-commission with full power test. 8. Schedule annual visual inspection of roof cables.',
            location: 'Commercial building - rooftop PV installation',
            timeToResolve: '1-2 days',
            prevention: 'Use proper UV-rated cables and adequate fixing methods'
          },
          {
            scenario: 'Oil-filled transformer leak causing cable insulation damage',
            symptoms: 'Gradual insulation resistance reduction on HV cables',
            diagnosis: 'Transformer oil contamination of cable terminations',
            solution: 'Clean cables and repair transformer leak',
            rectification: '1. Isolate transformer and make safe. 2. Contain and clean up oil spill. 3. Remove contaminated cable sections. 4. Clean remaining cables with approved solvents. 5. Replace oil-contaminated terminations. 6. Repair transformer leak and refill with fresh oil. 7. Test cable insulation after 48-hour cleaning period. 8. Install oil containment system under transformer.',
            location: 'Industrial substation',
            timeToResolve: '3-5 days',
            prevention: 'Regular transformer maintenance and oil containment systems'
          }
        ]
      },
      {
        id: 'supply-quality-examples',
        title: 'Supply Quality Issue Examples',
        category: 'supply_issues',
        icon: <Eye className="h-5 w-5 text-cyan-400" />,
        description: 'Real cases of power quality problems and solutions',
        examples: [
          {
            scenario: 'High harmonic content from nearby industrial load',
            symptoms: 'Computer equipment resets and network errors',
            diagnosis: 'Power quality analysis shows THD >8%',
            solution: 'Install harmonic filters and dedicated clean supplies',
            rectification: '1. Conduct 7-day power quality survey to identify harmonic sources. 2. Install active harmonic filters rated for detected distortion. 3. Provide isolated transformer for sensitive IT equipment. 4. Install K-rated transformers to handle harmonic currents. 5. Separate clean and dirty supply systems. 6. Install power factor correction with harmonic suppression. 7. Monitor ongoing power quality with permanent analysers. 8. Liaise with DNO regarding supply improvements.',
            location: 'Office building near industrial facility',
            timeToResolve: '1-2 weeks',
            prevention: 'Power quality assessment during planning phase'
          },
          {
            scenario: 'Voltage dips from large motor starting',
            symptoms: 'Lighting dims when production machinery starts',
            diagnosis: 'Voltage drops to 85% during motor starting',
            solution: 'Install soft-start equipment or voltage stabilisers',
            rectification: '1. Measure motor starting current and duration. 2. Install soft-start units on large motors >15kW. 3. Upgrade motor supply cables to reduce impedance. 4. Install automatic voltage stabilisers for lighting circuits. 5. Consider variable speed drives for motor control. 6. Coordinate with DNO for supply impedance reduction. 7. Install voltage monitoring and recording equipment. 8. Schedule motor starting to avoid simultaneous operation.',
            location: 'Manufacturing facility',
            timeToResolve: '3-5 days',
            prevention: 'Proper motor starting methods and supply capacity planning'
          },
          {
            scenario: 'Lightning-induced transients',
            symptoms: 'Electronic equipment failure during storms',
            diagnosis: 'High-frequency transients detected on supply',
            solution: 'Install comprehensive surge protection system',
            rectification: '1. Install Type 1 SPD at main incomer position. 2. Fit Type 2 SPDs at distribution boards. 3. Install Type 3 SPDs at sensitive equipment. 4. Coordinate SPD ratings for proper operation sequence. 5. Improve building earth system with lightning protection. 6. Install filtered supplies for critical equipment. 7. Provide UPS systems for essential loads. 8. Test SPD operation annually and after lightning activity.',
            location: 'Exposed rural installation',
            timeToResolve: '2-3 days',
            prevention: 'Risk assessment and surge protection planning'
          },
          {
            scenario: 'Power factor issues causing voltage regulation problems',
            symptoms: 'Voltage varies significantly with load changes',
            diagnosis: 'Power factor <0.8 lagging, high reactive current',
            solution: 'Install automatic power factor correction equipment',
            rectification: '1. Measure power factor at various load conditions. 2. Calculate required reactive power compensation. 3. Install automatic PFC unit with contactors and capacitors. 4. Set target power factor to 0.95 lagging. 5. Include detuning reactors to prevent harmonic resonance. 6. Program automatic control system for load following. 7. Monitor power factor continuously. 8. Schedule regular capacitor testing and maintenance.',
            location: 'Industrial facility with inductive loads',
            timeToResolve: '1-2 weeks',
            prevention: 'Include power factor correction in initial design'
          },
          {
            scenario: 'Neutral-to-earth voltage causing equipment malfunction',
            symptoms: 'IT equipment experiencing random resets and data corruption',
            diagnosis: 'N-E voltage >2V under normal load conditions',
            solution: 'Improve neutral earthing and load distribution',
            rectification: '1. Measure N-E voltage at multiple points in installation. 2. Check main neutral connection integrity at source. 3. Balance single-phase loads across three phases. 4. Install additional neutral conductors where required. 5. Upgrade main earthing conductor if undersized. 6. Install isolation transformers for sensitive equipment. 7. Test neutral-to-earth impedance. 8. Implement ongoing voltage monitoring system.',
            location: 'Office building with mixed IT and general loads',
            timeToResolve: '2-4 days',
            prevention: 'Proper load balancing and adequate neutral sizing'
          },
          {
            scenario: 'Frequency fluctuations from generator auto-start',
            symptoms: 'Motors speed variation and protection trips during power cuts',
            diagnosis: 'Generator frequency drifts ±2Hz during load changes',
            solution: 'Adjust generator governor and load management',
            rectification: '1. Service generator governor control system. 2. Calibrate frequency regulation to ±0.5Hz tolerance. 3. Install load bank for governor testing. 4. Programme load management to prevent sudden load steps. 5. Upgrade generator control panel with digital governor. 6. Install frequency monitoring and protection. 7. Test auto-start sequence under various load conditions. 8. Provide staff training on generator operation.',
            location: 'Hospital standby power system',
            timeToResolve: '2-3 days',
            prevention: 'Regular generator maintenance and governor calibration'
          }
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-400 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Real-World Fault Cases
          </h3>
          <p className="text-sm text-blue-300">
            Detailed case studies from actual fault-finding scenarios, including symptoms, diagnosis methods, 
            solutions, and prevention strategies drawn from real installations.
          </p>
        </div>

        {realWorldFaults.map((category, index) => (
          <Collapsible key={category.id}>
            <Card className={`transition-all duration-200 ${getStepColor(category.category)} hover:shadow-md`}>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-black/10 active:bg-black/15 transition-all touch-manipulation">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        {category.icon}
                      </div>
                      <CardTitle className={`text-left ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {category.title}
                      </CardTitle>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </div>
                  <p className="text-left text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {category.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="bg-background/50 border border-muted/20 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-base text-primary">
                          Case {exampleIndex + 1}: {example.scenario}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {example.timeToResolve}
                        </Badge>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm text-orange-400 mb-1">Symptoms Reported</h5>
                            <p className="text-sm text-muted-foreground">{example.symptoms}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm text-blue-400 mb-1">Diagnosis Method</h5>
                            <p className="text-sm text-muted-foreground">{example.diagnosis}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm text-green-400 mb-1">Solution Applied</h5>
                            <p className="text-sm text-muted-foreground">{example.solution}</p>
                          </div>
                          {example.rectification && (
                            <div>
                              <h5 className="font-medium text-sm text-emerald-400 mb-1">Rectification Steps</h5>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">{example.rectification}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm text-purple-400 mb-1">Location</h5>
                            <p className="text-sm text-muted-foreground">{example.location}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm text-cyan-400 mb-1">Prevention Strategy</h5>
                            <p className="text-sm text-muted-foreground">{example.prevention}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    );
  };

  const CommonFaultsContent = () => {
    const faultCategories = [
      {
        id: 'short-circuit-faults',
        title: 'Short Circuit Faults',
        category: 'overcurrent',
        icon: <Zap className="h-5 w-5 text-red-400" />,
        description: 'Immediate protection device operation due to overcurrent conditions',
        theory: 'Short circuits occur when current flows along an unintended path with minimal resistance, causing excessive current flow that can damage equipment and create fire hazards.',
        detectionMethods: [
          'Immediate MCB or fuse operation upon switching on',
          'Insulation resistance testing showing low or zero readings',
          'Continuity testing revealing unintended connections',
          'Visual inspection showing damaged cables or connections'
        ],
        commonSymptoms: [
          'Circuit breaker trips immediately when switched on',
          'Blown fuses that blow again immediately upon replacement',
          'Sparking or arcing at point of short circuit',
          'Local heating or burning smell from fault location'
        ],
        preventionStrategies: [
          'Use cable route protection and marking during building work',
          'Regular visual inspection of accessible cable routes',
          'Proper cable burial depth and warning tape for underground cables',
          'Adequate IP ratings for outdoor electrical equipment',
          'Rodent-proof cable protection in vulnerable areas'
        ],
        regulation: 'BS 7671: 411, 433 - Protection against overcurrent'
      },
      {
        id: 'overload-conditions',
        title: 'Overload Conditions',
        category: 'overcurrent',
        icon: <Activity className="h-5 w-5 text-orange-400" />,
        description: 'Circuits carrying more current than their design capacity',
        theory: 'Overloads occur when circuit current exceeds the design capacity but remains below short circuit levels, causing gradual heating that can damage insulation and create fire risks.',
        detectionMethods: [
          'Thermal imaging showing elevated cable temperatures',
          'Current measurement exceeding circuit design current',
          'Time-delayed MCB operation under load conditions',
          'Progressive insulation deterioration from overheating'
        ],
        commonSymptoms: [
          'Circuit breakers tripping after period of operation',
          'Warm cables or accessories under normal operation',
          'Voltage drop symptoms (dimming lights, slow motor start)',
          'Premature failure of electrical equipment'
        ],
        preventionStrategies: [
          'Proper load calculation during circuit design',
          'Regular electrical load audits in commercial premises',
          'Diversity calculations for multiple appliance circuits',
          'Circuit separation for high-power appliances',
          'Load monitoring systems for critical installations'
        ],
        regulation: 'BS 7671: 433, 523 - Current-carrying capacity and overload protection'
      },
      {
        id: 'earth-fault-conditions',
        title: 'Earth Fault Conditions',
        category: 'earthing',
        icon: <Activity className="h-5 w-5 text-green-400" />,
        description: 'Faults involving current flow to earth through unintended paths',
        theory: 'Earth faults occur when live conductors make contact with earthed parts, creating a fault current path that should be detected by protective devices to prevent dangerous touch voltages.',
        detectionMethods: [
          'RCD operation indicating earth leakage current',
          'Earth fault loop impedance testing showing high values',
          'Insulation resistance testing revealing earth faults',
          'Touch voltage measurements showing dangerous potentials'
        ],
        commonSymptoms: [
          'RCD tripping with or without load application',
          'Electric shock risk from supposedly earthed equipment',
          'High earth fault loop impedance test results',
          'Nuisance RCD operation during normal use'
        ],
        preventionStrategies: [
          'Regular RCD testing and earth loop impedance monitoring',
          'Proper sealing of outdoor electrical equipment',
          'Adequate earth electrode protection and maintenance',
          'Use of appropriate cable types for installation environment',
          'Earth leakage monitoring systems for critical circuits'
        ],
        regulation: 'BS 7671: 411.3, 531.3, 542 - Earthing and protective conductor requirements'
      },
      {
        id: 'open-circuit-faults',
        title: 'Open Circuit Faults',
        category: 'earthing',
        icon: <Target className="h-5 w-5 text-blue-400" />,
        description: 'Breaks in electrical continuity causing loss of function',
        theory: 'Open circuits represent breaks in the intended current path, preventing normal operation and potentially creating safety hazards if protective conductors are affected.',
        detectionMethods: [
          'Continuity testing showing infinite resistance',
          'Voltage testing confirming supply present but no load current',
          'Step-by-step isolation to locate break point',
          'Visual inspection of connections and cable routes'
        ],
        commonSymptoms: [
          'Complete loss of power to outlets or equipment',
          'Part of ring circuit not functioning (no power at some sockets)',
          'High resistance protective conductor readings',
          'Equipment not earthed despite earth connections present'
        ],
        preventionStrategies: [
          'Secure cable fixings to prevent mechanical stress',
          'Proper connection techniques and termination methods',
          'Cable route protection during building work',
          'Regular continuity testing of protective conductors',
          'Quality assurance during installation work'
        ],
        regulation: 'BS 7671: 526, 543, 643.2 - Electrical connections and continuity'
      },
      {
        id: 'insulation-breakdown',
        title: 'Insulation Breakdown',
        category: 'insulation',
        icon: <Shield className="h-5 w-5 text-purple-400" />,
        description: 'Deterioration of insulation leading to dangerous conditions',
        theory: 'Insulation breakdown occurs when the dielectric properties of insulating materials deteriorate, allowing current to flow between conductors or to earth, creating shock and fire hazards.',
        detectionMethods: [
          'Insulation resistance testing showing low readings',
          'Partial discharge testing revealing insulation stress',
          'Thermal imaging showing hotspots from leakage currents',
          'High voltage testing to assess insulation integrity'
        ],
        commonSymptoms: [
          'Gradually reducing insulation resistance readings',
          'Earth leakage causing RCD sensitivity increase',
          'Tracking marks on insulation surfaces',
          'Localised heating in cables or equipment'
        ],
        preventionStrategies: [
          'Regular insulation resistance monitoring',
          'Appropriate cable specification for environment',
          'Proper cable installation methods and support',
          'Environmental protection for vulnerable installations',
          'Predictive maintenance programs for critical circuits'
        ],
        regulation: 'BS 7671: 522, 643.4 - Wiring system selection and insulation testing'
      },
      {
        id: 'supply-quality-issues',
        title: 'Supply Quality Issues',
        category: 'supply_issues',
        icon: <Eye className="h-5 w-5 text-cyan-400" />,
        description: 'Problems with incoming electrical supply affecting installation performance',
        theory: 'Supply quality issues encompass voltage variations, frequency deviations, harmonics, and transients that can affect equipment operation and installation safety.',
        detectionMethods: [
          'Power quality analysers measuring voltage, frequency, and harmonics',
          'Data logging equipment capturing supply variations',
          'Oscilloscopes for transient analysis',
          'Correlation analysis between supply events and equipment problems'
        ],
        commonSymptoms: [
          'Equipment malfunction despite normal installation tests',
          'Voltage fluctuations causing lighting variations',
          'Frequent nuisance tripping of sensitive equipment',
          'Premature failure of electronic equipment'
        ],
        preventionStrategies: [
          'Power quality monitoring at supply intake',
          'Surge protection devices at multiple levels',
          'Equipment specification considering supply conditions',
          'Coordination with DNO on supply quality issues',
          'Uninterruptible power supplies for critical loads'
        ],
        regulation: 'BS 7671: 443 - Protection against overvoltages, BS EN 50160 - Voltage characteristics'
      }
    ];

    return (
      <div className="space-y-6">
        {faultCategories.map((category, index) => (
          <Collapsible key={category.id}>
            <Card className={`transition-all duration-200 ${getStepColor(category.category)} hover:shadow-md`}>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-black/10 active:bg-black/15 transition-all touch-manipulation">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        {category.icon}
                      </div>
                      <CardTitle className={`text-left ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {category.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                  <p className="text-left text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {/* Theory Section */}
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm text-blue-400 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Theory & Background
                    </h4>
                    <p className="text-sm text-blue-300">{category.theory}</p>
                  </div>

                  {/* Detection Methods */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Detection Methods
                    </h4>
                    <div className="grid gap-2">
                      {category.detectionMethods.map((method, methodIndex) => (
                        <div key={methodIndex} className="flex items-start gap-2 text-sm">
                          <Badge variant="outline" className="text-xs min-w-[24px] h-5 flex items-center justify-center">
                            {methodIndex + 1}
                          </Badge>
                          <span>{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Symptoms */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Common Symptoms
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {category.commonSymptoms.map((symptom, symptomIndex) => (
                        <li key={symptomIndex} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>


                  {/* Prevention Strategies */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Prevention Strategies
                    </h4>
                    <div className="grid gap-2">
                      {category.preventionStrategies.map((strategy, strategyIndex) => (
                        <div key={strategyIndex} className="flex items-start gap-2 text-sm">
                          <Badge variant="outline" className="text-xs min-w-[24px] h-5 flex items-center justify-center">
                            {strategyIndex + 1}
                          </Badge>
                          <span>{strategy}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regulation Reference */}
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg">
                    <h4 className="font-semibold mb-1 text-sm text-purple-400 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Regulatory Reference
                    </h4>
                    <p className="text-sm text-purple-400">{category.regulation}</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    );
  };

  const smartTabs = [
    {
      value: "common-faults",
      label: "Common Faults",
      icon: <AlertTriangle className="h-4 w-4" />,
      content: <CommonFaultsContent />
    },
    {
      value: "real-world-faults",
      label: "Real-World Faults",
      icon: <Target className="h-4 w-4" />,
      content: <RealWorldFaultsContent />
    },
    {
      value: "diagnostics",
      label: "Diagnostics",
      icon: <Search className="h-4 w-4" />,
      content: <DiagnosticsContent />
    },
    {
      value: "methodology",
      label: "Methodology",
      icon: <Target className="h-4 w-4" />,
      content: <MethodologyContent />
    },
    {
      value: "safety",
      label: "Safety",
      icon: <Shield className="h-4 w-4" />,
      content: <SafetyContent />
    },
    {
      value: "test-equipment",
      label: "Test Equipment",
      icon: <Wrench className="h-4 w-4" />,
      content: <TestEquipmentContent />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Learning Hub</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>

        <div className="text-center space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
            <Zap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Fault Finding</h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Learn systematic approaches to electrical fault diagnosis and resolution. 
            Master the methodical process from initial symptoms to successful repair.
          </p>
        </div>

        <SmartTabs 
          tabs={smartTabs}
          defaultValue="common-faults"
          className="space-y-4 sm:space-y-6"
          breakpoint={4}
        />

        {/* Quick Reference */}
        <Card className="border-l-4 border-l-elec-yellow hover:bg-card transition-all">
          <CardHeader className="p-4 sm:p-5 md:p-6">
            <CardTitle className="text-elec-yellow text-lg sm:text-xl md:text-2xl font-bold">
              Quick Reference: Fault Finding Principles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 md:p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="text-center p-4 sm:p-5 bg-black/20 rounded-lg border border-elec-yellow/20 touch-manipulation active:scale-[0.99] transition-transform">
                <Search className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow mx-auto mb-3" />
                <h4 className="font-bold text-elec-yellow mb-2 text-base sm:text-lg">Systematic Approach</h4>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">Follow logical sequence from information gathering to final testing</p>
              </div>
              <div className="text-center p-4 sm:p-5 bg-black/20 rounded-lg border border-red-500/20 touch-manipulation active:scale-[0.99] transition-transform">
                <Target className="h-10 w-10 sm:h-12 sm:w-12 text-red-400 mx-auto mb-3" />
                <h4 className="font-bold text-red-400 mb-2 text-base sm:text-lg">Safety First</h4>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">Always ensure safe isolation before commencing fault location work</p>
              </div>
              <div className="text-center p-4 sm:p-5 bg-black/20 rounded-lg border border-green-500/20 touch-manipulation active:scale-[0.99] transition-transform">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-400 mx-auto mb-3" />
                <h4 className="font-bold text-green-400 mb-2 text-base sm:text-lg">Verify Repair</h4>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">Always test thoroughly after repair to confirm fault has been resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaultFindingSection;