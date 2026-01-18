import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScenarioStep {
  id: string;
  title: string;
  description: string;
  options: string[];
  correctOption: number;
  consequence: string;
  safetyNote?: string;
}

interface Scenario {
  id: string;
  title: string;
  location: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  context: string;
  steps: ScenarioStep[];
}

export const ScenarioBuilder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedScenario = searchParams.get("scenario") || "domestic";
  const setSelectedScenario = (scenario: string) => setSearchParams({ scenario }, { replace: false });

  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 'domestic',
      title: 'Domestic Kitchen Inspection',
      location: 'Residential Property',
      difficulty: 'Basic',
      context: 'You are inspecting a recently renovated kitchen in a 1970s house. The homeowner has added new appliances and wants an EICR for insurance purposes.',
      steps: [
        {
          id: 'visual1',
          title: 'Initial Visual Assessment',
          description: 'Upon entering the kitchen, you notice the consumer unit is located in a cupboard under the stairs. What is your first concern?',
          options: [
            'Check if it meets current accessibility requirements',
            'Immediately test the RCD functionality',
            'Start measuring earth loop impedance',
            'Proceed with insulation resistance testing'
          ],
          correctOption: 0,
          consequence: 'Accessibility is crucial for safe maintenance and emergency isolation.',
          safetyNote: 'Always assess accessibility before any electrical testing begins.'
        },
        {
          id: 'safety1',
          title: 'Safety Assessment',
          description: 'You find several socket outlets very close to the kitchen sink. What action should you take?',
          options: [
            'Test them normally as they look fine',
            'Check compliance with current zone requirements',
            'Skip testing these outlets',
            'Only check the earthing on these outlets'
          ],
          correctOption: 1,
          consequence: 'Zone requirements prevent water ingress risks and ensure electrical safety.',
          safetyNote: 'Socket outlets must be outside zones or have appropriate IP rating.'
        },
        {
          id: 'testing1',
          title: 'Testing Sequence',
          description: 'Before starting electrical tests, what must you complete first?',
          options: [
            'Polarity testing',
            'RCD testing',
            'Thorough visual inspection using a checklist',
            'Earth fault loop impedance testing'
          ],
          correctOption: 2,
          consequence: 'Visual inspection identifies hazards before energised testing begins.',
          safetyNote: 'Never skip visual inspection - it protects you and identifies obvious faults.'
        }
      ]
    },
    {
      id: 'commercial',
      title: 'Office Building Inspection',
      location: 'Commercial Premises',
      difficulty: 'Intermediate',
      context: 'You are conducting a periodic inspection of a 3-story office building. The installation includes a complex distribution system with sub-mains to each floor.',
      steps: [
        {
          id: 'planning1',
          title: 'Inspection Planning',
          description: 'The building manager wants minimal disruption. How do you plan your approach?',
          options: [
            'Work during normal hours to observe full loading',
            'Schedule testing during off-peak hours',
            'Test everything at once over a weekend',
            'Only test the main distribution board'
          ],
          correctOption: 1,
          consequence: 'Off-peak testing reduces disruption while ensuring thorough inspection.',
          safetyNote: 'Plan testing to minimise business disruption while maintaining safety standards.'
        },
        {
          id: 'documentation1',
          title: 'Documentation Review',
          description: 'Previous test certificates show some Zs values close to maximum limits. What should you do?',
          options: [
            'Accept the previous results if recent',
            'Retest these circuits first as priority',
            'Skip retesting if values were within limits',
            'Only test if the client specifically requests it'
          ],
          correctOption: 1,
          consequence: 'Values near limits require verification to ensure continued safety.',
          safetyNote: 'Marginal results from previous tests should be priority for retesting.'
        }
      ]
    },
    {
      id: 'industrial',
      title: 'Factory Installation',
      location: 'Industrial Site',
      difficulty: 'Advanced',
      context: 'You are inspecting a manufacturing facility with 3-phase supplies, motor circuits, and harsh environmental conditions.',
      steps: [
        {
          id: 'environment1',
          title: 'Environmental Assessment',
          description: 'The factory has areas with metal dust and occasional water exposure. What specific concerns do you have?',
          options: [
            'Standard testing procedures apply',
            'Check IP ratings and enclosure integrity',
            'Only test during dry conditions',
            'Focus solely on earth bonding'
          ],
          correctOption: 1,
          consequence: 'Environmental protection determines equipment suitability and safety.',
          safetyNote: 'Environmental conditions directly affect safety requirements and equipment selection.'
        }
      ]
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario);
  const currentScenarioStep = currentScenario?.steps[currentStep];

  const handleOptionSelect = (optionIndex: number) => {
    if (!currentScenarioStep) return;
    
    setUserChoices(prev => ({
      ...prev,
      [currentScenarioStep.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (!currentScenario) return;
    
    if (currentStep < currentScenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetScenario = () => {
    setCurrentStep(0);
    setUserChoices({});
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!currentScenario) return 0;
    const correctAnswers = currentScenario.steps.filter(step => 
      userChoices[step.id] === step.correctOption
    ).length;
    return Math.round((correctAnswers / currentScenario.steps.length) * 100);
  };

  if (showResults && currentScenario) {
    const score = calculateScore();
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="h-5 w-5 text-elec-yellow" />
            Scenario Results: {currentScenario.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {score}%
            </div>
            <p className="text-gray-300">
              {score >= 80 ? 'Excellent decision making!' : 
               score >= 60 ? 'Good understanding with room for improvement.' : 
               'Review the learning materials and try again.'}
            </p>
          </div>

          <div className="space-y-4">
            {currentScenario.steps.map((step, index) => {
              const userChoice = userChoices[step.id];
              const isCorrect = userChoice === step.correctOption;
              
              return (
                <div key={step.id} className="bg-elec-dark rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">{step.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                      
                      <p className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        Your choice: {step.options[userChoice]}
                      </p>
                      
                      {!isCorrect && (
                        <p className="text-green-400 text-sm mb-2">
                          Correct choice: {step.options[step.correctOption]}
                        </p>
                      )}
                      
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Why:</strong> {step.consequence}
                      </p>
                      
                      {step.safetyNote && (
                        <Alert className="mt-2 bg-yellow-900/20 border-yellow-600">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          <AlertDescription className="text-yellow-300 text-sm">
                            {step.safetyNote}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={resetScenario} variant="outline" 
                    className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black">
              Try Again
            </Button>
            <Button onClick={() => setSelectedScenario('')} 
                    className="bg-elec-yellow text-black hover:bg-yellow-500">
              Choose Different Scenario
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Interactive Scenarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedScenario ? (
          <div className="space-y-4">
            <h3 className="text-foreground font-medium mb-4">Choose a scenario to practice:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map((scenario) => (
                <div key={scenario.id} 
                     onClick={() => setSelectedScenario(scenario.id)}
                     className="bg-elec-dark p-4 rounded-lg cursor-pointer hover:bg-gray-600 active:scale-[0.98] transition-all touch-manipulation">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-foreground font-medium">{scenario.title}</h4>
                    <Badge variant={
                      scenario.difficulty === 'Basic' ? 'default' :
                      scenario.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                    }>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{scenario.location}</p>
                  <p className="text-gray-300 text-sm">{scenario.context}</p>
                  <p className="text-elec-yellow text-sm mt-2">
                    {scenario.steps.length} decision points
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : currentScenario && currentScenarioStep ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-foreground font-medium">{currentScenario.title}</h3>
                <p className="text-gray-400 text-sm">{currentScenario.location}</p>
              </div>
              <Badge variant="outline" className="text-gray-300 border-gray-600">
                Step {currentStep + 1} of {currentScenario.steps.length}
              </Badge>
            </div>

            <div className="bg-blue-900/20 border border-blue-600 rounded-md p-4">
              <p className="text-blue-300 text-sm">{currentScenario.context}</p>
            </div>

            <div className="bg-elec-dark p-4 rounded-md">
              <h4 className="text-foreground font-medium mb-3">{currentScenarioStep.title}</h4>
              <p className="text-gray-300 mb-4">{currentScenarioStep.description}</p>
              
              <div className="space-y-3">
                {currentScenarioStep.options.map((option, index) => {
                  const isSelected = userChoices[currentScenarioStep.id] === index;
                  
                  return (
                    <div
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                          : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={userChoices[currentScenarioStep.id] === undefined}
                className="bg-elec-yellow text-black hover:bg-yellow-500"
              >
                {currentStep === currentScenario.steps.length - 1 ? 'Complete Scenario' : 'Next'}
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};