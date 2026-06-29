import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

export const CableInstallationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    new Array(10).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question:
        'Which cable type provides the highest fire resistance in high-risk installations?',
      options: [
        'Standard PVC twin and earth',
        'Mineral Insulated Copper Cable (MICC)',
        'Enhanced fire-resistant LSZH cable',
        'Standard fire-resistant cable',
      ],
      correct: 1,
      explanation:
        'MICC maintains circuit integrity at temperatures exceeding 1,000°C and provides the highest level of fire resistance.',
    },
    {
      question:
        'What is the survival time for enhanced fire-resistant cable when tested to BS EN 50200 (PH 120)?',
      options: ['30 minutes', '60 minutes', '90 minutes', '120 minutes'],
      correct: 3,
      explanation:
        'Enhanced fire-resistant cables achieving classification PH 120 to BS EN 50200 maintain circuit integrity for 120 minutes under test conditions.',
    },
    {
      question: 'Why is LSZH cable often specified in emergency lighting systems?',
      options: [
        'It offers noticeably better electrical conductivity',
        'It reduces toxic fumes and smoke density in a fire',
        'It is cheaper than standard PVC cable',
        'It is significantly easier to install',
      ],
      correct: 1,
      explanation:
        'LSZH (Low Smoke Zero Halogen) cable reduces smoke density and avoids the halogen gases that cause respiratory harm and hinder evacuation.',
    },
    {
      question:
        'Which BS 7671 regulation gives requirements for the methods of support of wiring systems?',
      options: [
        'BS 5266-1 Section 7.2',
        'BS EN 50200 Clause 4.3',
        'BS 7671 Regulation 521.10.202',
        'BS 7629-1 Annex A',
      ],
      correct: 2,
      explanation:
        'BS 7671 Regulation 521.10.202 gives the requirements for methods of support of wiring systems, so cables are not left unsupported by premature collapse in a fire.',
    },
    {
      question: 'What is the problem with using plastic clips to support emergency lighting cables?',
      options: [
        'They provide adequate support only if very closely spaced',
        'They soften and melt early in a fire, letting cables collapse',
        'They are acceptable only for self-contained systems',
        'They are acceptable only where MICC cable is used',
      ],
      correct: 1,
      explanation:
        'Plastic clips soften and melt early in a fire, allowing the supported cables to fall and break the circuit before evacuation is complete.',
    },
    {
      question:
        'How long must emergency lighting circuits remain operational in most public buildings?',
      options: [
        '30 minutes in all cases',
        '1 hour minimum, or 3 hours where occupants sleep',
        '2 hours in all circumstances',
        'Only until the fire service arrives',
      ],
      correct: 1,
      explanation:
        'BS 5266-1 sets a 1-hour minimum for many public premises, increasing to 3 hours where there is sleeping accommodation or where re-entry is needed.',
    },
    {
      question: 'Why must emergency lighting circuits be segregated from normal lighting circuits?',
      options: [
        'To reduce electromagnetic interference between them',
        'To prevent a fault on one system damaging the other in a fire',
        'To simplify the voltage-drop calculation',
        'It is only a recommendation, not a requirement',
      ],
      correct: 1,
      explanation:
        'Segregation prevents a fault on the normal lighting circuit from damaging the emergency lighting supply during a fire.',
    },
    {
      question: 'Which system type generally requires more extensive fire-resistant cabling?',
      options: [
        'Self-contained systems need more cable',
        'Both systems need the same amount of cable',
        'Central battery systems need significantly more cable',
        'Neither system needs fire-resistant cable',
      ],
      correct: 2,
      explanation:
        'Central battery systems need extensive fire-resistant cabling because all power is distributed from a single battery room to every luminaire.',
    },
    {
      question: 'Which method protects emergency lighting cables from mechanical damage?',
      options: [
        'Metal trunking or conduit',
        'Plastic conduit with warning tape',
        'Bundling with other services for protection',
        'Surface mounting with identification labels',
      ],
      correct: 0,
      explanation:
        'Metal trunking or conduit provides robust mechanical protection; plastic containment is unsuitable as it melts and collapses in a fire.',
    },
    {
      question: 'In the shopping centre case study, what caused the emergency lighting to fail?',
      options: [
        'The luminaires were incorrectly positioned',
        'Standard PVC cables and plastic clips were used instead of fire-rated support',
        'The battery backup was undersized for the load',
        'The measured lux levels were below the minimum',
      ],
      correct: 1,
      explanation:
        'Standard PVC cables on plastic clips collapsed early in the fire, and the system had to be completely rewired with fire-rated cable and supports.',
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
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setQuizCompleted(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(10).fill(null));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.filter(
      (answer, index) => answer !== null && parseInt(answer) === questions[index].correct
    ).length;
  };

  const allQuestionsAnswered = selectedAnswers.every((answer) => answer !== null);
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Quiz Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${
                passed ? 'border-green-500 bg-green-500/20' : 'border-orange-500 bg-orange-500/20'
              }`}
            >
              <span className="text-4xl font-bold text-foreground">{percentage.toFixed(0)}%</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                You scored {score} out of {questions.length}
              </h3>
              <p className="text-foreground">
                {passed
                  ? "Excellent work! You've demonstrated strong understanding of cable installation requirements."
                  : 'Good effort! Review the material and try again to improve your score.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Review Your Answers:</h4>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[index] ? parseInt(selectedAnswers[index]!) : -1;
              const isCorrect = userAnswer === q.correct;

              return (
                <div key={index} className="bg-elec-dark/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">
                        Question {index + 1}: {q.question}
                      </p>
                      <p className="text-sm text-gray-400 mb-1">
                        Your answer: {userAnswer >= 0 ? q.options[userAnswer] : 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {q.options[q.correct]}
                        </p>
                      )}
                      <p className="text-sm text-gray-300">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleRetry}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retry Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="space-y-4">
          <CardTitle className="text-foreground">Knowledge Check Quiz</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{score} correct</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{currentQ.question}</h3>

          <RadioGroup
            value={selectedAnswer || ''}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-elec-dark/50 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`q${currentQuestion}-option${index}`}
                  className="border-gray-500"
                />
                <Label
                  htmlFor={`q${currentQuestion}-option${index}`}
                  className="text-foreground cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showResults && (
            <div
              className={`rounded-lg p-4 ${
                selectedAnswer && parseInt(selectedAnswer) === currentQ.correct
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              }`}
            >
              <p className="text-foreground text-sm">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1"
          >
            Previous
          </Button>

          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
