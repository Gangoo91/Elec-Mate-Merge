import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Isolation Procedures - MOET Module 1.1.2";
const DESCRIPTION = "Master safe isolation procedures for electrical engineering maintenance: the six-step process, GS38 proving units, BS 7671 requirements, and Electricity at Work Regulations 1989.";

const quickCheckQuestions = [
  {
    id: "isolation-first-step",
    question: "What is the FIRST step in the safe isolation procedure?",
    options: [
      "Lock off the isolator",
      "Test for dead",
      "Identify the source of supply and switch off",
      "Prove the voltage indicator"
    ],
    correctIndex: 2,
    explanation: "The first step is always to identify the correct source of supply and switch off the equipment or circuit. Attempting to isolate or lock off without first confirming you have the correct supply can lead to working on a live circuit."
  },
  {
    id: "gs38-requirement",
    question: "According to HSE Guidance Note GS38, what must you do with a voltage indicator BEFORE and AFTER testing for dead?",
    options: [
      "Calibrate it at a laboratory",
      "Prove it on a known live source",
      "Replace the batteries",
      "Check the expiry date only"
    ],
    correctIndex: 1,
    explanation: "GS38 requires that you prove your voltage indicator works on a known live source (a proving unit) both before and after testing for dead. This confirms the instrument was working correctly at the time of the test — it could have failed between the two proving checks."
  },
  {
    id: "regulation-12-eawr",
    question: "Regulation 12 of the Electricity at Work Regulations 1989 requires that:",
    options: [
      "All work must be carried out live",
      "Equipment must be made dead before work begins, where reasonably practicable",
      "Only apprentices may carry out isolation",
      "Isolation is only needed for three-phase supplies"
    ],
    correctIndex: 1,
    explanation: "Regulation 12 states that where danger may arise from work on or near live conductors, the conductors shall be made dead before work begins — unless it is unreasonable in all the circumstances for it to be dead. This establishes the legal duty to isolate wherever possible."
  },
  {
    id: "lock-off-purpose",
    question: "What is the PRIMARY purpose of applying a personal safety lock to an isolator?",
    options: [
      "To show that maintenance is in progress",
      "To prevent unauthorised re-energisation while work is being carried out",
      "To satisfy insurance requirements",
      "To mark the isolator for future reference"
    ],
    correctIndex: 1,
    explanation: "The personal safety lock prevents anyone from re-energising the supply while you are working on the circuit. Each person working on the isolated circuit should apply their own lock — the supply cannot be restored until every lock has been removed by its owner."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How many people are fatally electrocuted in UK workplaces on average each year?",
    options: [
      "1-2 per year",
      "Around 5 per year",
      "Around 10-12 per year",
      "Over 50 per year"
    ],
    correctAnswer: 1,
    explanation: "HSE statistics show that approximately 5 workers are fatally electrocuted in UK workplaces each year, with many more suffering serious burns and injuries. Many of these deaths are entirely preventable through correct isolation procedures."
  },
  {
    id: 2,
    question: "Which of the following is an APPROVED voltage indicator according to GS38?",
    options: [
      "A standard multimeter set to AC volts",
      "A two-pole voltage indicator with GS38-compliant probes",
      "A neon screwdriver",
      "A non-contact voltage detector (volt stick)"
    ],
    correctAnswer: 1,
    explanation: "GS38 recommends two-pole voltage indicators (such as Fluke T-series or Martindale) with compliant probes. Multimeters, neon screwdrivers, and non-contact detectors are not suitable as the primary test instrument for proving dead — though non-contact detectors may be used as a supplementary check."
  },
  {
    id: 3,
    question: "When isolating a three-phase supply, between which conductors must you test for dead?",
    options: [
      "L1-N and L2-N only",
      "L1-L2-L3 (phase-to-phase) only",
      "All phase-to-phase, all phase-to-neutral, and all phase-to-earth combinations",
      "L1-Earth only"
    ],
    correctAnswer: 2,
    explanation: "For a three-phase supply you must test between ALL combinations: L1-L2, L2-L3, L1-L3 (phase-to-phase), L1-N, L2-N, L3-N (phase-to-neutral), and L1-E, L2-E, L3-E, N-E (phase/neutral-to-earth). This gives a total of 10 tests to confirm the circuit is fully dead."
  },
  {
    id: 4,
    question: "What does Regulation 14 of BS 7671:2018+A3:2024 specifically require?",
    options: [
      "All circuits must have RCD protection",
      "Every installation shall be provided with means of switching off and isolation",
      "All cables must be fire rated",
      "Earth fault loop impedance must be measured"
    ],
    correctAnswer: 1,
    explanation: "Regulation 14 (Chapter 13, Fundamental Principles) requires that every installation shall be provided with suitable means of switching off and isolation to prevent or remove dangers. This underpins the legal and technical requirement for effective isolation facilities."
  },
  {
    id: 5,
    question: "Why must GS38-compliant test probes have a maximum of 2mm exposed metal tip?",
    options: [
      "To fit into small terminal openings",
      "To reduce the risk of arc flash and accidental short circuits",
      "To improve measurement accuracy",
      "To comply with manufacturer warranty requirements"
    ],
    correctAnswer: 1,
    explanation: "The 2mm maximum exposed tip reduces the risk of accidental contact with adjacent live conductors, which could cause short circuits and arc flash. GS38 also requires finger guards and fused leads for the same safety reasons."
  },
  {
    id: 6,
    question: "A UPS (Uninterruptible Power Supply) system feeds a server room. What additional consideration applies when isolating this circuit?",
    options: [
      "No additional considerations are needed",
      "The UPS batteries must also be isolated, as they provide an independent source of supply",
      "Only the mains input needs isolating",
      "UPS systems cannot be isolated"
    ],
    correctAnswer: 1,
    explanation: "UPS systems contain batteries that provide power independently of the mains supply. Even if the mains input is isolated, the UPS output may remain live from battery power. Both the mains input AND the battery/DC bus must be isolated and proved dead, following the manufacturer's isolation procedure."
  },
  {
    id: 7,
    question: "Under Regulation 13 of the Electricity at Work Regulations 1989, what precautions are required for work on dead equipment?",
    options: [
      "No specific precautions beyond switching off",
      "Adequate precautions must be taken to prevent it becoming live during the work",
      "Only a visual check is needed",
      "A risk assessment is sufficient — no physical precautions required"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 states that adequate precautions shall be taken to prevent conductors from becoming electrically charged during work. This means isolation, locking off, proving dead, and posting warning notices — the full safe isolation procedure."
  },
  {
    id: 8,
    question: "Who is legally permitted to carry out safe isolation of electrical circuits?",
    options: [
      "Any employee on site",
      "Only a qualified electrician",
      "A competent person with appropriate training and experience",
      "Only the site manager"
    ],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations require that persons carrying out electrical work must be competent — possessing adequate training, knowledge, and experience for the task. This could be a qualified electrician or a trained maintenance technician; the key requirement is demonstrated competence for the specific task."
  },
  {
    id: 9,
    question: "After completing maintenance work, what is the correct re-energisation procedure?",
    options: [
      "Remove locks and switch on immediately",
      "Confirm all personnel are clear, remove personal locks, remove danger notices, replace covers, then re-energise",
      "Ask anyone nearby to switch on",
      "Re-energise first, then replace covers"
    ],
    correctAnswer: 1,
    explanation: "Re-energisation must follow a controlled procedure: account for all personnel, ensure all are clear of the equipment, remove each person's individual lock, remove danger notices and caution tags, replace all covers and barriers, then re-energise in a controlled manner. Never re-energise with covers removed."
  },
  {
    id: 10,
    question: "A maintenance technician tests for dead and gets a zero reading, but did NOT prove the voltage indicator beforehand. What should they do?",
    options: [
      "Proceed with the work — the reading was zero",
      "Use a different meter and re-test",
      "Prove the voltage indicator on a known live source, then re-test for dead, then prove the indicator again",
      "Ask a colleague to confirm"
    ],
    correctAnswer: 2,
    explanation: "Without proving the indicator before testing, you cannot be certain the zero reading was genuine — the instrument may have been faulty. The full sequence must be followed: prove live, test for dead, prove live again. A zero reading from an unproven instrument provides no assurance of safety."
  },
  {
    id: 11,
    question: "What is the minimum safe isolation requirement when working on a circuit fed from a standby generator as well as a mains supply?",
    options: [
      "Isolate the mains supply only",
      "Isolate the generator only",
      "Isolate BOTH the mains supply and the generator supply, and prove dead at the point of work",
      "Turn off the generator and leave the changeover switch in auto"
    ],
    correctAnswer: 2,
    explanation: "Where multiple sources of supply exist (mains and standby generator), ALL sources must be isolated. Leaving either source connected means the circuit could become live — particularly dangerous with automatic changeover switches that can energise without warning."
  },
  {
    id: 12,
    question: "What information should be written on a danger notice attached to an isolated supply?",
    options: [
      "The company name only",
      "The name of the person who isolated it, the date, and what work is being carried out",
      "The circuit number only",
      "A general warning to keep out"
    ],
    correctAnswer: 1,
    explanation: "Danger notices must include the name of the person who applied the isolation, the date and time, and a description of the work being carried out. This allows anyone finding the notice to identify who is responsible and contact them before any attempt to re-energise."
  }
];

const faqs = [
  {
    question: "Can I use a non-contact voltage detector (volt stick) to prove dead?",
    answer: "No. Non-contact voltage detectors are useful as a supplementary check but must never be relied upon as the sole means of proving dead. They can give false negatives (failing to detect voltage) due to shielded cables, low voltages, or battery failure. Always use a two-pole voltage indicator compliant with GS38, proven on a known live source before and after testing."
  },
  {
    question: "What if I cannot find a known live source to prove my voltage indicator?",
    answer: "Use a proprietary proving unit (such as a Martindale PD440 or Fluke PRV240). These battery-powered devices generate a known test voltage specifically for proving voltage indicators. They are compact, inexpensive, and should be part of every electrician's and maintenance technician's toolkit. Never skip the proving step."
  },
  {
    question: "Do I need to carry out safe isolation for low voltage DC systems (e.g., 24V control circuits)?",
    answer: "Yes. The Electricity at Work Regulations apply to ALL electrical systems regardless of voltage. While the shock risk from 24V DC is low, there are still risks of burns from short circuits and arc flash, particularly where battery-backed systems can deliver high fault currents. Additionally, unexpected operation of control circuits can cause mechanical hazards. Always isolate and prove dead."
  },
  {
    question: "What happens if someone else removes my personal lock?",
    answer: "Only the person who fitted a personal lock should remove it. Cutting off or removing another person's lock without their explicit authority is a serious safety violation that could result in a fatality. If a lock cannot be removed (e.g., the person is absent), a formal senior management procedure must be followed, including confirming the system is safe, a documented risk assessment, and authorisation from a responsible person."
  },
  {
    question: "How does safe isolation differ between single-phase and three-phase supplies?",
    answer: "The procedure is the same, but the number of tests increases. For single-phase, you test between Line-Neutral, Line-Earth, and Neutral-Earth (3 tests). For three-phase, you test all phase-to-phase, phase-to-neutral, and phase/neutral-to-earth combinations — a total of 10 tests. The additional tests ensure no phase remains live due to a partial isolation or fault."
  }
];

const MOETModule1Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Isolation Procedures
          </h1>
          <p className="text-white/80">
            The critical six-step process for safe electrical isolation — preventing fatal contact with live conductors during maintenance work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>6 steps:</strong> Switch off, isolate, secure, lock off, test, prove dead</li>
              <li className="pl-1"><strong>GS38:</strong> Prove indicator live — test dead — prove indicator live again</li>
              <li className="pl-1"><strong>Personal lock:</strong> Only YOU remove YOUR lock</li>
              <li className="pl-1"><strong>Legal duty:</strong> Electricity at Work Regulations 1989, Regs 12 &amp; 13</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Context — Why This Matters</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>~5 deaths/year</strong> from workplace electrocution in the UK</li>
              <li className="pl-1"><strong>Most are preventable</strong> — failure to isolate is the leading cause</li>
              <li className="pl-1"><strong>ST1426 requirement:</strong> Core competency for electrical maintenance technicians</li>
              <li className="pl-1"><strong>Criminal liability:</strong> Employers and individuals can be prosecuted</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why safe isolation is critical and identify common causes of electrical fatalities",
              "Carry out the six-step safe isolation procedure from memory",
              "Select and use GS38-compliant voltage indicators and proving units correctly",
              "Apply safe isolation to single-phase, three-phase, and complex multi-source supplies",
              "State the legal requirements of EAWR 1989 Regulations 12 and 13, and BS 7671 Regulation 14",
              "Describe the correct re-energisation procedure and explain personal lock/tag responsibilities"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Why Safe Isolation is Critical */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Safe Isolation is Critical
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricity kills quickly and without warning. A current of just 50 milliamps (0.05A) flowing
              across the heart for one second is sufficient to cause ventricular fibrillation — cardiac arrest
              that is fatal without immediate defibrillation. At 230V, a contact resistance of just 4,600 ohms
              would allow this lethal current to flow. Damp skin, cuts, or abrasions can reduce body resistance
              to well below this threshold.
            </p>
            <p>
              HSE statistics consistently show that approximately 5 workers are fatally electrocuted in UK workplaces
              each year, with a further 20-30 suffering major injuries including severe burns. Analysis of these
              incidents reveals a recurring pattern: in the majority of fatal cases, the victim believed the circuit
              was dead — but had not followed the correct isolation procedure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-3">Common Causes of Electrical Fatalities</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong circuit isolated</strong> — Assumed the correct breaker without verifying at the point of work</li>
                <li className="pl-1"><strong>No test for dead</strong> — Relied on switching off alone without proving the circuit dead</li>
                <li className="pl-1"><strong>Faulty test instrument</strong> — Did not prove the voltage indicator before and after testing</li>
                <li className="pl-1"><strong>Unexpected back-feed</strong> — Failed to identify multiple sources of supply (generators, UPS, PV)</li>
                <li className="pl-1"><strong>Unauthorised re-energisation</strong> — No personal lock applied; another person switched the supply back on</li>
                <li className="pl-1"><strong>Stored energy</strong> — Capacitors or inductors retaining charge after isolation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Effects of Electric Current on the Human Body</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/70 font-medium">Current (mA)</th>
                      <th className="py-2 text-white/70 font-medium">Effect</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">1 mA</td>
                      <td className="py-2">Threshold of perception — tingling sensation</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">5 mA</td>
                      <td className="py-2">Pain — muscular contraction begins</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">10-15 mA</td>
                      <td className="py-2">"Let-go" threshold — inability to release grip</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">30-50 mA</td>
                      <td className="py-2">Respiratory paralysis — breathing stops</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-red-400 font-medium">50-100 mA</td>
                      <td className="py-2 text-red-400 font-medium">Ventricular fibrillation — usually fatal</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">&gt;1 A</td>
                      <td className="py-2">Severe burns, cardiac arrest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-3">
                Note: These values are approximate and vary with pathway through the body, duration, and individual physiology. A 30mA RCD operates at the threshold of fibrillation — this is why RCDs save lives but are not a substitute for safe isolation.
              </p>
            </div>

            <p>
              The message is clear: safe isolation is not optional, not a shortcut to be skipped when under time
              pressure, and not something that can be assumed. It is a defined, systematic procedure that must be
              followed every single time, without exception. Your life depends on it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The Six-Step Safe Isolation Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Six-Step Safe Isolation Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The safe isolation procedure is a defined sequence of actions that, when followed correctly,
              ensures a circuit is dead and cannot be re-energised while work is in progress. The procedure
              is mandated by the Electricity at Work Regulations 1989 and described in detail in HSE Guidance
              Note GS38 and the IET Code of Practice for In-Service Inspection and Testing.
            </p>

            <div className="my-6 space-y-3">
              {[
                {
                  step: "1",
                  title: "Identify the Circuit and Switch Off",
                  colour: "text-blue-400",
                  border: "border-blue-500/30",
                  bg: "bg-blue-500/10",
                  content: "Identify the correct source of supply using circuit charts, distribution board schedules, and cable identification. Switch off the equipment or circuit using the functional switch (e.g., the local isolator, MCB, or switch-disconnector). Never rely on circuit charts alone — always verify at the point of work."
                },
                {
                  step: "2",
                  title: "Isolate",
                  colour: "text-purple-400",
                  border: "border-purple-500/30",
                  bg: "bg-purple-500/10",
                  content: "Operate the means of isolation — this must be a device that provides a physical break in the circuit, such as a switch-disconnector, isolator, or MCB. The isolating device must comply with BS 7671 Section 537. Note: an MCB is acceptable as an isolator for maintenance purposes; a contactor is NOT — it can be re-energised by its control circuit."
                },
                {
                  step: "3",
                  title: "Secure the Isolation",
                  colour: "text-green-400",
                  border: "border-green-500/30",
                  bg: "bg-green-500/10",
                  content: "Apply a personal safety lock to the isolating device. Use a lock with a unique key that only you hold. Where multiple people are working on the same circuit, each person must apply their own lock using a multi-lock hasp. Attach a danger notice stating your name, the date, and the work being carried out."
                },
                {
                  step: "4",
                  title: "Prove the Voltage Indicator",
                  colour: "text-amber-400",
                  border: "border-amber-500/30",
                  bg: "bg-amber-500/10",
                  content: "Before testing for dead, prove that your voltage indicator is working correctly. Test it on a known live source or a proprietary proving unit (e.g., Martindale PD440, Fluke PRV240). The indicator must show the correct voltage. If it does not, the instrument is faulty — do not use it."
                },
                {
                  step: "5",
                  title: "Test for Dead at the Point of Work",
                  colour: "text-red-400",
                  border: "border-red-500/30",
                  bg: "bg-red-500/10",
                  content: "Using the proven voltage indicator, test between all conductors at the point of work. For single-phase: L-N, L-E, N-E (3 tests). For three-phase: all L-L, all L-N, all L-E, and N-E combinations (10 tests). The indicator must show zero on all tests. Any voltage reading means the circuit is NOT dead — stop and re-investigate."
                },
                {
                  step: "6",
                  title: "Prove the Voltage Indicator Again",
                  colour: "text-elec-yellow",
                  border: "border-elec-yellow/30",
                  bg: "bg-elec-yellow/10",
                  content: "Immediately after confirming zero readings, re-prove your voltage indicator on the same known live source or proving unit. If it now fails to show voltage, the zero readings at the point of work cannot be trusted — the instrument may have failed during the test. You must obtain a working instrument and repeat the entire process."
                }
              ].map((item) => (
                <div key={item.step} className={`p-4 rounded-lg ${item.bg} border-l-2 ${item.border}`}>
                  <p className={`text-sm font-medium ${item.colour} mb-2`}>Step {item.step}: {item.title}</p>
                  <p className="text-sm text-white/90">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Critical Principle</p>
              <p className="text-sm text-white/90">
                The sequence <strong>"Prove — Test — Prove"</strong> is the cornerstone of safe isolation.
                Without both proving checks, a dead reading is meaningless — your instrument may be faulty.
                This three-step verification is what separates a safe isolation from a dangerous assumption.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: GS38 Voltage Indicators and Proving Units */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            GS38 Voltage Indicators and Proving Units
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HSE Guidance Note GS38 (Electrical Test Equipment for Use on Low Voltage Electrical Systems)
              sets out the requirements for test instruments used to verify that circuits are dead. It was
              originally published in response to fatalities caused by inadequate or faulty test equipment
              and remains a cornerstone of electrical safety guidance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Approved vs Non-Approved Devices</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-medium text-green-400 mb-2">Approved for Proving Dead</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Two-pole voltage indicators</strong> — e.g., Fluke T150, Martindale VT28</li>
                    <li className="pl-1"><strong>GS38-compliant probes</strong> — max 2mm exposed tip, finger guards, fused leads</li>
                    <li className="pl-1"><strong>Proprietary proving units</strong> — PD440, PRV240</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                  <p className="text-sm font-medium text-red-400 mb-2">NOT Approved for Proving Dead</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Multimeters</strong> — Can give false readings; wrong range selected</li>
                    <li className="pl-1"><strong>Neon screwdrivers</strong> — Unreliable; can miss voltages</li>
                    <li className="pl-1"><strong>Non-contact detectors</strong> — Supplementary use only</li>
                    <li className="pl-1"><strong>DIY test lamps</strong> — No finger guards; can shatter</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">GS38 Probe Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Exposed tip:</strong> Maximum 2mm of exposed metal — prevents accidental bridging of live parts</li>
                <li className="pl-1"><strong>Finger guards:</strong> Built-in barriers to prevent fingers slipping onto the probe tip</li>
                <li className="pl-1"><strong>Fused leads:</strong> Each lead fused (typically 500mA HRC fuse) to limit current in case of a fault</li>
                <li className="pl-1"><strong>Insulation:</strong> Leads must be insulated, flexible, and in good condition — no cracked or taped insulation</li>
                <li className="pl-1"><strong>Colour coding:</strong> Distinctly coloured leads for easy identification</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Proving Units — How They Work</p>
              <p className="text-sm text-white/90 mb-3">
                A proving unit generates a known voltage (typically 50V, 100V, 230V, or 400V AC/DC selections)
                from internal batteries. You connect your voltage indicator to the proving unit and confirm it
                reads the expected voltage. This proves the indicator is functioning correctly.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Proving Sequence:</p>
                <p>1. Connect voltage indicator to proving unit</p>
                <p>2. Select appropriate voltage on proving unit (match expected supply voltage)</p>
                <p>3. Confirm indicator shows correct reading → <span className="text-green-400">Instrument proven</span></p>
                <p>4. Test for dead at the point of work</p>
                <p>5. Re-connect indicator to proving unit</p>
                <p>6. Confirm indicator still shows correct reading → <span className="text-green-400">Test result confirmed</span></p>
              </div>
            </div>

            <p className="text-sm text-white/70">
              <strong>Maintenance technician tip:</strong> Always carry a proving unit in your tool bag.
              It is small, inexpensive, and could save your life. Never rely on finding a convenient known
              live source — a dedicated proving unit is always available and always at the correct voltage.
            </p>
          </div>
        </section>

        {/* Section 4: Isolating Different Supply Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Isolating Different Supply Types
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            {/* Single-phase */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-blue-400 mb-3">Single-Phase Isolation (230V AC)</h3>
              <p className="text-sm text-white mb-3">
                The most common isolation scenario for maintenance technicians. Applies to lighting circuits,
                socket outlets, single-phase motors, and fixed equipment.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-medium mb-2">Tests Required (3 minimum):</p>
                <p>1. Line to Neutral (L-N)</p>
                <p>2. Line to Earth (L-E)</p>
                <p>3. Neutral to Earth (N-E)</p>
              </div>
              <p className="text-xs text-white/60">
                The N-E test is essential — a fault condition could make the neutral live even when the line conductor has been correctly isolated.
              </p>
            </div>

            {/* Three-phase */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-purple-400 mb-3">Three-Phase Isolation (400V AC)</h3>
              <p className="text-sm text-white mb-3">
                Used for three-phase motors, distribution boards, commercial equipment, and industrial plant.
                The increased number of conductors means more test combinations are required.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-medium mb-2">Tests Required (10 minimum):</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Phase-to-Phase (3 tests):</p>
                    <p>L1-L2, L2-L3, L1-L3</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Phase-to-Neutral (3 tests):</p>
                    <p>L1-N, L2-N, L3-N</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Phase-to-Earth (3 tests):</p>
                    <p>L1-E, L2-E, L3-E</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Neutral-to-Earth (1 test):</p>
                    <p>N-E</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/60">
                Missing even one test could leave a live conductor undetected. A partial isolation (one phase still live) will deliver 230V — enough to kill.
              </p>
            </div>

            {/* Complex systems */}
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <h3 className="text-sm font-medium text-red-400 mb-3">Complex Systems: Multiple Sources of Supply</h3>
              <p className="text-sm text-white mb-3">
                Modern installations increasingly feature multiple sources of supply. Each must be independently
                identified, isolated, and proved dead. Failure to account for any single source can be fatal.
              </p>
              <div className="space-y-3 mt-4">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-amber-400 mb-1">UPS Systems</p>
                  <p className="text-xs text-white/80">
                    UPS batteries provide power independently of the mains. Isolate the mains input AND the
                    UPS output/battery disconnect. Follow the manufacturer's specific isolation procedure.
                    Allow time for capacitive discharge — large UPS systems can hold lethal charge for several minutes.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-amber-400 mb-1">Standby Generators</p>
                  <p className="text-xs text-white/80">
                    Automatic transfer switches (ATS) can energise circuits without warning when mains power
                    is lost. Isolate BOTH the mains supply and the generator output. Disable the ATS auto-start
                    function and lock off. Be aware of manual bypass switches.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-amber-400 mb-1">Photovoltaic (Solar PV) Systems</p>
                  <p className="text-xs text-white/80">
                    PV panels generate DC voltage whenever exposed to light — they cannot be switched off.
                    Isolate the DC isolator and the AC isolator at the inverter. DC side conductors remain
                    live in daylight. Work must account for this permanent energy source.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-amber-400 mb-1">Capacitive Discharge</p>
                  <p className="text-xs text-white/80">
                    Large capacitor banks (e.g., power factor correction units, variable speed drives, UPS DC
                    buses) retain charge after isolation. Wait the specified discharge time before testing for
                    dead. Some systems require manual discharge through rated resistors. Never assume capacitors
                    are discharged — always test.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Legal Framework and Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Legal Framework and Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is not merely good practice — it is a legal requirement. Failure to comply carries
              criminal penalties for both employers and individuals, including unlimited fines and imprisonment.
              The key legislation and standards are outlined below.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-red-400 mb-3">Electricity at Work Regulations 1989 (EAWR)</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Regulation 12 — Working Dead</p>
                    <p className="text-xs text-white/80 italic mb-2">
                      "Where danger may arise from work on or near live conductors, the conductors shall be
                      made dead before work is carried out, unless it is unreasonable in all the circumstances
                      for it to be dead."
                    </p>
                    <p className="text-xs text-white/60">
                      This establishes the absolute legal duty to isolate wherever reasonably practicable. Live work
                      is only permitted when it is genuinely unreasonable for the circuit to be dead — not merely
                      inconvenient.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Regulation 13 — Precautions for Working on Dead Equipment</p>
                    <p className="text-xs text-white/80 italic mb-2">
                      "Adequate precautions shall be taken to prevent conductors from becoming electrically charged
                      during work where danger would thereby arise."
                    </p>
                    <p className="text-xs text-white/60">
                      Even after a circuit is made dead, precautions (locking off, danger notices, proving dead) must
                      be maintained throughout the work. This regulation makes the full safe isolation procedure a
                      legal requirement, not a recommendation.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Regulation 16 — Competence</p>
                    <p className="text-xs text-white/80 italic mb-2">
                      "No person shall be engaged in any work activity where technical knowledge or experience
                      is necessary to prevent danger or injury, unless they possess such knowledge or experience,
                      or are under appropriate supervision."
                    </p>
                    <p className="text-xs text-white/60">
                      Only competent persons may carry out safe isolation. Competence means having the combination
                      of training, knowledge, and experience appropriate for the specific task.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-3">BS 7671:2018+A3:2024 — IET Wiring Regulations</h3>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">Regulation 14 (Chapter 13 — Fundamental Principles)</p>
                  <p className="text-xs text-white/80 mb-2">
                    Requires that every installation shall be provided with suitable means of switching off
                    for mechanical maintenance and for emergency switching, as well as means of isolation
                    to prevent or remove dangers.
                  </p>
                  <p className="text-xs text-white/60">
                    Section 537 of BS 7671 details the technical requirements for isolating and switching devices,
                    including that isolators must be capable of being secured in the open position to prevent
                    inadvertent re-closure.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-green-400 mb-3">HSE Guidance Note GS38</h3>
                <p className="text-sm text-white/90">
                  Sets out requirements for electrical test equipment used by electricians and maintenance
                  technicians on low voltage systems. Covers voltage indicators, test lamps, and test probes.
                  While guidance (not law), failure to follow GS38 would be used as evidence of negligence
                  in any prosecution following an incident.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">ST1426 Occupational Standard</p>
              <p className="text-sm text-white/90">
                The Level 3 Electrical Engineering Maintenance Technician apprenticeship standard (ST1426)
                lists safe isolation as a core competency. You must be able to demonstrate that you can
                carry out the full safe isolation procedure independently, safely, and consistently.
                This is assessed during your End-Point Assessment.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Personal Locks, Danger Tags, and Re-Energisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Locks, Tags, and Re-Energisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Locking off and tagging are the physical measures that prevent unauthorised re-energisation.
              They are the visible, tangible confirmation that someone's life depends on the supply remaining
              isolated. These measures must remain in place for the entire duration of the work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Personal Safety Locks</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unique key:</strong> Each lock must have a unique key held only by the person who applied it</li>
                <li className="pl-1"><strong>Personal identification:</strong> The lock should be identifiable to its owner (name, number, colour coding)</li>
                <li className="pl-1"><strong>Multi-lock hasps:</strong> Where multiple people work on the same circuit, each applies their own lock to a hasp — the isolator cannot be operated until ALL locks are removed</li>
                <li className="pl-1"><strong>Never share keys:</strong> If you hand your key to someone else, you have lost control of your isolation</li>
                <li className="pl-1"><strong>Never leave site without removing:</strong> If you leave, remove your lock and re-isolate when you return</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Danger Notices and Caution Tags</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                  <p className="text-sm font-medium text-red-400 mb-2">Danger Notices</p>
                  <p className="text-xs text-white/80 mb-2">Applied at the point of isolation. Must state:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Name of the person who isolated</li>
                    <li>Date and time of isolation</li>
                    <li>Description of work being carried out</li>
                    <li>"DANGER — DO NOT SWITCH ON"</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm font-medium text-amber-400 mb-2">Caution Notices</p>
                  <p className="text-xs text-white/80 mb-2">Applied at the point of work. Must state:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>"CAUTION — WORK IN PROGRESS"</li>
                    <li>Description of the work</li>
                    <li>Contact details of responsible person</li>
                    <li>Used alongside, not instead of, danger notices</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
              <p className="text-sm font-medium text-green-400 mb-3">Re-Energisation Procedure</p>
              <p className="text-sm text-white/90 mb-3">
                Re-energisation is just as important as isolation. A controlled, systematic process prevents
                accidents during the return to service.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Step-by-Step Re-Energisation:</p>
                <p>1. <strong>Confirm work complete</strong> — All maintenance tasks finished and signed off</p>
                <p>2. <strong>Replace covers and barriers</strong> — All enclosures, guards, and safety barriers reinstated</p>
                <p>3. <strong>Account for all personnel</strong> — Confirm everyone is clear of the equipment</p>
                <p>4. <strong>Remove tools and materials</strong> — No foreign objects left inside equipment</p>
                <p>5. <strong>Remove caution notices</strong> — From the point of work</p>
                <p>6. <strong>Remove personal locks</strong> — Each person removes only their own lock</p>
                <p>7. <strong>Remove danger notices</strong> — From the point of isolation</p>
                <p>8. <strong>Re-energise in a controlled manner</strong> — Stand to one side; do not stand directly in front of the panel</p>
                <p>9. <strong>Verify correct operation</strong> — Confirm the equipment is operating normally</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Mistakes and Near-Miss Scenarios</p>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Isolating the wrong circuit:</strong> A technician opens an MCB labelled "Socket Ring — First Floor"
                  but the circuit chart is outdated. The actual circuit feeding the socket is on a different breaker.
                  The technician tests for dead at the point of work — finds it live — and avoids electrocution only
                  because they followed the correct procedure. <span className="text-green-400">Lesson: Always test for dead at the point of work.</span>
                </li>
                <li className="pl-1">
                  <strong>Skipping the second prove:</strong> An engineer tests for dead with a voltage indicator
                  that shows zero. Satisfied, they begin work. Unknown to them, the indicator's battery failed
                  during the test — the circuit was actually live. <span className="text-green-400">Lesson: Always prove the indicator after testing.</span>
                </li>
                <li className="pl-1">
                  <strong>No lock applied:</strong> A fitter isolates a motor but does not apply a lock because
                  they will "only be five minutes." A process operator, unaware of the work, re-energises the
                  motor. The fitter's hand is drawn into the rotating machinery. <span className="text-green-400">Lesson: Always lock off, regardless of the expected duration.</span>
                </li>
                <li className="pl-1">
                  <strong>Forgetting the UPS:</strong> An IT technician isolates the mains supply to a server
                  room distribution board. The UPS continues to supply the board from its batteries. The
                  technician contacts a live busbar. <span className="text-green-400">Lesson: Always identify ALL sources of supply, including stored energy.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Safe Isolation — 6 Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify supply and switch off</li>
                  <li>2. Isolate (physical break in circuit)</li>
                  <li>3. Secure with personal lock + danger notice</li>
                  <li>4. Prove voltage indicator on known live</li>
                  <li>5. Test for dead at point of work</li>
                  <li>6. Re-prove voltage indicator on known live</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989, Reg 12 — Work dead where practicable</li>
                  <li>EAWR 1989, Reg 13 — Prevent becoming live</li>
                  <li>EAWR 1989, Reg 16 — Competent persons</li>
                  <li>BS 7671:2018+A3:2024, Reg 14 — Isolation means</li>
                  <li>HSE GS38 — Test equipment requirements</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Tests for Dead</p>
                <ul className="space-y-0.5">
                  <li>Single-phase: 3 tests (L-N, L-E, N-E)</li>
                  <li>Three-phase: 10 tests (all combinations)</li>
                  <li>Always at the POINT OF WORK</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">GS38 Probe Requirements</p>
                <ul className="space-y-0.5">
                  <li>Max 2mm exposed metal tip</li>
                  <li>Finger guards on probes</li>
                  <li>Fused leads (500mA HRC)</li>
                  <li>Insulated, in good condition</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Permit to Work Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-3">
              Next: Lock-Out / Tag-Out
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section1_2;
