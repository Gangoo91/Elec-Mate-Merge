import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Radio,
  Truck,
  Users,
  ClipboardCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'traffic-chapter8',
    question:
      'A MEWP operation is planned adjacent to a public highway. The traffic management plan includes cones and signs but no Chapter 8 signage. Is this acceptable?',
    options: [
      'Yes — cones and signs are sufficient for any road',
      'No — Chapter 8 signage is required for works on or adjacent to public highways',
      'Only if the local authority grants a waiver',
      'Yes — Chapter 8 only applies to motorways',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 8 of the Traffic Signs Manual sets out the requirements for signing, lighting, and guarding at road works on all public highways — not just motorways. Any MEWP operation on or adjacent to a public highway must comply with Chapter 8 requirements, which specify sign types, sizes, and placement distances.',
  },
  {
    id: 'comms-emergency-signal',
    question:
      'During a MEWP operation, the banksman spots a serious hazard and needs to signal the operator to stop immediately. The two-way radio has failed. What is the correct emergency hand signal?',
    options: [
      'One arm raised with a closed fist',
      'Both arms waving above the head',
      'Thumbs down with both hands',
      'Pointing repeatedly at the hazard',
    ],
    correctIndex: 1,
    explanation:
      'The universally recognised emergency stop signal is both arms waving above the head. This signal means STOP ALL OPERATIONS IMMEDIATELY. All personnel involved in MEWP operations must know this signal, and it must be agreed during the pre-operation briefing. It is deliberately exaggerated so it can be seen clearly from a distance.',
  },
  {
    id: 'checklist-order',
    question:
      'A MEWP operator has completed the work and lowered the platform. He begins to remove the exclusion zone barriers while the boom is still extended. What is wrong with this sequence?',
    options: [
      'Nothing — the platform is lowered so it is safe to remove barriers',
      'The exclusion zone must only be removed after the machine is fully stowed (boom retracted, outriggers retracted)',
      'Barriers should be removed before lowering the platform',
      'Only the banksman is allowed to remove barriers',
    ],
    correctIndex: 1,
    explanation:
      'The exclusion zone must remain in place until the MEWP is fully stowed — boom retracted, scissor lowered, outriggers retracted. An extended boom still poses a hazard even with the platform lowered, as sudden movement or hydraulic failure could cause the boom to swing or collapse. The safe operation checklist requires full stowage before barrier removal.',
  },
];

