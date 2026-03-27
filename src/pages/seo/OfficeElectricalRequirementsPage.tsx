import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Office Electrical Requirements', href: '/office-electrical-requirements' },
];

const tocItems = [
  { id: 'open-plan-distribution', label: 'Open Plan Office Power Distribution' },
  { id: 'floor-boxes-trunking', label: 'Floor Boxes and Perimeter Trunking' },
  { id: 'server-room-power', label: 'Server Room Power Requirements' },
  { id: 'pat-testing', label: 'PAT Testing Obligations' },
  { id: 'emergency-lighting', label: 'Emergency Lighting — BS 5266' },
  { id: 'eicr-commercial', label: 'EICR Frequency for Commercial Premises' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial office fit-outs are governed by BS 7671:2018+A3:2024 for electrical installation, BS 5266-1:2016 for emergency lighting, and the Workplace (Health, Safety and Welfare) Regulations 1992 for general workplace standards. Building Regulations Part L applies for lighting energy efficiency.',
  'Open plan offices require careful power distribution planning: floor boxes, dado trunking, and overhead trunking serve different desk layouts and flexibility requirements. Floor box positioning should be agreed with the space planner before installation.',
  'PAT testing (portable appliance testing) is not a legal requirement in itself, but employers have a duty under the Electricity at Work Regulations 1989 to maintain electrical equipment in safe condition. PAT testing is the recognised method for demonstrating compliance with this duty.',
  'Emergency lighting must be provided in all escape routes, open plan areas exceeding 60m\u00b2, and toilet facilities for disabled persons per BS 5266-1:2016. Self-contained emergency luminaires must be tested monthly (flick test) and annually (full duration discharge test).',
  'Commercial premises — including offices — should have an EICR carried out every five years or at change of occupancy. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require EICRs for rented commercial property on a similar basis.',
];

const faqs = [
  {
    question: 'What electrical standards apply to office fit-out projects?',
    answer:
      'Office electrical fit-outs must comply with BS 7671:2018+A3:2024 (the Wiring Regulations) for all fixed electrical installation work. In England, Building Regulations Part P applies to electrical work in domestic dwellings, but commercial offices are governed instead by the Electricity at Work Regulations 1989, which requires all electrical systems to be constructed, maintained, and operated safely. Building Regulations Part B (fire safety), Part L (energy efficiency of fixed building services), and Part M (access) also apply. Emergency lighting must meet BS 5266-1:2016. Structured cabling for data networks follows BS EN 50174 and the TIA/EIA 568 standards.',
  },
  {
    question: 'How many power outlets does an office workstation need?',
    answer:
      'There is no fixed regulatory number, but practical guidance suggests a minimum of two double sockets (four outlets) per workstation for desktop computer, monitor, telephone charger, and a spare. Hot-desking areas benefit from additional USB charging ports. Modern open-plan offices typically plan for one floor box or dado trunking section per linear metre of desk run, with each section containing one double socket and one data outlet. For sit-stand desks with motorised frames, a dedicated socket for the desk drive motor is also required. Always consult with the IT and facilities teams before finalising socket counts.',
  },
  {
    question: 'Is PAT testing a legal requirement for offices?',
    answer:
      'PAT testing is not mandated by any specific law. However, the Electricity at Work Regulations 1989 (Regulation 4) requires all electrical systems to be maintained in a condition that prevents danger, so far as is reasonably practicable. PAT testing is the standard evidence-based approach for demonstrating compliance. The Health and Safety Executive (HSE) recommends PAT testing for portable appliances in offices, with frequency based on risk — a desktop computer in a low-risk office may only need testing every four years, while a handheld power tool in a workshop would be tested every three months. Records of tests should be kept as evidence of the maintenance regime.',
  },
  {
    question: 'What is the required testing frequency for emergency lighting in offices?',
    answer:
      'BS 5266-1:2016 specifies three levels of testing: (1) Monthly flick test — briefly activate emergency mode and confirm all luminaires illuminate. Duration is one to two seconds, insufficient to discharge batteries significantly. (2) Six-monthly rated duration test — in premises with annual duration luminaires, a six-month partial test is acceptable. (3) Annual rated duration test — all emergency luminaires must be tested for their full rated duration (typically three hours for standard emergency lighting) once per year. The luminaire must reach its rated illuminance within five seconds for high-risk areas. All test results must be recorded in a log book. A responsible person must be appointed to manage the test regime.',
  },
  {
    question: 'How often does a commercial office need an EICR?',
    answer:
      'BS 7671 and the IET Guidance Note 3 recommend EICRs for offices and commercial premises every five years or at change of occupancy, whichever is sooner. Where the occupier changes and no recent EICR is available, an EICR should be obtained before the new occupier takes possession. For licensed premises (licensed for alcohol, entertainment, or gambling), local authority or licensing authority conditions may specify a shorter frequency. EICRs in commercial premises follow the same format as domestic EICRs and must be issued by a competent electrician.',
  },
  {
    question: 'What server room power requirements should I specify for an office?',
    answer:
      'A server room or comms room power design should be agreed with the IT team and structured cabling installer before electrical work begins. Typical requirements include: one or more dedicated ring mains or radial circuits for server racks (typically 32A per rack, 3-phase for larger rooms), a UPS (uninterruptible power supply) with sufficient VA rating to bridge a five to fifteen minute power outage, a separate single-phase supply for air conditioning, a dedicated consumer unit or DB for the server room, cable management with sufficient space for future additions, and environmental monitoring for temperature, humidity, and flooding. All server room work must comply with BS 7671 and the data centre industry best practices — typically Uptime Institute Tier standards.',
  },
  {
    question: 'What is the Workplace (Health, Safety and Welfare) Regulations 1992?',
    answer:
      'The Workplace (Health, Safety and Welfare) Regulations 1992 set minimum standards for working environments in UK workplaces, including offices. Electrical requirements relevant to the regulations include: adequate lighting (natural or artificial, with emergency lighting to cover failure of artificial lighting), suitable power for the heating, ventilation and air conditioning systems, and safe positioning of all electrical equipment. The regulations require employers to maintain the workplace and its equipment in efficient working order and good repair. For electrical systems, this means regular inspection and testing, prompt repair of defects, and documented maintenance. Compliance evidence includes EICRs, PAT test records, and emergency lighting test logs.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Electrical inspection obligations for landlords of rented properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-installation-conduit',
    title: 'Electrical Installation Conduit Guide',
    description: 'Steel vs PVC conduit, fill calculations, IP ratings and fire stopping for commercial installations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/external-lighting-installation',
    title: 'External Lighting Installation',
    description: 'Security and commercial external lighting, IP ratings, PIR wiring, and BS 7671 outdoor requirements.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete commercial EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'open-plan-distribution',
    heading: 'Open Plan Office Power Distribution',
    content: (
      <>
        <p>
          Modern open-plan offices demand flexible, high-density power and data distribution.
          Unlike domestic installations where circuits are relatively fixed, commercial office
          fit-outs must accommodate changes in desk layout, occupancy density, and technology
          as the business evolves. Planning the electrical distribution scheme before installation
          is essential to avoid costly remedial work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Distribution Strategies</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Perimeter distribution:</strong> Dado trunking or skirting trunking
                around the perimeter walls feeds desks near walls. Simple and cost-effective
                for cellular or semi-open layouts. Not suitable for central island desks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underfloor distribution:</strong> Raised access floors allow power
                and data cables to be routed under the floor to floor boxes positioned anywhere
                in the space. Maximum flexibility — outlet positions can be changed by moving
                floor boxes. Higher initial cost due to raised floor system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead busbar trunking:</strong> Power distributed via busbar trunking
                suspended from the ceiling structure. Tap-off boxes can be added or moved
                to suit desk layout changes. Used in large open floors, particularly
                industrial office environments.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All distribution schemes must comply with BS 7671:2018+A3:2024. Circuits feeding
          office socket outlets are typically 32A ring mains or 20A radials, each protecting
          a defined floor area. The circuit schedule should be documented on an{' '}
          <SEOInternalLink href="/tools/eic-certificate" label="Electrical Installation Certificate" />{' '}
          on completion.
        </p>
      </>
    ),
  },
  {
    id: 'floor-boxes-trunking',
    heading: 'Floor Boxes and Perimeter Trunking',
    content: (
      <>
        <p>
          Floor boxes and dado trunking are the two most common power and data distribution
          systems in UK commercial offices. Each suits different space configurations and
          refurbishment constraints.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Floor Boxes</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Recessed into the floor — either a solid concrete slab with conduit routes
                cast in, or a raised access floor. Floor boxes typically contain two to four
                double sockets plus two to six data outlets. Specify flush-fit lids
                rated for the floor loading category (typically Class B for offices, Class C
                for industrial areas per EN 1433).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Position floor boxes based on the desk layout drawing — typically one box per
                two workstations, at 1,200mm to 1,500mm centres for standard 1,400mm desks.
                Feed from a sub-distribution board (SDB) in a riser or comms room on the floor.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Dado and Skirting Trunking</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Dado trunking mounts at desk height (approximately 900mm to 1,100mm from floor)
                and contains separate compartments for power, data, and sometimes voice circuits.
                Compartment separation maintains segregation between Category 1 (power) and
                Category 2 (data) wiring per BS 7671 Section 528.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Outlets can be spaced at any interval along the trunking. Minimum outlet spacing
                for a busy perimeter run is 1,200mm to ensure desk users can reach power without
                trailing leads. Universal or brand-specific faceplates accept standard MK, Legrand,
                or Hager socket modules.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable segregation:</strong> BS 7671 Section 528 requires power cables
                to be segregated from data cables by a partition, separate trunking compartment,
                or minimum 50mm separation where parallel runs occur. Crossing at right angles
                is acceptable. Failure to segregate may cause interference and is an EICR
                observation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'server-room-power',
    heading: 'Server Room Power Requirements',
    content: (
      <>
        <p>
          The server room or communications room is the electrical heart of any modern office.
          It must have a reliable, resilient, and adequately sized power supply with its own
          dedicated distribution.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated sub-distribution board:</strong> The server room should
                have its own consumer unit or distribution board, fed from the main distribution
                board via a dedicated circuit. This enables isolation of server room power
                without affecting the rest of the office.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS provision:</strong> An uninterruptible power supply (UPS) protects
                critical IT equipment from power interruption and quality issues (voltage sags,
                surges, harmonics). Size the UPS to cover the full server room load at 80%
                capacity for the required runtime. Specify bypass switching for maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooling supply:</strong> Dedicated circuit for precision air
                conditioning units. Cooling typically accounts for 30% to 50% of total
                server room electrical load. Size the cooling circuit independently of
                the IT equipment circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable management:</strong> Overhead cable ladders or under-floor cable
                runs for power and data. Maintain segregation between power and data cables
                per BS 7671 Section 528. Label all circuits clearly at both ends.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pat-testing',
    heading: 'PAT Testing Obligations in Offices',
    content: (
      <>
        <p>
          Portable Appliance Testing (PAT) is the inspection and testing of portable electrical
          equipment to identify defects that could cause electric shock or fire. While PAT
          testing is not directly mandated by law, employers have a legal duty under the
          Electricity at Work Regulations 1989 to maintain electrical equipment in safe condition.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HSE risk-based approach:</strong> The Health and Safety Executive
                recommends that PAT frequency be determined by risk assessment. Low-risk
                environments (offices) with low-use Class II double-insulated equipment
                may only need testing every four years. High-risk environments (construction,
                catering) require testing every three to six months for portable tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection:</strong> Every PAT test should begin with a
                visual check of the plug, cable, and appliance for physical damage, burns,
                ingress of liquid, or signs of overheating. Many defects are found at this
                stage without requiring electrical testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping:</strong> A PAT register recording appliance ID, test
                date, tester name, and pass/fail result is essential evidence of compliance.
                Failed appliances must be quarantined, labelled, and removed from use until
                repaired or disposed of.
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
          Emergency lighting is mandatory in commercial offices under BS 5266-1:2016 (Emergency
          Lighting Part 1: Code of Practice for the Emergency Lighting of Premises) and the
          Regulatory Reform (Fire Safety) Order 2005. It must provide sufficient illumination
          for safe evacuation when the normal lighting fails.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where required:</strong> All escape routes, open areas exceeding 60m\u00b2,
                toilet facilities for disabled persons, areas of high risk (switchrooms,
                plant rooms), and all fire alarm control panels and call points. External routes
                from final exit to place of safety also require emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Illuminance requirements:</strong> Escape routes: minimum 1 lux at
                floor level along the centreline; open areas: minimum 0.5 lux horizontal
                throughout. Anti-panic lighting (open areas) must achieve 0.5 lux within five
                seconds of normal lighting failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration:</strong> Standard installations require a minimum three-hour
                duration. High-risk areas may require longer. The rated duration must be
                demonstrated by annual full-discharge testing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency lighting wiring must be segregated from normal mains wiring and routed
          to maintain circuit integrity in a fire for the duration required. Use mineral-insulated
          or FP200 fire-rated cable for circuits feeding emergency luminaires in escape routes.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-commercial',
    heading: 'EICR Frequency for Commercial Premises',
    content: (
      <>
        <p>
          The Electrical Installation Condition Report (EICR) is the standard periodic inspection
          document for all electrical installations. For commercial offices, the recommended
          and widely accepted maximum interval is five years.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five-year EICR cycle:</strong> BS 7671 and IET Guidance Note 3
                recommend a maximum five-year EICR interval for commercial premises, or
                on change of occupancy whichever is sooner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy:</strong> When a new tenant takes occupation of
                an office, an EICR should be obtained regardless of when the previous one
                was carried out. The new occupier should not rely on records from a previous
                tenant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 and C2 observations:</strong> Danger present (C1) and potentially
                dangerous (C2) observations must be remedied before the EICR can be marked
                as Satisfactory. Landlords and building owners are legally responsible for
                ensuring remedial works are completed promptly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/eicr-certificate" label="EICR Certificate app" />{' '}
          to complete commercial EICRs on site — AI-assisted board scanning, observation
          code lookup, and instant PDF export included.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Office and Commercial Certification',
    content: (
      <>
        <p>
          Commercial office installations require EICs on completion and EICRs on a five-year
          cycle. Elec-Mate provides all the certificate tools needed for commercial electrical
          work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eic-certificate" label="Electrical Installation Certificate" />{' '}
                — generate compliant EICs for office fit-out circuits with full circuit
                schedules and test result records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" />{' '}
                — complete commercial EICRs on site with AI board scanning, C1/C2/C3
                observation code lookup, and instant PDF export for clients.
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

export default function OfficeElectricalRequirementsPage() {
  return (
    <GuideTemplate
      title="Office Electrical Requirements — Commercial Fit-Out, PAT Testing, Emergency Lighting"
      description="Complete guide to office electrical requirements: open plan power distribution, floor boxes, server room power, PAT testing obligations, emergency lighting under BS 5266, and EICR frequency for commercial premises."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Office Electrical Requirements{' '}
          <span className="text-yellow-400">— Commercial Fit-Out Guide</span>
        </>
      }
      heroSubtitle="Open plan distribution, floor boxes, server room power, PAT testing, emergency lighting under BS 5266, Workplace Regulations 1992, and five-year EICR cycles for commercial premises."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Office Electrical Requirements — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Complete commercial EICRs and EICs on your phone"
      ctaSubheading="AI board scanning, observation codes, and instant PDF export — Elec-Mate is built for commercial electricians."
    />
  );
}
