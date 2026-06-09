import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Wrench,
  PoundSterling,
  ShieldCheck,
  Zap,
  Droplets,
  FileCheck2,
  ThermometerSun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding Guides', href: '/guides/fault-finding' },
  { label: 'Electric Shower Fault Finding', href: '/electric-shower-fault-finding' },
];

const tocItems = [
  { id: 'how-it-works', label: 'How Electric Showers Work' },
  { id: 'symptom-finder', label: 'Quick Symptom Finder' },
  { id: 'safe-isolation', label: 'Safe Isolation First' },
  { id: 'rcd-tripping', label: 'RCD Tripping' },
  { id: 'heating-element', label: 'Heating Element Failure' },
  { id: 'solenoid-valve', label: 'Solenoid Valve Faults' },
  { id: 'flow-switch', label: 'Flow Switch & Pressure Issues' },
  { id: 'electrician-vs-plumber', label: 'Electrician vs Plumber' },
  { id: 'repair-costs', label: 'Typical Repair Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An electric shower that trips the RCD every time it is used almost certainly has a heating element with failed insulation — the element must be replaced, not just the RCD reset.',
  'Solenoid valve failure is one of the most common causes of an electric shower that runs cold or will not start the flow of water — the valve is replaceable without replacing the entire unit.',
  'Low water pressure is a plumbing issue, not an electrical one — the flow switch in the shower requires a minimum dynamic pressure (typically 0.7 to 1.0 bar) to activate the heating element.',
  'Electric showers are wired on a dedicated radial circuit from the consumer unit. A 10.5kW unit draws roughly 46A at 230V and is typically protected by a 50A Type B device. BS 7671 Reg 701.411.3.3 requires 30mA RCD additional protection (per Reg 415.1.1) for low-voltage circuits serving a room containing a bath or shower, and for circuits passing through zones 1 and 2.',
  'Repair is usually more economical than replacement for showers under five years old. A new electric shower costs £150 to £400 for the unit, plus £150 to £300 for installation.',
];

const answerBox = {
  question: 'Why is my electric shower not working?',
  answer:
    'Most electric shower faults fall into three groups. If it trips the RCD, the heating element has likely failed to earth and must be replaced. If it runs cold, the element has gone open-circuit, or the flow switch or solenoid valve is not activating the element. If there is no water flow, suspect low pressure or a blocked inlet filter. Isolate at the consumer unit and prove dead before any work; element, PCB and wiring faults are electrician-only.',
};

const faqs = [
  {
    question: 'Why does my electric shower keep tripping the RCD?',
    answer:
      'Repeated RCD tripping from an electric shower almost always indicates the heating element has developed a fault to earth — current is leaking through degraded element insulation to the earth conductor, which the 30mA RCD detects and disconnects. Under BS 7671 Reg 643.8, a general non-delay RCD is deemed effective where it disconnects within 300 milliseconds at its rated residual operating current; in practice most trip considerably faster. This is a genuine safety fault. Do not continue to reset and use the shower. A qualified electrician will test the element insulation resistance and replace it if it has failed.',
  },
  {
    question: 'My electric shower runs cold — what is wrong?',
    answer:
      'Cold water from an electric shower has several possible causes: the heating element has failed open-circuit (no heat produced), the flow switch is not activating the element circuit, the solenoid valve is not opening fully to allow adequate flow, or the water pressure is too low for the flow switch to activate. Start by checking the pressure setting on the shower unit if it has a manual pressure adjuster. If the problem persists, call an electrician to test the element and internal components.',
  },
  {
    question: 'Can a plumber fix my electric shower?',
    answer:
      'A plumber can address the water supply side — checking mains pressure, fixing supply pipe issues, and replacing the shower hose, head, or riser rail. However, any work on the internal electrical components (element, PCB, solenoid valve wiring, thermal cut-out) must be carried out by a qualified electrician. The two trades sometimes overlap on shower work — an experienced electrician who also understands plumbing principles is the most efficient choice.',
  },
  {
    question: 'How much does it cost to repair an electric shower?',
    answer:
      'Repair costs vary by fault type. A solenoid valve replacement costs £60 to £120 in parts and labour. An element replacement costs £80 to £150. A PCB (printed circuit board) replacement costs £80 to £200 for the board plus £60 to £100 labour. If the total repair cost exceeds 50% of the replacement cost of the shower unit, replacement is usually the better option.',
  },
  {
    question: 'What size MCB does an electric shower need?',
    answer:
      'The protective device rating follows the shower power rating and its full-load current (power divided by 230V). As a typical starting point a 7.5kW or 8.5kW shower uses a 40A device, a 9.5kW a 45A device, and a 10.5kW a 50A device — usually Type B. The cable must be sized for that load and the installation conditions, not just matched to the device. Confirm the cable cross-sectional area against BS 7671 Table 4D5 (the typical flat twin-and-earth shower cable) with the correct correction factors for installation method, grouping and run length, and provide 30mA RCD additional protection per Reg 701.411.3.3.',
  },
  {
    question: 'My electric shower makes a clicking noise and then goes cold — what is it?',
    answer:
      'Clicking followed by cold water typically indicates the thermal cut-out (TCO) is operating. The TCO is a safety device that disconnects the element if the water temperature exceeds a safe limit (typically 65°C to 70°C). It clicks when it trips and again when it resets. Common causes are a partially blocked shower head restricting flow (causing water to overheat in the element chamber), limescale build-up on the element reducing heat transfer efficiency, or a failing element running hotter than normal.',
  },
  {
    question: 'Do I need Building Regulations approval to replace an electric shower?',
    answer:
      'It depends on whether a new circuit is required. Under Approved Document P, a like-for-like replacement of an electric shower connected to an existing dedicated circuit and isolator is generally not notifiable. The work becomes notifiable when a new circuit from the consumer unit to the shower position is required — for example, when upgrading from a lower-rated shower or installing a shower for the first time. Where the work is notifiable, an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) can self-certify. Otherwise you must notify the local building authority before starting. An Electrical Installation Certificate must be issued on completion of any notifiable work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/immersion-heater-fault-finding',
    title: 'Immersion Heater Fault Finding',
    description: 'Thermostat failure, element burn-out, anode checks, and repair costs.',
    icon: ThermometerSun,
    category: 'Fault Finding',
  },
  {
    href: '/underfloor-heating-fault-finding',
    title: 'Underfloor Heating Fault Finding',
    description: 'Thermostat faults, damaged heating mats, and insulation resistance testing.',
    icon: Zap,
    category: 'Fault Finding',
  },
  {
    href: '/outdoor-socket-fault-finding',
    title: 'Outdoor Socket Fault Finding',
    description: 'RCD protection, weatherproof requirements, IP ratings, and earth faults.',
    icon: ShieldCheck,
    category: 'Fault Finding',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'how-it-works',
    heading: 'How Electric Showers Work',
    content: (
      <>
        <p>
          An electric shower heats cold mains water on demand as it flows over the heating element.
          Unlike mixer showers, electric showers do not use the stored hot water in a cylinder —
          they take cold water directly from the mains and heat it instantaneously. This makes them
          independent of the boiler or cylinder, but also means they require a large dedicated
          electrical circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flow switch</strong> — when the shower valve is turned on, water flow is
                detected by the flow switch (a paddle or pressure-differential switch). This sends a
                signal to the PCB to energise the heating element. If water pressure is too low, the
                flow switch does not activate and the element stays off — running cold water.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solenoid valve</strong> — an electrically operated valve that opens to allow
                water through the unit when the shower is turned on. A failed solenoid does not
                open, preventing water flow entirely or restricting it severely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating element</strong> — a resistance heating element rated typically
                7.5kW to 10.5kW. Higher rated units heat water more effectively in winter when mains
                water temperature drops. The element is the most failure-prone component.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PCB (printed circuit board)</strong> — controls the element, temperature
                selection, and safety cut-outs. PCB failure causes erratic behaviour, loss of
                temperature control, or complete failure to operate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal cut-out (TCO)</strong> — a safety device that disconnects the
                element if water temperature exceeds a safe limit. Operated by a bimetal strip that
                trips and requires manual resetting via a button on the unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'symptom-finder',
    heading: 'Quick Symptom Finder',
    content: (
      <>
        <p>
          Use the table below to narrow down the fault before you start. Match the symptom to the
          most likely cause, then jump to the relevant section. Anything involving the element, PCB,
          solenoid coil or wiring is electrician-only work — always isolate and prove dead first.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead>
                <tr className="bg-white/[0.06] border-b border-white/10 text-white/70">
                  <th className="px-4 py-3 font-semibold">Symptom</th>
                  <th className="px-4 py-3 font-semibold">Most likely cause</th>
                  <th className="px-4 py-3 font-semibold">Who to call</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="bg-red-900/20">
                  <td className="px-4 py-3 font-medium">Trips the RCD on switch-on, every time</td>
                  <td className="px-4 py-3">Element failed dead-short to earth</td>
                  <td className="px-4 py-3 text-red-200">Electrician</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Trips the RCD after a few minutes</td>
                  <td className="px-4 py-3">Element insulation breaking down when hot</td>
                  <td className="px-4 py-3 text-red-200">Electrician</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Runs cold, water flows normally</td>
                  <td className="px-4 py-3">Open-circuit element or flow switch not activating</td>
                  <td className="px-4 py-3 text-red-200">Electrician</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">No water flow at all</td>
                  <td className="px-4 py-3">Solenoid stuck closed, blocked inlet filter</td>
                  <td className="px-4 py-3 text-white/80">Either</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Weak / cold only at peak times</td>
                  <td className="px-4 py-3">Low dynamic water pressure</td>
                  <td className="px-4 py-3 text-blue-200">Plumber</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Drips from head after switch-off</td>
                  <td className="px-4 py-3">Solenoid not closing or worn valve seat</td>
                  <td className="px-4 py-3 text-white/80">Either</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Clicks then goes cold</td>
                  <td className="px-4 py-3">Thermal cut-out (TCO) operating</td>
                  <td className="px-4 py-3 text-red-200">Electrician</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Erratic temperature / dead unit</td>
                  <td className="px-4 py-3">PCB failure</td>
                  <td className="px-4 py-3 text-red-200">Electrician</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safe Isolation Before Any Work',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div className="space-y-2 text-white">
              <p className="font-bold text-lg">
                Never work on an electric shower without safe isolation
              </p>
              <p>
                A 10.5kW electric shower draws approximately 46A at 230V. Contact with live
                conductors inside the shower unit will cause severe burns, cardiac arrest, or death.
                Always isolate at the consumer unit and prove dead before opening the unit.
              </p>
            </div>
          </div>
        </div>
        <p>The safe isolation procedure for an electric shower:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                1
              </span>
              <span>
                <strong>Switch off at the consumer unit</strong> — locate the shower MCB (labelled
                "Shower" or the bathroom circuit) and switch it off. The shower will be wired on its
                own dedicated circuit. Lock the board or attach a warning notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                2
              </span>
              <span>
                <strong>Prove dead at the shower terminals</strong> — use a GS38-compliant voltage
                indicator to test between live and neutral, live and earth, and neutral and earth at
                the shower supply terminals. The shower unit contains capacitors that can hold
                charge briefly — wait at least 30 seconds after isolation before testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                3
              </span>
              <span>
                <strong>Test and retest your tester</strong> — verify your voltage indicator works
                on a known live source before and after proving dead. A faulty tester is one of the
                most common causes of electrical fatality.
              </span>
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-tripping',
    heading: 'RCD Tripping — Earth Fault Diagnosis',
    content: (
      <>
        <p>
          An electric shower that trips the RCD every time it is switched on — or during use — has a
          fault to earth. This is by far the most common serious fault in electric showers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immediate RCD trip (on switch-on)</strong> — the element has failed with a
                dead short to earth. Insulation resistance between the element and the earth
                terminal will read close to zero. The element must be replaced. Do not continue
                resetting the RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD trips after a few minutes of use</strong> — the element insulation is
                degrading and the leakage current increases as it heats up. Insulation resistance
                may read acceptable when cold but fall to below 0.5MΩ when the element reaches
                operating temperature. Test insulation resistance hot and cold for accurate
                diagnosis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing the element</strong> — after safe isolation, disconnect the element
                leads from the PCB or terminal block. Set a multifunction tester to 500V DC
                insulation resistance test. Measure between each element terminal and earth. A
                reading above 1MΩ is acceptable. Below 0.5MΩ indicates a failing element. Zero or
                near-zero indicates a failed element that must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water ingress</strong> — if the shower enclosure seals have failed, water
                may have penetrated the shower unit and is causing a leakage path to earth. Check
                the unit casing and all cable entry points for signs of water ingress before
                concluding the element has failed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory requirement</strong> — BS 7671 Reg 701.411.3.3 requires
                additional protection by one or more RCDs having the characteristics specified in
                Reg 415.1.1 (rated residual operating current not exceeding 30mA) for low-voltage
                circuits serving a room containing a bath or shower, and for circuits passing through
                zones 1 and 2 not serving the location. This includes the dedicated shower circuit.
                Where the shower circuit is the only circuit in that location, a dedicated RCBO
                protecting the shower circuit alone is the correct approach and avoids nuisance
                tripping affecting other circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Interpreting the insulation resistance reading at a 500V DC test between each element
          terminal and earth:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead>
                <tr className="bg-white/[0.06] border-b border-white/10 text-white/70">
                  <th className="px-4 py-3 font-semibold">IR reading (element to earth)</th>
                  <th className="px-4 py-3 font-semibold">Verdict</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="bg-green-900/20">
                  <td className="px-4 py-3 font-medium">Above 1 MΩ</td>
                  <td className="px-4 py-3 text-green-200">Healthy</td>
                  <td className="px-4 py-3">Look elsewhere for the fault</td>
                </tr>
                <tr className="bg-yellow-900/20">
                  <td className="px-4 py-3 font-medium">0.5–1 MΩ</td>
                  <td className="px-4 py-3 text-yellow-200">Degrading</td>
                  <td className="px-4 py-3">Investigate; retest hot</td>
                </tr>
                <tr className="bg-red-900/20">
                  <td className="px-4 py-3 font-medium">Below 0.5 MΩ</td>
                  <td className="px-4 py-3 text-red-200">Failing element</td>
                  <td className="px-4 py-3">Replace element</td>
                </tr>
                <tr className="bg-red-900/30">
                  <td className="px-4 py-3 font-medium">Near zero</td>
                  <td className="px-4 py-3 text-red-200">Dead short to earth</td>
                  <td className="px-4 py-3">Replace element</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-white/70 text-sm">
          These thresholds are practical fault-finding guidance for a single appliance element, not
          a circuit insulation resistance acceptance value. For circuit insulation resistance
          minimums during inspection and testing, refer to{' '}
          <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
            insulation resistance testing
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'heating-element',
    heading: 'Heating Element Failure',
    content: (
      <>
        <p>
          The heating element is the most failure-prone component in an electric shower, typically
          lasting five to ten years depending on water hardness, usage frequency, and power rating.
          In hard water areas, limescale deposits on the element surface reduce heat transfer and
          cause the element to overheat, accelerating insulation breakdown — the same failure mode
          seen in{' '}
          <SEOInternalLink href="/immersion-heater-fault-finding">
            immersion heater elements
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-circuit element (no heat)</strong> — the resistance wire inside the
                element sheath has burned through. The circuit is broken and no current flows, so
                the shower runs cold. Test continuity of the element with the tester set to ohms —
                an open circuit (OL reading) confirms this fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element replacement</strong> — in most shower units, the element is
                accessible after removing the front cover. The element is secured with screws or
                clips and connected to the PCB via spade connectors. Replacement elements are
                model-specific and should be sourced from the manufacturer or a reputable electrical
                wholesaler. Fitting an incorrect element can cause overheating or RCD tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limescale prevention</strong> — in hard water areas, fitting an inline scale
                inhibitor on the cold supply to the shower extends element life significantly.
                Magnetic scale inhibitors cost £20 to £50 and require no chemicals. Polyphosphate
                dosing units are more effective but require cartridge replacement every six to
                twelve months.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'solenoid-valve',
    heading: 'Solenoid Valve Faults',
    content: (
      <>
        <p>
          The solenoid valve is an electromagnetically operated valve that controls water flow into
          the heating chamber. Solenoid valve failure is a common cause of electric shower problems
          that do not involve the electrical supply circuit at all.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solenoid fails closed (no water flow)</strong> — the valve does not open
                when energised. The shower turns on but no water passes through the unit. You may
                hear a faint humming from the solenoid coil attempting to operate. The solenoid coil
                or valve body requires replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solenoid fails open (water drips when off)</strong> — the valve does not
                close fully when de-energised. Water continues to drip from the shower head after
                the unit is switched off. Scale deposits on the valve seat are a common cause in
                hard water areas. The valve seat can sometimes be cleaned; otherwise the solenoid
                assembly requires replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solenoid coil testing</strong> — after safe isolation, disconnect the
                solenoid coil leads and measure resistance across the coil terminals. A typical
                solenoid coil reads 1kΩ to 4kΩ. An open circuit (OL) indicates a failed coil. A
                reading near zero indicates a shorted coil. Both require replacement of the coil
                assembly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Solenoid replacement is a job for an electrician familiar with the specific shower model.
          The valve is accessible after safe isolation and removal of the shower cover. The water
          supply must be isolated at the isolating valve under the shower before replacing the valve
          body.
        </p>
      </>
    ),
  },
  {
    id: 'flow-switch',
    heading: 'Flow Switch & Water Pressure Issues',
    content: (
      <>
        <p>
          The flow switch tells the shower's PCB that water is flowing and it is safe to energise
          the heating element. If water pressure is too low, the flow switch does not activate and
          the shower runs cold — this is a plumbing issue, not an electrical fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum pressure requirement</strong> — most electric showers require a
                minimum dynamic (flowing) water pressure of 0.7 to 1.0 bar at the shower inlet.
                Check the shower manufacturer's specifications. UK mains pressure is typically 1.0
                to 3.5 bar at the boundary, but can be lower at the shower due to pipe restrictions,
                shared supply, or peak demand periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed flow switch</strong> — the flow switch itself can fail. If water
                pressure is confirmed adequate but the element still does not activate, the flow
                switch may be stuck. After safe isolation, the switch can be tested for continuity
                with a multimeter whilst manually operating the shower valve to simulate water flow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partially blocked inlet filter</strong> — most electric showers have a small
                inline filter at the water inlet to catch debris. A blocked filter restricts flow
                and can prevent the flow switch from activating. The filter is accessible after
                isolating the water supply and is cleaned or replaced as part of routine
                maintenance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrician-vs-plumber',
    heading: 'Electrician vs Plumber — Who to Call',
    content: (
      <>
        <p>
          Understanding which trade to call for an electric shower fault saves time and cost. The
          fault can lie in the electrical side, the plumbing side, or — in many cases — both.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call an electrician for:</strong> RCD tripping, shower not powering on, no
                heat (cold water), element or solenoid coil replacement, PCB replacement, circuit
                fault, wiring fault, installation of a new shower unit, or issuing the Electrical
                Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call a plumber for:</strong> low water pressure at the shower inlet, leaking
                water supply connections, replacing the shower hose or head, fixing the riser rail,
                or addressing a dripping solenoid valve body (the valve body replacement itself is
                within an electrician's scope if they are confident with pipework isolation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Either or both:</strong> a shower that drips after switch-off may be a
                solenoid fault (electrical) or a worn valve seat (plumbing). An experienced
                electrician with plumbing knowledge can often diagnose and resolve both aspects. If
                in doubt, call an electrician first — they can identify the electrical components as
                safe or faulty, then a plumber can address the water side.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'repair-costs',
    heading: 'Typical Repair Costs — 2026 Prices',
    content: (
      <>
        <p>
          Repair costs for electric showers vary by fault type and shower model. Older models may
          have discontinued parts, making repair uneconomical. The figures below are indicative UK
          market guidance for 2026 — not a quote. Always get a price confirmed for your specific
          unit and circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead>
                <tr className="bg-white/[0.06] border-b border-white/10 text-white/70">
                  <th className="px-4 py-3 font-semibold">Repair</th>
                  <th className="px-4 py-3 font-semibold">Parts</th>
                  <th className="px-4 py-3 font-semibold">Labour</th>
                  <th className="px-4 py-3 font-semibold">Typical all-in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="bg-yellow-900/20">
                  <td className="px-4 py-3 font-medium">Heating element (most common)</td>
                  <td className="px-4 py-3">£30–£60</td>
                  <td className="px-4 py-3">£50–£90</td>
                  <td className="px-4 py-3 font-semibold text-yellow-300">£80–£150</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Solenoid valve</td>
                  <td className="px-4 py-3">£20–£50</td>
                  <td className="px-4 py-3">£40–£70</td>
                  <td className="px-4 py-3 font-semibold text-yellow-300">£60–£120</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">PCB (model-dependent)</td>
                  <td className="px-4 py-3">£80–£200</td>
                  <td className="px-4 py-3">£60–£100</td>
                  <td className="px-4 py-3 font-semibold text-yellow-300">£140–£300</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">New shower unit fitted</td>
                  <td className="px-4 py-3">£150–£400</td>
                  <td className="px-4 py-3">£150–£300</td>
                  <td className="px-4 py-3 font-semibold text-yellow-300">£300–£700</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">New dedicated circuit</td>
                  <td className="px-4 py-3" colSpan={2}>
                    Cable, MCB/RCBO, RCD protection &amp; certification
                  </td>
                  <td className="px-4 py-3 font-semibold text-yellow-300">£200–£500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4 text-white text-sm leading-relaxed">
          <strong className="text-blue-200">Repair or replace?</strong> If the total repair cost
          exceeds roughly half the cost of a new fitted unit — or the PCB alone exceeds 60% of a new
          unit — replacement is usually the better value, especially for showers over five years old
          where further failures are likely. A modern 10.5kW unit also performs noticeably better
          than an older 7.5kW unit in winter, when incoming mains water is coldest.
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Electric Shower Work',
    content: (
      <>
        <p>
          Electric shower installation and replacement is notifiable work under Part P of the
          Building Regulations in England and Wales. Registration with NICEIC, NAPIT, or ELECSA
          allows you to self-certify the work and issue an Electrical Installation Certificate on
          completion. The certificate must be handed to the customer before you leave site.
        </p>
        <p>
          The dedicated shower circuit must be designed for the unit's power rating. Approximate
          full-load current is the power rating divided by the nominal supply voltage (230V). The
          MCB or RCBO and cable must both be sized for that load and the installation conditions.
          Cable cross-sectional area depends on the installation method, grouping, ambient
          temperature and run length — verify against BS 7671 Table 4D5 (70°C thermoplastic flat
          twin-and-earth cable, the typical shower cable) and apply the relevant correction factors
          rather than relying on a rule of thumb.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead>
                <tr className="bg-white/[0.06] border-b border-white/10 text-white/70">
                  <th className="px-4 py-3 font-semibold">Shower rating</th>
                  <th className="px-4 py-3 font-semibold">Approx. load at 230V</th>
                  <th className="px-4 py-3 font-semibold">Typical protective device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-4 py-3 font-medium">7.5 kW</td>
                  <td className="px-4 py-3">≈ 33 A</td>
                  <td className="px-4 py-3">40 A Type B</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">8.5 kW</td>
                  <td className="px-4 py-3">≈ 37 A</td>
                  <td className="px-4 py-3">40 A Type B</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">9.5 kW</td>
                  <td className="px-4 py-3">≈ 41 A</td>
                  <td className="px-4 py-3">45 A Type B</td>
                </tr>
                <tr className="bg-yellow-900/20">
                  <td className="px-4 py-3 font-medium">10.5 kW</td>
                  <td className="px-4 py-3">≈ 46 A</td>
                  <td className="px-4 py-3">50 A Type B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Device ratings shown are a common starting point; the final selection is the designer's
          and must satisfy overload and fault protection for the actual cable, length and
          installation method. Confirm the consumer unit can accommodate the load and that 30mA RCD
          additional protection is in place per Reg 701.411.3.3.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EIC On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Elec-Mate Electrical Installation Certificate app
                  </SEOInternalLink>{' '}
                  to complete and sign the EIC before leaving the property. Record test results,
                  circuit details, and schedule of inspections directly on your phone. Instant PDF
                  to the customer — no chasing paperwork later.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Upgrade While On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the shower circuit has undersized cable or an unprotected circuit, quote the
                  upgrade immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Customers who receive a professional quote while you are present approve work at
                  a significantly higher rate than those who receive a quote later by email.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Bonding &amp; A4:2026 Compliance Checks
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  When installing or replacing a shower in an older property, verify supplementary
                  protective equipotential bonding under BS 7671 Reg 701.415.2 — the terminals of the
                  protective conductor of each circuit supplying Class I and Class II equipment must
                  be connected to accessible extraneous-conductive-parts in the room, including
                  metallic service and waste pipes, metallic central heating pipework, and accessible
                  metallic structural parts. This local supplementary bonding may be omitted only
                  where the location's final circuits meet automatic disconnection, have 30mA RCD
                  additional protection, and the extraneous-conductive-parts are effectively
                  connected to the main protective bonding. Note that the A4:2026 AFDD requirement in
                  Reg 421.1.7 applies to single-phase AC final circuits supplying socket-outlets
                  rated up to 32A in specified building types (such as high-rise residential
                  buildings, HMOs, purpose-built student accommodation and care homes) — a dedicated
                  shower circuit is not a socket-outlet circuit, so 421.1.7 does not mandate an AFDD
                  on the shower circuit itself.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Electric Shower Broken? Fault-Find in 2026"
          description="Electric shower not working? Diagnose 8 common faults fast. Step-by-step guides for electricians. Get your shower back online today."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricShowerFaultFindingPage() {
  return (
    <GuideTemplate
      title="Electric Shower Not Working | Fault Finding & Repair Guide"
      description="Electric shower fault finding guide for UK homeowners and electricians. RCD tripping, solenoid valve, heating element, flow switch, pressure issues…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electric Shower Not Working:{' '}
          <span className="text-yellow-400">Fault Finding & Repair Guide</span>
        </>
      }
      heroSubtitle="Complete fault finding guide for electric showers — RCD tripping, cold water, solenoid valve faults, element failure, flow switch issues, low pressure diagnosis, when to call an electrician vs plumber, and typical repair costs for 2026."
      readingTime={13}
      answerBox={answerBox}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Electric Shower Faults"
      relatedPages={relatedPages}
      ctaHeading="Complete Electrical Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for Electrical Installation Certificates, Minor Works certificates, and on-site quoting. No evening paperwork. 7-day free trial, cancel anytime."
    />
  );
}
