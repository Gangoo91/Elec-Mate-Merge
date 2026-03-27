import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  ClipboardCheck,
  Zap,
  FileCheck2,
  Building2,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Sectors', href: '/specialist-electrical-sectors' },
  { label: 'Pharmaceutical Electrical Installation', href: '/pharmaceutical-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Pharmaceutical Electrical Overview' },
  { id: 'gmp-requirements', label: 'GMP Requirements' },
  { id: 'cleanroom-wiring', label: 'Cleanroom Electrical Wiring' },
  { id: 'iso-classifications', label: 'ISO Cleanroom Classifications' },
  { id: 'hvac-electrical', label: 'HVAC Electrical Integration' },
  { id: 'isolation-transformers', label: 'Isolation Transformers' },
  { id: 'validation-iqoqpq', label: 'Validation: IQ/OQ/PQ' },
  { id: 'fda-21-cfr', label: 'FDA 21 CFR Part 11' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Pharmaceutical electrical installation must comply with Good Manufacturing Practice (GMP) — the MHRA-enforced regulatory framework that governs pharmaceutical manufacturing in the UK. All electrical work is documented, inspected, and traceable to support GMP compliance.',
  'Cleanroom electrical installations require flush-mounted fittings, sealed cable entries, no exposed conduit fittings or threads, and materials that do not generate particles. The electrical installation must not compromise the cleanroom classification.',
  'ISO cleanroom classifications (ISO 5 to ISO 8) define the maximum permitted particle counts at specified particle sizes. The cleanroom classification drives the design of the electrical installation — ISO 5 (Class 100) demands the most stringent approach.',
  'Validation is the formal documented process of demonstrating that systems do what they are designed to do. Electrical systems in pharmaceutical facilities are validated through Installation Qualification (IQ), Operational Qualification (OQ), and Performance Qualification (PQ).',
  'FDA 21 CFR Part 11 governs electronic records and electronic signatures for facilities supplying the US market. Electrical control systems, building management systems, and SCADA systems that record GMP-relevant data must comply.',
  'Isolation transformers are widely used in pharmaceutical cleanrooms to provide a floating earth reference, reduce electromagnetic interference to sensitive instrumentation, and provide an additional level of electrical safety for personnel working with critical equipment.',
];

