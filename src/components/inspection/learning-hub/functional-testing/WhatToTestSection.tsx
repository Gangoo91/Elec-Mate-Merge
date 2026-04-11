import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const domesticChecklist = [
  { item: 'Consumer unit main switch', check: 'Operates smoothly, all circuits lose power, switch locks in both positions' },
  { item: 'All MCBs and RCBOs', check: 'Each switches off its designated circuit only. Circuit chart matches reality.' },
  { item: 'RCD test buttons', check: 'Every T button trips its RCD immediately. RCD resets cleanly.' },
  { item: 'Light switches (one-way)', check: 'Switch operates the correct light. ON/OFF positions are consistent.' },
  { item: 'Two-way and intermediate switches', check: 'Light can be controlled from every switch position on the circuit.' },
  { item: 'Dimmer switches', check: 'Dimmer controls brightness smoothly. No flickering at low levels.' },
  { item: 'Socket outlets', check: 'All sockets are live. Switched sockets interrupt supply when OFF.' },
  { item: 'Cooker switch / isolator', check: 'Isolates the cooker circuit. Neon indicator shows correct state.' },
  { item: 'Shower isolator', check: 'Ceiling pull switch isolates the shower. Neon indicator works.' },
  { item: 'Immersion heater switch', check: 'Timer and boost function work. Thermostat operates correctly.' },
  { item: 'Smoke / CO alarms', check: 'Test button sounds alarm. Interconnection works — pressing one triggers all.' },
  { item: 'Extractor fans', check: 'Fan runs when switched on. Timer overrun operates for correct duration.' },
  { item: 'Outdoor lighting', check: 'PIR sensors detect movement and switch lights. Time delay works.' },
  { item: 'EV charger', check: 'Charger powers up, LED status correct, pilot signal active, RCD accessible.' },
];

const commercialChecklist = [
  { item: 'Main isolator / switch-disconnector', check: 'Operates smoothly. Lock-off facility works. All downstream circuits lose power.' },
  { item: 'Distribution boards', check: 'All devices operate. Circuit charts match. Door interlocks function (if fitted).' },
  { item: 'Emergency lighting', check: 'Simulate mains failure — emergency fittings illuminate within 5 seconds. Test duration function.' },
  { item: 'Fire alarm interface', check: 'Fire alarm activation causes correct electrical isolation (e.g., mag-lock release, damper closure). Coordinate with fire alarm company.' },
  { item: 'Emergency stops', check: 'All E-stops disconnect correct equipment immediately. Cannot restart without manual reset. Tested from every button location.' },
  { item: 'Automatic transfer switches', check: 'Simulate mains failure — ATS transfers to generator/UPS within specified time. Retransfers on mains restoration.' },
  { item: 'Contactors and starters', check: 'Motor contactors pull in and drop out cleanly. Overloads trip at correct setting. Manual reset works.' },
  { item: 'Building management interfaces', check: 'BMS can monitor and control connected circuits. Status signals reflect actual equipment state.' },
  { item: 'Access control interfaces', check: 'Mag-locks release on fire alarm. Door entry systems function. Emergency egress override works.' },
  { item: 'Lift isolators', check: 'Fireman\'s switch operates correctly. Car-top isolator functions. Coordinate with lift engineer.' },
];

const industrialChecklist = [
  { item: 'Machine safety interlocks', check: 'Guard interlocks prevent operation with guards removed. Cannot be bypassed.' },
  { item: 'Motor direction', check: 'Verify rotation direction BEFORE coupling to driven equipment. Phase rotation correct.' },
  { item: 'Variable speed drives', check: 'VSD starts, stops, and controls speed correctly. Fault trip functions work.' },
  { item: 'Process control systems', check: 'PLCs respond to inputs correctly. Output devices (valves, actuators) operate as programmed.' },
  { item: 'Isolation and lock-off', check: 'Every isolator locks in the OFF position. Energy isolation points are clearly identified.' },
];

