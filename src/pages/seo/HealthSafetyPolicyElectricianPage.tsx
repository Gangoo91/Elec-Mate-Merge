import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  Users,
  Briefcase,
  Shield,
  AlertTriangle,
  FileText,
  Building2,
  HardHat,
  Scale,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Health & Safety Policy', href: '/guides/health-safety-policy-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'Why You Need an H&S Policy' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'policy-structure', label: 'Policy Structure and Template' },
  { id: 'risk-assessment', label: 'Risk Assessments' },
  { id: 'method-statement', label: 'Method Statements' },
  { id: 'rams', label: 'RAMS: Risk Assessments and Method Statements' },
  { id: 'when-required', label: 'When Is a Written Policy Required?' },
  { id: 'keeping-it-current', label: 'Keeping Your Policy Current' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A written health and safety policy is legally required if you employ 5 or more people (including subcontractors on your books). Even if you have fewer, commercial clients and main contractors almost always require one before letting you on site.',
  'Your H&S policy has three parts: a statement of intent (signed by the business owner), an organisation section (who is responsible for what), and the arrangements (the practical procedures you follow).',
  'Risk assessments must be carried out for every job — not as a box-ticking exercise but as a genuine evaluation of what could go wrong and how to prevent it. The law requires you to record risk assessments if you have 5+ employees, but it is good practice to record them for every job.',
  'Method statements describe how you will carry out the work safely — step by step. Combined with risk assessments, these form your RAMS (Risk Assessment and Method Statement), which is a standard requirement on commercial sites.',
  'Review your H&S policy at least annually, after any accident or near miss, and whenever your working practices change significantly. A policy that is out of date is almost as dangerous as having no policy at all.',
];

