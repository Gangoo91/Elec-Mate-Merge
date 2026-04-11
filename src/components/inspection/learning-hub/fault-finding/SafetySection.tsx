import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const safetyRules = [
  { title: 'Always Isolate First', detail: 'Before touching any part of a circuit, follow the full safe isolation procedure. A faulty circuit may have unexpected voltages — backfeed from other sources, capacitive charge, or induced voltages from adjacent cables.' },
  { title: 'Never Assume — Always Prove', detail: 'A circuit that "should be dead" may not be. Prove dead with a GS38-compliant voltage indicator at the point of work. Prove the tester before AND after. Every time.' },
  { title: 'Treat Every Conductor as Live', detail: 'Until you have personally proved it dead, treat every conductor as live. Even a neutral can be at dangerous potential if the neutral is broken upstream.' },
  { title: 'Beware of Stored Energy', detail: 'Capacitors in motor drives, power factor correction, and UPS systems can retain lethal charge for hours after isolation. Discharge safely before approaching.' },
  { title: 'Work Methodically', detail: 'Rushing fault finding leads to shortcuts and accidents. Follow the 8-step methodology. Record what you do. If you are under time pressure, tell the client — do not compromise safety.' },
  { title: 'Know When to Stop', detail: 'If a fault is beyond your competence, or requires live working that you cannot justify under EAW Reg 14, stop. Seek specialist support. It is better to admit you need help than to have an accident.' },
];

const liveWorkingJustification = [
  'EAW Reg 14 allows live working ONLY when ALL THREE conditions are met:',
  '(a) It is unreasonable in all circumstances for the conductor to be dead',
  '(b) It is reasonable in all circumstances for the person to be at work on or near the conductor',
  '(c) Suitable precautions (including PPE) are taken to prevent injury',
  'In fault finding, live testing (Zs, PFC, voltage measurement) may be justified because these tests REQUIRE the circuit to be energised.',
  'Live WORK (making/breaking connections, replacing components) on energised circuits is almost never justified in fault finding. Isolate first.',
];

const ppeForFaultFinding = [
  { item: 'Safety glasses', when: 'ALL fault finding work — arcing can occur unexpectedly' },
  { item: 'Insulated gloves', when: 'Any work near or on live conductors, handling charged capacitors' },
  { item: 'Safety boots', when: 'All site work — insulated soles protect against step potential' },
  { item: 'Arc-rated clothing', when: 'Working near high fault-level switchgear or distribution boards' },
  { item: 'GS38-compliant test leads', when: 'ALL electrical testing — fused probes, finger guards mandatory' },
  { item: 'Insulated tools', when: 'Any work near live parts — VDE rated to 1000V' },
];

const SafetySection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Safety</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Safety Rules for Fault Finding</p>
        </motion.div>

        {safetyRules.map((r, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{r.title}</p>
              <p className="text-sm text-white mt-1 leading-relaxed">{r.detail}</p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">Live Working Justification — EAW Reg 14</p>
            <div className="space-y-1.5">
              {liveWorkingJustification.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">PPE for Fault Finding</p>
        </motion.div>

        {ppeForFaultFinding.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.item}</p>
                <p className="text-sm text-white mt-0.5">{item.when}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SafetySection;
