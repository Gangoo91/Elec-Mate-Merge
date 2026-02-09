import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Shield,
  Scale,
  FileCheck,
  HardHat,
  Landmark,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'loler-thorough-exam',
    question:
      'Under LOLER 1998, how often must a MEWP (equipment that lifts persons) undergo a thorough examination?',
    options: ['Every 3 months', 'Every 6 months', 'Every 12 months', 'Only before first use'],
    correctIndex: 1,
    explanation:
      'LOLER 1998 requires thorough examination at least every 6 months for equipment used to lift persons. Equipment that does not lift persons requires examination every 12 months. An examination before first use is also required where safety depends on installation conditions.',
  },
  {
    id: 'cdm-duty-holders',
    question:
      'How many duty holders does CDM 2015 identify for a multi-contractor construction project?',
    options: [
      '3 — Client, Contractor, Designer',
      '4 — Client, Principal Contractor, Contractor, Designer',
      '5 — Client, Principal Designer, Principal Contractor, Designer, Contractor',
      '6 — Client, Principal Designer, Principal Contractor, Designer, Contractor, Worker',
    ],
    correctIndex: 2,
    explanation:
      'CDM 2015 identifies five key duty holders: Client, Principal Designer, Principal Contractor, Designer, and Contractor. Each has specific legal responsibilities for managing health and safety on construction projects.',
  },
  {
    id: 'ipaf-legal-requirement',
    question: 'Is IPAF operator training a direct legal requirement in the UK?',
    options: [
      'Yes — LOLER 1998 specifically requires IPAF certification',
      'Yes — the HSE mandates IPAF for all MEWP operators',
      'No — but it is the industry-recognised standard demonstrating compliance with PUWER and LOLER',
      'No — only manufacturers can certify operators',
    ],
    correctIndex: 2,
    explanation:
      'IPAF training is not a direct legal requirement. However, PUWER 1998 requires adequate training for all operators, and LOLER requires competent persons. IPAF is the industry-recognised standard that demonstrates compliance with these legal duties. Most hire companies and principal contractors require a valid PAL Card as proof of competence.',
  },
];

