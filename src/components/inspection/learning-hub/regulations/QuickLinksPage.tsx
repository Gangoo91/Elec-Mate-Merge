import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const testRegLinks = [
  { test: 'Safe Isolation', regs: ['Reg 132.15 — Provision for isolation', 'Reg 133.2 — Disconnecting devices', 'Reg 537.3 — Emergency switching', 'EAW Reg 12, 13, 14 — Dead/live working', 'GS38 — Test equipment requirements'] },
  { test: 'Continuity Testing', regs: ['Reg 612.2 — Continuity of protective conductors', 'Reg 543 — Earthing conductor requirements', 'Table 54.7 — Minimum conductor sizes'] },
  { test: 'Insulation Resistance', regs: ['Reg 612.3 — IR test requirements', 'Reg 643.3 — Initial verification', 'Table 61 — Minimum IR values by voltage'] },
  { test: 'Polarity', regs: ['Reg 612.6 — Polarity verification', 'Reg 133.2 — Single-pole devices in line only', 'Reg 463.1.2 — Domestic lighting switching', 'Reg 533.3 — Fuse base connections'] },
  { test: 'Zs Testing', regs: ['Reg 411.3.2 — Disconnection times', 'Reg 134.2.2 — Zs definition', 'Reg 643.7 — Zs measurement', 'Appendix 3 — Maximum Zs tables'] },
  { test: 'PFC Testing', regs: ['Reg 612.11 — PFC measurement', 'Reg 434.5.2 — Fault current calculation', 'Reg 131.5 — Conductor withstand'] },
  { test: 'RCD Testing', regs: ['Reg 411.3.3 — Additional RCD protection', 'Reg 531.2 — RCD type selection', 'Reg 514.12.2 — Test notice', 'Reg 612.13 — RCD testing', 'GN3 Table 2.17 — Trip time limits'] },
  { test: 'Functional Testing', regs: ['Reg 612.13 — Functional test requirement', 'Reg 537.3 — Emergency switching', 'Reg 514.8 — Circuit chart'] },
];

const specialLocationRegs = [
  { location: 'Bathrooms (Section 701)', key: '30mA RCD on all circuits, IP ratings by zone, supplementary bonding where required' },
  { location: 'Swimming Pools (Section 702)', key: 'SELV/PELV in zones, mandatory supplementary bonding, specific IP ratings' },
  { location: 'Construction Sites (Section 704)', key: '30mA RCD on all socket outlets, reduced voltage for portable tools' },
  { location: 'Agricultural (Section 705)', key: 'RCD on all circuits, supplementary bonding, IP ratings for livestock areas' },
  { location: 'Medical Locations (Section 710)', key: 'Group classifications, IT systems, specific RCD/AFDD requirements' },
  { location: 'EV Charging (Section 722)', key: 'Type A-EV or Type B RCD, PME considerations, dynamic load management' },
  { location: 'Solar PV (Section 712)', key: 'DC isolation, labelling, anti-islanding, earthing arrangements' },
  { location: 'Prosumer (Chapter 82 — NEW)', key: 'EEMS, battery storage, V2G, operating modes, DNO interface' },
];

const QuickLinksPage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Quick Links</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Key regulations grouped by test type and special location. Each test page in the I&amp;T Hub has its own detailed regulations section — these links show which regulations apply to each test at a glance.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Regulations by Test Type</p>
        </motion.div>

        {testRegLinks.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white mb-2">{item.test}</p>
              <div className="space-y-1">
                {item.regs.map((reg, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5" />
                    <p className="text-xs text-white">{reg}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Special Locations — Part 7 &amp; 8</p>
        </motion.div>

        {specialLocationRegs.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.location}</p>
              <p className="text-sm text-white mt-1">{item.key}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default QuickLinksPage;
