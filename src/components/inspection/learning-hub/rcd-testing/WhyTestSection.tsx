import { ArrowLeft, Heart, Shield, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const hazards = [
  { icon: Heart, title: 'Protection Against Fatal Electric Shock', description: 'RCDs detect earth leakage currents as low as 30mA and disconnect within 300ms at rated current, and within 40ms at 5×IΔn. This is fast enough to prevent cardiac fibrillation — the human heart can typically withstand currents up to 50mA for short durations without fatal consequences.' },
  { icon: Flame, title: 'Fire Prevention', description: 'Earth leakage currents cause arcing and heating in damaged cables or loose connections. RCDs detect these fault currents before they reach levels that could ignite surrounding materials. Electrical fires from insulation failure are a leading cause of building fires.' },
  { icon: Shield, title: 'Enhanced Protection for Vulnerable Persons', description: 'Children, elderly, and people with medical conditions are more susceptible to electric shock. RCDs provide additional protection that does not rely on the adequacy of earthing or the operation of overcurrent devices.' },
  { icon: Zap, title: 'Detection of Insulation Breakdown', description: 'RCDs detect gradual deterioration of cable insulation, water ingress, or equipment damage before it becomes dangerous. This early warning capability helps prevent accidents — a circuit with deteriorating insulation will trip the RCD before a person is harmed.' },
];

const howItWorks = [
  { step: 'Balanced currents', detail: 'In normal operation, current flowing out through the line conductor returns through the neutral. The magnetic fields cancel in the toroidal transformer.' },
  { step: 'Current imbalance', detail: 'During an earth fault, some current flows to earth instead of returning via the neutral. This creates a difference between line and neutral currents.' },
  { step: 'Toroidal detection', detail: 'The RCD\'s toroidal transformer detects the magnetic field imbalance caused by unequal currents. Even a tiny difference (30mA) is detected.' },
  { step: 'Trip mechanism', detail: 'The amplified signal from the transformer operates the trip relay, opening the contacts and disconnecting the supply within milliseconds.' },
];

const currentEffects = [
  { current: '1mA', effect: 'Barely perceptible' },
  { current: '5mA', effect: 'Maximum safe current — "let-go" threshold' },
  { current: '10-20mA', effect: 'Muscular control lost — cannot release grip' },
  { current: '30mA', effect: 'Respiratory paralysis — breathing stops' },
  { current: '50mA', effect: 'Ventricular fibrillation possible' },
  { current: '100mA+', effect: 'Certain ventricular fibrillation — almost always fatal' },
];

const failureScenarios = [
  { title: 'Faulty Appliance — Damaged Cable', withRcd: 'User touches live casing, 30mA earth leakage detected, RCD trips in <40ms. Minimal shock sensation — user startled but unharmed.', withoutRcd: 'User receives sustained shock through body to earth. Potential cardiac arrest or muscular paralysis preventing release from the equipment.' },
  { title: 'Bathroom — Water Ingress in Fitting', withRcd: 'Leakage current detected immediately, power disconnected before anyone enters the wet area. No risk to users.', withoutRcd: 'Wet conditions reduce body resistance dramatically. Shock severity increases. Potential electrocution in high-risk environment.' },
  { title: 'Garden — Cable Cut by Mower', withRcd: 'RCD trips within milliseconds of cable damage. Brief flash, circuit dead. User receives minor tingle at most.', withoutRcd: 'Severed cable remains live. User holding metal mower handle in contact with earth — direct shock path through body. Potentially fatal.' },
];

const whyTestRegularly = [
  'RCDs are mechanical devices with moving parts that can fail without warning',
  'Unlike fuses or MCBs that visibly show when they have operated, a failed RCD appears normal but provides no protection',
  'Internal components deteriorate with age, temperature cycling, and electrical stress',
  'Contamination from dust, insects, or moisture can prevent the trip mechanism from operating',
  'The only way to know an RCD is working is to test it — regular testing is the only guarantee of continued protection',
];

const WhyTestSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Why Test RCDs?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Residual Current Devices are the last line of defence against electric shock. They detect current leaking to earth — a sign that someone may be in contact with a live conductor — and disconnect the supply in milliseconds. Testing proves they will actually work when needed.
            </p>
          </div>
        </motion.div>

        {/* What RCDs protect against */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What RCDs Protect Against</p>
        </motion.div>

        {hazards.map((h, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <h.icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{h.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{h.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* How it works */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">How an RCD Works</p>
        </motion.div>

        {howItWorks.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.step}</p>
                <p className="text-sm text-white/70 mt-0.5">{item.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Current effects on the body */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Electric Current Effects on the Human Body</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Current</th>
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEffects.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-yellow-400 font-semibold">{row.current}</td>
                      <td className="p-3 text-white">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 border-t border-white/[0.06]">
              <p className="text-xs text-white/70">A 30mA RCD trips before current reaches the threshold for respiratory paralysis. A 5×IΔn test (150mA) confirms the RCD trips in ≤40ms — before ventricular fibrillation can occur.</p>
            </div>
          </div>
        </motion.div>

        {/* Real-world scenarios */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Happens With and Without a Working RCD</p>
        </motion.div>

        {failureScenarios.map((s, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{s.title}</p>
              <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">With working RCD</p>
                <p className="text-sm text-white">{s.withRcd}</p>
              </div>
              <div className="rounded-xl bg-red-400/5 border border-red-400/10 p-3">
                <p className="text-xs font-semibold text-red-400 mb-1">Without RCD / failed RCD</p>
                <p className="text-sm text-white">{s.withoutRcd}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Why test regularly */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">Why Regular Testing is Essential</p>
            <div className="space-y-1.5">
              {whyTestRegularly.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyTestSection;
