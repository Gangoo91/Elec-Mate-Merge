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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Installations', href: '/guides/specialist-electrical' },
  { label: 'Caravan Park Electrical', href: '/guides/caravan-park-electrical' },
];

const tocItems = [
  { id: 'bs7671-section-708', label: 'BS 7671 Section 708' },
  { id: 'individual-supply-equipment', label: 'Individual Supply Equipment' },
  { id: 'cee-connectors', label: 'IEC 60309 CEE Connectors' },
  { id: 'rcd-requirements', label: 'RCD Requirements' },
  { id: 'socket-outlet-spacing', label: 'Socket Outlet Spacing' },
  { id: 'earthing', label: 'Earthing Considerations' },
  { id: 'metering', label: 'Metering & Submains' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A3:2024 Section 708 is the specific section governing electrical installations in caravan parks and similar locations. Every pitch supply must comply with its requirements.',
  'Each caravan pitch must be supplied through an individual supply equipment assembly incorporating overcurrent protection, 30 mA RCD protection, and a socket outlet to IEC 60309 (CEE form).',
  'RCDs must disconnect within 40 ms at 5× the rated residual operating current. This is a life-safety requirement in the outdoor, damp environment of caravan parks.',
  'Socket outlets must be positioned so the connecting cable from the pitch supply point to the caravan does not exceed 25 m (Regulation 708.553.1.4).',
  'TT earthing is common at caravan parks. The product of the earth electrode resistance and RCD operating current must not exceed 50 V.',
  'The recommended periodic inspection interval for caravan park installations is 1 year (IET Guidance Note 3), reflecting the harsh outdoor environment and seasonal heavy use.',
];

const faqs = [
  {
    question: 'Which BS 7671 section applies to caravan park electrical installations?',
    answer:
      'Section 708 of BS 7671:2018+A3:2024 (Part 7 — Special Installations or Locations) specifically covers electrical installations in caravan parks, camping parks, and similar locations. Section 708 modifies and supplements the general requirements in Parts 1 to 6. Every electrician working on caravan park installations must be familiar with Section 708 and how it interacts with the general wiring regulations.',
  },
  {
    question: 'What type of socket outlets must be used at caravan pitches?',
    answer:
      'Regulation 708.553.1 requires that socket outlets at caravan pitches comply with IEC 60309 (BS EN 60309). These are the blue CEE form industrial connectors rated at 16 A, single-phase, 230 V. They are weatherproof (IP44 minimum) and designed for outdoor use. Standard domestic 13 A BS 1363 socket outlets must not be used as the primary hookup socket at caravan pitches.',
  },
  {
    question: 'What RCD protection is required for caravan park pitches?',
    answer:
      'Each individual pitch supply must incorporate RCD protection with a rated residual operating current (IΔn) not exceeding 30 mA. Type A RCDs are required where electronic equipment in caravans may produce pulsating DC fault currents — which in practice means all new installations. At TT systems, the product of earth electrode resistance and RCD operating current must not exceed 50 V.',
  },
  {
    question: 'How close must the pitch supply point be to the caravan?',
    answer:
      'Regulation 708.553.1.4 states that socket outlets must be positioned so the connecting cable from the pitch supply point to the caravan does not exceed 25 m in length. This limits voltage drop and ensures the caravan is within a safe distance of its supply. Pitch layouts must be designed with this 25 m limit in mind.',
  },
  {
    question: 'What earthing system is used in caravan parks?',
    answer:
      'Caravan parks commonly use TT earthing (where the installation earth is connected to a local earth electrode) because a reliable TN-C-S protective earth is often unavailable at individual rural pitches. Earth electrode resistance must satisfy Section 708.411, and the RCD operating current × earth electrode resistance must not exceed 50 V.',
  },
  {
    question: 'How often should caravan park electrical installations be inspected?',
    answer:
      'IET Guidance Note 3 recommends a maximum periodic inspection interval of 1 year for caravan parks and similar locations. The harsh outdoor environment — moisture, mechanical damage, UV degradation, and seasonal heavy use — means annual inspection is the industry standard. Each inspection should cover the main distribution equipment, submain cables, all pitch supply units, RCD testing, earth electrode testing, and visual inspection of socket outlet enclosures.',
  },
  {
    question: 'What current rating is required for caravan pitch supply sockets?',
    answer:
      'IEC 60309 socket outlets at caravan pitches are typically rated at 16 A single-phase (230 V), providing a nominal 3.68 kW per pitch — sufficient for most leisure caravans. Some premium pitches use 32 A supplies for larger motorhomes. The MCB and supply equipment assembly must be rated to match the socket outlet rating.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/marina-mooring-electrical',
    title: 'Marina & Mooring Electrical (Section 709)',
    description:
      'Shore power connections, galvanic corrosion protection, and RCD requirements for marinas.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/agricultural-electrical-installation',
    title: 'Agricultural Electrical Installation (Section 705)',
    description:
      'BS 7671 Section 705 requirements for farm buildings, livestock areas, and rural sites.',
    icon: Building2,
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
    id: 'bs7671-section-708',
    heading: 'BS 7671 Section 708: Caravan Parks and Similar Locations',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Part 7 addresses special installations and locations that present
          particular hazards or operating conditions not fully covered by the general requirements
          in Parts 1 to 6. Section 708 — Electrical Installations in Caravan Parks, Camping Parks
          and Similar Locations — is the authoritative technical standard for all electricians and
          designers working on caravan park electrical systems in the UK.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope</strong> — Section 708 covers electrical installations for supplying
                electricity to caravans, motorhomes, and other leisure vehicles at caravan parks,
                camping parks, and similar locations. It applies to the fixed installation from the
                origin of supply to (and including) the pitch supply equipment. The internal wiring
                of individual caravans is covered by a separate standard (BS EN 1648).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modifications to general requirements</strong> — Section 708 modifies
                certain general regulations in BS 7671 to reflect the specific hazards of outdoor,
                semi-public installations. Where Section 708 is silent, the general regulations
                apply. Where Section 708 is more onerous, Section 708 takes precedence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk profile</strong> — caravan park installations present elevated risk due
                to outdoor environments with weather exposure, non-expert users connecting and
                disconnecting supplies, high pedestrian traffic near electrical equipment, seasonal
                heavy loading, and proximity of metallic structures (caravan bodies, water pipes)
                that may become energised in fault conditions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians carrying out design, installation, or inspection work at caravan parks should
          hold a current{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 qualification
          </SEOInternalLink>{' '}
          and be familiar with the specific requirements of Part 7. The IET has published
          supplementary guidance in IET Guidance Note 7 (Special Locations).
        </p>
      </>
    ),
  },
  {
    id: 'individual-supply-equipment',
    heading: 'Individual Pitch Supply Equipment',
    content: (
      <>
        <p>
          Each caravan pitch must be supplied through a dedicated individual supply equipment
          assembly. Regulation 708.553.1 sets out the minimum requirements for these assemblies,
          typically housed in a weatherproof enclosure mounted on a post at each pitch.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overcurrent protection</strong> — each pitch supply must incorporate an MCB
                or fuse providing overcurrent protection. The rating is typically 16 A for standard
                pitches, matching the 16 A IEC 60309 socket outlet. The MCB must be accessible to
                enable isolation of the pitch without affecting other pitches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — a 30 mA residual current device must protect each
                pitch supply. The RCD and MCB are typically combined as an RCBO in modern pitch
                supply units, providing both fault current protection and overcurrent protection in
                a single device per pitch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weatherproof enclosure</strong> — the supply equipment assembly must be
                housed in an enclosure with a minimum IP rating of IP44. Enclosures in exposed
                locations may require IP54 or IP65. Enclosures must maintain their IP rating whether
                a plug is inserted or not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> — supply equipment posts must be robust
                enough to withstand accidental vehicle impact. Bollard-style enclosures with
                protective posts are standard on pitches accessible to motorhomes and touring
                caravans.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cee-connectors',
    heading: 'IEC 60309 CEE Connectors (Blue 16 A)',
    content: (
      <>
        <p>
          The IEC 60309 standard (implemented in the UK as BS EN 60309) specifies industrial plugs,
          socket outlets, and couplers for industrial and outdoor use. For caravan park hookups, the
          blue 16 A, single-phase, 230 V, 50 Hz variant (clock position at 6 o'clock) is the
          universal standard across the UK and Europe.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour coding</strong> — CEE connectors are colour-coded by voltage and
                frequency. Blue indicates 200–250 V, 50/60 Hz. Three pins (line, neutral, earth) for
                single-phase, and the 6h clock position for 230 V single-phase prevents incorrect
                connection between different voltage systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating</strong> — IEC 60309 socket outlets are available in IP44 and IP67
                ratings. IP44 is the minimum for outdoor caravan park use. A self-closing cover on
                the socket face maintains the IP rating when no plug is inserted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth contact first</strong> — CEE connectors are designed so the earth
                contact engages first when connecting and disengages last when disconnecting. This
                earthing-before-energising sequence is a fundamental safety feature of the IEC 60309
                design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EHU cables</strong> — caravan users connect via a proprietary electric
                hookup (EHU) cable with a CEE plug at one end and an inlet socket at the caravan
                end. These cables must be rated for outdoor use and must not exceed the 25 m maximum
                length specified in Section 708.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-requirements',
    heading: 'RCD Requirements Under Section 708',
    content: (
      <>
        <p>
          Residual current device (RCD) protection is a cornerstone of caravan park electrical
          safety. The outdoor environment, non-expert users, and proximity to earthed metalwork make
          30 mA RCD protection at each pitch a non-negotiable requirement under Section 708.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 mA maximum IΔn</strong> — Regulation 708.411.3.3 requires each pitch
                supply socket outlet be protected by an RCD with a rated residual operating current
                not exceeding 30 mA. This threshold provides protection against fatal electric
                shock: the let-go current for most adults is around 10–15 mA, and a 30 mA RCD limits
                the duration of a shock to prevent cardiac fibrillation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A RCDs</strong> — modern caravans and motorhomes contain electronic
                equipment (battery chargers, inverter-chargers) that can produce pulsating DC
                residual currents. Type AC RCDs do not detect pulsating DC currents. Type A RCDs are
                required where such equipment may be connected — in practice, all new pitch supply
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT systems and earth electrode resistance</strong> — where TT earthing is
                used, the product of the earth electrode resistance (RA) and the RCD rated operating
                current (IΔn) must not exceed 50 V: RA × IΔn ≤ 50 V. With a 30 mA RCD this means the
                earth electrode resistance must not exceed 1667 Ω, though in practice a much lower
                resistance (under 200 Ω) is recommended.
              </span>
            </li>
          </ul>
        </div>
        <p>
          RCDs must be tested at every periodic inspection using a calibrated RCD tester. Test
          records should include the operating time at IΔn (must not exceed 300 ms) and at 5× IΔn
          (must not exceed 40 ms). Results are recorded in the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            EICR schedule of test results
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'socket-outlet-spacing',
    heading: 'Socket Outlet Positioning and the 25 m Rule',
    content: (
      <>
        <p>
          The positioning of pitch supply units is critical both for safety and user convenience.
          Section 708 contains specific requirements on the maximum cable length between the supply
          point and the caravan, which directly governs how supply points must be spaced across the
          park.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>25 m maximum cable run</strong> — Regulation 708.553.1.4 specifies that
                socket outlets must be positioned so the connecting cable from the pitch supply
                point to the caravan does not exceed 25 m. This limit controls voltage drop and
                prevents excessive cable lying across the site creating trip hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One supply point per pitch</strong> — each caravan pitch must have its own
                dedicated supply point. Sharing a supply point between multiple pitches is not
                permitted, as it prevents individual isolation, makes metering impractical, and may
                compromise individual RCD protection requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Height and accessibility</strong> — supply points should be mounted at
                0.5–1.0 m above finished ground level and positioned to avoid obstruction by caravan
                awnings, steps, or stabiliser legs. The socket outlet must be accessible without
                tools.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing Considerations for Caravan Parks',
    content: (
      <>
        <p>
          Earthing at caravan parks is one of the most technically demanding aspects of a Section
          708 installation. The earthing system must reliably limit touch voltages in fault
          conditions, support RCD operation, and remain effective across seasonal variations in
          ground conditions typical of UK sites.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT systems</strong> — many caravan parks are supplied by overhead lines
                where a TN-C-S protective earth is not reliably available at each pitch. TT earthing
                using local earth electrodes is common. Earth electrode resistance must be measured
                during commissioning and at each periodic inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipotential bonding</strong> — all metallic structures in the vicinity of
                pitch supply equipment — fencing, water pipes, drainage channels — must be assessed
                for supplementary equipotential bonding. Where metallic structures are within arm's
                reach of live equipment, bonding is required to prevent dangerous potential
                differences in fault conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seasonal variation</strong> — earth electrode resistance varies with soil
                moisture content. Dry summer conditions can significantly increase earth electrode
                resistance, potentially compromising the RA × IΔn ≤ 50 V requirement. Site owners
                should be advised to irrigate soil around earth electrodes during prolonged dry
                spells, and inspection records should note any seasonal concerns.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metering',
    heading: 'Metering and Submain Distribution',
    content: (
      <>
        <p>
          Larger caravan parks distribute electricity to pitches via a hierarchical system: a main
          incoming supply and metering, submain distribution cables to zone distribution boards, and
          individual pitch supply units. Metering may be provided at individual pitches or
          electricity cost may be included in the pitch fee.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual metering</strong> — where per-pitch metering is provided
                (increasingly common at premium sites), the meter is installed within or adjacent to
                the pitch supply unit. Prepayment meters are popular as they eliminate billing
                complexity. Metering equipment must be weatherproof and suitable for outdoor use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Submain cables</strong> — submain cables between distribution boards and
                pitch supply units must be sized to carry maximum expected load with adequate
                voltage drop performance and fault current capacity. Underground cables must be
                armoured and installed in accordance with BS 7671 requirements for buried cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diversity</strong> — maximum demand calculations must apply diversity. Not
                all pitches will be occupied simultaneously, and caravans rarely run at full
                connected load. The design must ensure that under realistic worst-case loading the
                supply is adequate and voltage drop limits are not exceeded.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Caravan Park Inspection and Certification',
    content: (
      <>
        <p>
          Caravan park electrical work — installation, commissioning, and periodic inspection —
          requires knowledge of Section 708 and experience with outdoor, TT-earthed installations.
          Electricians who specialise in this work can build valuable recurring contracts with park
          operators, who are legally required to have their installations inspected annually.
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
                  to complete inspection reports pitch-by-pitch on your phone. Record RCD test
                  results, earth electrode resistance measurements, and socket outlet observations
                  directly in the schedule of test results. Generate the PDF report before leaving
                  the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Annual Inspection Contracts</h4>
                <p className="text-white text-sm leading-relaxed">
                  The recommended annual inspection interval means repeat business for the
                  electrician. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to offer multi-year maintenance contracts to park operators, building predictable
                  recurring revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Specialist inspection work made simple with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, RCD test recording, and instant PDF export. Ideal for caravan park annual inspections. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CaravanParkElectricalPage() {
  return (
    <GuideTemplate
      title="Caravan Park Electrical Installation UK | BS 7671 Section 708"
      description="Complete guide to caravan park electrical installations under BS 7671 Section 708. CEE connectors, 30 mA RCD requirements, socket outlet spacing, TT earthing, and metering for UK caravan and camping parks."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Installation"
      badgeIcon={Plug}
      heroTitle={
        <>
          Caravan Park Electrical Installation UK:{' '}
          <span className="text-yellow-400">BS 7671 Section 708</span>
        </>
      }
      heroSubtitle="Everything electricians and park operators need to know about caravan park electrical installations — BS 7671 Section 708 requirements, IEC 60309 CEE connectors, 30 mA RCD protection, socket outlet spacing, TT earthing, and annual inspection obligations."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Caravan Park Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Caravan Park EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site inspection reporting, RCD test entry, and instant PDF export. Perfect for annual caravan park inspections. 7-day free trial."
    />
  );
}
