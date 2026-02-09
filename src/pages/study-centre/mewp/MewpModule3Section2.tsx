import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Shield,
  ClipboardCheck,
  Search,
  Wrench,
  FileText,
  Clock,
  UserCheck,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-te-frequency',
    question: 'How often must a MEWP undergo a thorough examination under LOLER 1998?',
    options: [
      'Every 3 months',
      'Every 6 months',
      'Every 12 months',
      'Only when a defect is reported',
    ],
    correctIndex: 1,
    explanation:
      'Under LOLER 1998, any lifting equipment used for lifting persons — including all MEWPs — must undergo a thorough examination at least every 6 months. The 12-month interval applies only to lifting equipment that does NOT lift persons.',
  },
  {
    id: 'mewp-te-examined',
    question:
      'Which of the following is NOT typically examined during a thorough examination of a MEWP?',
    options: [
      'Hydraulic and pneumatic systems',
      "The operator's IPAF licence validity",
      'Safety devices and interlocks',
      'Wire ropes, chains, and locking devices',
    ],
    correctIndex: 1,
    explanation:
      "A thorough examination covers the physical condition of the machine — structural components, hydraulics, electrics, safety devices, controls, guardrails, braking, outriggers, and all mechanical parts. The operator's licence is a competence matter checked separately, not part of the machine examination.",
  },
  {
    id: 'mewp-te-maintenance-responsibility',
    question:
      'Which daily inspection responsibility falls on the MEWP operator rather than the employer?',
    options: [
      'Arranging the 6-monthly thorough examination',
      'Completing a pre-use visual and functional check',
      'Maintaining documented service records',
      'Acting on defects found during a thorough examination',
    ],
    correctIndex: 1,
    explanation:
      'The operator is responsible for completing a pre-use inspection before every shift — checking fluid levels, controls, safety devices, guardrails, tyres, and general condition. The employer is responsible for arranging thorough examinations, maintaining service records, and acting on defect reports.',
  },
];

