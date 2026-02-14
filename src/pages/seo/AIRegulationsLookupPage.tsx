import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Search,
  BookOpen,
  Brain,
  ShieldCheck,
  FileText,
  Lightbulb,
  GraduationCap,
  Wrench,
  ClipboardCheck,
  Bot,
  Zap,
  MessageSquare,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Regulations Lookup', href: '/tools/ai-regulations-lookup' },
];

const tocItems = [
  { id: 'what-is-regs-lookup', label: 'What Is AI Regulations Lookup?' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'practical-guidance', label: 'Practical Guidance' },
  { id: 'amendment-3', label: 'Amendment 3:2024 Coverage' },
  { id: 'on-site-use', label: 'Using It on Site' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Ask any question in plain English and get the specific BS 7671 regulation number, full text, and a practical explanation of what it means for your work.',
  'Covers the complete BS 7671:2018+A3:2024 including Amendment 3 (July 2024), the IET On-Site Guide, and all eight IET Guidance Notes.',
  'The AI distinguishes between mandatory requirements ("shall"), recommendations ("should"), and permitted alternatives ("may") — so you know what is required versus what is best practice.',
  'Works offline on site, so you can look up regulations in basements, plant rooms, and new-build sites with no signal.',
  'Cross-references related regulations automatically — when one regulation depends on or modifies another, the AI shows you the complete picture.',
];

const faqs = [
  {
    question: 'What does the AI Regulations Lookup cover?',
    answer:
      'The AI Regulations Lookup covers the complete text of BS 7671:2018+A3:2024 (the 18th Edition of the IET Wiring Regulations including all three amendments), the IET On-Site Guide (8th Edition), and all eight IET Guidance Notes: GN1 (Selection and Erection of Equipment), GN2 (Isolation and Switching), GN3 (Inspection and Testing, 9th Edition), GN4 (Protection Against Fire), GN5 (Protection Against Electric Shock), GN6 (Protection Against Overcurrent), GN7 (Special Locations), and GN8 (Earthing and Bonding). It also covers relevant British Standards referenced by BS 7671, such as BS EN 60898 (MCBs), BS EN 61008 (RCDs), and BS EN 61009 (RCBOs), and key legislation including the Electricity at Work Regulations 1989 and Part P of the Building Regulations.',
  },
  {
    question: 'How is this different from using the BS 7671 book index?',
    answer:
      'The BS 7671 book index is organised by topic and regulation number, which works well if you already know which regulation you are looking for. The AI Regulations Lookup lets you search by question — "Do I need RCD protection on a cooker circuit?" or "What is the maximum disconnection time for a 32A socket circuit?" — and returns the specific regulation(s) that answer your question. This is faster and more practical when you have a real-world question on site and do not know which regulation number to look up. The AI also cross-references related regulations automatically. For example, if you ask about RCD protection requirements, it will show you Regulation 411.3.3 (additional protection) and also reference Regulation 531.3 (selection and erection of RCDs), because they interact.',
  },
  {
    question: 'Does it include the tables and appendices from BS 7671?',
    answer:
      'Yes. The AI has full access to the tables in BS 7671, including the maximum earth fault loop impedance tables (Tables 41.2 to 41.6), the cable current-carrying capacity tables in Appendix 4, the voltage drop tables in Appendix 12, the correction factor tables (ambient temperature, grouping, thermal insulation), and the disconnection time tables. When you ask a question that requires reference to a table — for example, "What is the maximum Zs for a 32A Type B MCB?" — the AI returns the specific value from the correct table (in this case, 1.37 ohms from Table 41.3) along with an explanation of how to apply it, including the 80% rule for comparing measured values to tabulated maximums.',
  },
  {
    question: 'Can the AI explain the difference between related regulations?',
    answer:
      'Yes, and this is one of its most useful features. Many regulations in BS 7671 interact with or modify each other, and understanding these relationships is essential for correct application. For example, if you ask about protection against electric shock, the AI will explain the relationship between Chapter 41 (protection against electric shock), Section 411 (automatic disconnection of supply), Section 412 (double or reinforced insulation), Section 413 (electrical separation), and Section 414 (extra-low voltage). It shows how these different protective measures relate to each other and when each applies. Similarly, for cable sizing, it explains how the requirements of Chapter 52 (selection and erection of wiring systems) interact with the tables in Appendix 4 and the voltage drop limits in Appendix 12.',
  },
  {
    question: 'Does it cover Amendment 3:2024?',
    answer:
      'Yes. The AI includes the complete content of BS 7671:2018+A3:2024, which is Amendment 3 issued on 31 July 2024. The key addition in A3:2024 is Regulation 530.3.201, which introduces requirements for bidirectional and unidirectional protective devices. This is particularly relevant for installations incorporating battery energy storage systems (BESS), solar PV arrays with battery storage, and other installations where power can flow in both directions through protective devices. The AI explains what this new regulation requires, when it applies, and what it means in practice for the selection and installation of protective devices in modern installations with distributed generation and energy storage.',
  },
  {
    question: 'How quickly does the AI return an answer?',
    answer:
      'The AI typically returns a complete answer within 5-10 seconds. The response includes the specific regulation number(s), the full regulation text, a plain-English explanation, practical examples, and cross-references to related regulations and tables. This is significantly faster than looking up a regulation in the physical book, especially when you need to cross-reference multiple regulations or find a specific value in a table. The AI also remembers the context of your conversation, so you can ask follow-up questions without repeating the background information. For example, after asking about maximum Zs values, you can ask "What about Type C?" and the AI will know you are asking about Type C MCBs in the same context.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-tutor',
    title: 'AI Tutor for Electricians',
    description:
      'Study assistant for exam preparation. Generates practice questions and explains concepts step by step.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/tools/ai-fault-diagnosis',
    title: 'AI Fault Diagnosis',
    description:
      'Describe fault symptoms and get a ranked diagnosis with BS 7671 references and test sequences.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/tools/ai-installation-specialist',
    title: 'AI Installation Specialist',
    description:
      'Step-by-step installation guidance with regulation references for cable routing, containment, and testing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition of the IET Wiring Regulations including Amendment 3:2024.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI classification codes with BS 7671 regulation references for each observation.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements-uk',
    title: 'Earthing Arrangements UK',
    description:
      'TN-S, TN-C-S, and TT earthing systems explained with regulation references and practical guidance.',
    icon: Zap,
    category: 'Guide',
  },
];

const features = [
  {
    icon: Search,
    title: 'Plain-English Search',
    description:
      'Ask any question about electrical regulations in everyday language. No need to know the regulation number — the AI finds the relevant regulation for you.',
  },
  {
    icon: BookOpen,
    title: 'Full Regulation Text',
    description:
      'Every answer includes the complete regulation text from BS 7671:2018+A3:2024, so you have the authoritative source alongside the practical explanation.',
  },
  {
    icon: Lightbulb,
    title: 'Practical Interpretation',
    description:
      'The AI explains what each regulation means in practice, with real-world examples of when it applies and common mistakes to avoid.',
  },
  {
    icon: MessageSquare,
    title: 'Cross-Reference Engine',
    description:
      'When regulations interact or modify each other, the AI shows the complete picture. No more missing a related regulation that changes the meaning.',
  },
  {
    icon: ShieldCheck,
    title: 'Amendment 3:2024 Included',
    description:
      'Full coverage of the latest amendment including Regulation 530.3.201 for bidirectional and unidirectional protective devices.',
  },
  {
    icon: Bot,
    title: 'Works Offline on Site',
    description:
      'Look up regulations without signal. Works in basements, plant rooms, and new-build sites. Your own portable reference library.',
  },
];

const howToSteps = [
  {
    name: 'Ask your question in plain English',
    text: 'Type a question such as "Do I need RCD protection on a 40A cooker circuit?" or "What is the maximum cable length for a 20A radial on a TT system?" The AI understands natural language — no need to know the regulation number.',
  },
  {
    name: 'Read the regulation and explanation',
    text: 'The AI returns the specific regulation number, the full text from BS 7671, and a clear explanation of what it means in practice. Related regulations and table references are included automatically.',
  },
  {
    name: 'Ask follow-up questions',
    text: 'Drill deeper into the topic. Ask for more examples, clarification on a specific point, or how the regulation interacts with other requirements. The AI maintains context throughout the conversation.',
  },
  {
    name: 'Apply on site with confidence',
    text: 'Use the regulation reference on your inspection reports, certificates, and client communications. The AI gives you the exact regulation number for documentation purposes.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-regs-lookup',
    heading: 'What Is AI Regulations Lookup?',
    content: (
      <>
        <p>
          The AI Regulations Lookup is one of eight specialist Elec-AI agents in the Elec-Mate
          platform. It gives you instant access to the complete content of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          through a plain-English search interface. Instead of flipping through the book or
          searching an index, you ask a question and get the specific regulation, its full text, and
          a practical explanation.
        </p>
        <p>
          Every electrician has experienced the frustration of trying to find a specific regulation
          on site. The book is in the van, or at home, or you know the topic but not the regulation
          number. The AI Regulations Lookup solves this by putting the entire content of BS 7671,
          the IET On-Site Guide, and all eight IET Guidance Notes in your pocket, searchable by
          question rather than by index.
        </p>
        <p>
          The tool is particularly valuable for three use cases: looking up regulations during{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            inspection and testing work
          </SEOInternalLink>{' '}
          (to verify the correct regulation reference for an observation), answering client
          questions with authority (citing the specific regulation rather than saying "it is in the
          regs somewhere"), and settling on-site discussions with other trades or building control
          inspectors by producing the actual regulation text.
        </p>
        <p>
          The AI does not replace the BS 7671 book — it makes it accessible in a way that the book
          alone cannot. A book requires you to know where to look. The AI lets you describe what you
          need to know and finds the answer for you. It pairs particularly well with the{' '}
          <SEOInternalLink href="/tools/ai-tutor">AI Tutor</SEOInternalLink> when you want not just
          the regulation text but a full educational explanation.
        </p>
      </>
    ),
  },
  {
    id: 'how-it-works',
    heading: 'How the AI Regulations Lookup Works',
    content: (
      <>
        <p>
          You type a question in plain English. The AI analyses the question, identifies the
          relevant regulation(s), and returns a structured response that includes the regulation
          number, the full text, a plain-English explanation, practical examples, and cross-
          references to related regulations and tables.
        </p>
        <p>
          The AI understands natural language, so you can phrase your question however feels
          natural: "What size earth do I need for a 10mm cable?", "Is RCD protection needed for
          bathroom socket outlets?", "Maximum Zs for a 20A Type B MCB", or "Can I use twin and earth
          in a bathroom?" — all of these will return accurate, specific answers.
        </p>
        <p>
          When multiple regulations are relevant to your question, the AI returns all of them and
          explains how they interact. For example, if you ask about bathroom electrical
          requirements, the AI will reference Section 701 (special locations — bathrooms),
          Regulation 411.3.3 (additional RCD protection), the IP ratings required for equipment in
          different zones (Regulation 701.512.2), and the supplementary bonding requirements
          (Regulation 701.415.2). It explains which requirements are mandatory and which have been
          relaxed by recent amendments.
        </p>
        <SEOAppBridge
          title="Search BS 7671 in plain English"
          description="Open the Regulations Lookup agent and ask any question. Get the specific regulation number, full text, and practical guidance in under 10 seconds. Works offline on site."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'practical-guidance',
    heading: 'Practical Guidance, Not Just Regulation Text',
    content: (
      <>
        <p>
          Knowing what a regulation says is one thing — knowing how to apply it correctly is
          another. The AI Regulations Lookup provides both. For every regulation it returns, it
          includes practical guidance on how to apply it in real-world situations.
        </p>
        <p>
          This practical layer distinguishes the AI from simply reading the regulation text. BS 7671
          is necessarily written in precise, formal language that covers every possible situation.
          The AI interprets this for the specific context of your question. For example:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Question: "Do I need supplementary bonding in a bathroom?"
            </h4>
            <p className="text-white text-sm leading-relaxed">
              The AI explains that Regulation 701.415.2 permits the omission of supplementary
              bonding in a bathroom if all circuits in the location are protected by 30 mA RCD and
              all final circuits comply with the automatic disconnection times of Regulation
              411.3.2. It then explains what this means in practice: in most modern domestic
              installations with an RCBO or split-RCD consumer unit, supplementary bonding in the
              bathroom can be omitted. But in older installations without full RCD protection,
              supplementary bonding is still required.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Question: "Can I use 1.0mm cable for LED downlights?"
            </h4>
            <p className="text-white text-sm leading-relaxed">
              The AI references the cable sizing requirements of Chapter 52 and Appendix 4, but then
              adds practical guidance: while 1.0mm cable may be adequate for the current- carrying
              capacity requirement of a low-wattage LED lighting circuit, the electrician must also
              consider voltage drop (particularly on long runs), the{' '}
              <SEOInternalLink href="/calculators/earth-loop-impedance">
                earth fault loop impedance
              </SEOInternalLink>{' '}
              at the furthest point (which increases with smaller conductors and longer runs), and
              the adiabatic equation for fault protection. For many practical installations, 1.5mm
              cable is the better choice even when 1.0mm satisfies the basic current requirement.
            </p>
          </div>
        </div>
        <p>
          This practical guidance is informed by the IET On-Site Guide and Guidance Notes, which
          provide interpretation and application guidance for the formal regulations in BS 7671. The
          AI synthesises these sources to give you a complete, practical answer.
        </p>
      </>
    ),
  },
  {
    id: 'amendment-3',
    heading: 'Full Coverage of Amendment 3:2024',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 is the current edition of the IET Wiring Regulations. Amendment 3 was
          issued on 31 July 2024 and is a free PDF supplement to the existing 18th Edition book. The
          AI Regulations Lookup includes the complete content of Amendment 3, so you always get
          answers based on the current requirements.
        </p>
        <p>
          The key addition in Amendment 3 is <strong>Regulation 530.3.201</strong>, which introduces
          requirements for the selection and erection of bidirectional and unidirectional protective
          devices. This regulation is particularly relevant for installations incorporating:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV with battery storage</strong> — where power can flow in both
                directions through the consumer unit, from the grid to the loads and from the
                battery/PV to the grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery energy storage systems (BESS)</strong> — standalone or integrated
                battery systems that can supply power back to the installation or export to the
                grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle-to-grid (V2G) EV chargers</strong> — chargers that can draw power
                from the EV battery and feed it back to the installation or grid.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The AI explains not just what Regulation 530.3.201 says, but how to apply it in practice:
          which protective devices need to be bidirectional, how to verify that existing devices are
          suitable, and what to specify when designing new installations with energy storage. It
          also notes that Amendment 4 is expected in 2026, so the regulations will continue to
          evolve.
        </p>
      </>
    ),
  },
  {
    id: 'on-site-use',
    heading: 'Using the Regulations Lookup on Site',
    content: (
      <>
        <p>
          The AI Regulations Lookup works offline, making it a practical tool for everyday use on
          site. Common on-site use cases include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>During EICR inspections:</strong> Looking up the correct regulation
                reference for an{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  observation code
                </SEOInternalLink>{' '}
                to record on the report. "What regulation covers missing circuit identification at
                the distribution board?" — the AI returns Regulation 514.9.1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Answering client questions:</strong> A landlord asks "Why do I need to
                upgrade my consumer unit?" You look up the relevant regulation and can cite it
                directly: "Regulation 421.1.201 requires a consumer unit in a domestic premises to
                be constructed of non-combustible material."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discussions with building control:</strong> A building control inspector
                queries your installation. You can look up the specific regulation in seconds and
                show them the text on your phone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design decisions:</strong> Checking requirements for special locations
                (bathrooms, swimming pools, agricultural installations) before starting work. "What
                are the IP rating requirements for Zone 1 in a bathroom?" — the AI returns the
                answer with the specific regulation reference.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The AI maintains conversation context, so you can have a flowing discussion about a topic.
          Start with a broad question, then drill down into specifics. The AI remembers what you
          have already discussed and builds on it, saving you from repeating background information.
        </p>
        <SEOAppBridge
          title="Your portable BS 7671 reference"
          description="The AI Regulations Lookup puts the entire content of BS 7671:2018+A3:2024, the On-Site Guide, and all Guidance Notes in your pocket. Works offline. Search by question, not by index."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIRegulationsLookupPage() {
  return (
    <ToolTemplate
      title="AI Regulations Lookup | BS 7671 Search Tool"
      description="Search BS 7671:2018+A3:2024 in plain English. Ask any question and get the specific regulation number, full text, and practical guidance. Covers the complete 18th Edition with Amendment 3, IET On-Site Guide, and all Guidance Notes."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Regulations Agent"
      badgeIcon={Search}
      heroTitle={
        <>
          AI Regulations Lookup:{' '}
          <span className="text-yellow-400">Search BS 7671 in Plain English</span>
        </>
      }
      heroSubtitle="Ask any question about electrical regulations and get the specific BS 7671 regulation number, full text, and practical guidance. Covers the complete 18th Edition with Amendment 3:2024, the IET On-Site Guide, and all eight Guidance Notes."
      heroFeaturePills={[
        { icon: Search, label: 'Plain-English Search' },
        { icon: BookOpen, label: 'Full Regulation Text' },
        { icon: Lightbulb, label: 'Practical Guidance' },
        { icon: ShieldCheck, label: 'A3:2024 Included' },
      ]}
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Regulations Lookup Features"
      featuresSubheading="The fastest way to find any BS 7671 regulation. Search by question, get the answer with regulation number, full text, and practical interpretation."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Regulations Lookup"
      howToDescription="Four steps from question to regulation reference. Ask, read, follow up, and apply."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Regulations Lookup"
      relatedPages={relatedPages}
      ctaHeading="Search BS 7671 in Seconds"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Regulations Lookup. Ask any question, get the specific regulation with practical guidance. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-regulations-lookup"
    />
  );
}
