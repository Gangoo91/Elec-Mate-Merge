import { ArrowLeft, BookOpen, CheckCircle, FileText, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-bi510-retention',
    question:
      'How long must an employer retain completed accident book records under current guidance?',
    options: [
      '1 year from the date of the incident',
      '3 years from the date of the last entry',
      '5 years from the date of the incident',
      'Indefinitely — they must never be destroyed',
    ],
    correctIndex: 1,
    explanation:
      'Accident book records must be retained for at least 3 years from the date of the last entry. This aligns with the Limitation Act 1980, which sets a 3-year period for personal injury claims. After 3 years, records should be securely disposed of in line with GDPR requirements.',
  },
  {
    id: 'fa-riddor-timeframe',
    question:
      'An employee suffers a fractured wrist at work. Within what timeframe must this be reported under RIDDOR?',
    options: [
      'Immediately by the quickest practical means, then a written report within 10 days',
      'Within 7 days of the incident',
      'Within 15 days of the incident',
      'Only if the employee is off work for more than 7 days',
    ],
    correctIndex: 0,
    explanation:
      "A fracture (other than to fingers, thumbs or toes) is a 'specified injury' under RIDDOR 2013. Specified injuries must be notified to the HSE by the quickest practical means (usually telephone) without delay, followed by a written report (Form F2508 or online) within 10 days of the incident.",
  },
  {
    id: 'fa-gdpr-accident-book',
    question: 'Why do modern BI510 accident books use tear-out perforated pages?',
    options: [
      'To make it easier to submit pages to the HSE',
      'To allow each entry to be stored separately, preventing other employees from seeing personal data',
      'To reduce the cost of printing accident books',
      'To allow pages to be photocopied more easily',
    ],
    correctIndex: 1,
    explanation:
      'Modern BI510 accident books use tear-out perforated pages so that each completed entry can be removed and stored securely by the employer. This prevents subsequent users of the book from reading personal details of previous casualties — a key requirement of the UK GDPR and Data Protection Act 2018.',
  },
];

