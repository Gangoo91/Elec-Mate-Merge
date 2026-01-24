
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Zap,
  Shield,
  Clock,
  Wrench,
  Brain,
  ChevronRight,
} from 'lucide-react';
import { LearningSection } from '../LearningHub';
import { cn } from '@/lib/utils';

interface LearningHubOverviewProps {
  onNavigateToSection: (section: LearningSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
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

const LearningHubOverview = ({ onNavigateToSection }: LearningHubOverviewProps) => {
  const navigate = useNavigate();

  const learningModules = [
    {
      id: 'testing' as LearningSection,
      title: 'Testing Procedures',
      subtitle: 'Continuity, IR, RCD & Zs testing',
      icon: Zap,
      iconBg: 'bg-amber-500',
      duration: '35 min',
    },
    {
      id: 'fault-finding' as LearningSection,
      title: 'Fault Finding',
      subtitle: 'Earth faults, shorts & open circuits',
      icon: Wrench,
      iconBg: 'bg-red-500',
      duration: '40 min',
    },
    {
      id: 'regulations' as LearningSection,
      title: 'Regulations',
      subtitle: 'BS 7671 tables & Zs values',
      icon: BookOpen,
      iconBg: 'bg-blue-500',
      duration: '45 min',
    },
    {
      id: 'quiz' as LearningSection,
      title: 'Knowledge Quiz',
      subtitle: '2391-style questions',
      icon: Brain,
      iconBg: 'bg-purple-500',
      duration: '60 min',
    }
  ];

  const handleModuleClick = (module: typeof learningModules[0]) => {
    if (module.id === 'regulations') {
      navigate('/tools/regulation-search');
    } else {
      onNavigateToSection(module.id);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Mobile: iOS-style list | Desktop: Card grid */}

      {/* Mobile List View */}
      <div className="lg:hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
        {learningModules.map((module) => {
          const IconComponent = module.icon;

          return (
            <motion.div
              key={module.id}
              variants={itemVariants}
              onClick={() => handleModuleClick(module)}
              className="flex items-center gap-3 p-3.5 cursor-pointer touch-manipulation active:bg-white/[0.04] transition-colors"
            >
              {/* Icon */}
              <div className={cn(
                "w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0",
                module.iconBg
              )}>
                <IconComponent className="h-5 w-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-medium text-white leading-tight">
                  {module.title}
                </h3>
                <p className="text-[13px] text-white/50 leading-tight mt-0.5">
                  {module.subtitle}
                </p>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[13px] text-white/30">{module.duration}</span>
                <ChevronRight className="h-4 w-4 text-white/20" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop Card Grid */}
      <div className="hidden lg:grid grid-cols-2 gap-4">
        {learningModules.map((module) => {
          const IconComponent = module.icon;

          return (
            <motion.div
              key={module.id}
              variants={itemVariants}
              onClick={() => handleModuleClick(module)}
              className={cn(
                "group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 cursor-pointer",
                "hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg",
                  module.iconBg
                )}>
                  <IconComponent className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {module.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mt-1">
                    {module.subtitle}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                      <Clock className="h-3.5 w-3.5" />
                      {module.duration}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Safety notice */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02] lg:px-4 lg:py-3">
          <Shield className="h-4 w-4 text-white/30 flex-shrink-0" />
          <p className="text-[12px] text-white/40 lg:text-sm">
            Follow safe isolation procedures before testing
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearningHubOverview;
