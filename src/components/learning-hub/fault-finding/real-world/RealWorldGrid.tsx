import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Activity, Shield, Eye, Target } from 'lucide-react';
import { realWorldFaultCategories, RealWorldFaultCategory } from '../data/faultFindingData';
import { cn } from '@/lib/utils';

interface RealWorldGridProps {
  onSelectCategory: (categoryId: string) => void;
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

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'overcurrent':
      return { icon: Zap, iconBg: 'bg-red-500' };
    case 'earthing':
      return { icon: Activity, iconBg: 'bg-green-500' };
    case 'insulation':
      return { icon: Shield, iconBg: 'bg-purple-500' };
    case 'supply_issues':
      return { icon: Eye, iconBg: 'bg-cyan-500' };
    default:
      return { icon: Target, iconBg: 'bg-blue-500' };
  }
};

const RealWorldGrid = ({ onSelectCategory }: RealWorldGridProps) => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Case Categories */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Case Study Categories
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {realWorldFaultCategories.map((category: RealWorldFaultCategory) => {
            const config = getCategoryConfig(category.category);
            const Icon = config.icon;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                onClick={() => onSelectCategory(category.id)}
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
                    {category.title}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-tight mt-0.5 line-clamp-1">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[13px] text-white/30">{category.examples.length} cases</span>
                  <ChevronRight className="h-4 w-4 text-white/20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info notice */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02]">
          <Target className="h-4 w-4 text-white/30 flex-shrink-0" />
          <p className="text-[12px] text-white/40">
            Based on real fault-finding scenarios with detailed solutions
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RealWorldGrid;
