import {
  ArrowLeft,
  Scale,
  CheckCircle,
  AlertTriangle,
  Shield,
  Users,
  Gavel,
  Construction,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-wahr-hierarchy',
    question:
      'Under Regulation 6 of the Work at Height Regulations 2005, what is the FIRST step in the hierarchy of control?',
    options: [
      'Avoid work at height where reasonably practicable',
      'Prevent falls using collective protection such as MEWPs',
      'Minimise the distance and consequences of a fall',
      'Provide personal protective equipment to all operatives',
    ],
    correctIndex: 0,
    explanation:
      'The hierarchy of control requires you to first AVOID work at height wherever reasonably practicable. Only when avoidance is not possible should you move to Step 2 (prevent falls) and then Step 3 (minimise consequences).',
  },
  {
    id: 'mewp-employer-duty',
    question:
      'Which section of the Health and Safety at Work etc. Act 1974 places the primary duty on employers to ensure the health, safety, and welfare of employees?',
    options: ['Section 3', 'Section 7', 'Section 2', 'Section 8'],
    correctIndex: 2,
    explanation:
      'Section 2 of HSWA 1974 places the primary general duty on every employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees.',
  },
  {
    id: 'mewp-enforcement-prohibition',
    question:
      'What type of notice can an HSE inspector serve to stop a dangerous work activity immediately?',
    options: ['Improvement notice', 'Prohibition notice', 'Advisory notice', 'Compliance notice'],
    correctIndex: 1,
    explanation:
      'A prohibition notice requires the activity to be stopped immediately because the inspector believes there is a risk of serious personal injury. It can be served even if no legal breach has yet occurred.',
  },
];

