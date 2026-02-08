import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Liaising with Non-Technical Staff - MOET Module 6 Section 4.3";
const DESCRIPTION = "Communicating with building occupants, facilities managers, clients, and non-technical colleagues. Translating technical information, managing expectations, and maintaining professional relationships.";

const quickCheckQuestions = [
  {
    id: "non-tech-language",
    question: "When explaining a power outage to a building manager, the most effective approach is to:",
    options: [
      "Use detailed technical terminology to demonstrate your expertise",
      "Explain in plain language what will happen, when it will happen, how long it will last, and what areas are affected — without unnecessary jargon",
      "Tell them not to worry about it",
      "Send them a copy of BS 7671"
    ],
    correctIndex: 1,
    explanation: "Non-technical staff need to understand the impact on their operations, not the technical details. Focus on: what will be affected, when, for how long, and what they need to do. Use plain language — 'the power will be off in the east wing from 10am to 2pm' is more useful than 'we need to isolate the 400 A incomer on DB-E1 for busbar testing'."
  },
  {
    id: "managing-expectations",
    question: "A building tenant asks when their air conditioning will be fixed. You are not sure of the timescale. The best response is:",
    options: [
      "Promise it will be done today to keep them happy",
      "Be honest: explain what the fault is in simple terms, what needs to happen next, and give a realistic estimate — or say you will confirm after speaking with your supervisor",
      "Ignore the question",
      "Tell them to call someone else"
    ],
    correctIndex: 1,
    explanation: "Never promise what you cannot deliver. Honesty builds trust; false promises destroy it. If you are unsure of the timescale, say so: 'I have identified the fault. I need to order a part and confirm the delivery time. I will update you by 3pm today with a confirmed timescale.' Then make sure you follow through."
  },
  {
    id: "safety-communication",
    question: "You need to communicate a safety restriction to office staff who want to access a corridor near your work area. How should you approach this?",
    options: [
      "Put up a barrier and walk away",
      "Explain the hazard in terms they understand, describe what you are doing to keep them safe, provide an alternative route, and estimate when access will be restored",
      "Use technical safety terminology to make the point",
      "Let them through and hope for the best"
    ],
    correctIndex: 1,
    explanation: "Non-technical staff are more likely to comply with safety restrictions when they understand why. Explain the hazard simply ('there are live electrical cables exposed'), describe the safety measures ('we have barriers and warning signs in place'), offer an alternative ('you can use the north corridor'), and give a timescale ('we expect to finish by 4pm')."
  },
  {
    id: "complaint-handling",
    question: "A tenant complains angrily about repeated electrical faults in their office. The most professional response is to:",
    options: [
      "Argue with them about the cause",
      "Listen actively, acknowledge their frustration, take notes, explain what you can do, and follow up with your supervisor — remaining calm and professional throughout",
      "Blame the previous contractor",
      "Tell them it is not your problem"
    ],
    correctIndex: 1,
    explanation: "Active listening and acknowledgement defuse frustration. Take their concern seriously, note the details, explain what action you will take, and follow through. Even if the complaint is not within your control to resolve, showing that you care and will escalate it appropriately maintains professional relationships."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When explaining maintenance work to non-technical staff, 'jargon-free' communication means:",
    options: [
      "Speaking slowly as if they are unintelligent",
      "Using plain, everyday language to describe the work, its impact, and timescale — replacing technical terms with simple explanations where necessary",
      "Avoiding all details about the work",
      "Using even more technical terms to sound professional"
    ],
    correctAnswer: 1,
    explanation: "Jargon-free communication respects the audience. Non-technical staff are intelligent professionals in their own fields — they simply do not share your electrical vocabulary. Replace 'RCD tripping on 30 mA earth leakage' with 'a safety device is switching off the power because it has detected a fault. We need to find and fix the fault before we can restore power safely.'"
  },
  {
    id: 2,
    question: "A facilities manager asks you to 'just turn it back on' after you have isolated a faulty circuit. You should:",
    options: [
      "Re-energise immediately to keep them happy",
      "Explain clearly and calmly why the circuit was isolated, what the safety risk is, and what must happen before it can be safely re-energised",
      "Ignore them and continue working",
      "Tell them to do it themselves"
    ],
    correctAnswer: 1,
    explanation: "Safety decisions must never be compromised by pressure from non-technical staff. Explain the situation: 'This circuit has been isolated because there is a fault that could cause a fire/electric shock. I cannot safely re-energise it until the fault is repaired. I understand this is inconvenient and I am working to resolve it as quickly as possible.'"
  },
  {
    id: 3,
    question: "Before starting noisy or disruptive maintenance work in an occupied building, you should:",
    options: [
      "Just start working — they will get used to it",
      "Notify affected occupants in advance: explain what work is planned, when it will occur, how long it will last, what disruption to expect, and who to contact with concerns",
      "Work during the night without telling anyone",
      "Send a technical specification document"
    ],
    correctAnswer: 1,
    explanation: "Advance notification shows professionalism and respect. People tolerate disruption much better when they know it is coming, how long it will last, and that it serves a necessary purpose. This is standard practice in occupied buildings and often a contractual requirement."
  },
  {
    id: 4,
    question: "When a non-technical client asks 'is my building safe?', the appropriate response is to:",
    options: [
      "Say 'yes' regardless of the actual situation",
      "Provide an honest, measured response based on your findings, explaining any issues in plain language along with the actions being taken to address them",
      "Refuse to answer because it is not your responsibility",
      "Say 'no' to alarm them into approving more work"
    ],
    correctAnswer: 1,
    explanation: "Honesty is essential but must be delivered with context. If there are issues, explain them in terms the client can understand, describe the severity, and outline the actions being taken. 'The electrical installation is generally in good condition. We have found one issue that needs attention — a safety device in the main panel needs replacing. I have isolated the affected circuit as a precaution and we can replace the device this week.'"
  },
  {
    id: 5,
    question: "A receptionist reports 'the lights are flickering'. To gather useful diagnostic information, you should ask:",
    options: [
      "Nothing — just go and look",
      "Specific questions: which lights, when did it start, is it constant or intermittent, does it happen at particular times, have any other electrical issues been noticed nearby?",
      "Whether they have tried turning them off and on",
      "Why they did not report it sooner"
    ],
    correctAnswer: 1,
    explanation: "Non-technical staff are your first line of fault detection. Their observations are valuable but need guided extraction. Asking structured questions helps you build a picture of the fault before you arrive: location, duration, pattern, and associated symptoms. This saves diagnostic time and shows you take their report seriously."
  },
  {
    id: 6,
    question: "Written communication to building occupants about planned maintenance should:",
    options: [
      "Contain detailed circuit diagrams",
      "Be clear, concise, and focused on impact: what will happen, when, for how long, what areas are affected, and what occupants need to do",
      "Use as many technical terms as possible",
      "Be at least 5 pages long to show thoroughness"
    ],
    correctAnswer: 1,
    explanation: "Occupant communications should answer the five key questions: What is happening? When? How long? What is affected? What do I need to do? Keep it to one page or less. Use a clear heading, bullet points, and a contact name for queries. A well-written notice reduces the number of individual queries you have to answer."
  },
  {
    id: 7,
    question: "When working in an occupied office, you should:",
    options: [
      "Act as if the occupants are not there",
      "Minimise disruption, keep the work area tidy, explain what you are doing if asked, and be courteous and professional at all times",
      "Play music to make the environment more pleasant",
      "Talk loudly on the phone about other jobs"
    ],
    correctAnswer: 1,
    explanation: "You are a guest in their workplace. Professional behaviour in occupied spaces includes: minimising noise and dust, keeping your work area contained and tidy, covering surfaces where needed, explaining your work briefly if asked, and being courteous. Your behaviour reflects on your employer and the maintenance team."
  },
  {
    id: 8,
    question: "A building manager asks for a written summary of today's maintenance work. You should:",
    options: [
      "Say you are too busy",
      "Provide a brief, clear summary: what was done, what was found, what was repaired, what is outstanding, and any recommended follow-up actions — in plain language",
      "Copy and paste the CMMS work order including all technical codes",
      "Tell them to check the CMMS themselves"
    ],
    correctAnswer: 1,
    explanation: "Building managers need maintenance information translated into operational language. A summary for a building manager should focus on: systems affected, current status (working/not working), any ongoing risks, outstanding actions, and timescales. Avoid CMMS codes, circuit references, and technical specifications unless specifically requested."
  },
  {
    id: 9,
    question: "When a non-technical person makes a suggestion about an electrical fault, you should:",
    options: [
      "Dismiss it immediately because they are not qualified",
      "Listen respectfully — they may have observed something useful — then explain your professional assessment politely",
      "Agree with whatever they say to avoid conflict",
      "Lecture them about electrical qualifications"
    ],
    correctAnswer: 1,
    explanation: "Non-technical staff observe their environment every day. Their observations ('the lights always flicker when the kettle is on') can provide valuable diagnostic clues. Listen respectfully, consider whether their observation is useful, and explain your professional assessment. This builds mutual respect and encourages future fault reporting."
  },
  {
    id: 10,
    question: "If you cannot meet a promised deadline for completing work, you should:",
    options: [
      "Hope nobody notices",
      "Inform the affected parties as early as possible, explain the reason for the delay, provide a revised estimate, and apologise for the inconvenience",
      "Blame the parts supplier",
      "Rush the work to meet the deadline regardless of quality"
    ],
    correctAnswer: 1,
    explanation: "Early communication about delays maintains trust. People plan around your timescales — late notification causes more disruption than the delay itself. Provide: the reason (briefly), the revised timescale, and any interim measures. Never rush safety-critical work to meet a deadline."
  },
  {
    id: 11,
    question: "Under ST1426, effective liaison with non-technical staff demonstrates:",
    options: [
      "The ability to use simple language",
      "Professional behaviour, customer service skills, and the ability to represent the maintenance function positively while maintaining safety standards",
      "The ability to avoid difficult conversations",
      "The ability to work unsupervised"
    ],
    correctAnswer: 1,
    explanation: "ST1426 assesses professional behaviours including customer interaction, communication skills, and the ability to represent your organisation. Effective liaison with non-technical staff demonstrates all of these — plus the critical ability to maintain safety standards while being responsive to operational needs."
  }
];

