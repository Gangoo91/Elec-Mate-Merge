
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, BookOpen, AlertCircle, Zap, Shield } from "lucide-react";

const RegulationsReference = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const regulations = [
    {
      section: "Part 1",
      title: "Scope, Object and Fundamental Principles",
      description: "Basic requirements and fundamental principles for electrical installations",
      keyPoints: ["Scope of BS 7671", "Protection against electric shock", "Protection against thermal effects"],
      reference: "BS 7671:2018+A2:2022"
    },
    {
      section: "Part 2", 
      title: "Definitions",
      description: "Technical definitions used throughout the regulations",
      keyPoints: ["Circuit definitions", "Equipment classifications", "Installation types"],
      reference: "BS 7671:2018+A2:2022"
    },
    {
      section: "Part 4",
      title: "Protection for Safety", 
      description: "Requirements for protection against electric shock and thermal effects",
      keyPoints: ["Basic protection", "Fault protection", "Additional protection"],
      reference: "BS 7671:2018+A2:2022"
    },
    {
      section: "Part 5",
      title: "Selection and Erection of Equipment",
      description: "Requirements for selecting and installing electrical equipment",
      keyPoints: ["Cable selection", "Switchgear requirements", "Earthing arrangements"],
      reference: "BS 7671:2018+A2:2022"
    },
    {
      section: "Part 6",
      title: "Inspection and Testing",
      description: "Requirements for initial verification and periodic inspection",
      keyPoints: ["Visual inspection", "Testing procedures", "Certification requirements"],
      reference: "BS 7671:2018+A2:2022"
    },
    {
      section: "Part 7",
      title: "Special Installations or Locations",
      description: "Additional requirements for specific locations",
      keyPoints: ["Bathrooms", "Swimming pools", "Agricultural locations", "Caravan parks"],
      reference: "BS 7671:2018+A2:2022"
    }
  ];

  const quickReference = [
    {
      topic: "Maximum Zs Values",
      description: "Maximum earth fault loop impedance values for different protective devices",
      icon: <Zap className="h-5 w-5 text-elec-yellow" />
    },
    {
      topic: "Cable Current Ratings",
      description: "Current-carrying capacity tables for different cable types",
      icon: <BookOpen className="h-5 w-5 text-elec-yellow" />
    },
    {
      topic: "Voltage Drop Limits",
      description: "Maximum permissible voltage drop for lighting and power circuits",
      icon: <AlertCircle className="h-5 w-5 text-elec-yellow" />
    },
    {
      topic: "IP Ratings",
      description: "Ingress protection ratings for electrical equipment",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />
    }
  ];

  const filteredRegulations = regulations.filter(reg =>
    reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">BS 7671 Regulations Quick Reference</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Quick access to key sections of BS 7671:2018+A2:2022 (18th Edition) wiring regulations
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search regulations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickReference.map((item, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {item.icon}
                <CardTitle className="text-sm">{item.topic}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRegulations.map((regulation, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                  {regulation.section}
                </Badge>
                <span className="text-xs text-muted-foreground">{regulation.reference}</span>
              </div>
              <CardTitle className="text-xl text-elec-yellow">{regulation.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{regulation.description}</p>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-white mb-2">Key Points:</h4>
              <ul className="space-y-1">
                {regulation.keyPoints.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Important Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            This is a quick reference guide only. Always consult the full BS 7671:2018+A2:2022 regulations 
            and relevant guidance notes for complete requirements. Ensure you have the latest version of the 
            regulations as they are updated periodically.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulationsReference;
