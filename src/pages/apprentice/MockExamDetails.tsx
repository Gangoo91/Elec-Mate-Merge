
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExamQuestion from "@/components/apprentice/mock-exams/ExamQuestion";
import ExamIntroduction from "@/components/apprentice/mock-exams/ExamIntroduction";
import ExamResults from "@/components/apprentice/mock-exams/ExamResults";
import ExamHeader from "@/components/apprentice/mock-exams/ExamHeader";
import ExamExitDialog from "@/components/apprentice/mock-exams/ExamExitDialog";
import { mockExams, mockQuestions } from "@/data/apprentice/mockExams";
import { useExam } from "@/hooks/apprentice/useExam";
import { AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MockExamDetails = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Find the exam details
  const exam = mockExams.find(exam => exam.id === examId) || null;
  
  // Setup the exam controller
  const {
    currentQuestionIndex,
    selectedAnswers,
    timeRemaining,
    isExamStarted,
    isExamFinished,
    showResults,
    exitDialogOpen,
    setExitDialogOpen,
    handleSelectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    startExam,
    finishExam,
    setShowResults
  } = useExam(exam, mockQuestions);
  
  // Format remaining time
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Return to the main mock exams page
  const handleReturnToExams = () => {
    navigate('/apprentice/study/mock-exams');
  };
  
  // Show exit confirmation dialog
  const handleExitClick = () => {
    if (isExamStarted && !isExamFinished) {
      setExitDialogOpen(true);
    } else {
      handleReturnToExams();
    }
  };

  // If exam not found
  if (!exam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-center flex-col p-6 sm:p-10 bg-elec-gray rounded-lg border border-elec-yellow/20">
          <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 mb-4" />
          <h1 className="text-lg sm:text-xl font-semibold mb-2">Exam Not Found</h1>
          <p className="text-sm text-muted-foreground mb-6">The exam you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/apprentice/study/mock-exams')}
            className="px-3 py-2 bg-elec-yellow text-elec-dark font-medium rounded-md text-sm"
          >
            Return to Mock Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fade-in">
      <ExamHeader 
        title={exam.title} 
        timeRemaining={isExamStarted ? formatTime(timeRemaining) : `${exam.duration}:00`}
        onExitClick={handleExitClick}
        questionIndex={currentQuestionIndex + 1}
        questionCount={mockQuestions.length}
        isExamStarted={isExamStarted}
        isExamFinished={isExamFinished}
      />
      
      {!isExamStarted && (
        <ExamIntroduction exam={exam} onStart={startExam} />
      )}
      
      {isExamStarted && !showResults && (
        <ExamQuestion 
          question={mockQuestions[currentQuestionIndex]}
          selectedAnswer={selectedAnswers[mockQuestions[currentQuestionIndex].id]}
          onSelectAnswer={handleSelectAnswer}
          onPrevious={goToPreviousQuestion}
          onNext={goToNextQuestion}
          onFinish={finishExam}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === mockQuestions.length - 1}
        />
      )}
      
      {showResults && (
        <ExamResults 
          examTitle={exam.title}
          questions={mockQuestions}
          selectedAnswers={selectedAnswers}
          onReturn={handleReturnToExams}
        />
      )}
      
      <ExamExitDialog 
        open={exitDialogOpen} 
        onClose={() => setExitDialogOpen(false)}
        onExit={handleReturnToExams}
      />
    </div>
  );
};

export default MockExamDetails;
