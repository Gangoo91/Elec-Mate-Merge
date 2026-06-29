/**
 * Module 1 · Section 4 · Subsection 3 — Safety Representatives
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Roles, rights and consultation under the Safety Representatives and Safety Committees
 *   Regulations 1977 and HSCER 1996. Engineer-in-training perspective: how an HNC supervisor
 *   uses the safety rep as a partner, not an opponent.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safety Representatives - HNC Module 1 Section 4.3';
const DESCRIPTION =
  'Understand the roles, rights and responsibilities of safety representatives, the SRSC Regulations 1977, consultation requirements, and safety committee functions in building services.';

const quickCheckQuestions = [
  {
    id: 'safety-rep-appointment',
    question:
      'Under the SRSC Regulations 1977, who appoints safety representatives in unionised workplaces?',
    options: [
      'The Health and Safety Executive',
      'A recognised trade union',
      'A vote by all employees',
      'The employer',
    ],
    correctIndex: 1,
    explanation:
      'Under the Safety Representatives and Safety Committees Regulations 1977, safety representatives must be appointed by a recognised trade union, not by the employer. The employer must then consult with these representatives on health and safety matters.',
  },
  {
    id: 'time-off-training',
    question: 'Are safety representatives entitled to paid time off for training?',
    options: [
      'No, training must be completed in their own unpaid time',
      'Yes, with pay for training approved by the union or agreed with the employer',
      'Only if they have served more than five years in the role',
      'Only where the employer chooses to fund it voluntarily',
    ],
    correctIndex: 1,
    explanation:
      'Safety representatives are entitled to paid time off during working hours for training approved by their trade union or agreed with the employer. This right is established in the SRSC Regulations 1977 and supported by the ACOP.',
  },
  {
    id: 'safety-committee-request',
    question:
      'If safety representatives request a safety committee, how long does the employer have to establish one?',
    options: [
      '7 days',
      '14 days',
      'There is no time limit',
      '3 months',
    ],
    correctIndex: 3,
    explanation:
      "If at least two safety representatives make a written request for a safety committee, the employer must establish one within 3 months of the request. The employer must consult with the representatives and recognised unions about the committee's composition.",
  },
  {
    id: 'non-union-consultation',
    question:
      'In workplaces without recognised trade unions, how must employers consult employees on health and safety?',
    options: [
      'Through the Health and Safety (Consultation with Employees) Regulations 1996',
      'They have no duty to consult where no union is recognised',
      'Only by appointing a union safety representative anyway',
      'Through the Working Time Regulations 1998',
    ],
    correctIndex: 0,
    explanation:
      'The Health and Safety (Consultation with Employees) Regulations 1996 require employers to consult employees directly or through elected representatives of employee safety (ROES) in workplaces without recognised trade unions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the primary function of a safety representative under the SRSC Regulations 1977?',
    options: [
      'To enforce health and safety law and issue notices',
      'To represent employees on health and safety matters and consult with the employer',
      'To manage the employer\'s health and safety duties on their behalf',
      'To carry out statutory inspections required of the HSE',
    ],
    correctAnswer: 1,
    explanation:
      "Safety representatives represent employees in consultations with the employer on health and safety matters. They do not manage safety (that remains the employer's duty) or enforce law (that is the HSE's role).",
  },
  {
    id: 2,
    question:
      'Which of the following is NOT a function of safety representatives under the SRSC Regulations?',
    options: [
      'Making representations to the employer on health and safety matters',
      'Investigating potential hazards and dangerous occurrences',
      'Issuing improvement notices to the employer',
      'Examining causes of workplace accidents',
    ],
    correctAnswer: 2,
    explanation:
      'Issuing improvement notices is an enforcement power held only by HSE inspectors. Safety representatives can investigate hazards, examine accident causes, and make representations to employers, but they have no enforcement powers.',
  },
  {
    id: 3,
    question: 'What information is an employer required to provide to safety representatives?',
    options: [
      'The employer\'s full commercial and financial accounts',
      'The personal health records of every employee',
      'Only information the employer chooses to share',
      'Information necessary for them to fulfil their functions, subject to certain restrictions',
    ],
    correctAnswer: 3,
    explanation:
      'Employers must provide information necessary for safety representatives to fulfil their functions. However, there are restrictions - employers need not disclose information that would cause substantial injury to the business, personal health information, or information obtained for legal proceedings.',
  },
  {
    id: 4,
    question: 'How often should a safety committee typically meet?',
    options: [
      'At least quarterly, though more frequently is often beneficial',
      'Only once a year at the annual review',
      'Only when a serious accident has occurred',
      'Weekly, as required by the SRSC Regulations',
    ],
    correctAnswer: 0,
    explanation:
      'While not specified in law, HSE guidance suggests safety committees should meet at least quarterly. More frequent meetings may be appropriate in higher-risk industries or during periods of significant change. Meetings should be regular and predictable.',
  },
  {
    id: 5,
    question: 'What protection do safety representatives have against employer action?',
    options: [
      'A guaranteed pay rise for taking on the role',
      'Protection from dismissal or detriment for performing their safety representative functions',
      'Immunity from any form of disciplinary process at work',
      'A guaranteed promotion after two years in the role',
    ],
    correctAnswer: 1,
    explanation:
      'Safety representatives have statutory protection against dismissal or being subjected to any detriment for performing their functions in good faith. Dismissal for this reason is automatically unfair. This protection encourages representatives to raise concerns without fear.',
  },
  {
    id: 6,
    question: 'Under the SRSC Regulations, safety representatives have the right to:',
    options: [
      'Stop production immediately if they believe there is danger',
      'Hire and fire workers who breach safety rules',
      'Inspect the workplace at reasonable intervals',
      "Access the employer's bank accounts",
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives have the right to inspect the workplace at least every three months (or more frequently with employer agreement). They cannot unilaterally stop production (though they can advise workers of dangers) and have no hiring/firing powers.',
  },
  {
    id: 7,
    question: "What should be included in a safety committee's terms of reference?",
    options: [
      'The annual pay budget for committee members',
      'The disciplinary records of all employees',
      'A list of approved subcontractors for the site',
      'Objectives, membership, meeting frequency, agenda setting, and reporting arrangements',
    ],
    correctAnswer: 3,
    explanation:
      "Clear terms of reference help committees function effectively. They should cover: the committee's objectives and scope, membership and quorum, meeting frequency, agenda setting process, decision-making process, and how findings/recommendations are reported and actioned.",
  },
  {
    id: 8,
    question:
      'A representative of employee safety (ROES) differs from a union safety representative in that:',
    options: [
      'A ROES is elected by employees in non-unionised workplaces',
      'A ROES is appointed directly by the HSE',
      'A ROES has full enforcement and prosecution powers',
      'A ROES can only represent managers, not operatives',
    ],
    correctAnswer: 0,
    explanation:
      'ROES are elected by employees in workplaces without recognised trade unions, under the Health and Safety (Consultation with Employees) Regulations 1996. They have similar but not identical functions to union safety representatives and generally have fewer specific powers.',
  },
  {
    id: 9,
    question: 'When must employers consult safety representatives?',
    options: [
      'Only after an accident has already happened',
      'Before introducing measures affecting health and safety, when planning training, and on other specified matters',
      'Only at the representative\'s written request',
      'Only once every three years at review',
    ],
    correctAnswer: 1,
    explanation:
      "Consultation must occur in 'good time' on matters including: introduction of measures affecting health and safety, appointment of competent persons, health and safety information, planning of training, and the health and safety consequences of new technology.",
  },
  {
    id: 10,
    question:
      'What happens if an employer refuses to establish a safety committee after a valid request?',
    options: [
      'Nothing, as establishing a committee is entirely voluntary',
      'The representatives must take the matter to an employment tribunal',
      'The employer is in breach of the SRSC Regulations and can be prosecuted',
      'The HSE automatically establishes the committee instead',
    ],
    correctAnswer: 2,
    explanation:
      'Failure to establish a safety committee after a valid written request from at least two safety representatives is a breach of the SRSC Regulations 1977. The employer can be prosecuted and may face improvement notices requiring compliance.',
  },
];

const faqs = [
  {
    question: 'What training should safety representatives receive?',
    answer:
      'Safety representatives should receive training appropriate to their role and workplace risks. This typically includes: understanding their functions and rights, relevant health and safety law, hazard identification and risk assessment, accident investigation, inspection techniques, and effective representation skills. TUC-approved courses are available and provide comprehensive preparation.',
  },
  {
    question: 'Can safety representatives inspect any area of the workplace?',
    answer:
      'Safety representatives can inspect areas where employees they represent work. The regulations state they must give reasonable notice (unless there is a notifiable accident or dangerous occurrence). Inspections should be at least every three months, though more frequent inspections can be agreed with the employer. The employer should provide reasonable facilities for inspection.',
  },
  {
    question: 'What is the difference between consultation and negotiation?',
    answer:
      "Consultation means the employer must listen to safety representatives' views and consider them before making decisions, but the employer makes the final decision. Negotiation implies reaching agreement. For health and safety, the legal requirement is consultation, not negotiation. However, good practice involves genuine two-way discussion with reasonable time for representatives to respond.",
  },
  {
    question: 'How many safety representatives should a workplace have?',
    answer:
      'There is no legal formula. The number should be sufficient to allow proper representation of all employees, considering factors like: number of employees, variety and distribution of occupations, type of work and hazards, size and layout of the workplace, and shift patterns. Trade unions typically have their own guidance on appropriate numbers.',
  },
  {
    question: 'What if the safety committee disagrees with management?',
    answer:
      'Safety committees are advisory - they recommend, not mandate. If agreement cannot be reached, the employer retains decision-making authority but must be able to justify their decision. Unresolved safety concerns can be raised with the HSE. The committee should have agreed procedures for escalating disagreements.',
  },
  {
    question: 'Do safety representatives have any powers when serious danger is discovered?',
    answer:
      'Safety representatives do not have legal power to stop work, but they can advise employees of dangers and represent them if they refuse to work due to danger. Employees have the right to leave a situation of serious and imminent danger. The representative can make urgent representations to management and, if necessary, contact the HSE.',
  },
];

const HNCModule1Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 1.4.3"
            title="Safety Representatives"
            description="Roles, rights, consultation requirements and safety committees in building services organisations"
            tone="purple"
          />

          <TLDR
            points={[
              'You will recognise two parallel UK regimes — Safety Representatives &amp; Safety Committees Regulations 1977 (recognised unions) and Health and Safety (Consultation with Employees) Regulations 1996 (non-union workforces).',
              'You can describe a safety rep&rsquo;s rights — investigation, inspection, paid time off for training, attendance at safety committees, communication with HSE inspectors.',
              'You apply HSWA s.2(6) consultation as a statutory duty, not a courtesy.',
              'You position the safety rep as an early-warning system on culture and conditions, not as an adversary.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 2(6)"
            clause="It shall be the duty of every employer to consult any such representatives [safety representatives] with a view to the making and maintenance of arrangements which will enable him and his employees to co-operate effectively in promoting and developing measures to ensure the health and safety at work of the employees, and in checking the effectiveness of such measures."
            meaning={
              <>
                Section 2(6) is the parent duty for safety reps. The detailed mechanics live in
                SRSCR 1977 and HSCER 1996 — but the underlying duty to consult is statutory.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.2(6) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the appointment and functions of safety representatives under SRSC 1977",
              "Describe the rights and protections afforded to safety representatives",
              "Understand employer consultation duties with safety representatives",
              "Explain the requirements for establishing and running safety committees",
              "Distinguish between union safety reps and representatives of employee safety",
              "Apply consultation principles in building services environments",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Safety Representatives and the SRSC Regulations 1977</ContentEyebrow>

          <ConceptBlock title="Safety Representatives and the SRSC Regulations 1977">
            <p>
            The Safety Representatives and Safety Committees Regulations 1977 (SRSC Regulations)
            establish the framework for employee representation on health and safety matters in
            unionised workplaces. Safety representatives play a vital role in ensuring worker
            involvement in workplace safety.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Appointment of Safety Representatives
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Appointed by a <strong>recognised trade union</strong>, not by the employer
            </li>
            <li>
            Should have been employed for at least two years or have two years' relevant
            experience
            </li>
            <li>
            The union must notify the employer in writing of the appointment
            </li>
            <li>
            Represent the employees of the employer who belong to the union
            </li>
            <li>
            Can represent non-union employees if the union and employees agree
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Functions of Safety Representatives
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Investigate hazards</strong> — Description: Look into potential hazards and dangerous occurrences. Building Services Example: Investigating concerns about isolation procedures</li>
            <li><strong>Investigate complaints</strong> — Description: Examine complaints by represented employees. Building Services Example: Employee concerns about PPE provision</li>
            <li><strong>Make representations</strong> — Description: Raise health and safety matters with employer. Building Services Example: Requesting additional welfare facilities</li>
            <li><strong>Carry out inspections</strong> — Description: Inspect workplace and documents. Building Services Example: Quarterly inspection of workshop areas</li>
            <li><strong>Represent employees</strong> — Description: Liaise with HSE on employees' behalf. Building Services Example: Accompanying HSE inspector on site visit</li>
            <li><strong>Attend safety committee</strong> — Description: Participate in safety committee meetings. Building Services Example: Presenting inspection findings to committee</li>
            </ul>
            
            

            <CommonMistake
            title="Important Distinction"
            whatHappens={<><p className="text-sm text-white">
            Safety representatives <strong>do not have enforcement powers</strong>. They cannot
            issue notices or require work to stop. Their role is to represent employees,
            investigate and raise concerns, and participate in consultation. Enforcement remains
            with the HSE. However, their involvement significantly improves workplace safety by
            ensuring employee concerns are heard.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Key point:</strong> The employer's health and safety duties cannot be
            transferred to safety representatives - the employer remains responsible.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Rights and Protections of Safety Representatives</ContentEyebrow>

          <ConceptBlock title="Rights and Protections of Safety Representatives">
            <p>
            To enable safety representatives to fulfil their functions effectively, the law grants
            them specific rights and protections. These ensure they can carry out their role
            without fear of employer retaliation.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Statutory Rights</p>
            
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Time Off Rights</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Paid time off for carrying out functions</li>
            <li>Paid time off for training</li>
            <li>Time must be 'reasonable' in circumstances</li>
            <li>Training approved by union or agreed with employer</li>
            <li>No requirement to make up lost time</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Information Rights</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Information necessary to fulfil functions</li>
            <li>Access to relevant documents</li>
            <li>Information from HSE about workplace</li>
            <li>Records of RIDDOR incidents</li>
            <li>Certain restrictions apply (see below)</li>
            </ul>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Rights</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Inspect workplace at least every <strong>three months</strong>
            </li>
            <li>More frequent inspections by agreement with employer</li>
            <li>Inspect after notifiable accident or dangerous occurrence</li>
            <li>
            Inspect when there has been substantial change in work conditions
            </li>
            <li>
            Reasonable notice required (except for accidents/dangerous occurrences)
            </li>
            <li>Employer must provide reasonable facilities and assistance</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Information Restrictions
            </p>
            <p className="text-sm text-white mb-3">Employers are NOT required to disclose:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Information that would cause <strong>substantial injury</strong> to the business
            </li>
            <li>
            Information relating to <strong>individuals</strong> without their consent
            </li>
            <li>
            Information obtained for <strong>legal proceedings</strong>
            </li>
            <li>
            Information that would breach <strong>statutory prohibition</strong>
            </li>
            </ul>
            

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-green-400 mb-2">Protection from Detriment</p>
            <p className="text-sm text-white">Safety representatives are protected from:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Dismissal</strong> for performing safety representative functions
            (automatically unfair)
            </li>
            <li>
            <strong>Detriment</strong> such as denial of promotion, transfer, or training
            opportunities
            </li>
            <li>
            <strong>Victimisation</strong> for raising legitimate health and safety concerns
            </li>
            </ul>
            <p className="text-xs text-white mt-2">
            These protections are provided by the Employment Rights Act 1996.
            </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
            <strong>Time off:</strong> What is 'reasonable' depends on circumstances including the
            size of the workplace, the number of employees, and the nature of hazards.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Consultation Requirements and Non-Unionised Workplaces</ContentEyebrow>

          <ConceptBlock title="Consultation Requirements and Non-Unionised Workplaces">
            <p>
            Employers have a legal duty to consult with employees on health and safety matters.
            The mechanism for consultation depends on whether the workplace has recognised trade
            unions. Either way, consultation must be meaningful and occur in 'good time'.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Matters Requiring Consultation
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>New measures</strong> — Description: Introduction of measures substantially affecting H&S. Building Services Example: New safe isolation procedure</li>
            <li><strong>Competent persons</strong> — Description: Appointment of persons to assist with H&S duties. Building Services Example: Appointing a new H&S advisor</li>
            <li><strong>H&S information</strong> — Description: Information required to be provided to employees. Building Services Example: Risk assessment findings</li>
            <li><strong>Training planning</strong> — Description: Planning and organisation of H&S training. Building Services Example: Annual training programme</li>
            <li><strong>New technology</strong> — Description: H&S consequences of introducing new technology. Building Services Example: New testing equipment</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Effective Consultation Practice
            </p>
            <p className="text-sm text-white mb-3">
            Consultation means more than just informing representatives of decisions already
            made:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>In good time:</strong> Before decisions are finalised
            </li>
            <li>
            <strong>Provide information:</strong> Sufficient to enable meaningful input
            </li>
            <li>
            <strong>Allow response time:</strong> Representatives need time to consider and
            respond
            </li>
            <li>
            <strong>Consider views:</strong> Give proper consideration to views expressed
            </li>
            <li>
            <strong>Provide feedback:</strong> Explain how views were taken into account
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Non-Unionised Workplaces - HSCER 1996
            </p>
            
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm font-medium text-blue-400 mb-2">Direct Consultation</p>
            <p className="text-sm text-white">
            Employers can consult directly with employees individually on health and safety
            matters. Suitable for small workplaces or where issues affect individuals
            specifically.
            </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <p className="text-sm font-medium text-purple-400 mb-2">
            Representatives of Employee Safety (ROES)
            </p>
            <p className="text-sm text-white">
            Elected by the employees they represent. Employers must inform employees of
            names and provide facilities, training, and time off to perform their functions.
            </p>
            </div>
            
            

            <CommonMistake
            title="ROES vs Union Safety Representatives"
            whatHappens={<><p className="text-sm text-white">
            ROES have consultation rights under the 1996 Regulations but generally have{' '}
            <strong>fewer specific powers</strong> than union safety representatives under the
            SRSC Regulations. For example, they do not have the same detailed inspection rights,
            and cannot request a safety committee. However, they must still be consulted on the
            same range of matters.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Good practice:</strong> Many employers provide similar rights to ROES as union
            safety representatives to ensure effective consultation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Safety Committees</ContentEyebrow>

          <ConceptBlock title="Safety Committees">
            <p>
            Safety committees provide a formal structure for consultation between employers and
            employee representatives on health and safety matters. They are a key mechanism for
            joint problem-solving and continuous improvement of workplace safety.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Establishing a Safety Committee
            </p>
            <p className="text-sm text-white mb-3">
            Under SRSC Regulations, if <strong>two or more safety representatives</strong> make
            a written request, the employer{' '}
            <strong>must establish a safety committee within 3 months</strong>.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Employer must consult with representatives and unions on composition
            </li>
            <li>
            Must post notice of committee establishment in the workplace
            </li>
            <li>Non-union employers may voluntarily establish committees</li>
            <li>Committee should be of manageable size to be effective</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Safety Committee Functions
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Study of statistics</strong> — Activities: Review accident, incident, and ill-health trends</li>
            <li><strong>Examination of reports</strong> — Activities: Consider safety audit and inspection reports</li>
            <li><strong>Monitoring effectiveness</strong> — Activities: Review adequacy of safety training, communication</li>
            <li><strong>Linking with enforcement</strong> — Activities: Consider reports/information from inspectors</li>
            <li><strong>Making recommendations</strong> — Activities: Recommend measures to improve health and safety</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Committee Composition</p>
            
            <div>
            <p className="text-sm font-medium text-white mb-2">Management Representatives</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Senior manager with authority to act</li>
            <li>Line managers from key departments</li>
            <li>Health and safety professional/advisor</li>
            <li>Occupational health representative (if applicable)</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-white mb-2">Employee Representatives</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Union safety representatives</li>
            <li>Representatives from different work areas</li>
            <li>Representatives of different occupations/shifts</li>
            <li>ROES (in non-unionised workplaces)</li>
            </ul>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Effective Committee Practice
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Clear terms of reference and objectives</li>
            <li>Regular meetings (typically quarterly)</li>
            <li>Published agenda circulated in advance</li>
            <li>Minutes recording decisions and actions</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Action tracking and follow-up</li>
            <li>Review of progress on previous actions</li>
            <li>Communication of outcomes to workforce</li>
            <li>Balanced representation of both sides</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Advisory role:</strong> Safety committees advise and recommend - they do not
            have power to make binding decisions. The employer retains ultimate responsibility.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Working Effectively with Safety Representatives</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Early involvement:</strong> Consult before decisions, not after
            </li>
            <li>
            <strong>Provide resources:</strong> Time, training, facilities for their role
            </li>
            <li>
            <strong>Take concerns seriously:</strong> Investigate and respond to issues raised
            </li>
            <li>
            <strong>Give feedback:</strong> Explain actions taken and reasons for decisions
            </li>
            <li>
            <strong>Joint inspections:</strong> Include representatives in workplace
            inspections
            </li>
            <li>
            <strong>Respect independence:</strong> Representatives serve employees, not
            management
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Building Services Specific Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Multiple employer sites require coordination between contractor representatives
            </li>
            <li>Mobile workers may need flexible consultation arrangements</li>
            <li>
            Shift patterns should be considered when scheduling meetings
            </li>
            <li>Site-specific committees may be needed for large projects</li>
            <li>
            JIB agreements may provide additional industry-specific arrangements
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common Mistakes in Consultation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Informing not consulting:</strong> Presenting fait accompli, not seeking
            input
            </li>
            <li>
            <strong>Insufficient time:</strong> Not allowing adequate time for representatives
            to respond
            </li>
            <li>
            <strong>Withholding information:</strong> Not providing information needed for
            meaningful input
            </li>
            <li>
            <strong>Ignoring views:</strong> Not giving proper consideration to concerns
            raised
            </li>
            <li>
            <strong>Committee as talking shop:</strong> Discussions without action or
            follow-through
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Setting up the safety committee for a 30-person M&amp;E firm"
            situation={
              <>
                The firm has grown from 8 to 30 people in two years. There is no recognised
                union, no elected representative of employee safety (RoES) and no safety
                committee. The MD asks you to set up the consultation arrangements.
              </>
            }
            whatToDo={
              <>
                Apply HSCER 1996 (no recognised union route). Hold an open meeting, explain
                the role, take nominations and run a confidential ballot for one or two RoES.
                Set up a quarterly safety committee with terms of reference: standing agenda
                (incident, near-miss, audit findings, training, RAMS samples, action log),
                voting structure, minutes published. Provide paid time off for RoES training
                (TUC or IOSH course). Brief the workforce on how to raise safety issues with
                the RoES.
              </>
            }
            whyItMatters={
              <>
                Failing to consult is a strict-liability offence under HSCER 1996. Beyond
                compliance, the safety committee is the leading-indicator forum that surfaces
                cultural drift before it becomes an incident.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Two regimes: SRSCR 1977 (recognised trade unions) and HSCER 1996 (non-union — RoES route).',
              'HSWA s.2(6) is the statutory parent duty — consult on policy, RAMS, training, equipment, technology, arrangements for nominated competent persons.',
              'Safety reps&rsquo; rights: investigate hazards, investigate complaints, inspect at least every 3 months (or after substantive change), receive paid training, attend committee, contact HSE.',
              'A safety committee is required if requested in writing by two safety reps under SRSCR 1977.',
              'Time off and facilities for safety reps are statutory rights — refusing or restricting them is an offence.',
              'Safety reps cannot be victimised under ERA 1996 s.44 — protection extends to reasonable acts in the role.',
              'Consultation is two-way: information shared, views considered, responses given. One-way briefing is not consultation.',
              'A working partnership with the safety rep gives the supervisor early warning of culture and conditions issues.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 4
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Ethical Responsibilities
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section4_3;
