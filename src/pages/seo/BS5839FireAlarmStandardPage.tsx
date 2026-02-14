import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  BookOpen,
  Shield,
  AlertTriangle,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  ShieldCheck,
  Brain,
  Flame,
  Home,
  Building2,
  Bell,
  Camera,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'BS 5839', href: '/guides/bs-5839-fire-alarm-standard' },
];

const tocItems = [
  { id: 'what-is-bs5839', label: 'What Is BS 5839?' },
  { id: 'part-1-commercial', label: 'Part 1: Commercial Premises' },
  { id: 'part-6-domestic', label: 'Part 6: Domestic Properties' },
  { id: 'system-categories', label: 'System Categories Explained' },
  { id: 'system-grades', label: 'System Grades Explained' },
  { id: 'design-installation', label: 'Design and Installation' },
  { id: 'testing-maintenance', label: 'Testing and Maintenance' },
  { id: 'certification', label: 'Fire Alarm Certification' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 5839 is the UK standard for fire detection and fire alarm systems — Part 1 covers commercial and industrial premises, Part 6 covers domestic dwellings.',
  'System categories define what the fire alarm protects: Category L (life protection) with sub-categories L1 to L5, and Category P (property protection) with P1 and P2.',
  'System grades (A to F) define the type of equipment used — from Grade A (full commercial addressable system) to Grade F (battery-only standalone detectors).',
  'Fire alarm systems must be designed, installed, commissioned, and maintained by competent persons, with regular testing at weekly (user), monthly, and annual (professional) intervals.',
  'Elec-Mate includes fire alarm certificate templates, defect code AI for fire alarm observations, and training courses covering BS 5839 requirements.',
];

const faqs = [
  {
    question: 'What is the difference between BS 5839 Part 1 and Part 6?',
    answer:
      'BS 5839-1 covers fire detection and fire alarm systems in non-domestic premises — offices, shops, factories, warehouses, schools, hospitals, hotels, and similar commercial and industrial buildings. It provides detailed guidance on system design, installation, commissioning, and maintenance for complex multi-zone systems. BS 5839-6 covers fire detection and fire alarm systems in domestic dwellings — individual houses, flats, maisonettes, and sheltered housing. Part 6 is simpler in scope because domestic properties are smaller and have different occupancy patterns. However, Part 6 still includes detailed requirements for detector types, siting, grades, and categories. An HMO (House in Multiple Occupation) may need to comply with both Part 1 and Part 6, depending on its size and the requirements set by the local authority or fire service.',
  },
  {
    question: 'What fire alarm grade is required for an HMO?',
    answer:
      'The fire alarm grade required for an HMO depends on the HMO type and the requirements of the local authority housing team. For a smaller HMO (three or four storeys, shared house), a Grade D1 system is commonly required — this uses mains-powered interlinked smoke detectors with integral battery back-up. For a larger HMO or a purpose-built block of flats with high risk factors, the local authority may require a Grade A system (a conventional or addressable panel-based system with dedicated cabling). The specific requirements are set out in the LACORS fire safety guidance for HMOs, which cross-references BS 5839-6 for domestic dwellings and BS 5839-1 for larger or more complex HMOs. Always check with the local authority housing team or the fire and rescue service for the specific requirements for the property you are working on.',
  },
  {
    question: 'How often must a fire alarm system be tested?',
    answer:
      'BS 5839-1 sets out a testing regime with three tiers: weekly user tests, monthly checks, and annual professional inspections. The weekly test involves activating a manual call point to confirm the sounders operate — a different call point should be used each week, rotating through all call points over the year. Monthly checks by a competent person include visual inspection of the panel, checking for faults, and verifying battery condition. The annual professional inspection involves a full test of every detector, call point, sounder, and interface device, plus battery capacity testing, cable checks, and a full system functional test. BS 5839-6 (domestic) recommends weekly testing of smoke alarms using the test button and annual replacement of batteries (or 10-year sealed unit replacement). Professional servicing is recommended annually for Grade A and Grade D systems in HMOs.',
  },
  {
    question: 'Can an electrician install a fire alarm system?',
    answer:
      'Yes, but the electrician must be competent to do so. For domestic Grade D and Grade F systems covered by BS 5839-6, most qualified electricians can design and install the system as part of their general domestic electrical work. The installation of mains-powered interlinked smoke alarms is a common task in domestic rewires and consumer unit changes. For commercial Grade A and Grade B systems covered by BS 5839-1, the work requires specialist fire alarm competence. The designer must have a thorough understanding of BS 5839-1, the fire risk assessment for the building, and the specific requirements of the fire authority. Many electricians obtain additional fire alarm qualifications (such as the FIA Foundation Certificate in Fire Detection and Alarm) to demonstrate their competence. Third-party certification through a scheme such as BAFE SP203-1 is often required by insurers and building control for commercial fire alarm installations.',
  },
  {
    question: 'What certificate is issued for a fire alarm installation?',
    answer:
      'For a new fire alarm installation, the installer should issue a commissioning certificate confirming that the system has been designed, installed, and commissioned in accordance with BS 5839-1 (commercial) or BS 5839-6 (domestic). The certificate should include system drawings, zone plans, detector schedules, and test results. For domestic installations (Grade D smoke alarms as part of an electrical installation), the fire alarm work is typically covered by the Electrical Installation Certificate (EIC) for the overall electrical work, with the fire alarm system noted in the circuit schedule. Elec-Mate includes a dedicated fire alarm certificate template that produces a professional PDF compliant with BS 5839 requirements, separate from the EIC. For periodic testing and maintenance of commercial systems, a service report should be issued after each visit, recording tests carried out, any faults found, and remedial actions taken.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate App',
    description:
      'Create digital fire alarm certificates on your phone with BS 5839 compliance, zone diagrams, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-5266-emergency-lighting-standard',
    title: 'BS 5266 Emergency Lighting',
    description:
      'Complete guide to emergency lighting standards, categories, testing intervals, and certification requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The IET Wiring Regulations covering all electrical installation work including fire alarm wiring.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'EIC, EICR, Minor Works, fire alarm, emergency lighting — which certificate is required for each type of work.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electricity-at-work-regulations',
    title: 'Electricity at Work Regulations',
    description:
      'Employer duties for electrical safety in the workplace, including fire alarm system maintenance obligations.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description:
      'Study BS 5839 Part 1 and Part 6 with structured training modules, diagrams, and mock exam questions.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-bs5839',
    heading: 'What Is BS 5839? The UK Fire Alarm Standard',
    content: (
      <>
        <p>
          BS 5839 is the British Standard for fire detection and fire alarm systems. It provides the
          authoritative guidance on the design, installation, commissioning, and maintenance of fire
          alarm systems in buildings across the UK. The standard is referenced by Building
          Regulations (Approved Document B), the Regulatory Reform (Fire Safety) Order 2005, and
          local authority housing requirements for HMOs.
        </p>
        <p>
          The standard is divided into several parts, but the two parts most relevant to
          electricians are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5839-1</strong> — Fire detection and fire alarm systems for buildings.
                Covers non-domestic premises including offices, shops, factories, hospitals,
                schools, hotels, and other commercial and industrial buildings. This is the
                comprehensive part of the standard, covering complex multi-zone systems with
                addressable panels, aspirating detection, voice alarm, and interface with other
                building systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5839-6</strong> — Fire detection and fire alarm systems for domestic
                premises. Covers individual dwellings, flats, maisonettes, and sheltered housing.
                This part is simpler in scope and covers standalone smoke alarms, interlinked
                mains-powered detectors, and domestic fire alarm panels.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, BS 5839 is essential knowledge. Whether you are installing interlinked
          smoke alarms in a domestic rewire, designing a fire alarm system for an HMO, or
          maintaining a commercial fire alarm panel, the standard defines the rules you must follow.
          Understanding the system categories and grades is the starting point.
        </p>
      </>
    ),
  },
  {
    id: 'part-1-commercial',
    heading: 'BS 5839-1: Fire Alarm Systems for Commercial Premises',
    content: (
      <>
        <p>
          BS 5839-1 is the comprehensive part of the standard, covering fire detection and fire
          alarm systems for non-domestic buildings. It applies to offices, shops, factories,
          warehouses, schools, universities, hospitals, care homes, hotels, leisure centres, and any
          other building that is not a dwelling.
        </p>
        <p>The standard covers every aspect of the fire alarm system lifecycle:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design</strong> — system category selection based on the fire risk
                assessment, detector types and siting, sounder coverage, manual call point
                positioning, zone planning, cable selection and routing, power supply requirements,
                and panel specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation</strong> — cable installation methods, fire-resistant cable
                requirements, segregation from other services, containment systems, connection
                methods, and labelling requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning</strong> — full functional testing of every device, cause and
                effect testing, sounder level measurements, battery drain tests, false alarm
                management, and handover documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance</strong> — weekly user tests, monthly checks, quarterly
                inspections, and annual professional servicing. The standard sets out exactly what
                must be checked at each interval.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A key requirement of BS 5839-1 is that the fire alarm system must be designed by a
          competent fire alarm designer. The design is informed by the fire risk assessment for the
          building, which identifies the fire hazards, the people at risk, and the fire safety
          measures required. The fire alarm system is one of those measures — its category and
          coverage are determined by the level of protection needed.
        </p>
      </>
    ),
  },
  {
    id: 'part-6-domestic',
    heading: 'BS 5839-6: Fire Detection in Domestic Premises',
    content: (
      <>
        <p>
          BS 5839-6 covers fire detection and fire alarm systems in domestic dwellings. This is the
          part of the standard that most domestic electricians work with on a daily basis. Every
          time you install or replace smoke alarms in a house, flat, or HMO, you are working to BS
          5839-6.
        </p>
        <p>
          Building Regulations Approved Document B (England and Wales) references BS 5839-6 for the
          minimum fire detection requirements in new dwellings and material alterations. In
          Scotland, the Housing (Scotland) Act 2014 and the associated regulations require
          interlinked fire and smoke alarms in all Scottish homes — with requirements that go beyond
          the English minimum.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">
            Minimum Requirements (England and Wales)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                A smoke alarm on every storey of the dwelling used as living accommodation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                A heat alarm in every kitchen (smoke alarms are not suitable in kitchens due to
                cooking fumes causing false alarms).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All alarms must be interlinked so that activation of any one alarm sounds all alarms
                in the dwelling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Mains-powered alarms with battery back-up are recommended for new installations
                (Grade D1). Battery-only alarms (Grade F1) are acceptable for existing dwellings
                where mains wiring is not practicable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For HMOs, the local authority housing team sets the specific requirements based on the
          risk level of the property. This can range from Grade D1 interlinked alarms in a smaller
          shared house to a Grade A panel-based system in a larger or higher-risk HMO. Always check
          the specific requirements with the local authority before quoting for the work.
        </p>
      </>
    ),
  },
  {
    id: 'system-categories',
    heading: 'System Categories Explained: L1 to L5 and P1 to P2',
    content: (
      <>
        <p>
          The system category defines the purpose and coverage of the fire alarm system. There are
          two main category types: Category L (life protection) and Category P (property
          protection).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Category L — Life Protection</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>L1 — Full coverage.</strong> Detectors installed throughout all areas of the
                building, including roof voids, floor voids, and risers. This provides the earliest
                possible warning of fire anywhere in the building. Required for sleeping
                accommodation in high-risk buildings such as care homes and hospitals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>L2 — Coverage of escape routes plus high-risk areas.</strong> Detectors in
                all corridors, stairways, landings, and rooms that open onto escape routes, plus any
                rooms identified as high fire risk (for example, plant rooms, kitchens, laundry
                rooms, electrical intake rooms).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>L3 — Coverage of escape routes only.</strong> Detectors in corridors,
                stairways, landings, and rooms that open onto escape routes. The aim is to warn
                occupants before the escape route is blocked by fire or smoke. This is the most
                common category for offices and shops.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>L4 — Coverage of escape routes within circulation areas only.</strong>{' '}
                Detectors in corridors, stairways, and landings only — not in rooms. This provides a
                reduced level of protection compared to L3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>L5 — Custom coverage.</strong> Detectors installed only in specific areas
                identified in the fire risk assessment. Used where only certain parts of the
                building require automatic fire detection.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Category P — Property Protection</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>P1 — Full coverage for property protection.</strong> Detectors throughout
                the building to give the earliest possible warning of fire for the purpose of
                minimising property damage. Often required by insurers for warehouses, data centres,
                and high-value commercial properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>P2 — Partial coverage for property protection.</strong> Detectors in
                high-risk areas only, such as plant rooms, server rooms, or areas with flammable
                materials. Used where the fire risk assessment identifies specific areas with
                elevated fire risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The system category is determined by the fire risk assessment and the specific
          requirements of the building type, its use, and the relevant legislation. The designer
          must justify the chosen category in the design documentation.
        </p>
      </>
    ),
  },
  {
    id: 'system-grades',
    heading: 'System Grades Explained: Grade A to Grade F',
    content: (
      <>
        <p>
          The system grade defines the type of equipment used in the fire alarm installation. Grades
          range from Grade A (a full commercial panel-based system) to Grade F (battery-only
          standalone detectors).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade A</strong> — A fire alarm panel with conventional or addressable
                detection, dedicated fire alarm cabling (typically fire-resistant FP200 or MICC),
                separate power supply with battery back-up, manual call points, and sounders/visual
                alarm devices. This is the standard for commercial premises under BS 5839-1 and for
                large or high-risk HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade B</strong> — Similar to Grade A but uses a fire alarm control panel
                with a power supply that forms part of the dwelling mains supply, rather than a
                dedicated supply. Less common in practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade C</strong> — Detectors and sounders connected to a common central
                power supply (for example, a mains transformer with battery back-up) but without a
                fire alarm control panel. The system uses detectors with relay outputs to trigger
                sounders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D1</strong> — Mains-powered detectors with integral battery back-up,
                interlinked by hard wiring. This is the most common grade for domestic installations
                — the standard interlinked smoke alarm system that most electricians install in
                domestic rewires and new builds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D2</strong> — Mains-powered detectors with integral battery back-up,
                interlinked by radio (wireless). Used where running new wiring for interlinked
                alarms is not practicable — for example, in existing properties where chasing walls
                is undesirable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade F1</strong> — Battery-only detectors with no mains connection. These
                are standalone or interlinked (by radio) battery-powered smoke alarms. Used in
                existing dwellings where mains wiring is not available or practicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade F2</strong> — Battery-only detectors with no interlinking. These are
                standalone individual smoke alarms. The lowest grade and the minimum level of
                protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The choice of grade depends on the building type, the system category required, and the
          specific risk assessment. Building Regulations typically require Grade D1 for new domestic
          dwellings. HMO licensing conditions may require Grade A for larger properties.
        </p>
      </>
    ),
  },
  {
    id: 'design-installation',
    heading: 'Design and Installation Requirements',
    content: (
      <>
        <p>
          The design and installation of fire alarm systems must follow the detailed requirements in
          BS 5839. Here are the key technical points that electricians need to be aware of:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detector siting</strong> — smoke detectors must be sited on the ceiling, at
                least 300mm from any wall or light fitting. In corridors, detectors must be spaced
                at maximum 15m intervals (7.5m from each end wall). In rooms, the maximum coverage
                area depends on the detector type and ceiling height — typically 100m² for a
                point-type smoke detector in a room up to 10.5m high.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable requirements</strong> — for Grade A systems, fire-resistant cable must
                be used (BS 7629 or BS 8434, commonly known as FP200 or MICC). Standard PVC cables
                (BS 6004) are not acceptable for fire alarm circuit wiring because they will fail in
                a fire. Cable routes should avoid areas of high fire risk where practicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manual call points</strong> — required at every exit point on every storey
                in commercial premises (BS 5839-1). They must be mounted at a height of 1.4m from
                the floor, with the break glass element facing the direction of travel. Not required
                in domestic dwellings under BS 5839-6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sounder coverage</strong> — fire alarm sounders must achieve a minimum sound
                level of 65dB(A) in all accessible areas, or 75dB(A) at the bedhead in sleeping
                accommodation. This must be measured with all doors closed. In noisy environments,
                the sounder level must be at least 5dB(A) above the ambient noise level.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic installations (Grade D1), the key installation requirements are simpler: the
          smoke alarms must be mains-powered from a dedicated circuit or from the lighting circuit
          (with a note that a dedicated circuit is preferred to avoid the alarm losing power when a
          lighting circuit MCB trips). The alarms must be interlinked — either by hard wiring (using
          a 3-core-and-earth cable with the third core for the interlink signal) or by radio
          (wireless interlink).
        </p>
        <SEOAppBridge
          title="AI defect coding for fire alarm observations"
          description="Found a fire alarm defect during an EICR or fire alarm inspection? Describe it in plain English and Elec-Mate's defect code AI returns the correct observation code with the matching BS 5839 regulation reference. Accurate, fast, and consistent."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'testing-maintenance',
    heading: 'Testing and Maintenance Intervals',
    content: (
      <>
        <p>
          Regular testing and maintenance of fire alarm systems is a legal requirement under the
          Regulatory Reform (Fire Safety) Order 2005 (for commercial premises) and a condition of
          HMO licensing (for domestic HMOs). BS 5839 sets out the testing regime in detail.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            BS 5839-1 Testing Schedule (Commercial)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly — User test.</strong> Activate one manual call point per week
                (rotating through all call points over the year) to confirm the panel enters fire
                condition and the sounders operate. Record the test in the fire alarm log book.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly — Visual inspection.</strong> Check the panel for fault indicators,
                verify battery charging, inspect any accessible wiring for damage, and check that
                all detectors and call points are unobstructed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly — Professional inspection.</strong> A competent fire alarm
                engineer tests 25% of the detectors (so all detectors are tested over the course of
                a year), checks sounder operation, and inspects the panel and wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annually — Full professional service.</strong> Every detector, call point,
                sounder, and interface device is tested. Battery capacity is tested under load.
                Cable integrity is verified. The panel firmware is checked. A full test report is
                issued.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic installations (BS 5839-6), the occupant should test each smoke alarm weekly
          using the test button. Battery replacement (for non-sealed units) should be done annually.
          Sealed lithium battery units have a 10-year life and should be replaced as a complete
          unit. Professional servicing is recommended annually for HMO Grade D1 and Grade A systems.
        </p>
        <p>
          Failure to maintain the fire alarm system is a common finding in fire risk assessments and
          can result in enforcement action by the fire and rescue service under the Fire Safety
          Order 2005. It can also invalidate the building's fire insurance.
        </p>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Fire Alarm Certification with Elec-Mate',
    content: (
      <>
        <p>
          Proper certification is essential for fire alarm installations. The certificate provides
          evidence that the system has been designed, installed, and commissioned (or inspected and
          tested) in accordance with BS 5839. It is a legal document that may be required by
          building control, the fire authority, the local authority housing team, or the client's
          insurer.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fire Alarm Certificate Template</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate includes a dedicated fire alarm certificate template covering
                  commissioning certificates, service reports, and periodic inspection reports.
                  Complete it on your phone on site, export as a professional PDF, and send it to
                  the client by email or WhatsApp.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Scan fire alarm panels with the AI board scanner. It reads zone information,
                  device counts, and panel configuration from the photo, pre-filling the certificate
                  data. Saves time on large commercial systems with dozens of zones.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">BS 5839 Training Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Study BS 5839 Part 1 and Part 6 through Elec-Mate's 46+ structured training
                  courses. Includes system design, detector siting, grade and category selection,
                  and commissioning procedures. Flashcards and mock exams included.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Create fire alarm certificates on your phone"
          description="Elec-Mate's fire alarm certificate template produces professional BS 5839-compliant PDFs. Complete it on site, attach photos, and send to the client before you leave. Plus business tools: quoting, invoicing, expenses, and cash flow management."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BS5839FireAlarmStandardPage() {
  return (
    <GuideTemplate
      title="BS 5839 Fire Alarm Standard | Complete Guide UK"
      description="Complete guide to BS 5839 fire alarm standard. Part 1 commercial, Part 6 domestic, system categories L1-L5 and P1-P2, grades A-F, design, installation, testing intervals, and certification requirements."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations"
      badgeIcon={Scale}
      heroTitle={
        <>
          BS 5839 Fire Alarm Standard:{' '}
          <span className="text-yellow-400">The Complete UK Guide</span>
        </>
      }
      heroSubtitle="BS 5839 is the UK standard for fire detection and fire alarm systems. Part 1 covers commercial premises, Part 6 covers domestic dwellings. This guide explains system categories, grades, design requirements, testing intervals, and certification — everything an electrician needs to know."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About BS 5839"
      relatedPages={relatedPages}
      ctaHeading="Fire Alarm Certificates on Your Phone"
      ctaSubheading="Create professional BS 5839-compliant fire alarm certificates with Elec-Mate. AI board scanner, defect code AI, and instant PDF delivery. Plus 46+ training courses and 50+ calculators. 7-day free trial."
    />
  );
}
