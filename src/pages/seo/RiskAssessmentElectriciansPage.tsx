import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  AlertTriangle,
  FileCheck2,
  Zap,
  ClipboardCheck,
  GraduationCap,
  HardHat,
  Lock,
  Eye,
  CheckCircle2,
  Scale,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/risk-assessment-electricians' },
  { label: 'Risk Assessment', href: '/guides/risk-assessment-electricians' },
];

const tocItems = [
  { id: 'what-is-risk-assessment', label: 'What Is a Risk Assessment?' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'five-step-process', label: 'The 5-Step Process' },
  { id: 'electrical-hazards', label: 'Electrical-Specific Hazards' },
  { id: 'template-structure', label: 'Template Structure' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'dynamic-risk-assessment', label: 'Dynamic Risk Assessment' },
  { id: 'digital-risk-assessments', label: 'Going Digital' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every employer and self-employed electrician has a legal duty to carry out risk assessments under the Management of Health and Safety at Work Regulations 1999.',
  'The HSE 5-step risk assessment process covers identifying hazards, deciding who might be harmed, evaluating risks, recording findings, and reviewing regularly.',
  'Electrical work has specific hazards including electric shock, arc flash, burns, falls from height when working on distribution boards, and exposure to asbestos in older installations.',
  'A written risk assessment is legally required for any business with 5 or more employees, but best practice for all electricians regardless of business size.',
  'Elec-Mate AI Health and Safety agent generates site-specific risk assessments in minutes, covering all electrical hazards with correct control measures and BS 7671 references.',
];

const faqs = [
  {
    question: 'Do self-employed electricians need to do risk assessments?',
    answer:
      'Yes. Under the Management of Health and Safety at Work Regulations 1999, every self-employed person must carry out a suitable and sufficient assessment of risks to their own health and safety and to the health and safety of anyone else who may be affected by their work. This includes tenants, homeowners, other tradespeople on site, and members of the public. While a self-employed sole trader with no employees is not legally required to write the assessment down, it is strongly recommended to do so — it demonstrates competence to clients, satisfies the requirements of competent person schemes like NICEIC and NAPIT, and provides evidence of compliance if the HSE ever investigates an incident. Many main contractors and commercial clients will not allow you on site without a written risk assessment.',
  },
  {
    question: 'How often should I review my risk assessments?',
    answer:
      'Risk assessments should be reviewed whenever there is a significant change in the work activity, the workplace, the personnel involved, or when an incident or near miss occurs. As a practical minimum, review your generic risk assessments at least annually and your site-specific assessments before each new job or phase of work. If you are working on a long-term project, review the assessment at regular intervals — weekly or monthly depending on the complexity and duration. The review should check whether the hazards are still relevant, whether the control measures are still adequate, and whether any new hazards have been introduced. Document the review with a date and signature.',
  },
  {
    question: 'What is the difference between a risk assessment and a method statement?',
    answer:
      'A risk assessment identifies the hazards associated with a task, evaluates the level of risk, and specifies the control measures needed to reduce the risk to an acceptable level. A method statement describes the step-by-step safe system of work for carrying out the task, incorporating the control measures identified in the risk assessment. Together, they form the RAMS (Risk Assessment and Method Statement) package. The risk assessment answers "what could go wrong and how do we prevent it?" while the method statement answers "how do we do this job safely, step by step?" Both are required for most electrical work on commercial and industrial sites, and increasingly expected for domestic work as well.',
  },
  {
    question: 'Can I use a generic risk assessment for all my electrical work?',
    answer:
      'A generic risk assessment covers the common hazards associated with a type of work — for example, "periodic inspection and testing of domestic installations." It is a useful starting document, but it is not sufficient on its own for every job. The Management of Health and Safety at Work Regulations require the assessment to be "suitable and sufficient," which means it must address the specific hazards of the actual workplace and task. You should use a generic assessment as a template and then adapt it for each site, adding site-specific hazards such as asbestos, confined spaces, working at height, lone working, or the presence of vulnerable people. A site-specific risk assessment based on a generic template is the standard approach used by most electricians.',
  },
  {
    question: 'What electrical hazards must be included in a risk assessment?',
    answer:
      'The key electrical hazards to consider include: electric shock from contact with live conductors (the most common cause of electrical fatalities); arc flash and arc blast from short-circuit faults, which can cause severe burns and blast injuries; burns from overheating equipment, faulty connections, or fire; secondary injuries such as falls from height caused by electric shock; fire and explosion from electrical faults igniting flammable materials; and working near overhead power lines or underground cables. You should also consider non-electrical hazards that are common in electrical work, such as manual handling of heavy distribution boards, working at height on ladders or scaffolding, exposure to asbestos in older buildings, noise from power tools, and dust from chasing walls. Each hazard needs a corresponding set of control measures.',
  },
  {
    question: 'Do I need a separate risk assessment for each job?',
    answer:
      'Not necessarily a completely separate document for every job, but each job must be assessed for its specific risks. The practical approach is to maintain a library of generic risk assessments for common tasks (consumer unit change, rewire, periodic inspection, first fix, second fix, fault finding) and then produce a site-specific addendum for each job that covers the unique hazards of that particular site and situation. For straightforward domestic work at a property you have visited before, the generic assessment plus a brief site-specific check may be adequate. For commercial, industrial, or unfamiliar sites, a full site-specific risk assessment is expected. The Elec-Mate AI Health and Safety agent can generate site-specific assessments tailored to the job and location in minutes.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/method-statement-electricians',
    title: 'Method Statement Guide',
    description:
      'How to write a method statement for electrical work. Template structure, common tasks, and step-by-step examples.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/lock-off-loto-procedure',
    title: 'Lock Off / LOTO Procedure',
    description:
      'Complete guide to lockout/tagout for electricians. MCB locks, distribution board isolation, and legal requirements.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'What PPE you need on site. Insulated gloves, safety boots, eye protection, and arc flash PPE categories.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/arc-flash-protection',
    title: 'Arc Flash Protection',
    description:
      'Arc flash risk assessment, incident energy levels, PPE categories, and boundary distances explained.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/gs-38-proving-dead',
    title: 'GS 38 Proving Dead',
    description:
      'HSE Guidance Note GS 38 requirements for test equipment, proving units, fused probes, and voltage indicators.',
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
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-risk-assessment',
    heading: 'What Is a Risk Assessment for Electricians?',
    content: (
      <>
        <p>
          A risk assessment is a systematic process of identifying hazards in the workplace,
          evaluating the likelihood and severity of harm, and deciding on control measures to reduce
          the risk to an acceptable level. For electricians, this means looking at every aspect of a
          job — from the electrical hazards of working on live or potentially live equipment to the
          physical hazards of the work environment — and documenting how you will manage each risk.
        </p>
        <p>
          The risk assessment is not a tick-box exercise. It is a legal requirement under the{' '}
          <strong>Management of Health and Safety at Work Regulations 1999</strong> (Regulation 3)
          and the <strong>Health and Safety at Work etc. Act 1974</strong> (Section 2). Every
          employer must carry out a suitable and sufficient assessment of the risks to the health
          and safety of employees and anyone else who may be affected by the work. Self-employed
          electricians have the same duty.
        </p>
        <p>
          For electrical work specifically, the{' '}
          <strong>Electricity at Work Regulations 1989</strong> impose additional duties. Regulation
          3 requires that all systems are constructed and maintained to prevent danger. Regulation 4
          requires that all work activities on or near electrical systems are carried out in a
          manner that prevents danger. The risk assessment is the mechanism by which you demonstrate
          compliance with these duties.
        </p>
        <p>
          A good risk assessment protects you, your employees, your clients, and anyone else on
          site. It also protects your business — if an incident occurs and the HSE investigates, the
          first thing they will ask for is your risk assessment. If you do not have one, or if it is
          inadequate, you face enforcement action, improvement notices, prohibition notices, or
          prosecution.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for Electrical Risk Assessments',
    content: (
      <>
        <p>
          The legal framework for risk assessment in electrical work comes from several overlapping
          pieces of legislation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work etc. Act 1974</strong> — the overarching
                legislation that places a general duty on employers to ensure, so far as is
                reasonably practicable, the health, safety, and welfare of employees and others
                affected by the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> —
                Regulation 3 specifically requires every employer and self-employed person to make a
                suitable and sufficient assessment of risks. If you have 5 or more employees, the
                significant findings must be recorded in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — impose specific duties
                regarding electrical safety, including the requirement to prevent danger from
                electrical systems and to carry out work in a safe manner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction (Design and Management) Regulations 2015 (CDM)</strong> — if
                your electrical work falls within the definition of "construction work" (which most
                installation work does), CDM applies and requires specific risk management measures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                    BS 7671:2018+A3:2024
                  </SEOInternalLink>
                </strong>{' '}
                — while not legislation itself, the IET Wiring Regulations are recognised as the
                standard of good practice for electrical installations and are frequently referenced
                in legal proceedings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practical terms, every electrician needs written risk assessments for their common work
          activities. This is not just a legal obligation — it is a requirement of competent person
          schemes (NICEIC, NAPIT, ELECSA), and most commercial and industrial clients will not allow
          you on site without one.
        </p>
      </>
    ),
  },
  {
    id: 'five-step-process',
    heading: 'The HSE 5-Step Risk Assessment Process',
    content: (
      <>
        <p>
          The Health and Safety Executive (HSE) sets out a straightforward 5-step process for
          carrying out a risk assessment. This is the standard approach used across all industries
          and is the framework you should follow for electrical work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Identify the Hazards</h4>
                <p className="text-white text-sm leading-relaxed">
                  Walk the site and inspect the work area. Look at the electrical installation, the
                  physical environment, access routes, and any other work happening nearby. Consider
                  electrical hazards (live conductors, stored energy, arc flash), physical hazards
                  (working at height, manual handling, confined spaces), environmental hazards
                  (asbestos, dust, noise, weather), and human factors (lone working, fatigue,
                  competence). Check manufacturer instructions, data sheets, and any previous
                  incident reports for the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Decide Who Might Be Harmed and How</h4>
                <p className="text-white text-sm leading-relaxed">
                  Consider all people who could be affected: the electrician carrying out the work,
                  other tradespeople on site, building occupants, visitors, members of the public,
                  and vulnerable groups such as children or elderly people. For each hazard,
                  identify how harm could occur — for example, an electrician could receive an
                  electric shock from contact with a live conductor while testing a distribution
                  board.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">
                  Evaluate the Risks and Decide on Control Measures
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  For each hazard, assess the likelihood of harm occurring and the potential
                  severity. Then apply the hierarchy of control: eliminate the hazard if possible,
                  substitute with something less hazardous, use engineering controls, use
                  administrative controls (safe systems of work, training, signage), and finally use
                  personal protective equipment (PPE) as a last resort. For example, the risk of
                  electric shock during testing is managed by following the{' '}
                  <SEOInternalLink href="/guides/safe-isolation-procedure">
                    safe isolation procedure
                  </SEOInternalLink>
                  , using{' '}
                  <SEOInternalLink href="/guides/gs-38-proving-dead">
                    GS 38 compliant test equipment
                  </SEOInternalLink>
                  , and wearing insulated gloves.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Record Your Findings</h4>
                <p className="text-white text-sm leading-relaxed">
                  Write down the significant findings of the assessment: the hazards identified, who
                  might be harmed, the existing control measures, and any additional controls
                  needed. If you have 5 or more employees, this is a legal requirement. Even if you
                  are a sole trader, a written record demonstrates compliance, satisfies scheme
                  requirements, and provides evidence if needed. Use a clear format — a table or
                  structured template works well.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <span className="text-yellow-400 font-bold text-sm">5</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Review and Update Regularly</h4>
                <p className="text-white text-sm leading-relaxed">
                  Risk assessments are living documents. Review them whenever the work activity
                  changes, the workplace changes, new equipment is introduced, an incident or near
                  miss occurs, or new information about a hazard becomes available. As a minimum,
                  review annually. Date and sign each review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-hazards',
    heading: 'Electrical-Specific Hazards You Must Assess',
    content: (
      <>
        <p>
          Electrical work has a unique set of hazards that must be addressed in every risk
          assessment. These go beyond the general workplace hazards and require specific control
          measures:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shock</strong> — contact with live conductors at mains voltage
                (230V AC) can cause cardiac arrest, respiratory failure, and death. Even lower
                voltages can be lethal in wet conditions. Control measures: safe isolation, lock
                off/tag out,{' '}
                <SEOInternalLink href="/guides/gs-38-proving-dead">
                  GS 38 proving dead
                </SEOInternalLink>
                , insulated tools, and{' '}
                <SEOInternalLink href="/guides/ppe-for-electricians">
                  appropriate PPE
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc flash and arc blast</strong> — a short-circuit fault can generate
                temperatures up to 20,000 degrees Celsius and an explosive pressure wave. The risk
                is highest when working on or near energised distribution boards and switchgear.
                Control measures: de-energise wherever possible, use{' '}
                <SEOInternalLink href="/guides/arc-flash-protection">arc-rated PPE</SEOInternalLink>
                , maintain safe working distances, and follow arc flash risk assessment procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burns</strong> — from overheating equipment, faulty connections, or contact
                with hot surfaces during fault-finding. Thermal burns can also result from arc flash
                events. Control measures: test before touch, use thermal imaging where appropriate,
                allow equipment to cool before handling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Falls from height</strong> — working on distribution boards mounted at
                height, accessing loft spaces, or working from ladders and platforms. Electric shock
                at height can cause a secondary fall injury. Control measures: appropriate access
                equipment (step platforms, scaffold towers), PASMA or IPAF training where required,
                and edge protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire</strong> — electrical faults are a leading cause of accidental fires.
                Overloaded circuits, loose connections, damaged insulation, and incorrect fuse
                ratings can all lead to fire. Control measures: correct circuit design, appropriate
                protective device selection, regular inspection and testing, and correct cable
                sizing per{' '}
                <SEOInternalLink href="/guides/cable-sizing-guide-bs-7671">
                  BS 7671 cable sizing requirements
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos exposure</strong> — older properties (pre-2000) may contain
                asbestos in flash guards behind consumer units, textured coatings (Artex), floor
                tiles, insulation boards, and cable routes. Disturbing asbestos-containing materials
                during electrical work can release lethal fibres. Control measures: asbestos
                awareness training, check the asbestos register before starting work, stop work and
                report if suspected ACMs are found.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate site-specific risk assessments with AI"
          description="Elec-Mate's AI Health and Safety agent creates risk assessments tailored to your job. Describe the task and site conditions, and get a complete risk assessment covering all electrical and non-electrical hazards with correct control measures. Ready in minutes, not hours."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'template-structure',
    heading: 'Risk Assessment Template Structure',
    content: (
      <>
        <p>
          A well-structured risk assessment template makes it easy to complete assessments quickly
          and consistently. Here is the standard structure used by most electricians and required by
          competent person schemes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Header information</strong> — company name, assessment date, review date,
                assessor name and signature, job/project reference, site address, and client name.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Task description</strong> — a clear description of the work activity being
                assessed (for example, "periodic inspection and testing of a domestic electrical
                installation, 10 circuits, TN-S earthing system").
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hazard identification column</strong> — list each hazard identified
                (electric shock, arc flash, working at height, manual handling, asbestos, etc.).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who is at risk</strong> — identify the people who could be harmed by each
                hazard (electrician, other tradespeople, building occupants, public).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk rating (before controls)</strong> — use a likelihood x severity matrix
                to assign a risk level (Low, Medium, High) before control measures are applied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control measures</strong> — describe the specific actions, procedures,
                equipment, and PPE that will be used to manage each hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Residual risk rating (after controls)</strong> — the risk level after
                control measures are applied. This should be Low or Medium. If a risk remains High
                after controls, the task should not proceed until further controls are identified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency procedures</strong> — what to do in the event of an electric
                shock, fire, injury, or other emergency. Include first aid provisions and emergency
                contact numbers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The template should be easy to adapt for different types of work. Maintain a library of
          generic risk assessments for your common tasks — consumer unit change, rewire, first fix,
          second fix, periodic inspection,{' '}
          <SEOInternalLink href="/guides/ev-charger-installation-guide">
            EV charger installation
          </SEOInternalLink>
          , and fault finding — and customise each one with site-specific details for every job.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Risk Assessment Mistakes Electricians Make',
    content: (
      <>
        <p>
          Even experienced electricians can fall into bad habits with risk assessments. Here are the
          most common mistakes and how to avoid them:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Copy-paste without adapting</strong> — using the same generic risk
                assessment for every job without considering the specific site conditions. A
                domestic rewire in a 1930s property with potential asbestos is very different from a
                new-build first fix. Always add site-specific hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring non-electrical hazards</strong> — focusing only on electric shock
                and forgetting about manual handling, working at height, dust, noise, asbestos, and
                lone working. The HSE expects a holistic assessment of all workplace hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not recording findings</strong> — doing a mental risk assessment but not
                writing it down. Even if you are a sole trader, a written record is essential
                evidence of compliance and professionalism.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never reviewing or updating</strong> — producing a risk assessment once and
                never looking at it again. Risk assessments must be living documents, reviewed and
                updated regularly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vague control measures</strong> — writing "take care" or "be careful"
                instead of specific, actionable control measures. Good control measures are
                specific: "Follow safe isolation procedure per GS 38. Use proving unit to confirm
                dead before and after testing. Apply lock off devices to MCBs."
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dynamic-risk-assessment',
    heading: 'Dynamic Risk Assessment: Assessing Risk on the Go',
    content: (
      <>
        <p>
          A dynamic risk assessment is a continuous, real-time process of evaluating risks as you
          encounter them on site. It supplements your written risk assessment — it does not replace
          it. Even with a thorough pre-job risk assessment, you may encounter unexpected hazards
          when you arrive on site or as the work progresses.
        </p>
        <p>Examples of situations requiring dynamic risk assessment for electricians include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Arriving on site and finding a different type of installation than expected — for
                example, a TT earthing system instead of TN-S, requiring different test procedures
                and potentially different protective equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Discovering suspected asbestos-containing materials in the cable route that were not
                identified in the pre-job assessment. Stop work, do not disturb the material, and
                arrange for a specialist survey.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Finding that the consumer unit is located in a confined space with poor ventilation
                and limited access, requiring additional precautions or a different approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Weather conditions changing — rain making external work dangerous, high winds
                affecting work at height, or extreme heat increasing the risk of fatigue.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key principle of dynamic risk assessment is: if conditions change and you are not
          confident the work can be carried out safely, stop. Reassess. Adjust your control measures
          or postpone the work until conditions improve. Never press on with a task when new hazards
          have emerged that you have not properly assessed and controlled.
        </p>
      </>
    ),
  },
  {
    id: 'digital-risk-assessments',
    heading: 'Going Digital: AI-Powered Risk Assessments',
    content: (
      <>
        <p>
          Traditional paper risk assessments and generic Word document templates have served the
          industry for decades, but they have significant limitations. They are time-consuming to
          complete, difficult to customise for each job, easy to lose, and hard to update. Most
          electricians admit that the paperwork burden of risk assessments is one of the least
          enjoyable parts of the job.
        </p>
        <p>
          Elec-Mate's AI Health and Safety agent changes this entirely. Instead of starting from a
          blank template or adapting a generic document, you describe the job — the task, the site
          conditions, the personnel involved — and the AI generates a complete, site-specific risk
          assessment in minutes. It covers all relevant electrical and non-electrical hazards,
          applies the correct control measures, references the appropriate legislation and
          standards, and produces a professional document ready for use on site.
        </p>
        <p>
          The <SEOInternalLink href="/tools/rams-generator">RAMS generator tool</SEOInternalLink>{' '}
          goes further by combining the risk assessment with a matching method statement, giving you
          the complete RAMS package in one go. This is particularly valuable for commercial and
          industrial work where main contractors require RAMS before you can start on site.
        </p>
        <p>
          The AI also helps with Elec-Mate training courses including{' '}
          <SEOInternalLink href="/training/manual-handling">manual handling</SEOInternalLink>,{' '}
          <SEOInternalLink href="/training/pasma">PASMA</SEOInternalLink>, and{' '}
          <SEOInternalLink href="/training/working-at-height">working at height</SEOInternalLink> —
          ensuring your team has the knowledge to implement the control measures identified in the
          risk assessment.
        </p>
        <SEOAppBridge
          title="Create RAMS in minutes, not hours"
          description="Elec-Mate's AI Health and Safety agent generates complete RAMS packages — risk assessment and method statement — tailored to your specific job. Describe the work, and get a professional document covering all hazards, control measures, and safe systems of work. Used by 430+ UK electricians."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RiskAssessmentElectriciansPage() {
  return (
    <GuideTemplate
      title="Risk Assessment for Electricians | Free Template Guide"
      description="Complete guide to risk assessments for electricians. HSE 5-step process, electrical-specific hazards, template structure, legal requirements under the Management of Health and Safety at Work Regulations 1999, and free template guidance."
      datePublished="2025-03-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Risk Assessment for Electricians:{' '}
          <span className="text-yellow-400">The Complete Guide with Free Template</span>
        </>
      }
      heroSubtitle="Every electrician needs written risk assessments. The HSE 5-step process, electrical-specific hazards, template structure, legal requirements, and how to create site-specific assessments in minutes with AI. This guide covers everything you need to know."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Risk Assessments for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Generate Risk Assessments in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Health and Safety agent to create site-specific risk assessments and RAMS packages. Describe the job, get a complete document. 7-day free trial, cancel anytime."
    />
  );
}
