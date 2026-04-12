import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Zap,
  AlertTriangle,
  FileCheck2,
  Building2,
  ShieldCheck,
  ClipboardCheck,
  Sun,
  GraduationCap,
  Wifi,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/guides/commercial-electrical-installation-cost' },
  { label: 'School Electrical Cost', href: '/school-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'School Electrical Overview' },
  { id: 'bb93', label: 'BB93 Acoustic Compliance' },
  { id: 'ict-infrastructure', label: 'ICT Infrastructure' },
  { id: 'emergency-lighting', label: 'Emergency Lighting (BS 5266)' },
  { id: 'access-control', label: 'Access Control & Intercoms' },
  { id: 'solar-pv', label: 'Solar PV Opportunities' },
  { id: 'energy-management', label: 'Energy Management Systems' },
  { id: 'cost-breakdown', label: 'Cost Breakdown 2025' },
  { id: 'eicr', label: 'EICR & Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A new-build primary school electrical installation typically costs £120,000–£250,000; secondary schools £250,000–£600,000+, depending on ICT density, specialist rooms, and site size.',
  'BB93 (Building Bulletin 93 — Acoustic Design of Schools) imposes requirements on electrical equipment noise levels. Ventilation fans, transformers, and UPS equipment must meet specified noise criteria to avoid acoustic non-compliance.',
  'Emergency lighting to BS 5266-1 must cover all escape routes, assembly areas, and any internal rooms without natural light. Schools with more than 300 pupils typically require a maintained emergency lighting system.',
  'Modern schools require structured ICT cabling to every teaching space, often 4–6 Cat6A outlets per classroom plus 2–4 PoE access points for wireless coverage. Data infrastructure accounts for 10–20% of the electrical fit-out budget.',
  "Schools are strong candidates for solar PV under the Department for Education's energy efficiency programmes. Roof-mounted systems of 30–100kWp are common; a 50kWp system typically generates £8,000–£14,000 worth of electricity annually at current rates.",
];

const faqs = [
  {
    question: 'How much does a school electrical installation cost in the UK?',
    answer:
      'A new-build primary school (1–2 form entry, approximately 1,200–2,400m² GIA) typically costs £120,000–£250,000 for the complete electrical installation including ICT infrastructure, emergency lighting, fire alarm, access control, and all power and lighting circuits. A secondary school (900–1,800 pupils) costs £250,000–£600,000+ depending on specialist rooms (science labs, DT workshops, music rooms), ICT density, and site size. These figures are labour and materials, excluding VAT.',
  },
  {
    question: 'What is BB93 and how does it affect school electrical installations?',
    answer:
      'Building Bulletin 93 (BB93) — Acoustic Design of Schools — is a DfE design guide that sets noise level targets for school spaces. Electrically relevant requirements include: background noise in teaching spaces must not exceed specified NC (Noise Criteria) levels, which limits the noise output of electrical equipment including ventilation fans, transformers, switchgear, and UPS systems. Electrical contractors on school projects must coordinate with the acoustic designer to ensure equipment selection meets BB93 targets.',
  },
  {
    question: 'What ICT infrastructure does a school require?',
    answer:
      'A modern UK school requires structured cabling to every teaching space and shared learning area. Typical specification: 4–6 Cat6A data outlets per classroom, 2–4 ceiling-mounted wireless access points (PoE-powered), dedicated circuits for interactive whiteboards and display screens, server room or communications room with UPS and structured patch infrastructure, and fibre backbone between buildings on multi-block sites. ICT infrastructure typically accounts for 10–20% of the total school electrical budget.',
  },
  {
    question: 'What emergency lighting standard applies to schools?',
    answer:
      'Emergency lighting in schools is governed by BS 5266-1 (Emergency Lighting). All escape routes, assembly areas, stairwells, and internal rooms without natural light must have emergency lighting. Schools serving more than 300 pupils are generally expected to have maintained emergency lighting (fittings that operate continuously during occupied hours) rather than non-maintained (fittings that operate only on mains failure). Emergency lighting must achieve minimum 1 lux on escape route centrelines.',
  },
  {
    question: 'Do schools need solar PV?',
    answer:
      'Schools are not legally required to install solar PV, but the Department for Education strongly encourages it under energy efficiency and net-zero programmes. Many school building projects funded through central or local authority programmes include solar PV as standard. A 50kWp rooftop system costs approximately £40,000–£65,000 installed and generates £8,000–£14,000 of electricity value per year at 2025 rates, giving a simple payback of 4–8 years. Export to the grid via Smart Export Guarantee (SEG) provides additional income.',
  },
  {
    question: 'What access control systems do schools require?',
    answer:
      'Schools require controlled access to limit entry to authorised persons under safeguarding obligations (the Keeping Children Safe in Education statutory guidance). A typical school access control system includes: video door entry at main entrance with intercom to reception, electric door release (electromagnetic lock or electric strike) at main entrance and key stage boundaries, RFID reader access for staff-only areas, and CCTV at all entry points. Electrical installation costs for access control: £3,000–£12,000 depending on school size and number of controlled access points.',
  },
  {
    question: 'How often does a school need an EICR?',
    answer:
      'The recommended EICR interval for educational buildings is five years, consistent with the BS 7671 guidance for commercial premises. Many local authority estates teams and academy trust facilities managers schedule EICRs on a 3-year rolling programme to ensure no buildings fall out of compliance during management transitions. School EICRs are complex due to the number of sub-distribution boards, science lab specialist circuits, and life-safety systems — and typically cost £600–£2,000+ depending on size.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/care-home-electrical-cost',
    title: 'Care Home Electrical Installation Cost',
    description:
      'Nurse call, emergency lighting, fire alarms to BS 5839, and healthcare-grade electrical.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/hospital-electrical-cost',
    title: 'Hospital Electrical Installation Cost',
    description: 'HTM 06-01 compliance, medical grade supply, UPS, and essential services.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrical-installation-cost',
    title: 'Commercial Electrical Installation Cost',
    description: 'Complete UK commercial electrical cost guide for all building types.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete commercial EICRs on your phone with AI board scanning.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on site with instant PDF export — no evening admin.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'School Electrical Installations: Scope and Key Systems',
    content: (
      <>
        <p>
          School electrical installations are among the most complex in the commercial sector. A
          secondary school may have 50 or more distribution boards, extensive ICT infrastructure,
          specialist electrical requirements for science laboratories and design technology
          workshops, comprehensive life-safety systems, and increasingly significant renewable
          energy and energy management infrastructure.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>General power and lighting</strong> — teaching spaces, corridors, offices,
                sports halls, canteens. LED lighting with PIR and daylight-linked dimming controls
                is standard in new-build schools to comply with Building Regulations Part L.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ICT and data infrastructure</strong> — structured cabling, wireless access
                points, server room, interactive display circuits. Increasingly the largest single
                cost element after general power in modern schools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist room electrical</strong> — science laboratory RCD-protected bench
                circuits (TT earthing systems in some lab configurations), DT workshop 3-phase
                machine supplies, music room isolated earth circuits, drama studio stage lighting
                circuits (dimmers, DMX infrastructure).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Life-safety systems</strong> — emergency lighting to BS 5266-1, fire alarm
                to{' '}
                <SEOInternalLink href="/guides/fire-alarm-installation-cost">
                  BS 5839-1
                </SEOInternalLink>
                , access control, CCTV. Also public address/voice alarm (PAVA) systems in larger
                schools.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All school electrical installations must comply with BS 7671:2018+A3:2024 and the
          Department for Education's output specification for school buildings. Scotland, Wales, and
          Northern Ireland have separate education authority guidance.
        </p>
      </>
    ),
  },
  {
    id: 'bb93',
    heading: 'BB93 Acoustic Compliance for School Electrical Systems',
    content: (
      <>
        <p>
          Building Bulletin 93 (Acoustic Design of Schools) sets noise criteria for teaching spaces
          that directly affect electrical equipment selection and placement. Electricians working on
          school projects must understand BB93's implications to avoid non-compliance that can
          require expensive remediation after handover.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Noise criteria for teaching spaces</strong> — BB93 specifies maximum
                background noise levels of 35 dB(A) for primary classrooms and 40 dB(A) for
                secondary classrooms. Electrical equipment — particularly transformer hum,
                fan-cooled switchgear, and UPS cooling fans — can contribute to background noise if
                not carefully selected and located.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch rooms and substations</strong> — main distribution switchrooms must
                be located away from teaching spaces or adequately acoustically isolated.
                Transformer hum transmits through structure and can cause compliance failures in
                adjacent classrooms even when the room itself is not directly adjacent to the plant
                room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical interlock with HVAC</strong> — heat recovery ventilation units in
                classrooms must be selected for low noise output. As these units require electrical
                supply and control wiring, the electrical contractor is typically responsible for
                coordinating with the mechanical contractor to ensure the chosen units are within
                BB93 noise limits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ict-infrastructure',
    heading: 'ICT Infrastructure for Schools',
    content: (
      <>
        <p>
          ICT infrastructure is the fastest-growing element of school electrical costs. Modern
          pedagogy demands high-bandwidth, reliable wireless connectivity in every teaching space,
          supported by a robust wired backbone and resilient server infrastructure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per-classroom structured cabling</strong> — typical specification: 4–6 x
                Cat6A data outlets (for teacher workstation, visualiser, 1–2 fixed devices, and
                spare) plus 2 x PoE ceiling access points. Cat6A (not Cat6) is specified for new
                schools to support future 10GbE and Wi-Fi 7 standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interactive display circuits</strong> — each teaching space requires a
                dedicated 13A circuit for the interactive flat panel display (IFPD), typically
                positioned at 2.0–2.2m height on the teaching wall. Additional circuits for
                visualisers, document cameras, and teacher PC/laptop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Server and comms room</strong> — dedicated UPS-protected power distribution
                to server racks, precision air conditioning, environmental monitoring, and fibre
                backbone interconnect. A primary school server room typically requires 16–32A
                three-phase or two-phase supply; a large secondary school may need 63–100A three-
                phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-building fibre backbone</strong> — on split-site or multi-block
                campuses, buildings are interconnected by armoured fibre (OM4 or OS2) buried in
                ducted routes or surface-run. The electrical contractor typically installs the
                containment and pulls the fibre; a specialist data contractor terminates it.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting to BS 5266-1 in Schools',
    content: (
      <>
        <p>
          Emergency lighting in schools must comply with BS 5266-1:2016 and is a requirement under
          the Regulatory Reform (Fire Safety) Order 2005 and Building Regulations Part B. The scale
          of a school building and the number of pupils creates specific requirements for anti-panic
          open-area lighting that go beyond typical commercial premises.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape route lighting</strong> — minimum 1 lux on the centreline of all
                corridors, stairwells, and escape routes. Exit signs (internally illuminated,
                compliant with BS EN ISO 7010 sign E001) above all final exits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sports hall and assembly hall</strong> — large open areas (typically over
                60m²) require anti-panic emergency lighting at 0.5 lux. A secondary school sports
                hall may need 8–16 high-mounted emergency luminaires to achieve this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained vs non-maintained</strong> — schools with over 300 pupils or with
                large assembly areas typically specify maintained emergency lighting (on
                continuously during school hours). This doubles as accent lighting and simplifies
                fire drill compliance, as emergency luminaires are visibly operational at all times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central battery systems</strong> — larger secondary schools increasingly use
                central battery systems (CBS) to power emergency luminaires rather than individual
                self-contained fittings. CBS systems offer longer battery life, central monitoring,
                and reduced maintenance costs over the 25-year building lifecycle.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'access-control',
    heading: 'Access Control and Intercom Systems',
    content: (
      <>
        <p>
          Schools have a statutory safeguarding obligation under Keeping Children Safe in Education
          (KCSIE) to control access to the premises and verify visitor identity. This drives
          specific requirements for door entry systems, access control infrastructure, and CCTV that
          are more demanding than most commercial premises.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main entrance video intercom</strong> — HD video door entry with reception
                monitor and electric door release (electromagnetic lock or electric strike). System
                must allow reception staff to view and verify visitors before releasing the door.
                PoE-powered IP intercom systems are standard on new-build schools; electrical supply
                to door release: dedicated 12/24V DC circuit from access control panel with battery
                backup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Staff access RFID</strong> — staff access to back-of-house and secure areas
                (server room, data/comms room, safeguarding room) via RFID card readers. Access
                controller panels require 230V supply with battery backup. Door controllers
                communicate via RS485 or TCP/IP.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCTV</strong> — minimum coverage: main entrance (external and internal), all
                perimeter gate access points, car park, and key internal areas (reception,
                corridors). Footage retained for minimum 31 days. Electrical: NVR supply, PoE
                switches, Cat6 cabling runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access control electrical costs</strong> — typical primary school:
                £3,000–£7,000. Secondary school with multiple buildings and perimeter gates:
                £8,000–£20,000.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'solar-pv',
    heading: 'Solar PV Opportunities for Schools',
    content: (
      <>
        <p>
          Schools are among the best candidates for solar PV in the UK. Large flat or low-pitched
          roof areas, high daytime electricity consumption (matching solar generation profiles
          closely), strong DfE policy support, and access to favourable funding mechanisms make the
          economics compelling.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical system sizes</strong> — primary school: 20–50kWp. Secondary school:
                50–150kWp. Sixth form or large academy: 100–250kWp. System size is constrained by
                available roof area, DNO export permission, and the school's annual consumption
                profile.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Financial benefit</strong> — a 50kWp system generates approximately
                45,000–50,000 kWh per year in the UK. At 2025 commercial electricity rates
                (22–28p/kWh), self-consumed generation is worth £9,900–£14,000 per year. Surplus
                exported via Smart Export Guarantee (SEG) earns an additional 4–15p/kWh depending on
                the tariff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation costs</strong> — 50kWp school rooftop system: £40,000–£65,000
                including inverters, mounting system, cabling, generation meter, and DNO G99
                application. Payback period: typically 4–8 years for a school with strong daytime
                self-consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage</strong> — school battery storage systems (50–100kWh) can be
                added to capture afternoon generation that would otherwise be exported at low SEG
                rates, for use during evening school activities, holiday clubs, and community
                lettings. Battery addition cost: £30,000–£70,000 depending on capacity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'energy-management',
    heading: 'Energy Management Systems for Schools',
    content: (
      <>
        <p>
          Energy management systems (EMS) are increasingly standard on new-build and refurbished
          schools. They monitor and control HVAC, lighting, and power consumption to reduce energy
          costs and support the school's net-zero carbon commitments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart metering and sub-metering</strong> — half-hourly metering at the
                incoming supply, with sub-metering on main distribution boards to identify energy
                use by zone. MODBUS or BACnet-connected metering enables integration with the
                building management system (BMS).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting controls</strong> — PIR occupancy sensing and daylight-linked
                dimming in all teaching spaces reduces lighting energy use by 40–70% versus manually
                switched systems. DALI (Digital Addressable Lighting Interface) control is standard
                on new school lighting designs, allowing individual luminaire addressing and scene
                setting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demand management</strong> — load management systems can shed non-critical
                loads (water heaters, EV charging) during peak demand periods to avoid breaching
                maximum demand (MD) thresholds and associated distribution use of system (DUoS)
                charges. Cost saving potential: £2,000–£8,000 per year for a secondary school.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'School Electrical Installation Cost Breakdown 2025',
    content: (
      <>
        <p>
          Costs below are for new-build installations, labour and materials excluding VAT.
          Refurbishment costs vary significantly depending on the extent of existing installation
          retained.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Primary school (1FE, ~1,200m²)</strong> — £120,000–£180,000. General power
                and lighting: £60,000–£90,000. ICT infrastructure: £20,000–£35,000. Emergency
                lighting and fire alarm: £15,000–£25,000. Access control and CCTV: £8,000–£15,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Primary school (2FE, ~2,400m²)</strong> — £180,000–£250,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secondary school (900 pupils)</strong> — £250,000–£380,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secondary school (1,500 pupils)</strong> — £380,000–£600,000+. Includes
                specialist laboratory and DT workshop circuits, comprehensive PAVA system, and full
                BMS/EMS integration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV (50kWp)</strong> — £40,000–£65,000 additional. Strongly recommended
                for all new-build schools with suitable roof orientation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'EICR and Compliance for Schools',
    content: (
      <>
        <p>
          School EICRs are among the most complex periodic inspections carried out in the commercial
          sector. A large secondary school may have 40–80 distribution boards, specialist laboratory
          circuits, DALI lighting control panels, UPS systems, and extensive life-safety wiring —
          all of which must be inspected and tested.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended interval</strong> — five years for educational buildings. Many
                academy trusts and local authority estates teams use a 3-year cycle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday scheduling</strong> — school EICRs must be carried out during school
                holidays to avoid disruption to teaching. Electricians tendering for school EICR
                work must plan programmes that fit within summer, Easter, or Christmas holiday
                windows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DBS clearance</strong> — electricians working in schools during term time
                (for reactive maintenance) are required to hold a valid enhanced DBS check.
                Holiday-period contractors may also be required to hold DBS clearance by the
                school's safeguarding policy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR cost</strong> — primary school: £600–£1,200. Secondary school:
                £1,500–£3,500 depending on board count and system complexity. Multi-board
                inspections are typically quoted on a per-board basis (£80–£150 per board plus site
                visit charge).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: School Electrical Contracts',
    content: (
      <>
        <p>
          School electrical contracts — new build, refurbishment, and maintenance — are high-value,
          long-term relationships. Academy trusts and multi-academy trusts (MATs) typically contract
          a single electrical contractor across their estate, creating reliable recurring revenue
          from EICR cycles, reactive maintenance, and capital projects.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Quote and Certificate Complex Installations
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  for detailed school project quotes with itemised labour and materials. Issue{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> for
                  multi-board inspections, tracking each board separately and generating a
                  consolidated report for the academy trust.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage school electrical contracts with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for commercial quotes, multi-board EICR completion, and EIC certification. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SchoolElectricalCostPage() {
  return (
    <GuideTemplate
      title="School Electrical Installation Cost UK 2025 | Educational Buildings"
      description="School electrical installation costs UK 2025. BB93 acoustic compliance, ICT infrastructure, emergency lighting to BS 5266-1, access control, solar PV, and energy management systems. Primary school £120,000–£250,000."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Educational Electrical Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          School Electrical Installation Cost UK 2025:{' '}
          <span className="text-yellow-400">Educational Buildings Guide</span>
        </>
      }
      heroSubtitle="Complete cost guide for UK school electrical installations. BB93 acoustic compliance, ICT infrastructure and structured cabling, emergency lighting to BS 5266-1, access control and safeguarding systems, solar PV, and energy management. Primary school £120,000–£250,000."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: School Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certificate School Electrical Projects on Site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for school project quoting, multi-board EICR completion, and EIC certification. 7-day free trial, cancel anytime."
    />
  );
}
