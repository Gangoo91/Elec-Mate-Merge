
import { Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExamTypesGrid from "./exam-bot/ExamTypesGrid";
import QuizButton from "./exam-bot/QuizButton";
import QuizQuestionDisplay from "./exam-bot/QuizQuestionDisplay";
import QuizResultDisplay from "./exam-bot/QuizResultDisplay";
import { useQuizController } from "./exam-bot/useQuizController";

const StudyExamBot = () => {
  const {
    isGenerating,
    loadingProgress,
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
  } = useQuizController();
  
  const renderQuizContent = () => {
    if (quizComplete && quizResult) {
      return <QuizResultDisplay quizResult={quizResult} onRestart={handleRestartQuiz} />;
    }
    
    if (questions.length === 0) {
      return (
        <>
          <ExamTypesGrid selectedType={selectedType} onSelectType={handleSelectType} />
          <QuizButton 
            isGenerating={isGenerating} 
            loadingProgress={loadingProgress}
            onClick={handleStartQuiz} 
          />
        </>
      );
    }
    
    const currentQuestion = questions[currentIndex];
    const userAnswer = userAnswers[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    
    return (
      <QuizQuestionDisplay
        currentQuestion={currentQuestion}
        currentIndex={currentIndex}
        questionsLength={questions.length}
        userAnswer={userAnswer}
        showingExplanation={showingExplanation}
        onAnswer={handleAnswer}
        onNext={handleNextQuestion}
        isLastQuestion={isLastQuestion}
      />
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
            The Exam Prep Bot creates customised practice questions based on your current studies
            and areas that need improvement. Questions follow the format of UK electrical qualification exams.
          </p>
          
          {renderQuizContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyExamBot;
