import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

export const SoftwareCalculationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    new Array(10).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: 'Why is software used in emergency lighting design?',
      options: [
        'To accurately simulate lux levels and verify compliance before installation',
        'Because BS 5266-1 makes its use a legal requirement',
        'To remove the need for any physical testing',
        'Because it is only ever used on very large projects',
      ],
      correct: 0,
      explanation:
        'Software simulates lux levels and verifies compliance before installation, reducing errors, although physical testing is still required afterwards.',
    },
    {
      question: 'What is a key benefit of simulating lighting performance before installation?',
      options: [
        'It removes the need for any on-site testing',
        'It guarantees automatic Building Control approval',
        'It verifies compliance and reduces the risk of installation errors',
        'It allows cheaper luminaires and simplified wiring',
      ],
      correct: 2,
      explanation:
        'Pre-installation simulation verifies compliance and reduces the risk of costly installation errors and rework.',
    },
    {
      question: 'Which two software tools are commonly used in the UK for lighting design?',
      options: [
        'AutoCAD and SketchUp',
        'Excel and Word',
        'Photoshop and Illustrator',
        'DIALux and Relux',
      ],
      correct: 3,
      explanation:
        'DIALux and Relux are the most widely used lighting design tools in the UK and support emergency lighting calculations.',
    },
    {
      question: 'What does a polar diagram show?',
      options: [
        'The floor plan layout of the luminaires',
        'The light distribution curve for a luminaire type',
        'The electrical connection diagram for the circuit',
        'The orientation of the building relative to north',
      ],
      correct: 1,
      explanation:
        'A polar diagram shows the light distribution pattern and intensity of a specific luminaire type.',
    },
    {
      question: 'What is the purpose of lux contour maps?',
      options: [
        'To show the electrical circuits feeding the luminaires',
        'To indicate the designated fire escape routes',
        'To display colour-coded compliance areas across the floor plan',
        'To show the building elevations',
      ],
      correct: 2,
      explanation:
        'Lux contour maps use colour coding to show where illuminance levels pass or fail across the floor plan.',
    },
    {
      question: 'Why should manufacturer photometric data files be used in the software?',
      options: [
        'They are cheaper to obtain than generic data',
        'They provide accurate, specific luminaire performance data',
        'They are a legal requirement for every project',
        'They configure and install the fittings automatically',
      ],
      correct: 1,
      explanation:
        'Manufacturer photometric files give an accurate representation of how each specific luminaire actually performs.',
    },
    {
      question: 'What is one limitation of relying only on software?',
      options: [
        'The software licences are too expensive',
        'The calculations take too long to run',
        'The models assume ideal conditions that may not reflect site reality',
        'The results produced are always inaccurate',
      ],
      correct: 2,
      explanation:
        'Software models assume ideal conditions such as clean surfaces and no obstructions, which may not match the real installation.',
    },
    {
      question: 'What additional step must always follow software design to confirm compliance?',
      options: [
        'On-site lux testing after installation',
        'Obtaining Building Control approval',
        'Securing written client sign-off',
        'Registering the manufacturer warranty',
      ],
      correct: 0,
      explanation:
        'On-site lux testing after installation is essential to confirm that the actual performance matches the software prediction.',
    },
    {
      question: 'Which file formats are commonly used for photometric data?',
      options: ['PDF and DOC', 'JPG and PNG', 'XLS and CSV', 'IES and LDT'],
      correct: 3,
      explanation:
        'IES (Illuminating Engineering Society) and LDT (Luminaire Data Transfer) are the standard photometric data file formats.',
    },
    {
      question: 'Why should software-generated reports be included in the handover documentation?',
      options: [
        'They simply look professional in the file',
        'They reduce the installer’s legal liability',
        'They provide compliance evidence and design justification',
        'They are demanded by insurance companies',
      ],
      correct: 2,
      explanation:
        'Software reports provide compliance evidence and design justification for audits and Building Control.',
    },
  ];

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
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
    setSelectedAnswers(new Array(10).fill(null));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct.toString() ? 1 : 0);
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
      <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <div className="text-xl text-foreground">{percentage}% Complete</div>
            <div className="text-gray-300">
              {percentage >= 80
                ? 'Excellent work! You have a strong understanding of emergency lighting software tools.'
                : percentage >= 60
                  ? 'Good job! Consider reviewing the areas you missed.'
                  : 'Keep studying! Review the material and try again.'}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Detailed Results:</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correct.toString();

              return (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground text-sm font-medium">
                        Question {index + 1}: {question.question}
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        Your answer:{' '}
                        {userAnswer ? question.options[parseInt(userAnswer)] : 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-300 text-xs">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleRestart}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground">Software & Calculation Tools Quiz</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground leading-relaxed">
            {questions[currentQuestion].question}
          </h3>

          <RadioGroup
            value={selectedAnswers[currentQuestion] || ''}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  className="border-gray-400 text-elec-yellow"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="text-foreground cursor-pointer flex-1 text-sm leading-relaxed"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
