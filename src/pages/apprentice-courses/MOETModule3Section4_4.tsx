/**
 * MOET · Module 3 · Section 3.4 · Subsection 4 — Energy-Efficient Lighting Technologies
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
 *   · "Industry 4.0 - the integration of physical systems with internet
 *     connectivity and cloud computing: technologies, systems, and
 *     benefits."
 *   · "Equipment life cycle considerations."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. Any
 * Approved Document L efficacy figure this page cites is the original
 * page's own figure — it has not been re-derived or checked against the
 * live Approved Document L text as part of this conversion.
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Energy-Efficient Lighting Technologies - MOET Module 3.4.4';
const DESCRIPTION =
  'Comprehensive guide to energy-efficient lighting technologies for maintenance technicians: LED technology, efficacy, colour temperature, CRI, LED drivers, retrofit vs new-build, payback calculations, smart lighting, IoT integration and lamp disposal under ST1426.';

const quickCheckQuestions = [
  {
    id: 'led-efficacy',
    question: 'What is luminous efficacy and how is it measured?',
    options: [
      'The ratio of luminous flux (lumens) to power consumed (watts), measured in lm/W',
      'The total light output of a lamp, measured in lumens',
      'The colour accuracy of a lamp, measured on a 0-100 scale',
      'The operating life of a lamp, measured in hours',
    ],
    correctIndex: 0,
    explanation:
      'Luminous efficacy is the ratio of luminous flux (measured in lumens) to the electrical power consumed (measured in watts), expressed as lm/W. It is the primary measure of how efficiently a light source converts electrical energy into visible light. Modern LED lamps achieve efficacies of 100-200 lm/W, compared with approximately 15 lm/W for incandescent lamps.',
  },
  {
    id: 'cct',
    question: 'A colour temperature of 4000 K would be described as:',
    options: [
      'Ultra-warm (amber)',
      'Cool white (neutral)',
      'Warm white (yellowish)',
      'Daylight (bluish-white)',
    ],
    correctIndex: 1,
    explanation:
      '4000 K is classified as cool white or neutral white. Colour temperature is measured in Kelvin (K) and describes the appearance of the light: 2700-3000 K is warm white (yellowish, similar to incandescent), 4000 K is cool white (neutral, commonly used in offices), and 5000-6500 K is daylight (bluish-white, used in task and industrial areas).',
  },
  {
    id: 'cri',
    question: 'What does a CRI (Colour Rendering Index) of 90 indicate?',
    options: [
      'The lamp has a colour temperature of 9000 K (very cool white)',
      'The lamp consumes 90 watts at full output',
      'The lamp will retain 90% of its light output at end of life',
      'The lamp renders colours very accurately compared to a reference light source',
    ],
    correctIndex: 3,
    explanation:
      'A CRI of 90 indicates excellent colour rendering — objects illuminated by this lamp will appear very close to their true colours as seen under a reference light source (natural daylight or incandescent lamp, depending on the colour temperature). CRI ranges from 0 to 100, with 80+ considered good for general use and 90+ considered excellent for colour-critical applications.',
  },
  {
    id: 'mercury-disposal',
    question: 'Why must fluorescent lamps be disposed of as hazardous waste?',
    options: [
      'They contain a small lithium battery that can catch fire',
      'The glass tube is pressurised and can explode in a skip',
      'They contain mercury vapour which is toxic',
      'They emit ultraviolet light even when switched off',
    ],
    correctIndex: 2,
    explanation:
      'Fluorescent lamps (tubes and CFLs) contain mercury vapour, which is a toxic heavy metal. When a fluorescent lamp breaks, mercury vapour is released. Under the WEEE Regulations and Hazardous Waste Regulations, fluorescent lamps must be collected separately and recycled through specialist contractors who can safely recover the mercury. They must never be placed in general waste.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Compared to a 100 W incandescent lamp, an LED lamp producing the same luminous flux (approximately 1,500 lumens) typically consumes:',
    options: ['80-90 W', '10-15 W', '40-60 W', '1-2 W'],
    correctAnswer: 1,
    explanation:
      'An LED lamp producing approximately 1,500 lumens (equivalent to a 100 W incandescent) typically consumes only 10-15 W, representing an energy saving of 85-90%. This dramatic improvement in efficacy is the primary driver for the widespread adoption of LED technology in both new installations and retrofit applications.',
  },
  {
    id: 2,
    question: 'What is the typical rated life of a quality commercial LED luminaire?',
    options: ['500,000 hours', '5,000 hours', '50,000-100,000 hours', '10,000-15,000 hours'],
    correctAnswer: 2,
    explanation:
      'Quality commercial LED luminaires typically have a rated life of 50,000-100,000 hours (L70), meaning the LED will produce at least 70% of its initial light output at the rated hour point. At 12 hours per day operation, 50,000 hours equates to approximately 11 years. This significantly exceeds the life of fluorescent (15,000-20,000 hours) and incandescent (1,000-2,000 hours) lamps.',
  },
  {
    id: 3,
    question: 'An LED driver performs which function?',
    options: [
      'Steps the 230 V mains down to 12 V AC, which the LED chip uses directly without rectification',
      'Generates the high-voltage starting pulse needed to strike the arc in the LED chip',
      'Provides a phosphor coating that converts the blue LED output into white light',
      'Converts the mains AC supply to the regulated DC current required by the LED',
    ],
    correctAnswer: 3,
    explanation:
      'An LED driver converts the mains AC supply (230 V, 50 Hz) to the regulated DC current required by the LED module. LEDs are current-driven devices — they require a constant current (typically 350 mA, 500 mA or 700 mA) at a specific voltage. The driver also provides power factor correction, surge protection and, in dimmable versions, the interface for dimming control (DALI, 1-10 V, etc.).',
  },
  {
    id: 4,
    question:
      'When retrofitting LED lamps into existing fluorescent luminaires, what must be considered regarding the existing control gear?',
    options: [
      'The existing ballast must be bypassed or the LED tube must be compatible with the existing ballast type',
      'The existing ballast must always be left in circuit, as every LED tube relies on it to limit current',
      'A larger starter must be fitted to provide the higher striking voltage that LED tubes require',
      'The supply must be uprated to a higher voltage, because LED tubes draw more current than fluorescent',
    ],
    correctAnswer: 0,
    explanation:
      "LED retrofit tubes are available in several types: those that work with the existing magnetic ballast (with starter replacement), those that work with existing electronic ballasts, and those that require the ballast to be bypassed (direct mains connection). Using the wrong type can cause flickering, reduced lamp life, overheating or failure. Always check compatibility and follow the manufacturer's instructions.",
  },
  {
    id: 5,
    question: "The 'L70' rating of an LED indicates:",
    options: [
      'The point at which 70% of the LED chips in a batch will have failed completely',
      'The point at which the LED output has depreciated to 70% of its initial lumens',
      'That the luminaire operates at 70% of its rated power to extend its life',
      'That the LED achieves a colour rendering index (CRI) of 70 throughout its life',
    ],
    correctAnswer: 1,
    explanation:
      "L70 is the industry standard measure of LED lumen depreciation. It indicates the number of hours at which the LED's light output has fallen to 70% of its initial value. For example, L70 = 50,000 hours means the LED will still produce 70% of its original lumens after 50,000 hours of operation. This gradual depreciation (rather than sudden failure) is a key characteristic of LED technology.",
  },
  {
    id: 6,
    question:
      'Which lighting control strategy typically provides the greatest energy saving in a daylit office?',
    options: [
      'A single manual switch controlling all luminaires together',
      'Time-clock switching that turns all lights on at a fixed start time',
      'Daylight-linked dimming with occupancy sensing',
      'Manual dimming adjusted by occupants when they feel it is needed',
    ],
    correctAnswer: 2,
    explanation:
      'Daylight-linked dimming combined with occupancy sensing provides the greatest energy savings — typically 50-70% compared to manually switched constant-output lighting. The daylight sensor reduces artificial light output as natural daylight increases, while the occupancy sensor switches off or dims lights in unoccupied areas. Together, they ensure lighting energy is used only when and where it is needed.',
  },
  {
    id: 7,
    question: 'A simple payback calculation for an LED retrofit project divides:',
    options: [
      'The total energy saving by the installation cost',
      'The wattage reduction by the electricity tariff',
      'The lamp life by the number of lamps',
      'The total installation cost by the annual energy cost saving',
    ],
    correctAnswer: 3,
    explanation:
      'Simple payback period = Total installation cost / Annual energy cost saving. For example, if an LED retrofit costs £10,000 and saves £4,000 per year in energy costs, the simple payback period is 2.5 years. More sophisticated calculations also consider maintenance cost savings (fewer lamp replacements), carbon reduction, and the time value of money (discounted payback or NPV).',
  },
  {
    id: 8,
    question:
      'Smart lighting systems using IoT (Internet of Things) can provide which additional benefit beyond energy saving?',
    options: [
      'Space utilisation data, occupancy analytics and environmental monitoring',
      'A doubling of the luminaire efficacy, raising it from around 100 lm/W to over 200 lm/W',
      'Elimination of the LED driver, allowing the luminaire to run directly on mains AC',
      'Conversion of the luminaire to a mercury-free fluorescent source for easier disposal',
    ],
    correctAnswer: 0,
    explanation:
      'IoT-enabled smart lighting systems incorporate sensors that collect data on occupancy patterns, space utilisation, temperature, humidity and air quality. This data can be used for facilities management, workspace planning, HVAC optimisation and compliance monitoring. The luminaire becomes a platform for building intelligence, not just a light source. Maintenance teams can receive real-time fault notifications.',
  },
  {
    id: 9,
    question:
      'What is the primary advantage of LED technology for maintenance compared to fluorescent?',
    options: [
      'LEDs require their starter and ballast to be replaced annually to keep light output stable',
      'LEDs have significantly longer life, reducing lamp replacement frequency and maintenance costs',
      'LEDs must be re-gassed periodically, but this can be done in place without removing the lamp',
      'LEDs need their phosphor coating renewed every few years to maintain colour accuracy',
    ],
    correctAnswer: 1,
    explanation:
      'The significantly longer life of LEDs (50,000-100,000 hours vs 15,000-20,000 hours for fluorescent) dramatically reduces the frequency of lamp replacement, which is one of the largest ongoing maintenance costs in building lighting. In high-ceiling or difficult-access areas, the reduced replacement frequency also reduces the need for access equipment, working at height, and associated safety risks.',
  },
  {
    id: 10,
    question:
      'Under the WEEE Regulations, which of the following lamps must be recycled through a specialist waste stream?',
    options: [
      'Incandescent lamps only, because the tungsten filament is a controlled hazardous metal',
      'Halogen capsules only, because the quartz envelope is pressurised and must be vented safely',
      'Fluorescent tubes and compact fluorescent lamps (due to mercury content)',
      'LED panels only, because the aluminium heat sink cannot go into general waste',
    ],
    correctAnswer: 2,
    explanation:
      'Fluorescent tubes and compact fluorescent lamps (CFLs) contain mercury and must be recycled through specialist WEEE-compliant contractors. LED lamps also contain electronic components and should be recycled through WEEE routes, but they do not contain mercury. Incandescent and halogen lamps do not contain hazardous substances and can be disposed of in general waste, though recycling is preferred.',
  },
  {
    id: 11,
    question: 'Tunable white LED technology allows:',
    options: [
      'The luminous efficacy to be raised on demand, switching from 100 lm/W to 200 lm/W',
      'The colour rendering index (CRI) to be increased from 80 to 98 by the user at the switch',
      'The luminaire to run from a DC supply only, so no driver is needed for the LED array',
      'The colour temperature (CCT) to be adjusted, for example from warm white to cool white',
    ],
    correctAnswer: 3,
    explanation:
      'Tunable white LED technology allows the colour temperature (CCT) to be adjusted across a range, typically from warm white (2700 K) to cool white (6500 K). This is achieved by mixing the output of warm and cool LED arrays. Tunable white systems are used in healthcare, education and workplaces to support circadian rhythm (human-centric lighting) and to adapt the lighting to different tasks and times of day.',
  },
  {
    id: 12,
    question:
      'When specifying LED luminaires for a retrofit project, which parameter should be matched to the existing installation to maintain visual consistency?',
    options: [
      'The colour temperature (CCT) and colour rendering index (CRI)',
      'The wattage of the old lamps, so the new LEDs draw exactly the same power',
      'The L70 rated life, so all luminaires reach end of life at the same time',
      'The driver output current, so every luminaire runs at the same milliamp rating',
    ],
    correctAnswer: 0,
    explanation:
      'When retrofitting, the colour temperature (CCT) and CRI of the replacement LEDs should be matched to the existing installation to maintain visual consistency. Mismatched CCT creates an obviously different light appearance. Wattage is not the correct parameter to match — you should match the lumen output (lumens) not the power consumption (watts), as LEDs produce far more lumens per watt than the lamps they replace.',
  },
];

const faqs = [
  {
    question: 'Are LED lamps always a suitable replacement for fluorescent?',
    answer:
      'In most cases, yes — but compatibility must be checked. LED retrofit tubes must be compatible with the existing control gear (ballast) type. Some LED tubes work with magnetic ballasts, some with electronic ballasts, and some require the ballast to be bypassed entirely. Using the wrong type can cause flickering, overheating, or premature failure. For older luminaires, it is often more cost-effective and safer to replace the entire luminaire with a purpose-built LED unit rather than retrofitting LED tubes.',
  },
  {
    question: 'What is human-centric lighting?',
    answer:
      'Human-centric lighting (HCL) uses tunable white LED technology to adjust the colour temperature and intensity of artificial light throughout the day to support the human circadian rhythm. Cool, bright light (5000-6500 K) in the morning promotes alertness, while warm, dimmer light (2700-3000 K) in the evening supports relaxation and sleep preparation. HCL is increasingly specified in healthcare facilities, schools and offices to improve occupant wellbeing, productivity and sleep quality.',
  },
  {
    question: 'How do I calculate the energy saving from an LED retrofit?',
    answer:
      'Annual energy saving (kWh) = (Old wattage - New wattage) x Number of luminaires x Annual operating hours / 1000. Annual cost saving = kWh saving x Electricity unit rate (£/kWh). For example: replacing 100 x 58 W fluorescent fittings with 100 x 25 W LED panels, operating 2,500 hours/year: Saving = (58-25) x 100 x 2500 / 1000 = 8,250 kWh/year. At £0.30/kWh = £2,475/year. Include control gear losses (add approx. 15% to fluorescent wattage) for a more accurate calculation.',
  },
  {
    question: 'What is the difference between a constant-current and constant-voltage LED driver?',
    answer:
      'A constant-current driver maintains a fixed output current (e.g., 350 mA, 700 mA) regardless of the connected LED load — this is the most common type for commercial LED luminaires. A constant-voltage driver maintains a fixed output voltage (typically 12 V or 24 V DC) and is used for LED strip lighting and signage where multiple LEDs are connected in parallel. Using the wrong driver type will cause incorrect operation, flickering or damage to the LEDs.',
  },
  {
    question: 'Do LEDs generate heat?',
    answer:
      'Yes — LEDs generate heat, but primarily through conduction at the junction (not radiation like incandescent lamps). Effective heat management (heat sinking) is critical for LED performance and longevity. Excessive junction temperature reduces light output, shifts colour, and shortens LED life. This is why LED luminaires must not be covered or installed in enclosed spaces without adequate ventilation, and why thermal management is a key consideration in luminaire design.',
  },
];

const MOETModule3Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.4 · Subsection 4"
        title="Energy-Efficient Lighting Technologies"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            LED technology, efficacy, colour metrics, smart controls and disposal.
          </p>

          <TLDR
            points={[
              'LED efficacy: 100-200 lm/W vs 15 lm/W incandescent.',
              'LED life: 50,000-100,000 hours (L70) — up to 10x fluorescent.',
              'CCT: 2700 K warm, 4000 K cool, 6500 K daylight.',
              'Disposal: Fluorescent = hazardous waste (mercury); LED = WEEE.',
              'Building Regs Part L: Minimum lighting efficacy standards.',
              'WEEE Regulations: Lamp disposal and recycling requirements.',
              'EU Ecodesign: Phase-out of inefficient lighting products.',
              'ST1426: Maintain energy-efficient systems, record data.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain LED technology principles including efficacy, CCT and CRI',
              'Compare LED performance with fluorescent and incandescent technologies',
              'Describe LED driver types and dimming compatibility',
              'Evaluate retrofit vs new-build LED options for different applications',
              'Calculate simple payback for LED lighting projects',
              'Explain smart lighting controls, IoT integration and lamp disposal requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>LED technology and performance metrics</ContentEyebrow>

          <ConceptBlock title="How an LED produces white light">
            <p>
              Light Emitting Diodes (LEDs) have revolutionised the lighting industry, offering
              dramatic improvements in energy efficiency, longevity and controllability compared to
              traditional light sources. For maintenance technicians, understanding LED technology
              is essential as the majority of new lighting installations and retrofit projects now
              specify LED luminaires.
            </p>
            <p>
              An LED is a semiconductor device that emits light when current flows through it. White
              light is typically produced by coating a blue LED chip with a yellow phosphor layer,
              which converts some of the blue light to yellow. The combination of blue and yellow
              creates the perception of white light. The composition of the phosphor determines the
              colour temperature and colour rendering properties of the LED.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Light source comparison">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Technology</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Efficacy (lm/W)</th>
                    <th className="border border-white/10 px-3 py-2 text-white">
                      Rated life (hrs)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-white">CRI</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Incandescent</td>
                    <td className="border border-white/10 px-3 py-2">10-15</td>
                    <td className="border border-white/10 px-3 py-2">1,000-2,000</td>
                    <td className="border border-white/10 px-3 py-2">100</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Halogen</td>
                    <td className="border border-white/10 px-3 py-2">15-25</td>
                    <td className="border border-white/10 px-3 py-2">2,000-4,000</td>
                    <td className="border border-white/10 px-3 py-2">100</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">CFL</td>
                    <td className="border border-white/10 px-3 py-2">50-70</td>
                    <td className="border border-white/10 px-3 py-2">6,000-15,000</td>
                    <td className="border border-white/10 px-3 py-2">80-90</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">T8 fluorescent</td>
                    <td className="border border-white/10 px-3 py-2">80-100</td>
                    <td className="border border-white/10 px-3 py-2">15,000-20,000</td>
                    <td className="border border-white/10 px-3 py-2">80-90</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">LED (current)</td>
                    <td className="border border-white/10 px-3 py-2">100-200</td>
                    <td className="border border-white/10 px-3 py-2">50,000-100,000</td>
                    <td className="border border-white/10 px-3 py-2">80-98</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Key performance metrics"
            onSite="When specifying LEDs, always compare lumens (light output) not watts (power consumption). A 10 W LED can produce the same light as a 60 W incandescent lamp. The lumen output determines the lighting level; the wattage determines the energy cost."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Luminous efficacy (lm/W):</strong> Light output per watt consumed — the
                primary efficiency measure
              </li>
              <li>
                <strong>Colour temperature (CCT):</strong> Measured in Kelvin (K). Warm white:
                2700-3000 K; Cool white: 4000 K; Daylight: 5000-6500 K
              </li>
              <li>
                <strong>CRI (Colour Rendering Index):</strong> 0-100 scale measuring colour
                accuracy. 80+ for general use, 90+ for colour-critical areas
              </li>
              <li>
                <strong>L70 life:</strong> Hours at which light output has depreciated to 70% of
                initial lumens
              </li>
              <li>
                <strong>Power factor:</strong> A measure of how efficiently the driver draws current
                from the supply. Should be &gt;0.9 for commercial luminaires
              </li>
              <li>
                <strong>UGR (Unified Glare Rating):</strong> Measure of discomfort glare. Must not
                exceed 19 for offices (CIBSE SLL)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>LED drivers and retrofit considerations</ContentEyebrow>

          <ConceptBlock title="The most critical component for LED reliability">
            <p>
              Every LED luminaire requires a driver — the electronic component that converts the
              mains AC supply to the regulated DC current required by the LED module. The driver is
              the most critical component for LED reliability and performance, and is often the
              first component to fail in an LED luminaire. Understanding driver types, dimming
              compatibility and retrofit options is essential for maintenance technicians.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="LED driver types"
            onSite="LED driver failure is the most common cause of LED luminaire failure. Symptoms include flickering, dimming, colour shift, or complete failure. Many drivers are replaceable — check if the driver is a standard component before condemning the entire luminaire."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Constant-current driver:</strong> Maintains a fixed output current (e.g.,
                350 mA, 500 mA, 700 mA). Output voltage varies with the connected LED load. Most
                common type for commercial luminaires
              </li>
              <li>
                <strong>Constant-voltage driver:</strong> Maintains a fixed output voltage
                (typically 12 V or 24 V DC). Current varies with the connected load. Used for LED
                strip, signage and display lighting
              </li>
              <li>
                <strong>Dimmable drivers:</strong> Available with DALI, 1-10 V, phase-cut
                (leading/trailing edge), or wireless (Bluetooth/Zigbee) dimming interfaces
              </li>
              <li>
                <strong>Emergency drivers:</strong> Combined LED driver and emergency battery pack
                in a single unit. Provides maintained or non-maintained emergency lighting function
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Retrofit vs new-build">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Retrofit LED tube:</strong> LED tube designed to fit existing fluorescent
                luminaire. May require ballast bypass or be compatible with existing ballast. Lowest
                upfront cost but potential compatibility issues
              </li>
              <li>
                <strong>Retrofit LED panel:</strong> LED panel designed to fit existing 600x600 mm
                ceiling grid, replacing the complete fluorescent luminaire. Better performance and
                warranty than tube retrofit
              </li>
              <li>
                <strong>New-build LED luminaire:</strong> Purpose-designed LED luminaire with
                integrated driver and optics. Best performance, longest warranty, but highest
                upfront cost
              </li>
              <li>
                <strong>Conversion kit:</strong> LED module and driver kit that can be fitted inside
                an existing luminaire body, replacing the lamp and control gear. Reuses the existing
                housing
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Bypassing the ballast without labelling the change"
            whatHappens={
              <>
                When retrofitting LED tubes into existing fluorescent luminaires, the existing
                wiring may need to be modified (ballast bypass). This modification changes the
                luminaire from its original design, which may affect the CE/UKCA marking and the
                manufacturer&apos;s warranty. The person carrying out the modification takes
                responsibility for the safety of the modified luminaire.
              </>
            }
            doInstead={
              <>
                Always follow the LED tube manufacturer&apos;s installation instructions precisely
                and label the modified luminaire accordingly.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Smart lighting and IoT integration</ContentEyebrow>

          <ConceptBlock
            title="From light source to data-gathering platform"
            onSite="Smart lighting systems require maintenance technicians to develop new skills in networking, wireless protocols and software configuration, in addition to traditional electrical skills. The convergence of IT and OT (operational technology) in building services is a significant trend in the maintenance sector."
          >
            <p>
              Smart lighting systems extend beyond simple energy saving to provide building
              intelligence, occupant comfort and facilities management data. The integration of LED
              luminaires with IoT (Internet of Things) technology, wireless sensors and cloud-based
              analytics is transforming the role of the luminaire from a simple light source to a
              data-gathering platform.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Smart lighting features">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wireless control:</strong> Bluetooth Mesh, Zigbee or Thread protocols for
                wireless commissioning and control without dedicated control wiring
              </li>
              <li>
                <strong>Occupancy analytics:</strong> Built-in sensors track space utilisation
                patterns — desk occupancy, meeting room usage, traffic flow
              </li>
              <li>
                <strong>Daylight harvesting:</strong> Integrated photocells automatically dim
                luminaires in response to available daylight
              </li>
              <li>
                <strong>Tunable white:</strong> Adjustable CCT (2700-6500 K) for human-centric
                lighting programmes that follow the circadian rhythm
              </li>
              <li>
                <strong>Asset tracking:</strong> Bluetooth beacons in luminaires enable indoor
                positioning and asset tracking
              </li>
              <li>
                <strong>Predictive maintenance:</strong> Real-time monitoring of driver temperature,
                operating hours and light output to predict failure before it occurs
              </li>
              <li>
                <strong>Cloud dashboards:</strong> Centralised monitoring of energy consumption,
                fault status and maintenance scheduling
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Payback calculation example">
            <p>
              Replacing 200 x 4ft T8 fluorescent fittings (58 W + 15% ballast loss = 67 W each) with
              200 x LED panels (30 W each), operating 2,750 hours/year:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Old consumption:</strong> 200 x 67 W x 2,750 hrs = 36,850 kWh/year
              </li>
              <li>
                <strong>New consumption:</strong> 200 x 30 W x 2,750 hrs = 16,500 kWh/year
              </li>
              <li>
                <strong>Annual saving:</strong> 20,350 kWh x £0.30/kWh = £6,105/year
              </li>
              <li>
                <strong>Installation cost:</strong> 200 x £85 (supply and fit) = £17,000
              </li>
              <li>
                <strong>Simple payback:</strong> £17,000 / £6,105 = 2.8 years
              </li>
              <li>
                <strong>Carbon saving:</strong> 20,350 kWh x 0.207 kg CO₂/kWh = 4,212 kg CO₂/year
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Lamp disposal and environmental considerations</ContentEyebrow>

          <ConceptBlock title="Different lamp types, different disposal routes">
            <p>
              The disposal of lighting products is governed by the Waste Electrical and Electronic
              Equipment (WEEE) Regulations and the Hazardous Waste Regulations. Different lamp types
              have different disposal requirements, and maintenance technicians must understand
              which products require specialist handling and recycling.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Lamp disposal categories">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mercury-containing lamps (hazardous waste):</strong> Fluorescent tubes,
                CFLs, metal halide, sodium lamps. Must be collected in approved containers, stored
                safely, and disposed of through a WEEE-compliant contractor. Breakage releases
                mercury vapour — handle with care
              </li>
              <li>
                <strong>LED lamps (WEEE waste):</strong> Contain electronic components (driver,
                capacitors, semiconductors). Should be recycled through WEEE routes. Do not contain
                mercury but may contain small quantities of other materials requiring controlled
                disposal
              </li>
              <li>
                <strong>Incandescent and halogen (general waste):</strong> Do not contain hazardous
                substances and can be disposed of in general waste. However, recycling is
                environmentally preferred where facilities exist
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="If a fluorescent lamp breaks">
            <p>
              Ventilate the area immediately (open windows, turn off HVAC to prevent mercury vapour
              being distributed through the building); do not use a vacuum cleaner (this disperses
              mercury vapour); use damp paper towels or sticky tape to pick up glass fragments and
              phosphor powder; place all debris in a sealed plastic bag; dispose of through the
              hazardous waste route. Wear gloves during clean-up. If a large number of lamps break,
              evacuate the area and seek specialist advice.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Environmental benefits of LED"
            onSite="The maintenance technician standard requires awareness of environmental legislation affecting electrical maintenance, including waste disposal requirements. You must be able to correctly identify lamp types and ensure they are disposed of through the appropriate waste stream."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Energy reduction:</strong> 50-90% less energy than the technology replaced —
                direct carbon emission reduction
              </li>
              <li>
                <strong>No mercury:</strong> LEDs contain no mercury, eliminating the hazardous
                waste issue associated with fluorescent lamps
              </li>
              <li>
                <strong>Longer life:</strong> Fewer lamp replacements means less manufacturing,
                transport and disposal
              </li>
              <li>
                <strong>Reduced maintenance:</strong> Less frequent access equipment use, fewer
                vehicle trips, reduced working at height risk
              </li>
              <li>
                <strong>Better controllability:</strong> Instant dimming, no warm-up time, full
                compatibility with daylight and occupancy controls
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'LED efficacy 100-200 lm/W vs approximately 15 lm/W incandescent, 80-100 lm/W T8 fluorescent.',
              'LED rated life 50,000-100,000 hours (L70 — output depreciated to 70% of initial lumens), well beyond fluorescent (15,000-20,000 hrs).',
              'CCT: 2700-3000 K warm white, 4000 K cool white, 5000-6500 K daylight. CRI: 80+ general use, 90+ colour-critical.',
              'Every LED needs a driver — constant-current for most commercial luminaires, constant-voltage for strip/signage — and it is the most common point of failure.',
              'Retrofit into an existing fluorescent luminaire needs the correct LED tube type for the ballast, or a ballast bypass, followed properly and labelled.',
              'Mercury-containing lamps (fluorescent, CFL, metal halide, sodium) are hazardous waste; LED lamps go through WEEE; incandescent/halogen may go to general waste.',
              'Smart lighting (wireless control, occupancy analytics, daylight harvesting, tunable white, predictive maintenance) turns the luminaire into a data platform, not just a light source.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section4-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Socket Outlet and Small Power Circuits
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section5-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Uninterruptible Power Supply (UPS)
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section4_4;
