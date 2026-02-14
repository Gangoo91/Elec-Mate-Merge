import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  Activity,
  CheckCircle2,
  Search,
  Cable,
  FileText,
  Gauge,
  Wrench,
  Power,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Circuit Breaker Keeps Tripping | Causes & Fixes';
const PAGE_DESCRIPTION =
  'Why does your circuit breaker keep tripping? Expert guide covering MCB vs RCD tripping, overloaded circuits, short circuits, earth faults, faulty appliances vs faulty wiring, when to call an electrician, and how Elec-Mate helps diagnose the root cause.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Circuit Breaker Keeps Tripping', href: '/guides/circuit-breaker-keeps-tripping' },
];

const tocItems = [
  { id: 'mcb-vs-rcd', label: 'MCB Tripping vs RCD Tripping' },
  { id: 'causes-mcb-tripping', label: 'Causes of MCB Tripping' },
  { id: 'diagnosing-circuit', label: 'Diagnosing Which Circuit' },
  { id: 'overloaded-circuits', label: 'Common Overloaded Circuits' },
  { id: 'appliance-vs-wiring', label: 'Faulty Appliance vs Faulty Wiring' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'temporary-vs-proper', label: 'Temporary Solutions vs Proper Fix' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'An MCB tripping means too much current is flowing through the circuit (overload or short circuit), while an RCD tripping means current is leaking to earth — they are fundamentally different faults requiring different diagnostic approaches.',
  'The most common cause of repeated MCB tripping in UK homes is an overloaded kitchen ring circuit — too many high-wattage appliances (kettle, toaster, microwave, dishwasher) running simultaneously on a single 32A ring.',
  'A short circuit (live touching neutral) will trip the MCB instantly and usually produces a loud bang or flash — this is a serious fault that requires immediate investigation by a qualified electrician.',
  "Elec-Mate's max demand calculator checks whether your circuits are overloaded by comparing connected load against the MCB rating, and the board scanner reads MCB ratings directly from a photo of your distribution board.",
  'If the MCB trips immediately on resetting with all appliances disconnected, the fault is in the fixed wiring — do not keep resetting the MCB, as this can cause further damage at the fault point.',
];

const faqs = [
  {
    question: 'What is the difference between an MCB tripping and an RCD tripping?',
    answer:
      'An MCB (Miniature Circuit Breaker) trips when the current flowing through the circuit exceeds its rated capacity. This can be caused by an overload (too many appliances drawing power simultaneously) or a short circuit (a direct connection between live and neutral conductors). The MCB protects the cable from overheating and potentially catching fire. An RCD (Residual Current Device) trips when it detects an imbalance between the current flowing out through the live conductor and the current returning through the neutral — meaning some current is leaking to earth through a fault, moisture, or a person. The RCD primarily protects against electric shock. An RCBO combines both functions: if it trips, check the trip indicator on the device to determine whether it was an overcurrent trip or an earth leakage trip, as the diagnostic approach is completely different for each.',
  },
  {
    question: 'Why does my circuit breaker trip when I turn on the kettle?',
    answer:
      'A standard UK kettle draws approximately 13 amps at 3 kW. If the kettle is on the same circuit as other high-wattage appliances — such as a toaster (around 9 amps), a microwave (around 6 amps), or a dishwasher (around 10 amps) — the combined load can exceed the 32-amp rating of a typical kitchen ring circuit. The MCB trips because the total current draw exceeds its rating. The solution is to spread high-wattage appliances across different circuits, avoid running multiple high-draw appliances simultaneously, or have an electrician install additional circuits to the kitchen. If the MCB trips with only the kettle connected and nothing else, the kettle itself may have an internal fault such as a short circuit in the heating element, in which case the kettle should be replaced.',
  },
  {
    question: 'Can a faulty appliance keep tripping my circuit breaker?',
    answer:
      'Yes, a faulty appliance is one of the most common causes of repeated MCB tripping. If the appliance has developed an internal short circuit — for example, a damaged heating element in a washing machine, a worn motor in a tumble dryer, or a cracked element in an immersion heater — it will draw excessive current and trip the MCB. The fault may be intermittent: the appliance works normally when cold but develops a short when the element expands under heat. To identify the faulty appliance, unplug everything on the affected circuit and reconnect appliances one at a time. When the MCB trips after connecting a specific appliance, that is your culprit. Have the appliance repaired by a qualified engineer or replace it.',
  },
  {
    question: 'Is it dangerous to keep resetting a tripping circuit breaker?',
    answer:
      'Yes, repeatedly resetting a tripping MCB can be dangerous. Each time the MCB trips, it is responding to a fault condition — either excessive current or a short circuit. At the point of the fault, energy is being dissipated as heat. Repeatedly re-energising the circuit forces more current through the fault point, which can cause conductor overheating, insulation melting, arcing, and potentially fire — particularly if the fault is inside a wall void or ceiling space where it cannot be seen. If the MCB trips immediately on resetting, do not attempt to reset it again. Leave the circuit off and call a qualified electrician. If the MCB holds for a period before tripping, identify which appliance is causing the overload and disconnect it.',
  },
  {
    question: 'How do I know if my circuit is overloaded?',
    answer:
      "A circuit is overloaded when the total current drawn by all connected appliances exceeds the rating of the MCB protecting that circuit. For a typical UK kitchen ring circuit on a 32A MCB, the maximum continuous load is approximately 7.3 kW (32 amps multiplied by 230 volts). Add up the wattage of every appliance running simultaneously on that circuit: a kettle (3 kW) plus a toaster (2 kW) plus a microwave (1.5 kW) plus a dishwasher (2.2 kW) totals 8.7 kW — exceeding the 32A MCB rating. Elec-Mate's max demand calculator lets you enter all the appliances on a circuit and instantly tells you whether the total load exceeds the MCB rating, applying diversity factors per BS 7671 to give you an accurate assessment.",
  },
  {
    question: 'What does it mean if the MCB trips immediately on resetting?',
    answer:
      'An MCB that trips the instant you push it to the ON position — with no delay whatsoever — indicates a dead short circuit on the circuit it protects. This means live and neutral conductors are making direct contact somewhere on that circuit, or a live conductor is in direct contact with earth. This is the most serious type of circuit fault. Common causes include a nail or screw driven through a cable during DIY work, a cable crushed by floorboards, a rodent chewing through insulation, or a connector that has come loose inside a junction box allowing bare conductors to touch. Do not repeatedly reset the MCB. Leave the circuit isolated and call a qualified electrician who will carry out insulation resistance testing and visual inspection to locate the fault.',
  },
];

const sections = [
  {
    id: 'mcb-vs-rcd',
    heading: 'MCB Tripping vs RCD Tripping — What Is the Difference?',
    content: (
      <>
        <p>
          Before diagnosing why your circuit breaker keeps tripping, you need to identify{' '}
          <em>which</em> device is actually tripping. In a modern UK consumer unit (fuse board),
          there are two types of protective device that can trip: MCBs and RCDs. They protect
          against completely different hazards, and the diagnostic approach is different for each.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">MCB (Miniature Circuit Breaker)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              An MCB protects against overcurrent — too much current flowing through the circuit. It
              trips when the current exceeds its rated capacity, which is printed on the front of
              the device (typically 6A, 10A, 16A, 20A, or 32A for domestic circuits). An MCB trips
              for two reasons: overload (gradual, sustained overcurrent — takes a few seconds or
              minutes) or short circuit (massive instantaneous current — trips within milliseconds).
              When an MCB trips, the switch moves to the middle or OFF position and only that one
              circuit loses power.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-yellow-400 text-lg">RCD (Residual Current Device)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              An RCD protects against earth leakage — current escaping from the circuit through a
              fault, moisture, or a person. It monitors the balance between current flowing out on
              the live conductor and returning on the neutral. If the difference exceeds 30 mA, the
              RCD disconnects in under 40 milliseconds. When an RCD trips, every circuit protected
              by that RCD loses power — often half the circuits in the house. If your{' '}
              <SEOInternalLink href="/guides/rcd-keeps-tripping">
                RCD keeps tripping
              </SEOInternalLink>
              , the diagnostic process is different from MCB tripping.
            </p>
          </div>
        </div>
        <p>
          Some modern consumer units use RCBOs (Residual Current Breaker with Overload protection),
          which combine both MCB and RCD functions into a single device. An RCBO can trip for either
          overcurrent or earth leakage. Most RCBOs have a trip indicator that shows which protection
          operated — check this before starting your diagnosis, as it determines whether you are
          dealing with an overcurrent problem or an earth leakage problem.
        </p>
      </>
    ),
  },
  {
    id: 'causes-mcb-tripping',
    heading: 'Causes of MCB Tripping',
    content: (
      <>
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Power className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">1. Overload — Too Many Appliances</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              An overload occurs when the total current drawn by all appliances on a circuit exceeds
              the MCB rating. This is the most common cause of MCB tripping in UK homes. The MCB
              trips after a delay — anywhere from a few seconds to several minutes depending on how
              far above the rating the current is. For example, a 32A MCB will carry 32 amps
              indefinitely, but at 40 amps it will trip within about 60 seconds. At 50 amps it trips
              within seconds. The thermal element inside the MCB heats up proportionally to the
              overcurrent and eventually triggers the trip mechanism.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                2. Short Circuit — Live-to-Neutral Fault
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              A short circuit occurs when the live conductor makes direct contact with the neutral
              conductor, bypassing the load. This creates an extremely high fault current —
              potentially thousands of amps — limited only by the impedance of the supply and the
              cable. The MCB's magnetic trip mechanism operates within milliseconds. A short circuit
              often produces a visible flash, a loud bang, or a burning smell. Common causes include
              damaged cables (nail through a cable, crushed cable under floorboards), loose
              connections in junction boxes or accessories, and internal faults in appliances. A
              short circuit is a serious fault that requires immediate investigation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">3. Earth Fault (If RCBO Fitted)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If the device that keeps tripping is an RCBO rather than a plain MCB, it could be
              tripping on its residual current (earth leakage) function rather than overcurrent. An
              earth fault allows current to leak from a live conductor to earth through damaged
              insulation, moisture, or a faulty appliance. The RCBO detects the imbalance between
              live and neutral currents and disconnects the circuit. Check the trip indicator on the
              RCBO to determine which function operated. If it is an earth leakage trip, follow the{' '}
              <SEOInternalLink href="/guides/rcd-keeps-tripping">
                RCD tripping diagnostic process
              </SEOInternalLink>{' '}
              instead.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="AI Fault Diagnosis in Elec-Mate"
          description="Describe the tripping pattern — when it happens, which circuit, what you were doing — and the Elec-AI diagnostic agent guides you through a systematic fault-finding process. It cross-references your symptoms against known fault patterns to help identify whether you are dealing with an overload, short circuit, or earth fault."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'diagnosing-circuit',
    heading: 'Diagnosing Which Circuit Is Causing the Problem',
    content: (
      <>
        <p>
          When an MCB trips, the first step is to identify exactly which circuit is affected. In a
          labelled consumer unit, the tripped MCB switch will be in the middle or OFF position and
          the circuit label tells you which circuit it protects (e.g., "Kitchen Sockets", "Upstairs
          Lights", "Shower"). If your consumer unit is not labelled, identifying the circuit
          requires a process of elimination.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              1
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Identify the tripped MCB.</strong> Open the consumer
              unit cover and look for the MCB switch that is in the middle or OFF position. Note its
              rating (printed on the front) and the circuit label if one exists.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              2
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Unplug all appliances on the affected circuit.</strong>{' '}
              If you know which circuit has tripped (e.g., kitchen sockets), unplug every appliance
              on that circuit. If you do not know which circuit it is, check which sockets and
              lights have lost power to identify the circuit.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              3
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Reset the MCB.</strong> Push the switch firmly to the
              ON position. If it holds with all appliances disconnected, the fault is in an
              appliance (reconnect one at a time to identify it). If it trips immediately, the fault
              is in the fixed wiring.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              4
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Reconnect appliances one at a time.</strong> Plug in
              each appliance, switch it on, and wait. When the MCB trips, the last appliance
              connected is likely the cause. Disconnect it, reset the MCB, and continue testing the
              remaining appliances.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Board Scanner — Read MCB Ratings from a Photo"
          description="Point your phone at the consumer unit and Elec-Mate's AI reads every MCB and RCBO rating, circuit detail, and board layout from a single photograph. No more squinting at faded labels or trying to read tiny markings in poor light."
          icon={Gauge}
        />
      </>
    ),
  },
  {
    id: 'overloaded-circuits',
    heading: 'Common Overloaded Circuits in UK Homes',
    content: (
      <>
        <p>
          Certain circuits in UK homes are far more prone to overloading than others. Understanding
          which circuits are at risk helps you diagnose the cause quickly and advise on the correct
          solution.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Kitchen Ring Circuit (32A)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The kitchen ring circuit is the most commonly overloaded circuit in UK homes. A 32A
              ring can supply approximately 7.3 kW. A modern kitchen can easily contain a kettle (3
              kW), toaster (2 kW), microwave (1.5 kW), dishwasher (2.2 kW), coffee machine (1.5 kW),
              and an oven on the same circuit. Running the kettle, toaster, and microwave
              simultaneously draws approximately 28 amps — close to the 32A limit. Add the
              dishwasher and the circuit trips. The solution is to install additional radial
              circuits dedicated to high-demand appliances, or to educate the occupant about not
              running multiple high-wattage appliances at the same time.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Shower Circuit (40A or 45A)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Electric showers draw significant current — a 9.5 kW shower draws approximately 41
              amps, which is close to the 45A MCB rating. If the cable has high resistance due to
              poor connections, long runs, or undersized cable, the MCB can trip under load.
              Additionally, some showers are rated at 10.8 kW (47 amps), which exceeds a 45A MCB.
              Always check that the MCB rating, cable size, and shower wattage are correctly
              matched.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Cable className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Downstairs Socket Ring (32A)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              In older properties, a single ring circuit may serve all the downstairs sockets,
              including those in the lounge, dining room, and utility area. Electric heaters (2 kW
              to 3 kW each), a tumble dryer (2.5 kW), an iron (2.5 kW), and a vacuum cleaner (1.5
              kW) can collectively overload the circuit. Properties with extensions are particularly
              at risk if the extension sockets were added to the existing ring rather than provided
              with a separate circuit.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Max Demand Calculator"
          description="Enter every appliance connected to a circuit and Elec-Mate's max demand calculator tells you the total load in amps, applying BS 7671 diversity factors. It instantly flags if the circuit is overloaded for the MCB rating. Essential for diagnosing overload trips."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'appliance-vs-wiring',
    heading: 'Faulty Appliance vs Faulty Wiring — How to Tell',
    content: (
      <>
        <p>
          Determining whether the fault is in an appliance or in the fixed wiring is the critical
          fork in the diagnostic process. The answer determines whether the homeowner can resolve
          the issue themselves (disconnect the faulty appliance) or whether a qualified electrician
          is needed.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-yellow-400 text-lg mb-3">Signs of a Faulty Appliance</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>MCB holds with all appliances unplugged</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>MCB trips consistently when a specific appliance is connected</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Appliance shows signs of damage — frayed flex, burnt smell, scorch marks
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Appliance trips the MCB only during certain operations (e.g., heating cycle, spin
                  cycle)
                </span>
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="font-bold text-yellow-400 text-lg mb-3">Signs of Faulty Wiring</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>MCB trips immediately on resetting, even with nothing plugged in</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Burning smell at sockets, switches, or the consumer unit</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Discolouration or heat marks on socket faceplates</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Tripping started after building work, DIY, or decoration (e.g., nail through a
                  cable)
                </span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          For electricians, a definitive diagnosis requires{' '}
          <SEOInternalLink href="/guides/insulation-resistance-testing">
            insulation resistance testing
          </SEOInternalLink>{' '}
          at 500V DC on the affected circuit with all equipment disconnected. A reading below 1 MΩ
          between live and neutral (L-N) confirms a short circuit in the fixed wiring. A reading
          below 1 MΩ between live and earth (L-E) confirms an earth fault. These tests pinpoint
          whether the cable insulation has broken down and help narrow down the location of the
          fault.
        </p>
        <SEOAppBridge
          title="EICR — Identify Overloaded Circuits and Faulty Wiring"
          description="Elec-Mate's digital EICR form records insulation resistance, earth fault loop impedance, and circuit details for every circuit in the installation. Failed values are flagged automatically and observation codes are suggested based on the defect. Identify overloaded circuits, deteriorated insulation, and loose connections — all documented in a professional PDF report."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          While identifying a faulty appliance can be done by a homeowner using the process of
          elimination described above, several situations require a qualified electrician with
          calibrated test instruments.
        </p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              The MCB trips immediately on resetting with all appliances disconnected — this is a
              short circuit or earth fault in the fixed wiring
            </span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              You can see or smell evidence of burning, scorching, or overheating at any socket,
              switch, junction box, or the consumer unit itself
            </span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              The MCB trips intermittently with no obvious pattern and the process of elimination
              has not identified a single appliance as the cause
            </span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              The tripping started after building work, renovation, or DIY — a cable may have been
              damaged during the work
            </span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              The property has old wiring (rewirable fuses, no earth wire, fabric-insulated cables)
              — a full{' '}
              <SEOInternalLink href="/guides/eicr-certificate">
                Electrical Installation Condition Report (EICR)
              </SEOInternalLink>{' '}
              is recommended
            </span>
          </li>
        </ul>
        <p>
          A competent electrician will carry out dead tests (continuity, insulation resistance) and
          live tests (earth fault loop impedance, prospective fault current) to identify the exact
          cause and location of the fault. If the circuit is found to be overloaded, the electrician
          will recommend either redistributing loads or installing additional circuits.
        </p>
      </>
    ),
  },
  {
    id: 'temporary-vs-proper',
    heading: 'Temporary Solutions vs a Proper Fix',
    content: (
      <>
        <p>
          When a circuit breaker keeps tripping, the temptation is to find a quick fix. Some
          temporary measures are safe and reasonable while waiting for a proper repair. Others are
          extremely dangerous and must never be attempted.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Never Do This</h4>
              <p className="text-white text-sm leading-relaxed">
                Never replace an MCB with a higher-rated one to stop it tripping. An MCB is sized to
                protect the cable behind it — a 32A MCB protects 2.5mm twin and earth cable. Fitting
                a 40A MCB to stop the trips will allow the cable to carry more current than it is
                rated for, causing the cable insulation to overheat, melt, and potentially cause a
                fire inside the wall. This is extremely dangerous and violates BS 7671 Regulation
                433.1.1.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-2">Acceptable Temporary Measures</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Disconnect the faulty appliance and leave it disconnected until repaired or
                  replaced
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Reduce the number of appliances running simultaneously on the overloaded circuit
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Move some appliances to sockets on a different circuit to spread the load
                </span>
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="font-bold text-yellow-400 text-lg mb-2">
              Proper Fixes (Electrician Required)
            </h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  Install additional circuits to serve high-demand areas (e.g., dedicated kitchen
                  radials)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Repair or replace damaged cables causing short circuits</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Tighten loose connections at accessories and junction boxes</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Upgrade the consumer unit to provide better circuit distribution</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description: 'When the RCD trips instead of the MCB — earth leakage diagnosis and solutions.',
    icon: ShieldCheck,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/nuisance-tripping-rcd',
    title: 'Nuisance Tripping',
    description: 'RCD trips for no reason — cumulative leakage, RCD types, and RCBO upgrades.',
    icon: AlertTriangle,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description: 'How to carry out IR testing to confirm short circuits and insulation faults.',
    icon: Gauge,
    category: 'Testing',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate',
    description: 'Full guide to Electrical Installation Condition Reports and what they cover.',
    icon: FileText,
    category: 'Certification',
  },
  {
    href: '/tools/max-demand-calculator',
    title: 'Max Demand Calculator',
    description: 'Calculate total circuit load with BS 7671 diversity factors.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/earth-fault-loop-impedance-too-high',
    title: 'Earth Fault Loop Impedance Too High',
    description: 'When Zs exceeds the maximum for the protective device — causes and solutions.',
    icon: Activity,
    category: 'Testing',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CircuitBreakerTrippingPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-10"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Zap}
      heroTitle={
        <>
          Circuit Breaker Keeps Tripping?
          <br />
          <span className="text-yellow-400">Causes, Diagnosis & Fixes</span>
        </>
      }
      heroSubtitle="A tripping circuit breaker is one of the most common electrical problems in UK homes. This guide explains the difference between MCB and RCD tripping, every cause of MCB tripping (overload, short circuit, earth fault), how to diagnose which circuit and which appliance, and when to call an electrician."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Diagnose Circuit Faults Faster with Elec-Mate"
      ctaSubheading="Max demand calculator, board scanner, AI fault diagnosis, and digital EICR forms. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
