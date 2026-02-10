import {
  ArrowLeft,
  ArrowRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  ClipboardCheck,
  Eye,
  Radio,
  Search,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fs-marshal-ratio',
    question:
      'What is the general recommended ratio of fire marshals to occupants per floor?',
    options: [
      '1 fire marshal per 20 occupants',
      '1 fire marshal per 50 occupants',
      '1 fire marshal per 100 occupants',
      '1 fire marshal per 200 occupants',
    ],
    correctIndex: 1,
    explanation:
      'The generally accepted recommendation is a minimum of 1 fire marshal per 50 occupants per floor. This ratio may need to be increased in higher-risk premises, premises with complex layouts, or where occupants may need additional assistance during evacuation. The ratio is a starting point — the actual number required should be determined by the fire risk assessment.',
  },
  {
    id: 'fs-article-15',
    question:
      'Which article of the Regulatory Reform (Fire Safety) Order 2005 deals with procedures for serious and imminent danger?',
    options: [
      'Article 9 — Risk Assessment',
      'Article 15 — Procedures for Serious and Imminent Danger',
      'Article 17 — Maintenance',
      'Article 21 — Training',
    ],
    correctIndex: 1,
    explanation:
      'Article 15 of the RRFSO requires the responsible person to establish and, where necessary, give effect to appropriate procedures — including safety drills — to be followed in the event of serious and imminent danger to relevant persons. This includes nominating a sufficient number of competent persons to implement evacuation procedures and ensuring that no person has access to any danger area unless they have received adequate safety instruction.',
  },
  {
    id: 'fs-refresher-frequency',
    question: 'How frequently should fire marshal refresher training be provided?',
    options: [
      'Every 6 months',
      'Annually',
      'Every 2 years',
      'Every 3 years',
    ],
    correctIndex: 1,
    explanation:
      'Fire marshal refresher training should be provided annually as a minimum. This ensures that fire marshals maintain their knowledge, stay up to date with any changes to the premises, fire strategy, or legislation, and have the opportunity to practise evacuation procedures. RRFSO Article 21 requires that training is repeated periodically and adapted to take account of any new or changed risks.',
  },
];

