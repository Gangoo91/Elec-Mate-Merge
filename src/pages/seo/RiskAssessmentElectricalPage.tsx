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
  Flame,
  Activity,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Risk Assessment for Electrical Work | Template & Guide';
const PAGE_DESCRIPTION =
  'Complete guide to risk assessment for electrical work. Legal requirements under the Management of Health and Safety at Work Regulations 1999, HSE five-step process, electrical hazards, risk matrix, control measures, dynamic risk assessment, and RAMS explained. For UK electricians.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Risk Assessment for Electrical Work', href: '/guides/risk-assessment-electrical-work' },
];

const tocItems = [
  { id: 'what-is-risk-assessment', label: 'What Is a Risk Assessment?' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'five-step-process', label: 'The Five-Step Process' },
  { id: 'electrical-hazards', label: 'Electrical-Specific Hazards' },
  { id: 'risk-matrix', label: 'Risk Matrix' },
  { id: 'control-measures', label: 'Control Measures' },
  { id: 'dynamic-risk-assessment', label: 'Dynamic Risk Assessment' },
  { id: 'rams-explained', label: 'RAMS Explained' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Risk assessment is a legal requirement under the Management of Health and Safety at Work Regulations 1999 — every employer must carry out suitable and sufficient assessments for all work activities.',
  'The HSE five-step process provides a structured framework: identify hazards, decide who might be harmed, evaluate risk, record findings, and review regularly.',
  'Electrical-specific hazards include electric shock, arc flash burns, falls from height, asbestos exposure in older buildings, and manual handling of heavy equipment like cable drums and consumer units.',
  'A risk matrix multiplies likelihood (1-5) by severity (1-5) to produce a risk score — this must be calculated before and after control measures to show how risk is being managed.',
  'Elec-Mate generates complete risk assessments from a plain-English job description using its AI Health and Safety agent, producing site-specific documents in under 60 seconds.',
];

const faqs = [
  {
    question: 'Is a risk assessment a legal requirement for electricians?',
    answer:
      'Yes. Under Regulation 3 of the Management of Health and Safety at Work Regulations 1999, every employer must make a suitable and sufficient assessment of the risks to the health and safety of their employees and anyone else who may be affected by their work. If you employ five or more people, the significant findings must be recorded in writing. However, even sole traders and those with fewer than five employees need written risk assessments in practice because most commercial clients, principal contractors, and main contractors require written RAMS (Risk Assessment and Method Statement) before permitting work to begin on their site. The Health and Safety at Work etc. Act 1974, Section 2, also places a general duty on employers to ensure the health, safety, and welfare of employees, which in practice requires risk assessment. For electrical work specifically, the Electricity at Work Regulations 1989 require all work to be carried out so as to prevent danger, which means assessing the electrical risks before starting work.',
  },
  {
    question: 'What is the difference between a risk assessment and a method statement?',
    answer:
      'A risk assessment identifies the hazards associated with a piece of work, evaluates the likelihood and severity of harm from each hazard, and specifies the control measures to reduce risk to an acceptable level. It answers the questions: "What could go wrong?" and "How will we prevent it?" A method statement, on the other hand, describes the step-by-step sequence of how the work will actually be carried out safely. It answers the question: "How exactly will we do this work?" Together, the risk assessment and method statement form a RAMS pack (Risk Assessment and Method Statement). The risk assessment identifies the "what" and "why" of safety; the method statement describes the "how." Both documents are typically required together because a risk assessment without a method statement does not explain how the work will be done safely, and a method statement without a risk assessment does not demonstrate that the hazards have been identified and assessed.',
  },
  {
    question: 'What electrical hazards should a risk assessment cover?',
    answer:
      'A risk assessment for electrical work must cover all foreseeable hazards, not just the obvious electrical ones. Electrical hazards include: electric shock from contact with live conductors during installation, testing, or fault-finding; arc flash from short circuits when working in or near consumer units and distribution boards (arc flash can produce temperatures exceeding 10,000 degrees Celsius); and burns from overheated conductors or components. Non-electrical hazards that are common in electrical work include: working at height when accessing distribution boards, ceiling voids, or cable routes; manual handling of heavy items such as cable drums, consumer units, and distribution boards; asbestos exposure in buildings constructed before 2000 where asbestos may be present in flash guards, cable routes, or behind existing consumer units; dust exposure from chasing walls (silica dust is a serious health hazard); noise from drilling and chasing; and lone working on domestic jobs.',
  },
  {
    question: 'How often should risk assessments be reviewed?',
    answer:
      'Risk assessments must be reviewed and updated whenever there is a significant change in the work being carried out, the conditions on site, the equipment being used, or the people doing the work. They should also be reviewed following any incident, near miss, or accident. As a general rule, risk assessments should be reviewed at least annually to ensure they remain current and relevant. For routine work that is repeated regularly (such as domestic rewires or consumer unit changes), a generic risk assessment can be maintained and supplemented with site-specific information for each individual job. However, the generic assessment must still be reviewed periodically to ensure it covers current hazards and reflects current best practice. The Management of Health and Safety at Work Regulations 1999, Regulation 3(3), specifically requires employers to review assessments when there is reason to suspect they are no longer valid or when there has been a significant change.',
  },
  {
    question: 'What is a dynamic risk assessment?',
    answer:
      'A dynamic risk assessment is a continuous, real-time assessment of the hazards and risks at the actual point of work. Unlike a written risk assessment (which is prepared before work begins and covers foreseeable hazards), a dynamic risk assessment is the ongoing process of observing conditions on site, identifying new or changing hazards, and adjusting your work practices accordingly. For electricians, dynamic risk assessment is essential because conditions on site can change rapidly and unpredictably. You may discover asbestos behind a consumer unit, find unexpected live cables in a ceiling void, encounter water ingress near electrical equipment, or find that access conditions are different from what was expected. A competent electrician continuously assesses these changing conditions and adapts their approach. Dynamic risk assessment does not replace written risk assessments — it supplements them. The written assessment covers foreseeable hazards; the dynamic assessment covers the unforeseeable ones that only become apparent once work begins.',
  },
  {
    question: 'How does Elec-Mate help with risk assessments?',
    answer:
      'Elec-Mate includes a dedicated AI Health and Safety agent that generates complete, site-specific risk assessments from a plain-English job description. You describe the work — for example, "Consumer unit upgrade in a 1960s semi-detached house, TNS earthing, occupants present during work" — and the AI produces a full risk assessment covering all relevant hazards including electrical, working at height, asbestos (flagged for pre-2000 buildings), manual handling, and dust exposure. Each hazard is rated using a likelihood-times-severity risk matrix with scores shown before and after control measures. The control measures follow the hierarchy of controls (eliminate, substitute, engineer, administrate, PPE). The output also includes a method statement, creating a complete RAMS pack ready to submit to clients and principal contractors. The RAMS Generator tool handles the same process through a structured interface, and both tools produce professional PDF exports with your company branding.',
  },
];

const howToSteps = [
  {
    name: 'Identify the hazards',
    text: 'Walk the site and examine the work area. Identify all hazards that could cause harm — not just the electrical ones but also working at height, manual handling, asbestos, dust, noise, confined spaces, lone working, and any site-specific hazards. Consider the work being done, the equipment being used, the materials involved, and the environment. Check for hidden hazards such as asbestos-containing materials in older buildings, buried cables and services, and alternative supply sources such as solar PV or battery storage. Consult HSE guidance, manufacturer instructions, and trade body publications for hazards specific to the type of electrical work you are doing.',
  },
  {
    name: 'Decide who might be harmed and how',
    text: 'Identify all people who could be affected by the hazards — not just the electrician carrying out the work but also other workers on site, building occupants, members of the public, and anyone else who could be in the vicinity. Consider how they could be harmed: direct contact with live conductors, indirect contact through a fault, arc flash exposure, falling objects from work at height, dust inhalation, noise exposure, or trips and falls from cables and tools. For each hazard, describe the potential injury: electric shock, burns, fractures, respiratory disease, hearing damage, and so on.',
  },
  {
    name: 'Evaluate the risks and decide on control measures',
    text: 'For each hazard, assess the likelihood of harm occurring (from 1 for rare to 5 for almost certain) and the severity of the potential harm (from 1 for minor injury to 5 for fatality). Multiply these to get a risk score. Then identify control measures following the hierarchy of controls: eliminate the hazard if possible, substitute with something less hazardous, implement engineering controls (barriers, guards, insulation), use administrative controls (permits, procedures, training), and as a last resort use personal protective equipment (PPE). Recalculate the risk score with controls in place to show the residual risk.',
  },
  {
    name: 'Record your significant findings',
    text: 'Record the findings of your risk assessment in a written document. This must include: the hazards identified, who might be harmed, the existing controls, the risk score before and after controls, any additional controls needed, and who is responsible for implementing them. For electrical work, the risk assessment is typically combined with a method statement to create a RAMS pack (Risk Assessment and Method Statement). The document must be clear, specific, and proportionate to the risk — a domestic socket change needs less detail than a commercial rewire, but both need a documented assessment.',
  },
  {
    name: 'Review and update regularly',
    text: 'Risk assessments are not write-once documents. Review them before each new job to check they still cover the relevant hazards and reflect the actual conditions on site. Update them whenever conditions change — new hazards are identified, equipment changes, personnel change, or following an incident or near miss. On longer projects, review the risk assessment at regular intervals (weekly on large sites). Keep records of all reviews and updates. Under the Management of Health and Safety at Work Regulations 1999, you must review your assessments when there is reason to suspect they are no longer valid.',
  },
];

const sections = [
  {
    id: 'what-is-risk-assessment',
    heading: 'What Is a Risk Assessment?',
    content: (
      <>
        <p>
          A risk assessment is a systematic process of identifying the hazards associated with a
          work activity, evaluating the likelihood and severity of harm from each hazard, and
          determining the control measures needed to reduce the risk to an acceptable level. It is
          the foundation of workplace health and safety management and the primary means by which
          employers demonstrate that they have thought about the dangers before work begins.
        </p>
        <p>
          For electricians, risk assessment is not just a legal formality — it is a practical
          process that can save your life. Electrical work involves inherently dangerous hazards
          including electric shock, arc flash, and burns, as well as associated hazards such as
          working at height, manual handling, and exposure to hazardous substances. A thorough risk
          assessment identifies these hazards before you encounter them on site and ensures that you
          have the right precautions in place.
        </p>
        <p>
          The risk assessment process produces a written record that serves multiple purposes: it
          demonstrates legal compliance, it communicates the hazards and precautions to everyone
          involved in the work, it provides evidence for clients and principal contractors that you
          take safety seriously, and it creates a baseline for continuous improvement. When combined
          with a{' '}
          <SEOInternalLink href="/guides/method-statement-electrical">
            method statement
          </SEOInternalLink>
          , it forms a RAMS pack (Risk Assessment and Method Statement) — the standard safety
          document package required on virtually every commercial and managed residential site.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for Risk Assessment',
    content: (
      <>
        <p>
          Risk assessment is a legal requirement under multiple pieces of UK health and safety
          legislation. The duty applies to all employers, the self-employed, and anyone who has
          control over work activities. Non-compliance can result in criminal prosecution, unlimited
          fines, and imprisonment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Key Legislation</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">
                  Management of Health and Safety at Work Regulations 1999
                </strong>{' '}
                — Regulation 3 is the primary risk assessment duty. It requires every employer to
                make a suitable and sufficient assessment of the risks to health and safety of
                employees and others affected by their undertaking. Regulation 4 requires
                implementation of the preventive and protective measures identified by the
                assessment. If you employ five or more people, the significant findings must be
                recorded in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Health and Safety at Work etc. Act 1974</strong>
                — Section 2 imposes a general duty to ensure the health, safety, and welfare of
                employees. Section 3 extends this to non-employees affected by the work. Risk
                assessment is the primary mechanism for demonstrating compliance with these general
                duties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Electricity at Work Regulations 1989</strong> —
                Require all work on electrical systems to be carried out so as to prevent danger. A
                risk assessment that identifies electrical hazards and specifies appropriate
                controls (including{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>
                ) is essential for compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">
                  Construction (Design and Management) Regulations 2015
                </strong>{' '}
                — CDM 2015 applies to all construction work including electrical installation.
                Regulation 15 requires contractors to plan, manage, and monitor their work to ensure
                safety. Written risk assessments and method statements are the standard means of
                demonstrating this.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, even sole traders who are technically exempt from the written recording
          requirement (having fewer than five employees) will need written risk assessments because
          commercial clients and principal contractors universally require them. A verbal assessment
          that exists only in the electrician's head provides no evidence of compliance and will not
          satisfy any client, contractor, or HSE inspector.
        </p>
        <SEOAppBridge
          title="AI generates legally compliant risk assessments"
          description="Elec-Mate's AI Health and Safety agent produces risk assessments that address all relevant legislation — MHSWR 1999, EAWR 1989, CDM 2015, COSHH 2002, and more. Describe your job and get a complete, site-specific assessment in seconds."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'five-step-process',
    heading: 'The HSE Five-Step Risk Assessment Process',
    content: (
      <>
        <p>
          The Health and Safety Executive (HSE) recommends a five-step approach to risk assessment
          that provides a clear, structured framework applicable to all work activities. This is the
          standard methodology used across UK industry and the approach that HSE inspectors expect
          to see.
        </p>
        <div className="space-y-4 my-6">
          {[
            {
              step: '1',
              title: 'Identify the Hazards',
              text: 'Walk the work area, observe the tasks to be carried out, check manufacturer instructions, review accident and near-miss data, and consult with the people doing the work. For electrical work, consider: electric shock, arc flash, burns, working at height, manual handling, asbestos, dust, noise, lone working, confined spaces, and any site-specific hazards.',
            },
            {
              step: '2',
              title: 'Decide Who Might Be Harmed and How',
              text: 'Consider everyone who could be affected: electricians, other trades on site, building occupants, members of the public, visitors, and maintenance personnel. Think about how they could be harmed: direct contact with live parts, indirect contact through a fault, falling objects, trips and slips, dust inhalation, and noise exposure.',
            },
            {
              step: '3',
              title: 'Evaluate the Risks and Decide on Control Measures',
              text: 'Rate each hazard using the risk matrix (likelihood x severity). Apply the hierarchy of controls: eliminate, substitute, engineering controls, administrative controls, PPE. Record the risk score before and after controls to demonstrate how you are managing the risk down to an acceptable level.',
            },
            {
              step: '4',
              title: 'Record Your Significant Findings',
              text: 'Document the hazards, who is at risk, the existing controls, the risk scores, any additional controls needed, and who is responsible. The record must be specific to the work and site — generic template assessments that list every possible hazard regardless of relevance are not "suitable and sufficient."',
            },
            {
              step: '5',
              title: 'Review and Update',
              text: 'Review before every new job, whenever conditions change, following incidents, and at regular intervals on longer projects. Risk assessment is a living process, not a one-off document.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                <span className="font-bold text-yellow-400">{item.step}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                <p className="text-white leading-relaxed text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'electrical-hazards',
    heading: 'Electrical-Specific Hazards',
    content: (
      <>
        <p>
          Electrical work involves a specific set of hazards that must be addressed in every risk
          assessment. These fall into two categories: primary electrical hazards (caused directly by
          electricity) and associated hazards (other dangers commonly encountered during electrical
          work).
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Electric Shock</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Contact with live conductors at mains voltage (230 V single-phase, 400 V three-phase)
              can cause cardiac arrest, respiratory failure, severe burns, and death. The current
              path through the body determines the severity — hand-to-hand or hand-to-foot paths
              through the heart are the most dangerous. Even voltages as low as 50 V AC can be fatal
              in wet conditions. Control measures include{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation
              </SEOInternalLink>
              , insulated tools, and appropriate{' '}
              <SEOInternalLink href="/guides/ppe-for-electricians">PPE</SEOInternalLink>.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Arc Flash</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              An arc flash is an explosive release of energy caused by a short circuit through the
              air. It produces temperatures exceeding 10,000 degrees Celsius, an intense pressure
              wave, molten metal spray, and blinding light. Arc flash injuries include severe burns,
              blast injuries, hearing damage, and eye injuries. Arc flash risk is highest when
              working in or near consumer units and distribution boards, particularly during live
              fault-finding or when the covers are removed from energised equipment.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <HardHat className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Falls from Height</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Electricians frequently work at height when accessing distribution boards mounted high
              on walls, running cables through ceiling voids, installing lighting, and working on
              cable tray at high level. The Work at Height Regulations 2005 require that work at
              height is avoided where possible, and where it cannot be avoided, appropriate access
              equipment is used (step platforms, podium steps, tower scaffolds, MEWPs) and
              operatives are trained in its use.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Asbestos Exposure</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Buildings constructed before 2000 may contain asbestos in flash guards behind consumer
              units, in textured coatings (Artex), in cable routes through asbestos cement sheets,
              and in floor tiles. Disturbing asbestos releases fibres that cause mesothelioma,
              asbestosis, and lung cancer — diseases that are fatal and have no cure. Before any
              work that involves drilling, chasing, or disturbing building fabric in pre-2000
              buildings, the asbestos register must be checked and a refurbishment and demolition
              (R&D) survey may be required.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Manual Handling</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Cable drums can exceed 40 kg for larger sizes, consumer units and distribution boards
              are heavy and awkward to manoeuvre, and tools and materials must be carried up ladders
              and through restricted access routes. The Manual Handling Operations Regulations 1992
              require avoidance of manual handling where possible and proper assessment where it
              cannot be avoided. Mechanical aids (drum stands, cable trolleys, sack trucks) should
              be used wherever practicable.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Dust and Noise</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Chasing walls and cutting channels in masonry generates silica dust, which is a
              serious respiratory hazard. The Workplace Exposure Limit for respirable crystalline
              silica is 0.1 mg/m3 (8-hour TWA). Dust extraction at source and RPE (FFP3 mask
              minimum) are required. Drilling and chasing also generate noise levels that can exceed
              the upper exposure action value of 85 dB(A), requiring hearing protection and noise
              assessments under the Control of Noise at Work Regulations 2005.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'risk-matrix',
    heading: 'Risk Matrix: Likelihood x Severity',
    content: (
      <>
        <p>
          A risk matrix is the standard tool for evaluating and communicating risk levels. It
          multiplies the likelihood of harm occurring by the severity of the potential harm to
          produce a numerical risk score. This score is calculated before control measures are
          applied (the initial risk) and again after controls are in place (the residual risk),
          demonstrating how the control measures reduce the risk to an acceptable level.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Likelihood Scale</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li>
              <strong className="text-yellow-400">1 — Rare:</strong> Could happen but very unlikely
              under normal conditions
            </li>
            <li>
              <strong className="text-yellow-400">2 — Unlikely:</strong> Could happen but not
              expected
            </li>
            <li>
              <strong className="text-yellow-400">3 — Possible:</strong> May happen occasionally
            </li>
            <li>
              <strong className="text-yellow-400">4 — Likely:</strong> Will probably happen at some
              point
            </li>
            <li>
              <strong className="text-yellow-400">5 — Almost certain:</strong> Expected to happen
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Severity Scale</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li>
              <strong className="text-yellow-400">1 — Negligible:</strong> Minor injury requiring
              first aid only
            </li>
            <li>
              <strong className="text-yellow-400">2 — Minor:</strong> Injury requiring medical
              attention, short absence
            </li>
            <li>
              <strong className="text-yellow-400">3 — Moderate:</strong> Serious injury, extended
              absence, RIDDOR reportable
            </li>
            <li>
              <strong className="text-yellow-400">4 — Major:</strong> Life-changing injury,
              permanent disability
            </li>
            <li>
              <strong className="text-yellow-400">5 — Catastrophic:</strong> Fatality or multiple
              fatalities
            </li>
          </ul>
        </div>
        <p>
          For electrical work, hazards such as electric shock and arc flash typically have a high
          severity score (4 or 5) because the potential consequences include death or permanent
          injury. The likelihood score depends on the controls in place — with proper safe isolation
          the likelihood of shock is reduced to 1 (rare), but without isolation it could be 4 or 5.
          This demonstrates why control measures are so important: they do not change the severity
          of the hazard, but they dramatically reduce the likelihood of it causing harm.
        </p>
      </>
    ),
  },
  {
    id: 'control-measures',
    heading: 'Control Measures and Hierarchy of Controls',
    content: (
      <>
        <p>
          Control measures must follow the hierarchy of controls, which prioritises the most
          effective types of control. The hierarchy exists because some controls are inherently more
          reliable than others — eliminating a hazard is always better than relying on PPE to
          protect against it.
        </p>
        <div className="space-y-4 my-6">
          {[
            {
              level: '1',
              title: 'Eliminate',
              text: 'Remove the hazard entirely. For electrical work: design out the need for live working by planning work during shutdowns; avoid working at height by using floor-standing equipment where possible; avoid manual handling by specifying smaller cable drums or mechanical handling aids.',
            },
            {
              level: '2',
              title: 'Substitute',
              text: 'Replace with something less hazardous. Use low-voltage tools (110 V via a CTE transformer) instead of 230 V tools on construction sites. Use cordless power tools to eliminate trailing lead hazards. Specify prefabricated cable assemblies to reduce on-site termination work.',
            },
            {
              level: '3',
              title: 'Engineering Controls',
              text: 'Isolate people from the hazard using physical measures. Safe isolation and lock-off. Barriers and screens around live equipment. RCD protection for construction site supplies. Insulated tools to BS EN 60900. Guarding on rotating machinery.',
            },
            {
              level: '4',
              title: 'Administrative Controls',
              text: 'Procedures, training, and safe systems of work. Permits to work. Method statements. Competent person appointments. Training and assessment. Supervision. Warning signs and labels. Job rotation to reduce exposure duration.',
            },
            {
              level: '5',
              title: 'PPE (Last Resort)',
              text: 'Personal protective equipment: insulated gloves, safety boots, hard hats, hi-vis, eye protection, hearing protection, RPE. PPE is the last line of defence, not the first. It protects only the wearer, it can fail, and it relies on the individual using it correctly every time.',
            },
          ].map((item) => (
            <div
              key={item.level}
              className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                <span className="font-bold text-yellow-400">{item.level}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                <p className="text-white leading-relaxed text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="AI applies the hierarchy of controls automatically"
          description="Elec-Mate's AI Health and Safety agent identifies hazards and applies the hierarchy of controls to each one. Elimination and engineering controls are prioritised over PPE, producing risk assessments that demonstrate best practice."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'dynamic-risk-assessment',
    heading: 'Dynamic Risk Assessment on Site',
    content: (
      <>
        <p>
          A dynamic risk assessment is the continuous, real-time process of assessing hazards and
          risks as you encounter them during the work. It supplements the written risk assessment by
          addressing conditions that could not have been foreseen before arriving on site.
        </p>
        <p>
          Electricians encounter unexpected situations regularly: the ceiling void contains asbestos
          insulating board that was not identified in the pre-start information; the consumer unit
          is located behind stored items that restrict access; there is water ingress near the
          distribution board; a previously unknown circuit is supplying the area being worked on; or
          site conditions have changed since the original risk assessment was prepared.
        </p>
        <p>
          The dynamic risk assessment process involves continuously observing your surroundings,
          identifying new or changed hazards, assessing whether your existing controls are still
          adequate, and taking action if they are not. "Taking action" may mean implementing
          additional controls, modifying your method of work, or stopping work entirely until the
          new hazard can be properly assessed and controlled. Stopping work when you identify an
          uncontrolled hazard is not weakness or overcaution — it is professional competence.
        </p>
        <p>
          Dynamic risk assessment is a competence that develops with experience and training. It
          requires an electrician to be constantly aware, questioning, and prepared to change plans
          when conditions demand it. It is one of the key differences between a competent
          electrician and someone who merely holds the right qualifications.
        </p>
      </>
    ),
  },
  {
    id: 'rams-explained',
    heading: 'RAMS: Risk Assessment and Method Statement',
    content: (
      <>
        <p>
          RAMS is the industry standard abbreviation for Risk Assessment and Method Statement — two
          separate but complementary documents that together form a comprehensive safety package for
          any piece of work. In practice, when a principal contractor or client asks for "your
          RAMS," they are asking for both documents presented together.
        </p>
        <p>
          The risk assessment identifies the hazards, evaluates the risks, and specifies the control
          measures. The{' '}
          <SEOInternalLink href="/guides/method-statement-electrical">
            method statement
          </SEOInternalLink>{' '}
          describes the step-by-step sequence of how the work will be carried out safely,
          incorporating the control measures identified in the risk assessment. Together, they
          demonstrate that you have identified what could go wrong, decided how to prevent it, and
          planned a safe sequence of work that implements those preventive measures.
        </p>
        <p>
          For electricians, RAMS are required for virtually all commercial and managed residential
          work. Most principal contractors will not permit work to begin without approved RAMS. The
          quality of your RAMS directly affects your ability to win and retain work — poorly
          written, generic RAMS are increasingly being rejected by safety-conscious clients and
          contractors.
        </p>
        <SEOAppBridge
          title="Generate complete RAMS packs in under 60 seconds"
          description="Elec-Mate's RAMS Generator and AI Health and Safety agent create site-specific RAMS packs from a plain-English job description. Risk assessment with matrix scoring, method statement with step-by-step procedures, COSHH assessments where relevant. Professional PDF export with your branding."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/method-statement-electrical',
    title: 'Method Statement for Electrical Work',
    description: 'Writing effective method statements — the other half of your RAMS pack.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work-electrician',
    title: 'Permit to Work for Electricians',
    description: 'When permits are required, types of permits, and the permit process.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'GS 38 prove-test-prove procedure, lock-off, and LOTO.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description: 'Personal protective equipment requirements by task type.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/gs38-proving-dead',
    title: 'GS 38 Proving Dead',
    description: 'Voltage indicator requirements and the prove-test-prove procedure.',
    icon: ShieldAlert,
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

export default function RiskAssessmentElectricalPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-01-20"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Hub"
      badgeIcon={ShieldAlert}
      heroTitle={
        <>
          Risk Assessment for Electrical Work:{' '}
          <span className="text-yellow-400">Template and Guide</span>
        </>
      }
      heroSubtitle="The complete guide to risk assessment for electrical work in the UK. Legal requirements, the HSE five-step process, electrical-specific hazards, risk matrix scoring, control measures, dynamic risk assessment on site, and how RAMS packs bring it all together."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="The Five-Step Risk Assessment Process"
      howToDescription="The HSE-recommended five-step risk assessment process applied to electrical work, from hazard identification through to review."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Generate risk assessments with AI"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered risk assessments, method statements, and complete RAMS packs. 7-day free trial, cancel anytime."
    />
  );
}
