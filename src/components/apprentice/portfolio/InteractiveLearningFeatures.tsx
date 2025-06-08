
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Target, Trophy, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import LearningModuleContent from "./LearningModuleContent";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  lessons: Array<{
    id: string;
    title: string;
    content: string;
    type: "text" | "video" | "interactive";
    duration: number;
  }>;
  completedLessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  badge: string;
}

const InteractiveLearningFeatures = () => {
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  
  const learningModules: LearningModule[] = [
    {
      id: "photo-masterclass",
      title: "Photography Masterclass",
      description: "Learn professional photography techniques for electrical work documentation",
      duration: "45 mins",
      progress: 75,
      lessons: [
        {
          id: "lighting-basics",
          title: "Lighting Fundamentals",
          content: "Understanding natural and artificial lighting for electrical work photography. Learn how to use work lights effectively and position yourself for optimal lighting conditions.",
          type: "text",
          duration: 8
        },
        {
          id: "composition-techniques",
          title: "Composition Techniques",
          content: "Master the art of framing your electrical work to show context, detail, and professionalism. Learn about angles, perspective, and background considerations.",
          type: "video",
          duration: 12
        },
        {
          id: "safety-considerations",
          title: "Safety While Photographing",
          content: "Essential safety protocols when documenting live electrical work. Understanding when and how to safely capture your work without compromising safety.",
          type: "text",
          duration: 10
        }
      ],
      completedLessons: 6,
      difficulty: "Beginner",
      badge: "Photography Pro"
    },
    {
      id: "reflection-writing",
      title: "Reflective Writing Workshop",
      description: "Master the art of reflective writing for effective learning documentation",
      duration: "60 mins",
      progress: 40,
      lessons: [
        {
          id: "reflection-structure",
          title: "Structure of Reflection",
          content: "Learn the STAR method (Situation, Task, Action, Result) for structuring your reflective entries. Understand how to link theory to practice effectively.",
          type: "text",
          duration: 15
        },
        {
          id: "critical-analysis",
          title: "Critical Analysis Skills",
          content: "Develop skills to critically analyse your work, identify learning points, and articulate areas for improvement.",
          type: "interactive",
          duration: 20
        }
      ],
      completedLessons: 4,
      difficulty: "Intermediate",
      badge: "Reflection Master"
    },
    {
      id: "digital-organisation",
      title: "Digital Organisation Skills",
      description: "Organise and structure your digital portfolio for maximum impact",
      duration: "30 mins",
      progress: 100,
      lessons: [
        {
          id: "file-naming",
          title: "File Naming Conventions",
          content: "Establish consistent naming conventions for your portfolio files. Learn best practices for organising photos, documents, and evidence.",
          type: "text",
          duration: 10
        },
        {
          id: "folder-structure",
          title: "Folder Structure Best Practices",
          content: "Create a logical folder structure that grows with your apprenticeship. Understand how to organise by date, project, or competency.",
          type: "interactive",
          duration: 15
        }
      ],
      completedLessons: 6,
      difficulty: "Beginner",
      badge: "Organisation Expert"
    },
    {
      id: "assessment-preparation",
      title: "Assessment Preparation",
      description: "Prepare your portfolio for end-point assessment and professional review",
      duration: "90 mins",
      progress: 20,
      lessons: [
        {
          id: "epa-requirements",
          title: "EPA Requirements Overview",
          content: "Understand the specific requirements for end-point assessment portfolios. Learn what assessors are looking for and how to structure your evidence.",
          type: "video",
          duration: 25
        },
        {
          id: "evidence-mapping",
          title: "Evidence Mapping",
          content: "Map your portfolio evidence to specific assessment criteria. Learn to cross-reference your work with competency frameworks.",
          type: "interactive",
          duration: 30
        }
      ],
      completedLessons: 2,
      difficulty: "Advanced",
      badge: "Assessment Ready"
    }
  ];

  const challenges = [
    {
      title: "30-Day Portfolio Challenge",
      description: "Document one piece of work every day for 30 days",
      progress: 12,
      total: 30,
      reward: "Portfolio Warrior Badge"
    },
    {
      title: "Quality Improvement Sprint",
      description: "Improve your portfolio quality score by 20 points",
      progress: 15,
      total: 20,
      reward: "Quality Champion Badge"
    },
    {
      title: "Reflection Master",
      description: "Write 10 detailed reflective entries",
      progress: 7,
      total: 10,
      reward: "Reflection Expert Badge"
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

  const handleModuleProgress = (moduleId: string, lessonIndex: number) => {
    // Update module progress logic here
    console.log(`Module ${moduleId} progress: lesson ${lessonIndex}`);
  };

  if (activeModule) {
    return (
      <LearningModuleContent
        module={activeModule}
        onProgress={handleModuleProgress}
        onClose={() => setActiveModule(null)}
      />
    );
  }

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
      <CardHeader>
        <CardTitle className="text-cyan-400">Interactive Learning Modules</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enhance your portfolio skills through interactive learning experiences and challenges
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Learning Modules */}
          <div>
            <h4 className="font-medium text-white mb-4">Skill Development Modules</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningModules.map((module) => (
                <div key={module.id} className="p-4 bg-elec-gray/50 rounded-lg border border-cyan-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-white">{module.title}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                    </div>
                    <Badge className={`text-xs ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {module.completedLessons}/{module.lessons.length} lessons
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs text-cyan-400">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                  
                  {module.progress === 100 && (
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span className="text-xs text-yellow-400">{module.badge} Earned!</span>
                    </div>
                  )}
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => setActiveModule(module)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    {module.progress === 0 ? "Start Module" : "Continue"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges Section */}
          <div>
            <h4 className="font-medium text-white mb-4">Portfolio Challenges</h4>
            <div className="space-y-3">
              {challenges.map((challenge, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-cyan-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-white text-sm">{challenge.title}</h5>
                      <p className="text-xs text-muted-foreground">{challenge.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs text-cyan-400">{challenge.progress}/{challenge.total}</span>
                    </div>
                  </div>
                  
                  <Progress value={(challenge.progress / challenge.total) * 100} className="h-2 mb-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Reward: {challenge.reward}
                    </span>
                    {challenge.progress === challenge.total && (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <h5 className="font-medium text-blue-400 mb-2">Learning Tips</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Complete modules in order for best learning progression</li>
              <li>• Practice new skills immediately on your current work</li>
              <li>• Join challenges to stay motivated and track progress</li>
              <li>• Share your achievements with mentors and peers</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveLearningFeatures;
