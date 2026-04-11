import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const flowcharts = [
  {
    title: 'RCD Keeps Tripping',
    steps: [
      { action: 'Isolate supply at consumer unit and prove dead', result: 'Safe to work' },
      { action: 'Disconnect ALL appliances and loads on the affected circuits', result: 'Eliminates appliance faults' },
      { action: 'Attempt to reset the RCD', result: 'If it holds → appliance fault. If it trips → fixed wiring fault' },
      { action: 'If appliance fault: reconnect appliances one at a time, resetting RCD after each', result: 'The appliance that causes the trip is faulty' },
      { action: 'If fixed wiring fault: perform insulation resistance test on each circuit (L-E, N-E)', result: 'Low IR identifies the faulty circuit' },
      { action: 'Section the faulty circuit at junction boxes and retest each section', result: 'Locates the fault to a specific cable run or accessory' },
      { action: 'Repair insulation fault, reconnect, retest IR and RCD operation', result: 'Fault resolved — record results' },
    ],
  },
  {
    title: 'MCB Trips Immediately on Reset',
    steps: [
      { action: 'Do NOT repeatedly reset — an immediate trip indicates a dead short or severe earth fault', result: 'Prevents further damage' },
      { action: 'Isolate the circuit and prove dead at the point of work', result: 'Safe to investigate' },
      { action: 'Disconnect all loads and accessories from the circuit', result: 'Eliminates equipment faults' },
      { action: 'Perform insulation resistance test — L-N, L-E, N-E', result: 'Dead short shows 0Ω between conductors' },
      { action: 'If IR is zero L-N: short circuit in cable. Section the circuit to locate', result: 'Test each section individually' },
      { action: 'If IR is zero L-E: earth fault. Check for cable damage at drill/nail points', result: 'Visual inspection of cable route often reveals damage' },
      { action: 'Replace damaged cable section. Retest IR and energise', result: 'Confirm fault cleared' },
    ],
  },
  {
    title: 'MCB Trips After Running Under Load',
    steps: [
      { action: 'This is a thermal (overload) trip — the circuit is carrying too much current', result: 'Different cause to immediate trip' },
      { action: 'Measure load current with a clamp meter under normal operating conditions', result: 'Identifies if the load exceeds the MCB rating' },
      { action: 'If load current > MCB rating: the circuit is overloaded', result: 'Reduce load, upgrade cable, or split circuit' },
      { action: 'If load current is within rating: check for loose connections causing high resistance', result: 'Loose terminals generate heat and cause thermal tripping' },
      { action: 'Use thermal imaging or touch-test terminations under load', result: 'Hot spots indicate loose or corroded connections' },
      { action: 'Retorque all connections to manufacturer specification. Retest', result: 'Monitor for recurrence' },
    ],
  },
  {
    title: 'No Power to a Socket / Light',
    steps: [
      { action: 'Check the MCB/fuse for that circuit at the consumer unit — is it ON?', result: 'Tripped MCB = fault on circuit. Blown fuse = replace and test' },
      { action: 'Check the RCD — is it down?', result: 'Reset if tripped. If it trips again, see RCD troubleshooting above' },
      { action: 'If MCB is ON and RCD is OK: test for voltage at the dead accessory', result: 'No voltage = open circuit between board and accessory' },
      { action: 'Perform continuity test from the board to the dead accessory', result: 'Open circuit shows infinite resistance on one or more conductors' },
      { action: 'Check intermediate junction boxes and connections between the board and accessory', result: 'Loose or disconnected terminal is the most common cause' },
      { action: 'For ring circuits: check if the ring is broken — test continuity of both legs', result: 'A broken ring leaves sockets beyond the break without power' },
      { action: 'Re-terminate the faulty connection. Retest continuity and energise', result: 'Verify power restored to all accessories' },
    ],
  },
  {
    title: 'Intermittent Fault (Comes and Goes)',
    steps: [
      { action: 'Intermittent faults are the hardest to diagnose. Gather detailed information about when it occurs', result: 'Look for patterns — time of day, weather, specific loads, temperature' },
      { action: 'Check for loose connections — the most common cause of intermittent faults', result: 'Terminals that make contact under one condition and break under another' },
      { action: 'Check for thermal effects — connections that work when cold but fail when hot (or vice versa)', result: 'Run the circuit under load and use thermal imaging' },
      { action: 'Check for moisture-related faults — worse in rain, damp weather, or after showering', result: 'Inspect junction boxes and outdoor connections for water ingress' },
      { action: 'Perform IR testing in the condition where the fault occurs (if safe to do so)', result: 'An IR reading that changes with temperature or moisture confirms the diagnosis' },
      { action: 'If you cannot reproduce the fault, install monitoring equipment to capture the event', result: 'Data loggers, power quality analysers, or simply leave and wait for the client to report' },
    ],
  },
  {
    title: 'Overheating at Terminations',
    steps: [
      { action: 'Isolate the circuit and prove dead before inspection', result: 'Hot terminals can indicate a serious fault' },
      { action: 'Visually inspect for discolouration, melted insulation, or charring at terminals', result: 'Signs of sustained overheating' },
      { action: 'Check terminal tightness — retorque to manufacturer specification', result: 'Loose terminals are the number one cause of overheating' },
      { action: 'Check conductor insertion — is the correct amount of bare conductor in the terminal?', result: 'Too little = high resistance. Too much = short circuit risk' },
      { action: 'Check for corrosion — especially on aluminium conductors or dissimilar metals', result: 'Clean contact surfaces and apply anti-oxidant if appropriate' },
      { action: 'Measure load current — is the circuit overloaded?', result: 'Sustained overload causes heating even with tight connections' },
      { action: 'Re-energise and monitor with thermal imaging under load', result: 'Confirm the hot spot is resolved' },
    ],
  },
  {
    title: 'Ring Circuit — Partial Power Loss',
    steps: [
      { action: 'Confirm which sockets work and which do not — map the ring on the circuit chart', result: 'Identifies the location of the break in the ring' },
      { action: 'Isolate the ring circuit and prove dead at the consumer unit', result: 'Safe to test' },
      { action: 'Perform three-step ring continuity test: measure end-to-end L, N and CPC at the board', result: 'A broken leg shows infinite resistance on one or more conductors' },
      { action: 'Cross-connect L to N at the board and measure at each socket around the ring', result: 'Readings should be consistent. A sudden jump indicates the break location.' },
      { action: 'Inspect the junction box or accessory nearest to the break — look for loose terminals or damaged cable', result: 'Loose terminals are the most common cause of ring breaks' },
      { action: 'Re-terminate or replace the faulty connection. Repeat three-step test to confirm ring is intact', result: 'All readings should now be consistent around the ring' },
      { action: 'Cross-connect L to CPC and retest to get R1+R2 at each socket — confirm earth path restored', result: 'Verify the earth is continuous throughout the ring' },
    ],
  },
];

