import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldAlert,
  Zap,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  Brain,
  FileCheck2,
  HardHat,
  Scale,
  Lock,
  CheckCircle2,
  ListOrdered,
  Wrench,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Method Statement for Electrical Work | Template & Guide';
const PAGE_DESCRIPTION =
  'Method statements for electrical work: what to include, when required, common MS (rewire, CU change, testing, EV charger), RAMS, templates.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Method Statement for Electrical Work', href: '/guides/method-statement-electrical' },
];

const answerBox = {
  question: 'What is a method statement for electrical work?',
  answer:
    'A method statement is a written, step-by-step description of how a specific electrical job will be carried out safely — from site set-up through safe isolation, installation, testing and handover. It states what is done at each stage, who does it, the equipment used and the safety controls in place. Paired with a risk assessment it forms a RAMS pack, the standard document clients and principal contractors require before work begins.',
};

const tocItems = [
  { id: 'what-is-method-statement', label: 'What Is a Method Statement?' },
  { id: 'when-required', label: 'When Is a Method Statement Required?' },
  { id: 'what-to-include', label: 'What to Include' },
  { id: 'how-to-write', label: 'How to Write a Method Statement' },
  { id: 'common-method-statements', label: 'Common Electrical Method Statements' },
  { id: 'relationship-to-risk-assessment', label: 'Relationship to Risk Assessment' },
  { id: 'rams-explained', label: 'RAMS: The Complete Safety Pack' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A method statement is a step-by-step description of how work will be carried out safely — it describes the sequence of operations, resources required, and safety precautions at each stage.',
  'Method statements are required for any significant electrical work and are universally expected by principal contractors, commercial clients, and building managers before work can begin on site.',
  'The method statement must be specific to the job and site — generic template method statements that do not address the actual work being done are increasingly being rejected by safety-conscious clients.',
  'Together with the risk assessment, the method statement forms a RAMS pack (Risk Assessment and Method Statement) — the standard safety document package for electrical contracting.',
  'Elec-Mate generates professional, site-specific method statements from a plain-English job description in under 60 seconds using its AI Health and Safety agent and RAMS Generator.',
  'Post-A4:2026 method statements for domestic consumer unit changes and rewires must address two new design checkpoints: AFDDs on socket-outlet final circuits not exceeding 32 A (Reg 421.1.7 — a requirement in higher-risk residential buildings, HMOs, purpose-built student accommodation and care homes; recommended elsewhere) and RCD protection not exceeding 30 mA on all final circuits supplying luminaires in domestic premises (Reg 411.3.4, mandatory).',
  'Safe isolation described in a method statement must follow the OSG Reg 12.5 minimum three-stage sequence before testing dead: (1) positively identify the isolation point, (2) check the VID condition, (3) confirm VID functioning on a known live source.',
];

const faqs = [
  {
    question: 'What is a method statement for electrical work?',
    answer:
      'A method statement is a written document that describes, step by step, how a piece of electrical work will be carried out safely. It follows the chronological sequence of the job from initial site mobilisation through to completion and handover, describing at each stage what work is being done, who is doing it, what equipment and materials are being used, and what safety precautions are in place. Unlike a risk assessment (which identifies hazards and specifies control measures), the method statement describes the practical implementation of those controls within the actual work sequence. A good method statement is specific enough that someone unfamiliar with the job could read it and understand the safe sequence of work. It integrates the safety controls from the risk assessment into the work process, so safety is embedded in the method rather than bolted on as an afterthought.',
  },
  {
    question: 'Is a method statement a legal requirement?',
    answer:
      'There is no single regulation that explicitly requires a method statement by name. However, the Management of Health and Safety at Work Regulations 1999 require employers to plan, organise, control, monitor, and review their preventive and protective measures. The Construction (Design and Management) Regulations 2015, Regulation 15, require contractors to plan, manage, and monitor construction work to ensure it is carried out safely. In practice, a method statement is the accepted means of demonstrating compliance with these planning and management duties. It shows that you have planned the work in advance, thought through the sequence of operations, identified the safety precautions at each stage, and communicated the plan to everyone involved. Additionally, virtually all commercial clients, principal contractors, and building managers require written method statements as part of the RAMS pack before permitting electrical work to begin on their sites. The commercial expectation now exceeds the legal minimum, and any electrical contractor who cannot produce professional method statements will struggle to win work on managed sites.',
  },
  {
    question: 'What is the difference between a method statement and a risk assessment?',
    answer:
      'A risk assessment and a method statement are two distinct but complementary documents that together form a RAMS pack. The risk assessment identifies the hazards, evaluates the risks (using a likelihood-times-severity matrix), and specifies the control measures needed to reduce risk to an acceptable level. It answers the questions "What could go wrong?" and "What are we going to do about it?" The method statement describes the step-by-step sequence of how the work will actually be carried out, incorporating the control measures identified in the risk assessment into the practical work process. It answers the question "How exactly are we going to do this work safely?" The risk assessment informs the method statement — the controls identified in the risk assessment become the safety precautions at each stage of the method statement. Without a risk assessment, the method statement has no basis for its safety precautions. Without a method statement, the risk assessment has no practical implementation plan. This is why they are always required together as a RAMS pack.',
  },
  {
    question: 'Can I use a generic method statement template?',
    answer:
      'A generic method statement template can be used as a starting point, but it must be customised for the specific job and site. A method statement that says "carry out safe isolation as per company procedure" is not sufficient — it must specify which circuits will be isolated, at which distribution board, using what method of isolation, with what lock-off devices, tested with what type of voltage indicator, and following what procedure (GS 38 prove-test-prove). Principal contractors and site safety teams are increasingly rejecting generic method statements because they do not demonstrate that the contractor has actually thought about the specific hazards and sequence of work for that particular job on that particular site. The HSE also takes a dim view of generic risk assessments and method statements that are clearly copied from a template without site-specific modification. Elec-Mate solves this problem by generating method statements from your specific job description, producing genuinely site-specific documents rather than padded-out templates.',
  },
  {
    question: 'What level of detail should a method statement include?',
    answer:
      'The level of detail in a method statement should be proportionate to the complexity and risk of the work. A simple like-for-like socket outlet replacement in a domestic property needs less detail than a full rewire of a three-storey commercial building. However, even simple jobs must include the key safety elements: identification of the circuit, safe isolation procedure, work description, testing and verification, and completion/handover. The test is whether a competent person reading the method statement would understand the safe sequence of work without needing to ask additional questions. Common errors include being too vague (saying "install cabling" without specifying routes, containment, and fire stopping) or too detailed (describing how to strip a cable end when the reader is a qualified electrician). The method statement should focus on the sequence, the safety controls, and the critical quality and safety checkpoints, rather than on basic trade skills that any qualified electrician would know.',
  },
  {
    question: 'How does Elec-Mate generate method statements?',
    answer:
      'Elec-Mate provides two tools for generating method statements. The AI Health and Safety agent generates complete RAMS packs (Risk Assessment and Method Statement together) from a plain-English job description. You describe the work — for example, "Consumer unit upgrade in a 1950s end-terrace, TN-S earthing, customer in residence, existing rewirable fuses to be replaced with metal AMD3 board" — and the AI produces a full method statement covering site mobilisation, safe isolation, removal of the existing board, installation of the new board, circuit connections, testing and commissioning, and handover. The RAMS Generator tool provides a similar capability through a more structured interface. Both tools produce site-specific method statements based on the actual job you describe, not generic templates. The output includes safety precautions at each stage, referencing the control measures from the accompanying risk assessment. Documents can be exported as professional PDFs with your company branding, ready to submit to clients and principal contractors.',
  },
];

const howToSteps = [
  {
    name: 'Define the scope of work',
    text: 'Clearly describe what work is to be carried out, where, and when. Be specific: "Installation of new 18-way metal consumer unit (AMD3 type) replacing existing 8-way plastic consumer unit at 42 Oak Road, Ground Floor Hallway Cupboard. Supply: single-phase 100 A TNS. Duration: 1 day." The scope defines the boundaries of the method statement — work outside this scope needs its own assessment.',
  },
  {
    name: 'List resources required',
    text: 'Document the personnel (number of people, qualifications, competence requirements), tools and equipment (test instruments, power tools, hand tools, access equipment), materials (consumer unit, cables, accessories, containment), and PPE required. Include specific requirements such as "GS 38 compliant two-pole voltage indicator" and "insulated tool kit to BS EN 60900." This ensures everything is available before work begins and nothing is improvised on site.',
  },
  {
    name: 'Write the step-by-step sequence',
    text: 'Describe the work in chronological order from arrival on site to handover. Each step should describe what is being done, who is doing it, what safety precautions apply at that stage, and what equipment is being used. Include critical safety checkpoints such as safe isolation verification following the OSG Reg 12.5 minimum sequence — positively identify the isolation point, check VID condition, confirm VID on a known live source, test dead, confirm VID again — insulation resistance testing before energising, and correct GS 38 prove-test-prove before working on any conductors. The sequence must be logical and workable — it should reflect how the work will actually be done, not an idealised version that bears no relation to site reality.',
  },
  {
    name: 'Include emergency procedures',
    text: 'Document what to do if something goes wrong. Location of the nearest first aid kit and defibrillator. Name and contact number of the site first aider. Emergency services contact procedure. Action in the event of electric shock (isolate supply, do not touch the casualty if still in contact, call 999, begin CPR if qualified). Action in the event of fire (raise the alarm, evacuate, call 999, do not fight fires beyond your training). Location of emergency assembly point.',
  },
  {
    name: 'Review and approve',
    text: 'Have the method statement reviewed by a competent person before issuing it. Check that the sequence is logical, the safety precautions are adequate, the resources are realistic, and the document is specific to the actual job and site. On commercial sites, the method statement will be reviewed by the principal contractor or their safety team as part of the RAMS approval process. Incorporate their feedback and resubmit if required. Only begin work after the method statement has been approved.',
  },
];

const commonMethodStatements = [
  {
    title: 'Domestic Rewire',
    icon: Home,
    tint: 'bg-yellow-500/5 border-yellow-500/20',
    steps: [
      'Mobilisation, customer briefing, and agreement of working hours and access',
      'Asbestos assessment (mandatory consideration in pre-2000 properties)',
      'Existing installation survey and circuit identification',
      'Temporary supply arrangements where the customer remains in residence',
      'Safe isolation of existing circuits before any disconnection',
      'First fix — cable routes, containment, and cabling with fire stopping at every penetration',
      'Consumer unit installation and termination in a non-combustible enclosure (Reg 421.1.201)',
      'Second fix — accessories, terminations, and final connections',
      'Initial verification — dead and live tests in the BS 7671 sequence',
      'Building control notification under Part P via a competent person scheme',
      'Customer handover with the EIC and operating instructions',
    ],
    checkpointsHeading: 'A4:2026 Design & Commissioning Checkpoints',
    checkpoints: [
      {
        label: 'AFDDs (Reg 421.1.7):',
        text: 'arc fault detection devices are a requirement on socket-outlet final circuits rated up to 32 A in higher-risk residential buildings, HMOs, purpose-built student accommodation and care homes, and are recommended for single-phase socket-outlet circuits up to 32 A elsewhere. Record the AFDD decision in the method statement.',
      },
      {
        label: 'RCD on luminaires (Reg 411.3.4):',
        text: 'within domestic premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires. Verify this at commissioning before completing the EIC.',
      },
    ],
  },
  {
    title: 'Consumer Unit Change',
    icon: Wrench,
    tint: 'bg-white/[0.04] border-white/10',
    steps: [
      'Site assessment and review of the existing installation',
      'Safe isolation of the incoming supply (coordinate with the DNO if the service fuse must be pulled)',
      'Removal of the existing consumer unit',
      'Installation of the new non-combustible (e.g. ferrous metal) consumer unit per Reg 421.1.201',
      'Circuit transfer and termination to the correct manufacturer torque settings',
      'Labelling of every circuit and the main switch',
      'Initial verification — dead and live tests',
      'Completion of the Electrical Installation Certificate (EIC)',
      'Part P building control notification',
      'Customer handover, addressing the period when the supply was isolated and power was lost',
    ],
    checkpointsHeading: 'A4:2026 Design & Commissioning Checkpoints',
    checkpoints: [
      {
        label: 'AFDDs (Reg 421.1.7):',
        text: 'confirm whether AFDDs are required (socket-outlet circuits up to 32 A in higher-risk residential buildings, HMOs, purpose-built student accommodation and care homes) or recommended (single-phase socket-outlet circuits up to 32 A elsewhere), and record the decision.',
      },
      {
        label: 'RCD on luminaires (Reg 411.3.4):',
        text: 'verify that all final circuits supplying luminaires in domestic premises are protected by a 30 mA RCD before completing the EIC.',
      },
    ],
  },
  {
    title: 'EICR (Electrical Installation Condition Report)',
    icon: ClipboardCheck,
    tint: 'bg-white/[0.04] border-white/10',
    steps: [
      'Pre-inspection consultation — scope, access requirements, and shutdown arrangements',
      'Visual inspection of the installation',
      'Safe isolation in preparation for dead testing',
      'Dead tests in the GN3 sequence — continuity, insulation resistance, polarity',
      'Re-energise and carry out live tests — earth fault loop impedance (Zs), prospective fault current, RCD operation',
      'Record all measured results',
      'Classify observations using codes C1, C2, C3 and FI',
      'Complete the EICR form',
      'Handover and explanation of findings to the client',
    ],
  },
  {
    title: 'EV Charger Installation',
    icon: Zap,
    tint: 'bg-white/[0.04] border-white/10',
    steps: [
      'Site survey — supply capacity, maximum demand calculation, cable route, and charger location',
      'DNO notification (G98/G99 application where required)',
      'Cable sizing calculation including voltage drop',
      'Installation of a dedicated circuit from the consumer unit to the charge point',
      'Cable containment and mechanical protection',
      'Earth electrode installation where a TT system or supplementary earthing is required',
      'Charger mounting and connection',
      'Testing and commissioning',
      'Completion of the EIC',
      'OZEV grant paperwork where applicable, then customer handover and operating instructions',
    ],
    checkpointsHeading: 'A4:2026 Commissioning Checkpoint',
    checkpoints: [
      {
        label: 'Load curtailment (Reg 722.311.201):',
        text: 'load curtailment — including load reduction or disconnection, automatically or manually — may be taken into account when determining maximum demand of the installation or part thereof. Where a dynamic load management device is fitted, record the curtailment scheme and confirm its correct operation at commissioning.',
      },
    ],
  },
];

const sections = [
  {
    id: 'what-is-method-statement',
    heading: 'What Is a Method Statement?',
    content: (
      <>
        <p>
          A method statement is a written document that provides a step-by-step description of how a
          piece of work will be carried out safely. It follows the chronological sequence of the job
          from start to finish, describing at each stage what work is being performed, what safety
          precautions are in place, what equipment is being used, and who is responsible.
        </p>
        <p>
          Think of a method statement as the instruction manual for a safe job. Where a{' '}
          <SEOInternalLink href="/guides/risk-assessment-electrical-work">
            risk assessment
          </SEOInternalLink>{' '}
          identifies the hazards and specifies the control measures, the method statement describes
          how those controls are implemented within the practical sequence of work. The risk
          assessment says "safe isolation is required before working on conductors"; the method
          statement describes exactly how that safe isolation will be carried out — at which
          distribution board, on which circuit, using what voltage indicator, with what lock-off
          devices.
        </p>
        <p>
          A good method statement has three qualities: it is specific (it describes the actual work
          on the actual site, not a generic template), it is sequential (it follows the natural
          order of the work from mobilisation to completion), and it is practical (it describes what
          will actually happen on site, not an unrealistic ideal that nobody follows).
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
          A method statement is expected for any significant electrical work. While there is no
          single regulation that requires a "method statement" by name, the duty to plan, manage,
          and monitor work safely under CDM 2015 and the MHSWR 1999 is in practice fulfilled by
          producing a method statement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Method Statements Are Expected For</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All work on commercial and industrial sites (universally required by principal
                contractors)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Any notifiable work under CDM 2015 (projects lasting more than 30 working days with
                more than 20 workers, or exceeding 500 person-days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Work in managed residential buildings (housing associations, local authorities,
                managing agents)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Consumer unit changes, rewires, and new installations in domestic properties (best
                practice)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Any work involving high-risk activities (live working, confined spaces, working at
                height)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                EV charger installations (OZEV grant compliance and DNO notification requirements)
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, producing a method statement for every job — including domestic work — is
          good business practice as well as good safety practice. It demonstrates professionalism,
          gives the customer confidence in your approach, and provides documented evidence of your
          safe system of work in the event of any future dispute or investigation.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-include',
    heading: 'What to Include in an Electrical Method Statement',
    content: (
      <>
        <p>
          An effective method statement covers the complete work process from mobilisation to
          handover. While the specific content varies with the type and complexity of the work,
          every electrical method statement should include the following core elements.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Header Information</h3>
            <p className="text-white text-sm leading-relaxed">
              Project name and address, client name, contractor details, document reference number,
              revision number and date, author name and qualification, scope of work description,
              and duration of works. This information identifies the document and links it to the
              specific project.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Resources</h3>
            <p className="text-white text-sm leading-relaxed">
              Personnel required (number, qualifications, competence requirements), tools and
              equipment (test instruments, power tools, access equipment), materials (specification
              and quantities), and PPE requirements (type, standard, rating). All resources must be
              identified before work begins to prevent improvisation on site.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Sequence of Operations</h3>
            <p className="text-white text-sm leading-relaxed">
              The step-by-step work sequence in chronological order. Each step describes the work
              activity, the safety precautions in place, the quality checks required, and who is
              responsible. For electrical work, this typically covers: site induction and set-up,{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation
              </SEOInternalLink>
              , first fix (containment and cabling), second fix (accessories and terminations),
              testing and commissioning, and handover.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Emergency Procedures</h3>
            <p className="text-white text-sm leading-relaxed">
              Actions in the event of electric shock, fire, injury, or other emergency. Location of
              first aid equipment, defibrillator, and fire extinguisher. Emergency contact numbers.
              Evacuation routes and assembly points. Name of the designated first aider.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Waste Management</h3>
            <p className="text-white text-sm leading-relaxed">
              How waste materials will be handled and disposed of. Segregation of waste types
              (general, electrical, hazardous). Disposal of old cables, consumer units, and
              components. WEEE (Waste Electrical and Electronic Equipment) disposal requirements.
              Asbestos waste handling if asbestos-containing materials are encountered.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-write',
    heading: 'How to Write an Effective Method Statement',
    content: (
      <>
        <p>
          Writing an effective method statement requires a balance between sufficient detail and
          practical readability. The document must be detailed enough to describe a safe sequence of
          work but concise enough that the people doing the work will actually read it.
        </p>
        <p>
          Start by walking through the job mentally (or physically, if you have access to the site)
          from arrival to departure. At each stage, ask yourself: what am I doing, what could go
          wrong, what precautions do I need, and what equipment do I need? Write each stage as a
          numbered step in clear, plain language.
        </p>
        <p>
          Use specific, measurable language rather than vague generalities. Instead of "ensure safe
          isolation is carried out," write "isolate Circuit 3 at MCB position 6 in DB-1, apply
          lock-off device and personal padlock, prove dead using GS 38 compliant two-pole voltage
          indicator (prove-test-prove), and attach warning label." This level of specificity
          demonstrates that you have actually planned the work rather than copied a template.
        </p>
        <p>
          Include safety hold points — critical checkpoints where work must stop until a specific
          safety condition is verified. Common electrical hold points include: safe isolation
          verified before working on conductors, insulation resistance confirmed satisfactory before
          energising new circuits, and all covers and barriers replaced before leaving the work area
          unattended.
        </p>
        <SEOAppBridge
          title="AI writes method statements from your job description"
          description="Describe your job in plain English — 'Full rewire of a 1930s three-bed semi, TN-S supply…"
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'common-method-statements',
    heading: 'Common Electrical Method Statements',
    content: (
      <>
        <p>
          While every method statement must be site-specific, certain types of electrical work are
          common enough that standard method statement structures can be identified. Here are the
          key sections you would expect in method statements for the most common electrical jobs.
        </p>
        <div className="space-y-6 mt-6">
          {commonMethodStatements.map((ms) => {
            const Icon = ms.icon;
            return (
              <div key={ms.title} className={`rounded-2xl border p-5 ${ms.tint}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">{ms.title}</h3>
                </div>
                <ol className="space-y-2">
                  {ms.steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl bg-black/20 border border-white/10 px-3 py-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-yellow-400 text-black text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-white text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                {ms.checkpoints && (
                  <div className="rounded-2xl bg-blue-500/5 border border-blue-500/20 p-4 mt-4">
                    <h4 className="font-semibold text-white text-sm mb-2">
                      {ms.checkpointsHeading}
                    </h4>
                    <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
                      {ms.checkpoints.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-300 mt-0.5 shrink-0">▸</span>
                          <span>
                            <strong className="text-white">{c.label}</strong> {c.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    ),
  },
  {
    id: 'relationship-to-risk-assessment',
    heading: 'Relationship to Risk Assessment',
    content: (
      <>
        <p>
          The method statement and risk assessment are two halves of the same safety document
          package. The risk assessment identifies the hazards and specifies what control measures
          are needed; the method statement describes how those controls are implemented within the
          practical sequence of work. Neither document is complete without the other.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-yellow-400" />
              Risk Assessment
            </h3>
            <ul className="space-y-2 text-white/85 text-sm leading-relaxed">
              <li>Answers "what could go wrong, and what will we do about it?"</li>
              <li>Identifies hazards and the people at risk</li>
              <li>Scores risk on a likelihood-times-severity matrix</li>
              <li>Specifies control measures and the hierarchy of controls</li>
              <li>Completed first — it defines the controls</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-yellow-400" />
              Method Statement
            </h3>
            <ul className="space-y-2 text-white/85 text-sm leading-relaxed">
              <li>Answers "how exactly will we do this work safely?"</li>
              <li>Describes the chronological sequence of operations</li>
              <li>States the safety precautions at each stage</li>
              <li>Embeds the risk assessment controls into the work process</li>
              <li>Written second — it implements the controls</li>
            </ul>
          </div>
        </div>
        <p>
          The relationship is directional: the{' '}
          <SEOInternalLink href="/guides/risk-assessment-electrical-work">
            risk assessment
          </SEOInternalLink>{' '}
          must be completed first because it identifies the controls that the method statement must
          incorporate. If the risk assessment identifies "safe isolation required before working on
          conductors" as a control measure, the method statement must describe exactly how safe
          isolation will be carried out, at which point in the work sequence, and with what
          equipment.
        </p>
        <p>
          When reviewing method statements, clients and safety teams check that every control
          measure identified in the risk assessment appears in the method statement at the
          appropriate point. If the risk assessment says "RPE required during chasing" but the
          method statement describes the chasing process without mentioning RPE, the documents are
          inconsistent and will be rejected.
        </p>
        <p>
          Elec-Mate's AI generates both documents together as a coherent RAMS pack, ensuring that
          the control measures in the risk assessment are automatically reflected in the method
          statement. This eliminates the inconsistency that often occurs when the two documents are
          written separately or by different people.
        </p>
      </>
    ),
  },
  {
    id: 'rams-explained',
    heading: 'RAMS: The Complete Safety Pack',
    content: (
      <>
        <p>
          RAMS stands for Risk Assessment and Method Statement — two separate documents presented
          together as a single safety pack. When a principal contractor or client asks for "your
          RAMS," they expect to receive both the risk assessment and the method statement for the
          specific work being carried out on their specific site.
        </p>
        <p>A complete RAMS pack for electrical work typically contains the following parts.</p>
        <div className="grid sm:grid-cols-2 gap-3 my-6">
          {[
            {
              t: 'Cover sheet',
              d: 'Project details, contractor information, and document control (reference, revision, date).',
            },
            {
              t: 'Risk assessment',
              d: 'Hazard identification, risk matrix scoring, control measures, and the hierarchy of controls.',
            },
            {
              t: 'Method statement',
              d: 'Step-by-step work sequence, safety precautions at each stage, and emergency procedures.',
            },
            {
              t: 'COSHH assessments',
              d: 'Where hazardous substances are involved — for example resins, solvents, or dust from chasing.',
            },
            {
              t: 'Appendices',
              d: 'Site plans, circuit diagrams, competence records, and insurance certificates.',
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-4"
            >
              <h4 className="font-semibold text-white text-sm mb-1">{item.t}</h4>
              <p className="text-white/80 text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
        <p>
          The quality of your RAMS directly affects your ability to win work. Principal contractors
          and safety teams review RAMS for substance and specificity — they can immediately identify
          generic template documents that have not been adapted for the actual job. Poor RAMS
          reflect poorly on the contractor and may result in rejection and loss of the contract.
          Conversely, well-written, site-specific RAMS demonstrate competence and professionalism,
          building confidence with clients and safety teams.
        </p>
        <SEOAppBridge
          title="Generate complete RAMS packs with AI"
          description="Elec-Mate's AI Health and Safety agent generates complete, site-specific RAMS packs from a plain-English job description."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Method Statement Mistakes',
    content: (
      <>
        <p>
          Method statements fail when they are treated as a box-ticking exercise rather than a
          genuine planning tool. These common mistakes undermine the document's value and may result
          in rejection by clients and safety teams.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Using generic templates without customisation
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  A method statement that says "carry out electrical installation work" without
                  specifying what work, where, or how is not a method statement — it is a blank page
                  with a header. Generic templates must be thoroughly customised for each job and
                  site. If the document does not mention the specific property address, the specific
                  circuits, and the specific equipment, it has not been customised enough.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Inconsistency with the risk assessment
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  If the risk assessment identifies "working at height — use podium steps" as a
                  control measure, but the method statement describes installing ceiling lights from
                  a ladder, the documents are inconsistent. Every control measure in the risk
                  assessment must be reflected in the method statement. Safety teams check for these
                  inconsistencies and will reject the RAMS pack if they find them.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Not describing safe isolation specifically
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  "Carry out safe isolation" is not a method statement instruction. The method
                  statement must describe the full{' '}
                  <SEOInternalLink href="/guides/safe-isolation-procedure">
                    safe isolation procedure
                  </SEOInternalLink>
                  , following the minimum sequence set out in OSG Reg 12.5: (1) locate and
                  positively identify the correct isolation point; (2) check the physical condition
                  of the voltage indicating device (VID) for obvious damage or deterioration; (3)
                  confirm the VID is functioning correctly on a known live source; (4) test the
                  circuit dead at the point of work (L-N, L-E, N-E); (5) confirm the VID on the
                  known live source again (prove-test-prove). Apply lock-off device and personal
                  padlock before beginning work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Omitting testing and commissioning</h3>
                <p className="text-white text-sm leading-relaxed">
                  Many method statements describe the installation in detail but gloss over testing
                  with a single line: "carry out testing as per BS 7671." The testing and
                  commissioning phase has its own hazards (repeated isolation and re-energisation
                  cycles) and its own sequence (dead tests before live tests, specific test order
                  per GN3). This phase must be described in the same level of detail as the
                  installation phase.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">No emergency procedures</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every method statement must include emergency procedures. What happens if someone
                  receives an electric shock? What if there is a fire? Where is the nearest first
                  aid equipment? Who is the designated first aider? What is the emergency assembly
                  point? These are not afterthoughts — they are essential elements that the
                  workforce must know before starting work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/risk-assessment-electrical-work',
    title: 'Risk Assessment for Electrical Work',
    description: 'The other half of your RAMS pack — hazard identification and control measures.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work-electrician',
    title: 'Permit to Work for Electricians',
    description: 'When permits are required and how method statements support them.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'GS 38 prove-test-prove — the procedure your method statement must describe.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description: 'PPE requirements that must be specified in your method statement.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct testing order to include in your method statement.',
    icon: ListOrdered,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'AI RAMS Generator',
    description: 'Generate complete RAMS packs from a job description using AI.',
    icon: Brain,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MethodStatementElectricalPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-01-28"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Hub"
      badgeIcon={ClipboardCheck}
      answerBox={answerBox}
      heroTitle={
        <>
          Method Statement for Electrical Work:{' '}
          <span className="text-yellow-400">Template and Guide</span>
        </>
      }
      heroSubtitle="The complete guide to writing method statements for electrical work in the UK. What to include, when required, common method statements for rewires, consumer unit changes, testing, and EV charger installations, and how method statements fit with risk assessments to form RAMS packs."
      readingTime={19}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Write an Electrical Method Statement"
      howToDescription="The step-by-step process for creating effective, site-specific method statements for electrical work."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Generate method statements with AI in seconds"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI-powered method statements, risk assessments, and complete RAMS packs. 7-day free trial, cancel anytime."
    />
  );
}
