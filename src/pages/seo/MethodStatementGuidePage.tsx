import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Shield,
  AlertTriangle,
  Lock,
  HardHat,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  ListChecks,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/method-statement-electricians' },
  { label: 'Method Statement', href: '/guides/method-statement-electricians' },
];

const tocItems = [
  { id: 'what-is-method-statement', label: 'What Is a Method Statement?' },
  { id: 'when-required', label: 'When Is One Required?' },
  { id: 'method-statement-sections', label: 'Sections of a Method Statement' },
  { id: 'consumer-unit-example', label: 'Example: Consumer Unit Change' },
  { id: 'rewire-example', label: 'Example: Domestic Rewire' },
  { id: 'rams-package', label: 'The RAMS Package' },
  { id: 'common-errors', label: 'Common Errors to Avoid' },
  { id: 'digital-method-statements', label: 'Going Digital with AI' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A method statement describes the step-by-step safe system of work for carrying out a task, incorporating the control measures identified in the risk assessment.',
  'Method statements are required on most commercial and industrial sites, and increasingly expected for domestic work by competent person schemes and clients.',
  'The standard method statement structure covers: scope of work, personnel and competence, sequence of operations, safety measures, PPE requirements, emergency procedures, and sign-off.',
  'Together with the risk assessment, the method statement forms the RAMS (Risk Assessment and Method Statement) package — the primary safety documentation for any electrical job.',
  'Elec-Mate RAMS generator creates complete method statements tailored to your specific job in minutes, covering all steps, safety measures, and BS 7671 references.',
];

const faqs = [
  {
    question: 'What is the difference between a method statement and a risk assessment?',
    answer:
      'A risk assessment identifies the hazards associated with a task, evaluates the level of risk, and specifies the control measures needed to reduce the risk to an acceptable level. A method statement describes the step-by-step safe system of work for carrying out the task, incorporating those control measures into the sequence of operations. The risk assessment answers "what could go wrong and how do we prevent it?" while the method statement answers "how do we do this job safely, step by step?" Together, they form the RAMS (Risk Assessment and Method Statement) package. You always write the risk assessment first, then the method statement — because the control measures identified in the risk assessment determine the safe work steps described in the method statement.',
  },
  {
    question: 'Is a method statement a legal requirement?',
    answer:
      'A method statement is not explicitly required by a single piece of legislation in the way that a risk assessment is required by the Management of Health and Safety at Work Regulations 1999. However, the requirement for a "safe system of work" is a legal duty under the Health and Safety at Work etc. Act 1974 (Section 2), and a method statement is the standard way of documenting that safe system. For construction work, the Construction (Design and Management) Regulations 2015 (CDM 2015) require contractors to plan, manage, and monitor work to ensure it is carried out safely — which in practice means producing method statements. Most commercial clients, main contractors, and competent person schemes (NICEIC, NAPIT) require method statements as standard.',
  },
  {
    question: 'How detailed should a method statement be?',
    answer:
      'A method statement should be detailed enough that a competent person can follow the steps and carry out the work safely, but not so detailed that it becomes a training manual. Each step should be clear and specific — "isolate the supply at the main switch, apply lock off device, confirm dead using GS 38 approved voltage indicator, prove the proving unit" rather than just "isolate." Include the safety measures and PPE requirements for each step. Reference the relevant regulations and standards where applicable. For straightforward tasks like a socket installation, a method statement might be 1 to 2 pages. For complex tasks like a full rewire or distribution board change, 3 to 5 pages is typical.',
  },
  {
    question: 'Can I use the same method statement for every job?',
    answer:
      'You can use a generic method statement as a starting template for a type of work — for example, "consumer unit replacement" — but you must adapt it for each specific job. The method statement should reflect the actual site conditions, the specific equipment being installed, the personnel involved, and any site-specific hazards or constraints. A consumer unit change in a ground-floor kitchen is different from one in a loft space accessed by a ladder. The generic template saves time, but the site-specific details make it compliant and useful. The Elec-Mate RAMS generator creates site-specific method statements automatically — you describe the job and site conditions, and it produces a tailored document.',
  },
  {
    question: 'Do I need a method statement for domestic work?',
    answer:
      'There is no specific legal requirement for a method statement for domestic electrical work in a private dwelling where you are the sole contractor. However, competent person schemes (NICEIC, NAPIT, ELECSA) expect their registered members to work to safe systems of work, and a method statement is the standard way of documenting this. If you are working as a subcontractor to a main contractor or builder — even on a domestic project — they will almost certainly require a method statement (as part of the RAMS package) before you start. For new-build housing, the main contractor will require RAMS as a condition of access to site.',
  },
  {
    question: 'Who signs off a method statement?',
    answer:
      'The method statement should be prepared by or on behalf of the person or company carrying out the work — that is, the electrician or their employer. It should be signed by the person who prepared it (confirming the content is accurate) and by the person who will be carrying out the work (confirming they have read, understood, and will follow the safe system of work). On commercial and industrial sites, the method statement is typically reviewed and accepted by the main contractor or site manager before work can begin. This sign-off process is part of the permit-to-work or site induction procedure. Keep signed copies for your records — they are evidence of compliance and due diligence.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment Guide',
    description:
      'HSE 5-step risk assessment process for electricians. Electrical hazards, template structure, and legal requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'RAMS Generator Tool',
    description:
      'AI-powered RAMS generator. Describe your job and get a complete risk assessment and method statement in minutes.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/guides/lock-off-loto-procedure',
    title: 'Lock Off / LOTO Procedure',
    description:
      'Lockout/tagout steps for electricians. MCB locks, distribution board isolation, and safe isolation procedure.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'Insulated gloves, safety boots, eye protection, arc flash PPE categories, and voltage-rated VDE tools.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-guide',
    title: 'Consumer Unit Change Guide',
    description:
      'Complete guide to consumer unit replacement. Part P notification, testing, certification, and BS 7671 compliance.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work-electrical',
    title: 'Permit to Work Guide',
    description:
      'When a permit to work is required for electrical work, what it covers, and how it links to your RAMS.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-method-statement',
    heading: 'What Is a Method Statement?',
    content: (
      <>
        <p>
          A method statement is a document that describes the safe system of work for carrying out a
          specific task. It sets out the step-by-step sequence of operations, the safety measures to
          be followed at each stage, the personnel and competence required, the PPE to be worn, and
          the emergency procedures in case something goes wrong.
        </p>
        <p>
          For electricians, a method statement takes the control measures identified in the{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessment
          </SEOInternalLink>{' '}
          and builds them into a practical sequence of work. Where the risk assessment says "the
          risk of electric shock will be controlled by safe isolation," the method statement
          describes exactly how the safe isolation will be carried out, step by step, referencing
          the specific procedure, equipment, and checks involved.
        </p>
        <p>
          The method statement is sometimes called a "safe system of work" (SSOW), a "safe work
          method statement" (SWMS), or simply "the method." In the context of construction and
          commercial electrical work, it is almost always paired with a risk assessment to form the{' '}
          <strong>RAMS</strong> (Risk Assessment and Method Statement) package.
        </p>
        <p>
          A well-written method statement serves multiple purposes: it demonstrates competence and
          professionalism to clients and main contractors, it provides a briefing document for
          everyone involved in the work, it acts as evidence of due diligence in the event of an
          incident, and it satisfies the requirements of competent person schemes such as NICEIC and
          NAPIT.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is a Method Statement Required?',
    content: (
      <>
        <p>
          While there is no single law that says "you must write a method statement," the practical
          reality is that method statements are expected for almost all professional electrical
          work. Here are the specific situations where you will need one:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and industrial sites</strong> — main contractors require RAMS as
                a condition of access to site. You will not be allowed to start work without
                submitting your risk assessment and method statement for the specific tasks you will
                be carrying out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction sites under CDM 2015</strong> — the Construction (Design and
                Management) Regulations 2015 require contractors to plan, manage, and monitor work
                to ensure it is carried out safely. Method statements are the standard mechanism for
                documenting this planning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work requiring a permit to work</strong> — hot work, confined space entry,
                work at height, and certain electrical tasks (such as work on or near live
                equipment) may require a{' '}
                <SEOInternalLink href="/guides/permit-to-work-electrical">
                  permit to work
                </SEOInternalLink>
                . The permit references the method statement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme requirements</strong> — NICEIC, NAPIT, and ELECSA
                expect their registered contractors to work to documented safe systems of work.
                Method statements are reviewed during annual assessments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client requirements</strong> — many private clients, property management
                companies, housing associations, and local authorities now require RAMS as standard
                documentation, even for domestic work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'method-statement-sections',
    heading: 'Sections of a Method Statement',
    content: (
      <>
        <p>
          A standard method statement for electrical work should include the following sections:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Header and Project Information</h4>
                <p className="text-white text-sm leading-relaxed">
                  Company name, method statement reference number, date, revision number, project
                  name and address, client name, main contractor name (if applicable), and the name
                  and qualification of the person who prepared the document.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Scope of Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  A clear description of the work to be carried out — for example, "replacement of
                  existing single-phase 6-way consumer unit with 18th Edition dual RCD split-load
                  consumer unit, including testing and certification." Be specific about what is
                  included and excluded.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Personnel and Competence</h4>
                <p className="text-white text-sm leading-relaxed">
                  The names and qualifications of the people carrying out the work. Include relevant
                  qualifications (18th Edition, 2391, AM2), scheme registration, and any
                  site-specific training or inductions completed (CSCS card, site-specific
                  induction, asbestos awareness).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Sequence of Operations</h4>
                <p className="text-white text-sm leading-relaxed">
                  The step-by-step safe system of work, in the order the tasks will be carried out.
                  Each step should describe the action, the safety measures applied, and any
                  specific tools or equipment required. Reference the relevant standards — for
                  example, "carry out safe isolation per{' '}
                  <SEOInternalLink href="/guides/safe-isolation-procedure">
                    safe isolation procedure
                  </SEOInternalLink>
                  , <SEOInternalLink href="/guides/gs-38-proving-dead">GS 38</SEOInternalLink>
                  ."
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">5. PPE Requirements</h4>
                <p className="text-white text-sm leading-relaxed">
                  List all{' '}
                  <SEOInternalLink href="/guides/ppe-for-electricians">
                    PPE required
                  </SEOInternalLink>{' '}
                  for the task — insulated gloves (specify class), safety boots (specify rating),
                  safety glasses or face shield, hard hat (if required by site), and any additional
                  PPE such as arc flash coveralls or hearing protection.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">6. Tools and Equipment</h4>
                <p className="text-white text-sm leading-relaxed">
                  List the tools and equipment to be used, including VDE insulated tools, test
                  instruments (multifunction tester, voltage indicator, proving unit), access
                  equipment (ladders, step platforms), and any specialist equipment.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">7. Emergency Procedures</h4>
                <p className="text-white text-sm leading-relaxed">
                  What to do in the event of an electric shock, fire, injury, or other emergency.
                  Location of first aid kit, nearest A and E, emergency contact numbers, and the
                  procedure for reporting incidents.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ListChecks className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">8. Sign-Off</h4>
                <p className="text-white text-sm leading-relaxed">
                  Signature of the person who prepared the method statement, signature of the person
                  carrying out the work (confirming they have read and understood it), and
                  acceptance by the client or main contractor where applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit-example',
    heading: 'Example: Method Statement for a Consumer Unit Change',
    content: (
      <>
        <p>
          A{' '}
          <SEOInternalLink href="/guides/consumer-unit-change-guide">
            consumer unit replacement
          </SEOInternalLink>{' '}
          is one of the most common tasks requiring a method statement. Here is a simplified example
          of the sequence of operations section:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Site arrival and preparation.</strong> Arrive on site, report to client/site
              manager, confirm scope of work. Carry out dynamic risk assessment of immediate work
              area. Lay down dust sheets and protection as required.
            </li>
            <li>
              <strong>Notify building occupants.</strong> Inform all occupants that the electrical
              supply will be disconnected for the duration of the work (typically 4 to 6 hours).
            </li>
            <li>
              <strong>Pre-installation inspection and testing.</strong> Carry out visual inspection
              of existing installation. Record existing circuit details, cable sizes, and protective
              device ratings. Take pre-installation readings on all circuits.
            </li>
            <li>
              <strong>Safe isolation.</strong> Isolate at the main switch. Apply{' '}
              <SEOInternalLink href="/guides/lock-off-loto-procedure">
                lock off device
              </SEOInternalLink>
              . Prove dead using GS 38 approved voltage indicator and proving unit (test, prove,
              retest). Display warning signage.
            </li>
            <li>
              <strong>Remove existing consumer unit.</strong> Disconnect all circuit cables,
              labelling each one. Remove the existing consumer unit from the backboard.
            </li>
            <li>
              <strong>Install new consumer unit.</strong> Mount the new consumer unit. Route and
              terminate all circuit cables to the correct MCBs/RCBOs per the circuit schedule.
              Ensure correct torque settings on all terminations.
            </li>
            <li>
              <strong>Post-installation testing.</strong> Carry out full testing sequence per BS
              7671 — continuity, insulation resistance, polarity, earth fault loop impedance, PFC,
              and RCD testing.
            </li>
            <li>
              <strong>Energise and final checks.</strong> Remove lock off device. Energise the
              installation. Verify correct operation of all circuits.
            </li>
            <li>
              <strong>Certification and handover.</strong> Complete the Electrical Installation
              Certificate (EIC). Provide certificate, consumer unit schedule, and installation
              manual to the client. Notify Building Control via Part P notification.
            </li>
            <li>
              <strong>Site clearance.</strong> Remove all waste materials, packaging, and dust
              sheets. Leave the work area clean and tidy.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Generate method statements for any electrical task"
          description="Elec-Mate's RAMS generator creates complete method statements for consumer unit changes, rewires, fault finding, EV charger installations, and any other electrical task. Describe the job, get a professional document in minutes."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'rewire-example',
    heading: 'Example: Method Statement for a Domestic Rewire',
    content: (
      <>
        <p>
          A domestic rewire is a larger, more complex project that requires a more detailed method
          statement. The sequence of operations typically covers multiple phases of work over
          several days:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Pre-start survey and planning.</strong> Survey the property to confirm cable
              routes, accessory positions, and circuit layout. Check for asbestos (commission survey
              if property is pre-2000). Agree access arrangements with the client. Produce circuit
              design and cable schedule.
            </li>
            <li>
              <strong>Phase 1 — First fix.</strong> Isolate and disconnect existing installation.
              Remove old wiring where accessible. Install new cable routes. Run new cables from
              consumer unit position to all accessory positions. Install back boxes and conduit.
            </li>
            <li>
              <strong>Phase 2 — Consumer unit installation.</strong> Install new consumer unit with
              all protective devices per circuit design. Terminate all circuit cables. Label all
              circuits clearly.
            </li>
            <li>
              <strong>Phase 3 — Second fix.</strong> Install all accessories (sockets, switches,
              light fittings, smoke alarms). Make all final connections and terminations.
            </li>
            <li>
              <strong>Phase 4 — Testing and certification.</strong> Carry out full testing sequence
              per BS 7671. Complete EIC with full schedule of test results. Notify Building Control
              via Part P. Hand over all certificates and documentation to client.
            </li>
          </ol>
        </div>
        <p>
          Each phase should have its own detailed method statement covering the specific tasks,
          safety measures, and{' '}
          <SEOInternalLink href="/guides/ppe-for-electricians">PPE requirements</SEOInternalLink>{' '}
          for that phase. The{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessment
          </SEOInternalLink>{' '}
          should be reviewed at the start of each phase, and a dynamic risk assessment should be
          carried out daily.
        </p>
      </>
    ),
  },
  {
    id: 'rams-package',
    heading: 'The RAMS Package: Risk Assessment + Method Statement',
    content: (
      <>
        <p>
          RAMS stands for Risk Assessment and Method Statement. It is the standard safety
          documentation package required for electrical work on commercial and industrial sites, and
          increasingly expected for domestic work as well.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk assessment</strong> — identifying hazards, evaluating risks, and
                specifying control measures using the HSE 5-step process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method statement</strong> — the step-by-step safe system of work,
                incorporating the control measures from the risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>COSHH assessments</strong> — if any hazardous substances are used (cleaning
                agents, cable lubricant, adhesives), a Control of Substances Hazardous to Health
                assessment should be included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supporting documentation</strong> — copies of relevant qualifications,
                scheme registration, public liability insurance, employers liability insurance, and
                CSCS cards.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The RAMS package should be submitted to the main contractor or client before work begins.
          Allow time for review and approval — on larger sites, this can take several days. Keep a
          copy on site at all times and make sure everyone involved in the work has read and signed
          the method statement.
        </p>
      </>
    ),
  },
  {
    id: 'common-errors',
    heading: 'Common Method Statement Errors to Avoid',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Too vague</strong> — writing "carry out electrical work safely" is not a
                method statement. Each step must be specific, actionable, and include the safety
                measures to be applied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not site-specific</strong> — using the exact same generic method statement
                for every job without adapting it to the specific site conditions, equipment, and
                hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnected from risk assessment</strong> — the method statement must
                directly reference and incorporate the control measures identified in the risk
                assessment. They must work together as a pair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing emergency procedures</strong> — every method statement must include
                what to do if something goes wrong. Electric shock response, fire evacuation, first
                aid, and incident reporting procedures should all be covered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No sign-off</strong> — a method statement that has not been read and signed
                by the people carrying out the work is just a piece of paper. The sign-off confirms
                that everyone understands the safe system of work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'digital-method-statements',
    heading: 'Going Digital: AI-Generated Method Statements',
    content: (
      <>
        <p>
          Writing method statements from scratch is time-consuming. Adapting generic templates for
          each job is tedious and error-prone. Most electricians would rather be on site doing the
          work than sitting at a desk writing safety documents.
        </p>
        <p>
          Elec-Mate's <SEOInternalLink href="/tools/rams-generator">RAMS generator</SEOInternalLink>{' '}
          solves this problem. The AI Health and Safety agent creates complete, site-specific method
          statements in minutes. You describe the job — the task, the site, the equipment, the
          personnel — and the AI produces a professional method statement covering all steps, safety
          measures, PPE requirements, and emergency procedures. It references the correct
          regulations and standards, uses industry-standard terminology, and produces a document
          ready for submission to main contractors or clients.
        </p>
        <p>
          The training courses on the Elec-Mate platform — including{' '}
          <SEOInternalLink href="/training/asbestos-awareness">asbestos awareness</SEOInternalLink>,{' '}
          <SEOInternalLink href="/training/pasma">PASMA</SEOInternalLink>,{' '}
          <SEOInternalLink href="/training/ipaf">IPAF</SEOInternalLink>, and{' '}
          <SEOInternalLink href="/training/manual-handling">manual handling</SEOInternalLink> —
          ensure your team has the knowledge to implement the safe systems of work described in the
          method statement.
        </p>
        <SEOAppBridge
          title="Complete RAMS in minutes, not hours"
          description="Elec-Mate's RAMS generator creates risk assessments and method statements tailored to your specific job. Describe the work, get professional RAMS documentation ready for site. Used by 430+ UK electricians."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MethodStatementGuidePage() {
  return (
    <GuideTemplate
      title="Method Statement for Electricians | Template Guide"
      description="Complete guide to writing method statements for electrical work. Template structure, sections explained, consumer unit change and rewire examples, RAMS package, and how to generate method statements with AI."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          Method Statement for Electricians:{' '}
          <span className="text-yellow-400">The Complete Template Guide</span>
        </>
      }
      heroSubtitle="What a method statement is, when you need one, the standard sections, examples for consumer unit changes and rewires, and how to generate professional method statements in minutes with AI. This guide covers everything electricians need to know about safe systems of work."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Method Statements for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Generate Method Statements in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI RAMS generator to create site-specific method statements for any electrical task. Describe the job, get a professional document. 7-day free trial, cancel anytime."
    />
  );
}
