import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, FileText, ClipboardCheck, MessageSquare } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const ComponentsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          EPA Components
        </h1>
      </div>

      {/* Overview */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Three Components, One Grade
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your EPA consists of three components that together assess all the
            Knowledge, Skills, and Behaviours (KSBs) from the apprenticeship
            standard. You must pass all three to achieve your apprenticeship.
            Each component is assessed independently by your EPAO, and your
            overall grade reflects your combined performance across all three.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-white text-sm">
              <span className="text-blue-400 font-semibold">
                Assessment window:
              </span>{' '}
              All three components must be completed within a 3-month window
              after passing Gateway. Your EPAO will schedule each component
              within this period.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Component 1: Knowledge Test */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Component 1: Knowledge Test (25%)
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-400 text-sm">
                  Written Examination
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock className="h-3 w-3 text-white" />
                  <span className="text-white text-xs">
                    2 hours | Multiple choice & short answer
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white text-sm leading-relaxed">
              The knowledge test assesses your understanding of electrical
              theory, regulations, and safety principles. It is a written
              examination with a mix of multiple-choice questions and short-answer
              questions. You sit this under supervised exam conditions at a venue
              arranged by your EPAO.
            </p>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                Topics Covered
              </h4>
              {[
                'Electrical science and principles — Ohm\'s law, power calculations, AC theory, three-phase systems, impedance, reactance',
                'BS 7671:2018+A2:2022 Wiring Regulations — Part 1 to Part 7, especially Part 4 (Protection for Safety) and Part 6 (Inspection & Testing)',
                'Health and safety legislation — Electricity at Work Regulations 1989, CDM 2015, HASAWA 1974, PUWER, LOLER',
                'Installation methods and materials — cable types, containment systems, earthing arrangements (TN-S, TN-C-S, TT), circuit protective devices',
                'Testing and inspection procedures — initial verification, periodic inspection, safe isolation, instruments and their use',
                'Fault diagnosis theory — earth fault loop impedance, prospective fault current, insulation resistance, RCD testing, continuity',
                'Environmental technology — energy efficiency, renewable energy systems, EV charging installations',
                'Special locations — BS 7671 Part 7: bathrooms, swimming pools, agricultural, construction sites, marinas',
              ].map((topic) => (
                <div key={topic} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{topic}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-blue-400 font-semibold text-sm mb-2">
                What to Expect on the Day
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Supervised exam conditions — no phones, no talking, invigilator present',
                  'You may use a non-programmable calculator',
                  'BS 7671 Wiring Regulations book (clean copy, no annotations) is usually permitted — check with your EPAO',
                  'On-Site Guide may also be permitted — check with your EPAO',
                  'Questions are a mix of recall, application, and scenario-based',
                  'You will receive your result typically within 10 working days',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-white text-sm"
                  >
                    <span className="text-blue-400 font-bold">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-amber-400 font-semibold">
                  Typical pass mark:
                </span>{' '}
                Around 60% for Pass, 70%+ for Merit, 80%+ for Distinction. Exact
                thresholds vary by EPAO — your training provider will confirm
                the specific grade boundaries.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component 2: Practical Observation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Component 2: Practical Observation (50%)
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <ClipboardCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-400 text-sm">
                  Observed Practical Assessment
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock className="h-3 w-3 text-white" />
                  <span className="text-white text-xs">
                    6-8 hours | Observed by EPAO assessor
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white text-sm leading-relaxed">
              This is the largest component at 50% of your overall grade. An
              independent assessor from your EPAO observes you completing
              electrical installation work in a realistic working environment.
              This can take place at your workplace, your training provider's
              workshop, or at a designated assessment centre. The assessor
              watches you work, takes notes, and may ask clarifying questions.
            </p>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                What You Will Be Assessed On
              </h4>
              {[
                'Safe isolation procedures — the 5-step procedure must be followed correctly every time, including lock-off/tag-out and proving dead',
                'Installation of electrical systems — wiring circuits, connecting accessories, installing containment, working from drawings and specifications',
                'Testing and verification — continuity of protective conductors, insulation resistance, earth fault loop impedance, RCD operation, polarity',
                'Correct use of tools and equipment — calibrated test instruments, appropriate hand tools, power tools used safely',
                'Compliance with BS 7671 — correct cable selection, adequate protection, correct earthing arrangements, appropriate circuit design',
                'Quality of workmanship — neat cable runs, correct terminations, appropriate labelling, clean and tidy work area',
                'Risk assessment and method statements — identifying hazards, control measures, safe systems of work',
                'Working to specifications — interpreting drawings, following installation instructions, meeting customer requirements',
              ].map((topic) => (
                <div key={topic} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{topic}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-green-400 font-semibold text-sm mb-2">
                The Safe Isolation Procedure (5 Steps)
              </h4>
              <div className="space-y-2">
                {[
                  { step: '1', text: 'Identify the circuit or equipment to be worked on using drawings, schedules, and labels' },
                  { step: '2', text: 'Switch off — isolate the supply using the appropriate isolator, switch, or MCB' },
                  { step: '3', text: 'Secure the isolation — apply lock-off device and warning tags (LOTO)' },
                  { step: '4', text: 'Test — prove the voltage indicator is working on a known live source, test the isolated circuit to prove dead, then retest the voltage indicator on the known live source' },
                  { step: '5', text: 'Begin work only when you have confirmed the circuit is dead' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-xs font-bold">
                        {item.step}
                      </span>
                    </div>
                    <span className="text-white text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-red-400 font-semibold">
                  Critical:
                </span>{' '}
                Failure to follow safe isolation correctly can result in an
                immediate fail of the practical observation, regardless of the
                quality of all other work. This is a safety-critical procedure —
                practise it until it is second nature.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <h4 className="text-amber-400 font-semibold text-sm mb-2">
                On the Day
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Bring your own calibrated test instruments (multifunction tester, voltage indicator, proving unit)',
                  'Bring appropriate PPE and hand tools',
                  'The assessor will observe silently — they may ask you to explain what you are doing',
                  'Work at your normal pace — do not rush, quality matters more than speed',
                  'If you make a mistake, acknowledge it, correct it, and explain what you did',
                  'You will have a brief break built into the schedule',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-white text-sm"
                  >
                    <span className="text-amber-400 font-bold">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component 3: Professional Discussion */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            Component 3: Professional Discussion (25%)
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-400 text-sm">
                  Portfolio-Based Discussion
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock className="h-3 w-3 text-white" />
                  <span className="text-white text-xs">
                    60 minutes | 1-to-1 with EPAO assessor
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white text-sm leading-relaxed">
              The professional discussion is a structured, in-depth conversation
              between you and an EPAO assessor. It is based on your portfolio of
              evidence and covers the KSBs that are not fully assessed through
              the knowledge test and practical observation. This is NOT a
              question-and-answer exam — it is a professional conversation where
              you demonstrate your understanding, decision-making, and growth
              throughout your apprenticeship.
            </p>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                Topics You Will Discuss
              </h4>
              {[
                'Portfolio evidence — specific examples of work you have completed, with photographs, test results, certificates, and job sheets as evidence',
                'Problem-solving approaches — how you diagnosed faults, overcame challenges, and made decisions on site',
                'Professional behaviours — punctuality, reliability, working with others, representing your employer professionally',
                'Health and safety in practice — real examples of risk assessments, safe systems of work, near-miss reporting',
                'Customer service — how you communicated with clients, managed expectations, handled complaints or queries',
                'Career development — your CPD activities, future goals, how you keep up with regulation changes',
                'Regulatory knowledge — how you applied BS 7671, building regulations, and other standards in your work',
                'Environmental awareness — energy efficiency considerations, waste management, sustainable practices you have used',
              ].map((topic) => (
                <div key={topic} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{topic}</span>
                </div>
              ))}
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <h4 className="text-purple-400 font-semibold text-sm mb-2">
                Your Portfolio Must Include
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Evidence mapped to each KSB in the apprenticeship standard',
                  'Photographs of completed work with descriptions',
                  'Test results and certificates (e.g. initial verification, periodic inspection)',
                  'Risk assessments and method statements you created or used',
                  'Witness testimonies from your employer or supervisor',
                  'CPD records — courses, training days, self-study logs',
                  'Reflective accounts — what you learned from specific experiences',
                  'Any additional certificates (e.g. PASMA, IPAF, asbestos awareness)',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-white text-sm"
                  >
                    <span className="text-purple-400 font-bold">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <h4 className="text-amber-400 font-semibold text-sm mb-2">
                How to Perform Well
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Know your portfolio inside out — the assessor will pick examples from it',
                  'Use the STAR method: Situation, Task, Action, Result',
                  'Do not just describe what you did — explain WHY you made those decisions',
                  'Be honest about mistakes — assessors value reflection and learning',
                  'Speak confidently and professionally — this is your chance to demonstrate you are a competent electrician',
                  'If you do not understand a question, ask the assessor to rephrase it',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-white text-sm"
                  >
                    <span className="text-amber-400 font-bold">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weighting Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            Component Weightings
          </h2>
        </div>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            {[
              { name: 'Knowledge Test', weight: '25%', colour: 'text-blue-400', bar: 'bg-blue-400', width: 'w-1/4' },
              { name: 'Practical Observation', weight: '50%', colour: 'text-green-400', bar: 'bg-green-400', width: 'w-1/2' },
              { name: 'Professional Discussion', weight: '25%', colour: 'text-purple-400', bar: 'bg-purple-400', width: 'w-1/4' },
            ].map((comp) => (
              <div key={comp.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${comp.colour}`}>
                    {comp.name}
                  </span>
                  <span className="text-white text-sm font-bold">
                    {comp.weight}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className={`h-2 rounded-full ${comp.bar} ${comp.width}`}
                  />
                </div>
              </div>
            ))}
            <p className="text-white text-xs mt-2">
              The practical observation carries the most weight because it
              directly demonstrates your competence as an electrician. However,
              you must pass all three components — a strong practical alone
              is not enough.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Installation vs Maintenance Pathway */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Installation vs Maintenance Pathway
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              Both pathways fall under the same apprenticeship standard (ST0152
              v1.2) and the same EPA structure, but the focus of your assessment
              will differ based on your pathway.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-blue-400 font-semibold text-sm mb-2">
                Installation Electrician
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Practical observation focuses on new installation work — wiring from scratch, installing containment and accessories, working from plans',
                  'Knowledge test emphasises circuit design, cable selection, installation methods, and initial verification',
                  'Portfolio should demonstrate a range of installation projects — domestic, commercial, industrial',
                  'Professional discussion covers installation planning, specification interpretation, and quality assurance',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-white text-sm"
                  >
                    <span className="text-blue-400 font-bold">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-green-400 font-semibold text-sm mb-2">
                Maintenance Electrician
              </h4>
              <ul className="space-y-1.5">
                {[
                  'Practical observation focuses on fault finding, repair, and maintenance tasks — diagnosing issues, replacing components, periodic inspection',
                  'Knowledge test emphasises fault diagnosis theory, periodic inspection and testing, and maintenance planning',
                  'Portfolio should demonstrate maintenance activities — fault logs, repair records, planned preventive maintenance schedules',
                  'Professional discussion covers diagnostic approaches, maintenance strategies, and equipment lifecycle management',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-white text-sm"
                  >
                    <span className="text-green-400 font-bold">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-amber-400 font-semibold">Note:</span>{' '}
                The core KSBs are the same for both pathways. The difference is
                in the emphasis and the types of tasks you will encounter during
                the practical observation. Discuss your pathway with your
                training provider to ensure your preparation is correctly
                focused.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What Assessors Are Looking For */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            What Assessors Are Actually Looking For
          </h2>
        </div>

        <Card className="border-red-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              Understanding what assessors prioritise helps you focus your
              preparation on what matters most.
            </p>

            {[
              {
                title: 'Safety consciousness',
                description:
                  'Above everything else, assessors are checking that you work safely. Safe isolation, correct PPE, awareness of hazards, and safe systems of work are non-negotiable. An unsafe act can fail you instantly.',
              },
              {
                title: 'Competence, not perfection',
                description:
                  'Assessors are not expecting perfection. They want to see that you are a competent, reliable electrician who can work to industry standards. Making a small mistake and correcting it is fine — not recognising the mistake is the problem.',
              },
              {
                title: 'Understanding, not just doing',
                description:
                  'Can you explain WHY you are doing something, not just WHAT you are doing? This is the difference between a Pass and a higher grade. Understanding the principles behind the regulations shows deeper competence.',
              },
              {
                title: 'Professional behaviour',
                description:
                  'How you conduct yourself matters. Punctuality, communication, tidiness, respect for the assessment environment, and a professional attitude all contribute to the assessor\'s overall impression.',
              },
              {
                title: 'Self-checking and quality assurance',
                description:
                  'Do you check your own work? Do you verify test results make sense? Do you inspect connections before closing up? Self-checking demonstrates a mature, quality-focused approach.',
              },
              {
                title: 'Regulatory awareness',
                description:
                  'Can you reference specific regulations when explaining your decisions? Saying "BS 7671 requires..." or "Regulation 411.3.3 states..." shows you know the standards, not just the habits.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold text-sm">
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

      {/* How Components Link Together */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            How the Components Link Together
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              The three components are not isolated tests — they are designed to
              work together to give a complete picture of your competence.
            </p>
            {[
              'The knowledge test checks you understand the theory — the practical checks you can apply it',
              'Topics in your knowledge test may come up in your professional discussion — consistency matters',
              'Your portfolio evidence should support what you demonstrate in the practical — if you claim experience in three-phase work, your portfolio should show it',
              'Problem-solving demonstrated in the practical may be discussed further in the professional discussion',
              'Assessors may cross-reference your performance across components — strong practical but weak knowledge may raise questions',
              'Preparing for all three simultaneously is more effective than treating them as separate events',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Day-Of Checklist */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Assessment Day Checklist
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-blue-400 font-semibold text-sm mb-2">
                Knowledge Test Day
              </h4>
              <div className="space-y-1.5">
                {[
                  'Photo ID (driving licence or passport)',
                  'Non-programmable calculator',
                  'Clean copy of BS 7671 (if permitted by your EPAO)',
                  'On-Site Guide (if permitted by your EPAO)',
                  'Pens (black ink) and pencils',
                  'Water bottle (usually allowed)',
                  'Arrive at least 15 minutes early',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-green-400 font-semibold text-sm mb-2">
                Practical Observation Day
              </h4>
              <div className="space-y-1.5">
                {[
                  'Photo ID',
                  'Calibrated multifunction tester (check calibration sticker)',
                  'Calibrated voltage indicator (GS38 compliant)',
                  'Proving unit',
                  'Lock-off devices and warning tags',
                  'Full set of hand tools (screwdrivers, pliers, cutters, strippers, etc.)',
                  'PPE: safety boots, eye protection, gloves',
                  'Tape measure, spirit level, pencil',
                  'Cable knife or stripping tools',
                  'Packed lunch and water (you may be there all day)',
                  'Arrive at least 20 minutes early',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <h4 className="text-purple-400 font-semibold text-sm mb-2">
                Professional Discussion Day
              </h4>
              <div className="space-y-1.5">
                {[
                  'Photo ID',
                  'Your portfolio of evidence (physical or digital, as agreed)',
                  'Any additional certificates or documents referenced in your portfolio',
                  'Notes if permitted (check with your EPAO — some allow brief notes)',
                  'Smart/clean appearance — professional dress, not necessarily a suit',
                  'Arrive at least 15 minutes early',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Typical Assessment Order */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            Typical Assessment Order
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              The order of your EPA components is decided by your EPAO, but a
              common sequence is:
            </p>
            {[
              {
                step: '1',
                title: 'Knowledge Test (first)',
                description:
                  'Usually scheduled first because it confirms your theoretical understanding before the practical. Results may be available before your other components.',
              },
              {
                step: '2',
                title: 'Practical Observation (second)',
                description:
                  'Typically the most complex to schedule due to the 6-8 hour duration. May take place at your workplace, training provider, or assessment centre.',
              },
              {
                step: '3',
                title: 'Professional Discussion (last)',
                description:
                  'Often scheduled last because the assessor can reference your practical performance during the discussion. Usually at your training provider or via video call.',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 text-xs font-bold">
                    {item.step}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {item.title}
                  </p>
                  <p className="text-white text-sm mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mt-2">
              <p className="text-white text-sm">
                <span className="text-purple-400 font-semibold">Note:</span>{' '}
                Some EPAOs schedule all three on consecutive days, while others
                spread them over several weeks. Your training provider will
                confirm the schedule once your EPAO has arranged the dates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComponentsPage;