const symptomQuickMatch = [
  { symptom: 'MCB trips instantly on reset', test: 'IR test L-N', likely: 'Short circuit', colour: 'red' },
  { symptom: 'MCB trips after running under load', test: 'Clamp meter', likely: 'Overload', colour: 'orange' },
  { symptom: 'RCD trips', test: 'IR test L-E, N-E', likely: 'Earth fault', colour: 'yellow' },
  { symptom: 'No power — MCB is ON', test: 'Continuity test', likely: 'Open circuit', colour: 'yellow' },
  { symptom: 'Intermittent tripping', test: 'IR + thermal imaging', likely: 'Loose connection', colour: 'orange' },
  { symptom: 'Burning smell — no trip', test: 'Visual + thermal', likely: 'High-resistance joint', colour: 'red' },
  { symptom: 'Lights flickering', test: 'Voltage L-N & N-E', likely: 'Supply / neutral fault', colour: 'yellow' },
  { symptom: 'Tingling from metalwork', test: 'Zs + IR L-E', likely: 'Earth fault on metalwork', colour: 'red' },
];

const TroubleshootingSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Troubleshooting</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Symptom Quick-Match */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Symptom Quick-Match</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-2.5 font-semibold text-white/60">Symptom</th>
                    <th className="text-left p-2.5 font-semibold text-white/60">First Test</th>
                    <th className="text-left p-2.5 font-semibold text-yellow-400">Likely Fault</th>
                  </tr>
                </thead>
                <tbody>
                  {symptomQuickMatch.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-2.5 text-white font-medium">{row.symptom}</td>
                      <td className="p-2.5 text-white/70">{row.test}</td>
                      <td className={`p-2.5 font-semibold ${row.colour === 'red' ? 'text-red-400' : row.colour === 'orange' ? 'text-orange-400' : 'text-yellow-400'}`}>{row.likely}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Follow these step-by-step flowcharts for the most common fault scenarios. Each follows the principle: symptom → safe isolation → systematic diagnosis → repair → verify.
            </p>
          </div>
        </motion.div>

        {flowcharts.map((fc, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{fc.title}</p>
              <div className="space-y-1.5">
                {fc.steps.map((step, j) => (
                  <div key={j} className="flex items-stretch gap-2">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-yellow-400">{j + 1}</span>
                      </div>
                      {j < fc.steps.length - 1 && <div className="w-px flex-1 bg-white/[0.08] my-1" />}
                    </div>
                    <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5 mb-1">
                      <p className="text-xs text-white">{step.action}</p>
                      <p className="text-[10px] text-yellow-400/70 mt-1">{step.result}</p>
                    </div>
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

export default TroubleshootingSection;
