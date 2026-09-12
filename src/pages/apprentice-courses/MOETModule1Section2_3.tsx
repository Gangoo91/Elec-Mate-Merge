/**
 * MOET · Module 1 · Section 1.2 · Subsection 3 — Personal Protective Equipment
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Work environment hazards and risks. Risk assessments."
 *              · "Safe systems of work."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Personal Protective Equipment (PPE) - MOET Module 1.2.3';
const DESCRIPTION =
  'Comprehensive guide to PPE for electrical maintenance: PPE Regulations 2022, hierarchy of controls, insulating gloves, arc flash suits, selection criteria, inspection schedules, CE/UKCA marking and employer duties under EAWR 1989.';

const quickCheckQuestions = [
  {
    id: 'hierarchy-ppe',
    question: 'Where does PPE sit in the hierarchy of controls?',
    options: [
      'Second — after elimination but before engineering controls',
      'First — it should be the primary control measure',
      'Last — it is the final line of defence when other controls are insufficient',
      'It can be used at any level as a substitute for other controls',
    ],
    correctIndex: 2,
    explanation:
      'PPE is the LAST resort in the hierarchy of controls: elimination, substitution, engineering controls, administrative controls, and finally PPE. It is the least effective control because it only protects the individual wearing it and depends on correct selection, fit, use and maintenance. Employers must always consider higher-level controls first.',
  },
  {
    id: 'glove-classes',
    question:
      'Which class of insulating glove is rated for use on low voltage systems up to 1000 V AC?',
    options: ['Class 2', 'Class 1', 'Class 00', 'Class 0'],
    correctIndex: 3,
    explanation:
      'Class 0 insulating gloves are rated for a maximum use voltage of 1000 V AC (1500 V DC) and are the standard choice for low voltage electrical work. Class 00 is rated to 500 V AC, while Classes 1 through 4 are for progressively higher voltages up to 36,000 V AC (Class 4). Always check the voltage rating matches or exceeds the system voltage.',
  },
  {
    id: 'arc-flash-cat2',
    question: 'Category 2 arc flash PPE must have an arc rating of at least:',
    options: ['4 cal/cm²', '8 cal/cm²', '25 cal/cm²', '40 cal/cm²'],
    correctIndex: 1,
    explanation:
      'Category 2 arc flash PPE must have a minimum arc rating of 8 cal/cm². Category 1 requires 4 cal/cm², Category 3 requires 25 cal/cm² and Category 4 requires 40 cal/cm². The required category is determined by the incident energy calculation for the specific equipment and working distance.',
  },
  {
    id: 'ppe-employer-duty',
    question:
      'Under the Personal Protective Equipment at Work Regulations 2022, who is responsible for providing PPE to workers?',
    options: [
      'The worker must provide their own PPE',
      'The employer must provide suitable PPE free of charge',
      'PPE costs are shared equally between employer and worker',
      'The client whose premises the work is carried out on',
    ],
    correctIndex: 1,
    explanation:
      'The PPE at Work Regulations 2022 require the employer to provide suitable PPE free of charge where risks cannot be adequately controlled by other means. This was extended in 2022 to cover limb (b) workers (those who are not employees but work under a contract personally to do work). The employer must also ensure PPE is maintained, replaced and stored correctly.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The hierarchy of controls, in the correct order from most to least effective, is:',
    options: [
      'PPE, administrative controls, engineering controls, substitution, elimination',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Risk assessment, method statement, PPE, monitoring, review',
      'Engineering controls, elimination, PPE, substitution, administrative controls',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy of controls runs from most effective to least effective: (1) Elimination — remove the hazard entirely, (2) Substitution — replace with a less hazardous alternative, (3) Engineering controls — physical barriers, interlocks, ventilation, (4) Administrative controls — procedures, training, signage, (5) PPE — personal protective equipment as the last resort.',
  },
  {
    id: 2,
    question: 'Insulating gloves for electrical work must comply with:',
    options: [
      'BS EN 397 (industrial safety helmets)',
      'BS EN 166 (personal eye protection)',
      'BS EN 60903 (live working — insulating gloves)',
      'BS EN ISO 20345 (safety footwear)',
    ],
    correctAnswer: 2,
    explanation:
      'Insulating gloves for electrical work must comply with BS EN 60903 (IEC 60903), which specifies requirements for insulating gloves and mitts for live working. The standard defines six classes (00 to 4) based on the maximum use voltage, and requires each glove to be individually tested. Additional standards may apply for mechanical protection (leather over-gloves are usually worn over insulating gloves).',
  },
  {
    id: 3,
    question: 'How often should Class 0 insulating gloves be electrically retested?',
    options: ['Every 12 months', 'Every month', 'Only when visually damaged', 'Every 6 months'],
    correctAnswer: 3,
    explanation:
      'BS EN 60903 and industry best practice recommend that insulating gloves are electrically retested at intervals not exceeding 6 months. Some organisations test more frequently (e.g., every 3 months for daily-use gloves). Between formal electrical tests, gloves should be visually inspected and air-tested (inflated to check for pinholes) before each use.',
  },
  {
    id: 4,
    question: 'An arc flash face shield or hood visor must be rated to protect against:',
    options: [
      'Ultraviolet radiation, infrared radiation, molten metal splash and the thermal energy of the arc',
      'Flying debris and dust only, as in general construction work',
      'Chemical splash and corrosive liquids encountered in laboratories',
      'Impact from falling objects, the same as a standard hard hat',
    ],
    correctAnswer: 0,
    explanation:
      'Arc flash face protection must guard against the full range of arc flash hazards: intense UV and IR radiation (which can cause flash burns and eye damage), molten metal droplets projected by the arc blast, and the thermal energy of the arc itself. The visor must have an arc rating (cal/cm²) that matches or exceeds the incident energy of the task.',
  },
  {
    id: 5,
    question: 'Safety footwear for electrical work should be:',
    options: [
      'Standard steel toe-cap boots with metal eyelets and studs',
      'Electrically insulating (EH-rated) safety boots with composite toe caps',
      'Lightweight trainers with reinforced toes for better dexterity',
      'Conductive (anti-static) boots to drain charge to earth',
    ],
    correctAnswer: 1,
    explanation:
      'Safety footwear for electrical work should be EH-rated (Electrical Hazard) with insulating soles to reduce the risk of a current path through the feet to earth. Composite (non-metallic) toe caps are preferred over steel toe caps for electrical work because they do not provide a conductive path. Boots should also meet BS EN ISO 20345 for general workplace safety.',
  },
  {
    id: 6,
    question: 'The ATPV rating of an arc flash garment indicates:',
    options: [
      'The maximum voltage the garment can be exposed to before it conducts',
      'The number of wash cycles the garment can withstand before disposal',
      'The incident energy level at which there is a 50% probability of a second-degree burn through the fabric',
      'The maximum ambient temperature at which the garment may be worn',
    ],
    correctAnswer: 2,
    explanation:
      "ATPV (Arc Thermal Performance Value) is the incident energy (in cal/cm²) at which there is a 50% probability that the wearer will sustain the onset of a second-degree burn through the fabric. It is the primary rating used to match garment protection to the calculated incident energy of the task. The garment's arc rating must exceed the calculated incident energy.",
  },
  {
    id: 7,
    question: 'Under the PPE at Work Regulations 2022, a key change from the 1992 regulations was:',
    options: [
      'Workers became responsible for buying their own PPE',
      'Arc flash suits were made compulsory for all electrical work',
      'Insulating gloves no longer required periodic retesting',
      "The duty to provide PPE was extended to cover 'limb (b) workers' — those personally performing work under a contract",
    ],
    correctAnswer: 3,
    explanation:
      "The 2022 update extended the duty to provide PPE to 'limb (b) workers' — individuals who personally perform work under a contract but are not employees (e.g., some agency workers, casual workers). Previously, only employees were covered. This brought the UK in line with the broader intention of the original EU PPE Directive.",
  },
  {
    id: 8,
    question: 'A hard hat (safety helmet) worn for electrical work should be:',
    options: [
      'An electrically insulated safety helmet tested to withstand electrical contact',
      'A standard helmet with metal ventilation slots for cooling',
      'Any bump cap, as full helmets are not needed indoors',
      'A conductive helmet that bonds the wearer to earth',
    ],
    correctAnswer: 0,
    explanation:
      'Safety helmets for electrical work should be electrically insulated and tested for electrical resistance. BS EN 397 includes an optional requirement for electrical insulation (tested at 440 V AC). BS EN 50365 specifies helmets for use in low voltage installations (up to 1000 V AC). Metal components (such as ventilation systems) should be avoided as they can provide a conductive path.',
  },
  {
    id: 9,
    question: 'Before using insulating gloves, a user should perform which daily check?',
    options: [
      'A full laboratory dielectric proof test to the glove class voltage',
      "Inflate each glove by rolling from the cuff and check for air leaks (the 'air test')",
      'Measure the resistance across the glove with an insulation tester',
      'Soak the gloves in water and check for bubbles forming',
    ],
    correctAnswer: 1,
    explanation:
      'The air test (or inflation test) is the standard daily pre-use check for insulating gloves. Roll the cuff towards the fingers to trap air inside the glove, then squeeze gently while listening and feeling for air leaks. Any leak indicates a pinhole or crack in the insulation, and the glove must be withdrawn from service immediately. This simple test can detect defects that are invisible to the naked eye.',
  },
  {
    id: 10,
    question: 'CE and UKCA markings on PPE indicate that:',
    options: [
      'The PPE was manufactured within the United Kingdom',
      'The PPE has passed its most recent periodic retest',
      'The product conforms to the essential health and safety requirements of the relevant regulations',
      'The PPE is suitable for the highest arc flash category',
    ],
    correctAnswer: 2,
    explanation:
      'CE marking (for EU/Northern Ireland market) and UKCA marking (for Great Britain market) indicate that the PPE conforms to the essential health and safety requirements set out in the PPE Regulation (EU) 2016/425 or UK PPE Regulations. The manufacturer declares conformity based on testing by a Notified Body (for Category II and III PPE). These markings are a legal requirement for placing PPE on the market.',
  },
  {
    id: 11,
    question: 'Which of the following is NOT a recognised reason for replacing arc flash PPE?',
    options: [
      'The garment has been exposed to an arc flash event',
      'The fabric shows signs of wear, thinning or contamination',
      'The arc rating label is no longer legible',
      'The garment has been washed more than 10 times',
    ],
    correctAnswer: 3,
    explanation:
      "Arc flash garments should be replaced after exposure to an arc event (even if no visible damage), when the fabric shows wear, thinning, holes or contamination with flammable substances, and when labelling is no longer legible (as the arc rating cannot be confirmed). The number of washes alone is not a replacement criterion — quality arc-rated garments are designed to withstand industrial laundering. However, follow the manufacturer's care instructions to maintain the arc rating.",
  },
  {
    id: 12,
    question:
      'When working on a 400 V three-phase distribution board, the MINIMUM PPE should include:',
    options: [
      'Arc-rated clothing, face shield, insulating gloves (Class 0), safety boots and hard hat',
      'Safety glasses and standard work gloves only',
      'A high-visibility vest and steel toe-cap boots',
      'Class 4 insulating gloves rated to 36,000 V',
    ],
    correctAnswer: 0,
    explanation:
      'Work on a 400 V three-phase distribution board presents both shock and arc flash hazards. Minimum PPE should include arc-rated clothing appropriate to the calculated incident energy, arc-rated face shield or hood, insulating gloves (Class 0 minimum for LV), safety boots with insulating soles, and a safety helmet where overhead hazards exist. The specific PPE level depends on the arc flash risk assessment for the equipment.',
  },
];

const faqs = [
  {
    question: 'Do I need arc flash PPE for working on a domestic consumer unit?',
    answer:
      "The requirement depends on the risk assessment. Domestic consumer units typically have lower available fault currents, but arc flash can still occur — particularly at the main switch or incoming supply. Many employers now require at minimum an arc-rated face shield and Category 1 or 2 arc-rated clothing for any work where there is a risk of an arc flash, including domestic work near the incoming supply. Always follow your employer's PPE policy.",
  },
  {
    question: 'Can I use leather gloves instead of insulating gloves for electrical work?',
    answer:
      'No. Leather gloves are not rated for electrical insulation and will not protect against electric shock. However, leather over-gloves are worn OVER insulating gloves to provide mechanical protection — preventing cuts, abrasion and punctures that could damage the insulating glove underneath. The combination of insulating glove plus leather over-glove provides both electrical and mechanical protection.',
  },
  {
    question: 'How should I store insulating gloves when not in use?',
    answer:
      'Store insulating gloves in a clean, dry, cool location away from direct sunlight, ozone sources (such as electric motors) and chemicals. Keep them in their protective bag or canister in their natural shape — do not fold, compress or stack heavy objects on them. UV radiation and ozone degrade rubber, reducing the insulating properties. Inspect gloves before each use and conduct the air test.',
  },
  {
    question: "Is a 'flash guard' the same as a full arc flash suit?",
    answer:
      "No. A flash guard (or arc-rated balaclava/face shield combination) provides head and face protection but is only part of the overall arc flash PPE system. A full arc flash suit (sometimes called a 'switching suit' or 'bomb suit') is a complete head-to-toe protective system including hood with visor, jacket, trousers (or coverall), gloves and boot covers. The full suit is required for Category 3 and 4 arc flash hazards where incident energy exceeds 25 cal/cm².",
  },
  {
    question: 'What is the difference between UKCA and CE marking on PPE?',
    answer:
      'CE marking is the European conformity mark required for products placed on the EU market (and Northern Ireland under the Windsor Framework). UKCA (UK Conformity Assessed) is the equivalent mark for products placed on the Great Britain market. Both indicate that the PPE meets the essential health and safety requirements. Currently, CE-marked PPE can still be sold in Great Britain under transitional arrangements, but UKCA marking will eventually become the sole requirement.',
  },
];

const MOETModule1Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.2 · Subsection 3"
        title="Personal Protective Equipment (PPE)"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Selection, use, inspection and maintenance of PPE for electrical maintenance work.
          </p>

          <TLDR
            points={[
              'Hierarchy: PPE is the LAST resort — after all other controls',
              'Gloves: Class 00-4 insulating gloves (BS EN 60903)',
              'Arc flash: CAT 1-4 rated suits, hoods and visors',
              'Duty: employer provides free of charge (PPE Regs 2022)',
            ]}
          />

          <ConceptBlock title="Key standards at a glance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 60903:</strong> Insulating gloves for live working
              </li>
              <li>
                <strong>NFPA 70E / IEEE 1584:</strong> Arc flash PPE categories
              </li>
              <li>
                <strong>PPE Regulations 2022:</strong> Employer duties and worker coverage
              </li>
              <li>
                <strong>CE/UKCA marking:</strong> Product conformity for UK/EU market
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the hierarchy of controls and why PPE is the last resort',
              'Identify the types of PPE required for electrical maintenance work',
              'Select the correct class of insulating glove for LV and HV work',
              'Describe arc flash PPE categories (CAT 1-4) and ATPV/EBT ratings',
              'Carry out inspection, testing and replacement of electrical PPE',
              'State employer duties under the PPE at Work Regulations 2022',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>PPE as last resort</ContentEyebrow>

          <ConceptBlock title="The Hierarchy of Controls — PPE as Last Resort">
            <p>
              The hierarchy of controls is a fundamental principle of risk management established in
              the Management of Health and Safety at Work Regulations 1999 and reinforced by BS 7671
              and HSG85. It requires that control measures are applied in order of effectiveness,
              starting with the most effective (elimination) and descending to the least effective
              (PPE). PPE is always the last line of defence — it should never be the primary control
              measure.
            </p>
            <p>
              For electrical maintenance work, this means that the first consideration must always
              be whether the work can be done with the circuit dead (elimination of the electrical
              hazard). If dead working is not possible, engineering controls (barriers, insulation,
              reduced voltage) and administrative controls (safe systems of work, permits, competent
              persons) must be applied before PPE is considered.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The Five Levels — Applied to Electrical Work">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Elimination:</strong> Work dead — isolate and prove dead before starting
                work. This completely removes the electrical hazard (EAWR Reg 12)
              </li>
              <li>
                <strong>2. Substitution:</strong> Use a reduced voltage supply (e.g., 110 V CTE for
                portable tools instead of 230 V). Use SELV where possible
              </li>
              <li>
                <strong>3. Engineering controls:</strong> Install barriers, shrouds, insulating
                covers over live parts. Use interlocked switchgear. Apply temporary insulation
              </li>
              <li>
                <strong>4. Administrative controls:</strong> Permit to work systems, safe systems of
                work, method statements, competence requirements, accompaniment, warning signs
              </li>
              <li>
                <strong>5. PPE:</strong> Insulating gloves, arc flash suits, face shields, safety
                boots, helmets — protecting the individual worker when residual risk remains
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Why PPE is the least effective control"
            whatHappens={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                <li>
                  <strong>Single point of failure:</strong> If the PPE fails, is damaged or is
                  incorrectly used, the worker is immediately exposed to the full hazard
                </li>
                <li>
                  <strong>Individual protection only:</strong> PPE protects only the person wearing
                  it — other workers in the area may be unprotected
                </li>
                <li>
                  <strong>Human factors:</strong> PPE depends on the worker selecting it correctly,
                  putting it on properly, wearing it consistently and maintaining it
                </li>
                <li>
                  <strong>Comfort and compliance:</strong> PPE can be uncomfortable, hot and
                  restrictive, leading to non-compliance particularly on long tasks
                </li>
                <li>
                  <strong>False sense of security:</strong> Wearing PPE can lead workers to take
                  greater risks, believing they are fully protected
                </li>
              </ul>
            }
            doInstead={
              <>
                If you find yourself relying entirely on PPE for protection, the risk assessment
                should be reviewed. There should always be other control measures in place alongside
                PPE to create a layered defence.
              </>
            }
          />

          <ConceptBlock title="PPE at Work Regulations 2022 — Key Requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Employer duty:</strong> Provide suitable PPE free of charge where risks
                cannot be controlled by other means
              </li>
              <li>
                <strong>Suitability assessment:</strong> PPE must be suitable for the risk, the user
                and the working conditions
              </li>
              <li>
                <strong>Compatibility:</strong> Where multiple PPE items are worn together, they
                must be compatible (e.g., safety helmet with arc flash visor)
              </li>
              <li>
                <strong>Maintenance:</strong> Employer must ensure PPE is maintained, repaired or
                replaced as necessary
              </li>
              <li>
                <strong>Storage:</strong> Appropriate storage must be provided to keep PPE in good
                condition
              </li>
              <li>
                <strong>Training:</strong> Workers must be instructed and trained in the use,
                storage and maintenance of PPE
              </li>
              <li>
                <strong>Worker duty:</strong> Workers must use PPE as instructed and report any
                defects or loss
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Insulating gloves</ContentEyebrow>

          <ConceptBlock title="Insulating Gloves for Electrical Work">
            <p>
              Insulating gloves are the most critical item of PPE for electrical work. They provide
              a barrier between the worker&apos;s hands and live conductors, preventing current from
              flowing through the body. The selection, use, testing and storage of insulating gloves
              must follow strict procedures, as any failure in the glove&apos;s insulation can
              result in fatal electric shock.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Insulating Glove Classes (BS EN 60903)"
            headers={[
              'Class',
              'Max Use Voltage (AC)',
              'Max Use Voltage (DC)',
              'Proof Test Voltage (AC)',
              'Typical Application',
            ]}
            rows={[
              ['Class 00', '500 V', '750 V', '2,500 V', 'Low voltage work up to 500 V'],
              ['Class 0', '1,000 V', '1,500 V', '5,000 V', 'Standard LV work (230/400 V)'],
              ['Class 1', '7,500 V', '11,250 V', '10,000 V', 'HV distribution up to 7.5 kV'],
              ['Class 2', '17,000 V', '25,500 V', '20,000 V', 'HV distribution up to 17 kV'],
              ['Class 3', '26,500 V', '39,750 V', '30,000 V', 'HV transmission up to 26.5 kV'],
              ['Class 4', '36,000 V', '54,000 V', '40,000 V', 'HV transmission up to 36 kV'],
            ]}
          />

          <ConceptBlock title="Inspection, Testing and Replacement">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Before each use — visual inspection:</strong> Check for cuts, punctures,
                embedded objects, swelling, softening, hardening, sticky patches or discolouration
              </li>
              <li>
                <strong>Before each use — air test:</strong> Roll the cuff towards the fingers to
                trap air, squeeze gently and check for leaks. Any leak means immediate withdrawal
              </li>
              <li>
                <strong>Every 6 months — electrical retest:</strong> Laboratory dielectric test to
                the proof voltage for the glove class. Must be carried out by an approved test
                facility
              </li>
              <li>
                <strong>Immediate withdrawal if:</strong> Exposed to an electrical fault, mechanical
                damage, chemical contamination, excessive heat, or any visible defect
              </li>
              <li>
                <strong>Shelf life:</strong> Even unused gloves have a limited shelf life. Most
                manufacturers recommend a maximum of 12 months from date of test, whether used or
                not
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Storage Requirements"
            onSite="Always wear leather over-gloves on top of insulating gloves during practical work. The leather protects the insulating rubber from cuts, punctures and abrasion. The combination provides both electrical insulation and mechanical protection."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Store in protective canvas bag or purpose-made canister — natural shape, not folded
              </li>
              <li>
                Keep away from direct sunlight, UV sources, ozone (electric motors, generators)
              </li>
              <li>Store at room temperature — avoid extremes of heat or cold</li>
              <li>Keep away from oils, solvents, chemicals and sharp objects</li>
              <li>
                Do not store with leather over-gloves inside the insulating gloves (moisture trap)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Arc flash PPE</ContentEyebrow>

          <ConceptBlock title="Arc Flash PPE and Thermal Protection">
            <p>
              Arc flash PPE is designed to protect against the thermal energy, radiant heat, UV
              radiation, molten metal and blast effects of an electrical arc. The required level of
              protection is determined by an arc flash risk assessment, which calculates the
              incident energy at the working distance for the specific equipment. Arc flash PPE is
              categorised into four levels, each providing progressively greater protection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Arc Flash PPE Categories — Detailed Requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category 1 (4 cal/cm²):</strong> Single layer arc-rated shirt and trousers,
                safety glasses, hearing protection, leather gloves. Typical for low-energy LV work
                at distance
              </li>
              <li>
                <strong>Category 2 (8 cal/cm²):</strong> Arc-rated shirt and trousers, arc-rated
                face shield with balaclava, hearing protection, leather gloves, safety boots.
                Standard for most LV distribution work
              </li>
              <li>
                <strong>Category 3 (25 cal/cm²):</strong> Arc flash suit (coverall or
                jacket/trousers) with arc-rated hood and face shield visor, arc-rated gloves,
                leather work boots. Required for higher-energy LV and lower-energy HV work
              </li>
              <li>
                <strong>Category 4 (40 cal/cm²):</strong> Multi-layer arc flash suit with arc-rated
                hood and visor, heavy-duty arc-rated gloves, leather boots with arc-rated gaiters.
                Required for high-energy HV switchgear work
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ATPV and EBT — Understanding Arc Ratings">
            <p>
              Every arc-rated garment is tested and assigned an arc rating based on two criteria:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ATPV (Arc Thermal Performance Value):</strong> The incident energy at which
                there is a 50% probability of the onset of a second-degree burn THROUGH the intact
                fabric. The fabric provides thermal protection but does not break open
              </li>
              <li>
                <strong>EBT (Energy Breakopen Threshold):</strong> The incident energy at which
                there is a 50% probability the fabric will break open, directly exposing the skin to
                the arc. This is typically a lower value than ATPV
              </li>
              <li>
                <strong>Arc Rating:</strong> The lower of ATPV and EBT. This is the value used to
                select PPE — it must equal or exceed the calculated incident energy for the task
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Arc Flash PPE Components">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Arc-rated shirt and trousers (or coverall)</li>
              <li>Arc-rated face shield or hood with visor</li>
              <li>Arc-rated balaclava for neck and chin protection</li>
              <li>Arc-rated gloves (leather or arc-specific)</li>
              <li>Safety boots with insulating soles</li>
              <li>Hard hat (electrically rated)</li>
              <li>Hearing protection (earplugs or arc-rated ear muffs)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="What NOT to Wear">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Synthetic fabrics (polyester, nylon) — melt onto skin</li>
              <li>Loose clothing that could catch in equipment</li>
              <li>Metal jewellery, watches, piercings — conductive</li>
              <li>Standard safety glasses without side shields</li>
              <li>Metal-framed spectacles near live parts</li>
              <li>Non-arc-rated clothing under arc flash PPE</li>
              <li>Clothing contaminated with oil or grease (flammable)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Maintenance and Care of Arc Flash PPE"
            onSite="Natural fibre clothing (100% cotton) does not melt like synthetics and can provide limited thermal protection, but it is NOT arc-rated and should not be relied upon as arc flash protection. Only garments specifically tested and rated to a recognised standard (ASTM F1506, IEC 61482-2) provide verified arc protection."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Laundering:</strong> Follow manufacturer&apos;s instructions. Industrial
                laundering at specified temperatures. Do not use bleach or fabric softener — these
                can degrade arc-rated properties
              </li>
              <li>
                <strong>Inspection:</strong> Check for tears, thinning, holes, contamination and
                legible labelling before each use
              </li>
              <li>
                <strong>Replacement:</strong> After any arc flash exposure (even without visible
                damage), when fabric shows wear or thinning, or when labels are illegible
              </li>
              <li>
                <strong>Repairs:</strong> Only repairs using arc-rated materials and approved
                methods. Standard patches or stitching will create a weak point
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Other PPE and selection</ContentEyebrow>

          <ConceptBlock title="Other Electrical PPE, Selection Criteria and CE/UKCA Marking">
            <p>
              Beyond insulating gloves and arc flash clothing, electrical maintenance technicians
              require a range of additional PPE items. Each must be selected to match the specific
              hazards of the task, correctly fitted to the individual, and maintained in serviceable
              condition. All PPE placed on the UK market must carry the appropriate conformity
              marking.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Additional PPE for Electrical Work"
            headers={['PPE Item', 'Standard', 'Purpose', 'Inspection']}
            rows={[
              [
                'Safety helmet',
                'BS EN 397 / BS EN 50365',
                'Head protection; electrical insulation',
                'Check shell, harness, chin strap. Replace if cracked, UV-damaged or impacted',
              ],
              [
                'Safety boots',
                'BS EN ISO 20345 (EH rated)',
                'Insulating soles; toe protection',
                'Check soles, stitching, toe cap. Replace if sole separation or wear-through',
              ],
              [
                'Safety glasses',
                'BS EN 166',
                'Eye protection from debris and flash',
                'Clean lenses, check for scratches and frame integrity',
              ],
              [
                'Face shield',
                'BS EN 166 / arc rated',
                'Full face protection from arc flash',
                'Check visor for cracks, crazing or discolouration. Replace after arc exposure',
              ],
              [
                'Hearing protection',
                'BS EN 352',
                'Protection from arc flash noise (up to 160 dB)',
                'Check seal, cushions, headband tension',
              ],
              [
                'Insulating matting',
                'BS EN 61111',
                'Floor insulation in front of switchgear',
                'Check for cuts, punctures, contamination. Periodic dielectric test',
              ],
            ]}
          />

          <ConceptBlock title="PPE Selection Criteria">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard matching:</strong> PPE must be rated for the specific hazard —
                voltage level, incident energy, mechanical hazards present
              </li>
              <li>
                <strong>Correct sizing:</strong> Ill-fitting PPE is dangerous — gloves that are too
                large reduce dexterity, boots that are too small cause fatigue
              </li>
              <li>
                <strong>Compatibility:</strong> All PPE items must work together — e.g., face shield
                must fit with hard hat, gloves must not interfere with tool use
              </li>
              <li>
                <strong>Comfort and wearability:</strong> If PPE is uncomfortable, it will not be
                worn consistently. Select the most comfortable option that meets the safety
                requirement
              </li>
              <li>
                <strong>Environment:</strong> Consider temperature, humidity, confined spaces and
                the duration of wear. Breathable fabrics reduce heat stress
              </li>
              <li>
                <strong>Dexterity:</strong> Electrical work requires fine motor skills. Select
                gloves that provide adequate protection without excessive loss of dexterity
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CE and UKCA Marking"
            onSite="The maintenance technician standard requires you to select, use and maintain appropriate PPE for the task. You must demonstrate understanding of why PPE is the last resort, how to inspect it, and when to replace it. This is assessed through practical observation during your End-Point Assessment."
          >
            <p>
              All PPE sold in the UK must carry the appropriate conformity marking as evidence that
              it meets the essential health and safety requirements of the PPE Regulation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category I (simple PPE):</strong> Low-risk protection (e.g., gardening
                gloves). Self-certified by manufacturer
              </li>
              <li>
                <strong>Category II (intermediate PPE):</strong> Most general-purpose PPE (e.g.,
                safety glasses, hard hats, general work gloves). Requires EU-type examination by a
                Notified Body
              </li>
              <li>
                <strong>Category III (complex PPE):</strong> Protection against mortal danger or
                irreversible health damage (e.g., insulating gloves, arc flash suits, fall
                protection). Requires EU-type examination AND ongoing production quality assurance
                by a Notified Body
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            title="Quick reference"
            points={[
              'Insulating glove classes: Class 00 — 500 V AC max; Class 0 — 1,000 V AC max (standard LV); Class 1 — 7,500 V AC max; Class 2 — 17,000 V AC max; Class 3 — 26,500 V AC max; Class 4 — 36,000 V AC max.',
              'Key references: PPE at Work Regulations 2022; BS EN 60903 — insulating gloves; NFPA 70E / IEEE 1584 — arc flash; BS EN 61111 — insulating matting; ST1426 — maintenance technician KSBs.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Personal protective equipment knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Safe Use of Tools and Test Equipment
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Approach Distances
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section2_3;
