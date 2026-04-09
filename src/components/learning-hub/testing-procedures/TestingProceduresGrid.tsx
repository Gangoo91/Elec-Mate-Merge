import React from 'react';
import { motion } from 'framer-motion';
import { TestingProcedure } from './TestingProcedureData';
import { Zap, Wrench, BookOpen, Shield, Activity, Settings, FileText, ClipboardList, AlertTriangle, Target } from 'lucide-react';
import { BusinessCard } from '@/components/business-hub';

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
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

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
}: TestingProceduresGridProps) => {
  return (
    <motion.div className="space-y-5" variants={containerVariants} initial="hidden" animate="visible">
      {/* Safety Critical */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-red-400 uppercase tracking-wider px-0.5">Safety Critical</h2>
        <BusinessCard
          title="Safe Isolation"
          description="GS38 compliant procedure · 15-20 min"
          icon={Shield}
          onClick={onStartSafeIsolation}
          variant="hero"
          accentColor="from-red-500 via-rose-400 to-red-500"
          iconColor="text-red-400"
          iconBg="bg-red-500/10 border border-red-500/20"
        />
      </motion.section>

      {/* Dead Tests */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-amber-400 uppercase tracking-wider px-0.5">Dead Tests</h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Continuity"
            description="CPC & R1+R2 · 20-30 min"
            icon={Zap}
            onClick={onStartContinuityTesting}
            variant="hero"
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
          />
          <BusinessCard
            title="Insulation"
            description="IR testing · 15-25 min"
            icon={Activity}
            onClick={onStartInsulationTesting}
            variant="hero"
            accentColor="from-purple-500 via-violet-400 to-purple-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
          <BusinessCard
            title="Polarity"
            description="Dead polarity · 10-20 min"
            icon={Target}
            onClick={onStartPolarityTesting}
            variant="hero"
            accentColor="from-indigo-500 via-blue-400 to-indigo-500"
            iconColor="text-indigo-400"
            iconBg="bg-indigo-500/10 border border-indigo-500/20"
          />
        </div>
      </motion.section>

      {/* Live Tests */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-emerald-400 uppercase tracking-wider px-0.5">Live Tests</h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Zs Testing"
            description="Ze & Zs loops · 15-25 min"
            icon={Zap}
            onClick={onStartZsTesting}
            variant="hero"
            accentColor="from-emerald-500 via-green-400 to-emerald-500"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
          />
          <BusinessCard
            title="RCD Testing"
            description="Trip times · 10-15 min"
            icon={Shield}
            onClick={onStartRcdTesting}
            variant="hero"
            accentColor="from-teal-500 via-cyan-400 to-teal-500"
            iconColor="text-teal-400"
            iconBg="bg-teal-500/10 border border-teal-500/20"
          />
          <BusinessCard
            title="PFC Testing"
            description="Ipf testing · 10-20 min"
            icon={AlertTriangle}
            onClick={onStartPfcTesting}
            variant="hero"
            accentColor="from-orange-500 via-amber-400 to-orange-500"
            iconColor="text-orange-400"
            iconBg="bg-orange-500/10 border border-orange-500/20"
          />
        </div>
      </motion.section>

      {/* Functional & Additional */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Functional & Additional</h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Functional"
            description="Op. checks · 20-30 min"
            icon={Settings}
            onClick={onStartFunctionalTesting}
            variant="hero"
            accentColor="from-green-500 via-emerald-400 to-green-500"
            iconColor="text-green-400"
            iconBg="bg-green-500/10 border border-green-500/20"
          />
          <BusinessCard
            title="Supplementary"
            description="Extra tests · Varies"
            icon={Wrench}
            onClick={onStartSupplementaryTesting}
            variant="hero"
            accentColor="from-violet-500 via-purple-400 to-violet-500"
            iconColor="text-violet-400"
            iconBg="bg-violet-500/10 border border-violet-500/20"
          />
        </div>
      </motion.section>

      {/* Documentation */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Documentation</h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Certificates"
            description="BS 7671 compliance guide"
            icon={FileText}
            onClick={() => onStartCertificateGuide?.()}
            variant="hero"
            accentColor="from-cyan-500 via-blue-400 to-cyan-500"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
          />
          <BusinessCard
            title="Schedules"
            description="Testing standards reference"
            icon={ClipboardList}
            onClick={() => onStartScheduleGuide?.()}
            variant="hero"
            accentColor="from-emerald-500 via-green-400 to-emerald-500"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
          />
        </div>
      </motion.section>

      {/* Additional Procedures from props */}
      {procedures.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Additional</h2>
          <div className="grid grid-cols-2 gap-3">
            {procedures.map((procedure) => (
              <BusinessCard
                key={procedure.id}
                title={procedure.title}
                description={`${procedure.regulation || 'BS 7671'} · ${procedure.estimatedTime || 'Varies'}`}
                icon={Zap}
                onClick={() => onStartProcedure(procedure)}
                variant="hero"
                accentColor="from-amber-500 via-yellow-400 to-amber-500"
                iconColor="text-amber-400"
                iconBg="bg-amber-500/10 border border-amber-500/20"
              />
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default TestingProceduresGrid;