const ChecklistSection = ({ title, items }: { title: string; items: { item: string; check: string }[] }) => (
  <>
    <motion.div variants={itemVariants}>
      <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">{title}</p>
    </motion.div>
    {items.map((item, i) => (
      <motion.div key={i} variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-sm font-semibold text-white">{item.item}</p>
          <p className="text-sm text-white mt-1">{item.check}</p>
        </div>
      </motion.div>
    ))}
  </>
);

const WhatToTestSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">What to Test</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Use these checklists as a starting point. Every installation is different — add site-specific items based on the equipment installed. The key principle: if it switches, controls, interlocks, or indicates, it needs a functional test.
            </p>
          </div>
        </motion.div>

        <ChecklistSection title="Domestic Installations" items={domesticChecklist} />
        <ChecklistSection title="Commercial Installations" items={commercialChecklist} />
        <ChecklistSection title="Industrial Installations" items={industrialChecklist} />

        {/* Phase sequence verification */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Phase Sequence Verification (Three-Phase)</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white leading-relaxed">
              For any three-phase installation, phase sequence must be verified to prevent motor reversal and sensitive equipment malfunction. Use a phase rotation meter — never assume correct rotation after reconnecting cables.
            </p>
            <div className="space-y-2">
              {[
                { step: 'Prove the phase rotation meter on a known supply before use', note: 'An unproven meter could indicate correct when reversed' },
                { step: 'Measure phase sequence at the supply origin (main intake)', note: 'Confirm L1-L2-L3 rotation matches the supply' },
                { step: 'Measure again at the load end (DB, motor terminals, or equipment)', note: 'The sequence must match the origin — any mismatch indicates a phase interchange' },
                { step: 'If sequence is incorrect, trace and correct the phasing at the termination point', note: 'Swap any two phases to reverse the rotation' },
                { step: 'For motors, verify rotation direction under low-load conditions before coupling to driven equipment', note: 'Wrong rotation can destroy pumps, compressors and conveyors within seconds' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white">{item.step}</p>
                    <p className="text-xs text-yellow-400/80 mt-1">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-orange-400/5 border border-orange-400/10 p-3 mt-2">
              <p className="text-xs text-white"><span className="font-semibold text-orange-400">Common defect:</span> Phase interchanges at termination points — especially after maintenance where cables have been disconnected and reconnected. Always verify sequence after any three-phase work.</p>
            </div>
          </div>
        </motion.div>

        {/* Emergency lighting functional test */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Emergency Lighting Functional Test (BS 5266)</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white leading-relaxed">
              Emergency lighting must be functionally tested to confirm changeover, illumination and battery performance. Monthly tests are short-duration; annual tests are full-duration discharge.
            </p>
            <div className="space-y-2">
              {[
                { step: 'Notify occupants and responsible persons of the scheduled test', note: 'Occupants may be alarmed by emergency lighting activation' },
                { step: 'Operate the test switch or simulate mains failure at the lighting distribution board', note: 'Some systems have dedicated test switches; others require MCB operation' },
                { step: 'Verify that all emergency luminaires illuminate within 5 seconds', note: 'Walk the escape routes and check every fitting. Failed fittings must be replaced.' },
                { step: 'Monthly test: maintain illumination for at least 30 seconds to confirm battery function', note: 'This is a short functional check — not a full discharge' },
                { step: 'Annual test: full rated duration discharge (typically 3 hours) to verify battery capacity', note: 'Schedule during low-occupancy period. All fittings must maintain illumination for the full duration.' },
                { step: 'Restore mains supply and verify all charge indicators return to normal', note: 'A failed charge indicator means the battery will not recharge — the fitting is out of service' },
                { step: 'Record all results including any failed fittings and remedial actions taken', note: 'BS 5266 requires a log book with test dates, results, and signatures' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white">{item.step}</p>
                    <p className="text-xs text-yellow-400/80 mt-1">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3 mt-2">
              <p className="text-sm text-white"><span className="font-semibold text-yellow-400">Common mistakes:</span> Not notifying occupants before test. Failing to record results in the log book. Not performing the full annual discharge test — monthly short tests do not verify battery capacity.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhatToTestSection;
