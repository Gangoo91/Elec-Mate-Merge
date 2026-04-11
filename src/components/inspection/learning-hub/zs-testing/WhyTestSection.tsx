import { ArrowLeft, Zap, Shield, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const hazards = [
  {
    icon: Shield,
    title: 'Automatic Disconnection of Supply (ADS)',
    description: 'ADS is the primary method of protection against electric shock in most installations. When a fault occurs, the protective device must disconnect the supply fast enough to prevent dangerous touch voltages from persisting. Zs testing proves this will actually happen.',
  },
  {
    icon: Clock,
    title: 'Disconnection Time Compliance',
    description: 'BS 7671 Reg 411.3.2 requires MCBs and fuses to disconnect within 0.4 seconds for socket outlet circuits and 5 seconds for fixed equipment circuits. These times are based on physiological research into the maximum duration a person can safely withstand electric shock.',
  },
  {
    icon: Zap,
    title: 'Fault Current Adequacy',
    description: 'The fault current must be high enough to trip the protective device within the required time. If Zs is too high, the fault current (I = U₀ ÷ Zs) will be too low, and the device may take too long to operate — or may not operate at all, leaving dangerous voltages present indefinitely.',
  },
  {
    icon: AlertTriangle,
    title: 'Thermal Protection',
    description: 'During a fault, current flows through the protective conductor and heats it rapidly. If Zs is too high and the device is slow to operate, the CPC can overheat, damaging insulation and creating fire risk. Reg 131.3 requires verification that earth faults cannot produce excessive thermal effects.',
  },
];

const whatIsZs = [
  { component: 'Supply transformer winding impedance', detail: 'The internal impedance of the DNO transformer' },
  { component: 'Line conductor resistance (R1)', detail: 'From the transformer to the point of the fault' },
  { component: 'Protective conductor resistance (R2)', detail: 'The CPC from the fault point back to the main earthing terminal' },
  { component: 'Earthing conductor and arrangement', detail: 'The return path — depends on TN-S, TN-C-S or TT system type' },
];

const systemTypes = [
  { system: 'TN-S', path: 'Fault current returns via the metallic sheath of the supply cable. Typically low Ze (0.35-0.8Ω). Most reliable earth path.', typical: '0.35-0.8Ω' },
  { system: 'TN-C-S (PME)', path: 'Fault current returns via the combined neutral/earth (PEN) conductor. Typically very low Ze (0.2-0.35Ω). Lowest impedance but PME risks apply.', typical: '0.2-0.35Ω' },
  { system: 'TT', path: 'Fault current returns via the earth electrode into the ground. High Ze means RCDs are essential — overcurrent devices alone cannot provide adequate disconnection.', typical: '2-200Ω+' },
];

const realWorldExamples = [
  {
    title: 'Kitchen Ring — High Zs at Furthest Socket',
    fault: 'Measured Zs of 1.85Ω at the furthest socket on a 32A Type B ring circuit',
    consequence: 'Maximum permitted Zs is 1.37Ω (BS 7671). At 1.85Ω, fault current = 230/1.85 = 124A. A 32A Type B MCB needs 160A to trip in 0.4s. The MCB would take much longer to trip — potentially leaving the socket energised during a fault.',
    resolution: 'Investigation found a loose CPC connection at a junction box. Re-terminated and re-tested at 0.92Ω — within limits.',
  },
  {
    title: 'Shower Circuit — Undersized CPC',
    fault: 'Measured Zs of 2.8Ω on a 40A Type B shower circuit (max permitted 1.09Ω)',
    consequence: 'Fault current only 82A — MCB requires 200A for 0.4s trip. Shower could become live during a fault with no automatic disconnection for several seconds.',
    resolution: 'CPC was 1.5mm² on a long cable run. Upgraded to 4mm² CPC. Re-tested at 0.78Ω — compliant.',
  },
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
            <h1 className="text-base font-semibold text-white">Why Test Zs?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Earth fault loop impedance (Zs) testing verifies that the complete fault current path has low enough impedance to ensure protective devices disconnect within the required time during an earth fault. Without this test, there is no guarantee that ADS will work.
            </p>
          </div>
        </motion.div>

        {/* What is Zs */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Is Zs?</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-lg">Reg 134.2.2</span>
            </div>
            <p className="text-sm text-white leading-relaxed mb-3">
              Zs is the total impedance of the earth fault loop — from the point of the fault, through the protective conductor, earthing arrangement, transformer winding and line conductor back to the fault point.
            </p>
            <div className="space-y-2">
              {whatIsZs.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.05] p-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.component}</p>
                    <p className="text-sm text-white">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-white/[0.05] p-3">
              <p className="text-sm text-white"><span className="font-semibold text-yellow-400">Key formula:</span> Fault current I = U₀ ÷ Zs (where U₀ = 230V). Lower Zs = higher fault current = faster disconnection.</p>
            </div>
          </div>
        </motion.div>

        {/* Why it matters */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Why It Matters</p>
        </motion.div>

        {hazards.map((hazard, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <hazard.icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{hazard.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{hazard.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* System types */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Zs by Earthing System</p>
        </motion.div>

        {systemTypes.map((sys, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{sys.system}</p>
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg">Ze: {sys.typical}</span>
              </div>
              <p className="text-sm text-white leading-relaxed">{sys.path}</p>
            </div>
          </motion.div>
        ))}

        {/* TT System — special consideration */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">TT Systems — Why RCDs Are Essential</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              In TT systems, the fault current returns through the earth electrode and ground — a high-impedance path. The loop impedance is so high that MCBs and fuses cannot disconnect fast enough. RCDs must be used instead.
            </p>
            <div className="rounded-xl bg-white/[0.05] p-3 mb-3">
              <p className="text-sm text-white"><span className="font-semibold text-yellow-400">TT Formula:</span> Ra ≤ U₀ ÷ IΔn</p>
              <p className="text-sm text-white mt-1">For a 30mA RCD: Ra ≤ 230 ÷ 0.03 = 7,667Ω. In practice, aim for Ra below 200Ω for service reliability.</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Earth electrode resistance must be low enough for the RCD to operate within required disconnection time</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Electrode resistance varies seasonally — test in dry conditions for worst-case readings</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Zs testing on TT systems confirms the RCD will see enough fault current to trip reliably</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disconnection times detail */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-3">Disconnection Times — Reg 411.3.2</p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs text-white">Final circuits ≤63A (sockets)</p>
                  <p className="text-lg font-bold text-white">0.4s</p>
                  <p className="text-xs text-white">Maximum disconnection time</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs text-white">Distribution circuits & fixed equipment</p>
                  <p className="text-lg font-bold text-white">5s</p>
                  <p className="text-xs text-white">Maximum disconnection time</p>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.05] p-3">
                <p className="text-sm text-white"><span className="font-semibold text-yellow-400">Important:</span> The 5-second time applies to distribution circuits and circuits supplying fixed equipment only. All socket outlet circuits and circuits likely to supply portable equipment must disconnect in 0.4 seconds.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real-world examples */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Real-World Examples</p>
        </motion.div>

        {realWorldExamples.map((example, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-400">F</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Finding</p>
                    <p className="text-sm text-white">{example.fault}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-400">C</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Consequence</p>
                    <p className="text-sm text-white">{example.consequence}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-400">R</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Resolution</p>
                    <p className="text-sm text-white">{example.resolution}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhyTestSection;
