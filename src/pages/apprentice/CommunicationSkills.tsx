
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, AlertTriangle, CheckCircle } from "lucide-react";

const CommunicationSkills = () => {
  const communicationScenarios = [
    {
      situation: "Reporting a Problem to Your Supervisor",
      good: "I've encountered an issue with the cable run in the kitchen. The route we planned won't work because of a steel beam. Could you come and look at alternative options?",
      bad: "This is impossible, the drawing is wrong.",
      why: "Specific, factual, and solution-focused rather than emotional"
    },
    {
      situation: "Asking for Help or Clarification", 
      good: "I want to make sure I install this correctly. Could you show me the proper technique for terminating this type of cable?",
      bad: "I don't know what I'm doing.",
      why: "Shows initiative and professionalism rather than helplessness"
    },
    {
      situation: "Receiving Feedback or Criticism",
      good: "Thank you for pointing that out. I'll redo it properly and remember that for next time.",
      bad: "That's not what you told me to do yesterday.",
      why: "Takes responsibility and shows willingness to learn"
    }
  ];

  const keyPrinciples = [
    {
      principle: "Listen First, Speak Second",
      description: "Understand the full picture before responding",
      tips: ["Don't interrupt when being given instructions", "Ask clarifying questions if unsure", "Repeat back important details"]
    },
    {
      principle: "Be Solution-Focused",
      description: "Present problems with potential solutions",
      tips: ["Think through options before approaching supervisors", "Say what you've already tried", "Suggest what you think might work"]
    },
    {
      principle: "Stay Professional Under Pressure",
      description: "Keep calm even when things go wrong",
      tips: ["Don't take criticism personally", "Focus on fixing the issue, not assigning blame", "Ask for help when you need it"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Communication Skills for Apprentices</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Learn how to communicate effectively with supervisors, colleagues, and clients
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Communication Principles</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {keyPrinciples.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{item.principle}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <ul className="space-y-1">
                  {item.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Real-World Communication Examples</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {communicationScenarios.map((scenario, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-4">{scenario.situation}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-300">Good Example</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{scenario.good}"</p>
                  </div>
                  
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="font-medium text-red-300">Poor Example</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{scenario.bad}"</p>
                  </div>
                </div>
                
                <div className="bg-elec-yellow/10 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-elec-yellow">Why it works:</strong> {scenario.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Building Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Common Fears</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• "I'll look stupid if I ask questions"</li>
                <li>• "They'll think I'm not capable"</li>
                <li>• "I should know this already"</li>
                <li>• "I don't want to bother anyone"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Reality Check</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Questions show you're engaged and learning</li>
                <li>• Everyone was new once and remembers it</li>
                <li>• You're not expected to know everything</li>
                <li>• Good supervisors want you to succeed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Key Takeaway</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Good communication isn't about being perfect - it's about being clear, respectful, and professional. 
            The electrical trade values straight talking and practical problem-solving. Focus on being helpful, 
            honest, and willing to learn, and you'll earn respect quickly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSkills;
