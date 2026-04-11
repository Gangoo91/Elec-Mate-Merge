import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const cases = [
  {
    title: 'Kitchen RCD Tripping Intermittently',
    type: 'Domestic',
    scenario: 'Client reports the kitchen RCD trips every few days. No pattern identified. Happens with different appliances.',
    investigation: ['Visual inspection: no obvious damage at consumer unit or accessories', 'Disconnected all appliances — RCD held for 2 hours, then tripped again', 'IR test on kitchen ring: L-E = 0.8MΩ, N-E = 45MΩ, L-N = >999MΩ', 'Low L-E reading indicates insulation fault to earth on the line conductor', 'Sectioned circuit at junction boxes — fault isolated to cable run behind dishwasher'],
    diagnosis: 'Cable damaged by the dishwasher sliding in and out over years — outer sheath worn through, line conductor insulation compromised. Moisture from dishwasher steam intermittently bridged the gap.',
    resolution: 'Replaced the damaged cable section. Rerouted cable away from appliance movement zone. Re-tested: IR >999MΩ all tests. RCD stable. Advised client to check cable clearance when replacing appliances.',
    lesson: 'Intermittent faults are often environmental — moisture, temperature, or mechanical movement. The IR test under dry conditions showed the fault; it would have been much lower in humid conditions.',
  },
  {
    title: 'Office Lights Flickering on One Floor',
    type: 'Commercial',
    scenario: 'First-floor office lights flicker randomly. Ground floor unaffected. No recent electrical work. Problem started gradually and is getting worse.',
    investigation: ['Voltage measurement at first-floor DB: 242V steady — supply OK', 'Flickering observed on multiple circuits — not one specific circuit', 'Checked neutral connections at the DB — found loose neutral bar bolt', 'Thermal scan showed hot spot at the neutral bar connection (68°C vs 32°C ambient)'],
    diagnosis: 'Loose neutral bar connection at the first-floor distribution board. High resistance at the neutral point caused voltage fluctuations across all circuits, especially under varying load as lights switched on and off.',
    resolution: 'Isolated, proved dead, retorqued all neutral bar connections to manufacturer specification. Cleaned contact surfaces. Retested — no hot spots, no flickering. Recommended annual thermographic survey.',
    lesson: 'Flickering across multiple circuits usually indicates a common point of failure — the neutral bar, main connections, or supply. A clamp meter on the neutral would also have shown abnormal current.',
  },
  {
    title: 'Motor Starter Tripping in Damp Workshop',
    type: 'Industrial',
    scenario: 'Three-phase motor starter for a lathe trips on earth fault every Monday morning. Runs fine for the rest of the week.',
    investigation: ['Pattern identified: fails after weekend shutdown in an unheated workshop', 'Opened IP54 enclosure — found condensation on starter contacts and control wiring', 'IR test on control circuits when damp: 0.3MΩ. After running for 1 hour (dried out): >200MΩ', 'Damaged door gasket allowing moisture ingress identified'],
    diagnosis: 'Weekend temperature cycling caused condensation inside the control enclosure. Damaged door gasket allowed humid air in. The condensation reduced insulation resistance below the RCD trip threshold.',
    resolution: 'Replaced door gasket. Installed an anti-condensation heater inside the enclosure (thermostatically controlled). Re-tested IR cold: >50MΩ. Recommended monthly gasket inspection.',
    lesson: 'Monday morning faults are almost always moisture-related. Temperature cycling over the weekend causes condensation. Anti-condensation heaters are cheap insurance for critical enclosures.',
  },
  {
    title: 'Consumer Unit Burning Smell — No Trips',
    type: 'Domestic',
    scenario: 'Client reports burning smell from consumer unit area. No MCBs or RCDs have tripped. All circuits appear to work normally.',
    investigation: ['Isolated main switch immediately — burning smell is a potential fire risk', 'Removed CU cover — found discoloured busbar connection to 32A ring main MCB', 'Terminal screw loose — conductor was making intermittent contact', 'Arcing marks visible on the conductor and terminal', 'No MCB trip because the fault was high-resistance arcing, not a dead short'],
    diagnosis: 'Loose MCB terminal connection causing high-resistance arcing. The connection was making enough contact to power the circuit but generating significant heat at the junction. MCB thermal element was not affected because the current path bypassed the bimetal strip.',
    resolution: 'Re-terminated conductor. Cleaned terminal. Torqued to manufacturer specification. Replaced MCB (contacts damaged by arcing). IR and functional tests all satisfactory. Recommended AFDD installation.',
    lesson: 'A burning smell with no tripping is often a high-resistance connection or series arc fault. These are invisible to conventional MCBs and RCDs — this is exactly the scenario AFDDs are designed to detect.',
  },
  {
    title: 'Half the House Has No Power',
    type: 'Domestic',
    scenario: 'Client reports half the sockets and some lights stopped working simultaneously. The other half works fine. MCBs all appear ON.',
    investigation: ['Checked CU — all MCBs ON, but one RCD was tripped (client had not noticed the indicator)', 'Reset RCD — tripped again immediately', 'Disconnected all circuits on that RCD bank one at a time', 'RCD held with all circuits disconnected', 'Reconnected circuits one at a time — tripped when bathroom circuit reconnected', 'IR test on bathroom circuit: L-E = 0.02MΩ'],
    diagnosis: 'Severe earth fault on the bathroom lighting circuit. Water from a leaking shower tray had penetrated the ceiling void and soaked a junction box above the bathroom.',
    resolution: 'Dried and replaced the junction box and damaged cable section. Sealed the cable entry point. Advised client to repair the shower tray leak. Re-tested: IR >999MΩ. All circuits restored.',
    lesson: 'When "half the house" loses power, check which RCD bank is affected. Split RCD/RCBO boards make diagnosis easier — the tripped RCD identifies the faulty group immediately.',
  },
  {
    title: 'Industrial Motor Starter — Water Ingress',
    type: 'Industrial',
    scenario: 'Three-phase motor starter for a lathe trips on earth fault every Monday morning. Runs fine the rest of the week after the first reset.',
    investigation: ['Pattern identified: fails after weekend shutdown in unheated workshop', 'Opened IP54 control enclosure — found condensation on starter contacts and control wiring', 'IR test on control circuits when damp: 0.3MΩ. After running for 1 hour (dried out): >200MΩ', 'Inspected door gasket — cracked and compressed, no longer sealing'],
    diagnosis: 'Weekend temperature cycling caused condensation inside the control enclosure. Damaged door gasket allowed humid air to enter. The condensation reduced insulation resistance below the RCD trip threshold every Monday until the enclosure warmed up and dried out.',
    resolution: 'Replaced door gasket. Installed anti-condensation heater (thermostatically controlled, 15W) inside enclosure. Re-tested IR cold: >50MΩ. Recommended monthly gasket inspection and annual heater function check.',
    lesson: 'Monday morning faults are almost always moisture-related. Temperature cycling over the weekend causes condensation in enclosures. Anti-condensation heaters cost under £20 — cheap insurance for critical equipment.',
  },
  {
    title: 'Ring Circuit — Borrowed Neutral',
    type: 'Domestic',
    scenario: 'Kitchen ring circuit works normally but shows unexpectedly low Zs readings during EICR. RCD trips intermittently when dishwasher runs.',
    investigation: ['Zs at kitchen sockets: 0.45Ω — lower than expected for a ring on a TN-C-S with Ze of 0.32Ω', 'Continuity testing showed ring was intact — L, N and CPC all continuous', 'Opened junction box behind kitchen — found a neutral from the upstairs lighting circuit terminated in the same junction box as the ring circuit neutral', 'The borrowed neutral created a parallel return path, reducing apparent Zs'],
    diagnosis: 'A neutral conductor from the upstairs lighting circuit had been connected to the kitchen ring neutral in a shared junction box — probably during a previous alteration. This created a parallel neutral path that reduced Zs readings and caused RCD tripping because current was returning via the wrong RCD group.',
    resolution: 'Separated the neutrals into dedicated circuits. Each circuit now has its own neutral return to the correct MCB/RCBO. Re-tested: Zs now 0.82Ω (correct for circuit length). RCD tripping eliminated.',
    lesson: 'Unexpectedly LOW readings can indicate faults too — not just high readings. A Zs reading that is lower than Ze + R1+R2 should trigger investigation. Borrowed neutrals are a common cause of nuisance RCD tripping.',
  },
  {
    title: 'New Build — Protective Device in Neutral',
    type: 'Domestic',
    scenario: 'New consumer unit installed by another contractor. Client reports MCB trips on one circuit but the light stays on. Polarity appears wrong.',
    investigation: ['Tested polarity at socket — phase on neutral terminal, neutral on phase terminal', 'Traced back to consumer unit — found the MCB was installed in the neutral busbar rail, not the line', 'The MCB was breaking the neutral only, leaving the line permanently connected through the busbar', 'A line-to-earth fault would bypass the MCB entirely'],
    diagnosis: 'Single-pole MCB installed in the neutral conductor instead of the line. This meant the MCB protected the neutral (which should never be switched independently) while the line conductor was permanently live. A fault to earth would not trip the MCB because the fault current path bypassed it.',
    resolution: 'Re-wired the circuit with MCB in the line conductor. Re-tested polarity, continuity, IR, Zs — all satisfactory. Checked all other circuits in the CU for the same error — two more found and corrected.',
    lesson: 'A polarity fault at the CU is the most dangerous type — it affects the entire circuit. Always check polarity at BOTH the board and the accessories. Reg 133.2: single-pole devices must be in the line conductor only.',
  },
];

const RealWorldCasesSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Real-World Cases</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {cases.map((c, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg">{c.type}</span>
              </div>
              <p className="text-sm text-white/80">{c.scenario}</p>

              <div className="rounded-xl bg-white/[0.05] p-3">
                <p className="text-xs font-semibold text-white/60 mb-1.5">Investigation</p>
                <div className="space-y-1">
                  {c.investigation.map((step, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded bg-yellow-400/10 flex items-center justify-center mt-0.5">
                        <span className="text-[9px] font-bold text-yellow-400">{j + 1}</span>
                      </div>
                      <p className="text-xs text-white">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-orange-400/5 border border-orange-400/10 p-3">
                <p className="text-xs font-semibold text-orange-400 mb-1">Diagnosis</p>
                <p className="text-xs text-white">{c.diagnosis}</p>
              </div>

              <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Resolution</p>
                <p className="text-xs text-white">{c.resolution}</p>
              </div>

              <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-3">
                <p className="text-xs font-semibold text-yellow-400 mb-1">Lesson</p>
                <p className="text-xs text-white">{c.lesson}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RealWorldCasesSection;
