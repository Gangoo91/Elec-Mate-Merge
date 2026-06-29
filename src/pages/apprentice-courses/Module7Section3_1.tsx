import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Tripping MCBs or RCDs - Module 7.3.1 | Level 2 Electrical Course';
const DESCRIPTION =
  'Understanding the causes and professional response to tripping MCBs and RCDs in electrical installations according to BS 7671.';

const quickCheckQuestions = [
  {
    id: 1,
    question: 'What does an MCB protect against?',
    options: [
      'Voltage drop along long cable runs',
      'Overcurrent conditions',
      'Poor power factor on the supply',
      'Earth leakage to exposed metalwork',
    ],
    correctIndex: 1,
    explanation:
      'MCBs protect against overcurrent, which may result from overload or short circuit conditions, protecting conductors and equipment from overheating.',
  },
  {
    id: 2,
    question: 'What does an RCD protect against?',
    options: [
      'Overload on the final circuit',
      'Short circuits between live conductors',
      'Earth leakage and electric shock',
      'Voltage spikes from switching surges',
    ],
    correctIndex: 2,
    explanation:
      'RCDs protect against earth leakage and electric shock by monitoring current balance between line and neutral conductors.',
  },
  {
    id: 3,
    question:
      'Under BS 7671:2018+A4:2026, what is the maximum disconnection time for a general (non-delay) RCD tested at its rated residual operating current (1×IΔn)?',
    options: [
      'Within 10 seconds',
      'Within 1 second',
      'Within 5 seconds',
      'Within 300 milliseconds',
    ],
    correctIndex: 3,
    explanation:
      'A4:2026 deleted Appendix 3 Table 3A and the ×5 IΔn test. RCD effectiveness is now verified by a single test at the rated residual operating current (1×IΔn); a general (non-delay) RCD must disconnect within 300 ms (Reg 643.8 NOTE). In practice many devices operate far faster (often around 25–40 ms), but 300 ms is the regulatory limit.',
  },
];

