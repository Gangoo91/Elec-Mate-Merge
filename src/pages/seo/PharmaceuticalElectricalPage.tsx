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
  'BS 7671 sets mandatory acceptance criteria for medical IT systems. Reg 710.555.201(a) limits the no-load leakage current of the transformer output winding and enclosure to 0.5 mA, and limits each transformer to a rated output of 0.5–10 kVA. Across the whole medical IT system, with all final circuits connected and without load, the total leakage current (transformer plus all connected final circuits) shall not exceed 10 mA. Reg 710.531.2.2.3 prohibits overload protection in the secondary circuit of the isolating transformer — overload protection must instead be provided at each individual final circuit.',
  'BS 7671 Reg 710.415.1 prohibits the use of RCDs as additional protection on final circuits supplied by a medical IT system. Where a second insulation fault occurs, automatic disconnection must be achieved via overcurrent protective devices in accordance with Reg 411.6.5 (Reg 717.411.6).',
'BS 7671:2018+A4:2026 redrafted Reg 421.1.7. It is now a requirement to protect final circuits supplying socket-outlets rated up to 32 A with arc fault detection devices (AFDDs) in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation, and care homes. For all other premises — including most pharmaceutical facilities — Reg 421.1.7 recommends AFDDs for single-phase AC final circuits supplying socket-outlets not exceeding 32 A, which should be considered on new work and at periodic inspection.',
];

