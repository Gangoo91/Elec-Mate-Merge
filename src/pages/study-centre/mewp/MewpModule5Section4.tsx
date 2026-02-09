import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Shield,
  FileText,
  BarChart3,
  Search,
  Users,
  RefreshCw,
  Phone,
  Camera,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-riddor-reporting-time',
    question:
      'A worker suffers a fractured wrist after being struck by a MEWP boom. Under RIDDOR, within what timescale must this specified injury be reported online to the HSE?',
    options: ['Within 24 hours', 'Within 7 days', 'Within 10 days', 'Within 15 days'],
    correctIndex: 2,
    explanation:
      'Specified injuries (including fractures other than to fingers, thumbs, or toes) must be reported to the HSE online within 10 days of the incident. A fractured wrist is a specified injury under RIDDOR 2013. Deaths and dangerous occurrences must additionally be reported immediately by telephone.',
  },
  {
    id: 'mewp-investigation-root-cause',
    question:
      "During an accident investigation, the investigator asks 'Why?' five times to move beyond the surface cause. What is this technique called?",
    options: [
      'The Heinrich Method',
      'Root cause analysis (5 Whys technique)',
      'The RIDDOR protocol',
      'The IPAF incident review process',
    ],
    correctIndex: 1,
    explanation:
      "The '5 Whys' technique is a root cause analysis method. By repeatedly asking 'Why?' (typically five times), investigators move past the immediate or surface-level cause to identify the underlying root cause. For example: 'The MEWP overturned' — Why? 'The outrigger sank' — Why? 'No spreader pad was used' — Why? 'The operator was not trained on pad requirements' — Why? 'The training programme did not cover ground preparation.' The root cause is the training gap, not the overturn itself.",
  },
  {
    id: 'mewp-pdca-cycle',
    question:
      'The continuous improvement cycle used in safety management systems follows four stages. What is the correct order?',
    options: [
      'Check, Act, Plan, Do',
      'Do, Check, Plan, Act',
      'Plan, Do, Check, Act',
      'Act, Plan, Check, Do',
    ],
    correctIndex: 2,
    explanation:
      "The Plan-Do-Check-Act (PDCA) cycle, also known as the Deming Cycle, is the foundation of continuous improvement in safety management. Plan: identify hazards and set controls. Do: implement the plan. Check: monitor, review, and investigate incidents. Act: take corrective action and update the plan. Every incident and near miss feeds back into the 'Check' and 'Act' stages, driving ongoing improvement.",
  },
];

