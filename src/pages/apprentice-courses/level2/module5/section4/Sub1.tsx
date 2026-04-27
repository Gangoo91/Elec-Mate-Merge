/**
 * Module 5 · Section 4 · Subsection 1 — Purpose of customer information
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.3
 *   AC 2.3 — "Identify the purpose of information given to customers"
 *
 * Frame: every customer-facing document on a job has a single, defensible
 * purpose. Quotes lock in scope and price, contracts make the deal binding,
 * job sheets prove what was done, invoices collect, certificates discharge
 * the legal obligation, user instructions empower the customer to operate
 * their install, manufacturer data lets it be serviced, and as-installed
 * drawings record where wires actually went. Get any one wrong and the
 * customer (or their solicitor) has the gap they need.
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
  'Purpose of customer information (2.3) | Level 2 Module 5.4.1 | Elec-Mate';
const DESCRIPTION =
  'Quotes, contracts, job sheets, invoices, certificates, user instructions, manufacturer data and as-installed drawings — what each customer-facing document is for, and why it matters in court when something goes wrong.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s4-sub1-quote-vs-contract',
    question:
      "A customer rings up and says 'I want a price for a kitchen rewire'. You email them a number for £2,800 with a one-line description. Two weeks later they want you to start. What's missing before any tools come out, and why does it matter?",
    options: [
      'Nothing — the price email is the contract.',
      "A written quote that fully scopes the work (number of circuits, accessories, run routes, what's included, what's excluded), a contract setting payment terms and variations, and a customer signature confirming both. Without those you've got a vague verbal agreement that the Consumer Rights Act 2015 will treat as enforceable on the customer's terms — meaning if they later say 'I assumed downlights were included' you'll struggle to prove otherwise.",
      "Just the start date — the price is enough.",
      "A site survey only — the paperwork can follow once work starts.",
    ],
    correctIndex: 1,
    explanation:
      "A price on its own isn't a quote, and a quote isn't a contract. The Consumer Rights Act 2015 s.49 says services must be performed with reasonable care and skill, and s.50 makes any pre-contract statement that influenced the customer part of the contract by default. If you didn't write down what was excluded, the courts will read in what the customer reasonably expected. The fix is a proper quote that lists scope, price, exclusions, payment milestones and start/finish dates, signed by both sides before tools come out.",
  },
  {
    id: 'mod5-s4-sub1-cert-purpose',
    question:
      "You've finished a domestic CU change. You hand the customer the EIC and they say 'oh just stick it in the drawer, I don't need to read it'. Should you push back, and what does the cert actually do for them?",
    options: [
      "No — if they don't want it, that's their choice.",
      "Yes. The Electrical Installation Certificate is the legal record that the install meets BS 7671, required by Reg 644.1.1. It's their evidence of competent work for insurance, future house sale (HIP/EICR comparison), warranty claims and any future electrician needing to know what was tested. Walk them through the front sheet, the schedule of test results, and the recommended retest interval before you leave — and post-issue a digital copy to their email so it can't be lost.",
      "No — only commercial customers need certificates.",
      "Yes — but only because they have to sign it, not because they need it.",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 Reg 644.1.1 requires an EIC to be issued to the person ordering the work for every new installation, addition or alteration. Its purpose is fourfold: it's the legal proof of competent install, it satisfies Building Regulations Part P notification (when notified through a scheme), it's the baseline for any future EICR, and it's evidence the customer needs for buildings/contents insurance. 'Stick it in a drawer' is the apprentice's cue to walk the customer through what they're holding so they understand what to do with it.",
  },
  {
    id: 'mod5-s4-sub1-cut-out-location',
    question:
      "Six months after a kitchen install, the customer rings the office in a panic — there's a smell of burning and they need to kill the supply. They can't find the cut-out. What should the install paperwork have done to make this a 30-second answer instead of a 30-minute search?",
    options: [
      'Nothing — the cut-out is the DNO\'s problem, not yours.',
      "The EIC front sheet should have recorded the cut-out location in plain English ('under-stairs cupboard, behind the boxing'), the as-installed drawing should mark its position on the floor plan, and the user instruction pack should include a one-page 'in an emergency' card with the cut-out location, the main switch location and the firm's out-of-hours number. The customer shouldn't be searching when they need to switch off.",
      'Only flag it on the cert — drawings are optional.',
      'Nothing extra — the cut-out is always near the meter, customers should know that.',
    ],
    correctIndex: 1,
    explanation:
      "The cut-out and the main switch locations are the two pieces of information a customer needs in an emergency. Recording them clearly on the EIC, the drawing and a separate emergency card is what turns a panicked phone call into a 30-second answer. BS 7671 doesn't mandate the emergency card explicitly but the Code of Practice on aftercare expects it, and customer-experience-led firms make it part of every handover pack. It also reduces your out-of-hours call volume.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which document specifies the SCOPE of the work, the PRICE, what's included, what's excluded and the payment terms — before any work starts?",
    options: [
      'The job sheet.',
      "The quote (or estimate, if the price is provisional). It captures scope, price, exclusions, payment milestones, lead-times and any assumptions. A signed quote forms the basis of the contract under the Consumer Rights Act 2015 — anything not in the quote is open to interpretation by the customer.",
      'The certificate.',
      'The user manual.',
    ],
    correctAnswer: 1,
    explanation:
      "Quote vs estimate: a quote is a fixed price; an estimate is a best-guess that can change. Either way the document scopes the work and protects both sides. The Consumer Rights Act 2015 s.50 makes pre-contract statements binding, so anything you said in the quote (or in conversation that the customer relied on) becomes part of the contract by default.",
  },
  {
    id: 2,
    question:
      "A customer signs a quote. Under the Consumer Rights Act 2015, what does s.49 require of you when you actually do the work?",
    options: [
      "Nothing — once the price is agreed, the law is silent.",
      "That the service is performed with 'reasonable care and skill'. This is a statutory implied term that can't be excluded by your terms and conditions. If the work falls below the standard a competent electrician would deliver, the customer has a right to repeat performance or a price reduction under s.55 and s.56.",
      "That the work is done at the lowest possible cost.",
      "That the customer has to accept whatever quality you deliver.",
    ],
    correctAnswer: 1,
    explanation:
      "Consumer Rights Act 2015 s.49 is the headline duty for services — reasonable care and skill, in line with what a competent electrician would do. It applies regardless of what the contract says. s.55 (repeat performance) and s.56 (price reduction) are the customer's remedies when the standard isn't met. The cert and the test results are your evidence that you discharged the duty.",
  },
  {
    id: 3,
    question:
      "What's the PURPOSE of a job sheet (sometimes called a worksheet or visit record)?",
    options: [
      "To replace the certificate.",
      "To record what was actually done on the visit — labour hours, materials used, parts replaced, tests performed, customer comments, photos. It's the contemporaneous record that supports the invoice, feeds into the cert, and protects the firm if there's a later complaint about scope or quality.",
      "To replace the quote.",
      "To collect the customer's signature for marketing consent only.",
    ],
    correctAnswer: 1,
    explanation:
      "Job sheets are the connective tissue between the quote (what was agreed) and the invoice (what gets paid). They also feed into the EIC test schedule, the firm's labour-tracking and the customer's audit trail. Without a job sheet a complaint becomes one person's memory against another's — with one, you've got dated notes, photos and signatures.",
  },
  {
    id: 4,
    question:
      "Which BS 7671 regulation requires an Electrical Installation Certificate (EIC) to be issued for new installations, additions and alterations?",
    options: [
      'Reg 411.3.2',
      "Reg 644.1.1 — 'Upon completion of inspection and testing of an installation or an addition or alteration to an installation, an Electrical Installation Certificate based on the model in Appendix 6, together with a Schedule of Inspections (or Schedule of Items Inspected) and a Schedule of Test Results, shall be given to the person ordering the work.'",
      'Reg 132.16',
      'Reg 514.9.1',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Reg 644.1.1 is the legal hook for the EIC. The model forms in Appendix 6 set the layout. The cert is issued to the person ordering the work — usually the customer, sometimes the principal contractor on a commercial job. It must include the schedule of inspections and the schedule of test results.",
  },
  {
    id: 5,
    question:
      "What's the PURPOSE of the user instructions handed over with a fire alarm panel, an EV charger or a smart heating control?",
    options: [
      "Marketing material for the manufacturer.",
      "To enable the customer to operate the install correctly, recognise fault conditions, perform any user-level routine checks (e.g. weekly fire-alarm test) and know when to call you back. Without them the customer can't discharge their own legal duties (e.g. fire-alarm log under the Regulatory Reform (Fire Safety) Order 2005) and is more likely to mis-use or under-maintain the kit.",
      "Optional — they only matter if the customer asks.",
      "Replacement for the certificate.",
    ],
    correctAnswer: 1,
    explanation:
      "User instructions are part of the handover legally implied under Consumer Rights Act 2015 (services must be fit for purpose) and explicitly required for fire alarm systems under BS 5839-1 (logbook + user instructions), for EV chargers under BS EN IEC 61851 / installer guidance, and for many other systems via the manufacturer's instructions. 'They can google it' isn't a defence when the customer trips a fault and floods the boiler room.",
  },
  {
    id: 6,
    question:
      "What goes on an as-installed drawing that wouldn't be on the original design drawing?",
    options: [
      'Nothing — they should be identical.',
      "The actual cable routes, fitting positions, junction-box locations, cable sizes used (where they differ from design), any deviations from the design and the reasons for them. As-installed drawings record what's actually in the wall, ceiling and floor void — so the next electrician (or the customer's plumber drilling for a new radiator) knows what they're dealing with.",
      "The price only.",
      "The customer's contact details.",
    ],
    correctAnswer: 1,
    explanation:
      "Design drawings show the intent; as-installed drawings show the reality. They diverge on almost every job — joists run differently than expected, a wall turns out to be brick rather than stud, a customer asks for an extra socket on the day. Recording the actual install on the drawing, and giving the customer a copy, is what stops a future trade drilling through your cable.",
  },
  {
    id: 7,
    question:
      "A customer rings six months after a CU change saying 'I can't find the manual for the new RCBO'. What handover document should have prevented that call?",
    options: [
      "Just point them at Google.",
      "The handover pack — a single document (paper or digital) listing every piece of equipment installed with the manufacturer's part number, the serial number, the warranty period and a link to the user manual. Plus contact details for in-warranty service and the firm's after-care number.",
      "The invoice.",
      "Nothing — RCBOs don't have manuals.",
    ],
    correctAnswer: 1,
    explanation:
      "The handover pack is the customer's reference for everything they now own. A well-built pack collects together: EIC, schedule of test results, as-installed drawings, manufacturer manuals (paper or PDF), warranty cards, registration confirmations, the emergency-contact card and the maintenance schedule. It saves the customer (and your support inbox) from chasing manuals six months later.",
  },
  {
    id: 8,
    question:
      "A landlord asks for a copy of an EICR you carried out two years ago because they're selling the flat. The original is in their tenant's drawer somewhere. What's your obligation, and why does it matter that you can produce one?",
    options: [
      "Refuse — once the cert is issued you have no further obligation.",
      "You should have kept a copy in the firm's records (paper or digital). Most contractor schemes (NICEIC, NAPIT, ELECSA) require record retention of 6 years minimum, and the Limitation Act 1980 sets the same window for civil claims arising from negligence. Re-issuing a copy is straightforward if you have the records, embarrassing if you don't.",
      "Hand-write a new one from memory.",
      "Tell them to ring the manufacturer.",
    ],
    correctAnswer: 1,
    explanation:
      "Certificates are records the firm needs for at least 6 years to defend a claim under the Limitation Act 1980 and to comply with the contractor scheme rules (NICEIC, NAPIT, ELECSA, STROMA). Beyond compliance, being able to re-issue a clean copy on request is what marks a professional firm out — it's also a good marketing moment because it triggers the customer's next-door neighbour to ask the same firm for a survey.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question:
      "What's the difference between a quote and an estimate, and does the customer notice?",
    answer:
      "A quote is a fixed price that you're committing to. An estimate is your best guess at the cost based on what you know now — it can change if the work uncovers something unexpected. Customers absolutely notice the difference when the bill arrives and it's different from the number they remember, so the document needs to say 'QUOTE' or 'ESTIMATE' clearly at the top, and your conversation should reinforce which one you've given. Estimates should also list the conditions under which the price could change (e.g. 'if the customer's existing earthing is found to be inadequate, additional work to bring up to BS 7671 will be quoted separately').",
  },
  {
    question:
      "If the customer signs the quote, does that mean we have a contract?",
    answer:
      "Most of the time yes, provided the quote covers price, scope and the basics (who, what, when, payment terms). For domestic work the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 require certain pre-contract information to be given to the consumer (off-premises and distance contracts), and in some cases the consumer has a 14-day cooling-off period that has to be flagged in writing. Many firms use a separate short-form contract document on top of the quote to cover the regulatory bits and standardise the T&Cs.",
  },
  {
    question:
      "Do I need to give the customer a job sheet if they didn't ask for one?",
    answer:
      "Yes — and you should keep a signed copy yourself. The job sheet is the contemporaneous record of what happened on the visit. If the customer later disputes the bill or claims the work wasn't done properly, your job sheet (signed at the time) is your strongest evidence. Most modern field-service apps generate them automatically with photo evidence and a customer signature on the screen, then email a PDF to the customer immediately.",
  },
  {
    question:
      "What goes in a 'handover pack' and is it different from the cert?",
    answer:
      "A handover pack collects everything the customer needs to live with the install: the EIC (and where applicable the EICR or MWC), schedule of test results, as-installed drawings, manufacturer manuals, warranty cards, your emergency contact details, an emergency-shutdown card showing where the cut-out and main switch are, and the maintenance schedule. It's the customer's reference manual for their install. The cert is one component of the pack — the legal proof of competent work — but the pack as a whole is what the customer actually uses day to day.",
  },
  {
    question:
      "Is a digital copy of the EIC as good as a paper one?",
    answer:
      "Yes, BS 7671 doesn't mandate paper. Most modern contractor scheme apps (NICEIC OneCert, NAPIT app, etc.) generate digital EICs that are signed electronically and emailed as PDF. The customer's copy can be digital. Many customers prefer it because they can't lose it. The firm's record copy should also be stored digitally with a 6+ year retention window. If the customer wants paper, print one — but don't push a paper-only workflow unless they ask.",
  },
  {
    question:
      "What's the legal minimum I have to give a domestic customer at the end of a job?",
    answer:
      "Under BS 7671 Reg 644.1.1, an EIC for any new installation, addition or alteration (or a Minor Works Certificate where the work scope is limited per Reg 644.5). Under the Building Regulations Part P, notification of notifiable work to the local authority (or via your scheme membership). Under the Consumer Rights Act 2015, an invoice that reflects the agreed price plus any agreed variations. In practice you also need: as-installed information for any new circuit, manufacturer instructions for any new equipment installed, and aftercare contact details. The handover pack is how you bundle all of that together.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 5 · Section 4 · Subsection 1"
            title="Purpose of customer information"
            description="Every customer-facing document on a job has a single defensible purpose. Get any one of them wrong and the customer (or their solicitor) has the gap they need."
            tone="emerald"
          />

          <TLDR
            points={[
              "There are eight customer-facing documents on a typical electrical job — quote, contract, job sheet, invoice, certificate, user instructions, manufacturer data and as-installed drawings. Each one has a distinct purpose and a legal hook.",
              "The quote scopes the work and locks the price. The contract turns the quote into a binding agreement under the Consumer Rights Act 2015. Anything you didn't write down, the customer gets to fill in their own version of.",
              "The certificate (EIC, EICR, MWC, scheme cert) is the legal record of competent work, required by BS 7671 Reg 644.1.1. The handover pack is the customer's living reference — emergency cut-out location, manuals, warranty info, your number for when something goes wrong.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the purpose of information given to customers (Unit 210 AC 2.3, verbatim).",
              "List the eight customer-facing documents typically issued on an electrical install — quote, contract, job sheet, invoice, certificate, user instructions, manufacturer data and as-installed drawings — and explain the purpose of each.",
              "State the duty under the Consumer Rights Act 2015 s.49 to perform services with reasonable care and skill.",
              "State the duty under BS 7671 Reg 644.1.1 to issue an Electrical Installation Certificate to the person ordering the work.",
              "Explain why recording the cut-out location and main switch position in the handover pack matters in an emergency.",
              "Recognise the role of the handover pack as the customer's day-to-day reference, and why it differs from the certificate.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters before you write a single document</ContentEyebrow>

          <ConceptBlock
            title="Customer paperwork is a contract chain — every document supports the next"
            plainEnglish="The quote becomes the contract. The contract becomes the job sheet. The job sheet becomes the invoice. The invoice references the cert. The cert sits in the handover pack with the manuals and the as-installed drawing. None of these documents stand alone — they form a chain that proves what was agreed, what was done, and what the customer was given. Break the chain anywhere and you've got a complaint risk."
            onSite="Apprentices tend to see paperwork as 'office stuff' that the firm sorts out later. In reality the field-service app on your phone is generating the chain in real time — your photos go on the job sheet, your test results go on the cert, the customer's signature on the screen closes the contract. The quality of the paperwork is set by what you record on the day, not what the office types up later."
          >
            <p>
              The chain works in two directions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Forwards (defence) — when the customer complains six months later, the chain is
                the evidence of what was agreed (quote/contract), what was done (job sheet,
                cert), and what was handed over (handover pack). Each document references the
                next.
              </li>
              <li>
                Backwards (clarity) — when you arrive on site, the chain tells you what the
                customer was promised, what other trades have already done, and what equipment
                is in the install. A clean chain on a returning visit cuts your time on site
                dramatically.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The eight customer-facing documents</ContentEyebrow>

          <ConceptBlock
            title="Quotes — scope, price, exclusions, terms"
            plainEnglish="A quote is a written statement of what work you'll do, what it'll cost, what's included, what's excluded and on what payment terms. It's the document the customer signs (or accepts in writing) before any work starts, and it's the foundation of the contract."
            onSite="A common apprentice misunderstanding is that a quote is just a price. It isn't — it's the full scope. Listing the circuits, accessories, run routes, what's included (e.g. making good after chasing) and what's not (e.g. redecorating the chase line) is what stops the customer claiming you were going to do something you weren't."
          >
            <p>
              A good quote contains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Customer details, site address, your firm's details and registration numbers.
              </li>
              <li>
                Scope — itemised, with quantities (number of sockets, length of trunking,
                model and rating of CU, etc.).
              </li>
              <li>
                Price — fixed quote or labour-and-materials estimate, clearly labelled.
              </li>
              <li>
                Exclusions — what you're NOT doing (decorating, plastering chases beyond
                first-fix, building work, customer-supplied equipment).
              </li>
              <li>
                Payment terms — deposit, milestones, final payment, methods accepted.
              </li>
              <li>
                Lead-time, expected start and finish dates, validity period of the quote.
              </li>
              <li>
                T&Cs — variations, cancellations, warranty, dispute resolution.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Contracts — the signed agreement that the quote becomes"
            plainEnglish="A contract is what you have once both sides have agreed on the quote and the customer has either signed it or accepted it in writing (an email saying 'go ahead' is enough for most jobs). The Consumer Rights Act 2015 then implies a layer of statutory terms on top — reasonable care and skill, fitness for purpose, conformity with description — that you can't contract out of."
            onSite="For most domestic work the signed quote IS the contract. For larger jobs (rewires, commercial fit-outs) you'll want a separate contract document setting out variations, payment retention, force majeure and dispute resolution. The customer's signature on the quote (or a clear written 'go ahead') is what the courts will treat as acceptance."
          >
            <p>
              Key contract issues that catch apprentices and small firms out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Variations</strong> — extras added on the day. The contract should
                require variations to be agreed in writing (text, email, signed VO sheet)
                BEFORE the work is done. Verbal 'while you're there' requests that get billed
                later are the classic dispute trigger.
              </li>
              <li>
                <strong>Cooling-off period</strong> — for off-premises consumer contracts
                (e.g. a quote you give in the customer's kitchen rather than from your trade
                counter), the Consumer Contracts Regulations 2013 give the consumer 14 days
                to cancel. You have to tell them this in writing and provide a cancellation
                form, or the period extends to 12 months.
              </li>
              <li>
                <strong>Statutory terms</strong> — Consumer Rights Act 2015 s.49 (reasonable
                care and skill), s.50 (information binding), s.52 (performance within
                reasonable time). These apply automatically and override any conflicting T&C.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Job sheets — what was actually done on the visit"
            plainEnglish="A job sheet (or worksheet, or visit record) is the contemporaneous record of one visit — labour hours, materials used, tests performed, photos taken, customer comments, customer signature. It's what feeds into the invoice and the certificate, and it's what defends you in a complaint."
            onSite="Modern field-service apps (Joblogic, Commusoft, ServiceM8, your firm's own) generate job sheets automatically on the phone. Photos go in, signatures go on the screen, the PDF emails to the customer when you close the visit. The discipline is to fill it in DURING the visit, not from memory in the van afterwards."
          >
            <p>
              A defensible job sheet records:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Date, start and finish times, names of operatives on site.
              </li>
              <li>
                Reference to the quote / contract / works order it was carried out under.
              </li>
              <li>
                Tasks completed (with reference to the scope), tasks NOT completed (and why).
              </li>
              <li>
                Materials used (so the invoice can be reconciled and stock can be deducted).
              </li>
              <li>
                Test results (where applicable — these flow through to the cert too).
              </li>
              <li>
                Photos — before, during, after — particularly of anything customer-visible
                that might be disputed later.
              </li>
              <li>
                Customer comments and customer signature confirming acceptance of the work
                done on the visit.
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

          <ConceptBlock
            title="Invoices — the bill, with VAT, payment terms and the means to pay"
            plainEnglish="The invoice is the formal bill the customer pays from. It needs to be unambiguous, properly numbered, VAT-compliant if you're VAT-registered, and reference the quote and the job sheet so the customer can see what they're paying for."
            onSite="Most field-service apps push the job sheet into a draft invoice automatically — your job is to check the line items match what was agreed (any variations should already be on the VO sheet), the VAT treatment is right, and the payment terms are in line with the contract. Sending the invoice within a couple of days of finishing keeps the cash flow tight."
          >
            <p>
              A compliant UK trade invoice contains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Your firm's name, address, registration numbers (Companies House if Ltd, VAT
                number if VAT-registered).
              </li>
              <li>
                Customer name and billing address (which may differ from the site address).
              </li>
              <li>
                Unique invoice number, invoice date, due date.
              </li>
              <li>
                Itemised lines for labour, materials and any other costs, with quantities
                and unit prices where relevant.
              </li>
              <li>
                Subtotal, VAT (with rate stated), total. For VAT invoices, the VAT must be
                shown separately (HMRC rules).
              </li>
              <li>
                Payment terms (net 14, net 30, etc.), payment methods accepted, bank details
                or payment link.
              </li>
              <li>
                Reference back to the quote / works order and the job sheet.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Certificates — EIC, EICR, MWC, scheme certificate"
            plainEnglish="The certificate is the legal record that the install meets BS 7671 (or, for an EICR, the report on whether an existing install meets it). For new work you issue an EIC (full install or addition) or an MWC (minor alteration limited per Reg 644.5). For inspection-only work you issue an EICR. For scheme-notified work you issue a scheme cert (NICEIC, NAPIT etc.) which doubles as the Building Regs Part P notification."
            onSite="The cert is the apprentice's most-handled customer document because it's the formal output of the test results you've been writing on the schedule. Your job is to make sure the front sheet is filled in correctly (cut-out location, supply characteristics, earthing arrangement, position 'inspected by'), the schedule of inspections is honest (every line ticked or marked N/A with a reason), and the schedule of test results matches what your MFT measured."
          >
            <p>
              The four cert types you'll meet most often:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EIC (Electrical Installation Certificate)</strong> — for new installs,
                additions and alterations beyond minor. Required by BS 7671 Reg 644.1.1.
              </li>
              <li>
                <strong>MWC (Minor Electrical Installation Works Certificate)</strong> — for
                additions and alterations that don't include a new circuit (Reg 644.5). Common
                for adding a socket or replacing a fitting.
              </li>
              <li>
                <strong>EICR (Electrical Installation Condition Report)</strong> — for periodic
                inspection of an existing install. Lists observations with C1/C2/C3/FI codes
                and an overall satisfactory/unsatisfactory verdict.
              </li>
              <li>
                <strong>Scheme certificate</strong> — issued by your contractor scheme
                (NICEIC, NAPIT, ELECSA, STROMA) and serves as Building Regs Part P
                notification for notifiable work.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="User instructions — how to operate the install"
            plainEnglish="User instructions tell the customer how to operate the kit you've just installed — turning the heating on, testing the fire alarm panel monthly, charging the EV, resetting an RCBO after a trip, knowing what the LED indicators on the consumer unit mean."
            onSite="For most domestic kit the manufacturer provides a user manual — your job is to make sure the customer gets a copy (paper or PDF) AND that you've walked them through the key bits before you leave. 'It's all in the manual' isn't a handover — five minutes pointing at the panel and getting them to do a test under your watch is."
          >
            <p>
              What the customer needs in plain English:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                How to operate the install day to day — turning circuits on/off, using the
                main switch, resetting an RCBO after a trip.
              </li>
              <li>
                How to perform any user-level routine checks (fire alarm weekly test, RCD
                test button quarterly, heat alarm battery check).
              </li>
              <li>
                What the indicator lights mean — green is healthy, amber is fault, red is
                emergency. Apply to fire alarm panel, EV charger, smart heating.
              </li>
              <li>
                What to do in an emergency — where the cut-out is, where the main switch is,
                who to ring out of hours.
              </li>
              <li>
                When to call you back — symptoms that mean it's not safe to keep using
                (burning smell, frequent trips, flickering, hot accessories).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Manufacturer data — warranty, servicing, technical specs"
            plainEnglish="Manufacturer data is the technical and warranty documentation that comes with every piece of kit you install — the consumer unit, each RCBO, the fire alarm panel, the EV charger. The customer needs it for warranty claims, the next electrician needs it for fault-finding."
            onSite="Most modern kit ships with a QR code linking to the latest PDF — registration, warranty, technical sheet. Your job is to register the warranty in the customer's name (some manufacturers require this within 30 days), file the PDFs in the handover pack, and make sure any warranty paperwork is in the customer's name not yours."
          >
            <p>
              What manufacturer data needs to cover:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Make, model, serial number — so the customer (and any future trade) can
                identify exactly what's installed.
              </li>
              <li>
                Warranty terms — duration, what's covered, how to claim.
              </li>
              <li>
                Servicing requirements — what the user can do, what needs a competent person,
                what the service interval is.
              </li>
              <li>
                Technical specs — electrical ratings, environmental limits, replacement parts
                catalogue.
              </li>
              <li>
                Manufacturer's contact details for in-warranty support.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="As-installed drawings — where the wires actually went"
            plainEnglish="As-installed drawings (sometimes called 'as-built' or 'red-line drawings') record where cables, accessories and equipment ACTUALLY ended up — which often differs from the design drawings because of joist directions, hidden services and last-minute customer changes. They're the customer's reference for the next electrician, and they protect you when a future trade drills through your cable."
            onSite="On a domestic install the as-installed drawing might be a marked-up floor plan with cable routes in coloured pen. On a commercial fit-out it's a formal CAD update. Either way the rule is the same — record what's actually there, not what was supposed to be there. A photo with a tape measure of an exposed first-fix is a perfectly good record."
          >
            <p>
              An as-installed drawing should record:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Cable routes — in walls, under floors, in ceiling voids — with depth and
                orientation indicated.
              </li>
              <li>
                Accessory positions — sockets, switches, lights, smoke alarms, fire alarm
                devices.
              </li>
              <li>
                Distribution equipment — CU position, sub-board positions, isolators,
                meter positions.
              </li>
              <li>
                Junction boxes and concealed terminations — particularly anything that's
                been buried in plaster or under flooring.
              </li>
              <li>
                Cable sizes used (especially where they differ from the design) and circuit
                references that match the cert schedule.
              </li>
              <li>
                Any deviations from the design and the reason for each (e.g. 'route changed
                to avoid existing gas pipe').
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Consumer Rights Act 2015 — s.49"
            clause={
              <>
                &quot;Every contract to supply a service is to be treated as including a term
                that the trader must perform the service with reasonable care and skill.&quot;
              </>
            }
            meaning={
              <>
                s.49 is the headline statutory duty for every consumer service contract,
                including electrical work. &quot;Reasonable care and skill&quot; means what a
                competent electrician would do &mdash; aligned with BS 7671, the manufacturer&apos;s
                instructions and current industry guidance. It can&apos;t be excluded by your
                T&amp;Cs (s.57). The customer&apos;s remedy when the standard isn&apos;t met is
                repeat performance (s.55) or a price reduction (s.56). The cert and the
                schedule of test results are your evidence that you discharged the duty.
              </>
            }
            cite="Source: Consumer Rights Act 2015 (c.15), Part 1 Chapter 4, s.49 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 644.1.1"
            clause={
              <>
                &quot;Upon completion of inspection and testing of an installation or an addition
                or alteration to an installation, an Electrical Installation Certificate based
                on the model in Appendix 6, together with a Schedule of Inspections (or
                Schedule of Items Inspected) and a Schedule of Test Results, shall be given to
                the person ordering the work.&quot;
              </>
            }
            meaning={
              <>
                Reg 644.1.1 is the legal hook for the EIC. &quot;Person ordering the work&quot;
                is usually the customer for domestic work, often the principal contractor on
                commercial. The cert MUST be accompanied by both schedules &mdash; an EIC on
                its own without the schedules is incomplete and won&apos;t satisfy the reg or
                the contractor scheme audit. Issuing the cert is what closes the regulatory
                loop &mdash; without it the install is technically non-compliant even if the
                wiring is perfect.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022, Reg 644.1.1 — verbatim from the Wiring Regulations."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The handover pack — bringing it all together</ContentEyebrow>

          <ConceptBlock
            title="The handover pack is the customer's living reference for the install"
            plainEnglish="When you finish a job the customer should leave the visit holding (or having been emailed) one organised pack containing every piece of paper they'll ever need about that install — cert, drawings, manuals, warranty info, your contact details, an emergency-shutdown card. It's not bureaucracy; it's the difference between a customer who calls you back for the next job and one who can't remember which firm did the work."
            onSite="On a domestic install the handover pack is typically a labelled folder (paper) plus a PDF bundle (digital). On a commercial install it might be a formal O&M (Operation and Maintenance) manual running to several volumes, with sign-off by the principal contractor. The principle is the same in both — one place for everything."
          >
            <p>
              A standard domestic handover pack includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Front sheet</strong> — summary of the install, date, your firm,
                contact details, a one-line emergency-contact card.
              </li>
              <li>
                <strong>Certificates</strong> — EIC (or MWC) plus the schedules. For an EICR
                visit, the EICR plus its schedule.
              </li>
              <li>
                <strong>Test results</strong> — the schedule of test results showing every
                circuit's R1+R2, IR, Zs etc.
              </li>
              <li>
                <strong>System spec</strong> — equipment installed, with model and serial
                numbers.
              </li>
              <li>
                <strong>Zone chart / circuit list</strong> — what each circuit serves, in
                plain English.
              </li>
              <li>
                <strong>Manufacturer manuals</strong> — for every piece of new kit (paper or
                links).
              </li>
              <li>
                <strong>Warranty info</strong> — registration confirmations, claim contacts,
                expiry dates.
              </li>
              <li>
                <strong>Maintenance schedule</strong> — what needs doing when (annual EICR
                if rented, fire-alarm service intervals, EV charger checks).
              </li>
              <li>
                <strong>Emergency card</strong> — cut-out location, main switch location,
                out-of-hours number.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 514.9.1 (diagrams, charts and tables)"
            clause={
              <>
                Paraphrased: A diagram, chart or table (or equivalent form of information) shall
                be provided indicating in particular: the type and composition of each circuit;
                the method used for protection against electric shock; the information necessary
                for the identification of devices performing protection, isolation and switching;
                and any circuit or equipment vulnerable to a typical insulation or other test.
                For domestic premises a simplified equivalent is acceptable.
              </>
            }
            meaning={
              <>
                Reg 514.9.1 makes the as-installed schematic part of the install itself, not just
                the handover paperwork. On a CU change you typically fix a copy of the schematic
                inside the CU door &mdash; small, laminated, labelled per circuit. The customer&apos;s
                handover-pack copy is the same drawing in larger format. The reg ties the documentation
                requirement back to the consumer unit, where it&apos;s most useful in an emergency
                or fault-finding visit.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022, Reg 514.9.1 — paraphrased; refer to the Wiring Regulations for full wording."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Not labelling the cut-out location on the EIC and handover pack"
            whatHappens={
              <>
                Customer rings the office at 11pm in a panic &mdash; smell of burning, sparks
                from a socket, can&apos;t find the main switch. The cert front sheet has
                &quot;cut-out location&quot; left blank because the apprentice was rushing.
                The customer searches the house for ten minutes while the fault gets worse.
                In the worst case it leads to a small fire that becomes a big fire because
                they couldn&apos;t kill the supply quickly. The complaint that follows points
                straight at the cert &mdash; &quot;why didn&apos;t you tell me where it was?&quot;
              </>
            }
            doInstead={
              <>
                Fill in the cut-out location field on the EIC front sheet in plain English &mdash;
                &quot;under-stairs cupboard, behind the boxing&quot;, &quot;external meter box,
                left of front door&quot;. Add the same information to the handover pack&apos;s
                emergency card and to the as-installed drawing. Walk the customer to the cut-out
                during the handover and physically point at it. Twenty seconds of pointing on
                the day saves twenty minutes of panic at 11pm.
              </>
            }
          />

          <CommonMistake
            title="Treating the quote as the price only, not the scope"
            whatHappens={
              <>
                Apprentice scribbles &quot;Kitchen rewire &mdash; £2,800&quot; on a quote pad,
                hands it over, customer agrees verbally. Two weeks in the customer says
                &quot;and the downlights, obviously&quot;. Apprentice didn&apos;t know
                downlights were in scope. There&apos;s no detail on the quote to fall back on.
                The customer escalates, leaves a one-star review, the firm absorbs the cost
                of supplying and fitting downlights to keep the peace.
              </>
            }
            doInstead={
              <>
                Every quote lists the work in detail &mdash; circuits, accessories, runs, what&apos;s
                included, what&apos;s explicitly EXCLUDED. The exclusions list is the most
                important paragraph because it&apos;s where misunderstandings get prevented.
                Use a templated quote builder in your firm&apos;s field-service app, get the
                customer to sign (or accept by email) before tools come out, and any variation
                gets its own VO sheet signed before the variation work starts.
              </>
            }
          />

          <Scenario
            title="Customer asks 'where's my user manual for the new fire alarm panel?' six months after install"
            situation={
              <>
                Six months ago you installed a Grade D LD2 fire alarm system in a converted
                HMO &mdash; mains-powered interlinked smokes plus a heat in the kitchen. The
                customer rings the office today asking for the user manual because their letting
                agent wants to see the system spec before renewing the gas-safe and EICR cycle.
                Nobody at the office can find a copy.
            </>
            }
            whatToDo={
              <>
                Pull up the original handover pack &mdash; if your firm uses a field-service
                app, the PDF bundle should still be on the customer&apos;s record. The pack
                should contain: front sheet (system summary), the EIC for the install, the
                Grade D / LD2 system specification (manufacturer model, sensor positions),
                the zone chart showing where each device is fitted, the maintenance schedule
                (BS 5839-6 user-checks plus the annual contractor service), the manufacturer
                manual for the panel and the sounders, and the emergency contact card. Re-issue
                the whole pack to the customer by email and post a paper copy if they want
                one. If the original pack ISN&apos;T on file, that&apos;s a process gap to
                escalate &mdash; raise it with the supervisor so the firm&apos;s handover SOP
                gets updated to enforce digital archiving on every job.
            </>
            }
            whyItMatters={
              <>
                Fire-alarm handover packs are not optional &mdash; BS 5839-1 (commercial)
                and BS 5839-6 (domestic) both require the user to be left with a logbook,
                a system specification and instructions. For a rented property the letting
                agent and the landlord both have legal duties under the Regulatory Reform
                (Fire Safety) Order 2005 (HMOs) and the Smoke and Carbon Monoxide Alarm
                (England) Regulations 2015 (general lets) that depend on having the system
                paperwork. Losing the pack puts the landlord in regulatory breach and reflects
                badly on the installing firm. Defensible record retention is what stops this
                being a one-customer problem and starts being an audit issue across every job.
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
              "There are eight customer-facing documents on a typical electrical job — quote, contract, job sheet, invoice, certificate, user instructions, manufacturer data and as-installed drawings. Each has a defined purpose and a legal hook.",
              "The quote scopes the work AND locks the price. A bare price isn't a quote — it's an invitation to dispute. The exclusions paragraph is the single most important part because it prevents misunderstanding.",
              "Consumer Rights Act 2015 s.49 requires services to be performed with 'reasonable care and skill'. It can't be excluded by your T&Cs and applies regardless of what the contract says.",
              "BS 7671 Reg 644.1.1 requires an EIC (with both schedules) to be issued to the person ordering the work for every new install, addition or alteration. Without it the install is non-compliant even if the wiring is perfect.",
              "The handover pack is the customer's living reference — cert, drawings, manuals, warranty info, your number and an emergency-shutdown card with the cut-out location. Walk them through it before you leave.",
              "The cut-out location and main switch position should be recorded on the EIC front sheet, the as-installed drawing AND the emergency card. Three places — because in a panic the customer will only find one of them.",
              "Job sheets are the contemporaneous record of one visit. Photos in, signature on the screen, PDF emailed to the customer when you close the visit. Your strongest defence in a complaint.",
              "Record retention — most contractor schemes require 6 years minimum, the Limitation Act 1980 sets the same window for civil claims. Keep digital copies of every cert and handover pack.",
            ]}
          />

          <Quiz title="Customer information — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.5 Site diary and time sheets
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Company policies and working relationships
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
