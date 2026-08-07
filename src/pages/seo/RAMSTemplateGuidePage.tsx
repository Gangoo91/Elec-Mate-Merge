import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  ShieldCheck,
  Shield,
  FileCheck2,
  GraduationCap,
  Building,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation classes
// -------------------------------------------------------------------

// Cards run edge-to-edge on phones (the article column is px-5) and inset from sm: up.
const cardCn =
  '-mx-5 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x';

const listCn = 'divide-y divide-white/[0.1] text-white';
const listItemCn = 'py-3.5 first:pt-0 last:pb-0';

// Tables scroll inside their own container so the page body never scrolls sideways.
const tableWrapCn =
  '-mx-5 my-5 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border';
const tableCn = 'w-full border-collapse text-left text-[13.5px] leading-relaxed text-white';
const thCn = 'whitespace-nowrap px-4 py-3 align-top font-semibold text-white';
const tdCn = 'px-4 py-3 align-top text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/safe-isolation-procedure' },
  { label: 'RAMS Template', href: '/guides/rams-template-electricians' },
];

const tocItems = [
  { id: 'what-is-rams', label: 'What Goes in a RAMS' },
  { id: 'risk-assessment', label: 'Risk Assessment Structure' },
  { id: 'method-statement', label: 'Method Statement Sections' },
  { id: 'cdm-requirements', label: 'CDM 2015 Requirements' },
  { id: 'eawr-requirements', label: 'Electricity at Work Regulations 1989' },
  { id: 'common-hazards', label: 'Common Electrical Hazards' },
  { id: 'writing-tips', label: 'Tips for Writing Effective RAMS' },
  { id: 'review-approval', label: 'Review and Approval' },
  { id: 'ai-rams', label: 'AI-Generated RAMS' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A RAMS has two halves: a risk assessment (hazards, who is at risk, controls, risk rating) and a method statement (the safe system of work, step by step). The risk assessment is written first — you cannot describe a safe method until you know the risks.',
  'The Management of Health and Safety at Work Regulations 1999 require the assessment to be suitable and sufficient, and employers with five or more employees to record the significant findings. BS 7671 Appendix 2 adds that, for its purposes, a risk assessment should involve an appropriate electrically skilled person.',
  'The Electricity at Work Regulations 1989 (EAWR) impose the direct electrical duties. Regulation 16 requires anyone doing work where technical knowledge or experience is needed to prevent danger to possess it, or to be supervised to a degree appropriate to the work — BS 7671 restates this in its definition of "person" and points to HSE guidance HSR25.',
  'Under CDM 2015 a construction phase plan is required on every project, not only notifiable ones. The principal contractor plans, manages and monitors the construction phase, and reviews subcontractor RAMS before work starts.',
  'Generic RAMS that are not tailored to the specific job, site, and installation are not compliant. Every RAMS must be site-specific and task-specific.',
  'A permit to work (PTW) is required in addition to RAMS for high-risk activities such as isolation of high-voltage equipment, work in confined spaces, and hot work. Proceeding without a completed permit is one of the most common and serious RAMS failings identified during site inspections.',
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
      'There is no single legally mandated format for RAMS. However, most principal contractors and clients expect a standard structure. The risk assessment section should include: the task being assessed, the hazards identified, the people at risk, the existing control measures, the risk rating (likelihood x severity), and any additional control measures. The method statement section should include: a description of the work, the sequence of operations, the equipment and materials to be used, the personnel and competencies required, the PPE required, emergency procedures, and any permits to work or isolations needed. Many contractors score risks on a 5 x 5 matrix, though the banding varies from contractor to contractor. The document should be dated, signed by the assessor, and reviewed by the responsible person before work begins.',
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
    href: '/inspection-testing-course',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const howToSteps = [
  {
    name: 'Identify the hazards',
    text: 'List every hazard associated with the specific task and site — electric shock, arc flash, fire, work at height, manual handling, and asbestos in older buildings.',
  },
  {
    name: 'Identify who might be harmed',
    text: 'Consider the electrician, other trades, building occupants, and members of the public in accessible areas.',
  },
  {
    name: 'Evaluate the risk',
    text: 'Score each hazard on your organisation’s matrix. On a common 5 x 5 matrix the score is likelihood (1 to 5) multiplied by severity (1 to 5), banded low, medium and high.',
  },
  {
    name: 'Set out control measures',
    text: 'For each hazard, apply the hierarchy of control: eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort.',
  },
  {
    name: 'Record, communicate, and review',
    text: 'Document the completed assessment, brief all workers before work starts, obtain signatures, and review whenever conditions or scope change.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-rams',
    heading: 'What Goes in a RAMS',
    content: (
      <>
        <p>
          RAMS stands for Risk Assessment and Method Statement. It is one document with two halves:
          the risk assessment says what could go wrong and how you will stop it, and the method
          statement says how the job will actually be done. This is what a principal contractor
          expects to see when they ask for your RAMS.
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th className={thCn}>Part</th>
                <th className={thCn}>What it must contain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.1]">
              <tr>
                <td className={`${tdCn} font-semibold`}>Risk assessment</td>
                <td className={tdCn}>
                  The task being assessed · the hazards, described specifically · who might be harmed
                  · the controls already in place · a risk rating (likelihood x severity) · any
                  further controls needed
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Method statement</td>
                <td className={tdCn}>
                  Site and project details · scope of work · sequence of operations · plant, tools
                  and test instruments · personnel and their competence · PPE · permits and
                  isolations · emergency procedures
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Sign-off</td>
                <td className={tdCn}>
                  Name, signature and date of the competent person who wrote it · principal
                  contractor review and approval · a record of the briefing given to everyone doing
                  the work
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
        <div className={cardCn}>
          <ul className={listCn}>
            <li className={listItemCn}>
              <strong>Step 1 — Identify the hazards.</strong> What could cause harm? For electrical
              work, hazards include electric shock, arc flash, burns, fire, falls from height (when
              accessing distribution boards at height), manual handling (lifting heavy distribution
              boards or cable drums), and asbestos (in older buildings).
            </li>
            <li className={listItemCn}>
              <strong>Step 2 — Identify who might be harmed.</strong> The electrician carrying out
              the work, other trades working nearby, building occupants, and members of the public
              if the work is in an accessible area.
            </li>
            <li className={listItemCn}>
              <strong>Step 3 — Evaluate the risk.</strong> Score each hazard on likelihood and
              severity so that the highest risks get the most attention. See the matrix below.
            </li>
            <li className={listItemCn}>
              <strong>Step 4 — Set out control measures.</strong> For each hazard, describe the
              specific measures that will reduce the risk. Follow the hierarchy of control:
              eliminate, substitute, engineering controls, administrative controls, PPE.
            </li>
            <li className={listItemCn}>
              <strong>Step 5 — Record and communicate.</strong> Document the assessment, share it
              with all workers involved, and ensure everyone understands the control measures before
              work begins.
            </li>
          </ul>
        </div>

        <h3 className="mt-8 text-[15px] font-semibold tracking-tight text-white">
          Scoring the risk on a 5 x 5 matrix
        </h3>
        <p>
          There is no legally mandated scoring system. Most UK contractors use a 5 x 5 matrix where
          the score is likelihood multiplied by severity, and the bands below are the ones most
          commonly applied — but check your client&apos;s own matrix before you submit, because the
          banding is not standardised.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th className={thCn}>Severity &darr; / Likelihood &rarr;</th>
                <th className={thCn}>1</th>
                <th className={thCn}>2</th>
                <th className={thCn}>3</th>
                <th className={thCn}>4</th>
                <th className={thCn}>5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.1]">
              {[
                [5, [5, 10, 15, 20, 25]],
                [4, [4, 8, 12, 16, 20]],
                [3, [3, 6, 9, 12, 15]],
                [2, [2, 4, 6, 8, 10]],
                [1, [1, 2, 3, 4, 5]],
              ].map(([severity, row]) => (
                <tr key={severity as number}>
                  <td className={`${tdCn} font-semibold`}>{severity as number}</td>
                  {(row as number[]).map((score, i) => (
                    <td key={i} className={`${tdCn} tabular-nums`}>
                      {score}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>1 to 6</strong> is normally treated as low risk, <strong>8 to 12</strong> as
          medium, and <strong>15 to 25</strong> as high. A high score does not mean the job cannot
          go ahead — it means the controls must bring the residual risk down, and the RAMS must show
          that they do.
        </p>

        <div className={cardCn}>
          <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            What the law actually requires of the assessment
          </h3>
          <p className="text-white">
            The Management of Health and Safety at Work Regulations 1999 require employers and
            self-employed persons to assess the risks to workers and to anyone else affected by
            their work, so that they can identify the measures needed to comply with the law.
            Regulation 3 requires that assessment to be <strong>suitable and sufficient</strong>,
            and employers with five or more employees must record the significant findings. HSE
            guidance INDG163 covers these regulations.
          </p>
          <p className="mt-3 text-white">
            BS 7671:2018+A4:2026 adds a point that matters on electrical jobs: for the purposes of
            BS 7671, a risk assessment should involve an appropriate electrically skilled person
            (Appendix 2, item 11). A RAMS for electrical work written by someone with no electrical
            competence will not stand up.
          </p>
        </div>

        <p>
          The risk assessment must be specific to the job. &ldquo;Electrical work&rdquo; is not a
          hazard — &ldquo;contact with live conductors during{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            isolation of the main distribution board
          </SEOInternalLink>
          &rdquo; is a hazard. The more specific the assessment, the more useful it is and the more
          defensible it is.
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
        <div className={cardCn}>
          <ul className={listCn}>
            <li className={listItemCn}>
              <strong>Project details.</strong> Site address, client name, project reference, date,
              and the name of the competent person producing the method statement.
            </li>
            <li className={listItemCn}>
              <strong>Scope of work.</strong> A clear description of what work is being carried out
              — for example, &ldquo;replacement of consumer unit and associated testing&rdquo; or
              &ldquo;periodic inspection and testing of the fixed electrical installation&rdquo;.
            </li>
            <li className={listItemCn}>
              <strong>Sequence of operations.</strong> The step-by-step process, including
              preparation, safe isolation, the work itself, testing, commissioning, and
              reinstatement.
            </li>
            <li className={listItemCn}>
              <strong>Equipment and materials.</strong> What tools, test instruments, materials, and
              access equipment will be used.
            </li>
            <li className={listItemCn}>
              <strong>Personnel and competencies.</strong> Who will carry out the work and what
              qualifications and experience they hold. BS 7671 uses the terms{' '}
              <em>skilled person (electrically)</em> — one with adequate education, training and
              practical skills for the work, able to perceive risks and avoid hazards — and{' '}
              <em>instructed person (electrically)</em>, who is adequately advised or supervised by
              a skilled person. Naming which of your team is which is the clearest way to
              demonstrate competence.
            </li>
            <li className={listItemCn}>
              <strong>PPE requirements.</strong> The specific PPE required for the task — insulated
              gloves, safety glasses, arc-rated clothing if working near live equipment.
            </li>
            <li className={listItemCn}>
              <strong>Emergency procedures.</strong> What to do if something goes wrong — electric
              shock first aid, fire evacuation, reporting procedures.
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
          testing. HSE publication L153 is the supporting guidance. Under CDM 2015, several duty
          holders have responsibilities that your RAMS has to fit into.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li className={listItemCn}>
              <strong>Principal contractor.</strong> Must plan, manage, and monitor the construction
              phase. In practice this means ensuring RAMS are produced for all high-risk activities,
              are site-specific, and are communicated to all workers. The principal contractor
              reviews and approves subcontractor RAMS before work starts.
            </li>
            <li className={listItemCn}>
              <strong>Contractors, including electrical subcontractors.</strong> Must plan, manage,
              and monitor their own work to ensure it is carried out safely — producing RAMS for
              their activities, ensuring their workers are competent, and cooperating with the
              principal contractor.
            </li>
            <li className={listItemCn}>
              <strong>Designers.</strong> Must consider how the design affects health and safety
              during construction and in the finished building. Electrical designers should identify
              hazards that will affect the installation team and communicate them through the
              pre-construction information.
            </li>
            <li className={listItemCn}>
              <strong>Workers.</strong> Must cooperate with the contractor and principal contractor,
              follow the safe system of work described in the RAMS, and report any problems or
              concerns.
            </li>
          </ul>
        </div>
        <h3 className="mt-8 text-[15px] font-semibold tracking-tight text-white">
          Notifiable projects and the construction phase plan
        </h3>
        <p>
          A project is notifiable if the construction work is scheduled to last longer than 30
          working days with more than 20 workers working simultaneously at any point, or to exceed
          500 person-days. Where a project is notifiable it is the <strong>client</strong> — not the
          principal contractor — who must notify the HSE in writing before the construction phase
          begins, and ensure a copy of that notice is displayed on site where workers can read it.
        </p>
        <p>
          A common misconception is that the construction phase plan is only needed on notifiable
          projects. It is not: a construction phase plan is required on <em>every</em> project
          covered by CDM 2015. The plan sets out the health and safety arrangements, the site rules,
          and the specific measures for work involving the particular risks listed in Schedule 3 to
          the Regulations — which is where your RAMS for high-risk electrical activities belong.
        </p>
        <p>
          CDM also reaches past handover. BS 7671 notes on the Electrical Installation Certificate
          that, for a project covered by those Regulations, a copy of the certificate together with
          its schedules must be included in the project health and safety documentation. Plan for
          that at RAMS stage rather than chasing paperwork at the end.
        </p>
      </>
    ),
  },
  {
    id: 'eawr-requirements',
    heading: 'Electricity at Work Regulations 1989: The Primary Statutory Duty',
    content: (
      <>
        <p>
          CDM 2015 governs construction project management, but the{' '}
          <strong>Electricity at Work Regulations 1989 (EAWR)</strong> are the primary legislation
          imposing direct duties on anyone who carries out electrical work. Every electrician&apos;s
          RAMS must demonstrate compliance with EAWR — not just CDM — because it is EAWR that HSE
          inspectors will cite if something goes wrong on an electrical job. HSE publication HSR25
          is the guidance on these Regulations, and BS 7671 points readers to it.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th className={thCn}>Regulation</th>
                <th className={thCn}>What it requires</th>
                <th className={thCn}>What your RAMS must show</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.1]">
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  4
                  <span className="block font-normal">
                    Systems, work activities and protective equipment
                  </span>
                </td>
                <td className={tdCn}>
                  Systems shall be constructed and maintained so as to prevent danger, and every
                  work activity carried out so as not to give rise to danger — in each case so far
                  as is reasonably practicable.
                </td>
                <td className={tdCn}>
                  The condition of the system being worked on, and how the work activity itself is
                  kept safe.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  13
                  <span className="block font-normal">
                    Precautions for work on equipment made dead
                  </span>
                </td>
                <td className={tdCn}>
                  Adequate precautions must be taken to prevent equipment that has been made dead
                  from becoming charged again while work is carried out on or near it.
                </td>
                <td className={tdCn}>
                  The isolation point, lock-off arrangement, warning notices, and the proving-dead
                  step — named explicitly, not implied.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  14
                  <span className="block font-normal">Work on or near live conductors</span>
                </td>
                <td className={tdCn}>
                  No work on or near a live conductor unless it is unreasonable for it to be dead,
                  it is reasonable to work on it live, and suitable precautions are taken to prevent
                  injury.
                </td>
                <td className={tdCn}>
                  A written justification for any live working, the precautions, and who authorised
                  it. Live working is never the default.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>
                  16
                  <span className="block font-normal">
                    Persons to be competent to prevent danger and injury
                  </span>
                </td>
                <td className={tdCn}>
                  No one may do work where technical knowledge or experience is needed to prevent
                  danger unless they possess it, or are supervised to a degree appropriate to the
                  nature of the work.
                </td>
                <td className={tdCn}>
                  Each person named, with their qualifications, registration and relevant
                  experience, and who supervises anyone working under supervision.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Regulation 16 is the one that most often decides whether a RAMS is accepted. BS 7671
          restates it in its definition of &ldquo;person&rdquo;: Regulation 16 of the Electricity at
          Work Regulations 1989 requires persons to be competent to prevent danger and injury, with
          HSE publication HSR25 giving guidance on that competence requirement. Naming people and
          their competence is not box-ticking — it is the statutory duty.
        </p>
        <div className="-mx-5 my-5 rounded-none border-y border-elec-yellow/30 bg-elec-yellow/10 p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
          <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            HSG85 — Electricity at work: Safe working practices
          </h3>
          <p className="text-white">
            HSG85 is the HSE guidance on safe working practices for electrical work, and it sits
            behind the safe isolation procedure described in this guide: establishing site rules and
            procedures before work starts, deciding whether work can be done dead, and the
            precautions where it cannot. Inspectors expect to see it reflected in RAMS for any work
            on or near live electrical systems. It is a free download from the HSE website.
          </p>
        </div>
        <div className="-mx-5 my-5 rounded-none border-y border-orange-500/30 bg-orange-500/10 p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
          <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            Permit to work: when RAMS alone is not enough
          </h3>
          <p className="text-white">
            A RAMS describes the planned safe system of work. A <strong>permit to work (PTW)</strong>{' '}
            is a formal, signed authorisation that a specific isolation has been completed and that
            work may safely proceed. A PTW is required in addition to RAMS for:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-white">
            <li>Isolation of high-voltage equipment or busbar trunking feeders</li>
            <li>Work in confined spaces such as cable ducts and plant rooms</li>
            <li>Hot work near cable routes or electrical panels</li>
            <li>Any isolation where a lock-off and tag procedure alone is insufficient</li>
          </ul>
          <p className="mt-3 text-white">
            Proceeding without a completed PTW where one is required is one of the most serious
            failings identified during electrical site inspections. Your RAMS should state
            explicitly whether a PTW will be required for each activity, and who is authorised to
            issue it. See the{' '}
            <SEOInternalLink href="/guides/safe-isolation-procedure">
              safe isolation procedure guide
            </SEOInternalLink>{' '}
            for the full isolation sequence.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'common-hazards',
    heading: 'Common Electrical Hazards for RAMS',
    content: (
      <>
        <p>
          These are the hazards to consider on almost every electrical job. It is not an exhaustive
          list — every job will have site-specific hazards that must be identified at the planning
          stage.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th className={thCn}>Hazard</th>
                <th className={thCn}>Typical control measures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.1]">
              <tr>
                <td className={`${tdCn} font-semibold`}>Electric shock</td>
                <td className={tdCn}>
                  Safe isolation procedure, lock-off, prove dead, GS38-compliant test equipment,
                  insulated tools, warning notices. BS 7671 Regulation 462.3 requires isolation
                  devices to be installed so as to prevent unintentional or inadvertent closure —
                  by a lockable space or enclosure, padlocking, or siting the device next to the
                  equipment.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Arc flash</td>
                <td className={tdCn}>
                  Work de-energised wherever possible, assess the prospective fault level, arc-rated
                  PPE, restrict access to the working area.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Second supply or stored energy</td>
                <td className={tdCn}>
                  Where an installation, item of equipment or enclosure contains live parts fed from
                  more than one supply, BS 7671 Regulation 537.1.2 requires a durable warning notice
                  so that anyone gaining access is warned to isolate all of them. Where residual
                  energy may be present, Regulation 462.4 requires a means of discharge and, where
                  relevant, a label stating the discharge time before the enclosure can be opened
                  safely. Cover PV, battery storage, UPS and standby generation explicitly.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Fire</td>
                <td className={tdCn}>
                  Extinguisher on site, hot work permit where required, thermal inspection before
                  re-energising, housekeeping around cable routes.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Working at height</td>
                <td className={tdCn}>
                  Step-up platforms, tower scaffolds or a MEWP as appropriate; fall prevention
                  before fall arrest; trained operators. The Work at Height Regulations 2005 apply.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Manual handling</td>
                <td className={tdCn}>
                  Mechanical lifting aids, two-person lifts, a manual handling assessment for
                  distribution boards, cable drums and transformers. The Manual Handling Operations
                  Regulations 1992 apply.
                </td>
              </tr>
              <tr>
                <td className={`${tdCn} font-semibold`}>Asbestos</td>
                <td className={tdCn}>
                  Check the asbestos register before starting. Do not disturb suspect materials —
                  flash pads behind older boards, cable routes, ceiling voids. Stop work and report
                  if asbestos is suspected.
                </td>
              </tr>
            </tbody>
          </table>
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
        <div className={cardCn}>
          <ul className={listCn}>
            <li className={listItemCn}>
              <strong>Be specific.</strong> &ldquo;Install consumer unit in kitchen&rdquo; beats
              &ldquo;electrical installation work&rdquo;. &ldquo;Isolate supply at main switch, lock
              off with personal padlock, prove dead at each outgoing way using a GS38-compliant
              voltage indicator&rdquo; beats &ldquo;safe isolation&rdquo;.
            </li>
            <li className={listItemCn}>
              <strong>Match the method to the risk assessment.</strong> Every significant hazard in
              the risk assessment should have a corresponding control measure in the method
              statement. If the risk assessment identifies working at height to access cable tray,
              the method statement should specify the access equipment and precautions.
            </li>
            <li className={listItemCn}>
              <strong>Use plain language.</strong> RAMS should be understandable to everyone who
              needs to follow them. Avoid jargon where possible and be clear about what needs to
              happen at each step.
            </li>
            <li className={listItemCn}>
              <strong>Include emergency procedures.</strong> What happens if someone receives an
              electric shock? Where is the nearest first aid kit? Who is the first aider on site?
              What is the emergency evacuation procedure?
            </li>
            <li className={listItemCn}>
              <strong>Review and sign.</strong> The RAMS should be signed by the person producing
              it, reviewed and approved by the responsible person or principal contractor, and
              briefed to all workers before work begins. Keep a record of the briefing.
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
        <div className={cardCn}>
          <ul className={listCn}>
            <li className={listItemCn}>
              <strong>Internal review.</strong> Before submitting to the principal contractor,
              review the RAMS internally. Check that all hazards are identified, control measures
              are adequate, and the method is accurate and complete.
            </li>
            <li className={listItemCn}>
              <strong>Principal contractor review.</strong> The principal contractor will review
              your RAMS against the construction phase plan. They may request changes, additional
              detail, or confirmation of specific control measures.
            </li>
            <li className={listItemCn}>
              <strong>Toolbox talk and briefing.</strong> Before work starts, brief all workers on
              the RAMS. Ensure everyone understands the hazards, the control measures, the safe
              method, and the emergency procedures. Record attendance.
            </li>
            <li className={listItemCn}>
              <strong>Ongoing review.</strong> If conditions change during the job — new hazards,
              different access, scope changes — update the RAMS and re-brief the team.
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
          rather spend doing the actual work. Elec-Mate&apos;s AI Health and Safety Agent is
          purpose-built for generating site-specific RAMS for electrical activities.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li className={listItemCn}>
              <strong>Describe the job.</strong> Tell the AI what work you are doing, where, and
              what the installation involves. For example: &ldquo;Consumer unit replacement in a
              three-bedroom semi-detached house. Existing TN-C-S supply. Asbestos flash pad behind
              existing board.&rdquo;
            </li>
            <li className={listItemCn}>
              <strong>The AI generates the RAMS.</strong> A tailored risk assessment with hazard
              identification, risk ratings and control measures, plus a step-by-step method
              statement that carries those control measures through.
            </li>
            <li className={listItemCn}>
              <strong>Review and customise.</strong> Check the output, add the site-specific details
              the AI could not know — access restrictions, client requirements, specific equipment —
              and sign off.
            </li>
            <li className={listItemCn}>
              <strong>Export as PDF.</strong> Send the finished RAMS to the principal contractor or
              client as a professional PDF document.
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
          description="Elec-Mate's AI Health and Safety Agent creates site-specific risk assessments and method statements for electrical work."
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
      description="Complete guide to writing RAMS (Risk Assessment and Method Statement) for electrical work. Risk assessment structure, method statement sections."
      datePublished="2025-03-18"
      dateModified="2026-08-07"
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
      heroSubtitle="Every commercial job needs a RAMS. Every principal contractor demands one before you set foot on site. This guide shows you how to write risk assessments and method statements that are genuinely useful, compliant with CDM 2015 and the Electricity at Work Regulations 1989, and specific to electrical work."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      howToSteps={howToSteps}
      howToHeading="How to Write a Risk Assessment for Electrical Work"
      howToDescription="The standard 5-step risk assessment process used across the UK construction industry, applied to electrical work."
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About RAMS for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Generate Professional RAMS in Minutes"
      ctaSubheading="Elec-Mate's AI Health and Safety Agent creates site-specific RAMS alongside your digital certificates and job documentation. 7-day free trial, cancel anytime."
    />
  );
}
