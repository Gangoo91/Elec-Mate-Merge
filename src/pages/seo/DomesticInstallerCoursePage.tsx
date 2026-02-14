import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Home,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Domestic Installer Course | Part P Certification';
const PAGE_DESCRIPTION =
  'Complete Part P domestic installer training for UK electricians. Building regulations, notifiable work, competent person schemes, domestic wiring, consumer units, special locations, testing and certification. 12 modules with video content, quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Domestic Installer', href: '/training/domestic-installer' },
];

const tocItems = [
  { id: 'why-domestic-installer', label: 'Why Domestic Installer Training Matters' },
  { id: 'part-p-overview', label: 'Part P Building Regulations' },
  { id: 'notifiable-work', label: 'Notifiable Work' },
  { id: 'competent-person-schemes', label: 'Competent Person Schemes' },
  { id: 'domestic-wiring', label: 'Domestic Wiring Standards' },
  { id: 'consumer-units', label: 'Consumer Unit Regulations' },
  { id: 'special-locations', label: 'Special Locations' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Part P of the Building Regulations (England and Wales) requires that electrical installation work in dwellings is designed, installed, inspected, and tested by competent persons — and that certain types of work are notified to the local authority building control.',
  'Notifiable work includes all new circuits, consumer unit replacements, work in special locations (bathrooms, swimming pools), and any additions or alterations to circuits in special locations — non-notifiable work includes like-for-like replacements and minor additions outside special locations.',
  'Competent Person Schemes (NICEIC, NAPIT, ELECSA, STROMA, BRE) allow registered electricians to self-certify their own work without involving building control, saving time and money for both the electrician and the homeowner.',
  'Consumer unit replacements became notifiable work in 2016 and must comply with BS 7671:2018+A2:2022, including the use of metal consumer units (or non-combustible enclosures) per Amendment 3 to Part P.',
  'Special locations defined in BS 7671 include bathrooms (Section 701), swimming pools (Section 702), and locations containing a sauna heater (Section 703) — each has specific requirements for IP ratings, zones, and supplementary equipotential bonding.',
];

const faqs = [
  {
    question: 'What is Part P of the Building Regulations?',
    answer:
      'Part P (Electrical Safety — Dwellings) is a section of the Building Regulations 2010 (as amended) for England and Wales. It requires that electrical installation work in dwellings is designed, installed, inspected, and tested so as to provide reasonable protection against electric shock and fire. Part P applies to all dwellings including houses, flats, maisonettes, bedsits, and the common parts of shared accommodation. Scotland has a different regulatory framework (Building Standards) and Northern Ireland has its own building regulations. Part P works alongside BS 7671 — the wiring regulations provide the technical standard, while Part P provides the legal framework for enforcement and notification.',
  },
  {
    question: 'What electrical work is notifiable under Part P?',
    answer:
      'Notifiable work is work that must be reported to the local authority building control (or self-certified by a registered competent person). The following work is notifiable: installing a new circuit (including rewires), replacing a consumer unit or distribution board, any work in a special location (bathroom, swimming pool, sauna room) including adding a light fitting or socket outlet, any addition or alteration to an existing circuit in a special location, and installing outdoor wiring that is not supplied from an existing circuit via a fused connection unit. Non-notifiable work includes: replacing existing accessories (socket outlets, switches, light fittings) on a like-for-like basis, adding fused spurs from ring circuits or lighting circuits (outside special locations), and replacing a damaged cable section.',
  },
  {
    question: 'How do I join a Competent Person Scheme?',
    answer:
      'To join a Competent Person Scheme such as NICEIC, NAPIT, or ELECSA, you typically need: a Level 3 qualification in electrical installation (City & Guilds 2365, 2357, or NVQ Level 3), a current BS 7671 qualification (18th Edition), an inspection and testing qualification (City & Guilds 2391 or 2394/2395), public liability insurance (typically £2 million minimum), appropriate test equipment calibrated within the last 12 months, and evidence of ongoing CPD. The scheme body will carry out an initial assessment of your competence, including an interview and inspection of your recent work. Annual membership fees typically range from £300 to £600 depending on the scheme and membership tier. Once registered, your work is subject to periodic sample assessment.',
  },
  {
    question: 'What happens if I carry out notifiable work without notifying?',
    answer:
      'If notifiable electrical work is carried out without being notified to building control (either through the local authority or by self-certification via a Competent Person Scheme), the work is non-compliant with the Building Regulations. The local authority can issue an enforcement notice requiring the homeowner to have the work inspected and tested by an approved inspector, which may involve opening up completed work for inspection. The homeowner (not the electrician) is legally responsible for compliance, which creates problems when they try to sell the property — conveyancing solicitors routinely check for Part P compliance certificates and the absence of one can delay or prevent a sale. The homeowner may need to obtain a regularisation certificate from building control (which can cost £200 to £500+) or instruct an electrician to inspect and test the work.',
  },
  {
    question: 'Do I need different insurance for domestic electrical work?',
    answer:
      'You need public liability insurance that specifically covers electrical installation work in domestic properties. Most insurers offering electrician policies include domestic work as standard. The minimum cover required by competent person schemes is typically £2 million, although £5 million is increasingly recommended and some commercial clients require £10 million. If you employ staff, you will also need employers liability insurance (minimum £5 million, which is a legal requirement). Professional indemnity insurance is also recommended, as it covers claims arising from negligent advice or faulty design. Always check that your policy covers the specific types of work you undertake — some policies exclude work on certain special installations or above certain values.',
  },
  {
    question: 'What consumer unit regulations have changed recently?',
    answer:
      'The most significant recent change was the amendment to Approved Document P in 2016 that made consumer unit replacements notifiable work. This means any replacement of a consumer unit (even a like-for-like swap) must be notified to building control or self-certified through a Competent Person Scheme. Additionally, Amendment 3 to the Building Regulations introduced a requirement for consumer units in domestic premises to be enclosed in a non-combustible enclosure — which in practice means using a metal consumer unit (most new units are metal as standard). BS 7671:2018+A2:2022 further clarified requirements for AFDD (Arc Fault Detection Device) protection, which Regulation 421.1.7 recommends for certain domestic circuits, particularly in higher-risk premises such as HMOs, care homes, and properties with thatched roofs.',
  },
];

const modules = [
  {
    title: 'Part P Building Regulations',
    description:
      'The scope and requirements of Part P (Electrical Safety — Dwellings). Approved Document P, the role of building control, the history and purpose of Part P, and how it interacts with BS 7671.',
  },
  {
    title: 'Notifiable vs Non-Notifiable Work',
    description:
      'Detailed guide to which work requires notification and which does not. New circuits, consumer unit replacements, special locations, additions and alterations, outdoor wiring, and like-for-like replacements.',
  },
  {
    title: 'Competent Person Schemes',
    description:
      'Overview of NICEIC, NAPIT, ELECSA, STROMA, and BRE schemes. Entry requirements, assessment process, membership fees, self-certification process, and ongoing obligations.',
  },
  {
    title: 'Domestic Circuit Design',
    description:
      'Ring circuits, radial circuits, lighting circuits, cooker circuits, and dedicated appliance circuits. Maximum demand calculations, diversity factors, and circuit selection for modern domestic properties.',
  },
  {
    title: 'Consumer Unit Selection and Installation',
    description:
      'Metal consumer unit requirements, split-load boards, RCD and RCBO selection, AFDD recommendations, circuit labelling, and the BS 7671 requirements for consumer unit installations.',
  },
  {
    title: 'Cable Selection and Installation Methods',
    description:
      'Cable sizing for domestic circuits, correction factors (grouping, thermal insulation, ambient temperature), installation methods (clipped direct, in conduit, in trunking, within thermal insulation), and voltage drop verification.',
  },
  {
    title: 'Special Locations — Bathrooms (Section 701)',
    description:
      'Bathroom zones 0, 1, 2, and outside zones. IP rating requirements for each zone, permitted equipment, supplementary equipotential bonding, SELV requirements, and electric shower installations.',
  },
  {
    title: 'Special Locations — Other Areas',
    description:
      'Swimming pools (Section 702), saunas (Section 703), construction sites (Section 704), and other special locations. Zone definitions, specific requirements, and common installation scenarios.',
  },
  {
    title: 'Earthing and Bonding in Domestic Properties',
    description:
      'Main earthing arrangements (TN-S, TN-C-S, TT), main protective bonding conductors, supplementary equipotential bonding, earth electrode testing, and common earthing defects found in domestic inspections.',
  },
  {
    title: 'Inspection and Testing for Domestic Work',
    description:
      'The full BS 7671 testing sequence applied to domestic installations. Continuity testing, insulation resistance, polarity, earth fault loop impedance, RCD testing, and prospective fault current.',
  },
  {
    title: 'Certification and Documentation',
    description:
      'Electrical Installation Certificates (EIC), Minor Works Certificates, EICR for existing installations, schedule of test results, schedule of inspections, and building control notification procedures.',
  },
  {
    title: 'Common Domestic Installation Scenarios',
    description:
      'Consumer unit upgrades, kitchen rewires, bathroom electrical installations, garden and outdoor wiring, electric vehicle charger circuits, smart home wiring, and solar PV integration.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any Part P or domestic wiring question in plain English. Get instant answers on notifiable work, consumer unit regulations, bathroom zones, and certification requirements.',
  },
  {
    icon: Home,
    title: 'Video Content',
    description:
      'Step-by-step video demonstrations of consumer unit installations, bathroom wiring, circuit testing, and certification completion. Watch on any device, any time.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Scenario-based questions after every module. Determine if work is notifiable, select correct protective devices, identify bathroom zones, and complete certificate entries.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised schedule across all twelve modules. Daily progress tracking and automated study reminders.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering Part P requirements, notifiable work definitions, bathroom zones, consumer unit regulations, and certification types.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length mock examinations across all twelve modules. Instant marking, detailed explanations for every answer, and a readiness score that tracks your progress.',
  },
];

const sections = [
  {
    id: 'why-domestic-installer',
    heading: 'Why Domestic Installer Training Matters',
    content: (
      <>
        <p>
          Domestic electrical work represents the largest segment of the UK electrical installation
          market. From consumer unit replacements and kitchen rewires to bathroom installations and{' '}
          <SEOInternalLink href="/training/ev-charger-installation">
            EV charger circuits
          </SEOInternalLink>
          , the demand for qualified domestic installers is consistent and growing.
        </p>
        <p>
          Understanding Part P of the Building Regulations is essential for any electrician working
          in dwellings. Part P governs which work must be notified to building control, what
          competence is required, and what documentation must be provided. Getting it wrong can
          result in enforcement action, invalidated home insurance, and serious problems for
          homeowners trying to sell their property.
        </p>
        <p>
          This comprehensive Elec-Mate course covers everything from Part P basics through to
          advanced domestic wiring scenarios. Whether you are an apprentice studying for your
          qualifications, a newly qualified electrician preparing to join a competent person scheme,
          or an experienced electrician refreshing your knowledge of the latest regulations, this
          course provides the detailed, practical knowledge you need.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-overview',
    heading: 'Part P Building Regulations',
    content: (
      <>
        <p>
          Part P (Electrical Safety — Dwellings) was introduced in 2005 to address the high number
          of domestic electrical fires and accidents caused by poor-quality electrical work. It
          forms part of the Building Regulations 2010 (as amended) for England and Wales and places
          a legal requirement on anyone carrying out electrical installation work in dwellings.
        </p>
        <p>
          The core requirement of Part P is that electrical installation work must be designed,
          installed, inspected, and tested in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink> (the
          IET Wiring Regulations). This means the work must provide reasonable protection against
          fire caused by the electrical installation and against electric shock to persons and
          livestock.
        </p>
        <p>
          Part P applies to all types of dwelling: houses, flats, maisonettes, bedsits, and the
          common parts of blocks of flats and sheltered housing. It also applies to electrical work
          in garden buildings (sheds, outbuildings) and conservatories if they are associated with a
          dwelling. It does not apply to commercial premises, industrial buildings, or common areas
          of commercial developments.
        </p>
        <p>
          Scotland does not use Part P — instead, electrical work in Scottish dwellings is governed
          by the Building (Scotland) Regulations 2004 and the associated Technical Handbooks.
          Northern Ireland has its own building regulations. The Elec-Mate course focuses primarily
          on England and Wales but highlights key differences for other regions.
        </p>
      </>
    ),
  },
  {
    id: 'notifiable-work',
    heading: 'Notifiable Work',
    content: (
      <>
        <p>
          The concept of notifiable work is central to Part P. Certain types of electrical work in
          dwellings must be notified to the local authority building control body before or after
          the work is carried out. This can be done either by applying directly to building control
          (which involves an inspection fee and a visit by a building control officer) or by
          self-certifying through a Competent Person Scheme.
        </p>
        <p>
          <strong>Notifiable work includes:</strong> installing a new circuit (including full or
          partial rewires), replacing a consumer unit or distribution board, any electrical work in
          a special location defined in{' '}
          <SEOInternalLink href="/guides/bathroom-electrical-regulations">
            BS 7671 Section 701
          </SEOInternalLink>{' '}
          (bathrooms), Section 702 (swimming pools), or Section 703 (saunas), any addition or
          alteration to an existing circuit in a special location, and installing outdoor wiring
          that is not supplied from an existing circuit via a fused connection unit.
        </p>
        <p>
          <strong>Non-notifiable work includes:</strong> replacing existing accessories (socket
          outlets, light switches, ceiling roses, light fittings) on a like-for-like basis,
          replacing damaged cable sections, adding a fused spur from a ring circuit or radial
          circuit (outside special locations), adding a lighting point to an existing circuit
          (outside special locations), and installing equipment with a rating up to 50V AC or 120V
          DC.
        </p>
        <SEOAppBridge
          title="Digital certificates for all domestic work"
          description="Elec-Mate provides digital EIC, Minor Works, and EICR certificates for all your domestic installations. Auto-validated test results, observation code suggestions, and instant PDF export. Building control notification guidance included."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'competent-person-schemes',
    heading: 'Competent Person Schemes',
    content: (
      <>
        <p>
          Competent Person Schemes are the standard route for electricians to self-certify their
          domestic electrical work without needing to involve the local authority building control
          body. Registration with a scheme saves time, reduces costs for homeowners, and
          demonstrates professional competence.
        </p>
        <p>
          The main schemes for domestic electrical work are: <strong>NICEIC</strong> (National
          Inspection Council for Electrical Installation Contracting) — the largest and most
          established scheme, <strong>NAPIT</strong> (National Association of Professional
          Inspectors and Testers), <strong>ELECSA</strong> (Electrical Self-Assessment),{' '}
          <strong>STROMA</strong>, and <strong>BRE</strong> (Building Research Establishment). All
          operate under government authorisation and are listed in Schedule 3 of the Building
          Regulations.
        </p>
        <p>
          When registered with a scheme, you can self-certify notifiable work by completing the
          appropriate certificate (EIC, Minor Works, or EICR), submitting the notification through
          the scheme's portal, and providing the certificate to the homeowner. The scheme body
          issues a Building Regulations compliance certificate on your behalf, which is registered
          with the local authority.
        </p>
        <p>
          Membership requirements typically include: Level 3 electrical qualification, current{' '}
          <SEOInternalLink href="/training/18th-edition-course">
            BS 7671 (18th Edition) certificate
          </SEOInternalLink>
          , inspection and testing qualification (
          <SEOInternalLink href="/training/2391-course">City & Guilds 2391</SEOInternalLink> or
          equivalent), public liability insurance, calibrated test equipment, and evidence of CPD.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-wiring',
    heading: 'Domestic Wiring Standards',
    content: (
      <>
        <p>
          Domestic electrical installations must comply with BS 7671:2018+A2:2022 (the 18th Edition
          of the IET Wiring Regulations). While the fundamental principles are the same as any
          electrical installation, domestic properties have specific design considerations and
          regulatory requirements.
        </p>
        <p>
          A modern domestic installation typically includes: lighting circuits (one per floor, 6A
          MCB or RCBO), ring circuits for socket outlets (32A), dedicated radial circuits for
          high-power appliances (cooker, electric shower, immersion heater), a dedicated circuit for{' '}
          <SEOInternalLink href="/training/ev-charger-installation">
            electric vehicle charging
          </SEOInternalLink>
          , and potentially circuits for{' '}
          <SEOInternalLink href="/training/fire-alarm-systems">fire alarm systems</SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/training/renewable-energy">
            solar PV or battery storage
          </SEOInternalLink>
          .
        </p>
        <p>
          Circuit design must account for maximum demand using appropriate diversity factors from BS
          7671 Table 1C or the On-Site Guide. This determines the total expected load and helps
          select the correct incoming supply rating. For most domestic properties, a 60A or 80A
          single-phase supply is standard, though larger properties or those with high-power
          appliances may require a 100A supply.
        </p>
        <p>
          {' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">Cable sizing</SEOInternalLink> must
          account for the installation method (clipped direct, in conduit, within thermal
          insulation), ambient temperature, grouping with other cables, and voltage drop. The
          correction factors can significantly affect the required cable size, particularly for
          cables run within thermal insulation in loft spaces — a very common scenario in domestic
          work.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-units',
    heading: 'Consumer Unit Regulations',
    content: (
      <>
        <p>
          Consumer unit replacement is one of the most common domestic electrical jobs, and it
          became notifiable work in 2016. Understanding the current{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">
            consumer unit regulations
          </SEOInternalLink>{' '}
          is essential for every domestic installer.
        </p>
        <p>
          <strong>Non-combustible enclosure:</strong> Amendment 3 to Approved Document B (Fire
          Safety) introduced a requirement for consumer units in domestic premises to be enclosed in
          a non-combustible enclosure. In practice, this means using a metal consumer unit, which is
          now the industry standard for new installations and replacements.
        </p>
        <p>
          <strong>RCD protection:</strong> BS 7671 requires that all circuits in a domestic property
          have RCD protection with a rated residual operating current not exceeding 30 mA. The most
          common arrangement is to use RCBOs (combined MCB and RCD) for each circuit, providing
          individual circuit protection without the risk of a single RCD trip disconnecting multiple
          circuits.
        </p>
        <p>
          <strong>AFDD (Arc Fault Detection Devices):</strong> Regulation 421.1.7 of BS 7671
          recommends the use of AFDDs for final circuits supplying socket outlets with a rated
          current up to 32A in certain domestic premises, including HMOs, care homes, student
          accommodation, and properties with thatched roofs. While currently a recommendation rather
          than a requirement, AFDDs are expected to become mandatory in future amendments.
        </p>
        <p>
          <strong>Surge protection:</strong> Regulation 443.4 requires a risk assessment for surge
          protection. If the consequence of an overvoltage includes risk to human life, risk to
          public or cultural heritage, or risk to commercial or industrial activity, SPDs (Surge
          Protection Devices) must be fitted. In practice, SPDs are increasingly fitted as standard
          in new domestic consumer units.
        </p>
      </>
    ),
  },
  {
    id: 'special-locations',
    heading: 'Special Locations',
    content: (
      <>
        <p>
          BS 7671 defines several special locations that have additional requirements beyond the
          general rules. For domestic installers, bathrooms (Section 701) are by far the most
          commonly encountered special location.
        </p>
        <p>
          <strong>Bathrooms (Section 701)</strong> are divided into zones based on proximity to the
          bath or shower. Zone 0 is inside the bath or shower tray itself — only SELV (Separated
          Extra-Low Voltage) at 12V maximum is permitted, with equipment rated at least IPX7 (water
          immersion). Zone 1 extends above the bath or shower to a height of 2.25 metres from the
          floor — equipment must be rated at least IPX4 (splash-proof) and only SELV or equipment
          specifically designed for the zone is permitted. Zone 2 extends 0.6 metres horizontally
          from the outer edge of Zone 1 — equipment must be rated at least IPX4.
        </p>
        <p>
          Outside the zones (the remainder of the bathroom), standard equipment may be used but
          socket outlets are not permitted unless they are SELV or shaver sockets complying with BS
          EN 61558-2-5. Supplementary equipotential bonding of all extraneous-conductive-parts
          (metal pipes, metal baths) and exposed-conductive-parts is required unless the entire
          installation is protected by 30 mA RCDs and all circuits meet the requirements of
          Regulation 701.415.2.
        </p>
        <p>
          All electrical work in a bathroom is notifiable under Part P, regardless of whether it is
          a new circuit or an alteration to an existing circuit. Even fitting a new light fitting in
          a bathroom is notifiable work.
        </p>
        <SEOAppBridge
          title="46+ structured courses covering every aspect of domestic installation"
          description="Elec-Mate provides 46+ structured courses including domestic installation, 18th Edition BS 7671, inspection and testing, EV charging, solar PV, and fire alarm systems. Video content, interactive quizzes, flashcards, mock exams, and an AI tutor — all for one subscription."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/ev-charger-installation',
    title: 'EV Charger Installation Course',
    description: 'EV charger installation is notifiable domestic work requiring Part P compliance.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description: 'Domestic fire detection under BS 5839-6 — grades and categories for dwellings.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations Guide',
    description:
      'Detailed guide to metal consumer unit requirements, RCD selection, and AFDD recommendations.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue professional Electrical Installation Certificates for all domestic work.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations that form the technical standard behind Part P compliance.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/renewable-energy',
    title: 'Renewable Energy Course',
    description: 'Solar PV and battery storage installations in domestic properties.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Domestic Installer Course — Part P Certification',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Intermediate',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT20H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DomesticInstallerCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-03-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Domestic Installation Training"
      badgeIcon={Home}
      heroTitle={
        <>
          Domestic Installer Course: <span className="text-yellow-400">Part P Certification</span>
        </>
      }
      heroSubtitle="Master domestic electrical installation with comprehensive Part P training. Building regulations, notifiable work, competent person schemes, consumer units, special locations, and certification. 12 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={20}
      courseDuration="20 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 3 electrical qualification or equivalent experience recommended"
      courseModules={12}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios"
      courseWhoIsItFor="Newly qualified electricians preparing to join a competent person scheme, apprentices studying for Level 3, experienced electricians refreshing their knowledge of Part P, and commercial electricians moving into domestic work"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to master domestic electrical installation?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 12 structured modules, interactive quizzes, video content, and an AI tutor for any Part P or domestic wiring question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/domestic-installer"
    />
  );
}
