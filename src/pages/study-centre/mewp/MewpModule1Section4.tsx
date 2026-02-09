import {
  ArrowLeft,
  Battery,
  Fuel,
  Zap,
  Award,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Users,
  CreditCard,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-ipaf-legal-status',
    question: 'Is IPAF training a direct legal requirement for operating a MEWP in the UK?',
    options: [
      'Yes, it is required by law under PUWER',
      'No, but it is the industry-recognised standard for demonstrating compliance with PUWER, LOLER, and WAHR',
      'Only for operators working above 10 metres',
      'Only on construction sites regulated by CDM',
    ],
    correctIndex: 1,
    explanation:
      'IPAF training is not a direct legal requirement. However, it is the industry-recognised standard that demonstrates compliance with PUWER, LOLER, and the Work at Height Regulations. Most major contractors and hire companies require IPAF PAL cards as evidence of competence.',
  },
  {
    id: 'mewp-familiarisation-vs-training',
    question: 'What is the key difference between familiarisation and training for MEWP operation?',
    options: [
      'They are the same thing with different names',
      'Familiarisation replaces the need for formal training',
      'Familiarisation is a short activity on a specific make/model; training is the formal IPAF course covering general MEWP operation',
      'Training is only needed for scissor lifts, familiarisation for boom lifts',
    ],
    correctIndex: 2,
    explanation:
      "Familiarisation is NOT training. It is a separate short activity required on EVERY specific make and model of MEWP before use, covering that machine's features, controls, emergency procedures, and limitations. Training is the formal IPAF course that provides the general knowledge and skills for a category of MEWP.",
  },
  {
    id: 'mewp-operator-health',
    question:
      'If an operator has a medical condition such as controlled epilepsy, what should happen?',
    options: [
      'They are automatically banned from operating MEWPs',
      'They can operate any MEWP without restriction',
      'The employer must assess the condition and put adequate measures in place — having a condition does not automatically preclude operation',
      'They only need to inform the hire company',
    ],
    correctIndex: 2,
    explanation:
      'Having a medical condition does NOT automatically preclude someone from operating a MEWP. The employer must assess the situation and put adequate measures in place. Any doubts about fitness to operate must be reported. The IPAF health and fitness statement covers conditions that may affect safe operation.',
  },
];

