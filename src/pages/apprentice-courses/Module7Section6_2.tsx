import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Reporting Faults to Supervisors or Duty Holders - Level 2 Module 7 Section 6.2";
const DESCRIPTION = "How to report faults promptly and professionally to supervisors or duty holders";

// Quiz Questions
const quizQuestions = [
  {
    id: 1,
    question: "Why must faults be reported as soon as they are identified?",
    options: [
      "Because it looks more professional to report quickly",
      "Because minor defects can escalate into danger; prompt reporting prevents harm and demonstrates due diligence",
      "Because supervisors prefer immediate calls",
      "Because it's a legal requirement to report within 1 hour"
    ],
    correctAnswer: 1,
    explanation: "Minor defects can escalate into serious safety hazards. Prompt reporting prevents accidents and demonstrates professional responsibility."
  },
  {
    id: 2,
    question: "Who is responsible for receiving fault reports on most work sites?",
    options: [
      "Any qualified electrician",
      "The site supervisor or appointed responsible person",
      "The client directly",
      "The most senior apprentice"
    ],
    correctAnswer: 1,
    explanation: "The site supervisor or appointed responsible person has the authority and responsibility to act on fault reports."
  },
  {
    id: 3,
    question: "Who might act as the duty holder in a rental property?",
    options: [
      "The tenant",
      "Any electrician on site",
      "The landlord or appointed agent/responsible person",
      "The local electrical contractor"
    ],
    correctAnswer: 2,
    explanation: "In rental properties, the landlord or their appointed agent typically holds responsibility for electrical safety."
  },
  {
    id: 4,
    question: "Why is casual language unhelpful when reporting faults?",
    options: [
      "It sounds too friendly",
      "It's vague and may cause misunderstandings or incorrect action",
      "It takes too long to explain",
      "It's against company policy"
    ],
    correctAnswer: 1,
    explanation: "Casual language lacks specificity and can lead to misunderstandings about the nature, location, or urgency of faults."
  },
  {
    id: 5,
    question: "Which is an example of a clear, professional fault report?",
    options: [
      "The socket's dodgy",
      "Something's wrong in the living room",
      "Circuit 2 (ring final) — socket in living room shows signs of overheating at the neutral terminal. Circuit isolated and labelled. Requires further investigation before energising",
      "There's a problem with the electricity"
    ],
    correctAnswer: 2,
    explanation: "Professional reports include specific circuit references, exact locations, observed conditions, actions taken, and next steps required."
  },
  {
    id: 6,
    question: "What is the difference between verbal and written reporting?",
    options: [
      "Verbal is more important than written",
      "Written is more important than verbal",
      "Verbal provides immediate communication; written forms a permanent, traceable record",
      "There is no difference between them"
    ],
    correctAnswer: 2,
    explanation: "Verbal reporting ensures immediate action can be taken, while written reports provide permanent documentation for legal and safety purposes."
  },
  {
    id: 7,
    question: "What details must always be included in written fault documentation?",
    options: [
      "Only the date and your name",
      "Fault details, exact location, circuit/board IDs, action taken, further work required, date/time, who it was reported to",
      "Just a brief description of the problem",
      "Only the circuit number"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation must include all relevant details to enable proper action and provide legal protection."
  },
  {
    id: 8,
    question: "True or False: Apprentices can delay reporting minor faults until later in the day.",
    options: [
      "True - minor faults are not urgent",
      "False - all faults must be reported immediately",
      "True - if they're busy with other work",
      "True - if the fault seems insignificant"
    ],
    correctAnswer: 1,
    explanation: "All faults, regardless of apparent severity, must be reported immediately as they can escalate and create serious hazards."
  },
  {
    id: 9,
    question: "In the refurbishment project example, why did the fault escalate to a fire?",
    options: [
      "The fault was too severe to prevent",
      "The wrong tools were used",
      "The fault was only mentioned casually and not formally reported, so no action was taken",
      "The circuit was overloaded"
    ],
    correctAnswer: 2,
    explanation: "The fault was observed but not formally reported, meaning no remedial action was taken, allowing it to escalate."
  },
  {
    id: 10,
    question: "How did correct reporting in the school installation example prevent danger?",
    options: [
      "By using expensive test equipment",
      "By working faster than normal",
      "By immediate escalation, isolation, documentation, and rectification before energising",
      "By ignoring the problem until later"
    ],
    correctAnswer: 2,
    explanation: "Following proper reporting procedures ensured the dangerous circuit was isolated and repaired before it could cause harm."
  }
];

// Inline Check Questions
const quickCheckQuestions = [
  {
    id: "reporting-delay",
    question: "Why is it dangerous to delay reporting even a minor-looking fault?",
    options: [
      "It's often fine to wait if you're busy",
      "Minor defects never escalate",
      "Small defects can indicate serious risks and may escalate, creating safety and legal issues",
      "Reporting is optional for apprentices"
    ],
    correctIndex: 2,
    explanation: "Even minor signs (e.g., discoloration) can signal overheating; delay increases risk and liability."
  },
  {
    id: "duty-holder",
    question: "Who is considered the duty holder in an industrial site with a facilities management team?",
    options: [
      "The newest apprentice",
      "The facilities manager or appointed responsible person",
      "Any employee on site",
      "The equipment manufacturer"
    ],
    correctIndex: 1,
    explanation: "Duty holders are appointed persons (often FM/estates manager) responsible for electrical safety."
  },
  {
    id: "unprofessional-language",
    question: "Why is \"circuit's a bit dodgy\" an unprofessional way to report a fault?",
    options: [
      "It's too short but perfectly clear",
      "It's informal, vague, and lacks specifics (location, circuit, condition, action)",
      "It includes too much technical detail",
      "It always implies the wrong circuit"
    ],
    correctIndex: 1,
    explanation: "Reports must be factual, specific, and actionable."
  },
  {
    id: "documentation-requirements",
    question: "What information should always be included when documenting a reported fault?",
    options: [
      "Only a brief \"fault exists\"",
      "Fault details, exact location, circuit/board IDs, action taken, further work required, date/time, who it was reported to",
      "Just the client's name and your initials",
      "A photo instead of written notes"
    ],
    correctIndex: 1,
    explanation: "Comprehensive, traceable records formally transfer responsibility and protect all parties."
  }
];

// FAQs
const faqs = [
  {
    question: "Why is prompt reporting important?",
    answer: "Because even minor defects can escalate into dangerous conditions if ignored."
  },
  {
    question: "Who should faults be reported to?",
    answer: "Supervisors or duty holders such as landlords, site managers, or clients."
  },
  {
    question: "Why must reports be clear and factual?",
    answer: "To avoid misunderstanding and ensure the fault is dealt with correctly."
  },
  {
    question: "Why is written documentation essential?",
    answer: "It provides a permanent record of what was found and transfers responsibility."
  },
  {
    question: "Should I isolate a circuit before reporting if it's unsafe?",
    answer: "Yes. Make safe or isolate if there's a risk. Then report immediately and document the action taken."
  }
];

export default function Module7Section6_2() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.6.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Reporting Faults to Supervisors or Duty Holders
          </h1>
          <p className="text-white text-sm sm:text-base leading-relaxed">
            Prompt, factual reporting to the correct person — with clear documentation and escalation
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Identify the duty holder/supervisor for this site/job</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Make safe or isolate if needed; never leave a hazard energised</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Capture circuit ref, board ID, exact location and brief facts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Prepare to report verbally first; then write it up immediately</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Vague language ("bit dodgy"), no circuit reference, delayed reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Standard terminology, circuit/board IDs, time/date, action taken (e.g., isolated)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Who you reported to, signatures/time stamps, record stored/issued, escalation logged if required</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Locating a fault is only valuable if it is properly communicated. Electrical work involves teams, duty holders, and clients, and unless faults are reported promptly and clearly, they may remain unresolved or be misunderstood. Apprentices must learn that reporting faults is a professional duty: it transfers responsibility to those authorised to act and ensures installations remain safe.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-4 sm:mb-6">By the end of this subsection, you should be able to:</p>
          
          <div className="bg-card border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <div className="grid gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Explain why reporting is essential</span>
                  <span className="text-xs sm:text-sm text-white">Understand legal obligations and safety implications</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Describe the steps to follow when reporting faults</span>
                  <span className="text-xs sm:text-sm text-white">Master the systematic approach to fault reporting</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Identify who to report to</span>
                  <span className="text-xs sm:text-sm text-white">Recognise duty holders and reporting hierarchies</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Maintain professionalism throughout the process</span>
                  <span className="text-xs sm:text-sm text-white">Use clear, factual language and proper documentation</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Content / Learning</h2>
          
          {/* Section 1 */}
          <div className="border-l-4 border-l-elec-yellow pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">1. The Importance of Prompt Reporting</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                Faults must always be reported as soon as they are identified. Even something that appears minor — such as a socket faceplate showing slight discolouration — could indicate overheating and become a fire risk if ignored. Prompt reporting ensures that faults are addressed before they escalate.
              </p>
              <p className="text-white leading-relaxed mb-4">
                Delay not only increases risk but can also place legal responsibility on the electrician who noticed the problem but failed to act. Under the Electricity at Work Regulations 1989, all persons have a duty to prevent danger. If you observe a fault and fail to report it, you could be held liable for any resulting injury or damage.
              </p>
              <p className="text-white leading-relaxed mb-4">
                <strong>Examples of faults requiring immediate reporting:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-2">
                <li>• Damaged cables or conductors exposing live parts</li>
                <li>• Socket outlets showing signs of overheating (scorching, discolouration)</li>
                <li>• Loose connections causing arcing or sparking</li>
                <li>• RCD tripping repeatedly without obvious cause</li>
                <li>• Insulation resistance readings below acceptable limits</li>
                <li>• Earth fault loop impedance values exceeding maximum permitted</li>
                <li>• Missing or damaged protective barriers</li>
              </ul>
              <p className="text-white leading-relaxed mb-4">
                Remember: what appears minor today could become a major incident tomorrow. Professional electricians report everything, no matter how insignificant it may seem.
              </p>
            </div>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <InlineCheck {...quickCheckQuestions[0]} />
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-l-green-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">2. Identifying the Correct Person to Report To</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                It is not enough to notice a fault; the electrician must know who to report it to. The reporting structure depends on the type of installation and work environment. Clear understanding of the chain of responsibility prevents delays and ensures accountability.
              </p>
              <p className="text-white leading-relaxed mb-4">
                <strong>Common reporting structures:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-2">
                <li>• <strong>Construction sites:</strong> Site supervisor, site manager, or electrical contractor</li>
                <li>• <strong>Commercial premises:</strong> Facilities manager, building services manager, or appointed duty holder</li>
                <li>• <strong>Rental properties:</strong> Landlord, letting agent, or property management company</li>
                <li>• <strong>Industrial facilities:</strong> Maintenance manager, plant engineer, or safety officer</li>
                <li>• <strong>Public buildings:</strong> Estates manager, technical services, or designated responsible person</li>
              </ul>
              <p className="text-white leading-relaxed mb-4">
                If unsure who to report to, ask your immediate supervisor. Never assume someone else will handle it. The duty holder is the person with legal responsibility for electrical safety in that particular premises or installation.
              </p>
              <p className="text-white leading-relaxed mb-4">
                <strong>Key principle:</strong> Report upwards in the hierarchy. An apprentice reports to their supervisor, who may then escalate to the duty holder or client as appropriate.
              </p>
            </div>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <InlineCheck {...quickCheckQuestions[1]} />
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-l-amber-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">3. Communicating Clearly and Professionally</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                Reports must be factual, specific, and free from vague or casual language. Professional communication ensures the fault is understood correctly and action can be taken promptly.
              </p>
              <p className="text-white leading-relaxed mb-4">
                <strong>Avoid vague language:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• "The socket's dodgy" ❌</li>
                <li>• "Something's not right" ❌</li>
                <li>• "It looks a bit iffy" ❌</li>
                <li>• "There's a problem somewhere" ❌</li>
              </ul>
              <p className="text-white leading-relaxed mb-4">
                <strong>Use professional, specific language:</strong>
              </p>
              <div className="bg-card border border-amber-500/20 rounded-lg p-4 mb-4">
                <p className="text-white font-medium mb-2">Example professional report:</p>
                <p className="text-white text-sm">"Circuit 2 (ring final) — socket in living room shows signs of overheating at the neutral terminal. Circuit isolated and labelled 'DO NOT USE'. Requires investigation and repair by competent electrician before re-energising."</p>
              </div>
              <p className="text-white leading-relaxed mb-4">
                <strong>Essential elements of clear reporting:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-2">
                <li>• Circuit identification (number, type, board reference)</li>
                <li>• Exact location (room, floor, building section)</li>
                <li>• Specific observation (what you saw, measured, or detected)</li>
                <li>• Action taken (isolated, labelled, made safe)</li>
                <li>• Recommendation (further investigation, immediate repair, replacement)</li>
              </ul>
              <p className="text-white leading-relaxed mb-4">
                Both verbal and written reporting are important: verbal provides immediate communication, written creates a permanent record for legal compliance and future reference.
              </p>
            </div>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <InlineCheck {...quickCheckQuestions[2]} />
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-l-purple-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">4. Documenting and Transferring Responsibility</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                Accurate documentation ensures that responsibility for the fault is formally passed to the supervisor or duty holder. This protects the apprentice legally and ensures no fault goes unaddressed.
              </p>
              <p className="text-white leading-relaxed mb-4">
                <strong>Essential documentation requirements:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-2">
                <li>• <strong>Date and time:</strong> When the fault was discovered</li>
                <li>• <strong>Location:</strong> Precise details (building, floor, room, specific equipment)</li>
                <li>• <strong>Circuit reference:</strong> Board designation and circuit number</li>
                <li>• <strong>Fault description:</strong> What was observed or measured</li>
                <li>• <strong>Action taken:</strong> Isolation, labelling, making safe</li>
                <li>• <strong>Who reported to:</strong> Name and position of person notified</li>
                <li>• <strong>Signature:</strong> Your name and signature</li>
                <li>• <strong>Recommendation:</strong> Required follow-up action</li>
              </ul>
              <p className="text-white leading-relaxed mb-4">
                <strong>Documentation methods:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-2">
                <li>• Formal fault report forms</li>
                <li>• Site diary entries</li>
                <li>• Test sheet annotations</li>
                <li>• Digital reporting systems</li>
                <li>• Email notifications with read receipts</li>
              </ul>
              <p className="text-white leading-relaxed mb-4">
                <strong>Legal protection:</strong> Proper documentation demonstrates that you fulfilled your duty of care under the Electricity at Work Regulations 1989. It transfers responsibility to the appropriate person while protecting you from potential liability.
              </p>
              <p className="text-white leading-relaxed mb-4">
                <strong>Important:</strong> Once reported, apprentices must not attempt to rectify faults unless specifically authorised and competent to do so. Follow your supervisor's instructions and company procedures.
              </p>
            </div>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Practical Guidance</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-sm sm:text-base text-white mb-4">
              Apprentices should adopt a systematic approach to fault reporting that ensures nothing is missed and responsibility is properly transferred:
            </p>
            
            <div className="bg-card border border-elec-yellow/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <h3 className="font-medium text-white mb-2 sm:mb-3 text-sm sm:text-base">Step-by-Step Reporting Process</h3>
              <ol className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-white">
                <li><strong>1. Make Safe:</strong> Isolate circuits if dangerous, apply locks/labels, prevent access to live parts</li>
                <li><strong>2. Assess Urgency:</strong> Determine if immediate evacuation or emergency services are needed</li>
                <li><strong>3. Gather Information:</strong> Note circuit references, exact location, what you observed</li>
                <li><strong>4. Report Verbally:</strong> Contact supervisor/duty holder immediately by phone or in person</li>
                <li><strong>5. Document in Writing:</strong> Complete formal report using company procedures</li>
                <li><strong>6. Follow Up:</strong> Ensure your report was received and action is being taken</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="bg-card border border-amber-500/20 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-white mb-2 sm:mb-3 text-sm sm:text-base">Essential Tools & Materials</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white">
                  <li>• Company fault report forms</li>
                  <li>• Warning labels and isolation locks</li>
                  <li>• Camera/phone for photographic evidence</li>
                  <li>• Contact list of supervisors/duty holders</li>
                  <li>• Site diary or logbook</li>
                </ul>
              </div>
              
              <div className="bg-card border border-green-500/20 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-white mb-2 sm:mb-3 text-sm sm:text-base">Professional Language Examples</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white">
                  <li>• "Circuit isolated due to..."</li>
                  <li>• "Insulation resistance below 1MΩ"</li>
                  <li>• "Evidence of overheating observed"</li>
                  <li>• "Requires competent person investigation"</li>
                  <li>• "Made safe pending repair"</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-purple-500/20 rounded-lg p-3 sm:p-4">
              <h3 className="font-medium text-white mb-2 sm:mb-3 text-sm sm:text-base">Key Reminders</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white">
                <li>• Never assume someone else will report the fault</li>
                <li>• Don't attempt repairs beyond your competence level</li>
                <li>• Keep copies of all written reports for your records</li>
                <li>• If unsure about reporting procedures, ask your supervisor</li>
                <li>• When in doubt about safety, isolate first and report immediately</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Applications */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Real-World Applications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-medium text-white text-sm sm:text-base">Poor Practice</h3>
              <div className="bg-card border border-red-500/20 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-white mb-3 leading-relaxed">
                  On a commercial refurbishment project, an apprentice noticed scorching on a socket but only mentioned it casually to another colleague. Because it was not formally reported, no action was taken. Weeks later, the socket overheated and caused a small fire. Investigators found the defect had been observed earlier but not reported, leading to reputational and financial damage for the contractor.
                </p>
                <div className="bg-card rounded p-2 sm:p-3">
                  <h4 className="font-medium text-xs sm:text-xs sm:text-sm text-white mb-1 sm:mb-2">Key Issues:</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• No formal reporting</li>
                    <li>• No documentation</li>
                    <li>• No responsibility transfer</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-medium text-white text-sm sm:text-base">Good Practice</h3>
              <div className="bg-card border border-green-500/20 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-white mb-3 leading-relaxed">
                  An apprentice testing a school installation recorded an insulation resistance reading below the required 1 MΩ. He immediately informed his supervisor, who isolated the circuit, documented the fault, and arranged for it to be rectified before handover. This prevented the energisation of a dangerous circuit and demonstrated the value of prompt, professional reporting.
                </p>
                <div className="bg-card rounded p-2 sm:p-3">
                  <h4 className="font-medium text-xs sm:text-xs sm:text-sm text-white mb-1 sm:mb-2">Key Strengths:</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Prompt escalation</li>
                    <li>• Immediate isolation</li>
                    <li>• Clear documentation</li>
                    <li>• Safe outcome</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg font-semibold text-white mb-4">Key Takeaways</h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Report faults immediately — small signs can indicate serious risk</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Always report to the correct person (supervisor/duty holder) and transfer responsibility</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Use clear, factual language with circuit/board IDs, location, and action taken</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Document both verbal and written reporting for traceability and compliance (BS 7671, EAWR 1989)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Do not attempt repairs beyond your competence or without authorisation</span>
            </div>
          </div>
        </Card>

        {/* Test Your Knowledge */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Reporting Faults to Supervisors or Duty Holders" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
          <Button variant="outline" className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Back to Section 7.6</span>
            </Link>
          </Button>
          <Button className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="../6-3">
              <span className="text-sm sm:text-base">Next: Temporary Isolation or Making Safe</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}