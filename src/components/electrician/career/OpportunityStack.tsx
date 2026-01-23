/**
 * OpportunityStack - Vertical stack of opportunity cards
 *
 * Features:
 * - Full-width cards stacked vertically
 * - Shows first 3 by default with "Show more"
 * - Prominent rate display
 * - Mobile-first design
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Opportunity {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  rate: string;
  requirement: string;
  growth: string;
}

interface OpportunityStackProps {
  opportunities: Opportunity[];
  initialCount?: number;
}

const colorStyles: Record<string, { bg: string; icon: string; rate: string; growth: string }> = {
  green: {
    bg: 'bg-green-500/10',
    icon: 'text-green-400',
    rate: 'text-green-400',
    growth: 'text-green-400/70',
  },
  blue: {
    bg: 'bg-blue-500/10',
    icon: 'text-blue-400',
    rate: 'text-blue-400',
    growth: 'text-blue-400/70',
  },
  purple: {
    bg: 'bg-purple-500/10',
    icon: 'text-purple-400',
    rate: 'text-purple-400',
    growth: 'text-purple-400/70',
  },
  orange: {
    bg: 'bg-orange-500/10',
    icon: 'text-orange-400',
    rate: 'text-orange-400',
    growth: 'text-orange-400/70',
  },
  red: {
    bg: 'bg-red-500/10',
    icon: 'text-red-400',
    rate: 'text-red-400',
    growth: 'text-red-400/70',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    icon: 'text-cyan-400',
    rate: 'text-cyan-400',
    growth: 'text-cyan-400/70',
  },
};

const OpportunityCard: React.FC<{ opportunity: Opportunity; index: number }> = ({
  opportunity,
  index,
}) => {
  const { title, description, icon: Icon, color, rate, requirement, growth } = opportunity;
  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="bg-white/[0.03] border border-white/10 rounded-xl p-4 touch-manipulation"
    >
      {/* Header: Icon + Title + Rate */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={cn("p-2.5 rounded-xl flex-shrink-0", styles.bg)}>
            <Icon className={cn("h-5 w-5", styles.icon)} />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-white text-[15px] leading-tight">
              {title}
            </h4>
            <p className="text-[13px] text-white/50 line-clamp-1 mt-0.5">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 border-t border-white/[0.06]">
        {/* Rate - Primary */}
        <div className="flex items-center gap-1.5">
          <span className={cn("font-bold text-base", styles.rate)}>
            {rate}
          </span>
        </div>

        {/* Growth */}
        <div className="flex items-center gap-1.5">
          <TrendingUp className={cn("h-3.5 w-3.5", styles.growth)} />
          <span className="text-xs text-white/50">
            {growth.replace('Growth: ', '')}
          </span>
        </div>
      </div>

      {/* Requirement */}
      <div className="mt-2.5 text-xs text-white/40">
        {requirement.replace('Required: ', '')}
      </div>
    </motion.div>
  );
};

export const OpportunityStack: React.FC<OpportunityStackProps> = ({
  opportunities,
  initialCount = 3,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedOpportunities = showAll
    ? opportunities
    : opportunities.slice(0, initialCount);
  const hasMore = opportunities.length > initialCount;

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {displayedOpportunities.map((opp, index) => (
          <OpportunityCard key={opp.title} opportunity={opp} index={index} />
        ))}
      </AnimatePresence>

      {hasMore && (
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="w-full h-12 text-white/60 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
        >
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Show {opportunities.length - initialCount} more roles
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default OpportunityStack;
