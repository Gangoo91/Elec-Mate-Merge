
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Zap, HardHat, AlertTriangle, FileText, ExternalLink } from "lucide-react";
import { useState } from "react";

const SafetyKnowledgeTab = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const knowledgeTopics = [
    {
      id: "electrical-hazards",
      title: "Electrical Hazards Recognition",
      icon: Zap,
      level: "Essential",
      description: "Understanding and identifying common electrical hazards in workplace environments.",
      keyPoints: [
        "Live conductor exposure and contact risks",
        "Arc flash and arc blast hazards",
        "Electrical fire causes and prevention",
        "Shock and electrocution scenarios",
        "Secondary hazards (falls, burns, explosions)"
      ],
      regulations: ["Electricity at Work Regulations 1989", "BS 7671:2018", "HSE Guidance HSR25"],
      practicalTips: [
        "Always assume cables are live until proven dead",
        "Maintain safe working distances from live equipment",
        "Use appropriate PPE for the voltage level",
        "Follow the safe isolation procedure religiously"
      ]
    },
    {
      id: "ppe-selection",
      title: "PPE Selection & Usage",
      icon: HardHat,
      level: "Essential",
      description: "Proper selection, use, and maintenance of personal protective equipment for electrical work.",
      keyPoints: [
        "Voltage-rated insulated gloves and tools",
        "Arc flash protective clothing requirements",
        "Eye and face protection standards",
        "Respiratory protection in confined spaces",
        "Fall protection systems for elevated work"
      ],
      regulations: ["PPE Regulations 2002", "BS EN 60895", "BS EN 61482", "Construction Regs 2007"],
      practicalTips: [
        "Check PPE condition before each use",
        "Ensure arc rating matches calculated incident energy",
        "Replace damaged PPE immediately",
        "Store PPE properly to maintain integrity"
      ]
    },
    {
      id: "isolation-procedures",
      title: "Safe Isolation Procedures",
      icon: Shield,
      level: "Critical",
      description: "Comprehensive isolation procedures to ensure electrical safety during maintenance work.",
      keyPoints: [
        "7-step safe isolation procedure",
        "Proving dead testing requirements",
        "Lock-off and tag-out systems",
        "Permit to work procedures",
        "Re-energisation protocols"
      ],
      regulations: ["Electricity at Work Regulations 1989", "BS 7671:2018 Section 462", "HSE GS38"],
      practicalTips: [
        "Test your tester before and after use",
        "Use unique locks - never share keys",
        "Verify isolation at point of work",
        "Communicate clearly with all team members"
      ]
    },
    {
      id: "emergency-response",
      title: "Emergency Response Procedures",
      icon: AlertTriangle,
      level: "Critical",
      description: "Immediate response procedures for electrical emergencies and accidents.",
      keyPoints: [
        "Electric shock first aid procedures",
        "Fire suppression for electrical fires",
        "Evacuation procedures for electrical incidents",
        "Emergency contact protocols",
        "Incident reporting requirements"
      ],
      regulations: ["First Aid at Work Regulations", "RIDDOR 2013", "Emergency Procedures BS 5499"],
      practicalTips: [
        "Never touch someone being electrocuted",
        "Switch off power source immediately if safe",
        "Call emergency services without delay",
        "Preserve the scene for investigation"
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Essential": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Advanced": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Comprehensive Safety Knowledge Base</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Access detailed safety knowledge covering all aspects of electrical work safety. 
            Each topic includes practical guidance, regulatory requirements, and real-world application tips.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {knowledgeTopics.filter(t => t.level === "Critical").length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {knowledgeTopics.filter(t => t.level === "Essential").length}
              </div>
              <div className="text-sm text-muted-foreground">Essential Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">
                {knowledgeTopics.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Topics</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {knowledgeTopics.map((topic) => (
          <Card key={topic.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <topic.icon className="h-6 w-6 text-elec-yellow" />
                  <div>
                    <CardTitle className="text-white">{topic.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                  </div>
                </div>
                <Badge className={getLevelColor(topic.level)}>
                  {topic.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                className="w-full mb-4"
              >
                {expandedTopic === topic.id ? "Hide Details" : "View Details"}
              </Button>

              {expandedTopic === topic.id && (
                <div className="space-y-6 border-t border-elec-yellow/20 pt-4">
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-elec-yellow" />
                      Key Learning Points
                    </h4>
                    <ul className="space-y-2">
                      {topic.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      Relevant Regulations & Standards
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.regulations.map((reg, index) => (
                        <Badge key={index} variant="outline" className="text-blue-400 border-blue-400/30">
                          {reg}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <HardHat className="h-4 w-4 text-green-400" />
                      Practical Tips
                    </h4>
                    <ul className="space-y-2">
                      {topic.practicalTips.map((tip, index) => (
                        <li key={index} className="text-sm text-green-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Full Guide
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Knowledge Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This knowledge base is designed to complement hands-on training and real-world experience. 
            Regular review of these topics will help reinforce safe working practices and ensure compliance with current regulations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Study Recommendations</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Review critical topics weekly</li>
                <li>• Practice procedures regularly</li>
                <li>• Stay updated with regulation changes</li>
                <li>• Discuss scenarios with colleagues</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Application Tips</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Apply knowledge immediately on site</li>
                <li>• Ask questions when uncertain</li>
                <li>• Share learnings with team members</li>
                <li>• Document lessons learned</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyKnowledgeTab;
