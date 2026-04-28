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
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s2-design-vs-connected',
    question: "What's the difference between connected load and maximum demand?",
    options: [
      'They are the same thing',
      "Connected load = sum of every load's rated current (everything switched on simultaneously, all at rated power). Maximum demand = the actual peak load the installation will draw, after applying diversity factors that account for not-everything-running-flat-out simultaneously",
      'Connected load is for AC, maximum demand is for DC',
      'Maximum demand is a manufacturer specification',
    ],
    correctIndex: 1,
    explanation:
      "Connected load is the worst-case theoretical sum: every appliance, light and outlet operating at rated power simultaneously. In a real installation that never happens — people don't run the kettle, oven, washing machine, dishwasher, EV charger and immersion all flat-out at the same time. Diversity factors capture the realistic peak coincident demand. The maximum demand drives cable sizing, OPD selection, supply assessment and the cert recording. Reg 311.1: 'For economic and reliable design within thermal limits and admissible voltage drop, the maximum demand shall be determined.'",
  },
  {
    id: 'm3s2-no-curtailment',
    question: "BS 7671 explicitly says you can't use diversity for one specific purpose. Which?",
    options: [
      'Cable sizing',
      'Load curtailment / load control / overload protection — diversity is a DESIGN ASSESSMENT tool, not an operational means of limiting load. Where actual load limiting is required, it must be achieved by positive measures (load-shedding contactors, demand-response signals, etc.), not by assuming diversity',
      'Voltage drop calculation',
      'Maximum demand calculation',
    ],
    correctIndex: 1,
    explanation:
      "BS 7671: 'Diversity shall not be used as a means of load curtailment, load control or overload protection.' The reasoning is straightforward — diversity is a STATISTICAL approximation of likely peak load. It's correct on average but doesn't bind in any individual installation. If load actually exceeds the diversity-assumed peak, the cable/OPD must still cope. Where load control IS required (e.g. to keep within an export limit on a prosumer install, or to manage demand on a constrained supply), it must be done by physical / electronic means, not by design assumption.",
  },
  {
    id: 'm3s2-record-on-cert',
    question: 'BS 7671 / GN3 require what to be recorded on the cert relative to maximum demand?',
    options: [
      'Nothing — maximum demand is internal design',
      'Maximum demand expressed in amps, kW or kVA AFTER diversity is taken into account, available to the person carrying out inspection and testing',
      "Each circuit's individual peak load",
      'Maximum demand only for industrial work',
    ],
    correctIndex: 1,
    explanation:
      'GN3: BS 7671 requires that the maximum demand (after diversity) shall be made available to inspectors. The cert records the value in amps / kW / kVA. The reason: testing and verification need to take account of the actual demand the installation will see, and the recording is the audit trail that supports future EICRs. New A4 model EIC has explicit fields for this; legacy installations may have it on the original design documentation rather than the cert itself.',
  },
  {
    id: 'm3s2-osg-table',
    question: 'Where does the typical UK domestic / small commercial diversity guidance live?',
    options: [
      "It doesn't exist",
      'OSG Appendix A — gives diversity factors for the most common UK domestic / small commercial circuit types (cooker, sockets, immersion, EV, heat pump, lighting, etc.)',
      'Only in BS 7671 itself',
      'Only in manufacturer manuals',
    ],
    correctIndex: 1,
    explanation:
      "The On-Site Guide (OSG) — published alongside BS 7671 — has Appendix A 'Standard final circuits' and the diversity guidance in its main text. For UK domestic, OSG App A is the practical reference for how much diversity to apply on each circuit type. For commercial / industrial work, the OSG provides indicative starting points; detailed design uses the manufacturer's data and the engineer's judgement. The cert design sheet records which diversity factors were applied and why.",
  },
  {
    id: 'm3s2-cooker-example',
    question:
      "A typical UK kitchen has a 7 kW electric cooker on a dedicated circuit. OSG App A's diversity guidance for a single-phase domestic cooker is approximately what?",
    options: [
      '100% — assume the cooker is always at full load',
      '10 A + 30% of the remainder above 10 A. So a 7 kW (≈30 A at 230 V) cooker contributes 10 + (30-10) × 0.30 = 16 A to the maximum demand calculation',
      '0% — cookers are negligible',
      '50% always',
    ],
    correctIndex: 1,
    explanation:
      "OSG diversity for domestic single-phase cooker: 10 A + 30% of the cooker rated current above 10 A. The reasoning: cookers cycle (oven on/off, hobs on different settings, kettle on the cooker switch) so the steady-state coincident demand is much less than rated. For a 30 A cooker, the diversity-applied contribution is 10 + (30-10) × 0.30 = 16 A — about half the connected load. This is why the cooker circuit can run on a 32 A radial despite the cooker's nameplate sometimes exceeding 30 A.",
  },
  {
    id: 'm3s2-three-phase-balance',
    question:
      'On a three-phase installation, what does Reg 311.1 require regarding the design current?',
    options: [
      'Total load divided by three',
      'Calculate the maximum line current including any imbalance — the design current (Im) is based on the WORST-CASE individual line current after diversity, not the average across phases. Three-phase loads should be balanced where practical, but unbalanced single-phase loading dictates conductor sizing',
      'Use the highest phase current always',
      'Apply diversity to the total only',
    ],
    correctIndex: 1,
    explanation:
      'Three-phase design has the additional complication of imbalance. Single-phase loads spread across the three phases of a three-phase supply are rarely perfectly balanced — kitchens, EV chargers, PV inverters end up on whichever phase the design distributes them to. The maximum demand calculation considers the WORST-CASE individual phase current after diversity. Reg 311.1 references the RMS values of current in lines L1, L2 and L3 individually, plus the maximum neutral current Im. Designers attempt to balance phases at design time; in practice the maximum-demand sizing accommodates residual imbalance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new domestic install has the following loads: lighting 6 A, sockets ring 32 A, second sockets ring 32 A, cooker 30 A, immersion 16 A, electric shower 32 A, EV charger 32 A. If you ignored diversity entirely, what would the connected load be?',
    options: [
      '32 A (largest single load)',
      "180 A (sum of all rated currents — the 'worst-case never-happens' figure)",
      '92 A (an arbitrary partial sum)',
      '63 A',
    ],
    correctAnswer: 1,
    explanation:
      "Connected load = sum of every load's rated current = 6 + 32 + 32 + 30 + 16 + 32 + 32 = 180 A. This is the theoretical worst case — every load operating at rated simultaneously, which never actually happens. Diversity-applied maximum demand for the same load list would be roughly 60-80 A — well below the 100 A typical UK domestic supply. This is why a 100 A supply can serve a property with 180 A connected: real-world demand is always significantly less than connected.",
  },
  {
    id: 2,
    question:
      'You are designing an installation and the connected load (after diversity) approaches the supply rating. What does BS 7671 require?',
    options: [
      "Don't worry about it — the DNO will handle overloads",
      'If maximum demand approaches or exceeds the supply rating, contact the DNO for a supply upgrade. BS 7671 mandates supply suitability per Reg 313.1 / 311.1; using a supply incapable of meeting the design demand is non-compliant',
      'Apply more diversity to fit',
      'Reduce circuit sizes',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 313.1 / 311.1: the supply must be suitable for the installation, including the maximum demand. If the design exceeds the supply rating, the supply must be upgraded — typically by DNO. UK domestic standard supply is 100 A single-phase; properties with EV + heat pump + electric cooker + electric shower may legitimately require 100 A and the supply rating becomes the binding constraint. Some designs will need 200 A single-phase or three-phase upgrade. Don't apply more diversity to make the design fit — the diversity assumptions must reflect realistic load behaviour, not be tuned to satisfy supply rating.",
  },
  {
    id: 3,
    question:
      'Two identical 5 kW heat pumps are installed on a property. Should diversity be applied between them?',
    options: [
      'Yes always',
      'Probably no diversity — on a typical winter design day, both heat pumps would be running simultaneously to meet building heat demand. The realistic peak coincident demand is 100% of both. Spec the supply / cable for full simultaneous operation',
      '50% diversity',
      'It depends on the heat pump manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      "Diversity reflects the statistics of LIKELY simultaneous operation. Two heat pumps serving the same building will both operate during heating demand — they're not statistically independent. Realistic diversity is close to 100%. Compare to two cookers in a 2-flat HMO: each flat's cooker operates independently; diversity between flats is meaningful. The general principle: diversity applies between INDEPENDENT loads, not between loads that share a common driver (heating demand, cooling demand, lighting demand etc.).",
  },
  {
    id: 4,
    question:
      'A 7 kW EV charger has been added to a property. The OSG diversity guidance for EV chargers is most commonly cited as what?',
    options: [
      '0%',
      '100% — full rated current at maximum demand. EV chargers operate at rated load for sustained periods (typical 6-8 hour charge cycle); the realistic peak coincident demand is the rated current, not a diversified value',
      '50%',
      '30%',
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers should generally be sized at 100% rated current in the diversity calculation. Unlike cookers (which cycle) or showers (which run briefly), EV chargers operate at rated power for hours at a time. The peak coincident demand is the rated current. Some designers argue for diversity if the EV charger has demand-response capability (curtailing load during system peaks), but this requires positive load-control measures — and BS 7671 says diversity isn't a substitute for load control. Default 100%; reduce only with documented load-control evidence.",
  },
  {
    id: 5,
    question:
      'On a TPN three-phase distribution board, what does balance between phases mean for cable sizing?',
    options: [
      'Use total kVA divided by 3',
      "Calculate each phase's current separately, including any imbalance — the largest single-phase current (after diversity) determines the conductor sizing for that phase. Aim to balance loads at design time, but size for the worst-case individual phase",
      'Always use 100 A',
      "Phases don't matter for cable sizing",
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase cable sizing addresses the worst-case individual phase. If three phases are perfectly balanced, the conductor sizes are equal and the calculation is straightforward. In practice, single-phase loads (UK domestic kitchens, single-phase EV chargers, etc.) are spread across the three phases but rarely perfectly. Reg 311.1 references the RMS line currents L1, L2, L3 individually. Designers attempt balance at design time; cable sizing accommodates residual imbalance. Three-phase loads (motors, three-phase heat pumps) inherently balance themselves and contribute equally to all three phases.',
  },
  {
    id: 6,
    question: 'Why does BS 7671 prohibit using diversity as overload protection?',
    options: [
      'Arbitrary regulatory choice',
      "Because diversity is a STATISTICAL design assumption — it predicts likely peak demand on average across many installations, but doesn't bind in any individual installation. If actual load exceeds the diversity-assumed value, the cable / OPD must still handle it. Diversity informs design choices but doesn't replace overcurrent protection",
      'Diversity is not accurate enough',
      'Diversity only applies to single-phase',
    ],
    correctAnswer: 1,
    explanation:
      "Diversity is a statistical tool. The OSG diversity figures are reasonable for AVERAGE installations but any individual install may behave differently. A property where the occupants happen to use the cooker, dishwasher, washing machine and EV charger simultaneously can exceed the diversified design — and the cable/OPD must cope. That's why Reg 433 (overcurrent protection) is independent of diversity: the OPD protects against sustained overload regardless of how 'unlikely' the diversity calculation said overload would be. Diversity informs cable / supply sizing; OPD protects against the failure of the diversity assumption.",
  },
  {
    id: 7,
    question:
      'A small office has 30 desks, each with a 13 A general-purpose socket. The OSG-equivalent diversity for this is approximately what?',
    options: [
      '100% — every desk drawing 13 A simultaneously',
      'Significantly less than 100% — typical office computer + monitor + phone charger draws 1-2 A; diversity factors of 25-40% for office socket banks are common. Assess realistic peak per desk and apply to the count',
      '200%',
      '0%',
    ],
    correctAnswer: 1,
    explanation:
      'Office sockets are classic diversity territory. Each desk has a 13 A socket but the actual load is rarely close to 13 A — typical office equipment per desk is 100-300 W, well under 2 A. Even at peak (everyone switching on simultaneously after lunch), realistic per-desk demand is 1-3 A. Aggregating across 30 desks with diversity gives a realistic peak of perhaps 30-60 A — far less than the 390 A connected load if every socket drew 13 A simultaneously. Office socket diversity is typically 25-40% on UK commercial design.',
  },
  {
    id: 8,
    question:
      "A 7 kW EV charger is to be added to a property with an existing 60 A single-phase supply (not yet upgraded). The current diversified maximum demand is calculated at 55 A. Adding the EV: 55 + 32 (EV at 100% rated) = 87 A — exceeds the 60 A supply. What's the correct response?",
    options: [
      'Apply diversity to the EV to get the total under 60 A',
      "Don't install the EV until the supply is upgraded — Reg 313.1 / 311.1 require supply suitability. Where maximum demand exceeds supply rating, the supply must be upgraded (typically a DNO 100 A or three-phase upgrade)",
      "Reduce the property's other loads",
      'Install the EV anyway and trust the customer not to overload',
    ],
    correctAnswer: 1,
    explanation:
      "Don't compromise on supply suitability. The customer needs a supply upgrade before the EV is installed. Routes: contact the DNO for a 100 A or three-phase upgrade (typical lead time weeks-months, cost varies); alternatively use a load-managing EV charger (e.g. with CT clamp on the incoming supply) that physically curtails EV charging to keep total demand under the supply limit. The latter requires positive load-control hardware — NOT a design assumption. Both routes documented on the EIC. Don't fudge the diversity to fit a supply that's actually inadequate.",
  },
];

const faqItems = [
  {
    question: 'Where does BS 7671 mandate maximum-demand calculation?',
    answer:
      'Reg 311.1 — for economic and reliable design within thermal limits and admissible voltage drop, the maximum demand shall be determined. Reg 313.1 — supply suitability check including maximum demand. The calculation is mandatory; the cert records the result; the inspector verifies the calculation is reasonable on EICR. New A4 model EIC has explicit fields for maximum demand recording.',
  },
  {
    question: 'How accurate do diversity calculations need to be?',
    answer:
      "Reasonable. The OSG provides starting points; the engineer's judgement adapts to the specific install. A domestic property with three small children and a working couple is different to a holiday home occupied two weeks a year — same connected load, very different realistic peak demand. Document the diversity assumptions on the design sheet so future inspectors / engineers understand the reasoning. Where significant deviation from OSG guidance is justified, note the rationale (e.g. 'cooker diversity 100% applied because customer cooks for large household daily').",
  },
  {
    question: 'What happens if maximum demand exceeds the supply rating after install?',
    answer:
      "Either supply upgrade (DNO 100 A or three-phase) or load management (positive measures — load-shedding contactors, demand-response signals, EV charger CT-clamp control). Don't continue to operate an installation drawing more than supply rating — the DNO's protective device upstream may operate (cutting all power), or the supply cable / cut-out may overheat. EICR finding of demand exceeding supply: typically C2.",
  },
  {
    question: 'Should diversity be applied to motor loads?',
    answer:
      "Carefully. Motor INRUSH (starting current) is large but brief — diversity applies to STEADY-STATE running current, not inrush. For multiple motors on a common feeder where they don't all start simultaneously, some diversity applies; for motors that always run together (paired pumps, paired fans), diversity is close to 100%. Cable / OPD sizing must accommodate inrush — typically by Type C / D MCB selection rather than higher cable rating.",
  },
  {
    question: "What's the difference between diversity and load factor?",
    answer:
      "Different concepts. DIVERSITY: the ratio of maximum demand to total connected load (a number less than or equal to 1.0). LOAD FACTOR: the ratio of average load to peak load over a period (also less than 1.0). Diversity informs cable / OPD / supply sizing; load factor informs energy-efficiency design (capacity sizing, daily-cycle considerations). Both are useful; they're not interchangeable.",
  },
  {
    question: 'What about manual or automatic load disconnection?',
    answer:
      "Reg 722.311.201 (and similar in other Section 7 sub-sections): manual or automatic disconnection of loads MAY be taken into account when determining maximum demand. Where load curtailment is by positive automatic measure (e.g. an EV charger with a CT clamp that throttles charging when total demand approaches a limit), the design can rely on it. The key word is POSITIVE — automatic load disconnection that's specified, installed and verifiable. Not 'we'll tell the customer not to use everything at once'.",
  },
  {
    question: 'How does maximum demand relate to voltage drop?',
    answer:
      "Voltage drop is calculated at maximum demand — the worst-case load condition. If maximum demand is 80 A, voltage drop on the relevant cable is calculated at 80 A. BS 7671 Reg 525.1: voltage at fixed equipment shall not be less than the lower limit appropriate to the equipment's nominal voltage. Reg 525 / Table 4Ab in OSG specify maximum permitted voltage drop (3% for final circuits, 5% for lighting origin-to-far-point, 8% for other circuits origin-to-far-point). Cable sizing for voltage drop is independent of CCC sizing — both must be satisfied; whichever is binding determines the cable.",
  },
  {
    question: 'When is it appropriate to override OSG diversity guidance?',
    answer:
      'When site-specific conditions clearly differ from typical. Examples: a property with a sustained high-demand profile (large family, home-office workshop, full-time-occupied) may warrant tighter diversity factors than the OSG average. A property with dynamic load management (EV smart charger, battery storage with peak-shaving) may warrant more diversity if the load management is positively implemented. Document the reasoning on the design sheet; reasonable departures are acceptable, undocumented departures are not.',
  },
  {
    question: 'Does the cert form ask about diversity directly?',
    answer:
      "Indirectly. The EIC records maximum demand (kVA / kW / amps). The diversity calculation that produced that figure is documented on the design sheet rather than the cert itself. The inspector's EICR check is whether the maximum demand recorded on the cert is reasonable for the installation — gross discrepancies between recorded demand and actual measured demand on inspection are flagged for investigation.",
  },
];

const BS7671Module3Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Maximum Demand & Diversity | BS 7671:2018+A4:2026 | Module 3.2',
    description:
      'How BS 7671 mandates maximum-demand calculation (Reg 311.1, 313.1), how diversity is applied to convert connected load to realistic peak demand, the OSG App A guidance for typical UK domestic and small commercial circuits, three-phase balance considerations, and what BS 7671 explicitly forbids — using diversity as a substitute for overcurrent protection.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2"
            title="Maximum demand and diversity"
            description="BS 7671 mandates maximum-demand calculation as the basis for cable, OPD, supply and voltage-drop sizing. Diversity is the statistical tool for converting connected load to realistic peak demand. Get it right and the installation is appropriately sized; get it wrong and the supply or cables are inadequate (under-sized) or wasteful (over-sized)."
            actions={
              <>
                <RegBadge>311.1</RegBadge>
                <RegBadge>313.1</RegBadge>
                <RegBadge>525.1</RegBadge>
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 311.1: maximum demand SHALL be determined for every installation. Reg 313.1: supply must be suitable for the maximum demand. Cert records the result.',
              'Diversity = the ratio of realistic peak coincident demand to total connected load. OSG App A gives standard factors for UK domestic / small commercial circuits.',
              'Diversity is a DESIGN TOOL, not load control. BS 7671 explicitly forbids using diversity as a substitute for overload protection or load curtailment.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish connected load from maximum demand and explain why diversity converts one to the other.',
              'Apply OSG App A diversity factors to typical UK domestic loads (cookers, sockets, immersion, EV, heat pumps) and produce a realistic maximum-demand figure.',
              'Calculate three-phase maximum demand including imbalance considerations per Reg 311.1.',
              "Identify when diversity is and isn't appropriate (independent loads vs common-driver loads, EV chargers, motor circuits).",
              'Recognise the BS 7671 prohibition on using diversity as load control / overload protection — and design positive load-management measures where curtailment is required.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Connected load vs maximum demand</ContentEyebrow>

          <ConceptBlock
            title="Why the difference matters"
            plainEnglish="Sum every appliance's rated current and you get a theoretical worst case (connected load). Apply realistic assumptions about which loads run simultaneously and you get the actual peak demand (maximum demand). The supply, cables and OPDs are sized for maximum demand — connected load is academic."
            onSite="A typical 4-bed UK home with full electric (heat pump, EV, induction hob, electric shower, immersion, sockets, lighting) easily exceeds 200 A connected load. The same property's realistic peak coincident demand is 60-80 A. The 100 A standard UK domestic supply is adequate because diversity-applied maximum demand fits within it — even though connected load is well above."
          >
            <p>
              Reg 311.1 mandates the maximum-demand determination 'for economic and reliable design
              within thermal limits and admissible voltage drop.' The cert records the value.
              Designers calculate; inspectors verify; the rest of the design (supply suitability,
              cable sizing, OPD selection, voltage drop) all flows from the maximum-demand figure.
              Get it wrong — too high, you over-spec and waste money; too low, the installation
              can't cope and either trips repeatedly or overheats.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 311.1 — Maximum demand"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1."
            meaning="Maximum demand is mandatory ('shall'), not optional. Every installation requires the calculation. The figure feeds into cable sizing (CCC vs Iz), OPD selection (In ≤ Iz), supply suitability (Reg 313.1), and voltage-drop verification (Reg 525.1)."
            cite="BS 7671:2018+A4:2026, Reg 311.1"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Diversity in practice — OSG App A</ContentEyebrow>

          <ConceptBlock
            title="The standard UK domestic diversity factors"
            plainEnglish="The On-Site Guide Appendix A gives diversity factors for typical UK domestic / small commercial loads. They're starting points — the engineer's judgement adapts to the specific install."
            onSite="Common factors (indicative): Lighting — 66% in domestic. Cooker — 10 A + 30% of remainder above 10 A. Immersion heater — 100% (it's thermostat-controlled but operates flat-out when on). Electric shower — 100% during use. Sockets — 30% of total connected (assuming not all drawing rated simultaneously). EV charger — 100% (operates at rated for hours). Heat pump — 100% (during heating demand)."
          >
            <p>
              The judgement element matters. A property with three small children and a busy working
              couple will pull closer to the connected load than a holiday home occupied two weeks a
              year — same connected load, very different realistic peak demand. Document the
              diversity assumptions on the design sheet so the calculation is traceable. The OSG
              factors are reasonable for the AVERAGE UK domestic; departures are permitted with
              documented rationale.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Worked example — a typical 3-bed semi"
            plainEnglish="Walking through a real diversity calculation makes the abstract concrete. A 3-bed UK semi with standard domestic loads."
            onSite="Loads: lighting 6 A; sockets ring (kitchen) 32 A; sockets ring (downstairs) 32 A; sockets ring (upstairs) 32 A; cooker 30 A; immersion 16 A; electric shower 32 A; EV charger 32 A. Connected load: 212 A. Apply diversity: lighting 66% × 6 = 4 A; sockets ring 30% × 32 = 9.6 A × 3 = 28.8 A; cooker 10 + 0.30 × 20 = 16 A; immersion 100% = 16 A; shower 100% = 32 A (assume in use); EV 100% = 32 A (operates at rated). Diversified maximum demand: 4 + 28.8 + 16 + 16 + 32 + 32 = 128.8 A. Exceeds 100 A standard supply — needs upgrade or three-phase or load management. The shower-EV simultaneous assumption is harsh; in practice they're rarely both running simultaneously in a small household. With shower at 50% diversity (during summer / non-peak): 16 A — total 112.8 A still over 100 A. With EV smart charging (curtails to 16 A during peak) — total 96.8 A, fits."
          >
            <p>
              The calculation reveals where the supply constraint bites. Modern 3-bed UK properties
              with full electric (no gas) commonly exceed the 100 A single-phase supply once EV is
              added. The design choices: (1) DNO supply upgrade to 100 A with smart-meter
              time-of-use management, (2) three-phase supply upgrade, (3) dynamic load-managing EV
              charger that curtails to keep within supply rating. All three are valid; the
              customer's preferences and the DNO's quotes determine the practical choice.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />
          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>
            Diversity and load profiles — how household behaviour shapes the peak
          </ContentEyebrow>

          <ConceptBlock
            title="Why two identical installs can have very different realistic peaks"
            plainEnglish="Diversity factors are averages drawn across the UK housing stock. A specific household either matches the average or it doesn't — and the gap between average and worst case is where under-sized installations get into trouble."
            onSite="Two identical 4-bed semis with the same connected load: one is occupied by a retired couple who eat out three nights a week and run a small EV at 16 A overnight; the other houses two working parents, three teenagers, a 22 kW EV, an electric shower used four times every morning and a daily tumble-dryer cycle. The OSG App A factors land roughly in the middle. The first house's realistic peak is well below the OSG figure; the second's sits noticeably above it — and the design must accommodate the upper end, not the average."
          >
            <p>
              The qualified-spark question on every diversity calculation is: does this household
              behave like the OSG average? Where the answer is honestly &quot;yes&quot;, the OSG
              factors are appropriate. Where the honest answer is &quot;no&quot; — full-time
              occupancy, large family, home-office workshop, two-shift household with overlapping
              cooking and EV-charging windows — the diversity assumptions tighten and the
              maximum-demand figure rises. Reg 311.1 talks about &quot;economic and reliable&quot;
              design; reliability comes first when the household profile differs materially from the
              average. Document the assumption on the design sheet — &quot;cooker diversity taken at
              50% rather than OSG&apos;s 30% remainder factor due to large household and twice-daily
              cooking pattern&quot; is a perfectly defensible design note that protects you on the
              EICR five years later.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Time-of-day overlap — the realistic worst-case window"
            plainEnglish="Maximum demand is not just 'sum of diversified loads' — it's the largest sum that occurs in any single 30-minute window through the year. The design figure has to cover that window, not the daily average."
            onSite="Domestic peak in the UK sits in the 17:00-20:00 evening window: cooking, electric shower (post-school / post-gym), dishwasher, washing machine, kettle cycles, lighting at full load in winter, heat pump running flat-out on the coldest day, and EV plugged in on arrival. Smart-charge tariffs (Octopus Go, Intelligent Octopus, etc.) have shifted EV charging out of this window for many households — a real reduction in coincident demand — but only where the EV charger is positively scheduled, not where the customer might choose to plug in mid-evening. Where the charger is on a smart tariff with verified off-peak schedule, the design can take EV diversity below 100% in the evening peak window; where it's on a basic untimed charger, EV demand stays at 100% through the peak."
          >
            <p>
              The court / insurer view of diversity is straightforward — would a reasonable
              electrician have foreseen the load combination that actually occurred? If the design
              assumed EV charging never happens in the evening peak but the customer&apos;s charger
              was never set up to enforce that, the assumption fails on the day the cable runs hot.
              Positive load management (scheduled charging via the charger&apos;s own clock or a
              demand-response signal from the supplier) carries weight. Customer good intentions do
              not. Reg 722.311.201 (and its equivalent in other Section 7 sub-sections) lets you
              take automatic disconnection of loads into account in the maximum-demand calculation —
              but only where the disconnection is automatic and verifiable.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What diversity is NOT</ContentEyebrow>

          <ConceptBlock
            title="The BS 7671 prohibition"
            plainEnglish="Diversity is a STATISTICAL design tool — it predicts likely peak demand. It is NOT a substitute for: (a) load curtailment / load control, (b) overload protection. If actual load exceeds the diversity-assumed value, the cable / OPD must still cope."
            onSite="The mistake to avoid: 'we'll just apply more diversity to make the design fit'. If the customer's load profile genuinely doesn't match the diversity assumption — full-time occupied home, lots of simultaneous loads, big family — the design fails when it's loaded. The cable trips OPD repeatedly, or worse, runs hot and ages prematurely. Don't tune diversity to fit a constrained supply; either the diversity is realistic or it isn't."
          >
            <p>
              The corollary: where actual load curtailment IS required (export limit on a prosumer
              install, demand limit on a constrained DNO supply, peak-shaving on a battery storage
              system), it must be done by POSITIVE measures — physical load-shedding contactors,
              demand-response control signals, EV charger CT-clamp control. NOT by design-time
              diversity assumption. BS 7671 is explicit on this: diversity informs cable / OPD /
              supply sizing; positive load control limits actual load. The two are different design
              problems.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />
          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Three-phase considerations</ContentEyebrow>

          <ConceptBlock
            title="Balance, imbalance, and the maximum line current"
            plainEnglish="On a three-phase supply, the maximum demand isn't just the total kVA divided by three — it's the WORST-CASE individual line current after all single-phase loads have been distributed across the three phases. Designers attempt balance at design time; cable sizing accommodates residual imbalance."
            onSite="A typical UK three-phase domestic with 100 A per phase total can carry significantly more diversified load than 100 A single-phase, because three-phase loads (heat pump, three-phase EV charger) inherently balance and single-phase loads can be distributed. But the per-phase balance must be designed in — random allocation of single-phase loads to phases creates imbalance that pushes the worst-case phase current toward the supply limit."
          >
            <p>
              Reg 311.1 references the RMS values of current in lines L1, L2 and L3 (the input to
              the maximum-demand determination) plus the maximum neutral current Im (which becomes
              important on heavily-imbalanced installations or those with significant
              triplen-harmonic content from VSDs / LED drivers). Three-phase design discipline:
              tabulate every single-phase load, decide which phase each goes on, calculate the
              per-phase total, ensure no single phase exceeds the supply per-phase rating.
              Three-phase loads contribute equally to all three phases.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why three-phase domestic supplies are increasing"
            plainEnglish="Adding EVs, heat pumps and solar-PV-with-battery to UK domestic properties pushes demand past the 100 A single-phase supply standard. Three-phase 100 A per phase = effectively 300 A capacity, balanced — enough headroom for high-electrification dwellings without resorting to load management."
            onSite="A typical 'fully electrified' UK domestic in 2026: 7-22 kW EV charger, 5-12 kW heat pump (single-phase or three-phase variant), 4-6 kW solar PV with battery, induction hob, electric shower, electric oven. Total connected load 250-300 A. Three-phase supply distributes this across three phases at ~100 A per phase, with three-phase loads (heat pump, three-phase EV) contributing balanced. DNO upgrade cost varies (£500-3000+ depending on network position) but is increasingly common for new-build and significant retrofit work."
          >
            <p>
              The design implication: three-phase domestic isn't just a power capacity upgrade, it's
              a different design template. Balance-of-loads becomes a primary design discipline.
              Three-phase RCBOs are needed where Reg 411.3.3 / 411.3.4 trigger. Three-phase cabling,
              busbars, isolators throughout. The design effort is greater; the resulting
              installation has significantly more headroom and future-proofing.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>
            Calculating maximum demand for a workshop / small commercial unit
          </ContentEyebrow>

          <ConceptBlock
            title="Worked example — a 100 m² mechanical engineering workshop"
            plainEnglish="Commercial / light-industrial diversity is a different exercise from domestic. Connected loads are larger, the OSG App A factors are starting points only, and the engineer's judgement on duty cycle and simultaneity carries more weight."
            onSite="Take a small machine shop on a three-phase 100 A per phase supply (effective capacity 69 kVA). Connected loads: 11 kW three-phase lathe (16 A per phase running, 60 A per phase inrush); 7.5 kW three-phase milling machine (11 A per phase running); two 3 kW single-phase pillar drills (13 A each, single-phase L1); a 5.5 kW three-phase compressor (8 A per phase running, duty-cycled); 6 kW electric heating split across phases (8.7 A per phase); LED lighting 8 A total (split across phases at 2.7 A each); 3 kW kettle / kitchenette on L2 (13 A); 7 kW EV charger for the boss's van on L3 (32 A). Connected load per phase: L1 ≈ 16 + 11 + 13 + 13 + 8 + 2.7 + 8.7 = 72 A; L2 ≈ 16 + 11 + 8 + 2.7 + 13 + 8.7 = 59 A; L3 ≈ 16 + 11 + 8 + 2.7 + 32 + 8.7 = 78 A. Apply diversity: only one machine tool typically operates at a time (lathe OR mill, not both — independent loads, ~50% diversity); compressor duty-cycled at ~30%; pillar drills used briefly throughout the day at ~25%; heating 100% on the design winter day; lighting 100% during occupied hours; EV charger 100% (8-hour overnight cycle, but in practice operates simultaneously with daytime loads if plugged in mid-shift). Diversified per-phase peak: L1 ≈ 8 + 5.5 + 3.25 + 3.25 + 8 + 2.7 + 8.7 = 39 A; L2 ≈ 8 + 5.5 + 2.4 + 2.7 + 13 + 8.7 = 40 A; L3 ≈ 8 + 5.5 + 2.4 + 2.7 + 32 + 8.7 = 59 A. L3 is the binding phase at 59 A — well within the 100 A per-phase rating, with headroom for one more single-phase load."
          >
            <p>
              The discipline that the calculation forces: tabulate every load by phase, classify
              each by duty cycle (continuous, cycling, intermittent), apply realistic factors per
              category, identify the worst-case phase. The 11 kW lathe&apos;s 60 A per-phase inrush
              isn&apos;t in the maximum-demand calculation — that&apos;s a starting characteristic
              addressed by Type C / D MCB selection on the lathe&apos;s circuit, not by sizing the
              supply for inrush. Reg 311.1 is about steady-state demand. The EV charger pushing L3
              to the binding phase is typical of modern light-industrial installs — if the boss adds
              a second EV next year, the supply needs upgrading or the EV chargers need positive
              load-balancing across phases (some commercial EV chargers do this automatically;
              documenting the feature on the design sheet is essential).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Inrush, starting current and the sizing distinction"
            plainEnglish="Maximum demand is the steady-state peak the installation will draw — not the inrush current motors and large transformers pull at start-up. The two are different design problems and they pull cabling and protection in different directions."
            onSite="An 11 kW three-phase lathe might draw 16 A per phase running but 60-80 A per phase for the first few seconds at start (direct-on-line). Sizing the supply cable for that 60 A figure is wrong — the cable would be massively over-rated for the steady-state load and the voltage-drop calculation at running current would suggest a much smaller cable is actually needed. The right answer: size the cable for steady-state running current per Reg 311.1 / Appendix 4; size the protective device to ride through the inrush without nuisance-tripping (Type C MCB for typical motor inrush, Type D for direct-on-line motor starters or transformer primary circuits); accept that voltage drop during inrush will be larger than steady-state and verify it stays within Reg 525.1's limits at the moment of starting (typically a 2-3 second window). Where multiple machines might start simultaneously — common in workshops where the morning startup is everyone hitting the power switch within a minute of each other — diversity DOES apply to inrush in the sense that the cabling sees the sum of running-current of machines already on plus inrush of the next one starting. The supply transformer at the DNO is sized for inrush headroom; the consumer's installation can rely on that for occasional simultaneous starts but not as a continuous design assumption."
          >
            <p>
              The cert entry for inrush-driven design is the protective-device characteristic (Type
              C / D rather than Type B) on the relevant final circuits, plus a design-sheet note
              about the starting current and the rationale for the chosen device curve. Voltage-drop
              verification at steady-state running current is the Reg 525.1 compliance figure;
              voltage drop at inrush is checked once and noted as being within limits for the start
              duration. Don&apos;t conflate the two — sizing cabling for inrush wastes copper;
              sizing devices for steady-state alone causes nuisance trips every time the lathe
              starts.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where commercial diversity differs from domestic"
            plainEnglish="Commercial loads often have known duty cycles (machine tools cycle on a known programme; HVAC follows seasonal patterns; lighting follows occupancy schedules). The diversity factor is therefore evidence-based rather than statistical-average."
            onSite="Where measured demand data exists (smart meter, sub-metering on existing kit, manufacturer's duty-cycle figures), use it. A CNC machine running a known production cycle has a known average load — that's the diversity figure for it, not a guessed percentage. HVAC manufacturer data gives part-load curves for design weather; the actual maximum-demand contribution sits at the design heating / cooling day, not at nameplate. Office socket diversity for desk-density layouts has been studied by CIBSE — typical figures of 25 W/m² for general office, 40-60 W/m² for dense workstations are evidence-based design starting points. Where there's no measured data, OSG-style starting points apply but with clear documentation of the assumption — Reg 525.1's voltage-drop verification then flushes out under-specification at the verification stage."
          >
            <p>
              The court / HSE view on commercial design is more demanding than domestic — the
              installation is a workplace under EAWR 1989, the design records are subject to
              disclosure, and a poorly-justified diversity assumption that leads to under-
              specification is a documented design defect. Capture the basis of every diversity
              factor: measured data where available, manufacturer figures where not, OSG / CIBSE /
              IET commercial guidance as the fallback. Note the source on the design sheet alongside
              the figure. Five years later, when the workshop has expanded and someone asks why the
              supply is now inadequate, the design record explains exactly what the original
              assumptions were and where the load growth has exceeded them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using diversity to make the design fit a constrained supply"
            whatHappens="Customer wants a 7 kW EV charger added to a property where the diversified existing maximum demand is already 75 A on a 60 A supply (the supply was historically under-utilised). Designer applies aggressive diversity to the EV ('it'll only be used at night when nothing else is on') to bring total under 60 A, signs off the install. Within months, the customer is using the EV mid-evening alongside cooking — supply trips, cable overheats, callout."
            doInstead="Don't tune diversity assumptions to satisfy a supply rating. Either the customer's load behaviour matches a diversity assumption, or it doesn't. If the supply genuinely can't cope with realistic demand, the supply must be upgraded (DNO call) or actual load management must be installed (smart charger, load-shedding). BS 7671 is explicit: diversity is not a substitute for overload protection or load control."
          />

          <CommonMistake
            title="Applying domestic diversity factors to a commercial install"
            whatHappens="An office refurb uses OSG App A's domestic diversity factors. The 30 desk-positions are assessed at 30% diversity (assumed not all in use simultaneously). On the busy mid-morning peak, every desk has staff working with computers, monitors, phone chargers and desk lamps — actual peak demand approaches 80% of connected load, not 30%. Cable runs hot, voltage drop is excessive, network equipment sees brown-out conditions during peak."
            doInstead="OSG App A is for typical UK domestic / small commercial. Larger commercial work needs commercial-grade diversity assessment — typically 50-75% on office sockets during occupied hours, sometimes higher in dense workspaces. Document the assumption; verify against any available metering data; consult IET / CIBSE commercial design guidance for non-trivial loads."
          />

          <CommonMistake
            title="Under-specifying the supply for a fully-electrified property"
            whatHappens="New-build 4-bed detached. Customer brief: air-source heat pump (5 kW electrical input), 7 kW EV charger, induction hob, electric oven, electric shower, immersion as backup, solar PV with battery storage. Design sheet records connected load at 230 A and applies aggressive diversity (heat pump 60%, EV 50% on the basis of 'smart charging', shower 30% 'diversity with cooking') to bring maximum demand to 78 A — fits within the standard 100 A single-phase supply. House occupied; first cold winter morning, heat pump runs continuously, EV plugged in (customer hadn't set up the smart-charge schedule), induction hob in use, kettle on, shower running. Service-cut-out fuse blows. Customer is without power on the coldest day of the year."
            doInstead="The diversity figures used were not honest assumptions — they were tuning to fit the supply. On a fully-electrified UK domestic in 2026, the realistic maximum demand routinely exceeds 100 A single-phase. The correct designs are: (1) DNO three-phase 100 A/phase upgrade — quoted at design stage, customer makes the cost-vs-capacity decision before the build, not after; (2) single-phase 100 A with positive load-management hardware — heat-pump priority controller, EV charger with CT clamp on the supply that physically curtails charging when total demand approaches 90 A, documented and verified at handover; (3) reduced electrification — gas backup boiler retained, EV reduced to 3.6 kW slow charging. All three are valid; tuning diversity to make the numbers fit is none of them. Reg 313.1 / 311.1 require supply suitability — and 'suitability' means the supply copes with the realistic peak, not the diversity-massaged peak."
          />

          <CommonMistake
            title="Ignoring three-phase imbalance in the demand calculation"
            whatHappens="Designer calculates total connected load, divides by three, treats each phase as having 1/3 of total. Practical install: kitchen / EV / heat pump all on phase L1; lighting / sockets on L2; immersion / electric shower on L3. Real per-phase peak: L1 = 80 A, L2 = 25 A, L3 = 30 A. The supply's L1 phase is loaded near rating while L2 and L3 are barely used — but the cable is sized for the average, not the worst case."
            doInstead="Tabulate every single-phase load by phase. Calculate the per-phase total after diversity. Verify each phase is within supply per-phase rating. Aim to balance at design time; size cabling for the worst-case actual phase. Reg 311.1 explicitly references RMS line currents per phase, not totals — the design discipline applies."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Heat pump + EV upgrade on existing 60 A single-phase"
            situation="Customer has a 1990s 3-bed semi on a 60 A single-phase supply, current diversified maximum demand 45 A. Wants to add a 9 kW air-source heat pump (6 kW electrical input, single-phase) and a 7 kW EV charger. New maximum demand calculation: existing 45 + heat pump 26 A + EV 32 A = 103 A. Far exceeds 60 A supply."
            whatToDo="Three options. (1) DNO upgrade to 100 A — typical cost £500-2000, lead time 4-12 weeks. New maximum demand 103 A still exceeds; need additional measures or three-phase. (2) DNO upgrade to three-phase 100 A per phase — typical cost £2000-5000, lead time 12-24 weeks. Distribute single-phase loads across three phases, balanced. (3) Smart-charging EV with CT clamp control plus heat pump scheduling — keeps total demand below supply rating. Discuss with customer; document the chosen route on the EIC. Don't proceed with the install on the existing supply if maximum demand exceeds supply rating."
            whyItMatters="Modern UK electrification (heat pumps, EVs, induction hobs replacing gas) routinely pushes demand past existing supplies. The supply-upgrade conversation is increasingly common — and it's the qualified electrician who initiates it, based on the maximum-demand calculation. Don't try to fudge diversity to fit; the supply upgrade or load management is the correct technical answer. Customer expectations (cost, lead time) are managed by being honest about the requirement up front."
          />

          <Scenario
            title="Office refurb with a wide range of equipment per desk"
            situation="A 25-desk office is being refurbished. Loads: per-desk computer + monitor + phone charger + desk lamp ≈ 1.5 A typical, 3 A peak. Plus printers / copiers (4 of them at 10 A each), kitchen with kettle / microwave / dishwasher (totalling 15 A), AV equipment for boardroom (5 A). Server room with UPS (12 A continuous). Air conditioning units (per zone, totalling 35 A). Lighting (LED, 8 A total). What's the maximum demand?"
            whatToDo="Calculate per category. Desk loads at 50% diversity: 25 × 1.5 × 0.5 = 18.75 A average, 50% peak coincident = 18.75 A maximum. Printers / copiers: 4 × 10 × 0.4 = 16 A. Kitchen: 15 × 0.6 = 9 A. AV: 5 × 1.0 (boardroom in use) = 5 A. Server / UPS: 12 A continuous = 12 A. Air con: 35 × 1.0 (peak summer day) = 35 A. Lighting: 8 × 0.66 = 5.3 A. Total maximum demand: 18.75 + 16 + 9 + 5 + 12 + 35 + 5.3 = 101 A. Three-phase supply with ~35 A per phase after balancing — well within typical UK commercial three-phase 80-100 A per phase rating. Document each diversity assumption on the design sheet."
            whyItMatters="Commercial diversity is a different exercise from domestic. Office equipment loads, kitchen patterns, server-room continuous demand and air-con peak loads all behave differently. The OSG starting points are useful but the engineer's judgement and any available metering data inform the actual factors used. Document. Verify against measured demand once the install is in service. Adjust future designs based on observed behaviour."
          />

          <Scenario
            title="Domestic install with PV + battery storage and export limiting"
            situation="3-bed semi, single-phase 100 A supply. Existing diversified maximum demand 65 A. Customer adding 6 kWp solar PV with 10 kWh battery storage and a 5 kW hybrid inverter. DNO has limited the export to 3.68 kW (16 A) — the network in this area is constrained. The customer also wants a 7 kW EV charger added at the same time, with the intention of self-consuming PV / battery output to charge the car during off-peak hours."
            whatToDo="Three demand-direction questions need answering, not one. (1) What's the import maximum demand? Existing 65 A + EV 32 A = 97 A — within 100 A supply but only just; on a winter day with no PV contribution and the EV plugged in mid-evening, this is the binding case. (2) What's the export maximum? PV + battery can deliver up to 5 kW (~22 A) instantaneously, but the DNO export limit is 3.68 kW (16 A) — the inverter must be configured to enforce this, not just nominally programmed. (3) What's the on-site coincident demand when PV is generating? Mid-summer noon: PV producing 5 kW, battery charging if not full, EV charging from PV surplus, household baseload 1-2 kW. The cable from the inverter to the consumer unit sees the worst-case sum of import-direction and export-direction currents — sized for whichever is larger. Diversity does NOT apply between PV output and household import — they're different physical currents on the same conductor at different times. The export-limit enforcement is by the inverter's own control loop — a positive load-management measure that the design relies on. Document the inverter model, firmware version and export-limit configuration on the design sheet; Reg 722.311.201's general principle (automatic load disconnection counts where it's automatic and verifiable) applies by analogy to export limiting."
            whyItMatters="Prosumer installations are increasingly common and the diversity question gets multi-directional. The supply must cope with import maximum demand (Reg 313.1); the export must stay within the DNO's G99 / G98 limit (an export breach is a separate compliance failure, often with no DNO visibility until a network event surfaces it); on-site coincident demand from EV-charging-from-PV interacts with both. The qualified-spark approach: tabulate import demand and export demand separately, identify the binding case for each conductor and protective device, document the export-limit configuration as a positive design feature. Don't wave at 'diversity covers it' — the directions are different physical scenarios and need explicit treatment. Where the customer chooses a battery system without firmware-enforced export limit, the design must reduce inverter capacity to match the DNO limit instead — a hardware constraint replaces a firmware one."
          />

          <FAQ items={faqItems} />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="Margin, headroom and the 80% rule of thumb"
            plainEnglish="A maximum-demand figure that exactly equals the supply rating is not a comfortable design — there's no headroom for load growth, measurement uncertainty or unusual usage days. UK commercial design rules of thumb typically aim for maximum demand at 70-80% of supply rating where load growth is anticipated."
            onSite="On a 100 A single-phase domestic supply, a calculated maximum demand of 95 A is technically compliant with Reg 313.1 but operationally fragile — any unusual day (visitors with extra cooking, electric heater used in addition to heat pump, EV charging during evening peak) pushes total above the supply fuse rating and the cut-out blows. The customer's lived experience is 'intermittent power loss for no obvious reason' — a callout that's difficult to diagnose because the loop tests fine and no protective device shows tripped. Aim for ~80% loading at calculated maximum demand on domestic supplies; on commercial, the figure depends on anticipated growth (a tenanted office with stable headcount can sit closer to 85%; a growing manufacturing business should sit nearer 60% to allow expansion without supply upgrade). Document the headroom assumption — 'design loaded to 75% of supply rating to allow for anticipated PV / EV additions in next 5 years' is a perfectly defensible design note that turns into useful future-proofing if the customer comes back to add load."
          >
            <p>
              The Reg 311.1 calculation gives the maximum demand; the design choice is whether to
              accept that figure as final or build margin on top. BS 7671 doesn&apos;t prescribe a
              margin — it&apos;s an engineering judgement informed by the customer&apos;s likely
              load growth. Document the choice; revisit at the periodic inspection. Future expansion
              that would push demand past supply rating is the inspector&apos;s flag for a
              supply-upgrade conversation, not a non-compliance code in itself.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The maximum-demand calculation in 60 seconds"
            plainEnglish="(1) List every load with rated current. (2) Apply diversity factor per load type. (3) Sum the diversified currents — this is maximum demand. (4) Verify against supply rating. (5) Record on the cert."
            onSite="For domestic: use OSG App A as starting point; adapt for the specific household's behaviour. For commercial: use IET / CIBSE commercial guidance; engage an MEP designer for larger projects. For three-phase: tabulate by phase; balance at design time; size for worst-case phase. Always document the diversity assumptions on the design sheet."
          >
            <p>
              The discipline matters because the recorded maximum demand drives every subsequent
              decision — supply suitability, cable sizing, OPD selection, voltage drop. Get the
              maximum demand right and the rest of the design is straightforward; get it wrong and
              either the install is over-engineered (waste money) or under-engineered (won't cope).
              Both are real outcomes; the right answer is the realistic-peak figure backed by
              transparent assumptions.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Recording maximum demand on the cert"
            plainEnglish="The new A4 model EIC has explicit fields for maximum demand. Record the diversity-applied figure in amps (single-phase) or amps per phase (three-phase), plus kW or kVA for clarity. The design-sheet diversity calculation backs it up but doesn't replace the cert entry."
            onSite="Common errors to avoid: recording connected load instead of maximum demand (over-states the figure, makes the supply look inadequate when it isn't); recording nominal supply rating instead of actual demand (under-states the figure, gives no useful information to future inspectors); leaving the field blank (a documented departure from Reg 311.1 — never acceptable on a new install). The inspector's EICR check is whether the recorded maximum demand is reasonable for the installation as-found; gross discrepancies between recorded and observed demand prompt investigation. Where demand has grown since the original cert (typical on EV / heat-pump retrofits), the new cert records the new figure and the design sheet documents the basis."
          >
            <p>
              The audit-trail discipline is the same on every cert: record the figure, attach the
              design sheet that supports it, note any departure from OSG App A guidance with
              rationale. Five years later when the inspector returns for the EICR, the recorded
              figure is the benchmark against which observed demand is measured — and the design
              sheet explains why the original assumptions were what they were.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'Reg 311.1 mandates maximum-demand calculation for every installation. Reg 313.1 mandates supply suitability. Cert records the result.',
              "Connected load = sum of every load's rated current (theoretical worst case). Maximum demand = realistic peak coincident demand after diversity.",
              "OSG App A gives standard diversity factors for UK domestic / small commercial. Adapt to specific install based on customer's load behaviour.",
              'BS 7671 prohibits diversity as a substitute for load control or overload protection. Where actual load curtailment is required, use positive measures (load-shedding, demand-response).',
              "Three-phase: tabulate per phase, balance at design time, size for worst-case phase per Reg 311.1's reference to RMS line currents.",
              'EV chargers, heat pumps and similar sustained-rated loads typically use 100% diversity. Cookers, sockets, lighting use significantly less — OSG App A factors apply.',
              'Modern UK electrification often pushes existing 60-100 A single-phase supplies past their limit. DNO upgrade or positive load management — never fudge diversity.',
              'Honest diversity is household-specific — large families, full-time-occupied homes and overlapping evening-peak loads sit above the OSG average; the design figure must cover the realistic upper end, not the average.',
              'Commercial / workshop diversity is evidence-based where data exists (smart meter, manufacturer duty cycles, CIBSE figures). Document the source of every factor on the design sheet — it&apos;s the audit trail under EAWR 1989.',
              'Prosumer installs (PV + battery + EV) are multi-directional — tabulate import demand and export demand separately, size each conductor for whichever direction is larger, treat firmware-enforced export limits as positive load management per Reg 722.311.201&apos;s general principle.',
              'Reg 525.1 voltage-drop verification is the second filter — even where maximum demand fits the supply rating, a long final circuit at peak demand can fail the 3% / 5% / 8% voltage-drop limits. Both CCC and voltage drop must be satisfied.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 External influences
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module3Section2;