const faqs = [
  {
    question: 'What happens if a MEWP is used without a current thorough examination certificate?',
    answer:
      'Operating a MEWP without a valid, in-date thorough examination certificate is a criminal offence under LOLER 1998. The HSE can issue a prohibition notice to stop the machine being used immediately, and the duty holder (typically the employer or hire company) can face prosecution, unlimited fines, and even imprisonment. The machine must be taken out of service until a thorough examination is completed and the certificate is issued.',
  },
  {
    question: 'Is a thorough examination the same as a service or annual maintenance check?',
    answer:
      "No. A thorough examination is a specific legal requirement under LOLER 1998 and must be carried out by a competent person who is independent of the organisation using or maintaining the equipment. It is a systematic and detailed examination to detect defects that could result in danger. A service or maintenance check is routine work carried out per the manufacturer's schedule to keep the machine in good working order. Both are necessary, but they serve different purposes and one does not replace the other.",
  },
  {
    question: 'Can my own maintenance engineer carry out a thorough examination?',
    answer:
      'Generally, no. The competent person conducting a thorough examination must be independent of the organisation using the equipment. They must have the appropriate knowledge, experience, and impartiality to identify defects without commercial pressure. Typically, thorough examinations are carried out by insurance company engineers, specialist inspection bodies, or independent inspection companies. Your in-house engineer can carry out routine maintenance and pre-use inspections, but the thorough examination must be independent.',
  },
  {
    question: 'What is the difference between a pre-use inspection and a thorough examination?',
    answer:
      'A pre-use inspection is a visual and functional check carried out by the operator before each use (or at the start of each shift). It covers obvious defects, fluid levels, controls, guardrails, and general machine condition. A thorough examination is a far more detailed, systematic examination carried out by an independent competent person at fixed intervals (every 6 months for MEWPs). It includes structural components, hydraulics, electrics, safety devices, and all critical systems. Both are legally required — one does not replace the other.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under which piece of legislation is a thorough examination of a MEWP required?',
    options: [
      'The Health and Safety at Work etc. Act 1974',
      'The Work at Height Regulations 2005',
      'The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)',
      'The Provision and Use of Work Equipment Regulations 1998 (PUWER)',
    ],
    correctAnswer: 2,
    explanation:
      'LOLER 1998 (the Lifting Operations and Lifting Equipment Regulations) specifically requires thorough examination of lifting equipment, including MEWPs. PUWER covers routine maintenance and inspection, but the thorough examination requirement comes from LOLER.',
  },
  {
    id: 2,
    question: 'What is the maximum interval between thorough examinations for a MEWP?',
    options: ['3 months', '6 months', '12 months', '24 months'],
    correctAnswer: 1,
    explanation:
      'MEWPs lift persons, so they fall into the 6-month thorough examination category under LOLER 1998. The 12-month interval applies only to lifting equipment that does NOT lift persons.',
  },
  {
    id: 3,
    question:
      "A thorough examination report identifies an 'immediate danger' defect. What must happen?",
    options: [
      'The defect must be rectified within 28 days',
      'The machine is taken out of service immediately and the HSE must be notified',
      'The operator can continue using the machine until the next service',
      'An advisory note is recorded for future attention',
    ],
    correctAnswer: 1,
    explanation:
      "An 'immediate danger' defect means the machine must be taken out of service NOW and must not be used until the defect is rectified. The defect is also notifiable to the HSE or the relevant enforcing authority.",
  },
  {
    id: 4,
    question: 'Who is legally permitted to conduct a thorough examination of a MEWP?',
    options: [
      'The MEWP operator who uses the machine daily',
      "The employer's own maintenance engineer",
      'A competent person independent of the organisation using the equipment',
      'Any person holding an IPAF operator licence',
    ],
    correctAnswer: 2,
    explanation:
      'A thorough examination must be carried out by a competent person who is independent of the organisation using the equipment. They must have appropriate knowledge, experience, and impartiality. Operators, in-house engineers, and IPAF licence holders are not automatically qualified to conduct thorough examinations.',
  },
  {
    id: 5,
    question: 'Within how many days must a thorough examination report be provided?',
    options: ['7 days', '14 days', '28 days', '56 days'],
    correctAnswer: 2,
    explanation:
      'Under LOLER 1998, the written report of a thorough examination must be provided within 28 days of the examination. However, if an immediate danger is found, the examiner must notify the relevant enforcing authority immediately — they do not wait 28 days.',
  },
  {
    id: 6,
    question:
      'Which of the following events would trigger the need for an additional thorough examination outside the normal 6-month schedule?',
    options: [
      'Routine daily pre-use inspection',
      'A scheduled manufacturer service',
      'A major repair, modification, or incident involving the MEWP',
      'Movement of the MEWP between different areas on the same site',
    ],
    correctAnswer: 2,
    explanation:
      'A thorough examination is required after any major repair, modification, or incident involving the MEWP, in addition to the regular 6-month examinations. Moving the machine around the same site does not trigger a new examination.',
  },
  {
    id: 7,
    question: 'Under PUWER 1998, which of the following is the OPERATOR responsible for?',
    options: [
      'Arranging the 6-monthly thorough examination',
      'Maintaining documented service records',
      'Completing a daily pre-use visual and functional inspection',
      'Acting on defects identified in a thorough examination report',
    ],
    correctAnswer: 2,
    explanation:
      'The operator is responsible for completing a pre-use inspection before every shift. Arranging thorough examinations, maintaining service records, and acting on examination defect reports are all employer responsibilities.',
  },
  {
    id: 8,
    question:
      'A MEWP has been out of use and stored for several weeks. Before returning it to service, what inspection is recommended?',
    options: [
      'No inspection is needed if the thorough examination certificate is still in date',
      'Only a quick visual check by the operator',
      'A full pre-use inspection and any additional checks recommended by the manufacturer for equipment returning from a period of disuse',
      'A new thorough examination must be carried out',
    ],
    correctAnswer: 2,
    explanation:
      'After a period of disuse, a full pre-use inspection should be carried out along with any additional checks the manufacturer recommends for equipment returning to service. This covers fluid levels, battery condition, tyre pressures, hydraulic leaks, corrosion, and functionality of all controls and safety devices.',
  },
];

