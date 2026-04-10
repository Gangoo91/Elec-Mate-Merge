import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const columns = [
  { column: 'Circuit Number', detail: 'Sequential number matching the circuit chart at the distribution board. Must be consistent across chart, schedule and physical labelling.' },
  { column: 'Circuit Description', detail: 'Clear, unambiguous description: "Kitchen ring", "Upstairs lighting", "Shower". Avoid vague descriptions like "Sockets" without location.' },
  { column: 'Protective Device (Type & Rating)', detail: 'Record the actual device installed: "32A Type B MCB", "6A RCBO Type A 30mA". Include both overcurrent and RCD protection details.' },
  { column: 'Cable Type & Size', detail: 'Record the cable specification: "2.5mm² T&E (6242Y)", "1.5mm² LSZH", "4mm² SWA". Include CSA and cable type.' },
  { column: 'Reference Method', detail: 'Installation method per BS 7671 Table 4A1: Method A (enclosed in conduit in wall), Method B (clipped direct), Method C (enclosed in trunking), etc.' },
  { column: 'R1+R2 (Ω)', detail: 'Continuity of protective conductor reading. Record the measured value at the furthest point of the circuit. Must be consistent with cable size and length.' },
  { column: 'Insulation Resistance (MΩ)', detail: 'Three columns: L-E, N-E, L-N. Record actual measured values, not just "pass". Minimum 1MΩ for 500V test.' },
  { column: 'Polarity', detail: 'Tick/cross for correct/incorrect. Must be correct at every accessory on the circuit. Any cross = C1 observation.' },
  { column: 'Zs (Ω)', detail: 'Earth fault loop impedance at the furthest point. Record the measured value with ambient temperature. Compare against 80% of BS 7671 maximum.' },
  { column: 'RCD (ms)', detail: 'Trip time at 1×IΔn and 5×IΔn. Record the worst-case from 0° and 180° phase angle tests. Note device type (general or S-type).' },
  { column: 'PFC (kA)', detail: 'Prospective fault current. Record the higher of L-E and L-N values. Must not exceed the breaking capacity of the protective device.' },
];

const commonMistakes = [
  { mistake: 'Blank cells without explanation', fix: 'Every cell must be completed. If a test was not performed, enter "N/A" with a reason in the comments. Blank cells suggest testing was not done.' },
  { mistake: 'Recording "pass" instead of actual values', fix: 'Always record the measured value. "Pass" tells the next inspector nothing about the installation\'s condition or deterioration trend.' },
  { mistake: 'Inconsistent units', fix: 'Use consistent units throughout: Ω for resistance/impedance, MΩ for insulation resistance, ms for RCD trip time, kA for PFC.' },
  { mistake: 'Not recording ambient temperature', fix: 'Zs readings require temperature correction. Record the ambient temperature for the test session so future inspectors can compare like-for-like.' },
  { mistake: 'Circuit numbers not matching the chart', fix: 'The schedule circuit numbers must match the circuit chart at the board AND the physical labels on the MCBs. Mismatches cause confusion and unsafe isolation.' },
  { mistake: 'Missing signatures', fix: 'The schedule must be signed by the person who performed the tests. Unsigned schedules have no legal standing.' },
];

const ScheduleGuideProcedure = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Schedule of Test Results</h1>
              <p className="text-[10px] text-white">Column-by-column guide</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              The Schedule of Test Results is the technical backbone of electrical certification. It records every measured value for every circuit, providing evidence that the installation meets BS 7671 requirements. It is the most scrutinised document during competent person scheme audits.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Column-by-Column Guide</p>
        </motion.div>

        {columns.map((col, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-yellow-400">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{col.column}</p>
                  <p className="text-sm text-white/80 mt-1">{col.detail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Mistakes</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-3">
              {commonMistakes.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-orange-400">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{item.mistake}</p>
                    <p className="text-sm text-white/70 mt-0.5">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Professional Standard</p>
            <p className="text-sm text-white leading-relaxed">
              The Schedule of Test Results must accompany the EIC. It is not valid as a standalone document. The original goes to the person ordering the work. The contractor retains a duplicate. Both must be complete, signed, and identical.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScheduleGuideProcedure;
