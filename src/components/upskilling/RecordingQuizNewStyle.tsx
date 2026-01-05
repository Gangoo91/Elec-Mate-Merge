import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, BookOpen, ArrowRight, RotateCcw } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Which observation code should be used for a socket outlet with exposed live parts accessible to touch?",
    options: [
      "C3 - Improvement recommended",
      "C2 - Potentially dangerous", 
      "C1 - Danger present",
      "FI - Further investigation required"
    ],
    correct: 2,
    explanation: "C1 indicates immediate danger present. Exposed live parts accessible to touch present an immediate risk of electric shock and must be addressed immediately."
  },
  {
    id: 2,
    question: "When documenting a defect, which information is most critical to include?",
    options: [
      "Cost estimate for repairs",
      "Client's preferred solution",
      "Specific location and regulation reference",
      "Installation date of the equipment"
    ],
    correct: 2,
    explanation: "Clear location identification and relevant regulation references provide the technical and legal foundation for any defect observation."
  },
  {
    id: 3,
    question: "How should inspection limitations be documented?",
    options: [
      "Generally mention 'some areas not accessible'",
      "Only note if they affect test results",
      "Specifically detail what couldn't be accessed and why",
      "Include only if client requests documentation"
    ],
    correct: 2,
    explanation: "Specific documentation of limitations protects the inspector legally and helps others understand the inspection scope and any potential risks."
  },
  {
    id: 4,
    question: "What is the primary legal purpose of inspection documentation?",
    options: [
      "To provide cost estimates for repairs",
      "To demonstrate professional competence and due diligence",
      "To satisfy insurance requirements only",
      "To create maintenance schedules"
    ],
    correct: 1,
    explanation: "Documentation serves as legal evidence of your professional assessment and compliance with standards, protecting both you and the client."
  },
  {
    id: 5,
    question: "When should observation code FI be used instead of C1, C2, or C3?",
    options: [
      "When repairs are too expensive",
      "When client disagrees with findings",
      "When full investigation is prevented by access or safety limitations",
      "When defects are older installations"
    ],
    correct: 2,
    explanation: "FI is used when you suspect problems but cannot fully investigate due to access limitations, safety concerns, or need for specialised equipment."
  },
  {
    id: 6,
    question: "When should the 'LIM' observation code be used?",
    options: [
      "When equipment is limited by design",
      "When inspection is limited by access or safety constraints",
      "When time is limited for the inspection",
      "When the client limits the scope of work"
    ],
    correct: 1,
    explanation: "LIM (Limitation) is used when the inspection cannot be completed due to access restrictions, safety constraints, or other physical limitations."
  },
  {
    id: 7,
    question: "Which certificate should be used for replacing a single socket outlet?",
    options: [
      "Electrical Installation Certificate (EIC)",
      "Electrical Installation Condition Report (EICR)",
      "Minor Electrical Installation Works Certificate (MEIWC)",
      "Periodic Inspection Report"
    ],
    correct: 2,
    explanation: "A MEIWC is appropriate for small additions and alterations like replacing a single socket outlet, as it's a minor work that doesn't require a full EIC."
  },
  {
    id: 8,
    question: "What does observation code 'NA' indicate?",
    options: [
      "Not Accessible during inspection",
      "Not Applicable to this installation",
      "Needs Assessment by specialist",
      "No Action required"
    ],
    correct: 1,
    explanation: "NA (Not Applicable) indicates that a particular requirement or regulation doesn't apply to the specific installation being inspected."
  },
  {
    id: 9,
    question: "How long should EICR documentation be retained?",
    options: [
      "Until the next inspection",
      "For 3 years minimum",
      "For 6 years minimum",
      "Permanently"
    ],
    correct: 2,
    explanation: "BS 7671 recommends retaining inspection and test records for at least 6 years, though some regulations may require longer retention periods."
  },
  {
    id: 10,
    question: "When using observation code 'NV', what must be clearly documented?",
    options: [
      "The cost of verification",
      "Why verification could not be completed",
      "The client's refusal to allow verification",
      "The age of the installation"
    ],
    correct: 1,
    explanation: "NV (Not Verified) requires clear documentation explaining why verification couldn't be completed, such as energised circuits that couldn't be safely isolated."
  }
];

export const RecordingQuizNewStyle = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-2xl mb-4 ${getScoreColor(score)}`}>
              {percentage}%
            </div>
            <Badge 
              variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="bg-[#2a2a2a] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className={`p-2 rounded ${isCorrect ? 'bg-green-900/30 border border-green-600/20' : 'bg-red-900/30 border border-red-600/20'}`}>
                          <span className="text-foreground font-medium">Your answer: </span>
                          <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                            {question.options[userAnswer]}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="bg-green-900/30 border border-green-600/20 p-2 rounded">
                            <span className="text-foreground font-medium">Correct answer: </span>
                            <span className="text-green-400">{question.options[question.correct]}</span>
                          </div>
                        )}
                        <div className="bg-blue-900/30 border border-blue-600/20 p-2 rounded">
                          <span className="text-blue-400 font-medium">Explanation: </span>
                          <span className="text-foreground">{question.explanation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={resetQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 font-semibold"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Knowledge Check
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-foreground text-lg font-medium mb-4">
            {question.question}
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                    : 'bg-[#2a2a2a] border-gray-600 text-foreground hover:bg-[#333333] hover:border-gray-500'
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'bg-elec-yellow text-elec-dark border-elec-yellow'
                      : 'border-white/60 text-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-sm sm:text-base">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 font-semibold"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};