const faqs = [
  {
    question: "How do I explain a technical issue to someone with no electrical knowledge?",
    answer: "Use analogies and focus on impact. Instead of 'the RCD is tripping due to earth leakage on the ring final circuit', try 'a safety device is detecting a fault and switching off the power to protect people. Think of it like a smoke detector for electricity — it has detected something wrong and is doing its job. We need to find the fault before we can restore power safely.' Focus on what they need to know: what is affected, how long it will take, and what to do in the meantime."
  },
  {
    question: "What if a tenant insists I do something I know is unsafe?",
    answer: "Be polite but firm. Explain the safety risk in terms they can understand and explain that you have a legal obligation not to carry out unsafe work. Offer an alternative where possible. If they persist, escalate to your supervisor and document the conversation. Never compromise safety to please a client — the law protects you in this situation under HASAWA 1974 Section 7."
  },
  {
    question: "How do I handle multiple people asking me questions while I am trying to work?",
    answer: "Be polite but set boundaries. Acknowledge each person, give a brief answer or explain that you need to concentrate on the task in hand, and suggest they contact the building manager or helpdesk for updates. If interruptions become a safety issue (e.g., while working on live detection or testing), explain that you need to focus for safety reasons and will be available to answer questions shortly."
  },
  {
    question: "Should I give non-technical staff technical details about faults?",
    answer: "Provide enough information for them to understand the impact on their operations, but do not overwhelm them with technical detail. A facilities manager may want more detail than a receptionist. Match the level of detail to the person and the situation. When in doubt, explain the impact (what is affected and for how long) rather than the cause (which circuit, what component)."
  },
  {
    question: "How do I communicate with people who are frustrated or angry about a maintenance issue?",
    answer: "Listen first. Acknowledge their frustration without being defensive. Use phrases like 'I understand this is disruptive' and 'I appreciate your patience.' Then focus on the solution: what you are doing, when it will be resolved, and what to do in the meantime. Avoid blame or excuses. If the person is abusive, remain calm and professional, and escalate to your supervisor."
  }
];

