import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  PoundSterling,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Lighting Circuit Installation', href: '/lighting-circuit-installation' },
];

const tocItems = [
  { id: 'loop-in-vs-junction-box', label: 'Loop-In vs Junction Box Wiring' },
  { id: 'led-compatibility', label: 'LED Compatibility and Minimum Load' },
  { id: 'dimmer-switches', label: 'Dimmer Switches for LED Lighting' },
  { id: 'outdoor-lighting', label: 'Outdoor Lighting Requirements' },
  { id: 'emergency-lighting', label: 'Emergency Lighting — BS 5266' },
  { id: 'lux-levels', label: 'Lux Levels — BS EN 12464-1' },
  { id: 'costs', label: 'Typical Costs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Lighting circuits in domestic premises typically use 1.0mm² or 1.5mm² twin and earth cable on a 6A or 10A protective device, wired using either the loop-in method (cable loops through each ceiling rose or luminaire) or the junction box method (a separate junction box serves each lighting point).',
  'LED luminaires have a very low minimum load — many LED downlights draw less than 5 watts. Some dimmer switches require a minimum connected load to function correctly. Fitting an incompatible dimmer with LED fittings results in flickering, buzzing, or failure to dim smoothly. Trailing-edge dimmers are generally better suited to LED loads than leading-edge (phase-cut) dimmers.',
  'Outdoor lighting must have a minimum IP65 rating where it may be subjected to rainfall. BS 7671 Regulation 411.3.3 requires 30mA RCD protection for all circuits supplying luminaires in locations where there is an increased risk of electric shock — including all outdoor lighting circuits.',
  'Emergency lighting in commercial and public buildings is governed by BS 5266-1:2016. It requires that escape routes, exit signs, and open areas (anti-panic lighting) have adequate illuminance maintained for a minimum duration (typically 1 to 3 hours) following mains failure.',
  'Lux levels for workplaces and commercial interiors are specified in BS EN 12464-1 (Lighting of Indoor Work Places). Offices require a maintained illuminance of 500 lux at the working plane. Drawing offices and detailed task areas require 750 lux. Corridors and circulation areas require 100 lux.',
];

const faqs = [
  {
    question: 'What cable do I use for a lighting circuit?',
    answer:
      '1.0mm² twin and earth cable to BS 6004 is the minimum for a domestic lighting circuit, suitable on a 6A protective device. Many electricians specify 1.5mm² as standard, which permits a 10A protective device and provides more flexibility if the circuit is later extended. For longer cable runs where voltage drop is a concern, 1.5mm² is recommended. The cable must be installed using either the loop-in method (feeding through each ceiling rose) or the junction box method, with each method resulting in a correctly terminated and documented circuit.',
  },
  {
    question: 'Why are my LED lights flickering with a dimmer?',
    answer:
      "Most older dimmer switches are leading-edge (phase-cut) dimmers designed for resistive and inductive loads such as incandescent bulbs and halogen transformers. LED drivers have capacitive characteristics, which can cause incompatibility with leading-edge dimmers resulting in flickering, buzzing, strobing, or inability to dim below a certain level. The solution is to replace the dimmer with a trailing-edge (or universal) dimmer switch rated for LED loads. Also ensure the total LED load on the circuit is above the dimmer's stated minimum load — some dimmers require at least 10W or 25W to operate stably.",
  },
  {
    question: 'Does outdoor lighting need to be on its own circuit?',
    answer:
      'Outdoor lighting does not legally require a dedicated circuit under BS 7671 — it may be connected to an existing lighting circuit provided the circuit has available capacity and is RCD protected (as required by Regulation 411.3.3 for outdoor locations). However, a dedicated outdoor lighting circuit is better practice because it allows independent switching and isolation, and because if a fault develops on the outdoor circuit it does not affect indoor lighting. A dedicated outdoor circuit also simplifies the addition of future outdoor lighting points.',
  },
  {
    question: 'What IP rating do I need for outdoor lights?',
    answer:
      "For luminaires installed outdoors in the UK, a minimum IP44 rating (protected against solid objects greater than 1mm and against water splashing from any direction) is the minimum standard. For luminaires exposed to direct rainfall — wall lights, path lighting, soffit-mounted fittings — IP65 (dust-tight and protected against water jets) is the appropriate specification. Luminaires submerged or in ground-level positions subject to flooding require IP67 or IP68. Always check the luminaire manufacturer's installation instructions for the specific IP rating and the approved mounting orientation.",
  },
  {
    question: 'What is the difference between emergency escape lighting and standby lighting?',
    answer:
      'Emergency lighting (as defined in BS 5266) has two primary categories: escape lighting and standby lighting. Escape lighting (also called maintained or non-maintained emergency lighting) is designed to illuminate escape routes so that occupants can evacuate safely in the event of mains power failure. Standby lighting is designed to allow normal activities to continue during a mains failure — it is used in locations such as operating theatres and data centres where operations cannot be interrupted. Most commercial and public building requirements relate to escape lighting, not standby lighting.',
  },
  {
    question: 'How many lights can I put on a lighting circuit?',
    answer:
      "BS 7671 does not specify a maximum number of luminaires on a lighting circuit — instead, the circuit must be designed so that the total connected load does not exceed the circuit's current rating. On a 6A circuit with 1.0mm² cable, the maximum load is 1,440W (6A x 240V). With LED fittings drawing 6 to 12W each, a 6A circuit could theoretically supply 120 to 240 LED downlights. In practice, circuits are limited to manageable numbers — typically 8 to 12 points for a domestic circuit — for fault-finding convenience and to avoid voltage drop at the far end of a long circuit.",
  },
  {
    question: 'What lux level do I need in a domestic kitchen?',
    answer:
      'BS EN 12464-1 covers lighting for non-domestic work places and does not specify lux levels for domestic rooms. For domestic kitchens, the Society of Light and Lighting (SLL) recommends a maintained illuminance of 300 lux at worktop height for task areas such as food preparation surfaces, with ambient lighting of approximately 150 to 200 lux for the general kitchen area. Under-cabinet lighting is the most effective way to achieve adequate worktop illuminance where ceiling downlights alone are insufficient.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/socket-outlet-installation',
    title: 'Socket Outlet Installation',
    description:
      'Ring main vs radial, spur rules, outdoor socket requirements, and Part P notification.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/rcbo-installation-guide',
    title: 'RCBO Installation Guide',
    description:
      'Types A, B, and F RCBOs, nuisance tripping on LED circuits, and BS 7671 Regulation 531.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
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
    id: 'loop-in-vs-junction-box',
    heading: 'Loop-In vs Junction Box Wiring',
    content: (
      <>
        <p>
          Lighting circuits in UK domestic properties are predominantly wired using one of two
          methods: the loop-in method or the junction box (three-plate ceiling rose) method. Both
          are acceptable under BS 7671 and produce identical electrical results — the difference is
          in how the connections are made and where the wiring joins occur.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loop-in method</strong> — the most common modern method. The circuit cable
                loops in and out of each ceiling rose (or luminaire backbox), with the switch cable
                dropping from the ceiling rose to the switch. All connections are made at the
                ceiling rose, which acts as both the luminaire connection point and the circuit
                junction. This minimises the number of junction boxes and makes fault finding
                straightforward.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction box method</strong> — a three-terminal (or four-terminal) junction
                box is installed in the ceiling void. The circuit cable connects to the junction
                box, and separate cables run from the junction box to the ceiling rose and to the
                switch. This method is used where a ceiling rose is not appropriate (for example,
                with flush-mounted downlights) or where the electrician prefers to separate the
                switch connections from the luminaire connection point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern wiring centres (Wago, etc.)</strong> — lever-operated terminal blocks
                (such as Wago 221 series) have replaced traditional chocolate block connectors for
                making junction box connections. They are faster to install, require no tools, and
                provide a secure, inspectable connection. Junction boxes must remain accessible —
                they should not be concealed in a way that prevents access for inspection and
                maintenance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When extending an existing lighting circuit, identify which wiring method is in use before
          adding new lighting points. Mixing wiring methods in a poorly planned way can create
          connections that are difficult to trace during fault finding.
        </p>
      </>
    ),
  },
  {
    id: 'led-compatibility',
    heading: 'LED Compatibility and Minimum Load Issues',
    content: (
      <>
        <p>
          The widespread adoption of LED lighting has created compatibility issues with equipment
          designed for incandescent and halogen loads. Understanding these issues is essential for
          electricians installing or extending lighting circuits with LED luminaires.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum load for dimmer switches</strong> — many dimmer switches specify a
                minimum connected load, often 25W to 50W. With LED fittings drawing as little as 5W
                each, a dimmer with a minimum load of 50W would require at least 10 LED downlights
                to operate stably. Below the minimum load, the dimmer may flicker, buzz, or fail to
                turn off completely. Always check the dimmer switch's minimum and maximum load
                specification against the actual LED load to be connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer compatibility for low-voltage LEDs</strong> — 12V LED MR16
                (GU5.3) and similar low-voltage LED lamps may not be compatible with magnetic or
                electronic transformers designed for halogen lamps. If replacing 12V halogen lamps
                with 12V LEDs, the existing transformer must be verified as LED-compatible. In
                practice, it is often simpler and more reliable to replace the transformer (or
                driver) at the same time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inrush current from LED drivers</strong> — LED drivers have a high inrush
                current at switch-on relative to their steady-state current. On circuits with many
                LED fittings, this inrush can cause MCBs or RCBOs to trip at switch-on, particularly
                Type B devices. Switching to a Type C device may resolve this, though this should
                only be done after verifying that the earth fault loop impedance is adequate to
                ensure fault disconnection within the required time for Type C characteristics.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate lighting installation certificates at the job"
          description="Elec-Mate produces Minor Works Certificates and EICs on your phone. PDF in seconds, stored securely in the cloud."
          ctaText="Start 7-day free trial"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'dimmer-switches',
    heading: 'Dimmer Switches for LED Lighting — Trailing Edge vs Leading Edge',
    content: (
      <>
        <p>
          Dimmer switches control lighting by reducing the voltage or power delivered to the
          luminaire. The method by which they do this determines their compatibility with different
          lamp and driver types.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leading-edge dimmers (phase-cut forward)</strong> — chop the beginning of
                each AC half-cycle. Designed for resistive loads (incandescent bulbs) and inductive
                loads (magnetic transformers for halogen). Can cause flickering, buzzing, and damage
                to LED drivers. Not recommended for LED loads unless specifically rated as
                LED-compatible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trailing-edge dimmers (phase-cut reverse)</strong> — chop the trailing end
                of each AC half-cycle. Better suited to capacitive loads such as LED drivers.
                Produce less electrical noise (less buzzing in luminaires). Lower minimum load
                requirements than leading-edge dimmers. The preferred choice for LED installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Universal / LED-specific dimmers</strong> — some modern dimmers
                automatically detect the load type and switch between leading and trailing edge
                operation. These are the most flexible option for mixed installations. Always verify
                the specific LED driver/lamp is on the dimmer manufacturer's compatibility list.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart dimmers</strong> — smart dimmer switches (Lutron Caseta, Shelly,
                Philips Hue, Legrand Valena Life) use different dimming technologies and may require
                neutral wires at the switch position. Verify wiring requirements before specifying —
                many older domestic lighting circuits use two-core switch drops (no neutral at
                switch) which limits smart dimmer compatibility.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-lighting',
    heading: 'Outdoor Lighting — IP65 Minimum and RCD Protection',
    content: (
      <>
        <p>
          Outdoor lighting installations must comply with more stringent requirements than indoor
          lighting due to the exposure to weather and the increased risk of electric shock in damp
          or wet conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65 minimum for outdoor luminaires exposed to rain</strong> — a minimum
                IP65 rating (dust-tight, protected against water jets from any direction) is
                appropriate for wall lights, soffit lights, security lights, and garden post lights
                in the UK climate. IP44 is acceptable for covered outdoor areas such as porches and
                car port ceilings where the fitting is not directly exposed to rain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD protection — BS 7671 Regulation 411.3.3</strong> — all lighting
                circuits supplying luminaires in outdoor locations must be protected by a 30mA RCD.
                This applies to dedicated outdoor circuits and to indoor circuits extended to serve
                outdoor points. An RCBO at the consumer unit for the outdoor lighting circuit
                satisfies this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection for outdoor runs</strong> — cables buried in the ground for
                outdoor lighting must be armoured (SWA) or suitably protected. Surface-run outdoor
                cables should be in conduit or trunking. Cables run through walls or concealed in
                render must be in a wiring zone or protected with mechanical protection against
                penetration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PIR sensors and smart controls</strong> — passive infrared (PIR) security
                lights must be positioned to avoid false triggers from trees, vehicles, and animals
                where possible. Smart outdoor lighting controls (app-controlled, schedule-based)
                must be compatible with the luminaire and installed in weatherproof enclosures rated
                for the outdoor environment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting — BS 5266',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement in commercial premises, public buildings, and
          common areas of residential blocks under BS 5266-1:2016 (Emergency Lighting — Code of
          Practice for the Emergency Escape Lighting of Premises). Electricians working on
          commercial fit-outs or building upgrades must understand these requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained vs non-maintained emergency luminaires</strong> — maintained
                fittings are on at all times, switching to battery on mains failure. Non-maintained
                fittings are off during normal operation and illuminate only on mains failure. Most
                escape route luminaires are non-maintained; maintained fittings are used in cinemas,
                theatres, and venues where the public occupies areas in darkness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration — 1 hour or 3 hours</strong> — emergency luminaires are rated for
                either 1 hour or 3 hours of operation on battery following mains failure. BS 5266-1
                requires a minimum 1-hour duration for most premises. 3-hour duration is required in
                premises where evacuation may be prolonged, such as large entertainment venues and
                hospitals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Illuminance levels</strong> — escape routes must have a minimum illuminance
                of 1 lux on the centreline of the escape path and anti-panic areas must achieve a
                minimum of 0.5 lux throughout. These are significantly lower than normal working
                illuminance levels — emergency lighting is for safe evacuation, not for continuing
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing requirements</strong> — monthly function tests (simulate mains
                failure for a short period to verify the fitting illuminates) and annual full
                duration tests (3-hour test for 3-hour rated fittings, 1-hour test for 1-hour rated
                fittings) are required. Records must be kept.{' '}
                <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate</SEOInternalLink> supports
                emergency lighting certificate generation for commercial installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lux-levels',
    heading: 'Lux Levels — BS EN 12464-1',
    content: (
      <>
        <p>
          BS EN 12464-1 (Lighting of Indoor Work Places — Part 1: Indoor Work Places) specifies the
          minimum maintained illuminance (lux) levels for different types of tasks and areas. This
          standard applies to non-domestic work places and is relevant when designing or assessing
          commercial lighting installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corridors and circulation areas</strong> — 100 lux maintained illuminance at
                floor level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General office areas and meeting rooms</strong> — 500 lux at the working
                plane (desk height, typically 0.8m above floor level).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical drawing and detailed draughting</strong> — 750 lux at the working
                plane.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and assembly of very fine work</strong> — 1,000 lux or more,
                depending on the task visual difficulty rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical panel assembly and testing</strong> — 500 lux at the working
                plane for electrical switchgear assembly; 300 lux for electrical cable ducts and
                distribution panels where the panel door is open during work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When designing commercial lighting layouts, use a lighting design software tool (DIALux,
          Relux) to verify that the specified luminaires achieve the required lux level with the
          planned spacing and mounting height. Lux calculations must account for the maintenance
          factor (reduction in lumen output over time) of the specified luminaires.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Costs for Lighting Circuit Installation',
    content: (
      <>
        <p>
          Lighting circuit costs vary significantly depending on whether it is a new circuit, an
          extension to an existing circuit, or the replacement of light fittings only.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New lighting point (extending existing circuit)</strong> — £80 to £180 per
                lighting point including labour, materials, and Minor Works Certificate. Assumes the
                circuit has spare capacity and the cable route is accessible (ceiling void or floor
                void above).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New dedicated lighting circuit (domestic)</strong> — £200 to £450 including
                cable, consumer unit connection, ceiling roses or backboxes, labour, EIC, and Part P
                compliance where applicable. Ceiling void access significantly affects the price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED downlight installation (retrofit, per fitting)</strong> — £40 to £90 per
                fitting supplied and installed, including fire hood where required. Fire hoods are
                required where downlights are cut into a ceiling that forms a fire compartment
                boundary (for example, between floors).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting installation (commercial, per fitting)</strong> — £90 to
                £200 per emergency luminaire supplied and installed, including test key, test
                button, and duration labelling. Emergency lighting design, photometric calculations,
                and commissioning certificates are additional.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LightingCircuitInstallationPage() {
  return (
    <GuideTemplate
      title="Lighting Circuit Installation Guide — LED, Dimmers, Outdoor, Emergency | Elec-Mate"
      description="Complete UK guide to lighting circuit installation. Loop-in vs junction box wiring, LED compatibility, trailing-edge dimmers for LED, outdoor lighting IP65 and RCD protection, emergency lighting BS 5266, lux levels BS EN 12464-1, and typical costs."
      datePublished="2024-07-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Lighting Circuit Installation{' '}
          <span className="text-yellow-400">— LED, Dimmers, Outdoor, and Emergency</span>
        </>
      }
      heroSubtitle="From loop-in wiring to LED compatibility and outdoor IP ratings, this guide covers everything electricians need to know about installing and extending lighting circuits in domestic and commercial premises."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Lighting Circuit Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate your lighting work at the job"
      ctaSubheading="Minor Works Certificates, EICs, and emergency lighting certificates generated from your phone. PDF in seconds."
    />
  );
}
