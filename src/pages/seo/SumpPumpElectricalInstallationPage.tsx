import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Zap, AlertTriangle, CheckCircle2, FileCheck2, ShieldCheck, Wrench } from 'lucide-react';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Sump Pump Electrical Installation', href: '/sump-pump-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Why Correct Wiring Matters' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit Requirements' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'ip-ratings', label: 'IP Ratings & Cable Selection' },
  { id: 'float-switch', label: 'Float Switch Wiring' },
  { id: 'isolation', label: 'Isolation & Safe Isolation' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'A sump pump must be wired on a dedicated circuit — sharing a circuit with other loads risks nuisance tripping and means the pump may be isolated when other loads are switched off.',
  'All sump pump circuits must be protected by a 30mA RCD under BS 7671 Regulation 411.3.3. A basement or cellar with a sump pit may also trigger the additional protection requirements of Section 701 (bath/shower) if the pit is within a zone.',
  'Cable selection must account for the installation environment: damp basements and cellars require cables with appropriate IP-rated terminations. SWA cable provides mechanical protection where cables run in potentially accessible locations.',
  'SELV (Separated Extra-Low Voltage) is an option for low-power sump pump control circuits such as float switch inputs — it provides the highest level of protection against electric shock in wet locations.',
  'The pump circuit must have a clearly labelled means of isolation (Regulation 537.2) that is accessible without moving the pump — typically an IP44 isolator adjacent to the pump.',
  'Any new sump pump circuit is notifiable under Part P Building Regulations and requires an Electrical Installation Certificate on completion.',
];

const howToSteps = [
  {
    name: 'Confirm the earthing system and Ze',
    text: 'Before starting, confirm the existing earthing system (TN-S, TN-C-S, or TT) and measure or confirm the external earth fault loop impedance (Ze). For a basement/cellar, check whether the installation is on TT earthing — if so, RCD protection (already mandatory) is particularly critical since the disconnection of a fault relies entirely on the RCD.',
  },
  {
    name: 'Install a dedicated MCB or RCBO at the consumer unit',
    text: 'Run a new circuit from the consumer unit. For a standard domestic sump pump (typically 250W to 750W), a 6A or 10A Type B MCB is appropriate. Where an RCBO is used (MCB with integral 30mA RCD), the circuit has built-in RCD protection. Where a standard MCB is used, the circuit must be on an RCD-protected way in the consumer unit. Label the circuit clearly at the consumer unit.',
  },
  {
    name: 'Select and route cable',
    text: 'Use 1.5mm\u00b2 twin and earth for pump loads up to 2.4kW at 16A. In damp basement environments, route cable through conduit or use SWA for mechanical protection. Run cable in the prescribed zones (150mm from the floor or ceiling edge, or in conduit/trunking) per BS 7671 Chapter 52. Avoid running cables through areas subject to flooding where possible — if the cable route passes through flood-prone zones, use LSZH armoured cable.',
  },
  {
    name: 'Install an IP44 isolating switch adjacent to the pump',
    text: 'Install a double-pole IP44 rated isolating switch within reach of the pump, but above the anticipated flood level. The switch must disconnect both line and neutral per Regulation 537.2.1. Label the switch clearly as the sump pump isolator. If the pump is in a location where it could be reached from a bath or shower zone, position the isolator outside the zone or use an IP65 rated switch.',
  },
  {
    name: 'Wire the float switch',
    text: 'Float switches are typically wired in series with the live (line) supply to the pump motor — when the float rises, the switch closes and energises the pump. Connect the float switch in the line conductor using properly insulated terminals in an IP44 (minimum) junction box at or above flood level. For a dual-float system (run-on float and high-level alarm float), use the second float to activate a buzzer or indicator on a separate SELV circuit.',
  },
  {
    name: 'Test and certify',
    text: 'Carry out insulation resistance testing between all conductors (line/neutral/earth), polarity check, and earth continuity back to the main earth terminal. Verify the RCD operates within 40ms at 1x rated tripping current (I\u0394n). Test the float switch operation: raise the float and confirm the pump starts; lower the float and confirm the pump stops. Issue an Electrical Installation Certificate using the Elec-Mate app.',
  },
];

