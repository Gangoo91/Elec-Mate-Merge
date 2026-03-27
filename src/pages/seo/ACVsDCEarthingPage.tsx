import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Zap,
  Calculator,
  FileCheck2,
  Sun,
  Cable,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'AC vs DC Earthing', href: '/guides/ac-vs-dc-earthing-solar-ev' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'ac-earthing', label: 'AC Earthing: Standard Requirements' },
  { id: 'dc-earthing', label: 'DC Earthing: Solar PV and Energy Storage' },
  { id: 'type-b-rcd', label: 'Type B RCD Requirement for DC Fault Currents' },
  { id: 'ev-charging', label: 'EV Charging and DC Earthing' },
  { id: 'solar-pv', label: 'Solar PV: DC Side Earthing and Bonding' },
  { id: 'pe-conductor', label: 'PE Conductor for DC Circuits' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'AC earthing follows the standard BS 7671 requirements for protective earthing, bonding, and residual current device selection. Type AC RCDs detect sinusoidal (AC) residual currents; Type A RCDs detect both AC and pulsating DC residual currents.',
  'DC circuits from solar PV, battery storage, and EV chargers can produce smooth DC fault currents that Type A RCDs cannot detect. BS 7671 Regulation 411.3.3 and Table 7.3(ii) require Type B RCDs where smooth DC fault currents may occur.',
  'A Type B RCD detects AC, pulsating DC, and smooth DC residual currents. It is required for EV charging equipment connected to a supply that could produce DC fault currents — typically EVSE with three phase rectification or DC-coupled systems.',
  'Solar PV systems in the UK are typically IT earthing systems on the DC side — the DC conductors are ungrounded (not connected to earth). A ground fault on the DC side is detected by insulation monitoring and isolation monitoring devices, not by standard RCDs.',
  'The protective earth (PE) conductor must be continuous on both the AC and DC sides of any installation. For solar PV, the mounting structure and inverter enclosure must be bonded to the installation earth via the PE conductor.',
];

