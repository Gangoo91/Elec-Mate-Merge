import {
  ArrowLeft,
  Search,
  CheckCircle,
  AlertTriangle,
  ClipboardCheck,
  Wrench,
  Gauge,
  Shield,
  XCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-preuse-when',
    question: 'When must a pre-use inspection be carried out on a MEWP?',
    options: [
      'Only when the machine looks damaged',
      'Once a week on Monday mornings',
      'Daily or at the start of each shift, before use',
      'Only after a thorough examination has expired',
    ],
    correctIndex: 2,
    explanation:
      "A pre-use inspection must be carried out daily or at the start of each shift before the MEWP is used. IPAF also recommends a brief check after use. It is the operator's responsibility to complete this inspection every time.",
  },
  {
    id: 'mewp-hydraulic-check',
    question:
      'During the mechanical and structural checks, what should you look for when inspecting hydraulic hoses?',
    options: [
      'Only check the fluid level in the reservoir',
      'Cuts, chafing, bulges, leaks, and security of connections',
      'Just confirm the hoses are the correct colour',
      'Only inspect hoses if the machine is over five years old',
    ],
    correctIndex: 1,
    explanation:
      'Hydraulic hoses must be checked for cuts, chafing, bulges, visible leaks, and security of all connections. A failed hydraulic hose can cause sudden uncontrolled descent of the platform, so thorough inspection is essential.',
  },
  {
    id: 'mewp-harness-check',
    question:
      'When inspecting a full body harness before use, which of the following should you check?',
    options: [
      'Only the colour of the webbing',
      'Webbing condition, hardware function, and that labels are legible and within inspection date',
      'Just the D-ring and nothing else',
      'Only the lanyard length',
    ],
    correctIndex: 1,
    explanation:
      'A full body harness pre-use check must cover the webbing (cuts, fraying, abrasion, chemical or UV damage, stitching integrity), all hardware (buckles, D-rings, connectors for function and condition), and labels (legibility and that the harness is within its inspection date).',
  },
];

