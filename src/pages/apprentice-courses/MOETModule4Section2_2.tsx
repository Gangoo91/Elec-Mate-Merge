/**
 * MOET · Module 4 · Section 2 · Subsection 2 — Thermal Imaging
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
 *   · "Electrical. Electrical maintenance tools, measurement, and test
 *     equipment application, operation, care and calibration
 *     requirements."
 *   · "Documentation requirements: documentation control, auditable
 *     records."
 *
 * ⚠️ ACCURACY CORRECTION (applied at conversion): the original page's
 * severity classification only appeared in the "Quick Reference" footer,
 * as ΔT bands (<10°C / 10-35°C / 35-75°C / >75°C) with no stated reference
 * point. These do not match the actual NETA/Infraspection scale and
 * conflated two different reference bases. Replaced throughout with the
 * Infraspection Institute "Standard for Infrared Inspection of Electrical
 * Systems & Rotating Equipment" (2016, §10.1) Priority 1-4 table, which
 * reproduces the NETA Maintenance Testing Specifications and gives separate
 * bands for a similar-component comparison and an over-ambient comparison
 * (Priority 2 exists only on the over-ambient scale). This table has also
 * been promoted from the footer into the main teaching body — "Apply
 * severity classification to thermographic findings" is an explicit
 * learning outcome the original page did not actually teach in its body
 * text. Neither BS 7671 nor GN3 sets a thermography survey interval or a
 * severity scale; the legal standing for carrying out a survey at all comes
 * from EAWR 1989 Reg 4(2) and HSE guidance HSR25 §68, added below.
 *
 * ✎ CORRECTED (12 Sep): an earlier version of the conversion brief said
 * "nothing in BS 7671 or GN3 governs thermography". That over-claimed and
 * suppressed something useful. GN3 §4.9 "Thermographic equipment" DOES cover
 * it — as an inspection aid for early identification of overheating, with the
 * Note to Reg 653.2 allowing thermographic evidence to be attached to
 * certification, and a recommendation to consult EAWR/HSR25 before working
 * close to live parts. Verified in bs7671_facets. What GN3 does not give is a
 * ΔT severity scale or a survey interval. A ConceptBlock covering this has
 * been added to the page body.
 * No other data-array entry in this page contained the wrong bands.
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Thermal Imaging - MOET Module 4.2.2';
const DESCRIPTION =
  'Infrared thermography principles, emissivity, camera types, interpreting thermograms, hot spots in connections, busbars, motors and switchgear, reporting, trending, BS EN 16714, and safety during live scanning for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'emissivity',
    question: 'What is emissivity in infrared thermography?',
    options: [
      'The smallest object the camera can resolve at a given working distance',
      'How effectively a surface emits thermal radiation versus a perfect emitter',
      'The temperature at which a surface begins to glow visibly red to the eye',
      'The rate at which a surface loses heat by conduction to the air around it',
    ],
    correctIndex: 1,
    explanation:
      'Emissivity is a dimensionless value between 0 and 1 that describes how efficiently a surface emits infrared radiation. A perfect emitter (blackbody) has an emissivity of 1.0. Materials like painted surfaces (~0.95) have high emissivity and give accurate readings. Polished metals like bare copper (~0.07) have very low emissivity and reflect surrounding radiation, making temperature measurement difficult without correction.',
  },
  {
    id: 'thermal-pattern',
    question:
      'A thermogram shows one phase of a three-phase busbar connection significantly hotter than the other two phases carrying similar load. This indicates:',
    options: [
      'A faulty thermal camera reading caused by a low camera battery voltage',
      'Normal behaviour, since one phase will always run hotter than the others',
      'A reflection from a nearby heat source rather than a genuine real hot spot',
      'A high-resistance joint on that phase — a loose bolt or corroded contact',
    ],
    correctIndex: 3,
    explanation:
      'When all three phases carry similar current, they should be at similar temperatures. A significantly hotter connection on one phase indicates a localised problem — most commonly a loose bolted connection, corroded contact surface, or reduced contact area. This creates higher resistance, generating more heat (P = I²R). The differential temperature indicates the severity.',
  },
  {
    id: 'live-scanning-safety',
    question:
      'When carrying out a thermographic survey of live switchgear with covers removed, the primary safety concern is:',
    options: [
      'The risk of the thermal camera being damaged by stray infrared radiation',
      'The possibility of reflected radiation distorting the temperature readings',
      'Exposure to arc flash — needing arc-rated PPE and safe working distances',
      'The need to recalibrate the camera every time a panel cover is removed',
    ],
    correctIndex: 2,
    explanation:
      'Removing covers from live switchgear exposes the surveyor to the risk of arc flash — a violent release of energy caused by an electrical fault that can produce temperatures exceeding 20,000°C and blast pressures. Arc-rated PPE (face shield, flame-resistant clothing, insulated gloves) must be worn, and the arc flash incident energy level must be assessed beforehand. IR viewing windows eliminate this risk by allowing scanning without cover removal.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Infrared thermography detects:',
    options: [
      'Visible light reflected from hot surfaces, which is brighter when hotter',
      'Infrared radiation emitted by objects, which relates to surface temperature',
      'The electrical resistance of a connection, measured at a safe distance',
      'Ultraviolet emission from arcing contacts inside the enclosure being scanned',
    ],
    correctAnswer: 1,
    explanation:
      "All objects above absolute zero emit infrared radiation. The intensity and wavelength of this radiation is directly related to the object's surface temperature. An infrared camera detects this radiation and converts it into a visual thermal image (thermogram) where colours or grey scales represent different temperatures.",
  },
  {
    id: 2,
    question: 'The emissivity of polished bare copper is approximately:',
    options: ['1.00 (perfect)', '0.95 (very high)', '0.07 (very low)', '0.65 (moderate)'],
    correctAnswer: 2,
    explanation:
      "Polished bare copper has a very low emissivity (~0.07), meaning it is a very poor emitter of infrared radiation and a very good reflector. This makes accurate temperature measurement with an IR camera extremely difficult — the camera 'sees' reflected radiation from surrounding objects rather than the copper's own emission. Applying high-emissivity tape or paint to measurement points overcomes this problem.",
  },
  {
    id: 3,
    question: 'For a meaningful thermographic survey, the equipment should be:',
    options: [
      'De-energised and fully isolated so it is safe to approach closely',
      'Energised but running with no load connected to the circuit',
      'Cooled to ambient temperature before the survey is carried out',
      'Energised and carrying at least 40% of its normal load current',
    ],
    correctAnswer: 3,
    explanation:
      'A thermographic survey must be conducted while equipment is energised and under load, because heat is generated by current flowing through resistance (P = I²R). At very low loads, even a loose connection may not generate enough heat to be detectable. A minimum of 40% normal load is generally recommended, with the actual load percentage recorded for each survey to allow meaningful comparison.',
  },
  {
    id: 4,
    question: 'IR viewing windows fitted to panel doors are made from materials that:',
    options: [
      'Transmit infrared while keeping an arc-flash barrier and the IP rating',
      'Block all radiation so the camera reads only the window surface temperature',
      'Magnify the infrared image to improve the spatial resolution of the camera',
      'Filter out visible light so the survey can be carried out fully in darkness',
    ],
    correctAnswer: 0,
    explanation:
      "IR viewing windows are made from materials such as calcium fluoride, barium fluoride, or crystal polymer that are opaque to visible light but transparent to infrared wavelengths. They allow thermal scanning without removing panel covers, eliminating arc flash risk and maintaining the panel's IP rating. They are UL-listed safety devices and should be installed at locations where the most critical connections can be viewed.",
  },
  {
    id: 5,
    question: 'BS EN 16714 relates to:',
    options: [
      'Arc flash risk assessment and the selection of suitable arc-rated PPE',
      'Thermographic testing as NDT, with thermographer and equipment requirements',
      'The construction and IP rating of low voltage switchgear enclosures',
      'The minimum acceptable insulation resistance values for low voltage circuits',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 16714 is the European standard for thermographic testing as a non-destructive testing (NDT) method. It covers general principles, equipment requirements, and the qualification and certification of thermographers. It provides a standardised framework for thermographic inspection, including reporting requirements and quality assurance.',
  },
  {
    id: 6,
    question:
      'A thermal image showing a uniform temperature increase across all three phases of a busbar system indicates:',
    options: [
      'A high-resistance connection on one phase that has spread to the others',
      'A camera calibration error affecting all three measurement points',
      'Normal loading — the busbars are carrying current and generating expected heat, or the system may be overloaded',
      'Reflected radiation from a nearby heat source on all three phases',
    ],
    correctAnswer: 2,
    explanation:
      'Uniform heating across all phases suggests the temperature rise is due to normal current flow rather than a localised fault. However, if the temperature is higher than expected for the rated current, it may indicate overloading, undersized busbars, or inadequate ventilation. Comparison with the rated temperature rise and the actual load percentage is needed to determine whether the heating is acceptable.',
  },
  {
    id: 7,
    question: 'When reporting thermographic survey findings, the report should include:',
    options: [
      'Only a single thermal image of the single hottest component that was found',
      'The thermal images alone, without any supporting written detail or context',
      'A list of only the components that were found to be operating normally',
      'Thermal and visual images plus ambient, load, ΔT, severity and actions',
    ],
    correctAnswer: 3,
    explanation:
      'A comprehensive thermographic report includes: thermal images (annotated with temperature values), corresponding visual photographs (for identification), ambient conditions (temperature, humidity), equipment load at time of survey (percentage of rated), emissivity settings used, delta-T calculations, severity classification for each anomaly, and recommended corrective actions with priority.',
  },
  {
    id: 8,
    question: 'The main advantage of regular thermographic trending is:',
    options: [
      'Comparing data over time reveals gradual deterioration before failure occurs',
      'It removes the need to record the load conditions at each individual survey',
      'It allows the survey to be carried out with the equipment fully de-energised',
      'It eliminates the need for any emissivity correction on bare metal surfaces',
    ],
    correctAnswer: 0,
    explanation:
      'Trending — comparing thermal data from successive surveys — reveals changes over time. A connection that was 5°C above ambient last year but is now 15°C above indicates progressive deterioration, even though 15°C may not trigger an immediate action threshold. Trending transforms thermography from a snapshot into a predictive tool, enabling condition-based maintenance decisions.',
  },
  {
    id: 9,
    question: 'Wind and air movement during a thermographic survey can:',
    options: [
      'Increase surface temperatures, causing faults to appear more severe',
      'Cool hot spots, causing the survey to underestimate the severity of faults',
      'Have no effect at all on the measured surface temperatures',
      'Improve the accuracy of readings on low-emissivity surfaces',
    ],
    correctAnswer: 1,
    explanation:
      'Air movement (wind, forced ventilation, draughts) cools equipment surfaces, reducing the measured temperature and potentially causing the surveyor to underestimate the severity of a fault. For indoor surveys, note the proximity of ventilation systems. For outdoor surveys, wind speed should be recorded. Where possible, surveys should be conducted with minimal air movement across the equipment.',
  },
  {
    id: 10,
    question: "The thermal image quality term 'IFOV' (Instantaneous Field of View) determines:",
    options: [
      'The maximum surface temperature the camera is able to measure accurately',
      'The rate at which the camera refreshes the thermal image on its display',
      'The smallest object the camera can resolve — its spatial resolution',
      'The emissivity correction the camera applies to readings automatically',
    ],
    correctAnswer: 2,
    explanation:
      'IFOV defines the smallest object the camera can accurately measure at a given distance. A smaller IFOV means better resolution. This is important in electrical inspections where connections and components may be small and closely spaced. The measurement spot must be entirely within the target — if the target is smaller than the IFOV at the scanning distance, the reading will be averaged with the background.',
  },
  {
    id: 11,
    question:
      'Before carrying out a thermographic survey of live equipment with covers removed, you must:',
    options: [
      'Switch the camera to its highest emissivity setting before opening the panel covers',
      'Confirm only that the panel door interlock has been defeated for the survey',
      'Wait for the equipment to cool below 40°C so the covers can be handled safely',
      'Assess arc flash, set the incident energy, PPE and boundary, and a safe system',
    ],
    correctAnswer: 3,
    explanation:
      'Working on or near live equipment with covers removed carries a risk of arc flash. Before starting, an arc flash risk assessment must be completed to determine the prospective incident energy level. This determines the required arc-rated PPE (typically Category 2 or higher for distribution-level equipment), the arc flash boundary, and the safe working distance. A written safe system of work should be in place.',
  },
  {
    id: 12,
    question: 'Reflected temperature compensation is necessary when:',
    options: [
      'Scanning low-emissivity surfaces where reflected radiation from nearby heat sources could affect the reading',
      'Scanning high-emissivity painted surfaces in a temperature-stable room',
      'The equipment is de-energised and at the same temperature as ambient',
      'The camera is fitted with a wide-angle lens for distant targets',
    ],
    correctAnswer: 0,
    explanation:
      'Low-emissivity surfaces (bare metals, polished surfaces) reflect infrared radiation from their surroundings. If a nearby heat source (radiator, process equipment, sunlit surface) reflects off the target, the camera may read the reflected temperature rather than the actual surface temperature. Reflected temperature compensation corrects for this by measuring and accounting for the reflected radiation.',
  },
];

const faqs = [
  {
    question: 'What qualifications do I need to carry out thermographic surveys?',
    answer:
      'While there is no legal requirement for a specific qualification, industry best practice recommends Category 1 (ITC Level 1) certification as a minimum for thermographic inspection of electrical installations. This covers camera operation, basic thermography theory, reporting and common applications. Category 2 (ITC Level 2) provides more advanced analysis skills. Certification is available through organisations such as the Infrared Training Centre (ITC), British Institute of Non-Destructive Testing (BINDT), and various camera manufacturers.',
  },
  {
    question: 'How much does a thermal camera cost?',
    answer:
      'Thermal cameras range from approximately £300 for basic smartphone attachments (suitable for quick checks but limited accuracy) to over £30,000 for high-resolution professional instruments. For regular electrical inspection, a mid-range camera (£3,000-£8,000) with at least 320x240 resolution, manual focus, adjustable emissivity, and reporting software is recommended. Many organisations hire cameras or contract thermographic surveys to specialist firms.',
  },
  {
    question: 'Can I use a thermal camera through a glass window?',
    answer:
      "No. Standard glass is opaque to the infrared wavelengths used by thermal cameras (typically 8-14 μm for long-wave cameras). The camera will measure the temperature of the glass surface, not the object behind it. Special IR-transparent windows made from calcium fluoride, barium fluoride or crystal polymer must be used. These materials transmit infrared radiation while blocking visible light and maintaining the enclosure's IP rating.",
  },
  {
    question: 'What is the difference between qualitative and quantitative thermography?',
    answer:
      'Qualitative (comparative) thermography identifies thermal anomalies by comparing similar components under similar conditions — e.g., comparing the three phases of a busbar connection. It does not require precise temperature measurement and is the most common approach for routine electrical inspection. Quantitative thermography measures actual temperatures, which requires accurate emissivity settings, reflected temperature compensation, and controlled conditions. Quantitative data is needed for trending and for determining whether components are operating within their rated temperature limits.',
  },
  {
    question: 'How often should IR viewing windows be inspected?',
    answer:
      "IR viewing windows should be visually inspected during each thermographic survey for damage, contamination or seal deterioration. Crystal windows can be cleaned with appropriate lens cleaning solution. Polymer windows have a finite life and should be replaced according to the manufacturer's recommendations — typically every 5-10 years or if they become cloudy, scratched or damaged. The window's transmission characteristics should be verified periodically against a known reference.",
  },
];

const MOETModule4Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.2 · Subsection 2"
        title="Thermal Imaging"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Infrared thermography for detecting hot spots, trending degradation and preventing
            electrical fires.
          </p>

          <TLDR
            points={[
              'Principle: All objects emit IR radiation proportional to temperature.',
              'Emissivity: Surface property affecting measurement accuracy.',
              'Applications: Connections, busbars, motors, switchgear, transformers.',
              'Safety: Arc flash risk when scanning with covers removed.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hot spots:</strong> Loose connections, overloaded circuits, failing
                components.
              </li>
              <li>
                <strong>IR windows:</strong> Enable scanning without removing covers.
              </li>
              <li>
                <strong>Trending:</strong> Comparing surveys reveals progressive deterioration.
              </li>
              <li>
                <strong>BS EN 16714:</strong> Standard for thermographic testing.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principles of infrared thermography and thermal radiation',
              'Understand the significance of emissivity and its effect on temperature measurement',
              'Interpret thermograms to identify hot spots in electrical connections and equipment',
              'Apply severity classification to thermographic findings',
              'Produce comprehensive thermographic survey reports with trending data',
              'Implement safe working practices for thermographic surveys on live equipment',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Principles of infrared thermography</ContentEyebrow>

          <ConceptBlock title="Every object above absolute zero emits infrared radiation">
            <p>
              Every object with a temperature above absolute zero (-273.15°C) emits electromagnetic
              radiation in the infrared spectrum. The intensity and wavelength distribution of this
              radiation is directly related to the object&apos;s surface temperature — hotter
              objects emit more radiation at shorter wavelengths. An infrared camera detects this
              radiation and converts it into a visual thermal image, or thermogram.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key thermography concepts">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stefan-Boltzmann Law:</strong> Total radiation emitted is proportional to
                the fourth power of absolute temperature (W = εσT⁴)
              </li>
              <li>
                <strong>Emissivity (ε):</strong> The ratio of radiation emitted by a surface to that
                of a perfect blackbody at the same temperature (0 to 1)
              </li>
              <li>
                <strong>Reflected temperature:</strong> Radiation from surrounding objects reflected
                off the target surface, which can distort measurements on low-emissivity surfaces
              </li>
              <li>
                <strong>Atmospheric transmission:</strong> The atmosphere absorbs some IR radiation;
                significant at long distances but negligible for most electrical inspection
                distances
              </li>
              <li>
                <strong>Spatial resolution (IFOV):</strong> The smallest object the camera can
                resolve — determines the minimum size of target that can be accurately measured
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common emissivity values"
            onSite={
              <>
                For bare metal connections, use qualitative (comparative) thermography rather than
                trying to measure absolute temperatures. Compare the three phases of a similar
                connection under similar load — a significant temperature difference between phases
                indicates a problem, regardless of the absolute value.
              </>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Material
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Emissivity
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Measurement difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Painted surface (any colour)
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">0.90–0.95</td>
                    <td className="border border-white/10 px-3 py-2 text-green-400">
                      Easy — accurate readings
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-white">Oxidised copper</td>
                    <td className="border border-white/10 px-3 py-2 text-white">0.60–0.70</td>
                    <td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-white">Oxidised steel</td>
                    <td className="border border-white/10 px-3 py-2 text-white">0.70–0.80</td>
                    <td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-white">PVC insulation</td>
                    <td className="border border-white/10 px-3 py-2 text-white">0.91–0.93</td>
                    <td className="border border-white/10 px-3 py-2 text-green-400">Easy</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-white">Polished copper</td>
                    <td className="border border-white/10 px-3 py-2 text-white">0.02–0.07</td>
                    <td className="border border-white/10 px-3 py-2 text-red-400">
                      Very difficult
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Polished aluminium
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">0.03–0.06</td>
                    <td className="border border-white/10 px-3 py-2 text-red-400">
                      Very difficult
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Interpreting thermograms</ContentEyebrow>

          <ConceptBlock title="Not pretty pictures — correct interpretation">
            <p>
              The value of thermography lies not in taking pretty pictures but in correctly
              interpreting what the thermal image reveals about equipment condition. Understanding
              common thermal patterns and their causes is essential for accurate diagnosis.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common thermal patterns in electrical equipment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single hot connection (one phase):</strong> High-resistance joint — loose
                bolt, corroded surface, insufficient contact area
              </li>
              <li>
                <strong>All three phases equally hot:</strong> Overloading or undersized conductors
                — check actual current vs rating
              </li>
              <li>
                <strong>Hot fuse:</strong> Partial blowing, loose fuse clips, or fuse operating near
                its rating
              </li>
              <li>
                <strong>Hot MCB/MCCB:</strong> Overloaded circuit, high-resistance internal
                connection, or approaching end of life
              </li>
              <li>
                <strong>Motor frame — even heat:</strong> Normal operating temperature; compare to
                rated temperature rise
              </li>
              <li>
                <strong>Motor frame — localised hot spot:</strong> Stator winding fault, blocked
                ventilation, or bearing problem
              </li>
              <li>
                <strong>Transformer — winding pattern visible:</strong> Normal for loaded
                transformer; check against rating
              </li>
              <li>
                <strong>Cable — heat at termination:</strong> Loose gland, undersized termination,
                or poor compression
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Thermographic severity classification (NETA / Infraspection)">
            <p>
              A thermographic finding is scored as a temperature differential (ΔT) read against a
              reference point — and the reference point matters as much as the number. The table
              below reproduces the NETA Maintenance Testing Specifications as published in the
              Infraspection Institute&apos;s{' '}
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
            title="Reading a ΔT without saying what it was measured against"
            whatHappens={
              <>
                The same rise reads very differently depending on the reference. A connection
                running 18°C above a similar connection under similar load is a Priority 1 major
                discrepancy calling for immediate repair — but the same +18°C measured over ambient
                temperature is only a Priority 3 probable deficiency, repair as time permits. A ΔT
                quoted without its reference tells the next technician nothing, and can leave a
                genuinely urgent fault filed as routine.
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

          <ConceptBlock title="Avoiding misdiagnosis">
            <p>
              Not every hot spot indicates a fault. Solar heating on south-facing panels, radiated
              heat from nearby processes, reflected radiation from hot objects, and normal operating
              temperatures can all create thermal patterns that may be misinterpreted. Always
              consider the context: What is the load? What is nearby? Is the pattern consistent
              across similar equipment? When in doubt, repeat the measurement under different
              conditions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Reporting, trending and standards</ContentEyebrow>

          <ConceptBlock title="Limited value without proper reporting and trending">
            <p>
              A thermographic survey has limited value without proper reporting and trending. The
              report must provide sufficient information for maintenance decisions, and successive
              surveys must be comparable to reveal trends over time.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Report contents">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Survey date, time, surveyor name and qualification level</li>
              <li>Camera model, serial number, last calibration date</li>
              <li>Ambient temperature and humidity at time of survey</li>
              <li>Equipment load conditions (actual percentage of rated load)</li>
              <li>For each anomaly: thermal image, visual photograph, location identifier</li>
              <li>Emissivity setting used, reflected temperature compensation</li>
              <li>Maximum temperature, reference temperature, ΔT value</li>
              <li>Severity classification and recommended action</li>
              <li>Comparison to previous survey data where available</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Trending technique">
            <p>
              For trending to be meaningful, surveys must be carried out under consistent
              conditions: similar load percentage, similar ambient temperature, same camera
              settings, same scanning angles. Plot the ΔT for each monitored connection over time. A
              rising trend indicates progressive deterioration and should trigger corrective action
              before the threshold for urgent repair is reached.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BS EN 16714">
            <p>
              BS EN 16714 provides the European standard framework for thermographic testing as a
              non-destructive testing method. Part 1 covers general principles, Part 2 covers
              equipment requirements, and Part 3 covers terms and definitions. The standard supports
              consistent quality in thermographic inspection across organisations and industries.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Safety during live scanning</ContentEyebrow>

          <ConceptBlock title="An inherent conflict with electrical safety principles">
            <p>
              Thermographic surveys must be carried out on energised, loaded equipment to be
              meaningful. This creates an inherent conflict with electrical safety principles. Safe
              working practices must balance the need for access with the risks of working near live
              equipment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safe survey hierarchy">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Best:</strong> Scan through IR viewing windows — no cover removal, no arc
                flash risk, maintains IP rating
              </li>
              <li>
                <strong>Acceptable:</strong> Remove covers under a safe system of work with
                appropriate arc-rated PPE, risk assessment and competent person supervision
              </li>
              <li>
                <strong>Worst:</strong> Scanning with covers on — limited value as covers block IR
                radiation (only useful for surface temperature of the enclosure)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Arc flash protection">
            <p>
              When covers are removed from live equipment, the surveyor must wear arc-rated PPE
              appropriate for the prospective incident energy level. This typically includes:
              arc-rated face shield and balaclava, arc-rated shirt and trousers (or coverall),
              insulated gloves with leather protectors, and safety footwear. The arc flash boundary
              must be established and non-essential personnel excluded. A second person should be
              present to act as safety observer.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What gives a thermographic survey its legal standing"
            onSite={
              <>
                Neither BS 7671 nor IET Guidance Note 3 sets a thermography survey interval — the
                standing to require a survey at all comes from the Electricity at Work Regulations
                1989, Regulation 4(2) (systems must be maintained so as to prevent danger), with HSE
                guidance HSR25 §68 confirming that the frequency is a matter for the judgement of
                the dutyholder, informed by the consequence of failure and the condition data
                already held.
              </>
            }
          >
            <p>
              Thermography is a maintenance technique the dutyholder chooses to deploy in
              discharging that duty — the survey interval is a risk-based judgement, not a figure
              written into any electrical standard.
            </p>
          </ConceptBlock>

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">ST1426 link: </span>
            Understanding the application and limitations of thermographic inspection is part of the
            condition monitoring knowledge required for maintenance technicians. You should be able
            to explain when and why thermographic surveys are carried out and how the results inform
            maintenance decisions.
          </p>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=JJZiefsM-j8"

            title="An Introduction to Tuning a Thermal Image"

            channel="SparkyNinja"

            duration="36:43"

            topic="Setting a thermal camera up so the image means something"

            caption="Emissivity, span and palette decide whether a thermogram shows a fault or an artefact. This is the part that turns a pretty picture into evidence."
          />

          <SectionRule />

          <ConceptBlock
            title="What GN3 does and does not say about thermography"

            plainEnglish="GN3 treats a thermal camera as an inspection aid and tells you how the images can be used. It does not tell you what a given temperature rise means."

            onSite="Your thermogram can go on the certificate as supporting evidence — but it never replaces the measurements the inspection actually requires."
          >
            <p>
              It is worth being precise about where thermography sits in the UK documents, because
              it is easy to over- or under-claim. IET Guidance Note 3 does cover it: section 4.9,
              &quot;Thermographic equipment&quot;, describes photographic and thermographic
              surveying as invaluable in assisting electrical inspections, specifically for the
              early identification of possible points of overheating in circuits.
            </p>

            <p>
              GN3 also points at the Note to Regulation 653.2, which acknowledges that photographic
              or thermographic evidence can be attached to the appropriate certification to support
              observations recorded on the model forms. A thermogram is therefore not just something
              you keep for your own records — it has a recognised place alongside the paperwork.
            </p>

            <p>
              Two limits go with that. GN3 is explicit that thermographic evidence supports
              observations but is not a substitute for the inspection, measurement and testing BS
              7671 requires. And it recommends referring to the Electricity at Work Regulations and
              HSE HSR25 before any activity that puts you close to live parts — which a survey
              usually does, since equipment has to be energised and under load to be worth
              surveying. Where a small installation could practically be disconnected instead, GN3
              says that should be considered.
            </p>

            <p>
              What GN3 does <strong>not</strong> give is a severity scale. There is no ΔT table and
              no survey interval in either GN3 or BS 7671 — the Priority 1 to 4 bands above come
              from the NETA specifications reproduced by the Infraspection Institute, and the
              frequency is a dutyholder judgement under EAWR Regulation 4(2).
            </p>
          </ConceptBlock>

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
            title="Survey requirements"
            points={[
              'Equipment energised, minimum 40% load.',
              'Record ambient temp, load %, emissivity.',
              'Arc flash PPE if covers removed.',
              'IR windows preferred where available.',
              'BS EN 16714 standard framework.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Visual and Sensory Inspection
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Vibration Analysis
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section2_2;
