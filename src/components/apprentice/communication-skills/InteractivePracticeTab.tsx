
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Play, RotateCcw, CheckCircle } from "lucide-react";
import { useState } from "react";

const InteractivePracticeTab = () => {
  const [currentScenario, setCurrentScenario] = useState<number | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const practiceScenarios = [
    {
      title: "First Day Site Instructions",
      situation: "It's your first day on a new site. Your supervisor gives you a complex set of instructions about safety procedures, site layout, and your tasks for the day. There's a lot to remember.",
      responses: [
        {
          text: "Nod along and hope you remember everything",
          feedback: "This approach risks missing important details. Don't be afraid to ask questions or take notes.",
          score: 1,
          type: "poor"
        },
        {
          text: "Take notes and ask to clarify the key safety points",
          feedback: "Excellent! Taking notes shows professionalism and asking about safety shows the right priorities.",
          score: 5,
          type: "excellent"
        },
        {
          text: "Listen carefully and repeat back the main points to confirm",
          feedback: "Very good approach. Repeating back key information ensures understanding and shows engagement.",
          score: 4,
          type: "good"
        },
        {
          text: "Interrupt to ask questions as they're speaking",
          feedback: "While questions are good, interrupting can be disruptive. Better to listen first, then ask questions.",
          score: 2,
          type: "fair"
        }
      ]
    },
    {
      title: "Client Asks About Extra Work",
      situation: "You're working in a client's home when they ask if you can add an extra socket in their kitchen. You're not sure if this was part of the original quote or how much it would cost.",
      responses: [
        {
          text: "Say 'Sure, no problem' to be helpful",
          feedback: "Never agree to work without checking with your supervisor. This could cause billing issues and safety concerns.",
          score: 1,
          type: "poor"
        },
        {
          text: "Tell them it will cost £50 extra",
          feedback: "Don't quote prices you're not authorised to give. Always check with your supervisor for pricing decisions.",
          score: 1,
          type: "poor"
        },
        {
          text: "Explain that you'll need to check with your supervisor and get back to them",
          feedback: "Perfect! This shows professionalism while ensuring proper procedures are followed.",
          score: 5,
          type: "excellent"
        },
        {
          text: "Say you can't do any extra work",
          feedback: "This might be true, but it's better to check first. The extra work might be possible with supervisor approval.",
          score: 2,
          type: "fair"
        }
      ]
    },
    {
      title: "Supervisor Seems Stressed",
      situation: "Your supervisor has been under pressure all morning due to delays on another job. When you ask a question about the wiring diagram, they snap at you saying 'Just figure it out yourself!'",
      responses: [
        {
          text: "Get upset and stop asking questions for the rest of the day",
          feedback: "Understandable reaction, but this affects your learning. Their stress isn't about you personally.",
          score: 2,
          type: "fair"
        },
        {
          text: "Argue back that it's their job to help you",
          feedback: "This will make the situation worse. Even if you're right, this approach is unprofessional.",
          score: 1,
          type: "poor"
        },
        {
          text: "Say 'I understand you're busy. I'll have a go and check back with you later.'",
          feedback: "Excellent! This acknowledges their pressure while showing initiative and respect.",
          score: 5,
          type: "excellent"
        },
        {
          text: "Go and ask another colleague instead",
          feedback: "This can work, but it's better to acknowledge your supervisor's situation first before seeking help elsewhere.",
          score: 3,
          type: "good"
        }
      ]
    }
  ];

  const communicationTips = [
    {
      category: "Before You Speak",
      tips: ["Think about your goal", "Consider the other person's perspective", "Choose the right time and place", "Prepare key points"]
    },
    {
      category: "While Speaking",
      tips: ["Use clear, simple language", "Be specific with examples", "Watch their body language", "Check for understanding"]
    },
    {
      category: "After Speaking",
      tips: ["Listen to the response", "Ask if they have questions", "Confirm next steps", "Follow up if needed"]
    }
  ];

  const startScenario = (index: number) => {
    setCurrentScenario(index);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const selectResponse = (responseIndex: number) => {
    setSelectedResponse(responseIndex);
    setShowFeedback(true);
  };

  const resetScenario = () => {
    setCurrentScenario(null);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-400";
    if (score >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "excellent": return "border-green-500/40 bg-green-500/10 text-green-400";
      case "good": return "border-blue-500/40 bg-blue-500/10 text-blue-400";
      case "fair": return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";
      case "poor": return "border-red-500/40 bg-red-500/10 text-red-400";
      default: return "border-gray-500/40 bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Communication Practice</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {currentScenario === null ? (
            <div className="space-y-4">
              <p className="text-muted-foreground mb-6">
                Practice your communication skills with these real-world scenarios. Choose how you would respond and get feedback on your approach.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {practiceScenarios.map((scenario, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 hover:bg-elec-yellow/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white mb-2">{scenario.title}</h3>
                        <p className="text-sm text-muted-foreground">{scenario.situation.substring(0, 120)}...</p>
                      </div>
                      <Button 
                        onClick={() => startScenario(index)}
                        className="ml-4 flex-shrink-0"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Practice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{practiceScenarios[currentScenario].title}</h3>
                <Button variant="outline" onClick={resetScenario}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Back to Scenarios
                </Button>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Scenario</h4>
                <p className="text-muted-foreground">{practiceScenarios[currentScenario].situation}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-3">How would you respond?</h4>
                <div className="space-y-3">
                  {practiceScenarios[currentScenario].responses.map((response, index) => (
                    <div key={index}>
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start h-auto p-4 border-elec-yellow/20 hover:bg-elec-yellow/10"
                        onClick={() => selectResponse(index)}
                        disabled={showFeedback}
                      >
                        <span className="mr-3 text-elec-yellow font-bold">{String.fromCharCode(65 + index)}.</span>
                        {response.text}
                      </Button>
                      
                      {showFeedback && selectedResponse === index && (
                        <div className={`mt-2 p-4 rounded-lg border ${getTypeColor(response.type)}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-medium">
                              Score: <span className={getScoreColor(response.score)}>{response.score}/5</span>
                            </span>
                            <Badge className={getTypeColor(response.type)}>
                              {response.type}
                            </Badge>
                          </div>
                          <p className="text-sm">{response.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Communication Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {communicationTips.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractivePracticeTab;
