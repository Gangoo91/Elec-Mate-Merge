import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  Pullquote,
} from '@/components/study-centre/learning';
import { SelfConsumptionKnee } from '@/components/study-centre/diagrams/renewableM5';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm5s6-sizing-factors',
    question:
      'Reg 570.5.1 lists ten battery selection factors (a)–(j). Which four are the SIZING-relevant ones (capacity, time, cycling)?',
    options: [
      '(a), (b), (e), (i) — demand, voltage, coupling mode and fixed-install suitability',
      '(a), (c), (g), (h) — demand, charge/discharge time, charge/discharge profiles and cyclic operation',
      '(b), (d), (f), (j) — voltage, generation profiles, utilisation range and external influences',
      '(c), (e), (g), (i) — charge/discharge time, coupling mode, profiles and fixed-install suitability',
    ],
    correctIndex: 1,
    explanation:
      'Sizing lives in factors (a), (c), (g), (h) — they answer "how much energy, over how long, at what rate, and how many times". (a) nature of demand sets the daily kWh target. (c) charge/discharge time sets the duration constraints. (g) charge/discharge profiles cover C-rate, depth of discharge and rate-related ageing. (h) load profiles + cyclic operation capability translate the household pattern into cycle-life consumption. The other factors (voltage, coupling mode, fixed-install suitability, external influences) bear on selection but not directly on capacity sizing.',
  },
  {
    id: 'm5s6-usable-vs-nameplate',
    question:
      'A customer picks a 10 kWh nameplate LFP pack with 80% recommended depth of discharge. How much energy can the pack USABLY deliver to the loads per full discharge?',
    options: [
      '10 kWh — nameplate equals usable, with no derating applied',
      '8 kWh from the pack, then ~7.6 kWh delivered after the ~95% discharge round-trip',
      '5 kWh — half the nameplate held back as a safety reserve',
      '12 kWh — nameplate plus a 20% usable headroom margin',
    ],
    correctIndex: 1,
    explanation:
      'Usable kWh = nameplate × DoD. 10 kWh × 0.8 = 8 kWh available from the pack. Then the inverter/PCE round-trip efficiency on the discharge leg (typically ~95% on LFP DC-coupled hybrid; ~85–90% on AC-coupled cross-charge) takes another bite — so ~7.6 kWh actually arrives at the loads per full cycle. Sizing to nameplate is the classic mistake; sizing to "delivered to loads" is what the customer actually experiences.',
  },
  {
    id: 'm5s6-c-rate',
    question:
      'A 9.5 kWh LFP pack is paired with a 5 kW hybrid inverter. The cells are rated for 0.5C continuous discharge. What is the steady-state limiting factor on discharge power?',
    options: [
      'The cells at 0.5C × 9.5 kWh = 4.75 kW continuous, throttling the higher-rated inverter',
      'The DNO 100 A main fuse, which caps continuous discharge below the cell rating',
      'The main earthing terminal, whose conductor sizing limits the discharge current',
      'The Type 2 SPD on the AC side, which clamps the inverter output current',
    ],
    correctIndex: 0,
    explanation:
      'C-rate × capacity = power. At 0.5C × 9.5 kWh, the pack delivers 4.75 kW continuously — the inverter is rated higher but the cells cap the throughput. Charge time from empty to full at 0.5C ≈ 2 hours. C-rate is fundamental to sizing: a pack and an inverter that look matched on paper can be limited by either side, and the lesser of the two wins. Reg 570.5.1(c) charge/discharge time and (g) profiles both pin this. Cert evidence bundle records the manufacturer C-rate.',
  },
  {
    id: 'm5s6-knee-point',
    question:
      'On a UK domestic site with 5 kWp PV and 14 kWh daily load, the customer is choosing between a 9.5 kWh, a 13.5 kWh and a 19 kWh BESS. Modelling against half-hourly smart-meter data shows self-consumption rising from 30% (PV-only) to 73% (9.5 kWh), 79% (13.5 kWh), then 81% (19 kWh). What is the knee point?',
    options: [
      'The 19 kWh option, because a bigger pack always improves self-consumption further',
      'There is no knee point here — self-consumption keeps rising linearly with capacity',
      'Around 9.5 kWh — beyond it each extra kWh buys only a fraction of a point of uplift',
      'The 13.5 kWh option, simply because it sits in the middle of the three sizes',
    ],
    correctIndex: 2,
    explanation:
      'The knee point is the size beyond which additional capacity stops materially improving self-consumption. From PV-only (30%) to 9.5 kWh (73%) is a 43-point uplift — huge. From 9.5 kWh to 13.5 kWh is a 6-point uplift — small. From 13.5 kWh to 19 kWh is a 2-point uplift — wasted. Sizing past the knee is the most common sizing mistake on UK domestic. Modelling against the customer’s ACTUAL half-hourly smart-meter data is the only way to find the knee on THIS site; rules of thumb miss it. Reg 570.5.1(h) load profiles + cyclic operation is the regulatory hook for doing this properly.',
  },
];

