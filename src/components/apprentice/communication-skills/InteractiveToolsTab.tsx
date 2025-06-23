
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, MessageSquare, Users, Zap, CheckCircle, AlertTriangle, Phone, MessageCircle, Clock } from "lucide-react";

const InteractiveToolsTab = () => {
  const communicationFrameworks = [
    {
      title: "STAR Method for Reporting",
      description: "Structure your incident reports and project updates professionally",
      components: ["Situation", "Task", "Action", "Result"],
      example: "Situation: Found loose connection in consumer unit. Task: Needed to report safely. Action: Isolated supply, documented with photos. Result: Senior electrician praised thorough documentation."
    },
    {
      title: "CLEAR Communication",
      description: "Ensure your messages are understood first time",
      components: ["Concise", "Logical", "Engaging", "Actionable", "Respectful"],
      example: "Instead of 'The thing is broken', say 'The 32A MCB on the kitchen ring final is tripping. I've checked for obvious faults but need guidance on next steps.'"
    },
    {
      title: "Listen-Understand-Respond",
      description: "Active listening framework for difficult conversations",
      components: ["Listen fully", "Understand context", "Respond appropriately"],
      example: "When a client complains about delays, listen to their concerns, understand their perspective, then respond with solutions and realistic timelines."
    }
  ];

  const practiceScenarios = [
    {
      title: "Asking for Help from a Senior Electrician",
      situation: "You're stuck on a complex three-phase installation and need guidance",
      tips: [
        "Be specific about what you've already tried",
        "Show your working and thought process",
        "Ask at an appropriate time when they're not busy",
        "Take notes and follow up with what you learned"
      ],
      example: "I'm working on the three-phase board in the workshop. I've identified L1, L2, L3 and the neutral, but I'm unsure about the earth arrangements for the SWA. Could you spare 5 minutes to check my understanding?"
    },
    {
      title: "Dealing with an Impatient Client",
      situation: "A homeowner is frustrated about work taking longer than expected",
      tips: [
        "Acknowledge their frustration first",
        "Explain the reason for delays in simple terms",
        "Give realistic timelines with buffer",
        "Keep them updated regularly"
      ],
      example: "I understand this is frustrating, and I apologise for the delay. The reason it's taking longer is that we discovered the earthing needs upgrading for safety. This will add about 2 hours, but it's essential for your family's safety."
    },
    {
      title: "Reporting a Safety Concern",
      situation: "You notice unsafe working conditions but need to speak up to senior staff",
      tips: [
        "Use 'I' statements to avoid blame",
        "Focus on the safety risk, not personalities",
        "Suggest solutions where possible",
        "Document the conversation"
      ],
      example: "I've noticed the temporary supply cable is running across the walkway without protection. I'm concerned someone could trip or damage it. Could we run it overhead or add cable protectors?"
    },
    {
      title: "Team Meeting Participation",
      situation: "Weekly site meeting where you need to contribute and ask questions",
      tips: [
        "Prepare your points beforehand",
        "Ask questions for clarification, not to show off",
        "Speak clearly and at appropriate volume",
        "Take notes and follow through on actions"
      ],
      example: "From yesterday's work on the office lighting, I completed circuits 1-4. I need clarification on the emergency lighting requirements for circuits 5-6 before I continue."
    }
  ];

  const communicationTips = [
    {
      category: "Phone Conversations",
      icon: Phone,
      tips: [
        "Always state your name and company when answering",
        "Keep a pen and paper handy for notes",
        "Repeat back important information to confirm",
        "End with a clear summary of next steps"
      ]
    },
    {
      category: "Face-to-Face Interactions",
      icon: Users,
      tips: [
        "Make appropriate eye contact",
        "Use open body language",
        "Match the other person's communication style",
        "Be aware of personal space and cultural differences"
      ]
    },
    {
      category: "Written Communication",
      icon: MessageCircle,
      tips: [
        "Use proper spelling and grammar in all written communication",
        "Structure emails with clear subject lines",
        "Use bullet points for multiple items",
        "Always proofread before sending"
      ]
    },
    {
      category: "Time-Sensitive Communication",
      icon: Clock,
      tips: [
        "Prioritise urgent safety issues",
        "Use appropriate channels (call for urgent, email for non-urgent)",
        "Set clear expectations about response times",
        "Follow up appropriately without being pushy"
      ]
    }
  ];

  const difficultConversationTips = [
    {
      title: "When You've Made a Mistake",
      approach: "Own it early, explain briefly, focus on solutions",
      example: "I've made an error with the lighting circuit connections. I've isolated the supply for safety. Can you help me understand the correct method so I can fix it properly?"
    },
    {
      title: "When You Don't Understand Instructions",
      approach: "Ask specific questions, request demonstrations, confirm understanding",
      example: "I want to make sure I understand the termination method correctly. Could you show me the first connection so I can follow the same approach for the rest?"
    },
    {
      title: "When Dealing with Workplace Conflict",
      approach: "Stay professional, focus on work impact, seek supervisor guidance",
      example: "I'm having difficulty getting the information I need to complete my work. Could we discuss the best way to coordinate between our teams?"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Communication Frameworks & Practical Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Master proven communication frameworks and get practical tips for real workplace scenarios. 
            These tools will help you communicate more effectively with colleagues, supervisors, and clients.
          </p>
        </CardContent>
      </Card>

      {/* Communication Frameworks */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Communication Frameworks</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {communicationFrameworks.map((framework, index) => (
            <Card key={index} className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-300 text-lg">{framework.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{framework.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-white mb-2">Components:</h4>
                    <div className="flex flex-wrap gap-1">
                      {framework.components.map((component, idx) => (
                        <Badge key={idx} variant="outline" className="border-blue-500/30 text-blue-200 text-xs">
                          {component}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                    <p className="text-xs text-blue-200"><strong>Example:</strong> {framework.example}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Practice Scenarios */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Practice Scenarios</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {practiceScenarios.map((scenario, index) => (
            <Card key={index} className="border-green-500/20 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {scenario.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{scenario.situation}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Key Tips:</h4>
                    <ul className="space-y-1">
                      {scenario.tips.map((tip, tipIdx) => (
                        <li key={tipIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <p className="text-xs text-green-200"><strong>Example Script:</strong> "{scenario.example}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Communication Tips by Category */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Communication Tips by Situation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communicationTips.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Zap className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Difficult Conversations */}
      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Handling Difficult Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficultConversationTips.map((tip, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">{tip.title}</h4>
                <p className="text-sm text-orange-200 mb-3"><strong>Approach:</strong> {tip.approach}</p>
                <div className="bg-orange-500/10 rounded-lg p-2 border border-orange-500/20">
                  <p className="text-xs text-orange-200"><strong>Example:</strong> "{tip.example}"</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final Encouragement */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Remember: Practice Makes Perfect</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Effective communication is a skill that improves with practice. Start by focusing on one framework or tip at a time. 
            Use these scenarios to practice with colleagues, friends, or even in front of a mirror. 
            The more you practice professional communication, the more natural it becomes in real situations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
