
import React from 'react';
import { motion } from 'framer-motion';
import { TestingProcedure } from './TestingProcedureData';
import {
  Shield,
  Zap,
  RotateCcw,
  Target,
  Settings,
  Activity,
  FileText,
  ClipboardList,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestingProceduresGridProps {
  procedures: TestingProcedure[];
  onStartProcedure: (procedure: TestingProcedure) => void;
  onStartSafeIsolation: () => void;
  onStartContinuityTesting: () => void;
  onStartInsulationTesting: () => void;
  onStartPolarityTesting: () => void;
  onStartZsTesting: () => void;
  onStartRcdTesting: () => void;
  onStartPfcTesting: () => void;
  onStartFunctionalTesting: () => void;
  onStartSupplementaryTesting: () => void;
  onStartCertificateGuide?: () => void;
  onStartScheduleGuide?: () => void;
  onPreviewProcedure: (procedure: TestingProcedure) => void;
  onClearFilters: () => void;
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

interface ProcedureItemProps {
  icon: React.ElementType;
  iconBg: string;
  title: string;
  subtitle: string;
  duration: string;
  onClick: () => void;
  isLive?: boolean;
}

const ProcedureItem = ({ icon: Icon, iconBg, title, subtitle, duration, onClick, isLive }: ProcedureItemProps) => (
  <motion.div
    variants={itemVariants}
    onClick={onClick}
    className="flex items-center gap-3 p-3.5 cursor-pointer touch-manipulation active:bg-white/[0.04] transition-colors"
  >
    <div className={cn(
      "w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0",
      iconBg
    )}>
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-[15px] font-medium text-white leading-tight">
        {title}
      </h3>
      <p className="text-[13px] text-white/50 leading-tight mt-0.5">
        {subtitle}
      </p>
    </div>
    <div className="flex items-center gap-2 flex-shrink-0">
      {isLive && (
        <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
      )}
      <span className="text-[13px] text-white/30">{duration}</span>
      <ChevronRight className="h-4 w-4 text-white/20" />
    </div>
  </motion.div>
);

const TestingProceduresGrid = ({
  procedures,
  onStartProcedure,
  onStartSafeIsolation,
  onStartContinuityTesting,
  onStartInsulationTesting,
  onStartPolarityTesting,
  onStartZsTesting,
  onStartRcdTesting,
  onStartPfcTesting,
  onStartFunctionalTesting,
  onStartSupplementaryTesting,
  onStartCertificateGuide,
  onStartScheduleGuide,
  onPreviewProcedure,
  onClearFilters
}: TestingProceduresGridProps) => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Safety Procedure - Critical */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Safety Critical
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-red-500/20 overflow-hidden">
          <ProcedureItem
            icon={Shield}
            iconBg="bg-red-500"
            title="Safe Isolation"
            subtitle="BS 7671 Regulation 612.1"
            duration="15-20 min"
            onClick={onStartSafeIsolation}
          />
        </div>
      </div>

      {/* Dead Tests */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Dead Tests
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          <ProcedureItem
            icon={Zap}
            iconBg="bg-blue-500"
            title="Continuity Testing"
            subtitle="BS 7671 Section 612.2"
            duration="20-30 min"
            onClick={onStartContinuityTesting}
          />
          <ProcedureItem
            icon={Zap}
            iconBg="bg-purple-500"
            title="Insulation Resistance"
            subtitle="BS 7671 Section 612.3"
            duration="15-25 min"
            onClick={onStartInsulationTesting}
          />
          <ProcedureItem
            icon={RotateCcw}
            iconBg="bg-indigo-500"
            title="Polarity Testing"
            subtitle="BS 7671 Section 612.6"
            duration="10-20 min"
            onClick={onStartPolarityTesting}
          />
        </div>
      </div>

      {/* Live Tests */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Live Tests
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          <ProcedureItem
            icon={Target}
            iconBg="bg-red-500"
            title="Zs Testing"
            subtitle="BS 7671 Sections 612.9 & 411.4.5"
            duration="15-25 min"
            onClick={onStartZsTesting}
            isLive
          />
          <ProcedureItem
            icon={Shield}
            iconBg="bg-teal-500"
            title="RCD Testing"
            subtitle="BS 7671 Sections 612.10 & 612.13"
            duration="10-15 min"
            onClick={onStartRcdTesting}
            isLive
          />
          <ProcedureItem
            icon={Target}
            iconBg="bg-orange-500"
            title="PFC Testing"
            subtitle="BS 7671 Sections 612.11 & 434.5.2"
            duration="10-20 min"
            onClick={onStartPfcTesting}
            isLive
          />
        </div>
      </div>

      {/* Functional & Additional */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Functional & Additional
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          <ProcedureItem
            icon={Settings}
            iconBg="bg-green-500"
            title="Functional Testing"
            subtitle="BS 7671 Section 612.13"
            duration="20-30 min"
            onClick={onStartFunctionalTesting}
          />
          <ProcedureItem
            icon={Activity}
            iconBg="bg-violet-500"
            title="Supplementary Testing"
            subtitle="BS 7671 Various Sections"
            duration="Varies"
            onClick={onStartSupplementaryTesting}
          />
        </div>
      </div>

      {/* Documentation Guides */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Documentation
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          <ProcedureItem
            icon={FileText}
            iconBg="bg-cyan-500"
            title="Certificate Guide"
            subtitle="BS 7671 Compliance"
            duration="Reference"
            onClick={() => onStartCertificateGuide?.()}
          />
          <ProcedureItem
            icon={ClipboardList}
            iconBg="bg-emerald-500"
            title="Schedule Guide"
            subtitle="Testing Standards"
            duration="Reference"
            onClick={() => onStartScheduleGuide?.()}
          />
        </div>
      </div>

      {/* Additional Procedures from props */}
      {procedures.length > 0 && (
        <div>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Additional Procedures
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {procedures.map((procedure) => (
              <ProcedureItem
                key={procedure.id}
                icon={Zap}
                iconBg="bg-amber-500"
                title={procedure.title}
                subtitle={procedure.regulation || 'BS 7671'}
                duration={procedure.estimatedTime || 'Varies'}
                onClick={() => onStartProcedure(procedure)}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TestingProceduresGrid;
