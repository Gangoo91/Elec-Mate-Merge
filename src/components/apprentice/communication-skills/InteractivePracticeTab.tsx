
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Lightbulb, Play, CheckCircle, RotateCcw, Target } from "lucide-react";

const InteractivePracticeTab = () => {
  const [currentScenario, setCurrentScenario] = useState<number | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const practiceScenarios = [
    {
      id: 1,
      title: "First Day Nerves",
      situation: "It's your first day on a new site. You don't know anyone and you're feeling nervous about making a good impression.",
      context: "You've been assigned to work with an experienced electrician who seems quite busy and focused on their work.",
      responses: [
        {
          text: "Wait quietly until they talk to you first",
          type: "poor",
          feedback: "While being respectful is good, this passive approach might make you seem uninterested or lacking initiative. Your supervisor needs to know you're ready to learn and contribute."
        },
        {
          text: "Interrupt them immediately to introduce yourself",
          type: "poor", 
          feedback: "Interrupting someone focused on work, especially electrical work which requires concentration for safety, shows poor awareness and could be dangerous."
        },
        {
          text: "Wait for a natural break, then introduce yourself professionally",
          type: "good",
          feedback: "Perfect! This shows respect for their work while demonstrating professionalism. You might say: 'Good morning, I'm [name], the new apprentice. When you have a moment, could you let me know how I can best help you today?'"
        }
      ]
    },
    {
      id: 2,
      title: "Made a Mistake",
      situation: "You've accidentally damaged a cable while pulling it through conduit. The cable will need to be replaced, causing delays.",
      context: "Your supervisor is under pressure to complete this job on time, and materials are expensive.",
      responses: [
        {
          text: "Try to hide the damage and hope no one notices",
          type: "poor",
          feedback: "This is dangerous and dishonest. Hidden damage could cause serious safety issues later. Always report damage immediately - honesty builds trust and ensures safety."
        },
        {
          text: "Blame the conduit for being too sharp or the cable for being faulty",
          type: "poor",
          feedback: "Making excuses undermines your credibility and shows you're not taking responsibility. Even if external factors contributed, focus on the solution rather than blame."
        },
        {
          text: "Immediately inform your supervisor, explain what happened, and ask how to prevent it happening again",
          type: "good",
          feedback: "Excellent! This shows integrity, responsibility, and a commitment to learning. You might say: 'I need to report that I've damaged the cable. I think I pulled too hard when it caught. What's the procedure for replacement, and how can I avoid this in future?'"
        }
      ]
    },
    {
      id: 3,
      title: "Client Complaint",
      situation: "A homeowner approaches you while you're working and complains that the work is taking too long and creating too much mess.",
      context: "Your supervisor is in another part of the house. The client seems frustrated and is raising their voice.",
      responses: [
        {
          text: "Tell them it's not your fault and they need to talk to your boss",
          type: "poor",
          feedback: "This response sounds defensive and unhelpful. Even though you may not be in charge, you represent the company and should handle the situation professionally."
        },
        {
          text: "Argue that electrical work always takes this long and creates mess",
          type: "poor",
          feedback: "Arguing with a customer is never appropriate. This dismisses their concerns and could escalate the situation. Always acknowledge their feelings first."
        },
        {
          text: "Listen to their concerns, acknowledge them, and get your supervisor to speak with them",
          type: "good",
          feedback: "Perfect approach! You might say: 'I understand this is disruptive for you. Let me get my supervisor to come and discuss the timeline and what we can do to minimise the impact. We want to make sure you're happy with our work.'"
        }
      ]
    }
  ];

  const handleStartScenario = (scenarioId: number) => {
    setCurrentScenario(scenarioId);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const handleResponseSelect = (responseText: string) => {
    setSelectedResponse(responseText);
    setShowFeedback(true);
    
    // Mark scenario as completed
    if (!completedScenarios.includes(currentScenario!)) {
      setCompletedScenarios([...completedScenarios, currentScenario!]);
    }
  };

  const handleReset = () => {
    setCurrentScenario(null);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const progressPercentage = (completedScenarios.length / practiceScenarios.length) * 100;

  if (currentScenario !== null) {
    const scenario = practiceScenarios.find(s => s.id === currentScenario);
    const selectedResponseObj = scenario?.responses.find(r => r.text === selectedResponse);

    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Target className="h-6 w-6" />
                {scenario?.title}
              </CardTitle>
              <Button variant="outline" onClick={handleReset} size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Back to Scenarios
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-medium text-blue-300 mb-2">The Situation</h3>
                <p className="text-sm text-muted-foreground mb-3">{scenario?.situation}</p>
                <p className="text-sm text-muted-foreground italic">{scenario?.context}</p>
              </div>

              <div>
                <h3 className="font-medium text-white mb-3">How would you respond?</h3>
                <div className="space-y-3">
                  {scenario?.responses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full text-left justify-start h-auto p-4 ${
                        selectedResponse === response.text 
                          ? response.type === 'good' 
                            ? 'border-green-500 bg-green-500/10' 
                            : 'border-red-500 bg-red-500/10'
                          : 'border-elec-yellow/20'
                      }`}
                      onClick={() => handleResponseSelect(response.text)}
                      disabled={showFeedback}
                    >
                      <span className="text-sm">{response.text}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {showFeedback && selectedResponseObj && (
                <div className={`border rounded-lg p-4 ${
                  selectedResponseObj.type === 'good' 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : 'border-red-500/30 bg-red-500/10'
                }`}>
                  <h4 className={`font-medium mb-2 ${
                    selectedResponseObj.type === 'good' ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {selectedResponseObj.type === 'good' ? 'Great Choice!' : 'Consider This...'}
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedResponseObj.feedback}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Practice Scenarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-elec-yellow font-medium">
                {completedScenarios.length} of {practiceScenarios.length} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {practiceScenarios.map((scenario) => (
              <div key={scenario.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    {scenario.title}
                    {completedScenarios.includes(scenario.id) && (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {completedScenarios.includes(scenario.id) ? 'Completed' : 'Practice'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{scenario.situation}</p>
                <Button 
                  onClick={() => handleStartScenario(scenario.id)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {completedScenarios.includes(scenario.id) ? 'Practice Again' : 'Start Scenario'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Practice Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-white">Before Responding:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Take a moment to think</li>
                <li>• Consider the other person's perspective</li>
                <li>• Think about safety implications</li>
                <li>• Consider your role and authority</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-white">Good Communication Shows:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Respect for others</li>
                <li>• Professional maturity</li>
                <li>• Commitment to safety</li>
                <li>• Willingness to learn</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractivePracticeTab;
