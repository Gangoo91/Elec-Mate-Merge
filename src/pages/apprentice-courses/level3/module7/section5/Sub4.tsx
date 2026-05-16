/**
 * Module 7 · Section 5 · Subsection 4 — Pricing and estimating for electricians
 * Maps to C&G 2365-03 / Unit 308 / LO3 / AC 3.x
 *   AC — "Identify methods of pricing and estimating electrical work".
 *
 * Calculating a sustainable charge-out rate, estimate vs quotation, fixed price
 * vs daywork, materials markup, the site-survey discipline, quotation
 * structure (inclusions, exclusions, assumptions, provisional sums), variation
 * orders, tendering basics and how to handle the "you're too expensive"
 * objection without racing to the bottom.
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

const TITLE = 'Pricing and estimating for electricians | Level 3 Module 7.5.4 | Elec-Mate';
const DESCRIPTION =
  'Calculating a sustainable charge-out rate, estimates vs quotations, fixed price vs daywork, materials markup, site surveys, quotation structure and tendering for electrical contractors.';

const checks = [
  {
    id: 'mod7-s5-sub4-estimate-vs-quote',
    question: 'What is the key difference between an estimate and a quotation?',
    options: [
      'Estimates are always more detailed than quotations.',
      "An estimate is an approximate cost that may change as the scope clarifies; a quotation is a fixed price for clearly-defined work. A quotation, once accepted, forms the contractual price unless the scope changes (variations). Make sure clients understand which they're receiving — confusion here is a leading cause of payment disputes.",
      'Quotations are always cheaper than estimates.',
      'There is no legal difference.',
    ],
    correctIndex: 1,
    explanation:
      "Estimate = approximate, may change; quotation = fixed price for defined scope. The legal effect is significant under the Consumer Rights Act 2015 — a quotation once accepted is contractually binding at that price, only changeable for genuine scope variations agreed in writing. An estimate gives you more room but also leaves more room for dispute about what 'reasonable' means at the end. Most professional contracts use quotations with clearly stated scope, inclusions, exclusions and assumptions.",
  },
  {
    id: 'mod7-s5-sub4-charge-out',
    question: 'Which costs should you include when calculating your charge-out rate?',
    options: [
      'Just materials and your hourly wage equivalent.',
      "All costs: target take-home wage; on-costs (NI, pension); vehicle (purchase / lease, fuel, MOT, insurance, repairs); insurance (PL, EL if employing, vehicle, tools); tools and equipment (replacement and calibration); training and CPD; CPS scheme fees; office / admin time; software subscriptions; marketing; profit margin. Divide by chargeable hours per year (~1,500-1,800 not the 2,000 raw availability).",
      'Only the costs visible to the customer.',
      'The same rate as competitors regardless of your cost base.',
    ],
    correctIndex: 1,
    explanation:
      "Charge-out rate must cover all costs plus profit. Total annual costs ÷ chargeable hours = minimum sustainable rate. Most electricians' charge-out rates are 2-3× their hourly wage equivalent because of all the non-chargeable overhead (admin time, training, sick days, weather, slow periods, equipment depreciation). Match-the-market pricing without knowing your real costs is the fastest route to operating at a loss. Know your numbers first; price within the market second.",
  },
  {
    id: 'mod7-s5-sub4-survey',
    question: 'What should you do before pricing a complex job?',
    options: [
      'Guess based on similar past jobs.',
      'Conduct a site survey to assess: existing installation condition; access difficulties; cable routes; floor types and finishes; client-specific requirements (working hours, decor protection); hidden risks (asbestos, services in walls, structural issues); customer expectations vs feasibility. The site survey is the difference between a quote that holds and a quote that haemorrhages on variations.',
      'Use a standard price list regardless of specifics.',
      'Wait for the customer to suggest a price.',
    ],
    correctIndex: 1,
    explanation:
      "A proper site survey on any non-trivial job costs an hour or two — pays for itself many times over by avoiding cost surprises during the work. What you can't see before you start, you can't price accurately. Document the survey findings; refer to them in the quotation; list explicit assumptions (e.g. 'assumes existing ring circuit is in serviceable condition; remedial works charged as variations'). The pre-1990s house with old wiring and asbestos in the airing cupboard prices very differently from the 2010 new-build.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does 'daywork' or 'day rate' pricing typically mean?",
    options: [
      'A fixed price for the whole job.',
      "Charging a set rate per day (or hour) plus materials at cost (or cost-plus-markup), rather than a fixed job price. Used when scope is uncertain (maintenance, fault-finding, diagnostic work) or when the work is genuinely time-and-materials in nature.",
      'Only working during daylight hours.',
      'Pricing based on materials only.',
    ],
    correctAnswer: 1,
    explanation:
      "Daywork means time + materials. Used when fixed-pricing isn't fair to either party — fault-finding (you don't know how long it'll take until you start); ongoing maintenance where each visit is different; emergency callouts with uncertain scope. State the day rate, materials terms (cost or cost-plus-markup), how time is recorded (timesheets signed), minimum charges (typical: 2-hour minimum on callouts). Daywork shouldn't be used for clearly-defined jobs where fixed pricing is achievable — clients usually prefer the certainty.",
  },
  {
    id: 2,
    question: "What is a 'bill of quantities' (BoQ) in tendering?",
    options: [
      'Your bank statement.',
      "A detailed itemised document prepared by a quantity surveyor (or the design team) listing every item of work — material quantities, units of measure, descriptions — with blank rate columns for tenderers to insert their unit prices. Allows like-for-like comparison of competing tenders.",
      'A shopping list of materials only.',
      'An invoice for completed work.',
    ],
    correctAnswer: 1,
    explanation:
      "A Bill of Quantities is a standard tendering tool on larger commercial / public-sector projects. The BoQ pre-defines every item of work; each tendering contractor inserts unit rates; the total is the tendered price. Allows the client to compare apples-with-apples across tenders. SMM7 (Standard Method of Measurement) and NRM2 (New Rules of Measurement) are the industry standards for BoQ preparation. Small / domestic work doesn't typically use a BoQ — quotations with clear scope descriptions suffice.",
  },
  {
    id: 3,
    question: "When pricing materials, what is a typical markup range?",
    options: [
      'Materials are always supplied at cost.',
      "Typical materials markup is 15-30% on top of cost — covers the time sourcing, collecting, returning, managing stock, dealing with wholesaler accounts, and wastage. Higher markup on stocked items you carry in van inventory; potentially lower markup on large special orders where you don't add much value.",
      'Materials should be marked up 100%.',
      'No markup is allowed.',
    ],
    correctAnswer: 1,
    explanation:
      "Markup covers your overhead in sourcing materials — wholesaler runs, account management, inventory holding, returns, wastage. 15-30% is the working range. Pure pass-through cost is unsustainable because you absorb the sourcing time for free. Special-order items at customer request might be lower markup (5-15%); stocked van-inventory items might be higher (25-40%). Be transparent if asked — most customers understand reasonable markup if explained.",
  },
  {
    id: 4,
    question: 'What should you include in quotation exclusions?',
    options: [
      'Nothing — include everything.',
      "Work outside the quoted scope: making good (plastering, decorating), other trades' work, building control / scheme fees if charged separately, scaffolding hire, unforeseen issues (asbestos, existing-defect remediation, hidden services). Clear exclusions prevent disputes about who pays for what.",
      "Only items you've forgotten to price.",
      'Items you intend to add later at higher prices.',
    ],
    correctAnswer: 1,
    explanation:
      "Exclusions are explicit about what's NOT covered. Standard exclusions in domestic electrical quotes: making good (plastering, painting); work by other trades (carpentry, plumbing); building control fees if charged separately; remedial work to existing non-compliant installations encountered during the work; hidden services (gas, water, structural); skip hire or scaffolding if needed. Clear exclusions don't make the quote longer in a bad way — they reduce disputes about scope.",
  },
  {
    id: 5,
    question: "What is 'value engineering' in tendering and project pricing?",
    options: [
      'Charging more than competitors.',
      "Identifying ways to deliver the required functionality and quality at lower cost — alternative materials with equivalent performance, alternative installation methods, alternative design approaches. Done collaboratively with the client / design team. Different from corner-cutting (which reduces quality).",
      'Always choosing the cheapest possible materials.',
      'Increasing the profit margin without disclosure.',
    ],
    correctAnswer: 1,
    explanation:
      "Value engineering is a legitimate cost-reduction process — finding equivalent functionality at lower cost. Example: substituting one cable type for another with the same CCC and grouping rating but lower price; suggesting an alternative containment that's cheaper to install. The substitutions must meet BS 7671 and the design intent. Done well, value engineering benefits both contractor and client. Done badly, it slides into corner-cutting — which is misconduct.",
  },
  {
    id: 6,
    question: 'How should you handle material price increases during a long project?',
    options: [
      'Absorb all costs yourself.',
      "Include a price variation clause in your quotation allowing adjustment for significant material price changes (e.g. copper, aluminium, key brands). Set a clear threshold (typical: changes over 5%) and define the calculation method. This protects both parties on long-running projects.",
      'Stop the work until prices return to normal.',
      'Charge whatever you want without notice.',
    ],
    correctAnswer: 1,
    explanation:
      "Material price volatility (copper, aluminium, raw materials) has been significant since 2020. For projects running more than 3-6 months from quote to completion, a price-variation clause is reasonable and standard. State the threshold (e.g. 5% movement triggers adjustment); the index used (manufacturer list price; LME copper price; etc.); the calculation method. Be transparent rather than hiding the clause — clients understand it on long projects; surprise extras at the end damage trust.",
  },
  {
    id: 7,
    question: 'When responding to a formal tender, what must you ensure?',
    options: [
      'Just submit your lowest price.',
      "Follow all instructions exactly; submit on time (late tenders are rejected without consideration); include all required documents (method statements, H&S policy, insurance certificates, ISO accreditations if requested, references, financial accounts); price every BoQ line; sign and bind the submission as required.",
      'Negotiate with the client before submitting.',
      'Submit multiple different prices to cover options.',
    ],
    correctAnswer: 1,
    explanation:
      "Formal tenders are strict. Late submissions are typically rejected without consideration. Missing documents (method statement, RAMS, insurance evidence, accreditation evidence, financial accounts) usually disqualify the tender. Pricing every BoQ line is essential — missed lines often mean automatic rejection. Read the tender instructions twice; build a checklist; submit a day early. Public-sector tenders especially are administratively unforgiving.",
  },
  {
    id: 8,
    question: 'How should you handle a customer who says your quote is too high vs cheaper competitors?',
    options: [
      'Always match the lowest competitor price.',
      "Ask what they're comparing against — often cheap quotes exclude things your quote includes (testing, certification, branded materials, insured workmanship, scheme guarantee). Walk through your quotation explaining each element. If the gap remains large, the cheap quote is probably non-compliant — wish them well and let them go. Never undercut your true cost to win work.",
      'Refuse to discuss the quote.',
      'Get angry and storm off.',
    ],
    correctAnswer: 1,
    explanation:
      "The 'you're too expensive' conversation is normal in trade pricing. Most cheap quotes are missing things — generic materials instead of branded; minimal testing; no proper certification; uninsured workmanship. Walk through your quote explaining what's included. If the customer still wants the cheap quote, they're not your customer — let them go gracefully. Undercutting your sustainable rate to win price-shopping customers leads to operating at a loss; better to let them go than work for nothing.",
  },
];

const faqs = [
  {
    question: 'How do I actually calculate my hourly or daily rate?',
    answer:
      "Start with your annual costs: target take-home wage (£30k? £40k? £50k?), employer's NI on the wage (add ~13.8% if Ltd), pension (5-10% of wage typical), vehicle (purchase or lease + fuel + insurance + repairs), tools and equipment (replacement cycle), insurance (PL, EL, tools, vehicle), CPS scheme fee, training (annual CPD + 2382 every amendment), accountant fees, software subscriptions, marketing, office costs, mobile phone, professional memberships. Total annual costs. Then divide by your chargeable hours per year — typically 1,500-1,800 hours (not 2,000+ raw availability, because of admin, training, sick days, weather, slow periods). Add profit margin. That's your minimum sustainable hourly rate. Most working electricians' charge-out rates are 2-3× their hourly wage equivalent.",
  },
  {
    question: 'Should I price hourly or fixed-price?',
    answer:
      "Depends on the work. Fixed-price suits well-defined scope where you can accurately estimate time and materials — consumer unit upgrades, new socket runs, defined fit-outs. Daywork (time + materials) suits uncertain scope — fault-finding, maintenance, reactive work, complex inspections. Many contractors offer both: fixed-price for the defined scope, daywork rates for variations and unforeseen work. Clients generally prefer fixed-price certainty; daywork is sometimes the honest answer to an uncertain job.",
  },
  {
    question: 'How do I compete with much cheaper local competitors?',
    answer:
      "Don't compete purely on price — that's a race to the bottom that ends badly for everyone. Compete on quality, reliability, professional certification, branded materials, proper testing, post-completion support. Explain what your quote includes that the cheap quote likely doesn't (scheme certification, insured workmanship, branded products, proper testing). Some customers will only buy on price; let them go to the cheap competitors. Build your business on customers who value the difference. Underpricing to win price-shoppers loses you money and burns out the business.",
  },
  {
    question: 'What markup should I add to materials?',
    answer:
      "15-30% is the working range. Lower (10-20%) on large special-order items where you add limited value beyond procurement. Higher (25-40%) on stocked van-inventory items where you carry the working capital and time. Be transparent if asked — most customers understand reasonable markup if explained. Some clients (especially commercial / fit-out) will demand 'materials at cost plus 10%' as a contract term; you can accept this if the labour rate compensates. Don't dispute markup principles with customers; explain what you do for it.",
  },
  {
    question: 'How do I handle a customer who has changed their mind mid-job?',
    answer:
      "Document the variation in writing immediately — what changed, what extra time and materials are needed, what the additional cost is. Get the customer's written agreement before doing the extra work. This is the variation order process. Hidden cost increases at invoice stage are a leading cause of disputes; transparent variations agreed in real-time keep the customer informed and protect your right to the extra fee. Use a simple template: 'On [date] you asked for [change]; this adds [cost] and [time]; please confirm to proceed.'",
  },
  {
    question: 'Should I break down my quotation in detail?',
    answer:
      "Provide enough detail for the customer to understand scope, but don't expose your pricing structure. Show item-level scope (consumer unit, sockets count, light points, testing); show inclusions, exclusions, assumptions. Don't break out labour-vs-materials-vs-profit margin — that's not the customer's business. Commercial / public-sector tenders may require detailed cost build-up (BoQ format); domestic work usually doesn't. Show enough for clarity; not so much that you're disclosing trade secrets.",
  },
  {
    question: "What's a fair deposit to ask for on larger jobs?",
    answer:
      "Common practice: 25-50% deposit on materials-heavy or longer jobs. Justifies as: materials purchased up-front; first stage of work; mutual commitment. Domestic jobs over £1,500-2,500 reasonably attract a deposit; commercial jobs may have stage-payment schedules instead (e.g. 30% on order, 30% at first-fix, 30% at second-fix, 10% on completion). Don't take a deposit and then disappear — customer trust depends on the deposit being matched by progress.",
  },
  {
    question: 'How do I price a job I have no experience pricing?',
    answer:
      "Three approaches: 1) Ask a senior contractor / mentor — most established firms will share rough rates for unusual work. 2) Build the price up from first principles — hours of labour at your rate + materials at cost + markup + contingency for the unknown (10-20% on top until you've done a couple of similar jobs). 3) Daywork the first one — explicitly time-and-materials with the customer, agreed in advance, so you learn what the job actually costs and can fixed-price the next one. Don't guess a fixed price for unfamiliar work — that's how contractors lose serious money.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 4"
            title="Pricing and estimating"
            description="Calculating a sustainable charge-out rate, estimates vs quotations, fixed price vs daywork, materials markup, site surveys, quotation structure and tendering."
            tone="blue"
          />

          <TLDR
            points={[
              "Charge-out rate must cover all annual costs (labour, vehicle, insurance, tools, training, scheme fees, admin time) ÷ chargeable hours per year (~1,500-1,800, not 2,000+). Add profit margin.",
              "Estimate = approximate, may change; quotation = fixed price for defined scope. Customers and the Consumer Rights Act 2015 treat them differently.",
              "Materials markup typical range 15-30% — covers sourcing time, stock holding, wastage.",
              "Site survey on any non-trivial job costs an hour or two; saves dozens of hours of variation disputes. What you can't see before you start, you can't price accurately.",
              "Quotation structure: clear scope, inclusions, exclusions, assumptions, payment terms, validity period. Variations agreed in writing as they arise.",
              "Don't race competitors to the bottom — let cheap-only customers go to cheap-only competitors; build your business on customers who value the quality difference.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO3 — identify methods of pricing and estimating electrical work.",
              "Calculate a sustainable hourly or daily charge-out rate covering all business costs plus profit.",
              "Distinguish between an estimate, a quotation and a tender — and the legal effect of each.",
              "Conduct a site survey to inform pricing of non-trivial jobs.",
              "Structure a quotation with clear scope, inclusions, exclusions, assumptions and payment terms.",
              "Apply appropriate materials markup ranges and explain the rationale to clients.",
              "Handle variations and material price changes through clear written processes.",
              "Respond professionally to price objections without undercutting sustainable rates.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Calculating your charge-out rate</ContentEyebrow>

          <ConceptBlock
            title="The full-cost calculation — every cost in, every chargeable hour out"
            plainEnglish="Charge-out rate = total annual cost base ÷ chargeable hours per year, plus profit margin. The trap most new contractors fall into is underestimating the cost base and overestimating chargeable hours. Cost base: target take-home wage, NI (employer + employee if Ltd), pension, vehicle (purchase / lease, fuel, insurance, repairs, MOT, depreciation), insurance stack (PL, EL, tools, professional indemnity), tools and test equipment (replacement cycle + annual calibration), training and CPD (annual budget + amendment-year peaks), CPS scheme fees, accountancy, software subscriptions, marketing, office costs, mobile, professional memberships. Add a profit margin (typical 10-25%). Chargeable hours: typically 1,500-1,800 per year, not 2,000+ — because of admin time, training, sick days, weather, slow periods, equipment downtime."
            onSite="Most new contractors underprice by 20-40% in year 1 because they miss costs (forget annual calibration, underprovision for equipment replacement, ignore admin / non-chargeable time). Build the full calculation in a spreadsheet; update annually. Re-check your charge-out rate every 12 months — costs creep up; rates need to creep up to match. Most established contractors' charge-out rates are 2-3× their hourly wage equivalent because of the overhead and non-chargeable factor."
          >
            <p>
              The full cost base for a sole trader (approximate, varies):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Target take-home pay: e.g. &pound;40,000.</li>
              <li>Tax + NI on that take-home (work backwards): e.g. &pound;12,000.</li>
              <li>Vehicle (lease / fuel / insurance / repairs / MOT): &pound;5,000-8,000.</li>
              <li>Insurance stack (PL, vehicle, tools): &pound;1,500-3,000.</li>
              <li>Tools and test equipment (replacement + calibration): &pound;1,500-3,000.</li>
              <li>Training and CPD (incl. amendment-year peaks): &pound;500-2,000.</li>
              <li>CPS scheme fees: &pound;500-800.</li>
              <li>Accountancy: &pound;500-1,500.</li>
              <li>Software (accounting, certificates, design tools): &pound;500-1,500.</li>
              <li>Marketing (website, ads, signwriting): &pound;500-2,000.</li>
              <li>Office / phone / sundries: &pound;500-1,500.</li>
              <li>
                <strong>Total annual cost base: &pound;63,000-&pound;76,000</strong> (approx).
              </li>
              <li>Chargeable hours: ~1,650 per year (after admin, training, sick, weather).</li>
              <li>
                <strong>Minimum sustainable hourly rate: &pound;38-46</strong> (before profit margin).
              </li>
              <li>Add 15-20% profit margin: <strong>charge-out rate &pound;44-55/hr</strong>.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Day rates, hourly rates, and the 'call-out plus' model"
            plainEnglish="Three common rate structures. Hourly rate — best for short jobs and reactive work; typical £40-65/hour for working sole traders in most UK areas. Day rate — best for predictable full days; typical £350-500/day; usually 8-hour day with travel included. Call-out plus — common for reactive / emergency work; flat call-out fee (£60-90) covers the first 1-2 hours including travel, then hourly thereafter; minimum charge protects against the 30-minute job that loses money. Premium rates for out-of-hours, weekends, urgent emergency — typically 1.5× standard hours, 2× weekend, 2.5× nights. State the rate structure clearly on quotations and on your website."
            onSite="Different rates for different work types is normal. EICR / inspection-and-testing work might be priced flat-rate per certificate or hourly. Consumer unit upgrades typically fixed-price. Maintenance call-outs use the call-out-plus model. Design / advisory work hourly. Decide your structures per work type; price each accordingly; explain to customers when they ask."
          >
            <p>
              Common rate structures:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hourly</strong> &mdash; short / variable work; &pound;40-65/hr typical.
              </li>
              <li>
                <strong>Day rate</strong> &mdash; full-day predictable work; &pound;350-500/day typical.
              </li>
              <li>
                <strong>Call-out plus hourly</strong> &mdash; reactive / emergency; flat fee + hourly after.
              </li>
              <li>
                <strong>Fixed-price</strong> &mdash; defined-scope jobs; reflects all components in one number.
              </li>
              <li>
                <strong>Out-of-hours premium</strong> &mdash; 1.5x / 2x / 2.5x for evenings, weekends, nights.
              </li>
              <li>
                <strong>Certificate-rate</strong> &mdash; flat fee per EIC / EICR / Minor Works.
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

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Estimates, quotations and tenders</ContentEyebrow>

          <ConceptBlock
            title="The three pricing instruments — estimate, quotation, tender"
            plainEnglish="Three pricing instruments with distinct legal effects. Estimate: approximate cost, may change as scope clarifies; no binding commitment to the figure; used when scope is genuinely uncertain. Quotation: fixed price for a clearly-defined scope; once accepted, contractually binding at that price; only changeable for genuine scope variations agreed in writing. Tender: formal competitive submission against defined scope (typically BoQ); usually for commercial / public-sector work; tightly procedural with strict instructions, deadlines and required documents. Most domestic and small commercial work uses quotations; large commercial and public-sector work uses tenders; estimates are reserved for genuinely uncertain scope."
            onSite="Use the right word on the document. Calling something an 'estimate' when you mean a quotation creates ambiguity that hurts you at invoice stage. Calling something a 'quotation' when you don't have enough scope clarity to fix the price creates exposure to the binding price. If scope is unclear, do a proper site survey first, then quote — don't paper over uncertainty with an estimate-but-also-binding fudge."
          >
            <p>
              Side-by-side:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Estimate</strong> &mdash; approximate; can change; used for genuinely uncertain scope.
              </li>
              <li>
                <strong>Quotation</strong> &mdash; fixed price for defined scope; binding once accepted.
              </li>
              <li>
                <strong>Tender</strong> &mdash; formal competitive submission against pre-defined scope (BoQ).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The site survey — what you can't see before you start, you can't price accurately"
            plainEnglish="A proper site survey on any non-trivial job is the difference between a quotation that holds and one that bleeds variations. What to check: existing installation type, age and condition (consumer unit type, cable types, evident damage); access difficulties (loft, cellar, cable routes through finished spaces); floor types and finishes (chipboard floors lift; tiled bathrooms don't); client-specific constraints (working hours, decor protection requirements); hidden risks (asbestos in older properties — pre-2000 builds; existing-defect remediation likely needed; structural issues; non-electrical services in walls). Document the survey in notes and photos; refer to findings in the quotation; list explicit assumptions about what wasn't visible."
            onSite="Charge for the site survey on commercial / complex jobs (typical: half-day rate, deductible from job price if the quote is accepted). Domestic site surveys are usually free as part of the quotation process but should still be done properly. Bring a torch, a meter, a phone for photos, a notebook. Spend 30-60 minutes on a typical domestic survey, more on commercial. The survey is the difference between professional and amateur pricing."
          >
            <p>
              Site survey checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Existing consumer unit &mdash; type, age, capacity, condition.</li>
              <li>Cable types and condition &mdash; visible runs, age, evident damage.</li>
              <li>Earthing arrangement &mdash; TN-C-S / TN-S / TT; condition of earthing conductor.</li>
              <li>Special locations &mdash; bathrooms, outdoors, sauna; zone considerations.</li>
              <li>Access &mdash; loft, cellar, ceiling void, floor cavity, chipboard vs joist construction.</li>
              <li>Finishes affecting cable routes &mdash; tiled bathrooms, plastered ceilings.</li>
              <li>Asbestos risk &mdash; pre-2000 builds; potential ACMs in airing cupboards, ceiling boards.</li>
              <li>Customer-specific constraints &mdash; working hours, decor protection, parking.</li>
              <li>Photographs &mdash; document conditions encountered.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="Consumer Rights Act 2015 — Sections 49, 50, 51 (services)"
            clause={
              <>
                <p className="mb-2">
                  The Consumer Rights Act 2015 implies three statutory terms into consumer contracts
                  for services:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Section 49 &mdash; service to be performed with reasonable care and skill.</li>
                  <li>
                    Section 51 &mdash; if no price is fixed by the contract, a reasonable price is
                    to be paid.
                  </li>
                  <li>
                    Section 52 &mdash; if no time is fixed, the service must be performed within a
                    reasonable time.
                  </li>
                </ul>
                <p className="mt-2">
                  Where the consumer makes clear before the contract that the price, timing or
                  performance is a key reason for entering, statements about those become binding
                  contract terms (s.50).
                </p>
              </>
            }
            meaning={
              <>
                The CRA 2015 governs the consumer-side contractual baseline. A fixed quotation
                accepted by the consumer is a contract term at that price (s.50). An estimate is
                not a fixed term &mdash; but a wildly different final invoice will be tested against
                &quot;reasonable price&quot; (s.51). Reasonable care and skill (s.49) is the
                substantive performance standard. Clear quotations with scope, inclusions and
                exclusions reduce disputes at invoice stage by leveraging s.50.
              </>
            }
            cite="Source: Consumer Rights Act 2015, ss.49-52."
          />

          <RegsCallout
            source="Late Payment of Commercial Debts (Interest) Act 1998"
            clause={
              <>
                <p className="mb-2">
                  For B2B contracts where payment is overdue (i.e. past the agreed term or, where no
                  term is agreed, 30 days from invoice), the supplier has a statutory right to:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Interest at 8% over the Bank of England base rate from the due date.</li>
                  <li>
                    Fixed recovery costs banded by invoice value: &pound;40 (invoice &lt;
                    &pound;1,000), &pound;70 (&pound;1,000-&pound;10,000), &pound;100 (over
                    &pound;10,000).
                  </li>
                  <li>Reasonable additional debt recovery costs beyond the fixed amount.</li>
                </ul>
              </>
            }
            meaning={
              <>
                The Late Payment Act 1998 (amended 2013) gives B2B suppliers real leverage on
                overdue invoices. The interest rate is meaningful; the fixed recovery costs add up
                across multiple invoices. Reference the Act in your terms and conditions; apply
                the interest and costs on overdue commercial invoices; the existence of the Act
                often nudges payers to settle without you having to formally invoke it. Does not
                apply to consumer (B2C) invoices &mdash; those run under the CRA 2015 framework
                and small claims court.
              </>
            }
            cite="Source: Late Payment of Commercial Debts (Interest) Act 1998 as amended by the Late Payment of Commercial Debts Regulations 2013 (SI 2013/395)."
          />

          <SectionRule />

          <ContentEyebrow>Quotation structure</ContentEyebrow>

          <ConceptBlock
            title="Inclusions, exclusions, assumptions — the three structural elements"
            plainEnglish="A professional quotation has three structural elements beyond the price itself. Inclusions: what's covered — scope, materials list, certifications issued, post-completion support period. Exclusions: what's NOT covered — making good (plastering, decorating), other trades' work, building control fees, scaffolding, remedial work to existing defects. Assumptions: what the price is based on — existing earthing arrangement adequate; loft access available; circuits accessible without disturbing fitted units; no asbestos encountered. If assumptions prove false, that's a variation. Together, these three elements define the contractual scope precisely and reduce disputes about what was included in the price."
            onSite="Spend time on the inclusions / exclusions / assumptions on every non-trivial quote. Vague scope = disputes at invoice stage; precise scope = clear understanding both sides. Most professional contracts also include: validity period (typical: 30 days); payment terms (clear deposit, stage and final payment structure); variation procedure (how changes are agreed and priced); cancellation terms (especially for materials already ordered); contact and warranty details."
          >
            <p>
              Standard quotation structure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Header &mdash; your business details, customer details, quote reference, date.</li>
              <li>Scope description &mdash; what work will be done.</li>
              <li>Itemised inclusions &mdash; specific work elements, certifications.</li>
              <li>Materials list (or summary) &mdash; key brands / specifications.</li>
              <li>Total price &mdash; excluding or including VAT (state which).</li>
              <li>Exclusions &mdash; explicit list of what&apos;s NOT included.</li>
              <li>Assumptions &mdash; what the price is based on.</li>
              <li>Payment terms &mdash; deposit, stages, final, timescale.</li>
              <li>Validity period &mdash; typical 30 days.</li>
              <li>Variation procedure &mdash; how changes are handled.</li>
              <li>Standard terms and conditions &mdash; reference your full T&amp;Cs.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Variations — the process that protects both parties"
            plainEnglish="A variation is a change to the agreed scope after the quotation is accepted. The professional process: customer requests change (or you encounter a hidden issue requiring extra work); you document the variation in writing — what's being added, what it costs, what time impact it has; customer agrees in writing (email or signed variation order); work proceeds; invoiced separately or added to final invoice with the variation evidence attached. Hidden cost additions at the final invoice stage are a leading cause of disputes — transparent real-time variation handling avoids almost all of them."
            onSite="Use a simple variation order template — 'On [date] you asked for [change]; this adds [cost] and [time]; please confirm to proceed.' Email is fine for written agreement; signed paper or a brief signed PDF is better for larger variations. Don't do the extra work first and bill later — many customers will dispute the price when they see it. Get agreement before the extra work; the customer can always say no and stick to the original scope."
          >
            <p>
              The variation process:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Request raised (customer ask or contractor-discovered need).</li>
              <li>Scope of variation defined &mdash; what work, what materials, what time.</li>
              <li>Cost estimated &mdash; using your standard rates.</li>
              <li>Written variation order issued &mdash; email, PDF or template.</li>
              <li>Customer agreement in writing before work proceeds.</li>
              <li>Work carried out.</li>
              <li>Variation invoiced separately or added to final invoice with evidence.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Pricing without doing a site survey — invisible-condition surprises eat the margin"
            whatHappens={
              <>
                Contractor quotes a consumer unit upgrade over the phone based on customer
                description: &quot;3-bed semi, want to upgrade from old fuseboard to RCBO unit.&quot;
                &pound;1,200 quoted, accepted. Arrives on the day: 1962 fuseboard, dead earth from a
                buried clip in the wall, old TRS cable up to two circuits, asbestos lining behind the
                consumer-unit cupboard. Extra labour for remedial works pushes the job up to 2 days
                instead of 1; copper-earthing-conductor replacement costs &pound;300; asbestos
                assessment delays start. Final job cost &pound;800 over quoted price; customer
                challenges every penny because they accepted &pound;1,200; relationship damaged;
                contractor swallows much of the overage.
              </>
            }
            doInstead={
              <>
                Always do a 30-60 minute site survey before quoting any non-trivial work. Check the
                consumer unit, the earthing, the cable types, the access, the existing-defect
                indicators. Document explicit assumptions about what wasn&apos;t visible (e.g.
                &quot;assumes existing earthing conductor adequate; remedial works charged as
                variation if not&quot;). For older properties (pre-2000) include asbestos-survey
                assumption explicitly. The survey hour saves the &pound;800 overage that probably
                results from not doing it.
              </>
            }
          />

          <CommonMistake
            title="No variation paper trail — the &quot;you said you'd throw it in&quot; dispute"
            whatHappens={
              <>
                During a domestic rewire the customer asks for an extra ceiling light to be added
                in the hallway. Contractor agrees verbally &mdash; &quot;sure, I&apos;ll sort that&quot;
                &mdash; doesn&apos;t document the variation. Final invoice includes the extra light;
                customer disputes it: &quot;you said you&apos;d throw it in.&quot; Without a paper
                trail it&apos;s the contractor&apos;s word against the customer&apos;s. Most
                contractors give in to avoid escalation; the variation is unpaid. Small amount on
                this job; compounds across many jobs into a meaningful cash bleed.
              </>
            }
            doInstead={
              <>
                Every variation gets a written confirmation. Even a 30-second text or email &mdash;
                &quot;Just to confirm, you asked for the extra hall ceiling light, that&apos;s an
                extra &pound;75 added to the final, OK to proceed?&quot;. Customer replies yes; you
                have your evidence. Five seconds of effort per variation eliminates 95% of these
                disputes. Make it a habit.
              </>
            }
          />

          <Scenario
            title="A customer says your quote is £600 more than your nearest competitor — how do you respond?"
            situation={
              <>
                You&apos;ve quoted &pound;2,400 for a consumer unit upgrade + 4 new circuits in a
                3-bed semi. Customer phones: &quot;You&apos;re &pound;600 more than the other guy
                I&apos;ve had quote. Can you do it for &pound;1,800?&quot; The other quote is
                &pound;1,800. What do you do?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; don&apos;t race to drop your price</strong>. Pause; ask
                politely: &quot;What does the &pound;1,800 quote include exactly &mdash; do you
                have it in writing?&quot;
                <br /><br />
                <strong>Step 2 &mdash; identify the gap</strong>. Compare line-by-line. Typically
                the cheap quote excludes things yours includes. Common gaps: no CPS certificate
                (the cheap quote is from someone unregistered &mdash; non-compliant under Part P);
                generic-brand consumer unit (your quote: branded Wylex / MK / Hager); no proper
                inspection-and-testing line items; no clean-up / making-good included; no
                workmanship warranty. Walk the customer through what your &pound;2,400 covers that
                their &pound;1,800 likely doesn&apos;t.
                <br /><br />
                <strong>Step 3 &mdash; explain compliance</strong>. If the cheap quoter isn&apos;t
                CPS-registered, the work won&apos;t be notifiable under Part P; the customer will
                have a problem at property sale. If the cheap quoter isn&apos;t doing proper
                inspection and testing, the certificate is unreliable. These are concrete
                concerns, not sales pitches.
                <br /><br />
                <strong>Step 4 &mdash; offer the customer a real choice</strong>. &quot;If you want
                to go with the &pound;1,800 quote, I understand &mdash; you should check they&apos;re
                CPS-registered, ask to see their PL insurance and current calibration certificate,
                and confirm what brand of consumer unit they&apos;re fitting. If those check out
                and you trust them, &pound;1,800 might be fine. If they don&apos;t, my &pound;2,400
                includes those things, and I&apos;d be happy to do the job for you.&quot;
                <br /><br />
                <strong>Step 5 &mdash; don&apos;t cave</strong>. If after the conversation the
                customer still wants &pound;1,800, let them go. They&apos;re not your customer;
                they&apos;ll be cheap-quote-shopping the next job too. Dropping &pound;600 to win
                them puts you below your sustainable rate &mdash; you&apos;d be working at a loss
                on the job AND they&apos;ll expect &pound;1,800 every time after. Better to lose
                the job today than build a business at a loss.
                <br /><br />
                <strong>Step 6 &mdash; finish well</strong>. &quot;Thanks for coming back to me on
                that; appreciate you being open about the comparison. If you go with the other
                quote and have any issues, please do come back &mdash; happy to help in future
                anyway.&quot; You&apos;ve held your price, explained your value, left the
                relationship intact for next time.
              </>
            }
            whyItMatters={
              <>
                The &pound;600 gap is the difference between profitable work and loss-making work
                on a typical consumer unit upgrade. Drop the price; you take home less than the
                cost-base of doing the job; you&apos;ve worked for less than nothing. Hold the
                price; explain the value; let the customer choose. Some say yes; some say no; the
                ones who say yes are profitable customers who value the difference. Build the
                business on those, not on the price-shoppers.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Charge-out rate = full annual cost base ÷ chargeable hours (1,500-1,800 not 2,000+) + profit margin. Most contractors' rates are 2-3× their hourly wage equivalent.",
              "Estimate (approximate) vs quotation (fixed-price binding under CRA 2015) vs tender (formal procedural submission against BoQ). Use the right word on the document.",
              "Site survey on any non-trivial job — 30-60 minutes saves dozens of hours of variation disputes. What you can't see, you can't price accurately.",
              "Quotation structure: scope, inclusions, exclusions, assumptions, payment terms, validity period, variation procedure.",
              "Materials markup typical 15-30% — covers sourcing time, stock holding, wastage. Be transparent if asked.",
              "Variations agreed in writing before extra work — email, PDF or signed variation order. Eliminates most invoice disputes.",
              "Late Payment of Commercial Debts (Interest) Act 1998 gives 8% + base statutory interest plus fixed recovery costs on overdue B2B invoices.",
              "Don't race competitors to the bottom — explain your value; let cheap-only customers go; build on customers who value the difference.",
            ]}
          />

          <Quiz title="Pricing and estimating — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Setting up self-employed
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Legal requirements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
