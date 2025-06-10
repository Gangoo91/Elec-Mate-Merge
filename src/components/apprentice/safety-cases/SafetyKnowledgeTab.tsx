
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Clock, Users, Award, ChevronRight, 
  CheckCircle, AlertTriangle, Zap, Shield
} from "lucide-react";

const SafetyKnowledgeTab = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // Move knowledgeModules declaration to the top, before any usage
  const knowledgeModules = [
    {
      id: "electrical-hazards",
      title: "Electrical Hazards & Risk Assessment",
      description: "Understanding electrical dangers and how to assess risks in various environments",
      duration: "45 mins",
      difficulty: "Intermediate",
      topics: ["Shock hazards", "Arc flash", "Risk matrices", "PPE selection"],
      content: {
        overview: "Learn to identify and assess electrical hazards in workplace environments.",
        keyPoints: [
          "Different types of electrical hazards",
          "Risk assessment methodologies", 
          "Control measures hierarchy",
          "Personal protective equipment selection"
        ]
      }
    },
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      description: "Step-by-step procedures for safely isolating electrical systems",
      duration: "60 mins", 
      difficulty: "Advanced",
      topics: ["Isolation methods", "Lock-out procedures", "Testing", "Documentation"],
      content: {
        overview: "Master the critical procedures for safely isolating electrical systems.",
        keyPoints: [
          "Proper isolation sequence",
          "Lock-out/tag-out procedures",
          "Proving dead testing",
          "Documentation requirements"
        ]
      }
    },
    {
      id: "emergency-response",
      title: "Emergency Response & First Aid",
      description: "Essential emergency procedures for electrical incidents",
      duration: "30 mins",
      difficulty: "Beginner", 
      topics: ["Emergency contacts", "First aid", "Incident reporting", "Evacuation"],
      content: {
        overview: "Learn critical emergency response procedures for electrical incidents.",
        keyPoints: [
          "Emergency contact procedures",
          "Basic first aid for electrical injuries",
          "Incident reporting requirements",
          "Emergency evacuation procedures"
        ]
      }
    },
    {
      id: "regulations-compliance",
      title: "Regulations & Compliance",
      description: "Key electrical safety regulations and compliance requirements",
      duration: "50 mins",
      difficulty: "Intermediate",
      topics: ["BS 7671", "CDM Regulations", "HASAWA", "Inspection requirements"],
      content: {
        overview: "Understand the regulatory framework governing electrical safety.",
        keyPoints: [
          "BS 7671 wiring regulations",
          "Construction Design and Management regulations",
          "Health and Safety at Work Act",
          "Inspection and testing requirements"
        ]
      }
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/30";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const calculateProgress = () => {
    return Math.round((completedModules.length / knowledgeModules.length) * 100);
  };

  const markModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  if (selectedModule) {
    const module = knowledgeModules.find(m => m.id === selectedModule);
    if (!module) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setSelectedModule(null)}
            className="border-elec-yellow/30"
          >
            ← Back to Modules
          </Button>
          <h3 className="text-xl font-semibold text-elec-yellow">{module.title}</h3>
        </div>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg mb-2">{module.title}</CardTitle>
                <p className="text-muted-foreground">{module.content.overview}</p>
              </div>
              <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                {module.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm">{module.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm">{module.topics.length} topics covered</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Key Learning Points:</h4>
                <ul className="space-y-2">
                  {module.content.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="bg-elec-dark/50 border-elec-yellow/20">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
                  onClick={() => markModuleComplete(module.id)}
                  disabled={completedModules.includes(module.id)}
                >
                  {completedModules.includes(module.id) ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Module
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-elec-yellow/30">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Download Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Safety Knowledge Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {completedModules.length} of {knowledgeModules.length} modules completed
              </span>
              <span className="text-sm font-medium text-green-400">
                {calculateProgress()}%
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {knowledgeModules.map((module) => (
          <Card 
            key={module.id}
            className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all cursor-pointer"
            onClick={() => setSelectedModule(module.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 flex items-center gap-2">
                    {completedModules.includes(module.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-elec-yellow" />
                    )}
                    {module.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {module.duration}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {module.topics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-elec-dark/50 border-elec-yellow/10">
                      {topic}
                    </Badge>
                  ))}
                  {module.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-elec-dark/50 border-elec-yellow/10">
                      +{module.topics.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Safety Tips */}
      <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Safety Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-400 mb-1">Always Assume Live</h4>
                <p className="text-sm text-muted-foreground">
                  Treat all electrical circuits as live until proven dead through proper testing
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-400 mb-1">PPE is Essential</h4>
                <p className="text-sm text-muted-foreground">
                  Always wear appropriate personal protective equipment for the task at hand
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyKnowledgeTab;
