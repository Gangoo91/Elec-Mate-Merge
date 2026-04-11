import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const instruments = [
  { name: 'Multifunction Tester (MFT)', faults: 'Insulation faults, continuity breaks, earth faults, Zs/PFC issues', description: 'The primary fault-finding instrument. Combines IR, continuity, Zs, PFC, and RCD testing in one unit. Essential for systematic diagnosis.', tips: ['Prove before every use', 'Check calibration date — out-of-cal readings are useless', 'Battery condition affects accuracy — charge before fault finding jobs'] },
  { name: 'Clamp Meter', faults: 'Overloads, unbalanced loads, earth leakage, current measurement', description: 'Non-invasive current measurement. Clamp around a single conductor to read current without breaking the circuit. Essential for diagnosing overloads and leakage.', tips: ['Clamp around ONE conductor only — L and N together reads zero', 'DC clamp function needed for solar PV and battery circuits', 'Earth leakage: clamp around L and N together — any reading is leakage current'] },
  { name: 'Voltage Indicator (Two-Pole)', faults: 'Supply problems, loose neutrals, live/dead verification', description: 'GS38-compliant voltage indicator for proving dead and measuring supply voltage. Must have fused probes, finger guards, and be proved on a known source.', tips: ['NEVER use a non-contact voltage detector (NCVD) as primary test', 'Prove → Test → Prove. The three-step test. Every time.', 'Check for voltage between N and E — should be near zero. High N-E = loose neutral'] },
  { name: 'Thermal Imaging Camera', faults: 'Loose connections, overloaded conductors, high-resistance joints, failing components', description: 'Non-contact temperature measurement. Identifies hot spots invisible to the eye. Increasingly affordable and essential for modern fault finding.', tips: ['Scan under normal load — unloaded circuits do not show thermal faults', 'Compare similar connections — a hot one among cool ones indicates a fault', 'Clean emissivity from reflective surfaces for accurate readings'] },
  { name: 'Socket Tester', faults: 'Polarity errors, missing earth, wiring faults at sockets', description: 'Plug-in device that checks socket wiring. Shows correct polarity, missing earth, reversed L/N. Quick screening tool — not a substitute for proper testing.', tips: ['Cannot detect all faults — will miss some dangerous conditions', 'Use as a screening tool, not as a definitive test', 'Some advanced models include RCD trip testing'] },
  { name: 'Non-Contact Voltage Detector (NCVD)', faults: 'Proximity voltage detection — screening tool only', description: 'Detects the presence of AC voltage without contact. Useful for initial screening of cables and accessories. NOT suitable for proving dead.', tips: ['SCREENING ONLY — cannot be used to prove dead', 'May not detect DC, shielded cables, or low voltages', 'Use to identify which cables are live before isolation — then prove dead with a two-pole tester'] },
  { name: 'Proving Unit', faults: 'Verification of test instrument operation', description: 'Provides a known voltage source to prove a voltage indicator is working correctly before and after proving dead. Mandatory part of the safe isolation kit.', tips: ['Prove the voltage indicator on the proving unit BEFORE testing the circuit', 'Prove AGAIN after testing — confirms the tester was working throughout', 'Battery-powered — check it is charged and functioning'] },
];

const EquipmentSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Equipment</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              The right instrument for the right fault. Choosing the correct test tool first saves time and gives you reliable diagnostic data. Always prove instruments before use and check calibration certificates.
            </p>
          </div>
        </motion.div>

        {instruments.map((inst, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{inst.name}</p>
              <p className="text-xs text-yellow-400/80">{inst.faults}</p>
              <p className="text-sm text-white/80 leading-relaxed">{inst.description}</p>
              <div className="space-y-1.5">
                {inst.tips.map((tip, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                    <p className="text-xs text-white">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EquipmentSection;