const faqs = [
  {
    question:
      'What is GMP and why does it affect electrical installation in pharmaceutical facilities?',
    answer:
      'Good Manufacturing Practice (GMP) is the regulatory framework that ensures pharmaceutical products are consistently produced and controlled to quality standards appropriate for their intended use. In the UK, GMP is enforced by the Medicines and Healthcare products Regulatory Agency (MHRA) and follows EU GMP guidelines (retained in UK law post-Brexit). GMP affects electrical installation because all systems that can influence product quality — including HVAC, clean utilities, process equipment, and monitoring systems — must be designed, installed, qualified, and maintained to GMP standards. This means full documentation of the electrical installation, change control procedures for any modifications, and periodic review of maintenance records.',
  },
  {
    question: 'What is different about electrical wiring in a pharmaceutical cleanroom?',
    answer:
      'Pharmaceutical cleanroom electrical wiring must not generate particles that could contaminate the product. This means no exposed conduit threads or fittings — all conduit must terminate in flush, gasketed fittings. Sockets, switches, and control panels must be flush-mounted with sealed edges. Cable entries through walls and floors must be sealed with appropriate cleanroom-compatible sealants. Trunking and cable management must have smooth, easily cleanable surfaces without crevices where particles could accumulate. Materials must be compatible with cleaning and disinfection agents used in the cleanroom. All penetrations through the cleanroom envelope must be fire-stopped and sealed to maintain the room pressure differential.',
  },
  {
    question:
      'What is Installation Qualification (IQ) and what does it involve for electrical systems?',
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
      'Isolation transformers are used in pharmaceutical cleanrooms for several reasons. They provide a floating (unearthed) secondary winding, which means that a single earth fault on the secondary does not cause a circuit breaker trip — important in critical manufacturing processes where an unexpected power interruption could ruin a product batch. They also reduce electromagnetic interference (EMI) from the supply, which can affect sensitive analytical instruments. An insulation monitoring device (IMD) is used with an isolated power system to detect earth faults without tripping the supply. Where an insulation fault location system (IFLS) is provided to indicate the location of a first fault, it may comply with BS EN IEC 61557-9 (BS 7671 Reg 411.6.4). Medical IT transformers must comply with BS EN 61558-2-15, and the no-load leakage current of the output winding and enclosure shall not exceed 0.5 mA per transformer (Reg 710.555.201). Across the whole medical IT system, the total leakage current of the transformer plus all connected final circuits shall not exceed 10 mA with no load applied. Importantly, RCDs shall not be used as additional protection on final circuits supplied by a medical IT system (Reg 710.415.1) — second-fault disconnection relies on overcurrent protective devices instead.',
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
    description:
      'ISO 14644 cleanroom classifications, flush-mounted fittings, sealed entries, and HEPA control systems.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/food-processing-electrical',
    title: 'Food Processing Electrical Installation',
    description:
      'IP69K wash-down, ATEX dust zones, hygienic design, and BRC Global Standards compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/nuclear-site-electrical',
    title: 'Nuclear Site Electrical Engineering',
    description:
      'Nuclear Baseline QA, BPSS/SC clearance, ECS nuclear card, and pay rates £60–£100+/hr.',
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
          that sits at the intersection of electrical engineering, quality assurance, and regulatory
          compliance. The UK pharmaceutical manufacturing sector — which includes global companies
          such as AstraZeneca, GlaxoSmithKline, Pfizer, and hundreds of specialist contract
          manufacturers — requires electrical contractors who understand both the technical
          requirements of GMP environments and the documentation and validation obligations that
          come with them.
        </p>
        <p>
          Unlike standard commercial or industrial electrical work, pharmaceutical electrical
          installation is subject to a regulatory framework that extends well beyond BS 7671. MHRA
          inspections, validation protocols, change control procedures, and electronic records
          requirements all affect how electrical work is planned, carried out, and documented.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MHRA regulation</strong> — the Medicines and Healthcare products Regulatory
                Agency (MHRA) inspects UK pharmaceutical manufacturing facilities against EU GMP
                guidelines (UK GMP post-Brexit). Non-compliant facilities face warning letters,
                import restrictions, and licence withdrawal. Electrical systems form part of the
                MHRA inspection scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EU GMP Annex 1</strong> — the 2022 revision of EU GMP Annex 1 (Manufacture
                of Sterile Medicinal Products) significantly tightened requirements for cleanroom
                design, monitoring, and contamination control. The electrical installation is
                directly relevant to compliance with Annex 1 requirements for particle control and
                environmental monitoring.
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
          installations that go beyond standard regulatory compliance. The key GMP principles that
          apply to electrical work are documentation, traceability, change control, and
          qualification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design documentation</strong> — all electrical systems must be designed to
                approved specifications. Design drawings, cable schedules, equipment data sheets,
                and load calculations must be formally reviewed and approved before installation
                commences. Any deviation from approved design must go through a formal deviation or
                change control process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change control</strong> — once a pharmaceutical facility is qualified and in
                production, any modification to the electrical installation — including changes to
                circuits, equipment, or cabling — must go through a formal change control process.
                This involves risk assessment, impact assessment on product quality and system
                qualification, and may require requalification of affected systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration</strong> — all measuring instruments used for GMP-relevant
                measurements (temperature, humidity, pressure differential, power quality) must be
                calibrated against traceable standards. Calibration records must be maintained and
                instruments must be re-calibrated at defined intervals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planned preventive maintenance</strong> — all electrical equipment must be
                subject to a planned preventive maintenance (PPM) programme. Maintenance activities,
                findings, and corrective actions must be formally documented. PPM records form part
                of the GMP documentation available for MHRA inspection.
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
          The electrical installation within a pharmaceutical cleanroom must not compromise the
          room's ability to maintain its defined particle count classification. This drives a
          specific approach to materials, methods, and detailing that differs significantly from
          standard industrial or commercial electrical work. The same principles underpin
          general{' '}
          <SEOInternalLink href="/cleanroom-electrical">
            cleanroom electrical installation
          </SEOInternalLink>{' '}
          across regulated industries.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No exposed conduit threads or fittings</strong> — conduit systems in
                cleanrooms must use flush, sealed fittings. Exposed threads are particle sources and
                cannot be cleaned effectively. All conduit terminations must be made with
                cleanroom-compatible glands or fittings with smooth, flush surfaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flush-mounted accessories</strong> — sockets, switches, data outlets, and
                control panels must be flush-mounted in the cleanroom wall or ceiling.
                Surface-mounted boxes create ledges that accumulate particles and are difficult to
                clean effectively. Flush mounting also maintains the integrity of the cleanroom wall
                surface and the pressure differential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sealed cable penetrations</strong> — all cable entries through cleanroom
                walls, floors, and ceilings must be sealed with cleanroom-compatible sealant
                (typically silicone-based, particle-free, and compatible with disinfection agents).
                Seals must be fire-stopped as well as particle-sealed. Unsealed penetrations allow
                pressurised room air to bypass filtration and contaminated air to enter from
                adjacent areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cleanable surfaces</strong> — all cable management systems, trunking, and
                containment within the cleanroom must have smooth, continuous surfaces without
                crevices or internal ledges. Round-edged stainless steel or smooth-surfaced GRP
                trunking is preferred over standard PVC trunking. Surfaces must withstand repeated
                cleaning with pharmaceutical-grade disinfectants including sporicidal agents.
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
          ISO 14644-1 defines cleanroom classifications by the maximum permitted airborne particle
          concentration. The classification of each area in a pharmaceutical facility drives the
          electrical specification for that area — the table below summarises the ISO classes most
          relevant to pharmaceutical manufacturing, their indicative EU GMP Annex 1 grade
          equivalents, and what each demands of the electrical installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-12 gap-0 bg-white/[0.06] text-xs font-semibold uppercase tracking-wide text-white/70 px-4 py-3">
            <div className="col-span-3">ISO class</div>
            <div className="col-span-3">Max particles/m³ ≥0.5µm</div>
            <div className="col-span-2">GMP grade</div>
            <div className="col-span-4">Electrical implication</div>
          </div>
          <div className="grid grid-cols-12 gap-0 items-start bg-blue-900/30 border-t border-blue-700/40 px-4 py-3 text-sm text-white">
            <div className="col-span-3 font-bold">ISO 5</div>
            <div className="col-span-3 tabular-nums">3,520</div>
            <div className="col-span-2">Grade A</div>
            <div className="col-span-4 text-white/90">
              Filling zones, critical surfaces, exposed product. Minimal, flush-mounted fittings;
              all penetrations sealed; no particle-shedding materials; unidirectional (laminar)
              airflow must not be disrupted.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 items-start border-t border-white/10 px-4 py-3 text-sm text-white">
            <div className="col-span-3 font-bold">ISO 6</div>
            <div className="col-span-3 tabular-nums">35,200</div>
            <div className="col-span-2">—</div>
            <div className="col-span-4 text-white/90">
              Less critical aseptic support areas. Flush mounting remains the default; cleanability
              and sealed entries still apply.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 items-start border-t border-white/10 px-4 py-3 text-sm text-white">
            <div className="col-span-3 font-bold">ISO 7</div>
            <div className="col-span-3 tabular-nums">352,000</div>
            <div className="col-span-2">Grade B / C</div>
            <div className="col-span-4 text-white/90">
              Background environment for aseptic operations (B) and general aseptic preparation (C).
              Flush mounting still required; some surface-mounted equipment with cleanable housings
              may be acceptable by location.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 items-start border-t border-white/10 px-4 py-3 text-sm text-white">
            <div className="col-span-3 font-bold">ISO 8</div>
            <div className="col-span-3 tabular-nums">3,520,000</div>
            <div className="col-span-2">Grade D</div>
            <div className="col-span-4 text-white/90">
              General manufacturing for non-sterile products and less critical sterile steps. Closer
              to clean industrial, but particle generation and cleanability still matter.
            </div>
          </div>
        </div>
        <p className="text-sm text-white/60">
          Particle limits are at the 0.5µm size for the ISO 14644-1 occupancy state being assessed.
          GMP grade equivalents are indicative — the formal grade is fixed by the qualified design,
          not by the ISO class alone.
        </p>
      </>
    ),
  },
  {
    id: 'hvac-electrical',
    heading: 'HVAC Electrical Integration',
    content: (
      <>
        <p>
          HVAC (Heating, Ventilation, and Air Conditioning) is the defining infrastructure of a
          pharmaceutical cleanroom. Maintaining the cleanroom classification, temperature, humidity,
          and pressure differential all depend on the HVAC system — and the HVAC system depends
          entirely on its electrical installation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="text-2xl font-bold text-yellow-400 tabular-nums">10–15 Pa</div>
            <div className="text-sm text-white/80 mt-1">
              Typical positive pressure differential held between a cleanroom and the adjacent area,
              monitored by BMS-connected pressure transducers.
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="text-2xl font-bold text-yellow-400 tabular-nums">99.97%</div>
            <div className="text-sm text-white/80 mt-1">
              HEPA filter efficiency at the 0.3µm most-penetrating particle size; differential
              pressure across the filter is monitored to detect loading.
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="text-2xl font-bold text-yellow-400">VSD-driven</div>
            <div className="text-sm text-white/80 mt-1">
              AHU fans run on variable speed drives to hold constant airflow as filters load —
              demanding EMC-aware cable screening and earthing.
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air handling units (AHUs)</strong> — pharmaceutical AHUs are large, complex
                items of plant that require substantial electrical supplies for fan motors (often
                variable speed drives), heating coils, cooling coils, and humidification systems.
                Motor control centres (MCCs) for AHUs must be accessible for maintenance without
                entering the cleanroom.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variable speed drives (VSDs)</strong> — AHU fans are typically controlled by
                variable speed drives to maintain constant airflow despite filter loading and system
                pressure variation. VSDs generate harmonic distortion and require appropriate cable
                screening and earth bonding. EMC compatibility with sensitive instrumentation in the
                cleanroom must be considered in the VSD installation design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pressure differential monitoring</strong> — the positive pressure
                differential between cleanroom and adjacent areas (typically 10–15 Pascal) is
                monitored by pressure transducers connected to the BMS. Monitoring data is
                GMP-critical — any loss of pressure differential must trigger an alarm. The
                electrical systems supporting pressure monitoring must be highly reliable and their
                calibration records must be maintained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HEPA filtration controls</strong> — HEPA (High Efficiency Particulate Air)
                filters remove 99.97% of particles ≥0.3µm. Filter differential pressure is monitored
                to detect filter loading. The electrical installation for filter monitoring must be
                robust and the monitoring data must be available to the BMS for trending and alarm
                generation.
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
          instrumentation require an uninterrupted, low-interference power supply. Where the
          installation is a medical IT system, BS 7671 Section 710 imposes the verified acceptance
          criteria below.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4">
            <div className="text-xl font-bold text-white tabular-nums">≤0.5 mA</div>
            <div className="text-xs text-white/70 mt-1">
              No-load leakage, transformer output winding &amp; enclosure (710.555.201(a))
            </div>
          </div>
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4">
            <div className="text-xl font-bold text-white tabular-nums">≤10 mA</div>
            <div className="text-xs text-white/70 mt-1">
              Total no-load leakage across the whole system (transformer + all final circuits)
            </div>
          </div>
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4">
            <div className="text-xl font-bold text-white tabular-nums">0.5–10 kVA</div>
            <div className="text-xs text-white/70 mt-1">
              Permitted rated output per transformer (710.555.201(b))
            </div>
          </div>
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4">
            <div className="text-xl font-bold text-white">No RCD</div>
            <div className="text-xs text-white/70 mt-1">
              RCDs not used for additional protection on IT final circuits (710.415.1)
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IT system (isolated terra)</strong> — the secondary winding of an isolation
                transformer has no connection to earth, creating a floating supply (IT system as
                defined in BS 7671). A single earth fault on the IT system does not cause a circuit
                breaker trip because there is no return path for fault current. This prevents the
                unexpected power loss that could disrupt a critical manufacturing process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation monitoring device (IMD)</strong> — an IT system must be monitored
                by an IMD — Reg 411.6.3 permits insulation monitoring devices (IMDs), residual
                current monitors (RCMs) and insulation fault location systems (IFLS) on an IT
                system. The IMD detects the first earth fault and raises an alarm, allowing the
                fault to be located and rectified without interrupting the supply. Where an
                insulation fault location system (IFLS) is also provided to indicate the location of
                a first fault, it may comply with BS EN IEC 61557-9 (Reg 411.6.4). This is the
                critical
                difference from a TN or TT system — the first fault is detected but does not cause
                supply interruption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EMI reduction</strong> — isolation transformers provide galvanic isolation
                between the supply and the load, which attenuates high-frequency noise conducted
                from the supply. This is beneficial in pharmaceutical environments with sensitive
                analytical instruments, GC-MS, HPLC, and other laboratory equipment that is
                sensitive to supply noise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer product standard and leakage limit (Reg 710.555.201)</strong>{' '}
                — medical IT transformers shall comply with BS EN 61558-2-15. The no-load leakage
                current of the output winding to earth and of the enclosure shall not exceed 0.5 mA,
                and each transformer shall have a rated output of not less than 0.5 kVA and not more
                than 10 kVA (Reg 710.555.201). Separately, across the whole medical IT system — with
                all final circuits connected and without load — the total leakage current of the
                transformer plus all connected final circuits shall not exceed 10 mA. These are
                mandatory acceptance criteria verified at commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  No overload protection in the transformer secondary (Reg 710.531.2.2.3)
                </strong>{' '}
                — overload protection shall not be installed in the secondary circuit of the
                isolation transformer. The primary-side OCPD provides fault current protection only;
                each final circuit on the secondary side must have its own fault current and
                overload protection. A double-pole circuit-breaker is required for each single-phase
                final circuit fed from the medical IT system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  RCDs prohibited as additional protection on IT final circuits (Reg 710.415.1)
                </strong>{' '}
                — additional protection by means of an RCD shall not be used on final circuits
                supplied by a medical IT system. Where a second insulation fault occurs, automatic
                disconnection must be achieved via overcurrent protective devices in accordance with
                Reg 411.6.5 (Reg 717.411.6). This is a common design error — fitting 30 mA RCDs on
                IT-supplied circuits is non-compliant.
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
          Validation is the formal documented process of demonstrating that systems and equipment do
          what they are designed to do, consistently and reproducibly. Pharmaceutical electrical
          systems — particularly those that support or directly affect product quality — must be
          validated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation Qualification (IQ)</strong> — documents that the electrical
                installation has been installed correctly, in accordance with approved design
                drawings, manufacturer specifications, and regulatory requirements. Involves
                verification of cable types and sizes, equipment identity against specification,
                calibration status of instruments, and earthing system continuity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Operational Qualification (OQ)</strong> — demonstrates that the electrical
                system operates correctly throughout its operating range. For a HVAC electrical
                system, OQ includes testing that the AHU motor runs at the correct speed, that the
                VSD responds correctly to control signals, that alarms activate at the correct
                setpoints, and that the system correctly maintains cleanroom conditions within
                specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Performance Qualification (PQ)</strong> — demonstrates that the system
                performs consistently in its actual operating environment, under normal operating
                conditions, over a defined period. For HVAC systems, PQ typically involves
                monitoring cleanroom conditions over multiple production shifts to demonstrate that
                classification is consistently maintained.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians carrying out work in pharmaceutical facilities during the qualification phase
          must understand that all activities are formally documented and that any deviations from
          the approved protocol must be raised as formal deviations before proceeding. The
          validation mindset — document everything, deviate formally, never improvise — is
          fundamental to successful pharmaceutical electrical work.
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
          FDA 21 CFR Part 11 applies to any computer system used in a pharmaceutical facility that
          exports to the US or is subject to FDA inspection. It requires that electronic records and
          electronic signatures be trustworthy and reliable — equivalent in integrity to paper
          records and handwritten signatures.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Audit trails</strong> — computer systems must create and maintain
                time-stamped audit trails of all actions that create, modify, or delete records.
                Audit trails must not be editable by operators. For BMS and SCADA systems, this
                means all data changes, alarm acknowledgements, and parameter modifications are
                permanently recorded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access controls</strong> — computer systems must use individual logins and
                access controls that prevent unauthorised modification of records. Shared logins are
                not compliant with 21 CFR Part 11.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Computer system validation (CSV)</strong> — all computer systems subject to
                21 CFR Part 11 must be validated. The electrical installation supporting these
                systems — power supplies, UPS, network infrastructure — must be reliable and its
                maintenance formally documented, as failures that cause data loss or corruption are
                a regulatory risk.
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
          Pharmaceutical electrical work rewards electricians who combine technical excellence with
          meticulous documentation discipline. The QA culture is demanding but the work is
          interesting, the facilities are clean, the pay is good, and the long-term career prospects
          are excellent in a sector that is growing in the UK.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Documentation Is As Important As the Work
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  In pharmaceutical electrical work, an impeccably executed installation with poor
                  documentation is a compliance risk. Invest time in understanding GMP documentation
                  requirements, IQ protocols, and change control procedures. Electricians who can
                  produce clear, accurate as-built drawings and test records are highly valued in
                  this sector.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Organise Your Test Records with Elec-Mate
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate</SEOInternalLink> to
                  produce formal test records and inspection reports that meet the documentation
                  standards expected in GMP environments. Clear, professionally formatted records
                  support IQ protocol completion and give QA departments confidence in the
                  electrical installation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">
                A4:2026 Update: Arc Fault Detection Devices (AFDDs)
              </h4>
              <p className="text-white text-sm leading-relaxed">
                BS 7671:2018+A4:2026 redrafted Reg 421.1.7. AFDDs are now a requirement for final
                circuits supplying socket-outlets rated up to 32 A in Higher Risk Residential
                Buildings, Houses in Multiple Occupation, purpose-built student accommodation, and
                care homes. For all other premises — which covers most pharmaceutical facilities —
                the regulation recommends AFDDs on single-phase AC final circuits supplying
                socket-outlets not exceeding 32 A. Consider them on new work and at periodic
                inspection (EICR): AFDDs detect dangerous series and parallel arcing conditions that
                conventional MCBs and RCDs cannot detect.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce GMP-quality electrical records with Elec-Mate"
          description="Create professional test records, inspection reports, and certificates that meet pharmaceutical QA documentation standards."
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
      title="Pharmaceutical Electrical Installation UK | GMP Clean Room"
      description="Complete guide to pharmaceutical electrical installation in the UK — GMP requirements, cleanroom wiring (no exposed conduit fittings)…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
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
      answerBox={{
        question: 'What are the electrical installation requirements for UK pharmaceutical facilities?',
        answer:
          'Pharmaceutical electrical work must satisfy BS 7671 and Good Manufacturing Practice (GMP), enforced in the UK by the MHRA. Cleanroom wiring uses flush-mounted, sealed, particle-free fittings; HVAC, monitoring and control systems are qualified through IQ, OQ and PQ. Where medical IT supplies are used, BS 7671 Part 7 (Section 710) governs transformers, insulation monitoring and second-fault protection.',
        detail:
          'All electrical work is documented under change control and traceable for MHRA inspection, and systems exporting to the US must also meet FDA 21 CFR Part 11 for electronic records.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Pharmaceutical Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Produce Professional Electrical Records with Elec-Mate"
      ctaSubheading="Create test records and inspection reports that meet GMP documentation standards. Join 1,000+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
