import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight, CheckCircle, Home, AlertTriangle } from 'lucide-react';

export const SmartHomeModule2Section6RealWorld = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const scenario = {
    title: "Philips Hue Integration Challenge",
    description: "An installer sets up Philips Hue Zigbee bulbs. The client wants to control them with Alexa, but Alexa doesn't natively support Zigbee.",
    solution: "Use the Hue Bridge to translate Zigbee → Wi-Fi → Alexa"
  };

  const steps = [
    {
      title: "Understanding the Problem",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <div className="bg-red-900/10 border border-red-600/20 rounded-lg p-4">
            <h4 className="text-red-200 font-semibold mb-2">The Challenge</h4>
            <p className="text-red-100 text-sm mb-3">
              Client has purchased Philips Hue Zigbee bulbs and wants voice control via Amazon Alexa Echo devices.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <span className="text-red-200">Philips Hue bulbs use Zigbee 3.0 protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-400" />
                <span className="text-red-200">Alexa Echo devices only support Wi-Fi natively</span>
              </div>
            </div>
          </div>
          <p className="text-foreground text-sm">
            <strong>Problem:</strong> Direct protocol incompatibility prevents communication between Zigbee bulbs and Wi-Fi-based Alexa.
          </p>
        </div>
      )
    },
    {
      title: "Evaluating Solutions",
      icon: CheckCircle,
      content: (
        <div className="space-y-4">
          <p className="text-foreground text-sm mb-4">What options does the installer have?</p>
          
          <div className="space-y-3">
            {[
              { id: 'bridge', text: 'Use Philips Hue Bridge for protocol translation', correct: true, explanation: 'Correct: The bridge translates between Zigbee and Wi-Fi/cloud services' },
              { id: 'replace', text: 'Replace bulbs with Wi-Fi versions', correct: false, explanation: 'Possible but expensive and wasteful of existing Zigbee bulbs' },
              { id: 'impossible', text: 'Tell client it\'s impossible', correct: false, explanation: 'Incorrect: Bridge solutions exist for this exact scenario' },
              { id: 'different', text: 'Use a different voice assistant', correct: false, explanation: 'Avoids the problem rather than solving it' }
            ].map((option) => (
              <div
                key={option.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedSolution === option.id
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
                }`}
                onClick={() => setSelectedSolution(option.id)}
              >
                <span className="text-foreground">{option.text}</span>
              </div>
            ))}
          </div>

          {selectedSolution && (
            <div className="mt-4 p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
              <p className="text-blue-200 text-sm">
              {selectedSolution === 'bridge' ? 
                "✅ Excellent choice! The Hue Bridge is designed exactly for this scenario." :
                "Consider the bridge solution - it's designed specifically for this compatibility challenge."
              }
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Implementation Analysis",
      icon: Home,
      content: (
        <div className="space-y-4">
          <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-200 font-semibold mb-2">Solution: Philips Hue Bridge</h4>
            <p className="text-green-100 text-sm mb-3">
              The Hue Bridge acts as a protocol translator, enabling communication between Zigbee bulbs and Wi-Fi/cloud ecosystems.
            </p>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-purple-400">Zigbee Bulbs</span>
              <ArrowRight className="h-4 w-4 text-yellow-400" />
              <span className="text-blue-400">Hue Bridge</span>
              <ArrowRight className="h-4 w-4 text-yellow-400" />
              <span className="text-green-400">Wi-Fi Network</span>
              <ArrowRight className="h-4 w-4 text-yellow-400" />
              <span className="text-orange-400">Alexa Cloud</span>
            </div>
          </div>

          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-left hover:bg-gray-700 transition-colors"
          >
            <span className="text-foreground font-medium">👉 Click to analyse pros and cons</span>
          </button>

          {showAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
                <h5 className="text-green-400 font-medium mb-2">Pros</h5>
                <ul className="text-sm space-y-1 text-green-200">
                  <li>• Enables voice control</li>
                  <li>• Cloud connectivity</li>
                  <li>• Remote access capability</li>
                  <li>• Third-party integrations</li>
                  <li>• Manufacturer support</li>
                </ul>
              </div>
              
              <div className="bg-red-900/10 border border-red-600/20 rounded-lg p-4">
                <h5 className="text-red-400 font-medium mb-2">Cons</h5>
                <ul className="text-sm space-y-1 text-red-200">
                  <li>• Additional hardware cost</li>
                  <li>• Extra device to maintain</li>
                  <li>• Potential single point of failure</li>
                  <li>• Slight increase in latency</li>
                  <li>• Network dependency</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetScenario = () => {
    setCurrentStep(0);
    setSelectedSolution('');
    setShowAnalysis(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-indigo-400" />
          Real-World Scenario: Bridge Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-indigo-900/10 border border-indigo-600/20 rounded-lg p-4">
          <h4 className="text-indigo-200 font-semibold mb-2">{scenario.title}</h4>
          <p className="text-indigo-100 text-sm">{scenario.description}</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index <= currentStep ? 'bg-indigo-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Current step content */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {React.createElement(steps[currentStep].icon, { className: "h-5 w-5 text-indigo-400" })}
            <h4 className="text-foreground font-semibold">{steps[currentStep].title}</h4>
            <span className="text-gray-400 text-sm">({currentStep + 1}/{steps.length})</span>
          </div>
          
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={resetScenario}
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
              >
                Restart Scenario
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};