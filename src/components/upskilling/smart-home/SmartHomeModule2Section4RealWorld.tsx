import { useState } from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const SmartHomeModule2Section4RealWorld = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const scenario = {
    title: "The Johnson Family Smart Home Crisis",
    description: "The Johnsons have a 2-story home with 40 Zigbee devices, 3 Wi-Fi security cameras, and a family of 4 with multiple phones, tablets, and laptops. After installation, they're experiencing constant connectivity issues.",
    setup: [
      "Zigbee hub placed directly next to Wi-Fi router in the lounge",
      "Wi-Fi router on channel 6 (auto-selected)",
      "Neighbour's Wi-Fi also on channel 6",
      "Baby monitor in nursery upstairs",
      "Microwave in kitchen near some smart switches",
      "Metal electrical panel near main hallway sensors"
    ]
  };

  const possibleIssues = [
    { id: 'co-location', text: 'Zigbee hub too close to Wi-Fi router', correct: true },
    { id: 'channel-overlap', text: 'Wi-Fi channels overlapping with neighbours', correct: true },
    { id: 'baby-monitor', text: 'Baby monitor interference', correct: true },
    { id: 'microwave', text: 'Microwave affecting nearby devices', correct: true },
    { id: 'metal-panel', text: 'Metal electrical panel blocking signals', correct: true },
    { id: 'too-many-devices', text: 'Too many devices for network to handle', correct: false },
    { id: 'power-issues', text: 'Insufficient power supply', correct: false },
    { id: 'firmware', text: 'Outdated device firmware', correct: false }
  ];

  const possibleSolutions = [
    { id: 'separate-hubs', text: 'Move Zigbee hub at least 3 feet from router', correct: true },
    { id: 'change-wifi-channel', text: 'Change Wi-Fi to channel 1 or 11', correct: true },
    { id: 'zigbee-channel', text: 'Change Zigbee to channel 15, 20, or 25', correct: true },
    { id: 'relocate-monitor', text: 'Move baby monitor or switch to 5GHz version', correct: true },
    { id: 'mesh-network', text: 'Add Wi-Fi mesh nodes for better coverage', correct: true },
    { id: 'separate-iot-network', text: 'Create dedicated IoT network', correct: true },
    { id: 'upgrade-router', text: 'Buy more expensive router', correct: false },
    { id: 'reduce-devices', text: 'Remove some smart devices', correct: false }
  ];

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSolutionToggle = (solutionId: string) => {
    setSelectedSolutions(prev => 
      prev.includes(solutionId) 
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  const getIssueScore = () => {
    const correctIssues = possibleIssues.filter(issue => issue.correct);
    const correctSelected = selectedIssues.filter(id => 
      possibleIssues.find(issue => issue.id === id && issue.correct)
    );
    return { correct: correctSelected.length, total: correctIssues.length };
  };

  const getSolutionScore = () => {
    const correctSolutions = possibleSolutions.filter(solution => solution.correct);
    const correctSelected = selectedSolutions.filter(id => 
      possibleSolutions.find(solution => solution.id === id && solution.correct)
    );
    return { correct: correctSelected.length, total: correctSolutions.length };
  };

  const steps = [
    {
      title: "Scenario Overview",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">{scenario.title}</h4>
            <p className="text-foreground text-sm mb-3">{scenario.description}</p>
            <div className="space-y-2">
              <p className="text-foreground font-medium">Current Setup:</p>
              <ul className="space-y-1">
                {scenario.setup.map((item, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Identify the Issues",
      content: (
        <div className="space-y-4">
          <p className="text-foreground">Select all the issues that could be causing connectivity problems:</p>
          <div className="grid gap-2">
            {possibleIssues.map((issue) => (
              <label
                key={issue.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedIssues.includes(issue.id)
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-gray-600 hover:border-gray-500'
                } ${
                  showAnalysis && issue.correct && selectedIssues.includes(issue.id)
                    ? 'border-green-400 bg-green-400/10'
                    : showAnalysis && !issue.correct && selectedIssues.includes(issue.id)
                    ? 'border-red-400 bg-red-400/10'
                    : showAnalysis && issue.correct && !selectedIssues.includes(issue.id)
                    ? 'border-orange-400 bg-orange-400/10'
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIssues.includes(issue.id)}
                  onChange={() => handleIssueToggle(issue.id)}
                  disabled={showAnalysis}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  selectedIssues.includes(issue.id) ? 'border-elec-yellow bg-elec-yellow' : 'border-gray-400'
                }`}>
                  {selectedIssues.includes(issue.id) && (
                    <CheckCircle className="w-3 h-3 text-elec-dark" />
                  )}
                </div>
                <span className="text-foreground">{issue.text}</span>
                {showAnalysis && issue.correct && selectedIssues.includes(issue.id) && (
                  <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                )}
                {showAnalysis && !issue.correct && selectedIssues.includes(issue.id) && (
                  <AlertTriangle className="h-4 w-4 text-red-400 ml-auto" />
                )}
                {showAnalysis && issue.correct && !selectedIssues.includes(issue.id) && (
                  <div className="text-orange-400 text-xs ml-auto">Missed</div>
                )}
              </label>
            ))}
          </div>
          {showAnalysis && (
            <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <p className="text-blue-400 font-medium">
                Issues Score: {getIssueScore().correct}/{getIssueScore().total}
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Design Solutions",
      content: (
        <div className="space-y-4">
          <p className="text-foreground">Select the best solutions to fix the identified issues:</p>
          <div className="grid gap-2">
            {possibleSolutions.map((solution) => (
              <label
                key={solution.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedSolutions.includes(solution.id)
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-gray-600 hover:border-gray-500'
                } ${
                  showAnalysis && solution.correct && selectedSolutions.includes(solution.id)
                    ? 'border-green-400 bg-green-400/10'
                    : showAnalysis && !solution.correct && selectedSolutions.includes(solution.id)
                    ? 'border-red-400 bg-red-400/10'
                    : showAnalysis && solution.correct && !selectedSolutions.includes(solution.id)
                    ? 'border-orange-400 bg-orange-400/10'
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSolutions.includes(solution.id)}
                  onChange={() => handleSolutionToggle(solution.id)}
                  disabled={showAnalysis}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  selectedSolutions.includes(solution.id) ? 'border-elec-yellow bg-elec-yellow' : 'border-gray-400'
                }`}>
                  {selectedSolutions.includes(solution.id) && (
                    <CheckCircle className="w-3 h-3 text-elec-dark" />
                  )}
                </div>
                <span className="text-foreground">{solution.text}</span>
                {showAnalysis && solution.correct && selectedSolutions.includes(solution.id) && (
                  <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                )}
                {showAnalysis && !solution.correct && selectedSolutions.includes(solution.id) && (
                  <AlertTriangle className="h-4 w-4 text-red-400 ml-auto" />
                )}
                {showAnalysis && solution.correct && !selectedSolutions.includes(solution.id) && (
                  <div className="text-orange-400 text-xs ml-auto">Missed</div>
                )}
              </label>
            ))}
          </div>
          {showAnalysis && (
            <div className="p-3 rounded-lg bg-green-600/10 border border-green-600/20">
              <p className="text-green-400 font-medium">
                Solutions Score: {getSolutionScore().correct}/{getSolutionScore().total}
              </p>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Interactive Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h3>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-elec-yellow' : 
                  index < currentStep ? 'bg-green-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {steps[currentStep].content}

        <div className="flex justify-between pt-4">
          {currentStep > 0 && (
            <Button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-[#323232]"
            >
              Previous
            </Button>
          )}
          
          <div className="ml-auto">
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={() => setShowAnalysis(true)}
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                disabled={showAnalysis}
              >
                {showAnalysis ? 'Analysis Complete' : 'Show Analysis'}
              </Button>
            )}
          </div>
        </div>

        {showAnalysis && currentStep === steps.length - 1 && (
          <div className="mt-6 p-4 bg-elec-dark border border-gray-600 rounded-lg">
            <h4 className="text-foreground font-semibold mb-3">Expert Analysis</h4>
            <p className="text-sm text-foreground mb-3">
              The key issues were physical interference (co-location, metal obstacles) and channel conflicts. 
              The most effective solutions involve proper channel separation and strategic device placement.
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-green-400 font-medium">Priority Fixes:</p>
                <ul className="text-foreground space-y-1">
                  <li>• Separate hub and router by 3+ feet</li>
                  <li>• Change Wi-Fi to channel 1 or 11</li>
                  <li>• Move Zigbee to channel 15-25</li>
                </ul>
              </div>
              <div>
                <p className="text-blue-400 font-medium">Additional Improvements:</p>
                <ul className="text-foreground space-y-1">
                  <li>• Add mesh nodes for coverage</li>
                  <li>• Create separate IoT network</li>
                  <li>• Relocate interfering devices</li>
                </ul>
              </div>
            </div>
            <Button 
              onClick={() => {
                setCurrentStep(0);
                setSelectedIssues([]);
                setSelectedSolutions([]);
                setShowAnalysis(false);
              }}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-[#323232] mt-4"
            >
              Try Scenario Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};