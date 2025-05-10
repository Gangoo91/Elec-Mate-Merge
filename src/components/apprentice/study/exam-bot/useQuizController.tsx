
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
      // Request quiz questions from the Edge Function with more specific instructions
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: `Generate 20 multiple-choice questions (4 options each) for ${selectedType} exam preparation for UK electrical apprentices. Questions should be based on UK electrical standards, regulations (BS 7671), and practices. Each question must cover different topics within ${selectedType} to ensure variety. Format the response as a JSON array with fields: question (string), options (array of strings), correctAnswer (number index), and explanation (string). Ensure the response is valid JSON that can be parsed directly.`,
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
        // Handle different response formats
        if (typeof data.response === 'string') {
          // Try to parse string response as JSON
          try {
            parsedQuestions = JSON.parse(data.response);
          } catch (e) {
            console.error("Response is not valid JSON:", data.response);
            throw new Error("Response format error: not valid JSON");
          }
        } else if (Array.isArray(data.response)) {
          // Response is already an array
          parsedQuestions = data.response;
        } else if (data.response && typeof data.response === 'object') {
          // Response might be wrapped in another object
          if (Array.isArray(data.response.questions)) {
            parsedQuestions = data.response.questions;
          } else {
            // Try to extract questions from another field or the object itself
            const possibleArrayFields = Object.values(data.response).find(val => Array.isArray(val));
            if (possibleArrayFields) {
              parsedQuestions = possibleArrayFields;
            } else {
              parsedQuestions = [data.response]; // Treat as a single question if nothing else works
            }
          }
        } else {
          throw new Error("Invalid response format");
        }
        
        // Validate the structure
        if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
          throw new Error("Invalid question format received");
        }
        
        // Ensure all questions have the required fields
        const validatedQuestions = parsedQuestions.filter((q: any) => {
          return q && 
                 typeof q.question === 'string' && 
                 Array.isArray(q.options) && 
                 q.options.length > 1 &&
                 typeof q.correctAnswer === 'number' && 
                 typeof q.explanation === 'string';
        });
        
        if (validatedQuestions.length === 0) {
          throw new Error("No valid questions found in response");
        }
        
        setQuestions(validatedQuestions);
        
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
