import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Droplets, Navigation, Thermometer, Wind, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { responsiveHeading, responsiveBody } from '@/styles/typography-utilities';

interface TestingEnvironmentSafetyProps {
  onBack: () => void;
}

const TestingEnvironmentSafety = ({ onBack }: TestingEnvironmentSafetyProps) => {
  const [completedChecks, setCompletedChecks] = useState<string[]>([]);

  const toggleCheck = (checkId: string) => {
    if (completedChecks.includes(checkId)) {
      setCompletedChecks(completedChecks.filter(id => id !== checkId));
    } else {
      setCompletedChecks([...completedChecks, checkId]);
    }
  };

  const environmentalConditions = [
    {
      id: 'wet-conditions',
      title: 'Wet Conditions',
      icon: Droplets,
      description: 'Testing in damp or wet environments requires special precautions',
      hazards: ['Reduced insulation', 'Shock risk', 'Equipment damage', 'False readings'],
      precautions: [
        'Check IP rating of test equipment',
        'Use appropriate PPE (waterproof)',
        'Ensure adequate ventilation',
        'Consider postponing if conditions too severe'
      ],
      regulations: ['BS 7671: 522.3', 'GS 38']
    },
    {
      id: 'confined-spaces',
      title: 'Confined Spaces',
      icon: Navigation,
      description: 'Testing in confined spaces presents unique risks and requirements',
      hazards: ['Limited escape routes', 'Toxic gases', 'Oxygen deficiency', 'Communication issues'],
      precautions: [
        'Atmospheric testing before entry',
        'Continuous air monitoring',
        'Emergency communication system',
        'Standby person outside space'
      ],
      regulations: ['Confined Spaces Regulations 1997', 'BS 7671: 729']
    },
    {
      id: 'temperature-extremes',
      title: 'Temperature Extremes',
      icon: Thermometer,
      description: 'Hot or cold environments affect both safety and equipment performance',
      hazards: ['Equipment drift', 'Thermal shock', 'Condensation', 'PPE effectiveness'],
      precautions: [
        'Allow equipment acclimatisation',
        'Use temperature-compensated readings',
        'Regular breaks for personnel',
        'Check equipment operating ranges'
      ],
      regulations: ['BS 7671: 522.1', 'Workplace Regulations 1992']
    },
    {
      id: 'ventilation',
      title: 'Poor Ventilation',
      icon: Wind,
      description: 'Inadequate ventilation can lead to accumulation of hazardous substances',
      hazards: ['Gas accumulation', 'Heat buildup', 'Reduced air quality', 'Equipment overheating'],
      precautions: [
        'Ensure adequate air movement',
        'Monitor air quality continuously',
        'Provide mechanical ventilation if needed',
        'Regular personnel rotation'
      ],
      regulations: ['Workplace Regulations 1992', 'COSHH Regulations']
    }
  ];

  const safetyChecklist = [
    { id: 'site-survey', task: 'Complete site survey before testing', category: 'Planning' },
    { id: 'weather-check', task: 'Check weather conditions', category: 'Environmental' },
    { id: 'access-routes', task: 'Identify safe access and egress routes', category: 'Access' },
    { id: 'emergency-plan', task: 'Establish emergency procedures', category: 'Emergency' },
    { id: 'communication', task: 'Ensure reliable communication method', category: 'Communication' },
    { id: 'equipment-suitability', task: 'Verify equipment suitable for environment', category: 'Equipment' },
    { id: 'atmospheric-monitoring', task: 'Set up atmospheric monitoring if required', category: 'Environmental' },
    { id: 'lighting-adequacy', task: 'Ensure adequate lighting for safe work', category: 'Working Conditions' }
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
        <h1 className={responsiveHeading.h1 + " text-foreground"}>Testing Environment Safety</h1>
        <p className={responsiveBody.large + " text-gray-300 max-w-3xl mx-auto px-4"}>
          Learn to assess and manage environmental conditions that affect safety during electrical testing work.
        </p>
      </div>

      <SmartTabs
        defaultValue="conditions"
        tabs={[
          {
            value: 'conditions',
            label: 'Environmental Conditions',
            icon: <Droplets className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {environmentalConditions.map((condition) => {
              const IconComponent = condition.icon;
              return (
                <Card key={condition.id} className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-blue-400" />
                      {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{condition.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-red-300 mb-2">Key Hazards:</h4>
                      <ul className="space-y-1">
                        {condition.hazards.map((hazard, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-red-400">•</span>
                            {hazard}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Safety Precautions:</h4>
                      <ul className="space-y-1">
                        {condition.precautions.map((precaution, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {precaution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {condition.regulations.map((reg, index) => (
                        <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {reg}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
              </div>
              </div>
            ),
          },
          {
            value: 'checklist',
            label: 'Safety Checklist',
            icon: <CheckCircle className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-foreground">Pre-Testing Environmental Safety Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Planning', 'Environmental', 'Access', 'Emergency', 'Communication', 'Equipment', 'Working Conditions'].map((category) => (
                  <div key={category}>
                    <h4 className="font-semibold text-green-300 mb-3">{category}</h4>
                    <div className="space-y-2">
                      {safetyChecklist
                        .filter(item => item.category === category)
                        .map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleCheck(item.id)}
                              className={`p-2 h-auto ${
                                completedChecks.includes(item.id)
                                  ? 'text-green-400 hover:text-green-300'
                                  : 'text-gray-400 hover:text-gray-300'
                              }`}
                            >
                              <CheckCircle
                                className={`h-4 w-4 ${
                                  completedChecks.includes(item.id) ? 'fill-current' : ''
                                }`}
                              />
                            </Button>
                            <span className={`text-sm ${
                              completedChecks.includes(item.id) 
                                ? 'text-green-300 line-through' 
                                : 'text-gray-300'
                            }`}>
                              {item.task}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-300 font-medium">Checklist Progress:</span>
                  <span className="text-green-400 font-bold">
                    {completedChecks.length}/{safetyChecklist.length}
                  </span>
                </div>
                <div className="mt-2 bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(completedChecks.length / safetyChecklist.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
              </div>
            ),
          },
          {
            value: 'case-studies',
            label: 'Case Studies',
            icon: <AlertTriangle className="h-4 w-4" />,
            content: (
              <div className="space-y-4 sm:space-y-6">
          <div className="space-y-6">
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-300">Case Study 1: Basement Testing in Winter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Electrical testing required in an unheated basement during winter months. High humidity and condensation present.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-orange-400">Challenge:</span>
                    <span className="text-gray-300"> Condensation on test equipment and electrical components</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-400">Solution:</span>
                    <span className="text-gray-300"> Equipment acclimatisation, dehumidification, and extended test intervals</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-400">Outcome:</span>
                    <span className="text-gray-300"> Safe completion with accurate results and no equipment damage</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-purple-300">Case Study 2: Industrial Kitchen Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Testing electrical installation in commercial kitchen with high temperature and steam conditions.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-orange-400">Challenge:</span>
                    <span className="text-gray-300"> High temperature, steam, and grease affecting safety and equipment</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-400">Solution:</span>
                    <span className="text-gray-300"> Testing during off-hours, increased PPE, equipment protection</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-400">Outcome:</span>
                    <span className="text-gray-300"> Comprehensive testing completed safely with schedule coordination</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-300">Case Study 3: Outdoor Substation in Storm</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Emergency testing required at outdoor substation during severe weather conditions.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-orange-400">Challenge:</span>
                    <span className="text-gray-300"> High winds, rain, and urgent timeframe</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-400">Solution:</span>
                    <span className="text-gray-300"> Risk assessment led to postponement until conditions improved</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-400">Outcome:</span>
                    <span className="text-gray-300"> Safety prioritised over urgency, successful testing when safe</span>
                  </div>
                </div>
              </CardContent>
            </Card>
              </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default TestingEnvironmentSafety;