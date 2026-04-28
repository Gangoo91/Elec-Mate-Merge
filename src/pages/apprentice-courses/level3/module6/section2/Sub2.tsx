/**
 * Module 6 · Section 2 · Subsection 2 — Diversity factors deep-dive
 * Maps to C&G 2365-03 / Unit 305 / LO2 / AC 2.3
 *
 * Layered depth: 2366-03 Unit 304 / AC 2.2; 5393-03 Unit 104 / AC 2.2
 *
 * OSG Table A1 entry-by-entry, GN1 Section 7 commercial categories,
 * coincidence factors, and the modern updates needed for heat pump
 * and EV-rich dwellings.
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
import useSEO from '@/hooks/useSEO';

const TITLE = 'Diversity factors deep-dive (2.2) | Level 3 Module 6.2.2 | Elec-Mate';
const DESCRIPTION =
  'Diversity factors entry-by-entry. OSG Table A1 dwelling categories, GN1 Section 7 commercial categories, coincidence factors at sub-main and origin, and modern updates for heat-pump and EV-rich dwellings.';

const checks = [
  {
    id: 'cooker-diversity-calc',
    question:
      'A 9 kW free-standing electric cooker (39 A nameplate at 230 V) on a circuit with an integrated 13 A cooker socket. Apply OSG Table A1 dwelling cooker diversity. What is Ib?',
    options: [
      '39 A (full nameplate).',
      '10 A + 30 percent of (39 - 10) + 5 A (cooker socket) = 10 + 8.7 + 5 = 23.7 A. Round up to 24 A. Specify 32 A breaker, 6 mm² T+E typical.',
      '15 A.',
      '100 A.',
    ],
    correctIndex: 1,
    explanation:
      "OSG Table A1 cooker diversity: first 10 A at full demand + 30 percent of remainder + 5 A for the integrated cooker socket if present. For a 9 kW cooker that gives 24 A. The 32 A B-curve breaker on 6 mm² T+E is the typical specification, well within the 30 A diversified demand. The cooker nameplate is misleading because the rings, oven and grill rarely all run at maximum simultaneously; the 30 percent factor reflects realistic kitchen behaviour.",
  },
  {
    id: 'office-socket-diversity',
    question:
      'An open-plan office floor has 60 desk positions, each with a 4-way socket strip plus desk lamp. The IET GN1 typical office socket diversity factor would be:',
    options: [
      '100 percent.',
      'Around 50-65 percent of nameplate aggregate, because not every desk is fully loaded simultaneously and modern office equipment (laptops, LED screens, low-power printers) pulls much less than the socket rating. GN1 has worked examples; the actual factor depends on the equipment mix and use pattern.',
      '20 percent.',
      'No diversity for socket outlets.',
    ],
    correctIndex: 1,
    explanation:
      "Office socket diversity is typically 50-65 percent for typical knowledge work — laptops at 30-65 W, monitors at 30-50 W, no printer per desk, occasional kettle. Heavy-use workshops or labs are higher; light-use boardrooms are lower. The number is based on equipment mix and use pattern, not just headcount. Cite the GN1 worked example or your own measured data on similar projects.",
  },
  {
    id: 'coincidence-factor',
    question:
      'A 12-dwelling apartment block has each dwelling assessed at 60 A diversified maximum demand. The sub-main coincidence factor for 12 dwellings (per IET GN1 typical) is approximately:',
    options: [
      '1.0 (no coincidence reduction).',
      'Around 0.5-0.6 — the realistic peak across 12 dwellings is about half the sum, because not all dwellings peak simultaneously.',
      '0.1.',
      '2.0.',
    ],
    correctIndex: 1,
    explanation:
      "Apartment-block coincidence factors decrease with the number of dwellings. Single dwelling = 1.0; 4-6 dwellings around 0.7; 10-15 dwellings around 0.5-0.6; 50+ dwellings around 0.4-0.5. So 12 dwellings at 60 A each gives sub-main Ib of around 12 x 60 x 0.55 = 396 A. Without the coincidence factor the calc would size the sub-main for 720 A — vast oversizing. The IET GN1 has tabulated coincidence factors; the figures shift with heat pump and EV penetration.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'OSG Table A1 dwelling diversity for an instantaneous shower is typically:',
    options: [
      '50 percent.',
      '100 percent — no diversity. The shower is a high-demand short-duration load that justifies design at full demand.',
      '25 percent.',
      'Not given in the OSG.',
    ],
    correctAnswer: 1,
    explanation:
      "Instantaneous showers are 100 percent demand circuits. The shower is on or off; it does not modulate, and when it is on it pulls full demand for the duration. Sizing on anything less risks tripping or cable overload. Same logic applies to immersion heaters under uncontrolled operation.",
  },
  {
    id: 2,
    question: 'A four-bed dwelling has two ring finals (kitchen and remainder of dwelling). OSG diversity for the second ring final is approximately:',
    options: [
      '100 percent.',
      'Around 40 percent of the nameplate of the second (smaller-use) ring, because the second ring rarely peaks at the same instant as the busier first ring.',
      '0 percent.',
      '30 A regardless.',
    ],
    correctAnswer: 1,
    explanation:
      "Domestic ring final diversity logic: largest (busiest) ring runs at high demand; subsequent rings at lower percentage because their peaks rarely coincide. The exact percentages in the current OSG vary by edition; the principle is the same. For a 4-bed dwelling the kitchen ring is typically the dominant one and the bedroom/lounge ring runs at much lower realistic demand simultaneously.",
  },
  {
    id: 3,
    question: 'For a heat pump in a domestic dwelling, the diversity assumption should be:',
    options: [
      'Same 30 percent as electric resistance heating.',
      '100 percent at full nameplate, because heat pumps run for many hours per day at high duty cycle, particularly during the heating season cold-snap morning and evening peaks. Manufacturer data may give a refined profile but defaulting to 100 percent is the safer design floor.',
      '0 percent.',
      'Same as a kettle.',
    ],
    correctAnswer: 1,
    explanation:
      "Heat pumps run for hours, not minutes. During cold-snap mornings the heat pump may run continuously at its rated output for the entire morning warm-up period (3-4 hours), often coinciding with shower use, kettle, EV charging and cooker. The diversity assumption that worked for short-duration immersion heating does not apply. Use 100 percent as the design floor; refine downward only with manufacturer-published duty-cycle data and peak demand evidence.",
  },
  {
    id: 4,
    question: 'On a small commercial fit-out (cafe, retail, office), where do diversity factors typically come from?',
    options: [
      'OSG Table A1.',
      'IET GN1 Section 7 — broader installation categories with worked examples for offices, retail, hospitality, education, healthcare and industrial.',
      'BS 7671 itself.',
      'Industry custom only.',
    ],
    correctAnswer: 1,
    explanation:
      "OSG Table A1 is the dwelling reference. For commercial work go to IET GN1 Section 7. The GN1 categories include office, retail, hospitality, education, healthcare, industrial, with worked examples per category for typical loads. Where the project type does not match a GN1 category exactly, pick the closest and document any adjustments.",
  },
  {
    id: 5,
    question: 'Coincidence factors at sub-main level for an apartment block:',
    options: [
      'Always 1.0.',
      'Decrease with the number of dwellings — typically 1.0 for single dwelling, 0.7 for 4-6 dwellings, 0.5-0.6 for 10-15, 0.4-0.5 for 50+. Reflects statistical smoothing of peaks across many users.',
      'Always 0.5 regardless.',
      'Increase with number of dwellings.',
    ],
    correctAnswer: 1,
    explanation:
      "Coincidence (or simultaneity) factors recognise that across a population of users, peaks do not align. The bigger the population, the smoother the aggregate peak. IET GN1 tabulates coincidence factors. The numbers are updating slowly to reflect heat pump and EV penetration — heat pump peaks on a cold morning are more correlated than traditional dwelling peaks.",
  },
  {
    id: 6,
    question: 'Modern dwelling load profile changes (heat pumps, EVs, batteries) require what to traditional diversity factors?',
    options: [
      'Nothing — the OSG values stand.',
      'Re-evaluation. Heat pumps run for longer (longer plateau, less peaky), EV chargers concentrate demand in specific hours (often peak time without smart control), batteries can shift demand. The combined effect is to flatten and broaden peaks but raise sustained demand. Traditional dwelling diversity may understate.',
      'Doubling all factors.',
      'Halving all factors.',
    ],
    correctAnswer: 1,
    explanation:
      "The traditional OSG dwelling diversity assumed gas heating, occasional electric resistance loads (shower, immersion, cooker, kettle) and no EV. A 2026 dwelling with heat pump + EV + battery has a fundamentally different load profile: longer-duration heat pump baseline, evening EV charging peak, possible battery export/charge cycles. BEAMA and the IET are updating guidance; designers should not rely solely on 1990s diversity numbers for 2026 designs.",
  },
  {
    id: 7,
    question: 'For an EV charger with OZEV-compliant smart functionality (load management), the design Ib can be:',
    options: [
      'Always full charger rating.',
      'Reduced to the load-managed throttle setpoint AT THE SUPPLY LEVEL only, with the failure-mode demand assessed per Reg 311.2 (A4:2026) — typically the EV charger reverts to a manufacturer fall-back rate (often a fixed reduced current).',
      'Zero (no demand).',
      'Half the rated current.',
    ],
    correctAnswer: 1,
    explanation:
      "Load-managed EV chargers throttle their charging current when total household demand exceeds a setpoint. The design can use the throttled rate at the supply level — but Reg 311.2 (A4:2026) requires the failure-mode assessment. If the load management fails, what does the charger draw? Typically a manufacturer fall-back (e.g. 16 A or 20 A fixed). Confirm the supply still survives the fall-back demand.",
  },
  {
    id: 8,
    question: 'On a hospitality fit-out (pub, restaurant, hotel), the diversity assumption for kitchen cooking equipment is typically:',
    options: [
      '100 percent of every appliance simultaneously.',
      '70-90 percent of cooking equipment aggregate (high coincidence at service times — multiple hobs, oven, grill running together at lunch and dinner peaks). Refrigeration is 100 percent (compressors cycle independently). Lighting is 100 percent for opening hours. EPOS / IT is low.',
      '30 percent for everything.',
      'No diversity for hospitality.',
    ],
    correctAnswer: 1,
    explanation:
      "Hospitality cooking has high coincidence at service times — multiple hobs, oven, grill, salamander, dishwasher all running together at lunch and dinner peaks. 70-90 percent of aggregate is realistic; some chains even design at 100 percent for the kitchen sub-main. Refrigeration is 100 percent (compressor-cycle independence). Lighting is 100 percent for opening hours. The diversity stack is very different from a dwelling.",
  },
];

const faqs = [
  {
    question: 'How do I get hold of the current OSG Table A1?',
    answer:
      "The IET On-Site Guide is published as a printed pocket book and as an e-book / digital subscription. The current edition aligns with BS 7671:2018+A4:2026. Table A1 is in the appendices at the back. For design work you typically have a printed copy on the desk and the digital copy searchable on a phone or tablet. The IET also publishes the Electrician\u2019s Guide to the Building Regulations as a companion. Avoid using older editions for current design work — diversity numbers do shift across editions.",
  },
  {
    question: 'Where is the GN1 Section 7 commercial diversity table?',
    answer:
      "IET Guidance Note 1 (Selection and Erection) Section 7 covers maximum demand and diversity for non-domestic installations. The current edition (aligned with BS 7671:2018+A4:2026) has worked examples for offices, retail, hospitality, education, healthcare, industrial, leisure and mixed-use. Each example walks through a representative load schedule and applies category-specific diversity factors. For unusual project types, GN1 also gives the principles for deriving your own factors.",
  },
  {
    question: 'How do I handle electric vehicle diversity on a multi-dwelling sub-main?',
    answer:
      "Multi-dwelling EV charging is one of the hardest diversity calls in modern apartment-block design. Options: (1) fixed allocation per dwelling (each dwelling gets an EV-ready CU way and a managed share of the building supply); (2) site-wide load management where the building energy management system (EMS) throttles all chargers to keep within the building supply rating; (3) DNO-managed connection where the DNO contractually limits the building supply during peak times. The IET\u2019s Code of Practice for EV Charging Equipment Installation (current edition) covers these options. Apartment blocks designed for EVs without site-wide load management often run into supply-rating problems within 3-5 years of occupation as EV penetration grows.",
  },
  {
    question: 'Can I apply diversity to motor circuits in industrial design?',
    answer:
      "Yes, but carefully. Motor circuits have high starting current (typically 6-8 times full-load current for direct-on-line, 1.5-3 times for soft-starts and inverters), so diversity must consider both running diversity (which motors run simultaneously?) and starting coincidence (would two large motors start at the same time?). For a small workshop the diversity assumption might be 100 percent of the largest motor + 50 percent of others (running) but ensure the supply can handle the starting transient of the largest motor on top of running others. For larger industrial installations, use sequential start sequencing to avoid concurrent starts.",
  },
  {
    question: 'What about diversity in a building with PV and battery?',
    answer:
      "PV and battery affect demand at the grid interface, not at the household level. A dwelling with 4 kWp PV may export 3-4 kW to the grid mid-day (negative net demand) but still draw full demand from the grid in the evening. The diversity calc for the supply is based on net grid demand worst-case: typically the evening peak when PV is generating zero and battery is depleted. PV does not reduce maximum demand at the design stage; battery can reduce evening peak if sized for the household load profile (typically 5-10 kWh battery). Reg 712 (PV) and emerging guidance on battery storage cover the technical specifications; the diversity calc must consider the worst-case grid draw, not the average.",
  },
  {
    question: 'How should I document my diversity assumptions on a small job?',
    answer:
      "Even on a domestic CU upgrade, a single half-page diversity table embedded in the design pack covers the requirement. Columns: load category, connected load (kW or A), diversity factor, source (OSG Table A1, GN1, manufacturer datasheet), resulting Ib. A simple spreadsheet does the job. The same template scales up to multi-DB commercial work — just more rows. The discipline matters more than the format. The diversity table is the page an inspector or future designer goes to first when auditing the calc.",
  },
];

export default function Sub2() {
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
            eyebrow="Module 6 · Section 2 · Subsection 2"
            title="Diversity factors — deep-dive"
            description="OSG Table A1 entry by entry. GN1 Section 7 commercial categories. Coincidence factors at sub-main and origin level. The modern updates needed for heat-pump-rich and EV-rich dwellings."
            tone="amber"
          />

          <TLDR
            points={[
              "OSG Table A1 covers typical dwellings with cooker, shower, immersion, ring final, radial, lighting, water heater, EV charger and heat pump entries. Each has a specific diversity formula. Verify against current OSG edition.",
              "IET GN1 Section 7 covers non-domestic installations — office, retail, hospitality, education, healthcare, industrial. Differentiated factors per category with worked examples.",
              "Coincidence factors at sub-main and origin smooth peaks across many circuits or many dwellings. Larger populations equal smoother aggregate. Heat pump and EV penetration is changing the smoothing — peaks are becoming more correlated, especially during cold mornings and evening EV charging hours.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply OSG Table A1 diversity formulas entry by entry to a dwelling load assessment — cooker, shower, immersion, ring final, radial, lighting, EV charger, heat pump.',
              'Apply IET GN1 Section 7 diversity factors to commercial design across office, retail, hospitality, education, healthcare and industrial categories.',
              'Use coincidence factors at sub-main and origin level for multi-circuit and multi-dwelling installations.',
              'Recognise where modern load profiles (heat pumps, EV chargers, batteries) require updated diversity assumptions and document the departure from traditional OSG defaults.',
              'Apply manufacturer-specific diversity data for special loads (heat pumps, EV chargers, induction motors, IT loads, welders, induction hobs).',
              'Document the full diversity calc on a discrete diversity table page in the design pack with source citations per entry.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="OSG Table A1 — entry by entry"
            plainEnglish="The dwelling go-to. Each load category has its own formula. Use the formula, document the source."
            onSite="The OSG values are conservative for traditional dwellings (gas heating, occasional electric loads) and may be unconservative for modern dwellings (heat pump + EV + battery). Read the current edition and adjust where needed."
          >
            <p>
              Representative OSG Table A1 entries (verify against the current OSG edition; numbers shift across editions):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting</strong> — 66 percent of total connected load (some editions allow 100 percent if all-LED low load).</li>
              <li><strong>Cooker</strong> — first 10 A at full demand + 30 percent of the remainder + 5 A for an integrated cooker socket.</li>
              <li><strong>Instantaneous water heater (shower)</strong> — 100 percent of largest + 100 percent of second + 25 percent of third and subsequent. (Multiple showers in a dwelling.)</li>
              <li><strong>Storage water heater (immersion)</strong> — 100 percent (uncontrolled), or 0 percent if fed from off-peak only with no overlap with peak demand.</li>
              <li><strong>Ring final</strong> — 100 percent of largest + 40 percent of second + 30 percent of subsequent (at typical 32 A nameplate, applied to actual diversified load).</li>
              <li><strong>Radial</strong> — depends on dedicated function; cooker-radial like cooker formula, dedicated appliance at 100 percent, general radial like ring final.</li>
              <li><strong>EV charger</strong> — 100 percent (no diversity) unless OZEV-compliant load-managed; with load management, the design can use the throttled rate.</li>
              <li><strong>Heat pump</strong> — typically 100 percent or per manufacturer data; modern guidance pushes toward 100 percent because of duty cycle.</li>
            </ul>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <LoadCalculator />
          </div>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>GN1 Section 7 — commercial diversity</ContentEyebrow>

          <ConceptBlock
            title="IET GN1 Section 7 — non-domestic categories"
            plainEnglish="Office, retail, hospitality, education, healthcare, industrial. Each has different load patterns, different diversity factors, different worked examples."
          >
            <p>
              Representative GN1 Section 7 commercial diversity (verify against current edition):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office</strong> — lighting 100 percent (work hours), socket outlets 50-65 percent (depending on equipment mix), HVAC mechanical 100 percent (sequenced or per BMS), lift 100 percent peak with start allowance, server rooms 100 percent (sized for IT load with cooling), kitchenettes 30-50 percent (occasional use).</li>
              <li><strong>Retail</strong> — lighting 100 percent (opening hours), refrigeration 100 percent (compressor cycle), display lighting 100 percent, EPOS 100 percent (active during opening), HVAC 100 percent, occasional special loads (hot beverage machines, signage) per nameplate.</li>
              <li><strong>Hospitality (pubs, restaurants, hotels)</strong> — kitchen cooking 70-90 percent (high coincidence at service), refrigeration 100 percent, lighting 100 percent (opening hours and overnight low-level), HVAC 100 percent, room socket outlets in hotels 30-50 percent (occupancy-dependent).</li>
              <li><strong>Education</strong> — classroom lighting 100 percent (school hours), socket outlets 30-50 percent (typical pupil use), specialist labs 100 percent (during use), kitchen 70-90 percent (lunch service peak), heating 100 percent.</li>
              <li><strong>Healthcare</strong> — life-safety circuits 100 percent (always), theatre lighting 100 percent (during use), patient bedside 50-75 percent (depending on dependency level), HVAC 100 percent, IT critical 100 percent.</li>
              <li><strong>Industrial</strong> — process equipment per process schedule (often 100 percent for sequenced loads, less for batched processes), motor circuits 100 percent of largest plus 50 percent of others (running diversity), lighting 100 percent (operating hours), welders 50-75 percent (intermittent).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Coincidence factors — multi-circuit, multi-dwelling</ContentEyebrow>

          <ConceptBlock
            title="Coincidence factors at sub-main and origin"
            plainEnglish="The bigger the population, the smoother the peak. Single dwelling = 1.0 coincidence. 50+ dwellings = around 0.4-0.5."
          >
            <p>
              Coincidence (or simultaneity) factors apply at sub-main and origin levels to recognise that not all circuits or dwellings peak simultaneously. Representative IET GN1 figures (verify against current edition):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single dwelling: 1.0.</li>
              <li>2-3 dwellings: 0.85-0.9.</li>
              <li>4-6 dwellings: 0.7-0.8.</li>
              <li>7-10 dwellings: 0.6-0.7.</li>
              <li>11-15 dwellings: 0.5-0.6.</li>
              <li>16-25 dwellings: 0.45-0.55.</li>
              <li>26-50 dwellings: 0.4-0.5.</li>
              <li>50+ dwellings: 0.4 typical floor.</li>
            </ul>
            <p>
              The coincidence factor is multiplied by the per-dwelling diversified maximum demand to give the sub-main Ib. Note: heat pump and EV penetration is making peaks more correlated — cold-morning heat pump peaks align across dwellings; evening EV charging peaks align across dwellings without smart control. Modern apartment-block design must apply higher coincidence factors than the traditional 1990s tables, or use site-wide load management to enforce diversity.
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
            source="BS 7671:2018+A4:2026 — Regulation 132.3 (Nature of demand)"
            clause="The number and type of circuits required for lighting, heating, power, control, signalling, communication and information technology, etc. shall be determined from knowledge of location of points of power demand; loads to be expected on the various circuits; daily and yearly variation of demand; any special conditions such as harmonics; requirements for control, signalling, information and communications technology; and anticipated future demand, if specified."
            meaning={
              <>
                Reg 132.3 makes the demand profile a discrete design consideration. Daily and yearly variation is the diversity input. Special conditions like harmonics matter for IT and inverter loads (PV, EV chargers, heat pump compressors) — they affect apparent power and may require sizing on apparent rather than active load. The L3 designer documents the demand profile assumptions in the design pack alongside the diversity factors.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.3."
          />

          <SectionRule />

          <ContentEyebrow>Modern updates — heat pumps, EVs, batteries</ContentEyebrow>

          <ConceptBlock
            title="Why modern dwelling diversity is harder"
            plainEnglish="The traditional dwelling load was a few short peaks. The modern dwelling has long heat-pump plateaus, evening EV concentration and battery cycling. Old diversity factors understate; new factors are still emerging."
          >
            <p>
              Three changes are reshaping dwelling load profiles:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat pumps</strong> run for 6-12 hours per day during heating season at 2-6 kW depending on size and ambient. Cold-morning warm-up can run continuously at full load for 3-4 hours, often coinciding with shower, kettle, EV charging, cooker. The traditional 30-percent-of-cooker diversity is roughly compatible; the heat pump itself defaults to 100 percent.</li>
              <li><strong>EV chargers</strong> concentrate demand into specific hours (often 18:00-22:00 evening peak) without smart control. With OZEV-compliant load management, demand can be shifted to off-peak (00:00-05:00) or modulated to keep household within a setpoint.</li>
              <li><strong>Batteries</strong> can reduce peak grid demand (discharge during evening peak) if sized for the household profile, but increase overnight grid demand (off-peak charging). Net effect on supply sizing depends on battery size and use pattern.</li>
            </ul>
            <p>
              The L3 designer should treat traditional OSG diversity as a starting floor for typical dwellings and apply project-specific adjustments where heat pumps, EVs and batteries materially change the profile. BEAMA, the IET, and DNO emerging guidance (UK Power Networks Electric Nation reports, Network Innovation Allowance projects) are slowly updating tables; expect material changes through 2026-2028.
            </p>
          </ConceptBlock>

          <Scenario
            title="Multi-dwelling EV-ready apartment block"
            situation={
              <>
                You are designing the supply for a 24-dwelling apartment block, mix of 1-bed and 2-bed flats. Each dwelling has gas heating (existing), an EV-ready CU way for future EV charger (7 kW), no installed EV at handover. The developer wants the supply sized so that 50 percent of dwellings can install EV chargers within 5 years without further upgrade.
              </>
            }
            whatToDo={
              <>
                Per-dwelling diversified demand (without EV): 1-bed flats ~30 A, 2-bed flats ~45 A; weighted average across the 24 mix = ~38 A. Apply IET GN1 coincidence factor for 24 dwellings without EV: ~0.5. Sub-main Ib without EV = 24 x 38 x 0.5 = 456 A. With 50 percent EV penetration (12 dwellings with 7 kW EV chargers, all OZEV-compliant load-managed at site level), additional EV demand at sub-main = 12 x 32 A x 0.55 (EV coincidence factor higher than dwelling base because of evening peak alignment) = ~211 A. Total sub-main Ib = 456 + 211 = 667 A. Round to 800 A three-phase service. Specify site-wide load management EMS that throttles EV chargers to keep total building demand below 800 A; per-dwelling EV throttle setpoint (e.g. 3 kW per dwelling at peak when EMS detects building approaching limit). Document the EMS failure-mode behaviour per Reg 311.2 (A4:2026).
              </>
            }
            whyItMatters={
              <>
                Without the EV provision, the building would size at 456 A and the developer saves £15-25k on the DNO connection. Five years later when 50 percent of residents install EV chargers, the building hits supply rating problems — repeated trips during evening peak. Retrofit upgrade costs £40-80k plus disruption. Designing for the end state up front, with site-wide load management to enforce diversity, costs ~£20k more at design but avoids the £40-80k retrofit cost. This is the kind of forward-looking diversity work the L3 design role is built for.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Applying dwelling OSG diversity to a HMO or apartment block sub-main"
            whatHappens={
              <>
                A designer applies OSG Table A1 dwelling diversity per-dwelling, then sums the per-dwelling diversified demand without applying the coincidence factor at sub-main. The sub-main is sized for the sum (much too large) when the coincidence factor would have shrunk it by 40-50 percent. The supply order is much larger than needed; the customer pays for the difference.
              </>
            }
            doInstead={
              <>
                Diversity stacks. Apply OSG dwelling diversity per dwelling to get per-dwelling Ib; then apply the IET GN1 coincidence factor for the number of dwellings to get sub-main Ib; then apply the appropriate coincidence factor at origin if multiple sub-mains feed the building. Document each level on the diversity calc page.
              </>
            }
          />

          <CommonMistake
            title="Using 1990s OSG numbers on a 2026 heat-pump dwelling"
            whatHappens={
              <>
                A designer specifies 60 A as the diversified peak for a heat-pump-and-EV dwelling using the traditional OSG dwelling formula. The actual peak (heat pump cold-morning + EV charging + shower + cooker) is 95 A. The 100 A supply trips on a cold winter morning. The designer is asked why.
              </>
            }
            doInstead={
              <>
                Treat heat pump and EV as 100 percent demand items. Apply traditional OSG diversity to the rest of the dwelling (cooker, ring finals, lighting, immersion). Sum the heat pump (full nameplate), EV (full or load-managed setpoint), and the diversified rest. For a 4-bed dwelling with 8 kW heat pump + 7 kW EV the diversified peak is typically 90-110 A — at or above the 100 A standard service. Either upgrade to 125 A, use site/dwelling load management, or apply for three-phase. Document the calc.
              </>
            }
          />

          <ConceptBlock
            title="Maximum-demand worked example — 4-bed family home with EV and heat pump"
            plainEnglish="Take a typical 4-bed family home with an 8 kW air-source heat pump, a 7 kW EV charger, a 32 A cooker, two 3 kW immersions, two ring finals, four lighting circuits and assorted small loads. Connected total is roughly 25-30 kW. Apply OSG diversity to the conventional loads, treat the heat pump and the EV charger at full nameplate (because they realistically run together on a winter evening), and sum. Result: a maximum demand around 22-26 kW or 95-110 A on single-phase. The standard 100 A DNO service is right at the edge."
            onSite="Document each input, each diversity factor, the source of each, and the resulting demand. The DNO service capacity is the binding constraint — exceed it and you need either three-phase, a supply upgrade, or enforced load management. Recording the calculation matters because the inspector five years later (and the next designer ten years later) needs to understand how the design hits or misses the supply ceiling."
          >
            <p>The worked example calculation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat pump 8 kW @ 100% = 8 kW (35 A on single-phase 230 V).</li>
              <li>EV charger 7 kW @ 100% = 7 kW (30 A) — or load-managed setpoint where reliably enforced.</li>
              <li>Cooker 12 kW connected — first 10 A + 30% of remainder = ~25 A (~5.7 kW).</li>
              <li>Immersions 2 × 3 kW @ 100% = 6 kW (26 A) — water heating attracts no diversity.</li>
              <li>Ring finals + lighting + small loads — ~3-4 kW after diversity.</li>
              <li><strong>Total maximum demand: approximately 25 kW / 108 A on single-phase</strong> — at or just above the 100 A service limit.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ADMD — After Diversity Maximum Demand for development sizing"
            plainEnglish="When a developer specifies a new housing scheme, a network designer or DNO needs an After Diversity Maximum Demand (ADMD) figure per dwelling — typically expressed in kVA per house. The DNO uses ADMD to size the LV cable, transformer and link box. Historic ADMD figures (1.5-2 kVA per house) reflected gas-heated, low-EV stock; modern ADMD for full-electrification estates is rising fast and the network design has to match. The L3 designer rarely sets ADMD directly but should recognise the term."
            onSite="Energy Networks Association EREC P28 and the DNO design manuals carry the live ADMD tables. A typical 2026 single-dwelling ADMD on a new estate with 100 percent EV plus heat pump might be 5-8 kVA per dwelling, against 1.5-2 kVA on the older base. The diversity logic is the same — coincidence across many dwellings smooths the peak — but the per-dwelling base is much higher. Underestimate ADMD and the new estate's transformer trips on cold-snap evenings within five years of occupation."
          >
            <p>
              How ADMD differs from single-property maximum demand:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single property MD</strong> — uses OSG / GN1 diversity to combine
                circuits within one dwelling. Coincidence factor for one dwelling is 1.0.
              </li>
              <li>
                <strong>ADMD</strong> — uses statistical coincidence across the dwelling
                population to derive a per-dwelling figure that reflects how unlikely it
                is that all houses peak at the same instant.
              </li>
              <li>
                <strong>Network design driver</strong> — DNO sizes the LV main and the
                transformer on (ADMD per house) × (number of houses). Peak diversity
                between houses falls as the population grows; 50+ dwellings on one
                transformer might use 0.4-0.5 coincidence.
              </li>
              <li>
                <strong>Why it matters at L3</strong> — when contributing to a new
                housing development load assessment for the developer, your figures feed
                the DNO's network design. Underestimate the per-house demand and the
                whole estate's network is undersized.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CT vs whole-current metering — meter sizing on bigger services"
            plainEnglish="Single-phase domestic services use whole-current metering — the meter sees every amp directly. Above roughly 100 A per phase or 60 kW, services move to CT (current transformer) metering — the actual conductors pass through CTs and the meter reads the CT secondary. The maximum-demand calc determines whether whole-current or CT metering applies, and the meter operator (MOP) installs accordingly."
            onSite="On larger commercial / industrial designs, the design pack flags 'CT metering required' if the diversified Ib at the supply origin exceeds the whole-current limit (typically 100 A single-phase, 100 A per phase three-phase). The MOP needs CT positions, ratio (e.g. 200/5 A or 400/5 A), accuracy class (typically 0.5 or 0.5S for billing), and an MID-class meter. Designing without CT space at the meter cabinet means a rebuild when the half-hourly meter goes in."
          >
            <p>
              Practical implications of crossing the whole-current threshold:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Meter cabinet size</strong> — CT metering needs space for the CTs
                in the bus chamber plus the meter, voltage tap, and test block.
                Specify the cabinet at design stage.
              </li>
              <li>
                <strong>CT ratio sizing</strong> — pick a ratio with margin above the
                expected diversified peak; common ratios 100/5, 200/5, 400/5, 800/5.
                Under-ratio CTs saturate; over-ratio CTs lose accuracy at low load.
              </li>
              <li>
                <strong>Half-hourly metering</strong> — every site over 100 kW peak goes
                onto half-hourly automatically; sites between 70-100 kW often opt in for
                better tariff visibility.
              </li>
              <li>
                <strong>Sealing and ownership</strong> — CTs and meter are MOP-owned;
                contractor cannot break the seals once commissioned. Any later change
                triggers a MOP visit.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Future-proof margin — designing for the 10-year load growth"
            plainEnglish="Maximum demand on a 2026 install is not the maximum demand the install will see in 2036. EV adoption is rising, heat pumps are gradually replacing gas, battery storage is becoming common. A design that is 90 percent of supply capacity at handover has no headroom for the customer's next upgrade. Sensible designs leave 20-30 percent margin where the supply allows."
            onSite="On a domestic CU swap design, ask the customer the 'in the next ten years' question — heat pump? second EV? home battery? PV upsize? Each of those adds a meaningful load. Sizing the new CU and the supply with that growth in mind is cheap at install time and expensive to retrofit. On commercial fit-outs, the same logic applies — extra circuit ways for the next-bay tenant, spare capacity at the supply origin for the next mezzanine sublet."
          >
            <p>
              Common future-proof line items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Spare ways at the CU</strong> — fit a CU with two or three more
                ways than the current circuit count needs. Cheap insurance against the
                next addition.
              </li>
              <li>
                <strong>Bonded earth for outbuildings</strong> — install bonding at first
                fix even if the outbuilding is not yet electrified. Pulls in much harder
                later.
              </li>
              <li>
                <strong>Conduit or duct routes</strong> — first fix to garage / garden
                room / EV bay. The cost of an empty conduit at first fix is a fraction
                of the cost of chasing walls later.
              </li>
              <li>
                <strong>Three-phase consideration</strong> — for any property near the
                100 A single-phase limit, raise the three-phase question with the DNO at
                the supply review. Cheaper to upgrade once than twice.
              </li>
              <li>
                <strong>PV / battery readiness</strong> — leave a labelled spare way and
                an empty conduit run to the planned inverter location even if the
                customer is not buying PV today.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation)"
            clause={
              <>
                Every installation shall be divided into circuits, as necessary, to: (a) avoid
                danger and minimize inconvenience in the event of a fault; (b) facilitate safe
                inspection, testing and maintenance; (c) take account of hazards that may arise
                from the failure of a single circuit such as a lighting circuit.
              </>
            }
            meaning={
              <>
                Diversity reduces the maximum demand calculation but does not relax circuit
                division rules. Even after applying diversity the installation must still be
                split into circuits in accordance with Reg 314.1 — heat pump on its own
                circuit, EV charger on its own circuit, cooker on its own, ring finals
                separate from lighting, and so on. Diversity is a sizing tool, not a way to
                merge loads onto fewer circuits.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iii) (maximum allowable current)"
            clause={
              <>
                The documentation shall include maximum current allowable. Designers shall
                calculate and record the maximum permissible current capacity for the supply
                and protective devices as part of supply characteristics.
              </>
            }
            meaning={
              <>
                Recording the maximum demand calculation against the maximum allowable supply
                current is a regulatory requirement, not a courtesy. Reg 132.2(c)(iii) sits
                under the Reg 132.13 design-documentation framework — the calculation lives in
                the design pack permanently and travels with the install through commissioning
                into the customer file.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(iii) — verbatim from published facets."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "OSG Table A1 covers typical dwelling diversity entry by entry — cooker, shower, immersion, ring final, radial, lighting, EV charger, heat pump. Verify against the current OSG edition; numbers shift.",
              "IET GN1 Section 7 covers non-domestic diversity by category — office, retail, hospitality, education, healthcare, industrial. Worked examples per category.",
              "Coincidence factors at sub-main and origin smooth peaks across many circuits or dwellings. Single dwelling = 1.0; 50+ dwellings around 0.4-0.5. Apply the right coincidence factor for the population size.",
              "Heat pumps default to 100 percent design demand because of long duty cycles. EV chargers default to 100 percent unless OZEV-compliant load-managed. Document the load-management failure-mode behaviour per Reg 311.2.",
              "Modern dwelling load profiles (heat pump + EV + battery) make peaks more correlated and longer in duration. Traditional 1990s OSG numbers may understate peak demand for a 2026 dwelling.",
              "Apartment-block EV charging requires site-wide load management to enforce diversity. Without it, evening peak demand outgrows the supply within 3-5 years of EV penetration reaching ~50 percent.",
              "Reg 311.2 (A4:2026) requires the design to assess maximum demand under all foreseeable conditions including load-management failure. Document the fall-back behaviour and confirm the supply survives.",
              "Document the full diversity calc as a discrete diversity table page in the design pack — load category, connected load, diversity factor, source citation, resulting Ib. The calc page is the most-audited part of the pack.",
            ]}
          />

          <Quiz title="Diversity factors deep-dive — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 Maximum demand fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Domestic load assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
