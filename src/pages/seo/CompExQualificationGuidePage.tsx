import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BadgeCheck,
  GraduationCap,
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-certificate-types-uk' },
  { label: 'CompEx Qualification', href: '/guides/compex-qualification-guide' },
];

const tocItems = [
  { id: 'overview', label: 'What is CompEx?' },
  { id: 'units', label: 'CompEx Units: EX01 to EX07' },
  { id: 'assessment', label: 'Assessment Process' },
  { id: 'training-centres', label: 'Approved Training Centres' },
  { id: 'cost', label: 'Cost and Duration' },
  { id: 'why-needed', label: 'Why CompEx is Needed: DSEAR' },
  { id: 'career-benefits', label: 'Career Benefits' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'CompEx (Competency in Explosive Atmospheres) is the UK industry-standard qualification for electricians, instrument technicians, and engineers working in explosive atmospheres. It is administered by EAL (Awards for Business and Industry) under the CompEx Certification Scheme.',
  'The core units for electricians are EX01 to EX04, covering the installation and inspection of electrical equipment in hazardous areas with gas/vapour atmospheres (Zones 0, 1, and 2). EX05 to EX07 cover instrumentation, process control, and data communications in hazardous areas.',
  'CompEx assessment is competency-based and work-based — it is not a theoretical exam. Candidates are assessed by an independent assessor on practical tasks, knowledge questions, and a portfolio of evidence from workplace practice.',
  'The cost of CompEx training and assessment typically ranges from £1,500 to £3,000 for the core electrician units (EX01–EX04), depending on the training centre and whether the candidate requires pre-assessment refresher training.',
  'DSEAR Regulation 7 requires that work in hazardous areas is carried out by competent persons. CompEx is the recognised standard for demonstrating this competency, and most major oil and gas, chemical, and offshore operators will not permit ATEX electrical work without a current CompEx certificate.',
];

const faqs = [
  {
    question: 'What is CompEx and who needs it?',
    answer:
      'CompEx (Competency in Explosive Atmospheres) is a competency assessment scheme for people who work with electrical and instrumentation equipment in potentially explosive atmospheres. It is administered by EAL (Awards for Business and Industry) and is recognised by the Health and Safety Executive (HSE) as an appropriate means of demonstrating competency under DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002). CompEx is needed by electricians and instrument technicians who install, inspect, or maintain electrical equipment in hazardous areas — oil and gas refineries, chemical plants, offshore platforms, distilleries, flour mills, pharmaceutical plants, and other locations where flammable gases, vapours, mists, or combustible dusts may be present. Without CompEx, it is extremely difficult to gain access to formal ATEX electrical contracts with major operators.',
  },
  {
    question: 'Which CompEx units do I need as an electrician?',
    answer:
      'For electricians working in gas and vapour hazardous areas (Zone 0, Zone 1, Zone 2), the core units are EX01 to EX04. EX01 covers the fundamental principles of explosion protection, zone classification, and equipment selection. EX02 covers the inspection and installation of Ex equipment in Zone 1 and Zone 2 areas. EX03 covers the specific inspection and installation requirements for Zone 0 equipment. EX04 covers testing, verification, and documentation of hazardous area electrical installations. Most employers and clients require all four units (EX01–EX04) before they will permit work in Zone 1 areas. For dust hazardous areas (Zone 20, Zone 21, Zone 22), there are additional dust-specific units. EX05 to EX07 cover instrumentation, loop checking, and data communications in hazardous areas — these are typically taken by instrument technicians rather than electricians, but many experienced engineers hold both sets.',
  },
  {
    question: 'What does the CompEx assessment involve?',
    answer:
      'CompEx is a competency-based assessment, not a traditional qualification with written examinations. The assessment process has two components: a workplace assessment and a knowledge assessment. The workplace assessment requires you to demonstrate practical competency in tasks specific to each unit — for example, installing a certified Ex enclosure, making cable entries with appropriate glands, verifying equipment certification markings, and completing inspection records. The knowledge assessment covers the theoretical underpinning of each unit — legislation (ATEX, DSEAR), zone classification, Ex protection concepts, equipment selection, and the requirements of BS EN 60079-14 and BS EN 60079-17. The assessment is conducted by an EAL-approved independent assessor, either at an approved training centre or in the workplace. Many candidates choose to attend a 5-day preparation course at an approved training centre before formal assessment, though this is not mandatory.',
  },
  {
    question: 'How long is a CompEx certificate valid?',
    answer:
      'A CompEx certificate is valid for 5 years from the date of achievement. To maintain certification, you must complete a CompEx renewal assessment before expiry. The renewal assessment is less extensive than the initial assessment — it verifies that your knowledge and practice remain current. If you allow your CompEx certificate to lapse, you must complete the full initial assessment again. It is strongly recommended to begin the renewal process at least 3 months before expiry to avoid any gap in certification that could prevent you from working on ATEX contracts.',
  },
  {
    question: 'Where can I do CompEx training in the UK?',
    answer:
      'CompEx training and assessment is available through EAL-approved training centres across the UK. Major approved centres include: Cogent Skills (various locations including North East England), the Safety Centre (Aberdeen), Emco Training (various UK locations), STC (Safety Training Centre, Aberdeen — primarily for offshore), and ECS Training (various UK locations). The Oil and Gas Authority and major North Sea operators have historically funded CompEx training through industry training bodies. Aberdeen is the hub for offshore-focused CompEx training, reflecting the concentration of oil and gas operations in North East Scotland. Many centres offer the 5-day preparation and assessment course as a single package.',
  },
  {
    question: 'Can I do CompEx if I am not already a qualified electrician?',
    answer:
      'CompEx is not a standalone electrician qualification — it is a competency assessment for people who already have a relevant electrical or instrumentation background. To undertake CompEx for the electrician units (EX01–EX04), you should hold a recognised electrical qualification such as C&G 2360/2365 (Electrical Installations), C&G 2382 (18th Edition), and have at least 3 to 5 years of practical electrical installation experience. Some training centres may accept equivalent experience in place of formal qualifications. CompEx assesses your competency in applying your electrical skills in explosive atmospheres — it does not teach you to be an electrician. If you are not yet qualified, complete your electrical training and gain experience first, then pursue CompEx.',
  },
  {
    question: 'Is CompEx recognised offshore?',
    answer:
      'Yes. CompEx is widely recognised and required for offshore electrical work on North Sea and other UK offshore platforms. The major operators (BP, Shell, TotalEnergies, Harbour Energy, and their principal contractors) typically require CompEx EX01–EX04 as a minimum for electricians working in ATEX zones on offshore installations. CompEx is internationally recognised and accepted in other offshore regions including the Gulf of Mexico and the Middle East, though some regions have additional or different local requirements. For offshore work you will also need the OPITO BOSIET survival training, an OGUK medical, and other offshore certificates.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/atex-hazardous-area-electrical-installations',
    title: 'ATEX Hazardous Area Electrical Installations',
    description:
      'Full technical guide to ATEX zone classification, Ex equipment selection, BS EN 60079-14 and BS EN 60079-17.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/offshore-electrical-work-uk',
    title: 'Offshore Electrical Work UK',
    description:
      'CompEx is essential for offshore. Understand OPITO BOSIET, OGUK medical, and offshore pay rates.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/nuclear-site-electrical-work',
    title: 'Nuclear Site Electrical Work',
    description:
      'Nuclear sites often include ATEX zones requiring CompEx. Understand the additional nuclear vetting requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for hazardous area installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 alongside CompEx preparation.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'Many ATEX sites also have HV systems. Understand HV authorisation and switching.',
    icon: Wrench,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is CompEx and Why Does it Matter?',
    content: (
      <>
        <p>
          CompEx (Competency in Explosive Atmospheres) is the industry-standard competency
          assessment scheme for people who work with electrical and instrumentation systems in
          potentially explosive atmospheres. It is administered by EAL (Awards for Business and
          Industry) and is recognised by the Health and Safety Executive (HSE) as evidence of
          competency under DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002).
        </p>
        <p>
          Without CompEx, an electrician cannot legally be considered competent to carry out work in
          hazardous areas under DSEAR. In practice, this means that major oil and gas operators,
          chemical companies, and their principal contractors will not permit ATEX electrical work
          without a valid CompEx certificate. It is the key that unlocks some of the best-paid
          electrical contracting work available in the UK.
        </p>
        <p>
          For the full technical background on{' '}
          <SEOInternalLink href="/guides/atex-hazardous-area-electrical-installations">
            ATEX hazardous area electrical installations
          </SEOInternalLink>{' '}
          including zone classification, Ex equipment markings, and the installation and inspection
          standards, see the dedicated guide.
        </p>
      </>
    ),
  },
  {
    id: 'units',
    heading: 'CompEx Units: EX01 to EX07',
    content: (
      <>
        <p>
          CompEx is divided into units, each covering a specific aspect of work in explosive
          atmospheres. The units relevant to electricians are EX01 to EX04. EX05 to EX07 are
          primarily for instrument technicians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EX01 — Fundamentals.</strong> Principles of explosion protection, legislation
                (ATEX Directive, DSEAR 2002), zone classification, Ex equipment markings, temperature
                classes, and equipment groups. This is the foundation unit and is required for all
                subsequent units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EX02 — Installation and Inspection (Zone 1 and Zone 2).</strong> Practical
                installation and inspection of Ex equipment in gas/vapour Zone 1 and Zone 2 areas.
                Covers cable glands, conduit seals, enclosure maintenance, and documentation to
                BS EN 60079-14 and BS EN 60079-17.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EX03 — Zone 0 Equipment.</strong> Additional requirements for working with
                Category 1 equipment (Zone 0). Ex ia intrinsic safety in particular. Zener barriers,
                galvanic isolators, and associated apparatus.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EX04 — Testing and Verification.</strong> Testing, verification, and
                certification of hazardous area electrical installations. Completing inspection
                records, producing installation dossiers, and formal sign-off procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EX05–EX07 — Instrumentation.</strong> Instrument loop checking, process
                instrumentation in hazardous areas, data communications, and fieldbus systems in
                explosive atmospheres. Primarily for instrument technicians.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'assessment',
    heading: 'The CompEx Assessment Process',
    content: (
      <>
        <p>
          CompEx is a competency-based assessment — it evaluates what you can actually do, not just
          what you know. The assessment has two components:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Workplace Assessment</h3>
            <p className="text-white text-sm leading-relaxed">
              An EAL-approved assessor observes you carrying out practical tasks relevant to the unit
              being assessed. For EX02, this includes: selecting appropriate Ex equipment for a given
              zone and gas type; installing a certified Ex d enclosure and making correct cable
              entries using certified glands; completing an inspection record to BS EN 60079-17; and
              verifying equipment certification markings. Assessment typically takes one to two days
              per unit.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Knowledge Assessment</h3>
            <p className="text-white text-sm leading-relaxed">
              An oral or written knowledge assessment covering the theoretical underpinning of each
              unit. For EX01, this includes questions on zone classification, Ex markings, temperature
              classes, and legislation. The assessor will probe your understanding of why requirements
              exist, not just what they are. A portfolio of workplace evidence (previous installation
              and inspection records from real work) can support and accelerate the assessment.
            </p>
          </div>
        </div>
        <p>
          Most candidates attend a 5-day preparation course at an approved training centre before
          formal assessment. The course covers the technical content, introduces the assessment
          requirements, and provides hands-on practice with Ex equipment before the formal
          assessment. The 5-day course and assessment are typically packaged together by training
          centres.
        </p>
      </>
    ),
  },
  {
    id: 'training-centres',
    heading: 'Approved Training Centres in the UK',
    content: (
      <>
        <p>
          CompEx training and assessment must be carried out at an EAL-approved centre or by an
          EAL-approved assessor in the workplace. The main approved centres include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cogent Skills</strong> — multiple locations including North East England. The sector skills body for the nuclear and process industries. Highly regarded for CompEx delivery.</span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>STC (Safety Training Centre), Aberdeen</strong> — primary centre for offshore-focused CompEx. Well connected with North Sea operators and contractors.</span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Emco Training</strong> — multiple UK locations. Offers EX01–EX04 as a packaged 5-day course with assessment.</span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>ECS Training</strong> — various UK locations. CompEx alongside broader electrical training programmes.</span>
            </li>
          </ul>
        </div>
        <p>
          The full list of approved training centres is maintained by EAL and can be found on the
          CompEx Certification Scheme website. Always verify that your chosen centre is currently
          approved before booking — approval status can change.
        </p>
      </>
    ),
  },
  {
    id: 'cost',
    heading: 'Cost and Duration',
    content: (
      <>
        <p>
          CompEx is a significant investment, but the return in terms of increased earning potential
          is substantial. Typical costs for the electrician units (EX01–EX04):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>5-day preparation and assessment course:</strong> £1,500–£2,500 at most training centres. This is the most common route and includes all four units.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Workplace assessment only (if you already have experience):</strong> £800–£1,500, depending on the assessor and number of units. Requires a portfolio of workplace evidence.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>EAL registration and certification fees:</strong> Included in most training centre packages. Typically £200–£400 if paying separately.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>5-year renewal assessment:</strong> £500–£1,000. Less extensive than the initial assessment.</span>
            </li>
          </ul>
        </div>
        <p>
          Some employers in the oil and gas sector will fund CompEx training for employees as part of
          a skills development programme. It is worth asking prospective employers about funding
          before self-funding. The upfront cost is recovered quickly — a CompEx-certified electrician
          on a North Sea offshore contract can earn the cost of the qualification in a single week.
        </p>
        <SEOAppBridge
          title="Track your qualifications and certifications"
          description="Elec-Mate's profile tools help you manage your electrical qualifications, training cards, and certification expiry dates. Never miss a renewal deadline for CompEx, ECS, or CCNSG."
          icon={BadgeCheck}
        />
      </>
    ),
  },
  {
    id: 'why-needed',
    heading: 'Why CompEx is Needed: DSEAR and Competency',
    content: (
      <>
        <p>
          The legal basis for CompEx comes from DSEAR (Dangerous Substances and Explosive
          Atmospheres Regulations 2002), specifically Regulation 7, which requires that employers
          ensure that work involving dangerous substances is carried out only by competent persons
          using appropriate equipment and procedures.
        </p>
        <p>
          The HSE's guidance on DSEAR recognises CompEx as an appropriate means of demonstrating
          competency for electrical and instrumentation work in hazardous areas. Major operators
          (Shell, BP, TotalEnergies, INEOS, and others) have adopted CompEx as a contractual
          requirement for all electrical contractors working in ATEX-classified areas on their sites.
          This means that, in practice, CompEx is effectively mandatory for this type of work —
          even though the legislation does not name it explicitly.
        </p>
        <p>
          See the full guide to{' '}
          <SEOInternalLink href="/guides/atex-hazardous-area-electrical-installations">
            ATEX hazardous area electrical installations
          </SEOInternalLink>{' '}
          for the complete legal and technical context.
        </p>
      </>
    ),
  },
  {
    id: 'career-benefits',
    heading: 'Career Benefits: Offshore, Chemical, and Nuclear-Adjacent Work',
    content: (
      <>
        <p>
          CompEx certification opens doors to some of the highest-paid electrical contracting work
          in the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offshore oil and gas:</strong> ATEX zones are pervasive on offshore
                platforms. CompEx-certified offshore electricians earn £600–£1,200 per day. See the{' '}
                <SEOInternalLink href="/guides/offshore-electrical-work-uk">
                  offshore electrical work guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Onshore refineries and chemical plants:</strong> Long-term contract work at
                major UK sites. Rates of £45–£70 per hour for competent ATEX electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuclear sites with ATEX zones:</strong> Many nuclear licensed sites include
                ATEX-classified areas. CompEx plus nuclear clearance is a powerful combination for
                rates of £70–£90+ per hour. See the{' '}
                <SEOInternalLink href="/guides/nuclear-site-electrical-work">
                  nuclear site electrical work guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distilleries, pharmaceuticals, and food processing:</strong> Growing sectors
                with consistent demand for ATEX maintenance. Often more accessible for electricians
                transitioning from domestic or light commercial backgrounds.
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

export default function CompExQualificationGuidePage() {
  return (
    <GuideTemplate
      title="CompEx Qualification Guide UK | Explosive Atmospheres Competency"
      description="Complete guide to CompEx certification for UK electricians. Units EX01–EX04, assessment process, approved training centres, cost (£1,500–£3,000), 5-day assessment, DSEAR competency requirement, and career benefits in offshore, chemical, and nuclear work."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Training Guide"
      badgeIcon={BadgeCheck}
      heroTitle={
        <>
          CompEx Qualification Guide:{' '}
          <span className="text-yellow-400">Explosive Atmospheres Competency for UK Electricians</span>
        </>
      }
      heroSubtitle="CompEx is the industry-standard qualification for working in explosive atmospheres. This guide covers all units (EX01–EX07), the 5-day assessment process, approved training centres, costs, and the career opportunities CompEx unlocks."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CompEx Qualification"
      relatedPages={relatedPages}
      ctaHeading="Manage Your CompEx and Other Electrical Certifications"
      ctaSubheading="Track qualification expiry dates, issue electrical certificates, and manage your professional profile with Elec-Mate. 7-day free trial."
    />
  );
}
