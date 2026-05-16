/**
 * Module 2 · Section 5 · Subsection 1 — Pre-installation considerations
 * Maps to City & Guilds 2365-03 / Unit 301 / LO3 / AC 3.1
 *   AC 3.1 — "describe the considerations for installation and commissioning of
 *             environmental technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 1.2 (work practices and procedures in
 * accordance with Building Regulations and the Guide for Sustainable Homes) and
 * AC 2.1 (prefabrication and installation methods to reduce material wastage).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed install competence belongs in
 * MCS standalone quals. This Sub gives the L3 electrician the pre-install considerations
 * that apply across the environmental tech family.
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
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Pre-installation considerations (5.1) | Level 3 Module 2.5.1 | Elec-Mate';
const DESCRIPTION =
  'Pre-installation considerations across the environmental technology family — site survey, design pack, supply capacity check, customer expectations, trade coordination, planning and grid-connection lead times. The work that prevents the install going wrong on day one.';

const checks = [
  {
    id: 'l3-m2-s5-sub1-supply-capacity',
    question:
      'A customer wants a 7 kW EV charger plus a 12 kW heat pump on a property with a 60 A single-phase main fuse and an existing 5 kWp PV install. What\'s the first design check?',
    options: [
      'Just fit it — single-phase has plenty of capacity.',
      "Maximum demand calculation. Existing maximum demand (lighting, sockets, cooker, immersion, electric shower) plus heat pump (~32 A continuous) plus EV charger (~32 A continuous) plus PV reverse-protection MCB. The combined load can easily exceed 60 A. Solutions: (a) load-shedding via smart controls (heat pump derates when EV charges, or vice versa); (b) supply upgrade to 100 A or three-phase via DNO; (c) staggered loads (EV charges overnight, heat pump runs during day). The certified installer runs the MD calc and chooses the strategy. Without this check, the property's main fuse will blow first cold winter night with the EV charging.",
      'Fit a bigger fuse.',
      'Run two parallel cables.',
    ],
    correctIndex: 1,
    explanation:
      "Maximum demand is one of the most-missed checks on environmental tech retrofit because the historical baseline assumed gas heating and petrol cars. Electrification fundamentally changes the property's electrical load profile. The DNO main fuse capacity is the hard physical limit; supply upgrade is a DNO-managed process with weeks-to-months lead time. The MCS heat-pump and EV install packs include MD calc; non-MCS installs that skip it produce nuisance fuse blows.",
  },
  {
    id: 'l3-m2-s5-sub1-customer-expectations',
    question:
      'A customer asks "when will my new heat pump be running and how warm will the house be?". The MCS designer hasn\'t finished the heat-loss calc and the property has marginal insulation. What\'s the responsible answer?',
    options: [
      'Tell them next Tuesday at 21°C — sounds right.',
      "Don't quote firm numbers until the MCS heat-loss calc and emitter sizing are done. The certified designer's pack will give the realistic flow temperature, SCOP estimate and indoor design temperatures the system will deliver. If insulation is marginal, the calc may recommend fabric upgrades first to bring the heat-loss within sensible heat-pump capacity. Quoting numbers off the cuff before the design is finished is how customers end up with mismatched expectations and disappointed reviews. The right answer: 'the design pack will give us the firm numbers — let me get back to you'.",
      'Promise tropical temperatures.',
      'Tell them it will fail.',
    ],
    correctIndex: 1,
    explanation:
      "Heat-pump customer satisfaction is dominated by setting realistic expectations at design stage. The MCS heat-loss calc, emitter survey and SCOP estimate are the honest numbers — quoting before they're done sets the customer up for disappointment when reality differs. As an apprentice your role is to refer the customer to the certified designer for firm answers, not to invent them.",
  },
  {
    id: 'l3-m2-s5-sub1-planning-permitted-development',
    question:
      'A customer wants an ASHP outdoor unit on the front-facing wall of their detached house, 1 m from the boundary with the neighbour. They\'re not in a conservation area. What\'s the planning position?',
    options: [
      'Permitted Development always covers ASHP — fit it.',
      "Not always. ASHP outdoor units are covered by Permitted Development in England subject to several conditions, including: not on a flat roof; not on a wall facing or visible from a highway; minimum distance from boundary (often 1 m); MCS 020 sound-assessment compliance; and not in a conservation area / on a listed building. Front-facing wall placement may exclude PD; the certified installer runs the MCS 020 calc and the PD eligibility check. Where PD doesn't apply, full planning permission is required (8-week timeline). Don't fit until planning status is confirmed.",
      'Just fit it and apologise to the neighbour.',
      'Use a smaller unit and skip the rules.',
    ],
    correctIndex: 1,
    explanation:
      "ASHP Permitted Development conditions are specific. Front-facing wall placement, conservation areas, listed buildings, flat roofs and proximity to boundaries can all knock out PD. Full planning takes 8 weeks; conservation-area consent can take longer. The customer needs to know the timeline implication before committing to an install date. The MCS-certified installer manages the PD / planning check; as an apprentice you should recognise the question.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What\'s the first thing to check on any environmental tech retrofit before quoting an install date?',
    options: [
      'The customer\'s mood.',
      "The site's electrical supply capacity. Maximum demand calculation including the new load — heat pumps draw 30-40 A continuous, EV chargers 30-40 A continuous, batteries import-charge at significant rates. Combined with existing loads, properties on 60 A or 80 A main fuses can quickly exceed capacity. The DNO main fuse is the hard limit; upgrades are DNO-managed processes with weeks-to-months lead time. Without this check, the install commissions then trips the main fuse on the first cold winter night.",
      'The colour of the front door.',
      'Whether the customer has a dog.',
    ],
    correctAnswer: 1,
    explanation:
      "MD calculation is the foundational design check. As properties electrify (heat + transport + sometimes hot water), the historical baseline of 'gas heating + petrol car + 60 A main fuse' is increasingly inadequate. Supply upgrades are a real lead-time item; ignoring the calc creates predictable customer-facing failures.",
  },
  {
    id: 2,
    question:
      'Why does the MCS heat-loss calculation need to come before the heat-pump emitter design?',
    options: [
      'It doesn\'t — both can be done in parallel.',
      "Because the heat-loss calc determines what flow temperature the system will run at, which in turn determines what size emitters (radiators / underfloor) the property needs. If the existing radiators are small (sized for 70-80°C flow from a gas boiler) and the heat-loss calc shows the property needs 8 kW design heat output, the radiators may need to grow to deliver 8 kW at 45°C flow. Emitter design is downstream of heat-loss calc. Skipping the calc and reusing existing radiators is the headline cause of disappointing UK heat-pump SCOP figures.",
      'Because the calculator is in metric units.',
      'Because the calc takes 6 months.',
    ],
    correctAnswer: 1,
    explanation:
      "Heat-loss → flow temperature → emitter size is the chain. Each link depends on the previous. MCS MIS 3005 specifies the heat-loss calc methodology (room-by-room) and the emitter sizing rules. Customer-facing satisfaction depends on the system being right-sized; the calc is what gets it right.",
  },
  {
    id: 3,
    question:
      'What\'s the typical DNO supply upgrade timeline and what triggers it?',
    options: [
      'Same-day service.',
      "Triggered when the property's existing supply capacity (typically 60 A or 80 A single-phase main fuse) is inadequate for the new combined load. Heat pump + EV charger + existing baseline can easily exceed this. DNO-managed process: customer / installer applies, DNO surveys, costs the work (cable upsize, possibly cut-out / meter replacement, possibly main-fuse upgrade), customer pays, work scheduled. Timeline 4-12 weeks for simple upgrades, longer for cable changes or three-phase conversions. Customer needs to factor this into the install date.",
      'No upgrade ever needed.',
      'Done by the customer.',
    ],
    correctAnswer: 1,
    explanation:
      "Supply upgrades are a real timeline issue on environmental tech retrofits. Three-phase conversions for properties with no three-phase service can require new cable from the DNO substation. Customer-facing expectation management on the timeline is essential.",
  },
  {
    id: 4,
    question:
      'What does "trade coordination" mean on a typical heat-pump retrofit?',
    options: [
      'A weekly trade-union meeting.',
      "Sequencing the trades that need to interact on the install: F-Gas-certified engineer for refrigerant; plumber for the wet system, cylinder, controls; electrician for supply, isolation, controls integration; sometimes a builder for cylinder cupboard alteration; sometimes a roofer / builder for outdoor unit mounting. Each trade has a sequence dependency — the electrical first-fix has to be ready before the F-Gas engineer commissions; the plumbing has to be charged and pressurised before the heat pump runs. Project management of the trade sequence is the certified installer's responsibility; as the apprentice you respect the sequence and don't get ahead.",
      'Trading skills with apprentices.',
      'Selling tools.',
    ],
    correctAnswer: 1,
    explanation:
      "Multi-trade coordination is one of the under-appreciated complexities of heat-pump retrofit. The MCS-certified installer is normally the lead trade managing the sequence. Electrical first-fix is typically done before the wet plumbing pressure test and before the F-Gas commissioning; ignoring the sequence creates rework.",
  },
  {
    id: 5,
    question:
      'What\'s the role of a site survey before any environmental tech install?',
    options: [
      'It\'s optional paperwork.',
      "Confirms the install is feasible and identifies the realistic scope. For PV: roof orientation, pitch, condition, shading, structural capacity, route from roof to inverter, route from inverter to consumer unit. For heat pumps: building heat-loss assessment, emitter survey, supply capacity, outdoor unit location, indoor cylinder space, smart controls feasibility. For EV charging: parking position, supply capacity, route to charge point, earthing arrangement (PME or TT). For MVHR: airtightness assessment, ductwork routes, unit location. Without a survey the install can't be designed; without the design the customer can't be quoted accurately. The MCS-certified installer normally completes the survey.",
      'A survey is just for new-build.',
      'Surveys waste time.',
    ],
    correctAnswer: 1,
    explanation:
      "Survey-then-design-then-install is the MCS workflow. Skipping the survey is how installs go wrong on day one — surprises on the day cost time and customer trust. The certified installer's survey produces the install pack the apprentice works to.",
  },
  {
    id: 6,
    question:
      'When does an EV charging install trigger the need to convert from PME (TN-C-S) to TT earthing at the charge point?',
    options: [
      'Always.',
      "Whenever the chosen EV charger doesn't include integrated open-PEN protection. Section 722 of BS 7671 (significantly amended in A4:2026) requires that the PEN-fault risk on PME supplies is managed — either by the charger's built-in open-PEN protection function, or by providing a TT earth electrode for the EV chassis at the charge point. Most modern chargers from major manufacturers include the open-PEN protection function, simplifying the install. Where they don't, the local TT electrode is the fallback. The certified installer reads the charger spec and chooses the architecture.",
      'Never — PME is fine for EV.',
      'Only on Tuesdays.',
    ],
    correctAnswer: 1,
    explanation:
      "PEN-fault risk management on EV charging is a Section 722 specific issue. The choice of charger drives the install architecture — chargers with built-in open-PEN protection are easier to install; chargers without need a TT electrode and the associated earth-electrode test compliance.",
  },
  {
    id: 7,
    question:
      'What\'s the customer-facing implication of a G99 grid-connection application?',
    options: [
      'No implication — it\'s instant.',
      "The install can't commission until the DNO has approved the G99 application. Approval timeline 2-12 weeks depending on local network conditions. Customer needs to know this up front — booking holiday around an install date that depends on G99 approval is a recipe for disappointment. The MCS-certified installer normally manages the application and provides timeline expectations. As the apprentice you should never quote a commission date for a G99 install without confirmation from the certified installer.",
      'Customer pays the DNO directly.',
      'Customer becomes a DNO employee.',
    ],
    correctAnswer: 1,
    explanation:
      "G99 timeline is the most common cause of slipped install dates on larger PV / battery installs. Customer-facing expectation management on the timeline is essential. G98 fast-track installs have no DNO timeline impact.",
  },
  {
    id: 8,
    question:
      'Why does prefabrication off-site reduce material wastage and is it relevant to environmental tech installs?',
    options: [
      'It doesn\'t reduce wastage.',
      "Prefabrication off-site (e.g. pre-terminating SWA tails to length, pre-building consumer units, pre-assembling cable trays in a workshop) reduces on-site cuts and offcuts. Off-site cutting can be measured precisely; on-site cuts under time pressure tend to leave more wastage. Less waste = lower material cost = smaller skip = less environmental impact. Relevant to environmental tech because: (a) the customer is by definition committed to sustainability so resource-efficient installation matches their values; (b) the trade is increasingly held to evidence-based environmental claims; (c) it's a 2357 Unit 312 AC 2.1 explicit requirement. Plus prefabrication gives faster on-site install times.",
      'Prefabrication is illegal.',
      'It applies only to cars.',
    ],
    correctAnswer: 1,
    explanation:
      "Prefabrication is one of the practical methods cited in 2357 Unit 312 ELTP02 AC 2.1 ('demonstrate prefabrication and installation methods which can help to reduce material wastage'). For environmental tech installs the customer's value alignment matches the practice. Major commercial PV installs increasingly use pre-assembled DC string sub-frames; domestic installs benefit from pre-terminated SWA, pre-built CU, pre-cut cable runs.",
  },
];

const faqs = [
  {
    question: "Why do customers underestimate how long an environmental tech install takes?",
    answer:
      "Marketing focuses on the equipment, not the design and grid-connection chain that wraps around it. Customers see a 1-day kit-fit and think the project is 1 day. The reality: site survey (1-2 weeks lead), design pack (1-3 weeks), planning / PD check (instant to 8 weeks), grid-connection application if G99 (2-12 weeks), supply upgrade if needed (4-12 weeks), then the kit-fit (1-3 days), then commissioning (1 day). Total: 4-16 weeks from first enquiry to working system. Customers booking around the kit-fit date are setting themselves up for disappointment if the dependency chain hasn't been managed.",
  },
  {
    question: "What insurance considerations apply to environmental tech installs?",
    answer:
      "Three layers. (1) The installer's professional indemnity and public liability insurance — covers the installation itself. (2) The customer's home insurance — should be notified of the install; some insurers require notification, some adjust premium, all want to know if there's a battery storage system on site (fire-safety implications). (3) The product warranty — manufacturer warranty plus MCS Workmanship Warranty (typically 2 years on the install workmanship and 5 years on the product, depending on the MCS Installer's offering). Customers should keep all three documented in the handover pack.",
  },
  {
    question: "Does the customer need an EPC before an environmental tech install?",
    answer:
      "For BUS grant eligibility, yes — the property must have a valid EPC with no outstanding insulation recommendations. Where the existing EPC has outstanding recommendations (e.g. loft insulation), those must be addressed first or the grant is refused. Other installs (PV, EV, battery, MVHR) don't require an EPC pre-install but the EPC should be re-issued after the install to reflect the new performance. The MCS-certified installer normally arranges the EPC update.",
  },
  {
    question: "What's the first conversation to have with the customer about their existing electrical infrastructure?",
    answer:
      "Three things: (1) main fuse rating (look at the cut-out — 60 A, 80 A or 100 A); (2) consumer unit type and condition (any RCD protection? room for new MCBs? age of unit?); (3) earthing arrangement (TN-C-S / PME, TN-S, or TT). All three drive the install design. Heat pumps and EV chargers need MCB capacity and may need RCD upgrades. PME-supplied EV needs PEN-fault protection. Old metal consumer units may need replacing as part of the install. Get this conversation in early — surprises on the day cost time.",
  },
  {
    question: "How should I respond when the customer asks 'can you just throw this in for cash, off the books?'",
    answer:
      "Polite refusal. Off-the-books install means no Building Regs notification, no Part P compliance, no MCS sign-off, no manufacturer warranty, no BUS / SEG access for the customer, no insurance cover for you. The customer thinks they're saving money but they lose the £7,500 BUS grant, lose SEG eligibility, lose warranty cover and end up with an installation they can't disclose to a future buyer. The honest answer: 'I'd love to but the regulatory framework now means it costs you more to do it that way than to do it properly'. Walk away from any installer who would do it.",
  },
  {
    question: "What environmental waste considerations apply to an environmental tech install?",
    answer:
      "Several. (1) Old kit removal — old gas boiler, old radiators, old immersion. Some can be recycled (metal); some need WEEE-compliant disposal (electronic controls). (2) Refrigerant — recovery to F-Gas-compliant cylinder; never venting. (3) Packaging — cardboard, plastic foam, pallets. Recycle on-site or via the supplier. (4) Cable offcuts — copper recycling streams. (5) Battery decommissioning — lithium-ion batteries require specialist hazardous-waste handling. The 2357 Unit 312 ELTP02 explicitly requires demonstration of safe disposal of hazardous materials per the Hazardous Waste Regulations.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 1"
            title="Pre-installation considerations"
            description="The work before the kit-fit — site survey, supply capacity check, MCS design pack, customer expectations, trade coordination, planning and grid-connection lead times. The dependency chain that decides whether the install hits its commission date or slips."
            tone="emerald"
          />

          <TLDR
            points={[
              "Maximum demand calculation is the foundational design check on every environmental tech retrofit. Heat pumps + EV + existing baseline can quickly exceed a 60 A main fuse.",
              "MCS heat-loss calc → flow temperature → emitter size — each link depends on the previous. Skipping the calc and reusing old radiators is the headline cause of disappointing heat-pump SCOP.",
              "G99 grid-connection application takes 2-12 weeks. Supply upgrades take 4-12 weeks. Customer expectation management on timeline is essential.",
              "Trade coordination on heat-pump retrofit — F-Gas, electrician, plumber, sometimes builder / roofer. Sequence matters; respect the sequence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the maximum demand calculation as the foundational design check on environmental tech retrofit.",
              "Describe the MCS heat-loss calc → flow temperature → emitter sizing chain and why each step depends on the previous.",
              "State the typical lead times for DNO supply upgrades, G99 grid-connection applications and planning permission for ASHP outdoor units.",
              "Describe the trade coordination required on a typical heat-pump retrofit and the role of the MCS-certified installer as lead trade.",
              "Identify the components of a typical pre-install site survey for PV, heat pump, EV charging and MVHR installs.",
              "Recognise the customer-facing implications of the design and grid-connection chain — total install timeline 4-16 weeks from enquiry to working system.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The supply capacity check</ContentEyebrow>

          <ConceptBlock
            title="Maximum demand on an electrified property — why the historic baseline doesn't hold"
            plainEnglish="UK domestic supplies were historically sized assuming gas heating and petrol cars. The standard 60 A or 80 A single-phase main fuse covered lighting, sockets, cooker, immersion and the occasional electric shower. As properties electrify — heat pumps replacing gas boilers, EV chargers replacing fuel pumps, sometimes battery storage — the historic baseline doesn't hold. A 12 kW heat pump (32 A continuous) plus a 7 kW EV charger (32 A continuous) plus existing baseline (10-20 A) can easily exceed 60 A on a cold winter evening with the EV charging."
            onSite="The maximum demand calc is the first design check on every environmental tech retrofit. Existing MD plus new MD compared against the property's main fuse rating. Where the calc shows excess, three options: load-shedding via smart controls (heat pump derates when EV charges), supply upgrade via the DNO, or staggered loads (EV charges overnight when heat pump idles). The certified installer chooses the strategy."
          >
            <p>
              The MD calc inputs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Existing loads</strong> — lighting, sockets, cooker, immersion,
                electric shower, any existing PV reverse-protection MCB. Apply diversity
                per On-Site Guide / IET Guidance Note 1.
              </li>
              <li>
                <strong>New environmental loads</strong> — heat pump (continuous, 30-40 A),
                EV charger (continuous, 30-40 A), battery import-charge (15-30 A typically),
                MVHR (1 A negligible), biomass boiler controls (1-2 A negligible).
              </li>
              <li>
                <strong>Supply capacity</strong> — main fuse rating from the cut-out (60 A,
                80 A or 100 A typical for single-phase). Three-phase available? DNO
                upgrade feasible?
              </li>
              <li>
                <strong>Diversity vs continuous</strong> — heat pumps and EV chargers don't
                diversify well — both can be at full load simultaneously on a cold winter
                evening. The continuous-load assumption is conservative but realistic.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 311.1 (Maximum demand)"
            clause={
              <>
                &quot;For economic and reliable design of an installation within thermal limits
                and admissible voltage drop, the maximum demand shall be determined as required
                by Regulation 311.1. When determining the maximum demand of an installation or
                part thereof, diversity may be taken into account.&quot;
              </>
            }
            meaning={
              <>
                Reg 311.1 is the regulatory hook for the MD calc. On an electrifying
                property the diversity assumptions need careful thought — heat pumps and
                EV chargers don&apos;t diversify in the way that traditional load groups
                do. As the L3 electrician on a retrofit you should challenge the
                installer&apos;s MD calc if it relies on optimistic diversity figures for
                continuous-load environmental kit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 311.1 (paraphrased from the published amendment text)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConsumerUnit />

          <SectionRule />

          <ContentEyebrow>The MCS design chain</ContentEyebrow>

          <ConceptBlock
            title="Survey → heat-loss calc → emitter sizing → SCOP estimate → install pack"
            plainEnglish="MCS heat-pump installations follow a defined design chain. Each step depends on the previous. Skipping a step or running them out of order produces install packs that don\'t reflect the building reality and customers who don\'t get the system they were promised."
            onSite="The certified installer\'s design pack is the document the apprentice works to. It contains: room-by-room heat-loss calc, design indoor temperatures, design outdoor temperature, emitter schedule (existing radiator size + replacement size + flow rate per emitter), heat-pump model and rating, flow temperature design, SCOP estimate, electrical schedule (cable size, MCB, RCD type, isolation), commissioning checks. Without it you\'re guessing."
          >
            <p>
              The chain in detail:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site survey</strong> — building dimensions, construction type,
                existing heating system, supply capacity, outdoor unit location options,
                indoor cylinder space.
              </li>
              <li>
                <strong>Heat-loss calc</strong> — per MCS MIS 3005 methodology. Room-by-
                room heat-loss at design conditions. Identifies the building&apos;s total
                design heat load.
              </li>
              <li>
                <strong>Flow temperature design</strong> — the lower the flow temperature,
                the higher the SCOP. Driven by the heat load and the emitter capacity. New
                underfloor allows 35-45°C; upsized radiators allow 45-55°C.
              </li>
              <li>
                <strong>Emitter schedule</strong> — radiator survey, identifying which
                existing radiators need upsizing or replacing to deliver the room&apos;s
                heat load at the design flow temperature.
              </li>
              <li>
                <strong>Heat-pump selection</strong> — model and capacity to match the
                building heat load with reasonable margin. Avoid oversizing (worsens
                cycling and SCOP).
              </li>
              <li>
                <strong>SCOP estimate</strong> — calculated from the chosen unit&apos;s
                published performance map at the design flow temperature and UK heating
                season. The honest customer-facing running-cost number.
              </li>
              <li>
                <strong>Electrical schedule</strong> — cable size, MCB rating and type,
                RCD type, isolation arrangement, smart controls integration, bonding.
              </li>
              <li>
                <strong>Customer handover pack</strong> — all of the above plus
                commissioning records, EPC update arrangement, warranty registration, BUS
                grant application status.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="MCS 020 — the noise assessment that gates ASHP placement"
            plainEnglish="An air-source heat pump can fall under Permitted Development for placement, but only if the noise reaching the nearest habitable room of a neighbouring property meets the MCS 020 sound assessment. The calculation uses the manufacturer's published sound power data, the distance to the receptor window, the screening from buildings or fences, and reflective surfaces. A noisy unit too close to a boundary fails MCS 020 — and that throws the install into a planning application instead of PD."
            onSite="Run the MCS 020 calculator at the survey stage, not at install. Inputs: sound power Lw of the chosen unit, distance to nearest neighbour habitable room window, line-of-sight obstructions, hard reflective surfaces. Output: predicted SPL at receptor in dB(A). Pass threshold typically 42 dB(A) for the assessment to qualify under PD. Marginal cases — quieter unit (Mitsubishi Ecodan, Vaillant aroTHERM Plus, Daikin Altherma 3 R-32 typically sit lower on the published data), acoustic screen, repositioning to a less sensitive boundary."
          >
            <p>
              What MCS 020 does and does not cover:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Covers</strong> — single ASHP outdoor unit serving a single
                dwelling, sound prediction at the nearest neighbour facade, PD eligibility
                test for England (Wales, Scotland, NI follow similar approaches with their
                own Permitted Development codes).
              </li>
              <li>
                <strong>Does not cover</strong> — multiple units, commercial sites, ground
                source bore arrays, plant in a community heat scheme. Those need full
                acoustic engineer input or BS 4142:2014+A1:2019 assessment.
              </li>
              <li>
                <strong>Common pass strategies</strong> — choose a quieter unit, increase
                distance to boundary, fit acoustic screen on the boundary line (real
                pre-fab products marketed for ASHP screening), reposition to face a
                non-habitable wall, raise the unit to clear a fence into a quieter zone.
              </li>
              <li>
                <strong>Failure consequence</strong> — the install falls out of PD and
                needs a full planning application. Adds 8 weeks minimum, fee, and a
                contested application risk.
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

          <ContentEyebrow>Planning, Permitted Development and grid connection</ContentEyebrow>

          <ConceptBlock
            title="Three timeline items that can slip the install date"
            plainEnglish="Planning permission, Permitted Development eligibility, and grid-connection application are three independent timeline items on a typical environmental tech install. Each can slip the customer\'s commission date by weeks or months. The certified installer manages each but the apprentice should recognise where they sit."
            onSite="On a typical PV install: G98 fast-track usually no timeline impact (notify after commission). G99 pre-application 2-12 weeks. ASHP install: PD usually applies but check MCS 020 sound assessment, conservation area, listed building, boundary distance. EV install: PD applies for most domestic locations. Heat pump and EV combined with supply upgrade: 4-12 weeks for the DNO upgrade alone."
          >
            <p>
              The three categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Planning permission</strong> — required where Permitted Development
                doesn&apos;t apply (conservation areas, listed buildings, certain ASHP
                placements, large freestanding wind / hydro). 8-week statutory determination
                period; longer in practice for contested applications.
              </li>
              <li>
                <strong>Permitted Development</strong> — covers most domestic ASHP, PV,
                EV charging without separate application but subject to conditions (MCS
                020 sound assessment for ASHP; not on listed buildings or in conservation
                areas without consent; not on principal elevations facing a highway; etc.).
              </li>
              <li>
                <strong>Grid-connection application</strong> — G98 fast-track: notify after
                commission (no timeline impact). G99 pre-application: 2-12 weeks for
                approval. Supply upgrade: 4-12 weeks for DNO survey, costing and works.
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

          <ContentEyebrow>Trade coordination</ContentEyebrow>

          <ConceptBlock
            title="The sequence on a heat-pump retrofit"
            plainEnglish="Heat-pump retrofit involves multiple trades. Each trade has dependencies on the others; ignoring the sequence creates rework and rework destroys margin. The certified installer manages the sequence; the apprentice respects it."
            onSite="Typical sequence: (1) Survey and design (lead trade — MCS-certified installer). (2) Site preparation — outdoor unit base, cylinder cupboard alteration if needed. (3) Plumber installs new cylinder, alters wet system, fits radiators per emitter schedule, pressure-tests. (4) Electrician first-fix supply, isolation, controls cabling. (5) F-Gas engineer installs heat pump (split or monobloc), connects refrigerant pipework, charges, leak-tests. (6) Electrician second-fix — controls integration, commissioning. (7) Commissioning — wet system, electrical, controls. (8) Customer handover."
          >
            <p>
              Common sequence dependencies:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Electrical first-fix must be ready before F-Gas commissioning — the F-Gas
                engineer needs a working supply to commission the unit.
              </li>
              <li>
                Plumbing must be charged and pressurised before the heat pump runs — dry-
                running or running into an unfilled system damages the unit.
              </li>
              <li>
                Smart controls integration depends on the heat-pump and cylinder being
                commissioned first — controls need a live system to test against.
              </li>
              <li>
                EPC update happens after commissioning — needs the new heat-pump SCOP for
                the updated rating.
              </li>
              <li>
                BUS grant claim happens after MCS sign-off — needs the install to be
                physically complete and certified.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting a commission date before the supply capacity check"
            whatHappens={
              <>
                Customer asks for a heat-pump install. Apprentice (or unscrupulous
                installer) quotes a 4-week commission date. MCS designer arrives,
                runs the MD calc, finds the property&apos;s 60 A main fuse can&apos;t carry
                the new combined load. DNO supply upgrade required — 6-week additional
                lead time. Customer is unhappy because the install date promised has now
                slipped 6 weeks. Trade gets the blame.
              </>
            }
            doInstead={
              <>
                Always run the MD calc before quoting commission dates. Where the calc
                shows supply upgrade may be needed, factor the 4-12 week DNO timeline
                into the customer&apos;s expectation. Be honest about the dependency chain
                — &quot;the install date depends on the DNO upgrade timeline; I&apos;ll
                confirm a date once we know that&quot;.
              </>
            }
          />

          <CommonMistake
            title="Reusing old radiators without checking emitter capacity at low flow temperature"
            whatHappens={
              <>
                Heat pump goes in. Wet system reused as-is. Old radiators sized for 70-80°C
                gas-boiler flow can&apos;t deliver the room&apos;s design heat load at
                45°C heat-pump flow. Heat pump runs at high flow temperature trying to
                compensate — SCOP drops to 2.5-2.8 instead of the design 3.5+. Customer&apos;s
                bills go up. Customer review goes negative.
              </>
            }
            doInstead={
              <>
                Always check the emitter schedule against the design flow temperature.
                MCS MIS 3005 requires room-by-room emitter sizing. Where existing
                radiators are too small, upsize them as part of the install. Customer-
                facing conversation: &quot;your old radiators were sized for the old gas
                boiler — for the heat pump to deliver the SCOP we&apos;ve estimated, we
                need to upsize 4 radiators&quot;.
              </>
            }
          />

          <Scenario
            title="Customer wants the &quot;full electrification package&quot; on a 60 A supply"
            situation={
              <>
                Customer with 1990s 3-bed semi, 60 A single-phase main fuse, gas combi
                boiler, petrol car. Wants to electrify everything: 7 kW EV charger, 10 kW
                ASHP, 5 kWp PV, 10 kWh battery storage. Property has cavity wall insulation
                and decent double glazing. Roof is south-facing, unshaded. Customer wants
                everything operational in 8 weeks for the spring.
            </>
            }
            whatToDo={
              <>
                Run the realistic timeline through with the customer. (1) MD calc — heat
                pump (32 A) + EV (32 A) + existing baseline (15 A) = 79 A continuous,
                exceeds the 60 A main fuse. Supply upgrade or load-shedding required.
                (2) DNO supply upgrade to 100 A — 4-8 weeks lead time, customer pays the
                DNO directly. (3) MCS heat-pump heat-loss calc and emitter survey — 1-2
                weeks for the certified designer; emitter upsize likely on 3-4 radiators.
                (4) PV + battery G99 application (battery export inverter combined with PV
                inverter likely exceeds 16 A) — 2-8 weeks. (5) ASHP Permitted Development
                check (boundary distance, MCS 020) — typically same-day. (6) Install kit-
                fit — 3-5 days for everything together. (7) Commissioning — 1 day.
                Realistic total: 8-12 weeks if everything goes well, 12-16 weeks if the
                DNO upgrade is delayed. Set the customer&apos;s expectation accordingly —
                spring is plausible but not guaranteed.
              </>
            }
            whyItMatters={
              <>
                The full-electrification customer is the future of the trade. Getting their
                expectations right at the design stage is the difference between a happy
                long-term customer and a disappointed one. The electrician&apos;s honest
                framing of the timeline chain (MD calc → supply upgrade → MCS design →
                G99 → planning → install → commission) is what builds trust. Quoting a
                4-week commission date because the customer wants it sets you and the
                customer up for failure.
              </>
            }
          />

          <ConceptBlock
            title="EPC currency and grant eligibility — the upfront paper check"
            plainEnglish="Most environmental-tech grants gate eligibility on a current EPC: the Boiler Upgrade Scheme will not pay £7,500 if the property cannot evidence a valid EPC, and certain exempt categories (Listed buildings, certain off-grid) need additional paperwork. The check belongs at the very start of the survey — before any heat-loss calc or electrical schedule effort goes in. Discovering at week six that the EPC lapsed in 2019 has lost the customer the grant."
            onSite="At first survey, pull the property's EPC from the GOV.UK register. Check the date (typically valid 10 years), the recommended improvements (loft insulation, cavity wall insulation — some schemes require these are completed or the customer signs an exemption), and any conservation or listed-building flag. If the EPC has lapsed, advise the customer to commission a new one before further design work — the install will still need it for grant claim and for an honest SAP figure post-install."
          >
            <p>
              Upfront paper checklist before design effort starts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EPC currency</strong> — valid EPC on the GOV.UK register, less
                than 10 years old, no fundamental insulation gaps that block grant
                eligibility.
              </li>
              <li>
                <strong>BUS eligibility</strong> — owner-occupied or private-rental
                dwelling in England / Wales, not new-build, no previous BUS claim on the
                property.
              </li>
              <li>
                <strong>Conservation / listed</strong> — affects PD eligibility for
                outdoor units, panel placement, external pipe runs. Listed Building
                Consent is a separate planning track.
              </li>
              <li>
                <strong>DNO records</strong> — request the supply ratings and any
                existing G98 / G99 registrations on the meter point. Confirms the
                starting capacity and any earlier inverter still on file.
              </li>
              <li>
                <strong>Asbestos</strong> — properties built pre-2000 carry asbestos
                risk in soffits, garage roofs, behind tiles. Survey before drilling
                anywhere structural.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Functional dependencies in an integrated install"
            plainEnglish="An integrated environmental install is a chain of dependencies. The PV array depends on the inverter to convert DC to AC; the inverter depends on the MID generation meter for export logging; the battery depends on the hybrid inverter for charge and discharge control; the EV charger depends on the home network for smart-charge command. Break any link and the system stops working — even if the underlying kit is electrically sound. The competent installer maps these dependencies up front so a single comms or sensor failure does not strand the whole install."
            onSite="Document the dependency chain on the handover. Include a one-page diagram showing which subsystem feeds which, where the comms wires run, and which alarm goes to which app. The customer reading the chain a year later doesn&apos;t need a degree — they need to know &quot;the EV is offline because the home Wi-Fi is down&quot;, not &quot;something has gone wrong&quot;."
          >
            <p>Common dependency failure modes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hybrid inverter loses internet — battery still cycles on the local schedule, app reporting goes dark.</li>
              <li>MID generation meter fails — SEG export reading lost; PV still generates, customer loses tariff income until replaced.</li>
              <li>EV charger loses Wi-Fi — falls back to standalone Mode 3, smart-charge schedule disabled.</li>
              <li>Battery BMS comms break — pack will not arm; full power-side cabling looks fine but the system reads as &quot;dead&quot;.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Working-at-height planning for PV — scaffolding, edge protection and CDM"
            plainEnglish="A domestic PV install puts two or three people on a pitched roof for one to two days. The Work at Height Regulations 2005 require a hierarchy: avoid the work if possible, use collective protection (scaffolding with edge protection) before personal protection (harnesses), and select the equipment to suit the task. Most domestic installs use full-perimeter scaffold with toe boards and edge protection — the Construction (Design and Management) Regulations 2015 (CDM) apply to almost every domestic project."
            onSite="The certified installer organises the scaffold; the apprentice respects the brief — toolbox talk on access, no work outside the scaffold rails, MEWPs on commercial sites, harness only where collective protection is impractical. CDM brings in the Principal Designer and Principal Contractor roles for projects with more than one contractor — even a domestic PV with the customer's roofer still on site triggers it. The handover from designer to installer to commissioning electrician is documented in the Construction Phase Plan."
          >
            <p>
              The pre-install planning items the apprentice should know exist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scaffold sign-off</strong> — erected by a NASC / CISRS-trained
                team, signed off as fit for use, weekly re-inspection during use, written
                handover certificate kept in the site file.
              </li>
              <li>
                <strong>Construction Phase Plan</strong> — required under CDM 2015 for
                every project; lists hazards, controls, PPE, emergency procedures.
                Domestic projects have a slimmer plan but still need one.
              </li>
              <li>
                <strong>Roof structural check</strong> — modern trusses are usually fine
                for the additional 12-15 kg/m² of panels but older purlin-and-rafter
                roofs may need sistering. Structural engineer report belongs in the
                pack on edge cases.
              </li>
              <li>
                <strong>Weather window</strong> — wind, rain and ice all affect roof
                access. The site supervisor calls the day; the apprentice does not
                push to work in unsafe conditions.
              </li>
              <li>
                <strong>Welfare on domestic sites</strong> — small projects often forget
                CDM welfare (toilet, hand-wash, break shelter). Customers may agree to
                use the property's facilities; that should be in the plan, not assumed.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (PV) extensive revision"
            clause={
              <>
                Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
                extensively revised and expanded in BS 7671:2018+A4:2026. The technical content
                of this section has been extensively revised and expanded and now contains
                updated requirements specific to PV systems.
              </>
            }
            meaning={
              <>
                Operating an integrated install starts with a Section 712-compliant PV array.
                A4:2026 brought widespread changes to DC isolation, RCD selection and
                interaction with battery storage. If your reference book pre-dates A4:2026,
                check the Section 712 wording before relying on it.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (RCD test single-current AC)"
            clause={
              <>
                Regulation 643.3 has been redrafted. Regardless of RCD Type (AC, A, F, B etc.),
                an alternating current test at rated residual operating current (IΔn) shall be
                used to verify the effectiveness of the RCD.
              </>
            }
            meaning={
              <>
                When commissioning the integrated install, RCD verification is now a single AC
                test at 1×IΔn — the old multi-current sweep (½×, 1×, 5×) has been deleted.
                Update test schedules and toolbox-talk crib sheets accordingly. The change
                applies to all RCD types including the Type B units commonly fitted on EV
                circuits.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 643.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Maximum demand calculation is the foundational design check on every environmental tech retrofit. Heat pump + EV + existing can exceed a 60 A main fuse.",
              "MCS heat-loss calc → flow temperature → emitter sizing → SCOP estimate. Each step depends on the previous; skipping the calc produces disappointing real-world performance.",
              "Three timeline items can slip the install date — planning / PD, G99 grid-connection application, DNO supply upgrade. All can take 2-12 weeks.",
              "Trade coordination on heat-pump retrofit — F-Gas, electrician, plumber, sometimes builder / roofer. The MCS-certified installer manages the sequence.",
              "Prefabrication off-site reduces material wastage and is explicitly cited in 2357 Unit 312 ELTP02 AC 2.1 as good practice.",
              "Customer-facing expectation management on the timeline is essential. Total install timeline 4-16 weeks from first enquiry to working system.",
              "On a PME-supplied EV install, Section 722 PEN-fault protection is a Day 1 design item — open-PEN protection in the charger or TT electrode at the charge point.",
              "Survey-then-design-then-install is the MCS workflow. Skipping the survey is how installs go wrong on day one.",
            ]}
          />

          <Quiz title="Pre-installation considerations — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.2 BS 7671 + ENA G98/G99
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Commissioning and handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
