
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for exams (same as in MockExams.tsx)
const mockExams = [
  {
    id: "level2-am2",
    title: "Level 2 - AM2 Practice Exam",
    description: "Comprehensive practice exam covering all Level 2 topics with an emphasis on AM2 assessment preparation.",
    duration: 120,
    questionCount: 60,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level2-unit1",
    title: "Level 2 - Unit 1 Health & Safety",
    description: "Practice exam focused on health and safety principles for electrical installation work.",
    duration: 45,
    questionCount: 30,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level3-full",
    title: "Level 3 - Full Practice Exam",
    description: "Complete mock exam covering all Level 3 topics including electrical science and fault diagnosis.",
    duration: 180,
    questionCount: 80,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "level3-inspection",
    title: "Level 3 - Inspection & Testing",
    description: "Specialized practice test focusing on inspection, testing and commissioning procedures.",
    duration: 60,
    questionCount: 40,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "level4-design",
    title: "Level 4 - Electrical Design",
    description: "Advanced mock exam on electrical system design principles for experienced electricians.",
    duration: 120,
    questionCount: 50,
    level: "Level 4",
    isPremium: true,
  }
];

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    text: "According to the Electricity at Work Regulations, who is responsible for ensuring electrical safety in the workplace?",
    options: [
      "Only qualified electricians",
      "All employees who use electrical equipment",
      "Employers, self-employed persons and employees",
      "The Health and Safety Executive only"
    ],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations 1989 place duties on employers, the self-employed and employees to ensure electrical safety in the workplace."
  },
  {
    id: 2,
    text: "When testing a circuit with a voltage indicator, what should you do before relying on the results?",
    options: [
      "Test on a known live circuit, test the circuit under investigation, and test on a known live circuit again",
      "Just test on the circuit under investigation twice",
      "Test the circuit and confirm with a multimeter",
      "Test the circuit and ask another electrician to verify"
    ],
    correctAnswer: 0,
    explanation: "The 'prove, use, prove' method ensures the voltage indicator is working properly before and after use."
  },
  {
    id: 3,
    text: "What is the purpose of an RCD (Residual Current Device)?",
    options: [
      "To protect against short circuits",
      "To protect against earth leakage current by monitoring imbalances between live and neutral",
      "To protect against overvoltage",
      "To protect against surge currents"
    ],
    correctAnswer: 1,
    explanation: "An RCD works by detecting an imbalance in current between the live and neutral conductors, indicating earth leakage."
  }
];

const MockExamDetails = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSubscribed } = useAuth();
  
  const [currentExam, setCurrentExam] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

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
    setTimeRemaining(exam.duration * 60); // Convert minutes to seconds
  }, [examId, navigate, isSubscribed, toast]);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isExamStarted && !isExamFinished && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsExamFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isExamStarted, isExamFinished, timeRemaining]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  // Handle answer selection
  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Handle navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  // Start the exam
  const startExam = () => {
    setIsExamStarted(true);
  };

  // Finish the exam
  const finishExam = () => {
    setIsExamFinished(true);
    setShowResults(true);
  };

  // Calculate results
  const calculateResults = () => {
    let correctCount = 0;
    
    mockQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const percentage = (correctCount / mockQuestions.length) * 100;
    
    return {
      correct: correctCount,
      total: mockQuestions.length,
      percentage: Math.round(percentage)
    };
  };

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
    const results = calculateResults();
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Exam Results</h1>
          <Button variant="outline" onClick={() => navigate("/apprentice/study/mock-exams")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exams
          </Button>
        </div>
        
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle>{currentExam.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6">
              <div className="text-6xl font-bold text-elec-yellow mb-2">{results.percentage}%</div>
              <p className="text-muted-foreground">
                You got {results.correct} out of {results.total} questions correct
              </p>
            </div>
            
            <div className="space-y-8 mt-8">
              <h2 className="text-xl font-semibold border-b border-elec-yellow/30 pb-2">Review Your Answers</h2>
              
              {mockQuestions.map((question, index) => (
                <div key={question.id} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {selectedAnswers[question.id] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{index + 1}. {question.text}</p>
                      <div className="mt-2 space-y-1">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex} 
                            className={`p-2 rounded-md ${
                              optionIndex === question.correctAnswer 
                                ? 'bg-green-500/20 border border-green-500/30' 
                                : optionIndex === selectedAnswers[question.id]
                                  ? 'bg-red-500/20 border border-red-500/30'
                                  : 'bg-elec-dark/30'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      {selectedAnswers[question.id] !== question.correctAnswer && (
                        <div className="mt-3 p-3 bg-elec-dark/50 rounded-md">
                          <p className="text-sm font-medium">Explanation:</p>
                          <p className="text-sm text-muted-foreground">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => navigate("/apprentice/study/mock-exams")}
            >
              Return to Mock Exams
            </Button>
          </CardFooter>
        </Card>
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
          
          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardHeader>
              <CardTitle>Exam Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{currentExam.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-elec-yellow" />
                  <span>Duration: {currentExam.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  <span>Questions: {currentExam.questionCount}</span>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md mt-6">
                <h3 className="font-semibold mb-2">Important Notes:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Complete all questions within the allocated time</li>
                  <li>You can navigate between questions using the Previous and Next buttons</li>
                  <li>If you run out of time, the exam will automatically submit</li>
                  <li>Your results will be displayed at the end of the exam</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={startExam}>
                Start Exam
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        // Exam in progress
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {mockQuestions.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setExitDialogOpen(true)}>
              Exit Exam
            </Button>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="text-xl font-medium">{mockQuestions[currentQuestionIndex].text}</h2>
                
                <div className="space-y-3">
                  {mockQuestions[currentQuestionIndex].options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedAnswers[mockQuestions[currentQuestionIndex].id] === index
                          ? 'bg-elec-yellow/20 border-elec-yellow'
                          : 'border-elec-gray-border hover:border-elec-yellow/50 bg-elec-dark/30'
                      }`}
                      onClick={() => handleSelectAnswer(mockQuestions[currentQuestionIndex].id, index)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              {currentQuestionIndex === mockQuestions.length - 1 ? (
                <Button onClick={finishExam}>
                  Finish Exam
                </Button>
              ) : (
                <Button onClick={goToNextQuestion}>
                  Next Question
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Exit confirmation dialog */}
      <AlertDialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you exit now. Are you sure you want to leave the exam?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Exam</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/apprentice/study/mock-exams")}>
              Exit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MockExamDetails;
