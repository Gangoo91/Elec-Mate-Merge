/**
 * MOET · Module 2 · Section 2.1 · Subsection 3 — Energy and Efficiency
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical engineering principles: circuit terminology,
 *     Ohm’s Law, transformer theory, and power calculations."
 *   · "Use mathematical principles and formulae to support engineering
 *     maintenance."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Energy and Efficiency - MOET Module 2 Section 1.3';
const DESCRIPTION =
  'Comprehensive guide to electrical energy calculations, efficiency, power losses, motor efficiency classes IE1-IE4, transformer efficiency, energy auditing and cost analysis for maintenance technicians per BS 7671:2018+A4:2026.';

const quickCheckQuestions = [
  {
    id: 'kwh-calc',
    question:
      'A 7.5 kW motor runs for 8 hours per day, 5 days per week. What is the weekly energy consumption in kWh?',
    options: ['37.5 kWh', '300 kWh', '60 kWh', '1500 kWh'],
    correctIndex: 1,
    explanation:
      'Energy = Power x Time = 7.5 kW x 8 hours x 5 days = 300 kWh per week. At a typical industrial tariff of 20p per kWh, this would cost 300 x 0.20 = 60 GBP per week, or approximately 3120 GBP per year. This demonstrates why motor efficiency is so important in maintenance — even a small improvement can yield significant savings.',
  },
  {
    id: 'efficiency-calc',
    question:
      'A motor has an electrical input of 5 kW and a mechanical output of 4.25 kW. What is its efficiency?',
    options: ['82.5%', '75%', '85%', '117.6%'],
    correctIndex: 2,
    explanation:
      'Efficiency = (Output / Input) x 100% = (4.25 / 5) x 100% = 85%. The remaining 15% (0.75 kW or 750 W) is lost as heat in the motor windings (copper losses), core (iron losses), friction, and windage. This lost energy must be dissipated — which is why adequate ventilation is essential for motor longevity.',
  },
  {
    id: 'copper-loss',
    question:
      'A cable carries 25 A and has a resistance of 0.3 ohms. What is the power wasted as heat in the cable?',
    options: ['187.5 W', '7.5 W', '750 W', '75 W'],
    correctIndex: 0,
    explanation:
      'Copper loss = I² x R = 25² x 0.3 = 625 x 0.3 = 187.5 W. This is pure waste heat generated in the cable. If the cable is enclosed in insulation or grouped with other cables, this heat cannot escape easily, raising the cable temperature. This is why BS 7671 applies derating factors for grouping, ambient temperature, and thermal insulation.',
  },
  {
    id: 'motor-class',
    question:
      'Under the EU Ecodesign Regulation, what is the minimum efficiency class required for new general-purpose three-phase motors from 0.75 kW to 1000 kW?',
    options: [
      'IE4 (Super Premium Efficiency)',
      'IE2 (High Efficiency)',
      'IE1 (Standard Efficiency)',
      'IE3 (Premium Efficiency)',
    ],
    correctIndex: 3,
    explanation:
      'Since July 2021, the EU Ecodesign Regulation (EU 2019/1781) requires all new three-phase motors from 0.75 kW to 1000 kW to meet a minimum of IE3 (Premium Efficiency). From July 2023, motors from 75 kW to 200 kW must meet IE4 if operated with a variable speed drive. As a maintenance technician, you should specify IE3 or IE4 motors as replacements to comply with current regulations and reduce energy costs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'One kilowatt-hour (kWh) is equivalent to:',
    options: ['1000 joules', '3,600,000 joules', '3,600 joules', '1,000,000 joules'],
    correctAnswer: 1,
    explanation:
      '1 kWh = 1000 W x 3600 s = 3,600,000 J = 3.6 MJ. The kilowatt-hour is a practical unit of energy used for electricity billing. One kWh is the energy consumed by a 1 kW load running for one hour, or equivalently a 100 W lamp running for 10 hours.',
  },
  {
    id: 2,
    question: 'The efficiency of an electrical device is defined as:',
    options: [
      'Power loss divided by input power, multiplied by 100%',
      'Input power divided by output power, multiplied by 100%',
      'Output power divided by input power, multiplied by 100%',
      'Output power minus input power, multiplied by 100%',
    ],
    correctAnswer: 2,
    explanation:
      'Efficiency (eta) = (Output power / Input power) x 100%. Efficiency is always less than 100% because some energy is inevitably lost as heat due to resistance in windings (copper losses), magnetic losses in cores (iron losses), friction, and windage.',
  },
  {
    id: 3,
    question:
      'A transformer has a primary input of 2400 VA and a secondary output of 2280 VA. What are the losses?',
    options: ['12 W', '5 W', '120 VA', '120 W'],
    correctAnswer: 3,
    explanation:
      'Losses = Input - Output = 2400 - 2280 = 120 W (expressed in watts as losses are real power dissipated as heat). The efficiency would be (2280/2400) x 100% = 95%. For a distribution transformer, this is typical. These losses generate heat that must be dissipated, which is why transformer cooling is important in maintenance.',
  },
  {
    id: 4,
    question: 'Which type of power loss in a motor is proportional to the square of the current?',
    options: [
      'Copper losses (I²R losses)',
      'Friction and windage losses',
      'Iron losses (core losses)',
      'Stray losses',
    ],
    correctAnswer: 0,
    explanation:
      'Copper losses (also called I²R losses or resistive losses) are proportional to the square of the current flowing through the windings. If the current doubles, the copper losses quadruple. This is why motor overloading is so damaging — the excess current rapidly increases winding temperature, degrading insulation and shortening motor life.',
  },
  {
    id: 5,
    question:
      'A 15 kW motor with 90% efficiency runs at full load for 2000 hours per year. What is the annual energy cost at 18p/kWh?',
    options: ['3,000 GBP', '6,000 GBP', '5,400 GBP', '2,700 GBP'],
    correctAnswer: 1,
    explanation:
      'Always use INPUT power for cost. Input power = Output / Efficiency = 15 / 0.90 = 16.67 kW. Annual energy = 16.67 x 2000 = 33,333 kWh. Annual cost = 33,333 x 0.18 = 6,000 GBP. Using the 15 kW output directly would understate the cost, because the 10% lost as heat is still paid for.',
  },
  {
    id: 6,
    question: 'Iron losses in a transformer consist of:',
    options: [
      'I²R losses in the copper windings',
      'Losses due to poor power factor',
      'Hysteresis losses and eddy current losses in the core',
      'Losses caused by harmonics in the supply',
    ],
    correctAnswer: 2,
    explanation:
      'Iron losses (also called core losses) comprise hysteresis losses (energy needed to repeatedly magnetise and demagnetise the core material) and eddy current losses (circulating currents induced in the core by the changing magnetic field). Iron losses are approximately constant regardless of load and depend on the supply voltage and frequency. They are minimised by using laminated silicon steel cores.',
  },
  {
    id: 7,
    question: 'An IE4 motor compared to an IE1 motor of the same rating typically:',
    options: [
      'Has lower efficiency and higher losses',
      'Is only suitable for variable speed drive operation',
      'Has the same efficiency but is more compact',
      'Has approximately 5-15% lower energy losses',
    ],
    correctAnswer: 3,
    explanation:
      'An IE4 (Super Premium Efficiency) motor has significantly lower losses than an IE1 (Standard Efficiency) motor — typically 5-15% lower losses depending on the motor size. While the purchase price is higher, the lifetime energy savings far outweigh the additional cost, especially for motors that run continuously. The payback period for upgrading from IE1 to IE4 is often less than 2 years for continuously running motors.',
  },
  {
    id: 8,
    question:
      'During an energy audit, a maintenance technician identifies a motor running at 50% load for most of its operating time. What action should be recommended?',
    options: [
      'Consider replacing with a correctly sized motor or fitting a variable speed drive',
      'Increase the supply voltage to bring the motor up to full load',
      'Leave it unchanged, as part-load running is always most efficient',
      'Fit a larger motor to provide additional power headroom',
    ],
    correctAnswer: 0,
    explanation:
      'Motors are most efficient between 75-100% of rated load. At 50% load, efficiency drops significantly, and the power factor deteriorates. The recommended actions are: (a) replace with a correctly sized motor that will operate closer to full load, or (b) fit a variable speed drive (VSD) that adjusts motor speed to match the actual load requirement, saving energy. VSDs are particularly effective on fan and pump applications where power consumption follows the cube law.',
  },
  {
    id: 9,
    question:
      'What is the relationship between heat dissipation and cable current-carrying capacity?',
    options: [
      'Heat dissipation has no effect on a cable current-carrying capacity',
      'Better heat dissipation allows higher current capacity because I²R losses can be removed more effectively',
      'Poorer heat dissipation always allows a higher current to be carried',
      'Current-carrying capacity depends only on the cable colour coding',
    ],
    correctAnswer: 1,
    explanation:
      'The current-carrying capacity of a cable is directly related to its ability to dissipate heat. All current flow generates heat (I²R). If this heat can escape easily (e.g., cable in free air), the cable can carry more current. If heat is trapped (e.g., cable in thermal insulation), the cable must be derated. BS 7671 Appendix 4 provides derating factors for installation methods, ambient temperature, and grouping — all related to heat dissipation.',
  },
  {
    id: 10,
    question:
      'A factory replaces ten 5.5 kW IE1 motors (88% efficient) with IE3 motors (92.6% efficient). The motors run 4000 hours per year at full load. What is the approximate annual energy saving?',
    options: ['1,240 kWh', '6,200 kWh', '12,400 kWh', '27,500 kWh'],
    correctAnswer: 2,
    explanation:
      'IE1 input per motor: 5.5/0.88 = 6.25 kW. IE3 input per motor: 5.5/0.926 = 5.94 kW. Saving per motor: 6.25 - 5.94 = 0.31 kW. For 10 motors over 4000 hours: 0.31 x 10 x 4000 = 12,400 kWh. At 20p/kWh, this saves approximately 2,480 GBP per year.',
  },
  {
    id: 11,
    question: 'No-load losses in a transformer are also known as:',
    options: [
      'Copper losses (I²R losses)',
      'Friction and windage losses',
      'Stray load losses',
      'Iron losses (core losses)',
    ],
    correctAnswer: 3,
    explanation:
      'No-load losses are the losses present whenever a transformer is energised, regardless of whether it is supplying a load. These are the iron losses — hysteresis and eddy current losses in the core. They remain approximately constant from no-load to full-load. Copper losses (I²R in windings) are the load-dependent losses that increase with the square of the load current.',
  },
  {
    id: 12,
    question:
      'Which instrument is most commonly used for energy monitoring on existing installations without disconnection?',
    options: [
      'Clamp-on power analyser with CTs and voltage leads',
      'An insulation resistance tester (megohmmeter)',
      'A low-resistance ohmmeter (micro-ohmmeter)',
      'A proving unit and approved voltage indicator',
    ],
    correctAnswer: 0,
    explanation:
      'A clamp-on power analyser with current transformers (CTs) and voltage leads can measure voltage, current, power, power factor, energy consumption, and harmonics on live circuits without disconnection. This makes it ideal for energy audits and monitoring. The CTs clamp around the conductors (no need to break the circuit), and voltage leads are connected at accessible terminals. Modern analysers can log data over days or weeks to build a complete energy profile.',
  },
];

const faqs = [
  {
    question: 'What is the difference between power and energy in practical terms?',
    answer:
      'Power is the rate of doing work — it tells you how quickly energy is being used at any instant. A 3 kW heater converts energy three times faster than a 1 kW heater. Energy is the total amount of work done over time — it depends on both the power and how long it runs. A 1 kW heater running for 3 hours uses the same energy (3 kWh) as a 3 kW heater running for 1 hour. You pay for energy (kWh), not power (kW), on your electricity bill.',
  },
  {
    question: 'Why can efficiency never reach 100%?',
    answer:
      'In any real electrical device, some energy is inevitably converted to heat due to the resistance of conductors (I²R losses). Even superconductors, which have zero resistance, still lose energy to other mechanisms. In motors and transformers, additional losses include magnetic hysteresis, eddy currents, friction, and windage. The laws of thermodynamics state that no energy conversion process can be 100% efficient — some energy is always lost as heat.',
  },
  {
    question:
      'How do I calculate the payback period for replacing an old motor with a more efficient one?',
    answer:
      'Payback period = Additional cost of new motor / Annual energy saving. For example: if an IE4 motor costs 300 GBP more than an IE2 equivalent, and the annual energy saving is 180 GBP (from the difference in input power x running hours x electricity cost), the payback period is 300/180 = 1.67 years. After this, the saving is pure profit. For motors running more than 4000 hours per year, the payback is typically under 2 years, making efficiency upgrades one of the best investments in maintenance.',
  },
  {
    question: "What is the 'cube law' for fans and pumps, and why does it matter?",
    answer:
      'For centrifugal fans and pumps, the power required is proportional to the cube of the speed. This means reducing the speed by 20% reduces the power consumption by approximately 49% (0.8 cubed = 0.512). This is why variable speed drives on fan and pump applications offer enormous energy savings — instead of using dampers or throttle valves to control flow (which waste energy), a VSD reduces the motor speed to match the required flow rate, saving up to 50-70% of energy in many applications.',
  },
  {
    question: 'What should I look for during an energy audit of an electrical installation?',
    answer:
      'Key areas include: oversized motors running at partial load (replace with correctly sized units or add VSDs), poor power factor (install power factor correction capacitors), excessive voltage drop in cables (indicates energy waste as heat), old inefficient lighting (replace with LED), transformers energised but lightly loaded (consider de-energising during low-demand periods), and harmonics causing additional heating losses. Thermal imaging can identify hot spots where energy is being wasted as heat due to high-resistance connections.',
  },
];

const MOETModule2Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.1 · Subsection 3"
        title="Energy and Efficiency"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Energy calculations, efficiency analysis and loss reduction for electrical maintenance.
          </p>

          <TLDR
            points={[
              'Energy: E = P x t — measured in joules (J) or kilowatt-hours (kWh)',
              'Efficiency: eta = (Output / Input) x 100% — always less than 100%',
              'Copper losses: I²R — proportional to the square of current',
              'Iron losses: Hysteresis + eddy currents — approximately constant',
              'Motor classes: IE1 to IE4 — minimum IE3 for new motors since 2021',
              'Energy auditing: Identify oversized equipment, poor power factor, waste',
              'Cost saving: Motor efficiency upgrades, VSDs, LED lighting',
              'ST1426: Energy awareness and efficiency in maintenance practice',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate electrical energy consumption in kWh and convert to/from joules',
              'Determine the efficiency of motors, transformers and other electrical equipment',
              'Identify and quantify copper losses (I²R) and iron losses in electrical systems',
              'Explain motor efficiency classes IE1 to IE4 and current regulatory requirements',
              'Assess the economic case for efficiency improvements in maintenance decisions',
              'Conduct basic energy auditing and identify energy-saving opportunities',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Energy vs power — understanding the difference</ContentEyebrow>

          <ConceptBlock title="Energy vs Power — Understanding the Difference">
            <p>
              Power and energy are related but fundamentally different quantities. Power is the rate
              of energy transfer — how quickly energy is being used or converted at any instant.
              Energy is the total amount of work done or heat produced over a period of time. You
              pay your electricity supplier for energy (measured in kWh), not for power (measured in
              kW).
            </p>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <p className="font-mono text-base text-elec-yellow">Energy = Power x Time</p>
              <p className="text-sm text-white">E (joules) = P (watts) x t (seconds)</p>
              <p className="text-sm text-white">E (kWh) = P (kW) x t (hours)</p>
            </div>
            <p>
              The SI unit of energy is the <strong>joule</strong> (J). However, one joule is a very
              small amount of energy for electrical work — a 100 W lamp uses 100 joules every
              second. For practical purposes, the electrical industry uses the{' '}
              <strong>kilowatt-hour</strong> (kWh), where 1 kWh = 3,600,000 J = 3.6 MJ. This is the
              'unit' shown on electricity meters and bills.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Practical Energy Calculations">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Power (kW)</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Daily Use (hours)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Daily Energy (kWh)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Annual Cost (at 30p/kWh)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">LED panel light</td>
                    <td className="border border-white/10 px-3 py-2">0.040</td>
                    <td className="border border-white/10 px-3 py-2">10</td>
                    <td className="border border-white/10 px-3 py-2">0.4</td>
                    <td className="border border-white/10 px-3 py-2">43.80 GBP</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Office PC + monitor</td>
                    <td className="border border-white/10 px-3 py-2">0.200</td>
                    <td className="border border-white/10 px-3 py-2">8</td>
                    <td className="border border-white/10 px-3 py-2">1.6</td>
                    <td className="border border-white/10 px-3 py-2">175.20 GBP</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">3 kW immersion heater</td>
                    <td className="border border-white/10 px-3 py-2">3.0</td>
                    <td className="border border-white/10 px-3 py-2">2</td>
                    <td className="border border-white/10 px-3 py-2">6.0</td>
                    <td className="border border-white/10 px-3 py-2">657.00 GBP</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">11 kW compressor motor</td>
                    <td className="border border-white/10 px-3 py-2">11.0</td>
                    <td className="border border-white/10 px-3 py-2">8</td>
                    <td className="border border-white/10 px-3 py-2">88.0</td>
                    <td className="border border-white/10 px-3 py-2">9,636.00 GBP</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white">
              Annual costs based on 365 days/year. Industrial use would typically be 250-300 working
              days.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Why This Matters for Maintenance">
            <p>
              Understanding energy costs helps you make better maintenance decisions. For example,
              the 11 kW compressor motor above costs nearly 10,000 GBP per year to run. If replacing
              it with a more efficient model saves just 5% of energy, that is nearly 500 GBP per
              year — the additional cost of a premium efficiency motor is often recovered within 1-2
              years. Energy awareness is increasingly expected of maintenance technicians under
              ST1426.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Efficiency — input, output and losses</ContentEyebrow>

          <ConceptBlock title="Efficiency — Input, Output and Losses">
            <p>
              Efficiency describes how well a device converts input energy into useful output
              energy. No real device is 100% efficient — some energy is always lost, primarily as
              heat. The efficiency of electrical equipment directly affects both energy costs and
              the heat that must be managed within an installation.
            </p>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <p className="font-mono text-base text-elec-yellow">
                Efficiency (eta) = (Output Power / Input Power) x 100%
              </p>
              <p className="font-mono text-sm text-white">Losses = Input Power - Output Power</p>
              <p className="font-mono text-sm text-white">
                Input Power = Output Power / Efficiency
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Typical Efficiencies of Electrical Equipment">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Typical Efficiency
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Main Loss Mechanisms
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Large power transformer</td>
                    <td className="border border-white/10 px-3 py-2">97-99.5%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Iron losses (core), copper losses (windings)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Distribution transformer</td>
                    <td className="border border-white/10 px-3 py-2">95-98%</td>
                    <td className="border border-white/10 px-3 py-2">Iron losses, copper losses</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Large induction motor (IE3)
                    </td>
                    <td className="border border-white/10 px-3 py-2">90-96%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Copper, iron, friction, windage, stray
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Small induction motor (IE3)
                    </td>
                    <td className="border border-white/10 px-3 py-2">82-90%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Copper, iron, friction, windage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">LED luminaire</td>
                    <td className="border border-white/10 px-3 py-2">80-90% (luminous)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Heat in LED driver and junction
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Variable speed drive (VSD)</td>
                    <td className="border border-white/10 px-3 py-2">95-98%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Switching losses, conduction losses in IGBTs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <Scenario
            title="Cascaded Efficiency"
            situation={
              <>
                When equipment is connected in series (e.g., transformer feeding a VSD feeding a
                motor), the overall efficiency is the product of the individual efficiencies:
                Overall efficiency = eta1 x eta2 x eta3.
              </>
            }
            whatToDo={
              <p>
                Example: Transformer (97%) x VSD (96%) x Motor (92%) = 0.97 x 0.96 x 0.92 ={' '}
                <strong>85.7%</strong>
              </p>
            }
            whyItMatters={
              <>
                This means 14.3% of the electrical input is lost as heat before reaching the driven
                load.
              </>
            }
          />

          <ConceptBlock title="Always use input power for cost">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> When calculating the actual power drawn from the supply,
              always use the input power: P(input) = P(output) / efficiency. A 15 kW motor at 92%
              efficiency actually draws 15/0.92 = 16.3 kW from the supply. Cable sizing, protective
              device rating, and energy cost calculations must all be based on the input power, not
              the rated output.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Power losses — copper, iron and heat dissipation</ContentEyebrow>

          <ConceptBlock title="Power Losses — Copper Losses, Iron Losses and Heat Dissipation">
            <p>
              Understanding where energy is lost in electrical equipment is essential for effective
              maintenance. Losses generate heat, and heat is the primary enemy of electrical
              insulation. Excessive heat accelerates insulation degradation, shortens equipment
              life, and can cause catastrophic failure. The widely quoted '10-degree rule' states
              that for every 10 degrees C above the rated temperature, the insulation life is
              approximately halved.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Copper Losses (I²R Losses)">
            <p>
              Copper losses occur in any conductor carrying current. They are caused by the
              resistance of the conductor material and are proportional to the{' '}
              <strong>square</strong> of the current.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Formula:</strong> P(loss) = I² x R
              </li>
              <li>
                <strong>Where found:</strong> Motor windings, transformer windings, cables, busbars,
                connections
              </li>
              <li>
                <strong>Characteristic:</strong> Load-dependent — increase with the square of load
                current
              </li>
              <li>
                <strong>Reduction:</strong> Use larger cross-section conductors, shorter cable runs,
                better connections
              </li>
              <li>
                <strong>Danger:</strong> High-resistance connections cause localised extreme heating
                — fire risk
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Iron Losses (Core Losses)">
            <p>
              Iron losses occur in the magnetic cores of transformers, motors, and other
              electromagnetic devices. They comprise two components:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hysteresis losses:</strong> Energy used to repeatedly magnetise and
                demagnetise the core material each cycle. Reduced by using silicon steel or
                amorphous metal cores
              </li>
              <li>
                <strong>Eddy current losses:</strong> Circulating currents induced in the core by
                the changing magnetic field. Reduced by laminating the core (thin insulated sheets)
                to break the current paths
              </li>
              <li>
                <strong>Characteristic:</strong> Approximately constant regardless of load — present
                whenever the equipment is energised
              </li>
              <li>
                <strong>Maintenance note:</strong> Degraded core lamination insulation (from
                overheating or vibration) increases eddy current losses
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Mechanical Losses (Motors Only)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Friction losses:</strong> In bearings and brushes. Increase with bearing
                wear — a key maintenance indicator. Noisy or hot bearings suggest increased friction
                losses
              </li>
              <li>
                <strong>Windage losses:</strong> Air resistance on the rotating parts. Include the
                cooling fan — which consumes energy to keep the motor cool
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Heat Dissipation and Cable Derating">
            <p>
              All power losses convert to heat that must be dissipated to the surrounding
              environment. BS 7671 Appendix 4 provides correction factors for cable current-carrying
              capacity based on the ability to dissipate heat: ambient temperature (Ca), grouping
              with other cables (Cg), thermal insulation (Ci), and installation method. These
              factors are all about heat management. A cable that cannot dissipate its I²R losses
              will overheat, degrade its insulation, and eventually fail — potentially causing a
              fire.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Record operating temperatures over time">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Maintenance application:</strong> During preventive maintenance, measure and
              record the operating temperature of motors, transformers, and switchgear. A gradual
              increase over time indicates deteriorating efficiency — possibly due to increased
              bearing friction, winding degradation, or ventilation blockage. Thermal imaging
              surveys are an effective tool for identifying abnormal heating before it leads to
              failure.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Motor efficiency classes and regulatory requirements</ContentEyebrow>

          <ConceptBlock title="Motor Efficiency Classes and Regulatory Requirements">
            <p>
              Electric motors account for approximately 70% of industrial electricity consumption.
              International standards define efficiency classes to drive continuous improvement in
              motor design. As a maintenance technician, you must understand these classes to ensure
              that replacement motors comply with current regulations and offer the best lifetime
              value.
            </p>
          </ConceptBlock>

          <ConceptBlock title="IEC Motor Efficiency Classes (IEC 60034-30-1)">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Typical Efficiency (11 kW, 4-pole)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Regulatory Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">IE1</td>
                    <td className="border border-white/10 px-3 py-2">Standard Efficiency</td>
                    <td className="border border-white/10 px-3 py-2">87.6%</td>
                    <td className="border border-white/10 px-3 py-2">
                      No longer permitted for new installations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">IE2</td>
                    <td className="border border-white/10 px-3 py-2">High Efficiency</td>
                    <td className="border border-white/10 px-3 py-2">89.4%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Permitted only with VSD (certain sizes)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">IE3</td>
                    <td className="border border-white/10 px-3 py-2">Premium Efficiency</td>
                    <td className="border border-white/10 px-3 py-2">91.4%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Minimum requirement since July 2021 (0.75-1000 kW)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">IE4</td>
                    <td className="border border-white/10 px-3 py-2">Super Premium Efficiency</td>
                    <td className="border border-white/10 px-3 py-2">93.0%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Required for 75-200 kW with VSD (from July 2023)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">IE5</td>
                    <td className="border border-white/10 px-3 py-2">Ultra Premium Efficiency</td>
                    <td className="border border-white/10 px-3 py-2">~94.5%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Emerging — not yet mandated
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <Scenario
            title="Economic Impact of Efficiency Classes"
            situation={
              <>
                For a motor running 4000 hours per year at full load, the difference in annual
                running cost between efficiency classes can be substantial.
              </>
            }
            whatToDo={
              <>
                <p>
                  11 kW motor, IE1 (87.6%): Input = 11/0.876 = 12.56 kW. Annual energy = 50,228 kWh
                </p>
                <p>
                  11 kW motor, IE3 (91.4%): Input = 11/0.914 = 12.04 kW. Annual energy = 48,140 kWh
                </p>
                <p>
                  Annual saving: 2,088 kWh x 0.20 GBP = <strong>418 GBP per year per motor</strong>
                </p>
              </>
            }
            whyItMatters={
              <>In a factory with 20 such motors, this represents 8,360 GBP per year.</>
            }
          />

          <ConceptBlock title="Variable Speed Drives and Efficiency">
            <p>
              Variable speed drives (VSDs) improve system efficiency by matching motor speed to the
              actual load requirement. The energy savings can be dramatic, especially on
              variable-load applications:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fans and pumps:</strong> Power is proportional to speed cubed (affinity
                laws). Reducing speed by 20% saves approximately 49% of energy
              </li>
              <li>
                <strong>Conveyors:</strong> Speed adjustment to match production rate saves energy
                and reduces mechanical wear
              </li>
              <li>
                <strong>Soft starting:</strong> VSDs eliminate the high inrush current of
                direct-on-line starting, reducing I²R losses during start-up
              </li>
              <li>
                <strong>Maintenance benefit:</strong> Reduced mechanical stress extends bearing and
                coupling life
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Always specify at least IE3">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> Under EU Ecodesign Regulation (EU 2019/1781), retained in
              UK law, you must not install an IE1 motor as a replacement. Always specify at least
              IE3 for new installations. When ordering replacement motors, include the efficiency
              class on the purchase specification. The motor nameplate must show the IE class and
              efficiency values.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Energy auditing and monitoring in maintenance</ContentEyebrow>

          <ConceptBlock title="Energy Auditing and Monitoring in Maintenance">
            <p>
              Energy auditing is becoming an increasingly important part of the maintenance
              technician's role. Organisations are under pressure to reduce energy consumption and
              carbon emissions, and the maintenance team is best placed to identify waste because
              they have detailed knowledge of the equipment and how it operates.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Energy Audit Checklist for Maintenance Technicians">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor loading:</strong> Measure running current and compare to nameplate
                full-load current. Motors consistently running below 50% load are candidates for
                replacement with a smaller, more efficient unit
              </li>
              <li>
                <strong>Power factor:</strong> Measure with a power analyser. Poor power factor
                (below 0.9) means the supply is delivering more current than necessary, increasing
                I²R losses in cables and transformers. Power factor correction capacitors can
                improve this
              </li>
              <li>
                <strong>Voltage drop:</strong> Excessive voltage drop in long cable runs wastes
                energy as heat. Measure voltage at the supply and load ends under full-load
                conditions
              </li>
              <li>
                <strong>Lighting:</strong> Identify old fluorescent or discharge lighting that could
                be replaced with LED. LED upgrades typically save 50-70% of lighting energy
              </li>
              <li>
                <strong>Heating:</strong> Check that electric heating is correctly controlled —
                timers, thermostats, and optimisers should be functioning and correctly set
              </li>
              <li>
                <strong>Standby loads:</strong> Identify equipment left energised when not in use.
                Even transformers on standby consume iron losses continuously
              </li>
              <li>
                <strong>Compressed air:</strong> Check for leaks — a 3 mm hole in a compressed air
                system at 7 bar wastes approximately 1.5 kW continuously
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Energy Monitoring Tools">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Portable power analyser:</strong> Clamp-on CTs and voltage leads for
                non-invasive measurement of V, I, P, PF, energy, and harmonics
              </li>
              <li>
                <strong>Energy data logger:</strong> Records energy consumption over days or weeks
                to identify patterns, peak demands, and baseload
              </li>
              <li>
                <strong>Thermal imaging camera:</strong> Detects abnormal heating at connections,
                switchgear, motors, and transformers — indicative of energy waste and potential
                failure
              </li>
              <li>
                <strong>Sub-metering:</strong> Permanent energy meters on individual circuits or
                machines allow continuous monitoring and benchmarking
              </li>
              <li>
                <strong>Building management system (BMS):</strong> Integrates energy data with HVAC,
                lighting, and other systems for comprehensive energy management
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Transformer Efficiency and Loading">
            <p>
              Transformers have an optimum loading point where their efficiency is highest. This
              occurs when copper losses equal iron losses — typically between 50% and 75% of rated
              load.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>At light load: iron losses dominate (constant) and efficiency is low</li>
              <li>At optimum load: copper losses = iron losses and efficiency is maximum</li>
              <li>
                At full load: copper losses dominate and efficiency begins to decrease slightly
              </li>
              <li>
                A transformer energised at no load still consumes its full iron losses — consider
                de-energising transformers that are not needed during low-demand periods
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Report energy-saving opportunities">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard includes energy
              awareness and efficiency as part of the knowledge requirements. You should be able to
              identify energy-saving opportunities during routine maintenance activities and report
              them through the appropriate channels. Energy efficiency is increasingly linked to
              sustainability targets and corporate responsibility, making it a valued skill in
              modern maintenance practice.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=SMPhh8gT_1E"

            title="What Is a kWh? Kilowatt Hour Explained + Calculations"

            channel="The Engineering Mindset"

            duration="6:02"

            topic="The unit every energy bill and efficiency calculation is built on"

            caption="Short, and it is the unit this whole page turns on. Worth six minutes before the worked examples."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Energy: E = P x t (joules or kWh); 1 kWh = 3,600,000 J = 3.6 MJ.',
              'Efficiency: eta = (Pout / Pin) x 100%. Copper losses: P = I²R. Cost = Energy (kWh) x Tariff (GBP/kWh).',
              'Motor efficiency classes: IE1 — Standard (no longer permitted new); IE2 — High (with VSD only); IE3 — Premium (minimum since July 2021); IE4 — Super Premium (75-200 kW + VSD).',
              'Key reference: EU 2019/1781 — Ecodesign Regulation.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section1-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Ohm's Law and Watt's Law
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section1-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Units and Measurement
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section1_3;
