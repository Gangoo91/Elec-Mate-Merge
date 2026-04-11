import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const majorChanges = [
  { title: 'New Part 8 — Prosumer Installations (Chapter 82)', description: 'Entirely new chapter covering prosumer low-voltage installations — consumers who also generate and/or store energy. Covers solar PV, battery storage, EV charging with V2G, and interaction with the public network. Defines EEMS (Electrical Energy Management System) requirements.', impact: 'Electricians installing solar PV, battery storage, or V2G chargers must now comply with Chapter 82 in addition to existing Part 7 requirements.' },
  { title: 'Arc Fault Detection Devices (AFDDs)', description: 'AFDDs now required on single-phase final circuits supplying socket outlets up to 32A in Higher Risk Residential Buildings (HRRBs) and Houses in Multiple Occupation (HMOs). Recommended consideration for other domestic premises.', impact: 'Consumer unit specification changes. AFDD-compatible boards required for new HMO/HRRB work. Retrofit guidance provided for existing installations.' },
  { title: 'Updated Table 51 — Conductor Identification', description: 'DC circuit colour identification updated. New standard abbreviations for DC conductors. Affects labelling for solar PV arrays, battery storage, EV charging DC circuits, and other DC applications.', impact: 'All DC installations must use updated colour identification. Check Table 51 for correct conductor marking on PV, BESS, and EV work.' },
  { title: 'EV Charging Updates (Section 722)', description: 'Updated requirements for EV charging installations including RCD type selection (Type A with DC detection or Type B), dynamic load management, and interaction with prosumer generation and storage.', impact: 'EV charger installers must verify RCD type compliance. V2G installations fall under new Chapter 82 prosumer requirements.' },
  { title: 'Energy Storage Systems', description: 'Battery energy storage system requirements clarified under Chapter 82. Covers DC/AC coupling, isolation switching, thermal management, fire segregation, ventilation, monitoring, and interaction with EEMS.', impact: 'BESS installations now have specific regulatory requirements beyond manufacturer guidance. PAS 63100 domestic fire safety requirements reinforced.' },
  { title: 'Anti-Islanding Requirements', description: 'Mandatory anti-islanding methods for inverter-based generation. Defined disconnection times, reconnection sequencing, and coordination with RCDs and overcurrent devices to ensure network and installer safety.', impact: 'All inverter installations must have verified anti-islanding protection. Commissioning tests must include anti-islanding verification.' },
  { title: 'Appendix 13 Changes', description: 'Floor and wall insulation resistance measurement guidance removed from Appendix 13. Replaced with comprehensive guidance on protected escape routes and fire protection for electrical services.', impact: 'Historic insulation-to-earth measurement practice is no longer referenced. Focus shifts to escape route protection in fire conditions.' },
  { title: 'Earthing with Local Generation', description: 'Updated earthing and bonding arrangements where PEI changes fault current paths. Addresses PEN conductor issues, TT/TN considerations, supplementary bonding, and verification of earth fault loop impedance with local generation connected.', impact: 'Zs testing must account for local generation. Earthing arrangements may need modification when PV or storage is added to existing installations.' },
];

const A3ChangesPage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">A3:2024 Changes</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Amendment 3 (A3:2024) is the most significant update since the 18th Edition was published in 2018. The headline addition is Chapter 82 covering prosumer installations — reflecting the massive growth in solar PV, battery storage, and EV charging in UK homes and businesses.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-1">Effective Date</p>
            <p className="text-sm text-white">A3 came into effect on <span className="font-semibold text-yellow-400">2 April 2024</span>. All new installations, alterations, and additions from this date must comply with A3. Existing installations do not need to be retrospectively upgraded unless alterations are made.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Key Changes</p>
        </motion.div>

        {majorChanges.map((change, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{change.title}</p>
              <p className="text-sm text-white/80 leading-relaxed">{change.description}</p>
              <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-3">
                <p className="text-xs text-white"><span className="font-semibold text-yellow-400">Impact on your work:</span> {change.impact}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Looking Ahead — A4</p>
            <p className="text-sm text-white leading-relaxed">
              Amendment 4 (A4) is expected in due course. We will update all content in the app as soon as A4 is published. Until then, A3:2024 is the current standard and all content in this app is verified against it.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default A3ChangesPage;
