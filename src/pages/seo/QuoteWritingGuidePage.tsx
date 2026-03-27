import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  PoundSterling,
  CheckCircle,
  AlertTriangle,
  Clock,
  ClipboardList,
  Users,
  Building2,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/business' },
  { label: 'Quote Writing Guide', href: '/quote-writing-guide' },
];

const tocItems = [
  { id: 'why-quotes-matter', label: 'Why Professional Quotes Matter' },
  { id: 'quote-structure', label: 'Professional Quote Structure' },
  { id: 'pricing-strategy', label: 'Pricing Strategy' },
  { id: 'materials-labour', label: 'Materials and Labour Breakdown' },
  { id: 'contingency', label: 'Contingency and Risk Allowance' },
  { id: 'payment-terms', label: 'Payment Terms and Schedules' },
  { id: 'what-to-include', label: 'What to Include to Avoid Disputes' },
  { id: 'follow-up', label: 'Follow-Up Strategy' },
  { id: 'for-electricians', label: 'Tools for Professional Quoting' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A professional written quote protects you legally and financially. An informal verbal quote or a WhatsApp message is not a contract — disputes about scope and price are far more common without a written document.',
  'The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 give domestic customers a 14-day cooling-off period on contracts entered into off-premises (e.g. in their home). Your quote should acknowledge this right.',
  'Always separate materials and labour in your quote. Customers who can see exactly what they are paying for raise fewer disputes. A single "lump sum" quote invites negotiation on the total.',
  'Payment terms must be stated in writing before work begins. For domestic customers, the most effective structure is a deposit (20 to 30 per cent), staged payments for larger jobs, and balance on practical completion.',
  'Follow up on every outstanding quote after five to seven working days. Studies consistently show that electricians who follow up win significantly more work than those who send a quote and wait.',
];

const faqs = [
  {
    question: 'What should an electrical quote include?',
    answer:
      'A professional electrical quote should include: your company name, address, and contact details; your NICEIC or NAPIT registration number; the customer\'s name and address; a detailed description of the works to be carried out; a breakdown of materials (with quantities where practical) and labour; the total price including VAT (if VAT-registered); your payment terms; the period for which the quote is valid (typically 30 days); what is specifically excluded from the price; and the applicable terms and conditions. For domestic customers, include the customer\'s cancellation rights under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.',
  },
  {
    question: 'Should I give a fixed price or an estimate?',
    answer:
      'A fixed price (or fixed-price quote) means you commit to completing the work for the stated amount regardless of how long it takes, within the defined scope. An estimate is an indication of likely cost that can change. For most domestic electrical work, a fixed price is strongly preferable — customers want certainty and are more likely to accept a fixed price than an open-ended estimate. Reserve estimates for work where the scope genuinely cannot be determined in advance (e.g. rewires of properties with concealed wiring where the true condition of circuits is unknown until opened up). Always be clear in your written quote which type of price you are giving.',
  },
  {
    question: 'How long should my electrical quote be valid for?',
    answer:
      'State a validity period of 30 days for most electrical quotes. This protects you against material price increases and allows you to manage your workload. For larger commercial jobs where the customer may need board approval, 60 days is reasonable. After the validity period expires, you can choose to honour the original price or requote. Always state the validity period clearly — without one, a customer could theoretically come back six months later and expect the original price to apply.',
  },
  {
    question: 'Do I need to show VAT on my electrical quote?',
    answer:
      'If you are VAT-registered (mandatory above the VAT registration threshold, currently £90,000 turnover in a rolling 12-month period), you must show prices including and excluding VAT, or clearly state that prices are "plus VAT at 20%". For domestic electrical installation work, the standard rate of VAT is 20 per cent. New residential construction can be zero-rated, and some energy efficiency installations (EV chargers, certain insulation) may qualify for the reduced 5 per cent rate. If you are not VAT-registered, state "prices are not subject to VAT".',
  },
  {
    question: 'Can I charge for producing a quote?',
    answer:
      'You can charge a survey or consultation fee that is redeemable against the work if the customer proceeds. This is most appropriate for large or complex jobs (full rewires, commercial fit-out) where the survey visit takes significant time. For straightforward domestic jobs, customers generally expect free quotes and charging a fee will cost you the opportunity. If you do charge a survey fee, this must be agreed with the customer before the visit — you cannot impose it after the fact.',
  },
  {
    question: 'What happens if the job takes longer than quoted?',
    answer:
      'On a fixed-price quote, additional time at your cost is your risk if the scope was clearly defined and you priced it incorrectly. However, if the additional work arises from scope changes requested by the customer, unforeseen conditions (e.g. concealed wiring in worse condition than visible inspection suggested), or instructions from the customer during the job, these are variations. Your terms and conditions should clearly state that variations will be quoted separately and that unforeseen conditions may affect the contract price. Issue a written variation order before carrying out any additional work, and get the customer to sign or confirm it in writing.',
  },
  {
    question: "What are the Consumer Contracts Regulations 2013 and do they apply to my quotes?",
    answer:
      'The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 implement the EU Consumer Rights Directive into UK law (retained post-Brexit). They apply to contracts with domestic (consumer) customers entered into off-premises — meaning in the customer\'s home, on the street, or anywhere other than your business premises. They give the customer a 14-day right to cancel without penalty. For electrical contractors who quote at the customer\'s property and then proceed with work, these regulations apply. If you start work within the 14-day cancellation period (with the customer\'s agreement), and the customer then cancels, they must pay for work completed up to the point of cancellation. Your quote should acknowledge these rights.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tender-writing-electrician',
    title: 'Tender Writing Guide',
    description: 'How to write and price winning commercial electrical tenders.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/contract-templates-electrician',
    title: 'Contract Templates',
    description: 'What to include in domestic customer contracts and payment schedules.',
    icon: ClipboardList,
    category: 'Guide',
  },
  {
    href: '/subcontracting-guide',
    title: 'Subcontracting Guide',
    description: 'How to subcontract electrical work and protect your payment rights.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/electrical-framework-contracts',
    title: 'Framework Contracts',
    description: 'Getting on local authority and housing association approved lists.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Build professional quotes with materials pricing, labour, and instant PDF export.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-quotes-matter',
    heading: 'Why Professional Electrical Quotes Matter',
    content: (
      <>
        <p>
          Most electrical disputes — whether about price, scope, or payment — begin with an
          inadequate quote. A formal written quote is not bureaucracy: it is your first line of
          legal protection and your most powerful sales tool. Customers who receive a clear,
          professional quote are more likely to accept it, less likely to dispute the invoice,
          and more likely to recommend you to others.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal protection</strong> — a written quote accepted by the customer forms
                the basis of a contract. If a dispute goes to the small claims court, a well-written
                quote showing agreed scope and price is strong evidence in your favour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope clarity</strong> — a detailed description of works prevents the
                customer from claiming you agreed to additional work at no extra cost. "Supply and
                fit 10 double sockets" is far better than "socket work".
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professionalism</strong> — research consistently shows that a professional
                written quote increases conversion rates. Customers perceive contractors who provide
                detailed, typed quotes as more competent and trustworthy than those who give verbal
                prices or WhatsApp messages.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'quote-structure',
    heading: 'Professional Electrical Quote Structure',
    content: (
      <>
        <p>
          A professional electrical quote follows a consistent structure that makes it easy for
          the customer to understand and compare, and easy for you to defend if challenged.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Header</strong> — your company name, logo, address, phone number, email,
                and company/VAT registration number. Include your NICEIC or NAPIT scheme number.
                Date of issue and a quote reference number for tracking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Customer details</strong> — full name, property address where the work
                will be carried out, and contact details. If different from the works address,
                include a separate billing address.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of works</strong> — describe in plain English what you will do,
                room by room or system by system. Be specific: "Install one 32A radial circuit
                in 6mm² cable from consumer unit to garage sub-board" is better than "garage
                supply". Include cable routes if known.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exclusions</strong> — state clearly what is not included: making good,
                plastering, painting, floor reinstatement, permit to work, scaffolding. This
                prevents post-completion disputes about work you never quoted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assumptions</strong> — note any assumptions you have made about site
                conditions. "Price assumes cable can be routed through existing loft space and
                existing consumer unit has spare ways" protects you if conditions are different.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pricing summary</strong> — materials subtotal, labour subtotal, VAT (if
                applicable), and total. For larger jobs, show a breakdown by area or phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payment terms and validity</strong> — when payment is due, how payment
                should be made, and the date by which the customer must accept the quote for
                the price to be honoured.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing-strategy',
    heading: 'Pricing Strategy for Electrical Work',
    content: (
      <>
        <p>
          Winning the most work at the lowest price is not a sustainable business strategy.
          Your pricing must recover all your costs, pay you fairly for your skills, and generate
          a profit that funds investment in your business. Chronic under-pricing is the leading
          cause of electrical business failure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know your minimum viable rate</strong> — calculate your total annual costs
                (van, insurance, tools, phone, accountancy, training, pension) and divide by your
                billable hours (typically 1,200 to 1,400 for a sole trader). This is the minimum
                hourly rate at which you break even. Add your required profit margin above this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price the job, not the hours</strong> — experienced electricians price
                based on the value of the job to the customer and their knowledge of what similar
                work costs, not purely on time. A consumer unit upgrade that takes three hours
                should be priced at what consumer unit upgrades cost, not at three times your
                day rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not discount the quote</strong> — if a customer asks you to lower
                your price, the correct response is to reduce the scope, not the margin. Offer
                to exclude making good, or use a different specification cable tray, or carry
                out the work in two visits rather than one. Discounting trains customers to
                always ask for discounts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'materials-labour',
    heading: 'Materials and Labour Breakdown',
    content: (
      <>
        <p>
          Showing a breakdown of materials and labour in your quote is strongly recommended.
          It is more transparent for the customer, easier to defend if challenged, and allows
          you to adjust the quote cleanly if the customer requests changes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials</strong> — list the key materials: consumer unit (manufacturer
                and model), cable specifications and approximate quantities, accessories (sockets,
                switches, luminaires), and any specialist items. You do not need to list every
                fixing and connector, but the major items should be visible. Mark up trade prices
                to your retail rate (typically 15 to 25 per cent above trade).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour</strong> — show estimated hours and your labour rate, or simply
                show a labour subtotal. You are not obliged to show your detailed labour build-up,
                but showing a labour figure separately from materials prevents disputes where the
                customer believes you are overcharging for materials you have "already paid for".
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and notification</strong> — include the cost of Part P
                Building Regulations notification (if required) and any test certificates
                (Electrical Installation Certificate, EICR) as a visible line item. Many
                customers do not realise these are a required part of the job and resist paying
                for them if they appear on the invoice without prior notice.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'contingency',
    heading: 'Contingency and Risk Allowance',
    content: (
      <>
        <p>
          Every electrical quote for domestic work carries some risk of unforeseen conditions.
          Building in a sensible contingency is not dishonest — it is responsible pricing.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concealed wiring</strong> — in older properties you cannot know the
                condition of existing wiring until it is accessed. State in your quote that
                "price assumes existing wiring is in satisfactory condition. Any additional
                remedial work required to existing circuits will be quoted separately."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos</strong> — in properties built before 2000, asbestos-containing
                materials may be present. If you suspect ACMs, the customer must arrange an
                asbestos survey before electrical work proceeds. State this explicitly in your
                quote.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access and working conditions</strong> — if access to the loft, under
                floor, or plant rooms is required, note any assumptions about accessibility. If
                a customer has already floored a loft, cabled runs take significantly longer
                and the additional cost is legitimate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material price validity</strong> — include a statement that material
                prices are based on current trade prices and are subject to change if the start
                date is more than 30 days after the quote date.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payment-terms',
    heading: 'Payment Terms and Payment Schedules',
    content: (
      <>
        <p>
          Clear payment terms stated upfront prevent the most common source of cashflow problems
          for electrical contractors. The Housing Grants, Construction and Regeneration Act 1996
          gives construction contractors (including subcontractors) statutory rights to interim
          payments — know these rights even for domestic work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deposit</strong> — for jobs over £500, take a deposit of 20 to 30 per
                cent on acceptance of the quote and before materials are ordered. For bespoke or
                custom-ordered items, a 50 per cent deposit on those items is reasonable. State
                the deposit requirement in your quote — customers expect it for professional
                contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Staged payments</strong> — for larger domestic jobs (rewires, extensions),
                stage payments reduce your exposure. A typical structure: 30 per cent deposit,
                30 per cent on completion of first fix, 30 per cent on completion of second fix,
                10 per cent on practical completion and handover of certificates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payment method and timing</strong> — state that payment is due on
                completion (for straightforward jobs) or within seven days of invoice. Accept
                bank transfer rather than cash for larger jobs — it creates a record and reduces
                the risk of payment disputes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Late payment</strong> — include a statement that late payment may incur
                interest under the Late Payment of Commercial Debts (Interest) Act 1998 at 8 per
                cent above base rate. This applies to business-to-business contracts. For domestic
                customers, state your own late payment terms (e.g. 2 per cent per month after
                14 days).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-include',
    heading: 'What to Include to Avoid Disputes',
    content: (
      <>
        <p>
          Most post-completion disputes between electricians and customers arise from ambiguity
          in the original quote. The following inclusions, clearly stated, prevent the vast
          majority of disputes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variation procedure</strong> — state that any changes to the agreed scope
                requested by the customer will be the subject of a written variation order agreed
                before work proceeds. "Any additional works carried out at the customer's request
                will be charged at [rate] per hour plus materials unless separately quoted."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Making good</strong> — electrical work requires chasing, drilling, and
                cutting. State whether making good (plastering, repainting, floor reinstatement)
                is included or excluded. If excluded, tell the customer who is responsible and
                what trades will be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — confirm that you will issue the appropriate
                certificate on completion (Electrical Installation Certificate for new
                installations, Minor Electrical Installation Works Certificate for additions and
                alterations) and that Building Regulations notification will be made where
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guarantee</strong> — state the period of your workmanship guarantee
                (typically 12 months) and what it covers. Distinguish between workmanship
                (your responsibility) and product failure (manufacturer's warranty).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Link your quote to your standard terms and conditions. For domestic customers, these
          should incorporate your obligations under the Consumer Contracts (Information,
          Cancellation and Additional Charges) Regulations 2013, including the 14-day
          cancellation right for off-premises contracts.
        </p>
      </>
    ),
  },
  {
    id: 'follow-up',
    heading: 'Follow-Up Strategy',
    content: (
      <>
        <p>
          Sending a quote and waiting is leaving money on the table. A structured follow-up
          process consistently converts more quotes into accepted work without being pushy or
          unprofessional.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 1 — send and confirm</strong> — send the quote by email and send a
                brief text or WhatsApp to let the customer know it has been sent. Confirm they
                have received it and invite them to call with any questions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 5 to 7 — first follow-up</strong> — call or message to ask if they
                have had the chance to review the quote and whether they have any questions. Do
                not ask "have you made a decision?" — ask "is there anything I can clarify?".
                This keeps the conversation constructive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 14 — second follow-up</strong> — if no response, send a brief message
                noting that the quote validity period is approaching and you wanted to check if
                they would like to proceed or if they need any additional information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask why if you lose</strong> — if a customer declines your quote, ask
                politely whether the decision was made on price, timing, or another factor. This
                information helps you improve your pricing and presentation over time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Tools for Professional Electrical Quoting',
    content: (
      <>
        <p>
          The fastest way to increase your quote conversion rate is to improve the quality and
          speed of your quoting process. Professional quotes that arrive the same day as the
          survey win significantly more work than quotes sent a week later.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build Quotes on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build professional, branded quotes on your phone while still at the
                  customer's property. Materials pricing is built in. Export to PDF and send
                  by email before you leave. See also the{' '}
                  <SEOInternalLink href="/tender-writing-electrician">
                    tender writing guide
                  </SEOInternalLink>{' '}
                  for commercial work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI-Assisted Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate's AI assistant (Mate) can generate draft quote scopes from a brief
                  description, suggest materials lists, and help you price unfamiliar job types
                  based on real UK trade data. Available via WhatsApp for instant access on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote faster and win more work with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting, invoice management, and business AI. Send professional quotes from your phone before you leave the customer's property. 7-day free trial."
          icon={FileText}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function QuoteWritingGuidePage() {
  return (
    <GuideTemplate
      title="How to Write Electrical Quotes UK | Quote Writing Guide"
      description="Professional electrical quote structure, pricing strategy, materials and labour breakdown, contingency, payment terms, what to include to avoid disputes, and follow-up strategy for UK electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          How to Write Electrical Quotes:{' '}
          <span className="text-yellow-400">A Professional Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Professional quote structure, pricing strategy, materials and labour breakdown, contingency, payment terms, and the follow-up strategy that converts more quotes into accepted work — for domestic and commercial electrical jobs."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Quote Writing"
      relatedPages={relatedPages}
      ctaHeading="Send Professional Electrical Quotes from Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to build and send professional quotes on site. Materials pricing built in. PDF export in seconds. 7-day free trial, cancel anytime."
    />
  );
}
