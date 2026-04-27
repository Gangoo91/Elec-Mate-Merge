/**
 * Module 5 · Section 4 · Subsection 3 — GDPR and DPA: customer data, photos, retention
 * SUPPLEMENTARY content — extends LO2 of Unit 210 but is not directly mapped to a 210 AC.
 * Builds the data-handling layer that the 210 syllabus pre-dates.
 *
 * Frame: every electrician handles customer personal data daily — names,
 * addresses, postcodes, photos of property. UK GDPR and the Data Protection
 * Act 2018 govern how that data is collected, stored, shared and deleted.
 * The ICO can fine seriously, but the bigger day-to-day risk is reputational
 * and contractual.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'GDPR and DPA — customer data, photos, retention | Level 2 Module 5.4.3 | Elec-Mate';
const DESCRIPTION =
  'UK GDPR and Data Protection Act 2018 for the trades — lawful bases, photos of customer property, retention periods, the social-media trap and what the ICO can actually do.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s4-sub3-portfolio-photo',
    question:
      "You take a photo of a particularly clean kitchen rewire because you want to use it as a portfolio entry for your AM2 prep and possibly post it to your trade Instagram in a year or two. Is this OK without saying anything to the customer?",
    options: [
      "Yes — it's your work, you can show it.",
      "No. Photos of customer property are personal data under UK GDPR (they relate to an identifiable person — the property owner — through context). To use them for portfolio or marketing you need either explicit customer consent OR a legitimate-interest basis with a clear notice in the firm's privacy notice that covers portfolio use, plus you should crop out anything identifying. Best practice: ask the customer at the point of taking the photo and get a quick written agreement (text, signed slip).",
      "Yes if you don't post for over a year.",
      "Yes, but only on personal social media not work.",
    ],
    correctIndex: 1,
    explanation:
      "Photos of identifiable property (which usually means the kitchen, the room, the front of the house) are personal data because they relate to an identifiable person — the homeowner — through context (you know whose house it was). UK GDPR requires a lawful basis to process; for portfolio/marketing the most realistic options are consent (explicit, recorded) or legitimate interest with a clear privacy notice and the customer's right to object. The duty applies whether you post in a week or a year, on personal or work accounts. Asking at the time of taking the photo is the cleanest approach.",
  },
  {
    id: 'mod5-s4-sub3-whatsapp-mate',
    question:
      "Mid-job you find a particularly bad existing installation. You WhatsApp a photo to your mate at another firm with caption 'look at this nightmare in this customer's house'. Have you done anything wrong?",
    options: [
      "No — it's a private message, not a public post.",
      "Yes. You've shared a customer's personal data (a photo of their property identified by context) with someone outside your firm without a lawful basis. That's a UK GDPR breach. It's also almost certainly a breach of your firm's confidentiality and social-media policy. Private channel doesn't matter — the duty travels with the data. The fix: photos for your supervisor and the firm's internal systems only; if you want to discuss bad installs with mates at other firms, do it in general terms with no identifying info or photos.",
      "Yes, but only if you said the address.",
      "No — WhatsApp is end-to-end encrypted so it doesn't count.",
    ],
    correctIndex: 1,
    explanation:
      "UK GDPR doesn't care about the channel — text, WhatsApp, email, in person, on TikTok. Sharing identifiable customer data with a third party (your mate at another firm) outside the original purpose (you were sent there to wire the kitchen, not to provide a horror tour) needs a lawful basis. There isn't one for 'showing your mates'. Private chat doesn't insulate you because the customer has the same right to complain to the ICO regardless of the channel, and the ICO has issued enforcement notices for exactly this kind of casual sharing.",
  },
  {
    id: 'mod5-s4-sub3-retention',
    question:
      "How long should the firm retain electrical certificates (EICs, EICRs) for a typical domestic install, and why?",
    options: [
      "12 months — long enough for the warranty.",
      "At least 6 years. The Limitation Act 1980 sets the standard limitation period for civil claims (negligence, breach of contract) at 6 years from the date of the breach. Most contractor schemes (NICEIC, NAPIT, ELECSA) require 6 years minimum as a condition of registration. Many firms retain longer (e.g. lifetime of install) for evidence and re-issue purposes. Personal data within the cert is retained on the same basis under UK GDPR Article 5(1)(e) (storage limitation) — kept no longer than necessary for the purpose.",
      "Forever — there's no upper limit.",
      "30 days — that's the GDPR rule.",
    ],
    correctIndex: 1,
    explanation:
      "6 years is the practical retention floor — set by the Limitation Act 1980 (defending civil claims) and required by the contractor schemes. UK GDPR Article 5(1)(e) requires personal data to be kept no longer than necessary; the 6-year window is justified because it's the period during which the firm might reasonably need the cert to defend a claim or re-issue to the customer. Some firms go longer (10 years for warranty defence, indefinite for the install record on the property) — the key is to have a written retention policy and apply it consistently.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What does UK GDPR mean by 'personal data'?",
    options: [
      "Only names and addresses.",
      "Any information relating to an identified or identifiable natural person — including names, addresses, phone numbers, email addresses, photos, video, location data, IP addresses, and information that, while not identifying on its own, becomes identifying when combined with other data the controller holds.",
      "Only data the customer typed into a form.",
      "Only health and financial data.",
    ],
    correctAnswer: 1,
    explanation:
      "UK GDPR Article 4(1) defines personal data broadly. The 'identifiable' part is critical — a photo of a kitchen isn't personal data on its own, but combined with the customer's address (which the firm has) it becomes identifying because you know whose kitchen it is. The same applies to job sheets, before-and-after photos and as-installed drawings. The breadth of the definition is why almost everything an electrician handles for a customer is in scope.",
  },
  {
    id: 2,
    question:
      "Under UK GDPR, what are the SIX lawful bases for processing personal data?",
    options: [
      "There's only one — consent.",
      "Consent, contract, legal obligation, vital interests, public task, legitimate interests. For most trade work the relevant bases are: contract (we need this data to deliver the work) and legitimate interests (we hold the customer's details to honour warranty and respond to follow-up).",
      "Consent and payment.",
      "Whatever the customer agrees verbally.",
    ],
    correctAnswer: 1,
    explanation:
      "UK GDPR Article 6 sets the six lawful bases. The firm has to identify which one applies BEFORE processing — and document that in its privacy notice. For electrical contracting, contract (Article 6(1)(b)) covers the work itself; legitimate interests (Article 6(1)(f)) covers things like warranty record-keeping and marketing follow-up. Consent (Article 6(1)(a)) is typically reserved for things the customer can genuinely opt out of — marketing emails, portfolio photo use.",
  },
  {
    id: 3,
    question:
      "Who in the data-protection chain is the firm, and who is the customer?",
    options: [
      "The customer is the controller, the firm is the processor.",
      "The firm (the contracting business) is the data CONTROLLER — it decides what data to collect, why, and how to process it. The customer is the DATA SUBJECT — the person to whom the data relates. The processor would be a third party processing data on the firm's behalf (e.g. the cloud-hosted CRM, the accounting software, an offshore admin team).",
      "Both are processors.",
      "Neither — only the ICO is involved.",
    ],
    correctAnswer: 1,
    explanation:
      "UK GDPR Article 4 defines the roles. Controller = decides the why and how; processor = acts on the controller's instructions; data subject = the individual. For an electrical firm, you're the controller of the customer's personal data. Most cloud CRMs (Joblogic, Commusoft, Service M8) are processors — and you should have a Data Processing Agreement (DPA) with them. Customers are data subjects and have rights — access, rectification, erasure, restriction, portability, objection.",
  },
  {
    id: 4,
    question:
      "What's the FIRST principle of UK GDPR Article 5 (the 'principles relating to processing')?",
    options: [
      "Free at the point of use.",
      "Lawfulness, fairness and transparency — personal data must be processed lawfully (one of the six bases), fairly (in a way the data subject would reasonably expect), and transparently (the data subject knows what's happening with their data via a privacy notice).",
      "Profitability for the controller.",
      "Speed of processing.",
    ],
    correctAnswer: 1,
    explanation:
      "UK GDPR Article 5(1)(a) — lawfulness, fairness and transparency. The other principles in Article 5 are: purpose limitation (collected for specified purposes), data minimisation (only what's necessary), accuracy, storage limitation (kept no longer than needed), integrity and confidentiality (held securely), and accountability (the controller can demonstrate compliance). The principles are the high-level ground rules — every other GDPR requirement flows from them.",
  },
  {
    id: 5,
    question:
      "If you take a photo of a customer's property and want to use it for the firm's marketing (website, social media), what's the cleanest lawful basis to rely on?",
    options: [
      "Legal obligation.",
      "Explicit consent, given freely, in writing, in advance — separate from the consent to do the work. The customer must be able to refuse without it affecting the work, and to withdraw consent later. Legitimate interest is sometimes used but is harder to defend for marketing because the customer's reasonable expectation is that you photograph for the job, not for advertising.",
      "Vital interest.",
      "Public task.",
    ],
    correctAnswer: 1,
    explanation:
      "ICO guidance is clear that consent for marketing should be specific, informed, freely given and unambiguous (Article 4(11)). It must be separable from other agreements (you can't bundle 'we'll do the work' with 'and you consent to us posting photos'). Many firms use a short marketing-consent slip at the end of the job — the customer ticks yes/no and signs. Withdrawal must be as easy as giving consent. Legitimate interest CAN work but only with a documented Legitimate Interests Assessment (LIA) and a clear notice to the customer.",
  },
  {
    id: 6,
    question:
      "How long should you keep an Electrical Installation Certificate, and why?",
    options: [
      "30 days — that's the GDPR rule.",
      "At least 6 years — set by the Limitation Act 1980 for defending civil claims, and required by most contractor schemes (NICEIC, NAPIT, ELECSA) as a condition of registration. UK GDPR Article 5(1)(e) (storage limitation) is satisfied because there's a clear, justifiable reason for the retention period.",
      "1 year — the warranty period.",
      "Forever — no rule applies.",
    ],
    correctAnswer: 1,
    explanation:
      "Retention isn't governed by GDPR alone — GDPR says 'no longer than necessary', and it's other laws and contractor scheme rules that set what 'necessary' means. The Limitation Act 1980 gives 6 years as the standard limitation for negligence and breach of contract. The contractor schemes mirror this. Many firms keep certs for the lifetime of the property as a service to the customer (and for re-issue revenue). The point is to have a written retention policy that explains the period and apply it consistently.",
  },
  {
    id: 7,
    question:
      "What's the ICO and what's the maximum fine it can impose for a serious GDPR breach?",
    options: [
      "The Insurance Compliance Office; £500.",
      "The Information Commissioner's Office — the UK's independent regulator for data protection. The maximum fine for the most serious breaches is the higher of £17.5 million OR 4% of the firm's global annual turnover. Lower-tier breaches max out at £8.7 million OR 2% of turnover. In practice most fines on small businesses are far lower, but reputational damage (named-and-shamed in ICO enforcement notices) is often more painful than the fine itself.",
      "The Internal Compliance Officer; £100.",
      "There is no regulator.",
    ],
    correctAnswer: 1,
    explanation:
      "ICO is the UK regulator. The two-tier fine structure mirrors EU GDPR — £8.7m / 2% for procedural breaches, £17.5m / 4% for breaches of the principles or data-subject rights. Small firms rarely see fines anywhere near these caps, but enforcement notices are public, are searchable on the ICO website, and routinely appear in trade press. Reputational damage to a small contractor can be more material than the fine itself.",
  },
  {
    id: 8,
    question:
      "A customer asks 'what data do you hold about me, and can I have a copy?' What right are they exercising and what's the timeframe to respond?",
    options: [
      "No such right exists.",
      "The right of access under UK GDPR Article 15 (a 'subject access request' or SAR). The firm has one calendar month to respond, free of charge in most cases. The response must include the personal data being processed, the purposes, the categories, the recipients, the retention period, and the source of the data if not from the data subject.",
      "Right to erasure; 7 days.",
      "Right to rectification; 24 hours.",
    ],
    correctAnswer: 1,
    explanation:
      "UK GDPR Article 15 gives every data subject the right to access their personal data (commonly called a SAR). One month to respond, with a possible two-month extension for complex requests. Free of charge unless manifestly unfounded or excessive. For a small firm a SAR usually means: cert(s), job sheet(s), correspondence, contact details, marketing consent records. Most modern CRMs have an export-customer-data function that handles this. Failing to respond is a reportable breach.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question:
      "I'm just an apprentice — does GDPR really apply to me, or only to the firm?",
    answer:
      "GDPR applies to the firm (as data controller), but your actions as an employee can put the firm in breach. The duty to handle data carefully is part of your employment contract and your firm's confidentiality and IT policies. In practice this means: don't share customer data with anyone outside the firm without a clear lawful basis; don't post customer property on personal social media; don't email customer details from your work email to your personal email; report any data incident (lost phone, accidental email to wrong recipient) to your supervisor immediately so the firm can decide whether it's a reportable breach.",
  },
  {
    question:
      "What's a 'data breach' and what should I do if I think I've caused one?",
    answer:
      "A data breach is any unauthorised access, loss, destruction or disclosure of personal data — losing a phone with customer data on it, emailing a cert to the wrong customer, posting a customer's photo without consent, having a USB stick stolen from the van. The firm has 72 hours from awareness to report a notifiable breach to the ICO under UK GDPR Article 33. Your job: tell your supervisor IMMEDIATELY when you notice it. Don't try to fix it yourself or hope it goes away. The 72-hour clock starts from 'awareness' — the firm needs the time to investigate and decide.",
  },
  {
    question:
      "Are photos of customer property really 'personal data'?",
    answer:
      "Usually yes, in context. The photo on its own (an empty kitchen) might not identify anyone, but combined with the customer's address (which the firm holds), it identifies the homeowner. UK GDPR Article 4(1) treats data as personal if it relates to an 'identifiable' person — and identifiability includes 'reasonably likely to be used' by the controller or another. Distinctive features (kitchen layout, view through the window, named door numbers) accelerate the identifiability. Best practice: treat any photo taken on a customer's property as personal data and apply the full GDPR rules.",
  },
  {
    question:
      "Can I use customer photos for my AM2 portfolio?",
    answer:
      "With explicit consent, yes. For AM2 portfolios the photo is being used for an educational purpose — your assessment — and the customer should be told that's how it'll be used and given a real chance to refuse. Many apprentices ask the customer at the start of the job and get a quick written agreement (text, signed slip). Crop out identifying features (postcode, distinctive view), don't include the address, and store the portfolio securely. If the customer refuses, find another job to photograph.",
  },
  {
    question:
      "What if the customer is fine with me posting photos to social media — can we just take them at their word?",
    answer:
      "Get it in writing. Verbal consent is technically valid under UK GDPR but it's almost impossible to prove later. A short written statement (text message, signed slip, app screen with 'I agree' tick and timestamp) is the standard. The consent should specify what they're agreeing to (which platforms, with or without identifying info, for how long, with the right to withdraw). 'They said it was fine' won't survive an ICO complaint or a future change of mind.",
  },
  {
    question:
      "Is sending customer details by personal WhatsApp ever OK?",
    answer:
      "Avoid it. Personal WhatsApp typically isn't covered by the firm's data-processing agreements with the platforms it uses, the messages don't sit on the firm's systems for retention/deletion control, and the firm has no audit trail. If you need to share customer details with a colleague, use the firm's official channels — work email, the firm's CRM, the firm's WhatsApp Business account if it has one, or a phone call. If you've already used personal WhatsApp for customer data, raise it with your supervisor — many firms have a process to migrate those messages onto official systems and delete from personal devices.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 3"
            title="GDPR and DPA — customer data, photos, retention"
            description="Supplementary to Unit 210 — the data-protection layer that didn't exist when the syllabus was written but is unavoidable on every job today."
            tone="emerald"
          />

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4 text-[13px] text-amber-200/90 leading-relaxed">
            <p className="font-semibold text-amber-100 mb-1">Supplementary content</p>
            <p>
              This Sub extends LO2 of Unit 210 (Information sources) but is not directly
              mapped to a specific 210 assessment criterion. It builds the data-protection
              layer that the 210 syllabus pre-dates. Knowledge here supports the AC 2.3 / 2.4
              material in Subs 4.1 and 4.2 and is examinable under modern customer-handling
              standards (NICEIC code of practice, NAPIT scheme rules).
            </p>
          </div>

          <TLDR
            points={[
              "Every electrician handles customer personal data daily — names, addresses, photos of property, payment details. UK GDPR and the Data Protection Act 2018 govern how that data is handled. Your firm is the data controller; you act on its behalf.",
              "Six lawful bases for processing exist (consent, contract, legal obligation, vital interests, public task, legitimate interests). For most trade work it's contract (to deliver the work) and legitimate interests (warranty, follow-up). Marketing and portfolio use need explicit consent.",
              "Retention is set by the Limitation Act 1980 (6 years for civil claims) and contractor scheme rules (also 6 years minimum). Personal social media isn't a safe place for customer photos — the duty travels with the data, not the platform.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define personal data under UK GDPR Article 4(1) and explain why photos of customer property are usually in scope.",
              "Identify the six lawful bases for processing under UK GDPR Article 6 and recognise which apply to typical trade activities (contract, legitimate interests, consent for marketing).",
              "State the data-controller / data-processor / data-subject roles and identify them in a typical electrical contracting context.",
              "Explain the retention rule under UK GDPR Article 5(1)(e) and how it interacts with the Limitation Act 1980 and contractor scheme requirements (6 years minimum for certs).",
              "Recognise the social-media trap — sharing customer property photos on personal channels is a GDPR breach and a confidentiality breach simultaneously.",
              "Apply the data-incident reporting flow — anything that looks like a breach goes to your supervisor immediately so the firm has time within the 72-hour ICO notification window.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What GDPR actually is and why it matters in the trades</ContentEyebrow>

          <ConceptBlock
            title="UK GDPR + DPA 2018 — the legal framework, briefly"
            plainEnglish="UK GDPR is the UK's version of the EU General Data Protection Regulation, retained after Brexit. It's supplemented by the Data Protection Act 2018, which adds UK-specific provisions (e.g. exemptions, the Information Commissioner's role, criminal offences for serious breaches). Together they govern how organisations collect, use, store and share personal data. The regulator is the Information Commissioner's Office (ICO)."
            onSite="For a small electrical contractor the practical reality is: every job involves customer personal data (name, address, phone, email, sometimes payment card, often photos of property). The firm is responsible for handling it lawfully. Most of the day-to-day discipline comes through field-service apps, the firm's privacy notice and the staff handbook — but as the operative, you're the person actually capturing and sometimes sharing the data."
          >
            <p>
              The headline rules in plain English:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Only collect data you actually need (data minimisation).
              </li>
              <li>
                Tell the customer why you're collecting it (transparency, via privacy notice).
              </li>
              <li>
                Keep it secure — encrypted devices, access controls, locked vehicles.
              </li>
              <li>
                Keep it only as long as you need it (retention policy with a defensible
                period).
              </li>
              <li>
                Honour the customer's rights — access, rectification, erasure, restriction,
                portability, objection.
              </li>
              <li>
                Report any breach to the firm's data controller / supervisor immediately so
                the 72-hour ICO clock can be managed.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The six lawful bases — which one applies to you?</ContentEyebrow>

          <ConceptBlock
            title="Six lawful bases — pick the right one for the activity"
            plainEnglish="UK GDPR Article 6 sets out six lawful bases for processing personal data. The firm has to identify the right one for each activity BEFORE the processing happens, and document it in the privacy notice. For most trade activities the relevant bases are contract (to deliver the work) and legitimate interests (to honour warranty, do follow-ups). Consent is reserved for things the customer can genuinely opt in or out of — marketing emails, portfolio photo use."
            onSite="The lawful basis isn't usually a daily concern for the operative — the firm's privacy notice and CRM workflows have already worked it out. What you DO need to know is: anything outside the normal job scope (taking a photo for marketing, sharing a customer's details with a third party, calling them for upsell) needs a basis that's been thought through, normally meaning explicit consent from the customer."
          >
            <p>
              The six bases (UK GDPR Article 6(1)):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) Consent</strong> — the customer has given clear consent for the
                specific purpose. Used for marketing emails, portfolio photo use, anything
                the customer can genuinely opt in or out of.
              </li>
              <li>
                <strong>(b) Contract</strong> — processing is necessary to perform a contract
                with the customer. Covers the core work — name, address, payment, certs.
              </li>
              <li>
                <strong>(c) Legal obligation</strong> — processing is required to comply
                with a legal duty (e.g. retaining tax records under HMRC rules).
              </li>
              <li>
                <strong>(d) Vital interests</strong> — processing is necessary to protect
                someone's life. Rare for trades.
              </li>
              <li>
                <strong>(e) Public task</strong> — for public-sector functions. Doesn't
                apply to private contractors.
              </li>
              <li>
                <strong>(f) Legitimate interests</strong> — processing is necessary for the
                legitimate interests of the firm or a third party, balanced against the
                customer's rights. Common for warranty record-keeping, fraud prevention,
                some forms of customer follow-up.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The roles — controller, processor, data subject"
            plainEnglish="UK GDPR distinguishes three roles. The data CONTROLLER decides what data to collect, why and how. The data PROCESSOR acts on the controller's instructions. The data SUBJECT is the individual to whom the data relates. For an electrical contracting firm, the firm is the controller, the customer is the data subject, and the cloud CRM (Joblogic, Commusoft, ServiceM8) is typically a processor working under a Data Processing Agreement (DPA)."
            onSite="As an apprentice or operative you act on behalf of the controller (your firm). Your actions can put the firm in breach — that's why the firm's policies and training matter. If your firm uses a third-party tool for customer comms (e.g. a marketing automation platform, an SMS gateway), there should be a DPA in place; that's not your problem to set up but it's worth knowing exists."
          >
            <p>
              Controller responsibilities the firm bears (and you support):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Identify the lawful basis for each processing activity.
              </li>
              <li>
                Provide a clear privacy notice to customers (typically on the website, on
                the quote, in the customer portal).
              </li>
              <li>
                Honour data-subject rights (access, rectification, erasure, restriction,
                portability, objection).
              </li>
              <li>
                Maintain records of processing activities (Article 30).
              </li>
              <li>
                Have appropriate security measures in place (encrypted devices, access
                controls, secure backups).
              </li>
              <li>
                Have DPAs in place with all data processors.
              </li>
              <li>
                Report breaches to the ICO within 72 hours where notifiable (Article 33).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Photos of customer property</ContentEyebrow>

          <ConceptBlock
            title="When photos become personal data — and almost always do"
            plainEnglish="A photo of an empty kitchen isn't identifying on its own. But the firm holds the customer's address, so the firm KNOWS whose kitchen it is — that's enough to make the photo personal data under UK GDPR Article 4(1). Add identifying features (a unique floor pattern, the view through the window, a named pet, an address sticker on the boiler) and the photo becomes identifying on its own too."
            onSite="The default rule for photos: treat every photo taken on a customer's premises as personal data. Use it ONLY for the purpose for which it was originally captured (job-evidence, the cert, the as-installed drawing). For any other purpose (portfolio, marketing, training) you need a fresh lawful basis — almost always explicit consent."
          >
            <p>
              Categories of photo and the typical lawful basis:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Job-evidence photos (before, during, after)</strong> — basis: contract
                (necessary to deliver the work and prove it was done). Stored in the firm's
                CRM, retained per the firm's retention policy.
              </li>
              <li>
                <strong>Photos for the cert / drawing</strong> — basis: contract + legal /
                regulatory (BS 7671 cert is a defensible record; as-installed drawing supports
                the install).
              </li>
              <li>
                <strong>Portfolio photos for AM2 / training</strong> — basis: explicit
                consent. Get it in writing, specify the purpose, allow withdrawal.
              </li>
              <li>
                <strong>Marketing photos (website, social media)</strong> — basis: explicit
                consent (preferred) or legitimate interest with a documented LIA. Anonymise
                where possible.
              </li>
              <li>
                <strong>Photos shared with mates / on personal channels</strong> — no lawful
                basis. Don't.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The social-media trap — duty travels with the data, not the platform"
            plainEnglish="Posting a customer's property to your personal Instagram doesn't make it less of a GDPR breach than posting to the firm's account. UK GDPR doesn't care about the platform — it cares whether personal data has been processed without a lawful basis. The customer who recognises their kitchen on your TikTok has the same right to complain to the ICO regardless of whether your account has 50 followers or 50,000."
            onSite="The trap is that personal social media FEELS personal — like a private chat with mates. It isn't. Posts can be screenshotted, shared, indexed by search engines, and seen by the customer's family or solicitor. Treat any photo of customer property as off-limits for personal channels unless you've got documented consent in writing."
          >
            <p>
              Realistic social-media rules for an apprentice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Don't post photos of customer property without explicit written consent.
              </li>
              <li>
                Don't post about specific customer jobs by name, address or distinctive
                features.
              </li>
              <li>
                Don't post images that include customer identifying details (post, family
                photos, named pets, security setups).
              </li>
              <li>
                Don't WhatsApp customer photos to mates at other firms — that's also
                processing without basis.
              </li>
              <li>
                Generic trade content (training, kit reviews, day-in-the-life with no
                identifiable customer property) is fine. Stick to that.
              </li>
              <li>
                Read your firm's social-media policy. Most have one. If you breach it the
                disciplinary process kicks in independently of the GDPR exposure.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="UK GDPR — Article 5(1) (principles relating to processing) — paraphrased"
            clause={
              <>
                Paraphrased: Personal data shall be (a) processed lawfully, fairly and in a
                transparent manner; (b) collected for specified, explicit and legitimate
                purposes; (c) adequate, relevant and limited to what is necessary; (d)
                accurate and kept up to date; (e) kept in a form which permits identification
                of data subjects for no longer than is necessary; and (f) processed in a
                manner that ensures appropriate security. Plus accountability: the controller
                shall be responsible for, and be able to demonstrate compliance with, the
                above.
              </>
            }
            meaning={
              <>
                Article 5 is the headline ground rules of UK GDPR. Everything else flows from
                these principles. For a trade contractor, the practical translations are: (a)
                identify your lawful basis and write a clear privacy notice; (b) collect
                customer data for the work, not for unspecified future use; (c) don&apos;t
                ask for the customer&apos;s NI number to wire a socket; (d) update changed
                addresses; (e) have a written retention policy (typically 6+ years for certs,
                shorter for casual marketing); (f) encrypt devices, lock vehicles, secure backups.
                Accountability means you have to be able to PROVE you&apos;re doing all of this,
                not just assert it.
              </>
            }
            cite="Source: UK GDPR Article 5(1) — paraphrased; refer to legislation.gov.uk for the full retained text."
          />

          <RegsCallout
            source="Data Protection Act 2018 — Schedule 1 (special category data) — paraphrased"
            clause={
              <>
                Paraphrased: The DPA 2018 supplements UK GDPR for &quot;special category data&quot; (race,
                ethnicity, political views, religion, trade union membership, genetic data,
                biometric data for ID, health data, sex life or sexual orientation). Processing
                of special category data requires a stronger lawful basis under UK GDPR Article
                9 PLUS one of the conditions in DPA 2018 Schedule 1 (e.g. employment law,
                health, social care, public interest). Schedule 1 also imposes additional
                safeguards including the requirement for an Appropriate Policy Document.
              </>
            }
            meaning={
              <>
                Most electrical contracting work doesn&apos;t touch special category data &mdash;
                you&apos;re not processing health records or biometric data. But two areas to
                watch: customer disability information (e.g. when adapting an install for a
                disabled household member, you may inadvertently capture health data) and
                employee HR records (sickness reasons, occupational health). For both, the
                firm&apos;s privacy framework has to step up to special-category protection
                &mdash; usually meaning explicit consent or a specific Schedule 1 condition,
                plus the Appropriate Policy Document.
              </>
            }
            cite="Source: Data Protection Act 2018, Schedule 1 — paraphrased; refer to legislation.gov.uk for full text."
          />

          <RegsCallout
            source="ICO Code of Practice on photography and CCTV (paraphrased)"
            clause={
              <>
                Paraphrased: Where personal data is captured by photographs or CCTV, the
                controller must identify a lawful basis, provide clear notice to data subjects
                (typically signage for CCTV, conversation for photographs), retain only as
                long as necessary, store securely, and honour subject access requests
                including providing copies of footage / images on request. Posting identifying
                images to public-facing channels (websites, social media) without consent is
                a high-risk processing activity and the ICO expects controllers to perform
                a Legitimate Interests Assessment or obtain explicit consent.
              </>
            }
            meaning={
              <>
                The ICO&apos;s photography and CCTV guidance applies to the firm&apos;s job-site
                photography. Practical implications: be transparent with the customer about
                the photos being taken, use them only for the stated purpose, store them in
                the firm&apos;s controlled systems (not personal phones), respect requests to
                delete or restrict, and never publish identifying images publicly without
                explicit consent. The same logic applies to body-worn cameras some firms now
                use for installer safety.
              </>
            }
            cite="Source: ICO guidance on CCTV / photography — paraphrased; refer to ico.org.uk for current guidance."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Retention — how long to keep what</ContentEyebrow>

          <ConceptBlock
            title="6 years is the practical floor — and it's set by multiple sources"
            plainEnglish="UK GDPR Article 5(1)(e) requires personal data to be kept no longer than necessary for the purpose. For electrical certs the 'necessary' period is set by the Limitation Act 1980 (6 years to defend a civil claim), the contractor scheme rules (NICEIC, NAPIT, ELECSA all require 6 years minimum), and HMRC tax records (6 years for VAT-registered firms). 6 years is the answer almost everywhere."
            onSite="In practice your firm's CRM should be configured with retention rules — auto-archive after a defined period, auto-delete after a longer one. Your job: don't keep parallel copies (paper folders in your van, photos on personal phone, emails in personal Gmail) that bypass the firm's retention controls. Anything off the firm's official systems is invisible to the retention policy and creates GDPR risk."
          >
            <p>
              Typical retention periods for an electrical contractor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EICs / EICRs / MWCs</strong> — 6 years minimum, often retained for
                the lifetime of the install.
              </li>
              <li>
                <strong>Job sheets / customer correspondence</strong> — 6 years (mirrors the
                cert retention).
              </li>
              <li>
                <strong>Quotes / invoices</strong> — 6 years (HMRC requirement for VAT-registered
                firms; longer for some Companies House requirements).
              </li>
              <li>
                <strong>Marketing consent records</strong> — for the duration consent is
                valid plus a defensible period to evidence the consent (typically 1-2 years
                after withdrawal).
              </li>
              <li>
                <strong>CCTV / body-worn camera footage</strong> — typically 30-90 days
                unless flagged for incident review (ICO guidance).
              </li>
              <li>
                <strong>HR records (employee files)</strong> — 6 years post-termination of
                employment, with some longer requirements for pension and health-and-safety
                records.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Customer rights — what the data subject can ask for</ContentEyebrow>

          <ConceptBlock
            title="The customer's rights under UK GDPR — and how the firm has to respond"
            plainEnglish="Every data subject has a defined set of rights under UK GDPR — access (see what's held), rectification (correct mistakes), erasure (delete in some circumstances), restriction (pause processing), portability (get a machine-readable copy), objection (stop certain processing), and rights around automated decision-making. The firm has one calendar month to respond to most requests, free of charge in most cases."
            onSite="Most customers don't exercise these rights — but when they do, ignoring the request is a serious GDPR breach. As an apprentice, if a customer mentions any of these rights to you (e.g. 'I want a copy of all the data you hold on me' or 'please delete my details'), pass it to your supervisor or the firm's data protection lead immediately so the clock can start running on the formal response."
          >
            <p>
              The headline rights and what they mean in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Right of access (Article 15)</strong> — the SAR. One month to
                provide a copy of the data plus context (purposes, recipients, retention,
                source).
              </li>
              <li>
                <strong>Right to rectification (Article 16)</strong> — correct inaccurate
                data without undue delay. Address typos, name changes, etc.
              </li>
              <li>
                <strong>Right to erasure / 'right to be forgotten' (Article 17)</strong> —
                delete data in defined circumstances (e.g. consent withdrawn, no longer
                needed). Subject to overriding legal obligations (e.g. cert retention).
              </li>
              <li>
                <strong>Right to restrict processing (Article 18)</strong> — pause
                processing while a dispute is resolved.
              </li>
              <li>
                <strong>Right to data portability (Article 20)</strong> — receive personal
                data in a structured, commonly used, machine-readable format.
              </li>
              <li>
                <strong>Right to object (Article 21)</strong> — object to processing based
                on legitimate interests or for direct marketing.
              </li>
              <li>
                <strong>Rights around automated decision-making (Article 22)</strong> — not
                normally relevant in trade contracting.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Data breach response — the 72-hour clock and what triggers it"
            plainEnglish="A 'personal data breach' under UK GDPR Article 4(12) means a breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data. If the breach is likely to result in a risk to the rights and freedoms of the data subjects, the controller must notify the ICO within 72 hours of becoming aware. If high risk, the data subjects must also be notified."
            onSite="The 72-hour clock starts on AWARENESS, not on the breach itself. Telling your supervisor immediately when you suspect a breach is critical — it gives the firm the time it needs to investigate and decide whether the breach is notifiable. 'I'll deal with it Monday' is the apprentice's most expensive mistake here — by Monday the firm may already be out of time."
          >
            <p>
              Common breach scenarios and what to do:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Lost/stolen phone with customer data on it — report immediately, supervisor
                triggers remote wipe, firm assesses notifiability.
              </li>
              <li>
                Email sent to wrong recipient with customer cert / personal data attached —
                report immediately, supervisor contacts unintended recipient to request
                deletion, firm assesses notifiability.
              </li>
              <li>
                Customer photo posted to personal social media without consent — take down,
                report to supervisor, firm assesses customer notification.
              </li>
              <li>
                Van break-in with customer paperwork stolen — report immediately, firm
                contacts affected customers as a precaution.
              </li>
              <li>
                USB stick or laptop lost — report immediately, supervisor confirms encryption
                status (encrypted devices are usually NOT notifiable; unencrypted are).
              </li>
              <li>
                Suspicion of phishing or unauthorised access to firm's CRM — report
                immediately; security incident response kicks in.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="WhatsApping a customer photo to a mate at another firm"
            whatHappens={
              <>
                Apprentice opens a CU and finds a melted bus-bar. Pulls out their personal
                phone, snaps three photos, drops them into a WhatsApp group with mates from
                their old college course at other firms with caption &quot;look at this state
                of this kitchen&quot;. One of the mates&apos; girlfriend works at the customer&apos;s
                accountancy firm and recognises the address. Word gets back. The customer
                rings the firm threatening an ICO complaint. The ICO doesn&apos;t fine but
                does send a stern letter and adds the firm to its &quot;awareness raising&quot;
                contact list. The firm has to update its policies, run mandatory training and
                discipline the apprentice.
              </>
            }
            doInstead={
              <>
                Photos for the supervisor and the firm&apos;s CRM only. If you want to share
                a learning moment with mates at other firms, do it without identifying info
                &mdash; describe it in words, or use a sketch, or share an anonymised photo
                with the address and any identifying features blurred. UK GDPR doesn&apos;t
                care about the channel &mdash; the duty travels with the data. Personal
                WhatsApp doesn&apos;t insulate you, encryption doesn&apos;t insulate you,
                &quot;they&apos;ll never know&quot; doesn&apos;t insulate you.
              </>
            }
          />

          <CommonMistake
            title="Keeping customer paperwork in a van that gets broken into"
            whatHappens={
              <>
                Apprentice carries a folder of recent EICs and customer details in the van for
                quick reference on follow-ups. Van gets broken into overnight outside their
                house. Folder is taken along with the toolbox. Apprentice doesn&apos;t flag it
                because the tools were the obvious target. Three weeks later one of the
                customers reports an attempted ID-theft scam using their address. The link
                to the stolen folder is made. The firm has to notify the ICO (potentially a
                notifiable breach), inform every customer in the folder, and review its
                physical-data policies. The apprentice gets a written warning for not flagging
                the loss promptly.
              </>
            }
            doInstead={
              <>
                Don&apos;t carry physical customer data unless absolutely necessary. Use the
                firm&apos;s CRM on an encrypted phone or tablet for on-site reference. If you
                must carry paper, lock it in a secure container in the van and out of sight.
                If anything is lost or stolen, tell your supervisor IMMEDIATELY &mdash; the
                72-hour ICO notification clock starts when the firm becomes aware, not when
                the breach happened. Faster reporting gives the firm more time to investigate
                and may avoid the breach being reportable in the first place.
              </>
            }
          />

          <Scenario
            title="You take a portfolio photo of a kitchen rewire for AM2"
            situation={
              <>
                You&apos;re mid-way through your second-year apprenticeship and the AM2 is on
                the horizon. You want to start building a portfolio of clean install work to
                support your assessment. On a domestic kitchen rewire you&apos;ve just
                finished, the work looks textbook &mdash; neat trunking, labelled CU, tidy
                terminations. You want to photograph it. Is it OK to just snap and save?
              </>
            }
            whatToDo={
              <>
                Get explicit consent first. The customer&apos;s already happy with the work
                so it&apos;s an easy ask &mdash; &quot;would you mind if I took a couple of
                photos for my apprenticeship portfolio? They&apos;ll only be seen by my
                assessor and my college, and I&apos;ll crop out anything identifying.&quot;
                If they agree, ask them to confirm in a quick text or signed slip so you have
                a record. Take the photos, crop out the address and any distinctive features
                (post, view through the window, named appliances), store them in a portfolio
                folder NOT on personal social media, and use them only for the AM2 assessment.
                If you later want to use them for marketing or trade press, ask the customer
                again with the new purpose specified &mdash; consent for AM2 doesn&apos;t
                cover Instagram. If the customer refuses, find another job to photograph.
              </>
            }
            whyItMatters={
              <>
                AM2 portfolios are great evidence of competence but they involve customer
                data. Doing it right (explicit consent, clear purpose, minimal identifying
                info, stored securely) protects you from a data complaint, protects the firm
                from a GDPR exposure, and demonstrates the kind of professional handling that
                contractor-scheme audits look for. The same discipline applies to anything
                you might want to use customer photos for after qualification &mdash; trade
                press, awards, marketing, training material. Always: lawful basis, customer
                informed, minimal data, stored securely, retained per policy.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "UK GDPR + DPA 2018 govern how organisations handle personal data. The firm is the data controller, you act on its behalf. Your actions can put the firm in breach.",
              "Personal data is broader than people realise — names, addresses, photos of property, IP addresses, anything that identifies a person. Photos of customer property are usually personal data through context.",
              "Six lawful bases under UK GDPR Article 6. For most trade work it's contract (to deliver) and legitimate interests (warranty, follow-up). Marketing and portfolio use need explicit consent.",
              "Article 5 principles — lawfulness, fairness, transparency, purpose limitation, minimisation, accuracy, storage limitation, integrity/confidentiality, accountability. Everything else flows from these.",
              "Retention floor is typically 6 years — set by the Limitation Act 1980, contractor scheme rules and HMRC. Have a written retention policy and apply it consistently.",
              "Personal social media isn't safe for customer property — UK GDPR doesn't care about the channel. The duty travels with the data. Personal WhatsApp doesn't insulate you either.",
              "Data breaches must be reported to the ICO within 72 hours of awareness (Article 33). Tell your supervisor IMMEDIATELY when you suspect a breach — the clock starts on awareness.",
              "ICO maximum fines are £17.5m or 4% of global turnover for serious breaches. For a small firm the reputational damage of an enforcement notice is usually worse than the fine itself.",
            ]}
          />

          <Quiz title="GDPR and DPA — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.2 Company policies and working relationships
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 BS 7671 514.13 warning notices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
