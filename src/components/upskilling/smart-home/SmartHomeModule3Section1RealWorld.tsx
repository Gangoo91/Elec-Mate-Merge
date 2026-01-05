import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight } from 'lucide-react';

export const SmartHomeModule3Section1RealWorld = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      title: "Client A: Small Rented Flat",
      content: "Client A lives in a small rented flat. They want smart lighting but cannot rewire or make permanent modifications.",
      solution: "Wi-Fi bulbs they can take with them when they move.",
      reasoning: "Perfect for renters - no installation required, portable, and provides full smart functionality."
    },
    {
      title: "Client B: Luxury New Build",
      content: "Client B is building a luxury 5-bedroom house. They want integrated lighting, HVAC, and shading control with ultimate reliability.",
      solution: "A centralised wired system (KNX/Lutron) with hybrid Zigbee overlay for sensors.",
      reasoning: "New build allows structured cabling, budget supports professional system, integration requirements need centralised control."
    },
    {
      title: "Your Turn: Client C Decision",
      content: "Client C owns a 3-bedroom house and wants flexibility without major rewiring. They have a moderate budget and want room-by-room control.",
      isQuestion: true
    }
  ];

  const clientCOptions = [
    { text: "Smart bulbs throughout the house", feedback: "Expensive for whole house - would cost £300-£600+ for all bulbs", correct: false },
    { text: "Smart switches in main rooms", feedback: "Good choice! Cost-effective, works with existing bulbs, provides room control with minimal disruption", correct: true },
    { text: "Full KNX wired system", feedback: "Too disruptive and expensive for retrofit with moderate budget", correct: false },
    { text: "Mix of smart switches and some smart bulbs for flexibility", feedback: "Excellent solution! Smart switches for main lighting, smart bulbs where colour/special control needed", correct: true }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetScenario = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSubmit = () => {
    setShowFeedback(true);
  };

  const handleAnswerReset = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Real-World Scenarios
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentStep ? 'bg-elec-yellow' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">{steps[currentStep].title}</h3>
          <p className="text-foreground">{steps[currentStep].content}</p>

          {!steps[currentStep].isQuestion ? (
            <div className="space-y-3">
              <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
                <h4 className="font-semibold text-green-200 mb-1">Recommended Solution:</h4>
                <p className="text-green-100">{steps[currentStep].solution}</p>
              </div>
              <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-1">Why This Works:</h4>
                <p className="text-blue-100">{steps[currentStep].reasoning}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-elec-yellow font-medium">Which system would you recommend?</p>
              
              <div className="space-y-2">
                {clientCOptions.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAnswer === index
                        ? showFeedback
                          ? option.correct
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : 'border-elec-yellow bg-elec-yellow/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="client-c"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => setSelectedAnswer(index)}
                      className="sr-only"
                    />
                    <span className="text-foreground">{option.text}</span>
                  </label>
                ))}
              </div>

              {showFeedback && selectedAnswer !== null && (
                <div className={`p-3 rounded-lg border ${
                  clientCOptions[selectedAnswer].correct 
                    ? 'bg-green-600/10 border-green-600/20' 
                    : 'bg-red-600/10 border-red-600/20'
                }`}>
                  <p className={`text-sm ${
                    clientCOptions[selectedAnswer].correct ? 'text-green-100' : 'text-red-100'
                  }`}>
                    {clientCOptions[selectedAnswer].feedback}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <div></div>
          <div className="flex gap-2">
            {!steps[currentStep].isQuestion ? (
              currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={resetScenario}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
                >
                  Restart Scenario
                </Button>
              )
            ) : (
              <>
                {!showFeedback ? (
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={selectedAnswer === null}
                    className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAnswerReset}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={resetScenario}
                      className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
                    >
                      Restart Scenario
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};