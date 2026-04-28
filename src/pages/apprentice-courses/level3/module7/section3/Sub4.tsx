/**
 * Module 7 · Section 3 · Subsection 4 — Customer-facing
 * Maps to C&G 2365-03 / Unit 308 / LO1 — supplementary depth
 *   Extends LO1 with apprentice-relevant career pathway material on the
 *   consumer-protection and customer-relationship side of running an
 *   electrical business.
 *
 * Consumer Rights Act 2015 (services), complaints handling, ADR (Alternative
 * Dispute Resolution), online reputation management, the Bribery Act 2010
 * for trade dealings, and the practical mechanics of dealing with
 * difficult customers.
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

const TITLE = 'Customer-facing | Level 3 Module 7.3.4 | Elec-Mate';
const DESCRIPTION =
  'Consumer Rights Act 2015, complaints handling, ADR (Alternative Dispute Resolution), online reputation management, Bribery Act 2010 — the practical customer-facing side of running an electrical business.';

const checks = [
  {
    id: 'mod7-s3-sub4-cra',
    question:
      "What does the Consumer Rights Act 2015 require for services contracts (like electrical work for a homeowner)?",
    options: [
      "Nothing.",
      "The Act requires services to be performed with reasonable care and skill, within a reasonable time if no time is agreed, and at a reasonable price if no price is agreed. If the service falls below standard the consumer can require repeat performance, or get a price reduction or refund. Applies to all consumer (domestic) work; doesn't apply to commercial/business-to-business contracts.",
      "Only material standards.",
      "Only Scottish customers.",
    ],
    correctIndex: 1,
    explanation:
      "CRA 2015 is the statutory floor for consumer protection. For domestic electrical work it means: do the job competently, do it in a reasonable timeframe, charge a reasonable price. If you don't, the customer has clear statutory rights to put it right. Fair dealing isn't optional — it's the law. Keep your work to BS 7671, document it properly, communicate clearly, and you'll be on the right side of the Act.",
  },
  {
    id: 'mod7-s3-sub4-adr',
    question:
      "What's ADR and when does it apply to consumer disputes?",
    options: [
      "Only for divorce.",
      "Alternative Dispute Resolution — out-of-court mechanisms for resolving consumer disputes (mediation, conciliation, arbitration). Under the Alternative Dispute Resolution for Consumer Disputes Regulations 2015 you must signpost customers to a certified ADR provider when an internal complaint is unresolved (you're not always required to USE ADR but you must offer it). MCS-registered installers must be members of an approved ADR scheme via RECC or HIES.",
      "Only commercial.",
      "Government only.",
    ],
    correctIndex: 1,
    explanation:
      "ADR is the standard mechanism for resolving consumer disputes without going to court. RECC, HIES, NICEIC, NAPIT all have approved ADR routes — when a complaint can't be resolved internally you signpost the customer to the relevant ADR provider. Costs are typically borne by the trader (you), but ADR is significantly cheaper and faster than court. Cooperate with the ADR process; it usually leads to a faster resolution than going to court would.",
  },
  {
    id: 'mod7-s3-sub4-online',
    question:
      "What's the right way to handle a negative online review?",
    options: [
      "Reply with rude comments.",
      "Respond promptly, professionally and publicly. Acknowledge the customer's experience without admitting liability. Offer to discuss offline ('please call us on X to discuss in detail'). Keep tone calm and factual. Never argue publicly. Take resolution to private channels. A good response to a bad review is often better marketing than the review itself was bad — it shows future customers how you handle problems.",
      "Demand the review be removed.",
      "Sue the customer.",
    ],
    correctIndex: 1,
    explanation:
      "Online reputation matters increasingly. Google reviews, Trustpilot, Checkatrade, Rated People all influence prospective customer decisions. The right response to a negative review is calm, professional, public acknowledgement plus offer to take resolution offline. Many customers update or remove negative reviews after a constructive resolution. Bad responses (defensive, rude, denial) cause more damage than the original review.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the cooling-off period for distance / off-premises consumer contracts?",
    options: [
      "1 day.",
      "14 days under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013. Applies when you contract with a consumer at a distance (online, phone) or off-premises (at the customer's home). The customer can cancel for any reason within 14 days. To start work within the 14-day period you need the customer's express consent (waiving the cooling-off right for the work done).",
      "1 hour.",
      "1 year.",
    ],
    correctAnswer: 1,
    explanation:
      "The 14-day cooling-off period catches many electricians off-guard. It applies to most domestic work because you typically contract at the customer's premises (off-premises). To do work within the 14 days you need the customer's express written agreement that they want you to start sooner — without it, they can cancel and you have no right to charge for materials supplied or work done. Bake the cooling-off acknowledgement into your standard quote/contract template.",
  },
  {
    id: 2,
    question: "What's the typical structure of a good complaints procedure?",
    options: [
      "Don't have one.",
      "Stage 1: customer raises concern with the firm (often verbally). Stage 2: written complaint logged, investigated, response within agreed timeframe (typically 14-28 days). Stage 3: if unresolved, escalate to senior person (or independent reviewer in larger firms). Stage 4: if still unresolved, signpost to ADR / scheme complaint procedure / Trading Standards. Document each stage in writing.",
      "Just hang up.",
      "One stage only.",
    ],
    correctAnswer: 1,
    explanation:
      "A documented complaints procedure protects both customer and firm. Most CPS schemes (NICEIC, NAPIT) require members to have a complaints procedure as part of scheme rules. Even one-person sole traders should have a basic written procedure. Customers complaining is a normal part of business — the question is whether you handle them well or badly. Well-handled complaints often result in customer loyalty; badly-handled escalate to scheme/ADR/court.",
  },
  {
    id: 3,
    question: "What's the Bribery Act 2010 and when might it apply to an electrician?",
    options: [
      "Doesn't apply to trades.",
      "UK statute making it a criminal offence to offer, promise, give, request, accept or agree to receive a financial or other advantage as an inducement for improper performance. Applies to any UK person/business. For electricians: gifts to suppliers/main contractors over modest value (typically £100+) raise risk; cash 'thank-yous' to procurement people are clearly bribery; small thank-you gifts (bottle of wine, biscuit tin) are typically fine. Many large firms have anti-bribery policies that ban any gifts.",
      "Only for politicians.",
      "Only for foreign trade.",
    ],
    correctAnswer: 1,
    explanation:
      "The Bribery Act has surprised many small-business owners. It applies broadly to all UK trade. The line between a courtesy gift and a bribe is judgment-based but broadly: token gifts (under ~£50, no expectation of reciprocity) are typically fine; substantial gifts or cash with implicit expectation of preferential treatment are not. When in doubt, don't. Most large firms (main contractors, public-sector clients) have policies banning gifts entirely.",
  },
  {
    id: 4,
    question: "Should a small electrical firm have written terms and conditions?",
    options: [
      "No need.",
      "Yes — written T&Cs protect both you and the customer. Cover: scope of work, payment terms, materials warranty, workmanship warranty, complaints procedure, cooling-off period (consumer), variations and extras, cancellation, retention of title (you own materials until paid for), data protection (GDPR). T&C templates available from CPS schemes (NICEIC, NAPIT), trade associations (ECA), or solicitors specialising in trade.",
      "Only for big firms.",
      "Only verbal.",
    ],
    correctAnswer: 1,
    explanation:
      "Written T&Cs are the legal foundation of every job. Without them, default rules apply (Consumer Rights Act for domestic, Sale of Goods Act for materials, Late Payment Act for invoicing, etc.) — workable but you have no firm-specific protections. Standard T&Cs from CPS scheme (NICEIC, NAPIT publish member templates) are a good starting point; a solicitor can tailor them. Reference T&Cs in your quotes; have customers sign acceptance.",
  },
  {
    id: 5,
    question:
      "What happens if a customer refuses to pay because they're unhappy with the work?",
    options: [
      "Just give up.",
      "Stage 1: try to discuss and resolve — most disputes resolve through conversation. Stage 2: if unresolved, follow your written complaints procedure. Stage 3: if still unresolved, signpost ADR (RECC for MCS work, NICEIC/NAPIT for scheme work, generic ADR providers like Centre for Effective Dispute Resolution). Stage 4: as last resort, small claims court (under £10k, online process). Document everything in writing throughout.",
      "Sue immediately.",
      "Threaten the customer.",
    ],
    correctAnswer: 1,
    explanation:
      "Payment disputes are the most common serious customer disputes. The escalation ladder (talk → complaints procedure → ADR → court) is the right approach. Each step requires patience but skipping steps damages your case if it does end up in court. Document every conversation, every email. Most disputes resolve at stage 1 or 2 with calm professional communication.",
  },
  {
    id: 6,
    question:
      "What's GDPR and how does it affect a small electrical firm?",
    options: [
      "Nothing.",
      "UK GDPR (the UK's adoption of the EU GDPR after Brexit) governs how organisations handle personal data. For an electrical firm: customer names, addresses, phone numbers, email addresses, payment details, photos of work in customer property all count as personal data. Headline obligations: lawful basis for processing, data minimisation, security, customer's right to access their data, breach notification within 72 hours. Most small firms register with ICO (Information Commissioner's Office) for £40-60/year.",
      "Only EU.",
      "Only big firms.",
    ],
    correctAnswer: 1,
    explanation:
      "GDPR applies to every UK organisation processing personal data, including sole-trader electricians keeping customer contact lists. Most small firms register with the ICO (cost £40-60/year) and have a basic privacy policy explaining how they handle customer data. Cloud accounting (Xero, QuickBooks) helps — major SaaS providers handle most of the data security on your behalf. Don't ignore GDPR; ICO can fine for serious breaches.",
  },
  {
    id: 7,
    question: "How important are online reviews for a domestic electrical firm?",
    options: [
      "Not important.",
      "Increasingly critical. Google reviews are the first thing most prospective customers see when searching for an electrician. Trustpilot, Checkatrade, MyBuilder, Rated People all influence customer decisions. A consistent stream of positive reviews drives organic enquiries; a single uncontested negative review can deter customers. Actively request reviews from happy customers (post-job email with review link). Respond promptly and professionally to all reviews — positive and negative.",
      "Only commercial.",
      "Only for plumbers.",
    ],
    correctAnswer: 1,
    explanation:
      "Online reputation is the modern equivalent of word-of-mouth, scaled by Google. Most domestic customers search 'electrician near me' before contacting anyone. Firms with strong review profiles dominate the local pack and get the first call. Building review momentum requires deliberate effort — ask every happy customer for a review, make it easy with a direct link, respond to every review (positive and negative). Long game pays off.",
  },
  {
    id: 8,
    question: "What's a 'workmanship warranty' and how long should it run?",
    options: [
      "1 day.",
      "A workmanship warranty is your written guarantee that the work you've done will be free from workmanship defects for a specified period — typically 1-2 years for standard electrical work, sometimes longer for renewables (RECC requires minimum 2-year workmanship warranty for MCS-registered work). Materials usually carry separate manufacturer warranties (passed through to customer). Clear warranty terms reduce disputes by setting expectations upfront.",
      "Forever.",
      "1 hour.",
    ],
    correctAnswer: 1,
    explanation:
      "Warranty terms shape customer expectations and your post-completion obligations. 1-2 years is the standard UK trade norm for workmanship; some firms offer longer (3-5 years) as a competitive differentiator. MCS / RECC require minimum 2-year warranty for renewables work. State warranty terms clearly in your T&Cs and on your invoice. Honour them when called upon — reputation damage from refused warranty claims is severe.",
  },
];

const faqs = [
  {
    question: "Do I need to register with the ICO for GDPR?",
    answer:
      "Most UK businesses processing personal data (which includes any electrical firm with a customer database) must register with the ICO (Information Commissioner's Office) and pay the data protection fee (currently £40-60/year for small organisations). Registration is online at ico.org.uk. The fee is a tax-deductible business cost. Avoiding registration risks ICO enforcement action.",
  },
  {
    question: "What's the difference between a 'guarantee' and a 'warranty'?",
    answer:
      "Largely interchangeable in UK consumer trading. Both mean a written promise that the product/work will perform to specified standard for a specified period. 'Guarantee' is sometimes used for product manufacturer promises (Apple guarantees the iPhone for 1 year); 'warranty' for service-trade promises. The Consumer Rights Act 2015 statutory rights apply regardless — guarantees and warranties are additional to (not instead of) the statutory rights.",
  },
  {
    question: "Should I have a written contract for every job?",
    answer:
      "Larger jobs (above £1k or so): yes, written contract / quote acceptance is sensible. Small jobs (callout, single fault repair): a written quote with terms and an invoice on completion is usually enough. The Consumer Rights Act and your standard T&Cs apply by default. Larger jobs benefit from explicit scope, payment milestones, change-control process and warranty terms.",
  },
  {
    question: "What if a customer refuses to pay because of cosmetic issues (scratch on a switch, dust)?",
    answer:
      "Distinguish between defects (electrical safety, function) and finish issues (cosmetic, dust, marks). For defects: put it right under the Consumer Rights Act and your warranty. For finish issues: discuss reasonable expectations and remedy what's reasonable. Some cosmetic issues are out of scope (you didn't agree to redecorate); others are in scope (you should have wiped down before leaving). Be reasonable and most disputes resolve.",
  },
  {
    question: "Can I refuse to work for a customer who's been abusive?",
    answer:
      "Yes — you have no obligation to enter into or continue a contract. State your reasons (politely) in writing if you decide to walk away. Refunds for any uncompleted work to be calculated proportionate to work done. Some customers genuinely behave abusively; protecting yourself and your team is reasonable. Document the abuse (emails, texts, notes of phone calls) in case it later goes to dispute or court.",
  },
  {
    question: "How do I encourage customers to leave online reviews?",
    answer:
      "Ask. After every successful job send a thank-you email with a direct link to your Google review page (one click). Mention review services they're already familiar with (Trustpilot, Checkatrade). Make leaving a review easy — most happy customers will leave one if asked, but won't on their own initiative. Don't offer incentives for reviews (this can breach review-platform rules); just ask politely.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Subsection 4"
            title="Customer-facing"
            description="Consumer Rights Act 2015, complaints handling, ADR, online reputation, Bribery Act 2010 — the practical customer-facing side of running an electrical business."
            tone="emerald"
          />

          <TLDR
            points={[
              "Consumer Rights Act 2015 governs domestic services — work must be performed with reasonable care and skill, in reasonable time, at reasonable price.",
              "Consumer Contracts Regulations 2013 give 14-day cooling-off period for distance / off-premises contracts (which covers most domestic work). Get express consent to start work within the 14 days.",
              "Written complaints procedure required by most CPS schemes; Stage 1 (firm) → Stage 2 (written) → Stage 3 (ADR) → Stage 4 (court).",
              "ADR (Alternative Dispute Resolution) — RECC for MCS, NICEIC/NAPIT for scheme work. Faster and cheaper than court.",
              "Bribery Act 2010 applies to all UK business — token gifts (£50ish, no expectation) generally OK; substantial gifts/cash with expectation of preferential treatment are not.",
              "GDPR — register with ICO (£40-60/year), basic privacy policy, secure customer data.",
              "Online reviews dominate domestic electrical customer acquisition — actively request reviews, respond professionally to all (positive and negative).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 with apprentice-relevant career pathway material on consumer-facing legal obligations and customer relationship management.",
              "State the consumer protections under the Consumer Rights Act 2015 for services contracts.",
              "Identify the 14-day cooling-off period under the Consumer Contracts Regulations 2013.",
              "Identify the role of ADR (Alternative Dispute Resolution) in resolving consumer disputes.",
              "State the Bribery Act 2010 framework and how it applies to gifts and hospitality in trade dealings.",
              "Identify GDPR / UK GDPR obligations for a small electrical firm including ICO registration.",
              "Identify the role of online reviews and reputation management in modern customer acquisition.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The consumer-protection framework</ContentEyebrow>

          <ConceptBlock
            title="Consumer Rights Act 2015 — the floor for domestic work"
            plainEnglish="The Consumer Rights Act 2015 (CRA) is the headline UK statute for consumer protection. For services (which is what electrical work to a domestic customer is) it requires that the service is performed with reasonable care and skill, within a reasonable time if no time is agreed, and at a reasonable price if no price is agreed. If the service falls below standard the customer can require repeat performance, or get a price reduction or refund. Applies to all consumer (domestic) work; doesn't apply to commercial/business-to-business contracts."
            onSite="CRA is the legal floor. Working to BS 7671, documenting properly, communicating clearly, doing the job competently — these are how you stay on the right side of the Act. When something goes wrong, the Act gives the customer clear remedies. Cooperate with reasonable customer requests for remedy; that's the law and it's good practice."
          >
            <p>
              CRA 2015 services rights summary:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.49</strong> &mdash; Service must be performed with reasonable care
                and skill.
              </li>
              <li>
                <strong>s.51</strong> &mdash; Reasonable price if no price agreed.
              </li>
              <li>
                <strong>s.52</strong> &mdash; Reasonable time if no time agreed.
              </li>
              <li>
                <strong>s.55</strong> &mdash; Right to repeat performance if service falls
                short.
              </li>
              <li>
                <strong>s.56</strong> &mdash; Right to price reduction if repeat
                performance impossible or untimely.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="14-day cooling-off period — Consumer Contracts Regulations 2013"
            plainEnglish="The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 give consumers a 14-day cooling-off period for distance contracts (online, phone) and off-premises contracts (signed at the consumer's home). The customer can cancel for any reason within 14 days of the contract date. To start work within the 14 days you need the customer's express written consent waiving the cooling-off right for work done."
            onSite="This catches many electricians off-guard. Most domestic electrical work is contracted at the customer's home (off-premises) — so the 14-day cooling-off applies. To do work within the 14 days, get the customer's signature on a form that says: 'I want the work to start now and acknowledge I lose the cooling-off right for any work completed if I cancel later.' Bake this into your standard quote/acceptance template."
          >
            <p>
              Cooling-off practical handling:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Standard quote includes cooling-off notice (right exists, how to exercise).
              </li>
              <li>
                Customer signature acknowledging they want work to start within the 14
                days (this gives you the right to charge for work done if they cancel
                later).
              </li>
              <li>
                Even with express consent, materials delivered but unused must be returned
                /refunded if the customer cancels within 14 days.
              </li>
              <li>
                Without express consent &mdash; customer can cancel any time in the 14 days
                and you have no right to charge for materials supplied or work done.
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

          <ContentEyebrow>Complaints, ADR and reputation</ContentEyebrow>

          <ConceptBlock
            title="Complaints procedure — the structured response"
            plainEnglish="A documented complaints procedure protects both customer and firm. Stage 1: customer raises concern with the firm (often verbally). Stage 2: written complaint logged, investigated, response within agreed timeframe. Stage 3: if unresolved, escalate to senior person or independent reviewer. Stage 4: if still unresolved, signpost to ADR / scheme complaint procedure / Trading Standards. Document each stage in writing."
            onSite="Most CPS schemes (NICEIC, NAPIT) require members to have a written complaints procedure. Even one-person sole traders should have a basic written procedure. Customers complaining is normal — the question is whether you handle them well or badly. Well-handled complaints often build customer loyalty; badly-handled complaints escalate to scheme dispute or court."
          >
            <p>
              Complaints procedure stages:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 &mdash; verbal raise</strong>. Customer expresses concern;
                firm responds and tries to resolve immediately.
              </li>
              <li>
                <strong>Stage 2 &mdash; written complaint</strong>. Logged; investigated;
                written response within 14-28 days.
              </li>
              <li>
                <strong>Stage 3 &mdash; senior escalation</strong>. Independent senior
                review (in larger firms); revised response.
              </li>
              <li>
                <strong>Stage 4 &mdash; external escalation</strong>. ADR / scheme
                complaint / Trading Standards / court signposting.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ADR — out-of-court dispute resolution"
            plainEnglish="Alternative Dispute Resolution covers mediation, conciliation, arbitration — out-of-court mechanisms for resolving consumer disputes. Under the Alternative Dispute Resolution for Consumer Disputes Regulations 2015 you must signpost customers to a certified ADR provider when an internal complaint is unresolved. MCS-registered installers must be members of an approved ADR scheme via RECC or HIES. CPS schemes (NICEIC, NAPIT) provide ADR routes."
            onSite="ADR is significantly cheaper and faster than court. Cooperate with the ADR process; it usually leads to faster resolution. ADR decisions are typically binding on the trader (you) and may be binding on the consumer depending on the scheme. Costs are typically borne by the trader. Treat ADR as the preferred resolution mechanism for serious customer disputes."
          >
            <p>
              UK ADR providers commonly used by electrical firms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RECC (renewables) ADR scheme &mdash; for MCS-registered installations.</li>
              <li>HIES ADR scheme &mdash; for energy-efficiency installations.</li>
              <li>NICEIC complaints &amp; ADR process for scheme members.</li>
              <li>NAPIT complaints &amp; ADR process for scheme members.</li>
              <li>
                Centre for Effective Dispute Resolution (CEDR) &mdash; generic accredited
                provider.
              </li>
              <li>
                Citizens Advice / Trading Standards &mdash; signposting and informal
                escalation route.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Online reviews — the modern reputation system"
            plainEnglish="Online reviews are the dominant influence on domestic electrical customer acquisition. Google reviews are the first thing most prospective customers see when searching for an electrician. Trustpilot, Checkatrade, MyBuilder, Rated People all influence customer decisions. A consistent stream of positive reviews drives organic enquiries; a single uncontested negative review can deter customers."
            onSite="Build review momentum deliberately: ask every happy customer for a review (post-job email with direct link). Make leaving a review easy. Respond promptly and professionally to ALL reviews — positive (thank them) and negative (acknowledge, offer to discuss offline, never argue publicly). A good response to a bad review is often better marketing than the review itself was bad — it shows future customers how you handle problems."
          >
            <p>
              Practical review management:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Set up Google Business Profile, complete with accurate details, photos,
                services.
              </li>
              <li>
                Add review-request to standard post-job email template &mdash; one click
                link.
              </li>
              <li>
                Monitor reviews across platforms (Google, Trustpilot, Checkatrade) at
                least weekly.
              </li>
              <li>
                Respond to every review within 24-48 hours.
              </li>
              <li>
                For negative reviews: acknowledge, offer to discuss, don&apos;t argue
                publicly.
              </li>
              <li>
                Don&apos;t offer incentives for reviews (breaches platform rules); just
                ask.
              </li>
              <li>
                Don&apos;t fake reviews (illegal under CMA enforcement; deeply damaging
                when caught).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="Consumer Rights Act 2015 — Part 1 Chapter 4 (Services) (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  CRA 2015 Part 1 Chapter 4 governs consumer contracts for services:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    s.49 &mdash; Service to be performed with reasonable care and skill.
                  </li>
                  <li>
                    s.50 &mdash; Information about the trader / service to be binding.
                  </li>
                  <li>
                    s.51 &mdash; Reasonable price where no price agreed.
                  </li>
                  <li>
                    s.52 &mdash; Performance within a reasonable time where no time agreed.
                  </li>
                  <li>
                    s.55 &mdash; Right to require repeat performance.
                  </li>
                  <li>
                    s.56 &mdash; Right to price reduction.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                CRA 2015 is the consumer-protection floor for domestic electrical work.
                Work competently, communicate clearly, document properly &mdash; you stay on
                the right side of the Act. When something goes wrong, the Act gives the
                customer clear remedies (repeat performance, price reduction, refund).
                Cooperate with reasonable customer requests for remedy.
              </>
            }
            cite="Source: Consumer Rights Act 2015 (c.15), Part 1 Chapter 4 (Services) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Bribery Act 2010 (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Bribery Act 2010 creates offences of:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    s.1 &mdash; Offering, promising or giving an advantage as inducement
                    for improper performance.
                  </li>
                  <li>
                    s.2 &mdash; Requesting, agreeing to receive or accepting an advantage in
                    connection with improper performance.
                  </li>
                  <li>
                    s.6 &mdash; Bribery of foreign public officials.
                  </li>
                  <li>
                    s.7 &mdash; Failure of a commercial organisation to prevent bribery
                    (corporate offence).
                  </li>
                </ul>
                <p className="mt-2">
                  &quot;Adequate procedures&quot; defence under s.7 protects organisations
                  with proportionate anti-bribery procedures.
                </p>
              </>
            }
            meaning={
              <>
                Bribery Act applies broadly to all UK business. For an electrician: token
                gifts (under ~&pound;50, no expectation of reciprocity) are generally fine;
                substantial gifts or cash with expectation of preferential treatment are
                bribery. Many large firms (main contractors, public-sector clients) have
                policies banning gifts entirely. When in doubt, don&apos;t. Have a simple
                written gifts policy if you&apos;re a Ltd company.
              </>
            }
            cite="Source: Bribery Act 2010 (c.23) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="UK GDPR / Data Protection Act 2018 (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  UK GDPR (the UK&apos;s adoption of EU GDPR after Brexit, supplemented by
                  the Data Protection Act 2018) governs personal data:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Lawful basis for processing required (consent, contract, legitimate interests, etc.).</li>
                  <li>Data minimisation &mdash; only collect what you need.</li>
                  <li>Security &mdash; appropriate technical and organisational measures.</li>
                  <li>Customer rights of access, rectification, erasure.</li>
                  <li>Breach notification to ICO within 72 hours of becoming aware.</li>
                  <li>Most organisations must register with ICO and pay annual fee.</li>
                </ul>
              </>
            }
            meaning={
              <>
                GDPR applies to every UK organisation processing personal data, including
                sole-trader electricians keeping customer contact lists. Most small firms
                register with the ICO (cost &pound;40-60/year) and have a basic privacy
                policy. Cloud accounting providers (Xero, QuickBooks) handle most of the
                data security. Don&apos;t ignore GDPR &mdash; ICO enforcement against
                small firms is unusual but not unheard of.
              </>
            }
            cite="Source: UK GDPR (Data Protection Act 2018 c.12) — paraphrased from legislation.gov.uk and ico.org.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Arguing publicly with a negative reviewer"
            whatHappens={
              <>
                Customer leaves a 1-star Google review citing &quot;rude&quot;, &quot;over-
                charged&quot;, &quot;poor work&quot;. Electrician feels the criticism is
                unfair and replies publicly with detailed defence pointing out customer
                wasn&apos;t at home as agreed, kept changing the brief, hassled them about
                price. The reply is factually accurate but tonally defensive. Future
                prospective customers read both the original and the reply, conclude the
                electrician is difficult to deal with, and book someone else.
              </>
            }
            doInstead={
              <>
                Reply publicly but calmly: &quot;I&apos;m sorry your experience didn&apos;t
                meet your expectations. Please call us on [number] so we can discuss in
                detail and try to resolve.&quot; That&apos;s it. Take resolution offline.
                Don&apos;t debate facts publicly. Future customers reading the exchange see
                you handle problems professionally &mdash; which is more valuable than
                &quot;winning&quot; the public argument. Many customers update or remove
                negative reviews after offline resolution.
              </>
            }
          />

          <Scenario
            title="Customer threatens 1-star review unless you do extra work for free"
            situation={
              <>
                You completed a kitchen rewire for a domestic customer. Quoted
                &pound;3,500 fixed price; delivered to spec; customer paid in full.
                Three weeks later customer emails: they&apos;ve decided they want an
                additional double socket installed in the utility room. They expect this to
                be done free of charge as &quot;goodwill&quot;. They mention they&apos;ll be
                leaving a 1-star Google review if you decline. The extra work would cost
                you about &pound;180 in time and materials. What do you do?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; assess the request on its merits</strong>. Did the
                original quote and scope cover the utility room socket? If yes, do it (you
                missed it). If no, it&apos;s a new job. The customer wanting it for free
                doesn&apos;t change the scope analysis.
                <br /><br />
                <strong>Step 2 &mdash; respond calmly in writing</strong>. Email back
                politely: &quot;Thanks for getting in touch. The original quote and scope
                covered [list]. The utility room socket wasn&apos;t included. I can do the
                additional work for &pound;180 + VAT &mdash; happy to come back next week
                if helpful. If you&apos;d prefer to discuss the original quote, I&apos;m also
                happy to talk that through.&quot; Don&apos;t mention the threat.
                <br /><br />
                <strong>Step 3 &mdash; don&apos;t let the threat dictate the
                decision</strong>. Doing free work because of a review threat trains
                customers to threaten reviews; it&apos;s a slippery slope. Honest pricing
                for honest work is your standard. If you compromise once on principle, the
                next customer learns the same trick.
                <br /><br />
                <strong>Step 4 &mdash; if the bad review materialises, respond
                professionally</strong>. &quot;I&apos;m sorry to see this review.
                We completed the work to the agreed scope and would have been happy to
                quote for any additional work at our standard rate. If we can help further
                please call us on [number].&quot; Calm, factual, no defensive arguing.
                <br /><br />
                <strong>Step 5 &mdash; keep building positive review momentum</strong>. One
                bad review against ten good ones doesn&apos;t move the needle. Ten bad ones
                against ten good ones does. The cumulative review profile is what matters
                &mdash; keep the good reviews coming and the occasional bad review fades
                into noise.
              </>
            }
            whyItMatters={
              <>
                Online review extortion is a real and growing problem for domestic trades.
                Caving to it teaches customers it works; standing firm protects your pricing
                discipline. Most customers don&apos;t actually leave the threatened bad
                review when politely refused. Those who do can be addressed with
                professional response. The long game is honest pricing, professional
                conduct, and consistent positive review momentum.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Customer law, complaints, online reputation</ContentEyebrow>

          <ConceptBlock
            title="Consumer Rights Act 2015 — what customers can actually demand"
            plainEnglish="The Consumer Rights Act 2015 sets statutory rights for consumer customers (B2C, not B2B) on goods, services and digital content. Services (your electrical work) must be carried out with reasonable care and skill, within a reasonable time, at a reasonable price (if no fixed price agreed). If the service falls short, the customer can require repeat performance, or a price reduction. Goods supplied as part of the service (cables, accessories) must be of satisfactory quality, fit for purpose, and as described — same remedies as Sale of Goods. The Act overrides any contract clause that tries to exclude these rights."
            onSite="The CRA 2015 is what underpins most domestic-customer disputes. Common scenarios: customer says the install is sub-standard (CRA s.49 reasonable care and skill claim — you must repeat performance to fix at no extra cost); installed accessory fails within 6 months (CRA presumes the fault was present at install — burden of proof on you); job took 3 weeks instead of agreed 5 days (CRA s.52 reasonable time claim — potentially price reduction). The 6-month presumption of pre-existing defect is the most-cited clause — keep your install records strong. Any contract clause attempting to exclude these is unenforceable for consumer customers."
          >
            <p>
              CRA 2015 key rights for consumer customers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.49</strong> &mdash; Service performed with reasonable care and skill.
              </li>
              <li>
                <strong>s.50</strong> &mdash; Information given before contract is binding.
              </li>
              <li>
                <strong>s.51</strong> &mdash; Reasonable price (where no fixed price agreed).
              </li>
              <li>
                <strong>s.52</strong> &mdash; Service performed within reasonable time.
              </li>
              <li>
                <strong>s.55</strong> &mdash; Right to require repeat performance.
              </li>
              <li>
                <strong>s.56</strong> &mdash; Right to a price reduction.
              </li>
              <li>
                <strong>s.31</strong> &mdash; 6-month reverse burden of proof on goods supplied.
              </li>
              <li>
                <strong>s.57</strong> &mdash; Cannot exclude these rights in the contract.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Complaints handling — the structured response that protects your business"
            plainEnglish="A structured complaints process protects you legally, keeps customers reasonable, and converts a high proportion of complaints into retained customers. The basic structure: acknowledge within 1 working day (don't ghost them), investigate within 5 working days (visit the site if needed), respond in writing with a proposal, follow through on agreed remedy, document the whole thing in writing. Most CPS schemes (NICEIC, NAPIT) require you to have a written complaints procedure as a scheme membership condition. ADR (Alternative Dispute Resolution) is the next step for unresolved consumer complaints — RECC for renewables, scheme-aligned ADR for general electrical work."
            onSite="The most expensive complaints are the ones you ignore. A customer who feels unheard escalates to Trading Standards, online reviews, social media — all far more damaging than the original issue. A customer whose complaint is acknowledged within hours and addressed within days is statistically very likely to retain you for future work. Build the response template now: acknowledgement email, investigation visit script, written response template, escalation to ADR information. The CPS schemes provide template wording; use it. Keeping a complaint log (date, customer, issue, resolution) is also useful evidence at scheme audit."
          >
            <p>
              Complaints handling structure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Day 0-1</strong> &mdash; Acknowledge receipt, give name of contact handling.
              </li>
              <li>
                <strong>Day 1-5</strong> &mdash; Investigate, visit site if needed, gather facts.
              </li>
              <li>
                <strong>Day 5-7</strong> &mdash; Written response with proposed resolution.
              </li>
              <li>
                <strong>Day 7-14</strong> &mdash; Implement agreed remedy.
              </li>
              <li>
                <strong>Day 14+</strong> &mdash; Confirm closure in writing.
              </li>
              <li>
                <strong>Escalation</strong> &mdash; ADR provider (scheme-aligned), then Trading Standards, then small claims.
              </li>
              <li>
                <strong>Log everything</strong> &mdash; for scheme audit and for pattern recognition.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ADR (Alternative Dispute Resolution) — the layer between you and court"
            plainEnglish="Alternative Dispute Resolution provides a structured route to resolve consumer disputes without going to court. Under the Alternative Dispute Resolution for Consumer Disputes (Competent Authorities and Information) Regulations 2015, businesses must signpost an approved ADR provider to consumers in unresolved complaints (you don't have to use ADR, but you must tell consumers they can). For renewables (PV, EV, HP) the standard ADR provider is RECC (Renewable Energy Consumer Code). For general electrical work, scheme-aligned ADR providers (NICEIC's complaints service, NAPIT's mediation service) handle disputes within scheme-registered firms."
            onSite="ADR is faster and cheaper than court for both parties. Decisions are typically binding on the business but not on the consumer (so a consumer who loses can still take to court; a business who loses must comply). Most ADR cases settle in 30-60 days. The cost is modest (£100-300 case fee typically) and reputational damage is limited. Far better than letting a dispute escalate to small claims (where filing fee + admin time + potential lost case + customer publicity all combine). The downside: cumulative ADR awards against your firm get recorded by the scheme and may affect future audit ratings."
          >
            <p>
              ADR providers in UK electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RECC</strong> &mdash; Renewable Energy Consumer Code (PV, HP, EV, Battery).
              </li>
              <li>
                <strong>NICEIC complaints process</strong> &mdash; for NICEIC-registered firms.
              </li>
              <li>
                <strong>NAPIT mediation service</strong> &mdash; for NAPIT-registered firms.
              </li>
              <li>
                <strong>Trading Standards Approved Codes</strong> &mdash; (TrustMark) for vetted contractors.
              </li>
              <li>
                <strong>Citizens Advice</strong> &mdash; consumer first port of call, may signpost to ADR.
              </li>
              <li>
                <strong>Small Claims Court</strong> &mdash; alternative route, claims under &pound;10,000 (England/Wales).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Bribery Act 2010 — s.7 (failure of commercial organisations to prevent bribery)"
            clause={
              <>
                <p className="mb-2">
                  Section 7 creates a strict-liability corporate offence: a commercial organisation is guilty if a
                  person associated with it bribes another person, intending to obtain or retain business or business
                  advantage for the organisation. The only defence is that the organisation had in place adequate
                  procedures designed to prevent persons associated with it from undertaking such conduct.
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>"Bribery" includes both offering and accepting financial or other advantage to influence improper performance.</li>
                  <li>Maximum penalty: unlimited fine for the organisation; up to 10 years' prison for individuals.</li>
                  <li>"Adequate procedures" means proportionate, risk-assessed, top-level commitment, due diligence, communication and monitoring.</li>
                </ul>
              </>
            }
            meaning={
              <>
                For a small electrical firm the Bribery Act risks usually look like: gifts to procurement managers
                in exchange for being placed on tender lists; cash payments to letting-agent staff for being
                referred customers; favours-for-favours with main contractor site staff. All of these can constitute
                bribery under the Act. The "adequate procedures" defence requires you to have an anti-bribery
                policy, appropriate training and clear rules on hospitality and gifts. Most small firms get this
                wrong by assuming small gifts (a bottle at Christmas, a takeaway lunch) don't count &mdash;
                they can, depending on intent and value. Treat gifts to procurement contacts with extreme care.
              </>
            }
            cite="Source: Bribery Act 2010 (c.23), s.7 — paraphrased from legislation.gov.uk and Ministry of Justice guidance."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Consumer Rights Act 2015 governs domestic services — work performed with reasonable care and skill, in reasonable time, at reasonable price. Customer remedies: repeat performance, price reduction, refund.",
              "Consumer Contracts Regulations 2013 give 14-day cooling-off period for off-premises contracts (most domestic work). Get express written consent to start work within 14 days.",
              "Written complaints procedure required by most CPS schemes. Stage 1 (verbal) → Stage 2 (written investigation) → Stage 3 (senior escalation) → Stage 4 (ADR / court).",
              "ADR is significantly cheaper and faster than court — RECC for MCS, NICEIC/NAPIT for scheme work, CEDR generic.",
              "Bribery Act 2010 applies to all UK business — token gifts (£50ish, no expectation) generally OK; substantial gifts/cash with implicit expectation of preferential treatment are bribery.",
              "GDPR / UK GDPR — register with ICO (£40-60/year), basic privacy policy, secure customer data. Breach notification within 72 hours.",
              "Online reviews dominate domestic electrical customer acquisition — actively request reviews, respond professionally to all (positive and negative), never argue publicly.",
              "Bad-review-extortion: don't cave to it; respond professionally; build long-term review momentum to outweigh occasional bad reviews.",
              "Workmanship warranty 1-2 years standard for electrical; 2+ years for renewables (RECC requirement). State warranty terms clearly in T&Cs.",
            ]}
          />

          <Quiz title="Customer-facing — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 Pricing + invoicing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4 — CPD &amp; lifelong learning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