const faqs = [
  {
    question: 'What is the difference between familiarisation and operator training?',
    answer:
      "Operator training is a formal course (such as IPAF) that teaches you how to operate a category of MEWP (e.g. 3a scissor lift, 3b boom lift). Familiarisation is a separate, shorter activity carried out on EVERY specific make and model before you use it, even if you hold a valid operator licence. Training covers the general category; familiarisation covers the individual machine's specific controls, features, limitations, and emergency procedures.",
  },
  {
    question: 'How long should a pre-use inspection take?',
    answer:
      'A thorough pre-use inspection typically takes between 15 and 30 minutes if no defects are found. The exact time depends on the size and complexity of the MEWP. Never rush the inspection — it is the single most important safety check before operating the machine. If defects are found, the machine must be isolated and reported, which will take additional time.',
  },
  {
    question: 'Can I still use the MEWP if I find a minor defect during the pre-use inspection?',
    answer:
      "No. If any defect is found that could affect the safe operation of the MEWP or the safety of the operator or others, the machine must be isolated, tagged, and reported immediately. Only once the defect has been properly rectified by a competent person and the machine has been re-inspected should it be returned to service. Never attempt to 'work around' a defect.",
  },
  {
    question: 'Do I need to carry out a pre-use inspection on a brand-new or recently hired MEWP?',
    answer:
      "Yes, absolutely. Every MEWP must receive a pre-use inspection before every use, regardless of whether it is new, recently serviced, or freshly delivered from a hire company. Damage can occur during transport, and you cannot rely on someone else's checks. The operator is personally responsible for verifying the machine is safe before each use.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Familiarisation on a specific MEWP is required:',
    options: [
      'Only if the operator has never used any MEWP before',
      'Every time an operator uses a specific make and model for the first time',
      'Only on machines older than five years',
      'Only when the employer decides it is necessary',
    ],
    correctAnswer: 1,
    explanation:
      'Familiarisation is required every time an operator encounters a specific make and model they have not used before, regardless of their training or experience on other machines.',
  },
  {
    id: 2,
    question: 'Which of the following must be confirmed as present on the MEWP before use?',
    options: [
      "The hire company's invoice",
      'A photograph of the last operator',
      "The manufacturer's operator manual",
      'A copy of the Building Regulations',
    ],
    correctAnswer: 2,
    explanation:
      "The manufacturer's operator manual must be present on the machine at all times. It contains critical information about the machine's operation, limitations, warnings, and emergency procedures.",
  },
  {
    id: 3,
    question:
      'What is the maximum interval for a thorough examination certificate on a MEWP used for lifting persons?',
    options: ['12 months', '6 months', '3 months', '24 months'],
    correctAnswer: 1,
    explanation:
      'Under LOLER 1998, any lifting equipment used for lifting persons (including MEWPs) must have a thorough examination at least every 6 months. The current certificate must be available on site.',
  },
  {
    id: 4,
    question:
      'During the pre-use inspection, the machine must be in what state before you begin mechanical and structural checks?',
    options: [
      'Running at full speed',
      'Elevated to maximum height',
      'Isolated (switched off, controls at neutral)',
      'Connected to an external power supply',
    ],
    correctAnswer: 2,
    explanation:
      "The machine must be ISOLATED before carrying out the physical inspection. This means the machine is switched off with all controls in the neutral position, ensuring the operator's safety during the checks.",
  },
  {
    id: 5,
    question: 'Which of the following is NOT part of the controls and safety systems check?',
    options: [
      'Testing that all emergency stops function correctly',
      'Verifying that controls return to neutral when released',
      "Checking the operator's driving licence",
      'Testing the emergency/auxiliary lowering system',
    ],
    correctAnswer: 2,
    explanation:
      "Checking the operator's driving licence is not part of the MEWP controls and safety systems check. The check covers all platform and ground-level controls, emergency stops, emergency lowering, alarms, limit switches, tilt sensors, and overload protection.",
  },
  {
    id: 6,
    question: 'What should you do FIRST if you discover a fault during the pre-use inspection?',
    options: [
      'Continue using the machine carefully',
      'Isolate the machine immediately',
      'Ask another operator to check it',
      'Wait until the end of the shift to report it',
    ],
    correctAnswer: 1,
    explanation:
      'The first action is to ISOLATE the machine immediately. Then tag it, report the fault to your employer and the MEWP owner/hire company, and do not use it until the fault has been rectified by a competent person.',
  },
  {
    id: 7,
    question:
      'Approximately what proportion of rental company-reported MEWP accidents occur during delivery and collection?',
    options: ['About one tenth', 'About one quarter', 'About one third', 'About one half'],
    correctAnswer: 2,
    explanation:
      'About one third of rental company-reported accidents occur during delivery and collection. This highlights why familiarisation on each specific machine — including understanding its transport and set-up procedures — is so important.',
  },
  {
    id: 8,
    question:
      'When inspecting fall protection equipment, what should you look for on the harness webbing?',
    options: [
      'Only whether it is the correct colour for the site',
      'Cuts, fraying, abrasion, chemical damage, UV degradation, and stitching condition',
      'Just whether it is the correct size',
      "Only whether it has a manufacturer's label",
    ],
    correctAnswer: 1,
    explanation:
      "Harness webbing must be thoroughly checked for cuts, fraying, abrasion, chemical damage, UV degradation, and the condition of all stitching. Any defect in the webbing can compromise the harness's ability to arrest a fall.",
  },
];

