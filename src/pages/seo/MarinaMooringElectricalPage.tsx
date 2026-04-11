import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ClipboardCheck,
  Building2,
  Settings,
  Plug,
  Anchor,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Installations', href: '/guides/specialist-electrical' },
  { label: 'Marina & Mooring Electrical', href: '/marina-mooring-electrical' },
];

const tocItems = [
  { id: 'bs7671-section-709', label: 'BS 7671 Section 709' },
  { id: 'shore-power-connections', label: 'Shore Power Connections' },
  { id: 'galvanic-corrosion', label: 'Galvanic Corrosion' },
  { id: 'earth-leakage-monitoring', label: 'Earth Leakage Monitoring' },
  { id: 'cee-connectors', label: 'IEC 60309 CEE Connectors' },
  { id: 'rcd-requirements', label: 'RCD Requirements' },
  { id: 'earthing', label: 'Earthing Arrangements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A3:2024 Section 709 governs electrical installations in marinas and similar locations including boat harbours and yacht clubs. It applies from the origin of the shore supply to the socket outlets on the pontoons.',
  'Shore power socket outlets must comply with IEC 60309 (BS EN 60309) — the blue 16 A or 32 A CEE connectors are the standard for marina hookups throughout the UK and Europe.',
  'Galvanic corrosion is a critical hazard in marina installations. Stray DC currents through the water caused by mixed-metal hulls and poor bonding can destroy underwater metalwork over months. Galvanic isolators or isolation transformers are strongly recommended.',
  'Earth leakage monitoring (ELM) systems are required by Section 709 to detect fault currents before they reach dangerous levels. Each socket outlet supply must be monitored individually.',
  '30 mA RCD protection is required for every shore power socket outlet. Type A RCDs must be used where electronic equipment on board boats may produce pulsating DC residual currents.',
  'The recommended periodic inspection interval for marina electrical installations is 1 year (IET Guidance Note 3). Annual inspection should include RCD testing, earth leakage monitor testing, and visual inspection of all socket outlets and cable management.',
];

const faqs = [
  {
    question: 'Which BS 7671 section applies to marina electrical installations?',
    answer:
      'Section 709 of BS 7671:2018+A3:2024 (Part 7 — Special Installations or Locations) covers electrical installations in marinas and similar locations. It applies to shore power supplies for boats and other craft moored at pontoons, berths, and jetties. Section 709 modifies and supplements the general requirements in Parts 1 to 6 of BS 7671.',
  },
  {
    question: 'What causes galvanic corrosion in marina electrical systems?',
    answer:
      'Galvanic corrosion occurs when dissimilar metals (for example aluminium hull fittings and bronze propellers) are electrically connected through the water. When multiple boats are connected to the same shore power earth conductor, stray DC currents can flow through the water between boats, accelerating corrosion of underwater metalwork. A galvanic isolator (DC blocking device) fitted to the earth conductor of each shore power connection, or an isolation transformer, interrupts these low-level DC currents while maintaining AC fault protection.',
  },
  {
    question: 'What is an earth leakage monitoring system and why is it required?',
    answer:
      'An earth leakage monitoring (ELM) system continuously monitors the residual current in each shore power supply circuit. It provides an alarm when the leakage current exceeds a pre-set threshold (typically well below the 30 mA RCD trip threshold) so that faults can be investigated before they become dangerous. Section 709 requires ELM systems because the water environment means fault currents can flow through the water itself, creating electric shock hazards in the marina basin even before the RCD operates.',
  },
  {
    question: 'What type of socket outlets are used for marina shore power?',
    answer:
      'Marina shore power socket outlets must comply with IEC 60309 (BS EN 60309). The standard connectors are the blue 16 A single-phase CEE socket outlets for leisure craft and the blue or red 32 A or 63 A connectors for larger vessels. These connectors are weatherproof (IP44 minimum), mechanically robust, and have the earth-first engagement feature. They are the same IEC 60309 connectors used at caravan parks, though marina-specific designs with locking mechanisms are common.',
  },
  {
    question: 'What RCD protection is required for marina shore power?',
    answer:
      'Each marina shore power socket outlet must be individually protected by a 30 mA RCD. Type A RCDs are required where electronic equipment on board boats (battery chargers, inverter-chargers, engine management systems) may produce pulsating DC residual currents. In practice, all new marina installations should use Type A RCDs as standard. The RCD must be located as close as practicable to the socket outlet it protects.',
  },
  {
    question: 'How often should marina electrical installations be inspected?',
    answer:
      'IET Guidance Note 3 recommends a maximum periodic inspection interval of 1 year for marina and similar installations. Annual inspection should cover all fixed wiring, distribution boards, socket outlet units, RCD testing (operating time at IΔn and 5× IΔn), earth leakage monitor testing, earth electrode resistance measurement, galvanic isolator continuity, and visual inspection of all cable management and socket outlet enclosures. The pontoon environment is highly corrosive and deterioration can be rapid.',
  },
  {
    question: 'Does BS 7671 Section 709 cover the electrical installation inside a boat?',
    answer:
      'No. Section 709 applies to the shore-based fixed installation supplying electricity to moored craft — from the origin of supply to the socket outlets on the pontoons. The electrical installation within individual boats (internal AC shore power distribution, DC systems, battery charging) is outside the scope of BS 7671 and is covered by separate marine standards including ISO 13297 (small craft — electrical systems) and the RYA/BMEA guidance.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/caravan-park-electrical',
    title: 'Caravan Park Electrical (Section 708)',
    description:
      'BS 7671 Section 708 requirements for caravan parks — CEE connectors, RCD protection, and earthing.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/fountain-pool-electrical',
    title: 'Decorative Fountain & Feature Pool Electrical',
    description:
      'Zone requirements, SELV, IP ratings, and bonding for water features under BS 7671 Section 702.',
    icon: Zap,
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
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete periodic inspection reports on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'bs7671-section-709',
    heading: 'BS 7671 Section 709: Marinas and Similar Locations',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Section 709 — Marinas and Similar Locations — is the authoritative
          technical standard for shore power electrical installations at UK marinas, boat harbours,
          inland waterway moorings, and yacht clubs. It applies to the fixed installation from the
          origin of the shore supply to (and including) the socket outlets mounted on pontoons and
          jetties.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Anchor className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of Section 709</strong> — covers the fixed electrical installation
                supplying shore power to boats, yachts, motorboats, and other craft moored at
                pontoons, berths, and jetties. It does not apply to the internal wiring of
                individual craft, which is governed by separate marine standards. Where Section 709
                is silent, the general requirements of BS 7671 apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Anchor className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specific hazards</strong> — marina installations present hazards not found
                in most other electrical environments: the corrosive salt and fresh water
                environment, floating pontoons subject to tidal movement, the risk of electric shock
                through conductive water (electric shock drowning), galvanic corrosion from stray DC
                currents, and non-expert users (boat owners) connecting and disconnecting their own
                shore power leads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Anchor className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shock drowning</strong> — electric shock drowning (ESD) is a
                potentially fatal hazard specific to aquatic environments. A voltage gradient in the
                water — caused by a fault current flowing from shore power through the water to
                earth — can cause muscular paralysis in swimmers, preventing them from reaching
                safety. Earth leakage monitoring and rapid RCD disconnection are the primary
                protective measures.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on marina installations should hold a current{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 qualification
          </SEOInternalLink>{' '}
          and be familiar with Section 709. The IET Guidance Note 7 (Special Locations) provides
          supplementary guidance on marina installations.
        </p>
      </>
    ),
  },
  {
    id: 'shore-power-connections',
    heading: 'Shore Power Connections and Socket Outlet Units',
    content: (
      <>
        <p>
          Shore power socket outlet units (sometimes called pedestal units or power posts) are the
          interface between the marina's fixed installation and individual boats. Their design,
          rating, and installation must comply with Section 709 and the requirements for outdoor
          electrical equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual supply per berth</strong> — each berth must be supplied through
                its own socket outlet unit with individual overcurrent protection and RCD
                protection. Sharing supply between berths is not permitted, as it prevents
                individual isolation and individual leakage current monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO protection</strong> — modern marina pedestal units typically
                incorporate an RCBO (Residual Current Circuit Breaker with Overcurrent protection)
                per socket outlet, combining 30 mA RCD protection and overcurrent protection in a
                single device. This allows the berth supply to be isolated without affecting other
                berths on the same submain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating</strong> — socket outlet units must have a minimum IP rating of
                IP44. Units on exposed pontoons or tidal locations may require IP55 or higher. The
                pontoon environment exposes electrical equipment to salt spray, rain, wave splash,
                and occasional immersion — IP rating selection must reflect the actual installation
                conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corrosion resistance</strong> — pedestal enclosures must be made from
                materials resistant to marine corrosion. GRP (glass-reinforced plastic) and
                marine-grade stainless steel are standard. Standard steel enclosures will corrode
                rapidly in a saltwater marina environment, compromising both structural integrity
                and electrical safety.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'galvanic-corrosion',
    heading: 'Galvanic Corrosion: Causes and Protection',
    content: (
      <>
        <p>
          Galvanic corrosion is one of the most significant and often underappreciated hazards in
          marina electrical engineering. It is caused by DC currents flowing through the water
          between dissimilar metals on adjacent boats connected to the same shore power earth
          conductor.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The galvanic cell</strong> — when two dissimilar metals (for example
                aluminium and bronze) are immersed in the same electrolyte (salt or fresh water) and
                electrically connected, a galvanic cell is formed. The less noble metal (aluminium)
                acts as the anode and corrodes. In a marina, the shore power earth conductor
                connecting multiple boats creates this electrical connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Galvanic isolator</strong> — a galvanic isolator (complying with BS EN 61191
                or equivalent) is a DC blocking device fitted in series with the shore power earth
                conductor. It passes AC fault currents (essential for protective device operation)
                but blocks low-level DC galvanic currents. Galvanic isolators are strongly
                recommended for all boats connected to shore power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation transformer</strong> — an isolation transformer on board the boat
                provides complete galvanic isolation from the shore earth. The boat's AC system is
                referenced to a floating (unearthed) supply derived from the transformer secondary.
                This eliminates galvanic currents entirely but is more expensive and requires
                careful design to maintain shock protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Marina operators should advise berth holders of the galvanic corrosion risk and the
          protective measures available. Electricians designing or inspecting marina installations
          should verify that galvanic protection measures are in place and functioning correctly.
        </p>
      </>
    ),
  },
  {
    id: 'earth-leakage-monitoring',
    heading: 'Earth Leakage Monitoring Systems',
    content: (
      <>
        <p>
          Section 709 requires earth leakage monitoring (ELM) systems in marina installations. ELM
          systems provide continuous monitoring of residual current in shore power circuits,
          alerting marina staff to developing faults before they reach dangerous levels.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How ELM works</strong> — a current transformer fitted around the live and
                neutral conductors of each shore power circuit continuously measures the difference
                between outgoing and returning current. Any difference (residual current) indicates
                a fault path — either through a fault on the boat, through the water, or through a
                damaged cable. The ELM system triggers an alarm when the residual current exceeds
                the pre-set threshold (typically 10 mA or 15 mA).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alarm vs. trip</strong> — the ELM system typically provides an alarm rather
                than automatically disconnecting the supply. This allows marina staff to investigate
                and advise the boat owner before disconnection. The 30 mA RCD remains the primary
                automatic protective device for shock protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central monitoring</strong> — in modern marinas, ELM signals are aggregated
                to a central marina management system, allowing marina staff to identify which berth
                has a developing fault and respond quickly. Systems can send alerts by email or SMS
                to the marina manager.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing at inspection</strong> — ELM systems must be tested at every
                periodic inspection. Testing involves injecting a known residual current into the
                monitoring circuit and verifying the alarm operates at or below the pre-set
                threshold. Test results should be recorded in the inspection report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cee-connectors',
    heading: 'IEC 60309 CEE Connectors for Marina Shore Power',
    content: (
      <>
        <p>
          IEC 60309 (BS EN 60309) connectors are the standard for marina shore power throughout the
          UK and Europe. Their weatherproof construction, earth-first engagement, and colour-coded
          voltage identification make them well suited to the demanding marina environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>16 A blue single-phase</strong> — the standard connector for leisure craft
                and small boats. Provides a nominal 3.68 kW supply at 230 V. This is the same
                connector used at caravan parks, making standardised EHU (electric hookup) cables
                compatible between marinas and caravan sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>32 A blue single-phase</strong> — used for larger motorboats and yachts with
                higher power requirements (heating, air conditioning, refrigeration). Provides up to
                7.36 kW. Larger vessels may require 63 A or three-phase supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Locking mechanism</strong> — marina-specific IEC 60309 socket outlets
                typically incorporate a locking collar that prevents the plug from being
                accidentally disconnected by a wave or the boat's movement. This feature is not
                required by the standard but is strongly recommended for marina use.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-requirements',
    heading: 'RCD Requirements for Marina Installations',
    content: (
      <>
        <p>
          RCD protection is mandatory for every shore power socket outlet in a marina installation
          under Section 709. The aquatic environment makes rapid disconnection of fault currents
          more critical here than in almost any other electrical installation.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 mA individual RCD per socket</strong> — Regulation 709.411.3.3 requires
                each socket outlet to be individually protected by a 30 mA RCD. A single RCD
                protecting multiple berths is not acceptable under Section 709, as a fault at one
                berth must not disconnect other berths.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A RCDs</strong> — boats with electronic equipment on board
                (inverter-chargers, engine management, electronic instrumentation) can produce
                pulsating DC residual currents that Type AC RCDs cannot detect. Type A RCDs detect
                both sinusoidal and pulsating DC residual currents. All marina installations should
                use Type A RCDs as standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnection time</strong> — RCDs must operate within the time limits
                specified in BS 7671 Table 41.1. For 30 mA RCDs protecting socket outlet circuits,
                the maximum disconnection time at 5× IΔn (150 mA) is 40 ms. Annual RCD testing must
                verify these operating times using a calibrated RCD tester.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing Arrangements at Marinas',
    content: (
      <>
        <p>
          Earthing at marinas is complex and presents unique challenges not found in other
          installations. The interaction between the shore earth, the water, galvanic currents, and
          protective earth conductors on individual boats requires careful engineering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT vs. TN systems</strong> — many marinas are TT earthed, particularly where
                the distribution network does not provide a reliable PME (protective multiple
                earthing) earth at the marina origin. TT earthing requires earth electrode
                resistance testing at commissioning and at every annual inspection. The earth
                electrode must be positioned to minimise the risk of step voltages in areas
                accessible to marina users.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME prohibition</strong> — Section 709 prohibits the use of PME (TN-C-S)
                earthing for shore power socket outlets at marinas. This is because the PME combined
                neutral-earth conductor, if broken, can result in dangerous voltages on metalwork
                accessible to users in or near the water. A local TT earth arrangement or an
                isolating transformer must be used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structural metalwork bonding</strong> — all metallic structural elements of
                the marina — steel pontoon frames, handrails, ladders, berthing cleats — must be
                assessed for bonding requirements. Where metalwork is accessible to persons who may
                simultaneously contact the water, bonding is required to equalise potentials and
                prevent electric shock.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Marina Inspection and Certification',
    content: (
      <>
        <p>
          Marina electrical work is a specialist area with significant life-safety implications.
          Electricians who develop expertise in Section 709 installations can build valuable
          relationships with marina operators, who need qualified annual inspections and ongoing
          maintenance support.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete marina inspection reports berth-by-berth on your phone. Record RCD
                  test results, earth leakage monitor test results, and earth electrode resistance
                  measurements in the schedule of test results. Generate the PDF report before
                  leaving the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Annual Contracts with Marina Operators
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Annual inspection is the recommended interval for marina installations. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to offer multi-year maintenance packages to marina operators, covering annual
                  inspection, RCD testing, and ELM system testing. A marina with 50+ berths
                  represents a substantial recurring revenue opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Marina inspection work made simple with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, test result recording, and instant PDF export. Ideal for annual marina and pontoon inspections. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MarinaMooringElectricalPage() {
  return (
    <GuideTemplate
      title="Marina & Mooring Electrical Installation UK | BS 7671 Section 709"
      description="Complete guide to marina and mooring electrical installations under BS 7671 Section 709. Shore power connections, galvanic corrosion, earth leakage monitoring, IEC 60309 CEE connectors, RCD requirements, and annual inspection obligations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Installation"
      badgeIcon={Anchor}
      heroTitle={
        <>
          Marina & Mooring Electrical Installation UK:{' '}
          <span className="text-yellow-400">BS 7671 Section 709</span>
        </>
      }
      heroSubtitle="Everything electricians and marina operators need to know about shore power electrical installations — BS 7671 Section 709 requirements, galvanic corrosion protection, earth leakage monitoring, IEC 60309 connectors, 30 mA RCD protection, and annual inspection obligations."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Marina Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Marina EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site inspection reporting, RCD and ELM test entry, and instant PDF export. Perfect for annual marina inspections. 7-day free trial."
    />
  );
}
