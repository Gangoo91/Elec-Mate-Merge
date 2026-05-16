/**
 * Module 2 · Section 3 · Subsection 2 — Heat pumps overview (ASHP / GSHP)
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2
 *   AC 1.2 — "specify the main types, characteristics, and purposes of environmental
 *             technology systems"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.1 (fundamental operating principles) and
 * AC 3.2 (applications and limitations).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed heat-pump competence — heat-loss
 * calculation, emitter sizing, refrigerant work, MCS sign-off — belongs in MCS
 * standalone qual 2919, not 2365-03. This Sub gives the L3 electrician enough working
 * knowledge to be a competent installer-side hand on a heat-pump install.
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
  'Heat pumps overview (3.2) | Level 3 Module 2.3.2 | Elec-Mate';
const DESCRIPTION =
  'Heat pumps for the Level 3 electrician — vapour-compression cycle, ASHP vs GSHP, COP / SCOP, electrical interface (32-40 A radial, Type C MCB, RCD, local outdoor isolator), F-Gas boundary, MCS MIS 3005. Working knowledge to be a competent installer-side hand on a heat-pump install — not the lead designer.';

const checks = [
  {
    id: 'l3-m2-s3-sub2-cop-scop',
    question:
      'A heat pump datasheet quotes "COP 4.5 at A7/W35". The customer says "so this thing pays for itself in two winters?". What\'s the honest reply?',
    options: [
      'Yes, the COP figure is what they\'ll see year-round.',
      "COP 4.5 at A7/W35 is the manufacturer's number at outdoor 7°C and flow temperature 35°C — a mild day driving low-temperature underfloor heating. Real seasonal performance (SCOP) averages across the cold snaps and is typically 3.0-3.8 for properly designed UK installs, lower for marginal installs on undersized old radiators. The MCS-certified design produces the SCOP estimate based on the actual building heat loss and emitter design — that's the figure to discuss running costs with. Quoting COP as if it's SCOP overpromises and the customer feels misled when the bills come in.",
      'No — heat pumps never pay back.',
      'Yes — exactly two winters.',
    ],
    correctIndex: 1,
    explanation:
      "COP at standard conditions and SCOP across a UK heating season are different numbers. The MCS standard requires SCOP to be calculated and disclosed on the design pack. As an apprentice working on the install you don't size the system, but you should reinforce the SCOP framing whenever a customer brings up the COP marketing number. The honest framing: 'COP at standard conditions is the lab number; SCOP is the year-round number — your design pack has the SCOP'.",
  },
  {
    id: 'l3-m2-s3-sub2-electrical-interface',
    question:
      'You\'re first-fixing the supply for a 12 kW ASHP that the manufacturer schedule lists as "32 A 230 V single-phase, Type C MCB, sized for sustained continuous load". The unit will sit 25 m from the consumer unit, run via SWA buried in the ground. What\'s the design check?',
    options: [
      'Pop a 2.5 mm² T&E in — it\'s only 32 A.',
      "Size the cable for the sustained load, the installation method (Method D for buried SWA), the ambient temperature, the volt-drop over 25 m, and the protective device. A 32 A continuous load on Method D buried SWA typically lands at 6 mm² 2-core SWA with a 4 mm² CPC, depending on soil conditions and grouping. Volt-drop check: 32 A × 25 m × tabulated mV/A/m for 6 mm² (~7.3 mV) = 5.8 V = 2.5% — within the 3% Reg 525.1.1 limit for a power circuit. Type C MCB (or Type D) handles compressor inrush. Manufacturer's instructions confirm RCD type required (often Type B or RDC-DD per Section 411.3.3 / 415.1).",
      'A 13 A spur off the kitchen ring final.',
      '110 V CTE supply via a transformer.',
    ],
    correctIndex: 1,
    explanation:
      "Heat-pump cable sizing is a normal BS 7671 design exercise — but with three constraints to watch. Continuous load (heat pumps run for hours, not minutes — thermal capacity matters); inrush (compressor start-up — Type C or D MCB needed); volt-drop over distance (outdoor units are often 10-30 m from the CU). The manufacturer's installation instructions state the supply requirements; the electrician designs the supply to satisfy them and BS 7671. The MCS heat-pump design pack normally includes the electrical schedule.",
  },
  {
    id: 'l3-m2-s3-sub2-fgas-boundary',
    question:
      'On a heat-pump install the indoor unit is in place and the outdoor unit is bolted down. The customer asks if you can connect the refrigerant pipework "while you\'re here". What\'s the answer?',
    options: [
      'Sure — just brazed copper, simple enough.',
      "No. Refrigerant work is restricted to F-Gas-certified personnel only, under the F-Gas Regulations (assimilated EU Regulation 517/2014, retained in UK law). Connecting refrigerant pipework, charging the system, recovering refrigerant — all require F-Gas certification, even for the small charges in domestic heat pumps. Working without certification is a criminal offence and invalidates the manufacturer's warranty. As the electrician your boundary is the electrical supply, isolation, controls and bonding — not the refrigerant circuit.",
      'Yes, as long as you wear gloves.',
      'Only if the customer signs a waiver.',
    ],
    correctIndex: 1,
    explanation:
      "F-Gas certification is a personal qualification, not a company-wide one — you have to be certified yourself to work on the refrigerant. The Environment Agency / equivalent enforces. Trade boundaries on a heat-pump install are clear: F-Gas certified for refrigerant, electrician for supply and controls, plumber for the wet system. Crossing a boundary risks prosecution and warranty invalidation. The customer's 'while you're here' request always gets a polite 'that's not my trade' answer.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Describe the vapour-compression cycle that drives a heat pump in plain English.',
    options: [
      'Resistive heating in a coil.',
      "Refrigerant evaporates at low temperature in the outdoor coil (or ground loop), absorbing heat from the source. The compressor squeezes the resulting low-pressure vapour, raising its pressure and temperature. The hot high-pressure vapour condenses in the indoor heat exchanger, releasing heat into the wet heating system. The liquid refrigerant expands back to low pressure through the expansion valve and the cycle repeats. Electrical work drives the compressor; the heat in the wet system comes from outside, not from the electricity. Energy is conserved.",
      'A flame burns the refrigerant.',
      'A solar panel heats the water directly.',
    ],
    correctAnswer: 1,
    explanation:
      "The fridge analogy is the most accurate plain-English explanation. Same cycle, opposite direction — a fridge moves heat from inside to the room; a heat pump moves heat from outside to the building. The compressor consumes electricity (the work input); the rest of the cycle moves heat against the temperature gradient. The first law of thermodynamics is satisfied — total energy in equals total energy out, with the electricity buying the temperature lift.",
  },
  {
    id: 2,
    question:
      'What\'s the practical difference in source temperature between ASHP and GSHP, and how does it affect SCOP?',
    options: [
      'No difference — both work the same.',
      "ASHP source is outdoor air, which in the UK varies from -10°C in cold spells to 25°C+ in summer. The cold-day source temperature drops the COP because the unit has a bigger temperature lift to make. GSHP source is the ground at 1-2 m depth (horizontal slinky) or at 50-150 m depth (borehole), which sits at a stable 8-12°C year-round. So GSHP doesn't suffer the cold-day SCOP penalty — typical SCOP 4.0-5.0 vs ASHP 2.8-3.8. The trade-off is GSHP capital cost (£20-35k vs £10-15k for ASHP) and constructability (boreholes / trenching).",
      'GSHP runs cooler so its SCOP is lower.',
      'ASHP only works in summer.',
    ],
    correctAnswer: 1,
    explanation:
      "The temperature lift is the headline efficiency driver. Smaller lift = higher COP. GSHP wins on stability of source temperature; ASHP wins on installation cost and disruption. Modern variable-speed inverter-driven ASHP units have closed the SCOP gap considerably — well-designed UK ASHP installs now post SCOP 3.5+ regularly. The 'GSHP is automatically better' framing is dated; the right answer is site-specific.",
  },
  {
    id: 3,
    question:
      'Why does heat pump SCOP suffer when the wet system is undersized old radiators?',
    options: [
      'Old radiators waste heat to the wall behind them.',
      "Old radiators were sized for 70-80°C flow temperature from a gas boiler. To deliver the same heat output at lower flow temperature, the radiators need to be larger. If you ask a heat pump to drive undersized old radiators at 70-80°C flow, the temperature lift is much bigger than at 35-40°C flow — so the COP drops sharply. SCOP reflects the actual flow temperature the system runs at across the heating season. Properly designed heat-pump retrofits include a radiator survey and upsize plan, or convert to underfloor where possible.",
      'Old radiators are made of iron not steel.',
      'They have rust inside.',
    ],
    correctAnswer: 1,
    explanation:
      "Flow temperature is the SCOP killer when you get it wrong. The MCS heat-pump design methodology includes the room-by-room emitter sizing. Skipping the radiator survey and 'just plumbing it in' to the existing radiators is the main cause of disappointing real-world heat pump performance. As the electrician you don't size emitters but you should be alert when an install has skipped the radiator step.",
  },
  {
    id: 4,
    question:
      'What\'s the typical electrical interface for a 8-12 kW domestic ASHP?',
    options: [
      'A 13 A plug socket.',
      "Dedicated radial circuit, typically 32 A or 40 A on a Type C (or D) MCB, in 6 mm² T&E or SWA depending on installation method and length. RCD per BS 7671 Section 411.3.3 / 415.1 — type per manufacturer's instruction (often Type A or Type B / RDC-DD). Local rotary or DP isolator outdoors at the unit. Smart controls integration via dedicated low-voltage cable. Cyclic-rated cable selection — heat pumps run for hours not minutes. Manufacturer's bonding requirements where the chassis forms an extraneous-conductive part.",
      'A 30 A blue Commando socket.',
      'A 16 A Type B MCB on a ring final.',
    ],
    correctAnswer: 1,
    explanation:
      "The supply is sized for the unit's nameplate maximum — not the average. Manufacturer schedules are explicit on cable size, MCB type, RCD type. The local outdoor isolator is a maintenance-and-emergency interface, used by the F-Gas engineer. Inrush from compressor start-up justifies the Type C or Type D MCB; nuisance tripping is a textbook commissioning issue if Type B is fitted instead.",
  },
  {
    id: 5,
    question:
      'When is a heat pump SCOP figure of 3.5 considered "good"?',
    options: [
      'It\'s never good — heat pumps need SCOP 6+ to be worth fitting.',
      "SCOP 3.5 is solid for a UK domestic ASHP install — it means each kWh of electricity delivers 3.5 kWh of heat. On a UK grid carbon intensity of ~200 gCO₂/kWh, that's roughly 57 gCO₂ per kWh of heat — about 3.7× cleaner than burning gas (which emits ~210 gCO₂ per useful kWh). Top-end UK ASHP installs reach SCOP 3.8-4.2; GSHP can reach SCOP 4.5-5.0+. SCOP under 2.8 suggests something is wrong (oversized unit, undersized emitters, poorly insulated property, high flow temperature).",
      'SCOP doesn\'t matter — only COP.',
      'Anything under 5 is a failure.',
    ],
    correctAnswer: 1,
    explanation:
      "The SCOP scale needs context. 'Good' depends on the unit type, the emitter design and the building. The MCS performance estimate gives a reference SCOP for the specific install; comparing the as-built SCOP to that estimate tells the customer whether the system is performing as designed.",
  },
  {
    id: 6,
    question:
      'What\'s the F-Gas certification framework and where does it apply?',
    options: [
      'It\'s an EU-only rule — gone after Brexit.',
      "F-Gas Regulations (assimilated EU Regulation 517/2014, retained in UK law post-Brexit, with some divergence) require any work on systems containing fluorinated greenhouse gases (the refrigerants used in heat pumps and air conditioning) to be done by F-Gas-certified personnel. Connecting refrigerant pipework, charging, recovering refrigerant, leak testing — all require certification. The Environment Agency enforces in England; equivalents in the devolved nations. Working without certification is a criminal offence and invalidates manufacturer warranties.",
      'It only applies to large commercial systems.',
      'It only applies to ammonia systems.',
    ],
    correctAnswer: 1,
    explanation:
      "F-Gas applies to almost all common heat pump refrigerants (R32, R410A, R134a — all fluorinated). Newer natural-refrigerant heat pumps (R290 propane) sit outside F-Gas but bring their own competence requirements (BS EN 378, COSHH, gas-installer-style competencies). The trade-boundary on a heat-pump install is unambiguous: F-Gas certified for refrigerant; electrician for the electrical supply and controls; plumber for the wet system; MCS-certified designer signs off the installation.",
  },
  {
    id: 7,
    question:
      'Why does the outdoor unit of an ASHP sometimes need bonding to the MET?',
    options: [
      'Just a cosmetic preference.',
      "If the outdoor unit's metal chassis is in contact with the building structure or an extraneous-conductive part (e.g. a metal mounting bracket on a building's exposed steelwork), or if the unit forms part of an exposed-conductive-part of the electrical installation that requires equipotential bonding under BS 7671 Section 411 / 415, then bonding to the MET is required. The manufacturer's instructions usually state the bonding requirements explicitly. Don't bond unnecessarily but don't omit a needed bond.",
      'Always bond — no exceptions.',
      'Never bond — outdoor units are non-conductive.',
    ],
    correctAnswer: 1,
    explanation:
      "Bonding decisions are application-specific. The general rule (Section 411.3.1.2 main bonding, Section 415.2 supplementary bonding) applies as it would for any extraneous-conductive part. An ASHP unit on an insulating mounting on a brick wall typically does not need a bond; the same unit on a steel-clad building's exterior may need one. The manufacturer's instructions plus the BS 7671 bonding logic decide.",
  },
  {
    id: 8,
    question:
      'A customer asks "can I just fit one of these myself?". What\'s the responsible answer?',
    options: [
      'Yes — it\'s only plumbing and electrics.',
      "No, for several reasons. The refrigerant work requires F-Gas certification (criminal offence to do without). The Building Regulations Part L compliance pathway requires installation by an MCS-certified installer for the customer to claim Smart Export Guarantee or similar incentives. The Boiler Upgrade Scheme grant requires MCS sign-off. Manufacturer warranties typically require certified installation. The MCS install pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule, commissioning records — all required for the system to perform as designed. DIY heat-pump install is unsafe and uneconomic.",
      'Yes, if they take a YouTube course first.',
      'Only on Sundays.',
    ],
    correctAnswer: 1,
    explanation:
      "Heat pumps look like 'plumb a box, plug it in' but the design and certification chain is what makes them work. Without MCS sign-off the customer loses access to incentives, BUS grants and a properly designed system. Without F-Gas certification any refrigerant work is a criminal offence. The honest customer-facing answer is 'this is a multi-trade certified install — DIY isn't a viable route'.",
  },
];

const faqs = [
  {
    question: "What's the difference between a 'monobloc' and a 'split' ASHP?",
    answer:
      "A monobloc ASHP has the entire refrigerant circuit factory-sealed inside the outdoor unit. The wet heating system pipework runs between the outdoor unit and the indoor cylinder / buffer. The refrigerant never leaves the outdoor unit, so no F-Gas work is required on site for the refrigerant connections — though F-Gas is still needed for any future service. A split ASHP has the refrigerant circuit split between an outdoor unit (compressor, outdoor coil) and an indoor unit (condenser, controls), with refrigerant pipework run between them on site by an F-Gas-certified engineer. Monobloc is simpler to install (no on-site refrigerant work), split offers more flexibility on indoor unit placement.",
  },
  {
    question: "Why does the ASHP outdoor unit blow cold air in winter?",
    answer:
      "Because that's the air it's just extracted heat from. The unit is upgrading low-grade outdoor heat to useful temperature for the wet system; the air leaving the unit is colder than the air entering it (typically 5-10°C colder). It's the same physics as a fridge — the back of the fridge is warm because the cabinet is cold. Customers who don't know this sometimes complain 'the heat pump is making the garden cold'. The honest framing: 'it's harvesting heat from the air and the air leaves cooler — that's how it works'.",
  },
  {
    question: "How does a heat pump cope with defrost cycles in winter?",
    answer:
      "When the outdoor coil drops below 0°C with humid air around it, frost accumulates on the coil and reduces heat transfer. The unit periodically reverses the cycle — sending hot refrigerant to the outdoor coil to melt the frost, then resuming heating mode. During defrost the unit briefly stops heating the property; well-designed systems with a buffer tank ride through this without temperature drop. Manufacturers publish defrost characteristics; SCOP figures account for typical defrost frequency.",
  },
  {
    question: "What's the noise impact and what regulations apply?",
    answer:
      "Modern ASHP outdoor units typically operate around 45-55 dB at 1 m on full load — comparable to a quiet conversation. UK Permitted Development Rights for ASHP installation include noise compliance with MCS 020 (sound assessment methodology); installations that fail the MCS 020 calculation lose Permitted Development and require full planning. Practical placement guidance: away from neighbour boundaries, away from bedroom windows, on resilient mountings to prevent vibration transmission.",
  },
  {
    question: "Can I run a heat pump on a standard 16 A supply?",
    answer:
      "Only the smallest units (typically up to about 5 kW heat output, depending on COP and ambient). Mid-size units (8-12 kW) typically need 32 A; larger units (16 kW+) often three-phase 32-40 A per phase. The manufacturer's installation manual states the supply requirement explicitly. Don't assume — check the schedule. Inrush from compressor start-up usually warrants a Type C or Type D MCB to prevent nuisance tripping.",
  },
  {
    question: "What's the difference between a heat pump for heating-only and one for heating and cooling?",
    answer:
      "Some ASHP units are reversible — they can run the cycle backwards in summer to extract heat from the property and reject it outdoors (i.e. air conditioning mode). Reversible units are common in commercial premises and in some UK domestic installs where summer comfort matters. The wet emitters used for heating (radiators, underfloor) can also accept the cooling flow, though dewpoint and condensation control becomes important. Heating-only units are simpler and slightly cheaper; reversible units add summer cooling at modest extra cost.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 2"
            title="Heat pumps — overview for the L3 electrician"
            description="Vapour-compression cycle, ASHP vs GSHP, COP and SCOP, the electrical interface, the F-Gas trade boundary, and where the L3 electrician's responsibility starts and ends on a heat-pump install."
            tone="emerald"
          />

          <TLDR
            points={[
              "Heat pumps are upgraders — they move heat from a cold source (air or ground) to a hotter wet system using electrical work to drive a vapour-compression cycle. Energy is conserved; the electricity buys the temperature lift.",
              "ASHP source is outdoor air (variable, -10°C to 25°C+); GSHP source is the ground at 8-12°C (stable). GSHP gets higher SCOP (4.0-5.0); ASHP is cheaper to install (£10-15k vs £20-35k).",
              "COP is the lab number at standard conditions (e.g. A7/W35). SCOP is the year-round seasonal average — that's the figure the customer should use for running-cost expectations.",
              "Electrical interface — typically 32-40 A radial, Type C or D MCB, RCD per Section 411 / 415, local outdoor isolator, smart controls. F-Gas work on the refrigerant circuit is not your trade.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the vapour-compression cycle that drives a heat pump in plain English suitable for a customer conversation.",
              "Distinguish ASHP from GSHP in terms of source temperature, typical SCOP, capital cost and constructability.",
              "Distinguish COP from SCOP and explain why SCOP is the figure to use for running-cost discussion with the customer.",
              "Identify the typical electrical supply requirements for a domestic ASHP — cable size, MCB type, RCD, local isolation, controls.",
              "Recognise the F-Gas certification boundary — refrigerant work is restricted to F-Gas-certified personnel only.",
              "Recognise BS 7671 Section 411 / 415 / 753 (where heating cables form part of the wet system) and MCS MIS 3005 as the relevant regulatory homes for heat-pump electrical and installation requirements.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>How a heat pump actually works</ContentEyebrow>

          <ConceptBlock
            title="The vapour-compression cycle in plain English"
            plainEnglish="A heat pump is a fridge running backwards. The fridge moves heat from inside the cabinet to the room; the heat pump moves heat from outside the building to inside. Same cycle, same components, opposite direction. A refrigerant evaporates at low temperature in the outdoor coil (or ground loop), absorbing heat from the source. The compressor squeezes the resulting vapour, raising its pressure and temperature. The hot vapour condenses in the indoor heat exchanger, releasing heat into the wet heating system. The liquid refrigerant expands back to low pressure through the expansion valve and the cycle repeats."
            onSite="Electrical work drives the compressor — the rest of the cycle moves heat against the temperature gradient. The first law of thermodynamics is satisfied; total energy in equals total energy out. The COP measures how much useful heat each kilowatt-hour of electricity moves."
          >
            <p>
              The four components of every heat pump:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Evaporator</strong> — outdoor coil (ASHP) or ground loop heat
                exchanger (GSHP). Refrigerant evaporates at low temperature, absorbing heat
                from the source.
              </li>
              <li>
                <strong>Compressor</strong> — driven by an electric motor. Squeezes the
                low-pressure vapour to high pressure, raising its temperature. This is the
                only component that consumes the electrical input.
              </li>
              <li>
                <strong>Condenser</strong> — indoor heat exchanger. The hot refrigerant
                condenses back to liquid, releasing heat into the wet system at useful
                temperature.
              </li>
              <li>
                <strong>Expansion valve</strong> — restricts flow, allowing the
                high-pressure liquid to expand back to low pressure for the next evaporation
                cycle.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>ASHP vs GSHP — the trade-off</ContentEyebrow>

          <ConceptBlock
            title="Source temperature is the headline efficiency driver"
            plainEnglish="The bigger the temperature lift the unit has to make, the lower the COP. ASHP source is outdoor air — varies from -10°C in cold spells to 25°C+ in summer. On a -5°C frost morning the ASHP has a 40-45°C lift to deliver useful 35-45°C flow temperature to the wet system; that drops the COP. GSHP source is the ground at 8-12°C year-round — typically a 25-30°C lift, smaller and more stable than ASHP."
            onSite="Modern variable-speed inverter-driven ASHP has closed the SCOP gap considerably — well-designed UK ASHP installs now post SCOP 3.5+ regularly. GSHP still wins on SCOP and lifetime, but the gap is no longer huge. The decision is mostly site-specific (does the property have land for a ground array?) and budget-specific (£10-15k vs £20-35k typical capital cost)."
          >
            <p>
              When each system fits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ASHP suits</strong> — most UK retrofit, typical urban / suburban
                domestic, properties without land for ground arrays, customers prioritising
                cost and speed of install. Performance is now respectable; install is
                straightforward.
              </li>
              <li>
                <strong>GSHP suits</strong> — new-build with land available (horizontal
                slinky in a large garden), or properties prepared to accept borehole drilling
                cost (50-150 m vertical wells). Customers wanting maximum SCOP and longest
                equipment life. Most often seen on estate-scale rural new-build.
              </li>
              <li>
                <strong>Hybrid heat pump suits</strong> — older properties where full
                heat-pump-only retrofit is impractical (undersized radiator system, hard to
                insulate envelope). The heat pump handles the bulk of the season at high
                SCOP; the gas boiler kicks in for cold spells.
              </li>
              <li>
                <strong>Water-source heat pump suits</strong> — niche; properties next to a
                lake, river or borehole well. Excellent performance where the source
                exists. Rare in UK domestic.
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

          <SectionRule />

          <ContentEyebrow>The electrical interface</ContentEyebrow>

          <ConceptBlock
            title="Sizing the supply for sustained continuous load"
            plainEnglish="A heat pump runs at significant load for hours at a time during the heating season — sometimes the entire daytime in cold weather. The supply is sized for the unit's nameplate maximum, not the average. Cable thermal capacity is the design constraint, not voltage drop. Inrush from compressor start-up is enough to nuisance-trip a Type B MCB; Type C or Type D is the standard choice."
            onSite="The manufacturer's installation manual states the supply requirements explicitly — cable size, MCB rating and type, RCD type. Don't second-guess the manual. The MCS heat-pump design pack normally includes the electrical schedule. As the electrician you fit the supply per the schedule, verify per BS 7671, and provide the local outdoor isolation."
          >
            <p>
              Typical electrical interface for a domestic ASHP:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply</strong> — dedicated radial circuit. 32 A for 8-12 kW units,
                40 A for 14-16 kW. Three-phase for larger or commercial units.
              </li>
              <li>
                <strong>Cable</strong> — 6 mm² T&E or SWA for 32 A; 10 mm² for 40 A;
                installation method (Method A clipped direct, Method C in cable trays, Method
                D buried) drives the actual rating. Voltage drop check over the run length.
              </li>
              <li>
                <strong>Protection</strong> — Type C or Type D MCB to handle compressor
                inrush. RCD per BS 7671 Section 411.3.3 / 415.1 — type per manufacturer's
                instruction. Some heat pumps require Type B RCD (DC fault detection); modern
                inverter-driven units may require RDC-DD per Section 722-style guidance.
              </li>
              <li>
                <strong>Isolation</strong> — local outdoor rotary or DP isolator at the
                outdoor unit. Maintenance and emergency interface for the F-Gas engineer.
              </li>
              <li>
                <strong>Controls</strong> — dedicated low-voltage cable for thermostat, hot
                water cylinder probe, smart controls integration. Cat5e/Cat6 increasingly
                common for IP-based smart controls.
              </li>
              <li>
                <strong>Bonding</strong> — manufacturer\'s instructions plus BS 7671 Section
                411 / 415 logic. Bond if the unit chassis forms part of an extraneous-
                conductive part of the building.
              </li>
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

          <ContentEyebrow>The F-Gas trade boundary</ContentEyebrow>

          <ConceptBlock
            title="Refrigerant work is not your trade"
            plainEnglish="Heat pumps contain fluorinated greenhouse-gas refrigerants (R32, R410A, R134a, etc.) under the F-Gas Regulations. Any work that breaks into the refrigerant circuit — connecting pipework, charging, recovering refrigerant, leak testing — is restricted to F-Gas-certified personnel. The certification is personal, not company-wide. Working without certification is a criminal offence and invalidates the manufacturer\'s warranty."
            onSite="On a typical ASHP install the trade boundaries are clear: F-Gas-certified engineer for refrigerant; you for the electrical supply, isolation, bonding and controls; plumber for the wet system; MCS-certified designer (often the lead trade) signs off the install. Customer requests that cross your boundary — &quot;while you\'re here, can you connect the refrigerant pipework?&quot; — get a polite &quot;that\'s not my trade&quot; answer."
          >
            <p>
              The F-Gas certification framework:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                F-Gas Regulations are the assimilated EU Regulation 517/2014, retained in UK
                law post-Brexit (with some divergence). The Environment Agency enforces in
                England; equivalents in the devolved nations.
              </li>
              <li>
                Certification covers refrigerant handling, recovery, leak detection,
                installation and decommissioning. Different categories cover different
                charge-size ranges.
              </li>
              <li>
                Newer natural-refrigerant heat pumps (R290 propane) sit outside F-Gas but
                bring their own competence requirements — BS EN 378, COSHH, gas-installer-
                style competencies.
              </li>
              <li>
                Monobloc ASHP avoids on-site F-Gas work because the refrigerant circuit is
                factory-sealed inside the outdoor unit. Split ASHP requires F-Gas work for
                pipework connection.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Regulatory map for the heat-pump install</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 753 (Heating cables and embedded heating systems) — relevant where heat pump output drives underfloor heating with embedded cables"
            clause={
              <>
                Section 753 covers electric heating systems for surface heating, including
                embedded heating cables in floor screeds. Although heat-pump-fed underfloor
                heating typically uses water-filled pipes (not heating cables), Section 753
                applies wherever the wet system is supplemented by, or replaced with, electric
                heating cables (e.g. trace heating on outdoor pipework, or hybrid arrangements).
                Section 753 has been completely revised in A4:2026.
              </>
            }
            meaning={
              <>
                Section 753 is the relevant BS 7671 section for any embedded electric heating.
                Pure water-based underfloor heating fed by a heat pump is governed by general
                requirements (Part 4 / 5 / 6), not Section 753. But hybrid systems combining
                wet underfloor with heating cables, or trace-heated outdoor pipework, fall
                within Section 753. As Unit 301 is overview level, recognise where Section 753
                sits in the regulation map.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 753 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <RegsCallout
            source="MCS Installation Standard MIS 3005 (Heat Pumps) — paraphrased"
            clause={
              <>
                MIS 3005 is the MCS Installation Standard for heat pumps. It covers site
                survey, room-by-room heat-loss calculation, emitter sizing, system design,
                installation quality, commissioning, performance estimate (SCOP), customer
                handover documentation and labelling. Compliance with MIS 3005 is required
                for the customer to access the Boiler Upgrade Scheme grant and for many
                manufacturer warranties.
              </>
            }
            meaning={
              <>
                MIS 3005 is the certification and quality standard the MCS-certified designer
                works to. It references BS 7671 explicitly for the electrical detail. As an
                apprentice on the install, you work to the MCS designer\'s specification and
                the BS 7671 electrical requirements — you don\'t sign off MIS 3005 yourself
                unless you\'re personally certified. The MIS 3005 handover pack includes the
                heat-loss calc, emitter sizing, SCOP estimate and electrical schedule.
              </>
            }
            cite="Source: MCS Installation Standard MIS 3005 — paraphrased from the published standard available via the MCS website."
          />

          <SectionRule />

          <ContentEyebrow>Heat-loss survey — the single biggest design driver</ContentEyebrow>

          <ConceptBlock
            title="Room-by-room heat loss is the foundation of the entire design"
            plainEnglish="Every MCS-certified heat pump install starts with a room-by-room heat-loss calculation per the methodology in MCS MIS 3005. The designer measures every room&apos;s area, volume, exposed wall area, glazing area, ventilation rate and target internal temperature, looks up the U-values of every fabric element, and calculates the steady-state heat loss in watts at the design outdoor temperature for the locality (typically -2 to -5 degC for England). Sum the rooms and you have the property&apos;s design heat-loss demand — the headline number the heat pump has to meet on the worst day of the heating season."
            onSite="The L3 apprentice does not run the heat-loss calc. But you should recognise its outputs and respect them. The calc determines: the heat pump rating (kW), the radiator or underfloor sizing for each room, the flow temperature target, the SCOP estimate, and ultimately the customer&apos;s expected running cost. An undersized heat pump will fail to meet the design temperature in cold weather; an oversized one cycles inefficiently and costs more than necessary. The MCS designer signs off the calc; the apprentice executes the install per the design."
          >
            <p>
              The heat-loss calc inputs and outputs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fabric U-values</strong> — walls, roof, floor, windows, doors. From
                construction type or thermal imaging.
              </li>
              <li>
                <strong>Air permeability</strong> — measured or assumed. Drives ventilation
                heat loss.
              </li>
              <li>
                <strong>Design outdoor temperature</strong> — locality-specific, typically
                -2 degC for southern England, -3 to -5 degC for northern England and
                Scotland.
              </li>
              <li>
                <strong>Internal target temperature</strong> — typically 21 degC living
                spaces, 18 degC bedrooms, 22 degC bathrooms.
              </li>
              <li>
                <strong>Output 1 — heat pump rating</strong> — total property design
                heat loss in kW, rounded to the nearest available unit.
              </li>
              <li>
                <strong>Output 2 — emitter size per room</strong> — radiator or
                underfloor heat output required at the chosen flow temperature.
              </li>
              <li>
                <strong>Output 3 — flow temperature target</strong> — typically 35-45
                degC for new-build with underfloor or oversized radiators, 50-55 degC
                for retrofit with upgraded radiators.
              </li>
              <li>
                <strong>Output 4 — SCOP estimate</strong> — annual seasonal performance
                given the chosen flow temperature and the design heat loss.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Low-temperature emitters and the radiator question</ContentEyebrow>

          <ConceptBlock
            title="Heat pump SCOP lives or dies on the emitter sizing"
            plainEnglish="A radiator&apos;s heat output drops sharply as the flow temperature drops. A radiator sized for 70 degC gas-boiler flow puts out roughly 40-50% of its rated output at 45 degC heat pump flow. To deliver the same room heat at lower flow temperatures, the radiator has to be physically larger — typically doubled in surface area, often replaced with a deeper double or triple convector, or replaced with underfloor heating. Without the emitter upgrade the heat pump runs at higher flow temperature, posts a worse SCOP, and the customer&apos;s bills are higher than they should be."
            onSite="The L3 apprentice contribution on the emitter side is normally zero — that is the heating engineer&apos;s scope. But you should recognise that emitter sizing is the silent SCOP-killer of poorly-designed heat pump installs. When a customer reports &quot;the heat pump bills are higher than I expected&quot;, the diagnosis often traces back to undersized radiators forcing a 55-60 degC flow temperature instead of the design 45 degC. The MCS designer&apos;s emitter survey is the document that proves the install will hit its claimed SCOP."
          >
            <p>
              Emitter options at heat pump flow temperatures:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor heating</strong> — best fit. Large surface area,
                low flow temperature (35-40 degC). Highest SCOP. Easy in new-build,
                disruptive in retrofit.
              </li>
              <li>
                <strong>Oversized radiators</strong> — typical retrofit solution.
                Replace single panels with double or triple convectors; physically
                larger units; flow temperature 45-50 degC.
              </li>
              <li>
                <strong>Fan-assisted radiators</strong> — typical compact units with a
                small fan to boost convective output. Useful where physical space
                limits radiator size. Slight noise; small electrical load (typically
                fed from the heat pump controls).
              </li>
              <li>
                <strong>Existing radiators kept</strong> — only acceptable if the
                radiators are already oversized for the room (common in older homes
                with original cast-iron or large convector radiators) or if the
                customer accepts a higher flow temperature (55-60 degC) and the lower
                SCOP that comes with it.
              </li>
              <li>
                <strong>High-temperature heat pump</strong> — alternative to emitter
                upgrade. Two-stage compression or CO2 refrigerant delivers 65-80 degC
                flow. SCOP lower (2.5-3.0) but emitter upgrade avoided.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The defrost cycle — why the unit blows cold air sometimes</ContentEyebrow>

          <ConceptBlock
            title="ASHP defrost is normal behaviour — the customer should be briefed"
            plainEnglish="When the outdoor temperature drops below about 6-7 degC and humidity is high, frost forms on the outdoor coil of an ASHP. Frost reduces airflow and degrades heat transfer; if left to build up, the unit&apos;s output and SCOP collapse. The unit handles this by periodically reversing the cycle for a few minutes — running heat from the indoor side to the outdoor coil to melt the frost. Customers see steam and water dripping from the outdoor unit, hear a slight change in compressor sound, and may feel the wet system go briefly lukewarm. This is normal. Untrained customers sometimes call the installer reporting &quot;the heat pump is broken&quot;."
            onSite="The L3 apprentice should know that the defrost cycle is normal and brief the customer at handover. Modern inverter-driven units handle the cycle smoothly — typical defrost lasts 5-10 minutes, occurs every 30-60 minutes during cold-and-damp weather, and barely affects the room temperature. The wet system has enough thermal mass that the brief reversal does not cool the radiators meaningfully. Customer report &quot;steam coming off my heat pump in the mornings&quot; is normal defrost behaviour, not a fault. If defrost is happening too often (every few minutes) or lasting too long, the unit may have a refrigerant charge issue or a coil problem — F-Gas engineer scope."
          >
            <p>
              Defrost cycle facts to brief customers on:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>When it happens</strong> — outdoor temperature below 6-7 degC
                with humidity. Most common in autumn and spring; rare in dry cold
                spells.
              </li>
              <li>
                <strong>What it looks like</strong> — steam from the outdoor unit,
                water dripping from the coil, brief change in compressor sound.
              </li>
              <li>
                <strong>How long it lasts</strong> — typically 5-10 minutes per cycle.
              </li>
              <li>
                <strong>How often</strong> — every 30-60 minutes during defrost-prone
                weather; not at all in dry cold.
              </li>
              <li>
                <strong>Effect on room temperature</strong> — barely noticeable on a
                well-designed install with adequate emitter sizing and a buffer
                cylinder.
              </li>
              <li>
                <strong>When it is a problem</strong> — defrost every few minutes, or
                lasting more than 15 minutes, indicates a refrigerant or coil issue.
                F-Gas engineer scope.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Heat pump scheduling and tariff awareness</ContentEyebrow>

          <ConceptBlock
            title="Smart scheduling on a dynamic tariff transforms heat pump running cost"
            plainEnglish="A heat pump on a flat-rate single-tariff property runs whenever the controls call for heat. A heat pump on a dynamic time-of-use tariff (Octopus Cosy, Agile, Intelligent Octopus Go) can pre-heat the property and the cylinder during cheap windows and coast through expensive windows on stored thermal mass. The same physical install can have its running cost halved by smart scheduling on the right tariff."
            onSite="The L3 apprentice contribution on the scheduling side is the controls cabling and the smart-controls integration. The actual scheduling is configured by the customer or the HEMS / supplier. Recognise that the customer&apos;s tariff choice affects the bill more than any further upgrade to the heat pump itself. Briefing the customer on the tariff opportunity at handover is part of a full handover — many customers do not realise that switching tariff can cut their heat pump bill by 30-50%."
          >
            <p>
              The scheduling-and-tariff opportunity:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Octopus Cosy</strong> — cheap rates 04:00-07:00 and
                13:00-16:00; expensive 16:00-19:00. Ideal for heat pump pre-heat in
                the off-peak windows.
              </li>
              <li>
                <strong>Octopus Agile</strong> — half-hourly variable pricing tracking
                wholesale; HEMS-controlled scheduling adapts automatically.
              </li>
              <li>
                <strong>Intelligent Octopus Go</strong> — combined EV plus heat pump
                tariff with dispatch managed by the supplier. Customer pays a flat
                cheap rate during dispatched periods.
              </li>
              <li>
                <strong>Buffer cylinder</strong> — a thermal store between the heat
                pump and the wet system lets the heat pump run flat in cheap windows
                and discharge through expensive windows. Increasingly common on
                dynamic-tariff installs.
              </li>
              <li>
                <strong>Pre-heat the building fabric</strong> — well-insulated homes
                hold heat for hours; pre-heating during off-peak and coasting through
                peak is feasible.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Sizing the supply on the unit\'s average load instead of the nameplate maximum"
            whatHappens={
              <>
                Apprentice sees a 10 kW heat pump with an &quot;average load 1.8 kW&quot;
                figure on the marketing brochure and pops in a 16 A supply. First cold spell,
                the unit hits its nameplate maximum and the MCB trips. Or the cable runs
                warm under sustained load and the insulation degrades over months. The
                manufacturer&apos;s installation manual specified 32 A; the apprentice didn&apos;t
                read it.
              </>
            }
            doInstead={
              <>
                Always size the supply for the nameplate maximum stated in the manufacturer&apos;s
                installation manual. Heat pumps are continuous-load devices — the cable
                thermal rating is the design constraint, not the average load. Type C or
                Type D MCB to handle compressor inrush. RCD type per the manufacturer&apos;s
                instruction (some inverter-driven units require Type B for DC fault
                detection). Voltage-drop check over the run length.
              </>
            }
          />

          <CommonMistake
            title="Connecting the refrigerant pipework because the customer asks"
            whatHappens={
              <>
                Customer says &quot;the F-Gas guy isn&apos;t coming until next week — can you
                just connect the pipes so I can use the system?&quot;. Apprentice obliges
                with a few brazed joints. Refrigerant leaks out, the system underperforms,
                the manufacturer voids the warranty, and the apprentice is exposed to a
                criminal offence under the F-Gas Regulations.
              </>
            }
            doInstead={
              <>
                Refrigerant work is F-Gas-certified-only. Polite refusal is the only correct
                answer. Explain to the customer that the F-Gas work is a separate trade
                boundary — same as you wouldn&apos;t expect the F-Gas engineer to wire the
                supply. The customer&apos;s timeline pressure is not a justification for
                taking on work outside your trade.
              </>
            }
          />

          <Scenario
            title="ASHP first-fix — supply, isolation, controls, bonding"
            situation={
              <>
                You&apos;re first-fixing the electrical supply for a 12 kW ASHP retrofit on a
                three-bed semi. The MCS designer&apos;s schedule specifies: 32 A radial,
                Type C MCB, Type B RCD, 6 mm² 2-core SWA buried in trench from CU to outdoor
                unit (28 m), local rotary isolator at the outdoor unit, dedicated Cat6 for
                smart controls back to the indoor cylinder location. The customer wants the
                supply ready for the F-Gas commissioning visit next week.
              </>
            }
            whatToDo={
              <>
                Run the design check first. 6 mm² 2-core SWA buried (Method D), 32 A,
                ambient soil 15°C, single circuit, ungrouped — tabulated current rating ample.
                Volt-drop: 32 A × 28 m × ~7.3 mV/A/m for 6 mm² = ~6.5 V = ~2.8% — within the
                3% Reg 525.1.1 limit for power circuits with margin. Type C MCB and Type B
                RCD per schedule. Earth via a 4 mm² CPC plus the SWA armour bonded at both
                ends. Local outdoor rotary isolator at the unit (IP-rated for outdoor use,
                lockable). Cat6 separate from the SWA in conduit or duct. Verify the
                installation per BS 7671 — continuity, IR, polarity, Zs at the local
                isolator, RCD test. Label the CU MCB, the local isolator, and the SWA route.
                Hand over to the F-Gas engineer with a confirmed dead-test on the supply
                terminals at the indoor unit.
              </>
            }
            whyItMatters={
              <>
                The first-fix electrical supply has to be right because the F-Gas engineer
                arriving next week needs to commission the unit safely. Wrong cable size =
                nuisance tripping; wrong MCB type = inrush trips; missing isolation = unsafe
                refrigerant work; missing labelling = future maintainer confusion. The
                handover dead-test confirms the F-Gas engineer can trust the supply. Your
                trade boundary stops at the unit terminals — the F-Gas commissioning is theirs.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs in AC final circuits)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc
                fault detection devices (AFDDs) to mitigate the risk of fire in AC final
                circuits of a fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning={
              <>
                A heat-pump radial is a high-current AC final circuit running for hours. The
                AFDD recommendation in 421.1.7 sits well with that profile. The wording is
                advisory, not mandatory — but in HRRBs and increasingly on competent-designer
                spec sheets you&apos;ll see AFDDs fitted as standard.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Heat pumps are upgraders — they use electrical work to move heat from a cold source to a hotter wet system. The fridge analogy is the most accurate plain-English explanation.",
              "ASHP source is variable outdoor air; GSHP source is the stable 8-12°C ground. GSHP gets higher SCOP (4.0-5.0) at higher capital cost (£20-35k vs £10-15k for ASHP).",
              "Quote SCOP not COP for customer running-cost discussions. SCOP averages across a UK heating season; COP is a lab number at standard conditions.",
              "Electrical supply — typically 32-40 A radial, Type C/D MCB, RCD per Section 411 / 415, local outdoor isolator, dedicated controls cable. Size for nameplate max, not average.",
              "Refrigerant work is F-Gas-certified-only. Connecting pipework, charging, leak testing — criminal offence to do without certification.",
              "MCS MIS 3005 is the installer-competence and design standard. The MCS pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule.",
              "BS 7671 Section 411 / 415 (general earthing and bonding) applies; Section 753 applies to embedded heating systems if the install includes electric heating cables.",
              "Trade boundaries on a heat-pump install are unambiguous — F-Gas for refrigerant, electrician for electrical, plumber for wet system. Don't cross them for customer convenience.",
            ]}
          />

          <Quiz title="Heat pumps overview — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 Solar PV overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 MVHR, wind, micro-CHP overview
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
