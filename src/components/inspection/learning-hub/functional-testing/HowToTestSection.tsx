import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const preTestSteps = [
  'Confirm all dead and live tests are complete and satisfactory before starting functional tests',
  'Review installation drawings, circuit charts, and manufacturer documentation for the equipment being tested',
  'Inform building occupants and relevant personnel — functional testing involves switching and power interruptions',
  'Identify all critical equipment that cannot tolerate interruption (alarms, refrigeration, IT, medical)',
  'Have a second person available for tests that require simultaneous operation at two locations',
  'Prepare a systematic checklist — work through circuits in board order',
];

const testSequence = [
  { step: 'Main Switch / Isolator', detail: 'Operate the main switch to OFF and back to ON. It must operate smoothly, make positive contact, and all circuits should lose and regain power correctly. Check the switch locks in both positions.' },
  { step: 'Individual MCBs / RCBOs', detail: 'Switch each device OFF and ON. Each must operate smoothly and positively. Verify the correct circuit loses power when each device is switched off. Check the circuit chart matches reality.' },
  { step: 'RCD Test Buttons', detail: 'Press the integral T button on every RCD and RCBO. Each must trip immediately and reset cleanly. If a test button fails, the RCD is faulty regardless of calibrated test results.' },
  { step: 'Switches and Controls', detail: 'Operate every light switch, dimmer, fan switch, and control device. Each must operate its intended load correctly. Two-way and intermediate switches must work from all positions.' },
  { step: 'Socket Outlets', detail: 'Verify all socket outlets are live (using a socket tester or voltage indicator). Check switched sockets — the switch must interrupt the supply. USB sockets should charge a device.' },
  { step: 'Emergency Stops', detail: 'Operate every emergency stop button. Verify it disconnects the correct equipment immediately. Confirm the system cannot be restarted without manually resetting the emergency stop.' },
  { step: 'Interlocks', detail: 'Test all mechanical and electrical interlocks. A door interlock must disconnect the supply when opened. A machine guard interlock must prevent operation with the guard removed.' },
  { step: 'Indicator Lamps and Displays', detail: 'Check all neon indicators, pilot lamps, and status displays show the correct state. An "ON" indicator must illuminate when the circuit is energised and extinguish when switched off.' },
  { step: 'Automatic Controls', detail: 'Test timers, thermostats, photocells, PIR sensors, and programmable controllers. Each must respond to its control input and switch the correct load. Verify time delays and setpoints.' },
  { step: 'Motor Direction', detail: 'For any motor installation, verify rotation direction before connecting to the driven equipment. Incorrect rotation can damage pumps, fans, compressors, and conveyors.' },
];

const commonMistakes = [
  { mistake: 'Skipping functional tests because electrical tests passed', fix: 'Electrical tests verify wiring — functional tests verify the equipment works. A correctly wired emergency stop with a seized mechanism is useless. Both test types are mandatory.' },
  { mistake: 'Not checking the circuit chart matches reality', fix: 'Switch each MCB off individually and verify which circuit loses power. Update the chart if incorrect. Wrong labelling is a safety issue and an EICR observation.' },
  { mistake: 'Testing in a rushed sequence without recording', fix: 'Work systematically through the board. Record each test as satisfactory or note defects. Do not batch results from memory.' },
  { mistake: 'Not testing two-way switches from all positions', fix: 'A two-way switch that works from one position but not the other has a wiring fault. Test from every switch position on the circuit.' },
  { mistake: 'Forgetting to test emergency systems', fix: 'Emergency stops, fire alarm interfaces, and emergency lighting changeover are the most critical functional tests. Do not leave them until last and rush.' },
];

const HowToTestSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">How to Test</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Pre-test */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Before You Start</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-1.5">
              {preTestSteps.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Test sequence */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Functional Test Sequence</p>
        </motion.div>

        {testSequence.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{item.step}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Common mistakes */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Mistakes to Avoid</p>
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
                    <p className="text-sm text-white mt-0.5">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToTestSection;