const faqs = [
  {
    question:
      "Who is the 'responsible person' for RIDDOR reporting — the operator or the employer?",
    answer:
      "The responsible person is almost always the employer (or the self-employed person, if applicable). The operator's duty is to report the incident to their employer or supervisor immediately, but the legal obligation to report to the HSE under RIDDOR falls on the employer. On construction sites, the principal contractor may be the responsible person depending on the contractual arrangements. If in doubt, report it — it is always better to report an incident that turns out not to be reportable than to fail to report one that is.",
  },
  {
    question: 'Are near misses reportable under RIDDOR?',
    answer:
      "No. Near misses are NOT reportable under RIDDOR unless they fall within the specific category of 'dangerous occurrences' listed in Schedule 2 of the Regulations. However, near misses are critically important and should ALWAYS be reported through your employer's internal reporting system. Near-miss data is the single most valuable source of information for preventing future accidents. Heinrich's Triangle shows that for every serious injury, there are approximately 600 near misses — each one is a warning that the safety system has a gap.",
  },
  {
    question:
      "What is the difference between a 'specified injury' and an 'over-7-day incapacitation' under RIDDOR?",
    answer:
      'A specified injury is a serious injury listed in the Regulations, such as a fracture (other than to fingers, thumbs, or toes), amputation, loss of sight, crush injury, scalping, burns covering more than 10% of the body, or loss of consciousness from head injury, asphyxia, or chemical exposure. These must be reported within 10 days. Over-7-day incapacitation applies when a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident) as a result of a work-related injury — but the injury is not on the specified injuries list. These must be reported within 15 days.',
  },
  {
    question: 'How does IPAF use accident data to improve MEWP safety across the industry?',
    answer:
      'IPAF collects, analyses, and publishes global MEWP accident data annually. This data is used to identify trends (such as the recent sharp increase in entrapment incidents), develop targeted safety campaigns, update training content, produce technical guidance notes, and lobby for regulatory improvements. The data is available to all stakeholders — manufacturers, hire companies, training providers, and operators — so that the entire industry can learn from incidents and near misses. IPAF also publishes safety bulletins and toolbox talks based on the latest data.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'After a MEWP incident, which of the following should you do FIRST?',
    options: [
      'Complete the RIDDOR online report form',
      'Move the MEWP to a safe storage area',
      'Make the area safe and provide first aid to any injured persons',
      'Take photographs of the damage to the machine',
    ],
    correctAnswer: 2,
    explanation:
      'The immediate priority after any incident is to make the area safe (isolate the machine, establish an exclusion zone) and provide first aid to anyone who is injured. RIDDOR reporting, photography, and machine relocation all come later. Moving the machine should NOT be done unless absolutely necessary for rescue, as the scene must be preserved for investigation.',
  },
  {
    id: 2,
    question: 'Under RIDDOR 2013, a work-related death must be reported to the HSE:',
    options: [
      'Online within 10 days only',
      'Immediately by telephone, then followed up online within 10 days',
      'Within 15 days by email',
      'Only if the HSE requests information',
    ],
    correctAnswer: 1,
    explanation:
      'Work-related deaths must be reported to the HSE immediately by telephone, and then followed up with an online report within 10 days. This dual reporting requirement ensures the HSE can begin its investigation without delay. The telephone number for reporting is the HSE Incident Contact Centre.',
  },
  {
    id: 3,
    question:
      "Which of the following is a MEWP-specific 'dangerous occurrence' that must be reported under RIDDOR?",
    options: [
      'A minor hydraulic fluid leak from a boom cylinder',
      'An operator forgetting to wear their hard hat',
      'Collapse or overturning of lifting equipment (including MEWPs)',
      'A flat tyre on a self-propelled scissor lift',
    ],
    correctAnswer: 2,
    explanation:
      'The collapse or overturning of any lifting equipment, including MEWPs, is classified as a dangerous occurrence under RIDDOR Schedule 2 and must be reported immediately by telephone, then online within 10 days. Minor defects such as fluid leaks or flat tyres, while important to address, are not dangerous occurrences unless they result in or could foreseeably have resulted in a serious incident.',
  },
  {
    id: 4,
    question:
      "According to Heinrich's Triangle, for every serious injury in the workplace, approximately how many near misses occur?",
    options: ['10', '100', '300', '600'],
    correctAnswer: 3,
    explanation:
      "Heinrich's Triangle (also known as the Safety Triangle or Accident Pyramid) estimates that for every 1 serious injury, there are approximately 10 minor injuries, 30 property-damage incidents, and 600 near misses. This is why near-miss reporting is so critically important — each near miss is a warning that the safety system has a gap that could lead to a serious incident.",
  },
  {
    id: 5,
    question: 'The primary purpose of an accident investigation is to:',
    options: [
      'Identify which individual was at fault and assign blame',
      'Satisfy the HSE inspector during a site visit',
      'Identify the root cause and prevent recurrence',
      'Calculate the cost of the damage for insurance purposes',
    ],
    correctAnswer: 2,
    explanation:
      'The primary purpose of any accident investigation is to identify the root cause of the incident and implement corrective actions to prevent it from happening again. Investigation is NOT about blame — it is about learning. If the investigation focuses on blame, people will be reluctant to report incidents and near misses, which undermines the entire safety management system.',
  },
  {
    id: 6,
    question:
      'According to 2024 IPAF data, which cause of MEWP fatalities has been INCREASING sharply?',
    options: [
      'Falls from the platform',
      'Electrocution',
      'Entrapment (crushing)',
      'Struck by falling objects',
    ],
    correctAnswer: 2,
    explanation:
      'IPAF 2024 data shows that entrapment (crushing) incidents have increased sharply — 75% more reports and 62% more deaths compared to the previous year. This is a concerning trend that the industry is actively working to address. In contrast, falls from the platform have been decreasing (44% fewer reports, 39% fewer deaths), which is a positive outcome of improved harness use and training. Overturn remains the top overall cause of MEWP fatalities.',
  },
  {
    id: 7,
    question:
      'After an incident investigation identifies that the method statement was inadequate, the CORRECT action under the PDCA cycle is to:',
    options: [
      'File the investigation report and take no further action',
      'Discipline the operator for not following the method statement',
      'Revise the method statement, retrain personnel, and update the risk assessment',
      'Wait for the HSE to issue an improvement notice before making changes',
    ],
    correctAnswer: 2,
    explanation:
      "Under the Plan-Do-Check-Act continuous improvement cycle, investigation findings (the 'Check' stage) must feed directly into corrective actions (the 'Act' stage). If the method statement was inadequate, it must be revised (updated plan), personnel must be retrained (updated 'Do'), and the risk assessment must be updated to reflect the new information. Waiting for the HSE or filing without action defeats the purpose of the investigation.",
  },
  {
    id: 8,
    question:
      'A worker is injured using a MEWP and is unable to work for 9 consecutive days (not counting the day of the accident). The injury is a soft tissue sprain, NOT a specified injury. Under RIDDOR, this must be reported:',
    options: [
      'Immediately by telephone',
      'Online within 10 days',
      'Online within 15 days',
      'It does not need to be reported under RIDDOR',
    ],
    correctAnswer: 2,
    explanation:
      'Over-7-day incapacitation (where the worker cannot perform their normal duties for more than 7 consecutive days, not counting the day of the accident) must be reported online within 15 days. Since the injury is a soft tissue sprain and not on the specified injuries list, it falls into the over-7-day category rather than the specified injury category (which has a 10-day reporting window).',
  },
];

