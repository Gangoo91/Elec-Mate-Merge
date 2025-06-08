
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Phone, Mail, Users, AlertTriangle, CheckCircle } from "lucide-react";

const CommunicationGuideTab = () => {
  const communicationScenarios = [
    {
      situation: "Reporting a Safety Issue",
      approach: "Stop work immediately. Alert supervisor verbally first, then document in writing. Use clear, factual language.",
      example: "I've stopped work on the consumer unit installation because I've noticed exposed live cables that weren't isolated. Can you please come and assess the situation?",
      priority: "Critical"
    },
    {
      situation: "Asking for Help",
      approach: "Be specific about what you don't understand. Show what you've tried. Ask when convenient.",
      example: "When you have a moment, could you help me with cable sizing for this ring circuit? I've calculated 2.5mm² but want to confirm with you.",
      priority: "Important"
    },
    {
      situation: "Client Interaction",
      approach: "Be polite, professional, and explain work clearly. Avoid technical jargon unless requested.",
      example: "Good morning! I'm here to install your new consumer unit. This will take about 3-4 hours, and I'll need to turn off your electricity temporarily.",
      priority: "Essential"
    }
  ];

  const communicationChannels = [
    {
      channel: "Face-to-Face",
      bestFor: ["Safety issues", "Complex explanations", "Team briefings"],
      tips: ["Maintain eye contact", "Use clear body language", "Confirm understanding"]
    },
    {
      channel: "Radio/Walkie-Talkie",
      bestFor: ["Site coordination", "Quick updates", "Emergency communication"],
      tips: ["Keep messages brief", "Use proper call signs", "Wait for acknowledgment"]
    },
    {
      channel: "Written (Text/Email)",
      bestFor: ["Documentation", "Follow-up instructions", "Non-urgent queries"],
      tips: ["Be clear and concise", "Use proper spelling", "Include relevant details"]
    }
  ];

  const industryLanguage = [
    { term: "Isolate", meaning: "To disconnect electrical supply safely", usage: "Always isolate before starting work" },
    { term: "Dead", meaning: "No electrical current present", usage: "Test the circuit is dead before proceeding" },
    { term: "Live", meaning: "Electrical current is present", usage: "Never work on live circuits" },
    { term: "RCD", meaning: "Residual Current Device - safety protection", usage: "Check the RCD is functioning correctly" },
    { term: "CU", meaning: "Consumer Unit - main electrical panel", usage: "We need to upgrade the old CU" },
    { term: "Ring Final", meaning: "Ring circuit for socket outlets", usage: "Testing the ring final circuit for continuity" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Essential": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Important": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

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
            Master the art of professional communication in the electrical industry. From safety-critical conversations 
            to client interactions, learn how to communicate effectively in every situation.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios">Common Scenarios</TabsTrigger>
          <TabsTrigger value="channels">Communication Channels</TabsTrigger>
          <TabsTrigger value="language">Industry Language</TabsTrigger>
          <TabsTrigger value="etiquette">Professional Etiquette</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios">
          <div className="space-y-4">
            {communicationScenarios.map((scenario, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{scenario.situation}</CardTitle>
                    <Badge className={getPriorityColor(scenario.priority)} variant="outline">
                      {scenario.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Best Approach:
                      </h4>
                      <p className="text-sm text-muted-foreground">{scenario.approach}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-400 mb-2">Example:</h4>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <p className="text-sm text-green-200 italic">"{scenario.example}"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {communicationChannels.map((channel, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    {channel.channel === "Face-to-Face" && <Users className="h-5 w-5 text-elec-yellow" />}
                    {channel.channel === "Radio/Walkie-Talkie" && <Phone className="h-5 w-5 text-elec-yellow" />}
                    {channel.channel === "Written (Text/Email)" && <Mail className="h-5 w-5 text-elec-yellow" />}
                    {channel.channel}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-elec-yellow mb-2">Best for:</h4>
                      <ul className="space-y-1">
                        {channel.bestFor.map((use, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-400 mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {channel.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="language">
          <div className="space-y-4">
            <Card className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-300">Essential Electrical Industry Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Understanding and using proper electrical terminology demonstrates professionalism and ensures clear communication.
                </p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industryLanguage.map((item, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
                          {item.term}
                        </Badge>
                      </div>
                      <p className="text-sm text-white font-medium">{item.meaning}</p>
                      <div className="bg-elec-dark/40 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground italic">Example: "{item.usage}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="etiquette">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-500/20 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Do's - Professional Behaviour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Always greet colleagues and clients politely</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Listen actively and ask clarifying questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Respect site rules and hierarchy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Use "please" and "thank you" consistently</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Admit when you don't understand something</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/10">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Don'ts - Avoid These Behaviours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Don't use inappropriate language or jokes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Don't interrupt senior tradespeople</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Don't take criticism personally</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Don't gossip about colleagues or clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Don't use your phone excessively during work hours</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationGuideTab;