const faqs = [
  {
    question: 'What is GMP and why does it affect electrical installation in pharmaceutical facilities?',
    answer:
      'Good Manufacturing Practice (GMP) is the regulatory framework that ensures pharmaceutical products are consistently produced and controlled to quality standards appropriate for their intended use. In the UK, GMP is enforced by the Medicines and Healthcare products Regulatory Agency (MHRA) and follows EU GMP guidelines (retained in UK law post-Brexit). GMP affects electrical installation because all systems that can influence product quality — including HVAC, clean utilities, process equipment, and monitoring systems — must be designed, installed, qualified, and maintained to GMP standards. This means full documentation of the electrical installation, change control procedures for any modifications, and periodic review of maintenance records.',
  },
  {
    question: 'What is different about electrical wiring in a pharmaceutical cleanroom?',
    answer:
      'Pharmaceutical cleanroom electrical wiring must not generate particles that could contaminate the product. This means no exposed conduit threads or fittings — all conduit must terminate in flush, gasketed fittings. Sockets, switches, and control panels must be flush-mounted with sealed edges. Cable entries through walls and floors must be sealed with appropriate cleanroom-compatible sealants. Trunking and cable management must have smooth, easily cleanable surfaces without crevices where particles could accumulate. Materials must be compatible with cleaning and disinfection agents used in the cleanroom. All penetrations through the cleanroom envelope must be fire-stopped and sealed to maintain the room pressure differential.',
  },
  {
    question: 'What is Installation Qualification (IQ) and what does it involve for electrical systems?',
    answer:
      'Installation Qualification (IQ) is the documented verification that electrical equipment and systems have been installed in accordance with the approved design, manufacturer specifications, and GMP requirements. For electrical systems, IQ involves verifying and documenting: the identity and calibration status of all installed instruments and meters, cable sizes and types against design, cable routing against approved drawings, earthing system continuity, motor nameplate data against specifications, fuse and circuit breaker ratings against design, and as-built drawing verification. All deviations from the approved design are formally raised and resolved. IQ is typically carried out jointly by the electrical contractor, the engineering team, and the QA department.',
  },
  {
    question: 'What is FDA 21 CFR Part 11 and does it apply to UK pharmaceutical facilities?',
    answer:
      'FDA 21 CFR Part 11 is the US Food and Drug Administration regulation governing electronic records and electronic signatures in FDA-regulated industries. It requires that electronic records be trustworthy, reliable, and equivalent to paper records. It applies to any UK pharmaceutical facility that exports products to the United States or is inspected by the FDA. In practice, it affects any computer system that records GMP data — SCADA systems, building management systems, laboratory information management systems (LIMS), and process control systems. Compliance requirements include audit trails, access controls, system validation, and backup procedures.',
  },
  {
    question: 'Why are isolation transformers used in pharmaceutical cleanrooms?',
    answer:
      'Isolation transformers are used in pharmaceutical cleanrooms for several reasons. They provide a floating (unearthed) secondary winding, which means that a single earth fault on the secondary does not cause a circuit breaker trip — important in critical manufacturing processes where an unexpected power interruption could ruin a product batch. They also reduce electromagnetic interference (EMI) from the supply, which can affect sensitive analytical instruments. An insulation monitoring device (IMD) is used with an isolated power system to detect earth faults without tripping the supply. This combination of isolation transformer and IMD (as described in IEC 61557-8 and BS 7671 Section 710) is common in pharmaceutical operating theatre-type environments.',
  },
  {
    question: 'What are the particle count limits for ISO 5, ISO 6, ISO 7, and ISO 8 cleanrooms?',
    answer:
      'ISO 14644-1 defines cleanroom classifications by maximum permitted airborne particle concentrations. For 0.5 micron particles: ISO 5 (formerly Class 100) allows 3,520 particles per cubic metre; ISO 6 allows 35,200; ISO 7 (formerly Class 10,000) allows 352,000; ISO 8 (formerly Class 100,000) allows 3,520,000. For pharmaceutical manufacturing, filling and aseptic assembly operations typically require ISO 5 (Grade A under EU GMP Annex 1). Background environments for aseptic operations are ISO 7 (Grade B). General pharmaceutical manufacturing areas are typically ISO 8 (Grade C or D). The cleanroom classification directly drives the electrical installation specification.',
  },
  {
    question: 'What qualifications do electricians need for pharmaceutical facility work?',
    answer:
      'Standard trade qualifications (NVQ Level 3 or equivalent) and 18th Edition (BS 7671) certification are the baseline. For cleanroom work, experience with GMP documentation, validation protocols, and change control procedures is essential and typically takes time to develop on the job. Understanding of HVAC electrical systems, BMS (Building Management Systems), and process control is highly valued. CompEx certification is useful if any ATEX-classified areas exist within the facility (solvent storage, certain process areas). Electricians working in pharmaceutical facilities should expect a significant documentation burden and must be comfortable with formal work instructions, inspection hold points, and quality system requirements.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cleanroom-electrical',
    title: 'Cleanroom Electrical Installation',
    description: 'ISO 14644 cleanroom classifications, flush-mounted fittings, sealed entries, and HEPA control systems.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/food-processing-electrical',
    title: 'Food Processing Electrical Installation',
    description: 'IP69K wash-down, ATEX dust zones, hygienic design, and BRC Global Standards compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/nuclear-site-electrical',
    title: 'Nuclear Site Electrical Engineering',
    description: 'Nuclear Baseline QA, BPSS/SC clearance, ECS nuclear card, and pay rates £60–£100+/hr.',
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
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to the Wiring Regulations — amendments, key changes, and compliance.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Pharmaceutical Electrical Installation in the UK',
    content: (
      <>
        <p>
          Pharmaceutical electrical installation is a high-skill, high-accountability specialism
          that sits at the intersection of electrical engineering, quality assurance, and
          regulatory compliance. The UK pharmaceutical manufacturing sector — which includes
          global companies such as AstraZeneca, GlaxoSmithKline, Pfizer, and hundreds of
          specialist contract manufacturers — requires electrical contractors who understand
          both the technical requirements of GMP environments and the documentation and
          validation obligations that come with them.
        </p>
        <p>
          Unlike standard commercial or industrial electrical work, pharmaceutical electrical
          installation is subject to a regulatory framework that extends well beyond BS 7671.
          MHRA inspections, validation protocols, change control procedures, and electronic
          records requirements all affect how electrical work is planned, carried out, and
          documented.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MHRA regulation</strong> — the Medicines and Healthcare products
                Regulatory Agency (MHRA) inspects UK pharmaceutical manufacturing facilities
                against EU GMP guidelines (UK GMP post-Brexit). Non-compliant facilities face
                warning letters, import restrictions, and licence withdrawal. Electrical systems
                form part of the MHRA inspection scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EU GMP Annex 1</strong> — the 2022 revision of EU GMP Annex 1
                (Manufacture of Sterile Medicinal Products) significantly tightened requirements
                for cleanroom design, monitoring, and contamination control. The electrical
                installation is directly relevant to compliance with Annex 1 requirements for
                particle control and environmental monitoring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'gmp-requirements',
    heading: 'GMP Requirements for Electrical Installation',
    content: (
      <>
        <p>
          Good Manufacturing Practice (GMP) imposes requirements on pharmaceutical electrical
          installations that go beyond standard regulatory compliance. The key GMP principles
          that apply to electrical work are documentation, traceability, change control, and
          qualification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design documentation</strong> — all electrical systems must be designed
                to approved specifications. Design drawings, cable schedules, equipment
                data sheets, and load calculations must be formally reviewed and approved
                before installation commences. Any deviation from approved design must go
                through a formal deviation or change control process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change control</strong> — once a pharmaceutical facility is qualified
                and in production, any modification to the electrical installation — including
                changes to circuits, equipment, or cabling — must go through a formal change
                control process. This involves risk assessment, impact assessment on product
                quality and system qualification, and may require requalification of affected
                systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration</strong> — all measuring instruments used for GMP-relevant
                measurements (temperature, humidity, pressure differential, power quality) must
                be calibrated against traceable standards. Calibration records must be maintained
                and instruments must be re-calibrated at defined intervals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planned preventive maintenance</strong> — all electrical equipment
                must be subject to a planned preventive maintenance (PPM) programme. Maintenance
                activities, findings, and corrective actions must be formally documented.
                PPM records form part of the GMP documentation available for MHRA inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cleanroom-wiring',
    heading: 'Cleanroom Electrical Wiring: No Exposed Conduit Fittings',
    content: (
      <>
        <p>
          The electrical installation within a pharmaceutical cleanroom must not compromise
          the room's ability to maintain its defined particle count classification. This drives
          a specific approach to materials, methods, and detailing that differs significantly
          from standard industrial or commercial electrical work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No exposed conduit threads or fittings</strong> — conduit systems
                in cleanrooms must use flush, sealed fittings. Exposed threads are particle
                sources and cannot be cleaned effectively. All conduit terminations must be
                made with cleanroom-compatible glands or fittings with smooth, flush surfaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flush-mounted accessories</strong> — sockets, switches, data outlets,
                and control panels must be flush-mounted in the cleanroom wall or ceiling.
                Surface-mounted boxes create ledges that accumulate particles and are difficult
                to clean effectively. Flush mounting also maintains the integrity of the
                cleanroom wall surface and the pressure differential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sealed cable penetrations</strong> — all cable entries through
                cleanroom walls, floors, and ceilings must be sealed with cleanroom-compatible
                sealant (typically silicone-based, particle-free, and compatible with
                disinfection agents). Seals must be fire-stopped as well as particle-sealed.
                Unsealed penetrations allow pressurised room air to bypass filtration and
                contaminated air to enter from adjacent areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cleanable surfaces</strong> — all cable management systems, trunking,
                and containment within the cleanroom must have smooth, continuous surfaces
                without crevices or internal ledges. Round-edged stainless steel or
                smooth-surfaced GRP trunking is preferred over standard PVC trunking.
                Surfaces must withstand repeated cleaning with pharmaceutical-grade disinfectants
                including sporicidal agents.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'iso-classifications',
    heading: 'ISO Cleanroom Classifications (ISO 5 to ISO 8)',
    content: (
      <>
        <p>
          ISO 14644-1 defines cleanroom classifications by maximum permitted airborne particle
          concentrations. The classification of each area in a pharmaceutical facility drives
          the electrical specification for that area.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ISO 5 / Grade A (≤3,520 particles/m³ at 0.5µm)</strong> — the most
                stringent classification, used for filling zones, critical surfaces, and
                directly exposed product in aseptic manufacturing. Electrical installations
                must be minimal and flush-mounted. All penetrations must be sealed. No
                materials that shed particles may be used. Unidirectional (laminar) airflow
                must not be disrupted by the electrical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ISO 7 / Grade B-C (≤352,000 particles/m³ at 0.5µm)</strong> —
                background environment for aseptic operations (Grade B) and general
                aseptic preparation areas (Grade C). Electrical installation requirements
                are rigorous but somewhat less stringent than Grade A — flush mounting
                still required, but some surface-mounted equipment with cleanable housings
                may be acceptable depending on location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ISO 8 / Grade D (≤3,520,000 particles/m³ at 0.5µm)</strong> —
                general pharmaceutical manufacturing areas for non-sterile products and
                less critical sterile manufacturing steps. Electrical installation is more
                similar to clean industrial than to cleanroom, but particle generation
                and cleanability remain important considerations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hvac-electrical',
    heading: 'HVAC Electrical Integration',
    content: (
      <>
        <p>
          HVAC (Heating, Ventilation, and Air Conditioning) is the defining infrastructure
          of a pharmaceutical cleanroom. Maintaining the cleanroom classification, temperature,
          humidity, and pressure differential all depend on the HVAC system — and the HVAC
          system depends entirely on its electrical installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air handling units (AHUs)</strong> — pharmaceutical AHUs are large,
                complex items of plant that require substantial electrical supplies for fan
                motors (often variable speed drives), heating coils, cooling coils, and
                humidification systems. Motor control centres (MCCs) for AHUs must be
                accessible for maintenance without entering the cleanroom.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variable speed drives (VSDs)</strong> — AHU fans are typically
                controlled by variable speed drives to maintain constant airflow despite
                filter loading and system pressure variation. VSDs generate harmonic
                distortion and require appropriate cable screening and earth bonding.
                EMC compatibility with sensitive instrumentation in the cleanroom must
                be considered in the VSD installation design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pressure differential monitoring</strong> — the positive pressure
                differential between cleanroom and adjacent areas (typically 10–15 Pascal)
                is monitored by pressure transducers connected to the BMS. Monitoring data
                is GMP-critical — any loss of pressure differential must trigger an alarm.
                The electrical systems supporting pressure monitoring must be highly reliable
                and their calibration records must be maintained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HEPA filtration controls</strong> — HEPA (High Efficiency Particulate
                Air) filters remove 99.97% of particles ≥0.3µm. Filter differential pressure
                is monitored to detect filter loading. The electrical installation for filter
                monitoring must be robust and the monitoring data must be available to the
                BMS for trending and alarm generation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'isolation-transformers',
    heading: 'Isolation Transformers in Pharmaceutical Environments',
    content: (
      <>
        <p>
          Isolation transformers are a common feature of pharmaceutical cleanroom electrical
          systems, particularly in areas where critical manufacturing processes or sensitive
          instrumentation require an uninterrupted, low-interference power supply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IT system (isolated terra)</strong> — the secondary winding of an
                isolation transformer has no connection to earth, creating a floating supply
                (IT system as defined in BS 7671). A single earth fault on the IT system
                does not cause a circuit breaker trip because there is no return path for
                fault current. This prevents the unexpected power loss that could disrupt
                a critical manufacturing process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation monitoring device (IMD)</strong> — an IT system must be
                monitored by an IMD (as required by BS 7671 and IEC 61557-8). The IMD detects
                the first earth fault and raises an alarm, allowing the fault to be located and
                rectified without interrupting the supply. This is the critical difference from
                a TN or TT system — the first fault is detected but does not cause supply
                interruption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EMI reduction</strong> — isolation transformers provide galvanic
                isolation between the supply and the load, which attenuates high-frequency
                noise conducted from the supply. This is beneficial in pharmaceutical
                environments with sensitive analytical instruments, GC-MS, HPLC, and
                other laboratory equipment that is sensitive to supply noise.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'validation-iqoqpq',
    heading: 'Validation: IQ, OQ, and PQ for Electrical Systems',
    content: (
      <>
        <p>
          Validation is the formal documented process of demonstrating that systems and
          equipment do what they are designed to do, consistently and reproducibly.
          Pharmaceutical electrical systems — particularly those that support or directly
          affect product quality — must be validated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation Qualification (IQ)</strong> — documents that the
                electrical installation has been installed correctly, in accordance with
                approved design drawings, manufacturer specifications, and regulatory
                requirements. Involves verification of cable types and sizes, equipment
                identity against specification, calibration status of instruments, and
                earthing system continuity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Operational Qualification (OQ)</strong> — demonstrates that the
                electrical system operates correctly throughout its operating range. For a
                HVAC electrical system, OQ includes testing that the AHU motor runs at the
                correct speed, that the VSD responds correctly to control signals, that
                alarms activate at the correct setpoints, and that the system correctly
                maintains cleanroom conditions within specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Performance Qualification (PQ)</strong> — demonstrates that the
                system performs consistently in its actual operating environment, under
                normal operating conditions, over a defined period. For HVAC systems,
                PQ typically involves monitoring cleanroom conditions over multiple
                production shifts to demonstrate that classification is consistently
                maintained.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians carrying out work in pharmaceutical facilities during the qualification
          phase must understand that all activities are formally documented and that any
          deviations from the approved protocol must be raised as formal deviations before
          proceeding. The validation mindset — document everything, deviate formally, never
          improvise — is fundamental to successful pharmaceutical electrical work.
        </p>
      </>
    ),
  },
  {
    id: 'fda-21-cfr',
    heading: 'FDA 21 CFR Part 11: Electronic Records & Electronic Signatures',
    content: (
      <>
        <p>
          FDA 21 CFR Part 11 applies to any computer system used in a pharmaceutical facility
          that exports to the US or is subject to FDA inspection. It requires that electronic
          records and electronic signatures be trustworthy and reliable — equivalent in integrity
          to paper records and handwritten signatures.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Audit trails</strong> — computer systems must create and maintain
                time-stamped audit trails of all actions that create, modify, or delete
                records. Audit trails must not be editable by operators. For BMS and SCADA
                systems, this means all data changes, alarm acknowledgements, and parameter
                modifications are permanently recorded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access controls</strong> — computer systems must use individual logins
                and access controls that prevent unauthorised modification of records. Shared
                logins are not compliant with 21 CFR Part 11.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Computer system validation (CSV)</strong> — all computer systems
                subject to 21 CFR Part 11 must be validated. The electrical installation
                supporting these systems — power supplies, UPS, network infrastructure —
                must be reliable and its maintenance formally documented, as failures
                that cause data loss or corruption are a regulatory risk.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Pharmaceutical Facilities',
    content: (
      <>
        <p>
          Pharmaceutical electrical work rewards electricians who combine technical excellence
          with meticulous documentation discipline. The QA culture is demanding but the work
          is interesting, the facilities are clean, the pay is good, and the long-term career
          prospects are excellent in a sector that is growing in the UK.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Documentation Is As Important As the Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  In pharmaceutical electrical work, an impeccably executed installation with
                  poor documentation is a compliance risk. Invest time in understanding GMP
                  documentation requirements, IQ protocols, and change control procedures.
                  Electricians who can produce clear, accurate as-built drawings and test
                  records are highly valued in this sector.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Organise Your Test Records with Elec-Mate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate
                  </SEOInternalLink>{' '}
                  to produce formal test records and inspection reports that meet the documentation
                  standards expected in GMP environments. Clear, professionally formatted records
                  support IQ protocol completion and give QA departments confidence in the
                  electrical installation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce GMP-quality electrical records with Elec-Mate"
          description="Create professional test records, inspection reports, and certificates that meet pharmaceutical QA documentation standards. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PharmaceuticalElectricalPage() {
  return (
    <GuideTemplate
      title="Pharmaceutical Electrical Installation UK | GMP Clean Room Wiring"
      description="Complete guide to pharmaceutical electrical installation in the UK — GMP requirements, cleanroom wiring (no exposed conduit fittings), ISO 5-8 classifications, HVAC integration, isolation transformers, IQ/OQ/PQ validation, and FDA 21 CFR Part 11."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Sector"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Pharmaceutical Electrical Installation UK:{' '}
          <span className="text-yellow-400">GMP Cleanroom Wiring Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about pharmaceutical electrical installation — GMP compliance, cleanroom wiring requirements, ISO 5–8 classifications, HVAC electrical integration, isolation transformers, IQ/OQ/PQ validation, and FDA 21 CFR Part 11 electronic records."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Pharmaceutical Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Produce Professional Electrical Records with Elec-Mate"
      ctaSubheading="Create test records and inspection reports that meet GMP documentation standards. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
