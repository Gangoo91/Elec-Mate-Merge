/**
 * MOET · Module 1 · Section 1.4 · Subsection 1 — Health and Safety at Work Act 1974
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
 *   Knowledge  · "Health and safety regulations – key features and impact on role."
 *              · "Safe systems of work."
 *              · "Individual maintenance technician's roles and
 *                 responsibilities. Escalation procedures."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
 *
 * Content preserved from the original page; structure, shell and reading
 * measure rebuilt on the study-centre learning kit.
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
  RegsCallout,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Health and Safety at Work Act 1974 - MOET Module 1 Section 4.1';
const DESCRIPTION =
  'Comprehensive guide to the Health and Safety at Work Act 1974 (HSWA) for electrical maintenance technicians: structure, enabling act principles, Sections 2-8 duties, SFARP, safety policies, HSE enforcement and penalties.';

const quickCheckQuestions = [
  {
    id: 'hswa-enabling-act',
    question: "What does it mean that the HSWA 1974 is an 'enabling act'?",
    options: [
      'It allows employers to set their own safety standards without restriction',
      'It enables employees to refuse any work they consider dangerous',
      'It provides the framework under which more specific regulations can be made',
      'It enables the HSE to close any business immediately',
    ],
    correctIndex: 2,
    explanation:
      'The HSWA 1974 is an enabling act because it establishes the broad legal framework and grants powers to the Secretary of State to make more specific regulations (such as the Electricity at Work Regulations 1989) without needing a new Act of Parliament for each set of rules.',
  },
  {
    id: 'section2-duty',
    question:
      'Under Section 2 of the HSWA 1974, who has the primary duty to ensure the health, safety and welfare of employees at work?',
    options: [
      'The employee themselves',
      'The employer',
      'The local authority',
      'The Health and Safety Executive',
    ],
    correctIndex: 1,
    explanation:
      'Section 2 places the primary duty on the employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees. This includes providing safe systems of work, safe plant and equipment, and adequate information, instruction, training and supervision.',
  },
  {
    id: 'sfarp-meaning',
    question:
      "What does 'so far as is reasonably practicable' (SFARP) require duty holders to consider?",
    options: [
      'That every identified risk must be eliminated entirely, whatever the cost',
      'That the cheapest available control measure is selected in each case',
      'That controls are applied only where an enforcement notice has been served',
      'The degree of risk weighed against the time, trouble, cost and difficulty of reducing it',
    ],
    correctIndex: 3,
    explanation:
      'SFARP requires a balancing exercise: the degree of risk on one side, weighed against the sacrifice (time, trouble, cost and physical difficulty) of the measures needed to avert it. If the risk is significant, only grossly disproportionate costs would justify not taking action. This was established in the Edwards v. National Coal Board (1949) case.',
  },
  {
    id: 'hse-enforcement',
    question:
      'Which enforcement notice requires immediate cessation of an activity that the inspector considers involves a risk of serious personal injury?',
    options: ['Prohibition notice', 'Compliance notice', 'Warning notice', 'Improvement notice'],
    correctIndex: 0,
    explanation:
      'A prohibition notice is issued when an inspector considers there is a risk of serious personal injury. It can take immediate effect (a deferred prohibition notice sets a date) and requires the activity to cease until the matter is remedied. An improvement notice, by contrast, gives a specified time period to rectify a contravention.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The Health and Safety at Work Act 1974 is best described as:',
    options: [
      'A prescriptive act that lists the exact safety measures required for every type of workplace',
      'An enabling act that sets out broad duties and allows specific regulations to be made under it',
      'A civil law statute that only allows injured workers to claim compensation',
      'An act that applies solely to factories and industrial premises',
    ],
    correctAnswer: 1,
    explanation:
      'The HSWA 1974 is an enabling act — it establishes the overarching framework of duties and grants powers to create more detailed, specific regulations (such as EAWR 1989, PUWER, LOLER) through statutory instruments, without requiring a new Act of Parliament each time.',
  },
  {
    id: 2,
    question:
      'Section 2 of the HSWA 1974 requires employers to provide all of the following EXCEPT:',
    options: [
      'Information, instruction, training and supervision',
      'Safe plant and safe systems of work',
      'Free personal protective equipment for all visitors',
      'A safe working environment with adequate welfare facilities',
    ],
    correctAnswer: 2,
    explanation:
      'Section 2 requires employers to provide safe plant, safe systems of work, safe handling/storage/transport of substances, information/instruction/training/supervision, and a safe workplace with adequate welfare. There is no blanket requirement to provide free PPE to all visitors — though the PPE at Work Regulations may require it in specific circumstances.',
  },
  {
    id: 3,
    question: 'Under Section 3 of the HSWA 1974, employers must ensure the health and safety of:',
    options: [
      'Only employees who hold a permanent contract of employment',
      'Only employees who have completed their induction training',
      'Only agency workers and labour-only subcontractors',
      "Non-employees who may be affected by the employer's undertaking",
    ],
    correctAnswer: 3,
    explanation:
      "Section 3 extends the employer's duty beyond their own employees to include any person who is not their employee but who may be affected by the employer's undertaking. This covers contractors, visitors, members of the public, and anyone else who could be impacted by the work activity.",
  },
  {
    id: 4,
    question:
      "An electrical maintenance technician's duty under Section 7 of the HSWA 1974 includes:",
    options: [
      'Taking reasonable care for their own health and safety and that of others affected by their acts or omissions',
      'Drafting the written health and safety policy for the organisation',
      'Inspecting the workplace and issuing improvement notices to colleagues',
      'Ensuring all visitors and members of the public wear personal protective equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Section 7 places a duty on every employee to take reasonable care for their own health and safety and that of other persons who may be affected by their acts or omissions at work. For a maintenance technician, this means following safe isolation procedures, using PPE correctly, and not taking shortcuts that could endanger colleagues.',
  },
  {
    id: 5,
    question: 'Section 8 of the HSWA 1974 makes it an offence to:',
    options: [
      'Fail to attend a mandatory safety committee meeting when invited',
      'Intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare',
      'Refuse to carry out a task that has not been risk assessed',
      'Report a near miss without first informing your immediate supervisor',
    ],
    correctAnswer: 1,
    explanation:
      'Section 8 makes it a criminal offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare. Examples include removing safety guards from machinery, disabling RCDs, or misusing lock-off devices.',
  },
  {
    id: 6,
    question:
      'A written health and safety policy is required under Section 2(3) of the HSWA 1974 when an employer has:',
    options: [
      'Any number of employees',
      '10 or more employees',
      '5 or more employees',
      '50 or more employees',
    ],
    correctAnswer: 2,
    explanation:
      'Section 2(3) requires every employer with five or more employees to prepare and keep up to date a written statement of their general health and safety policy, the organisation for carrying it out, and the arrangements in force. This must be brought to the attention of all employees.',
  },
  {
    id: 7,
    question: 'The SFARP (so far as is reasonably practicable) principle means that:',
    options: [
      'All identified risks must be eliminated regardless of cost or difficulty',
      'Only risks that have already caused an injury need to be controlled',
      'The cheapest control measure is always the acceptable one to adopt',
      'The risk must be weighed against the sacrifice needed to reduce it — if grossly disproportionate, the duty is discharged',
    ],
    correctAnswer: 3,
    explanation:
      'SFARP requires duty holders to reduce risk unless the cost (in time, trouble, money and physical difficulty) is grossly disproportionate to the reduction in risk achieved. The burden of proof lies with the duty holder to demonstrate that it was not reasonably practicable to do more.',
  },
  {
    id: 8,
    question: 'An HSE inspector issues an improvement notice. The recipient must:',
    options: [
      'Remedy the contravention within the time period specified in the notice',
      'Cease the activity immediately until the matter is remedied',
      'Pay an on-the-spot fixed penalty within 14 days',
      'Close the premises pending a full HSE investigation',
    ],
    correctAnswer: 0,
    explanation:
      'An improvement notice specifies the contravention and gives a time period (not less than 21 days) within which the duty holder must remedy it. Work can continue during this period unless a separate prohibition notice is also issued. The recipient has a right of appeal to an employment tribunal within 21 days.',
  },
  {
    id: 9,
    question:
      'Under the HSWA 1974, the maximum penalty for certain offences tried on indictment (in the Crown Court) is:',
    options: [
      'A capped fine of £20,000 with no possibility of imprisonment',
      "An unlimited fine and/or up to 2 years' imprisonment",
      'A formal written caution recorded against the company',
      "Suspension of the company's trading licence for 12 months",
    ],
    correctAnswer: 1,
    explanation:
      'For the most serious offences under the HSWA 1974 tried on indictment in the Crown Court, the maximum penalty is an unlimited fine and/or imprisonment for up to 2 years. Additionally, the Sentencing Council guidelines (2016) have led to significantly higher fines, particularly for larger organisations.',
  },
  {
    id: 10,
    question: 'How does the HSWA 1974 apply specifically to electrical maintenance work?',
    options: [
      'It sets the maximum permitted touch voltage for electrical equipment',
      'It specifies the test sequence for inspecting an electrical installation',
      'It provides the overarching legal framework under which the Electricity at Work Regulations 1989 were made',
      'It mandates the use of BS 7671 as legally binding for all installation work',
    ],
    correctAnswer: 2,
    explanation:
      'The HSWA 1974 is the parent legislation under which the Electricity at Work Regulations 1989 were made using powers in Section 15. All electrical maintenance work falls under the general duties of the HSWA and the specific requirements of the EAWR. BS 7671 is a non-statutory standard, not legislation.',
  },
  {
    id: 11,
    question: 'Safety representatives appointed by recognised trade unions have the right to:',
    options: [
      'Issue prohibition notices to stop dangerous work activities',
      'Prosecute the employer directly in the Crown Court',
      'Set the company health and safety budget each year',
      'Inspect the workplace, investigate complaints and attend safety committee meetings',
    ],
    correctAnswer: 3,
    explanation:
      'Under the Safety Representatives and Safety Committees Regulations 1977 (made under the HSWA), trade union-appointed safety representatives have the right to inspect the workplace, investigate potential hazards and complaints, attend safety committee meetings, and be consulted by the employer on health and safety matters. They cannot issue enforcement notices — only HSE inspectors can do that.',
  },
  {
    id: 12,
    question:
      'Under ST1426, knowledge of the HSWA 1974 maps to which area of the apprenticeship standard?',
    options: [
      'Statutory and regulatory compliance within health and safety',
      'Selection and use of hand and power tools',
      'Interpretation of electrical schematic and wiring diagrams',
      'Planned preventive maintenance scheduling techniques',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 (Maintenance and Operations Engineering Technician) requires knowledge of statutory and regulatory requirements relating to health and safety. The HSWA 1974 is the foundational legislation that underpins all workplace health and safety duties, making it a core knowledge requirement for the standard.',
  },
];

const faqs = [
  {
    question: 'Does the HSWA 1974 apply to self-employed electricians?',
    answer:
      'Yes. Section 3(2) places duties on self-employed persons to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that they and other persons who may be affected are not exposed to risks to their health or safety. A sole trader electrical maintenance engineer has the same duties as a large employer in terms of not creating risks for others.',
  },
  {
    question: "What is the difference between 'absolute' duties and 'SFARP' duties in the HSWA?",
    answer:
      "Absolute duties use the word 'shall' with no qualification — they must be complied with regardless of cost (e.g., Section 8). SFARP duties include the phrase 'so far as is reasonably practicable', allowing a cost-benefit analysis. Most duties under the HSWA are SFARP duties. However, under the EAWR 1989, many regulations impose absolute duties for electrical safety specifically.",
  },
  {
    question: 'Can an employee be prosecuted under the HSWA 1974?',
    answer:
      "Yes. Sections 7 and 8 place duties directly on employees. An employee who recklessly interferes with safety equipment (Section 8) or who fails to take reasonable care (Section 7) can be prosecuted personally. In practice, prosecutions of employees are less common than those of employers, but they do occur — particularly where the employee's actions were clearly reckless or negligent.",
  },
  {
    question: 'How does the HSWA interact with the Corporate Manslaughter Act 2007?',
    answer:
      'The Corporate Manslaughter and Corporate Homicide Act 2007 creates a separate offence for organisations whose gross failures in managing health and safety cause death. A prosecution under this Act does not prevent a parallel prosecution under the HSWA 1974. Individual directors and managers can be prosecuted under HSWA Section 37 if the offence was committed with their consent, connivance, or neglect.',
  },
  {
    question: "What happened to the 'six-pack' regulations made under the HSWA?",
    answer:
      "The 'six-pack' refers to the 1992 regulations implementing EU directives: Management of H&S at Work, Workplace Regulations, Manual Handling, Display Screen Equipment, PPE, and PUWER. All remain in force (with amendments) post-Brexit as retained UK law. They sit beneath the HSWA 1974 in the legislative hierarchy, providing more specific requirements within the overarching framework.",
  },
];

const MOETModule1Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.4 · Subsection 1"
        title="Health and Safety at Work Act 1974"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            The cornerstone of UK health and safety legislation.
          </p>

          <TLDR
            points={[
              'HSWA: The primary UK health and safety legislation — an enabling act.',
              'Sections 2–8: Core duties on employers, employees and others.',
              'SFARP: So far as is reasonably practicable — the key legal test.',
              'Enforcement: HSE inspectors, improvement and prohibition notices.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Parent act:</strong> EAWR 1989 made under HSWA Section 15 powers
              </li>
              <li>
                <strong>Section 2:</strong> Safe plant, systems of work, training for technicians
              </li>
              <li>
                <strong>Section 7:</strong> Your personal duty as an employee
              </li>
              <li>
                <strong>ST1426:</strong> Maps to statutory and regulatory compliance KSBs
              </li>
            </ul>
          </ConceptBlock>

          <Prerequisites
            items={[
              {
                term: 'Electricity at Work Regulations 1989',
                gist: 'The specific electrical regulations made under HSWA Section 15 powers — this page is the parent framework they sit beneath.',
                where: '1.4.2',
              },
              {
                term: 'BS 7671',
                gist: 'A non-statutory standard, not legislation — compliance with it is one way of showing the statutory duties on this page have been met.',
                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the structure and purpose of the HSWA 1974 as an enabling act',
              'Describe the duties imposed by Sections 2 to 8 on employers and employees',
              'Define and apply the SFARP principle to electrical maintenance scenarios',
              'Outline the requirements for a written safety policy under Section 2(3)',
              'Explain HSE enforcement powers including improvement and prohibition notices',
              'Identify penalties for breaches and the relevance of the Act to ST1426',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Structure and purpose</ContentEyebrow>

          <ConceptBlock title="Structure and Purpose of the HSWA 1974">
            <p>
              The Health and Safety at Work etc. Act 1974 (commonly abbreviated to HSWA or HASAWA)
              is the primary piece of legislation governing workplace health and safety in Great
              Britain. It was introduced following the Robens Report (1972), which identified that
              the existing patchwork of prescriptive industry-specific regulations was ineffective
              and recommended a single, overarching statutory framework.
            </p>
            <p>
              The Act is an <strong>enabling act</strong>, which means it does not attempt to
              prescribe specific safety measures for every conceivable workplace situation. Instead,
              it establishes broad, goal-setting duties and grants the Secretary of State powers
              (under Section 15) to make more detailed regulations through statutory instruments.
              This is how the Electricity at Work Regulations 1989, PUWER 1998, LOLER 1998, and many
              other sets of regulations came into existence — they were all made under the powers of
              the HSWA 1974.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Structure of the Act">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part I (Sections 1–54):</strong> Health, safety and welfare in connection
                with work — the core duties, enforcement powers, and administration
              </li>
              <li>
                <strong>Part II (Sections 55–60):</strong> The Employment Medical Advisory Service
                (EMAS)
              </li>
              <li>
                <strong>Part III (Sections 61–76):</strong> Building regulations (now largely
                replaced by the Building Act 1984)
              </li>
              <li>
                <strong>Part IV (Sections 77–85):</strong> Miscellaneous and general provisions
              </li>
              <li>
                <strong>Schedules 1–10:</strong> Supplementary provisions including the constitution
                of the HSE and transitional arrangements
              </li>
            </ul>
            <p>
              For electrical maintenance technicians, Part I is the critical section. It contains
              the general duties (Sections 2–9), the role of the Health and Safety Commission and
              Executive (Section 10–14, now merged into a single body — the HSE), and the powers to
              make regulations (Section 15) and approve codes of practice (Section 16).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Why the HSWA Matters for Electrical Maintenance">
            <p>
              Every piece of electrical safety legislation, every approved code of practice, and
              every guidance note traces its authority back to the HSWA 1974. Understanding the Act
              is not academic — it is the foundation upon which your entire legal framework rests.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>The Electricity at Work Regulations 1989 — made under HSWA Section 15</li>
              <li>HSE Guidance Notes (GS38, HSG85) — published under HSWA Section 11</li>
              <li>Approved Codes of Practice — approved under HSWA Section 16</li>
              <li>HSE enforcement powers — granted under HSWA Sections 20–25</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Before the HSWA 1974">
            <p>
              Prior to 1974, workplace safety was governed by a patchwork of industry-specific
              statutes (Factories Act 1961, Offices, Shops and Railway Premises Act 1963, Mines and
              Quarries Act 1954). Approximately 8 million workers had no statutory safety protection
              at all. The Robens Report found that this fragmented approach was failing, with around
              1,000 workers killed and 500,000 injured each year. The HSWA brought all workers under
              a single framework for the first time.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>General duties: Sections 2 to 8</ContentEyebrow>

          <ConceptBlock title="Criminal law duties, not civil liability">
            <p>
              Sections 2 to 8 form the core of the HSWA 1974. They impose duties on employers,
              employees, self-employed persons, designers, manufacturers, importers, suppliers, and
              anyone in control of premises. These are <strong>criminal law duties</strong> — breach
              is a criminal offence, not merely a civil liability.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSWA 1974 — Section 2(1)"
            clause="It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees."
            meaning={
              <>
                <strong>For maintenance technicians:</strong> Section 2(2)(a) means your employer
                must provide safe test instruments, properly maintained power tools, and safe
                isolation procedures. Section 2(2)(c) means they must train you adequately in safe
                working practices.
              </>
            }
            cite="Reference: Health and Safety at Work etc. Act 1974, Section 2"
          />

          <ConceptBlock title="Section 2 — Duties of Employers to Employees">
            <p>Section 2(2) specifies this includes:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a)</strong> Provision and maintenance of plant and systems of work that
                are, SFARP, safe and without risks to health
              </li>
              <li>
                <strong>(b)</strong> Arrangements for ensuring, SFARP, safety and absence of risks
                in the use, handling, storage and transport of articles and substances
              </li>
              <li>
                <strong>(c)</strong> Provision of such information, instruction, training and
                supervision as necessary to ensure, SFARP, the health and safety at work of
                employees
              </li>
              <li>
                <strong>(d)</strong> Maintenance of any place of work under the employer&apos;s
                control in a safe condition, SFARP, and provision and maintenance of safe means of
                access and egress
              </li>
              <li>
                <strong>(e)</strong> Provision and maintenance of a working environment that is,
                SFARP, safe, without risks to health, and adequate as regards facilities and
                arrangements for welfare
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Section 2(3) — Written Safety Policy">
            <p>
              Every employer with five or more employees must prepare (and keep up to date) a
              written statement of their general health and safety policy, together with the
              organisation and arrangements for carrying it out. This policy must be brought to the
              attention of all employees. For electrical contractors, this typically includes safe
              isolation procedures, permit to work arrangements, PPE requirements, and emergency
              procedures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Section 3 — Duties to Non-Employees">
            <p>
              Employers and self-employed persons must conduct their undertaking so that persons not
              in their employment are not exposed to risks to their health or safety. For electrical
              maintenance, this means your work must not create risks for building occupants, other
              contractors, visitors, or members of the public. Isolation of circuits must consider
              the impact on fire alarms, emergency lighting, and life safety systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Section 4 — Duties of Persons in Control of Premises">
            <p>
              Persons in control of non-domestic premises must ensure, SFARP, that the premises,
              means of access and egress, and any plant or substance in the premises are safe and
              without risks to health. This is particularly relevant to building owners and
              facilities managers who control the premises where maintenance technicians work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Section 6 — Duties of Designers, Manufacturers, Importers and Suppliers">
            <p>
              Those who design, manufacture, import or supply articles for use at work must ensure
              they are safe when properly used. This applies to manufacturers of electrical
              equipment, switchgear, test instruments and protective devices. They must carry out
              testing, provide adequate information, and undertake research to eliminate or minimise
              risks.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section 7 — Duties of Employees"
            onSite="For maintenance technicians: this means following safe isolation procedures, wearing required PPE, reporting defective equipment, and not taking shortcuts. If you bypass a lock-off or fail to prove dead, you are breaching Section 7."
          >
            <p>Every employee has a duty to:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a)</strong> Take reasonable care for the health and safety of themselves
                and of other persons who may be affected by their acts or omissions at work
              </li>
              <li>
                <strong>(b)</strong> Co-operate with their employer so far as is necessary to enable
                the employer to comply with any duty or requirement imposed on them
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Section 8 — Duty Not to Interfere">
            <p>
              No person shall intentionally or recklessly interfere with or misuse anything provided
              in the interests of health, safety or welfare. This is an{' '}
              <strong>absolute duty</strong> — there is no SFARP qualification. Removing a safety
              guard, disabling an RCD, bypassing a lock-off, or removing warning signs are all
              offences under Section 8.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The general duties at a glance">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Key Duty</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Qualified?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">2</td>
                    <td className="border border-white/10 px-3 py-2">Employer</td>
                    <td className="border border-white/10 px-3 py-2">H&amp;S of employees</td>
                    <td className="border border-white/10 px-3 py-2">SFARP</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">3</td>
                    <td className="border border-white/10 px-3 py-2">Employer / self-employed</td>
                    <td className="border border-white/10 px-3 py-2">H&amp;S of non-employees</td>
                    <td className="border border-white/10 px-3 py-2">SFARP</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">4</td>
                    <td className="border border-white/10 px-3 py-2">
                      Person in control of premises
                    </td>
                    <td className="border border-white/10 px-3 py-2">Safe premises</td>
                    <td className="border border-white/10 px-3 py-2">SFARP</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">6</td>
                    <td className="border border-white/10 px-3 py-2">
                      Designer / manufacturer / supplier
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Safe articles and substances
                    </td>
                    <td className="border border-white/10 px-3 py-2">SFARP</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">7</td>
                    <td className="border border-white/10 px-3 py-2">Employee</td>
                    <td className="border border-white/10 px-3 py-2">
                      Reasonable care; co-operation
                    </td>
                    <td className="border border-white/10 px-3 py-2">Reasonable care</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">8</td>
                    <td className="border border-white/10 px-3 py-2">Any person</td>
                    <td className="border border-white/10 px-3 py-2">Do not interfere / misuse</td>
                    <td className="border border-white/10 px-3 py-2">Absolute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>SFARP and safety policies</ContentEyebrow>

          <ConceptBlock title="The SFARP Principle and Safety Policies">
            <p>
              The phrase &quot;so far as is reasonably practicable&quot; (SFARP) appears throughout
              the HSWA 1974 and is the legal standard against which most duties are measured.
              Understanding SFARP is essential for every maintenance technician because it
              determines what your employer must provide and what you must do.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The Edwards v. National Coal Board Test (1949)">
            <p>
              The leading case on SFARP is Edwards v. National Coal Board [1949]. The Court of
              Appeal held that &quot;reasonably practicable&quot; is narrower than &quot;physically
              possible&quot;. It involves a balancing exercise:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>On one side:</strong> The degree of risk — the likelihood and severity of
                potential harm
              </li>
              <li>
                <strong>On the other:</strong> The sacrifice — the cost, time, trouble and physical
                difficulty of the measures needed to avert the risk
              </li>
            </ul>
            <p>
              If the risk is significant, it can only be left unaddressed if the cost of remedial
              measures would be <strong>grossly disproportionate</strong> to the risk. Note: the
              test is not about proportionate cost — the cost must be <em>grossly</em>{' '}
              disproportionate, placing the burden firmly on the duty holder.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SFARP in Practice — Electrical Examples">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Providing GS38-compliant voltage indicators — cost is low, risk of electrocution
                without them is fatal: clearly reasonably practicable
              </li>
              <li>
                Replacing an entire 30-year-old switchboard because one minor component has corroded
                — cost may be grossly disproportionate to the risk if the component can be repaired
              </li>
              <li>
                Providing arc flash PPE for work on energised 400 V switchgear — cost is modest
                compared to the risk of severe arc flash burns: clearly reasonably practicable
              </li>
              <li>
                Installing lock-off facilities on every miniature circuit breaker in a domestic
                consumer unit — cost may be disproportionate, but providing a lock-off kit for the
                main switch is reasonably practicable
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Burden of Proof">
            <p>
              Under Section 40 of the HSWA 1974, the burden of proof lies with the accused to
              demonstrate that it was not reasonably practicable to do more than was in fact done.
              This is a reverse burden — the prosecution does not need to prove that more should
              have been done; the employer must prove it was not reasonably practicable. This is
              particularly significant in prosecution cases following electrical fatalities.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safety Policy Requirements — Section 2(3)">
            <p>
              Employers with five or more employees must have a written health and safety policy
              containing three parts:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General statement of intent:</strong> A declaration of the employer&apos;s
                commitment to health and safety, signed by the most senior person in the
                organisation
              </li>
              <li>
                <strong>Organisation:</strong> Who is responsible for what — the chain of command
                for health and safety, named individuals, reporting lines, and competent persons
              </li>
              <li>
                <strong>Arrangements:</strong> The practical systems in place — risk assessment
                procedures, safe isolation policies, PTW systems, PPE provision, training
                programmes, emergency procedures, monitoring and review
              </li>
            </ul>
            <p>
              The policy must be kept up to date and brought to the attention of all employees. For
              electrical maintenance contractors, the arrangements section should include specific
              reference to safe isolation procedures, live working policies, test instrument
              management, and work at height procedures.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Safety Representatives and Consultation"
            onSite="As a maintenance technician, you have the right to be consulted on health and safety matters affecting your work and to raise concerns without fear of detriment."
          >
            <p>
              The HSWA 1974 provides for employee involvement in health and safety through two
              mechanisms:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety Representatives and Safety Committees Regulations 1977:</strong>{' '}
                Where a trade union is recognised, it can appoint safety representatives who have
                the right to inspect the workplace, investigate potential hazards, represent
                employees in consultations with the employer, attend safety committee meetings, and
                receive paid time off for training
              </li>
              <li>
                <strong>Health and Safety (Consultation with Employees) Regulations 1996:</strong>{' '}
                Where there is no recognised trade union, employers must consult employees directly
                or through elected representatives of employee safety (ROES)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Enforcement and penalties</ContentEyebrow>

          <ConceptBlock title="HSE Enforcement Powers and Penalties">
            <p>
              The HSWA 1974 established the Health and Safety Executive (HSE) as the primary
              enforcement body. HSE inspectors have extensive powers under Sections 20–25 of the
              Act, and understanding these powers is important for maintenance technicians who may
              encounter inspectors during site visits or following incidents.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Inspector Powers (Section 20)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Enter premises at any reasonable time (or at any time if there is a dangerous
                situation)
              </li>
              <li>Take a police officer if obstruction is anticipated</li>
              <li>Examine and investigate as necessary</li>
              <li>
                Direct that premises or anything in them be left undisturbed for investigation
              </li>
              <li>Take measurements, photographs and recordings</li>
              <li>Take samples of articles and substances</li>
              <li>Require any person to answer questions and sign a declaration of truth</li>
              <li>Require the production of books, documents and records</li>
              <li>
                Seize and render harmless any article or substance that is a cause of imminent
                danger
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Improvement Notices (Section 21)">
            <p>
              Issued when an inspector is of the opinion that a person is contravening a statutory
              provision or has contravened it in circumstances that make it likely the contravention
              will continue or be repeated.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>States the contravention and the provision breached</li>
              <li>
                Specifies the period within which the contravention must be remedied (not less than
                21 days)
              </li>
              <li>May direct the manner in which the contravention should be remedied</li>
              <li>Work can continue during the compliance period unless separately prohibited</li>
              <li>
                Right of appeal to an employment tribunal within 21 days (appeal suspends the
                notice)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Prohibition Notices (Section 22)">
            <p>
              Issued when an inspector is of the opinion that an activity involves, or will involve,
              a risk of serious personal injury.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Can take immediate effect or be deferred to a specified date</li>
              <li>
                Directs that the activity shall not be carried on until the matter is remedied
              </li>
              <li>Does not need to involve a contravention — the risk alone is sufficient</li>
              <li>Right of appeal, but the appeal does NOT suspend a prohibition notice</li>
              <li>Contravention of a prohibition notice is a criminal offence</li>
            </ul>
            <p>
              <strong>Example:</strong> An HSE inspector visiting a commercial premises observes a
              maintenance technician working in a live 400 V distribution board without arc flash
              PPE, barriers, or a documented risk assessment. The inspector could issue an immediate
              prohibition notice stopping all live work until adequate precautions are in place.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Penalties and Sentencing">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Offence</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Magistrates&apos; Court
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Crown Court</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Breach of Sections 2–6</td>
                    <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    <td className="border border-white/10 px-3 py-2">
                      Unlimited fine and/or up to 2 years&apos; imprisonment
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Breach of Section 7 or 8</td>
                    <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    <td className="border border-white/10 px-3 py-2">
                      Unlimited fine and/or up to 2 years&apos; imprisonment
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Breach of improvement notice
                    </td>
                    <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    <td className="border border-white/10 px-3 py-2">
                      Unlimited fine and/or up to 2 years&apos; imprisonment
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Breach of prohibition notice
                    </td>
                    <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    <td className="border border-white/10 px-3 py-2">
                      Unlimited fine and/or up to 2 years&apos; imprisonment
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Section 37 (director/manager consent)
                    </td>
                    <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    <td className="border border-white/10 px-3 py-2">
                      Unlimited fine and/or up to 2 years&apos; imprisonment
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The Sentencing Council Health and Safety Offences Guidelines (2016) have led to
              dramatically higher fines. Large organisations convicted of offences causing death
              have received fines in the millions of pounds. The guidelines consider the culpability
              of the offender, the seriousness of harm risked, the likelihood of harm, and the
              organisation&apos;s turnover.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key point — personal liability under Section 37">
            <p>
              Section 37 allows individual directors and managers to be prosecuted personally if an
              offence was committed with their consent, connivance, or was attributable to their
              neglect. This means senior managers who fail to resource electrical safety properly
              can face personal criminal liability.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Application to electrical maintenance</ContentEyebrow>

          <ConceptBlock title="Application to Electrical Maintenance and ST1426">
            <p>
              The HSWA 1974 is not merely theoretical legislation — it has direct, daily
              implications for your work as an electrical maintenance technician. Understanding how
              the Act applies in practice will help you recognise your rights, fulfil your duties,
              and work safely and lawfully.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Your Employer's Duties to You">
            <p>Under Section 2, your employer must provide:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safe plant:</strong> GS38-compliant test instruments, properly maintained
                power tools, calibrated equipment, lock-off devices, and appropriate PPE
              </li>
              <li>
                <strong>Safe systems of work:</strong> Documented safe isolation procedures, permit
                to work systems, risk assessments, and method statements
              </li>
              <li>
                <strong>Information and training:</strong> Initial induction training, ongoing CPD,
                specific training for new equipment or procedures, access to BS 7671 and relevant
                guidance
              </li>
              <li>
                <strong>Supervision:</strong> Appropriate level of supervision based on your
                experience and the risk of the work — more supervision for apprentices, less for
                experienced technicians
              </li>
              <li>
                <strong>Safe workplace:</strong> Adequate lighting, ventilation, and access in
                switchrooms; safe means of access to equipment at height; welfare facilities on site
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Your Duties as an Employee">
            <p>Under Sections 7 and 8, you must:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Follow safe isolation procedures every time — no shortcuts</li>
              <li>Use the PPE provided — arc flash protection, insulated gloves, safety boots</li>
              <li>
                Report defective equipment immediately — do not use a faulty voltage indicator
              </li>
              <li>Co-operate with safety training and assessments</li>
              <li>
                Not interfere with safety equipment — never bypass an RCD, remove a lock-off, or
                disable a safety guard
              </li>
              <li>Report hazards and near-misses through your employer&apos;s reporting system</li>
              <li>
                Refuse to carry out work that you reasonably believe puts you or others at serious
                risk
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 Mapping">
            <p>
              The Maintenance and Operations Engineering Technician standard (ST1426) requires
              knowledge of statutory and regulatory requirements for health and safety. The HSWA
              1974 is the foundational legislation. In your End Point Assessment, you may be asked
              about the general duties, SFARP, enforcement mechanisms, and how the Act relates to
              more specific regulations such as the EAWR 1989.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Interaction with Other Legislation">
            <p>
              The HSWA sits at the top of the regulatory hierarchy. Below it sit specific
              regulations (EAWR, PUWER, LOLER, COSHH, CDM), approved codes of practice (which have a
              special legal status — compliance is not compulsory, but failure to comply can be used
              as evidence of contravention), and HSE guidance notes (advisory, not legally binding,
              but representing good practice).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Practical Scenario"
            onSite="Note: The Employment Rights Act 1996 (Section 44) protects employees from detriment for refusing to work in circumstances they reasonably believe to be dangerous. You cannot lawfully be disciplined or dismissed for refusing unsafe work — provided your belief is reasonable and you follow your employer's reporting procedures."
          >
            <p>
              You arrive on site to carry out planned maintenance on a distribution board. The
              client says there is no means of isolating the board and asks you to work live. Your
              employer&apos;s safety policy states that all work must be carried out dead unless a
              documented justification for live working exists. Under Section 7, you have a duty to
              take reasonable care — which means refusing to carry out work that is contrary to your
              employer&apos;s safe system of work. Under Section 2, your employer has a duty to
              provide safe systems of work — the safe isolation procedure. You should inform the
              client that you cannot work live without proper authorisation, inform your employer,
              and not proceed until a safe method of working is agreed.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'S.2 — Employer duties to employees (SFARP).',
              'S.3 — Duties to non-employees (SFARP).',
              'S.4 — Duties of persons controlling premises.',
              'S.6 — Duties of designers/manufacturers/suppliers.',
              'S.7 — Employee duties (reasonable care).',
              'S.8 — Do not interfere or misuse (absolute).',
              'Improvement notice — remedy within specified period.',
              'Prohibition notice — cease activity immediately.',
              "Prosecution — unlimited fines, up to 2 years' prison.",
              'Section 37 — personal liability for directors/managers.',
              'Sentencing Council guidelines (2016) — significantly higher fines.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section 3.5
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Electricity at Work Regulations
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section4_1;
