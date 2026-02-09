import {
  ArrowLeft,
  Scale,
  CheckCircle,
  AlertTriangle,
  Shield,
  Users,
  Gavel,
  BookOpen,
  ClipboardList,
  HardHat,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-regulations-1981',
    question:
      'Which piece of legislation places a duty on employers to provide adequate first aid provision in the workplace?',
    options: [
      'The Management of Health and Safety at Work Regulations 1999',
      'The Health and Safety (First-Aid) Regulations 1981',
      'The Health and Safety at Work etc. Act 1974',
      'The Workplace (Health, Safety and Welfare) Regulations 1992',
    ],
    correctIndex: 1,
    explanation:
      'The Health and Safety (First-Aid) Regulations 1981 are the specific regulations that require employers to provide adequate and appropriate first aid equipment, facilities, and personnel. HSWA 1974 is the overarching Act, but the 1981 Regulations deal specifically with first aid provision.',
  },
  {
    id: 'fa-faw-vs-efaw',
    question: 'What is the key difference between an FAW certificate and an EFAW certificate?',
    options: [
      'FAW is only valid for 1 year, EFAW lasts 3 years',
      'FAW covers a wider range of first aid skills over 3 days; EFAW covers emergency life-saving skills over 1 day',
      'EFAW allows you to administer medication; FAW does not',
      'There is no difference &mdash; both cover the same content',
    ],
    correctIndex: 1,
    explanation:
      'The First Aid at Work (FAW) course is a 3-day qualification covering a comprehensive range of first aid topics. The Emergency First Aid at Work (EFAW) course is a 1-day qualification that covers core emergency life-saving skills only. Both certificates are valid for 3 years.',
  },
  {
    id: 'fa-needs-assessment',
    question:
      'Which of the following is NOT a factor an employer must consider when carrying out a first aid needs assessment?',
    options: [
      'The nature of the work and workplace hazards',
      'The number of employees and shift patterns',
      'The age and gender of each employee',
      'The remoteness of the site from emergency medical services',
    ],
    correctIndex: 2,
    explanation:
      'A first aid needs assessment considers factors such as workplace hazards, workforce size, shift patterns, remoteness from emergency services, and the presence of high-risk activities. The age and gender of individual employees is not a specific factor in the assessment, although the general workforce profile may be considered.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a first aider and an appointed person?',
    answer:
      'A first aider holds a valid FAW or EFAW certificate from an HSE-approved training organisation and is qualified to administer first aid treatment. An appointed person does not need a first aid qualification &mdash; their role is to take charge of first aid arrangements (such as looking after equipment and calling the emergency services) and to act as first aider when the designated first aider is absent. An appointed person should not attempt to provide first aid treatment beyond their competence.',
  },
  {
    question: 'Can I still act as a first aider if my certificate has expired?',
    answer:
      'No. Once your FAW or EFAW certificate has expired, you are no longer a qualified first aider under the Regulations. However, if your certificate expires within a 28-day window, you can take a 2-day requalification course instead of the full 3-day FAW course. If more than 28 days have passed since expiry, you must complete the full course again. Employers should track certificate expiry dates and arrange requalification in good time.',
  },
  {
    question: 'How many first aiders does a construction site need?',
    answer:
      'For construction sites, the HSE recommends at least 1 FAW-qualified first aider for every 5 to 50 workers. For sites with more than 50 workers, at least 1 additional FAW first aider is needed per 50 workers. These are minimums &mdash; the actual number should be determined by the first aid needs assessment, taking into account the nature of the work, the hazards present, the size and layout of the site, and the proximity to emergency medical services.',
  },
  {
    question: 'Does an employer have to provide a first aid room?',
    answer:
      'Not in all cases, but employers must consider whether a first aid room is necessary as part of their first aid needs assessment. The Approved Code of Practice L74 recommends providing a first aid room where the workplace is large, there are serious health and safety risks, or access to emergency medical services is difficult. Any first aid room must be easily accessible, clearly signposted, and suitably equipped with a couch, blankets, a sink with hot and cold water, drinking water, and first aid supplies.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which regulations specifically require employers to provide first aid in the workplace?',
    options: [
      'The Workplace (Health, Safety and Welfare) Regulations 1992',
      'The Management of Health and Safety at Work Regulations 1999',
      'The Health and Safety (First-Aid) Regulations 1981',
      'The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013',
    ],
    correctAnswer: 2,
    explanation:
      'The Health and Safety (First-Aid) Regulations 1981 are the specific regulations that place a duty on employers to make adequate first aid provision for their employees.',
  },
  {
    id: 2,
    question: 'What is the Approved Code of Practice L74?',
    options: [
      'A mandatory legal standard for first aid training providers',
      'Guidance that accompanies the First-Aid Regulations 1981 and explains what constitutes adequate provision',
      'A set of rules governing the contents of first aid kits',
      'A European directive on workplace first aid',
    ],
    correctAnswer: 1,
    explanation:
      'The Approved Code of Practice L74 accompanies the Health and Safety (First-Aid) Regulations 1981 and provides practical guidance on what constitutes adequate and appropriate first aid provision. While not law itself, failing to follow an ACOP can be used as evidence in court proceedings.',
  },
  {
    id: 3,
    question: 'How long is a First Aid at Work (FAW) certificate valid?',
    options: ['1 year', '2 years', '3 years', '5 years'],
    correctAnswer: 2,
    explanation:
      'Both FAW and EFAW certificates are valid for 3 years from the date of issue. Certificate holders must requalify before their certificate expires to maintain their status as a qualified first aider.',
  },
  {
    id: 4,
    question:
      'What is the duration of the requalification course for FAW, and within what period must it be taken?',
    options: [
      '1 day, within 6 months of expiry',
      '2 days, within 28 days of certificate expiry',
      '3 days, within 3 months of expiry',
      '2 days, within 6 months of expiry',
    ],
    correctAnswer: 1,
    explanation:
      'The FAW requalification course is 2 days and must be completed within 28 days of the certificate expiry date. If more than 28 days have elapsed, the full 3-day FAW course must be taken.',
  },
  {
    id: 5,
    question:
      'Which of the following is NOT an employer duty under the First-Aid Regulations 1981?',
    options: [
      'Provide adequate first aid equipment and facilities',
      'Ensure there are sufficient qualified first aiders',
      'Carry out a first aid needs assessment',
      'Provide free private healthcare insurance for all employees',
    ],
    correctAnswer: 3,
    explanation:
      'Employers must provide equipment, facilities, and personnel for first aid, and must carry out a needs assessment. There is no duty under the First-Aid Regulations to provide private healthcare insurance.',
  },
  {
    id: 6,
    question:
      'On a construction site with 30 workers, what is the minimum recommended number of FAW-qualified first aiders?',
    options: [
      'None &mdash; an appointed person is sufficient',
      'At least 1 FAW-qualified first aider',
      'At least 2 FAW-qualified first aiders',
      'At least 3 FAW-qualified first aiders',
    ],
    correctAnswer: 1,
    explanation:
      'For construction sites with 5 to 50 workers, the HSE recommends at least 1 person who holds a valid FAW certificate. Additional first aiders may be needed depending on the specific hazards identified in the first aid needs assessment.',
  },
  {
    id: 7,
    question: 'What is the role of an appointed person in workplace first aid?',
    options: [
      'To administer all first aid treatment on site',
      'To take charge of first aid arrangements and call emergency services when needed',
      'To carry out the employer&rsquo;s risk assessment',
      'To inspect and certify first aid training providers',
    ],
    correctAnswer: 1,
    explanation:
      'An appointed person takes charge of first aid arrangements, ensures equipment is maintained, and calls the emergency services when required. They do not need a first aid qualification but should not attempt treatment beyond their competence.',
  },
  {
    id: 8,
    question: 'Which of the following factors must be considered in a first aid needs assessment?',
    options: [
      'Employee salary grades and job titles',
      'The brand of first aid kit purchased',
      'Workplace hazards, workforce size, shift patterns, and remoteness from emergency services',
      'The colour scheme of the first aid room',
    ],
    correctAnswer: 2,
    explanation:
      'A first aid needs assessment must consider the nature of the work, workplace hazards, the number of employees, shift patterns, remoteness from emergency medical services, holiday and sickness cover, and the presence of high-risk activities.',
  },
];

