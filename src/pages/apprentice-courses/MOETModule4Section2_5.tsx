/**
 * MOET · Module 4 · Section 4.2 · Subsection 5 — Oil and Fluid Analysis
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
 *   · "Maintenance strategies: planned preventative maintenance (PPM),
 *     condition-based maintenance (CBM), scheduled maintenance, total
 *     productive maintenance (TPM), breakdown and run to failure
 *     maintenance."
 *   · "Electrical. Common electrical plant, equipment, and systems failure
 *     modes."
 *   · "Record information."
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Oil and Fluid Analysis - MOET Module 4.2.5';
const DESCRIPTION =
  'Oil and fluid analysis techniques for condition monitoring: sampling procedures, laboratory tests, wear particle analysis, contamination detection, transformer oil testing and lubricant condition assessment for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'oil-sampling',
    question:
      'When taking an oil sample from a gearbox for analysis, the most important consideration is:',
    options: [
      'Filling the bottle from the drain plug after the equipment has cooled',
      'Filtering the sample to remove visible debris before sending it to the lab',
      'Topping the bottle right up so there is no air space above the oil',
      'Taking the sample from a consistent, representative location while the equipment is at operating temperature',
    ],
    correctIndex: 3,
    explanation:
      'Consistent sampling location and technique are critical for meaningful trending. The sample must be representative of the oil circulating in the system — taken from a mid-stream location, not from the drain plug or surface. The equipment should be at normal operating temperature to ensure contaminants are suspended. Filtering the sample would remove the very particles you are trying to analyse.',
  },
  {
    id: 'wear-metals',
    question:
      'An oil analysis report shows elevated levels of iron and chromium particles in a gearbox oil sample. This most likely indicates:',
    options: [
      'Water contamination from a failed seal allowing moisture ingress',
      'Wear of steel gears and bearings — the iron and chromium come from the gear and bearing materials',
      'Bronze bush wear, which releases copper and tin into the oil',
      'Oxidation of the base oil raising the total acid number',
    ],
    correctIndex: 1,
    explanation:
      'Different metals in wear debris indicate which components are wearing. Iron typically comes from gears, shafts and rolling element bearings. Chromium often accompanies iron from hardened steel components. Copper and tin indicate bronze bush or cage wear. Aluminium may come from bearing shells. The pattern of metals helps identify which specific component is deteriorating.',
  },
  {
    id: 'transformer-oil-dga',
    question: 'Dissolved gas analysis (DGA) of transformer oil can detect:',
    options: [
      'Internal faults such as overheating, arcing and partial discharge by analysing gases dissolved in the oil',
      'The viscosity grade of the oil and whether it is still fit for service',
      'The particle count and ISO cleanliness code of the oil',
      'The total acid number, indicating how far the oil has oxidised',
    ],
    correctIndex: 0,
    explanation:
      'DGA is the most important diagnostic test for oil-filled transformers. Internal faults generate specific gases: hydrogen indicates partial discharge, acetylene indicates arcing, ethylene indicates severe overheating, and carbon monoxide/dioxide indicate cellulose (paper insulation) degradation. The pattern and quantity of gases allow diagnosis of the fault type and severity.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Oil analysis is classified as which type of maintenance approach?',
    options: [
      'Reactive (breakdown) maintenance',
      'Condition-based predictive maintenance',
      'Fixed-interval planned preventive maintenance',
      'Run-to-failure maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'Oil analysis is a condition-based predictive maintenance technique. It detects the actual condition of the oil and the equipment it lubricates, enabling maintenance to be scheduled based on measured deterioration rather than fixed time intervals.',
  },
  {
    id: 2,
    question: 'Which test measures the acidity of lubricating oil and indicates oxidation?',
    options: [
      'Flash point test',
      'Viscosity test',
      'Total acid number (TAN)',
      'Specific gravity test',
    ],
    correctAnswer: 2,
    explanation:
      'Total acid number (TAN) measures the concentration of acidic compounds in the oil, primarily formed through oxidation. Rising TAN indicates the oil is degrading and acidic by-products may corrode metal surfaces. A significant increase in TAN from the baseline indicates the oil needs changing or the cause of accelerated oxidation needs investigation.',
  },
  {
    id: 3,
    question: 'Water contamination in lubricating oil is harmful because:',
    options: [
      'It improves the oil film strength and reduces friction',
      'It raises the dielectric strength, masking insulation faults',
      'It increases the viscosity, improving load-carrying capacity',
      'It promotes corrosion, reduces film strength, accelerates oxidation and causes hydrogen embrittlement of bearings',
    ],
    correctAnswer: 3,
    explanation:
      'Even small amounts of water in oil are extremely damaging. Water promotes rust and corrosion of metal surfaces, reduces the oil film strength (leading to metal-to-metal contact), accelerates chemical oxidation of the oil, and can cause hydrogen embrittlement of bearing steels. For rolling element bearings, as little as 0.1% water can halve the bearing life.',
  },
  {
    id: 4,
    question: 'Ferrography differs from spectrometric oil analysis because it:',
    options: [
      'Can detect and characterise larger wear particles (above 10 microns) that spectrometry misses',
      'Measures only the total acid number rather than wear metals',
      'Requires no sample and is performed continuously online',
      'Can detect dissolved water but not solid particles',
    ],
    correctAnswer: 0,
    explanation:
      'Spectrometric analysis (ICP/AES) is excellent for detecting dissolved metals and small particles (below approximately 8-10 microns) but misses larger particles. Ferrography separates wear particles magnetically, allowing visual examination of particle size, shape and composition under a microscope. Large, abnormal particles indicate advanced wear — exactly when spectrometry may understate the severity.',
  },
  {
    id: 5,
    question: 'For transformer oil, the breakdown voltage test (BDV) measures:',
    options: [
      'The viscosity of the oil at operating temperature',
      'The dielectric strength — the voltage at which the oil breaks down and conducts electricity',
      'The concentration of dissolved gases from internal faults',
      'The total acid number indicating oxidation',
    ],
    correctAnswer: 1,
    explanation:
      "The breakdown voltage test measures the dielectric strength of transformer oil — the voltage at which the oil fails to insulate and an arc forms between the test electrodes. Low BDV indicates contamination with water, particles or dissolved gases that reduce the oil's insulating capability. New transformer oil typically has a BDV above 60 kV; values below 30 kV indicate the oil needs treatment.",
  },
  {
    id: 6,
    question: 'The ISO cleanliness code (e.g., ISO 4406:21/18/15) refers to:',
    options: [
      'The viscosity grade of the oil at three reference temperatures',
      'The dissolved water content expressed in parts per million',
      'The number and size distribution of solid particles per millilitre of oil',
      'The dielectric strength of the oil at three test voltages',
    ],
    correctAnswer: 2,
    explanation:
      'The ISO 4406 cleanliness code quantifies particle contamination using three numbers representing the count of particles larger than 4 microns, 6 microns and 14 microns per millilitre. Lower numbers indicate cleaner oil. Target cleanliness levels depend on the equipment — hydraulic servo valves need very clean oil (e.g., 16/14/11), while gearboxes may tolerate higher levels (e.g., 20/18/15).',
  },
  {
    id: 7,
    question:
      'An oil sample from a motor bearing housing shows a milky white appearance. The most likely cause is:',
    options: [
      'High iron content from advanced bearing wear',
      'Air entrainment that will clear once the oil settles',
      'Normal darkening of the oil through thermal ageing',
      'Water contamination — water emulsified in the oil gives a milky appearance',
    ],
    correctAnswer: 3,
    explanation:
      'A milky or cloudy appearance is a classic visual indicator of water contamination. The water has emulsified with the oil, creating a suspension that appears milky. This level of contamination (typically above 0.1% water) is severely damaging to bearings and gears. The source of water ingress must be identified and eliminated, and the oil changed.',
  },
  {
    id: 8,
    question:
      'In dissolved gas analysis of transformer oil, the presence of acetylene (C2H2) typically indicates:',
    options: [
      'High-energy arcing within the transformer',
      'External contamination of the oil',
      'Normal transformer operation',
      'Low-temperature overheating of cellulose insulation',
    ],
    correctAnswer: 0,
    explanation:
      'Acetylene is generated only at very high temperatures (above 700 degrees C), which occur during electrical arcing. Its presence in transformer oil is always significant and indicates an internal arcing fault that requires urgent investigation. Even small amounts of acetylene should be treated seriously, as arcing can lead to catastrophic transformer failure.',
  },
  {
    id: 9,
    question: 'How often should transformer oil samples typically be taken for DGA?',
    options: [
      'Only once, at the time the transformer is commissioned',
      'Annually for critical transformers, with increased frequency if gas levels are rising',
      'Every ten years, in line with the EICR periodic interval',
      'Only after a protection trip has already occurred',
    ],
    correctAnswer: 1,
    explanation:
      'Critical transformers should be sampled at least annually for DGA, with results trended over time. If gas levels show an increasing trend, the sampling frequency should be increased — quarterly or even monthly for rapidly developing faults. Online DGA monitors provide continuous monitoring for the most critical assets.',
  },
  {
    id: 10,
    question: 'Viscosity is the most important physical property of a lubricant because:',
    options: [
      'It sets the dielectric strength of the oil for insulation purposes',
      'It indicates how much water the oil has absorbed',
      'It determines the oil film thickness that separates moving surfaces — too thin and metal contact occurs, too thick and energy is wasted',
      'It measures the acidity produced by oxidation of the base oil',
    ],
    correctAnswer: 2,
    explanation:
      "Viscosity is the measure of a fluid's resistance to flow and is the single most important property of a lubricant. It determines the thickness of the oil film that separates moving metal surfaces. If viscosity is too low, the film breaks down and metal-to-metal contact causes wear. If too high, excessive friction generates heat and wastes energy. Viscosity changes over time indicate oxidation, contamination or thermal degradation.",
  },
  {
    id: 11,
    question: 'Particle counting in oil analysis is used to:',
    options: [
      'Measure the dielectric strength of insulating oil',
      'Identify which dissolved gases are present in transformer oil',
      'Determine the dissolved water content of the oil',
      'Quantify the number and size distribution of solid contaminant particles in the oil',
    ],
    correctAnswer: 3,
    explanation:
      'Particle counting measures the concentration of solid particles in different size ranges. This is reported as an ISO cleanliness code. Trending particle counts reveals whether contamination is increasing (ingression exceeding filtration) or decreasing. A sudden increase may indicate a developing component failure releasing wear debris or a seal failure allowing external contamination.',
  },
  {
    id: 12,
    question:
      'Under ST1426, oil and fluid analysis knowledge supports which maintenance competence?',
    options: [
      'Condition monitoring and predictive maintenance strategies',
      'Initial verification of new electrical installations',
      'Manual handling and lifting operations',
      'Producing risk assessments and method statements',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to understand condition monitoring techniques as part of predictive maintenance strategies. Oil and fluid analysis is one of the key condition monitoring methods alongside vibration analysis, thermal imaging and electrical testing.',
  },
];

const faqs = [
  {
    question: 'Is oil analysis relevant for electrical maintenance technicians?',
    answer:
      'Yes. Electrical maintenance technicians often work with oil-filled transformers, oil-filled switchgear, motor bearings with oil lubrication, hydraulic systems on electrical actuators, and gearboxes coupled to electric motors. Dissolved gas analysis of transformer oil is particularly critical for HV maintenance. Understanding oil analysis helps you interpret reports and make informed maintenance decisions.',
  },
  {
    question: 'How long does it take to get oil analysis results?',
    answer:
      'Standard laboratory analysis typically takes 3-5 working days from receipt of the sample. Urgent or emergency samples can often be processed within 24 hours at additional cost. For critical transformers, online dissolved gas monitors provide continuous real-time analysis without the need for manual sampling.',
  },
  {
    question: 'Can I assess oil condition on site without laboratory analysis?',
    answer:
      "Basic on-site checks include visual inspection (colour, clarity, milkiness), the 'crackle test' for water (heating a small sample on a hot plate — crackling indicates water), and portable particle counters. However, these do not replace laboratory analysis for detailed wear metal identification, dissolved gas analysis or accurate contamination quantification.",
  },
  {
    question: 'What is the most important transformer oil test?',
    answer:
      "Dissolved gas analysis (DGA) is widely regarded as the most important transformer oil test. It can detect developing internal faults — overheating, arcing, partial discharge and cellulose degradation — long before they cause failure or are detectable by other means. It is often called the 'blood test' for transformers.",
  },
  {
    question: 'How should oil samples be stored and transported?',
    answer:
      'Samples must be taken in clean, laboratory-supplied bottles with no headspace (air exposure causes oxidation). They should be labelled immediately with date, equipment identification, operating temperature and oil type. Transport to the laboratory should be as quick as possible — ideally within 24-48 hours. Protect samples from extreme temperatures and direct sunlight during transport.',
  },
];

const MOETModule4Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.2 · Subsection 5"
        title="Oil and Fluid Analysis"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Detecting equipment deterioration through lubricant and insulating oil condition
            monitoring.
          </p>

          <TLDR
            points={[
              'What: Laboratory analysis of oils and fluids to detect wear and contamination.',
              'Tests: Wear metals, viscosity, TAN, water content, particle count.',
              'Transformer: Dissolved gas analysis (DGA) for internal fault detection.',
              'Trending: Regular sampling builds a deterioration profile.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transformers:</strong> DGA detects arcing, overheating and PD.
              </li>
              <li>
                <strong>Gearboxes:</strong> Wear metals reveal gear and bearing condition.
              </li>
              <li>
                <strong>Hydraulics:</strong> Particle count and cleanliness codes.
              </li>
              <li>
                <strong>ST1426:</strong> Condition monitoring knowledge requirement.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principles of oil and fluid analysis for condition monitoring',
              'Describe correct sampling procedures to obtain representative samples',
              'Identify key laboratory tests and what each reveals about equipment condition',
              'Interpret wear metal results to diagnose specific component deterioration',
              'Understand dissolved gas analysis for transformer oil monitoring',
              'Link oil analysis to ST1426 predictive maintenance requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Principles of oil and fluid analysis</ContentEyebrow>

          <ConceptBlock title="Oil carries information about the equipment it serves">
            <p>
              Oil and fluid analysis works on the principle that lubricating oils, hydraulic fluids
              and transformer oils carry information about the condition of both the fluid itself
              and the equipment it serves. As components wear, microscopic metal particles are
              released into the oil. As the oil degrades, its chemical properties change. As
              contaminants enter the system, they can be detected in the oil sample.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What oil analysis reveals">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipment condition:</strong> Wear metals indicate which components are
                wearing and how fast.
              </li>
              <li>
                <strong>Oil condition:</strong> Viscosity, acidity, oxidation and additive depletion
                show whether the oil is still fit for service.
              </li>
              <li>
                <strong>Contamination:</strong> Water, fuel dilution, coolant leaks, external dirt
                and process contaminants.
              </li>
              <li>
                <strong>Internal faults (transformers):</strong> Dissolved gases reveal overheating,
                arcing and insulation degradation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common laboratory tests"
            onSite="A single oil analysis result tells you the current condition. Regular sampling and trending reveals the rate of change — which is far more valuable for maintenance planning."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Test</th>
                    <th className="py-2 pr-4 font-medium text-white">What it measures</th>
                    <th className="py-2 font-medium text-white">Significance</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Spectrometric analysis</td>
                    <td className="py-2 pr-4">Wear metals and contaminants (ppm)</td>
                    <td className="py-2">Identifies which components are wearing</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Viscosity</td>
                    <td className="py-2 pr-4">Oil film thickness capability</td>
                    <td className="py-2">Changes indicate contamination or degradation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Total acid number</td>
                    <td className="py-2 pr-4">Acidity from oxidation</td>
                    <td className="py-2">Rising TAN indicates oil degradation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Water content</td>
                    <td className="py-2 pr-4">Dissolved and free water (ppm)</td>
                    <td className="py-2">Even trace water is highly damaging</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Particle count</td>
                    <td className="py-2 pr-4">Solid contamination (ISO 4406)</td>
                    <td className="py-2">Cleanliness affects component life</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Dissolved gas (DGA)</td>
                    <td className="py-2 pr-4">Gases from internal faults</td>
                    <td className="py-2">Transformer-specific fault diagnosis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Sampling procedures and best practice</ContentEyebrow>

          <ConceptBlock title="The result is only as good as the sample">
            <p>
              The quality of oil analysis results depends entirely on the quality of the sample. A
              poorly taken sample can lead to incorrect diagnoses, unnecessary maintenance or missed
              developing faults. Consistent sampling procedures are essential.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sampling best practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Consistent location:</strong> Always sample from the same point — ideally a
                dedicated sample valve in the return line or mid-stream.
              </li>
              <li>
                <strong>Operating temperature:</strong> Take samples while equipment is at normal
                operating temperature to ensure particles are suspended.
              </li>
              <li>
                <strong>Clean bottles:</strong> Use laboratory-supplied clean sample bottles. Never
                reuse bottles or use workshop containers.
              </li>
              <li>
                <strong>Flush first:</strong> Before taking the sample, flush a small amount of oil
                through the sample valve to clear any stagnant oil.
              </li>
              <li>
                <strong>Label immediately:</strong> Record date, equipment ID, operating hours, oil
                type and any observations.
              </li>
              <li>
                <strong>Minimise contamination:</strong> Keep bottle caps on until the moment of
                sampling. Replace immediately after filling.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common sampling errors">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
              <li>Sampling from the drain plug (collects settled debris — not representative).</li>
              <li>Sampling when equipment is cold (particles have settled).</li>
              <li>Using dirty or contaminated sample bottles.</li>
              <li>Leaving the sample exposed to air (causes oxidation).</li>
              <li>Inconsistent sampling locations between tests (makes trending meaningless).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Wear metal analysis and contamination</ContentEyebrow>

          <ConceptBlock
            title="Each metal traces to a specific component"
            onSite="Absolute values matter less than the trend. A steady iron level of 20 ppm may be normal for a particular gearbox. A sudden increase from 20 to 80 ppm indicates accelerating wear requiring investigation."
          >
            <p>
              Spectrometric wear metal analysis identifies the concentration of metallic elements in
              the oil, measured in parts per million (ppm). Each metal can be traced to specific
              component materials, enabling targeted diagnosis of which part is wearing.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Metal</th>
                    <th className="py-2 font-medium text-white">Typical source</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Iron (Fe)</td>
                    <td className="py-2">Gears, shafts, rolling elements, cylinder liners</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Copper (Cu)</td>
                    <td className="py-2">Bronze bushes, bearing cages, thrust washers</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Chromium (Cr)</td>
                    <td className="py-2">Hardened steel components, piston rings</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Aluminium (Al)</td>
                    <td className="py-2">Bearing shells, pistons, pump housings</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Lead (Pb)</td>
                    <td className="py-2">Plain bearing overlay, solder</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Silicon (Si)</td>
                    <td className="py-2">External dirt ingression, sealant contamination</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Transformer oil analysis and DGA</ContentEyebrow>

          <ConceptBlock
            title="An early warning system for internal faults"
            onSite="Understanding oil and fluid analysis contributes to the condition monitoring and predictive maintenance knowledge required under the maintenance technician standard. For the electrical pathway, transformer oil testing is particularly relevant."
          >
            <p>
              For electrical maintenance technicians, transformer oil analysis is arguably the most
              critical application of fluid analysis. Oil-filled transformers rely on the oil for
              both insulation and cooling. Dissolved gas analysis provides an early warning system
              for internal faults that would otherwise be undetectable until catastrophic failure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key DGA gases and their meaning">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hydrogen (H2):</strong> Partial discharge, low-energy sparking.
              </li>
              <li>
                <strong>Methane (CH4):</strong> Low-temperature oil overheating (below 300 degrees
                C).
              </li>
              <li>
                <strong>Ethane (C2H6):</strong> Low to moderate oil overheating.
              </li>
              <li>
                <strong>Ethylene (C2H4):</strong> Severe oil overheating (above 500 degrees C).
              </li>
              <li>
                <strong>Acetylene (C2H2):</strong> High-energy arcing (above 700 degrees C) — always
                significant.
              </li>
              <li>
                <strong>CO/CO2:</strong> Cellulose (paper) insulation degradation.
              </li>
            </ul>
          </ConceptBlock>

          <div className="grid gap-4 sm:grid-cols-2">
            <ConceptBlock title="Transformer oil tests">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>Breakdown voltage (BDV): dielectric strength.</li>
                <li>Water content: moisture in ppm.</li>
                <li>Acidity: oil degradation indicator.</li>
                <li>Interfacial tension: contamination marker.</li>
              </ul>
            </ConceptBlock>
            <ConceptBlock title="DGA interpretation methods">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>Duval triangle: fault classification.</li>
                <li>Rogers ratios: gas ratio analysis.</li>
                <li>Key gas method: dominant gas identification.</li>
                <li>IEC 60599: international standard guidance.</li>
              </ul>
            </ConceptBlock>
          </div>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Key oil tests: spectrometry (wear metals, ppm), viscosity (film thickness capability), TAN (acidity/oxidation), water content (ppm or %), ISO 4406 (particle cleanliness code).',
              'Transformer DGA: H2 = partial discharge; C2H2 = arcing (always serious); C2H4 = severe overheating; CO/CO2 = cellulose degradation.',
              'Interpretation methods: IEC 60599 and the Duval triangle.',
              'A single result tells you the state; trending tells you the rate of deterioration.',
              'Sample consistently, at operating temperature, in clean laboratory-supplied bottles, and label immediately.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Insulation Resistance Testing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Trend Analysis and Predictive Maintenance
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section2_5;