const faqs = [
  {
    question: 'Do I need a PAL card before I can operate any MEWP?',
    answer:
      'There is no specific UK law that mandates a PAL card. However, PUWER requires that operators are trained and competent, and IPAF training is the industry-recognised route to demonstrating this. In practice, almost all major contractors and hire companies require a valid PAL card before allowing anyone to operate a MEWP. Without one, you are unlikely to be permitted on site.',
  },
  {
    question: 'What is the difference between a standard PAL card and PAL+?',
    answer:
      "The standard PAL card shows you have completed IPAF operator training for specific machine categories (e.g. 3A for scissor lifts, 3B for boom lifts). PAL+ is an optional advanced training programme for higher-risk environments such as steelwork, confined overhead spaces, and challenging terrain. PAL+ adds a '+' designation to your category (e.g. 3A+, 3B+). It is a 1-day category-specific course with extended practical assessment.",
  },
  {
    question: 'Is familiarisation required every time I use a different machine?',
    answer:
      "Yes. Familiarisation is required on EVERY specific make and model of MEWP before use, even if you hold a valid PAL card for that category. If you move from a Genie GS-1932 to a Skyjack SJ3226, you need familiarisation on the Skyjack before operating it. Familiarisation covers that specific machine's controls, features, limitations, warning devices, emergency lowering procedures, and any local site requirements.",
  },
  {
    question: 'Can an operator with a fear of heights still work with MEWPs?',
    answer:
      "A fear of heights or vertigo is listed as a condition that may affect safe MEWP operation. However, having such a condition does not automatically preclude someone from operating a MEWP. The employer must carry out an individual assessment and determine whether adequate control measures can be put in place. If there are any doubts about an operator's fitness, they must be reported and assessed before work begins.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which MEWP power source is best suited for indoor work in an emission-restricted zone?',
    options: ['Diesel', 'Electric (battery)', 'Petrol', 'Hybrid in diesel mode'],
    correctAnswer: 1,
    explanation:
      'Electric (battery-powered) MEWPs produce zero emissions and low noise, making them the ideal choice for indoor work, noise-sensitive areas, and emission-restricted zones. They typically run on lithium-ion or lead-acid batteries and can operate for a full workday on a single charge.',
  },
  {
    id: 2,
    question: 'How long is an IPAF PAL card valid before renewal is required?',
    options: ['1 year', '3 years', '5 years', '10 years'],
    correctAnswer: 2,
    explanation:
      'The IPAF PAL (Powered Access Licence) card is valid for 5 years from the date of successful completion. Holders must complete a renewal course before expiry to maintain their certified status and continue operating MEWPs.',
  },
  {
    id: 3,
    question: "What does the '+' designation on a PAL card (e.g. 3A+, 3B+) indicate?",
    options: [
      'The operator has more than 5 years of experience',
      'The operator has completed PAL+ advanced training for higher-risk environments',
      'The card has been renewed at least once',
      'The operator is also qualified as an instructor',
    ],
    correctAnswer: 1,
    explanation:
      "The '+' designation indicates the operator has completed PAL+ advanced training. PAL+ covers higher-risk environments such as steelwork, confined overhead spaces, and challenging terrain. It is a 1-day category-specific course with extended practical assessment.",
  },
  {
    id: 4,
    question: 'Which of the following is true about familiarisation?',
    options: [
      'It replaces the need for IPAF training',
      'It is only required for boom-type MEWPs',
      'It is a short activity required on every specific make and model before use',
      'It is part of the PAL card renewal process',
    ],
    correctAnswer: 2,
    explanation:
      "Familiarisation is NOT training. It is a separate short activity required on EVERY specific make and model of MEWP before use. It must cover that machine's features, functions, devices, limitations, warnings, operating characteristics, emergency lowering procedures, and local site requirements.",
  },
  {
    id: 5,
    question:
      'Approximately what proportion of rental company-reported MEWP accidents occur during delivery and collection?',
    options: ['One tenth', 'One quarter', 'One third', 'One half'],
    correctAnswer: 2,
    explanation:
      'Approximately one third of rental company-reported accidents occur during delivery and collection of MEWPs. This highlights the critical importance of familiarisation, correct loading/unloading procedures, and having trained personnel involved at all stages of MEWP use.',
  },
  {
    id: 6,
    question:
      'Which of the following conditions would automatically preclude someone from operating a MEWP?',
    options: [
      'Controlled high blood pressure',
      'Corrected eyesight (wearing glasses)',
      'None — all conditions require individual assessment by the employer',
      'A previous history of epilepsy that is now controlled',
    ],
    correctAnswer: 2,
    explanation:
      'No medical condition automatically precludes someone from operating a MEWP. The employer must carry out an individual assessment for each operator and determine whether adequate control measures can be put in place. Having a condition listed on the IPAF health and fitness statement requires assessment, not automatic exclusion.',
  },
  {
    id: 7,
    question: 'Who is responsible for producing the rescue plan for MEWP operations on site?',
    options: ['The MEWP operator', 'The hire company', 'The employer or site manager', 'IPAF'],
    correctAnswer: 2,
    explanation:
      'The employer or site manager is responsible for producing the rescue plan as part of the overall risk assessment and method statement for MEWP operations. The rescue plan must be in place before any MEWP work begins and must account for the specific risks of the task, location, and equipment being used.',
  },
  {
    id: 8,
    question: 'What must be confirmed as present on a MEWP as part of familiarisation?',
    options: [
      "The hire company's business card",
      "The operator's PAL card",
      "The machine's operating manual",
      'A fire extinguisher',
    ],
    correctAnswer: 2,
    explanation:
      "As part of familiarisation, the operator must confirm that the operating manual is present on the machine. The manual contains essential information about that specific machine's controls, capacities, limitations, and emergency procedures that the operator needs to be aware of.",
  },
];

