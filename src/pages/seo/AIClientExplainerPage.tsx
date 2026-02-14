import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MessageSquare,
  FileText,
  Brain,
  ShieldCheck,
  Users,
  Lightbulb,
  GraduationCap,
  Search,
  ClipboardCheck,
  Bot,
  Send,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Client Explainer', href: '/tools/ai-client-explainer' },
];

const tocItems = [
  { id: 'what-is-client-explainer', label: 'What Is the AI Client Explainer?' },
  { id: 'eicr-explanations', label: 'EICR Explanations for Clients' },
  { id: 'landlord-communication', label: 'Landlord Communication' },
  { id: 'homeowner-reports', label: 'Homeowner Reports' },
  { id: 'professional-communication', label: 'Professional Communication' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Turn technical EICR and EIC findings into plain-English explanations that homeowners and landlords can actually understand.',
  'The AI translates observation codes (C1, C2, C3, FI) into clear descriptions of what the problem is, why it matters, and what needs to be done.',
  'Generate professional client-facing summary letters that explain inspection results without the technical jargon.',
  'Helps landlords understand their legal obligations under the Electrical Safety Standards in the Private Rented Sector Regulations 2020.',
  'Reduces follow-up calls from confused clients by providing clear, comprehensive explanations with every report.',
];

const faqs = [
  {
    question: 'How does the AI Client Explainer work?',
    answer:
      'You provide the technical findings from your inspection — either by typing them in, selecting observation codes from a list, or importing them from an EICR completed in Elec-Mate — and the AI translates them into plain English. For example, if you recorded a C2 observation for "Lack of adequate main protective bonding to incoming water service," the AI generates a client-friendly explanation: "The main water pipe entering your property is not properly connected to the earthing system. This means that if an electrical fault developed involving the water pipework, it could become live and give someone an electric shock. This needs to be fixed as a matter of priority. The fix involves running a thick green-and-yellow cable from your main earth terminal to the water pipe near where it enters the building, secured with a proper clamp. This is a relatively quick job — typically less than an hour — and is essential for the safety of your household."',
  },
  {
    question: 'What types of reports can the AI explain to clients?',
    answer:
      'The AI Client Explainer can translate findings from any standard electrical inspection or certification document used in the UK: Electrical Installation Condition Reports (EICRs), Electrical Installation Certificates (EICs), Minor Works Certificates, Fire Alarm Certificates (BS 5839), Emergency Lighting Certificates (BS 5266), EV Charger Installation Certificates, and PAT Testing reports. For each document type, the AI understands the specific terminology, observation coding systems, and test results, and translates them into language a non-technical person can understand. It also explains the overall result (Satisfactory or Unsatisfactory for EICRs) and what it means for the client in terms of safety, legal obligations, and next steps.',
  },
  {
    question: 'Can the AI generate a letter to send with the EICR?',
    answer:
      'Yes. The AI can generate a professional covering letter that accompanies the EICR and summarises the findings in plain English. The letter includes: a brief explanation of what the EICR is and why it was carried out, a summary of the overall result (Satisfactory or Unsatisfactory), a plain-English explanation of each observation code recorded, the recommended actions for any C1, C2, or FI observations, a clear statement of the urgency (C1 defects have been made safe but need permanent repair, C2 defects need attention within 28 days), and your contact details for arranging remedial work. This letter is particularly valuable for landlords, who need to provide the EICR to tenants and may need to explain the findings to tenants who are not familiar with electrical terminology.',
  },
  {
    question: 'Does it help with landlord legal obligations?',
    answer:
      'Yes. When the client is a landlord, the AI includes specific information about their legal obligations under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (or the equivalent Scottish or Welsh regulations). This includes the requirement to complete remedial work within 28 days of an Unsatisfactory result, the obligation to provide the EICR to existing tenants within 28 days and to new tenants before they move in, the requirement to supply the report to the local authority within 7 days of a written request, and the penalties for non-compliance (up to £30,000 per breach). The AI presents these obligations clearly so the landlord understands exactly what they need to do and by when.',
  },
  {
    question: 'Can I customise the language and tone?',
    answer:
      'Yes. The AI Client Explainer offers different tone options depending on the audience. The "homeowner" tone is warm, reassuring, and focuses on safety and practical next steps. The "landlord" tone is professional and includes the legal obligations and deadlines. The "property manager" tone is concise and action-focused, listing what needs to be done, by when, and the cost implications. You can also adjust the level of detail — a brief summary for clients who just want the headline result, or a detailed explanation for clients who want to understand every observation. All versions avoid unnecessary jargon and technical language while remaining accurate.',
  },
  {
    question: 'Does this save time compared to explaining results verbally?',
    answer:
      'Yes, significantly. Many electricians spend 15-20 minutes at the end of an EICR visit explaining the results to the client, and then receive follow-up calls asking the same questions. The AI Client Explainer generates a comprehensive written explanation that the client can read and refer back to at their leisure. This saves time on site, reduces follow-up calls, and provides the client with a permanent record of what was found and what needs to be done. It also protects you professionally — a written plain-English explanation alongside the formal EICR demonstrates that you communicated your findings clearly, which is important if any dispute arises later about what the client was told.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to EICR requirements for UK landlords. Legal obligations, penalties, and remedial work deadlines.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI classification codes with real examples and guidance on correct classification.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/tools/ai-fault-diagnosis',
    title: 'AI Fault Diagnosis',
    description:
      'Describe fault symptoms and get a ranked diagnosis with test sequences. Identify the root cause of the defects you need to explain.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/tools/ai-regulations-lookup',
    title: 'AI Regulations Lookup',
    description:
      'Search BS 7671 in plain English. Find the regulation reference for any observation to include in your explanation.',
    icon: Search,
    category: 'Tool',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description:
      'Average EICR and remedial work prices by property type. Help clients understand what to expect.',
    icon: FileText,
    category: 'Guide',
  },
];

const features = [
  {
    icon: MessageSquare,
    title: 'Plain-English Translations',
    description:
      'Every observation code and technical finding translated into language a non-technical person can understand. No jargon, no acronyms.',
  },
  {
    icon: FileText,
    title: 'Professional Summary Letters',
    description:
      'Generate a covering letter for the EICR that explains the results, recommended actions, and urgency in clear, professional language.',
  },
  {
    icon: Users,
    title: 'Audience-Adapted Tone',
    description:
      'Different tones for homeowners, landlords, and property managers. Each audience gets the information they need in the language they understand.',
  },
  {
    icon: ShieldCheck,
    title: 'Legal Obligations Included',
    description:
      'For landlord clients, the AI includes the specific legal requirements under the 2020 Regulations — deadlines, penalties, and required actions.',
  },
  {
    icon: Send,
    title: 'Send with the Certificate',
    description:
      'Attach the plain-English explanation to the EICR and send both by email or WhatsApp from Elec-Mate. The client gets everything in one message.',
  },
  {
    icon: Bot,
    title: 'Works Offline on Site',
    description:
      'Generate client explanations without signal. Prepare the covering letter while on site and send it as soon as you have connectivity.',
  },
];

const howToSteps = [
  {
    name: 'Input the inspection findings',
    text: 'Type the observation codes and descriptions, select them from a list, or import them directly from an EICR completed in Elec-Mate. The AI needs to know the observation code (C1, C2, C3, or FI), the description, and the overall result.',
  },
  {
    name: 'Select the audience',
    text: 'Choose who the explanation is for — homeowner, landlord, or property manager. The AI adjusts the tone, level of detail, and included information accordingly.',
  },
  {
    name: 'Review the explanation',
    text: 'Read the generated plain-English explanation. Edit if needed — add specific details, adjust the tone, or include additional context about the property or the recommended remedial work.',
  },
  {
    name: 'Send with the certificate',
    text: 'Attach the explanation to the EICR certificate and send both to the client by email or WhatsApp. The client receives a professional package — the formal certificate and a clear explanation they can understand.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-client-explainer',
    heading: 'What Is the AI Client Explainer?',
    content: (
      <>
        <p>
          The AI Client Explainer is one of eight specialist Elec-AI agents in the Elec-Mate
          platform. Its purpose is simple but powerful: it translates the technical findings from
          your electrical inspections into plain English that your clients can actually understand.
        </p>
        <p>
          An <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is a technical
          document written by electricians for electricians. It uses standardised observation codes
          (C1, C2, C3, FI), references specific BS 7671 regulations, and records test results in
          milliohms, megohms, and milliseconds. For a qualified electrician, this information is
          clear and precise. For a homeowner or landlord, it is often impenetrable.
        </p>
        <p>
          The result is a communication gap that causes problems for everyone. Clients do not
          understand what the report says, so they do not appreciate the urgency of remedial work.
          Landlords do not understand their legal obligations, so they delay action and risk
          penalties. Homeowners do not understand the difference between a C2 (Potentially
          Dangerous) and a C3 (Improvement Recommended), so they either panic about everything or
          ignore everything.
        </p>
        <p>
          The AI Client Explainer bridges this gap. It takes the technical findings from your report
          and translates each one into a clear explanation: what the problem is, why it matters,
          what needs to be done, and how urgent it is. The client gets the information they need to
          make informed decisions about their property, and you get fewer confused phone calls
          asking "What does C2 mean?"
        </p>
      </>
    ),
  },
  {
    id: 'eicr-explanations',
    heading: 'EICR Findings Translated for Clients',
    content: (
      <>
        <p>
          The most common use of the AI Client Explainer is translating{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation codes
          </SEOInternalLink>{' '}
          into plain English. Here is how the AI translates typical observations:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-2">C1 — Danger Present</h4>
            <p className="text-white text-sm leading-relaxed mb-2">
              <strong>Technical:</strong> "Exposed live conductors at light fitting in bedroom 2. No
              enclosure present. Regulation 416.2.1."
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>Plain English:</strong> "In Bedroom 2, there are bare electrical wires at a
              light fitting that are not properly covered. These wires are live and could give
              someone a serious electric shock if touched. This is classified as 'Danger Present' —
              the most urgent category. The electrician has made this safe during the inspection by
              isolating the circuit, but a permanent repair is needed as soon as possible. The fix
              involves installing a proper light fitting or enclosure to cover the bare wires. This
              is a straightforward repair."
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">C2 — Potentially Dangerous</h4>
            <p className="text-white text-sm leading-relaxed mb-2">
              <strong>Technical:</strong> "Lack of RCD protection for socket outlets. Regulation
              411.3.3."
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>Plain English:</strong> "Your socket outlets do not have RCD (residual current
              device) protection. An RCD is a safety device that cuts the power almost instantly if
              it detects a fault — for example, if you accidentally cut through a cable with a lawn
              mower, or if water gets into an appliance. Without RCD protection, these faults could
              cause a serious or fatal electric shock. This is classified as 'Potentially Dangerous'
              and the regulations require it to be fixed within 28 days. The usual solution is to
              upgrade the consumer unit (fuse box) to one with RCD protection for all the socket
              circuits."
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">C3 — Improvement Recommended</h4>
            <p className="text-white text-sm leading-relaxed mb-2">
              <strong>Technical:</strong> "Consumer unit does not comply with Regulation 421.1.201
              (non-combustible enclosure)."
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>Plain English:</strong> "Your fuse box (consumer unit) is made of plastic.
              Current regulations require consumer units in domestic properties to be made of metal,
              because a metal enclosure provides better fire protection. Your plastic consumer unit
              is not dangerous in itself, but it does not meet the latest standard. This is
              classified as 'Improvement Recommended' — it is not something that needs urgent
              action, but it is worth considering when you next have electrical work done. If you
              are planning any changes to your consumer unit, the new one should be a metal
              enclosure."
            </p>
          </div>
        </div>
        <p>
          These translations maintain technical accuracy while making the information accessible.
          The client understands both the problem and the urgency, which leads to faster approval of
          remedial work and better client relationships.
        </p>
      </>
    ),
  },
  {
    id: 'landlord-communication',
    heading: 'Communication Tailored for Landlords',
    content: (
      <>
        <p>
          When the client is a{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord</SEOInternalLink>, the AI
          Client Explainer includes additional information about legal obligations. This is not
          generic advice — it is specific to the findings on their report and the deadlines that
          apply to their situation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory result:</strong> The AI explains that the landlord must
                arrange remedial work within 28 days, obtain written confirmation that the work has
                been done satisfactorily, and provide this confirmation to the tenant and (if
                requested) the local authority within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties:</strong> The AI notes that non-compliance can result in civil
                penalties of up to £30,000 per breach, and that the local authority can arrange the
                inspection and remedial work themselves at the landlord's expense.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 notice:</strong> The AI explains that a landlord cannot serve a
                valid Section 21 eviction notice if they have not provided the tenant with a valid
                EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification:</strong> The AI reminds the landlord to provide a copy
                of the EICR to existing tenants within 28 days and to new tenants before they move
                in.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This information helps landlords understand their obligations without you having to
          explain the legislation verbally. It also protects you professionally — you have provided
          the landlord with clear written guidance about their legal duties, which demonstrates that
          you communicated your findings and the required actions clearly.
        </p>
        <SEOAppBridge
          title="Send landlords a clear explanation with every EICR"
          description="Generate a plain-English summary with legal obligations, attach it to the EICR, and send both by email or WhatsApp. The landlord knows exactly what to do and by when."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'homeowner-reports',
    heading: 'Homeowner-Friendly Reports',
    content: (
      <>
        <p>
          Homeowners have different needs from landlords. They are not driven by legal deadlines —
          they are driven by understanding whether their home is safe and what (if anything) they
          need to spend money on. The AI Client Explainer adapts its tone and content accordingly.
        </p>
        <p>
          For homeowners, the AI focuses on three things: safety (is the installation safe to use?),
          priority (what needs doing first, and what can wait?), and cost context (rough indication
          of what the remedial work involves so the homeowner can budget, which pairs well with the{' '}
          <SEOInternalLink href="/guides/eicr-cost-uk">EICR cost guide</SEOInternalLink>
          ). It avoids creating unnecessary alarm — a C3 observation is explained as an improvement
          recommendation, not an emergency — while being clear about genuine safety issues.
        </p>
        <p>
          The AI also explains the overall condition of the installation in context. If the EICR is
          Satisfactory with a few C3 observations, the AI explains that the installation is safe for
          continued use but there are some areas where it does not meet the latest standards. If the
          EICR is Unsatisfactory, the AI explains exactly which defects need attention and provides
          a clear prioritisation based on the observation codes.
        </p>
        <p>
          This approach builds trust. The homeowner sees that you are not trying to upsell
          unnecessary work (because the AI distinguishes clearly between must-do and nice-to-do),
          but that you are genuinely concerned about their safety where real issues exist. This
          leads to better conversion on remedial work quotes because the client understands the
          value of what you are proposing.
        </p>
      </>
    ),
  },
  {
    id: 'professional-communication',
    heading: 'Better Communication, Better Business',
    content: (
      <>
        <p>
          Clear client communication is not just about professionalism — it is about business
          results. Electricians who explain their findings clearly get remedial work approved
          faster, receive fewer follow-up calls, get more referrals, and build stronger long-term
          client relationships.
        </p>
        <p>
          The AI Client Explainer supports this by providing a consistent, professional level of
          communication for every job. Whether you are doing one EICR a week or five a day, every
          client receives the same quality of explanation. This consistency is particularly valuable
          for growing businesses with multiple electricians — the AI ensures that all client
          communication meets the same standard, regardless of which team member carried out the
          inspection.
        </p>
        <p>
          The written explanation also serves as a permanent record. If a client calls back weeks
          later asking about a specific observation, you can refer them to the explanation that was
          sent with the report. If a landlord fails to carry out remedial work and the local
          authority gets involved, you have a written record showing that you explained the findings
          and the obligations clearly. This protects both you and the client.
        </p>
        <p>
          Many Elec-Mate users report that using the AI Client Explainer has directly increased
          their remedial work conversion rate. When clients understand what needs to be done and
          why, they are far more likely to approve the quote for{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">remedial work</SEOInternalLink> than when
          they receive a technical report they cannot interpret.
        </p>
        <SEOAppBridge
          title="Turn every EICR into a remedial work opportunity"
          description="The AI Client Explainer helps clients understand what needs fixing. When they understand, they approve the work. Send the explanation and the remedial quote together."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIClientExplainerPage() {
  return (
    <ToolTemplate
      title="AI Client Explainer | Plain English Reports"
      description="Turn technical EICR and EIC findings into plain-English explanations for homeowners and landlords. Translate observation codes, generate client-facing summary letters, and include landlord legal obligations. Built for UK electricians."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Communication Agent"
      badgeIcon={MessageSquare}
      heroTitle={
        <>
          AI Client Explainer:{' '}
          <span className="text-yellow-400">Technical Findings in Plain English</span>
        </>
      }
      heroSubtitle="Turn EICR observation codes and technical findings into clear, plain-English explanations that homeowners and landlords can actually understand. Generate professional summary letters, include legal obligations for landlords, and send everything with the certificate."
      heroFeaturePills={[
        { icon: MessageSquare, label: 'Plain English' },
        { icon: Users, label: 'Audience-Adapted' },
        { icon: ShieldCheck, label: 'Legal Obligations' },
        { icon: Send, label: 'Send with Certificate' },
      ]}
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Client Explainer Features"
      featuresSubheading="Bridge the communication gap between technical inspection reports and client understanding. Better explanations mean faster remedial work approval."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Client Explainer"
      howToDescription="Four steps from technical findings to a plain-English explanation ready to send with the certificate."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the AI Client Explainer"
      relatedPages={relatedPages}
      ctaHeading="Explain Every Report in Plain English"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Client Explainer. Turn technical findings into clear client communications. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-client-explainer"
    />
  );
}
