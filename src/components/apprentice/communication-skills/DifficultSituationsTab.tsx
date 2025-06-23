
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Shield, MessageCircle, Users, Clock, Lightbulb } from "lucide-react";

const DifficultSituationsTab = () => {
  const difficultScenarios = [
    {
      category: "Disagreements with Supervisors",
      icon: Users,
      color: "border-orange-500/20 bg-orange-500/10",
      iconColor: "text-orange-400",
      scenarios: [
        {
          situation: "Your supervisor asks you to do something that seems unsafe",
          approach: "Express your concerns professionally and ask for clarification",
          example: "I want to make sure I understand this correctly. You'd like me to work on this circuit without isolation? Could you help me understand the safe procedure for this situation?",
          tips: ["Never ignore safety concerns", "Ask questions rather than refuse outright", "Document the conversation if needed"]
        },
        {
          situation: "You disagree with the chosen method or approach",
          approach: "Present your perspective as a question or suggestion",
          example: "I've seen this done differently before. Would it be worth considering running the cable via the alternative route to avoid the beam?",
          tips: ["Show respect for their experience", "Frame as learning opportunity", "Be open to their reasoning"]
        },
        {
          situation: "You've made a mistake and need to report it",
          approach: "Be honest immediately and focus on solutions",
          example: "I need to let you know I've made an error with the cable termination. I've isolated the circuit and I'm ready to fix it. What's the best approach?",
          tips: ["Report immediately - don't try to hide it", "Take responsibility", "Have a solution ready if possible"]
        }
      ]
    },
    {
      category: "Challenging Client Interactions",
      icon: MessageCircle,
      color: "border-red-500/20 bg-red-500/10",
      iconColor: "text-red-400",
      scenarios: [
        {
          situation: "Client questions your competence or age",
          approach: "Stay professional and redirect to your supervisor if needed",
          example: "I understand your concerns. I'm working under the supervision of [supervisor's name] who has [X] years experience. Would you like me to ask them to explain the work we're doing?",
          tips: ["Don't take it personally", "Use your supervisor's authority", "Focus on the work quality"]
        },
        {
          situation: "Client wants to change the work mid-project",
          approach: "Acknowledge their request but explain the process",
          example: "I can see why you'd want that additional socket there. I'll need to discuss this with my supervisor as it affects the circuit design and may need updated certification.",
          tips: ["Never agree to changes without supervisor approval", "Explain why approval is needed", "Be helpful but maintain boundaries"]
        },
        {
          situation: "Client is unhappy with disruption or mess",
          approach: "Acknowledge their concerns and explain your precautions",
          example: "I understand this is disruptive. We're using dust sheets and will clean up thoroughly. The power will be off for about 2 hours while we make the connections. Is there anything specific you're worried about?",
          tips: ["Show empathy for their situation", "Explain what you're doing to minimise impact", "Give realistic timeframes"]
        }
      ]
    },
    {
      category: "Workplace Conflicts",
      icon: AlertTriangle,
      color: "border-yellow-500/20 bg-yellow-500/10",
      iconColor: "text-yellow-400",
      scenarios: [
        {
          situation: "Colleague isn't pulling their weight",
          approach: "Focus on work coordination rather than personal criticism",
          example: "We need to coordinate our work better to meet the deadline. Could we agree on who's doing what sections by when?",
          tips: ["Focus on work outcomes, not personalities", "Suggest solutions, not just problems", "Involve supervisor if it affects safety or deadlines"]
        },
        {
          situation: "Someone takes credit for your work",
          approach: "Address it directly but professionally",
          example: "I'm glad the client liked the installation. I spent quite a bit of time planning that cable route - it's always satisfying when the extra effort pays off.",
          tips: ["Claim your contributions matter-of-factly", "Don't be aggressive or accusatory", "Document your contributions when appropriate"]
        },
        {
          situation: "You witness unsafe behaviour by a colleague",
          approach: "Address it immediately if there's immediate danger, then follow up properly",
          example: "Hold on - that circuit's still live! Let me help you isolate it properly before we continue.",
          tips: ["Safety always comes first", "Speak up immediately for immediate dangers", "Report persistent unsafe behaviour to supervisor"]
        }
      ]
    }
  ];

  const deEscalationTechniques = [
    {
      technique: "Active Listening",
      description: "Really hear what the other person is saying",
      steps: ["Give them your full attention", "Don't interrupt", "Repeat back what you've heard", "Ask clarifying questions"]
    },
    {
      technique: "Stay Calm",
      description: "Keep your emotions under control",
      steps: ["Take deep breaths", "Lower your voice", "Keep body language open", "Pause before responding"]
    },
    {
      technique: "Find Common Ground",
      description: "Look for shared goals or interests",
      steps: ["Identify what you both want to achieve", "Focus on the work, not personalities", "Emphasise shared responsibilities", "Work towards solutions together"]
    },
    {
      technique: "Know When to Escalate",
      description: "Recognise when you need help",
      steps: ["If safety is involved", "If you're out of your depth", "If emotions are running too high", "If the other person requests your supervisor"]
    }
  ];

  const communicationDonts = [
    "Don't raise your voice or get aggressive",
    "Don't make it personal or use blame language",
    "Don't ignore the problem hoping it will go away",
    "Don't badmouth colleagues to clients",
    "Don't promise things you can't deliver",
    "Don't argue about company policies you can't change",
    "Don't discuss other people's personal matters",
    "Don't use technical jargon to confuse or intimidate"
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Remember:</strong> Difficult situations are learning opportunities. Stay professional, focus on solutions, and don't hesitate to ask for help when needed.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {difficultScenarios.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card key={index} className={`border rounded-lg ${category.color}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 ${category.iconColor}`} />
                  <CardTitle className="text-white">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.scenarios.map((scenario, scenarioIndex) => (
                    <div key={scenarioIndex} className="bg-black/20 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">{scenario.situation}</h4>
                      
                      <div className="mb-3">
                        <p className="text-xs text-elec-yellow font-medium mb-1">Approach:</p>
                        <p className="text-sm text-muted-foreground">{scenario.approach}</p>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-3">
                        <p className="text-xs text-green-400 font-medium mb-1">Example Response:</p>
                        <p className="text-sm text-muted-foreground italic">"{scenario.example}"</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {scenario.tips.map((tip, tipIndex) => (
                          <Badge key={tipIndex} variant="outline" className="text-xs border-white/20">
                            {tip}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-400">De-escalation Techniques</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deEscalationTechniques.map((technique, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{technique.technique}</h4>
                <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                <ul className="space-y-1">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-400">What NOT to Do</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {communicationDonts.map((dont, index) => (
              <div key={index} className="flex items-start gap-2 p-2 border border-red-500/20 rounded">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-sm text-muted-foreground">{dont}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-400">Key Principles</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-green-500/20 rounded-lg">
              <h4 className="font-medium text-green-300 mb-2">Stay Professional</h4>
              <p className="text-sm text-muted-foreground">Maintain respect and composure regardless of the situation</p>
            </div>
            <div className="text-center p-4 border border-green-500/20 rounded-lg">
              <h4 className="font-medium text-green-300 mb-2">Focus on Solutions</h4>
              <p className="text-sm text-muted-foreground">Look for ways to resolve issues rather than assigning blame</p>
            </div>
            <div className="text-center p-4 border border-green-500/20 rounded-lg">
              <h4 className="font-medium text-green-300 mb-2">Know Your Limits</h4>
              <p className="text-sm text-muted-foreground">Escalate to your supervisor when situations are beyond your experience</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DifficultSituationsTab;
