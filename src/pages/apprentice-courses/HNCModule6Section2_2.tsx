/**
 * Module 6 · Section 2 · Subsection 2 — Heat Pump Technology
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   ASHP and GSHP systems, COP and SCOP performance metrics, system design principles, and MCS certification requirements
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Heat Pump Technology - HNC Module 6 Section 2.2';
const DESCRIPTION =
  'Master heat pump technology for building services: ASHP and GSHP systems, COP and SCOP calculations, system design and sizing, integration with heating systems, and MCS certification requirements.';

const quickCheckQuestions = [
  {
    id: 'cop-definition',
    question: 'What does COP (Coefficient of Performance) measure in a heat pump system?',
    options: [
      'The maximum temperature output',
      'The ratio of heat output to electrical input',
      'The refrigerant flow rate',
      'The compressor efficiency rating',
    ],
    correctIndex: 1,
    explanation:
      'COP is the ratio of useful heat output to electrical energy input. A COP of 3.5 means the heat pump produces 3.5 kW of heat for every 1 kW of electrical energy consumed.',
  },
  {
    id: 'ashp-vs-gshp',
    question: 'Why do GSHP systems typically achieve higher seasonal efficiency than ASHP systems?',
    options: [
      'They use more powerful compressors',
      'Ground temperatures remain more stable throughout the year',
      'They operate at higher refrigerant pressures',
      'They have larger heat exchangers',
    ],
    correctIndex: 1,
    explanation:
      'Ground temperatures at depth remain relatively constant (8-12°C in the UK) throughout the year, whilst air temperatures vary significantly. This stability allows GSHP systems to maintain higher efficiency across all seasons.',
  },
  {
    id: 'flow-temperature',
    question:
      'What is the maximum recommended flow temperature for heat pump systems to maintain good efficiency?',
    options: ['65°C', '55°C', '45°C', '35°C'],
    correctIndex: 2,
    explanation:
      'Heat pumps operate most efficiently at flow temperatures of 45°C or below. Higher temperatures significantly reduce COP and are typically only achieved using supplementary heating or during defrost cycles.',
  },
  {
    id: 'mcs-requirement',
    question: 'What is the primary purpose of MCS certification for heat pump installations?',
    options: [
      'To reduce installation costs',
      'To qualify for government incentive schemes like BUS',
      'To allow higher operating temperatures',
      'To eliminate commissioning requirements',
    ],
    correctIndex: 1,
    explanation:
      'MCS (Microgeneration Certification Scheme) certification is required for installations to qualify for government incentive schemes such as the Boiler Upgrade Scheme (BUS). It ensures quality standards and consumer protection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A heat pump produces 10 kW of heat output whilst consuming 2.5 kW of electrical power. What is the COP?',
    options: ['2.5', '4.0', '7.5', '12.5'],
    correctAnswer: 1,
    explanation:
      'COP = Heat Output ÷ Electrical Input = 10 kW ÷ 2.5 kW = 4.0. This means the heat pump delivers 4 units of heat for every 1 unit of electricity consumed.',
  },
  {
    id: 2,
    question: 'What does SCOP measure that COP does not?',
    options: [
      'Peak efficiency only',
      'Efficiency including auxiliary energy over a heating season',
      'Cooling mode performance',
      'Defrost cycle efficiency only',
    ],
    correctAnswer: 1,
    explanation:
      'SCOP (Seasonal Coefficient of Performance) measures the average efficiency across an entire heating season, including standby losses, auxiliary equipment energy, and varying outdoor conditions. COP is measured at a single test point.',
  },
  {
    id: 3,
    question:
      'At what depth do horizontal ground loop collectors for GSHP systems typically need to be installed?',
    options: ['0.5 to 0.8 metres', '1.0 to 1.5 metres', '2.0 to 2.5 metres', '3.0 to 4.0 metres'],
    correctAnswer: 1,
    explanation:
      'Horizontal ground loops are typically installed at 1.0 to 1.5 metres depth, below the frost line but shallow enough to benefit from solar gain. This provides relatively stable temperatures whilst minimising excavation costs.',
  },
  {
    id: 4,
    question: 'Why is a buffer vessel often required in heat pump installations?',
    options: [
      'To increase the hot water storage capacity',
      'To reduce short-cycling and ensure minimum run times',
      'To eliminate the need for a circulation pump',
      'To improve refrigerant charge levels',
    ],
    correctAnswer: 1,
    explanation:
      'Buffer vessels increase system water volume, preventing short-cycling (frequent on/off cycling) which reduces efficiency and compressor life. They ensure the heat pump can run for adequate periods, typically minimum 6-10 minutes.',
  },
  {
    id: 5,
    question:
      'For MCS compliance, what is the maximum permitted design flow temperature for radiator systems?',
    options: ['75°C', '65°C', '55°C', '45°C'],
    correctAnswer: 2,
    explanation:
      'MCS Heat Pump Standard MIS 3005 permits a maximum design flow temperature of 55°C for radiator systems. Lower temperatures (35-45°C) are preferred for optimal efficiency, requiring correctly sized emitters.',
  },
  {
    id: 6,
    question: 'What is the approximate ground temperature at 100 metres depth in the UK?',
    options: ['4-6°C', '8-12°C', '14-18°C', '20-24°C'],
    correctAnswer: 1,
    explanation:
      'In the UK, ground temperatures at depth stabilise at approximately 8-12°C, close to the annual average air temperature. This remains relatively constant throughout the year, providing a stable heat source for GSHP systems.',
  },
  {
    id: 7,
    question:
      'When sizing radiators for a heat pump system operating at 45°C flow temperature, approximately what factor should be applied compared to a 75°C conventional boiler system?',
    options: [
      '1.5 times larger',
      '2.0 times larger',
      '2.5 to 3.0 times larger',
      '4.0 times larger',
    ],
    correctAnswer: 2,
    explanation:
      'At 45°C flow temperature versus 75°C, radiators need to be approximately 2.5 to 3 times larger to deliver the same heat output. This is due to the significantly reduced temperature difference between the radiator surface and room air.',
  },
  {
    id: 8,
    question:
      'What is the current grant value available under the Boiler Upgrade Scheme (BUS) for ASHP installations in England?',
    options: ['£5,000', '£6,000', '£7,500', '£10,000'],
    correctAnswer: 2,
    explanation:
      'The Boiler Upgrade Scheme provides £7,500 towards air source heat pump installations in England (as of 2024). The property must be existing (not new build) and the installer must be MCS certified.',
  },
  {
    id: 9,
    question: "During defrost cycles, what happens to the ASHP's heating output?",
    options: [
      'Output increases temporarily',
      'Output is maintained at normal levels',
      'Output reduces or stops whilst the outdoor unit defrosts',
      'The system switches to cooling mode',
    ],
    correctAnswer: 2,
    explanation:
      'During defrost cycles, the heat pump temporarily reverses to remove ice from the outdoor coil. This reduces or stops heating output for 2-10 minutes. Systems must be sized to account for defrost impact on overall capacity.',
  },
  {
    id: 10,
    question: 'What is the typical brine concentration used in GSHP ground loop systems?',
    options: ['10% ethylene glycol', '25% propylene glycol', '50% methanol', 'Pure water'],
    correctAnswer: 1,
    explanation:
      'Ground loops typically use 25-30% propylene glycol (food-grade antifreeze) mixed with water. This provides freeze protection to approximately -15°C whilst maintaining acceptable heat transfer properties and being environmentally safer than ethylene glycol.',
  },
  {
    id: 11,
    question:
      'According to MCS requirements, what must be provided to the customer after heat pump installation?',
    options: [
      "Only the manufacturer's warranty certificate",
      'A handover pack including MCS certificate, operating instructions, and performance data',
      'Just the electrical installation certificate',
      'The commissioning data only',
    ],
    correctAnswer: 1,
    explanation:
      'MCS requires a comprehensive handover pack including the MCS certificate, user operating instructions, maintenance requirements, commissioning data, performance expectations, and warranty information. This ensures customers can operate and maintain their system correctly.',
  },
  {
    id: 12,
    question:
      'What is the primary advantage of inverter-driven (variable speed) compressors in heat pumps?',
    options: [
      'Lower installation cost',
      'Ability to modulate output to match heating demand',
      'Higher maximum temperatures',
      'Elimination of defrost requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Inverter compressors modulate speed to match heating demand, avoiding the on/off cycling of fixed-speed units. This improves seasonal efficiency (SCOP), reduces wear, maintains more stable temperatures, and often eliminates the need for buffer vessels.',
  },
];

const faqs = [
  {
    question: 'What is the difference between monobloc and split system heat pumps?',
    answer:
      'Monobloc units contain all refrigerant components in the outdoor unit, with only water pipes connecting to the building. This simplifies installation (no F-Gas certification required) and reduces refrigerant charge. Split systems have the evaporator outside and condenser inside, connected by refrigerant pipes - requiring F-Gas qualified installation but potentially offering slightly higher efficiency and more flexible placement.',
  },
  {
    question: 'How do I calculate the heat pump size required for a property?',
    answer:
      'Heat pump sizing requires a room-by-room heat loss calculation to MCS MIS 3005 standards. Key factors include: building fabric U-values, air infiltration rate, design temperatures (-3°C external for most UK locations), and ventilation requirements. The total heat loss determines heat pump capacity, typically with 10-20% margin. Oversizing wastes money and causes cycling issues; undersizing may require supplementary heating.',
  },
  {
    question: 'Can existing radiators be used with a heat pump?',
    answer:
      'Existing radiators can often be reused if they are adequately sized for lower flow temperatures. Calculate the required output at heat pump temperatures (typically 45-50°C) - radiators may need to be 2-3 times larger than for a 75°C boiler system. Individual room assessments determine if radiators need upgrading. Underfloor heating is ideal for heat pumps due to its large surface area and low temperature operation.',
  },
  {
    question: 'What maintenance do heat pump systems require?',
    answer:
      'Annual maintenance should include: checking refrigerant pressures and temperatures, cleaning filters and outdoor unit, inspecting electrical connections, verifying controls operation, checking antifreeze concentration (GSHP), and reviewing system performance data. The outdoor unit needs clear airflow - keep vegetation trimmed back 500mm minimum. Most manufacturers require annual servicing to maintain warranty.',
  },
  {
    question: 'Why is the BUS grant not available for new build properties?',
    answer:
      'The Boiler Upgrade Scheme targets existing buildings to encourage replacement of fossil fuel heating systems, reducing carbon emissions from the existing housing stock. New builds are required to meet Building Regulations Part L which already mandates low-carbon heating, making additional incentives unnecessary. New builds should comply with Future Homes Standard requirements.',
  },
  {
    question: 'What noise levels are typical for ASHP installations?',
    answer:
      'Modern ASHP units typically produce 40-60 dB(A) at 1 metre distance - similar to a refrigerator or quiet conversation. Planning guidance (MCS 020) requires assessment of noise impact on neighbours, with permitted development limits typically 42 dB(A) at the nearest boundary. Acoustic enclosures, anti-vibration mounts, and careful positioning can reduce noise impact. Night setback modes reduce output and noise during sleeping hours.',
  },
];

const HNCModule6Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 2"
            title="Heat Pump Technology"
            description="ASHP and GSHP systems, COP and SCOP performance metrics, system design principles, and MCS certification requirements"
            tone="purple"
          />

          <TLDR
            points={[
              "Heat pumps move heat using a refrigerant cycle — coefficient of performance (COP) typically 3.0–4.5 for ASHP and 4.0–5.5 for GSHP, meaning 1 kWh of electricity delivers 3–5 kWh of heat.",
              "Seasonal Coefficient of Performance (SCOP) is the regulated metric — averaged across the heating season at the dwelling location; minimum 2.5 for Part L 2021 compliance, notional value 3.5+.",
              "MCS certification (MCS 015 + MIS 3005) is required for BUS grant funding (£7,500 ASHP / GSHP) and for SAP claim of installed efficiency.",
            ]}
          />

          <RegsCallout
            source="MIS 3005 — Microgeneration Installation Standard for Heat Pump Systems"
            clause="Heat pump systems shall be designed, installed, set to work and commissioned by an MCS-certified contractor. The system designer shall complete a heat loss calculation in accordance with BS EN 12831 (or equivalent), select equipment of appropriate capacity, demonstrate that the seasonal performance under the SAP methodology meets or exceeds the minimum, and provide the customer with the design data, commissioning records and operating instructions."
            meaning={
              <>
                MIS 3005 is the practical standard — it sits above MCS 015 (the product certification scheme). Every BUS-funded installation and every dwelling claiming heat-pump SAP credits must be MIS 3005 compliant. Sizing per BS EN 12831 (room-by-room heat loss) is mandatory; rule-of-thumb sizing forfeits the certification and the grant.
              </>
            }
            cite="Source: MIS 3005 Issue 5.0 — MCS / mcscertified.com"
          />

          <LearningOutcomes
            outcomes={[
              "Explain ASHP and GSHP operating principles and applications",
              "Calculate and interpret COP and SCOP performance values",
              "Apply heat pump sizing methodology to building heat loss",
              "Design heating systems for low-temperature heat pump operation",
              "Specify buffer vessels, emitters, and controls for heat pump integration",
              "Understand MCS certification and BUS grant requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Heat Pump Operating Principles">
            <p>Heat pumps extract low-grade heat from ambient sources (air, ground, or water) and upgrade it to useful temperatures for space heating and hot water. They operate on the vapour compression cycle, using electrical energy to drive a compressor that transfers heat from a cold source to a warmer sink.</p>
            <p><strong>The Refrigeration Cycle in Heat Pumps:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Evaporator:</strong> Low-pressure refrigerant absorbs heat from the source (air/ground), evaporating from liquid to gas</li>
              <li><strong>Compressor:</strong> Raises refrigerant pressure and temperature using electrical energy</li>
              <li><strong>Condenser:</strong> High-pressure refrigerant releases heat to the heating system, condensing back to liquid</li>
              <li><strong>Expansion valve:</strong> Reduces pressure, cooling refrigerant ready to absorb heat again</li>
            </ul>
            <p><strong>Air Source vs Ground Source Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat source temperature:</strong> -15°C to +35°C (variable) — 8-12°C (stable)</li>
              <li><strong>Typical SCOP:</strong> 2.8 - 3.5 — 3.5 - 4.5</li>
              <li><strong>Installation cost (typical):</strong> £8,000 - £15,000 — £15,000 - £35,000</li>
              <li><strong>Land requirement:</strong> Outdoor unit location only — Borehole or extensive trenching</li>
              <li><strong>Defrost cycles:</strong> Required in cold/humid conditions — Not required</li>
              <li><strong>Noise considerations:</strong> Fan noise requires assessment — Indoor equipment only</li>
            </ul>
            <p><strong>Key principle:</strong> The smaller the temperature lift (difference between source and output), the higher the efficiency. This is why heat pumps work best with low-temperature heating systems.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="COP and SCOP Performance Metrics">
            <p>Understanding heat pump efficiency metrics is essential for system selection, sizing, and predicting running costs. COP and SCOP provide different but complementary measures of performance.</p>
            <p><strong>COP Calculation</strong></p>
            <p><span>COP = Heat Output (kW) ÷ Electrical Input (kW)</span></p>
            <p>Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat output:</strong> 12 kW</li>
              <li><strong>Electrical input:</strong> 3 kW</li>
              <li><strong>COP:</strong> 12 ÷ 3 = 4.0</li>
            </ul>
            <p>Energy delivered: 4 kW heat for every 1 kW electricity</p>
            <p><strong>COP (Coefficient of Performance)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Instantaneous efficiency at test conditions</li>
              <li>Measured at specific source/output temperatures</li>
              <li>Does not include standby or auxiliary losses</li>
              <li>Useful for comparing at specific operating points</li>
            </ul>
            <p><strong>SCOP (Seasonal COP)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Average efficiency over heating season</li>
              <li>Includes part-load operation and cycling</li>
              <li>Accounts for standby and auxiliary power</li>
              <li>Better predictor of actual running costs</li>
            </ul>
            <p><strong>Factors Affecting COP</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Source temperature ↑:</strong> COP increases — GSHP preferred in cold climates</li>
              <li><strong>Flow temperature ↓:</strong> COP increases — Design for 35-45°C where possible</li>
              <li><strong>Part-load operation:</strong> Inverter units maintain efficiency — Avoid oversizing fixed-speed units</li>
              <li><strong>Defrost cycles:</strong> Reduces effective output — Allow for defrost in ASHP sizing</li>
              <li><strong>Cycling frequency:</strong> Frequent cycling reduces SCOP — Buffer vessels or modulating units</li>
            </ul>
            <p><strong>Running Cost Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Annual heat demand:</strong> 18,000 kWh</li>
              <li><strong>SCOP:</strong> 3.2</li>
              <li><strong>Electricity required:</strong> 18,000 ÷ 3.2 = 5,625 kWh</li>
              <li><strong>Electricity rate:</strong> 24p/kWh</li>
              <li><strong>Annual running cost:</strong> 5,625 × £0.24 = £1,350</li>
            </ul>
            <p>Compare: Gas boiler (90% efficiency, 7p/kWh) = £1,400/year</p>
            <p><strong>Efficiency benchmark:</strong> MCS requires a minimum SPF (Seasonal Performance Factor) of 2.5 for installations to qualify for incentive schemes.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="System Design and Sizing">
            <p>Correct sizing is critical for heat pump performance. Undersizing leads to comfort issues and supplementary heating dependency; oversizing causes cycling, reduced efficiency, and wasted capital expenditure.</p>
            <p><strong>Heat Loss Calculation Process (MCS MIS 3005)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Room-by-room calculation:</strong> Calculate fabric and ventilation losses for each room</li>
              <li><strong>U-values:</strong> Use actual or estimated values for walls, roof, floor, windows, doors</li>
              <li><strong>Design temperatures:</strong> Internal 21°C, external typically -3°C for most UK locations</li>
              <li><strong>Ventilation:</strong> Air change rates based on room type and building airtightness</li>
              <li><strong>Thermal bridging:</strong> Add allowance for heat loss at junctions (typically 10-15%)</li>
            </ul>
            <p><strong>Heat Loss Calculation Example</strong></p>
            <p>Living room: 5m × 4m × 2.4m ceiling</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>External wall area:</strong> 12 m² (after windows)</li>
              <li><strong>U-value:</strong> 0.35 W/m²K</li>
              <li><strong>Temperature difference:</strong> 21 - (-3) = 24K</li>
              <li><strong>Wall loss:</strong> 12 × 0.35 × 24 = 100.8 W</li>
            </ul>
            <p>+ Window loss + Floor loss + Roof loss + Ventilation loss</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Total room heat loss:</strong> 850 W</li>
            </ul>
            <p><strong>Emitter Sizing for Low Temperatures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>75/65°C (boiler):</strong> 70°C — 1.00 — Baseline</li>
              <li><strong>55/45°C:</strong> 50°C — 0.52 — 1.9× larger</li>
              <li><strong>45/40°C:</strong> 42.5°C — 0.37 — 2.7× larger</li>
              <li><strong>35/30°C (UFH):</strong> 32.5°C — 0.21 — 4.8× larger</li>
            </ul>
            <p><strong>Buffer Vessel Sizing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum run time: 6-10 minutes</li>
              <li>Typical sizing: 10-20 litres per kW</li>
              <li>Not needed with inverter units (usually)</li>
              <li>Consider low-loss header alternative</li>
            </ul>
            <p><strong>Hot Water Cylinder Sizing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 150-200 litres for heat pump</li>
              <li>Large coil area essential (3+ m²)</li>
              <li>Consider pre-heat/preheat cylinders</li>
              <li>Legionella cycle provision required</li>
            </ul>
            <p><strong>Sizing rule:</strong> For ASHP, allow 10-15% additional capacity for defrost impact. Never size to peak load only - consider annual energy requirements and part-load efficiency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="MCS Certification and BUS Grant Requirements">
            <p>The Microgeneration Certification Scheme (MCS) provides quality assurance for heat pump installations in the UK. MCS certification is mandatory for accessing government incentive schemes including the Boiler Upgrade Scheme (BUS).</p>
            <p><strong>MCS Heat Pump Standard (MIS 3005) Key Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat loss calculation:</strong> Room-by-room to approved methodology</li>
              <li><strong>System design:</strong> Documented design including all components</li>
              <li><strong>Product certification:</strong> Heat pump must be MCS-certified product</li>
              <li><strong>Installer certification:</strong> Company must hold MCS installer certificate</li>
              <li><strong>Commissioning:</strong> Full commissioning to manufacturer requirements</li>
              <li><strong>Documentation:</strong> Comprehensive handover pack for customer</li>
            </ul>
            <p><strong>Boiler Upgrade Scheme (BUS) - Key Facts</strong></p>
            <p><strong>Grant values (2024):</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Air source heat pump: <strong>£7,500</strong></li>
              <li>- Ground source heat pump: <strong>£7,500</strong></li>
              <li>- Biomass boiler (rural only): <strong>£5,000</strong></li>
            </ul>
            <p><strong>Eligibility requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Existing building (not new build)</li>
              <li>- Valid EPC (no loft/cavity wall recommendations outstanding)</li>
              <li>- MCS-certified installer and product</li>
              <li>- Replacing fossil fuel or electric heating system</li>
              <li>- England and Wales (Scotland has separate scheme)</li>
            </ul>
            <p><strong>MCS Documentation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat loss calculation:</strong> Justifies system sizing — Pre-installation</li>
              <li><strong>System design:</strong> Component specification — Pre-installation</li>
              <li><strong>Commissioning record:</strong> Performance verification — Completion</li>
              <li><strong>MCS certificate:</strong> Scheme compliance — Post-installation</li>
              <li><strong>Handover pack:</strong> Customer information — Handover</li>
              <li><strong>Electrical certificate:</strong> BS 7671 compliance — Completion</li>
            </ul>
            <p><strong>Electrical Installation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply capacity:</strong> Verify DNO supply adequate (typically 60-100A single phase, or three phase)</li>
              <li><strong>Dedicated circuit:</strong> Separate MCB/RCBO for heat pump (typically 20-32A)</li>
              <li><strong>Isolator:</strong> Local isolation adjacent to outdoor unit</li>
              <li><strong>Earth bonding:</strong> Supplementary bonding to metal pipework</li>
              <li><strong>Outdoor wiring:</strong> UV-resistant cable or conduit for external runs</li>
              <li><strong>RCD protection:</strong> 30mA RCD protection as per BS 7671</li>
            </ul>
            <p><strong>Compliance note:</strong> Building Regulations Part L notification is required for heat pump installations. The installation must also comply with Part P for electrical work and Part G for unvented hot water where applicable.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: COP to Running Cost Comparison</strong>
            </p>
            <p><strong>Scenario:</strong> Compare annual running costs: heat pump (SCOP 3.5) vs gas boiler (90% efficiency).</p>
            <p>Annual heat demand: 15,000 kWh</p>
            <p>Heat Pump:</p>
            <p>Electricity required = 15,000 ÷ 3.5 = 4,286 kWh</p>
            <p>Cost at 24p/kWh = 4,286 × £0.24 = £1,029</p>
            <p>Gas Boiler:</p>
            <p>Gas required = 15,000 ÷ 0.90 = 16,667 kWh</p>
            <p>Cost at 7p/kWh = 16,667 × £0.07 = £1,167</p>
            <p>Annual saving with heat pump: £138</p>
            <p>Note: Actual savings depend on electricity/gas prices</p>
            <p>
              <strong>Example 2: Radiator Sizing for Heat Pump</strong>
            </p>
            <p><strong>Scenario:</strong> Room requires 1.5 kW heat output. Size radiator for 45/40°C heat pump operation.</p>
            <p>Required output at 45/40°C: 1,500 W</p>
            <p>At 75/65°C (catalogue rating):</p>
            <p>Correction factor for 45/40°C = 0.37</p>
            <p>Catalogue output required = 1,500 ÷ 0.37 = 4,054 W</p>
            <p>Radiator selection:</p>
            <p>Select radiator rated 4,100 W at 75/65°C</p>
            <p>e.g., 600mm × 1800mm double panel plus</p>
            <p>The radiator is 2.7× larger than for a boiler system</p>
            <p>
              <strong>Example 3: GSHP Ground Loop Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size horizontal ground loop for 10 kW GSHP in clay soil.</p>
            <p>Heat pump capacity: 10 kW</p>
            <p>Assumed COP: 4.0</p>
            <p>Heat extraction from ground:</p>
            <p>= Heat output - Electrical input</p>
            <p>= 10 - (10 ÷ 4) = 10 - 2.5 = 7.5 kW</p>
            <p>Ground extraction rate (clay soil): 20-30 W/m²</p>
            <p>Using 25 W/m² average:</p>
            <p>Ground area = 7,500 ÷ 25 = 300 m²</p>
            <p>Loop pipe length (at 1m spacing):</p>
            <p>Approximately 300m of pipe required</p>
            <p>Trench area: 300 m² at 1.2m depth</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Pre-Installation Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify electrical supply capacity (single phase usually sufficient up to 12 kW)</li>
              <li>Assess outdoor unit location (airflow, noise, drainage, access)</li>
              <li>Survey existing heating system (emitters, pipework, controls)</li>
              <li>Calculate room-by-room heat loss using MCS-approved method</li>
              <li>Check EPC and address any recommendations before BUS application</li>
              <li>Assess hot water requirements and cylinder location</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Optimal flow temperature: <strong>35-45°C</strong></li>
              <li>Maximum MCS flow temperature: <strong>55°C</strong></li>
              <li>Typical ASHP SCOP: <strong>2.8-3.5</strong></li>
              <li>Typical GSHP SCOP: <strong>3.5-4.5</strong></li>
              <li>Buffer vessel sizing: <strong>10-20 litres/kW</strong></li>
              <li>BUS grant (ASHP/GSHP): <strong>£7,500</strong></li>
              <li>Ground temperature (UK): <strong>8-12°C</strong></li>
            </ul>
            <p>
              <strong>Common Installation Mistakes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Oversizing:</strong> Causes cycling, reduced efficiency, wasted cost</li>
              <li><strong>Inadequate emitters:</strong> System cannot achieve design temperatures</li>
              <li><strong>Poor outdoor unit location:</strong> Restricted airflow or recirculation</li>
              <li><strong>Insufficient electrical supply:</strong> Trips or voltage drop issues</li>
              <li><strong>Missing flow control:</strong> No weather compensation or incorrect curves</li>
              <li><strong>Undersized hot water coil:</strong> Long reheat times, legionella risk</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="ASHP undersized after refurbishment increases heat loss"
            situation={
              <>
                A 2018 ASHP retrofit on a 1960s detached house was sized to 8 kW based on then-current fabric. The owner has since added a single-storey extension and removed wall insulation in the kitchen rebuild. The system now struggles below 2 °C — buffer tank charges to 50 °C and the ASHP is in defrost cycle frequently.
              </>
            }
            whatToDo={
              <>
                Re-do the heat loss calculation per BS EN 12831 using the as-built fabric. If the new design heat load exceeds the ASHP capacity at design external temperature, three options: (1) upsize the ASHP unit (most expensive); (2) add a second cascaded unit (good for staged expansion); (3) reduce the heat load by addressing the extension envelope and reinstating wall insulation (best long-term but highest disruption). Reset the weather compensation curve and re-verify SCOP under the new fabric. Update MCS documentation.
              </>
            }
            whyItMatters={
              <>
                Heat pumps fail their SCOP target when undersized — they cycle, defrost more often, and run electric backup, hammering the COP. Every fabric change to a heat-pump dwelling needs a heat loss recalculation. Oversizing is also bad (cycles too often, poor SCOP) — the design must follow the fabric.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "COP = instantaneous heat output / electrical input; SCOP = seasonal average — SCOP is what Part L cares about.",
              "ASHP SCOP typical 2.5–3.5; GSHP 3.5–4.5; both improve with low flow temperatures (<45 °C).",
              "Weather compensation is mandatory — fixed flow temperature destroys SCOP.",
              "Sizing per BS EN 12831 room-by-room heat loss; rules of thumb invalidate MCS.",
              "Buffer tanks: usually only needed for low-loss systems or to manage defrost — sized per manufacturer guidance.",
              "BUS grant £7,500 (ASHP/GSHP) requires MCS 015 + MIS 3005 + EPC ≥D + no outstanding loft/cavity insulation recommendations.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Solar photovoltaic systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Biomass systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section2_2;
