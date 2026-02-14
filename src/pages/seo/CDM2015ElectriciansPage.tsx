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
  HardHat,
  Users,
  Briefcase,
  Building2,
  FileText,
  Lock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'CDM 2015', href: '/guides/cdm-2015-electricians' },
];

const tocItems = [
  { id: 'what-is-cdm', label: 'What Is CDM 2015?' },
  { id: 'when-cdm-applies', label: 'When CDM Applies' },
  { id: 'duty-holders', label: 'CDM Duty Holders' },
  { id: 'contractor-duties', label: 'Contractor Duties' },
  { id: 'pre-construction-info', label: 'Pre-Construction Information' },
  { id: 'construction-phase-plan', label: 'Construction Phase Plan' },
  { id: 'health-safety-file', label: 'Health and Safety File' },
  { id: 'how-elec-mate-helps', label: 'How Elec-Mate Helps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Construction (Design and Management) Regulations 2015 apply to all construction work in Great Britain, including electrical installation work — there is no threshold below which CDM does not apply.',
  'As an electrical contractor, you are a "contractor" under CDM 2015 with specific legal duties: plan, manage, and monitor your work; cooperate with other duty holders; and ensure workers are competent and supervised.',
  'Projects with more than one contractor require a principal designer and principal contractor to coordinate health and safety across all parties.',
  'The construction phase plan must be prepared before work begins on site, covering risks, control measures, emergency procedures, and welfare arrangements.',
  'Elec-Mate AI Health and Safety agent generates risk assessments and method statements (RAMS) that address CDM requirements, helping you comply with contractor duties efficiently.',
];

const faqs = [
  {
    question: 'Does CDM 2015 apply to domestic electrical work?',
    answer:
      'Yes, CDM 2015 applies to all construction work, including domestic work. However, the domestic client (homeowner) does not have client duties under CDM — those duties pass automatically to the contractor (if there is only one) or to the principal contractor (if there is more than one). This means that when you carry out a domestic rewire, consumer unit change, or any other electrical installation work in a home, you are the contractor under CDM 2015 and you must comply with your contractor duties. You must plan, manage, and monitor your work to ensure it is carried out safely. You must produce a risk assessment and method statement. You must ensure your workers (including any apprentices) are competent and supervised. The difference with domestic work is simply that the homeowner does not have to appoint a principal designer or principal contractor — those duties transfer to you.',
  },
  {
    question: 'What is the difference between a principal contractor and a contractor?',
    answer:
      'A principal contractor is the contractor appointed by the client to plan, manage, and coordinate health and safety during the construction phase of a project that involves more than one contractor. The principal contractor has overall responsibility for health and safety on site, including producing the construction phase plan, coordinating the work of all contractors, and managing site access and welfare. A contractor is any person who carries out construction work — including subcontractors. As an electrical contractor working on a larger project, you are a contractor under CDM. You must cooperate with the principal contractor, follow the construction phase plan, report any health and safety issues, and ensure your own workers are competent and supervised. On a project with only one contractor (for example, a domestic rewire where you are the only trade), there is no principal contractor — you are the sole contractor and you take on the planning and management duties yourself.',
  },
  {
    question: 'Do I need a construction phase plan for every job?',
    answer:
      'A formal construction phase plan is required for every project that has more than one contractor. This includes most commercial projects where multiple trades are working on site. The plan must be prepared before work begins and must set out the arrangements for managing health and safety, including the sequence of work, risk control measures, emergency procedures, welfare arrangements, and how the work of different contractors will be coordinated. For domestic projects with only one contractor (just you), a formal construction phase plan is not strictly required under CDM 2015, but you still have a duty to plan, manage, and monitor your work safely. In practice, a risk assessment and method statement (RAMS) for each job covers this duty. Elec-Mate AI Health and Safety agent generates RAMS documents that address the planning requirements, even for single-contractor domestic work.',
  },
  {
    question: 'What happens if I ignore CDM 2015?',
    answer:
      'CDM 2015 is law, enforced by the Health and Safety Executive (HSE). Failure to comply can result in enforcement notices, prohibition notices, and criminal prosecution. If an accident occurs on a construction site and the HSE investigation reveals that CDM duties were not being followed — for example, no risk assessment, no construction phase plan, incompetent workers, or no cooperation between contractors — the duty holders can be prosecuted. Penalties include unlimited fines and imprisonment (up to 2 years for individuals). In the event of a fatality, corporate manslaughter charges can also apply. Beyond the legal penalties, non-compliance with CDM can also affect your insurance cover — if your public liability insurer finds that you were not complying with CDM when an incident occurred, they may refuse to pay the claim.',
  },
  {
    question: 'How does CDM 2015 interact with the Electricity at Work Regulations?',
    answer:
      'CDM 2015 and the Electricity at Work Regulations 1989 (EAWR) are complementary pieces of legislation that both apply to electrical work on construction sites. CDM 2015 deals with the management and coordination of health and safety during construction work — planning, designing out risks, coordinating contractors, and managing the construction phase. The EAWR deal specifically with electrical safety — safe isolation, competence, live working restrictions, and the condition of electrical systems. As an electrical contractor working on a construction site, you must comply with both sets of regulations simultaneously. Your CDM duties require you to plan your work, cooperate with the principal contractor, and follow the construction phase plan. Your EAWR duties require you to follow safe isolation procedures, use competent workers, and ensure the electrical installation is safe. Elec-Mate training courses cover both CDM 2015 and the EAWR, and the AI Health and Safety agent generates RAMS that address requirements from both regulations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electricity-at-work-regulations',
    title: 'Electricity at Work Regulations',
    description:
      'The primary legislation governing electrical safety in the workplace. Regulations 4, 12, 14, and 16 explained.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electrical-work',
    title: 'Risk Assessment for Electrical Work',
    description:
      'How to produce risk assessments for electrical work, covering CDM requirements, live working, and site hazards.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation under the EAWR, including GS38 test equipment and lock-off procedures on construction sites.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work-electrical',
    title: 'Permit to Work (Electrical)',
    description:
      'How to implement a permit-to-work system for electrical work on construction sites under CDM and EAWR requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'RAMS Generator',
    description:
      'AI-powered risk assessment and method statement generator. Describe the job and get a professional RAMS document in minutes.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/training/health-and-safety',
    title: 'Health and Safety Course',
    description:
      'Study CDM 2015, EAWR, and health and safety requirements with structured training modules and mock exams.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-cdm',
    heading: 'What Is CDM 2015?',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 — commonly known as CDM 2015 —
          are the primary legislation governing health and safety management in construction work in
          Great Britain. They replaced the previous CDM 2007 regulations and came into force on 6
          April 2015.
        </p>
        <p>
          CDM 2015 applies to <strong>all construction work</strong>. There is no minimum project
          size, value, or duration below which the regulations do not apply. Whether you are
          rewiring a house, installing a consumer unit, or working on a multi-million pound
          commercial development, CDM 2015 applies to your work. Electrical installation work is
          explicitly included in the definition of "construction work" under the regulations.
        </p>
        <p>
          The purpose of CDM 2015 is to ensure that health and safety is considered throughout the
          lifecycle of a construction project — from initial design through to completion and
          handover. The regulations require that risks are identified and eliminated (or reduced) at
          the design stage, that construction work is properly planned and managed, and that
          information about the completed structure is recorded for future reference.
        </p>
        <p>
          For electricians, CDM 2015 means that every job you undertake has a legal framework for
          health and safety management. Understanding your duties as a contractor under CDM is just
          as important as understanding the technical requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and
          the{' '}
          <SEOInternalLink href="/guides/electricity-at-work-regulations">
            Electricity at Work Regulations 1989
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'when-cdm-applies',
    heading: 'When CDM 2015 Applies to Electrical Work',
    content: (
      <>
        <p>
          CDM 2015 applies to all "construction work" as defined in Regulation 2. The definition is
          broad and includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New installations</strong> — wiring a new building, fitting out a commercial
                unit, installing electrical systems in a new-build house. This is clearly
                construction work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alterations and additions</strong> — adding circuits, extending wiring,
                installing new distribution boards, upgrading consumer units, adding socket outlets.
                Any alteration to the fixed electrical installation in a building is construction
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repairs and maintenance</strong> — replacing damaged wiring, repairing
                faults, replacing accessories and fittings, remedial work following an EICR. Repair
                and maintenance of the fixed electrical installation is construction work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demolition and dismantling</strong> — removing electrical installations from
                buildings being demolished or refurbished. Disconnection and removal of fixed wiring
                is construction work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The only electrical work that falls outside CDM 2015 is work that does not involve a
          "structure" — for example, repairing a portable appliance or testing equipment that is not
          part of the fixed installation. However, even this work is covered by the general duties
          under the Health and Safety at Work Act 1974 and the{' '}
          <SEOInternalLink href="/guides/electricity-at-work-regulations">
            Electricity at Work Regulations 1989
          </SEOInternalLink>
          .
        </p>
        <p>
          CDM 2015 has additional requirements that are triggered when a project has more than one
          contractor or when the construction phase will last longer than 30 working days with more
          than 20 workers on site at any one time (or exceeds 500 person-days). These "notifiable"
          projects must be notified to the HSE before work begins.
        </p>
      </>
    ),
  },
  {
    id: 'duty-holders',
    heading: 'CDM Duty Holders: Who Does What',
    content: (
      <>
        <p>CDM 2015 defines five duty holder roles. Each has specific legal duties:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client</strong> — the person or organisation for whom the construction work
                is carried out. The client must make suitable arrangements for managing the project,
                provide pre-construction information, and appoint a principal designer and principal
                contractor (for projects with more than one contractor). For domestic clients, these
                duties transfer to the contractor or principal contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Principal designer</strong> — appointed by the client on projects with more
                than one contractor. The principal designer plans, manages, and monitors the
                pre-construction phase, identifies and eliminates or reduces risks through design,
                and prepares the health and safety file. On a commercial project, this is typically
                the architect or lead design consultant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Principal contractor</strong> — appointed by the client on projects with
                more than one contractor. The principal contractor plans, manages, and monitors the
                construction phase, produces the construction phase plan, coordinates all
                contractors, and manages site rules and welfare arrangements. On a commercial
                project, this is typically the main contractor or builder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Designer</strong> — anyone who prepares or modifies a design for
                construction work. This includes the electrician designing the electrical
                installation layout, circuit configuration, and cable routes. Designers must
                eliminate foreseeable risks where possible and reduce risks that cannot be
                eliminated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractor</strong> — anyone who carries out construction work. This
                includes every electrical contractor and subcontractor on the project. Contractors
                must plan, manage, and monitor their own work, cooperate with the principal
                contractor, and ensure their workers are competent and supervised.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As an electrical contractor, you will most commonly be in the "contractor" role. On
          domestic jobs where you are the only trade, you may also take on the duties that would
          otherwise fall to the principal contractor (because the domestic client's duties transfer
          to you). If you design the electrical installation (which most electricians do), you are
          also a "designer" with design duties.
        </p>
      </>
    ),
  },
  {
    id: 'contractor-duties',
    heading: 'Your Duties as an Electrical Contractor Under CDM',
    content: (
      <>
        <p>
          Regulation 15 sets out the specific duties of contractors. As an electrical contractor,
          your CDM duties are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan, manage, and monitor</strong> — you must plan your work before
                starting, manage it during execution, and monitor it to ensure it remains safe. This
                means producing a{' '}
                <SEOInternalLink href="/guides/risk-assessment-electrical-work">
                  risk assessment
                </SEOInternalLink>{' '}
                and method statement for each job, briefing your workers on the risks and control
                measures, and checking that safe working practices are being followed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ensure competence</strong> — you must not employ or appoint any person to
                carry out construction work unless they have the necessary skills, knowledge,
                training, and experience. Apprentices must be under appropriate supervision. You
                must also ensure that your workers receive any site-specific induction training.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooperate with others</strong> — on projects with multiple contractors, you
                must cooperate with the principal contractor and other contractors to coordinate
                work activities safely. This includes attending site meetings, following the
                construction phase plan, reporting hazards, and coordinating isolation procedures
                with other trades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide information and instruction</strong> — you must ensure your workers
                have the information they need to carry out the work safely. This includes method
                statements, risk assessments, circuit diagrams, isolation procedures, and any
                site-specific rules or permit-to-work requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report to the principal contractor</strong> — you must comply with
                directions given by the principal contractor, report any work that cannot be carried
                out safely, and inform the principal contractor of any risks to health and safety
                that you identify during the course of your work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These duties apply regardless of the size of the project. Even on a small domestic rewire
          where you are the only contractor, you have a duty to plan, manage, and monitor your work.
          In practice, this means having a risk assessment and method statement for the job,
          briefing any employees or apprentices, and checking that safe working practices (such as{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>)
          are being followed.
        </p>
        <SEOAppBridge
          title="AI generates your RAMS in minutes"
          description="Elec-Mate's AI Health and Safety agent creates risk assessments and method statements tailored to each job. Describe the work — domestic rewire, commercial fit-out, solar PV installation — and get a professional RAMS document covering CDM requirements, EAWR compliance, and site-specific hazards."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'pre-construction-info',
    heading: 'Pre-Construction Information',
    content: (
      <>
        <p>
          On projects with more than one contractor, the client must provide pre-construction
          information (PCI) to the principal designer and principal contractor. As an electrical
          contractor (subcontractor), you should receive this information from the principal
          contractor before you start work on site. If you do not receive it, you should request it.
        </p>
        <p>Pre-construction information includes:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The project description</strong> — what is being built, altered, or
                demolished. The scope of the electrical work. The programme and key milestones.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing information about the site</strong> — previous surveys, structural
                drawings, existing services information (gas, water, electricity), asbestos surveys,
                contamination reports. For electrical work, this includes existing distribution
                board schedules, cable routes, and any previous EICR reports.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Significant hazards</strong> — any hazards identified by the client or
                principal designer that are specific to the site. For electrical work, this might
                include the presence of asbestos (which may be disturbed when chasing walls for
                cables), overhead power lines, buried services, or live equipment that cannot be
                isolated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client requirements</strong> — any specific health and safety requirements
                set by the client, such as working hours restrictions, access restrictions, or
                specialist PPE requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic projects where you are the sole contractor, pre-construction information is
          not formally required under CDM 2015 (because the domestic client's duties transfer to
          you). However, you should still gather relevant information about the property before
          starting work — for example, the age of the existing wiring, whether asbestos is present,
          and the location of the incoming supply and meter.
        </p>
      </>
    ),
  },
  {
    id: 'construction-phase-plan',
    heading: 'The Construction Phase Plan',
    content: (
      <>
        <p>
          The construction phase plan is a document that sets out how health and safety will be
          managed during the construction phase of the project. On projects with more than one
          contractor, the principal contractor must prepare the construction phase plan before work
          begins on site.
        </p>
        <p>
          As an electrical contractor, you will be expected to contribute to the construction phase
          plan by providing information about the health and safety risks associated with your work
          and the control measures you will use. The plan typically includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Project description and management structure</strong> — who is the principal
                contractor, who are the contractors, and who is responsible for what. Contact
                details for all duty holders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arrangements for managing significant risks</strong> — how specific risks
                will be controlled. For electrical work, this includes{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedures
                </SEOInternalLink>
                , permit-to-work arrangements for live working, coordination with other trades (for
                example, ensuring the plumber does not drill through your cables), and arrangements
                for temporary electrical supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency procedures</strong> — first aid arrangements, fire procedures,
                emergency contact numbers, and the location of fire extinguishers, first aid kits,
                and assembly points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welfare arrangements</strong> — toilets, washing facilities, changing rooms,
                rest areas, and drinking water. These must be in place before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site rules</strong> — PPE requirements, working hours, access restrictions,
                permit-to-work procedures, and any other site-specific rules.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic projects where you are the sole contractor, you do not need a formal
          construction phase plan. However, you must still plan your work safely. A risk assessment
          and method statement (RAMS) for each job serves this purpose and demonstrates compliance
          with your planning duty.
        </p>
      </>
    ),
  },
  {
    id: 'health-safety-file',
    heading: 'The Health and Safety File',
    content: (
      <>
        <p>
          The health and safety file is a document that records information about the completed
          construction work that will be useful for future maintenance, alteration, or demolition.
          On projects with more than one contractor, the principal designer is responsible for
          preparing and maintaining the health and safety file. At the end of the project, the file
          is handed over to the client.
        </p>
        <p>
          As an electrical contractor, you should contribute information to the health and safety
          file, including:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>As-built drawings</strong> — circuit diagrams showing the final layout of
                all circuits, cable routes, distribution board schedules, and the location of
                junction boxes and accessories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate</strong> — the{' '}
                <SEOInternalLink href="/guides/electrical-certificate-types-uk">
                  EIC
                </SEOInternalLink>{' '}
                and associated test results for the completed installation. This should include the
                schedule of inspections and the schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hazard information</strong> — any residual hazards that cannot be
                eliminated. For example, the location of buried cables that may be affected by
                future excavation, the presence of high-voltage equipment, or areas where asbestos
                was identified during the electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manufacturer information</strong> — operation and maintenance manuals for
                any specialist electrical equipment installed, such as fire alarm panels, emergency
                lighting central battery systems, UPS systems, or building management systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The health and safety file is a living document — it should be updated whenever further
          construction work is carried out on the building. If you carry out an alteration or
          addition to an existing installation, you should provide updated information for the file.
          This is where accurate, professional certification is essential — and where Elec-Mate's
          digital certificate tools add significant value.
        </p>
      </>
    ),
  },
  {
    id: 'how-elec-mate-helps',
    heading: 'How Elec-Mate Supports CDM Compliance',
    content: (
      <>
        <p>
          CDM compliance requires planning, documentation, and competence. Elec-Mate provides tools
          that support all three aspects of your contractor duties:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Health and Safety Agent</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the job — domestic rewire, commercial fit-out, solar PV installation —
                  and the AI generates a risk assessment and method statement covering CDM
                  contractor duties, EAWR requirements, safe isolation, and site-specific hazards.
                  Professional PDF output in minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Digital Certificates for the H&S File</h4>
                <p className="text-white text-sm leading-relaxed">
                  EICR, EIC, Minor Works, fire alarm, and emergency lighting certificates — all
                  completed on your phone and exported as professional PDFs. Provide accurate
                  as-built documentation for the health and safety file, instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">CDM and H&S Training Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Study CDM 2015, the EAWR, risk assessment, safe isolation, and health and safety
                  management through Elec-Mate's 46+ structured training courses. Flashcards, mock
                  exams, and EPA/AM2 simulators for apprentices. The apprentice hub includes a site
                  diary and OJT tracker to document on-site learning.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Business Tools</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quoting, invoicing, expenses, and cash flow management. Build CDM compliance costs
                  into your quotes from the start. Track the time spent on RAMS, site inductions,
                  and health and safety documentation as part of the project cost.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="CDM compliance without the paperwork pain"
          description="Elec-Mate's AI Health and Safety agent generates RAMS documents tailored to each job. Digital certificates provide professional as-built documentation. 46+ training courses keep your competence current. 7-day free trial, cancel anytime."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CDM2015ElectriciansPage() {
  return (
    <GuideTemplate
      title="CDM 2015 for Electricians | Duties & Responsibilities"
      description="Complete guide to CDM 2015 for electrical contractors. Contractor duties, principal designer, principal contractor, pre-construction information, construction phase plan, and health and safety file requirements."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations"
      badgeIcon={Scale}
      heroTitle={
        <>
          CDM 2015 for Electricians:{' '}
          <span className="text-yellow-400">Your Duties and Responsibilities</span>
        </>
      }
      heroSubtitle="The Construction (Design and Management) Regulations 2015 apply to all electrical installation work. As an electrical contractor, you have legal duties to plan, manage, and monitor your work; ensure worker competence; and cooperate with other duty holders. This guide explains everything you need to know."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CDM 2015 for Electricians"
      relatedPages={relatedPages}
      ctaHeading="CDM Compliance Made Simple"
      ctaSubheading="AI-generated RAMS, digital certificates for the H&S file, and 46+ training courses covering CDM 2015 and health and safety. Plus business tools: quoting, invoicing, expenses. 7-day free trial, cancel anytime."
    />
  );
}
