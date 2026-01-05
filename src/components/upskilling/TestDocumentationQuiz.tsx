
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which certificate is used for a full new electrical installation?",
    options: [
      "EICR",
      "EIC",
      "MEIWC",
      "Risk Assessment Form"
    ],
    correctAnswer: 1,
    explanation: "The Electrical Installation Certificate (EIC) is used for new installations and major electrical work such as full rewires or new consumer units."
  },
  {
    id: 2,
    question: "True or False: A MEIWC can be used for installing a new consumer unit.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "False. Installing a new consumer unit is considered major work and requires an Electrical Installation Certificate (EIC), not a Minor Electrical Installation Works Certificate (MEIWC)."
  },
  {
    id: 3,
    question: "Which document would include observation codes like C1, C2, or C3?",
    options: [
      "Electrical Installation Certificate",
      "Product datasheet",
      "Electrical Installation Condition Report",
      "Site handover form"
    ],
    correctAnswer: 2,
    explanation: "The Electrical Installation Condition Report (EICR) includes observation codes such as C1 (Danger present), C2 (Potentially dangerous), C3 (Improvement recommended), and FI (Further investigation required)."
  },
  {
    id: 4,
    question: "What's required on all electrical certificates?",
    options: [
      "Client approval",
      "Site manager initials",
      "Competent person's signature",
      "A drawing of the installation"
    ],
    correctAnswer: 2,
    explanation: "All electrical certificates must be signed by a competent person who has either carried out or verified the work and testing. This signature makes the certificate legally valid."
  },
  {
    id: 5,
    question: "Why is test documentation important?",
    options: [
      "For marketing purposes",
      "To get faster payment",
      "To prove compliance and protect against liability",
      "To reduce the cost of testing"
    ],
    correctAnswer: 2,
    explanation: "Test documentation is legally required to prove compliance with BS 7671 and protects both the installer and client against liability. These documents serve as legal evidence that proper testing was completed."
  },
  {
    id: 6,
    question: "What does a C1 observation code indicate in an EICR?",
    options: [
      "Improvement recommended",
      "Danger present - immediate action required",
      "Further investigation needed",
      "Satisfactory condition"
    ],
    correctAnswer: 1,
    explanation: "C1 indicates 'Danger Present' meaning there is an immediate risk of injury and urgent remedial action is required. The installation should not remain in service until the danger is removed."
  },
  {
    id: 7,
    question: "How many signatures are typically required on an EIC?",
    options: [
      "One - the installer",
      "Two - installer and client",
      "Three - designer, installer, and inspector/tester",
      "Four - including building control"
    ],
    correctAnswer: 2,
    explanation: "An EIC requires three signatures: the Designer, the Installer, and the Inspector & Tester. These may be the same person if they have carried out all three roles competently."
  },
  {
    id: 8,
    question: "For how long should electrical installation certificates be retained?",
    options: [
      "1 year",
      "5 years",
      "7 years",
      "Life of the installation"
    ],
    correctAnswer: 3,
    explanation: "Installation certificates should be retained for the life of the installation as they provide essential information for future maintenance, alterations, and periodic inspections."
  },
  {
    id: 9,
    question: "What type of work would typically require a MEIWC?",
    options: [
      "Complete house rewire",
      "New consumer unit installation",
      "Adding sockets to an existing ring circuit",
      "Installing a new sub-main distribution board"
    ],
    correctAnswer: 2,
    explanation: "A MEIWC is used for minor work such as adding sockets to existing circuits, installing additional lighting points, or replacing accessories like-for-like."
  },
  {
    id: 10,
    question: "What must be included in all electrical certificates?",
    options: [
      "Only the test results",
      "Installation details, test results, and competent person signature",
      "Just the installation address",
      "Only the date of testing"
    ],
    correctAnswer: 1,
    explanation: "All electrical certificates must include: installation details, description of work, test results and methods, test equipment details, dates, and the signature of the competent person taking responsibility."
  }
];

const TestDocumentationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizComplete) return;

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

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const score = calculateScore();

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Quiz Complete!</h3>
          <div className="text-4xl font-bold text-elec-yellow mb-2">
            {score}/{questions.length}
          </div>
          <p className="text-gray-300">
            {score === questions.length ? "Perfect! Well done!" : 
             score >= questions.length * 0.8 ? "Great work!" :
             score >= questions.length * 0.6 ? "Good effort!" :
             "Keep studying and try again!"}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <Card key={question.id} className="bg-elec-dark border-gray-600">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg text-foreground leading-relaxed">
                      {question.question}
                    </CardTitle>
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const isUserAnswer = userAnswer === optionIndex;
                      const isCorrectAnswer = optionIndex === question.correctAnswer;
                      
                      return (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded border-2 ${
                            isCorrectAnswer 
                              ? 'border-green-500 bg-green-500/10 text-green-200'
                              : isUserAnswer 
                                ? 'border-red-500 bg-red-500/10 text-red-200'
                                : 'border-gray-600 text-gray-300'
                          }`}
                        >
                          {option}
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
                    <p className="text-blue-200 text-sm leading-relaxed">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleRestart}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>{selectedAnswers.filter(a => a !== undefined).length}/{questions.length} answered</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card className="bg-elec-dark border-gray-600">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
              Question {currentQ.id}
            </Badge>
          </div>
          <CardTitle className="text-xl text-foreground leading-relaxed">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-foreground'
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="border-gray-600 text-gray-300 hover:text-foreground hover:border-gray-500"
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentQuestion
                  ? 'bg-elec-yellow'
                  : selectedAnswers[index] !== undefined
                    ? 'bg-green-500'
                    : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          className="bg-elec-yellow text-elec-dark hover:bg-yellow-400 disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default TestDocumentationQuiz;
