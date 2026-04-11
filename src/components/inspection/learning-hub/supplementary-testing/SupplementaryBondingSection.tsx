import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const whenRequired = [
  'Bathrooms and shower rooms (Section 701) — where the disconnection time conditions of Reg 411.3.2 cannot be met',
  'Swimming pools and fountains (Section 702) — mandatory supplementary bonding in all zones',
  'Medical locations (Section 710) — specific bonding requirements for patient areas',
  'Agricultural premises (Section 705) — bonding to metallic structures accessible to livestock',
  'Where local supplementary equipotential bonding is needed to limit touch voltages',
];

const whatToBond = [
  { item: 'Metallic pipework', detail: 'Gas, water, central heating, oil — bond at the point of entry to the room or as close as practicable to accessible metalwork' },
  { item: 'Metallic baths and shower trays', detail: 'Bond to the earth terminal of the bath/shower. Modern plastic baths/trays do not require bonding.' },
  { item: 'Structural steelwork', detail: 'If accessible and could introduce a potential — bond to the local CPC or earth terminal' },
  { item: 'Metallic door and window frames', detail: 'In special locations only — if they could introduce a potential from outside the equipotential zone' },
  { item: 'Cable containment systems', detail: 'Metallic trunking, conduit, and cable tray — verify continuity throughout' },
];

const testProcedure = [
  'Isolate relevant circuits if termination access requires it and prove dead',
  'Visually inspect bonding route and clamps for corrosion and accessibility',
  'Measure continuity between bonded items and the CPC using a low-resistance tester',
  'Record values — acceptance: ≤0.5Ω for supplementary bonding',
  'Check conductor is mechanically secure and routed to avoid damage',
  'Verify conductor sizing meets BS 7671 Table 54.8 requirements',
];

const commonDefects = [
  { defect: 'Inaccessible clamps', detail: 'Bonding clamps hidden behind boxing, tiling, or panels. Clamps must remain accessible for inspection and testing.' },
  { defect: 'Undersized bonding conductor', detail: 'Must be at least 4mm² for connections between extraneous-conductive-parts, or 2.5mm² if mechanically protected.' },
  { defect: 'Corroded clamps at pipework', detail: 'Dissimilar metals cause galvanic corrosion. Use appropriate clamp materials for the pipe type.' },
  { defect: 'Bonds interrupted by plastic pipe sections', detail: 'Plastic fittings or meter replacements can break the metallic continuity. Re-bond downstream of the plastic section.' },
];

const SupplementaryBondingSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Supplementary Bonding</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">When Supplementary Bonding Is Required</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-1.5">
              {whenRequired.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What to Bond</p>
        </motion.div>

        {whatToBond.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.item}</p>
              <p className="text-sm text-white mt-1">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Test Procedure</p>
        </motion.div>

        {testProcedure.map((step, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
              </div>
              <p className="text-sm text-white pt-1">{step}</p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Defects</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            {commonDefects.map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-sm font-medium text-white">{item.defect}</p>
                <p className="text-sm text-white mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SupplementaryBondingSection;
