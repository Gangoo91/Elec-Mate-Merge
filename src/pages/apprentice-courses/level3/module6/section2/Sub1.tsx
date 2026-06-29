/**
 * Module 6 · Section 2 · Subsection 1 — Maximum demand fundamentals
 * Maps to C&G 2365-03 / Unit 305 / LO2 / AC 2.1, 2.2
 *
 * Layered depth: 2366-03 Unit 304 / AC 2.1; 5393-03 Unit 104 / AC 2.1
 *
 * Connected load vs maximum demand. The Reg 311 assessment.
 * Why diversity exists, where it comes from and how the L3 designer
 * uses it on the design pack.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { LoadCalculator } from '@/components/apprentice-courses/LoadCalculator';
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
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Maximum demand fundamentals (2.1) | Level 3 Module 6.2.1 | Elec-Mate';
const DESCRIPTION =
  'Connected load vs maximum demand. The Reg 311 assessment, why diversity exists, where the diversity factors come from, and how to use them on the design pack.';

const checks = [
  {
    id: 'connected-vs-demand',
    question:
      'A three-bed dwelling has the following nameplate connected loads: 9.5 kW shower, 7 kW cooker, 3 kW immersion heater, two 32 A ring finals (assume 7.36 kW each at full nameplate), 1.6 kW lighting, 7 kW EV charger. What is the connected load and the typical maximum demand at 230 V single-phase?',
    options: [
      'Connected = 42.8 kW (186 A); Max demand = around 70 A after applying typical IET OSG Table A1 dwelling diversity (load-management EV reduces further).',
      'Connected = 42.8 kW (186 A); Max demand = 186 A, because diversity may not be applied to dwellings on a single 100 A service.',
      'Connected = 70 A; Max demand = 186 A, because diversity always increases the figure that cables must be sized against.',
      'Connected = 186 A; Max demand = 186 A, since every load is assumed to run at full nameplate simultaneously.',
    ],
    correctIndex: 0,
    explanation:
      "Connected load = sum of nameplate ratings = 42.8 kW = 186 A at 230 V. Without diversity, the supply would need to be 200 A — way beyond a typical 100 A domestic service. Apply OSG Table A1 typical dwelling diversity: 100 percent of largest cooking load + 30 percent of remainder; full shower (no diversity); 30 percent of largest ring final + 40 percent of remainder; immersion 100 percent if uncontrolled; 100 percent EV (or load-managed via OZEV-compliant charger to share the supply). Result is typically around 60-75 A after diversity — comfortably within a 100 A service. The number that matters for cable and device sizing is the maximum demand, not the connected load.",
  },
  {
    id: 'diversity-source',
    question:
      'Where do the diversity factors used on a design pack legitimately come from?',
    options: [
      'BS 7671 Appendix 4, which publishes a single mandatory diversity factor of 0.6 for all domestic and commercial installations.',
      'The DNO connection agreement, which fixes the diversity factor for every installation fed from that substation.',
      'The IET On-Site Guide and Guidance Note 1, manufacturer data for special loads, and project-specific measurement on existing installations.',
      'The manufacturer of the consumer unit, who specifies the diversity factor that must be used for any board they supply.',
    ],
    correctIndex: 2,
    explanation:
      "BS 7671 does not give numerical diversity factors — it requires the designer to apply them but leaves the source open. The IET OSG Table A1 is the recognised dwelling reference. IET GN1 Section 7 covers broader installation types (offices, retail, industrial). Manufacturer data is essential for special loads (heat pumps, EV chargers, induction hobs, IT loads with high crest factor). Project-specific data (utility meter records over 12 months) trumps the tables for an existing installation. Document the source on every diversity assumption.",
  },
  {
    id: 'design-current-source',
    question:
      'The Ib (design current) on a final circuit is the:',
    options: [
      'Rated current of the protective device protecting the circuit, selected before any load is calculated.',
      'Current-carrying capacity of the chosen cable after all correction factors have been applied.',
      'Connected load of every appliance on the circuit summed at full nameplate, before any diversity is applied.',
      'Maximum demand current expected on the circuit after diversity has been applied.',
    ],
    correctIndex: 3,
    explanation:
      "Ib is the design current — the maximum demand expected on the circuit after diversity. Reg 433.1.1 stacks: Ib (load) less than or equal to In (device rating) less than or equal to Iz (cable CCC). Confusing Ib with the connected load oversizes the device and cable; confusing it with In undersizes them. Always derive Ib from the diversity calc and document it on the design pack.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 Reg 311.1 requires the designer to:',
    options: [
      'Size every cable at full connected load first, then apply diversity only to the final supply tails.',
      'Determine the maximum demand of the installation, having due regard to diversity, before sizing cables and protective devices.',
      'Select the protective device rating before assessing the load, then choose a cable to match the device.',
      'Confirm the prospective fault current at the origin before any assessment of demand is carried out.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 311.1 explicitly calls for assessment of maximum demand WITH diversity. The connected load is almost always larger than realistic peak. Diversity factors reduce connected load to a defensible peak; that peak is the design current Ib that drives every cable and device size downstream.",
  },
  {
    id: 2,
    question: 'Why does diversity exist as a design concept?',
    options: [
      'Because cable manufacturers oversize their conductors, so a reduction factor brings the rating back to the true value.',
      'Because the supply voltage sags under load, so demand must be discounted to reflect the lower delivered power.',
      'Because not every appliance runs at full nameplate load simultaneously — the realistic peak demand is materially lower than the sum of nameplate ratings, and supply infrastructure is sized for the realistic peak.',
      'Because protective devices are rated for short-term overload, so the design current can safely exceed the nameplate sum.',
    ],
    correctAnswer: 2,
    explanation:
      "Diversity reflects statistical reality. A dwelling does not run shower, cooker, immersion, washing machine, dishwasher, EV charger and heat pump at full load all at once. The peak demand is typically 30-50 percent of the nameplate sum for dwellings, 40-70 percent for typical commercial. Diversity factors codify this for design use.",
  },
  {
    id: 3,
    question: 'A typical IET OSG Table A1 diversity entry for a domestic ring final says:',
    options: [
      '100 percent of every ring final added together, because socket circuits are always assessed at full demand.',
      '50 percent of every ring final, applied uniformly regardless of how many rings the dwelling has.',
      '30 percent of the largest ring final and 0 percent of the rest, because only one ring is ever in use at a time.',
      '100 percent of the largest ring final plus a reduced percentage of any remaining rings.',
    ],
    correctAnswer: 3,
    explanation:
      "Domestic ring final diversity is typically: largest at full demand; subsequent rings at lower percentage. The exact percentages have changed across OSG editions; check the current OSG. The principle: realistic load on multiple rings is highly correlated only on the busiest ring at peak, while others run at much lower demand simultaneously.",
  },
  {
    id: 4,
    question: 'For a domestic cooker circuit, OSG diversity typically allows:',
    options: [
      'First 10 A at full demand, plus 30 percent of the remaining nameplate, plus 5 A for an integrated cooker socket.',
      'Full nameplate current with no diversity, because a cooker can theoretically run every element at once.',
      '50 percent of the nameplate flat rate, applied to every cooking appliance regardless of rating.',
      'First 5 A at full demand plus 10 percent of the remainder, with no allowance for an integrated socket.',
    ],
    correctAnswer: 0,
    explanation:
      "Cooker diversity is one of the OSG’s most-used entries because cooker nameplates are large but actual peak draw (all rings + oven + grill) rarely happens. The 10 A + 30 percent + 5 A formula reflects realistic kitchen behaviour. Verify against the current OSG edition for exact wording.",
  },
  {
    id: 5,
    question: 'Diversity factors for an EV charger should:',
    options: [
      'Default to 30 percent diversity for a single domestic EV charger because charging is assumed to spread evenly across the night.',
      'Default to 100 percent (no diversity) because charging often coincides with peak evening demand, recovering diversity only via a load-managed charger.',
      'Default to 0 percent at design stage because a smart charger always defers charging to off-peak hours automatically.',
      'Default to 66 percent, the same factor BS 7671 applies to domestic lighting circuits.',
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers should default to 100 percent demand because owners often plug in at exactly peak time (early evening). The way to recover diversity is through a load-managed charger (OZEV-compliant smart functionality) that throttles down when total household demand exceeds a setpoint — typically 80-90 percent of the supply rating. The 2018 EV smart charge points regulations require this functionality on new domestic chargers.",
  },
  {
    id: 6,
    question: 'For a small commercial office, IET GN1 typically gives:',
    options: [
      'A single flat diversity factor of 60 percent applied to the whole office load, the same as for a dwelling.',
      'No diversity at all, because commercial premises must always be designed at full connected load.',
      'Differentiated factors per load type — full demand on lighting and lift, reduced on socket outlets, and an IT factor reflecting crest factor.',
      'A fixed 40 percent on every circuit, taken directly from the domestic ring final entry in OSG Table A1.',
    ],
    correctAnswer: 2,
    explanation:
      "Commercial diversity is more nuanced than domestic. Lighting tends to be on at full demand for the working day. Office socket outlets typically peak at 50-75 percent because not every desk is fully loaded simultaneously. Lifts can be sized at 100 percent peak (call coincidence) or with start-current allowance. IT crest factor (modern PSUs are typically 1.4-1.6) means apparent load may be higher than calculated active load — size for the apparent value.",
  },
  {
    id: 7,
    question: 'When you apply diversity, the design current Ib at the supply is:',
    options: [
      'The arithmetic sum of every final-circuit Ib, because diversity is applied only at the final-circuit level and never re-applied higher up.',
      'The rating of the main switch, which fixes the design current at the origin regardless of the loads downstream.',
      'The sum of the final-circuit In values (protective device ratings) rather than the load currents.',
      'The diversified maximum demand at the origin, typically less than the sum of final-circuit Ib values because they do not all peak at once.',
    ],
    correctAnswer: 3,
    explanation:
      "Diversity applies at multiple levels. Final circuit Ib is the diversified peak on that circuit. Sub-main Ib is the diversified peak across the circuits it feeds. Origin Ib is the diversified peak across all sub-mains. At each level the diversity factor is typically lower than the sum below it — this is statistical coincidence working at scale.",
  },
  {
    id: 8,
    question: 'Documenting the diversity assumptions in the design pack should:',
    options: [
      'Be a discrete page showing each load category, its connected load, the diversity factor and its source, and the resulting design current Ib.',
      'Be a single headline figure for the whole installation with no breakdown, to keep the design pack concise.',
      'Be kept only in the designer’s own spreadsheet and recalled verbally if an inspector queries the supply size.',
      'Be limited to the final design current Ib alone, since the diversity factors used are commercially confidential.',
    ],
    correctAnswer: 0,
    explanation:
      "The diversity calc is the most-audited part of the design pack because it is where most installation oversize (waste) and undersize (failure) errors live. A discrete page makes it easy to audit. Show category, connected load, diversity factor, source citation, and resulting Ib. The same page lives at supply level, sub-main level and final-circuit level.",
  },
];

const faqs = [
  {
    question: 'Why does BS 7671 not give a single diversity table?',
    answer:
      "Diversity is statistical and depends on use pattern, geography, climate, and load mix — none of which are universal. A diversity table that fits a typical dwelling in southern England may overstate the demand in northern Scotland (more electric heating) or understate it in a heavy-IT office. BS 7671 leaves the diversity decision to the designer with the requirement that it be reasonable. The IET supplements this with the OSG and GN1 tables as the recognised reference. Other countries handle this similarly — e.g. NEC Article 220 in the US has detailed but optional diversity provisions; AS/NZS 3000 in Australia has different defaults.",
  },
  {
    question: 'How do I document a diversity assumption that conflicts with the OSG?',
    answer:
      "If you have a defensible reason to depart from the OSG default — perhaps utility meter data over 12 months for an existing installation, or manufacturer-specific load data for a heat pump — document it clearly: cite the source data, explain the basis for the departure, and record it in the design pack with the reasoning. The departure must be defensible to a competent peer reviewer, not just to you. “Our typical demand for this build type is X kVA per dwelling unit” is fine if you have the data; “I think it will be smaller” is not.",
  },
  {
    question: 'What diversity should I apply to a future EV charger that may or may not be installed?',
    answer:
      "If the EV charger is not installed at handover but the cable and CU way are reserved, you can choose: (1) Design for the future EV load at full demand and accept the larger supply / cable now, OR (2) Design for the current installed load only and document the future EV load and any required supply upgrade as a known constraint that the customer accepts. Most professional designers go with option 1 if the supply has headroom (cheaper to install once) and option 2 with explicit future-state documentation if the supply is at the limit. Either way the design pack records the decision so the next contractor sees the full plan.",
  },
  {
    question: 'How does load profile shape change with heat pumps and EVs?',
    answer:
      "Heat pumps run for many more hours per day than electric resistance heating (longer duration, lower instantaneous demand, but higher daily kWh). EV chargers concentrate demand into specific hours (evening, overnight). The combination shifts dwelling load from short peaks to longer plateaus, with higher day-time and overnight baseline. Diversity factors that assume short-duration peaks need updating. The 2024-2025 industry consensus (BEAMA, ENA, IET emerging guidance) is that diversity for heat pump + EV households can be 70-90 percent of the sum of those loads, NOT the traditional 30-50 percent of nameplate dwelling loads. The L3 designer should not rely solely on the 1990s OSG numbers for a 2026 dwelling design.",
  },
  {
    question: 'For a sub-main feeding a row of identical dwellings, what diversity applies?',
    answer:
      "Apartment / housing-block sub-main diversity is typically lower than for a single dwelling because the statistical coincidence smooths demand across many users. A useful working method: per-dwelling demand multiplied by a coincidence factor that reduces with the number of dwellings (typical IET GN1 coincidence factors range from 1.0 for a single dwelling to around 0.4-0.5 for 50+ dwellings). Manufacturer-specific diversity is published by some apartment-block design tools. Always document the source. For HRRBs the BSR may want to see the diversity calc explicitly justified.",
  },
  {
    question: 'How do I check my diversity assumption against reality?',
    answer:
      "On existing installations, request a 12-month meter half-hour data export from the customer’s energy supplier (smart meter data). The peak half-hour reading is your real-world maximum demand. Compare against your design assumption. On new builds, the only way to validate is post-handover — check 6-12 months after occupation and revise your standard diversity assumptions for similar future projects if the data shows you were materially out. Most designers iterate their diversity factors based on a small portfolio of post-occupancy data; the designers with the best diversity discipline build accurate but lean designs that win on margin.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 1"
            title="Maximum demand fundamentals"
            description="Connected load vs maximum demand. The Reg 311 assessment. Why diversity exists, where the factors come from, and how the L3 designer uses them to size every cable, every device and every supply on the design pack."
            tone="amber"
          />

          <TLDR
            points={[
              "Connected load is the sum of nameplate ratings; maximum demand is the realistic peak after applying diversity. BS 7671 Reg 311.1 requires you to assess the latter, not the former, before sizing anything.",
              "Diversity factors come from the IET On-Site Guide Table A1 (typical dwelling), IET GN1 Section 7 (broader installations), manufacturer data for special loads, and project-specific measurement on existing installations. BS 7671 itself does not give a single table.",
              "Modern dwelling load profiles are changing — heat pumps run for longer (lower peak, higher daily kWh), EV chargers concentrate demand into specific hours. The 1990s OSG diversity numbers may understate peak demand for a 2026 dwelling. Use load-managed EV chargers and document the source of every diversity factor.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish connected load from maximum demand and explain why diversity is the bridge between them.',
              'Apply the BS 7671 Reg 311.1 assessment requirement to a domestic CU upgrade and to a small commercial fit-out.',
              'Cite the recognised sources of diversity factors (OSG Table A1, GN1 Section 7, manufacturer data, project-specific measurement) and choose the right source for the load type.',
              'Calculate Ib (design current) for a final circuit, sub-main and the supply origin, applying diversity at each level.',
              'Document the diversity assumptions in a discrete diversity calculation page in the design pack with source citations.',
              'Recognise where modern load profiles (heat pumps, EV chargers, batteries, PV) require diversity factors different from traditional OSG defaults and justify the departure.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Connected load vs maximum demand — the bridge is diversity"
            plainEnglish="Add up every nameplate. That is connected load. Multiply by realistic diversity factors. That is maximum demand. The cable and device get sized for maximum demand."
            onSite="The most common mistake on small commercial work is to size the supply for the connected load without applying diversity. The result is a 200 A service when 80 A would have been ample — and the customer pays for the difference."
          >
            <p>
              The starting point of every load assessment is the connected load — the sum of nameplate ratings of every fixed appliance and every socket-outlet position on the installation. For a typical three-bed dwelling the connected load adds up like this:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>9.5 kW shower (electric instantaneous).</li>
              <li>7 kW cooker (free-standing electric).</li>
              <li>3 kW immersion heater (storage cylinder).</li>
              <li>Two 32 A ring finals at full nameplate (7.36 kW each = 14.7 kW).</li>
              <li>1.6 kW lighting (16 fittings at 100 W average).</li>
              <li>7 kW EV charger (single-phase 32 A).</li>
            </ul>
            <p>
              Total connected load = 42.8 kW = 186 A at 230 V. Without diversity the supply would need to be 200 A and three-phase. Apply OSG Table A1 diversity (cooker 10 A + 30 percent of remainder + 5 A; ring finals 30 percent of largest + 40 percent of subsequent; full demand on shower, immersion, EV) and the realistic peak comes down to around 60-75 A — comfortably within a standard 100 A single-phase service.
            </p>
            <p>
              The number that matters for cable, device and supply sizing is the maximum demand, not the connected load. This is the single most important conceptual move at the start of any L3 design.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <LoadCalculator />
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.1 (Maximum demand and diversity)"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. When determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            meaning={
              <>
                Reg 311.1 explicitly authorises (and effectively requires) the designer to use diversity. The wording “may be taken into account” sounds permissive but in practice not applying diversity for typical installations would oversize the supply, the cables and the devices to the point of being unreasonable — failing the implicit Reg 132 requirement that the design be appropriate. Document the diversity factors you use and their source.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Regulation 311.1. See also Appendix 1 (British Standards) and the IET On-Site Guide Table A1."
          />

          <ConsumerUnit />

          <SectionRule />

          <ContentEyebrow>Where diversity factors come from</ContentEyebrow>

          <ConceptBlock
            title="The four legitimate sources of diversity factors"
            plainEnglish="OSG Table A1 for typical dwellings. GN1 Section 7 for everything else. Manufacturer data for special loads. Project-specific measurement when you have it."
          >
            <p>
              <strong>1. IET On-Site Guide Table A1.</strong> The recognised reference for typical dwellings. Covers cooker, shower, immersion heater, ring final, radial, lighting, EV charger and heat pump diversity. Read the current OSG edition; the numbers shift as load patterns change.
            </p>
            <p>
              <strong>2. IET Guidance Note 1 Section 7.</strong> The recognised reference for broader installation types — offices, retail, hospitality, educational, industrial. Differentiated factors per load category.
            </p>
            <p>
              <strong>3. Manufacturer-specific data.</strong> Essential for special loads where industry tables do not capture the realistic profile. Heat pumps, EV chargers (especially load-managed OZEV-compliant chargers), induction hobs (high transient demand), data-centre IT loads (high crest factor and PSU oversizing), induction motor starters, welders.
            </p>
            <p>
              <strong>4. Project-specific measurement data.</strong> For an existing installation being upgraded or modified, the customer’s 12-month half-hour smart meter data export is the gold standard for actual peak demand. The peak half-hour figure is the realistic maximum demand. Beats every table.
            </p>
            <p>
              Document the source on every diversity assumption. “OSG Table A1, 2024 edition, ring final entry” is a defensible citation; “typical figure” is not.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked example — domestic CU upgrade</ContentEyebrow>

          <ConceptBlock
            title="Worked example — three-bed dwelling with EV"
            plainEnglish="Walk through the diversity calc for a typical 2026 dwelling design. The numbers tell you whether the existing supply is enough."
          >
            <p>
              Same dwelling as above. Apply OSG Table A1 (representative figures — verify against current OSG edition):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Shower 9.5 kW:</strong> 100 percent demand = 9.5 kW = 41.3 A.</li>
              <li><strong>Cooker 7 kW (30 A nameplate):</strong> 10 A + 30 percent of (30 - 10) + 5 A (cooker socket if integrated) = 10 + 6 + 5 = 21 A maximum demand.</li>
              <li><strong>Immersion 3 kW:</strong> 100 percent (uncontrolled) = 13 A.</li>
              <li><strong>Ring final 1 (kitchen):</strong> 100 percent of the largest assumed connected use, typically taken at 32 A diversified to a working figure of around 20 A average peak.</li>
              <li><strong>Ring final 2 (general):</strong> 40 percent of the second ring, typically 13 A.</li>
              <li><strong>Lighting 1.6 kW:</strong> 100 percent (full demand for evening peak) = 7 A.</li>
              <li><strong>EV charger 7 kW:</strong> 100 percent (no traditional diversity) = 30 A; OR load-managed (OZEV-compliant) to 13-20 A as a controllable share of the supply.</li>
            </ul>
            <p>
              Sum of diversified demand: 41.3 + 21 + 13 + 20 + 13 + 7 + 30 = 145 A peak (no EV management) or around 128 A (with EV management to 20 A share). Both exceed a standard 100 A service.
            </p>
            <p>
              Resolution: load-manage the EV charger to throttle to 16 A or 20 A when household demand exceeds 80 A — keeps the supply within 100 A. Alternative: apply for DNO supply upgrade to 100 A three-phase or 125 A single-phase. The diversity calc tells the customer which option is needed at design stage, not after the EV is installed and the trip-out problems start.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.3(c) (Daily and yearly variation of demand)"
            clause="Designers shall account for daily and yearly variation of demand when determining circuit numbers and types. Seasonal or diurnal variations that affect loading and diversity shall be included in the design calculations and documented."
            meaning={
              <>
                Load-managed EV chargers, heat pumps and battery storage all change the daily and yearly load profile in ways traditional diversity factors do not capture. Reg 132.3(c) requires the designer to record those daily and yearly variations as part of the design — including how a load-management scheme behaves at peak window, off-peak window and on a cold-snap morning. Record the load-managed setpoint AND the worst-case fall-back demand (manufacturer datasheet) so the supply margin is honest.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.3(c)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Design current Ib at every level</ContentEyebrow>

          <ConceptBlock
            title="Ib at final-circuit, sub-main and supply origin"
            plainEnglish="Diversity stacks. Each level has its own design current. Final circuit Ib is what each circuit really pulls; sub-main Ib is the diversified peak across the circuits it feeds; origin Ib is the diversified peak across all sub-mains."
          >
            <p>
              On a multi-DB installation, diversity applies at three levels:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Final circuit Ib</strong> — the diversified peak demand on a single final circuit. Drives the breaker rating and the cable size for that circuit per Reg 433.1.1.</li>
              <li><strong>Sub-main Ib</strong> — the diversified peak across all final circuits on a sub-DB. Always less than the sum of final circuit Ib values, because not all final circuits peak simultaneously.</li>
              <li><strong>Origin Ib</strong> — the diversified peak across all sub-mains and any direct origin circuits. Always less than the sum of sub-main Ib values.</li>
            </ul>
            <p>
              The diversity factor at each successive level is typically lower than at the level below — coincidence smooths demand at scale. IET GN1 has worked examples for sub-main and origin diversity stacks for offices, retail, hospitality and industrial. The L3 designer documents each level on the design pack.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <Scenario
            title="Cafe fit-out — applying diversity at three levels"
            situation={
              <>
                You are designing the supply, sub-main and final circuits for a 220 m² cafe with two DBs (DB-K kitchen, DB-F front-of-house). Loads include three induction hobs (7 kW each), 5 kW combination oven, 3 kW dishwasher, 8 kW refrigeration (compressor sum), 18 lighting circuits, 12 socket outlets in three rings, EPOS, fire alarm, AV, external sign 2 kW.
              </>
            }
            whatToDo={
              <>
                Final-circuit Ib by category. Cooking circuits: induction hobs run with high coincidence at lunch service, manufacturer typical diversity around 70 percent across three hobs (because not all four rings on every hob run at full demand) gives 21 kW out of 21 kW connected =  91 A at 230 V or 31 A per phase if balanced across three phases. Refrigeration: 100 percent demand because compressors cycle independently with low coincidence between fridges = 35 A. Ring finals: 30 percent + 40 percent + 30 percent of subsequents at typical EPOS and small appliance use = around 25 A peak across three rings. Lighting: 100 percent demand at evening operation = 18 A. AV / EPOS / fire alarm: low load, individual circuit Ib less than 6 A each.\n\nSub-main Ib for DB-K: cooking 91 A + refrigeration 35 A + dishwasher 13 A + 1 ring 11 A + lighting 6 A. Sum = 156 A, but apply 0.85 sub-main coincidence factor (not all categories peak at the same instant) = 133 A. Sub-main Ib for DB-F: 2 rings 14 A + lighting 12 A + AV / EPOS 8 A + sign 9 A = 43 A.\n\nOrigin Ib: 133 + 43 = 176 A. Apply 0.9 origin coincidence factor (DB-K and DB-F peak slightly offset — kitchen at lunch service, front-of-house all afternoon) = 158 A. Round up to 160 A. Need 60 A or 80 A per phase three-phase service.
              </>
            }
            whyItMatters={
              <>
                Without the level-by-level diversity stack, the designer might add nameplate kW and conclude the cafe needs a 250 A supply. The actual realistic peak is 160 A. The DNO upgrade cost difference between a 100 A and a 200 A three-phase service is in the £1000-2000 range; between 200 A and 400 A often £5000-15000+. The diversity calc done properly is one of the highest-leverage design activities you do — it directly determines the supply order and the customer’s connection cost.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Sizing on connected load, not maximum demand"
            whatHappens={
              <>
                A junior designer adds the kW of every nameplate on the spec, divides by 230, and proposes a 200 A single-phase service for a typical 4-bed dwelling. The DNO laughs (no such thing exists), the customer is quoted £8000 for a three-phase upgrade that is not actually needed, the project either stalls or gets re-engineered at the designer’s cost.
              </>
            }
            doInstead={
              <>
                Always apply OSG Table A1 (or GN1 Section 7) diversity to derive the realistic maximum demand. Show the diversity calc as a discrete page in the design pack with source citations. The number you carry forward to cable and device sizing is the diversified peak, not the connected load. For modern dwellings with heat pumps and EVs, layer in load-managed EV charging or supply upgrade as needed — but never propose a supply that is not justified by the calc.
              </>
            }
          />

          <CommonMistake
            title="Forgetting to assess load management failure mode"
            whatHappens={
              <>
                A designer relies on a load-managed EV charger to keep the dwelling within a 100 A supply. The charger throttles correctly under normal operation. But the LM unit fails one cold morning and the EV draws full 32 A while the heat pump and shower are running. The 100 A service blows the cut-out fuse; family is without supply for 4 hours mid-winter.
              </>
            }
            doInstead={
              <>
                Reg 311.2 (A4:2026) explicitly requires the design to assess maximum demand under all foreseeable operating conditions including load-management failure. Document the EV charger fall-back behaviour (manufacturer datasheet); confirm the supply survives the worst-case fall-back. Where the worst case exceeds the supply rating, either upgrade the supply or specify additional protection (e.g. supply main with fast-trip during overload).
              </>
            }
          />

          <ConceptBlock
            title="Diversity factors — what reduces the maximum demand calculation"
            plainEnglish="Diversity is the principle that not every connected load runs at full power simultaneously. A 7 kW EV charger plus a 32 A cooker plus two 3 kW immersions plus general lighting do not realistically all draw full load at the same instant. Codes of Practice (the IET On-Site Guide / Guidance Note 1, plus manufacturer guidance) publish diversity factors that allow the designer to reduce the connected-load total to a realistic maximum demand. Smart load-management on EV chargers and heat pumps shifts the diversity assumption further — but only where it is reliably enforced."
            onSite="Apply diversity from a recognised source (OSG / GN1 / manufacturer instructions). Document the diversity factor used and the rationale on the design pack. The next designer or inspector reading the pack should be able to repeat your calculation. Diversity is not a guess — it is a published method applied to the specific install."
          >
            <p>Common starting points for diversity:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cooker — 10 A plus 30% of remaining nameplate plus 5 A if a socket is integral.</li>
              <li>Lighting — 66% of total connected load on a domestic install.</li>
              <li>Sockets — 100% of largest circuit, 40% of remaining circuits.</li>
              <li>Water heating (immersion) — full nameplate, no diversity.</li>
              <li>EV charger — full nameplate where load management is not enforced; reduced where load management is reliably specified.</li>
              <li>Heat pump — full nameplate plus 20% margin for defrost cycles.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 311.1 and 311.2 — the maximum-demand assessment regulations"
            plainEnglish="Reg 311.1 in BS 7671 requires the designer to assess the maximum demand of every installation. Reg 311.2 (significantly amended in A4:2026) requires the assessment to consider all foreseeable conditions including the failure of any load-management or load-shedding scheme. Together these are the regulations that drive the diversity calc page on every design pack — they make it a regulatory deliverable, not just an engineering nicety."
            onSite="The 311.2 amendment matters for modern installations with dynamic load management — OZEV-compliant EV chargers that throttle when total demand rises, smart heat pumps that defer hot water charging, smart battery systems that import to support evening peak. The designer must ask: what happens if the load management fails? If the supply survives, the design holds. If the supply trips on the failure mode, the load management cannot be relied on alone — the design needs a hard upper limit (smaller charger, smaller heat pump, supply upgrade)."
          >
            <p>
              Reg 311 framework on a typical heat-pump plus EV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 311.1 assessment</strong> — calculate maximum
                demand including the heat pump and EV charger.
              </li>
              <li>
                <strong>Reg 311.2 foreseeable conditions</strong> —
                consider operating with load management active, then
                consider load management failed.
              </li>
              <li>
                <strong>Load management active</strong> — OZEV charger
                throttles to keep total under 100 A; design holds.
              </li>
              <li>
                <strong>Load management failed</strong> — charger draws
                full 32 A; total demand exceeds 100 A; supply trips.
              </li>
              <li>
                <strong>Design fix</strong> — smaller fixed-rating EV
                charger (16 A or 20 A), three-phase supply, supply
                upgrade, or hard-wired interlock. Document the chosen
                strategy.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Where the diversity numbers come from — OSG, GN1, manufacturer data"
            plainEnglish="The IET On-Site Guide Table A1 carries domestic diversity factors. IET Guidance Note 1 Chapter 7 carries broader (commercial, industrial, mixed-use) diversity. Manufacturers publish diversity data for specific products — VSDs, heat pumps, EV chargers. Project-specific measurement (PQ logger, half-hourly meter data) gives empirical diversity for existing installations. Each source has different evidential weight; the designer cites the source on the calc page."
            onSite="On a domestic CU swap design, OSG Table A1 is the default reference. On a small-commercial fit-out, GN1 Chapter 7 is the default. On an industrial site with VSDs and welders, manufacturer data plus measurement is the default. Mixing sources is fine where the install crosses categories; cite each. The L3 designer's calc page reads as a citation list, with each diversity factor traced back to a published source."
          >
            <p>
              Source preference by installation type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>OSG Table A1</strong> — single dwelling, typical
                domestic loads.
              </li>
              <li>
                <strong>GN1 Chapter 7</strong> — commercial, hospitality,
                education, healthcare, mixed-use.
              </li>
              <li>
                <strong>Manufacturer data</strong> — specific high-impact
                loads (heat pumps, EV chargers, VSDs, welders, large
                motors).
              </li>
              <li>
                <strong>Project-specific measurement</strong> — existing
                installations with half-hourly metering or PQ logger
                data.
              </li>
              <li>
                <strong>Conservative default</strong> — when no source
                applies, treat the load at full nameplate; the resulting
                design will be safe but oversized.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Connected load schedule — the input to every diversity calc"
            plainEnglish="The connected load schedule is the table that lists every load on the installation, its nameplate rating, the circuit it sits on, and any load-management arrangement applied. It is the input to the diversity calc — without it, the diversity calc has nowhere to start. The L3 apprentice's contribution to the design pack often starts with the connected load schedule, because it is the most data-entry-heavy part of the pack."
            onSite="On a typical 4-bed dwelling the connected load schedule has 15-25 line items; on a small commercial fit-out 50-100; on an industrial site many hundreds. Each item: load description, nameplate kW or A, voltage, single or three-phase, circuit allocation, control strategy (always-on, switched, time-clocked, smart-load-managed). The schedule lives on the design pack alongside the single-line diagram and the diversity calc; updates to any one of the three should propagate to the others."
          >
            <p>
              Connected load schedule columns:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load description</strong> — plain English
                identifier (kitchen ring, EV charger, heat pump
                outdoor unit).
              </li>
              <li>
                <strong>Nameplate rating</strong> — kW and / or A from
                the device data sheet; not the customer's casual
                estimate.
              </li>
              <li>
                <strong>Voltage</strong> — 230 V single-phase or 400 V
                three-phase; matters for the per-phase load total.
              </li>
              <li>
                <strong>Circuit allocation</strong> — which final circuit
                the load is on; matters for the diversity factor at the
                circuit level vs the sub-main level.
              </li>
              <li>
                <strong>Control strategy</strong> — always-on, switched,
                time-clocked, smart-load-managed; matters for the
                diversity assumption applied.
              </li>
              <li>
                <strong>Source citation</strong> — where the load data
                came from (data sheet, customer brief, measurement);
                evidence trail.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation into circuits)"
            clause={
              <>
                Every installation shall be divided into circuits, as necessary, to: (a) avoid
                danger and minimize inconvenience in the event of a fault; (b) facilitate safe
                inspection, testing and maintenance; (c) take account of hazards that may arise
                from the failure of a single circuit such as a lighting circuit; (d) reduce the
                possibility of unwanted tripping of RCDs due to excessive protective conductor
                (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic
                disturbances; (f) prevent the indirect energizing of a circuit intended to be
                isolated.
              </>
            }
            meaning={
              <>
                Maximum demand drives circuit count, and circuit count is governed by Reg
                314.1. The six bullets shape the design — splitting circuits to limit
                fault-impact, segregating PE currents to keep RCDs from nuisance-tripping,
                separating life-safety circuits from non-essential loads, and so on. Maximum
                demand alone is not a sufficient design — Reg 314.1 sets the framework that
                turns the demand into a circuit schedule.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Connected load is the sum of nameplate ratings; maximum demand is the realistic peak after diversity. BS 7671 Reg 311.1 requires you to assess the latter before sizing anything.",
              "Diversity factors come from IET OSG Table A1 (typical dwelling), IET GN1 Section 7 (broader installations), manufacturer data (special loads), and project-specific measurement (existing installations). BS 7671 itself does not give a single table.",
              "Ib (design current) is the maximum demand at each level — final circuit, sub-main, supply origin. Diversity stacks at each successive level, with lower coincidence factors as you aggregate.",
              "Document the diversity assumptions on a discrete diversity calculation page in the design pack with source citations. This is the most-audited part of the design pack.",
              "Modern dwelling load profiles are changing — heat pumps run for longer (lower peak, higher daily kWh); EV chargers concentrate demand into specific hours. The 1990s OSG numbers may understate peak demand for a 2026 dwelling.",
              "EV charger diversity defaults to 100 percent (no diversity) because charging often coincides with peak domestic demand. Use load-managed (OZEV-compliant) chargers to recover diversity through throttling when total household demand exceeds a setpoint.",
              "Reg 311.2 (A4:2026) requires the design to assess maximum demand under all foreseeable conditions including load-management failure mode. Document the fall-back behaviour and confirm the supply survives.",
              "On multi-DB installations, apply diversity at three levels: final circuit, sub-main and origin. Each level has its own coincidence factor, typically lower than the level below.",
            ]}
          />

          <Quiz title="Maximum demand fundamentals — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section landing
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2 — Load assessment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Diversity factors deep-dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