const faqs = [
  {
    question: 'Does every workplace need an accident book?',
    answer:
      'The Social Security (Claims and Payments) Regulations 1979 require employers with 10 or more employees to keep an accident book. However, the HSE strongly recommends that all employers — regardless of size — maintain records of workplace accidents and ill health. Even if you have fewer than 10 employees, keeping records is best practice and can be invaluable if a claim arises later.',
  },
  {
    question: 'Can I use a digital system instead of a paper BI510 accident book?',
    answer:
      'Yes. The HSE accepts digital record-keeping systems as an alternative to the paper BI510, provided the system captures all the same information, is secure, allows authorised access, and can produce records when required. Digital systems must also comply with UK GDPR — meaning access controls, encryption, audit trails, and defined retention periods must be in place.',
  },
  {
    question: 'If I give first aid for a minor cut, do I need to report it under RIDDOR?',
    answer:
      'No. RIDDOR only requires reporting of specific categories of injury, disease, dangerous occurrence, or incapacitation lasting more than 7 consecutive days. A minor cut treated with first aid is not RIDDOR-reportable. However, you should still record it in the accident book and in your own first aid records — even minor incidents can reveal patterns or escalate into claims.',
  },
  {
    question: "Who is the 'responsible person' for RIDDOR reporting?",
    answer:
      'The responsible person is typically the employer. For self-employed workers, the self-employed person reports their own incidents. For incidents involving members of the public or visitors on premises controlled by someone other than the employer, the person in control of the premises is the responsible person. In practice, the employer often delegates RIDDOR reporting to a health and safety manager, but the legal duty remains with the employer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following must be recorded in the accident book after a workplace incident?',
    options: [
      "Only the casualty's name and the date",
      'Date, time, casualty details, nature of injury, circumstances, treatment given, and name of the first aider',
      'Only RIDDOR-reportable injuries',
      'A full medical diagnosis of the injury',
    ],
    correctAnswer: 1,
    explanation:
      "The accident book entry must include: the date and time of the incident, the casualty's full name and details, the nature of the injury or illness, the circumstances and location, the treatment given, and the name of the person providing first aid. A medical diagnosis is not required — only a description of the injury as observed.",
  },
  {
    id: 2,
    question: "Under RIDDOR 2013, which of these is classified as a 'specified injury'?",
    options: [
      'A fractured little finger',
      'A burn covering 8% of the body surface',
      'An amputation of a hand',
      'A sprained ankle requiring a bandage',
    ],
    correctAnswer: 2,
    explanation:
      'An amputation is a specified injury under RIDDOR and must be reported immediately. A fractured finger (not thumb) is excluded from the fracture category. Burns must cover more than 10% of the body to qualify. A sprained ankle is not a specified injury unless it leads to over-7-day incapacitation.',
  },
  {
    id: 3,
    question:
      'An employee is injured and cannot work for 9 consecutive days (not counting the day of the accident). What is the RIDDOR reporting timeframe?',
    options: [
      'Report immediately by telephone',
      'Report within 10 days',
      'Report within 15 days of the incident',
      'No RIDDOR report is required for this duration',
    ],
    correctAnswer: 2,
    explanation:
      'Over-7-day incapacitation (where the worker is unable to carry out their normal duties for more than 7 consecutive days, not counting the day of the accident) must be reported within 15 days of the incident. This is different from specified injuries, which require immediate notification.',
  },
  {
    id: 4,
    question: 'How should RIDDOR reports be submitted to the HSE?',
    options: [
      'By post only, using Form F2508',
      'By telephoning the local council',
      "Online via the HSE's RIDDOR website, or by telephone for fatalities and specified injuries",
      'By email to the HSE regional office',
    ],
    correctAnswer: 2,
    explanation:
      "RIDDOR reports are submitted online via the HSE's RIDDOR reporting website (www.hse.gov.uk/riddor). For fatal and specified injuries that require immediate notification, the HSE can also be contacted by telephone. Postal submissions using Form F2508 are no longer the standard method.",
  },
  {
    id: 5,
    question:
      'Why is recording near-misses considered best practice, even though it is not a legal requirement?',
    options: [
      'Because the HSE can fine employers who do not record near-misses',
      'Because near-miss data helps identify hazards before they cause actual injury',
      'Because near-misses must be reported under RIDDOR',
      'Because insurance companies require near-miss data for all claims',
    ],
    correctAnswer: 1,
    explanation:
      'Near-miss recording is not legally required, but it is one of the most effective tools for preventing future accidents. Near-misses reveal hazards, unsafe behaviours, and system failures that could cause injury next time. Analysing near-miss data allows employers to take corrective action before someone is actually hurt.',
  },
  {
    id: 6,
    question: 'Under UK GDPR, which principle is most relevant to storing accident book records?',
    options: [
      'Data must be stored in a foreign jurisdiction for security',
      'Personal data must be kept no longer than necessary and stored securely',
      'All accident data must be published on the company website',
      'Employees cannot access their own accident records',
    ],
    correctAnswer: 1,
    explanation:
      'The storage limitation and security principles of UK GDPR require that personal data in accident records is kept only as long as necessary (typically 3 years) and stored securely with appropriate access controls. Records must not be accessible to unauthorised persons, and employees have a right to access their own data under a Subject Access Request.',
  },
  {
    id: 7,
    question:
      'A worker loses consciousness after inhaling fumes in a confined space. Under RIDDOR, this is reportable because it falls under which category?',
    options: [
      'Over-7-day incapacitation',
      'Occupational disease',
      'Specified injury — loss of consciousness caused by asphyxia',
      'Dangerous occurrence',
    ],
    correctAnswer: 2,
    explanation:
      'Loss of consciousness caused by asphyxia (lack of oxygen) is a specified injury under RIDDOR 2013. It must be reported immediately by the quickest practical means, followed by a written report within 10 days. This applies regardless of how quickly the worker recovers consciousness.',
  },
  {
    id: 8,
    question:
      'What is the primary advantage of a digital accident recording system over a paper BI510?',
    options: [
      'Digital systems do not need to comply with GDPR',
      'Digital records are searchable, provide audit trails, and can be backed up securely',
      'Digital systems eliminate the need to record incidents',
      'Paper records are no longer accepted by the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Digital systems offer searchability (find patterns across incidents), automatic audit trails (who accessed or edited records and when), secure backup and encryption, and access controls. However, they must still comply with UK GDPR. Paper BI510 books remain perfectly acceptable — digital is an alternative, not a replacement mandated by law.',
  },
];

export default function FirstAidModule1Section3() {
  useSEO({
    title: 'Record Keeping, RIDDOR & the Accident Book | First Aid Module 1.3',
    description:
      "Accident Book BI510, RIDDOR 2013 reporting requirements, specified injuries, over-7-day incapacitation, GDPR considerations, digital record-keeping and the first aider's role in documentation.",
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
            <BookOpen className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Record Keeping, RIDDOR &amp; the Accident Book
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Legal requirements for documenting workplace injuries, reporting under RIDDOR 2013, GDPR
            considerations, and the first aider&apos;s role in accurate record keeping
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Accident Book BI510:</strong> Required for employers with 10+ staff
              </li>
              <li>
                <strong>RIDDOR 2013:</strong> Deaths, specified injuries, over-7-day, dangerous
                occurrences
              </li>
              <li>
                <strong>GDPR:</strong> Accident records contain personal data &mdash; store
                securely, limit access
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Record:</strong> Every incident, no matter how minor
              </li>
              <li>
                <strong>Report:</strong> RIDDOR events immediately or within the required timeframe
              </li>
              <li>
                <strong>Protect:</strong> Casualty&apos;s personal data at all times
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the legal requirement for accident books and what must be recorded',
              'List the categories of incident reportable under RIDDOR 2013',
              'State the correct reporting timeframes for different RIDDOR categories',
              'Describe the GDPR implications of storing personal data in accident records',
              'Compare digital and paper-based record-keeping systems',
              "Explain the first aider's role in documentation and near-miss recording",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Accident Book (BI510) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            The Accident Book (BI510)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Accident Book</strong> is a legal document used to record details of
                workplace accidents, injuries and dangerous occurrences. The current version is the{' '}
                <strong>BI510</strong>, published by the HSE. Under the Social Security (Claims and
                Payments) Regulations 1979, employers with <strong>10 or more employees</strong> are
                legally required to keep an accident book.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; Accident Book BI510
                </p>
                <p className="text-sm text-white">
                  The BI510 is the HSE&apos;s approved accident book format. It provides a
                  standardised way to record workplace incidents. Even where it is not legally
                  required (employers with fewer than 10 staff), the HSE strongly recommends keeping
                  one. Records are essential for identifying trends, supporting insurance claims,
                  and providing evidence in legal proceedings.
                </p>
              </div>

              <p>
                Every entry in the accident book must capture enough information to create a clear
                picture of what happened. The first aider or the injured person (if able) should
                complete the entry as soon as possible after the incident, whilst details are still
                fresh.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What to Record in the Accident Book
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { field: 'Date and time', detail: 'When the accident or incident occurred' },
                    {
                      field: 'Casualty details',
                      detail: 'Full name, address, occupation/job title',
                    },
                    {
                      field: 'Nature of injury or illness',
                      detail:
                        'Description of the injury (e.g. laceration to left forearm, suspected fracture of right wrist)',
                    },
                    { field: 'Location', detail: 'Where on the premises the incident took place' },
                    {
                      field: 'Circumstances',
                      detail: 'How the incident happened, what the person was doing at the time',
                    },
                    {
                      field: 'Treatment given',
                      detail:
                        'What first aid was administered (e.g. wound cleaned, sterile dressing applied)',
                    },
                    {
                      field: 'Name of first aider',
                      detail: 'The person who provided treatment or completed the record',
                    },
                    {
                      field: 'Signature',
                      detail: 'The person making the entry should sign and date it',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">{item.field}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Retention Requirement</p>
                <p className="text-sm text-white/80">
                  Completed accident book entries must be retained for a minimum of{' '}
                  <strong>3 years</strong> from the date of the last entry. This period aligns with
                  the Limitation Act 1980 timeframe for personal injury claims. After the retention
                  period, records should be securely destroyed in accordance with data protection
                  requirements.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-white/60" />
                  <p className="text-sm font-medium text-white">Practical Tips for First Aiders</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Write legibly &mdash; these records may be read by investigators, insurers or
                      courts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Record facts, not opinions &mdash; write what you observed, not what you think
                      caused it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Complete the entry as soon as practicable &mdash; do not rely on memory hours
                      later
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Never alter a completed entry &mdash; if you need to add information, make a
                      supplementary note
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Store the accident book in a known, accessible location &mdash; all staff
                      should know where it is
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: RIDDOR 2013 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            RIDDOR 2013 &mdash; Reporting of Injuries, Diseases and Dangerous Occurrences
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>RIDDOR</strong> (Reporting of Injuries, Diseases and Dangerous Occurrences
                Regulations 2013) is the UK law that requires employers, the self-employed, and
                people in control of premises to report certain serious workplace incidents to the
                HSE. RIDDOR reports help the HSE and local authorities identify where and how risks
                arise, and to investigate serious incidents.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; RIDDOR 2013
                </p>
                <p className="text-sm text-white">
                  RIDDOR places a legal duty on <strong>responsible persons</strong> to report
                  specified workplace incidents. Failure to report a RIDDOR-notifiable event is a
                  criminal offence. The responsible person is typically the employer, the
                  self-employed worker, or the person in control of the premises where the incident
                  occurred.
                </p>
              </div>

              <p>
                Not every workplace injury triggers a RIDDOR report. The regulations define specific
                categories of incident that must be reported. Understanding these categories is
                essential for every first aider.
              </p>

              {/* RIDDOR Categories Grid */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-rose-300">
                    RIDDOR Reportable Categories
                  </p>
                </div>

                {/* Category 1: Deaths */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-red-500/30 text-red-300 text-xs font-bold">
                        DEATHS
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        All deaths of workers arising from a work-related accident, including deaths
                        that occur some time after the original incident. Deaths of non-workers
                        (e.g. members of the public) arising from a work-related accident must also
                        be reported.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category 2: Specified Injuries */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-orange-500/30 text-orange-300 text-xs font-bold">
                        SPECIFIED INJURIES
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-3">
                        Certain serious injuries suffered by workers must be reported regardless of
                        the time off work. These include:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          'Fractures (other than to fingers, thumbs or toes)',
                          'Amputations (any loss of a limb or part of a limb)',
                          'Permanent loss of sight or reduction in sight',
                          'Crush injuries leading to internal organ damage',
                          'Burns covering more than 10% of the body surface',
                          'Scalping (separation of skin from the head)',
                          'Loss of consciousness from head injury or asphyxia',
                          'Hypothermia or heat illness requiring resuscitation or hospital admission',
                        ].map((injury, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                            <span className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                            <span>{injury}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category 3: Over-7-Day Incapacitation */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                        OVER-7-DAY
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Where a worker is incapacitated for{' '}
                        <strong>more than 7 consecutive days</strong> (not counting the day of the
                        accident) and cannot carry out their normal work duties. This includes
                        weekends and rest days, not just working days.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category 4: Dangerous Occurrences */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 text-xs font-bold">
                        DANGEROUS OCCURRENCES
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Specified near-miss events that had the potential to cause serious injury or
                        death, even if no one was actually injured. Examples include the collapse of
                        scaffolding, electrical short circuits causing fire, accidental release of
                        dangerous substances, and the overturning of lifting equipment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category 5: Occupational Diseases */}
                <div className="p-4">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-teal-500/30 text-teal-300 text-xs font-bold">
                        OCCUPATIONAL DISEASES
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Certain work-related diseases confirmed by a doctor, including occupational
                        dermatitis, occupational asthma, hand-arm vibration syndrome (HAVS), carpal
                        tunnel syndrome linked to vibrating tools, and occupational cancer. The
                        disease must be linked to the worker&apos;s specific type of work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Important Distinction</p>
                </div>
                <p className="text-sm text-white/80">
                  Note that fractures to <strong>fingers, thumbs and toes</strong> are specifically
                  excluded from the &ldquo;specified injuries&rdquo; fracture category. A broken
                  finger is not a specified injury &mdash; but it may still be reportable under the
                  over-7-day category if the worker is incapacitated for more than 7 consecutive
                  days.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Reporting Timeframes & How to Report */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Reporting Timeframes &amp; How to Report
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                RIDDOR specifies strict timeframes for reporting. The urgency depends on the
                severity of the incident. Missing a RIDDOR reporting deadline is a criminal offence
                that can result in prosecution by the HSE.
              </p>

              {/* Timeframes Comparison Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-red-400 mb-3">
                    Deaths &amp; Specified Injuries
                  </p>
                  <div className="space-y-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-300 mb-1">
                        Step 1 &mdash; Immediate Notification
                      </p>
                      <p className="text-xs text-white/70">
                        Notify the HSE by the <strong>quickest practical means</strong> without
                        delay. For fatalities and specified injuries, this usually means telephoning
                        the HSE Incident Contact Centre.
                      </p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-300 mb-1">
                        Step 2 &mdash; Written Report
                      </p>
                      <p className="text-xs text-white/70">
                        Submit a written report <strong>within 10 days</strong> of the incident.
                        This is done online via the HSE&apos;s RIDDOR website or by completing Form
                        F2508.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-amber-400 mb-3">
                    Over-7-Day Incapacitation
                  </p>
                  <div className="space-y-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-amber-300 mb-1">
                        Report Within 15 Days
                      </p>
                      <p className="text-xs text-white/70">
                        The responsible person must submit a report <strong>within 15 days</strong>{' '}
                        of the incident. There is no requirement for immediate telephone
                        notification. The 15-day window starts from the date of the accident, not
                        from the date the 7-day threshold is reached.
                      </p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-amber-300 mb-1">Counting the Days</p>
                      <p className="text-xs text-white/70">
                        The day of the accident is <strong>not counted</strong>. Count 7 consecutive
                        days from the day after the accident. Weekends and rest days are included in
                        the count.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Submit a RIDDOR Report</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-bold text-rose-400">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Online (Primary Method)</p>
                      <p className="text-xs text-white/70">
                        Go to the HSE RIDDOR website (www.hse.gov.uk/riddor) and complete the
                        appropriate online report form. This is the HSE&apos;s preferred method for
                        all RIDDOR reports.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-bold text-rose-400">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Telephone (Fatalities &amp; Specified Injuries Only)
                      </p>
                      <p className="text-xs text-white/70">
                        For deaths and specified injuries requiring immediate notification,
                        telephone the HSE Incident Contact Centre. They will record the details and
                        issue a reference number. A written report must still follow within 10 days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-bold text-rose-400">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Keep a Copy</p>
                      <p className="text-xs text-white/70">
                        Always save or print a copy of the submitted RIDDOR report. The online
                        system generates a confirmation with a unique reference number. Keep this
                        with your accident records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Who Is the &ldquo;Responsible Person&rdquo;?
                </p>
                <p className="text-sm text-white/80 mb-3">
                  RIDDOR places the reporting duty on the responsible person, not the first aider.
                  However, the first aider must ensure the right people are informed so that the
                  report can be made.
                </p>
                <div className="grid sm:grid-cols-3 gap-2">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Employer</p>
                    <p className="text-xs text-white/70">
                      For incidents involving their employees at work
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Self-Employed</p>
                    <p className="text-xs text-white/70">
                      For incidents arising from their own work activity
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Premises Controller</p>
                    <p className="text-xs text-white/70">
                      For incidents involving visitors or the public on their premises
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: First Aid Records vs RIDDOR */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            First Aid Records vs RIDDOR &mdash; Understanding the Difference
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                It is essential to understand that{' '}
                <strong>first aid records and RIDDOR reports serve different purposes</strong>. Not
                every incident recorded in the accident book requires a RIDDOR report, and a RIDDOR
                report does not replace the need for an accident book entry.
              </p>

              {/* Comparison Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">
                      First Aid / Accident Book Records
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong>All</strong> incidents are recorded &mdash; minor and major
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Internal company document</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Completed by the first aider or injured person</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Used for trend analysis, insurance, legal evidence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Retained for 3 years</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">RIDDOR Reports</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Only <strong>specified categories</strong> of incident are reported
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>External report to the HSE / local authority</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Submitted by the responsible person (employer)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Used by HSE for enforcement, investigation, national statistics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Strict legal timeframes apply</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Example Scenarios</p>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-400 mb-1">
                      Minor Cut &mdash; Accident Book Only
                    </p>
                    <p className="text-xs text-white/70">
                      An electrician cuts their finger on a cable tie. You clean the wound, apply a
                      plaster, and record it in the accident book. This is <strong>not</strong>{' '}
                      RIDDOR-reportable &mdash; it is a minor injury with no specified category.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-orange-400 mb-1">
                      Fractured Arm &mdash; Accident Book + RIDDOR
                    </p>
                    <p className="text-xs text-white/70">
                      A worker falls from a stepladder and fractures their forearm. You provide
                      first aid, call 999, and record it in the accident book. This is also a{' '}
                      <strong>specified injury under RIDDOR</strong> &mdash; the employer must
                      notify the HSE immediately and submit a written report within 10 days.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      Sprained Ankle, 10 Days Off &mdash; Accident Book + RIDDOR (Over-7-Day)
                    </p>
                    <p className="text-xs text-white/70">
                      A worker sprains their ankle badly and is off work for 10 consecutive days
                      (not counting the day of the accident). This triggers the{' '}
                      <strong>over-7-day incapacitation</strong> RIDDOR category. The employer must
                      report within 15 days of the incident.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: GDPR & Data Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            GDPR Considerations &amp; Data Protection
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accident book entries contain <strong>personal data</strong> and{' '}
                <strong>special category data</strong> (health information) under the UK General
                Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. Employers and
                first aiders must handle this data responsibly.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; Personal Data in Accident Records
                </p>
                <p className="text-sm text-white">
                  Accident records contain names, addresses, health details, and information about
                  injuries. Under UK GDPR, health data is a &ldquo;special category&rdquo; of
                  personal data that requires additional safeguards. The legal basis for processing
                  this data is typically compliance with a legal obligation (the duty to record
                  accidents) and the protection of vital interests.
                </p>
              </div>

              <p>
                The modern BI510 accident book addresses GDPR concerns through its design. Each
                entry is on a <strong>tear-out perforated page</strong> that can be removed and
                stored securely once completed. This prevents subsequent users of the book from
                browsing through previous entries and reading other people&apos;s personal and
                medical information.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  GDPR Principles Applied to Accident Records
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      principle: 'Lawfulness & Transparency',
                      detail:
                        'Employees should know that accident data will be recorded, who will access it, and why',
                    },
                    {
                      principle: 'Purpose Limitation',
                      detail:
                        'Data collected for accident recording must not be used for unrelated purposes (e.g. performance management)',
                    },
                    {
                      principle: 'Data Minimisation',
                      detail:
                        'Record only what is necessary — do not collect excessive personal details beyond what the BI510 requires',
                    },
                    {
                      principle: 'Storage Limitation',
                      detail:
                        'Retain records for the required 3 years, then securely destroy them — do not keep them indefinitely',
                    },
                    {
                      principle: 'Integrity & Confidentiality',
                      detail:
                        'Store records securely — locked cabinet for paper, encrypted and access-controlled for digital',
                    },
                    {
                      principle: 'Accountability',
                      detail:
                        'The employer must be able to demonstrate compliance with these principles if challenged',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">{item.principle}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Who Can Access Accident Records?
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>The injured person</strong> &mdash; has a right to access their own
                      records under a Subject Access Request (SAR)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>The employer / designated health &amp; safety personnel</strong>{' '}
                      &mdash; for managing the incident, RIDDOR reporting, and trend analysis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>HSE inspectors</strong> &mdash; during an investigation, they have the
                      legal power to inspect accident records
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Insurers</strong> &mdash; when processing employer&apos;s liability
                      claims, with appropriate legal basis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Not</strong> other employees, curious colleagues, or anyone without a
                      legitimate reason
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Common GDPR Mistakes with Accident Records
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Leaving the accident book open on a counter where anyone can read previous
                      entries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not removing completed tear-out pages for secure storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Discussing a casualty&apos;s injury details with colleagues who have no need
                      to know
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Keeping records beyond the 3-year retention period without justification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Disposing of records by placing them in general waste instead of shredding or
                      secure destruction
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Digital Record-Keeping, Near-Misses & the First Aider's Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Digital Record-Keeping, Near-Misses &amp; the First Aider&apos;s Role
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many workplaces are moving from paper accident books to{' '}
                <strong>digital record-keeping systems</strong>. The HSE accepts digital systems as
                a valid alternative to the paper BI510, provided they meet certain requirements.
                Digital systems offer significant advantages but also introduce new considerations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Digital vs Paper Record-Keeping
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      Advantages of Digital Systems
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Searchable</strong> &mdash; find incidents by date, location,
                          injury type or person
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Secure</strong> &mdash; access controls, encryption, password
                          protection
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Audit trail</strong> &mdash; automatic log of who accessed or
                          edited records
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Trend analysis</strong> &mdash; generate reports, charts and
                          statistics automatically
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Remote access</strong> &mdash; authorised users can access records
                          from any location
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          <strong>Backup</strong> &mdash; cloud storage protects against loss from
                          fire, flood or theft
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      Considerations &amp; Requirements
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Must capture <strong>all the same information</strong> as the paper BI510
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Must comply with <strong>UK GDPR</strong> &mdash; access controls,
                          encryption, retention limits
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Regular <strong>backups</strong> are essential &mdash; data loss could
                          mean losing legal records
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Must be <strong>accessible to authorised persons</strong> when needed
                          (e.g. HSE inspectors)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Staff must be <strong>trained</strong> to use the system correctly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Consider offline access &mdash; can records be created if the internet is
                          down?
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; Near-Miss Recording
                </p>
                <p className="text-sm text-white">
                  A <strong>near-miss</strong> is an unplanned event that did not result in injury,
                  illness or damage but had the potential to do so. Recording near-misses is{' '}
                  <strong>not a legal requirement</strong> under RIDDOR (unless they fall within the
                  specific &ldquo;dangerous occurrences&rdquo; category). However, the HSE strongly
                  encourages near-miss recording as it is one of the most powerful tools for
                  accident prevention.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Why Record Near-Misses?</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Heinrich&apos;s Triangle:</strong> For every serious injury, there are
                      approximately 29 minor injuries and 300 near-misses. Reducing near-misses
                      reduces the likelihood of serious injury.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Pattern identification:</strong> Repeated near-misses in the same area
                      or with the same equipment signal a systemic problem before it causes real
                      harm.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Safety culture:</strong> Encouraging near-miss reporting shows that
                      the organisation values proactive safety, not just reactive compliance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Corrective action:</strong> Each near-miss is an opportunity to fix a
                      hazard before someone is injured.
                    </span>
                  </li>
                </ul>
              </div>

              {/* The First Aider's Role */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The First Aider&apos;s Role in Record Keeping
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  As a first aider, you are often the first person to document a workplace incident.
                  Your records may be used by the employer for RIDDOR reporting, by insurers for
                  claims, and by courts in legal proceedings. Accuracy, timeliness and
                  professionalism are critical.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      duty: 'Document immediately',
                      detail:
                        'Complete the accident book entry as soon as it is safe to do so — before details fade from memory',
                    },
                    {
                      duty: 'Record facts only',
                      detail:
                        "Write what you observed, not what you assume. 'The casualty stated they slipped' is factual; 'The floor was dangerously wet' is an opinion",
                    },
                    {
                      duty: 'Be specific about treatment',
                      detail:
                        "Record exactly what first aid was provided: 'Applied direct pressure with sterile pad, elevated arm, applied roller bandage'",
                    },
                    {
                      duty: 'Note the time accurately',
                      detail:
                        'Record when you arrived, when treatment was given, when emergency services were called, and when the casualty was handed over',
                    },
                    {
                      duty: 'Inform the employer',
                      detail:
                        'Ensure the appropriate person (line manager, H&S officer) is informed so they can assess whether a RIDDOR report is needed',
                    },
                    {
                      duty: 'Maintain confidentiality',
                      detail:
                        "Do not share the casualty's medical details with colleagues who do not need to know — GDPR applies",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">{item.duty}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Remember</p>
                </div>
                <p className="text-sm text-white/80">
                  The first aider&apos;s primary duty is always to{' '}
                  <strong>treat the casualty first</strong>. Record keeping comes after the
                  immediate emergency has been managed and the casualty is safe or has been handed
                  over to the ambulance service. Never delay life-saving treatment to fill in
                  paperwork.
                </p>
              </div>
            </div>
          </div>
        </section>

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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../first-aid-module-1-section-4">
              Next: First Aid Kits, Equipment &amp; Workplace Planning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