const faqs = [
  {
    question:
      'What is the difference between a thorough examination under LOLER and a routine inspection?',
    answer:
      'A thorough examination under LOLER must be carried out by a competent person (typically an independent insurance engineer or specialist examiner) and is a detailed, systematic examination of the entire machine and its safety-critical parts. A routine inspection, by contrast, is a visual and functional check carried out by the operator or a trained person at more frequent intervals (e.g. daily or weekly). Both are important, but only the thorough examination satisfies LOLER requirements.',
  },
  {
    question: 'Does PUWER 1998 apply to hired MEWPs or only those I own?',
    answer:
      'PUWER 1998 applies to all work equipment used at work, regardless of ownership. If you hire a MEWP, you are still responsible under PUWER for ensuring it is suitable for the task, that operators are trained, and that it is maintained during the hire period. The hire company has separate duties under LOLER and PUWER regarding the condition of the machine at the point of supply.',
  },
  {
    question: "Who is the 'competent person' required to plan lifting operations under LOLER?",
    answer:
      'LOLER does not define a specific qualification for the competent person. They must have sufficient practical and theoretical knowledge and experience to plan the lifting operation properly. For MEWP work, this is typically a site supervisor or manager with relevant training and experience. For thorough examinations, the competent person is usually a specialist engineer from an insurance company or independent inspection body.',
  },
  {
    question:
      'Can a MEWP be used on site if the LOLER thorough examination certificate has expired?',
    answer:
      'No. If the thorough examination is overdue, the MEWP must not be used until a new examination has been carried out and a report issued confirming it is safe. Using a MEWP without a valid thorough examination report is a breach of LOLER 1998 and can lead to enforcement action by the HSE, including prohibition notices and prosecution.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under LOLER 1998, who must defects found during a thorough examination be reported to?',
    options: [
      'Only the equipment owner',
      'Only the HSE',
      'The responsible person AND the relevant enforcing authority',
      'The manufacturer only',
    ],
    correctAnswer: 2,
    explanation:
      'LOLER 1998 requires the competent person carrying out the thorough examination to report defects to the person responsible for the equipment AND, where there is a risk of serious personal injury, to the relevant enforcing authority (usually the HSE).',
  },
  {
    id: 2,
    question:
      'Which regulation specifically requires that work equipment is maintained in an efficient state, in efficient working order, and in good repair?',
    options: ['HSWA 1974', 'LOLER 1998', 'PUWER 1998', 'CDM 2015'],
    correctAnswer: 2,
    explanation:
      'Regulation 5 of PUWER 1998 requires that every employer shall ensure that work equipment is maintained in an efficient state, in efficient working order, and in good repair. This applies to MEWPs as work equipment.',
  },
  {
    id: 3,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, what is the PRIMARY duty on employers?',
    options: [
      'To provide free PPE to all workers',
      'To carry out suitable and sufficient risk assessments',
      'To appoint a full-time health and safety officer',
      'To notify the HSE of all work activities',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires every employer to make a suitable and sufficient assessment of the risks to health and safety of their employees and anyone else affected by their undertaking. This is the foundational duty that underpins all other health and safety requirements.',
  },
  {
    id: 4,
    question: 'Under CDM 2015, who is responsible for preparing the construction phase plan?',
    options: [
      'The client',
      'The principal designer',
      'The principal contractor',
      'Each individual contractor',
    ],
    correctAnswer: 2,
    explanation:
      'The principal contractor is responsible for preparing the construction phase plan before the construction phase begins. On single-contractor projects, the contractor assumes this duty. The plan must set out the arrangements for managing health and safety during construction.',
  },
  {
    id: 5,
    question: 'BS EN 280 is the European design standard for MEWPs. What does it primarily cover?',
    options: [
      'Operator training requirements only',
      'Design calculations, stability requirements, safety requirements, and testing',
      'Hire company insurance obligations',
      'Environmental impact assessments for MEWP use',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 280 covers the design and manufacturing requirements for MEWPs, including design calculations, stability criteria, structural requirements, safety devices, and the examinations and tests that must be carried out before a MEWP enters service.',
  },
  {
    id: 6,
    question: 'Which ISO standard covers MEWP operator training internationally?',
    options: ['ISO 9001', 'ISO 45001', 'ISO 18878', 'ISO 14001'],
    correctAnswer: 2,
    explanation:
      'ISO 18878:2013 (updated 2025) establishes the requirements for training MEWP operators. It covers theoretical and practical training content, operator assessment, and competence verification. IPAF training is aligned with this international standard.',
  },
  {
    id: 7,
    question:
      'A hire company supplies a MEWP to a contractor. Under LOLER/PUWER, which statement is correct?',
    options: [
      'Only the hire company has duties — the contractor has no responsibility',
      'Only the contractor has duties — the hire company has no responsibility',
      'Both have duties: the hire company for supply condition, the contractor for safe use and ongoing maintenance',
      'Neither has duties — the operator is solely responsible',
    ],
    correctAnswer: 2,
    explanation:
      'Both parties have duties. The hire company must ensure the MEWP is in a safe condition with valid thorough examination when supplied. The contractor (as the employer/user) must ensure it remains suitable, is maintained during use, operators are trained, and it is used safely. Duties overlap but are complementary.',
  },
  {
    id: 8,
    question:
      'Before a MEWP is used on a construction site, which of the following documents must be in place?',
    options: [
      "Only the operator's PAL Card",
      'A valid thorough examination report, risk assessment, method statement, and evidence of operator competence',
      "Only the manufacturer's instruction manual",
      'Only the construction phase plan',
    ],
    correctAnswer: 1,
    explanation:
      "Before using a MEWP on site, you need: a valid LOLER thorough examination report (less than 6 months old), a suitable and sufficient risk assessment, a method statement or safe system of work, evidence of operator training/competence (e.g. IPAF PAL Card), and the manufacturer's operator manual. On CDM projects, this should be referenced in the construction phase plan.",
  },
];

export default function MewpModule1Section2() {
  useSEO({
    title: 'LOLER 1998, PUWER 1998 & Employer Duties | MEWP Module 1.2',
    description:
      'Thorough examination requirements under LOLER, work equipment duties under PUWER, CDM 2015 duty holders, BS EN 280, and how these regulations apply to MEWP operations.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <BookOpen className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 1 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            LOLER 1998, PUWER 1998 & Employer Duties
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Thorough examination, maintenance duties, CDM 2015, design standards, and how all the
            regulations work together for MEWP operations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>LOLER:</strong> Thorough examination every 6 months for MEWPs
              </li>
              <li>
                <strong>PUWER:</strong> Equipment must be suitable, maintained, operators trained
              </li>
              <li>
                <strong>CDM:</strong> 5 duty holders, construction phase plan, safe rescue
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Check:</strong> Is the LOLER thorough examination in date (within 6 months)?
              </li>
              <li>
                <strong>Verify:</strong> Risk assessment, method statement, operator competence
              </li>
              <li>
                <strong>Always:</strong> Report defects immediately, never use defective equipment
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the key requirements of LOLER 1998 as they apply to MEWPs',
              'Describe employer duties under PUWER 1998 for work equipment',
              'Understand the role of the Management of H&S at Work Regulations 1999',
              'Identify the 5 CDM 2015 duty holders and their responsibilities',
              'Explain how BS EN 280 and ISO standards relate to MEWP operations',
              'Describe what documentation must be in place before a MEWP is used on site',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: LOLER 1998 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                MEWPs are classified as lifting equipment that lifts persons. This places them under
                the most stringent requirements of LOLER 1998. Every lifting operation involving a
                MEWP must be properly planned by a competent person, appropriately supervised, and
                carried out in a safe manner.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Definition:</strong> A &ldquo;lifting
                  operation&rdquo; under LOLER means an operation concerned with the lifting or
                  lowering of a load. For MEWPs, the &ldquo;load&rdquo; includes the persons on the
                  platform, their tools, and any materials being carried. Every time a MEWP elevates
                  with an operator on board, it is a lifting operation.
                </p>
              </div>

              <p>
                All lifting equipment must be fit for purpose, appropriate for the task, suitably
                marked with its safe working load (SWL), and subject to thorough examination by a
                competent person.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical: Thorough Examination Intervals
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    <strong className="text-white">Equipment lifting persons (MEWPs):</strong> At
                    least every <strong className="text-red-300">6 months</strong>
                  </p>
                  <p>
                    <strong className="text-white">Other lifting equipment:</strong> At least every{' '}
                    <strong className="text-white">12 months</strong>
                  </p>
                  <p>
                    <strong className="text-white">Before first use:</strong> Required where safety
                    depends on the installation conditions
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  LOLER 1998 &mdash; Key Requirements for MEWPs
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Every lifting operation must be properly planned by a competent person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Lifting operations must be appropriately supervised</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Equipment must be fit for purpose and appropriate for the specific task
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Equipment must be suitably marked with SWL and other relevant information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Thorough examination records must be kept and made available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Defects must be reported to the responsible person AND the enforcing authority
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Equipment must NOT be used if there is a risk to safety</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: PUWER 1998 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Provision and Use of Work Equipment Regulations 1998 (PUWER)
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PUWER 1998 applies to MEWPs as work equipment. It places broad duties on employers
                and the self-employed to ensure that all work equipment provided for use at work is
                suitable, safe, and properly maintained. Where LOLER deals specifically with lifting
                operations, PUWER covers the wider picture of equipment suitability and use.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Overlap with LOLER:</strong> PUWER and LOLER
                  work together. PUWER covers the general suitability, maintenance, training, and
                  use of work equipment. LOLER adds specific requirements for lifting operations and
                  thorough examinations. A MEWP must comply with <strong>both</strong> sets of
                  regulations simultaneously.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Key PUWER Duties for MEWP Operations
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Reg 4 &mdash; Suitability:</strong> Equipment
                        must be constructed or adapted to be suitable for its intended purpose
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Reg 5 &mdash; Maintenance:</strong>{' '}
                        Maintained in an efficient state, in efficient working order, and in good
                        repair
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Reg 6 &mdash; Inspection:</strong> Inspected
                        at suitable intervals and after exceptional circumstances
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Reg 9 &mdash; Training:</strong> Adequate
                        training and information for all persons who use the equipment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Reg 23 &mdash; Markings:</strong> Appropriate
                        warnings, markings, and health and safety information
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Reg 11 &mdash; Guards:</strong> Guards and
                        protection devices must be maintained and effective
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Intended use:</strong> Equipment must only be
                        used for operations and under conditions for which it is suitable
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What &ldquo;Suitable&rdquo; Means for a MEWP
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The correct type and category for the task (e.g. scissor lift for indoor work,
                      boom for outreach)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Sufficient platform capacity (SWL) for the number of operators and their
                      materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Adequate working height and outreach for the specific task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Suitable for the ground conditions, gradients, and operating environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Correct power source for the environment (electric for indoors, diesel for
                      rough terrain)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Management of H&S at Work Regs 1999 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Management of Health and Safety at Work Regulations 1999
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Management of Health and Safety at Work Regulations 1999 (commonly called the
                &ldquo;Management Regs&rdquo;) underpin all other health and safety regulations.
                They set out the general framework that employers must follow to manage health and
                safety effectively. Without the Management Regs, LOLER, PUWER, and all other
                specific regulations would lack their organisational foundation.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Foundational Regulation:</strong> The
                  Management Regs require employers to have a systematic approach to managing health
                  and safety. They do not replace LOLER or PUWER but sit alongside them, ensuring
                  that the organisational systems are in place to deliver compliance with all
                  specific regulations.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key Requirements for MEWP Operations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Risk assessment (Reg 3):</strong> Suitable and
                      sufficient assessment of risks to employees and others &mdash; this includes
                      every MEWP task
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Competent persons (Reg 7):</strong> Appoint one
                      or more competent persons to assist with health and safety duties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Health surveillance (Reg 6):</strong>{' '}
                      Appropriate health surveillance where there is an identifiable risk &mdash;
                      relevant to MEWP operators&rsquo; fitness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Training (Reg 13):</strong> Adequate health and
                      safety training when first employed, on exposure to new risks, and
                      periodically refreshed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Information (Reg 10):</strong> Employees must
                      be provided with comprehensible and relevant information on risks and
                      protective measures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency procedures (Reg 8):</strong>{' '}
                      Establish procedures for serious and imminent danger &mdash; including MEWP
                      entrapment and rescue
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For MEWP work, the Management Regs mean your employer must have carried out a risk
                assessment before you operate any MEWP, appointed competent persons to advise on
                MEWP safety, ensured you have received adequate training, and established rescue
                procedures in case of platform failure or operator incapacitation at height.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: CDM 2015 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Construction (Design and Management) Regulations 2015 (CDM)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 applies whenever MEWPs are used on construction sites. The regulations
                require that construction work is properly planned, managed, and carried out safely.
                A critical requirement for MEWP work is that the principal contractor must ensure
                suitable and sufficient means of rescue are planned before any work at height
                begins.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">5 CDM Duty Holders:</strong> Client,
                  Principal Designer, Principal Contractor, Designer, and Contractor. On projects
                  with only one contractor, that contractor assumes the duties of the principal
                  contractor. The client always has duties, even on domestic projects (where they
                  pass to the contractor).
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Landmark className="h-5 w-5 text-amber-400" />
                      <p className="text-sm font-medium text-amber-400">Client</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Make suitable arrangements for managing the project safely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Provide pre-construction information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Appoint principal designer and principal contractor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure welfare facilities are provided</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-purple-400" />
                      <p className="text-sm font-medium text-purple-400">Principal Designer</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Plan, manage, and co-ordinate the pre-construction phase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Identify and eliminate or reduce risks through design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Prepare the health and safety file</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Liaise with the principal contractor</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-2">Principal Contractor</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Prepare the construction phase plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Co-ordinate between contractors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure site induction and rescue plans</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-2">Designer</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Eliminate hazards through design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Reduce risks that cannot be eliminated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Provide information about remaining risks</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-teal-400 mb-2">Contractor</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Plan, manage, and monitor own work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ensure workers are competent and trained</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Comply with the construction phase plan</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Construction Phase Plan &mdash; MEWP Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      How MEWPs will be managed on site (delivery, positioning, use, removal)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Rescue plan for operators stranded at height (entrapment, mechanical failure,
                      medical emergency)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Co-ordination with other activities (crane operations, traffic management,
                      overhead work)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Competence requirements for operators (e.g. IPAF PAL Card category)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Exclusion zones, barriers, and pedestrian segregation around MEWP operating
                      areas
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: BS EN 280 & ISO Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            BS EN 280 & ISO Standards
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In addition to the primary legislation and regulations, several European and
                international standards apply to MEWP design, manufacture, operator training, and
                safe use. Understanding these standards helps operators appreciate why MEWPs are
                designed and tested the way they are.
              </p>

              <div className="space-y-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-5 w-5 text-cyan-400" />
                    <p className="text-sm font-medium text-cyan-400">
                      BS EN 280 &mdash; MEWP Design Standard
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    BS EN 280 is the primary European harmonised standard for the design and
                    manufacture of MEWPs. It covers:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Design calculations:</strong> Structural
                        integrity, load factors, and safety margins
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Stability requirements:</strong> Tilt
                        testing, wind loading, dynamic forces during operation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Safety requirements:</strong> Guardrails,
                        platform gates, emergency lowering, overload protection
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Examinations and tests:</strong> Type testing
                        and routine testing before entering service
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-2">
                      ISO 18878:2013 (Updated 2025)
                    </p>
                    <p className="text-sm text-white/80 mb-2">
                      International standard for MEWP operator training. Covers:
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Theoretical training content and duration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Practical operating skills assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Operator competence verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Refresher training requirements</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-2">
                      ISO 18893 &mdash; Safe Use
                    </p>
                    <p className="text-sm text-white/80 mb-2">
                      International standard for the safe use of MEWPs. Covers:
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Responsibilities of owners, users, and operators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Pre-use inspections and maintenance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Safe operating procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Hazard identification and risk management</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Important: IPAF Training and Legal Status
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  IPAF (International Powered Access Federation) operator training is{' '}
                  <strong className="text-white">NOT</strong> a direct legal requirement in the UK.
                  No legislation specifically mandates IPAF certification. However, PUWER Regulation
                  9 requires adequate training, and LOLER requires competent persons. IPAF&rsquo;s
                  PAL Card is the{' '}
                  <strong className="text-white">industry-recognised standard</strong> that
                  demonstrates compliance with these legal duties. In practice, virtually all hire
                  companies, principal contractors, and insurers require a valid IPAF PAL Card
                  before allowing an operator to use a MEWP on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Bringing It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Bringing It All Together: Duty Holder Responsibilities
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Multiple regulations apply simultaneously to MEWP operations. Understanding which
                regulations apply to each duty holder is essential for ensuring full compliance. The
                table below summarises the key responsibilities.
              </p>

              {/* Responsibility Grid */}
              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Employer</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">LOLER:</strong> Ensure thorough examinations
                        are current, plan lifting operations, keep records
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">PUWER:</strong> Provide suitable equipment,
                        ensure maintenance, train operators
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Management Regs:</strong> Risk assessments,
                        competent persons, health surveillance, emergency procedures
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Employee / Operator</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">PUWER:</strong> Use equipment only as
                        trained, report defects, follow safe systems of work
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Management Regs:</strong> Co-operate with
                        employer, report dangers, use equipment correctly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">CDM:</strong> Follow the construction phase
                        plan, attend inductions, report unsafe conditions
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Self-Employed</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">LOLER/PUWER:</strong> Same duties as an
                        employer for equipment you own or control
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Management Regs:</strong> Must carry out your
                        own risk assessments and ensure competence
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">CDM:</strong> Same duties as a contractor
                        when working on construction projects
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <p className="text-sm font-medium text-blue-400">Hire Company</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">LOLER:</strong> Valid thorough examination
                          before supply
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">PUWER:</strong> Supply equipment in safe
                          working condition
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Provide operator manual and safety information</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-teal-400" />
                      <p className="text-sm font-medium text-teal-400">Site Controller / PC</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">CDM:</strong> Construction phase plan,
                          co-ordination, rescue plans
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Management Regs:</strong> Ensure
                          site-specific risk assessments in place
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Verify operator competence before allowing MEWP use</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">
                  Documentation Required Before a MEWP is Used on Site
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Equipment Documentation</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Valid LOLER thorough examination report (within 6 months)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Manufacturer&rsquo;s operator manual</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Maintenance and inspection records</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Insurance/hire documentation</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Operational Documentation</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Task-specific risk assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Method statement / safe system of work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Operator&rsquo;s IPAF PAL Card (valid and correct category)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Rescue plan (required under CDM on construction sites)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-1-section-3">
              Next: MEWP Types, Groups & IPAF Categories
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
