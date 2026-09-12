/**
 * MOET · Module 1 · Section 1.3 · Subsection 2 — Risk Evaluation
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
} from '@/components/study-centre/learning';
import { RiskMatrix } from '@/components/study-centre/diagrams/moet';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Risk Evaluation - MOET Module 1 Section 3.2';
const DESCRIPTION =
  'Comprehensive guide to risk evaluation for electrical maintenance technicians: 5x5 risk matrix, risk ratings, qualitative and quantitative assessment, Management of Health and Safety at Work Regulations 1999, ALARP principle and electrical-specific risk examples.';

const quickCheckQuestions = [
  {
    id: 'risk-matrix-purpose',
    question: 'What is the purpose of a 5x5 risk matrix in risk assessment?',
    options: [
      'To record the names of everyone who could be harmed by a hazard',
      'To calculate the exact statistical probability of an accident occurring',
      'To list the control measures that must be applied to every hazard',
      'To provide a structured method for combining likelihood and severity to produce a risk rating',
    ],
    correctIndex: 3,
    explanation:
      'A 5x5 risk matrix provides a structured, semi-quantitative method for evaluating risk. By plotting the likelihood of harm on one axis and the severity of harm on the other, you produce a risk rating that helps prioritise which hazards need the most urgent attention. It does not give exact probabilities — it provides a consistent framework for professional judgement.',
  },
  {
    id: 'reg3-requirement',
    question:
      "Under Regulation 3 of the Management of Health and Safety at Work Regulations 1999, what is the employer's duty?",
    options: [
      'To carry out a suitable and sufficient assessment of the risks to employees and others affected by the undertaking',
      'To eliminate every single risk from the workplace before any work may begin',
      'To appoint an external health and safety consultant for all risk assessments',
      'To assess only the risks to employees, with no duty towards members of the public',
    ],
    correctIndex: 0,
    explanation:
      "Regulation 3 requires every employer to make a 'suitable and sufficient' assessment of the risks to the health and safety of employees and anyone else who may be affected by the undertaking. 'Suitable and sufficient' means the assessment must be appropriate to the nature and level of risk — it does not have to eliminate all risks, but it must be thorough enough to identify the significant ones and determine the necessary precautions.",
  },
  {
    id: 'alarp-principle',
    question: 'The ALARP principle requires that risk should be reduced:',
    options: [
      'As low as reasonably practicable — meaning the cost of further reduction is grossly disproportionate to the benefit gained',
      'To zero, so that no residual risk of any kind remains before work begins',
      'To whatever level the employer can achieve within the project budget',
      'To the lowest level the workforce is willing to accept by agreement',
    ],
    correctIndex: 0,
    explanation:
      'ALARP (As Low As Reasonably Practicable) is a legal concept meaning that risks must be reduced until the cost (in time, money, effort or inconvenience) of further reduction is grossly disproportionate to the safety benefit gained. It does not mean reducing risk to zero, nor does it allow ignoring readily available controls simply because they are inconvenient.',
  },
  {
    id: 'review-triggers',
    question: 'Which of the following should trigger a review of an existing risk assessment?',
    options: [
      'The completion of the task, after which the assessment can be archived',
      'A significant change in work activity, equipment, personnel, legislation, or a near-miss/incident related to the assessed activity',
      'A change of shift pattern that does not alter the work being carried out',
      'A request from a worker who simply disagrees with the assessed rating',
    ],
    correctIndex: 1,
    explanation:
      'Risk assessments are living documents that must be reviewed whenever circumstances change. Triggers include changes in work activity, new equipment or processes, changes in personnel (especially competence levels), updates to legislation or guidance, incidents or near-misses related to the activity, and as a matter of routine good practice — typically annually even if no specific trigger has occurred.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "In a 5x5 risk matrix, a risk rated as 'substantial' (score 15-20) requires:",
    options: [
      'No action, provided the work is supervised by a competent person',
      'Work should not proceed until the risk has been reduced; significant resources may need to be allocated',
      'The hazard to be recorded for review, while work continues as normal',
      'The likelihood and severity scores to be averaged rather than multiplied',
    ],
    correctAnswer: 1,
    explanation:
      'A substantial risk rating (typically 15-20 on a 5x5 matrix) means the risk is unacceptable and work should not proceed until additional control measures have been implemented to reduce it. This may require significant investment of time, resources or redesign of the work method. Only once the risk has been reduced to a tolerable or moderate level should work be permitted.',
  },
  {
    id: 2,
    question: "Which of the following best describes 'qualitative' risk assessment?",
    options: [
      'Assessment based on measured failure rates and calculated probabilities',
      'Assessment that produces a single numerical risk figure for each hazard',
      'Assessment based on professional judgement, experience and descriptive categories rather than numerical data',
      'Assessment carried out only by an external specialist consultant',
    ],
    correctAnswer: 2,
    explanation:
      "Qualitative risk assessment uses descriptive categories (e.g., 'unlikely', 'possible', 'probable') and professional judgement rather than precise numerical data. It is the most common approach in workplace risk assessment because exact probability data is rarely available. The 5x5 risk matrix is a semi-quantitative tool that provides some numerical structure to qualitative judgements.",
  },
  {
    id: 3,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, a risk assessment must be reviewed when:',
    options: [
      'Only once every five years, regardless of any changes',
      'Only after an accident has actually resulted in injury',
      'Only when requested in writing by an HSE inspector',
      'There is reason to suspect it is no longer valid, or when significant changes have occurred',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 3(3) requires that a risk assessment be reviewed when there is reason to suspect it is no longer valid, or when there has been a significant change in the matters to which it relates. This includes changes in work methods, equipment, substances, personnel, site conditions, or legislation. Annual review is good practice but is not the only trigger.',
  },
  {
    id: 4,
    question:
      "A maintenance technician is asked to work on a distribution board in a wet plantroom. The risk assessment identifies a 'probable' likelihood (4) and 'major' severity (4). The risk score is:",
    options: [
      '16 — substantial risk',
      '8 — moderate risk',
      '4 — tolerable risk',
      '20 — intolerable risk',
    ],
    correctAnswer: 0,
    explanation:
      "Risk score = Likelihood (4) x Severity (4) = 16. On a 5x5 matrix, a score of 16 falls in the 'substantial' risk band. This means work should not proceed until additional controls are put in place — for example, de-energising the board, pumping out water, providing temporary drainage, and ensuring appropriate PPE and safe isolation procedures are in place.",
  },
  {
    id: 5,
    question: "The term 'significant findings' in risk assessment refers to:",
    options: [
      'Every conceivable hazard, including the most trivial, that could ever arise',
      'The significant hazards identified, the people at risk, and the control measures in place or required',
      'Only those hazards that have already caused a reportable injury',
      'The numerical risk scores, recorded without any supporting description',
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 3(6) of the Management of Health and Safety at Work Regulations 1999, employers with five or more employees must record the significant findings of risk assessments. 'Significant findings' means the significant hazards identified, who might be harmed and how, the existing control measures, and any further action required. Trivial hazards do not need to be recorded.",
  },
  {
    id: 6,
    question:
      'Who is legally competent to carry out a risk assessment under the Management of Health and Safety at Work Regulations 1999?',
    options: [
      'Only a chartered safety practitioner registered with IOSH or NEBOSH',
      'Only the most senior manager present on the site that day',
      'Any person with sufficient training, experience, knowledge and other qualities to carry out the assessment competently',
      'Any employee, as the law places no competence requirement on the assessor',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 7 requires employers to appoint competent persons to assist with health and safety arrangements. A risk assessor must have sufficient training, experience, knowledge and other qualities to enable them to carry out the assessment competently. For electrical risk assessments, this typically means a person who combines health and safety risk assessment knowledge with technical understanding of electrical systems and the specific work being assessed. As a maintenance technician progressing through ST1426, you are developing both sets of competence.',
  },
  {
    id: 7,
    question: 'The ALARP principle is best illustrated by which statement?',
    options: [
      'Risk must always be reduced to zero before any work can be permitted',
      'Risk reduction can stop as soon as it starts to cost the employer money',
      'Risk only needs reducing where an accident has already occurred',
      'Risk must be reduced to the point where the cost of further reduction is grossly disproportionate to the benefit',
    ],
    correctAnswer: 3,
    explanation:
      "ALARP requires a proportionate approach: risks must be reduced until the sacrifice (cost, time, trouble) of further reduction is grossly disproportionate to the risk reduction achieved. The word 'grossly' is important — it means the imbalance must be large before you can stop reducing risk. For electrical work, the severity of potential harm (fatal electric shock) means that significant expenditure on controls is expected.",
  },
  {
    id: 8,
    question:
      "When using a risk matrix, which of the following would be rated as 'intolerable' risk?",
    options: [
      'Likelihood: almost certain (5), Severity: catastrophic (5) — Score 25',
      'Likelihood: unlikely (2), Severity: minor (2) — Score 4',
      'Likelihood: rare (1), Severity: minor (2) — Score 2',
      'Likelihood: possible (3), Severity: moderate (3) — Score 9',
    ],
    correctAnswer: 0,
    explanation:
      "A score of 25 (likelihood 5 x severity 5) represents the maximum possible risk rating and falls firmly in the 'intolerable' band. Work must not proceed under any circumstances until the risk has been fundamentally reduced. In practice, an 'almost certain' likelihood of 'catastrophic' harm means the activity should be redesigned or eliminated entirely.",
  },
  {
    id: 9,
    question: 'A quantitative risk assessment differs from a qualitative one because it:',
    options: [
      'Relies entirely on the personal opinion of a single assessor',
      'Uses numerical data, statistical analysis and calculated probabilities rather than descriptive categories',
      'Uses descriptive word-based categories such as low, medium and high',
      'Does not need to be recorded even where five or more people are employed',
    ],
    correctAnswer: 1,
    explanation:
      'Quantitative risk assessment uses numerical data — failure rates, exposure measurements, statistical probabilities — to calculate risk levels. It is used in complex, high-consequence industries such as nuclear, petrochemical, rail and aerospace where sufficient data exists. In routine electrical maintenance, qualitative or semi-quantitative methods (such as the risk matrix) are more commonly used because precise failure data for individual tasks is rarely available.',
  },
  {
    id: 10,
    question: "For a risk assessment to be considered 'suitable and sufficient', it must:",
    options: [
      'Cover every trivial hazard in exhaustive written detail',
      'Be carried out only by an external health and safety consultant',
      'Identify the significant hazards, evaluate the risks, and determine whether existing controls are adequate or additional measures are needed',
      'Guarantee that no accident can ever occur during the work',
    ],
    correctAnswer: 2,
    explanation:
      "A 'suitable and sufficient' risk assessment must identify the significant hazards, evaluate who might be harmed and how, assess the adequacy of existing controls, and determine what further action is needed. It does not need to cover every trivial hazard, it can be carried out by any competent person (not just a consultant), and there is no prescribed form — though it must be recorded in writing if the employer has five or more employees.",
  },
  {
    id: 11,
    question:
      'An electrical maintenance technician identifies that a 30-year-old distribution board has deteriorated insulation, missing labels and evidence of previous overheating. The risk assessment should:',
    options: [
      'Treat the board as low risk because it has operated for 30 years without an incident',
      'Rate the risk as moderate and allow work to continue with extra PPE only',
      'Disregard the overheating evidence, as it relates to a past fault now resolved',
      'Recognise the combination of hazards as significant, evaluate the risk as substantial, and recommend the board be de-energised for inspection and remedial work before maintenance proceeds',
    ],
    correctAnswer: 3,
    explanation:
      'The combination of deteriorated insulation, missing labels and evidence of overheating represents a significant, escalating electrical hazard. The risk assessment should rate this as substantial and recommend that the board be de-energised and a thorough condition assessment carried out before any maintenance work proceeds. The age of the board without incident does not reduce the risk — deterioration is progressive and failure may be imminent.',
  },
  {
    id: 12,
    question:
      'Under ST1426, maintenance technicians are expected to demonstrate which of the following in relation to risk evaluation?',
    options: [
      'Knowledge of risk assessment principles, the ability to contribute to risk assessments, and compliance with safe systems of work derived from them',
      "The ability to write all of the company's risk assessments without any support",
      'Authority to overrule the safe systems of work set by the employer',
      'A requirement to carry out quantitative fault-tree analysis for every task',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to demonstrate knowledge of risk assessment principles and the ability to contribute to risk assessments for their work activities. Technicians are also expected to comply with the safe systems of work that result from risk assessments and to escalate concerns when risk levels change. This is assessed in the end-point assessment knowledge test and professional discussion.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a qualitative and quantitative risk assessment?',
    answer:
      "A qualitative risk assessment uses descriptive categories and professional judgement — for example, rating likelihood as 'unlikely', 'possible' or 'probable'. A quantitative risk assessment uses numerical data, calculated probabilities and statistical analysis. In practice, most workplace risk assessments for electrical maintenance are qualitative or semi-quantitative (using a numbered risk matrix). Quantitative methods are used in high-consequence industries such as nuclear, petrochemical and rail where sufficient failure data exists.",
  },
  {
    question: 'Do I have to write the risk assessment myself?',
    answer:
      'As a maintenance technician, you are not necessarily required to write formal risk assessments from scratch — that is typically the responsibility of your employer or a competent person they appoint. However, you are expected to contribute to risk assessments by providing information about the hazards you encounter, the conditions on site, and the practicality of proposed controls. You should also be able to review a risk assessment for your work and identify whether it is still valid.',
  },
  {
    question: 'How do I decide what likelihood rating to give a hazard?',
    answer:
      'Likelihood ratings are based on professional judgement informed by evidence. Consider: how often is the hazard present? How often are people exposed? What is the history of incidents and near-misses? Are existing controls reliable? Has similar work elsewhere resulted in incidents? You should also consider industry data and guidance. The key is consistency and honesty — do not underrate a likelihood just because an accident has not happened yet.',
  },
  {
    question: 'What does ALARP mean in practice for electrical maintenance?',
    answer:
      'ALARP (As Low As Reasonably Practicable) means you must reduce risk until the cost of further reduction is grossly disproportionate to the benefit. For electrical work, where the potential severity is fatal electric shock, the bar is set high — employers are expected to invest significantly in controls. In practice, this means safe isolation must be used unless dead working is genuinely unreasonable, appropriate PPE must be provided, and proper training and competence must be maintained even if these measures are costly.',
  },
  {
    question: 'When should a risk assessment be signed off and who should sign it?',
    answer:
      'A risk assessment should be signed off by the competent person who carried it out and, in most organisations, approved by a line manager or safety manager. The sign-off confirms that the assessment is complete, the significant findings have been recorded, and the identified controls are in place or planned. It should be signed before work begins and reviewed at the point of work to confirm it is still valid. All members of the work team should have access to the assessment and understand its contents.',
  },
];

const MOETModule1Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.3 · Subsection 2"
        title="Risk Evaluation"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Assessing likelihood, severity and tolerability of identified hazards.
          </p>

          <TLDR
            points={[
              'Risk: likelihood x severity of harm from a hazard.',
              '5x5 matrix: structured tool for rating risk (1-25).',
              'Ratings: trivial, tolerable, moderate, substantial, intolerable.',
              'ALARP: risk reduced as low as reasonably practicable.',
              'Legal basis: MHSWR 1999 Reg 3 — suitable and sufficient risk assessment.',
              'Severity: electrical contact is potentially fatal (severity 5).',
              'Controls: safe isolation, PPE, competence, barriers.',
              'ST1426: risk assessment knowledge and application KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Use a 5x5 risk matrix to evaluate and rate identified hazards',
              'Distinguish between trivial, tolerable, moderate, substantial and intolerable risk ratings',
              'Explain the difference between qualitative and quantitative risk assessment',
              'Apply the requirements of MHSWR 1999 Regulation 3 to electrical maintenance work',
              'Understand the ALARP principle and its application to electrical risk',
              'Identify triggers for reviewing and updating existing risk assessments',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The 5x5 risk matrix</ContentEyebrow>

          <ConceptBlock title="A structured, repeatable method for combining likelihood and severity">
            <p>
              Once hazards have been identified, the next step is to evaluate the level of risk each
              hazard presents. The 5x5 risk matrix is the most widely used tool for this purpose in
              UK workplaces. It provides a structured, repeatable method for combining two factors —
              the likelihood that harm will occur and the severity of that harm — to produce a
              numerical risk rating.
            </p>
          </ConceptBlock>

          <RiskMatrix />

          <ConceptBlock title="Likelihood scale">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Descriptor</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">1</td>
                    <td className="border border-white/10 px-3 py-2">Rare</td>
                    <td className="border border-white/10 px-3 py-2">
                      Could happen but only in exceptional circumstances; no history of occurrence
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">2</td>
                    <td className="border border-white/10 px-3 py-2">Unlikely</td>
                    <td className="border border-white/10 px-3 py-2">
                      Not expected to happen, but possible; may have occurred once in similar
                      situations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">3</td>
                    <td className="border border-white/10 px-3 py-2">Possible</td>
                    <td className="border border-white/10 px-3 py-2">
                      Could happen; has happened in similar workplaces or activities
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">4</td>
                    <td className="border border-white/10 px-3 py-2">Probable</td>
                    <td className="border border-white/10 px-3 py-2">
                      Expected to happen; has happened before in this workplace or frequently in the
                      industry
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">5</td>
                    <td className="border border-white/10 px-3 py-2">Almost certain</td>
                    <td className="border border-white/10 px-3 py-2">
                      Will happen unless action is taken; happens regularly in this type of work
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Severity scale">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Descriptor</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">1</td>
                    <td className="border border-white/10 px-3 py-2">Negligible</td>
                    <td className="border border-white/10 px-3 py-2">
                      Minor discomfort or inconvenience; no first aid required; no lost time
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">2</td>
                    <td className="border border-white/10 px-3 py-2">Minor</td>
                    <td className="border border-white/10 px-3 py-2">
                      First aid injury; minor cuts, bruises; short-term discomfort; no lost workdays
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">3</td>
                    <td className="border border-white/10 px-3 py-2">Moderate</td>
                    <td className="border border-white/10 px-3 py-2">
                      Medical treatment required; temporary incapacity; up to 7 days lost time;
                      reversible health effects
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">4</td>
                    <td className="border border-white/10 px-3 py-2">Major</td>
                    <td className="border border-white/10 px-3 py-2">
                      Serious injury; fractures, hospitalisation, long-term incapacity;
                      RIDDOR-reportable; permanent health effects
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 text-center font-bold">5</td>
                    <td className="border border-white/10 px-3 py-2">Catastrophic</td>
                    <td className="border border-white/10 px-3 py-2">
                      Death, multiple fatalities, or permanent total disability
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Calculating the risk score">
            <p>
              The risk score is calculated by multiplying the likelihood rating by the severity
              rating:
            </p>
            <div className="rounded bg-elec-yellow/10 border border-elec-yellow/30 p-3 text-center">
              <p className="text-base font-semibold text-elec-yellow">
                Risk Score = Likelihood (1-5) x Severity (1-5) = Score (1-25)
              </p>
            </div>
            <p>
              For example, if a hazard has a likelihood of 3 (possible) and a severity of 4 (major),
              the risk score is 3 x 4 = 12, which falls in the &apos;moderate&apos; to
              &apos;substantial&apos; range depending on the matrix used. The score determines the
              urgency and nature of the response required.
            </p>
            <p>
              It is essential to understand that the risk matrix is a tool to support professional
              judgement, not a substitute for it. Two competent assessors may arrive at slightly
              different scores for the same hazard because their experience and interpretation of
              the likelihood and severity scales may differ. What matters is that the assessment is
              consistent, reasonable, and honestly reflects the conditions observed. If in doubt,
              err on the side of caution — overestimating risk leads to additional controls, which
              is always better than underestimating and having an accident.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When assessing electrical hazards, remember that the
              severity of contact with mains voltage (230/400 V) is always at least
              &apos;major&apos; (4) and potentially &apos;catastrophic&apos; (5), because electric
              shock at these voltages can be fatal. This means that even a low likelihood still
              produces a significant risk score, which is why safe isolation is always the default
              control measure.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Risk ratings and required response</ContentEyebrow>

          <ConceptBlock title="Five levels, five prescribed responses">
            <p>
              The numerical risk score from the matrix is converted into a risk rating that
              determines the type of response required. Five levels of risk rating are commonly
              used, each with a prescribed course of action. Understanding these levels is critical
              because they dictate whether work can proceed, whether additional controls are needed,
              and how urgently action must be taken.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Risk rating</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Score range</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Required response
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-500/5">
                    <td className="border border-white/10 px-3 py-2 font-medium text-green-400">
                      Trivial
                    </td>
                    <td className="border border-white/10 px-3 py-2">1-2</td>
                    <td className="border border-white/10 px-3 py-2">
                      No action required; no documentation needed beyond noting the assessment was
                      done. Monitor to ensure conditions do not change.
                    </td>
                  </tr>
                  <tr className="bg-green-500/5">
                    <td className="border border-white/10 px-3 py-2 font-medium text-green-300">
                      Tolerable
                    </td>
                    <td className="border border-white/10 px-3 py-2">3-5</td>
                    <td className="border border-white/10 px-3 py-2">
                      No additional controls required if existing controls are maintained. Monitor
                      and review regularly. Consider cost-effective improvements.
                    </td>
                  </tr>
                  <tr className="bg-yellow-500/5">
                    <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">
                      Moderate
                    </td>
                    <td className="border border-white/10 px-3 py-2">6-12</td>
                    <td className="border border-white/10 px-3 py-2">
                      Efforts should be made to reduce risk within a defined timescale. Controls
                      must be implemented before work continues. Cost of prevention should be
                      considered.
                    </td>
                  </tr>
                  <tr className="bg-orange-500/5">
                    <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">
                      Substantial
                    </td>
                    <td className="border border-white/10 px-3 py-2">13-20</td>
                    <td className="border border-white/10 px-3 py-2">
                      Work should not start or continue until risk has been reduced. Significant
                      resources may need to be allocated. Immediate management attention required.
                    </td>
                  </tr>
                  <tr className="bg-red-500/5">
                    <td className="border border-white/10 px-3 py-2 font-medium text-red-400">
                      Intolerable
                    </td>
                    <td className="border border-white/10 px-3 py-2">21-25</td>
                    <td className="border border-white/10 px-3 py-2">
                      Work must not proceed under any circumstances until the risk is reduced. If it
                      is not possible to reduce the risk, the work must remain prohibited.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Electrical maintenance risk examples">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Scenario</th>
                    <th className="border border-white/10 px-3 py-2 text-left">L</th>
                    <th className="border border-white/10 px-3 py-2 text-left">S</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Score</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Replacing MCB in isolated, locked-off board — proven dead
                    </td>
                    <td className="border border-white/10 px-3 py-2">1</td>
                    <td className="border border-white/10 px-3 py-2">5</td>
                    <td className="border border-white/10 px-3 py-2">5</td>
                    <td className="border border-white/10 px-3 py-2 text-green-300">Tolerable</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Cable repair in ceiling void with known asbestos insulation board
                    </td>
                    <td className="border border-white/10 px-3 py-2">3</td>
                    <td className="border border-white/10 px-3 py-2">5</td>
                    <td className="border border-white/10 px-3 py-2">15</td>
                    <td className="border border-white/10 px-3 py-2 text-orange-400">
                      Substantial
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Live fault-finding on 400 V distribution board without arc flash PPE
                    </td>
                    <td className="border border-white/10 px-3 py-2">4</td>
                    <td className="border border-white/10 px-3 py-2">5</td>
                    <td className="border border-white/10 px-3 py-2">20</td>
                    <td className="border border-white/10 px-3 py-2 text-orange-400">
                      Substantial
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Working on overhead lines without isolation during storm
                    </td>
                    <td className="border border-white/10 px-3 py-2">5</td>
                    <td className="border border-white/10 px-3 py-2">5</td>
                    <td className="border border-white/10 px-3 py-2">25</td>
                    <td className="border border-white/10 px-3 py-2 text-red-400">Intolerable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Before and after controls">
            <p>
              Best practice is to rate each hazard twice: once without controls (the
              &apos;inherent&apos; or &apos;gross&apos; risk) and once with the proposed controls in
              place (the &apos;residual&apos; or &apos;net&apos; risk). This demonstrates the
              effectiveness of the controls and shows that the risk has been reduced to an
              acceptable level. For example, live working on a 400 V board might be rated as 20
              (substantial) without controls, but with safe isolation, proving dead, locking off and
              appropriate PPE, the residual risk drops to 5 (tolerable).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Qualitative vs quantitative risk assessment</ContentEyebrow>

          <ConceptBlock title="A spectrum, not a binary choice">
            <p>
              Risk assessment approaches fall on a spectrum from purely qualitative (based on
              judgement and descriptive categories) to purely quantitative (based on numerical data
              and calculated probabilities). Understanding where your assessment sits on this
              spectrum helps you apply the right level of rigour for the task.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Qualitative assessment">
            <p>
              Uses descriptive categories and professional judgement. The assessor draws on their
              training, experience and knowledge of the work to rate hazards using word-based scales
              (e.g., &apos;low&apos;, &apos;medium&apos;, &apos;high&apos;) or the numbered scales
              of a risk matrix.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Advantages:</strong> Quick, practical, does not require statistical data,
                accessible to non-specialists
              </li>
              <li>
                <strong>Limitations:</strong> Subjective — different assessors may reach different
                conclusions; less precise; relies on the competence of the assessor
              </li>
              <li>
                <strong>When used:</strong> Routine workplace risk assessments, task-specific
                assessments, pre-work checks
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Quantitative assessment">
            <p>
              Uses numerical data — failure rates, exposure measurements, dose-response
              relationships, and calculated probabilities — to produce a numerical risk figure. This
              may involve fault tree analysis, event tree analysis, or statistical modelling.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Advantages:</strong> More precise, repeatable, allows direct comparison
                between risks, supports cost-benefit analysis
              </li>
              <li>
                <strong>Limitations:</strong> Requires reliable data (which is often not available),
                complex, time-consuming, may give a false sense of precision
              </li>
              <li>
                <strong>When used:</strong> Major hazard installations (COMAH sites), nuclear,
                petrochemical, railway risk assessment, arc flash studies
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Semi-quantitative assessment — the practical middle ground">
            <p>
              The 5x5 risk matrix is a semi-quantitative method — it assigns numbers to qualitative
              judgements, producing a numerical score that can be ranked and compared. This is the
              approach most commonly used in electrical maintenance because it provides a structured
              framework without requiring statistical data that is rarely available for individual
              maintenance tasks.
            </p>
            <p>
              For electrical maintenance technicians, the semi-quantitative approach using a risk
              matrix is the standard expectation. You should be able to use a risk matrix
              competently and understand the meaning of the scores it produces. Quantitative methods
              are specialist tools that you should be aware of but are unlikely to need to apply
              directly.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Competence to carry out risk assessment">
            <p>
              Regulation 7 of the Management of Health and Safety at Work Regulations 1999 requires
              employers to appoint one or more competent persons to assist with health and safety
              arrangements, including risk assessment. A competent person is someone with
              &quot;sufficient training and experience or knowledge and other qualities&quot; to
              carry out the function properly. For electrical risk assessments, this means a person
              who combines health and safety risk assessment knowledge with technical understanding
              of electrical systems and the specific work being assessed. As a maintenance
              technician progressing through ST1426, you are developing both sets of competence.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The quality of a risk assessment depends on the competence
              of the assessor, not the sophistication of the method. A thoughtful, honest
              qualitative assessment by a competent electrician is far more valuable than a complex
              quantitative model built on unreliable data.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>The ALARP principle and significant findings</ContentEyebrow>

          <ConceptBlock title="Not all risk can be eliminated">
            <p>
              The ALARP (As Low As Reasonably Practicable) principle is a cornerstone of UK health
              and safety law. It recognises that not all risk can be eliminated but requires that
              risk is reduced to the lowest level that is reasonably practicable. Understanding
              ALARP is essential because it determines how far you must go in implementing control
              measures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The ALARP triangle">
            <p>Risk levels can be visualised as a triangle divided into three zones:</p>
            <p>
              <strong>Unacceptable region (top).</strong> Risk cannot be justified except in
              extraordinary circumstances. Work must not proceed.
            </p>
            <p>
              <strong>ALARP region (middle).</strong> Risk is tolerable only if further reduction is
              impracticable or the cost is grossly disproportionate to the benefit. Continuous
              effort to reduce risk within this zone.
            </p>
            <p>
              <strong>Broadly acceptable region (bottom).</strong> Risk is so low that no further
              action is needed. Monitor to ensure it stays in this region.
            </p>
            <p>
              The word &quot;reasonably practicable&quot; is a legal test established by case law
              (Edwards v National Coal Board, 1949). It means that the degree of risk must be
              weighed against the sacrifice (in money, time and trouble) of the measures needed to
              avert that risk. If the risk is high, then substantial expenditure on controls is
              expected — you cannot argue that safe isolation equipment is &quot;too expensive&quot;
              when the alternative is a risk of fatal electric shock. The sacrifice must be
              &quot;grossly disproportionate&quot; to the risk before you can stop taking further
              precautions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="ALARP in electrical maintenance — practical examples">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safe isolation:</strong> The cost of safe isolation equipment (voltage
                indicator, locks, labels) is trivial compared to the risk of fatal electric shock —
                safe isolation must always be used unless dead working is genuinely unreasonable
              </li>
              <li>
                <strong>Arc flash PPE:</strong> Specialist arc-rated clothing and face shields have
                a cost, but the severity of arc flash burns justifies the expenditure for work on
                systems with significant fault levels
              </li>
              <li>
                <strong>Training:</strong> The cost of competence training for maintenance
                technicians is justified because incompetent work on electrical systems creates a
                risk of fatal injury
              </li>
              <li>
                <strong>Designed-out hazards:</strong> Specifying finger-safe distribution boards
                and IP-rated enclosures during design reduces the risk at source — this is ALARP in
                action at the design stage
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Recording significant findings">
            <p>
              Regulation 3(6) of the Management of Health and Safety at Work Regulations 1999
              requires employers with five or more employees to record the significant findings of
              their risk assessments. &quot;Significant findings&quot; means:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                The significant hazards identified (not every trivial hazard — use professional
                judgement)
              </li>
              <li>
                The groups of people who might be harmed and how (employees, contractors, visitors,
                public)
              </li>
              <li>The existing control measures in place</li>
              <li>Any further action required, including timescales and responsibilities</li>
              <li>The date of assessment and the assessor&apos;s name</li>
            </ul>
            <p>
              The record does not need to be lengthy — it should be clear, concise and
              proportionate. For a routine electrical maintenance task, a well-completed risk
              assessment form with clear entries for each significant hazard is sufficient. The key
              is that someone else could read it and understand what hazards are present, how they
              are controlled, and what additional action is needed.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>When to review a risk assessment</ContentEyebrow>

          <ConceptBlock title="A living record, not a one-off document">
            <p>
              A risk assessment is not a one-off document — it is a living record that must be kept
              under review. Regulation 3(3) of the Management of Health and Safety at Work
              Regulations 1999 requires that risk assessments be reviewed when there is reason to
              suspect they are no longer valid, or when there has been a significant change in the
              matters to which they relate.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Triggers for review">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Change in work activity:</strong> New task, different method, change in
                scope or scale
              </li>
              <li>
                <strong>Change in equipment:</strong> New plant, machinery or tools; modification of
                existing equipment
              </li>
              <li>
                <strong>Change in substances:</strong> Different chemicals, new materials, changed
                COSHH assessments
              </li>
              <li>
                <strong>Change in personnel:</strong> New workers, different competence levels,
                agency staff, young persons
              </li>
              <li>
                <strong>Change in environment:</strong> Different site, weather conditions, building
                alterations, new hazards in adjacent areas
              </li>
              <li>
                <strong>Incident or near-miss:</strong> Any incident related to the assessed
                activity, including near-misses, indicates the assessment may be inadequate
              </li>
              <li>
                <strong>Legislative or guidance change:</strong> New regulations, updated standards
                (e.g., BS 7671 amendments), revised HSE guidance
              </li>
              <li>
                <strong>Audit or inspection findings:</strong> Internal or external audits may
                identify weaknesses in existing assessments
              </li>
              <li>
                <strong>Routine review period:</strong> Good practice recommends reviewing all risk
                assessments at least annually, even if no specific trigger has occurred
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The review process">
            <p>When reviewing an existing risk assessment, the assessor should:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Re-visit the work area to check whether conditions have changed</li>
              <li>
                Consult workers who carry out the activity regularly — they may have identified new
                hazards or control weaknesses
              </li>
              <li>
                Check incident and near-miss records for the activity since the last assessment
              </li>
              <li>
                Verify that the control measures specified in the assessment are actually being
                implemented
              </li>
              <li>
                Update the assessment to reflect any changes, with a new date and assessor signature
              </li>
              <li>Communicate any changes to the work team through briefings or toolbox talks</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Stale risk assessments"
            whatHappens={
              <>
                One of the most common failures in risk assessment management is allowing
                assessments to become &quot;stale&quot; — dated documents that no longer reflect the
                current work conditions but are still being used to authorise work. A risk
                assessment written for a site two years ago may be dangerously inadequate if the
                site conditions have changed.
              </>
            }
            doInstead={
              <>
                Always check the date of the risk assessment and verify at the point of work that it
                accurately describes the conditions you actually find. If it does not, stop work and
                request a review before proceeding.
              </>
            }
          />

          <ConceptBlock title="Contributing to review">
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard expects you to be
              able to contribute to risk assessment reviews by providing feedback on the
              effectiveness of controls, reporting changes in conditions, and identifying new
              hazards. This is part of the continuous improvement behaviour assessed in the
              end-point assessment professional discussion.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'When assessing electrical hazards, remember that the severity of contact with mains voltage (230/400 V) is always at least "major" (4) and potentially "catastrophic" (5), because electric shock at these voltages can be fatal.',
              'Best practice is to rate each hazard twice: once without controls (the inherent or gross risk) and once with the proposed controls in place (the residual or net risk).',
              'The quality of a risk assessment depends on the competence of the assessor, not the sophistication of the method.',
              'The record does not need to be lengthy — it should be clear, concise and proportionate. The key is that someone else could read it and understand what hazards are present, how they are controlled, and what additional action is needed.',
              'The maintenance technician standard expects you to be able to contribute to risk assessment reviews by providing feedback on the effectiveness of controls, reporting changes in conditions, and identifying new hazards.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Risk evaluation knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Hazard Identification
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Hierarchy of Controls
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section3_2;
