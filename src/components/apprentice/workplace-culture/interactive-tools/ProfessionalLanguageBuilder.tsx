import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface ProfessionalLanguageBuilderProps {
  onBack: () => void;
}

interface Term {
  id: string;
  term: string;
  definition: string;
  context: string;
  category: 'tools' | 'safety' | 'communication' | 'processes';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const electricalTerms: Term[] = [
  {
    id: '1',
    term: 'Isolation',
    definition:
      'The process of safely disconnecting electrical supply to prevent shock or electrocution',
    context: "Before starting any work: 'I need to isolate this circuit first'",
    category: 'safety',
    difficulty: 'basic',
  },
  {
    id: '2',
    term: 'Dead Testing',
    definition: "Testing to confirm there's no electrical supply present",
    context: "After isolation: 'I'll do some dead testing to make sure it's safe'",
    category: 'safety',
    difficulty: 'basic',
  },
  {
    id: '3',
    term: 'SWA Cable',
    definition: 'Steel Wire Armoured cable - tough cable with steel wire protection',
    context: "For outdoor runs: 'We'll need to run some SWA to the garage'",
    category: 'tools',
    difficulty: 'intermediate',
  },
  {
    id: '4',
    term: 'Spurs',
    definition: 'Branch circuits that connect to a ring circuit',
    context: "Adding sockets: 'We can add a spur off the ring for that extra socket'",
    category: 'processes',
    difficulty: 'intermediate',
  },
  {
    id: '5',
    term: 'Zs Testing',
    definition: 'Earth fault loop impedance testing to ensure safety',
    context: "Final testing: 'I need to do the Zs readings for the certificate'",
    category: 'processes',
    difficulty: 'advanced',
  },
  {
    id: '6',
    term: 'Chasing',
    definition: 'Cutting channels in walls for cables',
    context: "Installation work: 'I'll need to chase out these walls for the cables'",
    category: 'processes',
    difficulty: 'basic',
  },
  {
    id: '7',
    term: 'MCB',
    definition: 'Miniature Circuit Breaker - protective device that trips on overcurrent',
    context: "Consumer unit work: 'That MCB has tripped, let me check the circuit'",
    category: 'tools',
    difficulty: 'basic',
  },
  {
    id: '8',
    term: 'Diversity',
    definition: 'The assumption that not all electrical loads will be used simultaneously',
    context: "Design calculations: 'We apply diversity factors when sizing the main cable'",
    category: 'processes',
    difficulty: 'advanced',
  },
];

type Mode = 'browse' | 'quiz' | 'flashcards';

const ProfessionalLanguageBuilder = ({ onBack }: ProfessionalLanguageBuilderProps) => {
  const [mode, setMode] = useState<Mode>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const filteredTerms =
    selectedCategory === 'all'
      ? electricalTerms
      : electricalTerms.filter((term) => term.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All', count: electricalTerms.length },
    {
      id: 'safety',
      label: 'Safety',
      count: electricalTerms.filter((t) => t.category === 'safety').length,
    },
    {
      id: 'tools',
      label: 'Tools',
      count: electricalTerms.filter((t) => t.category === 'tools').length,
    },
    {
      id: 'processes',
      label: 'Processes',
      count: electricalTerms.filter((t) => t.category === 'processes').length,
    },
    {
      id: 'communication',
      label: 'Communication',
      count: electricalTerms.filter((t) => t.category === 'communication').length,
    },
  ];

  const generateQuizOptions = (correctTerm: Term) => {
    const otherTerms = electricalTerms
      .filter((t) => t.id !== correctTerm.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [correctTerm, ...otherTerms].sort(() => Math.random() - 0.5);
    return options;
  };

  const startQuiz = () => {
    setMode('quiz');
    setQuizScore(0);
    setQuizQuestion(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
  };

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const currentTerm = filteredTerms[quizQuestion];

    setTimeout(() => {
      if (answer === currentTerm.term) {
        setQuizScore(quizScore + 1);
      }

      if (quizQuestion < Math.min(5, filteredTerms.length) - 1) {
        setQuizQuestion(quizQuestion + 1);
        setSelectedAnswer(null);
        setShowQuizResult(false);
      } else {
        setShowQuizResult(true);
      }
    }, 1500);
  };

  // Quiz result screen
  if (mode === 'quiz' && showQuizResult) {
    const percentage = Math.round((quizScore / 5) * 100);
    let grade = 'Keep studying';
    if (quizScore >= 4) grade = 'Excellent';
    else if (quizScore >= 3) grade = 'Good understanding';

    return (
      <div className="space-y-6 animate-fade-in text-left">
        <Button
          variant="ghost"
          onClick={() => setMode('browse')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to learning
        </Button>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Vocabulary quiz
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
              {quizScore}/5 · {percentage}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[16px] sm:text-[18px] font-medium text-white">{grade}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={startQuiz}
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => setMode('browse')}
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            Continue learning
          </Button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (mode === 'quiz') {
    const currentTerm = filteredTerms[quizQuestion];
    const quizOptions = generateQuizOptions(currentTerm);
    const quizProgress = ((quizQuestion + 1) / 5) * 100;

    return (
      <div className="space-y-6 animate-fade-in text-left">
        <Button
          variant="ghost"
          onClick={() => setMode('browse')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to learning
        </Button>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Vocabulary quiz
          </span>
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            What does this definition describe?
          </h2>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Question {quizQuestion + 1}/5
            </span>
            <span className="text-[12px] text-white/85 font-mono">{Math.round(quizProgress)}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${quizProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
          <p className="text-[16px] sm:text-[18px] font-medium text-white leading-relaxed">
            {currentTerm.definition}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quizOptions.map((option, index) => {
            const isPicked = selectedAnswer === option.term;
            const isCorrect = option.term === currentTerm.term;
            let optionStyle = 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]';
            if (selectedAnswer) {
              if (isPicked && isCorrect) {
                optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/30';
              } else if (isPicked && !isCorrect) {
                optionStyle = 'bg-red-500/[0.04] border-red-500/30';
              } else if (isCorrect) {
                optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/20';
              }
            }
            return (
              <button
                key={index}
                onClick={() => handleQuizAnswer(option.term)}
                disabled={selectedAnswer !== null}
                className={`p-4 h-auto text-left rounded-xl border text-[14px] font-medium text-white transition-all touch-manipulation active:scale-[0.99] ${optionStyle}`}
              >
                {option.term}
              </button>
            );
          })}
        </div>

        <div className="text-[12px] text-white/55 font-mono pt-2 border-t border-white/[0.06]">
          Score: {quizScore}/{quizQuestion + (selectedAnswer ? 1 : 0)}
        </div>
      </div>
    );
  }

  // Flashcard mode
  if (mode === 'flashcards') {
    const currentTerm = filteredTerms[currentTermIndex];
    const flashcardProgress = ((currentTermIndex + 1) / filteredTerms.length) * 100;

    return (
      <div className="space-y-6 animate-fade-in text-left">
        <Button
          variant="ghost"
          onClick={() => setMode('browse')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to learning
        </Button>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Flashcard study
          </span>
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Card {currentTermIndex + 1} of {filteredTerms.length}
          </h2>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Progress
            </span>
            <span className="text-[12px] text-white/85 font-mono">
              {Math.round(flashcardProgress)}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${flashcardProgress}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setShowDefinition(!showDefinition)}
          className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 min-h-[300px] flex flex-col justify-center text-center touch-manipulation transition-all active:scale-[0.99]"
        >
          {!showDefinition ? (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-[28px] sm:text-[32px] font-semibold text-white">{currentTerm.term}</h3>
              <div className="flex items-baseline justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span>{currentTerm.difficulty}</span>
                <span className="text-white/25">·</span>
                <span>{currentTerm.category}</span>
              </div>
              <p className="text-[12px] text-white/55 pt-4">Tap to reveal definition</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in text-left">
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-white">{currentTerm.term}</h3>
              <p className="text-[16px] text-white/85 leading-relaxed">{currentTerm.definition}</p>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Usage
                </span>
                <p className="text-[14px] text-white/85 italic leading-relaxed">{currentTerm.context}</p>
              </div>
              <p className="text-[12px] text-white/55 text-center pt-2">Tap to hide definition</p>
            </div>
          )}
        </button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentTermIndex(Math.max(0, currentTermIndex - 1));
              setShowDefinition(false);
            }}
            disabled={currentTermIndex === 0}
            className="flex-1 h-11 border-white/15 text-white hover:bg-white/[0.05] disabled:opacity-40 touch-manipulation"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              setCurrentTermIndex(Math.min(filteredTerms.length - 1, currentTermIndex + 1));
              setShowDefinition(false);
            }}
            disabled={currentTermIndex === filteredTerms.length - 1}
            className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold disabled:opacity-40 touch-manipulation active:scale-[0.98]"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  // Browse mode
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
          Professional language
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          Industry vocabulary
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Build your electrical industry vocabulary with browse, flashcard and quiz modes.
        </p>
      </div>

      {/* Mode selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setMode('browse')}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 text-center space-y-2 touch-manipulation active:scale-[0.98] transition-all"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Mode
          </span>
          <h3 className="text-[16px] font-medium text-white">Browse terms</h3>
          <p className="text-[12px] text-white/55">Explore vocabulary by category</p>
        </button>
        <button
          type="button"
          onClick={() => setMode('flashcards')}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 text-center space-y-2 touch-manipulation active:scale-[0.98] transition-all"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Mode
          </span>
          <h3 className="text-[16px] font-medium text-white">Flashcards</h3>
          <p className="text-[12px] text-white/55">Study with interactive cards</p>
        </button>
        <button
          type="button"
          onClick={startQuiz}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 text-center space-y-2 touch-manipulation active:scale-[0.98] transition-all"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Mode
          </span>
          <h3 className="text-[16px] font-medium text-white">Take quiz</h3>
          <p className="text-[12px] text-white/55">Test your knowledge</p>
        </button>
      </div>

      {/* Category filter */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Filter by category
        </span>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`h-9 px-3 rounded-lg border text-[12px] touch-manipulation transition-all inline-flex items-center gap-1.5 ${
                  active
                    ? 'bg-elec-yellow text-black font-semibold border-elec-yellow'
                    : 'bg-white/[0.02] text-white/85 border-white/10 hover:bg-white/[0.05]'
                }`}
              >
                {category.label}
                <span className={active ? 'text-black/70' : 'text-white/55'}>{category.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[16px] sm:text-[18px] font-medium text-white leading-snug">
                {term.term}
              </h3>
              <div className="flex items-baseline gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span>{term.difficulty}</span>
                <span className="text-white/25">·</span>
                <span>{term.category}</span>
              </div>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">{term.definition}</p>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Usage
              </span>
              <p className="text-[14px] text-white/85 italic leading-relaxed">{term.context}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalLanguageBuilder;
