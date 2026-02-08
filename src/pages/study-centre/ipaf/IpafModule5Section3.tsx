import { ArrowLeft, LifeBuoy, CheckCircle, AlertTriangle, BookOpen, Zap, Phone, HeartPulse, Users, Shield, HardHat, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    question: "What is the FIRST option in the PASMA rescue hierarchy?",
    options: [
      "Call the fire brigade immediately",
      "Self-rescue — the user descends under their own power",
      "Lower the tower to the ground",
      "Use a crane to lift the person off"
    ],
    correctAnswer: 1,
    explanation: "The PASMA rescue hierarchy starts with self-rescue — the user descends the tower under their own power using the internal ladder or stairway. This is the quickest and simplest option when the person is physically able. Assisted descent and professional rescue follow as escalation options."
  },
  {
    question: "When must a written rescue plan be in place for tower scaffold work?",
    options: [
      "Only for towers above 10 metres",
      "Only when working near water",
      "Before any work at height begins — for every tower operation",
      "Only when a risk assessment identifies a specific rescue risk"
    ],
    correctAnswer: 2,
    explanation: "The Work at Height Regulations 2005 require that rescue procedures are planned before any work at height begins. This applies to all tower scaffold operations regardless of height. The rescue plan must be specific to the site, the tower configuration, and the personnel involved."
  },
  {
    question: "What is suspension trauma?",
    options: [
      "Fear of heights",
      "A condition where blood pools in the legs when a person is suspended in a harness, potentially causing loss of consciousness and death",
      "Bruising from a fall arrest harness",
      "Psychological trauma after witnessing a fall"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma (orthostatic intolerance) occurs when a person hangs motionless in a harness. Blood pools in the legs, reducing return to the heart and brain. Without rescue within 15-20 minutes, loss of consciousness and cardiac arrest can occur. This is why rapid rescue capability is critical whenever harnesses are used."
  },
  {
    question: "A colleague on a tower platform has collapsed and is unresponsive. What is the FIRST thing you should do?",
    options: [
      "Climb up immediately to help them",
      "Call emergency services (999) and maintain communication while following the rescue plan",
      "Try to shake the tower to wake them",
      "Wait 10 minutes to see if they recover"
    ],
    correctAnswer: 1,
    explanation: "Do NOT climb the tower without a plan — you could create a second casualty. Call 999 immediately, describe the situation (person collapsed at height, give the exact location and tower height), and follow the written rescue plan. Maintain verbal communication with the casualty if possible. The fire service has specialist equipment for rescue at height."
  },
  {
    question: "What communication method should be established as part of the rescue plan?",
    options: [
      "Social media messaging only",
      "A combination of mobile phone, radio, and a buddy system with ground-level personnel",
      "Written notes passed up and down the tower",
      "Communication is not necessary — just call 999"
    ],
    correctAnswer: 1,
    explanation: "The rescue plan must establish reliable communication: mobile phones (check signal strength at the location), two-way radios where phone coverage is poor, and a buddy system where ground-level personnel maintain visual and verbal contact with tower users. At least one person at ground level must be able to raise the alarm."
  },
  {
    question: "Who should be available at ground level to provide first aid during tower work?",
    options: [
      "No one — first aid is only needed after an accident",
      "A qualified first aider with access to a first aid kit, aware of the rescue plan",
      "Anyone who has watched a first aid video",
      "First aid is the responsibility of the emergency services only"
    ],
    correctAnswer: 1,
    explanation: "First aid provision must be planned before work begins. A qualified first aider should be on site or rapidly available, with a stocked first aid kit at ground level near the tower. They should be briefed on the rescue plan and understand the specific risks of working at height, including suspension trauma."
  },
  {
    question: "What is the purpose of the buddy system in tower scaffold rescue planning?",
    options: [
      "To reduce boredom for the ground worker",
      "To ensure someone at ground level is monitoring the tower user and can raise the alarm immediately if needed",
      "To share the workload on the platform",
      "The buddy system is only used in water rescue"
    ],
    correctAnswer: 1,
    explanation: "The buddy system ensures a ground-level person maintains awareness of the tower user at all times. They can spot signs of distress, monitor weather changes, prevent unauthorised access to the tower, and immediately raise the alarm and initiate the rescue plan if something goes wrong."
  },
  {
    question: "A rescue plan states 'call the fire brigade.' What critical information must be included in the plan beyond this instruction?",
    options: [
      "No additional information is needed",
      "The fire brigade's email address",
      "Exact site location with postcode/what3words, access route for vehicles, tower height, number of casualties, site contact name and number",
      "The name of the local fire station"
    ],
    correctAnswer: 2,
    explanation: "Emergency services need precise information to respond effectively: exact location (postcode, what3words, grid reference), clear vehicle access route, specific location of the tower on site, tower height, nature of the emergency, number of casualties, and a site contact name and mobile number. Delays in providing this information cost lives."
  }
];

