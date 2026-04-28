/**
 * Module 6 · Section 2 · Subsection 6 — Load schedule consolidation
 * Maps to C&G 2365-03 / Unit 305 / LO2 / AC 2.7
 *   AC 2.7 — "Consolidate diversity factors across mixed-occupancy installations
 *             and produce a load schedule that supports protective device
 *             selection and supply sizing"
 *
 * Layered depth: 2366-03 Unit 304 / AC 2.6; 5393-03 Unit 104 / AC 2.6
 *
 * Mixed commercial-plus-domestic worked example. The page where Section 2
 * lands — every diversity rule from 2.1 to 2.5 collides on one schedule.
 * Anchor calc is a small mixed-use block: ground-floor retail plus four
 * one-bed flats above, single supply, single intake. Walk the maths line
 * by line and produce the consolidated maximum demand the L3 designer
 * hands to the DNO.
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

const TITLE = 'Load schedule consolidation (2.7) | Level 3 Module 6.2.6 | Elec-Mate';
const DESCRIPTION =
  "Consolidating diversity for a mixed commercial-plus-domestic block. Worked example: ground-floor retail plus four flats above, single supply. Line-by-line maximum demand for the DNO connection enquiry.";

const checks = [
  {
    id: 'sched-mix',
    question:
      "A small block has retail on ground (calculated MD 38 A per phase after diversity) and four one-bed flats above (each MD 18 A after diversity, all single-phase). Single TP+N intake. The consolidated MD on the heaviest phase using simple worst-case loading is closest to:",
    options: [
      "All loads added on every phase: 38 + (4 x 18) = 110 A per phase.",
      "Worst-case — retail on the heaviest phase (38 A) plus flats balanced across the three phases: 38 + 18 + 18 = 74 A on the worst phase (two flats land on the same phase as retail), about 56 A on the other two.",
      "Just the retail figure: 38 A.",
      "Average across phases: (38 + 4 x 18) / 3 = 37 A per phase.",
    ],
    correctIndex: 1,
    explanation:
      "Mixed-supply consolidation must respect phase balance. Retail (single-phase or balanced TP) lands on whichever phase the meter is wired to. The four flats are balanced two-and-two across the remaining phases: with four flats on three phases the heaviest phase will carry two flats. Worst case is therefore retail-phase plus two flats: 38 + 36 = 74 A. The L3 designer presents this to the DNO as the per-phase MD with a clear note on the assumed phasing. Adding everything on every phase (110 A) is wrong; using only retail (38 A) is wrong; averaging is wrong because the supply sizes for the worst phase, not the average.",
  },
  {
    id: 'sched-pme',
    question:
      "On the same mixed block the DNO offers a TN-C-S (PME) supply with declared Ze of 0.35 ohms. The intake fuse is BS 88-3 100 A. Why does the L3 designer record the PME declaration on the load schedule rather than treat the supply as TN-S?",
    options: [
      "Because PME and TN-S behave the same.",
      "Because the earthing arrangement governs Zs at every final circuit, governs the main earthing conductor and bonding sizes (Reg 544), and triggers the A4:2026 PNB / TN-C-S notes around BS 7430 conditions and metal water service interaction. The TN type is the single most consequential supply parameter on the schedule.",
      "Because the DNO requires it.",
      "Because PME supplies have a higher Ze.",
    ],
    correctIndex: 1,
    explanation:
      "TN type is the parameter that propagates through the rest of the design. PME (TN-C-S) requires a 16 mm² minimum main earthing conductor for a 100 A supply (Table 54.7 / 544.1.1), 10 mm² minimum main bonding to gas, water and oil (Table 54.8), specific care around metal water service entries, and an EV charger O-PEN protection or earth electrode arrangement (Reg 722.411.4.1). TN-S has different defaults. Designing without knowing the TN type is designing without a foundation. The schedule records it on the cover page and every Zs calc downstream uses the declared Ze.",
  },
  {
    id: 'sched-future',
    question:
      "The retail tenant tells you they will add a 7 kW EV charger for staff in two years. The flats may add EV chargers individually as residents change. The right way to record this on the consolidated schedule today is:",
    options: [
      "Ignore it — design for current loads only.",
      "Add a 'future load reservation' line for each foreseeable load with its expected MD after diversity, sum it into a 'design ultimate MD' that the supply, main switchgear and tails are sized for, with a note explaining what is committed today vs reserved.",
      "Size everything for ten times current load just in case.",
      "Tell the DNO informally and forget the schedule.",
    ],
    correctIndex: 1,
    explanation:
      "Reg 132.13 documentation is for the whole installation life, not just today. The competent way is a 'design ultimate' column alongside 'design current' — supply, intake, main tails and CU busbars sized for the ultimate; circuit-level installs done as required. The DNO connection enquiry quotes the ultimate MD with the staging plan; the EIC notes which loads are commissioned vs reserved. This avoids the rip-out problem when the EV charger is added two years later and the tails are 16 mm where 25 mm was needed.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is consolidating diversity across mixed occupancy harder than the per-section calc?",
    options: [
      "Because the maths is different.",
      "Because each section uses its own diversity assumptions (commercial after-diversity factors, domestic per-Appendix-1 demand pattern, EV / heat pump behaviour) and the consolidated schedule has to add them on a phase-by-phase basis without losing the engineering logic behind each block.",
      "Because there is no rule for it.",
      "Because the DNO does the calc for you.",
    ],
    correctAnswer: 1,
    explanation:
      "Each load block — retail, residential, EV, heat pump, lift, life-safety — has its own diversity logic. Consolidating means respecting each block's assumption and then assembling a phase-balanced view of the whole. The risk is mixing logics: applying domestic diversity to a commercial space, or treating an EV charger as an Appendix 1 socket-outlet circuit. The consolidated schedule documents the logic block by block before summing.",
  },
  {
    id: 2,
    question: "The single most consequential supply parameter recorded on a consolidated load schedule is:",
    options: [
      "The declared PSCC.",
      "The TN type — TN-S, TN-C-S (PME), TT — because earthing arrangement, main earthing conductor sizing, main bonding sizing, EV protection method, and Zs at every final circuit all depend on it.",
      "The intake fuse rating.",
      "The number of phases.",
    ],
    correctAnswer: 1,
    explanation:
      "The TN type cascades through every later decision. Get it wrong on the cover sheet and every Zs calc is wrong, every conductor size is wrong, every EV protection scheme is wrong. The consolidated schedule records it boldly on page one along with declared Ze and PSCC.",
  },
  {
    id: 3,
    question: "On a mixed retail-plus-residential block sharing a single intake, the heaviest single-phase MD is found by:",
    options: [
      "Adding everything on every phase.",
      "Allocating each block to the phase it actually lands on — retail to its meter phases, flats balanced across the remaining capacity — and reporting the phase with the highest sum.",
      "Dividing the total by three.",
      "Picking the largest single load.",
    ],
    correctAnswer: 1,
    explanation:
      "Per-phase loading sets the supply sizing. Retail meters land on whichever phases the DNO meter wires up. Domestic flats are balanced across phases (two-and-two for four flats on three phases means the heaviest phase carries two). The schedule shows the per-phase split openly so the DNO and the future designer can both see the worst-case.",
  },
  {
    id: 4,
    question: "Reg 311.1 (BS 7671 A4:2026) requires the designer to assess maximum demand. The consolidated schedule satisfies this when it shows:",
    options: [
      "Just the headline total.",
      "Connected load, applied diversity factors per block with citations, after-diversity demand per block, per-phase consolidation, and a single-figure consolidated MD that the supply is sized against — all on the face of the schedule with the assumptions stated.",
      "The calc on a separate spreadsheet only.",
      "Just the EIC.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 311.1 is satisfied by visible, traceable assessment. The consolidated schedule is the artefact — connected load shown, diversity assumption stated against each block, after-diversity figure proven, per-phase split shown, headline MD declared. A future inspector or designer can verify the calc without ringing you. A spreadsheet you keep in your inbox does not satisfy 311.1; what is on the design pack does.",
  },
  {
    id: 5,
    question: "When the DNO connection enquiry asks for the maximum demand, the value to give is:",
    options: [
      "The sum of all connected load.",
      "The consolidated after-diversity per-phase MD plus a clearly labelled 'design ultimate' figure that includes foreseeable future loads, with the staging plan attached.",
      "Only what is being installed today.",
      "Whatever number leaves the most headroom.",
    ],
    correctAnswer: 1,
    explanation:
      "DNO connection enquiries should be honest and forward-looking. Quoting only today's MD leaves the customer to apply for an upgrade in two years; quoting an unrealistic ultimate inflates the supply cost. Quote the consolidated MD now plus the design ultimate with the foreseeable-future loads and the staging assumption, and let the DNO size the supply for the ultimate while metering the current draw. This is what professional connection-engineering looks like.",
  },
  {
    id: 6,
    question: "On the consolidated schedule, the line that triggers the most conversation with Building Control is usually:",
    options: [
      "The protective device list.",
      "The total floor area and occupancy classification — because that drives life-safety load assumptions (emergency lighting, fire alarm, smoke ventilation), Part B fire compliance, and whether the installation falls under HRRB / Building Safety Act 2022 scrutiny.",
      "The cable schedule.",
      "The earthing arrangement.",
    ],
    correctAnswer: 1,
    explanation:
      "Floor area and occupancy classification drive life-safety load. Emergency lighting on Cat 3 changeover, fire alarm panel and standby supply, smoke ventilation interlocks, accessibility lift if Part M applies — all of these add to the load schedule and bring Building Control questions. On a residential block above 18 m the Building Safety Regulator gateway 2 review will ask to see this line proven.",
  },
  {
    id: 7,
    question: "What does the consolidated schedule's 'per-phase balance' figure tell the design team?",
    options: [
      "Nothing useful.",
      "Whether the load is well balanced (similar values on all three phases — efficient, low neutral current) or imbalanced (one phase dominant — high neutral, possible 4th-wire derate, possible voltage imbalance issues for the worst-loaded tenant).",
      "Whether the supply is TT.",
      "Whether the supply is overhead.",
    ],
    correctAnswer: 1,
    explanation:
      "Per-phase balance is an indicator the L3 designer should always read. Imbalance above ~15-20 percent between phases at the consolidated MD point means heavy neutral current, possible voltage imbalance at the most-loaded tenant, and a derate consideration on the neutral conductor for harmonic-rich loads. Rebalance by re-assigning sub-meters to phases before going to the DNO with the enquiry.",
  },
  {
    id: 8,
    question: "The consolidated schedule for a four-flat-plus-retail block reports headline MD 74 A on the heaviest phase. The DNO standard is 80 A per phase domestic. The L3 designer's next step is:",
    options: [
      "Submit the connection enquiry as-is — within standard.",
      "Confirm headroom for the future EV / heat-pump loads in the design ultimate column; if the ultimate exceeds the standard 80 A per phase capacity, request a 100 A or load-management upgrade now while the build is open, rather than reapplying when the spare way is wired in two years.",
      "Reduce design loads to fit.",
      "Pick a different DNO.",
    ],
    correctAnswer: 1,
    explanation:
      "Designing only to today's MD is short-termism. If the design ultimate (with EVs and heat pumps that the brief flags as foreseeable) exceeds the standard 80 A per phase, ask now for the upgrade or for a load-management connection. The DNO charges for an upgrade later are usually more disruptive and more expensive than asking up front while the trench is open and the meters are being wired. This is the L3 design pen at its most useful.",
  },
];

const faqs = [
  {
    question: "Do I have to balance loads across phases as a designer, or is that the DNO's problem?",
    answer:
      "It is the designer's problem. The DNO supplies a balanced source; how the load is allocated across phases is a design decision made by you when you allocate sub-meters and main switches. A four-flat-plus-retail block with all four flats on the same phase as retail will overload that phase and under-utilise the other two. The L3 designer assigns each tenant supply to a phase to balance the consolidated load — and records the assignment on the schedule so the meter installer cannot get it wrong. Rebalancing after handover is usually a bigger job than getting it right the first time.",
  },
  {
    question: "How do I cite diversity assumptions on a consolidated schedule when each block uses a different reference?",
    answer:
      "Cite each block's reference inline against its diversity row. Domestic flats: 'IET On-Site Guide Appendix A or BS 7671 Appendix 1 Table A1' for the per-flat MD calc. Retail commercial: 'engineering judgement based on retailer load survey, OSG Table A1 categories adjusted'. Lift: 'manufacturer datasheet plus 1.25 starting allowance'. Emergency lighting and fire alarm: 'BS 5266 / BS 5839 standby loads, 100 percent demand'. Each row stands on its own citation. The schedule then sums the per-block after-diversity figures and shows the consolidated total.",
  },
  {
    question: "Should the consolidated schedule include solar PV generation?",
    answer:
      "Yes, but as a separate generation block, not as a load reduction. PV is intermittent, statistically uncorrelated with peak demand, and the consolidated MD on the schedule is for supply sizing — which has to support the case where PV is producing zero. Show the PV generation capacity on the cover sheet with its own row (kWp installed, peak inverter AC current, export limit if any) but do not subtract it from the MD. For G99 / G100 export-limit purposes the generation block is the relevant data; for supply sizing the gross load MD is.",
  },
  {
    question: "What changes about the consolidated schedule for an HRRB residential block?",
    answer:
      "Several things harden. The schedule becomes part of the 'golden thread' under the Building Safety Act 2022 — versioned, retained for the building's life, and traceable to a named competent designer. Life-safety loads (sprinkler pumps, smoke ventilation, fire-fighters' lift, fire alarm panel and standby) require explicit lines with 100 percent demand and category-specific source documentation (BS 9991, BS 7346, BS 5839 Part 1). Reg 421.1.7 AFDD recommendation is likely to harden into a Building Safety Regulator expectation for HRRB final circuits, so the schedule shows AFDD-protected ways. The connection enquiry to the DNO becomes a managed engagement rather than a form-filling exercise.",
  },
  {
    question: "Is there a single template I can use for the consolidated schedule?",
    answer:
      "There is not, and any template you find will need adapting. The IET produces example schedules in Guidance Note 1 (Selection and Erection) and Guidance Note 3 (Inspection and Testing); NICEIC and NAPIT publish member templates; Cadmium Pro and Tysoft Easycert produce schedules out of design data. What matters is not the template but the content: connected load, diversity citation per block, after-diversity per block, per-phase consolidation, headline MD, design ultimate, supply parameters (TN type, declared Ze, PSCC), main switchgear sizing, and a signed-and-dated header. If your schedule shows all of those clearly, the template is fine.",
  },
  {
    question: "How often does the consolidated schedule get re-issued?",
    answer:
      "On any change to the connected load, on any change to the supply (DNO upgrade, switch from TT to TN-C-S, three-phase from single-phase), and at every formal design milestone (Stage 3 / Stage 4 RIBA on a notable build). Re-issued versions carry a revision letter (Rev A, Rev B) and a brief change note on the cover. Older revisions stay in the design pack; the current revision flies the header. On a small CU upgrade the revision is one issue at handover. On a phased fit-out the revision history can run to a dozen entries by completion.",
  },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 6"
            title="Load schedule consolidation — mixed-use worked example"
            description="The page where every diversity rule from 2.1 to 2.5 collides on one schedule. Anchor calc: ground-floor retail plus four one-bed flats above, single TN-C-S intake. Walk the maths line by line and produce the consolidated maximum demand the L3 designer hands to the DNO."
            tone="amber"
          />

          <TLDR
            points={[
              "Consolidating diversity is not 'add the totals'. Each block — retail, residential, life-safety, EV, heat pump — uses its own diversity logic. The consolidated schedule keeps each logic visible and sums on a per-phase basis.",
              "TN type is the most consequential parameter on the schedule cover. It governs main earthing conductor size, main bonding size, EV protection method, and every Zs calc downstream.",
              "Always show 'design current today' alongside 'design ultimate' on the schedule — the DNO connection enquiry uses ultimate, the meter today is sized for current draw, and the customer avoids a rip-out two years later when the EV charger goes in.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Consolidate diversity factors from multiple blocks of an installation onto a single schedule, preserving each block's logic and citation.",
              "Allocate single-phase loads across a three-phase intake to balance per-phase demand, and report the worst-case phase as the supply-sizing figure.",
              "Distinguish 'design current today' from 'design ultimate' and document foreseeable future loads (EV, heat pump, PV) so the DNO connection enquiry sizes correctly.",
              "Cite diversity assumptions per block — On-Site Guide tables, manufacturer datasheets, IET Guidance Notes — so the schedule is verifiable by an inspector or future designer.",
              "Identify when consolidated MD triggers a DNO upgrade or load-management connection rather than a standard 80 A or 100 A per-phase service.",
              "Produce a consolidated schedule that satisfies BS 7671 Reg 311.1 (assessment of maximum demand) and Reg 132.13 (documentation) on the face of the design pack.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="What 'consolidation' actually means"
            plainEnglish="Each part of the building has its own diversity calc. The consolidated schedule keeps those calcs intact and sums them onto one cover sheet, on a per-phase basis, with the assumptions visible."
            onSite="The mistake is to flatten everything into one mega-table with one diversity factor. You lose the engineering logic, you cannot defend the figure, and you cannot revise one block without redoing the whole calc."
          >
            <p>
              On any installation more complicated than a single house, the load is split into blocks
              — flats, retail units, common services, life safety, vehicle charging, heat — and each
              block uses its own diversity assumption. A flat uses domestic Appendix 1 / On-Site
              Guide Appendix A logic. A retail unit uses commercial after-diversity factors based
              on the tenant's likely fit-out. A lift uses the manufacturer datasheet plus a starting
              allowance. The consolidated schedule preserves each block's calc and cites it, then
              sums on a per-phase basis to give the supply-sizing figure.
            </p>
            <p>
              Compare with the wrong approach: drop every connected load onto a spreadsheet, apply
              one global diversity factor (60 percent, 75 percent — pick a number) and report the
              total. That is unverifiable and almost always wrong — sometimes high (oversized
              supply, customer pays for unused capacity), sometimes dangerously low (undersized
              supply, intake fuse blowing on a busy Friday). The consolidated approach is the
              professional standard.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.1 (Maximum demand)"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. When determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            meaning={
              <>
                Reg 311.1 says two things. First, you must assess maximum demand — not guess, not
                copy from the previous job, but assess. Second, diversity may be taken into account
                — meaning the assessment is allowed to use after-diversity demand rather than raw
                connected load. The consolidated schedule is how you demonstrate compliance with
                311.1 on a multi-block installation: each block assessed, each diversity factor
                cited, the per-phase consolidation visible, the headline MD declared.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 311.1. See also IET On-Site Guide Appendix A (residential diversity tables) and Guidance Note 1 (Selection and Erection)."
          />

          <SectionRule />

          <ContentEyebrow>The anchor worked example — retail plus four flats</ContentEyebrow>

          <ConceptBlock
            title="The brief — small mixed-use block"
            plainEnglish="Ground-floor retail unit (cafe and small kitchen). Four one-bed flats above. Single intake from the DNO, TN-C-S (PME), three-phase."
            onSite="This is the kind of job that lands as a design enquiry once a month. The owner wants to know what supply to ask the DNO for; you produce the consolidated schedule that answers it."
          >
            <p>
              Site brief:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Ground-floor retail — small cafe with espresso machine, dishwasher, undercounter
                fridge x2, microwave x2, induction hob 7 kW, oven 5 kW, hot water 9 kW, lighting
                1.5 kW, sockets ring, water boiler 3 kW, EPOS / refrigerated display.
              </li>
              <li>
                Four one-bed flats — each with electric shower 9.5 kW, oven 5 kW, hob 7 kW (two of
                the four), gas hob (other two), immersion 3 kW (two of the four), lighting 0.4 kW,
                two ring socket circuits.
              </li>
              <li>
                Common services — entrance and corridor lighting (LED, 0.5 kW), entry door release,
                CCTV (0.2 kW), small lift (5.5 kW motor, 11 A FLC three-phase), refuse-store
                lighting.
              </li>
              <li>
                Life safety — emergency lighting (self-contained, 0.05 kW continuous trickle),
                Grade A fire alarm panel and standby (0.1 kW continuous).
              </li>
              <li>
                Future loads flagged by client — 7 kW EV charger for staff at retail (committed for
                year 2), residents' EV chargers individually as residents change (foreseeable, no
                committed timing).
              </li>
              <li>
                Supply offered — TN-C-S (PME), three-phase 400 V, declared Ze 0.35 ohms, PSCC
                16 kA at the intake, intake cut-out BS 88-3 100 A per phase as standard offer.
              </li>
            </ul>
            <p>
              The L3 designer's job: turn the brief into a consolidated load schedule, declare the
              headline MD, decide whether the standard 100 A per phase is sufficient, and lodge the
              connection enquiry.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Block 1 — retail unit calc"
            plainEnglish="Use commercial after-diversity figures. The cafe will not run every hot appliance simultaneously; the L3 designer assesses likely concurrent load."
          >
            <p>
              Connected load (single-phase 230 V where unspecified):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Induction hob 7 kW @ 100 percent (cooking peak): 7 kW.</li>
              <li>Oven 5 kW @ 100 percent: 5 kW.</li>
              <li>Hot water 9 kW @ 75 percent (cycling): 6.75 kW.</li>
              <li>Espresso, water boiler, microwave x2 — combined 6 kW @ 50 percent (intermittent): 3 kW.</li>
              <li>Fridges, EPOS, display refrigeration — combined 1.8 kW @ 100 percent (continuous): 1.8 kW.</li>
              <li>Lighting 1.5 kW @ 90 percent (open-hours steady): 1.35 kW.</li>
              <li>Sockets ring — assessed 2 kW @ 100 percent (small kit, kettle, blenders): 2 kW.</li>
            </ul>
            <p>
              After-diversity demand: 7 + 5 + 6.75 + 3 + 1.8 + 1.35 + 2 = 26.9 kW. At single-phase
              230 V the line current would be 26900 / 230 = 117 A. That exceeds the practical
              single-phase service for a retail unit. The L3 designer specifies a three-phase TP+N
              intake to the retail meter (DNO standard for commercial), balancing across three
              phases. After-diversity per phase = 26900 / (3 x 230) = 39 A per phase, balanced.
            </p>
            <p>
              Cite: 'After-diversity assessment per IET Guidance Note 1, commercial cafe load survey
              base; manufacturer hot-water cycle assumption 75 percent steady; sockets assessed at
              2 kW based on tenant equipment list.'
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="Block 2 — flats calc, per flat"
            plainEnglish="Domestic diversity per On-Site Guide Appendix A. The flat will not run shower, hob, oven and immersion all at the same time."
          >
            <p>
              Per flat with electric hob and electric shower (worst case, two of the four flats):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Shower 9.5 kW @ 100 percent (largest single load — counted full): 9.5 kW.</li>
              <li>Hob 7 kW: first 10 A at 100 percent + 30 percent of remainder (OSG cooking diversity for households other than small flats — adjusted for one-bed flat): assessed 4 kW.</li>
              <li>Oven 5 kW: 30 percent of remainder of cooking allowance: 1.5 kW.</li>
              <li>Immersion 3 kW (where present): 100 percent (water heater on its own circuit): 3 kW.</li>
              <li>Lighting 0.4 kW @ 66 percent: 0.26 kW.</li>
              <li>Sockets — domestic ring assessed at 2 kW (small flat appliance load): 2 kW.</li>
            </ul>
            <p>
              After-diversity demand per worst-case flat (with shower, hob, oven, immersion and
              sockets): 9.5 + 4 + 1.5 + 3 + 0.26 + 2 = 20.26 kW. At 230 V single-phase that is
              88 A per flat — uncomfortably close to the 100 A intake fuse on a per-flat basis,
              hence the importance of diversity in the assessment.
            </p>
            <p>
              The two flats with gas hob and no immersion have lower per-flat MD: 9.5 + 0 + 0 + 0 +
              0.26 + 2 = 11.76 kW = 51 A. Average per flat for the block = (88 + 88 + 51 + 51) / 4 =
              69.5 A per flat (single-phase).
            </p>
            <p>
              Cite: 'IET On-Site Guide Appendix A Table A1 (residential single household with
              electric cooking appliance), flat-by-flat assessment, simultaneity factor not applied
              between flats per OSG guidance for blocks of similar dwellings.'
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Block 3 — common services, life safety, lift"
            plainEnglish="Small fixed loads — but they all run when peak demand happens, so they sit at 100 percent."
          >
            <p>
              Common services and life safety (continuous, 100 percent demand):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Entrance / corridor LED lighting: 0.5 kW = 2.2 A.</li>
              <li>Entry door release, CCTV: 0.2 kW = 0.9 A.</li>
              <li>Refuse-store lighting: 0.1 kW = 0.4 A.</li>
              <li>Emergency lighting trickle: 0.05 kW = 0.2 A.</li>
              <li>Fire alarm panel + standby trickle: 0.1 kW = 0.4 A.</li>
            </ul>
            <p>
              Total common services load: 0.95 kW = 4.1 A on whichever phase the common-services
              meter sits.
            </p>
            <p>
              Lift (small four-stop, 5.5 kW three-phase motor, FLC 11 A balanced across all three
              phases). Running diversity 100 percent (lift will run at peak), starting allowance
              1.25 x for sequential allocation: 11 x 1.25 = 13.75 A per phase peak. The supply must
              cope with the lift starting on top of the flats and retail running, so the
              consolidation row uses 14 A per phase for the lift block.
            </p>
            <p>
              Cite: 'Manufacturer lift datasheet 5.5 kW motor, 11 A FLC balanced; 1.25 x starting
              allowance per IET Guidance Note 1; common services at 100 percent per BS 5266 / BS
              5839 standby continuous loads.'
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Per-phase consolidation</ContentEyebrow>

          <ConceptBlock
            title="Allocating loads across phases"
            plainEnglish="Now you fit each block onto the three phases of the intake. The aim is balance — and the worst-loaded phase sets the supply size."
          >
            <p>
              Three-phase intake L1 / L2 / L3. Allocations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Retail meter (TP+N, balanced) — 39 A on each of L1, L2, L3.</li>
              <li>Flat 1 (88 A) — allocated to L1 (single-phase meter).</li>
              <li>Flat 2 (88 A) — allocated to L2.</li>
              <li>Flat 3 (51 A) — allocated to L3.</li>
              <li>Flat 4 (51 A) — allocated to L1 (rebalancing, putting larger flat first then loaded smaller flat to same phase as larger of remaining options).</li>
              <li>Common services (4.1 A) — allocated to L2.</li>
              <li>Lift (14 A balanced) — adds 14 A to each of L1, L2, L3.</li>
            </ul>
            <p>
              Per-phase totals (rounded):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1 = 39 (retail) + 88 (flat 1) + 51 (flat 4) + 14 (lift) = 192 A.</li>
              <li>L2 = 39 + 88 + 4.1 + 14 = 145 A.</li>
              <li>L3 = 39 + 51 + 14 = 104 A.</li>
            </ul>
            <p>
              That is a problem — L1 is dragged way over by carrying two flats including the larger
              flat 1. Re-allocate: put flats 1 and 3 on L1 (88 + 51 = 139), flats 2 and 4 on L2 (88 +
              51 = 139), nothing extra on L3 from the flats. Re-do:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1 = 39 + 139 + 14 = 192 A — still high because flat 1 is the dominant load.</li>
              <li>L2 = 39 + 139 + 4.1 + 14 = 196 A.</li>
              <li>L3 = 39 + 14 = 53 A — under-loaded.</li>
            </ul>
            <p>
              The fundamental problem is that the after-diversity per-flat MD on the
              electric-shower-plus-electric-hob flats is 88 A — heavy enough that any phase carrying
              one of them is dominated by it. The honest engineering answer is: the standard 100 A
              per phase supply does not fit this block once you account for two-flat-per-phase
              loading on shower-plus-hob flats. The L3 designer either lobbies the client to allow
              gas hobs in the bigger flats (drops MD substantially), or applies for a 200 A per
              phase supply, or specifies a load-management scheme on the flat shower circuits.
            </p>
            <p>
              This is the single most useful output of the consolidation calc — it surfaces the
              supply-sizing problem at design stage, when there is still time to do something about
              it, instead of at handover when nothing trips and the customer cannot understand why
              their morning shower drops the lift.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation into circuits)"
            clause="Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance (see also Chapter 46 and Section 537); (c) take account of hazards that may arise from the failure of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances (see also Chapter 44); (f) prevent the indirect energizing of a circuit intended to be isolated."
            meaning={
              <>
                Reg 314.1 frames per-phase imbalance and the consolidation calc — splitting
                installations into circuits and sub-mains so faults, harmonic currents and
                imbalance do not propagate widely. On a small mixed block, allocation is
                manageable; on a larger block with heavy single-phase cooking loads the imbalance
                directly limits the practical supply size and may require either a phase-balanced
                load-management scheme or moving the heaviest appliances onto a balanced TP+N
                circuit. The consolidated schedule shows the per-phase split; Reg 314.1 is the
                regulation framework that drives the response.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Design ultimate — including foreseeable future loads</ContentEyebrow>

          <ConceptBlock
            title="Adding the future loads to the schedule"
            plainEnglish="Same schedule, second column. EV charger committed for retail year 2, residents' EVs as foreseeable additions."
          >
            <p>
              Future load reservations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Retail staff EV charger 7 kW single-phase year 2 — committed. After-diversity at
                100 percent for the EV (slow steady charge during evening): 30 A on its assigned
                phase.
              </li>
              <li>
                Residents' EV chargers, four in total, foreseeable within five years. Residential
                EV diversity per OSG / IET CoP for EV charging: roughly 1.0 + 0.4 x (n - 1) where n
                is number of chargers, capped — for four chargers (4 x 7 kW = 28 kW raw) the
                after-diversity figure is approximately 16 kW = 70 A across the supply.
              </li>
              <li>
                Heat pump retrofit if any of the gas-hob flats moves to all-electric — assume
                worst-case one heat pump per flat, 8 kW air-source, after-diversity 6 kW per active
                heat pump = 26 A.
              </li>
            </ul>
            <p>
              Design ultimate per phase (with current MD plus committed plus foreseeable future
              loads, balanced as well as practical): roughly 220-240 A per phase on the heaviest
              phase. The L3 designer presents this to the DNO as the design ultimate and asks
              whether the supply offer can be upgraded now to a 250 A or 300 A per-phase service,
              or whether a load-management connection (DNO-approved demand limiter) is more
              economic for the project.
            </p>
            <p>
              This is the conversation that has to happen at design stage. Six months after handover
              the trench is closed, the meters are wired, and an upgrade is a six-figure rework. At
              design stage it is a connection-enquiry conversation.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                Reg 132.16 is why the consolidated schedule has to capture the design ultimate (committed plus foreseeable future loads) and not just today's load. Every future EV, heat pump or change-of-use is an addition that must be assessed against the rating and condition of the existing supply, intake, sub-mains and earthing. A consolidated schedule that records what supply capacity was assumed and what headroom remains is the document the next designer relies on to discharge their Reg 132.16 duty without re-doing the entire calc.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.16 — full text from published amendment."
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Quoting the connected load to the DNO instead of the after-diversity MD"
            whatHappens={
              <>
                You add up every kW of equipment in the building — induction hobs, showers, EV
                chargers, heat pumps, lift, lighting — and quote the total to the DNO. The figure
                comes out enormous (300 A per phase for our small block), the DNO offers a
                substation upgrade at five figures, the customer panics, the project loses six
                months while the supply is engineered for a load that will never actually exist.
              </>
            }
            doInstead={
              <>
                Always quote after-diversity MD with the diversity assumptions visible. Show the
                connected load for traceability, but the figure for supply sizing is the
                consolidated after-diversity per-phase MD. Add the design-ultimate column for
                committed and foreseeable future loads. The DNO sizes the supply on engineering
                data, not on a worst-case flat-add.
              </>
            }
          />

          <CommonMistake
            title="Skipping the per-phase split and giving a single 'total amps' figure"
            whatHappens={
              <>
                The schedule shows 'consolidated MD: 350 A'. The DNO asks 'per phase?' and you have
                no answer. You guess 'about 120 A per phase' — but on a heavy single-phase load
                like our shower-plus-hob flats the actual heaviest phase is 192 A, not 120. The
                supply is sized for 120 A, the heaviest phase trips on a Saturday morning, the
                inspector asks why the schedule was not phase-balanced.
              </>
            }
            doInstead={
              <>
                Always show the per-phase split openly. Allocate single-phase loads to specific
                phases, balance where possible, accept imbalance where the loads do not balance,
                and report the heaviest phase as the supply-sizing figure. The DNO needs the
                per-phase figure; the inspector needs to see the allocation; the customer needs to
                see the supply is sized for the worst-case usage, not the average.
              </>
            }
          />

          <Scenario
            title="Mixed retail-plus-residential block — consolidated schedule lands the right supply"
            situation={
              <>
                Our anchor block. Brief delivered by the developer in March; design due to the DNO
                by mid-April for a June groundwork start. The developer assumed a 100 A three-phase
                service — that is what the previous block they built had. You produce the
                consolidated schedule in week one of design.
              </>
            }
            whatToDo={
              <>
                Build the consolidated schedule line by line as worked above. Surface the L1 / L2
                phase loading at 192 A and 196 A on the heaviest phases — well above the 100 A per
                phase standard offer. Present the design-ultimate column at 220-240 A per phase
                including committed retail EV plus foreseeable residents' EV plus possible heat
                pump retrofit. Lodge the DNO connection enquiry for a 250 A per-phase service with
                a load-management secondary option, and forward the schedule with the enquiry. The
                DNO offers a 250 A per-phase dedicated cable from the local substation; the
                installation cost lands in the developer's planning budget rather than as a
                surprise bolt-on.
              </>
            }
            whyItMatters={
              <>
                Consolidating diversity at design stage is the single highest-leverage L3 design
                activity on a mixed-use project. It surfaces the supply-sizing problem when there
                is still time to engineer it; it produces the documentation Reg 311.1 and Reg
                132.13 require; it lets the DNO engineer the connection properly; and it gives the
                customer a project budget that includes the right supply rather than a six-figure
                upgrade three years after handover. The schedule is not just a calc — it is the
                document that prevents the most common cause of post-occupation supply complaints.
              </>
            }
          />

          <ConceptBlock
            title="The schedule cover sheet — what it must show"
            plainEnglish="One A4 page that anyone can pick up and understand the supply-sizing logic at a glance. Below the cover sit the per-block detail sheets."
          >
            <p>
              Cover sheet content:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project, address, designer name, date, revision letter and revision note.</li>
              <li>Supply parameters — TN type (TN-S / TN-C-S (PME) / TT), declared Ze (ohms), declared PSCC (kA), nominal voltage, phases, intake fuse rating offered.</li>
              <li>Connected load total (informational, not for sizing).</li>
              <li>After-diversity MD per block, with diversity citation per row.</li>
              <li>Per-phase consolidation L1 / L2 / L3 with the heaviest phase highlighted.</li>
              <li>Headline MD = heaviest phase, declared in amps per phase.</li>
              <li>Design ultimate column for committed and foreseeable future loads.</li>
              <li>Recommended supply size and any load-management note.</li>
              <li>Floor area and occupancy classification (drives life-safety load and Building Control engagement).</li>
              <li>Designer signature and statement of compliance with Reg 311.1 / Reg 132.13.</li>
            </ul>
            <p>
              Per-block detail sheets sit behind the cover, each with the connected-load list, the
              diversity calc with citation, and the after-diversity total. The detail is what an
              inspector or future designer reads when they need to verify a row on the cover.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What if the supply offer is non-standard — TT, single-phase or rural"
            plainEnglish="The schedule logic is the same. The only thing that changes is the supply parameters on the cover and the protection method downstream."
          >
            <p>
              For a TT supply (rural off-PME, no DNO PEN connection), the cover declares TT and
              records the Ra figure for the installation earth electrode rather than a declared Ze.
              Every Zs calc downstream uses Ra plus R1+R2 with a higher impedance than TN, and RCD
              additional protection becomes the disconnection-time mechanism rather than ADS via
              the OPD. Reg 411.5 governs.
            </p>
            <p>
              For single-phase 100 A, the consolidation simplifies — no per-phase split, just one
              after-diversity column. Heavy single-phase mixed loads (showers, hobs, EV chargers)
              push the headline MD against the 100 A intake fuse and force the L3 designer to
              consider load-management or to upgrade to three-phase before the foreseeable future
              loads exceed the supply.
            </p>
            <p>
              For rural overhead supplies, the supply impedance is often higher than declared — Ze
              may be 0.8 ohms or higher rather than the urban 0.35 ohm typical. Add a margin to the
              Zs calc for older overhead networks. For long service-line single-phase supplies the
              voltage drop on the service line itself can dominate the per-load Vd budget; raise
              this with the DNO at the connection enquiry stage.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Phase imbalance and neutral current"
            plainEnglish="When the per-phase loading is unbalanced, the neutral conductor carries the difference. On a heavily imbalanced block the neutral current can approach a phase current."
            onSite="On a TN-C-S supply the neutral and the PEN have to handle the imbalance. On harmonic-rich loads (LED drivers, VSDs, electronic ballasts) the third-harmonic neutral current can exceed the phase current. Both conditions can derate or upsize the neutral."
          >
            <p>
              Three-phase balanced load: phase currents equal, vector sum at the neutral is
              approximately zero, neutral current near zero. Real installations are rarely fully
              balanced. The consolidated schedule's per-phase row gives the imbalance directly:
              divide the highest-phase current by the lowest-phase current and read the ratio.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Imbalance ratio under 1.10 — well balanced. Neutral current low. Standard CSA on the neutral.</li>
              <li>Imbalance ratio 1.10 to 1.30 — moderate. Neutral current significant; check N CSA matches phase or is rated for the imbalance.</li>
              <li>Imbalance ratio above 1.30 — heavy. Neutral approaches phase current; consider rebalancing the load allocation, or a fourth-wire neutral upsize.</li>
              <li>Harmonic-rich loads (LED-heavy lighting, multiple VSDs, switchmode supplies) — third-harmonic returns on the neutral and can add. Reg 524.1 and Appendix 4 cover the upsize.</li>
            </ul>
            <p>
              On our worked example the imbalance ratio is 196 / 53 = 3.7 — extremely heavy.
              That is the trigger to either rebalance (move common services and a flat to L3, swap
              meter assignments) or to consider load management before the DNO connection enquiry
              is finalised. The consolidated schedule reads imbalance plainly; the L3 designer
              acts on it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Consolidating diversity is not 'add the totals'. Each block — retail, residential, common services, life safety, EV, heat pump — uses its own diversity logic and citation; the consolidated schedule preserves all of them.",
              "TN type is the most consequential parameter on the schedule cover sheet. It governs main earthing conductor size, main bonding size, EV protection method and every Zs calc downstream.",
              "Per-phase consolidation matters more than the headline total. Allocate single-phase loads to specific phases, balance where possible, and report the heaviest phase as the supply-sizing figure.",
              "Always show 'design current today' alongside 'design ultimate'. The DNO sizes the supply for the ultimate; the meter draws the current. Avoiding a rip-out two years later is the L3 designer's job.",
              "Reg 311.1 is satisfied by visible, traceable assessment — connected load, diversity citations per block, after-diversity per block, per-phase split, headline MD declared. A spreadsheet in your inbox does not satisfy 311.1; what is on the design pack does.",
              "Phase imbalance ratio above ~1.30 is a design trigger. Rebalance the allocation, upsize the neutral, or consider load management before submitting the DNO connection enquiry.",
              "Reg 132.5 (Compatibility) is the regulation under which imbalance, harmonic loading and supply-quality impacts get assessed. Reg 132.13 is the regulation that makes the consolidated schedule a permanent design product.",
              "On HRRBs the consolidated schedule becomes part of the Building Safety Act 'golden thread' — versioned, retained for the building's life, and traceable to a named competent designer.",
            ]}
          />

          <Quiz title="Load schedule consolidation — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.5 Industrial load assessment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.1 Design current Ib calculation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
