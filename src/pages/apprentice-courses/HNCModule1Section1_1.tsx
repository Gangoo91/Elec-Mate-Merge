/**
 * Module 1 · Section 1 · Subsection 1 — Health and Safety at Work Act 1974
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The umbrella statute under which every other UK workplace H&S regulation sits.
 *   Engineer-in-training perspective: how the Act frames duty-holder accountability
 *   on a building services project from concept to handover.
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

const TITLE = 'Health and Safety at Work Act 1974 - HNC Module 1 Section 1.1';
const DESCRIPTION =
  'Comprehensive guide to the Health and Safety at Work Act 1974 for building services engineers: employer duties, employee responsibilities, HSE enforcement and practical applications.';

const quickCheckQuestions = [
  {
    id: 'section2-duty',
    question:
      'Under Section 2 of HSWA 1974, who has the primary duty to ensure health, safety and welfare at work?',
    options: [
      'Employees',
      'Employers',
      'Local authorities',
      'The HSE',
    ],
    correctIndex: 1,
    explanation:
      'Section 2 places the primary duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees.',
  },
  {
    id: 'section7-employee',
    question: 'Under Section 7, what must employees do regarding health and safety?',
    options: [
      'Take reasonable care for themselves and others',
      'To hydraulically decouple primary and secondary circuits',
      'At least 5 minutes (check manufacturer\\\\\\\\\\\\\\\'s data)',
      'Adjusting activity timing to avoid resource overallocation',
    ],
    correctIndex: 0,
    explanation:
      'Section 7 requires employees to take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions at work.',
  },
  {
    id: 'improvement-notice',
    question:
      'What is the maximum timeframe typically given to comply with an HSE Improvement Notice?',
    options: [
      '24 hours',
      '7 days',
      '21 days minimum',
      '6 months',
    ],
    correctIndex: 2,
    explanation:
      'An Improvement Notice must allow at least 21 days for compliance, giving the duty holder time to rectify the contravention. Appeals must also be lodged within 21 days.',
  },
  {
    id: 'sfarp-meaning',
    question: "What does 'SFARP' mean in health and safety law?",
    options: [
      'Safety First And Risk Prevention',
      'Safe Framework And Regulatory Procedure',
      'Standard For Acceptable Risk Practice',
      'So Far As Reasonably Practicable',
    ],
    correctIndex: 3,
    explanation:
      "'So Far As Reasonably Practicable' (SFARP) means balancing the risk against the cost, time and effort needed to control it. If grossly disproportionate, the measure may not be required.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The Health and Safety at Work Act 1974 is primarily which type of legislation?',
    options: [
      'Store safely for future reference',
      'Enabling - provides framework for regulations',
      'True power divided by apparent power (cos φ)',
      'Both options above are partly correct.',
    ],
    correctAnswer: 1,
    explanation:
      'HSWA 1974 is enabling legislation that provides the broad framework under which more specific regulations (like the Electricity at Work Regulations 1989) are made.',
  },
  {
    id: 2,
    question:
      'Under Section 2, what must employers provide to employees regarding health and safety?',
    options: [
      'Section 2(2)(a) - safe plant and systems of work',
      'When there is risk of serious personal injury',
      'Information, instruction, training and supervision',
      'No - only employers with 5 or more employees',
    ],
    correctAnswer: 2,
    explanation:
      'Section 2(2)(c) requires employers to provide such information, instruction, training and supervision as is necessary to ensure, so far as is reasonably practicable, the health and safety at work of employees.',
  },
  {
    id: 3,
    question: 'Section 3 of HSWA 1974 places duties on employers regarding which group?',
    options: [
      'Health and Safety Executive (HSE)',
      'No - only employers with 5 or more employees',
      'Information, instruction, training and supervision',
      'Non-employees who may be affected by the work',
    ],
    correctAnswer: 3,
    explanation:
      'Section 3 requires employers to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment (visitors, contractors, public) are not exposed to risks.',
  },
  {
    id: 4,
    question: "What is the employee's duty under Section 7(a) of HSWA 1974?",
    options: [
      'To take reasonable care for their own health and safety and that of others',
      'Require contraventions to be remedied within a specified time',
      'They must balance risk reduction against cost, time and effort',
      'Intentionally or recklessly interfere with safety provisions',
    ],
    correctAnswer: 0,
    explanation:
      'Section 7(a) requires every employee to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work.',
  },
  {
    id: 5,
    question: 'What power does an HSE inspector have under an Improvement Notice?',
    options: [
      'Section 2(2)(a) - safe plant and systems of work',
      'Require contraventions to be remedied within a specified time',
      'Information, instruction, training and supervision',
      'No - only employers with 5 or more employees',
    ],
    correctAnswer: 1,
    explanation:
      'An Improvement Notice requires the duty holder to remedy a contravention within a specified period (minimum 21 days). It does not require immediate cessation of work unless the risk is imminent.',
  },
  {
    id: 6,
    question: 'When can an HSE inspector issue a Prohibition Notice?',
    options: [
      'Health and Safety Executive (HSE)',
      'Information, instruction, training and supervision',
      'When there is risk of serious personal injury',
      'No - only employers with 5 or more employees',
    ],
    correctAnswer: 2,
    explanation:
      'A Prohibition Notice can be issued when the inspector believes activities involve, or will involve, a risk of serious personal injury. It can take immediate effect and stop the dangerous activity.',
  },
  {
    id: 7,
    question:
      'What is the maximum prison sentence for certain offences under HSWA 1974 in the Crown Court?',
    options: [
      '6 months',
      '1 year',
      'Unlimited',
      '2 years',
    ],
    correctAnswer: 3,
    explanation:
      'Certain offences under HSWA 1974, when tried in the Crown Court, can result in up to 2 years imprisonment. This applies to breaches where there is a failure to comply with improvement or prohibition notices.',
  },
  {
    id: 8,
    question:
      'For building services work, which Section 2 duty is most relevant to electrical installation safety?',
    options: [
      'Section 2(2)(a) - safe plant and systems of work',
      'Section 2(2)(d) - safe working environment',
      'Section 2(2)(e) - welfare facilities',
      'Section 2(2)(b) - safe handling of substances',
    ],
    correctAnswer: 0,
    explanation:
      'Section 2(2)(a) requires provision and maintenance of safe plant and systems of work. This directly applies to electrical installations, testing equipment, and safe isolation procedures.',
  },
  {
    id: 9,
    question: 'Under Section 8, what must employees NOT do?',
    options: [
      'Require contraventions to be remedied within a specified time',
      'Intentionally or recklessly interfere with safety provisions',
      'They must balance risk reduction against cost, time and effort',
      'Section 2(2)(a) - safe plant and systems of work',
    ],
    correctAnswer: 1,
    explanation:
      'Section 8 prohibits any person from intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare. This includes tampering with guards, safety interlocks, or PPE.',
  },
  {
    id: 10,
    question: "How does 'reasonably practicable' apply to building services contractors?",
    options: [
      'They must eliminate all risks regardless of cost',
      'They only need to meet minimum legal requirements',
      'They must balance risk reduction against cost, time and effort',
      "They can ignore risks if the client doesn't require controls",
    ],
    correctAnswer: 2,
    explanation:
      "'Reasonably practicable' requires duty holders to weigh the risk against the sacrifice (cost, time, effort) needed to avert it. The greater the risk, the more you must do to control it.",
  },
  {
    id: 11,
    question: 'Which body is primarily responsible for enforcing HSWA 1974 on construction sites?',
    options: [
      'When circumstances change',
      'STOP all work immediately',
      'To avoid damage from high test voltages',
      'Health and Safety Executive (HSE)',
    ],
    correctAnswer: 3,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcing authority for construction sites and most workplaces. Local authorities enforce in retail, offices, hotels and catering premises.',
  },
  {
    id: 12,
    question:
      'A building services firm employs 6 people. Are they required to have a written health and safety policy?',
    options: [
      'No - only employers with 5 or more employees',
      'Only if requested by a client',
      'Yes - all employers must have one',
      'Only if they work on construction sites',
    ],
    correctAnswer: 0,
    explanation:
      'Section 2(3) requires employers with 5 or more employees to prepare a written statement of their health and safety policy and bring it to the attention of employees.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between HSWA 1974 and the Electricity at Work Regulations 1989?',
    answer:
      "HSWA 1974 is the primary enabling Act that sets out broad duties for all workplaces. The Electricity at Work Regulations 1989 are specific regulations made under HSWA, providing detailed requirements for electrical safety. EAWR contains absolute duties (no 'reasonably practicable' qualifier) for preventing danger from electricity.",
  },
  {
    question: 'Can employees be prosecuted under HSWA 1974?',
    answer:
      'Yes. Section 7 places duties on employees, and Section 36 allows prosecution of individuals whose acts or defaults led to an offence by their employer. Employees can face personal fines and, in serious cases, imprisonment for breaches.',
  },
  {
    question: 'What happens if I receive an Improvement Notice?',
    answer:
      'You must remedy the contravention within the specified time (minimum 21 days). You can appeal to an Employment Tribunal within 21 days, which suspends the notice until the appeal is heard. Failing to comply without a successful appeal is a criminal offence.',
  },
  {
    question: 'How does HSWA 1974 apply to self-employed building services engineers?',
    answer:
      'Section 3(2) requires self-employed persons to conduct their undertaking so that they and others are not exposed to risks. Self-employed electricians must still follow safe working practices and not endanger clients, other contractors, or the public.',
  },
  {
    question: 'What is the role of safety representatives under HSWA 1974?',
    answer:
      'Section 2(4) allows recognised trade unions to appoint safety representatives. These representatives can investigate hazards, inspect the workplace, represent employees in discussions with the employer, and attend safety committee meetings.',
  },
];

const HNCModule1Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1.1.1"
            title="Health and Safety at Work Act 1974"
            description="The foundation of UK workplace health and safety law and its application to building services engineering"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat HSWA 1974 as the enabling Act sitting above every regulation you cite on a building services project (EAWR, CDM, COSHH, PUWER).',
              'You can articulate Section 2, 3, 7 and 8 duties to your design team, your client and your sub-contractors — and hold each duty-holder to account.',
              'You apply "so far as is reasonably practicable" (SFARP) as a balancing test on every design and method-statement decision, not as a get-out clause.',
              'You recognise HSE enforcement powers (Improvement Notice, Prohibition Notice, FFI) and design risk out of the project to keep the firm out of court.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 2(1)"
            clause="It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees."
            meaning={
              <>
                As an HNC engineer you sit on both sides of this duty: an employee yourself, but
                soon a supervising or designing duty-holder. Every safe-system, every risk
                assessment and every spec decision you sign off has to demonstrate the SFARP test
                was applied — risk weighed against time, cost and effort to control it.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.2(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the structure and purpose of HSWA 1974",
              "Describe employer duties under Section 2",
              "Understand duties to non-employees under Section 3",
              "Explain employee responsibilities under Sections 7 and 8",
              "Describe HSE enforcement powers and penalties",
              "Apply HSWA requirements to building services work",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Introduction and Structure of HSWA 1974</ContentEyebrow>

          <ConceptBlock title="Introduction and Structure of HSWA 1974">
            <p>
            The Health and Safety at Work etc. Act 1974 (HSWA) is the primary piece of legislation
            covering occupational health and safety in Great Britain. It established the Health
            and Safety Commission (now merged into HSE) and created a framework for all subsequent
            health and safety regulations.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Key Characteristics of HSWA 1974
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Enabling Act:</strong> Provides framework for detailed regulations (e.g.,
            EAWR, PUWER, CDM)
            </li>
            <li>
            <strong>Goal-setting:</strong> States what must be achieved, not precisely how to
            achieve it
            </li>
            <li>
            <strong>Risk-based:</strong> Duties qualified by 'so far as reasonably
            practicable' (SFARP)
            </li>
            <li>
            <strong>Criminal law:</strong> Breaches are criminal offences, not civil matters
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Key Sections of HSWA 1974
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Section 2</strong> — Duty Holder: Employers. Summary: Duty to employees</li>
            <li><strong>Section 3</strong> — Duty Holder: Employers/Self-employed. Summary: Duty to non-employees</li>
            <li><strong>Section 4</strong> — Duty Holder: Premises controllers. Summary: Duty regarding premises</li>
            <li><strong>Section 6</strong> — Duty Holder: Manufacturers/suppliers. Summary: Duty regarding articles and substances</li>
            <li><strong>Section 7</strong> — Duty Holder: Employees. Summary: Duty to take care and cooperate</li>
            <li><strong>Section 8</strong> — Duty Holder: Everyone. Summary: Duty not to interfere with safety provisions</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> HSWA 1974 applies to all work activities. The Electricity
            at Work Regulations 1989, made under HSWA, provide specific requirements for
            electrical safety.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Employer Duties - Sections 2 and 3</ContentEyebrow>

          <ConceptBlock title="Employer Duties - Sections 2 and 3">
            <p>
            Sections 2 and 3 contain the primary duties placed on employers. These are the
            foundation of workplace safety management and apply to all building services
            contractors and employers.
            </p>

            
            <p><strong>Section 2 - Duties to Employees</strong></p>
            <p className="text-sm text-white mb-3">
            <strong>Section 2(1):</strong> "It shall be the duty of every employer to ensure, so
            far as is reasonably practicable, the health, safety and welfare at work of all his
            employees."
            </p>
            <p className="text-sm font-medium text-white mb-2">
            Section 2(2) requires provision of:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>(a) Safe plant and systems of work</strong> - Test equipment, isolation
            procedures, safe working methods
            </li>
            <li>
            <strong>(b) Safe handling, storage and transport</strong> - Materials, cables,
            equipment, hazardous substances
            </li>
            <li>
            <strong>(c) Information, instruction, training and supervision</strong> -
            Competence for electrical work
            </li>
            <li>
            <strong>(d) Safe workplace and access/egress</strong> - Working at height,
            confined spaces, site conditions
            </li>
            <li>
            <strong>(e) Safe working environment and welfare</strong> - Lighting, ventilation,
            rest facilities
            </li>
            </ul>
            

            
            <p><strong>Section 3 - Duties to Non-Employees</strong></p>
            <p className="text-sm text-white mb-3">
            <strong>Section 3(1):</strong> "It shall be the duty of every employer to conduct
            his undertaking in such a way as to ensure, so far as is reasonably practicable,
            that persons not in his employment who may be affected thereby are not exposed to
            risks to their health or safety."
            </p>
            <p className="text-sm font-medium text-white mb-2">
            For building services, this includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Client staff</strong> - Building occupants during installation or
            maintenance
            </li>
            <li>
            <strong>Other contractors</strong> - Coordination on multi-trade sites
            </li>
            <li>
            <strong>Visitors</strong> - Anyone entering the work area
            </li>
            <li>
            <strong>Members of the public</strong> - Especially in occupied premises
            </li>
            </ul>
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Applications
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Maintained and calibrated test instruments</li>
            <li>Safe isolation procedures (lock-off)</li>
            <li>Competent supervision of apprentices</li>
            <li>Risk assessments for electrical work</li>
            <li>Method statements for complex tasks</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Written Policy Requirement
            </p>
            <p className="text-sm text-white mb-2">
            Section 2(3) requires employers with <strong>5 or more employees</strong> to
            prepare and revise a written health and safety policy statement, including:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>General policy statement</li>
            <li>Organisation (responsibilities)</li>
            <li>Arrangements (procedures)</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key point:</strong> Section 3 means building services contractors must
            consider the safety of everyone who might be affected by their work, not just their
            own employees.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Employee Duties - Sections 7 and 8</ContentEyebrow>

          <ConceptBlock title="Employee Duties - Sections 7 and 8">
            <p>
            HSWA 1974 places clear legal duties on employees. These are personal responsibilities
            that cannot be transferred to the employer. Employees can be prosecuted personally for
            breaches.
            </p>

            
            <p><strong>Section 7 - Employee Duties</strong></p>
            
            <div>
            <p className="text-sm font-medium text-white mb-1">Section 7(a) - Duty of Care</p>
            <p className="text-sm text-white">
            "To take reasonable care for the health and safety of himself and of other
            persons who may be affected by his acts or omissions at work."
            </p>
            </div>
            <div>
            <p className="text-sm font-medium text-white mb-1">
            Section 7(b) - Duty to Cooperate
            </p>
            <p className="text-sm text-white">
            "To cooperate with his employer so far as is necessary to enable any duty or
            requirement imposed on the employer to be performed or complied with."
            </p>
            </div>
            
            

            
            <p><strong>Section 8 - Duty Not to Interfere</strong></p>
            <p className="text-sm text-white">
            "No person shall intentionally or recklessly interfere with or misuse anything
            provided in the interests of health, safety or welfare in pursuance of any of the
            relevant statutory provisions."
            </p>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Practical Examples for Building Services
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>S.7(a) Care for self</strong> — Compliance Example: Using safe isolation before work. Breach Example: Working live without justification</li>
            <li><strong>S.7(a) Care for others</strong> — Compliance Example: Posting warning signs, barriers. Breach Example: Leaving live conductors exposed</li>
            <li><strong>S.7(b) Cooperate</strong> — Compliance Example: Attending safety training. Breach Example: Ignoring safety instructions</li>
            <li><strong>S.8 Not interfere</strong> — Compliance Example: Keeping guards/covers in place. Breach Example: Bypassing RCD protection</li>
            </ul>
            
            

            <CommonMistake
            title="Section 36 - Personal Liability"
            whatHappens={<><p className="text-sm text-white">
            Where an offence by an employer is due to the act or default of another person
            (including an employee), that other person can be charged and convicted whether or
            not proceedings are taken against the employer. Individuals can face personal fines
            or imprisonment.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> "I was told to do it" is not a defence. Employees must
            refuse unreasonable instructions that would compromise safety.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>HSE Enforcement and Penalties</ContentEyebrow>

          <ConceptBlock title="HSE Enforcement and Penalties">
            <p>
            The Health and Safety Executive (HSE) is the enforcing authority for most workplaces,
            including construction sites and building services work. HSE inspectors have extensive
            powers under HSWA 1974.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            HSE Inspector Powers (Section 20)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Enter premises at any reasonable time (or any time if dangerous)
            </li>
            <li>Take a constable if obstruction is anticipated</li>
            <li>Examine, investigate, and take measurements/photographs</li>
            <li>Take samples of articles, substances, or the atmosphere</li>
            <li>Require persons to answer questions and sign declarations</li>
            <li>Inspect and take copies of documents</li>
            <li>
            Seize and render harmless any article causing imminent danger
            </li>
            </ul>
            

            
            <CommonMistake
            title="Improvement Notice (Section 21)"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Issued when contravention exists or is likely</li>
            <li>
            <strong>Minimum 21 days</strong> to comply
            </li>
            <li>Work can continue while remedying</li>
            <li>Appeal suspends the notice</li>
            <li>Must state contravention and reason</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />
            <CommonMistake
            title="Prohibition Notice (Section 22)"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Risk of <strong>serious personal injury</strong>
            </li>
            <li>
            Can take <strong>immediate effect</strong>
            </li>
            <li>Activity must stop until remedied</li>
            <li>Appeal does NOT suspend the notice</li>
            <li>No current contravention needed</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Penalties for Offences</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Breach of Sections 2-6</strong> — Magistrates' Court: Unlimited fine. Crown Court: Unlimited fine</li>
            <li><strong>Breach of Section 7 (employees)</strong> — Magistrates' Court: Unlimited fine. Crown Court: Unlimited fine</li>
            <li><strong>Breach of Improvement Notice</strong> — Magistrates' Court: Unlimited fine. Crown Court: Unlimited fine and/or 2 years prison</li>
            <li><strong>Breach of Prohibition Notice</strong> — Magistrates' Court: Unlimited fine and/or 6 months prison. Crown Court: Unlimited fine and/or 2 years prison</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Fee for Intervention (FFI)
            </p>
            <p className="text-sm text-white">
            Since 2012, HSE recovers its costs from duty holders who are found to be in material
            breach of health and safety law. The current rate is <strong>£163 per hour</strong>{' '}
            (2024) for all time spent investigating the breach, including site visits,
            correspondence and enforcement action.
            </p>
            

            <p className="text-sm text-white italic">
            <strong>Note:</strong> Corporate Manslaughter and Corporate Homicide Act 2007 creates
            a separate offence with unlimited fines for organisations whose gross breach causes
            death.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Services Applications">
            <p><strong>Section 2 - Safe Systems of Work</strong></p>
            <p className="text-sm text-white mb-3">For electrical work, safe systems include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Safe isolation procedure:</strong> Switch off, isolate, secure, prove
            dead, post warnings
            </li>
            <li>
            <strong>Permits to work:</strong> High voltage work, energised work when
            unavoidable
            </li>
            <li>
            <strong>Risk assessments:</strong> Task-specific assessments for non-routine work
            </li>
            <li>
            <strong>Method statements:</strong> Step-by-step procedures for complex
            installations
            </li>
            </ul>
            

            
            <p><strong>Section 2(2)(c) - Information, Instruction, Training</strong></p>
            <p className="text-sm text-white mb-3">
            Building services employers must ensure workers are competent through:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Formal qualifications:</strong> Level 3 Electrotechnical qualification,
            HNC/HND
            </li>
            <li>
            <strong>Ongoing training:</strong> BS 7671 updates, new technologies,
            equipment-specific
            </li>
            <li>
            <strong>Supervision:</strong> Appropriate oversight of apprentices and trainees
            </li>
            <li>
            <strong>Information:</strong> Access to current regulations, manufacturer guidance
            </li>
            </ul>
            

            
            <p><strong>Section 3 - Occupied Premises</strong></p>
            <p className="text-sm text-white mb-3">
            When working in occupied buildings, consider:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Coordination:</strong> Inform building manager/FM of work schedule and
            risks
            </li>
            <li>
            <strong>Segregation:</strong> Barriers, signs, managed access to work areas
            </li>
            <li>
            <strong>Emergency:</strong> Ensure fire escape routes remain accessible
            </li>
            <li>
            <strong>Services:</strong> Minimise disruption while maintaining safety
            </li>
            </ul>
            

            
            <p><strong>Record Keeping</strong></p>
            <p className="text-sm text-white mb-3">Evidence of HSWA compliance includes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Written health and safety policy (5+ employees)</li>
            <li>Risk assessments and method statements</li>
            <li>Training records and competence evidence</li>
            <li>Equipment inspection and calibration records</li>
            <li>Accident/incident reports and investigations</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Key Sections to Remember</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Section 2:</strong> Employer duties to employees (SFARP)
            </li>
            <li>
            <strong>Section 3:</strong> Duties to non-employees (SFARP)
            </li>
            <li>
            <strong>Section 7:</strong> Employee duty of care and cooperation
            </li>
            <li>
            <strong>Section 8:</strong> Duty not to interfere with safety provisions
            </li>
            <li>
            <strong>Section 20:</strong> Inspector powers
            </li>
            <li>
            <strong>Sections 21/22:</strong> Improvement and Prohibition Notices
            </li>
            </ul>
            </div>

            <div>
            <p><strong>SFARP Assessment</strong></p>
            <p className="text-sm text-white mb-2">
            'So far as reasonably practicable' requires weighing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Risk:</strong> Likelihood and severity of harm
            </li>
            <li>
            <strong>vs Sacrifice:</strong> Cost, time, effort to control the risk
            </li>
            <li>
            If sacrifice is grossly disproportionate to risk, measure may not be required
            </li>
            <li>
            Burden of proof is on the duty holder to show impracticability
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common Building Services Breaches</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Inadequate isolation procedures (working live unnecessarily)
            </li>
            <li>Insufficient supervision of apprentices/trainees</li>
            <li>Failure to coordinate with other contractors</li>
            <li>Poor housekeeping (trip hazards, blocked access)</li>
            <li>Uncalibrated or damaged test equipment</li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="HASAWA 1974 — Section 7"
            clause="It shall be the duty of every employee while at work to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work; and as regards any duty or requirement imposed on his employer or any other person by or under any of the relevant statutory provisions, to co-operate with him so far as is necessary to enable that duty or requirement to be performed or complied with."
            meaning={
              <>
                Section 7 binds you personally — apprentice, technician, engineer, supervisor or
                director. It is the legal basis for refusing an unsafe instruction and for raising
                a written safety concern through your firm&rsquo;s safety management system.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.7 — legislation.gov.uk"
          />

          <Scenario
            title="The contractor wants to energise an unfinished MCC for early commissioning"
            situation={
              <>
                You are the building services HNC supervisor on a fit-out. The principal contractor
                pushes to energise the main switchboard a week early so HVAC commissioning can
                start, even though the panel build is incomplete and the certifying engineer
                has not signed off.
              </>
            }
            whatToDo={
              <>
                Decline in writing, citing HSWA s.2 (safe systems of work), s.3 (duties to
                non-employees on site) and EAWR Reg 4 (the absolute duty to keep equipment safe).
                Offer a controlled alternative: temporary supply to a defined sub-board with
                isolation, lock-off and a permit-to-work for the limited commissioning scope.
                Record the decision in the site safety log.
              </>
            }
            whyItMatters={
              <>
                Energising an uncertified board exposes the contractor to a Prohibition Notice and
                exposes you personally to s.7 prosecution. A proportionate alternative protects the
                programme and the duty-holders.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'HSWA 1974 is enabling legislation — it sets duties, the regulations made under it (EAWR, CDM, COSHH, PUWER) set the technical detail.',
              'Section 2 places five core duties on the employer: safe plant/systems, safe handling, ITIS (information, instruction, training, supervision), safe place, welfare.',
              'Section 3 extends duties to non-employees affected by the work — a critical clause when you are on someone else&rsquo;s site or designing an occupied refurbishment.',
              'Section 7 puts a personal duty of care on every employee; Section 8 prohibits interference with safety provisions, with personal criminal liability under Section 36.',
              'SFARP requires a documented balance — risk vs sacrifice. The burden of proof sits with the duty-holder, not the regulator.',
              'HSE enforcement runs from FFI (£163/hr) through Improvement Notices (21-day minimum) and Prohibition Notices (immediate effect) to unlimited fines and 2-year custodial sentences.',
              'Employers with 5 or more employees must have a written H&S policy under s.2(3) — make sure you can find your firm&rsquo;s before any job starts.',
              'On a building services project HSWA underpins your CDM file, your method statements, your permits and your EICs — every layer of paperwork traces back to the Act.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Management of Health and Safety
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section1_1;