const quickCheckQuestions = [
  {
    question: "Your rescue plan says 'fire brigade response time approximately 10 minutes.' You are working on a rural site where the nearest fire station is 25 minutes away. Is the plan adequate?",
    options: [
      "Yes — 25 minutes is close enough to 10 minutes",
      "No — the plan must reflect actual response times for the specific site; additional on-site rescue capability may be needed",
      "Yes — the fire brigade will hurry if it is an emergency",
      "No — you cannot use a tower on a rural site"
    ],
    correctIndex: 1,
    explanation: "Rescue plans must be site-specific and realistic. If professional rescue response time exceeds 15-20 minutes, the risk of suspension trauma becomes critical. Additional on-site rescue capability (trained personnel with descent equipment) may be required, or the method of work at height may need to change."
  },
  {
    question: "A lone worker is using a tower on a quiet industrial estate at the weekend. They have a mobile phone. Is this adequate rescue provision?",
    options: [
      "Yes — a mobile phone is sufficient rescue provision",
      "No — lone working at height is unacceptable without additional precautions; a buddy system or welfare checks must be in place",
      "Yes — if they save 999 in their phone",
      "No — towers cannot be used at weekends"
    ],
    correctIndex: 1,
    explanation: "A lone worker who is injured or collapses on the tower cannot call for help. Lone working at height requires additional controls: regular welfare check calls at agreed intervals (e.g., every 30 minutes), a lone worker monitoring device, or — ideally — a ground-level buddy. If the worker misses a check-in, the alarm is raised immediately."
  },
  {
    question: "During the rescue plan briefing, an operative says 'If someone falls or collapses on the platform, I will climb straight up to help them.' Is this the correct response?",
    options: [
      "Yes — getting to the casualty quickly is the priority",
      "No — climbing up without a plan could create a second casualty; call 999 first, follow the rescue plan, and maintain communication from the ground",
      "Yes — but only if they wear a harness",
      "No — you should never attempt to help a colleague"
    ],
    correctIndex: 1,
    explanation: "Climbing up to an unconscious person without a plan is dangerous — you may not be able to help them once you get there, the platform may already be overloaded, and if you become injured too, there are now two casualties at height. The correct sequence is: call 999, follow the rescue plan, maintain communication, and only approach the casualty if it is safe and you are trained to do so."
  }
];

