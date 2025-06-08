
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Phone, Mail, AlertTriangle, ThumbsUp, Clock } from "lucide-react";

const CommunicationTab = () => {
  const communicationStrategies = [
    {
      title: "Asking Technical Questions",
      icon: MessageSquare,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      tips: [
        "Prepare your question beforehand - show you've thought about it",
        "Explain what you've already tried or considered",
        "Ask specific questions rather than general ones",
        "Listen actively and take notes during the explanation",
        "Follow up with a summary to confirm understanding"
      ],
      examples: [
        "I'm calculating cable size for this circuit and got 2.5mm². Could you check my working?",
        "I understand the basic polarity test, but I'm unsure about the two-way switching circuit. Could you walk me through it?"
      ]
    },
    {
      title: "Reporting Problems or Concerns",
      icon: AlertTriangle,
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      tips: [
        "Report safety concerns immediately, regardless of who's involved",
        "Present facts, not opinions or blame",
        "Suggest solutions where possible",
        "Use proper channels - escalate appropriately",
        "Document everything for follow-up"
      ],
      examples: [
        "I've noticed the temporary lighting cable has damaged insulation. Should we isolate it?",
        "The client is asking for changes that aren't on the drawings. How should I handle this?"
      ]
    },
    {
      title: "Progress Updates & Feedback",
      icon: Clock,
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      tips: [
        "Provide regular updates without being asked",
        "Be honest about delays or difficulties",
        "Highlight completed work and next steps",
        "Ask for feedback on your work quality",
        "Show initiative by suggesting improvements"
      ],
      examples: [
        "I've completed the first fix in rooms 1-3. Should I start on the second fix or move to room 4?",
        "The cable run took longer than expected due to unexpected steelwork. How can I plan better next time?"
      ]
    }
  ];

  const communicationChannels = [
    {
      method: "Face-to-Face",
      when: "Technical discussions, complex problems, feedback sessions",
      benefits: "Immediate clarification, visual demonstrations, builds relationships",
      tips: "Choose appropriate timing, come prepared, maintain eye contact"
    },
    {
      method: "Phone/Radio",
      when: "Urgent issues, quick questions, location coordination",
      benefits: "Immediate response, good for mobile work situations",
      tips: "Be clear and concise, confirm understanding, follow up in writing"
    },
    {
      method: "Written (Email/Text)",
      when: "Instructions, confirmations, documentation, formal requests",
      benefits: "Clear record, time to think, can include attachments",
      tips: "Be professional, use clear subject lines, include relevant details"
    },
    {
      method: "Digital Tools",
      when: "Progress tracking, photo documentation, collaborative planning",
      benefits: "Real-time updates, visual evidence, integrated workflows",
      tips: "Keep photos clear and relevant, use consistent naming, maintain security"
    }
  ];

  const difficultConversations = [
    {
      situation: "You made a mistake and need to tell your supervisor",
      approach: "Own it immediately, explain what happened, present your plan to fix it, ask for guidance",
      script: "I need to let you know about an issue. I accidentally damaged the cable while drilling. I've isolated the circuit and have ideas for repair, but wanted your guidance first."
    },
    {
      situation: "You're struggling with a task but don't want to appear incompetent",
      approach: "Frame it as seeking to improve, show what you've learned so far, ask for specific guidance",
      script: "I want to make sure I'm doing this correctly. I understand the basic principle, but I'd value your input on the best approach for this specific situation."
    },
    {
      situation: "You disagree with an instruction you've been given",
      approach: "Ask questions to understand the reasoning, express concerns respectfully, suggest alternatives carefully",
      script: "Could you help me understand the reasoning behind this approach? I had thought about doing it differently because..."
    },
    {
      situation: "You're being asked to do something you're not qualified for",
      approach: "Be honest about your limitations, suggest alternatives, prioritise safety",
      script: "I'm not confident I have the experience to do this safely on my own. Could we arrange for supervision or additional training?"
    }
  ];

  const professionalLanguage = [
    {
      category: "Making Requests",
      poor: "I need you to...",
      better: "Could you help me with...",
      best: "When you have a moment, could you guide me through..."
    },
    {
      category: "Expressing Uncertainty",
      poor: "I don't know",
      better: "I'm not sure about...",
      best: "I want to confirm my understanding of..."
    },
    {
      category: "Reporting Problems",
      poor: "This is broken",
      better: "There's an issue with...",
      best: "I've identified a problem with... and here's what I think might have caused it"
    },
    {
      category: "Asking for Clarification",
      poor: "What?",
      better: "Could you repeat that?",
      best: "Could you clarify the procedure for... I want to make sure I understand correctly"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Communication Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Master the art of professional communication with supervisors, colleagues, and clients. 
            Learn how to ask questions confidently, report issues effectively, and build strong working relationships.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {communicationStrategies.map((strategy, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <strategy.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle className="text-white">{strategy.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Key Strategies:</h4>
                  <ul className="space-y-1">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ThumbsUp className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Example Phrases:</h4>
                  <div className="space-y-2">
                    {strategy.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-elec-dark/40 rounded p-2">
                        <p className="text-xs text-elec-yellow font-mono">"{example}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Communication Channels & When to Use Them
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communicationChannels.map((channel, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{channel.method}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-blue-400 font-medium">When: </span>
                    <span className="text-blue-300">{channel.when}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">Benefits: </span>
                    <span className="text-blue-300">{channel.benefits}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">Tips: </span>
                    <span className="text-blue-300">{channel.tips}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Handling Difficult Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {difficultConversations.map((conversation, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{conversation.situation}</h4>
                <p className="text-sm text-orange-300 mb-3">
                  <strong>Approach:</strong> {conversation.approach}
                </p>
                <div className="bg-orange-500/10 rounded p-2">
                  <p className="text-xs text-orange-200">
                    <strong>Example script:</strong> "{conversation.script}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Professional Language Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {professionalLanguage.map((example, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">{example.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="text-center">
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-2">Avoid</Badge>
                    <p className="text-sm text-red-300">"{example.poor}"</p>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-2">Better</Badge>
                    <p className="text-sm text-yellow-300">"{example.better}"</p>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">Best</Badge>
                    <p className="text-sm text-green-300">"{example.best}"</p>
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
