import { ArrowLeft, ArrowRight, FileText, AlertTriangle, CheckCircle2, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "Why are written instructions important in electrical work?",
    options: [
      "They're required by law in all cases",
      "They provide a permanent record, reduce reliance on memory, and ensure consistency",
      "They're faster than verbal communication",
      "They're only needed for complex work"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Give three common forms of written communication on site.",
    options: [
      "Emails, texts, phone calls",
      "Labels, handover notes, and record books/logs",
      "Drawings, specifications, invoices",
      "Reports, certificates, warranties"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What are the three key qualities of effective written communication?",
    options: [
      "Speed, brevity, formality",
      "Clarity, accuracy, legibility",
      "Complexity, detail, length",
      "Creativity, style, colour"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What should always be included on a written note?",
    options: [
      "Only the message content",
      "Date, time, and name of the person writing it",
      "Company letterhead",
      "Supervisor approval"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Why are handover sheets necessary?",
    options: [
      "They're required by insurance",
      "They ensure continuity of work, prevent missed tasks, and highlight safety issues",
      "They reduce paperwork",
      "They're only needed for large projects"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What four items should a handover include?",
    options: [
      "Name, date, time, location",
      "Work completed, outstanding work, issues/hazards, required materials/tools",
      "Start time, break time, end time, overtime",
      "Client details, costs, timescales, drawings"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What standard covers labelling requirements?",
    options: [
      "BS 5839",
      "BS 7671 and site-specific requirements",
      "BS 6701",
      "Health and Safety Executive guidelines only"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Why is handwritten labelling often discouraged?",
    options: [
      "It takes too long",
      "It may be unclear, inconsistent, and less durable",
      "It's not legal",
      "It costs too much"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What's a professional way to mark a circuit that should not be used?",
    options: [
      "Remove all the cables",
      "Use a label or note such as 'DO NOT ENERGISE – STILL UNDER TEST'",
      "Just tell people verbally",
      "Paint it a different colour"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is the risk of not leaving a written handover?",
    options: [
      "Nothing serious will happen",
      "Miscommunication, duplication of work, or dangerous mistakes",
      "Only minor delays",
      "Paperwork will be incomplete"
    ],
    correctAnswer: 1
  }
];

const quickCheckQuestions = [
  {
    id: "written1",
    question: "What is one main benefit of written instructions over verbal ones?",
    options: [
      "They're faster to create",
      "They provide a permanent record and reduce reliance on memory",
      "They're always more detailed",
      "They don't require any skills"
    ],
    correctIndex: 1,
    explanation: "Written instructions provide a permanent record that can be referred back to, reducing reliance on memory and ensuring consistency across teams and shifts."
  },
  {
    id: "written2", 
    question: "What should be included in a proper handover sheet?",
    options: [
      "Only the work completed",
      "Work completed, outstanding work, issues/hazards, and required materials",
      "Just safety issues",
      "Only your name and date"
    ],
    correctIndex: 1,
    explanation: "A comprehensive handover should include work completed, outstanding work, any issues or hazards, and materials or tools required for continuation."
  },
  {
    id: "written3",
    question: "Which standard covers electrical labelling requirements?",
    options: [
      "BS 5839",
      "BS 7671",
      "BS 7909",
      "BS 6701"
    ],
    correctIndex: 1,
    explanation: "BS 7671 (the IET Wiring Regulations) covers labelling requirements along with site-specific requirements."
  },
  {
    id: "written4",
    question: "What are the three key qualities of effective written communication?",
    options: [
      "Speed, brevity, formality",
      "Clarity, accuracy, legibility",
      "Complexity, detail, length",
      "Creativity, style, colour"
    ],
    correctIndex: 1,
    explanation: "Effective written communication must be clear, accurate, and legible to be useful and professional."
  }
];

const Module5Section6_2 = () => {
  useSEO(
    "Written Instructions and Handovers: Basic Notes and Labels | Electrical Training",
    "Learn about written communication in electrical work, including basic notes, labels, and handover procedures for maintaining safety and continuity."
  );

  const faqs = [
    {
      question: "Why can't I just rely on verbal handovers?",
      answer: "Verbal instructions can be forgotten or misheard. Written handovers provide a permanent, clear record that can be referred back to and reduces the risk of miscommunication."
    },
    {
      question: "Do labels need to follow a standard?",
      answer: "Yes, BS 7671 and site specifications require labelling to be clear, durable, and unambiguous. This ensures consistency and safety across all electrical installations."
    },
    {
      question: "What if I have poor handwriting?",
      answer: "Use printed labels and digital notes wherever possible. If handwriting is necessary, write in block capitals to ensure legibility. Clear communication is more important than perfect penmanship."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded ">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow mb-2">
                Section 5.6.2
              </Badge>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Written Instructions and Handovers
              </h1>
              <p className="text-white mt-2">
                Basic Notes, Labels, and Professional Communication
              </p>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Written communication creates permanent records that prevent miscommunication</li>
                <li>Labels must be durable, legible, and follow BS 7671 standards</li>
                <li>Handover notes ensure work continuity and highlight safety issues</li>
                <li>Always include date, time, and your name on written notes</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unlabelled circuits or unclear handover notes</li>
                <li><strong>Use:</strong> Clear labelling and structured handover sheets</li>
                <li><strong>Check:</strong> All notes include date, time, and name</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">
            By the end of this subsection, you will be able to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Understand the role of written instructions and handovers in electrical work</li>
            <li>Write clear, accurate, and professional notes and labels</li>
            <li>Identify situations where written communication is essential</li>
            <li>Apply best practices for creating effective written documentation</li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-white">Content / Learning</h2>
          
          {/* Section 1 - Blue */}
          <div className="border-l-4 border-l-elec-yellow p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-elec-yellow text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-3">
                  Importance of Written Instructions
                </h3>
                <p className="text-base text-white mb-3">
                  Written communication is vital in electrical work for recording, passing on, and confirming information. Unlike verbal instructions, written notes create permanent records:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Key Benefits:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Provides a permanent record of information that can be referred back to</li>
                      <li>Reduces reliance on memory, which may be unreliable under pressure</li>
                      <li>Ensures consistent communication across shifts and teams</li>
                      <li>Can be used as evidence if disputes or accidents occur</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Green */}
          <div className="border-l-4 border-l-green-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-3">
                  Common Written Communication in Electrical Work
                </h3>
                <p className="text-base text-white mb-3">
                  Several types of written communication are essential on electrical sites:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Labels</strong> – Marking distribution boards, circuits, isolators, and accessories</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Must clearly identify circuits, phases, and isolators</li>
                      <li>Should be durable and legible in all conditions</li>
                      <li>Follow BS 7671 and site-specific requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Basic Notes</strong> – Quick reminders left for colleagues</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Example: "Do not energise – still under test"</li>
                      <li>Always include date, time, and your name</li>
                      <li>Keep language clear and unambiguous</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Handover Sheets</strong> – Summarising progress for the next shift</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Work completed and outstanding tasks</li>
                      <li>Safety issues and hazards identified</li>
                      <li>Materials or tools required</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Record Books/Logs</strong> – Used on larger sites for tracking works</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Maintain project history and progress</li>
                      <li>Record important decisions and changes</li>
                      <li>Track material usage and delivery schedules</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Section 3 - Purple */}
          <div className="border-l-4 border-l-purple-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-3">
                  Qualities of Effective Written Communication
                </h3>
                <p className="text-base text-white mb-3">
                  Professional written communication requires specific qualities to be effective and useful:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Clarity</strong> – Use simple, unambiguous wording</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Avoid technical jargon unless universally understood</li>
                      <li>Use specific terms rather than vague descriptions</li>
                      <li>Structure information logically</li>
                      <li>Break complex information into clear steps</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Accuracy</strong> – Double-check all details</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Verify circuit numbers, ratings, and specifications</li>
                      <li>Check names, dates, and locations</li>
                      <li>Correct any errors immediately when discovered</li>
                      <li>Use precise measurements and quantities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Legibility</strong> – Ensure it can be read by anyone</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use printed labels where possible for durability</li>
                      <li>If handwriting is necessary, use block capitals</li>
                      <li>Choose appropriate pen/marker for conditions</li>
                      <li>Ensure adequate lighting when writing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Professionalism</strong> – Maintain appropriate tone</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Avoid slang or casual language in formal notes</li>
                      <li>Use accepted abbreviations (e.g., "DB" for Distribution Board)</li>
                      <li>Maintain respectful language in all communications</li>
                      <li>Follow company and site standards for documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Section 4 - Orange */}
          <div className="border-l-4 border-l-orange-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-3">
                  Handovers: Ensuring Continuity
                </h3>
                <p className="text-base text-white mb-3">
                  Proper handovers prevent duplication of work, missed tasks, and safety oversights:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Why handovers matter:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Prevents duplication of work and wasted effort</li>
                      <li>Ensures all safety issues are communicated</li>
                      <li>Maintains project momentum between shifts</li>
                      <li>Provides accountability for work progress</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Essential handover content:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li><strong>Work completed:</strong> What has been finished and tested</li>
                      <li><strong>Outstanding work:</strong> Tasks that still need completion</li>
                      <li><strong>Issues or hazards:</strong> Safety concerns or problems encountered</li>
                      <li><strong>Materials or tools required:</strong> Resources needed for continuation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Best practices:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use a structured template for consistency</li>
                      <li>Be concise but thorough in descriptions</li>
                      <li>Highlight urgent or safety-critical items</li>
                      <li>Include contact information for follow-up questions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Section 5 - Red */}
          <div className="border-l-4 border-l-red-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                5
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-3">
                  Labelling Standards (Basic Awareness)
                </h3>
                <p className="text-base text-white mb-3">
                  Proper labelling is essential for safety and compliance with electrical standards:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Requirements for electrical labels:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Must be durable enough to withstand the electrical environment</li>
                      <li>Must remain legible throughout the installation's life</li>
                      <li>Follow BS 7671 and site-specific requirements</li>
                      <li>Should clearly identify circuits, phases, and isolators</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Types of labels commonly used:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Circuit identification labels on distribution boards</li>
                      <li>Warning labels for hazardous areas or equipment</li>
                      <li>Isolation point identification labels</li>
                      <li>Cable route and termination labels</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Best practices for labelling:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use printed labels wherever possible for consistency</li>
                      <li>Choose appropriate materials for the environment</li>
                      <li>Ensure labels are positioned where they can be easily seen</li>
                      <li>Replace any damaged or illegible labels immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-white">Practical Guidance</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-green-400/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600 mb-3">Writing Effective Notes</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Always include date, time, and your name for accountability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Example: "22/08/25 – DB2 testing complete, lighting circuit 4 still isolated – A. Moore"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use clear, specific language that cannot be misinterpreted</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Position notes where they will be easily seen by the relevant people</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Creating Structured Handovers</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Use a standard template: Work Done | Work Remaining | Issues | Safety Notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Keep descriptions concise but include all essential information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Highlight any urgent or safety-critical items clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Include your contact details for any follow-up questions</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Professional Labelling</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Use printed labels where possible for legibility and durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>If handwriting is necessary, use block capitals and appropriate markers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Choose label materials appropriate for the installation environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Follow BS 7671 requirements and any site-specific labelling standards</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-white">Real World Example</h2>
          
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-2">The Cost of Poor Communication</h3>
                <p className="text-base text-white mb-4">
                  On a commercial site, an apprentice leaves no handover note at the end of their shift. 
                  The next morning, another team mistakenly energises a circuit still under testing, 
                  causing equipment damage.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card border border-border/30 rounded-lg p-4">
                <h4 className="text-base font-semibold text-red-600 mb-2">Consequences:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• £2,000 worth of testing equipment damaged</li>
                  <li>• Project delayed by 2 days waiting for replacement equipment</li>
                  <li>• Insurance claim required, affecting company premiums</li>
                  <li>• Client confidence affected due to preventable incident</li>
                  <li>• Additional safety briefings required for all site personnel</li>
                </ul>
              </div>
              
              <div className="bg-card border border-green-400/30 rounded-lg p-4">
                <h4 className="text-base font-semibold text-green-600 mb-2">The Solution:</h4>
                <p className="text-xs sm:text-sm text-white">
                  After this incident, the site adopted mandatory written handover sheets. 
                  A simple note stating <em>"Circuit 3 DB2 still under test - DO NOT ENERGISE - Contact J. Smith 07XXX XXXXXX"</em> 
                  would have prevented this costly mistake.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-muted-foreground/20 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-base text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-2xl font-bold text-white">Pocket Guide</h2>
          </div>
          <p className="text-white mb-4">Quick reference for written communication</p>
          <div className="bg-[#121212]/50 rounded-lg p-4">
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Always leave written notes/handovers when finishing work</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Include date, time, and your name on all written communications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keep writing clear, accurate, and professional</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Labels must be durable, legible, and follow BS 7671 standards</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>A 30-second note can prevent hours of rework or hazards</span>
              </li>
            </ul>
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Recap</h2>
          <p className="text-base text-white mb-4">In this subsection, you've learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Why written instructions and handovers are essential for electrical work</li>
            <li>The qualities of effective written communication: clarity, accuracy, legibility, and professionalism</li>
            <li>How to write clear notes, labels, and handovers that prevent mistakes</li>
            <li>The importance of following labelling standards and best practices</li>
          </ul>
        </Card>

        <Separator className="my-8" />

        {/* Quiz */}
        <Quiz 
          title="Written Instructions and Handovers Knowledge Check"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button variant="outline" asChild>
            <Link to="../6-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Verbal Communication
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-3">
              Next: Digital Communication
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section6_2;