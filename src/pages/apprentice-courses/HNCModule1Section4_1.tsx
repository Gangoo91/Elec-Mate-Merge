/**
 * Module 1 · Section 4 · Subsection 1 — Duty of Care and Accountability
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Common-law duty of care, statutory duties, personal liability under HSWA s.36/s.37,
 *   corporate manslaughter. Engineer-in-training perspective: how an HNC engineer&rsquo;s
 *   personal liability tracks alongside the firm&rsquo;s.
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

const TITLE = 'Duty of Care and Accountability - HNC Module 1 Section 4.1';
const DESCRIPTION =
  "Understand legal duties, negligence principles, corporate responsibility, directors' duties and Health and Safety Sentencing Guidelines for building services professionals.";

const quickCheckQuestions = [
  {
    id: 'duty-of-care',
    question: "What is the legal basis for an employer's duty of care to employees?",
    options: [
      'It only applies to large companies with over 50 employees',
      'Common law and statutory requirements under HASAWA 1974',
      'It is only a moral obligation with no legal basis',
      'It is optional for employers who provide PPE',
    ],
    correctIndex: 1,
    explanation:
      'The duty of care arises from both common law (established through court cases) and statute law, primarily the Health and Safety at Work Act 1974. Section 2 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of employees.',
  },
  {
    id: 'negligence-elements',
    question: 'Which elements must be proven to establish negligence in a civil claim?',
    options: [
      'Circuit has adequate capacity and existing protection is suitable',
      'Danger present — risk of injury. Immediate remedial action required',
      'Duty of care existed, it was breached, and harm resulted from the breach',
      'Irrigate the eye with clean water or sterile saline, flowing from the inner corner outward',
    ],
    correctIndex: 2,
    explanation:
      'Civil negligence requires proving three elements: (1) a duty of care existed, (2) that duty was breached, and (3) the breach caused the harm suffered. The claimant must prove all three on the balance of probabilities.',
  },
  {
    id: 'cdda-disqualification',
    question:
      'Under the Company Directors Disqualification Act, what is the maximum disqualification period for health and safety offences?',
    options: [
      '10 years',
      '15 years',
      '5 years',
      '2 years',
    ],
    correctIndex: 1,
    explanation:
      'Under the Company Directors Disqualification Act 1986, directors convicted of indictable health and safety offences can be disqualified from acting as a company director for up to 15 years. This is in addition to any fine or imprisonment.',
  },
  {
    id: 'sentencing-guidelines',
    question:
      'Under the Health and Safety Sentencing Guidelines, what is the maximum fine for a large organisation causing death through gross negligence?',
    options: [
      '£500,000',
      'Unlimited',
      '£10 million',
      '£1 million',
    ],
    correctIndex: 1,
    explanation:
      "Since the 2016 Sentencing Guidelines, there is no upper limit on fines. Large organisations have faced fines exceeding £20 million for fatalities. Fines are calculated based on culpability, harm, and the organisation's turnover.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Section 7 of HASAWA 1974 places duties on which persons?',
    options: [
      'Only employers and directors',
      'Employees while at work',
      'Health and safety inspectors only',
      'Insurance companies',
    ],
    correctAnswer: 1,
    explanation:
      'Section 7 of HASAWA 1974 places duties on employees to take reasonable care for their own health and safety and that of others affected by their acts or omissions, and to cooperate with their employer on health and safety matters.',
  },
  {
    id: 2,
    question:
      "What does 'so far as is reasonably practicable' (SFAIRP) mean in health and safety law?",
    options: [
      'Clearly and concisely summarise the purpose or action required',
      'Verified against maximum values for the protective device',
      'Risk reduction measures are required unless grossly disproportionate to the risk',
      'Voltage can be easily changed with transformers for efficient transmission',
    ],
    correctAnswer: 2,
    explanation:
      'SFAIRP means that the cost, time, and effort of risk reduction must be weighed against the risk. If the cost is grossly disproportionate to the risk reduction achieved, the measure may not be required. However, the balance favours safety - significant costs are acceptable for high risks.',
  },
  {
    id: 3,
    question: 'Under Section 37 of HASAWA 1974, when can individual directors be prosecuted?',
    options: [
      'Lie them flat, raise their legs, keep them warm, and call 999',
      'Stepping down high voltage for measurement and protection circuits',
      'Clinical depression is a diagnosable condition that significantly impairs daily functioning',
      'When an offence is committed with their consent, connivance, or through their neglect',
    ],
    correctAnswer: 3,
    explanation:
      'Section 37 allows prosecution of directors, managers, or similar officers if a corporate offence was committed with their consent or connivance, or was attributable to their neglect. This personal liability cannot be transferred or insured against.',
  },
  {
    id: 4,
    question: 'What is the standard of proof required in criminal health and safety prosecutions?',
    options: [
      'Beyond reasonable doubt',
      'Balance of probabilities',
      'Reasonable suspicion',
      'Absolute certainty',
    ],
    correctAnswer: 0,
    explanation:
      "Criminal prosecutions require proof 'beyond reasonable doubt' - the highest standard. The prosecution must prove the defendant's guilt to a criminal standard. Civil claims use the lower 'balance of probabilities' standard.",
  },
  {
    id: 5,
    question:
      'The Corporate Manslaughter and Corporate Homicide Act 2007 applies when death is caused by:',
    options: [
      'It produces less smoke and no halogen gases when burned',
      'A gross breach of duty of care by senior management',
      'Mixing RCD-protected and non-protected neutrals',
      'PROFINET, EtherNet/IP, or Modbus TCP/IP',
    ],
    correctAnswer: 1,
    explanation:
      "Corporate manslaughter applies when the way an organisation's activities are managed or organised by senior management causes a death and amounts to a gross breach of a duty of care. It targets the way senior management run the organisation.",
  },
  {
    id: 6,
    question:
      'What is the relationship between civil and criminal proceedings following a workplace accident?',
    options: [
      'Precise control via BMS integration and wider operating range',
      'Materials with zero electrical resistance at low temperatures',
      'Both civil and criminal proceedings can run independently',
      'At regular intervals as specified in regulations',
    ],
    correctAnswer: 2,
    explanation:
      'Civil and criminal proceedings are separate and can run concurrently. A criminal conviction does not automatically mean civil liability (though it is strong evidence). Equally, acquittal does not prevent civil claims, which have a lower burden of proof.',
  },
  {
    id: 7,
    question:
      'Under the Sentencing Guidelines, which factor would INCREASE culpability for a health and safety offence?',
    options: [
      'The offender cooperated with the investigation',
      'The offender reported the incident promptly',
      'Immediate remedial action was taken after the incident',
      'Prior warnings from regulators about the risk that caused harm',
    ],
    correctAnswer: 3,
    explanation:
      'Prior regulatory warnings about the specific risk that caused harm significantly increases culpability. It indicates the organisation knew of the risk and failed to act. Cooperation, remedial action, and prompt reporting are mitigating factors.',
  },
  {
    id: 8,
    question: "What is 'vicarious liability' in the context of workplace safety?",
    options: [
      'Employer liability for the negligent acts of employees committed in the course of employment',
      'Protection from damage, correct zones, and separation from other services',
      'The amount of time a task can be delayed without affecting the project end date',
      'Decline politely, explain you cannot energise without your supervisor present, and call them for guidance',
    ],
    correctAnswer: 0,
    explanation:
      "Vicarious liability makes employers responsible for negligent acts of their employees committed during the course of employment. The employee may also be personally liable, but the employer is liable even if they were unaware of the employee's actions.",
  },
  {
    id: 9,
    question:
      'A building services engineer specifies electrical equipment they know is unsuitable for the environment. Who may be liable?',
    options: [
      'Continuity, insulation resistance, polarity, and Zs values',
      'The engineer personally, their employer, and potentially the client',
      'Tripping before prospective fault current reaches peak',
      'Awareness of emergency lighting purpose, exit routes, and assembly points',
    ],
    correctAnswer: 1,
    explanation:
      "Multiple parties may face liability: the engineer personally under Section 7 HASAWA (employee duties) and potentially civil negligence; the employer vicariously for the engineer's work; and the client under CDM Regulations as principal designer or client. Design errors can constitute offences.",
  },
  {
    id: 10,
    question: 'What is the Turnover Multiplier approach in the Sentencing Guidelines?',
    options: [
      "Work in special locations or involving new circuits",
      "To ensure materials arrive when needed and in correct quantities",
      "Using the organisation's annual turnover to scale fines appropriately",
      "The scaffold is incomplete or has use restrictions — check details on the tag",
    ],
    correctAnswer: 2,
    explanation:
      "The Sentencing Guidelines use the organisation's turnover to ensure fines are proportionate and have equal economic impact regardless of company size. A fine representing a certain percentage of turnover has equivalent deterrent effect across organisations.",
  },
];

const faqs = [
  {
    question: 'Can an employee be prosecuted for health and safety offences?',
    answer:
      'Yes. Under Section 7 of HASAWA 1974, employees have legal duties and can be prosecuted for failing to take reasonable care or for interfering with safety provisions. Under Section 36, employees can also be prosecuted if they cause their employer to commit an offence. Individual prosecutions are less common but do occur, particularly for reckless behaviour or deliberate breaches.',
  },
  {
    question: 'What defences are available in health and safety prosecutions?',
    answer:
      "The main defence is 'reasonable practicability' - that it was not reasonably practicable to do more. For some offences, defendants can show they exercised 'due diligence' - took all reasonable precautions and exercised all due diligence. Technical defences include challenging whether the prosecution was brought within the limitation period or whether procedures were followed correctly.",
  },
  {
    question: 'How do the 2016 Sentencing Guidelines differ from previous guidance?',
    answer:
      'The 2016 Guidelines significantly increased fines, particularly for large organisations. They introduced turnover-based calculation, meaning fines are proportionate to company size. The Guidelines also created clearer culpability categories (very high, high, medium, low) and harm categories (multiple deaths to low risk of injury), creating a more structured approach to sentencing.',
  },
  {
    question: 'What insurance covers health and safety liabilities?',
    answer:
      "Employers' Liability Insurance (compulsory for most employers) covers civil claims from employees. Public Liability Insurance covers claims from third parties. However, criminal fines cannot be insured against - they must be paid from company funds. Directors' personal liability under Section 37 similarly cannot be insured. Professional Indemnity Insurance may cover design negligence claims.",
  },
  {
    question: 'How does duty of care apply to contractors and subcontractors?',
    answer:
      'The duty of care extends to anyone affected by work activities, including contractors. Principal contractors have duties under CDM to coordinate safety. Clients cannot entirely delegate their duties. Each contractor has duties to their own employees and others. The courts have held that organisations cannot escape liability simply by outsourcing dangerous work to contractors.',
  },
  {
    question: "What is a 'Remediation Order' and when is it used?",
    answer:
      'A Remediation Order requires an offender to take specific steps to remedy the cause of the offence within a set timescale. It is used when there are ongoing risks that need addressing beyond just punishment. Failure to comply with a Remediation Order is a separate offence. Courts use these to ensure practical improvements, not just financial penalties.',
  },
];

const HNCModule1Section4_1 = () => {
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
            eyebrow="Module 1.4.1"
            title="Duty of Care and Accountability"
            description="Legal obligations, liability, and consequences for health and safety failures in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You will hold both common-law and statutory duties of care — and you can articulate the difference (negligence claim vs criminal prosecution).',
              'You apply HSWA s.36 (offence by another person) and s.37 (consent, connivance, neglect by directors and managers) to understand personal liability up the chain.',
              'You recognise Corporate Manslaughter and Corporate Homicide Act 2007 — the gross-breach corporate offence — and the parallel individual gross-negligence-manslaughter route.',
              'You document decisions in real time — the contemporaneous record is the strongest defence in any subsequent investigation.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 37(1)"
            clause="Where an offence under any of the relevant statutory provisions committed by a body corporate is proved to have been committed with the consent or connivance of, or to have been attributable to any neglect on the part of, any director, manager, secretary or other similar officer of the body corporate or a person who was purporting to act in any such capacity, he as well as the body corporate shall be guilty of that offence and shall be liable to be proceeded against and punished accordingly."
            meaning={
              <>
                Section 37 reaches up to directors and senior managers. As an HNC supervisor in
                a small or growing firm, the day you take a senior role this clause applies to
                you personally — &ldquo;neglect&rdquo; is a low bar.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.37(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Understand the legal basis for duty of care in common and statute law",
              "Explain the elements required to prove negligence in civil claims",
              "Describe corporate and personal criminal liability under HASAWA",
              "Identify when directors can be personally prosecuted under Section 37",
              "Explain the Corporate Manslaughter Act and its application",
              "Apply the Health and Safety Sentencing Guidelines principles",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>The Legal Duty of Care</ContentEyebrow>

          <ConceptBlock title="The Legal Duty of Care">
            <p>
            The duty of care is a fundamental legal concept that requires persons to take
            reasonable care to avoid acts or omissions that could foreseeably cause harm to
            others. In the workplace, this duty is established through both common law (case law)
            and statute law (Acts of Parliament).
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Common Law Duty</p>
            <p className="text-sm text-white mb-3">
            Established through court cases over centuries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Employers must provide safe systems of work</li>
            <li>Competent fellow employees must be employed</li>
            <li>Safe plant and equipment must be provided</li>
            <li>A safe place of work must be maintained</li>
            <li>Duty extends to reasonably foreseeable harm</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Statutory Duty</p>
            <p className="text-sm text-white mb-3">
            Codified in legislation, primarily HASAWA 1974:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Section 2:</strong> Employer duties to employees
            </li>
            <li>
            <strong>Section 3:</strong> Duties to non-employees
            </li>
            <li>
            <strong>Section 4:</strong> Duties regarding premises
            </li>
            <li>
            <strong>Section 7:</strong> Employee duties
            </li>
            <li>
            <strong>Section 8:</strong> Duty not to interfere
            </li>
            </ul>
            </div>
            </div>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Who Owes a Duty of Care?
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Employers</strong> — Duty Owed To: Employees. Building Services Example: Safe isolation procedures for electricians</li>
            <li><strong>Employers</strong> — Duty Owed To: Non-employees. Building Services Example: Public protected from work activities</li>
            <li><strong>Employees</strong> — Duty Owed To: Self and others. Building Services Example: Following permit-to-work requirements</li>
            <li><strong>Designers</strong> — Duty Owed To: Those who build, use, maintain. Building Services Example: Designing for safe maintenance access</li>
            <li><strong>Controllers of premises</strong> — Duty Owed To: Those using the premises. Building Services Example: Safe electrical installations in buildings</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> The duty of care requires action that is 'reasonably
            practicable' - balancing risk against the cost and difficulty of reducing it, with the
            balance weighted towards safety.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Civil Negligence and Compensation Claims</ContentEyebrow>

          <ConceptBlock title="Civil Negligence and Compensation Claims">
            <p>
            Civil claims for negligence allow injured parties to seek compensation for harm caused
            by another's failure to exercise reasonable care. These proceedings are brought in
            civil courts (County Court or High Court) and are separate from criminal prosecutions.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Elements of Negligence</p>
            <p className="text-sm text-white mb-3">
            A claimant must prove all three elements on the balance of probabilities:
            </p>
            
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-elec-yellow mb-1">1. Duty Existed</p>
            <p className="text-xs text-white">
            The defendant owed the claimant a duty of care
            </p>
            </div>
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-elec-yellow mb-1">2. Breach of Duty</p>
            <p className="text-xs text-white">
            The defendant failed to meet the required standard of care
            </p>
            </div>
            <div className="p-3 rounded bg-white/5 text-center">
            <p className="font-bold text-elec-yellow mb-1">3. Causation</p>
            <p className="text-xs text-white">
            The breach caused the harm (damage, injury, or loss)
            </p>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard of Care</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            The standard is that of a 'reasonable person' in that position
            </li>
            <li>
            For professionals, it is the standard of a reasonably competent person in that
            profession
            </li>
            <li>
            Specialists are judged against the standard of reasonable specialists
            </li>
            <li>
            The court considers what was reasonably foreseeable at the time
            </li>
            </ul>
            

            <CommonMistake
            title="Building Services Example"
            whatHappens={<><p className="text-sm text-white">
            <strong>Scenario:</strong> An electrician fails to properly terminate a cable joint,
            which later fails and causes a fire injuring an occupant.
            <br />
            <br />
            <strong>Analysis:</strong> (1) The electrician's employer owed a duty of care to
            building occupants (Section 3 HASAWA). (2) The work fell below the standard expected
            of a competent electrician (breach). (3) The inadequate termination caused the fire
            and injury (causation). The injured party can claim compensation from the employer
            (vicarious liability) and the installing company.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Types of Damages Recoverable
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>General damages:</strong> Pain, suffering, loss of amenity
            </li>
            <li>
            <strong>Special damages:</strong> Quantifiable financial losses
            </li>
            <li>
            <strong>Loss of earnings:</strong> Past and future
            </li>
            <li>
            <strong>Medical costs:</strong> Treatment and care
            </li>
            <li>
            <strong>Property damage:</strong> Repair or replacement
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Defences to Negligence
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>No duty existed:</strong> Harm not foreseeable
            </li>
            <li>
            <strong>No breach:</strong> Reasonable standard was met
            </li>
            <li>
            <strong>No causation:</strong> Breach did not cause harm
            </li>
            <li>
            <strong>Contributory negligence:</strong> Claimant partly at fault
            </li>
            <li>
            <strong>Volenti:</strong> Claimant accepted the risk
            </li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Limitation period:</strong> Civil claims must generally be brought within 3
            years of the date of knowledge of the injury (6 years for property damage).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Corporate and Personal Criminal Liability</ContentEyebrow>

          <ConceptBlock title="Corporate and Personal Criminal Liability">
            <p>
            Health and safety offences are primarily criminal matters, with prosecution by the
            Health and Safety Executive (HSE) or local authorities. Criminal proceedings can be
            brought against companies, partnerships, and individuals including directors,
            managers, and employees.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Corporate Criminal Liability
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Section 2 breach (employees)</strong> — Legal Basis: HASAWA 1974. Maximum Penalty: Unlimited fine</li>
            <li><strong>Section 3 breach (non-employees)</strong> — Legal Basis: HASAWA 1974. Maximum Penalty: Unlimited fine</li>
            <li><strong>Regulation breach</strong> — Legal Basis: Various regulations. Maximum Penalty: Unlimited fine (triable either way)</li>
            <li><strong>Corporate manslaughter</strong> — Legal Basis: CMCHA 2007. Maximum Penalty: Unlimited fine + publicity order</li>
            </ul>
            
            

            <CommonMistake
            title="Section 37 HASAWA - Personal Liability of Directors"
            whatHappens={<><p className="text-sm text-white mb-3">
            Where an offence by a body corporate is proved to have been committed with the{' '}
            <strong>consent</strong> or <strong>connivance</strong> of, or to have been
            attributable to any <strong>neglect</strong> on the part of, any director, manager,
            secretary or similar officer, that person as well as the body corporate shall be
            guilty of the offence.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Consent:</strong> Actively agreed to the unsafe practice
            </li>
            <li>
            <strong>Connivance:</strong> Knew and turned a blind eye
            </li>
            <li>
            <strong>Neglect:</strong> Failed to take reasonable steps to prevent
            </li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Personal Liability - Who Can Be Prosecuted?
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Company directors</strong> — Basis of Liability: Section 37 HASAWA. Maximum Penalty: Unlimited fine and/or 2 years imprisonment</li>
            <li><strong>Managers</strong> — Basis of Liability: Section 37 HASAWA. Maximum Penalty: Unlimited fine and/or 2 years imprisonment</li>
            <li><strong>Employees</strong> — Basis of Liability: Section 7/8 HASAWA. Maximum Penalty: Unlimited fine (rarely imprisonment)</li>
            <li><strong>Self-employed</strong> — Basis of Liability: Section 3 HASAWA. Maximum Penalty: Unlimited fine and/or 2 years imprisonment</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Company Directors Disqualification Act 1986
            </p>
            <p className="text-sm text-white">
            In addition to criminal penalties, courts can disqualify directors from holding
            company directorships:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Up to 15 years disqualification for conviction on indictment
            </li>
            <li>Up to 5 years for summary conviction</li>
            <li>
            Applies to all companies, not just the one where the offence occurred
            </li>
            <li>
            Acting as director while disqualified is a criminal offence
            </li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Critical point:</strong> Personal criminal liability cannot be insured against
            - directors must pay fines personally.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Health and Safety Sentencing Guidelines</ContentEyebrow>

          <ConceptBlock title="Health and Safety Sentencing Guidelines">
            <p>
            The Definitive Sentencing Guidelines for Health and Safety Offences, Corporate
            Manslaughter, and Food Safety and Hygiene Offences came into force in February 2016.
            They fundamentally changed how courts calculate fines, with significantly increased
            penalties particularly for large organisations.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Step 1: Culpability Assessment
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Very High</strong> — Description: Deliberate breach or flagrant disregard. Indicators: Ignored warnings, profit-driven risk-taking</li>
            <li><strong>High</strong> — Description: Fell far short of standard. Indicators: Serious and obvious risk ignored</li>
            <li><strong>Medium</strong> — Description: Fell short of standard. Indicators: Risk foreseeable but not obvious</li>
            <li><strong>Low</strong> — Description: Minor failing. Indicators: Isolated incident, systems in place</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Step 2: Harm Assessment
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Category 1</strong> — Seriousness of Harm Risked: Death or physical/mental impairment causing lifelong effects. Likelihood of Harm: High</li>
            <li><strong>Category 2</strong> — Seriousness of Harm Risked: Physical/mental impairment, serious, long-term. Likelihood of Harm: Medium</li>
            <li><strong>Category 3</strong> — Seriousness of Harm Risked: Moderate harm. Likelihood of Harm: Low</li>
            <li><strong>Category 4</strong> — Seriousness of Harm Risked: Low risk of harm. Likelihood of Harm: Remote</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Organisation Size Categories (Annual Turnover)
            </p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Micro</p>
            <p className="text-white text-xs">Up to £2m</p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Small</p>
            <p className="text-white text-xs">£2m - £10m</p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Medium</p>
            <p className="text-white text-xs">£10m - £50m</p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Large</p>
            <p className="text-white text-xs">£50m+</p>
            
            
            

            <CommonMistake
            title="Fine Ranges for Large Organisations (£50m+ turnover)"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1 (Death risk)</strong> — Very High Culpability: £2.6m - £10m+. High Culpability: £1.5m - £4m. Medium Culpability: £550k - £1.5m</li>
            <li><strong>2 (Serious harm)</strong> — Very High Culpability: £1m - £3m. High Culpability: £450k - £1.5m. Medium Culpability: £200k - £750k</li>
            </ul>
            
            <p className="text-xs text-white mt-2">
            Note: These are starting points - actual fines can exceed these ranges based on
            aggravating factors.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Aggravating and Mitigating Factors
            </p>
            
            
            <p className="font-medium text-red-400 text-sm mb-2">
            Aggravating (Increase Fine)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Previous convictions or warnings</li>
            <li>Cost-cutting as motivation</li>
            <li>Obstruction of investigation</li>
            <li>Poor health and safety record</li>
            <li>Failure to heed warnings</li>
            </ul>
            
            
            <p className="font-medium text-green-400 text-sm mb-2">
            Mitigating (Reduce Fine)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>No previous convictions</li>
            <li>Good health and safety record</li>
            <li>Immediate remedial steps taken</li>
            <li>High level of cooperation</li>
            <li>Self-reporting of breach</li>
            </ul>
            
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Guilty plea discount:</strong> Up to one-third reduction for early guilty
            plea, reducing to one-tenth if entered at trial.
            </p>
            
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Key Legal Principles to Remember</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Reasonably practicable:</strong> Cost must be grossly disproportionate to
            risk before measures can be avoided
            </li>
            <li>
            <strong>Foreseeability:</strong> Duty extends to risks that could reasonably be
            foreseen
            </li>
            <li>
            <strong>Vicarious liability:</strong> Employers liable for employees' negligence
            in course of employment
            </li>
            <li>
            <strong>Non-delegable duty:</strong> Cannot escape duty by delegating to
            contractors
            </li>
            <li>
            <strong>Criminal vs civil:</strong> Different standards of proof, separate
            proceedings
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Protecting Yourself as a Building Services Professional</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Ensure competence through training and CPD</li>
            <li>Document risk assessments and safe systems of work</li>
            <li>Follow industry standards (BS 7671, guidance notes)</li>
            <li>Report concerns through proper channels</li>
            <li>Maintain records of work, inspections, and tests</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Failures Leading to Prosecution</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Inadequate risk assessment:</strong> Generic or paper-exercise assessments
            </li>
            <li>
            <strong>Poor supervision:</strong> Workers left unsupervised for high-risk tasks
            </li>
            <li>
            <strong>Lack of safe systems:</strong> No permit-to-work where required
            </li>
            <li>
            <strong>Inadequate training:</strong> Workers not competent for tasks assigned
            </li>
            <li>
            <strong>Ignoring warnings:</strong> Known risks not addressed after near misses
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Director pressure to skip an isolation procedure"
            situation={
              <>
                A director instructs you, the HNC site supervisor, to authorise live work on
                an HV switchboard to keep a deadline. There is no Reg 14 documentation, no
                permit, no risk assessment update. The director says &ldquo;just sign it
                off, the lads know what they&rsquo;re doing.&rdquo;
              </>
            }
            whatToDo={
              <>
                Refuse in writing. Cite EAWR Reg 14 (live-work test), HSWA s.7 (your personal
                duty), HSWA s.37 (the director&rsquo;s personal liability), HSWA s.36 (the
                liability of any other person whose act or default leads to the offence).
                Escalate above the director if necessary. Document the conversation, the
                refusal and the rationale. If the work proceeds without your sign-off,
                report to HSE — your protection under ERA 1996 s.44 (whistleblowing) applies.
              </>
            }
            whyItMatters={
              <>
                Going along with the instruction transfers no liability — the supervisor and
                operatives become co-defendants. A documented refusal is the only defence,
                and the law actively protects the refuser.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Common-law duty of care underpins civil claims (negligence, vicarious liability); statutory duty drives criminal prosecution.',
              'HSWA s.36 — offence by another person — covers anyone whose act or default led to a breach, not just the employer.',
              'HSWA s.37 — directors and managers personally liable for offences attributable to their consent, connivance or neglect.',
              'Corporate Manslaughter and Corporate Homicide Act 2007 — gross-breach corporate offence with unlimited fines.',
              'Gross negligence manslaughter — individual common-law offence, up to life imprisonment.',
              'Sentencing Council 2016 guidelines tie fines to turnover and culpability — multi-million-pound fines now routine.',
              'Whistleblowing protection: ERA 1996 s.44 protects workers refusing unsafe work or raising safety concerns.',
              'Contemporaneous documentation is the strongest defence — record decisions, conversations, refusals and rationale at the time.',
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
              onClick={() => navigate('../h-n-c-module1-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Competence and Training
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section4_1;