const faqs = [
  {
    question:
      'Is it a legal requirement to have fire marshals in the workplace?',
    answer:
      'The RRFSO does not use the specific term "fire marshal" or "fire warden". However, Article 15(1)(b) requires the responsible person to nominate a sufficient number of competent persons to implement procedures for serious and imminent danger, including evacuation. Article 18 requires the appointment of one or more competent persons to assist in undertaking preventive and protective measures. In practice, this means that appointing trained fire marshals is the standard way to comply with these legal duties. While the title itself is not legally mandated, the functions that fire marshals perform are legally required.',
  },
  {
    question:
      'Should a fire marshal ever enter a burning building to search for missing persons?',
    answer:
      'Absolutely not. A fire marshal must never re-enter a building that is on fire or filled with smoke to search for missing persons. This is the sole responsibility of the fire and rescue service, who have the specialist equipment, training, and breathing apparatus required to operate in such conditions. The fire marshal\'s role during an emergency ends at the assembly point — reporting the results of their sweep and any persons unaccounted for to the fire service upon their arrival. Attempting a rescue without proper equipment puts both the fire marshal and the missing persons at greater risk.',
  },
  {
    question:
      'Is practical extinguisher training a legal requirement for fire marshals?',
    answer:
      'The RRFSO does not explicitly mandate practical (hands-on) extinguisher training. However, Article 21 requires that employees are provided with adequate safety training, and the guidance accompanying the Order recommends that fire marshals receive practical training in the use of first-aid firefighting equipment. Most fire safety training providers include practical extinguisher training as standard in their fire marshal courses. In practice, theory-only training is considered insufficient — a fire marshal who has never discharged an extinguisher is unlikely to use one effectively under the stress of a real emergency. Best practice is to include live-fire practical extinguisher training in both initial and annual refresher courses.',
  },
  {
    question:
      'What should a fire marshal do if they discover a fire during a routine inspection?',
    answer:
      'If a fire marshal discovers an actual fire during a routine inspection, they should follow the standard fire action procedure: raise the alarm immediately by activating the nearest manual call point; call 999 (or the site emergency number); only attempt to fight the fire if it is very small, they have been trained, they have the correct extinguisher, they have a clear escape route behind them, and they are confident they can extinguish it safely. If in any doubt, they should evacuate immediately, closing doors behind them as they leave. They should then proceed to the assembly point and report the location, size, and nature of the fire to the arriving fire service. The priority is always life safety — raising the alarm and evacuating — not firefighting.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under the RRFSO, who retains the ultimate legal duty for fire safety in a workplace?',
    options: [
      'The fire marshal',
      'The responsible person',
      'The local fire and rescue service',
      'The building owner only',
    ],
    correctAnswer: 1,
    explanation:
      'The responsible person retains the ultimate legal duty for fire safety under the RRFSO. While fire marshals act on behalf of the responsible person and assist with day-to-day fire safety management, the legal responsibility cannot be delegated. The responsible person must ensure that all fire safety duties are properly discharged, even when competent persons have been appointed to assist.',
  },
  {
    id: 2,
    question:
      'What is the general recommended minimum ratio of fire marshals to occupants per floor?',
    options: [
      '1 per 25 occupants',
      '1 per 50 occupants',
      '1 per 75 occupants',
      '1 per 100 occupants',
    ],
    correctAnswer: 1,
    explanation:
      'The generally accepted recommendation is a minimum of 1 fire marshal per 50 occupants per floor. This ratio should be increased for higher-risk premises, complex layouts, or where occupants may require additional assistance. Deputies should also be appointed to cover for absences such as holidays, sickness, and shift changes.',
  },
  {
    id: 3,
    question:
      'What does RRFSO Article 21 require regarding fire marshal training?',
    options: [
      'Training is optional and at the employer\'s discretion',
      'Training must be provided only when the fire service requests it',
      'Adequate safety training must be provided during working hours, repeated periodically, and adapted to new or changed risks',
      'Training is only required for employees working with flammable substances',
    ],
    correctAnswer: 2,
    explanation:
      'Article 21 of the RRFSO requires the responsible person to ensure that employees are provided with adequate safety training at the time they are first employed, and whenever they are exposed to new or increased risks. The training must be repeated periodically, adapted to take account of any new or changed risks, and provided during working hours at no cost to the employee.',
  },
  {
    id: 4,
    question:
      'During an evacuation, a fire marshal\'s primary duty when sweeping their designated area is to:',
    options: [
      'Fight any fires they encounter to prevent spread',
      'Ensure all persons have left, checking rooms, toilets, and closed areas, and close doors behind them',
      'Wait at the fire panel to identify the zone before evacuating',
      'Collect valuable equipment and documents before leaving',
    ],
    correctAnswer: 1,
    explanation:
      'The fire marshal\'s primary duty during an area sweep is to ensure all persons have evacuated. This means systematically checking all rooms, toilets, meeting rooms, and any areas where people could be trapped or unaware of the alarm. Doors should be closed behind them to slow the spread of fire and smoke. The fire marshal must never delay their own evacuation to fight fires or collect property.',
  },
  {
    id: 5,
    question:
      'RRFSO Article 15 requires the responsible person to establish procedures for:',
    options: [
      'Annual fire safety audits by the fire service',
      'Serious and imminent danger, including nominating competent persons for evacuation',
      'Monthly fire extinguisher maintenance contracts',
      'Insurance reporting following a fire incident',
    ],
    correctAnswer: 1,
    explanation:
      'Article 15 requires the responsible person to establish appropriate procedures to be followed in the event of serious and imminent danger. This includes nominating a sufficient number of competent persons to implement those procedures, ensuring that persons in danger are informed of the hazard and the steps being taken to protect them, and ensuring that no one has access to danger areas unless they have received adequate instruction.',
  },
  {
    id: 6,
    question:
      'Which of the following is the most appropriate method of identifying a fire marshal during an emergency?',
    options: [
      'A printed name badge worn on a lanyard',
      'A hi-visibility tabard or vest clearly marked "Fire Marshal"',
      'A coloured hard hat with no markings',
      'Verbal announcement at the assembly point',
    ],
    correctAnswer: 1,
    explanation:
      'A hi-visibility tabard or vest clearly marked "Fire Marshal" is the most effective identification method. It is immediately visible in poor visibility conditions (smoke, darkness, rain), recognisable to all occupants and emergency services, and can be donned quickly when the alarm sounds. Fire marshals should know where their tabard is stored and be able to collect it rapidly when responding to an alarm.',
  },
  {
    id: 7,
    question:
      'How frequently should a fire marshal carry out routine checks of fire doors, exits, and extinguishers?',
    options: [
      'Daily',
      'Weekly',
      'Monthly',
      'Quarterly',
    ],
    correctAnswer: 1,
    explanation:
      'Fire marshals should carry out routine visual checks of fire safety provisions on a weekly basis as a minimum. This includes checking that fire doors close properly and are not propped open, escape routes are clear, fire extinguishers are in place and have not been discharged or tampered with, manual call points are unobstructed, and fire safety signage is intact and visible. Findings must be recorded and any deficiencies reported immediately.',
  },
  {
    id: 8,
    question:
      'What is the practical difference between a fire marshal and a fire warden?',
    options: [
      'A fire warden is a legally defined senior role; a fire marshal is a junior assistant',
      'There is no legal distinction — the terms are often used interchangeably, though some organisations use "warden" for floor-level sweep duties and "marshal" for coordination roles',
      'A fire marshal can only operate during daytime hours',
      'A fire warden is appointed by the fire service; a fire marshal is appointed by the employer',
    ],
    correctAnswer: 1,
    explanation:
      'There is no legal distinction between the terms "fire marshal" and "fire warden" — neither term appears in the RRFSO. In practice, the terms are often used interchangeably. Some larger organisations distinguish between the two: wardens may be assigned floor-level sweep duties during evacuation, while marshals may take on a broader coordination role including routine inspections and liaison with the responsible person. The important factor is not the title but the training provided and the duties assigned.',
  },
];

