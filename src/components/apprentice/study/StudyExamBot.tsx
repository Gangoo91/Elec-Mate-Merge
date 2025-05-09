
import { Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ExamTypesGrid from "./exam-bot/ExamTypesGrid";
import QuizButton from "./exam-bot/QuizButton";

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
          
          <ExamTypesGrid />
          
          <QuizButton isGenerating={isGenerating} onClick={handleStartQuiz} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyExamBot;
