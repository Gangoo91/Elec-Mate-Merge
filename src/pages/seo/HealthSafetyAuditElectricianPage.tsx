import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle,
  ClipboardList,
  Users,
  Building2,
  Scale,
  PoundSterling,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/business' },
  { label: 'H&S Audit for Electricians', href: '/health-safety-audit-electrician' },
];

const tocItems = [
  { id: 'cdm-2015', label: 'CDM 2015 Duties for Electricians' },
  { id: 'rams', label: 'RAMS — Risk Assessment and Method Statement' },
  { id: 'permit-to-work', label: 'Permit to Work Systems' },
  { id: 'chas-accreditation', label: 'CHAS Accreditation' },
  { id: 'safe-contractor', label: 'Safe Contractor' },
  { id: 'iso-45001', label: 'ISO 45001 Overview' },
  { id: 'hs-policy', label: 'Health and Safety Policy' },
  { id: 'accident-reporting', label: 'Accident Reporting (RIDDOR)' },
  { id: 'for-electricians', label: 'H&S Tools for Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Construction (Design and Management) Regulations 2015 (CDM 2015) impose specific legal duties on electricians working on construction projects — as designers (if they have design responsibility), contractors, or workers. Understanding your role under CDM is a legal obligation, not a choice.',
  'A Risk Assessment and Method Statement (RAMS) is required before starting any non-trivial electrical activity on a commercial site. RAMS must be specific to the activity and site, reviewed by the worker before starting, and signed to confirm understanding.',
  'CHAS (Contractors Health and Safety Assessment Scheme) is the most widely required pre-qualification H&S credential for commercial electrical work in the UK. Without it, most main contractors will not add you to their supply chain.',
  'The Health and Safety at Work etc. Act 1974 requires every employer of five or more people to have a written health and safety policy. Sole traders and partnerships below this threshold are not legally required to have a written policy but should have one for commercial credibility.',
  'ISO 45001 (Occupational Health and Safety Management Systems) is increasingly required for public sector framework contracts and NHS procurement. It represents a significant investment but opens procurement opportunities closed to unaccredited contractors.',
];

const faqs = [
  {
    question: 'What are the CDM 2015 duties for electricians?',
    answer:
      'Under the Construction (Design and Management) Regulations 2015, electricians may have duties as: a designer (if they specify cable types, circuit designs, or containment routes — in which case they must consider buildability, maintenance access, and future flexibility in their designs); a contractor (if they directly employ or manage workers on a notifiable project — in which case they must have a construction phase plan, ensure workers have relevant skills and training, and co-operate with the principal contractor); or a worker (they must follow H&S instructions, report hazards, and co-operate with site H&S management). For notifiable projects (more than 30 working days with more than 20 workers simultaneously, or more than 500 person-days), a principal designer and principal contractor must be appointed. The principal contractor co-ordinates H&S on site; the principal designer manages pre-construction H&S information.',
  },
  {
    question: 'What should a RAMS for electrical work include?',
    answer:
      'A Risk Assessment and Method Statement for electrical work should include: the activity being assessed (e.g. cable installation in a ceiling void); the hazards identified (e.g. working at height, dusty environment, proximity to existing live conductors, manual handling of heavy cable drums); the persons at risk (e.g. operative, other trades working in the area, members of the public); control measures for each hazard (e.g. MEWP or stepladder with three-point contact, dust mask, voltage verification before starting work, cable drum unroller to reduce manual handling strain); the residual risk level after controls; PPE required; emergency procedures; and the name of the person responsible for ensuring the controls are in place. RAMS must be reviewed and signed by the worker before starting the activity.',
  },
  {
    question: 'When is a Permit to Work required for electrical work?',
    answer:
      'A Permit to Work (PTW) is a formal documented system required when: working on or near live conductors that cannot be made safe by isolation alone; working in confined spaces; working at height on complex structures; or working in environments with fire or explosion risk. In hospitals, data centres, and industrial facilities, clients often mandate PTW systems for all electrical work regardless of live working status. A PTW specifies the exact area of work, the isolations made and verified, the controls in place, the authorised workers, and the duration of the permit. Work cannot start until the permit is issued and the worker has signed it. At the end of work, the permit must be signed off and the permit issuer must verify the area is safe before re-energisation.',
  },
  {
    question: 'How do I get CHAS accreditation?',
    answer:
      "To obtain CHAS accreditation: (1) Register on the CHAS portal at chas.co.uk; (2) Select the appropriate accreditation level (Worksafe for sole traders, CHAS Standard for small contractors); (3) Submit your health and safety policy, employer's liability insurance certificate, public liability insurance certificate, and risk assessments for your key activities; (4) A CHAS assessor reviews your submission and may request additional information or amendments; (5) On approval, you receive a CHAS certificate valid for 12 months. Fees start from approximately £300 for sole traders and increase for larger businesses. Renewal is required annually. Many clients accept other SSIP (Safety Schemes in Procurement) member schemes (Safe Contractor, Constructionline, Acclaim) in place of CHAS.",
  },
  {
    question: 'Do I need a health and safety policy as an electrician?',
    answer:
      'The Health and Safety at Work etc. Act 1974 requires employers of five or more employees to have a written health and safety policy covering: your general policy on H&S; the organisation (who is responsible for what); and the arrangements (how you will achieve your policy objectives). Sole traders with no employees are not legally required to have a written policy, but having one significantly improves your credibility with main contractors and clients, and is required for CHAS, Safe Contractor, and Constructionline accreditation. Review and re-sign your policy at least annually.',
  },
  {
    question: 'What is ISO 45001 and do I need it?',
    answer:
      "ISO 45001 is the international standard for Occupational Health and Safety Management Systems. It replaces the previous OHSAS 18001 standard. Certification demonstrates that you have a systematic, audited approach to managing H&S in your business — not just individual policies and procedures but an integrated management system. It is required by some public sector framework contracts, NHS procurement frameworks, and large private sector clients above certain contract value thresholds. Obtaining ISO 45001 requires a gap analysis, implementation of any missing system elements, an internal audit, and a third-party certification audit by an accredited body (BSI, Bureau Veritas, Lloyd's Register, and others). Cost typically ranges from £2,000 to £8,000 for implementation and certification depending on business size.",
  },
  {
    question: 'What must I report under RIDDOR as an electrical contractor?',
    answer:
      'The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) require you to report to the HSE: any worker death arising from a work-related accident; specified injuries to workers (fractures, amputations, loss of sight, serious burns, and others listed in RIDDOR); any injury requiring hospitalisation for more than 24 hours; occupational diseases (including certain skin conditions and hand-arm vibration syndrome); and dangerous occurrences (near misses that could have caused death or specified injury). Reports are made online via the HSE website. You must also keep records of all reportable incidents for at least three years. Failure to report is a criminal offence under health and safety law.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tender-writing-electrician',
    title: 'Tender Writing Guide',
    description:
      'How to price and write winning commercial electrical tenders including H&S sections.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/subcontracting-guide',
    title: 'Subcontracting Guide',
    description: 'Finding main contractors and CHAS pre-qualification for subcontract work.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/electrical-framework-contracts',
    title: 'Framework Contracts',
    description: 'How to get on local authority and NHS approved contractor lists.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/contract-templates-electrician',
    title: 'Contract Templates',
    description: 'Customer contracts, payment schedules, and variation orders for electricians.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Build professional quotes with materials pricing and instant PDF export.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'cdm-2015',
    heading: 'CDM 2015 Duties for Electrical Contractors',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 (CDM 2015) are the principal
          health and safety regulations for the UK construction industry. They apply to all
          construction work, including electrical installation, and impose duties on every party
          involved — clients, designers, contractors, and workers.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician as designer</strong> — if you make any design decisions (cable
                type selection, circuit layouts, containment routes), you have designer duties under
                CDM 2015. You must consider buildability, safe access for maintenance, and future
                flexibility during the design process, and provide pre-construction information
                relevant to your design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician as contractor</strong> — if you employ or manage workers on a
                construction project, you are a contractor under CDM 2015. You must: plan, manage
                and monitor the work under your control; ensure workers have the right skills,
                knowledge, and training; comply with any construction phase plan; and co-operate
                with the principal contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable projects</strong> — a project is notifiable to the HSE if it will
                last more than 30 working days with more than 20 workers simultaneously, or exceed
                500 person-days of construction work. On notifiable projects, a principal designer
                and principal contractor must be appointed. The notification is the client's
                responsibility, but contractors should ensure it has been done.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction phase plan</strong> — the principal contractor must produce a
                construction phase plan before any construction work begins. As an electrical
                subcontractor, you must comply with the plan and contribute information about your
                activities to it.
              </span>
            </li>
          </ul>
        </div>
        <p>
          CDM 2015 compliance is not optional — HSE inspectors carry out regular site inspections
          and can issue improvement notices, prohibition notices, or prosecute in cases of serious
          breach. Fines for CDM breaches can run to hundreds of thousands of pounds.
        </p>
      </>
    ),
  },
  {
    id: 'rams',
    heading: 'RAMS — Risk Assessment and Method Statement',
    content: (
      <>
        <p>
          A Risk Assessment and Method Statement (RAMS) is the foundational H&amp;S document for any
          electrical activity on a commercial site. It demonstrates that you have thought
          systematically about the hazards involved in your work and have planned how to manage
          them. Main contractors require approved RAMS before you can start work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk Assessment</strong> — identifies each hazard associated with the
                activity, assesses the likelihood and severity of harm, identifies who is at risk,
                and specifies control measures that reduce the risk to an acceptable level. Use the
                hierarchy of controls: eliminate, substitute, isolate, control, PPE (in that order
                of preference).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method Statement</strong> — describes the sequence and method of work, step
                by step. It translates the risk assessment controls into a practical procedure.
                Workers must read and sign the method statement before starting work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Activity-specific RAMS</strong> — common activities requiring separate RAMS
                include: cable installation and termination; working at height (on ladders, MEWPs,
                scaffolding); working in confined spaces; work on or near live conductors (live
                working RAMS); installation of consumer units and distribution boards; testing and
                commissioning; and use of power tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review and sign-off</strong> — RAMS must be reviewed by workers before
                starting the activity, not simply filed. Many sites require workers to sign a RAMS
                briefing sheet. Keep signed copies as a record.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/rams-generator">Elec-Mate RAMS generator</SEOInternalLink>{' '}
          to produce professional, activity-specific RAMS quickly. Building a library of approved
          RAMS that can be customised for each site and contract is the most time-efficient approach
          for electricians working on multiple commercial sites.
        </p>
      </>
    ),
  },
  {
    id: 'permit-to-work',
    heading: 'Permit to Work Systems',
    content: (
      <>
        <p>
          A Permit to Work (PTW) is a formal documented system used to manage high-risk activities
          where the normal risk assessment and method statement process provides insufficient
          control. In electrical work, PTW systems are mandatory in many regulated environments.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>When PTW is required</strong> — live working where energised conductors must
                be accessed (only where de-energisation is not reasonably practicable); work in
                confined spaces; electrical work in explosion-risk areas (ATEX zones); work in
                hospitals, data centres, or other facilities where power interruption carries
                life-safety or operational risk; and any high-voltage work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PTW components</strong> — a valid PTW specifies: the exact equipment or area
                of work; all isolations made and verified (proved dead by a suitably rated test
                instrument before work commences); earthing applied where required; the names of
                authorised workers; the duration of the permit; the controls required; and the
                sign-off process for returning equipment to service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation procedure</strong> — for all electrical work, follow the safe
                isolation procedure before touching any conductor: identify the correct isolation
                point; isolate and lock off (use a lock and hasp system); prove dead at the point of
                work using a suitably rated approved voltage indicator; and test the voltage
                indicator before and after use (on a known live source). This procedure must be
                followed even when a PTW is in place.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Electricity at Work Regulations 1989 (Regulation 14) permits live working only where
          it is "unreasonable in all the circumstances" to work dead. "Unreasonable" is a very high
          bar — the HSE's guidance makes clear that live working should be the exception, not the
          norm.
        </p>
      </>
    ),
  },
  {
    id: 'chas-accreditation',
    heading: 'CHAS Accreditation for Electrical Contractors',
    content: (
      <>
        <p>
          CHAS (Contractors Health and Safety Assessment Scheme) is a Safety Schemes in Procurement
          (SSIP) member scheme and is the most widely recognised H&amp;S pre-qualification
          credential in UK construction. It is accepted by over 50,000 buyers as evidence of H&amp;S
          competence.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>CHAS assessment criteria</strong> — your H&amp;S policy and management
                arrangements; risk assessment procedures; method statement procedures; employer's
                liability insurance (minimum £5m); public liability insurance (minimum £2m, though
                many clients require £5m or £10m); accident reporting procedures; worker training
                and competency records; and sub-contractor management.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>SSIP mutual recognition</strong> — CHAS is an SSIP member scheme, meaning
                assessments are mutually recognised across all other SSIP member schemes (Safe
                Contractor, Constructionline Health and Safety, Acclaim, and others). If you hold a
                current CHAS certificate, you can apply for other SSIP schemes at a reduced fee
                using the dossier route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual renewal</strong> — CHAS certificates must be renewed annually. Set a
                renewal reminder 60 days before expiry. A lapse in CHAS certification can result in
                being removed from client supply chain registers until renewed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'safe-contractor',
    heading: 'Safe Contractor Accreditation',
    content: (
      <>
        <p>
          Safe Contractor (operated by Alcumus) is an alternative SSIP H&amp;S accreditation widely
          accepted by facilities management contractors, retail sector clients, housing
          associations, and NHS trusts. Some clients specify Safe Contractor rather than CHAS.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessment process</strong> — similar to CHAS, Safe Contractor assesses your
                H&amp;S policy, risk assessment procedures, insurance evidence, training records,
                and accident reporting procedures. The assessment can be conducted online with
                document upload or via an on-site audit for higher-risk categories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify database</strong> — Safe Contractor is part of the Alcumus Verify
                platform, used by many FM contractors and housing associations to check
                subcontractor pre-qualification status in real time. Registration on Verify exposes
                your credentials to a wider pool of potential clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Which scheme to choose</strong> — if you are targeting national main
                contractors and public sector work, CHAS combined with Constructionline Gold is the
                strongest combination. If you are targeting FM, housing, and retail clients, Safe
                Contractor may be more appropriate. Many established electrical contractors hold
                both.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'iso-45001',
    heading: 'ISO 45001 — Occupational Health and Safety Management Systems',
    content: (
      <>
        <p>
          ISO 45001 is the international standard for Occupational Health and Safety Management
          Systems (OH&amp;SMS). It replaced OHSAS 18001 in 2018 and is the most comprehensive
          H&amp;S management certification available to electrical contractors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What ISO 45001 requires</strong> — a documented OH&amp;S management system
                covering: leadership commitment; worker participation; hazard identification and
                risk assessment; operational controls; emergency preparedness; performance
                evaluation; and continual improvement. The standard uses the same Plan-Do-Check-Act
                (PDCA) framework as ISO 9001 and ISO 14001.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who needs it</strong> — ISO 45001 is required for some public sector
                procurement frameworks, NHS supply chains above certain value thresholds, and large
                private sector framework contracts. If you are targeting this tier of work, ISO
                45001 is a necessary investment. For smaller commercial and domestic work, CHAS is
                sufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integrated management systems</strong> — many electrical contractors
                pursuing ISO 45001 also obtain ISO 9001 (quality management) and ISO 14001
                (environmental management) simultaneously, since the three standards share a common
                framework. An integrated management system (IMS) is more efficient to implement and
                maintain than three separate systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          ISO 45001 certification is maintained through annual surveillance audits and a full
          recertification audit every three years. Choose an accredited certification body
          (UKAS-accredited for UK credibility) — BSI, Bureau Veritas, SGS, and Lloyd's Register are
          among the most recognised in the construction sector.
        </p>
      </>
    ),
  },
  {
    id: 'hs-policy',
    heading: 'Health and Safety Policy for Electrical Contractors',
    content: (
      <>
        <p>
          A health and safety policy is the foundation of your H&amp;S management system. It
          demonstrates your commitment to managing H&amp;S and sets the framework for all your other
          H&amp;S procedures and arrangements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Policy statement</strong> — a signed statement from the most senior person
                in the business (sole trader, director, or partner) committing the organisation to:
                providing a safe working environment; complying with H&amp;S legislation; consulting
                with workers on H&amp;S matters; and continually improving H&amp;S performance.
                Review and re-sign at least annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Organisation</strong> — who in your business is responsible for what:
                H&amp;S management responsibilities by role; the name of your competent person for
                H&amp;S (which can be yourself if you have relevant training and experience); and
                how you consult with workers (safety representatives, toolbox talks, briefings).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arrangements</strong> — your specific procedures for: risk assessment and
                method statements; accident reporting under RIDDOR; fire safety; first aid
                provision; manual handling; working at height; asbestos awareness; electrical safety
                (safe isolation); PPE provision and use; training and competency assessment; and
                sub-contractor management.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'accident-reporting',
    heading: 'Accident Reporting — RIDDOR',
    content: (
      <>
        <p>
          The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR)
          require employers (including self-employed sole traders) to report certain workplace
          accidents, diseases, and dangerous occurrences to the HSE. Failure to report is a criminal
          offence.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to report</strong> — worker deaths (immediate report); specified
                injuries (amputation, fractures other than fingers/thumbs/toes, loss of
                consciousness, serious burns covering more than 10 per cent of the body); worker
                incapacitation for more than seven consecutive days; occupational diseases including
                carpal tunnel syndrome, vibration white finger, and occupational deafness; and
                dangerous occurrences (near misses that could have caused specified injury or
                death).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to report</strong> — via the HSE website (riddor.gov.uk). Deaths and
                specified injuries must be reported immediately by phone or online. Over-seven-day
                incapacitation must be reported within 15 days. Keep a record of all reports for at
                least three years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accident book</strong> — maintain an accident book (or equivalent record)
                for all work-related incidents, including those that do not require RIDDOR
                reporting. Your CHAS and ISO 45001 assessors will check your accident records as
                part of the assessment process.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'H&S Documentation Tools for Electricians',
    content: (
      <>
        <p>
          Maintaining current, professional H&amp;S documentation is time-consuming but essential
          for commercial work. The right tools reduce the administrative burden and improve the
          quality of your submissions.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardList className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI-Generated RAMS</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional, activity-specific RAMS using the Elec-Mate AI assistant.
                  Describe the activity and site conditions; the AI produces a draft RAMS aligned
                  with current legislation and best practice. Review, customise, and export to PDF
                  for submission. Build a library of approved RAMS for your most common activities.
                  See also the{' '}
                  <SEOInternalLink href="/subcontracting-guide">
                    subcontracting guide
                  </SEOInternalLink>{' '}
                  for how RAMS fit into your pre-qualification documentation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">H&S Policy and Procedure Templates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Access professional H&amp;S policy templates and procedure documents through
                  Elec-Mate. Customise to your business and maintain a library of current, signed
                  documents ready for CHAS, Safe Contractor, and Constructionline submissions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Build professional H&S documentation with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for AI-generated RAMS, H&S policy templates, and business management tools. Win more commercial work with better documentation. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HealthSafetyAuditElectricianPage() {
  return (
    <GuideTemplate
      title="Health & Safety Audit for Electrical Contractors | H&S Documentation"
      description="CDM 2015 duties for electricians, RAMS (Risk Assessment and Method Statement), Permit to Work systems, CHAS accreditation, Safe Contractor, ISO 45001, health and safety policy, and RIDDOR reporting for UK electrical contractors."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="H&S Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Health and Safety for Electrical Contractors:{' '}
          <span className="text-yellow-400">CDM 2015, RAMS, and CHAS</span>
        </>
      }
      heroSubtitle="CDM 2015 duties for electricians, how to write RAMS for commercial electrical work, Permit to Work systems, CHAS and Safe Contractor accreditation, ISO 45001 overview, and RIDDOR accident reporting — everything UK electrical contractors need for commercial H&S compliance."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About H&S for Electrical Contractors"
      relatedPages={relatedPages}
      ctaHeading="Build Professional H&S Documentation with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-generated RAMS, H&S templates, and business tools. Win more commercial work with better documentation. 7-day free trial, cancel anytime."
    />
  );
}
