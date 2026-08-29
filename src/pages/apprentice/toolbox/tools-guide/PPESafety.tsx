/**
 * Tools · PPESafety — editorial PPE & safety equipment page.
 *
 * Wraps the shared PPETab component with editorial chrome.
 */

import { motion } from 'framer-motion';
import { Shield, HardHat, Eye, Star } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import PPETab from '@/components/apprentice/tools-guide/PPETab';

const quickStats = [
  { label: 'Basic PPE items', value: '5+', icon: Shield },
  { label: 'Specialist PPE', value: '5+', icon: HardHat },
  { label: 'BS standards', value: '6+', icon: Eye },
  { label: 'Safety priority', value: '#1', icon: Star },
];

const PPESafety = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · PPE"
        title="PPE & safety equipment"
        backTo="/apprentice/toolbox/tools-guide"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          {
            'Hard hats, eye protection, gloves, arc-flash kit and the bits most apprentices forget. Standards, fit, and what actually saves you on a real job.'
          }
        </p>

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
                <p className="text-[18px] sm:text-[20px] font-mono font-semibold tabular-nums text-elec-yellow leading-none">
                  {stat.value}
                </p>
                <Eyebrow className="text-[9.5px]">{stat.label}</Eyebrow>
              </div>
            );
          })}
        </motion.div>

        {/* ── PPE content ─────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
            <PPETab />
          </div>
        </motion.div>
      </HubBody>
    </HubPage>
  );
};

export default PPESafety;
