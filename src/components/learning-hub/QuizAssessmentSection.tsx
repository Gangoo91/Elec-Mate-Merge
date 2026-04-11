import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Shield, Eye, RotateCcw, Target, Settings, Activity, Wrench, Search, AlertTriangle } from 'lucide-react';
import { BusinessCard } from '@/components/business-hub';
import { getAllAssessments } from '@/data/quizAssessments';

interface QuizAssessmentSectionProps {
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const iconMap: Record<string, React.ElementType> = {
  'visual-inspection': Eye,
  'continuity-testing': Zap,
  'insulation-resistance': Shield,
  'polarity-testing': RotateCcw,
  'earth-fault-loop': Target,
  'rcd-testing': Shield,
  'prospective-fault': Activity,
  'functional-testing': Settings,
  'safe-isolation': AlertTriangle,
  'fault-finding': Search,
};

const QuizAssessmentSection = ({ onBack }: QuizAssessmentSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const assessments = getAllAssessments();

  const handleStartQuiz = (assessmentId: string) => {
    navigate(`/quiz/${assessmentId}`, {
      state: { from: location.pathname },
    });
  };

  const beginnerAssessments = assessments.filter((a) => a.difficulty === 'Beginner');
  const intermediateAssessments = assessments.filter((a) => a.difficulty === 'Intermediate');
  const advancedAssessments = assessments.filter((a) => a.difficulty === 'Advanced');

  const renderSection = (title: string, items: typeof assessments) => {
    if (items.length === 0) return null;
    return (
      <>
        <motion.div variants={itemVariants}>
          <p className="text-[11px] font-bold text-white uppercase tracking-widest px-0.5 mb-2 mt-2">
            {title}
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            {items.map((assessment) => {
              const Icon = iconMap[assessment.id] || Zap;
              return (
                <BusinessCard
                  key={assessment.id}
                  title={assessment.title}
                  description={`${assessment.questions} questions`}
                  icon={Icon}
                  onClick={() => handleStartQuiz(assessment.id)}
                  variant="hero"
                />
              );
            })}
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Knowledge Quiz</h1>
              <p className="text-[10px] text-white">2391-style questions</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-4">
            <p className="text-sm text-white leading-relaxed">
              Test your inspection and testing knowledge with 2391-style questions. Each quiz randomly selects 20 questions from a bank of 50. Explanations shown after every answer.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-3 text-center">
              <p className="text-lg font-black text-yellow-400">460</p>
              <p className="text-[10px] text-white">Questions</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-3 text-center">
              <p className="text-lg font-black text-white">10</p>
              <p className="text-[10px] text-white">Topics</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-3 text-center">
              <p className="text-lg font-black text-white">70%</p>
              <p className="text-[10px] text-white">Pass Mark</p>
            </div>
          </div>
        </motion.div>

        {renderSection('Beginner', beginnerAssessments)}
        {renderSection('Intermediate', intermediateAssessments)}
        {renderSection('Advanced', advancedAssessments)}
      </motion.div>
    </div>
  );
};

export default QuizAssessmentSection;
