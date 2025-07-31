import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Users, DollarSign, Handshake, Cog, Gift, Building2, Target, PoundSterling } from "lucide-react";

const BusinessModelCanvas = () => {
  const [canvasData, setCanvasData] = useState({
    keyPartners: "",
    keyActivities: "",
    keyResources: "",
    valuePropositions: "",
    customerRelationships: "",
    channels: "",
    customerSegments: "",
    costStructure: "",
    revenueStreams: ""
  });

  const updateSection = (section: string, value: string) => {
    setCanvasData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const canvasSections = [
    {
      key: "keyPartners",
      title: "Key Partners",
      icon: <Handshake className="h-4 w-4" />,
      prompt: "Who are your key suppliers, trade partners, and strategic alliances?",
      examples: ["Electrical wholesalers", "Trade counter suppliers", "Other contractors for referrals"]
    },
    {
      key: "keyActivities",
      title: "Key Activities",
      icon: <Cog className="h-4 w-4" />,
      prompt: "What key activities does your value proposition require?",
      examples: ["Electrical installations", "Testing & certification", "Emergency call-outs"]
    },
    {
      key: "keyResources",
      title: "Key Resources",
      icon: <Building2 className="h-4 w-4" />,
      prompt: "What key resources does your value proposition require?",
      examples: ["Qualified electricians", "Testing equipment", "Van and tools"]
    },
    {
      key: "valuePropositions",
      title: "Value Propositions",
      icon: <Gift className="h-4 w-4" />,
      prompt: "What value do you deliver to customers? What problems do you solve?",
      examples: ["Reliable emergency service", "High-quality workmanship", "Competitive pricing"]
    },
    {
      key: "customerRelationships",
      title: "Customer Relationships",
      icon: <Users className="h-4 w-4" />,
      prompt: "What type of relationship does each customer segment expect?",
      examples: ["Personal assistance", "Ongoing maintenance contracts", "Quick response times"]
    },
    {
      key: "channels",
      title: "Channels",
      icon: <Target className="h-4 w-4" />,
      prompt: "Through which channels do you reach your customers?",
      examples: ["Word of mouth", "Google ads", "Local directory listings"]
    },
    {
      key: "customerSegments",
      title: "Customer Segments",
      icon: <Users className="h-4 w-4" />,
      prompt: "For whom are you creating value? Who are your most important customers?",
      examples: ["Domestic homeowners", "Small businesses", "Property developers"]
    },
    {
      key: "costStructure",
      title: "Cost Structure",
      icon: <DollarSign className="h-4 w-4" />,
      prompt: "What are the most important costs in your business model?",
      examples: ["Vehicle costs", "Tool investments", "Insurance and certifications"]
    },
    {
      key: "revenueStreams",
      title: "Revenue Streams",
      icon: <PoundSterling className="h-4 w-4" />,
      prompt: "For what value are customers willing to pay?",
      examples: ["Installation work", "Testing certificates", "Emergency call-out fees"]
    }
  ];

  return (
    <Card className="border-purple-500/50 bg-purple-500/10">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          <Puzzle className="h-5 w-5" />
          Business Model Canvas
        </CardTitle>
        <p className="text-purple-200 text-sm">
          Map out your business model using this proven framework for electrical contractors
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {canvasSections.map((section) => (
            <Card key={section.key} className="bg-purple-500/20 border-purple-400/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-purple-200 flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
                <p className="text-xs text-purple-300">{section.prompt}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Textarea
                  value={canvasData[section.key as keyof typeof canvasData]}
                  onChange={(e) => updateSection(section.key, e.target.value)}
                  placeholder="Enter your ideas..."
                  className="bg-purple-500/30 border-purple-400/40 text-purple-100 h-20 text-xs"
                  rows={3}
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {section.examples.map((example, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-xs border-purple-400/40 text-purple-300 bg-purple-500/20"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessModelCanvas;