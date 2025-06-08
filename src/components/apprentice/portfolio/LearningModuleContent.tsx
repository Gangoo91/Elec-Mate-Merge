
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Play } from "lucide-react";
import { useState } from "react";

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

interface LearningModuleContentProps {
  module: LearningModule;
  onProgress: (moduleId: string, lessonIndex: number) => void;
  onClose: () => void;
}

const LearningModuleContent = ({ module, onProgress, onClose }: LearningModuleContentProps) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(module.currentLesson || 0);
  const currentLesson = module.lessons[currentLessonIndex];

  const handleNextLesson = () => {
    if (currentLessonIndex < module.lessons.length - 1) {
      const nextIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(nextIndex);
      onProgress(module.id, nextIndex);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const renderLessonContent = () => {
    switch (currentLesson.type) {
      case "video":
        return (
          <div className="space-y-4">
            <div className="bg-elec-gray/50 rounded-lg p-8 text-center border border-blue-500/20">
              <Play className="h-16 w-16 mx-auto mb-4 text-blue-400" />
              <h4 className="text-lg font-medium text-white mb-2">{currentLesson.title}</h4>
              <p className="text-muted-foreground mb-4">Video lesson - {currentLesson.duration} minutes</p>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Play Video
              </Button>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">{currentLesson.content}</p>
            </div>
          </div>
        );
      
      case "interactive":
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
              <h4 className="text-lg font-medium text-white mb-4">{currentLesson.title}</h4>
              <p className="text-muted-foreground mb-4">{currentLesson.content}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Try Example 1
                </Button>
                <Button variant="outline" className="w-full">
                  Try Example 2
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="prose prose-invert max-w-none">
            <h4 className="text-lg font-medium text-white mb-4">{currentLesson.title}</h4>
            <div className="text-muted-foreground whitespace-pre-line">
              {currentLesson.content}
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400">{module.title}</CardTitle>
          <Button variant="outline" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Lesson {currentLessonIndex + 1} of {module.lessons.length}
            </span>
            <span className="text-cyan-400">{Math.round((currentLessonIndex + 1) / module.lessons.length * 100)}% Complete</span>
          </div>
          <Progress value={(currentLessonIndex + 1) / module.lessons.length * 100} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {renderLessonContent()}
          
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentLessonIndex < module.lessons.length - 1 ? (
              <Button onClick={handleNextLesson}>
                Next Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={onClose} className="bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Module
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningModuleContent;
