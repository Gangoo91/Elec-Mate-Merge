/**
 * Module 8 · Section 3 · Subsection 1 — Refrigeration Fundamentals
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Understanding refrigeration cycles, refrigerants, components and F-Gas regulations for building services
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Refrigeration Fundamentals - HNC Module 8 Section 3.1';
const DESCRIPTION =
  'Comprehensive guide to refrigeration systems for building services: vapour compression cycle, P-h diagrams, refrigerant types (R32, R410A, R290), GWP values, F-Gas regulations, compressor types, condensers, evaporators and expansion devices.';

const quickCheckQuestions = [
  {
    id: 'vapour-compression-stages',
    question:
      'What are the four main stages of the vapour compression refrigeration cycle in order?',
    options: [
      'Condensation, expansion, evaporation, compression',
      'Expansion, evaporation, compression, condensation',
      'Evaporation, compression, condensation, expansion',
      'Compression, condensation, expansion, evaporation',
    ],
    correctIndex: 3,
    explanation:
      'The vapour compression cycle follows: Compression (low pressure vapour to high pressure vapour), Condensation (high pressure vapour to high pressure liquid), Expansion (high pressure liquid to low pressure liquid), Evaporation (low pressure liquid to low pressure vapour). This cycle continuously removes heat from the evaporator and rejects it at the condenser.',
  },
  {
    id: 'refrigerant-gwp',
    question: 'Which refrigerant has the lowest Global Warming Potential (GWP)?',
    options: [
      'R410A (GWP 2088)',
      'R32 (GWP 675)',
      'R134a (GWP 1430)',
      'R290 Propane (GWP 3)',
    ],
    correctIndex: 3,
    explanation:
      'R290 (propane) has a GWP of only 3, making it the most environmentally friendly option. However, it is highly flammable (A3 classification) and requires special safety measures. R32 (GWP 675) is a popular lower-GWP alternative to R410A (GWP 2088) in split systems.',
  },
  {
    id: 'compressor-type',
    question:
      'Which compressor type is most commonly used in domestic and light commercial air conditioning systems?',
    options: [
      'Screw compressor',
      'Reciprocating compressor',
      'Centrifugal compressor',
      'Scroll compressor',
    ],
    correctIndex: 3,
    explanation:
      'Scroll compressors dominate domestic and light commercial AC due to their quiet operation, high efficiency, fewer moving parts and reliability. Reciprocating compressors are used in smaller systems, screw compressors in large commercial applications, and centrifugal in industrial chillers.',
  },
  {
    id: 'f-gas-certification',
    question:
      'Under F-Gas regulations, what is the minimum charge requiring an F-Gas certificate to handle refrigerants?',
    options: [
      'Only charges above 3 kg require certification',
      'Only charges above 5 tonnes CO2e require certification',
      'Any amount requires certification',
      'Only charges above 6 kg in sealed systems require it',
    ],
    correctIndex: 2,
    explanation:
      'F-Gas regulations require anyone handling fluorinated refrigerants (HFCs) to hold an appropriate F-Gas certificate, regardless of the charge amount. This applies to installation, maintenance, servicing, recovery and leak checking activities. The regulations aim to reduce emissions of potent greenhouse gases.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In a P-h (pressure-enthalpy) diagram, which process is represented by a vertical line?',
    options: [
      'Evaporation at constant pressure',
      'Throttling through expansion device',
      'Isentropic compression',
      'Condensation at constant pressure',
    ],
    correctAnswer: 1,
    explanation:
      'Throttling through an expansion device is an isenthalpic (constant enthalpy) process, represented by a vertical line on a P-h diagram. The refrigerant drops in pressure without changing enthalpy because no work is done and minimal heat is transferred during this rapid expansion.',
  },
  {
    id: 2,
    question: 'What is the primary function of the condenser in a refrigeration system?',
    options: [
      'To compress the low-pressure vapour to high pressure',
      'To absorb heat from the space being cooled',
      'To reject heat from the refrigerant to the surroundings',
      'To reduce the pressure of the liquid refrigerant',
    ],
    correctAnswer: 2,
    explanation:
      'The condenser rejects heat from the high-pressure, high-temperature refrigerant vapour to the surrounding air or water. This causes the refrigerant to condense from vapour to liquid while maintaining high pressure. Heat rejection equals the heat absorbed at the evaporator plus the compressor work input.',
  },
  {
    id: 3,
    question: 'R32 refrigerant is classified as A2L. What does this classification indicate?',
    options: [
      'Highly flammable, non-toxic',
      'Non-flammable, high toxicity',
      'Non-flammable, non-toxic',
      'Lower flammability, lower toxicity',
    ],
    correctAnswer: 3,
    explanation:
      "A2L indicates lower flammability and lower toxicity. The 'A' means lower toxicity (occupational exposure limit &gt;400 ppm), '2' indicates flammable, and 'L' denotes lower flammability (burning velocity &lt;10 cm/s). R32 requires special handling but is safer than A3 (highly flammable) refrigerants like R290.",
  },
  {
    id: 4,
    question: 'What is the purpose of superheat in a refrigeration system?',
    options: [
      'To ensure only vapour enters the compressor',
      'To increase system efficiency',
      'To reduce condensing temperature',
      'To increase cooling capacity',
    ],
    correctAnswer: 0,
    explanation:
      "Superheat ensures that only dry vapour (no liquid) enters the compressor. Liquid refrigerant entering the compressor causes 'liquid slugging' which can severely damage compressor valves and bearings. Typical superheat is 5-10K above saturation temperature at evaporator pressure.",
  },
  {
    id: 5,
    question: 'Which expansion device automatically adjusts to maintain constant superheat?',
    options: [
      'Fixed-bore capillary tube',
      'Thermostatic expansion valve (TXV)',
      'Fixed orifice (piston) device',
      'Manual hand-operated throttle valve',
    ],
    correctAnswer: 1,
    explanation:
      'A thermostatic expansion valve (TXV or TEV) uses a sensing bulb to measure suction line temperature and automatically adjusts refrigerant flow to maintain constant superheat regardless of load conditions. Capillary tubes and fixed orifices cannot adjust to changing conditions.',
  },
  {
    id: 6,
    question:
      'Under the EU F-Gas Regulation phase-down, what is the GWP limit for single split AC systems containing less than 3 kg from 2025?',
    options: [
      'GWP &lt;2500',
      'GWP &lt;150',
      'GWP &lt;750',
      'No GWP limit applies',
    ],
    correctAnswer: 2,
    explanation:
      'From January 2025, single split AC systems containing less than 3 kg of refrigerant must use refrigerants with GWP &lt;750. This effectively bans R410A (GWP 2088) in new equipment in this category, pushing the market towards R32 (GWP 675) and other lower-GWP alternatives.',
  },
  {
    id: 7,
    question:
      'What is the typical coefficient of performance (COP) for a modern air-cooled split system in cooling mode?',
    options: [
      '1.0 - 1.5',
      '10.0 - 15.0',
      '6.0 - 8.0',
      '2.5 - 4.0',
    ],
    correctAnswer: 3,
    explanation:
      'Modern air-cooled split systems typically achieve COPs of 2.5-4.0 in cooling mode, meaning they move 2.5-4 kW of heat for every 1 kW of electrical input. Higher efficiency units and water-cooled systems can achieve COPs of 5-6. Heat pumps in heating mode often achieve COPs of 3-5.',
  },
  {
    id: 8,
    question: 'Which compressor type uses two spiral-shaped scrolls to compress refrigerant?',
    options: [
      'Scroll compressor',
      'Screw compressor',
      'Reciprocating compressor',
      'Rotary vane compressor',
    ],
    correctAnswer: 0,
    explanation:
      'Scroll compressors use two interleaving spiral scrolls - one fixed, one orbiting. As the orbiting scroll moves, pockets of refrigerant are progressively compressed from the outer edge toward the centre discharge port. This design provides smooth, quiet operation with minimal vibration.',
  },
  {
    id: 9,
    question: 'What is subcooling in a refrigeration system?',
    options: [
      'Heating the vapour above its saturation temperature',
      'Cooling the liquid refrigerant below its saturation temperature',
      'Lowering the suction pressure below atmospheric pressure',
      'Adding extra refrigerant charge to raise the head pressure',
    ],
    correctAnswer: 1,
    explanation:
      'Subcooling is cooling the liquid refrigerant below its saturation (condensing) temperature. Typical subcooling is 5-10K. Subcooling ensures fully liquid refrigerant reaches the expansion device and increases system capacity by increasing the enthalpy difference in the evaporator.',
  },
  {
    id: 10,
    question: 'R290 (propane) refrigerant requires which safety classification considerations?',
    options: [
      'No special precautions as it is completely non-flammable',
      'High-toxicity handling procedures and breathing apparatus',
      'ATEX compliant equipment and charge limits in occupied spaces',
      'Pressurised storage only, with no charge limit in any space',
    ],
    correctAnswer: 2,
    explanation:
      'R290 is classified A3 (highly flammable), requiring ATEX compliant electrical equipment in equipment rooms, charge limits in occupied spaces (typically 150g for direct systems), leak detection, and adequate ventilation. Despite restrictions, R290 is increasingly used due to its GWP of only 3 and excellent thermodynamic properties.',
  },
  {
    id: 11,
    question: 'What is the main advantage of an electronic expansion valve (EEV) over a TXV?',
    options: [
      'It requires no electrical connection or control signal',
      'It is significantly cheaper and simpler to install',
      'It needs no superheat sensing to operate correctly',
      'Precise control via BMS integration and wider operating range',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic expansion valves offer precise stepper motor or pulse-width modulation control, BMS integration capability, wider operating range, and faster response to load changes. They enable sophisticated control strategies like optimised superheat and can adapt to variable speed compressor systems.',
  },
  {
    id: 12,
    question: 'In a screw compressor, what is the function of the oil injection?',
    options: [
      'Sealing, lubrication, and cooling',
      'Increasing discharge pressure',
      'Lubrication only',
      'Preventing liquid slugging',
    ],
    correctAnswer: 0,
    explanation:
      'Oil in screw compressors performs three critical functions: sealing the clearances between rotors for efficient compression, lubricating the rotors and bearings, and cooling the compressed gas to prevent overheating. An oil separator removes oil from the discharge gas before the condenser.',
  },
  {
    id: 13,
    question:
      'What happens to refrigerant pressure and temperature during the evaporation process?',
    options: [
      'Both rise sharply as the refrigerant is compressed',
      'Both stay relatively constant as heat is absorbed',
      'Pressure rises whilst temperature falls steadily',
      'Temperature rises whilst pressure drops to near zero',
    ],
    correctAnswer: 1,
    explanation:
      'During evaporation, the refrigerant absorbs latent heat from the cooled space while changing from liquid to vapour. Pressure and temperature remain relatively constant (at saturation conditions) until all liquid has evaporated. Only then does temperature increase as superheat develops.',
  },
  {
    id: 14,
    question:
      'What is the maximum leak check interval for systems containing 50-500 tonnes CO2 equivalent under F-Gas regulations?',
    options: [
      'Monthly',
      'Quarterly',
      'Annually',
      'Every 6 months',
    ],
    correctAnswer: 2,
    explanation:
      'Systems containing 50-500 tonnes CO2 equivalent must be leak checked at least annually. Systems with 500+ tonnes require 6-monthly checks, unless automatic leak detection is fitted (which extends intervals). CO2 equivalent = refrigerant charge (kg) x GWP.',
  },
];

const faqs = [
  {
    question: 'Why is R410A being phased out in favour of R32?',
    answer:
      'R410A has a GWP of 2088, making it a significant contributor to climate change. The EU F-Gas Regulation phase-down requires lower-GWP refrigerants for new equipment. R32 (GWP 675) offers similar performance to R410A but with 68% lower GWP. R32 also requires approximately 30% less charge for the same capacity, operates at slightly higher pressures, and has better heat transfer properties. However, R32 is mildly flammable (A2L), requiring updated installation practices and safety measures.',
  },
  {
    question: 'What qualifications do I need to work with refrigerants in the UK?',
    answer:
      "Working with fluorinated greenhouse gases (F-gases) in the UK requires an F-Gas certificate under EU Regulation 517/2014 (retained in UK law). Categories include: Category I (all activities), Category II (maintenance/recovery where no breach of refrigerant circuit), Category III (recovery from equipment with less than 3 kg charge), and Category IV (leak checking). Natural refrigerants like R290 don't require F-Gas certification but do require competency in handling flammable substances. City & Guilds 2079 is the most common F-Gas qualification.",
  },
  {
    question: 'How do I calculate the CO2 equivalent of a refrigeration system?',
    answer:
      'CO2 equivalent (tonnes) = Refrigerant charge (kg) x GWP / 1000. For example, a system with 8 kg of R410A: 8 x 2088 / 1000 = 16.7 tonnes CO2 equivalent. This determines leak check frequency and record-keeping requirements under F-Gas regulations. Systems with 5 tonnes CO2e or more require records to be maintained for 5 years, including refrigerant type, quantity, dates of service, and technician details.',
  },
  {
    question: 'What is the difference between an air-cooled and water-cooled condenser?',
    answer:
      'Air-cooled condensers reject heat directly to ambient air using fans, are simpler to install, require less maintenance, but operate at higher condensing temperatures (typically 10-15K above ambient). Water-cooled condensers use cooling towers or ground loops, achieving lower condensing temperatures (approaching wet-bulb temperature), resulting in 15-25% higher efficiency. However, water-cooled systems have higher capital costs, require water treatment, and need freeze protection. Water-cooled is typically chosen for systems above 100 kW or where high efficiency is critical.',
  },
  {
    question: 'Why do refrigeration systems need both superheat and subcooling?',
    answer:
      'Superheat (typically 5-10K) at the evaporator outlet ensures only vapour enters the compressor, preventing liquid slugging damage to compressor valves and bearings. Subcooling (typically 5-10K) at the condenser outlet ensures fully liquid refrigerant reaches the expansion device, preventing flash gas that reduces system capacity. Both are measured as temperature differences from saturation conditions and are key diagnostic parameters for system performance and refrigerant charge verification.',
  },
  {
    question:
      'What are the main considerations when selecting a refrigerant for a new installation?',
    answer:
      'Key considerations include: GWP and F-Gas regulation compliance (current and future), safety classification (toxicity and flammability), thermodynamic properties for the application, compatibility with oils and materials, operating pressures and temperatures, availability and cost, training and equipment requirements for handling, and charge limits for occupied spaces. No single refrigerant is ideal for all applications - selection involves balancing environmental impact, safety, efficiency, and practicality for the specific building services application.',
  },
];

const HNCModule8Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 3 · Subsection 1"
            title="Refrigeration Fundamentals"
            description="Understanding refrigeration cycles, refrigerants, components and F-Gas regulations for building services"
            tone="purple"
          />

          <ConceptBlock title="The Vapour Compression Refrigeration Cycle">
            <p>The vapour compression cycle is the fundamental thermodynamic process used in virtually all air conditioning, heat pump and refrigeration systems. It exploits the latent heat of vaporisation to move thermal energy from a low-temperature source to a high-temperature sink.</p>
            <p><strong>The Four Stages of the Cycle:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Compression (1&gt;2):</strong> Low-pressure vapour is compressed to high-pressure, high-temperature vapour</li>
              <li><strong>Condensation (2&gt;3):</strong> High-pressure vapour releases heat and condenses to high-pressure liquid</li>
              <li><strong>Expansion (3&gt;4):</strong> High-pressure liquid passes through expansion device, dropping to low pressure</li>
              <li><strong>Evaporation (4&gt;1):</strong> Low-pressure liquid absorbs heat and evaporates to low-pressure vapour</li>
            </ul>
            <p><strong>Energy Balance</strong></p>
            <p>Q<sub>condenser</sub> = Q<sub>evaporator</sub> + W<sub>compressor</sub></p>
            <p>{' '} = Heat rejected at condenser (kW)</p>
            <p>{' '} = Heat absorbed at evaporator (kW)</p>
            <p>{' '} = Compressor work input (kW)</p>
            <p>= Q</p>
            <p>/ W</p>
            <p>(cooling)</p>
            <p><strong>Pressure-Enthalpy (P-h) Diagram</strong></p>
            <p>The P-h diagram is essential for analysing refrigeration cycles. The x-axis shows specific enthalpy (kJ/kg), the y-axis shows pressure (bar). The saturation dome divides liquid, two-phase and vapour regions.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Compression:</strong> Curved, rising right — Isentropic (constant entropy) - pressure and enthalpy increase</li>
              <li><strong>Condensation:</strong> Horizontal, left — Isobaric (constant pressure) - enthalpy decreases as heat is rejected</li>
              <li><strong>Expansion:</strong> Vertical, down — Isenthalpic (constant enthalpy) - pressure drops, some flash gas forms</li>
              <li><strong>Evaporation:</strong> Horizontal, right — Isobaric (constant pressure) - enthalpy increases as heat is absorbed</li>
            </ul>
            <p><strong>Key Cycle Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Evaporating temperature:</strong> Typically 5-10K below desired cooling temperature</li>
              <li><strong>Condensing temperature:</strong> Typically 10-15K above ambient (air-cooled)</li>
              <li><strong>Superheat:</strong> 5-10K above evaporating temperature at compressor inlet</li>
              <li><strong>Subcooling:</strong> 5-10K below condensing temperature at expansion device inlet</li>
              <li><strong>Pressure ratio:</strong> P<sub>discharge</sub> / P<sub>suction</sub> - typically 2.5-4 for AC systems</li>
            </ul>
            <p><strong>Remember:</strong> Heat always flows from hot to cold naturally. The refrigeration cycle uses work (compressor) to move heat against this natural direction - from the cold evaporator to the hot condenser.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Refrigerants and Environmental Impact">
            <p>Refrigerant selection is critical in modern building services, balancing thermodynamic performance, safety, environmental impact and regulatory compliance. The industry is transitioning from high-GWP HFCs towards lower-GWP alternatives and natural refrigerants.</p>
            <p><strong>Common Refrigerants Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R410A:</strong> HFC blend — 2088 — A1 — Split AC (being phased out)</li>
              <li><strong>R32:</strong> HFC — 675 — A2L — Split AC, heat pumps</li>
              <li><strong>R134a:</strong> HFC — 1430 — A1 — Chillers, automotive</li>
              <li><strong>R290 (Propane):</strong> HC (Natural) — 3 — A3 — Small systems, heat pumps</li>
              <li><strong>R744 (CO2):</strong> Natural — 1 — A1 — Commercial refrigeration, heat pumps</li>
              <li><strong>R717 (Ammonia):</strong> Natural — 0 — B2L — Industrial refrigeration</li>
            </ul>
            <p><strong>Safety Classification (ASHRAE 34)</strong></p>
            <p><strong>Toxicity</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A</strong> = Lower toxicity (OEL &gt;400 ppm)</li>
              <li><strong>B</strong> = Higher toxicity (OEL &lt;400 ppm)</li>
            </ul>
            <p><strong>Flammability</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1</strong> = No flame propagation</li>
              <li><strong>2L</strong> = Lower flammability (&lt;10 cm/s)</li>
              <li><strong>2</strong> = Flammable</li>
              <li><strong>3</strong> = Higher flammability</li>
            </ul>
            <p><strong>Global Warming Potential (GWP)</strong></p>
            <p>GWP measures a gas's ability to trap heat relative to CO2 (GWP=1) over 100 years. R410A with GWP of 2088 means 1 kg leaked is equivalent to 2088 kg of CO2 emissions. This is why F-Gas regulations are driving the transition to lower-GWP refrigerants.</p>
            <p><strong>R32 vs R410A - Key Differences:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>GWP:</strong> R32 (675) is 68% lower than R410A (2088)</li>
              <li><strong>Charge:</strong> R32 requires approximately 30% less refrigerant</li>
              <li><strong>Pressure:</strong> R32 operates at slightly higher discharge pressures</li>
              <li><strong>Temperature:</strong> R32 has higher discharge temperatures - affects compressor design</li>
              <li><strong>Safety:</strong> R32 is A2L (mildly flammable) vs R410A A1 (non-flammable)</li>
              <li><strong>Efficiency:</strong> R32 has approximately 5% better energy efficiency</li>
            </ul>
            <p><strong>Key point:</strong> The refrigerant landscape is evolving rapidly. Building services engineers must stay current with regulations, understand refrigerant properties, and consider future service availability when specifying new systems.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Compressors and System Components">
            <p>The compressor is the "heart" of the refrigeration system, providing the pressure difference that drives refrigerant flow. Different compressor types suit different capacities and applications, each with distinct characteristics.</p>
            <p><strong>Compressor Types Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reciprocating:</strong> 0.5-100 kW — Simple, repairable, wide pressure ratio — Small commercial, transport</li>
              <li><strong>Scroll:</strong> 3-60 kW — Quiet, efficient, reliable, few parts — Split AC, heat pumps, light commercial</li>
              <li><strong>Rotary:</strong> 1-15 kW — Compact, quiet, low vibration — Domestic AC, small splits</li>
              <li><strong>Screw:</strong> 50-1500 kW — High capacity, variable speed capable — Large commercial, industrial chillers</li>
              <li><strong>Centrifugal:</strong> 300-10,000+ kW — Very high efficiency at full load — Large chillers, district cooling</li>
            </ul>
            <p><strong>Scroll Compressor Operation</strong></p>
            <p>Scroll compressors use two interleaved spiral scrolls - one stationary, one orbiting. As the orbiting scroll moves eccentrically, crescent-shaped pockets trap and progressively compress refrigerant vapour from the outer edge toward the central discharge port.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuous compression with minimal pulsation</li>
              <li>Fewer moving parts than reciprocating (higher reliability)</li>
              <li>Tolerant of liquid refrigerant (compliant mechanism)</li>
              <li>Cannot reverse direction - important for installation</li>
              <li>Variable speed versions available (inverter-driven)</li>
            </ul>
            <p><strong>Condensers</strong></p>
            <p>Reject heat from high-pressure refrigerant</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Air-cooled:</strong> Fans over finned coils, simple, common</li>
              <li><strong>Water-cooled:</strong> Shell-and-tube, higher efficiency</li>
              <li><strong>Evaporative:</strong> Water spray + air, approaching wet-bulb</li>
              <li><strong>Microchannel:</strong> Compact, lower charge, modern units</li>
            </ul>
            <p><strong>Evaporators</strong></p>
            <p>Absorb heat into low-pressure refrigerant</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct expansion (DX):</strong> Air over refrigerant coils</li>
              <li><strong>Flooded:</strong> Shell-and-tube for chillers</li>
              <li><strong>Plate heat exchanger:</strong> Compact, high efficiency</li>
              <li><strong>Fan coil units:</strong> Terminal units with DX or chilled water</li>
            </ul>
            <p><strong>Expansion Devices</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Capillary tube:</strong> Fixed restriction (length/diameter) — Small domestic, simple systems</li>
              <li><strong>Fixed orifice:</strong> Fixed opening size — Residential heat pumps (piston type)</li>
              <li><strong>TXV/TEV:</strong> Thermostatic - maintains superheat — Commercial AC, refrigeration</li>
              <li><strong>EEV:</strong> Electronic - stepper motor/PWM — VRF systems, precision control</li>
            </ul>
            <p><strong>Design consideration:</strong> Modern inverter-driven compressors require electronic expansion valves (EEVs) that can respond quickly to capacity changes. Fixed devices cannot maintain correct superheat across the wide operating range of variable-speed systems.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="F-Gas Regulations and Compliance">
            <p>The F-Gas Regulation (EU 517/2014, retained in UK law) controls the use of fluorinated greenhouse gases (HFCs) to reduce their contribution to climate change. Building services engineers must understand and comply with these requirements.</p>
            <p><strong>Key F-Gas Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Certification:</strong> All personnel handling F-gases must hold appropriate F-Gas certificates</li>
              <li><strong>Leak checking:</strong> Mandatory for systems above 5 tonnes CO2e (frequency depends on charge)</li>
              <li><strong>Record keeping:</strong> Equipment records for 5 years minimum</li>
              <li><strong>Recovery:</strong> F-gases must be properly recovered during service/decommissioning</li>
              <li><strong>Labelling:</strong> Equipment must be labelled with refrigerant type and charge</li>
            </ul>
            <p><strong>Leak Check Frequency (Based on CO2 Equivalent)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt;5 tonnes:</strong> No requirement — -</li>
              <li><strong>5-50 tonnes:</strong> 12 months — 24 months</li>
              <li><strong>50-500 tonnes:</strong> 6 months — 12 months</li>
              <li><strong>&gt;500 tonnes:</strong> 3 months — 6 months</li>
            </ul>
            <p><strong>GWP Phase-Down and Bans</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2020:</strong> Domestic refrigerators/freezers GWP &gt;150 banned</li>
              <li><strong>2020:</strong> Moveable AC GWP &gt;150 banned</li>
              <li><strong>2022:</strong> Commercial refrigeration &lt;40 kW GWP &gt;150 banned</li>
              <li><strong>2025:</strong> Single split AC &lt;3 kg charge GWP &gt;750 banned</li>
              <li><strong>2025:</strong> Multipack centralised refrigeration &gt;40 kW GWP &gt;150 banned</li>
            </ul>
            <p><strong>CO2 Equivalent Calculation</strong></p>
            <p>CO2e (tonnes) = Charge (kg) x GWP / 1000</p>
            <p>Example: R410A System</p>
            <p>Charge: 8 kg</p>
            <p>GWP: 2088</p>
            <p>CO2e = 8 x 2088 / 1000 = <strong>16.7 tonnes</strong></p>
            <p>Requires 6-monthly leak checks</p>
            <p>Example: R32 System</p>
            <p>Charge: 5.5 kg (30% less than R410A)</p>
            <p>GWP: 675</p>
            <p>CO2e = 5.5 x 675 / 1000 = <strong>3.7 tonnes</strong></p>
            <p>Below 5 tonnes - no leak check required</p>
            <p><strong>F-Gas Certificate Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>I:</strong> All activities including leak checking, recovery, installation, maintenance, servicing</li>
              <li><strong>II:</strong> Recovery, installation, maintenance where refrigerant circuit is not breached</li>
              <li><strong>III:</strong> Recovery from equipment with &lt;3 kg charge (or &lt;6 kg hermetically sealed)</li>
              <li><strong>IV:</strong> Leak checking only (not involving breaking into refrigerant circuit)</li>
            </ul>
            <p><strong>Record Keeping Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Quantity and type of F-gas installed</li>
              <li>Quantity added during installation, maintenance or servicing</li>
              <li>Quantity recovered</li>
              <li>Identity of company/technician who performed work</li>
              <li>Dates and results of leak checks</li>
              <li>Records retained for minimum 5 years</li>
            </ul>
            <p><strong>Compliance note:</strong> Natural refrigerants (R290, R744, R717) are not covered by F-Gas regulations as they are not fluorinated gases. However, they have their own safety requirements - R290 requires compliance with flammable substance regulations, R717 with toxic substance handling.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: COP Calculation</strong>
            </p>
            <p><strong>Question:</strong> A split system air conditioner has a cooling capacity of 7 kW and consumes 2.2 kW of electrical power. Calculate the COP.</p>
            <p>COP (cooling) = Cooling capacity / Power input</p>
            <p>COP = Q<sub>evap</sub> / W<sub>comp</sub></p>
            <p>COP = 7 kW / 2.2 kW = <strong>3.18</strong></p>
            <p>For every 1 kW of electrical input, the system moves 3.18 kW of heat.</p>
            <p>Heat rejected at condenser = 7 + 2.2 = 9.2 kW</p>
            <p>
              <strong>Example 2: CO2 Equivalent Determination</strong>
            </p>
            <p><strong>Question:</strong> A VRF system contains 25 kg of R410A. Calculate the CO2 equivalent and determine leak check frequency.</p>
            <p>CO2e = Charge x GWP / 1000</p>
            <p>CO2e = 25 kg x 2088 / 1000 = <strong>52.2 tonnes CO2e</strong></p>
            <p>52.2 tonnes falls in 50-500 tonnes bracket:</p>
            <p>- Standard leak check interval: <strong>6 months</strong></p>
            <p>- With automatic leak detection: <strong>12 months</strong></p>
            <p>Records must be maintained for 5 years</p>
            <p>
              <strong>Example 3: Superheat Calculation</strong>
            </p>
            <p><strong>Question:</strong> An evaporator operates at 5 bar with R32. The saturation temperature at 5 bar is 2 degrees C. The suction line temperature measures 10 degrees C. What is the superheat?</p>
            <p>Superheat = Suction temperature - Saturation temperature</p>
            <p>Superheat = 10 degrees C - 2 degrees C = <strong>8K</strong></p>
            <p>This is within the typical 5-10K range:</p>
            <p>System operating correctly - dry vapour entering compressor</p>
            <p>Low superheat (&lt;3K) indicates risk of liquid return</p>
            <p>High superheat (&gt;15K) indicates insufficient refrigerant or TXV issue</p>
            <p>
              <strong>Example 4: Refrigerant Comparison for New Installation</strong>
            </p>
            <p><strong>Question:</strong> A contractor is specifying a 10 kW split system. Compare R410A and R32 options for F-Gas compliance.</p>
            <p>Typical charges for 10 kW system:</p>
            <p>R410A: approximately 3.5 kg</p>
            <p>R32: approximately 2.5 kg (30% less)</p>
            <p>CO2 equivalent:</p>
            <p>R410A: 3.5 x 2088 / 1000 = 7.3 tonnes CO2e</p>
            <p>R32: 2.5 x 675 / 1000 = 1.7 tonnes CO2e</p>
            <p>Implications:</p>
            <p>R410A: <strong>Above 5 tonnes - annual leak checks required</strong></p>
            <p>R32: <strong>Below 5 tonnes - no mandatory leak checks</strong></p>
            <p>From 2025: R410A banned in single splits &lt;3 kg charge (GWP &gt;750)</p>
            <p>R32 (GWP 675) complies with new regulations</p>
            <p>
              <strong>Example 5: Heat Pump Heating COP</strong>
            </p>
            <p><strong>Question:</strong> A heat pump has a heating capacity of 12 kW and compressor power of 3.2 kW. Calculate the heating COP.</p>
            <p>For heating mode:</p>
            <p>COP (heating) = Heating capacity / Power input</p>
            <p>COP = Q<sub>condenser</sub> / W<sub>comp</sub></p>
            <p>COP = 12 kW / 3.2 kW = <strong>3.75</strong></p>
            <p>Heat absorbed from outside air:</p>
            <p>Q<sub>evap</sub> = Q<sub>cond</sub> - W<sub>comp</sub> = 12 - 3.2 = 8.8 kW</p>
            <p>Note: Heating COP &gt; Cooling COP because useful output includes compressor work</p>
            <p>Heating COP = Cooling COP + 1 (ideally)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Refrigeration Parameters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Superheat:</strong> 5-10K typical - ensures dry vapour to compressor</li>
              <li><strong>Subcooling:</strong> 5-10K typical - ensures liquid to expansion device</li>
              <li><strong>Suction pressure:</strong> Determines evaporating temperature</li>
              <li><strong>Discharge pressure:</strong> Determines condensing temperature</li>
              <li><strong>Pressure ratio:</strong> 2.5-4 typical for AC - affects efficiency and compressor life</li>
            </ul>
            <p>
              <strong>System Efficiency Factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lower condensing temperature:</strong> Improves COP - keep condensers clean</li>
              <li><strong>Higher evaporating temperature:</strong> Improves COP - correctly size evaporators</li>
              <li><strong>Correct refrigerant charge:</strong> Both under and overcharge reduce efficiency</li>
              <li><strong>Adequate subcooling:</strong> Maximises evaporator capacity</li>
              <li><strong>Clean filters and coils:</strong> Essential for airflow and heat transfer</li>
            </ul>
            <p>
              <strong>Fault Diagnosis from Pressures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Low suction, low discharge:</strong> Low charge or restricted liquid line</li>
              <li><strong>High suction, low discharge:</strong> Compressor valve damage</li>
              <li><strong>High suction, high discharge:</strong> Overcharge or condenser airflow restriction</li>
              <li><strong>Low suction, high discharge:</strong> Evaporator airflow restriction or iced coil</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Mixing refrigerants:</strong> Never mix different refrigerant types in a system</li>
                <li><strong>Venting refrigerant:</strong> Illegal under F-Gas regulations - always recover</li>
                <li><strong>Wrong oil:</strong> Each refrigerant requires specific oil type (POE, PVE, mineral)</li>
                <li><strong>Ignoring flammability:</strong> A2L and A3 refrigerants need specific handling</li>
                <li><strong>Working without certification:</strong> F-Gas certificate required for HFC handling</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Air conditioning systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                DX systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section3_1;
