/**
 * MOET · Module 6 · Section 1 · Subsection 2 — Legal and Safety Reasons
 * (EAWR, BS 7671 Principles)
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Two deliberate departures from the usual conversion, both reasoned, not
 * oversights:
 *  - The original's "Quiz (10 Questions)" block is ten plain recall Q&A
 *    pairs with no options and no correct-answer index — it is not
 *    multiple-choice data. Rather than fabricate distractors to force it
 *    into <Quiz>, the ten pairs are preserved verbatim as a "Quick recall"
 *    ConceptBlock, and no <Bleed><Quiz .../></Bleed> section is rendered.
 *  - The original has no `faqs` array, so no <FAQ> is rendered either —
 *    inventing FAQ content was not an option.
 *
 * Accuracy correction: "Practical Guidance" said to keep up to date with
 * amendments "currently 18th Edition with Amendment 2". BS 7671's current
 * edition is 2018+A4:2026 (Amendment 4), not Amendment 2 — corrected below.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Legal and Safety Reasons (EAWR, BS 7671 Principles) - MOET Module 6 Section 1.2';
const DESCRIPTION =
  'Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance';

const quickCheckQuestions = [
  {
    id: 'eawr-check',
    question: 'What is the key principle of the Electricity at Work Regulations (EAWR 1989)?',
    options: [
      'Systems must be energy efficient',
      'All electrical systems must be constructed, maintained, and tested so they are safe to use',
      'Installation costs must be minimised',
      'Only qualified electricians can work on systems',
    ],
    correctIndex: 1,
    explanation:
      'The EAWR 1989 establishes that all electrical systems must be constructed, maintained, and tested to ensure they are safe to use at all times.',
  },
  {
    id: 'bs7671-check',
    question: 'What does BS 7671 require for new electrical installations?',
    options: [
      'Only visual inspection',
      'Initial verification before energising',
      'Annual testing only',
      'No specific requirements',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 requires initial verification of all new installations before they are energised, ensuring they meet safety standards.',
  },
  {
    id: 'responsibility-check',
    question:
      'Who takes legal responsibility for safety when signing an Electrical Installation Certificate?',
    options: [
      'The employer only',
      'The client',
      'The person signing the certificate',
      'The testing equipment manufacturer',
    ],
    correctIndex: 2,
    explanation:
      'The person who signs the Electrical Installation Certificate takes full legal responsibility for the safety of the installation.',
  },
  {
    id: 'consequences-check',
    question:
      'What are potential consequences for electricians who fail to comply with regulations?',
    options: [
      'Only verbal warnings',
      'Prosecution, loss of employment, damaged reputation',
      'Small fines only',
      'No consequences',
    ],
    correctIndex: 1,
    explanation:
      'Non-compliance can lead to serious consequences including prosecution, loss of employment, and permanent damage to professional reputation.',
  },
];

const recallQuestions = [
  {
    question: 'What year were the Electricity at Work Regulations introduced?',
    answer: '1989.',
  },
  {
    question: 'What do Regulations 4(1) & 4(2) of EAWR require?',
    answer: 'That systems must be safe and maintained in a safe condition.',
  },
  {
    question: 'Which standard sets out the technical requirements for inspection and testing?',
    answer: 'BS 7671 Wiring Regulations.',
  },
  {
    question:
      'True or False: It is acceptable to sign an installation certificate without testing if you trust the installer.',
    answer: 'False.',
  },
  {
    question: 'What are two key types of inspection required under BS 7671?',
    answer: 'Initial verification and periodic inspection.',
  },
  {
    question: 'What must all test instruments be?',
    answer: 'Calibrated and approved.',
  },
  {
    question: 'Give one legal consequence of failing to comply with EAWR 1989.',
    answer: 'Prosecution, fines, or imprisonment.',
  },
  {
    question:
      'Who is legally responsible for safety once they sign the Electrical Installation Certificate?',
    answer: 'The person who signs the certificate.',
  },
  {
    question: 'What could happen to an employer if an employee is injured due to unsafe electrics?',
    answer: 'The employer can be prosecuted and held liable.',
  },
  {
    question: 'Why is BS 7671 updated periodically?',
    answer: 'To keep regulations up to date with technology and safety requirements.',
  },
];

const MOETModule6Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.1 · Subsection 2"
        title="Legal and Safety Reasons (EAWR, BS 7671 Principles)"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            This subsection explains the legal framework and why compliance is critical for all
            electricians. Understanding these requirements protects both you and your clients from
            legal consequences and safety risks.
          </p>

          <TLDR
            points={[
              'Electrical inspection and testing is not only good practice – it is a legal requirement.',
              'The Electricity at Work Regulations (EAWR 1989) and BS 7671 Wiring Regulations set clear standards for the design, construction, inspection, and testing of electrical systems.',
              'Failure to comply can result in serious injury, prosecution, fines, or imprisonment.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },

              {
                term: 'The Electricity at Work Regulations',

                gist: 'The statutory duties: Reg 4(2) maintenance, Reg 13 precautions on dead equipment, Reg 14 live working, Reg 16 competence.',

                where: '1.4.2',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the legal requirements for inspection and testing under EAWR 1989',
              'Explain how BS 7671 principles guide safe design and testing practices',
              'Understand the consequences of failing to comply with regulations',
              'Recognise your personal responsibility as an installer',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>EAWR 1989</ContentEyebrow>

          <ConceptBlock title="The Electricity at Work Regulations (EAWR 1989)">
            <p>
              <strong>Key Principle:</strong> All electrical systems must be constructed,
              maintained, and tested so they are safe to use.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Employers and employees have a duty to prevent danger</li>
              <li>
                Regulation 4(1) &amp; 4(2): Systems must be safe at all times and maintained in that
                condition
              </li>
              <li>Failure to comply can lead to legal action, fines, or imprisonment</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Wiring Regulations</ContentEyebrow>

          <ConceptBlock title="BS 7671 Wiring Regulations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 provides the technical framework for electrical safety</li>
              <li>
                Requires initial verification of new installations and periodic inspection/testing
                of existing ones
              </li>
              <li>
                Outlines test procedures: continuity, insulation resistance, polarity, earth fault
                loop impedance, and RCD operation
              </li>
              <li>Ensures uniformity and professional standards across the industry</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Personal responsibility</ContentEyebrow>

          <ConceptBlock title="Personal Responsibility">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                The person signing the Electrical Installation Certificate takes legal
                responsibility for safety
              </li>
              <li>
                &quot;Ignorance of the law&quot; is not a defence – all electricians must be
                competent and aware of requirements
              </li>
              <li>
                Poor testing or fraudulent certification can result in prosecution or being struck
                off professional registers
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Consequences of non-compliance</ContentEyebrow>

          <ConceptBlock title="Consequences of Non-Compliance">
            <p>
              <strong>For Clients:</strong> Unsafe installations, shock, fire, damage.
            </p>
            <p>
              <strong>For Electricians:</strong> Prosecution, loss of employment, damaged
              reputation.
            </p>
            <p>
              <strong>For Employers:</strong> Liability for injury/death of workers or members of
              the public.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Real-world example</ContentEyebrow>

          <ConceptBlock title="Real-World Example">
            <p>
              In 2010, a landlord was fined £20,000 after a tenant was seriously injured due to
              faulty wiring. The landlord failed to arrange proper inspection and testing, breaching
              EAWR and BS 7671. This case highlights the legal responsibility to ensure
              installations are regularly tested and certified.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Practical guidance</ContentEyebrow>

          <ConceptBlock title="Practical Guidance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Always test and document results, even on small jobs</li>
              <li>Keep up to date with Amendments to BS 7671 (currently 2018+A4:2026)</li>
              <li>Use only calibrated, approved test equipment</li>
              <li>Never sign certificates unless you have carried out or supervised the testing</li>
              <li>Remember: safety certificates are legal documents</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pocket Guide">
            <div className="grid gap-4 sm:grid-cols-2">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>EAWR 1989</strong> = Legal requirement for safe systems
                </li>
                <li>
                  <strong>BS 7671</strong> = Technical standard for compliance
                </li>
                <li>
                  <strong>Initial verification</strong> = Must be carried out before energising new
                  systems
                </li>
              </ul>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Periodic inspection</strong> = Required for ongoing safety
                </li>
                <li>
                  <strong>Non-compliance</strong> = Prosecution, fines, imprisonment
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recap</ContentEyebrow>

          <ConceptBlock title="Recap">
            <p>
              Inspection and testing are not just about professionalism – they are law and
              regulation. EAWR 1989 sets the legal duty, while BS 7671 provides the framework for
              compliance. Every electrician is personally responsible for ensuring systems are safe,
              tested, and properly certified.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Quick recall">
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              {recallQuestions.map((item) => (
                <li key={item.question} className="space-y-1">
                  <p className="font-medium text-white">{item.question}</p>
                  <p className="text-white">Answer: {item.answer}</p>
                </li>
              ))}
            </ol>
          </ConceptBlock>

          <SectionRule />

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Reading and producing technical drawings
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section1-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Orthographic Projection (Engineering Drawings)
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section1_2;