const quizQuestions = [
  {
    question:
      'A UK domestic customer has 5 kWp south-facing PV (midlands), a 14 kWh average daily load, no EV, no heat pump, no time-of-use tariff. They want maximum PV self-consumption. Which BESS size is in the right ballpark per the typical UK domestic ratio?',
    options: [
      '4.5 kWh — sized conservatively to the daily PV-to-battery surplus flow',
      '9.5–10 kWh — about 2 kWh BESS per kWp PV, capturing the bulk of daily surplus',
      '20 kWh — sized large and run at low DoD for extra cycle-life headroom',
      '50 kWh — sized to match the household’s total annual consumption',
    ],
    correctAnswer: 1,
    explanation:
      'The UK 2025–2026 rule of thumb for pure PV self-consumption is roughly 1 kWp PV : 2 kWh BESS, so ~10 kWh for 5 kWp. This is a starting point, not a prescription — final sizing should be tested against half-hourly smart-meter data to find the actual knee point on the customer’s load profile. With no time-of-use tariff and no EV / heat pump driving extra cycling, anything past ~10 kWh hits the knee fast.',
  },
  {
    question:
      'A 13.5 kWh LFP pack at 80% DoD with a round-trip efficiency of 92% (AC-coupled cross-charge) is charged from PV surplus and discharged to loads. How much delivered-to-load energy does it return per full cycle?',
    options: [
      '13.5 kWh',
      '10.8 kWh',
      '13.5 × 0.8 × 0.92 = 9.94 kWh ≈ 9.9 kWh',
      '5 kWh',
    ],
    correctAnswer: 2,
    explanation:
      'Delivered = nameplate × DoD × round-trip. 13.5 × 0.8 × 0.92 = 9.94 kWh. Sizing to the nameplate would over-promise the customer by ~3.6 kWh per cycle. Over a year of daily cycling, that is ~1,300 kWh of "promised but absent" energy. The cert evidence bundle should record both the nameplate AND the usable / delivered figure that the customer can rely on.',
  },
  {
    question:
      'A customer is choosing between DC-coupled (95% round-trip) and AC-coupled (88% round-trip) for a PV-paired 10 kWh LFP install. They use 40% of PV via the battery. Annual PV = 4,200 kWh. What is the approximate energy DIFFERENCE between the two topologies per year?',
    options: [
      'No difference — round-trip efficiency is the same for both topologies',
      'Around 12 kWh — negligible either way',
      'Around 120 kWh — i.e. 4,200 × 0.40 × (0.95 − 0.88), worth roughly £25–£30/yr',
      'Around 4,000 kWh — most of the annual generation',
    ],
    correctAnswer: 2,
    explanation:
      '4,200 kWh annual PV × 40% goes via the battery = 1,680 kWh. Efficiency delta = 95% − 88% = 7 percentage points. 1,680 × 0.07 ≈ 118 kWh — call it ~120 kWh, worth roughly £25–£30/yr. The point: efficiency differences between DC and AC coupling are real but small in absolute terms — usually dwarfed by the install cost difference. Section 5.5 covers the topology choice; the efficiency arithmetic informs but rarely decides it.',
  },
  {
    question:
      'Reg 570.5.1(g) requires sizing to take account of "battery charge and discharge profiles", specifically including C-rates and depth of discharge. Why does C-rate matter for sizing, not just performance?',
    options: [
      'It does not — C-rate only affects in-service performance, never the sizing decision',
      'Because C-rate is a mandatory DNO connection requirement under EREC G98 / G99',
      'Because the C-rate figure must be declared on the SEG export tariff application',
      'Because C-rate × capacity sets the maximum continuous power, so kWh alone can underdeliver peak load',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 570.5.1(g) explicitly bundles C-rate with depth of discharge and rate-related ageing into the sizing decision. A 9.5 kWh pack with 0.3C continuous limit gives 2.85 kW maximum continuous discharge — fine for evening loads, marginal for an EV charger or electric shower. A 9.5 kWh pack with 0.5C gives 4.75 kW — covers more peak loads. Sizing kWh in isolation, without checking C-rate, is a recipe for a customer disappointed at the first big load event. Cert evidence bundle records the manufacturer C-rate alongside the nameplate kWh.',
  },
  {
    question:
      'A customer on Octopus Intelligent Go (7p/kWh import 23:30–05:30, ~27p peak rest of day) wants a BESS for tariff arbitrage — NO PV planned. They want to charge cheap, discharge expensive. Daily peak-hour consumption ~10 kWh. What is the sensible sizing approach?',
    options: [
      'Work back from peak-hour energy: 10 kWh ÷ 0.95 round-trip ÷ 0.8 DoD ≈ 13.2 kWh, then check the cheap-window recharge',
      'Size against modelled PV generation, even though no PV is planned for this site',
      'Size to total daily consumption × 7, buying a full week of stored energy',
      'Size to a fixed 5 kWh regardless of the load, since a smaller pack is always safer',
    ],
    correctAnswer: 0,
    explanation:
      'Tariff-led sizing without PV targets the peak-hour energy that you want to displace. Work backwards: 10 kWh delivered ÷ 0.95 round-trip = 10.5 kWh from the pack ÷ 0.8 DoD = 13.2 kWh nameplate. Then check the cheap-window recharge constraint: 13.2 kWh × 0.8 = 10.5 kWh to put in during 6 hours = 1.75 kW average inverter throughput — easily within a 5 kW inverter’s range, comfortably within typical LFP charge C-rate. Cert evidence bundle records the tariff and the sizing rationale per Reg 570.5.1(a)(c)(g)(h).',
  },
  {
    question:
      'On a half-hourly smart-meter modelling exercise for a 5 kWp PV + variable BESS sizing, the customer’s self-consumption rises: 30% (PV-only) → 73% (9.5 kWh BESS) → 79% (13.5 kWh) → 81% (19 kWh). Where should the installer recommend the customer stop?',
    options: [
      '19 kWh, on the basis that a bigger pack is always the better recommendation',
      '13.5 kWh, on the basis that the middle option is always the right answer',
      '9.5 kWh — past the knee, each extra kWh buys little and the marginal cost outweighs it',
      '4.5 kWh — half the smallest modelled option, to keep the cost down',
    ],
    correctAnswer: 2,
    explanation:
      'The knee on the curve is between 9.5 kWh and 13.5 kWh. Going from 9.5 to 13.5 buys 6 self-consumption points (worth perhaps ~£60–£80/yr on this load profile) for ~£2,500 in extra kit — a ~30-year payback that exceeds the warranty period. Going further still (to 19 kWh) buys 2 more points for another ~£2,000 — flatly uneconomic. Reg 570.5.1(h) load profiles + cyclic operation capability is the regulatory hook. The right recommendation is the smaller pack with the rationale captured in the cert evidence bundle. Customer can revisit if circumstances change (EV arrives, heat pump arrives, tariff arrives).',
  },
];

const faqs = [
  {
    question: 'Is "1 kWp PV : 2 kWh BESS" a hard rule or a starting point?',
    answer:
      'Starting point only. The 1:2 ratio works for typical UK domestic with no EV, no heat pump, no time-of-use tariff — the most common 2025-26 case for moderate budgets. It shifts upward (more BESS per kWp PV) when the customer has high evening loads, time-of-use arbitrage, or backup priorities. It shifts downward when the customer has a small steady daytime baseload that already eats most PV. Either way, validate against half-hourly smart-meter data before committing to a size — Reg 570.5.1(h) cyclic operation is the regulatory framing.',
  },
  {
    question: 'How do half-hourly smart-meter readings get into the sizing model?',
    answer:
      'Customer authorises export of their half-hourly data from the smart-meter supplier (most UK suppliers expose this through their app or a one-off CSV request). The 17,520 half-hour readings per year describe the actual load shape. Pair with PVGIS modelled PV output for the proposed roof, simulate battery operation against a range of BESS sizes, and read off the self-consumption curve. The knee point on that curve is the right sizing. Without real load data, sizing is a guess dressed up in numbers.',
  },
  {
    question: 'How do C-rate, DoD and cycle life interact?',
    answer:
      'Cycle life rises sharply as you reduce DoD: an LFP cell rated 6,000 cycles at 80% DoD might give 10,000+ cycles at 50% DoD. Higher C-rate (faster charge / discharge) reduces cycle life at any given DoD because the cells run hotter. The 80% DoD + 0.5C continuous default is the LFP sweet spot for UK domestic — manufacturer warranty is usually written around it. Customer who wants peak power above the C-rate limit should buy a bigger pack with the SAME C-rate ceiling — gives higher continuous kW (more cells in parallel) at the same per-cell stress.',
  },
  {
    question: 'How do Octopus tariffs (Flux, Cosy, Agile, Intelligent Go) change the sizing answer?',
    answer:
      'Each tariff has a different cheap-window shape and a different peak-window penalty. Octopus Flux pays ~33p/kWh export 16:00–19:00 and charges ~12p import 02:00–05:00 — three-hour windows, both ways. Cosy has cheap morning + afternoon plus expensive evening. Agile prices change every 30 minutes against wholesale. Intelligent Go gives a wide 23:30–05:30 cheap window. The BESS sizing follows: Flux wants enough capacity to fully discharge in the 3-hour peak; Cosy can use a smaller pack but two-cycle a day; Agile wants enough capacity AND inverter headroom to chase volatile prices. Customer’s tariff feeds Reg 570.5.1(h) load profile and (g) charge/discharge profile inputs.',
  },
  {
    question: 'What if the customer’s situation will change — EV next year, heat pump in two years?',
    answer:
      'Future-proofing the sizing has two routes. Route A: size for today, leave room for modular expansion later (many UK 2025–26 LFP brands — GivEnergy, Pylontech, BYD — explicitly support adding modules later in matching age/batch). Route B: oversize today, accept the knee-point penalty for the first year or two until the new loads land. Route A is usually right — cheaper now, no commitment, and the customer makes a fresh decision when the EV / heat pump actually shows up. The cert evidence bundle records the today-sizing rationale and the future-expansion route the install supports.',
  },
];

export default function RenewableEnergyModule5Section6() {
  const navigate = useNavigate();

  useSEO({
    title: 'Sizing & energy modelling | Renewable Energy 5.6 | Elec-Mate',
    description:
      'How to size a BESS for a UK domestic site — Reg 570.5.1 factors (a)(c)(g)(h), usable kWh = nameplate × DoD × round-trip, C-rate, half-hourly smart-meter modelling, knee-point analysis, tariff arbitrage on Octopus Flux / Cosy / Agile / Intelligent Go.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · BS 7671:2018+A4:2026 · Reg 570.5.1(a)(c)(g)(h)"
            title="Sizing & energy modelling"
            description="How to turn a customer’s daily load and tariff shape into a defensible BESS capacity. Nameplate vs usable kWh, C-rate, round-trip efficiency, the knee point on the self-consumption curve, and how Octopus Flux / Cosy / Agile / Intelligent Go change the answer."
            tone="yellow"
          />

          <TLDR
            points={[
              'Sizing answers four of the ten Reg 570.5.1 selection factors: (a) nature of demand, (c) charge and discharge TIME, (g) charge and discharge PROFILES (C-rate, DoD, rate-related ageing), and (h) load profiles and cyclic operation capability.',
              'Usable kWh ≠ nameplate kWh. Usable = nameplate × DoD × round-trip efficiency. A 10 kWh LFP at 80% DoD on a 95% round-trip hybrid delivers ~7.6 kWh per cycle to the loads.',
              'C-rate × capacity = continuous power. A 9.5 kWh pack at 0.5C delivers 4.75 kW continuous — sizing kWh in isolation, without checking C-rate, leaves peak loads underserved.',
              'Round-trip efficiency: ~92–97% (single-conversion DC-coupled hybrid on PV→battery) vs ~85–90% (AC-coupled cross-charge through two inverters). Real but small in absolute kWh / £ terms.',
              'UK 2025–2026 starting ratio: 1 kWp PV : 2 kWh BESS for pure PV self-consumption with no time-of-use tariff. Shifts up with EV / heat pump / tariff arbitrage; shifts down with high daytime baseload.',
              'Half-hourly smart-meter data is the input that makes sizing defensible. 17,520 readings per year describe the load shape; pair with PVGIS PV output; simulate at multiple BESS sizes; read off the self-consumption curve.',
              'The knee point — the size beyond which additional kWh stops materially improving self-consumption — is the right answer. Sizing past the knee is the most common UK domestic mistake.',
              'Octopus tariffs (Flux, Cosy, Agile, Intelligent Go) each shape the sizing answer differently. Tariff-led sizing (no PV) is a legitimate parallel approach with its own arithmetic.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 570.5.1(a)(c)(g)(h) to derive a defensible BESS capacity from the customer’s daily load, charge / discharge time targets, and cycling pattern.',
              'Convert nameplate kWh to usable kWh using DoD and round-trip efficiency; quote both figures to the customer.',
              'Calculate C-rate from manufacturer spec; back-calc continuous power and charge / discharge time; spot when the pack’s C-rate (not the inverter) is the limit.',
              'Read a UK half-hourly smart-meter export, pair against PVGIS-modelled PV output, and simulate self-consumption uplift across a range of BESS sizes.',
              'Identify the knee point on the self-consumption curve and recommend sizing AT the knee, not past it.',
              'Apply the right sizing approach for the customer’s tariff: PV self-consumption (1:2 ratio default), tariff arbitrage (peak-hour kWh × round-trip ÷ DoD), backup-only (essentials load × autonomy hours).',
              'Record the sizing rationale in the cert evidence bundle — nameplate kWh, usable kWh, DoD, C-rate, round-trip, tariff, future-expansion plan.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Nameplate sells. Usable serves. Sizing is the conversion between the two — and the customer pays attention.
          </Pullquote>

          <ContentEyebrow>Sizing in the Reg 570.5.1 frame</ContentEyebrow>

          <ConceptBlock
            title="Sizing answers four of the ten Reg 570.5.1 selection factors"
            plainEnglish="Reg 570.5.1 lists ten factors (a)–(j) that the battery selection has to address. Four of them are directly about sizing: (a) nature of demand, (c) charge and discharge time, (g) charge and discharge profiles (C-rate, DoD, rate-related ageing), and (h) load profiles and cyclic operation capability. The other six are about chemistry, voltage, coupling mode, fixed-install suitability and external influences."
            onSite="Before opening a sizing spreadsheet, write down the customer’s answer to each of (a), (c), (g), (h) in plain English. Then the sizing arithmetic is a translation of those answers into kWh, kW and cycles. Cert evidence bundle records the answers AND the translation."
          >
            <p>What each sizing factor asks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">(a) Nature of demand</strong> — daily energy
                consumption in kWh, broken into baseload, daytime peaks and evening peaks.
                For UK domestic: half-hourly smart-meter data is the gold standard input
              </li>
              <li>
                <strong className="text-white">(c) Charge time and discharge time</strong> —
                how fast can the pack accept energy (PV surplus window, tariff cheap window)
                and how long must it deliver (peak evening hours, outage autonomy if EPS).
                Both feed kWh capacity AND C-rate
              </li>
              <li>
                <strong className="text-white">(g) Charge and discharge profiles</strong> —
                C-rate (cell-level continuous limit), depth of discharge (LFP 80% typical),
                and rate-related ageing. These set the actual kW deliverable, not just the
                kWh storable
              </li>
              <li>
                <strong className="text-white">(h) Load profiles and cyclic operation
                  capability</strong> — daily cycling pattern (one cycle, two cycles,
                seasonal), and the manufacturer’s rated cycle life at the DoD you
                intend to run. Translates directly to expected useful life
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.5.1 — Battery selection factors (sizing-relevant)"
            clause={`Selection of battery type and capacity shall take account of the following factors:
(a) nature of demand;
(c) charge time and discharge time;
(g) battery charge and discharge profiles;
(h) load profiles and cyclic operation capability;
[and the remaining factors (b)(d)(e)(f)(i)(j) covered elsewhere].`}
            meaning="Reg 570.5.1(a)(c)(g)(h) are the explicit sizing-relevant factors. (a) sets the daily kWh target. (c) sets the duration constraints — how long to charge, how long to discharge. (g) covers C-rate, DoD and rate-related ageing — the per-cycle behaviour. (h) covers load profiles and cyclic operation capability — how MANY cycles, of what shape, the pack will see. Skip any of the four and the sizing decision is unaccountable. Cert evidence bundle should walk through (a), (c), (g), (h) explicitly with the customer’s actual figures."
          />

          <ConceptBlock
            title="What counts as a kWh — the capacity definition"
            plainEnglish="BS 7671 defines capacity as &lsquo;the quantity of electric charge a fully charged cell or battery can deliver&rsquo;. Manufacturer datasheets quote three flavours: nameplate (chemistry-level), gross (including reserved BMS headroom) and usable (what the BMS will actually let out before cutting off). Sizing the customer’s experience means working from USABLE."
            onSite="The customer reads nameplate on the cabinet sticker but lives with usable. Make the gap visible in the quote: nameplate, usable, delivered-to-loads. The cert evidence bundle should show all three so there is no surprise at the first EICR or app check."
          >
            <p>The three flavours of kWh, in plain numbers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Nameplate kWh</strong> — chemistry-level
                calculation (e.g. 280 Ah LFP cells × 51.2 V nominal × 16 cells = ~9,830 Wh
                rounded to 9.5 kWh). What’s on the cabinet sticker
              </li>
              <li>
                <strong className="text-white">Usable kWh</strong> — nameplate × DoD limit
                set by the BMS. LFP at 80% DoD: 9.5 × 0.8 = 7.6 kWh from the pack
              </li>
              <li>
                <strong className="text-white">Delivered-to-loads kWh</strong> — usable ×
                round-trip efficiency on the discharge leg. ~95% on DC-coupled hybrid: 7.6
                × 0.95 = ~7.2 kWh actually arriving at the loads per full cycle
              </li>
              <li>
                <strong className="text-white">Customer-facing language</strong> — quote
                BOTH "nameplate" and "delivered" in the install proposal. Hiding the gap is
                the fast route to a disappointed customer when their app shows the real
                throughput
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The five sizing inputs</ContentEyebrow>

          <Pullquote>
            Five inputs in, one kWh number out. Get any one wrong and the rest is theatre.
          </Pullquote>

          <ConceptBlock
            title="Input 1 — daily load profile from half-hourly smart-meter data"
            plainEnglish="The customer’s daily energy use is the foundation of sizing. UK 2025–2026 has smart meters in ~60% of homes; the half-hourly data is the gold input. 17,520 half-hour readings per year describe the load shape, including peaks, troughs, and seasonal swings — far richer than a single annual kWh figure."
            onSite="Ask the customer to export their half-hourly readings from their supplier’s app or web portal. Octopus, EDF, OVO and British Gas all expose this. Where smart-meter data is unavailable, fall back to a SAP-style estimate based on house type + occupancy + heating system — coarser, but defensible."
          >
            <p>What the half-hourly data tells the sizing model:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Daily kWh — by season</strong> — UK domestic
                typical 8–15 kWh winter weekday, 6–10 kWh summer weekday; high-cycling
                households with EV / heat pump can hit 25–50 kWh winter
              </li>
              <li>
                <strong className="text-white">Peak shape</strong> — UK domestic evening
                peak typically 17:00–22:00, drawing 60–75% of daily consumption. The peak
                shape is what the BESS is mostly there to displace
              </li>
              <li>
                <strong className="text-white">Daytime baseload</strong> — fridge, freezer,
                router, standby loads. Typically 200–500 W continuous. This sets the
                minimum PV output that goes direct to loads (not via the battery)
              </li>
              <li>
                <strong className="text-white">Weekend vs weekday</strong> — patterns differ
                significantly; a weekday-only sizing model will under-estimate weekend
                self-consumption
              </li>
              <li>
                <strong className="text-white">Seasonal swing</strong> — UK domestic
                winter / summer ratio typically 2:1 for non-electric-heat homes, 4:1 or
                higher for heat-pump homes
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Input 2 — usable kWh = nameplate × DoD × derating"
            plainEnglish="Nameplate is the marketing number. Usable is what reaches the loads after the BMS cut-off (DoD) and the round-trip losses. LFP at 80% DoD is the UK 2025-26 default; lead-acid at 50% DoD survives in legacy off-grid; NMC at 80% appears in EVs and rare residential."
            onSite="Quote BOTH figures to the customer. The cabinet sticker says 13.5 kWh; the quote should say &lsquo;13.5 kWh nameplate, ~10.5 kWh delivered to loads per cycle&rsquo;. Cert evidence bundle records the DoD and the round-trip used."
          >
            <p>Typical UK 2025-26 derating factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">LFP at 80% DoD</strong> — manufacturer warranty
                typically written around this. Pack delivers 80% of nameplate before BMS
                cut-off. Cycle life ~6,000-10,000 cycles at this DoD
              </li>
              <li>
                <strong className="text-white">LFP at 50% DoD</strong> — much longer cycle
                life (~15,000-20,000 cycles) but you only get half the energy out per
                cycle. Rare except in heavy-cycling commercial cases
              </li>
              <li>
                <strong className="text-white">Lead-acid at 50% DoD</strong> — chemistry
                limit, not optional. 30 kWh nameplate Pb-acid bank = 15 kWh usable. Cycle
                life 500-1,500 at 50% DoD
              </li>
              <li>
                <strong className="text-white">Round-trip efficiency, DC-coupled hybrid
                  one-way</strong> — ~95-97% on discharge. PV→battery is single-conversion
              </li>
              <li>
                <strong className="text-white">Round-trip efficiency, AC-coupled
                  cross-charge</strong> — ~85-90% on PV→battery (two inverters in series).
                Section 5.5 covers the topology drivers
              </li>
              <li>
                <strong className="text-white">Temperature derating</strong> — LFP loses
                ~10-15% capacity at 0°C vs 25°C. Reg 570.5.1(j) external influences. UK
                garage installs in winter: factor this in
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Input 3 — C-rate sets charge and discharge time"
            plainEnglish="C-rate is a normalised current — 1C means &lsquo;charge / discharge the full capacity in one hour&rsquo;. 0.5C means &lsquo;in two hours&rsquo;. 0.2C means &lsquo;in five hours&rsquo;. C-rate × nameplate kWh = continuous kW. The cell-level limit usually pins the pack; the inverter sets the upper bound; the lesser of the two wins."
            onSite="Read the manufacturer datasheet for BOTH continuous C-rate (sustained) and peak C-rate (short bursts, typically 1-3 seconds, for motor starts and shower elements). A 9.5 kWh pack at 0.5C continuous + 1C peak = 4.75 kW continuous + 9.5 kW peak. The cert evidence bundle records both."
          >
            <p>Why C-rate matters for sizing, not just performance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">A pack with too-low continuous C-rate</strong>
                cannot deliver the customer’s peak evening load even with kWh to spare —
                the BMS throttles output. Customer sees the app showing battery at 60% but
                grid still importing
              </li>
              <li>
                <strong className="text-white">Charge time = nameplate × DoD ÷ (C-rate ×
                  nameplate)</strong> = DoD ÷ C-rate. 0.8 DoD at 0.5C = 1.6 hours empty-to-full
                from a PCE that can supply that much. Faster C-rate halves the charge time
                but stresses the cells
              </li>
              <li>
                <strong className="text-white">Tariff-window sizing</strong> — if the cheap
                window is 6 hours (Octopus Intelligent Go) and the pack needs 80% × usable
                kWh in that window, the C-rate × inverter combination has to deliver. Pack
                at 0.2C in a 6-hour window: 0.2 × 6 = 1.2 → caps at 100% of nameplate
              </li>
              <li>
                <strong className="text-white">High peak C-rate is the EV / shower
                  enabler</strong> — a customer running an EV charger at 7 kW during EPS
                island mode needs a pack and inverter combination that can sustain 7 kW
                continuous. Many domestic hybrids cap at 5 kW continuous; sized-up packs
                buy more parallel cells but same C-rate ceiling
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Input 4 — round-trip efficiency"
            plainEnglish="Every cycle pays an efficiency tax. DC-coupled hybrid (single conversion) loses ~3-5% per round trip. AC-coupled cross-charge (two inverters, four conversions in series) loses ~10-15%. The tax compounds: kWh PV in → kWh delivered out is the product of every conversion in the chain."
            onSite="Round-trip efficiency is a small absolute number on most UK domestic installs (~£25-£50/yr difference between DC and AC coupled for typical 5 kWp + 10 kWh) but customers ask about it. Have the answer to hand. Section 5.5 has the topology-level reasoning; here it shapes the kWh delivered-to-loads figure for the quote."
          >
            <p>Typical UK 2025-26 round-trip numbers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">DC-coupled hybrid, PV→battery→load</strong>
                — ~92-95% combined (battery accepts DC directly; only one DC→AC
                conversion on discharge)
              </li>
              <li>
                <strong className="text-white">AC-coupled, PV→battery→load</strong> — ~85-90%
                combined (PV→AC conversion, then AC→DC into battery, then DC→AC on discharge)
              </li>
              <li>
                <strong className="text-white">Battery→load on either topology</strong> —
                ~95% on the discharge leg alone (the DC→AC conversion is the same for
                both topologies on the way out)
              </li>
              <li>
                <strong className="text-white">Grid→battery→load (tariff arbitrage with
                  no PV)</strong> — ~88-92%, similar to AC-coupled cross-charge, because
                you’re going AC→DC→AC
              </li>
              <li>
                <strong className="text-white">Standby losses</strong> — separate from
                round-trip; modern hybrid inverters draw ~20-40 W continuous, costing
                ~£50-£100/yr at UK electricity prices. Material on a backup-only install,
                noise on a cycling install
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Input 5 — PV generation profile and tariff structure"
            plainEnglish="The fifth input is what FILLS the battery. PV generation (modelled via PVGIS for the actual roof orientation, tilt and shading) gives a half-hourly generation curve. Tariff structure adds (or replaces) the grid-import option. Together they determine what the battery sees on the charge side."
            onSite="For PV-paired sites, run PVGIS for the actual lat/long, tilt, azimuth, shading. For tariff-arbitrage sites, plot the import-price curve against the customer’s daily load curve to find when the BESS should charge and when it should discharge. Section 5.5 topology choice and this section’s sizing combine to define the ENERGY FLOW pattern that the system will actually run."
          >
            <p>What the generation + tariff inputs contribute to sizing:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV midlands south-facing, 5 kWp, 35° tilt</strong>
                — annual ~4,500 kWh, daily avg 12.3 kWh, peak day ~30 kWh in June, low
                day ~3 kWh in December
              </li>
              <li>
                <strong className="text-white">PV London east + west split, 5 kWp</strong>
                — annual ~4,100 kWh, flatter daily curve, smaller summer peak — smaller
                BESS captures the surplus more efficiently
              </li>
              <li>
                <strong className="text-white">Octopus Flux export 16:00-19:00</strong> —
                BESS sized for 3-hour discharge window covering the peak; nameplate ≈
                peak-hour load × 3 ÷ DoD ÷ round-trip
              </li>
              <li>
                <strong className="text-white">Octopus Intelligent Go import 23:30-05:30</strong>
                — 6-hour cheap window; BESS sized to be empty at start of window and
                full by end; charge C-rate × 6 hours × inverter limit ≥ nameplate × DoD
              </li>
              <li>
                <strong className="text-white">SEG export rate</strong> — typically 5-15p
                /kWh in 2025-26. Pushes the model toward self-consumption rather than
                export; bigger BESS captures more surplus before it leaves the meter
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Worked example — UK family of four, 5 kWp PV, no EV, no heat pump</ContentEyebrow>

          <ConceptBlock
            title="Worked sizing — turning the five inputs into a kWh number"
            plainEnglish="A worked example following Reg 570.5.1(a)(c)(g)(h). Customer is a family of four in a midlands semi-detached, 2024 new-build, 5 kWp south-facing PV planned, gas heating, ~14 kWh daily average load from one year of half-hourly smart-meter data. Octopus Flux tariff. Hybrid topology already chosen (Section 5.5)."
            onSite="The arithmetic is one A4 sheet. Print it for the customer and walk through line by line. The conversation lands differently when they see the conversion from &lsquo;nameplate&rsquo; to &lsquo;delivered’ explicitly."
          >
            <p>Step-by-step:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">(a) Daily demand</strong> — 14 kWh average,
                with 60% (8.4 kWh) in the 17:00-22:00 evening peak. Half-hourly data shows
                weekday peak slightly higher than weekend
              </li>
              <li>
                <strong className="text-white">(a) PV generation</strong> — 5 kWp midlands
                south-facing ≈ 4,500 kWh/yr, avg 12.3 kWh/day. Summer peak day ~28 kWh,
                winter low day ~2 kWh
              </li>
              <li>
                <strong className="text-white">(c) Discharge time target</strong> — cover
                the 17:00-22:00 peak from the battery on most days. 5-hour discharge
                window
              </li>
              <li>
                <strong className="text-white">(c) Charge time target</strong> — fill from
                PV surplus (June-September) OR from Octopus Flux cheap window 02:00-05:00
                (rest of year). Three-hour minimum charge window in worst case
              </li>
              <li>
                <strong className="text-white">(h) Cycling pattern</strong> — daily cycling
                year-round (1 cycle/day). Cycle life target ~16 years × 365 = 5,840
                cycles → LFP at 80% DoD (6,000-10,000 rated) is comfortable
              </li>
              <li>
                <strong className="text-white">Capacity arithmetic</strong> — usable kWh
                target ≈ evening peak that battery will cover = 8.4 kWh delivered to loads.
                Working back: 8.4 ÷ 0.95 round-trip ÷ 0.8 DoD = 11.05 kWh nameplate. Nearest
                pack: GivEnergy 9.5 kWh OR 13.5 kWh. The 9.5 kWh hits the knee for THIS
                load profile; the 13.5 kWh oversizes by ~2 percentage points of
                self-consumption uplift
              </li>
              <li>
                <strong className="text-white">(g) C-rate check</strong> — GivEnergy
                LFP 0.5C continuous × 9.5 kWh = 4.75 kW continuous, 1C peak = 9.5 kW
                peak. Covers the customer’s peak loads (kitchen + lounge typically
                under 4 kW continuous; momentary shower spike accepted on peak C-rate)
              </li>
              <li>
                <strong className="text-white">(c) Charge window check</strong> — Flux
                cheap window 02:00-05:00 is 3 hours; 9.5 × 0.8 = 7.6 kWh to put in / 3
                hours = 2.53 kW average inverter throughput, well within the 5 kW hybrid’s
                capability and within LFP 0.5C charge limit (4.75 kW). Pass
              </li>
              <li>
                <strong className="text-white">Final recommendation</strong> — 9.5 kWh
                LFP, with the rationale captured in the cert evidence bundle citing
                Reg 570.5.1(a)(c)(g)(h). Customer told: "nameplate 9.5 kWh, usable 7.6
                kWh, delivered-to-loads ~7.2 kWh per cycle." Expansion path noted: can add
                a second 9.5 kWh module if EV / heat pump arrives later
              </li>
            </ul>
          </ConceptBlock>

          <SelfConsumptionKnee caption="Self-consumption rises sharply with the first few kWh of storage, then flattens — past the knee, a bigger battery adds little, so size to the knee not beyond it." />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Tariff arbitrage — sizing without PV</ContentEyebrow>

          <ConceptBlock
            title="Octopus Flux / Cosy / Agile / Intelligent Go — each shapes the sizing differently"
            plainEnglish="A BESS sized for tariff arbitrage (no PV, or PV irrelevant) is sized against the GRID tariff differential, not PV surplus. The arithmetic is similar but the inputs change: peak-hour kWh you want to displace, cheap-window length, and the price differential that makes the round-trip economics work."
            onSite="The sweet spot for tariff-only BESS in UK 2025-26 is a customer with high evening loads, a wide cheap-window tariff (Intelligent Go) and no current ambition for PV. The differential needs to be larger than the round-trip loss × import rate to make sense — typically 10p/kWh+ gap to clear the round-trip tax and earn back the install cost."
          >
            <p>Octopus tariff shapes (verify current rates at install time):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Flux</strong> — three-hour cheap window
                02:00-05:00 (~12p), three-hour peak 16:00-19:00 (~33p), export rate
                ~33p in the peak. Designed for PV+BESS. Sizing targets the 3-hour peak
                discharge × peak load
              </li>
              <li>
                <strong className="text-white">Cosy</strong> — twin cheap windows
                (~13p morning + ~13p afternoon), expensive evening (~40p). Designed for
                heat-pump households. BESS can two-cycle a day; sizing per cycle
                rather than per day
              </li>
              <li>
                <strong className="text-white">Agile</strong> — half-hourly variable
                prices tracking wholesale. No fixed windows. BESS needs enough kWh
                AND enough inverter headroom to chase short-duration price spikes.
                Sizing model is statistical (price-volatility-aware) rather than
                deterministic
              </li>
              <li>
                <strong className="text-white">Intelligent Go</strong> — six-hour cheap
                window 23:30-05:30 (~7p), expensive rest of day (~27p). Designed for EV
                charging but works for BESS arbitrage. Wider cheap window means more
                capacity is reachable per night; sizing targets the daily peak-hour
                displacement
              </li>
              <li>
                <strong className="text-white">SEG-only customer (no time-of-use)</strong>
                — BESS sized purely against PV self-consumption uplift. The pure 1:2
                ratio default applies, validated against the customer’s smart-meter data
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Tariff-led sizing — heavy Octopus Intelligent Go user, no PV"
            situation="London town-house customer, no roof for PV, working from home, EV charging overnight on Intelligent Go. Daily total ~22 kWh; daytime load ~10 kWh weekdays at 27p (~£2.70/day import); evenings ~5 kWh at 27p (~£1.35/day); overnight EV ~7 kWh at 7p (~£0.49/day). Wants a BESS to displace daytime + evening peak with overnight cheap-rate charging."
            whatToDo="Target: shift the 15 kWh of expensive daytime + evening consumption to the cheap window. Working back: 15 kWh delivered ÷ 0.92 round-trip (grid→battery→load, no PV) ÷ 0.8 DoD = 20.4 kWh nameplate. Two-module GivEnergy install (9.5 + 9.5 = 19 kWh) or a Tesla Powerwall 3 (13.5 kWh) + future expansion module. Inverter sized for 5 kW continuous covers the peak-hour load. Reg 570.5.1 selection rationale: (a) daytime 10 kWh + evening 5 kWh = 15 kWh delivered target; (c) 6-hour charge window 23:30-05:30 OK at 0.5C charge from 5 kW PCE; (g) LFP 0.5C / 80% DoD; (h) daily cycling — 5,840 cycles in 16 years against ~6,000+ rated. Annual savings ≈ 15 kWh × (27p - 7p) × 365 × 0.92 round-trip = ~£1,000/yr at 2025-26 prices."
            whyItMatters="Tariff-led sizing is a parallel approach to PV-led sizing, not a sub-case. The arithmetic targets a DIFFERENT quantity (price differential × cycled kWh) but the Reg 570.5.1 frame is the same. Pure-arbitrage BESS in the UK 2025-26 market is a small but growing segment, particularly with Intelligent Go expanding the cheap-window appeal. Cert evidence bundle records the tariff (with retention date — tariffs change), the daily kWh target, the C-rate and round-trip used, and the expected savings range."
          />

          <Scenario
            title="PV-led sizing — south-facing roof, no time-of-use tariff, SEG only"
            situation="Devon customer, large south-facing roof, 6 kWp PV planned, no EV, no heat pump, no time-of-use tariff (customer on a flat-rate import contract). Daily load average 12 kWh, evening peak 17:00-22:00 = 60% of daily. Wants maximum PV self-consumption rather than tariff arbitrage."
            whatToDo="Pure self-consumption sizing — 1 kWp PV : 2 kWh BESS starting point = 12 kWh BESS. Test against half-hourly data: PV-only self-consumption 32%; 9.5 kWh BESS uplifts to 71%; 13.5 kWh uplifts to 78%; 19 kWh uplifts to 80%. Knee is between 9.5 and 13.5. Customer recommendation: 13.5 kWh BESS (e.g. Tesla Powerwall 3 single unit, or 13.5 kWh of GivEnergy LFP modules). Reg 570.5.1 selection rationale: (a) 12 kWh daily, (c) PV charge window May-September 6+ hours easy / Oct-April reliant on Flux-equivalent later if customer switches tariff, (g) LFP 0.5C / 80% DoD, (h) daily summer cycling, partial winter cycling — ~280 full-cycle-equivalents per year × 16 years = 4,480 cycles, well within LFP rating. SEG export ~5p/kWh in 2025-26 makes self-consumption (avoiding ~25p import) ~5× more valuable than export. Annual savings ≈ 12 kWh × 0.78 × 25p × 365 × 0.95 round-trip ≈ £810/yr."
            whyItMatters="PV-led sizing on flat-rate tariff is the simplest sizing case — purely about uplifting self-consumption against a single SEG-vs-import differential. The knee point is sharp; sizing past it just costs more for trivial extra kWh capture. When the customer later switches to a time-of-use tariff (likely as Octopus and competitors expand offerings), the BESS can re-target its charge / discharge cycles without resizing. Cert evidence bundle records the today-sizing and the future-tariff flexibility."
          />

          <SectionRule />

          <ContentEyebrow>Oversizing trap, knee point and the customer conversation</ContentEyebrow>

          <ConceptBlock
            title="The knee point — why bigger stops being better"
            plainEnglish="The self-consumption curve is concave. The first kWh of BESS converts a lot of would-be-exported PV into self-consumption; the tenth kWh of BESS converts only a small additional fraction. Beyond the knee on the curve, additional capacity buys vanishingly small uplift — and the customer pays full price for it."
            onSite="Run the curve for the specific customer. Don’t guess. The knee shifts with roof orientation, load profile, season balance and tariff. Show the curve to the customer — visual makes the case for the right size far better than a number does."
          >
            <p>How to find the knee in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Step 1</strong> — half-hourly smart-meter
                data for 12 months + PVGIS PV output for the actual roof
              </li>
              <li>
                <strong className="text-white">Step 2</strong> — simulate battery
                operation at five candidate sizes (e.g. 4.5, 9.5, 13.5, 19, 27 kWh)
              </li>
              <li>
                <strong className="text-white">Step 3</strong> — read off
                self-consumption % at each size; calculate marginal £/kWh-uplift
                (incremental cost ÷ incremental annual saving)
              </li>
              <li>
                <strong className="text-white">Step 4</strong> — the knee is the largest
                size where the marginal £/kWh-uplift is still &lt; the customer’s
                cost-of-capital × pack lifetime. Beyond that, the next increment is
                uneconomic
              </li>
              <li>
                <strong className="text-white">Step 5</strong> — show the curve to the
                customer with the knee marked. Sign off the size as the cert evidence
                bundle entry against Reg 570.5.1(h)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Quoting nameplate kWh to the customer without converting to delivered"
            whatHappens="Installer quotes &lsquo;13.5 kWh battery!&rsquo; on the proposal. Customer expects ~13 kWh of evening usage covered. In service, app shows the pack giving ~10 kWh on a good day (13.5 × 0.8 DoD × 0.92 round-trip). Customer feels mis-sold. EICR conversation 5 years later: &lsquo;why does my battery only do 10 kWh when the label says 13.5?&rsquo;"
            doInstead="Quote ALL THREE numbers: nameplate, usable (nameplate × DoD), delivered-to-loads (usable × round-trip). 13.5 kWh nameplate / 10.8 kWh usable / 9.94 kWh delivered. The customer enters service with realistic expectations and the cert evidence bundle is consistent with what their app shows. Customer trust survives the first year of measurement."
          />

          <CommonMistake
            title="Sizing past the knee point because &lsquo;more is more&rsquo;"
            whatHappens="Installer quotes 19 kWh of BESS on a site where modelling shows the knee at 9.5 kWh. Customer pays ~£3,000 more for ~2 percentage points of additional self-consumption. Pack cycles less per day (longer cycle life — true, but immaterial when calendar life is the binding constraint anyway). Customer’s payback period extends by ~5 years. Five years later customer asks why the pack &lsquo;feels too big&rsquo;."
            doInstead="Recommend AT the knee, with the curve shown to the customer. If they push for larger anyway (preference for headroom, expected EV / heat pump within ~2 years), document the rationale in the cert evidence bundle. The smaller-pack-with-expansion-path recommendation lets the customer add capacity later when the actual extra load arrives — cheaper, cleaner, lower risk than oversizing today. Reg 570.5.1(h) is the regulatory hook for this conversation."
          />

          <CommonMistake
            title="Skipping the C-rate check on a kWh-sized pack"
            whatHappens="Installer sizes 10 kWh of BESS against a customer’s 8 kWh evening peak, satisfied that the energy capacity is comfortable. Selects an older Pylontech US3000 (2.4 kWh modules at 0.5C continuous = 1.2 kW per module; 5 modules = 12 kWh nameplate at 6 kW continuous). Customer turns on shower (8.5 kW peak) — BMS throttles, grid imports anyway, customer baffled."
            doInstead="C-rate and kWh together. Calculate continuous kW = C-rate × kWh, compare against customer’s peak load draw, and pick a pack that covers both. Where peak load demands more kW than one pack supports, parallel modules (same brand / same age / explicit manufacturer support) raise the kW ceiling. Cert evidence bundle records both kWh capacity AND continuous kW capability. Reg 570.5.1(g) charge / discharge profiles is the regulatory hook."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Sizing answers four of the ten Reg 570.5.1 selection factors: (a) nature of demand, (c) charge and discharge time, (g) charge and discharge profiles (C-rate, DoD, rate-related ageing), and (h) load profiles and cyclic operation capability.',
              'Usable kWh = nameplate × DoD × round-trip efficiency. Quote ALL THREE numbers to the customer: nameplate (on the cabinet), usable (BMS-limited), delivered-to-loads (after round-trip).',
              'Typical UK 2025-26 derating: LFP at 80% DoD; DC-coupled hybrid ~95% round-trip; AC-coupled cross-charge ~88% round-trip; standby losses ~20-40 W continuous on the inverter.',
              'C-rate × nameplate = continuous kW. Skip the C-rate check and a kWh-comfortable pack still cannot deliver the customer’s peak loads. Cell-level C-rate usually pins the pack below the inverter rating.',
              'Half-hourly smart-meter data is the gold input. 17,520 readings/year describe the load shape. Pair with PVGIS for the actual roof, simulate at multiple BESS sizes, find the knee on the self-consumption curve.',
              'The knee point — the size beyond which additional kWh stops materially improving self-consumption — is where to recommend. Sizing past the knee wastes capacity and customer money.',
              'UK 2025-26 starting ratio: 1 kWp PV : 2 kWh BESS for pure PV self-consumption, no time-of-use tariff, no EV / heat pump. Shifts up with tariff arbitrage and high-cycling loads; shifts down with high daytime baseload.',
              'Tariff-led sizing (no PV) is a parallel approach. Octopus Flux / Cosy / Agile / Intelligent Go each shape the sizing differently — cheap-window length, peak-window penalty, and price differential drive the answer.',
              'Cert evidence bundle records the sizing rationale per Reg 570.5.1(a)(c)(g)(h): nameplate kWh, usable kWh, delivered-to-loads kWh, DoD, C-rate, round-trip efficiency, tariff (with date), customer’s daily kWh, expected cycles per year, future-expansion path.',
              'Future-proof through MODULAR EXPANSION (route A — cheaper, lower risk) rather than OVERSIZING TODAY (route B — pays now for value that may never arrive). Add modules when the EV / heat pump actually shows up.',
              'Common mistakes: quoting nameplate without converting to delivered; sizing past the knee; skipping the C-rate check; forgetting to divide energy target by DoD; ignoring round-trip losses; sizing against a single annual kWh instead of half-hourly load shape.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-5-section-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BESS topologies & architectures
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.7 Installation, commissioning & ventilation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
