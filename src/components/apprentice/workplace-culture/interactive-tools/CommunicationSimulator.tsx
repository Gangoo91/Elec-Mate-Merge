
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Users, CheckCircle, AlertCircle } from "lucide-react";

interface CommunicationSimulatorProps {
  onBack: () => void;
}

interface Scenario {
  id: string;
  title: string;
  context: string;
  situation: string;
  responses: {
    text: string;
    feedback: string;
    rating: 'excellent' | 'good' | 'poor';
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 'help-senior',
    title: "Asking for Help from a Senior Electrician",
    context: "You're working on a complex three-phase installation and have encountered a problem you're not sure how to solve.",
    situation: "You approach your supervisor, Dave, who is known for being direct and sometimes impatient. How do you ask for help?",
    responses: [
      {
        text: "Dave, I'm completely lost with this three-phase setup. Can you just do it for me?",
        feedback: "This approach makes you sound incompetent and puts the burden entirely on Dave. It doesn't show initiative or learning mindset.",
        rating: 'poor'
      },
      {
        text: "Hi Dave, I'm working on the three-phase installation and I've checked the diagrams, but I'm unsure about the neutral connections. Could you spare a few minutes to guide me through it?",
        feedback: "Excellent! You've shown you've attempted the work, identified the specific issue, and asked for guidance rather than someone to do it for you.",
        rating: 'excellent'
      },
      {
        text: "Dave, this three-phase thing is really confusing. I don't get any of it.",
        feedback: "While honest, this is too vague and doesn't show you've made any effort to understand or solve the problem yourself.",
        rating: 'poor'
      }
    ]
  },
  {
    id: 'impatient-client',
    title: "Dealing with an Impatient Client",
    context: "You're rewiring a kitchen and the job is taking longer than initially estimated due to discovering old wiring that needs replacing.",
    situation: "Mrs. Johnson is frustrated and says: 'This is taking forever! You said it would be done yesterday. I have family coming over this weekend!'",
    responses: [
      {
        text: "Look, these things take time. You can't rush electrical work.",
        feedback: "Too dismissive and doesn't acknowledge the client's concerns or explain why the delay occurred.",
        rating: 'poor'
      },
      {
        text: "I completely understand your frustration, Mrs. Johnson. We discovered some old wiring that wasn't up to current safety standards, which we need to replace for your safety. I should have communicated this better when we found it. Let me give you a realistic timeline for completion.",
        feedback: "Perfect! You've acknowledged her feelings, explained the reason for the delay, taken responsibility for poor communication, and offered a solution.",
        rating: 'excellent'
      },
      {
        text: "Sorry, but we found problems with the old wiring. It'll be done when it's done.",
        feedback: "While you've explained the issue, the tone is unprofessional and doesn't show empathy for the client's situation.",
        rating: 'poor'
      }
    ]
  }
];

const CommunicationSimulator = ({ onBack }: CommunicationSimulatorProps) => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const handleResponseSelect = (index: number) => {
    setSelectedResponse(index);
    setShowFeedback(true);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'good': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'poor': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return <CheckCircle className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'poor': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  if (!currentScenario) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Communication Scenario Simulator</h2>
            <p className="text-muted-foreground">Practice workplace conversations in realistic scenarios</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:border-elec-yellow/40 transition-colors" onClick={() => handleScenarioSelect(scenario)}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-elec-yellow" />
                  {scenario.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{scenario.context}</p>
                <Button className="w-full">
                  Start Scenario
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => setCurrentScenario(null)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Scenarios
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">{currentScenario.title}</h2>
          <p className="text-muted-foreground">Choose your response carefully</p>
        </div>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Scenario Context</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100 mb-4">{currentScenario.context}</p>
          <div className="bg-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-200 mb-2">The Situation:</h4>
            <p className="text-blue-100 italic">"{currentScenario.situation}"</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">How do you respond?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentScenario.responses.map((response, index) => (
              <div key={index} className="space-y-2">
                <Button
                  variant="outline"
                  className={`w-full text-left p-4 h-auto whitespace-normal justify-start ${
                    selectedResponse === index ? 'border-elec-yellow bg-elec-yellow/10' : ''
                  }`}
                  onClick={() => handleResponseSelect(index)}
                >
                  <span className="block">{response.text}</span>
                </Button>
                
                {showFeedback && selectedResponse === index && (
                  <div className={`border rounded-lg p-4 ${getRatingColor(response.rating)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {getRatingIcon(response.rating)}
                      <Badge variant="outline" className={getRatingColor(response.rating)}>
                        {response.rating.charAt(0).toUpperCase() + response.rating.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm">{response.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {showFeedback && (
            <div className="mt-6 pt-4 border-t border-muted/20">
              <Button onClick={() => setCurrentScenario(null)} className="mr-4">
                Try Another Scenario
              </Button>
              <Button variant="outline" onClick={() => {
                setSelectedResponse(null);
                setShowFeedback(false);
              }}>
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSimulator;