export default function FireSafetyModule4Section1() {
  useSEO({
    title: 'The Fire Marshal Role | Fire Safety Module 4.1',
    description:
      'Fire marshal appointment, responsibilities, training requirements, routine inspections, relationship with the responsible person, equipment, and identification for UK fire marshals under the RRFSO.',
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
            <Link to="../fire-safety-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Shield className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Fire Marshal Role
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Appointment, responsibilities, training, routine inspections, and the relationship
            between fire marshals and the responsible person under the RRFSO
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>RRFSO Articles 15 &amp; 18:</strong> Legal basis for fire marshal appointment
              </li>
              <li>
                <strong>Ratio:</strong> Minimum 1 fire marshal per 50 occupants per floor
              </li>
              <li>
                <strong>Training:</strong> Initial half-day + annual refresher + practical extinguisher
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Day-to-day:</strong> Prevention awareness, hazard reporting, exit checks
              </li>
              <li>
                <strong>Emergency:</strong> Sweep area, assist evacuation, report to assembly point
              </li>
              <li>
                <strong>Weekly:</strong> Fire doors, extinguishers, call points, signage
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define the fire marshal role and its legal basis under the RRFSO',
              'Explain the difference between fire marshal and fire warden',
              'Describe the key responsibilities before, during, and after an emergency',
              'Identify the training requirements for fire marshals under Article 21',
              'Determine the appropriate number and distribution of fire marshals',
              'Explain the relationship between the fire marshal and the responsible person',
              'List the equipment and identification requirements for fire marshals',
              'Describe the scope and frequency of routine fire safety inspections',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 — What Is a Fire Marshal? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            What Is a Fire Marshal?
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A fire marshal is a person appointed within a workplace to assist the{' '}
                <strong>responsible person</strong> in carrying out fire safety duties. The role
                exists to ensure that fire prevention measures are maintained on a day-to-day basis
                and that evacuation procedures are implemented effectively when the alarm sounds.
              </p>

              <p>
                The legal basis for appointing fire marshals comes from two key articles of the{' '}
                <strong>Regulatory Reform (Fire Safety) Order 2005 (RRFSO)</strong>:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Article 15</p>
                  </div>
                  <p className="text-sm font-bold text-white mb-2">
                    Procedures for Serious and Imminent Danger
                  </p>
                  <p className="text-sm text-white/80 mb-3">
                    Requires the responsible person to establish and give effect to appropriate
                    procedures to be followed in the event of serious and imminent danger to
                    relevant persons. This includes:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Nominating a <strong className="text-white">sufficient number of
                        competent persons</strong> to implement evacuation procedures
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Ensuring persons in danger are <strong className="text-white">informed
                        of the hazard</strong> and the steps taken to protect them
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Ensuring no person has access to a danger area unless they have received{' '}
                        <strong className="text-white">adequate safety instruction</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Article 18</p>
                  </div>
                  <p className="text-sm font-bold text-white mb-2">
                    Safety Assistance &mdash; Competent Persons
                  </p>
                  <p className="text-sm text-white/80 mb-3">
                    Requires the responsible person to appoint one or more competent persons to
                    assist in undertaking the preventive and protective measures required by the
                    Order. A competent person must have:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Sufficient training</strong> and experience
                        or knowledge to properly assist
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Other qualities</strong> to enable them to
                        properly assist in the preventive and protective measures
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Preference for persons already{' '}
                        <strong className="text-white">employed within the organisation</strong>{' '}
                        over external appointees
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Point</p>
                </div>
                <p className="text-sm text-white/80">
                  The general recommendation is a minimum of{' '}
                  <strong className="text-white">1 fire marshal per 50 occupants per floor</strong>.
                  This ratio is widely cited in fire safety guidance and training materials, although
                  it is not a fixed legal requirement. The actual number should be determined by the
                  fire risk assessment, taking into account the size and complexity of the premises,
                  the level of risk, the nature of the occupants, and the availability of fire
                  marshals at all times (including cover for absences, holidays, and shift patterns).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 — Fire Marshal vs Fire Warden */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Fire Marshal vs Fire Warden
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The terms <strong>&ldquo;fire marshal&rdquo;</strong> and{' '}
                <strong>&ldquo;fire warden&rdquo;</strong> are frequently used interchangeably in UK
                workplaces. Neither term appears in the RRFSO, and there is{' '}
                <strong>no legal distinction</strong> between the two roles. The legislation refers
                only to &ldquo;competent persons&rdquo; appointed to assist with fire safety duties.
              </p>

              <p>
                However, some larger organisations choose to distinguish between the two titles to
                create a clearer hierarchy of fire safety responsibilities:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-rose-400 mb-2">Fire Warden</p>
                  <p className="text-sm text-white/80 mb-3">
                    In organisations that distinguish between the roles, the fire warden is typically
                    assigned to a specific floor or zone within the building. Their primary duty
                    during an evacuation is to:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Sweep their designated area to ensure all persons have evacuated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Check rooms, toilets, meeting rooms, and storage areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Close doors and windows as they leave</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Report the status of their area to the fire marshal at the assembly point</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-bold text-rose-400 mb-2">Fire Marshal</p>
                  <p className="text-sm text-white/80 mb-3">
                    In organisations that distinguish between the roles, the fire marshal takes on a
                    broader coordination role that includes:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Coordinating the overall evacuation and receiving reports from wardens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Conducting routine fire safety inspections and audits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Liaising with the responsible person and the fire and rescue service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Maintaining fire safety records and reporting hazards</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-amber-300">
                  <strong>Important:</strong> Regardless of which title your organisation uses, the
                  legal requirements remain the same. What matters is that the persons appointed have
                  received adequate training, understand their duties, and are capable of performing
                  them effectively. In this course, we use the term &ldquo;fire marshal&rdquo; to
                  cover both roles unless specifically stated otherwise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 — Key Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Key Responsibilities
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The fire marshal&rsquo;s responsibilities span three distinct phases:{' '}
                <strong>day-to-day prevention</strong>, <strong>emergency response</strong>, and{' '}
                <strong>post-incident actions</strong>. Each phase requires different skills and
                knowledge, and all are equally important for maintaining effective fire safety
                management.
              </p>

              {/* Day-to-Day */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Day-to-Day Responsibilities</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The majority of a fire marshal&rsquo;s time is spent on proactive fire prevention
                  rather than emergency response. Day-to-day responsibilities include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire prevention awareness:</strong> Maintaining a
                      general awareness of fire risks in the workplace and promoting fire safety among
                      colleagues. This includes identifying unsafe practices, poor housekeeping, and
                      potential ignition sources before they become a hazard.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Reporting hazards:</strong> Identifying and
                      reporting fire hazards to the responsible person or facilities management. This
                      includes blocked exits, propped-open fire doors, faulty electrical equipment,
                      accumulation of combustible waste, and any other conditions that increase fire
                      risk.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Checking exits and doors:</strong> Regularly
                      verifying that all fire exits are unobstructed, clearly signed, and easily
                      opened from the inside. Checking that fire doors close properly into their
                      frames, are not propped open, and have intact intumescent strips and smoke
                      seals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Checking fire equipment:</strong> Visually
                      inspecting fire extinguishers, fire blankets, and manual call points to ensure
                      they are in their designated locations, accessible, and have not been tampered
                      with or discharged.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Knowing the emergency plan:</strong> Maintaining
                      a thorough understanding of the fire emergency plan, evacuation routes, assembly
                      points, and the location of all fire safety equipment in their area of
                      responsibility.
                    </span>
                  </li>
                </ul>
              </div>

              {/* During Emergency */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">During an Emergency</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  When the fire alarm activates, the fire marshal must immediately transition from
                  their normal work activities to their emergency role. Speed and systematic action
                  are critical:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Initiate evacuation:</strong> If the fire marshal
                      discovers the fire, they should activate the nearest manual call point to raise
                      the alarm and call 999. In all cases, they must immediately begin directing
                      people to evacuate via the nearest safe escape route.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Sweep designated area:</strong> Systematically
                      search their assigned area to ensure all persons have left. This includes
                      checking inside all rooms, meeting rooms, toilets, storage areas, and any
                      enclosed or concealed spaces where someone could be trapped.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Assist persons needing help:</strong> Identify
                      and assist any persons who may have difficulty evacuating — including persons
                      with mobility impairments, visual or hearing impairments, visitors unfamiliar
                      with the building, and any person who appears confused or distressed. Implement
                      Personal Emergency Evacuation Plans (PEEPs) where applicable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Close doors:</strong> Close all doors and windows
                      as they leave each area. Closing doors is one of the most effective actions for
                      slowing the spread of fire and smoke between compartments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Prevent re-entry:</strong> Once at the assembly
                      point, prevent anyone from re-entering the building until the &ldquo;all
                      clear&rdquo; has been given by the fire service or the responsible person.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Report to assembly point:</strong> Report the
                      status of their area to the chief fire marshal or responsible person at the
                      assembly point — confirming whether their area is clear or whether anyone is
                      unaccounted for.
                    </span>
                  </li>
                </ul>
              </div>

              {/* After the Emergency */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">After the Emergency</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Once the emergency has been resolved and the &ldquo;all clear&rdquo; has been
                  given, the fire marshal&rsquo;s responsibilities continue:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Head count:</strong> Verify that all persons who
                      were in their area have been accounted for at the assembly point. Cross-reference
                      with visitor logs, contractor registers, and any other attendance records.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Report to the fire service:</strong> Provide the
                      fire service with information about the location and nature of the fire (if
                      known), the status of the evacuation, any persons unaccounted for, and the
                      location of hazardous materials or processes within the building.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Debrief:</strong> Participate in a post-incident
                      debrief to review what happened, what went well, what could be improved, and
                      whether any changes are needed to the fire emergency plan, evacuation
                      procedures, or fire marshal arrangements.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 — Training Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Training Requirements
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>RRFSO Article 21</strong> requires the responsible person to ensure that
                employees are provided with adequate safety training. For fire marshals, this
                training must be more comprehensive than the general fire awareness training
                provided to all staff, because fire marshals take on additional responsibilities
                that require specific knowledge and practical skills.
              </p>

              {/* Initial Training */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Initial Fire Marshal Training (Typically Half Day)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Initial fire marshal training should cover the following topics as a minimum:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire awareness:</strong> The fire triangle,
                      classes of fire, how fire develops and spreads, and the behaviour of smoke in
                      buildings. Understanding fire behaviour is fundamental to making safe decisions
                      during an emergency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">RRFSO basics:</strong> The structure and key
                      requirements of the Regulatory Reform (Fire Safety) Order 2005, the role of
                      the responsible person, the concept of competent persons, and the duties
                      that apply specifically to fire marshals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire extinguisher use:</strong> Types of fire
                      extinguishers (water, foam, CO2, dry powder, wet chemical), which extinguisher
                      to use on which class of fire, and the correct technique for operating an
                      extinguisher safely. Practical hands-on training with live fire is strongly
                      recommended.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Evacuation procedures:</strong> The fire
                      emergency plan for the specific premises, escape routes, assembly points,
                      the fire marshal&rsquo;s sweep duties, assisting persons with disabilities,
                      and the procedures for reporting to the assembly point and liaising with the
                      fire service.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">PEEPs awareness:</strong> Understanding Personal
                      Emergency Evacuation Plans for persons with disabilities or mobility
                      impairments, including the use of evacuation chairs, refuges, and buddy
                      systems. Fire marshals must know which persons in their area have PEEPs and
                      what those plans require.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Refresher & Practical */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Annual Refresher Training</p>
                  <p className="text-sm text-white/80 mb-3">
                    Refresher training should be provided at least annually. It should cover:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Review of any changes to the premises, layout, or fire strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Lessons learned from fire drills, incidents, or near-misses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Updates to legislation or best practice guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Practical extinguisher training to maintain competence</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Practical Extinguisher Training</p>
                  <p className="text-sm text-white/80 mb-3">
                    While not explicitly mandated by the RRFSO, practical extinguisher training is
                    considered essential best practice for fire marshals:
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Live-fire exercises using controlled fire trays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Hands-on use of different extinguisher types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Safe approach techniques and escape route awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Decision-making: when to fight and when to evacuate</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Article 21 Requirements</p>
                </div>
                <p className="text-sm text-white/80">
                  Article 21 states that training must be provided{' '}
                  <strong className="text-white">during working hours</strong> and at{' '}
                  <strong className="text-white">no cost to the employee</strong>. It must be
                  repeated periodically and adapted to take account of any new or changed risks.
                  The responsible person must ensure that the training is adequate and effective —
                  this means it should be delivered by a competent trainer and assessed to confirm
                  that the fire marshal understands and can apply what they have learned.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 — Number & Distribution */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Number &amp; Distribution
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The number of fire marshals required is not fixed by legislation — it is{' '}
                <strong>risk-based</strong> and must be determined by the fire risk assessment. The
                assessment should consider the size and layout of the premises, the number and nature
                of the occupants, the level of fire risk, and the availability of fire marshals at
                all times including during absences, holidays, and shift changes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">General Guidance</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Minimum 1 per floor per 50 people:</strong> This
                      is the most widely cited ratio. For a floor with 120 occupants, a minimum of 3
                      fire marshals would be recommended — plus deputies to cover absences.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Cover for absences:</strong> Fire marshals take
                      holidays, fall ill, attend meetings off-site, and change shifts. Deputies must
                      be appointed and trained to ensure that fire marshal coverage is maintained at
                      all times the premises are occupied.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Night shifts and out-of-hours:</strong> Premises
                      occupied outside normal working hours must have fire marshal coverage during
                      those periods. Night shifts often have fewer staff, making it even more critical
                      that fire marshals are available and trained.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Named individuals:</strong> Fire marshals must be
                      named individuals with clearly defined areas of responsibility. A generic
                      instruction to &ldquo;someone on each floor&rdquo; is not acceptable — specific
                      persons must be identified and trained.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Visible identification:</strong> All fire
                      marshals should be identifiable to colleagues and visitors. This is typically
                      achieved through hi-vis tabards during emergencies and name boards or fire
                      action notices displayed in communal areas during normal operations.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Factors That May Increase the Ratio
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { label: 'Higher-Risk Premises', desc: 'Premises with significant fire hazards, complex processes, or flammable materials storage' },
                    { label: 'Complex Layouts', desc: 'Buildings with multiple wings, split levels, dead-end corridors, or limited escape routes' },
                    { label: 'Vulnerable Occupants', desc: 'Premises with elderly, disabled, or very young occupants who need additional evacuation assistance' },
                    { label: 'Public Access', desc: 'Premises open to the public where visitors are unfamiliar with the building layout and escape routes' },
                    { label: 'Sleeping Risk', desc: 'Hotels, hostels, care homes, and other premises where occupants may be asleep when a fire occurs' },
                    { label: 'Multi-Tenancy', desc: 'Buildings with multiple tenants where coordination between different organisations is required' },
                  ].map((factor, i) => (
                    <div key={i} className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                      <p className="text-xs font-bold text-rose-400 mb-1">{factor.label}</p>
                      <p className="text-xs text-white/70">{factor.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 — Relationship with Responsible Person */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Relationship with the Responsible Person
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The fire marshal acts <strong>on behalf of the responsible person</strong> but the
                responsible person retains the ultimate legal duty for fire safety. This
                relationship is fundamental to understanding the fire marshal&rsquo;s authority and
                limitations within the fire safety management structure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Principles</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Legal duty stays with the RP:</strong> The
                      responsible person cannot delegate their legal duty for fire safety by
                      appointing fire marshals. If a fire safety failing leads to prosecution, it is
                      the responsible person (and potentially other duty holders) who face legal
                      action — not the fire marshal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Clear delegation:</strong> The specific duties
                      delegated to the fire marshal must be clearly defined in writing. The fire
                      marshal must understand exactly what they are responsible for, what authority
                      they have to take action, and what must be escalated to the responsible person
                      or facilities management.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Regular meetings:</strong> Fire marshals should
                      meet regularly with the responsible person (or their representative) to discuss
                      fire safety matters, review inspection findings, plan fire drills, and address
                      any concerns or resource requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Feedback on hazards:</strong> The fire marshal
                      is the responsible person&rsquo;s eyes and ears on the ground. They must have a
                      clear, direct reporting line for fire safety hazards and deficiencies. When a
                      fire marshal reports a hazard, the responsible person must act on it promptly —
                      failure to do so undermines the entire fire safety management system and may
                      constitute a breach of the RRFSO.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Resources and support:</strong> The responsible
                      person must provide fire marshals with the time, equipment, training, and
                      authority they need to carry out their duties effectively. A fire marshal
                      appointment that exists only on paper — without adequate training and
                      resources — does not satisfy the requirements of the RRFSO.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-amber-300">
                  <strong>Practical Tip:</strong> If you are appointed as a fire marshal and you
                  identify a fire safety hazard that is not addressed after you report it, you should
                  escalate the matter in writing. Document what you reported, when you reported it,
                  and to whom. If the hazard remains unresolved, consider whether it needs to be
                  escalated to senior management or, in extreme cases, reported to the local fire
                  and rescue service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07 — Equipment & Identification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Equipment &amp; Identification
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire marshals must have access to appropriate equipment to carry out their duties
                effectively during both routine inspections and emergency evacuations. They must also
                be readily identifiable to building occupants and the fire and rescue service.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Standard Equipment</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Identification</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          <strong className="text-white">Hi-vis tabard:</strong> A brightly coloured
                          tabard or vest clearly marked &ldquo;Fire Marshal&rdquo; — stored in an
                          accessible location that the fire marshal can reach quickly when the alarm
                          sounds
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          <strong className="text-white">Name boards:</strong> Lists of fire marshals
                          displayed in reception areas, fire action notices, and on each floor
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Communication</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          <strong className="text-white">Two-way radio:</strong> For communication
                          between fire marshals and the control point during evacuation — especially
                          important in large or multi-storey buildings
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          <strong className="text-white">Megaphone:</strong> For directing evacuees
                          at the assembly point, particularly in outdoor or noisy environments
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Inspection &amp; Sweep</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          <strong className="text-white">Torch:</strong> For checking dark areas
                          during sweeps and for use if the power fails during an evacuation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          <strong className="text-white">Clipboard and checklist:</strong> For
                          recording the results of routine inspections and for use at the assembly
                          point during evacuations
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Knowledge Requirements</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          Know the location of all fire extinguishers, manual call points, and fire
                          blankets in their area
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>
                          Know all escape routes and exits, including alternative routes, plus the
                          assembly point location
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08 — Routine Inspections */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">08</span>
            Routine Inspections
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regular routine inspections are a core part of the fire marshal&rsquo;s role. These
                inspections ensure that fire safety provisions are maintained in good working order
                between formal fire risk assessments and that any deficiencies are identified and
                resolved promptly.
              </p>

              {/* Weekly Checks */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Weekly Inspection Checklist</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The following items should be checked weekly as a minimum. All findings must be
                  recorded in writing and any deficiencies reported to the responsible person
                  immediately:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire doors:</strong> Check that all fire doors
                      close fully into their frames under the force of the self-closer. Check that
                      intumescent strips and smoke seals are intact. Verify that no fire doors are
                      propped open with wedges or other objects. Check that &ldquo;Fire Door — Keep
                      Shut&rdquo; signs are displayed and legible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Escape routes and exits:</strong> Walk all
                      escape routes to verify they are completely clear of obstructions, stored
                      materials, and tripping hazards. Check that all final exit doors can be opened
                      from the inside without a key. Verify that emergency lighting is operational
                      (visual check for LED indicators).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire extinguishers:</strong> Check that all
                      extinguishers are in their designated locations, that safety pins are intact,
                      that pressure gauges (where fitted) are in the green zone, and that there is no
                      visible damage or evidence of tampering or discharge.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Manual call points:</strong> Check that all
                      manual call points are unobstructed, clearly visible, and have not been
                      activated (glass intact). Verify that the access path to each call point is
                      clear.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire safety signage:</strong> Check that all
                      fire exit signs, fire action notices, fire door signs, and fire equipment signs
                      are in place, visible, clean, and not obscured by furniture, posters, or other
                      items.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">General housekeeping:</strong> Check for
                      accumulation of combustible waste, poor storage practices, flammable materials
                      left in escape routes, and any other housekeeping issues that increase fire
                      risk.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Monthly & Recording */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Monthly Checks</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Emergency lighting:</strong> Coordinate with
                        maintenance to verify that emergency lighting operates correctly during
                        the monthly brief discharge test (simulated mains failure)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Fire alarm system:</strong> Verify that the
                        weekly alarm test was carried out (different call point each week) and that
                        any faults have been reported and resolved
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Review PEEPs:</strong> Confirm that PEEPs
                        are current and that the persons named in them are aware of their
                        responsibilities
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardCheck className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Recording Findings</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Use a standardised inspection checklist for consistency and completeness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Record the date, time, inspector name, and all findings — both satisfactory
                        and deficient
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Retain records as evidence of compliance — they may be requested by the fire
                        and rescue service during an inspection or following an incident
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fire Marshal Responsibilities Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Fire Marshal Responsibilities</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <p className="text-sm text-white/60 mb-4 text-center">
              Fire marshal duties span three phases &mdash; before, during, and after an emergency
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Before */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Before</span>
                </div>
                <p className="text-xs font-semibold text-green-400 mb-2 text-center">Day-to-Day Prevention</p>
                <ul className="text-xs text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-green-400" />
                    <span>Fire prevention awareness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-green-400" />
                    <span>Report hazards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-green-400" />
                    <span>Check exits &amp; doors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-green-400" />
                    <span>Weekly inspections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-green-400" />
                    <span>Know emergency plan</span>
                  </li>
                </ul>
              </div>

              {/* During */}
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">During</span>
                </div>
                <p className="text-xs font-semibold text-rose-400 mb-2 text-center">Emergency Response</p>
                <ul className="text-xs text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Initiate evacuation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Sweep designated area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Assist persons needing help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Close doors behind</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Prevent re-entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Report at assembly point</span>
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">After</span>
                </div>
                <p className="text-xs font-semibold text-blue-400 mb-2 text-center">Post-Incident</p>
                <ul className="text-xs text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Head count at assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Report to fire service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Post-incident debrief</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Record findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Update emergency plan</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-white/50">
                Most of a fire marshal&rsquo;s time is spent in the &ldquo;Before&rdquo; phase &mdash;
                prevention and routine inspection are the foundation of effective fire safety management
              </p>
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-4-section-2">
              Evacuation Procedures
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
