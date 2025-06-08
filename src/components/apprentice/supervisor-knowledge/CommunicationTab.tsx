
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Phone, Mail, AlertTriangle, CheckCircle, Clock, Star, Volume2 } from "lucide-react";

const CommunicationTab = () => {
  const communicationScenarios = [
    {
      title: "Requesting Help from Senior Staff",
      difficulty: "Essential",
      scenario: "You're stuck on a complex installation and need guidance without appearing incompetent",
      approach: "Frame requests as learning opportunities rather than admitting defeat",
      examples: [
        "I'm working on the three-phase board installation and want to verify my approach before proceeding - could you check my plan?",
        "I've calculated the cable sizes for this circuit, but I'd appreciate you reviewing them to ensure I'm on the right track",
        "I'm about to start the testing sequence - would you mind walking me through it one more time to make sure I don't miss anything?"
      ],
      tips: [
        "Always show what work you've already done",
        "Ask specific questions rather than general help",
        "Demonstrate your thinking process",
        "Follow up with what you learned"
      ]
    },
    {
      title: "Reporting Problems to Supervisors",
      difficulty: "Critical",
      scenario: "You've discovered a safety issue or made an error that needs immediate attention",
      approach: "Be direct, factual, and solution-focused",
      examples: [
        "I've identified a potential safety hazard in the meter room - the incoming supply appears to have damaged insulation",
        "I need to report that I've made an error in the cable routing that requires correction before we proceed",
        "There's been a change in site conditions that affects our installation plan - the structural support isn't where expected"
      ],
      tips: [
        "Report immediately - don't wait",
        "State facts, not opinions",
        "Suggest solutions where possible",
        "Document everything in writing"
      ]
    },
    {
      title: "Client Interaction Protocols",
      difficulty: "Intermediate",
      scenario: "Dealing with homeowners or commercial clients during installation work",
      approach: "Professional, informative, and reassuring communication",
      examples: [
        "Good morning, I'm [Name] from [Company]. I'll be working on your electrical installation today. I'll need to isolate your power for approximately 2 hours between 10am and 12pm",
        "I wanted to update you on our progress - we've completed the first fix wiring and are ready to move to the testing phase tomorrow",
        "I need to discuss a variation to the original plan - we've encountered an issue that requires a different approach, which I'll need to run past my supervisor"
      ],
      tips: [
        "Always introduce yourself professionally",
        "Explain what you're doing and why",
        "Give clear timeframes",
        "Never commit to changes without supervisor approval"
      ]
    }
  ];

  const communicationChannels = [
    {
      channel: "Face-to-Face",
      icon: Users,
      bestFor: "Complex problems, safety issues, learning new skills",
      advantages: ["Immediate feedback", "Visual demonstrations", "Building relationships"],
      tips: ["Choose appropriate timing", "Prepare questions in advance", "Take notes"],
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    },
    {
      channel: "Radio/Phone",
      icon: Phone,
      bestFor: "Urgent issues, location updates, quick questions",
      advantages: ["Immediate response", "Works across distances", "Documented via logs"],
      tips: ["Keep messages brief and clear", "Use proper radio protocol", "Confirm receipt"],
      color: "bg-green-500/20 text-green-400 border-green-500/30"
    },
    {
      channel: "Text/WhatsApp",
      icon: MessageSquare,
      bestFor: "Non-urgent updates, sharing photos, coordination",
      advantages: ["Creates written record", "Can include images", "Flexible timing"],
      tips: ["Professional language only", "Avoid sensitive information", "Confirm important messages"],
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
    },
    {
      channel: "Email",
      icon: Mail,
      bestFor: "Formal communication, documentation, detailed explanations",
      advantages: ["Professional record", "Can attach documents", "Carbon copy others"],
      tips: ["Use clear subject lines", "Structure information logically", "Proofread before sending"],
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
    }
  ];

  const professionalLanguage = [
    {
      situation: "Asking for clarification",
      poor: "I don't get it",
      better: "Could you explain that procedure once more, please?",
      best: "I want to ensure I understand the sequence correctly - could you walk me through steps 3 and 4 again?"
    },
    {
      situation: "Reporting completion",
      poor: "Done",
      better: "I've finished the task",
      best: "I've completed the ring final installation and it's ready for inspection. All connections are secure and the circuit has been initially tested."
    },
    {
      situation: "Requesting materials",
      poor: "Need more cable",
      better: "I need additional cable",
      best: "I require approximately 20 metres of 2.5mm² T&E cable to complete the kitchen ring final circuit."
    },
    {
      situation: "Expressing uncertainty",
      poor: "I think this is wrong",
      better: "This doesn't look right to me",
      best: "I'm concerned about this connection - the readings don't match what I expected. Could you verify this for me?"
    }
  ];

  const difficultConversations = [
    {
      scenario: "Admitting a Mistake",
      challenge: "Fear of getting in trouble or looking incompetent",
      approach: "Immediate honesty with solution focus",
      script: "I need to let you know that I've made an error with the cable routing in the kitchen. I've isolated the circuit and I think the best approach would be to re-route via the utility room. Can we discuss the correction procedure?",
      followUp: ["Take responsibility completely", "Focus on the solution", "Learn from the feedback", "Document lessons learned"]
    },
    {
      scenario: "Disagreeing with Instructions",
      challenge: "Balancing respect with safety concerns",
      approach: "Respectful questioning with safety focus",
      script: "I understand the approach you've outlined, but I have a concern about the cable routing through that area. The building plans show a potential conflict. Could we review this together?",
      followUp: ["Present facts, not opinions", "Suggest alternatives", "Accept the final decision", "Document any concerns formally if needed"]
    },
    {
      scenario: "Requesting Time Off",
      challenge: "Balancing personal needs with work commitments",
      approach: "Professional request with adequate notice",
      script: "I'd like to request annual leave for [dates] for a family commitment. I can ensure all my current tasks are completed beforehand, and I'm happy to brief a colleague on any ongoing work.",
      followUp: ["Give maximum notice possible", "Offer to arrange cover", "Confirm arrangements in writing", "Be flexible where possible"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Communication Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Master the art of professional communication in the electrical industry. Learn how to interact 
            effectively with supervisors, colleagues, and clients while building strong working relationships.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {communicationChannels.map((channel, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <channel.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle className="text-white">{channel.channel}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Best Used For:</h4>
                  <p className="text-sm text-muted-foreground">{channel.bestFor}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Advantages:</h4>
                  <ul className="space-y-1">
                    {channel.advantages.map((advantage, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Professional Tips:</h4>
                  <ul className="space-y-1">
                    {channel.tips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Star className="h-3 w-3 text-elec-yellow" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Communication Scenarios & Scripts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {communicationScenarios.map((scenario, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-medium text-white">{scenario.title}</h3>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30" variant="outline">
                    {scenario.difficulty}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-500/5 rounded p-3">
                    <h4 className="font-medium text-blue-300 mb-1">Scenario:</h4>
                    <p className="text-sm text-muted-foreground">{scenario.scenario}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2">Approach:</h4>
                    <p className="text-sm text-blue-200">{scenario.approach}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2">Example Phrases:</h4>
                    <div className="space-y-2">
                      {scenario.examples.map((example, idx) => (
                        <div key={idx} className="bg-blue-500/10 rounded p-2">
                          <p className="text-sm text-blue-100 italic">"{example}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2">Key Tips:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scenario.tips.map((tip, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Professional Language Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {professionalLanguage.map((example, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 capitalize">{example.situation}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30" variant="outline">
                        Poor
                      </Badge>
                    </div>
                    <p className="text-sm text-red-300 italic">"{example.poor}"</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30" variant="outline">
                        Better
                      </Badge>
                    </div>
                    <p className="text-sm text-yellow-300 italic">"{example.better}"</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30" variant="outline">
                        Best
                      </Badge>
                    </div>
                    <p className="text-sm text-green-300 italic">"{example.best}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Handling Difficult Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {difficultConversations.map((conversation, index) => (
              <div key={index} className="border border-red-500/30 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">{conversation.scenario}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-red-300 mb-2">Challenge:</h4>
                    <p className="text-sm text-muted-foreground">{conversation.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-300 mb-2">Approach:</h4>
                    <p className="text-sm text-muted-foreground">{conversation.approach}</p>
                  </div>
                </div>
                
                <div className="bg-red-500/10 rounded p-3 mb-4">
                  <h4 className="font-medium text-red-300 mb-2">Example Script:</h4>
                  <p className="text-sm text-red-100 italic">"{conversation.script}"</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-300 mb-2">Follow-up Actions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {conversation.followUp.map((action, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3 text-red-400" />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationTab;
