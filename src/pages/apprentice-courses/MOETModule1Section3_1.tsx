/**
 * MOET · Module 1 · Section 1.3 · Subsection 1 — Hazard Identification
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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Hazard Identification - MOET Module 1 Section 3.1';
const DESCRIPTION =
  'Comprehensive guide to hazard identification for electrical maintenance technicians: hazard vs risk, workplace inspection techniques, hazard categories, electrical hazards, reporting systems, near-miss reporting and toolbox talks.';

const quickCheckQuestions = [
  {
    id: 'hazard-vs-risk',
    question: 'What is the key difference between a hazard and a risk?',
    options: [
      'A hazard is the likelihood of harm; a risk is the thing that causes it',
      'A hazard is something with the potential to cause harm; a risk is the likelihood and severity of that harm occurring',
      'A hazard applies only to electrical work; a risk applies to all work',
      'There is no practical difference; the two terms mean the same thing',
    ],
    correctIndex: 1,
    explanation:
      'A hazard is anything with the potential to cause harm — for example, an exposed live conductor. A risk is the combination of how likely it is that someone will be harmed by the hazard and how severe that harm could be. Understanding this distinction is fundamental to effective risk assessment under the Management of Health and Safety at Work Regulations 1999.',
  },
  {
    id: 'hazard-categories',
    question:
      'Which of the following is an example of an ergonomic hazard in electrical maintenance?',
    options: [
      'Repetitive strain from pulling cables through conduit over extended periods',
      'Inhaling solvent fumes while cleaning switchgear contacts',
      'Electric shock from contact with an exposed live conductor',
      'Legionella bacteria present in a water-cooled cooling system',
    ],
    correctIndex: 0,
    explanation:
      "Ergonomic hazards relate to the physical demands of work and the body's ability to cope. Repetitive cable pulling, working in awkward postures inside ceiling voids, and prolonged overhead work are all ergonomic hazards common in electrical maintenance. The other options describe chemical, electrical and biological hazards respectively.",
  },
  {
    id: 'near-miss-reporting',
    question: 'Why is near-miss reporting important in a workplace safety system?',
    options: [
      'They satisfy the legal duty to report all incidents to the HSE',
      'Near-misses identify hazards and weaknesses in controls before someone is actually harmed',
      'They provide a record of who was at fault for an incident',
      'They are required before a permit to work can be issued',
    ],
    correctIndex: 1,
    explanation:
      'Near-miss reporting is a proactive safety tool. Research shows that for every serious injury, there are hundreds of near-misses. By reporting and investigating near-misses, organisations can identify hazards and control failures before they result in actual harm. Not all near-misses are RIDDOR-reportable — but all should be recorded and reviewed internally.',
  },
  {
    id: 'inspection-technique',
    question:
      'During a workplace inspection for hazard identification, what is the most effective approach?',
    options: [
      'Walk the work area systematically, using a checklist and noting observed conditions',
      'Rely on the site induction briefing to cover all hazards present',
      'Review the drawings and previous risk assessments without visiting the area',
      'Ask the client to confirm verbally that the area is safe to work in',
    ],
    correctIndex: 0,
    explanation:
      'Effective hazard identification requires a systematic, physical walk-through of the work area and its surroundings. Using a structured checklist ensures no hazard category is overlooked. Drawing reviews and client discussions are useful supplements, but they cannot replace direct observation of actual site conditions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Management of Health and Safety at Work Regulations 1999, a 'hazard' is defined as:",
    options: [
      'The chance that someone will be injured at work',
      'Something with the potential to cause harm',
      'A situation where PPE is not being worn',
      'Any substance classified as dangerous under COSHH',
    ],
    correctAnswer: 1,
    explanation:
      "The Regulations define a hazard as anything with the potential to cause harm. This broad definition encompasses physical objects, substances, activities, conditions and situations. The likelihood and severity of that harm being realised is the 'risk'.",
  },
  {
    id: 2,
    question:
      'Which of the following is a chemical hazard that an electrical maintenance technician might encounter?',
    options: [
      'Noise from a diesel generator',
      'Working at height on a scaffold tower',
      'Solvents used for cleaning switchgear contacts',
      'Manual handling of a heavy transformer',
    ],
    correctAnswer: 2,
    explanation:
      'Solvents and cleaning agents used during switchgear maintenance are chemical hazards. They may be harmful if inhaled, cause skin irritation, or present a fire risk. These must be identified and controlled under COSHH Regulations 2002. The other options represent physical, physical (noise) and ergonomic hazards respectively.',
  },
  {
    id: 3,
    question: 'Damaged insulation on a cable is classified as which type of hazard?',
    options: ['Psychological hazard', 'Ergonomic hazard', 'Biological hazard', 'Electrical hazard'],
    correctAnswer: 3,
    explanation:
      'Damaged cable insulation is an electrical hazard because it exposes conductors that could cause electric shock or arc flash if contacted. Identifying degraded insulation during visual inspections is a critical skill for maintenance technicians — it should be recorded, reported and rectified before any work proceeds.',
  },
  {
    id: 4,
    question: 'A toolbox talk is best described as:',
    options: [
      'A short, focused briefing delivered at the point of work covering specific hazards and controls',
      'A formal written risk assessment signed off by the responsible person before work starts',
      'An annual classroom course covering the whole of the site safety policy',
      'The site register in which accidents and near misses are recorded',
    ],
    correctAnswer: 0,
    explanation:
      "A toolbox talk is a short, practical safety briefing — typically 10 to 15 minutes — delivered at or near the work area. It focuses on specific hazards relevant to the day's tasks and reinforces safe working practices. Toolbox talks are an administrative control and a key part of site safety communication, though they are not a statutory requirement in themselves.",
  },
  {
    id: 5,
    question:
      'When carrying out a workplace inspection for hazard identification, which of the following should you do FIRST?',
    options: [
      'Begin work immediately and identify hazards as you encounter them',
      'Review existing documentation such as site plans, previous risk assessments and incident reports',
      'Issue a permit to work covering the whole area',
      'Photograph the work area before doing anything else',
    ],
    correctAnswer: 1,
    explanation:
      'Before physically inspecting the work area, you should review existing documentation. Previous risk assessments, site plans, maintenance records and incident reports provide context and help you identify hazards that may not be immediately visible. This desktop review informs the subsequent physical inspection.',
  },
  {
    id: 6,
    question: 'Water ingress into an electrical panel presents which combination of hazards?',
    options: [
      'Manual handling and ergonomic strain only',
      'A chemical hazard from the water itself',
      'Electrical (shock/short circuit) and fire (tracking/arcing)',
      'A biological hazard only, from contaminated water',
    ],
    correctAnswer: 2,
    explanation:
      'Water in an electrical panel creates an immediate electrical hazard — it can cause short circuits, tracking across insulation surfaces, and arc faults. Water also increases the risk of corrosion, which degrades connections and can lead to overheating and fire. This is a serious combined hazard that must be addressed before any maintenance work proceeds.',
  },
  {
    id: 7,
    question: 'Photographic evidence taken during hazard identification is useful because:',
    options: [
      'It removes the need to write a formal hazard report',
      'It is a legal requirement under RIDDOR 2013',
      'It proves that the hazard has been fully controlled',
      'It provides an objective, time-stamped record of site conditions that supports the written risk assessment',
    ],
    correctAnswer: 3,
    explanation:
      'Photographs provide objective evidence of site conditions at a specific point in time. They support written hazard reports, help communicate hazards to others who were not present, and create an audit trail. However, photographs supplement written records — they do not replace them. There is no specific legal requirement to take photographs, but it is strongly recommended good practice.',
  },
  {
    id: 8,
    question: 'An overloaded circuit is a hazard because:',
    options: [
      'Excessive current causes conductor heating, which can degrade insulation and lead to fire',
      'It reduces the voltage available to other circuits on the board',
      'It causes the supply frequency to drift away from 50 Hz',
      'It increases the earth fault loop impedance of the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'When a circuit carries more current than its conductors and protective devices are rated for, the conductors heat up. Sustained overloading degrades insulation, loosens connections (due to thermal cycling) and can ignite combustible materials in the vicinity. Overloading is a significant fire hazard and must be identified during maintenance inspections.',
  },
  {
    id: 9,
    question: 'Which of the following is an example of a psychological hazard in the workplace?',
    options: [
      'Solvents used for cleaning switchgear contacts',
      'Unrealistic deadline pressure leading to rushed, unsafe work',
      'Noise from a standby diesel generator',
      'Trailing leads creating a trip hazard',
    ],
    correctAnswer: 1,
    explanation:
      'Psychological hazards include stress, fatigue, bullying, harassment and unrealistic time pressures. In electrical maintenance, time pressure is particularly dangerous because it can lead technicians to take shortcuts — such as skipping safe isolation procedures or not proving dead. Employers have a duty to manage psychological hazards under the Management of Health and Safety at Work Regulations 1999.',
  },
  {
    id: 10,
    question: 'Under RIDDOR 2013, which of the following events MUST be reported to the HSE?',
    options: [
      'Any minor cut or graze that needs a plaster',
      'A near-miss where a tool was dropped but nobody was hurt',
      'A dangerous occurrence such as an electrical short circuit causing a fire, or an over-7-day injury',
      'A first aid case treated on site and recorded in the accident book',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires employers to report deaths, specified injuries, over-7-day incapacitation injuries, certain occupational diseases, and dangerous occurrences (including electrical incidents causing fire or explosion). Not every near-miss or minor injury is RIDDOR-reportable, but all should be recorded internally.',
  },
  {
    id: 11,
    question: 'A hazard checklist used during workplace inspection should include:',
    options: [
      "Only electrical hazards, as these are the technician's specialism",
      'Only the hazards listed in the original risk assessment',
      'Only physical and chemical hazards visible on the day',
      'All hazard categories including physical, chemical, biological, ergonomic and psychological hazards',
    ],
    correctAnswer: 3,
    explanation:
      'A comprehensive hazard checklist must cover all five hazard categories. Electrical maintenance technicians work in diverse environments and may encounter hazards outside their immediate specialism — asbestos in old buildings, confined spaces, chemical substances, manual handling demands and psychological pressures. A thorough checklist ensures nothing is overlooked.',
  },
  {
    id: 12,
    question:
      'In the context of ST1426 Maintenance and Operations Engineering Technician standard, hazard identification is part of which knowledge requirement?',
    options: [
      'Health and safety legislation and safe working practices',
      'Business improvement techniques',
      'Technical drawing interpretation',
      'Electrical science and principles',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to demonstrate knowledge of health and safety legislation and safe working practices, which includes the ability to identify workplace hazards, conduct risk assessments, and implement appropriate control measures. This is a core knowledge requirement assessed through the end-point assessment.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a hazard and a risk?',
    answer:
      'A hazard is anything with the potential to cause harm — for example, an exposed live conductor, a slippery floor, or a hazardous chemical. A risk is the combination of the likelihood that someone will be harmed by the hazard and the severity of that harm. Risk assessment involves identifying hazards and then evaluating the risk they present so that appropriate controls can be put in place.',
  },
  {
    question: 'Who is responsible for identifying hazards in the workplace?',
    answer:
      'Under the Health and Safety at Work Act 1974, employers have the primary duty to ensure the health and safety of their employees. However, the Management of Health and Safety at Work Regulations 1999 require employers to carry out risk assessments — which begins with hazard identification. In practice, everyone has a role: employers provide the systems, supervisors oversee implementation, and employees (including maintenance technicians) are expected to identify and report hazards they encounter during their work.',
  },
  {
    question: 'How often should workplace hazard inspections be carried out?',
    answer:
      'There is no single prescribed frequency — it depends on the nature and level of risk. High-risk environments such as construction sites or industrial facilities may require daily inspections. For routine electrical maintenance, a pre-work inspection should be carried out before each task, with more formal periodic inspections at intervals determined by the risk assessment. Any significant change in conditions, equipment or work activity should trigger a fresh inspection.',
  },
  {
    question: 'What should I do if I identify a hazard that I cannot control myself?',
    answer:
      "Report it immediately to your supervisor or site manager using the organisation's hazard reporting system. If the hazard presents an immediate danger to life, stop work and withdraw to a safe area before reporting. Do not attempt to rectify hazards that are outside your competence — for example, suspected asbestos-containing materials must only be handled by licensed asbestos removal contractors.",
  },
  {
    question: 'Are near-misses worth reporting if nobody was hurt?',
    answer:
      "Absolutely. Near-miss reporting is one of the most valuable proactive safety tools available. Heinrich's safety triangle suggests that for every major injury, there are approximately 300 near-misses. Each near-miss is an opportunity to identify and fix a hazard or control weakness before it causes actual harm. Organisations with strong near-miss reporting cultures consistently have lower injury rates.",
  },
];

const MOETModule1Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.3 · Subsection 1"
        title="Hazard Identification"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Recognising and recording workplace hazards before they cause harm.
          </p>

          <TLDR
            points={[
              'Hazard: anything with the potential to cause harm.',
              'Risk: likelihood x severity of harm from a hazard.',
              'Categories: physical, chemical, biological, ergonomic, psychological.',
              'Method: systematic inspection, checklists, observation, reporting.',
              'Electrical hazards: exposed conductors, damaged insulation, overloading.',
              'Environmental: water ingress, confined spaces, asbestos.',
              'Reporting: near-miss systems, toolbox talks, photographic evidence.',
              'ST1426: maps to health and safety knowledge KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define the difference between a hazard and a risk with workplace examples',
              'Identify the five main hazard categories and give electrical maintenance examples',
              'Describe systematic workplace inspection techniques for hazard identification',
              'Explain common electrical hazards encountered during maintenance activities',
              'Understand hazard reporting systems, near-miss reporting and toolbox talks',
              'Apply observation techniques and photographic evidence to support risk assessments',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Hazard vs risk — the fundamental distinction</ContentEyebrow>

          <ConceptBlock title="Two terms, two precise, legally significant meanings">
            <p>
              Before you can assess risk, you must first understand what a hazard is and how it
              differs from a risk. These two terms are often used interchangeably in everyday
              language, but in health and safety they have precise, legally significant meanings.
              Getting this distinction right is the foundation of everything that follows in risk
              assessment and method statement writing.
            </p>
            <p>
              <strong>Hazard.</strong> Anything with the potential to cause harm. This includes
              physical objects, substances, work activities, environmental conditions and human
              behaviours. A hazard exists regardless of whether anyone is actually exposed to it.
            </p>
            <p>
              <strong>Risk.</strong> The likelihood that a hazard will cause harm, combined with the
              severity of that harm. Risk is a measure of how dangerous a hazard actually is in the
              specific circumstances — it depends on who is exposed, for how long, and what controls
              are in place.
            </p>
            <p>
              Consider a 400 V three-phase distribution board. The board itself is a hazard — it
              contains conductors at a voltage capable of causing fatal electric shock. However, the
              risk depends on the circumstances. If the board is properly enclosed, locked,
              labelled, and only accessed by competent persons using safe isolation procedures, the
              risk is managed to an acceptable level. If the same board has a missing cover, damaged
              insulation, and is accessible to untrained personnel, the risk is very high — even
              though the hazard (400 V) has not changed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The relationship between hazard and risk">
            <p>Risk can be expressed as a simple formula:</p>
            <div className="rounded bg-elec-yellow/10 border border-elec-yellow/30 p-3 text-center">
              <p className="text-base font-semibold text-elec-yellow">
                Risk = Likelihood of Harm x Severity of Harm
              </p>
            </div>
            <p>
              This means that a hazard with extreme severity (e.g., contact with 11 kV overhead
              lines = death) presents a high risk even if the likelihood is relatively low.
              Conversely, a hazard with low severity (e.g., minor scratch from a rough cable edge)
              may present a low risk even if it happens frequently. The purpose of hazard
              identification is to find all the hazards; risk evaluation then determines which ones
              require the most urgent attention.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Everyday examples for electrical maintenance technicians">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Potential harm</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Factors affecting risk level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Exposed live conductors</td>
                    <td className="border border-white/10 px-3 py-2">
                      Electric shock, burns, death
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Voltage, accessibility, presence of barriers, competence of persons nearby
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Working at height (cable tray installation)
                    </td>
                    <td className="border border-white/10 px-3 py-2">Falls, fractures, death</td>
                    <td className="border border-white/10 px-3 py-2">
                      Height, edge protection, platform condition, weather (outdoor work)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Asbestos in old switchroom ceiling
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Mesothelioma, asbestosis, lung cancer
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Material condition, disturbance during work, duration of exposure
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Heavy transformer requiring manual lifting
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Back injury, musculoskeletal damage
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Weight, awkwardness, distance, frequency, individual capability
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Time pressure from client</td>
                    <td className="border border-white/10 px-3 py-2">
                      Stress, fatigue, shortcuts leading to unsafe work
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Severity of pressure, support from employer, fatigue management
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Hazard identification always comes before risk evaluation.
              You cannot assess the risk of something you have not identified. A thorough,
              systematic approach to finding hazards is the essential first step in the risk
              assessment process required by Regulation 3 of the Management of Health and Safety at
              Work Regulations 1999.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The five hazard categories</ContentEyebrow>

          <ConceptBlock title="A framework so you do not just look for the obvious">
            <p>
              Hazards in the workplace are conventionally grouped into five categories. Using these
              categories as a framework during inspections ensures you consider all types of hazard
              — not just the obvious ones related to your specialism. As an electrical maintenance
              technician, you will naturally focus on electrical hazards, but you must also be aware
              of the other categories because they directly affect your safety and the safety of
              those around you.
            </p>
          </ConceptBlock>

          <ConceptBlock title="1. Physical hazards">
            <p>
              Physical hazards are the most common category and include anything in the environment
              that can cause physical harm without necessarily being touched. They include noise,
              vibration, extreme temperatures, radiation, slips, trips and falls, moving machinery,
              and falling objects.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical maintenance examples:</strong> Noise from generators or UPS
                systems, heat from overloaded cables or transformers, UV radiation from arc welding
                nearby, trip hazards from trailing cables, falling tools when working at height
              </li>
              <li>
                <strong>Identification method:</strong> Visual inspection, noise level assessment,
                temperature checks, housekeeping review
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="2. Chemical hazards">
            <p>
              Chemical hazards arise from exposure to harmful substances — solids, liquids, gases,
              vapours, fumes or dusts. They can enter the body through inhalation, ingestion, skin
              absorption or injection. Chemical hazards are controlled under the COSHH Regulations
              2002.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical maintenance examples:</strong> Solvents for cleaning contacts,
                flux fumes from soldering, SF6 gas in HV switchgear, battery acid from UPS systems,
                cable lubricant, PVC fumes from overheated insulation
              </li>
              <li>
                <strong>Identification method:</strong> COSHH data sheets, product labelling, smell
                (though this is not always reliable), previous incident records
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="3. Biological hazards">
            <p>
              Biological hazards include bacteria, viruses, fungi, parasites and other living
              organisms that can cause disease or infection. They may be present in water systems,
              soil, animal droppings, or building materials.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical maintenance examples:</strong> Legionella in water-cooled
                systems, pigeon droppings in ceiling voids and substations, rat urine (Weil&apos;s
                disease) in cable ducts, mould in damp switchrooms, contaminated water in flooded
                plant rooms
              </li>
              <li>
                <strong>Identification method:</strong> Visual inspection for animal evidence, water
                testing records, building condition assessment, damp surveys
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="4. Ergonomic hazards">
            <p>
              Ergonomic hazards relate to the physical demands of work and how well the work
              environment, tools and tasks are matched to the human body. Poor ergonomics causes
              musculoskeletal disorders (MSDs), which are the most common cause of work-related ill
              health in the UK.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical maintenance examples:</strong> Pulling cables through conduit
                (repetitive strain), working overhead in ceiling voids (awkward posture), lifting
                heavy distribution boards (manual handling), using hand tools for extended periods
                (vibration, grip fatigue), working in cramped switchrooms
              </li>
              <li>
                <strong>Identification method:</strong> Task analysis, manual handling assessment,
                posture observation, worker feedback
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="5. Psychological hazards">
            <p>
              Psychological hazards affect mental health and wellbeing. They include work-related
              stress, bullying, harassment, violence, lone working, fatigue, and unrealistic
              workload or time pressures. These hazards are increasingly recognised as significant
              contributors to accidents because they impair concentration and decision-making.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical maintenance examples:</strong> Pressure to complete work quickly
                leading to shortcuts on isolation procedures, lone working in remote substations,
                fatigue from long shifts or call-outs, verbal aggression from building occupants
                during shutdowns, anxiety about working on unfamiliar systems
              </li>
              <li>
                <strong>Identification method:</strong> Worker surveys, stress risk assessments,
                absence records, supervision and one-to-one discussions, observation of behaviour
                changes
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Combined hazards">
            <p>
              In practice, most work activities involve multiple hazard categories simultaneously.
              For example, replacing a distribution board in an occupied school involves electrical
              hazards (the installation itself), physical hazards (working at height, manual
              handling), chemical hazards (dust, possible asbestos), ergonomic hazards (awkward
              postures, heavy lifting) and psychological hazards (pressure to complete during a
              holiday shutdown). Your hazard identification must consider all categories, not just
              the most obvious one.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Electrical hazards in maintenance work</ContentEyebrow>

          <ConceptBlock title="A skill you must be particularly good at">
            <p>
              As an electrical maintenance technician, you must be particularly skilled at
              identifying electrical hazards. The Electricity at Work Regulations 1989 place
              absolute duties on employers and employees to prevent danger from electrical systems.
              Understanding the specific electrical hazards you are likely to encounter is essential
              for meeting these duties and protecting yourself and others.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Typical consequences
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Exposed conductors
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Missing covers, open junction boxes, damaged terminations, conductors
                      protruding from accessories
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Electric shock, burns, cardiac arrest, death
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Damaged insulation
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Mechanical damage, heat degradation, rodent damage, UV exposure, age-related
                      deterioration
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Short circuits, earth faults, fire, electric shock
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Overloaded circuits
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Circuits carrying current in excess of their design rating due to additional
                      loads or undersized cables
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Conductor overheating, insulation degradation, fire, nuisance tripping
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Water ingress</td>
                    <td className="border border-white/10 px-3 py-2">
                      Leaks, condensation, flooding, inadequate IP rating for the environment
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Short circuits, tracking, corrosion, arc faults, electric shock
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Loose connections
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Poorly tightened terminations, thermal cycling causing conductor relaxation,
                      vibration
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Arcing, overheating, fire, intermittent supply, equipment damage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Arc flash</td>
                    <td className="border border-white/10 px-3 py-2">
                      Rapid release of energy from a fault in an electrical system, particularly at
                      higher voltages and fault levels
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Severe burns, blast injuries, hearing damage, ignition of clothing, death
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Assuming a circuit is safe because it looks dead"
            whatHappens={
              <>
                Some of the most dangerous electrical hazards are not immediately visible. Circuits
                that appear dead may still be live due to back-feeds from alternative supplies,
                generators, solar PV systems, or battery storage systems. Capacitors in motor drives
                and UPS equipment can retain lethal charges long after isolation. Induced voltages
                can be present on cables running parallel to high-voltage circuits.
              </>
            }
            doInstead={
              <>
                Never assume a circuit is safe based on appearance alone — always prove dead using
                an approved voltage indicator tested immediately before and after use in accordance
                with GS38.
              </>
            }
          />

          <ConceptBlock title="Spotting and checking for electrical hazards">
            <p>
              <strong>Visual indicators of electrical hazards</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Discolouration or scorching on enclosures and conductors</li>
              <li>Burning smell or signs of overheating</li>
              <li>Missing blanking plates or cover screws</li>
              <li>Cable damage — cuts, abrasion, crushing, rodent gnawing</li>
              <li>Moisture, condensation or corrosion inside enclosures</li>
              <li>Buzzing or crackling sounds from equipment</li>
              <li>Flickering lights or intermittent operation indicating loose connections</li>
            </ul>
            <p>
              <strong>Systematic electrical hazard checks</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Check all enclosures are complete and securely fixed</li>
              <li>Verify warning labels and circuit identification are present and legible</li>
              <li>Inspect cable entries for correct glands and seals</li>
              <li>Look for signs of water ingress or damp conditions</li>
              <li>Confirm earthing and bonding conductors are intact</li>
              <li>Check for evidence of overheating — thermal imaging if available</li>
              <li>Review the condition of protective devices (MCBs, RCDs, fuses)</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Under the Electricity at Work Regulations 1989, Regulation
              4(2) requires that all electrical systems are maintained so as to prevent danger.
              Identifying electrical hazards during routine maintenance inspections is a core part
              of meeting this duty. Document everything you find — it provides evidence of
              compliance and supports the ongoing risk assessment process.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Workplace inspection and observation techniques</ContentEyebrow>

          <ConceptBlock title="Not a casual glance — a structured process">
            <p>
              Effective hazard identification is not a casual glance around the work area — it is a
              structured, systematic process that uses multiple techniques to ensure all hazards are
              found. The Management of Health and Safety at Work Regulations 1999 (Regulation 3)
              requires employers to make a &quot;suitable and sufficient&quot; assessment of risks,
              which begins with thorough hazard identification.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Stage 1 — Desktop review">
            <p>
              Before visiting the work area, gather and review existing documentation. This gives
              you context and alerts you to hazards that may not be visible during a physical
              inspection.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Previous risk assessments and method statements for similar work</li>
              <li>Site plans, electrical drawings and schematics</li>
              <li>Asbestos register and refurbishment/demolition survey</li>
              <li>Incident and near-miss reports from the site</li>
              <li>Maintenance records and defect logs</li>
              <li>Manufacturer&apos;s safety data sheets for chemicals used</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Stage 2 — Physical walk-through">
            <p>
              Carry out a systematic walk-through of the work area and its immediate surroundings.
              Use a structured checklist to ensure you cover all hazard categories. Walk the route
              you will take to and from the work area — access routes can contain hazards too.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Start from the site entrance and follow the access route to the work area</li>
              <li>Inspect the work area itself — look up, down and all around</li>
              <li>Check adjacent areas that could be affected by or affect your work</li>
              <li>Identify emergency exits, assembly points and first aid provision</li>
              <li>Note the activities of other workers nearby</li>
              <li>Assess lighting, ventilation and environmental conditions</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Stage 3 — Worker consultation">
            <p>
              Talk to people who work regularly in the area. They often know about hazards that are
              not immediately obvious to a visitor — intermittent problems, seasonal conditions, or
              historical issues that have not been formally recorded.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Ask site personnel about known hazards and previous incidents</li>
              <li>Consult with other contractors working on site</li>
              <li>Discuss the planned work with the facilities manager or duty holder</li>
              <li>Review the site induction briefing for site-specific hazards</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Using checklists effectively">
            <p>
              A hazard identification checklist is a structured prompt — it reminds you to consider
              hazard categories that you might otherwise overlook. However, a checklist should never
              be treated as a tick-box exercise. Each item must prompt genuine observation and
              thought about the specific conditions on site.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Checklist category
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Items to check</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Access and egress
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Route condition, lighting, obstructions, emergency exits, stairs, ladders
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Electrical</td>
                    <td className="border border-white/10 px-3 py-2">
                      Condition of enclosures, exposed conductors, labelling, earthing, isolation
                      facilities
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Fire</td>
                    <td className="border border-white/10 px-3 py-2">
                      Combustible materials, ignition sources, fire detection, extinguishers, escape
                      routes
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Working at height
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Height of work, edge protection, fragile surfaces, anchor points, access
                      equipment
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Substances</td>
                    <td className="border border-white/10 px-3 py-2">
                      Chemicals present, asbestos, dust, fumes, biological agents
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Environment</td>
                    <td className="border border-white/10 px-3 py-2">
                      Temperature, ventilation, noise, lighting, confined spaces, weather
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">People</td>
                    <td className="border border-white/10 px-3 py-2">
                      Other workers, public, vulnerable persons, lone working, fatigue
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Photographic evidence">
            <p>
              Taking photographs during hazard identification is strongly recommended. Photographs
              provide an objective, time-stamped record of site conditions that supports the written
              risk assessment. They are particularly useful for recording the condition of existing
              electrical installations, evidence of damage or deterioration, and any temporary
              conditions that may change before the risk assessment is formally reviewed. Modern
              smartphones produce images with embedded GPS coordinates and timestamps, creating a
              robust evidence trail. Ensure photographs are stored securely, labelled clearly, and
              referenced in the written hazard report.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A hazard identification is only as good as the time and
              attention you give it. Rushing through a checklist to &quot;get the paperwork
              done&quot; defeats the entire purpose. The objective is to find the hazards that could
              harm you or others — your life may depend on how thoroughly you do it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Hazard reporting, near-misses and toolbox talks</ContentEyebrow>

          <ConceptBlock title="Identifying is only useful if you act on it">
            <p>
              Identifying a hazard is only useful if you do something about it. Effective hazard
              reporting systems ensure that identified hazards are communicated to the right people,
              recorded for tracking, and actioned in a timely manner. Three key communication tools
              are hazard reporting systems, near-miss reporting and toolbox talks.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Hazard reporting systems">
            <p>
              Every employer should have a formal system for reporting hazards. This may be a
              paper-based form, a digital app, or a combination of both. The system should be simple
              to use, accessible to all workers, and result in a documented response within a
              defined timescale.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What to report:</strong> Any hazard you identify that is not already
                controlled — whether it is an existing condition you have discovered or a new hazard
                created by work activities
              </li>
              <li>
                <strong>How to report:</strong> Use the organisation&apos;s prescribed form or
                system. Include the location, description of the hazard, date and time, your name,
                and any immediate action you have taken
              </li>
              <li>
                <strong>When to report:</strong> Immediately for imminent danger; as soon as
                practicable for other hazards. If a hazard presents an immediate risk of serious
                injury, stop work and verbally alert those in the vicinity before completing the
                formal report
              </li>
              <li>
                <strong>Follow-up:</strong> Check that your report has been acknowledged and that
                appropriate action has been taken. If the hazard remains uncontrolled, escalate
                through your supervisor or safety representative
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Near-miss reporting">
            <p>
              A near-miss is an unplanned event that did not result in injury, illness or damage but
              had the potential to do so. Near-miss reporting is a proactive safety tool — it
              identifies hazards and control failures before they result in actual harm.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Examples in electrical maintenance:</strong> An electrician discovers a
                circuit is still live after being told it was isolated; a tool is dropped from
                height but misses all personnel; a cable is nicked during chasing but does not
                penetrate to the conductor; a worker receives a slight tingle when touching
                metalwork
              </li>
              <li>
                <strong>Why report:</strong> Heinrich&apos;s safety triangle shows the relationship
                between near-misses and serious incidents — for every major injury, there are
                approximately 10 minor injuries, 30 property damage events, and 600 near-misses.
                Addressing near-misses reduces the likelihood of actual injuries
              </li>
              <li>
                <strong>Barriers to reporting:</strong> Fear of blame, belief that it is not
                important, not knowing how to report, time pressure. A positive safety culture
                actively encourages and rewards near-miss reporting
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Toolbox talks">
            <p>
              A toolbox talk is a short, focused safety briefing — typically 10 to 15 minutes —
              delivered at or near the work area before work begins or at the start of a shift. It
              covers specific hazards relevant to the day&apos;s tasks and reinforces safe working
              practices.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Purpose:</strong> To communicate hazard information, reinforce controls,
                share lessons learned, and give workers the opportunity to raise concerns
              </li>
              <li>
                <strong>Who delivers:</strong> Usually the site supervisor, foreman or team leader —
                but any competent person can deliver a toolbox talk. As a maintenance technician,
                you may be asked to deliver toolbox talks on electrical safety topics
              </li>
              <li>
                <strong>Content:</strong> Specific to the work being done that day — not generic.
                Good topics for electrical maintenance include safe isolation procedures, arc flash
                awareness, cable avoidance, and working in confined spaces
              </li>
              <li>
                <strong>Recording:</strong> A brief record should be kept — typically a form showing
                the date, topic, presenter, attendees and any issues raised. This provides evidence
                of safety communication for audits
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="RIDDOR — when formal reporting to the HSE is required">
            <p>
              The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013
              (RIDDOR) require employers to report certain events to the HSE. As a maintenance
              technician, you should be aware of the types of events that trigger a RIDDOR report,
              because you may be the first person to witness or discover them.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Deaths:</strong> All work-related deaths must be reported immediately
              </li>
              <li>
                <strong>Specified injuries:</strong> Fractures (other than fingers/thumbs/toes),
                amputations, permanent loss of sight, crush injuries, burns requiring hospital
                treatment, loss of consciousness from electric shock or lack of oxygen
              </li>
              <li>
                <strong>Over-7-day injuries:</strong> Any injury that results in more than 7
                consecutive days off work (not counting the day of the incident)
              </li>
              <li>
                <strong>Dangerous occurrences:</strong> Electrical short circuit or overload causing
                fire or explosion; accidental release of a substance that could cause injury;
                collapse of scaffolding over 5 m
              </li>
              <li>
                <strong>Occupational diseases:</strong> Certain diseases linked to work exposure,
                such as hand-arm vibration syndrome or occupational asthma
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to
              understand and apply hazard reporting procedures as part of your health and safety
              knowledge. You are expected to take personal responsibility for identifying and
              reporting hazards, contributing to a positive safety culture in your workplace. This
              is assessed through both the knowledge test and the professional discussion in the
              end-point assessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=asG-Bkv2_vc"

            title="Risk Assessment for NVQ"

            channel="Craig Wiltshire"

            duration="2:38"

            topic="Working a risk assessment through for portfolio evidence"

            caption="Short, and framed around the evidence an assessor wants — useful for your portfolio as well as the method."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Hazard identification always comes before risk evaluation. You cannot assess the risk of something you have not identified. A thorough, systematic approach to finding hazards is the essential first step in the risk assessment process required by Regulation 3 of the Management of Health and Safety at Work Regulations 1999.',
              'Your hazard identification must consider all categories, not just the most obvious one.',
              'Under the Electricity at Work Regulations 1989, Regulation 4(2) requires that all electrical systems are maintained so as to prevent danger. Identifying electrical hazards during routine maintenance inspections is a core part of meeting this duty.',
              'A hazard identification is only as good as the time and attention you give it. Rushing through a checklist to "get the paperwork done" defeats the entire purpose.',
              'The maintenance technician standard requires you to understand and apply hazard reporting procedures as part of your health and safety knowledge, and to take personal responsibility for identifying and reporting hazards.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Hazard identification knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Module 1, Section 2.5
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Risk Evaluation
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section3_1;
