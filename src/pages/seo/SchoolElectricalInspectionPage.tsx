import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  ShieldCheck,
  Clock,
  FileCheck2,
  AlertTriangle,
  ClipboardCheck,
  GraduationCap,
  Wrench,
  Shield,
  Bell,
  Lightbulb,
  CheckCircle,
  Flame,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'School Inspections', href: '/guides/school-electrical-inspection' },
];

const tocItems = [
  { id: 'overview', label: 'School Electrical Safety Overview' },
  { id: 'eicr-requirement', label: '5-Year EICR Requirement' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'fire-alarm', label: 'Fire Alarm Systems' },
  { id: 'pat-testing', label: 'PAT Testing in Schools' },
  { id: 'responsibility', label: 'Who Is Responsible?' },
  { id: 'dfe-guidance', label: 'DfE and Ofsted Requirements' },
  { id: 'winning-school-contracts', label: 'Winning School Contracts' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Schools in England must have a valid EICR for their fixed electrical installation, with periodic inspection typically every 5 years as recommended by GN3 (Guidance Note 3).',
  'Emergency lighting must be tested monthly (functional test) and annually (full 3-hour duration test) in accordance with BS 5266-1, with all results recorded in a log book.',
  'Fire alarm systems in schools require weekly testing of call points, quarterly professional servicing, and annual maintenance certification under BS 5839-1.',
  'PAT testing of portable electrical equipment (computers, projectors, kitchen appliances) should follow the IET Code of Practice, with testing intervals based on equipment type and environment.',
  'Elec-Mate helps electricians complete school inspection work efficiently — digital EICR certificates, emergency lighting records, and professional PDF reports sent directly to the school business manager.',
];

const faqs = [
  {
    question: 'How often does a school need an EICR?',
    answer:
      'GN3 (Guidance Note 3: Inspection and Testing, published by the IET) recommends a maximum interval of 5 years between periodic inspections for educational establishments. This is the standard followed by most local authorities, academy trusts, and the Department for Education. However, the inspector may recommend a shorter interval based on the age and condition of the installation — for example, a Victorian school building with original wiring from a 1960s rewire might be recommended for a 3-year interval. The previous inspector recommended date takes precedence over the general 5-year guideline. Schools should always check what their local authority or academy trust policy states, as some require more frequent inspections.',
  },
  {
    question: 'Who is responsible for electrical safety in a school?',
    answer:
      'The responsibility depends on the type of school. For local authority maintained schools, the local authority (as the employer) has the primary duty under the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989. However, the head teacher and governing body have day-to-day responsibility for ensuring compliance, including arranging inspections and acting on defects. For academies and free schools, the academy trust is the employer and has the primary duty. The trust board and the head teacher share responsibility for ensuring electrical safety. For independent schools, the proprietor or governing body is responsible. In all cases, the school should have a named person responsible for premises management who ensures that inspections are scheduled, records are kept, and defects are actioned.',
  },
  {
    question: 'What happens if a school EICR is unsatisfactory?',
    answer:
      'If the EICR identifies C1 (Danger Present) or C2 (Potentially Dangerous) defects, the overall assessment will be Unsatisfactory. The inspector should make any C1 defects safe immediately — for example, by isolating a dangerous circuit. The school must then arrange for remedial work to be completed promptly. For local authority schools, the local authority estates team should be notified immediately. For academies, the trust facilities team handles it. The remedial work should be carried out by a qualified electrician and certified with an EIC or Minor Works certificate. Once completed, a written confirmation should be obtained. The school should keep records of the original EICR, the remedial work certificates, and any correspondence. C3 (Improvement Recommended) observations do not make the report Unsatisfactory but should be addressed as part of the ongoing maintenance programme.',
  },
  {
    question: 'Do schools need PAT testing?',
    answer:
      'Yes, but the approach should follow the IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment. PAT testing in schools covers all portable and transportable electrical equipment — computers, monitors, projectors, interactive whiteboards, kitchen appliances, design and technology equipment, PE equipment (timing systems, scoreboards), and any other plug-in devices. The testing frequency depends on the equipment type and the environment. The IET Code of Practice suggests: IT equipment in schools should be visually inspected annually and formally tested every 2 to 4 years; science and DT workshop equipment should be tested annually; kitchen equipment should be tested annually. User checks (visual inspection before use) should be encouraged for all staff who use portable equipment regularly.',
  },
  {
    question: 'What does Ofsted look at regarding electrical safety?',
    answer:
      'Ofsted does not carry out detailed electrical inspections — that is not their role. However, under the Education Inspection Framework, Ofsted inspectors do assess whether the school has effective safeguarding arrangements, which includes maintaining a safe physical environment. During an inspection, they may ask to see evidence that statutory health and safety requirements are being met, including whether the school has current fire safety and electrical safety documentation. If an Ofsted inspector sees obvious electrical hazards (exposed wiring, damaged fittings, overloaded sockets), this would be a safeguarding concern. More importantly, the Independent Schools Standards and the School Premises Regulations set specific requirements for the physical condition of school buildings. Electrical safety compliance is part of meeting these standards.',
  },
  {
    question: 'How can electricians win school maintenance contracts?',
    answer:
      'Schools represent excellent maintenance contract opportunities for electricians. The work is recurring (annual emergency lighting tests, quarterly fire alarm servicing, 5-yearly EICR), and schools value reliability and professionalism. To win contracts, you need to demonstrate: registration with a competent person scheme (NICEIC, NAPIT, ELECSA), relevant qualifications (18th Edition, 2391), DBS clearance (essential for working in schools), public liability insurance (typically £5 million minimum for school work), and professional documentation. Many schools are part of academy trusts or local authority frameworks — getting on these approved lists can give you access to multiple schools. Submitting professional, well-structured tender documents with clear pricing, scope of work, and sample certificates makes a strong impression.',
  },
  {
    question: 'Do electricians need DBS checks to work in schools?',
    answer:
      'If you will be working in a school during term time and your work is regular or involves any level of unsupervised access to children, you will need an enhanced DBS (Disclosure and Barring Service) check. The school safeguarding policy determines the specific requirements. For one-off visits where you are supervised at all times and have no unsupervised access to children, a DBS check may not be required — but the school should assess this based on their safeguarding policy. For contractors who work in schools regularly (maintenance contracts, recurring testing), an enhanced DBS check is standard practice and most schools will require it before allowing you on site. Some schools and academy trusts require all contractors to be DBS-checked regardless of the nature of the visit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-maintenance-guide',
    title: 'Electrical Maintenance Guide',
    description: 'PPM vs reactive maintenance, testing intervals, and documentation requirements.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/hse-inspections-electrical',
    title: 'HSE Inspections for Electricians',
    description:
      'What HSE inspectors look for and how to prepare for workplace safety inspections.',
    icon: Shield,
    category: 'Safety',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes on the EICR.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rams-template-electricians',
    title: 'RAMS Template for Electricians',
    description: 'Risk assessment and method statement templates for school electrical work.',
    icon: ShieldCheck,
    category: 'Safety',
  },
  {
    href: '/guides/emergency-lighting-certificate-guide',
    title: 'Emergency Lighting Certificate',
    description: 'Complete guide to emergency lighting certification and testing requirements.',
    icon: Lightbulb,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'School Electrical Safety: A Complete Overview',
    content: (
      <>
        <p>
          Schools present a unique electrical safety challenge. They are occupied buildings with
          hundreds or thousands of children and staff, complex electrical installations that have
          often been extended and modified over decades, and a wide range of equipment — from
          kitchen appliances and science lab equipment to IT infrastructure and workshop machinery.
        </p>
        <p>
          The legal framework for electrical safety in schools is the same as for any workplace: the
          Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, and{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> (the
          IET Wiring Regulations). On top of this, schools must comply with the Regulatory Reform
          (Fire Safety) Order 2005 for fire-related electrical systems, the School Premises
          Regulations 2012 (for maintained schools), and the Independent Schools Standards (for
          independent schools).
        </p>
        <p>
          The Department for Education (DfE) publishes guidance on managing school premises,
          including electrical safety. Academy trusts often have their own estates management
          policies that set additional requirements. For electricians, understanding both the legal
          framework and the practical reality of school buildings is essential for delivering
          compliant, professional work.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-requirement',
    heading: 'The 5-Year EICR Requirement',
    content: (
      <>
        <p>
          The periodic inspection and testing of the fixed electrical installation in a school is
          documented on an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Condition Report (EICR)
          </SEOInternalLink>
          . GN3 (Guidance Note 3: Inspection and Testing, 9th Edition) recommends a maximum interval
          of 5 years between inspections for educational establishments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection interval:</strong> Maximum 5 years, or as recommended by the
                previous inspector. Older installations may require more frequent inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope:</strong> The EICR covers the entire fixed electrical installation —
                from the incoming supply to every final circuit. In a school, this typically
                includes multiple distribution boards, lighting circuits, power circuits, kitchen
                supplies, specialist equipment circuits (DT workshops, science labs), and external
                supplies (playing fields, car parks).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timing:</strong> School EICRs are typically carried out during school
                holidays to minimise disruption. The power needs to be switched off for dead
                testing, which is impractical during term time. Plan well in advance — summer
                holidays are popular and electricians book up quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple boards:</strong> Schools often have 5 to 20+ distribution boards
                across the site. The EICR should cover all of them, with a schedule of test results
                for every circuit on every board.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A school EICR is significantly larger than a domestic one. A typical secondary school may
          have 100 to 300+ circuits across multiple buildings. The inspection needs careful
          planning, adequate time allocation, and a systematic approach. Using digital tools like
          Elec-Mate to record test results and observations as you go saves considerable time
          compared to paper forms.
        </p>
        <SEOAppBridge
          title="Complete school EICRs digitally"
          description="Elec-Mate handles large-scale EICRs with ease. Scan each distribution board, enter test results by voice, record observations, and generate a professional PDF report covering every board in the school. Send it to the business manager before you leave site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Requirements',
    content: (
      <>
        <p>
          Emergency lighting in schools is governed by BS 5266-1 (Emergency lighting — Part 1: Code
          of practice for the emergency lighting of premises) and the Regulatory Reform (Fire
          Safety) Order 2005. The responsible person (usually the head teacher or premises manager)
          must ensure that emergency lighting is maintained and tested.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly functional test:</strong> Each emergency luminaire must be tested
                briefly (typically by pressing the test button or using a central test system) to
                confirm it operates on battery power. The test should be short enough to avoid fully
                depleting the battery. Record the date, the result, and any failures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual full duration test:</strong> Each luminaire must run on battery power
                for its full rated duration (typically 3 hours). This confirms that the battery
                capacity is sufficient to maintain illumination for the required period. This test
                is usually carried out by an electrician during school holidays.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping:</strong> All test results must be recorded in an emergency
                lighting log book. This log must be available for inspection by the fire service,
                HSE, and Ofsted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage:</strong> Emergency lighting must be provided on all escape routes,
                at exit signs, at changes of direction, at intersections, near fire alarm call
                points, near fire-fighting equipment, at stairways, and in open areas exceeding 60
                square metres.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In many schools, emergency lighting systems are a mix of ages and types — maintained
          fittings, non-maintained fittings, central battery systems, and self-contained units. A
          thorough survey and accurate asset register is the starting point for any maintenance
          programme.
        </p>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm System Requirements',
    content: (
      <>
        <p>
          Fire alarm systems in schools are governed by BS 5839-1 (Fire detection and fire alarm
          systems for buildings — Part 1: Code of practice for design, installation, commissioning
          and maintenance). Schools are typically classified as Category L2 or L1 premises under BS
          5839-1, meaning they require either protection of escape routes and rooms opening onto
          them (L2) or full coverage throughout the building (L1).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly testing:</strong> A different call point should be tested each week,
                following a rota that covers all call points over a period. The test confirms the
                sounder operates and the alarm is received at the fire alarm panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly servicing:</strong> A competent fire alarm engineer should carry
                out a quarterly inspection and service, including checking all detectors, call
                points, sounders, the panel, batteries, and wiring. At least one visit per year
                should include detector sensitivity testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual certificate:</strong> Following the quarterly servicing programme, an
                annual maintenance certificate should be issued confirming the system meets BS
                5839-1 requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>False alarm management:</strong> Schools experience high rates of false
                alarms, particularly from cooking areas, science labs, and DT workshops. A false
                alarm management strategy should be in place, which may include switching detectors
                in problem areas to less sensitive types, adding cause-and-effect programming, or
                installing appropriate detector types for the environment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The fire alarm system is safety-critical. Any defects must be actioned immediately, and
          the system must not be left in a compromised state. If detectors are isolated or the
          system is impaired during maintenance work, appropriate fire safety measures must be put
          in place (fire marshal patrols) and the school must be informed.
        </p>
      </>
    ),
  },
  {
    id: 'pat-testing',
    heading: 'PAT Testing in Schools',
    content: (
      <>
        <p>
          Schools have a huge number of portable electrical appliances — computers, monitors,
          projectors, interactive whiteboards, laminators, kettles, microwaves, workshop equipment,
          science equipment, and much more. PAT testing ensures this equipment is safe to use.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET Code of Practice:</strong> The testing frequency should follow the IET
                Code of Practice for In-Service Inspection and Testing of Electrical Equipment. This
                recommends testing intervals based on equipment type and environment, not a blanket
                annual test for everything.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical school intervals:</strong> IT equipment (Class I): formal visual
                inspection and test every 2 to 4 years. Kitchen equipment: annually. Workshop
                equipment (DT, science labs): annually. Portable heaters and fans: annually. Office
                equipment: every 2 to 4 years. Equipment used outdoors: annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>User checks:</strong> Staff should be encouraged to visually inspect
                equipment before use — checking for damaged cables, cracked plugs, signs of
                overheating, and missing earth pins. This is the most important line of defence and
                costs nothing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asset register:</strong> Maintain a register of all portable equipment,
                including the make, model, location, test date, result, and next test date. This
                makes it easy to manage ongoing compliance and identify equipment that needs
                attention.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A common mistake in school PAT testing is applying a one-size-fits-all annual testing
          schedule. The IET Code of Practice specifically advises against this — testing frequency
          should be risk-based. A computer monitor on a desk in an office is low risk; a portable
          drill in a DT workshop is higher risk and needs more frequent testing.
        </p>
      </>
    ),
  },
  {
    id: 'responsibility',
    heading: 'Who Is Responsible for Electrical Safety in Schools?',
    content: (
      <>
        <p>
          Responsibility for electrical safety in schools depends on the type of school and who
          employs the staff. Understanding the chain of responsibility is important for electricians
          — you need to know who to report defects to, who authorises remedial work, and who signs
          off on contracts.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority maintained schools:</strong> The local authority is the
                employer and has the primary duty under the HSWA 1974 and EAWR 1989. The LA
                typically has an estates or facilities team that manages building compliance,
                schedules inspections, and commissions remedial work. The head teacher and governing
                body have day-to-day responsibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Academies and free schools:</strong> The academy trust is the employer and
                holds the primary duty. Larger trusts (multi-academy trusts or MATs) often have
                centralised estates teams that manage compliance across all their schools. Smaller
                trusts may delegate this to individual school business managers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Independent schools:</strong> The proprietor or governing body is
                responsible. Independent schools must meet the Independent Schools Standards, which
                include requirements for the condition of premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The school business manager:</strong> In practice, the school business
                manager (SBM) or premises officer is often the person who manages contractor
                relationships, holds the compliance records, and coordinates access for inspections.
                Building a good working relationship with the SBM is key to winning and retaining
                school contracts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dfe-guidance',
    heading: 'DfE and Ofsted Requirements',
    content: (
      <>
        <p>
          The Department for Education (DfE) publishes guidance on managing school premises and
          maintaining a safe environment for children and staff. While the DfE does not set specific
          electrical testing intervals (that is the role of BS 7671 and GN3), their guidance
          reinforces the expectation that schools maintain safe electrical installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Good Estate Management for Schools (DfE):</strong> Provides guidance on
                managing school buildings, including the need for regular statutory compliance
                checks. Electrical safety (EICR, emergency lighting, fire alarm, PAT testing) is
                explicitly listed as a compliance requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>School Premises Regulations 2012:</strong> Require that school premises and
                their equipment are maintained to a standard that ensures the health, safety, and
                welfare of pupils and staff. Electrical installations fall within this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ofsted:</strong> Does not carry out technical electrical inspections, but
                assesses safeguarding effectiveness. Evidence of building compliance (including
                electrical safety documentation) may be checked during an inspection. Obvious
                electrical hazards would be a safeguarding concern.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition Data Collection (CDC):</strong> The DfE CDC programme surveys
                school buildings across England. Electrical installations are assessed as part of
                the overall building condition. Schools with poor condition ratings may receive
                funding for improvements, including electrical upgrades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, understanding this regulatory landscape helps you advise schools and
          position yourself as a knowledgeable, professional contractor. Schools want an electrician
          who understands their compliance obligations — not one who just tests circuits and leaves.
        </p>
      </>
    ),
  },
  {
    id: 'winning-school-contracts',
    heading: 'Winning School Electrical Contracts',
    content: (
      <>
        <p>
          Schools are excellent clients for electricians. The work is recurring, the budgets are
          (usually) stable, and a good relationship can last for years. Here is how to win and keep
          school contracts.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get DBS checked.</strong> An enhanced DBS check is essential for working in
                schools during term time. Get it done before you start tendering — it can take 2 to
                6 weeks and schools will not let you on site without it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register with competent person schemes.</strong> NICEIC, NAPIT, or ELECSA
                registration is expected by schools and academy trusts. It demonstrates competence
                and provides quality assurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional documentation.</strong> Schools deal with a lot of compliance
                paperwork. Making your documentation clear, professional, and easy to file makes the
                business manager's life easier — and they will remember that when the next contract
                comes up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Understand the procurement process.</strong> Local authority schools
                typically procure through the LA framework. Academy trusts may have their own
                procurement policies. Independent schools often procure directly. Learn the process
                for each type and tailor your approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offer a comprehensive package.</strong> Bundle EICR, emergency lighting
                testing, fire alarm servicing, and{' '}
                <SEOInternalLink href="/guides/pat-testing-guide">PAT testing</SEOInternalLink> into
                a single annual maintenance contract. This is more convenient for the school and
                more profitable for you.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Impress schools with professional digital reports"
          description="Elec-Mate generates professional PDF certificates and reports that school business managers can file directly into their compliance systems. EICR, emergency lighting, and test records — all digital, all professional, all from your phone."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SchoolElectricalInspectionPage() {
  return (
    <GuideTemplate
      title="School Electrical Inspection | Requirements UK"
      description="Complete guide to electrical inspection requirements for UK schools. 5-year EICR, emergency lighting testing, fire alarm maintenance, PAT testing, DfE guidance, and who is responsible. For electricians and school premises managers."
      datePublished="2025-05-30"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Inspection Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          School Electrical Inspection:{' '}
          <span className="text-yellow-400">Every Requirement in One Place</span>
        </>
      }
      heroSubtitle="Schools need EICR inspections every 5 years, monthly emergency lighting tests, quarterly fire alarm servicing, and regular PAT testing. This guide covers every electrical safety requirement for UK schools — for electricians doing the work and for school staff managing compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About School Electrical Inspections"
      relatedPages={relatedPages}
      ctaHeading="Professional School Inspection Tools"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for digital EICR certificates, test records, and professional documentation. Perfect for school maintenance contracts. 7-day free trial, cancel anytime."
    />
  );
}
