
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, BookOpen, FileText, CheckSquare, Star, Play, Download, Lock } from "lucide-react";
import { useState } from "react";

const SafetyKnowledgeTab = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const knowledgeAreas = [
    {
      id: "regulations",
      title: "Electrical Safety Regulations",
      description: "Comprehensive guide to UK electrical safety regulations including Electricity at Work Regulations 1989",
      progress: 85,
      topics: ["Regulation Overview", "Duty of Care", "Competent Persons", "Safe Systems of Work"],
      difficulty: "Intermediate",
      duration: "45 mins",
      modules: 8,
      assessments: 3,
      practicalExercises: 5,
      certificate: true
    },
    {
      id: "ppe",
      title: "Personal Protective Equipment",
      description: "Essential knowledge about PPE selection, use, and maintenance in electrical work",
      progress: 92,
      topics: ["PPE Categories", "Voltage Ratings", "Inspection Requirements", "Storage and Care"],
      difficulty: "Beginner",
      duration: "30 mins",
      modules: 6,
      assessments: 2,
      practicalExercises: 4,
      certificate: true
    },
    {
      id: "isolation",
      title: "Safe Isolation Procedures",
      description: "Learn the critical 7-step safe isolation procedure for electrical work",
      progress: 78,
      topics: ["Identify", "Isolate", "Secure", "Test Dead", "Test Tester", "Issue Permit", "Begin Work"],
      difficulty: "Advanced",
      duration: "60 mins",
      modules: 10,
      assessments: 4,
      practicalExercises: 7,
      certificate: true
    },
    {
      id: "arc-flash",
      title: "Arc Flash Protection",
      description: "Understanding arc flash hazards and protection methods in electrical installations",
      progress: 45,
      topics: ["Arc Flash Basics", "Hazard Assessment", "PPE Selection", "Safe Working Distances"],
      difficulty: "Advanced",
      duration: "75 mins",
      modules: 12,
      assessments: 5,
      practicalExercises: 8,
      certificate: false
    },
    {
      id: "emergency-response",
      title: "Emergency Response Procedures",
      description: "Critical knowledge for responding to electrical emergencies and incidents",
      progress: 60,
      topics: ["Emergency Actions", "First Aid", "Incident Reporting", "Recovery Procedures"],
      difficulty: "Intermediate",
      duration: "50 mins",
      modules: 9,
      assessments: 3,
      practicalExercises: 6,
      certificate: true
    },
    {
      id: "hazard-identification",
      title: "Electrical Hazard Identification",
      description: "Develop skills to identify and assess electrical hazards in various environments",
      progress: 35,
      topics: ["Hazard Types", "Risk Assessment", "Control Measures", "Documentation"],
      difficulty: "Intermediate",
      duration: "55 mins",
      modules: 11,
      assessments: 4,
      practicalExercises: 9,
      certificate: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleStartModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    // Here you would typically navigate to the module content
    console.log(`Starting module: ${moduleId}`);
  };

  const handleCompleteModule = (moduleId: string) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
  };

  const isModuleCompleted = (moduleId: string) => completedModules.has(moduleId);

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Safety Knowledge Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Build your electrical safety knowledge with our comprehensive library of interactive learning modules. 
            Each module includes video content, interactive simulations, assessments, and practical exercises.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">{knowledgeAreas.length}</div>
              <div className="text-sm text-muted-foreground">Learning Modules</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{Math.round(knowledgeAreas.reduce((acc, area) => acc + area.progress, 0) / knowledgeAreas.length)}%</div>
              <div className="text-sm text-muted-foreground">Average Progress</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{completedModules.size}</div>
              <div className="text-sm text-muted-foreground">Completed Modules</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {knowledgeAreas.map((area, index) => (
          <Card key={area.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-2 flex items-center gap-2">
                    {area.title}
                    {isModuleCompleted(area.id) && (
                      <CheckSquare className="h-5 w-5 text-green-400" />
                    )}
                  </CardTitle>
                  <div className="flex gap-2 mb-3">
                    <Badge className={getDifficultyColor(area.difficulty)}>
                      {area.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {area.duration}
                    </Badge>
                    {area.certificate && (
                      <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        Certificate
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-elec-yellow">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">{area.progress}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {area.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Progress</span>
                    <span className="text-sm text-elec-yellow">{area.progress}%</span>
                  </div>
                  <Progress value={area.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-elec-dark/40 rounded">
                    <div className="text-elec-yellow font-semibold">{area.modules}</div>
                    <div className="text-xs text-muted-foreground">Modules</div>
                  </div>
                  <div className="p-2 bg-elec-dark/40 rounded">
                    <div className="text-blue-400 font-semibold">{area.assessments}</div>
                    <div className="text-xs text-muted-foreground">Assessments</div>
                  </div>
                  <div className="p-2 bg-elec-dark/40 rounded">
                    <div className="text-green-400 font-semibold">{area.practicalExercises}</div>
                    <div className="text-xs text-muted-foreground">Exercises</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-elec-yellow" />
                    Key Topics:
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {area.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-green-400" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1" 
                  onClick={() => handleStartModule(area.id)}
                  disabled={area.progress === 0}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {area.progress === 0 ? "Coming Soon" : area.progress === 100 ? "Review Module" : "Continue Learning"}
                </Button>
                {area.progress > 0 && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Learning Pathways & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">{knowledgeAreas.length}</div>
              <div className="text-sm text-muted-foreground">Knowledge Areas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">{Math.round(knowledgeAreas.reduce((acc, area) => acc + area.progress, 0) / knowledgeAreas.length)}%</div>
              <div className="text-sm text-muted-foreground">Average Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">{knowledgeAreas.reduce((acc, area) => acc + area.duration.split(' ')[0], 0) / 60}h</div>
              <div className="text-sm text-muted-foreground">Total Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">{knowledgeAreas.filter(area => area.certificate).length}</div>
              <div className="text-sm text-muted-foreground">Certificates Available</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyKnowledgeTab;