const faqs = [
  {
    question: 'Do the Work at Height Regulations 2005 apply to MEWP operations?',
    answer:
      'Yes. MEWPs are classified as work equipment used for work at height and fall squarely within the scope of the Work at Height Regulations 2005. Every MEWP operation must be properly planned, supervised, and carried out by competent persons. The Regulations also require risk assessment, equipment suitability checks, and rescue planning for all MEWP work.',
  },
  {
    question: 'Is there a minimum height that triggers the Work at Height Regulations?',
    answer:
      'No. There is no minimum height threshold. The Regulations apply to all work at height where a person could fall a distance liable to cause personal injury, regardless of whether that is half a metre or fifty metres. Even working from the basket of a small scissor lift at low level constitutes work at height.',
  },
  {
    question: 'What is the difference between HSWA 1974 and the Work at Height Regulations 2005?',
    answer:
      'The Health and Safety at Work etc. Act 1974 is the overarching primary legislation that sets out general duties for employers, employees, and the self-employed across all workplace activities. The Work at Height Regulations 2005 are secondary legislation made under HSWA 1974 and deal specifically with the risks of working at height, including the hierarchy of control, equipment selection, and inspection requirements.',
  },
  {
    question: 'Where do MEWPs sit in the hierarchy of control?',
    answer:
      'MEWPs sit at Step 2 of the hierarchy — PREVENT falls using collective protection. A MEWP provides a guarded platform (the basket or cage) that prevents the operator from falling. This makes MEWPs a preferred option over Step 3 measures such as harnesses and safety nets. However, you must always first consider whether the work at height can be avoided altogether (Step 1) before selecting a MEWP.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What year did the Work at Height Regulations come into force?',
    options: ['2000', '2003', '2005', '2007'],
    correctAnswer: 2,
    explanation:
      'The Work at Height Regulations came into force on 6 April 2005 and apply across England, Wales, and Scotland.',
  },
  {
    id: 2,
    question:
      'Which of the following is the CORRECT order of the hierarchy of control under Regulation 6?',
    options: [
      'Prevent falls, avoid height, minimise consequences',
      'Avoid height, prevent falls, minimise consequences',
      'Minimise consequences, avoid height, prevent falls',
      'Use PPE, prevent falls, avoid height',
    ],
    correctAnswer: 1,
    explanation:
      'The correct hierarchy is: (1) Avoid work at height, (2) Prevent falls using collective protection, (3) Minimise the distance and consequences of a fall.',
  },
  {
    id: 3,
    question: 'Where do MEWPs sit in the WAHR 2005 hierarchy of control?',
    options: [
      'Step 1 — Avoid work at height',
      'Step 2 — Prevent falls with collective protection',
      'Step 3 — Minimise distance and consequences of a fall',
      'MEWPs are not covered by the hierarchy',
    ],
    correctAnswer: 1,
    explanation:
      'MEWPs provide a guarded work platform that prevents the operator from falling, placing them at Step 2 of the hierarchy — prevent falls using collective protection.',
  },
  {
    id: 4,
    question:
      'Which HSWA 1974 section places a duty on employees to take reasonable care of themselves and others?',
    options: ['Section 2', 'Section 3', 'Section 7', 'Section 8'],
    correctAnswer: 2,
    explanation:
      'Section 7 of HSWA 1974 requires every employee to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work.',
  },
  {
    id: 5,
    question: 'Under HSWA 1974 Section 8, what is it an offence to do?',
    options: [
      'Work more than 8 hours at height',
      'Refuse to carry out a risk assessment',
      'Intentionally or recklessly interfere with or misuse safety provisions',
      'Fail to display a health and safety poster',
    ],
    correctAnswer: 2,
    explanation:
      'Section 8 makes it an offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare.',
  },
  {
    id: 6,
    question:
      'What type of notice does the HSE serve when an inspector believes a legal provision is being contravened but there is no immediate risk of serious injury?',
    options: ['Prohibition notice', 'Improvement notice', 'Advisory notice', 'Compliance notice'],
    correctAnswer: 1,
    explanation:
      'An improvement notice is served when the inspector believes a legal provision is being contravened. It specifies the breach and sets a time limit (minimum 21 days) for the duty holder to remedy it.',
  },
  {
    id: 7,
    question: 'Falls from height are the number one cause of what in UK workplaces?',
    options: ['Minor injuries', 'Workplace fatalities', 'RIDDOR reports', 'Insurance claims'],
    correctAnswer: 1,
    explanation:
      'Falls from height remain the single largest cause of workplace fatalities in the United Kingdom, which is why the Work at Height Regulations impose strict duties on all parties involved.',
  },
  {
    id: 8,
    question: "What does 'reasonably practicable' mean in the context of health and safety law?",
    options: [
      'You must eliminate every risk regardless of cost',
      'You only need to act when the HSE tells you to',
      'You must balance the level of risk against the cost and effort of reducing it',
      'You must follow the most expensive control measure available',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonably practicable requires you to weigh the degree of risk against the sacrifice (time, cost, effort) needed to avert it. If the risk is significant, the cost of prevention must be grossly disproportionate before inaction is justified.',
  },
];

export default function MewpModule1Section1() {
  useSEO({
    title: 'Work at Height Legislation & Hierarchy of Control | MEWP Module 1.1',
    description:
      'Work at Height Regulations 2005, the hierarchy of control (Regulation 6), HSWA 1974, employer and employee duties, MEWP-specific requirements, and HSE enforcement powers for MEWP operators.',
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
            <Scale className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 1 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Work at Height Legislation &amp; the Hierarchy of Control
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The primary legislation governing work at height in Great Britain, the mandatory
            three-step hierarchy of control, and how it all applies to MEWP operations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Hierarchy:</strong> Avoid &rarr; Prevent &rarr; Minimise falls
              </li>
              <li>
                <strong>MEWPs:</strong> Step 2 — collective fall prevention
              </li>
              <li>
                <strong>HSWA 1974:</strong> Employer &amp; employee duties
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Before:</strong> Plan work, risk assess, select the right MEWP
              </li>
              <li>
                <strong>During:</strong> Supervise, inspect equipment, follow method statement
              </li>
              <li>
                <strong>Always:</strong> Use competent persons, have a rescue plan
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the scope of the Work at Height Regulations 2005',
              'Describe the three-step hierarchy of control (Regulation 6)',
              'Summarise HSWA 1974 Sections 2, 3, 7 and 8',
              'Distinguish employer and employee responsibilities',
              'Explain how WAHR 2005 applies specifically to MEWP operations',
              'Know the HSE enforcement powers and potential penalties',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Are the Work at Height Regulations 2005? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are the Work at Height Regulations 2005?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 (WAHR) came into force on 6&nbsp;April&nbsp;2005
                and apply across England, Wales, and Scotland. They replaced an older patchwork of
                legislation &mdash; including parts of the Construction (Health, Safety and Welfare)
                Regulations 1996 and various sector-specific rules &mdash; and consolidated all
                work-at-height duties into a single, clear legal framework.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Definition:</strong> &ldquo;Work at
                  height&rdquo; means work in any place where, if precautions were not taken, a
                  person could fall a distance liable to cause personal injury. There is{' '}
                  <strong>no minimum height</strong> &mdash; even working from a MEWP platform at
                  one metre above ground level is work at height.
                </p>
              </div>

              <p>
                The Regulations apply to <strong>all</strong> work at height where there is a risk
                of a fall liable to cause personal injury. They cover employers, the self-employed,
                and anyone who controls the work of others. This means principal contractors,
                facilities managers, site supervisors, and MEWP hire companies all have duties under
                WAHR, not just the person physically working at height.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Regulations Cover:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All industries and workplaces, not just construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Work above ground level, below ground level (e.g. near a pit or excavation),
                      and at ground level where a fall hazard exists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Access and egress to and from a place of work at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Organisation, planning, and supervision of work at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Selection and use of work equipment for work at height, including MEWPs,
                      scaffolds, ladders, and towers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Inspection of work equipment and maintenance of inspection records</span>
                  </li>
                </ul>
              </div>

              <p>
                Critically, WAHR 2005 does not set a minimum height. Whether you are working from a
                MEWP basket at 2&nbsp;metres or 40&nbsp;metres, the same legal duties apply. The
                Regulations also cover fragile surfaces, falling objects, and the requirement for
                emergency rescue planning.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Hierarchy of Control (Regulation 6) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Hierarchy of Control (Regulation 6)
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 6 establishes a strict, mandatory hierarchy of control that must be
                followed when planning any work at height. This hierarchy is the cornerstone of the
                Regulations and dictates the approach you must take before any work at height
                begins. You must work through each step in order and only move to the next step when
                the previous one is not reasonably practicable.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">
                  The Three-Step Hierarchy
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-green-400">AVOID Work at Height</p>
                      <p className="text-sm text-white/80">
                        Avoid work at height altogether where it is reasonably practicable to do so.
                        Can the task be done from ground level? Can the component be lowered for
                        maintenance? Can the design be changed to eliminate the need for height
                        work?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-blue-400">
                        PREVENT Falls — Collective Protection
                      </p>
                      <p className="text-sm text-white/80">
                        Where work at height cannot be avoided, use work equipment or other measures
                        to prevent falls. This includes MEWPs (guarded platforms), scaffolding with
                        edge protection, guardrail systems, and mobile towers. Collective protection
                        that protects everyone is always preferred over individual measures.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-amber-400">
                        MINIMISE Distance &amp; Consequences of a Fall
                      </p>
                      <p className="text-sm text-white/80">
                        Where the risk of a fall cannot be eliminated, minimise the distance and
                        consequences. This includes safety nets, airbags, bean bags, and personal
                        fall arrest systems (harnesses with lanyards). These are the last resort,
                        not the first choice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                This hierarchy is not optional or advisory &mdash; it is a legal requirement. Using
                a harness (Step&nbsp;3) when a MEWP (Step&nbsp;2) could have been used is a breach
                of the Regulations. You must always demonstrate that you have worked through the
                hierarchy and have a valid reason for the control measure selected.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">
                    Step 1 — Examples of Avoiding Height
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Assembling ductwork or containment at ground level then craning into
                        position
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Using extendable paint rollers or telescopic tools from ground level
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lowering light fittings on winch systems for re-lamping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Designing buildings with ground-level maintenance access points</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">
                    Step 2 — Examples of Preventing Falls
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mobile elevating work platforms (scissor lifts, boom lifts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fixed scaffolding with guardrails and toe boards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mobile scaffold towers with full edge protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Permanent guardrail systems on flat roofs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Health and Safety at Work etc. Act 1974 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Health and Safety at Work etc. Act 1974
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety at Work etc. Act 1974 (HSWA) is the primary piece of
                legislation covering occupational health and safety in Great Britain. It is an{' '}
                <strong>enabling Act</strong>, meaning it provides the legal framework under which
                more specific regulations &mdash; including the Work at Height Regulations 2005,
                LOLER 1998, and PUWER 1998 &mdash; are made as secondary (subordinate) legislation.
              </p>

              <p>
                HSWA 1974 applies to <strong>all workplaces</strong> and all work activities, not
                just construction. Whether you are operating a MEWP in a warehouse, a shopping
                centre, a power station, or on a construction site, the Act&rsquo;s duties apply in
                full.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">
                  Key Sections for MEWP Operators
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Section 2 &mdash; Employer&rsquo;s General Duties
                    </p>
                    <p className="text-sm text-white/80">
                      Every employer must ensure, so far as is reasonably practicable, the health,
                      safety, and welfare at work of all employees. This includes providing safe
                      plant and systems of work, safe handling and storage of substances, adequate
                      information, instruction, training, and supervision, and a safe working
                      environment.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Section 3 &mdash; Duty to Non-Employees
                    </p>
                    <p className="text-sm text-white/80">
                      Employers and the self-employed must conduct their undertaking in such a way
                      as to ensure, so far as is reasonably practicable, that persons not in their
                      employment are not exposed to risks to their health or safety. This covers
                      members of the public, visitors, other contractors, and passers-by near MEWP
                      operations.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Section 7 &mdash; Employee Duties
                    </p>
                    <p className="text-sm text-white/80">
                      Every employee must take reasonable care for the health and safety of
                      themselves and of other persons who may be affected by their acts or omissions
                      at work. Employees must also co-operate with their employer on health and
                      safety matters, including attending training and following safe systems of
                      work.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Section 8 &mdash; Interference with Safety Provisions
                    </p>
                    <p className="text-sm text-white/80">
                      No person shall intentionally or recklessly interfere with or misuse anything
                      provided in the interests of health, safety, or welfare. Overriding a MEWP
                      safety cut-out, removing guardrails, or disabling an alarm system are all
                      examples of Section 8 offences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Definition:</strong> &ldquo;So far as is
                  reasonably practicable&rdquo; means you must weigh the degree of risk against the
                  sacrifice (time, money, effort) needed to avert it. Unless the cost is grossly
                  disproportionate to the risk, you must take the precaution. The burden of proof
                  rests with the duty holder, not the prosecution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Employer & Employee Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Employer &amp; Employee Responsibilities
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Both HSWA 1974 and the Work at Height Regulations place distinct duties on employers
                and employees. Both parties must fulfil their respective obligations to ensure work
                at height is carried out safely. Failure by either party can result in enforcement
                action, prosecution, and serious consequences.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Employer Duties</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Plan, organise, and supervise all work at height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide adequate training and ensure operative competence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Select suitable work equipment following the hierarchy of control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure equipment is properly maintained and inspected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Carry out and act upon site-specific risk assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide adequate supervision proportionate to the risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Establish emergency and rescue procedures before work begins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure the workplace is safe and without risks to health</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Employee Duties</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the safe systems of work established by the employer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use work equipment correctly and as trained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Report any hazards, defects, or dangerous situations immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Not misuse or interfere with any safety equipment or provisions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Co-operate with the employer on health and safety matters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Attend and engage with all required training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Report any medical condition or fitness issue that may affect their ability
                        to work safely at height
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the method statement and risk assessment for each task</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Self-Employed Persons</p>
                </div>
                <p className="text-sm text-white/80">
                  If you are self-employed, you carry the same duties as both an employer and an
                  employee. You must plan, supervise, and carry out your own work at height safely.
                  You must also ensure you are competent to operate the MEWP, that the equipment is
                  suitable and properly inspected, and that a rescue plan is in place. Under Section
                  3 of HSWA 1974, you must also protect others who may be affected by your work,
                  including members of the public and other workers on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: How WAHR 2005 Applies to MEWPs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            How WAHR 2005 Applies to MEWPs
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mobile Elevating Work Platforms are classified as work equipment used for work at
                height, and they fall squarely within the scope of the Work at Height Regulations
                2005. Understanding exactly how the Regulations apply to MEWP operations is
                essential for every operator, supervisor, and site manager.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> In the hierarchy of
                  control, MEWPs sit at{' '}
                  <strong>Step 2 — Prevent falls using collective protection</strong>. The MEWP
                  basket provides a guarded work platform with guardrails, mid-rails, and toe boards
                  that prevent the operator from falling. This makes MEWPs a preferred option over
                  Step 3 measures such as harnesses and safety nets.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Construction className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    WAHR Requirements for MEWP Operations
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Planning:</strong> Every MEWP operation must be
                      properly planned by a competent person, including task planning, access route
                      assessment, and ground condition checks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Supervision:</strong> Work must be supervised
                      by a competent person who understands MEWP operations and can intervene if
                      conditions change
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Risk Assessment:</strong> A site-specific risk
                      assessment must identify hazards such as overhead power lines, uneven ground,
                      wind loading, pedestrian and vehicle traffic, and adjacent structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Equipment Suitability:</strong> The MEWP
                      selected must be suitable for the specific task, environment, and working
                      conditions — the right type, the right capacity, and the right reach
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Inspection:</strong> The MEWP must be inspected
                      before use and maintained in accordance with the manufacturer&rsquo;s
                      instructions and LOLER 1998 requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Competence:</strong> All MEWP operators must be
                      trained and competent — holding a valid IPAF or equivalent operator licence
                      for the category of MEWP being used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rescue Plan:</strong> A documented rescue plan
                      must be in place before work begins, covering procedures for retrieving a
                      stranded or incapacitated operator
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">
                    Documentation Needed for Every MEWP Operation
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Site-specific risk assessment for the MEWP task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Method statement covering set-up, operation, and dismantling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Valid LOLER thorough examination certificate (within 6&nbsp;months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>IPAF operator licence cards for all operators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Pre-use inspection checklist records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Documented rescue plan</span>
                  </li>
                </ul>
              </div>

              <p>
                Importantly, the duty to plan MEWP work falls on the person who controls the work,
                not just the operator. If you are a site manager or principal contractor, you have a
                legal duty to ensure that every MEWP operation on your site is properly planned,
                risk assessed, supervised, and carried out by competent persons using suitable
                equipment.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Enforcement & Penalties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Enforcement &amp; Penalties
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive (HSE) is the primary enforcement body for health and
                safety legislation in Great Britain. HSE inspectors have extensive powers to enter
                premises without notice, examine work activities, take samples and photographs, and
                take enforcement action where breaches are found.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gavel className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">HSE Enforcement Powers</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-amber-400">Improvement Notice</p>
                    <p className="text-sm text-white/80">
                      Issued when the inspector believes a legal provision is being contravened. The
                      notice specifies the breach and sets a time limit (minimum{' '}
                      <strong>21&nbsp;days</strong>) for the duty holder to remedy it. Failure to
                      comply is a criminal offence.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-400">Prohibition Notice</p>
                    <p className="text-sm text-white/80">
                      Issued when the inspector believes there is a risk of serious personal injury.
                      The activity must be <strong>stopped immediately</strong>. A prohibition
                      notice can be served even if no legal breach has yet occurred &mdash; the mere
                      risk of serious injury is sufficient.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-400">Prosecution</p>
                    <p className="text-sm text-white/80">
                      For serious breaches, the HSE can prosecute individuals and organisations in
                      the criminal courts. Fines are <strong>unlimited</strong> in the Crown Court,
                      and individuals can face <strong>imprisonment for up to 2&nbsp;years</strong>{' '}
                      for the most serious offences under HSWA 1974.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Human Cost</p>
                </div>
                <p className="text-sm text-white/80">
                  Falls from height remain the{' '}
                  <strong>number one cause of workplace fatalities</strong> in the United Kingdom.
                  In the construction sector alone, falls from height account for approximately 50%
                  of all fatal injuries each year. This is precisely why the HSE takes enforcement
                  of work at height legislation so seriously and why penalties can be severe.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Penalties for Organisations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Unlimited fines in the Crown Court</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Sentencing guidelines consider company turnover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Publicity orders naming the offender</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Remediation orders requiring corrective action</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Penalties for Individuals</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Unlimited fines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Imprisonment (up to 2 years for most offences)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Disqualification as a company director</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Personal criminal record</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> The burden of proof for
                  &ldquo;reasonably practicable&rdquo; sits with the duty holder. If prosecuted,{' '}
                  <strong>you</strong> must demonstrate that it was not reasonably practicable to do
                  more than you did &mdash; the HSE does not have to prove that it was. Always
                  document your risk assessments, planning decisions, and the rationale behind your
                  control measures.
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
            <Link to="../mewp-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-1-section-2">
              Next: LOLER 1998, PUWER 1998 &amp; Employer Duties
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