export default function MewpModule3Section2() {
  useSEO({
    title: 'Thorough Examination & Maintenance Requirements | MEWP Module 3.2',
    description:
      'LOLER 1998 thorough examination requirements for MEWPs, examination frequency, competent persons, defect categories, reports, and routine maintenance under PUWER 1998.',
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
            <Link to="../mewp-module-3">
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
            <ClipboardCheck className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 3 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Thorough Examination &amp; Maintenance Requirements
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            LOLER 1998 thorough examination obligations, examination frequency and triggers,
            competent person requirements, defect categories, reporting duties, and routine
            maintenance under PUWER 1998
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>LOLER 1998:</strong> Thorough examination every 6&nbsp;months
              </li>
              <li>
                <strong>Competent Person:</strong> Independent &amp; qualified
              </li>
              <li>
                <strong>Report:</strong> Written within 28&nbsp;days, retain records
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Operator:</strong> Pre-use inspection every shift
              </li>
              <li>
                <strong>Employer:</strong> Arrange examinations &amp; maintenance
              </li>
              <li>
                <strong>No Certificate = No Use:</strong> Criminal offence
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define what constitutes a thorough examination under LOLER 1998',
              'State the required frequency of thorough examinations for MEWPs',
              'Describe who is qualified to conduct a thorough examination',
              'List the key components and systems examined during a thorough examination',
              'Explain defect categories and reporting requirements',
              'Distinguish between operator and employer maintenance responsibilities',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Thorough Examination? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is a Thorough Examination?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A thorough examination is a specific legal requirement under the Lifting Operations
                and Lifting Equipment Regulations 1998 (LOLER). It is far more detailed than a
                routine pre-use inspection and serves as the primary statutory safeguard to ensure
                that lifting equipment &mdash; including all types of MEWP &mdash; is safe to
                continue in use.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Definition:</strong> A thorough
                  examination is a systematic and detailed examination of the equipment and its
                  associated accessories, carried out by a competent person, to detect defects that
                  could result in danger and to determine whether the equipment is safe to continue
                  in use. It is a legal examination, not an advisory service.
                </p>
              </div>

              <p>
                It is critical to understand what a thorough examination is <strong>not</strong>.
                Many operators and employers confuse it with other types of inspection and
                maintenance. Getting this wrong can lead to non-compliance and criminal liability.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">A Thorough Examination Is NOT:</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Not the same as maintenance or routine servicing.
                      </strong>{' '}
                      A service keeps the machine in good working order; a thorough examination
                      checks whether it is safe. Both are required, and one does not replace the
                      other.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not the same as a pre-use inspection.</strong>{' '}
                      A pre-use check is a visual and functional inspection carried out by the
                      operator before each use. It covers obvious defects but does not go into the
                      depth or detail of a thorough examination.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not an MOT or annual check-up.</strong> It is a
                      specific, legally defined examination that must follow the requirements of
                      LOLER 1998 and be carried out by a competent person who is independent of the
                      organisation.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Purpose of a Thorough Examination
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Detect defects or damage that could result in danger to persons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Determine whether the equipment is safe to continue in service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Identify components that are deteriorating and may need attention before the
                      next examination
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Provide a written report to the employer confirming the condition of the
                      equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Create a legal record that can be inspected by the HSE or enforcing authority
                      at any time
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Without a valid, in-date thorough examination certificate, a MEWP must not be used.
                Operating without one is a criminal offence and can result in immediate prohibition
                by the HSE, prosecution, and unlimited fines.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Frequency of Thorough Examination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Frequency of Thorough Examination
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                LOLER 1998 sets clear intervals for thorough examinations depending on the type of
                equipment and what it is being used for. The critical distinction is between
                equipment that lifts persons and equipment that does not.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> MEWPs lift persons. They{' '}
                  <strong>always</strong> fall into the 6-month examination category. There are no
                  exceptions. Whether you have a small push-around scissor lift or a 56-metre
                  truck-mounted boom, the requirement is the same: thorough examination at least
                  every 6&nbsp;months.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Examination Frequency Comparison
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {/* Header Row */}
                  <div className="grid grid-cols-3 text-xs font-medium text-white/60 px-4 py-2 bg-white/5">
                    <span>Category</span>
                    <span className="text-centre">Interval</span>
                    <span className="text-right">Examples</span>
                  </div>
                  {/* 6-Month Row */}
                  <div className="grid grid-cols-3 items-start text-sm px-4 py-3 bg-amber-500/5">
                    <span className="text-amber-400 font-medium">Lifting Persons</span>
                    <span className="text-centre text-white font-semibold">Every 6 Months</span>
                    <span className="text-right text-white/80 text-xs">
                      Scissor lifts, boom lifts, spider lifts, truck mounts, all MEWPs
                    </span>
                  </div>
                  {/* 12-Month Row */}
                  <div className="grid grid-cols-3 items-start text-sm px-4 py-3">
                    <span className="text-blue-400 font-medium">NOT Lifting Persons</span>
                    <span className="text-centre text-white font-semibold">Every 12 Months</span>
                    <span className="text-right text-white/80 text-xs">
                      Overhead cranes, hoists, goods lifts, fork-lift trucks (when not carrying
                      persons)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Important: MEWPs Are Always 6 Months
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A MEWP is, by definition, a machine that lifts persons. Even if the platform is
                  occasionally used to lift materials as well, the machine is classified as
                  equipment for lifting persons and must be examined every 6&nbsp;months. Do not
                  confuse this with the 12-month category.
                </p>
              </div>

              <p>
                In addition to the regular 6-month cycle, a thorough examination must also be
                carried out:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Additional Examination Triggers
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Before first use</strong> — if the safety of
                      the equipment depends on installation conditions (e.g. a MEWP assembled on
                      site for the first time, or after significant transport and reassembly)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">After any major repair or modification</strong>{' '}
                      — any structural repair, replacement of a major component, or modification to
                      the machine&rsquo;s design or operating parameters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">After an incident</strong> — any event that may
                      have caused damage to the machine, including collision, overload, tip-over, or
                      contact with an overhead obstruction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">After prolonged disuse</strong> — where the
                      machine has been stored for an extended period and its condition may have
                      deteriorated
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The employer or duty holder is responsible for ensuring that thorough examinations
                are arranged on time. Allowing a certificate to lapse means the machine must be
                taken out of service until the next examination is completed.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Who Can Conduct a Thorough Examination? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Who Can Conduct a Thorough Examination?
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                LOLER 1998 requires that every thorough examination is carried out by a{' '}
                <strong>competent person</strong>. This is not a casual term &mdash; it carries
                specific legal meaning and imposes strict requirements on who can conduct the
                examination.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Definition:</strong> A competent person
                  for the purposes of thorough examination must have sufficient practical and
                  theoretical knowledge and experience of the type of equipment being examined to
                  enable them to detect defects or weaknesses, and to assess their importance in
                  relation to the safety and continued use of the equipment. They must also be{' '}
                  <strong>independent</strong> of the organisation using the equipment.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">
                    Who Typically Conducts Thorough Examinations?
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Insurance company engineers</strong> — many
                      employers&rsquo; liability insurance policies include thorough examination as
                      part of the cover, with inspections carried out by the insurer&rsquo;s own
                      qualified engineers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Specialist inspection bodies</strong> —
                      organisations such as CFTS (Consolidated Fork Truck Services) for fork-lift
                      trucks, or equivalent bodies for MEWPs and other lifting equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Independent inspection companies</strong> —
                      third-party companies that specialise in statutory examination and testing of
                      lifting equipment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Who Cannot Conduct a Thorough Examination?
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The operator who uses the machine — they lack the required independence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The maintenance engineer who services the machine — they are not independent
                      of the organisation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Any person who has a commercial interest in passing the equipment as fit for
                      use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      An IPAF licence holder with no specific examination competence — an operator
                      licence does not qualify a person to conduct thorough examinations
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The requirement for independence is central. The competent person must be free from
                commercial or organisational pressure that could compromise the integrity of their
                findings. They must be able to identify a dangerous defect and condemn a machine
                without fear of consequences from the equipment owner or user.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Three Tests of Competence</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 p-3 rounded-lg text-centre">
                    <p className="text-sm font-medium text-elec-yellow mb-1">Knowledge</p>
                    <p className="text-xs text-white/70">
                      Sufficient theoretical and practical knowledge of the equipment type
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-centre">
                    <p className="text-sm font-medium text-elec-yellow mb-1">Experience</p>
                    <p className="text-xs text-white/70">
                      Practical experience in examining lifting equipment and detecting defects
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-centre">
                    <p className="text-sm font-medium text-elec-yellow mb-1">Independence</p>
                    <p className="text-xs text-white/70">
                      Free from commercial or organisational bias that could affect findings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: What Is Examined? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            What Is Examined?
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A thorough examination covers the entire machine systematically. The competent
                person will inspect all components that could affect the safe operation of the MEWP,
                including structural integrity, hydraulic and electrical systems, safety devices,
                and all moving parts. Nothing is overlooked.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Components and Systems Covered</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    'All structural components (chassis, boom, turntable, platform frame)',
                    'Hydraulic systems (cylinders, hoses, fittings, fluid levels, leaks)',
                    'Pneumatic systems (where fitted)',
                    'Electrical systems (wiring, connections, batteries, charging systems)',
                    'Safety devices and interlocks (tilt sensors, overload cut-outs, limit switches)',
                    'Platform controls (proportional controls, dead-man switches)',
                    'Ground-level controls (for lowering and recovery)',
                    'Emergency controls (manual descent, emergency stop buttons)',
                    'Guardrails, mid-rails, toe boards, and access gates',
                    'Tyres, wheels, and braking systems',
                    'Outriggers and stabilisers (including locking pins and level indicators)',
                    'Markings, data plates, and load charts',
                    'Wire ropes, chains, and associated fittings',
                    'Pins, bolts, and locking devices at all pivot points',
                    'Boom extension and retraction mechanisms',
                    'Slewing mechanism and slew ring',
                    'Load monitoring and overload protection systems',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The examination is not
                  limited to a visual check. The competent person will operate the machine through
                  its full range of movements, test all controls and safety devices, check for wear
                  and corrosion, and may use specialist testing equipment such as non-destructive
                  testing (NDT) methods to assess structural integrity where necessary.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Structural Assessment</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Cracking, bending, or distortion of structural members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Corrosion and rust affecting structural integrity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Weld quality and condition at critical joints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wear at pivot points and hinge pins</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Functional Testing</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>All controls respond correctly and proportionally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Emergency stop and manual lowering systems operate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Interlocks prevent unsafe operations (e.g. drive cut-out at height)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Load monitoring systems function within specified tolerances</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The depth and scope of the examination reflects the fact that a MEWP carries people.
                A failure of any critical component could result in a platform collapse,
                uncontrolled descent, tip-over, or structural failure &mdash; all of which can cause
                fatal or life-changing injuries to the operator and anyone below.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Reports and Defect Categories */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Reports and Defect Categories
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Following every thorough examination, the competent person must produce a written
                report. This report is a legal document and must be retained by the employer (or the
                person on whose behalf the examination was carried out). The report confirms the
                condition of the equipment and identifies any defects found.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The written report must
                  be provided within <strong>28&nbsp;days</strong> of the examination. However, if
                  an immediate danger is found, the competent person must notify the relevant
                  enforcing authority (typically the HSE) without delay — they do not wait for the
                  28-day reporting period.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Defect Categories</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-400 mb-1">(a) Immediate Danger</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          The machine must be taken{' '}
                          <strong className="text-white">out of service immediately</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Must <strong className="text-white">not</strong> be used until the defect
                          is rectified
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Notifiable to the HSE or relevant enforcing authority</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Examples: structural crack in boom, failed emergency lowering system,
                          inoperative overload protection
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">
                      (b) Defect Requiring Attention
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>A defect that could become dangerous if not rectified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Must be rectified within a{' '}
                          <strong className="text-white">specified timescale</strong> set by the
                          competent person
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          The machine may continue in use until the deadline, provided the risk is
                          managed
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Examples: minor hydraulic seepage, worn tyre tread, damaged but functional
                          guardrail paint
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-1">(c) Observation</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>An advisory note for future attention</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Not currently dangerous, but worth monitoring or addressing at the next
                          service
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Does not require immediate or time-limited action</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Examples: minor surface corrosion, faded markings, cosmetic damage
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Report Retention &amp; Legal Obligations
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Reports must be <strong className="text-white">retained</strong> and available
                      for inspection by the HSE or enforcing authority at any time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The <strong className="text-white">employer must act</strong> on the findings
                      — failing to rectify identified defects is itself a breach
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Reports should be kept for at least the{' '}
                      <strong className="text-white">life of the equipment</strong> or until the
                      next report of the same type
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If equipment is hired, the hire company and the hirer should both hold copies
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Criminal Offence</p>
                </div>
                <p className="text-sm text-white/80">
                  Failure to have a current thorough examination for a MEWP that is in use is a{' '}
                  <strong className="text-white">criminal offence</strong> under LOLER 1998. This
                  applies to the employer, the person who controls the use of the equipment, and
                  potentially the hire company if they have supplied equipment without a valid
                  certificate. Penalties include unlimited fines and imprisonment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Routine Maintenance (PUWER) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Routine Maintenance (PUWER)
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Alongside the LOLER thorough examination, the Provision and Use of Work Equipment
                Regulations 1998 (PUWER) requires that all work equipment &mdash; including MEWPs
                &mdash; is maintained in an efficient state, in efficient working order, and in good
                repair. This means regular, planned maintenance in accordance with the
                manufacturer&rsquo;s schedule.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">
                    PUWER Maintenance Requirements
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regular servicing</strong> per the
                      manufacturer&rsquo;s recommended schedule (hours, intervals, or
                      condition-based)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Documented maintenance records</strong> — every
                      service, repair, and component replacement must be recorded with dates,
                      details, and the name of the person who carried out the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Only qualified and competent persons</strong>{' '}
                      to carry out maintenance — typically manufacturer-trained engineers or
                      approved service agents
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Genuine or approved parts</strong> must be used
                      — non-approved components can compromise safety and invalidate the
                      manufacturer&rsquo;s warranty
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In addition to planned maintenance, inspections must be carried out at specific
                points to catch defects between thorough examinations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Inspection Requirements</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pre-use inspection (daily)</strong> — the
                      operator must carry out a visual and functional check before every shift,
                      covering fluid levels, controls, safety devices, guardrails, tyres, and
                      general condition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Post-use inspection (recommended)</strong> — a
                      brief check at the end of the shift to note any defects that developed during
                      the working day, ready for the next user
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Certain events also trigger the need for an inspection before the machine is used
                again:
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Events Triggering Additional Inspection
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Severe weather (high winds, heavy rain, frost, snow, or lightning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Collision or impact with another object or vehicle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Overload or attempted overload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Period of disuse or extended storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Transportation to a new site (particularly for larger machines)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Any event that may have caused damage or affected stability</span>
                  </li>
                </ul>
              </div>

              {/* Operator vs Employer Responsibility */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">
                      The Operator Is Responsible For:
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Completing a pre-use inspection before every shift</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Recording defects found during pre-use checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Reporting defects immediately to the supervisor or employer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Not using a machine they believe to be defective or unsafe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Checking that the thorough examination certificate is in date before use
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Conducting a post-use check and handing over defect information</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">The Employer Must Arrange:</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>6-monthly thorough examinations under LOLER 1998</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Regular planned maintenance per manufacturer&rsquo;s schedule</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Documented maintenance and inspection records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Action on all defects identified in thorough examination reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Qualified, competent engineers to carry out all maintenance work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Retention of all reports and records for HSE inspection</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> Maintenance and thorough
                  examination are <strong>complementary, not interchangeable</strong>. A
                  well-maintained machine still requires a thorough examination. A thorough
                  examination does not replace routine servicing. Both are legal requirements, and
                  both are essential to keeping operators and others safe.
                </p>
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
            <Link to="../mewp-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-3-section-3">
              Next: Outriggers, Stabilisers &amp; Ground Preparation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
