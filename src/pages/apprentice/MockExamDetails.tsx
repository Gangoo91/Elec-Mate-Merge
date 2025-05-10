
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Import components
import ExamIntroduction from "@/components/apprentice/mock-exams/ExamIntroduction";
import ExamHeader from "@/components/apprentice/mock-exams/ExamHeader";
import ExamQuestion from "@/components/apprentice/mock-exams/ExamQuestion";
import ExamResults from "@/components/apprentice/mock-exams/ExamResults";
import ExamExitDialog from "@/components/apprentice/mock-exams/ExamExitDialog";

// Import mock data
import { mockExams, mockQuestions } from "@/data/apprentice/mockExams";

// Import custom hooks
import { useExam } from "@/hooks/apprentice/useExam";

const MockExamDetails = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSubscribed } = useAuth();
  
  const [currentExam, setCurrentExam] = useState<any>(null);

  // Find the exam data based on the URL param
  useEffect(() => {
    const exam = mockExams.find(e => e.id === examId);
    
    if (!exam) {
      toast({
        title: "Exam not found",
        description: "The requested exam could not be found.",
        variant: "destructive"
      });
      navigate("/apprentice/study/mock-exams");
      return;
    }
    
    // Check if premium exam and user not subscribed
    if (exam.isPremium && !isSubscribed) {
      toast({
        title: "Premium Content",
        description: "Please subscribe to access premium mock exams.",
        variant: "destructive"
      });
      navigate("/apprentice/study/mock-exams");
      return;
    }
    
    setCurrentExam(exam);
  }, [examId, navigate, isSubscribed, toast]);

  // Initialize exam controller using our custom hook
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
  } = useExam(currentExam, mockQuestions);

  // Return to exam list
  const handleExit = () => {
    if (!isExamFinished && isExamStarted) {
      setExitDialogOpen(true);
    } else {
      navigate("/apprentice/study/mock-exams");
    }
  };

  // If no exam is loaded yet
  if (!currentExam) {
    return <div className="flex justify-center items-center h-[60vh]">Loading exam...</div>;
  }

  // Show results page
  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Exam Results</h1>
          <Button variant="outline" onClick={() => navigate("/apprentice/study/mock-exams")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exams
          </Button>
        </div>
        
        <ExamResults 
          examTitle={currentExam.title}
          questions={mockQuestions}
          selectedAnswers={selectedAnswers}
          onReturn={() => navigate("/apprentice/study/mock-exams")}
        />
      </div>
    );
  }

  // Show exam interface
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {!isExamStarted ? (
        // Exam introduction page
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">{currentExam.title}</h1>
            <Button variant="outline" onClick={handleExit}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Exams
            </Button>
          </div>
          
          <ExamIntroduction exam={currentExam} onStart={startExam} />
        </div>
      ) : (
        // Exam in progress
        <div className="space-y-6">
          <ExamHeader 
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={mockQuestions.length}
            timeRemaining={timeRemaining}
            onExit={() => setExitDialogOpen(true)}
          />
          
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
        </div>
      )}
      
      {/* Exit confirmation dialog */}
      <ExamExitDialog 
        open={exitDialogOpen}
        onOpenChange={setExitDialogOpen}
        onExit={() => navigate("/apprentice/study/mock-exams")}
      />
    </div>
  );
};

export default MockExamDetails;
