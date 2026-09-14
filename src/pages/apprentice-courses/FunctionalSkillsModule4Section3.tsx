/**
 * Functional Skills · Module 4 · Section 3 — Costing and quoting
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 *
 * This is a pure-maths page, so density runs to the same bar as the rest of
 * Module 4: every costing technique below is a WorkedExample with real
 * numbers, each followed by a TryIt so the learner repeats it with their own
 * figures. The page carries 11 WorkedExample blocks and 11 TryIt blocks
 * against 8 ConceptBlocks — one pair minimum per section, with extra pairs in
 * the sections that teach a technique in both directions (markup → margin
 * and margin → markup; add VAT and strip VAT; day rate built up and fixed
 * price derived) or that combine numbers carried over from an earlier
 * section (the quote price breakdown in Section 05 reuses the takeoff from
 * Section 01, the labour rate from Section 02 and the VAT rate from
 * Section 04 — this page is meant to be read start to finish, not dipped
 * into section by section).
 *
 * 🔴 CORRECTED DATA CARRIED FORWARD FROM THE PRE-CONVERSION FILE, UNCHANGED —
 * checked again during this pass rather than recalled:
 *  - VAT on qualifying energy-saving materials in a residential property is
 *    ZERO-RATED across the UK until 31 March 2027, after which it reverts to
 *    the reduced 5% rate. It is not 20% today, and it is not 5% today either —
 *    Section 04 keeps a dedicated worked example showing the invoice a
 *    learner would wrongly raise at each of those two rates, and the actual
 *    pound cost of getting it wrong in either direction.
 *  - The complete job costing formula is Selling Price = (Materials + Labour
 *    + Overheads) ÷ (1 − Profit Margin) — division by (1 − margin), never
 *    multiplication by (1 + markup). Section 08 keeps the exact £2,000 ÷ 0.8
 *    = £2,500 worked figures, with £500 being a 20% MARGIN, and keeps the
 *    explicit side-by-side note that adding 20% instead (£2,000 × 1.2 =
 *    £2,400) gives a 16.7% margin, not 20% — a £100 difference on this one
 *    job, and a full month's income over a working year at that error rate.
 *  - The hourly rate worked example still gives £41.41/hr (£33.13 ÷ 0.8, a
 *    20% margin on the £33.13 break-even rate), derived by the page's own
 *    division formula, not £41.50.
 *  - The VAT registration threshold is kept at £90,000, hedged as a current
 *    figure that HMRC can and does change — never stated as if it were
 *    permanent.
 *
 * FIXES APPLIED DURING THIS PASS:
 *  - The quote template's header line used to read "registration numbers
 *    (NICEIC/NAPIT)". No competent person scheme is named anywhere on this
 *    page now — it reads "your competent person scheme registration number".
 *  - "Typical UK rates: £250–£400/day (2024–2025)" has been removed. A
 *    dated day-rate band goes stale the moment it is printed, and the page
 *    already teaches the one thing that does not go stale: how to build YOUR
 *    day rate from the hourly-rate calculation in Section 02. Section 06 now
 *    teaches that build-up directly, with no invented market figures.
 *  - The old "£4,200 all-in" fixed-price figure was an unverifiable given
 *    with no shown derivation. Section 06 now derives a fixed price bottom-up
 *    from a materials figure, a day rate and a day count, then compares it
 *    against the day-rate total at a shorter and a longer duration, and
 *    calculates the exact crossover point in days — so the learner sees where
 *    the £4,200-style figure would actually come from, not just its size.
 *
 * No regulation number appears anywhere on this page — costing and quoting
 * are commercial practice, not BS 7671 territory, and nothing here has been
 * invented to make it sound otherwise. Waste, overhead and margin percentages
 * are taught throughout as typical, adjustable figures, never as rules.
 *
 * Quiz bank (all 8 questions, options, correctAnswer indices) and all three
 * InlineChecks (cost-check-1, cost-check-2, cost-check-3 — ids and
 * correctIndex values unchanged) are carried over verbatim.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Costing & Quoting - Functional Skills Module 4.3';
const DESCRIPTION =
  'Functional Skills maths for electricians: material takeoffs, building your true hourly rate, markup vs margin, VAT calculations, professional quoting, day rate vs fixed price, and pricing variations.';

const quizQuestions = [
  {
    id: 1,
    question:
      'A job requires £800 of materials. You want a 25% markup. What do you charge for materials?',
    options: ['£900', '£1,000', '£1,067', '£1,200'],
    correctAnswer: 1,
    explanation:
      'Markup is calculated on cost price. 25% markup on £800 = £800 × 1.25 = £1,000. The £200 difference is your gross profit on materials.',
  },
  {
    id: 2,
    question:
      'Your overheads are £2,000/month. You work 20 days/month, 8 hours/day. You want to earn £2,400/month net. What is your minimum hourly rate (before profit)?',
    options: ['£30.00/hr', '£15.00/hr', '£27.50/hr', '£22.50/hr'],
    correctAnswer: 2,
    explanation:
      'Total needed = £2,400 (earnings) + £2,000 (overheads) = £4,400/month. Hours = 20 × 8 = 160. Rate = £4,400 / 160 = £27.50/hr. This covers your costs and desired earnings but includes no profit margin — the same break-even calculation as Section 02, just with different starting numbers.',
  },
  {
    id: 3,
    question:
      'A quote totals £2,500 net. You need to add VAT at 20%. What is the gross (VAT-inclusive) price?',
    options: ['£3,125', '£2,750', '£2,600', '£3,000'],
    correctAnswer: 3,
    explanation:
      'VAT at 20% = £2,500 × 0.20 = £500. Gross price = £2,500 + £500 = £3,000. Alternatively, £2,500 × 1.20 = £3,000.',
  },
  {
    id: 4,
    question:
      'A job has a total selling price of £1,200. The cost of materials and labour is £960. What is the profit margin?',
    options: ['20%', '25%', '15%', '30%'],
    correctAnswer: 0,
    explanation:
      'Margin = (Selling Price – Cost) / Selling Price × 100 = (1200 – 960) / 1200 × 100 = 240 / 1200 × 100 = 20%. Note: the markup is 240/960 = 25%, which is different from the 20% margin — the same distinction Section 03 builds from scratch.',
  },
  {
    id: 5,
    question:
      'You quote £4,500 fixed price for a rewire. During the job you discover the consumer unit needs upgrading, adding £450 in materials and 4 hours labour at £40/hr. What should you do?',
    options: [
      'Absorb the extra cost yourself to keep the customer happy',
      'Issue a written variation order and get it signed before proceeding',
      'Carry out the work and add the cost to the final invoice without notice',
      'Stop the job until the customer agrees to a brand-new quote',
    ],
    correctAnswer: 1,
    explanation:
      'Any work outside the original scope should be covered by a written variation order, agreed and signed by the customer before you start the additional work. This protects both parties. The variation would be £450 + (4 × £40) = £610 plus any markup.',
  },
  {
    id: 6,
    question:
      'You are quoting for 12 twin sockets, 6 LED downlights, and a consumer unit upgrade. How would you structure the material takeoff?',
    options: [
      'Quote a single lump sum to keep the figure simple for the client',
      'Estimate a rough total based on a similar past job',
      'List each item, quantity, unit cost, and total cost in a spreadsheet',
      'Order everything first, then add up the receipts afterwards',
    ],
    correctAnswer: 2,
    explanation:
      'A proper material takeoff lists every item individually with quantity, unit cost and extended total. This ensures accuracy, makes it easy to check for errors, and provides a clear record if quantities change during the job.',
  },
  {
    id: 7,
    question: 'What is the key difference between markup and margin?',
    options: [
      'They are the same thing',
      'Margin includes VAT, markup does not',
      'Markup is on selling price, margin is on cost',
      'Markup is on cost, margin is on selling price',
    ],
    correctAnswer: 3,
    explanation:
      'Markup is calculated as a percentage of the cost price. Margin is calculated as a percentage of the selling price. A 25% markup on £100 cost gives £125 selling price, but the margin is only 20% (£25/£125). This distinction matters for profitability analysis.',
  },
  {
    id: 8,
    question:
      'A customer wants a VAT-inclusive price of £3,600 for a job. What is the net (ex-VAT) amount you should put on your invoice?',
    options: ['£3,000', '£3,120', '£2,880', '£3,600'],
    correctAnswer: 0,
    explanation:
      'To find the net amount from a VAT-inclusive figure, divide by 1.20. Net = £3,600 / 1.20 = £3,000. The VAT element is £3,600 – £3,000 = £600.',
  },
];

const FunctionalSkillsModule4Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 3"
        title="Costing and quoting"
        backTo="/study-centre/apprentice/functional-skills/module4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            page is nothing but price breakdowns and worked calculations, and
            both wrap badly at the narrower measure. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Being good with your hands is only half of running an electrical business. The other
            half is a small set of calculations that decide whether a job you did well actually made
            you any money. A material takeoff that misses a box of fixings, an hourly rate that
            forgets an overhead, a markup mistaken for a margin, VAT charged at the wrong rate —
            none of these show up as a fault on the installation. They show up months later as a
            business that is busy and broke. This section builds each calculation from the ground up
            and then makes you run it yourself, because that is the only way any of it sticks.
          </p>

          <LearningOutcomes
            outcomes={[
              'Build a material takeoff line by line from a job, with quantities, unit costs and a waste or contingency allowance, rather than guessing a total.',
              'Build your true hourly rate from your annual costs and your actual billable hours, and add a profit margin to it correctly.',
              'Convert a markup into the margin it actually produces, and work in the other direction — from a target margin to the markup needed to hit it.',
              'Add and remove VAT correctly, and identify when a job is zero-rated rather than standard-rated, and what charging the wrong rate actually costs.',
              'Assemble a professional quote — including a price breakdown built from your own takeoff, labour rate and VAT calculations — and explain why a quote is not an estimate.',
              'Build a day rate from your own hourly rate rather than copying one, and derive a fixed price bottom-up so you can find the crossover point between the two pricing models on a real job.',
              'Price a variation correctly, including the markup on any extra materials, and explain why it needs a signed agreement before the work starts.',
              'Apply the complete job costing formula — Selling Price = (Materials + Labour + Overheads) ÷ (1 − Profit Margin) — and explain why dividing by (1 − margin) gives a different, correct answer to multiplying by (1 + markup).',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Comfort with percentages and rearranging a simple formula',
                gist: 'Every calculation on this page is a percentage applied to a cost, or a formula rearranged to solve for a different unknown. Nothing here needs algebra beyond that.',
              },
              {
                term: 'A basic idea of what goes into running a business',
                gist: "You don't need to have run one yet, but the labour rate calculation assumes you can accept that a vehicle, tools, insurance and accountancy all cost money before you have earned a single pound.",
              },
            ]}
          />

          <TLDR
            points={[
              'A material takeoff lists every item with quantity, unit cost and extended total — never a guessed lump sum — and typically adds 5–10% contingency for waste and breakages.',
              'Your true hourly rate = total annual costs ÷ total billable hours. That is your break-even rate; a profit margin is then added on top by dividing, not multiplying.',
              'Markup is a percentage of COST. Margin is a percentage of SELLING PRICE. The same percentage number means two different things depending on which one you were asked for.',
              'Selling Price = Cost ÷ (1 − margin) gets you a target margin exactly. Cost × (1 + markup) gets you a target markup — the two formulas are not interchangeable, and using the wrong one under-earns you every time.',
              'VAT is added by × 1.20 and removed by ÷ 1.20 at the standard rate. Registration is currently required once turnover exceeds £90,000 — a figure HMRC can and does revise.',
              'Qualifying energy-saving materials in a residential property are zero-rated (0%) until 31 March 2027, then revert to 5%. It is neither 20% today nor 5% today — check the date before you invoice.',
              'A day rate is not a market figure to copy — it is built the same way as your hourly rate: hourly rate × billable hours per day, break-even first, margin added afterwards.',
              'Fixed price and day rate cross over at a specific day count on every job. Below it, fixed price earns you more for the same work; above it, day rate protects you from the overrun.',
              'Never do variation work without a signed, written agreement — verbally agreed extras are the single most common source of payment disputes on a fixed-price job.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Material takeoffs</ContentEyebrow>

          <ConceptBlock
            title="A material takeoff is a list, not a guess"
            onSite="A takeoff done properly is the cheapest insurance you will ever buy on a job — ten minutes with a spreadsheet against a day spent arguing about why the price crept up."
          >
            <p>
              A material takeoff (MTO) is a detailed list of every material item a job needs, each
              with its own quantity, unit cost and extended total. It is the foundation everything
              else in this section is built on: get it wrong and every number that follows — labour,
              markup, VAT, the final quote — is wrong in the same direction. Underestimate the
              takeoff and you lose money on materials you have to buy but never charged for.
              Overestimate it and your price looks uncompetitive against a quote that took the time
              to get it right.
            </p>
            <p>
              A proper takeoff works methodically through the job, not through memory: start with
              the distribution board and list every MCB, RCBO, busbar and enclosure; measure cable
              routes using the drawing's scale and add a percentage for waste and deviation from the
              straight-line distance; count every accessory — sockets, switches, lights, FCUs,
              spurs; list containment — conduit, trunking, cable clips, fixings, back boxes; and
              finally the consumables that are easy to forget — tape, glands, grommets, labels,
              screws, wall plugs, test-lead consumables.
            </p>
            <p>
              Once every item is listed and totalled, add a contingency of typically{' '}
              <strong className="text-white">5–10%</strong> on top of the material total, to cover
              waste, breakages and the small items a first pass always misses. This is not padding
              the price — it is the difference between a takeoff that survives contact with the
              actual job and one that sends you back to the wholesaler halfway through.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Build a material takeoff for a bathroom refurbishment: a shower isolator switch, a 45A DP switch for the shower, 15m of 10.0mm² T&E cable, four IP65 downlights at £14.00 each, 25m of 1.5mm² T&E cable, a fan isolator switch, and £15.00 of sundries. List each line, total the materials, then add a 10% contingency."
            steps={[
              { calc: 'Shower isolator switch: 1 × £8.50 = £8.50', note: '' },
              { calc: '45A DP switch (shower): 1 × £12.00 = £12.00', note: '' },
              {
                calc: '10.0mm² T&E cable (15m): 1 × £52.50 = £52.50',
                note: 'Priced as a single run length, not per metre, for this takeoff.',
              },
              {
                calc: 'IP65 downlights: 4 × £14.00 = £56.00',
                note: 'Quantity × unit cost — the extended total for this line.',
              },
              { calc: '1.5mm² T&E cable (25m): 1 × £18.75 = £18.75', note: '' },
              { calc: 'Fan isolator switch: 1 × £9.50 = £9.50', note: '' },
              { calc: 'Sundries (clips, fixings, connectors): 1 × £15.00 = £15.00', note: '' },
              {
                calc: 'Total materials = 8.50 + 12.00 + 52.50 + 56.00 + 18.75 + 9.50 + 15.00 = £172.25',
                note: 'Every line added, none estimated.',
              },
              {
                calc: 'With 10% contingency: 172.25 × 1.10 = £189.48',
                note: 'The figure you actually carry into the quote.',
              },
            ]}
            answer="£172.25 in listed materials, £189.48 once the 10% contingency is added — the figure that goes into the price breakdown, not the £172.25 subtotal."
            watchOut="It is tempting to quote the £172.25 subtotal because it is the number you just calculated. The contingency is not optional extra profit — it is there because a takeoff, however careful, still misses small items, and 10% on £172.25 is a much smaller argument to have with a customer than going back for more materials mid-job."
          />

          <TryIt
            question="Build a material takeoff for a kitchen ring extension: a 32A RCBO at £14.00, 12m of 6.0mm² T&E cable at £48.00, four double socket outlets at £6.50 each, four back boxes at £2.20 each, and £6.00 of cable clips and fixings. Total the materials, then add a 10% contingency."
            steps={[
              { calc: '32A RCBO: 1 × £14.00 = £14.00', note: '' },
              { calc: '6.0mm² T&E cable (12m): 1 × £48.00 = £48.00', note: '' },
              { calc: 'Double socket outlets: 4 × £6.50 = £26.00', note: '' },
              { calc: 'Back boxes: 4 × £2.20 = £8.80', note: '' },
              { calc: 'Cable clips and fixings: 1 × £6.00 = £6.00', note: '' },
              { calc: 'Total materials = 14.00 + 48.00 + 26.00 + 8.80 + 6.00 = £102.80', note: '' },
              { calc: 'With 10% contingency: 102.80 × 1.10 = £113.08', note: '' },
            ]}
            answer="£102.80 in listed materials, £113.08 with the 10% contingency added — the figure carried into the quote."
          />

          <CommonMistake
            title="Quoting a lump sum instead of a line-by-line takeoff"
            whatHappens="A price is given as a single round figure — 'materials will be about £150' — based on a rough impression of the job rather than a list. Quantities are wrong in both directions on different items, the errors do not cancel out, and there is no record to check against if the customer queries the final invoice."
            doInstead="List every item with its quantity and unit cost, even on a small job. It takes minutes longer than a guess, it is far more likely to be right, and it gives you a document to point to if a query comes up later — rather than having to defend a number you cannot actually break down."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Labour rate calculations</ContentEyebrow>

          <ConceptBlock
            title="Your hourly rate has to cover everything, not just the wage in your head"
            plainEnglish="A vehicle, tools, insurance and an accountant all cost money whether or not you are on a job that day. Your hourly rate has to recover all of it, not just the number you'd like to see on a payslip."
          >
            <p>
              Your hourly rate must cover more than the money you want to take home. It has to
              account for every business overhead — vehicle costs, tools, insurance, software,
              training — plus the reality that not every hour of your working week is billable to a
              customer. Getting this calculation wrong means working at a loss without noticing,
              because the shortfall never shows up as a single obvious number; it shows up as a
              business that is always busy and never quite profitable.
            </p>
            <p>
              The build-up runs in two stages. First, total every annual cost — your desired salary
              plus every overhead — to get a single annual figure. Second, work out how many hours a
              year you can actually bill a customer for: start from 52 weeks, subtract holiday and
              expected sick time, then apply a realistic billable-days-per-week and
              billable-hours-per-day figure, because admin, quoting and travel eat into a working
              day before a single billable hour begins. Dividing the annual cost by the annual
              billable hours gives your <strong className="text-white">break-even rate</strong> —
              the rate at which you cover your costs with zero profit. A profit margin is then added
              on top of that, using exactly the same ÷ (1 − margin) technique this whole page keeps
              coming back to.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Build your true hourly rate: desired annual salary £35,000, vehicle costs £6,000, tools and equipment £2,000, insurance £1,500, accounting/software/phone £2,500, training and certification £1,000. You work 46 weeks a year (52 minus 5 holiday minus 1 sick), 4.5 billable days a week, 7 billable hours a day. Find your break-even hourly rate, then add a 20% profit margin."
            steps={[
              {
                calc: 'Total annual costs = 35,000 + 6,000 + 2,000 + 1,500 + 2,500 + 1,000 = £48,000',
                note: 'Every cost the business carries in a year, salary included.',
              },
              { calc: 'Working weeks per year = 52 − 5 (holiday) − 1 (sick) = 46 weeks', note: '' },
              {
                calc: 'Total billable hours = 46 × 4.5 × 7 = 1,449 hours',
                note: 'Weeks × billable days per week × billable hours per day.',
              },
              {
                calc: 'Break-even hourly rate = 48,000 / 1,449 = £33.13/hr',
                note: 'This covers your costs and your desired salary — with zero profit built in.',
              },
              {
                calc: 'Add a 20% profit margin: 33.13 / (1 − 0.20) = 33.13 / 0.8 = £41.41/hr',
                note: 'Divide by (1 − margin), the same technique as the job costing formula in Section 08 — not × 1.20.',
              },
            ]}
            answer="Break-even rate £33.13/hr; with a 20% profit margin, £41.41/hr — the rate you should actually be charging."
            watchOut="This £33.13/hr is your break-even rate with zero profit. Charging it as your final rate means you have covered your costs and paid yourself the £35,000 you wanted — and made no profit at all to grow the business, cover a bad month, or absorb an unexpected cost. The margin is not optional; £41.41/hr is the number to actually quote."
          />

          <TryIt
            question="Build the same calculation with different numbers: total annual costs of £42,000, working 44 weeks a year (52 minus 6 holiday minus 2 sick), 4.5 billable days a week, 7.5 billable hours a day. Find the break-even hourly rate, then add a 20% profit margin."
            steps={[
              { calc: 'Total billable hours = 44 × 4.5 × 7.5 = 1,485 hours', note: '' },
              { calc: 'Break-even hourly rate = 42,000 / 1,485 = £28.28/hr', note: '' },
              { calc: 'With a 20% profit margin: 28.28 / 0.8 = £35.35/hr', note: '' },
            ]}
            answer="Break-even rate £28.28/hr; with a 20% profit margin, £35.35/hr."
          />

          {/* InlineCheck after section 02 */}
          <InlineCheck
            id="cost-check-1"
            question="Your monthly overheads are £2,200 and you want to take home £2,800/month. You work 21 billable days at 7 hours. What is your break-even hourly rate?"
            options={['£19.05/hr', '£24.49/hr', '£34.01/hr', '£40.00/hr']}
            correctIndex={2}
            explanation="Total needed = £2,800 + £2,200 = £5,000/month. Billable hours = 21 × 7 = 147. Rate = £5,000 / 147 = £34.01/hr. This is before any profit margin."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Markup vs margin</ContentEyebrow>

          <ConceptBlock title="Markup is a percentage of COST. Margin is a percentage of SELLING PRICE.">
            <p>
              These two terms get used almost interchangeably in conversation, but they describe
              different calculations and give different numbers for the same job.{' '}
              <strong className="text-white">Markup</strong> is the percentage added to the cost
              price: Selling = Cost × (1 + markup%). <strong className="text-white">Margin</strong>{' '}
              is the profit expressed as a percentage of the selling price: Margin = Profit /
              Selling × 100. A markup and a margin can share the same underlying pound profit and
              still report as two different percentages, because they are measured against two
              different bases — one against what you paid, one against what you charged.
            </p>
            <p>
              The two directions matter equally. Given a cost and a markup, you can find the actual
              margin it produces — and it is always lower than the markup percentage, because the
              selling price (the margin's base) is always bigger than the cost (the markup's base).
              Given a cost and a <strong className="text-white">target margin</strong> instead, you
              need the other direction: Selling Price = Cost / (1 − margin), which then tells you
              what markup that actually works out as. Some common pairs are worth having close to
              memorised: 20% markup = 16.67% margin, 25% markup = 20% margin, 33.3% markup = 25%
              margin, 50% markup = 33.3% margin, 100% markup = 50% margin. Notice the pattern — a
              markup number always overstates the margin it actually delivers.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Materials cost £400. You apply a 20% markup. What is the selling price, and what is the actual margin?"
            steps={[
              { calc: '20% markup: £400 × 1.20 = £480 selling price', note: '' },
              { calc: 'Profit: £480 − £400 = £80', note: '' },
              {
                calc: 'Margin: £80 / £480 × 100 = 16.67%',
                note: 'Profit divided by SELLING price, not cost.',
              },
            ]}
            answer="Selling price £480, actual margin 16.67% — a 20% markup only gives a 16.67% margin, not 20%."
            watchOut="If you had assumed a 20% markup gives a 20% margin, you would think you were making £80 of margin on this job when the true margin figure is nearly 3.5 points lower. On a small job that gap looks trivial; across a year of work priced the same way, it is not."
          />

          <TryIt
            question="Materials cost £600. You apply a 30% markup. What is the selling price, and what is the actual margin?"
            steps={[
              { calc: '30% markup: £600 × 1.30 = £780 selling price', note: '' },
              { calc: 'Profit: £780 − £600 = £180', note: '' },
              { calc: 'Margin: £180 / £780 × 100 = 23.08%', note: '' },
            ]}
            answer="Selling price £780, actual margin 23.08% — again lower than the 30% markup that produced it."
          />

          <SectionRule />

          <WorkedExample
            question="A job costs £900. You want a 25% profit MARGIN — not markup. What selling price do you need to charge, and what markup does that actually work out as?"
            steps={[
              {
                calc: 'Selling Price = Cost / (1 − margin) = 900 / (1 − 0.25) = 900 / 0.75',
                note: '= £1,200.',
              },
              {
                calc: 'Profit = 1,200 − 900 = £300',
                note: 'Check: 300 / 1,200 = 25% margin — correct.',
              },
              {
                calc: 'Equivalent markup: 300 / 900 × 100 = 33.3%',
                note: 'The markup that would have to be applied to get here.',
              },
            ]}
            answer="Selling price £1,200, which is a 33.3% markup on the £900 cost — a genuinely different number to the 25% margin you were actually asked to hit."
            watchOut="If you had priced this as a 25% markup instead of a 25% margin — £900 × 1.25 = £1,125 — you would be £75 short of the £1,200 you actually needed to charge to hit the margin you wanted. This is the exact mistake Section 08 works through in full at the end of this page."
          />

          <TryIt
            question="A job costs £700. You want a 15% profit MARGIN. What selling price do you need to charge, and what markup does that actually work out as?"
            steps={[
              { calc: 'Selling Price = 700 / (1 − 0.15) = 700 / 0.85', note: '= £823.53.' },
              {
                calc: 'Profit = 823.53 − 700 = £123.53',
                note: 'Check: 123.53 / 823.53 = 15% margin.',
              },
              { calc: 'Equivalent markup: 123.53 / 700 × 100 = 17.65%', note: '' },
            ]}
            answer="Selling price £823.53, which is a 17.65% markup — not the 15% you might have applied by mistake if you confused margin with markup."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · VAT calculations</ContentEyebrow>

          <ConceptBlock
            title="Adding, removing, and knowing when NOT to charge the standard rate"
            plainEnglish="VAT is not your money — it belongs to HMRC from the moment you charge it. Set it aside separately so a quarterly return never catches you short."
          >
            <p>
              Value Added Tax is currently charged at the standard rate of 20% in the UK. If you are
              VAT registered — currently required once turnover exceeds £90,000, a threshold HMRC
              reviews and can change — you must charge VAT on your invoices and submit quarterly
              returns. Adding VAT to a net figure is{' '}
              <strong className="text-white">Gross = Net × 1.20</strong>; removing it from a gross,
              VAT-inclusive figure is <strong className="text-white">Net = Gross / 1.20</strong>.
              The maths is simple, but the common mistake is applying the standard rate without
              checking whether it actually applies to the job in front of you.
            </p>
            <p>
              Installing qualifying energy-saving materials — solar panels, heat pumps, and
              insulation among them — in a residential property is currently{' '}
              <strong className="text-white">zero-rated</strong> for VAT across the UK, until 31
              March 2027, after which it reverts to the{' '}
              <strong className="text-white">reduced 5% rate</strong>. It is not 20% today, and it
              is not 5% today either. Getting this wrong on a solar or heat pump job means either
              overcharging the customer — money you would then have to refund — or, in the other
              direction, undercharging and still owing HMRC the VAT you should have collected.
              Always check current HMRC guidance for eligibility before invoicing this kind of job.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="An invoice covers £850.00 of materials (net) and 16 hours of labour at £45/hr. Calculate the subtotal, add VAT at the standard rate, and find the total."
            steps={[
              { calc: 'Materials (net): £850.00', note: '' },
              { calc: 'Labour: 16 × £45 = £720.00', note: '' },
              { calc: 'Subtotal (net): 850.00 + 720.00 = £1,570.00', note: '' },
              { calc: 'VAT at 20%: 1,570.00 × 0.20 = £314.00', note: '' },
              { calc: 'Total (gross): 1,570.00 + 314.00 = £1,884.00', note: '' },
            ]}
            answer="Subtotal £1,570.00, VAT £314.00, total £1,884.00 — a standard-rated invoice with no complications."
            watchOut="VAT is not your money. Set aside the £314.00 into a separate account the moment it is paid, rather than treating it as part of your income — it belongs to HMRC and has to be there in full when your quarterly return falls due."
          />

          <TryIt
            question="An invoice covers £500.00 of materials (net) and 10 hours of labour at £40/hr. Calculate the subtotal, add VAT at the standard rate, and find the total."
            steps={[
              { calc: 'Materials (net): £500.00', note: '' },
              { calc: 'Labour: 10 × £40 = £400.00', note: '' },
              { calc: 'Subtotal (net): 500.00 + 400.00 = £900.00', note: '' },
              { calc: 'VAT at 20%: 900.00 × 0.20 = £180.00', note: '' },
              { calc: 'Total (gross): 900.00 + 180.00 = £1,080.00', note: '' },
            ]}
            answer="Subtotal £900.00, VAT £180.00, total £1,080.00."
          />

          <SectionRule />

          <WorkedExample
            question="A heat pump installation in a qualifying residential property has a net cost of £6,200. It is genuinely zero-rated today. Calculate the correct invoice total, then show what the customer would be wrongly charged if the standard 20% rate were applied, and what they would be wrongly charged if the future 5% rate were applied too early."
            steps={[
              {
                calc: 'Correct treatment today: zero-rated, VAT = £0',
                note: 'Net £6,200 is also the gross total the customer should pay.',
              },
              {
                calc: 'If wrongly charged at the standard 20% rate: 6,200 × 1.20 = £7,440',
                note: 'An overcharge of £7,440 − £6,200 = £1,240 the customer never should have been asked for.',
              },
              {
                calc: 'If wrongly charged at the FUTURE 5% rate before 31 March 2027: 6,200 × 1.05 = £6,510',
                note: 'Still £6,510 − £6,200 = £310 more than the customer should pay today.',
              },
            ]}
            answer="The correct invoice total today is £6,200 — no VAT added. Charging 20% overcharges the customer by £1,240; charging the post-2027 5% rate too early still overcharges by £310. Both mistakes come from not checking the date and the eligibility before invoicing."
            watchOut="This is not a one-off oddity to memorise and forget — solar, heat pump and insulation jobs are exactly the work this scheme most often applies to, and precisely the jobs large enough that a wrong rate is a four-figure error, not a rounding difference."
          />

          <TryIt
            question="A solar PV installation in a qualifying residential property has a net cost of £4,800 today. Calculate the correct invoice total, and the incorrect total if VAT were wrongly charged at the standard 20% rate."
            steps={[
              { calc: 'Correct treatment: zero-rated, VAT = £0, total = £4,800', note: '' },
              {
                calc: 'If wrongly charged at 20%: 4,800 × 1.20 = £5,760',
                note: 'An overcharge of £5,760 − £4,800 = £960.',
              },
            ]}
            answer="Correct invoice total £4,800. Charging the standard 20% rate would overcharge the customer by £960."
          />

          {/* InlineCheck after section 04 */}
          <InlineCheck
            id="cost-check-2"
            question="A customer asks for the VAT-inclusive price. Your net quote is £2,750. What is the gross price including 20% VAT?"
            options={['£2,950', '£3,000', '£3,300', '£3,437.50']}
            correctIndex={2}
            explanation="Gross = Net × 1.20 = £2,750 × 1.20 = £3,300. The VAT element is £550."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Creating professional quotes</ContentEyebrow>

          <ConceptBlock title="A quote is legally binding once accepted — an estimate is not">
            <p>
              A professional quote protects you legally and helps win work. It should be clear,
              detailed, and leave no room for misunderstanding, and it should always be put in
              writing. A complete quote covers seven parts: a header with your business name,
              address, phone, email, your competent person scheme registration number and your VAT
              number; the customer's details; a detailed scope of works describing exactly what will
              be done; a price breakdown — materials, labour, any sub-contract costs, subtotal, VAT,
              and total; the exclusions — what is explicitly NOT included, such as making good or
              decorating; the terms — payment terms, validity period, cancellation policy; and a
              warranty period, typically 12 months for workmanship.
            </p>
            <p>
              A <strong className="text-white">quote</strong> is legally binding once accepted — you
              cannot increase the price unless the scope genuinely changes (which is what Section 07
              covers). An <strong className="text-white">estimate</strong>, by contrast, is an
              approximation that can change. Use the correct term and make sure the customer
              understands which one they are being given.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Build the price breakdown section of a quote for the kitchen ring extension: materials from the Section 01 takeoff (£113.08, contingency included), plus 5 hours of labour at your £41.41/hr rate from Section 02. Calculate the subtotal, add VAT at 20%, and find the total price to put on the quote."
            steps={[
              {
                calc: 'Materials (from the Section 01 takeoff, with contingency): £113.08',
                note: '',
              },
              {
                calc: 'Labour: 5 × £41.41 = £207.05',
                note: 'Using the margin-inclusive rate from Section 02, not the break-even figure.',
              },
              { calc: 'Subtotal (net): 113.08 + 207.05 = £320.13', note: '' },
              { calc: 'VAT at 20%: 320.13 × 0.20 = £64.03', note: '' },
              {
                calc: 'Total (gross): 320.13 + 64.03 = £384.16',
                note: 'The figure that goes on the quote.',
              },
            ]}
            answer="Subtotal £320.13, VAT £64.03, total £384.16 — a price breakdown built entirely from figures this page has already taught you to calculate, not a single guessed number."
            watchOut="Every figure in this breakdown depends on getting an earlier one right — the materials figure needed the takeoff's contingency, and the labour figure needed the margin-inclusive hourly rate, not the break-even one. A quote built on the break-even rate alone would leave no profit in the job at all."
          />

          <TryIt
            question="Build a price breakdown: materials (with contingency) of £250.00, plus 8 hours of labour at £35.00/hr. Calculate the subtotal, add VAT at 20%, and find the total."
            steps={[
              { calc: 'Materials (with contingency): £250.00', note: '' },
              { calc: 'Labour: 8 × £35.00 = £280.00', note: '' },
              { calc: 'Subtotal (net): 250.00 + 280.00 = £530.00', note: '' },
              { calc: 'VAT at 20%: 530.00 × 0.20 = £106.00', note: '' },
              { calc: 'Total (gross): 530.00 + 106.00 = £636.00', note: '' },
            ]}
            answer="Subtotal £530.00, VAT £106.00, total £636.00."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Day rates vs fixed price</ContentEyebrow>

          <ConceptBlock
            title="Your day rate is built the same way as your hourly rate — it is not a figure to copy"
            onSite="Ask five electricians their day rate and you'll get five different answers, because five different businesses carry five different overheads. Your day rate has to come from your own numbers, not from what the last one told you."
          >
            <p>
              Choosing between a day rate and a fixed price depends on the nature of the job. A day
              rate suits fault finding, maintenance, and work with genuinely uncertain scope — it
              carries no risk of underquoting, but the customer's cost stays open-ended. A fixed
              price suits new installations, rewires and clearly defined scope — the customer knows
              their exact cost upfront, but you carry the risk of a job overrunning your estimate.
            </p>
            <p>
              There is no single correct day rate to quote, and a figure copied from a forum or
              another electrician tells you nothing about whether it covers your own costs. Your day
              rate is built exactly like your hourly rate in Section 02: take your break-even hourly
              rate, multiply it by your billable hours in a day to get a break-even day rate, then
              add your profit margin the same way — by dividing by (1 − margin), not by adding a
              flat amount. A fixed price is built the other way round: from a materials figure and
              an estimated number of days at your day rate, with a contingency added on top for the
              unknowns a fixed quote has to absorb.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Using your £33.13/hr break-even hourly rate from Section 02 and 7 billable hours a day, build your break-even day rate, then add a 20% profit margin to get the day rate you should actually quote."
            steps={[
              {
                calc: 'Break-even day rate = 33.13 × 7 = £231.91',
                note: 'Hourly rate × billable hours per day.',
              },
              {
                calc: 'Add a 20% profit margin: 231.91 / (1 − 0.20) = 231.91 / 0.8',
                note: '= £289.89.',
              },
            ]}
            answer="Break-even day rate £231.91; with a 20% margin, £289.89/day — the figure to actually quote, built entirely from your own numbers rather than a figure taken from anyone else."
            watchOut="Quoting the £231.91 break-even figure as your day rate leaves the same zero-profit problem as Section 02's hourly rate — it pays your costs and your target salary, with nothing left over."
          />

          <TryIt
            question="Using the £28.28/hr break-even hourly rate from the Section 02 TryIt and 7.5 billable hours a day, build a break-even day rate, then add a 20% profit margin."
            steps={[
              { calc: 'Break-even day rate = 28.28 × 7.5 = £212.10', note: '' },
              { calc: 'Add 20% margin: 212.10 / 0.8 = £265.13', note: '' },
            ]}
            answer="Break-even day rate £212.10; with a 20% margin, £265.13/day."
          />

          <SectionRule />

          <WorkedExample
            question="A full house rewire needs a material takeoff of £2,200 (net, contingency included) and is estimated at 5 days at a day rate of £300/day. Build the fixed price with a 10% contingency, then compare it against the day-rate total if the job actually takes 4 days or 7 days, and find the exact day count at which the two pricing methods cross over."
            steps={[
              { calc: 'Labour at day rate: 5 × £300 = £1,500', note: '' },
              { calc: 'Subtotal: 2,200 + 1,500 = £3,700', note: '' },
              {
                calc: 'Fixed price with 10% contingency: 3,700 × 1.10 = £4,070',
                note: 'The quoted fixed price, regardless of how long the job actually takes.',
              },
              {
                calc: 'Day-rate total if it takes 4 days: 2,200 + (4 × 300) = £3,400',
                note: 'Less than the £4,070 fixed price — on day rate, finishing early earns the customer a lower bill and you a smaller one.',
              },
              {
                calc: 'Day-rate total if it takes 7 days: 2,200 + (7 × 300) = £4,300',
                note: 'More than the £4,070 fixed price — on day rate, an overrun costs the customer more, and pays you for the extra time; on a fixed price, the overrun is absorbed by you at no extra pay.',
              },
              {
                calc: 'Crossover point: 4,070 = 2,200 + (X × 300) → X = (4,070 − 2,200) / 300 = 6.23 days',
                note: 'Below 6.23 days, fixed price earns you more for the same materials figure; above it, day rate would have paid you more.',
              },
            ]}
            answer="Fixed price £4,070. At 4 days, day rate would only total £3,400 — fixed price paid you more for finishing early. At 7 days, day rate would total £4,300 — more than the fixed price, meaning the fixed-price quote absorbed that overrun at no extra pay. The crossover is 6.23 days: any job finishing faster than that, fixed price is the better deal for you; any job running longer, day rate would have protected your earnings."
            watchOut="Fixed pricing rewards you exactly when your estimate is a little pessimistic and the job runs faster than planned. It punishes you just as precisely when the estimate was optimistic. The crossover calculation is what tells you which side of that line a given estimate is likely to sit on, rather than guessing."
          />

          <TryIt
            question="A smaller job needs a material takeoff of £1,000 (net, contingency included) and is estimated at 3 days at a day rate of £280/day. Build the fixed price with a 10% contingency, then compare it against the day-rate total at 2 days and 4 days, and find the crossover day count."
            steps={[
              { calc: 'Labour at day rate: 3 × £280 = £840', note: '' },
              { calc: 'Subtotal: 1,000 + 840 = £1,840', note: '' },
              { calc: 'Fixed price with 10% contingency: 1,840 × 1.10 = £2,024', note: '' },
              {
                calc: 'Day-rate total at 2 days: 1,000 + (2 × 280) = £1,560',
                note: 'Less than the £2,024 fixed price.',
              },
              {
                calc: 'Day-rate total at 4 days: 1,000 + (4 × 280) = £2,120',
                note: 'More than the £2,024 fixed price.',
              },
              {
                calc: 'Crossover: 2,024 = 1,000 + (X × 280) → X = (2,024 − 1,000) / 280 = 3.66 days',
                note: '',
              },
            ]}
            answer="Fixed price £2,024, crossover at 3.66 days. Finishing in under 3.66 days makes fixed price the better deal; running longer, day rate would have paid more."
          />

          <CommonMistake
            title="Copying a day rate instead of building your own"
            whatHappens="A day rate is set from what other electricians seem to charge, without checking it against your own overheads and billable hours. On a slow month, or with a heavier vehicle or insurance cost than the electrician you copied, that rate quietly runs at a loss — and because a day rate is quoted as a round, confident-sounding number, nobody questions it."
            doInstead="Build your day rate the same way as your hourly rate: from your own annual costs and your own billable hours, with your own margin added on top. It will not match anyone else's, and it does not need to — it needs to match your business."
          />

          {/* InlineCheck after section 06 */}
          <InlineCheck
            id="cost-check-3"
            question="You quote £3,500 fixed price for a job you estimate at 4 days. Materials cost £1,200. If you complete it in 3 days, what is your effective daily labour rate?"
            options={['£575/day', '£766.67/day', '£875/day', '£1,166.67/day']}
            correctIndex={1}
            explanation="Labour income = £3,500 – £1,200 materials = £2,300. Over 3 days = £2,300 / 3 = £766.67/day. This is significantly more than the £575/day you would have earned if it took 4 days (£2,300 / 4). Efficiency rewards you on fixed-price work."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Managing variations</ContentEyebrow>

          <ConceptBlock title="Variations are priced the same way as the original job — and never started without a signature">
            <p>
              Variations (also called change orders) happen when the customer requests additional
              work, or when unforeseen conditions require a change to the original scope. How you
              handle them can make or break the profitability of a fixed-price job, because a
              variation done for free is a variation that quietly erodes the margin you calculated
              at the start. The process is always the same five steps:{' '}
              <strong className="text-white">identify</strong> that the work is genuinely outside
              the original scope; <strong className="text-white">document</strong> a clear
              description of the additional work; <strong className="text-white">price</strong> it
              exactly like any other job — materials plus labour plus your usual markup;{' '}
              <strong className="text-white">agree</strong> it with the customer, in writing, before
              starting; and <strong className="text-white">invoice</strong> it as a separate line
              item alongside the original scope.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="During a rewire, you discover the consumer unit back box is corroded and needs replacing — not visible during the original survey. A new metal enclosure costs £85.00, and it takes an additional 2 hours of labour at £45/hr. Apply your usual 25% markup on the extra materials, and price the variation."
            steps={[
              { calc: 'New metal enclosure: £85.00', note: '' },
              { calc: 'Additional labour: 2 × £45 = £90.00', note: '' },
              {
                calc: 'Materials markup (25% on £85.00): £21.25',
                note: 'Same markup rate you would apply on the original job.',
              },
              { calc: 'Variation total (net): 85.00 + 90.00 + 21.25 = £196.25', note: '' },
            ]}
            answer="£196.25 (net), invoiced as its own line item once signed off — not absorbed into the original fixed price."
            watchOut="Never do additional work without a signed variation order first. A verbal agreement to 'sort it out and add it to the bill' leaves you unable to prove the customer agreed either to the work or the price if a dispute follows."
          />

          <TryIt
            question="During the same consumer unit upgrade, the customer asks for 3 additional double sockets while the wall is open. Sockets cost £6.50 each and back boxes £2.20 each; it takes 1.5 hours of additional labour at £45/hr. Apply the same 25% markup on materials, and price the variation."
            steps={[
              { calc: 'Sockets: 3 × £6.50 = £19.50', note: '' },
              { calc: 'Back boxes: 3 × £2.20 = £6.60', note: '' },
              { calc: 'Total materials: 19.50 + 6.60 = £26.10', note: '' },
              { calc: 'Additional labour: 1.5 × £45 = £67.50', note: '' },
              { calc: 'Materials markup (25% on £26.10): £6.53', note: '' },
              { calc: 'Variation total (net): 26.10 + 67.50 + 6.53 = £100.13', note: '' },
            ]}
            answer="£100.13 (net) for the variation, priced with the same technique as the worked example above."
          />

          <Scenario
            title="The customer who won't sign"
            situation="Mid-rewire, you find a section of buried cable that is damaged and needs replacing before you can safely continue — clearly outside the original scope. You price the variation and explain it to the customer, but they are reluctant to agree in writing and want you to 'just crack on'."
            whatToDo="Do not proceed without the signed variation order. Explain clearly why the additional work is necessary, put the price and the reason in writing, and if the customer still refuses, document that you raised it and let them decide how to proceed — including the option of stopping work at that point."
            whyItMatters="Carrying out unscoped work on a verbal promise is the single most common way a fixed-price job turns into an unpaid dispute. A signed variation protects the customer from surprise costs and protects you from doing work you are never paid for."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Pricing strategy</ContentEyebrow>

          <ConceptBlock title="The complete job costing formula, and why (1 − margin) is not (1 + markup)">
            <p>
              Pricing is not just about covering costs — it is about deciding what margin you
              actually want, and using the right formula to hit it. The complete job costing formula
              brings materials, labour and overheads together:{' '}
              <strong className="text-white">
                Selling Price = (Materials + Labour + Overheads) ÷ (1 − Profit Margin)
              </strong>
              . Dividing by (1 − margin) is not the same calculation as multiplying by (1 + markup),
              and Section 03 already showed why: the two percentages are measured against different
              bases, so using the wrong one under-delivers the margin you actually wanted.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A job has materials (with markup) of £950, labour of 3 days × £300 = £900, and an overhead allocation of £150. Total cost is £2,000. Apply a 20% profit MARGIN using the correct formula, and then show what would have happened if you had instead added 20% as a markup."
            steps={[
              { calc: 'Total cost: 950 + 900 + 150 = £2,000', note: '' },
              {
                calc: 'Correct method — Selling Price = Cost / (1 − margin) = 2,000 / 0.8 = £2,500',
                note: 'Profit = 2,500 − 2,000 = £500, which is 500/2,500 = 20% margin. Correct.',
              },
              {
                calc: 'If you had instead added 20% as a MARKUP: 2,000 × 1.2 = £2,400',
                note: 'Profit = 400. Margin = 400/2,400 = 16.7%, not the 20% you intended.',
              },
              {
                calc: 'Difference between the two approaches: 2,500 − 2,400 = £100',
                note: 'Same job, same intended 20%, £100 apart — because one number divides and the other multiplies.',
              },
            ]}
            answer="Selling price £2,500 with £500 as a genuine 20% margin. Had you added 20% as a markup instead, you would have charged £2,400 for an actual margin of only 16.7% — a £100 shortfall on this one job, and a full month's income over a year of work priced the same way."
            watchOut="Watch this formula carefully — it is exactly where the markup/margin confusion from Section 03 costs real money. £2,000 ÷ 0.8 = £2,500, and £500 of £2,500 is a 20% margin. £2,000 × 1.2 = £2,400 is a 20% markup, and its actual margin is only 16.7%. Same intention, £100 difference, and that gap compounds over every job priced the same way."
          />

          <TryIt
            question="A job has materials of £600, labour of 2 days × £280 = £560, and an overhead allocation of £90. Apply a 25% profit MARGIN using the correct formula, then show the shortfall if you had instead added 25% as a markup."
            steps={[
              { calc: 'Total cost: 600 + 560 + 90 = £1,250', note: '' },
              {
                calc: 'Correct method — Selling Price = 1,250 / (1 − 0.25) = 1,250 / 0.75 = £1,666.67',
                note: 'Profit = 416.67, margin = 416.67/1,666.67 = 25%. Correct.',
              },
              {
                calc: 'If added as a 25% MARKUP instead: 1,250 × 1.25 = £1,562.50',
                note: 'Profit = 312.50. Margin = 312.50/1,562.50 = 20%, not 25%.',
              },
              { calc: 'Difference: 1,666.67 − 1,562.50 = £104.17', note: '' },
            ]}
            answer="Selling price £1,666.67 for a genuine 25% margin. The markup approach would have charged £1,562.50 — £104.17 less — for an actual margin of only 20%, matching the same 25% markup = 20% margin pairing from Section 03's conversion list."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A material takeoff lists every item with quantity and unit cost, then adds a 5–10% contingency for waste and breakages — never a guessed lump sum.',
              'Your true hourly rate = total annual costs ÷ total billable hours. That is a break-even figure; add your margin afterwards by dividing by (1 − margin).',
              'Markup is a percentage of COST; margin is a percentage of SELLING PRICE. Converting between them requires two different formulas, not one used for both.',
              'VAT is added by × 1.20 and removed by ÷ 1.20 at the standard rate. Set VAT aside separately — it belongs to HMRC, not to you.',
              'Qualifying energy-saving materials in residential property are zero-rated until 31 March 2027, then revert to 5% — never 20%, and never 5% before that date.',
              'A quote is legally binding once accepted; an estimate is not. Use the correct term with the customer, and never name a specific competent person scheme in your own paperwork.',
              'A day rate is built from your own hourly rate and billable hours, not copied from anyone else — and it has a calculable crossover point against any fixed price on the same job.',
              'Never carry out variation work without a written, signed agreement — price it the same way as the original job, markup included.',
              'Selling Price = (Materials + Labour + Overheads) ÷ (1 − Profit Margin). Dividing by (1 − margin) and multiplying by (1 + markup) are different calculations that give different answers for the "same" intended percentage.',
            ]}
          />

          <FAQ
            items={[
              {
                question: "What's the one-sentence difference between markup and margin?",
                answer:
                  'Markup is a percentage of what you paid; margin is a percentage of what you charged — the same pound profit reported against two different bases, which is why the two percentages are never equal.',
              },
              {
                question: 'Is the £90,000 VAT registration threshold fixed permanently?',
                answer:
                  'No — it is the current threshold, and HMRC has changed it before and can change it again. Check current guidance rather than relying on a remembered figure once it starts to feel dated.',
              },
              {
                question: 'How do I actually decide my day rate?',
                answer:
                  'Build it the same way as your hourly rate: your break-even hourly rate × your billable hours in a day gives a break-even day rate, then divide by (1 − your target margin) to get the rate you actually quote. There is no market figure to copy — only your own numbers.',
              },
              {
                question: 'What if a customer refuses to sign a variation order?',
                answer:
                  'Do not proceed with the unscoped work. Document that you raised it, explained why it was necessary, and gave the customer the choice — including the option to stop the job at that point. This protects you if a dispute follows.',
              },
              {
                question:
                  'Why does dividing by (1 − margin) give a different answer to multiplying by (1 + markup)?',
                answer:
                  'Because they answer different questions. Multiplying by (1 + markup) tells you what to charge for a given markup on cost. Dividing by (1 − margin) tells you what to charge for a given margin on selling price. The two percentages describe the same profit against different bases, so the two formulas are not interchangeable — using the wrong one under-delivers the margin you actually wanted.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Costing & Quoting Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module4/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 2
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module4/section4')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 4
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule4Section3;
