import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const bs7671Regs = [
  { number: 'Reg 612', title: 'Verification by Testing', description: 'All tests required for initial verification — continuity, IR, polarity, Zs, PFC, RCD, functional. These same tests form the basis of fault diagnosis.' },
  { number: 'Reg 643', title: 'Periodic Inspection & Testing', description: 'Periodic testing to verify continued safety. Fault finding during EICR often reveals deterioration, loose connections, and insulation breakdown.' },
  { number: 'Reg 514.12.2', title: 'RCD Test Notice', description: 'Users should test RCDs regularly. A failed RCD test button is a fault requiring investigation — not just replacement.' },
  { number: 'Reg 514.8', title: 'Circuit Chart', description: 'Accurate circuit charts are essential for fault finding. If the chart is wrong, you may isolate the wrong circuit or miss the fault entirely.' },
  { number: 'Reg 133.2', title: 'Disconnecting Devices for Fault Finding', description: 'Disconnecting devices shall be provided to permit safe switching and isolation for fault finding. Every circuit must be individually isolatable to allow systematic fault diagnosis.' },
  { number: 'Reg 132.12', title: 'Access for Fault Finding', description: 'Consumer units must be sited and arranged to allow safe access, adequate working clearances and unobstructed means of isolation for routine maintenance and fault finding.' },
  { number: 'Reg 515.2', title: 'Circuit Identification', description: 'Protective devices must be arranged and identified so the circuit they protect can be easily recognised, facilitating safe operation, maintenance and fault finding at distribution panels.' },
];

const eawRegs = [
  { number: 'EAW Reg 4', title: 'Systems to Be Safe', description: 'Systems must be maintained to prevent danger. This creates a duty to investigate and rectify faults — not just reset tripped devices.' },
  { number: 'EAW Reg 13', title: 'Dead Working', description: 'Adequate precautions shall prevent equipment made dead from becoming live during fault finding work. Lock-off and prove dead before every investigation.' },
  { number: 'EAW Reg 14', title: 'Live Working', description: 'Live testing during fault finding (Zs, PFC, voltage measurement) is justified because these tests require an energised circuit. Live WORK (making connections) requires all three conditions to be met.' },
  { number: 'EAW Reg 16', title: 'Competence', description: 'No person shall work on electrical systems unless they possess sufficient competence, or are under adequate supervision. Complex fault finding may require specialist expertise.' },
];

const otherStandards = [
  { standard: 'GS38', detail: 'HSE guidance on electrical test equipment. All voltage indicators used during fault finding must comply — fused probes, finger guards, and proving units are mandatory.' },
  { standard: 'IET Guidance Note 3', detail: 'Section 3 — Fault finding. Covers systematic approach, test selection, result interpretation, and documentation requirements.' },
  { standard: 'BS 7671 Appendix 6', detail: 'Model forms for reporting. Fault finding results should be recorded systematically using appropriate certification (EIC, EICR, or Minor Works).' },
];

const eicrCoding = [
  { code: 'C1', description: 'Danger present', examples: 'Active short circuit, live exposed metalwork, missing earth on socket, broken CPC leaving circuit unprotected' },
  { code: 'C2', description: 'Potentially dangerous', examples: 'IR below 1MΩ, Zs exceeding limits, RCD not tripping within time, loose connections causing overheating' },
  { code: 'C3', description: 'Improvement recommended', examples: 'Declining IR trend, borderline Zs readings, aged cables, lack of RCD protection where now recommended' },
  { code: 'FI', description: 'Further investigation', examples: 'Unable to fully diagnose during inspection — requires invasive investigation, specialist equipment, or extended testing' },
];

const FaultFindingRegulations = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Regulations</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">BS 7671:2018+A3:2024</p>
        </motion.div>

        {bs7671Regs.map((reg, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1.5">
                  <span className="text-xs font-bold text-yellow-400 whitespace-nowrap">{reg.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{reg.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{reg.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Electricity at Work Regulations 1989</p>
        </motion.div>

        {eawRegs.map((reg, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-xl bg-orange-400/10 border border-orange-400/20 px-2.5 py-1.5">
                  <span className="text-xs font-bold text-orange-400 whitespace-nowrap">{reg.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{reg.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{reg.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Other Standards</p>
        </motion.div>

        {otherStandards.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.standard}</p>
              <p className="text-sm text-white mt-1 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">EICR Coding for Faults</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            {eicrCoding.map((item, i) => (
              <div key={i} className={`p-3 flex items-start gap-3 ${i < eicrCoding.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
                <div className={`flex-shrink-0 rounded-lg px-2 py-1 ${item.code === 'C1' ? 'bg-red-400/20 border border-red-400/30' : item.code === 'C2' ? 'bg-orange-400/20 border border-orange-400/30' : item.code === 'C3' ? 'bg-yellow-400/20 border border-yellow-400/30' : 'bg-blue-400/20 border border-blue-400/30'}`}>
                  <span className={`text-xs font-bold ${item.code === 'C1' ? 'text-red-400' : item.code === 'C2' ? 'text-orange-400' : item.code === 'C3' ? 'text-yellow-400' : 'text-blue-400'}`}>{item.code}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.description}</p>
                  <p className="text-xs text-white/60 mt-0.5">{item.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FaultFindingRegulations;
