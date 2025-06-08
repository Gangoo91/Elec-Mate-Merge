
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Clock, Phone } from "lucide-react";

const DifficultSituationsTab = () => {
  const difficultScenarios = [
    {
      title: "Receiving Harsh Criticism",
      icon: AlertTriangle,
      color: "border-red-500/20 bg-red-500/10",
      iconColor: "text-red-400",
      scenario: "Your supervisor is frustrated because you've made the same mistake twice and speaks to you quite harshly in front of other workers.",
      wrongResponse: "Getting defensive: 'It's not my fault, you didn't explain it properly!' or shutting down completely.",
      rightResponse: "Stay calm and professional: 'I understand you're frustrated. You're right, I should have got this right by now. Can we go through it once more so I can make sure I understand?'",
      keyPrinciples: ["Don't take it personally", "Focus on the learning", "Show you're taking responsibility", "Ask for clarification if needed"],
      followUp: "Later, when things have calmed down, you might say: 'I've been thinking about what happened earlier. I want to make sure I don't repeat that mistake. Could you help me understand what I missed?'"
    },
    {
      title: "Disagreeing with Instructions",
      icon: Shield,
      color: "border-orange-500/20 bg-orange-500/10",
      iconColor: "text-orange-400",
      scenario: "You're asked to do something that doesn't seem right according to what you learned in college, but your supervisor seems certain.",
      wrongResponse: "Challenging directly: 'That's wrong, we learned at college that...' or following blindly without questioning.",
      rightResponse: "Respectful questioning: 'I want to make sure I understand this correctly. In college we learned [X], but I can see you're doing [Y]. Could you help me understand the difference?'",
      keyPrinciples: ["Acknowledge their experience", "Frame it as learning", "Be specific about the difference", "Show willingness to understand"],
      followUp: "If you're still concerned about safety: 'I'm probably missing something, but I'm still a bit unclear about why this approach is safe. Could you explain the reasoning?'"
    },
    {
      title: "Client Complaints",
      icon: Phone,
      color: "border-blue-500/20 bg-blue-500/10",
      iconColor: "text-blue-400",
      scenario: "A client is unhappy about dust, noise, or the time the work is taking and starts complaining to you directly.",
      wrongResponse: "Making excuses: 'It's not my fault, this is how long it takes' or making promises you can't keep: 'I'll finish by lunchtime.'",
      rightResponse: "Listen and acknowledge: 'I understand this is disruptive for you. Let me get my supervisor to discuss this with you and see what we can do to minimise the impact.'",
      keyPrinciples: ["Listen to their concerns", "Acknowledge the impact", "Don't make excuses", "Involve your supervisor for solutions"],
      followUp: "Keep them informed: 'My supervisor will be with you in 5 minutes to discuss options for reducing the disruption.'"
    },
    {
      title: "Making Mistakes",
      icon: Clock,
      color: "border-purple-500/20 bg-purple-500/10",
      iconColor: "text-purple-400",
      scenario: "You've made an error that will cause delays or extra cost, and you're worried about the consequences.",
      wrongResponse: "Hiding the mistake, blaming others, or making excuses: 'The drawing was wrong' or 'Nobody told me that.'",
      rightResponse: "Immediate honesty: 'I need to let you know that I've made an error with [specific description]. I realised when [how you found out]. What's the best way to fix this?'",
      keyPrinciples: ["Report immediately", "Be specific about what went wrong", "Take full responsibility", "Focus on solutions"],
      followUp: "Learn from it: 'I understand how this happened and I've thought about how to prevent it in future. Can I run my plan past you?'"
    }
  ];

  const deEscalationTips = [
    {
      situation: "When someone is angry",
      tips: ["Lower your voice", "Give them space to speak", "Use their name", "Avoid defensive body language"]
    },
    {
      situation: "When you're feeling defensive",
      tips: ["Take a deep breath", "Count to three before responding", "Focus on the facts", "Ask clarifying questions"]
    },
    {
      situation: "When there's a misunderstanding",
      tips: ["Summarise what you heard", "Ask for clarification", "Use 'I' statements", "Find common ground"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Handling Difficult Situations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {difficultScenarios.map((scenario, index) => {
              const IconComponent = scenario.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${scenario.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`h-6 w-6 ${scenario.iconColor}`} />
                    <h3 className="text-xl font-semibold text-white">{scenario.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-black/20 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">The Situation</h4>
                      <p className="text-sm text-muted-foreground">{scenario.scenario}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <h4 className="font-medium text-red-300 mb-2">Wrong Approach</h4>
                        <p className="text-sm text-muted-foreground italic">{scenario.wrongResponse}</p>
                      </div>
                      
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <h4 className="font-medium text-green-300 mb-2">Professional Response</h4>
                        <p className="text-sm text-muted-foreground italic">"{scenario.rightResponse}"</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="font-medium text-blue-300 mb-2">Key Principles</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {scenario.keyPrinciples.map((principle, principleIndex) => (
                          <Badge key={principleIndex} variant="outline" className="text-xs border-blue-400/40 text-blue-300">
                            {principle}
                          </Badge>
                        ))}
                      </div>
                      <div className="bg-blue-500/20 rounded p-3">
                        <p className="text-xs text-blue-300 font-medium mb-1">Follow-up approach:</p>
                        <p className="text-sm text-muted-foreground italic">"{scenario.followUp}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">De-escalation Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deEscalationTips.map((tip, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{tip.situation}</h4>
                <ul className="space-y-2">
                  {tip.tips.map((technique, techIndex) => (
                    <li key={techIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      {technique}
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

export default DifficultSituationsTab;
