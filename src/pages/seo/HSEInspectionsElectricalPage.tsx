import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  AlertTriangle,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  Scale,
  Eye,
  FileWarning,
  Ban,
  Gavel,
  GraduationCap,
  Building,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/safe-isolation-procedure' },
  { label: 'HSE Inspections', href: '/guides/hse-inspections-electrical' },
];

const tocItems = [
  { id: 'what-hse-inspects', label: 'What HSE Inspects' },
  { id: 'why-inspections-happen', label: 'Why Inspections Happen' },
  { id: 'what-inspectors-look-for', label: 'What Inspectors Look For' },
  { id: 'improvement-notices', label: 'Improvement Notices' },
  { id: 'prohibition-notices', label: 'Prohibition Notices' },
  { id: 'prosecution', label: 'Prosecution and Penalties' },
  { id: 'preparation', label: 'How to Prepare' },
  { id: 'during-inspection', label: 'During the Inspection' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'HSE inspectors can visit any workplace without notice. Electrical safety is a key focus area under the Electricity at Work Regulations 1989 and the Health and Safety at Work Act 1974.',
  'Inspectors look for evidence of maintenance, testing records (EICRs), safe working practices, competent persons, and proper documentation — not just the physical condition of the installation.',
  'An improvement notice requires you to fix a problem within a specified time. A prohibition notice stops work immediately until the danger is removed. Both are legally enforceable.',
  'Prosecution for electrical safety breaches can result in unlimited fines and up to 2 years imprisonment for individuals under the EAWR 1989.',
  'Elec-Mate helps electricians maintain the documentation and records that HSE inspectors expect to see — digital certificates, test results, and professional reports available on your phone.',
];

const faqs = [
  {
    question: 'Can HSE turn up without warning?',
    answer:
      'Yes. HSE inspectors have the legal right to enter any workplace at any reasonable time, without prior appointment. They can also enter premises at any time if they believe a dangerous situation exists. You cannot refuse entry to an HSE inspector — doing so is an offence under the Health and Safety at Work Act 1974, Section 33. In practice, routine inspections are sometimes arranged in advance, but inspectors carrying out reactive visits (following an accident, complaint, or intelligence) will typically arrive unannounced. You should always be prepared for an inspection, which means keeping your documentation current and your working practices compliant at all times.',
  },
  {
    question: 'What is the difference between an improvement notice and a prohibition notice?',
    answer:
      'An improvement notice requires the duty holder to remedy a contravention within a specified period (typically 21 days minimum). The business can continue operating while making the required improvements. A prohibition notice is more serious — it stops a specific activity or the use of specific equipment immediately (or after a specified time) because the inspector believes there is a risk of serious personal injury. A prohibition notice can be issued even if no specific regulation has been breached — it is based on the inspector risk assessment. Both types of notice can be appealed to an Employment Tribunal within 21 days, but a prohibition notice remains in force during the appeal unless the tribunal directs otherwise. Failure to comply with either notice is a criminal offence.',
  },
  {
    question: 'What records does the HSE expect to see for electrical safety?',
    answer:
      'HSE inspectors will typically want to see: current EICR (Electrical Installation Condition Report) for the premises, EIC and Minor Works certificates for any recent work, PAT testing records, emergency lighting test records, fire alarm maintenance records, risk assessments for electrical work, safe isolation procedures, permits to work (if applicable), evidence of competence for anyone carrying out electrical work (qualifications, scheme registration), and maintenance logs. The key principle is that you should be able to demonstrate a systematic approach to electrical safety — not just that the installation is currently safe, but that it is being maintained and managed to remain safe.',
  },
  {
    question: 'Can I be personally prosecuted for an electrical safety breach?',
    answer:
      'Yes. Under the Electricity at Work Regulations 1989, duties are placed on employers, employees, and self-employed persons. An employee who carries out unsafe electrical work, or an electrician who fails to follow safe working practices, can be personally prosecuted in addition to (or instead of) their employer. Regulation 3 makes this explicit. Under the Health and Safety at Work Act 1974, individual directors and managers can also be prosecuted if a company offence is committed with their consent, connivance, or neglect. Penalties under the EAWR include unlimited fines and up to 2 years imprisonment. Under the HSWA 1974, penalties also include unlimited fines and imprisonment for certain offences.',
  },
  {
    question: 'What happens if someone is injured by an electrical fault at work?',
    answer:
      'If someone is injured (or killed) as a result of an electrical fault at work, the employer must report the incident under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013). HSE will almost certainly investigate the incident. The investigation will examine the condition of the electrical installation, the maintenance and testing records, the competence of the people who installed or maintained it, the risk assessments in place, and whether the employer had taken all reasonably practicable steps to prevent the incident. If the investigation finds failings, enforcement action can range from improvement notices to prosecution. In fatal cases, the police and the Crown Prosecution Service may also be involved, potentially bringing charges of gross negligence manslaughter.',
  },
  {
    question: 'How does Elec-Mate help with HSE compliance?',
    answer:
      'Elec-Mate provides digital tools for creating and storing the documentation that HSE inspectors expect. You can complete EICR, EIC, and Minor Works certificates on your phone, with all test results and observations recorded digitally. The professional PDF output meets BS 7671 requirements and can be shared instantly with building owners or produced during an inspection. Having your certification records available on your phone means you can respond to an inspector request immediately rather than saying you will have to go back to the office and find the paperwork. Digital records also provide a clear audit trail with dates, times, and inspector details that demonstrate a systematic approach to electrical safety management.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rams-template-electricians',
    title: 'RAMS Template for Electricians',
    description: 'Risk assessment and method statement templates tailored for electrical work.',
    icon: ClipboardCheck,
    category: 'Safety',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Step-by-step safe isolation guide compliant with GS38 and BS 7671.',
    icon: ShieldCheck,
    category: 'Safety',
  },
  {
    href: '/guides/electrical-maintenance-guide',
    title: 'Electrical Maintenance Guide',
    description:
      'PPM vs reactive maintenance, testing intervals, and documentation for compliance.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete digital EICR certificates on your phone with AI board scanning.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/school-electrical-inspection',
    title: 'School Electrical Inspection',
    description: 'EICR and fire safety requirements for educational establishments.',
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
    id: 'what-hse-inspects',
    heading: 'What the HSE Inspects and Why It Matters',
    content: (
      <>
        <p>
          The Health and Safety Executive (HSE) is the UK government body responsible for enforcing
          workplace health and safety legislation. For electrical work, the two primary pieces of
          legislation are the Health and Safety at Work Act 1974 (HSWA) and the Electricity at Work
          Regulations 1989 (EAWR).
        </p>
        <p>
          HSE inspectors — also called inspectors of health and safety — have extensive legal powers
          to enter workplaces, examine equipment, take measurements, interview employees, require
          the production of documents, and take enforcement action. They focus on whether the duty
          holder (usually the employer or building owner) has taken all reasonably practicable steps
          to manage electrical safety.
        </p>
        <p>
          For electricians, this means two things: first, your own working practices on site may be
          inspected; second, the electrical installations you maintain or certify may be examined as
          part of a wider workplace inspection. In both cases, competence and documentation are what
          the inspector is looking for.
        </p>
      </>
    ),
  },
  {
    id: 'why-inspections-happen',
    heading: 'Why HSE Inspections Happen',
    content: (
      <>
        <p>
          HSE inspections are triggered by several different circumstances. Understanding why they
          happen helps you understand what to expect.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proactive (planned) inspections.</strong> HSE selects workplaces for routine
                inspection based on risk profiles, industry sector, and compliance history.
                High-risk industries (construction, manufacturing) receive more frequent proactive
                inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactive inspections following an incident.</strong> If a workplace
                accident, injury, or dangerous occurrence is reported under RIDDOR, HSE will
                investigate. Electrical incidents — electric shock, arc flash, electrical fire —
                trigger detailed investigation of the installation, maintenance records, and working
                practices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaints.</strong> Anyone can report a health and safety concern to HSE.
                Employees, contractors, members of the public, and even competitors can trigger an
                inspection by reporting unsafe electrical practices or conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intelligence-led visits.</strong> HSE uses data from injury reports,
                insurance claims, and other sources to identify workplaces or employers with poor
                safety records. These targeted visits focus on known problem areas.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regardless of the trigger, the inspector's approach is the same: assess whether the duty
          holder has effective systems for managing electrical safety, examine the evidence, and
          take action if the standards are not met.
        </p>
      </>
    ),
  },
  {
    id: 'what-inspectors-look-for',
    heading: 'What Inspectors Look For: The Electrical Safety Checklist',
    content: (
      <>
        <p>
          When an HSE inspector examines electrical safety at a workplace, they are looking for
          evidence that a systematic approach is in place. Here is what they typically check.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current EICR.</strong> Is there a valid{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Electrical Installation Condition Report
                </SEOInternalLink>{' '}
                for the premises? Is it within its recommended re-inspection date? Were any defects
                actioned?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance records.</strong> Is there a documented{' '}
                <SEOInternalLink href="/guides/electrical-maintenance-guide">
                  maintenance programme
                </SEOInternalLink>{' '}
                for the electrical installation? Are maintenance logs up to date?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe working practices.</strong> Are electricians following{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedures
                </SEOInternalLink>
                ? Is there a permit to work system for high-risk electrical activities?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competence of personnel.</strong> Can the people carrying out electrical
                work demonstrate competence? Do they hold the relevant qualifications (18th Edition,
                2391)? Are they registered with a competent person scheme?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk assessments.</strong> Are there{' '}
                <SEOInternalLink href="/guides/rams-template-electricians">
                  risk assessments and method statements
                </SEOInternalLink>{' '}
                for electrical activities? Are they specific and current, not generic templates?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT testing.</strong> Is portable equipment being inspected and tested at
                appropriate intervals? Are records available?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test equipment.</strong> Is test equipment compliant with GS38 (HSE guidance
                on electrical test equipment)? Is it within calibration? Are probes, leads, and
                accessories in good condition?
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector is looking for a system, not perfection. A workplace that has a structured
          maintenance programme, current documentation, and competent personnel — even if there are
          some minor issues — will receive a very different response from one that has no records,
          no programme, and no evidence of competence.
        </p>
        <SEOAppBridge
          title="Keep your certification records on your phone"
          description="Elec-Mate stores all your digital certificates, test results, and reports. When an HSE inspector asks to see documentation, you can produce it instantly. No trips to the office, no searching through filing cabinets."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'improvement-notices',
    heading: 'Improvement Notices: What They Mean',
    content: (
      <>
        <p>
          An improvement notice is issued when an HSE inspector believes a statutory provision is
          being contravened, or has been contravened and is likely to be repeated. The notice
          specifies the contravention, the regulation being breached, and the steps required to
          remedy it — along with a deadline for compliance.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileWarning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum compliance period:</strong> 21 days from the date of service. The
                inspector may allow longer depending on the complexity of the work required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileWarning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work can continue</strong> while the improvement is being made, unless a
                separate prohibition notice is also issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileWarning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right of appeal</strong> to an Employment Tribunal within 21 days. The
                notice is suspended during the appeal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileWarning className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failure to comply</strong> is a criminal offence with unlimited fines and
                potential imprisonment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common electrical improvement notice examples include: failure to obtain or renew an EICR,
          inadequate maintenance records, lack of safe isolation procedures, uncertified electrical
          work, and failure to carry out remedial work identified on a previous EICR.
        </p>
      </>
    ),
  },
  {
    id: 'prohibition-notices',
    heading: 'Prohibition Notices: Immediate Stop',
    content: (
      <>
        <p>
          A prohibition notice is the most serious enforcement tool short of prosecution. It is
          issued when an inspector believes there is a risk of serious personal injury from an
          activity or the condition of equipment.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ban className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immediate effect.</strong> The activity must stop immediately (or within the
                specified period). Work cannot resume until the prohibition notice has been complied
                with and the inspector is satisfied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ban className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No breach required.</strong> A prohibition notice can be issued even if no
                specific regulation has been breached — it is based on the inspector's assessment of
                the risk of serious personal injury.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ban className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right of appeal</strong> to an Employment Tribunal within 21 days. However,
                unlike an improvement notice, a prohibition notice remains in force during the
                appeal unless the tribunal specifically directs otherwise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ban className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring a prohibition notice</strong> is a criminal offence. It can result
                in unlimited fines and imprisonment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electrical examples that commonly trigger prohibition notices include: live working
          without justification, exposed live parts accessible to unqualified persons, damaged or
          deteriorated distribution equipment that poses an immediate shock or fire risk, and
          working without safe isolation on systems where the risk of serious injury is clear.
        </p>
      </>
    ),
  },
  {
    id: 'prosecution',
    heading: 'Prosecution: When It Gets Serious',
    content: (
      <>
        <p>
          Prosecution is reserved for the most serious breaches or for cases where duty holders have
          failed to comply with enforcement notices. HSE publishes sentencing guidelines that courts
          must follow, and the penalties since the introduction of the Health and Safety Sentencing
          Guidelines 2016 have increased significantly.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gavel className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989:</strong> Unlimited fines and up to 2
                years imprisonment for individuals. For companies, fines are set based on turnover,
                culpability, and the level of harm or risk of harm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gavel className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974:</strong> Unlimited fines for most
                offences. Imprisonment of up to 2 years for certain offences (failure to comply with
                enforcement notices, false statements).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gavel className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corporate Manslaughter and Corporate Homicide Act 2007:</strong> Where a
                death results from a gross breach of duty of care by an organisation, fines are
                unlimited. Individual managers can also face charges under the HSWA 1974.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gavel className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gross negligence manslaughter:</strong> Individual prosecution where death
                results from gross negligence. Penalty: life imprisonment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          HSE publishes details of prosecutions on their website, including the company name, the
          offence, and the penalty. For electrical contractors, a prosecution is devastating — it
          results in criminal records for individuals, loss of competent person scheme registration,
          loss of insurance, and reputational damage that can end a business.
        </p>
      </>
    ),
  },
  {
    id: 'preparation',
    heading: 'How to Prepare for an HSE Inspection',
    content: (
      <>
        <p>
          The best preparation is ongoing compliance — not a last-minute scramble. If your systems
          and documentation are maintained continuously, an HSE inspection is simply a demonstration
          of what you already do.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep your EICR current.</strong> Ensure every premises you maintain or work
                in has a valid EICR within its recommended re-inspection date. If it does not, flag
                it to the building owner in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintain up-to-date documentation.</strong> Certificates, maintenance logs,
                risk assessments, method statements, and competence records should all be current
                and accessible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Follow safe working practices consistently.</strong> Safe isolation, permit
                to work systems, correct PPE, and GS38-compliant test equipment should be standard
                practice on every job — not just when someone is watching.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Train your team.</strong> Every electrician on your team should understand
                the regulatory requirements, know the safe working procedures, and be able to
                demonstrate their competence to an inspector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Act on defects promptly.</strong> If an EICR identifies C1 or C2 defects,
                carry out the remedial work and document it. An inspector who finds unactioned
                defects on a previous EICR will view that very seriously.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Digital records available in seconds"
          description="When an HSE inspector asks for your EICR, test results, or certificates, pull them up on your phone instantly. Elec-Mate stores all your digital certification records securely and makes them searchable."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'during-inspection',
    heading: 'During the Inspection: Practical Advice',
    content: (
      <>
        <p>
          When an HSE inspector arrives, your response sets the tone for the entire visit. Here is
          practical advice for handling the inspection professionally.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check their credentials.</strong> Ask to see the inspector's warrant card.
                All HSE inspectors carry official identification. If you are unsure, you can call
                HSE directly to verify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be cooperative and professional.</strong> Answer questions honestly. Do not
                volunteer unnecessary information, but do not obstruct or mislead the inspector.
                Obstruction is a criminal offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide documentation promptly.</strong> Have your EICRs, certificates, risk
                assessments, and maintenance records available. Digital records on your phone are
                perfectly acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Take notes.</strong> Record what the inspector examines, what questions they
                ask, and what they say. If they issue any notices or recommendations, note the
                details and the deadline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask questions.</strong> You are entitled to ask the inspector to clarify
                anything you do not understand. If they identify a problem, ask what specifically
                needs to be done to remedy it.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most HSE inspectors are experienced professionals who want to see safe workplaces, not
          issue penalties. A cooperative, competent response with good documentation will go a long
          way. The inspectors who cause problems are the ones who find no records, no evidence of
          competence, and unsafe working practices — because at that point, enforcement action
          becomes necessary.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HSEInspectionsElectricalPage() {
  return (
    <GuideTemplate
      title="HSE Inspections | What Electricians Need to Know"
      description="Complete guide to HSE inspections for electricians. What inspectors look for, improvement notices, prohibition notices, prosecution, penalties, and how to prepare. Covers Electricity at Work Regulations 1989 and Health and Safety at Work Act 1974."
      datePublished="2025-05-12"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          HSE Inspections:{' '}
          <span className="text-yellow-400">What Every Electrician Needs to Know</span>
        </>
      }
      heroSubtitle="HSE inspectors can visit without warning. They have the power to issue improvement notices, prohibition notices, and prosecute. This guide explains what they look for, how to prepare, and how to respond — so an inspection is a demonstration of competence, not a crisis."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About HSE Inspections"
      relatedPages={relatedPages}
      ctaHeading="Stay Compliant With Digital Records"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for digital certificates, test results, and professional documentation. Always inspection-ready. 7-day free trial, cancel anytime."
    />
  );
}
