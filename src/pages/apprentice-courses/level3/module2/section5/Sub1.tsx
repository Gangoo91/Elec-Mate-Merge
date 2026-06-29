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
      "Maximum demand calculation. Existing load plus heat pump (~32 A continuous) plus EV charger (~32 A continuous) can easily exceed the 60 A main fuse, so the certified installer runs the MD calc and chooses load-shedding, a supply upgrade or staggered loads.",
      "Confirm the roof orientation and pitch for the existing PV array. Because the property already has 5 kWp of PV, the first check is whether the panels are south-facing enough to offset the new heat pump and EV loads; if the array generates enough the main fuse rating is irrelevant.",
      "Check the existing earthing arrangement. The first job is to confirm whether the supply is PME or TT, because that determines the open-PEN protection for the EV charger; the combined load on the 60 A fuse is a secondary concern dealt with at commissioning.",
      "Decide the cable routes for the new circuits. Planning the runs from the consumer unit to the heat pump and charge point is the first design step, because cable length sets the volt drop; the supply capacity only matters once the circuits are physically routed.",
    ],
    correctIndex: 0,
    explanation:
      "Maximum demand is one of the most-missed checks on environmental tech retrofit because the historical baseline assumed gas heating and petrol cars. Electrification fundamentally changes the property's electrical load profile. The DNO main fuse capacity is the hard physical limit; supply upgrade is a DNO-managed process with weeks-to-months lead time. The MCS heat-pump and EV install packs include MD calc; non-MCS installs that skip it produce nuisance fuse blows.",
  },
  {
    id: 'l3-m2-s5-sub1-customer-expectations',
    question:
      'A customer asks "when will my new heat pump be running and how warm will the house be?". The MCS designer hasn\'t finished the heat-loss calc and the property has marginal insulation. What\'s the responsible answer?',
    options: [
      "Reassure them it will be warm and give a firm date. Tell the customer the heat pump will hold the house at 21 degrees from the commissioning day, since that is the standard design temperature for all heat pumps; the heat-loss calc only affects the running cost, not the comfort, so a confident answer now builds trust.",
      "Tell them a heat pump can never make the house as warm as their old gas boiler. Set expectations low by explaining that heat pumps run cooler, so they should accept a cooler home; the heat-loss calc is only paperwork for the grant and does not change the comfort outcome.",
      "Don't quote firm numbers until the MCS heat-loss calc and emitter sizing are done. The certified designer's pack gives the realistic flow temperature, SCOP estimate and indoor design temperatures, so refer the customer to it rather than guessing.",
      "Give them the manufacturer's headline figures from the heat pump brochure. Quote the brochure's quoted output and SCOP as the answer, because those are the official numbers; the property's insulation and emitter sizing do not change the manufacturer's stated performance.",
    ],
    correctIndex: 2,
    explanation:
      "Heat-pump customer satisfaction is dominated by setting realistic expectations at design stage. The MCS heat-loss calc, emitter survey and SCOP estimate are the honest numbers — quoting before they're done sets the customer up for disappointment when reality differs. As an apprentice your role is to refer the customer to the certified designer for firm answers, not to invent them.",
  },
  {
    id: 'l3-m2-s5-sub1-planning-permitted-development',
    question:
      'A customer wants an ASHP outdoor unit on the front-facing wall of their detached house, 1 m from the boundary with the neighbour. They\'re not in a conservation area. What\'s the planning position?',
    options: [
      "Fine to fit straight away. Outdoor ASHP units are always Permitted Development in England, so the front-facing wall and 1 m boundary distance make no difference — planning permission is never needed for a domestic heat pump regardless of where the unit goes.",
      "Not always. ASHP outdoor units are Permitted Development in England only subject to conditions — including not on a wall facing a highway, boundary distance and MCS 020 sound compliance. Front-facing placement may exclude PD, so confirm planning status before fitting.",
      "Planning permission is always required for any heat pump. Because an ASHP is a new external installation, every domestic unit needs a full planning application regardless of position or location, so the customer must allow eight weeks before any install can be booked.",
      "It depends only on the noise level. The single Permitted Development condition for an ASHP is that the unit is quiet enough; provided the MCS 020 sound assessment passes, the front-facing wall position and the 1 m boundary distance are irrelevant and no planning application is needed.",
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
      "The customer's broadband and Wi-Fi coverage. Because environmental tech is increasingly smart-controlled, the first check is whether the router reaches the inverter and heat pump location; if the signal is weak the whole install can be delayed, so connectivity is the gating factor before any quote.",
      "The site's electrical supply capacity — a maximum demand calculation including the new load. Heat pumps and EV chargers each draw 30-40 A continuous, so combined with existing loads a 60 A or 80 A main fuse can quickly be exceeded.",
      "The age of the consumer unit. The first check is whether the existing board is a modern 18th Edition unit, because environmental tech can only be added to a current consumer unit; an older board must be replaced first, which sets the earliest possible install date.",
      "The customer's EPC band. The first check is the property's energy rating, because environmental tech can only be installed where the EPC is already band C or above; a lower band must be improved with insulation before the install can be quoted.",
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
      "Because the heat-loss calc sets the size of the outdoor unit's electrical supply cable. The calc gives the running current the heat pump will draw, which fixes the cable and MCB; the emitters are sized separately by the plumber and do not depend on the heat-loss figure at all.",
      "Because the heat-loss calc is needed to claim the Boiler Upgrade Scheme grant. Ofgem requires a completed heat-loss calc before releasing the £7,500, so it must come first for funding reasons; the emitter design is unrelated and could equally be done before the calc.",
      "Because the heat-loss calc determines the flow temperature, which in turn determines what size emitters (radiators / underfloor) the property needs. Emitter design is downstream of the heat-loss calc, so it has to come first.",
      "Because the heat-loss calc decides whether the property needs single- or three-phase supply. The calc gives the total electrical demand, and only once the phase arrangement is fixed can the emitters be chosen; emitter sizing is therefore the last step rather than a consequence of the heat-loss figure.",
    ],
    correctAnswer: 2,
    explanation:
      "Heat-loss → flow temperature → emitter size is the chain, and each link depends on the previous. If the existing radiators are small (sized for 70-80°C flow from a gas boiler) and the calc shows the property needs 8 kW design heat output, the radiators may need to grow to deliver 8 kW at 45°C flow — skipping the calc and reusing existing radiators is the headline cause of disappointing UK heat-pump SCOP figures. MCS MIS 3005 specifies the heat-loss calc methodology (room-by-room) and the emitter sizing rules; customer-facing satisfaction depends on the system being right-sized.",
  },
  {
    id: 3,
    question:
      'What\'s the typical DNO supply upgrade timeline and what triggers it?',
    options: [
      "Triggered whenever a new circuit is added to the consumer unit. Any environmental tech circuit obliges the DNO to attend and re-test the whole installation, a process that takes 4-12 weeks; the supply is upgraded automatically as part of every notifiable Part P job regardless of the existing fuse rating.",
      "Triggered by the customer's energy supplier, not the DNO. The supplier upgrades the supply when the customer signs up for an EV or heat pump tariff; the process takes a few days and simply involves a new smart meter, with no cable or fuse changes and no cost to the customer.",
      "Triggered only when converting from single-phase to three-phase, never for single-phase upgrades. A 60 A or 80 A single-phase fuse can always be uprated on the day by the installer pulling and replacing the cut-out fuse, so the only DNO involvement and the only real timeline relate to three-phase conversions.",
      "Triggered when the property's existing supply capacity (typically a 60 A or 80 A single-phase main fuse) is inadequate for the new combined load. It is a DNO-managed process — apply, survey, cost, pay, schedule — typically 4-12 weeks for simple upgrades and longer for cable changes or three-phase conversions.",
    ],
    correctAnswer: 3,
    explanation:
      "Supply upgrades are a real timeline issue on environmental tech retrofits. Three-phase conversions for properties with no three-phase service can require new cable from the DNO substation. Customer-facing expectation management on the timeline is essential.",
  },
  {
    id: 4,
    question:
      'What does "trade coordination" mean on a typical heat-pump retrofit?',
    options: [
      "Sequencing the trades that interact on the install — F-Gas engineer, plumber, electrician, sometimes a builder or roofer. Each has a dependency on the others (electrical first-fix before F-Gas commissioning; plumbing charged before the heat pump runs), and the certified installer manages the sequence.",
      "Agreeing a single price between all the trades so the customer gets one combined quote. Trade coordination is essentially the commercial exercise of bundling the plumber's, electrician's and F-Gas engineer's costs into one figure; the order in which they work on site is left to each trade to decide on the day.",
      "Making sure every trade on the job holds the same competent-person scheme registration. Coordination means checking that the plumber, electrician and F-Gas engineer are all NICEIC-registered so a single compliance certificate can be issued; the physical sequence of work is not part of it.",
      "Splitting the property into zones so each trade works in a different room at the same time. Coordination is about keeping the trades physically apart to avoid clashes, letting them all work in parallel; there is no dependency between the electrical first-fix and the F-Gas commissioning.",
    ],
    correctAnswer: 0,
    explanation:
      "Multi-trade coordination is one of the under-appreciated complexities of heat-pump retrofit. The MCS-certified installer is normally the lead trade managing the sequence. Electrical first-fix is typically done before the wet plumbing pressure test and before the F-Gas commissioning; ignoring the sequence creates rework.",
  },
  {
    id: 5,
    question:
      'What\'s the role of a site survey before any environmental tech install?',
    options: [
      "Purely to give the customer a sales price on the day. The survey is a commercial visit where the installer quotes a fixed figure; the technical design is done afterwards from photographs, so the survey itself does not need to capture roof orientation, supply capacity or emitter sizes.",
      "Confirms the install is feasible and identifies the realistic scope — roof and routes for PV, heat-loss and emitter survey for heat pumps, parking and earthing for EV, ductwork for MVHR. Without a survey the install can't be designed and the customer can't be quoted accurately.",
      "To satisfy the DNO connection application. The survey exists only so the DNO can assess the network capacity; it records the main fuse rating and nothing else, because the rest of the design is standardised across all properties and needs no site visit.",
      "To confirm the customer's identity and proof of ownership before any grant claim. The survey is essentially an administrative check for the Boiler Upgrade Scheme paperwork; the technical scope is taken from the manufacturer's standard install template rather than from anything observed on site.",
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
      "Always — every EV charge point on a PME supply must be converted to TT. Section 722 prohibits using a PME earth for any vehicle-charging circuit, so the installer must drive an earth electrode and create a TT arrangement for the charge point on every PME property without exception.",
      "Only when the property is in a flood-risk area. The open-PEN risk is treated as a damp-ground hazard, so TT conversion is required only where the driveway is prone to standing water; on dry sites the PME earth can be used directly for the charge point.",
      "Whenever the chosen EV charger doesn't include integrated open-PEN protection. Section 722 requires the PEN-fault risk on PME to be managed either by the charger's built-in open-PEN protection or by a TT earth electrode for the EV chassis at the charge point.",
      "Only when the charge point is over 7 kW. The open-PEN risk is treated as power-dependent, so TT conversion is required for chargers above 7 kW; a standard 7 kW home unit can always use the property's PME earth directly with no electrode.",
    ],
    correctAnswer: 2,
    explanation:
      "PEN-fault risk management on EV charging is a Section 722 specific issue. The choice of charger drives the install architecture — chargers with built-in open-PEN protection are easier to install; chargers without need a TT electrode and the associated earth-electrode test compliance.",
  },
  {
    id: 7,
    question:
      'What\'s the customer-facing implication of a G99 grid-connection application?',
    options: [
      "The customer must pay a fixed government levy of around £500 for any G99-connected system. The G99 application carries a statutory connection charge set by Ofgem, which the customer pays before the install can proceed; there is no timeline impact because approval is automatic once the fee is paid.",
      "The customer loses access to the Smart Export Guarantee. A G99 connection is for systems too large to export domestically, so the customer can no longer be paid for surplus generation; the trade-off for the larger system is forfeiting export income, which the customer must be told up front.",
      "The customer must hold three-phase supply before a G99 system can be fitted. G99 only applies to three-phase connections, so the implication is that a single-phase property needs a three-phase upgrade first; the application itself is instant once three-phase is in place.",
      "The install can't commission until the DNO has approved the G99 application — typically 2-12 weeks depending on local network conditions. The customer needs to know this up front, and the certified installer manages the application and provides the timeline.",
    ],
    correctAnswer: 3,
    explanation:
      "G99 timeline is the most common cause of slipped install dates on larger PV / battery installs. Customer-facing expectation management on the timeline is essential. G98 fast-track installs have no DNO timeline impact.",
  },
  {
    id: 8,
    question:
      'Why does prefabrication off-site reduce material wastage and is it relevant to environmental tech installs?',
    options: [
      "Prefabrication off-site (pre-terminating SWA tails to length, pre-building consumer units, pre-assembling cable trays in a workshop) reduces on-site cuts and offcuts because off-site cutting is measured precisely. Relevant to environmental tech, where resource-efficiency matches the customer's values and is an explicit 2357 Unit 312 requirement.",
      "Prefabrication reduces wastage because work done in the workshop is exempt from VAT, so the customer pays less and orders fewer materials. The saving is purely financial rather than physical, and it is not especially relevant to environmental tech, which is installed entirely on site.",
      "Prefabrication reduces wastage by allowing cheaper materials to be used off-site where building regulations don't apply. Workshop assembly escapes BS 7671, so lower-grade cable and accessories can be fitted; this has no particular link to environmental tech installs.",
      "Prefabrication reduces wastage by removing the need for a site survey, since standard modules fit any property. It is irrelevant to environmental tech because PV, heat pump and EV installs are always bespoke and cannot use pre-assembled components.",
    ],
    correctAnswer: 0,
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
            plainEnglish="MCS heat-pump installations follow a defined design chain. Each step depends on the previous. Skipping a step or running them out of order produces install packs that don't reflect the building reality and customers who don't get the system they were promised."
            onSite="The certified installer's design pack is the document the apprentice works to. It contains: room-by-room heat-loss calc, design indoor temperatures, design outdoor temperature, emitter schedule (existing radiator size + replacement size + flow rate per emitter), heat-pump model and rating, flow temperature design, SCOP estimate, electrical schedule (cable size, MCB, RCD type, isolation), commissioning checks. Without it you're guessing."
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
            plainEnglish="Planning permission, Permitted Development eligibility, and grid-connection application are three independent timeline items on a typical environmental tech install. Each can slip the customer's commission date by weeks or months. The certified installer manages each but the apprentice should recognise where they sit."
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
