
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Brain,
  Eye,
  Zap,
  Shield,
  RotateCcw,
  Target,
  Settings,
  Activity,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllAssessments } from '@/data/quizAssessments';

interface QuizAssessmentSectionProps {
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  }
};

// Map assessment IDs to icons and colors
const assessmentConfig: Record<string, { icon: React.ElementType; iconBg: string }> = {
  'visual-inspection': { icon: Eye, iconBg: 'bg-emerald-500' },
  'continuity-testing': { icon: Zap, iconBg: 'bg-blue-500' },
  'insulation-resistance': { icon: Shield, iconBg: 'bg-purple-500' },
  'polarity-testing': { icon: RotateCcw, iconBg: 'bg-green-500' },
  'earth-fault-loop': { icon: Target, iconBg: 'bg-red-500' },
  'rcd-testing': { icon: Shield, iconBg: 'bg-orange-500' },
  'prospective-fault': { icon: Activity, iconBg: 'bg-cyan-500' },
  'functional-testing': { icon: Settings, iconBg: 'bg-teal-500' }
};

const QuizAssessmentSection = ({ onBack }: QuizAssessmentSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const assessments = getAllAssessments();

  const handleStartQuiz = (assessmentId: string) => {
    navigate(`/quiz/${assessmentId}`, {
      state: { from: location.pathname }
    });
  };

  // Group assessments
  const beginnerAssessments = assessments.filter(a => a.difficulty === 'Beginner');
  const intermediateAssessments = assessments.filter(a => a.difficulty === 'Intermediate');
  const advancedAssessments = assessments.filter(a => a.difficulty === 'Advanced');

  const renderAssessmentItem = (assessment: typeof assessments[0]) => {
    const config = assessmentConfig[assessment.id] || { icon: Brain, iconBg: 'bg-purple-500' };
    const Icon = config.icon;

    return (
      <motion.div
        key={assessment.id}
        variants={itemVariants}
        onClick={() => handleStartQuiz(assessment.id)}
        className="flex items-center gap-3 p-3.5 cursor-pointer touch-manipulation active:bg-white/[0.04] transition-colors"
      >
        <div className={cn(
          "w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0",
          config.iconBg
        )}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium text-white leading-tight">
            {assessment.title}
          </h3>
          <p className="text-[13px] text-white/50 leading-tight mt-0.5">
            {assessment.regulation}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[13px] text-white/30">{assessment.questions} Qs</span>
          <ChevronRight className="h-4 w-4 text-white/20" />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {/* iOS-style header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06] -mx-4 px-4 mb-4">
        <div className="flex items-center gap-3 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 rounded-xl bg-purple-500 flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">
              Knowledge Quiz
            </h1>
            <p className="text-[11px] text-white/50">
              2391-style Questions
            </p>
          </div>
        </div>
      </header>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Beginner */}
        {beginnerAssessments.length > 0 && (
          <div>
            <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
              Beginner
            </p>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
              {beginnerAssessments.map(renderAssessmentItem)}
            </div>
          </div>
        )}

        {/* Intermediate */}
        {intermediateAssessments.length > 0 && (
          <div>
            <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
              Intermediate
            </p>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
              {intermediateAssessments.map(renderAssessmentItem)}
            </div>
          </div>
        )}

        {/* Advanced */}
        {advancedAssessments.length > 0 && (
          <div>
            <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
              Advanced
            </p>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
              {advancedAssessments.map(renderAssessmentItem)}
            </div>
          </div>
        )}

        {/* Info notice */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02]">
            <Brain className="h-4 w-4 text-white/30 flex-shrink-0" />
            <p className="text-[12px] text-white/40">
              Each quiz contains 20 questions based on BS 7671:2018+A3:2024
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuizAssessmentSection;
