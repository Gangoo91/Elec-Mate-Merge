/**
 * Tools · PowerTools — editorial power tools page.
 *
 * Wraps the shared PowerToolsTab component with editorial chrome.
 */

import { motion } from 'framer-motion';
import { Zap, Star, Shield, CircuitBoard } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import PowerToolsTab from '@/components/apprentice/tools-guide/PowerToolsTab';

const quickStats = [
  { label: 'Tool categories', value: '3', icon: CircuitBoard },
  { label: 'Essential tools', value: '8+', icon: Zap },
  { label: 'Safety focus', value: '100%', icon: Shield },
  { label: 'UK standards', value: 'PAT', icon: Star },
];

const PowerTools = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Power tools"
        title="Power tools"
        backTo="/apprentice/toolbox/tools-guide"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          {
            'Cordless drills, SDS, jigsaws, multi-tools and inspection cameras. Battery platforms, PAT testing rules, and what to actually carry to a first-fix.'
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

        {/* ── Power tools content ─────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
            <PowerToolsTab />
          </div>
        </motion.div>
      </HubBody>
    </HubPage>
  );
};

export default PowerTools;
