import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { QuizResult, Assessment, QuizQuestion, QuizAnswer } from '@/types/quiz';
import { motion } from 'framer-motion';

interface EnhancedQuizResultsProps {
  result: QuizResult;
  assessment: Assessment;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  onRetake: () => void;
  onBackToHub: () => void;
  onReviewAnswers: () => void;
  onTakeAnother: () => void;
  onViewAnalytics: () => void;
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

const EnhancedQuizResults: React.FC<EnhancedQuizResultsProps> = ({
  result,
  assessment,
  questions,
  answers,
  onRetake,
  onBackToHub,
}) => {
  const passed = result.percentage >= 70;
  const totalCorrect = result.correctAnswers;
  const totalWrong = result.totalQuestions - result.correctAnswers;

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs}s`;
  };

  // Group wrong answers by topic for review
  const wrongAnswers = answers.filter(a => {
    const q = questions.find(q2 => q2.id === a.questionId);
    return q && a.selectedAnswer !== q.correctAnswer;
  }).map(a => {
    const q = questions.find(q2 => q2.id === a.questionId)!;
    return { question: q, selectedAnswer: a.selectedAnswer };
  });

  return (
    <div className="min-h-screen bg-background">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-6 space-y-6 pb-32">
        {/* Score hero */}
        <motion.div variants={itemVariants}>
          <div className={`rounded-3xl p-6 text-center ${passed ? 'bg-green-500/10 border border-green-500/20' : 'bg-orange-500/10 border border-orange-500/20'}`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${passed ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
              <Trophy className={`h-8 w-8 ${passed ? 'text-green-400' : 'text-orange-400'}`} />
            </div>
            <p className={`text-5xl font-black ${passed ? 'text-green-400' : 'text-orange-400'}`}>
              {result.percentage}%
            </p>
            <p className="text-sm text-white mt-2">
              {totalCorrect} of {result.totalQuestions} correct
            </p>
            <div className={`inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-bold ${
              passed ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
            }`}>
              {result.percentage >= 90 ? 'Excellent!' : result.percentage >= 70 ? 'Passed' : result.percentage >= 50 ? 'Keep Practising' : 'Needs Study'}
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-3.5 text-center">
              <Clock className="h-4 w-4 text-white mx-auto mb-1.5" />
              <p className="text-lg font-bold text-white">{formatTime(result.timeSpent)}</p>
              <p className="text-[10px] text-white">Time Taken</p>
            </div>
            <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-3.5 text-center">
              <CheckCircle className="h-4 w-4 text-green-400 mx-auto mb-1.5" />
              <p className="text-lg font-bold text-green-400">{totalCorrect}</p>
              <p className="text-[10px] text-white">Correct</p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-3.5 text-center">
              <XCircle className="h-4 w-4 text-red-400 mx-auto mb-1.5" />
              <p className="text-lg font-bold text-red-400">{totalWrong}</p>
              <p className="text-[10px] text-white">Incorrect</p>
            </div>
          </div>
        </motion.div>

        {/* Wrong answers review */}
        {wrongAnswers.length > 0 && (
          <motion.div variants={itemVariants}>
            <p className="text-[11px] font-bold text-white uppercase tracking-widest mb-3">Review Wrong Answers</p>
            <div className="space-y-2.5">
              {wrongAnswers.map((wa, i) => (
                <div key={i} className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-4 space-y-2">
                  <p className="text-sm font-medium text-white">{wa.question.question}</p>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="h-3 w-3 text-red-400" />
                    </div>
                    <p className="text-xs text-red-400">Your answer: {wa.question.options[wa.selectedAnswer]}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    </div>
                    <p className="text-xs text-green-400">Correct: {wa.question.options[wa.question.correctAnswer]}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-2.5">
                    <p className="text-xs text-white">{wa.question.explanation}</p>
                    {wa.question.regulation && (
                      <p className="text-[10px] text-yellow-400 mt-1 flex items-center gap-1">
                        <BookOpen className="h-2.5 w-2.5" /> {wa.question.regulation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All correct celebration */}
        {wrongAnswers.length === 0 && (
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 text-center">
              <p className="text-sm font-semibold text-green-400 mb-1">Perfect Score!</p>
              <p className="text-xs text-white">You answered every question correctly. Outstanding knowledge.</p>
            </div>
          </motion.div>
        )}

        {/* Assessment info */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-4 text-center">
            <p className="text-xs text-white">{assessment.title} — {assessment.regulation}</p>
            <p className="text-[10px] text-white mt-1">Pass mark: 70% — {result.totalQuestions} questions from a bank of 50</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Fixed bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-white/[0.06] pb-safe">
        <div className="px-4 py-3 space-y-2">
          <Button
            onClick={onRetake}
            className="w-full h-11 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold rounded-xl touch-manipulation active:scale-[0.98] text-sm"
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Try Again
          </Button>
          <Button
            onClick={onBackToHub}
            variant="outline"
            className="w-full h-11 border-white/[0.12] text-white hover:bg-white/[0.06] font-semibold rounded-xl touch-manipulation active:scale-[0.98] text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Hub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedQuizResults;
