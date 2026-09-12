/**
 * MOET · Module 4 · Section 1 · Subsection 3 — Lubrication, Cleaning and Adjustments
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
 *   · "Electrical. Electrical maintenance tools, measurement, and test
 *     equipment application, operation, care and calibration
 *     requirements."
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

const TITLE = 'Lubrication, Cleaning and Adjustments - MOET Module 4.1.3';
const DESCRIPTION =
  'Bearing lubrication, motor greasing schedules, contact cleaning, thermal paste application, belt tension, alignment, torque checking, panel and filter cleaning for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'over-greasing',
    question: 'What is the primary risk of over-greasing an electric motor bearing?',
    options: [
      'The grease quickly dries out, leaving the bearing unlubricated',
      'The motor draws less current and runs cooler than intended',
      'Excess grease causes increased friction and heat, potentially leading to bearing failure',
      'The bearing seals expand and improve protection against contamination',
    ],
    correctIndex: 2,
    explanation:
      'Over-greasing is one of the most common causes of premature bearing failure in electric motors. Excess grease creates churning resistance, generating additional heat that breaks down the lubricant and accelerates bearing wear. The correct quantity — typically calculated from the bearing size — must be applied using a calibrated grease gun.',
  },
  {
    id: 'torque-checking',
    question: 'Why must electrical connections be re-torqued periodically?',
    options: [
      'Because copper conductors stretch permanently once current flows through them',
      'Because the insulation around the conductor shrinks over time',
      'Because thermal cycling causes connections to loosen over time, increasing resistance and creating hot spots',
      'Because re-torquing increases the current-carrying capacity of the conductor',
    ],
    correctIndex: 2,
    explanation:
      'Electrical connections expand and contract with heating and cooling cycles (thermal cycling). This gradually loosens the connection, increasing contact resistance. Higher resistance generates more heat, which accelerates loosening further — a dangerous positive feedback loop that can lead to overheating, arcing and fire.',
  },
  {
    id: 'belt-tension',
    question: 'What happens if a V-belt driving a motor-pump combination is too tight?',
    options: [
      'The belt slips under load and transmits less power than required',
      'The motor runs faster than its rated speed',
      'The belt cools the bearings and extends their service life',
      'Excessive bearing load on both motor and driven equipment, leading to premature bearing failure',
    ],
    correctIndex: 3,
    explanation:
      'An over-tensioned belt places excessive radial load on the bearings of both the motor and driven equipment, significantly reducing bearing life. It also accelerates belt wear and increases energy consumption. Correct tension — typically checked with a tension gauge or deflection measurement — is essential for reliable operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The primary purpose of lubricating electric motor bearings is to:',
    options: [
      'Increase the motor speed and improve efficiency',
      'Reduce friction, dissipate heat, prevent corrosion and exclude contaminants',
      'Improve the insulation resistance of the windings',
      'Reduce the current drawn by the motor at full load',
    ],
    correctAnswer: 1,
    explanation:
      'Bearing lubrication serves four key functions: reducing friction between rolling elements and races, dissipating heat generated by friction, providing a protective barrier against corrosion from moisture, and helping to exclude dust and other contaminants from the bearing. Without adequate lubrication, bearings overheat and fail rapidly.',
  },
  {
    id: 2,
    question:
      'A motor manufacturer recommends re-greasing a bearing every 4,000 operating hours. The motor runs 16 hours per day, 5 days per week. How often should the bearing be re-greased?',
    options: [
      'Every 5 months',
      'Every 6 months',
      'Approximately every 10 months',
      'Every 18 months',
    ],
    correctAnswer: 2,
    explanation:
      'Operating hours per week = 16 x 5 = 80 hours. Operating hours per month (approx.) = 80 x 4.33 = 346 hours. Months to reach 4,000 hours = 4,000 / 346 = 11.6 months, so approximately every 10-12 months. In practice, rounding down to 10 months provides a safety margin, especially if the environment is dusty or hot.',
  },
  {
    id: 3,
    question:
      'When cleaning electrical panel interiors, which of the following should NOT be used?',
    options: [
      'A vacuum cleaner fitted with an anti-static nozzle',
      'A lint-free cloth dampened with approved electrical cleaner',
      'An approved electrical contact cleaner spray',
      'Water or water-based cleaning solutions on energised equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Water and water-based solutions must never be used on energised electrical equipment due to the risk of electric shock and short circuit. Even on de-energised equipment, water can leave conductive residues and cause corrosion. Always use approved electrical contact cleaners, vacuum cleaners with anti-static nozzles, or clean dry cloths.',
  },
  {
    id: 4,
    question: 'Shaft alignment between a motor and driven equipment should be checked:',
    options: [
      'Regularly during PPM, as foundations can settle, vibration can shift alignment, and thermal growth changes the geometry',
      'Only once when the equipment is first installed, never afterwards',
      'Only when the motor is replaced, as the coupling fixes the alignment',
      'Only if the motor fails to start, as alignment has no effect when running',
    ],
    correctAnswer: 0,
    explanation:
      'Shaft alignment should be checked periodically because foundations can settle or shift, vibration can move equipment, thermal expansion under operating conditions changes geometry, and coupling wear can mask misalignment. Misaligned shafts cause excessive bearing wear, seal failure, coupling damage and increased energy consumption.',
  },
  {
    id: 5,
    question: 'The correct procedure for re-torquing busbar connections is:',
    options: [
      'Tighten each bolt as firmly as possible by hand using a standard spanner',
      "Use a calibrated torque wrench, apply the manufacturer's specified torque value, and mark the connection to confirm completion",
      'Apply a fixed torque of 50 Nm to every connection regardless of bolt size',
      'Loosen each connection slightly to relieve thermal stress before re-tightening',
    ],
    correctAnswer: 1,
    explanation:
      "Busbar connections must be torqued to the manufacturer's specification using a calibrated torque wrench. Under-torquing leaves loose connections; over-torquing can deform the conductor, damage plating, or crack the insulator. Marking the connection after torquing (e.g., with a witness mark) provides visual confirmation that the task has been completed.",
  },
  {
    id: 6,
    question: 'Air filters in electrical panel ventilation systems should be cleaned or replaced:',
    options: [
      'Only when the panel internal temperature alarm is triggered',
      'Only when the cooling fan fails completely',
      'At regular intervals as part of PPM, with frequency adjusted based on environmental conditions',
      'Only once during the lifetime of the panel, at installation',
    ],
    correctAnswer: 2,
    explanation:
      'Panel ventilation filters accumulate dust and debris, restricting airflow and causing internal temperatures to rise. In dusty environments (workshops, manufacturing), filters may need monthly cleaning. In cleaner environments (offices, data centres), quarterly may suffice. A blocked filter can raise internal panel temperatures by 10-20°C, significantly reducing the life of components.',
  },
  {
    id: 7,
    question:
      'Thermal paste (compound) is used between a power semiconductor and its heat sink to:',
    options: [
      'Electrically insulate the semiconductor from the heat sink',
      'Bond the component permanently so it cannot vibrate loose',
      'Reduce the electrical resistance of the connection',
      'Fill microscopic air gaps, improving thermal conductivity between the component and the heat sink',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal paste fills the microscopic air gaps between the flat surfaces of the semiconductor device and the heat sink. Air is a poor thermal conductor; the paste (typically silicone-based with metal oxide fillers) is much better. Without thermal paste, the component runs hotter, reducing its life and potentially causing premature failure.',
  },
  {
    id: 8,
    question: 'When greasing a motor bearing, the motor should ideally be:',
    options: [
      'Running at normal speed, so the grease is distributed immediately',
      'Stopped and left to cool for at least 24 hours first',
      'Isolated, locked off, and the bearing fully dismantled',
      'Run in reverse to push old grease out of the housing',
    ],
    correctAnswer: 0,
    explanation:
      'Best practice for motor re-greasing is to apply grease while the motor is running at normal speed. This allows the grease to be immediately distributed throughout the bearing by the rolling elements. If the motor cannot be greased while running (due to safety constraints), grease should be applied with the motor stationary, then the motor run briefly to distribute the grease before being returned to normal service.',
  },
  {
    id: 9,
    question: 'Contactor contacts that show heavy pitting and blackening should be:',
    options: [
      'Filed smooth with a fine file and returned to service',
      'Assessed for replacement — silver or silver-alloy contacts should not be filed as this removes the contact material',
      'Coated with a thin layer of grease to improve conductivity',
      'Left in place, as pitting and blackening are always normal wear',
    ],
    correctAnswer: 1,
    explanation:
      "Modern contactor contacts are made of silver or silver alloy, with only a thin layer of contact material. Filing removes this material, reducing the contact's life and potentially changing the contact geometry. Heavily pitted contacts should be replaced as a set. Minor discolouration is normal and does not require action — silver oxide is actually a conductor.",
  },
  {
    id: 10,
    question: 'Environmental considerations when disposing of used lubricants include:',
    options: [
      'Used lubricants can be poured down a foul drain once cooled',
      'Used lubricants may be mixed with general site waste in a skip',
      'Used lubricants are classified as hazardous waste and must be collected, stored and disposed of through a licensed waste carrier',
      'Used lubricants can be reused indefinitely if filtered on site',
    ],
    correctAnswer: 2,
    explanation:
      'Used lubricating oils and greases are classified as hazardous waste under the Hazardous Waste Regulations. They must be collected in suitable containers, stored in designated areas with secondary containment, and disposed of through a licensed waste carrier. Duty of care requirements under the Environmental Protection Act 1990 apply to everyone in the waste chain.',
  },
];

const faqs = [
  {
    question: 'How do I know how much grease to put in a motor bearing?',
    answer:
      'The quantity of grease depends on the bearing size. The standard formula is: Grease quantity (grams) = 0.005 x D x B, where D is the bearing outside diameter in mm and B is the bearing width in mm. For example, a bearing with OD 120 mm and width 30 mm needs approximately 0.005 x 120 x 30 = 18 grams. Many motor manufacturers also specify the quantity on the motor nameplate or in the installation manual. Always use a calibrated grease gun to ensure the correct amount is applied.',
  },
  {
    question: 'Should I use oil or grease for motor bearings?',
    answer:
      "Most standard electric motors use grease-lubricated bearings because grease is simpler to apply, seals better against contamination, and does not leak. Oil lubrication is used for high-speed motors, very high-temperature applications, or large bearings where grease cannot dissipate enough heat. If in doubt, always follow the motor manufacturer's recommendation — the bearing type and lubrication method are specified at the design stage.",
  },
  {
    question: 'What torque values should I use for busbar connections?',
    answer:
      "Torque values depend on the bolt size, conductor material and contact plating. Typical values for copper busbars with M10 bolts are 40-50 Nm, but this varies significantly with the installation. Always refer to the switchgear manufacturer's documentation for specific torque values. Using generic values risks either under-torquing (loose connection) or over-torquing (damaged conductor or insulator). A calibrated torque wrench is essential — do not estimate.",
  },
  {
    question: 'How do I check belt tension correctly?',
    answer:
      "The most common method is the deflection check: measure the span length between pulleys, then apply a perpendicular force at the midpoint. The belt should deflect approximately 1.5% of the span length per 10 N of force applied. For example, for a 1,000 mm span, the deflection should be about 15 mm under 10 N. A belt tension gauge provides more accurate and repeatable measurements. Always refer to the belt manufacturer's tensioning data for the specific belt profile.",
  },
  {
    question: 'Is it safe to clean electrical panels with compressed air?',
    answer:
      'Compressed air is generally not recommended for cleaning electrical panels because it can blow dust and debris into contacts, push contamination further into equipment, and generate static charges. If compressed air must be used, it should be at low pressure (below 2 bar), directed away from sensitive components, and used only on de-energised equipment. A vacuum cleaner with an anti-static nozzle is the preferred method for removing loose dust and debris from panels.',
  },
];

const MOETModule4Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.1 · Subsection 3"
        title="Lubrication, Cleaning and Adjustments"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Hands-on PPM techniques for bearings, contacts, belts, panels and mechanical components.
          </p>

          <TLDR
            points={[
              'Lubrication: Correct grease type, quantity and frequency prevent bearing failure.',
              'Cleaning: Dust, dirt and contamination degrade insulation and cause overheating.',
              'Adjustments: Belt tension, alignment and torque require regular checking.',
              'Environmental: Hazardous waste disposal rules apply to used lubricants.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor greasing:</strong> Calculated quantities, calibrated gun, correct
                intervals.
              </li>
              <li>
                <strong>Panel cleaning:</strong> Vacuum with anti-static nozzle, contact cleaner
                spray.
              </li>
              <li>
                <strong>Torque checking:</strong> Busbars, terminals — calibrated wrench to spec.
              </li>
              <li>
                <strong>ST1426:</strong> Practical maintenance skills are a core requirement.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Apply correct bearing lubrication techniques for electric motors',
              'Calculate grease quantities and determine re-greasing intervals',
              'Clean electrical panels and components safely using appropriate methods',
              'Check and adjust belt tension and shaft alignment',
              'Re-torque electrical connections using calibrated tools',
              'Dispose of used lubricants and cleaning materials in compliance with environmental regulations',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Bearing lubrication</ContentEyebrow>

          <ConceptBlock title="The highest-value PPM activity you can perform">
            <p>
              Bearing failure is the single most common cause of electric motor breakdown. In the
              majority of cases, the root cause is lubrication-related — either insufficient
              lubrication, excessive lubrication, contaminated lubricant, or the wrong type of
              lubricant. Getting lubrication right is one of the highest-value PPM activities a
              maintenance technician can perform.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Grease vs oil lubrication">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Factor
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Grease
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">Oil</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Application</td>
                    <td className="border border-white/10 px-3 py-2">
                      Most standard motors up to ~3,600 rpm
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      High-speed motors, very large bearings, high-temp applications
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Sealing</td>
                    <td className="border border-white/10 px-3 py-2">
                      Good — stays in the bearing housing
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Requires oil seals; risk of leakage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Contamination protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Good — grease acts as a barrier
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Moderate — requires effective sealing
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Heat dissipation</td>
                    <td className="border border-white/10 px-3 py-2">Limited</td>
                    <td className="border border-white/10 px-3 py-2">
                      Good — circulating oil removes heat
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Maintenance</td>
                    <td className="border border-white/10 px-3 py-2">
                      Periodic re-greasing via grease nipple
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Oil level checks, periodic oil changes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Grease quantity calculation">
            <p>
              The standard formula for calculating the correct grease quantity for a single
              re-greasing event is:
            </p>
            <div className="rounded bg-white/5 p-3 font-mono text-sm text-elec-yellow/90">
              G = 0.005 x D x B
            </div>
            <p>
              Where G = grease quantity in grams, D = bearing outside diameter in mm, B = bearing
              width in mm.
            </p>
            <p>
              For example, a 6310 bearing (OD 110 mm, width 27 mm): G = 0.005 x 110 x 27 = 14.9 g. A
              calibrated grease gun typically delivers a known quantity per stroke (e.g., 1.5 g per
              stroke for a standard lever gun), allowing precise application.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Over-greasing — the hidden killer">
            <p>
              Over-greasing causes more bearing failures than under-greasing. Excess grease cannot
              escape the bearing housing, creating churning resistance that generates heat. This
              heat breaks down the grease, reducing its lubricating properties, which generates more
              heat — a destructive cycle. Symptoms include elevated bearing temperature, grease
              leaking from seals, and in severe cases, grease being forced past the inner seal and
              contaminating motor windings.
            </p>
          </ConceptBlock>

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">Key point: </span>
            Never mix different grease types. Incompatible greases can react chemically, causing the
            mixture to soften excessively or harden, destroying its lubricating properties. If
            changing grease type, the old grease must be completely purged first.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Contact cleaning and thermal compound</ContentEyebrow>

          <ConceptBlock title="Contacts degrade through use">
            <p>
              Electrical contacts degrade through use. Arcing erodes contact surfaces, oxidation
              increases resistance, and contamination from dust and atmospheric pollutants creates
              insulating films. Regular cleaning and inspection of contacts is essential for
              reliable operation and safety.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Contactor and relay contacts">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Silver and silver-alloy contacts: Do not file — silver oxide is conductive; filing
                removes the thin contact material layer
              </li>
              <li>
                Copper contacts: May be lightly dressed with a fine file if heavily pitted, then
                cleaned with contact cleaner
              </li>
              <li>
                Replacement: Contacts worn to 50% of original thickness or with deep pitting should
                be replaced as a matched set
              </li>
              <li>
                Contact gap: Check against manufacturer specification — incorrect gap can cause
                chattering or failure to break
              </li>
              <li>
                Spring pressure: Weakened contact springs reduce pressure, increasing resistance and
                arcing
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Circuit breaker contacts">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                ACB and MCCB contacts: Inspect for erosion, pitting and discolouration during
                scheduled maintenance
              </li>
              <li>
                Contact resistance measurement: Use a DLRO (digital low resistance ohmmeter) to
                measure micro-ohm resistance across closed contacts
              </li>
              <li>
                Arcing chambers: Inspect and clean arc chutes; replace if cracked or heavily
                carbonised
              </li>
              <li>
                Operating mechanism: Clean, lubricate and check for correct operation per
                manufacturer&apos;s instructions
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Thermal paste application">
            <p>
              Power semiconductors (thyristors, IGBTs, diodes) in variable speed drives and power
              supplies rely on thermal paste to transfer heat to their heat sinks. During PPM, the
              condition of thermal paste should be checked and renewed if dried out or degraded.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Remove old paste completely using isopropyl alcohol and lint-free cloth</li>
              <li>Apply a thin, even layer — too much is as bad as too little</li>
              <li>Ensure mounting screws are torqued evenly to specification</li>
              <li>
                Use only the paste type specified by the manufacturer (silicone-based, metal oxide
                filled)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Belt tension, alignment and torque checking</ContentEyebrow>

          <ConceptBlock title="Three adjustments that affect reliability, energy and safety">
            <p>
              Many electrical maintenance technicians work on motor-driven systems where mechanical
              adjustments are integral to reliable operation. Belt tension, shaft alignment and
              connection torque are three critical adjustments that directly affect equipment
              reliability, energy consumption and safety.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Belt tension">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Too loose:</strong> Belt slips, generates heat, wears rapidly, power
                transmission lost
              </li>
              <li>
                <strong>Too tight:</strong> Excessive bearing load, premature bearing failure,
                increased energy use
              </li>
              <li>
                <strong>Check method:</strong> Deflection test — measure span, apply force at
                midpoint, check deflection against specification
              </li>
              <li>
                <strong>Frequency:</strong> Check tension after first 24-48 hours of running a new
                belt, then at each PPM visit
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Shaft alignment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Angular misalignment:</strong> Shaft centrelines intersect at an angle —
                causes axial vibration
              </li>
              <li>
                <strong>Parallel (offset) misalignment:</strong> Shafts are parallel but offset —
                causes radial vibration
              </li>
              <li>
                <strong>Dial indicator method:</strong> Traditional approach using clock gauges on
                coupling faces and rims
              </li>
              <li>
                <strong>Laser alignment:</strong> Modern method providing faster, more accurate
                results with digital readout
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Connection torque checking">
            <p>
              Re-torquing electrical connections is one of the most effective PPM tasks for
              preventing electrical fires. All bolted electrical connections should be checked at
              intervals determined by the installation type and operating conditions.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipment:</strong> Calibrated torque wrench (insulated for electrical
                work); correct socket/spanner
              </li>
              <li>
                <strong>Values:</strong> Refer to manufacturer&apos;s specification — typical
                values: M6 = 7-9 Nm, M8 = 18-22 Nm, M10 = 35-45 Nm, M12 = 55-70 Nm (varies with
                material)
              </li>
              <li>
                <strong>Technique:</strong> Apply torque smoothly; do not jerk. Re-torque in a star
                pattern on multi-bolt connections
              </li>
              <li>
                <strong>Recording:</strong> Mark completed connections with torque seal or witness
                mark; record in maintenance log
              </li>
              <li>
                <strong>Safety:</strong> Always work on de-energised, isolated equipment; use
                insulated tools as a secondary precaution
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Panel cleaning and environmental considerations</ContentEyebrow>

          <ConceptBlock title="Dust, dirt and contamination are the enemies of electrical equipment">
            <p>
              Dust, dirt and contamination are the enemies of electrical equipment. They reduce
              insulation resistance, block ventilation, trap moisture and can provide conductive
              paths leading to tracking and flashover. Regular cleaning is a fundamental PPM
              activity.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Panel interior cleaning">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolate first:</strong> All cleaning of panel interiors must be carried out
                on de-energised, isolated equipment
              </li>
              <li>
                <strong>Vacuum:</strong> Use a vacuum cleaner with anti-static nozzle to remove
                loose dust and debris
              </li>
              <li>
                <strong>Wipe:</strong> Clean surfaces with lint-free cloths dampened with approved
                electrical cleaner
              </li>
              <li>
                <strong>Contacts:</strong> Spray contact cleaner on relay and contactor contacts;
                allow to evaporate fully
              </li>
              <li>
                <strong>Ventilation:</strong> Clean or replace air filters; check fan operation and
                airflow
              </li>
              <li>
                <strong>Sealing:</strong> Check door seals and cable entry glands for integrity —
                gaps allow dust and vermin ingress
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Environmental compliance"
            onSite={
              <>
                The maintenance technician standard requires you to carry out maintenance tasks
                safely, using appropriate tools and materials, and to comply with environmental
                regulations including waste disposal requirements. Practical competence in
                lubrication, cleaning and adjustment is assessed during the end-point assessment.
              </>
            }
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Used lubricants:</strong> Classified as hazardous waste — collect in sealed
                containers, dispose via licensed carrier
              </li>
              <li>
                <strong>Contact cleaner:</strong> Many solvents are volatile organic compounds
                (VOCs) — use in ventilated areas, dispose of empty cans correctly
              </li>
              <li>
                <strong>Contaminated cloths:</strong> Oil-soaked rags are a fire hazard and
                hazardous waste — store in metal lidded containers
              </li>
              <li>
                <strong>COSHH:</strong> All cleaning chemicals require COSHH assessments; safety
                data sheets must be available
              </li>
              <li>
                <strong>Waste documentation:</strong> Hazardous waste consignment notes must be
                completed for each collection
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="Grease quantity formula"
            points={[
              'G = 0.005 x D x B (grams).',
              'D = bearing outside diameter (mm).',
              'B = bearing width (mm).',
              'Use calibrated grease gun.',
              'Never mix grease types.',
            ]}
          />

          <KeyTakeaways
            title="Torque check process"
            points={[
              'Isolate and lock off.',
              'Use calibrated torque wrench.',
              "Apply manufacturer's specified torque.",
              'Star pattern on multi-bolt joints.',
              'Apply witness mark and record.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section1-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Maintenance Scheduling and Records
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section1-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Electrical Inspection Routines
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section1_3;
