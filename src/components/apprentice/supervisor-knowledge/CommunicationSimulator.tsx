
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
      <div className="space-y-6 animate-fade-in">
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                  <MessageSquare className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle className="text-white">{currentScenario.title}</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToScenarios}
                className="h-10 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Scenarios
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <h4 className="font-medium text-blue-400 mb-2">Context:</h4>
              <p className="text-sm text-white/70 mb-4">{currentScenario.context}</p>
              <h4 className="font-medium text-blue-400 mb-2">Situation:</h4>
              <p className="text-sm text-white/70">{currentScenario.situation}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">How would you communicate?</h4>
              {currentScenario.responses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full text-left h-auto p-4 justify-start border-white/10 hover:border-elec-yellow/50 hover:bg-elec-yellow/10 transition-all ${showFeedback && selectedResponse === index ? 'border-elec-yellow/50 bg-elec-yellow/10' : ''}`}
                  onClick={() => handleResponseSelect(index)}
                  disabled={showFeedback}
                >
                  <div className="flex items-start gap-3 w-full">
                    <span className="text-sm font-semibold text-elec-yellow">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <div className="flex-1">
                      <p className="text-sm mb-2 text-white/80">"{response.text}"</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                          {response.style}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            response.effectiveness === 'high'
                              ? 'bg-green-500/10 border-green-500/30 text-green-400'
                              : response.effectiveness === 'medium'
                              ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                              : 'bg-red-500/10 border-red-500/30 text-red-400'
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
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white">Feedback on All Responses:</h4>
                {currentScenario.responses.map((response, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedResponse === index
                        ? 'bg-elec-yellow/10 border-elec-yellow/30'
                        : 'bg-white/10 border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-elec-yellow">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {response.effectiveness === 'high' ? (
                          <div className="p-1 rounded-lg bg-green-500/20">
                            <ThumbsUp className="h-4 w-4 text-green-400" />
                          </div>
                        ) : response.effectiveness === 'low' ? (
                          <div className="p-1 rounded-lg bg-red-500/20">
                            <ThumbsDown className="h-4 w-4 text-red-400" />
                          </div>
                        ) : (
                          <div className="p-1 rounded-lg bg-yellow-500/20">
                            <div className="h-4 w-4 rounded-full bg-yellow-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                          {response.style}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            response.effectiveness === 'high'
                              ? 'bg-green-500/10 border-green-500/30 text-green-400'
                              : response.effectiveness === 'medium'
                              ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                              : 'bg-red-500/10 border-red-500/30 text-red-400'
                          }`}
                        >
                          {response.effectiveness} effectiveness
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-white/60 pl-8">
                      {response.feedback}
                    </p>
                  </div>
                ))}

                <Button
                  onClick={handleBackToScenarios}
                  className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-95 transition-all mt-4"
                >
                  Try Another Scenario
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-gray to-elec-card border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-1">Choose a Communication Scenario</h3>
        <p className="text-sm text-white/60">Practice different workplace communication situations</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {communicationScenarios.map((scenario, index) => {
          const colors = ['blue', 'green', 'purple'][index % 3];
          return (
            <Card
              key={scenario.id}
              className={`bg-gradient-to-br from-elec-gray to-elec-card border-${colors}-500/20 hover:border-${colors}-500/40 cursor-pointer transition-all overflow-hidden relative group`}
              onClick={() => handleScenarioSelect(scenario.id)}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${colors}-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`} />
              <CardContent className="p-5 relative">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br from-${colors}-500/20 to-${colors}-500/5 border border-${colors}-500/30`}>
                    <MessageSquare className={`h-5 w-5 text-${colors}-400`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{scenario.title}</h4>
                    <p className="text-sm text-white/60">{scenario.context}</p>
                  </div>
                  <Badge variant="outline" className="bg-white/5 border-white/20 text-white/60">
                    {scenario.responses.length} responses
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationSimulator;
