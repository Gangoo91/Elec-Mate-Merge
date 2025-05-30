
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Home,
  Building,
  Factory,
  Plug,
  Clock,
  CheckCircle,
  BookOpen,
  AlertTriangle
} from "lucide-react";

const ElectricalInstallationGuides = () => {
  const electricalInstallationGuides = [
    {
      title: "Domestic Installation Guide",
      description: "Complete guide for residential electrical installations including consumer units, circuits, and certification",
      icon: <Home className="h-5 w-5 text-elec-yellow" />,
      topics: ["Consumer Unit Installation", "Ring Main Circuits", "Lighting Circuits", "Electric Shower Installation"],
      difficulty: "Intermediate",
      estimatedTime: "2-3 hours read"
    },
    {
      title: "Commercial Installation Guide", 
      description: "Commercial electrical systems, three-phase supplies, and distribution boards",
      icon: <Building className="h-5 w-5 text-elec-yellow" />,
      topics: ["Three-Phase Systems", "Distribution Boards", "Fire Alarm Systems", "Emergency Lighting"],
      difficulty: "Advanced",
      estimatedTime: "3-4 hours read"
    },
    {
      title: "Industrial Installation Guide",
      description: "Heavy-duty electrical installations, motor control, and industrial safety systems",
      icon: <Factory className="h-5 w-5 text-elec-yellow" />,
      topics: ["Motor Control Centers", "High Voltage Systems", "Industrial Automation", "Safety Interlocks"],
      difficulty: "Expert",
      estimatedTime: "4-5 hours read"
    },
    {
      title: "Outdoor Installation Guide",
      description: "External electrical work including garden lighting, outbuildings, and weatherproof installations",
      icon: <Plug className="h-5 w-5 text-elec-yellow" />,
      topics: ["Garden Lighting", "Shed/Garage Supplies", "Electric Gates", "IP Rating Requirements"],
      difficulty: "Intermediate", 
      estimatedTime: "2 hours read"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-elec-yellow">Electrical Installation Guides</h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
          Step-by-step installation guides for different electrical environments. 
          Learn proper installation methods, safety procedures, and compliance requirements.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 via-elec-gray to-elec-dark/80">
        <CardHeader className="bg-elec-yellow/15 rounded-t-lg">
          <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-elec-yellow" />
            <div>
              <CardTitle className="text-elec-yellow text-2xl">Installation Guides by Environment</CardTitle>
              <p className="text-muted-foreground mt-1">Comprehensive guides for different types of electrical installations</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {electricalInstallationGuides.map((guide, index) => (
              <div key={index} className="bg-elec-dark/40 p-5 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    {guide.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-1">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className={`text-xs ${
                        guide.difficulty === 'Expert' ? 'border-red-500 text-red-400' :
                        guide.difficulty === 'Advanced' ? 'border-orange-500 text-orange-400' :
                        'border-green-500 text-green-400'
                      }`}>
                        {guide.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-elec-yellow mb-2">Key Topics Covered:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {guide.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="text-xs text-muted-foreground flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Installation Guide
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-400 mb-1">Important Safety Reminder</h4>
                <p className="text-sm text-muted-foreground">
                  All electrical installation work must comply with BS 7671 (18th Edition) and be carried out by competent persons. 
                  Some work requires notification to Building Control or certification by a registered electrician.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationGuides;
