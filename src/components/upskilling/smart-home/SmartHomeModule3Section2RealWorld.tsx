import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight } from 'lucide-react';

export const SmartHomeModule3Section2RealWorld = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      title: "Client's Current Setup",
      content: "A client has set up a 'Goodnight' scene that dims bedroom lights, keeps hallway light on low, and turns all other lights off. They've also added a schedule so outdoor lights switch on at sunset.",
      isExample: true
    },
    {
      title: "Enhancement Opportunities",
      content: "What additional schedules or scenes could be added to improve security and comfort?",
      isQuestion: true
    }
  ];

  const enhancementOptions = [
    { text: "Morning wake-up scene with gradual brightening", benefit: "Excellent! Gradual wake-up lighting supports natural circadian rhythms and provides a gentle start to the day.", correct: true },
    { text: "Away mode with random light patterns", benefit: "Perfect for security! Random patterns simulate occupancy and deter break-ins when the house is empty.", correct: true },
    { text: "Motion-activated night lighting in hallways", benefit: "Great safety feature! Provides safe navigation at night without disturbing others.", correct: true },
    { text: "All lights flash red when smoke alarm triggers", benefit: "Smart emergency response! Visual alerts help during fire emergencies, especially for hearing-impaired users.", correct: true },
    { text: "Lights turn off every 30 minutes automatically", benefit: "This would be annoying and disruptive. Over-automation that fights user control is poor design.", correct: false }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetScenario = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setShowFeedback(false);
  };

  const toggleAnswer = (index: number) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter(i => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setShowFeedback(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
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

          {steps[currentStep].isExample && (
            <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <h4 className="font-semibold text-blue-200 mb-2">Current Implementation:</h4>
              <ul className="text-blue-100 space-y-1">
                <li>• <strong>"Goodnight" Scene:</strong> Bedroom dim, hallway low, others off</li>
                <li>• <strong>Sunset Schedule:</strong> Outdoor lights activate automatically</li>
                <li>• <strong>Needs:</strong> Enhanced security and comfort features</li>
              </ul>
            </div>
          )}

          {steps[currentStep].isQuestion && (
            <div className="space-y-4">
              <p className="text-elec-yellow font-medium">Select all enhancements that would improve security and comfort:</p>
              
              <div className="space-y-2">
                {enhancementOptions.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAnswers.includes(index)
                        ? showFeedback
                          ? option.correct
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : 'border-elec-yellow bg-elec-yellow/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAnswers.includes(index)}
                      onChange={() => toggleAnswer(index)}
                      className="sr-only"
                    />
                    <span className="text-foreground flex-1">{option.text}</span>
                  </label>
                ))}
              </div>

              {showFeedback && (
                <div className="space-y-3">
                  {selectedAnswers.map((answerIndex) => (
                    <div key={answerIndex} className={`p-3 rounded-lg border ${
                      enhancementOptions[answerIndex].correct 
                        ? 'bg-green-600/10 border-green-600/20' 
                        : 'bg-red-600/10 border-red-600/20'
                    }`}>
                      <h5 className={`font-medium mb-1 ${
                        enhancementOptions[answerIndex].correct ? 'text-green-200' : 'text-red-200'
                      }`}>
                        {enhancementOptions[answerIndex].text}
                      </h5>
                      <p className={`text-sm ${
                        enhancementOptions[answerIndex].correct ? 'text-green-100' : 'text-red-100'
                      }`}>
                        {enhancementOptions[answerIndex].benefit}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <div></div>
          <div className="flex gap-2">
            {!steps[currentStep].isQuestion ? (
              <Button
                onClick={nextStep}
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                {!showFeedback ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswers.length === 0}
                    className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
                  >
                    Check Answers
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleReset}
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