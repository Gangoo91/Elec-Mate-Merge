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
  ThermometerSun,
  FileCheck2,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding Guides', href: '/guides/fault-finding' },
  { label: 'Immersion Heater Fault Finding', href: '/immersion-heater-fault-finding' },
];

const tocItems = [
  { id: 'how-it-works', label: 'How Immersion Heaters Work' },
  { id: 'safe-isolation', label: 'Safe Isolation First' },
  { id: 'thermostat-failure', label: 'Thermostat Failure' },
  { id: 'element-burnout', label: 'Element Burn-Out' },
  { id: 'anode-check', label: 'Sacrificial Anode' },
  { id: 'wiring-faults', label: 'Wiring Faults' },
  { id: 'repair-costs', label: 'Repair vs Replace Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always isolate the immersion heater circuit at the consumer unit and prove dead with a voltage indicator before carrying out any work — immersion heaters operate at 230V and draw 3kW or more.',
  'Thermostat failure is the most common cause of an immersion heater not working. The thermostat can be replaced without draining the cylinder, making it a quick and relatively low-cost repair.',
  'A failed heating element requires draining the hot water cylinder before replacement. Element replacement typically costs £80 to £150 in parts and labour combined.',
  'The sacrificial anode (where fitted) should be inspected every two to three years. A depleted anode causes accelerated corrosion of the cylinder and element.',
  'An immersion heater that repeatedly trips the RCD or MCB suggests a fault to earth in the element — this requires immediate replacement and should not be reset and left.',
];

const faqs = [
  {
    question: 'Why is my immersion heater not heating the water?',
    answer:
      'The most common causes are a failed thermostat, a burned-out heating element, a tripped MCB or RCD, or a wiring fault at the heater head. Start by checking the consumer unit — if the circuit breaker has tripped, reset it and monitor. If it trips again immediately or the water still does not heat, call a qualified electrician to test the element and thermostat.',
  },
  {
    question: 'Can I replace an immersion heater thermostat myself?',
    answer:
      'You can replace the thermostat without draining the cylinder, and the job itself is straightforward — the thermostat is housed in the heater head and is secured with a retaining clip. However, the work involves working on a 230V circuit that draws up to 3kW. In England and Wales, replacing an immersion heater thermostat is notifiable work under Building Regulations Part P unless the electrician is registered with a competent person scheme. DIY work is legal but must be inspected and tested by the local authority building control at additional cost.',
  },
  {
    question: 'How do I know if my immersion heater element has failed?',
    answer:
      'Common signs of element failure are: no hot water despite the thermostat clicking on and off, water that heats very slowly, or the circuit breaker tripping every time the heater is switched on. A qualified electrician can test the element with a multifunction tester — measuring insulation resistance between the element terminals and earth will confirm whether the element has failed to earth.',
  },
  {
    question: 'How much does it cost to replace an immersion heater element?',
    answer:
      'Element replacement typically costs £80 to £150 all-in for a standard copper element in a residential cylinder. The element itself costs £15 to £40. Labour is around £60 to £100 plus call-out. The cylinder must be drained before the element can be removed, adding 30 to 60 minutes to the job. Titanium elements for hard water areas cost more — typically £40 to £80 for the part.',
  },
  {
    question: 'Why does my immersion heater keep tripping the RCD?',
    answer:
      'Repeated RCD tripping indicates current is leaking to earth — almost always through a failed heating element with degraded insulation. This is a genuine electrical fault and the heater should not be used until the element has been replaced. Resetting the RCD and continuing to use the heater risks electric shock and fire.',
  },
  {
    question: 'What is the correct temperature setting for an immersion heater thermostat?',
    answer:
      'The thermostat should be set to 60°C. This temperature kills Legionella bacteria within two minutes. Temperatures below 60°C allow Legionella to survive and multiply, particularly in the lower portion of the cylinder. Temperatures above 70°C waste energy and increase the risk of scalding. Most immersion heater thermostats have a range of 10°C to 80°C.',
  },
  {
    question: 'Should I repair or replace my immersion heater?',
    answer:
      'If the cylinder itself is sound and the heater is under 10 years old, repair is usually the better option. Thermostat replacement costs £30 to £60 all-in. Element replacement costs £80 to £150. If the cylinder is over 15 years old, is showing signs of corrosion, or if you have needed multiple repairs in quick succession, replacement of the entire unit is more economical. A new 180-litre indirect cylinder with immersion heater fitted costs £400 to £800.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electric-shower-fault-finding',
    title: 'Electric Shower Fault Finding',
    description: 'RCD tripping, heating element failure, flow switch faults, and repair costs.',
    icon: Zap,
    category: 'Fault Finding',
  },
  {
    href: '/underfloor-heating-fault-finding',
    title: 'Underfloor Heating Fault Finding',
    description: 'Thermostat faults, damaged heating mats, and insulation resistance testing.',
    icon: ThermometerSun,
    category: 'Fault Finding',
  },
  {
    href: '/guides/electrical-safety-check',
    title: 'Electrical Safety Check Guide',
    description: 'When to get an electrical installation checked and what is tested.',
    icon: ShieldCheck,
    category: 'Guide',
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
    heading: 'How Immersion Heaters Work',
    content: (
      <>
        <p>
          An immersion heater is a self-contained electric heating element fitted directly into a
          hot water storage cylinder. It operates at 230V and typically draws 3kW, heating the water
          around it through direct conduction. Most cylinders have one or two heater bosses — the
          upper heater heats a small volume quickly for washing up, whilst the lower heater heats
          the full cylinder capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating element</strong> — a resistance wire enclosed in a copper or
                titanium sheath, immersed directly in the water. Elements are rated 3kW for domestic
                use. The element is threaded into the cylinder boss and sealed with a washer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat</strong> — a bimetal strip or electronic sensor that cuts power
                when the water reaches the set temperature (typically 60°C). The thermostat is
                clipped to the element sheath inside the heater head and can be replaced without
                draining the cylinder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal cut-out (TCO)</strong> — a secondary safety device that disconnects
                the heater if the water overheats above approximately 85°C to 90°C. Unlike the
                thermostat, the TCO requires manual resetting with a screwdriver. A TCO that keeps
                tripping indicates a faulty thermostat allowing the water to overheat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sacrificial anode</strong> — a magnesium or aluminium rod fitted in the
                cylinder to protect the copper or steel tank from corrosion by sacrificing itself.
                Not all cylinders have an anode, but where fitted it should be checked every two to
                three years.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The immersion heater circuit is a dedicated radial circuit from the consumer unit, wired
          in 2.5mm² twin and earth cable, protected by a 16A MCB and typically an RCD. The heater is
          switched via a 20A double-pole switch with a neon indicator, mounted on the airing
          cupboard wall.
        </p>
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
              <p className="font-bold text-lg">Safe isolation is mandatory before any work</p>
              <p>
                An immersion heater operates at 230V and draws up to 3kW. Contact with live
                terminals can cause cardiac arrest, severe burns, or death. Never rely on the
                double-pole switch alone — isolate at the consumer unit.
              </p>
            </div>
          </div>
        </div>
        <p>
          The safe isolation procedure for an immersion heater circuit follows the same steps as any
          electrical isolation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                1
              </span>
              <span>
                <strong>Switch off at the double-pole switch</strong> — turn the DP switch to off
                and verify the neon indicator has extinguished.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                2
              </span>
              <span>
                <strong>Switch off at the consumer unit</strong> — locate the immersion heater MCB
                (usually labelled "Immersion" or "Hot Water") and switch it off. Lock the board if
                possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                3
              </span>
              <span>
                <strong>Prove dead with a voltage indicator</strong> — use a GS38-compliant voltage
                indicator to test between all live conductors at the heater terminals before
                touching anything. Test the tester on a known live source before and after.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-sm font-bold">
                4
              </span>
              <span>
                <strong>Post a warning notice</strong> — place a warning notice on the consumer unit
                stating "Do not switch on — work in progress" to prevent accidental re-energisation.
              </span>
            </li>
          </ol>
        </div>
        <p>
          These steps apply whether you are a qualified electrician carrying out a repair or a
          competent person inspecting the heater head. Members of the public should not remove the
          heater head cover without completing safe isolation first.
        </p>
      </>
    ),
  },
  {
    id: 'thermostat-failure',
    heading: 'Thermostat Failure — Most Common Fault',
    content: (
      <>
        <p>
          Thermostat failure is the most frequently encountered immersion heater fault. The symptoms
          depend on the mode of failure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat fails open (no heat)</strong> — the thermostat cuts out and does
                not reset. The element receives no power. The symptom is cold water despite the
                heater being switched on for several hours. Check the thermal cut-out button on the
                heater head — if it has popped out, press it back in. If the TCO trips again
                quickly, the thermostat is failing to cut off at the correct temperature, allowing
                overheating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat fails closed (overheating)</strong> — the thermostat does not cut
                out when the water reaches temperature. The water overheats and the TCO trips. The
                symptom is intermittent hot water — the TCO must be manually reset each time. This
                is a fire and scalding risk and should be rectified immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect temperature setting</strong> — the thermostat dial may have been
                inadvertently turned down. Check the temperature setting on the thermostat — it
                should be at 60°C. Temperatures below 50°C allow Legionella bacteria to survive.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Thermostat replacement does not require draining the cylinder. After safe isolation, the
          heater head cover is removed, the thermostat is unclipped from the element sheath, and the
          replacement is clipped in. The job typically takes 30 to 60 minutes for an electrician.
          Thermostat parts cost £10 to £25; labour is £40 to £80, making total repair cost
          approximately £50 to £105.
        </p>
      </>
    ),
  },
  {
    id: 'element-burnout',
    heading: 'Element Burn-Out',
    content: (
      <>
        <p>
          A burned-out heating element is the second most common immersion heater fault. Elements
          fail due to age, limescale build-up in hard water areas, or electrical breakdown of the
          insulation. The element typically fails by developing a fault to earth, which trips the
          RCD.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing the element</strong> — after safe isolation, disconnect the element
                wires at the heater head. Using a multifunction tester set to insulation resistance
                test (500V DC), measure between each element terminal and earth. A healthy element
                reads above 1MΩ. A reading below 0.5MΩ indicates failing insulation. Zero ohms or a
                reading of a few ohms indicates a direct earth fault — the element must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element continuity</strong> — measure resistance between the two element
                terminals. A 3kW, 230V element has a resistance of approximately 17.6 ohms (R = V²/P
                = 230²/3000). An open-circuit reading (infinite resistance) confirms the element
                wire has burned through.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element replacement procedure</strong> — the cylinder must be fully drained
                before the element can be removed. This involves isolating the cold water supply,
                connecting a hose to the drain cock, and draining into a suitable gully. The element
                is then unscrewed (using an element spanner) from the cylinder boss, and the new
                element fitted with a new sealing washer. The cylinder is then refilled and checked
                for leaks before reconnecting the electrical supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In hard water areas (most of England south and east of a line from Exeter to the Humber),
          consider fitting a titanium or incoloy element rather than copper. Titanium elements
          resist limescale significantly better and typically last twice as long as copper elements
          in hard water.
        </p>
      </>
    ),
  },
  {
    id: 'anode-check',
    heading: 'Checking the Sacrificial Anode',
    content: (
      <>
        <p>
          Many unvented hot water cylinders and some vented cylinders include a sacrificial anode —
          a rod of magnesium or aluminium that corrodes preferentially to protect the cylinder walls
          and the heating element. Anodes are particularly important in hard water areas where
          electrochemical corrosion is accelerated.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to inspect</strong> — inspect the anode every two to three years, or
                whenever the cylinder is drained for element replacement. In areas with highly
                aggressive water (low pH, high chloride content), inspect annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signs of depletion</strong> — a depleted anode is less than 50% of its
                original diameter, or is severely pitted. A completely depleted anode provides no
                protection. The cylinder then begins to corrode directly, leading to pitting of the
                element sheath and eventually cylinder failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacement cost</strong> — anode replacement requires draining the
                cylinder. The anode itself costs £15 to £40. Combined with element replacement,
                anode replacement at the same time adds minimal extra cost since the cylinder is
                already drained.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Not all cylinders have an accessible sacrificial anode. If yours does not, consider a
          powered anode system (impressed current cathodic protection) if you are replacing the
          cylinder, particularly in coastal or industrial areas with aggressive water chemistry.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-faults',
    heading: 'Wiring Faults',
    content: (
      <>
        <p>
          Wiring faults on immersion heater circuits are less common than element or thermostat
          failures but should be investigated if element and thermostat tests are satisfactory.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose terminal connections</strong> — the heater head terminals can work
                loose over time due to thermal cycling. A loose neutral connection causes the
                element to run intermittently. A loose earth connection means the circuit has no
                earth fault protection. After safe isolation, check all terminals at the heater head
                for tightness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overheated cable</strong> — if the element has been running with a loose
                connection or the heater has been overloaded, the cable insulation at the heater
                head may have degraded. Inspect the cable sheathing for discolouration, cracking, or
                brittleness. Degraded cable must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty double-pole switch</strong> — the DP switch can fail internally,
                particularly older rocker-style switches. Test voltage at the switch output
                terminals (with the switch in the on position) after safe isolation of the consumer
                unit is confirmed. Replace the switch if it fails to pass voltage when switched on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripped RCD or MCB</strong> — always check the consumer unit first. An
                immersion heater circuit protected by a 16A MCB should not trip under normal
                operation. A tripping MCB suggests an overload or short circuit. A tripping RCD
                confirms an earth leakage fault — almost always a failed element.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'repair-costs',
    heading: 'Repair vs Replace — Costs for 2026',
    content: (
      <>
        <p>
          Deciding whether to repair or replace an immersion heater depends on the age of the
          cylinder, the nature of the fault, and the local labour rates. Here are typical UK costs
          for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat replacement</strong> — £50 to £105 all-in. Parts £10 to £25,
                labour £40 to £80. No cylinder draining required. Most cost-effective first repair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element replacement (copper)</strong> — £80 to £150 all-in. Element £15 to
                £40, labour £60 to £110. Cylinder draining adds 30 to 60 minutes. If the anode is
                due, replace it at the same time for an additional £15 to £40 in parts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element replacement (titanium or incoloy)</strong> — £120 to £200 all-in.
                Titanium elements cost £40 to £80 but last significantly longer in hard water areas.
                The premium pays back within one replacement cycle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full cylinder replacement</strong> — £400 to £800 fitted for a vented copper
                cylinder. Unvented cylinders cost £800 to £1,500 installed due to the additional
                complexity and Part G Building Regulations notification requirements. If the
                cylinder is over 15 years old, full replacement is often the better long-term
                investment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring repairs</strong> — replacing a faulty DP switch costs £40 to £80.
                Replacing a metre of cable at the heater head costs £50 to £100. A full circuit
                rewire (if the cable is degraded throughout) costs £150 to £300.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As a general rule: if the cylinder is under 10 years old, repair is usually the right
          choice. If the cylinder is over 15 years old or has had multiple repairs, full replacement
          offers better value and significantly reduces the risk of a catastrophic cylinder failure.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Immersion Heater Work',
    content: (
      <>
        <p>
          Immersion heater repair and replacement is routine domestic work for electricians. It
          falls under Part P of the Building Regulations in England and Wales as notifiable
          electrical work in a bathroom or kitchen (the airing cupboard is treated as a kitchen for
          Part P purposes if adjacent to a kitchen). Registration with a competent person scheme
          such as NICEIC or NAPIT means you can self-certify the work without local authority
          notification.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue a Minor Works Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Thermostat and element replacements require a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Electrical Installation Works Certificate
                  </SEOInternalLink>{' '}
                  under BS 7671. Use the Elec-Mate app to complete and issue the certificate on
                  site, send a PDF to the customer, and keep a signed copy in your records.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Quickly, Win the Job</h4>
                <p className="text-white text-sm leading-relaxed">
                  When diagnosing a fault, use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce a professional quote on site while the customer is present. Customers
                  who receive a quote immediately are far more likely to approve the work the same
                  day.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete certificates and quotes on site with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site Minor Works certificates, EICRs, and instant quoting. No evening paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ImmersionHeaterFaultFindingPage() {
  return (
    <GuideTemplate
      title="Immersion Heater Not Working | Fault Finding Guide UK"
      description="Immersion heater fault finding guide for UK homeowners and electricians. Thermostat failure, element burn-out, sacrificial anode, wiring faults, safe isolation procedure, and 2026 repair costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Immersion Heater Not Working: <span className="text-yellow-400">Fault Finding Guide</span>
        </>
      }
      heroSubtitle="Step-by-step fault finding for immersion heaters that are not heating, tripping the RCD, or overheating. Covers thermostat failure, element burn-out, sacrificial anode checks, wiring faults, safe isolation, and repair costs for 2026."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Immersion Heater Faults"
      relatedPages={relatedPages}
      ctaHeading="Complete Electrical Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for Minor Works certificates, EICRs, and on-site quoting. No evening paperwork. 7-day free trial, cancel anytime."
    />
  );
}
