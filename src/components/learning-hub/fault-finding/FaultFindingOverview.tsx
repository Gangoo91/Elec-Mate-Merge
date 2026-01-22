import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Target,
  Search,
  Shield,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewMode =
  | 'overview'
  | 'common-faults'
  | 'common-fault-detail'
  | 'real-world'
  | 'case-detail'
  | 'diagnostics'
  | 'diagnostic-detail'
  | 'methodology'
  | 'safety'
  | 'safety-detail'
  | 'equipment'
  | 'equipment-detail';

interface FaultFindingOverviewProps {
  onNavigate: (view: ViewMode) => void;
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

interface HubItem {
  id: ViewMode;
  title: string;
  subtitle: string;
  count: string;
  icon: React.ElementType;
  iconBg: string;
}

const FaultFindingOverview = ({ onNavigate }: FaultFindingOverviewProps) => {
  const diagnosticItems: HubItem[] = [
    {
      id: 'common-faults',
      title: 'Common Faults',
      subtitle: 'Fault types & theory',
      count: '6 types',
      icon: AlertTriangle,
      iconBg: 'bg-red-500'
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics',
      subtitle: 'Search symptoms & causes',
      count: '25+ guides',
      icon: Search,
      iconBg: 'bg-green-500'
    },
    {
      id: 'methodology',
      title: 'Methodology',
      subtitle: 'Step-by-step process',
      count: '8 steps',
      icon: Target,
      iconBg: 'bg-purple-500'
    }
  ];

  const practicalItems: HubItem[] = [
    {
      id: 'real-world',
      title: 'Real-World Cases',
      subtitle: 'Practical case studies',
      count: '35+ cases',
      icon: Target,
      iconBg: 'bg-blue-500'
    },
    {
      id: 'safety',
      title: 'Safety Protocols',
      subtitle: 'Critical safety info',
      count: '6 topics',
      icon: Shield,
      iconBg: 'bg-orange-500'
    },
    {
      id: 'equipment',
      title: 'Equipment Guides',
      subtitle: 'Test instruments',
      count: '6 tools',
      icon: Wrench,
      iconBg: 'bg-cyan-500'
    }
  ];

  const renderItem = (item: HubItem) => {
    const Icon = item.icon;
    return (
      <motion.div
        key={item.id}
        variants={itemVariants}
        onClick={() => onNavigate(item.id)}
        className="flex items-center gap-3 p-3.5 cursor-pointer touch-manipulation active:bg-white/[0.04] transition-colors"
      >
        <div className={cn(
          "w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0",
          item.iconBg
        )}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium text-white leading-tight">
            {item.title}
          </h3>
          <p className="text-[13px] text-white/50 leading-tight mt-0.5">
            {item.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[13px] text-white/30">{item.count}</span>
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
      {/* Diagnostic Tools */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Diagnostic Tools
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {diagnosticItems.map(renderItem)}
        </div>
      </div>

      {/* Practical Resources */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Practical Resources
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {practicalItems.map(renderItem)}
        </div>
      </div>

      {/* Safety reminder */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02]">
          <Shield className="h-4 w-4 text-white/30 flex-shrink-0" />
          <p className="text-[12px] text-white/40">
            Always isolate safely before fault diagnosis
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FaultFindingOverview;