const Module7Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: 'What does an MCB protect against?',
      options: [
        'Earth leakage to exposed metalwork',
        'Voltage drop on long circuits',
        'Overcurrent conditions',
        'Poor power factor on the load',
      ],
      correctAnswer: 2,
      explanation:
        'MCBs protect against overcurrent, which may result from overload or short circuit conditions.',
    },
    {
      id: 2,
      question: 'What does an RCD protect against?',
      options: [
        'Earth leakage and electric shock',
        'Short circuits between live conductors',
        'Sustained overload conditions',
        'Voltage fluctuations on the supply',
      ],
      correctAnswer: 0,
      explanation:
        'RCDs protect against earth leakage and electric shock by monitoring current balance.',
    },
    {
      id: 3,
      question: 'How does an RCD detect a fault?',
      options: [
        'By sensing the heat generated in the conductors',
        'By comparing the rated current to the actual load',
        'By monitoring current balance between line and neutral',
        'By measuring the voltage across the protective device',
      ],
      correctAnswer: 2,
      explanation:
        'RCDs work by constantly monitoring the balance between current flowing out through line and returning through neutral.',
    },
    {
      id: 4,
      question: 'Give one common cause of repeated MCB tripping.',
      options: [
        'A high earth fault loop impedance reading',
        'Overloaded circuit with too many appliances',
        'A loose earthing conductor at the main terminal',
        'Reversed line and neutral at a socket outlet',
      ],
      correctAnswer: 1,
      explanation:
        'Overloaded circuits with too many appliances connected are a common cause of repeated MCB tripping.',
    },
    {
      id: 5,
      question: 'Give one common cause of repeated RCD tripping.',
      options: [
        'Undersized protective conductors',
        'A loose neutral connection at the consumer unit',
        'Moisture ingress or deteriorating insulation',
        'Excessive voltage drop on the final circuit',
      ],
      correctAnswer: 2,
      explanation:
        'Moisture ingress, deteriorating insulation, or faulty appliances leaking current to earth commonly cause RCD tripping.',
    },
    {
      id: 6,
      question: 'Why must frequent tripping never be ignored?',
      options: [
        'It indicates dangerous conditions that could lead to fire or shock',
        'It always means the protective device itself is faulty',
        'It causes the supply voltage to drop below acceptable limits',
        'It shortens the working life of the consumer unit busbar',
      ],
      correctAnswer: 0,
      explanation:
        'Frequent tripping indicates dangerous conditions; ignoring it risks fire, injury, and potentially prosecution.',
    },
    {
      id: 7,
      question: 'What sequence of steps should an electrician follow after a device trips?',
      options: [
        'Reset the device immediately and monitor for further trips',
        'Temporarily bypass the device until it can be replaced',
        'Replace the device with one of a higher current rating',
        'Isolate, test, identify, repair, then re-energise',
      ],
      correctAnswer: 3,
      explanation:
        'The professional process is: isolate the circuit, test using appropriate instruments, identify and correct the fault, then re-energise.',
    },
    {
      id: 8,
      question: 'What risk arises from repeatedly resetting a device without investigation?',
      options: [
        'The supply voltage gradually rises above safe limits',
        'An escalating hazard potentially leading to fires or shocks',
        'The protective device becomes desensitised and slow to trip',
        'The earth fault loop impedance steadily increases',
      ],
      correctAnswer: 1,
      explanation:
        'Resetting without finding the cause risks escalating the hazard, potentially leading to fires, shocks, or equipment damage.',
    },
    {
      id: 9,
      question: 'Why is it dangerous to replace a tripping breaker with a higher-rated one?',
      options: [
        'It removes the safety barrier that prevents serious accidents',
        'It increases the prospective fault current at the board',
        'It causes nuisance tripping on the neighbouring circuits',
        'It reduces the disconnection time below the required limit',
      ],
      correctAnswer: 0,
      explanation:
        'Uprating removes the safety barrier designed to protect against dangerous conditions, increasing risk of fire and injury.',
    },
    {
      id: 10,
      question:
        'In the real-world example of the student flats, what fault caused the RCD to trip?',
      options: [
        'A loose neutral connection in the consumer unit',
        'An undersized cable supplying the kitchen sockets',
        'An internal insulation fault in a microwave',
        'A reversed polarity fault at a socket outlet',
      ],
      correctAnswer: 2,
      explanation:
        'The microwave had developed an internal insulation fault, causing current to leak to earth and trip the RCD repeatedly.',
    },
  ];

  const faqs = [
    {
      question: 'Do MCBs and RCDs protect against the same conditions?',
      answer:
        'No. MCBs protect against overcurrent conditions (overloads and short circuits), while RCDs protect against earth leakage and electric shock. They serve different protective functions.',
    },
    {
      question: 'Can an appliance cause tripping?',
      answer:
        'Yes, faulty or damp appliances are a common cause of RCD trips. Appliances with insulation faults or moisture ingress can leak current to earth, causing the RCD to operate.',
    },
    {
      question: 'Should you ever repeatedly reset a tripping device without investigating?',
      answer:
        'Absolutely not. The cause must be identified and corrected before restoring power. Repeated resetting without investigation risks escalating dangerous conditions.',
    },
    {
      question: 'What tests should be carried out after a protective device trips?',
      answer:
        'Appropriate tests include continuity and insulation resistance tests, earth fault loop impedance testing, and RCD trip-time testing to verify correct operation.',
    },
    {
      question: 'How can you identify whether the fault is in the wiring or an appliance?',
      answer:
        'Ask occupants about the circumstances - if tripping occurs only when a specific appliance is used, the fault likely lies with that appliance rather than the fixed wiring.',
    },
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 3</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white">•</span>
              <span className="text-white">Section 3.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Tripping MCBs or RCDs
            </h1>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">
              Understanding the causes and professional response to protective device operation in
              electrical installations.
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white space-y-1 text-sm list-disc pl-4">
              <li>MCBs and RCDs trip to prevent dangerous conditions, not as inconveniences.</li>
              <li>
                MCBs protect against overcurrent; RCDs protect against earth leakage and shock.
              </li>
              <li>
                Every trip must be investigated - resetting without finding the cause escalates
                risk.
              </li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white space-y-2 text-sm list-disc pl-4">
              <li>Explain the function of MCBs and RCDs in electrical protection systems.</li>
              <li>
                Describe the conditions that cause protective devices to trip and their warning
                significance.
              </li>
              <li>
                Interpret tripping as a warning sign of underlying electrical faults requiring
                investigation.
              </li>
              <li>
                Outline the correct professional response sequence when protective devices operate.
              </li>
              <li>
                Apply systematic fault-finding techniques to identify and resolve tripping causes.
              </li>
            </ul>
          </section>

          {/* Understanding Protective Device Functions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Understanding MCB and RCD Functions
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a Miniature Circuit Breaker (MCB) or Residual Current Device (RCD) trips, it is
                never just an inconvenience. These protective devices are designed to disconnect
                electrical supply in dangerous situations, preventing electric shock, overheating,
                and fire.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">MCB Protection Functions</p>
                <p className="text-sm mb-2">
                  <strong className="text-white">Overcurrent protection:</strong> MCBs protect
                  against excessive current flow.
                </p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>
                    Protects against overload conditions when circuit current exceeds safe limits
                  </li>
                  <li>Protects against short circuit faults with very high fault currents</li>
                  <li>Prevents conductor overheating that could cause fires</li>
                  <li>Protects accessories and equipment from thermal damage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">RCD Protection Functions</p>
                <p className="text-sm mb-2">
                  <strong className="text-white">Earth leakage protection:</strong> RCDs protect
                  against shock and fire from earth faults.
                </p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Monitors current balance between line and neutral conductors</li>
                  <li>Detects current leaking to earth through faults or human contact</li>
                  <li>A 30 mA RCD provides additional protection against electric shock; under A4:2026 a general RCD must disconnect within 300 ms at 1×IΔn, though in practice it often operates much faster</li>
                  <li>Provides additional protection against fire caused by earth faults</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mcb-rcd-function-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Common Causes of Tripping */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Common Causes and Investigation Requirements
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When either device trips, the underlying reason must be investigated. Understanding
                common causes helps direct fault-finding efforts.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">MCB Tripping Causes</p>
                <p className="text-sm mb-2">
                  <strong className="text-white">Overload conditions:</strong> Too much load
                  connected to the circuit.
                </p>
                <ul className="text-sm list-disc pl-4 space-y-1 mb-3">
                  <li>Multiple high-current appliances used simultaneously</li>
                  <li>Extension leads with multiple devices plugged in</li>
                  <li>Gradual increase in load over time without circuit review</li>
                  <li>Appliances drawing more current than their rating due to faults</li>
                </ul>
                <p className="text-sm mb-2">
                  <strong className="text-white">Short circuit faults:</strong> Direct connection
                  between live conductors.
                </p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Damaged cable insulation allowing conductor contact</li>
                  <li>Loose connections causing arcing and eventual short circuit</li>
                  <li>Moisture ingress causing tracking between conductors</li>
                  <li>Physical damage to cables from drilling or impact</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">RCD Tripping Causes</p>
                <p className="text-sm mb-2">
                  <strong className="text-white">Current leakage to earth:</strong> Through various
                  paths.
                </p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Moisture ingress into electrical equipment or accessories</li>
                  <li>Deteriorating insulation in cables or appliances</li>
                  <li>Faulty appliances with internal insulation breakdown</li>
                  <li>Damaged cables with conductor-to-earth contact</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="rcd-protection-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Professional Investigation Process */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Professional Investigation Process
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A professional electrician follows a clear, systematic process when protective
                devices trip.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Initial Response</p>
                <p className="text-sm mb-2">Safe isolation and circuit confirmation:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Isolate the affected circuit and confirm it is safe to work on</li>
                  <li>Gather information from users about circumstances of tripping</li>
                  <li>Visually inspect for obvious damage or moisture ingress</li>
                  <li>Check for burning smells or heat damage indicators</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Testing Procedures</p>
                <p className="text-sm mb-2">Use appropriate instruments to identify faults:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Continuity tests to check conductor integrity and connections</li>
                  <li>Insulation resistance tests to verify conductor separation</li>
                  <li>Earth fault loop impedance to ensure protection operates correctly</li>
                  <li>RCD trip-time testing to verify device function within standards</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Fault Correction</p>
                <p className="text-sm mb-2">Address the root cause before re-energising:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Repair damaged cables or replace if beyond economic repair</li>
                  <li>Tighten loose connections and check joint integrity</li>
                  <li>Replace defective appliances or advise users of faults</li>
                  <li>Address load distribution if overload was the cause</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="rcd-speed-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians should also consider the information provided by occupants. For
                example, if an RCD trips only when a certain appliance is in use, the fault may lie
                with that appliance rather than the fixed wiring. If an MCB trips whenever several
                heaters or kettles are used at once, this points to an overload condition rather
                than a fault in the wiring itself.
              </p>
              <p>
                Asking the right questions often reveals important clues. Above all, protective
                devices must never be bypassed or uprated simply to stop tripping. Doing so removes
                the safety barrier that prevents serious accidents.
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="font-medium text-amber-400 mb-2">Critical Safety Point</p>
                <p className="text-sm">
                  Never bypass or uprate protective devices to stop tripping. This removes essential
                  safety protection and significantly increases the risk of fire, electric shock,
                  and equipment damage.
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Student Flats RCD Tripping</p>
                <p className="text-white text-sm mb-2">
                  In a block of student flats, residents reported that the RCD protecting their
                  kitchen circuits tripped several times a day. Maintenance staff repeatedly reset
                  it without investigation, telling students to "just plug things in more
                  carefully."
                </p>
                <p className="text-white text-sm mb-2">
                  Eventually, one student received a shock from the metal casing of a microwave,
                  which had developed an internal insulation fault. The RCD had been providing
                  repeated warnings that current was leaking to earth, but these were ignored until
                  someone was injured.
                </p>
                <p className="text-white text-sm italic">
                  A proper investigation at the first sign of tripping would have identified the
                  faulty appliance and prevented harm.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Office Circuit Overload</p>
                <p className="text-white text-sm mb-2">
                  An office experienced frequent tripping of a ring circuit breaker during winter.
                  Staff had plugged multiple portable heaters into extension leads, overloading the
                  circuit.
                </p>
                <p className="text-white text-sm mb-2">
                  Instead of upgrading the breaker, the investigating electrician explained the
                  cause and arranged for additional circuits to be installed. By addressing the
                  underlying problem, the risk of overheating and fire was eliminated.
                </p>
                <p className="text-white text-sm italic">
                  Proper load assessment and circuit provision resolved the issue safely without
                  compromising protection.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                  <p className="font-medium text-white mb-2">{faq.question}</p>
                  <p className="text-white text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="text-white space-y-3 text-sm">
                <p>
                  Tripping MCBs and RCDs are not inconveniences; they are safety mechanisms designed
                  to signal dangerous conditions. An MCB trips when a circuit carries too much
                  current, protecting against overloads and short circuits. An RCD trips when
                  current leaks to earth, protecting against electric shock.
                </p>
                <p>
                  Frequent tripping is a symptom of underlying faults, such as damaged insulation,
                  overloading, or faulty appliances. The correct professional response is to
                  isolate, test, identify, repair, and only then re-energise.
                </p>
                <p>
                  Ignoring or bypassing these devices risks fire, injury, and prosecution. Every
                  operation of protective devices should be treated as a warning requiring immediate
                  investigation and appropriate corrective action.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Tripping MCBs or RCDs" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 3
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-2">
                Next: Sequence of Operation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section3_1;
