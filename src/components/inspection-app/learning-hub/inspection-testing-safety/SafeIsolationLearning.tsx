import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Zap, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { responsiveHeading, responsiveBody, responsivePadding } from '@/styles/typography-utilities';

interface SafeIsolationLearningProps {
  onBack: () => void;
}

const SafeIsolationLearning = ({ onBack }: SafeIsolationLearningProps) => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const isolationSteps = [
    {
      id: 'switching-off',
      title: 'Switching Off',
      description: 'Safely de-energise the circuit using appropriate switching devices',
      details: [
        'Identify the correct circuit breaker or isolator',
        'Inform relevant personnel before switching',
        'Switch off using appropriate switching sequence',
        'Verify switching operation is complete'
      ],
      regulation: 'BS 7671: 612.1'
    },
    {
      id: 'isolation',
      title: 'Isolation',
      description: 'Physically separate the circuit from all sources of electrical energy',
      details: [
        'Open isolator or remove fuses/links',
        'Ensure isolation is visible where possible',
        'Check isolation device is suitable for load',
        'Verify no parallel feed paths exist'
      ],
      regulation: 'BS 7671: 612.2'
    },
    {
      id: 'securing',
      title: 'Securing',
      description: 'Prevent inadvertent re-energisation during testing work',
      details: [
        'Lock isolator in OFF position',
        'Apply warning notices/tags',
        'Inform other personnel of isolation',
        'Retain key control where applicable'
      ],
      regulation: 'BS 7671: 612.3'
    },
    {
      id: 'testing',
      title: 'Testing for Dead',
      description: 'Verify the circuit is de-energised using appropriate test equipment',
      details: [
        'Test voltage indicator on known live source',
        'Test on the isolated circuit',
        'Test voltage indicator again on known live source',
        'Test between all conductors and earth'
      ],
      regulation: 'BS 7671: 612.4'
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Not testing the voltage indicator before and after',
      consequence: 'May test on dead circuit with faulty tester',
      prevention: 'Always follow "test-test-test" procedure'
    },
    {
      mistake: 'Assuming isolation based on switching only',
      consequence: 'Circuit may still be live via parallel feeds',
      prevention: 'Always verify with voltage testing'
    },
    {
      mistake: 'Poor securing of isolation points',
      consequence: 'Inadvertent re-energisation during work',
      prevention: 'Use proper locks and warning notices'
    },
    {
      mistake: 'Not considering all sources of supply',
      consequence: 'Backfeed or parallel supplies missed',
      prevention: 'Study circuit diagrams and check all sources'
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
          <Zap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
          <h1 className={responsiveHeading.h1 + " text-foreground"}>Safe Isolation for Testing</h1>
        </div>
        <p className={responsiveBody.large + " text-gray-300 max-w-3xl mx-auto px-4"}>
          Learn the essential principles of safe isolation specifically for electrical inspection and testing work. 
          Understand BS 7671 requirements and practical application.
        </p>
      </div>

      <SmartTabs
        defaultValue="principles"
        tabs={[
          {
            value: 'principles',
            label: 'Principles',
            icon: <BookOpen className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Why Safe Isolation is Critical for Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Legal Requirements</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• BS 7671: Wiring Regulations compliance</li>
                    <li>• Electricity at Work Regulations 1989</li>
                    <li>• Health and Safety at Work Act 1974</li>
                    <li>• CDM Regulations 2015</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Testing Specific Risks</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• High test voltages (insulation testing)</li>
                    <li>• Equipment damage from energised testing</li>
                    <li>• False readings on live circuits</li>
                    <li>• Shock risk during test connections</li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={() => markSectionComplete('principles')}
                className="mt-4"
                disabled={completedSections.includes('principles')}
              >
                {completedSections.includes('principles') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Section Complete
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
            </CardContent>
          </Card>
              </div>
            ),
          },
          {
            value: 'procedure',
            label: 'Procedure',
            icon: <CheckCircle className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {isolationSteps.map((step, index) => (
              <Card key={step.id} className="border-green-500/20 bg-green-500/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">
                        {index + 1}
                      </div>
                      {step.title}
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {step.regulation}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            onClick={() => markSectionComplete('procedure')}
            className="w-full"
            disabled={completedSections.includes('procedure')}
          >
            {completedSections.includes('procedure') ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Procedure Mastered
              </>
            ) : (
              'Complete Procedure Study'
            )}
          </Button>
              </div>
            ),
          },
          {
            value: 'mistakes',
            label: 'Common Mistakes',
            icon: <AlertTriangle className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <div className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-300">{mistake.mistake}</h4>
                      <p className="text-gray-300 text-sm">
                        <span className="font-medium text-red-400">Risk:</span> {mistake.consequence}
                      </p>
                      <p className="text-gray-300 text-sm">
                        <span className="font-medium text-green-400">Prevention:</span> {mistake.prevention}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            onClick={() => markSectionComplete('mistakes')}
            className="w-full"
            disabled={completedSections.includes('mistakes')}
          >
            {completedSections.includes('mistakes') ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mistakes Review Complete
              </>
            ) : (
              'Complete Mistakes Review'
            )}
          </Button>
              </div>
            ),
          },
          {
            value: 'scenarios',
            label: 'Scenarios',
            icon: <Zap className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardHeader>
              <CardTitle className="text-foreground">Practical Testing Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Scenario 1: Consumer Unit Testing</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    You need to test circuits in a domestic consumer unit. Multiple circuits share the same neutral.
                  </p>
                  <p className="text-purple-400 text-sm font-medium">
                    Consider: How do you ensure complete isolation for insulation testing?
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Scenario 2: Industrial Installation</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Testing a motor circuit with multiple supply sources and emergency stop circuits.
                  </p>
                  <p className="text-purple-400 text-sm font-medium">
                    Consider: What additional isolation steps are required?
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Scenario 3: Solar PV System</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Testing a property with solar PV installation and battery storage system.
                  </p>
                  <p className="text-purple-400 text-sm font-medium">
                    Consider: How do you isolate DC and AC sources safely?
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => markSectionComplete('scenarios')}
                className="w-full"
                disabled={completedSections.includes('scenarios')}
              >
                {completedSections.includes('scenarios') ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Scenarios Complete
                  </>
                ) : (
                  'Complete Scenarios Study'
                )}
              </Button>
            </CardContent>
          </Card>
              </div>
            ),
          },
        ]}
      />

      {/* Progress Summary */}
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Learning Progress</h3>
              <p className="text-gray-300 text-sm">
                Complete all sections to master safe isolation principles
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-elec-yellow">
                {completedSections.length}/4
              </div>
              <p className="text-sm text-gray-400">Sections Complete</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {['principles', 'procedure', 'mistakes', 'scenarios'].map((section) => (
              <div
                key={section}
                className={`h-2 flex-1 rounded ${
                  completedSections.includes(section) 
                    ? 'bg-elec-yellow' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeIsolationLearning;