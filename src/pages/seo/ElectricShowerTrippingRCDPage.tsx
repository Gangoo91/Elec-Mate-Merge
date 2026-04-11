import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplets,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  Thermometer,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Shower Tripping', href: '/guides/electric-shower-keeps-tripping' },
];

const tocItems = [
  { id: 'overview', label: 'Why Does My Shower Keep Tripping?' },
  { id: 'how-rcd-works', label: 'How an RCD Works' },
  { id: 'element-failure', label: 'Heating Element Failure' },
  { id: 'water-ingress', label: 'Water Ingress' },
  { id: 'neutral-earth-fault', label: 'Neutral-Earth Faults' },
  { id: 'bathroom-regulations', label: 'Section 701: Bathroom Regulations' },
  { id: 'diagnostic-approach', label: 'Diagnostic Flowchart' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The most common cause of an electric shower tripping the RCD is a failing heating element — as the element degrades, its insulation breaks down, allowing current to leak to earth.',
  'Water ingress into the shower unit or its electrical connections is the second most common cause. IP ratings (typically IPX4 for bathrooms) must be maintained to prevent moisture reaching live parts.',
  'Section 701 of BS 7671 (referenced by Regulation 411.3.3) sets out specific requirements for electrical installations in bathrooms and shower rooms, including zone-based rules, RCD protection, and supplementary equipotential bonding.',
  'A neutral-earth fault — where the neutral conductor contacts earth somewhere in the circuit — can cause RCD tripping because it diverts current away from the intended return path.',
  'An RCD that trips instantly every time is typically an insulation fault. An RCD that trips after a few minutes of use is often a thermal fault — the heating element insulation breaks down as it warms up.',
  'Never bypass or remove the RCD protection on a shower circuit. The RCD is there to protect life. If it keeps tripping, the fault must be found and repaired.',
];

const faqs = [
  {
    question: 'Why does my electric shower trip the RCD as soon as I turn it on?',
    answer:
      'If the RCD trips the instant you switch on the shower, the most likely cause is a direct insulation fault — current is leaking from a live conductor to earth as soon as power is applied. This is commonly caused by a failed heating element (the insulation between the element and the water has broken down), water inside the electrical connections of the shower unit, or a damaged cable between the consumer unit and the shower. An electrician can identify the fault using an insulation resistance test at 500V DC, which will reveal exactly where the insulation has failed.',
  },
  {
    question: 'Why does the shower work for a few minutes then trip?',
    answer:
      'If the shower runs for several minutes before the RCD trips, the fault is likely thermal — the heating element insulation is marginal and breaks down as it heats up. When the element is cold, the insulation resistance is high enough for the RCD to hold. As the element heats during use, the insulation resistance drops below the RCD threshold (typically 30mA earth leakage) and the RCD trips. This pattern is characteristic of a degraded element that needs replacement. An electrician can confirm this by performing insulation resistance tests on the element when cold and then again after running the shower briefly.',
  },
  {
    question: 'Can I reset the RCD and keep using the shower?',
    answer:
      'You can try resetting the RCD, and if it holds, the shower may work temporarily. However, if the RCD is tripping because of a genuine insulation fault, the fault will not repair itself — it will only get worse. Each time the RCD trips, it is doing its job: detecting a potentially dangerous earth leakage current and disconnecting the circuit to protect you from electric shock. Repeatedly resetting and using a shower with a known tripping problem is not recommended. The fault should be diagnosed and repaired properly. Never, under any circumstances, bypass the RCD.',
  },
  {
    question: 'Could it be the RCD itself that is faulty?',
    answer:
      'Yes, RCDs can develop faults. The most common RCD fault is nuisance tripping — where the device becomes oversensitive and trips at leakage currents below its rated threshold. This can happen with older RCDs or RCDs that have been subjected to repeated fault currents. However, before blaming the RCD, the electrician should first confirm that the shower circuit is fault-free by performing insulation resistance testing. If the insulation resistance is healthy (well above 1 megohm) and the RCD still trips when the shower is used, the RCD itself may need replacement. The electrician can also test the RCD with a calibrated RCD tester to check its actual trip current and time.',
  },
  {
    question: 'What IP rating does my shower need?',
    answer:
      'Electric showers must have an appropriate IP (Ingress Protection) rating for their installation zone. In Zone 1 (directly above the bath or shower tray to a height of 2.25m), equipment must be rated at least IPX4 (protected against water splashing from any direction). Most electric showers are rated IPX4 or higher. The IP rating ensures that water spray during normal use cannot reach the live internal components. If the shower enclosure is damaged, cracked, or has missing seals, the IP rating is compromised and water can enter, causing RCD tripping. Check the shower unit for visible damage to the case, cable entry grommet, and water pipe connections.',
  },
  {
    question: 'Does my bathroom need supplementary bonding?',
    answer:
      'Regulation 701.415.2 of BS 7671 requires supplementary equipotential bonding in bathrooms and shower rooms to reduce touch voltages between exposed conductive parts (such as the shower unit case) and extraneous conductive parts (such as metal pipes, radiators, and baths). The bonding conductor connects these metallic parts together so that they are at the same electrical potential, preventing a dangerous voltage difference if a fault occurs. In some cases, supplementary bonding can be omitted if the installation meets specific conditions — all circuits in the bathroom are RCD protected at 30mA, and the disconnection times per Regulation 411.3.2 are met. An electrician can advise on whether supplementary bonding is required for your specific installation.',
  },
  {
    question: 'Can I fit a higher-rated RCD to stop the tripping?',
    answer:
      'No. Fitting a higher-rated RCD (for example, replacing a 30mA RCD with a 100mA RCD) on a shower circuit is not safe and is not compliant with BS 7671. The 30mA rating is the maximum permitted for additional protection on circuits in bathrooms. A 30mA RCD will disconnect quickly enough to prevent a fatal electric shock in most circumstances. A 100mA RCD may not. If the shower is tripping a 30mA RCD, the answer is to fix the fault — not to reduce the level of protection. The RCD is doing its job correctly by detecting the earth leakage and disconnecting.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Complete guide to Section 701 zone requirements, IP ratings, and bonding for bathrooms.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description:
      'Systematic fault finding approach for electricians diagnosing RCD tripping issues.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/circuit-breaker-tripping',
    title: 'Circuit Breaker Tripping',
    description:
      'Causes and solutions when MCBs and RCBOs keep tripping on different circuit types.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'When to upgrade your consumer unit for modern RCD and RCBO protection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-test-insulation-resistance',
    title: 'Insulation Resistance Testing',
    description: 'How to perform insulation resistance tests and interpret the results.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on your phone with AI assistance.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Does My Electric Shower Keep Tripping the RCD?',
    content: (
      <>
        <p>
          You step into the shower, turn it on, and within seconds the power cuts out. The lights go
          off in the bathroom — and possibly the rest of the house. You go to the consumer unit,
          find the RCD has tripped, push it back up, and try again. Same result. Or perhaps it works
          for five minutes before tripping again.
        </p>
        <p>
          An electric shower tripping the RCD is one of the most common call-outs for UK
          electricians, and one of the most frustrating problems for homeowners. The shower was
          working fine yesterday — so what changed?
        </p>
        <p>
          The answer is almost always one of a small number of causes: a degraded heating element,
          water getting into the electrical connections, a neutral-to-earth fault on the circuit, or
          (less commonly) the RCD itself developing a fault. This guide walks through each cause in
          detail, explains how to narrow down the problem, and tells you when you need professional
          help. If you are an electrician, the later sections cover the diagnostic procedure and the{' '}
          <SEOInternalLink href="/guides/bathroom-electrical-regulations">
            Section 701 bathroom regulations
          </SEOInternalLink>{' '}
          relevant to shower installations.
        </p>
      </>
    ),
  },
  {
    id: 'how-rcd-works',
    heading: 'How an RCD Works and Why It Trips',
    content: (
      <>
        <p>
          To understand why your shower is tripping the RCD, it helps to understand what the RCD is
          actually detecting. An RCD (Residual Current Device) continuously monitors the current
          flowing out on the live conductor and the current returning on the neutral conductor. In a
          healthy circuit, these two currents are equal — every milliamp that flows out through the
          live comes back through the neutral.
        </p>
        <p>
          If there is a fault — for example, current leaking from a live conductor through damaged
          insulation to earth — some of the current takes this alternative path to earth instead of
          returning via the neutral. The RCD detects this imbalance. When the difference between the
          live and neutral currents exceeds the RCD's rated sensitivity (typically 30mA for bathroom
          circuits), the RCD disconnects the circuit in milliseconds.
        </p>
        <p>
          This is a life-saving function. A current of 30mA through the human body is enough to
          cause ventricular fibrillation (cardiac arrest). By disconnecting at 30mA, the RCD limits
          the duration of the shock and prevents a fatal outcome in most circumstances. Regulation
          411.3.3 of BS 7671 requires RCD protection on circuits in bathrooms to provide this
          additional protection against electric shock.
        </p>
        <p>
          When your shower trips the RCD, the RCD is doing exactly what it is designed to do —
          detecting a dangerous leakage current and protecting you. The problem is not the RCD. The
          problem is the fault that the RCD is detecting.
        </p>
      </>
    ),
  },
  {
    id: 'element-failure',
    heading: 'Heating Element Failure: The Most Common Cause',
    content: (
      <>
        <p>
          The heating element is a metal coil submerged in water inside the shower unit. When you
          switch the shower on, current flows through the element, heating it, and the water flowing
          over the element heats up. The element is insulated from the water by a coating (typically
          a ceramic or mineral insulation) that prevents current from passing from the element into
          the water and then to earth.
        </p>
        <p>
          Over time, this insulation degrades. Limescale buildup (particularly in hard water areas),
          thermal cycling (heating and cooling thousands of times), and general ageing all
          contribute to the breakdown of the element insulation. As the insulation deteriorates, its
          resistance drops, and current begins to leak from the element through the water to the
          metal body of the shower (which is earthed). When this leakage exceeds 30mA, the RCD
          trips.
        </p>
        <p>The characteristic pattern of element failure is:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Early stage</strong> — the shower works but trips occasionally, perhaps once
                every few days. The insulation is marginal and only fails under specific conditions
                (high water temperature, maximum flow rate).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid stage</strong> — the shower works for a few minutes then trips. The
                insulation holds when the element is cold but breaks down as it heats up. The hotter
                the setting, the faster it trips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Late stage</strong> — the RCD trips as soon as the shower is switched on.
                The insulation has failed completely and current leaks to earth even when the
                element is cold.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the element has failed, the shower unit needs to be replaced or the element replaced
          (where the manufacturer provides a replacement element). In most cases, it is more
          cost-effective to replace the entire shower unit, as the element replacement may not be
          economical for an older unit.
        </p>
        <SEOAppBridge
          title="Diagnose shower faults with AI"
          description="Elec-Mate's AI fault diagnosis tool walks you through the systematic diagnostic process for RCD tripping, including insulation resistance testing and element testing. Regulation references included."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'water-ingress',
    heading: 'Water Ingress: Moisture Where It Should Not Be',
    content: (
      <>
        <p>
          Electric showers are designed to operate in wet environments, but the electrical
          connections inside the shower unit and the cable entry point must remain dry. Water
          reaching the electrical terminals or the cable connections will create a conductive path
          to earth and cause the RCD to trip.
        </p>
        <p>Common causes of water ingress include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged cable entry grommet</strong> — the grommet where the supply cable
                enters the shower unit provides a watertight seal. If it is cracked, missing, or not
                seated correctly, water from the shower spray can track along the cable and into the
                terminal block.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cracked shower case</strong> — physical damage to the shower enclosure
                allows water spray to enter the unit directly. Even a hairline crack can admit
                enough moisture to cause problems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed internal seals</strong> — the shower unit contains internal seals
                between the water path and the electrical compartment. Over time, these seals can
                degrade, allowing water to migrate into the electrical section.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condensation</strong> — in poorly ventilated bathrooms, condensation can
                form inside the shower unit, particularly on cold surfaces. Over time, this moisture
                accumulates and can bridge between live terminals and earth.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regulation 528.3 of BS 7671 requires that wiring systems and enclosures are selected with
          suitable ingress protection for their location. In bathrooms, the minimum IP rating for
          equipment in Zone 1 (directly above the bath or shower tray) is IPX4 — protected against
          water splashing from any direction. If the shower enclosure is compromised, the IP rating
          is void and the installation is non-compliant.
        </p>
      </>
    ),
  },
  {
    id: 'neutral-earth-fault',
    heading: 'Neutral-Earth Faults: The Tricky One',
    content: (
      <>
        <p>
          A neutral-earth fault is one of the more difficult causes to diagnose because the fault
          may not be in the shower itself. If the neutral conductor contacts the earth conductor or
          an earthed metal part somewhere in the circuit, some of the return current flows via the
          earth path instead of the neutral. The RCD detects this as an imbalance (current going out
          on live does not all return on neutral) and trips.
        </p>
        <p>Neutral-earth faults on shower circuits can be caused by:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged cable</strong> — if the supply cable has been nicked or crushed (for
                example, by a screw or nail during building work), the neutral conductor insulation
                may be damaged where it touches the earth conductor or a metal cable clip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination error</strong> — if the neutral and earth conductors are crossed
                at the shower terminal block or at the consumer unit, current will flow on the wrong
                conductor and the RCD will detect the imbalance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Borrowed neutral</strong> — in some older installations, circuits share
                neutral conductors. If the shower circuit shares a neutral with another circuit, the
                RCD cannot correctly measure the current balance. This is a wiring error that needs
                correction. See the{' '}
                <SEOInternalLink href="/guides/borrowed-neutral">
                  borrowed neutral guide
                </SEOInternalLink>{' '}
                for more detail.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Diagnosing a neutral-earth fault requires careful insulation resistance testing between
          the neutral and earth conductors on the shower circuit, with all equipment disconnected. A
          healthy circuit should show well above 1 megohm between neutral and earth.
        </p>
      </>
    ),
  },
  {
    id: 'bathroom-regulations',
    heading: 'Section 701: Bathroom Electrical Regulations',
    content: (
      <>
        <p>
          Bathrooms and shower rooms are classified as locations of increased electric shock risk
          because of the presence of water and the likelihood of bare skin contact. Section 701 of
          BS 7671 sets out specific requirements for electrical installations in these locations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone system</strong> — bathrooms are divided into zones (0, 1, and 2) based
                on proximity to the bath or shower tray. Each zone has specific requirements for
                what equipment can be installed and what IP rating is required. Electric showers are
                typically in Zone 1 and must be rated at least IPX4.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — Regulation 411.3.3 requires additional protection
                by RCDs not exceeding 30mA for circuits in bathrooms and shower rooms. This applies
                to all circuits — not just the shower circuit. Lighting, heated towel rails, and any
                other electrical equipment in the bathroom must also be RCD protected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary equipotential bonding</strong> — Regulation 701.415.2 requires
                supplementary bonding in bathrooms to reduce touch voltages between exposed
                conductive parts and extraneous conductive parts. Metal pipes, radiators, baths, and
                the shower unit case must all be bonded together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switches and controls</strong> — Regulation 132.14 governs the selection and
                placement of switches in bathrooms. Pull-cord switches or switches outside the
                bathroom are required in Zones 0, 1, and 2. Wall switches must be outside the zone
                boundaries.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These regulations exist because the consequences of an electrical fault in a bathroom are
          severe. Wet skin has much lower resistance than dry skin, meaning the same voltage
          produces a much higher current through the body. A fault that might cause a mild tingle in
          a dry location could be fatal in a bathroom. The 30mA RCD, supplementary bonding, and zone
          restrictions all work together to minimise this risk.
        </p>
      </>
    ),
  },
  {
    id: 'diagnostic-approach',
    heading: 'Diagnostic Flowchart: Narrowing Down the Cause',
    content: (
      <>
        <p>
          Whether you are an electrician or a homeowner trying to understand what is happening, this
          step-by-step approach helps narrow down the cause:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Step 1: Does the RCD stay in when the shower is off?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Turn the shower off at its own switch (not the isolator). Reset the RCD. If the RCD
              holds, the fault is inside the shower unit or occurs only when the element is
              energised. If the RCD trips even with the shower switched off, the fault is in the
              wiring between the consumer unit and the shower (or the RCD itself).
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Step 2: Does it trip immediately or after a few minutes?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Immediate trip = hard insulation fault (dead short between live/neutral and earth).
              Delayed trip (after 2 to 10 minutes) = thermal fault (insulation breaks down as the
              element heats up). This distinction helps identify whether the element has failed
              completely or is in the process of failing.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Step 3: Does it trip on all power settings?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Some showers have multiple heating elements (a low and high setting). If the RCD trips
              on the high setting but not the low setting, only one element is faulty. If it trips
              on all settings, either both elements are faulty or the fault is in the common wiring/
              connections.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Step 4: Do other circuits also trip the RCD?
            </h4>
            <p className="text-white text-sm leading-relaxed">
              If the shower is on a shared RCD (not a dedicated RCBO), the RCD may be tripping
              because of a fault on another circuit, not the shower. Disconnect the shower at the
              isolator and check if the RCD holds. If it does, the problem is the shower or its
              circuit. If it still trips, the fault is on another circuit sharing the same RCD.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Electric shower faults combine electricity and water — two things that are dangerous
          together. While the diagnostic steps above help you understand the problem, the actual
          repair should always be carried out by a qualified electrician. Call a professional if:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The RCD trips every time</strong> — a consistent fault needs professional
                diagnosis with insulation resistance testing and earth fault loop impedance
                measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>You get a tingle or shock from the shower</strong> — this is an emergency.
                Isolate the circuit at the consumer unit immediately. Do not use the shower. An
                electrician must check the earthing, bonding, and RCD protection before the shower
                is used again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>You can see water inside the shower unit</strong> — if water is visible
                around the electrical terminals or the cable entry, the unit needs to be isolated
                and dried before any further investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The shower is more than 10 years old</strong> — older shower units have had
                more thermal cycles and more opportunity for insulation degradation. If an older
                shower starts tripping, replacement is usually more cost-effective than repair.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A qualified electrician will isolate the supply, carry out insulation resistance testing
          on the shower unit and the circuit, check the supplementary bonding, verify the RCD
          operation, and recommend the appropriate repair — whether that is replacing the shower,
          repairing a cable, or addressing a wiring fault.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Shower Circuit Diagnostics',
    content: (
      <>
        <p>
          The systematic approach to diagnosing shower RCD tripping starts with isolating the shower
          and testing the circuit and unit separately:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Isolate and Disconnect</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate the shower circuit at the consumer unit. Disconnect the shower unit at the
                  local isolator or at the shower terminals. This separates the circuit wiring from
                  the shower unit, allowing you to test each independently.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Test Circuit Wiring</h4>
                <p className="text-white text-sm leading-relaxed">
                  With the shower disconnected, perform insulation resistance at 500V DC on the
                  circuit wiring: L-E, N-E, and L-N. Acceptance criteria: minimum 1 megohm. If the
                  circuit wiring passes, the fault is in the shower unit. If it fails, the fault is
                  in the circuit — check the cable for damage, particularly at cable clips, where it
                  passes through walls, and at the isolator terminals.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Test Shower Unit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Test the shower element insulation: measure resistance between the element
                  terminals and the metal body of the shower (earth). A healthy element shows well
                  above 1 megohm. A failed element may show kilohms or even ohms. For thermal
                  faults, test cold then run the shower briefly (with a temporary connection if safe
                  to do so) and retest — the reading will drop as the element heats.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Verify Protection and Bonding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Confirm RCD protection at 30mA is present and operating within BS 7671 time
                  limits. Check supplementary bonding per Regulation 411.3.3. Verify earth fault
                  loop impedance (Zs) is within limits for the protective device rating. If
                  replacing the shower, issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  for the replacement work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete certificates on site after shower replacement"
          description="Elec-Mate's certificate app lets you complete Minor Works Certificates and EICRs on your phone with AI assistance. Instant PDF export and cloud backup. Join 1,000+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricShowerTrippingRCDPage() {
  return (
    <GuideTemplate
      title="Electric Shower Keeps Tripping RCD | Causes & Solutions"
      description="Why does your electric shower keep tripping the RCD? Learn the common causes — heating element failure, water ingress, neutral-earth faults — the Section 701 bathroom regulations, and when to call an electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Electric Shower Keeps Tripping RCD:{' '}
          <span className="text-yellow-400">Causes and Solutions</span>
        </>
      }
      heroSubtitle="Your shower trips the RCD every time you use it. This guide explains why — from degraded heating elements to water ingress and neutral-earth faults — covers the Section 701 bathroom regulations, and walks through the diagnostic process step by step."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electric Showers Tripping the RCD"
      relatedPages={relatedPages}
      ctaHeading="Diagnose and Certify Shower Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI fault diagnosis, insulation resistance guidance, and professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