const faqs = [
  {
    question: "Does every tower operation need its own rescue plan?",
    answer: "Yes. The Work at Height Regulations 2005 require rescue procedures to be planned before any work at height begins. The plan does not need to be a separate, lengthy document for every task, but it must address the specific site conditions, tower configuration, personnel, communication methods, and realistic emergency service response times. A generic 'call 999' is not a rescue plan — it must detail how the call will be made, what information will be given, how site access is arranged for emergency vehicles, and what happens while waiting for the response."
  },
  {
    question: "What training do ground-level personnel need for rescue?",
    answer: "Ground-level personnel should be briefed on the rescue plan before work begins. As a minimum, they need to know: how to raise the alarm, what number to call, what information to give, how to direct emergency vehicles to the exact location, how to maintain communication with the casualty, and what NOT to do (e.g., do not climb the tower without training and a plan). For sites with extended emergency response times, on-site personnel may need specific rescue-from-height training and access to specialist descent equipment."
  },
  {
    question: "How quickly does suspension trauma become life-threatening?",
    answer: "Suspension trauma can cause loss of consciousness within 5-15 minutes of a person hanging motionless in a harness. Death can follow within 15-30 minutes if the person is not rescued and placed in a semi-recumbent position. The speed of onset depends on the individual's fitness, hydration, temperature, and the harness design. This is why rescue plans must ensure a rapid response — relying solely on emergency services with a 20-minute response time may not be adequate."
  },
  {
    question: "What should an emergency lowering plan include for an injured person on a tower platform?",
    answer: "Emergency lowering of an injured person from a tower platform is complex and should generally be left to the emergency services unless trained personnel with appropriate equipment are on site. The plan should include: how to stabilise the casualty on the platform, how to prevent further injury, when and how to call for professional rescue, how to provide information to paramedics on arrival (height, nature of injury, time elapsed), and how to facilitate access for the rescue team (clearing ground-level obstructions, having keys for site access gates)."
  }
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function IpafModule5Section3() {
  useSEO({
    title: "Rescue Procedures & Emergency Planning | Module 5 | IPAF Mobile Scaffold",
    description: "PASMA rescue hierarchy, written rescue plans, communication methods, first aid provision, suspension trauma awareness, and emergency lowering procedures for tower scaffold work.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 3</p>
            <h1 className="text-sm font-semibold text-white truncate">Rescue Procedures & Emergency Planning</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mb-4">
            <LifeBuoy className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
              Module 5 {"\u2022"} Section 3
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Rescue Procedures & Emergency Planning</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Planning for the worst so everyone gets home safely — rescue hierarchy, communication, and emergency response for tower scaffold operations
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-elec-yellow mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            A written rescue plan is legally required before any work at height begins. The PASMA rescue hierarchy prioritises self-rescue, then assisted descent, then professional rescue. Every plan must be site-specific, include reliable communication methods, account for realistic emergency response times, and ensure first aid provision at ground level. If someone collapses on a tower, do NOT climb up without a plan — call 999 first.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-emerald-400 mb-2 flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            On Site
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Before anyone climbs the tower, ask: Does everyone know the rescue plan? Can we communicate from the platform to the ground? Is there mobile phone signal here? Do we have a first aid kit at ground level? Who is the designated ground-level buddy? What is the realistic emergency service response time to this location? If any answer is "I don't know," the plan is not ready.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Describe the PASMA rescue hierarchy: self-rescue, assisted descent, professional rescue",
              "Explain why a written rescue plan is required before any work at height begins",
              "Identify the key elements of a site-specific rescue plan",
              "Establish effective communication methods for tower operations",
              "Understand suspension trauma and its life-threatening timeline",
              "Know what to do — and what NOT to do — if someone falls or collapses on a tower platform"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — PASMA Rescue Hierarchy                          */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm">01</span>
            <h3 className="text-xl font-semibold text-white">PASMA Rescue Hierarchy</h3>
          </div>
          <div className="border-l-2 border-emerald-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The PASMA rescue hierarchy provides a structured approach to rescue, starting with the simplest and fastest option and escalating when needed. The plan must address all three levels.
            </p>
            <div className="space-y-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-green-500/20 text-green-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <h4 className="font-semibold text-green-400">Self-Rescue</h4>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  The user descends the tower under their own power using the internal ladder or stairway. This is the quickest and simplest rescue method. It applies when the person is conscious, mobile, and able to climb down safely. Even for minor injuries (small cuts, mild dizziness), self-rescue may be appropriate if the person can descend safely.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <h4 className="font-semibold text-blue-400">Assisted Descent</h4>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  A trained colleague assists the person to descend. This may involve verbal guidance, physical support on the ladder, or helping them through platform trapdoors. The assisting person must be trained, physically capable, and must not put themselves at risk. The tower's safe working load must not be exceeded with both persons on the platform.
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <h4 className="font-semibold text-red-400">Professional Rescue</h4>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  The fire brigade or a specialist rescue team is called. This is required when the casualty is unconscious, seriously injured, or cannot be safely assisted down by colleagues. Professional rescue teams have specialist equipment including stretchers, lowering devices, and aerial platforms. The rescue plan must include how to contact them and how to direct them to the exact location.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — Written Rescue Plan                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">02</span>
            <h3 className="text-xl font-semibold text-white">Written Rescue Plan Requirements</h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Work at Height Regulations 2005, Regulation 4, requires that work at height is properly planned. This includes planning for emergencies and rescue. A written rescue plan must be in place <strong className="text-white">before any work at height begins</strong> — for every tower operation, regardless of height or duration.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                What the Rescue Plan Must Include
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Site-specific details</strong> — exact tower location, height, access route for emergency vehicles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Emergency contact numbers</strong> — 999, site manager, first aider, nearest A&E department</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Location information</strong> — postcode, what3words reference, grid reference, site access code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Rescue hierarchy</strong> — self-rescue, assisted descent, and professional rescue procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Communication plan</strong> — primary and backup communication methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>First aid provision</strong> — location of first aid kit, name of qualified first aider</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Realistic response times</strong> — verified emergency service response time for this specific location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Named responsibilities</strong> — who does what in an emergency</span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Common Rescue Plan Failures
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Plan says "call 999" without specifying what information to give or how to direct vehicles to the site</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Assumes emergency response time of 10 minutes on a site where actual response is 30+ minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>No backup communication method — mobile phone signal may be poor or phone battery may be dead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Generic plan not updated for the specific site, tower height, or personnel</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="A rescue plan for a tower on a building site states: 'In an emergency, call 999.' Is this an adequate rescue plan?"
          options={[
            "Yes — 999 covers all emergencies",
            "No — it lacks site-specific details, location information, communication methods, first aid provision, and named responsibilities",
            "Yes — the fire brigade will know what to do",
            "No — you should call 112 instead"
          ]}
          correctIndex={1}
          explanation="'Call 999' is one element of a rescue plan, not the entire plan. A compliant rescue plan must include the exact site location with postcode/what3words, what information to give the operator, how emergency vehicles will access the site, communication methods between the platform and ground, first aid provision, named responsibilities, and realistic response times."
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 — Communication Methods                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">03</span>
            <h3 className="text-xl font-semibold text-white">Communication Methods</h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Reliable communication between the tower user and ground level is essential. If the person on the tower cannot call for help, a minor incident can become a fatality.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-400" />
                Communication Options
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Mobile Phone</p>
                  <p className="text-white/70 text-xs mt-1">Check signal strength at the working location before work begins. Ensure the phone is fully charged. Keep it in a secure pocket, not balanced on the platform.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Two-Way Radio</p>
                  <p className="text-white/70 text-xs mt-1">Essential where mobile phone coverage is poor. Test range and clarity before work starts. Agree a dedicated channel and check-in schedule.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Buddy System</p>
                  <p className="text-white/70 text-xs mt-1">A designated ground-level person maintains visual and verbal contact with the tower user at all times. The most reliable communication method for detecting problems early.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Lone Worker Device</p>
                  <p className="text-white/70 text-xs mt-1">For situations where a buddy is not available. Devices with tilt sensors and timed check-ins automatically raise an alarm if the worker becomes incapacitated.</p>
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              The rescue plan should specify both a <strong className="text-white">primary and backup</strong> communication method. If the primary method is a mobile phone, the backup might be a two-way radio or an agreed visual/audible signal system with the ground-level buddy.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — First Aid Provision                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">04</span>
            <h3 className="text-xl font-semibold text-white">First Aid Provision at Ground Level</h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              First aid provision must be planned and available before tower work begins. Under the Health and Safety (First-Aid) Regulations 1981, employers must provide adequate and appropriate first aid equipment, facilities, and personnel.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-red-400" />
                First Aid Requirements for Tower Work
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Stocked first aid kit accessible at ground level near the tower</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Qualified first aider on site or rapidly available (know their name and location)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>First aider briefed on the rescue plan and work-at-height-specific risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Clear access route for ambulance to the tower location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Knowledge of nearest A&E department location and route</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="A tower user calls down that they feel dizzy and are having trouble gripping the guardrail. They are 5 metres above ground. What should the ground-level buddy do?"
          options={[
            "Tell them to sit down on the platform and wait it out",
            "Immediately climb the tower to help them down",
            "Talk calmly to them, encourage them to sit or lie down on the platform, alert the first aider, and prepare to escalate to assisted descent or call 999 if they deteriorate",
            "Ignore it — dizziness is not serious"
          ]}
          correctIndex={2}
          explanation="Dizziness at height is a medical emergency because the person could lose consciousness and fall. The ground-level buddy should: (1) Talk calmly to maintain communication, (2) Encourage them to sit or lie flat on the platform to reduce fall risk, (3) Alert the first aider, (4) Prepare to call 999 if the situation worsens, and (5) Follow the rescue plan escalation procedure. Do NOT send someone up without a plan."
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — What to Do If Someone Falls or Collapses        */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm">05</span>
            <h3 className="text-xl font-semibold text-white">If Someone Falls or Collapses on the Platform</h3>
          </div>
          <div className="border-l-2 border-orange-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Discovering that someone has collapsed on a tower platform is a high-stress situation. Having a clear, rehearsed plan prevents panic and ensures the right actions are taken in the right order.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" />
                Step-by-Step Emergency Response
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="text-white font-medium">Do NOT climb up without a plan</p>
                    <p className="text-white/70">You could become a second casualty. The platform may be overloaded, the person may have been affected by fumes or an electrical fault.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-orange-500/20 text-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="text-white font-medium">Call 999 immediately</p>
                    <p className="text-white/70">State: person collapsed at height, give exact location, tower height, nature of emergency, access route for vehicles, and a callback number.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-amber-500/20 text-amber-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="text-white font-medium">Maintain communication with the casualty</p>
                    <p className="text-white/70">Talk to them — even if unresponsive, they may be able to hear you. Continuous verbal contact can help assess their condition and provide reassurance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="text-white font-medium">Follow the rescue plan</p>
                    <p className="text-white/70">Execute the pre-planned steps — alert the first aider, clear access for emergency vehicles, assign someone to meet and direct the ambulance/fire brigade.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <div>
                    <p className="text-white font-medium">Secure the area</p>
                    <p className="text-white/70">Keep others away from the tower base, prevent unauthorised rescue attempts, and preserve the scene for investigation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — Suspension Trauma Awareness                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">06</span>
            <h3 className="text-xl font-semibold text-white">Suspension Trauma Awareness</h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Although harnesses are not typically used with correctly assembled mobile towers (the guardrails provide collective fall protection), there are situations where harnesses may be specified. Understanding suspension trauma is critical for rescue planning.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">What Is Suspension Trauma?</h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Suspension trauma (orthostatic intolerance) occurs when a person hangs motionless in a harness. The harness leg straps compress the femoral veins, and gravity causes blood to pool in the lower limbs. With reduced blood returning to the heart and brain:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-black/20 rounded-lg p-3 text-center">
                  <p className="text-red-400 font-bold text-lg">5-15 min</p>
                  <p className="text-white/70 text-xs">Loss of consciousness possible</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 text-center">
                  <p className="text-red-400 font-bold text-lg">15-30 min</p>
                  <p className="text-white/70 text-xs">Death can occur without rescue</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 text-center">
                  <p className="text-amber-400 font-bold text-lg">Key Factor</p>
                  <p className="text-white/70 text-xs">Inactivity — moving legs delays onset</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">After Rescue from Suspension</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                A person rescued from suspension must NOT be laid flat immediately — this can cause a sudden rush of pooled, oxygen-depleted blood back to the heart, potentially triggering cardiac arrest ("rescue death"). Place them in a semi-recumbent position (W-position or seated with knees raised) and seek immediate medical attention. Inform paramedics of the duration of suspension.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Emergency Lowering                              */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">07</span>
            <h3 className="text-xl font-semibold text-white">Emergency Lowering of an Injured Person</h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Lowering an injured person from a tower platform is complex and carries significant risk of further injury. In most cases, this should be left to the emergency services who have specialist equipment and training.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-400" />
                Key Principles
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Only attempt if trained personnel with appropriate equipment are on site</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Stabilise the casualty on the platform first — prevent further falls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Do not attempt to carry an unconscious person down internal ladders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Fire service aerial platforms can reach the platform directly — clear the base area for vehicle access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>Provide paramedics with: tower height, nature of injury, time elapsed, whether the person was suspended in a harness</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="A person has been rescued from a harness after hanging motionless for 12 minutes. A colleague wants to lay them flat on the ground. Is this the correct first aid response?"
          options={[
            "Yes — the recovery position is always correct",
            "No — place them in a semi-recumbent position (seated with knees raised) and call for immediate medical attention",
            "Yes — they need to lie down after the stress",
            "No — they should be made to walk around immediately"
          ]}
          correctIndex={1}
          explanation="After suspension, laying the person flat can cause a sudden rush of pooled, deoxygenated blood back to the heart, potentially causing cardiac arrest ('rescue death'). Place them in a semi-recumbent position (W-position or seated leaning back with knees raised) and get immediate medical attention. Always inform paramedics of the suspension duration."
        />

        {/* ------------------------------------------------------------ */}
        {/*  Key Contacts Checklist                                       */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-purple-400" />
            Emergency Contacts to Prepare Before Work Starts
          </h3>
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-xs">Emergency Services</p>
                <p className="text-white/70 text-xs mt-1">999 (or 112) — know exactly what to say and what information they need</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-xs">Site Manager / Supervisor</p>
                <p className="text-white/70 text-xs mt-1">Name and mobile number — to authorise emergency response and coordinate site access</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-xs">Qualified First Aider</p>
                <p className="text-white/70 text-xs mt-1">Name, location on site, and mobile number — must be briefed on the rescue plan</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-xs">Nearest A&E Department</p>
                <p className="text-white/70 text-xs mt-1">Hospital name, address, and driving route — especially important on rural or remote sites</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-xs">Company Safety Officer</p>
                <p className="text-white/70 text-xs mt-1">For reporting and investigation — must be notified of any serious incident or near-miss</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-xs">Site Location Details</p>
                <p className="text-white/70 text-xs mt-1">Postcode, what3words, grid reference, gate access codes — written down, not just memorised</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 08 — Lone Working Considerations                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">08</span>
            <h3 className="text-xl font-semibold text-white">Lone Working at Height</h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Lone working on a tower scaffold presents unique rescue challenges. If the lone worker is injured or becomes unwell, there is no one to raise the alarm or provide immediate assistance. Additional precautions are essential.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Lone Worker Rescue Controls</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Timed welfare checks</strong> — agree a check-in schedule (e.g., every 30 minutes) with a designated contact. If a check-in is missed, the alarm is raised immediately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Lone worker monitoring device</strong> — wearable devices with tilt sensors, man-down detection, and GPS tracking that automatically alert a monitoring centre if the worker becomes incapacitated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Buddy system (off-site)</strong> — even if no one else is physically present, a colleague or supervisor maintains phone contact at agreed intervals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Risk assessment review</strong> — the risk assessment must specifically address the lone working element and may conclude that lone tower work is not acceptable at certain sites.</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2">When Lone Working Is Not Acceptable</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Consider prohibiting lone tower work when: the site is remote with poor mobile signal, emergency response times exceed 20 minutes, the operative has a medical condition that could cause sudden incapacity, the work involves assembly or dismantling (which always requires at least two people), or the tower height exceeds the point where self-rescue is the only realistic option.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Rescue Plan Rehearsal                                        */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Rehearsing the Rescue Plan
          </h3>
          <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-xl p-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A rescue plan that has never been practised is significantly less likely to work under the pressure of a real emergency. Regular rehearsal identifies gaps, builds confidence, and ensures everyone knows their role.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-xs">Tabletop Exercise</p>
                <p className="text-white/70 text-xs mt-1">Talk through the rescue plan step by step during the toolbox talk. Ask "what if" questions: What if the phone has no signal? What if the casualty is unconscious? What if it is raining heavily?</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-emerald-400 font-semibold text-xs">Live Rehearsal</p>
                <p className="text-white/70 text-xs mt-1">Periodically practise the rescue plan using a simulated scenario. Time the response, test communications, and verify that emergency vehicle access routes are clear and well-signed.</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              After each rehearsal, debrief with the team. What went well? What could be improved? Were there any surprises? Update the plan based on the lessons learned.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Practical Guidance                                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-green-400" />
            Practical Guidance
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Rescue Plan Pre-Start Checklist</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Written rescue plan specific to this site and tower</li>
                  <li>&#10003; All workers briefed on the rescue plan</li>
                  <li>&#10003; Communication tested (mobile signal / radio range)</li>
                  <li>&#10003; Ground-level buddy identified and in position</li>
                  <li>&#10003; First aid kit at ground level, first aider identified</li>
                  <li>&#10003; Emergency vehicle access route confirmed and clear</li>
                  <li>&#10003; Site location information noted (postcode, what3words)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Information for 999 Call</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Service needed (ambulance and/or fire)</li>
                  <li>&#10003; Nature of emergency (person collapsed at height)</li>
                  <li>&#10003; Exact location — postcode, site name, what3words</li>
                  <li>&#10003; Tower height and platform level</li>
                  <li>&#10003; Number of casualties and their condition</li>
                  <li>&#10003; Access route for vehicles (gate codes, directions)</li>
                  <li>&#10003; Your name and callback number</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Legal Requirements Summary                                   */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Legal Requirements for Rescue Planning
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-elec-yellow font-semibold text-xs mb-1">Work at Height Regulations 2005 — Regulation 4</p>
                <p className="text-white/70 text-xs">Work at height must be properly planned, including planning for emergencies and rescue. This regulation is the primary legal basis requiring a rescue plan for every tower operation.</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-elec-yellow font-semibold text-xs mb-1">Health and Safety (First-Aid) Regulations 1981</p>
                <p className="text-white/70 text-xs">Employers must provide adequate and appropriate first aid equipment, facilities, and personnel. For tower work, this means a first aid kit at ground level and a qualified first aider on or near the site.</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-elec-yellow font-semibold text-xs mb-1">Management of Health and Safety at Work Regulations 1999</p>
                <p className="text-white/70 text-xs">Regulation 8 — requires employers to establish procedures for serious and imminent danger, including rescue arrangements. Workers must be informed of these procedures.</p>
              </div>
            </div>
            <p className="text-white/60 text-xs mt-3 italic">
              Failure to have a rescue plan in place before work at height begins is a criminal offence under the Work at Height Regulations 2005. It is one of the most commonly cited failures in HSE enforcement actions following tower scaffold incidents.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-white mb-2 text-sm">{faq.question}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 3 — Rescue Procedures & Emergency Planning"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5-section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Risk Assessment
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5-section-4">
              Next: Moving Towers Safely
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
