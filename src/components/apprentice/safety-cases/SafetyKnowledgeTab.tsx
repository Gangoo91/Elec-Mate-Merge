import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Target,
  Brain,
  Shield,
  AlertTriangle,
  Play,
  Users,
  FileText,
  Lightbulb,
  TrendingUp
} from "lucide-react";

interface SafetyTopicSection {
  title: string;
  content: {
    subtitle: string;
    text: string;
    keyPoints?: string[];
  }[];
}

interface SafetyTopic {
  id: string;
  title: string;
  description: string;
  progress: number;
  difficulty: string;
  estimatedTime: string;
  sections: SafetyTopicSection[];
}

interface KnowledgeModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  topics: string[];
  difficulty: string;
  duration: string;
  modules: number;
  assessments: number;
  practicalExercises: number;
  certificate: boolean;
}

const SafetyKnowledgeTab = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const overallProgress = knowledgeModules.reduce((acc: number, module) => acc + module.progress, 0) / knowledgeModules.length;

  const handleStartModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSelectedTopic(null);
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/30";
      default: return "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30";
    }
  };

  // Mock data for knowledge modules
  const knowledgeModules: KnowledgeModule[] = [
    {
      id: "electrical-hazards",
      title: "Electrical Hazards & Risk Management",
      description: "Comprehensive guide to identifying and managing electrical hazards in the workplace",
      progress: 75,
      topics: ["electrical-shock", "arc-flash", "electrical-burns"],
      difficulty: "Intermediate",
      duration: "2 hours",
      modules: 4,
      assessments: 2,
      practicalExercises: 3,
      certificate: true
    },
    {
      id: "isolation-procedures",
      title: "Safe Isolation Procedures",
      description: "Step-by-step procedures for safely isolating electrical systems",
      progress: 60,
      topics: ["isolation-steps", "proving-dead", "permit-to-work"],
      difficulty: "Advanced",
      duration: "3 hours",
      modules: 5,
      assessments: 3,
      practicalExercises: 4,
      certificate: true
    },
    {
      id: "ppe-equipment",
      title: "Personal Protective Equipment",
      description: "Selection, use and maintenance of electrical PPE",
      progress: 90,
      topics: ["ppe-selection", "inspection-testing", "maintenance"],
      difficulty: "Beginner",
      duration: "1.5 hours",
      modules: 3,
      assessments: 1,
      practicalExercises: 2,
      certificate: false
    },
    {
      id: "emergency-procedures",
      title: "Emergency Response Procedures",
      description: "Response procedures for electrical emergencies and accidents",
      progress: 45,
      topics: ["emergency-response", "first-aid", "incident-reporting"],
      difficulty: "Intermediate",
      duration: "2.5 hours",
      modules: 4,
      assessments: 2,
      practicalExercises: 3,
      certificate: true
    },
    {
      id: "regulations-compliance",
      title: "Regulations & Compliance",
      description: "Understanding electrical safety regulations and compliance requirements",
      progress: 30,
      topics: ["bs7671-safety", "health-safety-law", "building-regulations"],
      difficulty: "Advanced",
      duration: "4 hours",
      modules: 6,
      assessments: 4,
      practicalExercises: 2,
      certificate: true
    },
    {
      id: "tool-equipment-safety",
      title: "Tool & Equipment Safety",
      description: "Safe use and maintenance of electrical tools and equipment",
      progress: 85,
      topics: ["tool-inspection", "equipment-maintenance", "safety-features"],
      difficulty: "Beginner",
      duration: "1 hour",
      modules: 3,
      assessments: 1,
      practicalExercises: 4,
      certificate: false
    }
  ];

  // Mock data for safety topics
  const safetyTopics: SafetyTopic[] = [
    {
      id: "electrical-shock",
      title: "Electrical Shock Prevention",
      description: "Understanding and preventing electrical shock incidents",
      progress: 80,
      difficulty: "Intermediate",
      estimatedTime: "45 mins",
      sections: [
        {
          title: "Understanding Electrical Shock",
          content: [
            {
              subtitle: "What is Electrical Shock?",
              text: "Electrical shock occurs when the human body becomes part of an electrical circuit, allowing current to flow through it. The severity depends on current magnitude, path through the body, and duration of contact.",
              keyPoints: [
                "Current as low as 1mA can be felt",
                "10-20mA can cause muscular control loss",
                "50mA can cause cardiac arrest",
                "Path through heart is most dangerous"
              ]
            },
            {
              subtitle: "Physiological Effects",
              text: "The human body's response to electrical current varies with magnitude and frequency. Understanding these effects helps in prevention and emergency response.",
              keyPoints: [
                "Sensation threshold: 0.5-2mA",
                "Let-go threshold: 5-10mA",
                "Respiratory paralysis: 20-50mA",
                "Ventricular fibrillation: 50-100mA"
              ]
            }
          ]
        },
        {
          title: "Prevention Strategies",
          content: [
            {
              subtitle: "Primary Prevention",
              text: "The most effective approach is eliminating exposure to live conductors through proper design, installation, and maintenance practices.",
              keyPoints: [
                "Proper earthing and bonding",
                "RCD protection",
                "Insulation and barriers",
                "Safe working distances"
              ]
            },
            {
              subtitle: "Personal Protection",
              text: "When working on or near electrical equipment, personal protective measures provide additional safety layers.",
              keyPoints: [
                "Insulated tools and equipment",
                "Appropriate PPE selection",
                "Voltage-rated gloves",
                "Arc-rated clothing"
              ]
            }
          ]
        }
      ]
    },
    // Add more topics as needed...
    {
      id: "arc-flash",
      title: "Arc Flash Protection",
      description: "Understanding and protecting against arc flash incidents",
      progress: 65,
      difficulty: "Advanced",
      estimatedTime: "60 mins",
      sections: [
        {
          title: "Arc Flash Fundamentals",
          content: [
            {
              subtitle: "What is Arc Flash?",
              text: "Arc flash is a type of electrical explosion that results from low-impedance connections to ground or another voltage phase in an electrical system.",
              keyPoints: [
                "Temperatures can reach 35,000°F",
                "Massive pressure waves created",
                "Intense light and radiation",
                "Molten metal ejection"
              ]
            }
          ]
        }
      ]
    }
  ];

  if (selectedModule && selectedTopic) {
    const module = knowledgeModules.find(m => m.id === selectedModule);
    const topic = safetyTopics.find(t => t.id === selectedTopic);

    if (module && topic) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedTopic(null)}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              ← Back to {module.title}
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-elec-yellow">{topic.title}</h2>
              <p className="text-muted-foreground">{topic.description}</p>
            </div>
          </div>

          {/* Topic Content */}
          <div className="grid gap-6">
            {topic.sections.map((section, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray/30">
                <CardHeader>
                  <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.content.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-medium text-white">{item.subtitle}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                        {item.keyPoints && (
                          <ul className="space-y-1 mt-3">
                            {item.keyPoints.map((point, pointIdx) => (
                              <li key={pointIdx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Interactive Elements */}
            <Card className="border-elec-yellow/20 bg-elec-gray/30">
              <CardHeader>
                <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Knowledge Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Test your understanding of {topic.title} concepts.
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                    <Button variant="outline" className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Summary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }

  if (selectedModule) {
    const module = knowledgeModules.find(m => m.id === selectedModule);
    if (module) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedModule(null)}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              ← Back to Overview
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-elec-yellow">{module.title}</h2>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          </div>

          {/* Module Progress */}
          <Card className="border-elec-yellow/20 bg-elec-gray/30">
            <CardHeader>
              <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Module Completion</span>
                  <span className="text-elec-yellow font-medium">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-elec-yellow">{module.modules}</p>
                    <p className="text-xs text-muted-foreground">Modules</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-elec-yellow">{module.assessments}</p>
                    <p className="text-xs text-muted-foreground">Assessments</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-elec-yellow">{module.practicalExercises}</p>
                    <p className="text-xs text-muted-foreground">Exercises</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {safetyTopics
              .filter(topic => module.topics.includes(topic.id))
              .map((topic) => (
                <Card 
                  key={topic.id} 
                  className="border-elec-yellow/20 bg-elec-gray/30 hover:bg-elec-gray/50 cursor-pointer transition-colors"
                  onClick={() => handleSelectTopic(topic.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-white">{topic.title}</CardTitle>
                      <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-elec-yellow font-medium">{topic.progress}%</span>
                      </div>
                      <Progress value={topic.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-elec-yellow" />
                          <span className="text-muted-foreground">{topic.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-elec-yellow" />
                          <span className="text-muted-foreground">{topic.sections.length} sections</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Safety Knowledge Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-elec-yellow">{Math.round(overallProgress)}%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-elec-yellow">{knowledgeModules.length}</p>
              <p className="text-sm text-muted-foreground">Knowledge Modules</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-elec-yellow">{safetyTopics.length}</p>
              <p className="text-sm text-muted-foreground">Safety Topics</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {knowledgeModules.map((module) => (
          <Card 
            key={module.id} 
            className="border-elec-yellow/20 bg-elec-gray/30 hover:bg-elec-gray/50 cursor-pointer transition-colors"
            onClick={() => handleStartModule(module.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-white">{module.title}</CardTitle>
                <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-elec-yellow font-medium">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-elec-yellow" />
                    <span className="text-muted-foreground">{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-elec-yellow" />
                    <span className="text-muted-foreground">{module.topics.length} topics</span>
                  </div>
                </div>
                {module.certificate && (
                  <div className="flex items-center gap-1 text-xs">
                    <Award className="h-3 w-3 text-amber-400" aria-label="Certificate available" />
                    <span className="text-amber-400">Certificate Available</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Safety Topics */}
      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Access Safety Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {safetyTopics.slice(0, 6).map((topic) => (
              <Button
                key={topic.id}
                variant="outline"
                className="justify-start border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 h-auto p-3"
                onClick={() => {
                  const module = knowledgeModules.find(m => m.topics.includes(topic.id));
                  if (module) {
                    setSelectedModule(module.id);
                    setSelectedTopic(topic.id);
                  }
                }}
              >
                <div className="text-left">
                  <p className="font-medium">{topic.title}</p>
                  <p className="text-xs text-muted-foreground">{topic.estimatedTime}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Mock data for knowledge modules


// Mock data for safety topics


export default SafetyKnowledgeTab;