const faqs = [
  {
    question: 'What is the difference between a Type A and Type B RCD?',
    answer:
      'A Type AC RCD detects only sinusoidal AC residual current — the type produced by a simple earth fault on a standard AC circuit. A Type A RCD detects sinusoidal AC residual currents and pulsating DC residual currents (which occur with single phase rectification, as found in the variable speed drives and switching power supplies common in modern appliances). A Type B RCD detects all types of residual current: sinusoidal AC, pulsating DC, and smooth DC. Smooth DC fault currents are produced by three phase rectification — as found in three phase EV chargers, solar PV inverters with integrated DC fault generation, and battery storage systems. Type A RCDs cannot detect smooth DC fault currents and will NOT operate to protect against them. BS 7671 Regulation 411.3.3 and Table 7.3(ii) require Type B RCDs wherever smooth DC fault currents may occur.',
  },
  {
    question: 'Which EV chargers require a Type B RCD?',
    answer:
      'BS 7671 Section 722 (Regulation 722.531.2.101) and the relevant product standards specify the RCD type required for EV charging equipment. For single phase Mode 3 EV chargers (7.4kW): a Type A RCD with additional DC fault detection, or a Type B RCD, is required. The EV charger manufacturer specifies which RCD type satisfies the requirement for their specific product — always check the installation manual. For three phase EV chargers (22kW) and DC rapid chargers, a Type B RCD is typically required because three phase rectification in the charger or vehicle on-board charger can produce smooth DC fault currents. Many EV charger units include integrated Type B RCD functionality — in this case, an external Type B RCD at the consumer unit is not needed, but the manufacturer documentation must confirm this.',
  },
  {
    question: 'What earthing system is used on the DC side of a solar PV installation?',
    answer:
      'UK solar PV installations typically use an IT earthing system on the DC side — meaning the DC conductors (positive and negative) are not connected to earth (they are floating or isolated). This is different from the TN and TT earthing systems used on the AC side. In an IT system, a single DC fault to earth does not immediately create a dangerous fault current — but it reduces the insulation integrity. A second fault on the other DC conductor would then create a low-impedance fault path. For this reason, solar PV inverters in the UK include insulation monitoring (also called ground fault detection) that monitors the insulation resistance between the DC conductors and the inverter frame (earth). If insulation resistance falls below a threshold, the inverter isolates the DC side and generates an alarm. Some inverters also include DC ground fault current interrupters (GFCI) in the DC circuit.',
  },
  {
    question: 'What bonding is required for a solar PV installation?',
    answer:
      'The metallic components of a solar PV installation that must be bonded to the installation earth include: the solar panel mounting structure (rails, frames), the inverter enclosure, any metallic cable trunking or conduit on the DC side, and the metallic enclosure of any DC isolator. The bonding is achieved via the protective earth (PE) conductor of the AC supply cable from the inverter to the consumer unit, and by separate equipotential bonding conductors to the mounting structure. The bonding ensures that all metal parts are at the same potential as the installation earth — preventing a voltage gradient between the mounting structure and the inverter enclosure that could cause a shock hazard if both are touched simultaneously. Bonding conductor sizing is governed by BS 7671 Table 54.7 and the manufacturer installation instructions.',
  },
  {
    question: 'Does a solar PV installation need its own earth electrode?',
    answer:
      'If the property has a TN-S or TN-C-S supply, the solar PV installation uses the existing installation earth (from the DNO supply). No additional earth electrode is required solely for the solar PV system. If the property has a TT supply (with a local earth electrode), the solar PV installation shares the same earth electrode. In some cases, solar PV inverter manufacturers specify that the inverter\'s AC output must not be connected to a PME (TN-C-S) earth without additional protective measures — this is because some inverter designs can inject DC current into the PME earth, raising safety and DNO concerns. Always check the inverter installation manual for any earthing system restrictions.',
  },
  {
    question: 'What is DC ELSP (DC Earth Leakage Self Protection) in EV chargers?',
    answer:
      'DC ELSP (DC Earth Leakage Self Protection) is a built-in feature of some EV charging units that monitors DC fault currents internally and disconnects the supply if a dangerous DC fault current is detected. A charger with certified DC ELSP does not require an external Type B RCD at the consumer unit — the charger itself provides the equivalent protection. The charger documentation must state that it complies with IEC 62955 (Residual Direct Current (RDC) detecting and interrupting device for DC protection) and that the DC ELSP function replaces the need for an external Type B RCD. This is significant because Type B RCDs are expensive (£50–£150+ per device) and their cost can be avoided if the charger has certified internal DC protection. Always verify the specific charger model\'s certification before omitting the external Type B RCD.',
  },
  {
    question: 'Can a Type F RCD be used instead of Type B for EV chargers?',
    answer:
      'A Type F RCD detects AC residual currents, pulsating DC residual currents, and high-frequency AC currents (up to 1kHz). It was developed specifically for frequency converter applications and can be used where the residual current includes high-frequency components from variable speed drives. However, a Type F RCD does NOT detect smooth DC fault currents — it is not a substitute for a Type B RCD where smooth DC faults may occur. For EV chargers where smooth DC fault currents are possible (three phase rectification), a Type B RCD (or a charger with certified DC ELSP) remains the correct choice. Some EV charger manufacturers specify Type F as acceptable — but this depends on the specific charger design and whether the three phase rectification in the charger or vehicle can produce smooth DC fault currents. Always consult the charger installation manual.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earthing-systems-tns-tncs-tt-explained',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing — essential foundation for AC and DC earthing work.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC certificates for solar PV and EV charging installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/solar-pv-certificate',
    title: 'Solar PV Certificate',
    description: 'Complete solar PV installation certificates on site on your phone.',
    icon: Sun,
    category: 'Certificate',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Complete guide to EV charger installation including earthing and RCD requirements.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study RCD testing, earthing verification, and solar PV inspection.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'AC vs DC Earthing: Solar PV, Battery Storage, and EV Charging',
    content: (
      <>
        <p>
          The rapid growth of solar PV, battery storage, and electric vehicle charging has
          introduced DC circuits into domestic and commercial electrical installations that were
          previously purely AC. DC circuits require different earthing, bonding, and protective
          device considerations to AC circuits — and the wrong protective device selection can
          leave a DC fault completely undetected.
        </p>
        <p>
          The critical distinction is the type of residual current that a fault can produce.
          Standard Type AC and Type A RCDs are designed for AC and pulsating DC fault currents.
          They cannot detect smooth DC fault currents — which can occur in three phase EV
          chargers, solar PV inverters, and DC-coupled battery storage systems. BS 7671:2018+A3:2024
          Regulation 411.3.3 and{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            Table 7.3(ii)
          </SEOInternalLink>{' '}
          require Type B RCDs where smooth DC fault currents may occur.
        </p>
      </>
    ),
  },
  {
    id: 'ac-earthing',
    heading: 'AC Earthing: Standard Requirements',
    content: (
      <>
        <p>
          AC earthing for standard electrical installations follows the requirements set out in
          BS 7671 Chapters 41 and 54. The earthing system (TN-S, TN-C-S, or TT) determines
          the available earth fault loop impedance and the type of protective device required.
          For AC circuits, the RCD types in common use are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type AC:</strong> Detects sinusoidal AC residual currents only. Used in
                older installations. Not suitable for circuits supplying equipment with electronic
                power supplies (switching chargers, variable speed drives). Being phased out of
                new installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A:</strong> Detects sinusoidal AC and pulsating DC residual currents.
                Suitable for most domestic and commercial circuits, including those supplying
                appliances with single phase rectifiers (washing machines, fridges, computers).
                Standard for new UK domestic consumer units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B:</strong> Detects all residual current types including smooth DC.
                Required for three phase EV chargers, specific solar PV configurations, and
                systems that can produce smooth DC fault currents (BS 7671 Regulation 411.3.3
                and Table 7.3(ii)).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dc-earthing',
    heading: 'DC Earthing: Solar PV and Energy Storage Systems',
    content: (
      <>
        <p>
          DC circuits from solar PV and battery storage are typically ungrounded (IT earthing
          system) on the DC side. This means the DC positive and negative conductors are not
          connected to earth. This is different from AC earthing, where the neutral is earthed
          at the transformer.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">DC IT Earthing System Characteristics</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• DC positive (+) and DC negative (−) conductors are isolated from earth</li>
            <li>• A single DC insulation fault does not immediately cause a dangerous fault current</li>
            <li>• Inverter monitors insulation resistance between DC conductors and frame (earth)</li>
            <li>• Insulation monitoring device (IMD) triggers alarm if insulation resistance falls below threshold</li>
            <li>• A second fault on the opposite conductor creates a hazardous fault path</li>
            <li>• DC ground fault current interrupters (GFCI) provide current protection</li>
          </ul>
        </div>
        <p>
          The metallic components of the DC installation (panel mounting structure, inverter
          enclosure, DC cable trunking) must be bonded to the installation protective earth
          via the PE conductor of the AC supply cable and additional bonding conductors where
          required. This bonding does not ground the DC conductors — it ensures that metal
          parts are at earth potential to prevent shock hazard from accidental contact.
        </p>
      </>
    ),
  },
  {
    id: 'type-b-rcd',
    heading: 'Type B RCD Requirement for DC Fault Currents',
    content: (
      <>
        <p>
          BS 7671 Regulation 411.3.3 states that where a circuit includes equipment that can
          produce DC residual currents that might impair the operation of a Type AC or Type A
          RCD, a Type B RCD must be used, or a Type A RCD with additional DC fault current
          detection provided by the equipment itself.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-2">Why Type A RCDs Fail on DC Faults</p>
              <p className="text-white text-sm mb-2">
                A smooth DC fault current (from three phase rectification) passes through the
                toroidal core of a Type A RCD without causing any magnetic imbalance — the DC
                field is constant, not alternating, so the RCD core does not detect it. The
                RCD will not trip. A person in contact with the fault current path on the DC
                side will receive an electric shock that the RCD cannot interrupt.
              </p>
              <p className="text-white text-sm">
                Type B RCDs use additional sensing windings and a DC-sensitive measuring circuit
                to detect both AC and smooth DC residual currents, triggering the relay within
                the specified 300ms (or 40ms for 30mA instantaneous trip).
              </p>
            </div>
          </div>
        </div>
        <p>
          BS 7671 Table 7.3(ii) (in the EV charging section, Appendix 7) identifies where
          Type B RCDs are required for EV charging applications. The same principle applies
          to other DC-generating equipment — always check Table 7.3(ii) and the equipment
          manufacturer's installation manual for the specific RCD type requirement.
        </p>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging and DC Earthing Requirements',
    content: (
      <>
        <p>
          EV charging equipment (EVSE — Electric Vehicle Supply Equipment) has specific earthing
          and RCD requirements under BS 7671 Section 722. The requirements depend on the
          charger type and power level:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single phase 7.4kW (Mode 3):</strong> Type A RCD with additional DC
                fault current protection (IEC 62955 compliant RDC device), or Type B RCD.
                Many 7.4kW chargers include certified DC ELSP — verify before omitting
                external Type B RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three phase 22kW (Mode 3):</strong> Type B RCD required. Three phase
                rectification in the vehicle on-board charger can produce smooth DC fault
                currents. Some chargers include integral Type B protection — verify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC rapid chargers (Mode 4):</strong> The charger-to-vehicle connection
                is DC. The AC supply to the charger cabinet requires Type B RCD protection
                or integral DC protection certified to IEC 62955.
              </span>
            </li>
          </ul>
        </div>
        <p>
          PME earthing considerations for EV chargers are addressed in BS 7671 Regulation
          722.411.4.1 — EV charging equipment connected to a PME supply must have additional
          protective measures to guard against the PEN conductor break risk. Many charger
          manufacturers include a PEN conductor monitoring device in their products for this
          purpose.
        </p>
        <SEOAppBridge
          title="Complete EV charging installation certificates on your phone"
          description="Elec-Mate's EIC app includes fields for EV charging circuit details, RCD type, earthing system, and DNO notification. Generate compliant PDF certificates on site."
          icon={Cable}
        />
      </>
    ),
  },
  {
    id: 'solar-pv',
    heading: 'Solar PV: DC Side Earthing and Bonding',
    content: (
      <>
        <p>
          Solar PV systems require careful attention to both the DC side (panels and inverter
          DC input) and the AC side (inverter output to consumer unit). Key requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel mounting structure:</strong> Must be bonded to the installation
                earth via a protective bonding conductor. The bonding conductor must be sized
                in accordance with BS 7671 Table 54.7 and the inverter installation manual.
                Typically 4mm² or 6mm² copper.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter enclosure:</strong> The PE terminal of the inverter must be
                connected to the installation earth. This connection is made via the PE
                conductor of the AC supply cable from the inverter to the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC cable insulation:</strong> DC cables must be double insulated or
                individually insulated and sheathed. The DC cable insulation resistance must
                be verified during commissioning. Damaged DC cable insulation is a significant
                fire risk — DC arc faults are sustained, unlike AC arcs which self-extinguish
                at each current zero crossing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pe-conductor',
    heading: 'PE Conductor for DC Circuits',
    content: (
      <>
        <p>
          The protective earth (PE) conductor must be continuous throughout both the AC and DC
          sides of a solar PV or battery storage installation. For DC circuits:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>DC cables do not normally include a PE conductor — the DC conductors are ungrounded in the IT system. The PE for equipment enclosures is provided by separate bonding conductors.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>The inverter PE terminal connects the inverter enclosure to the installation earth via the PE in the AC supply cable. This must be verified by continuity testing during commissioning.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>PE conductor size for DC bonding: follow BS 7671 Table 54.7, with the minimum size determined by the fault current that may flow through the conductor under fault conditions.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: DC Earthing Compliance in Practice',
    content: (
      <>
        <p>
          DC earthing and RCD selection for solar PV and EV chargers are among the most
          complex areas of BS 7671 for domestic electricians. The consequences of incorrect
          RCD selection — particularly using a Type A RCD where a Type B is required — can
          leave a DC fault completely undetected and uninterrupted. Always check the specific
          equipment installation manual for the required RCD type and earthing configuration
          before commencing the installation.
        </p>
        <SEOAppBridge
          title="Complete solar PV and EV charging certificates on your phone"
          description="Elec-Mate's Solar PV and EIC certificate apps capture all required details: RCD type, earthing system, insulation resistance test results, and commissioning data. Generate compliant PDF certificates on site."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ACVsDCEarthingPage() {
  return (
    <GuideTemplate
      title="AC vs DC Earthing for Solar PV and EV Charging | UK Guide"
      description="Complete guide to AC vs DC earthing for UK electricians. Type B RCD requirement for DC fault currents (BS 7671 Regulation 411.3.3 and Table 7.3(ii)), solar PV DC earthing, EV charging earthing, and PE conductor requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="DC Earthing Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          AC vs DC Earthing:{' '}
          <span className="text-yellow-400">Type B RCDs, Solar PV and EV Charging Requirements</span>
        </>
      }
      heroSubtitle="Type A RCDs cannot detect smooth DC fault currents from three phase EV chargers and solar PV systems. BS 7671 Regulation 411.3.3 and Table 7.3(ii) require Type B RCDs where DC fault currents may occur. This guide explains the difference, when Type B is required, and how to earth DC circuits correctly."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: AC vs DC Earthing"
      relatedPages={relatedPages}
      ctaHeading="Certify Solar PV and EV Charging Installations"
      ctaSubheading="Elec-Mate's Solar PV and EIC apps capture all earthing details, RCD specifications, and test results for compliant certification. 7-day free trial, cancel anytime."
    />
  );
}
