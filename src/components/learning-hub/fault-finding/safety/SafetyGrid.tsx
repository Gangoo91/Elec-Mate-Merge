import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Shield,
  HardHat,
  Lock,
  AlertTriangle,
  BookOpen,
  ClipboardCheck
} from 'lucide-react';
import { safetyTopics, SafetyTopic } from '../data/faultFindingData';
import { cn } from '@/lib/utils';

interface SafetyGridProps {
  onSelectTopic: (topicId: string) => void;
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

const getCategoryConfig = (category: string, priority: string) => {
  const iconMap: Record<string, React.ElementType> = {
    'safety': Shield,
    'equipment': HardHat,
    'procedures': Lock,
    'emergency': AlertTriangle,
    'legal': BookOpen,
    'assessment': ClipboardCheck
  };

  const colorMap: Record<string, string> = {
    'critical': 'bg-red-500',
    'high': 'bg-orange-500',
    'essential': 'bg-amber-500'
  };

  return {
    icon: iconMap[category] || Shield,
    iconBg: colorMap[priority] || 'bg-amber-500'
  };
};

const SafetyGrid = ({ onSelectTopic }: SafetyGridProps) => {
  // Group by priority
  const criticalTopics = safetyTopics.filter(t => t.priority === 'critical');
  const highTopics = safetyTopics.filter(t => t.priority === 'high');
  const essentialTopics = safetyTopics.filter(t => t.priority === 'essential');

  const renderTopic = (topic: SafetyTopic) => {
    const config = getCategoryConfig(topic.category, topic.priority);
    const Icon = config.icon;

    return (
      <motion.div
        key={topic.id}
        variants={itemVariants}
        onClick={() => onSelectTopic(topic.id)}
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
            {topic.title}
          </h3>
          <p className="text-[13px] text-white/50 leading-tight mt-0.5 line-clamp-1">
            {topic.description}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <ChevronRight className="h-4 w-4 text-white/20" />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Critical */}
      {criticalTopics.length > 0 && (
        <div>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Critical
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-red-500/20 overflow-hidden divide-y divide-white/[0.06]">
            {criticalTopics.map(renderTopic)}
          </div>
        </div>
      )}

      {/* High Priority */}
      {highTopics.length > 0 && (
        <div>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            High Priority
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {highTopics.map(renderTopic)}
          </div>
        </div>
      )}

      {/* Essential */}
      {essentialTopics.length > 0 && (
        <div>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Essential
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {essentialTopics.map(renderTopic)}
          </div>
        </div>
      )}

      {/* Safety reminder */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02]">
          <AlertTriangle className="h-4 w-4 text-white/30 flex-shrink-0" />
          <p className="text-[12px] text-white/40">
            Always prioritise safety over speed of diagnosis
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SafetyGrid;
