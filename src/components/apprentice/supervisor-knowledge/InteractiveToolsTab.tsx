
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, MessageSquare, Users, Target, CheckCircle, AlertTriangle, Info, HelpCircle } from "lucide-react";

const InteractiveToolsTab = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  const interactiveTools = [
    {
      id: 1,
      title: "Scenario-Based Decision Making",
      icon: Target,
      description: "Practice making decisions in realistic workplace scenarios",
      scenarios: [
        {
          id: 1,
          title: "Conflicting Instructions",
          situation: "Your supervisor tells you to do one thing, but the site manager says something different.",
          options: [
            "Follow supervisor's instructions without question",
            "Ask supervisor and site manager to clarify together",
            "Follow site manager as they have higher authority",
            "Do nothing until it's resolved"
          ],
          correctAnswer: 1,
          explanation: "Always seek clarification when receiving conflicting instructions to avoid confusion and potential safety issues."
        },
        {
          id: 2,
          title: "Safety Concern Communication",
          situation: "You notice a potential safety hazard but your supervisor seems busy and stressed.",
          options: [
            "Wait for a better time to mention it",
            "Report it immediately regardless of supervisor's mood",
            "Fix it yourself if possible",
            "Mention it to a colleague first"
          ],
          correctAnswer: 1,
          explanation: "Safety concerns should always be reported immediately, regardless of timing or supervisor's current state."
        }
      ]
    },
    {
      id: 2,
      title: "Communication Style Simulator",
      icon: MessageSquare,
      description: "Practice different communication approaches for various workplace situations",
      content: "Interactive simulator for practising professional communication"
    },
    {
      id: 3,
      title: "Relationship Building Activities",
      icon: Users,
      description: "Activities and exercises to improve workplace relationships",
      content: "Guided activities for building professional relationships"
    }
  ];

  const communicationTips = [
    {
      situation: "Asking for help",
      tip: "Be specific about what you need and acknowledge that you're learning",
      example: "Could you help me understand the correct procedure for X? I want to make sure I'm doing it properly."
    },
    {
      situation: "Reporting progress",
      tip: "Give clear, concise updates and mention any challenges early",
      example: "I've completed tasks A and B. Task C is taking longer than expected due to Y - should I continue or reassess?"
    },
    {
      situation: "Expressing concerns",
      tip: "Focus on the issue, not personalities, and suggest solutions where possible",
      example: "I'm concerned about X because of Y. Would it be possible to consider Z as an alternative?"
    }
  ];

  const renderScenario = (scenario: any) => (
    <div className="space-y-4">
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h4 className="font-medium text-blue-300 mb-2">Situation:</h4>
        <p className="text-sm text-muted-foreground">{scenario.situation}</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-white">What would you do?</h4>
        {scenario.options.map((option: string, index: number) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left h-auto p-3 justify-start"
            onClick={() => {/* Handle option selection */}}
          >
            <span className="text-sm">{String.fromCharCode(65 + index)}. {option}</span>
          </Button>
        ))}
      </div>
      
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h4 className="font-medium text-green-300 mb-2">Best Practice:</h4>
        <p className="text-sm text-muted-foreground">{scenario.explanation}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Learning Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Practice communication skills and decision-making through interactive scenarios, 
            simulations, and guided exercises designed to build confidence in workplace situations.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {interactiveTools.map((tool) => (
            <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-elec-yellow/10">
                    <tool.icon className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {tool.scenarios ? (
                  <div className="space-y-4">
                    {selectedScenario === tool.id ? (
                      <div className="space-y-4">
                        {tool.scenarios.map((scenario) => (
                          <div key={scenario.id}>
                            <h4 className="font-medium text-white mb-3">{scenario.title}</h4>
                            {renderScenario(scenario)}
                          </div>
                        ))}
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedScenario(null)}
                          className="w-full"
                        >
                          Back to Tools
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => setSelectedScenario(tool.id)}
                        className="w-full"
                      >
                        Start Practice
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button className="w-full">Start Activity</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Quick Communication Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communicationTips.map((tip, index) => (
                <div key={index} className="border border-green-500/30 rounded-lg p-3">
                  <h4 className="font-medium text-white text-sm mb-2">{tip.situation}</h4>
                  <p className="text-xs text-green-300 mb-2">{tip.tip}</p>
                  <div className="bg-green-500/20 rounded p-2">
                    <p className="text-xs text-green-200 italic">"{tip.example}"</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveToolsTab;
