
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Target, ArrowLeft } from "lucide-react";

interface ScenarioOption {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

interface Scenario {
  id: number;
  title: string;
  situation: string;
  options: ScenarioOption[];
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Conflicting Instructions",
    situation: "Your supervisor tells you to do one thing, but the site manager says something different.",
    options: [
      {
        text: "Follow supervisor's instructions without question",
        isCorrect: false,
        feedback: "This could lead to confusion and potential safety issues if instructions conflict."
      },
      {
        text: "Ask supervisor and site manager to clarify together",
        isCorrect: true,
        feedback: "Excellent! This approach ensures clear communication and prevents misunderstandings."
      },
      {
        text: "Follow site manager as they have higher authority",
        isCorrect: false,
        feedback: "Authority levels can vary by situation. It's better to seek clarification first."
      },
      {
        text: "Do nothing until it's resolved",
        isCorrect: false,
        feedback: "Inaction could delay important work. Proactive communication is better."
      }
    ],
    explanation: "Always seek clarification when receiving conflicting instructions to avoid confusion and potential safety issues."
  },
  {
    id: 2,
    title: "Safety Concern Communication",
    situation: "You notice a potential safety hazard but your supervisor seems busy and stressed.",
    options: [
      {
        text: "Wait for a better time to mention it",
        isCorrect: false,
        feedback: "Safety concerns should never be delayed - they could lead to accidents."
      },
      {
        text: "Report it immediately regardless of supervisor's mood",
        isCorrect: true,
        feedback: "Perfect! Safety always takes priority over timing or mood considerations."
      },
      {
        text: "Fix it yourself if possible",
        isCorrect: false,
        feedback: "You should report it first - you might not have authority or proper knowledge to fix it safely."
      },
      {
        text: "Mention it to a colleague first",
        isCorrect: false,
        feedback: "Safety concerns should be reported directly to supervisors or safety officers."
      }
    ],
    explanation: "Safety concerns should always be reported immediately, regardless of timing or supervisor's current state."
  },
  {
    id: 3,
    title: "Learning Opportunity Request",
    situation: "You see other tradespeople doing interesting work that you'd like to learn about, but you have your own tasks to complete.",
    options: [
      {
        text: "Leave your work to watch them",
        isCorrect: false,
        feedback: "Abandoning your assigned tasks without permission is unprofessional."
      },
      {
        text: "Ask your supervisor if you can observe during a break or after completing your tasks",
        isCorrect: true,
        feedback: "Great approach! This shows initiative while respecting your responsibilities."
      },
      {
        text: "Ignore it and focus only on your assigned work",
        isCorrect: false,
        feedback: "Missing learning opportunities can slow your development as an apprentice."
      },
      {
        text: "Ask the other tradespeople directly without involving your supervisor",
        isCorrect: false,
        feedback: "You should always check with your supervisor before changing your focus or schedule."
      }
    ],
    explanation: "Always communicate with your supervisor about learning opportunities. They can help you balance learning with your responsibilities."
  }
];

const ScenarioBasedTool = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<Set<number>>(new Set());

  const handleScenarioSelect = (scenarioId: number) => {
    setSelectedScenario(scenarioId);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
    
    const scenario = scenarios.find(s => s.id === selectedScenario);
    if (scenario?.options[optionIndex].isCorrect) {
      setCompletedScenarios(prev => new Set([...prev, selectedScenario!]));
    }
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenario);

  if (selectedScenario && currentScenario) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
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
            <h4 className="font-medium text-blue-300 mb-2">Situation:</h4>
            <p className="text-sm text-muted-foreground">{currentScenario.situation}</p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-white">What would you do?</h4>
            {currentScenario.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left h-auto p-4 justify-start relative ${
                  selectedAnswer === index
                    ? option.isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
              >
                <div className="flex items-start gap-3 w-full">
                  <span className="text-sm font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-sm flex-1">{option.text}</span>
                  {showFeedback && selectedAnswer === index && (
                    <div className="flex-shrink-0">
                      {option.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
          
          {showFeedback && selectedAnswer !== null && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                currentScenario.options[selectedAnswer].isCorrect
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <h4 className={`font-medium mb-2 ${
                  currentScenario.options[selectedAnswer].isCorrect
                    ? 'text-green-300'
                    : 'text-red-300'
                }`}>
                  {currentScenario.options[selectedAnswer].isCorrect ? 'Correct!' : 'Not the best approach'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentScenario.options[selectedAnswer].feedback}
                </p>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Best Practice:</h4>
                <p className="text-sm text-muted-foreground">{currentScenario.explanation}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Choose a Scenario to Practice</h3>
        <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
          {completedScenarios.size} / {scenarios.length} completed
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {scenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors ${
              completedScenarios.has(scenario.id) ? 'border-green-500/50' : ''
            }`}
            onClick={() => handleScenarioSelect(scenario.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{scenario.title}</h4>
                  <p className="text-sm text-muted-foreground">{scenario.situation}</p>
                </div>
                <div className="flex items-center gap-2">
                  {completedScenarios.has(scenario.id) && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <Target className="h-4 w-4 text-elec-yellow" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScenarioBasedTool;
