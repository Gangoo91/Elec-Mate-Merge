import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const PreparationPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Preparation Guide
        </h1>
      </div>

      {/* Overview */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Prepare Effectively, Achieve Your Best
          </h2>
          <p className="text-white text-sm leading-relaxed">
            EPA preparation should not be a last-minute rush. The best results
            come from consistent preparation throughout your apprenticeship.
            This guide breaks down what to focus on for each component and gives
            you a realistic timeline for the final months before your
            assessment.
          </p>
        </CardContent>
      </Card>

      {/* Knowledge Test Prep */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Knowledge Test Preparation
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                Study Strategy
              </h4>
              {[
                'Start with BS 7671 — Part 4 (Protection for Safety) and Part 6 (Inspection & Testing) are heavily tested. Know where to find key regulations quickly',
                'Use the On-Site Guide alongside BS 7671 — it has simplified tables and flowcharts that help you understand the regulations in context',
                'Study Guidance Note 3 (Inspection & Testing, 9th Edition) for detailed testing procedures and expected results',
                'Practice cable sizing calculations — voltage drop (Table 4Ab), current-carrying capacity (Section 523), and correction factors (Cg, Ca, Ci, Cc)',
                'Learn the fault current formulas — Zs = Ze + (R1+R2), prospective fault current calculations, and maximum Zs values from Table 41.2/41.3',
                'Create flashcards for key BS 7671 regulation numbers — 411.3.3 (max disconnection times), 415.1.1 (RCD requirements), 612 (testing sequence)',
                'Practice with past papers or mock exams under timed conditions — the EPA Simulator in this app can help',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-white text-sm">{tip}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-blue-400 font-semibold text-sm mb-2">
                Key Areas to Revise
              </h4>
              <div className="space-y-1.5">
                {[
                  'Protection against electric shock (Part 411)',
                  'Protection against thermal effects (Part 421)',
                  'Protection against overcurrent (Part 432)',
                  'Earthing arrangements and protective conductors (Part 542-544)',
                  'Initial verification testing sequence (Regulation 612)',
                  'Special locations (Part 7) — bathrooms, swimming pools, construction sites',
                  'Isolation and switching (Section 537)',
                  'Selection and erection of wiring systems (Part 521-529)',
                ].map((area) => (
                  <div key={area} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Practical Observation Prep */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Practical Observation Preparation
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                Practice Strategy
              </h4>
              {[
                'Safe isolation — practise the 5-step procedure every single day at work until it is completely automatic. Verbalise each step as you do it',
                'Testing sequence — memorise and practise the correct sequence: continuity of protective conductors, continuity of ring final circuits, insulation resistance, polarity, earth fault loop impedance, RCD operation, prospective fault current',
                'Know your instruments — be completely comfortable with your multifunction tester (Megger, Fluke, Kewtech, etc.). Know how to select the right test, connect leads correctly, and interpret results',
                'Practise interpreting drawings — you will need to work from technical drawings and schedules. Practise reading circuit diagrams, wiring diagrams, and layout drawings',
                'Work methodically — develop a consistent approach to each task. Start with planning, gather materials, work systematically, test, and inspect your own work before moving on',
                'Quality of workmanship — neat cable runs, consistent bends, correct gland sizes, proper terminations, appropriate labelling. These details matter',
                'Time yourself — the practical is 6-8 hours but that goes quickly. Practise working at a steady, efficient pace without rushing',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-white text-sm">{tip}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-green-400 font-semibold text-sm mb-2">
                Instrument Checklist
              </h4>
              <p className="text-white text-sm mb-2">
                Make sure you are proficient with all of these before your EPA:
              </p>
              <div className="space-y-1.5">
                {[
                  'Multifunction tester — insulation resistance, continuity, earth loop, RCD, and PFC tests',
                  'Voltage indicator (proving unit / 2-pole tester) — GS38 compliant, for safe isolation',
                  'Proving unit — to verify your voltage indicator is working before and after testing',
                  'Low-resistance ohmmeter — for continuity testing (often built into multifunction tester)',
                  'Non-contact voltage detector (optional but useful) — never rely on it for safe isolation',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-red-400 font-semibold">
                  Calibration:
                </span>{' '}
                All test instruments must be in calibration (within the last 12
                months). Check the calibration sticker on your instruments
                before the day. Using out-of-calibration instruments could
                invalidate your test results and your assessment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Discussion Prep */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            Professional Discussion Preparation
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                Portfolio & Discussion Strategy
              </h4>
              {[
                'Start your portfolio from day one of your apprenticeship — collect evidence as you go, not in a last-minute panic before EPA',
                'Map every piece of evidence to specific KSBs in the apprenticeship standard — use a KSB mapping grid to track which areas are covered',
                'Include a variety of evidence types — photographs, test results, witness testimonies, reflective accounts, CPD records, certificates',
                'Write reflective accounts for significant pieces of work — describe what happened, what you did, why you made those decisions, and what you learned',
                'Prepare 3-5 strong examples that cover multiple KSBs — know these inside out and be ready to discuss them in depth',
                'Practise answering questions about your portfolio — get your employer, supervisor, or training provider to run mock discussions with you',
                'Use the STAR method for structuring answers: Situation (what was the context), Task (what was required), Action (what you did and why), Result (what happened)',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-white text-sm">{tip}</span>
                </div>
              ))}
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <h4 className="text-purple-400 font-semibold text-sm mb-2">
                Example STAR Response
              </h4>
              <div className="space-y-2 text-white text-sm">
                <p>
                  <span className="text-purple-400 font-semibold">
                    Situation:
                  </span>{' '}
                  "I was asked to investigate an intermittent tripping RCD on a
                  domestic consumer unit."
                </p>
                <p>
                  <span className="text-purple-400 font-semibold">Task:</span>{' '}
                  "I needed to identify the fault, determine the cause, and
                  carry out a safe repair."
                </p>
                <p>
                  <span className="text-purple-400 font-semibold">
                    Action:
                  </span>{' '}
                  "I safely isolated the supply, then systematically tested each
                  circuit using insulation resistance testing. I found a low IR
                  reading on the kitchen circuit. I traced it to a damaged cable
                  in the plinth area where moisture had penetrated a junction
                  box. I replaced the damaged section, re-tested, and all
                  readings were satisfactory."
                </p>
                <p>
                  <span className="text-purple-400 font-semibold">
                    Result:
                  </span>{' '}
                  "The RCD stopped tripping and all test results met the
                  requirements of BS 7671. I documented the repair and advised
                  the customer to have the junction box relocated to prevent
                  future moisture ingress."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preparation Timeline */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Preparation Timeline
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm">
              A suggested timeline for the final months before your EPA:
            </p>

            {[
              {
                period: '6 Months Before',
                tasks: [
                  'Review your portfolio — identify gaps in KSB evidence',
                  'Start filling evidence gaps with photographs, testimonies, and reflective accounts',
                  'Begin regular revision of BS 7671 — focus on one Part per week',
                  'Practise safe isolation daily at work',
                ],
              },
              {
                period: '3 Months Before',
                tasks: [
                  'Complete your portfolio — all KSBs should be covered',
                  'Start mock tests — use past papers or the EPA Simulator',
                  'Practise full testing sequences with your instruments',
                  'Have your first mock professional discussion with your training provider',
                ],
              },
              {
                period: '1 Month Before',
                tasks: [
                  'Intensify revision — focus on weak areas identified in mock tests',
                  'Check all test instruments are calibrated and working correctly',
                  'Practise timed practical tasks — build confidence in your speed',
                  'Have a final mock professional discussion — refine your answers',
                  'Review your portfolio one final time — ensure it is well-organised and indexed',
                ],
              },
              {
                period: '1 Week Before',
                tasks: [
                  'Light revision only — do not cram, trust your preparation',
                  'Check you have everything ready: instruments, PPE, tools, portfolio',
                  'Get a good night\'s sleep before each assessment',
                  'Confirm times, locations, and what to bring with your training provider',
                ],
              },
            ].map((phase) => (
              <div key={phase.period}>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 mb-2">
                  <span className="text-amber-400 font-bold text-sm">
                    {phase.period}
                  </span>
                </div>
                <div className="space-y-1.5 ml-1">
                  {phase.tasks.map((task) => (
                    <div key={task} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Common Calculations to Practise */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            Key Calculations to Practise
          </h2>
        </div>

        <Card className="border-red-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm">
              These calculations frequently appear in the knowledge test and may
              be relevant during your practical observation:
            </p>

            {[
              {
                title: 'Voltage Drop',
                formula: 'VD = (mV/A/m x Ib x L) / 1000',
                explanation:
                  'Maximum 3% for lighting circuits (6.9V on 230V), 5% for other circuits (11.5V on 230V). Use Table 4Ab in BS 7671 for mV/A/m values.',
              },
              {
                title: 'Earth Fault Loop Impedance',
                formula: 'Zs = Ze + (R1 + R2)',
                explanation:
                  'Must not exceed the maximum Zs values in Table 41.2 (BS-type MCBs) or Table 41.3 (fuses) for the relevant disconnection time.',
              },
              {
                title: 'Prospective Fault Current',
                formula: 'IPFC = Uo / Zs',
                explanation:
                  'Must not exceed the rated breaking capacity of the protective device. Measured at the origin and at the most remote point.',
              },
              {
                title: 'Current-Carrying Capacity',
                formula: 'It = Ib / (Ca x Cg x Ci x Cc)',
                explanation:
                  'Ca = ambient temperature, Cg = grouping, Ci = insulation, Cc = semi-enclosed fuse. The chosen cable must have a tabulated rating (It) greater than the design current.',
              },
              {
                title: 'Diversity',
                formula: 'Assessed demand = connected load x diversity factor',
                explanation:
                  'Used to calculate the maximum demand on a circuit or installation. Diversity factors are in the IET On-Site Guide Table 1B.',
              },
              {
                title: 'Power Calculations',
                formula: 'P = V x I, P = I² x R, P = V² / R',
                explanation:
                  'Single-phase and three-phase power calculations. For three-phase: P = √3 x VL x IL x cos φ.',
              },
            ].map((calc) => (
              <div key={calc.title} className="bg-white/5 rounded-lg p-3">
                <p className="text-red-400 font-semibold text-sm">
                  {calc.title}
                </p>
                <p className="text-elec-yellow text-sm font-mono mt-1">
                  {calc.formula}
                </p>
                <p className="text-white text-sm mt-1">{calc.explanation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Key BS 7671 Regulation Numbers */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            BS 7671 Regulations to Know
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm">
              These regulation numbers come up frequently — know where to find
              them quickly:
            </p>
            {[
              { reg: '411.3.3', topic: 'Maximum disconnection times for final circuits (0.4s for TN, 0.2s for TT)' },
              { reg: '411.4.9', topic: 'Socket outlets up to 32A require 30mA RCD protection' },
              { reg: '415.1.1', topic: 'Additional protection by RCD — requirements and applications' },
              { reg: '421.1.201', topic: 'Protection against fire — cable selection in escape routes' },
              { reg: '432.1', topic: 'Protection against overcurrent — overload and fault current' },
              { reg: '522.6.201', topic: 'Cables in walls — safe zones and RCD protection' },
              { reg: '537.1.4', topic: 'Switching off for mechanical maintenance — isolation requirements' },
              { reg: '542.4', topic: 'Main earthing terminal and conductors' },
              { reg: '543.1', topic: 'Cross-sectional areas of protective conductors — Table 54.7' },
              { reg: '612.1', topic: 'Initial verification — the testing sequence' },
              { reg: '631.1', topic: 'Periodic inspection and testing requirements' },
              { reg: '701', topic: 'Special locations: bathrooms and shower rooms' },
              { reg: '711', topic: 'Special locations: exhibitions, shows, and stands' },
              { reg: '717', topic: 'Special locations: mobile or transportable units' },
              { reg: '722', topic: 'Special locations: electric vehicle charging installations' },
            ].map((item) => (
              <div key={item.reg} className="flex items-start gap-2">
                <span className="text-amber-400 font-mono font-bold text-sm min-w-[80px] flex-shrink-0">
                  {item.reg}
                </span>
                <span className="text-white text-sm">{item.topic}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Mental Preparation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Mental Preparation
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              EPA is as much a mental challenge as a technical one. Managing
              nerves and maintaining confidence are essential.
            </p>
            {[
              {
                title: 'Trust your training',
                description:
                  'You have been learning and practising for 3-4 years. The skills and knowledge are there. EPA is about demonstrating what you already know, not learning something new.',
              },
              {
                title: 'Visualise success',
                description:
                  'Before each component, visualise yourself completing it successfully. Picture yourself walking through the practical calmly and competently.',
              },
              {
                title: 'Control what you can control',
                description:
                  'You cannot control the questions or tasks you get, but you can control your preparation, your attitude, and your response to challenges.',
              },
              {
                title: 'Manage nerves',
                description:
                  'Some nerves are normal and can actually improve performance. If anxiety is overwhelming, try slow breathing (4 seconds in, 4 seconds hold, 4 seconds out) before starting.',
              },
              {
                title: 'Sleep and nutrition',
                description:
                  'Get at least 7-8 hours of sleep the night before. Eat a proper breakfast. Stay hydrated. Your brain and body need fuel to perform at their best.',
              },
              {
                title: 'Arrive early',
                description:
                  'Rushing to arrive on time adds stress. Arrive 15-20 minutes early, settle in, and compose yourself before the assessment begins.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-semibold text-sm">
                    {item.title}
                  </p>
                  <p className="text-white text-sm mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Resources */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            Recommended Study Resources
          </h2>
        </div>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            {[
              {
                title: 'BS 7671:2018+A2:2022',
                description:
                  'The Wiring Regulations — your primary reference. Make sure you have the current edition with Amendment 2. A3:2024 is a free supplement adding Regulation 530.3.201.',
              },
              {
                title: 'IET On-Site Guide',
                description:
                  'Simplified tables and guidance for common installations. Essential for quick reference during practical work.',
              },
              {
                title: 'IET Guidance Note 3 (9th Edition)',
                description:
                  'Inspection & Testing — detailed guidance on testing procedures, expected results, and documentation.',
              },
              {
                title: 'IET Guidance Note 1',
                description:
                  'Selection & Erection — helps with understanding cable selection, protection, and installation methods.',
              },
              {
                title: 'IET Guidance Note 8',
                description:
                  'Earthing & Bonding — essential for understanding earthing arrangements, protective conductors, and supplementary bonding.',
              },
              {
                title: 'Electrician\'s Guide to the Building Regulations',
                description:
                  'Covers Part P requirements and how electrical work interacts with building regulations.',
              },
              {
                title: 'EPA Readiness Simulator (this app)',
                description:
                  'AI-powered mock knowledge tests and professional discussions. Practise anytime on your phone.',
              },
              {
                title: 'AM2 Simulator (this app)',
                description:
                  'Practise AM2-style practical scenarios and fault-finding exercises to prepare for your AM2 assessment.',
              },
              {
                title: 'Your Training Provider Materials',
                description:
                  'Course notes, handouts, and mock papers from your training provider. These are specifically tailored to your EPA.',
              },
            ].map((resource) => (
              <div key={resource.title}>
                <p className="text-elec-yellow font-semibold text-sm">
                  {resource.title}
                </p>
                <p className="text-white text-sm mt-0.5">
                  {resource.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreparationPage;
