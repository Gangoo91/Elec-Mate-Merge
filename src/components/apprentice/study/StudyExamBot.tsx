
import { Bot, Check, Clock, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ExamTypesGrid from "./exam-bot/ExamTypesGrid";
import QuizButton from "./exam-bot/QuizButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type QuizResult = {
  correct: number;
  total: number;
  percentage: number;
};

const StudyExamBot = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("am2");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showingExplanation, setShowingExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  
  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };
  
  const handleStartQuiz = async () => {
    setIsGenerating(true);
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswers([]);
    setShowingExplanation(false);
    setQuizComplete(false);
    setQuizResult(null);
    
    try {
      // Request quiz questions from the Edge Function
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: `Generate 5 multiple-choice questions (4 options each) for ${selectedType} exam preparation for UK electrical apprentices. Format as JSON array with question, options (array), correctAnswer (index), and explanation.`,
          type: "exam_quiz" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error generating quiz questions');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      let parsedQuestions;
      try {
        // The response might be a string that needs parsing, or already an object
        parsedQuestions = typeof data.response === 'string' 
          ? JSON.parse(data.response) 
          : data.response;
          
        // Validate the structure
        if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
          throw new Error("Invalid question format received");
        }
        
        // Ensure all questions have the required fields
        parsedQuestions.forEach((q: any) => {
          if (!q.question || !Array.isArray(q.options) || q.correctAnswer === undefined || !q.explanation) {
            throw new Error("Question missing required fields");
          }
        });
        
        setQuestions(parsedQuestions);
        
      } catch (parseError) {
        console.error("Error parsing questions:", parseError);
        throw new Error("Could not parse quiz questions");
      }
      
      toast({
        title: "Quiz Generated",
        description: "Your practice questions are ready!",
      });
    } catch (error) {
      console.error('Quiz Generation Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate quiz questions",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = optionIndex;
    setUserAnswers(newAnswers);
    setShowingExplanation(true);
  };
  
  const handleNextQuestion = () => {
    setShowingExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate results
      const correct = userAnswers.reduce((acc, answer, index) => {
        return answer === questions[index].correctAnswer ? acc + 1 : acc;
      }, 0);
      
      const total = questions.length;
      const percentage = Math.round((correct / total) * 100);
      
      setQuizResult({ correct, total, percentage });
      setQuizComplete(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswers([]);
    setShowingExplanation(false);
    setQuizComplete(false);
    setQuizResult(null);
  };
  
  const renderQuizContent = () => {
    if (quizComplete) {
      return (
        <div className="space-y-6">
          <div className="bg-elec-dark p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Quiz Complete!</h3>
            <div className="text-4xl font-bold mb-4 text-elec-yellow">{quizResult?.percentage}%</div>
            <p className="text-lg">
              You got <span className="font-bold text-elec-yellow">{quizResult?.correct}</span> out of <span className="font-bold">{quizResult?.total}</span> questions correct
            </p>
          </div>
          
          <Button className="w-full" onClick={handleRestartQuiz}>
            Try Another Quiz
          </Button>
        </div>
      );
    }
    
    if (questions.length === 0) {
      return (
        <>
          <ExamTypesGrid selectedType={selectedType} onSelectType={handleSelectType} />
          <QuizButton isGenerating={isGenerating} onClick={handleStartQuiz} />
        </>
      );
    }
    
    const currentQuestion = questions[currentIndex];
    const userAnswer = userAnswers[currentIndex];
    const hasAnswered = userAnswer !== undefined;
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" /> 
            Practice Mode
          </span>
        </div>
        
        <div className="bg-elec-dark p-4 rounded-lg">
          <p className="font-medium mb-4">{currentQuestion.question}</p>
          
          <RadioGroup disabled={hasAnswered}>
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correctAnswer;
              const isSelected = index === userAnswer;
              
              let optionClasses = "relative flex items-center p-3 rounded-md border";
              
              if (hasAnswered) {
                if (isSelected && isCorrect) {
                  optionClasses += " border-green-500 bg-green-500/10";
                } else if (isSelected && !isCorrect) {
                  optionClasses += " border-red-500 bg-red-500/10";
                } else if (isCorrect) {
                  optionClasses += " border-green-500 bg-green-500/10";
                } else {
                  optionClasses += " border-elec-gray/30 bg-elec-gray/5";
                }
              } else {
                optionClasses += " border-elec-gray/30 hover:border-elec-yellow/50 cursor-pointer";
              }
              
              return (
                <div key={index} className={optionClasses} onClick={() => !hasAnswered && handleAnswer(index)}>
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`}
                    className="mr-2"
                  />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                  {hasAnswered && (
                    <div className={`ml-2 flex items-center justify-center w-5 h-5 rounded-full ${isCorrect ? 'bg-green-500' : isSelected ? 'bg-red-500' : ''}`}>
                      {isCorrect ? <Check className="h-3 w-3 text-white" /> : isSelected ? <X className="h-3 w-3 text-white" /> : null}
                    </div>
                  )}
                </div>
              );
            })}
          </RadioGroup>
          
          {showingExplanation && (
            <div className="mt-4 pt-4 border-t border-elec-yellow/20">
              <h4 className="text-elec-yellow font-medium mb-2">Explanation:</h4>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
        
        {hasAnswered && (
          <Button className="w-full" onClick={handleNextQuestion}>
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </div>
    );
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
          
          {renderQuizContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyExamBot;
