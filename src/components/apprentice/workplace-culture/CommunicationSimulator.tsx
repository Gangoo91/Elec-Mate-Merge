
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
  const progress = ((currentScenario + 1) / scenarios.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <MessageSquare className="h-5 w-5 text-elec-yellow" />
              </div>
              <CardTitle className="text-white">
                Scenario {currentScenario + 1}: {scenario.title}
              </CardTitle>
            </div>
            <span className="text-sm text-white/60">{currentScenario + 1}/{scenarios.length}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/80 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className="p-4 rounded-xl bg-white/10 border border-white/10">
            <p className="text-white/90">{scenario.situation}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-elec-yellow">How would you respond?</h4>
            <RadioGroup value={selectedResponse} onValueChange={handleResponseSelect} className="space-y-2">
              {scenario.responses.map((response) => (
                <div
                  key={response.id}
                  className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedResponse === response.id
                      ? 'bg-elec-yellow/10 border-elec-yellow/40'
                      : 'bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  <RadioGroupItem value={response.id} id={response.id} className="mt-0.5" />
                  <Label htmlFor={response.id} className="flex-1 text-sm text-white/80 cursor-pointer">
                    {response.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {showFeedback && selectedResponse && (
            <div className={`mt-4 p-4 rounded-xl ${
              scenario.responses.find(r => r.id === selectedResponse)?.rating === "excellent"
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-orange-500/10 border border-orange-500/30'
            }`}>
              {(() => {
                const selected = scenario.responses.find(r => r.id === selectedResponse);
                const isExcellent = selected?.rating === "excellent";
                return (
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${isExcellent ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
                      <CheckCircle className={`h-4 w-4 ${isExcellent ? 'text-green-400' : 'text-orange-400'}`} />
                    </div>
                    <div>
                      <h5 className={`font-semibold ${isExcellent ? 'text-green-400' : 'text-orange-400'}`}>
                        {isExcellent ? "Excellent Response!" : "Consider This Approach:"}
                      </h5>
                      <p className="text-sm text-white/70 mt-1">
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

          <div className="flex flex-wrap gap-2 pt-4">
            {showFeedback && currentScenario < scenarios.length - 1 && (
              <Button onClick={nextScenario} className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-95 transition-all">
                Next Scenario
              </Button>
            )}
            {showFeedback && currentScenario === scenarios.length - 1 && (
              <Button onClick={resetSimulator} className="h-11 bg-green-500 hover:bg-green-500/90 text-white touch-manipulation active:scale-95 transition-all">
                Start Over
              </Button>
            )}
            <Button variant="outline" onClick={onBack} className="h-11 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all">
              Back to Tools
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSimulator;
