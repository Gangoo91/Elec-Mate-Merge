/**
 * Tools · TestEquipment — editorial test equipment page.
 *
 * Wraps the shared TestEquipmentTab component with editorial chrome.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CircuitBoard, Shield, Zap, Star } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import TestEquipmentTab from '@/components/apprentice/tools-guide/TestEquipmentTab';

const quickStats = [
  { label: 'Basic tools', value: '5+', icon: Zap },
  { label: 'Advanced tools', value: '5+', icon: CircuitBoard },
  { label: 'UK standards', value: 'GS38', icon: Shield },
  { label: '18th Edition', value: 'BS 7671', icon: Star },
];

const TestEquipment = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/tools-guide')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Test equipment"
          title="Test equipment"
          description="Multifunction testers, clamp meters, voltage indicators, GS38 leads. What's calibrated, what's compliant, and what passes BS 7671:2018+A4:2026 testing."
          tone="yellow"
        />
      </motion.div>

      {/* ── Quick stats ─────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
      >
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4 text-center space-y-1.5"
            >
              <Icon className="h-4 w-4 text-elec-yellow/85 mx-auto" />
              <p className="text-[16px] sm:text-[20px] font-mono font-semibold tabular-nums text-elec-yellow leading-none">
                {stat.value}
              </p>
              <Eyebrow className="text-[9.5px]">{stat.label}</Eyebrow>
            </div>
          );
        })}
      </motion.div>

      {/* ── Test equipment content ──────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
          <TestEquipmentTab />
        </div>
      </motion.div>
    </PageFrame>
  );
};

export default TestEquipment;
