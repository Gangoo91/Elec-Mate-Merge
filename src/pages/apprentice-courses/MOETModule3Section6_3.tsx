/**
 * MOET · Module 3 · Section 3.6 · Subsection 3 — Energy Storage Systems
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
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { EpsSld } from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Energy Storage Systems - MOET Module 3.6.3';
const DESCRIPTION =
  'Comprehensive guide to battery energy storage systems (BESS) for electrical maintenance technicians: lithium-ion technology, system architectures, battery management systems, grid-scale and domestic storage, safety hazards, thermal runaway, maintenance and UK regulatory requirements under ST1426.';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (4) — shown after each content section       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'bess-purpose',
    question:
      'What is the primary purpose of a battery energy storage system (BESS) in an electrical installation?',
    options: [
      'To convert direct current from the battery into the 50 Hz mains supply for the installation',
      'To store electrical energy for later use, enabling time-shifting, peak reduction, frequency response and backup',
      'To correct the power factor of the installation towards unity under varying load conditions',
      'To provide overcurrent protection for the final circuits supplying the building loads',
    ],
    correctIndex: 1,
    explanation:
      'A BESS stores energy during periods of low demand or high renewable generation and releases it when needed. This enables: time-shifting of solar PV generation (stored during the day, used in the evening); peak shaving (reducing demand charges by discharging during peak tariff periods); frequency response (rapid injection or absorption of power to stabilise grid frequency); backup power (replacing or supplementing UPS and generator systems); and renewable integration (smoothing the intermittent output of wind and solar).',
  },
  {
    id: 'lithium-ion-chemistry',
    question:
      'Why is lithium-ion the dominant battery chemistry for modern energy storage systems?',
    options: [
      'It is the cheapest battery chemistry available and contains no hazardous or flammable materials',
      'It can be fully discharged repeatedly without any reduction in its rated cycle life',
      'It requires no battery management system because the cells cannot overheat or overcharge',
      'It combines high energy density, 90-95% round-trip efficiency, long cycle life and low self-discharge',
    ],
    correctIndex: 3,
    explanation:
      'Lithium-ion batteries dominate modern BESS because of their superior performance characteristics. Energy density is 3-5 times higher than lead-acid, enabling compact installations. Round-trip efficiency of 90-95% means minimal energy is lost in the charge-discharge cycle. Cycle life of 3,000-10,000 cycles (depending on chemistry and depth of discharge) provides 10-15 year operational life. However, lithium-ion requires sophisticated battery management systems (BMS) to prevent thermal runaway, and the electrolyte is flammable — creating specific safety requirements.',
  },
  {
    id: 'bms-function',
    question: 'What is the primary function of a battery management system (BMS)?',
    options: [
      'To monitor and control cell voltages, temperatures and state of charge, preventing overcharge, over-discharge and overheating',
      'To convert the battery DC output into 230 V AC for export to the grid and household loads',
      'To physically support and restrain the weight of the battery modules within the enclosure',
      'To provide an automatic backup grid connection in the event that the main supply fails',
    ],
    correctIndex: 0,
    explanation:
      'The BMS is the critical safety and performance management system in any lithium-ion BESS. It monitors: individual cell voltages (preventing overcharge above approximately 4.2 V or over-discharge below approximately 2.5 V per cell); cell temperatures (detecting thermal anomalies); state of charge (SoC) and state of health (SoH); charge and discharge currents (preventing overcurrent). It controls: cell balancing (equalising charge across cells in series); charge/discharge enable/disable; cooling system activation; and fault alarms and emergency shutdown. A BMS failure can lead to thermal runaway and fire.',
  },
  {
    id: 'thermal-runaway',
    question: 'What is thermal runaway in a lithium-ion battery system?',
    options: [
      'A gradual loss of usable capacity caused by repeated shallow charge and discharge cycles over time',
      'A controlled, deliberate discharge of the battery to prevent overcharging during peak generation',
      'An uncontrollable, self-sustaining exothermic reaction in a cell that can exceed 700 degrees C and spread to other cells',
      'The normal warming of the battery enclosure during a sustained high-current discharge into loads',
    ],
    correctIndex: 2,
    explanation:
      "Thermal runaway is the most serious safety hazard in lithium-ion BESS. When a cell's internal temperature exceeds a critical threshold (typically 130-150 degrees C for NMC chemistry), the separator melts, causing an internal short circuit. This triggers an exothermic decomposition reaction that generates more heat, further accelerating the reaction. Cell temperatures can exceed 700 degrees C, releasing flammable and toxic gases (hydrogen fluoride, carbon monoxide, volatile organic compounds). If not contained, thermal runaway propagates to adjacent cells in a cascade that can engulf the entire battery system.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (12) — end-of-page assessment                       */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The main lithium-ion battery chemistries used in BESS are:',
    options: [
      'Lead-acid, nickel-cadmium and nickel-metal-hydride rechargeable chemistries',
      'NMC (Nickel Manganese Cobalt), LFP (Lithium Iron Phosphate) and NCA (Nickel Cobalt Aluminium)',
      'Vanadium redox, zinc-bromine and other liquid flow-battery chemistries only',
      'Alkaline, zinc-carbon and lithium-primary single-use disposable cells',
    ],
    correctAnswer: 1,
    explanation:
      'NMC offers high energy density (ideal where space is limited) but has higher thermal runaway risk. LFP has lower energy density but is significantly safer (higher thermal stability, no oxygen release during decomposition), has longer cycle life (5,000-10,000 cycles vs 3,000-5,000 for NMC), and is increasingly preferred for stationary storage. NCA is used in some commercial systems for its very high energy density. The maintenance technician must understand the specific chemistry installed, as safety procedures and BMS parameters differ.',
  },
  {
    id: 2,
    question: 'A typical domestic battery storage system (e.g., Tesla Powerwall) operates at:',
    options: [
      '11 kV DC internally, storing several megawatt-hours of usable energy',
      '12 V DC internally, the same as a standard road vehicle starter battery',
      '48-400 V DC internally with an integrated inverter, storing 5-15 kWh at 3-7 kW peak',
      '230 V AC directly, with no inverter or internal DC stage at all',
    ],
    correctAnswer: 2,
    explanation:
      'Domestic BESS typically stores 5-15 kWh (enough for 4-12 hours of average household consumption). The battery pack operates at 48-400 V DC depending on the design. An integrated or external hybrid inverter converts DC to 230 V AC for household use. Peak continuous power output is typically 3-7 kW. The system includes a BMS, thermal management, and communication interface for monitoring and control. Installation must comply with BS 7671 and manufacturer requirements.',
  },
  {
    id: 3,
    question: 'Grid-scale BESS installations are typically rated at:',
    options: [
      '5-15 kWh capacity, the same as a single domestic wall-mounted storage unit',
      'A few hundred watt-hours, suited only to portable equipment and hand tools',
      '1-10 kWh capacity, designed for individual flats and small apartments',
      '1-1,000 MWh capacity at 1-500 MW, housed in container-sized modules with thousands of cells',
    ],
    correctAnswer: 3,
    explanation:
      'Grid-scale BESS ranges from 1 MW/1 MWh for local network support to hundreds of MW/MWh for grid-scale services. A typical container module houses: battery racks (hundreds of modules, thousands of cells); power conversion system (DC-AC inverter); BMS; HVAC cooling; fire detection and suppression; and monitoring/communication systems. Multiple containers are combined to achieve the required capacity. UK grid-scale BESS installations exceeded 4 GW of operational capacity by 2025, with several GW more in construction.',
  },
  {
    id: 4,
    question: 'The round-trip efficiency of a lithium-ion BESS is:',
    options: [
      '90-95%, so most of the energy put in during charging is available again on discharge',
      '40-50%, broadly comparable to the efficiency of a conventional diesel generator',
      '100%, since there are effectively no losses at all in the charge and discharge cycle',
      '70-80%, about the same figure as lead-acid batteries and pumped hydro storage',
    ],
    correctAnswer: 0,
    explanation:
      'Round-trip efficiency measures total energy out divided by total energy in. Lithium-ion achieves 90-95%, far exceeding lead-acid (70-80%) or pumped hydro storage (70-80%). The losses are due to: internal cell resistance (I squared R heating during charge and discharge); BMS and control electronics power consumption; cooling system energy; and conversion losses in the inverter. Higher C-rates (faster charge/discharge) reduce efficiency due to increased resistive losses. Maintaining efficiency requires: keeping cells within optimal temperature range; avoiding deep discharge cycles; and ensuring BMS calibration.',
  },
  {
    id: 5,
    question: 'When installing a domestic BESS, BS 7671 requires:',
    options: [
      'No additional protective measures, since the battery is inherently safe at extra-low voltage',
      'General requirements plus DC protection, isolation, labelling, ventilation, fire separation and bonding',
      'Only AC-side protection, since the entire DC side is the equipment manufacturer’s responsibility',
      'Installation inside a habitable room with no isolation, labelling or fire separation provided',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671:2018+A4:2026 introduced a new Chapter 57 specifically for stationary secondary battery installations — batteries whose designed purpose is the storage and supply of electrical installations. It does not apply where the battery is built into a product covered by its own product safety standard, nor to batteries inside pluggable UPS, fire alarm, emergency lighting or central safety power supply systems that conform to their own standards. Alongside Chapter 57, the general requirements and the manufacturer installation instructions still apply. Key considerations: DC wiring must be protected and labelled; isolation devices must allow safe disconnection of both DC and AC circuits; ventilation must be adequate for potential gas release; fire resistance of enclosures and separation from habitable spaces; accessible emergency isolation for firefighters; protective bonding of all exposed metalwork; and RCD protection on AC circuits. The IET Code of Practice for Electrical Energy Storage Systems provides additional guidance.',
  },
  {
    id: 6,
    question: 'The state of charge (SoC) of a battery indicates:',
    options: [
      'The total number of charge and discharge cycles the battery has completed in its life',
      'The maximum instantaneous power the battery can deliver in a single full discharge',
      'The remaining stored energy as a percentage of total usable capacity, tracked by the BMS',
      'The permanent loss of capacity compared with the original rated capacity when new',
    ],
    correctAnswer: 2,
    explanation:
      'SoC is the primary metric for available energy. It is calculated by the BMS using: open-circuit voltage measurement (each chemistry has a characteristic voltage-SoC curve); coulomb counting (integrating charge/discharge current over time); and temperature compensation (battery capacity varies with temperature). Accurate SoC estimation is critical for: preventing over-discharge (damaging cells); managing peak demand response; ensuring backup power availability; and optimising charge/discharge strategies. SoC accuracy degrades over time and requires periodic BMS recalibration.',
  },
  {
    id: 7,
    question: 'Fire suppression systems in grid-scale BESS typically use:',
    options: [
      'A single domestic smoke alarm fitted inside the container enclosure',
      'A dry powder extinguisher operated manually by a passing site technician',
      'No suppression at all, relying entirely on the surrounding building sprinkler system',
      'Early detection with water mist or aerosol suppression plus ventilation to manage toxic gas',
    ],
    correctAnswer: 3,
    explanation:
      'BESS fire suppression is a specialised field. Early detection uses: off-gas sensors (detecting volatile organic compounds released before thermal runaway); thermal monitoring (cell and ambient temperature); smoke detection; and BMS voltage/temperature anomaly alerts. Suppression typically uses water mist (effective at cooling cells to prevent propagation without the electrical conductivity risk of bulk water) or clean agent aerosols. Ventilation systems manage the toxic and flammable gases released during thermal events. Deflagration venting prevents explosive over-pressure within the enclosure.',
  },
  {
    id: 8,
    question: 'The depth of discharge (DoD) affects battery cycle life because:',
    options: [
      'Deeper cycles stress the electrode materials more, so limiting DoD (e.g. 80%) extends cycle life',
      'Deeper discharge has no effect at all on cycle life, provided the cells are kept cool',
      'Shallower discharge cycles always shorten cycle life and should therefore be avoided',
      'Discharging fully to empty on every cycle is the recommended way to extend battery life',
    ],
    correctAnswer: 0,
    explanation:
      'Each charge-discharge cycle causes microscopic structural changes in the electrode materials as lithium ions move in and out. Deeper cycles cause more stress. For NMC chemistry, cycle life at 80% DoD is typically 5,000+ cycles, while at 100% DoD it may be only 2,000-3,000 cycles. LFP chemistry is more resilient but follows the same trend. Most BESS systems are configured to limit DoD (typically 80-90% of total capacity) to extend operational life, with the BMS enforcing minimum SoC limits.',
  },
  {
    id: 9,
    question: 'A hybrid inverter in a domestic PV-battery system:',
    options: [
      'Only converts PV array output to AC and cannot interact with a battery at all',
      'Manages power flow between the PV array, battery, household loads and the grid to suit tariffs',
      'Provides the overcurrent protection for every final circuit throughout the dwelling',
      'Stores energy chemically in the same way as the lithium-ion battery cells themselves',
    ],
    correctAnswer: 1,
    explanation:
      'A hybrid (or multi-mode) inverter combines the functions of a PV inverter and a battery inverter in a single device. It manages complex power flows: PV to loads (direct self-consumption), PV to battery (storing excess generation), battery to loads (evening/peak use), PV to grid (export surplus), grid to battery (cheap tariff charging), and grid to loads (when PV and battery insufficient). Advanced hybrid inverters support time-of-use tariff optimisation, grid services participation, and emergency backup mode (islanding during grid failure).',
  },
  {
    id: 10,
    question: 'The main maintenance requirements for a domestic BESS include:',
    options: [
      'Opening every individual cell to top up the liquid electrolyte once each year',
      'No maintenance at all, as the system is fully sealed for its entire service life',
      'Visual inspection, BMS log review, ventilation checks, and testing of isolation and protection devices',
      'Fully discharging and recharging the whole battery every week to recalibrate it',
    ],
    correctAnswer: 2,
    explanation:
      'BESS maintenance for domestic systems: visual inspection (enclosure condition, signs of overheating, water ingress, pest damage); ventilation check (airflow paths clear, fans operational); BMS health (review logs for cell voltage imbalance exceeding manufacturer thresholds, temperature excursions, fault codes); protection devices (test DC and AC isolators, verify RCD operation); firmware updates (manufacturers issue updates for performance and safety); earthing and bonding (verify continuity to all metalwork); and performance verification (compare actual capacity with rated capacity — degradation exceeding 20% may indicate cell failure).',
  },
  {
    id: 11,
    question:
      'If a maintenance technician discovers signs of battery swelling or electrolyte leakage:',
    options: [
      'Continue charging the battery to confirm whether the swelling gets any worse',
      'Puncture the swollen cell carefully to release the trapped gas in a safe manner',
      'Pick the battery up and move it outside immediately by hand, leaving it in the open',
      'Evacuate, do not disturb the battery, call the fire service and contact the manufacturer',
    ],
    correctAnswer: 3,
    explanation:
      "Battery swelling (bloating) indicates internal gas generation from electrolyte decomposition — a precursor to thermal runaway. Electrolyte leakage (visible liquid or white crystalline deposits) indicates cell casing failure. Both are emergency situations. The technician must: not attempt to charge, discharge, or disconnect the battery (physical disturbance could trigger thermal runaway); evacuate the immediate area; ventilate if safe to do so; call 999 if there is any sign of heat, smoke or flame; and contact the battery manufacturer's emergency support. Lithium-ion battery fires produce toxic hydrogen fluoride gas.",
  },
  {
    id: 12,
    question: 'The UK electricity market uses BESS for frequency response because:',
    options: [
      'Batteries respond to frequency deviations within milliseconds, far faster than conventional generators',
      'Batteries are the cheapest possible source of bulk energy available anywhere on the grid',
      'Batteries provide the large rotating mechanical inertia that synchronous generators lack',
      'Batteries can supply rated power continuously for several weeks without any recharging',
    ],
    correctAnswer: 0,
    explanation:
      'Grid frequency must be maintained at 50 Hz (+/- 0.5 Hz under normal conditions). Traditionally, the inertia of large synchronous generators (coal, gas, nuclear) naturally resisted frequency changes. As these are replaced by renewables (which connect via power electronics and provide no inherent inertia), the grid becomes more susceptible to frequency disturbances. BESS can respond in under 100 milliseconds — far faster than gas turbines (seconds) or demand-side response (minutes). National Grid ESO contracts BESS providers for frequency response services (Dynamic Containment, Dynamic Moderation, Dynamic Regulation), creating a significant commercial market.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (5)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How long do battery storage systems last?',
    answer:
      'Lithium-ion BESS typically has a warranted life of 10-15 years or a specified number of cycles (e.g., 6,000 cycles at 80% DoD). Actual lifespan depends on: depth of discharge (shallower cycles extend life); operating temperature (high temperatures accelerate degradation); charge/discharge rate (lower C-rates are gentler); and BMS quality (good cell balancing extends pack life). LFP chemistry generally lasts longer than NMC. At end of warranty, the battery typically retains 60-80% of original capacity — still usable but with reduced performance. Second-life applications (less demanding uses) can extend useful life further.',
  },
  {
    question: 'Are battery storage systems safe in homes?',
    answer:
      'When properly installed and maintained, domestic BESS is safe. Key safety requirements include: MCS-approved or equivalent products with integrated BMS; installation by a competent electrician following manufacturer instructions and BS 7671; adequate ventilation; fire separation from habitable rooms; accessible emergency isolation; and regular maintenance. The main risk is thermal runaway from cell failure, which is extremely rare in properly managed systems. LFP chemistry is inherently safer than NMC due to higher thermal stability. Homeowners should be briefed on emergency procedures and the location of the emergency isolation switch.',
  },
  {
    question: 'Can a BESS provide backup power during a grid outage?',
    answer:
      "Yes, if the system includes 'islanding' or 'backup' capability. Not all domestic BESS can do this — it requires a transfer switch or gateway device that disconnects from the grid and creates a local micro-grid. The battery then powers designated circuits (typically essentials: lighting, fridge, broadband, phone chargers). The backup duration depends on battery capacity and load. A 10 kWh battery powering a 1 kW essential load provides approximately 10 hours of backup. Anti-islanding protection must prevent any export to the grid during backup mode.",
  },
  {
    question: 'What are the environmental considerations for battery disposal?',
    answer:
      'Lithium-ion batteries contain valuable materials (lithium, cobalt, nickel, manganese) and hazardous components that must not enter landfill. The UK Waste Batteries and Accumulators Regulations 2009 require proper collection and recycling. Battery recycling recovers 90%+ of materials. The maintenance technician should: never dispose of batteries in general waste; use approved battery recycling schemes (e.g., through the manufacturer or approved waste handler); document disposal for waste duty of care compliance; and be aware that damaged or swollen batteries require specialist hazardous waste handling.',
  },
  {
    question: 'How does a BESS interact with time-of-use electricity tariffs?',
    answer:
      'Time-of-use tariffs (e.g., Octopus Agile, Intelligent Octopus) charge different rates at different times. A BESS can arbitrage these tariffs by: charging from the grid during cheap overnight periods (e.g., 2-5 am at 5-10 p/kWh); storing the energy; and discharging during expensive peak periods (e.g., 4-7 pm at 30-50 p/kWh). Combined with solar PV (charging from free solar during the day), this can significantly reduce electricity costs. The hybrid inverter or energy management system schedules charge/discharge cycles automatically based on tariff data. Annual savings of GBP 300-800 are typical for UK households with PV and battery systems.',
  },
];

