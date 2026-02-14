import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  Shield,
  FileCheck2,
  GraduationCap,
  Building,
  Wrench,
  HardHat,
  ListChecks,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/safe-isolation-procedure' },
  { label: 'RAMS Template', href: '/guides/rams-template-electricians' },
];

const tocItems = [
  { id: 'what-is-rams', label: 'What Is RAMS?' },
  { id: 'risk-assessment', label: 'Risk Assessment Structure' },
  { id: 'method-statement', label: 'Method Statement Sections' },
  { id: 'cdm-requirements', label: 'CDM 2015 Requirements' },
  { id: 'common-hazards', label: 'Common Electrical Hazards' },
  { id: 'writing-tips', label: 'Tips for Writing Effective RAMS' },
  { id: 'review-approval', label: 'Review and Approval' },
  { id: 'ai-rams', label: 'AI-Generated RAMS' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'RAMS (Risk Assessment and Method Statement) is the standard safety document required for electrical work on commercial, industrial, and CDM-notifiable projects.',
  'A risk assessment identifies hazards, evaluates the risk, and sets out control measures. A method statement describes the safe system of work step by step.',
  'Under CDM 2015, principal contractors must ensure that RAMS are produced for all high-risk activities — including electrical work — and that they are communicated to all workers on site.',
  'Generic RAMS that are not tailored to the specific job, site, and installation are not compliant. Every RAMS must be site-specific and task-specific.',
  'Elec-Mate AI Health and Safety Agent can generate site-specific RAMS for electrical activities in minutes — tailored to your job description, with proper hazard identification and control measures.',
];

const faqs = [
  {
    question: 'What is the difference between a risk assessment and a method statement?',
    answer:
      'A risk assessment identifies the hazards associated with a task, evaluates the likelihood and severity of harm, and sets out the control measures to reduce the risk to an acceptable level. It answers the question "what could go wrong and how do we prevent it?" A method statement describes the safe system of work — the step-by-step process for carrying out the task safely, incorporating the control measures identified in the risk assessment. It answers the question "how do we do this job safely?" Together, they form the RAMS document. The risk assessment comes first (you cannot write a safe method without understanding the risks), and the method statement is built on the risk assessment findings.',
  },
  {
    question: 'When do I need RAMS for electrical work?',
    answer:
      'In practice, RAMS are required for most electrical work on commercial and industrial sites, all CDM-notifiable projects, all work for principal contractors or main contractors who require them as a condition of site access, any work involving high-risk activities (live working, work at height, work in confined spaces), and any work where the client or building owner requests them. For simple domestic work, RAMS may not be formally required, but you should still have risk assessments in place as part of your general health and safety obligations under the Management of Health and Safety at Work Regulations 1999. In practice, having a RAMS template that you adapt for each job demonstrates professionalism and protects you legally.',
  },
  {
    question: 'Can I use a generic RAMS template for all my jobs?',
    answer:
      'No. A generic RAMS that is not tailored to the specific job, site, and installation is not compliant with CDM 2015 or the Management of Health and Safety at Work Regulations 1999. Regulation 3 of the Management Regulations requires risk assessments to be "suitable and sufficient" — which means they must address the actual hazards of the actual work being done. An HSE inspector who sees a generic template that makes no reference to the specific site conditions, the specific installation, or the specific tasks being carried out will treat it as inadequate. You can start with a template, but you must customise it for every job — including the site address, the specific work scope, the hazards present, and the control measures being applied.',
  },
  {
    question: 'What format should a RAMS follow?',
    answer:
      'There is no single legally mandated format for RAMS. However, most principal contractors and clients expect a standard structure. The risk assessment section should include: the task being assessed, the hazards identified, the people at risk, the existing control measures, the risk rating (likelihood x severity), and any additional control measures. The method statement section should include: a description of the work, the sequence of operations, the equipment and materials to be used, the personnel and competencies required, the PPE required, emergency procedures, and any permits to work or isolations needed. Many contractors use a 5x5 risk matrix for scoring risks. The document should be dated, signed by the assessor, and reviewed by the responsible person before work begins.',
  },
  {
    question: 'How often should RAMS be reviewed?',
    answer:
      'RAMS should be reviewed before every new job (even if you are using a template from a similar previous job), whenever the scope of work changes during a project, whenever site conditions change (new hazards, different access arrangements), after any incident, near-miss, or safety observation, and at regular intervals during long-running projects (typically weekly or monthly). Under CDM 2015, the principal contractor is responsible for ensuring that RAMS remain current and relevant throughout the project. If you are a subcontractor, your RAMS should be reviewed and approved by the principal contractor before work starts, and any changes should be communicated and re-approved.',
  },
  {
    question: 'Can Elec-Mate generate RAMS for me?',
    answer:
      'Yes. Elec-Mate includes an AI Health and Safety Agent that can generate site-specific RAMS for electrical activities. You describe the job — the type of work, the site, the installation, and any specific hazards — and the AI produces a tailored risk assessment and method statement with proper hazard identification, risk ratings, control measures, and a step-by-step method. The output is professionally formatted and can be exported as a PDF. This is not a generic template — the AI generates content specific to your job description. You should always review the output and add any site-specific details that only you would know (for example, specific access restrictions or client requirements).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/hse-inspections-electrical',
    title: 'HSE Inspections for Electricians',
    description:
      'What HSE inspectors look for and how to prepare for workplace safety inspections.',
    icon: Shield,
    category: 'Safety',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Step-by-step safe isolation procedure compliant with GS38 and BS 7671.',
    icon: ShieldCheck,
    category: 'Safety',
  },
  {
    href: '/guides/electrical-maintenance-guide',
    title: 'Electrical Maintenance Guide',
    description: 'PPM vs reactive maintenance, testing intervals, and compliance documentation.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete digital EICR certificates on your phone with AI-powered features.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/school-electrical-inspection',
    title: 'School Electrical Inspection',
    description: 'EICR, fire alarm, and emergency lighting requirements for schools.',
    icon: Building,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-rams',
    heading: 'What Is RAMS and Why Every Electrician Needs It',
    content: (
      <>
        <p>
          RAMS stands for Risk Assessment and Method Statement. It is a combined document that
          identifies the hazards associated with a specific task, evaluates the risks, sets out
          control measures, and describes the safe step-by-step process for carrying out the work.
        </p>
        <p>
          For electricians, RAMS are required on virtually every commercial, industrial, and
          CDM-notifiable project. Principal contractors will not allow you on site without them.
          Clients expect them. Insurance companies require evidence that risk assessments are in
          place. And if something goes wrong, the{' '}
          <SEOInternalLink href="/guides/hse-inspections-electrical">
            HSE will ask to see them
          </SEOInternalLink>
          .
        </p>
        <p>
          A RAMS is not just paperwork for the sake of paperwork. When done properly, it forces you
          to think through the job before you start — to identify what could go wrong and plan how
          to prevent it. The best electricians treat the RAMS process as a genuine planning tool,
          not a box-ticking exercise.
        </p>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Risk Assessment Structure',
    content: (
      <>
        <p>
          The risk assessment is the foundation of the RAMS. It follows a structured process to
          identify, evaluate, and control risks. Here is the standard structure used across the UK
          construction industry.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ListChecks className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Identify the hazards.</strong> What could cause harm? For electrical
                work, hazards include electric shock, arc flash, burns, fire, falls from height
                (when accessing distribution boards at height), manual handling (lifting heavy
                distribution boards or cable drums), and asbestos (in older buildings).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ListChecks className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Identify who might be harmed.</strong> The electrician carrying out
                the work, other trades working nearby, building occupants, and members of the public
                if the work is in an accessible area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ListChecks className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Evaluate the risk.</strong> Use a risk matrix to score each hazard
                based on likelihood (1 to 5) and severity (1 to 5). The risk score = likelihood x
                severity. Scores of 1 to 6 are low risk, 8 to 12 are medium risk, and 15 to 25 are
                high risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ListChecks className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Set out control measures.</strong> For each hazard, describe the
                specific measures that will reduce the risk. Follow the hierarchy of control:
                eliminate, substitute, engineering controls, administrative controls, PPE.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ListChecks className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5: Record and communicate.</strong> Document the assessment, share it
                with all workers involved, and ensure everyone understands the control measures
                before work begins.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The risk assessment must be specific to the job. "Electrical work" is not a hazard —
          "contact with live conductors during{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            isolation of the main distribution board
          </SEOInternalLink>
          " is a hazard. The more specific the assessment, the more useful it is and the more
          compliant it is with the Management of Health and Safety at Work Regulations 1999.
        </p>
      </>
    ),
  },
  {
    id: 'method-statement',
    heading: 'Method Statement: The Step-by-Step Safe System',
    content: (
      <>
        <p>
          The method statement takes the control measures from the risk assessment and incorporates
          them into a step-by-step description of how the work will be carried out safely. It should
          be detailed enough that a competent person could follow it and carry out the work safely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Project details:</strong> Site address, client name, project reference,
                date, and the name of the competent person producing the method statement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of work:</strong> A clear description of what work is being carried
                out — for example, "replacement of consumer unit and associated testing" or
                "periodic inspection and testing of the fixed electrical installation."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sequence of operations:</strong> The step-by-step process, including
                preparation, safe isolation, the work itself, testing, commissioning, and
                reinstatement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment and materials:</strong> What tools, test instruments, materials,
                and access equipment will be used?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Personnel and competencies:</strong> Who will carry out the work and what
                qualifications and experience do they have?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PPE requirements:</strong> The specific PPE required for the task —
                insulated gloves, safety glasses, arc-rated clothing if working near live equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency procedures:</strong> What to do if something goes wrong — electric
                shock first aid, fire evacuation, reporting procedures.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A well-written method statement demonstrates to the principal contractor, the client, and
          the HSE that you have planned the work properly. It also protects you legally if an
          incident occurs — you can demonstrate that a safe system of work was in place.
        </p>
      </>
    ),
  },
  {
    id: 'cdm-requirements',
    heading: 'CDM 2015 Requirements for RAMS',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 (CDM 2015) apply to all
          construction work in Great Britain, including electrical installation, maintenance, and
          testing. Under CDM 2015, several duty holders have responsibilities related to RAMS.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Principal contractor:</strong> Must plan, manage, and monitor the
                construction phase. This includes ensuring that RAMS are produced for all high-risk
                activities, are site-specific, and are communicated to all workers. The principal
                contractor reviews and approves subcontractor RAMS before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractors (including electrical subcontractors):</strong> Must plan,
                manage, and monitor their own work to ensure it is carried out safely. This includes
                producing RAMS for their activities, ensuring their workers are competent, and
                cooperating with the principal contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Designers:</strong> Must consider how the design affects health and safety
                during construction and in the finished building. Electrical designers should
                identify hazards that will affect the installation team and communicate them through
                the pre-construction information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workers:</strong> Must cooperate with the contractor and principal
                contractor, follow the safe system of work described in the RAMS, and report any
                problems or concerns.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For projects that are CDM-notifiable (lasting more than 30 working days with more than 20
          workers simultaneously, or exceeding 500 person-days), the RAMS process is more formal.
          The construction phase plan must include the RAMS for all high-risk activities, and the
          HSE notification must be displayed on site.
        </p>
      </>
    ),
  },
  {
    id: 'common-hazards',
    heading: 'Common Electrical Hazards for RAMS',
    content: (
      <>
        <p>
          When writing RAMS for electrical work, these are the hazards you should always consider
          and address. This is not an exhaustive list — every job will have site-specific hazards
          that must be identified during the planning stage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shock:</strong> Contact with live conductors. Control measures:
                safe isolation procedure, lock-off, proving dead, GS38-compliant test equipment,
                insulated tools, warning notices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc flash:</strong> Short-circuit or arcing fault at high fault levels.
                Control measures: arc-rated PPE, risk assessment of fault levels, working on
                de-energised equipment wherever possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire:</strong> Overloaded circuits, loose connections, damaged cables.
                Control measures: fire extinguisher on site, hot work permit if required, thermal
                inspection before re-energising.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working at height:</strong> Accessing distribution boards, cable trays, or
                lighting at height. Control measures: step-up platforms, tower scaffolds, MEWP as
                appropriate; fall prevention measures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manual handling:</strong> Lifting heavy distribution boards, cable drums,
                transformers. Control measures: mechanical lifting aids, two-person lift, manual
                handling assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos:</strong> Older buildings may contain asbestos in cable routes,
                behind distribution boards, or in ceiling voids. Control measures: check the
                asbestos register before starting work, do not disturb suspect materials, stop work
                and report if asbestos is suspected.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'writing-tips',
    heading: 'Tips for Writing Effective RAMS',
    content: (
      <>
        <p>
          The difference between compliant RAMS and paperwork that will get you in trouble comes
          down to specificity and accuracy. Here are practical tips for writing RAMS that actually
          work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be specific.</strong> "Install consumer unit in kitchen" is better than
                "electrical installation work." "Isolate supply at main switch, lock off with
                personal padlock, prove dead at each outgoing way using GS38-compliant voltage
                indicator" is better than "safe isolation."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Match the method to the risk assessment.</strong> Every significant hazard
                in the risk assessment should have a corresponding control measure in the method
                statement. If the risk assessment identifies "working at height to access cable
                tray," the method statement should specify the access equipment and precautions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use plain language.</strong> RAMS should be understandable to everyone who
                needs to follow them. Avoid jargon where possible and be clear about what needs to
                happen at each step.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Include emergency procedures.</strong> What happens if someone receives an
                electric shock? Where is the nearest first aid kit? Who is the first aider on site?
                What is the emergency evacuation procedure?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review and sign.</strong> The RAMS should be signed by the person producing
                it, reviewed and approved by the responsible person (or principal contractor), and
                briefed to all workers before work begins. Keep a record of the briefing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'review-approval',
    heading: 'Review and Approval Process',
    content: (
      <>
        <p>
          RAMS are not a write-once document. They go through a review and approval process that
          ensures they are accurate, complete, and understood by everyone involved.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal review:</strong> Before submitting to the principal contractor,
                review the RAMS internally. Check that all hazards are identified, control measures
                are adequate, and the method is accurate and complete.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Principal contractor review:</strong> The principal contractor will review
                your RAMS against the construction phase plan. They may request changes, additional
                detail, or confirmation of specific control measures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Toolbox talk / briefing:</strong> Before work starts, brief all workers on
                the RAMS. Ensure everyone understands the hazards, the control measures, the safe
                method, and the emergency procedures. Record attendance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ongoing review:</strong> If conditions change during the job — new hazards,
                different access, scope changes — update the RAMS and re-brief the team.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ai-rams',
    heading: 'AI-Generated RAMS: A Faster Way to Get It Right',
    content: (
      <>
        <p>
          Writing RAMS from scratch for every job takes time — time that most electricians would
          rather spend doing the actual work. This is where AI tools can help. Elec-Mate's AI Health
          and Safety Agent is purpose-built for generating site-specific RAMS for electrical
          activities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Describe the job:</strong> Tell the AI what work you are doing, where, and
                what the installation involves. For example: "Consumer unit replacement in a
                3-bedroom semi-detached house. Existing TN-C-S supply. Asbestos flash pad behind
                existing board."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AI generates the RAMS:</strong> The AI produces a tailored risk assessment
                with proper hazard identification, risk ratings, and control measures, plus a
                step-by-step method statement incorporating the control measures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review and customise:</strong> Check the output, add any site-specific
                details the AI could not know (access restrictions, client requirements, specific
                equipment), and sign off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Export as PDF:</strong> Send the finished RAMS to the principal contractor
                or client as a professional PDF document.
              </span>
            </li>
          </ul>
        </div>
        <p>
          AI-generated RAMS are not a replacement for your professional judgement — they are a
          starting point that saves time and ensures you do not miss standard hazards. You must
          always review the output and add the site-specific knowledge that only you have.
        </p>
        <SEOAppBridge
          title="Generate RAMS in minutes with AI"
          description="Elec-Mate's AI Health and Safety Agent creates site-specific risk assessments and method statements for electrical work. Describe the job, get a tailored RAMS, review and export. Professional output in minutes, not hours."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RAMSTemplateGuidePage() {
  return (
    <GuideTemplate
      title="RAMS Template for Electricians | Free Guide"
      description="Complete guide to writing RAMS (Risk Assessment and Method Statement) for electrical work. Risk assessment structure, method statement sections, CDM 2015 requirements, common electrical hazards, and AI-generated RAMS."
      datePublished="2025-03-18"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          RAMS for Electricians:{' '}
          <span className="text-yellow-400">Risk Assessments and Method Statements That Work</span>
        </>
      }
      heroSubtitle="Every commercial job needs a RAMS. Every principal contractor demands one before you set foot on site. This guide shows you how to write risk assessments and method statements that are genuinely useful, compliant with CDM 2015, and specific to electrical work."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About RAMS for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Generate Professional RAMS in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Health and Safety Agent to create site-specific RAMS, digital certificates, and professional documentation. 7-day free trial, cancel anytime."
    />
  );
}
