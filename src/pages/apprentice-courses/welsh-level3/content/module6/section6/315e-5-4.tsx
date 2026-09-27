/**
 * Ported from the English course, combining:
 *   level3/module6/section2/Sub1.tsx
 *   level3/module6/section2/Sub2.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { LoadCalculator } from '@/components/apprentice-courses/LoadCalculator';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
      'Connected load = sum of nameplate ratings = 42.8 kW = 186 A at 230 V. Without diversity, the supply would need to be 200 A — way beyond a typical 100 A domestic service. Apply OSG Table A1 typical dwelling diversity: 100 percent of largest cooking load + 30 percent of remainder; full shower (no diversity); 30 percent of largest ring final + 40 percent of remainder; immersion 100 percent if uncontrolled; 100 percent EV (or load-managed via OZEV-compliant charger to share the supply). Result is typically around 60-75 A after diversity — comfortably within a 100 A service. The number that matters for cable and device sizing is the maximum demand, not the connected load.',
  },
  {
    id: 'diversity-source',
    question: 'Where do the diversity factors used on a design pack legitimately come from?',
    options: [
      'BS 7671 Appendix 4, which publishes a single mandatory diversity factor of 0.6 for all domestic and commercial installations.',
      'The DNO connection agreement, which fixes the diversity factor for every installation fed from that substation.',
      'The IET On-Site Guide and Guidance Note 1, manufacturer data for special loads, and project-specific measurement on existing installations.',
      'The manufacturer of the consumer unit, who specifies the diversity factor that must be used for any board they supply.',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 does not give numerical diversity factors — it requires the designer to apply them but leaves the source open. The IET OSG Table A1 is the recognised dwelling reference. IET GN1 Section 7 covers broader installation types (offices, retail, industrial). Manufacturer data is essential for special loads (heat pumps, EV chargers, induction hobs, IT loads with high crest factor). Project-specific data (utility meter records over 12 months) trumps the tables for an existing installation. Document the source on every diversity assumption.',
  },
  {
    id: 'design-current-source',
    question: 'The Ib (design current) on a final circuit is the:',
    options: [
      'Rated current of the protective device protecting the circuit, selected before any load is calculated.',
      'Current-carrying capacity of the chosen cable after all correction factors have been applied.',
      'Connected load of every appliance on the circuit summed at full nameplate, before any diversity is applied.',
      'Maximum demand current expected on the circuit after diversity has been applied.',
    ],
    correctIndex: 3,
    explanation:
      'Ib is the design current — the maximum demand expected on the circuit after diversity. Reg 433.1.1 stacks: Ib (load) less than or equal to In (device rating) less than or equal to Iz (cable CCC). Confusing Ib with the connected load oversizes the device and cable; confusing it with In undersizes them. Always derive Ib from the diversity calc and document it on the design pack.',
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
      'Reg 311.1 explicitly calls for assessment of maximum demand WITH diversity. The connected load is almost always larger than realistic peak. Diversity factors reduce connected load to a defensible peak; that peak is the design current Ib that drives every cable and device size downstream.',
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
      'Diversity reflects statistical reality. A dwelling does not run shower, cooker, immersion, washing machine, dishwasher, EV charger and heat pump at full load all at once. The peak demand is typically 30-50 percent of the nameplate sum for dwellings, 40-70 percent for typical commercial. Diversity factors codify this for design use.',
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
      'Domestic ring final diversity is typically: largest at full demand; subsequent rings at lower percentage. The exact percentages have changed across OSG editions; check the current OSG. The principle: realistic load on multiple rings is highly correlated only on the busiest ring at peak, while others run at much lower demand simultaneously.',
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
      'Cooker diversity is one of the OSG’s most-used entries because cooker nameplates are large but actual peak draw (all rings + oven + grill) rarely happens. The 10 A + 30 percent + 5 A formula reflects realistic kitchen behaviour. Verify against the current OSG edition for exact wording.',
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
      'EV chargers should default to 100 percent demand because owners often plug in at exactly peak time (early evening). The way to recover diversity is through a load-managed charger (OZEV-compliant smart functionality) that throttles down when total household demand exceeds a setpoint — typically 80-90 percent of the supply rating. The 2018 EV smart charge points regulations require this functionality on new domestic chargers.',
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
      'Commercial diversity is more nuanced than domestic. Lighting tends to be on at full demand for the working day. Office socket outlets typically peak at 50-75 percent because not every desk is fully loaded simultaneously. Lifts can be sized at 100 percent peak (call coincidence) or with start-current allowance. IT crest factor (modern PSUs are typically 1.4-1.6) means apparent load may be higher than calculated active load — size for the apparent value.',
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
      'Diversity applies at multiple levels. Final circuit Ib is the diversified peak on that circuit. Sub-main Ib is the diversified peak across the circuits it feeds. Origin Ib is the diversified peak across all sub-mains. At each level the diversity factor is typically lower than the sum below it — this is statistical coincidence working at scale.',
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
      'The diversity calc is the most-audited part of the design pack because it is where most installation oversize (waste) and undersize (failure) errors live. A discrete page makes it easy to audit. Show category, connected load, diversity factor, source citation, and resulting Ib. The same page lives at supply level, sub-main level and final-circuit level.',
  },
];

const faqs = [
  {
    question: 'Why does BS 7671 not give a single diversity table?',
    answer:
      'Diversity is statistical and depends on use pattern, geography, climate, and load mix — none of which are universal. A diversity table that fits a typical dwelling in southern England may overstate the demand in northern Scotland (more electric heating) or understate it in a heavy-IT office. BS 7671 leaves the diversity decision to the designer with the requirement that it be reasonable. The IET supplements this with the OSG and GN1 tables as the recognised reference. Other countries handle this similarly — e.g. NEC Article 220 in the US has detailed but optional diversity provisions; AS/NZS 3000 in Australia has different defaults.',
  },
  {
    question: 'How do I document a diversity assumption that conflicts with the OSG?',
    answer:
      'If you have a defensible reason to depart from the OSG default — perhaps utility meter data over 12 months for an existing installation, or manufacturer-specific load data for a heat pump — document it clearly: cite the source data, explain the basis for the departure, and record it in the design pack with the reasoning. The departure must be defensible to a competent peer reviewer, not just to you. “Our typical demand for this build type is X kVA per dwelling unit” is fine if you have the data; “I think it will be smaller” is not.',
  },
  {
    question:
      'What diversity should I apply to a future EV charger that may or may not be installed?',
    answer:
      'If the EV charger is not installed at handover but the cable and CU way are reserved, you can choose: (1) Design for the future EV load at full demand and accept the larger supply / cable now, OR (2) Design for the current installed load only and document the future EV load and any required supply upgrade as a known constraint that the customer accepts. Most professional designers go with option 1 if the supply has headroom (cheaper to install once) and option 2 with explicit future-state documentation if the supply is at the limit. Either way the design pack records the decision so the next contractor sees the full plan.',
  },
  {
    question: 'How does load profile shape change with heat pumps and EVs?',
    answer:
      'Heat pumps run for many more hours per day than electric resistance heating (longer duration, lower instantaneous demand, but higher daily kWh). EV chargers concentrate demand into specific hours (evening, overnight). The combination shifts dwelling load from short peaks to longer plateaus, with higher day-time and overnight baseline. Diversity factors that assume short-duration peaks need updating. The 2024-2025 industry consensus (BEAMA, ENA, IET emerging guidance) is that diversity for heat pump + EV households can be 70-90 percent of the sum of those loads, NOT the traditional 30-50 percent of nameplate dwelling loads. The L3 designer should not rely solely on the 1990s OSG numbers for a 2026 dwelling design.',
  },
  {
    question: 'For a sub-main feeding a row of identical dwellings, what diversity applies?',
    answer:
      'Apartment / housing-block sub-main diversity is typically lower than for a single dwelling because the statistical coincidence smooths demand across many users. A useful working method: per-dwelling demand multiplied by a coincidence factor that reduces with the number of dwellings (typical IET GN1 coincidence factors range from 1.0 for a single dwelling to around 0.4-0.5 for 50+ dwellings). Manufacturer-specific diversity is published by some apartment-block design tools. Always document the source. For HRRBs the BSR may want to see the diversity calc explicitly justified.',
  },
  {
    question: 'How do I check my diversity assumption against reality?',
    answer:
      'On existing installations, request a 12-month meter half-hour data export from the customer’s energy supplier (smart meter data). The peak half-hour reading is your real-world maximum demand. Compare against your design assumption. On new builds, the only way to validate is post-handover — check 6-12 months after occupation and revise your standard diversity assumptions for similar future projects if the data shows you were materially out. Most designers iterate their diversity factors based on a small portfolio of post-occupancy data; the designers with the best diversity discipline build accurate but lean designs that win on margin.',
  },
];

const checks2 = [
  {
    id: 'cooker-diversity-calc',
    question:
      'A 9 kW free-standing electric cooker (39 A nameplate at 230 V) on a circuit with an integrated 13 A cooker socket. Apply OSG Table A1 dwelling cooker diversity. What is Ib?',
    options: [
      '39 A — the full nameplate current, taking no diversity on the cooker.',
      '10 A + 30 percent of 39 + 5 A = 10 + 11.7 + 5 = 26.7 A, on the whole nameplate.',
      '10 A + 30 percent of (39 - 10) + 5 A = 10 + 8.7 + 5 = 23.7 A, rounded to 24 A.',
      '30 percent of 39 A + 5 A = 11.7 + 5 = 16.7 A, omitting the first 10 A.',
    ],
    correctIndex: 2,
    explanation:
      'OSG Table A1 cooker diversity: first 10 A at full demand + 30 percent of remainder + 5 A for the integrated cooker socket if present. For a 9 kW cooker that gives 24 A — a 32 A B-curve breaker on 6 mm² T+E is the typical specification, well within the 30 A diversified demand. The cooker nameplate is misleading because the rings, oven and grill rarely all run at maximum simultaneously; the 30 percent factor reflects realistic kitchen behaviour.',
  },
  {
    id: 'office-socket-diversity',
    question:
      'An open-plan office floor has 60 desk positions, each with a 4-way socket strip plus desk lamp. The IET GN1 typical office socket diversity factor would be:',
    options: [
      'Exactly 100 percent of nameplate aggregate, with every position fully loaded at once.',
      'Around 10 percent of nameplate aggregate, treating equipment as mostly in standby.',
      'A flat 40 percent, taken from the domestic ring final entry in the On-Site Guide.',
      'Around 50-65 percent of nameplate aggregate, with desks peaking at different times.',
    ],
    correctIndex: 3,
    explanation:
      'Office socket diversity is typically 50-65 percent for typical knowledge work — laptops at 30-65 W, monitors at 30-50 W, no printer per desk, occasional kettle. Heavy-use workshops or labs are higher; light-use boardrooms are lower. The number is based on equipment mix and use pattern, not just headcount. Cite the GN1 worked example or your own measured data on similar projects.',
  },
  {
    id: 'coincidence-factor',
    question:
      'A 12-dwelling apartment block has each dwelling assessed at 60 A diversified maximum demand. The sub-main coincidence factor for 12 dwellings (per IET GN1 typical) is approximately:',
    options: [
      'Around 1.0 — the realistic peak across 12 dwellings equals the sum, because flats in one block all peak together.',
      'Around 0.5-0.6 — the realistic peak across 12 dwellings is about half the sum, because not all dwellings peak simultaneously.',
      'Around 0.1 — the realistic peak is only a tenth of the sum, because at most one dwelling ever draws full demand.',
      'Around 1.5 — the factor rises above 1.0 to allow for inrush when several dwellings switch on together.',
    ],
    correctIndex: 1,
    explanation:
      'Apartment-block coincidence factors decrease with the number of dwellings. Single dwelling = 1.0; 4-6 dwellings around 0.7; 10-15 dwellings around 0.5-0.6; 50+ dwellings around 0.4-0.5. So 12 dwellings at 60 A each gives sub-main Ib of around 12 x 60 x 0.55 = 396 A. Without the coincidence factor the calc would size the sub-main for 720 A — vast oversizing. The IET GN1 has tabulated coincidence factors; the figures shift with heat pump and EV penetration.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'OSG Table A1 dwelling diversity for an instantaneous shower is typically:',
    options: [
      '40 percent — the same factor applied to the second ring final in a dwelling.',
      '100 percent — no diversity, because the shower is a high-demand load designed at full demand.',
      '66 percent — matching the diversity applied to domestic lighting circuits.',
      '50 percent — half demand, because a shower is only ever used for short periods each day.',
    ],
    correctAnswer: 1,
    explanation:
      'Instantaneous showers are 100 percent demand circuits. The shower is on or off; it does not modulate, and when it is on it pulls full demand for the duration. Sizing on anything less risks tripping or cable overload. Same logic applies to immersion heaters under uncontrolled operation.',
  },
  {
    id: 2,
    question:
      'A four-bed dwelling has two ring finals (kitchen and remainder of dwelling). OSG diversity for the second ring final is approximately:',
    options: [
      'Around 100 percent of the second ring, because every ring final must be assessed at full demand.',
      'Around 66 percent of the second ring, the same factor used for domestic lighting.',
      'Around 40 percent of the second ring, because it rarely peaks at the same instant as the busier first ring.',
      'Around 10 percent of the second ring, because the busiest ring carries almost all the load.',
    ],
    correctAnswer: 2,
    explanation:
      'Domestic ring final diversity logic: largest (busiest) ring runs at high demand; subsequent rings at lower percentage because their peaks rarely coincide. The exact percentages in the current OSG vary by edition; the principle is the same. For a 4-bed dwelling the kitchen ring is typically the dominant one and the bedroom/lounge ring runs at much lower realistic demand simultaneously.',
  },
  {
    id: 3,
    question: 'For a heat pump in a domestic dwelling, the diversity assumption should be:',
    options: [
      '40 percent of nameplate, the same factor applied to a second ring final.',
      '66 percent of nameplate, matching the diversity allowed for domestic lighting.',
      '30 percent of nameplate, on the assumption the property is already warm.',
      '100 percent at full nameplate, reflecting the long high-duty-cycle running.',
    ],
    correctAnswer: 3,
    explanation:
      'Heat pumps run for hours, not minutes. During cold-snap mornings the heat pump may run continuously at its rated output for the entire morning warm-up period (3-4 hours), often coinciding with shower use, kettle, EV charging and cooker. The diversity assumption that worked for short-duration immersion heating does not apply. Use 100 percent as the design floor; refine downward only with manufacturer-published duty-cycle data and peak demand evidence.',
  },
  {
    id: 4,
    question:
      'On a small commercial fit-out (cafe, retail, office), where do diversity factors typically come from?',
    options: [
      'IET GN1 Section 7 — non-domestic categories with worked examples per premises type.',
      'OSG Table A1 only, applying the dwelling cooker and ring final formulas to the commercial loads.',
      'BS 7671 Appendix 4, which tabulates a mandatory diversity factor for each commercial premises type.',
      'The DNO design manual, which fixes the diversity for any commercial connection on that network.',
    ],
    correctAnswer: 0,
    explanation:
      'OSG Table A1 is the dwelling reference. For commercial work go to IET GN1 Section 7. The GN1 categories include office, retail, hospitality, education, healthcare, industrial, with worked examples per category for typical loads. Where the project type does not match a GN1 category exactly, pick the closest and document any adjustments.',
  },
  {
    id: 5,
    question: 'Coincidence factors at sub-main level for an apartment block:',
    options: [
      'Increase with the number of dwellings — more flats means more simultaneous peaks, so the factor rises above 1.0.',
      'Decrease with the number of dwellings — statistical smoothing of peaks falls from 1.0 toward about 0.4-0.5.',
      'Stay fixed at 1.0 regardless of the number of dwellings, because each flat is assessed in isolation.',
      'Stay fixed at 0.4 for any block over a single dwelling, because that is the minimum factor BS 7671 permits.',
    ],
    correctAnswer: 1,
    explanation:
      'Coincidence (or simultaneity) factors recognise that across a population of users, peaks do not align. The bigger the population, the smoother the aggregate peak. IET GN1 tabulates coincidence factors. The numbers are updating slowly to reflect heat pump and EV penetration — heat pump peaks on a cold morning are more correlated than traditional dwelling peaks.',
  },
  {
    id: 6,
    question:
      'Modern dwelling load profile changes (heat pumps, EVs, batteries) require what to traditional diversity factors?',
    options: [
      'Nothing. The traditional 1990s dwelling diversity factors apply unchanged because the loads are still domestic.',
      'A blanket reduction. Heat pumps and EVs replace older resistive loads, so the overall diversity factor falls and supplies can be downsized.',
      'Re-evaluation. These loads flatten and broaden peaks but raise sustained demand, so traditional dwelling diversity may understate.',
      'A switch to full nameplate on every circuit, abandoning diversity entirely for any dwelling with a heat pump or EV.',
    ],
    correctAnswer: 2,
    explanation:
      'The traditional OSG dwelling diversity assumed gas heating, occasional electric resistance loads (shower, immersion, cooker, kettle) and no EV. A 2026 dwelling with heat pump + EV + battery has a fundamentally different load profile: longer-duration heat pump baseline, evening EV charging peak, possible battery export/charge cycles. BEAMA and the IET are updating guidance; designers should not rely solely on 1990s diversity numbers for 2026 designs.',
  },
  {
    id: 7,
    question:
      'For an EV charger with OZEV-compliant smart functionality (load management), the design Ib can be:',
    options: [
      'Taken as zero at all levels, because an OZEV-compliant charger always defers to off-peak and never contributes to peak demand.',
      'Increased to 125 percent of nameplate at the supply, to allow for inrush when the charger first connects.',
      'Reduced uniformly to 40 percent on every circuit between the charger and the origin, the same as a domestic ring final.',
      'Reduced to the load-managed throttle setpoint at the supply, with the fall-back demand assessed as well.',
    ],
    correctAnswer: 3,
    explanation:
      'Load-managed EV chargers throttle their charging current when total household demand exceeds a setpoint. Reg 722.311.201 permits load curtailment — automatic or manual — to be taken into account when determining maximum demand, so the design may use the throttled rate at the supply level. What the standard does not do is tell you what happens when the curtailment fails, and that is the assessment. If the load management fails, what does the charger draw? Typically a manufacturer fall-back (e.g. 16 A or 20 A fixed). Confirm the supply still survives the fall-back demand.',
  },
  {
    id: 8,
    question:
      'On a hospitality fit-out (pub, restaurant, hotel), the diversity assumption for kitchen cooking equipment is typically:',
    options: [
      '70-90 percent of cooking aggregate, because of high coincidence at lunch and dinner service peaks.',
      '10 A + 30 percent of the remainder, applying the domestic cooker formula to the commercial kitchen.',
      '40 percent of cooking aggregate, the same factor used for a second domestic ring final.',
      '20-30 percent of cooking aggregate, because commercial kitchens rarely run more than one appliance at once.',
    ],
    correctAnswer: 0,
    explanation:
      'Hospitality cooking has high coincidence at service times — multiple hobs, oven, grill, salamander, dishwasher all running together at lunch and dinner peaks. 70-90 percent of aggregate is realistic; some chains even design at 100 percent for the kitchen sub-main. Refrigeration is 100 percent (compressor-cycle independence). Lighting is 100 percent for opening hours. The diversity stack is very different from a dwelling.',
  },
];

const faqs2 = [
  {
    question: 'How do I get hold of the current OSG Table A1?',
    answer:
      'The IET On-Site Guide is published as a printed pocket book and as an e-book / digital subscription. The current edition aligns with BS 7671:2018+A4:2026. Table A1 is in the appendices at the back. For design work you typically have a printed copy on the desk and the digital copy searchable on a phone or tablet. The IET also publishes the Electrician’s Guide to the Building Regulations as a companion. Avoid using older editions for current design work — diversity numbers do shift across editions.',
  },
  {
    question: 'Where is the GN1 Section 7 commercial diversity table?',
    answer:
      'IET Guidance Note 1 (Selection and Erection) Section 7 covers maximum demand and diversity for non-domestic installations. The current edition (aligned with BS 7671:2018+A4:2026) has worked examples for offices, retail, hospitality, education, healthcare, industrial, leisure and mixed-use. Each example walks through a representative load schedule and applies category-specific diversity factors. For unusual project types, GN1 also gives the principles for deriving your own factors.',
  },
  {
    question: 'How do I handle electric vehicle diversity on a multi-dwelling sub-main?',
    answer:
      'Multi-dwelling EV charging is one of the hardest diversity calls in modern apartment-block design. Options: (1) fixed allocation per dwelling (each dwelling gets an EV-ready CU way and a managed share of the building supply); (2) site-wide load management where the building energy management system (EMS) throttles all chargers to keep within the building supply rating; (3) DNO-managed connection where the DNO contractually limits the building supply during peak times. The IET’s Code of Practice for EV Charging Equipment Installation (current edition) covers these options. Apartment blocks designed for EVs without site-wide load management often run into supply-rating problems within 3-5 years of occupation as EV penetration grows.',
  },
  {
    question: 'Can I apply diversity to motor circuits in industrial design?',
    answer:
      'Yes, but carefully. Motor circuits have high starting current (typically 6-8 times full-load current for direct-on-line, 1.5-3 times for soft-starts and inverters), so diversity must consider both running diversity (which motors run simultaneously?) and starting coincidence (would two large motors start at the same time?). For a small workshop the diversity assumption might be 100 percent of the largest motor + 50 percent of others (running) but ensure the supply can handle the starting transient of the largest motor on top of running others. For larger industrial installations, use sequential start sequencing to avoid concurrent starts.',
  },
  {
    question: 'What about diversity in a building with PV and battery?',
    answer:
      'PV and battery affect demand at the grid interface, not at the household level. A dwelling with 4 kWp PV may export 3-4 kW to the grid mid-day (negative net demand) but still draw full demand from the grid in the evening. The diversity calc for the supply is based on net grid demand worst-case: typically the evening peak when PV is generating zero and battery is depleted. PV does not reduce maximum demand at the design stage; battery can reduce evening peak if sized for the household load profile (typically 5-10 kWh battery). Reg 712 (PV) and emerging guidance on battery storage cover the technical specifications; the diversity calc must consider the worst-case grid draw, not the average.',
  },
  {
    question: 'How should I document my diversity assumptions on a small job?',
    answer:
      'Even on a domestic CU upgrade, a single half-page diversity table embedded in the design pack covers the requirement. Columns: load category, connected load (kW or A), diversity factor, source (OSG Table A1, GN1, manufacturer datasheet), resulting Ib. A simple spreadsheet does the job. The same template scales up to multi-DB commercial work — just more rows. The discipline matters more than the format. The diversity table is the page an inspector or future designer goes to first when auditing the calc.',
  },
];

export default function Lesson315E_5_4() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Connected load vs maximum demand. The Reg 311 assessment. Why diversity exists, where the
        factors come from, and how the L3 designer uses them to size every cable, every device and
        every supply on the design pack.
      </p>

      <TLDR
        points={[
          'Connected load is the sum of nameplate ratings; maximum demand is the realistic peak after applying diversity. BS 7671 Reg 311.1 requires you to assess the latter, not the former, before sizing anything.',
          'Diversity factors come from the IET On-Site Guide Table A1 (typical dwelling), IET GN1 Section 7 (broader installations), manufacturer data for special loads, and project-specific measurement on existing installations. BS 7671 itself does not give a single table.',
          'Modern dwelling load profiles are changing — heat pumps run for longer (lower peak, higher daily kWh), EV chargers concentrate demand into specific hours. The 1990s OSG diversity numbers may understate peak demand for a 2026 dwelling. Use load-managed EV chargers and document the source of every diversity factor.',
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
          The starting point of every load assessment is the connected load — the sum of nameplate
          ratings of every fixed appliance and every socket-outlet position on the installation.
          For a typical three-bed dwelling the connected load adds up like this:
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
          Total connected load = 42.8 kW = 186 A at 230 V. Without diversity the supply would need
          to be 200 A and three-phase. Apply OSG Table A1 diversity (cooker 10 A + 30 percent of
          remainder + 5 A; ring finals 30 percent of largest + 40 percent of subsequent; full
          demand on shower, immersion, EV) and the realistic peak comes down to around 60-75 A —
          comfortably within a standard 100 A single-phase service.
        </p>
        <p>
          The number that matters for cable, device and supply sizing is the maximum demand, not
          the connected load. This is the single most important conceptual move at the start of
          any L3 design.
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
            Reg 311.1 explicitly authorises (and effectively requires) the designer to use
            diversity. The wording “may be taken into account” sounds permissive but in practice
            not applying diversity for typical installations would oversize the supply, the cables
            and the devices to the point of being unreasonable — failing the implicit Reg 132
            requirement that the design be appropriate. Document the diversity factors you use and
            their source.
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
          <strong>1. IET On-Site Guide Table A1.</strong> The recognised reference for typical
          dwellings. Covers cooker, shower, immersion heater, ring final, radial, lighting, EV
          charger and heat pump diversity. Read the current OSG edition; the numbers shift as load
          patterns change.
        </p>
        <p>
          <strong>2. IET Guidance Note 1 Section 7.</strong> The recognised reference for broader
          installation types — offices, retail, hospitality, educational, industrial.
          Differentiated factors per load category.
        </p>
        <p>
          <strong>3. Manufacturer-specific data.</strong> Essential for special loads where
          industry tables do not capture the realistic profile. Heat pumps, EV chargers
          (especially load-managed OZEV-compliant chargers), induction hobs (high transient
          demand), data-centre IT loads (high crest factor and PSU oversizing), induction motor
          starters, welders.
        </p>
        <p>
          <strong>4. Project-specific measurement data.</strong> For an existing installation
          being upgraded or modified, the customer’s 12-month half-hour smart meter data export is
          the gold standard for actual peak demand. The peak half-hour figure is the realistic
          maximum demand. Beats every table.
        </p>
        <p>
          Document the source on every diversity assumption. “OSG Table A1, 2024 edition, ring
          final entry” is a defensible citation; “typical figure” is not.
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
          Same dwelling as above. Apply OSG Table A1 (representative figures — verify against
          current OSG edition):
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Shower 9.5 kW:</strong> 100 percent demand = 9.5 kW = 41.3 A.
          </li>
          <li>
            <strong>Cooker 7 kW (30 A nameplate):</strong> 10 A + 30 percent of (30 - 10) + 5 A
            (cooker socket if integrated) = 10 + 6 + 5 = 21 A maximum demand.
          </li>
          <li>
            <strong>Immersion 3 kW:</strong> 100 percent (uncontrolled) = 13 A.
          </li>
          <li>
            <strong>Ring final 1 (kitchen):</strong> 100 percent of the largest assumed connected
            use, typically taken at 32 A diversified to a working figure of around 20 A average
            peak.
          </li>
          <li>
            <strong>Ring final 2 (general):</strong> 40 percent of the second ring, typically 13
            A.
          </li>
          <li>
            <strong>Lighting 1.6 kW:</strong> 100 percent (full demand for evening peak) = 7 A.
          </li>
          <li>
            <strong>EV charger 7 kW:</strong> 100 percent (no traditional diversity) = 30 A; OR
            load-managed (OZEV-compliant) to 13-20 A as a controllable share of the supply.
          </li>
        </ul>
        <p>
          Sum of diversified demand: 41.3 + 21 + 13 + 20 + 13 + 7 + 30 = 145 A peak (no EV
          management) or around 128 A (with EV management to 20 A share). Both exceed a standard
          100 A service.
        </p>
        <p>
          Resolution: load-manage the EV charger to throttle to 16 A or 20 A when household demand
          exceeds 80 A — keeps the supply within 100 A. Alternative: apply for DNO supply upgrade
          to 100 A three-phase or 125 A single-phase. The diversity calc tells the customer which
          option is needed at design stage, not after the EV is installed and the trip-out
          problems start.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.3(c) (Daily and yearly variation of demand)"
        clause="Designers shall account for daily and yearly variation of demand when determining circuit numbers and types. Seasonal or diurnal variations that affect loading and diversity shall be included in the design calculations and documented."
        meaning={
          <>
            Load-managed EV chargers, heat pumps and battery storage all change the daily and
            yearly load profile in ways traditional diversity factors do not capture. Reg 132.3(c)
            requires the designer to record those daily and yearly variations as part of the
            design — including how a load-management scheme behaves at peak window, off-peak
            window and on a cold-snap morning. Record the load-managed setpoint AND the worst-case
            fall-back demand (manufacturer datasheet) so the supply margin is honest.
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
        <p>On a multi-DB installation, diversity applies at three levels:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Final circuit Ib</strong> — the diversified peak demand on a single final
            circuit. Drives the breaker rating and the cable size for that circuit per Reg
            433.1.1.
          </li>
          <li>
            <strong>Sub-main Ib</strong> — the diversified peak across all final circuits on a
            sub-DB. Always less than the sum of final circuit Ib values, because not all final
            circuits peak simultaneously.
          </li>
          <li>
            <strong>Origin Ib</strong> — the diversified peak across all sub-mains and any direct
            origin circuits. Always less than the sum of sub-main Ib values.
          </li>
        </ul>
        <p>
          The diversity factor at each successive level is typically lower than at the level below
          — coincidence smooths demand at scale. IET GN1 has worked examples for sub-main and
          origin diversity stacks for offices, retail, hospitality and industrial. The L3 designer
          documents each level on the design pack.
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
            You are designing the supply, sub-main and final circuits for a 220 m² cafe with two
            DBs (DB-K kitchen, DB-F front-of-house). Loads include three induction hobs (7 kW
            each), 5 kW combination oven, 3 kW dishwasher, 8 kW refrigeration (compressor sum), 18
            lighting circuits, 12 socket outlets in three rings, EPOS, fire alarm, AV, external
            sign 2 kW.
          </>
        }
        whatToDo={
          <>
            Final-circuit Ib by category. Cooking circuits: induction hobs run with high
            coincidence at lunch service, manufacturer typical diversity around 70 percent across
            three hobs (because not all four rings on every hob run at full demand) gives 21 kW
            out of 21 kW connected = 91 A at 230 V or 31 A per phase if balanced across three
            phases. Refrigeration: 100 percent demand because compressors cycle independently with
            low coincidence between fridges = 35 A. Ring finals: 30 percent + 40 percent + 30
            percent of subsequents at typical EPOS and small appliance use = around 25 A peak
            across three rings. Lighting: 100 percent demand at evening operation = 18 A. AV /
            EPOS / fire alarm: low load, individual circuit Ib less than 6 A each.\n\nSub-main Ib
            for DB-K: cooking 91 A + refrigeration 35 A + dishwasher 13 A + 1 ring 11 A + lighting
            6 A. Sum = 156 A, but apply 0.85 sub-main coincidence factor (not all categories peak
            at the same instant) = 133 A. Sub-main Ib for DB-F: 2 rings 14 A + lighting 12 A + AV
            / EPOS 8 A + sign 9 A = 43 A.\n\nOrigin Ib: 133 + 43 = 176 A. Apply 0.9 origin
            coincidence factor (DB-K and DB-F peak slightly offset — kitchen at lunch service,
            front-of-house all afternoon) = 158 A. Round up to 160 A. Need 60 A or 80 A per phase
            three-phase service.
          </>
        }
        whyItMatters={
          <>
            Without the level-by-level diversity stack, the designer might add nameplate kW and
            conclude the cafe needs a 250 A supply. The actual realistic peak is 160 A. The DNO
            upgrade cost difference between a 100 A and a 200 A three-phase service is in the
            £1000-2000 range; between 200 A and 400 A often £5000-15000+. The diversity calc done
            properly is one of the highest-leverage design activities you do — it directly
            determines the supply order and the customer’s connection cost.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Things that catch people out</ContentEyebrow>

      <CommonMistake
        title="Sizing on connected load, not maximum demand"
        whatHappens={
          <>
            A junior designer adds the kW of every nameplate on the spec, divides by 230, and
            proposes a 200 A single-phase service for a typical 4-bed dwelling. The DNO laughs (no
            such thing exists), the customer is quoted £8000 for a three-phase upgrade that is not
            actually needed, the project either stalls or gets re-engineered at the designer’s
            cost.
          </>
        }
        doInstead={
          <>
            Always apply OSG Table A1 (or GN1 Section 7) diversity to derive the realistic maximum
            demand. Show the diversity calc as a discrete page in the design pack with source
            citations. The number you carry forward to cable and device sizing is the diversified
            peak, not the connected load. For modern dwellings with heat pumps and EVs, layer in
            load-managed EV charging or supply upgrade as needed — but never propose a supply that
            is not justified by the calc.
          </>
        }
      />

      <CommonMistake
        title="Forgetting to assess load management failure mode"
        whatHappens={
          <>
            A designer relies on a load-managed EV charger to keep the dwelling within a 100 A
            supply. The charger throttles correctly under normal operation. But the LM unit fails
            one cold morning and the EV draws full 32 A while the heat pump and shower are
            running. The 100 A service blows the cut-out fuse; family is without supply for 4
            hours mid-winter.
          </>
        }
        doInstead={
          <>
            Reg 722.311.201 permits load curtailment to be taken into account when determining
            maximum demand. It is permissive, so relying on it is a design decision — and a design
            decision you should be able to defend. Document the EV
            charger fall-back behaviour (manufacturer datasheet); confirm the supply survives the
            worst-case fall-back. Where the worst case exceeds the supply rating, either upgrade
            the supply or specify additional protection (e.g. supply main with fast-trip during
            overload).
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
          <li>
            EV charger — full nameplate where load management is not enforced; reduced where load
            management is reliably specified.
          </li>
          <li>Heat pump — full nameplate plus 20% margin for defrost cycles.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Reg 311.1 and Reg 722.311.201 — assessing maximum demand"
        plainEnglish="Reg 311.1 in BS 7671 requires the designer to assess the maximum demand of every installation. Reg 722.311.201 then says load curtailment, including load reduction or disconnection, either automatically or manually, may be taken into account when determining that maximum demand. Note the word 'may' — it is a permission, not a duty, and nothing in BS 7671 obliges you to assess what the installation draws if the curtailment fails. That assessment is engineering judgement, and it is what stops a design falling over the first time the load management does. Where you do rely on curtailment, Reg 536.4.202 brings in the coordination between the assembly and the overload protective device."
        onSite="This matters for modern installations with dynamic load management — OZEV-compliant EV chargers that throttle when total demand rises, smart heat pumps that defer hot water charging, smart battery systems that import to support evening peak. The designer must ask: what happens if the load management fails? If the supply survives, the design holds. If the supply trips on the failure mode, the load management cannot be relied on alone — the design needs a hard upper limit (smaller charger, smaller heat pump, supply upgrade)."
      >
        <p>Reg 311 framework on a typical heat-pump plus EV install:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 311.1 assessment</strong> — calculate maximum demand including the heat
            pump and EV charger.
          </li>
          <li>
            <strong>Reg 722.311.201 curtailment</strong> — you may take the load management into
            account; consider operating with it active, then consider it failed.
          </li>
          <li>
            <strong>Load management active</strong> — OZEV charger throttles to keep total under
            100 A; design holds.
          </li>
          <li>
            <strong>Load management failed</strong> — charger draws full 32 A; total demand
            exceeds 100 A; supply trips.
          </li>
          <li>
            <strong>Design fix</strong> — smaller fixed-rating EV charger (16 A or 20 A),
            three-phase supply, supply upgrade, or hard-wired interlock. Document the chosen
            strategy.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Where the diversity numbers come from — OSG, GN1, manufacturer data"
        plainEnglish="The IET On-Site Guide Table A1 carries domestic diversity factors. IET Guidance Note 1 Chapter 7 carries broader (commercial, industrial, mixed-use) diversity. Manufacturers publish diversity data for specific products — VSDs, heat pumps, EV chargers. Project-specific measurement (PQ logger, half-hourly meter data) gives empirical diversity for existing installations. Each source has different evidential weight; the designer cites the source on the calc page."
        onSite="On a domestic CU swap design, OSG Table A1 is the default reference. On a small-commercial fit-out, GN1 Chapter 7 is the default. On an industrial site with VSDs and welders, manufacturer data plus measurement is the default. Mixing sources is fine where the install crosses categories; cite each. The L3 designer's calc page reads as a citation list, with each diversity factor traced back to a published source."
      >
        <p>Source preference by installation type:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>OSG Table A1</strong> — single dwelling, typical domestic loads.
          </li>
          <li>
            <strong>GN1 Chapter 7</strong> — commercial, hospitality, education, healthcare,
            mixed-use.
          </li>
          <li>
            <strong>Manufacturer data</strong> — specific high-impact loads (heat pumps, EV
            chargers, VSDs, welders, large motors).
          </li>
          <li>
            <strong>Project-specific measurement</strong> — existing installations with
            half-hourly metering or PQ logger data.
          </li>
          <li>
            <strong>Conservative default</strong> — when no source applies, treat the load at full
            nameplate; the resulting design will be safe but oversized.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Connected load schedule — the input to every diversity calc"
        plainEnglish="The connected load schedule is the table that lists every load on the installation, its nameplate rating, the circuit it sits on, and any load-management arrangement applied. It is the input to the diversity calc — without it, the diversity calc has nowhere to start. The L3 apprentice's contribution to the design pack often starts with the connected load schedule, because it is the most data-entry-heavy part of the pack."
        onSite="On a typical 4-bed dwelling the connected load schedule has 15-25 line items; on a small commercial fit-out 50-100; on an industrial site many hundreds. Each item: load description, nameplate kW or A, voltage, single or three-phase, circuit allocation, control strategy (always-on, switched, time-clocked, smart-load-managed). The schedule lives on the design pack alongside the single-line diagram and the diversity calc; updates to any one of the three should propagate to the others."
      >
        <p>Connected load schedule columns:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Load description</strong> — plain English identifier (kitchen ring, EV
            charger, heat pump outdoor unit).
          </li>
          <li>
            <strong>Nameplate rating</strong> — kW and / or A from the device data sheet; not the
            customer's casual estimate.
          </li>
          <li>
            <strong>Voltage</strong> — 230 V single-phase or 400 V three-phase; matters for the
            per-phase load total.
          </li>
          <li>
            <strong>Circuit allocation</strong> — which final circuit the load is on; matters for
            the diversity factor at the circuit level vs the sub-main level.
          </li>
          <li>
            <strong>Control strategy</strong> — always-on, switched, time-clocked,
            smart-load-managed; matters for the diversity assumption applied.
          </li>
          <li>
            <strong>Source citation</strong> — where the load data came from (data sheet, customer
            brief, measurement); evidence trail.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation into circuits)"
        clause={
          <>
            Every installation shall be divided into circuits, as necessary, to: (a) avoid danger
            and minimize inconvenience in the event of a fault; (b) facilitate safe inspection,
            testing and maintenance; (c) take account of hazards that may arise from the failure
            of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted
            tripping of RCDs due to excessive protective conductor (PE) currents not due to a
            fault; (e) mitigate the effects of electromagnetic disturbances; (f) prevent the
            indirect energizing of a circuit intended to be isolated.
          </>
        }
        meaning={
          <>
            Maximum demand drives circuit count, and circuit count is governed by Reg 314.1. The
            six bullets shape the design — splitting circuits to limit fault-impact, segregating
            PE currents to keep RCDs from nuisance-tripping, separating life-safety circuits from
            non-essential loads, and so on. Maximum demand alone is not a sufficient design — Reg
            314.1 sets the framework that turns the demand into a circuit schedule.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Connected load is the sum of nameplate ratings; maximum demand is the realistic peak after diversity. BS 7671 Reg 311.1 requires you to assess the latter before sizing anything.',
          'Diversity factors come from IET OSG Table A1 (typical dwelling), IET GN1 Section 7 (broader installations), manufacturer data (special loads), and project-specific measurement (existing installations). BS 7671 itself does not give a single table.',
          'Ib (design current) is the maximum demand at each level — final circuit, sub-main, supply origin. Diversity stacks at each successive level, with lower coincidence factors as you aggregate.',
          'Document the diversity assumptions on a discrete diversity calculation page in the design pack with source citations. This is the most-audited part of the design pack.',
          'Modern dwelling load profiles are changing — heat pumps run for longer (lower peak, higher daily kWh); EV chargers concentrate demand into specific hours. The 1990s OSG numbers may understate peak demand for a 2026 dwelling.',
          'EV charger diversity defaults to 100 percent (no diversity) because charging often coincides with peak domestic demand. Use load-managed (OZEV-compliant) chargers to recover diversity through throttling when total household demand exceeds a setpoint.',
          'Reg 722.311.201 permits load curtailment to be taken into account when determining maximum demand — permits, not requires. Where you rely on it, document the fall-back behaviour and confirm the supply survives it; that part is engineering judgement rather than a numbered requirement.',
          'On multi-DB installations, apply diversity at three levels: final circuit, sub-main and origin. Each level has its own coincidence factor, typically lower than the level below.',
        ]}
      />

      <Quiz title="Maximum demand fundamentals — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        OSG Table A1 entry by entry. GN1 Section 7 commercial categories. Coincidence factors at
        sub-main and origin level. The modern updates needed for heat-pump-rich and EV-rich
        dwellings.
      </p>

      <TLDR
        points={[
          'OSG Table A1 covers typical dwellings with cooker, shower, immersion, ring final, radial, lighting, water heater, EV charger and heat pump entries. Each has a specific diversity formula. Verify against current OSG edition.',
          'IET GN1 Section 7 covers non-domestic installations — office, retail, hospitality, education, healthcare, industrial. Differentiated factors per category with worked examples.',
          'Coincidence factors at sub-main and origin smooth peaks across many circuits or many dwellings. Larger populations equal smoother aggregate. Heat pump and EV penetration is changing the smoothing — peaks are becoming more correlated, especially during cold mornings and evening EV charging hours.',
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
          Representative OSG Table A1 entries (verify against the current OSG edition; numbers
          shift across editions):
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Lighting</strong> — 66 percent of total connected load (some editions allow
            100 percent if all-LED low load).
          </li>
          <li>
            <strong>Cooker</strong> — first 10 A at full demand + 30 percent of the remainder + 5
            A for an integrated cooker socket.
          </li>
          <li>
            <strong>Instantaneous water heater (shower)</strong> — 100 percent of largest + 100
            percent of second + 25 percent of third and subsequent. (Multiple showers in a
            dwelling.)
          </li>
          <li>
            <strong>Storage water heater (immersion)</strong> — 100 percent (uncontrolled), or 0
            percent if fed from off-peak only with no overlap with peak demand.
          </li>
          <li>
            <strong>Ring final</strong> — 100 percent of largest + 40 percent of second + 30
            percent of subsequent (at typical 32 A nameplate, applied to actual diversified load).
          </li>
          <li>
            <strong>Radial</strong> — depends on dedicated function; cooker-radial like cooker
            formula, dedicated appliance at 100 percent, general radial like ring final.
          </li>
          <li>
            <strong>EV charger</strong> — 100 percent (no diversity) unless OZEV-compliant
            load-managed; with load management, the design can use the throttled rate.
          </li>
          <li>
            <strong>Heat pump</strong> — typically 100 percent or per manufacturer data; modern
            guidance pushes toward 100 percent because of duty cycle.
          </li>
        </ul>
      </ConceptBlock>

      <div className="my-4">
        <ContentEyebrow>Try the calculator</ContentEyebrow>
        <LoadCalculator />
      </div>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>GN1 Section 7 — commercial diversity</ContentEyebrow>

      <ConceptBlock
        title="IET GN1 Section 7 — non-domestic categories"
        plainEnglish="Office, retail, hospitality, education, healthcare, industrial. Each has different load patterns, different diversity factors, different worked examples."
      >
        <p>Representative GN1 Section 7 commercial diversity (verify against current edition):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Office</strong> — lighting 100 percent (work hours), socket outlets 50-65
            percent (depending on equipment mix), HVAC mechanical 100 percent (sequenced or per
            BMS), lift 100 percent peak with start allowance, server rooms 100 percent (sized for
            IT load with cooling), kitchenettes 30-50 percent (occasional use).
          </li>
          <li>
            <strong>Retail</strong> — lighting 100 percent (opening hours), refrigeration 100
            percent (compressor cycle), display lighting 100 percent, EPOS 100 percent (active
            during opening), HVAC 100 percent, occasional special loads (hot beverage machines,
            signage) per nameplate.
          </li>
          <li>
            <strong>Hospitality (pubs, restaurants, hotels)</strong> — kitchen cooking 70-90
            percent (high coincidence at service), refrigeration 100 percent, lighting 100 percent
            (opening hours and overnight low-level), HVAC 100 percent, room socket outlets in
            hotels 30-50 percent (occupancy-dependent).
          </li>
          <li>
            <strong>Education</strong> — classroom lighting 100 percent (school hours), socket
            outlets 30-50 percent (typical pupil use), specialist labs 100 percent (during use),
            kitchen 70-90 percent (lunch service peak), heating 100 percent.
          </li>
          <li>
            <strong>Healthcare</strong> — life-safety circuits 100 percent (always), theatre
            lighting 100 percent (during use), patient bedside 50-75 percent (depending on
            dependency level), HVAC 100 percent, IT critical 100 percent.
          </li>
          <li>
            <strong>Industrial</strong> — process equipment per process schedule (often 100
            percent for sequenced loads, less for batched processes), motor circuits 100 percent
            of largest plus 50 percent of others (running diversity), lighting 100 percent
            (operating hours), welders 50-75 percent (intermittent).
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Coincidence factors — multi-circuit, multi-dwelling</ContentEyebrow>

      <ConceptBlock
        title="Coincidence factors at sub-main and origin"
        plainEnglish="The bigger the population, the smoother the peak. Single dwelling = 1.0 coincidence. 50+ dwellings = around 0.4-0.5."
      >
        <p>
          Coincidence (or simultaneity) factors apply at sub-main and origin levels to recognise
          that not all circuits or dwellings peak simultaneously. Representative IET GN1 figures
          (verify against current edition):
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
          The coincidence factor is multiplied by the per-dwelling diversified maximum demand to
          give the sub-main Ib. Note: heat pump and EV penetration is making peaks more correlated
          — cold-morning heat pump peaks align across dwellings; evening EV charging peaks align
          across dwellings without smart control. Modern apartment-block design must apply higher
          coincidence factors than the traditional 1990s tables, or use site-wide load management
          to enforce diversity.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.3 (Nature of demand)"
        clause="The number and type of circuits required for lighting, heating, power, control, signalling, communication and information technology, etc. shall be determined from knowledge of location of points of power demand; loads to be expected on the various circuits; daily and yearly variation of demand; any special conditions such as harmonics; requirements for control, signalling, information and communications technology; and anticipated future demand, if specified."
        meaning={
          <>
            Reg 132.3 makes the demand profile a discrete design consideration. Daily and yearly
            variation is the diversity input. Special conditions like harmonics matter for IT and
            inverter loads (PV, EV chargers, heat pump compressors) — they affect apparent power
            and may require sizing on apparent rather than active load. The L3 designer documents
            the demand profile assumptions in the design pack alongside the diversity factors.
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
        <p>Three changes are reshaping dwelling load profiles:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Heat pumps</strong> run for 6-12 hours per day during heating season at 2-6 kW
            depending on size and ambient. Cold-morning warm-up can run continuously at full load
            for 3-4 hours, often coinciding with shower, kettle, EV charging, cooker. The
            traditional 30-percent-of-cooker diversity is roughly compatible; the heat pump itself
            defaults to 100 percent.
          </li>
          <li>
            <strong>EV chargers</strong> concentrate demand into specific hours (often 18:00-22:00
            evening peak) without smart control. With OZEV-compliant load management, demand can
            be shifted to off-peak (00:00-05:00) or modulated to keep household within a setpoint.
          </li>
          <li>
            <strong>Batteries</strong> can reduce peak grid demand (discharge during evening peak)
            if sized for the household profile, but increase overnight grid demand (off-peak
            charging). Net effect on supply sizing depends on battery size and use pattern.
          </li>
        </ul>
        <p>
          The L3 designer should treat traditional OSG diversity as a starting floor for typical
          dwellings and apply project-specific adjustments where heat pumps, EVs and batteries
          materially change the profile. BEAMA, the IET, and DNO emerging guidance (UK Power
          Networks Electric Nation reports, Network Innovation Allowance projects) are slowly
          updating tables; expect material changes through 2026-2028.
        </p>
      </ConceptBlock>

      <Scenario
        title="Multi-dwelling EV-ready apartment block"
        situation={
          <>
            You are designing the supply for a 24-dwelling apartment block, mix of 1-bed and 2-bed
            flats. Each dwelling has gas heating (existing), an EV-ready CU way for future EV
            charger (7 kW), no installed EV at handover. The developer wants the supply sized so
            that 50 percent of dwellings can install EV chargers within 5 years without further
            upgrade.
          </>
        }
        whatToDo={
          <>
            Per-dwelling diversified demand (without EV): 1-bed flats ~30 A, 2-bed flats ~45 A;
            weighted average across the 24 mix = ~38 A. Apply IET GN1 coincidence factor for 24
            dwellings without EV: ~0.5. Sub-main Ib without EV = 24 x 38 x 0.5 = 456 A. With 50
            percent EV penetration (12 dwellings with 7 kW EV chargers, all OZEV-compliant
            load-managed at site level), additional EV demand at sub-main = 12 x 32 A x 0.55 (EV
            coincidence factor higher than dwelling base because of evening peak alignment) = ~211
            A. Total sub-main Ib = 456 + 211 = 667 A. Round to 800 A three-phase service. Specify
            site-wide load management EMS that throttles EV chargers to keep total building demand
            below 800 A; per-dwelling EV throttle setpoint (e.g. 3 kW per dwelling at peak when
            EMS detects building approaching limit). Document the EMS failure-mode behaviour per
            Reg 722.311.201.
          </>
        }
        whyItMatters={
          <>
            Without the EV provision, the building would size at 456 A and the developer saves
            £15-25k on the DNO connection. Five years later when 50 percent of residents install
            EV chargers, the building hits supply rating problems — repeated trips during evening
            peak. Retrofit upgrade costs £40-80k plus disruption. Designing for the end state up
            front, with site-wide load management to enforce diversity, costs ~£20k more at design
            but avoids the £40-80k retrofit cost. This is the kind of forward-looking diversity
            work the L3 design role is built for.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Things that catch people out</ContentEyebrow>

      <CommonMistake
        title="Applying dwelling OSG diversity to a HMO or apartment block sub-main"
        whatHappens={
          <>
            A designer applies OSG Table A1 dwelling diversity per-dwelling, then sums the
            per-dwelling diversified demand without applying the coincidence factor at sub-main.
            The sub-main is sized for the sum (much too large) when the coincidence factor would
            have shrunk it by 40-50 percent. The supply order is much larger than needed; the
            customer pays for the difference.
          </>
        }
        doInstead={
          <>
            Diversity stacks. Apply OSG dwelling diversity per dwelling to get per-dwelling Ib;
            then apply the IET GN1 coincidence factor for the number of dwellings to get sub-main
            Ib; then apply the appropriate coincidence factor at origin if multiple sub-mains feed
            the building. Document each level on the diversity calc page.
          </>
        }
      />

      <CommonMistake
        title="Using 1990s OSG numbers on a 2026 heat-pump dwelling"
        whatHappens={
          <>
            A designer specifies 60 A as the diversified peak for a heat-pump-and-EV dwelling
            using the traditional OSG dwelling formula. The actual peak (heat pump cold-morning +
            EV charging + shower + cooker) is 95 A. The 100 A supply trips on a cold winter
            morning. The designer is asked why.
          </>
        }
        doInstead={
          <>
            Treat heat pump and EV as 100 percent demand items. Apply traditional OSG diversity to
            the rest of the dwelling (cooker, ring finals, lighting, immersion). Sum the heat pump
            (full nameplate), EV (full or load-managed setpoint), and the diversified rest. For a
            4-bed dwelling with 8 kW heat pump + 7 kW EV the diversified peak is typically 90-110
            A — at or above the 100 A standard service. Either upgrade to 125 A, use site/dwelling
            load management, or apply for three-phase. Document the calc.
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
          <li>
            EV charger 7 kW @ 100% = 7 kW (30 A) — or load-managed setpoint where reliably
            enforced.
          </li>
          <li>Cooker 12 kW connected — first 10 A + 30% of remainder = ~25 A (~5.7 kW).</li>
          <li>Immersions 2 × 3 kW @ 100% = 6 kW (26 A) — water heating attracts no diversity.</li>
          <li>Ring finals + lighting + small loads — ~3-4 kW after diversity.</li>
          <li>
            <strong>Total maximum demand: approximately 25 kW / 108 A on single-phase</strong> —
            at or just above the 100 A service limit.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="ADMD — After Diversity Maximum Demand for development sizing"
        plainEnglish="When a developer specifies a new housing scheme, a network designer or DNO needs an After Diversity Maximum Demand (ADMD) figure per dwelling — typically expressed in kVA per house. The DNO uses ADMD to size the LV cable, transformer and link box. Historic ADMD figures (1.5-2 kVA per house) reflected gas-heated, low-EV stock; modern ADMD for full-electrification estates is rising fast and the network design has to match. The L3 designer rarely sets ADMD directly but should recognise the term."
        onSite="Energy Networks Association EREC P28 and the DNO design manuals carry the live ADMD tables. A typical 2026 single-dwelling ADMD on a new estate with 100 percent EV plus heat pump might be 5-8 kVA per dwelling, against 1.5-2 kVA on the older base. The diversity logic is the same — coincidence across many dwellings smooths the peak — but the per-dwelling base is much higher. Underestimate ADMD and the new estate's transformer trips on cold-snap evenings within five years of occupation."
      >
        <p>How ADMD differs from single-property maximum demand:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Single property MD</strong> — uses OSG / GN1 diversity to combine circuits
            within one dwelling. Coincidence factor for one dwelling is 1.0.
          </li>
          <li>
            <strong>ADMD</strong> — uses statistical coincidence across the dwelling population to
            derive a per-dwelling figure that reflects how unlikely it is that all houses peak at
            the same instant.
          </li>
          <li>
            <strong>Network design driver</strong> — DNO sizes the LV main and the transformer on
            (ADMD per house) × (number of houses). Peak diversity between houses falls as the
            population grows; 50+ dwellings on one transformer might use 0.4-0.5 coincidence.
          </li>
          <li>
            <strong>Why it matters at L3</strong> — when contributing to a new housing development
            load assessment for the developer, your figures feed the DNO's network design.
            Underestimate the per-house demand and the whole estate's network is undersized.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="CT vs whole-current metering — meter sizing on bigger services"
        plainEnglish="Single-phase domestic services use whole-current metering — the meter sees every amp directly. Above roughly 100 A per phase or 60 kW, services move to CT (current transformer) metering — the actual conductors pass through CTs and the meter reads the CT secondary. The maximum-demand calc determines whether whole-current or CT metering applies, and the meter operator (MOP) installs accordingly."
        onSite="On larger commercial / industrial designs, the design pack flags 'CT metering required' if the diversified Ib at the supply origin exceeds the whole-current limit (typically 100 A single-phase, 100 A per phase three-phase). The MOP needs CT positions, ratio (e.g. 200/5 A or 400/5 A), accuracy class (typically 0.5 or 0.5S for billing), and an MID-class meter. Designing without CT space at the meter cabinet means a rebuild when the half-hourly meter goes in."
      >
        <p>Practical implications of crossing the whole-current threshold:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Meter cabinet size</strong> — CT metering needs space for the CTs in the bus
            chamber plus the meter, voltage tap, and test block. Specify the cabinet at design
            stage.
          </li>
          <li>
            <strong>CT ratio sizing</strong> — pick a ratio with margin above the expected
            diversified peak; common ratios 100/5, 200/5, 400/5, 800/5. Under-ratio CTs saturate;
            over-ratio CTs lose accuracy at low load.
          </li>
          <li>
            <strong>Half-hourly metering</strong> — every site over 100 kW peak goes onto
            half-hourly automatically; sites between 70-100 kW often opt in for better tariff
            visibility.
          </li>
          <li>
            <strong>Sealing and ownership</strong> — CTs and meter are MOP-owned; contractor
            cannot break the seals once commissioned. Any later change triggers a MOP visit.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Future-proof margin — designing for the 10-year load growth"
        plainEnglish="Maximum demand on a 2026 install is not the maximum demand the install will see in 2036. EV adoption is rising, heat pumps are gradually replacing gas, battery storage is becoming common. A design that is 90 percent of supply capacity at handover has no headroom for the customer's next upgrade. Sensible designs leave 20-30 percent margin where the supply allows."
        onSite="On a domestic CU swap design, ask the customer the 'in the next ten years' question — heat pump? second EV? home battery? PV upsize? Each of those adds a meaningful load. Sizing the new CU and the supply with that growth in mind is cheap at install time and expensive to retrofit. On commercial fit-outs, the same logic applies — extra circuit ways for the next-bay tenant, spare capacity at the supply origin for the next mezzanine sublet."
      >
        <p>Common future-proof line items:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Spare ways at the CU</strong> — fit a CU with two or three more ways than the
            current circuit count needs. Cheap insurance against the next addition.
          </li>
          <li>
            <strong>Bonded earth for outbuildings</strong> — install bonding at first fix even if
            the outbuilding is not yet electrified. Pulls in much harder later.
          </li>
          <li>
            <strong>Conduit or duct routes</strong> — first fix to garage / garden room / EV bay.
            The cost of an empty conduit at first fix is a fraction of the cost of chasing walls
            later.
          </li>
          <li>
            <strong>Three-phase consideration</strong> — for any property near the 100 A
            single-phase limit, raise the three-phase question with the DNO at the supply review.
            Cheaper to upgrade once than twice.
          </li>
          <li>
            <strong>PV / battery readiness</strong> — leave a labelled spare way and an empty
            conduit run to the planned inverter location even if the customer is not buying PV
            today.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 314.1 (division of installation)"
        clause={
          <>
            Every installation shall be divided into circuits, as necessary, to: (a) avoid danger
            and minimize inconvenience in the event of a fault; (b) facilitate safe inspection,
            testing and maintenance; (c) take account of hazards that may arise from the failure
            of a single circuit such as a lighting circuit.
          </>
        }
        meaning={
          <>
            Diversity reduces the maximum demand calculation but does not relax circuit division
            rules. Even after applying diversity the installation must still be split into
            circuits in accordance with Reg 314.1 — heat pump on its own circuit, EV charger on
            its own circuit, cooker on its own, ring finals separate from lighting, and so on.
            Diversity is a sizing tool, not a way to merge loads onto fewer circuits.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 314.1 — full text from published amendment."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iii) (maximum allowable current)"
        clause={
          <>
            The documentation shall include maximum current allowable. Designers shall calculate
            and record the maximum permissible current capacity for the supply and protective
            devices as part of supply characteristics.
          </>
        }
        meaning={
          <>
            Recording the maximum demand calculation against the maximum allowable supply current
            is a regulatory requirement, not a courtesy. Reg 132.2(c)(iii) sits under the Reg
            132.13 design-documentation framework — the calculation lives in the design pack
            permanently and travels with the install through commissioning into the customer file.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(iii)."
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'OSG Table A1 covers typical dwelling diversity entry by entry — cooker, shower, immersion, ring final, radial, lighting, EV charger, heat pump. Verify against the current OSG edition; numbers shift.',
          'IET GN1 Section 7 covers non-domestic diversity by category — office, retail, hospitality, education, healthcare, industrial. Worked examples per category.',
          'Coincidence factors at sub-main and origin smooth peaks across many circuits or dwellings. Single dwelling = 1.0; 50+ dwellings around 0.4-0.5. Apply the right coincidence factor for the population size.',
          'Heat pumps default to 100 percent design demand because of long duty cycles. EV chargers default to 100 percent unless OZEV-compliant load-managed, which Reg 722.311.201 permits you to take into account. Document the fall-back behaviour either way.',
          'Modern dwelling load profiles (heat pump + EV + battery) make peaks more correlated and longer in duration. Traditional 1990s OSG numbers may understate peak demand for a 2026 dwelling.',
          'Apartment-block EV charging requires site-wide load management to enforce diversity. Without it, evening peak demand outgrows the supply within 3-5 years of EV penetration reaching ~50 percent.',
          'Reg 722.311.201 permits load curtailment to be taken into account when determining maximum demand. Document the fall-back behaviour and confirm the supply survives it.',
          'Document the full diversity calc as a discrete diversity table page in the design pack — load category, connected load, diversity factor, source citation, resulting Ib. The calc page is the most-audited part of the pack.',
        ]}
      />

      <Quiz title="Diversity factors deep-dive — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
