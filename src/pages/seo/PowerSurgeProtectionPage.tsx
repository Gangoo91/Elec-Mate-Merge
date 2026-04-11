import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  PoundSterling,
  Home,
  Building2,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/electrical-safety-at-home' },
  { label: 'Power Surge Protection', href: '/power-surge-protection' },
];

const tocItems = [
  { id: 'what-is-a-power-surge', label: 'What Is a Power Surge?' },
  { id: 'causes', label: 'Causes of Power Surges' },
  { id: 'spd-types', label: 'SPD Types: 1, 2, and 3' },
  { id: 'bs7671-requirement', label: 'BS 7671 Amendment 2 Requirement' },
  { id: 'what-spds-protect', label: 'What SPDs Protect' },
  { id: 'installation-costs', label: 'SPD Installation Costs' },
  { id: 'choosing-spd', label: 'Choosing the Right SPD' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Power surges — sudden brief increases in voltage — are caused by lightning, utility switching, and motor loads switching on and off.',
  'Surge Protection Devices (SPDs) divert transient over-voltages safely to earth, protecting connected equipment.',
  'BS 7671:2018 Amendment 2 (2022) introduced requirements for SPD installation in certain new and altered installations, including most domestic dwellings.',
  'Type 1 SPDs are installed at the origin (meter position) and protect against direct lightning strikes. Type 2 SPDs are installed in the consumer unit. Type 3 SPDs are installed at the point of use.',
  'A Type 2 SPD installed in a domestic consumer unit typically costs £150 to £400 including installation by a qualified electrician.',
  'Equipment most vulnerable to surge damage includes computers, smart TVs, home theatre systems, smart home hubs, and any appliance with sensitive electronics.',
];

const faqs = [
  {
    question: 'Does BS 7671 require SPDs in domestic properties?',
    answer:
      'Yes. BS 7671:2018 Amendment 2 (effective from 28 March 2022) introduced Regulation 443.4, which requires a risk assessment for overvoltage protection in all new electrical installations and alterations. For most domestic dwellings with overhead supply lines or in areas with moderate to high lightning risk, the assessment will conclude that SPD protection is required. In practice, NICEIC and other schemes advise that a Type 2 SPD should be installed in the consumer unit of all new domestic installations unless the risk assessment clearly demonstrates it is unnecessary.',
  },
  {
    question: 'What is the difference between a Type 1, Type 2, and Type 3 SPD?',
    answer:
      'Type 1 SPDs are installed at the service entrance (origin of the installation, at or near the meter) and are designed to handle the very high energy of a direct or nearby lightning strike. They are mandatory where there is a lightning protection system on the building. Type 2 SPDs are installed in the consumer unit (distribution board) and protect against the residual surge that passes through a Type 1, or against surges generated within the building such as motor switching. Type 3 SPDs are installed at the point of use — in socket outlets, adaptors, or within appliances — and provide the final level of fine protection for sensitive equipment.',
  },
  {
    question: 'How much does it cost to install an SPD?',
    answer:
      "A Type 2 SPD installed in a domestic consumer unit typically costs between £150 and £400 in the UK including the device and labour. The exact cost depends on the type of consumer unit, accessibility, and the electrician's rates. Some consumer units require a Din rail SPD module; others require a dedicated SPD enclosure next to the board. Type 3 SPD surge-protected extension leads cost £20 to £80. Type 1 SPDs at the meter position are more complex and expensive, typically £300 to £600 or more.",
  },
  {
    question: 'Do surge protectors actually work?',
    answer:
      'Yes, when correctly specified and installed. SPDs contain Metal Oxide Varistors (MOVs) or spark gap devices that clamp voltage spikes and divert surge energy to earth. A properly coordinated system of Type 1, Type 2, and Type 3 SPDs provides comprehensive protection against both external surges (lightning) and internal surges (motor switching, utility faults). Surge-protected extension leads alone provide limited protection — they are Type 3 devices and rely on upstream protection to handle large surges.',
  },
  {
    question: 'Will my home insurance cover surge damage?',
    answer:
      'This depends on your policy. Many UK home insurance policies cover lightning damage but may exclude surge damage caused by utility switching or other internal causes. Some policies exclude expensive electronics or require them to be listed separately. Check your policy wording carefully. Installing a properly rated SPD system is the most reliable way to prevent surge damage regardless of insurance cover.',
  },
  {
    question: 'How do I know if my equipment has been surge damaged?',
    answer:
      'Surge damage may present immediately (the device stops working after a storm or power event) or progressively over time (the device becomes unreliable or develops faults). Modern electronics are increasingly vulnerable because they use lower-voltage components with tighter tolerances. Hard drives, motherboards, smart home controllers, and LED driver circuits are particularly susceptible. If multiple devices fail simultaneously after a power event, a surge is the likely cause.',
  },
  {
    question: 'Can I install an SPD myself?',
    answer:
      'Installing a Type 2 SPD in a consumer unit is notifiable electrical work under Part P of the Building Regulations and must be carried out by a registered competent person or notified to building control. Working inside a consumer unit also involves exposure to live conductors and should only be done by a qualified electrician with the appropriate training and test equipment. Plug-in Type 3 surge-protected extension leads can be used by anyone and require no installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description:
      'Complete home electrical safety guide including RCD testing, overloaded sockets, and DIY rules.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description:
      'How much it costs to replace a consumer unit in the UK, including RCD upgrade work.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the 18th Edition Wiring Regulations and Amendment 2.',
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
    id: 'what-is-a-power-surge',
    heading: 'What Is a Power Surge?',
    content: (
      <>
        <p>
          A power surge is a sudden, brief increase in voltage above the normal supply level. The UK
          mains supply is nominally 230 volts (V) alternating current (AC). A surge can momentarily
          raise this to hundreds or even thousands of volts, lasting anywhere from a fraction of a
          millisecond to a few milliseconds.
        </p>
        <p>
          Although brief, these transient over-voltages can cause immediate catastrophic failure of
          sensitive electronic components, or — more insidiously — degrade them over time through
          repeated smaller surges that reduce reliability before causing eventual failure. Modern
          electronics use lower-voltage transistors and integrated circuits with increasingly fine
          tolerances, making them more vulnerable to surge damage than older equipment.
        </p>
      </>
    ),
  },
  {
    id: 'causes',
    heading: 'Causes of Power Surges',
    content: (
      <>
        <p>
          Power surges have several distinct causes, ranging from large external events to everyday
          switching within a property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lightning strikes</strong> — a direct or nearby lightning strike can inject
                enormous energy into the distribution network. Even a strike some distance away can
                induce damaging transients in overhead power lines and the wiring of connected
                buildings. This is the scenario that Type 1 SPDs are specifically designed to
                handle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Utility switching surges</strong> — the electricity distribution network is
                constantly being switched — substations, capacitor banks, and power factor
                correction equipment all create transients when they switch in or out. These appear
                on the supply at all times, regardless of weather.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal switching surges</strong> — within a building, large motor loads —
                fridges, air conditioning units, washing machines, tumble dryers, and lifts — create
                voltage transients each time they start or stop. These internal surges can be
                significant, particularly in older properties with longer cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply restoration after an outage</strong> — when power is restored after a
                power cut, the restoration event can introduce a transient into the supply.
                Sensitive equipment left switched on during a power cut is vulnerable to this.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'spd-types',
    heading: 'SPD Types: Type 1, Type 2, and Type 3 Explained',
    content: (
      <>
        <p>
          Surge Protection Devices (SPDs) are classified into three types based on where they are
          installed in the electrical system and what level of surge energy they are designed to
          handle. A coordinated system uses all three types together.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-6 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong>Type 1 SPD — installed at the origin of the installation</strong>
                <p className="mt-1">
                  Located at the service entrance (at or near the electricity meter, between the
                  meter and the consumer unit). Designed to handle the very high peak currents from
                  direct lightning strikes — typically 25kA or more. Mandatory under BS 7671 where a
                  lightning protection system exists on the building. Uses spark gap technology or a
                  combination of spark gap and MOV.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong>Type 2 SPD — installed in the consumer unit</strong>
                <p className="mt-1">
                  Installed inside or directly adjacent to the consumer unit (fuse box). Handles the
                  residual surge energy that passes through a Type 1, plus internally generated
                  switching surges. This is the most common SPD installed in domestic properties.
                  Uses Metal Oxide Varistors (MOVs). Required in most new domestic installations
                  under BS 7671 Amendment 2.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong>Type 3 SPD — installed at the point of use</strong>
                <p className="mt-1">
                  The final line of protection, installed in socket outlets, within appliances, or
                  in surge-protected extension leads. Handles only small residual surges not already
                  absorbed by Type 1 and 2 devices. Cannot be used alone as the only protection — it
                  must be used downstream of Type 2 protection to be effective. The surge-protected
                  extension leads sold in consumer electronics shops are Type 3 devices.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671-requirement',
    heading: 'BS 7671 Amendment 2: The SPD Requirement',
    content: (
      <>
        <p>
          The 18th Edition of BS 7671 (the IET Wiring Regulations) was amended by Amendment 2, which
          became effective from 28 March 2022. This amendment significantly strengthened the
          requirements for surge protection in UK electrical installations.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 443.4 — risk assessment required</strong> — a risk assessment for
                overvoltage protection must be carried out for all new installations and significant
                alterations. The assessment considers the type of supply (overhead or underground),
                the lightning risk zone, and the consequences of damage to the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Most domestic installations require SPDs</strong> — where the risk
                assessment cannot clearly demonstrate that SPD protection is unnecessary, BS 7671
                requires it to be provided. For properties with overhead supply lines — which
                includes most rural properties and many suburban properties — the assessment will
                almost always conclude that SPD protection is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer unit installations</strong> — any new consumer unit
                installation should now include a Type 2 SPD as standard unless a valid risk
                assessment demonstrates otherwise. Many competent person scheme operators and
                network operators recommend SPDs as a default for all new domestic boards.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians completing new consumer unit installations should familiarise themselves with
          the Amendment 2 requirements. See our{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 18th Edition guide
          </SEOInternalLink>{' '}
          for a full overview of the Amendment 2 changes.
        </p>
      </>
    ),
  },
  {
    id: 'what-spds-protect',
    heading: 'What SPDs Protect — and What They Do Not',
    content: (
      <>
        <p>
          SPDs protect against transient over-voltages — sudden spikes of short duration. They are
          not designed to protect against sustained over-voltages (such as a neutral conductor fault
          that causes one phase to rise to 400V) or against sustained power outages.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Computers and laptops</strong> — power supplies contain capacitors and
                diodes vulnerable to voltage spikes. A surge can destroy a PSU instantly or corrupt
                data by causing a sudden shutdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart TVs and home theatre equipment</strong> — modern TVs contain complex
                electronics with narrow operating voltage tolerances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart home hubs and routers</strong> — always-on devices that are connected
                24 hours a day are exposed to every transient on the supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Appliances with inverter drives</strong> — modern washing machines,
                dishwashers, and heat pumps use variable-speed motor drives with sophisticated
                electronics that are surge-sensitive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPDs do not protect against</strong> — sustained overvoltages, power
                interruptions, brownouts, or the physical damage caused by a direct lightning strike
                to the building structure. They also have a finite lifespan — each surge they absorb
                degrades the MOV elements slightly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-costs',
    heading: 'SPD Installation Costs UK (2026)',
    content: (
      <>
        <p>
          The cost of SPD installation depends on the type of SPD, the consumer unit configuration,
          and the electrician's rates in your area.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 2 SPD in consumer unit</strong> — £150 to £400 including the device and
                installation labour. Some consumer units have space for a DIN-rail SPD module;
                others require a small additional enclosure mounted next to the board. Where a new
                consumer unit is being installed at the same time, adding a Type 2 SPD typically
                adds only £50 to £100 to the overall cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 1 SPD at origin</strong> — £300 to £600 or more, including
                installation. Requires work at the meter position which may need DNO (Distribution
                Network Operator) involvement. More complex and less commonly installed in standard
                domestic properties without a lightning protection system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type 3 surge-protected extension lead</strong> — £20 to £80 from retailers.
                No installation required. Provides limited protection as a standalone measure but is
                a useful complement to a Type 2 SPD for sensitive equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-spd',
    heading: 'Choosing the Right SPD',
    content: (
      <>
        <p>
          Not all SPDs are equal. When specifying a Type 2 SPD for a domestic consumer unit, look
          for the following key parameters.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage protection level (Up)</strong> — the maximum voltage that appears
                across the protected terminals during a surge. For domestic equipment rated at 230V,
                select an SPD with Up of 1.5kV or lower, ideally 1.2kV. Lower is better.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nominal discharge current (In)</strong> — the current the SPD can handle
                repeatedly without degradation. A minimum of 5kA (8/20µs waveform) is appropriate
                for domestic Type 2 SPDs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>End-of-life indication</strong> — good-quality SPDs have a visual indicator
                (often a window that changes colour) showing when the MOV elements are degraded and
                the device needs replacement. This is an important safety feature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 61643-11 compliance</strong> — ensure the SPD is tested to and marked
                as complying with BS EN 61643-11, the UK and European standard for low-voltage SPDs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Installing SPDs Under BS 7671 Amendment 2',
    content: (
      <>
        <p>
          For qualified electricians, SPD installation has become an increasingly common requirement
          following the Amendment 2 changes. Understanding the risk assessment methodology and SPD
          coordination is essential.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document the Risk Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  BS 7671 Regulation 443.4 requires a risk assessment for every new installation.
                  Document whether the supply is overhead or underground, the lightning protection
                  zone, and the consequences of failure. If the assessment concludes SPD protection
                  is not required, record why — this protects you if the decision is later
                  questioned.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Specify Correctly and Certify</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate (EIC) for new consumer unit
                  installations, including SPD details. Correct documentation is essential for Part
                  P compliance and for your customer's records.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICs and EICRs on site with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site certificate completion, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PowerSurgeProtectionPage() {
  return (
    <GuideTemplate
      title="Power Surge Protection UK | SPD Installation Guide"
      description="Complete guide to power surge protection in the UK. What causes surges, Type 1/2/3 SPDs explained, BS 7671 Amendment 2 requirements, SPD installation costs (£150–400), and what surge devices protect."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Power Surge Protection UK: <span className="text-yellow-400">SPDs Explained</span>
        </>
      }
      heroSubtitle="Everything you need to know about protecting your home and equipment from electrical surges — what causes them, the three types of Surge Protection Device (SPD), the BS 7671 Amendment 2 requirement, and what installation costs."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Power Surge Protection"
      relatedPages={relatedPages}
      ctaHeading="Are You an Electrician? Try Elec-Mate Free"
      ctaSubheading="Complete EICs and EICRs on your phone, including SPD documentation. Join 1,000+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
