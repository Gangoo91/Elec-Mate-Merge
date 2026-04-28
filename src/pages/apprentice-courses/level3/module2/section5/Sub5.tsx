/**
 * Module 2 · Section 5 · Subsection 5 — Long-term maintenance and service intervals
 * City & Guilds 2365-03 / Unit 301 / LO3 (maintenance) — extended overview
 *
 * Layered depth:
 *   2357 Unit 312 ELTP02 / AC 1.1 — workplace procedures for safe handling, storage and
 *                                   disposal of hazardous materials and products.
 *   2357 Unit 602 ELTK02 / AC 1.5 — materials classed as hazardous to the environment
 *                                   and / or recyclable.
 *   2357 Unit 602 ELTK02 / AC 1.6 — organisational procedures for processing hazardous
 *                                   and recyclable materials.
 *
 * This Sub looks at the multi-decade view — PV string degradation curves, battery
 * end-of-life decisions, heat pump F-Gas service intervals, and EV charger inspection
 * cycles per OZEV. It complements Sub 5.3 (annual maintenance scope) by zooming out to
 * the lifecycle perspective the L3 electrician needs in handover and decommissioning
 * conversations.
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
  'Long-term maintenance and service intervals (5.5) | Level 3 Module 2.5.5 | Elec-Mate';
const DESCRIPTION =
  "The multi-decade view across the renewables family — PV string degradation curves, lithium-ion battery end-of-life decisions, heat pump F-Gas leak-check intervals tied to refrigerant charge weight, and EV charger periodic inspection cycles per OZEV grant terms. The lifecycle picture an L3 electrician needs for honest handover and decommissioning conversations.";

const checks = [
  {
    id: 'l3-m2-s5-sub5-pv-degradation',
    question:
      "A customer is comparing PV warranties and asks why the panel manufacturer guarantees 'at least 80% output at year 25' rather than 100%. What's the honest answer?",
    options: [
      "The panels are defective.",
      "Crystalline silicon PV panels degrade gradually — typically around 0.5% per year on a linear basis after a small initial light-induced degradation in the first few hundred hours. By year 25 a healthy panel is delivering somewhere between 80% and 87% of its nameplate output. Manufacturer linear warranties express this as 'at least 80% (or 85%) at year 25'. The customer has not been mis-sold; the degradation is intrinsic to the technology and is built into the MCS performance estimate. Premium panels with lower degradation rates (around 0.3% per year) hold output better and are warrantied accordingly.",
      "All panels fail completely after 10 years.",
      "Degradation is a sales myth — panels do not degrade.",
    ],
    correctIndex: 1,
    explanation:
      "PV degradation is intrinsic and predictable. The 0.5% per year linear figure is industry-standard for Tier-1 crystalline silicon. The MCS yield estimate accounts for it; the customer's expected lifetime kWh figure assumes degradation. Premium panels (heterojunction, TOPCon) often quote 0.3% per year and warranty 87-90% at year 25. As the L3 electrician, framing degradation honestly at handover protects the customer from a 'why is my system underperforming?' phone call in year 12.",
  },
  {
    id: 'l3-m2-s5-sub5-battery-eol',
    question:
      "A customer's 5-year-old 10 kWh battery now delivers about 7 kWh of usable capacity. They ask whether it has reached end-of-life. What's the right framing?",
    options: [
      "Yes — it is dead and must be scrapped.",
      "Battery end-of-life in the residential storage context is usually defined as when usable capacity falls to around 70-80% of nameplate (varies by manufacturer warranty wording). A 10 kWh battery delivering 7 kWh of usable capacity is at roughly 70% — close to the typical 10-year warranty threshold. Whether the customer replaces depends on economics: the existing battery may still serve daily PV self-consumption usefully even at 70% capacity; the manufacturer warranty may trigger a free or subsidised replacement; second-life battery applications are emerging. Decommissioning is hazardous-waste handling, not skip handling.",
      "It must be replaced annually regardless of capacity.",
      "Capacity loss is a fault that can always be repaired by re-flashing firmware.",
    ],
    correctIndex: 1,
    explanation:
      "Lithium-ion battery degradation comes from cycle count, depth of discharge, temperature exposure and calendar age. A typical residential battery warranty guarantees around 70-80% capacity at year 10 or a defined cycle count, whichever comes first. As the L3 electrician you may be asked to facilitate decommissioning under the manufacturer's take-back scheme — never improvise; lithium-ion is hazardous waste under the WEEE Regulations and improperly handled batteries are a serious fire risk in waste streams.",
  },
  {
    id: 'l3-m2-s5-sub5-fgas-intervals',
    question:
      "What determines how often a domestic heat pump needs a mandatory F-Gas leak check?",
    options: [
      "Every five years regardless of charge.",
      "The refrigerant charge weight in CO2-equivalent tonnes (calculated as charge weight in kg multiplied by the refrigerant's global warming potential, divided by 1000). Under the F-Gas Regulations, equipment containing 5 tonnes CO2e or more requires a mandatory annual leak check; 50 tonnes or more requires six-monthly; 500 tonnes or more requires three-monthly. Most domestic ASHPs running R-32 or R-290 sit below the 5-tonne CO2e mandatory threshold (R-290 propane has a GWP of just 3, so even substantial charges fall well short). Manufacturer warranty often requires annual checks regardless of the regulatory threshold.",
      "Only at decommissioning.",
      "Never — domestic units are exempt.",
    ],
    correctIndex: 1,
    explanation:
      "The F-Gas leak-check intervals are set by CO2-equivalent charge, not by application type. A small ASHP charged with around 1.2 kg of R-32 (GWP 675) carries roughly 0.8 tonnes CO2e — well below the 5-tonne threshold. The same physical kg of R-290 (GWP 3) is around 0.0036 tonnes CO2e. Manufacturer warranty terms typically require annual servicing including a visual leak check anyway, even where the regulatory threshold is not triggered. As an apprentice you do not perform the leak check — that is F-Gas-certified scope — but understanding the interval logic helps you talk customers through service contract pricing.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the typical linear degradation rate of a Tier-1 crystalline silicon PV panel?",
    options: [
      "Around 10% per year.",
      "Around 0.3 to 0.5% per year on a linear basis after a small initial light-induced degradation in the first few hundred hours of operation. By year 25 a healthy Tier-1 panel is delivering around 80-87% of its nameplate output. Premium panels with newer cell architectures (heterojunction, TOPCon) often quote 0.3% per year and warranty 87-90% at year 25.",
      "Around 5% per year.",
      "Zero — panels do not degrade.",
    ],
    correctAnswer: 1,
    explanation:
      "The 0.5% per year figure is industry-standard linear degradation for Tier-1 crystalline silicon. The MCS performance estimate factors it in. The customer's 25-year cumulative kWh figure already assumes degradation; underperformance vs estimate after the first few years is more likely to be soiling, shading or inverter drift rather than panel degradation.",
  },
  {
    id: 2,
    question:
      "When does a residential lithium-ion battery typically reach the manufacturer-defined end-of-life capacity threshold?",
    options: [
      "After one year.",
      "Around year 10 or a defined number of full-equivalent cycles (often 6,000-10,000 cycles), whichever comes first. The threshold is usually 70-80% of nameplate usable capacity. A 10 kWh battery delivering around 7 kWh after a decade is at typical end-of-warranty capacity; whether the customer replaces depends on the economics of remaining capacity vs replacement cost.",
      "After 50 years.",
      "Only when it physically catches fire.",
    ],
    correctAnswer: 1,
    explanation:
      "Battery degradation comes from cycle count, depth of discharge, calendar ageing and temperature exposure. The 10-year / 70-80% capacity warranty is industry-standard for residential storage. Some manufacturers offer 12-15 year warranties on premium products. End-of-warranty does not always mean end-of-useful-life — many older batteries continue to serve daily self-consumption usefully even at reduced capacity.",
  },
  {
    id: 3,
    question:
      "What sets the mandatory F-Gas leak-check interval for refrigerant equipment under UK F-Gas Regulations?",
    options: [
      "The customer's preference.",
      "The CO2-equivalent refrigerant charge — kg of refrigerant multiplied by the refrigerant's global warming potential, divided by 1000. Mandatory intervals: 5+ tonnes CO2e annual; 50+ tonnes CO2e six-monthly; 500+ tonnes CO2e three-monthly. Most domestic ASHPs sit below 5 tonnes CO2e and are not subject to the mandatory regulatory intervals — but manufacturer warranty terms typically require annual servicing anyway.",
      "Only the engineer's diary.",
      "Only the local authority's policy.",
    ],
    correctAnswer: 1,
    explanation:
      "The CO2-equivalent threshold structure recognises that high-GWP refrigerants in large charges pose more risk than small charges of low-GWP refrigerants. R-32 (GWP 675), R-290 propane (GWP 3) and R-410A (GWP 2088) all behave very differently when measured this way. Domestic heat pumps usually fall below the regulatory thresholds; commercial refrigeration often crosses them.",
  },
  {
    id: 4,
    question:
      "Why is R-290 (propane) increasingly used in modern domestic heat pumps?",
    options: [
      "It is cheaper than electricity.",
      "Very low global warming potential — around 3, compared with R-32 at 675 and R-410A at 2088. Means less environmental impact per kg released, lower CO2-equivalent charge, less stringent F-Gas leak-check regime. Excellent thermodynamic properties — high efficiency, supports flow temperatures up to around 75°C suitable for retrofit on existing radiator systems. Trade-off: highly flammable (A3 safety classification), requires careful installation per ATEX and manufacturer rules around ventilation, charge limits and electrical zoning around the unit.",
      "It is non-flammable.",
      "It can replace water in the wet system.",
    ],
    correctAnswer: 1,
    explanation:
      "R-290 is the dominant low-GWP option in current heat-pump kit because it combines very low climate impact with strong thermodynamic performance at the higher flow temperatures retrofit installations sometimes need. The flammability is managed by sealed-system design, charge limits and outdoor placement of the refrigerant circuit. F-Gas-certified engineers handling R-290 carry additional flammable-refrigerant training.",
  },
  {
    id: 5,
    question:
      "What inspection cycle does OZEV require for grant-funded EV charge points under the EV Chargepoint Grant scheme?",
    options: [
      "None — OZEV does not specify inspection cycles.",
      "OZEV requires installations to comply with the Electric Vehicles (Smart Charge Points) Regulations 2021 and to be installed by an OZEV-authorised installer. Periodic inspection follows the BS 7671 framework — typically 5-yearly EICR for domestic, plus EV-specific tests including RCD operation (Type B or RDC-DD), open-PEN protection function (where the charger has built-in open-PEN), and Zs at the charge point. Landlord properties additionally subject to the Electrical Safety Standards Regulations 2020 (5-year EICR plus change of tenancy).",
      "Daily inspection.",
      "Once-only inspection at install.",
    ],
    correctAnswer: 1,
    explanation:
      "OZEV (the Office for Zero Emission Vehicles) administers the EV Chargepoint Grant for landlords and the Workplace Charging Scheme. Eligibility for grant funding requires installation by an OZEV-authorised installer to OZEV technical standards including the 2021 Smart Charge Points Regulations. Periodic inspection then follows the BS 7671 / Electrical Safety Standards Regulations framework — OZEV does not impose a separate inspection cycle but does expect ongoing compliance.",
  },
  {
    id: 6,
    question:
      "What does the PV inverter's typical service life look like compared with the panels themselves?",
    options: [
      "Inverters last longer than panels.",
      "Panels are warrantied 25 years and often deliver useful output well beyond. Inverters are warrantied 5-12 years depending on type (string inverters typically 10-12 years; microinverters often 25 years). Most domestic PV systems will need at least one inverter replacement during the 25-year panel lifetime. The replacement is straightforward — disconnect old, fit replacement of compatible spec, recommission, update the EIC. The cost should be factored into the system's whole-life economic case rather than treated as a surprise.",
      "Both fail at exactly the same point.",
      "Inverters never need replacing.",
    ],
    correctAnswer: 1,
    explanation:
      "Inverter life is the headline reason a PV system's whole-life cost is not zero after the install. String inverters work hard — running every daylight hour, dealing with thermal cycling, often in lofts or south-facing walls where they get hot. The 5-12 year warranty range reflects this; replacement at year 10-15 is typical. Microinverters underneath each panel run cooler and often warranty-match the panels.",
  },
  {
    id: 7,
    question:
      "What is the typical heat pump service life and what sets it?",
    options: [
      "One year.",
      "Around 15-20 years for a well-maintained domestic ASHP, comparable to a high-quality gas boiler. The compressor is the wear part; secondary wear includes the fan motor, expansion valve, controls electronics. Annual servicing including refrigerant leak check, wet-system maintenance, electrical inspection and performance verification keeps the unit at design SCOP for as long as possible. Skipped service typically halves the working life and voids the warranty.",
      "100 years.",
      "Only as long as the customer remembers to switch it on.",
    ],
    correctAnswer: 1,
    explanation:
      "Modern inverter-driven ASHPs are designed for 15-20 year service lives. The compressor is the dominant wear part; modern variable-speed compressors avoid the on-off thermal stress that damaged older fixed-speed designs. Annual servicing is the planned-maintenance backbone that delivers the design life; the manufacturer warranty usually requires evidence of it.",
  },
  {
    id: 8,
    question:
      "What does responsible decommissioning of a PV array involve at end-of-life?",
    options: [
      "Throw the panels in a skip.",
      "Isolate AC and DC sides, lock-off, prove dead. Disconnect strings panel by panel. Remove panels using safe roof-access procedures. Recover the panels for recycling — established PV recycling streams in the UK take aluminium frames, glass, copper wiring and silicon cells separately. Inverter and any battery component handled as WEEE (electronics) and hazardous waste (battery) respectively. Roof penetrations made good. Update the EIC to reflect the removal. The MCS-certified installer (or successor) typically arranges the decommissioning chain through authorised waste carriers.",
      "Bury them in the garden.",
      "Set fire to them.",
    ],
    correctAnswer: 1,
    explanation:
      "PV decommissioning is becoming a mainstream activity as the first wave of UK installs reaches the 20-year mark. Recycling routes are established; the customer's installer or a specialist decommissioning firm handles the physical removal and the waste-stream consigning. As the L3 electrician on a decommissioning visit you handle the electrical isolation and the EIC update; the panel-recycling logistics are normally specialist scope.",
  },
];

const faqs = [
  {
    question: "Is there a single 'service interval' for renewable systems or does it vary by technology?",
    answer:
      "It varies. Heat pumps need annual service across F-Gas, wet-system and electrical scopes — required for warranty validity. PV needs annual visual inspection plus 5-year periodic EICR. Battery storage typically needs annual electrical inspection and an end-of-warranty capacity check around year 10. EV chargers follow the BS 7671 5-year EICR framework plus EV-specific RCD and open-PEN tests. MVHR needs filter changes every 6-12 months and heat-exchanger clean every 1-2 years. The handover pack should set out the schedule for the specific install.",
  },
  {
    question: "How much should a customer budget for whole-life maintenance on a typical PV plus battery plus heat pump install?",
    answer:
      "Indicative figures: heat pump annual service around £150-300 a year; PV annual visual inspection around £80-150 a year (or bundled into an MCS aftercare contract); battery annual check often bundled into the inverter inspection; PV inverter replacement once during the panel lifetime at around £1,000-2,000 depending on size; battery replacement at end-of-warranty if needed at around £4,000-7,000 depending on capacity; 5-year EICR for the whole installation at around £200-400. The customer should treat the maintenance budget as a known operating cost, comparable to running an annual gas-boiler service plus an MOT for a car.",
  },
  {
    question: "Do PV panels lose output evenly or in steps?",
    answer:
      "Crystalline silicon panels degrade gradually and roughly linearly at around 0.3-0.5% per year, after a small initial light-induced degradation in the first few hundred hours of operation. There are no sudden steps in normal operation. Sudden output drops indicate a fault — soiling, shading, MC4 connector failure, micro-cracking from impact, hot-spot from a faulty cell, inverter MPPT issue. Annual inspection picks these up. Manufacturer power-output warranties (typically 80% at year 25) describe the linear degradation envelope; manufacturer product warranties (typically 10-15 years on the panel itself) cover sudden defects.",
  },
  {
    question: "What happens to a heat pump's refrigerant at decommissioning?",
    answer:
      "An F-Gas-certified engineer recovers the refrigerant in full to a calibrated cylinder, logs the recovered weight in the F-Gas register, and returns the cylinder to the supplier or a specialist recycling stream. Venting fluorinated refrigerants is a criminal offence under the Environmental Permitting Regulations. R-32 and R-410A are typically recycled or destroyed at specialist facilities; R-290 (propane) recovery follows similar practice with additional handling for the flammable refrigerant. The recovery record stays with the system paperwork as evidence of compliant decommissioning.",
  },
  {
    question: "Can a degraded battery still be used or does it need to be scrapped immediately at end-of-warranty?",
    answer:
      "Often still useful. A battery at 70-80% of nameplate capacity is at typical end-of-warranty but may continue to serve daily PV self-consumption usefully for several more years if the customer is comfortable with the reduced capacity. Some manufacturers operate take-back schemes that channel still-functional cells into 'second-life' applications — less demanding storage uses where partial degradation is acceptable. Decision is partly economic, partly the customer's appetite for risk on an out-of-warranty battery. The MCS-certified installer can advise on the options at the warranty review point.",
  },
  {
    question: "What is OZEV's role in EV charger maintenance and inspection?",
    answer:
      "OZEV (the Office for Zero Emission Vehicles) administers the EV Chargepoint Grant for landlords and the Workplace Charging Scheme. Grant eligibility requires installation by an OZEV-authorised installer to defined technical standards, including compliance with the Electric Vehicles (Smart Charge Points) Regulations 2021. OZEV does not impose a separate inspection cycle of its own — periodic inspection follows the BS 7671 / Electrical Safety Standards Regulations framework (5-yearly EICR plus EV-specific tests). The OZEV requirement is essentially that the installation remains compliant; the BS 7671 framework is the practical inspection regime.",
  },
];

export default function Sub5() {
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
            eyebrow="Module 2 · Section 5 · Subsection 5"
            title="Long-term maintenance and service intervals"
            description="The multi-decade view across the renewables family — PV panel degradation curves, lithium-ion battery end-of-life decisions, heat pump F-Gas leak-check intervals tied to refrigerant charge weight, and EV charger inspection cycles aligned with BS 7671 and OZEV grant terms."
            tone="emerald"
          />

          <TLDR
            points={[
              "PV panels degrade around 0.3-0.5% per year on a linear basis. By year 25 a healthy Tier-1 panel is delivering 80-87% of nameplate. Manufacturer power warranties express this directly.",
              "Lithium-ion residential batteries reach typical end-of-warranty capacity (70-80% of nameplate) at around year 10 or a defined cycle count, whichever comes first.",
              "F-Gas leak-check intervals are set by CO2-equivalent charge, not by application type. Most domestic heat pumps sit below the 5-tonne CO2e mandatory annual threshold but are serviced annually for warranty reasons.",
              "EV chargers follow the BS 7671 5-year EICR framework plus EV-specific RCD and open-PEN tests. OZEV grant eligibility requires ongoing compliance with the Smart Charge Points Regulations 2021.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the typical PV panel degradation rate (around 0.3-0.5% per year linear) and the corresponding manufacturer power-output warranty profile (typically 80% at year 25).",
              "State the typical residential lithium-ion battery service life (around 10 years to 70-80% capacity) and explain the cycle-count plus calendar-age model behind the warranty.",
              "Describe the F-Gas leak-check interval framework (5 / 50 / 500 tonnes CO2-equivalent annual / six-monthly / three-monthly) and identify why most domestic heat pumps sit below the mandatory thresholds.",
              "Identify the EV charger periodic inspection cycle as the BS 7671 5-yearly EICR plus EV-specific tests, and recognise OZEV grant eligibility as a continuing compliance requirement.",
              "Recognise the PV inverter as the wear part with a typical 5-12 year warranty, and budget for at least one inverter replacement during the panel lifetime.",
              "Apply the waste hierarchy and the WEEE / Hazardous Waste Regulations to decommissioning of PV panels, batteries, inverters and heat pump components at end-of-life.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>PV — degradation curves and inverter replacement</ContentEyebrow>

          <ConceptBlock
            title="PV panels degrade gradually and predictably"
            plainEnglish="Crystalline silicon PV panels degrade at around 0.3-0.5% per year on a linear basis after a small initial light-induced degradation in the first few hundred hours of operation. By year 25 a healthy Tier-1 panel is delivering somewhere between 80% and 87% of its nameplate output. The MCS performance estimate accounts for degradation; the customer's expected lifetime kWh figure already assumes it. Manufacturer linear power-output warranties express the degradation envelope as 'at least X% at year 25'."
            onSite="As the L3 electrician at handover or on an annual inspection visit, framing degradation honestly to the customer prevents a 'why is my system underperforming?' phone call in year 12. Underperformance vs the MCS estimate after the first few years is more likely to be soiling, shading, MC4 connector corrosion or inverter drift than panel degradation itself. The annual visual inspection and the datalog review pick up the real causes early."
          >
            <p>
              The numbers in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Year 1 — light-induced degradation</strong> — small initial drop
                in the first few hundred hours of operation. Built into the manufacturer&apos;s
                year-1 warranty figure (typically 97-98% of nameplate).
              </li>
              <li>
                <strong>Years 2-25 — linear degradation</strong> — around 0.3% per year
                for premium panels, around 0.5% per year for standard Tier-1.
              </li>
              <li>
                <strong>Year 25 warranty floor</strong> — typically 80% of nameplate for
                standard panels, 85-90% for premium heterojunction or TOPCon panels.
              </li>
              <li>
                <strong>Beyond year 25</strong> — many panels continue to deliver useful
                output for years past the warranty period; degradation does not
                accelerate suddenly at the warranty endpoint.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Inverter replacement is part of the whole-life cost"
            plainEnglish="PV panels are warrantied 25 years and often deliver useful output well beyond that. Inverters are warrantied 5-12 years depending on type — string inverters typically 10-12 years; microinverters often warranty-matched to the panels at 25 years. Most domestic PV systems will need at least one inverter replacement during the 25-year panel lifetime. The replacement is straightforward — disconnect old, fit replacement of compatible spec, recommission, update the EIC."
            onSite="As the L3 electrician on an inverter replacement visit you isolate AC and DC sides, lock-off, prove dead. Replace the inverter with a compatible-spec unit (matching MPPT range, network export limit, communication protocol if integrated with battery storage). Re-commission the manufacturer settings. Update the EIC schedules to reflect the new inverter make and model. Update the customer&apos;s handover pack with the new commissioning record."
          >
            <p>
              Why the inverter is the wear part:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Active electronics — capacitors, switching components, control board,
                cooling fan — all subject to thermal cycling and ageing.
              </li>
              <li>
                High duty cycle — running every daylight hour, often in lofts or
                south-facing walls where ambient gets hot.
              </li>
              <li>
                Single point of failure on string inverters — one failure stops the
                whole array exporting until replaced.
              </li>
              <li>
                Microinverters distribute the risk across the array but cost more upfront
                and warranty-match the panels.
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

          <ContentEyebrow>Battery storage — end-of-life decisions</ContentEyebrow>

          <ConceptBlock
            title="Lithium-ion residential batteries degrade by cycle count and calendar age"
            plainEnglish="Lithium-ion battery degradation comes from four sources — cycle count, depth of discharge per cycle, temperature exposure (heat accelerates degradation), and calendar ageing. A typical residential storage battery is warrantied for around 10 years or a defined cycle count (often 6,000-10,000 full-equivalent cycles), whichever comes first. The warranty threshold is usually 70-80% of nameplate usable capacity. A 10 kWh battery delivering 7 kWh after a decade is at typical end-of-warranty capacity."
            onSite="As the L3 electrician at the warranty review point you do not own the replacement decision — that is the customer working with the MCS-certified installer or the manufacturer's service network. But you should recognise that end-of-warranty does not always mean end-of-useful-life. A battery at 70% capacity may still serve daily PV self-consumption usefully for several more years; the manufacturer take-back scheme may channel old cells into second-life applications. Decommissioning when it does happen is hazardous-waste handling under the WEEE Regulations — never improvise."
          >
            <p>
              How to extend battery service life:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Avoid extreme temperatures</strong> — install location ideally
                in a temperature-controlled space. Garages and outhouses can swing widely
                in UK winters and accelerate degradation.
              </li>
              <li>
                <strong>Avoid 100% depth of discharge</strong> — most modern residential
                batteries firmware-limit minimum state-of-charge to around 10-20% to
                preserve cycle life. Customer overrides are rarely worth the saving.
              </li>
              <li>
                <strong>Manage charge rates</strong> — high-rate charging from a large
                PV array stresses cells more than slow charging. Modern battery management
                systems handle this automatically.
              </li>
              <li>
                <strong>Annual electrical inspection</strong> — terminations, protective
                devices, RCD operation, communication with inverter. Catches problems
                before they become customer-visible.
              </li>
              <li>
                <strong>Firmware updates</strong> — battery management system improvements
                often extend usable capacity or improve cycle life. Apply manufacturer
                firmware updates as released.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Waste Electrical and Electronic Equipment Regulations 2013 (WEEE Regulations) — paraphrased producer and disposal duties"
            clause={
              <>
                Lithium-ion batteries used in domestic energy storage installations are
                classed as electrical and electronic equipment within scope of the WEEE
                Regulations and as hazardous waste under the Hazardous Waste Regulations.
                They must not be disposed of in general or mixed-recycling waste streams.
                Disposal must be via an authorised treatment facility, transported by a
                licensed waste carrier, with a consignment note providing the audit trail.
              </>
            }
            meaning={
              <>
                Lithium-ion battery fires in waste-collection vehicles and recycling
                facilities are a real and growing problem in the UK; the WEEE / Hazardous
                Waste regime exists to keep these batteries out of general waste streams.
                As the L3 electrician on a battery decommissioning visit, your role is
                recognition — never improvise. The manufacturer&apos;s take-back scheme
                or a specialist battery recycler is the route. Battery transport is
                additionally regulated under ADR (the agreement concerning the
                international carriage of dangerous goods by road). Improper disposal is
                a criminal offence with significant penalties.
              </>
            }
            cite="Source: Waste Electrical and Electronic Equipment Regulations 2013 (paraphrased from published Regulations available via legislation.gov.uk; Environment Agency guidance on lithium-ion battery handling)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Heat pumps — F-Gas service intervals</ContentEyebrow>

          <ConceptBlock
            title="F-Gas leak-check intervals are set by CO2-equivalent refrigerant charge"
            plainEnglish="Under the UK F-Gas Regulations the mandatory leak-check interval for refrigerant equipment is set by the CO2-equivalent charge — kg of refrigerant multiplied by the refrigerant's global warming potential, divided by 1000. Equipment containing 5+ tonnes CO2e requires annual mandatory leak checks; 50+ tonnes CO2e requires six-monthly; 500+ tonnes CO2e requires three-monthly (or six-monthly with a leak-detection system fitted). Most domestic ASHPs sit below the 5-tonne CO2e mandatory threshold."
            onSite="The threshold structure means refrigerant choice matters as much as charge weight. R-410A (GWP 2088) crosses the 5-tonne threshold at around 2.4 kg of refrigerant; R-32 (GWP 675) crosses at around 7.4 kg; R-290 propane (GWP 3) crosses at around 1,667 kg — effectively never in domestic kit. Manufacturer warranty terms typically require annual servicing including a visual leak check anyway, even where the regulatory threshold is not triggered. As the L3 electrician you do not perform the leak check — that is firmly within F-Gas-certified scope."
          >
            <p>
              CO2-equivalent threshold worked examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R-32 ASHP, 1.5 kg charge</strong> — 1.5 × 675 ÷ 1000 ≈ 1.0
                tonnes CO2e. Below the 5-tonne mandatory threshold; no regulatory leak-
                check requirement; manufacturer warranty typically requires annual
                servicing anyway.
              </li>
              <li>
                <strong>R-32 ASHP, 4.0 kg charge</strong> — 4.0 × 675 ÷ 1000 ≈ 2.7
                tonnes CO2e. Still below 5-tonne threshold; no regulatory leak-check
                requirement.
              </li>
              <li>
                <strong>R-410A ASHP, 3.0 kg charge</strong> — 3.0 × 2088 ÷ 1000 ≈ 6.3
                tonnes CO2e. Above the 5-tonne threshold; mandatory annual leak check
                required.
              </li>
              <li>
                <strong>R-290 ASHP, 0.6 kg charge</strong> — 0.6 × 3 ÷ 1000 ≈ 0.0018
                tonnes CO2e. Effectively zero CO2-equivalent; no F-Gas mandatory regime
                applies (R-290 is a hydrocarbon, not a fluorinated gas, and falls under
                a different regulatory framework focused on flammability).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="UK F-Gas Regulation (Regulation (EU) No 517/2014 retained as UK law) — paraphrased leak-check intervals"
            clause={
              <>
                Operators of equipment containing fluorinated greenhouse gases in
                quantities of 5 tonnes CO2-equivalent or more must ensure leak checks are
                carried out by F-Gas-certified personnel at least once every 12 months;
                50 tonnes or more at least once every six months; 500 tonnes or more at
                least once every three months. An automatic leak-detection system extends
                the maximum interval at the upper bands. Records of all checks and any
                refrigerant additions or recoveries must be maintained.
              </>
            }
            meaning={
              <>
                The threshold structure rewards lower-GWP refrigerants by reducing the
                regulatory burden. Most domestic heat pumps fall below the 5-tonne
                threshold and the regulatory regime does not bite — but manufacturer
                warranty terms typically require annual servicing anyway, including a
                visual leak inspection by an F-Gas-certified engineer. As an apprentice
                you should recognise where the regulatory line sits and recognise that
                even below it the warranty position usually requires annual service.
              </>
            }
            cite="Source: Regulation (EU) No 517/2014 on fluorinated greenhouse gases, retained as UK law (paraphrased from the published Regulation; UK guidance via gov.uk and the Environment Agency)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EV chargers — periodic inspection cycles</ContentEyebrow>

          <ConceptBlock
            title="EV charger periodic inspection follows BS 7671 plus EV-specific tests"
            plainEnglish="EV chargers are subject to mechanical wear (cable, plug), weather exposure, and sustained high-current operation. The standard periodic-inspection framework is the BS 7671 5-yearly EICR — covering the EV charger circuit alongside the rest of the fixed installation. EV-specific tests add RCD operation (Type B or RDC-DD), open-PEN protection function (where the unit has built-in open-PEN), and Zs at the charge point. Landlord properties additionally subject to the Electrical Safety Standards Regulations 2020 (5-year EICR plus change of tenancy)."
            onSite="As the L3 electrician on a 5-year EICR for an EV-equipped property, the EV charger circuit gets the standard inspection plus the EV-specific RCD / open-PEN checks. Section 722 of BS 7671 (EV charging) drives the special inspection items. Where the charger has been involved in a fault event (known surge, vehicle-side incident) bring the inspection forward. OZEV grant eligibility requires the installation to remain compliant with the Electric Vehicles (Smart Charge Points) Regulations 2021 — the BS 7671 framework is the practical inspection regime that demonstrates compliance."
          >
            <p>
              EV charger periodic inspection items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable and plug condition</strong> — look for damage, fraying,
                melted spots from poor mating or sustained high current. Replace if
                degraded.
              </li>
              <li>
                <strong>Mounting and weatherproofing</strong> — IP rating intact, no
                water ingress, sealing gaskets in place.
              </li>
              <li>
                <strong>RCD operation</strong> — Type B (or Type A + RDC-DD device);
                operating time at I△n and 5×I△n; smooth-DC test for Type B.
              </li>
              <li>
                <strong>Open-PEN protection function</strong> — confirmed working per
                the manufacturer&apos;s test procedure (where the unit has built-in
                open-PEN protection rather than a TT earth electrode arrangement).
              </li>
              <li>
                <strong>Earthing</strong> — Zs at the charge point; earth electrode
                resistance if TT arrangement.
              </li>
              <li>
                <strong>Firmware</strong> — update to the latest manufacturer-supplied
                version. Smart Charge Points Regulations require certain default
                charging behaviours (off-peak default, randomised delay) to be
                maintained.
              </li>
              <li>
                <strong>Smart functions</strong> — confirm the demand-side response
                features required under the 2021 Regulations are still operational.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electric Vehicles (Smart Charge Points) Regulations 2021 — paraphrased ongoing duties"
            clause={
              <>
                Charge points sold for use in domestic and workplace settings in Great
                Britain must support smart functionality including demand-side response,
                a default off-peak charging schedule, a randomised delay, measurement of
                electricity consumption, and protection against cyber-attack. Software
                updates are permitted to maintain compliance. Modifications removing the
                smart functionality are prohibited.
              </>
            }
            meaning={
              <>
                The 2021 Regulations sit on top of BS 7671 Section 722 and apply to the
                charge point throughout its service life — not just at point of sale.
                As the L3 electrician on a 5-year EICR you should confirm that the
                smart functions remain operational and the firmware is up to date.
                OZEV grant eligibility for the customer (where applicable) depends on
                this continuing compliance. A charge point with smart functions disabled
                or stale firmware may be in breach of the Regulations.
              </>
            }
            cite="Source: Electric Vehicles (Smart Charge Points) Regulations 2021 SI 2021/1467 (paraphrased from published Regulations available via legislation.gov.uk; OZEV guidance)."
          />

          <SectionRule />

          <ContentEyebrow>Heat pump service life — the compressor is the wear part</ContentEyebrow>

          <ConceptBlock
            title="Modern inverter-driven ASHPs are designed for 15-20 year service lives"
            plainEnglish="A well-maintained domestic ASHP should deliver around 15-20 years of service, comparable to a high-quality gas boiler. The compressor is the dominant wear part — modern variable-speed inverter-driven compressors avoid the harsh on-off thermal cycling that wore out earlier fixed-speed designs. Secondary wear includes the fan motor, the expansion valve, the controls electronics and the contactor coils on the supply side. Annual servicing across F-Gas, wet-system and electrical scopes is what delivers the design life; skipped service typically halves it."
            onSite="As the L3 electrician on the electrical scope of an annual service, document Zs at the outdoor isolator, RCD operating times at I△n and 5×I△n (with smooth-DC test where the unit is fed via a Type B RCD), continuity at the supplementary bonding (where the outdoor unit is an extraneous-conductive-part), and the controls integration test. Drift in any of these between annual visits is an early warning of cabling, termination or RCD wear that needs attention before it becomes a fault."
          >
            <p>
              Failure modes by typical service-life year:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Years 1-3</strong> — early-life teething (controls firmware
                bugs, occasional refrigerant top-up after settling, balancing tweaks
                on the wet system). Mostly resolved at the first annual service.
              </li>
              <li>
                <strong>Years 4-10</strong> — the steady-state phase. Annual service
                catches gradual sludge build-up in the wet system, slight refrigerant
                loss, drift in the weather compensation curve.
              </li>
              <li>
                <strong>Years 10-15</strong> — wear parts start to surface. Fan motor
                bearings, expansion valve, contactor coils. Compressor still going
                strong on inverter-driven units.
              </li>
              <li>
                <strong>Years 15-20</strong> — compressor reaches the end of its
                economic life. Replacement may be cost-effective; wholesale unit
                replacement increasingly likely. The wet-system and outdoor housing
                may still be serviceable.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>End-of-life decommissioning across the family</ContentEyebrow>

          <ConceptBlock
            title="The waste hierarchy applied to renewables decommissioning"
            plainEnglish="The waste hierarchy — reduce, reuse, recycle, recover, dispose — is a statutory principle under the Waste (England and Wales) Regulations 2011. Applied to a renewables decommissioning visit it means: reuse second-life cells where the manufacturer take-back scheme supports it; recycle aluminium frames, glass, copper and steel through established streams; recover refrigerant via F-Gas-certified engineer; and only dispose what genuinely cannot be reused, recycled or recovered. The L3 electrician handles the electrical isolation and the EIC update; the panel-recycling, refrigerant-recovery and battery take-back logistics are normally specialist scope co-ordinated through the firm's waste-handling procedure."
            onSite="Decommissioning is becoming a mainstream activity as the first wave of UK renewables installs reaches the 20-year mark. Recycling routes for PV panels (aluminium frames, glass, silicon cells), inverters (WEEE electronics), batteries (manufacturer take-back) and heat pumps (refrigerant recovery, copper, steel) are all established. Use them — do not improvise. The 2357 Unit 312 ELTP02 AC 1.1 explicitly requires demonstration of safe handling, storage and disposal of hazardous materials per the Hazardous Waste Regulations."
          >
            <p>
              Decommissioning steps in order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolate, lock-off, prove dead</strong> — AC and DC sides, both
                ends of every isolator. Verify with an approved voltage indicator
                (proved on a known live source before and after the test).
              </li>
              <li>
                <strong>Disconnect strings panel by panel</strong> — for PV; safe
                roof-access procedures, fall-arrest where needed.
              </li>
              <li>
                <strong>Recover refrigerant</strong> — F-Gas-certified engineer only;
                logged in the F-Gas register; recovered to a calibrated cylinder for
                return to the supplier or specialist recycling stream.
              </li>
              <li>
                <strong>Battery take-back</strong> — manufacturer&apos;s scheme or
                specialist battery recycler; consignment note documenting
                serial / cylinder numbers; ADR-compliant transport.
              </li>
              <li>
                <strong>Inverter, controls, smart kit</strong> — WEEE Regulations;
                producer take-back or licensed WEEE carrier.
              </li>
              <li>
                <strong>Frames, cabling, structural components</strong> — standard
                recyclable streams (aluminium, copper, steel).
              </li>
              <li>
                <strong>Make good</strong> — roof penetrations sealed, weatherproofing
                restored, scarred wall surfaces patched.
              </li>
              <li>
                <strong>Update the EIC</strong> — to reflect the removal; provide the
                customer with a closure document for the handover pack.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Whole-life cost framing — the spending profile beyond the install"
            plainEnglish="Renewable installs are typically sold on the headline install cost, but a multi-decade view should also include the whole-life maintenance, replacement and decommissioning spending. Honest framing of the spending profile at handover protects the customer from being surprised at year 10 by an inverter replacement or at year 12 by a battery review. As the L3 electrician you do not run the customer's economic case, but the aftercare review is the moment to talk through the realistic numbers."
            onSite="A typical 4 kWp PV with 5 kWh battery and 7 kW ASHP install carries a whole-life spending profile beyond the install cost — annual servicing, mid-life inverter replacement, mid-life battery review, end-of-life decommissioning. The aftercare visits are the moments to refresh the customer's expectations. The MCS Code 4.0 12-month aftercare visit is one anchor; further reviews at year 5, 10, 15 are good practice."
          >
            <p>
              Indicative whole-life spending milestones:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Annual</strong> — heat pump service around £150-300; PV annual
                visual inspection around £80-150 (bundled into MCS aftercare contract
                where available); MVHR filter changes (often customer-side DIY).
              </li>
              <li>
                <strong>Year 5</strong> — first periodic EICR for the whole fixed
                installation, around £200-400.
              </li>
              <li>
                <strong>Year 10</strong> — battery warranty review point; potential
                replacement around £4,000-7,000 if needed; second EICR.
              </li>
              <li>
                <strong>Years 10-15</strong> — first PV inverter replacement likely;
                around £1,000-2,000 for a like-for-like unit.
              </li>
              <li>
                <strong>Years 15-20</strong> — heat pump compressor or whole-unit
                replacement may surface depending on usage and service history.
              </li>
              <li>
                <strong>Year 25+</strong> — PV decommissioning or major refurbishment;
                panel recycling stream; new inverter generation likely if the
                customer chooses to keep PV running on the array structure.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Telling a customer their PV system is 'underperforming' when it is just the normal degradation curve"
            whatHappens={
              <>
                Customer phones at year 12 worried that their PV system is producing
                less than it did in year 1. Apprentice arrives, sees output is around
                94% of year-1 figures, agrees it is &quot;underperforming&quot; and starts
                checking inverter, strings and connectors looking for a fault. There is
                no fault — 12 years of 0.5% per year degradation is exactly what the
                manufacturer warranty predicts, and 94% at year 12 is healthy. The
                customer ends up paying for an unnecessary investigation.
              </>
            }
            doInstead={
              <>
                Know the degradation curve before the visit. Year 1 around 97-98% of
                nameplate (after light-induced degradation); year 25 around 80-87% of
                nameplate. If the system is tracking the linear envelope it is healthy.
                If it has dropped sharply or sits below the warranty floor, then
                investigate. The MCS performance estimate already accounts for the
                degradation; customer expectations should track it. Frame the curve
                honestly at handover and again at every aftercare visit.
              </>
            }
          />

          <CommonMistake
            title="Disposing of an end-of-life lithium-ion battery as general WEEE"
            whatHappens={
              <>
                Battery has reached end-of-warranty capacity. Apprentice / installer
                removes it and, treating it as general electronics, drops it at the
                household waste recycling centre&apos;s WEEE bay. The HWRC operator
                refuses or accepts it but routes it to the wrong stream. Lithium-ion
                cells short, swell, ignite — fire in the storage area or in the
                onward-transport vehicle. Investigation traces the battery back to the
                install firm. Hazardous Waste Regulations breach, Environment Agency
                enforcement action, civil claim from the recycling firm, reputational
                damage, possible MCS scheme sanction.
              </>
            }
            doInstead={
              <>
                Lithium-ion batteries are hazardous waste, not general WEEE.
                Decommissioning goes via the manufacturer&apos;s take-back scheme or a
                specialist battery recycler with the correct authorisation. Battery
                transport is additionally regulated under ADR. As the L3 electrician
                on a battery decommissioning visit, never improvise — use the
                firm&apos;s waste-handling procedure and the authorised waste carrier.
                Document the consignment note with the cylinder / battery serial
                numbers for the audit trail.
              </>
            }
          />

          <Scenario
            title="Year-12 review on a domestic install — PV plus battery plus heat pump"
            situation={
              <>
                You are visiting a customer for an annual aftercare review on a 4 kWp PV
                array with a 5 kWh battery and a 7 kW ASHP. The system was installed
                12 years ago by your firm. The customer has the original handover pack
                to hand. They want to know &quot;how the system is doing&quot; and what
                spending might be coming up over the next decade.
              </>
            }
            whatToDo={
              <>
                Walk the components in order. PV: pull the datalog; expected output at
                year 12 is around 94% of year-1 (assuming 0.5% per year linear
                degradation); compare actual against expected; if tracking the curve,
                the array is healthy and no panel intervention needed. Inverter: check
                its age — if it is the original 12-year-old unit it is at the end of
                its typical warranty window and a replacement should be planned in the
                next few years. Budget around £1,000-2,000 for a like-for-like
                replacement. Battery: check usable capacity vs nameplate — if it has
                degraded to around 75-80% it is approaching the typical warranty
                threshold; check the warranty wording in the handover pack and flag the
                approaching review point with the customer. ASHP: review service
                records — the unit should be at year 12 with annual service evidence;
                refrigerant charge weight checked at every service against the F-Gas
                record; SCOP estimate from the recent service should still be within
                the design envelope. Update the customer with a written summary of the
                year-12 condition and the projected spending profile for the next
                decade. Refresh the handover pack with the latest service records and
                the year-12 review note.
              </>
            }
            whyItMatters={
              <>
                The customer&apos;s decisions over the next decade — keep, repair,
                replace, decommission — turn on what state the equipment is actually in
                and what the realistic remaining life is. Honest framing protects the
                customer from being sold unnecessary replacements and from being
                surprised by necessary ones. As the L3 electrician you are not a
                financial advisor, but an evidence-based condition report and a
                realistic projection lets the customer plan. The MCS Code 4.0 aftercare
                duties cover this kind of review for MCS installs; non-MCS installs
                still benefit from the same approach.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "PV panels degrade around 0.3-0.5% per year on a linear basis; year-25 output typically 80-87% of nameplate. The MCS performance estimate accounts for it.",
              "PV inverters are the wear part — typical 5-12 year warranty, replacement during the panel lifetime should be budgeted from the start.",
              "Lithium-ion residential batteries reach typical end-of-warranty capacity (70-80% of nameplate) at around year 10 or a defined cycle count, whichever comes first.",
              "Battery decommissioning is hazardous-waste handling under WEEE / Hazardous Waste Regulations. Manufacturer take-back schemes and specialist recyclers only.",
              "F-Gas leak-check intervals are set by CO2-equivalent refrigerant charge (5 / 50 / 500 tonnes thresholds). Most domestic heat pumps sit below the mandatory thresholds but are serviced annually for warranty.",
              "Heat pump service life around 15-20 years with annual servicing maintained. Compressor is the dominant wear part.",
              "EV chargers follow BS 7671 5-year EICR plus EV-specific RCD and open-PEN tests. Section 722 drives the special inspection items.",
              "OZEV grant eligibility requires ongoing compliance with the Electric Vehicles (Smart Charge Points) Regulations 2021 — smart functions and firmware kept current.",
            ]}
          />

          <Quiz title="Long-term maintenance and service intervals — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 Commissioning paperwork chain
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module home <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 — Environmental technology
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
