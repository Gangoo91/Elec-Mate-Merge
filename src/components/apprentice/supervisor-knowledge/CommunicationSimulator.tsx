
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowLeft, ThumbsUp, ThumbsDown } from "lucide-react";

interface CommunicationScenario {
  id: number;
  title: string;
  context: string;
  situation: string;
  responses: {
    text: string;
    style: "professional" | "casual" | "assertive" | "passive";
    effectiveness: "high" | "medium" | "low";
    feedback: string;
  }[];
}

const communicationScenarios: CommunicationScenario[] = [
  {
    id: 1,
    title: "Asking for Help",
    context: "You're struggling with a wiring task and need assistance",
    situation: "You've been working on connecting a consumer unit for 30 minutes but can't figure out the proper sequence. Your supervisor is nearby working on another task.",
    responses: [
      {
        text: "Hey, can you help me with this? I'm stuck.",
        style: "casual",
        effectiveness: "medium",
        feedback: "This is direct but lacks specifics. Your supervisor doesn't know what exactly you need help with."
      },
      {
        text: "Excuse me, could you help me understand the correct sequence for connecting this consumer unit? I want to make sure I'm doing it safely.",
        style: "professional",
        effectiveness: "high",
        feedback: "Excellent! This is specific, shows you're thinking about safety, and demonstrates a learning mindset."
      },
      {
        text: "I can't do this. It's too complicated.",
        style: "passive",
        effectiveness: "low",
        feedback: "This shows defeat rather than a willingness to learn. It doesn't help your supervisor understand what specific help you need."
      },
      {
        text: "You need to show me how to do this right now.",
        style: "assertive",
        effectiveness: "low",
        feedback: "Too demanding. This approach can damage your relationship with your supervisor."
      }
    ]
  },
  {
    id: 2,
    title: "Reporting Progress",
    context: "Your supervisor asks about your progress on a task",
    situation: "You were asked to install socket outlets in three rooms. You've completed two rooms but encountered a problem in the third that's slowing you down.",
    responses: [
      {
        text: "It's going fine.",
        style: "casual",
        effectiveness: "low",
        feedback: "Too vague. Your supervisor needs specific information to help plan the day's work."
      },
      {
        text: "I've completed the socket installations in the kitchen and living room. I'm working on the bedroom but encountered an issue with the existing wiring that's requiring extra time to resolve safely.",
        style: "professional",
        effectiveness: "high",
        feedback: "Perfect! This gives specific progress updates and identifies the issue causing delays."
      },
      {
        text: "There's a problem and I don't know what to do about it.",
        style: "passive",
        effectiveness: "medium",
        feedback: "You've identified there's an issue but haven't provided enough detail for your supervisor to help effectively."
      },
      {
        text: "I finished two rooms. The third one has bad wiring that's making this take forever.",
        style: "assertive",
        effectiveness: "medium",
        feedback: "You've given progress info but the tone could be more professional, and 'bad wiring' isn't specific enough."
      }
    ]
  },
  {
    id: 3,
    title: "Expressing Concerns",
    context: "You notice a potential safety issue with the work method being used",
    situation: "You observe that the method being used to access a high ceiling area seems potentially unsafe, but you're not sure if you should speak up as an apprentice.",
    responses: [
      {
        text: "That looks dangerous.",
        style: "casual",
        effectiveness: "low",
        feedback: "Too vague and could sound like criticism. Be more specific and constructive."
      },
      {
        text: "I'm concerned about the safety of accessing that height without proper fall protection. Could we discuss the safest approach?",
        style: "professional",
        effectiveness: "high",
        feedback: "Excellent! This shows concern for safety while being respectful and opening dialogue."
      },
      {
        text: "Maybe we should think about this differently...",
        style: "passive",
        effectiveness: "medium",
        feedback: "You're raising the issue but not being clear about your specific concerns."
      },
      {
        text: "We shouldn't be doing it this way. It's not safe.",
        style: "assertive",
        effectiveness: "medium",
        feedback: "Your concern is valid but the delivery could be seen as confrontational. Better to suggest discussion."
      }
    ]
  }
];

const CommunicationSimulator = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleScenarioSelect = (scenarioId: number) => {
    setSelectedScenario(scenarioId);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const handleResponseSelect = (responseIndex: number) => {
    setSelectedResponse(responseIndex);
    setShowFeedback(true);
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const currentScenario = communicationScenarios.find(s => s.id === selectedScenario);

  if (selectedScenario && currentScenario) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">{currentScenario.title}</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={handleBackToScenarios}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scenarios
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-medium text-blue-300 mb-2">Context:</h4>
            <p className="text-sm text-muted-foreground mb-3">{currentScenario.context}</p>
            <h4 className="font-medium text-blue-300 mb-2">Situation:</h4>
            <p className="text-sm text-muted-foreground">{currentScenario.situation}</p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-white">How would you communicate?</h4>
            {currentScenario.responses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left h-auto p-4 justify-start"
                onClick={() => handleResponseSelect(index)}
                disabled={showFeedback}
              >
                <div className="flex items-start gap-3 w-full">
                  <span className="text-sm font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm mb-2">"{response.text}"</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {response.style}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          response.effectiveness === 'high' 
                            ? 'border-green-500 text-green-300' 
                            : response.effectiveness === 'medium'
                            ? 'border-yellow-500 text-yellow-300'
                            : 'border-red-500 text-red-300'
                        }`}
                      >
                        {response.effectiveness} effectiveness
                      </Badge>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
          {showFeedback && selectedResponse !== null && (
            <div className="space-y-4">
              {currentScenario.responses.map((response, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedResponse === index 
                      ? 'bg-elec-yellow/10 border-elec-yellow/30' 
                      : 'bg-elec-gray/50 border-elec-gray/30'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {response.effectiveness === 'high' ? (
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                      ) : response.effectiveness === 'low' ? (
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-yellow-500/50" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {response.style}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          response.effectiveness === 'high' 
                            ? 'border-green-500 text-green-300' 
                            : response.effectiveness === 'medium'
                            ? 'border-yellow-500 text-yellow-300'
                            : 'border-red-500 text-red-300'
                        }`}
                      >
                        {response.effectiveness} effectiveness
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pl-7">
                    {response.feedback}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Choose a Communication Scenario</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {communicationScenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors"
            onClick={() => handleScenarioSelect(scenario.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{scenario.title}</h4>
                  <p className="text-sm text-muted-foreground">{scenario.context}</p>
                </div>
                <MessageSquare className="h-4 w-4 text-elec-yellow" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunicationSimulator;
