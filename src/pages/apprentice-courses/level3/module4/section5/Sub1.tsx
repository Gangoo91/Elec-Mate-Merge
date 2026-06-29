/**
 * Module 4 · Section 5 · Subsection 1 — Repair vs replace — factors affecting fault correction
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.1
 *   AC 5.1 — "identify factors which can affect repair or replacement of equipment"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.1 — identify and explain factors
 * which can affect fault correction, repair or replacement.
 *
 * Frame: the practical decision framework for repair vs replace — cost,
 * availability, compliance, schedule, customer constraints, environmental
 * factors. Brand-realism on what's typically repairable vs what isn't.
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
  'Repair vs replace (5.1) | Level 3 Module 4.5.1 | Elec-Mate';
const DESCRIPTION =
  'The practical decision framework for repair vs replace — cost, availability, compliance, schedule, customer constraints, environmental factors. Brand-realism on what is typically repairable vs not.';

const checks = [
  {
    id: 'mod4-s5-sub1-cost',
    question:
      "What's the typical 'cost-of-repair vs cost-of-replacement' threshold that should trigger the 'replace' decision?",
    options: [
      "60–70% of replacement cost — above that, lean to replace.",
      "10% of replacement cost. Replace as soon as the repair would cost more than a tenth of a new unit, because labour is always the bigger expense and a fresh component is nearly free by comparison. The 10% rule keeps the firm's margins healthy.",
      "100% of replacement cost. Only replace when the repair would cost exactly as much as a new unit; below that, repair is always the right call because the customer paid for the original component and is entitled to keep it running.",
      "There is no threshold — always repair, whatever the cost. Replacing a component the customer already owns is never justified, so the rule is to repair regardless of how the repair cost compares to a new unit.",
    ],
    correctIndex: 0,
    explanation:
      "60–70% is the trade rule of thumb: if the repair is more than 60–70% of a new replacement, lean to replace, because the repair retains the existing component's age and wear while a new one gives full warranty and life. The threshold is approximate — high-reliability (commercial / industrial / safety-critical) shifts it lower (40–50%), one-off / low-budget work shifts it higher (80%). The apprentice knows and applies the threshold; the supervisor or customer makes the final call on borderline cases.",
  },
  {
    id: 'mod4-s5-sub1-avail',
    question:
      "What does 'parts availability' mean for the repair decision and how do you check?",
    options: [
      "It means checking the part is still under warranty before you fit it. Parts availability is about whether the manufacturer will cover the cost, so you ring the manufacturer's warranty line and ask whether the component is still supported; stock and lead time do not come into it.",
      "It means whether the part is available to the customer to buy themselves. You direct the customer to a DIY store to check the shelves, and if they can find the part they buy it and you fit it; the trade wholesaler and manufacturer are not involved.",
      "Whether the part is still in production, in local stock, and what the lead time is if it has to be ordered.",
      "It means whether you can physically reach the faulty part in the installation. Parts availability is an access question — if the component is behind a wall or in a sealed enclosure you cannot get to it, so you replace the whole assembly; ordering and stock are irrelevant.",
    ],
    correctIndex: 2,
    explanation:
      "Three checks: the manufacturer still produces the part (Hager, Schneider, Wylex, MK, Crabtree list current ranges); the local trade counter has stock (Edmundson, CEF, Rexel, Newey & Eyre); and the lead time if not local (1–3 days for standard items, 2–6 weeks for older / specialist). Discontinued parts (older Crabtree, MEM, Dorman Smith) may be second-hand only — not for safety-critical use. A repair needing a discontinued part may be impossible or take weeks, and the customer's downtime cost may exceed the replacement cost, so check before quoting.",
  },
  {
    id: 'mod4-s5-sub1-warranty',
    question:
      "How does manufacturer warranty affect the repair / replace decision?",
    options: [
      "It doesn't affect the decision at all — warranty is the customer's private arrangement with the retailer and has no bearing on whether you repair or replace. You quote the repair or replacement on its technical merits and leave the customer to chase any warranty afterwards.",
      "Significantly — an in-warranty fault may be a free fix, and opening a device to repair it can void the cover.",
      "Warranty always favours repair over replacement. Because a warranty covers the original component, the manufacturer will only honour it if you repair rather than replace; fitting a new part voids the cover, so an in-warranty fault must always be repaired in place.",
      "Warranty only matters on commercial work. Domestic components carry no manufacturer warranty, so the question of who pays never arises in a house; you simply replace whatever is faulty and bill the customer, and only check warranty status on industrial switchgear.",
    ],
    correctIndex: 1,
    explanation:
      "New components carry manufacturer warranty (Hager 5 years on RCBOs, Schneider 5–10 on Acti9, BG 10 on accessories) and repaired ones usually don't; some manufacturers void warranty if a device is opened or repaired; and a customer's home insurance / appliance warranty may cover replacement but not repair, or the reverse. Always ask 'is this still under warranty?' before quoting paid work — an in-warranty issue is the manufacturer's problem, not the firm's. Check purchase records, the manufacturer's serial-number database, and home insurance. The free fix satisfies the customer better than a paid one.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "List the major factors that affect the repair-vs-replace decision.",
    options: [
      "Only one factor matters — cost. The repair-vs-replace decision is purely about which is cheaper on the day; parts availability, reliability, compliance, schedule and warranty are irrelevant once you know the two prices.",
      "Cost, parts availability, reliability, compliance, schedule, and warranty / insurance.",
      "The only factor is the customer's preference. You ask the customer whether they would rather repair or replace and do that; there are no engineering considerations because the two outcomes are equivalent in safety and cost.",
      "The only factor is the age of the component. Anything over ten years old is replaced and anything under is repaired, regardless of cost, compliance, availability or whether the part can actually be repaired.",
    ],
    correctAnswer: 1,
    explanation:
      "The six factors: cost (60–70% threshold), parts availability (production, stock, lead time), reliability (repaired vs new long-term performance), compliance (replacement may be needed to meet current standards such as A4:2026), schedule (downtime cost, emergency vs planned), and warranty / insurance (in-warranty repair is free). Each pulls in a direction; the right answer depends on which dominate, and the customer's commercial constraints often decide. Quote both options when it isn't obvious.",
  },
  {
    id: 2,
    question: "Which of these are typically REPAIRABLE and which are typically REPLACEMENT-ONLY?",
    options: [
      "Everything is repairable — no electrical component is genuinely replacement-only. A consumer unit, an LED driver and an AFDD can all be opened and the failed part inside swapped out, so replacement is never strictly necessary; it is only ever a matter of how much labour you are willing to spend.",
      "Nothing is repairable — every electrical component is replacement-only. Modern devices are all sealed at manufacture, so a cable termination, a faceplate and an RCBO must each be replaced as a whole rather than re-worked; the concept of an on-site repair no longer exists.",
      "Repairable: terminations, faceplates, switch modules, MCBs / RCBOs within a CU. Replacement-only: consumer units, drivers, AFDDs, sealed devices.",
      "It depends entirely on price, not design. Cheap components are repairable and expensive ones are replacement-only, so an RCBO is repaired because it is costly while a faceplate is replaced because it is cheap; the way the item is constructed makes no difference.",
    ],
    correctAnswer: 2,
    explanation:
      "Typically repairable: cable terminations, accessory faceplates, individual lampholders, switch modules, dimmer cores, individual MCBs / RCBOs within a CU, mid-run cable patches. Typically replacement-only: consumer units (sealed, integrated busbar), transformers and ballasts (factory-sealed), most LED drivers (sealed pots), AFDDs, most modern moulded accessories. The boundary is 'is the failed item a single field-replaceable unit?' — sealed devices are replacement-only, assembled devices with field-accessible components are repairable. Older fluorescent fittings were field-serviced; modern devices are increasingly sealed for cost / reliability / safety.",
  },
  {
    id: 3,
    question: "What's the L3 apprentice's role in the repair-vs-replace decision?",
    options: [
      "To make the final repair-vs-replace decision alone and commit the firm to it. The L3 apprentice has full authority on commercial calls, so you decide the scope, agree the price with the customer and proceed without involving the supervisor on any job.",
      "To always pick the cheapest option to keep the customer happy. The apprentice's role is to minimise the bill on every job, so you choose whatever costs least today regardless of reliability or compliance, and never present the more expensive alternative.",
      "To refer every decision straight to the manufacturer. The apprentice does not weigh any options; you simply phone the device manufacturer and do whatever they recommend, because repair-vs-replace is a manufacturer call, not an electrician's.",
      "Identify the realistic option set and quantify the trade-offs, then escalate the decision to senior or customer.",
    ],
    correctAnswer: 3,
    explanation:
      "The apprentice's two responsibilities: identify the realistic repair / replace / redesign options for the fault, and quantify the trade-offs (cost, lead time, reliability) for each. The decision is normally made by the senior / supervisor for non-trivial cases, or by the customer from the apprentice's options brief — the apprentice doesn't commit the firm to a path on their own initiative, and escalation is the L3 expectation for commercial-impact decisions. Building this judgment over years is the path to senior competence.",
  },
  {
    id: 4,
    question: "Why might 'compliance' force a replacement even when repair is technically possible?",
    options: [
      "When the original device can't meet current breaking capacity, A4:2026 or Building Regs requirements, so a repair would perpetuate non-compliance.",
      "Compliance never forces a replacement — if a component can be physically repaired it can always be left in service whatever standard it was made to. BS 7671 only applies to brand-new circuits, so an old device that still functions is compliant by default and repair is always acceptable.",
      "Compliance forces replacement only when the customer asks for an upgrade. Standards are advisory, so a non-compliant component can stay in service indefinitely unless the customer specifically requests modernisation; the firm has no duty to flag the gap.",
      "Compliance forces replacement only on appliances the customer plugs in, never on the fixed installation. Fixed wiring and switchgear are exempt from current standards once installed, so only portable equipment ever has to be replaced on compliance grounds.",
    ],
    correctAnswer: 0,
    explanation:
      "Three scenarios: the original device doesn't meet current standards (a 1990s 6 kA MCB where 10 kA breaking capacity is now needed); A4:2026 has introduced requirements it can't satisfy (older RCBOs not meeting AFDD requirements for HMO bedrooms); or a Building Regs change has made the installation non-compliant (older lighting circuits now needing RCD protection the CU can't provide). In each, repair perpetuates non-compliance and replacement brings the work to current spec. BS 7671 doesn't normally require retrofit, but failures and alterations should bring the affected work up to spec. The apprentice recognises the gap; the customer makes the commercial call; the firm has a duty to advise.",
  },
  {
    id: 5,
    question: "What's the typical lead time for ordering specialised electrical components in the UK?",
    options: [
      "Every component, standard or specialist, takes the same 24 hours because all UK wholesalers operate a next-day national service. Lead time is therefore never a factor in the repair decision; whatever you order arrives tomorrow, so you can always promise the customer a next-day return.",
      "Next-day for standard items, 2–10 working days for specialist items, and weeks to months for discontinued or international parts.",
      "Specialist components are always quicker to obtain than standard ones because manufacturers prioritise their high-value lines. An AFDD or a three-phase RCBO arrives same-day while a common single socket can take weeks, so the more unusual the part the faster the repair.",
      "Lead time depends only on how much the customer is willing to pay for delivery. Any part can be obtained within an hour if the customer pays a courier premium, so there are no inherent lead times; it is purely a question of the customer's budget for postage.",
    ],
    correctAnswer: 1,
    explanation:
      "Standard items (common-brand MCBs, RCBOs, accessories) are next-day from major wholesalers; specialist items (commercial three-phase devices, fire-alarm modules, KNX, EV charger spares) take 2–10 working days; discontinued items take weeks to months and are sometimes second-hand only; international items 2–6 weeks. 'Back in service tomorrow' sells better than 'maybe next month'. The firm's stocking strategy and supplier relationships set the practical lead times, and most established firms stock for about 80% of common faults at next-day.",
  },
  {
    id: 6,
    question: "How do environmental factors (humidity, temperature, dust, vibration) affect the repair / replace decision?",
    options: [
      "They don't affect it at all — an electrical component performs the same in any environment, so humidity, temperature, dust and vibration are irrelevant to whether you repair or replace. The IP rating is a marketing label that makes no real difference to reliability.",
      "Harsh environments always favour repair over replacement. Because a repaired component has already survived the conditions, it is proven to last, whereas a new part is untested; so the dustier or damper the location, the stronger the case for repairing rather than replacing.",
      "Significantly — in harsh environments a repair may not retain the IP rating, so replacement to current ratings is usually the right call.",
      "Environment only matters for outdoor work. Inside a building there are no environmental stresses, so humidity, temperature, dust and vibration never enter the decision for anything fitted indoors; you only consider them on external installations.",
    ],
    correctAnswer: 2,
    explanation:
      "A repair exposed to a harsh environment (outdoor, kitchen, plant room, washroom) may not last as long as the same repair in a benign one. Consider the IP / environmental rating of the repaired vs replacement component, whether the repair retains the original IP rating, and whether the new component is rated for the actual environment. Replacement often comes with current ratings; a repair preserves the existing rating, which may have degraded. Outdoor-, kitchen- and plant-room-rated devices have design choices benign-environment versions don't, so for harsh environments replacement is usually right.",
  },
  {
    id: 7,
    question: "What's the customer's role in the repair / replace decision?",
    options: [
      "The customer has no role — every aspect of the decision is the firm's. You diagnose, decide repair or replace, carry out the work and bill; the customer simply pays, and consulting them on cost or convenience only slows the job down.",
      "The customer makes every decision, including the safety ones. You present all the options, compliant and non-compliant, and the customer picks whichever they like; if they choose a below-standard repair to save money, that is their right and you carry it out.",
      "The customer's only role is to grant access to the property. Once they have let you in, they have no say in the work; you choose the option, agree it with your supervisor, and the customer is informed of the outcome at the end.",
      "The customer makes the commercial choice between compliant options; the firm decides which options are compliant.",
    ],
    correctAnswer: 3,
    explanation:
      "The customer makes the commercial decision (the cost / convenience trade-off); the firm makes the safety / compliance decision (which options satisfy BS 7671 and current standards). The apprentice presents options with trade-offs in plain English, the customer chooses, the firm executes within the safety constraint. The customer cannot choose 'below BS 7671' — that's the firm's professional duty floor, so the firm refuses non-compliant requests. Confusing the two leads to disputes: the customer pressuring the firm to bypass compliance, or the firm dictating the commercial choice.",
  },
  {
    id: 8,
    question: "When is 'replace the entire system' the right answer rather than repair / replace individual components?",
    options: [
      "When cumulative repair cost nears system cost, the system is end-of-life, multiple EICR codes apply, change-of-use occurs, or new regulations can't be met.",
      "Whenever any single component fails. One faulty RCBO means the whole consumer unit and all its circuits should be replaced, because mixing a new device with old ones is never acceptable; the failure of any part condemns the entire system.",
      "Never — you only ever replace individual components. Replacing a whole installation is outside the scope of fault correction, so however old or badly degraded the system is, you keep swapping single parts indefinitely rather than recommend a system replacement.",
      "Only when the customer asks for a smart home. System replacement is purely an upgrade-for-features decision, so you propose it solely when the customer wants new technology; the age, condition or compliance of the existing system never justifies it on its own.",
    ],
    correctAnswer: 0,
    explanation:
      "Five indicators: cumulative repair cost approaching system replacement cost (repairs at 70%+ of new); the system at end-of-life (CU 25+ years old, multiple ageing components); C1/C2 EICR findings affecting multiple aspects; building work or change-of-use giving an upgrade opportunity; and new regulatory requirements (A4:2026 or future) the system can't meet without major rework. System replacement is a major commercial decision rarely made at apprentice level — the apprentice identifies the indicators and escalates to senior.",
  },
];

const faqs = [
  {
    question: "How do I know what a replacement RCBO costs vs the labour to repair the existing one?",
    answer:
      "RCBO replacement cost: typical UK trade £18–35 for Hager / Wylex / MK ranges. Labour to swap an RCBO: 30–60 minutes (isolation, removal, install, retest, restoration). Trade hourly rate: £45–75 for L3-supervised work. So replacement of a single RCBO: £40–80 parts + £25–75 labour = £65–155 total. Repair (e.g. cleaning oxidised contact, re-torquing) is rarely possible on a sealed device — most 'repairs' on RCBOs are actually replacements. The 60–70% threshold rarely applies to RCBO; almost always replacement.",
  },
  {
    question: "Should I always quote both repair and replace options to the customer?",
    answer:
      "Yes when both are realistic. If repair is impossible (sealed device, discontinued part), don't waste customer's time. If replacement is overkill (simple loose terminal), don't suggest it. The L3 apprentice's judgment is to identify the realistic option set first, then quote those. A two-option quote (cheap option + recommended option) often serves the customer best.",
  },
  {
    question: "What if the customer demands a repair that you don't think is the right call?",
    answer:
      "Document and discuss. Explain why you think repair isn't the right call (safety, reliability, compliance reasons). If after discussion the customer still wants the repair AND the repair is BS 7671 compliant, you can do the repair with documented customer agreement. If the requested repair is below BS 7671, decline and document. The line: customer can choose between compliant options; cannot demand non-compliant work.",
  },
  {
    question: "How do I price a repair when the labour time is uncertain?",
    answer:
      "Two approaches. (1) Time + materials with a documented estimated range — 'expected 1–3 hours; we'll keep you updated; final cost based on actual time'. (2) Fixed quote with a defined scope — 'we'll do X for £Y; if scope changes we'll re-quote'. Most firms use time + materials for fault diagnosis (you don't know what you'll find) and fixed quotes for installation (scope is defined). Brief the customer on the pricing model upfront.",
  },
  {
    question: "Are there manufacturer training programmes that improve my knowledge of what's repairable?",
    answer:
      "Yes — Hager, Schneider, Wylex, MK, Aurora, Megger and Fluke all run manufacturer training (mostly free for trade customers). Hager Academy, Schneider Energy University, Megger University. The training covers product range, installation, fault diagnosis, and which faults are field-repairable vs require replacement. Worth attending in your first 2 years; builds the brand knowledge that speeds diagnosis and repair decisions.",
  },
  {
    question: "What if a repair fails — can the customer claim against the firm?",
    answer:
      "If the repair was workmanlike and BS 7671 compliant, no. If the repair was below standard or the firm should have recommended replacement instead, possibly yes. Documentation is the firm's defence — the customer's signed acceptance of the repair option, the firm's clear statement of the limitations, the post-repair retest evidence. A repair that fails because the underlying issue wasn't addressed is more defensible than a repair that fails because of poor workmanship. The L3 apprentice's role is doing the work to standard; the senior reviews the firm's overall approach.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 1"
            title="Repair vs replace — factors affecting fault correction"
            description="The practical decision framework for repair vs replace — cost (60–70% threshold), parts availability, reliability, compliance (A4:2026 layer), schedule, warranty / insurance. Brand-realism on what's typically repairable vs replacement-only."
            tone="emerald"
          />

          <TLDR
            points={[
              "Six factors: cost, parts availability, reliability, compliance, schedule, warranty / insurance. Each pulls in a direction; right answer depends on which dominate.",
              "Cost threshold: repair &gt; 60–70% of replacement = lean to replace. Sealed devices (RCBOs, drivers, AFDDs) are typically replacement-only.",
              "Customer makes the COMMERCIAL decision (cost / convenience between compliant options); firm makes the SAFETY / COMPLIANCE decision (which options are compliant).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the six-factor framework to repair vs replace decisions: cost, availability, reliability, compliance, schedule, warranty.",
              "Use the 60–70% cost threshold as a rule of thumb; adjust for high-reliability or low-budget contexts.",
              "Identify what's typically REPAIRABLE (terminations, faceplates, switch modules) vs REPLACEMENT-ONLY (RCBOs, drivers, AFDDs, sealed devices).",
              "Recognise compliance-driven replacement triggers — A4:2026 requirements, Building Regs changes, original device below current spec.",
              "Identify in-warranty / insurance fixes that may be free for the customer; check before quoting paid work.",
              "Distinguish customer's commercial decision (between compliant options) from firm's safety decision (which options are compliant).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The six-factor framework</ContentEyebrow>

          <ConceptBlock
            title="Repair vs replace is a multi-factor engineering decision"
            plainEnglish="Once the fault is diagnosed, the next decision is what to do about it. Six factors pull in different directions; the right answer depends on which factors dominate for this specific situation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. COST</strong> — repair vs replace (parts + labour). 60–70% threshold rule of thumb.</li>
              <li><strong>2. PARTS AVAILABILITY</strong> — current production, local stock, lead time, discontinued items.</li>
              <li><strong>3. RELIABILITY</strong> — repaired component long-term performance vs new component warranty + life.</li>
              <li><strong>4. COMPLIANCE</strong> — replacement may be required to meet current standards (A4:2026, Building Regs).</li>
              <li><strong>5. SCHEDULE</strong> — customer's downtime cost; emergency vs planned; lead time impact.</li>
              <li><strong>6. WARRANTY / INSURANCE</strong> — in-warranty repair may be free; check before quoting paid work.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 132.16 (Existing installations and additions or alterations)"
            clause={<>"No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances."</>}
            meaning={<>Reg 132.16 means any alteration must verify the existing supports the altered work. For fault correction this often means: a repair that brings the installation back to its previous state may need additional alteration to also bring it to current standards. Engineering decision — repair to original state, or upgrade to current spec.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 132.16."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>What\'s repairable vs replacement-only</ContentEyebrow>

          <ConceptBlock
            title="The boundary is usually \'is this a single field-replaceable unit?'"
            onSite="Sealed devices (RCBOs, drivers, AFDDs, electronic boards) are replacement-only. Assembled devices with field-accessible components (cable terminations, accessory faceplates, switch modules) are repairable. Manufacturer\'s design choice typically determines the boundary."
          >
            <p>Typically REPAIRABLE:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable terminations (re-strip, re-terminate).</li>
              <li>Accessory faceplates (replace front panel only, retain back box / wiring).</li>
              <li>Individual lampholders within fittings (some).</li>
              <li>Switch modules within plates.</li>
              <li>Mid-run cable patches (with proper junction box).</li>
              <li>Individual MCBs / RCBOs within a CU (replacement of single device, not full CU).</li>
            </ul>
            <p>Typically REPLACEMENT-ONLY:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consumer units (sealed enclosures, integrated busbar).</li>
              <li>Transformers and ballasts (factory-sealed).</li>
              <li>LED drivers (most are sealed pots).</li>
              <li>AFDDs and other electronic protective devices.</li>
              <li>Modern moulded accessories (one-piece construction).</li>
              <li>EV charger internal modules (factory-replaced as units).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Customer vs firm decision boundaries</ContentEyebrow>

          <ConceptBlock
            title="Commercial choice vs safety duty"
            plainEnglish="The customer makes the commercial decision (which compliant option fits their budget / convenience). The firm makes the safety decision (which options satisfy BS 7671 and current standards). Confusing the two leads to disputes."
          >
            <p>Decision boundary in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Firm:</strong> identifies which options are BS 7671 compliant. Refuses requests for non-compliant work.</li>
              <li><strong>Customer:</strong> chooses between compliant options based on cost / convenience / preference.</li>
              <li><strong>Joint:</strong> agreement on scope, cost, timeline, and any limitations of the chosen option.</li>
              <li><strong>Documented:</strong> the chosen option, the recommendation if the customer chose a less-preferred option, the customer\'s signed acceptance.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Spares strategy and like-for-like sourcing</ContentEyebrow>

          <ConceptBlock
            title="Repair only works if you can source the right part"
            plainEnglish="A repair-route decision rests on getting the matching part within the customer's tolerable downtime. The L3 apprentice carries enough common spares (RCBOs, accessories, terminals) to handle 80% of repairs same-visit; the rest go on a parts-ordering ticket."
            onSite="Common stocked spares to carry on the van: matched-brand B6 / B16 / B32 RCBOs (Hager, Wylex, Schneider, MK), 13 A sockets and 5 A switches in white moulded plus screwless flat-plate, 2.5 mm² and 4 mm² T+E offcuts, brown / blue / green-and-yellow sleeving, Wago 221 lever connectors. Spares that need ordering: full consumer units, ECPI-rated DIN-rail accessories, brand-matched proprietary components (e.g. Niglon Connex, Tigris)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Matched-brand replacement</strong> &mdash; Wylex Standard RCBOs do not fit a Hager Design 50 board; mixing brands inside a CU voids the manufacturer&apos;s type-test.</li>
              <li><strong>Discontinued lines</strong> &mdash; many older accessories (Crabtree Capital, MEM Memera, MK Sentry early models) are out of production. Sourcing through CEF / Edmundson / specialist reclaim, or accept that the repair route closes and replacement is the only option.</li>
              <li><strong>Lead-time tracking</strong> &mdash; commercial customers will accept a 24&nbsp;h delay if you commit to a return slot; an open-ended &ldquo;we&apos;re waiting for parts&rdquo; loses the relationship.</li>
              <li><strong>Reclaimed components</strong> &mdash; not used on safety-critical fault repairs. The temptation on a discontinued line is real; the BS 7671 case for using a second-hand RCBO is weak.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Documenting the decision and the reasoning</ContentEyebrow>

          <ConceptBlock
            title="Why the &lsquo;why&rsquo; matters as much as the &lsquo;what&rsquo;"
            plainEnglish="Every repair-vs-replace call generates a small piece of installation history. A future sparks (or a future you) needs to know not just what was done but why &mdash; especially when the choice was a budget compromise rather than the textbook answer."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Job sheet entry</strong> &mdash; identified fault, root cause, options offered, customer choice, work completed, retest results.</li>
              <li><strong>Advisory note</strong> &mdash; if the customer declined the recommended option, write it up, sign and counter-sign. Photo of signed advisory uploaded to the job record.</li>
              <li><strong>Certificate / Minor Works</strong> &mdash; the formal record under Reg 644.4. Customer keeps a copy; the firm keeps a copy on the job record.</li>
              <li><strong>Photographic evidence</strong> &mdash; before / during / after photos at the work point and at the CU. A well-photographed repair is the cheapest defence against a later complaint.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Total cost of ownership — looking past the day-one quote"
            plainEnglish="The headline repair quote is one number; the total cost of ownership is the truer figure. A cheap repair on a 25-year-old consumer unit might cost £75 today, but if the next failure follows in six months and the customer pays the call-out fee plus another repair, the cumulative cost passes the upgrade quote within a year. Engineering decisions framed as 'cost over five years' rather than 'cost today' produce honest customer recommendations and protect the firm's reputation."
            onSite="Walk the customer through the cost picture verbally. 'Today's repair is £75; based on the age of the rest of the board, you can probably expect another similar issue inside 18 months at a similar cost. The full upgrade is £450 today and removes the recurring failures.' Most customers appreciate the framing — they get to make the commercial decision with the relevant information. Some still pick the cheaper today figure; that is their right and you document it."
          >
            <p>
              TCO factors to surface in a customer conversation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Recurrence likelihood</strong> — age of equipment, history
                of similar failures, manufacturer reliability data on the
                affected component family.
              </li>
              <li>
                <strong>Call-out cost</strong> — every future visit carries the
                firm's call-out fee plus labour minimum; that adds up.
              </li>
              <li>
                <strong>Downtime cost</strong> — for a domestic customer, no
                power on a winter evening is unwelcome; for a commercial
                customer, every hour of downtime has a measurable lost-revenue
                figure.
              </li>
              <li>
                <strong>Energy efficiency</strong> — older lighting, older
                heating controls, older motors all run at lower efficiency than
                modern equivalents; the upgrade can pay for itself in saved
                energy over its life.
              </li>
              <li>
                <strong>Insurance and conveyancing</strong> — a modern
                installation supports lower buildings insurance and easier
                conveyancing; the upgrade has resale value.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Manufacturer support, EOL and the discontinued-line problem"
            plainEnglish="Electrical manufacturers cycle their product lines. A consumer unit family in production today may be discontinued in five years, with replacement parts available for another five then unavailable. End-of-life (EOL) status changes the repair-vs-replace calculus — a discontinued accessory means the next failure on the same line forces a different family of replacement, often with a non-trivial install cost."
            onSite="Check manufacturer EOL status before quoting a repair. Wylex, Hager, Crabtree, Schneider, BG, MK and Fusebox all publish EOL announcements; trade wholesalers (Edmundson, CEF, Newey & Eyre, Rexel) flag EOL on their catalogue search. If the line is EOL or the manufacturer is winding down support, factor that into the quote — the customer needs to know that today's repair is the last cheap one on this board. The L3 apprentice carrying that EOL knowledge sounds informed and protects the customer from a worse surprise next year."
          >
            <p>
              EOL signs to watch for and what to do:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manufacturer EOL announcement</strong> — published on the
                manufacturer's professional site; typically gives a year of
                continued spares support before stock dries up.
              </li>
              <li>
                <strong>Wholesaler back-order</strong> — if the trade counter
                cannot get a part within a week, that is the early warning of
                EOL; the manufacturer is winding the line down.
              </li>
              <li>
                <strong>Limited compatibility families</strong> — some CU lines
                will accept generic 60898 MCBs; others have proprietary modules
                only. Check before quoting.
              </li>
              <li>
                <strong>Customer brief on EOL</strong> — explain plainly that
                future repairs may force a board upgrade; let the customer
                decide whether to pre-empt now or wait for the next failure.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Spares strategy — what to carry on the van and what to source on demand"
            plainEnglish="The firm's spares strategy controls how fast a repair completes. Every-day stock on the van — 32 A B-curve RCBO, 16 A B-curve RCBO, double socket, single switch, 1.5/1.0 mm² T&E offcut — covers the majority of domestic faults same-day. Less common items — Type C MCBs, AFDDs, three-phase RCBOs, specific manufacturer accessories — get sourced from the trade counter or back-ordered from the manufacturer. The L3 apprentice plans the visit knowing what is on the van vs what needs sourcing."
            onSite="Before leaving the depot, scan the van inventory for the parts the day's job list calls for. If the morning's first job is a Wylex NHX RCBO replacement and the van only has Hager spares, divert to the wholesaler before the customer site. Customer call-outs that finish in one visit get five-star reviews; visits that need a return trip cost the firm a slot of the next day's diary and feel slow to the customer. Maintain the van inventory weekly; replenish what was used; flag low-stock to the office."
          >
            <p>
              Typical L3 van spares stock items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RCBOs</strong> — common ratings (6 A, 16 A, 20 A, 32 A
                B-curve) in the manufacturer families the firm services most
                (Wylex, Hager, Crabtree, BG).
              </li>
              <li>
                <strong>MCBs</strong> — same ratings, B and C curves, in the
                same manufacturer families.
              </li>
              <li>
                <strong>Common accessories</strong> — single and double sockets,
                light switches (1, 2 and 3 gang), pendant lampholders, 13 A
                fused connection units.
              </li>
              <li>
                <strong>Cable</strong> — 1.5/1.0, 2.5/1.5, 4.0/1.5, 6.0/2.5 mm²
                T&E in 5 m offcuts; flex 0.75 mm² and 1.0 mm² for fittings.
              </li>
              <li>
                <strong>Bonding</strong> — 10 mm² and 16 mm² green-and-yellow,
                bonding clamps for gas and water meters.
              </li>
              <li>
                <strong>Low-volume or specialist parts</strong> — sourced same
                day from the trade counter; the L3 apprentice knows the local
                wholesaler's stock and opening hours.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.5"
            clause={
              <>
                "For an addition or alteration to an existing installation, it shall be verified that the addition or alteration complies with BS 7671 and does not impair the safety of the existing installation."
              </>
            }
            meaning={
              <>
                Most fault repairs sit under Reg 641.5 because they alter the existing installation. The dual test &mdash; the new bit complies AND the existing safety case isn&apos;t worsened &mdash; frames the repair-vs-replace decision. A repair that puts the installation back to the state it failed in might leave the safety case impaired and trigger replacement instead.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.5, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 644.4"
            clause={
              <>
                "The person or persons responsible for the design, construction and verification of the installation shall issue the Certificate, which takes account of their respective responsibilities, to the person ordering the work, together with the records mentioned in Regulation 644.3."
              </>
            }
            meaning={
              <>
                The repair generates a certificate &mdash; either an EIC for a new circuit or distribution board, or a Minor Electrical Installation Works Certificate (MEIWC) for circuit alterations. The Regulation makes certificate issue the responsibility of the person who did the work, not optional and not contingent on customer request.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 644.4, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting one option without explaining alternatives"
            whatHappens={<>Apprentice diagnoses a fault and quotes only the most expensive solution (full CU replacement). Customer feels overcharged; gets second opinion from another firm; second firm quotes the cheaper compliant option (single RCBO replacement). Customer dismisses the original firm; bad reputation; lost work. The original quote wasn\'t wrong — but presenting only one option felt like upsell to the customer.</>}
            doInstead={<>For non-trivial decisions, quote 2–3 options with trade-offs explained. Customer feels respected as a decision-maker; firm preserves trust; commercial relationship continues. Multi-option quoting takes 5 more minutes and prevents the \'they tried to upsell me' complaint.</>}
          />

          <CommonMistake
            title="Accepting a customer\'s request for non-compliant repair"
            whatHappens={<>Customer can't afford the recommended fix and asks the apprentice to \'just patch it' below BS 7671 spec. Apprentice (under pressure) does the patch. Six months later the patch fails, causes a fire. Insurance investigates; finds the work was below BS 7671; firm\'s professional indemnity refuses cover; the apprentice is named in the prosecution alongside the firm.</>}
            doInstead={<>Below BS 7671 is non-compliance, not engineering. If the customer can\'t afford the right fix: (1) Decline the work (better than installing unsafe). (2) Quote a smaller compliant scope. (3) Escalate to senior to make the call. The customer\'s budget is not your professional duty; BS 7671 is.</>}
          />

          <Scenario
            title="25-year-old CU with a failing RCD"
            situation={<>You\'re at a property to investigate an RCD that\'s failing the trip-time test (350 ms at I∆n vs 300 ms maximum). The CU is a 25-year-old Wylex Standard. Customer asks about repair vs replace.</>}
            whatToDo={<>Apply the six-factor framework. (1) Cost: replacement RCD ~£30 + 1 hr labour = £75 total. Repair impossible (sealed device). (2) Parts: Wylex Standard RCDs still in production; available next-day. (3) Reliability: 25-year-old RCD failing the test; replacement gives full warranty + life. (4) Compliance: replacement RCD must satisfy current Type A requirement (existing may be Type AC under A2:2022 retrofit guidance); discuss with customer. (5) Schedule: same-day replacement available. (6) Warranty: existing RCD out of warranty (way past 5-year manufacturer warranty). Decision: replace the RCD AND consider broader CU upgrade given age. Quote two options to customer: (A) £75 replace single RCD — addresses immediate fault; CU still 25 years old; further failures likely soon. (B) £450 full CU replacement to all-RCBO Wylex NHX — addresses fault + future-proofs for next 25 years; upgrades to A4:2026 compliant configuration. Customer chooses A (budget constraint). Document recommendation B as advisory; customer signs acceptance of A. Complete the work; retest; document.</>}
            whyItMatters={<>The structured six-factor analysis gives the customer a defensible engineering decision. Both options are BS 7671 compliant; the customer\'s commercial choice is informed; the firm has documented its recommendation for future reference. The L3 apprentice\'s role is option presentation + trade-off explanation; the customer makes the commercial call.</>}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Six factors for repair-vs-replace: cost, parts availability, reliability, compliance, schedule, warranty / insurance.",
              "Cost threshold: repair &gt; 60–70% of replacement = lean to replace. Adjust for high-reliability or low-budget contexts.",
              "Repairable: terminations, faceplates, switch modules, individual MCBs / RCBOs (within CU), mid-run cable patches.",
              "Replacement-only: consumer units (sealed), drivers, AFDDs, modern moulded accessories, electronic protective devices.",
              "Compliance can force replacement: A4:2026 requirements, Building Regs changes, original device below current spec.",
              "Check warranty / insurance before quoting paid work — in-warranty fix is free for the customer.",
              "Customer makes commercial decision (which compliant option); firm makes safety decision (which options are compliant). Don't confuse.",
              "Quote 2–3 options with trade-offs. Customer feels respected; firm preserves trust; commercial relationship continues.",
            ]}
          />

          <Quiz title="Repair vs replace — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.4 Root cause</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.2 Verification + retesting</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