export default function MewpModule3Section1() {
  useSEO({
    title: 'Familiarisation & Pre-Use Inspection | MEWP Module 3.1',
    description:
      'MEWP familiarisation requirements, pre-use inspection checklists covering documentation, mechanical, structural, controls, safety systems, and fall protection equipment checks.',
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
            <Search className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 3 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Familiarisation &amp; the Pre-Use Inspection
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to carry out a thorough familiarisation and systematic pre-use inspection on every
            MEWP before you operate it
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Familiarisation:</strong> Every specific machine, every time
              </li>
              <li>
                <strong>Pre-use:</strong> Daily / start of each shift
              </li>
              <li>
                <strong>Defect:</strong> Isolate &rarr; Tag &rarr; Report
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Documents:</strong> Thorough exam cert, operator manual, defect log
              </li>
              <li>
                <strong>Physical:</strong> Wheels, hydraulics, structure, platform
              </li>
              <li>
                <strong>Functional:</strong> Controls, emergency stops, safety systems
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the purpose and scope of familiarisation',
              'Distinguish familiarisation from operator training',
              'Describe when a pre-use inspection is required',
              'Carry out documentation, mechanical, and structural checks',
              'Test controls and safety systems systematically',
              'Inspect fall protection equipment before use',
              'Follow the correct procedure when defects are found',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Familiarisation — Every Machine, Every Time */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Familiarisation &mdash; Every Machine, Every Time
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Familiarisation is <strong>not</strong> the same as training. It is a separate,
                short activity that must be carried out on{' '}
                <strong>every specific make and model</strong> of MEWP before an operator uses it,
                even if they hold a valid IPAF or equivalent licence. Training teaches you how to
                operate a category of MEWP; familiarisation ensures you understand the particular
                machine in front of you.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white mb-3">
                  <strong className="text-elec-yellow">Key Definition:</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Training</p>
                    <p className="text-sm text-white/80">
                      A formal, assessed course (e.g. IPAF) that teaches the skills and knowledge to
                      operate a <strong>category</strong> of MEWP (e.g. 3a scissor lift, 3b boom
                      lift). Typically one or more days. Results in a licence or certificate.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Familiarisation</p>
                    <p className="text-sm text-white/80">
                      A short, machine-specific activity carried out on the{' '}
                      <strong>individual make and model</strong> before first use. Covers that
                      machine&rsquo;s unique controls, features, limitations, warnings, and
                      emergency lowering procedures. Does not replace training.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                During familiarisation, you must confirm that the{' '}
                <strong>manufacturer&rsquo;s operating manual is present on the machine</strong>.
                Without the manual, the machine must not be used.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Familiarisation Must Cover:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Machine features, functions, devices, limitations, warnings, and operating
                      characteristics specific to that make and model
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The location and operation of all controls (platform and ground level)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Emergency lowering procedures for that specific machine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The safe working load (SWL) and rated capacity of the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Local site requirements and any site-specific rules or restrictions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Delivery &amp; Collection Risk</p>
                </div>
                <p className="text-sm text-white/80">
                  Approximately <strong>one third</strong> of rental company-reported MEWP accidents
                  occur during delivery and collection. This underlines why familiarisation with
                  each specific machine &mdash; including its transport, loading, and set-up
                  procedures &mdash; is so critical. Never assume one machine operates identically
                  to another, even within the same product range.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When to Carry Out a Pre-Use Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When to Carry Out a Pre-Use Inspection
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A pre-use inspection must be carried out{' '}
                <strong>daily or at the start of each shift</strong> before the MEWP is operated.
                IPAF recommends carrying out a brief check{' '}
                <strong>both before and after use</strong> to identify any defects that may have
                developed during the working period.
              </p>

              <p>
                A thorough pre-use inspection typically takes between{' '}
                <strong>15 and 30 minutes</strong> if no defects are found. The exact duration
                depends on the size and complexity of the machine. Never rush the inspection &mdash;
                it is the single most important safety check before operating the MEWP.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Critical Rule:</strong> The machine must be{' '}
                  <strong>ISOLATED</strong> (switched off, all controls at neutral) before carrying
                  out the physical inspection. You must follow the{' '}
                  <strong>manufacturer&rsquo;s instruction manual</strong> for the specific
                  inspection procedure for that make and model.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  A Pre-Use Inspection Is Also Required:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>After any incident, collision, or near miss involving the MEWP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>After severe weather (high winds, heavy rain, frost, lightning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>After transportation to a new site (damage may occur in transit)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>After a prolonged period of disuse or storage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Documentation Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documentation Checks
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before physically inspecting the machine, you must first verify that all required
                documentation is present and current. Missing or expired documentation means the
                MEWP must not be used until the issue is resolved.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Documentation Checklist</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Current thorough examination certificate
                      </strong>{' '}
                      &mdash; must be within the last <strong>6&nbsp;months</strong> for any MEWP
                      used to lift persons (LOLER 1998 requirement). Check the date and confirm it
                      has not expired.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Manufacturer&rsquo;s operator manual</strong>{' '}
                      &mdash; must be present on the machine at all times and be legible and
                      complete. If the manual is missing, do not operate the MEWP.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Defect reports from previous shifts</strong>{' '}
                      &mdash; review the defect log or report book to check whether any faults were
                      reported by the previous operator and whether they have been rectified.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Machine markings and data plates</strong>{' '}
                      &mdash; all warning labels, instruction plates, and safety markings must be
                      legible, securely fixed, and undamaged.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Safe working load (SWL) clearly displayed
                      </strong>{' '}
                      &mdash; the SWL/rated capacity must be clearly visible on the machine. If it
                      is missing or illegible, the MEWP must not be used.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Mechanical and Structural Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Mechanical &amp; Structural Checks
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                With the machine isolated, carry out a systematic walk-around inspection covering
                all mechanical and structural components. Use the manufacturer&rsquo;s manual as
                your guide and follow a consistent routine so that nothing is missed.
              </p>

              {/* Wheels & Tyres */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Wheels &amp; Tyres</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Security &mdash; wheel nuts tight, no missing or loose fixings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Tyre pressure &mdash; correct as per manufacturer&rsquo;s specification (use a
                      gauge if required)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Tyre condition &mdash; no cuts, bulges, excessive wear, or embedded objects
                    </span>
                  </li>
                </ul>
              </div>

              {/* Engine / Power Source */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Engine / Power Source</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Fluid levels &mdash; engine oil, coolant, and hydraulic fluid all at correct
                      levels
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Battery condition and charge &mdash; terminals clean, no corrosion, adequate
                      charge level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fuel level &mdash; sufficient for the planned work period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      No visible leaks &mdash; check under the machine for oil, coolant, or fuel on
                      the ground
                    </span>
                  </li>
                </ul>
              </div>

              {/* Hydraulics */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Hydraulics</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Hydraulic fluid level &mdash; at the correct level on the sight glass or
                      dipstick
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      No visible leaks &mdash; inspect all hoses, pipes, rams, and cylinders for oil
                      seepage or drips
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Hose condition &mdash; no cuts, chafing, bulges, kinks, or signs of
                      deterioration
                    </span>
                  </li>
                </ul>
              </div>

              {/* Hoses & Cables */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Hoses &amp; Cables</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Security &mdash; all hoses and cables securely clipped and routed correctly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Condition &mdash; no damage, cuts, fraying, or exposed conductors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Power track cable trays &mdash; undamaged, cables running freely without
                      snagging
                    </span>
                  </li>
                </ul>
              </div>

              {/* Structure / Boom / Scissor Pack */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Structure / Boom / Scissor Pack
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      General condition of chassis, boom sections, or scissor arms &mdash; no
                      visible damage, dents, or deformation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>No significant corrosion or misalignment of structural members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Pins and retaining clips &mdash; all secure, correctly fitted, no missing
                      components
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Chains &mdash; correct condition and tension (where fitted)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Guards, covers, and canopies &mdash; secure and undamaged</span>
                  </li>
                </ul>
              </div>

              {/* Platform / Basket */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Platform / Basket</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Guardrails &mdash; secure, undamaged, at the correct height, mid-rails in
                      place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Toe boards &mdash; in place around the full perimeter of the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Gate &mdash; functioning correctly, self-closing mechanism working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Floor condition &mdash; no holes, excessive wear, loose sections, or trip
                      hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Anchor points &mdash; present, undamaged, and securely fixed for fall
                      protection attachment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Controls and Safety Systems Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Controls &amp; Safety Systems Checks
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once the physical walk-around is complete and no defects have been found, start the
                machine and systematically test all controls and safety systems. These functional
                checks confirm that every operating and safety device is working correctly before
                you begin work at height.
              </p>

              {/* Controls */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Controls (Platform AND Ground Level)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All lift and travel controls functional &mdash; test each direction of
                      movement (up, down, left, right, extend, retract, slew)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Controls return to neutral when released &mdash; no sticking, binding, or
                      delayed response
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      No unintended movement &mdash; the machine must not move or drift when
                      controls are in the neutral position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Smooth, responsive operation &mdash; movements should be controlled and
                      proportional to the control input
                    </span>
                  </li>
                </ul>
              </div>

              {/* Safety Systems */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Safety Systems</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency stops</strong> &mdash; test at both
                      platform level AND ground level; machine must stop all functions immediately
                      when activated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency / auxiliary lowering system</strong>{' '}
                      &mdash; test the emergency lowering device to confirm it will bring the
                      platform down in the event of a power failure or control malfunction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Alarms and warning devices</strong> &mdash;
                      travel alarms, overload warnings, and any audible or visual warning devices
                      operational
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Limit switches</strong> &mdash; height, reach,
                      and travel limit switches functional and stopping the machine at the correct
                      points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pothole protection (scissor lifts)</strong>{' '}
                      &mdash; skirt or sensor system functional, triggering correctly when activated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tilt sensors / slope indicators</strong>{' '}
                      &mdash; functional and alarming or locking out when the machine exceeds the
                      safe operating angle
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Load sensing / overload protection</strong>{' '}
                      &mdash; functional and preventing operation when the platform load exceeds the
                      rated capacity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Outrigger / stabiliser interlocks (where fitted)
                      </strong>{' '}
                      &mdash; preventing platform elevation unless outriggers are fully deployed and
                      locked
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> Ground level controls
                  exist specifically so that a trained person on the ground can take over in an
                  emergency. You must test both sets of controls during the pre-use inspection. If
                  either set is non-functional, the machine must not be used.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Fall Protection Equipment Check */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Fall Protection Equipment Check
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Where fall protection equipment is required (e.g. a harness and lanyard in a
                boom-type MEWP), the operator must carry out a thorough visual and tactile check of
                all components before each use. This is a personal responsibility &mdash; never rely
                on someone else&rsquo;s check.
              </p>

              {/* Full Body Harness */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Full Body Harness</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Webbing:</strong> Check for cuts, fraying,
                      abrasion, chemical damage, UV degradation, and stitching integrity. Run your
                      hands along the full length of every strap.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hardware:</strong> Buckles, D-rings, and
                      connectors must all function correctly with no corrosion, distortion, cracks,
                      or sharp edges. Test each buckle opens and closes smoothly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Labels:</strong> Legible, securely attached,
                      and the harness must be within its periodic inspection date. If the label is
                      missing or unreadable, the harness must be withdrawn from service.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Lanyard */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Lanyard</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Condition &mdash; no cuts, fraying, abrasion, kinks, or signs of previous
                      loading (stretching or deformation)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Length adjustment mechanism &mdash; functioning correctly, locking securely at
                      the set length
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Shock absorber (if fitted) &mdash; indicator shows it has not been deployed;
                      pack intact and undamaged
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Connectors &mdash; karabiners or snap hooks functioning, gates closing and
                      locking correctly
                    </span>
                  </li>
                </ul>
              </div>

              {/* Anchor Point */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Anchor Point on MEWP</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Undamaged &mdash; no cracks, corrosion, bending, or signs of previous
                      overloading
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Securely fixed &mdash; bolts tight, no movement or play when tested by hand
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Correctly identified &mdash; use only the designated anchor point(s) specified
                      by the MEWP manufacturer
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: What to Do If Issues Are Found */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            What to Do If Issues Are Found
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If any defect, fault, or issue is discovered during the pre-use inspection &mdash;
                no matter how minor it may appear &mdash; you must follow a strict procedure to
                protect yourself and others. Never attempt to &ldquo;work around&rdquo; a defect or
                assume it is not serious enough to matter.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Defect Procedure &mdash; Five Steps
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-400">
                        ISOLATE the Machine Immediately
                      </p>
                      <p className="text-sm text-white/80">
                        Switch off the machine, remove the key (if applicable), and ensure all
                        controls are at neutral. Make the machine safe so it cannot be operated by
                        anyone else.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-orange-400">TAG the Equipment</p>
                      <p className="text-sm text-white/80">
                        Attach a clearly visible &ldquo;Do Not Use&rdquo; or defect tag to the
                        machine to inform other operatives that it is out of service. Do not remove
                        the tag until the defect is rectified.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-amber-400">REPORT the Fault</p>
                      <p className="text-sm text-white/80">
                        Report the defect to your employer/supervisor <strong>and</strong> to the
                        MEWP owner or hire company. Both parties need to know so that the fault can
                        be tracked, assessed, and rectified.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-blue-400">
                        Do NOT Use Until Rectified
                      </p>
                      <p className="text-sm text-white/80">
                        The MEWP must not be returned to service until the defect has been properly
                        rectified by a competent person and the machine has been re-inspected and
                        confirmed safe to use.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-green-400">RECORD the Defect</p>
                      <p className="text-sm text-white/80">
                        Record the defect in the inspection log or defect report book. Include the
                        date, time, machine identification, description of the fault, and your name.
                        This creates a written record for compliance and audit purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Never operate a defective MEWP.</strong> Operating
                  a MEWP with a known defect puts you, your colleagues, and members of the public at
                  serious risk of injury or death. It is also a breach of the Work at Height
                  Regulations 2005, PUWER 1998, and LOLER 1998, and could result in prosecution,
                  unlimited fines, and imprisonment.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../mewp-module-3-section-2">
              Next: Thorough Examination &amp; Maintenance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
