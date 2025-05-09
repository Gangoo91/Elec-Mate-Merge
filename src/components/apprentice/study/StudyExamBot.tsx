
import { Bot, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const StudyExamBot = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleStartQuiz = () => {
    setIsGenerating(true);
    // Simulate loading state
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-elec-yellow" />
          Exam Prep Bot
        </CardTitle>
        <CardDescription>
          Practice for your qualification exams with AI-generated questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The Exam Prep Bot creates customized practice questions based on your current studies
            and areas that need improvement. Questions follow the format of UK electrical qualification exams.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="p-3 border rounded-md border-elec-yellow/20 bg-elec-dark flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-elec-yellow" />
              <span>EAL Level 2 Questions</span>
            </div>
            <div className="p-3 border rounded-md border-elec-yellow/20 bg-elec-dark flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-elec-yellow" />
              <span>EAL Level 3 Questions</span>
            </div>
            <div className="p-3 border rounded-md border-elec-yellow/20 bg-elec-dark flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-elec-yellow" />
              <span>City & Guilds Questions</span>
            </div>
            <div className="p-3 border rounded-md border-elec-yellow/20 bg-elec-dark flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-elec-yellow" />
              <span>AM2 Prep Questions</span>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleStartQuiz}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Questions..." : "Start Practice Quiz"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyExamBot;
