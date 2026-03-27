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
  'Electric showers are wired on a dedicated radial circuit from the consumer unit, protected by a Type B MCB rated at 40A to 50A for a 10.5kW shower. The circuit requires RCD protection under BS 7671.',
  'Repair is usually more economical than replacement for showers under five years old. A new electric shower costs £150 to £400 for the unit, plus £150 to £300 for installation.',
];

const faqs = [
  {
    question: 'Why does my electric shower keep tripping the RCD?',
    answer:
      'Repeated RCD tripping from an electric shower almost always indicates the heating element has developed a fault to earth — current is leaking through degraded element insulation to the earth conductor, which the RCD detects and trips within 30 milliseconds. This is a genuine safety fault. Do not continue to reset and use the shower. A qualified electrician will test the element insulation resistance and replace it if it has failed.',
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
      'The MCB rating depends on the shower power rating. A 7.5kW shower requires a 32A MCB, a 8.5kW shower a 40A MCB, a 9.5kW or 10.5kW shower a 45A or 50A MCB. The cable size must be matched to the MCB rating and the cable run length. 6mm² cable is required for most 40A circuits; 10mm² for 50A circuits over longer runs. Always refer to BS 7671 Table 4D5 for the correct cable size based on installation method and circuit length.',
  },
  {
    question: 'My electric shower makes a clicking noise and then goes cold — what is it?',
    answer:
      'Clicking followed by cold water typically indicates the thermal cut-out (TCO) is operating. The TCO is a safety device that disconnects the element if the water temperature exceeds a safe limit (typically 65°C to 70°C). It clicks when it trips and again when it resets. Common causes are a partially blocked shower head restricting flow (causing water to overheat in the element chamber), limescale build-up on the element reducing heat transfer efficiency, or a failing element running hotter than normal.',
  },
  {
    question: 'Do I need Building Regulations approval to replace an electric shower?',
    answer:
      'Yes. Electric shower installation and replacement is notifiable under Part P of the Building Regulations in England and Wales when the work is in a bathroom or shower room. An electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) can self-certify the work. Alternatively, you must notify the local building authority before starting work and pay an inspection fee. An Electrical Installation Certificate must be issued on completion.',
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
                detected by the flow switch (a paddle or pressure-differential switch). This sends
                a signal to the PCB to energise the heating element. If water pressure is too low,
                the flow switch does not activate and the element stays off — running cold water.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solenoid valve</strong> — an electrically operated valve that opens to
                allow water through the unit when the shower is turned on. A failed solenoid does
                not open, preventing water flow entirely or restricting it severely.
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
    id: 'safe-isolation',
    heading: 'Safe Isolation Before Any Work',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div className="space-y-2 text-white">
              <p className="font-bold text-lg">Never work on an electric shower without safe isolation</p>
              <p>
                A 10.5kW electric shower draws approximately 46A at 230V. Contact with live
                conductors inside the shower unit will cause severe burns, cardiac arrest, or
                death. Always isolate at the consumer unit and prove dead before opening the unit.
              </p>
            </div>
          </div>
        </div>
        <p>
          The safe isolation procedure for an electric shower:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">1</span>
              <span>
                <strong>Switch off at the consumer unit</strong> — locate the shower MCB (labelled
                "Shower" or the bathroom circuit) and switch it off. The shower will be wired on
                its own dedicated circuit. Lock the board or attach a warning notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">2</span>
              <span>
                <strong>Prove dead at the shower terminals</strong> — use a GS38-compliant voltage
                indicator to test between live and neutral, live and earth, and neutral and earth
                at the shower supply terminals. The shower unit contains capacitors that can hold
                charge briefly — wait at least 30 seconds after isolation before testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">3</span>
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
          An electric shower that trips the RCD every time it is switched on — or during use —
          has a fault to earth. This is by far the most common serious fault in electric showers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immediate RCD trip (on switch-on)</strong> — the element has failed with
                a dead short to earth. Insulation resistance between the element and the earth
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
                reading above 1MΩ is acceptable. Below 0.5MΩ indicates a failing element. Zero
                or near-zero indicates a failed element that must be replaced.
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
          </ul>
        </div>
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
          cause the element to overheat, accelerating insulation breakdown.
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
                model-specific and should be sourced from the manufacturer or a reputable
                electrical wholesaler. Fitting an incorrect element can cause overheating or
                RCD tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limescale prevention</strong> — in hard water areas, fitting an
                inline scale inhibitor on the cold supply to the shower extends element life
                significantly. Magnetic scale inhibitors cost £20 to £50 and require no chemicals.
                Polyphosphate dosing units are more effective but require cartridge replacement
                every six to twelve months.
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
          The solenoid valve is an electromagnetically operated valve that controls water flow
          into the heating chamber. Solenoid valve failure is a common cause of electric shower
          problems that do not involve the electrical supply circuit at all.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solenoid fails closed (no water flow)</strong> — the valve does not open
                when energised. The shower turns on but no water passes through the unit. You may
                hear a faint humming from the solenoid coil attempting to operate. The solenoid
                coil or valve body requires replacement.
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
          supply must be isolated at the isolating valve under the shower before replacing the
          valve body.
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
                Check the shower manufacturer's specifications. UK mains pressure is typically
                1.0 to 3.5 bar at the boundary, but can be lower at the shower due to pipe
                restrictions, shared supply, or peak demand periods.
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
                <strong>Partially blocked inlet filter</strong> — most electric showers have a
                small inline filter at the water inlet to catch debris. A blocked filter restricts
                flow and can prevent the flow switch from activating. The filter is accessible
                after isolating the water supply and is cleaned or replaced as part of routine
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
          Understanding which trade to call for an electric shower fault saves time and cost.
          The fault can lie in the electrical side, the plumbing side, or — in many cases — both.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call an electrician for:</strong> RCD tripping, shower not powering on,
                no heat (cold water), element or solenoid coil replacement, PCB replacement,
                circuit fault, wiring fault, installation of a new shower unit, or issuing the
                Electrical Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call a plumber for:</strong> low water pressure at the shower inlet,
                leaking water supply connections, replacing the shower hose or head, fixing the
                riser rail, or addressing a dripping solenoid valve body (the valve body
                replacement itself is within an electrician's scope if they are confident with
                pipework isolation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Either or both:</strong> a shower that drips after switch-off may be a
                solenoid fault (electrical) or a worn valve seat (plumbing). An experienced
                electrician with plumbing knowledge can often diagnose and resolve both aspects.
                If in doubt, call an electrician first — they can identify the electrical
                components as safe or faulty, then a plumber can address the water side.
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
          have discontinued parts, making repair uneconomical. Here are typical UK costs for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating element replacement</strong> — £80 to £150 all-in. Element parts
                £30 to £60, labour £50 to £90. Most common repair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solenoid valve replacement</strong> — £60 to £120 all-in. Solenoid parts
                £20 to £50, labour £40 to £70.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PCB replacement</strong> — £140 to £300 all-in. PCB parts £80 to £200
                (model-dependent), labour £60 to £100. If the PCB costs more than 60% of a new
                unit, replacement of the entire shower is better value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New shower unit fitted</strong> — £300 to £700 all-in. Shower unit £150
                to £400, installation and certification £150 to £300. A modern 10.5kW unit
                provides noticeably better performance than an older 7.5kW unit, particularly
                in winter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit upgrade (if cable or MCB is undersized)</strong> — £200 to £500
                for a new dedicated radial circuit from the consumer unit to the shower position,
                including correct cable sizing, MCB, and RCD protection.
              </span>
            </li>
          </ul>
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
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EIC On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Customers who receive a professional quote while you are present approve work
                  at a significantly higher rate than those who receive a quote later by email.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete shower installation certificates on your phone"
          description="Join 430+ UK electricians using Elec-Mate for on-site Electrical Installation Certificates, Minor Works certificates, and instant quoting. 7-day free trial."
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
      description="Electric shower fault finding guide for UK homeowners and electricians. RCD tripping, solenoid valve, heating element, flow switch, pressure issues, when to call electrician vs plumber, and 2026 repair costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
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
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Electric Shower Faults"
      relatedPages={relatedPages}
      ctaHeading="Complete Electrical Certificates On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for Electrical Installation Certificates, Minor Works certificates, and on-site quoting. No evening paperwork. 7-day free trial, cancel anytime."
    />
  );
}