const MOETModule3Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.6 · Subsection 3"
        title="Energy Storage Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Battery storage technology, safety and maintenance for electrical technicians.
          </p>

          <TLDR
            points={[
              'BESS: Store energy as chemical energy for later electrical use.',
              'Li-ion: 90-95% efficiency, 3,000-10,000 cycle life, BMS essential.',
              'Safety: Thermal runaway, toxic gases, DC shock hazards.',
              'Standards: BS 7671, IET CoP for EESS, G99/G98 for export.',
            ]}
          />

          <ConceptBlock title="Maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Growth: UK BESS market expanding rapidly (domestic and grid-scale).</li>
              <li>BMS: Monitor cell balance, temperature, fault codes and firmware.</li>
              <li>Emergency: Know thermal runaway signs — swelling, heat, gas odour.</li>
              <li>ST1426: Emerging technologies knowledge required.</li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain lithium-ion battery chemistry and the key differences between NMC and LFP',
              'Describe BESS system architecture: cells, modules, racks, BMS, inverter and thermal management',
              'Identify thermal runaway hazards and the emergency response procedures',
              'Apply BS 7671 requirements and IET guidance for battery storage installations',
              'Carry out BESS inspection, BMS log review and basic fault-finding',
              'Understand the role of BESS in grid frequency response and renewable energy integration',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Battery chemistry and cell technology</ContentEyebrow>

          <ConceptBlock title="How lithium-ion cells store and release energy">
            <p>
              Lithium-ion technology dominates modern energy storage because of its superior energy
              density, efficiency, and cycle life compared to older chemistries. However, different
              lithium-ion chemistries offer different trade-offs between energy density, safety,
              cost, and lifespan. The maintenance technician must understand these differences
              because they directly affect safety procedures, maintenance requirements, and expected
              performance.
            </p>
            <p>
              All lithium-ion cells work on the same fundamental principle: lithium ions move
              between the cathode (positive electrode) and anode (negative electrode, typically
              graphite) through an electrolyte during charge and discharge. The cathode chemistry
              determines the cell&apos;s characteristics. During charging, lithium ions move from
              the cathode to the anode, storing energy. During discharge, the ions flow back,
              releasing energy as electrical current through the external circuit.
            </p>
            <p>
              The electrolyte in conventional lithium-ion cells is a flammable organic solvent
              containing a lithium salt. This is the fundamental reason for the fire risk — if the
              cell is damaged, overcharged, or overheated, the electrolyte can decompose, generating
              flammable gases that can ignite. Understanding this chemistry is essential for the
              maintenance technician because it explains why BMS protection, thermal management, and
              correct installation practices are not optional — they are critical safety
              requirements.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Lithium-ion chemistry comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Chemistry</th>
                    <th className="py-2 pr-4 font-medium text-white">Energy density</th>
                    <th className="py-2 pr-4 font-medium text-white">Safety</th>
                    <th className="py-2 font-medium text-white">Cycle life</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">NMC (Nickel Manganese Cobalt)</td>
                    <td className="py-2 pr-4">High (200-250 Wh/kg)</td>
                    <td className="py-2 pr-4">Moderate — thermal runaway at ~150 degrees C</td>
                    <td className="py-2">3,000-5,000 cycles</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">LFP (Lithium Iron Phosphate)</td>
                    <td className="py-2 pr-4">Lower (100-160 Wh/kg)</td>
                    <td className="py-2 pr-4">High — thermal runaway at ~270 degrees C</td>
                    <td className="py-2">5,000-10,000 cycles</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">NCA (Nickel Cobalt Aluminium)</td>
                    <td className="py-2 pr-4">Very high (250-300 Wh/kg)</td>
                    <td className="py-2 pr-4">Lower — requires robust BMS</td>
                    <td className="py-2">2,000-3,000 cycles</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Sodium-ion (emerging)</td>
                    <td className="py-2 pr-4">Moderate (100-160 Wh/kg)</td>
                    <td className="py-2 pr-4">High — no lithium, non-flammable</td>
                    <td className="py-2">3,000-5,000 cycles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Critical: thermal runaway">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-white">
                Thermal runaway is the most serious hazard in lithium-ion systems. It is a
                self-sustaining exothermic reaction triggered by: overcharge (exceeding maximum cell
                voltage); internal short circuit (dendrite growth or manufacturing defect); external
                short circuit; mechanical damage (puncture, crushing); or external heat. Once
                initiated, cell temperatures can exceed 700 degrees C, releasing flammable and toxic
                gases including hydrogen fluoride, carbon monoxide, and volatile organic compounds.
                Thermal runaway can propagate to adjacent cells, potentially consuming the entire
                battery system. Water is effective for cooling and preventing propagation but
                lithium-ion battery fires can re-ignite hours or days after apparent extinguishment.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> LFP chemistry is increasingly preferred for stationary
              storage because its higher thermal runaway threshold (approximately 270 degrees C vs
              approximately 150 degrees C for NMC) provides an inherent safety margin. However, no
              lithium-ion chemistry is immune to thermal runaway — all require proper BMS
              protection, thermal management, and safe installation practices.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>BESS system architecture</ContentEyebrow>

          <ConceptBlock title="More than just batteries">
            <p>
              A battery energy storage system is far more than just batteries. It is an integrated
              system comprising battery cells, a battery management system, power conversion
              equipment, thermal management, safety systems, and a control interface. Understanding
              the system architecture is essential for maintenance technicians because each
              subsystem has specific maintenance requirements and potential failure modes.
            </p>
            <p>
              The architecture follows a clear hierarchy from individual cells upward. Cells are
              grouped into modules (typically 10-20 cells in series), modules into racks or packs,
              and racks into complete systems. At each level, the BMS provides monitoring and
              control appropriate to that tier. This hierarchical approach enables both fine-grained
              cell-level protection and system-level coordination of charge/discharge strategies.
            </p>
          </ConceptBlock>

          <EpsSld caption="A domestic hybrid inverter switches from grid-following to grid-forming on a grid outage, powering only a backup consumer unit of protected loads from the battery — the same DC bus and inverter that handle everyday charge/discharge duty." />

          <ConceptBlock title="System hierarchy">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cell:</strong> The basic electrochemical unit (3.2-3.7 V nominal depending
                on chemistry).
              </li>
              <li>
                <strong>Module:</strong> Multiple cells connected in series/parallel with cell-level
                BMS monitoring.
              </li>
              <li>
                <strong>Rack/Pack:</strong> Multiple modules connected in series to achieve the
                required system voltage (typically 48-800 V DC).
              </li>
              <li>
                <strong>BMS:</strong> Hierarchical — cell-level monitoring, module-level control,
                system-level management.
              </li>
              <li>
                <strong>Inverter:</strong> DC to AC conversion (bidirectional for grid-connected
                systems).
              </li>
              <li>
                <strong>Thermal management:</strong> Active cooling (liquid or forced air)
                maintaining cells within 15-35 degrees C.
              </li>
              <li>
                <strong>Safety systems:</strong> Contactors, fuses, fire detection, ventilation,
                emergency shutdown.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Battery management system (BMS) functions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cell monitoring:</strong> Voltage, temperature, and current for every cell
                in the system.
              </li>
              <li>
                <strong>Cell balancing:</strong> Equalising charge across cells in series strings
                (passive or active balancing).
              </li>
              <li>
                <strong>Protection:</strong> Overvoltage, undervoltage, overcurrent,
                over-temperature, and short circuit protection.
              </li>
              <li>
                <strong>State estimation:</strong> SoC (state of charge), SoH (state of health), SoP
                (state of power).
              </li>
              <li>
                <strong>Communication:</strong> Data interface to inverter, EMS, and remote
                monitoring platforms.
              </li>
              <li>
                <strong>Logging:</strong> Historical data for performance analysis and warranty
                claims.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Domestic vs grid-scale BESS architecture">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">Domestic (5-15 kWh)</th>
                    <th className="py-2 font-medium text-white">Grid-scale (1-1,000 MWh)</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Enclosure</td>
                    <td className="py-2 pr-4">Wall-mounted indoor/garage unit</td>
                    <td className="py-2">Shipping container modules</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Cooling</td>
                    <td className="py-2 pr-4">Passive or small fan</td>
                    <td className="py-2">Liquid cooling or HVAC</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Fire suppression</td>
                    <td className="py-2 pr-4">None (relies on BMS and separation)</td>
                    <td className="py-2">Dedicated system (water mist, aerosol)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Inverter</td>
                    <td className="py-2 pr-4">Integrated or hybrid (3-7 kW)</td>
                    <td className="py-2">Separate PCS (MW-scale)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Grid connection</td>
                    <td className="py-2 pr-4">G98 (aggregate up to 16 A/phase, ~3.68 kW)</td>
                    <td className="py-2">G99 (HV connection typical)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The BMS is the single most critical safety component. A
              properly functioning BMS prevents the conditions that lead to thermal runaway. During
              maintenance, always review BMS logs for: cell voltage imbalance (indicating cell
              degradation or connection issues), temperature excursions, fault codes, and capacity
              fade trends.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Safety, installation and regulatory requirements</ContentEyebrow>

          <ConceptBlock title="A battery can never be de-energised">
            <p>
              Battery storage systems present unique safety challenges that differ from conventional
              electrical installations. The combination of stored electrochemical energy, high DC
              voltages, flammable electrolyte, and the potential for thermal runaway requires
              specific installation practices, safety equipment, and emergency procedures. The
              maintenance technician must be familiar with all of these to work safely on BESS
              installations.
            </p>
            <p>
              A critical distinction from conventional electrical work is that a battery cannot be
              de-energised. Unlike a mains circuit that can be isolated by opening a switch, the
              cells in a battery always contain stored energy. Even after the DC isolator is opened
              and the inverter is disconnected, the battery pack remains at its operating voltage.
              This fundamentally changes the approach to safe working — additional precautions are
              needed beyond standard safe isolation procedures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Installation requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 general requirements for all circuits.</li>
              <li>BS 7671:2018+A4:2026 Chapter 57 — stationary secondary battery installations.</li>
              <li>IET Code of Practice for EESS guidance.</li>
              <li>DC isolation devices (battery, inverter).</li>
              <li>Ventilation for gas dispersal.</li>
              <li>Fire separation from habitable spaces.</li>
              <li>Emergency isolation accessible from outside.</li>
              <li>Warning labels: &apos;BATTERY STORAGE SYSTEM&apos;.</li>
              <li>Earthing and bonding of all metalwork.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Safety hazards">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>DC electric shock (48-800 V DC that remains live even when isolated from AC).</li>
              <li>Thermal runaway and fire (temperatures exceeding 700 degrees C).</li>
              <li>Toxic gas release (hydrogen fluoride, carbon monoxide).</li>
              <li>Explosion risk (flammable gas accumulation in enclosed spaces).</li>
              <li>Re-ignition (battery fires can re-ignite hours after extinguishment).</li>
              <li>Stored energy (cells cannot be &apos;de-energised&apos; like a switch).</li>
              <li>Arc flash at DC disconnection points.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emergency response: battery fire">
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="text-sm text-white">
                If you suspect a battery is in thermal runaway (swelling, hissing, smoke, heat,
                chemical odour): evacuate the area immediately — do not attempt to disconnect or
                fight the fire; call 999 and inform the fire service it is a lithium-ion battery
                fire; ventilate the area if it can be done safely (open doors and windows from a
                safe distance); do not re-enter until cleared by the fire service. Lithium-ion fires
                produce hydrogen fluoride gas, which is acutely toxic. The fire service will use
                large volumes of water for cooling and preventing propagation. The battery must be
                monitored for at least 24 hours after extinguishment due to re-ignition risk.
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Key regulatory references">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Reference</th>
                    <th className="py-2 font-medium text-white">Coverage</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">BS 7671 (18th Edition)</td>
                    <td className="py-2">
                      General installation requirements; no dedicated BESS section yet
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">IET CoP for EESS</td>
                    <td className="py-2">Detailed guidance for battery storage installations</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">IEC 62619</td>
                    <td className="py-2">
                      Safety requirements for secondary lithium cells in industrial applications
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">G98/G99</td>
                    <td className="py-2">Grid connection requirements for battery export</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">EAWR 1989</td>
                    <td className="py-2">Duty to maintain safe electrical systems</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Unlike a mains circuit that can be completely de-energised
              by opening a switch, a battery always contains stored energy. Even after DC isolation,
              the cells remain charged and present a shock and thermal runaway hazard. Safe working
              practices for BESS must account for this fundamental difference from conventional
              electrical maintenance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>BESS maintenance and grid services</ContentEyebrow>

          <ConceptBlock title="Maintenance matched to the duty cycle">
            <p>
              Battery storage systems require systematic maintenance to ensure safe operation and
              optimal performance throughout their design life. The maintenance regime combines
              visual inspection, BMS data analysis, electrical testing, and thermal management
              verification. A properly maintained BESS will deliver its warranted capacity and cycle
              life; a neglected system may degrade prematurely or, in the worst case, present a
              safety hazard.
            </p>
            <p>
              Additionally, understanding how BESS participates in grid services helps the
              technician appreciate the operational demands placed on the system. A BESS providing
              frequency response may cycle dozens of times per day at varying power levels, placing
              different stress on the cells compared to a domestic system that cycles once daily.
              The maintenance schedule should reflect the actual duty cycle, not just a generic
              calendar-based interval.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BESS maintenance schedule">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Frequency</th>
                    <th className="py-2 font-medium text-white">Maintenance tasks</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Monthly (remote)</td>
                    <td className="py-2">
                      Review BMS data: cell balance, temperature trends, fault codes, capacity
                      utilisation
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Quarterly</td>
                    <td className="py-2">
                      Visual inspection: enclosure condition, ventilation, signs of overheating,
                      pest damage
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Six-monthly</td>
                    <td className="py-2">
                      Electrical checks: isolation devices, protection settings, earthing,
                      connection torques
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Annual</td>
                    <td className="py-2">
                      Full inspection and test: capacity test, thermographic survey, BMS calibration
                      check, firmware updates
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">As required</td>
                    <td className="py-2">
                      Fault investigation, cell replacement, BMS recalibration, fire system
                      inspection
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Grid services provided by BESS">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Frequency response:</strong> Dynamic Containment, Dynamic Moderation,
                Dynamic Regulation — injecting/absorbing power within milliseconds to maintain grid
                frequency at 50 Hz.
              </li>
              <li>
                <strong>Peak shaving:</strong> Reducing demand during peak tariff periods (4-7 pm)
                by discharging stored energy.
              </li>
              <li>
                <strong>Renewable integration:</strong> Smoothing variable PV/wind output and
                time-shifting generation to match demand.
              </li>
              <li>
                <strong>Capacity market:</strong> Providing guaranteed available capacity during
                system stress events.
              </li>
              <li>
                <strong>Voltage support:</strong> Reactive power provision for local voltage
                regulation.
              </li>
              <li>
                <strong>Black start:</strong> Capability to energise grid sections after a total
                blackout (large installations).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BMS log analysis for maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cell voltage spread:</strong> Maximum voltage difference between cells
                should be less than 50 mV for NMC or 30 mV for LFP — wider spread indicates cell
                degradation, poor balancing, or connection resistance.
              </li>
              <li>
                <strong>Temperature differential:</strong> Cell-to-cell temperature difference
                exceeding 5 degrees C suggests uneven cooling or a developing cell fault.
              </li>
              <li>
                <strong>Capacity fade:</strong> Compare current usable capacity with original rated
                capacity — degradation exceeding the manufacturer&apos;s warranty curve indicates
                accelerated ageing.
              </li>
              <li>
                <strong>Fault history:</strong> Review all logged fault codes; recurring faults
                indicate systemic issues requiring investigation.
              </li>
              <li>
                <strong>Cycle count:</strong> Track total cycles against warranty limits; excessive
                cycling (especially from frequency response duty) may accelerate degradation.
              </li>
            </ul>
          </ConceptBlock>

          <p className="text-sm text-white italic">
            <strong>Note:</strong> Under ST1426, maintenance technicians must understand energy
            storage as part of the emerging technologies knowledge requirement. The rapid growth of
            BESS — both domestic (paired with solar PV) and grid-scale (providing frequency response
            and capacity services) — means this technology will form an increasing part of the
            maintenance workload. Technicians who develop competence in BESS maintenance will be
            highly valued in the evolving energy market.
          </p>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Second-life batteries and future storage technologies</ContentEyebrow>

          <ConceptBlock title="Extending battery life beyond first use">
            <p>
              As the first generation of electric vehicle batteries reaches the end of their
              automotive life (typically when capacity drops below 70-80% of original), these
              batteries still retain significant capacity for less demanding stationary storage
              applications. Second-life battery systems repurpose EV batteries for building-level
              energy storage, grid services, and renewable integration — extending the useful life
              of the battery and improving the environmental return on the materials invested in
              manufacture.
            </p>
            <p>
              Beyond lithium-ion, several emerging storage technologies are approaching commercial
              deployment. Sodium-ion batteries offer a lithium-free alternative using abundant
              materials. Flow batteries (vanadium redox, zinc-bromine) provide long-duration storage
              with independent scaling of power and energy capacity. Compressed air energy storage
              (CAES) and liquid air energy storage (LAES) offer grid-scale solutions without battery
              chemistry limitations. The maintenance technician must be aware of these developments
              as they will increasingly appear in the installed base.
            </p>
            <p>
              The circular economy approach to batteries is becoming increasingly important. The
              UK&apos;s commitment to net zero will require millions of battery systems in vehicles,
              buildings, and grid infrastructure. Managing these batteries through their full
              lifecycle — manufacture, first use, second life, and recycling — is essential for both
              economic and environmental sustainability. The maintenance technician plays a key role
              in this lifecycle by maintaining systems to achieve their design life and identifying
              batteries suitable for second-life applications rather than premature recycling.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Second-life battery considerations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacity:</strong> Typically 70-80% of original rated capacity — adequate
                for stationary applications with lower energy density requirements.
              </li>
              <li>
                <strong>Testing:</strong> Each module must be individually tested for capacity,
                internal resistance and cell balance before repurposing.
              </li>
              <li>
                <strong>BMS:</strong> New BMS often required, calibrated for the actual cell
                characteristics rather than the original EV specification.
              </li>
              <li>
                <strong>Safety:</strong> Same thermal runaway risks as new batteries — fire
                suppression and ventilation requirements unchanged.
              </li>
              <li>
                <strong>Standards:</strong> IEC 62619 applies to second-life battery systems; UK
                regulatory framework still developing.
              </li>
              <li>
                <strong>Cost:</strong> Typically 30-60% of new battery cost — attractive for
                lower-cycling applications.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emerging storage technologies">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sodium-ion:</strong> No lithium required; inherently safer; comparable cycle
                life to LFP; lower energy density; now entering commercial production.
              </li>
              <li>
                <strong>Flow batteries:</strong> Vanadium redox or zinc-bromine; power and energy
                independently scalable; 20,000+ cycles; suited to long-duration (4-12 hours)
                applications.
              </li>
              <li>
                <strong>Solid-state:</strong> Solid electrolyte replacing liquid — higher energy
                density, inherently safer, but currently expensive and limited to small cells.
              </li>
              <li>
                <strong>Gravity storage:</strong> Lifting heavy blocks during charging and lowering
                them to generate electricity — long life, no chemical degradation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Battery lifecycle and the maintenance technician">
            <p>
              The maintenance technician interacts with the battery lifecycle at several points.
              During the operational phase, regular maintenance ensures the battery achieves its
              design life and warranty targets. As the battery ages, BMS data analysis identifies
              whether degradation is within expected parameters or accelerated. When the battery
              reaches end-of-first-life (typically 70-80% capacity for EV batteries, or when
              performance no longer meets the application requirement), the technician&apos;s
              assessment informs whether the battery is suitable for second-life repurposing or
              should be sent for recycling. Proper documentation throughout the battery&apos;s life
              supports these decisions and ensures compliance with the Waste Batteries and
              Accumulators Regulations 2009.
            </p>
          </ConceptBlock>

          <p className="text-sm text-white italic">
            <strong>Note:</strong> Under ST1426, awareness of emerging energy storage technologies
            supports the standard&apos;s requirement for technicians to understand developing
            technologies and their maintenance implications. The storage landscape is evolving
            rapidly, and technicians who stay current with new chemistries and system architectures
            will be best prepared for the changing maintenance workload.
          </p>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=8XI6GVLjPng"

            title="What Is an Inverter? How Inverters Work"

            channel="The Engineering Mindset"

            duration="4:46"

            topic="Turning stored DC back into grid-synchronised AC"

            caption="Short and central to storage — the inverter is what makes a battery useful to an installation."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'NMC: high density, 150 C runaway, 3-5k cycles. LFP: safer, 270 C runaway, 5-10k cycles.',
              'NCA: highest density, needs robust BMS. Na-ion: no lithium, emerging commercial.',
              'Round-trip efficiency: 90-95%. 80% DoD roughly doubles cycle life versus 100%.',
              'BMS: monitor cell voltage, temperature and SoC. Thermal runaway: 700 C+, toxic gases.',
              'Swelling or leakage: evacuate immediately. Cells are always energised — they cannot be de-energised.',
              'Monthly: BMS log review (remote). Annual: capacity test, thermographic survey. IET Code of Practice for EESS applies.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section6-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Wind and Other Renewables
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section6-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Smart Grids and Smart Meters
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section6_3;
