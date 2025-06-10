
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Brain, Search, BookOpen, Clock, Users, Award, 
  PlayCircle, CheckCircle, Target, TrendingUp,
  Shield, Zap, AlertTriangle, FileText
} from "lucide-react";

const SafetyKnowledgeTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const safetyModules = [
    {
      id: "electrical-safety",
      title: "Electrical Safety Fundamentals",
      description: "Core principles of electrical safety including shock prevention, safe working practices, and emergency procedures",
      progress: 85,
      topics: ["Shock Prevention", "Safe Isolation", "PPE Requirements", "Emergency Response"],
      difficulty: "Beginner",
      duration: "45 minutes",
      modules: 6,
      assessments: 3,
      practicalExercises: 8,
      certificate: true
    },
    {
      id: "hazard-identification",
      title: "Hazard Identification & Risk Assessment",
      description: "Learn to identify workplace hazards and conduct comprehensive risk assessments for electrical work",
      progress: 72,
      topics: ["Risk Matrix", "Hazard Types", "Control Measures", "Documentation"],
      difficulty: "Intermediate",
      duration: "60 minutes",
      modules: 8,
      assessments: 4,
      practicalExercises: 12,
      certificate: true
    },
    {
      id: "ppe-selection",
      title: "Personal Protective Equipment",
      description: "Comprehensive guide to selecting, using, and maintaining electrical safety PPE",
      progress: 90,
      topics: ["Insulating Gloves", "Arc Flash Protection", "Eye Protection", "Footwear"],
      difficulty: "Beginner",
      duration: "35 minutes",
      modules: 5,
      assessments: 2,
      practicalExercises: 6,
      certificate: false
    },
    {
      id: "emergency-procedures",
      title: "Emergency Response Procedures",
      description: "Critical emergency response procedures for electrical incidents and accidents",
      progress: 65,
      topics: ["Rescue Procedures", "First Aid", "Incident Reporting", "Evacuation"],
      difficulty: "Advanced",
      duration: "75 minutes",
      modules: 10,
      assessments: 5,
      practicalExercises: 15,
      certificate: true
    },
    {
      id: "regulations-compliance",
      title: "UK Electrical Regulations",
      description: "Understanding UK electrical safety regulations including BS 7671, CDM, and workplace safety laws",
      progress: 55,
      topics: ["BS 7671", "CDM Regulations", "HASAWA", "Inspection Requirements"],
      difficulty: "Advanced",
      duration: "90 minutes",
      modules: 12,
      assessments: 6,
      practicalExercises: 10,
      certificate: true
    },
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      description: "Step-by-step safe isolation procedures for electrical systems and equipment",
      progress: 80,
      topics: ["Isolation Process", "Lock Out Tag Out", "Testing", "Verification"],
      difficulty: "Intermediate",
      duration: "50 minutes",
      modules: 7,
      assessments: 3,
      practicalExercises: 9,
      certificate: true
    }
  ];

  const categories = [
    { id: "all", label: "All Modules", count: safetyModules.length },
    { id: "beginner", label: "Beginner", count: safetyModules.filter(m => m.difficulty === "Beginner").length },
    { id: "intermediate", label: "Intermediate", count: safetyModules.filter(m => m.difficulty === "Intermediate").length },
    { id: "advanced", label: "Advanced", count: safetyModules.filter(m => m.difficulty === "Advanced").length }
  ];

  const filteredModules = safetyModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           module.difficulty.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const overallProgress = Math.round(
    safetyModules.reduce((sum, module) => sum + module.progress, 0) / safetyModules.length
  );

  const completedModules = safetyModules.filter(module => module.progress >= 100).length;
  const inProgressModules = safetyModules.filter(module => module.progress > 0 && module.progress < 100).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/30";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-400";
    if (progress >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (selectedModule) {
    const module = safetyModules.find(m => m.id === selectedModule);
    if (!module) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedModule(null)}
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            ← Back to Modules
          </Button>
          <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
            {module.difficulty}
          </Badge>
        </div>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                <p className="text-muted-foreground mb-4">{module.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {module.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {module.modules} modules
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {module.assessments} assessments
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="mb-2">
                  <span className={`text-2xl font-bold ${getProgressColor(module.progress)}`}>
                    {module.progress}%
                  </span>
                </div>
                <Progress value={module.progress} className="w-32" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-elec-yellow" />
                  Learning Objectives
                </h4>
                <div className="grid gap-2">
                  {module.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-elec-dark/30 rounded">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-elec-dark/30 rounded-lg text-center">
                  <BookOpen className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold">{module.modules}</div>
                  <div className="text-sm text-muted-foreground">Learning Modules</div>
                </div>
                
                <div className="p-4 bg-elec-dark/30 rounded-lg text-center">
                  <Target className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold">{module.practicalExercises}</div>
                  <div className="text-sm text-muted-foreground">Practical Exercises</div>
                </div>
                
                <div className="p-4 bg-elec-dark/30 rounded-lg text-center">
                  <Award className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold">{module.assessments}</div>
                  <div className="text-sm text-muted-foreground">Assessments</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  {module.progress > 0 ? "Continue Learning" : "Start Module"}
                </Button>
                {module.certificate && (
                  <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
                    <Award className="mr-2 h-4 w-4" />
                    Certificate
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-elec-yellow" />
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{overallProgress}%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-green-600/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">{completedModules}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-blue-400">{inProgressModules}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-orange-600/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-orange-400" />
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {safetyModules.filter(m => m.certificate).length}
                </div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search safety modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-elec-yellow/20 bg-elec-dark"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-elec-yellow text-elec-dark"
                      : "border-elec-yellow/30 hover:bg-elec-yellow/10"
                  }
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((module) => (
          <Card 
            key={module.id} 
            className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all cursor-pointer"
            onClick={() => setSelectedModule(module.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight mb-2">{module.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>
                </div>
                <Badge variant="outline" className={`ml-2 ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className={`text-sm font-medium ${getProgressColor(module.progress)}`}>
                      {module.progress}%
                    </span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>

                {/* Module Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-elec-dark/30 rounded">
                    <div className="text-sm font-medium">{module.modules}</div>
                    <div className="text-xs text-muted-foreground">Modules</div>
                  </div>
                  <div className="p-2 bg-elec-dark/30 rounded">
                    <div className="text-sm font-medium">{module.practicalExercises}</div>
                    <div className="text-xs text-muted-foreground">Exercises</div>
                  </div>
                  <div className="p-2 bg-elec-dark/30 rounded">
                    <div className="text-sm font-medium">{module.assessments}</div>
                    <div className="text-xs text-muted-foreground">Tests</div>
                  </div>
                </div>

                {/* Topics Preview */}
                <div>
                  <div className="text-sm font-medium mb-2">Key Topics:</div>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.slice(0, 3).map((topic, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-elec-dark/60 px-2 py-1 rounded border border-elec-yellow/10"
                      >
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{module.topics.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {module.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    {module.certificate && (
                      <Award className="h-4 w-4 text-yellow-400" title="Certificate Available" />
                    )}
                    <Button size="sm" className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
                      {module.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No modules found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SafetyKnowledgeTab;
