import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Camera,
  Mic,
  Search,
  PoundSterling,
  ShieldAlert,
  CircuitBoard,
  Wrench,
  GraduationCap,
  FileCheck2,
  Calculator,
  Receipt,
  Sparkles,
  Zap,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Tools', href: '/tools' },
  { label: 'Electrical App with AI', href: '/tools/electrical-app-with-ai' },
];

const tocItems = [
  { id: 'what-makes-it-different', label: 'What Makes It Different' },
  { id: 'ai-board-scanning', label: 'AI Board Scanning' },
  { id: 'ai-defect-coding', label: 'AI Defect Coding' },
  { id: 'ai-fault-diagnosis', label: 'AI Fault Diagnosis' },
  { id: 'ai-cost-estimation', label: 'AI Cost Estimation' },
  { id: 'ai-rams-generation', label: 'AI RAMS Generation' },
  { id: 'ai-tutoring', label: 'AI Tutoring and Study' },
  { id: 'voice-entry', label: 'Voice Test Entry' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Elec-Mate is the only UK electrical app that embeds AI into every workflow — from scanning consumer units to generating RAMS documents — rather than bolting on a generic chatbot.',
  'The AI Board Scanner photographs a consumer unit and extracts circuit data, device ratings, and board layout in under 30 seconds, auto-filling EICR and EIC certificate forms.',
  'AI Defect Coding maps plain-English defect descriptions to the correct observation code (C1, C2, C3, or FI) with the specific BS 7671 regulation reference — eliminating guesswork on site.',
  'The AI Cost Engineer generates itemised quotes with real UK trade pricing and labour estimates from a job description, ensuring accurate and consistent pricing.',
  'AI RAMS Generation produces site-specific risk assessments and method statements in under 60 seconds, referencing the Health and Safety at Work Act 1974, CDM 2015, and the Electricity at Work Regulations 1989.',
];

const features = [
  {
    icon: Camera,
    title: 'AI Board Scanner',
    description:
      'Photograph any consumer unit. AI identifies MCBs, RCBOs, RCDs, and SPDs — reads ratings, maps the board layout, and auto-fills your certificate.',
  },
  {
    icon: Search,
    title: 'AI Defect Coding',
    description:
      'Describe a defect in plain English. The AI assigns the correct C1, C2, C3, or FI code with the specific BS 7671 regulation reference.',
  },
  {
    icon: Wrench,
    title: 'AI Fault Diagnosis',
    description:
      'Describe fault symptoms and the AI suggests probable causes ranked by likelihood, with diagnostic steps to confirm each one.',
  },
  {
    icon: PoundSterling,
    title: 'AI Cost Engineer',
    description:
      'Describe a job and get an itemised quote with real UK trade pricing, labour estimates, and your profit margin in under a minute.',
  },
  {
    icon: ShieldAlert,
    title: 'AI RAMS Generator',
    description:
      'Describe the work and location. The AI generates a site-specific risk assessment and method statement with all relevant hazards and legal references.',
  },
  {
    icon: CircuitBoard,
    title: 'AI Circuit Designer',
    description:
      'Specify the installation and get a complete consumer unit schedule with cable sizes, protective devices, diversity calculations, and RCD/SPD recommendations.',
  },
  {
    icon: Mic,
    title: 'Voice Test Entry',
    description:
      'Speak your test results — R1+R2, Zs, insulation resistance — and the AI transcribes them directly into your schedule of test results.',
  },
  {
    icon: GraduationCap,
    title: 'AI Tutor',
    description:
      'Ask any question about BS 7671, inspection and testing, or installation practice. The AI answers with specific regulation references from BS 7671:2018+A3:2024.',
  },
  {
    icon: MessageSquare,
    title: 'Client Explainer',
    description:
      'Translate technical defects and recommendations into plain English that homeowners understand. Build client confidence and justify your recommendations.',
  },
];

const faqs = [
  {
    question: 'How is the AI in Elec-Mate different from ChatGPT?',
    answer:
      'ChatGPT is a general-purpose AI trained on a broad internet dataset. It can answer general electrical questions but frequently confuses BS 7671 with the US National Electrical Code, cites regulation numbers that do not exist, and has no access to current UK trade pricing. Elec-Mate uses retrieval-augmented generation (RAG) — the AI retrieves the exact text from BS 7671:2018+A3:2024, real UK trade pricing databases, and installation scenario libraries before generating a response. This means it cites the correct regulation numbers, uses current material prices, and understands UK installation practices. The AI is also embedded directly into the app workflows — board scanning flows into your EICR form, defect coding populates your observations, cost estimates become professional quotes — rather than existing as a separate chat window.',
  },
  {
    question: 'Does the AI work offline?',
    answer:
      'AI features require an internet connection because the AI models are too large to run on a mobile device and need access to current pricing data and regulation databases that are updated regularly. However, Elec-Mate is designed for site work where mobile signal can be unreliable. Core features like certificate forms, calculators, and test result entry work offline with data saving locally every 10 seconds. When you regain a connection, everything syncs to the cloud automatically within 30 seconds. If you lose signal mid-AI query, the request queues and processes automatically when the connection returns.',
  },
  {
    question: 'Is my data safe when using AI features?',
    answer:
      'Elec-Mate is fully GDPR-compliant. Board photos submitted for AI scanning are processed for data extraction only — they are not used to train AI models and are not shared with third parties. All data is encrypted in transit and at rest. You retain full ownership and control of your data at all times, including the right to export and delete. AI processing happens on secure, UK/EU-hosted infrastructure. Your client addresses, property details, and certificate data are never used to improve AI models or shared with other users.',
  },
  {
    question: 'How accurate is the AI Board Scanner?',
    answer:
      'The AI Board Scanner achieves high accuracy with modern, well-labelled consumer units from major UK manufacturers (Hager, Wylex, Schneider, MK, Contactum, Fusebox). It correctly identifies device types (MCB, RCBO, RCD, isolator, SPD, AFDD), reads current ratings, and maps the board layout. Accuracy is lower with older boards, heavily modified installations, damaged or illegible labels, and non-standard manufacturers. You always review the extracted data before it enters your certificate — the AI does the heavy lifting of data entry, and you verify and correct. Even on a board where 80% of the data is correctly extracted, you save significant time compared to typing everything manually.',
  },
  {
    question: 'Can I use the AI Cost Engineer for commercial quoting?',
    answer:
      'Yes. The AI Cost Engineer handles both domestic and commercial work. For commercial projects, describe the scope of work — "lighting upgrade in a 500 square metre office, replace 60 recessed fluorescent fittings with LED panels, new emergency lighting to BS 5266, fire alarm modifications to BS 5839" — and the AI produces an itemised breakdown with materials, labour, and your profit margin. The pricing uses weekly-updated UK trade data from major wholesalers. For larger commercial projects, treat the AI estimate as a starting point and adjust for site-specific factors (access restrictions, working hours, phasing, prelims, and attendance). The AI saves you the 30-60 minutes of manual itemisation — the review and adjustment takes 5-10 minutes.',
  },
  {
    question: 'What AI agents are included in Elec-Mate?',
    answer:
      'Elec-Mate includes 5 specialist AI agents, each trained for a specific domain: Circuit Designer (produces complete consumer unit schedules with cable sizes, protective devices, and diversity calculations to BS 7671), Cost Engineer (generates itemised quotes with real UK trade pricing and labour estimates), Installation Specialist (answers installation questions with BS 7671 regulation references), Maintenance Specialist (fault diagnosis with probable causes and diagnostic steps), and Health and Safety agent (generates site-specific RAMS, risk assessments, COSHH assessments, and toolbox talks). In addition, there are 12 AI-powered tools including the Board Scanner, Defect Code AI, Voice to Test Results, Remedial Cost Estimator, Component Identifier, Client Explainer, Diagram Builder, Regulations Lookup, and Report Writer. All AI features are included in the standard subscription at no extra cost.',
  },
  {
    question: 'How does AI RAMS generation work?',
    answer:
      'Describe the work and the location — for example, "consumer unit change in an occupied first-floor flat, communal stairway access, existing asbestos survey clear, parking on the street." The AI generates a complete risk assessment and method statement covering all relevant hazards (working on or near live equipment, manual handling, working in an occupied property, waste disposal, isolation procedures), control measures for each hazard, PPE requirements, emergency procedures, and competency requirements. The RAMS references the Health and Safety at Work Act 1974, the Management of Health and Safety at Work Regulations 1999, the CDM Regulations 2015, the Electricity at Work Regulations 1989, and any other applicable legislation. The output is a professional document ready for submission to the principal contractor or client. Generation takes under 60 seconds.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-electrician',
    title: 'AI Electrician Hub',
    description:
      '5 specialist AI agents and 12 AI-powered tools built for UK electricians. The central hub for all AI features.',
    icon: Brain,
    category: 'AI Tools',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates with AI board scanning, voice test entry, and instant PDF delivery.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/ai-cost-engineer',
    title: 'AI Cost Engineer',
    description:
      'Itemised quotes from a job description. Real UK trade pricing, labour estimates, and profit margins.',
    icon: PoundSterling,
    category: 'AI Tool',
  },
  {
    href: '/tools/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Complete consumer unit schedules with cable sizes, protective devices, and diversity calculations to BS 7671.',
    icon: CircuitBoard,
    category: 'AI Tool',
  },
  {
    href: '/tools/ai-health-safety-agent',
    title: 'AI Health and Safety Agent',
    description:
      'Site-specific RAMS, risk assessments, COSHH assessments, and toolbox talks from a job description.',
    icon: ShieldAlert,
    category: 'AI Tool',
  },
  {
    href: '/guides/ai-tools-for-electricians',
    title: 'AI Tools for Electricians Guide',
    description:
      'Complete guide to how AI is transforming the electrical trade. Practical applications, accuracy, privacy, and future developments.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-makes-it-different',
    heading: 'What Makes an AI-Powered Electrical App Different',
    content: (
      <>
        <p>
          There are several electrical apps on the UK market. Most of them digitise paperwork — they
          replace paper certificates with digital forms on your phone. That is useful, but it is not
          transformative. You are still typing every circuit into the EICR manually. You are still
          looking up regulation numbers for defect codes. You are still spending 30 minutes pricing
          a job on a spreadsheet.
        </p>
        <p>
          An AI-powered electrical app is fundamentally different. The AI does not just store your
          data — it actively helps you do the work faster and more accurately. It reads the consumer
          unit from a photo. It classifies defects with the correct BS 7671 regulation. It prices
          the job while you are still on site. It writes the RAMS before you arrive. It transcribes
          your test results while your hands are on the probes.
        </p>
        <p>
          Elec-Mate is built from the ground up as an AI-native platform. Every feature — from
          certificates to calculators to quoting — is designed to work with AI, not just alongside
          it. The result is an app that does not just save you paper — it saves you hours every week
          on the tasks that do not generate revenue: data entry, report writing, pricing, and
          paperwork.
        </p>
      </>
    ),
  },
  {
    id: 'ai-board-scanning',
    heading: 'AI Board Scanning: Photograph, Extract, Auto-Fill',
    content: (
      <>
        <p>
          The AI Board Scanner is the feature that saves the most time on every inspection. Instead
          of manually recording every circuit in a consumer unit — device type, rating,
          manufacturer, circuit description — you photograph the board and the AI does the data
          entry.
        </p>
        <p>
          Point your phone camera at the consumer unit. Tap to capture. The AI analyses the image
          using computer vision trained on thousands of UK consumer units. Within seconds, it
          returns:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Device identification</strong> — MCBs, RCBOs, RCDs, isolators, SPDs, and
                AFDDs identified by their physical appearance, label text, and position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current ratings</strong> — the amp rating of each device read from the
                device face or label.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manufacturer recognition</strong> — Hager, Wylex, Schneider, MK, Contactum,
                Fusebox, and other major UK brands recognised by device appearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Board layout</strong> — the spatial arrangement of devices mapped from left
                to right, including identification of split-load configurations and RCD/RCBO
                groupings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The extracted data flows directly into your{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> certificate form. You
          review it, make any corrections, and move on to testing. What used to take 5-10 minutes of
          manual typing now takes under 30 seconds.
        </p>
      </>
    ),
  },
  {
    id: 'ai-defect-coding',
    heading: 'AI Defect Coding: Plain English to BS 7671',
    content: (
      <>
        <p>
          Classifying defects correctly is one of the most intellectually demanding parts of an
          EICR. You need to decide whether a condition is C1 (danger present), C2 (potentially
          dangerous), C3 (improvement recommended), or FI (further investigation required). Then you
          need to cite the specific BS 7671 regulation that the defect contravenes. Getting either
          part wrong undermines the credibility of your certificate.
        </p>
        <p>
          Elec-Mate's Defect Code AI makes this instant and accurate. Describe the defect in plain
          English:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <p className="text-white text-sm leading-relaxed italic">
            "No RCD protection on socket circuit in the kitchen"
          </p>
          <p className="text-white text-sm leading-relaxed mt-3">
            <strong>AI response:</strong> C2 — Potentially Dangerous. Regulation 411.3.3 (BS
            7671:2018+A3:2024). Additional protection by an RCD with a rated residual operating
            current not exceeding 30 mA shall be provided for socket-outlets with a rated current
            not exceeding 32 A.
          </p>
        </div>
        <p>
          The AI is trained on BS 7671:2018+A3:2024 and thousands of real-world EICR observations.
          It handles nuanced situations — for example, distinguishing between a C2 (no RCD
          protection on a kitchen socket circuit in a property wired under the 18th Edition) and a
          C3 (no RCD protection on a kitchen socket circuit in a property wired under the 16th
          Edition, where RCD protection was not required at the time of installation).
        </p>
        <SEOAppBridge
          title="Never second-guess a defect code again"
          description="Describe any defect in plain English. The AI assigns the correct C1, C2, C3, or FI code with the specific BS 7671 regulation reference. Flows directly into your EICR observations."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'ai-fault-diagnosis',
    heading: 'AI Fault Diagnosis: Symptoms to Probable Causes',
    content: (
      <>
        <p>
          Even experienced electricians encounter faults that are difficult to diagnose. An RCD that
          trips intermittently, a circuit breaker that holds under test but trips under load, a
          neutral-earth fault that appears and disappears — these are the situations where a second
          opinion is valuable.
        </p>
        <p>
          Elec-Mate's AI Fault Diagnosis tool acts as that second opinion. Describe the symptoms:
        </p>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-6 my-4">
          <p className="text-white text-sm leading-relaxed italic">
            "30 mA RCD trips after about 15 minutes when the immersion heater is running. Holds fine
            when the immersion is off. IR test gives 1.2 megohms when cold."
          </p>
          <p className="text-white text-sm leading-relaxed mt-3">
            <strong>AI response:</strong> Most probable cause: deteriorating immersion heater
            element. As the element heats up, the insulation resistance drops below the RCD
            threshold. The 1.2 megohm cold reading is borderline — a healthy element should read
            well above 2 megohms. Diagnostic steps: (1) Isolate the immersion heater circuit and
            test IR at the element terminals with the thermostat bypassed. (2) If possible, run the
            immersion for 10 minutes and re-test IR while hot — expect a significant drop if the
            element is failing. (3) Replace the element and re-test.
          </p>
        </div>
        <p>
          The AI draws on a library of real-world fault scenarios specific to UK installations. It
          is not a replacement for systematic testing — you still need to verify with your
          instruments — but it helps you consider causes you might not have thought of, especially
          for intermittent or unusual faults.
        </p>
      </>
    ),
  },
  {
    id: 'ai-cost-estimation',
    heading: 'AI Cost Estimation: Job Description to Itemised Quote',
    content: (
      <>
        <p>
          Pricing electrical work accurately is one of the biggest challenges in running a
          profitable business. Underquote and you lose money. Overquote and you lose the job. The
          traditional approach — mentally itemising materials, estimating labour, adding overheads
          and profit — is slow, inconsistent, and error-prone.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink> changes
          this completely. Describe the job:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <p className="text-white text-sm leading-relaxed italic">
            "Consumer unit upgrade in a 3-bed semi. Replace split-load board with 18th Edition
            compliant Hager board, dual RCD, SPD, 10 circuits. Like-for-like cable reuse."
          </p>
          <p className="text-white text-sm leading-relaxed mt-3">
            <strong>AI response:</strong> Itemised quote with specific materials (Hager VML955RK
            consumer unit, 10 x Hager MCBs with correct ratings for each circuit, 2 x Hager RCDs,
            Type 2 SPD, sundries), quantities, current trade prices, estimated labour hours (based
            on real installation timing data), and a total with your profit margin applied.
          </p>
        </div>
        <p>
          The pricing uses weekly-updated UK trade data from major wholesalers and labour timing
          benchmarks from real installations. The output converts to a professional PDF quote with a
          single tap. The result: consistent, accurate pricing in under a minute — on site, before
          you leave.
        </p>
      </>
    ),
  },
  {
    id: 'ai-rams-generation',
    heading: 'AI RAMS Generation: 60-Second Site-Specific Documents',
    content: (
      <>
        <p>
          Every commercial job and many domestic jobs require a risk assessment and method statement
          (RAMS). Generic RAMS templates are worse than useless — they are not site-specific, they
          do not address the actual hazards, and they will be rejected by any competent principal
          contractor.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-health-safety-agent">
            AI Health and Safety agent
          </SEOInternalLink>{' '}
          generates genuinely site-specific RAMS from a description of the work and location. The
          output covers all relevant hazards, control measures, PPE requirements, emergency
          procedures, and references to the Health and Safety at Work Act 1974, the Management of
          Health and Safety at Work Regulations 1999, the CDM Regulations 2015, and the Electricity
          at Work Regulations 1989.
        </p>
        <p>
          The <SEOInternalLink href="/tools/rams-generator">RAMS Generator</SEOInternalLink> exports
          the document as a professional PDF ready for submission. No more spending 30 minutes
          adapting a generic template for each job. No more RAMS that read like they were written
          for a different site. Describe the job, and the AI does the rest.
        </p>
        <SEOAppBridge
          title="Site-specific RAMS in under 60 seconds"
          description="Describe the work and location. The AI generates a complete risk assessment and method statement covering all relevant hazards, control measures, and legal references. Export as a professional PDF."
          icon={ShieldAlert}
        />
      </>
    ),
  },
  {
    id: 'ai-tutoring',
    heading: 'AI Tutoring: Study Smarter, Not Longer',
    content: (
      <>
        <p>
          Whether you are an apprentice studying for your Level 3 qualification, a qualified
          electrician preparing for the 2391 inspection and testing exam, or an experienced spark
          brushing up on the latest BS 7671 amendments, Elec-Mate's AI Tutor is like having a
          private tutor available 24/7 on your phone.
        </p>
        <p>
          Ask any question about BS 7671, inspection and testing procedures, installation practice,
          or exam topics:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <p className="text-white text-sm leading-relaxed italic">
            "What are the disconnection times for a TN-S system in BS 7671?"
          </p>
          <p className="text-white text-sm leading-relaxed mt-3">
            <strong>AI response:</strong> Table 41.1 of BS 7671:2018+A3:2024 specifies the maximum
            disconnection times for TN systems. For final circuits not exceeding 32 A: 0.4 seconds
            (230V). For distribution circuits and circuits exceeding 32 A: 5 seconds. These times
            apply where the protective measure is automatic disconnection of supply in accordance
            with Regulation 411.3.2. The disconnection time must be achieved at the most remote
            point of the circuit under earth fault conditions...
          </p>
        </div>
        <p>
          The AI answers with specific regulation references from BS 7671:2018+A3:2024, IET Guidance
          Notes, and exam-relevant content. Elec-Mate also includes structured{' '}
          <SEOInternalLink href="/study-centre/apprentice">training courses</SEOInternalLink> for
          Level 2, Level 3, and CPD topics that complement the AI Tutor with sequential learning
          modules, quizzes, and progress tracking.
        </p>
      </>
    ),
  },
  {
    id: 'voice-entry',
    heading: 'Voice Test Entry: Hands-Free Data Capture',
    content: (
      <>
        <p>
          When you are at the board with test leads in both hands, the last thing you want to do is
          put the probes down, pick up your phone, and type in each reading. Elec-Mate's Voice Test
          Entry solves this by letting you speak your results:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <p className="text-white text-sm leading-relaxed italic">
            "Ring circuit 1, R1 plus R2 0.32 ohms, Zs 0.89 ohms, insulation resistance 200 megohms,
            RCD trip time 18 milliseconds."
          </p>
        </div>
        <p>
          The AI transcribes your spoken results and populates the correct fields in the schedule of
          test results. It understands electrical terminology, unit formats, and the structure of
          the schedule. You keep your hands on the probes and your eyes on the board.
        </p>
        <p>
          For a typical 10-circuit domestic EICR, voice entry saves approximately 15-20 minutes
          compared to manual typing. Over a week of inspections, that is hours of productive time
          recovered.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalAppWithAIPage() {
  return (
    <ToolTemplate
      title="Electrical App with AI | Smart Tools for Electricians"
      description="Elec-Mate is the only UK electrical app with AI built into every workflow. AI board scanning, defect coding, fault diagnosis, cost estimation, RAMS generation, voice test entry, and AI tutoring — all in one app for electricians."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      toolPath="/tools/electrical-app-with-ai"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI-Powered Platform"
      badgeIcon={Brain}
      heroTitle={
        <>
          <span className="text-yellow-400">AI-Powered Electrical App</span> — Smart Tools for Every
          Part of Your Work
        </>
      }
      heroSubtitle="Not just digital certificates. Not just a chatbot. Elec-Mate embeds AI into every workflow — board scanning, defect coding, fault diagnosis, cost estimation, RAMS generation, and study. The AI does the data entry, the pricing, and the paperwork. You do the electrical work."
      heroFeaturePills={[
        { icon: Camera, label: 'AI Board Scanner' },
        { icon: Search, label: 'Defect Code AI' },
        { icon: PoundSterling, label: 'AI Cost Engineer' },
        { icon: ShieldAlert, label: 'AI RAMS' },
        { icon: Mic, label: 'Voice Entry' },
      ]}
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Features Built for Electricians"
      featuresSubheading="Every AI feature is integrated into the app workflows — board scanning flows into your EICR, cost estimates become professional quotes, and RAMS export as submission-ready PDFs. No separate tools, no copying and pasting."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Elec-Mate's AI Features"
      relatedPages={relatedPages}
      ctaHeading="Try Every AI Feature Free for 7 Days"
      ctaSubheading="5 AI agents, 12 AI tools, 8 certificate types, 70+ calculators, quoting, invoicing, and training — everything an electrician needs in one app. No card required to start."
    />
  );
}