export default function MewpModule5Section4() {
  useSEO({
    title: 'Post-Incident Procedures, RIDDOR & Lessons Learnt | MEWP Module 5.4',
    description:
      'Post-incident actions, RIDDOR reporting requirements, near-miss reporting, accident investigation, IPAF accident statistics, and lessons learnt for continuous improvement in MEWP operations.',
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
            <Link to="../mewp-module-5">
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
            <FileText className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 5 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Post-Incident Procedures, RIDDOR &amp; Lessons Learnt
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            What to do after a MEWP incident, how and when to report under RIDDOR, near-miss
            reporting, accident investigation, industry statistics, and how lessons learnt drive
            continuous safety improvement
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Immediate:</strong> Make safe, first aid, preserve the scene, record details
              </li>
              <li>
                <strong>RIDDOR:</strong> Deaths &amp; dangerous occurrences &mdash; phone
                immediately + online within 10 days
              </li>
              <li>
                <strong>Near misses:</strong> Report internally &mdash; they outnumber accidents
                600:1
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Investigate:</strong> Find the root cause, not just someone to blame
              </li>
              <li>
                <strong>Learn:</strong> Update risk assessments, retrain, share lessons
              </li>
              <li>
                <strong>Improve:</strong> Plan &rarr; Do &rarr; Check &rarr; Act &mdash; the safety
                cycle
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'List the immediate actions required after a MEWP incident',
              'Explain RIDDOR reporting requirements, categories, and timescales',
              "Describe the importance of near-miss reporting and Heinrich's Triangle",
              'Explain the purpose and process of accident investigation and root cause analysis',
              'Summarise key IPAF accident statistics and industry trends',
              'Apply the Plan-Do-Check-Act cycle to continuous safety improvement',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Immediate Post-Incident Actions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Immediate Post-Incident Actions
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After any MEWP incident &mdash; whether it is an accident, a near miss, or an
                equipment failure &mdash; there is a defined sequence of actions that must be
                followed. Getting these right protects people, preserves evidence, and ensures legal
                obligations are met.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">
                    Post-Incident Step-by-Step Procedure
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      step: 'Make the area safe',
                      detail:
                        'Isolate the machine (switch off, remove the key). Establish or extend an exclusion zone around the incident area. Prevent other workers from entering the danger zone.',
                    },
                    {
                      step: 'Provide first aid to any injured persons',
                      detail:
                        'Administer first aid within your level of competence. Do not move a seriously injured person unless they are in immediate danger (e.g. fire, further collapse).',
                    },
                    {
                      step: 'Call emergency services if needed (999)',
                      detail:
                        'If there are serious injuries, entrapment, or any risk to life, call 999 immediately. Provide the exact site location, nature of the incident, and number of casualties.',
                    },
                    {
                      step: 'Do NOT move the machine or disturb the scene',
                      detail:
                        'Unless it is absolutely necessary for rescue, do not move the MEWP, reposition equipment, or clear debris. The scene must be preserved exactly as it is for investigation.',
                    },
                    {
                      step: 'Secure the scene for investigation',
                      detail:
                        'Use barriers, tape, or signage to prevent access. Ensure nothing is removed, adjusted, or cleaned up until investigators have completed their work.',
                    },
                    {
                      step: 'Notify your employer/supervisor immediately',
                      detail:
                        'Contact your line manager, site supervisor, or employer as soon as possible. They are responsible for initiating the formal reporting and investigation process.',
                    },
                    {
                      step: 'Record details while fresh',
                      detail:
                        'Write down what happened, when, where, who was involved, what equipment was in use, what the weather conditions were, and who witnessed the event. Memory fades quickly — record details as soon as it is safe to do so.',
                    },
                    {
                      step: 'Take photographs if safe to do so',
                      detail:
                        'Photograph the machine position, ground conditions, exclusion zone, any damage, control panel settings, weather conditions, and the wider site context. Photographs are invaluable evidence during investigation.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.step}</p>
                        <p className="text-sm text-white/70 mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Rule</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Never move the machine or disturb the scene
                  </strong>{' '}
                  unless it is necessary to rescue an injured person or prevent further danger.
                  Moving equipment, cleaning up debris, or repositioning barriers before the
                  investigation is complete can destroy evidence and may constitute an offence under
                  health and safety legislation.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-400 mb-1">Priority 1</p>
                  <p className="text-xs text-white/70">
                    People &mdash; first aid and emergency services
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <Search className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-amber-400 mb-1">Priority 2</p>
                  <p className="text-xs text-white/70">
                    Scene &mdash; secure and preserve evidence
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <Camera className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-400 mb-1">Priority 3</p>
                  <p className="text-xs text-white/70">Record &mdash; details, photos, witnesses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: RIDDOR Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RIDDOR Reporting
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{' '}
                <strong>
                  Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013
                  (RIDDOR)
                </strong>{' '}
                require certain work-related accidents, injuries, and dangerous occurrences to be
                reported to the Health and Safety Executive (HSE). RIDDOR applies to all
                work-related accidents, and the report must be made by the{' '}
                <strong>responsible person</strong> &mdash; usually the employer.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The responsible person
                  for RIDDOR reporting is almost always the <strong>employer</strong>, not the
                  individual operator. The operator&rsquo;s duty is to report the incident to their
                  employer immediately &mdash; the employer then makes the formal report to the HSE.
                </p>
              </div>

              {/* RIDDOR Reporting Table */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-x-auto">
                <p className="text-sm font-medium text-elec-yellow mb-4">
                  RIDDOR Reporting Categories &amp; Timescales
                </p>
                <div className="min-w-[500px]">
                  <div className="grid grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden">
                    {/* Header Row */}
                    <div className="bg-white/10 p-3">
                      <p className="text-xs font-semibold text-white">Category</p>
                    </div>
                    <div className="bg-white/10 p-3">
                      <p className="text-xs font-semibold text-white">Immediate Action</p>
                    </div>
                    <div className="bg-white/10 p-3">
                      <p className="text-xs font-semibold text-white">Online Report</p>
                    </div>

                    {/* Deaths */}
                    <div className="bg-red-500/10 p-3">
                      <p className="text-sm font-medium text-red-300">Deaths</p>
                    </div>
                    <div className="bg-red-500/5 p-3">
                      <p className="text-sm text-white/80">Report immediately by phone</p>
                    </div>
                    <div className="bg-red-500/5 p-3">
                      <p className="text-sm text-white/80">Within 10 days</p>
                    </div>

                    {/* Specified Injuries */}
                    <div className="bg-orange-500/10 p-3">
                      <p className="text-sm font-medium text-orange-300">Specified Injuries</p>
                    </div>
                    <div className="bg-orange-500/5 p-3">
                      <p className="text-sm text-white/80">&mdash;</p>
                    </div>
                    <div className="bg-orange-500/5 p-3">
                      <p className="text-sm text-white/80">Within 10 days</p>
                    </div>

                    {/* Over-7-Day Incapacitation */}
                    <div className="bg-amber-500/10 p-3">
                      <p className="text-sm font-medium text-amber-300">
                        Over-7-Day Incapacitation
                      </p>
                    </div>
                    <div className="bg-amber-500/5 p-3">
                      <p className="text-sm text-white/80">&mdash;</p>
                    </div>
                    <div className="bg-amber-500/5 p-3">
                      <p className="text-sm text-white/80">Within 15 days</p>
                    </div>

                    {/* Non-fatal to Non-Workers */}
                    <div className="bg-blue-500/10 p-3">
                      <p className="text-sm font-medium text-blue-300">
                        Non-Fatal to Non-Workers (Public)
                      </p>
                    </div>
                    <div className="bg-blue-500/5 p-3">
                      <p className="text-sm text-white/80">&mdash;</p>
                    </div>
                    <div className="bg-blue-500/5 p-3">
                      <p className="text-sm text-white/80">Within 10 days</p>
                    </div>

                    {/* Dangerous Occurrences */}
                    <div className="bg-purple-500/10 p-3">
                      <p className="text-sm font-medium text-purple-300">Dangerous Occurrences</p>
                    </div>
                    <div className="bg-purple-500/5 p-3">
                      <p className="text-sm text-white/80">Report immediately by phone</p>
                    </div>
                    <div className="bg-purple-500/5 p-3">
                      <p className="text-sm text-white/80">Within 10 days</p>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-white/40 mt-3">
                  &ldquo;Non-fatal to non-workers&rdquo; means a member of the public injured in a
                  work-related incident who requires hospital treatment.
                </p>
              </div>

              {/* Specified Injuries List */}
              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Specified Injuries (Report Within 10 Days)
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  {[
                    'Fractures (other than to fingers, thumbs, or toes)',
                    'Amputation of an arm, hand, finger, thumb, leg, foot, or toe',
                    'Permanent loss of sight or reduction of sight',
                    'Crush injury leading to internal organ damage',
                    'Scalping (separation of skin from the head) requiring hospital treatment',
                    'Burns covering more than 10% of the body, or damage to eyes, respiratory system, or vital organs',
                    'Hypothermia or heat-induced illness requiring resuscitation or hospital admission',
                    'Loss of consciousness from head injury, asphyxia, or chemical/biological agent exposure',
                  ].map((injury, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>{injury}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MEWP-Specific Dangerous Occurrences */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-300 mb-2">
                  MEWP-Specific Dangerous Occurrences
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The following are particularly relevant to MEWP operations and must be reported
                  immediately by phone, then online within 10 days:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Collapse or overturning of lifting equipment
                      </strong>{' '}
                      &mdash; including MEWPs tipping over or structural failure of the boom,
                      platform, or chassis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Failure of load-bearing parts</strong> &mdash;
                      including boom sections, turntable bearings, outrigger legs, platform support
                      structures, or hydraulic cylinders
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> Over-7-day incapacitation
                  means the worker cannot perform their normal duties for more than 7 consecutive
                  days <strong>not counting the day of the accident</strong>. The reporting deadline
                  is 15 days from the date of the accident, not from the date the 7-day threshold is
                  reached.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Near-Miss Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Near-Miss Reporting
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A near miss is an event that{' '}
                <strong>could have resulted in injury but did not</strong>. Near misses are{' '}
                <strong>NOT reportable under RIDDOR</strong> (unless they qualify as a
                &ldquo;dangerous occurrence&rdquo;), but they are critically important to workplace
                safety. Every near miss is a warning &mdash; a signal that something in the safety
                system has failed or is failing.
              </p>

              <div className="bg-white/5 border border-teal-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-300 mb-3">MEWP Near-Miss Examples</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>
                      An outrigger begins sinking into soft ground, but the operator notices and
                      lowers the platform before the machine overturns
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>
                      The platform passes close to an overhead power line, but no contact is made
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>
                      A sudden wind gust causes the platform to sway significantly, but the operator
                      is wearing a harness and does not fall
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                    <span>A tool falls from the platform but nobody is in the drop zone below</span>
                  </li>
                </ul>
              </div>

              {/* Heinrich's Triangle */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Heinrich&rsquo;s Triangle &mdash; The Safety Pyramid
                </p>
                <div className="flex flex-col items-center space-y-1 max-w-xs mx-auto">
                  {/* Top: 1 Serious Injury */}
                  <div className="w-[30%] bg-red-500/30 border border-red-500/50 rounded-t-lg p-2 text-center">
                    <p className="text-red-300 text-lg font-bold">1</p>
                    <p className="text-[10px] text-white/70">Serious Injury</p>
                  </div>
                  {/* Middle: 10 Minor Injuries */}
                  <div className="w-[50%] bg-orange-500/20 border border-orange-500/40 p-2 text-center">
                    <p className="text-orange-300 text-lg font-bold">10</p>
                    <p className="text-[10px] text-white/70">Minor Injuries</p>
                  </div>
                  {/* Lower: 30 Property Damage */}
                  <div className="w-[70%] bg-amber-500/15 border border-amber-500/30 p-2 text-center">
                    <p className="text-amber-300 text-lg font-bold">30</p>
                    <p className="text-[10px] text-white/70">Property Damage</p>
                  </div>
                  {/* Base: 600 Near Misses */}
                  <div className="w-full bg-elec-yellow/10 border border-elec-yellow/30 rounded-b-lg p-3 text-center">
                    <p className="text-elec-yellow text-2xl font-bold">600</p>
                    <p className="text-xs text-white/70">Near Misses</p>
                  </div>
                </div>
                <p className="text-[11px] text-white/40 text-center mt-3">
                  For every 1 serious injury, there are approximately 600 near misses. Each near
                  miss is an opportunity to prevent a future accident.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">
                  Why Near-Miss Reporting Matters
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      Near-miss data identifies trends{' '}
                      <strong className="text-white">BEFORE accidents happen</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>Every employer should have an internal near-miss reporting system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      A culture of reporting must be encouraged &mdash;{' '}
                      <strong className="text-white">no blame for reporting</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0" />
                    <span>
                      If people are afraid to report, the safety system is blind to its own failures
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Accident Investigation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Accident Investigation
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The purpose of accident investigation is to <strong>identify the root cause</strong>{' '}
                of the incident and <strong>prevent recurrence</strong> &mdash; not to assign blame
                to individuals. If investigations focus on blame, workers will stop reporting
                incidents and near misses, and the safety system loses its ability to learn and
                improve.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    What the Investigation Should Establish
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'What happened — the full sequence of events',
                    'Who was involved — operators, ground crew, others',
                    'What equipment was in use — type, condition, age',
                    'What were the conditions — weather, ground, traffic',
                    'What procedures were in place — risk assessment, method statement',
                    'Were procedures followed — or were shortcuts taken?',
                    'What training had been provided — was it adequate?',
                    'Was the machine in good condition — pre-use checks, maintenance records',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Root Cause Analysis - 5 Whys */}
              <div className="bg-white/5 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-300 mb-3">
                  Root Cause Analysis &mdash; The &ldquo;5 Whys&rdquo; Technique
                </p>
                <p className="text-sm text-white/80 mb-4">
                  Ask &ldquo;Why?&rdquo; repeatedly (typically five times) to move beyond the
                  surface cause and identify the underlying root cause:
                </p>
                <div className="space-y-2">
                  {[
                    {
                      why: 'The MEWP overturned.',
                      answer: 'Because the outrigger sank into the ground.',
                    },
                    {
                      why: 'The outrigger sank into the ground.',
                      answer: 'Because no spreader pad was used.',
                    },
                    {
                      why: 'No spreader pad was used.',
                      answer: 'Because the operator did not know spreader pads were required.',
                    },
                    {
                      why: 'The operator did not know pads were required.',
                      answer: 'Because the training programme did not cover ground preparation.',
                    },
                    {
                      why: 'The training did not cover ground preparation.',
                      answer:
                        'Because the training syllabus had not been updated to include current IPAF guidance.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm text-white/60 italic">Why? {item.why}</p>
                        <p className="text-sm text-white/80">&rarr; {item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">Root cause:</strong> Outdated training
                    syllabus &mdash; not the overturn itself, and not the individual operator. The
                    corrective action is to update the training programme and retrain all operators.
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Investigation findings
                  must lead to <strong>corrective actions</strong>. An investigation report that
                  sits in a filing cabinet and changes nothing is a waste of the effort that went
                  into it. Every finding should result in a specific, measurable action with an
                  owner and a deadline.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: IPAF Accident Statistics & Trend Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            IPAF Accident Statistics &amp; Trend Analysis (2024 Data)
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                IPAF collects and publishes global MEWP accident data annually. Understanding these
                statistics helps the industry identify trends, target interventions, and measure the
                effectiveness of safety improvements. The 2024 data shows both positive progress and
                areas of serious concern.
              </p>

              {/* Key Statistics Summary Box */}
              <div className="bg-white/5 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    2024 Global MEWP Fatality Summary
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-white">100</p>
                    <p className="text-[11px] text-white/60">Fatalities Globally</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-400">&darr; 26%</p>
                    <p className="text-[11px] text-white/60">Decrease from 2023</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-[11px] text-white/60">Countries Reporting</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-400">&uarr; 75%</p>
                    <p className="text-[11px] text-white/60">Entrapment Reports Up</p>
                  </div>
                </div>
              </div>

              {/* Top Causes */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Top Causes of MEWP Fatalities (2024)
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-white/80">1. Overturn</p>
                      <p className="text-xs text-white/60">
                        Consistently top cause over past decade
                      </p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-white/80">2. Entrapment (crushing)</p>
                      <p className="text-xs text-red-400 font-medium">INCREASING sharply</p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-white/80">3. Falls from platform</p>
                      <p className="text-xs text-green-400 font-medium">DECREASING</p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '55%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trends Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Positive Trends</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>
                        Falls from platform:{' '}
                        <strong className="text-green-300">44% fewer reports</strong>,{' '}
                        <strong className="text-green-300">39% fewer deaths</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Overall fatalities down 26% from 2023</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Improved harness use and training showing results</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Areas of Concern</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Entrapment: <strong className="text-red-300">75% more reports</strong>,{' '}
                        <strong className="text-red-300">62% more deaths</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Overturn consistently the top cause over the past decade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Electrical work sector: 15.4% of incidents</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Country & Sector Breakdown */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">Reports by Country</p>
                  <div className="space-y-2">
                    {[
                      { country: 'USA', pct: '31%' },
                      { country: 'United Kingdom', pct: '12%' },
                      { country: 'South Korea', pct: '12%' },
                      { country: 'Other (9 countries)', pct: '45%' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-white/80">{row.country}</span>
                        <span className="text-white/60 text-xs font-mono">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">Industry Sectors</p>
                  <div className="space-y-2">
                    {[
                      { sector: 'Facilities Management', pct: '27.0%' },
                      { sector: 'Construction', pct: '19.2%' },
                      { sector: 'Electrical Work', pct: '15.4%' },
                      { sector: 'Other Sectors', pct: '38.4%' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-white/80">{row.sector}</span>
                        <span className="text-white/60 text-xs font-mono">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Machine Types in Falls */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Machine Types Involved in Falls from Platform
                </p>
                <div className="space-y-2">
                  {[
                    {
                      type: '3B — Scissor lift (self-propelled)',
                      pct: 38,
                    },
                    {
                      type: '1B — Vehicle-mounted boom',
                      pct: 27,
                    },
                    {
                      type: '3A — Boom lift (self-propelled)',
                      pct: 19,
                    },
                    {
                      type: 'Other MEWP categories',
                      pct: 16,
                    },
                  ].map((row, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-white/80">{row.type}</p>
                        <p className="text-xs text-white/60 font-mono">{row.pct}%</p>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div
                          className="bg-elec-yellow/70 h-1.5 rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Takeaway:</strong> As an electrician, you
                  are in one of the top three sectors for MEWP incidents (15.4% of all reports). The
                  sharp increase in entrapment deaths should be a particular concern &mdash; always
                  maintain awareness of crushing hazards between the platform and fixed structures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Lessons Learnt and Continuous Improvement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Lessons Learnt &amp; Continuous Improvement
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every incident and every near miss must feed back into the safety management system.
                If lessons are identified but not acted upon, the same incidents will keep
                happening. The goal is a cycle of continuous improvement &mdash; each event makes
                the system safer for the next operation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Feeding Lessons Back Into the System
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    'Update risk assessments based on investigation findings',
                    'Revise method statements if existing procedures were inadequate',
                    'Retrain personnel if competence gaps are identified',
                    'Share lessons across the organisation through toolbox talks and safety alerts',
                    'Review and update the rescue plan if the emergency response was inadequate',
                    'Stay current with IPAF safety bulletins and accident reports',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PDCA Cycle */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  The Safety Cycle &mdash; Plan &rarr; Do &rarr; Check &rarr; Act (PDCA)
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  <div className="bg-blue-500/15 border border-blue-500/30 p-4 rounded-lg text-center">
                    <p className="text-blue-300 text-lg font-bold mb-1">Plan</p>
                    <p className="text-[11px] text-white/70">
                      Identify hazards, assess risks, set controls, write method statements
                    </p>
                  </div>
                  <div className="bg-green-500/15 border border-green-500/30 p-4 rounded-lg text-center">
                    <p className="text-green-300 text-lg font-bold mb-1">Do</p>
                    <p className="text-[11px] text-white/70">
                      Implement controls, train personnel, carry out operations safely
                    </p>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/30 p-4 rounded-lg text-center">
                    <p className="text-amber-300 text-lg font-bold mb-1">Check</p>
                    <p className="text-[11px] text-white/70">
                      Monitor, inspect, report near misses, investigate incidents
                    </p>
                  </div>
                  <div className="bg-red-500/15 border border-red-500/30 p-4 rounded-lg text-center">
                    <p className="text-red-300 text-lg font-bold mb-1">Act</p>
                    <p className="text-[11px] text-white/70">
                      Take corrective action, update plans, retrain, share lessons learnt
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <RefreshCw className="h-6 w-6 text-white/30" />
                </div>
                <p className="text-[11px] text-white/40 text-center mt-1">
                  The cycle repeats continuously &mdash; every incident feeds back into improved
                  planning
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Practical Summary</p>
                <div className="space-y-2">
                  {[
                    'After every incident or near miss: record, report, investigate, and act',
                    'Update risk assessments and method statements — do not wait for the next project',
                    'Retrain all affected personnel — not just the individual involved',
                    'Share lessons through toolbox talks, safety alerts, and team briefings',
                    'Review the rescue plan — did it work? If not, revise it now',
                    "Check IPAF safety bulletins regularly — learn from others' incidents too",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> Safety is not a
                  destination &mdash; it is a continuous journey. The PDCA cycle never stops. Every
                  incident, every near miss, every inspection, and every toolbox talk is an
                  opportunity to make the next operation safer than the last. The best organisations
                  do not wait for accidents to happen before improving &mdash; they actively seek
                  out weaknesses and fix them proactively.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-6">
              Next: Module 6 &mdash; Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
