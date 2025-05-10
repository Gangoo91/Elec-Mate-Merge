
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { QuizQuestion, QuizResult } from "./types";

export const useQuizController = () => {
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

  return {
    isGenerating,
    selectedType,
    questions,
    currentIndex,
    userAnswers,
    showingExplanation,
    quizComplete,
    quizResult,
    handleSelectType,
    handleStartQuiz,
    handleAnswer,
    handleNextQuestion,
    handleRestartQuiz
  };
};
