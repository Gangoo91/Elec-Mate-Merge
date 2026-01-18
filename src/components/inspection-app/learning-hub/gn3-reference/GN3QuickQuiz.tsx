import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Brain,
  Trophy,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// QUIZ QUESTIONS - Based on verified GN3 content
// ============================================================================

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: "ir" | "zs" | "rcd" | "polarity" | "continuity" | "pfc" | "safety";
  difficulty: "easy" | "medium" | "hard";
  reference: string;
}

const quizQuestions: QuizQuestion[] = [
  // Insulation Resistance
  {
    id: "ir-1",
    question: "What test voltage should be used for insulation resistance testing on SELV circuits?",
    options: ["500V DC", "250V DC", "1000V DC", "230V AC"],
    correctIndex: 1,
    explanation: "SELV/PELV circuits use 250V DC test voltage with a minimum acceptable value of 0.5MΩ.",
    category: "ir",
    difficulty: "easy",
    reference: "GN3 Table 2.9",
  },
  {
    id: "ir-2",
    question: "What is the minimum acceptable insulation resistance for a 230V circuit?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "10 MΩ"],
    correctIndex: 1,
    explanation: "For circuits up to 500V (including 230V), the minimum IR is 1.0MΩ using 500V DC test voltage.",
    category: "ir",
    difficulty: "easy",
    reference: "GN3 Table 2.9 / BS 7671 Table 64",
  },
  {
    id: "ir-3",
    question: "A new installation yields an IR reading of 15MΩ. What action should be taken?",
    options: [
      "Pass - exceeds minimum",
      "Investigate - below expected",
      "Fail - below minimum",
      "Retest with higher voltage"
    ],
    correctIndex: 1,
    explanation: "New installations should yield >20MΩ. Values below this should be investigated even though they exceed the 1MΩ minimum.",
    category: "ir",
    difficulty: "hard",
    reference: "GN3 Section 2.6.7",
  },

  // Earth Fault Loop Impedance
  {
    id: "zs-1",
    question: "What is the formula for calculating total earth fault loop impedance (Zs)?",
    options: [
      "Zs = Ze × (R1+R2)",
      "Zs = Ze + (R1+R2)",
      "Zs = Ze - (R1+R2)",
      "Zs = Ze / (R1+R2)"
    ],
    correctIndex: 1,
    explanation: "Zs = Ze + (R1+R2), where Ze is external EFLI and R1+R2 is from continuity testing.",
    category: "zs",
    difficulty: "easy",
    reference: "GN3 Section 2.6.15",
  },
  {
    id: "zs-2",
    question: "What is the maximum Zs for a 32A Type B circuit breaker (0.4s disconnection)?",
    options: ["2.73Ω", "1.37Ω", "0.68Ω", "7.28Ω"],
    correctIndex: 1,
    explanation: "For 32A Type B breakers, the maximum Zs is 1.37Ω at 0.4s disconnection time (BS 7671 Table 41.3).",
    category: "zs",
    difficulty: "medium",
    reference: "BS 7671 Table 41.3",
  },
  {
    id: "zs-3",
    question: "When measuring Ze at the origin, what must be disconnected?",
    options: [
      "All circuit breakers",
      "The earthing conductor from the MET",
      "The neutral conductor",
      "All appliances"
    ],
    correctIndex: 1,
    explanation: "The earthing conductor must be disconnected from the MET to remove parallel paths during Ze measurement.",
    category: "zs",
    difficulty: "hard",
    reference: "GN3 Section 2.6.15",
  },

  // RCD Testing
  {
    id: "rcd-1",
    question: "What is the maximum trip time for a 30mA RCD at 1× rated residual current?",
    options: ["40ms", "150ms", "300ms", "500ms"],
    correctIndex: 2,
    explanation: "At 1×IΔn (30mA), a non-delay RCD must trip within 300ms maximum.",
    category: "rcd",
    difficulty: "easy",
    reference: "GN3 Table 2.17",
  },
  {
    id: "rcd-2",
    question: "Is the 5×IΔn RCD test mandatory per BS 7671:2018+A3:2024?",
    options: [
      "Yes, always required",
      "No, it's optional (fault-finding only)",
      "Only for 30mA RCDs",
      "Only for TT systems"
    ],
    correctIndex: 1,
    explanation: "The 5×IΔn test is OPTIONAL per BS 7671:2018+A3:2024 and is intended for fault-finding purposes only.",
    category: "rcd",
    difficulty: "hard",
    reference: "GN3 Table 2.17 Note 7",
  },
  {
    id: "rcd-3",
    question: "Before using an RCD test instrument, what should you do first?",
    options: [
      "Test the EFLI",
      "Press the RCD test button",
      "Disconnect all loads",
      "Check polarity"
    ],
    correctIndex: 1,
    explanation: "Press the RCD test button first - this provides basic confirmation the RCD is functioning and helps avoid danger during instrument testing.",
    category: "rcd",
    difficulty: "medium",
    reference: "GN3 Section 2.6.18",
  },

  // Polarity
  {
    id: "pol-1",
    question: "Where must single-pole switches and fuses be connected?",
    options: [
      "Neutral conductor only",
      "Line conductor only",
      "Either line or neutral",
      "Earth conductor"
    ],
    correctIndex: 1,
    explanation: "Single-pole devices must be connected in the LINE conductor only to ensure safe isolation.",
    category: "polarity",
    difficulty: "easy",
    reference: "BS 7671 Regulation 132.14.1",
  },
  {
    id: "pol-2",
    question: "On an Edison screw lampholder, which contact should be connected to line?",
    options: [
      "The outer screw shell",
      "The centre contact",
      "Either contact",
      "The earth terminal"
    ],
    correctIndex: 1,
    explanation: "The centre contact of Edison screw lampholders must be connected to line for safety (except E14/E27 to BS EN 60238).",
    category: "polarity",
    difficulty: "medium",
    reference: "GN3 Section 2.6.12",
  },

  // Safety
  {
    id: "safe-1",
    question: "According to GS38, what is the maximum exposed tip length for test probes?",
    options: ["4mm", "2mm", "6mm", "10mm"],
    correctIndex: 1,
    explanation: "GS38 recommends test probes with a maximum 2mm exposed tip, with shrouded design and finger barriers.",
    category: "safety",
    difficulty: "medium",
    reference: "HSE GS38",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

interface GN3QuickQuizProps {
  questionCount?: number;
  onComplete?: (score: number, total: number) => void;
}

export const GN3QuickQuiz = ({ questionCount = 5, onComplete }: GN3QuickQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, questionCount)
  );

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = useCallback((index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
  }, [showResult, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      onComplete?.(score + (selectedAnswer === currentQuestion.correctIndex ? 1 : 0), questions.length);
    }
  }, [currentQuestionIndex, questions.length, score, selectedAnswer, currentQuestion, onComplete]);

  const handleRestart = useCallback(() => {
    setQuestions([...quizQuestions].sort(() => Math.random() - 0.5).slice(0, questionCount));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  }, [questionCount]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ir: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      zs: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      rcd: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      polarity: "bg-green-500/20 text-green-400 border-green-500/30",
      continuity: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      pfc: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      safety: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[category] || "bg-white/20 text-white/80 border-white/30";
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      ir: "Insulation Resistance",
      zs: "Earth Fault Loop",
      rcd: "RCD Testing",
      polarity: "Polarity",
      continuity: "Continuity",
      pfc: "PFC",
      safety: "Safety",
    };
    return labels[category] || category;
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassing = percentage >= 70;

    return (
      <Card className="bg-white/5 border border-white/10">
        <CardContent className="p-4 sm:pt-6 text-center">
          <div className={cn(
            "w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center",
            isPassing ? "bg-green-500/20" : "bg-amber-500/20"
          )}>
            <Trophy className={cn(
              "h-7 w-7 sm:h-10 sm:w-10",
              isPassing ? "text-green-400" : "text-amber-400"
            )} />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">
            {isPassing ? "Great Work!" : "Keep Practicing!"}
          </h3>
          <p className="text-white/60 text-sm sm:text-base mb-3 sm:mb-4">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>
          <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 mb-4 sm:mb-6">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isPassing ? "bg-green-500" : "bg-amber-500"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <Button onClick={handleRestart} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 active:scale-[0.98] min-h-[44px] text-xs sm:text-sm touch-manipulation">
            <RefreshCw className="h-4 w-4 mr-1.5 sm:mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border border-white/10">
      <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-sm sm:text-lg text-white">GN3 Quick Quiz</CardTitle>
              <p className="text-[10px] sm:text-sm text-white/60">Test your knowledge</p>
            </div>
          </div>
          <Badge variant="outline" className="text-white/60 border-white/20 text-[10px] sm:text-xs">
            {currentQuestionIndex + 1} / {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="mt-2 sm:mt-3 h-1 sm:h-1.5 bg-white/10" />
      </CardHeader>

      <CardContent className="p-3 sm:p-6 pt-0">
        {/* Category & Difficulty */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <Badge variant="outline" className={cn(getCategoryColor(currentQuestion.category), "text-[10px] sm:text-xs")}>
            {getCategoryLabel(currentQuestion.category)}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] sm:text-xs",
              currentQuestion.difficulty === "easy" && "bg-green-500/10 text-green-400 border-green-500/20",
              currentQuestion.difficulty === "medium" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
              currentQuestion.difficulty === "hard" && "bg-red-500/10 text-red-400 border-red-500/20"
            )}
          >
            {currentQuestion.difficulty}
          </Badge>
        </div>

        {/* Question */}
        <p className="text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6">{currentQuestion.question}</p>

        {/* Options */}
        <div className="space-y-2 sm:space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showCorrectness = showResult;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-3 sm:p-4 rounded-lg border text-left transition-all flex items-center justify-between gap-2 touch-manipulation active:scale-[0.98] min-h-[44px]",
                  !showResult && "hover:bg-white/10 hover:border-white/30",
                  !showResult && isSelected && "bg-white/10 border-white/30",
                  !showResult && !isSelected && "bg-white/5 border-white/10",
                  showCorrectness && isCorrect && "bg-green-500/20 border-green-500/50",
                  showCorrectness && isSelected && !isCorrect && "bg-red-500/20 border-red-500/50",
                  showCorrectness && !isSelected && !isCorrect && "bg-white/5 border-white/10 opacity-50"
                )}
              >
                <span className={cn(
                  "text-xs sm:text-sm",
                  showCorrectness && isCorrect && "text-green-400",
                  showCorrectness && isSelected && !isCorrect && "text-red-400",
                  !showCorrectness && "text-white/80"
                )}>
                  {option}
                </span>
                {showCorrectness && isCorrect && (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 shrink-0" />
                )}
                {showCorrectness && isSelected && !isCorrect && (
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mt-0.5 shrink-0" />
              <div>
                <p className="text-white/80 text-xs sm:text-sm">{currentQuestion.explanation}</p>
                <p className="text-white/50 text-[10px] sm:text-xs mt-1.5 sm:mt-2">Ref: {currentQuestion.reference}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <Button
            onClick={handleNext}
            className="w-full mt-3 sm:mt-4 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 active:scale-[0.98] min-h-[44px] text-xs sm:text-sm touch-manipulation"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>Next Question <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" /></>
            ) : (
              <>See Results <Trophy className="h-4 w-4 ml-1 sm:ml-2" /></>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GN3QuickQuiz;