const faqs = [
  {
    question: 'Do I legally need a health and safety policy as a sole trader?',
    answer:
      'If you are a sole trader with no employees, you are not legally required to have a written health and safety policy. However, you still have legal duties under the Health and Safety at Work etc. Act 1974 to ensure your work does not put yourself or others at risk. In practice, most commercial clients, main contractors, and SSIP accreditation schemes require a written policy regardless of your size. If you want commercial work, you need a written policy. Even for domestic work, having a policy demonstrates professionalism and protects you if an accident is investigated by the HSE. The cost of creating one is minimal — a few hours of your time using a template.',
  },
  {
    question: 'What should my health and safety policy contain?',
    answer:
      'Your policy should contain three parts. Part 1: Statement of Intent — a brief signed statement committing to providing a safe working environment, complying with legislation, and continually improving your H&S practices. Part 2: Organisation — who is responsible for health and safety (in a sole trader business, that is you; in a larger business, name specific responsibilities for directors, supervisors, and employees). Part 3: Arrangements — the practical procedures: how you conduct risk assessments, safe working procedures for common tasks (working at height, electrical isolation, use of power tools), PPE requirements, accident reporting, first aid arrangements, and training records. For a sole trader, 5 to 10 pages is sufficient.',
  },
  {
    question: 'How do I write a risk assessment for electrical work?',
    answer:
      'A risk assessment follows five steps: (1) Identify the hazards — what could cause harm? (for electrical work: electric shock, arc flash, falls from height, manual handling, asbestos disturbance, cuts from tools, dust from chasing). (2) Decide who might be harmed and how — you, your employees, the customer, other trades on site. (3) Evaluate the risks and decide on precautions — for each hazard, what are you already doing to control it and what more could you do? (4) Record your findings — write them down, even if you are not legally required to. (5) Review and update — before each new job, review the assessment and update for site-specific conditions. Use a simple matrix: likelihood (1 to 5) x severity (1 to 5) = risk score. Scores above 12 need additional controls before proceeding.',
  },
  {
    question: 'What is a method statement and when do I need one?',
    answer:
      'A method statement (or safe system of work) describes, step by step, how you will carry out a task safely. It should include: the task description, the hazards identified, the control measures, the sequence of work, the equipment and PPE required, the personnel involved, and the emergency procedures. You need a method statement for: any work on a commercial site (main contractors require them), work at height, work on or near live electrical systems, work in confined spaces, hot work, and any task where the risk assessment indicates a significant risk. For domestic work, you do not usually need a formal method statement, but having a standard set for common tasks (consumer unit change, rewire, EICR) demonstrates good practice.',
  },
  {
    question: 'What is RAMS and do I need it for every job?',
    answer:
      'RAMS stands for Risk Assessment and Method Statement — it is a combined document covering both the risk evaluation and the safe working procedure for a specific task or project. RAMS is a standard requirement on all commercial construction sites and is increasingly expected on larger domestic projects. You do not technically need a formal RAMS for a small domestic job (adding a socket, changing a light fitting), but you should still mentally assess the risks before starting any work. For commercial work, prepare site-specific RAMS for each project — generic RAMS that are not tailored to the specific site and task will be rejected by competent site managers.',
  },
  {
    question: 'What happens if the HSE investigates me?',
    answer:
      'If you have an accident on site or a complaint is made, the Health and Safety Executive (HSE) may investigate. They will want to see: your health and safety policy, risk assessments for the work being carried out, method statements, training records, evidence of competence (qualifications, competent person scheme registration), insurance certificates, and accident records. If your documentation is in order and you followed your own procedures, the investigation is likely to conclude that you took reasonable steps. If you have no documentation, no risk assessments, and no safe working procedures, you are vulnerable to improvement notices, prohibition notices, and prosecution. HSE fines for individuals start at £1,000 and can reach hundreds of thousands of pounds for serious breaches. Having a policy and following it is your best protection.',
  },
  {
    question: 'How often should I review my health and safety policy?',
    answer:
      'Review your policy at least once a year. Also review it after any accident or near miss, when you start doing new types of work, when you take on employees or subcontractors, when legislation changes (the HSE publishes updates), and when a commercial client or accreditation audit identifies gaps. The annual review does not need to be a major exercise — read through the policy, check that the procedures still reflect what you actually do, update any contact details or named persons, and sign and date the reviewed version. SSIP schemes require evidence of annual review as part of their assessment.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/gdpr-for-electricians',
    title: 'GDPR for Electricians',
    description:
      'Data protection compliance — another essential for commercial work.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/finding-commercial-electrical-work',
    title: 'Finding Commercial Work',
    description:
      'H&S policy is a prerequisite for commercial contracts — get it right first.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-plan-template',
    title: 'Electrical Business Plan',
    description:
      'Include operational and compliance planning in your business plan.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/working-with-other-trades-electrician',
    title: 'Working with Other Trades',
    description:
      'Coordination and safety when working alongside other trades on site.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-project-handover-guide',
    title: 'Project Handover Guide',
    description:
      'H&S documentation is part of a professional project handover.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Professional electrical certification — part of your compliance toolkit.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Health and Safety: Not Just a Box-Ticking Exercise',
    content: (
      <>
        <p>
          Electrical work is inherently hazardous. Electric shock, arc flash, falls from
          height, manual handling injuries, and exposure to asbestos-containing materials are
          all real risks that you face on a daily basis. A health and safety policy is your
          framework for managing those risks — not to satisfy a bureaucrat, but to make sure
          you and everyone around you goes home safe at the end of every day.
        </p>
        <p>
          Beyond the moral and legal obligations, a health and safety policy is a commercial
          necessity. Main contractors will not let you on a commercial site without one. SSIP
          schemes (SafeContractor, CHAS, Constructionline) assess your policy as part of
          accreditation. And if something goes wrong, your policy and risk assessments are the
          first things the HSE will ask to see.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work etc. Act 1974</strong> — places a general duty
                on all employers and self-employed persons to ensure, so far as is reasonably
                practicable, the health, safety, and welfare of themselves, their employees, and
                others affected by their work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> —
                requires risk assessments for all work activities. If you employ 5+ people,
                risk assessments must be recorded in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers&apos; Health and Safety Policy Statements (Exception)
                Regulations 1975</strong> — employers with 5 or more employees must have a
                written health and safety policy. Fewer than 5 employees: no legal requirement
                for a written policy, but you still have all the duties above.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — specific duties for
                anyone working on or near electrical systems. Requires safe systems of work,
                competence, and safe isolation procedures.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'policy-structure',
    heading: 'Health and Safety Policy: Template Structure',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Part 1: Statement of Intent</h4>
                <p className="text-white text-sm leading-relaxed">
                  A signed declaration by the business owner committing to: providing a safe
                  working environment, complying with all relevant legislation, conducting
                  risk assessments, providing training and information, reviewing the policy
                  regularly, and consulting employees on H&S matters. Keep this to one page.
                  Sign and date it.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Part 2: Organisation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Who is responsible for what. For a sole trader: you are responsible for
                  everything. For a larger business: name the person responsible for overall
                  H&S, site-level supervision, first aid, fire safety, training, and accident
                  reporting. Include an organisation chart if you have employees.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Part 3: Arrangements</h4>
                <p className="text-white text-sm leading-relaxed">
                  The practical procedures: risk assessment process, safe isolation procedure,
                  working at height procedure, manual handling, PPE policy, accident reporting
                  (RIDDOR), first aid arrangements, fire procedures, electrical safety
                  standards, training and competence requirements, and consultation with
                  employees. This is the longest section — 3 to 8 pages for a sole trader.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Risk Assessments: The Five-Step Process',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white text-sm">
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center shrink-0">1</span>
                Identify the Hazards
              </h4>
              <p>
                Walk the site before starting work. Look for: exposed live parts, overhead
                cables, trip hazards, working at height requirements, asbestos indicators (pre-2000
                properties), confined spaces, and poor access.
              </p>
            </div>
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center shrink-0">2</span>
                Decide Who Might Be Harmed
              </h4>
              <p>
                You, your employees, the customer and their family, other trades working nearby,
                visitors, and members of the public if the work is in a public area.
              </p>
            </div>
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center shrink-0">3</span>
                Evaluate the Risks and Decide on Precautions
              </h4>
              <p>
                For each hazard: what are you already doing to control it? Is it enough? What
                more should you do? Use the hierarchy of controls: eliminate, substitute,
                engineering controls, administrative controls, PPE (last resort).
              </p>
            </div>
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center shrink-0">4</span>
                Record Your Findings
              </h4>
              <p>
                Write it down. Record the hazard, who is at risk, existing controls, additional
                controls needed, the residual risk level, and the person responsible. Keep it
                simple — a one-page form per job is sufficient for most domestic work.
              </p>
            </div>
            <div className="pb-3">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center shrink-0">5</span>
                Review and Update
              </h4>
              <p>
                Review before each new job, after any incident, and when conditions change.
                Risk assessments are living documents, not paperwork to be filed and forgotten.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'method-statement',
    heading: 'Method Statements: How to Do the Job Safely',
    content: (
      <>
        <p>
          A method statement describes the safe sequence of work for a specific task. It
          should be specific enough that someone unfamiliar with the task could follow it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Method Statement Contents</h4>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Project and task description
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Reference to the associated risk assessment
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Sequence of work (step-by-step)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Hazards identified at each step
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Control measures for each hazard
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Equipment, tools, and materials required
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              PPE requirements
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Personnel and competence requirements
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Emergency procedures
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Sign-off by the person carrying out the work
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rams',
    heading: 'RAMS: Putting It All Together',
    content: (
      <>
        <p>
          RAMS combines your risk assessment and method statement into a single document
          for a specific project or task. On commercial sites, you will be asked to submit
          RAMS before starting work. The site manager reviews and approves them before you
          are allowed to begin.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Good RAMS</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Site-specific — tailored to this project</li>
              <li>Detailed sequence of work</li>
              <li>Specific hazards for this site</li>
              <li>Named personnel with qualifications</li>
              <li>Reviewed and signed by all operatives</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Bad RAMS</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Generic — copied from the internet</li>
              <li>Vague steps: "carry out electrical work"</li>
              <li>Generic hazards not related to the site</li>
              <li>No names, no qualifications listed</li>
              <li>Never read by the people doing the work</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is a Written Policy Legally Required?',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Sole trader, no employees</span>
              <strong className="text-yellow-400">Not legally required (but recommended)</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>1 to 4 employees</span>
              <strong className="text-yellow-400">Not legally required (but recommended)</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>5+ employees</span>
              <strong className="text-yellow-400">Legally required</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Working on commercial sites</span>
              <strong className="text-yellow-400">Required by clients (contractual)</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>SSIP accreditation (SafeContractor, CHAS)</span>
              <strong className="text-yellow-400">Required for assessment</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Main contractor approved supplier list</span>
              <strong className="text-yellow-400">Almost always required</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Practical advice:</strong> Write a policy even if you are not legally
          required to. It takes a few hours, costs nothing, protects you in an investigation,
          and opens the door to commercial work. There is no downside.
        </p>
      </>
    ),
  },
  {
    id: 'keeping-it-current',
    heading: 'Keeping Your Policy Current',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual review</strong> — read through, update, re-sign and re-date.
                SSIP schemes check for evidence of annual review.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After any accident or near miss</strong> — review the relevant procedures
                and update if the incident reveals a gap.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When you hire or change staff</strong> — update the organisation section
                with new names and responsibilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When legislation changes</strong> — check HSE updates and industry
                bulletins. Your competent person scheme should alert you to relevant changes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Safety Is Not Paperwork — It Is Practice',
    content: (
      <>
        <p>
          A health and safety policy is only worth the paper it is written on if you actually
          follow it. The best policy in the world will not protect you if you do not conduct
          risk assessments, do not isolate before working, and do not wear PPE. Make safety
          a habit, not a document.
        </p>
        <SEOAppBridge
          title="Generate RAMS and risk assessments on site"
          description="Elec-Mate includes AI-powered RAMS generation — create site-specific risk assessments and method statements in minutes, not hours. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HealthSafetyPolicyElectricianPage() {
  return (
    <GuideTemplate
      title="Health and Safety Policy for Electricians UK 2026 | Template Guide"
      description="Health and safety policy template for electricians. Policy structure, risk assessments, method statements, RAMS, legal requirements, and when a written policy is legally required."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Compliance Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Health and Safety Policy for Electricians:{' '}
          <span className="text-yellow-400">Template, Risk Assessments, and RAMS</span>
        </>
      }
      heroSubtitle="A practical H&S policy template for electricians. Policy structure, risk assessment process, method statements, RAMS, and when a written policy is legally required (5+ employees)."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Health and Safety Policies"
      relatedPages={relatedPages}
      ctaHeading="Generate RAMS in Minutes, Not Hours"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered RAMS, certificates, and job management. Professional documentation that keeps you safe and wins you work. 7-day free trial, cancel anytime."
    />
  );
}