const faqs = [
  {
    question: 'Does a sump pump need its own dedicated circuit?',
    answer:
      'Yes — a sump pump should always be on its own dedicated circuit for two reasons. First, a shared circuit could be switched off by an occupant using another appliance on the circuit, disabling the pump when it is needed most. Second, a fault in the pump could trip the shared circuit, disconnecting other loads. A dedicated circuit also makes it easier to isolate the pump safely for maintenance. The circuit should be clearly labelled at the consumer unit and protected by its own MCB or RCBO.',
  },
  {
    question: 'What RCD protection is required for a sump pump circuit?',
    answer:
      'A 30mA RCD is mandatory for sump pump circuits under BS 7671 Regulation 411.3.3 — which requires 30mA RCD protection for all circuits in domestic premises that could present a risk of electric shock. Given that sump pumps operate in damp or flooded conditions, 30mA RCD protection is non-negotiable. An RCBO (combined MCB + RCD) on the sump pump circuit provides individual overcurrent and earth leakage protection, meaning a fault in the pump circuit will not affect other circuits on the same RCD.',
  },
  {
    question: 'What IP rating does a sump pump electrical installation need?',
    answer:
      'The minimum IP rating depends on the specific location: IP44 for damp locations (occasional water splash), IP55 for locations subject to water jets or heavy condensation, and IPX7 or IPX8 for submersible pump components designed to operate while submerged. All junction boxes, terminal enclosures, and isolating switches in the basement or cellar should be IP44 minimum. The pump motor itself is typically supplied with an appropriate IP rating by the manufacturer — check the pump data sheet. Cable glands and conduit terminations must also be rated to match.',
  },
  {
    question: 'Can I use SELV for a sump pump control circuit?',
    answer:
      'Yes. SELV (Separated Extra-Low Voltage, typically 12V or 24V DC) is an excellent choice for float switch control circuits in wet locations. Under BS 7671 Section 414, SELV circuits provide basic protection against electric shock without additional measures such as RCDs, as the voltage is inherently safe. A SELV float switch circuit uses a small transformer (safety isolating transformer to BS EN 61558) to supply the control circuit, which then operates a relay in the mains supply to the pump. This keeps the float switch wiring at safe voltage even in flooding conditions.',
  },
  {
    question: 'What are the BS 7671 zone requirements for a basement with a sump?',
    answer:
      'BS 7671 does not specifically define zones for basement sump pits in the same way as Section 701 (bathrooms) or Section 702 (swimming pools). However, if a sump pit is immediately adjacent to a bathroom or forms part of a room with a bath or shower, the zone dimensions of Section 701 may overlap. Additionally, if the sump pit is in an area subject to flooding, IP requirements should be assessed conservatively. For a dedicated pump room or utility basement, the relevant special location section would be Section 706 (restrictive conductive locations) if the pit is metal-lined and small. In practice, most residential sump installations are treated as ordinary damp locations requiring IP44 accessories and 30mA RCD protection.',
  },
  {
    question: 'Does a sump pump installation need Part P certification?',
    answer:
      'Yes. Installing a new dedicated circuit for a sump pump is notifiable under Part P of the Building Regulations. This work must be either notified to local authority building control before starting, or self-certified on completion by a registered competent person (an electrician registered with NICEIC, ELECSA, or NAPIT). An Electrical Installation Certificate must be issued on completion, recording the test results and circuit details. If the pump is simply plugged into an existing socket outlet, no certification is required for the electrical connection (though the socket circuit must be RCD-protected).',
  },
  {
    question: 'What should I do if the sump pump keeps tripping the RCD?',
    answer:
      'Persistent RCD tripping on a sump pump circuit indicates one or more of: excessive earth leakage current from the pump motor windings (common in aging motors or water-damaged insulation); a fault in the float switch wiring or its junction box; cable insulation damaged by abrasion or flooding; or a nuisance trip caused by switching surges in the pump motor. Use an insulation resistance tester to measure line-to-earth IR on the pump circuit with the pump disconnected. IR below 1M\u03a9 on a 250V test or below 0.5M\u03a9 on a 500V test suggests cable or motor insulation has degraded. The pump motor should be tested separately (measured at the motor terminals with supply disconnected).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-damp-proofing',
    title: 'Electrical Work in Damp Buildings',
    description:
      'Electrical issues in damp buildings — rewiring after DPC injection and EICR requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding Guide',
    description:
      'Systematic approach to finding earth faults, open circuits, and high resistance faults.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/fused-spur-installation-guide',
    title: 'Fused Spur Installation Guide',
    description: 'How to wire fused connection units correctly for fixed appliances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/minor-works',
    title: 'Minor Works Certificate App',
    description: 'Issue compliant MWCs instantly on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Generate Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Why Correct Sump Pump Wiring Matters',
    content: (
      <>
        <p>
          A sump pump is typically the last line of defence against basement flooding. If the
          electrical installation fails — through inadequate protection, poor isolation, or
          insufficient IP rating — the pump may not operate when it is needed most, or worse, may
          present an electric shock hazard in an already wet environment.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never use a standard 13A socket as the sole connection point</strong> for a
                sump pump that runs unattended. A dedicated circuit with proper isolation and RCD
                protection is the only safe and compliant approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flooding and electricity is a lethal combination.</strong> A 30mA earth
                leakage current flowing through a human body in contact with flood water can cause
                cardiac arrest. The electrical installation around a sump pump must be designed to
                minimise this risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This guide covers the key BS 7671 requirements and practical installation guidance for
          sump pump circuits in domestic basements and cellars. Always engage a registered
          electrician for this work.
        </p>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit Requirements',
    content: (
      <>
        <p>
          A sump pump should be supplied by a dedicated radial circuit from the consumer unit,
          separate from any other load. This ensures:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uninterrupted operation</strong> — the pump circuit cannot be accidentally
                switched off by isolating another appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct overcurrent protection</strong> — a 6A or 10A MCB matched to the
                pump&apos;s rated current provides closer protection than a 32A ring main MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault isolation</strong> — a fault in the pump circuit trips only the pump
                MCB/RCBO, not the whole house supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This new circuit is notifiable under Part P Building Regulations and requires an
          Electrical Installation Certificate. See our{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC certificate guide</SEOInternalLink> for
          what test results must be recorded.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Sump Pump Circuits',
    content: (
      <>
        <p>
          BS 7671 Regulation 411.3.3 requires all circuits in domestic premises to be protected by a
          30mA RCD. This requirement is absolute for sump pump circuits given the damp environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO (preferred)</strong> — combines MCB overcurrent protection and 30mA RCD
                earth fault protection in a single unit. A fault in the pump circuit trips only the
                RCBO, leaving other circuits unaffected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB on an RCD-protected split way</strong> — if the consumer unit has a
                dual-RCD arrangement, the pump circuit must be on an RCD-protected way. An
                unprotected way is not permissible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test the RCD regularly</strong> — press the test button quarterly and verify
                the RCD trips within the required time (BS 7671 requires disconnection within 40ms
                at I\u0394n for 30mA RCDs supplying socket outlets).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings & Cable Selection',
    content: (
      <>
        <p>
          The Ingress Protection (IP) rating of electrical equipment specifies its resistance to the
          ingress of solid objects and water. In a basement sump installation, the following IP
          ratings apply:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 minimum</strong> — for junction boxes, isolating switches, and any
                accessories in the damp basement environment. IP44 provides protection against 1mm
                solid objects and water splashing from any direction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IPX7/IPX8</strong> — for submersible pump motor and its cable entry. The
                pump manufacturer specifies the appropriate submersion rating. Do not use a surface
                pump rated IPX4 in a position where it could be submerged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection</strong> — 1.5mm\u00b2 twin and earth in conduit or SWA
                armoured cable for mechanical protection. In flood-risk routes, use LSZH (Low Smoke
                Zero Halogen) cable to reduce toxic gas emission if the installation is ever caught
                in a fire following flooding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'float-switch',
    heading: 'Float Switch Wiring',
    content: (
      <>
        <p>
          Most domestic sump pumps are activated by a float switch that detects the water level in
          the sump pit. The float switch must be correctly wired and protected for safe and reliable
          operation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Series connection in the line conductor</strong> — the float switch is wired
                in series with the line (live) conductor feeding the pump. When the float rises to
                the set level, the switch closes and the pump starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV control circuit (preferred)</strong> — for the highest level of safety,
                use a SELV relay circuit. The float switch operates at 12V or 24V SELV, activating a
                contactor or relay in the mains supply to the pump. This keeps the float switch
                wiring at safe voltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-level alarm float</strong> — install a second float switch set above
                the pump activation level, wired to an audible alarm or indicator. If the primary
                pump fails, the high-level float provides early warning. The alarm circuit can also
                be on a SELV supply.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'isolation',
    heading: 'Isolation Requirements',
    content: (
      <>
        <p>
          BS 7671 Regulation 537.2 requires every piece of fixed electrical equipment to have a
          suitable means of isolation. For a sump pump, this means:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Double-pole isolator</strong> — must disconnect both line and neutral
                simultaneously. Single-pole switches are not acceptable as isolators under BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Positioned above flood level</strong> — the isolator must be accessible
                without having to enter a flooded area. Mount at 1.2m to 1.5m height on the basement
                wall, above the maximum anticipated flood level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clearly labelled</strong> — the isolator must be clearly labelled to
                identify the equipment it controls (Regulation 514.1). Use a durable label:
                &quot;SUMP PUMP ISOLATOR — switch off before servicing pump.&quot;
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Issue EICs for Sump Pump Installations"
          description="Generate Electrical Installation Certificates for sump pump and basement electrical work directly from your phone with Elec-Mate."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
];

export default function SumpPumpElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Sump Pump Electrical Installation Guide — BS 7671 Wiring Requirements"
      description="How to wire a sump pump correctly — dedicated circuit, 30mA RCD protection, IP ratings, float switch wiring, and isolation requirements under BS 7671. UK Part P compliance guide."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Sump Pump Electrical Installation{' '}
          <span className="text-yellow-400">— BS 7671 Wiring Guide</span>
        </>
      }
      heroSubtitle="A complete guide to sump pump electrical installations: dedicated circuits, RCD protection, IP ratings, float switch wiring, SELV control circuits, and isolation requirements under BS 7671:2018."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Install a Sump Pump Circuit — Step by Step"
      howToDescription="Follow these steps to install a safe, compliant dedicated circuit for a sump pump in a domestic basement or cellar."
      faqs={faqs}
      faqHeading="Sump Pump Electrical Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certify Sump Pump Installations with Elec-Mate"
      ctaSubheading="Generate Electrical Installation Certificates for basement and sump pump circuits on your phone. Test results recorded, PDF shared instantly."
    />
  );
}