const MOETModule6Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" /><span>Module 6.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Liaising with Non-Technical Staff
          </h1>
          <p className="text-white/80">
            Communicating effectively with building occupants, facilities managers, and clients
          </p>
        </header>

        {/* Summary boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Audience:</strong> Building managers, tenants, receptionists, clients</li>
              <li className="pl-1"><strong>Language:</strong> Plain English — no jargon, focus on impact</li>
              <li className="pl-1"><strong>Key skill:</strong> Translating technical information into operational terms</li>
              <li className="pl-1"><strong>Professionalism:</strong> Courteous, honest, and responsive</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Notifications:</strong> Advance warning of planned disruption</li>
              <li className="pl-1"><strong>Safety communication:</strong> Explaining restrictions and hazards</li>
              <li className="pl-1"><strong>Expectation management:</strong> Honest timescales and follow-up</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to customer service and behaviour KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Translate technical electrical information into plain language for non-technical audiences",
              "Manage expectations regarding timescales, disruption, and outcomes",
              "Communicate safety restrictions clearly and gain compliance from building occupants",
              "Handle complaints and difficult conversations with professionalism",
              "Write effective notices and updates for building occupants and clients",
              "Represent your organisation positively in all interactions with non-technical staff"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Your Audience
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician, you will regularly interact with people who have no electrical training. Building managers, office workers, receptionists, security guards, cleaners, tenants, and clients all need to understand aspects of your work — but they do not share your technical vocabulary. Your ability to bridge this gap is a core professional skill.
            </p>
            <p>
              The key principle is simple: communicate the impact, not the cause. A building manager does not need to know that a 63 A MCCB has tripped on overload — they need to know that power to the east wing is off, that you are investigating, and that you expect to restore it within two hours. The technical detail matters to you and your supervisor; the operational impact matters to everyone else.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Non-Technical Contacts</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-elec-yellow/80 font-medium">Contact</th>
                      <th className="py-2 pr-4 text-elec-yellow/80 font-medium">What They Need</th>
                      <th className="py-2 text-elec-yellow/80 font-medium">Communication Style</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Facilities manager</td>
                      <td className="py-2 pr-4">Operational status, timescales, costs</td>
                      <td className="py-2">Semi-technical, detail-oriented</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Building tenant</td>
                      <td className="py-2 pr-4">When their space will be affected or restored</td>
                      <td className="py-2">Plain language, empathetic</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Receptionist / security</td>
                      <td className="py-2 pr-4">What to tell people who ask, safety info</td>
                      <td className="py-2">Brief, clear, actionable</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Client / building owner</td>
                      <td className="py-2 pr-4">Overall condition, compliance, costs</td>
                      <td className="py-2">Professional, summary-level</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Cleaning / catering staff</td>
                      <td className="py-2 pr-4">Access restrictions, safety precautions</td>
                      <td className="py-2">Simple, direct, visual where possible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Translating Technical Information
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Translating technical information does not mean dumbing it down — it means reframing it so the listener can make informed decisions relevant to their role. A facilities manager making decisions about building operations needs different information from a design engineer diagnosing a fault.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Translation Examples</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-elec-yellow/80 font-medium">Technical Version</th>
                      <th className="py-2 text-elec-yellow/80 font-medium">Plain Language Version</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">&quot;The RCD is tripping on 30 mA earth leakage from the ring final circuit&quot;</td>
                      <td className="py-2">&quot;A safety device is detecting a fault and switching off the power. We need to find and fix the fault before we can restore power safely&quot;</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">&quot;The busbar trunking requires thermographic survey&quot;</td>
                      <td className="py-2">&quot;We need to check the main power cables for overheating using a thermal camera. This is a routine safety check&quot;</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">&quot;The Zs readings exceed Table 41.3 maximum values&quot;</td>
                      <td className="py-2">&quot;The safety testing has shown that the protection for this circuit may not operate quickly enough in a fault. We need to investigate and correct this before the circuit can be used&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">&quot;C1 observation — danger present&quot;</td>
                      <td className="py-2">&quot;We have found a serious electrical fault that poses an immediate risk. The affected area has been made safe and isolated. A repair is needed urgently&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">The Five Questions Technique</p>
              <p className="text-sm text-white">When communicating with non-technical staff, answer their five unspoken questions: (1) What is wrong? (2) Am I safe? (3) What are you doing about it? (4) How long will it take? (5) What do I need to do? If you address all five, most people will be satisfied and cooperative.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Managing Expectations and Disruption
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance work inevitably causes disruption. The key to maintaining good relationships with building occupants is managing their expectations honestly. People tolerate inconvenience much better when they understand why it is necessary, how long it will last, and what measures are being taken to minimise the impact.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Work Notification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>What:</strong> Brief description of the work in plain language</li>
                <li className="pl-1"><strong>Why:</strong> Reason for the work (safety compliance, fault repair, improvement)</li>
                <li className="pl-1"><strong>When:</strong> Date and time, including start and expected finish</li>
                <li className="pl-1"><strong>Where:</strong> Specific areas affected — be precise</li>
                <li className="pl-1"><strong>Impact:</strong> What will be disrupted (power, lighting, access, noise)</li>
                <li className="pl-1"><strong>Mitigations:</strong> What you are doing to minimise disruption</li>
                <li className="pl-1"><strong>Contact:</strong> Who to contact with questions or concerns</li>
              </ul>
            </div>
            <p>
              Timing is important. For planned shutdowns in commercial buildings, 48 hours advance notice is typical. For emergency work, provide as much notice as practically possible — even 30 minutes is better than none. Always communicate through the building manager or facilities team unless you have a direct relationship with tenants.
            </p>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Under-Promise, Over-Deliver</p>
              <p className="text-sm text-white">If a repair might take 2-4 hours, tell the occupants 4 hours. If you finish early, they are pleased. If you said 2 hours and it takes 4, they are frustrated. Realistic timescales build trust; optimistic ones destroy it. Never promise a timescale you are not confident you can meet.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Handling Complaints and Difficult Conversations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Complaints and difficult conversations are a normal part of working in occupied buildings. Equipment failures cause genuine inconvenience, and people have a right to be frustrated. How you handle these situations reflects on you, your team, and your organisation.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The LAST Framework for Complaint Handling</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>L — Listen:</strong> Let the person speak without interruption. Show you are listening through body language and verbal acknowledgement</li>
                <li className="pl-1"><strong>A — Acknowledge:</strong> Validate their frustration: &quot;I understand this is causing problems for your team. I appreciate your patience&quot;</li>
                <li className="pl-1"><strong>S — Solve:</strong> Explain what you can do: &quot;I am going to investigate the cause now. I expect to have an update for you within the hour&quot;</li>
                <li className="pl-1"><strong>T — Thank:</strong> Thank them for reporting the issue: &quot;Thank you for letting us know. Early reports help us fix problems faster&quot;</li>
              </ul>
            </div>
            <p>
              Never become defensive, blame others, or argue with a complaint. Even if the complaint seems unreasonable, the person&apos;s frustration is real. Your job is to acknowledge their experience, explain what you can do, and follow through. If a complaint is beyond your ability to resolve, explain that you will escalate it to your supervisor and make sure you actually do.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Difficult Situations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Refusing unsafe requests:</strong> &quot;I understand you need this done quickly, but I cannot safely re-energise this circuit until the fault is repaired. Doing so could cause a fire. I am working as fast as safely possible.&quot;</li>
                <li className="pl-1"><strong>Repeated faults:</strong> &quot;I understand this is frustrating. I have recorded the pattern and will be raising it with our engineering team to find a permanent solution, rather than just fixing the same fault again.&quot;</li>
                <li className="pl-1"><strong>Access denied:</strong> &quot;I appreciate this is inconvenient timing. However, this maintenance is required by law and the inspection is due. Could we agree a time this week that works for both of us?&quot;</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Professional Conduct in Occupied Spaces
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Working in occupied buildings requires a level of professionalism that goes beyond technical competence. You are representing your employer and the maintenance profession in someone else&apos;s workplace. First impressions matter, and repeated interactions build (or erode) the reputation of the entire maintenance team.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Conduct Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Appearance:</strong> Clean PPE, identification badge visible, professional appearance</li>
                <li className="pl-1"><strong>Arrival:</strong> Report to reception or building management on arrival</li>
                <li className="pl-1"><strong>Work area:</strong> Keep contained, use dust sheets, minimise mess</li>
                <li className="pl-1"><strong>Noise:</strong> Schedule noisy work for least-disruptive times where possible</li>
                <li className="pl-1"><strong>Communication:</strong> Greet people, explain what you are doing if asked</li>
                <li className="pl-1"><strong>Departure:</strong> Leave the work area clean, remove all debris, sign out</li>
                <li className="pl-1"><strong>Follow-up:</strong> Honour any commitments you made regarding updates or completion</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">ST1426 Professional Behaviour</p>
              <p className="text-sm text-white">The ST1426 standard explicitly assesses professional behaviours in the end-point assessment. This includes: personal presentation, customer interaction, responsibility, working with others, and representing the organisation. How you interact with non-technical staff is directly assessed — it is not a soft skill that can be overlooked.</p>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />Previous: Communicating with Supervisors
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section4-4">
              Next: Professional Behaviour and Teamwork<ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section4_3;
