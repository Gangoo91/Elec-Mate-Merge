
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import LearningModuleContent from "./LearningModuleContent";

interface ModuleContent {
  id: string;
  title: string;
  content: string;
  type: "text" | "video" | "interactive";
  duration: number;
}

interface LearningModule {
  id: string;
  title: string;
  lessons: ModuleContent[];
  currentLesson: number;
  progress: number;
}

const InteractiveLearningFeatures = () => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [moduleProgress, setModuleProgress] = useState<{ [key: string]: number }>({});

  const learningModules: LearningModule[] = [
    {
      id: "evidence-collection",
      title: "Evidence Collection Best Practices",
      currentLesson: 0,
      progress: 0,
      lessons: [
        {
          id: "photo-evidence",
          title: "Taking Quality Photographic Evidence",
          content: "Learn how to capture clear, well-lit photographs that effectively demonstrate your electrical work. This includes proper angles, lighting techniques, and ensuring all relevant components are visible in your documentation.",
          type: "video",
          duration: 15
        },
        {
          id: "written-reflection",
          title: "Writing Effective Reflections",
          content: "Master the art of reflective writing for your portfolio. Learn how to articulate your learning experiences, challenges faced, and knowledge gained during each project or task.",
          type: "text",
          duration: 20
        },
        {
          id: "documentation-standards",
          title: "Meeting Documentation Standards",
          content: "Understand the specific requirements for portfolio documentation in the electrical industry, including compliance with assessment criteria and professional standards.",
          type: "interactive",
          duration: 25
        }
      ]
    },
    {
      id: "assessment-preparation",
      title: "Assessment Preparation Strategies",
      currentLesson: 0,
      progress: 0,
      lessons: [
        {
          id: "epa-requirements",
          title: "End-Point Assessment Requirements",
          content: "Comprehensive overview of EPA requirements, including knowledge, skills, and behaviours evidence needed for successful completion of your apprenticeship.",
          type: "text",
          duration: 30
        },
        {
          id: "portfolio-presentation",
          title: "Presenting Your Portfolio",
          content: "Learn effective techniques for presenting your portfolio during professional discussions and assessment interviews.",
          type: "video",
          duration: 18
        },
        {
          id: "mock-assessment",
          title: "Mock Assessment Practice",
          content: "Practice assessment scenarios with interactive feedback to build confidence and identify areas for improvement.",
          type: "interactive",
          duration: 35
        }
      ]
    },
    {
      id: "digital-organisation",
      title: "Digital Portfolio Organisation",
      currentLesson: 0,
      progress: 0,
      lessons: [
        {
          id: "file-structure",
          title: "Creating Effective File Structures",
          content: "Learn how to organise your digital portfolio files for easy navigation and professional presentation. Includes naming conventions and folder hierarchies.",
          type: "text",
          duration: 12
        },
        {
          id: "cloud-backup",
          title: "Cloud Storage and Backup Strategies",
          content: "Ensure your portfolio is always safe and accessible with proper cloud storage solutions and backup procedures.",
          type: "video",
          duration: 16
        },
        {
          id: "version-control",
          title: "Managing Portfolio Versions",
          content: "Keep track of portfolio updates and maintain version control for continuous improvement and assessment readiness.",
          type: "interactive",
          duration: 22
        }
      ]
    }
  ];

  const handleModuleSelect = (module: LearningModule) => {
    setSelectedModule(module);
  };

  const handleModuleProgress = (moduleId: string, lessonIndex: number) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: ((lessonIndex + 1) / learningModules.find(m => m.id === moduleId)!.lessons.length) * 100
    }));
    
    // Update the selected module's current lesson
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule(prev => prev ? {
        ...prev,
        currentLesson: lessonIndex,
        progress: ((lessonIndex + 1) / prev.lessons.length) * 100
      } : null);
    }
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
  };

  if (selectedModule) {
    return (
      <LearningModuleContent 
        module={selectedModule}
        onProgress={handleModuleProgress}
        onClose={handleCloseModule}
      />
    );
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
      <CardHeader>
        <CardTitle className="text-green-400">Interactive Learning Modules</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enhance your portfolio skills with guided learning experiences
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {learningModules.map((module) => {
            const currentProgress = moduleProgress[module.id] || 0;
            const lessonsCompleted = Math.floor((currentProgress / 100) * module.lessons.length);
            
            return (
              <div key={module.id} className="p-4 bg-elec-gray/50 rounded-lg border border-green-500/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{module.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {module.lessons.length} lessons • {module.lessons.reduce((total, lesson) => total + lesson.duration, 0)} minutes total
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {lessonsCompleted} of {module.lessons.length} lessons completed
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentProgress > 0 && (
                      <span className="text-xs text-green-400 font-medium">
                        {Math.round(currentProgress)}%
                      </span>
                    )}
                    <Button 
                      size="sm"
                      onClick={() => handleModuleSelect(module)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {currentProgress > 0 ? (
                        <>
                          Continue
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {currentProgress > 0 && (
                  <div className="mt-3">
                    <Progress value={currentProgress} className="h-2" />
                  </div>
                )}
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {module.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        index < lessonsCompleted 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-elec-gray text-muted-foreground"
                      }`}
                    >
                      {lesson.type === "video" && <Play className="h-3 w-3" />}
                      {lesson.type === "text" && <BookOpen className="h-3 w-3" />}
                      {lesson.type === "interactive" && <CheckCircle className="h-3 w-3" />}
                      {lesson.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <h5 className="font-medium text-blue-400 mb-2">Learning Benefits</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Interactive exercises with immediate feedback</li>
            <li>• Video demonstrations of best practices</li>
            <li>• Templates and examples to guide your work</li>
            <li>• Progress tracking and completion certificates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveLearningFeatures;