const faqs = [
  {
    question: 'How large should the exclusion zone around a MEWP be?',
    answer:
      'A recommended minimum of 10 metres radius around the MEWP where practical, though this must be assessed based on the specific machine and operation. For boom-type MEWPs, the exclusion zone must account for the full arc of movement — meaning the zone may need to be significantly larger than 10 metres in some directions. The zone must encompass the area beneath the platform at all positions and the travel path if the MEWP will be repositioned during the operation.',
  },
  {
    question: 'Does every MEWP operation require a banksman?',
    answer:
      'Not every operation requires a banksman, but one must be appointed whenever the risk assessment identifies the need — which is the majority of situations. A banksman is typically required when: the MEWP operates near pedestrians or vehicle routes, the operator has restricted visibility, the machine needs to be repositioned during the operation, or the site has other plant or workers in the vicinity. In practice, having a trained ground person who can act as banksman is considered best practice for all but the most straightforward operations.',
  },
  {
    question: 'What training does a banksman need for MEWP operations?',
    answer:
      "A banksman must be trained and competent in: the specific hand signals to be used during the operation, the duties and responsibilities of the role, the type of MEWP being used, the site-specific hazards and emergency procedures, and the exclusion zone requirements. IPAF offers a specific 'MEWP Demonstrator' course, and many construction sites require CPCS or NPORS banksman/slinger signaller training. At minimum, the banksman must have received a site-specific briefing and demonstrated understanding of the agreed signals.",
  },
  {
    question: 'Who is responsible for loading and unloading MEWPs from transport vehicles?',
    answer:
      'Only competent persons should load and unload MEWPs. This is typically the delivery driver (who should hold an IPAF PAL card for the relevant category) or a site operative with the appropriate training and experience. The key requirement is competence — the person must understand the specific machine, the loading procedure, and the hazards involved. Approximately one third of rental company-reported MEWP accidents occur during delivery and collection, making this one of the highest-risk phases of any MEWP operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the recommended minimum radius for an exclusion zone around a MEWP where practical?',
    options: ['5 metres', '10 metres', '15 metres', '20 metres'],
    correctAnswer: 1,
    explanation:
      'The recommended minimum exclusion zone is 10 metres radius around the MEWP where practical. This zone prevents persons entering the fall zone beneath the platform, prevents collision between the MEWP and pedestrians or vehicles, and prevents injury from falling objects. The actual zone may need to be larger depending on the machine type and operation.',
  },
  {
    id: 2,
    question:
      'Which document sets out the signage requirements for MEWP operations on or adjacent to public highways?',
    options: [
      'The Highway Code',
      'Chapter 8 of the Traffic Signs Manual',
      'The Construction (Design and Management) Regulations 2015',
      'The Work at Height Regulations 2005',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 8 of the Traffic Signs Manual (published by the Department for Transport) sets out the requirements for signing, lighting, and guarding at road works. It specifies the types, sizes, and placement distances of signs required for any works on or adjacent to public highways, including MEWP operations.',
  },
  {
    id: 3,
    question:
      'A banksman on a MEWP operation is seen checking his mobile phone while the MEWP is elevated. What action should be taken?',
    options: [
      'No action — he can multitask as long as the operator is experienced',
      'Ask him to put his phone on silent',
      'Stop the operation immediately — the banksman must not be distracted while on duty',
      'Wait until the next break to remind him of the rules',
    ],
    correctAnswer: 2,
    explanation:
      'A banksman must NOT use a mobile phone or be distracted while on duty. Their role requires constant vigilance — monitoring the exclusion zone, maintaining communication with the operator, and being ready to halt operations if conditions become unsafe. If the banksman is distracted, the operation must stop immediately until a competent, attentive banksman is in place.',
  },
  {
    id: 4,
    question: "What is the correct emergency hand signal for 'STOP ALL OPERATIONS IMMEDIATELY'?",
    options: [
      'One arm raised with a closed fist',
      'Flat palm facing the operator',
      'Both arms waving above the head',
      'Arms crossed in an X shape',
    ],
    correctAnswer: 2,
    explanation:
      "The emergency stop signal is both arms waving above the head. This deliberately exaggerated signal is universally recognised and can be seen clearly from a distance. It means stop all operations immediately. The flat palm facing the operator is the normal 'stop' signal for routine positioning.",
  },
  {
    id: 5,
    question:
      'Approximately what proportion of rental company-reported MEWP accidents occur during delivery and collection?',
    options: ['One tenth', 'One quarter', 'One third', 'One half'],
    correctAnswer: 2,
    explanation:
      'Approximately one third of rental company-reported MEWP accidents occur during delivery and collection (loading and unloading). This makes it one of the highest-risk phases of any MEWP operation, which is why strict controls are required: firm level ground, suitable ramps, clear exclusion zones, competent persons only, and clear communication between the loader and the transport vehicle driver.',
  },
  {
    id: 6,
    question:
      'Before removing the exclusion zone at the end of a MEWP operation, which condition must be met?',
    options: [
      'The platform must be lowered to ground level',
      'The operator must have exited the platform',
      'The machine must be fully stowed — boom retracted, platform lowered, outriggers retracted',
      'The site supervisor must give verbal permission',
    ],
    correctAnswer: 2,
    explanation:
      'The exclusion zone must only be removed after the MEWP is fully stowed: boom retracted, scissor lowered, platform at ground level, and outriggers retracted. An extended boom or deployed outriggers still present hazards even when the platform is lowered. The safe operation checklist requires full stowage and a post-use inspection before barriers are removed.',
  },
  {
    id: 7,
    question: 'Which of the following is NOT a duty of the banksman during MEWP operations?',
    options: [
      'Guiding the operator using agreed hand signals',
      'Operating the MEWP ground-level controls on behalf of the platform operator',
      'Enforcing the exclusion zone and keeping the area clear',
      'Halting operations if conditions become unsafe',
    ],
    correctAnswer: 1,
    explanation:
      "The banksman's role is to guide, communicate, and enforce safety — not to operate the MEWP controls. Operating the ground-level controls is the responsibility of a trained operator or, in an emergency rescue, a person specifically trained in the rescue procedure. The banksman must remain focused on their signalling and zone enforcement duties at all times.",
  },
  {
    id: 8,
    question: 'During loading of a MEWP onto a transport vehicle, where must no person stand?',
    options: [
      'On the transport vehicle',
      'Behind the MEWP',
      'Between the MEWP and the transport vehicle',
      'More than 5 metres from the loading area',
    ],
    correctAnswer: 2,
    explanation:
      'No person must ever stand between the MEWP and the transport vehicle during loading or unloading. This is a crush zone — if the MEWP moves unexpectedly (brake failure, hydraulic fault, or operator error), anyone caught between the machine and the vehicle could suffer fatal crush injuries. All personnel must remain outside the designated exclusion zone around the loading area.',
  },
];

export default function MewpModule4Section4() {
  useSEO({
    title: 'Exclusion Zones, Traffic Management & Banksman Duties | MEWP Module 4.4',
    description:
      'Learn how to establish exclusion zones, manage traffic around MEWP operations, understand banksman duties and hand signals, communication methods, and loading/unloading safety procedures.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <ShieldAlert className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 4 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Exclusion Zones, Traffic Management &amp; Banksman Duties
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Controlling the area around MEWP operations to protect operators, ground personnel, and
            the public
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Exclusion zones:</strong> 10m minimum radius — barriers, signage,
                    banksman enforcement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Traffic management:</strong> Chapter 8 on public roads, one-way systems
                    on site.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Banksman:</strong> Trained, identifiable, present throughout,
                    undistracted.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Communication:</strong> Pre-agreed hand signals, two-way radio, visual
                    contact.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Loading/unloading:</strong> One third of rental accidents — competent
                    persons only.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Checklist:</strong> Before, during, after — systematic approach every
                    time.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Before starting:</strong> Set up exclusion zone, brief banksman, agree
                    signals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>During operation:</strong> Banksman enforces zone, maintains comms with
                    operator.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Emergency:</strong> Both arms waving above head = STOP IMMEDIATELY.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>After:</strong> Fully stow machine before removing exclusion zone.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                Explain the purpose of exclusion zones and describe how to establish and maintain
                them
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                Describe traffic management requirements for MEWP operations on public highways and
                site roads
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                List the duties, requirements, and responsibilities of a banksman/spotter during
                MEWP operations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                Demonstrate knowledge of standard hand signals and communication methods used in
                MEWP work
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                Identify the hazards and controls associated with loading and unloading MEWPs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply a systematic before/during/after checklist for safe MEWP operations</span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Establishing Exclusion Zones */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Establishing Exclusion Zones
            </h2>
            <div className="space-y-4 text-white">
              <p>
                An exclusion zone is a controlled area around a MEWP operation where access is
                restricted to authorised personnel only. The recommended minimum radius is{' '}
                <strong>10 metres</strong> around the MEWP where practical, though the actual zone
                must be determined by the risk assessment based on the specific machine and
                operation.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">
                  Purpose of the Exclusion Zone
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prevent persons entering the fall zone</strong> beneath the platform —
                      objects dropped or dislodged from the platform could strike anyone below
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prevent collision</strong> between the MEWP and pedestrians or
                      vehicles — particularly during travel or slewing of boom-type machines
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Prevent injury from falling objects</strong> — tools, materials,
                      fasteners, and debris can fall from height and cause serious or fatal injuries
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  Methods of Establishing an Exclusion Zone
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-1">Physical Barriers</h4>
                    <ul className="text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Heras fencing — provides a solid, visible barrier that cannot be easily
                          moved
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Water-filled barriers — heavy enough to resist casual displacement, highly
                          visible
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Cones and chain — lighter option for lower-risk environments, less robust
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Signage</h4>
                    <ul className="text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>"Danger — overhead work" signs at all entry points to the zone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>"No entry — authorised personnel only" signs on barriers</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Banksman Enforcement</h4>
                    <p className="text-white/80">
                      A trained banksman physically present to prevent unauthorised entry and direct
                      pedestrians and vehicles away from the zone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  The Exclusion Zone Must Account For
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The full arc of movement</strong> of boom-type MEWPs — the boom can
                      slew through 360 degrees and extend to its maximum reach in any direction
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The area beneath the platform at all positions</strong> — as the boom
                      moves, the fall zone beneath the platform changes, and the exclusion zone must
                      cover every potential position
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The travel path</strong> if the MEWP will be repositioned during the
                      operation — the zone must extend along the entire route of travel
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Zone Must Be Maintained Throughout</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The exclusion zone must be maintained for the{' '}
                  <strong className="text-white">entire duration</strong> of the MEWP operation —
                  from the moment the machine is positioned to the moment it is fully stowed (boom
                  retracted, platform lowered, outriggers retracted). Barriers must not be moved or
                  removed to allow vehicles or pedestrians to pass. If the zone is breached,
                  operations must stop until the zone is re-established and secure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Traffic Management */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Traffic Management
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Traffic management is required whenever a MEWP operates near vehicle routes —
                whether on public highways, site roads, car parks, or private access roads. The
                purpose is to separate the MEWP operation from moving vehicles and to protect
                operators, ground personnel, and road users.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">Public Highways</h3>
                <p className="text-white/80 text-sm mb-3">
                  Any MEWP operation on or adjacent to a public highway requires a formal traffic
                  management plan:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Traffic management plan:</strong> A documented plan showing sign
                      positions, lane closures, diversion routes, and the sequence of set-up and
                      removal
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Local authority approval:</strong> May be required depending on the
                      road classification and the extent of the works — contact the highways
                      department early
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Chapter 8 signage:</strong> Signs must comply with Chapter 8 of the
                      Traffic Signs Manual (see info box below)
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-400/40 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-300">
                  Chapter 8 — Traffic Signs Manual
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Chapter 8 of the Traffic Signs Manual (published by the Department for Transport)
                  sets out the requirements for signing, lighting, and guarding at road works and
                  temporary situations on all public highways. Key requirements include:
                </p>
                <ul className="text-white/80 space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-300/60 flex-shrink-0" />
                    <span>
                      Signs must be the correct size for the road speed limit (larger signs for
                      higher speeds)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-300/60 flex-shrink-0" />
                    <span>
                      Advance warning signs placed at specified distances before the works
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-300/60 flex-shrink-0" />
                    <span>
                      Cones and delineators at specified spacing to guide traffic past the works
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-300/60 flex-shrink-0" />
                    <span>Temporary speed limits where required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-300/60 flex-shrink-0" />
                    <span>Lighting requirements for night works or low-visibility conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-300/60 flex-shrink-0" />
                    <span>
                      Operatives setting up/removing signage must hold a valid sector scheme
                      qualification (e.g. Lantra Awards)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">Site Roads</h3>
                <p className="text-white/80 text-sm mb-3">
                  For MEWP operations on construction sites or private premises with vehicle
                  movements:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>One-way systems:</strong> Implement temporary one-way traffic flow
                      around the MEWP operation to reduce conflict points
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Speed restrictions:</strong> Temporary speed limits (typically 5 mph)
                      in the vicinity of the MEWP
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pedestrian separation:</strong> Clearly defined pedestrian routes
                      separated from vehicle and plant movements
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Stop/go boards:</strong> Temporary stop/go boards operated by trained
                      banksmen to control traffic flow past the works
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Planning Considerations</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Peak traffic times:</strong> Plan MEWP operations to avoid rush hours
                      where possible, or ensure enhanced traffic management during peak periods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Delivery vehicle schedules:</strong> Coordinate with site logistics to
                      avoid conflicts with deliveries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Other plant movements:</strong> Identify all other mobile plant
                      (cranes, telehandlers, dumpers) that may operate in the area and coordinate
                      movements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Sign placement:</strong> Signs must be the appropriate size for the
                      location and placed at correct distances to give road users adequate warning
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Banksman/Spotter Role */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              The Banksman/Spotter Role
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The banksman (also known as a spotter or signaller) is a critical safety role during
                MEWP operations. The banksman acts as the operator's eyes and ears on the ground,
                maintaining situational awareness that the platform operator cannot achieve from an
                elevated position.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Banksman Duties
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Guide the MEWP operator</strong> using agreed hand signals —
                      particularly during travel, positioning, and blind-spot navigation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Enforce the exclusion zone</strong> — prevent unauthorised persons
                      from entering the controlled area
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Keep the area clear</strong> of unauthorised persons, vehicles, and
                      other plant
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Halt operations</strong> if conditions become unsafe — weather
                      deterioration, zone breach, equipment fault, or any other hazard
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Assist with blind-spot navigation</strong> — guide the operator around
                      obstacles that cannot be seen from the platform
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintain communication</strong> with the operator at all times — using
                      hand signals, two-way radio, or both
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Banksman Requirements</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Trained and competent:</strong> Must have received training in
                      banksman duties, the specific MEWP type, and the agreed signalling system
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Identifiable:</strong> Must wear high-visibility clothing clearly
                      marked with "Banksman" or "Signaller" so all site personnel can identify them
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Physically present throughout:</strong> Must remain at their post for
                      the entire duration of the MEWP operation — not called away for other tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Clear line of sight:</strong> Must be positioned where they have a
                      clear view of both the operator and the surrounding area at all times
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">No Distractions</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The banksman must <strong className="text-white">NOT</strong> use a mobile phone,
                  read documents, or engage in any activity that diverts their attention while on
                  duty. A momentary distraction can result in a person entering the exclusion zone
                  unnoticed or a collision that the banksman fails to prevent. If the banksman needs
                  a break, operations must cease until a replacement banksman is in position.
                </p>
              </div>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  Standard Hand Signals for MEWP Operations
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  The following signals must be agreed between operator and banksman before the
                  operation begins. Only one person should give signals to the operator at any time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-teal-500/10 border border-teal-400/30 p-3 rounded-lg text-centre">
                    <div className="text-2xl mb-1">👍</div>
                    <p className="font-semibold text-teal-300 text-sm">RAISE</p>
                    <p className="text-white/60 text-xs">Thumbs up</p>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-400/30 p-3 rounded-lg text-centre">
                    <div className="text-2xl mb-1">👎</div>
                    <p className="font-semibold text-teal-300 text-sm">LOWER</p>
                    <p className="text-white/60 text-xs">Thumbs down</p>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-400/30 p-3 rounded-lg text-centre">
                    <div className="text-2xl mb-1">👉</div>
                    <p className="font-semibold text-teal-300 text-sm">TRAVEL</p>
                    <p className="text-white/60 text-xs">Arm extended, pointing direction</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-400/30 p-3 rounded-lg text-centre">
                    <div className="text-2xl mb-1">✋</div>
                    <p className="font-semibold text-yellow-300 text-sm">STOP</p>
                    <p className="text-white/60 text-xs">Flat palm facing operator</p>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-400/30 p-3 rounded-lg text-centre">
                    <div className="text-2xl mb-1">🔄</div>
                    <p className="font-semibold text-teal-300 text-sm">SLEW</p>
                    <p className="text-white/60 text-xs">Circular arm motion</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-400/30 p-3 rounded-lg text-centre">
                    <div className="text-2xl mb-1">🙌</div>
                    <p className="font-semibold text-red-300 text-sm">EMERGENCY STOP</p>
                    <p className="text-white/60 text-xs">Both arms waving above head</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Communication Methods */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Communication Methods
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Effective communication between the platform operator and ground personnel is
                essential for safe MEWP operations. Communication failure is a contributing factor
                in many MEWP incidents. The method of communication must be agreed before the
                operation begins and tested to confirm it works.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">
                  <Radio className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Communication Between Platform and Ground
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Hand signals:</strong> The primary method for routine operations. Must
                      be agreed in advance and understood by both the operator and the banksman.
                      Only effective when both parties have clear visual contact.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Two-way radio:</strong> Essential in noisy environments, at
                      significant heights where hand signals are difficult to see, or where visual
                      contact may be temporarily interrupted. Radios must be tested before the
                      operation begins.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Visual contact:</strong> Must be maintained at all times between the
                      operator and the banksman. If visual contact is lost, all operations must stop
                      until contact is re-established.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Hand Signal Rules</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Signals must be <strong>pre-agreed</strong> during the toolbox talk/method
                      statement briefing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Both parties must <strong>confirm understanding</strong> before the operation
                      starts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Only <strong>one person</strong> should give signals to the operator at any
                      time to avoid confusion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If the operator cannot see or understand a signal, they must{' '}
                      <strong>stop and wait</strong> until communication is restored
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Signals must be <strong>clear, deliberate, and exaggerated</strong> enough to
                      be seen from distance and height
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Emergency Signals</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="text-white/80">
                    The following emergency signals must be known by all personnel involved in the
                    MEWP operation:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-400/30 p-3 rounded-lg">
                      <p className="font-semibold text-red-300 mb-1">EMERGENCY STOP</p>
                      <p className="text-white/80 text-xs">
                        Both arms waving above head ={' '}
                        <strong className="text-white">STOP ALL OPERATIONS IMMEDIATELY</strong>
                      </p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-400/30 p-3 rounded-lg">
                      <p className="font-semibold text-yellow-300 mb-1">EMERGENCY ATTENTION</p>
                      <p className="text-white/80 text-xs">
                        Whistle or horn blast ={' '}
                        <strong className="text-white">ATTENTION — LOOK FOR FURTHER SIGNALS</strong>
                      </p>
                    </div>
                  </div>
                  <p className="text-white/80">
                    In noisy environments where hand signals cannot be seen, a whistle or air horn
                    should be available to attract attention before giving the emergency stop
                    signal. All personnel must know that any person on site — not just the banksman
                    — can give the emergency stop signal.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">
                  Communication in Noisy Environments
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Two-way radio is <strong>essential</strong> — hand signals alone are not
                      sufficient when verbal communication is needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use a <strong>dedicated radio channel</strong> to avoid interference from
                      other site communications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Confirm messages by <strong>repeating back</strong> — the operator repeats the
                      instruction to confirm they have understood
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Carry a <strong>spare radio or spare batteries</strong> on site in case of
                      failure
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Loading and Unloading Safety */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Loading and Unloading Safety
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Delivery and collection of MEWPs accounts for approximately{' '}
                <strong>one third</strong> of rental company-reported accidents. Loading and
                unloading is one of the highest-risk phases of any MEWP operation, yet it is often
                treated casually. Every loading/unloading operation must be planned and controlled.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">One Third of Rental Accidents</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Industry data shows that approximately{' '}
                  <strong className="text-white">one third</strong> of all MEWP accidents reported
                  by rental companies occur during the delivery and collection phase. Common
                  incidents include machines overturning during loading/unloading, crush injuries
                  from being caught between the MEWP and the transport vehicle, and falls from the
                  transport vehicle deck. This statistic alone should emphasise the need for strict
                  controls during this phase.
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  <Truck className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Loading and Unloading Requirements
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Firm level ground:</strong> The loading/unloading area must be on
                      firm, level ground capable of supporting the combined weight of the transport
                      vehicle and the MEWP
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Suitable ramps:</strong> Ramps must be rated for the machine weight,
                      properly secured to the transport vehicle, and at an acceptable gradient
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Clear exclusion zone:</strong> An exclusion zone must be established
                      around the loading area — no unauthorised persons within the zone
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Competent persons only:</strong> Only trained, competent operators
                      should drive the MEWP on or off the transport vehicle
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Clear communication:</strong> The loader and the transport vehicle
                      driver must agree the procedure and use clear signals throughout
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Machine fully stowed:</strong> Boom retracted, platform lowered,
                      outriggers retracted before any attempt to load or unload
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">
                  Transport Vehicle Requirements
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vehicle must be on <strong>firm level ground</strong> — never on a slope, soft
                      verge, or uneven surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Parking brake applied</strong> and engine running (or chocked if
                      engine off)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Wheels chocked</strong> to prevent the vehicle rolling during
                      loading/unloading
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vehicle deck clear of debris, oil, ice, or any other slip/trip hazard
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Never Stand Between</h3>
                </div>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">
                    Never stand between the MEWP and the transport vehicle
                  </strong>{' '}
                  during loading or unloading. This is a crush zone. If the MEWP moves unexpectedly
                  — due to brake failure, hydraulic fault, slope, or operator error — anyone caught
                  between the machine and the vehicle could suffer fatal crush injuries. All
                  personnel must remain outside the designated exclusion zone and approach the
                  machine only when it is stationary, secured, and the operator has confirmed it is
                  safe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Putting It All Together — Safe Operation Checklist */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Putting It All Together — Safe Operation Checklist
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The following checklist summarises the complete sequence for a safe MEWP operation,
                from arrival on site to departure. Use it as a practical reference to ensure nothing
                is missed. Every item on this list has been covered in the preceding modules and
                sections.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  <ClipboardCheck className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  BEFORE — Planning and Preparation
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Risk assessment</strong> completed, recorded, and communicated to all
                      persons involved
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Method statement</strong> prepared, specific to the site and task,
                      briefed to the team
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Rescue plan</strong> in place — written, briefed, equipment available,
                      trained rescuer identified
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ground assessment</strong> — bearing capacity, slopes, voids,
                      underground services checked
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Machine selection</strong> — correct type and size for the task,
                      reach, and site conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Operator PAL card check</strong> — valid, in date, correct categories
                      for the machine
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Familiarisation</strong> — operator has familiarised themselves with
                      the specific machine
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Pre-use inspection</strong> — visual and functional checks completed,
                      defects reported
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Exclusion zone</strong> — barriers, signage, and banksman in position
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Banksman</strong> — trained, identifiable, briefed, signals agreed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>PPE</strong> — hard hat, hi-vis, harness and lanyard (if required),
                      safety boots worn and inspected
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  <ClipboardCheck className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  DURING — Active Operation
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Pre-start checks</strong> — controls tested, emergency stop tested,
                      warning devices working
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Function test at low height</strong> — all functions tested just above
                      ground level before elevating to working height
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Controlled elevation</strong> — smooth, deliberate movements, checking
                      for overhead obstructions at every stage
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Constant awareness</strong> — operator continuously monitors
                      surroundings, banksman monitors ground level
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Weather monitoring</strong> — cease operations if wind speed
                      approaches machine limits or conditions deteriorate
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>SWL compliance</strong> — never exceed the safe working load of the
                      platform
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Harness attached</strong> — if required, harness and lanyard connected
                      to designated anchor point at all times
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ground rescue person present</strong> — trained person available at
                      ground level at all times while platform is elevated
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-3">
                  <ClipboardCheck className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  AFTER — Completion and Demobilisation
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Lower platform</strong> — return platform to ground level in a
                      controlled manner
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Stow boom/scissor</strong> — fully retract the boom or lower the
                      scissor mechanism
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Retract outriggers</strong> — only after the boom/scissor is fully
                      stowed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Post-use inspection</strong> — check for damage, leaks, wear, or any
                      defects that developed during use
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Report defects</strong> — log any defects found during the post-use
                      inspection and report to the supervisor/hirer
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Record inspection</strong> — complete the inspection record and file
                      with the site documentation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Remove exclusion zone</strong> — only when the machine is fully
                      stowed, inspected, and secured
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Remember</h3>
                <p className="text-white/80 text-sm">
                  This checklist is a summary — not a replacement for the detailed risk assessment
                  and method statement. Every operation is different, and the specific controls will
                  vary depending on the machine type, site conditions, and nature of the work. Use
                  this checklist as a quick reference to confirm that all critical steps have been
                  addressed, and always refer to the full documentation for the complete safe system
                  of work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Exclusion Zones, Traffic Management & Banksman Duties Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-5">
              Next: Module 5: Emergency Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
