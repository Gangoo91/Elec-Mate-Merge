/**
 * MOET · Module 4 · Section 1 · Subsection 4 — Electrical Inspection Routines
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
 *   · "Electrical. Inspect and test electrical aspects of plant. For
 *     example, visual checks, insulation and continuity checks,
 *     thermographic surveys, and voltage levels."
 *   · "Electrical. Conduct functional testing."
 *   · "Record information."
 *
 * ⚠️ ACCURACY CORRECTION (applied at conversion): the original page's
 * thermographic severity table used ΔT bands (<10°C / 10-35°C / 35-75°C /
 * >75°C, all "above similar connections under similar load") that do not
 * match the actual NETA/Infraspection scale, and collapsed two different
 * reference bases (similar component vs ambient) into one column. Replaced
 * with the Infraspection Institute "Standard for Infrared Inspection of
 * Electrical Systems & Rotating Equipment" (2016, §10.1) Priority 1-4 table,
 * which reproduces the NETA Maintenance Testing Specifications and gives
 * separate bands for a similar-component comparison and an over-ambient
 * comparison (Priority 2 exists only on the over-ambient scale). Quiz
 * question 11 embedded the same wrong bands as its correct answer and has
 * been corrected to match; every other data-array entry is untouched.
 * Insulation-resistance minimum values in Section 03 are copied from the
 * original page but could not be independently verified against a BS 7671
 * table reference in this pass.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * ✎ ACCURACY FIX (12 Sep): the insulation-resistance table was cited as
 *   "BS 7671 Table 6.1". Verified against the RAG (BS 7671:2018+A4:2026):
 *   the correct reference is **Table 64** — SELV/PELV 250 V DC min 0.5 MΩ;
 *   circuits up to and including 500 V (except SELV/PELV) 500 V DC min 1.0 MΩ;
 *   above 500 V, 1000 V DC min 1.0 MΩ. Values themselves were correct.
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

const TITLE = 'Electrical Inspection Routines - MOET Module 4.1.4';
const DESCRIPTION =
  'Visual inspection checklists, thermographic surveys, insulation resistance trending, connection tightness, cable condition, switchgear inspection, motor inspection, emergency lighting and fire alarm testing for maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'visual-inspection',
    question: 'What is the primary purpose of a visual inspection during PPM?',
    options: [
      'To measure the exact insulation resistance of every circuit in the installation',
      'To confirm the disconnection time of each protective device under fault conditions',
      'To identify visible signs of deterioration, damage, overheating or unsafe conditions without the need for testing equipment',
      'To record the load current drawn by each item of connected equipment',
    ],
    correctIndex: 2,
    explanation:
      'Visual inspection is the first and most important step in any maintenance routine. It identifies obvious signs of deterioration — discolouration from overheating, cracked insulation, water damage, corrosion, vermin damage, missing covers — that may indicate developing faults or safety hazards. Many serious issues can be detected by a trained eye before they require instruments to confirm.',
  },
  {
    id: 'thermographic-survey',
    question:
      'A thermographic survey of a distribution board reveals a hot spot of 85°C on one connection while surrounding connections are at 40°C. This indicates:',
    options: [
      'A correctly loaded connection operating well within its normal temperature range',
      'A measurement error caused by the wrong emissivity setting on the camera',
      'Normal heating of the busbar that requires no further action or investigation',
      'A high-resistance connection that requires immediate investigation and likely re-torquing or replacement',
    ],
    correctIndex: 3,
    explanation:
      'A temperature differential of 45°C above similar connections under similar load is a serious finding. It indicates a high-resistance joint, likely caused by a loose connection, corroded contact surface or insufficient contact area. This requires urgent attention as it represents a fire risk and will worsen over time.',
  },
  {
    id: 'ir-trending',
    question:
      'When trending insulation resistance readings over time, a steadily decreasing value indicates:',
    options: [
      'Progressive deterioration of the insulation, which may eventually lead to breakdown if not addressed',
      'A steady improvement in the insulation condition that requires no action',
      'A fault in the test instrument that is producing inconsistent readings',
      'Normal seasonal variation that always returns to the original value',
    ],
    correctIndex: 0,
    explanation:
      'A steadily declining insulation resistance trend indicates progressive deterioration from factors such as moisture ingress, contamination, thermal ageing or mechanical damage. While a single reading may be acceptable, the trend reveals that the insulation is degrading and will eventually reach a point where it can no longer safely withstand the operating voltage.',
  },
  {
    id: 'emergency-lighting-test',
    question:
      'Under BS 5266-1, what is the required duration for the annual full-duration discharge test of emergency lighting?',
    options: [
      'The full rated duration of the system (typically 3 hours for most non-maintained systems)',
      'A brief flick test of just a few seconds to confirm each luminaire illuminates',
      'Exactly 30 minutes regardless of the rated duration of the system',
      'A continuous 24-hour discharge to fully exhaust the batteries',
    ],
    correctIndex: 0,
    explanation:
      'BS 5266-1 requires an annual full-rated-duration test where the emergency lighting is operated for its full rated duration (typically 3 hours for non-maintained systems, 1 hour for some high-risk areas). This verifies that batteries can sustain the required illumination for the full design period. The monthly test is a short functional test only.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'During a visual inspection of a distribution board, you notice a brown discolouration on the casing above one MCB. This most likely indicates:',
    options: [
      'Normal ageing of the plastic casing that needs no investigation',
      'Overheating at the MCB connection or within the MCB itself',
      'Moisture ingress that has stained the casing from the outside',
      'A manufacturing mark applied to the casing during production',
    ],
    correctAnswer: 1,
    explanation:
      'Brown discolouration on plastic casing above an MCB is a classic sign of localised overheating. The heat source is typically a loose connection, an overloaded circuit, or a faulty MCB with high internal resistance. This requires investigation — check the connection torque, measure the load current, and consider thermographic imaging to quantify the temperature.',
  },
  {
    id: 2,
    question:
      'The recommended test voltage for insulation resistance testing of a 400 V three-phase motor is:',
    options: ['1,000 V DC', '250 V DC', '500 V DC', '5,000 V DC'],
    correctAnswer: 2,
    explanation:
      'For equipment rated up to 500 V (which includes standard 400 V motors), the standard test voltage for insulation resistance testing is 500 V DC. The minimum acceptable insulation resistance value is 1 MΩ, though new or refurbished motors should achieve significantly higher values. Higher test voltages (1,000 V or 5,000 V) are used for HV equipment.',
  },
  {
    id: 3,
    question:
      'The minimum acceptable insulation resistance for a 400 V installation circuit tested at 500 V DC is:',
    options: ['2 MΩ', '0.5 MΩ', '10 MΩ', '1 MΩ'],
    correctAnswer: 3,
    explanation:
      'BS 7671 Table 64 specifies a minimum insulation resistance of 1 MΩ for circuits with nominal voltages above 50 V up to 500 V, tested at 500 V DC. However, in practice, values below 2 MΩ should be investigated, and a reading of exactly 1 MΩ on a large installation may indicate a specific fault on one circuit that is being masked by parallel paths.',
  },
  {
    id: 4,
    question: 'When carrying out a thermographic survey of electrical switchgear, you should:',
    options: [
      'Scan through infrared-transparent viewing windows where fitted, or scan with covers removed under a safe system of work with appropriate PPE',
      'Always isolate and de-energise the switchgear first, then open all covers and scan the cold equipment for residual heat',
      'Scan only the painted front panels with the covers in place, as the heat from any fault will conduct straight through to the surface',
      'Carry out the survey under no-load conditions so that the connections are at their hottest and easiest to detect',
    ],
    correctAnswer: 0,
    explanation:
      'Thermographic surveys ideally use IR-transparent viewing windows fitted to panels, allowing scanning without opening covers. Where windows are not fitted, covers may need to be removed, requiring a safe system of work (risk assessment, appropriate PPE including arc flash protection) as the equipment must be energised and under load for the survey to be meaningful.',
  },
  {
    id: 5,
    question: 'A motor inspection checklist should include:',
    options: [
      'Front glass condition, frame fixings, MC4 connector integrity, string voltage and earthing continuity only',
      'Visual condition, bearing noise/vibration, winding temperature, insulation resistance, ventilation, coupling condition and foundation bolts',
      'Battery charge state, lamp illumination, changeover time and the rated discharge duration of the unit',
      'Detector cleanliness, sounder volume, control panel indications and the cause-and-effect response only',
    ],
    correctAnswer: 1,
    explanation:
      'A comprehensive motor inspection covers multiple aspects: visual condition (cleanliness, damage, corrosion), bearing assessment (noise, vibration, temperature), winding condition (temperature, insulation resistance), ventilation (fan, air paths, filters), mechanical (coupling, alignment, foundation), and electrical (current balance, supply voltage, earth continuity).',
  },
  {
    id: 6,
    question: 'Under BS 5839-1, the weekly fire alarm test should:',
    options: [
      'Functionally test every automatic detector in the building and verify each one signals the panel correctly',
      'Run the system on battery backup for its full standby duration to confirm the standby supply capacity',
      'Activate the system from a different manual call point each week, using a different zone on a rota basis, and confirm the alarm sounds',
      'Be carried out only by an accredited servicing engineer, as weekly testing is not a task the responsible person may perform',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5839-1 requires a weekly test by activating the alarm from a different manual call point each week, rotating through all call points over a period. The test verifies that the alarm sounds correctly, the control panel registers the activation, and any monitoring connections (e.g., to an alarm receiving centre) function. A different call point is used each week to ensure all are tested regularly.',
  },
  {
    id: 7,
    question: 'Cable condition assessment during inspection should check for:',
    options: [
      'Phase rotation, polarity and earth-fault loop impedance at every termination along the cable run',
      'Only the conductor cross-sectional area, since current-carrying capacity is the sole factor affecting cable life',
      'The exact insulation resistance value of every core, recorded to two decimal places at each support clip',
      'Mechanical damage, heat damage, moisture ingress, UV degradation, correct support/fixings, adequate bending radii and identification',
    ],
    correctAnswer: 3,
    explanation:
      'Cable inspection covers multiple degradation mechanisms: mechanical damage (crushing, abrasion, impact), heat damage (discolouration, brittleness near heat sources), moisture ingress (particularly at terminations), UV degradation (outdoor cables), correct support (sagging, missing clips), adequate bending radii (no sharp bends), and correct identification (labels, circuit marking).',
  },
  {
    id: 8,
    question: 'The monthly emergency lighting function test requires:',
    options: [
      'A brief simulated mains failure to confirm each luminaire illuminates, followed by verification that the charging indicator shows normal operation after mains restoration',
      'A full discharge of every luminaire for its complete rated duration of three hours, followed by a 24-hour recharge',
      'A measurement of the illuminance level at floor level along every escape route using a calibrated lux meter',
      'A visual check only, confirming each fitting is undamaged and in place, with no operation of the test switch',
    ],
    correctAnswer: 0,
    explanation:
      'The monthly test under BS 5266-1 involves a brief mains failure (either by operating the test switch or by switching off the relevant circuit) to confirm each emergency luminaire operates. Each luminaire is checked for illumination, then mains is restored and the charging indicator is verified. This test should last long enough to confirm operation but not so long as to significantly discharge the batteries.',
  },
  {
    id: 9,
    question: 'When inspecting switchgear, signs of partial discharge include:',
    options: [
      'A steady rise in busbar temperature across the whole panel with no localised hot spots',
      'White powder deposits (from ozone attack on insulation), a sharp acrid smell, audible crackling or buzzing, and UV fluorescence',
      'A measurable increase in the insulation resistance of the affected phase when tested at 500 V DC',
      'A drop in the supply frequency accompanied by flickering of the panel indicator lamps',
    ],
    correctAnswer: 1,
    explanation:
      'Partial discharge (PD) occurs when the electric field stress exceeds the breakdown strength of a localised area of insulation. Signs include white powder deposits (nitric acid formed by ozone attacking insulation), a characteristic acrid smell (ozone), audible crackling or buzzing (particularly in quiet environments), and UV fluorescence visible with a PD camera. PD is progressive and will eventually lead to complete insulation failure.',
  },
  {
    id: 10,
    question: 'RCD testing during PPM should include:',
    options: [
      'Operating the integral test button alone, which fully confirms the device will trip at the correct current and time',
      'An insulation resistance test across the RCD terminals at 500 V DC to confirm the device is healthy',
      'Both the integral test button check and an instrument test measuring actual trip time and trip current',
      'Measuring the load current through the RCD and confirming it does not exceed the rated residual operating current',
    ],
    correctAnswer: 2,
    explanation:
      'Complete RCD testing requires both methods: the integral test button verifies the mechanical trip mechanism is free and the device trips, while the instrument test measures the actual trip time (which must be within the limits specified in BS 7671) and can also verify the trip current. The integral test alone does not confirm that the device will trip at the correct current or within the required time.',
  },
  {
    id: 11,
    question:
      'What severity classification system is commonly used for thermographic survey findings?',
    options: [
      'An absolute temperature scale: any connection above 40°C is automatically classed as a defect requiring immediate shutdown',
      'A colour-coding of the thermal image alone, where any red pixel indicates a critical fault regardless of temperature',
      'A classification based purely on the load current at the time of the survey, independent of any temperature measurement',
      'A temperature-differential (ΔT) priority scale (NETA/Infraspection), where the SAME rise is read against two different reference points — a similar component under similar load, or ambient temperature — and the two scales give different priorities for the same reading',
    ],
    correctAnswer: 3,
    explanation:
      'The recognised classification is the NETA/Infraspection Institute Priority 1-4 system. It scores a ΔT against two different reference points, and the two scales are NOT interchangeable: for example, +18°C is only a Priority 3 (probable deficiency, repair as time permits) when read over ambient temperature, but the same +18°C is a Priority 1 (major discrepancy, repair immediately) when read against a similar component under similar load. Priority 2 exists only on the over-ambient scale — there is no similar-component band for it. Quoting a ΔT without saying which reference it was measured against tells the next technician nothing useful, and can leave an urgent fault filed as routine.',
  },
  {
    id: 12,
    question: 'Under the Regulatory Reform (Fire Safety) Order 2005, fire alarm testing is:',
    options: [
      'A statutory requirement for the responsible person to ensure fire detection and alarm systems are maintained in working order',
      'A purely voluntary best-practice activity that carries no legal weight if the records are not kept',
      'The sole responsibility of the local fire and rescue authority, who must carry out all testing themselves',
      'Required only in premises taller than 18 metres, with lower buildings exempt from any testing duty',
    ],
    correctAnswer: 0,
    explanation:
      "The RRO 2005 places a legal duty on the 'responsible person' (typically the employer or building occupier) to ensure that fire detection, alarm and emergency lighting systems are maintained in efficient working order and in good repair. What it does not do is name any intervals — the Order sets the duty, not the schedule. The familiar pattern of weekly alarm testing, monthly emergency lighting function tests and an annual full-duration test comes from BS 5839-1 and BS 5266-1. Following those standards is how a responsible person demonstrates the duty has been met, and the records are the evidence; but the interval is a judgement about the building, not a figure quoted from the legislation.",
  },
];

const faqs = [
  {
    question: 'How often should thermographic surveys be carried out?',
    answer:
      'For critical electrical infrastructure (main switchboards, transformers, HV switchgear), annual thermographic surveys are recommended as a minimum. Some organisations carry out 6-monthly surveys on the most critical assets. The survey must be carried out while equipment is energised and under normal load conditions — typically during normal working hours. Where infrared viewing windows are fitted, more frequent spot checks can be performed quickly and safely.',
  },
  {
    question: 'What is the difference between the monthly and annual emergency lighting tests?',
    answer:
      'The monthly test is a brief functional test — simulate mains failure, check each luminaire illuminates, restore mains and verify charging. It lasts just long enough to confirm operation. The annual test is a full-rated-duration discharge test — the system runs for its entire rated duration (typically 3 hours) to verify the batteries can sustain the required illumination level for the full design period. After the annual test, allow a full 24-hour recharge before the system is relied upon.',
  },
  {
    question: 'Should insulation resistance testing be done on every PPM visit?',
    answer:
      'Not necessarily. For most LV installations, insulation resistance testing is typically carried out annually or during the periodic inspection (EICR). However, for critical motors, transformers and HV cables, more frequent testing (quarterly or 6-monthly) is recommended to build a meaningful trend. The key is consistency — test at the same temperature, same conditions, and record values for trending. A sudden drop is more significant than an absolute value.',
  },
  {
    question: 'Can I carry out a thermographic survey without removing panel covers?',
    answer:
      'Yes, if infrared-transparent viewing windows are fitted. These UL-listed windows are installed in panel doors at strategic locations, allowing thermal scanning without opening covers and without the need for arc flash PPE. For panels without windows, covers must be removed, which requires a safe system of work, risk assessment, and appropriate PPE (arc flash rated for the prospective fault level). Some organisations retrofit IR windows during planned shutdowns.',
  },
  {
    question: 'What records should I keep from inspection routines?',
    answer:
      'All inspection findings should be recorded in the CMMS, including: date and time, equipment identifier, condition found (with photographs where appropriate), measurements taken (with values), comparison to previous readings, actions taken, and recommendations for follow-up. Thermographic images should be saved with the work order, along with the ambient conditions (temperature, load percentage) that were present during the survey. This data builds the maintenance history and enables trend analysis.',
  },
];

const MOETModule4Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.1 · Subsection 4"
        title="Electrical Inspection Routines"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Visual inspection, thermographic surveys, insulation testing and statutory system
            checks.
          </p>

          <TLDR
            points={[
              'Visual: Trained eye detects overheating, damage, moisture, vermin.',
              'Thermal: IR cameras reveal hot spots in connections and busbars.',
              'Insulation: Megger testing with trending reveals degradation.',
              'Statutory: Emergency lighting and fire alarm test schedules.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switchgear:</strong> Visual, thermal, IR testing, contact resistance.
              </li>
              <li>
                <strong>Motors:</strong> Bearings, windings, ventilation, alignment.
              </li>
              <li>
                <strong>Cables:</strong> Damage, support, terminations, identification.
              </li>
              <li>
                <strong>BS 5266/5839:</strong> Emergency lighting and fire alarm standards.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Carry out systematic visual inspections of electrical installations',
              'Interpret thermographic survey findings using severity classifications',
              'Perform insulation resistance testing and build meaningful trend data',
              'Inspect switchgear, motors and cables using structured checklists',
              'Execute emergency lighting and fire alarm test schedules correctly',
              'Record and report inspection findings for CMMS and compliance records',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Visual inspection checklists</ContentEyebrow>

          <ConceptBlock title="The foundation of every maintenance routine">
            <p>
              Visual inspection is the foundation of every electrical maintenance routine. A trained
              technician can identify a remarkable number of potential faults and safety hazards
              simply by looking, listening and smelling — without any test instruments. The key is a
              systematic approach using a structured checklist.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Distribution board visual checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Door and enclosure condition — damage, corrosion, missing screws, IP rating intact
              </li>
              <li>Discolouration — brown/black marks indicating overheating</li>
              <li>Burning smell — acrid odour indicates arcing or overheating</li>
              <li>Water damage — staining, drips, condensation</li>
              <li>Vermin evidence — droppings, nesting material, gnawed cables</li>
              <li>Cable entries — glands tight, bushing intact, no gaps in IP rating</li>
              <li>Labelling — circuit schedule complete, accurate and legible</li>
              <li>Clearance — adequate working space maintained per BS 7671</li>
              <li>Ventilation — air paths clear, fans operational, filters clean</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Motor visual checklist"
            onSite={
              <>
                Record what you find, not just what you check. A checklist entry of
                &quot;distribution board inspected — satisfactory&quot; has far less value than
                &quot;DB-03 inspected — minor dust accumulation on busbars, all connections appear
                tight, no discolouration, IP rating intact. Recommend cleaning at next
                shutdown.&quot;
              </>
            }
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>External condition — corrosion, paint damage, impact marks</li>
              <li>Cooling — fan guard clear, ventilation slots unobstructed</li>
              <li>Mounting — foundation bolts tight, no visible movement</li>
              <li>
                Coupling — guard in place, coupling condition visible through inspection holes
              </li>
              <li>Terminal box — cover secure, glands tight, connections not discoloured</li>
              <li>Bearing area — no grease leakage, no unusual noise or vibration</li>
              <li>Nameplate — legible, data recorded in asset register</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Thermographic surveys</ContentEyebrow>

          <ConceptBlock title="Revealing what is invisible to the naked eye">
            <p>
              Infrared thermography is one of the most powerful condition monitoring techniques
              available to electrical maintenance technicians. It reveals temperature anomalies that
              are invisible to the naked eye, identifying failing connections, overloaded circuits
              and component degradation before they cause failure or fire.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Thermographic severity classification (NETA / Infraspection)">
            <p>
              The recognised classification for a thermographic finding is a temperature
              differential (ΔT) read against a reference point — and the reference point matters as
              much as the number. The table below reproduces the NETA Maintenance Testing
              Specifications as published in the Infraspection Institute&apos;s{' '}
              <em>
                Standard for Infrared Inspection of Electrical Systems &amp; Rotating Equipment
              </em>{' '}
              (2016, §10.1). It gives two separate scales — a rise above a similar component under
              similar load, and a rise over ambient temperature — and they are not interchangeable.
              Priority 2 exists only on the over-ambient scale; there is no similar-component band
              for it.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Priority
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      ΔT vs similar component
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      ΔT over ambient
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-green-400">
                      Priority 4
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">1-3°C</td>
                    <td className="border border-white/10 px-3 py-2 text-white">1-10°C</td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Possible deficiency, warrants investigation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">
                      Priority 3
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">4-15°C</td>
                    <td className="border border-white/10 px-3 py-2 text-white">11-20°C</td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Probable deficiency, repair as time permits
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">
                      Priority 2
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">—</td>
                    <td className="border border-white/10 px-3 py-2 text-white">21-40°C</td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Monitor until corrective measures accomplished
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-red-400">
                      Priority 1
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">&gt;15°C</td>
                    <td className="border border-white/10 px-3 py-2 text-white">&gt;40°C</td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Major discrepancy, repair immediately
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Reading a ΔT without asking what it was measured against"
            whatHappens={
              <>
                The same rise reads very differently depending on the reference. A connection
                running 18°C above a similar connection under similar load is a Priority 1 major
                discrepancy calling for immediate repair — but the same +18°C measured over ambient
                temperature is only a Priority 3 probable deficiency, repair as time permits.
                Quoting a ΔT without saying which scale it was read against tells the next
                technician nothing, and can leave a genuinely urgent fault filed as routine.
              </>
            }
            doInstead={
              <>
                Always record both the ΔT value and what it was measured against — a similar
                component under similar load, or ambient temperature — and read it against the
                matching column of the table, never the other one.
              </>
            }
          />

          <ConceptBlock
            title="Important considerations"
            onSite={
              <>
                Nothing in BS 7671 or IET Guidance Note 3 sets a thermographic survey interval — the
                standing to require a survey at all comes from the Electricity at Work Regulations
                1989, Regulation 4(2) (equipment must be maintained so as to prevent danger), with
                HSE guidance HSR25 §68 confirming that the frequency is a matter for the judgement
                of the dutyholder. Annual or 6-monthly surveys on critical infrastructure, as
                recommended below, are industry practice built on that judgement — not a fixed
                regulatory interval.
              </>
            }
          >
            <p>
              Thermographic surveys must be carried out while equipment is energised and under load
              — an unloaded connection will not generate heat even if it is loose. Surveys should be
              conducted at the same time of day and similar load conditions each time to allow
              meaningful comparison. The emissivity setting on the camera must be correct for the
              material being measured (bare copper = ~0.07, oxidised copper = ~0.65, painted surface
              = ~0.95).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Insulation resistance testing and trending</ContentEyebrow>

          <ConceptBlock title="Tracking readings over time reveals degradation trends">
            <p>
              Insulation resistance (IR) testing measures the resistance of electrical insulation to
              DC current. A healthy insulation system has very high resistance (hundreds or
              thousands of megaohms). As insulation degrades from heat, moisture, contamination or
              mechanical damage, the resistance decreases. Tracking these readings over time reveals
              degradation trends.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Circuit voltage
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Test voltage (DC)
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Minimum IR value
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">SELV / PELV</td>
                    <td className="border border-white/10 px-3 py-2">250 V</td>
                    <td className="border border-white/10 px-3 py-2">0.5 MΩ</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Up to 500 V (inc. 230/400 V)
                    </td>
                    <td className="border border-white/10 px-3 py-2">500 V</td>
                    <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Above 500 V</td>
                    <td className="border border-white/10 px-3 py-2">1,000 V</td>
                    <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Trending best practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Test at the same temperature (or apply correction factors)</li>
              <li>Test at the same time of year to minimise humidity variation</li>
              <li>Record all readings in CMMS with date, temperature and conditions</li>
              <li>Plot readings graphically over time</li>
              <li>A 50% drop from the previous reading warrants investigation</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Safety precautions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Isolate and prove dead before connecting the megger</li>
              <li>Disconnect sensitive electronic equipment (VSD, PLC, etc.)</li>
              <li>Discharge capacitance after testing — cables and motors store charge</li>
              <li>Warning signs displayed: &quot;Insulation testing in progress&quot;</li>
              <li>Never test on damp or wet equipment</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Emergency lighting and fire alarm testing</ContentEyebrow>

          <ConceptBlock title="Life-safety systems with a statutory testing regime">
            <p>
              Emergency lighting and fire alarm systems are life-safety systems. Their testing is a
              statutory requirement under the Regulatory Reform (Fire Safety) Order 2005, and the
              testing regime is defined by BS 5266-1 (emergency lighting) and BS 5839-1 (fire
              detection and alarm systems).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Emergency lighting test schedule (BS 5266-1)">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Frequency
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Test
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Monthly</td>
                    <td className="border border-white/10 px-3 py-2">
                      Functional test — simulate mains failure, check each luminaire operates
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Brief (sufficient to confirm operation)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">6-monthly</td>
                    <td className="border border-white/10 px-3 py-2">
                      Extended test in some schedules; check changeover devices
                    </td>
                    <td className="border border-white/10 px-3 py-2">As specified</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Annually</td>
                    <td className="border border-white/10 px-3 py-2">
                      Full-rated-duration discharge test
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Full rated duration (typically 3 hours)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Fire alarm test schedule (BS 5839-1)"
            onSite={
              <>
                All test results must be recorded in a log book kept on the premises (or in the
                CMMS). The fire authority can inspect these records at any time. Failure to maintain
                adequate records is a breach of the RRO 2005 and can result in enforcement action.
              </>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Frequency
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Test
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Weekly</td>
                    <td className="border border-white/10 px-3 py-2">
                      Activate from a different call point each week; confirm alarm sounds
                      throughout
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Quarterly</td>
                    <td className="border border-white/10 px-3 py-2">
                      Visual inspection of all components; check 25% of detectors
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Annually</td>
                    <td className="border border-white/10 px-3 py-2">
                      Full service — all detectors functionally tested, batteries checked, cause and
                      effect verified
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            title="Thermographic severity (NETA / Infraspection)"
            points={[
              'Priority 4 — 1-3°C vs similar component / 1-10°C over ambient — possible deficiency.',
              'Priority 3 — 4-15°C vs similar component / 11-20°C over ambient — probable deficiency.',
              'Priority 2 — over-ambient scale only, 21-40°C — monitor until corrected.',
              'Priority 1 — >15°C vs similar component / >40°C over ambient — major discrepancy, repair immediately.',
            ]}
          />

          <KeyTakeaways
            title="Routine test intervals — and where they come from"
            points={[
              'Fire alarm — weekly call point test, rotating through the call points. This comes from BS 5839-1, a standard, not from statute.',
              'Emergency lighting — monthly function test plus an annual full-duration test. From BS 5266-1, again a standard rather than a legal interval.',
              'RCD — six-monthly press of the test button. BS 7671 Reg 514.12.2 fixes this by requiring the RCD notice to instruct a six-monthly user test. There is no quarterly RCD requirement in BS 7671.',
              'EICR — there is no fixed interval table. Reg 652.1 requires the frequency to be determined by weighing the type of installation, the equipment present, how it is used, the frequency and quality of maintenance, external influences, and the results of previous reports. No single factor alone is sufficient.',
              'None of these intervals is itself statutory. The legal duty is EAWR Reg 4(2) — systems maintained so as to prevent danger — and for fire systems the Regulatory Reform (Fire Safety) Order. The intervals above are how industry discharges that duty, not the duty itself.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section1-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Lubrication, Cleaning and Adjustments
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section1-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Legal and Regulatory Compliance
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section1_4;