export default function FirstAidModule1Section1() {
  useSEO({
    title: "The First Aider's Role & Legal Framework | First Aid Module 1.1",
    description:
      'Health and Safety (First-Aid) Regulations 1981, Approved Code of Practice L74, FAW vs EFAW certificates, employer duties, first aid needs assessment, and the role of the first aider in UK workplaces.',
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
            <Link to="../first-aid-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Scale className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The First Aider&rsquo;s Role &amp; Legal Framework
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The primary legislation governing workplace first aid in Great Britain, the two
            qualification levels, employer duties, and how to assess what first aid provision your
            workplace needs
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Law:</strong> Health &amp; Safety (First-Aid) Regulations 1981
              </li>
              <li>
                <strong>Certificates:</strong> FAW (3 days) &amp; EFAW (1 day) &mdash; both valid 3
                years
              </li>
              <li>
                <strong>Employers:</strong> Must assess needs &amp; provide adequate provision
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Construction:</strong> 1 FAW first aider per 5&ndash;50 workers minimum
              </li>
              <li>
                <strong>Always:</strong> First aid kit, appointed person or first aider on each
                shift
              </li>
              <li>
                <strong>Record:</strong> All first aid incidents in the accident book
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the scope of the Health and Safety (First-Aid) Regulations 1981',
              'Describe the role and status of Approved Code of Practice L74',
              'Distinguish between FAW and EFAW qualifications',
              'Summarise employer duties for first aid provision',
              'Carry out a first aid needs assessment for a typical workplace',
              'Explain the difference between a first aider and an appointed person',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Health and Safety (First-Aid) Regulations 1981 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            The Health &amp; Safety (First-Aid) Regulations 1981
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety (First-Aid) Regulations 1981 are the primary piece of
                legislation that requires employers to provide adequate and appropriate first aid
                equipment, facilities, and personnel for their employees. The Regulations apply to{' '}
                <strong>all workplaces</strong> in England, Wales, and Scotland, regardless of size
                or sector &mdash; from a small office with five staff to a major construction site
                with hundreds of workers.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Definition:</strong> &ldquo;First aid&rdquo;
                  under the Regulations means the treatment carried out for the purpose of
                  preserving life and minimising the consequences of injury and illness until full
                  medical treatment can be obtained. It also includes the treatment of minor
                  injuries that would otherwise receive no treatment, or which do not need treatment
                  by a medical practitioner or nurse.
                </p>
              </div>

              <p>
                The Regulations were made under the Health and Safety at Work etc. Act 1974 (HSWA)
                and sit alongside other workplace health and safety legislation. They do not stand
                in isolation &mdash; they form part of a wider framework that includes the
                Management of Health and Safety at Work Regulations 1999 (which require risk
                assessments) and the Reporting of Injuries, Diseases and Dangerous Occurrences
                Regulations 2013 (RIDDOR).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What the Regulations Require:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Employers must provide adequate and appropriate first aid equipment,
                      facilities, and personnel to ensure employees receive immediate attention if
                      injured or taken ill at work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Employers must carry out an assessment of first aid needs appropriate to the
                      circumstances of the workplace
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Employers must inform all employees of the first aid arrangements, including
                      the location of equipment, facilities, and the identity of first aiders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Self-employed persons must provide adequate first aid equipment to treat
                      themselves if injured or taken ill
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The duty under the Regulations rests squarely on the <strong>employer</strong>. It
                is not the responsibility of the employee to provide their own first aid equipment,
                nor is it acceptable for an employer to rely on nearby businesses or members of the
                public to provide first aid cover. The employer must make their own adequate
                arrangements.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important Note:</strong> The Regulations apply
                  to employees only. There is no legal duty under these Regulations to provide first
                  aid for non-employees such as members of the public, visitors, or contractors.
                  However, the HSE strongly recommends that employers include non-employees in their
                  first aid needs assessment, and many organisations choose to extend their
                  provision accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Approved Code of Practice L74 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Approved Code of Practice L74
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Approved Code of Practice and Guidance L74 &mdash;{' '}
                <em>First Aid at Work: The Health and Safety (First-Aid) Regulations 1981</em>{' '}
                &mdash; accompanies the Regulations and provides detailed practical guidance on what
                constitutes adequate and appropriate first aid provision. It is published by the
                Health and Safety Executive and is the definitive reference for employers, training
                organisations, and first aiders.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Definition:</strong> An Approved Code of
                  Practice (ACOP) has a special legal status. While it is not law in itself, if you
                  are prosecuted for a breach of the Regulations and it is proved that you did not
                  follow the relevant provisions of the ACOP, you will need to show the court that
                  you complied with the Regulations in some other equally effective way &mdash; or
                  you will be found at fault.
                </p>
              </div>

              <p>
                L74 covers a wide range of practical matters, including the contents of first aid
                kits, the number and training of first aiders, the need for first aid rooms, record
                keeping, and how to carry out a first aid needs assessment. It is regularly updated
                to reflect changes in best practice and should be treated as the primary source of
                guidance alongside the Regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">What L74 Covers</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">First aid personnel:</strong> The difference
                      between a first aider and an appointed person, and when each is appropriate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Training standards:</strong> Requirements for
                      HSE-approved training organisations and the content of FAW and EFAW courses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Equipment and facilities:</strong> Minimum
                      contents of first aid kits, when a first aid room is needed, and what it
                      should contain
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Needs assessment:</strong> A step-by-step
                      framework for assessing what first aid provision a workplace requires
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Information:</strong> How employers should
                      communicate first aid arrangements to employees, including signage and
                      induction
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                While the ACOP provides detailed guidance, it is important to understand that
                employers can comply with the Regulations in other ways &mdash; provided those
                alternative measures are equally effective. In practice, however, following L74 is
                the simplest and most reliable way to demonstrate compliance.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: FAW vs EFAW — The Two Certificate Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            FAW vs EFAW &mdash; The Two Certificate Types
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are two nationally recognised workplace first aid qualifications in the United
                Kingdom: the <strong>First Aid at Work (FAW)</strong> certificate and the{' '}
                <strong>Emergency First Aid at Work (EFAW)</strong> certificate. Both are regulated
                qualifications delivered by HSE-approved training organisations, and both are valid
                for <strong>3&nbsp;years</strong> from the date of issue.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">First Aid at Work (FAW)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Duration:</strong> 3&nbsp;days (minimum 18
                        contact hours)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Scope:</strong> Comprehensive first aid
                        including CPR, choking, wounds and bleeding, burns, fractures, spinal
                        injuries, shock, poisoning, eye injuries, asthma, anaphylaxis, seizures,
                        diabetes emergencies, and more
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Certificate validity:</strong> 3&nbsp;years
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Requalification:</strong> 2-day course within
                        28 days of expiry
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Best for:</strong> Higher-risk workplaces,
                        construction sites, larger workforces, designated first aiders
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">
                      Emergency First Aid at Work (EFAW)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Duration:</strong> 1&nbsp;day (minimum 6
                        contact hours)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Scope:</strong> Core emergency life-saving
                        skills including CPR, choking, unconscious casualty management, severe
                        bleeding, and shock
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Certificate validity:</strong> 3&nbsp;years
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Requalification:</strong> 1-day course (full
                        EFAW retake)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Best for:</strong> Lower-risk workplaces,
                        small businesses, offices, shops, additional cover on larger sites
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">3-Year Certificate Validity:</strong> Both FAW
                  and EFAW certificates are valid for exactly 3&nbsp;years from the date the
                  certificate is issued. Once the certificate expires, the holder is no longer a
                  qualified first aider under the Regulations. Employers must track expiry dates and
                  arrange requalification courses in good time to avoid gaps in first aid cover.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Requalification Rules</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">FAW requalification:</strong> A 2-day course is
                      available if completed within 28 days of the certificate expiry date. After 28
                      days, the full 3-day FAW course must be taken.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">EFAW requalification:</strong> As EFAW is a
                      1-day course, requalification simply involves retaking the full 1-day EFAW
                      course.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Annual refresher training:</strong> The HSE
                      strongly recommends that first aiders undertake annual refresher training
                      (typically half a day) to maintain their skills between full requalification
                      courses.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The choice between FAW and EFAW depends on the outcome of the employer&rsquo;s first
                aid needs assessment. Higher-risk environments with more hazards and larger
                workforces will generally require FAW-qualified first aiders. Lower-risk settings
                may be adequately served by EFAW-trained personnel. Many employers choose to train a
                mix of both.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Employer Duties & the First Aid Needs Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Employer Duties &amp; the First Aid Needs Assessment
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The employer has a clear and non-delegable duty under the First-Aid Regulations 1981
                to provide adequate first aid provision. This duty covers four main areas:
                equipment, facilities, personnel, and information. The level of provision required
                is determined by a <strong>first aid needs assessment</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Four Pillars of Employer Duty
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">1. Equipment</p>
                    <p className="text-sm text-white/80">
                      At a minimum, a suitably stocked first aid kit must be provided. The contents
                      should reflect the hazards of the workplace. L74 provides guidance on minimum
                      kit contents. Kits must be checked regularly and replenished when items are
                      used or reach their expiry date.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">2. Facilities</p>
                    <p className="text-sm text-white/80">
                      In higher-risk or larger workplaces, a dedicated first aid room may be
                      required. This must be easily accessible, clearly signposted with a white
                      cross on a green background, and equipped with a couch, blankets, a sink with
                      hot and cold water, drinking water, and first aid supplies.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">3. Personnel</p>
                    <p className="text-sm text-white/80">
                      Employers must ensure there are sufficient trained personnel &mdash; either
                      qualified first aiders (FAW or EFAW) or appointed persons &mdash; to provide
                      first aid cover at all times the workplace is occupied, including during
                      shifts, weekends, and holiday periods.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">4. Information</p>
                    <p className="text-sm text-white/80">
                      All employees must be told who the first aiders or appointed persons are,
                      where the first aid equipment is located, and what to do in an emergency. This
                      is typically communicated through signage, induction training, and the health
                      and safety notice board.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Definition:</strong> A{' '}
                  <strong>first aid needs assessment</strong> is the process by which an employer
                  determines what first aid provision is adequate and appropriate for their
                  workplace. It is not a one-off exercise &mdash; it must be reviewed regularly and
                  updated whenever circumstances change, such as new hazards, changes to workforce
                  size, or relocation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Factors in a First Aid Needs Assessment
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Workplace hazards:</strong> What are the
                      specific risks? Electrical work, working at height, use of machinery,
                      hazardous substances, manual handling, and confined spaces all increase the
                      first aid requirement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Workforce size:</strong> The number of
                      employees on site at any given time directly affects how many first aiders are
                      needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shift patterns:</strong> First aid cover must
                      be available during all working hours, including night shifts, weekends, and
                      overtime periods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Remoteness:</strong> How far is the workplace
                      from the nearest hospital or ambulance station? Remote sites may need more
                      first aiders and enhanced equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">High-risk activities:</strong> Work with
                      electricity, heights, confined spaces, or hazardous substances may require
                      additional or specialist first aid provision
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Multi-site working:</strong> Employees who
                      travel between sites, work from home, or work alone require separate
                      consideration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Holiday and sickness cover:</strong>{' '}
                      Arrangements must be in place to maintain first aid provision when first
                      aiders are absent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Non-employees:</strong> While not a legal
                      requirement, the HSE strongly recommends including visitors, contractors, and
                      members of the public in the assessment
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The outcome of the needs assessment should be documented and should clearly state
                what first aid provision is in place, how many first aiders or appointed persons are
                required, what equipment and facilities are provided, and when the assessment will
                next be reviewed. This documentation serves as evidence of compliance should the HSE
                inspect the workplace.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Construction Site Requirements & HSE-Approved Training */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Construction Site Requirements &amp; HSE-Approved Training
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites present a higher level of risk than most workplaces due to the
                nature of the activities carried out &mdash; working at height, electrical work,
                heavy plant operations, excavations, demolition, and exposure to hazardous
                substances. As a result, the first aid requirements for construction sites are more
                demanding.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Site Minimums:</strong> The HSE
                  recommends a minimum of <strong>1&nbsp;FAW-qualified first aider</strong> for
                  every 5&nbsp;to&nbsp;50 workers on a construction site. For sites with more than
                  50 workers, at least 1 additional FAW first aider should be provided for every
                  additional 50 workers. These are <strong>minimum</strong> figures &mdash; the
                  actual number should be determined by the site-specific first aid needs
                  assessment.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Construction Site First Aid Requirements
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fewer than 5 workers:</strong> At minimum, an
                      appointed person and a suitably stocked first aid kit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">5 to 50 workers:</strong> At least 1
                      FAW-qualified first aider, plus a suitably stocked first aid kit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">More than 50 workers:</strong> At least 1 FAW
                      first aider per 50 workers, additional first aid equipment, and consideration
                      of a site first aid room
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Remote sites:</strong> Additional first aiders
                      and enhanced equipment such as automated external defibrillators (AEDs) may be
                      necessary where emergency services response time is long
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                All first aid training must be delivered by an{' '}
                <strong>HSE-approved training organisation</strong>. The HSE does not deliver first
                aid training itself &mdash; it approves and monitors training providers who meet its
                standards. These organisations must demonstrate that their trainers are competent,
                that their course content meets the required syllabus, and that their assessment
                methods are robust. A list of HSE-approved training organisations is maintained on
                the HSE website.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    HSE-Approved Training Organisations Must:
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Deliver the full FAW or EFAW syllabus as specified by the HSE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use qualified trainers with up-to-date clinical knowledge and teaching skills
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Maintain appropriate trainer-to-student ratios (typically no more than 12
                      learners per trainer for practical skills)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use robust and fair assessment methods, including practical demonstration and
                      written or oral questioning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Issue certificates that clearly state the qualification obtained and the
                      expiry date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Maintain records of all certificates issued and make them available to the HSE
                      upon request
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Self-Employed Persons</p>
                </div>
                <p className="text-sm text-white/80">
                  If you are self-employed, the First-Aid Regulations 1981 require you to provide
                  adequate and appropriate equipment for administering first aid to yourself. In
                  practice, this means carrying a personal first aid kit that is appropriate to the
                  hazards you face. If you work on construction sites or in other high-risk
                  environments, it is strongly recommended &mdash; and often required by site rules
                  &mdash; that you hold a valid EFAW or FAW certificate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: First Aider vs Appointed Person */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            First Aider vs Appointed Person
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Regulations recognise two distinct roles in workplace first aid: the{' '}
                <strong>first aider</strong> and the <strong>appointed person</strong>.
                Understanding the difference between these two roles is essential for both employers
                and employees.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">First Aider</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Holds a valid FAW or EFAW certificate from an HSE-approved training
                        organisation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Qualified to administer first aid treatment to the level of their training
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Can assess a situation, provide immediate treatment, and make decisions
                        about calling the emergency services
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Must requalify before their certificate expires to maintain their status
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Required in all workplaces where the needs assessment identifies a
                        requirement for qualified first aiders
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Appointed Person</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Does <strong className="text-white">not</strong> need a first aid
                        qualification
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Takes charge of the first aid arrangements &mdash; looks after the first aid
                        kit, ensures it is stocked, and maintains records
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Calls the emergency services (999/112) when required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Should <strong className="text-white">not</strong> attempt to give first aid
                        treatment beyond their level of competence
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Used in lower-risk workplaces or as cover when the qualified first aider is
                        temporarily absent
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important:</strong> An appointed person is{' '}
                  <strong>not</strong> a substitute for a qualified first aider. Where the needs
                  assessment identifies that qualified first aiders are required, the employer
                  cannot simply appoint unqualified staff as appointed persons instead. The two
                  roles serve different purposes &mdash; the appointed person manages the
                  arrangements; the first aider delivers the treatment.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gavel className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Legal Protection for First Aiders
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        The Social Action, Responsibility and Heroism Act 2015 (SARAH Act):
                      </strong>{' '}
                      This Act provides reassurance to first aiders that the court will consider the
                      context in which they acted when determining liability. If you acted for the
                      benefit of society, demonstrated a predominantly responsible approach, and
                      were acting heroically by intervening in an emergency, the court must take
                      these factors into account.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Duty of care:</strong> A first aider has a duty
                      of care to act within the scope of their training and to the best of their
                      ability. You are not expected to perform medical procedures or provide
                      treatment beyond your competence. Acting reasonably and within your training
                      is the key defence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Consent:</strong> Always obtain consent from a
                      conscious, competent casualty before providing treatment. If the casualty is
                      unconscious or unable to give consent, you may treat them under the principle
                      of implied consent &mdash; it is reasonable to assume they would want
                      life-saving treatment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Record keeping:</strong> All first aid
                      treatment should be recorded in the workplace accident book. This provides a
                      contemporaneous record that protects both the casualty and the first aider.
                      Records must be stored in compliance with data protection legislation (UK
                      GDPR).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Enforcement &amp; Consequences</p>
                </div>
                <p className="text-sm text-white/80">
                  The Health and Safety Executive (HSE) enforces the First-Aid Regulations 1981.
                  Inspectors have the power to enter workplaces, examine first aid arrangements, and
                  take enforcement action where provision is inadequate. An employer who fails to
                  provide adequate first aid may receive an <strong>improvement notice</strong>{' '}
                  (requiring them to remedy the breach within a set time) or, in serious cases, face{' '}
                  <strong>prosecution</strong> with unlimited fines. Beyond legal penalties,
                  inadequate first aid provision can lead to delayed treatment, worsened injuries,
                  loss of life, civil claims from injured employees, and severe reputational damage.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-1-section-2">
              Next: Scene Safety &amp; the Primary Survey
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
