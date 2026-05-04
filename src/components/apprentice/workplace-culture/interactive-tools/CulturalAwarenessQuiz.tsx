import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';

interface CulturalAwarenessQuizProps {
  onBack: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const CulturalAwarenessQuiz = ({ onBack }: CulturalAwarenessQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question:
        "What's the most appropriate way to address a senior electrician you haven't met before?",
      options: [
        "Alright mate, how's it going?",
        "Good morning, I'm [your name], the new apprentice",
        'Hey there!',
        "What's up?",
      ],
      correctAnswer: 1,
      explanation:
        'Professional introductions show respect and help establish good working relationships from the start.',
      category: 'Professional Communication',
    },
    {
      id: 2,
      question: "If you don't understand a technical instruction, what should you do?",
      options: [
        'Pretend you understand and figure it out later',
        'Ask for clarification immediately',
        'Wait until break time to ask',
        'Ask another apprentice instead',
      ],
      correctAnswer: 1,
      explanation:
        "Safety is paramount in electrical work. Always ask for clarification if you're unsure about any instruction.",
      category: 'Safety Communication',
    },
    {
      id: 3,
      question: "What's the best response if a colleague uses unfamiliar electrical slang?",
      options: [
        'Ignore it and hope to understand from context',
        'Politely ask what the term means',
        'Pretend you know what they mean',
        'Look it up later without asking',
      ],
      correctAnswer: 1,
      explanation:
        'Learning industry terminology is part of your development. Most colleagues are happy to explain terms to apprentices.',
      category: 'Learning Culture',
    },
    {
      id: 4,
      question: "How should you handle a situation where you've made a mistake?",
      options: [
        'Try to fix it quietly without telling anyone',
        'Report it immediately to your supervisor',
        'Wait to see if anyone notices',
        'Blame it on someone else',
      ],
      correctAnswer: 1,
      explanation:
        'Honesty about mistakes is crucial for safety and learning. It shows maturity and responsibility.',
      category: 'Professional Integrity',
    },
    {
      id: 5,
      question: "What's the appropriate way to join a conversation among experienced electricians?",
      options: [
        'Jump in with your own stories',
        'Listen and contribute when appropriate',
        'Stay completely silent',
        'Change the subject to something you know',
      ],
      correctAnswer: 1,
      explanation:
        'Active listening and thoughtful contribution shows respect and helps you learn from experienced colleagues.',
      category: 'Workplace Integration',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good work';
    return 'Keep learning';
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="space-y-6 animate-fade-in text-left">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to tools
        </Button>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Cultural awareness quiz
          </span>
          <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            Quiz complete
          </h2>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Final score
            </span>
            <span className="text-[12px] text-white/85 font-mono">
              {score}/{questions.length} · {percentage}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[16px] sm:text-[18px] font-medium text-white">{getScoreMessage()}</p>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Review your answers
          </span>

          {questions.map((question, index) => {
            const isCorrect = answers[index] === question.correctAnswer;
            return (
              <div
                key={question.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
              >
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      {question.category}
                    </span>
                    <p className="text-[14px] font-medium text-white leading-snug">
                      {question.question}
                    </p>
                    <p className="text-[12px] text-white/55">
                      Correct: {question.options[question.correctAnswer]}
                    </p>
                    <p className="text-[14px] text-white/85 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/[0.06]">
            <Button
              onClick={handleRestart}
              className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Take quiz again
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              Back to tools
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in text-left">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to tools
      </Button>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Cultural awareness quiz
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          Workplace culture
        </h2>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-[12px] text-white/85 font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!showResult ? (
        <>
          <div className="space-y-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {currentQ.category}
            </span>
            <p className="text-[16px] sm:text-[18px] font-medium text-white leading-snug">
              {currentQ.question}
            </p>
          </div>

          <div className="space-y-2">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const optionStyle = isSelected
                ? 'bg-elec-yellow/[0.04] border-elec-yellow/40'
                : 'bg-white/[0.02] border-white/[0.06]';
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-xl border text-[14px] transition-all touch-manipulation active:scale-[0.99] flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[12px] font-semibold flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pt-0.5 flex-1 text-white/85 leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold disabled:opacity-40 touch-manipulation active:scale-[0.98]"
          >
            {currentQuestion === questions.length - 1 ? 'Finish quiz' : 'Check answer'}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <div
            className={`rounded-xl border p-4 sm:p-5 space-y-2 ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-elec-yellow/[0.04] border-elec-yellow/30'
                : 'bg-red-500/[0.04] border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-2">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
              <p className="text-[16px] font-medium text-white">
                {selectedAnswer === currentQ.correctAnswer ? 'Correct' : 'Incorrect'}
              </p>
            </div>
            {selectedAnswer !== currentQ.correctAnswer && (
              <p className="text-[14px] text-white/85 leading-relaxed">
                Correct answer: {currentQ.options[currentQ.correctAnswer]}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Explanation
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{currentQ.explanation}</p>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            {currentQuestion === questions.length - 1 ? 'View results' : 'Next question'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CulturalAwarenessQuiz;
