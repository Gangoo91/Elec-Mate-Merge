import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building2,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Scale,
  GraduationCap,
  PoundSterling,
  Search,
  ClipboardCheck,
  Camera,
  Send,
  Receipt,
  Flame,
  Lightbulb,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EICR for Commercial Premises', href: '/guides/eicr-for-commercial-premises' },
];

const tocItems = [
  { id: 'what-is-commercial-eicr', label: 'What Is a Commercial EICR?' },
  { id: 'legal-basis', label: 'Legal Requirements' },
  { id: 'inspection-frequency', label: 'Inspection Frequency' },
  { id: 'differences-from-domestic', label: 'Differences from Domestic EICRs' },
  { id: 'who-can-carry-out', label: 'Who Can Carry Out a Commercial EICR?' },
  { id: 'scope-and-extent', label: 'Scope and Extent of Inspection' },
  { id: 'reporting-and-obligations', label: 'Reporting to Building Owner or Employer' },
  { id: 'insurance-requirements', label: 'Insurance and Compliance' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'elec-mate-commercial-eicr', label: 'Elec-Mate for Commercial EICRs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial premises in the UK have a legal obligation to maintain safe electrical installations under the Electricity at Work Regulations 1989 and the Health and Safety at Work Act 1974 — an EICR is the standard method of demonstrating compliance.',
  'The recommended inspection frequency for commercial premises is every 5 years, though some environments (industrial, high-risk, or harsh conditions) may require more frequent inspections — typically every 3 years or annually for certain high-risk areas.',
  'Commercial EICRs are significantly more complex than domestic — they involve three-phase systems, multiple distribution boards, sub-distribution boards, hundreds of circuits, and specialist systems such as fire alarm and emergency lighting supplies.',
  'Only competent persons should carry out commercial EICRs — typically electricians registered as NICEIC Approved Contractors (or equivalent) who hold C&G 2391 and have experience of commercial installations.',
  'Elec-Mate handles multi-board commercial EICRs on your phone. The AI board scanner works on commercial distribution boards, the schedule of tests supports unlimited circuits, and you can send the EICR and invoice to the building manager from site.',
];

const faqs = [
  {
    question: 'How often should a commercial property have an EICR?',
    answer:
      'The general recommendation is every 5 years for commercial premises, which aligns with the guidance in BS 7671 and IET Guidance Note 3 (GN3). However, this is not a fixed legal requirement — it is a recommendation based on best practice. Some premises require more frequent inspections. Industrial environments with heavy machinery, chemical exposure, or harsh conditions may need an EICR every 3 years. Petrol stations, swimming pools, and other special installations may need annual inspections. The previous EICR will state the recommended interval for the next inspection, and the person responsible for the premises should follow that recommendation. Insurance companies often require evidence of a current EICR as a condition of cover, and their requirements may specify a particular interval. If the premises have undergone significant changes — new circuits, additional distribution boards, refurbishment work — a new EICR should be carried out regardless of when the last one was done, to confirm the altered installation is safe.',
  },
  {
    question: 'Is a commercial EICR a legal requirement?',
    answer:
      'There is no single statute that says "commercial premises must have an EICR every 5 years" in the way that the 2020 Regulations mandate it for private rented dwellings. However, the legal obligation exists through multiple overlapping pieces of legislation. The Electricity at Work Regulations 1989 (Regulation 4) require that all electrical systems are maintained so as to prevent danger. The Health and Safety at Work Act 1974 requires employers to ensure the health, safety, and welfare of their employees and anyone affected by their work activities — this includes maintaining safe electrical installations. The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to carry out a fire risk assessment, which should include the condition of the electrical installation. An EICR is the recognised method of demonstrating that the electrical installation has been inspected, tested, and found to be in a satisfactory condition. Without a current EICR, an employer or building owner would struggle to demonstrate compliance with these regulations. In the event of an electrical incident, the absence of a current EICR would be a significant factor in any enforcement action or prosecution.',
  },
  {
    question: 'What is the difference between a domestic and commercial EICR?',
    answer:
      'The EICR form and process are fundamentally the same — the inspection follows BS 7671 and uses the same model forms from Appendix 6. However, commercial EICRs are far more complex in practice. A typical domestic EICR covers a single consumer unit with 8 to 16 circuits and takes 2 to 3 hours. A commercial EICR may cover a main distribution board with 40+ ways, multiple sub-distribution boards on different floors, three-phase systems, rising mains, sub-main cables, hundreds of individual circuits, and specialist systems. The schedule of test results alone can run to many pages. The inspection may take 2 to 5 days depending on the size of the installation, and may need to be carried out during non-working hours to allow isolation of circuits without disrupting business operations. The range of equipment is broader — the inspector may encounter three-phase protective devices, moulded case circuit breakers (MCCBs), air circuit breakers (ACBs), busbar trunking, capacitor banks, UPS systems, standby generators, and specialist installations in kitchens, server rooms, and plant areas. Commercial EICRs require deeper technical knowledge and more experience than domestic work.',
  },
  {
    question: 'Can a Domestic Installer carry out a commercial EICR?',
    answer:
      'Technically, any competent person can carry out an EICR — the legal requirement is competence, not a specific registration level. However, in practice, a Domestic Installer registration (NICEIC, NAPIT, or ELECSA) covers work in domestic premises only. If you are registered as a Domestic Installer and you carry out a commercial EICR, you are working outside the scope of your registration. This means your competent person scheme may not support you if there is a dispute about the quality of your work, and your professional indemnity insurance may not cover you. Most building owners, facilities managers, and insurance companies will check that the electrician carrying out the EICR holds an appropriate level of registration — NICEIC Approved Contractor or equivalent full-scope registration. Beyond the registration issue, commercial EICRs require experience of three-phase systems, large distribution boards, and specialist installations that a domestic-only electrician may not have. The honest answer is: if you only have domestic experience, you should gain commercial experience under supervision before taking on commercial EICRs independently.',
  },
  {
    question: 'What happens if a commercial EICR is unsatisfactory?',
    answer:
      'If a commercial EICR returns an unsatisfactory result (any C1 or C2 observation codes), the building owner or employer has a duty to arrange remedial work. Unlike the specific 28-day deadline in the private rented sector regulations for domestic properties, there is no single statutory deadline for commercial premises. However, the duty to maintain safe electrical systems under the Electricity at Work Regulations 1989 is absolute for C1 (Danger Present) defects — these represent an immediate risk of injury and must be addressed immediately. The inspector should make C1 defects safe before leaving (for example, by isolating a dangerous circuit). C2 (Potentially Dangerous) defects should be remedied as soon as practicable. In practice, building owners should treat the remedial timeline seriously: if an incident occurs after a C1 or C2 defect has been identified but not rectified, the building owner faces potential prosecution under the Health and Safety at Work Act 1974, with the unsatisfactory EICR serving as evidence that the risk was known. Insurance companies may also refuse to pay claims if the installation was known to have defects that were not remedied. After remedial work is completed, a qualified person should confirm in writing that the work has been carried out satisfactorily, and the relevant observations on the EICR should be updated.',
  },
  {
    question: 'How much does a commercial EICR cost?',
    answer:
      'The cost of a commercial EICR depends on the size and complexity of the installation. A small retail unit or office with a single three-phase distribution board and 20 to 30 circuits might cost £300 to £600. A medium-sized commercial premises with multiple distribution boards and 50 to 100 circuits could cost £800 to £2,000. A large commercial building with main distribution boards, sub-distribution boards across multiple floors, and hundreds of circuits could cost £3,000 to £10,000 or more. Industrial premises with heavy machinery, specialist systems, and hazardous areas command higher prices due to the additional complexity, time, and risk. These prices are for the inspection only — remedial work is priced separately. When pricing a commercial EICR, consider the number of distribution boards, the total number of circuits, whether three-phase testing is required, whether the inspection can be carried out during working hours or requires out-of-hours access, the travel distance, and the complexity of the installation. Access requirements (working at height to reach distribution boards in ceiling voids or plant rooms) also affect the price.',
  },
  {
    question: 'Can sections of a commercial installation be inspected at different times?',
    answer:
      'Yes, and this is common practice on large commercial installations. BS 7671 allows the inspection to be divided into sections, with each section covered by its own schedule of test results and observations. This approach is practical for large buildings where inspecting the entire installation in one visit would be disruptive or impractical. For example, you might inspect floor by floor, or by area (offices, kitchen, plant room, external), or by distribution board. Each section must be inspected and tested to the same standard — the fact that you are splitting the work does not reduce the scope or rigour of the inspection. The overall EICR should reference all sections and provide an overall assessment of the installation. The limitation or scope section of the EICR must clearly state what was inspected and what was excluded. This approach also helps with business disruption: you can arrange to inspect different areas on different days, minimising the impact on the building occupants. When pricing, factor in the additional mobilisation time and administration for multi-visit inspections.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Legal requirements for domestic landlord EICRs under the 2020 Regulations, penalties, and deadlines.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'In-depth guide to C1, C2, C3, and FI classification codes with real examples from commercial and domestic inspections.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrician-guide',
    title: 'Commercial Electrician Guide',
    description:
      'Complete guide to working as a commercial electrician — qualifications, pricing, CDM, and working with main contractors.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'BS 5839-1 compliance, system categories, and digital fire alarm certification for commercial premises.',
    icon: Flame,
    category: 'Certificate',
  },
  {
    href: '/guides/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description:
      'BS 5266 requirements, testing schedules, and emergency lighting certification for commercial buildings.',
    icon: Lightbulb,
    category: 'Certificate',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description:
      'Step-by-step guide to completing every section of the EICR form correctly, including commercial installations.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-commercial-eicr',
    heading: 'What Is a Commercial EICR?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) for commercial premises is a formal
          document produced following a periodic inspection and testing of the fixed electrical
          installation in a non-domestic building. It records the condition of the entire fixed
          electrical system — from the incoming supply and main distribution board through to every
          sub-distribution board, circuit, accessory, and fixed piece of equipment in the building.
        </p>
        <p>
          The EICR follows the same model forms set out in Appendix 6 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          that are used for domestic inspections, but the scale and complexity are significantly
          greater. A commercial EICR may cover multiple distribution boards across several floors,
          three-phase supplies, hundreds of individual circuits, specialist installations (kitchens,
          server rooms, plant areas), and life safety systems such as fire alarm and emergency
          lighting supplies.
        </p>
        <p>
          The purpose of the commercial EICR is the same as a domestic one: to assess the condition
          of the electrical installation, identify any defects that could cause a risk of injury,
          and provide a formal record that can be used to demonstrate compliance with legal
          obligations. However, the consequences of non-compliance are often more severe for
          commercial premises because of the number of people potentially at risk — employees,
          customers, visitors, and members of the public.
        </p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    heading: 'Legal Requirements for Commercial Electrical Inspections',
    content: (
      <>
        <p>
          Unlike the private rented sector (where the 2020 Regulations explicitly mandate EICRs
          every 5 years), the legal requirement for commercial electrical inspections comes from
          multiple overlapping pieces of legislation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — Regulation 4(2) states: "As
                may be necessary to prevent danger, all systems shall be maintained so as to
                prevent, so far as is reasonably practicable, such danger." This is the primary
                legislation that underpins the requirement for periodic inspection and testing of
                commercial electrical installations. The HSE (Health and Safety Executive)
                recognises the EICR as the standard method of demonstrating compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974</strong> — Section 2 places a general
                duty on employers to ensure, so far as is reasonably practicable, the health,
                safety, and welfare of their employees. Section 3 extends this duty to non-employees
                who may be affected by the employer's activities. A safe electrical installation is
                a fundamental part of meeting these duties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — requires the
                "responsible person" (typically the employer or building owner) to carry out a fire
                risk assessment and take measures to reduce the risk of fire. The condition of the
                electrical installation is a key factor in fire risk, and a current EICR provides
                evidence that the electrical system has been inspected and is not a fire hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> — require
                employers to carry out risk assessments covering all significant risks, including
                electrical hazards. The EICR is an integral part of the electrical risk assessment
                process.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The combined effect of these regulations is clear: employers and building owners have a
          legal duty to ensure their electrical installations are safe, and a periodic EICR is the
          recognised method of demonstrating that duty has been discharged. While none of these
          statutes specifically mentions "EICR" by name, the HSE, insurance companies, fire risk
          assessors, and enforcement authorities all treat the EICR as the standard evidence of
          compliance.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-frequency',
    heading: 'How Often Should Commercial Premises Be Inspected?',
    content: (
      <>
        <p>
          The recommended inspection frequency for commercial electrical installations is set out in
          IET Guidance Note 3 (GN3: Inspection and Testing) and Table 3.2 of the IET Code of
          Practice for In-Service Inspection and Testing. The general recommendation is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises (general):</strong> every 5 years. This covers offices,
                shops, retail units, restaurants, hotels, and similar low-risk commercial
                environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial premises:</strong> every 3 years. Factories, workshops,
                warehouses with heavy machinery, and premises where the electrical installation is
                subject to wear, vibration, or environmental factors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leisure and entertainment venues:</strong> every 3 years. Theatres, cinemas,
                nightclubs, and leisure centres with high public footfall and complex lighting and
                AV systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hospitals and healthcare:</strong> every 5 years (with annual checks on
                certain life-critical systems). Medical locations have additional requirements under
                BS 7671 Part 7, Section 710.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Petrol stations and similar high-risk locations:</strong> every 1 to 3
                years, depending on the specific risk assessment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval based on the condition of the installation.
          If the installation is old, in poor condition, or has been subject to modifications that
          raise concerns, the inspector may recommend the next inspection in 1 to 3 years rather
          than 5. The building owner should follow the recommendation on the EICR.
        </p>
        <p>
          Insurance companies are increasingly strict about EICR compliance. Many commercial
          insurance policies include a condition requiring a current EICR — if the installation has
          not been inspected within the recommended period and an incident occurs, the insurer may
          refuse to pay the claim.
        </p>
      </>
    ),
  },
  {
    id: 'differences-from-domestic',
    heading: 'How Commercial EICRs Differ from Domestic',
    content: (
      <>
        <p>
          While the EICR form and fundamental inspection process are the same, commercial EICRs
          present unique challenges that domestic electricians may not encounter. Understanding
          these differences is essential before taking on commercial inspection work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase systems</strong> — commercial premises typically have a
                three-phase 400V supply. You need to test three-phase distribution boards,
                understand phase rotation, assess phase balance, and use test instruments rated for
                three-phase systems. Earth fault loop impedance and prospective fault current
                readings are taken on all three phases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple distribution boards</strong> — a commercial installation may have a
                main distribution board feeding multiple sub-distribution boards on different floors
                or in different areas. Sub-mains, rising mains, and busbar trunking interconnect the
                distribution system. Every board and every circuit must be inspected and tested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hundreds of circuits</strong> — a large commercial installation can easily
                have 200 to 500+ individual circuits. The schedule of test results runs to many
                pages. Systematic recording and data management are essential — this is where
                digital tools like Elec-Mate provide a significant advantage over paper forms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business disruption</strong> — isolating circuits in a commercial building
                during working hours disrupts business operations. Many commercial EICRs are carried
                out outside normal working hours (evenings, weekends, or during holiday shutdowns)
                to minimise disruption. This affects pricing and logistics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist systems</strong> — commercial buildings often contain specialist
                electrical systems that require specific knowledge: fire alarm supplies, emergency
                lighting, UPS systems, standby generators, lift supplies, commercial kitchen
                equipment, server room power distribution, and BMS (Building Management Systems).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The time required for a commercial EICR varies enormously. A small shop with one
          distribution board might take half a day. A multi-storey office building with main and
          sub-distribution boards, hundreds of circuits, and specialist systems could take 3 to 5
          days. A large industrial premises or hospital might require a team of inspectors working
          over several weeks.
        </p>
      </>
    ),
  },
  {
    id: 'who-can-carry-out',
    heading: 'Who Can Carry Out a Commercial EICR?',
    content: (
      <>
        <p>
          The person carrying out a commercial EICR must be competent — meaning they have sufficient
          knowledge, skill, and experience to carry out the work safely and produce an accurate
          report. In practice, this means:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered with a full-scope competent person scheme</strong> — NICEIC
                Approved Contractor, NAPIT Full Scope, or ELECSA Full Scope. The Domestic Installer
                scheme does not cover commercial premises. Building owners and facilities managers
                will check your registration level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holds C&G 2391 or equivalent</strong> — the Inspection, Testing and
                Certification of Electrical Installations qualification. This is essential for
                anyone carrying out periodic inspections. Without it, you should not be signing off
                EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holds the 18th Edition qualification</strong> (C&G 2382-22) — confirms
                knowledge of the current edition of BS 7671. Required by all competent person
                schemes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience of commercial installations</strong> — understanding three-phase
                systems, large distribution boards, specialist equipment, and the specific
                challenges of inspecting commercial buildings. This comes from working on commercial
                sites, not from qualifications alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adequate insurance</strong> — public liability insurance of at least £5
                million (many commercial clients require £10 million) and professional indemnity
                insurance covering the inspection and reporting work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When a building owner or facilities manager selects an electrician for a commercial EICR,
          they will typically ask for evidence of scheme registration, qualifications, insurance,
          and references from similar commercial inspection work. Some larger organisations use
          approved supplier lists and require pre-qualification through systems like
          Constructionline or SafeContractor before allowing you to tender.
        </p>
      </>
    ),
  },
  {
    id: 'scope-and-extent',
    heading: 'Scope and Extent of Inspection',
    content: (
      <>
        <p>
          Before starting a commercial EICR, the inspector must agree the scope and extent of the
          inspection with the building owner or their representative. This is recorded on the EICR
          form in the "extent and limitations" section and is a critical part of the report.
        </p>
        <p>
          The scope defines what is included in the inspection — which distribution boards, which
          areas of the building, and which systems. The extent defines how deep the inspection goes
          — whether sampling is used (testing a percentage of circuits rather than every single one)
          and whether any areas are excluded due to access restrictions or other limitations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full inspection</strong> — every distribution board, every circuit, every
                accessible accessory. This is the most thorough approach and provides the most
                complete picture of the installation's condition. It is also the most time-consuming
                and expensive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sampled inspection</strong> — a percentage of circuits are tested (typically
                10% to 25%), with the inspector selecting a representative sample across different
                circuit types, ages, and locations. If the sample reveals issues, the sample size is
                increased. Sampling is common on very large installations where testing every
                circuit would be impractical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations</strong> — any areas that cannot be accessed, circuits that
                cannot be isolated (life-critical systems, server rooms that cannot be powered
                down), and any other restrictions must be clearly recorded on the EICR. The
                limitations section is not a formality — it protects both the inspector and the
                building owner by defining exactly what was and was not covered.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The agreed scope and extent should be confirmed in writing before the inspection begins.
          This avoids disputes about what was included, helps with pricing, and ensures the building
          owner understands what they are getting. For large installations, a pre-inspection site
          visit is advisable to assess the scope, identify access requirements, and plan the
          inspection programme.
        </p>
      </>
    ),
  },
  {
    id: 'reporting-and-obligations',
    heading: 'Reporting to the Building Owner or Employer',
    content: (
      <>
        <p>
          Once the commercial EICR is complete, the inspector has a duty to provide the report to
          the person who commissioned the inspection — typically the building owner, employer, or
          facilities manager. The report should be clear, accurate, and delivered promptly.
        </p>
        <p>The EICR must include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Details of the installation (address, purpose of premises, supply characteristics,
                earthing arrangements, number of distribution boards, number of circuits).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The extent and limitations of the inspection — what was covered and what was not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The schedule of inspections — a systematic record of visual inspections covering the
                condition of wiring, accessories, protective devices, earthing, bonding, and
                enclosures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The schedule of test results — measured values for continuity, insulation
                resistance, polarity, earth fault loop impedance, prospective fault current, and RCD
                operation for every tested circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Observations — any defects or departures from the current edition of BS 7671,
                classified as C1, C2, C3, or FI with the corresponding regulation reference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The overall assessment — Satisfactory or Unsatisfactory — and the recommended date
                of the next inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The building owner should retain the EICR as part of their building safety records. It
          should be available for review by insurance companies, fire risk assessors, HSE
          inspectors, prospective buyers or tenants, and anyone else with a legitimate interest in
          the safety of the premises. Keeping a clear record of all EICRs, remedial work, and
          electrical certificates is a fundamental part of good building management.
        </p>
        <SEOAppBridge
          title="Send the commercial EICR from site"
          description="Complete the EICR on your phone, export it as a professional PDF, and send it to the building manager by email or WhatsApp before you leave the premises. Include the invoice. No evening desk work."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'insurance-requirements',
    heading: 'Insurance and Compliance Considerations',
    content: (
      <>
        <p>
          Insurance is a critical consideration for both the building owner and the electrician
          carrying out the commercial EICR.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">For Building Owners</h3>
            <p className="text-white text-sm leading-relaxed">
              Most commercial property and business insurance policies include conditions relating
              to electrical safety. Common conditions include maintaining a current EICR (typically
              no older than 5 years), carrying out remedial work identified in the EICR within a
              specified timeframe, and ensuring all electrical work is carried out by competent
              persons. Failure to comply with these conditions can result in the insurer refusing to
              pay a claim in the event of an electrical incident — even if the incident is unrelated
              to the specific defect. Review your insurance policy conditions carefully and ensure
              your EICR programme is up to date.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">For Electricians</h3>
            <p className="text-white text-sm leading-relaxed">
              If you are carrying out commercial EICRs, you need adequate insurance cover. Public
              liability insurance of at least £5 million (many commercial clients require £10
              million) covers you if your work causes injury or damage. Professional indemnity
              insurance covers you if your inspection report is inaccurate or incomplete — for
              example, if you miss a defect that later causes an incident. Ensure your insurance
              covers the type and scale of commercial work you are undertaking. Some policies
              exclude certain types of premises (for example, healthcare or industrial sites) or
              have lower limits for specific activities.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance',
    content: (
      <>
        <p>
          The penalties for failing to maintain safe electrical installations in commercial premises
          can be severe. Unlike the domestic private rented sector, where penalties are capped at
          £30,000, commercial enforcement comes under general health and safety legislation — where
          penalties are potentially unlimited.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HSE enforcement</strong> — the Health and Safety Executive can issue
                improvement notices (requiring remedial action within a specified period),
                prohibition notices (requiring immediate cessation of a dangerous activity), and
                prosecutions. For serious breaches, the HSE can prosecute under the Health and
                Safety at Work Act 1974, with unlimited fines and potential custodial sentences for
                individuals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sentencing guidelines</strong> — since February 2016, health and safety
                sentencing guidelines have resulted in dramatically higher fines for organisations.
                Fines of £100,000 to £1 million are not uncommon for medium and large organisations
                convicted of health and safety offences. For very serious cases involving death or
                serious injury, fines can exceed £10 million.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety enforcement</strong> — the local fire and rescue authority
                enforces the Regulatory Reform (Fire Safety) Order 2005. If a fire risk assessment
                identifies that the electrical installation is in poor condition and no EICR is
                available, the authority can issue enforcement notices or prosecute the responsible
                person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil liability</strong> — if an employee or member of the public suffers
                injury due to a faulty electrical installation, the building owner or employer faces
                civil claims for compensation. The absence of a current EICR would be strong
                evidence of negligence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The message is clear: maintaining a current EICR for commercial premises is not just good
          practice — it is essential risk management. The cost of periodic inspection and testing is
          negligible compared to the potential consequences of an electrical incident in a building
          with no evidence of maintenance.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-commercial-eicr',
    heading: 'Elec-Mate for Commercial EICRs',
    content: (
      <>
        <p>
          Elec-Mate's EICR module is designed to handle commercial installations of any size. Here
          is how it makes commercial EICRs faster and more accurate:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  AI Board Scanner for Commercial Boards
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Point your phone at each distribution board — the AI reads the circuit details,
                  protective device ratings, and board layout from the photograph. Works on
                  commercial distribution boards from all major manufacturers. Populates the
                  schedule of circuits automatically, saving significant time on large
                  installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Unlimited Circuits and Multi-Board Support
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  No limit on the number of circuits or distribution boards you can add to a single
                  EICR. Add main boards, sub-boards, and hundreds of circuits. The schedule of test
                  results scrolls smoothly and stays responsive regardless of size. Perfect for
                  large commercial installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Remedial Estimator for Commercial Defects
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds into the remedial works estimator. It
                  prices each fix with commercial labour rates and trade material costs. Present the
                  building owner with the EICR and a costed remedial programme in the same meeting.
                  No second visit for a quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Send EICR + Invoice from Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Export the completed EICR as a professional PDF. Send it to the building owner,
                  facilities manager, or managing agent by email or WhatsApp directly from the app.
                  Attach the invoice. The client has everything before you leave the building.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Commercial EICRs, done on site"
          description="Join 430+ UK electricians completing commercial EICRs on their phones. Multi-board support, unlimited circuits, AI board scanner, remedial estimator, and instant delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRForCommercialPage() {
  return (
    <GuideTemplate
      title="EICR for Commercial Premises | Requirements UK"
      description="Complete guide to EICR requirements for commercial premises in the UK. Legal obligations under the Electricity at Work Regulations 1989, Health and Safety at Work Act 1974, inspection frequency, scope of inspection, and how Elec-Mate handles multi-board commercial EICRs."
      datePublished="2025-07-01"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          EICR for Commercial Premises:{' '}
          <span className="text-yellow-400">UK Requirements and Compliance</span>
        </>
      }
      heroSubtitle="Commercial premises must have safe electrical installations under the Electricity at Work Regulations 1989 and the Health and Safety at Work Act 1974. The EICR is the standard method of proving compliance. This guide covers the legal basis, inspection frequency, scope, and how Elec-Mate handles commercial EICRs of any size."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial EICRs"
      relatedPages={relatedPages}
      ctaHeading="Commercial EICRs on Your Phone"
      ctaSubheading="Multi-board support, unlimited circuits, AI board scanner, remedial estimator, and instant PDF delivery. Complete commercial EICRs on site. 7-day free trial, cancel anytime."
    />
  );
}