export default function MewpModule1Section4() {
  useSEO({
    title: 'Power Sources, Operator Competence & the PAL Card | MEWP Module 1.4',
    description:
      'MEWP power sources (electric, diesel, hybrid), IPAF training structure, PAL card categories, familiarisation vs training, operator health requirements, and roles and responsibilities.',
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
            <Award className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 1 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Sources, Operator Competence & the PAL Card
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding MEWP power types, IPAF training, the PAL card system, familiarisation
            requirements, operator fitness, and workplace roles and responsibilities
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Power:</strong> Electric (indoor), diesel (outdoor), hybrid (both)
              </li>
              <li>
                <strong>PAL Card:</strong> Valid 5 years, shows trained categories
              </li>
              <li>
                <strong>Familiarisation:</strong> Required on every specific machine
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Always:</strong> Carry valid PAL card when operating
              </li>
              <li>
                <strong>Before Use:</strong> Familiarise with specific machine
              </li>
              <li>
                <strong>Report:</strong> Any health concerns that may affect operation
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Compare the three MEWP power sources and their applications',
              'Explain the IPAF training structure and why it matters',
              'Describe the PAL card system, including PAL+ advanced training',
              'Distinguish between familiarisation and training',
              'Identify operator health and fitness requirements',
              'Summarise the roles and responsibilities for MEWP operations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: MEWP Power Sources */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            MEWP Power Sources
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                MEWPs are powered by one of three main power sources. The choice of power source
                directly affects where the machine can be used, its environmental impact, noise
                levels, and maintenance requirements. Selecting the right power source is a key part
                of planning any MEWP operation.
              </p>

              {/* Power Source Comparison Grid */}
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Battery className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Electric (Battery)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1 mb-3">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Zero emissions &mdash; no exhaust fumes during operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Quiet operation &mdash; ideal for noise-sensitive environments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lithium-ion or lead-acid batteries available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Full workday operation on a single charge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No oil changes required &mdash; lower maintenance costs</span>
                    </li>
                  </ul>
                  <p className="text-xs text-green-300 font-medium">
                    Best for: Indoor work, noise-sensitive areas, emission-restricted zones
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Fuel className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Diesel</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1 mb-3">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Higher power output &mdash; capable of rough terrain and heavy loads
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Four-wheel drive options for uneven ground conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Produces exhaust emissions &mdash; not suitable for enclosed spaces
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Higher noise levels &mdash; consider nearby workers and public</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Regular engine maintenance and oil changes required</span>
                    </li>
                  </ul>
                  <p className="text-xs text-orange-300 font-medium">
                    Best for: Outdoor construction, rough terrain, heavy-duty applications
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Hybrid (Electric/Diesel)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1 mb-3">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Dual electric and diesel capability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can switch between modes depending on location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Electric mode indoors, diesel mode for outdoor travel and rough ground
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Versatile &mdash; reduces the need for multiple machines on site</span>
                    </li>
                  </ul>
                  <p className="text-xs text-blue-300 font-medium">
                    Best for: Mixed indoor/outdoor work, sites requiring both emission-free and
                    high-power modes
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">
                  Charging Considerations (Electric & Hybrid)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Recharge batteries after each shift &mdash; do not leave discharged overnight
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Do not allow the charge level to drop below 20% &mdash; deep discharge
                      shortens battery life
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Lithium-ion batteries charge approximately 33% faster than flooded lead-acid
                      batteries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Charge in well-ventilated areas &mdash; lead-acid batteries produce hydrogen
                      gas during charging
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: IPAF Training Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            IPAF Training Structure
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                IPAF (International Powered Access Federation) operator training is{' '}
                <strong>not a direct legal requirement</strong> in the UK. However, it is the
                industry-recognised standard for demonstrating compliance with PUWER, LOLER, and the
                Work at Height Regulations. In practice, most major contractors and hire companies
                require operators to hold a valid IPAF PAL card before allowing them to operate any
                MEWP.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> While not legally
                  mandated, IPAF training is the universally accepted route to proving competence.
                  Without it, operators will struggle to access sites or hire equipment across the
                  UK construction industry.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Training Components</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Theory Section & Test</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Available via eLearning or classroom delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Task planning and machine selection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>PPE checks and harness use</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Rescue planning requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Pre-use inspection procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Six key risk areas and hazard identification</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Practical Training & Test</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Conducted at an IPAF-approved training centre</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Hands-on operation of the machine category</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Pre-use checks and ground-level controls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Safe manoeuvring and positioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Emergency lowering procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Observed practical assessment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Course Duration</p>
                <p className="text-sm text-white/80">
                  Training typically takes <strong className="text-white">1 to 3 days</strong>{' '}
                  depending on the operator's existing experience, the complexity of the machine
                  category, and the number of categories being covered. Operators training on
                  multiple categories (e.g. both 3A and 3B) will require additional time for
                  practical assessment on each machine type.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The IPAF PAL Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The IPAF PAL Card
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The PAL (Powered Access Licence) card is issued on successful completion of IPAF
                operator training. It is the industry-standard proof of competence for MEWP
                operation and is internationally recognised across the powered access industry.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">PAL Card Details</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
                  <div>
                    <p className="text-white font-medium">Validity</p>
                    <p>5 years from date of successful completion</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Recognition</p>
                    <p>Internationally recognised across the industry</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Shows</p>
                    <p>Machine categories operator is trained for (e.g. 3A, 3B)</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Renewal</p>
                    <p>Must be renewed before expiry to maintain certified status</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">PAL+ Advanced Training</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  PAL+ is an optional advanced training programme for operators working in
                  higher-risk environments. It builds on standard IPAF training and covers
                  additional competencies required for challenging conditions.
                </p>
                <ul className="text-sm text-white/80 space-y-1 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Steelwork and structural erection at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Confined overhead spaces with restricted headroom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Challenging terrain and difficult ground conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Shown as "+" designation on PAL card (e.g. 3A+, 3B+)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>1-day category-specific course with extended practical assessment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Renewal Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  PAL cards must be renewed before they expire. If your card lapses, you will not be
                  able to demonstrate current competence and most sites will not permit you to
                  operate. Plan renewal training at least 3 months before your expiry date to avoid
                  gaps in certification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Familiarisation vs Training */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Familiarisation vs Training
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This is one of the most critical distinctions in MEWP operation. Many operators
                confuse familiarisation with training, but they are completely different activities
                with different purposes. Getting this wrong can lead to accidents, and it frequently
                does.
              </p>

              {/* Key Definition Box */}
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Key Definition</p>
                <p className="text-sm text-white">
                  <strong>Familiarisation is NOT training.</strong> It is a separate, short activity
                  required on <strong>every specific make and model</strong> of MEWP before use
                  &mdash; even if the operator holds a valid PAL card for that category of machine.
                  A PAL card proves general competence for a category; familiarisation ensures the
                  operator knows the specific machine they are about to use.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Training (IPAF Course)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Formal course at approved training centre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Covers a category of machine (e.g. all scissor lifts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Theory and practical assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Results in PAL card (valid 5 years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Done once per category (renewed every 5 years)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Familiarisation (On-site)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Short activity on a specific make and model</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Covers that machine's unique features and controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No formal certificate issued</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Required every time a new machine is used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Includes local site requirements</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Familiarisation Must Cover:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Operating manual:</strong> Confirm the manual
                      is present on the machine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Features and functions:</strong> All controls,
                      displays, and operating modes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Safety devices:</strong> Warning systems, limit
                      switches, tilt sensors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Limitations and warnings:</strong> Weight
                      capacity, height limits, wind speed restrictions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Operating characteristics:</strong> Speed,
                      sensitivity, response times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency lowering:</strong> Procedure specific
                      to that machine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Local site requirements:</strong> Exclusion
                      zones, traffic routes, overhead hazards
                    </span>
                  </li>
                </ul>
              </div>

              {/* Warning Box */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Safety Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Approximately{' '}
                  <strong className="text-white">
                    one third of rental company-reported accidents
                  </strong>{' '}
                  occur during delivery and collection of MEWPs. This highlights the critical
                  importance of familiarisation, correct loading and unloading procedures, and
                  ensuring that only trained and familiarised personnel handle MEWPs at all stages
                  &mdash; including when the machine arrives on or departs from site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Operator Health and Fitness Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Operator Health & Fitness Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                MEWP operators must be physically and mentally fit to operate equipment safely at
                height. The IPAF health and fitness statement identifies conditions that may affect
                safe operation, but it is important to understand that having a condition does
                <strong> not</strong> automatically preclude someone from operating a MEWP.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Conditions That May Affect Safe Operation
                  </p>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  Operators should be physically fit with no untreated problems with:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Eyesight or hearing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Heart disease or high blood pressure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Epilepsy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fear of heights or vertigo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Giddiness or difficulty with balance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Impaired limb function</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Alcohol or drug dependence</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Psychiatric illness</span>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">
                  Important: Assessment, Not Exclusion
                </p>
                <p className="text-sm text-white/80">
                  Having any of the conditions listed above does{' '}
                  <strong className="text-white">NOT automatically preclude</strong> someone from
                  operating a MEWP. The employer must carry out an individual assessment and
                  determine whether adequate control measures can be put in place. For example, an
                  operator with corrected eyesight (wearing glasses or contact lenses) may be fully
                  fit to operate, while an operator with uncontrolled epilepsy may not be. Each case
                  must be assessed on its own merits.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  IPAF Health & Fitness Statement
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Operators must sign a health declaration before IPAF training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The statement covers all conditions that may affect safe operation at height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Any doubts about fitness must be reported to the employer immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Employers should review fitness to operate as part of ongoing competence
                      management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Conditions can develop or change over time &mdash; fitness is not a one-off
                      check
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Duty to Report</p>
                </div>
                <p className="text-sm text-white/80">
                  Operators have a duty to report any changes in their health or fitness that may
                  affect their ability to operate a MEWP safely. This includes new medication,
                  changes in an existing condition, or temporary conditions (e.g. a broken limb,
                  severe fatigue, or the effects of medication). Never operate a MEWP if you have
                  any doubts about your fitness to do so.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Roles and Responsibilities Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Roles & Responsibilities Summary
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safe MEWP operations depend on multiple people fulfilling their specific roles and
                responsibilities. No single person is responsible for everything &mdash; safety is a
                shared obligation. The following summary outlines the key duties for each role
                involved in MEWP work.
              </p>

              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Operator</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Hold a valid IPAF PAL card for the machine category</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Trained and competent for the specific type of MEWP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Complete pre-use checks before every shift</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Report defects immediately and take machine out of service if unsafe
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the method statement and safe system of work</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Employer / Site Manager</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Carry out risk assessment for all MEWP operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Select the correct type and size of MEWP for the task</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Produce a rescue plan before work begins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide adequate supervision for operators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure operators are trained, competent, and hold valid PAL cards</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Banksman / Spotter</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Guide the operator during manoeuvring and positioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Enforce exclusion zones around the MEWP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Keep the surrounding area clear of pedestrians and vehicles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Halt operations immediately if conditions become unsafe</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Competent Person</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Carry out thorough examination under LOLER (every 6 months)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Conduct detailed inspections and certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Advise on planning, machine selection, and safe systems of work</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-5 w-5 text-teal-400" />
                    <p className="text-sm font-medium text-teal-400">Hire Company</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Maintain equipment in safe working order</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide operating documentation and manuals with the machine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Supply current LOLER thorough examination certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide familiarisation support for delivered machines</span>
                    </li>
                  </ul>
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../mewp-module-2">
              Next: Module 2 &mdash; Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
