import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Brain,
  HardHat,
  Flame,
  Smartphone,
  Search,
  Wrench,
  GraduationCap,
  Bot,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Method Statement Generator', href: '/tools/ai-method-statement-generator' },
];

const tocItems = [
  { id: 'what-is-method-statement', label: 'What Is the Method Statement Generator?' },
  { id: 'cdm-compliance', label: 'CDM 2015 Compliance' },
  { id: 'risk-assessment', label: 'Risk Assessment Integration' },
  { id: 'ppe-and-permits', label: 'PPE, Permits, and Controls' },
  { id: 'site-specific-content', label: 'Site-Specific Content' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Describe the job in plain English and the AI generates a complete method statement with risk assessment, control measures, PPE requirements, and permits needed.',
  'Every generated document aligns with CDM 2015, the Management of Health and Safety at Work Regulations 1999, and the Electricity at Work Regulations 1989.',
  'The AI produces site-specific content, not generic templates — it identifies hazards relevant to your exact job description and installation type.',
  'Includes COSHH assessments where hazardous substances are identified, with exposure routes, control measures, and emergency procedures.',
  'Export as a professional branded PDF ready to submit to principal contractors, clients, and site safety teams.',
];

const faqs = [
  {
    question: 'What is a method statement and when do electricians need one?',
    answer:
      'A method statement is a document that describes the safe sequence of work for a specific task. It details each step of the job from start to finish, identifying the safety precautions at each stage, the equipment and materials to be used, the competencies required, and the emergency procedures in place. Electricians need method statements for virtually all commercial work — principal contractors and building managers require written RAMS (Risk Assessment and Method Statement) before you are permitted to start work on their site. Even for domestic work, a method statement demonstrates professionalism and can be valuable if any dispute arises about how the work was carried out. Under CDM 2015, all contractors carrying out construction work (which includes electrical installation) must plan, manage, and monitor their work to ensure safety.',
  },
  {
    question: 'How does the AI generate a method statement from a job description?',
    answer:
      'You describe the job in the same way you would explain it to another electrician — for example, "Consumer unit upgrade in a three-storey commercial office building, replacing a three-phase distribution board on the second floor, building is occupied during the work, existing TN-C-S supply." The AI analyses this description and identifies all relevant tasks (isolation, removal of existing board, cable modifications, installation of new board, termination, testing, commissioning) and all relevant hazards (working at height if the board is elevated, electrical hazards during isolation and reconnection, manual handling of the distribution board, fire risk during hot works, asbestos risk in an older building, disruption management with building occupants). It then generates a step-by-step method statement with the hazards and controls integrated at each stage.',
  },
  {
    question: 'Does the generator include risk matrices and scoring?',
    answer:
      'Yes. The risk assessment section uses a standard likelihood-times-severity matrix (typically 5x5) to produce an initial risk score for each identified hazard. It then specifies the control measures to be implemented and calculates the residual risk score after controls. This is the format expected by principal contractors and site safety teams. The matrix follows the standard UK approach: likelihood rated from 1 (very unlikely) to 5 (very likely), severity rated from 1 (minor injury) to 5 (fatality or permanent disability), with the risk score calculated as the product. Scores of 1-6 are typically acceptable, 8-12 require management action, and 15-25 require immediate action or prohibition of the activity until controls are in place.',
  },
  {
    question: 'Can I edit the generated method statement before sending it?',
    answer:
      'Yes, you have full editorial control. After the AI generates the initial document, you can edit any section — add site-specific details that only you know (such as the building layout, access restrictions, client-imposed working hours, or nearby hazards), modify control measures to match the specific equipment you will use, adjust the method statement sequence to match your preferred working approach, and add or remove sections as needed. The AI provides the structure and the majority of the content; you add the site knowledge and professional oversight. Many electricians find this approach saves 80-90% of the time compared to writing RAMS from scratch while producing a better, more thorough document.',
  },
  {
    question: 'Are AI-generated method statements accepted by principal contractors?',
    answer:
      'Yes, provided the content is site-specific and covers the required elements. Principal contractors and client safety teams review RAMS for substance — they want to see that you have identified the specific hazards for that job on that site, that your control measures are practical and appropriate, and that your method statement describes a safe sequence of work. Generic template RAMS that list every possible hazard regardless of relevance are actually more likely to be rejected than AI-generated documents tailored to the specific scope of work. The Elec-Mate AI produces RAMS that are specific to the job you describe, which is exactly what site safety teams expect. The professional PDF formatting with your company branding makes the output indistinguishable from any other professionally produced RAMS document.',
  },
  {
    question: 'Does it cover electrical-specific hazards like safe isolation and live working?',
    answer:
      'Yes. The AI is trained specifically for electrical work and understands the specific hazards and control measures relevant to electrical installation. This includes safe isolation procedures in accordance with the Electricity at Work Regulations 1989 and GS38, live working justification and controls where required under Regulation 14, arc flash risk assessment for work on or near distribution boards, cable avoidance procedures for drilling and chasing (CAT and Genny use), and the specific testing hazards associated with insulation resistance testing at 500V and earth fault loop impedance testing. For each electrical hazard, the AI specifies the correct control measures, PPE requirements, and competency standards, referencing the relevant legislation and British Standards.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-fault-diagnosis',
    title: 'AI Fault Diagnosis',
    description:
      'Describe fault symptoms and get a ranked diagnosis with test sequences and BS 7671 references.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/tools/ai-installation-specialist',
    title: 'AI Installation Specialist',
    description:
      'Step-by-step installation guidance for cable routing, containment, first fix, second fix, and testing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/tools/ai-regulations-lookup',
    title: 'AI Regulations Lookup',
    description:
      'Search BS 7671 in plain English. Get the specific regulation number, text, and practical guidance.',
    icon: Search,
    category: 'Tool',
  },
  {
    href: '/guides/how-to-do-safe-isolation',
    title: 'Safe Isolation Guide',
    description:
      'Step-by-step guide to safe isolation procedures in accordance with GS38 and the Electricity at Work Regulations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/manual-handling',
    title: 'Manual Handling Course',
    description:
      'Training on manual handling regulations and safe lifting techniques for electricians on site.',
    icon: HardHat,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition of the IET Wiring Regulations including Amendment 3:2024.',
    icon: FileText,
    category: 'Guide',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Generation',
    description:
      'Describe your job in plain English and the AI generates a complete, site-specific RAMS document in under 60 seconds. No more copying generic templates.',
  },
  {
    icon: ShieldCheck,
    title: 'CDM 2015 Compliant',
    description:
      'Every generated document aligns with CDM 2015, the Management of Health and Safety at Work Regulations 1999, and the Electricity at Work Regulations 1989.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Matrix Scoring',
    description:
      'Standard 5x5 likelihood-times-severity risk matrix with initial and residual risk scores. The format principal contractors expect to see.',
  },
  {
    icon: Flame,
    title: 'COSHH Integration',
    description:
      'Automatic COSHH assessments for hazardous substances relevant to your electrical work — PVC fumes, solvents, silica dust, and more.',
  },
  {
    icon: FileText,
    title: 'Professional PDF Export',
    description:
      'Export as a branded PDF with your company details, ready to submit to principal contractors, clients, and site safety teams.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Generate and edit method statements without signal. Works in basements, plant rooms, and new-build sites with no Wi-Fi.',
  },
];

const howToSteps = [
  {
    name: 'Describe the job',
    text: 'Enter a plain-English description of the electrical work. Include the property type, scope of work, existing installation details, and any site-specific conditions such as building occupancy, access restrictions, or known hazards.',
  },
  {
    name: 'AI generates the RAMS',
    text: 'The AI analyses your description and produces a complete risk assessment (with hazard identification, risk scoring, and control measures) and a detailed method statement (with step-by-step safe sequence of work).',
  },
  {
    name: 'Review and customise',
    text: 'Review the generated document and add any site-specific details. Edit control measures, adjust the method statement sequence, and add COSHH data or permit requirements as needed.',
  },
  {
    name: 'Export and submit',
    text: 'Export the finished RAMS as a professional PDF with your company branding. Send it to the principal contractor or client by email or WhatsApp directly from the app.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-method-statement',
    heading: 'What Is the AI Method Statement Generator?',
    content: (
      <>
        <p>
          The AI Method Statement Generator is one of eight specialist Elec-AI agents in the
          Elec-Mate platform. It converts a plain-English job description into a complete RAMS (Risk
          Assessment and Method Statement) document — site-specific, properly structured, and ready
          to submit to principal contractors and clients.
        </p>
        <p>
          Writing RAMS is one of the most time-consuming administrative tasks for electricians
          working on commercial sites. Most electricians either write RAMS from scratch (which takes
          30-60 minutes per document) or adapt a generic template (which produces vague, non-site-
          specific content that savvy safety teams will reject). The AI Method Statement Generator
          eliminates both problems — it produces a document that is both fast to create and
          genuinely specific to the job you are about to carry out.
        </p>
        <p>
          The generator covers the full scope of electrical installation work, from simple domestic
          tasks to complex commercial and industrial projects. It understands the specific hazards
          associated with electrical work —{' '}
          <SEOInternalLink href="/guides/how-to-do-safe-isolation">safe isolation</SEOInternalLink>,
          live working, arc flash, cable avoidance, working at height near distribution boards,
          asbestos risk in older buildings — and produces control measures and method statements
          that reflect the actual risks of your specific job.
        </p>
        <p>
          Unlike the existing{' '}
          <SEOInternalLink href="/tools/ai-health-safety-agent">
            AI Health and Safety Agent
          </SEOInternalLink>{' '}
          which provides broader H&S guidance, the Method Statement Generator is focused
          specifically on producing complete, submission-ready RAMS documents. It is the tool you
          reach for when you need a RAMS document for a specific job, right now.
        </p>
      </>
    ),
  },
  {
    id: 'cdm-compliance',
    heading: 'CDM 2015 Compliance Built In',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 apply to all construction work
          in Great Britain, which includes electrical installation work. As a contractor, you have
          specific duties under CDM 2015 that include planning, managing, and monitoring your work
          to ensure it is carried out safely. Written RAMS are the primary mechanism for
          demonstrating compliance with these duties.
        </p>
        <p>
          Every document produced by the AI Method Statement Generator aligns with CDM 2015
          requirements. The risk assessment section follows the HSE five-step approach: identify the
          hazards, decide who might be harmed and how, evaluate the risks and decide on precautions,
          record your findings, and review and update. The method statement describes a safe
          sequence of work that accounts for the specific hazards identified in the risk assessment,
          following the principles set out in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and the Electricity at Work Regulations 1989.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work etc. Act 1974</strong> — General duties on
                employers and the self-employed to ensure the health and safety of workers and
                others affected by the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> —
                Regulation 3 requires suitable and sufficient risk assessments for all work
                activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — Specific duties for work on
                or near electrical systems, including safe isolation (Regulation 12) and live
                working justification (Regulation 14).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>COSHH Regulations 2002</strong> — Assessment of exposure to hazardous
                substances encountered during electrical work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The generator also identifies when additional permits may be required — hot works permits,
          confined space entry permits, permits to work on or near live conductors — and includes
          the appropriate sections in the RAMS document.
        </p>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Integrated Risk Assessment with Scoring',
    content: (
      <>
        <p>
          The risk assessment section of every generated document uses a standard 5x5 likelihood-
          times-severity matrix. This is the format universally expected by principal contractors
          and site safety teams in the UK construction industry.
        </p>
        <p>
          For each identified hazard, the AI produces: a clear description of the hazard, who is at
          risk (operatives, other workers, building occupants, members of the public), the initial
          risk score before controls, the specific control measures to be implemented, and the
          residual risk score after controls. The control measures follow the hierarchy of controls
          — elimination, substitution, engineering controls, administrative controls, and PPE — in
          accordance with the Management of Health and Safety at Work Regulations 1999.
        </p>
        <p>
          The AI identifies hazards specific to your job description, not a generic list of every
          possible hazard. If you describe a consumer unit upgrade in a ground-floor domestic
          property, it does not include working at height risks for third-floor distribution boards.
          If you describe cable installation in a building constructed after 2000, it does not
          include asbestos risk. This specificity is what distinguishes AI-generated RAMS from
          generic templates, and it is exactly what site safety teams look for when reviewing
          submitted RAMS.
        </p>
        <SEOAppBridge
          title="Generate your next RAMS in 60 seconds"
          description="Describe the job, get a complete RAMS with risk matrix, control measures, and method statement. Export as a professional PDF and submit to your principal contractor."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'ppe-and-permits',
    heading: 'PPE Requirements, Permits, and Control Measures',
    content: (
      <>
        <p>
          The generated method statement includes specific PPE requirements for each task, not a
          generic "wear PPE at all times" statement. The AI matches PPE to the actual hazards
          present at each stage of the work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation and testing:</strong> Insulated gloves to BS EN 60903, safety
                glasses, GS38-compliant voltage indicator, lock-off devices, warning notices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chasing and drilling:</strong> Safety goggles, FFP3 dust mask (for silica
                dust), hearing protection if using SDS drill or angle grinder, dust extraction
                equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working at height:</strong> Appropriate access equipment (step platform,
                podium steps, or tower scaffold as specified), tool tether where dropping tools
                could cause injury below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot works:</strong> Fire extinguisher (CO2 for electrical fires), fire
                blanket, fire-retardant mat, fire watch period of 60 minutes after completion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The AI also identifies when permit-to-work systems are required. For commercial sites,
          this typically includes: hot works permits for soldering or heat-shrinking near
          combustible materials, permits to work on or near live conductors (as required under
          Regulation 14 of the Electricity at Work Regulations), confined space entry permits for
          work in risers, and isolation permits for work that affects building{' '}
          <SEOInternalLink href="/tools/fire-alarm-certificate">fire alarm</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/emergency-lighting-certificate">
            emergency lighting
          </SEOInternalLink>{' '}
          systems.
        </p>
      </>
    ),
  },
  {
    id: 'site-specific-content',
    heading: 'Site-Specific Content, Not Generic Templates',
    content: (
      <>
        <p>
          The critical difference between the AI Method Statement Generator and a traditional
          template approach is specificity. When you describe a job, the AI produces content that is
          specific to that job on that site. It does not produce a one-size-fits-all document with
          every possible hazard listed regardless of relevance.
        </p>
        <p>
          Site safety teams and principal contractors can immediately tell the difference between a
          site-specific RAMS and a generic template that has been hastily adapted. A generic
          template typically includes hazards that are not relevant to the actual work, omits
          hazards that are specific to the site or task, uses vague control measures like "take
          appropriate precautions," and describes a method of work so generic it could apply to any
          job.
        </p>
        <p>
          The AI-generated RAMS, by contrast, identifies only the hazards relevant to your specific
          job description, specifies control measures that are practical and actionable for the
          actual work being carried out, describes a method statement that follows the logical
          sequence of your specific task, and includes details such as the{' '}
          <SEOInternalLink href="/guides/earthing-arrangements-uk">
            earthing system type
          </SEOInternalLink>
          , cable routes, access arrangements, and building occupancy that demonstrate genuine site
          knowledge.
        </p>
        <p>
          You can then enhance the document further by adding details only you know — the specific
          layout of the building, any client-imposed restrictions, access arrangements you have
          agreed with the site manager, and any hazards you identified during your site visit. The
          AI also integrates with the{' '}
          <SEOInternalLink href="/tools/ai-installation-specialist">
            AI Installation Specialist
          </SEOInternalLink>{' '}
          for detailed step-by-step procedure guidance, ensuring your method statement and your
          actual work sequence align perfectly. The result is a RAMS document that is both
          comprehensive and genuinely specific to the work you are about to carry out.
        </p>
        <SEOAppBridge
          title="Professional RAMS in under 60 seconds"
          description="No more copying templates. Describe the job, get site-specific RAMS with risk scoring, PPE requirements, and professional PDF export. Works offline on site."
          icon={FileText}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIMethodStatementPage() {
  return (
    <ToolTemplate
      title="AI Method Statement Generator | RAMS Tool"
      description="Generate professional, site-specific method statements and risk assessments for electrical work using AI. CDM 2015 compliant, COSHH integration, risk matrix scoring. Built for UK electricians."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Safety Agent"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          AI Method Statement Generator:{' '}
          <span className="text-yellow-400">Professional RAMS in Under 60 Seconds</span>
        </>
      }
      heroSubtitle="Describe your electrical job in plain English. The AI generates a complete, site-specific method statement with risk assessment, control measures, PPE requirements, and permits. CDM 2015 compliant. Export as a branded PDF."
      heroFeaturePills={[
        { icon: ShieldCheck, label: 'CDM 2015 Compliant' },
        { icon: AlertTriangle, label: 'Risk Matrix Scoring' },
        { icon: HardHat, label: 'PPE Requirements' },
        { icon: FileText, label: 'PDF Export' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="Method Statement Generator Features"
      featuresSubheading="Purpose-built for UK electricians. Generate submission-ready RAMS documents in seconds instead of hours."
      howToSteps={howToSteps}
      howToHeading="How to Generate a Method Statement"
      howToDescription="Four steps from job description to a professional RAMS document ready for submission."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Method Statement Generator"
      relatedPages={relatedPages}
      ctaHeading="Generate Professional RAMS in Seconds"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered method statements and risk assessments. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-method-statement-generator"
    />
  );
}
