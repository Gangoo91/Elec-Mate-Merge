import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const mustDisconnect = [
  'Surge Protection Devices (SPDs) — will be destroyed by 500V DC',
  'Electronic equipment — computers, TVs, AV systems, routers',
  'Dimmer switches — remove or disconnect completely',
  'LED drivers and electronic control gear',
  'Smart devices and IoT equipment (smart plugs, thermostats)',
  'Photocell switches, timers, and programmable controllers',
  'PIR sensors and motion detectors',
  'Smoke and CO detectors with electronic bases',
  'EV charger control modules',
  'RCDs — can be bridged out during testing if required',
];

const equipment = [
  { name: 'Insulation resistance tester (Megger)', detail: 'Must be capable of 250V, 500V and 1000V DC test voltages. Calibration certificate must be current. Battery condition adequate.' },
  { name: 'Test leads', detail: 'High-voltage rated leads in good condition. Crocodile clips for securing to conductors. Check insulation integrity before every use.' },
  { name: 'Proving unit', detail: 'To prove the tester is working correctly before and after use.' },
  { name: 'Discharge stick / short-circuiting bar', detail: 'For safely discharging stored energy in long cable runs after testing. Essential — capacitive charge in long cables can give a nasty shock.' },
];

const testSequence = [
  'Isolate the circuit at the distribution board. Lock off and post warning notices.',
  'Prove dead at the point of work using an approved voltage indicator.',
  'Disconnect all electronic equipment, SPDs, and sensitive devices from the circuit.',
  'Ensure all switches on the circuit are in the ON position (so all conductors are connected through).',
  'Remove all lamps and disconnect any remaining loads.',
  'Set the insulation resistance tester to the appropriate test voltage (500V DC for circuits up to 500V).',
  'Test 1 — Line to Earth: Connect test leads between line conductor and CPC. Apply test voltage for a minimum of 1 minute. Record the reading once stable.',
  'Test 2 — Neutral to Earth: Connect between neutral conductor and CPC. Apply for 1 minute. Record.',
  'Test 3 — Line to Neutral: Connect between line and neutral conductors. Apply for 1 minute. Record.',
  'Discharge all conductors safely after each test — short-circuit the tested conductors together and to earth.',
  'Record all three readings, the ambient temperature, and the test voltage used on the Schedule of Test Results.',
];

const threeTests = [
  { test: 'Line to Earth (L-E)', purpose: 'Checks insulation between the line conductor and the protective conductor. Detects line-to-earth faults — the most dangerous type as it can energise exposed metalwork.', typical: '≥1MΩ minimum, >200MΩ typical for new installation' },
  { test: 'Neutral to Earth (N-E)', purpose: 'Checks insulation between neutral and protective conductor. Detects neutral-to-earth faults which cause leakage current and RCD tripping.', typical: '≥1MΩ minimum, >200MΩ typical for new installation' },
  { test: 'Line to Neutral (L-N)', purpose: 'Checks insulation between live conductors. Detects phase-to-neutral faults which cause short circuits and overcurrent.', typical: '≥1MΩ minimum, >200MΩ typical for new installation' },
];

const commonMistakes = [
  { mistake: 'Forgetting to disconnect electronic equipment', fix: 'Walk the circuit and physically verify every device is disconnected. Use the circuit chart to identify all accessories. SPDs are the most commonly missed — they look like MCBs in the board.' },
  { mistake: 'Switches left in OFF position', fix: 'All switches must be ON so the test voltage reaches the full extent of the circuit. An open switch will give a falsely high reading on the section beyond it.' },
  { mistake: 'Not discharging after testing', fix: 'Long cable runs store significant capacitive charge at 500V. Always short-circuit all tested conductors together and to earth before touching them or reconnecting equipment.' },
  { mistake: 'Testing with lamps connected', fix: 'Lamps (especially LED and CFL) create parallel resistance paths that dramatically reduce the IR reading. Remove all lamps before testing.' },
  { mistake: 'Not recording ambient temperature', fix: 'IR varies significantly with temperature. Record the temperature for each test session so readings can be compared between inspections.' },
  { mistake: 'Applying test voltage for insufficient time', fix: 'The reading must be stable for the final 15 seconds of a 1-minute test. Short bursts give unreliable readings — polarisation current needs time to decay.' },
];

const StepList = ({ steps }: { steps: string[] }) => (
  <div className="space-y-2">
    {steps.map((step, i) => (
      <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
          <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
        </div>
        <p className="text-sm text-white leading-relaxed pt-1">{step}</p>
      </div>
    ))}
  </div>
);

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
        {/* Equipment destruction warning */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-red-400/10 border border-red-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">You MUST Disconnect These Before Testing</p>
            <p className="text-sm text-white mb-3">The 500V DC test voltage will destroy the following — no exceptions:</p>
            <div className="space-y-1.5">
              {mustDisconnect.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PPE */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">PPE Required</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-1.5">
              {['Safety glasses', 'Insulated gloves — handling charged conductors after testing', 'Safety boots with insulated soles', 'Electrical rated footwear'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Equipment */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Test Equipment</p>
          <div className="space-y-2">
            {equipment.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="text-sm text-white mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Test voltage selection */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">Test Voltage Selection</p>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-lg font-bold text-white">250V</p>
                  <p className="text-xs text-white">SELV/PELV</p>
                  <p className="text-xs text-white">≤50V circuits</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3 text-center border border-yellow-400/30">
                  <p className="text-lg font-bold text-yellow-400">500V</p>
                  <p className="text-xs text-white">Standard LV</p>
                  <p className="text-xs text-yellow-400">Most common</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-lg font-bold text-white">1000V</p>
                  <p className="text-xs text-white">500V-1000V</p>
                  <p className="text-xs text-white">HV circuits</p>
                </div>
              </div>
              <p className="text-sm text-white">Minimum acceptable IR for all: <span className="font-semibold text-white">≥1.0MΩ</span> (except SELV: ≥0.5MΩ)</p>
            </div>
          </div>
        </motion.div>

        {/* Step-by-step procedure */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Step-by-Step Procedure</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StepList steps={testSequence} />
        </motion.div>

        {/* The three tests explained */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">The Three Tests Explained</p>
        </motion.div>

        {threeTests.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.test}</p>
              <p className="text-sm text-white mt-1 leading-relaxed">{item.purpose}</p>
              <p className="text-xs text-yellow-400/80 mt-2">{item.typical}</p>
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
