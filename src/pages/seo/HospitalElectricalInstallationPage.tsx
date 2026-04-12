import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  Settings,
  Activity,
  ClipboardCheck,
  PoundSterling,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/commercial-electrical-installation' },
  { label: 'Hospital Electrical Installation', href: '/hospital-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'medical-locations', label: 'Class 1 & 2 Medical Locations' },
  { id: 'iec-60364-7-710', label: 'IEC 60364-7-710 & BS 7671' },
  { id: 'isolated-power-supplies', label: 'Isolated Power Supplies' },
  { id: 'essential-services', label: 'Essential Services & UPS' },
  { id: 'htm-06-01', label: 'HTM 06-01 Guidance' },
  { id: 'medical-grade-protection', label: 'Medical Grade RCDs & Protection' },
  { id: 'earthing-bonding', label: 'Earthing & Equipotential Bonding' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hospital electrical installations in the UK must comply with BS 7671:2018+A3:2024 Part 7 Section 710, which implements the requirements of IEC 60364-7-710 for special installations and locations — medical locations.',
  'Medical locations are classified as Group 0 (no medical electrical equipment applied to the patient), Group 1 (applied parts used externally), or Group 2 (applied parts used in life-critical applications such as operating theatres and cardiac care units).',
  'Group 2 locations require IT systems (Isolated Terra systems) with insulation monitoring devices (IMDs) to allow early warning of a first earth fault without interrupting supply to life-support equipment.',
  "NHS England's Health Technical Memorandum HTM 06-01 provides authoritative design and management guidance for healthcare electrical services, supplementing the statutory requirements of BS 7671 and the Electricity at Work Regulations 1989.",
  'Essential services in hospitals must be maintained by automatic changeover to generator power within 0.5 seconds for Category 1 circuits (life support) and 15 seconds for Category 2 circuits (emergency lighting, operating suites), in accordance with HTM 06-01.',
];

const faqs = [
  {
    question:
      'What is IEC 60364-7-710 and how does it apply to UK hospital electrical installations?',
    answer:
      'IEC 60364-7-710 is the international standard for medical locations, adopted in the UK as Part 7 Section 710 of BS 7671:2018+A3:2024. It defines the specific requirements for electrical installations in areas of hospitals, clinics, dental surgeries, and medical practices where medical electrical equipment is used on patients. The standard classifies medical locations into Group 0, Group 1, and Group 2 based on the intended use and the risk to the patient from a loss of electrical supply, and specifies protection measures appropriate to each group. All new UK hospital electrical installations and major refurbishments must comply with Section 710.',
  },
  {
    question: 'What is a Group 2 medical location and what are the electrical requirements?',
    answer:
      "A Group 2 medical location is a space where medical electrical equipment is used in direct contact with the patient's heart (e.g. cardiac catheters) or where interruption of supply could be immediately life-threatening. Examples include operating theatres, cardiac catheter labs, intensive care units (ICUs), and neonatal intensive care units (NICUs). Group 2 locations require: an IT system (isolated earth system) with insulation monitoring; local Insulation Monitoring Device (IMD) alarm panels; essential supply changeover within 0.5 seconds for critical circuits; additional equipotential bonding of all metalwork within the patient environment; and minimum socket outlet requirements within reach of the patient zone.",
  },
  {
    question: 'What is an IT system (isolated power supply) in a hospital context?',
    answer:
      'An IT system in a hospital is an Isolated Terra (IT) electrical distribution system in which neither pole of the supply is connected to earth. This is achieved using a medical isolation transformer. Because no conductor is intentionally earthed, the first insulation fault to earth does not cause a short-circuit or trip a protective device — the supply to life-critical equipment continues uninterrupted. An Insulation Monitoring Device (IMD) continuously measures the insulation resistance of the system and sounds an alarm if it falls below 50 kΩ (for operating theatres) or 100 kΩ (for other Group 2 locations), prompting maintenance to investigate and rectify the fault before a second fault can cause a supply interruption.',
  },
  {
    question: 'What does HTM 06-01 require for hospital essential services?',
    answer:
      'NHS Health Technical Memorandum 06-01 (HTM 06-01) requires that hospital essential electrical services are maintained by emergency generator sets in the event of a mains supply failure. Essential services are categorised as: Category 1 (no-break supply, maximum 0.5 second changeover, for life support, operating theatre lighting, and critical monitoring equipment), Category 2 (short-break supply, maximum 15 seconds, for emergency lighting, general theatre power, and ward nurse call systems), and Category 3 (delayed supply, maximum 60 seconds, for general essential services). Separate essential services distribution boards must be provided for each category.',
  },
  {
    question: 'What RCD requirements apply to hospital electrical installations?',
    answer:
      'Standard 30mA RCDs as used in domestic and commercial premises are generally not used in Group 2 medical locations because they would disconnect supply to life-critical equipment on a first earth fault. Instead, Group 2 locations use IT systems with insulation monitoring as described above. Where RCDs are used in Group 1 locations or non-patient areas, they must be 30mA Type A or Type B (for equipment with DC components) in accordance with Section 710 of BS 7671. Medical grade RCDs with lower nuisance tripping characteristics may be specified by the design engineer. RCDs are required on all socket outlet circuits in non-Group 2 areas per Regulation 411.3.3 of BS 7671.',
  },
  {
    question: 'Who is qualified to design and install hospital electrical systems in the UK?',
    answer:
      'Hospital electrical installations require a combination of BS 7671 competence and specialist knowledge of Section 710 and HTM 06-01. Designers should hold an IET membership or similar professional qualification and be familiar with Healthcare Premises Design guidance. Installers should be registered with NICEIC, NAPIT, or an equivalent scheme and have demonstrable experience in healthcare projects. All installations must be certified to BS 7671 on completion. Hospitals should also appoint a qualified Authorising Engineer (Electrical) as required by HTM 06-01 to manage the electrical safety of the estate.',
  },
  {
    question: 'What earthing arrangements are required in the patient environment?',
    answer:
      "In Group 1 and Group 2 medical locations, supplementary equipotential bonding must be applied within the patient environment (the area within 1.5 metres horizontally and 2.5 metres vertically of the patient's position). All simultaneously accessible conductive parts, including electrical equipment frames, bed frames, metallic pipework, radiators, and structural steelwork, must be connected to a patient environment equipotential bonding bar. The bonding conductors must meet the minimum cross-sectional area requirements of BS 7671 Regulation 544.1. This bonding reduces the risk of dangerous potential differences appearing across the patient during fault conditions.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/data-centre-electrical-installation',
    title: 'Data Centre Electrical Installation',
    description: 'UPS systems, N+1 redundancy, TN-S earthing, and critical power calculations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/factory-electrical-installation',
    title: 'Factory Electrical Installation',
    description: 'Three-phase supplies, motor control centres, HRC fuses, and ATEX zones.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-commercial-property',
    title: 'Commercial EICR Guide',
    description: 'Periodic inspection and testing requirements for commercial premises.',
    icon: ClipboardCheck,
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
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote healthcare and commercial electrical projects with instant PDF proposals.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Hospital Electrical Installation in the UK',
    content: (
      <>
        <p>
          Hospital and healthcare electrical installation is among the most technically demanding
          and safety-critical disciplines in the UK electrical industry. The combination of
          vulnerable patients, life-critical equipment, 24/7 operational requirements, and complex
          regulatory obligations makes healthcare electrical engineering a distinct specialism.
          Errors in design, installation, or maintenance can directly endanger patient lives.
        </p>
        <p>
          The primary technical standard is Section 710 of BS 7671:2018+A3:2024, which implements
          IEC 60364-7-710 for medical locations. The primary management and design guidance is NHS
          England's Health Technical Memorandum HTM 06-01. These documents must be read together —
          BS 7671 provides the statutory minimum requirements, while HTM 06-01 provides the
          additional engineering guidance appropriate for NHS facilities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope:</strong> Section 710 applies to hospitals, clinics, medical and
                dental practices, healthcare centres, and any location where medical electrical
                equipment is used in direct contact with patients, including private facilities and
                veterinary practices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Statutory obligation:</strong> The Electricity at Work Regulations 1989
                apply in full to all healthcare premises. NHS facilities also have obligations under
                the Health and Safety at Work etc. Act 1974 and the Care Quality Commission (CQC)
                registration requirements, which include electrical safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional roles:</strong> NHS Estates departments appoint an Authorising
                Engineer (Electrical) under HTM 06-01. This person holds overall technical authority
                for the electrical safety of the estate and authorises Appointed Persons and
                Competent Persons to carry out work on the electrical installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'medical-locations',
    heading: 'Class 1 and Class 2 Medical Locations',
    content: (
      <>
        <p>
          IEC 60364-7-710 and BS 7671 Section 710 classify medical locations into groups based on
          the nature of the medical activity carried out and the consequence to patient safety of an
          electrical supply interruption or fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 0 locations:</strong> Medical electrical equipment is not used in
                contact with the patient, or only equipment not classified as an applied part is
                used. Examples: waiting rooms, hospital corridors, administrative areas. Standard BS
                7671 requirements apply with no special Section 710 measures beyond general
                commercial requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 1 locations:</strong> Applied parts are intended for external use
                only, or internal use in parts of the body other than the heart. Examples:
                examination rooms, physiotherapy rooms, radiology (X-ray), general wards, dental
                surgeries. 30mA RCDs are required on all socket circuits within the patient
                environment. IT systems are recommended but not mandatory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 2 locations:</strong> Applied parts are intended for procedures where
                interruption of supply could be immediately life-threatening. Examples: operating
                theatres, cardiac catheter labs, ICUs, NICUs, anaesthetic rooms. IT systems with
                insulation monitoring are mandatory. Essential supply changeover within 0.5 seconds
                for life-critical circuits is required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The group classification must be determined by the healthcare client and clinical team
          during the design stage, documented in a medical location schedule, and agreed with the
          Authorising Engineer before installation commences.
        </p>
      </>
    ),
  },
  {
    id: 'iec-60364-7-710',
    heading: 'IEC 60364-7-710 and BS 7671 Section 710',
    content: (
      <>
        <p>
          Section 710 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          sets out specific requirements that supplement or modify the general requirements of the
          rest of the standard for medical locations. Key requirements include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 710.312.2 — Essential supply:</strong> Final circuits for life
                support systems, operating theatre lighting, and surgical luminaires must be
                supplied by essential services with automatic changeover not exceeding 0.5 seconds
                (Category 1). Other essential circuits must change over within 15 seconds (Category
                2) or 60 seconds (Category 3).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 710.413 — IT systems for Group 2:</strong> In Group 2 locations,
                each IT system must serve only one Group 2 room (or small group of rooms), must
                include an Insulation Monitoring Device, and must have a local alarm panel clearly
                visible to clinical staff. The IMD must raise an alarm at 50 kΩ insulation
                resistance for circuits up to 63A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 710.514.1 — Documentation:</strong> A schedule of medical
                locations, including their group classification and the protective measures applied,
                must be prepared and kept at the main distribution point. This forms part of the
                as-built documentation for the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 710.53 — Isolation and switching:</strong> A means of switching
                off the electrical supply to each Group 2 location in an emergency must be provided
                outside the room, clearly labelled, and accessible to authorised persons only. This
                must not interrupt the supply to essential circuits fed from the Category 1
                essential supply.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'isolated-power-supplies',
    heading: 'Isolated Power Supplies (IT Systems) in Hospitals',
    content: (
      <>
        <p>
          The IT system is the defining electrical feature of Group 2 medical locations.
          Understanding how IT systems work, and how to install and test them correctly, is
          essential for electricians working in operating theatres and critical care environments.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medical isolation transformer:</strong> A medical-grade isolation
                transformer (compliant with BS EN 61558-2-15) separates the Group 2 circuit from the
                earthed supply, creating an unearthed (isolated) secondary. The transformer is
                typically rated 0.5 kVA to 10 kVA and is specifically designed for medical use with
                reinforced insulation and a secondary leakage current not exceeding 0.5mA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation Monitoring Device (IMD):</strong> The IMD continuously measures
                the insulation resistance between each conductor of the IT system and earth. When
                the combined insulation resistance falls below the alarm threshold (typically 50 kΩ
                at 25V DC test voltage), a visual and audible alarm is activated at the local alarm
                panel in the medical location. The alarm does not interrupt supply — it signals the
                need for maintenance action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load line monitor (LIM):</strong> A load line monitor (also called a line
                isolation monitor in some standards) indicates the total hazard current that would
                flow in the event of a fault. In US-influenced specifications this device is
                prominent; in UK practice the IMD described in BS 7671 Section 710 serves the same
                function.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing:</strong> IT systems must be tested on commissioning and at regular
                intervals. Testing includes: verification of IMD alarm function, measurement of
                transformer secondary leakage current, insulation resistance measurement of all
                circuits, and verification of equipotential bonding continuity throughout the
                patient environment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'essential-services',
    heading: 'Essential Services and UPS Systems in Hospitals',
    content: (
      <>
        <p>
          The essential services electrical system ensures that power is maintained to life-critical
          equipment and safety systems when the normal mains supply fails. HTM 06-01 defines three
          categories of essential supply with different changeover time requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 1 — No-break supply (0 to 0.5 seconds):</strong> Supplied by a UPS
                system. Covers life support equipment, cardiac monitors, critical alarm systems, and
                operating theatre lighting. The UPS must bridge the gap between mains failure and
                generator start without any interruption to supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 2 — Short-break supply (up to 15 seconds):</strong> Supplied via
                Automatic Transfer Switches (ATS) from the generator. Covers emergency lighting,
                general operating theatre power, endoscopy, and high-dependency ward circuits. The
                generator must start, reach stable voltage and frequency, and the ATS must transfer
                within 15 seconds of mains failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category 3 — Delayed supply (up to 60 seconds):</strong> General essential
                services including ward lighting, general power outlets outside patient areas,
                catering, and administrative systems. Transferred to the generator after the
                Category 1 and 2 loads have been established.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Essential supply testing:</strong> HTM 06-01 requires regular full-load
                tests of the essential supply system, including simulated mains failure, generator
                start, and ATS changeover. Test results must be recorded and retained. The
                Electricity at Work Regulations 1989 require maintenance records to be kept.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'htm-06-01',
    heading: 'Health Technical Memorandum HTM 06-01',
    content: (
      <>
        <p>
          HTM 06-01 (Health Technical Memorandum 06-01: Electrical Services Supply and Distribution)
          is the NHS England guidance document for all aspects of healthcare electrical services.
          While not itself a statutory instrument, it is considered the authoritative technical
          guidance for NHS facilities and compliance with it is expected by NHS Estates teams and
          the CQC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Authorising Engineer (Electrical):</strong> HTM 06-01 requires NHS trusts to
                appoint an Authorising Engineer (Electrical) — an independent, suitably qualified
                person who advises management on electrical safety policy and procedures, and who
                authorises the Appointed Persons responsible for the electrical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit to Work system:</strong> All electrical maintenance and modification
                work in hospitals must be carried out under a formal Permit to Work system. The PTW
                defines the work scope, isolation points, testing requirements, and safe working
                conditions. No live electrical work should be undertaken without specific
                authorisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection:</strong> HTM 06-01 specifies inspection frequencies for
                all categories of electrical installation in healthcare premises. Group 2 medical
                locations require annual testing of the IT system and equipotential bonding. The
                main electrical installation should be inspected at intervals not exceeding those
                specified in BS 7671 for the installation type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asset register:</strong> HTM 06-01 requires a comprehensive asset register
                for all electrical plant, including switchgear, transformers, generators, UPS
                systems, and distribution boards. The register must record specifications, test
                dates, maintenance history, and condition ratings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'medical-grade-protection',
    heading: 'Medical Grade RCDs and Circuit Protection',
    content: (
      <>
        <p>
          Protective device selection in medical locations requires careful consideration of the
          conflicting requirements for patient safety (requiring disconnection of faulty circuits)
          and clinical safety (requiring continuity of supply to life-critical equipment).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 1 socket outlets:</strong> In Group 1 medical locations, all socket
                outlets within the patient environment must be protected by a 30mA RCD in accordance
                with Regulation 710.411.3.2.5 of BS 7671. Type A RCDs are suitable for most
                applications; Type B RCDs are required where equipment with DC residual current
                components (such as some MRI-compatible equipment) is connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Group 2 — no standard RCDs:</strong> In Group 2 locations, standard 30mA
                RCDs are not used on circuits within the patient environment because a nuisance trip
                during surgery could be fatal. Protection is provided by the IT system and IMD as
                described above, combined with supplementary equipotential bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overcurrent protection:</strong> Circuit breakers in medical locations must
                be selected to achieve correct discrimination between upstream and downstream
                devices. A fault on a single circuit must not cause an upstream device to operate
                and disconnect a larger section of the installation. Discrimination should be
                verified by calculation during the design stage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-bonding',
    heading: 'Earthing and Equipotential Bonding in the Patient Environment',
    content: (
      <>
        <p>
          Earthing and bonding in medical locations is more extensive than in standard commercial
          premises. The patient environment contains multiple conductive surfaces and electrical
          devices, all of which must be maintained at the same electrical potential to prevent
          dangerous currents flowing through the patient.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding:</strong> All simultaneously accessible conductive
                parts within the patient environment (1.5m horizontal, 2.5m vertical from the
                patient) must be connected by supplementary equipotential bonding conductors to a
                local equipotential bonding bar (patient zone bonding bar). This includes bed
                frames, medical equipment frames, metallic pipework, HVAC components, and structural
                steelwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding conductor sizing:</strong> Supplementary bonding conductors must be
                sized in accordance with Regulation 544.2 of BS 7671, with a minimum cross-sectional
                area of 2.5 mm² if mechanically protected or 4 mm² if not mechanically protected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding verification:</strong> The resistance of each supplementary bonding
                connection must be measured on commissioning and periodically thereafter. BS 7671
                Section 710 requires a maximum resistance of 0.2 ohm between any two simultaneously
                accessible conductive parts within the patient environment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Healthcare Environments',
    content: (
      <>
        <p>
          Hospital and healthcare electrical work offers excellent career development opportunities
          for UK electricians. The specialism commands higher rates than standard commercial work,
          and NHS frameworks provide steady pipeline of maintenance, refurbishment, and new build
          projects.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Infection Control and Site Rules</h4>
                <p className="text-white text-sm leading-relaxed">
                  Working in clinical areas requires compliance with hospital infection control
                  policies. Electricians may need to wear PPE, use designated tools, and follow
                  strict procedures for working in sterile environments. Familiarise yourself with
                  site-specific requirements before commencing work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  All electrical work in healthcare premises must be certified. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certification app
                  </SEOInternalLink>{' '}
                  to complete Electrical Installation Certificates and test schedules on site, with
                  immediate PDF delivery to the NHS Estates team.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage healthcare electrical projects with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site certification, quoting, and project management. Complete EICs and EICRs on your phone. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HospitalElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Hospital Electrical Installation UK | Healthcare Electrical Systems"
      description="Complete guide to hospital and healthcare electrical installation in the UK. IEC 60364-7-710, BS 7671 Section 710, Class 1 and 2 medical locations, isolated power supplies, IMDs, essential services, HTM 06-01, and patient environment earthing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Healthcare Electrical Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Hospital Electrical Installation UK:{' '}
          <span className="text-yellow-400">Healthcare Systems Guide</span>
        </>
      }
      heroSubtitle="The complete technical guide to hospital and healthcare electrical installation in the UK — covering IEC 60364-7-710, BS 7671 Section 710, Group 1 and 2 medical locations, isolated power supplies, insulation monitoring, essential services, HTM 06-01, and patient environment earthing."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Hospital Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Healthcare Electrical Projects with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site certification, quoting, and project management in healthcare environments. 7-day free trial, cancel anytime."
    />
  );
}
