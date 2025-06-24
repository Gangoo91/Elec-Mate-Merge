
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageSquare, CheckCircle } from "lucide-react";

interface CommunicationSimulatorProps {
  onBack: () => void;
}

const CommunicationSimulator = ({ onBack }: CommunicationSimulatorProps) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      title: "Asking for Help",
      situation: "You're struggling with a complex wiring task and need guidance from your supervisor.",
      responses: [
        { id: "a", text: "I don't know what I'm doing, can you just do it for me?", rating: "poor" },
        { id: "b", text: "Could you help me understand the correct approach for this wiring task? I want to make sure I'm doing it safely.", rating: "excellent" },
        { id: "c", text: "This is too hard, I'll figure it out later.", rating: "poor" }
      ]
    },
    {
      title: "Reporting Progress",
      situation: "You need to update your supervisor on your morning's work progress.",
      responses: [
        { id: "a", text: "I've completed the first two circuits. The third is taking longer due to access issues - should I continue or reassess?", rating: "excellent" },
        { id: "b", text: "I'm working on it.", rating: "poor" },
        { id: "c", text: "Nearly done with everything.", rating: "poor" }
      ]
    }
  ];

  const handleResponseSelect = (responseId: string) => {
    setSelectedResponse(responseId);
    setShowFeedback(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedResponse("");
      setShowFeedback(false);
    }
  };

  const resetSimulator = () => {
    setCurrentScenario(0);
    setSelectedResponse("");
    setShowFeedback(false);
  };

  const scenario = scenarios[currentScenario];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">
              Scenario {currentScenario + 1}: {scenario.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white">{scenario.situation}</p>
          
          <div className="space-y-3">
            <h4 className="font-medium text-elec-yellow">How would you respond?</h4>
            <RadioGroup value={selectedResponse} onValueChange={handleResponseSelect}>
              {scenario.responses.map((response) => (
                <div key={response.id} className="flex items-start space-x-2">
                  <RadioGroupItem value={response.id} id={response.id} />
                  <Label htmlFor={response.id} className="flex-1 text-sm text-white cursor-pointer">
                    {response.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {showFeedback && selectedResponse && (
            <div className="mt-4 p-4 border border-elec-yellow/30 rounded-lg">
              {(() => {
                const selected = scenario.responses.find(r => r.id === selectedResponse);
                const isExcellent = selected?.rating === "excellent";
                return (
                  <div className="flex items-start gap-2">
                    <CheckCircle className={`h-5 w-5 mt-0.5 ${isExcellent ? 'text-green-400' : 'text-orange-400'}`} />
                    <div>
                      <h5 className={`font-medium ${isExcellent ? 'text-green-400' : 'text-orange-400'}`}>
                        {isExcellent ? "Excellent Response!" : "Consider This Approach:"}
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isExcellent 
                          ? "This response shows professionalism, clear communication, and a willingness to learn."
                          : "Try to be more specific and professional. Clear communication builds trust and shows maturity."
                        }
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            {showFeedback && currentScenario < scenarios.length - 1 && (
              <Button onClick={nextScenario}>Next Scenario</Button>
            )}
            {showFeedback && currentScenario === scenarios.length - 1 && (
              <Button onClick={resetSimulator}>Start Over</Button>
            )}
            <Button variant="outline" onClick={onBack}>Back to Tools</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSimulator;
